import catalog from "../public/assets/data/catalog.json";

export type FullCatalogService = {
  id: string;
  name: string;
  sector: "PLAY" | "PAY" | "GROW" | "DIGITAL" | "VIP" | string;
  price: number;
  image: string;
  deliveryTime: string;
  description: string;
  manual: boolean;
  originalBrand: string;
};

export const FULL_CATALOG = catalog as FullCatalogService[];
