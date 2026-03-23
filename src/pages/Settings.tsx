import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun, Volume2, Download, User, Info, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";

interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  action?: React.ReactNode;
  onClick?: () => void;
}

function SettingRow({ icon, label, description, action, onClick }: SettingRowProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-4 rounded-lg hover:bg-surface-highlight transition-colors active:scale-[0.99] text-left"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className="text-subdued flex-shrink-0">{icon}</span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-bright">{label}</p>
          {description && <p className="text-xs text-subdued mt-0.5">{description}</p>}
        </div>
      </div>
      {action || <ChevronRight className="w-5 h-5 text-subdued flex-shrink-0" />}
    </button>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${checked ? "bg-primary" : "bg-surface-highlight"}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-transform ${checked ? "translate-x-[22px]" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const [crossfade, setCrossfade] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [normalize, setNormalize] = useState(true);
  const [highQuality, setHighQuality] = useState(false);
  const [downloadWifi, setDownloadWifi] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[hsl(0,0%,14%)] via-[hsl(0,0%,7%)] to-background rounded-lg">
      <div className="p-4 md:p-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="text-subdued hover:text-bright transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-bright" style={{ lineHeight: 1.1 }}>Settings</h1>
        </div>

        {/* Account */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase text-subdued tracking-wider px-4 mb-2">Account</h2>
          <div className="space-y-1">
            <SettingRow icon={<User className="w-5 h-5" />} label="Edit profile" description="Name, photo, and bio" onClick={() => toast("Profile editing coming soon")} />
            <SettingRow
              icon={<span className="text-primary text-sm font-bold">P</span>}
              label="Subscription"
              description="Premium plan active"
              onClick={() => toast("Manage subscription coming soon")}
            />
          </div>
        </section>

        {/* Playback */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase text-subdued tracking-wider px-4 mb-2">Playback</h2>
          <div className="space-y-1">
            <SettingRow
              icon={<Volume2 className="w-5 h-5" />}
              label="Crossfade"
              description="Smooth transition between songs"
              action={<Toggle checked={crossfade} onChange={() => setCrossfade(!crossfade)} />}
              onClick={() => setCrossfade(!crossfade)}
            />
            <SettingRow
              icon={<Volume2 className="w-5 h-5" />}
              label="Autoplay"
              description="Play similar songs when queue ends"
              action={<Toggle checked={autoplay} onChange={() => setAutoplay(!autoplay)} />}
              onClick={() => setAutoplay(!autoplay)}
            />
            <SettingRow
              icon={<Volume2 className="w-5 h-5" />}
              label="Normalize volume"
              description="Set the same level for all songs"
              action={<Toggle checked={normalize} onChange={() => setNormalize(!normalize)} />}
              onClick={() => setNormalize(!normalize)}
            />
          </div>
        </section>

        {/* Audio Quality */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase text-subdued tracking-wider px-4 mb-2">Audio Quality</h2>
          <div className="space-y-1">
            <SettingRow
              icon={<Volume2 className="w-5 h-5" />}
              label="High quality streaming"
              description="Uses more data"
              action={<Toggle checked={highQuality} onChange={() => setHighQuality(!highQuality)} />}
              onClick={() => setHighQuality(!highQuality)}
            />
          </div>
        </section>

        {/* Downloads */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase text-subdued tracking-wider px-4 mb-2">Downloads</h2>
          <div className="space-y-1">
            <SettingRow
              icon={<Download className="w-5 h-5" />}
              label="Download using Wi-Fi only"
              action={<Toggle checked={downloadWifi} onChange={() => setDownloadWifi(!downloadWifi)} />}
              onClick={() => setDownloadWifi(!downloadWifi)}
            />
          </div>
        </section>

        {/* Notifications */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase text-subdued tracking-wider px-4 mb-2">Notifications</h2>
          <div className="space-y-1">
            <SettingRow
              icon={<Info className="w-5 h-5" />}
              label="Push notifications"
              description="New releases and recommendations"
              action={<Toggle checked={notifications} onChange={() => setNotifications(!notifications)} />}
              onClick={() => setNotifications(!notifications)}
            />
          </div>
        </section>

        {/* About */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase text-subdued tracking-wider px-4 mb-2">About</h2>
          <div className="space-y-1">
            <SettingRow icon={<Info className="w-5 h-5" />} label="Version" action={<span className="text-sm text-subdued">1.0.0</span>} />
            <SettingRow icon={<Info className="w-5 h-5" />} label="Privacy Policy" onClick={() => toast("Opening privacy policy")} />
            <SettingRow icon={<Info className="w-5 h-5" />} label="Terms of Service" onClick={() => toast("Opening terms")} />
          </div>
        </section>

        <div className="h-8" />
      </div>
    </div>
  );
}
