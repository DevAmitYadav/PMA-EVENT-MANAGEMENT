import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from '../../server/controllers/blogController';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    // Create a new blog post
    await createBlog(req, res);
  } else if (method === 'GET') {
    // If there's an ID in the query string, fetch a single blog
    if (req.query.id) {
      await getBlogById(req, res);
    } else {
      // Otherwise, fetch all blogs
      await getBlogs(req, res);
    }
  } else if (method === 'PUT') {
    // Update a blog post
    await updateBlog(req, res);
  } else if (method === 'DELETE') {
    // Delete a blog post
    await deleteBlog(req, res);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
