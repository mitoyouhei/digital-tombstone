import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [tombstones, setTombstones] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchTombstones();
  }, []);

  return (
    <>
      <h1 className="text-center my-4">Latest Tombstones</h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div className="row">
          {tombstones.map((tombstone) => (
            <div className="col-md-4 mb-4" key={tombstone._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">{tombstone.name}</h2>
                  <p className="card-text">
                    {tombstone.birthDate} - {tombstone.deathDate}
                  </p>
                  <p className="card-text">{tombstone.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
