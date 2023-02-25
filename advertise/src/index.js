const express = require("express");

const app = express();
const mongodb = require('mongodb')



if (!process.env.DBHOST) {
    throw new Error("Please specify the databse host using environment variable DBHOST.");
}

if (!process.env.DBNAME) {
    throw new Error("Please specify the name of the database using environment variable DBNAME");
}



const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;

let advertise = connectDb()

function connectDb() {
    return mongodb.MongoClient.connect(DBHOST) 
        .then(client => {
            return client.db(DBNAME);
        });
}


app.get("/advertise", (req, res) => {
    const ad = advertise.collection('advertise')
    const randomIndex = Math.floor(Math.random() * ads.length);
    ad.find().toArray().then(((ad) => {
        res.json(ad[randomIndex]);
    }))
});

const port = process.env.PORT && parseInt(process.env.PORT) || 3000;

app.listen(port, () => {
    console.log(`Ad server running on port ${port}.`);
});