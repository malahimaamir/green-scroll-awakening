import React, { useEffect, useState } from "react";
import axios from "axios";
import { Story } from "../../types/Story";

const EcoWall: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    axios
      .get<Story[]>("http://localhost:4000/api/stories")
      .then((res) => setStories(res.data))
      .catch((err) => console.error("Failed to fetch stories:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !text || !image) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("text", text);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:4000/api/stories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updated = await axios.get<Story[]>("http://localhost:4000/api/stories");
      setStories(updated.data);

      setName("");
      setText("");
      setImage(null);
    } catch (err) {
      console.error("Error submitting story:", err);
    }
  };

  return (
    <section className="eco-wall">
      <h2>Eco Wall</h2>

      <form onSubmit={handleSubmit} className="eco-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Share your story..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setImage(e.target.files[0])}
          required
        />
        <button type="submit">Submit Story</button>
      </form>

      <div className="story-list">
        {stories.map((story) => (
          <div key={story._id} className="story-card">
            <img src={story.imageUrl} alt="story" />
            <h3>{story.name}</h3>
            <p>{story.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EcoWall;
