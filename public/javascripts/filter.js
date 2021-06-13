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

    var table = document.getElementsByTagName("tbody")[0];
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

      if (document.getElementById("no-results") !== null){
        let nrRow = document.getElementById("no-results-row");
        nrRow.remove();
      }

      let tr = document.createElement("tr");
      tr.setAttribute("id", "no-results-row");
      let td = document.createElement("td");
      td.setAttribute("id", "no-results");
      let noResults = document.createTextNode("No results found. Please be more specific and/or change filters.");
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

              console.log(document.getElementsByClassName("table-data").length);
              while (document.getElementsByClassName("table-data").length !== 0)
              {
                  let temp = document.getElementsByClassName("table-data")[0];
                  temp.remove();
              }

              if (document.getElementById("no-results") !== null)
              {
                let nrRow = document.getElementById("no-results-row");
                nrRow.remove();
              }

              var checkinHistoryUser = JSON.parse(this.responseText);
              if (checkinHistoryUser.length <= 0)
              {

                if (document.getElementById("no-results") !== null){
                  let nrRow = document.getElementById("no-results-row");
                  nrRow.remove();
                }

                let tr = document.createElement("tr");
                tr.setAttribute("id", "no-results-row");
                let td = document.createElement("td");
                td.setAttribute("id", "no-results");
                let noResults = document.createTextNode("No results found. Please be more specific and/or change filters.");
                td.appendChild(noResults);
                td.setAttribute("colspan", "5");
                tr.appendChild(td);
                table.appendChild(tr);
                return;
              }

              var numberofRows = checkinHistoryUser.length;
              var addresses = [];
              var convertedDates = [];

              for (let i = 0; i < numberofRows; i++)
              {
                addresses.push(checkinHistoryUser[i].street_number + " " + checkinHistoryUser[i].street_name + ", " + checkinHistoryUser[i].suburb + ", " + checkinHistoryUser[i].state + ", " + checkinHistoryUser[i].postcode);
                convertedDates.push(checkinHistoryUser[i].checkindate.toString());
                convertedDates[i] = convertedDates[i].slice(0, -14);
              }

              for (let i=0; i < checkinHistoryUser.length; i++)
              {
                let tr = document.createElement("tr");
                tr.setAttribute("class", "table-data");
                for (let j = 0; j < 5; j++)
                {
                  let td = document.createElement("td");
                  if (j === 0)
                  {
                    let data = document.createTextNode(checkinHistoryUser[i].venue_name);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 1)
                  {
                    let data = document.createTextNode(addresses[i]);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 2)
                  {
                    let data = document.createTextNode(checkinHistoryUser[i].contact_number);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 3)
                  {
                    let data = document.createTextNode(convertedDates[i]);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 4)
                  {
                    let data = document.createTextNode(checkinHistoryUser[i].checkintime);
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
function refineSearchVenue()
{

    var firstName = document.getElementById("fname").value;
    var checkinDate = document.getElementById("date").value;
    var surname = document.getElementById("sname").value;
    var startTime = document.getElementById("startTime").value;
    var endTime = document.getElementById("endTime").value;

    var table = document.getElementsByTagName("tbody")[0];
    var queryString = "";

    if (firstName.length > 0 && checkinDate.length > 0 && startTime.length > 0 && endTime.length > 0 && surname.length > 0)
    {
      queryString = `users/checkinsVenue?fname=${firstName}&date=${checkinDate}&sTime=${startTime}&eTime=${endTime}&sname=${surname}`;
    }

    else if (firstName.length > 0 && checkinDate.length > 0 && startTime.length <= 0 && endTime.length <= 0 && surname.length > 0)
    {
      queryString = `users/checkinsVenue?fname=${firstName}&sname=${surname}&date=${checkinDate}`;
    }

    else if (firstName.length > 0 && checkinDate.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && surname.length > 0)
    {
      queryString = `users/checkinsVenue?fname=${firstName}&sname=${surname}`;
    }
    else if (firstName.length <= 0 && checkinDate.length > 0 && startTime.length <= 0 && endTime.length <= 0 && surname.length <= 0)
    {
      queryString = `users/checkinsVenue?date=${checkinDate}`;
    }
    else
    {
      if (document.getElementById("no-results") !== null)
      {
        let nrRow = document.getElementById("no-results-row");
        nrRow.remove();
      }

      let tr = document.createElement("tr");
      tr.setAttribute("id", "no-results-row");
      let td = document.createElement("td");
      td.setAttribute("id", "no-results");
      let noResults = document.createTextNode("No results found. Please be more specific and/or change filters.");
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
              while (document.getElementsByClassName("table-data").length !== 0)
              {
                  let temp = document.getElementsByClassName("table-data")[0];
                  temp.remove();
              }

              if (document.getElementById("no-results") !== null)
              {
                let nrRow = document.getElementById("no-results-row");
                nrRow.remove();
              }

              var checkinHistoryVenue = JSON.parse(this.responseText);
              if (checkinHistoryVenue.length <= 0)
              {

                if (document.getElementById("no-results") !== null){
                  let nrRow = document.getElementById("no-results-row");
                  nrRow.remove();
                }

                let tr = document.createElement("tr");
                tr.setAttribute("id", "no-results-row");
                let td = document.createElement("td");
                td.setAttribute("id", "no-results");
                let noResults = document.createTextNode("No results found. Please be more specific and/or change filters.");
                td.appendChild(noResults);
                td.setAttribute("colspan", "5");
                tr.appendChild(td);
                table.appendChild(tr);
                return;
              }

              var numberofRows = checkinHistoryVenue.length;
              var addresses = [];
              var convertedDates = [];

              for (let i = 0; i < numberofRows; i++)
              {
                convertedDates.push(checkinHistoryVenue[i].checkindate.toString());
                convertedDates[i] = convertedDates[i].slice(0, -14);
              }

              for (let i=0; i < numberofRows; i++)
              {
                let tr = document.createElement("tr");
                tr.setAttribute("class", "table-data");
                for (let j = 0; j < 5; j++)
                {
                  let td = document.createElement("td");
                  if (j === 0)
                  {
                    let data = document.createTextNode(checkinHistoryVenue[i].given_name);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 1)
                  {
                    let data = document.createTextNode(checkinHistoryVenue[i].surname[i]);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 2)
                  {
                    let data = document.createTextNode(checkinHistoryUser[i].contact_number);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 3)
                  {
                    let data = document.createTextNode(convertedDates[i]);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 4)
                  {
                    let data = document.createTextNode(checkinHistoryVenue[i].checkintime);
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

//filter checkins - admin
function refineSearchAdmin()
{

    var firstName = document.getElementById("fname-admin").value;
    var surname = document.getElementById("sname-admin").value;

    var venueName = document.getElementById("vname-admin").value;
    var streetNumber = document.getElementById("stNum-admin").value;
    var streetName = document.getElementById("stName-admin").value;
    var suburb = document.getElementById("suburb-admin").value;
    var postcode = document.getElementById("postcode-admin").value;
    var state = document.getElementById("states-admin").value;
    if(state == "Please Select an Option:"){
      state = "";
    }

    var checkinDate = document.getElementById("date-admin").value;
    var startTime = document.getElementById("sTime-admin").value;
    var endTime = document.getElementById("eTime-admin").value;

    var tableBody = document.getElementsByTagName("tbody")[0];
    var queryString = "";
    var goBackButton = document.getElementsByClassName("search-again")[0];

    if (venueName.length > 0 && checkinDate.length > 0 && startTime.length > 0 && endTime.length > 0 && streetNumber.length > 0 && streetName.length > 0 && suburb.length > 0 && postcode.length > 0 && state.length > 0)
    {
      queryString = `users/checkinsAdmin?fname=${firstName}&sname=${surname}&vname=${venueName}&date=${checkinDate}&sTime=${startTime}&eTime=${endTime}&stNum=${streetNumber}&stName=${streetName}&suburb=${suburb}&postcode=${postcode}&state=${state}`;
    }

    else if (venueName.length > 0 && checkinDate.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/checkinsAdmin?vname=${venueName}`;
    }

    else if (venueName.length > 0 && checkinDate.length > 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/checkinsAdmin?vname=${venueName}&date=${checkinDate}`;
    }

    else if (venueName.length > 0 && checkinDate.length > 0 && startTime.length > 0 && endTime.length > 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/checkinsAdmin?vname=${venueName}&date=${checkinDate}&sTime=${startTime}&eTime=${endTime}`;
    }
    else if (venueName.length <= 0 && checkinDate.length > 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/checkinsAdmin?date=${checkinDate}`;
    }
    else if (venueName.length <= 0 && checkinDate.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length > 0 && streetName.length > 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/checkinsAdmin?stNum=${streetNumber}&stName=${streetName}`;
    }
    else if (venueName.length <= 0 && checkinDate.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length > 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/checkinsAdmin?stName=${streetName}`;
    }
    else if (venueName.length <= 0 && checkinDate.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length > 0 && suburb.length > 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/checkinsAdmin?stName=${streetName}&suburb=${suburb}`;
    }
    else if (venueName.length <= 0 && checkinDate.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length > 0 && suburb.length <= 0 && postcode.length > 0 && state.length <= 0)
    {
      queryString = `users/checkinsAdmin?stName=${streetName}&postcode=${postcode}`;
    }

    else if (venueName.length <= 0 && checkinDate.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length > 0 && state.length <= 0)
    {
      queryString = `users/checkinsAdmin?postcode=${postcode}`;
    }

    else if (venueName.length <= 0 && checkinDate.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length > 0)
    {
      queryString = `users/checkinsAdmin?state=${state}`;
    }
    else if (venueName.length <= 0 && checkinDate.length > 0 && startTime.length <= 0 && endTime.length <= 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length > 0)
    {
      queryString = `users/checkinsAdmin?date=${checkinDate}&state=${state}`;
    }
    else if (venueName.length <= 0 && checkinDate.length > 0 && startTime.length > 0 && endTime.length > 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length > 0 && state.length <= 0)
    {
      queryString = `users/checkinsAdmin?date=${checkinDate}&sTime=${startTime}&eTime=${endTime}&postcode=${postcode}`;
    }
    else if (firstName.length > 0 && checkinDate.length > 0 && startTime.length <= 0 && endTime.length <= 0 && surname.length > 0)
    {
      queryString = `users/checkinsAdmin?fname=${firstName}&sname=${surname}&date=${checkinDate}`;
    }
    else if (firstName.length > 0 && checkinDate.length <= 0 && startTime.length <= 0 && endTime.length <= 0 && surname.length > 0)
    {
      queryString = `users/checkinsAdmin?fname=${firstName}&sname=${surname}`;
    }
    else {

      if (document.getElementById("no-results") !== null){
        let nrRow = document.getElementById("no-results-row");
        nrRow.remove();
      }

      document.getElementsByClassName("content-admin")[0].style.display = "none";
      document.getElementsByClassName("table-admin")[0].style.display = "block";
      console.log("setting button to show");
      goBackButton.style.display = "block";
      let tr = document.createElement("tr");
      tr.setAttribute("id", "no-results-row");
      let td = document.createElement("td");
      td.setAttribute("id", "no-results");
      let noResults = document.createTextNode("No results found. Please be more specific and/or change filters.");
      td.appendChild(noResults);
      td.setAttribute("colspan", "6");
      tr.appendChild(td);
      tableBody.appendChild(tr);
      return;
    }

    var xhttp = new XMLHttpRequest;

    xhttp.onreadystatechange = function()
          {
            if (this.readyState == 4 && this.status == 200)
            {
              while (document.getElementsByClassName("table-data").length !== 0)
              {
                  let temp = document.getElementsByClassName("table-data")[0];
                  temp.remove();
              }

            if (document.getElementById("no-results") !== null)
            {
                let nrRow = document.getElementById("no-results-row");
                nrRow.remove();
            }

              var checkinHistoryAdmin = JSON.parse(this.responseText);
              if (checkinHistoryAdmin.length <= 0)
              {

                // if (document.getElementById("no-results") !== null){
                //   let nrRow = document.getElementById("no-results-row");
                //   nrRow.remove();
                // }
                document.getElementsByClassName("content-admin")[0].style.display = "none";
                document.getElementsByClassName("table-admin")[0].style.display = "block";
                console.log("setting button to show");
                goBackButton.style.display = "block";
                let tr = document.createElement("tr");
                tr.setAttribute("id", "no-results-row");
                let td = document.createElement("td");
                td.setAttribute("id", "no-results");
                let noResults = document.createTextNode("No results found. Please be more specific and/or change filters.");                td.appendChild(noResults);
                td.setAttribute("colspan", "6");
                tr.appendChild(td);
                tableBody.appendChild(tr);
                return;
              }
              else{
                document.getElementsByClassName("content-admin")[0].style.display = "none";
                document.getElementsByClassName("table-admin")[0].style.display = "block";
                console.log("setting button to show");
                goBackButton.style.display = "block";
              }

              var numberofRows = checkinHistoryAdmin.length;
              var addresses = [];
              var convertedDates = [];

              for (let i = 0; i < numberofRows; i++)
              {
                addresses.push(checkinHistoryAdmin[i].street_number + " " + checkinHistoryAdmin[i].street_name + ", " + checkinHistoryAdmin[i].suburb + ", " + checkinHistoryAdmin[i].state + ", " + checkinHistoryAdmin[i].postcode);
                convertedDates.push(checkinHistoryAdmin[i].checkindate.toString());
                convertedDates[i] = convertedDates[i].slice(0, -14);
              }

              for (let i=0; i < numberofRows; i++)
              {
                let tr = document.createElement("tr");
                tr.setAttribute("class", "table-data");
                for (let j = 0; j < 6; j++)
                {
                  let td = document.createElement("td");
                  if (j === 0)
                  {
                    let tooltipSpan = document.createElement("span");
                    tooltipSpan.innerText = `${checkinHistoryAdmin[i].userID}`;
                    tooltipSpan.title = `Given Name: ${checkinHistoryAdmin[i].given_name}; Surname: ${checkinHistoryAdmin[i].surname}`;
                    td.appendChild(tooltipSpan);
                    tr.appendChild(td);
                  }

                  else if (j === 1)
                  {
                    let data = document.createTextNode(checkinHistoryAdmin[i].contact_number);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 2)
                  {
                    let tooltipSpan = document.createElement("span");
                    tooltipSpan.innerText = `${checkinHistoryAdmin[i].venueID}`;
                    tooltipSpan.title = `Venue Name: ${checkinHistoryAdmin[i].venue_name}; Venue Address: ${addresses[i]}`;
                    td.appendChild(tooltipSpan);
                    tr.appendChild(td);
                  }

                  else if (j === 3)
                  {
                    let data = document.createTextNode(checkinHistoryAdmin[i].phone_number);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 4)
                  {
                    let data = document.createTextNode(convertedDates[i]);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }
                  else if (j === 5)
                  {
                    let data = document.createTextNode(checkinHistoryAdmin[i].checkintime);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }
                }

                tableBody.appendChild(tr);
              }
              }
          };

          xhttp.open("GET", queryString, true);
          xhttp.send();
}

//filter hotspots
function refineHotspots()
{

    var venueName = document.getElementById("vname").value;
    var date = document.getElementById("date").value;
    var streetNumber = document.getElementById("stNum").value;
    var streetName = document.getElementById("stName").value;
    var suburb = document.getElementById("suburb").value;
    var postcode = document.getElementById("postcode").value;

    var state = document.getElementById("states").value;
    if(state == "Please Select an Option:"){
      state = "";
    }

    var table = document.getElementsByTagName("tbody")[0];
    var queryString = "";

    if (venueName.length > 0 && date.length > 0  && streetNumber.length > 0 && streetName.length > 0 && suburb.length > 0 && postcode.length > 0 && state.length > 0)
    {
      queryString = `users/manageHotspots?vname=${venueName}&date=${date}&stNum=${streetNumber}&stName=${streetName}&suburb=${suburb}&postcode=${postcode}&state=${state}`;
    }

    else if (venueName.length > 0 && date.length <= 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/manageHotspots?vname=${venueName}`;
    }

    else if (venueName.length > 0 && date.length > 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/manageHotspots?vname=${venueName}&date=${date}`;
    }

    else if (venueName.length <= 0 && date.length > 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/manageHotspots?date=${date}`;
    }
    else if (venueName.length <= 0 && date.length <= 0 && streetNumber.length > 0 && streetName.length > 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/manageHotspots?stNum=${streetNumber}&stName=${streetName}`;
    }
    else if (venueName.length <= 0 && date.length <= 0 && streetNumber.length <= 0 && streetName.length > 0 && suburb.length <= 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/manageHotspots?stName=${streetName}`;
    }
    else if (venueName.length <= 0 && date.length <= 0 && streetNumber.length <= 0 && streetName.length > 0 && suburb.length > 0 && postcode.length <= 0 && state.length <= 0)
    {
      queryString = `users/manageHotspots?stName=${streetName}&suburb=${suburb}`;
    }
    else if (venueName.length <= 0 && date.length <= 0 && streetNumber.length <= 0 && streetName.length > 0 && suburb.length <= 0 && postcode.length > 0 && state.length <= 0)
    {
      queryString = `users/manageHotspots?stName=${streetName}&postcode=${postcode}`;
    }

    else if (venueName.length <= 0 && date.length <= 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length > 0 && state.length <= 0)
    {
      queryString = `users/manageHotspots?postcode=${postcode}`;
    }

    else if (venueName.length <= 0 && date.length <= 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length > 0)
    {
      queryString = `users/manageHotspots?state=${state}`;
    }
    else if (venueName.length <= 0 && date.length > 0 && streetNumber.length <= 0 && streetName.length <= 0 && suburb.length <= 0 && postcode.length <= 0 && state.length > 0)
    {
      queryString = `users/manageHotspots?date=${date}&state=${state}`;
    }

    else {

      if (document.getElementById("no-results") !== null){
        let nrRow = document.getElementById("no-results-row");
        nrRow.remove();
      }
      let tr = document.createElement("tr");
      tr.setAttribute("id", "no-results-row");
      let td = document.createElement("td");
      td.setAttribute("id", "no-results");
      let noResults = document.createTextNode("No results found. Please be more specific and/or change filters.");
      td.appendChild(noResults);
      td.setAttribute("colspan", "6");
      tr.appendChild(td);
      table.appendChild(tr);
      return;
    }

    var xhttp = new XMLHttpRequest;

    xhttp.onreadystatechange = function()
          {
            if (this.readyState == 4 && this.status == 200)
            {
              while (document.getElementsByClassName("table-data").length !== 0)
              {
                  let temp = document.getElementsByClassName("table-data")[0];
                  temp.remove();
              }

              if (document.getElementById("no-results") !== null)
              {
                let nrRow = document.getElementById("no-results-row");
                nrRow.remove();
              }

              if (document.getElementById("reload-prompt") !== null)
              {
                let rlRow = document.getElementById("reload-prompt-row");
                rlRow.remove();
              }

              var hotspots = JSON.parse(this.responseText);
              if (hotspots.length <= 0)
              {

                if (document.getElementById("no-results") !== null){
                  let nrRow = document.getElementById("no-results-row");
                  nrRow.remove();
                }

                let tr = document.createElement("tr");
                tr.setAttribute("id", "no-results-row");
                let td = document.createElement("td");
                td.setAttribute("id", "no-results");
                let noResults = document.createTextNode("No results found. Please be more specific and/or change filters.");
                td.appendChild(noResults);
                td.setAttribute("colspan", "6");
                tr.appendChild(td);
                table.appendChild(tr);
                return;
              }

              var numberofRows = hotspots.length;
              var addresses = [];
              var convertedDates = [];

              for (let i = 0; i < numberofRows; i++)
              {
                addresses.push(hotspots[i].street_number + " " + hotspots[i].street_name + ", " + hotspots[i].suburb + ", " + hotspots[i].state + ", " + hotspots[i].postcode);
                if (hotspots[i].start_date !== null){
                  convertedDates.push(hotspots[i].start_date.toString());
                  convertedDates[i] = convertedDates[i].slice(0, -14);
                }
              }

              for (let i=0; i < numberofRows; i++)
              {
                let tr = document.createElement("tr");
                tr.setAttribute("class", "table-data");
                for (let j = 0; j < 6; j++)
                {
                  let td = document.createElement("td");

                  if (j === 0)
                  {
                    let data = document.createTextNode(hotspots[i].hotspotID);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }
                  else if (j === 1)
                  {
                    let data = document.createTextNode(hotspots[i].venue_name);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 2)
                  {
                    let data = document.createTextNode(addresses[i]);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 3)
                  {
                    let data = document.createTextNode(hotspots[i].contact_number);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 4)
                  {
                    let data = document.createTextNode(convertedDates[i]);
                    td.appendChild(data);
                    tr.appendChild(td);
                  }

                  else if (j === 5)
                  {
                    let button = document.createElement("button");
                    button.setAttribute("onclick", "deleteHotspot(event)");
                    button.setAttribute("id", `button${i}`);
                    let data = document.createTextNode("Delete");
                    button.appendChild(data);
                    td.appendChild(button);
                    tr.appendChild(td);
                  }
                }

                table.appendChild(tr);
              }
              document.getElementsByClassName("search-again")[0].style.display = "block";
            }
          };

          xhttp.open("GET", queryString,  true);
          xhttp.send();
}

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


//deleting a hotspot
function deleteHotspot(event)
{
  var confirmDelete = confirm("Are you sure you want to delete?");
  if (confirmDelete === true)
  {
    var idOfButton = event.target.id;
    console.log(idOfButton);

    var button = document.getElementById(`${idOfButton}`);
    var tr = button.parentNode.parentNode;
    var text = tr.cells.item(0).innerText;

    var table = document.getElementsByTagName("tbody")[0];

    var xhttp = new XMLHttpRequest;

    xhttp.onreadystatechange = function()
    {
          {
            if (this.readyState == 4 && this.status == 200)
            {
              while (document.getElementsByClassName("table-data").length !== 0)
              {
                  let temp = document.getElementsByClassName("table-data")[0];
                  temp.remove();
              }

              if (document.getElementById("reload-prompt") !== null)
              {
                let rlRow = document.getElementById("reload-prompt");
                rlRow.remove();
              }

              let tr = document.createElement("tr");
              tr.setAttribute("id", "reload-prompt-row");
              let td = document.createElement("td");
              td.setAttribute("id", "reload-prompt");
              let reloadPrompt = document.createTextNode(`Hotspot with ID ${text} has been removed. Please use filters to see changes.`);
              td.appendChild(reloadPrompt);
              td.setAttribute("colspan", "6");
              tr.appendChild(td);
              table.appendChild(tr);
              return;
            }
          }
    };

    xhttp.open("POST", "users/deleteHotspot", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({text}));

  }
  else {
    return false;
  }
}

function backToSearch(){
  document.getElementsByClassName("table-admin")[0].style.display = "none";
  document.getElementsByClassName("search-again")[0].style.display = "none";
  document.getElementsByClassName("content-admin")[0].style.display = "block";
}