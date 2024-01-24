import User from "../models/user.model.js ";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
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
        password: hashedPass
    })

    try {
        await newUser.save()
        res.json("signup successful");
        
    } catch (error) {
        next(error)
    }

}