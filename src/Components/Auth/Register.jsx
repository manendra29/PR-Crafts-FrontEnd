import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import toast from "react-hot-toast";

const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [userData, setUserData] = useState({ name: "", password: "" });

  // Function to generate OTP
  const generateOTP = async(e) => {
    e.preventDefault();
    try {
      const response=await axios.post("",{email},{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })
      setOtp(response.data.otp);
      toast.success("otp sent");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  // Function to verify OTP
  const verifyOTP = async() => {
    try {
      await axios.post("")
    } catch (error) {
      
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
            />
            <Button fullWidth variant="contained" className="auth-button" onClick={generateOTP}>
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
            />
            <Button fullWidth variant="contained" className="auth-button" onClick={verifyOTP}>
              Verify OTP
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
            />
            <Button fullWidth variant="contained" className="auth-button">
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
