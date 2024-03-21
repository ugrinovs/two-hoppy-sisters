export enum ProductKindType {
  color = "color",
  hop = "hop",
  beerType = "beerType",
  flavor = "flavor",
}

export type ColorProductKind = {
  name: string;
  type: ProductKindType.color;
  color: string;
};

export type OtherProductKind = {
  name: string;
  type: ProductKindType;
};

export type ProductKind = ColorProductKind | OtherProductKind;
