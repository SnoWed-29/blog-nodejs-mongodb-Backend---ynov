const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authenticateToken = require('../middlewares/auth');

router.get('/search', blogController.searchBlogsByTitle);
router.get('/user/posts', authenticateToken, blogController.getBlogsByUser);
router.get('/', blogController.getAllBlogs);
router.post('/', authenticateToken, blogController.createBlog);
router.get('/:id', blogController.getBlogById);
router.put('/:id', authenticateToken, blogController.updateBlog);
router.delete('/:id', authenticateToken, blogController.deleteBlog);

module.exports = router;