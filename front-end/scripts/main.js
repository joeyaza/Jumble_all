// $(init);

// function init(){
//   $("form").on("submit", submitForm);
//   $(".logout-link").on("click", logout);
//   $(".users-link").on("click", users);
//   $(".login-link, .register-link, .users-link").on("click", showPage);
//   hideErrors();
//   checkLoginState();  
// }

// function checkLoginState(){
//   if (getToken()) {
//     return loggedInState();
//   } else {
//     return loggedOutState();
//   }
// }

// function showPage() {
//   event.preventDefault();
//   var linkClass = $(this).attr("class").split("-")[0]
//   $("section").hide();
//   hideErrors();
//   return $("#" + linkClass).show();
// }

// function submitForm(){
//   event.preventDefault();

//   var method = $(this).attr("method");
//   var url    = "http://localhost:3000/api" + $(this).attr("action");
//   var data   = $(this).serialize();

//   return ajaxRequest(method, url, data, authenticationSuccessful);
// }

// function users(){
//   event.preventDefault();
//   return getUsers();
// }

// function logout(){
//   removeToken();
//   return loggedOutState();
// }

// function getUsers(){
//   return ajaxRequest("get", "http://localhost:3000/api/users", null, displayUsers)
// }

// function displayUsers(data){
//   hideErrors();
//   return $.each(data.users, function(index, user) {
//     $(".users").prepend('<div class="media">' +
//                           '<div class="media-left">' +
//                             '<a href="#">' +
//                               '<img class="media-object" src="' + user.local.image +'">' +
//                             '</a>' +
//                           '</div>' +
//                           '<div class="media-body">' +
//                             '<h4 class="media-heading">@' + user.local.username + '</h4>' +
//                             '<p>' + user.local.fullname + '</p>'+
//                           '</div>' +
//                         '</div>');
//   });
// }

// function hideUsers(){
//   return $(".users").empty();
// }

// function hideErrors(){
//   return $(".alert").removeClass("show").addClass("hide");
// }

// function displayErrors(data){
//   return $(".alert").text(data).removeClass("hide").addClass("show");
// }

// function loggedInState(){
//   $("section, .logged-out").hide();
//   $("#users, .logged-in").show();
//   return getUsers();
// }

// function loggedOutState(){
//   $("section, .logged-in").hide();
//   $("#register, .logged-out").show();
//   return hideUsers();
// }

// function authenticationSuccessful(data) {
//   if (data.token) setToken(data.token);
//   checkLoginState();
//   getUsers();
// }

// function setToken(token) {
//   return localStorage.setItem("token", token)
// }

// function getToken() {
//   return localStorage.getItem("token");
// }

// function removeToken() {
//   return localStorage.clear();
// }

// function setRequestHeader(xhr, settings) {
//   var token = getToken();
//   if (token) return xhr.setRequestHeader('Authorization','Bearer ' + token);
// }

// function ajaxRequest(method, url, data, callback) {
//   return $.ajax({
//     method: method,
//     url: url,
//     data: data,
//     beforeSend: setRequestHeader,
//   }).done(function(data){
//     callback(data);
//   }).fail(function(data) {
//     displayErrors(data.responseJSON.message);
//   });
// }