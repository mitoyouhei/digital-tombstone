import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import axios from "axios";
import { useParams } from "react-router-dom";

function Tombstone() {
  const { scene } = useGLTF("/assets/3d-models/tombstone.glb");
  const ref = useRef();
  const [isRotating, setIsRotating] = useState(true);
  const [scale, setScale] = useState(2);

  let speed = 0.2;
  // Custom animation loop to rotate the tombstone
  useFrame(() => {
    if (ref.current && isRotating) {
      ref.current.rotation.y += speed; // Adjust rotation speed if needed
      setScale((prevScale) => prevScale + 0.1);
      ref.current.scale.set(scale, scale, scale);
      // Stop rotating after one full rotation (360 degrees or 2 * Math.PI radians)
      if (ref.current.rotation.y >= 5.5 * Math.PI) {
        ref.current.rotation.y = 5.5 * Math.PI; // Ensure it stops exactly at one full rotation
        setIsRotating(false); // Stop the rotation
      }
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={[5, 5, 5]}
      position={[0, -5, 0]}
      rotation={[0, Math.PI, 0]} // Adjust this rotation if needed
    />
  );
}

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
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  if (!tombstone) {
    return <div>Tombstone not found</div>;
  }

  return (
    <>
      <h1 className="text-center mb-4">{tombstone.name}</h1>

      <div style={{ height: 400, marginBottom: 200 }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={0.8} />
          <Suspense fallback={null}>
            <Tombstone />
          </Suspense>
          <OrbitControls enableDamping dampingFactor={0.25} enableZoom />
        </Canvas>
      </div>
    </>
  );
};

export default TombstoneDetail;
