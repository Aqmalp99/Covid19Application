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
                    alert("Welcome "+first_name);
                    if(venMan.checked==false){
                        window.location.replace('/homeUser.html');
                    }
                    else
                    {
                        window.location.replace('/homeManager.html');
                    }
                }
            };
            xhttp.open("POST", "users/signup", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ first_name,last_name,dob,phone_num,email,streetnum,streetname,suburb,postcode,state,password,venMan }));

        }