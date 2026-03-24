import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { type Song, songs } from "@/data/mockData";

interface PlayerState {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  progress: number;
  volume: number;
  shuffle: boolean;
  repeat: "off" | "all" | "one";
}

interface PlayerContextValue extends PlayerState {
  playSong: (song: Song, queue?: Song[]) => void;
  playQueue: (queue: Song[], startIndex?: number) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setProgress: (p: number) => void;
  setVolume: (v: number) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  setShowFullPlayer: (show: boolean) => void;
  showFullPlayer: boolean;
  addToQueue: (song: Song) => void;
  removeFromQueue: (index: number) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlayerState & { showFullPlayer: boolean }>({
    currentSong: songs[0],
    queue: songs.slice(0, 5),
    isPlaying: false,
    progress: 35,
    volume: 72,
    shuffle: false,
    repeat: "off",
    showFullPlayer: false,
  });

  const playSong = useCallback((song: Song, queue?: Song[]) => {
    setState((s) => ({
      ...s,
      currentSong: song,
      isPlaying: true,
      progress: 0,
      queue: queue ?? s.queue,
    }));
  }, []);

  const playQueue = useCallback((queue: Song[], startIndex = 0) => {
    setState((s) => ({
      ...s,
      currentSong: queue[startIndex] ?? null,
      queue,
      isPlaying: true,
      progress: 0,
    }));
  }, []);

  const togglePlay = useCallback(() => {
    setState((s) => ({ ...s, isPlaying: !s.isPlaying }));
  }, []);

  const nextTrack = useCallback(() => {
    setState((s) => {
      if (!s.currentSong || s.queue.length === 0) return s;
      const idx = s.queue.findIndex((t) => t.id === s.currentSong!.id);
      const nextIdx = s.shuffle
        ? Math.floor(Math.random() * s.queue.length)
        : (idx + 1) % s.queue.length;
      return { ...s, currentSong: s.queue[nextIdx], progress: 0, isPlaying: true };
    });
  }, []);

  const prevTrack = useCallback(() => {
    setState((s) => {
      if (!s.currentSong || s.queue.length === 0) return s;
      const idx = s.queue.findIndex((t) => t.id === s.currentSong!.id);
      const prevIdx = idx <= 0 ? s.queue.length - 1 : idx - 1;
      return { ...s, currentSong: s.queue[prevIdx], progress: 0, isPlaying: true };
    });
  }, []);

  const setProgress = useCallback((p: number) => {
    setState((s) => ({ ...s, progress: p }));
  }, []);

  const setVolume = useCallback((v: number) => {
    setState((s) => ({ ...s, volume: v }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setState((s) => ({ ...s, shuffle: !s.shuffle }));
  }, []);

  const cycleRepeat = useCallback(() => {
    setState((s) => ({
      ...s,
      repeat: s.repeat === "off" ? "all" : s.repeat === "all" ? "one" : "off",
    }));
  }, []);

  const setShowFullPlayer = useCallback((show: boolean) => {
    setState((s) => ({ ...s, showFullPlayer: show }));
  }, []);

  const addToQueue = useCallback((song: Song) => {
    setState((s) => ({ ...s, queue: [...s.queue, song] }));
  }, []);

  const removeFromQueue = useCallback((index: number) => {
    setState((s) => ({
      ...s,
      queue: s.queue.filter((_, i) => i !== index),
    }));
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        playSong,
        playQueue,
        togglePlay,
        nextTrack,
        prevTrack,
        setProgress,
        setVolume,
        toggleShuffle,
        cycleRepeat,
        setShowFullPlayer,
        addToQueue,
        removeFromQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
