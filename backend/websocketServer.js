const WebSocket = require("ws");
const SoulGene = require("./models/SoulGene");
const User = require("./models/User");
const { encodeUserToken, decodeUserToken } = require("./util");

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
    getSoulGenes(ws, user);
  } catch (error) {
    return ws.send(
      JSON.stringify({ type: "error", message: "Error logging in" })
    );
  }
}

async function getSoulGenes(ws, user) {
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
    case "getSoulGenes":
      getSoulGenes(ws, user, body);
      break;
    case "login":
      login(ws, user, body);
      break;

    default:
      ws.send(JSON.stringify({ type: "error", message: "unknow type" }));
      break;
  }
}

function onConnection(ws) {
  console.log("New client connected");

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
