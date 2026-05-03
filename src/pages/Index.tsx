import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Award, Shield, Truck, Star, ChefHat, Gift, Coffee } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { useLang } from "@/i18n/LanguageContext";
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
  const { t, lang } = useLang();
  const featuredProducts = products.filter((p) => p.inStock).slice(0, 4);

  const why = lang === "tr"
    ? [
        { icon: Star, title: "Özenle Seçilmiş", desc: "Her bir fındık tanesi uzman ekibimiz tarafından titizlikle seçilir." },
        { icon: Leaf, title: "Doğal ve Taze", desc: "Hiçbir katkı maddesi kullanmadan doğal tazeliği koruyarak hazırlanır." },
        { icon: Award, title: "Geleneksel Ustalık", desc: "68 yıllık deneyimle gelenek ve modern standartları birleştiriyoruz." },
      ]
    : [
        { icon: Star, title: "Hand Selected", desc: "Every hazelnut is hand-picked by our expert team." },
        { icon: Leaf, title: "Natural & Fresh", desc: "Prepared without any additives, preserving natural freshness." },
        { icon: Award, title: "Traditional Craft", desc: "68 years of experience blending tradition with modern standards." },
      ];

  const lifestyle = lang === "tr"
    ? [
        { icon: Coffee, label: "Kahvaltı", desc: "Fındık ezmesi ve kremasıyla zengin bir kahvaltı" },
        { icon: ChefHat, label: "Pastacılık", desc: "Tariflere eşsiz bir lezzet katın" },
        { icon: Star, label: "Atıştırmalık", desc: "Sağlıklı ve doyurucu bir ara öğün" },
        { icon: Gift, label: "Hediye", desc: "Sevdiklerinize doğal bir sürpriz" },
      ]
    : [
        { icon: Coffee, label: "Breakfast", desc: "A rich start with hazelnut paste and cream" },
        { icon: ChefHat, label: "Baking", desc: "Add an unmatched flavor to your recipes" },
        { icon: Star, label: "Snacking", desc: "A healthy and satisfying snack" },
        { icon: Gift, label: "Gifting", desc: "A natural surprise for loved ones" },
      ];

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Premium Türk fındığı" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/85 via-espresso/60 to-transparent" />
        </div>
        <div className="container relative py-24 md:py-36 lg:py-44">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-xl">
            <p className="text-gold font-medium tracking-widest text-sm mb-4 uppercase">{t("hero.eyebrow")}</p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              {t("hero.title.1")} <span className="italic">{t("hero.title.2")}</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-8 max-w-md">{t("hero.desc")}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/kategori/findik" className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-espresso font-semibold rounded-full hover:bg-gold/90 transition-colors">
                {t("hero.cta.shop")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/hakkimizda" className="inline-flex items-center gap-2 px-7 py-3.5 border border-primary-foreground/30 text-primary-foreground font-medium rounded-full hover:bg-primary-foreground/10 transition-colors">
                {t("hero.cta.story")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-cream-warm border-y border-border">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Leaf, text: t("trust.natural") },
              { icon: Award, text: t("trust.premium") },
              { icon: Shield, text: t("trust.secure") },
              { icon: Truck, text: t("trust.shipping") },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center justify-center gap-2.5 text-foreground/70">
                <Icon className="w-5 h-5 text-hazelnut" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-hazelnut-light font-medium text-sm tracking-widest uppercase mb-2">{t("sec.categories.eyebrow")}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("sec.categories.title")}</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div key={cat.slug} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Link to={`/kategori/${cat.slug}`} className="group relative block aspect-[4/3] rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-shadow duration-300">
                  <img src={categoryImages[cat.slug]} alt={t(`cat.${cat.slug}`)} loading="lazy" width={800} height={800} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <h3 className="font-heading text-lg md:text-xl font-semibold text-primary-foreground mb-1">{t(`cat.${cat.slug}`)}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream-warm">
        <div className="container">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-12">
            <div>
              <p className="text-hazelnut-light font-medium text-sm tracking-widest uppercase mb-2">{t("sec.featured.eyebrow")}</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("sec.featured.title")}</h2>
            </div>
            <Link to="/kategori" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              {t("sec.viewAll")} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div key={product.id} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div {...fadeUp}>
              <img src={productionImg} alt="Gök Fındık" loading="lazy" width={1200} height={800} className="rounded-2xl shadow-elevated w-full" />
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
              <p className="text-hazelnut-light font-medium text-sm tracking-widest uppercase mb-3">{t("sec.story.eyebrow")}</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                {t("sec.story.title.1")} <br />
                <span className="italic text-hazelnut">{t("sec.story.title.2")}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{t("sec.story.p1")}</p>
              <p className="text-muted-foreground leading-relaxed mb-6">{t("sec.story.p2")}</p>
              <Link to="/hakkimizda" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                {t("sec.story.more")} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">{t("sec.why.title")}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {why.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.12 }} className="text-center p-6">
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

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {lifestyle.map(({ icon: Icon, label, desc }, i) => (
              <motion.div key={label} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center p-6 rounded-xl bg-cream-warm hover:shadow-card transition-shadow duration-300">
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

      <section className="py-16 md:py-24 gradient-hero text-primary-foreground">
        <div className="container text-center">
          <motion.div {...fadeUp} className="max-w-lg mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{t("sec.newsletter.title")}</h2>
            <p className="text-primary-foreground/70 mb-8">{t("sec.newsletter.desc")}</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder={t("sec.newsletter.placeholder")} className="flex-1 px-5 py-3.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-gold/40" />
              <button className="px-7 py-3.5 bg-gold text-espresso font-semibold rounded-full hover:bg-gold/90 transition-colors whitespace-nowrap">{t("sec.newsletter.cta")}</button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
