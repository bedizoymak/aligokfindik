import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const CartPage = () => {
  const suggestedProducts = products.filter(p => p.inStock).slice(0, 4);

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
            {suggestedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CartPage;
