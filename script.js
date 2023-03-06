$(document).ready(function () {
    var score = 0;
    var timer = 30;
    var timerId;
    var moleTimeoutId;

function showGame() {
    var playerName = $("#player-name").val();
    $("#player-name-display").text(playerName);
    $("#name-form").hide();
    $("#welcome-message").text("Bienvenue, " + playerName + " !");
    $("#welcome-message").show();
    $("#start-button").show();
    $("#showme").css("visibility", "visible");
}

    // Function to start the game
    function startGame() {
        score = 0;
        timer = 30;
        $("#score").text(score);
        $("#timer").text(timer);
        startTimer();
        showMole();
    }

    // Function to start the timer
    function startTimer() {
        timerId = setInterval(function () {
            timer--;
            $("#timer").text(timer);
            if (timer <= 0) {
                clearInterval(timerId);
                endGame();
            }
        }, 1000);
    }

    // Function to show the mole
    function showMole() {
        $(".hole").removeClass("active");
        var randomHole = Math.floor(Math.random() * 9);
        $(".hole").eq(randomHole).addClass("active");

        // Set timeout to hide mole if not clicked after 5 seconds
        moleTimeoutId = setTimeout(function () {
            $(".hole.active").removeClass("active");
            showMole();
        }, 1000);
    }

    // Function to handle a mole click
    function moleClick() {
        if ($(this).hasClass("active")) {
            score++;
            $("#score").text(score);
            $(this).removeClass("active");

            // Clear timeout for hiding mole
            clearTimeout(moleTimeoutId);

            showMole();
        }
    }

    // Function to show the start button and welcome message
    function showStartButton() {
        var playerName = $("#player-name").val();
        $("#player-name-display").text(playerName);
        $("#name-form").hide();
        $("#welcome-message").show();
        $("#start-button").show();
    }

    // Function to end the game
    function endGame() {
        clearInterval(timerId);
        clearTimeout(moleTimeoutId);
        $(".hole").removeClass("active");
        alert("Time's up! Your score is " + score + ".");
    }

    // Attach event listeners
    $("#player-form").submit(function (event) {
        event.preventDefault();
        // showStartButton();
        showGame();
    });
    $("#start-button").click(startGame);
    $(".hole").click(moleClick);

});
