var animationStarted = false;
var plottedPlanData = false;

/* We could also have used auth.onStateChanged, but that doesn't get called in disconnections
*/

checkConnectionEvery2Seconds();

function checkConnectionEvery2Seconds() {
    setTimeout(function () {
        checkConnectionEvery2Seconds();
    }, 1000);

    if (canvas) {
        canvas.width = window.outerWidth - 100;

        var connectedRef = database.ref(".info/connected");
        connectedRef.on("value", function (snap) {
            if (snap.val()) {
                animationStarted = false;
                canvas.elt.hidden = true;
                if (!plottedPlanData) {
                    getMyPlans();
                    plottedPlanData = true;
                }
                if (!auth.currentUser) location.href = "https://peeyush0106.github.io/Silicon-Valley-Challenge/index.html";
            }
            else if (!animationStarted && !snap.val()) {
                setContinuousLoadingAnim();
                animationStarted = true;
                canvas.elt.hidden = false;
            }
        });
    }
}

function getMyPlans() {
    if (auth.currentUser) {
        database.ref("Users/" + auth.currentUser.uid + "/Plans").get().then((data) => {
            if (data.exists()) {
                plotMyPlans(data);
            }
            else location.href = "https://peeyush0106.github.io/Silicon-Valley-Challenge/index.html";
        });
    }
}

function plotMyPlans(data) {
    var allPlans = data.val();
    for (const u in allPlans) {
        const planData = allPlans[u].planData;
        createPlanTable();
        tableMade = true;
        for (const v in planData) {
            const subjectData = planData[v];
            console.log(subjectData);
            plotPlanData(subjectData);
        }
    }
}

function setContinuousLoadingAnim() {
    setTimeout(function () {
        if (animationStarted) {
            showLoadingAnim();
            setContinuousLoadingAnim();
        }
    }, 30);
}