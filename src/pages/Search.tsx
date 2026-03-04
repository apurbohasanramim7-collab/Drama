import { useState } from 'react';
import { Search as SearchIcon, X, Filter, Play } from 'lucide-react';
import { MOCK_DRAMAS } from '../services/mockData';
import { Link } from 'react-router-dom';

export function SearchPage() {
  const [query, setQuery] = useState('');
  
  const results = MOCK_DRAMAS.filter(d => 
    d.title.toLowerCase().includes(query.toLowerCase()) ||
    d.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen px-6 py-8 flex flex-col gap-8">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center text-white/40">
          <SearchIcon size={20} />
        </div>
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dramas, actors, genres..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-accent/50 transition-colors"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-4 flex items-center text-white/40 hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Quick Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        <FilterButton label="All" active={!query} />
        <FilterButton label="Romance" active={query === 'Romance'} />
        <FilterButton label="Historical" active={query === 'Historical'} />
        <FilterButton label="Thriller" active={query === 'Thriller'} />
        <FilterButton label="Sci-Fi" active={query === 'Sci-Fi'} />
      </div>

      {/* Results */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold italic serif">
          {query ? `Results for "${query}"` : 'Recommended for You'}
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          {results.map((drama) => (
            <Link 
              key={drama.id}
              to={`/drama/${drama.id}`}
              className="flex gap-4 p-3 rounded-2xl glass-card hover:bg-white/5 transition-colors group"
            >
              <div className="relative w-24 aspect-[2/3] rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src={drama.thumbnailUrl} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play size={20} fill="currentColor" />
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-1">
                <h3 className="font-bold uppercase tracking-tight group-hover:text-accent transition-colors">{drama.title}</h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">{drama.category} • {drama.totalEpisodes} EPS</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[10px] font-bold text-accent">★ {drama.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-20">
            <div className="text-white/20 mb-4 flex justify-center">
              <SearchIcon size={48} />
            </div>
            <p className="text-white/40 text-sm italic">No results found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterButton({ label, active }: { label: string; active: boolean }) {
  return (
    <button className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${active ? 'bg-accent text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
      {label}
    </button>
  );
}
