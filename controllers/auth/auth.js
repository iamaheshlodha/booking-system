import { User } from "../../models/index.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { handleErrorResponse, handleResponse } from "../../utils/index.js"
import { loginValidation, registerValidation } from "./validator.js"

export const register = async(req, res) => {
    try {
        const {error} = registerValidation.validate(req.body)

        if(error) return handleErrorResponse(res, 400, error)

        const {name, email, password, role} = req.body

        const existUser = await User.findOne({where: {email: email}})

        if(existUser){
           return handleErrorResponse(res, 400, 'User already exist!')
        }

        const hashed = await bcrypt.hash(password, 10)

        const newUser = await User.create({name, email, password: hashed, role})

        const token = jwt.sign({id: newUser._id}, 'secret', {expiresIn: '1d'})

        const {password: _, ...userWithoutPassowrd} = newUser.toObject()

        return handleResponse(res, 201, 'User created successfully', {
            token,
            data: userWithoutPassowrd
        })
    } catch (error) {
        console.log('error :>> ', error);
        handleErrorResponse(res, 400, error)
    }
}

export const login = async(req, res) => {
    try {
    const {error} = loginValidation.validate(req.body)

    if(error) return handleErrorResponse(res, 400, error)

    const {email, password} = req.body

    const user = await User.findOne({email})
    if(!user) return handleErrorResponse(res, 400, 'User not found')

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) return handleErrorResponse(res, 400, 'Passowrd not match')

        const token = jwt.sign({id: newUser._id}, 'secret', {expiresIn: '1d'})

    handleResponse(res, 200, 'Login successfully!', {
        token
    })
       
    } catch (error) {
        handleErrorResponse(res, 400, error)
    }
}