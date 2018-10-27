var animals = ["squirrel", "horse", "dog", "cat", "mouse", "lizard", "snake", "tiger", "monkey", "elephant", "whale"];


// displayAnimalGif function re-renders the HTML to display the appropriate content
function displayAnimalGif() {

  $("#gifs-appear-here").empty();

  var animal = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=0WSHh7OtEtjZz5Lk3Ye1GTuAItjgKdP9&limit=10";
  console.log(queryURL);

  // Creating an AJAX call for the specific animal button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    // Creating a div to hold the animal
    var animalDiv = $("<div class='animal'>");

    // Storing data received
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

      // Creating and storing a div tag
      var animalDiv = $("<div>");

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);


      // Creating and storing an image tag
      var animalImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item

      animalImage.attr("src", results[i].images.fixed_width_still.url);



      // Appending the paragraph and image tag to the animalDiv
      animalDiv.append(p);
      animalDiv.append(animalImage);
      console.log(animalImage);

      //change the still gif to a moving gif when clicked

      $("animalImage").on("click", function () {
        src = animalImage.attr("src");
        if ($(src.split("_")).last()[0] == "still.gif")
          animalImage.attr('src', src.replace('_still.gif', '.gif'));
        else
          animalImage.attr('src', src.replace('.gif', '_still.gif'));

      });



      // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
      $("#gifs-appear-here").prepend(animalDiv);


    }

  });
}

// Function for displaying animal data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < animals.length; i++) {


    var a = $("<button>");

    a.addClass("animal-btn");

    a.attr("data-name", animals[i]);

    a.text(animals[i]);

    $("#buttons-view").append(a);
  }
}

// This function handles events where an animal button is clicked
$("#add-animal").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding animal from the textbox to our array
  animals.push(animal);

  // Calling renderButtons which handles the processing of our animal array
  renderButtons();
});





// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();