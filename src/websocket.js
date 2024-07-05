import store, { setGenes, setUser } from "./store";

const socket = new WebSocket(process.env.REACT_APP_SOCKET_URL);

socket.onopen = () => {
  console.log("WebSocket connection opened");
};

socket.onmessage = (event) => {
  const messageData = JSON.parse(event.data);
  switch (messageData.type) {
    case "genes":
      store.dispatch(
        setGenes({ key: messageData.type, value: messageData.message })
      );
      break;
    case "user":
      store.dispatch(
        setUser({ key: messageData.type, value: messageData.message })
      );
      break;
    default:
      console.error("Unknow socket event: ", event);
      break;
  }
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

export const sendMessage = (message) => {
  const token = store.getState().user.token;
  socket.send(JSON.stringify({ ...message, token }));
};
