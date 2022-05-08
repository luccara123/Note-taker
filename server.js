const express = require("express");
const fs = require("fs");
const path =  require("path")
const notesData = require("./Develop/db/db.json")
const app = express();
// Port for heroku
const PORT = process.env.PORT || 3001;
app.use(express.static('Develop/public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const jsonFile = path.join(__dirname, "./Develop/db/db.json");


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

// Add notes function
const addNotes = function(request, notesUser){
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
    const postNote = addNotes(req.body, notesData)
    res.json(postNote)
});

//Delete a note
app.delete("/api/notes/:id",(req, res) => {
    for (let i = 0; i < notesData.length; i++) {

        if (notesData[i].id == req.params.id) {
            notesData.splice(i, 1);
            break;
        }
    }
    fs.writeFile(jsonFile, JSON.stringify(notesData), function (err) {
        if (err) {
            return console.log(err);
        } else {
            console.log("Your note has been successfully deleted!");
        }
    });
    res.json(notesData);
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});