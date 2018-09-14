// ------------------- global variables ------------------- //
// created html element variable, score, sounds
var gameHTML;
var theTimer;
var counter = 30;
var questionCounter = 0;
var correctTally = 0;
var incorrectTally = 0;
var timeOutTally = 0;
var clickSound = new Audio("./assets/images/refreshedSound.mp3");

// questions, answers, images arrays
var questionArray = ["What was one of Victor Vasarely's most famous works?", "What was Jesús Rafael Soto's last work and installation?", "What's Ezequiel's favorite Yaacov Agam serigraph?", "What series did Josef Albers work on for 26 years until his death?", "Exemplifying the miminimalist movement, who coined the phrase, \"What you see is what you see?\"", "Blanton Museum of Art at UT Austin held whose work titled, Plus Reversed (1960)?", "Creator of another favorite, CINÉTICA DEL CÍRCULO (1968), how did Ernesto Briel Die?", "Which artist inspired Beach House's 7 visual album and artwork?"];
var answerArray = [["Zebra (1937)", "Q1A2", "Q1A3", "Q1A4"], ["Q2A1", "Houston Penetrable (2014)", "Q2A3", "Q2A4"], ["Q3A1", "Q3A2", "Magic Rainbow (1981)", "Q3A4"], ["Q4A1", "Q4A2", "Homage to the Square (1967)", "Q4A4"], ["Q5A1", "Q5A2", "Q5A3", "Frank Stella"], ["Richard Anuszkiewicz", "Q6A2", "Q6A3", "Q6A4"], ["Q7A1", "AIDS-related complications", "Q7A3", "Q7A4"], ["Q8A1", "Q8A2", "Q8A3", "Bridget Riley"]];
var correctAnswers = ["Zebra (1937)", "Houston Penetrable (2014)", "Magic Rainbow (1981)", "Homage to the Square (1967)", "Frank Stella", "Richard Anuszkiewicz", "AIDS-related complications", "Bridget Riley"];
var imageArray = ["<img class='center-image' src='.//assets/images/victorVasarelyZebra.png'>", "<img class='center-image' src='.//assets/images/jesusRafaelSoto.gif'>", "<img class='center-image' height='400' src='.//assets/images/yaacovAgam.jpg'>", "<img class='center-image' height='400' src='.//assets/images/josefAlbers.jpg'>", "<img class='center-image' height='400' src='.//assets/images/frankStella.jpg'>", "<img class='center-image' height='400' src='.//assets/images/richardAnuszkiewicz.png'>", "<img class='center-image' src='.//assets/images/ernestoBriel.png'>", "<img class='center-image' height='400' src='.//assets/images/bridgetRiley.jpg'>"];

// ------------------- jQuery functions and onclick listeners and events ------------------- //
$(document).ready(function () {
    // function that creates the begin button and beginning screen

    function beginButton() {
        beginButton = "<img class='begin-button' src='.//assets/images/beginText2.svg'>"
        // "<a class='btn btn-lg btn-block begin-button text-left animated zoomInLeft' href='#' role='button'>click me to begin</a>"
        $(".main-area").html(beginButton);
    }
    beginButton();

    // trigger functions by clicking the start button, and generate the HTML i.e. trivia questions
    $("body").on("click", ".begin-button", function (event) {
        event.preventDefault();  // added line to test issue on GitHub Viewer
        clickSound.play();
        generateTrivia();
        timerWrapper();
    });

    // trigger functions by clicking an answer
    $("body").on("click", ".answer", function (event) {
        clickSound.play();
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            // if correct
            clearInterval(theTimer);
            generateWin();
        }
        else {
            // if incorrect
            clearInterval(theTimer);
            generateLoss();
        }
    });

    // trigger functions by clicking reset button
    $("body").on("click", ".reset-button", function (event) {
        clickSound.play();
        resetGame();
    });

});

// ------------------- javascript functions ------------------- //

