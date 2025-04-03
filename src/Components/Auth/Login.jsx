// import React, { useContext, useEffect, useState } from "react";
// import { Container, TextField, Button, Typography, Box } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import "./Auth.css";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Context } from "../../main";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const naviagteTo=useNavigate();
//   const {isAuthorized,setIsAuthorized,setUser}=useContext(Context);

//   const handleLoginButton=async(e)=>{
//     e.preventDefault();
//     try {
//       const response=await axios.post("https://pr-crafts-backend.vercel.app/api/v1/user/login",{email,password},{
//         withCredentials:true,
//         headers:{
//           "Content-Type":"application/json"
//         }
//       });
//       setIsAuthorized(true);
//       console.log(response);
//       setUser(response.data.user);
//       toast.success("Loggin Successfully");
//       naviagteTo("/");
//     } catch (error) {
//       toast.error("Loggin Failed");
//       console.log(error);
//     }
//   }

//   useEffect(()=>{
//     if(isAuthorized){
//       naviagteTo("/");
//     }
//   },[]);
  

//   return (
//     <Container className="auth-container">
//       <Box className="auth-box">
//         <Typography variant="h4" className="auth-title">Welcome Back 👋</Typography>
//         <Typography variant="body1" className="auth-subtitle">Sign in to continue</Typography>

//         <TextField
//           fullWidth
//           label="Email Address"
//           variant="outlined"
//           margin="normal"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="auth-input"
//         />

//         <TextField
//           fullWidth
//           label="Password"
//           type="password"
//           variant="outlined"
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="auth-input"
//         />

//         <Button onClick={handleLoginButton} fullWidth variant="contained" className="auth-button">
//           Login
//         </Button>

//         <Typography variant="body2" className="switch-text">
//           Don't have an account? <Link to="/register" className="auth-link">Register</Link>
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default Login;












import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  const handleLoginButton = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://pr-crafts-backend.vercel.app/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsAuthorized(true);
      console.log(response);
      setUser(response.data.user);
      toast.success("Login Successful");
      navigateTo("/");
    } catch (error) {
      toast.error("Login Failed");
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      navigateTo("/");
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="px-8 pt-8 pb-6 text-center"
          >
            <motion.h2
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
              className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
            >
              Welcome Back{" "}
              <motion.span
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
                className="inline-block"
              >
                👋
              </motion.span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-gray-600 dark:text-gray-300 mb-6"
            >
              Sign in to continue to PR Crafts
            </motion.p>
          </motion.div>

          <div className="px-8 pb-8">
            <form onSubmit={handleLoginButton}>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mb-6"
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-400 transition-all duration-200"
                  placeholder="your@email.com"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="mb-6"
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-400 transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="w-full bg-black text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                <span>Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-center mt-8"
            >
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-black dark:text-white font-medium hover:underline transition-all duration-200"
                >
                  Register
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;