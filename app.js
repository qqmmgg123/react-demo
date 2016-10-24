var path = require('path')
  , express = require('express')
  , webpack = require('webpack')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')
  , sessions = require("client-sessions")
  , Schema = mongoose.Schema;

// user configuration
var credentials = {
    username: 'qqmmgg123',
    password: 'qnmdwbd0000'
};
var sessionSecret = 'something-random-and-SECRET!';


var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpackConfig = require('./webpack.config');

var app = express();

var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true}
}));
app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000)
app.use(sessions({
    cookieName: 'swanAdminSession',
    secret: sessionSecret,
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5
}));


// mongoose
mongoose.connect('mongodb://localhost/suopoearth');

// Register routes
app.use('/', require('./routes'));

// Any other page requires authentication
app.use(function (req, res, next) {
    if (req.swanAdminSession.loggedInAs !== credentials.username) {
        res.redirect(app.mountpath + '/login');
    } else {
        res.locals.authenticated = true;
        next();
    }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error(settings.PAGE_NOT_FOND_TIPS);
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        info: err.message,
        result: 1
    });

});

app.listen(3000);
