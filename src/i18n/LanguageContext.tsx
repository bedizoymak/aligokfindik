import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "tr" | "en";

type Dict = Record<string, string>;

const tr: Dict = {
  // Utility bar
  "util.faq": "Sıkça Sorulan Sorular",
  "util.contact": "İletişim",
  // Header
  "nav.home": "Anasayfa",
  "nav.products": "Ürünler",
  "nav.corporate": "Kurumsal",
  "nav.about": "Hakkımızda",
  "nav.production": "Üretim Tesisimiz",
  "nav.faq": "SSS",
  "nav.contact": "İletişim",
  "nav.account": "Hesabım",
  "nav.favorites": "Favoriler",
  "nav.cart": "Sepet",
  "nav.search": "Ürün ara...",
  "nav.menu": "Menü",
  "nav.tracking": "Sipariş Takibi",
  // Categories
  "cat.findik": "Fındık",
  "cat.atistirmalik": "Atıştırmalık",
  "cat.findik-ezmesi": "Fındık Ezmesi",
  "cat.findik-kremasi": "Fındık Kreması",
  "cat.pastacilik": "Pastacılık",
  "cat.hediyelik": "Hediyelik",
  // Hero
  "hero.eyebrow": "1956'dan Günümüze",
  "hero.title.1": "Gelenekten Gelen",
  "hero.title.2": "Lezzet",
  "hero.desc": "Karadeniz'in eşsiz fındık lezzetini, özenle hazırlanmış ürünlerle sofralarınıza taşıyoruz.",
  "hero.cta.shop": "Ürünleri Keşfet",
  "hero.cta.story": "Hikâyemiz",
  // Trust
  "trust.natural": "Doğal ve Taze",
  "trust.premium": "Premium Kalite",
  "trust.secure": "Güvenli Alışveriş",
  "trust.shipping": "Hızlı Kargo",
  // Sections
  "sec.categories.eyebrow": "Kategoriler",
  "sec.categories.title": "Lezzet Dünyamızı Keşfedin",
  "sec.featured.eyebrow": "Öne Çıkanlar",
  "sec.featured.title": "Çok Satan Ürünler",
  "sec.viewAll": "Tümünü Gör",
  "sec.story.eyebrow": "Hikâyemiz",
  "sec.story.title.1": "1956'dan Günümüze",
  "sec.story.title.2": "Lezzet Geleneği",
  "sec.story.p1": "Gök Fındık, 1956 yılında Giresun'da küçük bir aile işletmesi olarak kurulmuştur. Üç nesil boyunca sürdürdüğümüz geleneksel üretim anlayışı ve kalite tutkusu, bugün Türkiye'nin en güvenilir fındık markalarından biri olmamızı sağlamıştır.",
  "sec.story.p2": "Her bir fındık tanesi özenle seçilir, geleneksel yöntemlerle işlenir ve doğallığını koruyarak sofralarınıza ulaşır.",
  "sec.story.more": "Daha Fazla Bilgi",
  "sec.why.title": "Neden Gök Fındık?",
  "sec.newsletter.title": "Lezzet Haberlerinden İlk Siz Haberdar Olun",
  "sec.newsletter.desc": "Yeni ürünler, özel kampanyalar ve tarifler için bültenimize abone olun.",
  "sec.newsletter.placeholder": "E-posta adresiniz",
  "sec.newsletter.cta": "Abone Ol",
  // Footer
  "footer.tagline": "1956'dan günümüze, Karadeniz'in en seçkin fındıklarını özenle işliyor, doğal lezzeti sofralarınıza taşıyoruz.",
  "footer.quickLinks": "Hızlı Linkler",
  "footer.categories": "Kategoriler",
  "footer.contact": "İletişim",
  "footer.rights": "© 2026 Gök Fındık. Tüm hakları saklıdır.",
  "footer.privacy": "Gizlilik Politikası",
  "footer.terms": "Kullanım Koşulları",
  "footer.kvkk": "KVKK",
  // Cargo / Order tracking
  "track.title": "Kargo Takibi",
  "track.desc": "Sipariş numaranızı girerek kargonuzun durumunu takip edebilirsiniz.",
  "track.placeholder": "Sipariş numarası (örn. GF-123456)",
  "track.button": "Takip Et",
  "track.notFound": "Bu numarayla sipariş bulunamadı.",
  "track.cargoCompany": "Kargo Firması",
  "track.trackingNo": "Takip Numarası",
  "track.estimated": "Tahmini Teslim",
  "track.status.received": "Sipariş Alındı",
  "track.status.preparing": "Hazırlanıyor",
  "track.status.shipped": "Kargoda",
  "track.status.delivered": "Teslim Edildi",
  // Privacy & Terms
  "legal.privacy.title": "Gizlilik Politikası",
  "legal.terms.title": "Kullanım Koşulları",
  "legal.kvkk.title": "KVKK Aydınlatma Metni",
  "legal.lastUpdate": "Son güncelleme: Mayıs 2026",
};

