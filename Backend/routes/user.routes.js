import express from "express";
import { body } from "express-validator";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("invalid firstname must be at least 3 letters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be 6 charactor"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be 6 charactor"),
  ],
  loginUser
);

router.get("/profile",authUser,getUserProfile)

router.get("/logout",logoutUser)
export default router;
