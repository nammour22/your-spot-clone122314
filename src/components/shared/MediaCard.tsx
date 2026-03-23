import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "@/contexts/PlayerContext";
import { type Song } from "@/data/mockData";

interface MediaCardProps {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  type: "playlist" | "album" | "artist";
  songs?: Song[];
  rounded?: boolean;
}

export default function MediaCard({ id, title, subtitle, image, type, songs, rounded }: MediaCardProps) {
  const navigate = useNavigate();
  const { playQueue } = usePlayer();

  const handleClick = () => {
    navigate(`/${type}/${id}`);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (songs?.length) playQueue(songs);
  };

  return (
    <div onClick={handleClick} className="spotify-card group">
      <div className="relative mb-4">
        <img
          src={image}
          alt={title}
          className={`w-full aspect-square object-cover shadow-lg ${rounded ? "rounded-full" : "rounded-md"}`}
        />
        <button onClick={handlePlay} className="play-button-overlay" aria-label={`Play ${title}`}>
          <Play className="w-6 h-6 text-primary-foreground fill-current ml-0.5" />
        </button>
      </div>
      <p className="text-sm font-semibold text-bright truncate">{title}</p>
      <p className="text-xs text-subdued mt-1 line-clamp-2">{subtitle}</p>
    </div>
  );
}
