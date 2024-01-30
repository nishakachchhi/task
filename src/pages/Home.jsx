import { useState } from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <nav className="bg-red-800 p-5">
      <div className="container mx-auto flex items-center justify-between">
        {/* Company Name */}
        <div className="text-white text-lg font-bold">Company Logo</div>
        <div className="relative ml-auto">
          <button
            onClick={toggleDropdown}
            className="text-gray-600 focus:outline-none"
          >
            &#9660; {/* Downward-pointing triangle character */}
          </button>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md">
              <ul>
                <li to="/profile">
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                    Edit Profile
                  </button>
                </li>
                <li>
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                    Delete Profile
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Search Bar */}

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <NavLink
            to="/profile"
            className="text-white hover:text-gray-300"
            activeClassname="border-b-2 border-white"
          >
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
