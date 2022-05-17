import { Request } from "express";
import passport,{ PassportStatic } from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import cookieParser from "cookie-parser";
import config from 'config'
import User from "../model/User.model";
const JWTKey:string = config.get<string>('jwtKey')

const cookieExtractor = (req :Request)=>{
    let token = null
    if(req && req.cookies) token = req.cookies.jwt
    return token
}

let opts :StrategyOptions = {
    secretOrKey: JWTKey,
    jwtFromRequest: cookieExtractor
};

export default (passport : PassportStatic)=>{
    passport.use(
        new JwtStrategy(opts, async(jwt_payload:any ,done)=>{
            await User.findById(jwt_payload.userId)
                .then(user => user ? done(null,user) : done(null,false))
                .catch(()=> done(null,false))
        })
    )
}


export const authChecker = passport.authenticate("jwt", { session: false });


