// import React, { createContext, useEffect, useState } from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import axios from "axios";
// import "./main.css";
// import "./index.css";

// // Create Context
// export const Context = createContext(null);

// const AppWrapper = () => {
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/user/me", {
//           withCredentials: true, // Ensures cookies are sent with requests
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         // Session is valid, set user data
//         setIsAuthorized(true);
//         setUser(response.data.user);
//       } catch (error) {
//         console.error("Error during session check:", error?.response?.data || error.message);
//         setIsAuthorized(false);
//         setUser(null);
//       } finally {
//         setLoading(false); // Stop loading spinner
//       }
//     };

//     checkSession();
//   }, []);

//   if (loading) {
//     return <span className="loader"></span>; // Show a loader while session is being checked
//   }

//   return (
//     <Context.Provider
//       value={{
//         isAuthorized,
//         setIsAuthorized,
//         user,
//         setUser,
//       }}
//     >
//       <App />
//     </Context.Provider>
//   );
// };

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AppWrapper />
//   </React.StrictMode>
// );













import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";
import "./index.css";

// Create a custom axios instance
const axiosInstance = axios.create({
  baseURL: "https://pr-crafts-backend.vercel.app/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create Context
export const Context = createContext(null);

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axiosInstance.get("/user/me");
        
        // More robust check for user data
        if (response.data && response.data.user) {
          setIsAuthorized(true);
          setUser(response.data.user);
        } else {
          throw new Error("No user data found");
        }
      } catch (error) {
        console.error(
          "Error during session check:", 
          error?.response?.data?.message || error.message
        );
        setIsAuthorized(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // More descriptive loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
        axiosInstance, // Added to provide axios instance through context
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

export { axiosInstance }; // Export for use in other files if needed

