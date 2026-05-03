import { useState } from "react";
import { Package, Truck, CheckCircle2, Clock, Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useLang } from "@/i18n/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

type Step = "received" | "preparing" | "shipped" | "delivered";

const stepOrder: Step[] = ["received", "preparing", "shipped", "delivered"];

const CargoTrackingPage = () => {
  const { t } = useLang();
  const { orders } = useAuth();
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState<string | null>(null);

  const order = searched ? orders.find((o) => o.id.toLowerCase() === searched.toLowerCase()) : null;

  // Map order status to step
  const currentStep: Step = order
    ? order.status === "Teslim Edildi"
      ? "delivered"
      : order.status === "Kargoda"
      ? "shipped"
      : "preparing"
    : "received";

  const stepIcons: Record<Step, React.ElementType> = {
    received: Package,
    preparing: Clock,
    shipped: Truck,
    delivered: CheckCircle2,
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-cream-warm">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">{t("track.title")}</h1>
            <p className="text-muted-foreground">{t("track.desc")}</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearched(query.trim());
            }}
            className="flex gap-3 mb-10"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("track.placeholder")}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button type="submit" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              {t("track.button")}
            </button>
          </form>

          {searched && !order && (
            <div className="text-center p-8 rounded-2xl bg-background border border-border text-muted-foreground">
              {t("track.notFound")}
            </div>
          )}

          {order && (
            <div className="bg-background rounded-2xl shadow-soft border border-border p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 pb-6 border-b border-border text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">{t("track.cargoCompany")}</p>
                  <p className="font-semibold text-foreground">Yurtiçi Kargo</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{t("track.trackingNo")}</p>
                  <p className="font-semibold text-foreground">YK{order.id.replace(/\D/g, "")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{t("track.estimated")}</p>
                  <p className="font-semibold text-foreground">{order.date}</p>
                </div>
              </div>

              <div className="space-y-5">
                {stepOrder.map((step, i) => {
                  const Icon = stepIcons[step];
                  const reached = stepOrder.indexOf(currentStep) >= i;
                  return (
                    <div key={step} className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          reached ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold ${reached ? "text-foreground" : "text-muted-foreground"}`}>
                          {t(`track.status.${step}`)}
                        </p>
                      </div>
                      {reached && <CheckCircle2 className="w-5 h-5 text-primary" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CargoTrackingPage;
