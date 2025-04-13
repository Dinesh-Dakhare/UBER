import http from "http";
import { app } from "./app.js";

import { initializeSocket } from "./Socket.js";
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  initializeSocket(server)
});
