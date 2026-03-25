import { useParams, useNavigate } from "react-router-dom";
import { Play, Pause, Heart, MoreHorizontal, Clock, Shuffle } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { useApp } from "@/contexts/AppContext";
import { getPlaylistById, getSongsByIds } from "@/data/mockData";
import TrackRow from "@/components/shared/TrackRow";
import { toast } from "sonner";

export default function PlaylistPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playQueue, currentSong, isPlaying, togglePlay } = usePlayer();
  const { isPlaylistSaved, toggleSavePlaylist } = useApp();

  const playlist = getPlaylistById(id || "");
  if (!playlist) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-[hsl(0,0%,14%)] to-background rounded-lg">
        <p className="text-subdued">Playlist not found</p>
      </div>
    );
  }

  const trackList = getSongsByIds(playlist.songIds);
  const totalDuration = trackList.reduce((sum, s) => sum + s.duration, 0);
  const isCurrentPlaylist = trackList.some((s) => s.id === currentSong?.id);
  const saved = isPlaylistSaved(playlist.id);

  const handlePlayAll = () => {
    if (isCurrentPlaylist && isPlaying) {
      togglePlay();
    } else {
      playQueue(trackList);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[hsl(0,0%,14%)] via-[hsl(0,0%,7%)] to-background rounded-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 p-4 md:p-8 pb-6">
        <img src={playlist.cover} alt={playlist.title} className="w-48 h-48 md:w-56 md:h-56 rounded-lg object-cover shadow-2xl" />
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold uppercase text-subdued tracking-wider mb-2">Playlist</p>
          <h1 className="text-3xl md:text-5xl font-bold text-bright mb-4" style={{ lineHeight: 1.05 }}>{playlist.title}</h1>
          <p className="text-sm text-subdued mb-2">{playlist.description}</p>
          <p className="text-sm text-subdued">
            <span className="text-bright font-medium">{playlist.owner}</span> • {trackList.length} songs, {Math.floor(totalDuration / 60)} min
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 px-4 md:px-8 mb-6">
        <button
          onClick={handlePlayAll}
          className="w-14 h-14 rounded-full bg-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg"
        >
          {isCurrentPlaylist && isPlaying ? (
            <Pause className="w-6 h-6 text-primary-foreground fill-current" />
          ) : (
            <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
          )}
        </button>
        <button onClick={() => playQueue([...trackList].sort(() => Math.random() - 0.5))} className="text-subdued hover:text-bright transition-colors">
          <Shuffle className="w-6 h-6" />
        </button>
        <button
          onClick={() => {
            toggleSavePlaylist(playlist.id);
            toast(saved ? "Removed from Your Library" : "Saved to Your Library");
          }}
          className={`transition-colors ${saved ? "text-primary" : "text-subdued hover:text-primary"}`}
        >
          <Heart className={`w-6 h-6 ${saved ? "fill-current" : ""}`} />
        </button>
        <button onClick={() => toast("More options coming soon")} className="text-subdued hover:text-bright transition-colors">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Track header */}
      <div className="grid items-center gap-4 px-8 py-2 border-b border-border text-xs text-subdued uppercase tracking-wider hidden md:grid" style={{ gridTemplateColumns: "24px 40px 1fr auto auto" }}>
        <span className="text-right">#</span>
        <span />
        <span>Title</span>
        <span />
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4" />
          <span className="w-4" />
        </div>
      </div>

      {/* Tracks */}
      <div className="px-0 md:px-4 pb-8">
        {trackList.map((song, i) => (
          <TrackRow key={song.id} song={song} index={i} queue={trackList} />
        ))}
      </div>
    </div>
  );
}
