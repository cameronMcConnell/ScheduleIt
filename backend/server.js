// Required libraries and constants.
const mongodb = require('mongodb');
const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const app = express();
const port = 5000;
const url = 'mongodb://127.0.0.1:27017/';

// Database collection used in responses.
let collection;

// CORS headers.
app.use(cors());

// Connect to the database.
const connectToDB = async () => {
    // Create the client and connect.
    const client = new mongodb.MongoClient(url);
    await client.connect();

    // Get database and users collection. 
    const database = client.db('ScheduleIt');
    collection = database.collection('Users');
}

// Connect to database and give values to 
connectToDB();

// Handles login requests.
// Reason codes:
// 1 : Error
// 2 : Account doesn't exist
app.post('/login', parser.json(), async (req, res) => {
    try {
        const result = await collection.findOne(req.body);
        if (result) {
            res.send(JSON.stringify({bool: true, schedule: result.schedule}));
        } else {
            res.send(JSON.stringify({bool: false, reason: 2}));
        }
    } catch (err) {
        res.send(JSON.stringify({bool: false, reason: 1}));
    }
});

// Handles create account requests.
// Reason codes:
// 1 : Error
// 2 : Account exists
app.post('/create', parser.json(), async (req, res) => {
    // Check to see if username exists in database.
    try {
        const result = await collection.findOne({ username: req.body.username });
        if (result) {
            res.send(JSON.stringify({bool: false, reason: 2}));
        }
        else {
            try {
                await collection.insertOne(req.body);
                res.send(JSON.stringify({bool: true}))
            } catch (err) {
                res.send(JSON.stringify({bool: false, reason: 1}));
            }
        }
    } catch (err) {
        res.send(JSON.stringify({bool: false, reason: 1}));
    }
})

// Backend listens and awaits requests.
app.listen(port, () => {
    console.log('Listening on port: ', port)
})