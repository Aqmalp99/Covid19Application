//filter checkin history results - user
function refineSearchUser()
{
    var xhttp = new XMLHttpRequest;
    var venueName = document.getElementsByName("vname")[0].value;
    var state = document.getElementsByName("state")[0].value;
    var checkinDate = document.getElementsByName("date")[0].value;
    var startTime = document.getElementsByName("startTime")[0].value;
    var endTime = document.getElementsByName("endTime")[0].value;
    var queryString = `/checkInsUser?vName=${encodeURIComponent(venueName)}&state${encodeURIComponent(state)}&date=${encodeURIComponent(checkinDate)}&sTime=${encodeURIComponent(startTime)}&eTime=${encodeURIComponent(endTime)}`;
    console.log(queryString);

    xhttp.onreadystatechange = function()
          {
            if (this.readyState == 4 && this.status == 200)
            {
              console.log("great success");
            }
          };

          xhttp.open("GET", queryString,  true);
          xhttp.send();
}

//filter checkin history results - venue

//filter hotspots

