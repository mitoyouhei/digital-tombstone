import store, { setGenes } from "./store";

const socket = new WebSocket(process.env.REACT_APP_SOCKET_URL);

socket.onopen = () => {
  console.log("WebSocket connection opened");
};

socket.onmessage = (event) => {
  const messageData = JSON.parse(event.data);
  store.dispatch(setGenes({ key: messageData.type, value: messageData.data }));
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

export const sendMessage = (message) => {
  socket.send(JSON.stringify(message));
};
