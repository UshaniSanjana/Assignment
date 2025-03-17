import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const user = await Admin.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Admin({
      name,
      username,
      email,

      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: `Admin ${newUser.name} registered successfully` });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
};
