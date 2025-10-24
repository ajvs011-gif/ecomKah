import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/bazarSlice";

// Icônes
const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const MinusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price) =>
    new Intl.NumberFormat("fr-FR").format(price) + " FCFA";

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      dispatch(removeFromCart(item.id));
    }, 300);
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(item.id));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(item.id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
      layout
      className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 ${
        isRemoving ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center gap-4 p-4">
        {/* IMAGE */}
        <motion.div
          className="relative flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shadow-md">
            {!imageError ? (
              <img
                src={item?.image || "/placeholder.png"}
                alt={item?.name || "Produit"}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-3xl">📦</span>
              </div>
            )}
          </div>

          {/* Badge quantité */}
          
          {item.quantity > 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-black text-white text-xs 
              font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
            >
              {item.quantity}
            </motion.div>
          )}
        </motion.div>

        {/* INFO PRODUIT */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 truncate">
              {item.name || "Sans titre"}
            </h4>

            {/* SUPPRIMER */}
            <motion.button
              onClick={handleRemove}
              className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              title="Supprimer"
            >
              <TrashIcon />
            </motion.button>
          </div>

          {/* PRIX + QUANTITÉ */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Prix unitaire</span>
              <span className="font-bold text-gray-900">
                {formatPrice(item.prix || 0)}
              </span>
            </div>

            {/* CONTRÔLES */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1 border border-gray-200">
              <motion.button
                onClick={handleDecrease}
                disabled={item.quantity <= 1}
                className="p-1.5 hover:bg-white rounded-full transition-all disabled:opacity-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MinusIcon />
              </motion.button>

              <motion.span
                key={item.quantity}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="w-8 text-center font-bold text-sm"
              >
                {item.quantity || 1}
              </motion.span>

              <motion.button
                onClick={handleIncrease}
                className="p-1.5 hover:bg-white rounded-full transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <PlusIcon />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* TOTAL */}
      <div className="px-4 pb-4 flex items-center justify-between border-t border-gray-100 pt-3 mt-1">
        <span className="text-sm text-gray-600">Total</span>
        <motion.span
          key={item.prix * item.quantity}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-lg font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text"
        >
          {formatPrice((item.prix || 0) * (item.quantity || 1))}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default CartItem;
