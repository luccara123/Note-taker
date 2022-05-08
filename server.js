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

// Data from the notes in json
app.get("/api/notes", (req, res) => {
    res.json(notesData)
})

// Html routes
app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"))
});

app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"))
});

const addNotes = function(request, notesUser){
    const jsonFile = path.join(__dirname, "/Develop/db/db.json");
    const postNote = request;
    request.id = notesUser[0];
    notesUser[0]++;
    notesUser.push(postNote);

    fs.writeFile( jsonFile, JSON.stringify(notesUser), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Your note has been successfully saved!");
    });
    return postNote;

};

// Post the data from addNotes
app.post("/api/notes", (req, res) => {
    const saveNotes = addNotes(req.body, notesData)
    res.json(saveNotes)
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});