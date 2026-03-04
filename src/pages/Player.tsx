import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Play, Lock, Clock, AlertCircle } from 'lucide-react';
import { MOCK_DRAMAS, getMockEpisodes } from '../services/mockData';

export function Player() {
  const { dramaId, episodeNumber } = useParams();
  const navigate = useNavigate();
  const drama = MOCK_DRAMAS.find(d => d.id === dramaId);
  const epNum = parseInt(episodeNumber || '1');
  const episode = drama ? getMockEpisodes(drama.id).find(e => e.episodeNumber === epNum) : null;

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [adProgress, setAdProgress] = useState(0);
  const [isAdFinished, setIsAdFinished] = useState(false);

  useEffect(() => {
    if (episode) {
      // Check if episode is free or already unlocked in local storage
      const unlockKey = `unlock_${dramaId}_${epNum}`;
      const expiry = localStorage.getItem(unlockKey);
      const now = Date.now();

      if (episode.isFree || (expiry && parseInt(expiry) > now)) {
        setIsUnlocked(true);
      } else {
        setIsUnlocked(false);
      }
    }
  }, [dramaId, epNum, episode]);

  const handleStartAd = () => {
    setShowAd(true);
    setAdProgress(0);
    setIsAdFinished(false);

    const duration = 12000; // 12 seconds as requested
    const interval = 100;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setAdProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsAdFinished(true);
      }
    }, interval);
  };

  const handleUnlock = () => {
    const unlockKey = `unlock_${dramaId}_${epNum}`;
    const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    localStorage.setItem(unlockKey, expiry.toString());
    setIsUnlocked(true);
    setShowAd(false);
  };

  if (!drama || !episode) return <div className="p-10 text-center">Episode not found</div>;

  return (
    <div className="fixed inset-0 bg-black z-[60] flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center gap-4 z-10 bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full glass-card">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-bold truncate uppercase tracking-tight">{drama.title}</h1>
          <p className="text-[10px] text-white/60 uppercase tracking-widest">Episode {episode.episodeNumber}</p>
        </div>
      </div>

      {/* Video Content */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {isUnlocked ? (
          <iframe
            src={episode.bloggerUrl}
            className="w-full h-full border-0"
            allowFullScreen
            title={episode.episodeTitle}
          />
        ) : (
          <div className="flex flex-col items-center gap-6 p-8 text-center max-w-sm">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-2">
              <Lock size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 italic serif uppercase">Episode Locked</h2>
              <p className="text-white/60 text-sm font-light">
                This episode requires a rewarded ad to unlock. Unlocks are valid for 24 hours.
              </p>
            </div>
            <button 
              onClick={handleStartAd}
              className="w-full flex items-center justify-center gap-2 bg-accent text-white py-4 rounded-2xl font-bold hover:scale-105 transition-transform"
            >
              <Play size={20} fill="currentColor" />
              WATCH AD TO UNLOCK
            </button>
            <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
              <Clock size={12} />
              <span>24H Access</span>
            </div>
          </div>
        )}

        {/* Ad Overlay */}
        <AnimatePresence>
          {showAd && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center p-8"
            >
              <div className="absolute top-6 right-6">
                <div className="glass-card px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Sponsored Ad
                </div>
              </div>

              <div className="w-full max-w-md flex flex-col items-center gap-8">
                <div className="w-full aspect-video rounded-3xl glass-card flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/10 animate-pulse" />
                  <div className="flex flex-col items-center gap-2 z-10">
                    <Play size={48} className="text-accent opacity-50" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Ad Playing...</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <motion.div 
                      className="h-full bg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${adProgress}%` }}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2 italic serif">Unlock Episode {epNum}</h3>
                  <p className="text-white/40 text-xs font-light">
                    {isAdFinished ? 'Ad completed! You can now unlock the episode.' : `Please wait ${Math.ceil((100 - adProgress) / 8.33)}s to complete the ad.`}
                  </p>
                </div>

                {isAdFinished ? (
                  <button 
                    onClick={handleUnlock}
                    className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold animate-bounce"
                  >
                    UNLOCK NOW
                  </button>
                ) : (
                  <div className="w-full bg-white/5 text-white/20 py-4 rounded-2xl font-bold text-center cursor-not-allowed">
                    WAITING...
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Controls */}
      {isUnlocked && (
        <div className="p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center">
          <div className="flex gap-4">
            <button className="text-white/60 hover:text-white transition-colors">
              <AlertCircle size={20} />
            </button>
          </div>
          <div className="flex gap-2">
            {epNum > 1 && (
              <Link 
                to={`/player/${dramaId}/${epNum - 1}`}
                className="glass-card px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest"
              >
                Prev
              </Link>
            )}
            {epNum < (drama.totalEpisodes || 0) && (
              <Link 
                to={`/player/${dramaId}/${epNum + 1}`}
                className="bg-white text-black px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
