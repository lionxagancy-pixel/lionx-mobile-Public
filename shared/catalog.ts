export type CatalogCategory = {
  id: string;
  label: string;
  count: number;
  icon: string;
};

export type MallPillar = {
  id: string;
  label: string;
  arabicLabel: string;
  description: string;
  count: number;
  accent: string;
};

export const mallPillars: MallPillar[] = [
  { id: "play", label: "PLAY", arabicLabel: "الألعاب والشحن", description: "شحن الألعاب والبطاقات الرقمية", count: 837, accent: "#D4AF37" },
  { id: "pay", label: "PAY", arabicLabel: "الدفع الرقمي", description: "بطاقات ومحافظ وخدمات دفع", count: 475, accent: "#B99A31" },
  { id: "grow", label: "GROW", arabicLabel: "النمو والتسويق", description: "أدوات صناع المحتوى وB2B", count: 1095, accent: "#E5C65A" },
  { id: "digital", label: "DIGITAL", arabicLabel: "الاشتراكات والأدوات", description: "اشتراكات واستضافة وأدوات رقمية", count: 280, accent: "#C8AE52" },
  { id: "vip", label: "VIP", arabicLabel: "الخدمات الخاصة", description: "سفر وإقامات وكونسيرج", count: 125, accent: "#F0D47A" },
];

export const audiencePaths = [
  { id: "b2c", label: "للأفراد", description: "خدمات رقمية سريعة للألعاب والاشتراكات والبطاقات", cta: "استكشف المول" },
  { id: "b2b", label: "للشركات", description: "حلول نمو وتسويق وعروض أسعار مخصصة للشركات", cta: "اطلب عرض سعر" },
];

export type CatalogService = {
  id: string;
  category: string;
  name: string;
  subtitle: string;
  price: number;
  eta: string;
  tag: string;
};

export const categories: CatalogCategory[] = [
  { id: "all", label: "الكل", count: 2812, icon: "apps" },
  { id: "gaming", label: "الألعاب", count: 500, icon: "sports-esports" },
  { id: "coins", label: "عملات تيك توك", count: 17, icon: "monetization-on" },
  { id: "gift", label: "بطاقات هدايا", count: 320, icon: "card-giftcard" },
  { id: "subs", label: "الاشتراكات", count: 180, icon: "workspace-premium" },
  { id: "smm", label: "السوشيال", count: 1000, icon: "groups" },
  { id: "web", label: "خدمات الويب", count: 70, icon: "language" },
  { id: "vip", label: "VIP Privé", count: 30, icon: "diamond" },
];

export const services: CatalogService[] = [
  { id: "G-001", category: "gaming", name: "PUBG 60 UC", subtitle: "شحن فوري وآمن", price: 250, eta: "فوري", tag: "الأكثر طلبًا" },
  { id: "G-014", category: "gaming", name: "Free Fire 110 Diamonds", subtitle: "تسليم مباشر للحساب", price: 95, eta: "فوري", tag: "سريع" },
  { id: "TC-001", category: "coins", name: "TikTok 100 Coins", subtitle: "اشحن بثك الآن", price: 70, eta: "5 دقائق", tag: "جديد" },
  { id: "GC-002", category: "gift", name: "Google Play 10 USD", subtitle: "كود رقمي أصلي", price: 520, eta: "فوري", tag: "موثوق" },
  { id: "SUB-001", category: "subs", name: "ChatGPT Plus", subtitle: "اشتراك شهري", price: 750, eta: "خلال ساعة", tag: "ذكاء اصطناعي" },
  { id: "SMM-001", category: "smm", name: "1000 متابع إنستجرام", subtitle: "جودة ثابتة ودعم", price: 120, eta: "بدء فوري", tag: "سوشيال" },
  { id: "WEB-003", category: "web", name: "صفحة هبوط احترافية", subtitle: "تصميم وتسليم سريع", price: 1500, eta: "48 ساعة", tag: "خدمات الويب" },
  { id: "VIP-001", category: "vip", name: "عضوية Bronze", subtitle: "مزايا VIP الأساسية", price: 999, eta: "تفعيل فوري", tag: "VIP" },
];

export const formatEgp = (price: number) => `${price.toLocaleString("ar-EG")} ج.م`;
