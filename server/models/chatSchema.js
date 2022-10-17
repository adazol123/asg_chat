const { Schema, model } = require('mongoose')

//Structure of Message on the database
const MessageSchema = new Schema({
    name: String,
    message: String,
    chatID: String,

}, { timestamps: true })

//Structure of Users Chats on the database
const ChatSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    displayName: {
        type: String,
        required: true,
        unique: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    loginType: String,
    contacts: [{
        name: String,
        contact_id: String,
    }],
    chat: [MessageSchema]
})



module.exports = model('chats', ChatSchema)