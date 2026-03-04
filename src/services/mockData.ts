import { Drama, Episode } from '../types';

export const MOCK_DRAMAS: Drama[] = [
  {
    id: '1',
    title: 'Secret Love in the City',
    thumbnailUrl: 'https://picsum.photos/seed/drama1/600/900',
    description: 'A modern romance set in the bustling streets of Seoul, where two strangers find love in the most unexpected places.',
    totalEpisodes: 24,
    freeEpisodeCount: 5,
    category: 'Romance',
    createdAt: Date.now(),
    rating: 4.8
  },
  {
    id: '2',
    title: 'Shadow of the Throne',
    thumbnailUrl: 'https://picsum.photos/seed/drama2/600/900',
    description: 'A historical epic about power, betrayal, and the cost of a crown in the Joseon dynasty.',
    totalEpisodes: 16,
    freeEpisodeCount: 3,
    category: 'Historical',
    createdAt: Date.now() - 86400000,
    rating: 4.9
  },
  {
    id: '3',
    title: 'Cyber Heist 2077',
    thumbnailUrl: 'https://picsum.photos/seed/drama3/600/900',
    description: 'In a neon-drenched future, a group of hackers attempts the biggest digital heist in history.',
    totalEpisodes: 12,
    freeEpisodeCount: 2,
    category: 'Sci-Fi',
    createdAt: Date.now() - 172800000,
    rating: 4.5
  },
  {
    id: '4',
    title: 'The Silent Witness',
    thumbnailUrl: 'https://picsum.photos/seed/drama4/600/900',
    description: 'A brilliant forensic pathologist solves cold cases that have baffled the police for decades.',
    totalEpisodes: 20,
    freeEpisodeCount: 4,
    category: 'Thriller',
    createdAt: Date.now() - 259200000,
    rating: 4.7
  }
];

export const getMockEpisodes = (dramaId: string): Episode[] => {
  const drama = MOCK_DRAMAS.find(d => d.id === dramaId);
  if (!drama) return [];
  
  return Array.from({ length: drama.totalEpisodes }, (_, i) => ({
    id: `${dramaId}_${i + 1}`,
    dramaId,
    episodeNumber: i + 1,
    episodeTitle: `Episode ${i + 1}`,
    bloggerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder for Blogger embed
    isFree: (i + 1) <= drama.freeEpisodeCount
  }));
};
