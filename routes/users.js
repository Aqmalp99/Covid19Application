var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

let users = {
    test: 'password',
    test2: 'p2'
};

router.post('/login', function(req, res, next) {

    if( 'user' in req.body ) {
        if(req.body.user in users){
            if(users[req.body.user] === req.body.pass){
                req.session.user = req.body.user;
                console.log("logged in");
                //res.send(req.session.user);
                res.redirect(302,'/homeUser.html');
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    }
});

module.exports = router;
