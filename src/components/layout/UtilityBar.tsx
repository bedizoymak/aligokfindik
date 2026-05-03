import { Phone, Mail, HelpCircle, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLang } from "@/i18n/LanguageContext";

const UtilityBar = () => {
  const { t } = useLang();
  return (
    <div className="hidden md:block bg-espresso">
      <div className="container flex items-center justify-between py-2 text-xs tracking-wide">
        <div className="flex items-center gap-4 text-primary-foreground/80">
          <a href="tel:+905001234567" className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors">
            <Phone className="w-3 h-3" />
            <span>0500 123 45 67</span>
          </a>
          <a href="mailto:info@gokfindik.com" className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors">
            <Mail className="w-3 h-3" />
            <span>info@gokfindik.com</span>
          </a>
        </div>
        <div className="flex items-center gap-4 text-primary-foreground/80">
          <Link to="/kargo-takip" className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors">
            <Truck className="w-3 h-3" />
            <span>{t("nav.tracking")}</span>
          </Link>
          <Link to="/sss" className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors">
            <HelpCircle className="w-3 h-3" />
            <span>{t("util.faq")}</span>
          </Link>
          <span className="text-primary-foreground/40">|</span>
          <Link to="/iletisim" className="hover:text-primary-foreground transition-colors">{t("util.contact")}</Link>
          <span className="text-primary-foreground/40">|</span>
          <div className="text-primary-foreground">
            <LanguageSwitcher compact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;

