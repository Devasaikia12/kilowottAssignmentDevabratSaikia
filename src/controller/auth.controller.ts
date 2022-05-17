import {Request,Response,NextFunction} from 'express'
import config from 'config'
import {omit} from 'lodash'
import User,{userDocument} from '../model/User.model'
import { jwtSign } from '../uttils/jwt.uttil'

export const signUpAdmin = async(req :Request,res:Response,next :NextFunction)=>{
    const {
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
        addresses,
    } = req.body;
    try {
        const emailExist = await User.findOne({email})
        if(emailExist) res.status(400).json({error : "Email and passowrd not match"})

        const admin = {
            firstName ,
            lastName,
            email,
            password,
            addresses,
            isAdmin : true
        }

        const user = await User.create(admin);
        res.status(201).send(omit(user.toJSON(),"password","updatedAt","createdAt"));
    } catch (error:any) {
        res.status(500).json({error : error.message})
    }
}

export const signIn = async(req : Request,res:Response,next:NextFunction)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(401).json({error : "Email and passowrd not match"})
        const isValid = await user?.comparePassword(password)
        if(!isValid) return res.status(401).json({error :"Email and passowrd not match"})

        // create jwt token
        const token = jwtSign({ 
            email:user.email,
            userId : user._id,
            name : `${user.firstName} ${user.lastName}` 
        },
        {   expiresIn : config.get("tokenExpire"),
            algorithm : 'HS256'
        });

        res.cookie('jwt',token)

        return res.status(200).send({
            name : `${user.firstName} ${user.lastName}`, 
            email: user.email,
            userId: user._id,
            token
        })
    } catch (error:any) {
        res.status(401).json({error : error.message})
    }
}
