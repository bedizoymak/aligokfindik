import { motion } from "framer-motion";
import { CheckCircle, Leaf, Thermometer, Package, Eye, Award } from "lucide-react";
import Layout from "@/components/layout/Layout";
import productionImg from "@/assets/production.jpg";
import heroImg from "@/assets/hero-hazelnuts.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const ProductionPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={productionImg} alt="Gök Fındık üretim tesisi" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-espresso/75" />
        </div>
        <div className="container relative py-20 md:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-gold font-medium tracking-widest text-sm mb-4 uppercase">Kalite ve Güven</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Üretim Tesisimiz</h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">En yüksek kalite standartlarında, geleneksel ustalıkla modern teknolojiyi birleştiriyoruz.</p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-hazelnut-light font-medium text-sm tracking-widest uppercase mb-2">Üretim Süreci</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Tarladan Sofraya</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Fındıklarımız, hasattan paketlemeye kadar her aşamada titizlikle kontrol edilir.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                step: "01",
                title: "Hasat ve Toplama",
                desc: "Fındıklar, olgunlaştıkları en ideal zamanda deneyimli çiftçilerimiz tarafından elle toplanır. Doğal olgunlaşma süreci tamamlanmadan hiçbir fındık hasat edilmez.",
              },
              {
                icon: Eye,
                step: "02",
                title: "Seçim ve Ayıklama",
                desc: "Toplanan fındıklar, uzman ekibimiz ve modern optik ayıklama sistemleri ile tek tek kontrol edilir. Yalnızca en kaliteli taneler üretim hattına alınır.",
              },
              {
                icon: Thermometer,
                step: "03",
                title: "Kurutma",
                desc: "Fındıklar, nem oranları ideal seviyeye gelene kadar kontrollü ortamda kurutulur. Bu süreç, fındığın aromasını ve tazeliğini korur.",
              },
              {
                icon: CheckCircle,
                step: "04",
                title: "Kalite Kontrol",
                desc: "Çoklu kalite kontrol noktalarında boyut, renk, nem ve lezzet testleri uygulanır. Uluslararası gıda güvenliği standartları eksiksiz sağlanır.",
              },
              {
                icon: Package,
                step: "05",
                title: "İşleme ve Paketleme",
                desc: "Fındıklar, hijyenik ortamda işlenir ve özel koruyucu ambalajlarla paketlenir. Vakumlu paketleme ile tazelik uzun süre korunur.",
              },
              {
                icon: Award,
                step: "06",
                title: "Sevkiyat",
                desc: "Paketlenen ürünler, soğuk zincir lojistik ile en kısa sürede müşterilerimize ulaştırılır. Her sipariş özenle hazırlanır.",
              },
            ].map(({ icon: Icon, step, title, desc }, i) => (
              <motion.div key={step} {...fadeUp} transition={{ delay: i * 0.08 }} className="bg-cream-warm rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-heading font-bold text-hazelnut/30">{step}</span>
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                    <Icon className="w-5 h-5 text-hazelnut" />
                  </div>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Sertifikalarımız ve Standartlarımız</h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-12">
              Üretim süreçlerimiz, uluslararası gıda güvenliği standartlarına uygun olarak yürütülmektedir.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "ISO 22000", desc: "Gıda Güvenliği Yönetim Sistemi" },
              { label: "HACCP", desc: "Tehlike Analizi ve Kritik Kontrol Noktaları" },
              { label: "GMP", desc: "İyi Üretim Uygulamaları" },
              { label: "Halal", desc: "Helal Gıda Sertifikası" },
            ].map(({ label, desc }, i) => (
              <motion.div key={label} {...fadeUp} transition={{ delay: i * 0.1 }} className="p-6 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
                <h3 className="font-heading text-xl font-bold text-gold mb-2">{label}</h3>
                <p className="text-xs text-primary-foreground/60">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capacity */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <img src={heroImg} alt="Gök Fındık üretim" loading="lazy" width={800} height={600} className="rounded-2xl shadow-elevated w-full" />
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Üretim Kapasitemiz</h2>
              <div className="space-y-6">
                {[
                  { value: "5.000+", label: "Ton/yıl işleme kapasitesi" },
                  { value: "10.000 m²", label: "Kapalı üretim alanı" },
                  { value: "150+", label: "Deneyimli çalışan" },
                  { value: "68 Yıl", label: "Sektör deneyimi" },
                ].map(({ value, label }) => (
                  <div key={label} className="flex items-baseline gap-4">
                    <span className="font-heading text-2xl font-bold text-hazelnut min-w-[120px]">{value}</span>
                    <span className="text-muted-foreground text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductionPage;
