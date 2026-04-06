import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Truck, CreditCard, ClipboardList, Check, ChevronRight, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const steps = [
  { key: "address", label: "Adres", icon: MapPin },
  { key: "shipping", label: "Kargo", icon: Truck },
  { key: "payment", label: "Ödeme", icon: CreditCard },
  { key: "summary", label: "Özet", icon: ClipboardList },
] as const;

type Step = (typeof steps)[number]["key"];

const FREE_SHIPPING_THRESHOLD = 500;
const STANDARD_SHIPPING = 39.90;
const EXPRESS_SHIPPING = 69.90;

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const { addresses, addAddress, addOrder } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("address");
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || "");
  const [showNewAddr, setShowNewAddr] = useState(addresses.length === 0);
  const [addrForm, setAddrForm] = useState({ title: "Teslimat Adresi", fullName: "", phone: "", city: "", district: "", postalCode: "", address: "" });
  const [addrErrors, setAddrErrors] = useState<Record<string, string>>({});
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");
  const [cardForm, setCardForm] = useState({ holder: "", number: "", expiry: "", cvv: "" });
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <Layout>
        <section className="py-16 md:py-24">
          <div className="container max-w-md text-center">
            <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Sepetiniz Boş</h1>
            <p className="text-muted-foreground mb-6">Ödeme yapabilmek için sepetinize ürün ekleyin.</p>
            <Link to="/kategori" className="px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors inline-block">
              Alışverişe Başla
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : shippingMethod === "express" ? EXPRESS_SHIPPING : STANDARD_SHIPPING;
  const total = subtotal + shippingCost;
  const stepIdx = steps.findIndex((s) => s.key === step);

  const inputCls = "w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition text-sm";

  const validateAddress = () => {
    if (!showNewAddr) return !!selectedAddressId;
    const e: Record<string, string> = {};
    if (!addrForm.fullName.trim()) e.fullName = "Zorunlu";
    if (!addrForm.phone.trim()) e.phone = "Zorunlu";
    if (!addrForm.city.trim()) e.city = "Zorunlu";
    if (!addrForm.address.trim()) e.address = "Zorunlu";
    setAddrErrors(e);
    if (Object.keys(e).length > 0) return false;
    addAddress(addrForm);
    setShowNewAddr(false);
    return true;
  };

  const validatePayment = () => {
    if (paymentMethod === "cod") return true;
    const e: Record<string, string> = {};
    if (!cardForm.holder.trim()) e.holder = "Zorunlu";
    if (!cardForm.number.trim() || cardForm.number.replace(/\s/g, "").length < 16) e.number = "Geçerli bir kart numarası giriniz";
    if (!cardForm.expiry.trim()) e.expiry = "Zorunlu";
    if (!cardForm.cvv.trim() || cardForm.cvv.length < 3) e.cvv = "Geçerli CVV giriniz";
    setCardErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (step === "address" && !validateAddress()) return;
    if (step === "payment" && !validatePayment()) return;
    const idx = stepIdx + 1;
    if (idx < steps.length) setStep(steps[idx].key);
  };

  const prevStep = () => {
    const idx = stepIdx - 1;
    if (idx >= 0) setStep(steps[idx].key);
  };

  const placeOrder = () => {
    addOrder({
      status: "Hazırlanıyor",
      total,
      items: items.map((i) => ({ name: i.product.name, quantity: i.quantity, price: i.product.price })),
    });
    clearCart();
    navigate("/siparis-basarili");
    toast.success("Siparişiniz oluşturuldu!");
  };

  const formatCardNumber = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container max-w-4xl">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">Ödeme</h1>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-10">
            {steps.map(({ key, label, icon: Icon }, i) => (
              <div key={key} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i <= stepIdx ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {i < stepIdx ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-xs mt-1.5 font-medium ${i <= stepIdx ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mt-[-12px] ${i < stepIdx ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-[1fr_300px] gap-8">
            {/* Main */}
            <div>
              {step === "address" && (
                <div className="bg-card p-6 md:p-8 rounded-2xl shadow-card space-y-6">
                  <h2 className="font-heading text-lg font-bold text-foreground">Teslimat Adresi</h2>
                  {addresses.length > 0 && !showNewAddr && (
                    <>
                      <div className="space-y-3">
                        {addresses.map((addr) => (
                          <label key={addr.id} className={`block p-4 rounded-xl border cursor-pointer transition-colors ${selectedAddressId === addr.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                            <div className="flex items-start gap-3">
                              <input type="radio" name="address" checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} className="mt-1" />
                              <div>
                                <p className="font-medium text-sm text-foreground">{addr.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{addr.fullName} · {addr.phone}</p>
                                <p className="text-xs text-muted-foreground">{addr.address}, {addr.district} {addr.city}</p>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                      <button onClick={() => setShowNewAddr(true)} className="text-sm text-primary font-medium hover:text-primary/80">
                        + Yeni Adres Ekle
                      </button>
                    </>
                  )}
                  {showNewAddr && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { key: "fullName", label: "Ad Soyad *", ph: "" },
                          { key: "phone", label: "Telefon *", ph: "05XX XXX XX XX" },
                          { key: "city", label: "Şehir *", ph: "" },
                          { key: "district", label: "İlçe", ph: "" },
                          { key: "postalCode", label: "Posta Kodu", ph: "" },
                        ].map(({ key, label, ph }) => (
                          <div key={key}>
                            <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
                            <input
                              value={(addrForm as any)[key]}
                              onChange={(e) => setAddrForm({ ...addrForm, [key]: e.target.value })}
                              className={inputCls}
                              placeholder={ph}
                            />
                            {addrErrors[key] && <p className="text-destructive text-xs mt-1">{addrErrors[key]}</p>}
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Adres *</label>
                        <textarea value={addrForm.address} onChange={(e) => setAddrForm({ ...addrForm, address: e.target.value })} rows={3} className={`${inputCls} resize-none`} />
                        {addrErrors.address && <p className="text-destructive text-xs mt-1">{addrErrors.address}</p>}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === "shipping" && (
                <div className="bg-card p-6 md:p-8 rounded-2xl shadow-card space-y-6">
                  <h2 className="font-heading text-lg font-bold text-foreground">Kargo Seçimi</h2>
                  {[
                    { key: "standard" as const, label: "Standart Kargo", desc: "3-5 iş günü", price: subtotal >= FREE_SHIPPING_THRESHOLD ? "Ücretsiz" : `₺${STANDARD_SHIPPING.toFixed(2)}` },
                    { key: "express" as const, label: "Hızlı Kargo", desc: "1-2 iş günü", price: subtotal >= FREE_SHIPPING_THRESHOLD ? "Ücretsiz" : `₺${EXPRESS_SHIPPING.toFixed(2)}` },
                  ].map(({ key, label, desc, price }) => (
                    <label key={key} className={`block p-4 rounded-xl border cursor-pointer transition-colors ${shippingMethod === key ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="shipping" checked={shippingMethod === key} onChange={() => setShippingMethod(key)} />
                          <div>
                            <p className="font-medium text-sm text-foreground">{label}</p>
                            <p className="text-xs text-muted-foreground">{desc}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-sm text-foreground">{price}</span>
                      </div>
                    </label>
                  ))}
                  {subtotal >= FREE_SHIPPING_THRESHOLD && (
                    <p className="text-xs text-forest font-medium">✓ Siparişiniz ₺{FREE_SHIPPING_THRESHOLD} üzeri olduğu için kargo ücretsiz!</p>
                  )}
                </div>
              )}

              {step === "payment" && (
                <div className="bg-card p-6 md:p-8 rounded-2xl shadow-card space-y-6">
                  <h2 className="font-heading text-lg font-bold text-foreground">Ödeme Yöntemi</h2>
                  <div className="flex gap-3">
                    {[
                      { key: "card" as const, label: "Kredi Kartı" },
                      { key: "cod" as const, label: "Kapıda Ödeme" },
                    ].map(({ key, label }) => (
                      <button key={key} onClick={() => setPaymentMethod(key)} className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-colors ${paymentMethod === key ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-primary/30"}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Kart Sahibi *</label>
                        <input value={cardForm.holder} onChange={(e) => setCardForm({ ...cardForm, holder: e.target.value })} className={inputCls} placeholder="Ad Soyad" />
                        {cardErrors.holder && <p className="text-destructive text-xs mt-1">{cardErrors.holder}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Kart Numarası *</label>
                        <input value={cardForm.number} onChange={(e) => setCardForm({ ...cardForm, number: formatCardNumber(e.target.value) })} className={inputCls} placeholder="XXXX XXXX XXXX XXXX" maxLength={19} />
                        {cardErrors.number && <p className="text-destructive text-xs mt-1">{cardErrors.number}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1">Son Kullanma *</label>
                          <input value={cardForm.expiry} onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })} className={inputCls} placeholder="AA/YY" maxLength={5} />
                          {cardErrors.expiry && <p className="text-destructive text-xs mt-1">{cardErrors.expiry}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1">CVV *</label>
                          <input type="password" value={cardForm.cvv} onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })} className={inputCls} placeholder="•••" maxLength={4} />
                          {cardErrors.cvv && <p className="text-destructive text-xs mt-1">{cardErrors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                  {paymentMethod === "cod" && (
                    <p className="text-sm text-muted-foreground">Siparişiniz teslim sırasında nakit veya kart ile ödeme yapabilirsiniz.</p>
                  )}
                </div>
              )}

              {step === "summary" && (
                <div className="bg-card p-6 md:p-8 rounded-2xl shadow-card space-y-6">
                  <h2 className="font-heading text-lg font-bold text-foreground">Sipariş Özeti</h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-4">
                        <img src={item.product.image} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover bg-muted" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">{item.quantity} adet</p>
                        </div>
                        <p className="text-sm font-semibold text-foreground">₺{(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Ara Toplam</span><span>₺{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Kargo</span><span>{shippingCost === 0 ? "Ücretsiz" : `₺${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-foreground text-base pt-2 border-t border-border">
                      <span>Toplam</span><span>₺{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                {stepIdx > 0 ? (
                  <button onClick={prevStep} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Geri
                  </button>
                ) : (
                  <Link to="/sepet" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Sepete Dön
                  </Link>
                )}
                {step === "summary" ? (
                  <button onClick={placeOrder} className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors">
                    Siparişi Tamamla
                  </button>
                ) : (
                  <button onClick={nextStep} className="flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors">
                    Devam Et <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar summary */}
            <div className="hidden md:block">
              <div className="bg-card p-5 rounded-2xl shadow-card sticky top-28 space-y-4">
                <h3 className="font-heading text-sm font-bold text-foreground">Sipariş Özeti</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-xs text-muted-foreground">
                      <span className="truncate mr-2">{item.product.name} x{item.quantity}</span>
                      <span className="shrink-0">₺{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Ara Toplam</span><span>₺{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Kargo</span><span>{shippingCost === 0 ? "Ücretsiz" : `₺${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-foreground text-sm pt-2 border-t border-border">
                    <span>Toplam</span><span>₺{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;
