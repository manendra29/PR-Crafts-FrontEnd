// // import React, { useContext, useState } from "react";
// // import { Container, TextField, Button, Typography, Box } from "@mui/material";
// // import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "./Auth.css";
// // import toast from "react-hot-toast";
// // import { Context } from "../../main";

// // const Register = () => {
// //   const [step, setStep] = useState(1);
// //   const [email, setEmail] = useState("");
// //   const [otp, setOtp] = useState("");
// //   const [generatedOtp, setGeneratedOtp] = useState("");
// //   const [userData, setUserData] = useState({ name: "", password: "" });
// //   const {isAuthorized,user,setUser}=useContext(Context);
// //   const navigateTo=useNavigate();

// //   // Function to generate OTP
// //   const generateOTP = async(e) => {
// //     e.preventDefault();
// //     try {
// //       const response=await axios.post("https://pr-crafts-backend.vercel.app/api/v1/user/otp",{email},{
// //         withCredentials:true,
// //         headers:{
// //           "Content-Type":"application/json"
// //         }
// //       })
// //       toast.success("otp sent");
// //     } catch (error) {
// //       toast.error(error.response.data.message);
// //       console.log(error);
// //     }
// //   };

// //   // Function to verify OTP
// //   const verifyOTP = async() => {
// //     try {
// //       await axios.post("https://pr-crafts-backend.vercel.app/api/v1/user/verifyotp",{otp},{
// //         withCredentials:true,
// //         headers:{
// //           "Content-Type":"application/json"
// //         }
// //       })
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const handleRegister=async()=>{
// //     try {
// //       const response=await axios.post("https://pr-crafts-backend.vercel.app/api/v1/user/register",{
// //         username:userData.name,
// //         email:email,
// //         password:userData.password
// //       },{
// //         withCredentials:true,
// //         headers:{
// //           "Content-Type":"application/json"
// //         }
// //       })
// //       toast.success("User Registered");
// //         setUser(response.data.user);
// //         navigateTo("/");
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }




// //   return (
// //     <Container className="auth-container">
// //       <Box className="auth-box">
// //         <Typography variant="h4" className="auth-title">
// //           Join Us 🎉
// //         </Typography>
// //         <Typography variant="body1" className="auth-subtitle">
// //           Create a new account
// //         </Typography>

// //         {step === 1 && (
// //           <>
// //             <TextField
// //               fullWidth
// //               label="Email Address"
// //               variant="outlined"
// //               margin="normal"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="auth-input"
// //             />
// //             <Button fullWidth variant="contained" className="auth-button" onClick={generateOTP}>
// //               Send OTP
// //             </Button>
// //           </>
// //         )}

// //         {step === 2 && (
// //           <>
// //             <TextField
// //               fullWidth
// //               label="Enter OTP"
// //               variant="outlined"
// //               margin="normal"
// //               value={otp}
// //               onChange={(e) => setOtp(e.target.value)}
// //               className="auth-input"
// //             />
// //             <Button fullWidth variant="contained" className="auth-button" onClick={verifyOTP}>
// //               Verify OTP
// //             </Button>
// //           </>
// //         )}

// //         {step === 3 && (
// //           <>
// //             <TextField
// //               fullWidth
// //               label="Full Name"
// //               variant="outlined"
// //               margin="normal"
// //               value={userData.name}
// //               onChange={(e) => setUserData({ ...userData, name: e.target.value })}
// //               className="auth-input"
// //             />
// //             <TextField
// //               fullWidth
// //               label="Password"
// //               type="password"
// //               variant="outlined"
// //               margin="normal"
// //               value={userData.password}
// //               onChange={(e) => setUserData({ ...userData, password: e.target.value })}
// //               className="auth-input"
// //             />
// //             <Button onClick={handleRegister} fullWidth variant="contained" className="auth-button">
// //               Register
// //             </Button>
// //           </>
// //         )}

// //         <Typography variant="body2" className="switch-text">
// //           Already have an account? <Link to="/login" className="auth-link">Login</Link>
// //         </Typography>
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default Register;






