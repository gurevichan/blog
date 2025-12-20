
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (view: 'list' | 'compose') => void;
  currentView: string;
  searchSlot?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentView, searchSlot }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-5xl mx-auto px-6 md:px-12 py-8">
      <header className="flex flex-col items-center text-center mb-16 md:mb-24">
        <div>
          <h1 
            className="serif text-5xl md:text-7xl font-semibold tracking-tight cursor-pointer hover:text-zinc-700 transition-colors"
            onClick={() => onNavigate('list')}
          >
            Elegance.
          </h1>
          <p className="text-zinc-500 text-sm mt-3 uppercase tracking-widest font-medium">מחשבות על עיצוב וטכנולוגיה</p>
        </div>

        {/* Search Bar Slot */}
        <div className="w-full max-w-md mt-10 mb-8 animate-in fade-in slide-in-from-top-2 duration-500">
          {searchSlot}
        </div>

        <nav className="flex gap-10 text-sm font-bold uppercase tracking-widest text-zinc-500">
          <button 
            onClick={() => onNavigate('list')}
            className={`hover:text-black transition-colors border-b-2 pb-1 ${currentView === 'list' ? 'text-black border-black' : 'border-transparent'}`}
          >
            מאמרים
          </button>
          <button 
            onClick={() => onNavigate('compose')}
            className={`hover:text-black transition-colors border-b-2 pb-1 ${currentView === 'compose' ? 'text-black border-black' : 'border-transparent'}`}
          >
            כתיבה
          </button>
          <a href="#" className="hover:text-black transition-colors border-b-2 border-transparent pb-1">אודות</a>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="mt-24 pt-12 border-t border-zinc-100 pb-12 text-zinc-400 text-xs flex flex-col md:flex-row justify-between gap-4">
        <div>
          <p>&copy; 2024 תבנית Elegance. נבנה עבור יוצרים.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-zinc-900 transition-colors">Twitter</a>
          <a href="#" className="hover:text-zinc-900 transition-colors">GitHub</a>
          <a href="#" className="hover:text-zinc-900 transition-colors">RSS Feed</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
