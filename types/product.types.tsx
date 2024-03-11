export type Product = {
  id: number;
  image: string;
  name: string;
  description?: string;
  price: string;
  inStock?: number;
  onSalePrice?: string;
  kind?: ProductKind[];
};

export enum ProductKindType {
  color = "color",
  hop = "hop",
  beerType = "beerType",
  flavor = "flavor",
}

export type ProductKind = {
  name: string;
  type: ProductKindType;
  color?: string;
};
