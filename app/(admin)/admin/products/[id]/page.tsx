"use client";

import items from "@/mock/items";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { AdminProductPageParams } from "@/types/router-params.types";
import ProductFieldEditComponent from "@/components/field/product-field-edit.component";
import MultiSelect from "@/components/select/select.component";
import categories from "@/mock/categories";
import { ProductKindType } from "@/types/category.types";

const Markdown = dynamic(() => import("../../markdown.component"), {
  ssr: false,
});

const categoryTypeTranslation: Record<ProductKindType, string[]> = {
  beerType: ["vrsta", "vrsta piva", "piva", "pivo"],
  hop: ["Hmelj"],
  flavor: ["Ukus"],
  color: ["Boja"],
};
export default function AdminProducts({ params }: AdminProductPageParams) {
  const { id } = params;
  const item = useMemo(
    () => items.find((item) => Number(item.id) === Number(id)),
    [id],
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((c) => ({
        label: c.name,
        value: c.name,
        type: c.type,
      })),
    [],
  );
  const [markdown, setMarkdown] = useState(item?.description ?? "");
  const editorRef = useRef<MDXEditorMethods>(null);
  console.log("id, items", id, items, item);

  const handleSearch = useCallback(
    (value: string) => {
      return categoryOptions.filter(
        (option) =>
          option.label.toLowerCase().includes(value.toLowerCase()) ||
          option.value.toLowerCase().includes(value.toLowerCase()) ||
          categoryTypeTranslation[option.type].some((t) =>
            t.toLowerCase().includes(value.toLowerCase()),
          ),
      );
    },
    [categoryOptions],
  );
  if (!item) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex flex-col lg:flex-row justify-between py-4">
        <div className="flex flex-row justify-between flex-grow">
          <div>
            <Image src={item.image} alt={item.name} width={300} height={330} />
          </div>

          <div className="min-w-24 max-w-96 w-full ml-8">
            <ProductFieldEditComponent title="Naziv" value={item.name} />
            <ProductFieldEditComponent title="Cena" value={item.price} />
            <ProductFieldEditComponent
              title="Na stanju"
              value={item.inStock}
              type="checkbox"
            />
            <ProductFieldEditComponent
              title="Popust"
              value={item.onSalePrice}
            />
          </div>
        </div>
        <MultiSelect
          selectedOptions={item.kind?.map((kind) => ({
            label: kind.name,
            value: kind.name,
          }))}
          options={categoryOptions}
          handleSearch={handleSearch}
        />
      </div>
      <div className="rounded border border-primary-700 p-2">
        <div>Detalji</div>
        <Markdown
          markdown={markdown}
          onChange={setMarkdown}
          editorRef={editorRef}
        />
      </div>
    </div>
  );
}
