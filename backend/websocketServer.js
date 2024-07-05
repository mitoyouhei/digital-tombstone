const WebSocket = require("ws");
const SoulGene = require("./models/SoulGene");

async function getSoulGenes(ws, next) {
  try {
    const soulGenes = await SoulGene.find({ isDeleted: false });
    const enrichedSoulGenes = soulGenes.map((gene) => ({
      ...gene.toObject(),
    }));
    ws.send(JSON.stringify({ type: "genes", data: enrichedSoulGenes }));
  } catch (error) {
    ws.send(JSON.stringify({ type: "error", message: error.message }));
  }
}

function router(ws, api) {
  switch (api) {
    case "getSoulGenes":
      getSoulGenes(ws);
      break;

    default:
      ws.send(JSON.stringify({ type: "error", message: "unknow api" }));
      break;
  }
}

function onConnection(ws) {
  console.log("New client connected");

  ws.on("message", async (message) => {
    console.log("received:", message);
    const parsedMessage = JSON.parse(message);
    router(ws, parsedMessage.type);
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
