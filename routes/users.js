var express = require('express');
var router = express.Router();


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

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

      var query=`SELECT userID, given_name,isVenueManager,isHealthOfficial  FROM users WHERE email= ? AND  password=SHA2(?,256) AND isUser=?;`;
      if(typeLogin=="venuemanager")
      {
        isHOorVenman=1;
        query=`SELECT userID, given_name,isVenueManager,isHealthOfficial FROM users WHERE email= ? AND  password=SHA2(?,256) AND isVenueManager=?`;
      }
      else if(typeLogin=="healthofficial")
      {
        isHOorVenman=1;
        query=`SELECT userID, given_name,isVenueManager,isHealthOfficial FROM users WHERE email= ? AND  password=SHA2(?,256) AND isHealthOfficial=?`;

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


            // res.send(req.session.user);
            if(rows.length===0)
            {
                res.sendStatus(401);
                return;
            }
            req.session.user = rows[0];
            console.log("logged in");
            res.json(rows);
      });
  });

});

router.post('/logout', function(req, res, next) {

    delete req.session.user;
    res.send();

});

router.post('/signup', function(req, res, next) {
  req.pool.getConnection(function(err,connection)
  {

      if(err)
      {
        console.log(err);
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
      var venman=req.body.venMan;
      var HO=0;


      var query=`INSERT INTO users
                 (given_name,surname,street_number,street_name,surburb,state,postcode,
                 contact_number,date_of_birth,email,password,isVenueManager,isHealthOfficial,isUser)
                 VALUES (?,?,?,?,?,?,?,?,?,?,SHA2(?,256),?,?,0);`;
      connection.query(query,[first_name,last_name,streetnum,streetname,suburb,state,postcode,phone_num,dob,email,password,venman,HO],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          req.session.user = first_name;
          console.log("logged in");
          res.json(rows);
          res.end();
      });
  });
});

router.use(function(req, res, next) {
    if('user' in req.session){
      console.log(req.session.user);
        next();
    } else {
        res.sendStatus(401);
    }
});

