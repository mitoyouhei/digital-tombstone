const url = require("url");
const WebSocket = require("ws");
const SoulGene = require("./models/SoulGene");
const User = require("./models/User");
const { encodeUserToken, decodeUserToken } = require("./util");

//createGene
async function createGene(ws, user, { plotId, name, birthdate }) {
  if (!user) {
    return ws.send(
      JSON.stringify({
        type: "error",
        message: "Unauthed user",
      })
    );
  }
  const userId = user.id;

  try {
    const soulGene = new SoulGene({ plotId, name, birthdate, userId });
    await soulGene.save();
    return sendSoulGenes(ws, user);
  } catch (error) {
    if (error.code === 11000) {
      // 处理唯一索引冲突错误
      const errorMessage = error.keyPattern.plotId
        ? "PlotId must be unique"
        : "UserId must be unique";
      return ws.send(
        JSON.stringify({
          type: "error",
          message: errorMessage,
        })
      );
    } else {
      return ws.send(
        JSON.stringify({
          type: "error",
          message: error.message,
        })
      );
    }
  }
}

// Register
async function register(ws, user, { username, password }) {
  try {
    const user = new User({ username, password });
    await user.save();
    login(ws, user, { username, password });
  } catch (error) {
    return ws.send(
      JSON.stringify({
        type: "error",
        message: "Error registering user" + JSON.stringify(error),
      })
    );
  }
}

// Login
async function login(ws, user, { username, password }) {
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return ws.send(
        JSON.stringify({ type: "error", message: "Invalid credentials" })
      );
    }
    const token = encodeUserToken(user);
    ws.send(
      JSON.stringify({
        type: "user",
        message: { token, username: user.username },
      })
    );
    return sendSoulGenes(ws, user);
  } catch (error) {
    return ws.send(
      JSON.stringify({ type: "error", message: "Error logging in" })
    );
  }
}

async function sendSoulGenes(ws, user) {
  try {
    const soulGenes = await SoulGene.find({ isDeleted: false });
    const enrichedSoulGenes = soulGenes.map((gene) => ({
      ...gene.toObject(),
      isOwned: user && gene.userId.toString() === user.id,
    }));
    return ws.send(
      JSON.stringify({ type: "genes", message: enrichedSoulGenes })
    );
  } catch (error) {
    return ws.send(JSON.stringify({ type: "error", message: error.message }));
  }
}

function router(ws, user, type, body) {
  switch (type) {
    case "login":
      login(ws, user, body);
      break;
    case "register":
      register(ws, user, body);
      break;
    case "createGene":
      createGene(ws, user, body);
      break;

    default:
      ws.send(JSON.stringify({ type: "error", message: "unknow type" }));
      break;
  }
}

function getUser(token) {
  return token ? decodeUserToken(token) : null;
}

function onConnection(ws, req) {
  console.log("New client connected");

  const parameters = url.parse(req.url, true);
  sendSoulGenes(ws, getUser(parameters.query.token));

  ws.on("message", async (message) => {
    console.log("received:", message);

    const parsedMessage = JSON.parse(message);
    const user = parsedMessage.token
      ? decodeUserToken(parsedMessage.token)
      : null;
    router(ws, user, parsedMessage.type, parsedMessage.body);
  });

  ws.on("close", onDisconnection);
}
function onDisconnection() {
  console.log("Client disconnected");
}

const createWebSocketServer = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", onConnection);

  return wss;
};

module.exports = createWebSocketServer;
