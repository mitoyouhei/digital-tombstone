import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendMessage } from "../websocket";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    sendMessage({
      type: "register",
      body: {
        username,
        password,
      },
    });
    navigate("/");

    // try {
    //   await axios.post(
    //     `${process.env.REACT_APP_API_ENDPOINT}/api/auth/register`,
    //     { username, password }
    //   );
    //   alert("Registration successful");
    // } catch (error) {
    //   console.error("Error registering", error);
    //   alert("Error registering");
    // }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="col-md-3 position-absolute top-50 start-50 translate-middle">
        <div className="card text-center">
          <div className="card-header">
            <h1>Register</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <div className="mb-3 text-start">
                <label htmlFor="username" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-50">
                Register
              </button>
              <Link className="d-block mt-3" to="/login">
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
