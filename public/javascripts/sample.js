//FORM
var $form = $("#ingredients-form");

//if form submit works
var onSuccessForm = function (data, status) {

  //TODO- fix bug that replaces ingredients list with 2 empty objects
  $( "#ingredient-list" ).html(data);
  alert("Form submitted, insert AJAX magic here");
};

//if form submit fails
var onErrorForm = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};


//submitting the form
$form.submit(function(event) {
  event.preventDefault();
  console.log ("inside submit handler");

  //getting values of ingredientName and ingredientPrice from form data
  var ingredientName = $form.find("[name='ingredientName1']").val();
  var ingredientPrice = $form.find("[name='ingredientPrice1']").val();

  //sending post request
  $.post("ingredients/add", {
    ingredientName: ingredientName,
    ingredientPrice: ingredientPrice
  })
    .done(onSuccessForm)
    .error(onErrorForm)
});





//EDIT BUTTON

//if click is successful
var onSuccessEdit = function(data, status) {
   //$( "#result" ).html(data);
   alert("Edit button clicked, insert AJAX magic here");
};

//if click fails
var onErrorEdit = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};


$(".edit").on("click",function(e) {
  console.log(e);
  var ID = $(this).attr("id");
  var title = prompt("Please enter ingredient name.", "Ingredient");

  if (title !== null) {
    var price = prompt("Please enter price for "+title+".", 0);
    if (price !==null) {
      $.post("/ingredients/edit", {
          origName: ID,
          title: title,
          price: price
        })
      .done(onSuccessEdit)
      .error(onErrorEdit)
    }
  }
});

 //OUT OF STOCK BUTTON

 //if click is successful
var onSuccessStock = function(data, status) {
   //$( "#result" ).html(data);
   alert("Out of Stock button clicked, insert AJAX magic here");
};

//if click fails
var onErrorStock = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};


$(".outStock").on("click",function(e) {
  console.log(e);
  var ID = $(this).attr("id");
  $.post("/ingredients/outOfStock", {
      ID:ID
    })
  .done(onSuccessStock)
  .error(onErrorStock)
});


