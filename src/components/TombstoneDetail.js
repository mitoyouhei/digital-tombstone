import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const TombstoneDetail = () => {
  const { id } = useParams();
  const [tombstone, setTombstone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTombstone = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/tombstones/${id}`
        );
        setTombstone(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tombstone:", error);
        setLoading(false);
      }
    };

    fetchTombstone();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  if (!tombstone) {
    return <div className="text-center mt-5">Tombstone not found</div>;
  }

  return (
    <div className="container mt-5">
      <header className="text-center mb-4">
        <h1>{tombstone.name}</h1>
      </header>
      <div className="card">
        <div className="card-body">
          <p className="text-center">
            {new Date(tombstone.birthDate).toLocaleDateString()} -{" "}
            {new Date(tombstone.deathDate).toLocaleDateString()}
          </p>
          <p className="card-text text-center">{tombstone.message}</p>
          {tombstone.facebookId && (
            <div className="text-center mt-4">
              <h3>Facebook Profile</h3>
              <img
                src={tombstone.facebookPhoto}
                alt={tombstone.facebookName}
                className="rounded-circle"
              />
              <p>{tombstone.facebookName}</p>
              <p>{tombstone.facebookEmail}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TombstoneDetail;
