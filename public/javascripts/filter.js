//filter checkin history results - user
function refineSearchUser()
{
    var xhttp = new XMLHttpRequest;

    var venueName = document.getElementById("vname").value;
    var date = document.getElementById("date").value;
    var startTime = document.getElementById("startTime").value;
    var endTime = document.getElementById("endTime").value;
    var streetNumber = document.getElementById("stNum").value;
    var streetName = document.getElementById("stName").value;
    var suburb = document.getElementById("suburb").value;
    var postcode = document.getElementById("postcode").value;
    var state = document.getElementById("states").value;

    var queryString = `/checkInsUser?vname=${venueName}&date=${checkinDate}&sTime=${startTime}&eTime=${endTime}&stNum=${streetNumber}&stName=${streetName}&suburb=${suburb}&postcode=${postcode}&state=${state}`;

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

//hide toggles
function showHideToggles(){
  var addressToggles = document.getElementsByClassName("hidden")[0];
  var toggles = document.getElementsByClassName("not-hidden")[0];

  if (addressToggles.style.display == "none")
  {
      toggles.style.display = "none";
      addressToggles.style.display = "block";
      document.getElementById("toggle-button").innerText = "Search by Name";
  }
  else
  {
      toggles.style.display = "block";
      addressToggles.style.display = "none";
      document.getElementById("toggle-button").innerText = "Search by Address";
  }
}

function showHideTogglesAdmin(){
  var addressToggles = document.getElementsByClassName("hidden")[0];
  var toggles = document.getElementsByClassName("not-hidden")[0];

  if (addressToggles.style.display == "none")
  {
      toggles.style.display = "none";
      addressToggles.style.display = "block";
      document.getElementById("toggle-button-admin").innerText = "Search by Name";
  }
  else
  {
      toggles.style.display = "block";
      addressToggles.style.display = "none";
      document.getElementById("toggle-button-admin").innerText = "Search by Address";
  }
}