// import React, { useContext, useState } from "react";
// import { Container, TextField, Button, Typography, Box } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { Context } from "../../main";

// const Register = () => {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [userData, setUserData] = useState({ name: "", password: "" });
//   const { setUser } = useContext(Context);
//   const navigateTo = useNavigate();

//   // Validate email format
//   const isValidEmail = (emailToCheck) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(emailToCheck);
//   };

//   // Function to generate OTP
//   const generateOTP = async (e) => {
//     e.preventDefault();
    
//     // Validate email before sending OTP
//     if (!isValidEmail(email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     try {
//       await axios.post("https://pr-crafts-backend.vercel.app/api/v1/user/otp", { email }, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
//       toast.success("OTP sent to your email");
//       setStep(2); // Move to OTP verification step
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to send OTP");
//       console.error(error);
//     }
//   };

//   // Function to verify OTP
//   const verifyOTP = async () => {
//     // Validate OTP length
//     if (otp.length !== 6) {
//       toast.error("Please enter a valid 6-digit OTP");
//       return;
//     }

//     try {
//       await axios.post("https://pr-crafts-backend.vercel.app/api/v1/user/verifyotp", {email, otp }, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
//       toast.success("OTP verified successfully");
//       setStep(3); // Move to registration details step
//     } catch (error) {
//       toast.error(error.response?.data?.message || "OTP verification failed");
//       console.error(error);
//     }
//   };

//   // Function to handle user registration
//   const handleRegister = async () => {
//     // Validate input fields
//     if (!userData.name.trim()) {
//       toast.error("Please enter your full name");
//       return;
//     }

//     if (userData.password.length < 8) {
//       toast.error("Password must be at least 8 characters long");
//       return;
//     }

//     try {
//       const response = await axios.post("https://pr-crafts-backend.vercel.app/api/v1/user/register", {
//         username: userData.name,
//         email: email,
//         password: userData.password
//       }, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
//       toast.success("User Registered Successfully");
//       setUser(response.data.user);
//       navigateTo("/");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed");
//       console.error(error);
//     }
//   };

//   return (
//     <Container className="auth-container">
//       <Box className="auth-box">
//         <Typography variant="h4" className="auth-title">
//           Join Us 🎉
//         </Typography>
//         <Typography variant="body1" className="auth-subtitle">
//           Create a new account
//         </Typography>

//         {step === 1 && (
//           <>
//             <TextField
//               fullWidth
//               label="Email Address"
//               variant="outlined"
//               margin="normal"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="auth-input"
//               type="email"
//             />
//             <Button 
//               fullWidth 
//               variant="contained" 
//               className="auth-button" 
//               onClick={generateOTP}
//               disabled={!email}
//             >
//               Send OTP
//             </Button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <TextField
//               fullWidth
//               label="Enter OTP"
//               variant="outlined"
//               margin="normal"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="auth-input"
//               type="number"
//               inputProps={{ maxLength: 6 }}
//             />
//             <Button 
//               fullWidth 
//               variant="contained" 
//               className="auth-button" 
//               onClick={verifyOTP}
//               disabled={otp.length !== 6}
//             >
//               Verify OTP
//             </Button>
//             <Button 
//               fullWidth 
//               variant="outlined" 
//               className="auth-button" 
//               onClick={() => setStep(1)}
//               style={{ marginTop: '10px' }}
//             >
//               Change Email
//             </Button>
//           </>
//         )}

//         {step === 3 && (
//           <>
//             <TextField
//               fullWidth
//               label="Full Name"
//               variant="outlined"
//               margin="normal"
//               value={userData.name}
//               onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//               className="auth-input"
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               type="password"
//               variant="outlined"
//               margin="normal"
//               value={userData.password}
//               onChange={(e) => setUserData({ ...userData, password: e.target.value })}
//               className="auth-input"
//               helperText="Password must be at least 8 characters long"
//             />
//             <Button 
//               onClick={handleRegister} 
//               fullWidth 
//               variant="contained" 
//               className="auth-button"
//               disabled={!userData.name || userData.password.length < 8}
//             >
//               Register
//             </Button>
//           </>
//         )}

