import cover1 from "@/assets/cover1.jpg";
import cover2 from "@/assets/cover2.jpg";
import cover3 from "@/assets/cover3.jpg";
import cover4 from "@/assets/cover4.jpg";
import cover5 from "@/assets/cover5.jpg";
import cover6 from "@/assets/cover6.jpg";

export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  duration: number; // seconds
  cover: string;
  liked: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  year: number;
  cover: string;
  songIds: string[];
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  followers: number;
  monthlyListeners: number;
  verified: boolean;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  cover: string;
  owner: string;
  songIds: string[];
  isOwn: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  plan: "free" | "premium";
  followers: number;
  following: number;
}

// ─── Artists ───
export const artists: Artist[] = [
  { id: "ar1", name: "Crimson Waves", image: cover1, followers: 842300, monthlyListeners: 1253000, verified: true },
  { id: "ar2", name: "Luna Shore", image: cover2, followers: 621000, monthlyListeners: 980000, verified: true },
  { id: "ar3", name: "Echo Drift", image: cover3, followers: 415000, monthlyListeners: 720000, verified: false },
  { id: "ar4", name: "Neon Pulse", image: cover4, followers: 1100000, monthlyListeners: 2340000, verified: true },
  { id: "ar5", name: "Aurora Wave", image: cover5, followers: 290000, monthlyListeners: 510000, verified: false },
  { id: "ar6", name: "Shadow Arc", image: cover6, followers: 530000, monthlyListeners: 870000, verified: true },
  { id: "ar7", name: "Frost Giant", image: cover3, followers: 180000, monthlyListeners: 340000, verified: false },
  { id: "ar8", name: "Velvet Dusk", image: cover2, followers: 760000, monthlyListeners: 1450000, verified: true },
];

// ─── Songs ───
export const songs: Song[] = [
  { id: "s1", title: "Sunset Dreams", artist: "Crimson Waves", artistId: "ar1", album: "Neon Horizons", albumId: "al1", duration: 204, cover: cover1, liked: true },
  { id: "s2", title: "Midnight Run", artist: "Crimson Waves", artistId: "ar1", album: "Neon Horizons", albumId: "al1", duration: 237, cover: cover1, liked: false },
  { id: "s3", title: "Tidal Motion", artist: "Luna Shore", artistId: "ar2", album: "Quiet Storm", albumId: "al2", duration: 189, cover: cover2, liked: true },
  { id: "s4", title: "Phantom Lights", artist: "Luna Shore", artistId: "ar2", album: "Quiet Storm", albumId: "al2", duration: 256, cover: cover2, liked: false },
  { id: "s5", title: "Drift Away", artist: "Echo Drift", artistId: "ar3", album: "Voltage", albumId: "al3", duration: 215, cover: cover3, liked: false },
  { id: "s6", title: "Electric Surge", artist: "Echo Drift", artistId: "ar3", album: "Voltage", albumId: "al3", duration: 198, cover: cover3, liked: true },
  { id: "s7", title: "Pulse Code", artist: "Neon Pulse", artistId: "ar4", album: "Amber Glow", albumId: "al4", duration: 242, cover: cover4, liked: false },
  { id: "s8", title: "Night Signal", artist: "Neon Pulse", artistId: "ar4", album: "Amber Glow", albumId: "al4", duration: 178, cover: cover4, liked: true },
  { id: "s9", title: "Dream State", artist: "Aurora Wave", artistId: "ar5", album: "Dream State", albumId: "al5", duration: 267, cover: cover5, liked: true },
  { id: "s10", title: "Cloud Walker", artist: "Aurora Wave", artistId: "ar5", album: "Dream State", albumId: "al5", duration: 194, cover: cover5, liked: false },
  { id: "s11", title: "Afterglow", artist: "Shadow Arc", artistId: "ar6", album: "Crystal Waves", albumId: "al6", duration: 223, cover: cover6, liked: false },
  { id: "s12", title: "Vapor Trail", artist: "Shadow Arc", artistId: "ar6", album: "Crystal Waves", albumId: "al6", duration: 201, cover: cover6, liked: true },
  { id: "s13", title: "Frozen Peak", artist: "Frost Giant", artistId: "ar7", album: "Voltage", albumId: "al3", duration: 231, cover: cover3, liked: false },
  { id: "s14", title: "Silk Road", artist: "Velvet Dusk", artistId: "ar8", album: "Quiet Storm", albumId: "al2", duration: 248, cover: cover2, liked: true },
  { id: "s15", title: "Radiant", artist: "Crimson Waves", artistId: "ar1", album: "Neon Horizons", albumId: "al1", duration: 186, cover: cover1, liked: false },
  { id: "s16", title: "Low Tide", artist: "Luna Shore", artistId: "ar2", album: "Quiet Storm", albumId: "al2", duration: 212, cover: cover2, liked: false },
  { id: "s17", title: "Overdrive", artist: "Neon Pulse", artistId: "ar4", album: "Amber Glow", albumId: "al4", duration: 195, cover: cover4, liked: true },
  { id: "s18", title: "Star Map", artist: "Aurora Wave", artistId: "ar5", album: "Dream State", albumId: "al5", duration: 275, cover: cover5, liked: false },
  { id: "s19", title: "Ember Glow", artist: "Shadow Arc", artistId: "ar6", album: "Crystal Waves", albumId: "al6", duration: 208, cover: cover6, liked: true },
  { id: "s20", title: "Cascades", artist: "Echo Drift", artistId: "ar3", album: "Voltage", albumId: "al3", duration: 220, cover: cover3, liked: false },
];

