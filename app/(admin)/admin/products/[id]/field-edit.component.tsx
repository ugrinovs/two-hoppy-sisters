"use client";
import { SfInput } from "@storefront-ui/react";
import { Product } from "@/types/product.types";

type ProductKey = Pick<
  Product,
  "id" | "name" | "description" | "price" | "inStock" | "onSalePrice"
>;
type FieldEditComponentProps = {
  title: string;
  field?: keyof Product;
  value: Product[keyof ProductKey];
};
export default function FieldEditComponent({
  title,
  field,
  value,
}: FieldEditComponentProps) {
  return (
    <>
      <label>
        <span className="text-sm font-medium">{title}</span>
        <SfInput value={value} wrapperClassName="text-black" />
      </label>
    </>
  );
}