router.post('/checkuser', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/checkInsUser', function (req, res, next) {
    req.pool.getConnection(function (err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        if (req.query.vname.length > 0 && req.query.vname !== null) {
            var vname = req.query.vname;
        }

        if (req.query.stNum.length > 0 && req.query.stNum !== null) {
            var streetNumber = req.query.stNum;
        }

        if (req.query.stName.length > 0 && req.query.stName !== null) {
            var streetName = req.query.stName;
        }
        if (req.query.suburb.length > 0 && req.query.suburb !== null) {
            var suburb = req.query.suburb;
        }
        if (req.query.postcode.length > 0 && req.query.postcode !== null) {
            var postcode = req.query.postcode;
        }

        if (req.query.state.length > 0 && req.query.state !== null) {
            var state = req.query.state;
        }
        if (req.query.date.length > 0 && req.query.date !== null) {
            var checkinDate = req.query.date;
        }
        if (req.query.sTime.length > 0 && req.query.sTime !== null) {
            var startTime = req.query.sTime;
        }
        if (req.query.eTime.length > 0 && req.query.eTime !== null) {
            var endTime = req.query.eTime;
        }

        var userObject = req.session.user;
        var userID = userObject.userID;

        var query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.venue_name = ?
                    AND venue.street_number = ?
                    AND venue.street_name = ?
                    AND venue.suburb = ?
                    AND venue.state = ?
                    AND venue.postcode = ?
                    AND checkins.checkindate = ?
                    AND checkins.checkintime BETWEEN ? AND ?)`;


        connection.query(query,[userID, vname, streetNumber, streetName, suburb, state, postcode, checkinDate, startTime, endTime] , function (err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
            console.log(rows);
            res.sendStatus(200);
        });
    });
});

router.get('/checkInsVenue', function (req, res, next) {
    req.pool.getConnection(function (err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        if (req.query.fname.length > 0 && req.query.fname !== null) {
            var firstName = req.query.fname;
        }

        if (req.query.sname.length > 0 && req.query.sname !== null) {
            var surname = req.query.sname;
        }
        if (req.query.date.length > 0 && req.query.date !== null) {
            var checkinDate = req.query.date;
        }
        if (req.query.sTime.length > 0 && req.query.sTime !== null) {
            var startTime = req.query.sTime;
        }
        if (req.query.eTime.length > 0 && req.query.eTime !== null) {
            var endTime = req.query.eTime;
        }

        var query = `SELECT users.given_name, users.surname, users.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (venue.venueID = ?
                    AND user.given_name = ?
                    AND user.surname = ?
                    AND checkins.checkindate = ?
                    AND checkins.checkintime BETWEEN ? AND ?)`;

        connection.query(query,[firstName, surname, checkinDate, startTime, endTime] , function (err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.sendStatus(200);
        });
    });
});

router.get('/checkInsAdmin', function (req, res, next) {
    req.pool.getConnection(function (err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        // if (req.query.fname.length > 0 && req.query.fname !== NULL) {
        //     var firstName = req.query.fname;
        // }

        // if (req.query.sname.length > 0 && req.query.sname !== NULL) {
        //     var surname = req.query.sname;
        // }

        // if (req.query.vname.length > 0 && req.query.vname !== NULL) {
        //     var vname = req.query.vname;
        // }

        // if (req.query.vaddress.length > 0 && req.query.vaddress !== NULL) {
        //     var vaddress = req.query.vaddress;
        // }
        // if (req.query.state.length > 0 && req.query.state !== NULL) {
        //     var state = req.query.state;
        // }
        // if (req.query.date.length > 0 && req.query.date !== NULL) {
        //     var checkinDate = req.query.date;
        // }
        // if (req.query.sTime.length > 0 && req.query.sTime !== NULL) {
        //     var startTime = req.query.sTime;
        // }
        // if (req.query.eTime.length > 0 && req.query.eTime !== NULL) {
        //     var endTime = req.query.eTime;
        // }

        var query = "SELECT users.given_name, users.surname, users.contact_number, venue.venue_name, ????Address???? venue.contact_number, checkins.checkindate, checkins.checkintime FROM users INNER JOIN checkins ON users.userID = checkins.userID INNER JOIN venue ON checkins.venueID = venue.venueID WHERE (given_name IS ? AND surname IS ? AND venue_name IS ? AND street_number IS ? AND street_name IS ? AND suburb IS ? AND city IS ? AND state IS ? and postcode IS ? AND checkindate IS ? AND checkintime BETWEEN ? AND ?)";


        connection.query(query,["John", "Appleseed", "1", "1", "Britton Avenue", "Tranmere", "Adelaide", "South Australia", "5073", "2021-05-12", "11:55:00", "12:55:00"] , function (err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.sendStatus(200);
        });
    });
});

router.get('/manageHotspots', function (req, res, next) {
    req.pool.getConnection(function (err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        // if (req.query.vname.length > 0 && req.query.vname !== NULL) {
        //     var vname = req.query.vname;
        // }

        // if (req.query.vaddress.length > 0 && req.query.vaddress !== NULL) {
        //     var vaddress = req.query.vaddress;
        // }
        // if (req.query.state.length > 0 && req.query.state !== NULL) {
        //     var state = req.query.state;
        // }
        // if (req.query.date.length > 0 && req.query.date !== NULL) {
        //     var checkinDate = req.query.date;
        // }
        // if (req.query.sTime.length > 0 && req.query.sTime !== NULL) {
        //     var startTime = req.query.sTime;
        // }
        // if (req.query.eTime.length > 0 && req.query.eTime !== NULL) {
        //     var endTime = req.query.eTime;
        // }

        var query = "SELECT venue.venue_name, ?????Address??????, venue.contact_number, hotspots.start_date, hotspots.end_date FROM venue INNER JOIN hotspots ON venue.venueID = hotspots.venueID WHERE (venue_name IS ? AND street_number IS ? AND street_name IS ? AND suburb IS ? AND city IS ? AND state IS ? and postcode IS ? AND checkindate IS ? AND checkintime BETWEEN ? AND ?)";

        connection.query(query,["Cafe", "1", "Britton Avenue", "Tranmere", "Adelaide", "South Australia", "5073", "2021-05-12", "11:55:00", "12:55:00"] , function (err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.sendStatus(200);
        });
    });
});

module.exports = router;
