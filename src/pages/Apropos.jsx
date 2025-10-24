import React from "react";

const Apropos = () => {
  return (
    <div className="max-w-4xl mx-auto mt-24 px-6 py-12 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        🌍 Présentation de la marque <span className="text-blue-600">ANB</span>
      </h1>

      <section className="space-y-6 text-gray-800 leading-relaxed">
        {/* Qui sommes-nous */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">🔹 Qui sommes-nous ?</h2>
          <p>
            <strong>ANB</strong> est bien plus qu’une marque de sport.
            C’est un mouvement qui unit performance, style et impact positif.
            Nous croyons que chaque sportif, du débutant au champion, peut inspirer le changement –
            sur le terrain comme dans la société.
          </p>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Vision */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">🔹 Notre vision</h2>
          <p>
            Créer une génération de sportifs qui allient discipline, passion et respect de
            l’environnement. Chez ANB, le sport devient un moyen d’agir pour soi et pour les autres,
            tout en construisant un futur durable.
          </p>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Valeurs */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">🔹 Nos valeurs</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              ✨ <strong>Performance</strong> : chaque effort compte, chaque victoire commence par la discipline.
            </li>
            <li>
              ✨ <strong>Impact social</strong> : soutenir les jeunes, encourager la solidarité et l’entraide.
            </li>
            <li>
              ✨ <strong>Respect de l’environnement</strong> : concevoir des produits écoresponsables et
              sensibiliser à une pratique durable.
            </li>
          </ul>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Offres */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">🔹 Ce que nous proposons</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>🏃‍♂️ Tenues et accessoires sportifs modernes, inspirés de l’Afrique et conçus pour bouger avec style.</li>
            <li>🌱 Des produits qui rappellent que le sport peut rimer avec écologie.</li>
            <li>💡 Des contenus inspirants qui motivent chacun à dépasser ses limites.</li>
          </ul>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Pourquoi ANB */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">🔹 Pourquoi ANB ?</h2>
          <p>
            Parce qu’<strong>ANB</strong> n’est pas seulement une marque de sport.
            C’est une identité, un symbole d’appartenance et une source d’inspiration
            pour tous ceux qui veulent progresser tout en ayant un impact positif sur
            la société et la planète.
          </p>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Rejoindre */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-blue-600 mb-3">🔥 Rejoignez le mouvement ANB</h2>
          <p className="italic">
            Chez ANB, le sport devient un langage universel pour inspirer, unir et changer le monde.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Apropos;
