
function myFunction() {

  if (confirm("Please confirm for LOGOUT!")) {
    // txt = "You pressed OK!";
    logout();
  }

}

function login(){

    var logintype="user";

    if(document.getElementById('radiovenue').checked)
        {
            logintype="venuemanager";
        }
    else if (document.getElementById('radioho').checked)
    {
        logintype="healthofficial";
    }
    let user = {
        user: document.getElementById('email').value,
        pass: document.getElementById('password').value,
        type: logintype
    };

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var name=JSON.parse(this.responseText);

            alert("Welcome "+name[0].given_name);
            if(logintype=="user"){
            window.location.replace('/homeUser.html');
            }
            else if(name[0].isVenueManager==1 && logintype=="venuemanager")
            {
                window.location.replace('/homeManager.html');
            }
            else if(name[0].isHealthOfficial==1 && logintype=="healthofficial")
            {
                window.location.replace('/homeHealth.html');
            }

        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Login failed");
        }
    };

    // Open connection to server & send the post data using a POST request
    // We will cover POST requests in more detail in week 8
    xmlhttp.open("POST", "/users/login", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));

}

function checklogin(){

    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        document.getElementById("body").style.display = "block";

        }
        else if (this.readyState == 4 && this.status >= 400) {
            window.location.replace('/index.html');
            alert("Login Failed");
        }
    };

    xmlhttp.open("POST","/users/checkuser", true);
    xmlhttp.send();

}

function logout(){

    var xmlhttp = new XMLHttpRequest();
    if (this.readyState == 4 && this.status == 200) {

        }
        else
        {
            window.location.replace('/index.html');
        }





    xmlhttp.open("POST", "/users/logout", true);
    xmlhttp.send();

}

function signup() {

            var terms_cond = document.getElementById("terms_cond");
            if(terms_cond.checked==false)
            {
                alert("Please agree to the Terms & Conditions!");
                return;
            }


            var first_name = document.getElementById("first_name").value;
            var last_name = document.getElementById("last_name").value;
            var dob=document.getElementById("dob").value;
            var phone_num=document.getElementById("ph").value;
            var email=document.getElementById("signup_email").value;
            var streetnum=document.getElementById("streetnum").value;
            var streetname=document.getElementById("streetname").value;
            var suburb=document.getElementById("suburb").value;
            var postcode=document.getElementById("postcode").value;
            var state=document.getElementById("state").value;
            var password=document.getElementById("signup_password").value;
            var repeat_password=document.getElementById("repeat_password").value;
            var venMan=document.getElementById("sign_up_as_vm");
            if(venMan.checked==false)
            {
                venMan=0;
            }
            else
            {
                venMan=1;
            }


            if(!(password===repeat_password))
            {
                alert("Passwords do not match");
                return;
            }


            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {

                    loginforSignup();
                }
            };
            xhttp.open("POST", "/users/signup", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ first_name,last_name,dob,phone_num,email,streetnum,streetname,suburb,postcode,state,password,venMan }));

        }

function signupAdmin()
{

            var terms_cond = document.getElementById("terms_cond");
            if(terms_cond.checked==false)
            {
                alert("Please agree to the Terms & Conditions!");
                return;
            }


            var first_name = document.getElementById("first_name").value;
            var last_name = document.getElementById("last_name").value;
            var dob=document.getElementById("dob").value;
            var phone_num=document.getElementById("ph").value;
            var email=document.getElementById("email").value;
            var streetnum=document.getElementById("streetnum").value;
            var streetname=document.getElementById("streetname").value;
            var suburb=document.getElementById("suburb").value;
            var postcode=document.getElementById("postcode").value;
            var state=document.getElementById("state").value;
            var password=document.getElementById("signup_password").value;
            var repeat_password=document.getElementById("repeat_password").value;


            if(!(password===repeat_password))
            {
                alert("Passwords do not match");
                return;
            }


            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    alert("You have successfully signed up a new Health Offical");
                }
            };
            xhttp.open("POST", "/users/signupAdmin", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ first_name,last_name,dob,phone_num,email,streetnum,streetname,suburb,postcode,state,password }));

        }

