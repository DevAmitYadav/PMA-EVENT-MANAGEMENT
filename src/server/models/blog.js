import mongoose from 'mongoose';

// Define the blog schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
  },                                                                    
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Blog model
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
