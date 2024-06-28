import React, { useEffect, useState } from "react";
import axios from "axios";

const token = localStorage.getItem("token");

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
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

  const disconnectFacebook = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/auth/facebook/disconnect`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Facebook disconnected successfully");
      // 更新用户信息以反映断开连接后的状态
      setUser({
        ...user,
        facebookId: null,
        facebookToken: null,
        facebookName: null,
        facebookEmail: null,
        facebookPhoto: null,
      });
    } catch (error) {
      console.error("Error disconnecting Facebook", error);
      alert("Error disconnecting Facebook");
    }
  };

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
          {user.facebookId ? (
            <div className="text-center mt-4">
              <h3>Facebook Profile</h3>
              <img
                src={user.facebookPhoto}
                alt={user.facebookName}
                className="rounded-circle"
              />
              <p>{user.facebookName}</p>
              <p>{user.facebookEmail}</p>
              <button
                className="btn btn-danger mt-3"
                onClick={disconnectFacebook}
              >
                Disconnect Facebook
              </button>
            </div>
          ) : (
            <div className="text-center mt-4">
              <a
                href={`${process.env.REACT_APP_API_ENDPOINT}/api/auth/facebook?token=${token}`}
                className="btn btn-primary"
              >
                Connect Facebook
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
