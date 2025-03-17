import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Admin.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(201)
      .json({ message: `User '${user.name}' logged in successfully`, token });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
};
