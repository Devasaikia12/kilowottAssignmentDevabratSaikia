import { Request,Response,NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { jwtVerify } from "../uttils/jwt.uttil";
import User from "../model/User.model";

export const authorize = async (req:Request,res:Response,next :NextFunction)=>{
    try {
        const {decode :{userId} } = jwtVerify(req.cookies.jwt) as JwtPayload
        const isAdmin = await User.findOne({_id : userId, isAdmin : true})
        if(!isAdmin) return res.status(401).json({message : `You are not authorize user`})
        next()
    } catch (error:any) {
        return res.status(500).json({error : error.message})
    }
}