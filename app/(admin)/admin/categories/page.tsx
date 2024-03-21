import { GET as getCategories } from "@/app/api/categories/route";
import { GET as getProducts } from "@/app/api/products/route";
import AccordionProductComponent from "@/components/accordion/accordion-product.component";
import { CategoryAddItem } from "@/components/category/category-add.item";
import CategoryItems from "@/components/category/category-items.component";
import { ProductKind } from "@/types/category.types";
import { Product } from "@/types/product.types";
import { SfIconExpandMore, SfInput } from "@storefront-ui/react";

const getData = async () => {
  const categoriesData = getCategories() as Promise<ProductKind[]>;
  const itemsData = getProducts() as Promise<Product[]>;
  const [categories, items] = await Promise.all([categoriesData, itemsData]);
  return { categories, items };
};

export default async function AdminCategories() {
  const { categories, items } = await getData();

  console.log("categories", categories);

  return (
    <div className="flex justify-start w-full">
      <div className="w-1/2 px-2">
        <h1>Kategorije</h1>
        <CategoryItems items={categories} />
      </div>
      <div className="px-2">
        <h1>Nova kategorija</h1>
        <CategoryAddItem />
      </div>
    </div>
  );
}
