import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { ImGithub } from "react-icons/im";
import { BsPersonFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";

const Footer = () => { 
  return (
    <footer className="w-full bg-black text-white py-10 px-5 font-titleFont">
      <div
        className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10"
      >
        {/* ================= Logo + Réseaux sociaux ================= */}
        <div className="flex flex-col items-center md:items-start gap-5 text-center md:text-left">
          <p className="text-sm tracking-wide">&copy; ANB FASHION</p>

          <div className="flex gap-5 text-2xl">
            <ImGithub className="hover:text-[#8a2be2] cursor-pointer transition" />
            <FaYoutube className="hover:text-[#8a2be2] cursor-pointer transition" />
            <FaFacebookF className="hover:text-[#8a2be2] cursor-pointer transition" />
            <FaTwitter className="hover:text-[#8a2be2] cursor-pointer transition" />
            <FaInstagram className="hover:text-[#8a2be2] cursor-pointer transition" />
          </div>
        </div>

        {/* ================= Localisation ================= */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold mb-3">Utilisateurs</h2>
          <div className="text-base flex flex-col gap-1">
            <p>Abidjan</p>
            <p>Téléphone : 00225 01 40 91 85 87</p>
          </div>
        </div>

        {/* ================= Profil ================= */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold mb-3">Profil</h2>
          <div className="flex flex-col gap-2 text-base">
            <p className="flex items-center justify-center md:justify-start gap-2 hover:text-[#8a2be2] cursor-pointer">
              <BsPersonFill /> Mon compte
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2 hover:text-[#8a2be2] cursor-pointer">
              <MdLocationOn /> Aide & support
            </p>
          </div>
        </div>

        {/* ================= Newsletter ================= */}
        <form className="flex flex-col items-center md:items-start gap-3 w-full max-w-[250px]">
          <input
            type="text"
            placeholder="E-mail"
            className="bg-transparent border px-4 py-2 text-sm w-full rounded focus:outline-none"
          />
          <button className="w-full text-sm border border-[#8a2be2] text-[#8a2be2] py-2 rounded hover:bg-[#8a2be2] hover:text-white transition">
            Subscribe
          </button>
        </form>
      </div>

      {/* Ligne de séparation + Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ANB FASHION — Tous droits réservés
      </div>
    </footer>
  );
};

export default Footer;
