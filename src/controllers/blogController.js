const Blog = require('../models/blog.model');
const User = require('../models/user.model');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('user');
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      user: user._id, // Store the user's ObjectId
    });

    const newBlog = await blog.save();
    user.blogs.push(newBlog);
    await user.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id).populate('user');
      if (blog) {
        res.status(200).json(blog);
      } else {
        res.status(404).json({ message: 'Blog not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Get blogs by user
exports.getBlogsByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const blogs = await Blog.find({ user: userId }).populate('user');
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      const user = await User.findOne({ username: req.user.username });
      if (blog.user.toString() !== user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to update this blog' });
      }
      blog.title = req.body.title;
      blog.content = req.body.content;
      const updatedBlog = await blog.save();
      res.status(200).json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      const user = await User.findOne({ username: req.user.username });
      if (blog.user.toString() !== user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this blog' });
      }
      await Blog.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Blog deleted' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

// Search blogs by title
exports.searchBlogsByTitle = async (req, res) => {
  try {
    const title = req.query.title;
    if (!title) {
      return res.status(400).json({ message: 'Title query parameter is required' });
    }
    const blogs = await Blog.find({ title: { $regex: title, $options: 'i' } }).populate('user');
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};