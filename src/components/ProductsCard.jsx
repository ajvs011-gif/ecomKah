import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, openCart } from "../redux/bazarSlice";

const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();

  // ➡️ Ajouter au panier
  const handleAddToCart = () => {
    // On prépare bien le payload que ton slice attend
    const item = {
      id: product.id,
      name: product.name || product.title,
      image: product.image,
      price: product.prix, // ton champ est "prix"
      quantity: 1, // on ajoute toujours 1 par défaut
    };

    dispatch(addToCart(item));
    dispatch(openCart()); // ouvre le panier automatiquement
  };

  // ➡️ Formatage du prix en FCFA
  const formatPrice = (price) => {

    
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      {/* Image produit */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badge si produit est nouveau */}
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Nouveau
          </span>
        )}
      </div>

      {/* Infos produit */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>

        {/* Prix */}
        <div className="mb-4">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.prix)}
          </span>
          {product.originalPrix && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrix)}
            </span>
          )}
        </div>

        {/* Stock */}
        <p className="text-sm text-gray-600 mb-4">
          Stock :{" "}
          <span className={product.quantité > 0 ? "text-green-600" : "text-red-500"}>
            {product.quantité > 0
              ? `${product.quantité} disponibles`
              : "Rupture de stock"}
          </span>
        </p>

        {/* Bouton ajouter au panier */}
        <button
          onClick={handleAddToCart}
          disabled={product.quantité === 0}
          className="w-full bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {product.quantité > 0 ? "Ajouter au panier" : "Rupture de stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;
