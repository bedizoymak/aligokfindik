import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const faqs = [
  {
    category: "Sipariş ve Ödeme",
    questions: [
      {
        q: "Siparişimi nasıl verebilirim?",
        a: "Web sitemiz üzerinden istediğiniz ürünleri sepetinize ekleyerek kolayca sipariş verebilirsiniz. Kredi kartı, banka kartı veya havale/EFT ile ödeme yapabilirsiniz.",
      },
      {
        q: "Minimum sipariş tutarı var mı?",
        a: "Minimum sipariş tutarı bulunmamaktadır. Dilediğiniz miktarda ürün sipariş edebilirsiniz.",
      },
      {
        q: "Ödeme bilgilerim güvende mi?",
        a: "Evet, tüm ödeme işlemleri 256-bit SSL sertifikası ile şifrelenmektedir. Kredi kartı bilgileriniz hiçbir şekilde sistemimizde saklanmaz.",
      },
      {
        q: "Fatura bilgilerimi nasıl güncellerim?",
        a: "Sipariş sırasında fatura bilgilerinizi girebilirsiniz. Hesabınıza giriş yaparak mevcut fatura bilgilerinizi güncelleyebilirsiniz.",
      },
    ],
  },
  {
    category: "Kargo ve Teslimat",
    questions: [
      {
        q: "Kargo ücreti ne kadar?",
        a: "500₺ ve üzeri siparişlerde kargo ücretsizdir. 500₺ altındaki siparişlerde standart kargo ücreti uygulanmaktadır.",
      },
      {
        q: "Siparişim ne kadar sürede teslim edilir?",
        a: "Siparişleriniz 1-3 iş günü içinde kargoya teslim edilir. Kargo süresi bulunduğunuz bölgeye göre 1-3 iş günü arasında değişmektedir.",
      },
      {
        q: "Kargo takibi yapabilir miyim?",
        a: "Evet, siparişiniz kargoya verildiğinde takip numarası e-posta ve SMS ile tarafınıza iletilir.",
      },
    ],
  },
  {
    category: "Ürünler ve Kalite",
    questions: [
      {
        q: "Ürünleriniz doğal mı?",
        a: "Evet, tüm ürünlerimiz %100 doğaldır. Hiçbir yapay katkı maddesi, koruyucu veya renklendirici kullanılmamaktadır.",
      },
      {
        q: "Fındıklar hangi bölgeden temin ediliyor?",
        a: "Fındıklarımız, dünyaca ünlü Giresun ve Ordu bölgesinden, güvenilir çiftçilerden temin edilmektedir.",
      },
      {
        q: "Ürünleri nasıl saklamalıyım?",
        a: "Ürünlerimizi serin, kuru ve güneş ışığından uzak bir yerde saklayınız. Açıldıktan sonra ağzı kapalı şekilde buzdolabında muhafaza etmenizi öneriyoruz.",
      },
      {
        q: "Son kullanma tarihleri ne kadar?",
        a: "Kabuklu fındıklarımızın raf ömrü 12 ay, iç fındık ve işlenmiş ürünlerimizin raf ömrü 6-9 ay arasındadır. Tüm ürünlerde son kullanma tarihi ambalaj üzerinde belirtilmektedir.",
      },
    ],
  },
  {
    category: "İade ve Değişim",
    questions: [
      {
        q: "İade yapabilir miyim?",
        a: "Ürünlerinizi teslim aldıktan sonra 14 gün içinde iade edebilirsiniz. İade edilecek ürünlerin açılmamış ve orijinal ambalajında olması gerekmektedir.",
      },
      {
        q: "Hasarlı ürün gelirse ne yapmalıyım?",
        a: "Hasarlı veya hatalı ürün durumunda müşteri hizmetlerimizle iletişime geçmeniz yeterlidir. Ürününüz ücretsiz olarak değiştirilir veya iade işlemi yapılır.",
      },
    ],
  },
  {
    category: "Toptan Satış",
    questions: [
      {
        q: "Toptan alım yapabilir miyim?",
        a: "Evet, toptan satış hizmetimiz mevcuttur. Toptan alım talepleriniz için iletisim@gokfindik.com adresinden veya 0500 123 45 67 numarasından bize ulaşabilirsiniz.",
      },
      {
        q: "Kurumsal fiyat teklifi alabilir miyim?",
        a: "Kurumsal müşterilerimize özel fiyat teklifleri sunuyoruz. İletişim sayfamız üzerinden talebinizi iletebilirsiniz.",
      },
    ],
  },
];

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-sm font-medium text-foreground pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="pb-5"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  );
};

const FaqPage = () => {
  return (
    <Layout>
      <section className="bg-primary py-16 md:py-20">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <HelpCircle className="w-10 h-10 text-gold mx-auto mb-4" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Sıkça Sorulan Sorular</h1>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">Merak ettiğiniz tüm soruların cevapları burada.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          {faqs.map((section, si) => (
            <motion.div key={section.category} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.1 }} className="mb-12">
              <h2 className="font-heading text-xl font-bold text-foreground mb-4">{section.category}</h2>
              <div className="bg-cream-warm rounded-xl px-6">
                {section.questions.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </motion.div>
          ))}

          <div className="text-center mt-12 p-8 bg-cream-warm rounded-2xl">
            <p className="text-foreground font-medium mb-2">Sorunuz burada yok mu?</p>
            <p className="text-sm text-muted-foreground mb-4">Bize doğrudan ulaşarak sorularınızın cevabını alabilirsiniz.</p>
            <Link to="/iletisim" className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors text-sm">
              İletişime Geçin
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FaqPage;
