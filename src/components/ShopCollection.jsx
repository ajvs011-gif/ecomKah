import React, { useState, useMemo } from "react";
import { Search, Filter, ShoppingCart, Heart, Star, Eye, Grid, List } from 'lucide-react';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
// Données des produits améliorées avec plus d'informations
import { addToCart as addToCartAction } from '../redux/bazarSlice'; 





const products = [
  { 
    id: 1, 
    name: "Casquette ANB", 
    image: "src/assets/ANB-casquette.jpg", 
    prix: 5000, 
    description: "Casquette tendance en coton, 100% africaine.", 
    category: "Accessoires",
    quantité: 25,
    rating: 4.5,
    reviews: 12,
    colors: ["Noir", "Rouge", "Bleu"],
    sizes: ["One Size"],
    isNew: true,
    inStock: true
  },

  { 
    id: 2, 
    name: "T-Shirt ANB", 
    image: "src/assets/ANB-tshirt.jpg", 
    prix: 15000, 
    originalPrix: 18000,
    description: "Un t-shirt 100% coton de qualité supérieure.", 
    category: "Vêtements",
    quantité: 18,
    rating: 4.8,
    reviews: 24,
    colors: ["Blanc", "Noir", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    inStock: true
  },
  { 
    id: 3, 
    name: "Sac artisanal", 
      image: "src/assets/ANB back.jpg", 
    prix: 8000, 
    description: "Sac fait main, durable et élégant.", 
    category: "Sacs",
    quantité: 12,
    rating: 4.3,
    reviews: 8,
    colors: ["Marron", "Noir"],
    isNew: false,
    inStock: true
  },

  { 
    id: 4, 
    name: "Shirt + Casquette", 
   image: "src/assets/anb2.jpg", 
    prix: 25000, 
    originalPrix: 30000,
    description: "Combo stylé shirt + casquette.", 
    category: "Vêtements", 
    quantité: 10,
    rating: 4.7,
    reviews: 15,
    colors: ["Combo Noir", "Combo Bleu"],
    sizes: ["M", "L", "XL"],
    isNew: true,
    inStock: true
  },
  { 
    id: 5, 
    name: "Chemise ANB", 
      image: "src/assets/anb3.jpg",   
    prix: 18000, 
    description: "Chemise premium africaine.", 
    category: "Vêtements",
    quantité: 15,
    rating: 4.6,
    reviews: 18,
    colors: ["Blanc", "Bleu", "Beige"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    inStock: true
  },
  { 
    id: 6, 
    name: "Foot Wear", 
     image: "src/assets/anb4.jpg",  
    prix: 35000, 
    description: "Chaussures décontractées de qualité.", 
    category: "Chaussures",
    quantité: 8,
    rating: 4.4,
    reviews: 10,
    colors: ["Noir", "Marron"],
    sizes: ["39", "40", "41", "42", "43"],
    isNew: false,
    inStock: true
  },
  { 
    id: 7, 
    name: "Polo Noir", 
       image: "src/assets/anb-polo.jpg", 
    prix: 22000, 
    description: "Polo chic en coton africain.", 
    category: "Vêtements",
    quantité: 20,
    rating: 4.5,
    reviews: 14,
    colors: ["Noir", "Marine", "Bordeaux"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    inStock: true
  },
  { 
    id: 8, 
    name: "Sac Noir", 
       image: "src/assets/anb-sac-noir.jpg", 
    prix: 12000, 
    description: "Sac pratique et moderne.", 
    category: "Sacs",
    quantité: 5,
    rating: 4.2,
    reviews: 7,
    colors: ["Noir"],
    isNew: false,
    inStock: true
  },
  { 
    id: 9, 
    name: "Veste ANB", 
        image: "src/assets/ANB-VESTE.jpg", 
    prix: 28000, 
    prix: 45000, 
    description: "Veste de qualité, style africain.", 
    category: "Vêtements",
    quantité: 6,
    rating: 4.9,
    reviews: 22,
    colors: ["Noir", "Kaki"],
    sizes: ["M", "L", "XL"],
    isNew: true,
    inStock: true
  },
  { 
    id: 10, 
    name: "Sac de Voyage", 
   image: "src/assets/sac-de-voyage.jpg", 
    prix: 28000, 
    originalPrix: 32000,
    description: "Sac de voyage robuste et élégant.", 
    category: "Sacs",
    quantité: 12,
    rating: 4.7,
    reviews: 16,
    colors: ["Noir", "Marron"],
    isNew: false,
    inStock: true
  },
  { 
    id: 11, 
    name: "T-shirt blanc", 
      image: "src/assets/shirt.jpg", 
    prix: 16000, 
    description: "T-shirt blanc stylé.", 
    category: "T-shirts",
    quantité: 14,
    rating: 4.3,
    reviews: 9,
    colors: ["Blanc", "Noir"],
    isNew: false,
    inStock: true
  },


  
  { 
    id: 12, 
    name: "Sac Noir Premium", 
      image: "src/assets/ANB-black.jpg", 
    prix: 24000, 
    description: "Sac élégant pour toutes occasions.", 
    category: "Sacs",
    quantité: 8,
    rating: 4.6,
    reviews: 13,
    colors: ["Noir"],
    isNew: true,
    inStock: true
  },
  { 
    id: 13, 
    name: "Sac Doré", 
       image: "src/assets/anb-bac-vert.jpg", 
    prix: 32000, 
    description: "Sac doré luxueux fabriqué en Afrique.", 
    category: "Sacs",
    quantité: 4,
    rating: 4.8,
    reviews: 11,
    colors: ["Doré", "Or Rose"],
    isNew: false,
    inStock: true
  },

  { 
    id: 14, 
    name: "Collection Femme", 
      image: "src/assets/anb-woman.jpg",  
    prix: 38000, 
    description: "Mode femme africaine raffinée.", 
    category: "Vêtements",
    quantité: 7,
    rating: 4.9,
    reviews: 19,
    colors: ["Rose", "Blanc", "Beige"],
    sizes: ["S", "M", "L"],
    isNew: true,
    inStock: true
  },

    { 
    id: 15, 
    name: "ANB-SAC-HOMME", 
      image: "src/assets/ANB-sac1.jpeg", 
    prix: 10000, 
    description: "sac homme noir bien stylé.", 
    category: "SACS",
    quantité: 1,
    rating: 4.3,
    reviews: 9,
    colors: ["Blanc", "Noir"],
    isNew: true,
    inStock: false
  },

     { 
    id: 16, 
    name: "ANB-SAC-DE-SPORT", 
      image: "src/assets/ANB-sac2.jpeg", 
    prix: 10000, 
    description: "Sac homme pour sport.", 
    category: "SACS",
    quantité: 1,
    rating: 4.3,
    reviews: 9,
    colors: ["Blanc", "Noir"],
    isNew: true,
    inStock: false
  },

     { 
    id: 17, 
    name: "ANB-SAC-CUIR", 
      image: "src/assets/ANB-sac3.jpeg", 
    prix: 10000, 
    description: "sac en cuir  stylé.", 
    category: "SACS",
    quantité: 1,
    rating: 4.3,
    reviews: 9,
    colors: ["belg", "Noir"],
    isNew: true,
    inStock: false
  },
  
       { 
    id: 18, 
    name: "ANB-SAC-HOMME", 
      image: "src/assets/ANB-sac4.jpeg", 
    prix: 10000, 
    description: "Sac homme stylé à porter.", 
    category: "SACS",
    quantité: 1,
    rating: 4.3,
    reviews: 9,
    colors: ["belg", "Noir"],
    isNew: true,
    inStock: false
  },

    { 
    id: 19, 
    name: "ANB-SAC-FEMME", 
      image: "src/assets/ANB-sac-5.jpeg", 
    prix: 10000, 
    description: "Sac femme tissé à la main.", 
    category: "SACS",
    quantité: 1,
    rating: 4.3,
    reviews: 9,
    colors: ["Vert", "Noir"],
    isNew: true,
    inStock: false
  },

   { 
    id: 19, 
    name: "ANB-SAC-DAME", 
      image: "src/assets/ANB-sac-6.jpeg", 
    prix: 10000, 
    description: "Sac à main dame bleu.", 
    category: "SACS",
    quantité: 1,
    rating: 4.3,
    reviews: 9,
    colors: ["bleu", "gris"],
    isNew: true,
    inStock: false
  },

     { 
    id: 20, 
    name: "ANB-ustensiles", 
      image: "src/assets/ANB-assiette-tradi.jpeg", 
    prix: 10000, 
    description: "les ustensiles fais à l'africain.", 
    category: "SACS",
    quantité: 1,
    rating: 4.3,
    reviews: 9,
    colors: ["jaune", "gris"],
    isNew: true,
    inStock: false
  },

];

const categories = [
  { id: "all", name: "Tous les produits" },
  { id: "Vêtements", name: "Vêtements" },
  { id: "Sacs", name: "Sacs" },
  { id: "Accessoires", name: "Accessoires" },
  { id: "Chaussures", name: "Chaussures" }
];

  const ShopCollection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();


  // Filtrage et tri des produits
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.prix - b.prix;
        case "price-desc":
          return b.prix - a.prix;
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.isNew - a.isNew;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  // Fonctions d'action
  // const addToCart = (product) => {
  //   setCart(prev => {
  //     const existing = prev.find(item => item.id === product.id);
  //     if (existing) {
  //       return prev.map(item => 
  //         item.id === product.id 
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     }
  //     return [...prev, { ...product, quantity: 1 }];
  //   });
  // };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-[1340px] mx-auto py-8 px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wide mb-4 text-gray-900 uppercase italic">
            Le luxe à l'africaine
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Pensé pour le monde, fait avec passion
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des produits ANB..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtres */}
            <div className="flex gap-2 flex-wrap">
              <select
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Trier par nom</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Mieux notés</option>
                <option value="newest">Nouveautés</option>
              </select>

              {/* Mode d'affichage */}
              <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 ${viewMode === "grid" ? "bg-black text-white" : "bg-white text-gray-600"} transition-colors`}
                >
                  <Grid className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 ${viewMode === "list" ? "bg-black text-white" : "bg-white text-gray-600"} transition-colors`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </span>
            <div className="flex items-center gap-4">
              <span>Panier: {cart.reduce((sum, item) => sum + item.quantity, 0)} articles</span>
              <span>Favoris: {favorites.length}</span>
            </div>
          </div>
        </div>

        {/* Grille des produits */}
        <div className={`grid gap-8 ${
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group ${
                viewMode === "list" ? "flex gap-6" : "flex flex-col"
              }`}
            >
              {/* Image Produit */}
              <div className={`relative overflow-hidden ${
                viewMode === "list" ? "w-64 h-48 flex-shrink-0" : "w-full h-80"
              }`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Nouveau
                    </span>
                  )}
                  {item.originalPrix && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Promo
                    </span>
                  )}
                  {item.quantité < 10 && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Stock: {item.quantité}
                    </span>
                  )}
                </div>

                {/* Actions rapides */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        favorites.includes(item.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </button>

                  <button
                    onClick={() => handleViewDetail(item)}
                    className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                  >
                    <Eye className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Infos Produit */}
              <div className="p-6 flex-1">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-black transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Note et avis */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(item.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {item.rating} ({item.reviews} avis)
                  </span>
                </div>

                {/* Variantes */}
                <div className="mb-4 space-y-2">
                  {item.colors && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Couleurs:</span>
                      <div className="flex gap-1">
                        {item.colors.slice(0, 3).map((color, index) => (
                          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {color}
                          </span>
                        ))}
                        {item.colors.length > 3 && (
                          <span className="text-xs text-gray-500">+{item.colors.length - 3}</span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.sizes && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Tailles:</span>
                      <span className="text-xs text-gray-800">
                        {item.sizes.join(', ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Prix */}
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(item.prix)}
                    </span>
                    {item.originalPrix && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(item.originalPrix)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stock */}
                <div className="mb-4">
                  <span className={`text-sm font-medium ${
                    item.quantité > 10 ? 'text-green-600' : 
                    item.quantité > 5 ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {item.quantité > 0 ? `${item.quantité} en stock` : 'Rupture de stock'}
                  </span>
                </div>

                {/* Boutons d'action */}
                <div className="flex gap-2">
                  
                  <button
                        onClick={() => dispatch(addToCartAction(item))} // ✅ Action Redux
                        disabled={item.quantité === 0}
                        className="flex-1 bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                       >
                      <ShoppingCart className="w-4 h-4" />
                      Ajouter
                 </button>

                  <button
                    onClick={() => handleViewDetail(item)}
                    className="px-4 py-3 border-2 border-black text-black hover:bg-black hover:text-white rounded-xl font-medium transition-all"
                  >
                    Voir détail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun produit */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Filter className="w-20 h-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche ou de filtrage
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSortBy("name");
              }}
              className="mt-4 px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Modal détails produit */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">

                    {selectedProduct.name}

                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <div>
                    <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                    <div className="space-y-3">
                      <div>
                        <span className="font-bold text-2xl text-gray-900">
                          {formatPrice(selectedProduct.prix)}
                        </span>

                        {selectedProduct.originalPrix && (
                          <span className="ml-2 text-lg text-gray-500 line-through">
                            {formatPrice(selectedProduct.originalPrix)}
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Stock: </span>
                        <span className="font-medium">{selectedProduct.quantité} disponibles</span>
                      </div>
                      {selectedProduct.colors && (
                        <div>
                          <span className="text-sm text-gray-600">Couleurs: </span>
                          <span className="font-medium">{selectedProduct.colors.join(', ')}</span>
                        </div>
                      )}
                      {selectedProduct.sizes && (
                        <div>
                          <span className="text-sm text-gray-600">Tailles: </span>
                          <span className="font-medium">{selectedProduct.sizes.join(', ')}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-6">

                 <button
                    onClick={() => {
                    dispatch(addToCartAction(selectedProduct)); // ✅ Action Redux
                    closeModal();
              }}   
               className="flex-1 bg-black text-white py-3 rounded-xl..."
                 >
                Ajouter au panier
              </button>
                      
                      <button
                        onClick={() => toggleFavorite(selectedProduct.id)}
                        className="p-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                      >
                        <Heart 
                          className={`w-6 h-6 ${
                            favorites.includes(selectedProduct.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-600'
                          }`} 
                          
                        />
                      </button>
                  

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
       
    </section>
  );
};

export default ShopCollection;