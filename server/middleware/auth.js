const chatSchema = require('../models/chatSchema');

//used bcrypt for hashing the password to make it slightly secure when storing sensitive info to database
const bcrypt = require('bcrypt')

//login authentication using username and password blueprint strategy
const localStrategy = require('passport-local').Strategy;

module.exports = (passport) => {



    //Cookies and Sessions | to create local strategy
    passport.use(new localStrategy(async (username, password, done) => {
        try {
            //Find existing user on the database
            chatSchema.findOne({ username: username }, (error, user) => {
                if (error) throw error;
                if (!user) return done(null, false, { message: '🚩 [mongodb] > Account not exists.' })

                //unhashing the password with bcrypt if matched
                bcrypt.compare(password, user.password, (error, result) => {
                    console.log(password, user)
                    if (error) throw error;
                    if (result === true) return done(null, user)
                    else return done(null, false, { message: '🚩 [bcrypt] > Incorrect password.' })

                })
            })

        } catch (error) {
            console.log(error)
        }
    }));

    //serialization and deserialization of cookies session
    passport.serializeUser((user, callback) => { callback(null, user.id); console.log('✅ [serialize] > ' + user.id) });
    passport.deserializeUser((id, callback) => { chatSchema.findById(id, { 'password': 0 }, (error, user) => { callback(error, user); console.log('✅ [deserialize] > ' + user.id) }) })
}