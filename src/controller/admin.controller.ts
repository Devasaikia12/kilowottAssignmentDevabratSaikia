import {Request,Response,NextFunction} from 'express'
import config from 'config'
import nodemailer from 'nodemailer'
import {omit} from 'lodash'
import User,{userDocument} from '../model/User.model'
import { sendEmail } from '../uttils/email.uttil'
import { jwtVerify } from '../uttils/jwt.uttil'
import { JwtPayload } from 'jsonwebtoken'

export const createUser = async(req:Request,res:Response,next:NextFunction)=>{

    const {email,firstName,lastName} = req.body
    try {
        const emailExist = await User.findOne({email})
        if(emailExist) return res.status(400).json({error: 'Email already exist'});

        const password = await sendEmail(email,firstName)

        const user = await User.create({firstName,lastName,email,password})
        // res.status(201).send(omit(user.toJSON(),"password","updatedAt","createdAt","adresses","isAdmin"));
        
        res.status(201).json({message : 'User created and email sent to user email . Please check in your spam'});

    } catch (error :any) {
        res.status(404).json(error.message);
    }
}

export const deleteUser = async(req:Request,res:Response,next :NextFunction)=>{
    const userId = req.params.id
    try {
        const user = await User.deleteOne({_id : userId})
        res.status(201).json({message : `userid with ${userId} deleted successfully`})
        
    } catch (error:any) {
        res.status(500).json({error : error.message})
    }
}

export const disableUser = async(req:Request,res:Response,next :NextFunction)=>{
    const userId = req.params.id
    try {
        const user = await User.findOne({_id : userId})
        if(!user) return res.status(400).json({msg : 'User not fopund'})

        const update = await User.updateOne({_id : userId},{active : false})
        
        res.status(201).send(omit(user.toJSON(),"password","updatedAt","createdAt"));
        
    } catch (error:any) {
        res.status(500).json({error : error.message})
    }
}

export const listUsers = async(req:Request,res:Response,next :NextFunction)=>{
    try {
        const users = await User.aggregate([
            {
                $match : { isAdmin : false},
            },
            {    
                $project :{
                    _id : 0,
                    firstName:1,
                    lastName: 1,
                    email:1,
                    defaultAddres : { $first : "$addresses"},
                    isAdmin : 1,
                    active : 1,
                    numberOfAddress : { 
                        $cond :{
                            if : {$isArray : "$addresses"}, 
                            then : {$size : "$addresses"},
                            else : "NA"
                        } 
                    }
                }
            },
            
        ]);

        res.status(200).json({ users });
    } catch (error:any) {
        res.status(500).json({ error : error.message });
    }
}