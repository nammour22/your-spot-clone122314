import { useNavigate } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  showAllLink?: string;
}

export default function SectionHeader({ title, showAllLink }: SectionHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl md:text-2xl font-bold text-bright hover:underline cursor-pointer">{title}</h2>
      {showAllLink && (
        <button
          onClick={() => navigate(showAllLink)}
          className="text-sm font-semibold text-subdued hover:text-bright transition-colors"
        >
          Show all
        </button>
      )}
    </div>
  );
}
