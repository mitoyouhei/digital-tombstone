import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUser(storedUsername);
    }
  }, []);

  return [user, setUser];
}
