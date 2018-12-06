var topics = ["Gorilla", "Grizzly Bear", "lion", "Zebra", "Cheetah"];

// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {

    var gif = $(this).attr("data-name");

    var apiKey = "rlOpiLGWfna9m6TGuf1ZW8yuG02F7rmQ";

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=rlOpiLGWfna9m6TGuf1ZW8yuG02F7rmQ&q=animals&limit=25&offset=0&rating=G&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
           
        // Creating a div to hold the gif
        var gifDiv = $("<div class='gif'>");
        
        // Storing the rating data
        var rating = response.Rated;
        
        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);
        
        // Displaying the rating
        gifDiv.append(pOne);
        
        // Retrieving the URL for the image
        var imgURL = response.Poster;
        
        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);
        
        // Appending the image
        gifDiv.append(image);
        
        // Putting the entire gif above the previous gifs
        $("#gif-view").prepend(gifDiv);
    
    });

}

// Function for displaying gif data
function renderButtons() {


    $("#buttons-view").empty();

    // Looping through the array of gifs
    for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each gif in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of gif-btn to our button
    a.addClass("gif-btn");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
    }
}

// This function handles events where a gif button is clicked
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#gif-input").val().trim();

    // Adding gif from the textbox to our array
    topics.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
