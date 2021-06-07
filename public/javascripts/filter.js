//filter checkin history results - user
function refineSearchUser()
{
    // xhttp = new XMLHttpRequest;
    var venueName = document.getElementsByName("vname")[0].value;
    console.log(venueName);

    var venueAddress = document.getElementsByName("vaddress")[0].value;
    console.log(venueAddress);

    var state = document.getElementsByName("state")[0].value;
    console.log(state);

    var checkinDate = document.getElementsByName("date")[0].value;
    console.log(checkinDate);

    var startTime = document.getElementsByName("startTime")[0].value;
    console.log(startTime);

    var endTime = document.getElementsByName("endTime")[0].value;
    console.log(endTime);

    xhttp.onreadystatechange = function()
          {
            if (this.readyState == 4 && this.status == 200)
            {

            }
          };

          xhttp.open("GET", "/checkInsUser?vName=" + encodeURIComponent(venueName) + "&vAddress=" + encodeURIComponent(venueAddress) + "&state=" + encodeURIComponent(state) + "&date=" + encodeURIComponent(checkinDate), + "&sTime=" + encodeURIComponent(startTime) + "&eTime=" + encodeURIComponent(endTime),  true);
          xhttp.send();
}

//filter checkin history results - venue

//filter hotspots

