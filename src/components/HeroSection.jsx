import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import ANBImage from "../assets/ANB1.jpg";
import ShopCollection from "./ShopCollection"; // <-- Assure-toi que le chemin est correct
export default function HeroSection() {
  const [showProducts, setShowProducts] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative h-screen bg-black flex items-center justify-center mt-[80px]">

      {/* Image en background */}
      
      <img
        src="/images/ANB1.jpg"
        alt="ANB Brand"
       className="absolute inset-0 w-full h-full  opacity-70 "
      />

      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-40" />

      {/* Contenu principal */}
      <div className="relative text-center text-white px-6">
        <motion.h1
          className="text-5xl italic font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ANB Collection
        </motion.h1>

        <motion.p
          className="text-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Style moderne & minimaliste
        </motion.p>

        {/* Bouton animé */}
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="cursor-pointer px-6 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition"
          onClick={() => {
            // Option 1 : scroll vers la section produits
            const productsSection = document.getElementById("products-section");
            if (productsSection) {
              productsSection.scrollIntoView({ behavior: "smooth" });
            }

            // Option 2 : afficher directement les produits sous le Hero
            setShowProducts(true);
          }}
        >
          Découvrir
        </motion.button>

        {/* Affichage conditionnel des produits */}
        {showProducts && (
          <div id="products-section" className="mt-20">
            <ShopCollection />
          </div>
        )}
      </div>
    </div>
  );
}
