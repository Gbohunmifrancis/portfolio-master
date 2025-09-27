import { connectDB, BlogPost } from '../db.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  await connectDB();

  const { id } = req.query;

  try {
    if (req.method === 'PUT') {
      const post = await BlogPost.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } else if (req.method === 'DELETE') {
      const post = await BlogPost.findByIdAndDelete(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}