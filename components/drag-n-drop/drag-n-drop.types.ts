export enum ItemTypes {
  ProductKind = "productKind",
}

export interface Item {
  name: string;
}

export interface DropResult {
  name: string;
  id: number;
}
