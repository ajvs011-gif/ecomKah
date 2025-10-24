import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence, color } from "framer-motion";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { toast } from "react-toastify";
import { clearCart } from "../redux/bazarSlice";
import WhatsAppButton from "../components/WhatsAppButton";

// Icônes SVG
const ShoppingBagIcon = () => (
  <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
  </svg>
);

const Cart = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

  
  // ✅ Récupération correcte des données Redux
  const cartItems = useSelector((state) => state.bazar.cartItems || []);
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const shippingCost = useSelector((state) => state.bazar.shippingCost || 2500);
  const freeShippingThreshold = useSelector((state) => state.bazar.freeShippingThreshold || 50000);
  const message = cartItems.map(item => `${item.name} x${item.quantity}`).join(', ');

  
  const [totalAmt, setTotalAmt] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // ✅ Fonction pour formater les prix
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  // ✅ Calcul du total et de la quantité
  useEffect(() => {
    let price = 0;
    let quantity = 0;
    
    cartItems.forEach((item) => {
      if (item && item.prix && item.quantity) {
        price += item.prix * item.quantity;
        quantity += item.quantity;
      }
    });
    
    setTotalAmt(price);
    setTotalQuantity(quantity);
  }, [cartItems]);

  // ✅ Calcul des frais de livraison
  const getShippingCost = () => {
    return totalAmt >= freeShippingThreshold ? 0 : shippingCost;
  };

  // ✅ Total final
  const getFinalTotal = () => {
    return totalAmt + getShippingCost();
  };

  // ✅ Gestion du checkout
  const handleCheckOut = () => {
    if (!userInfo) {
      toast.error("Veuillez vous connecter pour passer à la caisse.");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.warning("Votre panier est vide.");
      return;
    }

    toast.success("Redirection vers la page de paiement...");
    navigate("/checkout");
  };

  // ✅ Vider le panier
  const handleClearCart = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vider votre panier ?")) {
      dispatch(clearCart());
      toast.info("Panier vidé avec succès");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Shopping cart"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Mon Panier</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">  
        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Section Articles du panier */}
            
            <div className="lg:col-span-2 space-y-4">
              {/* En-tête */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Articles ({totalQuantity})
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Gérez vos articles et passez à la commande
                  </p>
                </div>
                
                {/* Bouton vider le panier */}
                {cartItems.length > 1 && (
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium hover:underline transition-colors"
                  >
                    Vider le panier
                  </button>
                )}
              </div>

              {/* Liste des articles avec AnimatePresence */}
              <AnimatePresence mode="popLayout">
                {cartItems
                  .filter(item => item && item.id) // ✅ Filtre les items invalides
                  .map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CartItem item={item} />
                    </motion.div>
                  ))
                }
              </AnimatePresence>
            </div>

            {/* Résumé du panier - Sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b">
                    Résumé
                  </h2>

                  {/* Détails des prix */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-700">
                      <span>Sous-total ({totalQuantity} articles)</span>
                      <span className="font-semibold">{formatPrice(totalAmt)}</span>
                    </div>

                    <div className="flex justify-between text-gray-700">
                      <span className="flex items-center gap-2">
                        Livraison
                        {getShippingCost() === 0 && (
                          <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-0.5 rounded-full">
                            Gratuite
                          </span>
                        )}
                      </span>
                      <span className="font-semibold">{formatPrice(getShippingCost())}</span>
                    </div>

                    {/* Indicateur de livraison gratuite */}
                    {totalAmt < freeShippingThreshold && totalAmt > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs text-blue-800">
                          Ajoutez <span className="font-bold">{formatPrice(freeShippingThreshold - totalAmt)}</span> pour bénéficier de la livraison gratuite !
                        </p>
                        <div className="mt-2 bg-blue-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-blue-600 h-full transition-all duration-300"
                            style={{ width: `${Math.min((totalAmt / freeShippingThreshold) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {formatPrice(getFinalTotal())}
                      </span>
                    </div>
                  </div>

                  {/* Boutons d'action */}
                 {/* Bouton WhatsApp flottant */}
            {cartItems.length > 0 && (
           <WhatsAppButton
           variant="floating"
          phone="2250140918587"
          message={`Bonjour, je souhaite commander : ${message}. Total = ${formatPrice(totalAmt)}`}
                 />
             )}


                  {/* Badges de confiance */}
                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Paiement sécurisé</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Retour sous 14 jours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Service client 24/7</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          // Panier vide
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="text-gray-300 mb-6">
              <ShoppingBagIcon />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Votre panier est vide
            </h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Découvrez nos produits ANB et ajoutez vos articles préférés au panier
            </p>
            <Link to="/">
              <motion.button
                className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiOutlineArrowLeft className="text-xl" />
                Retour à la boutique
              </motion.button>
            </Link>
          </motion.div>
        )}
        {/* Bouton WhatsApp flottant */}



      </div>
    </div>
  );
};

export default Cart;