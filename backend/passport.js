const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
// const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("./models/User");
const { decodeUserToken } = require("./util");
const bcrypt = require("bcryptjs");

// Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "Incorrect username" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.SERVER_END_POINT}/api/auth/facebook/callback`,
      profileFields: ["id", "displayName", "photos", "email"],
      passReqToCallback: true, // Allow us to access req in callback
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
          // Check if there is a logged-in user
          req.user = decodeUserToken(req.session.token);
          if (req.user) {
            user = await User.findById(req.user.id);
            user.facebookId = profile.id;
            user.facebookToken = accessToken;
            user.facebookName = profile.displayName;
            user.facebookEmail = profile.emails[0].value;
            user.facebookPhoto = profile.photos[0].value;
            await user.save();
          } else {
            user = new User({
              username: profile.emails[0].value,
              facebookId: profile.id,
              facebookToken: accessToken,
              facebookName: profile.displayName,
              facebookEmail: profile.emails[0].value,
              facebookPhoto: profile.photos[0].value,
            });
            await user.save();
          }
        } else {
          user.facebookToken = accessToken;
          user.facebookName = profile.displayName;
          user.facebookEmail = profile.emails[0].value;
          user.facebookPhoto = profile.photos[0].value;
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// // Twitter Strategy
// passport.use(
//   new TwitterStrategy(
//     {
//       consumerKey: process.env.TWITTER_CONSUMER_KEY,
//       consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
//       callbackURL: "http://localhost:3000/api/auth/twitter/callback",
//     },
//     async (token, tokenSecret, profile, done) => {
//       try {
//         let user = await User.findOne({ twitterId: profile.id });
//         if (!user) {
//           user = new User({
//             username: profile.displayName,
//             twitterId: profile.id,
//           });
//           await user.save();
//         }
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
