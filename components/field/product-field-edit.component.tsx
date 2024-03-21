"use client";
import { SfInput, SfSwitch } from "@storefront-ui/react";
import { Product } from "@/types/product.types";
import { useMemo } from "react";

type ProductKey = Pick<
  Product,
  "id" | "name" | "description" | "price" | "inStock" | "onSalePrice"
>;
type FieldEditComponentProps = {
  title: string;
  field?: keyof Product;
  value: Product[keyof ProductKey];
  type?: "text" | "number" | "checkbox";
};

export default function ProductFieldEditComponent({
  title,
  field,
  value,
  type = "text",
}: FieldEditComponentProps) {
  const input = useMemo(() => {
    if (type === "checkbox") {
      return (
        <span className="align-middle">
          <SfSwitch
            className="m-0.5"
            checked={value as boolean}
            value={value?.toString()}
          />
        </span>
      );
    }
    return (
      <SfInput
        value={value as string | number}
        wrapperClassName="text-black"
        type={type}
      />
    );
  }, [type, value]);
  return (
    <label className="block py-2">
      <span className="text-sm font-medium">{title}</span>
      {input}
    </label>
  );
}
