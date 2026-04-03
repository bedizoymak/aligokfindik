import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-espresso text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold">
              Ali Gök <span className="text-gold">Fındık</span>
            </h3>
             <p className="text-sm text-primary-foreground/60 leading-relaxed">
               1956'dan günümüze, Karadeniz'in en seçkin fındıklarını özenle işliyor, doğal lezzeti sofralarınıza taşıyoruz.
             </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors text-sm font-bold" aria-label="Instagram">
                IG
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors text-sm font-bold" aria-label="Facebook">
                FB
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors text-sm font-bold" aria-label="Twitter">
                X
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Anasayfa", href: "/" },
                { label: "Hakkımızda", href: "/hakkimizda" },
                { label: "Üretim Tesisimiz", href: "/uretim" },
                { label: "Sıkça Sorulan Sorular", href: "/sss" },
                { label: "İletişim", href: "/iletisim" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Kategoriler</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Fındık", href: "/kategori/findik" },
                { label: "Atıştırmalık", href: "/kategori/atistirmalik" },
                { label: "Fındık Ezmesi", href: "/kategori/findik-ezmesi" },
                { label: "Fındık Kreması", href: "/kategori/findik-kremasi" },
                { label: "Pastacılık", href: "/kategori/pastacilik" },
                { label: "Hediyelik", href: "/kategori/hediyelik" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">İletişim</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Giresun Merkez, Türkiye</span>
              </li>
              <li>
                <a href="tel:+905001234567" className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>0500 123 45 67</span>
                </a>
              </li>
              <li>
                 <a href="mailto:info@aligokfindik.com" className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                   <Mail className="w-4 h-4 shrink-0" />
                   <span>info@aligokfindik.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/40">
          <p>© 2026 Ali Gök Fındık. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <Link to="/gizlilik" className="hover:text-primary-foreground/60 transition-colors">Gizlilik Politikası</Link>
            <Link to="/kullanim-kosullari" className="hover:text-primary-foreground/60 transition-colors">Kullanım Koşulları</Link>
            <Link to="/kvkk" className="hover:text-primary-foreground/60 transition-colors">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
