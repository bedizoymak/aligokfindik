import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, MapPin, Package, Heart, LogOut, Plus, Trash2, ShoppingBag, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";

type Tab = "profile" | "addresses" | "orders" | "favorites";

const tabs: { key: Tab; label: string; icon: typeof User }[] = [
  { key: "profile", label: "Profil Bilgilerim", icon: User },
  { key: "addresses", label: "Adreslerim", icon: MapPin },
  { key: "orders", label: "Siparişlerim", icon: Package },
  { key: "favorites", label: "Favorilerim", icon: Heart },
];

const AccountPage = () => {
  const { user, isLoggedIn, logout, updateProfile, addresses, addAddress, removeAddress, orders, favorites } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("profile");
  const [editName, setEditName] = useState(user?.fullName || "");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrForm, setAddrForm] = useState({ title: "", fullName: "", phone: "", city: "", district: "", postalCode: "", address: "" });
  const [addrErrors, setAddrErrors] = useState<Record<string, string>>({});

  if (!isLoggedIn) {
    return (
      <Layout>
        <section className="py-16 md:py-24">
          <div className="container max-w-md text-center">
            <div className="w-20 h-20 rounded-full bg-cream-warm flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-hazelnut" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-3">Hesabım</h1>
            <p className="text-muted-foreground mb-8">Hesabınıza erişmek için giriş yapın.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/giris" className="px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors">
                Giriş Yap
              </Link>
              <Link to="/kayit" className="px-7 py-3.5 border border-border text-foreground font-semibold rounded-full hover:bg-muted transition-colors">
                Kayıt Ol
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const handleSaveProfile = () => {
    updateProfile({ fullName: editName });
    toast.success("Profil güncellendi");
  };

  const handleAddAddress = () => {
    const e: Record<string, string> = {};
    if (!addrForm.title.trim()) e.title = "Zorunlu";
    if (!addrForm.fullName.trim()) e.fullName = "Zorunlu";
    if (!addrForm.phone.trim()) e.phone = "Zorunlu";
    if (!addrForm.city.trim()) e.city = "Zorunlu";
    if (!addrForm.address.trim()) e.address = "Zorunlu";
    setAddrErrors(e);
    if (Object.keys(e).length > 0) return;
    addAddress(addrForm);
    setAddrForm({ title: "", fullName: "", phone: "", city: "", district: "", postalCode: "", address: "" });
    setShowAddressForm(false);
    toast.success("Adres eklendi");
  };

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const statusColor: Record<string, string> = {
    "Hazırlanıyor": "bg-gold/20 text-gold",
    "Kargoda": "bg-primary/10 text-primary",
    "Teslim Edildi": "bg-forest/10 text-forest",
  };

  const inputCls = "w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition text-sm";

  return (
    <Layout>
      <section className="py-10 md:py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Hesabım</h1>
              <p className="text-muted-foreground text-sm mt-1">Hoş geldiniz, {user?.fullName}</p>
            </div>
            <button onClick={() => { logout(); navigate("/"); toast.success("Çıkış yapıldı"); }} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
              <LogOut className="w-4 h-4" /> Çıkış Yap
            </button>
          </div>

          <div className="grid md:grid-cols-[240px_1fr] gap-8">
            {/* Sidebar */}
            <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${tab === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
              {tab === "profile" && (
                <div className="bg-card p-6 md:p-8 rounded-2xl shadow-card space-y-6 max-w-lg">
                  <h2 className="font-heading text-xl font-bold text-foreground">Profil Bilgileri</h2>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Ad Soyad</label>
                    <input value={editName} onChange={(e) => setEditName(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">E-posta</label>
                    <input value={user?.email || ""} readOnly className={`${inputCls} opacity-60 cursor-not-allowed`} />
                  </div>
                  <button onClick={handleSaveProfile} className="px-7 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors text-sm">
                    Kaydet
                  </button>
                </div>
              )}

              {tab === "addresses" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-heading text-xl font-bold text-foreground">Adreslerim</h2>
                    <button onClick={() => setShowAddressForm(!showAddressForm)} className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80">
                      <Plus className="w-4 h-4" /> Yeni Adres
                    </button>
                  </div>

                  {showAddressForm && (
                    <div className="bg-card p-6 rounded-2xl shadow-card space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1">Adres Başlığı *</label>
                          <input value={addrForm.title} onChange={(e) => setAddrForm({ ...addrForm, title: e.target.value })} className={inputCls} placeholder="Ev, İş..." />
                          {addrErrors.title && <p className="text-destructive text-xs mt-1">{addrErrors.title}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1">Ad Soyad *</label>
                          <input value={addrForm.fullName} onChange={(e) => setAddrForm({ ...addrForm, fullName: e.target.value })} className={inputCls} />
                          {addrErrors.fullName && <p className="text-destructive text-xs mt-1">{addrErrors.fullName}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1">Telefon *</label>
                          <input value={addrForm.phone} onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })} className={inputCls} placeholder="05XX XXX XX XX" />
                          {addrErrors.phone && <p className="text-destructive text-xs mt-1">{addrErrors.phone}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1">Şehir *</label>
                          <input value={addrForm.city} onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })} className={inputCls} />
                          {addrErrors.city && <p className="text-destructive text-xs mt-1">{addrErrors.city}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1">İlçe</label>
                          <input value={addrForm.district} onChange={(e) => setAddrForm({ ...addrForm, district: e.target.value })} className={inputCls} />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1">Posta Kodu</label>
                          <input value={addrForm.postalCode} onChange={(e) => setAddrForm({ ...addrForm, postalCode: e.target.value })} className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Adres *</label>
                        <textarea value={addrForm.address} onChange={(e) => setAddrForm({ ...addrForm, address: e.target.value })} rows={3} className={`${inputCls} resize-none`} />
                        {addrErrors.address && <p className="text-destructive text-xs mt-1">{addrErrors.address}</p>}
                      </div>
                      <div className="flex gap-3">
                        <button onClick={handleAddAddress} className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full text-sm hover:bg-primary/90 transition-colors">Kaydet</button>
                        <button onClick={() => setShowAddressForm(false)} className="px-6 py-2.5 border border-border text-foreground font-medium rounded-full text-sm hover:bg-muted transition-colors">İptal</button>
                      </div>
                    </div>
                  )}

                  {addresses.length === 0 && !showAddressForm ? (
                    <div className="bg-card p-8 rounded-2xl shadow-card text-center">
                      <MapPin className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                      <p className="text-muted-foreground mb-4">Kayıtlı adresiniz bulunmuyor.</p>
                      <button onClick={() => setShowAddressForm(true)} className="text-sm text-primary font-medium hover:text-primary/80">
                        Adres Ekle
                      </button>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {addresses.map((addr) => (
                        <div key={addr.id} className="bg-card p-5 rounded-xl shadow-soft flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-foreground text-sm mb-1">{addr.title}</h3>
                            <p className="text-xs text-muted-foreground">{addr.fullName} · {addr.phone}</p>
                            <p className="text-xs text-muted-foreground mt-1">{addr.address}, {addr.district} {addr.city} {addr.postalCode}</p>
                          </div>
                          <button onClick={() => { removeAddress(addr.id); toast.success("Adres silindi"); }} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === "orders" && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold text-foreground">Siparişlerim</h2>
                  {orders.length === 0 ? (
                    <div className="bg-card p-8 rounded-2xl shadow-card text-center">
                      <Package className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                      <p className="text-muted-foreground mb-4">Henüz siparişiniz bulunmuyor.</p>
                      <Link to="/kategori" className="text-sm text-primary font-medium hover:text-primary/80">
                        Alışverişe Başla
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="bg-card p-5 rounded-xl shadow-soft">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="font-medium text-foreground text-sm">Sipariş #{order.id}</p>
                              <p className="text-xs text-muted-foreground">{order.date}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor[order.status] || ""}`}>
                                {order.status}
                              </span>
                              <span className="font-bold text-sm text-foreground">₺{order.total.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            {order.items.map((item, i) => (
                              <div key={i} className="flex justify-between text-xs text-muted-foreground">
                                <span>{item.name} x{item.quantity}</span>
                                <span>₺{(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === "favorites" && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold text-foreground">Favorilerim</h2>
                  {favoriteProducts.length === 0 ? (
                    <div className="bg-card p-8 rounded-2xl shadow-card text-center">
                      <Heart className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                      <p className="text-muted-foreground mb-4">Favori ürününüz bulunmuyor.</p>
                      <Link to="/kategori" className="text-sm text-primary font-medium hover:text-primary/80">
                        Ürünleri Keşfet
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {favoriteProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AccountPage;
