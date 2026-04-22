function Cancel() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Votre paiement n’a pas été complété
      </h1>

      <p className="text-lg text-gray-700 mb-6">
         Pas d’inquiétude, votre panier a été sauvegardé.
         Vous pouvez reprendre votre commande à tout moment.
      </p>

      <a
        href="/cart"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
      >
        Retour au panier
      </a>
    </div>
  );
}

export default Cancel;