var express = require('express');
var router = express.Router();

const CLIENT_ID = '446524906437-lhb7qotm0adcd8j891vm50ol8t1p0u5h.apps.googleusercontent.com';

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });



router.post('/login', function(req, res, next) {
  var typeLogin=req.body.type;
    var user=0;
    var venMan=0;
    var HO=0;
    if(typeLogin=="venuemanager")
      {
        venMan=1;
      }
      else if(typeLogin=="healthofficial")
      {
        HO=1;
      }
  if( 'user' in req.body && 'pass' in req.body) {
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
            req.session.user = rows;
            // console.log("logged in");
            res.json(rows);


              });
          });
        }

        else if( 'token' in req.body ) {

        async function verify() {
          const ticket = await client.verifyIdToken({
              idToken: req.body.token,
              audience: CLIENT_ID,
          });
          const payload = ticket.getPayload();
          req.pool.getConnection( function(err,connection) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                var query = `SELECT userID, given_name,isVenueManager,isHealthOfficial
                                FROM users WHERE email = ? AND isUser=?;`;
                connection.query(query,[payload['email'],user,venMan,HO], function(err, rows, fields) {
                  connection.release(); // release connection
                  if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                  }
                  if(rows.length > 0){
                      req.session.user = rows[0];
                      res.json(rows);

                  } else {

                      res.sendStatus(401);
                  }
                });
            });
        }
        verify().catch(function(){res.sendStatus(401);});

    } else {
        res.sendStatus(400);
    }

});

router.post('/logout', function(req, res, next) {

    delete req.session.user;
    res.sendStatus(200);

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
      // if(venman==1)
      // {
      //   checkVen=1;
      // }

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
          // req.session.user = first_name;

          // res.json(rows);

            res.end();

      });


  });


  });
router.post('/signupAdmin', function(req, res, next) {

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
      var HO=1;
      var venman=0;
      // if(venman==1)
      // {
      //   checkVen=1;
      // }

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
          // req.session.user = first_name;

          // res.json(rows);

            res.end();

      });


  });


  });


