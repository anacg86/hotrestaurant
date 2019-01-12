var express = require("express");
var path = require("path");
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [
  
];

var waitlist = [
    
]

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "make_reservation.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all reservations
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});

// Displays all reservations in the waitlist
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

app.post("/api/reservations", function(req, res) {
  if (reservations.length < 5) {
    reservations.push(req.body);
  }
  else {
    waitlist.push(req.body);
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
