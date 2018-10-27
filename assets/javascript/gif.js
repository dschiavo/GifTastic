
var animals = ["squirrel", "horse", "dog", "cat", "mouse", "lizard", "snake", "tiger", "monkey", "elephant", "whale"]; 

function displayButton(){

 
 for (var i = 0; i < animals.length; i++) {

    var a = $("<button>");
    a.addClass("animal-btn");
    a.attr("data-name", animals[i]);
    a.text(animals[i]);
    $("#buttons-view").append(a);
    console.log(a[i]);
    console.log(a);
 }
}

function displayAnimalGif() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=0WSHh7OtEtjZz5Lk3Ye1GTuAItjgKdP9&limit=10";

    // Creating an AJAX call for the specific button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Creating a div to hold the gif
      var animalDiv = $("<div class='animal'>");

      // Storing the rating data
      var rating = response.rating;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      animalDiv.append(pOne);
      
          // Retrieving the URL for the image
          var imgURL = response.url;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          animalDiv.append(image);

      
      

    });

         

}
  
        // Adding a click event listener to all elements with a class of "animal-btn"
         $(document).on("click", ".animal-btn", displayAnimalGif);

         // Calling the displayButton function to display the intial buttons
         displayButton();