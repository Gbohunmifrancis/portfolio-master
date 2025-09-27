import { connectDB, BlogPost } from './db.js';

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

  try {
    if (req.method === 'GET') {
      const { category, search, page = 1, limit = 10 } = req.query;
      let query = { published: true };

      // Add category filter
      if (category && category !== 'All') {
        query.category = category;
      }

      // Add search filter
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ];
      }

      const posts = await BlogPost.find(query)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await BlogPost.countDocuments(query);

      res.json({
        posts,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      });
    } else if (req.method === 'POST') {
      // Generate slug from title if not provided
      if (!req.body.slug) {
        req.body.slug = req.body.title
          .toLowerCase()
          .replace(/[^\w ]+/g, '')
          .replace(/ +/g, '-');
      }

      // Calculate read time if not provided
      if (!req.body.readTime) {
        const wordCount = req.body.content.replace(/<[^>]*>/g, '').split(' ').length;
        req.body.readTime = Math.max(1, Math.ceil(wordCount / 200));
      }

      const post = new BlogPost(req.body);
      await post.save();
      res.status(201).json(post);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'A post with this slug already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}