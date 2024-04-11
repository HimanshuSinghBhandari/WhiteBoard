import React from "react";
import { useNavigate, Link} from "react-router-dom";
import { handleError } from "../utils/handleError";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/user/logout");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <header className="absolute z-30 w-full">
    <div className="max-w-6xl px-4 mx-auto sm:px-6">
      <div className="flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="mr-4 shrink-0 text-xl font-bold text-white">
          white board
        </Link>

        <nav className="flex-grow">
          <ul className="flex flex-wrap items-center justify-end gap-4">
            <li>
              <Link
                to="/login"
                className="text-lg font-medium text-zinc-300 hover:text-white duration-500"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="text-lg font-medium text-zinc-300 hover:text-white duration-500"
              >
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
  );
}