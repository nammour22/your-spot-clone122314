import { X, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1, Heart, ListMusic, ChevronDown } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { formatDuration } from "@/data/mockData";
import TrackRow from "@/components/shared/TrackRow";
import { toast } from "sonner";
import { useState } from "react";

export default function QueuePage() {
  const { currentSong, queue, isPlaying, togglePlay, nextTrack, prevTrack, progress, setProgress, shuffle, toggleShuffle, repeat, cycleRepeat, toggleLike, removeFromQueue } = usePlayer();
  const [tab, setTab] = useState<"playing" | "queue">("playing");

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[hsl(0,0%,14%)] via-[hsl(0,0%,7%)] to-background rounded-lg">
      <div className="p-4 md:p-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button onClick={() => setTab("playing")} className={`pb-3 text-sm font-semibold transition-colors ${tab === "playing" ? "text-bright border-b-2 border-primary" : "text-subdued hover:text-bright"}`}>
            Now Playing
          </button>
          <button onClick={() => setTab("queue")} className={`pb-3 text-sm font-semibold transition-colors ${tab === "queue" ? "text-bright border-b-2 border-primary" : "text-subdued hover:text-bright"}`}>
            Queue ({queue.length})
          </button>
        </div>

        {tab === "playing" && currentSong && (
          <div className="flex flex-col items-center max-w-md mx-auto">
            <img src={currentSong.cover} alt={currentSong.title} className="w-64 h-64 md:w-80 md:h-80 rounded-lg object-cover shadow-2xl mb-8" />
            <div className="text-center w-full mb-6">
              <h2 className="text-2xl font-bold text-bright mb-1">{currentSong.title}</h2>
              <p className="text-subdued">{currentSong.artist}</p>
            </div>

            {/* Progress */}
            <div className="w-full mb-6">
              <div
                className="w-full h-1.5 bg-surface-highlight rounded-full cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setProgress(((e.clientX - rect.left) / rect.width) * 100);
                }}
              >
                <div className="h-full bg-foreground rounded-full group-hover:bg-primary transition-colors relative" style={{ width: `${progress}%` }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-subdued tabular-nums">{formatDuration(Math.floor(currentSong.duration * progress / 100))}</span>
                <span className="text-xs text-subdued tabular-nums">{formatDuration(currentSong.duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8 mb-8">
              <button onClick={toggleShuffle} className={`transition-colors ${shuffle ? "text-primary" : "text-subdued hover:text-bright"}`}>
                <Shuffle className="w-5 h-5" />
              </button>
              <button onClick={prevTrack} className="text-bright hover:scale-105 active:scale-95 transition-transform">
                <SkipBack className="w-6 h-6 fill-current" />
              </button>
              <button onClick={togglePlay} className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
                {isPlaying ? <Pause className="w-7 h-7 text-background fill-current" /> : <Play className="w-7 h-7 text-background fill-current ml-1" />}
              </button>
              <button onClick={nextTrack} className="text-bright hover:scale-105 active:scale-95 transition-transform">
                <SkipForward className="w-6 h-6 fill-current" />
              </button>
              <button onClick={cycleRepeat} className={`transition-colors ${repeat !== "off" ? "text-primary" : "text-subdued hover:text-bright"}`}>
                {repeat === "one" ? <Repeat1 className="w-5 h-5" /> : <Repeat className="w-5 h-5" />}
              </button>
            </div>

            {/* Like */}
            <button
              onClick={() => { toggleLike(currentSong.id); toast(currentSong.liked ? "Removed from Liked Songs" : "Added to Liked Songs"); }}
              className={`transition-colors ${currentSong.liked ? "text-primary" : "text-subdued hover:text-bright"}`}
            >
              <Heart className={`w-6 h-6 ${currentSong.liked ? "fill-current" : ""}`} />
            </button>
          </div>
        )}

        {tab === "queue" && (
          <div>
            {queue.length === 0 ? (
              <div className="text-center py-20">
                <ListMusic className="w-12 h-12 text-subdued mx-auto mb-4" />
                <p className="text-lg font-bold text-bright mb-1">Your queue is empty</p>
                <p className="text-sm text-subdued">Add songs to see them here.</p>
              </div>
            ) : (
              <>
                {currentSong && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-subdued uppercase tracking-wider mb-2">Now playing</h3>
                    <TrackRow song={currentSong} index={0} queue={queue} />
                  </div>
                )}
                <h3 className="text-sm font-semibold text-subdued uppercase tracking-wider mb-2">Next up</h3>
                {queue.filter((s) => s.id !== currentSong?.id).map((song, i) => (
                  <TrackRow key={`${song.id}-${i}`} song={song} index={i} queue={queue} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
