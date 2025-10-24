import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart:[], 

  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
  shippingCost: 2500,
  freeShippingThreshold: 50000,
  isCartOpen: false,
  userInfo: null, // ✅ pour stocker l'utilisateur connecté
  isOpen: false,
}; 

const bazarSlice = createSlice({
  name: 'bazar',
  initialState,
  reducers: {
    // ✅ Connexion utilisateur
    loginUser: (state, action) => {
      state.userInfo = action.payload;
    },

    // ✅ Déconnexion utilisateur
    logoutUser: (state) => {
      state.userInfo = null;
    },
    

    // Ajouter un article au panier
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: newItem.quantity || 1
        });
      }

      bazarSlice.caseReducers.calculateTotals(state);
    },

    // Augmenter la quantité
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        bazarSlice.caseReducers.calculateTotals(state);
      }
    },

    // Diminuer la quantité
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      }
      bazarSlice.caseReducers.calculateTotals(state);
    },

    // Supprimer un article
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      bazarSlice.caseReducers.calculateTotals(state);
    },

    // Vider le panier
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },

    // Ouvrir/fermer le panier
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    openCart: (state) => {
      state.isCartOpen = true;
    },

    closeCart: (state) => {
      state.isCartOpen = false;
    },

    // Calculer les totaux
    calculateTotals: (state) => {
      state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + (item.prix * item.quantity),
        0
      );
    },
  },
});

// ✅ export des actions
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  calculateTotals,
  loginUser,
  logoutUser,
} = bazarSlice.actions;

export default bazarSlice.reducer;
