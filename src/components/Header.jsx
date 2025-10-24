import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/log-anb.jpg";
import { useSelector } from "react-redux";
import userImg from "../assets/user.png";
import { FaShoppingCart } from "react-icons/fa";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ récupération sécurisée du state Redux
  const { totalQuantity = 0, userInfo } = useSelector(
    (state) => state.bazar || {}
  );

  // ✅ Redirection automatique si l'utilisateur est admin
  useEffect(() => {
    if (userInfo?.role === "admin") {
      navigate("/adminDashboard");
    }
  }, [userInfo, navigate]);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "", path: "/shop" },
    { name: "Connexion", path: "/login", style: "primary" },
    { name: "Admin", path: "/adminDashboard", style: "primary" },
    { name: "A propos", path: "/Apropos", style: "primary" },
  ];

  return (
    <header className="w-full h-[80px] bg-white p-4 fixed top-0 z-50 left-0 right-0 shadow-md">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto h-full">
        {/* ✅ Logo animé */}
        <Link to="/">
          <motion.img
            src={Logo}
            alt="logo"
            width={70}
            height={70}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-md"
          />
        </Link>

        {/* ✅ Navigation desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`px-4 py-2 rounded-md shadow transition duration-300 ${
                link.style === "primary"
                  ? "bg-blue-700 text-white hover:bg-gray-100 hover:text-black"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* ✅ Icône Panier */}
        <Link
          to="/cart"
          className="relative p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          <FaShoppingCart size={22} />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {totalQuantity}
            </span>
          )}
        </Link>

        {/* ✅ Avatar utilisateur */}
        <div className="flex items-center gap-2">
          <Link to={userInfo ? "/profile" : "/login"}>
            <img
              className="w-[35px] h-[35px] rounded-full object-cover"
              src={userInfo?.image || userImg}
              alt="user"
            />
          </Link>

          {userInfo?.name && (
            <p className="text-base font-semibold underline underline-offset-2">
              {userInfo.name.substring(0, 4).toUpperCase()}
            </p>
          )}
        </div>

        {/* ✅ Bouton Burger Mobile */}
        <div className="md:hidden">
          <button
            className="p-2 border rounded"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* ✅ Menu Mobile + Overlay animé */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-0 left-0 h-full w-[250px] bg-white shadow-lg z-50 p-6 flex flex-col gap-4"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="self-end mb-4 text-xl"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>

              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-md shadow transition duration-300 ${
                    link.style === "primary"
                      ? "bg-blue-700 text-white hover:bg-gray-100 hover:text-black"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
