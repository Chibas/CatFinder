import { Link } from "react-router-dom"

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-blue-500 text-white">
      <h3 className="font-bold">Cat Gifs Search</h3>

      <span>
        <Link to={`${process.env.PUBLIC_URL}/`} className="relative mr-2 hover:bottom-[1px]">Home</Link>
        <Link to={`${process.env.PUBLIC_URL}/favorites`} className="relative hover:bottom-[1px]">Favorites</Link>
      </span>
    </nav>
  )
}

export default Navigation;