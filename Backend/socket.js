import { Server } from "socket.io";
import { userModel } from "./Models/user.model.js";
import { captainModel } from "./Models/captain.model.js";

let io;
export function initializeSocket(server) {
   io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });


  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

   
      if (userType === "user") {
        console.log("user-connected"+userId,userType);

        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        
      } else if (userType === "captain") {
        console.log("captain-connected"+userId,userType);

        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      

      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
console.log("captain location"+location.ltd,location.lng);

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });


    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

export const sendMessageToSocketId = (socketId, messageObject) => {
  console.log('Sending message, io:', io); // Check io before sending
  if (!socketId) {
    console.error('Invalid socketId. Message not sent.');
    return; // Or throw an error, or do nothing (not recommended)
  }

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};

