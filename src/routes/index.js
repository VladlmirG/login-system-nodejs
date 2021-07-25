const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('index');
});

//signup Router
router.get('/signup', (req, res, next) =>{
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup' ,{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));


//login router
router.get('/signin', (req, res, next) =>{
    res.render('signin');
});

router.post('/signin',passport.authenticate('local-signin' ,{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

//Logout router
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

//Rule to set which pages are protected once you logout
router.use((req, res, next) =>{
    isAuthenticated(req, res, next);
    next();
});

//logout pages protectin fuciton
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next ();
    }
    res.redirect('/');
};
////////////////////////////////////////////

//Profile router
router.get('/profile', (req, res, next) => {
    res.render('profile');
});


module.exports = router;