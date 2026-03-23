import { Home, Search, Library } from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="md:hidden bg-gradient-to-t from-background to-background/90 border-t border-border flex items-center justify-around py-2 px-4">
      <button className="flex flex-col items-center gap-1 text-bright">
        <Home className="w-6 h-6" />
        <span className="text-[10px] font-semibold">Home</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-subdued">
        <Search className="w-6 h-6" />
        <span className="text-[10px] font-semibold">Search</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-subdued">
        <Library className="w-6 h-6" />
        <span className="text-[10px] font-semibold">Your Library</span>
      </button>
    </nav>
  );
}
