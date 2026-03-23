import { useParams, useNavigate } from "react-router-dom";
import { Play, Pause, Heart, MoreHorizontal, Clock } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { getAlbumById, getSongsByIds, formatDuration } from "@/data/mockData";
import TrackRow from "@/components/shared/TrackRow";
import { toast } from "sonner";

export default function AlbumPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playQueue, currentSong, isPlaying, togglePlay } = usePlayer();

  const album = getAlbumById(id || "");
  if (!album) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-[hsl(0,0%,14%)] to-background rounded-lg">
        <p className="text-subdued">Album not found</p>
      </div>
    );
  }

  const trackList = getSongsByIds(album.songIds);
  const totalDuration = trackList.reduce((sum, s) => sum + s.duration, 0);
  const isCurrentAlbum = trackList.some((s) => s.id === currentSong?.id);

  const handlePlayAll = () => {
    if (isCurrentAlbum && isPlaying) togglePlay();
    else playQueue(trackList);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[hsl(0,0%,14%)] via-[hsl(0,0%,7%)] to-background rounded-lg">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 p-4 md:p-8 pb-6">
        <img src={album.cover} alt={album.title} className="w-48 h-48 md:w-56 md:h-56 rounded-lg object-cover shadow-2xl" />
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold uppercase text-subdued tracking-wider mb-2">Album</p>
          <h1 className="text-3xl md:text-5xl font-bold text-bright mb-4" style={{ lineHeight: 1.05 }}>{album.title}</h1>
          <p className="text-sm text-subdued">
            <span onClick={() => navigate(`/artist/${album.artistId}`)} className="text-bright font-medium hover:underline cursor-pointer">{album.artist}</span>
            {" "}• {album.year} • {trackList.length} songs, {Math.floor(totalDuration / 60)} min
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 px-4 md:px-8 mb-6">
        <button onClick={handlePlayAll} className="w-14 h-14 rounded-full bg-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg">
          {isCurrentAlbum && isPlaying ? <Pause className="w-6 h-6 text-primary-foreground fill-current" /> : <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />}
        </button>
        <button onClick={() => toast("Saved to library!")} className="text-subdued hover:text-primary transition-colors"><Heart className="w-6 h-6" /></button>
        <button onClick={() => toast("More options coming soon")} className="text-subdued hover:text-bright transition-colors"><MoreHorizontal className="w-6 h-6" /></button>
      </div>

      <div className="px-0 md:px-4 pb-8">
        {trackList.map((song, i) => (
          <TrackRow key={song.id} song={song} index={i} queue={trackList} showCover={false} />
        ))}
      </div>
    </div>
  );
}
