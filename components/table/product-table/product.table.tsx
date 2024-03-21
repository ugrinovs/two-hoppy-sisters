"use client";
import { Product } from "@/types/product.types";
import { formatPrice } from "@/utils/price-formatter.util";
import { SfCheckbox } from "@storefront-ui/react";
import { useRouter } from "next/navigation";

type ProductTableProps = {
  products: Product[];
};
export default function ProductTable({ products }: ProductTableProps) {
  const navigate = useRouter();

  const onProductClick = (id: number) => {
    navigate.push(`/admin/products/${id}`);
  };

  return (
    <table className="table-auto border-collapse border border-slate-500 bg-white dark:bg-slate-800 w-full">
      <thead className="bg-slate-50 dark:bg-slate-700">
        <tr>
          <th className="px-6 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
            ID
          </th>
          <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
            Ime
          </th>
          <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
            Cena
          </th>

          <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
            Popust
          </th>

          <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
            Na stanju
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            key={product.id}
            className="hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer group"
            onClick={() => onProductClick(product.id)}
          >
            <td className="border border-slate-700 p-4 text-right">
              {product.id}
            </td>
            <td className="border border-slate-700 p-4 group-hover:underline">
              {product.name}
            </td>
            <td className="border border-slate-700 p-4 text-right">
              {formatPrice(Number(product.price ?? 0))}
            </td>
            <td className="border border-slate-700 p-4 text-right">
              {product.onSalePrice && formatPrice(Number(product.onSalePrice))}
            </td>
            <td className="border border-slate-700 p-4 text-center">
              <SfCheckbox
                checked={product.inStock}
                className="mx-auto align-middle"
                disabled
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
