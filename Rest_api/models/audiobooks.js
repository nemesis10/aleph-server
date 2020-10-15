const mongoose = require("mongoose");

const audiobookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  audio: {
    type: String,
    required: true
  },
  srtfile: {
    type: String
  }

});

module.exports = mongoose.model("Audiobook", audiobookSchema);
