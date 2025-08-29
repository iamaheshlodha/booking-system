import slugify from "slugify"
import { handleErrorResponse, handleResponse } from "../utils"
import { Event } from "../models/index.js"

const genrateSlug = async(name) => {
    let slug = slugify(name)

    let exists = await Event.findOne({slug: slug})

    while(exists){
        const randomStr = Math.random().toString(36).substring(2, 8)
        slug = `${slugify(name)}-${randomStr}`
        exists = await Event.findOne({slug: slug})
    }

    return slug
}

export const createEvent = async(req, res) => {
    try {
        const {title, description, location, startDate, endDate, organizer } = req.body
         const slug = await genrateSlug(title)

        const event = await Event.create({title, description, location, startDate, endDate, slug, organizer})

        handleResponse(res, 201, 'Event created successfully', {data: event})
    } catch (error) {
        handleErrorResponse(res, 400, error)
    }
}

export const updateEvent = async(req, res) => {
    try {
        const {id} = req.query

        const event = await Event.findOne({id})

        if(!event) return handleErrorResponse(res, 400, 'Event not found')

        const {title, description, location, startDate, endDate, organizer } = req.body



        const updatedEvent = await Event.findByIdAndUpdate(id, {title, description, location, startDate, endDate, slug, organizer})

        handleResponse(res, 201, 'Event updated successfully', {data: updatedEvent})
    } catch (error) {
        handleErrorResponse(res, 400, error)
    }
}