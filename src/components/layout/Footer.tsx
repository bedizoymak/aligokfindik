import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="bg-espresso text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold">
              Gök <span className="text-gold">Fındık</span>
            </h3>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">{t("footer.tagline")}</p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors text-sm font-bold" aria-label="Instagram">IG</a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors text-sm font-bold" aria-label="Facebook">FB</a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors text-sm font-bold" aria-label="Twitter">X</a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2.5">
              {[
                { label: t("nav.home"), href: "/" },
                { label: t("nav.about"), href: "/hakkimizda" },
                { label: t("nav.production"), href: "/uretim" },
                { label: t("nav.tracking"), href: "/kargo-takip" },
                { label: t("nav.faq"), href: "/sss" },
                { label: t("nav.contact"), href: "/iletisim" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">{t("footer.categories")}</h4>
            <ul className="space-y-2.5">
              {[
                { key: "findik", href: "/kategori/findik" },
                { key: "atistirmalik", href: "/kategori/atistirmalik" },
                { key: "findik-ezmesi", href: "/kategori/findik-ezmesi" },
                { key: "findik-kremasi", href: "/kategori/findik-kremasi" },
                { key: "pastacilik", href: "/kategori/pastacilik" },
                { key: "hediyelik", href: "/kategori/hediyelik" },
              ].map((link) => (
                <li key={link.key}>
                  <Link to={link.href} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">{t(`cat.${link.key}`)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">{t("footer.contact")}</h4>
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
                <a href="mailto:info@gokfindik.com" className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>info@gokfindik.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/40">
          <p>{t("footer.rights")}</p>
          <div className="flex gap-4">
            <Link to="/gizlilik" className="hover:text-primary-foreground/60 transition-colors">{t("footer.privacy")}</Link>
            <Link to="/kullanim-kosullari" className="hover:text-primary-foreground/60 transition-colors">{t("footer.terms")}</Link>
            <Link to="/kvkk" className="hover:text-primary-foreground/60 transition-colors">{t("footer.kvkk")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
