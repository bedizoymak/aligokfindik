import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Geçerli bir email giriniz");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-cream-warm flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-hazelnut" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Şifremi Unuttum</h1>
            <p className="text-muted-foreground">E-posta adresinize şifre sıfırlama bağlantısı göndereceğiz.</p>
          </div>
          {sent ? (
            <div className="bg-card p-8 rounded-2xl shadow-card text-center">
              <div className="w-14 h-14 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-forest" />
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-2">Bağlantı Gönderildi</h2>
              <p className="text-muted-foreground text-sm mb-6">
                <strong>{email}</strong> adresine şifre sıfırlama bağlantısı gönderildi. Lütfen e-posta kutunuzu kontrol edin.
              </p>
              <Link to="/giris" className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:text-primary/80">
                <ArrowLeft className="w-4 h-4" /> Giriş sayfasına dön
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 bg-card p-8 rounded-2xl shadow-card">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">E-posta</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                  placeholder="ornek@email.com"
                />
                {error && <p className="text-destructive text-xs mt-1">{error}</p>}
              </div>
              <button type="submit" className="w-full px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors">
                Sıfırlama Bağlantısı Gönder
              </button>
              <p className="text-center">
                <Link to="/giris" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-3.5 h-3.5" /> Giriş sayfasına dön
                </Link>
              </p>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ForgotPasswordPage;
