function setGrade() {
    document.getElementById("set").addEventListener('click', function () {
        firebase.auth().onAuthStateChanged(function (user) {
            var score = parseInt(document.getElementById("c1100j1g").value);
            console.log("Setting grade...")
            db.collection("grades").doc(user.uid)
                .update({
                    "c1100j1": score
                })
                .then(function () {
                    console.log("Grade set")
                    keepGrade()
                })
        })
    })
}

function keepGrade() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("grades")
            .doc(user.uid)
            .get()
            .then(function (doc) {
                var getScore = doc.data().c1100j1;
                var getTotal = doc.data().c1100j1s;
                var percent = ((getScore / getTotal) * 100) + "%";
                if (getScore != null) {
                    document.getElementById("c1100j1p").innerHTML = "Journal 1<button type='button' id='change' class='btn btn-outline-primary right'>Change</button><span class='score'>" + percent +"</span><span class='score'>" + getScore + "/" + getTotal + "</span>"
                }
                if ($("#change") != null) {
                    function changeGrade() {
                        document.getElementById("change").addEventListener('click', function () {
                            if (confirm("Are you sure you want to change the grade for this assessment? Doing so will overwrite the grade you entered previously. Press OK to change the grade.")) {
                                document.getElementById("c1100j1p").innerHTML = "Journal 1<button type='button' id='set' class='btn btn-outline-primary right'>Set</button><span class='score'> /" + getTotal + "</span><input id='c1100j1g' type='text'></input>"
                                setGrade()
                            }
                        })
                    }
                    changeGrade()
                }
            })
    })
}
