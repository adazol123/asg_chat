function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    else return res.json({ data: res.user })
}

function isLoggedOut(req, res, next) {
    if (req.isAuthenticated()) return res.redirect('/secrets')
    else return next()
}

module.exports = {
    isLoggedIn,
    isLoggedOut
}