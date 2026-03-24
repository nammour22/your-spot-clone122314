import { useParams, useNavigate } from "react-router-dom";
import { Play, Pause, UserPlus, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { useApp } from "@/contexts/AppContext";
import { getArtistById, getArtistSongs, getArtistAlbums, artists, formatNumber, getSongsByIds } from "@/data/mockData";
import TrackRow from "@/components/shared/TrackRow";
import MediaCard from "@/components/shared/MediaCard";
import { toast } from "sonner";

export default function ArtistPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playQueue, currentSong, isPlaying, togglePlay } = usePlayer();
  const { isFollowing, toggleFollow } = useApp();

  const artist = getArtistById(id || "");
  if (!artist) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-[hsl(0,0%,14%)] to-background rounded-lg">
        <p className="text-subdued">Artist not found</p>
      </div>
    );
  }

  const following = isFollowing(artist.id);
  const artistSongs = getArtistSongs(artist.id);
  const artistAlbums = getArtistAlbums(artist.id);
  const relatedArtists = artists.filter((a) => a.id !== artist.id).slice(0, 5);
  const isCurrentArtist = artistSongs.some((s) => s.id === currentSong?.id);

  const handlePlay = () => {
    if (isCurrentArtist && isPlaying) togglePlay();
    else playQueue(artistSongs);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[hsl(0,0%,14%)] via-[hsl(0,0%,7%)] to-background rounded-lg">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
        <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-6 left-6 md:left-8">
          {artist.verified && (
            <div className="flex items-center gap-1 mb-2">
              <CheckCircle2 className="w-5 h-5 text-primary fill-primary" />
              <span className="text-xs text-bright font-medium">Verified Artist</span>
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold text-bright" style={{ lineHeight: 1.05 }}>{artist.name}</h1>
          <p className="text-sm text-subdued mt-2">{formatNumber(artist.monthlyListeners)} monthly listeners</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 px-4 md:px-8 py-6">
        <button onClick={handlePlay} className="w-14 h-14 rounded-full bg-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg">
          {isCurrentArtist && isPlaying ? <Pause className="w-6 h-6 text-primary-foreground fill-current" /> : <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />}
        </button>
        <button
          onClick={() => { toggleFollow(artist.id); toast(following ? "Unfollowed" : "Following"); }}
          className={`px-6 py-2 rounded-full border text-sm font-semibold transition-colors ${following ? "border-primary text-primary" : "border-border text-bright hover:border-foreground"}`}
        >
          {following ? "Following" : "Follow"}
        </button>
        <button onClick={() => toast("More options coming soon")} className="text-subdued hover:text-bright transition-colors">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Popular tracks */}
      <section className="px-4 md:px-8 mb-8">
        <h2 className="text-xl font-bold text-bright mb-4">Popular</h2>
        {artistSongs.slice(0, 5).map((song, i) => (
          <TrackRow key={song.id} song={song} index={i} queue={artistSongs} />
        ))}
      </section>

      {/* Albums */}
      {artistAlbums.length > 0 && (
        <section className="px-4 md:px-8 mb-8">
          <h2 className="text-xl font-bold text-bright mb-4">Albums</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            {artistAlbums.map((al) => (
              <div key={al.id} className="min-w-[150px] max-w-[180px] flex-shrink-0">
                <MediaCard id={al.id} title={al.title} subtitle={`${al.year}`} image={al.cover} type="album" songs={getSongsByIds(al.songIds)} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Artists */}
      <section className="px-4 md:px-8 pb-8">
        <h2 className="text-xl font-bold text-bright mb-4">Fans also like</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {relatedArtists.map((ar) => (
            <div key={ar.id} className="min-w-[150px] max-w-[180px] flex-shrink-0">
              <MediaCard id={ar.id} title={ar.name} subtitle="Artist" image={ar.image} type="artist" rounded />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
