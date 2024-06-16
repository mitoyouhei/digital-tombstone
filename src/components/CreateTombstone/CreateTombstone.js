import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateTombstone.css";

const CreateTombstone = () => {
  const [tombstone, setTombstone] = useState({
    name: "",
    birthDate: "",
    deathDate: "",
    message: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTombstone({ ...tombstone, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/tombstones", tombstone);
      alert("Tombstone created!");
      navigate("/");
    } catch (error) {
      console.error("Error creating tombstone:", error);
    }
  };

  return (
    <div>
      <header className="header">
        <h1>Digital Tombstone</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/create">Create Tombstone</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </header>
      <main className="main">
        <h1>Create New Tombstone</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={tombstone.name}
              onChange={handleChange}
            />
            <input
              type="date"
              name="birthDate"
              placeholder="Birth Date"
              value={tombstone.birthDate}
              onChange={handleChange}
            />
            <input
              type="date"
              name="deathDate"
              placeholder="Death Date"
              value={tombstone.deathDate}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Message"
              value={tombstone.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit">Create</button>
          </form>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Digital Tombstone. All rights reserved.</p>
        <a href="#fackbook">Facebook</a>
        <a href="#twitter">Twitter</a>
        <a href="#instagram">Instagram</a>
      </footer>
    </div>
  );
};

export default CreateTombstone;
