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
    var address = "";
    var convertedDate;
    var table = document.getElementsByTagName("table")[0];

    var queryString = `users/checkInsUser?vname=${venueName}&date=${date}&sTime=${startTime}&eTime=${endTime}&stNum=${streetNumber}&stName=${streetName}&suburb=${suburb}&postcode=${postcode}&state=${state}`;

    xhttp.onreadystatechange = function()
          {
            if (this.readyState == 4 && this.status == 200)
            {
              var checkinHistoryUser = JSON.parse(this.responseText);
              console.log(checkinHistoryUser[0]);
              address += checkinHistoryUser[0].street_number + " " + checkinHistoryUser[0].street_name + ", " + checkinHistoryUser[0].suburb + ", " + checkinHistoryUser[0].state + ", " + checkinHistoryUser[0].postcode;
              convertedDate = checkinHistoryUser[0].checkindate.toString();

              for (let i=0; i < checkinHistoryUser.length; i++){
                let tr = document.createElement("tr");

                for (let j = 0; j < 5; j++)
                {
                  let td = document.createElement("td");
                  if (j === 0)
                  {
                    let data = document.createTextNode(checkinHistoryUser[0].venue_name);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 1)
                  {
                    let data = document.createTextNode(address);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 2)
                  {
                    let data = document.createTextNode(checkinHistoryUser[0].contact_number);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 3)
                  {
                    let data = document.createTextNode(convertedDate);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 4)
                  {
                    let data = document.createTextNode(checkinHistoryUser[0].checkintime);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }
                }

                table.appendChild(tr);
              }
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


