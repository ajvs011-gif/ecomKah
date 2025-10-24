import { useState } from "react";
function NewInvoice() {
  const [client, setClient] = useState({ nom: "", contact: "" });
  const [produits, setProduits] = useState([
    { nom: "", quantite: 1, prix: 0 }
  ]);

  // Ajouter un nouveau produit
  const ajouterProduit = () => {
    setProduits([...produits, { nom: "", quantite: 1, prix: 0 }]);
  };

  // Gérer les changements dans les inputs produit
  const handleProduitChange = (index, field, value) => {
    const nouveauxProduits = [...produits];
    nouveauxProduits[index][field] = field === "quantite" || field === "prix"
      ? parseInt(value) || 0
      : value;
    setProduits(nouveauxProduits);
  };

  const calculTotal = () => {
    return produits.reduce((total, item) => total + item.quantite * item.prix, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const facture = {
      nomClient: client.nom,
      contactClient: client.contact,
      produits: produits,
      total: calculTotal(),
    };

    console.log("Facture à générer :", facture);
    // Prochaine étape : envoyer dans Firestore ou générer le PDF
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Nouvelle facture 🧾</h2>

      <form onSubmit={handleSubmit}>
        {/* Client */}
        <div className="mb-4">
          <label className="block font-semibold">Nom du client</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={client.nom}
            onChange={(e) => setClient({ ...client, nom: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Contact</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={client.contact}
            onChange={(e) => setClient({ ...client, contact: e.target.value })}
          />
        </div>

        {/* Produits */}
        <h3 className="text-xl font-semibold mt-6 mb-2">Produits</h3>
        {produits.map((produit, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-3">
            <input
              type="text"
              placeholder="Nom du produit"
              className="border p-2 rounded"
              value={produit.nom}
              onChange={(e) =>
                handleProduitChange(index, "nom", e.target.value)
              }
              required
            />
            <input
              type="number"
              placeholder="Quantité"
              className="border p-2 rounded"
              value={produit.quantite}
              onChange={(e) =>
                handleProduitChange(index, "quantite", e.target.value)
              }
              min="1"
              required
            />
            <input
              type="number"
              placeholder="Prix unitaire"
              className="border p-2 rounded"
              value={produit.prix}
              onChange={(e) =>
                handleProduitChange(index, "prix", e.target.value)
              }
              required
            />
          </div>
        ))}

        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          onClick={ajouterProduit}
        >
          ➕ Ajouter un produit
        </button>

        {/* Total */}
        <div className="font-bold text-right text-lg mb-4">
          Total : {calculTotal().toLocaleString()} FCFA
        </div>

        {/* Bouton soumettre */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Générer la facture
        </button>
      </form>
    </div>
  );
}

export default NewInvoice;
