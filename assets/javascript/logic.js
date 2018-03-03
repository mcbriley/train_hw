var config = {
    apiKey: "AIzaSyDH703PUgGm7kySdDdWkgMJgDm1nQb_g84",
    authDomain: "trains-85b76.firebaseapp.com",
    databaseURL: "https://trains-85b76.firebaseio.com",
    projectId: "trains-85b76",
    storageBucket: "trains-85b76.appspot.com",
    messagingSenderId: "733848316103"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function () {

    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var dest = $("#destination-input").val().trim();
    var freq = $("#frequency-input").val().trim();
    var depart = $("#departure-input").val().trim();

    var train = {
        name: trainName,
        dest: dest,
        freq: freq,
        depart: depart
    };

    database.ref().push(train);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#departure-input").val("");
});

database.ref().on("child_added", function (snapshot) {

    var response = snapshot.val();

    var trainName = response.name;
    var dest = response.dest;
    var freq = response.freq;
    var depart = response.depart;

    console.log(depart, "departure");
    var departConverted = moment(depart, "hh:mm");
    var difference = moment().diff(departConverted, "minutes");
    console.log(difference, "diff");
    var minAway = freq - (difference % freq);
    console.log(minAway, "minAway");
    var arrival = moment().add(minAway, 'minutes').format("hh:mm");
    console.log(arrival, "arrival");

    newRow = $("<tr>");

    trainDiv = $("<td>");
    destDiv = $("<td>");
    freqDiv = $("<td>");
    arrivalDiv = $("<td>");
    minAwayDiv = $("<td>");
    trainDiv.addClass("train-name");
    destDiv.addClass("destination");
    freqDiv.addClass("frequency");
    arrivalDiv.addClass("arrival");
    minAwayDiv.addClass("minutes-away");

    trainDiv.append(trainName);
    destDiv.append(dest);
    freqDiv.append(freq);
    arrivalDiv.append(arrival);
    minAwayDiv.append(minAway);

    newRow.append(trainDiv,destDiv,freqDiv,arrivalDiv,minAwayDiv);

    $("#train-display").append(newRow);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});