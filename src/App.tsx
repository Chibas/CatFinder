import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import FavoritesPage from "./pages/Favorites";
import HomePage from "./pages/Home";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default App;
