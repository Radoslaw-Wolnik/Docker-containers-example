// src/models/blog-post.model.ts

import mongoose, { Document, Schema } from 'mongoose';

interface IContent {
  type: 'text' | 'code' | 'photo';
  content: string;
}

export interface IBlogPost extends Document {
  title: string;
  content: IContent[];
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const blogPostSchema = new Schema<IBlogPost>({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: [{
    type: {
      type: String,
      enum: ['text', 'code', 'photo'],
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }],
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { timestamps: true });

export default mongoose.model<IBlogPost>('BlogPost', blogPostSchema);