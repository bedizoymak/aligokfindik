import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Layout from "@/components/layout/Layout";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-gold font-medium tracking-widest text-sm mb-4 uppercase">Bizimle İletişime Geçin</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">İletişim</h1>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">Sorularınız, önerileriniz veya toptan satış talepleriniz için bize ulaşın.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div {...fadeUp} className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">İletişim Bilgilerimiz</h2>
                <div className="space-y-5">
                  {[
                    { icon: MapPin, title: "Adres", text: "Giresun Merkez, Karadeniz Bölgesi, Türkiye" },
                    { icon: Phone, title: "Telefon", text: "0500 123 45 67", href: "tel:+905001234567" },
                    { icon: Mail, title: "E-posta", text: "info@gokfindik.com", href: "mailto:info@gokfindik.com" },
                    { icon: Clock, title: "Çalışma Saatleri", text: "Pazartesi - Cumartesi: 09:00 - 18:00" },
                  ].map(({ icon: Icon, title, text, href }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-cream-warm flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-hazelnut" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{title}</p>
                        {href ? (
                          <a href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{text}</a>
                        ) : (
                          <p className="text-sm text-muted-foreground">{text}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden shadow-soft bg-muted aspect-video flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin className="w-8 h-8 text-hazelnut mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground">Giresun Merkez</p>
                  <p className="text-xs text-muted-foreground">Karadeniz Bölgesi, Türkiye</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="lg:col-span-3">
              <div className="bg-cream-warm rounded-2xl p-8 md:p-10">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Bize Yazın</h2>
                <p className="text-sm text-muted-foreground mb-8">Formu doldurarak bize mesaj gönderebilirsiniz. En kısa sürede size dönüş yapacağız.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Adınız Soyadınız</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Adınız"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">E-posta Adresiniz</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Konu</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Mesajınızın konusu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Mesajınız</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>
                  <button type="submit" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors">
                    <Send className="w-4 h-4" />
                    Mesaj Gönder
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
