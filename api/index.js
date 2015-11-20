var express         = require('express'),
    cors            = require('cors'),
    path            = require('path'),
    morgan          = require('morgan'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    cookieParser    = require('cookie-parser'),
    methodOverride  = require('method-override'),
    jwt             = require('jsonwebtoken'),
    expressJWT      = require('express-jwt'),
    app             = express();

var config          = require(path.join(__dirname,'config','config'));
var secret          = config.secret;

mongoose.connect(config.database);

require(path.join(__dirname,'config','passport'))(passport);

app.use(methodOverride(function(req, res) {
  if (req.body & typeof req.body === 'object' && '_method' in req.body) {
    ver method = req.body._method;
    delete req.body._method;
    return method;
  };
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser);
app.use(morgan('dev'));
app.use(cors);
app.use(passport.initialize());



var routes          = require(path.join(__dirname,'config','routes'));
app.use('/api', routes);

app.listen(process.env.PORT || 3000);