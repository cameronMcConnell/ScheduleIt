// Required libraries and constants.
const mongodb = require('mongodb');
const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const app = express();
const port = 5000;
const url = 'mongodb+srv://cameronmcconne:<password>@scheduleit.xjdr7my.mongodb.net/?retryWrites=true&w=majority';

// CORS headers.
app.use(cors());

// Connect to the database.
const connectToDB = async () => {

    // Create the client and connect.
    const client = new mongodb.MongoClient(url);
    await client.connect();

    // Get database and users collection. 
    const database = client.db('ScheduleIt');
    var collection = database.collection('Users');
}

// Connect to database and give values to 
connectToDB();

// Handles login requests.
app.get('/login', (req, res) => {
    
});

// Handles create account requests.
app.post('/create', parser.json(), (req, res) => {
    console.log(req.body);
    res.send(JSON.stringify({bool: true}))
})

// Backend listens and awaits requests.
app.listen(port, () => {
    console.log('Listening on port: ', port)
})