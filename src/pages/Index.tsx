import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Award, Shield, Truck, Star, ChefHat, Gift, Coffee } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import heroImg from "@/assets/hero-hazelnuts.jpg";
import categoryFindik from "@/assets/category-findik.jpg";
import categoryEzme from "@/assets/category-ezme.jpg";
import categoryKrema from "@/assets/category-krema.jpg";
import categoryAtistirmalik from "@/assets/category-atistirmalik.jpg";
import categoryPastacilik from "@/assets/category-pastacilik.jpg";
import categoryHediyelik from "@/assets/category-hediyelik.jpg";
import productionImg from "@/assets/production.jpg";

const categoryImages: Record<string, string> = {
  findik: categoryFindik,
  atistirmalik: categoryAtistirmalik,
  "findik-ezmesi": categoryEzme,
  "findik-kremasi": categoryKrema,
  pastacilik: categoryPastacilik,
  hediyelik: categoryHediyelik,
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Index = () => {
  const featuredProducts = products.filter((p) => p.inStock).slice(0, 4);
  const bestSellers = products.filter((p) => p.badge === "Çok Satan" || p.badge === "İndirim");

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Premium Türk fındığı" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/85 via-espresso/60 to-transparent" />
        </div>
        <div className="container relative py-24 md:py-36 lg:py-44">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <p className="text-gold font-medium tracking-widest text-sm mb-4 uppercase">1956'dan Günümüze</p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Gelenekten Gelen{" "}
              <span className="italic">Lezzet</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-8 max-w-md">
              Karadeniz'in eşsiz fındık lezzetini, özenle hazırlanmış ürünlerle sofralarınıza taşıyoruz.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/kategori/findik"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-espresso font-semibold rounded-full hover:bg-gold/90 transition-colors"
              >
                Ürünleri Keşfet
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/hakkimizda"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-primary-foreground/30 text-primary-foreground font-medium rounded-full hover:bg-primary-foreground/10 transition-colors"
              >
                Hikâyemiz
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-cream-warm border-y border-border">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Leaf, text: "Doğal ve Taze" },
              { icon: Award, text: "Premium Kalite" },
              { icon: Shield, text: "Güvenli Alışveriş" },
              { icon: Truck, text: "Hızlı Kargo" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center justify-center gap-2.5 text-foreground/70">
                <Icon className="w-5 h-5 text-hazelnut" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-hazelnut-light font-medium text-sm tracking-widest uppercase mb-2">Kategoriler</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Lezzet Dünyamızı Keşfedin
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/kategori/${cat.slug}`}
                  className="group relative block aspect-[4/3] rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-shadow duration-300"
                >
                  <img
                    src={categoryImages[cat.slug]}
                    alt={cat.name}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <h3 className="font-heading text-lg md:text-xl font-semibold text-primary-foreground mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-primary-foreground/70 hidden md:block">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-cream-warm">
        <div className="container">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-12">
            <div>
              <p className="text-hazelnut-light font-medium text-sm tracking-widest uppercase mb-2">Öne Çıkanlar</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Çok Satan Ürünler
              </h2>
            </div>
            <Link to="/kategori/findik" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div key={product.id} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/kategori/findik" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div {...fadeUp}>
              <img
                src={productionImg}
                alt="Ali Gök Fındık üretim tesisi"
                loading="lazy"
                width={1200}
                height={800}
                className="rounded-2xl shadow-elevated w-full"
              />
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
              <p className="text-hazelnut-light font-medium text-sm tracking-widest uppercase mb-3">Hikâyemiz</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                1956'dan Günümüze <br />
                <span className="italic text-hazelnut">Lezzet Geleneği</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                 Ali Gök Fındık, 1956 yılında Giresun'da küçük bir aile işletmesi olarak kurulmuştur. 
                 Üç nesil boyunca sürdürdüğümüz geleneksel üretim anlayışı ve kalite tutkusu, 
                 bugün Türkiye'nin en güvenilir fındık markalarından biri olmamızı sağlamıştır.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Her bir fındık tanesi özenle seçilir, geleneksel yöntemlerle işlenir ve 
                doğallığını koruyarak sofralarınıza ulaşır. Karadeniz'in bereketli topraklarından 
                gelen bu eşsiz lezzeti, sizlerle buluşturmaktan gurur duyuyoruz.
              </p>
              <Link
                to="/hakkimizda"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Daha Fazla Bilgi <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Points */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Neden Ali Gök Fındık?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: "Özenle Seçilmiş",
                desc: "Her bir fındık tanesi uzman ekibimiz tarafından titizlikle seçilir ve kalite kontrolünden geçirilir.",
              },
              {
                icon: Leaf,
                title: "Doğal ve Taze",
                desc: "Hiçbir katkı maddesi kullanmadan, doğal tazeliğini koruyarak ürünlerimizi hazırlıyoruz.",
              },
              {
                icon: Award,
                title: "Geleneksel Ustalık",
                desc: "68 yıllık deneyimimizle, geleneksel üretim tekniklerini modern standartlarla birleştiriyoruz.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">{title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-12">
            <div>
              <p className="text-hazelnut-light font-medium text-sm tracking-widest uppercase mb-2">Yeni Eklenenler</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Yeni Ürünler
              </h2>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.filter(p => p.badge === "Yeni").concat(products.slice(3, 5)).slice(0, 4).map((product, i) => (
              <motion.div key={product.id} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-16 md:py-24 bg-cream-warm">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="order-2 md:order-1">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="w-5 h-5 text-gold" />
                <p className="text-hazelnut-light font-medium text-sm tracking-widest uppercase">Hediyelik</p>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Özel Günlere <span className="italic">Özel Lezzetler</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Sevdiklerinize doğanın en değerli lezzetlerini armağan edin. 
                Özenle hazırlanmış hediyelik setlerimiz, her özel anı unutulmaz kılar.
              </p>
              <Link
                to="/kategori/hediyelik"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
              >
                Hediyelik Ürünler <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div {...fadeUp} className="order-1 md:order-2">
              <img
                src={categoryHediyelik}
                alt="Hediyelik fındık seti"
                loading="lazy"
                width={800}
                height={800}
                className="rounded-2xl shadow-elevated w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lifestyle / Usage */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-hazelnut-light font-medium text-sm tracking-widest uppercase mb-2">İlham</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Fındıkla Neler Yapabilirsiniz?
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Coffee, label: "Kahvaltı", desc: "Fındık ezmesi ve kremasıyla zengin bir kahvaltı" },
              { icon: ChefHat, label: "Pastacılık", desc: "Tariflere eşsiz bir lezzet katın" },
              { icon: Star, label: "Atıştırmalık", desc: "Sağlıklı ve doyurucu bir ara öğün" },
              { icon: Gift, label: "Hediye", desc: "Sevdiklerinize doğal bir sürpriz" },
            ].map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-xl bg-cream-warm hover:shadow-card transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-hazelnut" />
                </div>
                <h3 className="font-heading text-base font-semibold mb-1">{label}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Newsletter */}
      <section className="py-16 md:py-24 gradient-hero text-primary-foreground">
        <div className="container text-center">
          <motion.div {...fadeUp} className="max-w-lg mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Lezzet Haberlerinden İlk Siz Haberdar Olun
            </h2>
            <p className="text-primary-foreground/70 mb-8">
              Yeni ürünler, özel kampanyalar ve tarifler için bültenimize abone olun.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-5 py-3.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
              <button className="px-7 py-3.5 bg-gold text-espresso font-semibold rounded-full hover:bg-gold/90 transition-colors whitespace-nowrap">
                Abone Ol
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
