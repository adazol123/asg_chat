const express = require('express')
const app = express()
const port = process.env.PORT || '8000'
const http = require('http')
const server = http.createServer(app)
const mongoose = require('mongoose')
const route = require('./routes/index')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')

/**
 *  mongodb connection string below was exposed here for demo purposes only. but for security concern it should store on a safe and privite environment like dot env variable
 * 
 * PS: I've intentionally exposed and set the user and password credential with limited access control on mongodb atlas
 * */
let uri = `mongodb+srv://chat:chatpassword@pegaxy.yxitn.mongodb.net/?retryWrites=true&w=majority`

// SocketIO 
const io = require('socket.io')(server, { cors: { origin: '*' } })


//Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 *  secret code below was exposed here for demo purposes only. but for security concern it should store on a safe and privite environment like dot env variable
 * */
app.use(session({ secret: 'DEMO_SECRET_CODE', resave: false, saveUninitialized: true }))
app.use(cookieParser('DEMO_SECRET_CODE'))
app.use(passport.initialize())
app.use(passport.session())
require('./middleware/auth')(passport);
app.use('/', route)


//Initialize connnection with socket io
io.on('connection', (socket) => {
    socket.on('message', ({ name, message }) => {
        io.emit('message', { name, message })
    })
})



//Initialize the server
server.listen(port, async () => {
    try {
        if (mongoose.connection.readyState === 1) return console.log('✅ [mongodb] > cache connection started')
        else {
            mongoose.connect(uri, { keepAlive: true })
            console.log('✅ [mongodb] > new connection started')
            return console.log(`✅ [server] > app listening on port ${port}`)

        }
    } catch (error) {
        console.log(error)
    }
})