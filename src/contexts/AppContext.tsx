import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import { songs as allSongs, type Song } from "@/data/mockData";

interface AppContextValue {
  likedSongIds: Set<string>;
  followedArtistIds: Set<string>;
  savedAlbumIds: Set<string>;
  savedPlaylistIds: Set<string>;
  recentSearches: string[];
  isLiked: (songId: string) => boolean;
  toggleLike: (songId: string) => void;
  getLikedSongs: () => Song[];
  likedCount: number;
  isFollowing: (artistId: string) => boolean;
  toggleFollow: (artistId: string) => void;
  isAlbumSaved: (albumId: string) => boolean;
  toggleSaveAlbum: (albumId: string) => void;
  isPlaylistSaved: (playlistId: string) => boolean;
  toggleSavePlaylist: (playlistId: string) => void;
  addRecentSearch: (term: string) => void;
  removeRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// Initialize liked songs from mock data
const initialLiked = new Set(allSongs.filter((s) => s.liked).map((s) => s.id));

export function AppProvider({ children }: { children: ReactNode }) {
  const [likedSongIds, setLikedSongIds] = useState<Set<string>>(initialLiked);
  const [followedArtistIds, setFollowedArtistIds] = useState<Set<string>>(new Set());
  const [savedAlbumIds, setSavedAlbumIds] = useState<Set<string>>(new Set());
  const [savedPlaylistIds, setSavedPlaylistIds] = useState<Set<string>>(new Set());
  const [recentSearches, setRecentSearches] = useState<string[]>(["Crimson Waves", "Dream State", "Neon Pulse"]);

  const isLiked = useCallback((songId: string) => likedSongIds.has(songId), [likedSongIds]);

  const toggleLike = useCallback((songId: string) => {
    setLikedSongIds((prev) => {
      const next = new Set(prev);
      if (next.has(songId)) next.delete(songId);
      else next.add(songId);
      return next;
    });
  }, []);

  const getLikedSongs = useCallback((): Song[] => {
    return allSongs.filter((s) => likedSongIds.has(s.id));
  }, [likedSongIds]);

  const likedCount = useMemo(() => likedSongIds.size, [likedSongIds]);

  const isFollowing = useCallback((artistId: string) => followedArtistIds.has(artistId), [followedArtistIds]);

  const toggleFollow = useCallback((artistId: string) => {
    setFollowedArtistIds((prev) => {
      const next = new Set(prev);
      if (next.has(artistId)) next.delete(artistId);
      else next.add(artistId);
      return next;
    });
  }, []);

  const isAlbumSaved = useCallback((albumId: string) => savedAlbumIds.has(albumId), [savedAlbumIds]);

  const toggleSaveAlbum = useCallback((albumId: string) => {
    setSavedAlbumIds((prev) => {
      const next = new Set(prev);
      if (next.has(albumId)) next.delete(albumId);
      else next.add(albumId);
      return next;
    });
  }, []);

  const isPlaylistSaved = useCallback((playlistId: string) => savedPlaylistIds.has(playlistId), [savedPlaylistIds]);

  const toggleSavePlaylist = useCallback((playlistId: string) => {
    setSavedPlaylistIds((prev) => {
      const next = new Set(prev);
      if (next.has(playlistId)) next.delete(playlistId);
      else next.add(playlistId);
      return next;
    });
  }, []);

  const addRecentSearch = useCallback((term: string) => {
    if (!term.trim()) return;
    setRecentSearches((prev) => [term, ...prev.filter((s) => s !== term)].slice(0, 8));
  }, []);

  const removeRecentSearch = useCallback((term: string) => {
    setRecentSearches((prev) => prev.filter((s) => s !== term));
  }, []);

  const clearRecentSearches = useCallback(() => setRecentSearches([]), []);

  return (
    <AppContext.Provider
      value={{
        likedSongIds,
        followedArtistIds,
        savedAlbumIds,
        savedPlaylistIds,
        recentSearches,
        isLiked,
        toggleLike,
        getLikedSongs,
        likedCount,
        isFollowing,
        toggleFollow,
        isAlbumSaved,
        toggleSaveAlbum,
        isPlaylistSaved,
        toggleSavePlaylist,
        addRecentSearch,
        removeRecentSearch,
        clearRecentSearches,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