router.use(function(req, res, next) {
    if('user' in req.session){
    //   console.log(req.session.user);
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
    var vnameBool = true;
    var streetNumberBool = true;
    var streetNameBool = true;
    var suburbBool = true;
    var postcodeBool = true;
    var stateBool = true;
    var checkinDateBool = true;
    var startTimeBool = true;
    var endTimeBool = true;

    var userObject = req.session.user;
    console.log(userObject);
    var userID = userObject[0].userID;
    console.log(userID);

    if (req.query.vname === undefined){
        vnameBool = false;
    }
    if (req.query.stNum === undefined){
        streetNumberBool = false;
    }
    if (req.query.stName === undefined){
        streetNameBool = false;
    }
    if (req.query.suburb === undefined){
        suburbBool = false;
    }
    if (req.query.postcode === undefined){
        postcodeBool = false;
    }
    if (req.query.state === undefined){
        stateBool = false;
    }
    if (req.query.date === undefined){
        checkinDateBool = false;
    }
    if (req.query.sTime === undefined){
        startTimeBool = false;
    }
    if (req.query.eTime === undefined){
        endTimeBool = false;
    }

    req.pool.getConnection(function (err, connection)
    {
        if (err)
        {
            res.sendStatus(500);
            return;
        }


        if (vnameBool === true && streetNumberBool === true && streetNameBool === true && suburbBool === true && postcodeBool === true && stateBool === true && checkinDateBool === true && startTimeBool === true && endTimeBool === true)
        {
            console.log("scenario 1");
            let vname = req.query.vname;
            let streetNumber = req.query.stNum;
            let streetName = req.query.stName;
            let suburb = req.query.suburb;
            let postcode = req.query.postcode;
            let state = req.query.state;
            let checkinDate = req.query.date;
            let startTime = req.query.sTime + ":00";
            let endTime = req.query.eTime + ":00";


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

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === true && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 2");
            let vname = req.query.vname;
            console.log(vname);

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

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === true && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === true && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 3");
            let vname = req.query.vname;
            let checkinDate = req.query.date;


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

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === true && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === true && startTimeBool === true && endTimeBool === true)
        {
            console.log("scenario 4");
            let vname = req.query.vname;
            let checkinDate = req.query.date;
            let startTime = req.query.sTime;
            startTime += ":00";
            let endTime = req.query.eTime;
            endTime += ":00";



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

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === true && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 5");
            let checkinDate = req.query.date;



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

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === true && streetNameBool === true && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 6");
            let streetNumber = req.query.stNum;
            let streetName = req.query.stName;



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

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === true && suburbBool === false && postcodeBool === false && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 7");
            let streetName = req.query.stName;


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

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === true && suburbBool === true && postcodeBool === false && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 8");
            let streetName = req.query.stName;
            let suburb = req.query.suburb;



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

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === true && suburbBool === false && postcodeBool === true && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 9");
            let streetName = req.query.stName;
            let postcode = req.query.postcode;


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

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === true && stateBool === false && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 10");
            let postcode = req.query.postcode;


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

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === true && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 11");
            let state = req.query.state;


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

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === true && checkinDateBool === true && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 12");
            let state = req.query.state;
            let checkinDate = req.query.date;


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

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === true && stateBool === false && checkinDateBool === true && startTimeBool === true && endTimeBool === true)
        {
            let postcode = req.query.postcode;
            let checkinDate = req.query.date;
            let startTime = req.query.sTime;
            startTime += ":00";
            let endTime = req.query.eTime;
            endTime += ":00";



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

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }
    });
});

router.get('/manageHotspots', function(req, res, next)
{
    var vnameBool = true;
    var streetNumberBool = true;
    var streetNameBool = true;
    var suburbBool = true;
    var postcodeBool = true;
    var stateBool = true;
    var startDateBool = true;

    if (req.query.vname === undefined){
        vnameBool = false;
    }
    if (req.query.stNum === undefined){
        streetNumberBool = false;
    }
    if (req.query.stName === undefined){
        streetNameBool = false;
    }
    if (req.query.suburb === undefined){
        suburbBool = false;
    }
    if (req.query.postcode === undefined){
        postcodeBool = false;
    }
    if (req.query.state === undefined){
        stateBool = false;
    }
    if (req.query.date === undefined){
        startDateBool = false;
    }

    req.pool.getConnection(function (err, connection)
    {
        if (err)
        {
            res.sendStatus(500);
            return;
        }


        if (vnameBool === true && streetNumberBool === true && streetNameBool === true && suburbBool === true && postcodeBool === true && stateBool === true && startDateBool === true)
        {
            console.log("scenario 1");
            vname = req.query.vname;
            streetNumber = req.query.stNum;
            streetName = req.query.stName;
            suburb = req.query.suburb;
            postcode = req.query.postcode;
            state = req.query.state;
            startDate = req.query.date;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, hotspots.start_date
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.venue_name = ?
                    AND venue.street_number = ?
                    AND venue.street_name = ?
                    AND venue.suburb = ?
                    AND venue.state = ?
                    AND venue.postcode = ?
                    AND hotspots.start_date = ?)`;


            connection.query(query,[vname, streetNumber, streetName, suburb, state, postcode, startDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === true && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && startDateBool === false)
        {
            console.log("scenario 2");
            let vname = req.query.vname;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, hotspots.start_date
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.venue_name = ?)`;


            connection.query(query,[vname], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === true && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && startDateBool === true)
        {
            console.log("scenario 3");
            let vname = req.query.vname;
            let startDate = req.query.date;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, hotspots.start_date
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.venue_name = ?
                    AND hotspots.start_date = ?)`;


            connection.query(query,[vname, startDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === true && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === false && startDateBool === true)
        {
            console.log("scenario 4");
            let startDate = req.query.date;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, hotspots.start_date
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (hotspots.start_date = ?)`;


            connection.query(query,[startDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === true && streetNameBool === true && suburbBool === false && postcodeBool === false && stateBool === false && startDateBool === false)
        {
            console.log("scenario 6");
            let streetNumber = req.query.stNum;
            let streetName = req.query.stName;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, hotspots.start_date
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.street_number = ?
                    AND venue.street_name = ?)`;


            connection.query(query,[userID, streetNumber, streetName], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === true && suburbBool === false && postcodeBool === false && stateBool === false && startDateBool === false)
        {
            console.log("scenario 7");
            let streetName = req.query.stName;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, hotspots.start_date
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.street_name = ?)`;


            connection.query(query,[streetName], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === true && suburbBool === true && postcodeBool === false && stateBool === false && startDateBool === false)
        {
            console.log("scenario 8");
            let streetName = req.query.stName;
            let suburb = req.query.suburb;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, hotspots.start_date
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.street_name = ?
                    AND venue.suburb = ?)`;


            connection.query(query,[streetName, suburb], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === true && suburbBool === false && postcodeBool === true && stateBool === false && startDateBool === false)
        {
            console.log("scenario 9");
            let streetName = req.query.stName;
            let postcode = req.query.postcode;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, hotspots.start_date
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.street_name = ?
                    AND venue.postcode = ?)`;

            connection.query(query,[streetName, postcode], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === true && stateBool === false && startDateBool === false)
        {
            console.log("scenario 10");
            let postcode = req.query.postcode;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, hotspots.start_date
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.postcode = ?)`;


            connection.query(query,[postcode], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === true && startDateBool === false)
        {
            console.log("scenario 11");
            let state = req.query.state;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, hotspots.start_date
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.state = ?)`;


            connection.query(query,[state], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (vnameBool === false && streetNumberBool === false && streetNameBool === false && suburbBool === false && postcodeBool === false && stateBool === true && startDateBool === true)
        {
            console.log("scenario 12");
            let state = req.query.state;
            let startDate = req.query.date;

            let query = `SELECT hotspots.hotspotID, venue.venue_name, venue.street_number, venue.street_name, venue.suburb, venue.state, venue.postcode, venue.contact_number, hotspots.start_date
                    FROM venue
                    INNER JOIN hotspots
                    ON venue.venueID = hotspots.venueID
                    WHERE (venue.state = ?
                    AND hotspots.start_date = ?)`;


            connection.query(query,[state, startDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }
    });
});

router.get('/checkinsVenue', function(req, res, next)
{
    var firstNameBool = true;
    var surnameBool = true;
    var checkinDateBool = true;
    var startTimeBool = true;
    var endTimeBool = true;

    if (req.query.fname === undefined){
        firstNameBool = false;
    }
    if (req.query.sname === undefined){
        surnameBool = false;
    }
    if (req.query.date === undefined){
        checkinDateBool = false;
    }
    if (req.query.sTime === undefined){
        startTimeBool = false;
    }
    if (req.query.eTime === undefined){
        endTimeBool = false;
    }

    req.pool.getConnection(function (err, connection)
    {
        if (err)
        {
            res.sendStatus(500);
            return;
        }


        if (firstNameBool === true && surnameBool === true && checkinDateBool === true && startTimeBool === true && endTimeBool === true)
        {
            console.log("scenario 1");
            let firstName = req.query.fname;
            let surname = req.query.fname;
            let checkinDate = req.query.date;
            let startTime = req.query.sTime + ":00";
            let endTime = req.query.eTime + ":00";

            let venueID = req.session.userID;

            let query = `SELECT users.given_name, users.surname, users.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN venue
                    ON users.userID = venue.userID
                    INNER JOIN checkins
                    ON venue.venueID = checkins.venueID
                    INNER JOIN venue
                    ON checkins.venueID = venue.venueID
                    WHERE (venue.userID = ?
                    AND users.given_name = ?
                    AND users.surname = ?
                    AND checkins.checkindate = ?
                    AND checkins.checkintime BETWEEN ? AND ?)`;


            connection.query(query,[venueID, firstName, surname, checkinDate, startTime, endTime], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === true && surnameBool === true && checkinDateBool === true && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 2");
            let firstName = req.query.fname;
            let surname = req.query.fname;
            let checkinDate = req.query.date;

            let venueID = req.session.userID;

            let query = `SELECT users.given_name, users.surname, users.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN venue
                    ON users.userID = venue.userID
                    INNER JOIN checkins
                    ON venue.venueID = checkins.venueID
                    WHERE (venue.userID = ?
                    AND users.given_name = ?
                    AND users.surname = ?
                    AND checkins.checkindate = ?)`;


            connection.query(query,[venueID, firstName, surname, checkinDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === true && surnameBool === true && checkinDateBool === false && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 3");
            let firstName = req.query.fname;
            let surname = req.query.fname;

            let venueID = req.session.userID;

            let query = `SELECT users.given_name, users.surname, users.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN venue
                    ON users.userID = venue.userID
                    INNER JOIN checkins
                    ON venue.venueID = checkins.venueID
                    WHERE (venue.userID = ?
                    AND users.given_name = ?
                    AND users.surname = ?)`;


            connection.query(query,[venueID, firstName, surname], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

        if (firstNameBool === false && surnameBool === false && checkinDateBool === true && startTimeBool === false && endTimeBool === false)
        {
            console.log("scenario 4");
            let checkinDate = req.query.date;

            let venueID = req.session.userID;

            let query = `SELECT users.given_name, users.surname, users.contact_number, checkins.checkindate, checkins.checkintime
                    FROM users
                    INNER JOIN venue
                    ON users.userID = venue.userID
                    INNER JOIN checkins
                    ON venue.venueID = checkins.venueID
                    WHERE (venue.userID = ?
                    AND checkins.checkindate = ?)`;


            connection.query(query,[venueID, checkinDate], function (err, rows, fields)
            {
                connection.release();
                if (err)
                {
                    res.sendStatus(500);
                    return;
                }

                console.log(rows);
                res.json(rows);
                res.end();
            });
        }

    });
});


router.post('/addVenue', function(req, res, next) {
  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
      var user=req.session.user;
      var userID=user[0].userID;


      var query=`INSERT INTO venue (venue_manager) VALUES (?);`;

      connection.query(query,[userID],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          // req.session.user = first_name;
          // console.log("nah");
          // res.json(rows);

            res.end();



      });



  });

  });

  router.post('/updateVenue', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
      var venueName=req.body.venueName;
      var contactNum=req.body.contactNum;
      var capacity=req.body.capacity;
      var streetnum=req.body.streetnum;
      var streetname=req.body.streetname;
      var suburb=req.body.suburb;
      var postcode=req.body.postcode;
      var state=req.body.state;

      var user=req.session.user;
      var userID=user[0].userID;

      var query=`UPDATE venue
                SET venue_name = ?, capacity= ?, street_number=? , street_name=? , suburb=? , state=? , postcode=?, contact_number=?
                WHERE venue_manager=?;`;
      connection.query(query,[venueName,capacity,streetnum,streetname,suburb,state,postcode,contactNum,userID],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          // req.session.user = first_name;

          // res.json(rows);

            res.end();

      });


  });


  });


  router.post('/createhotspot', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }
      var venueID=req.body.venueid;
      var startDate=req.body.startDate;
      var startTime=req.body.startTime;

      var user=req.session.user;
      if(user[0].isHealthOfficial==1){
        var userID=user[0].userID;
      }

      var query=`INSERT INTO hotspots (venueID,hoID,start_date,start_time)
                  VALUES (?,?,?,?);`;
      connection.query(query,[venueID,userID,startDate,startTime],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          // req.session.user = first_name;

          // res.json(rows);

            res.end();

      });
  });
  });

  router.post('/hotspots', function(req, res, next) {
  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }



      var query=`SELECT venue.venueID,street_number,street_name,suburb,state,postcode
                  FROM venue
                  INNER JOIN hotspots
                  ON venue.venueID=hotspots.venueID;`;
      connection.query(query,function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          // console.log(rows);
          res.json(rows);

      });
  });
  });

  router.post('/checkAdmin', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }


      var user=req.session.user;
        var userID=user[0].userID;


      var query=`SELECT userID, given_name,isVenueManager
                                FROM users WHERE userID = ? AND isHealthOfficial=1;`;
      connection.query(query,[userID],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          // req.session.user = first_name;
          if(rows.length===0)
            {
                res.sendStatus(401);
                return;
            }

            res.json(rows);

            // res.end();

      });
  });
  });
  router.post('/checkVenman', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }


      var user=req.session.user;
        var userID=user[0].userID;


      var query=`SELECT userID, given_name,isVenueManager
                                FROM users WHERE userID = ? AND isVenueManager=1;`;
      connection.query(query,[userID],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          // req.session.user = first_name;
          if(rows.length===0)
            {
                res.sendStatus(401);
                return;
            }

            res.json(rows);

            // res.end();

      });
  });
  });

router.get('/userInfo', function(req, res, next) {

  req.pool.getConnection(function(err,connection)
  {


      if(err)
      {
        console.log(err);
          res.sendStatus(500);
          return;
      }


      var user=req.session.user;
        var userID=user[0].userID;


      var query=`SELECT userID,given_name,surname,street_number,street_name,surburb,state,postcode,contact_number, date_of_birth, email
                                FROM users WHERE userID = ?;`;
      connection.query(query,[userID],function(err,rows,fields)
      {
          connection.release();
          if(err)
          {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          // req.session.user = first_name;
          if(rows.length===0)
            {
                res.sendStatus(401);
                return;
            }

            res.json(rows);

            // res.end();

      });
  });
  });



module.exports = router;
