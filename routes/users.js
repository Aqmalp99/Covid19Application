var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
req.pool.getConnection(function(err,connection)
  {
      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
      var email=req.body.user;
      var pass=req.body.pass;
      var typeLogin=req.body.type;
      var isHOorVenman=0;

      var query=`SELECT given_name FROM users WHERE email= ? AND  password=? AND isUser=?;`;
      if(typeLogin=="venuemanager")
      {
        isHOorVenman=1;
        query=`SELECT given_name FROM users WHERE email= ? AND  password=? AND isVenueManager=?`;
      }
      else if(typeLogin=="healthofficial")
      {
        isHOorVenman=1;
        query=`SELECT given_name FROM users WHERE email= ? AND  password=? AND isHealthOfficial=?`;

      }


      connection.query(query,[email,pass,isHOorVenman],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          req.session.user = req.body.user;

            // res.send(req.session.user);
            if(rows.length===0)
            {
                res.sendStatus(500);
                return;
            }
            console.log("logged in");
            res.json(rows);
      });
  });
    // if( 'user' in req.body ) {
    //     if(req.body.user in users){
    //         if(users[req.body.user] === req.body.pass){
    //             req.session.user = req.body.user;
    //             console.log("logged in");
    //             res.send(req.session.user);
    //             //res.redirect(302,'/homeUser.html');
    //         } else {
    //             res.sendStatus(401);
    //         }
    //     } else {
    //         res.sendStatus(401);
    //     }
    // }
});

router.post('/signup', function(req, res, next) {
  req.pool.getConnection(function(err,connection)
  {

      if(err)
      {
          res.sendStatus(500);
          return;
      }
      var first_name=req.body.first_name;
      var last_name=req.body.last_name;
      var dob=req.body.dob;
      var phone_num=req.body.phone_num;
      var email=req.body.email;
      var streetnum=req.body.streetnum;
      var streetname=req.body.streetname;
      var suburb=req.body.suburb;
      var postcode=req.body.postcode;
      var state=req.body.state;
      var password=req.body.password;

      var query=`INSERT INTO users
                 (given_name,surname,street_number,street_name,surburb,state,postcode,
                 contact_number,date_of_birth,email,password,isVenueManager,isHealthOfficial,isUser)
                 VALUES (?,?,?,?,?,?,?,?,?,?,?,0,0,0);`;
      connection.query(query,[first_name,last_name,streetnum,streetname,suburb,state,postcode,phone_num,dob,email,password],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          res.end();
      });
  });
});

module.exports = router;
