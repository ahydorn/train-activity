$(document).ready(function() {
    const config = {
        apiKey: "AIzaSyBH97A38GCiKaACSqWYyDMLpgBfC4RlGcc",
        authDomain: "train-scheduler-31e37.firebaseapp.com",
        databaseURL: "https://train-scheduler-31e37.firebaseio.com",
        projectId: "train-scheduler-31e37",
        storageBucket: "",
        messagingSenderId: "684517368633",
        appId: "1:684517368633:web:729ec1309d883f6e"
    };
    firebase.initializeApp(config);

    // Firebase ref
    const database = firebase.database();

    // Variables
    // Train name
    let name;
    // Train destination
    let destination;
    // Time first train arrives
    let firstTrain;
    // Frequency of train arrival
    let frequency = 0;


    // Add a new train to the current schedule
    $("#new-train").on("click", function() {
        event.preventDefault();
        // Grab div's value and remove empty space
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#first-train").val().trim();
        frequency = $("#frequency").val().trim();

        // Add collected data to appropriate database categories
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset();
    });

    database.ref().on("child_added", function(childSnapshot) {
        let nextArr;
        var minAway;
        // First train time (allows for time before current)
        let firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
        // Difference between first train time and now
        const diffTime = moment().diff(moment(firstTrainNew), "minutes");
        const remainder = diffTime % childSnapshot.val().frequency;
        // Relative mins to next train
        var minAway = childSnapshot.val().frequency - remainder;
        // Absolute next train arrival time
        let nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm a");

        // Add new row w/ new train info via jQuery.
        $("#new-row").append("<tr><td>" + childSnapshot.val().name +
            "</td><td>" + childSnapshot.val().destination +
            "</td><td>" + childSnapshot.val().frequency +
            "</td><td>" + nextTrain +
            "</td><td>" + minAway + "</td></tr>");

        // Error handling
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    // Receive firebase data as snapshot
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        $("#name-div").html(snapshot.val().name);
        $("#email-div").html(snapshot.val().email);
        $("#age-div").html(snapshot.val().age);
        $("#comment-div").html(snapshot.val().comment);
    });
});