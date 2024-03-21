import ProductTable from "@/components/table/product-table/product.table";
import items from "@/mock/items";
import Link from "next/link";

export default function AdminProducts() {
  return (
    <div className="flex flex-grow flex-col">
      <ProductTable products={items} />
      {items.map((item) => (
        <li className="flex" key={item.id}>
          <Link href={`/admin/products/${item.id}`}>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <div>{item.inStock}</div>
          </Link>
        </li>
      ))}
    </div>
  );
}
