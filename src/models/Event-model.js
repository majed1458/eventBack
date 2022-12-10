const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: null,
    required:true,
  },
  Address: {
    type: String,
    required: true,
  },
  Image :{
    type: String,
    required: true,
    default:"No_Image_Available.jpg"
  }
})
const Admin = mongoose.model("Event", EventSchema);
module.exports = Admin;