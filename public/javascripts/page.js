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
            if(name[0].isVenueManager==1)
            {
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
            if(name[0].isVenueManager==1)
            {
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


function get_coordinates() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        console.log(this.responseText);
                        } else
                        {
                            console.log("not working");
                        }
                    };

    xmlhttp.open("GET", "https://api.mapbox.com/geocoding/v5/mapbox.places/Adelaide.json?access_token=pk.eyJ1IjoiYTE3OTcxNjMiLCJhIjoiY2twbnp4eWZlNDc4czJybGFidGhxaGR3cCJ9.OkcuJRBHebRqUA-INN110g", true);
    xmlhttp.send();
}

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
            if(userObject[0].isVenueManager==1)
            {
                window.location.replace('/homeManager.html');
            }
            else if(userObject[0].isHealthOfficial==1)
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


