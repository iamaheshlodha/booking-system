import { User } from "../models/index.js"
import { handleErrorResponse } from "../utils"
import jwt from "jsonwebtoken"

export const middleware = async(req, res, next) =>{
    try {
        
    
    const token = req.headers.authorization.split(' ')[1]

    if(!token) return handleErrorResponse(res, 401, 'Token not found')

    const decoded = jwt.verify(token, 'secret')

    const user = await User.findOne({id: decoded.id})

    if(!user) return handleErrorResponse(res, 401, 'Unauthrized access')
    next()

    } catch (error) {
        handleErrorResponse(res, 401, 'Unauthrized access')
    }
}