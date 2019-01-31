var express = require("express");
var app = express();
var port = 8080;
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 
app.use(express.static('public'));

app.get("/", (req, res) => {
 res.sendFile(__dirname + "/index.html");
});

app.post("/clicked", (req, res) => {
 var name = req.body.name.toUpperCase();
 var mongoClient = require("mongodb").MongoClient;
 var server = "mongodb://dhawal:vd1vd2vd3@localhost:27017";
 mongoClient.connect(server, { useNewUrlParser: true }, function(error, db){
  if(error)
   console.log(error);
  else
   var physicians = db.db("case_study").collection("physicians");
   var query = {name: new RegExp('^.*' + name + '.*$')};
   physicians.find(query).toArray(function(error, documents){
    if(error)
        console.log("Error: ", error);
    else
    {
        var data = [];
        documents.forEach(function(doc){
         data.push({name:doc.name, address:doc.address});   
         console.log(doc);
        });
        console.log("responding");
        //res.json(data);
        res.setHeader('Content-Type', 'application/json')
        //res.json({message: 'Welcome to the project-name api'});
        //res.send("hi11111");
        res.json(data);
    }   
    db.close();
  });
 });
});
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});
