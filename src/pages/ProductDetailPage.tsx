import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Minus, Plus, Truck, Shield, RotateCcw, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "shipping">("description");

  if (!product) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Ürün Bulunamadı</h1>
          <Link to="/" className="text-primary hover:underline">Anasayfaya Dön</Link>
        </div>
      </Layout>
    );
  }

  const relatedProducts = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/50">
        <div className="container py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Anasayfa</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/kategori/${product.categorySlug}`} className="hover:text-foreground transition-colors">{product.category}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product */}
      <section className="py-10 md:py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted shadow-card">
                <img
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 px-4 py-1.5 text-sm font-semibold rounded-full bg-destructive text-destructive-foreground">
                    {product.badge}{discount ? ` %${discount}` : ""}
                  </span>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                    <span className="px-6 py-3 bg-foreground/80 text-background font-medium rounded-full">Tükendi</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col"
            >
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-foreground">₺{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">₺{product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              {product.weight && (
                <p className="text-sm text-muted-foreground mb-6">Ağırlık: <span className="text-foreground font-medium">{product.weight}</span></p>
              )}

              {/* Stock status */}
              <div className="mb-6">
                {product.inStock ? (
                  <span className="inline-flex items-center gap-1.5 text-sm text-forest font-medium">
                    <span className="w-2 h-2 rounded-full bg-forest" />
                    Stokta
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm text-destructive font-medium">
                    <span className="w-2 h-2 rounded-full bg-destructive" />
                    Tükendi
                  </span>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              {product.inStock && (
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center border border-border rounded-full">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                      aria-label="Azalt"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-medium text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                      aria-label="Artır"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                    Sepete Ekle
                  </button>
                  <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:text-destructive hover:border-destructive/30 transition-colors" aria-label="Favorilere ekle">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Trust */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-border">
                {[
                  { icon: Truck, text: "Hızlı Kargo" },
                  { icon: Shield, text: "Güvenli Ödeme" },
                  { icon: RotateCcw, text: "Kolay İade" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-1.5 text-center">
                    <Icon className="w-5 h-5 text-hazelnut" />
                    <span className="text-xs text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="flex gap-1 border-b border-border">
              {[
                { key: "description" as const, label: "Açıklama" },
                { key: "details" as const, label: "Ürün Bilgileri" },
                { key: "shipping" as const, label: "Kargo & İade" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="py-8 max-w-2xl">
              {activeTab === "description" && (
                <p className="text-muted-foreground leading-relaxed">
                  {product.longDescription || product.description}
                </p>
              )}
              {activeTab === "details" && (
                <div className="space-y-3">
                  {product.weight && (
                    <div className="flex gap-4 text-sm">
                      <span className="text-muted-foreground w-32">Ağırlık</span>
                      <span className="text-foreground">{product.weight}</span>
                    </div>
                  )}
                  {product.ingredients && (
                    <div className="flex gap-4 text-sm">
                      <span className="text-muted-foreground w-32">İçindekiler</span>
                      <span className="text-foreground">{product.ingredients}</span>
                    </div>
                  )}
                  {product.storage && (
                    <div className="flex gap-4 text-sm">
                      <span className="text-muted-foreground w-32">Saklama</span>
                      <span className="text-foreground">{product.storage}</span>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "shipping" && (
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>Siparişleriniz 1-3 iş günü içinde kargoya teslim edilir. Kargo ücreti 500₺ üzeri siparişlerde ücretsizdir.</p>
                  <p>Ürünlerimizi teslim aldıktan sonra 14 gün içinde iade edebilirsiniz. İade şartları için müşteri hizmetlerimizle iletişime geçiniz.</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Benzer Ürünler</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetailPage;
