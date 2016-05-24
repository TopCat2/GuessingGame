/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber,
    remainingGuesses,	// Number of guesses left
    prevGuesses;		// Values guessed so far, to reject duplicates



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(Math.random() * 100) + 1;

}

function showFeedback(str) {
	$("#feedback").text(str);
}
function showRemaining(cnt) {
	if (cnt > 0 | playersGuess == winningNumber) {
		$("#counter").text("You have " + remainingGuesses 
			+ " guesses left.");
	} else {
		$("#counter").text("Sorry, play again.");
	}
}

// Fetch the Players Guess

function playersGuessSubmission(event){
	// Stop the stupid even from reloading the form
	event.preventDefault();	
	// Don't accept input if the game is over
	if (remainingGuesses < 1 | playersGuess == winningNumber) {
		return;
	}
	var guess = $("#guess");
	// Snag the guess and clear the input
	playersGuess = +guess.val();
	console.log("Player guessed " + playersGuess);
	$(guess).val("");

	checkGuess();
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(target, guessed){
	if (target < guessed) {
		return "higher than "
	} else if (target > guessed) {
		return ("lower than ")
	} else {
		return " ** Something is wrong.  Equal. **"
	}
}


// Generate the message for an incorrect guess
function guessMessage(target, guessed) {
	diff = Math.abs(target - guessed);
	if (diff > 20) {
		part = "more than 20 away from"
	} else if (diff > 10) {
		part = "within 20 of"
	} else if (diff > 5) {
		part = "within 10 of"
	} else {
		part = "within 5 of"
	}
	var msg = "Your guess of " + guessed + " is " 
		+ lowerOrHigher(target, guessed) 
		+ " and " + part 
		+ " the winning number.";
	return msg;
}
// Check if the Player's Guess is the winning number 

function checkGuess(){
	// Skip already-used numbers
	if (prevGuesses.indexOf(playersGuess) >=0) {
		showFeedback ("You already guessed " + playersGuess
			+ ".  Wake up!")
		return;
	} 
	prevGuesses.push(playersGuess);
	// Reduce the remaining guess count
	remainingGuesses -= 1;

	// Show the win or play-on message
	showRemaining(remainingGuesses);
	if (playersGuess == winningNumber) {
		showFeedback("You have won!  The number was " + winningNumber + ".");
	} else {
		showFeedback(guessMessage(winningNumber, playersGuess));
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	showFeedback("A hint?  You want a hint?  $18,000 for this course, you work it out!")
}

// Allow the "Player" to Play Again

function playAgain(){
	winningNumber = generateWinningNumber();
	remainingGuesses = 5;
	prevGuesses = [];
	playersGuess = -7;	// Dummy value for previous guess
	showFeedback("You have not guessed yet.");
	showRemaining(remainingGuesses);
	console.log("New game started.  Winning number is " + winningNumber);
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
	playAgain();
	console.log("Document is ready.  Winning number is " + winningNumber);

	$("#playAgain").on('click', playAgain);
	$("#cheat").on('click', playersGuessSubmission);
	$("form").submit(playersGuessSubmission);
	$("#hint").on('click', provideHint);
});

