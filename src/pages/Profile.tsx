import { motion } from 'motion/react';
import { User, Settings, History, Heart, LogOut, ChevronRight, Shield, HelpCircle } from 'lucide-react';

export function Profile() {
  const user = {
    displayName: 'Drama Lover',
    email: 'user@example.com',
    avatar: 'https://picsum.photos/seed/user/200/200'
  };

  const menuItems = [
    { icon: <History size={20} />, label: 'Watch History', color: 'text-blue-400' },
    { icon: <Heart size={20} />, label: 'My Favorites', color: 'text-accent' },
    { icon: <Settings size={20} />, label: 'Settings', color: 'text-gray-400' },
    { icon: <Shield size={20} />, label: 'Privacy Policy', color: 'text-emerald-400' },
    { icon: <HelpCircle size={20} />, label: 'Help & Support', color: 'text-amber-400' },
  ];

  return (
    <div className="min-h-screen px-6 py-12 flex flex-col gap-8">
      {/* User Info */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-accent/20 p-1">
          <img 
            src={user.avatar} 
            alt={user.displayName}
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tighter uppercase italic">{user.displayName}</h1>
          <p className="text-white/40 text-xs uppercase tracking-widest">{user.email}</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors">
          Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Watched" value="12" />
        <StatCard label="Favorites" value="8" />
        <StatCard label="Unlocked" value="4" />
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2">
        {menuItems.map((item, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-2xl glass-card hover:bg-white/5 transition-colors group"
          >
            <div className={`${item.color} group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
            <ChevronRight size={16} className="text-white/20" />
          </motion.button>
        ))}
      </div>

      {/* Logout */}
      <button className="flex items-center justify-center gap-2 text-red-400/60 hover:text-red-400 py-4 rounded-2xl border border-red-400/20 transition-colors mt-4">
        <LogOut size={20} />
        <span className="text-sm font-bold uppercase tracking-widest">Logout</span>
      </button>

      <div className="text-center text-[10px] text-white/20 uppercase tracking-widest mt-10">
        DramaStream OTT v1.0.0
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card p-4 rounded-2xl text-center">
      <div className="text-2xl font-bold text-accent italic serif">{value}</div>
      <div className="text-[8px] text-white/40 uppercase tracking-widest">{label}</div>
    </div>
  );
}
