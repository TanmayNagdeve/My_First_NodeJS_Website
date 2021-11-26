const express = require("express"); // Importing express module
const { fstat } = require("fs");
const path = require("path");
const fs = require("fs");
const app = express(); // Initializing the app
const port = 80;
const bodyparser = require("body-parser"); // It's a middleware

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/gymMembers');
}

//Defining Mongoose Schema
const contactSchema = new mongoose.Schema({
    Name: String,
    age: String,
    gender: String,
    address: String,
    phone: Number
  });

  //Model (Compiling the schema into a Model)
  const Contact = mongoose.model('Contact', contactSchema);

// For Serving static files
app.use('/static', express.static('static'))

app.use(express.urlencoded()) // To bring the form data to Express // Middleware

//set the template engine as pug
app.set('view engine', 'pug')

// set the views directory
app.set('views', path.join(__dirname, 'views'))

// // Our Pug Demo EndPoint
// app.get('/demo', function (req, res) {
//     res.status(200).render('demo', { title: 'Hey', message: 'Hello there!' })
//   })

// app.get("/", (req, res)=>{
//     res.status(200).send("This is homepage of my first express");
// });

// app.get("/about",(req, res)=>{
//     res.status(200).send("This is the about page of my first express app");
// });
  
// app.post("/about", (req, res)=>{
//     res.send("This is the Post request about page of my first express app");
// });

// app.get("/this", (req, res)=>{
//     res.status(404).send("Page Not Found");
// });


// ENDPOINTS
app.get('/', (req, res) => {
    const con = "This is the variable con";
    const param = {
        "title": "Pug is what I'm learning",
        "content": con,
        "status" : "Alright"
    }
    res.status(200).render('index.pug', param)
})

app.post('/', (req, res) => {
    // Name = req.body.Name
    // age = req.body.age
    // gender = req.body.gender
    // address = req.body.address
    // phone = req.body.phone
    // let outputToWrite = `the name of the client is ${Name}, ${age} years old, ${gender}, residing at ${address}. Contact No : ${phone} `

    // fs.writeFileSync('output.txt', outputToWrite )
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the Database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the Database")
    });

    const params = {
        'message': 'Your form has been submitted successfully'
    }
    // res.status(200).render('index.pug', params)
})


//
//Port (whatever we've chosen) has to be listened, for the request to be responded
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})