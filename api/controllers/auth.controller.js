import User from "../models/user.model.js ";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) =>{

    
    const {username, password, email} = req.body
    const isPasswordValid = (password) => {
        const numberRegex = /\d/;
        const uppercaseRegex = /[A-Z]/;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    
        return (
            numberRegex.test(password) &&
            uppercaseRegex.test(password) &&
            specialCharRegex.test(password)
        );
    };
    if(!username || !password || !email || username == "" || password == "" || email == ""){
        next(errorHandler(400, "All fields are required"))
    }
    if(!isPasswordValid(password)){
        next(errorHandler(400, "Password must contain at least one uppercase letter, one number and one special character"))
    }

    const hashedPass = bcryptjs.hashSync(password, 10)

    const newUser = new User ({
        username,
        email,
        "password":hashedPass
    })

    try {
        await newUser.save()
        res.json("signup successful");
        
    } catch (error) {
        next(error)
    }

}

export const signin = async (req, res, next) =>{
    const {email, password} = req.body
    if(!email || !password || email == "" || password == ""){
        next(errorHandler(400, "All fields are required"))
    }

    try {
      // console.log(email)
        const validUser = await User.findOne({ email});
        // console.log(validUser)
        if (!validUser) {
          return next(errorHandler(404, 'User not found'));
        }
        // console.log(validUser.password);
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        // console.log(validPassword);
        if (!validPassword) {
          return next(errorHandler(400, 'Invalid password'));
        }
        const token = jwt.sign(
          { id: validUser._id, isAdmin:validUser.isAdmin },process.env.SECRET_KEY
        );
    
        const { password: pass, ...rest } = validUser._doc;
    
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      } catch (error) {
        next(error);
      }
}

export const google = async (req, res, next) =>{
  const {name, email, photoUrl} = req.body
  // console.log("body", req.body);
  try {
    const user = await User.findOne({email})
    if(user != null){
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },process.env.SECRET_KEY
      );
      const { password, ...rest } = user._doc;  
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }else{

      const generatedPass = Math.random().toString(36).slice(-8);
      const hashedPass = bcryptjs.hashSync(generatedPass, 10);
      const newUser = new User ({
        username:name,
        email,
        "password":hashedPass,
        profilePic: photoUrl
    })
            
      // console.log("newUser", newUser);
    await newUser.save()
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },process.env.SECRET_KEY);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
    
  } catch (error) {
    
  }
}