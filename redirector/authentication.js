var animationStarted = false;

/* We could also have used auth.onStateChanged, but that doesn't get called in disconnections
*/

checkConnectionEvery2Seconds();

function checkConnectionEvery2Seconds() {
    setTimeout(function () {
        checkConnectionEvery2Seconds();
    }, 1000);

    var connectedRef = database.ref(".info/connected");
    connectedRef.on("value", function (snap) {
        console.log(snap);
        if (snap.val()) {
            if (auth.currentUser) location.href = "https://peeyush0106.github.io/Silicon-Valley-Challengesigned-in/index.html";
            else location.href = "https://peeyush0106.github.io/Silicon-Valley-Challenge/signin/index.html";
        }
    });
}