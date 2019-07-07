// Firebase personalized API Key 
var firebaseConfig = {
    apiKey: "AIzaSyDZjgv_d-aTty40IltsuaUO-IKA3j8gPMw",
    authDomain: "train-schedule-f0b9f.firebaseapp.com",
    databaseURL: "https://train-schedule-f0b9f.firebaseio.com",
    projectId: "train-schedule-f0b9f",
    storageBucket: "",
    messagingSenderId: "952767288318",
    appId: "1:952767288318:web:071981425a12c80e"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//Create function for allowing user input to the train schedule 
$("#newTrainBtn").on("click", function (event) {
    event.preventDefault();

    //User input
    var trainName = $("#trainName").val().trim();
    var destination = $("#destInput").val().trim();
    var firstTrain = moment($("#firstTrain").val().trim(), "HH:mm A").format("X");
    var frequency = $("#freqInput").val().trim();

    //Var for holding train data
    var newTrain = {
        train: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    };

    // Push train data to the database 
    database.ref().push(newTrain)


    // Clear user input field
    $("#trainName").val("");
    $("#destInput").val("");
    $("#firstTrain").val("");
    $("#freqInput").val("");
});



// Create event so that user input pushes to the HTML to create a new line 
database.ref().on("child_added", function (childSnapshot) {
  
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    // Make the time come out in proper military format in table once user hits "submit"
    var firstTrainTime = moment.unix(firstTrain).format("HH:mm A");

    var tFrequency = frequency;

    var firstTime = 0;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm A").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

    // Format next train time to miliary time and indicate am or pm
    var catchTrain = moment(nextTrain).format("hh:mm A");

    // Create new row on train schedule after user input 
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(catchTrain),
        $("<td>").text(tMinutesTillTrain),
    );

    // Append new row to table 
    $("#trainTable > tbody").append(newRow);


});
