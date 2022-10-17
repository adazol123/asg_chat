const chatSchema = require('../models/chatSchema');
const bcrypt = require('bcrypt')
const passport = require('passport')
const saltRounds = 14;


function getHome(req, res, next) {
    console.log("🟨 [cookies] > ", req.session.cookie, "\n🟨 [session] > " + req.sessionID)

    if (req.isAuthenticated()) {
        return res.json({ user: req.user })
    } else {
        return res.json({ user: req.user })
    }
    // console.log(req.isAuthenticated())
}


function getLogout(req, res, next) {
    req.logout((error) => {
        if (error) return next()
        else return res.send('logged-out')
    })
}


function postLogin(req, res, next) {
    passport.authenticate('local', (error, user) => {

        if (error) throw error;
        if (!user) {
            res.send("🚩 [passport] > Incorrect password. Please try again")
        }
        else {
            req.login(user, err => {
                if (err) throw err;
                //destructure user data and excluded password info
                let { _doc: { password, ...rest } } = req.user
                console.log('✅ [passport] > Sucessfully authenticated')
                res.send({ user: rest })
            })
        }
    })(req, res, next)
}

async function postRegister(req, res) {


    try {
        //checking if user account is already registered on the database
        const userExists = await chatSchema.exists({ username: req.body.username })
        if (userExists) throw Error('🚩 [mongodb] > User Already Exists')

        else {
            if (req.body.confirm_password === req.body.password) {
                bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
                    const registerUser = new chatSchema({
                        displayName: req.body.displayName,
                        username: req.body.username.toLowerCase(),
                        password: hash,
                        loginType: 'local'
                    })
                    await registerUser.save()
                    res.json({ user: req.user })
                })

            } else {
                throw Error('🚩 [mongodb] > Password not match!')
            }
        }
    } catch (error) {
        console.log(error.message)
        return res.send(error.message)
    }

}


module.exports = {
    getHome, postLogin, postRegister, getLogout
}