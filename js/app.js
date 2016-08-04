$(function() {
    var answers = ["Yes", "No", "Maybe"],
        returnVal = "",
        previousVal = "";

    function answer() {
        var randomNum = Math.round(Math.random() * 2);
        return answers[randomNum];
    }

    function returnAnswer() {
        var elem;

        returnVal = answer();

        if (previousVal === returnVal) {
            returnAnswer();
        } else if (previousVal !== returnVal) {
            previousVal = returnVal;
            elem = $("#answerText").html(returnVal);
            TweenMax.to(elem, 6, {opacity: 1});
        }
    }

    $("#submitBtn").submit(function(event){
        var strLen = $("#questionText").val();

        TweenMax.to("#answerText", 0, {opacity:0});

        if (strLen === "" || strLen.length < 3) {
            event.preventDefault();
            $("#questionText").val('');
            $("#questionText").attr("placeholder", "No question was asked");
        } else {
            event.preventDefault();
            TweenMax.fromTo("#magic-8", 2, {x:-1}, {x:5, ease:RoughEase.ease.config({strength:8, points:20, template:Linear.easeNone, randomize:false}) , clearProps:"x"});
            $("#questionText").val("");
            returnAnswer();
            $("#questionText").attr("placeholder", "What's your question?");
        }
    });
});
