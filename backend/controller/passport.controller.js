import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || "";
        const name = profile.displayName || "Unknown";
        const googleId = profile.id;

        let admin = await Admin.findOne({ email });

        if (admin) {
          if (!admin.googleId) {
            admin.googleId = googleId;
            await admin.save();
          }
          return done(null, admin);
        }

        const username = email ? email.split("@")[0] : `user_${googleId}`;

        const password = await bcrypt.hash(googleId, 10);

        admin = new Admin({
          googleId,
          name,
          username,
          email,
          password,
        });

        await admin.save();
        return done(null, admin);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Admin.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
