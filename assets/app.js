 var giphys = ["duh", "karate", "taco", "asdf", "aw man", "cmon man", "kobe", "robot", "give up", "fail", "make it stop", "nut shot", "GoT", ];
 // Example queryURL for Giphy API

 function displayGiphy() {

     var giphy = $(this).attr("data-name");
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + giphy + "&limit=10&api_key=dc6zaTOxFJmzC";

     $.ajax({
         url: queryURL,
         method: 'GET'
     }).done(function(response) {

         console.log(response); //----get object
         console.log(response.data[0].images.downsized_medium.url); //----gets gif address we use for var imgURL
         console.log(response.data[0].rating); //----------------------returns rating

         for (var i = 0; i < response.data[0].images.downsized_medium.url.length; i++) { //---this code goes off of the return limit of 20
             //for (var i = 0; i < giphys.length; i++) { //-------this code will match the array length
             //var ratingDiv = $("<div class='rating'>");
             var giphyDiv = $("<div class='newGiphy'>");

             var rating = $("<p>").html("Rating: " + response.data[i].rating);
             // Retrieving the URL for the image
             var imgURL = response.data[i].images.downsized_medium.url;

             // Creating an element to hold the image
             var image = $("<img>").attr("src", imgURL);

             // Appending the image
             giphyDiv.append(rating, image);

             //$("#giphy-view").prepend(ratingDiv);
             // Putting the entire giphy above the previous giphys
             $("#giphy-view").prepend(giphyDiv);
         }
     });
 }

 function renderButtons() {

     // Deleting the giphys prior to adding new giphys
     // (this is necessary otherwise you will have repeat buttons)
     $("#buttons-view").empty();

     // Looping through the array of giphys
     for (var i = 0; i < giphys.length; i++) {

         // Then dynamicaly generating buttons for each giphy in the array
         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
         var a = $("<button>");
         // Adding a class of giphy to our button
         a.addClass("giphy");
         // Adding a data-attribute
         a.attr("data-name", giphys[i]);
         // Providing the initial button text
         a.text(giphys[i]);
         // Adding the button to the buttons-view div
         $("#buttons-view").append(a);
     }
 }

 $("#add-giphy").on("click", function(event) {
     displayGiphy();

     event.preventDefault();

     var giphy = $("#giphy-input").val().trim(); // This line grabs the input from the textbox

     giphys.push(giphy); // Adds giphy from the textbox to giphya array

     renderButtons(); //--------runs the function to add new user created button

 });


 $(document).ready(function() {

     renderButtons();

     $(document).on("click", ".giphy", displayGiphy);

    
 });