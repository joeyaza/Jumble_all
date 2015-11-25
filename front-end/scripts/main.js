$( init);

function init(){
  $('#fullpage').fullpage({
    sectionsColor: ['#A5D8FF', '#758ECD', '#D5C6E0', '#C5979D'],
    fixedElements: '#navbar',
    anchors: ['landingPage', 'about', 'madeBy']
  });
  $("form").on("submit", submitForm);
  $(".profile-link").on("click", getProfile);
  $(".logout-link").on("click", logout);
  $(".login-link, .register-link").on("click", showPage);
  $('.modal-trigger').leanModal();
  $(".button-collapse").sideNav();
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
  removeData();
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
  $("#profileSection").show();
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
  _(data.articles).each(function(article){
    var underscoreTemplate = _.template($("#list-template").html());
    var compiledTemplate = underscoreTemplate(article);
    $("#my-info").append(compiledTemplate);
    $('.materialboxed').materialbox();
  });
}

function authenticationSuccessful(data) {
  if (data.token) setData(data);
  checkLoginState();
}

function setData(data) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", data.user._id);
  localStorage.setItem("user-name", data.user.local.username);
  localStorage.setItem("user-email", data.user.local.email);
  localStorage.setItem("user-pic", data.user.local.picture_url);
}

function getToken() {
  return localStorage.getItem("token");
}

function removeData() {
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

function getProfile(event){
  event.preventDefault();
  $('#newsfeed').hide();
  var userId = localStorage.getItem("userId");
  return ajaxRequest("get", "http://localhost:3000/api/users/" + userId, null, showProfile)
}

function showProfile(data){
  event.preventDefault();
  $('#newsfeed').hide();
  $('#profileSection').show();
  console.log(data)
  var underscoreTemplate = _.template($("#profile-template").html());
  var compiledTemplate = underscoreTemplate(data);
  $("#my-info").append(compiledTemplate);
}

function hideProfile(){
  event.preventDefault();

}
