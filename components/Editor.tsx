
import React, { useState } from 'react';
import { gemini } from '../services/geminiService';

interface EditorProps {
  onSave: (data: { title: string; content: string; excerpt: string; category: string }) => void;
}

const Editor: React.FC<EditorProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('מחשבות');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiAssist = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    try {
      const draft = await gemini.generateDraft(aiPrompt);
      setTitle(draft.title);
      setContent(draft.content);
      setExcerpt(draft.excerpt);
      setAiPrompt('');
    } catch (err) {
      alert("נכשלנו ביצירת התוכן. אנא בדוק את מפתח ה-API שלך.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!title || !content) {
      alert("אנא ספק לפחות כותרת ותוכן.");
      return;
    }
    onSave({ title, content, excerpt, category });
  };

  return (
    <div className="space-y-12 max-w-3xl">
      <section className="bg-zinc-50 p-8 rounded-xl border border-zinc-100">
        <h3 className="serif text-xl font-medium mb-4">עוזר בינה מלאכותית</h3>
        <p className="text-sm text-zinc-500 mb-4">תקוע? ספר ל-AI על מה תרצה לכתוב, והוא יצור עבורך טיוטה ראשונית.</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="לדוגמה: מאמר על היופי שבשעונים מכניים..."
            className="flex-grow bg-white border border-zinc-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-200"
          />
          <button
            onClick={handleAiAssist}
            disabled={isGenerating}
            className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 disabled:bg-zinc-400 transition-colors"
          >
            {isGenerating ? 'מנסח טיוטה...' : 'טיוטה עם AI'}
          </button>
        </div>
      </section>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">כותרת</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full serif text-4xl font-medium bg-transparent border-b border-zinc-100 focus:border-zinc-300 focus:outline-none pb-2"
            placeholder="מאמר ללא כותרת"
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">קטגוריה</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent border-b border-zinc-100 focus:border-zinc-300 focus:outline-none pb-1"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">תאריך</label>
            <input
              type="text"
              readOnly
              value={new Date().toLocaleDateString('he-IL', { month: 'long', day: 'numeric', year: 'numeric' })}
              className="w-full bg-transparent text-zinc-400 cursor-not-allowed pb-1"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">תקציר</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full bg-transparent border border-zinc-100 rounded-lg p-3 focus:border-zinc-300 focus:outline-none text-zinc-600"
            placeholder="סיכום קצר לפיד המאמרים..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">תוכן המאמר (תומך HTML)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full bg-transparent border border-zinc-100 rounded-lg p-4 focus:border-zinc-300 focus:outline-none font-mono text-sm leading-relaxed"
            placeholder="כתוב את יצירת המופת שלך כאן..."
          />
        </div>

        <div className="flex justify-start pt-8">
          <button
            onClick={handleSave}
            className="bg-black text-white px-10 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200"
          >
            פרסם מאמר
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
