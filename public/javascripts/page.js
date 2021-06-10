
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
            window.location.replace('/homeUser.html');
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
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

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
        console.log(userinfo);
        document.getElementById("gname").value = userinfo[0].given_name;
        document.getElementById("lname").value = userinfo[0].surname;
        // document.getElementById("dob").value = userinfo[0].date_of_birth;
        document.getElementById("connumber").value = userinfo[0].contact_number;
        document.getElementById("email").value = userinfo[0].email;
        document.getElementById("streetnum").value = userinfo[0].street_number;
        document.getElementById("streetname").value = userinfo[0].street_name;
        document.getElementById("surburb").value = userinfo[0].surburb;
        document.getElementById("state").value = userinfo[0].state;
        document.getElementById("postcode").value = userinfo[0].postcode;
        document.getElementById("gname").value = userinfo[0].given_name;



        }
        else if (this.readyState == 4 && this.status >= 400) {
            window.location.replace('/homeUser.html');
            alert("You do not have venue manager access!");
        }
    };

    xmlhttp.open("GET","/users/userInfo", true);
    xmlhttp.send();

}



