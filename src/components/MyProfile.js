import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center mt-5">User not found</div>;
  }

  return (
    <div className="container mt-5">
      <header className="text-center mb-4">
        <h1>My Profile</h1>
      </header>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center">{user.username}</h2>
          <p className="text-center">{user.email}</p>
          {user.facebookId && (
            <div className="text-center mt-4">
              <h3>Facebook Profile</h3>
              <img
                src={user.facebookPhoto}
                alt={user.facebookName}
                className="rounded-circle"
              />
              <p>{user.facebookName}</p>
              <p>{user.facebookEmail}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
