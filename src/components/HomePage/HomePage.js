import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [tombstones, setTombstones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login"); // 重定向到登录页面
  };

  useEffect(() => {
    const fetchTombstones = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/tombstones`
        );
        setTombstones(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tombstones:", error);
        setLoading(false);
      }
    };
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUser(storedUsername);
    }
    fetchTombstones();
  }, []);

  return (
    <div>
      <header className="header">
        <h1>Digital Tombstone</h1>
        {user ? <h3>Welcome {user}</h3> : null}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/create">Create Tombstone</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/contact">Contact Us</Link>
          <button onClick={logout}>Logout</button>
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
        <a href="#fackbook">Facebook</a>
        <a href="#twitter">Twitter</a>
        <a href="#instagram">Instagram</a>
      </footer>
    </div>
  );
};

export default HomePage;
