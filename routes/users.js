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

router.get('/checkInsUser', function(req, res, next)
{
    req.pool.getConnection(function (err, connection)
    {
        if (err)
        {
            res.sendStatus(500);
            return;
        }


        if (req.query.vname.length > 0 && req.query.stNum.length > 0 && req.query.stName.length > 0 && req.query.suburb.length > 0 && req.query.postcode.length > 0 && req.query.state.length > 0 && req.query.date.length > 0 && req.query.sTime.length > 0 && req.query.eTime.length > 0)
        {
            console.log("scenario 1");
            let vname = req.query.vname;
            let streetNumber = req.query.stNum;
            let streetName = req.query.stName;
            let suburb = req.query.suburb;
            let postcode = req.query.postcode;
            let state = req.query.state;
            let checkinDate = req.query.date;
            let startTime = req.query.sTime;
            startTime += ":00";
            let endTime = req.query.eTime;
            endTime += ":00";

            let userObject = req.session.user;
            let userID = userObject.userID;

            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, checkins.checkindate, checkins.checkintime
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


            connection.query(query,[userID, vname, streetNumber, streetName, suburb, state, postcode, checkinDate, startTime, endTime], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }
            });
        }

        if (req.query.vname.length > 0 && req.query.stNum.length <= 0 && req.query.stName.length <= 0 && req.query.suburb.length <= 0 && req.query.postcode.length <= 0 && req.query.state.length <= 0 && req.query.date.length <= 0 && req.query.sTime.length <= 0 && req.query.eTime.length <= 0)
        {
            console.log("scenario 2");
            let vname = req.query.vname;

            let userObject = req.session.user;
            let userID = userObject.userID;

            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.venue_name = ?)`;


            connection.query(query,[userID, vname], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }
            });
        }

        if (req.query.vname.length > 0 && req.query.stNum.length <= 0 && req.query.stName.length <= 0 && req.query.suburb.length <= 0 && req.query.postcode.length <= 0 && req.query.state.length <= 0 && req.query.date.length > 0 && req.query.sTime.length <= 0 && req.query.eTime.length <= 0)
        {
            console.log("scenario 3");
            let vname = req.query.vname;
            let checkinDate = req.query.date;

            let userObject = req.session.user;
            let userID = userObject.userID;

            let query = `SELECT venue.venue_name, checkins.checkindate
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.venue_name = ?
                    AND checkins.checkindate = ?)`;


            connection.query(query,[userID, vname, checkinDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }
            });
        }

        if (req.query.vname.length > 0 && req.query.stNum.length <= 0 && req.query.stName.length <= 0 && req.query.suburb.length <= 0 && req.query.postcode.length <= 0 && req.query.state.length <= 0 && req.query.date.length > 0 && req.query.sTime.length > 0 && req.query.eTime.length > 0)
        {
            console.log("scenario 4");
            let vname = req.query.vname;
            let checkinDate = req.query.date;
            let startTime = req.query.sTime;
            startTime += ":00";
            let endTime = req.query.eTime;
            endTime += ":00";

            let userObject = req.session.user;
            let userID = userObject.userID;

            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.venue_name = ?
                    AND checkins.checkindate = ?
                    AND checkins.checkintime BETWEEN ? AND ?)`;


            connection.query(query,[userID, vname, checkinDate, startTime, endTime], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }
            });
        }
        if (req.query.vname.length <= 0 && req.query.stNum.length <= 0 && req.query.stName.length <= 0 && req.query.suburb.length <= 0 && req.query.postcode.length <= 0 && req.query.state.length <= 0 && req.query.date.length > 0 && req.query.sTime.length <= 0 && req.query.eTime.length <= 0)
        {
            console.log("scenario 5");
            let checkinDate = req.query.date;

            let userObject = req.session.user;
            let userID = userObject.userID;

            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND checkins.checkindate = ?)`;


            connection.query(query,[userID, checkinDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }
            });
        }

        if (req.query.vname.length <= 0 && req.query.stNum.length > 0 && req.query.stName.length > 0 && req.query.suburb.length <= 0 && req.query.postcode.length <= 0 && req.query.state.length <= 0 && req.query.date.length <= 0 && req.query.sTime.length <= 0 && req.query.eTime.length <= 0)
        {
            console.log("scenario 6");
            let streetNumber = req.query.stNum;
            let streetName = req.query.stName;

            let userObject = req.session.user;
            let userID = userObject.userID;

            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.street_number = ?
                    AND venue.street_name = ?)`;


            connection.query(query,[userID, streetNumber, streetName], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }
            });
        }
        if (req.query.vname.length <= 0 && req.query.stNum.length <= 0 && req.query.stName.length > 0 && req.query.suburb.length <= 0 && req.query.postcode.length <= 0 && req.query.state.length <= 0 && req.query.date.length <= 0 && req.query.sTime.length <= 0 && req.query.eTime.length <= 0)
        {
            console.log("scenario 7");
            let streetName = req.query.stName;

            let userObject = req.session.user;
            let userID = userObject.userID;

            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.street_name = ?)`;


            connection.query(query,[userID, streetName], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }
            });
        }
        if (req.query.vname.length <= 0 && req.query.stNum.length <= 0 && req.query.stName.length > 0 && req.query.suburb.length > 0 && req.query.postcode.length <= 0 && req.query.state.length <= 0 && req.query.date.length <= 0 && req.query.sTime.length <= 0 && req.query.eTime.length <= 0)
        {
            console.log("scenario 8");
            let streetName = req.query.stName;
            let suburb = req.query.suburb;

            let userObject = req.session.user;
            let userID = userObject.userID;

            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.street_name = ?
                    AND venue.suburb = ?)`;


            connection.query(query,[userID, streetName, suburb], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }
            });
        }

        if (req.query.vname.length <= 0 && req.query.stNum.length <= 0 && req.query.stName.length > 0 && req.query.suburb.length <= 0 && req.query.postcode.length > 0 && req.query.state.length <= 0 && req.query.date.length <= 0 && req.query.sTime.length <= 0 && req.query.eTime.length <= 0)
        {
            console.log("scenario 9");
            let streetName = req.query.stName;
            let postcode = req.query.postcode;

            let userObject = req.session.user;
            let userID = userObject.userID;

            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.street_name = ?
                    AND venue.postcode = ?)`;


            connection.query(query,[userID, streetName, postcode], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }
            });
        }
        if (req.query.vname.length <= 0 && req.query.stNum.length <= 0 && req.query.stName.length <= 0 && req.query.suburb.length <= 0 && req.query.postcode.length > 0 && req.query.state.length <= 0 && req.query.date.length <= 0 && req.query.sTime.length <= 0 && req.query.eTime.length <= 0)
        {
            console.log("scenario 10");
            let postcode = req.query.postcode;

            let userObject = req.session.user;
            let userID = userObject.userID;

            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.postcode = ?)`;


            connection.query(query,[userID, postcode], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }
            });
        }
        if (req.query.vname.length <= 0 && req.query.stNum.length <= 0 && req.query.stName.length <= 0 && req.query.suburb.length <= 0 && req.query.postcode.length <= 0 && req.query.state.length > 0 && req.query.date.length <= 0 && req.query.sTime.length <= 0 && req.query.eTime.length <= 0)
        {
            console.log("scenario 11");
            let state = req.query.state;

            let userObject = req.session.user;
            let userID = userObject.userID;

            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.state = ?)`;


            connection.query(query,[userID, state], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }
            });
        }

        if (req.query.vname.length <= 0 && req.query.stNum.length <= 0 && req.query.stName.length <= 0 && req.query.suburb.length <= 0 && req.query.postcode.length <= 0 && req.query.state.length > 0 && req.query.date.length > 0 && req.query.sTime.length <= 0 && req.query.eTime.length <= 0)
        {
            console.log("scenario 12");
            let state = req.query.state;
            let checkinDate = req.query.date;

            let userObject = req.session.user;
            let userID = userObject.userID;

            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.state = ?
                    AND checkins.checkindate = ?)`;


            connection.query(query,[userID, state, checkinDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }
            });
        }

        if (req.query.vname.length <= 0 && req.query.stNum.length <= 0 && req.query.stName.length <= 0 && req.query.suburb.length <= 0 && req.query.postcode.length > 0 && req.query.state.length <= 0 && req.query.date.length > 0 && req.query.sTime.length > 0 && req.query.eTime.length > 0)
        {
            let postcode = req.query.postcode;
            let checkinDate = req.query.date;
            let startTime = req.query.sTime;
            startTime += ":00";
            let endTime = req.query.eTime;
            endTime += ":00";

            let userObject = req.session.user;
            let userID = userObject.userID;

            let query = `SELECT venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN checkins
                    ON users.userID = checkins.userID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (users.userID = ?
                    AND venue.postcode = ?
                    AND checkins.checkindate = ?
                    AND checkins.checkintime BETWEEN ? AND ?)`;


            connection.query(query,[userID, vname, checkinDate, startTime, endTime], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }
            });
        }

        console.log(rows);
        res.json(rows);
        res.end();
    });
});

module.exports = router;
