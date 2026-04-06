import { Link } from "react-router-dom";
import { CheckCircle, Package, ShoppingBag } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";

const OrderSuccessPage = () => {
  const { orders } = useAuth();
  const latestOrder = orders[0];

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-forest" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-3">
            Siparişiniz Başarıyla Oluşturuldu!
          </h1>
          <p className="text-muted-foreground mb-2">
            Siparişiniz için teşekkür ederiz. En kısa sürede hazırlanarak kargoya verilecektir.
          </p>
          {latestOrder && (
            <div className="bg-card rounded-2xl shadow-card p-6 my-8 text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sipariş Numarası</span>
                <span className="font-bold text-foreground">#{latestOrder.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tarih</span>
                <span className="text-foreground">{latestOrder.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Toplam</span>
                <span className="font-bold text-foreground">₺{latestOrder.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Durum</span>
                <span className="text-gold font-medium">{latestOrder.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tahmini Teslimat</span>
                <span className="text-foreground">3-5 iş günü</span>
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/hesap" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors">
              <Package className="w-4 h-4" /> Siparişlerime Git
            </Link>
            <Link to="/kategori" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-border text-foreground font-semibold rounded-full hover:bg-muted transition-colors">
              <ShoppingBag className="w-4 h-4" /> Alışverişe Devam Et
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OrderSuccessPage;
