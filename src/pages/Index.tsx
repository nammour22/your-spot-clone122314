import SpotifySidebar from "@/components/SpotifySidebar";
import HomeContent from "@/components/HomeContent";
import PlayerBar from "@/components/PlayerBar";
import MobileNav from "@/components/MobileNav";

export default function Index() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Main layout */}
      <div className="flex flex-1 min-h-0 gap-2 p-2">
        {/* Desktop Sidebar */}
        <SpotifySidebar className="hidden md:flex w-[340px] flex-shrink-0" />
        
        {/* Main content */}
        <HomeContent />
      </div>

      {/* Player Bar */}
      <PlayerBar />

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
