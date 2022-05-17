import Joi from "joi";

export const signUpSchema =Joi.object({
    firstName : Joi.string().required().label('First Name'),
    lastName :Joi.string().required().label('Last Name'),
    email : Joi.string().email({tlds: {allow :false}}).label('Email'),
    password :Joi.string().required().min(6).label('Password'),
    confirmPassword : Joi.any().equal(Joi.ref('password'))
        .required()
        .label('Confirm Password')
        .options({ messages: { 'any.only': '{{#label}} does not match'} }),
    addresses : Joi.array().items(Joi.string()).allow('').label('Addresses')
})

export const createUserSchema =Joi.object({
    firstName : Joi.string().required().label('First Name'),
    lastName :Joi.string().required().label('Last Name'),
    email : Joi.string().email({tlds: {allow :false}}).label('Email')
})

export const changePasswordSchema =Joi.object({
    currentPassword : Joi.string().required().min(6).label('Password'),
    password :Joi.string().required().min(6).label('Password'),
    confirmPassword : Joi.any().equal(Joi.ref('password'))
        .required()
        .label('Confirm Password')
        .options({ messages: { 'any.only': '{{#label}} does not match'} }),
})

export const userProfileSchema =Joi.object({
    firstName : Joi.string().required().label('First Name'),
    lastName :Joi.string().required().label('Last Name'),
    addresses : Joi.array().items(Joi.string()).allow('').label('Addresses'),
    profilePic : Joi.string().allow('').label('Profile pic')
})

export const signInSchema = Joi.object({
    email : Joi.string().email({tlds: {allow :false}}).label('Email'),
    password :Joi.string().required().min(6).label('Password'),
})