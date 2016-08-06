/*******************************************************************
*  Magic-8-Ball Game written by Tariq Khan for Ashland JavaScript  *
*  Meetup Code Challenge 2 on 8/4/16. Game uses jQuery and the     *
*  GreenSock Animation Platform (GSAP)                             *
*  code repo at https://github.com/digitalgnome/magic-8-ball       *
********************************************************************/

// game's javascript code isn't called till after DOM elements are loaded
$(function() {
    var answers = ["Yes", "No", "Maybe"],  // initialize answers array
        returnVal = "",
        previousVal = "";

    // set initial focus on #questionText for quick text entry
    $("#questionText").focus();

    // generates random answer from the answers array
    function answer() {
        var randomNum = Math.round(Math.random() * 2);
        return answers[randomNum];
    }

    // main function to generate a return answer to the eight ball
    function returnAnswer() {
        var elem;

        // call to get a random answer
        returnVal = answer();

        // make sure that previous answer isn't repeated
        if (previousVal === returnVal) {
            returnAnswer();
        } else if (previousVal !== returnVal) {
            previousVal = returnVal;
            elem = $("#answerText").html(returnVal);
            TweenMax.to(elem, 4, {opacity: 1});
        }
    }

    // use jQuery selectors to connect to and to get DOM elements
    $("#submitBtn").submit(function(event){
        // get the string value in #questionText
        var strLen = $("#questionText").val();

        // prevent default event from button submit action
        event.preventDefault();

        // using greensock JS TweenMax to reset the opacity of the #answerText to 0 instantly
        TweenMax.to("#answerText", 0, {opacity:0});

        // minor form validation to check for a minimum string length of 3
        if (strLen.length < 3) {
            // set #questionText to empty string
            $("#questionText").val('');
            // change placeholder string
            $("#questionText").attr("placeholder", "No question was asked");
        } else {
            // the fromTo method moves the ball sideways with a RoughEase affect, then x value is reset
            TweenMax.fromTo("#magic-8", 2, {x:-1}, {x:5, ease:RoughEase.ease.config({strength:8, points:20, template:Linear.easeNone, randomize:false}) , clearProps:"x"});
            // set #questionText to empty string
            $("#questionText").val("");
            // call to main game function
            returnAnswer();
            // reset placeholder string
            $("#questionText").attr("placeholder", "What's your question?");
        }
        // return focus to #questionText
        $("#questionText").focus();
    });
});
