//filter checkin history results - user
function refineSearchUser()
{

    var venueName = document.getElementById("vname").value;
    var date = document.getElementById("date").value;
    var startTime = document.getElementById("startTime").value;
    var endTime = document.getElementById("endTime").value;
    var streetNumber = document.getElementById("stNum").value;
    var streetName = document.getElementById("stName").value;
    var suburb = document.getElementById("suburb").value;
    var postcode = document.getElementById("postcode").value;

    var state = document.getElementById("states").value;
    if(state == "Please Select an Option:"){
      state = "";
    }

    var address = "";
    var convertedDate;
    var table = document.getElementsByTagName("table")[0];
    var queryString = "";



    if (venueName.length > 0 && date.length > 0 && startTime.length > 0 && endTime.length > 0 && streetNumber.length > 0 && streetName.length > 0 && suburb.length > 0 && postcode.length > 0 && state.length > 0)
    {
      queryString = `users/checkInsUser?vname=${venueName}&date=${date}&sTime=${startTime}&eTime=${endTime}&stNum=${streetNumber}&stName=${streetName}&suburb=${suburb}&postcode=${postcode}&state=${state}`;
    }

    else if (venueName.length > 0 && date.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/checkInsUser?vname=${venueName}`;
    }

    else if (venueName.length > 0 && date.length > 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/checkInsUser?vname=${venueName}&date=${date}`;
    }

    else if (venueName.length > 0 && date.length > 0 && startTime.length > 0 && endTime.length > 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/checkInsUser?vname=${venueName}&date=${date}&sTime=${startTime}&eTime=${endTime}`;
    }
    else if (venueName.length <= 0 && date.length > 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/checkInsUser?date=${date}`;
    }
    else if (venueName.length <= 0 && date.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length > 0 && streetName.length > 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/checkInsUser?stNum=${streetNumber}&stName=${streetName}`;
    }
    else if (venueName.length <= 0 && date.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length > 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/checkInsUser?stName=${streetName}`;
    }
    else if (venueName.length <= 0 && date.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length > 0 && suburb.length > 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/checkInsUser?stName=${streetName}&suburb=${suburb}`;
    }
    else if (venueName.length <= 0 && date.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length > 0 && suburb.length <= 0 && postcode.length > 0 && state.length <= 0)
    {
      queryString = `users/checkInsUser?stName=${streetName}&postcode=${postcode}`;
    }

    else if (venueName.length <= 0 && date.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length > 0 && state.length <= 0)
    {
      queryString = `users/checkInsUser?postcode=${postcode}`;
    }

    else if (venueName.length <= 0 && date.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length > 0)
    {
      queryString = `users/checkInsUser?state=${state}`;
    }
    else if (venueName.length <= 0 && date.length > 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length > 0)
    {
      queryString = `users/checkInsUser?date=${date}&state=${state}`;
    }
    else if (venueName.length <= 0 && date.length > 0 && startTime.length > 0 && endTime.length > 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length > 0 && state.length <= 0)
    {
      queryString = `users/checkInsUser?date=${date}&sTime=${startTime}&eTime=${endTime}&postcode=${postcode}`;
    }
    else {
      console.log("No results found");

      if (document.getElementById("no-results") !== null){
        let nrRow = document.getElementById("no-results-row");
        nrRow.remove();
        // let nr = document.getElementById("no-results");
        // nr.remove();
      }

      let tr = document.createElement("tr");
      tr.setAttribute("id", "no-results-row");
      let td = document.createElement("td");
      td.setAttribute("id", "no-results");
      let noResults = document.createTextNode("No results found. Please Change Toggles");
      td.appendChild(noResults);
      td.setAttribute("colspan", "5");
      tr.appendChild(td);
      table.appendChild(tr);
      return;
    }

    var xhttp = new XMLHttpRequest;

    xhttp.onreadystatechange = function()
          {
            if (this.readyState == 4 && this.status == 200)
            {
              if(document.getElementsByClassName("data") !== null)
              {
                let numRows = document.getElementsByClassName("data").length;
                for (let i = 0; i < numRows; i++){
                  document.getElementsByClassName("data")[i].remove();
                }
              }
              if (document.getElementById("no-results") !== null)
              {
                let nrRow = document.getElementById("no-results-row");
                nrRow.remove();
              }

              var checkinHistoryUser = JSON.parse(this.responseText);
              if (checkinHistoryUser.length <= 0)
              {
                console.log(checkinHistoryUser);

                if (document.getElementById("no-results") !== null){
                  let nrRow = document.getElementById("no-results-row");
                  nrRow.remove();
                }

                let tr = document.createElement("tr");
                tr.setAttribute("id", "no-results-row");
                let td = document.createElement("td");
                td.setAttribute("id", "no-results");
                let noResults = document.createTextNode("No results found. Please Change Toggles");
                td.appendChild(noResults);
                td.setAttribute("colspan", "5");
                tr.appendChild(td);
                table.appendChild(tr);
                return;
              }

              console.log(checkinHistoryUser[0]);
              address += checkinHistoryUser[0].street_number + " " + checkinHistoryUser[0].street_name + ", " + checkinHistoryUser[0].suburb + ", " + checkinHistoryUser[0].state + ", " + checkinHistoryUser[0].postcode;
              convertedDate = checkinHistoryUser[0].checkindate.toString();

              for (let i=0; i < checkinHistoryUser.length; i++){
                let tr = document.createElement("tr");
                tr.setAttribute("class", "data");

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
                    convertedDate = convertedDate.slice(0, -14);
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


