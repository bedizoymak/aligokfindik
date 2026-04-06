import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ProductionPage from "./pages/ProductionPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import FaqPage from "./pages/FaqPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import OrderSuccessPage from "./pages/OrderSuccessPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/kategori" element={<CategoryPage />} />
              <Route path="/kategori/:slug" element={<CategoryPage />} />
              <Route path="/urun/:slug" element={<ProductDetailPage />} />
              <Route path="/hakkimizda" element={<AboutPage />} />
              <Route path="/uretim" element={<ProductionPage />} />
              <Route path="/iletisim" element={<ContactPage />} />
              <Route path="/sss" element={<FaqPage />} />
              <Route path="/sepet" element={<CartPage />} />
              <Route path="/favoriler" element={<FavoritesPage />} />
              <Route path="/giris" element={<LoginPage />} />
              <Route path="/kayit" element={<RegisterPage />} />
              <Route path="/sifremi-unuttum" element={<ForgotPasswordPage />} />
              <Route path="/hesap" element={<AccountPage />} />
              <Route path="/odeme" element={<CheckoutPage />} />
              <Route path="/siparis-basarili" element={<OrderSuccessPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
