import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import FriendsPage from "./pages/FriendsPage";
import MessagesPage from "./pages/MessagesPage";
import PhotosPage from "./pages/PhotosPage";
import VideosPage from "./pages/VideosPage";
import MarketplacePage from "./pages/MarketplacePage";
import EventsPage from "./pages/EventsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Main Pages */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/photos" element={<PhotosPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/settings" element={<SettingsPage />} />

      </Routes>
    </BrowserRouter>
  );
}