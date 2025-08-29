import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Server as SocketIOServer } from 'socket.io'
import connectDB from './config/index.js'
import dotenv from 'dotenv'
import setupRoutes from './routes/index.js'

dotenv.config()

const app = express()

const server = http.createServer(app)
const io = new SocketIOServer(server, {
    cors: {
        origin: '*'
    }
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

connectDB()
setupRoutes(app)

app.use('/', (req, res) => {
    console.log('Hello world!')
})

const port = 3001

server.listen(port, () => {
    console.log('Server is running')
})