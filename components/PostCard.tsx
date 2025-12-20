
import React from 'react';
import { Post } from '../types.ts';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <article 
      className="group cursor-pointer flex flex-col py-8 first:pt-0 border-b border-zinc-100 last:border-0"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
        <h2 className="serif text-2xl md:text-3xl font-medium group-hover:text-zinc-600 transition-colors leading-tight">
          {post.title}
        </h2>
        <time className="text-zinc-400 text-xs font-medium shrink-0 uppercase tracking-wider">{post.date}</time>
      </div>
      <p className="text-zinc-500 leading-relaxed max-w-2xl mb-4 text-lg">
        {post.excerpt}
      </p>
      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
        <span>{post.category}</span>
        <span className="w-1 h-1 bg-zinc-200 rounded-full"></span>
        <span>{post.readingTime}</span>
      </div>
    </article>
  );
};

export default PostCard;