function loginforSignup(){


    var venMan=document.getElementById("sign_up_as_vm");
            if(venMan.checked==false)
            {
                venMan=0;
            }
            else
            {
                venMan=1;
            }

    let user = {
        user: document.getElementById('signup_email').value,
        pass: document.getElementById('signup_password').value,
        type: venMan
    };

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var name=JSON.parse(this.responseText);

            alert("Welcome "+name[0].given_name);
            if(name[0].isVenueManager==1 && venMan==1)
            {
                addVenue();
                window.location.replace('/homeManager.html');
            }
            else if(name[0].isHealthOfficial==1)
            {
                window.location.replace('/homeHealth.html');
            }
            else{
            window.location.replace('/homeUser.html');
            }
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Login failed");
        }
    };

    // Open connection to server & send the post data using a POST request
    // We will cover POST requests in more detail in week 8
    xmlhttp.open("POST", "/users/login", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));

}


function addVenue()
{
     // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();


    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

        }
    };

    // Open connection to server & send the post data using a POST request
    // We will cover POST requests in more detail in week 8
    xmlhttp.open("POST", "/users/addVenue", true);
    xmlhttp.send();



}

function submitVenueInfo()
{
     // Create AJAX Request
     let venueInfo = {
             venueName : document.getElementById("vname").value,
             contactNum :document.getElementById("vcontactnum").value,
             capacity: parseInt(document.getElementById("vcapacity").value),
             streetnum: document.getElementById("vstreetnum").value,
             streetname: document.getElementById("vstreetname").value,
             suburb: document.getElementById("vsuburb").value,
             postcode: document.getElementById("vpostcode").value,
             state: document.getElementById("state").value
        };
    var xmlhttp = new XMLHttpRequest();


            // if(venueName===undefined || contactNum=="" || capacity=="" || streetnum=="" || streetname=="" || suburb=="" || postcode=="" || state=="")
            // {
            //     alert("please enter all fields");
            //     return;
            // }


    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

        }
        else
        {
            window.location.replace('/homeManager.html');
            alert("Your Venue Information Has Been Updated!");
        }
    };

    // Open connection to server & send the post data using a POST request
    // We will cover POST requests in more detail in week 8
    xmlhttp.open("POST", "/users/updateVenue", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(venueInfo));

}


// function get_coordinates() {
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function() {
//                     if (this.readyState == 4 && this.status == 200) {

//                         } else
//                         {
//                             console.log("not working");
//                         }
//                     };

//     xmlhttp.open("GET", "https://api.mapbox.com/geocoding/v5/mapbox.places/Adelaide.json?access_token=pk.eyJ1IjoiYTE3OTcxNjMiLCJhIjoiY2twbnp4eWZlNDc4czJybGFidGhxaGR3cCJ9.OkcuJRBHebRqUA-INN110g", true);
//     xmlhttp.send();
// }

function onSignIn(googleUser) {

    // Read the token data on the client side
    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    // Prepare to send the TOKEN to the server for validation
    // var id_token = { token: googleUser.getAuthResponse().id_token };

    var logintype="user";

    if(document.getElementById('radiovenue').checked)
        {
            logintype="venuemanager";
        }
    else if (document.getElementById('radioho').checked)
    {
        logintype="healthofficial";
    }
    let user = {
        token: googleUser.getAuthResponse().id_token,
        type: logintype
    };
    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var userObject=JSON.parse(this.responseText);
            alert("Welcome "+userObject[0].given_name);
            if(userObject[0].isVenueManager==1 && logintype=="venuemanager")
            {
                window.location.replace('/homeManager.html');
            }
            else if(userObject[0].isHealthOfficial==1 && logintype=="healthofficial")
            {
                window.location.replace('/homeHealth.html');
            }
            else{
            window.location.replace('/homeUser.html');
            }
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Login failed");
        }
    };

    // Open connection to server & send the token using a POST request
    xmlhttp.open("POST", "/users/login", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));

}

function createHotspot()
{
    let hotspot = {
             venueid : document.getElementById("venueid").value,
             startDate :document.getElementById("startdate").value,
             startTime: document.getElementById("starttime").value
        };
    var xmlhttp = new XMLHttpRequest();



    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Hotspot created");
        }
        else
        {
            // window.location.replace('/homeHealth.html');

        }
    };

    // Open connection to server & send the post data using a POST request
    // We will cover POST requests in more detail in week 8
    xmlhttp.open("POST", "/users/createhotspot", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(hotspot));




}

