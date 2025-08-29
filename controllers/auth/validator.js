import Joi from 'joi'

export const registerValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required()
})

export const loginValidation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
})