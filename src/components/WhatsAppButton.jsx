import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

/**
 * Composant WhatsAppButton
 * - Bouton flottant ou classique
 * - Message personnalisé
 * - Support des variantes
 */
const WhatsAppButton = ({
  phone = "2250140918587", // Numéro WhatsApp avec indicatif pays
  message = "Bonjour, je souhaite passer une commande !",
  article = null, // optionnel : { name, prix, category, colors, sizes }
  variant = "floating", // floating | icon | default | outline
}) => {
  // ✅ Formateur de prix
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  // ✅ Message WhatsApp dynamique
  const finalMessage = article
    ? `Bonjour ANB Store ! 👋

Je souhaite commander :
📦 Article : ${article.name || article.nom}
💰 Prix : ${formatPrice(article.prix)}
${article.category ? `📂 Catégorie : ${article.category}` : ""}
${article.colors ? `🎨 Couleurs : ${article.colors.join(", ")}` : ""}
${article.sizes ? `📏 Tailles : ${article.sizes.join(", ")}` : ""}

Merci de me contacter pour finaliser ma commande.`
    : message;

  // ✅ Action au clic
  const handleClick = () => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, "_blank");
  };

  // ✅ Styles des variantes
  const variants = {
    default:
      "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md",
    outline:
      "border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg",
    icon: "p-3 bg-green-500 hover:bg-green-600 text-white rounded-full",
    floating:
      "fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white shadow-2xl z-50 rounded-full p-4",
  };

  // ✅ Rendu animé (avec framer-motion)
  return (
      <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2 z-50 transition-all duration-300"
    >
      <FaWhatsapp className="text-xl" />
      Commander via WhatsApp
    </button>
  );
};

export default WhatsAppButton;
