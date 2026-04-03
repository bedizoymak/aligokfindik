import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = slug
    ? products.filter((p) => p.categorySlug === slug)
    : products;

  const title = category?.name || "Tüm Ürünler";
  const description = category?.description || "Tüm ürünlerimizi keşfedin";

  return (
    <Layout>
      {/* Banner */}
      <section className="bg-primary py-12 md:py-16">
        <div className="container text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-primary-foreground/60 mb-4">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Anasayfa</Link>
            <span>/</span>
            <span className="text-primary-foreground">{title}</span>
          </nav>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">{title}</h1>
          <p className="text-primary-foreground/70 mt-2">{description}</p>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 md:py-16">
        <div className="container">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground">
              {categoryProducts.length} ürün bulundu
            </p>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-full hover:bg-muted transition-colors md:hidden">
                <SlidersHorizontal className="w-4 h-4" />
                Filtre
              </button>
              <div className="relative">
                <select className="appearance-none pl-4 pr-8 py-2 text-sm border border-border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
                  <option>Önerilen Sıralama</option>
                  <option>Fiyat: Düşükten Yükseğe</option>
                  <option>Fiyat: Yüksekten Düşüğe</option>
                  <option>En Yeniler</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Grid */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categoryProducts.map((product, i) => (
                <motion.div key={product.id} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.06 }}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-2">Bu kategoride henüz ürün bulunmuyor.</p>
              <Link to="/" className="text-sm font-medium text-primary hover:underline">
                Anasayfaya Dön
              </Link>
            </div>
          )}

          {/* Show all products if viewing a specific category with few items */}
          {slug && categoryProducts.length < 4 && (
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Diğer Ürünler</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.filter(p => p.categorySlug !== slug).slice(0, 4).map((product, i) => (
                  <motion.div key={product.id} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.06 }}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CategoryPage;
