import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useAuth } from "./hooks/useAuth";
import FavouritesPage from "./pages/Favourites";
import HomePage from "./pages/Home";

function App() {
  const { activeUser, isAuthenticated } = useAuth();

  return (
    <>
      <Navigation isAuthenticated={isAuthenticated} activeUser={activeUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
    </>
  );
}

export default App;
