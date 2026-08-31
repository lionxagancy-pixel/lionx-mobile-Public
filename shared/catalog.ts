import { FULL_CATALOG, type FullCatalogService } from "./full-catalog";

export type CatalogCategory = {
  id: "all" | "gaming" | "pay" | "grow" | "digital" | "vip";
  label: string;
  count: number;
  icon: string;
};

export type MallPillar = {
  id: "play" | "pay" | "grow" | "digital" | "vip";
  label: string;
  arabicLabel: string;
  description: string;
  count: number;
  accent: string;
};

export type CatalogService = FullCatalogService & {
  category: "gaming" | "pay" | "grow" | "digital" | "vip";
  subtitle: string;
  eta: string;
  tag: string;
};

export type CatalogBrand = {
  id: string;
  name: string;
  originalBrand: string;
  sector: string;
  category: CatalogService["category"];
  image: string;
  description: string;
  deliveryTime: string;
  packages: CatalogService[];
};

const categoryMeta: Record<CatalogCategory["id"], { label: string; icon: string; sector?: string }> = {
  all: { label: "الكل", icon: "apps" },
  gaming: { label: "PLAY · الألعاب", icon: "sports-esports", sector: "PLAY" },
  pay: { label: "PAY · الدفع", icon: "account-balance-wallet", sector: "PAY" },
  grow: { label: "GROW · النمو", icon: "groups", sector: "GROW" },
  digital: { label: "DIGITAL · الاشتراكات", icon: "language", sector: "DIGITAL" },
  vip: { label: "VIP · الخاصة", icon: "diamond", sector: "VIP" },
};

const categoryForSector = (sector: string): CatalogService["category"] => {
  const normalized = sector.toUpperCase();
  if (normalized === "PLAY") return "gaming";
  if (normalized === "PAY") return "pay";
  if (normalized === "GROW") return "grow";
  if (normalized === "DIGITAL") return "digital";
  return "vip";
};

const slugifyBrand = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "brand";

export const services: CatalogService[] = FULL_CATALOG.map((item) => ({
  ...item,
  category: categoryForSector(item.sector),
  subtitle: item.description,
  eta: item.deliveryTime,
  tag: item.originalBrand,
}));

const groupedBrands = new Map<string, CatalogService[]>();
services.forEach((service) => {
  const key = `${service.sector.toUpperCase()}::${service.originalBrand}`;
  const current = groupedBrands.get(key) ?? [];
  current.push(service);
  groupedBrands.set(key, current);
});

export const catalogBrands: CatalogBrand[] = Array.from(groupedBrands.entries()).map(([key, packages]) => {
  const first = packages[0];
  return {
    id: `${slugifyBrand(first.originalBrand)}-${first.sector.toLowerCase()}`,
    name: first.originalBrand,
    originalBrand: first.originalBrand,
    sector: first.sector,
    category: first.category,
    image: first.image,
    description: first.description.replace(/\s+-\s+\d+\s+-?\s*/, " - ").trim(),
    deliveryTime: first.deliveryTime,
    packages,
  };
});

export const getCatalogBrand = (brandId: string | undefined) =>
  catalogBrands.find((brand) => brand.id === brandId);

export const getCatalogBrandForService = (serviceId: string) => {
  const service = services.find((item) => item.id === serviceId);
  return service ? catalogBrands.find((brand) => brand.originalBrand === service.originalBrand && brand.sector === service.sector) : undefined;
};

const countForCategory = (category: CatalogCategory["id"]) => category === "all" ? services.length : services.filter((item) => item.category === category).length;

export const categories: CatalogCategory[] = (Object.keys(categoryMeta) as CatalogCategory["id"][]).map((id) => ({
  id,
  label: categoryMeta[id].label,
  count: countForCategory(id),
  icon: categoryMeta[id].icon,
}));

const countForSector = (sector: "PLAY" | "PAY" | "GROW" | "DIGITAL" | "VIP") => services.filter((item) => item.sector.toUpperCase() === sector).length;

export const mallPillars: MallPillar[] = [
  { id: "play", label: "PLAY", arabicLabel: "الألعاب والشحن", description: "شحن الألعاب والبطاقات الرقمية", count: countForSector("PLAY"), accent: "#D4AF37" },
  { id: "pay", label: "PAY", arabicLabel: "الدفع الرقمي", description: "بطاقات ومحافظ وخدمات دفع", count: countForSector("PAY"), accent: "#B99A31" },
  { id: "grow", label: "GROW", arabicLabel: "النمو والتسويق", description: "أدوات صناع المحتوى وB2B", count: countForSector("GROW"), accent: "#E5C65A" },
  { id: "digital", label: "DIGITAL", arabicLabel: "الاشتراكات والأدوات", description: "اشتراكات واستضافة وأدوات رقمية", count: countForSector("DIGITAL"), accent: "#C8AE52" },
  { id: "vip", label: "VIP", arabicLabel: "الخدمات الخاصة", description: "سفر وإقامات وكونسيرج", count: countForSector("VIP"), accent: "#F0D47A" },
];

export const audiencePaths = [
  { id: "b2c", label: "للأفراد", description: "خدمات رقمية سريعة للألعاب والاشتراكات والبطاقات", cta: "استكشف المول" },
  { id: "b2b", label: "للشركات", description: "حلول نمو وتسويق وعروض أسعار مخصصة للشركات", cta: "اطلب عرض سعر" },
];

export const formatEgp = (price: number) => price > 0 ? `${price.toLocaleString("ar-EG")} ج.م` : "السعر يحدد يدويًا";
