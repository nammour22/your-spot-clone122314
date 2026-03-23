import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Play, Pause, SkipBack, SkipForward, Repeat, Repeat1, Shuffle,
  Volume2, VolumeX, Maximize2, ListMusic, MonitorSpeaker, Heart, PictureInPicture2,
} from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { formatDuration } from "@/data/mockData";
import { toast } from "sonner";

export default function PlayerBar() {
  const {
    currentSong, isPlaying, togglePlay, nextTrack, prevTrack,
    progress, setProgress, volume, setVolume,
    shuffle, toggleShuffle, repeat, cycleRepeat,
    toggleLike, setShowFullPlayer,
  } = usePlayer();
  const navigate = useNavigate();

  if (!currentSong) return null;

  const elapsed = Math.floor(currentSong.duration * progress / 100);

  return (
    <footer className="bg-player-bar border-t border-border h-[72px] md:h-[90px] flex items-center px-2 md:px-4 gap-2 md:gap-4 z-50">
      {/* Now Playing */}
      <div
        className="flex items-center gap-3 w-[30%] min-w-0 cursor-pointer"
        onClick={() => navigate("/queue")}
      >
        <img src={currentSong.cover} alt="Now playing" className="w-14 h-14 rounded-md object-cover hidden md:block" />
        <img src={currentSong.cover} alt="Now playing" className="w-10 h-10 rounded-md object-cover md:hidden" />
        <div className="min-w-0 hidden sm:block">
          <p className="text-sm font-medium text-bright truncate hover:underline">{currentSong.title}</p>
          <p
            className="text-xs text-subdued truncate hover:underline cursor-pointer"
            onClick={(e) => { e.stopPropagation(); navigate(`/artist/${currentSong.artistId}`); }}
          >
            {currentSong.artist}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(currentSong.id);
            toast(currentSong.liked ? "Removed from Liked Songs" : "Added to Liked Songs");
          }}
          className={`hidden sm:block ml-1 transition-colors ${currentSong.liked ? "text-primary" : "text-subdued hover:text-bright"}`}
        >
          <Heart className={`w-4 h-4 ${currentSong.liked ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-col items-center flex-1 max-w-[722px] gap-1">
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={toggleShuffle}
            className={`hidden md:block transition-colors ${shuffle ? "text-primary" : "text-subdued hover:text-bright"}`}
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button onClick={prevTrack} className="text-subdued hover:text-bright transition-colors">
            <SkipBack className="w-4 h-4 fill-current" />
          </button>
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-background fill-current" />
            ) : (
              <Play className="w-4 h-4 text-background fill-current ml-0.5" />
            )}
          </button>
          <button onClick={nextTrack} className="text-subdued hover:text-bright transition-colors">
            <SkipForward className="w-4 h-4 fill-current" />
          </button>
          <button
            onClick={cycleRepeat}
            className={`hidden md:block transition-colors ${repeat !== "off" ? "text-primary" : "text-subdued hover:text-bright"}`}
          >
            {repeat === "one" ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-[11px] text-subdued tabular-nums w-8 text-right">{formatDuration(elapsed)}</span>
          <div
            className="flex-1 h-1 bg-surface-highlight rounded-full cursor-pointer group relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(((e.clientX - rect.left) / rect.width) * 100);
            }}
          >
            <div
              className="h-full bg-foreground rounded-full group-hover:bg-primary transition-colors relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-[11px] text-subdued tabular-nums w-8">{formatDuration(currentSong.duration)}</span>
        </div>
      </div>

      {/* Volume & Extra */}
      <div className="hidden md:flex items-center gap-2 w-[30%] justify-end">
        <button onClick={() => navigate("/queue")} className="text-subdued hover:text-bright transition-colors">
          <ListMusic className="w-4 h-4" />
        </button>
        <button className="text-subdued hover:text-bright transition-colors">
          <MonitorSpeaker className="w-4 h-4" />
        </button>
        <button onClick={() => setVolume(volume > 0 ? 0 : 72)} className="text-subdued hover:text-bright transition-colors">
          {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <div
          className="w-24 h-1 bg-surface-highlight rounded-full cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setVolume(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
          }}
        >
          <div
            className="h-full bg-foreground rounded-full group-hover:bg-primary transition-colors relative"
            style={{ width: `${volume}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <button onClick={() => navigate("/queue")} className="text-subdued hover:text-bright transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
