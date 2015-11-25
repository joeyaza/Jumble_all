$( init);

function init(){
  $('#fullpage').fullpage({
    sectionsColor: ['#A5D8FF', '#758ECD', '#D5C6E0', '#C5979D', '#C5979D'], 
    fixedElement: "#navbar"});
  $("form").on("submit", submitForm);
  $(".logout-link").on("click", logout);
  $(".login-link, .register-link").on("click", showPage);
  hideErrors();
  checkLoginState();
}

function checkLoginState(){
  if (getToken()) {
    return loggedInState();
  } else {
    return loggedOutState();
  }
}

function showPage() {
  event.preventDefault();
  var linkClass = $(this).attr("class").split("-")[0]
  $("section").hide();
  hideErrors();
  return $("#" + linkClass).show();
}

function submitForm(event){
  event.preventDefault();

  var method = $(this).attr("method");
  var url    = "http://localhost:3000/api" + $(this).attr("action");
  var data   = $(this).serialize();
  this.reset();

  return ajaxRequest(method, url, data, authenticationSuccessful);
}

function logout(){
  removeToken();
  return loggedOutState();
}


function hideErrors(){
  return $(".alert").removeClass("show").addClass("hide");
}

function displayErrors(data){
  return $(".alert").text(data).removeClass("hide").addClass("show");
}

function loggedInState(){
  $("section, .logged-out").hide();
  $("#users, .logged-in").show();
  $.fn.fullpage.destroy();
  $("#fullpage").hide();
  $("#newsfeed").show();
  titles();
}


function loggedOutState(){
  $("section, .logged-in").hide();
  $("#register, .logged-out").show();
  $("#fullpage").show();
}

function titles() {
  event.preventDefault();
  return getTitles();
}

function getTitles() {
  return ajaxRequest("get", "http://localhost:3000/api/articles", null, showTitles)
}

function showTitles(data) {
  // console.log(data)
  // return $.each(data.articles, function(index, article){
  //   $('.articles').append('<p>' + article.title + '<p>');


    _(data.articles).each(function(article){
      var underscoreTemplate = _.template($("#list-template").html());
      var compiledTemplate = underscoreTemplate(article);
      $("#my-list").append(compiledTemplate);
      $('.materialboxed').materialbox();


  });
}

//   _(articles).each(function(data){
//     var underscoreTemplate = _.template($("#list-template").html());
//     var compiledTemplate = underscoreTemplate(data);
//     $("#my-list").append(compiledTemplate);
//   })
// })





function authenticationSuccessful(data) {
  if (data.token) setToken(data.token);
  checkLoginState();
}

function setToken(token) {
  return localStorage.setItem("token", token)
}

function getToken() {
  return localStorage.getItem("token");
}

function removeToken() {
  return localStorage.clear();
}

function setRequestHeader(xhr, settings) {
  var token = getToken();
  if (token) return xhr.setRequestHeader('Authorization','Bearer ' + token);
}

function ajaxRequest(method, url, data, callback) {
  return $.ajax({
    method: method,
    url: url,
    data: data,
    beforeSend: setRequestHeader,
  }).done(function(data){
    callback(data);
  }).fail(function(data) {
    displayErrors(data.responseJSON.message);
  });
}



// $(init);

//  function init(){
//   $("form").on("submit", submitForm);
//   $(".logout-link").on("click", logout);
//   $(".login-link, .register-link").on("click", showPage);
//   hideErrors();
//   checkLoginState();  
// }

// function logout(){
//   removeToken();
//   return loggedOutState();
// }

// function removeToken() {
//   return localStorage.clear();
// }

// function checkLoginState(){
//   if (getToken()) {
//     return loggedInState();
//   } else {
//     return loggedOutState();
//   }
// }

// function checkLogInState() {

// }

// function loggedInState() {

// }

// function loggedOutState() {

// }

// function authenticationSuccessful() {

// }

// function setToken() {

// }

// function getToken() {
//   return localStorage.getItem("token");
// }

// function showProfile() {

// }

// function hideProfile() {

// }

// function setRequestHeader() {

// }

// function showPage() {

// }

// function submitForm() {

// }

// function displayJumbles() {

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
// };