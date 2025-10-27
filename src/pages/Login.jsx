import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from "../redux/bazarSlice";
import supabase from "../../supabaseClient";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 Connexion Google
  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/", // retour sur la page d'accueil après login
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url; // redirige vers Google
          // toast.error(" ");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error.message);
      toast.error("Erreur lors de la connexion ");
    }
  };

  // 🔹 Déconnexion
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      dispatch(logoutUser());
      toast.success("Déconnexion réussie 👋");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error.message);
      toast.error("Erreur lors de la déconnexion 😕");
    }
  };

  // 🔹 Vérifie l'état de connexion à chaque chargement
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        const user = data.user;
        dispatch(
          loginUser({
            name: user.user_metadata?.full_name || "Utilisateur",
            email: user.email,
            image: user.user_metadata?.avatar_url,
            uid: user.id,
          })
        );
      }
    };

    getUser();

    // Écoute les changements d’état (connexion/déconnexion)
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const user = session.user;
        dispatch(
          loginUser({
            name: user.user_metadata?.full_name || "Utilisateur",
            email: user.email,
            image: user.user_metadata?.avatar_url,
            uid: user.id,
          })
        );
        toast.success(`Bienvenue ${user.user_metadata?.full_name || ""} 👋`);
      }

      if (event === "SIGNED_OUT") {
        dispatch(logoutUser());
      }
    });

    // Nettoyage du listener quand le composant est démonté
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="mt-[80px] flex flex-col items-center justify-center gap-10 py-20">
      <h1 className="text-2xl font-semibold text-gray-800">
        Connectez-vous avec Google
      </h1>

      <div className="w-full flex items-center justify-center gap-10">
        {/* 🔹 Bouton de connexion Google */}
        <button
          onClick={handleGoogleLogin}
          className="text-base w-60 h-12 border border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 transition duration-300"
        >
          <img
            className="w-8"
            src="https://bazar.reactbd.com/static/media/googleLogo.7dbc7ea39eb97007c7f4.png"
            alt="googleLogo"
          />
          <span className="text-sm text-gray-900">Se connecter avec Google</span>
        </button>

        {/* 🔹 Bouton de déconnexion */}
        <button
          onClick={handleSignOut}
          className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 transition duration-300"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default Login;
