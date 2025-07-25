import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Environment } from '@react-three/drei';
import { useRef, useMemo } from 'react';
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

export default function Forest3D() {
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

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        className="bg-gradient-to-b from-green-900/20 to-green-950/40"
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
  );
}