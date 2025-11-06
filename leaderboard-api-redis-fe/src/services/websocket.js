let socket;

export const connectWebSocket = (onMessage) => {
  socket = new WebSocket("ws://127.0.0.1:8000/ws/leaderboard");

  socket.onopen = () => {
    console.log("Connected to WebSocket");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
  };

  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
  };
};

export const disconnectWebSocket = () => {
  if (socket) socket.close();
};
