import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useAuth } from "./hooks/useAuth";
import FavoritesPage from "./pages/Favorites";
import HomePage from "./pages/Home";

function App() {
  const { activeUser, isAuthenticated } = useAuth();

  return (
    <>
      <Navigation isAuthenticated={isAuthenticated} activeUser={activeUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default App;
