import React from "react";
import { FaStopwatch, FaCreditCard, FaCheckCircle } from "react-icons/fa";

export default function FeaturesSection() {






    
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {/* Bloc 1 */}
        <div className="flex flex-col items-center">
          <FaStopwatch className="text-4xl text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Facturation rapide</h3>
          <p className="text-gray-600">Créez des factures en quelques clics.</p>
        </div>

        {/* Bloc 2 */}
        <div className="flex flex-col items-center">
          <FaCreditCard className="text-4xl text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Paiement en ligne</h3>
          <p className="text-gray-600">Acceptez les paiements par carte bancaire.</p>
        </div>

        {/* Bloc 3 */}
        <div className="flex flex-col items-center">
          <FaCheckCircle className="text-4xl text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Suivi automatique</h3>
          <p className="text-gray-600">Suivez l’état de vos paiements facilement.</p>
        </div>
      </div>
    </section>
  );
}
