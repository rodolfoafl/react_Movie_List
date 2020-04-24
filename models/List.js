const mongoose = require("mongoose");

const ListSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  movies: [
    {
      name: {
        type: String,
        // required: true,
      },
      image: {
        type: String,
        // required: true,
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("list", ListSchema);
