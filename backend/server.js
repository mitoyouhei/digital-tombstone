require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const app = express();
const tombstones = require("./routes/tombstones");
const passport = require("./passport");
const authRouter = require("./routes/auth");
const PORT = process.env.PORT || 5001;

const SESSION_SECRET = process.env.SESSION_SECRET || "your_session_secret";

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/tombstones", tombstones);
app.use("/api/auth", authRouter);

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
