import { useState } from "react";
import {
  Play, Pause, SkipBack, SkipForward, Repeat, Shuffle,
  Volume2, Maximize2, ListMusic, MonitorSpeaker, Heart, PictureInPicture2,
} from "lucide-react";
import cover1 from "@/assets/cover1.jpg";

export default function PlayerBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(72);

  return (
    <footer className="bg-player-bar border-t border-border h-[72px] md:h-[90px] flex items-center px-2 md:px-4 gap-2 md:gap-4 z-50">
      {/* Now Playing */}
      <div className="flex items-center gap-3 w-[30%] min-w-0">
        <img src={cover1} alt="Now playing" className="w-14 h-14 rounded-md object-cover hidden md:block" />
        <img src={cover1} alt="Now playing" className="w-10 h-10 rounded-md object-cover md:hidden" />
        <div className="min-w-0 hidden sm:block">
          <p className="text-sm font-medium text-bright truncate hover:underline cursor-pointer">Sunset Dreams</p>
          <p className="text-xs text-subdued truncate hover:underline cursor-pointer">Crimson Waves</p>
        </div>
        <button className="text-subdued hover:text-primary transition-colors hidden sm:block ml-1">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-col items-center flex-1 max-w-[722px] gap-1">
        <div className="flex items-center gap-3 md:gap-5">
          <button className="text-subdued hover:text-bright transition-colors hidden md:block">
            <Shuffle className="w-4 h-4" />
          </button>
          <button className="text-subdued hover:text-bright transition-colors">
            <SkipBack className="w-4 h-4 fill-current" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-background fill-current" />
            ) : (
              <Play className="w-4 h-4 text-background fill-current ml-0.5" />
            )}
          </button>
          <button className="text-subdued hover:text-bright transition-colors">
            <SkipForward className="w-4 h-4 fill-current" />
          </button>
          <button className="text-subdued hover:text-bright transition-colors hidden md:block">
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-[11px] text-subdued tabular-nums w-8 text-right">1:12</span>
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
          <span className="text-[11px] text-subdued tabular-nums w-8">3:24</span>
        </div>
      </div>

      {/* Volume & Extra */}
      <div className="hidden md:flex items-center gap-2 w-[30%] justify-end">
        <button className="text-subdued hover:text-bright transition-colors">
          <PictureInPicture2 className="w-4 h-4" />
        </button>
        <button className="text-subdued hover:text-bright transition-colors">
          <ListMusic className="w-4 h-4" />
        </button>
        <button className="text-subdued hover:text-bright transition-colors">
          <MonitorSpeaker className="w-4 h-4" />
        </button>
        <button className="text-subdued hover:text-bright transition-colors">
          <Volume2 className="w-4 h-4" />
        </button>
        <div
          className="w-24 h-1 bg-surface-highlight rounded-full cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setVolume(((e.clientX - rect.left) / rect.width) * 100);
          }}
        >
          <div
            className="h-full bg-foreground rounded-full group-hover:bg-primary transition-colors relative"
            style={{ width: `${volume}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <button className="text-subdued hover:text-bright transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
