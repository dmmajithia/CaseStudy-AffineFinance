var express = require("express");
var app = express();
var port = 8080;
 
app.use("/", (req, res) => {
 res.sendFile(__dirname + "/index.html");
});

app.get("/name", (req, res) => {
 var name = req.query.name;
 var mongoose = require("mongoose");
 mongoose.Promise = global.Promise;
 mongoose.connect("mongodb://dhawal:vd1vd2vd3@localhost:27017/case_study");
 
});
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});
