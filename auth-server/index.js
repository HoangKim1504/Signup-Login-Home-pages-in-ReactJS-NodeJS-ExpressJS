require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors"); // Import the CORS middleware
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/User");
const PORT = 5000;
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/user")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("mongodb failed");
    process.exit();
  });

/** Middleware */
// parse the body
app.use(express.json()); // transfer the data that we are passing from frontend to backend that will transfer to the Json format

// parse the cookie
app.use(cookieParser());

// Use the CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middleware to set Access-Control-Allow-Credentials header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Middleware to verify JWT token
const verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("Token:", token);
  if (!token) {
    return res.status(401).json({ message: "No token provided", auth: false });
  } else {
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ message: "Token is wrong", auth: false });
      } else {
        req.user = decoded.email; // set the email to req.user
        next();
      }
    });
  }
};

// isAuth route
app.get("/isAuth", verifyUser, async (req, res) => {
  return res.status(200).json({ message: "Login successfully", auth: true });
});

// login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // check if user exists
  try {
    // find user by email in MongoDB
    const user = await UserModel.findOne({ email });

    // if user not found in MongoDB return 404
    if (!user) {
      return res.status(404).send("User not found");
    }

    // compare bcrypt password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // create JWT token with user name and email and expire in 24 hours
      const token = jwt.sign(
        { name: user.name, email: user.email },
        TOKEN_SECRET,
        {
          expiresIn: "24h",
        }
      );
      // set cookie with token and send response to frontend to store the token in cookie
      res.cookie("access_token", token, {
        httpOnly: false, // allow to access the token in frontend
        secure: process.env.NODE_ENV === "production", // set to true in production
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
      });
      return res.status(200).send("Save token in Cookie successfully");
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

// signup route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // set up hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create new user in MongoDB with hashed password
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    // save user to MongoDB
    await newUser.save();

    res.status(201).send("Registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Registration failed");
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
