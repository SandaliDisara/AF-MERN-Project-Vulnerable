const Grass = require("../Models/Grass");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
require('dotenv').config();

const Joi = require('joi');  // For input validation
const validator = require('validator'); 

// Input validation schema using Joi
const schema = Joi.object({
  name: Joi.string().min(3).max(50),
  username: Joi.string().min(3).max(50).required(),  // Username must be between 3-50 characters
  password: Joi.string().min(6).required(),  // Password must be at least 6 characters
});

const signupGrass = async (req, res, next) => {
  const { name, username, password } = req.body;

  // Validate input using Joi
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Sanitize inputs to remove any special characters that could be harmful
  const sanitizedUsername = validator.escape(username);
  const sanitizedName = validator.escape(name);

  let existingGrass;

  try {
    existingGrass = await Grass.findOne({ username: sanitizedUsername });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error, please try again later." });
  }

  if (existingGrass) {
    return res.status(400).json({ message: "User already exists. Please Login!" });
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  const grass = new Grass({
    name: sanitizedName,
    username: sanitizedUsername,
    password: hashedPassword,
  });

  try {
    await grass.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error saving user. Please try again." });
  }

  return res.status(201).json({ message: "User created successfully", grass });
};

const loginGrass = async (req, res, next) => {
  try {
    console.log("Received login request:", req.body);  // Log request data

    const { username, password } = req.body;

    // Validate input using Joi
    const { error } = schema.validate({ username, password });
    if (error) {
      console.log("Validation failed:", error.details[0].message);  // Log validation errors
      return res.status(400).json({ message: error.details[0].message });
    }

    // Sanitize inputs
    const sanitizedUsername = validator.escape(username);
    console.log("Sanitized username:", sanitizedUsername);  // Log sanitized username

    let existingGrass;

    try {
      existingGrass = await Grass.findOne({ username: sanitizedUsername });
      console.log("Found user:", existingGrass);  // Log the user found
    } catch (err) {
      console.log("Error fetching user from DB:", err);  // Log DB error
      return res.status(500).json({ message: "Server error, please try again later." });
    }

    if (!existingGrass) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPassCorrect = bcrypt.compareSync(password, existingGrass.password);
    

    if (!isPassCorrect) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: existingGrass._id }, process.env.JWT_SECTRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Successfully logged in", grass: existingGrass, token });
  } catch (err) {
    console.error("Unexpected error during login:", err.message);  // Log the actual error message
    console.error(err.stack);  // Log the full error stack trace to understand where it's failing
    return res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }
};

const verifyToken = (req, res, next) => {
  const headers = req.headers["authorization"];
  console.log(headers);
};
exports.signupGrass = signupGrass;
exports.loginGrass = loginGrass;
exports.verifyToken = verifyToken;
