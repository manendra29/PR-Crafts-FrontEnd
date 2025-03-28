import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";
import "./main.css";
import "./index.css";

// Create Context
export const Context = createContext(null);

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/user/me", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        // Session is valid, set user data
        setIsAuthorized(true);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error during session check:", error?.response?.data || error.message);
        setIsAuthorized(false);
        setUser(null);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };
    checkSession();
  }, []);

  if (loading) {
    return <span className="loader"></span>; // Show a loader while session is being checked
  }

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
