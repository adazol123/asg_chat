const express = require('express');
const { getLogin, getRegister, postRegister, postLogin, getHome, getLogout } = require('../controllers');
const { getChat, postChat, deleteChat } = require('../controllers/chats');
const { isLoggedIn, isLoggedOut } = require('../middleware/session');

const router = express.Router()

//Account login endpoints
router.route('/login')
    .post(postLogin)

router.get('/logout', getLogout)

//Account registration endpoints
router.route('/register')
    .post(postRegister)

router.route('/user')
    .get(isLoggedOut, getHome)

//Root endpoint
router.get('/', (_, res) => {
    res.json({
        success: 'OK',
        message: 'WELCOME TO ASG CHAT APP [BACKEND] (ASSESSMENT)'
    })
})

// chat endpoint
router.route('/conversations')
    .get(getChat)
    .post(postChat)
    .delete(deleteChat)



module.exports = router;