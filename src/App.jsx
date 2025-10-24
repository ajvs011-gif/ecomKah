
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Accueil from "./pages/Accueil";
import FacturePage from "./pages/FacturePage";
import AgentIAPage from "./pages/AgentIAPage";
import Banner from "./components/Banner";
import NotFound from "./pages/NotFound";
import NewInvoice from "./pages/NewInvoice";
import Fonctionnalités from "./pages/Fonctionnalités"
import Cart from "./pages/Cart";
import Dashboard from "./pages/admin/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import AddProduct from "./pages/admin/AddProduct";
import Purchases from "./pages/admin/Purchases";
import Apropos from "./pages/Apropos";

// import AdminDashboard from "./components/AdminDashboard";
// import productDetails from "./pages/productDetails";
// import PrivateRoute from "./pages/PrivateRoute"; // Si vous avez une route privée
// import { auth } from "./firebaseConfig"; // Si vous utilisez Firebase pour l'authentification
// import { useAuthState } from "react-firebase-hooks/auth"; // Si vous utilisez Firebase pour l'authentification
// import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Accueil />} />
          <Route path="Commencer" element={<FacturePage />} />
          <Route path="Fonctionnalités" element={<Fonctionnalités />} />
          <Route path="agent" element={<AgentIAPage />} />
          <Route path="banner" element={<Banner />} />
        <Route path="Login" element = {< Login/>}/>
           <Route path="/cart" element={<Cart />} /> 
            <Route path="/Apropos" element={<Apropos />} /> 
          <Route path="/product/:id" element={<productDetails />} />
          {/* <Route path="/adminDashboard" element={<AdminDashboard />} /> */}
            <Route path='dashboard' element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='add-product' element={<AddProduct />} />
            <Route path='purchases' element={<Purchases />} />
          </Route>

          
           {/* <Route path="dashboard" element={
            <PrivateRoute><DashboardPage /></PrivateRoute>
          } />  */}
        </Route>


        {/* Auth routes en dehors du Layout */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="login" element={<Login />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
        <Route path="NewInvoice" element={<NewInvoice />} />
      </Routes>
    
    </div>
  );
}

export default App;
