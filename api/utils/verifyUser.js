import jwt from 'jsonwebtoken';
import {errorHandler} from '../utils/error.js';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) {return next(errorHandler("unauthorized"))}
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err){
            return next(errorHandler("unauthorized"))
        }
        req.user = decoded
        next()
    })
}