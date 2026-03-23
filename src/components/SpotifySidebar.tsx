import { Home, Search, Library, Plus, Heart, Globe } from "lucide-react";
import cover1 from "@/assets/cover1.jpg";
import cover2 from "@/assets/cover2.jpg";
import cover5 from "@/assets/cover5.jpg";

const libraryItems = [
  { name: "Liked Songs", type: "Playlist", pin: true, img: null, count: "312 songs" },
  { name: "Summer Vibes", type: "Playlist", pin: false, img: cover1, count: "48 songs" },
  { name: "Late Night Chill", type: "Playlist", pin: false, img: cover2, count: "65 songs" },
  { name: "Dream State", type: "Album", pin: false, img: cover5, count: "Aurora Wave" },
  { name: "Workout Energy", type: "Playlist", pin: false, img: null, count: "92 songs" },
  { name: "Morning Coffee", type: "Playlist", pin: false, img: null, count: "34 songs" },
  { name: "Road Trip", type: "Playlist", pin: false, img: null, count: "77 songs" },
];

interface SpotifySidebarProps {
  className?: string;
}

export default function SpotifySidebar({ className }: SpotifySidebarProps) {
  return (
    <aside className={`flex flex-col gap-2 h-full ${className ?? ""}`}>
      {/* Nav Section */}
      <div className="bg-sidebar-card rounded-lg px-3 py-4 flex flex-col gap-5">
        <button className="flex items-center gap-4 px-3 text-bright font-bold text-base hover:text-foreground transition-colors">
          <Home className="w-6 h-6" />
          <span>Home</span>
        </button>
        <button className="flex items-center gap-4 px-3 text-subdued font-semibold text-base hover:text-foreground transition-colors">
          <Search className="w-6 h-6" />
          <span>Search</span>
        </button>
      </div>

      {/* Library Section */}
      <div className="bg-sidebar-card rounded-lg flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="flex items-center gap-3 text-subdued hover:text-foreground transition-colors">
            <Library className="w-6 h-6" />
            <span className="font-semibold text-base">Your Library</span>
          </button>
          <button className="text-subdued hover:text-foreground hover:bg-surface-highlight rounded-full p-1 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 px-4 pb-2">
          <span className="nav-pill nav-pill-active text-xs">Playlists</span>
          <span className="nav-pill nav-pill-inactive text-xs">Albums</span>
          <span className="nav-pill nav-pill-inactive text-xs">Artists</span>
        </div>

        {/* Library list */}
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {libraryItems.map((item) => (
            <button
              key={item.name}
              className="flex items-center gap-3 w-full px-2 py-2 rounded-md hover:bg-surface-highlight transition-colors text-left"
            >
              {item.name === "Liked Songs" ? (
                <div className="w-12 h-12 rounded-md bg-gradient-to-br from-[hsl(260,80%,60%)] to-[hsl(200,80%,70%)] flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-foreground fill-current" />
                </div>
              ) : item.img ? (
                <img src={item.img} alt={item.name} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-md bg-surface-highlight flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-subdued" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium text-bright truncate">{item.name}</p>
                <p className="text-xs text-subdued truncate">
                  {item.pin && "📌 "}{item.type} · {item.count}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
