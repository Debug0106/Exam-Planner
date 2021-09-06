var animationStarted = false;
var login = false;
var welcomeDisplayed = false;

function validateEmail(email) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return (email.match(validRegex))
}

/* We could also have used auth.onStateChanged, but that doesn't get called in disconnections
*/
checkConnectionEvery2Seconds();
function checkConnectionEvery2Seconds() {

    setTimeout(function () {
        if (canvas) canvas.width = window.outerWidth - 100;

        var connectedRef = database.ref(".info/connected");
        connectedRef.on("value", function (snap) {
            if (snap.val()) {
                if (!auth.currentUser) location.href = "https://peeyush0106.github.io/Silicon-Valley-Challenge/index.html";
                animationStarted = false;
                canvas.elt.hidden = true;
                if (!welcomeDisplayed) showWelcome(); welcomeDisplayed = true;
            }
            else if (!animationStarted && !snap.val()) {
                setContinuousLoadingAnim();
                animationStarted = true;
                canvas.elt.hidden = false;
            }
        });
        checkConnectionEvery2Seconds();
    }, 1000);
}

function setContinuousLoadingAnim() {
    setTimeout(function () {
        if (animationStarted) {
            showLoadingAnim();
            setContinuousLoadingAnim();
        }
    }, 30);
}

function loginUser() {
    login = true;

    document.getElementById("initial-form").hidden = false;
    document.getElementById("start-form-your-name").style.display = "none";

    // Hiding the Login and Sign up button
    document.getElementById("login").style.display = "none";
    document.getElementById("login").hidden = true;
    document.getElementById("signup").style.display = "none";
    document.getElementById("signup").hidden = true;
}

function signupUser() {
    login = false;

    document.getElementById("initial-form").hidden = false;
    document.getElementById("start-form-your-name").style.display = "flex";

    // Hiding the Login and Sign up button
    document.getElementById("login").style.display = "none";
    document.getElementById("login").hidden = true;
    document.getElementById("signup").style.display = "none";
    document.getElementById("signup").hidden = true;
}

function cancelLoginOrSignup() {
    login = false;

    document.getElementById("initial-form").hidden = true;
    document.getElementById("start-form-your-name").style.display = "none";

    // Showing the Login and Sign up button
    document.getElementById("login").style.display = "block";
    document.getElementById("login").hidden = true;
    document.getElementById("signup").style.display = "block";
    document.getElementById("signup").hidden = true;
}