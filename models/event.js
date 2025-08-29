import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    slug: String,
    description: String,
    location: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    organizer: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    status: {type: String, enum: ['publish', 'cancel'], default: 'draft'},
    },    
    {
        timestamps: true
    }
)

const Event = mongoose.model('events', eventSchema)
export default Event