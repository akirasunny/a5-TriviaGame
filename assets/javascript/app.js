// Q & A
var QandA = {
	"Which is the only American state to begin with the letter 'p'?": "Pennsylvania",
	"Name of the world's biggest island?": "Greenland",
	"What is the world's longest river?": "Amazon",
	"Name the world's largest ocean?": "Pacific",
	"What is the diameter of Earth?": "8000 miles",
	"What's the name of world's most ancient forest?": "Daintree Forest",
	"Which four British cities have underground rail systems?": "Liverpool, Glasgow, Newcastle and London",
	"What is the capital city of Spain?": "Madrid",
	"Which country is Prague in?": "Czech Republic",
	"Which English town was a forerunner of the Parks Movement and the first city in Europe to have a street tram system?": "Birkenhead",
	"In what country would you find the cities Ankara and Istanbul?": "Turkey",
	"What country was known as Ceylon until 1972?": "Sri Lanka",
	"Leonardo da Vinci was born in what country?": "Italy",
	"Which desert is the biggest desert in the world, outside the Polar region?": "Sahara Desert",
	"Which is the longest continental mountain range in the world?": "The Andes"
}

var questions = Object.keys(QandA);
var answers = Object.values(QandA);

var choices1 = ["Pago Pago", "Palmdale", "Paradise", answers[0]];
var choices2 = ["Taiwan", "New Guinea", "Baffin", answers[1]];
var choices3 = ["Nile", "Yangtze", "Mississippi", answers[2]];
var choices4 = ["Arctic", "Indian", "Coral", answers[3]];
var choices5 = ["7500 miles", answers[4], "8500 miles", "9000 miles"];
var choices6 = ["The Aracuaria Forest", "Yakushima Forest", "Bialowieza Forest", answers[5]];
var choices7 = ["Manchest, Glasgow, Newcastle and London", "Manchest, Bristol, Newcastle and London", "Liverpool, Glasgow, Manchest and London", answers[6]];
var choices8 = ["Seville", "Granada", "Bilbao", answers[7]];
var choices9 = ["Hungary", "Germany", "Poland", answers[8]];
var choices10 = ["Acle", "Blyth", "Broseley", answers[9]];
var choices11 = ["Iraq", "Iran", "Qatar", answers[10]];
var choices12 = ["Maldives", "Comoros", "Madagascar", answers[11]];
var choices13 = ["San Marino", "Bulgaria", "Malta", answers[12]];
var choices14 = ["Patagonian", "Arabian", "Gobi", answers[13]];
var choices15 = ["Southern Great Escarpment", "Rocky Mountains", "Great Dividing Range", answers[14]];

var choices = [choices1, choices2, choices3, choices4, choices5, choices6, choices7, choices8, choices9, choices10, choices11, choices12, choices13, choices14, choices15]

// globals
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var counter = 0;
var time = 30;
var interval;
var isstart = false;
var pause = false;


// placeholders
var index;

// functions

// shuffle the choices array (from Stack Overflow)
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

function remove() {
	questions.splice(index, 1);
	answers.splice(index, 1);
	choices.splice(index, 1);
}

function clear() {
	$("#timer", "#question", "#options").empty();
}

function reset() {
	$("#result").empty();
	isstart = true;
	pause = false;
	time = 30;
	counter = 0;
	correct = 0;
	incorrect = 0;
	unanswered = 0;
	pause = false;
	questions = Object.keys(QandA);
	answers = Object.values(QandA);
	choices = [choices1, choices2, choices3, choices4, choices5, choices6, choices7, choices8, choices9, choices10, choices11, choices12, choices13, choices14, choices15]
	main();
}

// timer
function timerrun() {
	interval = setInterval(decrement, 1000);
}

function decrement() {
	time -= 1;
	$("#timer").html("<p>Time Remaining: " + time + "s</p>");
	if (time <= 0 && pause !== true) {
		checktimeout();
		unanswered += 1;
	}
}

