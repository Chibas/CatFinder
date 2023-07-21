import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useActions } from "./hooks/actions";
import { useAuth } from "./hooks/useAuth";
import FavouritesPage from "./pages/Favourites";
import HomePage from "./pages/Home";
import VotingHistoryPage from "./pages/VotingHistory";

function App() {
  const { activeUser, isAuthenticated } = useAuth();
  const location = useLocation();
  const { setPage } = useActions();

  useEffect(() => {
    setPage(0);
  }, [location, setPage]);

  return (
    <>
      <Navigation isAuthenticated={isAuthenticated} activeUser={activeUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/history" element={<VotingHistoryPage />} />
      </Routes>
    </>
  );
}

export default App;
