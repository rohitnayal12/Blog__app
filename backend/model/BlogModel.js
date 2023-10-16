const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    username: { type: String },
    title: { type: String },
    content: { type: String },
    category: { type: String },
    date: { type:String },
    likes: { type: Number },
    comments: [{ username: String, content: String }],
  },
  {
    versionkey: false,
  }
);

const blogModel = mongoose.model("blog", blogSchema);

module.exports = blogModel;
