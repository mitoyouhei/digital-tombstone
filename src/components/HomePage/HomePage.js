import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [tombstones, setTombstones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTombstones = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/tombstones");
        setTombstones(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tombstones:", error);
        setLoading(false);
      }
    };
    fetchTombstones();
  }, []);

  return (
    <div>
      <header className="header">
        <h1>Digital Tombstone</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/create">Create Tombstone</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
      </header>
      <main className="main">
        <h1>Latest Tombstones</h1>
        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <div className="tombstone-list">
            {tombstones.map((tombstone) => (
              <div className="tombstone-card" key={tombstone._id}>
                <h2>{tombstone.name}</h2>
                <p>
                  {tombstone.birthDate} - {tombstone.deathDate}
                </p>
                <p>{tombstone.message}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="footer">
        <p>&copy; 2024 Digital Tombstone. All rights reserved.</p>
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
      </footer>
    </div>
  );
};

export default HomePage;
