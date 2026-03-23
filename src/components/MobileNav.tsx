import { Home, Search, Library } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden bg-gradient-to-t from-background to-background/90 border-t border-border flex items-center justify-around py-2 px-4">
      <button onClick={() => navigate("/")} className={`flex flex-col items-center gap-1 ${isActive("/") ? "text-bright" : "text-subdued"}`}>
        <Home className="w-6 h-6" />
        <span className="text-[10px] font-semibold">Home</span>
      </button>
      <button onClick={() => navigate("/search")} className={`flex flex-col items-center gap-1 ${isActive("/search") ? "text-bright" : "text-subdued"}`}>
        <Search className="w-6 h-6" />
        <span className="text-[10px] font-semibold">Search</span>
      </button>
      <button onClick={() => navigate("/library")} className={`flex flex-col items-center gap-1 ${isActive("/library") ? "text-bright" : "text-subdued"}`}>
        <Library className="w-6 h-6" />
        <span className="text-[10px] font-semibold">Your Library</span>
      </button>
    </nav>
  );
}
