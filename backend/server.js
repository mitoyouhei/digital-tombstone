require("dotenv").config();
require("./setup_proxy");
const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const cors = require("cors");
const http = require("http");
const app = express();
const tombstones = require("./routes/tombstones");
const passport = require("./passport");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const soulGeneRoutes = require("./routes/soulGene");
const authenticate = require("./middleware/authenticate");
const createWebSocketServer = require("./websocketServer");
const PORT = process.env.PORT || 5001;

const SESSION_SECRET = process.env.SESSION_SECRET || "your_session_secret";

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/tombstones", tombstones);
app.use("/api/auth", authRouter);
app.use("/api/profile", authenticate, profileRouter);
app.use("/api/soulGene", authenticate, soulGeneRoutes);

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// 创建 HTTP 服务器
const server = http.createServer(app);

// 创建并启动 WebSocket 服务器
createWebSocketServer(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});