import { Outlet } from "react-router-dom";
import SpotifySidebar from "@/components/SpotifySidebar";
import PlayerBar from "@/components/PlayerBar";
import MobileNav from "@/components/MobileNav";
import TopBar from "@/components/TopBar";

export default function AppLayout() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex flex-1 min-h-0 gap-2 p-2">
        <SpotifySidebar className="hidden md:flex w-[340px] flex-shrink-0" />
        <div className="flex-1 flex flex-col min-h-0 rounded-lg overflow-hidden">
          <TopBar className="bg-[hsl(0,0%,14%)] hidden md:flex" />
          <Outlet />
        </div>
      </div>
      <PlayerBar />
      <MobileNav />
    </div>
  );
}
