import React, { useContext, useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagteTo=useNavigate();
  const {isAuthorized,setIsAuthorized,setUser}=useContext(Context);

  const handleLoginButton=async(e)=>{
    e.preventDefault();
    try {
      const response=await axios.post("https://pr-crafts-backend.onrender.com/api/v1/user/login",{email,password},{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      });
      setIsAuthorized(true);
      console.log(response);
      setUser(response.data.user);
      toast.success("Loggin Successfully");
      naviagteTo("/");
    } catch (error) {
      toast.error("Loggin Failed");
      console.log(error);
    }
  }

  useEffect(()=>{
    if(isAuthorized){
      naviagteTo("/");
    }
  },[]);
  

  return (
    <Container className="auth-container">
      <Box className="auth-box">
        <Typography variant="h4" className="auth-title">Welcome Back 👋</Typography>
        <Typography variant="body1" className="auth-subtitle">Sign in to continue</Typography>

        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />

        <Button onClick={handleLoginButton} fullWidth variant="contained" className="auth-button">
          Login
        </Button>

        <Typography variant="body2" className="switch-text">
          Don't have an account? <Link to="/register" className="auth-link">Register</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
