import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDb } from "./db/db.js";
import { userModel } from "./Models/user.model.js";
import router from "./routes/user.routes.js";
import captain from "./routes/captain.routes.js";
import maps from "./routes/maps.router.js";
import ride from "./routes/ride.router.js";

const app = express();
connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/users", router);
app.use("/captains", captain);
app.use("/maps", maps);
app.use("/rides",ride);

export { app };