// create variable named gameHTML with html element holding trivia question, and then display it on HTML
function generateTrivia() {
    gameHTML = "<p class='timer-p animated infinite pulse'>Time Remaining <br><span class='timer'>30</span></p><p class='text-left question'>" + questionArray[questionCounter] + "</p><p class='first-answer answer animated bounceInRight'>" + answerArray[questionCounter][0] + "</p><p class='answer animated bounceInRight'>" + answerArray[questionCounter][1] + "</p><p class='answer animated bounceInRight'>" + answerArray[questionCounter][2] + "</p><p class='answer animated bounceInRight'>" + answerArray[questionCounter][3] + "</p>";
    $(".main-area").html(gameHTML);
}

// create variable with timer function, and then display it on HTML
function timerWrapper() {
    theTimer = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(theTimer);
            timeOutLoss();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

// replace gameHTML with new HTML element cointaining win image. hold screen for 3 seconds
function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-right timer-p animated infinite pulse'>Time Remaining <br><span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".main-area").html(gameHTML);
    setTimeout(wait, 3000);  //  3 second wait
}

// replace gameHTML with new HTML element containing loss image. hold screen for 3 seconds
function generateLoss() {
    incorrectTally++;
    changeBackgroundColorLoss();
    gameHTML = "<p class='text-right timer-p animated infinite pulse'>Time Remaining <br><span class='timer'>" + counter + "</span></p>" + "<p class='text-left'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "<br>" + "But here's Bridget Riley's " + "<i>" + "Uneasy Centre" + "</i>" + ", 1963 [close-up]." + "</p>" + "<img class='center-block animated swing' height='300' src='.//assets/images/opArtfavicon.jpg'>";
    $(".main-area").html(gameHTML);
    setTimeout(wait, 3000); //  3 second wait
}

// replace gameHTML with new HTML element containing time-out image. hold the screen for 3 seconds
function timeOutLoss() {
    timeOutTally++;
    changeBackgroundColorLoss();
    gameHTML = "<p class='text-right timer-p animated infinite pulse'>Time Remaining <br><span class='timer'>" + counter + "</span></p>" + "<p class='text-left'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='left-image' height='300' width='300' src='.//assets/images/Stopwatch.svg'>";
    $(".main-area").html(gameHTML);
    setTimeout(wait, 3000);  //  3 second wait
}

// in between questions, update counters and run functions if there are questions left. if not, run the final screen function
function wait() {
    if (questionCounter < 7) {
        questionCounter++;
        generateTrivia();
        changeBackgroundColorBack();
        counter = 30;
        timerWrapper();
    }
    else {
        finalScreen();
    }
}

// replace gameHTML with new HTML element containing all-done text and reset button
function finalScreen() {
    gameHTML = "<p class='text-right timer-p animated infinite pulse'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Nice work! Here's how you did:" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + timeOutTally + "</p>" + "<a class='btn btn-lg btn-block reset-button text-left animated zoomInLeft' href='#' role='button'>Reset The Quiz!</a>";
    $(".main-area").html(gameHTML);
}

// reset the counters and start over game
function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    timeOutTally = 0;
    counter = 30;
    generateTrivia();
    timerWrapper();
}

// change background when you lose!!!!

function changeBackgroundColorBack() {
    document.body.style.backgroundColor = "#320033";
};

function changeBackgroundColorLoss() {
    document.body.style.backgroundColor = "black";
};

// ------------------- object attempt ------------------- //

// let questions = [{
//     // include things that are unique
//     question: "",
//     choices: ["",],
//     image: "",
//     correctChoice: ""
// }, {
//     question: "",
//     choices: ["",],
//     image: "",
//     correctChoice: ""
// }, {
//     question: "",
//     choices: ["",],
//     image: "",
//     correctChoice: ""
// }, {
//     question: "",
//     choices: ["",],
//     image: "",
//     correctChoice: ""
// }, {
//     question: "",
//     choices: ["",],
//     image: "",
//     correctChoice: ""
// }, {
//     question: "",
//     choices: ["",],
//     image: "",
//     correctChoice: ""
// }, {
//     question: "",
//     choices: ["",],
//     image: "",
//     correctChoice: ""
// }, {
//     question: "",
//     choices: ["",],
//     image: "",
//     correctChoice: ""
// }]