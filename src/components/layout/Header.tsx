import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.png";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLang } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { favorites, isLoggedIn } = useAuth();
  const { t } = useLang();

  const navItems = [
    { label: t("nav.home"), href: "/" },
    {
      label: t("nav.products"),
      href: "/kategori",
      children: [
        { label: t("cat.findik"), href: "/kategori/findik" },
        { label: t("cat.atistirmalik"), href: "/kategori/atistirmalik" },
        { label: t("cat.findik-ezmesi"), href: "/kategori/findik-ezmesi" },
        { label: t("cat.findik-kremasi"), href: "/kategori/findik-kremasi" },
        { label: t("cat.pastacilik"), href: "/kategori/pastacilik" },
        { label: t("cat.hediyelik"), href: "/kategori/hediyelik" },
      ],
    },
    {
      label: t("nav.corporate"),
      href: "/hakkimizda",
      children: [
        { label: t("nav.about"), href: "/hakkimizda" },
        { label: t("nav.production"), href: "/uretim" },
      ],
    },
    { label: t("nav.faq"), href: "/sss" },
    { label: t("nav.contact"), href: "/iletisim" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 -ml-2 text-foreground" aria-label={t("nav.menu")}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="Gök Fındık" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <div key={item.label} className="relative" onMouseEnter={() => item.children && setActiveDropdown(item.label)} onMouseLeave={() => setActiveDropdown(null)}>
              <Link to={item.href} className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2">
                {item.label}
                {item.children && <ChevronDown className="w-3.5 h-3.5" />}
              </Link>
              <AnimatePresence>
                {item.children && activeDropdown === item.label && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.15 }} className="absolute top-full left-0 pt-2">
                    <div className="bg-background rounded-lg shadow-elevated border border-border py-2 min-w-[200px]">
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.href} className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-muted transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <div className="md:hidden">
            <LanguageSwitcher compact />
          </div>
          <button onClick={() => setSearchOpen(!searchOpen)} className="p-2.5 rounded-full text-foreground/70 hover:text-foreground hover:bg-muted transition-colors" aria-label={t("nav.search")}>
            <Search className="w-5 h-5" />
          </button>
          <Link to={isLoggedIn ? "/hesap" : "/giris"} className="hidden md:flex p-2.5 rounded-full text-foreground/70 hover:text-foreground hover:bg-muted transition-colors" aria-label={t("nav.account")}>
            <User className="w-5 h-5" />
          </Link>
          <Link to="/favoriler" className="hidden md:flex p-2.5 rounded-full text-foreground/70 hover:text-foreground hover:bg-muted transition-colors relative" aria-label={t("nav.favorites")}>
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link to="/sepet" className="relative p-2.5 rounded-full text-foreground/70 hover:text-foreground hover:bg-muted transition-colors" aria-label={t("nav.cart")}>
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t border-border overflow-hidden">
            <div className="container py-4">
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="text" placeholder={t("nav.search")} autoFocus className="w-full pl-12 pr-4 py-3 rounded-full bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-border overflow-hidden bg-background">
            <nav className="container py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link to={item.href} onClick={() => !item.children && setMobileOpen(false)} className="block px-3 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-6 space-y-0.5">
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-border flex gap-2">
                <Link to={isLoggedIn ? "/hesap" : "/giris"} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground">
                  <User className="w-4 h-4" /> {t("nav.account")}
                </Link>
                <Link to="/favoriler" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground">
                  <Heart className="w-4 h-4" /> {t("nav.favorites")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
