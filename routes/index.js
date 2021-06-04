var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// router.get('/rfrfrf', function(req,res,next){
//     if (req.query.vname.length > 0){
//         var vname = req.query.vname;
//     }
//     if (req.query.vaddress.length > 0){
//         var vaddress = req.query.vaddress;
//     }
//     //if date...
//     //if time...
//     //if time...
//     /* var query = "SELECT venueName, venueAddress, phoneNumber, checkInDate, checkInTime
//     FROM checkIns
//     WHERE (venueName LIKE '%?%' OR venueAddress LIKE "%?%" OR startTime LIKE ... OR endTime LIKE ...)
//     */
//     //connection.query...
// });

// router.get('/ffffff', function(req,res,next){
//     if (req.query.fname.length > 0){
//         var fname = req.query.fname;
//     }
//     if (req.query.sname.length > 0){
//         var surname = req.query.sname;
//     }
//     //if date...
//     //if time...
//     //if time...
//     /* var query = "SELECT givenName, surname, mobileNumber, checkInDate, checkInTime
//     FROM checkIns
//     WHERE (givenName LIKE '%?%' OR surname LIKE "%?%" OR date LIKE ... OR startTime LIKE ... OR endTime LIKE ...)
//     */
//     //connection.query...
// });

// router.get('/tttttt', function(req,res,next){
//     if (req.query.fname.length > 0){
//         var fname = req.query.fname;
//     }
//     if (req.query.sname.length > 0){
//         var surname = req.query.sname;
//     }
//     if (req.query.vname.length > 0){
//         var venueName = req.query.vname;
//     }
//     if (req.query.vaddress.length > 0){
//         var venueAddress = req.query.vaddress;
//     }
//     //if date...
//     //if time...
//     //if time...
//     /* var query = "SELECT givenName, surname, venueName, venueAddress, mobileNumber, phoneNumber, checkInDate, checkInTime
//     FROM checkIns
//     WHERE (givenName LIKE '%?%' OR surname LIKE "%?%" OR venueName LIKE "%?%" OR venueAddress LIKE "%?%" date LIKE ... OR startTime LIKE ... OR endTime LIKE ...)
//     */
//     //connection.query...
// });

module.exports = router;
