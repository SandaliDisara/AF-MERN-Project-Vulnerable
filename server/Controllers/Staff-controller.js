const Staff = require("../Models/Staff");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const signupStaff = async (req, res, next) => {
  const { name, username, password } = req.body;
  let existingStaff;

  try {
    existingStaff = await Staff.findOne({ username: username });
  } catch (err) {
    console.log(err);
  }
  if (existingStaff) {
    return res
      .status(400)
      .json({ message: "User already exists. Please Login!!" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  const staff = new Staff({
    name,
    username,
    password: hashedPassword,
  });

  try {
    await staff.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ message: staff });
};

const loginStaff = async (req, res, next) => {
  const { username, password } = req.body;

  let existingStaff;

  try {
    existingStaff = await Staff.findOne({ username: username });
  } catch (err) {
    return new Error(err);
  }

  if (!existingStaff) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPassCorrect = bcrypt.compareSync(password, existingStaff.password);
  if (!isPassCorrect) {
    return res.status(400).json({ message: "Invalid username / password" });
  }
  const token = jwt.sign({ id: existingStaff._id }, process.env.JWT_SECTRET_KEY, {
    expiresIn: "1hr",
  });
  return res
    .status(200)
    .json({ message: "Successfully logged in", staff: existingStaff, token });
};
const verifyToken = (req, res, next) => {
  const headers = req.headers["authorization"];
  console.log(headers);
};
exports.signupStaff = signupStaff;
exports.loginStaff = loginStaff;
exports.verifyToken = verifyToken;
