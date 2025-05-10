import jwt from "jsonwebtoken"
import {config} from "../config.js";

export const generateToken = (userId, res) =>{
    const token = jwt.sign({userId}, config.JWT_SECRET, {
        expiresIn: "30d"
    })

    res.cookie("jwt", token,{
        httpOnly: true,  //prevent xss attack cross-site scripting attack
        maxAge: 30 * 24 * 60 * 60 * 1000, //millisecond
        sameSite: "strict",
        // secure: config.NODE_ENV !== "development"
    });

    return token;
};