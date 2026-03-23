import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Plus, LayoutGrid, List, Globe } from "lucide-react";
import FilterPills from "@/components/shared/FilterPills";
import MediaCard from "@/components/shared/MediaCard";
import { playlists, albums, artists, getSongsByIds } from "@/data/mockData";

const filters = ["Playlists", "Albums", "Artists"];

export default function LibraryPage() {
  const [filter, setFilter] = useState("Playlists");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[hsl(0,0%,14%)] via-[hsl(0,0%,7%)] to-background rounded-lg">
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-bright" style={{ lineHeight: 1.1 }}>Your Library</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="p-2 text-subdued hover:text-bright transition-colors"
            >
              {viewMode === "grid" ? <List className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
            </button>
            <button className="p-2 text-subdued hover:text-bright transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <FilterPills options={filters} active={filter} onChange={setFilter} />
        </div>

        {/* Liked Songs card */}
        {filter === "Playlists" && (
          <button
            onClick={() => navigate("/liked")}
            className="w-full flex items-center gap-4 p-4 mb-4 rounded-lg bg-gradient-to-r from-[hsl(260,80%,50%)/0.3] to-transparent hover:bg-surface-highlight/60 transition-colors active:scale-[0.99]"
          >
            <div className="w-16 h-16 rounded-md bg-gradient-to-br from-[hsl(260,80%,50%)] to-[hsl(200,80%,60%)] flex items-center justify-center flex-shrink-0">
              <Heart className="w-7 h-7 text-foreground fill-current" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold text-bright">Liked Songs</p>
              <p className="text-sm text-subdued">8 songs</p>
            </div>
          </button>
        )}

        {/* Content */}
        {filter === "Playlists" && (
          viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
              {playlists.map((pl) => (
                <MediaCard key={pl.id} id={pl.id} title={pl.title} subtitle={`${pl.songIds.length} songs • ${pl.owner}`} image={pl.cover} type="playlist" songs={getSongsByIds(pl.songIds)} />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {playlists.map((pl) => (
                <button key={pl.id} onClick={() => navigate(`/playlist/${pl.id}`)} className="flex items-center gap-3 w-full px-3 py-3 rounded-md hover:bg-surface-highlight transition-colors text-left active:scale-[0.99]">
                  <img src={pl.cover} alt={pl.title} className="w-12 h-12 rounded object-cover flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-bright truncate">{pl.title}</p>
                    <p className="text-xs text-subdued">{pl.songIds.length} songs • {pl.owner}</p>
                  </div>
                </button>
              ))}
            </div>
          )
        )}

        {filter === "Albums" && (
          viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
              {albums.map((al) => (
                <MediaCard key={al.id} id={al.id} title={al.title} subtitle={`${al.artist} • ${al.year}`} image={al.cover} type="album" songs={getSongsByIds(al.songIds)} />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {albums.map((al) => (
                <button key={al.id} onClick={() => navigate(`/album/${al.id}`)} className="flex items-center gap-3 w-full px-3 py-3 rounded-md hover:bg-surface-highlight transition-colors text-left active:scale-[0.99]">
                  <img src={al.cover} alt={al.title} className="w-12 h-12 rounded object-cover flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-bright truncate">{al.title}</p>
                    <p className="text-xs text-subdued">{al.artist} • {al.year}</p>
                  </div>
                </button>
              ))}
            </div>
          )
        )}

        {filter === "Artists" && (
          viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
              {artists.map((ar) => (
                <MediaCard key={ar.id} id={ar.id} title={ar.name} subtitle="Artist" image={ar.image} type="artist" rounded />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {artists.map((ar) => (
                <button key={ar.id} onClick={() => navigate(`/artist/${ar.id}`)} className="flex items-center gap-3 w-full px-3 py-3 rounded-md hover:bg-surface-highlight transition-colors text-left active:scale-[0.99]">
                  <img src={ar.image} alt={ar.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-bright truncate">{ar.name}</p>
                    <p className="text-xs text-subdued">Artist</p>
                  </div>
                </button>
              ))}
            </div>
          )
        )}

        <div className="h-8" />
      </div>
    </div>
  );
}
