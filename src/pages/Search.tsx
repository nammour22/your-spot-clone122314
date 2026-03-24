import { useState, useMemo } from "react";
import { Search as SearchIcon, X, Clock } from "lucide-react";
import { searchAll, getSongsByIds } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import FilterPills from "@/components/shared/FilterPills";
import MediaCard from "@/components/shared/MediaCard";
import TrackRow from "@/components/shared/TrackRow";

const categories = [
  { name: "Pop", color: "hsl(340, 70%, 45%)" },
  { name: "Hip-Hop", color: "hsl(30, 80%, 45%)" },
  { name: "Rock", color: "hsl(200, 70%, 40%)" },
  { name: "Electronic", color: "hsl(270, 70%, 50%)" },
  { name: "R&B", color: "hsl(0, 60%, 40%)" },
  { name: "Jazz", color: "hsl(45, 70%, 40%)" },
  { name: "Classical", color: "hsl(180, 50%, 35%)" },
  { name: "Indie", color: "hsl(140, 60%, 35%)" },
  { name: "Country", color: "hsl(20, 70%, 40%)" },
  { name: "Metal", color: "hsl(0, 0%, 30%)" },
  { name: "Latin", color: "hsl(10, 80%, 50%)" },
  { name: "Podcasts", color: "hsl(160, 60%, 35%)" },
];

const filters = ["All", "Songs", "Albums", "Artists", "Playlists"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useApp();

  const results = useMemo(() => {
    if (!query.trim()) return null;
    return searchAll(query);
  }, [query]);

  const hasResults = results && (results.songs.length || results.albums.length || results.artists.length || results.playlists.length);

  const handleSearch = (term: string) => {
    setQuery(term);
    if (term.trim()) addRecentSearch(term);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[hsl(0,0%,14%)] via-[hsl(0,0%,7%)] to-background rounded-lg">
      <div className="p-4 md:p-8">
        {/* Search Input */}
        <div className="relative max-w-md mb-6">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-subdued" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && query.trim()) addRecentSearch(query); }}
            placeholder="What do you want to listen to?"
            className="w-full h-12 pl-12 pr-10 rounded-full bg-surface-highlight border-none text-bright placeholder:text-subdued focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-subdued hover:text-bright">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* No query → browse */}
        {!query.trim() && (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-bright">Recent searches</h2>
                  <button onClick={clearRecentSearches} className="text-sm font-semibold text-subdued hover:text-bright transition-colors">
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSearch(s)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-highlight hover:bg-surface-press text-sm text-bright transition-colors group"
                    >
                      <Clock className="w-4 h-4 text-subdued" />
                      {s}
                      <span
                        onClick={(e) => { e.stopPropagation(); removeRecentSearch(s); }}
                        className="ml-1 text-subdued hover:text-bright opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            <h2 className="text-xl font-bold text-bright mb-4">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleSearch(cat.name)}
                  className="relative h-28 md:h-36 rounded-lg overflow-hidden group active:scale-[0.98] transition-transform"
                  style={{ backgroundColor: cat.color }}
                >
                  <span className="absolute top-4 left-4 text-lg font-bold text-bright">{cat.name}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Search Results */}
        {query.trim() && (
          <>
            <FilterPills options={filters} active={filter} onChange={setFilter} />

            {!hasResults && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-xl font-bold text-bright mb-2">No results found for "{query}"</p>
                <p className="text-sm text-subdued">Check your spelling or try different keywords.</p>
              </div>
            )}

            {hasResults && (
              <div className="mt-6 space-y-8">
                {(filter === "All" || filter === "Songs") && results!.songs.length > 0 && (
                  <section>
                    <h3 className="text-lg font-bold text-bright mb-3">Songs</h3>
                    {results!.songs.slice(0, 5).map((song, i) => (
                      <TrackRow key={song.id} song={song} index={i} queue={results!.songs} />
                    ))}
                  </section>
                )}

                {(filter === "All" || filter === "Artists") && results!.artists.length > 0 && (
                  <section>
                    <h3 className="text-lg font-bold text-bright mb-3">Artists</h3>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                      {results!.artists.map((ar) => (
                        <div key={ar.id} className="min-w-[150px] max-w-[180px] flex-shrink-0">
                          <MediaCard id={ar.id} title={ar.name} subtitle="Artist" image={ar.image} type="artist" rounded />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {(filter === "All" || filter === "Albums") && results!.albums.length > 0 && (
                  <section>
                    <h3 className="text-lg font-bold text-bright mb-3">Albums</h3>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                      {results!.albums.map((al) => (
                        <div key={al.id} className="min-w-[150px] max-w-[180px] flex-shrink-0">
                          <MediaCard id={al.id} title={al.title} subtitle={al.artist} image={al.cover} type="album" songs={getSongsByIds(al.songIds)} />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {(filter === "All" || filter === "Playlists") && results!.playlists.length > 0 && (
                  <section>
                    <h3 className="text-lg font-bold text-bright mb-3">Playlists</h3>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                      {results!.playlists.map((pl) => (
                        <div key={pl.id} className="min-w-[150px] max-w-[180px] flex-shrink-0">
                          <MediaCard id={pl.id} title={pl.title} subtitle={pl.description} image={pl.cover} type="playlist" songs={getSongsByIds(pl.songIds)} />
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </>
        )}

        <div className="h-8" />
      </div>
    </div>
  );
}
