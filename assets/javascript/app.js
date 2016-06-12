
	// Initial array of cartoons
	var cartoons = [
		{ name: 'Batman', id: 0, imgDiv: "" },
		{ name: 'Simpsons', id: 1, imgDiv: "" },
		{ name: 'Snoopy', id: 2, imgDiv: "" },
		{ name: 'Spongebob', id: 3, imgDiv: "" },
	];

	// The imgSrc attribute for each cartoon above will be set to an img div 
	// created when we retrieve the data from the api response object.
	//
	//     <img src="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" 
	//			data-still="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" 
	//			data-animate="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" 
	//			data-state="still" class="cartoonImage">

	var results = ""; // This will hold the current results returned from the API
	// ========================================================

	// displayCartoonInfo function is called when an animlal button is clicked.
	// It will re-render the HTML to display the appropriate content returned from the API. 
	function displayCartoonInfo(){

		var cartoon = $(this).attr('data-name');
//		var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + cartoon;
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=cartoon+" + cartoon + "&api_key=dc6zaTOxFJmzC&limit=10";

		// Creates AJAX call for the specific cartoon being 
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

			//** NOTE: Change this to create a array img divs to
			//** be displayed.  For now, just get the first one.
			results = response.data

			// Creates a generic div to hold the cartoon
			var cartoonDiv = $('<div class="cartoon">');

			// Retrieves the Rating Data
			var rating = results[0].rating;

			// Creates an element to have the rating displayed
			var pRating = $('<p>').text( "Rating: " + rating);

			// Displays the rating
			cartoonDiv.append(pRating);

			//** NOTE: Change this to put the still and animated images
			//** in the cartoons array.
			// Creates an element to hold the image 
			var cartoonImage = $('<img>');
			cartoonImage.attr('src', results[0].images.fixed_height.url);

			// Appends the image
			cartoonDiv.append(cartoonImage);

			// Puts the entire Cartoon above the previous cartoons.
			$('#cartoonsView').prepend(cartoonDiv);
		});

	}

	// ========================================================

	// Generic function for displaying cartoon data 
	function renderButtons(){ 

		// Deletes the cartoons prior to adding new cartoons (this is necessary otherwise you will have repeat buttons)
		$('#buttonsView').empty();

		// Loops through the array of cartoons
		for (var i = 0; i < cartoons.length; i++){

			// Then dynamicaly generates buttons for each cartoon in the array

			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('cartoon'); // Added a class 
		    a.attr('data-name', cartoons[i].name); // Added a data-attribute
		    a.text(cartoons[i].name); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}

	// ========================================================

	// This function handles events where one button is clicked
	$('#addCartoon').on('click', function(){

		// This line of code will grab the input from the textbox
		var cartoon = {
			name: $('#cartoon-input').val().trim(),
			id: cartoons.length,
			imgDiv: "",
		};


		// The cartoon from the textbox is then added to our array
		cartoons.push(cartoon);

		// Our array then runs which handles the processing of our cartoon array
		renderButtons();

		// Clear out the input field
		$('#cartoon-input').val("");

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})

	// ========================================================

	// Generic function for displaying the cartoonInfo
	$(document).on('click', '.cartoon', displayCartoonInfo);


	// ========================================================

	$(document).ready(function(){
		// This calls the renderButtons() function
		renderButtons();
	});
