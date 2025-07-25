import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Environment } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect, Component, ReactNode } from 'react';
import * as THREE from 'three';

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const treeRef = useRef<THREE.Group>(null);
  
  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
      <group ref={treeRef} position={position} scale={scale}>
        {/* Tree trunk */}
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.1, 0.15, 2, 8]} />
          <meshStandardMaterial color="#4a5d23" />
        </mesh>
        
        {/* Tree foliage - multiple layers */}
        <mesh position={[0, 0.5, 0]}>
          <coneGeometry args={[0.8, 1.5, 8]} />
          <meshStandardMaterial color="#2d5016" />
        </mesh>
        
        <mesh position={[0, 1.2, 0]}>
          <coneGeometry args={[0.6, 1.2, 8]} />
          <meshStandardMaterial color="#3d6b1f" />
        </mesh>
        
        <mesh position={[0, 1.8, 0]}>
          <coneGeometry args={[0.4, 1, 8]} />
          <meshStandardMaterial color="#4d7d28" />
        </mesh>
      </group>
    </Float>
  );
}

function ForestParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, []);
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#7fb069" sizeAttenuation />
    </points>
  );
}

// Error boundary to catch Canvas errors
class ThreeErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log('Three.js error caught:', error);
  }

  render() {
    if ((this.state as any).hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Fallback component when WebGL is not available
function ForestFallback() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-green-900/20 to-green-950/40 flex items-center justify-center relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)/0.3),transparent_50%)]" />
      </div>
      
      {/* Static tree silhouettes */}
      <div className="relative z-10 text-center">
        <div className="text-6xl mb-4 animate-pulse">🌲</div>
        <p className="text-muted-foreground text-sm">
          Enhanced 3D forest requires WebGL support
        </p>
      </div>
    </div>
  );
}

// WebGL detection function
function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}

export default function Forest3D() {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check for WebGL support before rendering anything
    setWebglSupported(isWebGLSupported());
  }, []);

  const treePositions: [number, number, number][] = [
    [-3, -1, -2],
    [2, -1, -3],
    [-1, -1, -4],
    [4, -1, -1],
    [-4, -1, -5],
    [1, -1, -6],
    [-2, -1, -7],
    [3, -1, -5],
    [0, -1, -2],
    [-5, -1, -3],
  ];

  // Show loading or fallback if WebGL check not complete or not supported
  if (webglSupported === null) {
    return <ForestFallback />;
  }

  if (!webglSupported) {
    return <ForestFallback />;
  }

  return (
    <ThreeErrorBoundary fallback={<ForestFallback />}>
      <div className="h-full w-full">
        <Canvas
          camera={{ position: [0, 2, 8], fov: 60 }}
          className="bg-gradient-to-b from-green-900/20 to-green-950/40"
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "default",
            failIfMajorPerformanceCaveat: false
          }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
            color="#f4e4bc"
            castShadow
          />
          <pointLight position={[-10, -10, -10]} color="#7fb069" intensity={0.3} />
          
          {/* Forest ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial color="#1a2e05" />
          </mesh>
          
          {/* Trees */}
          {treePositions.map((position, index) => (
            <Tree 
              key={index} 
              position={position} 
              scale={0.8 + Math.random() * 0.4}
            />
          ))}
          
          {/* Floating particles */}
          <ForestParticles />
          
          {/* Environment lighting */}
          <Environment preset="forest" />
          
          {/* Subtle orbit controls */}
          <OrbitControls 
            enablePan={false} 
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
    </ThreeErrorBoundary>
  );
}