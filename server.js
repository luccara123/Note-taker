
const express = require("express");
const fs = require("fs");

const app = express();
// Port for heroku
const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });