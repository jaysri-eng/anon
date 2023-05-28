const { Schema, default: mongoose } = require('mongoose');

const nameSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    /*posts: [{
      type: String,
      ref: "posts"
    }]*/
  })
  
  
  
  const postSchema = new mongoose.Schema({
    _id: Number,
    post: String,
    likes: {type: Number,default: 0},
    name: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "names"
    }]
  })

const User = new mongoose.model('User', nameSchema);
const Post = new mongoose.model('Post', postSchema);

 module.exports = {nameSchema, postSchema, User,Post}