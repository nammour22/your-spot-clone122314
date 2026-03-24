import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/contexts/AppContext";
import { PlayerProvider } from "@/contexts/PlayerContext";
import AppLayout from "@/components/AppLayout";
import LoginPage from "@/pages/Login";
import HomePage from "@/pages/Home";
import SearchPage from "@/pages/Search";
import LibraryPage from "@/pages/Library";
import PlaylistPage from "@/pages/Playlist";
import AlbumPage from "@/pages/Album";
import ArtistPage from "@/pages/Artist";
import LikedSongsPage from "@/pages/LikedSongs";
import QueuePage from "@/pages/Queue";
import ProfilePage from "@/pages/Profile";
import SettingsPage from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <AppProvider>
        <PlayerProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/playlist/:id" element={<PlaylistPage />} />
                <Route path="/album/:id" element={<AlbumPage />} />
                <Route path="/artist/:id" element={<ArtistPage />} />
                <Route path="/liked" element={<LikedSongsPage />} />
                <Route path="/queue" element={<QueuePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PlayerProvider>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
