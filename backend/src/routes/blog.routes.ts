// src/routes/blog-post.routes.ts

import express from 'express';
import { createBlogPost, getBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost } from '../controllers/blog-post.controller';
import { authenticateJWT } from '../middleware/auth.middleware';
import upload from '../middleware/multer.middleware';

const router = express.Router();

router.post('/', authenticateJWT, upload.single('blogImage'), createBlogPost);
router.get('/', getBlogPosts);
router.get('/:id', getBlogPostById);
router.put('/:id', authenticateJWT, upload.single('blogImage'), updateBlogPost);
router.delete('/:id', authenticateJWT, deleteBlogPost);

export default router;