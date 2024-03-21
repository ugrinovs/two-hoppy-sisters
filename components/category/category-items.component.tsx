"use client";
import { useCallback } from "react";
import {
  ColorProductKind,
  ProductKind,
  ProductKindType,
} from "@/types/category.types";

type TranslationMap = Record<ProductKindType, string>;
const typeTranslationMap: TranslationMap = {
  [ProductKindType.hop]: "Hmelj",
  [ProductKindType.color]: "Boja",
  [ProductKindType.flavor]: "Aroma",
  [ProductKindType.beerType]: "Tip piva",
} as TranslationMap;
export default function CategoryItems({ items }: { items: ProductKind[] }) {
  const getBackgroundColor = useCallback((item: ProductKind) => {
    return item.type === "color"
      ? (item as ColorProductKind).color
      : "transparent";
  }, []);
  return (
    <div className="w-full">
      <table className="table-auto border-collapse border border-slate-500 bg-white dark:bg-slate-800 w-full">
        <thead className="bg-slate-50 dark:bg-slate-700">
          <tr>
            <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Ime katgeorije
            </th>
            <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Tip
            </th>
            <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Dodatne informacije
            </th>
          </tr>
        </thead>
        {items.map((item) => (
          <tr
            key={item.name}
            className="hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <td className="border border-slate-700 p-4">{item.name}</td>
            <td className="border border-slate-700 p-4">
              {typeTranslationMap[item.type]}
            </td>
            <td className="border border-slate-700 p-4 ">
              <div
                style={{ backgroundColor: getBackgroundColor(item) }}
                className="w-8 h-6 rounded mx-auto"
              />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
