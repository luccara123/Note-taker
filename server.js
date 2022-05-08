const express = require("express");
const fs = require("fs");
const path =  require("path")
const notesData = require("./Develop/db/db.json")
const app = express();
// Port for heroku
const PORT = process.env.PORT || 3001;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
app.get("/api/notes", (req, res) => {
    res.send('Test');
});

// Html routes
app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"))
});

app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"))
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});