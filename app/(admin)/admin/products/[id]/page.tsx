"use client";

import items from "@/mock/items";
import dynamic from "next/dynamic";
import Image from "next/image";
import FieldEditComponent from "./field-edit.component";
import { useEffect, useMemo, useRef, useState } from "react";
import { MDXEditorMethods, editorRootElementRef$ } from "@mdxeditor/editor";
import { AdminProductPageParams } from "@/types/router-params.types";

const Markdown = dynamic(() => import("../../markdown.component"), {
  ssr: false,
});

const categoryToName = {
  beerType: "Vrsta piva",
  hop: "Hmelj",
  flavor: "Ukus",
  color: "Boja",
};

export default function AdminProducts({ params }: AdminProductPageParams) {
  const { id } = params;
  const item = useMemo(
    () => items.find((item) => Number(item.id) === Number(id)),
    [id],
  );
  const [markdown, setMarkdown] = useState(item?.description ?? "");
  const editorRef = useRef<MDXEditorMethods>(null);
  console.log("id, items", id, items, item);

  if (!item) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex flex-row justify-between">
        <div>
          <div>
            <Image src={item.image} alt={item.name} width={300} height={330} />
          </div>
        </div>
        <div className="min-w-24 max-w-96">
          <FieldEditComponent title="Naziv" value={item.name} />
          <FieldEditComponent title="Cena" value={item.price} />
          <FieldEditComponent title="Na stanju" value={item.inStock} />
          <FieldEditComponent title="Akcija" value={item.onSalePrice} />
          <div>
            <div>Kategorije</div>
            {item.kind &&
              item.kind.map((kind) => {
                return (
                  <FieldEditComponent
                    key={kind.name}
                    title={categoryToName[kind.type]}
                    value={kind.name}
                  />
                );
              })}
          </div>
        </div>
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
