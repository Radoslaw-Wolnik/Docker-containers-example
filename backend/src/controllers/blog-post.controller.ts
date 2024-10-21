// src/controllers/blog-post.controller.ts

import { Request, Response, NextFunction } from 'express';
import BlogPost from '../models/blog-post.model';
import { NotFoundError, BadRequestError, ForbiddenError } from '../utils/custom-errors.util';

export const createBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    const author = (req as any).user.userId;
    
    const blogPost = new BlogPost({
      title,
      content: JSON.parse(content),
      author
    });

    if (req.file) {
      const imagePath = '/' + req.file.path.replace(/\\/g, '/');
      blogPost.content.push({
        type: 'photo',
        content: imagePath
      });
    }

    await blogPost.save();
    res.status(201).json(blogPost);
  } catch (error) {
    next(error);
  }
};

export const getBlogPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const blogPosts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'username');
    
    const total = await BlogPost.countDocuments();
    
    res.json({
      blogPosts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (!blogPost) {
      throw new NotFoundError('Blog post not found');
    }
    res.json(blogPost);
  } catch (error) {
    next(error);
  }
};

export const updateBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    const blogPost = await BlogPost.findById(req.params.id);
    
    if (!blogPost) {
      throw new NotFoundError('Blog post not found');
    }
    
    if (blogPost.author.toString() !== (req as any).user.userId) {
      throw new ForbiddenError('You can only edit your own blog posts');
    }
    
    blogPost.title = title;
    blogPost.content = JSON.parse(content);
    
    if (req.file) {
      const imagePath = '/' + req.file.path.replace(/\\/g, '/');
      blogPost.content.push({
        type: 'photo',
        content: imagePath
      });
    }
    
    await blogPost.save();
    res.json(blogPost);
  } catch (error) {
    next(error);
  }
};

export const deleteBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    
    if (!blogPost) {
      throw new NotFoundError('Blog post not found');
    }
    
    if (blogPost.author.toString() !== (req as any).user.userId && (req as any).user.role !== 'admin') {
      throw new ForbiddenError('You can only delete your own blog posts or you must be an admin');
    }
    
    await blogPost.deleteOne();
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    next(error);
  }
};