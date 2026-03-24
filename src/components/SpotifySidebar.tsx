import { Home, Search, Library, Plus, Heart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { playlists, albums } from "@/data/mockData";

interface SpotifySidebarProps {
  className?: string;
}

const filters = ["Playlists", "Albums", "Artists"];

export default function SpotifySidebar({ className }: SpotifySidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { likedCount } = useApp();
  const [filter, setFilter] = React.useState("Playlists");

  const isActive = (path: string) => location.pathname === path;

  const libraryItems = [
    { name: "Liked Songs", type: "Playlist", route: "/liked", img: null, count: `${likedCount} songs`, isLiked: true },
    ...playlists.slice(0, 5).map((pl) => ({
      name: pl.title, type: "Playlist", route: `/playlist/${pl.id}`, img: pl.cover, count: `${pl.songIds.length} songs`, isLiked: false,
    })),
    ...albums.slice(0, 2).map((al) => ({
      name: al.title, type: "Album", route: `/album/${al.id}`, img: al.cover, count: al.artist, isLiked: false,
    })),
  ];

  return (
    <aside className={`flex flex-col gap-2 h-full ${className ?? ""}`}>
      {/* Nav Section */}
      <div className="bg-sidebar-card rounded-lg px-3 py-4 flex flex-col gap-5">
        <button
          onClick={() => navigate("/")}
          className={`flex items-center gap-4 px-3 font-bold text-base hover:text-foreground transition-colors ${isActive("/") ? "text-bright" : "text-subdued"}`}
        >
          <Home className="w-6 h-6" />
          <span>Home</span>
        </button>
        <button
          onClick={() => navigate("/search")}
          className={`flex items-center gap-4 px-3 font-semibold text-base hover:text-foreground transition-colors ${isActive("/search") ? "text-bright" : "text-subdued"}`}
        >
          <Search className="w-6 h-6" />
          <span>Search</span>
        </button>
      </div>

      {/* Library Section */}
      <div className="bg-sidebar-card rounded-lg flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate("/library")}
            className={`flex items-center gap-3 hover:text-foreground transition-colors ${isActive("/library") ? "text-bright" : "text-subdued"}`}
          >
            <Library className="w-6 h-6" />
            <span className="font-semibold text-base">Your Library</span>
          </button>
          <button className="text-subdued hover:text-foreground hover:bg-surface-highlight rounded-full p-1 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 px-4 pb-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`nav-pill text-xs ${filter === f ? "nav-pill-active" : "nav-pill-inactive"}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Library list */}
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {libraryItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.route)}
              className={`flex items-center gap-3 w-full px-2 py-2 rounded-md hover:bg-surface-highlight transition-colors text-left active:scale-[0.99] ${
                location.pathname === item.route ? "bg-surface-highlight/60" : ""
              }`}
            >
              {item.isLiked ? (
                <div className="w-12 h-12 rounded-md bg-gradient-to-br from-[hsl(260,80%,60%)] to-[hsl(200,80%,70%)] flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-foreground fill-current" />
                </div>
              ) : item.img ? (
                <img src={item.img} alt={item.name} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-md bg-surface-highlight flex items-center justify-center flex-shrink-0" />
              )}
              <div className="min-w-0">
                <p className={`text-sm font-medium truncate ${location.pathname === item.route ? "text-primary" : "text-bright"}`}>{item.name}</p>
                <p className="text-xs text-subdued truncate">
                  {item.type} · {item.count}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

import React from "react";
