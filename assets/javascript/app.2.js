var CartoonTastic = {

	// Initial array of cartoons
	cartoons: [
		{ name: 'Batman', id: 0, imgDiv: "" },
		{ name: 'Simpsons', id: 1, imgDiv: "" },
		{ name: 'Snoopy', id: 2, imgDiv: "" },
		{ name: 'Spongebob', id: 3, imgDiv: "" },
	],

	// The imgSrc attribute for each cartoon above will be set to an img div 
	// created when we retrieve the data from the api response object.
	//
	//     <img src="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" 
	//			data-still="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" 
	//			data-animate="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" 
	//			data-state="still" class="cartoonImage">

	results: "", // This will hold the current results returned from the API
	// ========================================================

	// displayCartoonInfo function is called when an animlal button is clicked.
	// It will re-render the HTML to display the appropriate content returned from the API. 
	displayCartoonInfo: function(button) {

		var cartoon = $(button).attr('data-name');
	    var queryURL = "http://api.giphy.com/v1/gifs/search?q=cartoon+" + cartoon + "&api_key=dc6zaTOxFJmzC&limit=10";
	    var self = this;

		// Creates AJAX call for the specific cartoon being 
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

			//** NOTE: Change this to create a array img divs to
			//** be displayed.  For now, just get the first one.
			//** In the end, this may not be needed if I can get
			//** to the data- attributes in the DOM.  They are getting
			//** set correctly but the data() calls are not retrieving
			//** them when needed, i.e. when an image is clicked.
			self.results = response.data;

			// Creates a generic div to hold the cartoon
			var cartoonDiv = self.buildDiv(self.results[0]);

			// Put the entire Cartoon above the previous cartoons.
			$('#cartoonsView').prepend(cartoonDiv);
		});

		self.renderButtons();
	},

	buildDiv: function(cartoon) {

		var cartoonDiv = $('<div class="cartoon">');

		// Retrieves the Rating Data
		var rating = cartoon.rating;

		// Creates an element to have the rating displayed
		var pRating = $('<p>').text( "Rating: " + rating);

		// Displays the rating
		cartoonDiv.append(pRating);

		//** NOTE: Change this to put the still and animated images
		//** in the cartoons array.
		// Creates an element to hold the image 
		var cartoonImage = $('<img>');

		// start with the moving image
		cartoonImage.attr('src', cartoon.images.fixed_height_still.url);
		cartoonImage.attr('data-still', cartoon.images.fixed_height_still.url);
		cartoonImage.attr('data-animate', cartoon.images.fixed_height.url);
		cartoonImage.attr('data-state', 'still');

		// Appends the image
		cartoonDiv.append(cartoonImage);

		return cartoonDiv;
	},

	// ========================================================

	// Generic function for displaying cartoon data 
	renderButtons: function(){ 

		// Deletes the cartoons prior to adding new cartoons (this is necessary otherwise you will have repeat buttons)
		$('#buttonsView').empty();

		// Loops through the array of cartoons
		for (var i = 0; i < this.cartoons.length; i++){

			// Then dynamicaly generates buttons for each cartoon in the array

			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('cartoon-button'); // Added a class 
		    a.attr('data-name', this.cartoons[i].name); // Added a data-attribute
		    a.text(this.cartoons[i].name); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	},

	addCartoon: function(){
		// This line of code will grab the input from the textbox
		var cartoon = {
			name: $('#cartoon-input').val().trim(),
			id: this.cartoons.length,
			imgSrc: "",
		};

		// The cartoon from the textbox is then added to our array
		this.cartoons.push(cartoon);

		// Our array then runs which handles the processing of our cartoon array
		this.renderButtons();

		// Clear out the input field
		$('#cartoon-input').val("");
	},

	toggleCartoonImage: function(cartoon) {
		// Get the current state of the image, animate or still.
		var image = $(cartoon).children()[1]; // [0] = <p>, [1] = <img>
    	var state = $(image).attr('data-state'); 

    	/* Use the current state of the image to determine what to do next
    		* if variable state is equal to 'still' then 
    			* update the src attribute of this image that you clicked on to what data-animate is equal to for this image
    			* and update the data-state attribute to 'animate'
    		* if state does not equal 'still' then 
    			* update the src attribute of this image that you clicked on to what data-still is equal to for this image
    			* and update the data-state attribute to 'still'
		*/

var a = $(image);
var b = $(image).data('animate');
var c = $(image).data('still');
var d = $(image).data('state');
console.log("animate: " + b);
console.log("still: " + c);
console.log("state: " + state);

        if ( state == 'still'){
            $(image).attr('src', $(image).data('animate'));
            $(image).attr('data-state', 'animate');
        }else{
            $(image).attr('src', $(image).data('still'));
            $(image).attr('data-state', 'still');
        }
a = $(image);
b = $(image).data('animate');
c = $(image).data('still');
d = $(image).data('state');
console.log("animate: " + b);
console.log("still: " + c);
console.log("state: " + state);

		// This calls the renderButtons() function
		this.renderButtons();
	},
};

// =================== FUNCTIONS ========================

// This function handles events where add a cartoon button is clicked
$('#addCartoon').on('click', function(){

	CartoonTastic.addCartoon();

	// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
	return false;

});

$(document).on('click', '.cartoon-button', function() {

	CartoonTastic.displayCartoonInfo(this);

});

$(document).on('click', '.cartoon', function(){

	CartoonTastic.toggleCartoonImage(this);

});

$(document).ready(function(){
	// Retrieve cartoon GIFs from the Giphy API
	// Build the HTML to display buttons to add cartoons to search for
	CartoonTastic.renderButtons();
});

