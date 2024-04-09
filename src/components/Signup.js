import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  // State variables to hold name, email, password state
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // Navigate to the other page
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Send a POST request to the server for login
    axios
      .post("http://localhost:5000/signup", { name, email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Registered successfully") {
          navigate("/login");
          alert("User registered successfully");
        } else if (result.data === "Registration failed") {
          navigate("/signup");
          alert("User registered unsuccessfully");
        }
      })
      .catch((err) => console.log(err));
  };

  // Render the login form
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>
          <center>Sign Up</center>
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name input */}
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Email input */}
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password input */}
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0"
            disabled={!email || !password}
          >
            Sign Up
          </button>
        </form>

        {/* Login link */}
        <p>Already have an account?</p>
        <Link
          to="/login"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
