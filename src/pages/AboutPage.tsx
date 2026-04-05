import { motion } from "framer-motion";
import { Award, Leaf, Heart, Users, Target, Shield } from "lucide-react";
import Layout from "@/components/layout/Layout";
import productionImg from "@/assets/production.jpg";
import heroImg from "@/assets/hero-hazelnuts.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Gök Fındık hakkında" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-espresso/75" />
        </div>
        <div className="container relative py-20 md:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-gold font-medium tracking-widest text-sm mb-4 uppercase">Kurumsal</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Hakkımızda</h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">1956'dan günümüze, Karadeniz'in en seçkin fındıklarını özenle işliyor, doğal lezzeti sofralarınıza taşıyoruz.</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <img src={productionImg} alt="Gök Fındık tesisi" loading="lazy" width={800} height={600} className="rounded-2xl shadow-elevated w-full" />
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <p className="text-hazelnut-light font-medium text-sm tracking-widest uppercase mb-3">Hikâyemiz</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Üç Neslin <span className="italic text-hazelnut">Lezzet Mirası</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Gök Fındık, 1956 yılında Giresun'un bereketli topraklarında küçük bir aile işletmesi olarak hayata geçti. 
                  Kurucumuz, Karadeniz'in eşsiz ikliminde yetişen fındıkların benzersiz lezzetini tüm Türkiye ile paylaşma hayaliyle yola çıktı.
                </p>
                <p>
                  Üç nesil boyunca sürdürdüğümüz geleneksel üretim anlayışı, kalite tutkusu ve doğaya saygı ilkelerimiz, 
                  bugün bizi Türkiye'nin en güvenilir fındık markalarından biri haline getirdi.
                </p>
                <p>
                  Her bir fındık tanesi, uzman ekibimiz tarafından özenle seçilir, geleneksel yöntemlerle işlenir ve 
                  modern gıda güvenliği standartlarına uygun olarak paketlenir. Doğallığını koruyarak sofralarınıza ulaşan 
                  ürünlerimiz, Karadeniz'in bereketini ve ailemizin sevgisini taşır.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-cream-warm">
        <div className="container">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-hazelnut-light font-medium text-sm tracking-widest uppercase mb-2">Değerlerimiz</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Bizi Biz Yapan Değerler</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: "Doğallık", desc: "Hiçbir katkı maddesi kullanmadan, doğanın bize sunduğu en saf lezzeti koruyoruz. Ürünlerimiz %100 doğaldır." },
              { icon: Award, title: "Kalite", desc: "Her üretim aşamasında en yüksek kalite standartlarını uyguluyoruz. Uluslararası gıda güvenliği sertifikalarına sahibiz." },
              { icon: Heart, title: "Tutku", desc: "Fındığa olan tutkumuz üç nesildir devam ediyor. Her ürünümüzde bu tutkuyu hissedeceksiniz." },
              { icon: Users, title: "Aile", desc: "Aile değerlerimizi iş hayatımıza taşıyoruz. Müşterilerimizi de ailemizin bir parçası olarak görüyoruz." },
              { icon: Target, title: "Sürdürülebilirlik", desc: "Doğaya ve çevreye saygılı üretim yöntemleri kullanıyor, gelecek nesillere temiz bir dünya bırakmayı hedefliyoruz." },
              { icon: Shield, title: "Güven", desc: "68 yıllık deneyimimiz ve şeffaf üretim süreçlerimizle, müşterilerimizin güvenini kazanmaya devam ediyoruz." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} {...fadeUp} transition={{ delay: i * 0.08 }} className="bg-background rounded-xl p-8 shadow-soft">
                <div className="w-12 h-12 rounded-full bg-cream-warm flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-hazelnut" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Tarihçemiz</h2>
          </motion.div>
          <div className="space-y-8">
            {[
              { year: "1956", title: "Kuruluş", desc: "Gök Fındık, Giresun'da küçük bir aile işletmesi olarak kuruldu." },
              { year: "1975", title: "Büyüme", desc: "İkinci nesil yönetimle birlikte üretim kapasitesi artırıldı ve yeni ürün grupları eklendi." },
              { year: "1998", title: "Modernizasyon", desc: "Modern üretim tesisleri kurularak uluslararası gıda güvenliği standartlarına geçildi." },
              { year: "2010", title: "Dijitalleşme", desc: "Online satış kanalları açılarak tüm Türkiye'ye hizmet vermeye başlandı." },
              { year: "2024", title: "Bugün", desc: "Üç neslin deneyimi ve modern teknolojinin gücüyle, premium fındık ürünleri sunmaya devam ediyoruz." },
            ].map(({ year, title, desc }, i) => (
              <motion.div key={year} {...fadeUp} transition={{ delay: i * 0.1 }} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <span className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">{year}</span>
                  {i < 4 && <div className="w-px flex-1 bg-border mt-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
