import {
  doc,
  getDoc,
  query,
  getDocs,
  collection,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";

// ✅ Fonction pour récupérer les produits
export const getItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("❌ Erreur lors du chargement des produits :", error);
    return [];
  }
};

// ✅ Fonction pour obtenir le rôle d’un utilisateur
export async function getUserRole(id) {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().role;
    } else {
      console.warn("⚠️ Utilisateur non trouvé dans Firestore.");
      return null;
    }
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du rôle :", error);
    return null;
  }
}
