import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db.js";
import router from "./routes/routes.js";
import "./controller/passport.controller.js";
import passport from "passport";
import session from "express-session";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server running on port ${PORT}`);
});
