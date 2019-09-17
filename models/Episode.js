const mongoose = require("mongoose");

const EpisodeSchema = new mongoose.Schema({
  episodenumber: {
    type: Number,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true,
    unique: true
  },
  cover: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  shortcontent: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("episode", EpisodeSchema);
