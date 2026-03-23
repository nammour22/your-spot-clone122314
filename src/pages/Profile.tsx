import { useNavigate } from "react-router-dom";
import { User, Settings, LogOut, ChevronRight, Music2 } from "lucide-react";
import { currentUser, playlists, formatNumber } from "@/data/mockData";
import { toast } from "sonner";

export default function ProfilePage() {
  const navigate = useNavigate();
  const ownPlaylists = playlists.filter((p) => p.isOwn);

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[hsl(0,0%,14%)] via-[hsl(0,0%,7%)] to-background rounded-lg">
      <div className="p-4 md:p-8">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-surface-highlight flex items-center justify-center">
            <User className="w-16 h-16 text-subdued" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase text-subdued tracking-wider mb-1">Profile</p>
            <h1 className="text-3xl md:text-4xl font-bold text-bright mb-2" style={{ lineHeight: 1.1 }}>{currentUser.name}</h1>
            <p className="text-sm text-subdued">
              {ownPlaylists.length} Playlists • {currentUser.followers} Followers • {currentUser.following} Following
            </p>
            <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
              <Music2 className="w-3 h-3" />
              {currentUser.plan === "premium" ? "Premium" : "Free"}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-1 max-w-lg">
          <button
            onClick={() => navigate("/settings")}
            className="w-full flex items-center justify-between px-4 py-4 rounded-lg hover:bg-surface-highlight transition-colors active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-subdued" />
              <span className="text-sm font-medium text-bright">Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-subdued" />
          </button>

          <button
            onClick={() => { toast("Logged out"); navigate("/login"); }}
            className="w-full flex items-center justify-between px-4 py-4 rounded-lg hover:bg-surface-highlight transition-colors active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-subdued" />
              <span className="text-sm font-medium text-bright">Log out</span>
            </div>
            <ChevronRight className="w-5 h-5 text-subdued" />
          </button>
        </div>

        {/* Public playlists */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-bright mb-4">Public Playlists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {ownPlaylists.map((pl) => (
              <button
                key={pl.id}
                onClick={() => navigate(`/playlist/${pl.id}`)}
                className="spotify-card text-left"
              >
                <img src={pl.cover} alt={pl.title} className="w-full aspect-square rounded-md object-cover shadow-lg mb-3" />
                <p className="text-sm font-semibold text-bright truncate">{pl.title}</p>
                <p className="text-xs text-subdued">{pl.songIds.length} songs</p>
              </button>
            ))}
          </div>
        </section>

        <div className="h-8" />
      </div>
    </div>
  );
}
