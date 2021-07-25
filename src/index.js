//Snippet to create a nodejs server
const express = require('express')
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//Inits
const app = express();
require('./database');
require('./passport/local-auth');

//settings
app.set('port', process.env.PORT || 3000);

//starting the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
////////////////////////////////////////////


//Snippet to set morgan so we can see in the console what the user is requesting
const morgan = require('morgan');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'secretsession',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//snippets for warning messages
app.use((req, res, next) =>{
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    next();
});
////////////////////////////////////////////////


//Snippets to require the routes so we can call everything from views folder
app.use('/', require('./routes/index'));
///////////////////////////////////////////////


//Snippet to set EJS with a src folder path
const path = require('path'); 
app.set('views', path.join(__dirname, 'views'));

const engine = require('ejs-mate');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
////////////////////////////////////////////////
