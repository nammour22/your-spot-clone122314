import { Play } from "lucide-react";
import cover1 from "@/assets/cover1.jpg";
import cover2 from "@/assets/cover2.jpg";
import cover3 from "@/assets/cover3.jpg";
import cover4 from "@/assets/cover4.jpg";
import cover5 from "@/assets/cover5.jpg";
import cover6 from "@/assets/cover6.jpg";

const quickPicks = [
  { name: "Liked Songs", img: cover1, gradient: "from-[hsl(260,80%,50%)] to-[hsl(200,80%,60%)]" },
  { name: "Summer Vibes", img: cover1 },
  { name: "Late Night Chill", img: cover2 },
  { name: "Workout Energy", img: cover3 },
  { name: "Morning Coffee", img: cover4 },
  { name: "Road Trip", img: cover6 },
];

const sections = [
  {
    title: "Made For You",
    items: [
      { name: "Daily Mix 1", desc: "Crimson Waves, Luna Shore, Echo Drift", img: cover1 },
      { name: "Daily Mix 2", desc: "Neon Pulse, Shadow Arc, Frost Giant", img: cover2 },
      { name: "Discover Weekly", desc: "Your weekly mixtape of fresh music", img: cover3 },
      { name: "Release Radar", desc: "Catch all the latest from artists you follow", img: cover4 },
      { name: "Time Capsule", desc: "Songs you loved in the past", img: cover5 },
    ],
  },
  {
    title: "Recently Played",
    items: [
      { name: "Chill Beats", desc: "Lo-fi hip hop for focus", img: cover5 },
      { name: "Sunset Drive", desc: "Retro synth vibes", img: cover6 },
      { name: "Electric Surge", desc: "High energy electronic", img: cover3 },
      { name: "Velvet Dusk", desc: "Smooth jazz & soul", img: cover2 },
      { name: "Ocean Sounds", desc: "Nature ambient mix", img: cover4 },
    ],
  },
  {
    title: "Popular Albums",
    items: [
      { name: "Neon Horizons", desc: "Crimson Waves", img: cover6 },
      { name: "Quiet Storm", desc: "Luna Shore", img: cover5 },
      { name: "Voltage", desc: "Echo Drift", img: cover3 },
      { name: "Amber Glow", desc: "Shadow Arc", img: cover1 },
      { name: "Crystal Waves", desc: "Frost Giant", img: cover2 },
    ],
  },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomeContent() {
  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[hsl(0,0%,14%)] via-[hsl(0,0%,7%)] to-background rounded-lg">
      <div className="p-4 md:p-8">
        {/* Greeting */}
        <h1 className="text-2xl md:text-3xl font-bold text-bright mb-6" style={{ lineHeight: 1.1 }}>
          {getGreeting()}
        </h1>

        {/* Quick Pick Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-10">
          {quickPicks.map((item) => (
            <button
              key={item.name}
              className="flex items-center bg-surface-highlight/60 hover:bg-surface-highlight rounded-md overflow-hidden group transition-colors active:scale-[0.98]"
            >
              {item.gradient ? (
                <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${item.gradient} flex-shrink-0`} />
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

        {/* Sections */}
        {sections.map((section, si) => (
          <section key={section.title} className="mb-8" style={{ animationDelay: `${si * 100}ms` }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-bright hover:underline cursor-pointer">{section.title}</h2>
              <button className="text-sm font-semibold text-subdued hover:text-bright transition-colors">Show all</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
              {section.items.map((item) => (
                <div key={item.name} className="spotify-card group">
                  <div className="relative mb-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full aspect-square rounded-md object-cover shadow-lg"
                    />
                    <div className="play-button-overlay">
                      <Play className="w-6 h-6 text-primary-foreground fill-current ml-0.5" />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-bright truncate">{item.name}</p>
                  <p className="text-xs text-subdued mt-1 line-clamp-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Bottom spacer for player bar */}
        <div className="h-8" />
      </div>
    </div>
  );
}