function updatemap()
{
    var xmlhttp = new XMLHttpRequest();



    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var map=JSON.parse(this.responseText);
            var temp="";
            var i=0;
            for(;map[i];)
            {
                temp=map[i].street_number+", "+map[i].street_name+", "+map[i].suburb+", "+map[i].state+", "+map[i].postcode;
                mapGeo(temp, i);
                i++;
            }
        }

    };


    xmlhttp.open("POST", "/users/hotspots", true);
    xmlhttp.send();
}

function checkInsMap()
{
    var xmlhttp = new XMLHttpRequest();



    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var map=JSON.parse(this.responseText);
            var temp="";
            var i=0;
            for(;map[i];)
            {
                temp=map[i].street_number+", "+map[i].street_name+", "+map[i].suburb+", "+map[i].state+", "+map[i].postcode;
                mapGeo(temp, i);
                i++;
            }
        }

    };


    xmlhttp.open("POST", "/users/userCheckins", true);
    xmlhttp.send();
}

function mapGeo(address, i) {

        mapboxClient.geocoding

        .forwardGeocode({
                query: address,
                autocomplete: false,
                limit: 1 })

        .send()
        .then(function (response) {
            if (response && response.body && response.body.features && response.body.features.length)
            {
                var feature = response.body.features[0];
                coordinates[i] = response.body.features[0].center;
                console.log(coordinates);

                new mapboxgl.Marker().setLngLat(coordinates[i]).addTo(map);

                }
            });
}

function checkAdmin(){

    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        document.getElementById("body").style.display = "block";

        }
        else if (this.readyState == 4 && this.status >= 400) {
            window.location.replace('/homeUser.html');
            alert("You do not have admin access!");
        }
    };

    xmlhttp.open("POST","/users/checkAdmin", true);
    xmlhttp.send();

}

function checkVenman(){

    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        document.getElementById("body").style.display = "block";

        }
        else if (this.readyState == 4 && this.status >= 400) {
            window.location.replace('/homeUser.html');
            alert("You do not have venue manager access!");
        }
    };

    xmlhttp.open("POST","/users/checkVenman", true);
    xmlhttp.send();

}

 function getUserInfo(){

    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        var userinfo=JSON.parse(this.responseText);
        if(userinfo[0].date_of_birth!==null){
        var dob=userinfo[0].date_of_birth.toString();
        dob=dob.slice(0,-14);
        document.getElementById("dob").value = dob;
        }
        if(userinfo[0].given_name!==null){
        document.getElementById("gname").value = userinfo[0].given_name;
        }
        if(userinfo[0].surname!==null){
        document.getElementById("lname").value = userinfo[0].surname;
        }
        if(userinfo[0].contact_number!==null){
        document.getElementById("connumber").value = userinfo[0].contact_number;
        }
        if(userinfo[0].email!==null){
        document.getElementById("email").value = userinfo[0].email;
        }
        if(userinfo[0].street_number!==null){
        document.getElementById("streetnum").value = userinfo[0].street_number;
        }
        if(userinfo[0].street_name!==null){
        document.getElementById("streetname").value = userinfo[0].street_name;
        }
        if(userinfo[0].surburb!==null){
        document.getElementById("suburb").value = userinfo[0].surburb;
        }
        if(userinfo[0].state!==null){
        document.getElementById("state").value = userinfo[0].state;
        }
        if(userinfo[0].postcode!==null){
        document.getElementById("postcode").value = userinfo[0].postcode;
        }



        }
    };

    xmlhttp.open("GET","/users/userInfo", true);
    xmlhttp.send();

}

function getVenueInfo(){

    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        var venueInfo=JSON.parse(this.responseText);

        if(venueInfo[0].venue_name!==null){
        document.getElementById("vname").value = venueInfo[0].venue_name;
        }
        if(venueInfo[0].capacity!==null){
        document.getElementById("vcapacity").value = venueInfo[0].capacity;
        }
        if(venueInfo[0].street_number!==null){
        document.getElementById("vstreetnum").value = venueInfo[0].street_number;
        }
        if(venueInfo[0].street_name!==null){
        document.getElementById("vstreetname").value = venueInfo[0].street_name;
        }
        if(venueInfo[0].suburb!==null){
        document.getElementById("vsuburb").value = venueInfo[0].suburb;
        }
        if(venueInfo[0].state!==null){
        document.getElementById("state").value = venueInfo[0].state;
        }
        if(venueInfo[0].postcode!==null){
        document.getElementById("vpostcode").value = venueInfo[0].postcode;
        }
        if(venueInfo[0].phone_number!==null){
        document.getElementById("vcontactnum").value = venueInfo[0].phone_number;
        }



        }
    };

    xmlhttp.open("GET","/users/venueInfo", true);
    xmlhttp.send();

}

