import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", passwordConfirm: "", terms: false });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, value: string | boolean) => setForm((p) => ({ ...p, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Bu alan zorunludur";
    if (!form.email.trim()) e.email = "Bu alan zorunludur";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Geçerli bir email giriniz";
    if (!form.password) e.password = "Bu alan zorunludur";
    else if (form.password.length < 6) e.password = "Şifre en az 6 karakter olmalıdır";
    if (form.password !== form.passwordConfirm) e.passwordConfirm = "Şifreler eşleşmiyor";
    if (!form.terms) e.terms = "Kullanım şartlarını kabul etmelisiniz";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    register(form.fullName, form.email, form.password);
    toast.success("Kayıt başarılı! Hoş geldiniz.");
    navigate("/hesap");
  };

  const inputCls = "w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition";

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Kayıt Ol</h1>
            <p className="text-muted-foreground">Yeni bir hesap oluşturun</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 bg-card p-8 rounded-2xl shadow-card">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Ad Soyad</label>
              <input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} className={inputCls} placeholder="Ad Soyad" />
              {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">E-posta</label>
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} placeholder="ornek@email.com" />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Şifre</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={form.password} onChange={(e) => set("password", e.target.value)} className={`${inputCls} pr-12`} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Şifre Tekrar</label>
              <input type="password" value={form.passwordConfirm} onChange={(e) => set("passwordConfirm", e.target.value)} className={inputCls} placeholder="••••••••" />
              {errors.passwordConfirm && <p className="text-destructive text-xs mt-1">{errors.passwordConfirm}</p>}
            </div>
            <div>
              <label className="flex items-start gap-2 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" checked={form.terms} onChange={(e) => set("terms", e.target.checked)} className="rounded border-border mt-0.5" />
                <span><Link to="#" className="text-primary hover:underline">Kullanım şartlarını</Link> ve <Link to="#" className="text-primary hover:underline">gizlilik politikasını</Link> kabul ediyorum.</span>
              </label>
              {errors.terms && <p className="text-destructive text-xs mt-1">{errors.terms}</p>}
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors">
              <UserPlus className="w-4 h-4" /> Kayıt Ol
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Zaten hesabınız var mı?{" "}
              <Link to="/giris" className="text-primary font-medium hover:text-primary/80">Giriş Yap</Link>
            </p>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;
