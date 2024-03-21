import { Product } from "@/types/product.types";
import ProductFieldEditComponent from "../field/product-field-edit.component";

type CategorySelectorComponentProps = {
  item: Product;
};

const categoryToName = {
  beerType: "Vrsta piva",
  hop: "Hmelj",
  flavor: "Aroma",
  color: "Boja",
};
export default function CategorySelectorComponent({
  item,
}: CategorySelectorComponentProps) {
  return (
    <div>
      <div>Kategorije</div>
      {item.kind &&
        item.kind.map((kind) => {
          return (
            <ProductFieldEditComponent
              key={kind.name}
              title={categoryToName[kind.type]}
              value={kind.name}
            />
          );
        })}
    </div>
  );
}
