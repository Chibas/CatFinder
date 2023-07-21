import { Link } from "react-router-dom";
import { User } from "../store/auth/auth.slice";

type NavigationProps = {
  isAuthenticated: boolean;
  activeUser?: User | null;
};

const Navigation = ({ isAuthenticated, activeUser }: NavigationProps) => {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-blue-500 text-white">
      <Link to="/">
        <h3 className="font-bold">Cat Gifs Search</h3>
      </Link>

      <span>
        <Link to="/" className="relative mr-2 hover:bottom-[1px]">
          Home
        </Link>
        <Link to="/favourites" className="relative mr-2 hover:bottom-[1px]">
          Favourites
        </Link>
        <Link to="/history" className="relative mr-2 hover:bottom-[1px]">
          History
        </Link>
        {!isAuthenticated && (
          <Link to="/" className="relative hover:bottom-[1px]">
            {"=>"}Login
          </Link>
        )}
      </span>
    </nav>
  );
};

export default Navigation;
