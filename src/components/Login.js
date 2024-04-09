import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  // State variables to hold email, password state
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cookies, setCookies] = useState(null);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Send a POST request to the server for login
    axios
      .post(
        "http://localhost:5000/login",
        { email, password },
        { withCredentials: true } // Include credentials in the request
      )
      .then((res) => {
        // localStorage.setItem("token", res.data.token);
        setCookies(res.data.token);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  // Check if the user is already logged in using the token stored in the cookies
  useEffect(() => {
    const cookies = document.cookie.split("; ");
    // console.log(cookies);
    const tokenCookie = cookies.find((cookie) =>
      cookie.startsWith("access_token=")
    );
    // console.log(tokenCookie);

    if (tokenCookie) {
      const token = tokenCookie.split("=")[1];
      /**tokenCookie.split("="): This splits the tokenCookie string into an array of substrings
       * using the "=" character as the delimiter. For example, if tokenCookie is "access_token=abc123",
       * this operation would result in ["access_token", "abc123"].
       *
       * [1]: This accesses the second element of the resulting array, which contains the token value.
       * In the example above, "abc123" is the token value. */
      // console.log("Token found:", token);

      // Call API to verify token
      axios
        .get("http://localhost:5000/isAuth", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          console.log("Token is valid:", response.data);
          // Navigate to home page
          window.location.href = "/home";
        })
        .catch((error) => {
          console.log("Error verifying token:", error);
        });
    } else {
      console.log("Token not found");
    }
  }, [cookies]);

  // Render the login form
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>
          <center>Login</center>
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              autoComplete="on"
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
            Login
          </button>
        </form>

        {/* Signup link */}
        <p>Already have an account?</p>
        <Link
          to="/signup"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Login;
