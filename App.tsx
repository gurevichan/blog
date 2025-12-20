
import React, { useState, useCallback, useMemo } from 'react';
import { Post, AppView } from './types';
import { INITIAL_POSTS } from './constants';
import Layout from './components/Layout';
import PostCard from './components/PostCard';
import Editor from './components/Editor';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('list');
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const q = searchQuery.toLowerCase();
    return posts.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.excerpt.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
    );
  }, [posts, searchQuery]);

  const selectedPost = useMemo(() => 
    posts.find(p => p.id === selectedPostId), 
    [posts, selectedPostId]
  );

  const handleNavigate = useCallback((newView: 'list' | 'compose') => {
    setView(newView);
    setSelectedPostId(null);
    setSearchQuery(''); // Reset search when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePostClick = (id: string) => {
    setSelectedPostId(id);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePost = (data: { title: string; content: string; excerpt: string; category: string }) => {
    const newPost: Post = {
      id: Date.now().toString(),
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      category: data.category,
      date: new Date().toLocaleDateString('he-IL', { month: 'long', day: 'numeric', year: 'numeric' }),
      readingTime: `${Math.max(1, Math.round(data.content.length / 1000))} דקות קריאה`
    };
    setPosts([newPost, ...posts]);
    setView('list');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search input component for the layout slot
  const searchBar = view === 'list' ? (
    <div className="relative group">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="חפש מאמרים..."
        className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-100 focus:bg-white transition-all text-center"
      />
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  ) : null;

  return (
    <Layout onNavigate={handleNavigate} currentView={view} searchSlot={searchBar}>
      {view === 'list' && (
        <div className="animate-in fade-in duration-700 slide-in-from-bottom-4">
          <div className="grid grid-cols-1 divide-y divide-zinc-100">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} onClick={() => handlePostClick(post.id)} />
              ))
            ) : (
              <div className="py-24 text-center">
                <p className="serif text-2xl text-zinc-400">לא נמצאו מאמרים התואמים את החיפוש שלך.</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-sm font-bold uppercase tracking-widest text-zinc-900 underline underline-offset-4"
                >
                  נקה חיפוש
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {view === 'detail' && selectedPost && (
        <article className="max-w-3xl mx-auto animate-in fade-in duration-700">
          <header className="mb-12">
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
              <span>{selectedPost.category}</span>
              <span className="w-1 h-1 bg-zinc-200 rounded-full"></span>
              <span>{selectedPost.date}</span>
            </div>
            <h1 className="serif text-4xl md:text-6xl font-medium leading-[1.1] tracking-tight mb-8">
              {selectedPost.title}
            </h1>
            {selectedPost.coverImage && (
              <img 
                src={selectedPost.coverImage} 
                alt={selectedPost.title} 
                className="w-full aspect-[2/1] object-cover rounded-2xl mb-8 border border-zinc-100"
              />
            )}
            <p className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed italic border-r-4 border-zinc-100 pr-6 pl-0">
              {selectedPost.excerpt}
            </p>
          </header>

          <div 
            className="prose prose-zinc prose-lg max-w-none prose-headings:serif prose-headings:font-medium prose-p:leading-relaxed prose-p:text-zinc-800"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />

          <div className="mt-24 pt-12 border-t border-zinc-100">
            <button 
              onClick={() => setView('list')}
              className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-black transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              חזרה למאמרים
            </button>
          </div>
        </article>
      )}

      {view === 'compose' && (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-700">
          <h2 className="serif text-3xl font-medium mb-12 text-center">כתיבת מאמר חדש</h2>
          <Editor onSave={handleSavePost} />
        </div>
      )}
    </Layout>
  );
};

export default App;
