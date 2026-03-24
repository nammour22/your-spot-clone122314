import { Play, Pause, Heart, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "@/contexts/PlayerContext";
import { useApp } from "@/contexts/AppContext";
import { type Song, formatDuration } from "@/data/mockData";
import { toast } from "sonner";

interface TrackRowProps {
  song: Song;
  index: number;
  queue?: Song[];
  showAlbum?: boolean;
  showCover?: boolean;
}

export default function TrackRow({ song, index, queue, showAlbum = true, showCover = true }: TrackRowProps) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const { isLiked, toggleLike } = useApp();
  const navigate = useNavigate();
  const isActive = currentSong?.id === song.id;
  const liked = isLiked(song.id);

  const handleClick = () => {
    if (isActive) {
      togglePlay();
    } else {
      playSong(song, queue);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(song.id);
    toast(liked ? "Removed from Liked Songs" : "Added to Liked Songs");
  };

  return (
    <div
      onClick={handleClick}
      className={`grid items-center gap-4 px-4 py-2 rounded-md cursor-pointer group transition-colors hover:bg-surface-highlight/60 active:scale-[0.99] ${
        isActive ? "bg-surface-highlight/40" : ""
      }`}
      style={{ gridTemplateColumns: showCover ? "24px 40px 1fr auto auto" : showAlbum ? "24px 1fr 1fr auto auto" : "24px 1fr auto auto" }}
    >
      {/* Index / Play icon */}
      <span className="text-sm text-subdued tabular-nums text-right w-6 group-hover:hidden">
        {isActive && isPlaying ? (
          <span className="text-primary text-xs">♫</span>
        ) : (
          index + 1
        )}
      </span>
      <span className="hidden group-hover:block w-6 text-center">
        {isActive && isPlaying ? (
          <Pause className="w-4 h-4 text-bright" />
        ) : (
          <Play className="w-4 h-4 text-bright fill-current" />
        )}
      </span>

      {/* Cover */}
      {showCover && (
        <img src={song.cover} alt={song.title} className="w-10 h-10 rounded object-cover" />
      )}

      {/* Title & Artist */}
      <div className="min-w-0">
        <p className={`text-sm font-medium truncate ${isActive ? "text-primary" : "text-bright"}`}>
          {song.title}
        </p>
        <p
          className="text-xs text-subdued truncate hover:underline cursor-pointer"
          onClick={(e) => { e.stopPropagation(); navigate(`/artist/${song.artistId}`); }}
        >
          {song.artist}
        </p>
      </div>

      {/* Album */}
      {showAlbum && !showCover && (
        <p
          className="text-sm text-subdued truncate hover:underline cursor-pointer hidden md:block"
          onClick={(e) => { e.stopPropagation(); navigate(`/album/${song.albumId}`); }}
        >
          {song.album}
        </p>
      )}

      {/* Like */}
      <button
        onClick={handleLike}
        className={`transition-colors ${liked ? "text-primary" : "text-subdued opacity-0 group-hover:opacity-100"}`}
      >
        <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
      </button>

      {/* Duration */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-subdued tabular-nums">{formatDuration(song.duration)}</span>
        <button
          onClick={(e) => { e.stopPropagation(); toast("More options coming soon"); }}
          className="text-subdued opacity-0 group-hover:opacity-100 hover:text-bright transition-colors"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
