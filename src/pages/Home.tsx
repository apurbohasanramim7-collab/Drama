import { motion } from 'motion/react';
import { Play, Info, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_DRAMAS } from '../services/mockData';
import { Drama } from '../types';

export function Home() {
  const featured = MOCK_DRAMAS[0];
  const trending = MOCK_DRAMAS.slice(1);
  const categories = ['Romance', 'Historical', 'Sci-Fi', 'Thriller'];

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img 
          src={featured.thumbnailUrl} 
          alt={featured.title}
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0502] via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full max-w-2xl flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block">Featured Today</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-4 uppercase italic">
              {featured.title}
            </h1>
            <p className="text-white/70 text-sm md:text-base line-clamp-3 mb-6 font-light">
              {featured.description}
            </p>
            
            <div className="flex gap-4">
              <Link 
                to={`/player/${featured.id}/1`}
                className="flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
              >
                <Play size={20} fill="currentColor" />
                WATCH NOW
              </Link>
              <Link 
                to={`/drama/${featured.id}`}
                className="flex items-center gap-2 glass-card text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                <Info size={20} />
                DETAILS
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="px-6">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-2xl font-bold tracking-tight italic serif">Trending Now</h2>
          <span className="text-white/40 text-xs uppercase tracking-widest cursor-pointer hover:text-white">View All</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {MOCK_DRAMAS.map((drama) => (
            <DramaCard key={drama.id} drama={drama} />
          ))}
        </div>
      </section>

      {/* Categories */}
      {categories.map(cat => (
        <section key={cat} className="px-6">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-2xl font-bold tracking-tight italic serif">{cat}</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {MOCK_DRAMAS.filter(d => d.category === cat).map((drama) => (
              <DramaCard key={drama.id} drama={drama} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function DramaCard({ drama }: { drama: Drama; key?: any }) {
  return (
    <Link 
      to={`/drama/${drama.id}`}
      className="flex-shrink-0 w-40 md:w-56 group"
    >
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-2 border border-white/5 transition-transform duration-500 group-hover:scale-105 group-hover:border-accent/50">
        <img 
          src={drama.thumbnailUrl} 
          alt={drama.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 right-2 glass-card px-2 py-1 rounded-lg flex items-center gap-1">
          <Star size={12} className="text-accent" fill="currentColor" />
          <span className="text-[10px] font-bold">{drama.rating}</span>
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play size={24} fill="currentColor" />
          </div>
        </div>
      </div>
      <h3 className="text-sm font-medium truncate group-hover:text-accent transition-colors">{drama.title}</h3>
      <p className="text-[10px] text-white/40 uppercase tracking-widest">{drama.category} • {drama.totalEpisodes} EPS</p>
    </Link>
  );
}
