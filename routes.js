var router = require('express').Router();

// Simple authentication, for now
router.get('/login', function (req, res, next) {
    res.sendFile('demo.html', { root: __dirname });
});

router.post('/login', function (req, res, next) {
    if (req.body.username === credentials.username && req.body.password === credentials.password) {
        req.swanAdminSession.loggedInAs = credentials.username;
        res.redirect('/');
    } else {
        next({
            message: 'Invalid credentials'
        });
    }
});

router.get('/logout', function (req, res, next) {
    req.swanAdminSession.loggedInAs = null;
    res.redirect('/');
});

router.get('/', function(req, res, next) {
    res.sendFile('dreams.html', { root: __dirname });
});

router.get('/dreams', function (req, res, next) {
    res.json({
        info: err.message,
        result: 1
    });
});

module.exports = router;
