import {Request,Response,NextFunction} from 'express'
import config from 'config'
import {omit} from 'lodash'
import User,{userDocument} from '../model/User.model'
import { jwtVerify } from '../uttils/jwt.uttil'
import { JwtPayload } from 'jsonwebtoken'


export const changePassword = async(req:Request,res:Response,next:NextFunction)=>{
    //const id = req.params.id
    const {password, currentPassword} = req.body
    try {
        
        //matching jwt cookie user id with pass user id
        const {decode :{userId} } = jwtVerify(req.cookies.jwt) as JwtPayload
        if(!userId) return res.status(401).json({message : 'You are not authorize'})
        
        //check user exist or not
        const user = await User.findOne({_id : userId}) as userDocument
        if(!user) return res.status(401).json({error :"User not found"})

        // check whether current password is matching
        const isValid = await user?.comparePassword(currentPassword)
        if(!isValid) return res.status(401).json({error :"Current passowrd is not match"})

        user.password = password
        await user.save();

        res.status(401).json({message : `You password has changed`})
    } catch (error :any) {
        res.status(500).json({error : error.message})
    }
}

export const updateUserProfile = async(req:Request,res:Response,next:NextFunction)=>{

    const {firstName,lastName,addresses} = req.body;
    try {
        const filename :string = req.file?.filename ?? '';
        const {decode :{userId} } = jwtVerify(req.cookies.jwt) as JwtPayload
        if(!userId) return res.status(401).json({message : `Unauthorize`})
        const user = await User.findOne({_id : userId}) as userDocument
        if(!user) return res.status(401).json({error :"User not found"})

        user.firstName = firstName;
        user.lastName = lastName;
        user.addresses = addresses;
        user.profilePic = filename;

        await user.save();
        res.status(201).json({message :"User profile updated"})
    } catch (error :any) {
        res.status(500).json({error : error.message})
    }
}