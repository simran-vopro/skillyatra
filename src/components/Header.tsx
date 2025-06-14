import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, User, ChevronDown, X } from "lucide-react";

import clsx from "clsx";
import OrangeOutlineButton from "./Button/OrangeOutlineButton";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  interface NavItem {
    name: string;
    path?: string;
    dropdown?: boolean;
    subItems?: string[];
  }

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/" },
    { name: "Explore", path: "/" },
    { name: "Cart", path: "/cart" },

    // {
    //   name: "Shop",
    //   dropdown: true,
    //   subItems: [
    //     "PPE & Clothing",
    //     "Paper",
    //     "Janitorial",
    //     "Files Pockets Binders",
    //     "Computer Hardware",
    //     "Catering",
    //     "Adhesives & Tapes",
    //   ],
    // },
    { name: "Categories", path: "/" },
    { name: "Contact", path: "/contact" },
  ];


  // Detect clicks outside the search container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Header */}
      <header className="w-full z-50 bg-white shadow">
        {/* Top Header */}
        <div className="border-b border-gray-200 py-2 px-4 md:px-8 flex items-center justify-between gap-4 flex-wrap container-padding">
          {/* Logo */}
          <Link to="/" className="font-bold text-xxl md:text-2xl text-gray-800">
            {/* <img src={images.logo} className="w-[170px] h-auto" /> */}
            <h3>SkillYatra</h3>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl w-full" ref={searchRef}>
            <div className="flex items-center relative border-2 border-purple-400 focus-within:border-purple-500 transition-colors px-4 rounded-full">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // navigate(`/projectDetails/${products[0]._id}`);
                    setSearch("");
                  }
                }}
                type="text"
                placeholder="Search courses, projects, or skills..."
                className="flex flex-1 w-full bg-transparent focus:outline-none text-gray-500 text-lg md:text-sm py-2 pr-10 placeholder-gray-300 "
              />

              {/* icons */}
              {search ? (
                <X
                  onClick={() => {
                    setSearch("");
                  }}
                  className=" text-gray-500 w-4 h-4 cursor-pointer"
                />
              ) : (
                <Search className=" text-gray-500 w-4 h-4" />
              )}

              {/* {search && productLoading && (
                <div className="absolute top-10 left-0 bg-white border border-gray-300 w-full z-50 shadow-md mt-1 rounded-md p-2 space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 animate-pulse"
                    >
                      <div className="w-8 h-8 bg-gray-300 rounded-full" />
                      <div className="flex-1">
                        <div className="w-3/4 h-3 bg-gray-300 mb-1 rounded" />
                        <div className="w-1/2 h-3 bg-gray-200 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              )} */}

              {/* {search && products.length > 0 && (
                <div className="absolute top-10 left-0 bg-white border border-gray-300 w-full z-50 shadow-md mt-1 rounded-md max-h-[300px] overflow-y-scroll">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        navigate(`/projectDetails/${product._id}`);
                        setSearch("");
                      }}
                    >
                      <img
                        src={product["Image Ref"]}
                        alt={product.Description}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-700">
                        {product.Style ? `${product.Style} - ` : ""}
                        {product.Description}
                      </span>
                    </div>
                  ))}
                </div>
              )} */}
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 text-sm text-gray-700">
            <div className="hidden md:flex items-center gap-2">
              <OrangeOutlineButton
                label="Login"
                onClick={() => navigate("/login")}
              />
              <OrangeOutlineButton
                label="Sign Up"
                onClick={() => navigate("/register")}
              />
            </div>

            <div
              onClick={() => navigate("/account")}
              className="flex items-center gap-1 px-4 text-gray-600 text-[13px] cursor-pointer"
            >
              <User className="w-4 h-4 text-purple-500" />
              <p>Your Account</p>
            </div>
          </div>
        </div>

        {/* Bottom Info Bar */}
        {/* Bottom Navigation Bar with navItems */}
        <div className="bg-purple-500 py-3 px-4 md:px-8 flex flex-wrap justify-center gap-6 text-sm text-gray-700">
          {navItems.map(({ name, path, dropdown, subItems }) => {
            if (dropdown && subItems) {
              return (
                <div key={name} className="relative group cursor-pointer">
                  <div className="flex items-center gap-1 px-4 text-[13px]">
                    <ChevronDown className="w-4 h-4 text-purple-500" />
                    <span className="uppercase font-semibold text-sm">
                      {name}
                    </span>
                  </div>

                  {/* Dropdown on hover */}
                  <ul className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 bg-white text-gray-700 shadow-lg rounded-md mt-2 py-2 min-w-[180px] z-10">
                    {subItems.map((sub) => (
                      <li key={sub}>
                        <Link
                          to={`/shop/${sub
                            .toLowerCase()
                            .replace(/ & /g, "-")
                            .replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 hover:bg-gray-100 text-sm"
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }

            return (
              <Link
                key={name}
                to={path || "/"}
                className="flex items-center gap-1 px-4 text-sm uppercase font-semibold text-white cursor-pointer"
              >
                <p>{name}</p>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Sidebar Menu (Mobile) */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-col h-full p-6 space-y-6">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold text-white"
            >
              SkillsYatra
              <span className="w-1 h-1 bg-primary inline-block"></span>
            </Link>

            {/* Navigation Items */}
            <nav className="flex flex-col space-y-4 mt-4">
              {navItems.map(({ name, path, dropdown, subItems }) => {
                const isActive = pathname === path;

                if (dropdown) {
                  return (
                    <div key={name} className="flex flex-col">
                      <button
                        onClick={() => setShopOpen(!shopOpen)}
                        className="flex justify-between items-center text-left w-full text-base text-white/80 hover:text-white"
                      >
                        {name}
                        <ChevronDown
                          className={clsx(
                            "w-4 h-4 transition-transform",
                            shopOpen && "rotate-180"
                          )}
                        />
                      </button>
                      {shopOpen && (
                        <ul className="ml-4 mt-2 space-y-1">
                          {subItems?.map((label) => (
                            <li key={label} className="my-5">
                              <Link
                                to={`/shop/${label
                                  .toLowerCase()
                                  .replace(/ & /g, "-")
                                  .replace(/\s+/g, "-")}`}
                                onClick={() => setMenuOpen(false)}
                                className="block text-sm text-white/70 hover:text-white"
                              >
                                {label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                }

                return path ? (
                  <Link
                    key={name}
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={clsx(
                      "transition-all",
                      isActive
                        ? "text-xl font-semibold"
                        : "text-base text-sm text-white/80 hover:text-white"
                    )}
                  >
                    {name}
                  </Link>
                ) : null;
              })}
            </nav>
          </div>

          {/* My Account at bottom */}
          <Link
            to="/account"
            onClick={() => setMenuOpen(false)}
            className="mt-auto w-full bg-black text-white py-4 px-6 text-center cursor-pointer block"
          >
            My Account
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-opacity-40 z-40"
        />
      )}
    </>
  );
};

export default Header;
