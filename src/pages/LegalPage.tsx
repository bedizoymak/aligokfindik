import Layout from "@/components/layout/Layout";
import { useLang } from "@/i18n/LanguageContext";

interface Props {
  variant: "privacy" | "terms" | "kvkk";
}

const content: Record<Props["variant"], { tr: string[]; en: string[] }> = {
  privacy: {
    tr: [
      "Gök Fındık olarak kişisel verilerinizin gizliliğine büyük önem veriyoruz. Bu politika, sitemizi kullanırken topladığımız bilgileri ve bunların nasıl işlendiğini açıklar.",
      "Toplanan veriler: ad, e-posta, teslimat adresi, sipariş geçmişi ve tarayıcı oturum bilgileri. Bu bilgiler yalnızca sipariş işleme, müşteri desteği ve yasal yükümlülükler için kullanılır.",
      "Verileriniz üçüncü taraflarla paylaşılmaz; yalnızca kargo ve ödeme hizmet sağlayıcılarımızla, hizmetin gerektirdiği ölçüde paylaşılır.",
      "Çerezler kullanıcı deneyimini iyileştirmek için kullanılır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.",
    ],
    en: [
      "At Gök Fındık we take the privacy of your personal data seriously. This policy explains what we collect and how we use it.",
      "Collected data: name, email, delivery address, order history and browser session information. This data is used only for order processing, customer support, and legal obligations.",
      "Your data is not shared with third parties except shipping and payment providers, strictly as required to fulfill your order.",
      "Cookies are used to improve user experience. You can disable cookies in your browser settings.",
    ],
  },
  terms: {
    tr: [
      "Bu kullanım koşulları, gokfindik.com sitesini ziyaret eden ve alışveriş yapan tüm kullanıcılar için geçerlidir.",
      "Sitedeki ürün görselleri ve içerikler bilgilendirme amaçlıdır; gerçek ürünle küçük farklılıklar olabilir.",
      "Siparişler, ödeme onayını takiben en geç 2 iş günü içinde kargoya verilir. Teslimat süreleri kargo firmasına göre değişebilir.",
      "İade ve değişim hakkı, ürün tesliminden itibaren 14 gün içinde geçerlidir. Ürünlerin orijinal ambalajında ve kullanılmamış olması gerekir.",
    ],
    en: [
      "These terms apply to all visitors and customers of gokfindik.com.",
      "Product images and content are for informational purposes; minor differences from the actual product may occur.",
      "Orders are shipped within 2 business days of payment confirmation. Delivery times vary by carrier.",
      "Returns and exchanges are accepted within 14 days of delivery. Items must be unused and in original packaging.",
    ],
  },
  kvkk: {
    tr: [
      "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, Gök Fındık veri sorumlusu sıfatıyla hareket etmektedir.",
      "Kişisel verileriniz; sipariş işleme, fatura düzenleme, kargo süreçleri ve müşteri ilişkileri yönetimi için işlenmektedir.",
      "KVKK kapsamındaki haklarınız için info@gokfindik.com adresine başvurabilirsiniz.",
    ],
    en: [
      "Under Türkiye's Personal Data Protection Law (KVKK No. 6698), Gök Fındık acts as the data controller.",
      "Your personal data is processed for order fulfillment, invoicing, shipping and customer relationship management.",
      "For your rights under KVKK, contact info@gokfindik.com.",
    ],
  },
};

const LegalPage = ({ variant }: Props) => {
  const { t, lang } = useLang();
  const titleKey = variant === "privacy" ? "legal.privacy.title" : variant === "terms" ? "legal.terms.title" : "legal.kvkk.title";
  const paragraphs = content[variant][lang];

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">{t(titleKey)}</h1>
          <p className="text-sm text-muted-foreground mb-10">{t("legal.lastUpdate")}</p>
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LegalPage;
