const WebSocket = require("ws");
const SoulGene = require("./models/SoulGene");

const createWebSocketServer = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", async (message) => {
      console.log("received:", message);

      // 处理消息并回复客户端
      const parsedMessage = JSON.parse(message);
      if (parsedMessage.type === "getSoulGenes") {
        try {
          const soulGenes = await SoulGene.find({ isDeleted: false });
          const enrichedSoulGenes = soulGenes.map((gene) => ({
            ...gene.toObject(),
          }));
          ws.send(
            JSON.stringify({ type: "soulGenes", data: enrichedSoulGenes })
          );
        } catch (error) {
          ws.send(JSON.stringify({ type: "error", message: error.message }));
        }
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  return wss;
};

module.exports = createWebSocketServer;
