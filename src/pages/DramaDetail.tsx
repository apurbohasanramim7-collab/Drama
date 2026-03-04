import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, Heart, Share2, Lock, CheckCircle2 } from 'lucide-react';
import { MOCK_DRAMAS, getMockEpisodes } from '../services/mockData';
import { useState, useEffect } from 'react';

export function DramaDetail() {
  const { id } = useParams();
  const drama = MOCK_DRAMAS.find(d => d.id === id);
  const episodes = id ? getMockEpisodes(id) : [];
  const [isFavorite, setIsFavorite] = useState(false);

  if (!drama) return <div className="p-10 text-center">Drama not found</div>;

  return (
    <div className="min-h-screen pb-20">
      {/* Header Image */}
      <div className="relative h-[50vh] w-full">
        <img 
          src={drama.thumbnailUrl} 
          alt={drama.title}
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0502] to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter uppercase italic mb-2">{drama.title}</h1>
            <div className="flex gap-3 text-xs font-medium uppercase tracking-widest text-white/60">
              <span>{drama.category}</span>
              <span>•</span>
              <span>{drama.totalEpisodes} Episodes</span>
              <span>•</span>
              <span className="text-accent">{drama.freeEpisodeCount} Free</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 flex flex-col gap-8">
        {/* Actions */}
        <div className="flex gap-4">
          <Link 
            to={`/player/${drama.id}/1`}
            className="flex-1 flex items-center justify-center gap-2 bg-accent text-white py-4 rounded-2xl font-bold"
          >
            <Play size={20} fill="currentColor" />
            START WATCHING
          </Link>
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={`w-14 h-14 flex items-center justify-center rounded-2xl glass-card transition-colors ${isFavorite ? 'text-accent' : 'text-white'}`}
          >
            <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button className="w-14 h-14 flex items-center justify-center rounded-2xl glass-card">
            <Share2 size={24} />
          </button>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-bold mb-2 italic serif">Synopsis</h2>
          <p className="text-white/70 leading-relaxed font-light text-sm">
            {drama.description}
          </p>
        </div>

        {/* Episode List */}
        <div>
          <h2 className="text-lg font-bold mb-4 italic serif">Episodes</h2>
          <div className="flex flex-col gap-3">
            {episodes.map((ep) => (
              <EpisodeItem key={ep.id} episode={ep} drama={drama} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EpisodeItem({ episode, drama }: { episode: any; drama: any; key?: any }) {
  const isUnlocked = episode.isFree; // In real app, check Firestore for unlock record

  return (
    <Link 
      to={`/player/${drama.id}/${episode.episodeNumber}`}
      className="flex items-center gap-4 p-3 rounded-2xl glass-card hover:bg-white/5 transition-colors group"
    >
      <div className="relative w-24 aspect-video rounded-xl overflow-hidden flex-shrink-0">
        <img 
          src={drama.thumbnailUrl} 
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {isUnlocked ? (
            <Play size={20} className="text-white group-hover:text-accent transition-colors" fill="currentColor" />
          ) : (
            <Lock size={20} className="text-white/40" />
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium truncate">Episode {episode.episodeNumber}</h3>
        <p className="text-[10px] text-white/40 uppercase tracking-widest">
          {isUnlocked ? 'Available Now' : 'Watch Ad to Unlock'}
        </p>
      </div>
      {isUnlocked && (
        <CheckCircle2 size={16} className="text-emerald-500" />
      )}
    </Link>
  );
}
