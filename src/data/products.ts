import productSample from "@/assets/product-sample.jpg";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  inStock: boolean;
  description: string;
  longDescription?: string;
  weight?: string;
  ingredients?: string;
  storage?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Giresun Tombul Fındık (Kabuklu)",
    slug: "giresun-tombul-findik-kabuklu",
    category: "Fındık",
    categorySlug: "findik",
    price: 249.90,
    originalPrice: 289.90,
    image: productSample,
    badge: "İndirim",
    inStock: true,
    description: "Giresun'un verimli topraklarından özenle toplanan, doğal kabuklu tombul fındık.",
    longDescription: "Karadeniz'in eşsiz ikliminde yetişen Giresun Tombul Fındığı, kendine has aroması ve dolgun yapısıyla sofranızda ayrıcalıklı bir lezzet sunar. Her bir tanesi özenle seçilmiş, doğal kurutma yöntemiyle hazırlanmıştır.",
    weight: "500g",
    ingredients: "%100 Doğal Tombul Fındık",
    storage: "Serin ve kuru yerde muhafaza ediniz.",
  },
  {
    id: "2",
    name: "Kavrulmuş İç Fındık",
    slug: "kavrulmus-ic-findik",
    category: "Fındık",
    categorySlug: "findik",
    price: 319.90,
    image: productSample,
    badge: "Yeni",
    inStock: true,
    description: "Geleneksel yöntemlerle kavrulmuş, taze iç fındık.",
    weight: "400g",
    ingredients: "%100 Doğal İç Fındık",
    storage: "Serin ve kuru yerde muhafaza ediniz.",
  },
  {
    id: "3",
    name: "Doğal Fındık Ezmesi",
    slug: "dogal-findik-ezmesi",
    category: "Fındık Ezmesi",
    categorySlug: "findik-ezmesi",
    price: 189.90,
    originalPrice: 219.90,
    image: productSample,
    badge: "Çok Satan",
    inStock: true,
    description: "Şeker ilavesiz, %100 doğal fındık ezmesi.",
    weight: "350g",
    ingredients: "%100 Kavrulmuş Fındık",
    storage: "Açıldıktan sonra buzdolabında saklayınız.",
  },
  {
    id: "4",
    name: "Fındık Kreması (Kakaolu)",
    slug: "findik-kremasi-kakaolu",
    category: "Fındık Kreması",
    categorySlug: "findik-kremasi",
    price: 159.90,
    image: productSample,
    inStock: true,
    description: "Gerçek fındık ve kakaoyla hazırlanan ev yapımı lezzet.",
    weight: "400g",
  },
  {
    id: "5",
    name: "Fındıklı Karışık Kuruyemiş",
    slug: "findikli-karisik-kuruyemis",
    category: "Atıştırmalık",
    categorySlug: "atistirmalik",
    price: 199.90,
    image: productSample,
    inStock: true,
    description: "Fındık, badem, ceviz ve kuru meyvelerden oluşan özel karışım.",
    weight: "500g",
  },
  {
    id: "6",
    name: "Fındık Unu (İnce Çekilmiş)",
    slug: "findik-unu-ince-cekilmis",
    category: "Pastacılık",
    categorySlug: "pastacilik",
    price: 179.90,
    image: productSample,
    inStock: false,
    description: "Pastacılık için ince çekilmiş, taze fındık unu.",
    weight: "250g",
  },
  {
    id: "7",
    name: "Premium Hediyelik Fındık Seti",
    slug: "premium-hediyelik-findik-seti",
    category: "Hediyelik",
    categorySlug: "hediyelik",
    price: 549.90,
    originalPrice: 649.90,
    image: productSample,
    badge: "Özel",
    inStock: true,
    description: "Özel ambalajlı, hediyelik premium fındık ve fındık ürünleri seti.",
    weight: "1kg",
  },
  {
    id: "8",
    name: "Çiğ İç Fındık",
    slug: "cig-ic-findik",
    category: "Fındık",
    categorySlug: "findik",
    price: 299.90,
    image: productSample,
    badge: "Yeni",
    inStock: true,
    description: "Taze hasat, işlenmemiş doğal çiğ iç fındık.",
    weight: "500g",
  },
];

export const categories = [
  { name: "Fındık", slug: "findik", description: "Karadeniz'in en seçkin fındıkları" },
  { name: "Atıştırmalık", slug: "atistirmalik", description: "Sağlıklı ve lezzetli atıştırmalıklar" },
  { name: "Fındık Ezmesi", slug: "findik-ezmesi", description: "Doğal, katkısız fındık ezmeleri" },
  { name: "Fındık Kreması", slug: "findik-kremasi", description: "El yapımı fındık kremaları" },
  { name: "Pastacılık", slug: "pastacilik", description: "Pastacılık için özel fındık ürünleri" },
  { name: "Hediyelik", slug: "hediyelik", description: "Özel günler için hediyelik setler" },
];
