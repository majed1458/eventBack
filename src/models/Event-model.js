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
    default:"https://imgs.search.brave.com/XyOzjX46zOb51_FArnB2f9Xu03y6ql3eqVQGaIUM0F0/rs:fit:1024:1024:1/g:ce/aHR0cHM6Ly93d3cu/YWxsaWFuY2VwbGFz/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/L25vLWltYWdlLTEw/MjR4MTAyNC5wbmc"
  }
})
const Admin = mongoose.model("Event", EventSchema);
module.exports = Admin;