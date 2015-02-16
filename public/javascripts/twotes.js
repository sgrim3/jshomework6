//FORM
var $form = $("#twote-form");

//if form submit works
var onSuccessForm = function (data, status) {
  $( "#twote-list" ).html(data);
};

//if form submit fails
var onErrorForm = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};


//submitting the form
$form.submit(function(event) {
  event.preventDefault();

  //getting values of content from form data
  var twoteContent = $("#twoteContent").val()

  //sending post request
  $.post("twotes/add", {
    twoteContent: twoteContent
  })
    .done(onSuccessForm)
    .error(onErrorForm)
});


//X (DELETE) BUTTON

//if click is successful
var onSuccessEdit = function(data, status) {
   $( "#twote-list" ).html(data);
};

//if click fails
var onErrorEdit = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};


$(".delete").on("click",function(e) {
  console.log(e);
  var ID = $(this).attr("id");
  $.post("/twotes/delete", {
    ID: ID
  })
  .done(onSuccessEdit)
  .error(onErrorEdit)
});


//LOGOUT BUTTON
$("#logout").on("click",function(e) {
   window.location.href='/login';
});
