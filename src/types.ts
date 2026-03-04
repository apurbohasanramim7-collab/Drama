export interface Drama {
  id: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  totalEpisodes: number;
  freeEpisodeCount: number;
  category: string;
  createdAt: number;
  rating?: number;
}

export interface Episode {
  id: string;
  dramaId: string;
  episodeNumber: number;
  episodeTitle: string;
  bloggerUrl: string;
  isFree: boolean;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  favorites: string[]; // dramaIds
  unlockedEpisodes: Record<string, number>; // key: "dramaId_epNumber", value: expiry timestamp
}
