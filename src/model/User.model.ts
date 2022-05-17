import {Schema,model,Document} from "mongoose";
import bcrypt from 'bcrypt'
import config from 'config'

export interface userDocument extends Document{
    firstName : string,
	lastName : string,
	email : string,
    password : string,
	addresses : string[],
	profilePic : string,
	isAdmin : boolean,
    active : boolean,
    comparePassword (password : string) :Promise<boolean>
}


const userSchema = new Schema({
    firstName : {type:String,required:true},
    lastName : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true,minlength :6},
    addresses : [String],
    profilePic : {type: String},
    isAdmin : {type: Boolean,default:false,required:true},
    active : {type :Boolean,default :true}
},{
    timestamps : true
})

userSchema.pre("save",async function(next){
    const user  = this as userDocument
    if(user.isModified('password')){
        const salt = await bcrypt.genSalt(config.get<number>("salt"))
        user.password = await bcrypt.hash(user.password,salt)
    }
    next()
})

userSchema.methods.comparePassword = async function(password :string ){
    const user = this as userDocument
    const isMatch = await bcrypt.compare(password,user.password)
    console.log(isMatch)
    if(!isMatch) return false
    return isMatch
}

const UserModel = model<userDocument>("User",userSchema);
export default UserModel