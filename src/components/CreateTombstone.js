import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTombstone = () => {
  const [submiting, setSumbiting] = useState(false);
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
    setSumbiting(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/tombstones`,
        tombstone
      );
      navigate("/");
    } catch (error) {
      console.error("Error creating tombstone:", error);
    } finally {
      setSumbiting(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="col-md-8">
        <h2 className="text-center mb-4">Create New Tombstone</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter name"
              value={tombstone.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="birthDate" className="form-label">
              Birth Date
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              className="form-control"
              value={tombstone.birthDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deathDate" className="form-label">
              Death Date
            </label>
            <input
              type="date"
              id="deathDate"
              name="deathDate"
              className="form-control"
              value={tombstone.deathDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="form-control"
              placeholder="Enter message"
              value={tombstone.message}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          {submiting ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            <button type="submit" className="btn btn-primary w-100">
              Create
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateTombstone;
