import jwt from 'jsonwebtoken'
import config from 'config'

const jwtKey = config.get<string>('jwtKey')
export const jwtSign = (payload: Object,options:Object)=>{
    const token =  jwt.sign(payload,jwtKey,options);

    return token
}

export const jwtVerify =  (token:string)=>{
    try {
        const decode =  jwt.verify(token,jwtKey);
        return {
            valid : true,
            expired : false,
            decode
        }
    } catch (error:any) {
        return {
            valid : false,
            expired :error.message == 'jwt error',
            decode :null
        }
    }

}