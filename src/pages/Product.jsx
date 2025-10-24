import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, openCart } from '../redux/bazarSlice';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity: selectedQuantity
    }));
    dispatch(openCart());
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="space-y-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>

        {/* Détails */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Prix */}
          <div>
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.prix)}
            </span>
            {product.originalPrix && (
              <span className="ml-3 text-xl text-gray-500 line-through">
                {formatPrice(product.originalPrix)}
              </span>
            )}
          </div>

          {/* Variantes */}
          {product.colors && (
            <div>
              <h3 className="font-semibold mb-2">Couleurs disponibles:</h3>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div>
              <h3 className="font-semibold mb-2">Tailles disponibles:</h3>
              <div className="flex gap-2">
                {product.sizes.map((size, index) => (
                  <span key={index} className="px-3 py-1 border border-gray-300 rounded text-sm">
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quantité */}
          <div>
            <label className="block font-semibold mb-2">Quantité:</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                className="p-2 border border-gray-300 rounded"
              >
                -
              </button>
              <span className="px-4 py-2 border border-gray-300 rounded">
                {selectedQuantity}
              </span>
              <button
                onClick={() => setSelectedQuantity(Math.min(product.quantité, selectedQuantity + 1))}
                className="p-2 border border-gray-300 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Stock */}
          <p className="text-gray-600">
            {product.quantité} articles en stock
          </p>

          {/* Bouton ajouter au panier */}
          <button
            onClick={handleAddToCart}
            disabled={product.quantité === 0}
            className="w-full bg-black text-white py-3 px-6 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300"
          >
            Ajouter {selectedQuantity} au panier - {formatPrice(product.prix * selectedQuantity)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;