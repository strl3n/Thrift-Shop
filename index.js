const express = require("express");
const dotenv = require("dotenv");
const app = express();

//Set up Global Configuration access
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==================================

const userRouter = require("./src/routes/user.route")
const itemRouter = require("./src/routes/item.route")




app.use("api/user", userRouter);
app.use("/api/item", itemRouter);


// ==================================

const port  = process.env.PORT || 8080;
app.listen(port, function(){
    console.log(`Listening on port ${port}`);
});