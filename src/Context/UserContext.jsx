// src/context/UserContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../services/api.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Check if user is logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me"); // returns { user: { id, email, username } }
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
        console.log("Not logged in", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};



