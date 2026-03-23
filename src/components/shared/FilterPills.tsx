interface FilterPillsProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}

export default function FilterPills({ options, active, onChange }: FilterPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`nav-pill whitespace-nowrap text-xs ${
            active === opt ? "nav-pill-active" : "nav-pill-inactive"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
