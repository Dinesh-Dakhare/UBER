/**
 * The `authUser` function is used for user authentication by verifying a JWT token and checking if the
 * user is blacklisted before allowing access to protected routes.
 * @param req - The `req` parameter in the `authUser` function is an object representing the HTTP
 * request. It contains information about the request made by the client, such as headers, parameters,
 * body, cookies, etc. In this function, `req.cookies.token` is used to access the token from cookies
 * @param res - The `res` parameter in the `authUser` function is the response object that will be sent
 * back to the client making the request. It is used to send a response back to the client with the
 * appropriate status code and message in case of success or failure during the authentication process.
 * @param next - The `next` parameter in the `authUser` function is a callback function that is used to
 * pass control to the next middleware function in the request-response cycle. When called, it executes
 * the next middleware function in the stack. In this context, `next` is used to move to the next
 * @returns The `authUser` function is returning different responses based on certain conditions:
 */
import jwt from "jsonwebtoken";
import { userModel } from "../Models/user.model.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  const isBlacklisted = await userModel.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "unauthorized acesss" });
  }
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
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
