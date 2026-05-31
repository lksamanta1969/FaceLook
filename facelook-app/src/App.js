import React, { useState } from "react";

import Topbar from "./components/Topbar";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import FriendsPage from "./pages/FriendsPage";
import MessagePage from "./pages/MessagePage";

function App() {

  const [page, setPage] = useState("home");

  return (
    <div>

      <Topbar setPage={setPage} />

      {page === "home" && <HomePage />}

      {page === "profile" && <ProfilePage />}

      {page === "friends" && <FriendsPage />}

      {page === "messages" && <MessagePage />}

    </div>
  );
}

export default App;