import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const FREE_SHIPPING_THRESHOLD = 500;

const CartPage = () => {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const suggestedProducts = products.filter((p) => p.inStock && !items.some((i) => i.product.id === p.id)).slice(0, 4);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 39.90;

  if (items.length === 0) {
    return (
      <Layout>
        <section className="py-16 md:py-24">
          <div className="container max-w-2xl text-center">
            <div className="w-20 h-20 rounded-full bg-cream-warm flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-hazelnut" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-3">Sepetiniz Boş</h1>
            <p className="text-muted-foreground mb-8">Henüz sepetinize ürün eklemediniz. Lezzetli ürünlerimizi keşfetmeye başlayın!</p>
            <Link to="/kategori" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors">
              Alışverişe Başla <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
        <section className="py-8 pb-16 md:pb-24">
          <div className="container">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">Beğenebileceğiniz Ürünler</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {products.filter((p) => p.inStock).slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-10 md:py-16">
        <div className="container">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
            Sepetim <span className="text-muted-foreground font-normal text-lg">({totalItems} ürün)</span>
          </h1>
          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            {/* Items */}
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 bg-card p-4 md:p-5 rounded-xl shadow-soft">
                  <Link to={`/urun/${product.slug}`} className="shrink-0">
                    <img src={product.image} alt={product.name} className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover bg-muted" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/urun/${product.slug}`}>
                      <h3 className="font-medium text-sm md:text-base text-foreground hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border rounded-full">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-8 h-8 flex items-center justify-center text-foreground/70 hover:text-foreground" aria-label="Azalt">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-8 h-8 flex items-center justify-center text-foreground/70 hover:text-foreground" aria-label="Artır">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-foreground">₺{(product.price * quantity).toFixed(2)}</span>
                        <button onClick={() => removeItem(product.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors" aria-label="Sil">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-28 self-start">
              <div className="bg-card p-6 rounded-2xl shadow-card space-y-4">
                <h2 className="font-heading text-lg font-bold text-foreground">Sipariş Özeti</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Ara Toplam</span><span>₺{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Kargo</span>
                    <span>{shippingCost === 0 ? <span className="text-forest font-medium">Ücretsiz</span> : `₺${shippingCost.toFixed(2)}`}</span>
                  </div>
                  {subtotal < FREE_SHIPPING_THRESHOLD && (
                    <p className="text-xs text-forest">₺{(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} daha ekleyin, kargo ücretsiz!</p>
                  )}
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground">
                  <span>Toplam</span><span>₺{(subtotal + shippingCost).toFixed(2)}</span>
                </div>
                <Link to="/odeme" className="block w-full text-center px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors">
                  Ödemeye Geç
                </Link>
                <Link to="/kategori" className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Alışverişe Devam Et
                </Link>
              </div>
            </div>
          </div>

          {suggestedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">Beğenebileceğiniz Ürünler</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {suggestedProducts.map((p) => (
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

export default CartPage;