// ─── Albums ───
export const albums: Album[] = [
  { id: "al1", title: "Neon Horizons", artist: "Crimson Waves", artistId: "ar1", year: 2024, cover: cover1, songIds: ["s1", "s2", "s15"] },
  { id: "al2", title: "Quiet Storm", artist: "Luna Shore", artistId: "ar2", year: 2023, cover: cover2, songIds: ["s3", "s4", "s14", "s16"] },
  { id: "al3", title: "Voltage", artist: "Echo Drift", artistId: "ar3", year: 2024, cover: cover3, songIds: ["s5", "s6", "s13", "s20"] },
  { id: "al4", title: "Amber Glow", artist: "Neon Pulse", artistId: "ar4", year: 2023, cover: cover4, songIds: ["s7", "s8", "s17"] },
  { id: "al5", title: "Dream State", artist: "Aurora Wave", artistId: "ar5", year: 2024, cover: cover5, songIds: ["s9", "s10", "s18"] },
  { id: "al6", title: "Crystal Waves", artist: "Shadow Arc", artistId: "ar6", year: 2022, cover: cover6, songIds: ["s11", "s12", "s19"] },
];

// ─── Playlists ───
export const playlists: Playlist[] = [
  { id: "pl1", title: "Summer Vibes", description: "Warm beats for sunny days", cover: cover1, owner: "You", songIds: ["s1", "s3", "s5", "s7", "s9", "s11"], isOwn: true },
  { id: "pl2", title: "Late Night Chill", description: "Wind down with smooth sounds", cover: cover2, owner: "You", songIds: ["s2", "s4", "s6", "s14", "s10", "s12"], isOwn: true },
  { id: "pl3", title: "Workout Energy", description: "High tempo tracks to push harder", cover: cover3, owner: "You", songIds: ["s5", "s6", "s7", "s8", "s13", "s17"], isOwn: true },
  { id: "pl4", title: "Morning Coffee", description: "Easy listening for a calm start", cover: cover4, owner: "You", songIds: ["s3", "s9", "s10", "s14", "s16"], isOwn: true },
  { id: "pl5", title: "Road Trip", description: "Miles of music ahead", cover: cover6, owner: "You", songIds: ["s1", "s5", "s8", "s11", "s15", "s19", "s20"], isOwn: true },
  { id: "pl6", title: "Focus Flow", description: "Concentration-enhancing instrumentals", cover: cover5, owner: "MySpot", songIds: ["s9", "s10", "s18", "s3", "s16"], isOwn: false },
  { id: "pl7", title: "Party Starters", description: "Get the crowd moving", cover: cover3, owner: "MySpot", songIds: ["s7", "s8", "s17", "s5", "s6", "s13"], isOwn: false },
];

// ─── User ───
export const currentUser: UserProfile = {
  id: "u1",
  name: "Alex Rivera",
  email: "alex@myspot.com",
  avatar: null,
  plan: "premium",
  followers: 23,
  following: 148,
};

// ─── Helpers ───
export function getSongById(id: string): Song | undefined {
  return songs.find((s) => s.id === id);
}

export function getAlbumById(id: string): Album | undefined {
  return albums.find((a) => a.id === id);
}

export function getArtistById(id: string): Artist | undefined {
  return artists.find((a) => a.id === id);
}

export function getPlaylistById(id: string): Playlist | undefined {
  return playlists.find((p) => p.id === id);
}

export function getSongsByIds(ids: string[]): Song[] {
  return ids.map((id) => getSongById(id)).filter(Boolean) as Song[];
}

export function getArtistSongs(artistId: string): Song[] {
  return songs.filter((s) => s.artistId === artistId);
}

export function getArtistAlbums(artistId: string): Album[] {
  return albums.filter((a) => a.artistId === artistId);
}

export function getLikedSongs(): Song[] {
  return songs.filter((s) => s.liked);
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

// Search helper
export function searchAll(query: string) {
  const q = query.toLowerCase();
  return {
    songs: songs.filter((s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)),
    albums: albums.filter((a) => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q)),
    artists: artists.filter((a) => a.name.toLowerCase().includes(q)),
    playlists: playlists.filter((p) => p.title.toLowerCase().includes(q)),
  };
}