function editUserInfo(){
     // Create AJAX Request
     let userInfo = {
             givenName : document.getElementById("gname").value,
             surname : document.getElementById("lname").value,
             dob :document.getElementById("dob").value,
             contactNo: document.getElementById("connumber").value,
             email: document.getElementById("email").value,
             streetnum: document.getElementById("streetnum").value,
             streetname: document.getElementById("streetname").value,
             suburb: document.getElementById("suburb").value,
             postcode: document.getElementById("postcode").value,
             state: document.getElementById("state").value
        };
    var xmlhttp = new XMLHttpRequest();


    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

        }
        else
        {
            window.location.replace('/homeUser.html');
            alert("Your Personal Information Has Been Updated!");
        }
    };

    // Open connection to server & send the post data using a POST request
    // We will cover POST requests in more detail in week 8
    xmlhttp.open("POST", "/users/updateUser", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(userInfo));

}


function checkInUser(){

    var venueCheckin=document.getElementById("venueID").value;

    var xmlhttp = new XMLHttpRequest();


    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("you have successfully checked in!");
        }
    };

    xmlhttp.open("POST","/users/checkIN", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify({venueCheckin}));

}

function deleteUser() {

  if (confirm("Please confirm to delete User!")) {
    // txt = "You pressed OK!";
    confirmDeleteUser();
  }

}

function deleteVenue() {

  if (confirm("Please confirm to delete Venue!")) {
    // txt = "You pressed OK!";
    confirmDeleteVenue();
  }

}

function confirmDeleteUser()
{
    let userID =document.getElementById("search_user").value;

    var xmlhttp = new XMLHttpRequest();


    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("User Deleted");
            document.getElementById("search_user").value=null;
        }

    };


    xmlhttp.open("POST", "/users/deleteUser", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify({userID}));
}

function confirmDeleteVenue()
{
    let venueID =document.getElementById("search_venue").value;

    var xmlhttp = new XMLHttpRequest();



    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Venue Deleted");
            document.getElementById("search_venue").value=null;
        }

    };


    xmlhttp.open("POST", "/users/deleteVenue", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify({venueID}));
}

function showMap(){
  document.getElementsByClassName("content-user")[0].style.display = "none";
  document.getElementsByClassName("map-container-user")[0].style.display = "block";
  document.getElementsByClassName("table-button-div")[0].style.display = "block";
  map.resize();
  checkInsMap();


}

function showTable(){
  document.getElementsByClassName("content-user")[0].style.display = "block";
  document.getElementsByClassName("map-container-user")[0].style.display = "none";
  document.getElementsByClassName("table-button-div")[0].style.display = "none";
}





// ----------------Redirecting DashBoard buttons------------------

//USER HOME

function goto_user_home(){
    window.location.replace('/homeUser.html');
}

function goto_user_history(){
    window.location.replace('/CheckHistoryUser.html');
}

function goto_user_profile(){
    window.location.replace('/userInfo.html');
}

// MANAGER HOME
function goto_manager_home(){
    window.location.replace('/homeManager.html');
}

function goto_manager_profile(){
    window.location.replace('/userInfoManager.html');
}


function goto_manager_history(){
    window.location.replace('/CheckHistoryVenue.html');
}

function goto_manager_venue_info(){
    window.location.replace('/venueInfo.html')
}



//HEALTH HOME

function goto_health_home(){
    window.location.replace('/homeHealth.html');
}

function goto_health_profile(){
    window.location.replace('/userInfoAdmin.html');
}

function goto_health_history(){
    window.location.replace('/CheckInHO.html');
}

function goto_health_manage_hotspot(){
    window.location.replace('/ManageHotspot.html');
}

function goto_health_create_hotspot(){
    window.location.replace('/createHotspot.html');
}

