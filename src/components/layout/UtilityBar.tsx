import { Phone, Mail, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const UtilityBar = () => {
  return (
    <div className="hidden md:block bg-espresso">
      <div className="container flex items-center justify-between py-2 text-xs tracking-wide">
        <div className="flex items-center gap-4 text-primary-foreground/80">
          <a href="tel:+905001234567" className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors">
            <Phone className="w-3 h-3" />
            <span>0500 123 45 67</span>
          </a>
           <a href="mailto:info@aligokfindik.com" className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors">
             <Mail className="w-3 h-3" />
             <span>info@aligokfindik.com</span>
          </a>
        </div>
        <div className="flex items-center gap-4 text-primary-foreground/80">
          <Link to="/sss" className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors">
            <HelpCircle className="w-3 h-3" />
            <span>Sıkça Sorulan Sorular</span>
          </Link>
          <span className="text-primary-foreground/40">|</span>
          <Link to="/iletisim" className="hover:text-primary-foreground transition-colors">İletişim</Link>
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
