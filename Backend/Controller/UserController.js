const { UserModel } = require("../Models/UserModel");
const { MeetingModel } = require("../Models/MeetingModel");
const { CreateSecretToken } = require("../Util/CreateSecretToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await UserModel.create({
      email,
      password,
      username,
      createAt: new Date(),
    });
    const token = CreateSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
      token: token,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ message: "Incorrect password or email" });
    }
    const token = CreateSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      token: token,
    });
  } catch (error) {
    console.error("login Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports.getUserHistory = async (req, res) => {
  const { token } = req.query;

  try {
    if (!token) {
      return res.status(400).json({ message: "Token is missing" });
    }
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_KEY || "default_secret_key"
    );
    let user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found with token" });
    }

    let meetings = await MeetingModel.find({ user_id: user.username });

    res.status(201).json({ meetings });
  } catch (e) {
    res.status(500).json({ message: `Something went wrong ${e}` });
  }
};

module.exports.addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;
  if (!token || typeof token !== "string" || token.split(".").length !== 3) {
    return res.status(400).json({ message: "Invalid or missing token" });
  }

  try {
    if (!token || !meeting_code) {
      return res.status(400).json({ message: "Token or meeting code missing" });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_KEY || "default_secret_key"
    );

    // Find user by ID extracted from token
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found with token" });
    }

    // Create new meeting history
    const newMeeting = new MeetingModel({
      user_id: user.username, // or use user._id if needed
      meeting_code: meeting_code,
    });

    await newMeeting.save();

    res
      .status(201)
      .json({ message: "History saved Successfully!", success: true });
  } catch (e) {
    console.error("Error in addToHistory:", e);
    res.status(500).json({ message: `Something went wrong: ${e.message}` });
  }
};
