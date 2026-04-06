import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const badgeStyles: Record<string, string> = {
  "İndirim": "bg-destructive text-destructive-foreground",
  "Yeni": "bg-forest text-accent-foreground",
  "Çok Satan": "bg-gold text-espresso",
  "Özel": "bg-primary text-primary-foreground",
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { favorites, toggleFavorite } = useAuth();
  const isFav = favorites.includes(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} sepete eklendi`);
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
    toast.success(isFav ? "Favorilerden çıkarıldı" : "Favorilere eklendi");
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-background rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-shadow duration-300"
    >
      <Link to={`/urun/${product.slug}`} className="block relative aspect-square overflow-hidden bg-muted">
        <img src={product.image} alt={product.name} loading="lazy" width={400} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${badgeStyles[product.badge] || "bg-primary text-primary-foreground"}`}>
            {product.badge}{discount && product.badge === "İndirim" ? ` %${discount}` : ""}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="px-4 py-2 bg-foreground/80 text-background text-sm font-medium rounded-full">Tükendi</span>
          </div>
        )}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button onClick={handleToggleFav} className={`w-9 h-9 rounded-full bg-background/90 hover:bg-background flex items-center justify-center shadow-soft transition-colors ${isFav ? "text-destructive" : "text-foreground/70 hover:text-destructive"}`} aria-label="Favorilere ekle">
            <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
          </button>
          <Link to={`/urun/${product.slug}`} className="w-9 h-9 rounded-full bg-background/90 hover:bg-background text-foreground/70 hover:text-foreground flex items-center justify-center shadow-soft transition-colors" aria-label="Hızlı görüntüle">
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <Link to={`/urun/${product.slug}`}>
          <h3 className="font-medium text-sm leading-snug text-foreground hover:text-primary transition-colors line-clamp-2 mb-2">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">₺{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">₺{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          {product.inStock && (
            <button onClick={handleAddToCart} className="w-9 h-9 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-colors" aria-label="Sepete ekle">
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
