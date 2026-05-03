import { Globe } from "lucide-react";
import { useLang, type Lang } from "@/i18n/LanguageContext";

const LanguageSwitcher = ({ compact = false }: { compact?: boolean }) => {
  const { lang, setLang } = useLang();
  const opts: Lang[] = ["tr", "en"];

  return (
    <div className={`flex items-center gap-1 ${compact ? "" : "rounded-full border border-border bg-background/50 px-2 py-1"}`}>
      {!compact && <Globe className="w-3.5 h-3.5 text-muted-foreground" />}
      {opts.map((l, i) => (
        <span key={l} className="flex items-center">
          <button
            onClick={() => setLang(l)}
            aria-label={`Dil: ${l.toUpperCase()}`}
            className={`text-xs font-semibold uppercase tracking-wide transition-colors px-1.5 ${
              lang === l ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l}
          </button>
          {i < opts.length - 1 && <span className="text-muted-foreground/40">|</span>}
        </span>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
