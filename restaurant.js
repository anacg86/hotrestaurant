var express = require("express");
var path = require("path");
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [];

var waitlist = [];
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservations", function (req, res) {
  res.sendFile(path.join(__dirname, "make_reservation.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});
// Displays all reservations
app.get("/api/reservations", function (req, res) {
  return res.json(reservations);
});

// Displays all reservations in the waitlist
app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});

// Create New Reservation - takes in JSON input
app.post("/api/tables", function (req, res) {
  var newreservation = req.body;
  if (reservations.length > 4) {
    newreservation.routeName = newreservation.uniqueID.replace(/\s+/g, "").toLowerCase();
    console.log(newreservation);
    waitlist.push(newreservation);
  }
  else {
    newreservation.routeName = newreservation.uniqueID.replace(/\s+/g, "").toLowerCase();
    console.log(newreservation);
    reservations.push(newreservation);
  }
  //manda en formato jason
   res.json(newreservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

