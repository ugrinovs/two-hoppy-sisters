import { ProductKind } from "./category.types";

export type Product = {
  id: number;
  image: string;
  name: string;
  description?: string;
  price: string;
  inStock: boolean;
  onSalePrice?: string;
  kind?: ProductKind[];
};
