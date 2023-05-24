const mongoose = require('mongoose');

// Define the schema for the blog post
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  intro:{
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  datePublished: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  metaData: {
    type: mongoose.Schema.Types.Mixed
  }
});

// Create the model for the blog post
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
