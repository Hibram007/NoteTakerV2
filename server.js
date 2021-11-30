const { notStrictEqual } = require('assert');
const express = require('express');
const fs = require("fs");
const path = require('path')


// initialize an express application
const app = express();

// middleware
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes

// setting up API routes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data))
    })
})

app.post('/api/notes', (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const dbData = JSON.parse(data); // --> turn it into an array

        // add an id to the req.body
        req.body.id = dbData.length + 1;

        // add the req.body to the array
        dbData.push(req.body);

        fs.writeFile('./db/db.json', JSON.stringify(dbData), (err) => {
            res.send('Note has been added!')
        })
    })
})

// How to create the DELETE REQUESTS  - (For Bonus Points) 

app.delete("/api/notes/:id", (req, res) => {
             fs.readFile('./db/db.json', 'utf8', (err, data) => {
                 const dbData = JSON.parse(data); 

                const filteredNotes = dbData.filter(function(note) {
                    return note.id != req.params.id;
           })
       
             fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err) => {
                      res.send('Note has been added!')
                 })
            })
        
});


    // setting up HTML routes
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, './public/notes.html'));
    })

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'));
    })




    app.listen(process.env.PORT || 3001, () => {
        console.log('App is now listening to PORT 3001!')
    })


/*

    FRONT END           ----->    BACK END
    requests data or file        gives or responds data or files

    browser
    www.facebook.com/    ---->    "/" will return the homepage
    www.facebook.com/login  -->   "/login" will return the login page


*/