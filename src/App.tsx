import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Search, Heart, User, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Home } from './pages/Home';
import { DramaDetail } from './pages/DramaDetail';
import { Player } from './pages/Player';
import { Profile } from './pages/Profile';
import { SearchPage } from './pages/Search';

function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-white/10 px-6 py-3 flex justify-between items-center md:top-0 md:bottom-auto md:flex-col md:w-20 md:h-screen md:py-10 md:border-r md:border-t-0">
      <NavItem to="/" icon={<HomeIcon size={24} />} active={isActive('/')} label="Home" />
      <NavItem to="/search" icon={<Search size={24} />} active={isActive('/search')} label="Search" />
      <NavItem to="/favorites" icon={<Heart size={24} />} active={isActive('/favorites')} label="Favorites" />
      <NavItem to="/profile" icon={<User size={24} />} active={isActive('/profile')} label="Profile" />
    </nav>
  );
}

function NavItem({ to, icon, active, label }: { to: string; icon: React.ReactNode; active: boolean; label: string }) {
  return (
    <Link to={to} className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-accent' : 'text-white/50 hover:text-white'}`}>
      {icon}
      <span className="text-[10px] uppercase tracking-widest font-medium md:hidden">{label}</span>
    </Link>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen pb-20 md:pb-0 md:pl-20">
        <div className="atmosphere-bg" />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drama/:id" element={<DramaDetail />} />
          <Route path="/player/:dramaId/:episodeNumber" element={<Player />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Navbar />
      </div>
    </Router>
  );
}
