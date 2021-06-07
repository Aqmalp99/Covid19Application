var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/checkInsUser', function (req, res, next) {
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

        var query = "SELECT venue.venue_name, venue.contact_number, checkins.checkindate, checkins.checkintime FROM venue INNER JOIN checkins ON venue.venueID = checkins.venueID WHERE (userID IS ? AND venue_name IS ? AND street_number IS ? AND street_name IS ? AND suburb IS ? AND city IS ? AND state IS ? and postcode IS ? AND checkindate IS ? AND checkintime BETWEEN ? AND ?)";


        connection.query(query,["1", "1", "Britton Avenue", "Tranmere", "Adelaide", "South Australia", "5073", "2021-05-12", "11:55:00", "12:55:00"] , function (err, rows, fields) {
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