function login(){

    let user = {
        user: document.getElementById('email').value,
        pass: document.getElementById('password').value
    };

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Welcome "+this.responseText);
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