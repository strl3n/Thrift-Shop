const express = require("express");
const dotenv = require("dotenv");
const app = express();

//Set up Global Configuration access
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==================================




// ==================================

const port  = process.env.PORT || 8080;
app.listen(port, function(){
    console.log(`Listening on port ${port}`);
});