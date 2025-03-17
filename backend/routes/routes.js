import express from "express";
import { signup } from "../controller/signup.controller.js";
import { login } from "../controller/login.controller.js";
import { getHome } from "../controller/home.controller.js";
import { getProfile } from "../controller/profile.controller.js";
import { logout } from "../controller/logout.controller.js";
import passport from "passport";
import {
  addStudent,
  deleteStudent,
  getStudent,
  getStudentDetails,
  updateStudent,
} from "../controller/student.controller.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/", getHome);
router.get("/profile", getProfile);
router.get("/logout", logout);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
  }
);

router.get("/students", getStudentDetails);
router.delete("/students/:id", deleteStudent);
router.put("/students/:id", updateStudent);
router.get("/students/:id", getStudent);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "students",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

router.post("/students", upload.single("image"), addStudent);

export default router;
