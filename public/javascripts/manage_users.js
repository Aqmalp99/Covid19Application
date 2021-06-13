// // function show_health_official_homepage()
// // {
// //     document.getElementsByClassName("main")[0].style.display="block";
// //     document.getElementsByClassName("manage_user")[0].style.display="none";
// //     document.getElementsByClassName("manage_venue")[0].style.display="none";
// // }

// function show_manage_user()
// {
//     // document.getElementsByClassName("main")[0].style.display="none";
//     document.getElementsByClassName("manage_user")[0].style.display="block";
//     document.getElementsByClassName("manage_venue")[0].style.display="none";
// }

// function show_manage_venue()
// {
//     // document.getElementsByClassName("main")[0].style.display="none";
//     document.getElementsByClassName("manage_user")[0].style.display="none";
//     document.getElementsByClassName("manage_venue")[0].style.display="block";
// }

function get_signup_admins()
{
    window.location.replace("signupAdmins.html");
}

function go_to_manage()
{
    window.location.replace("manage.html");
}

function show_venue()
{
    document.getElementsByClassName("manage_venue")[0].style.display="block";
    document.getElementsByClassName("manage_user")[0].style.display="none";
}

function show_user()
{
    document.getElementsByClassName("manage_venue")[0].style.display="none";
    document.getElementsByClassName("manage_user")[0].style.display="block";
}
