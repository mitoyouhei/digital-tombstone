import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/forgot`, {
        email,
      });
      alert("Recovery email sent");
    } catch (error) {
      console.error("Error sending recovery email", error);
    }
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <button type="submit">Send Recovery Email</button>
    </form>
  );
};

export default ForgotPassword;
