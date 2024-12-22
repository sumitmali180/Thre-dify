import React, { useState } from "react";
import '../styles/LoginRegister.css';
import { useNavigate } from "react-router-dom";

const LoginSignup = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(prev => !prev); 
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    const apiUrl = isSignUp
      ? "https://nichecommunityplatform.onrender.com/api/signup"
      : "https://nichecommunityplatform.onrender.com/api/login";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred.");
      }

      const data = await response.json();

      if (isSignUp) {
        alert(data.message || "Account created successfully!");
        toggleForm();
      } else {
        alert(data.message || "Login successful!");
        onLogin(true, { name: formData.name, email: formData.email });
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-register-wrapper">
      <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <span>Use your email for registration</span>
            {isSignUp && (
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            )}
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Sign Up"}
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <span>Use your account</span>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <a href="#">Forgot your password?</a>
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Sign In"}
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>

        {/* Overlay Panel */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 style={{color:'black'}}>Welcome Aboard!</h1>
              <p>Join us today and explore!</p>
              <button className="ghost" onClick={toggleForm}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 style={{color:'black'}}>Welcome Back!</h1>
              <p>Log in to continue your experience.</p>
              <button className="ghost" onClick={toggleForm}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loader">
          <div className="spinner"></div>
          <p>Processing...</p>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
