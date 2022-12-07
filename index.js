const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// routes import
const EventRoutes = require("./src/routes/Event-Routes")
const app = express();
const connectDB = require("./src/config/DB");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//connectin database
connectDB();
app.use('/uploads',express.static('images'))

app.use("/api/event",EventRoutes)
app.use("*", (req, res) => {
    res.status(404).send("This route doesnt exist");
  });
  //starting the server on port 8080
  app.listen(8080, () => {
    console.log("listenning on port : 8080");
  });