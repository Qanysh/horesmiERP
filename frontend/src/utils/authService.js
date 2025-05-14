// src/utils/authService.js
import axios from "axios";
import API_URL from "@/config/index.js";
import { useAuthStore } from "@/stores/useAuthStore"; // Import Pinia store

export const registerUser = async (username, email, password, re_password) => {
  let errorMessages = "";

  if (password.length < 8) {
    errorMessages = "Password must be at least 8 characters long!";
    return { errorMessages };
  }

  if (password !== re_password) {
    errorMessages = "Passwords do not match!";
    return { errorMessages };
  }

  const userData = {
    username,
    email,
    password,
    re_password,
  };

  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, userData);
    console.log("Registration successful:", response.data);
    return { success: true };
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      if (error.response.data.error === "User already exists!") {
        errorMessages = "User with this email already exists!";
      } else {
        errorMessages = "Registration failed. Please try again.";
      }
    } else {
      errorMessages = "An error occurred. Please try again later.";
    }
    console.error("Error during registration:", error);
    return { errorMessages };
  }
};

export const loginUser = async (email, password) => {
  let errorMessages = "";

  if (password.length < 8) {
    errorMessages = "Password must be at least 8 characters long!";
    return { errorMessages };
  }

  const loginData = {
    email,
    password,
  };

  const authStore = useAuthStore(); // Access Pinia store

  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, loginData);
    console.log("Login successful:", response.data);
    authStore.setToken(response.data.token); // Save token in Pinia store
    return { success: true, token: response.data.token };
  } catch (error) {
    let errorMessages = "An error occurred. Please try again later.";
    if (error.response && error.response.data && error.response.data.error) {
      if (error.response.data.error === "Invalid credentials!") {
        errorMessages = "Invalid email or password!";
      } else {
        errorMessages = "Login failed. Please try again.";
      }
    }
    console.error("Error during login:", error);
    return { errorMessages };
  }
};