function timerstop() {
	clearInterval(interval);
}


// result checkers
function checkcorrect() {
	pause = true;
	counter += 1;
	timerstop();
	$("#options").empty();
	$("#checker").html("<p>Correct.Yay.</p><img src='assets/images/correct.gif'>");
	remove();
	if (counter > 14) {
		setTimeout(result, 4000);
	}
	else {
	setTimeout(next, 4000);
	}

}

function checkincorrect() {
	pause = true;
	counter += 1;
	timerstop();
	$("#options").empty();
	$("#checker").html("<p>Nope. That's not the correct answer.</p>"
		+ "<p>The correct answer is: " + answers[index] + "</p>"
		+ "<img src='assets/images/incorrect.gif'>"
		);
	remove();
	if (counter > 14) {
		setTimeout(result, 4000);
	}
	else {
		setTimeout(next, 4000);
	}
}

function checktimeout() {
	counter += 1;
	timerstop();
	$("#options").empty();;
	$("#checker").html("<p>Well, you ran out of time..</p>"
		+ "<p>The correct answer is: " + answers[index] + "</p>"
		+ "<img src='assets/images/timeout1.gif'>"
		);
	remove();
	if (counter > 14) {
		setTimeout(result, 4000);
	}
	else {
		setTimeout(next, 4000);
	}
}

function result() {
	$("#question").css("display", "none");
	pause = true;
	timerstop();
	clear();
	$("#checker").empty();
	$("#result").html("<p>You've hit the end of this quiz. Here's how you did:</p>"
		+ "<p>Correct Answers: " + correct + "</p>"
		+ "<p>Incorrect Answers: " + incorrect + "</p>"
		+ "Unanswered: " + unanswered + "</p>"
		+ "<button id='reset'>Play Again</button>"
	)
	$("#reset").click(reset);

}

// main functions
function main() {
if (isstart === true) {
	// show question div
	$("#question").css("display", "block");
	
	// run timer
	$("#timer").html("<p>Time Remaining: 30s</p>");
	timerrun();
		
	// grab a question
	index = Math.floor(Math.random() * questions.length)
	var computerchoice = questions[index]
	$("#question").html(questions[index]);

	// shuffle choices, assign attribute and append them to div
	shuffle(choices[index]);
	for (i = 0; i < choices[index].length; i++) {
		var div = $("<div>");
		div.attr("class", "choicebutton");
		div.text(choices[index][i]);
		$("#options").append(div);

	}

	// remove related elements from arrays

	$(".choicebutton").on("click", function() {
		if ($(this).text() === answers[index] && time >= 0) {
			checkcorrect();
			correct += 1;
		}
		else if ($(this).text() !== answers[index] && time >= 0) {
			checkincorrect();
			incorrect += 1;
		}
	})

	}
}

function next() {
	// update pause flag
	pause = false;

	// empty checker
	$("#checker").empty();

	// reset timer
	time = 30;
	$("#timer").html("<p>Time Remaining: 30s</p>");
	timerrun();
		
	// grab a question
	index = Math.floor(Math.random() * questions.length)
	var computerchoice = questions[index]
	$("#question").html(questions[index]);

	// shuffle choices, assign attribute and append them to div
	shuffle(choices[index]);
	for (i = 0; i < choices[index].length; i++) {
		var div = $("<div>");
		div.attr("class", "choicebutton");
		div.text(choices[index][i]);
		$("#options").append(div);

	}

	// remove related elements from arrays

	$(".choicebutton").on("click", function() {
		if ($(this).text() === answers[index] && time >= 0) {
			checkcorrect();
			correct += 1;
		}
		else if ($(this).text() !== answers[index] && time >= 0) {
			checkincorrect();
			incorrect += 1;
		}
	})

}

// main
$("#start").on("click", function() {
	$("#instruction").css("display", "none");
	isstart = true;
	main();
})