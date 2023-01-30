const passport = require("passport");
const request = require("request");
const axios = require("axios");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "781844016670-30qo0rpf9a6oesnpsqpeqir7ogr9d5l7.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile.emails[0].value);

      // axios
      //   .post("http://localhost:8080/auth/cookie", {
      //     email: profile.emails[0].value,
      //   })
      //   .then((res) => {
      //     console.log("son");
      //     res.cookie("access_token", profile.emails[0].value, {
      //       maxAge: 1000 * 60 * 60,
      //     });
      //   })
      //   .catch((err) => console.log(err));
      done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
