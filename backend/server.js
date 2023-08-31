// Required libraries and constants.
const MongoClient = requre('mongodb');
const express = require('express');
const app = express();
const port = 3000;
const url = 'mongodb+srv://cameronmcconne:<password>@scheduleit.xjdr7my.mongodb.net/?retryWrites=true&w=majority';

// Will be used in requests from frontend.
let collection;

// Connect to the database.
async function connectToDB() {

    // Create the client and connect.
    const client = new MongoClient(url);
    await client.connect();

    // Get database and users collection. 
    const database = client.db('ScheduleIt');
    collection = database.collection('Users');
}

// Connect to database and give values to 
connectToDB();

// Handles login requests.
app.get('/login', (req, res) => {
    
});

// Handles create account requests.
app.get('/create', (req, res) => {

})

// Backend listens and awaits requests.
app.listen(port, () => {
    console.log('Listening on port: ', port)
})