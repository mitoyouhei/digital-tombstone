import React, { useEffect } from "react";
import axios from "axios";

const FacebookCallback = () => {
  useEffect(() => {
    const fetchCallback = async () => {
      try {
        await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/auth/facebook/callback${window.location.search}`
        );
      } catch (error) {
        console.error("Error fetching tombstones:", error);
      }
    };
    fetchCallback();
  }, []);
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default FacebookCallback;
