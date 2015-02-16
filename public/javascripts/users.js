var $form = $("#login-form");

//if the submit works
var onSuccess = function(data, status) {
  window.location.href='/twotes'
};

//if the submit fails
var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

//submitting the form
$form.submit(function(event) {
  event.preventDefault();

  //getting the value of username from form
  var username = $form.find("[name='username']").val();

  //sending post request to add order to database
  $.post("users/add",{
    username: username
  })
    .done(onSuccess)
    .error(onError)
});
