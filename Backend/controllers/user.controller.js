import { userModel } from "../Models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";

//Register User

export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname,email, password } = req.body;

  const hashedPassword = await userModel.hashPassword(password);


  const user = await createUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};


//Login User

export const loginUser = async(req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password}=req.body

  const user = await userModel.findOne({email}).select('+password')

  if(!user){
    return res.status(401).json({message:"Invalid User And Password"})
  }

  const isMatch = await user.camparePassword(password)

  if(!isMatch){
    return res.status(401).json({message:"Invalid User And Password"})
  }

  const token = await user.generateAuthToken()

  res.status(201).json({ token, user });
}