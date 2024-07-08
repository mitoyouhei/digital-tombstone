import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendMessage } from "../websocket";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  const handleLogin = async (e) => {
    e.preventDefault();

    sendMessage({
      type: "login",
      body: {
        username,
        password,
      },
    });
    navigate("/");
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="col-lg-4 col-md-6 col-sm-8 col-10 position-absolute top-50 start-50 translate-middle">
        <div className="card text-center">
          <div className="card-header">
            <h1>Login</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleLogin}>
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
              <button type="submit" className="btn btn-primary w-50">
                Login
              </button>
              <Link className="d-block mt-3" to="/register">
                Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
