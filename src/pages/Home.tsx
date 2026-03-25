import { Play, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "@/contexts/PlayerContext";
import MediaCard from "@/components/shared/MediaCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { albums, artists, playlists, getSongsByIds } from "@/data/mockData";

const quickPicks = [
  { name: "Liked Songs", route: "/liked", gradient: "from-[hsl(260,80%,50%)] to-[hsl(200,80%,60%)]", icon: true },
  { name: "Summer Vibes", route: "/playlist/pl1", img: playlists[0].cover },
  { name: "Late Night Chill", route: "/playlist/pl2", img: playlists[1].cover },
  { name: "Workout Energy", route: "/playlist/pl3", img: playlists[2].cover },
  { name: "Morning Coffee", route: "/playlist/pl4", img: playlists[3].cover },
  { name: "Road Trip", route: "/playlist/pl5", img: playlists[4].cover },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomePage() {
  const navigate = useNavigate();
  const { playQueue } = usePlayer();

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[hsl(0,0%,14%)] via-[hsl(0,0%,7%)] to-background rounded-lg">
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-bright mb-6" style={{ lineHeight: 1.1 }}>
          {getGreeting()}
        </h1>

        {/* Quick Pick Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-10">
          {quickPicks.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.route)}
              className="flex items-center bg-surface-highlight/60 hover:bg-surface-highlight rounded-md overflow-hidden group transition-colors active:scale-[0.98]"
            >
              {item.icon ? (
                <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${item.gradient} flex-shrink-0 flex items-center justify-center`}>
                  <Heart className="w-5 h-5 text-foreground fill-current" />
                </div>
              ) : (
                <img src={item.img} alt={item.name} className="w-12 h-12 md:w-16 md:h-16 object-cover flex-shrink-0" />
              )}
              <span className="px-3 text-sm font-semibold text-bright truncate flex-1 text-left">{item.name}</span>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3 opacity-0 group-hover:opacity-100 shadow-xl transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
              </div>
            </button>
          ))}
        </div>

        {/* Made For You */}
        <section className="mb-8">
          <SectionHeader title="Made For You" showAllLink="/search" />
          <div className="flex gap-3 md:gap-5 overflow-x-auto pb-2 scrollbar-none">
            {playlists.slice(0, 5).map((pl) => (
              <div key={pl.id} className="min-w-[150px] max-w-[180px] flex-shrink-0">
                <MediaCard
                  id={pl.id}
                  title={pl.title}
                  subtitle={pl.description}
                  image={pl.cover}
                  type="playlist"
                  songs={getSongsByIds(pl.songIds)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Recently Played */}
        <section className="mb-8">
          <SectionHeader title="Recently Played" />
          <div className="flex gap-3 md:gap-5 overflow-x-auto pb-2 scrollbar-none">
            {albums.map((al) => (
              <div key={al.id} className="min-w-[150px] max-w-[180px] flex-shrink-0">
                <MediaCard
                  id={al.id}
                  title={al.title}
                  subtitle={al.artist}
                  image={al.cover}
                  type="album"
                  songs={getSongsByIds(al.songIds)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Popular Albums */}
        <section className="mb-8">
          <SectionHeader title="Popular Albums" />
          <div className="flex gap-3 md:gap-5 overflow-x-auto pb-2 scrollbar-none">
            {[...albums].reverse().map((al) => (
              <div key={al.id} className="min-w-[150px] max-w-[180px] flex-shrink-0">
                <MediaCard id={al.id} title={al.title} subtitle={al.artist} image={al.cover} type="album" songs={getSongsByIds(al.songIds)} />
              </div>
            ))}
          </div>
        </section>

        {/* Trending Artists */}
        <section className="mb-8">
          <SectionHeader title="Trending Artists" />
          <div className="flex gap-3 md:gap-5 overflow-x-auto pb-2 scrollbar-none">
            {artists.slice(0, 6).map((ar) => (
              <div key={ar.id} className="min-w-[150px] max-w-[180px] flex-shrink-0">
                <MediaCard id={ar.id} title={ar.name} subtitle="Artist" image={ar.image} type="artist" rounded />
              </div>
            ))}
          </div>
        </section>

        {/* Your Playlists */}
        <section className="mb-8">
          <SectionHeader title="Your Playlists" showAllLink="/library" />
          <div className="flex gap-3 md:gap-5 overflow-x-auto pb-2 scrollbar-none">
            {playlists.filter((p) => p.isOwn).map((pl) => (
              <div key={pl.id} className="min-w-[150px] max-w-[180px] flex-shrink-0">
                <MediaCard id={pl.id} title={pl.title} subtitle={`${pl.songIds.length} songs`} image={pl.cover} type="playlist" songs={getSongsByIds(pl.songIds)} />
              </div>
            ))}
          </div>
        </section>

        <div className="h-8" />
      </div>
    </div>
  );
}
