import { Play, Pause, Shuffle, Heart, Clock } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { useApp } from "@/contexts/AppContext";
import TrackRow from "@/components/shared/TrackRow";

export default function LikedSongsPage() {
  const { getLikedSongs, likedCount } = useApp();
  const { playQueue, currentSong, isPlaying, togglePlay } = usePlayer();

  const likedSongs = getLikedSongs();
  const isCurrentLiked = likedSongs.some((s) => s.id === currentSong?.id);
  const totalDuration = likedSongs.reduce((sum, s) => sum + s.duration, 0);

  const handlePlay = () => {
    if (isCurrentLiked && isPlaying) togglePlay();
    else if (likedSongs.length > 0) playQueue(likedSongs);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[hsl(260,60%,25%)] via-[hsl(0,0%,7%)] to-background rounded-lg">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 p-4 md:p-8 pb-6">
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-lg bg-gradient-to-br from-[hsl(260,80%,50%)] to-[hsl(200,80%,60%)] flex items-center justify-center shadow-2xl">
          <Heart className="w-20 h-20 text-foreground fill-current" />
        </div>
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold uppercase text-subdued tracking-wider mb-2">Playlist</p>
          <h1 className="text-3xl md:text-5xl font-bold text-bright mb-4" style={{ lineHeight: 1.05 }}>Liked Songs</h1>
          <p className="text-sm text-subdued">{likedCount} songs, {Math.floor(totalDuration / 60)} min</p>
        </div>
      </div>

      <div className="flex items-center gap-4 px-4 md:px-8 mb-6">
        <button onClick={handlePlay} className="w-14 h-14 rounded-full bg-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg">
          {isCurrentLiked && isPlaying ? <Pause className="w-6 h-6 text-primary-foreground fill-current" /> : <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />}
        </button>
        <button onClick={() => { if (likedSongs.length > 0) playQueue([...likedSongs].sort(() => Math.random() - 0.5)); }} className="text-subdued hover:text-bright transition-colors">
          <Shuffle className="w-6 h-6" />
        </button>
      </div>

      <div className="px-0 md:px-4 pb-8">
        {likedSongs.map((song, i) => (
          <TrackRow key={song.id} song={song} index={i} queue={likedSongs} />
        ))}
        {likedSongs.length === 0 && (
          <div className="text-center py-20">
            <Heart className="w-12 h-12 text-subdued mx-auto mb-4" />
            <p className="text-lg font-bold text-bright mb-1">Songs you like will appear here</p>
            <p className="text-sm text-subdued">Save songs by tapping the heart icon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
