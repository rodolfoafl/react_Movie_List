const mongoose = require("mongoose");

const ListSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  movies: [],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("list", ListSchema);
