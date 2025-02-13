import { Schema, Model, model } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    minlength: [5, "Email name must be at least 3 characters long"],
  },
  password: {
    type: String,
    required: true,
    Select:false
  },
  socketId: {
    type: String,
  },
})

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id:this._id},process.env.JWT_SECRET)
  return token
}

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password,10)
}

userSchema.methods.camparePassword = async function (password){
  return await bcrypt.compare(password,this.password)
}

 export const userModel = model('User',userSchema)