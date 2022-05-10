var path = require('path');
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


app.use(express.static('dist'))
//app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Setup Server
app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
})


let projectData={};
let data1=[0];
let data2=[1];
let data3=[2];


app.post('/picture', push1);

function push1(req,res) {

    console.log("picture received");
    projectData.data1=req.body;

}


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/weather', push);

function push(req,res) {
    console.log("weather received");
    projectData.data2=req.body;

}

app.post('/location', push2);

function push2(req,res) {
    console.log("location received");
    projectData.data3=req.body;

}


app.get('/all', function(req,res){


    console.log("data is sending")
    console.log(projectData);
    res.send(projectData);

})




