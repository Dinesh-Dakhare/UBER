
import jwt from "jsonwebtoken";
import { userModel } from "../Models/user.model.js";
import blacklistTokenModel from "../Models/blacklistToken.model.js";
import { captainModel } from "../Models/captain.model.js";
export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
  
  if (isBlacklisted) {
    return res.status(401).json({ message: "unauthorized acesss" });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};


export const authCaptain = async (req, res,next) => {

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

 
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
 
  const isBlacklisted = await blacklistTokenModel.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "unauthorized acesss" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
     next();
  } catch (error) {
  console.log(error);
  
    return res.status(401).json({ message: "unauthorized" });
  }


}