//         <Typography variant="body2" className="switch-text">
//           Already have an account? <Link to="/login" className="auth-link">Login</Link>
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default Register;














import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../../main";
import { motion } from "framer-motion";

// Icons
import { Eye, EyeOff, Mail, User, Lock, ArrowLeft, CheckCircle } from "lucide-react";

const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userData, setUserData] = useState({ name: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(Context);
  const navigateTo = useNavigate();

  // Validate email format
  const isValidEmail = (emailToCheck) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToCheck);
  };

  // Function to generate OTP
  const generateOTP = async (e) => {
    e.preventDefault();
    
    // Validate email before sending OTP
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    try {
      await axios.post("https://pr-crafts-backend.vercel.app/api/v1/user/otp", { email }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      toast.success("OTP sent to your email");
      setStep(2); // Move to OTP verification step
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to verify OTP
  const verifyOTP = async () => {
    // Validate OTP length
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    
    setIsLoading(true);
    try {
      await axios.post("https://pr-crafts-backend.vercel.app/api/v1/user/verifyotp", {email, otp }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      toast.success("OTP verified successfully");
      setStep(3); // Move to registration details step
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle user registration
  const handleRegister = async () => {
    // Validate input fields
    if (!userData.name.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (userData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post("https://pr-crafts-backend.vercel.app/api/v1/user/register", {
        username: userData.name,
        email: email,
        password: userData.password
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      toast.success("User Registered Successfully");
      setUser(response.data.user);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fade-in animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Progress bar animation
  const progressVariants = {
    step1: { width: "33.33%" },
    step2: { width: "66.66%" },
    step3: { width: "100%" }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl border border-gray-100"
      >
        {/* Progress bar */}
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
            <motion.div
              initial={`step${step}`}
              animate={`step${step}`}
              variants={progressVariants}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black"
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span className={step >= 1 ? "font-bold text-black" : ""}>Email</span>
            <span className={step >= 2 ? "font-bold text-black" : ""}>Verify</span>
            <span className={step >= 3 ? "font-bold text-black" : ""}>Details</span>
          </div>
        </div>
        
        <motion.div
          key={`header-${step}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Join Us <span className="inline-block animate-bounce">🎉</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create a new account to explore PR Crafts
          </p>
        </motion.div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="mt-8 space-y-6"
          >
            <div className="rounded-md -space-y-px">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm transition duration-300"
                  placeholder="Email address"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={!email || isLoading}
              onClick={generateOTP}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Send OTP"}
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="mt-8 space-y-6"
          >
            <div className="text-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Mail className="mx-auto h-12 w-12 text-gray-400 border-2 border-gray-200 p-2 rounded-full" />
              </motion.div>
              <p className="mt-2 text-sm text-gray-600">
                We've sent a verification code to {email}
              </p>
            </div>
            
            <div className="rounded-md shadow-sm -space-y-px">
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm text-center tracking-widest font-bold letter-spacing-2 transition duration-300"
                placeholder="Enter 6-digit OTP"
              />
            </div>

            <div className="flex flex-col space-y-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={otp.length !== 6 || isLoading}
                onClick={verifyOTP}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : "Verify OTP"}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep(1)}
                className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Change Email
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="mt-8 space-y-6"
          >
            <div className="text-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              </motion.div>
              <p className="mt-2 text-sm text-gray-600">
                Email verified! Complete your profile
              </p>
            </div>
            
            <div className="rounded-md shadow-sm space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm transition duration-300"
                  placeholder="Full Name"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm transition duration-300"
                  placeholder="Password (min 8 characters)"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={!userData.name || userData.password.length < 8 || isLoading}
              onClick={handleRegister}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Complete Registration"}
            </motion.button>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 text-center"
        >
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="font-medium text-black hover:text-gray-800 underline transition duration-300"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;