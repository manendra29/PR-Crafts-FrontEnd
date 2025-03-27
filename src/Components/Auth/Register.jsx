// import React, { useContext, useState } from "react";
// import { Container, TextField, Button, Typography, Box } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Auth.css";
// import toast from "react-hot-toast";
// import { Context } from "../../main";

// const Register = () => {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [generatedOtp, setGeneratedOtp] = useState("");
//   const [userData, setUserData] = useState({ name: "", password: "" });
//   const {isAuthorized,user,setUser}=useContext(Context);
//   const navigateTo=useNavigate();

//   // Function to generate OTP
//   const generateOTP = async(e) => {
//     e.preventDefault();
//     try {
//       const response=await axios.post("https://pr-crafts-backend.vercel.app/api/v1/user/otp",{email},{
//         withCredentials:true,
//         headers:{
//           "Content-Type":"application/json"
//         }
//       })
//       toast.success("otp sent");
//     } catch (error) {
//       toast.error(error.response.data.message);
//       console.log(error);
//     }
//   };

//   // Function to verify OTP
//   const verifyOTP = async() => {
//     try {
//       await axios.post("https://pr-crafts-backend.vercel.app/api/v1/user/verifyotp",{otp},{
//         withCredentials:true,
//         headers:{
//           "Content-Type":"application/json"
//         }
//       })
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleRegister=async()=>{
//     try {
//       const response=await axios.post("https://pr-crafts-backend.vercel.app/api/v1/user/register",{
//         username:userData.name,
//         email:email,
//         password:userData.password
//       },{
//         withCredentials:true,
//         headers:{
//           "Content-Type":"application/json"
//         }
//       })
//       toast.success("User Registered");
//         setUser(response.data.user);
//         navigateTo("/");
//     } catch (error) {
//       console.log(error);
//     }
//   }




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
//             />
//             <Button fullWidth variant="contained" className="auth-button" onClick={generateOTP}>
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
//             />
//             <Button fullWidth variant="contained" className="auth-button" onClick={verifyOTP}>
//               Verify OTP
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
//             />
//             <Button onClick={handleRegister} fullWidth variant="contained" className="auth-button">
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






import React, { useContext, useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userData, setUserData] = useState({ name: "", password: "" });
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
    }
  };

  // Function to verify OTP
  const verifyOTP = async () => {
    // Validate OTP length
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

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
    }
  };

  return (
    <Container className="auth-container">
      <Box className="auth-box">
        <Typography variant="h4" className="auth-title">
          Join Us 🎉
        </Typography>
        <Typography variant="body1" className="auth-subtitle">
          Create a new account
        </Typography>

        {step === 1 && (
          <>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              type="email"
            />
            <Button 
              fullWidth 
              variant="contained" 
              className="auth-button" 
              onClick={generateOTP}
              disabled={!email}
            >
              Send OTP
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <TextField
              fullWidth
              label="Enter OTP"
              variant="outlined"
              margin="normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="auth-input"
              type="number"
              inputProps={{ maxLength: 6 }}
            />
            <Button 
              fullWidth 
              variant="contained" 
              className="auth-button" 
              onClick={verifyOTP}
              disabled={otp.length !== 6}
            >
              Verify OTP
            </Button>
            <Button 
              fullWidth 
              variant="outlined" 
              className="auth-button" 
              onClick={() => setStep(1)}
              style={{ marginTop: '10px' }}
            >
              Change Email
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="normal"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className="auth-input"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              className="auth-input"
              helperText="Password must be at least 8 characters long"
            />
            <Button 
              onClick={handleRegister} 
              fullWidth 
              variant="contained" 
              className="auth-button"
              disabled={!userData.name || userData.password.length < 8}
            >
              Register
            </Button>
          </>
        )}

        <Typography variant="body2" className="switch-text">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;