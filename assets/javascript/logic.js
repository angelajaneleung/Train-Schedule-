 
// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDZjgv_d-aTty40IltsuaUO-IKA3j8gPMw",
    authDomain: "train-schedule-f0b9f.firebaseapp.com",
    databaseURL: "https://train-schedule-f0b9f.firebaseio.com",
    projectId: "train-schedule-f0b9f",
    storageBucket: "",
    messagingSenderId: "952767288318",
    appId: "1:952767288318:web:071981425a12c80e"
  };
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  // values
  var trainName = "";
  var destination = "";
  var frequency = 0;
  // var firstTrainTime = "";
  var minutesAway = "";
  var trainArrival = "";







$("##newTrainBtnn").on("click", function(event) {
	event.preventDefault();


	

	    trainName = $("#trainName").val();
     destination = $("#destInput").val().trim();
     firstTrainTime = $("#firstTrain").val().trim(); 
     frequency = $("#freqInput").val().trim();



     console.log(firstTrainTime)

       // momentJS();


var tFrequency = frequency;

        console.log(tFrequency)


    // Time is 3:30 AM
    // var firstTime = "03:00";

    var firstTime = firstTrainTime;

    console.log(firstTime)

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

    console.log(firstTimeConverted);222

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

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
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var trainArrival = moment(nextTrain).format("hh:mm");


    // database.ref().push({ 
    //   trainArrival: trainArrival

    // })

    console.log(trainArrival);

      




	database.ref().push({
		trainName: trainName,
		destination: destination,
		frequency: frequency, 
    trainArrival: trainArrival,
		firstTrainTime: firstTrainTime,
    tMinutesTillTrain: tMinutesTillTrain,
		dateAdded: firebase.database.ServerValue.TIMESTAMP	
	});






});

// function addDatabaseInfo () {


database.ref().on("child_added", function(childSnapshot) {

	console.log(childSnapshot.val().trainName);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().firstTrainTime);
  console.log(childSnapshot.val().trainArrival);
  // console.log(childSnapshot.val().minutesAway);
	console.log(childSnapshot.val().dateAdded);



	var childSnapshotVal = childSnapshot.val();


	  $("#trainTable").append("<tr><td> " + childSnapshotVal.trainName + 
	  	" </td><td class='destination'> " + childSnapshotVal.destination + 
	  	" </td><td class='frequency'> " + childSnapshotVal.frequency +
	  	" </td><td class='trainArrival'> " + childSnapshotVal.trainArrival +
      " </td><td class='tMinutesTillTrain'> " + childSnapshotVal.tMinutesTillTrain +
	  	" </td></tr>");


})




database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

var sv = snapshot.val();

	  // console.log(sv.name);
   //    console.log(sv.destination);
   //    console.log(sv.frequency);
   //    console.log(sv.firstTrainTime);


$("#trainName").text(snapshot.val().trainName);
$("#destInput").text(snapshot.val().destination)
$("#freqInput").text(snapshot.val().frequency)
$("#firstTrain").text(snapshot.val().firstTrainTime)


});