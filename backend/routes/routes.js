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
  getStudentDetails,
  updateStudent,
} from "../controller/student.controller.js";

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
    res.redirect("/profile");
  }
);

router.post("/students", addStudent);
router.get("/students", getStudentDetails);
router.delete("/students/:id", deleteStudent);
router.put("/students/:id", updateStudent);

export default router;