const en: Dict = {
  "util.faq": "Frequently Asked Questions",
  "util.contact": "Contact",
  "nav.home": "Home",
  "nav.products": "Products",
  "nav.corporate": "Corporate",
  "nav.about": "About Us",
  "nav.production": "Our Facility",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "nav.account": "Account",
  "nav.favorites": "Favorites",
  "nav.cart": "Cart",
  "nav.search": "Search products...",
  "nav.menu": "Menu",
  "nav.tracking": "Track Order",
  "cat.findik": "Hazelnuts",
  "cat.atistirmalik": "Snacks",
  "cat.findik-ezmesi": "Hazelnut Paste",
  "cat.findik-kremasi": "Hazelnut Cream",
  "cat.pastacilik": "Baking",
  "cat.hediyelik": "Gifts",
  "hero.eyebrow": "Since 1956",
  "hero.title.1": "Heritage of",
  "hero.title.2": "Flavor",
  "hero.desc": "Bringing the unique taste of Black Sea hazelnuts to your table with care and craftsmanship.",
  "hero.cta.shop": "Shop Products",
  "hero.cta.story": "Our Story",
  "trust.natural": "Natural & Fresh",
  "trust.premium": "Premium Quality",
  "trust.secure": "Secure Checkout",
  "trust.shipping": "Fast Shipping",
  "sec.categories.eyebrow": "Categories",
  "sec.categories.title": "Discover Our World of Flavor",
  "sec.featured.eyebrow": "Featured",
  "sec.featured.title": "Best Sellers",
  "sec.viewAll": "View All",
  "sec.story.eyebrow": "Our Story",
  "sec.story.title.1": "Since 1956,",
  "sec.story.title.2": "A Tradition of Taste",
  "sec.story.p1": "Founded in 1956 in Giresun as a small family business, Gök Fındık has grown across three generations into one of Türkiye's most trusted hazelnut brands through dedication to quality and tradition.",
  "sec.story.p2": "Every hazelnut is hand-picked, processed with traditional methods, and delivered to your table preserving its natural goodness.",
  "sec.story.more": "Learn More",
  "sec.why.title": "Why Gök Fındık?",
  "sec.newsletter.title": "Be the First to Know",
  "sec.newsletter.desc": "Subscribe for new products, special offers and recipes.",
  "sec.newsletter.placeholder": "Your email address",
  "sec.newsletter.cta": "Subscribe",
  "footer.tagline": "Since 1956, we craft the finest hazelnuts of the Black Sea, bringing natural flavor to your table.",
  "footer.quickLinks": "Quick Links",
  "footer.categories": "Categories",
  "footer.contact": "Contact",
  "footer.rights": "© 2026 Gök Fındık. All rights reserved.",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Use",
  "footer.kvkk": "Data Protection",
  "track.title": "Order Tracking",
  "track.desc": "Enter your order number to track shipment status.",
  "track.placeholder": "Order number (e.g. GF-123456)",
  "track.button": "Track",
  "track.notFound": "No order found with this number.",
  "track.cargoCompany": "Cargo Company",
  "track.trackingNo": "Tracking Number",
  "track.estimated": "Estimated Delivery",
  "track.status.received": "Order Received",
  "track.status.preparing": "Preparing",
  "track.status.shipped": "Shipped",
  "track.status.delivered": "Delivered",
  "legal.privacy.title": "Privacy Policy",
  "legal.terms.title": "Terms of Use",
  "legal.kvkk.title": "Data Protection Notice",
  "legal.lastUpdate": "Last updated: May 2026",
};

const dictionaries: Record<Lang, Dict> = { tr, en };

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export const useLang = () => useContext(LanguageContext);

const STORAGE_KEY = "gok-findik-lang";

const detectDefault = (): Lang => {
  // NOTE: True IP-based geolocation is not available client-side without a 3rd-party API.
  // To enable IP geo (e.g. via an edge function or ipapi.co), replace this fallback.
  // For now, we use browser language: Turkish-speaking visitors get TR, others EN.
  if (typeof navigator !== "undefined") {
    const langs = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
    if (langs.some((l) => l.toLowerCase().startsWith("tr"))) return "tr";
  }
  return "en";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "tr" || stored === "en") return stored;
    } catch {}
    return detectDefault();
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {}
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const t = (key: string) => dictionaries[lang][key] ?? dictionaries.tr[key] ?? key;

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};
