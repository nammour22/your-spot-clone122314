import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

interface TopBarProps {
  className?: string;
}

export default function TopBar({ className }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <div className={`flex items-center justify-between px-4 md:px-8 py-3 ${className ?? ""}`}>
      <div className="flex items-center gap-2">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-background/60 flex items-center justify-center text-bright hover:bg-background/80 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M11.03.47a.75.75 0 010 1.06L4.56 8l6.47 6.47a.75.75 0 11-1.06 1.06L2.44 8 9.97.47a.75.75 0 011.06 0z"/></svg>
        </button>
        <button onClick={() => navigate(1)} className="w-8 h-8 rounded-full bg-background/60 flex items-center justify-center text-bright hover:bg-background/80 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4.97.47a.75.75 0 000 1.06L11.44 8l-6.47 6.47a.75.75 0 101.06 1.06L13.56 8 6.03.47a.75.75 0 00-1.06 0z"/></svg>
        </button>
      </div>
      <button
        onClick={() => navigate("/profile")}
        className="w-8 h-8 rounded-full bg-surface-highlight flex items-center justify-center text-subdued hover:text-bright hover:scale-105 active:scale-95 transition-all"
      >
        <User className="w-4 h-4" />
      </button>
    </div>
  );
}
