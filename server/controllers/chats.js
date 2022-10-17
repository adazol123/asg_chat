const chatSchema = require('../models/chatSchema');

//List of chats that current authenticated user has
async function getChat(req, res) {
    try {
        let conversations = await chatSchema.find({ chat: { $exists: true, $ne: [] } }, {
            _id: 0, 'password': 0, 'username': 0, loginType: 0, displayName: 0
        }).$where({ username: req.user.username })
        return res.json({ conversations })
    } catch (error) {
        console.log(error)
    }
}

//add chat to current authenticated user uder his chats array
async function postChat(req, res) {

    try {
        await chatSchema.findByIdAndUpdate(req.user.id, {
            $push: {
                chat: {
                    name: req.body.name,
                    message: req.body.message,
                    content: req.body.timestamp,
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

//remove specific chat based on its chatID
async function deleteChat(req, res) {
    try {
        await chatSchema.updateOne({ _id: req.user.id }, {
            $pull: { post: { _id: req.body.chatID } }
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    postChat, getChat, deleteChat
}