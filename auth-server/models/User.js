const mongoose = require("mongoose");

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "is invalid"], // Email validation using regex pattern matching
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the User model
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
