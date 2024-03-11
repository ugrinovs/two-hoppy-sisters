"use client";
import mockItems from "@/mock/items";
import { useMemo, useState } from "react";
import { Product } from "@/types/product.types";
import ProductCard from "../product/product.card";

export default function Home() {
  const items = useMemo(() => mockItems, []);
  const [cart, setCart] = useState<Product[]>([]);
  return (
    <div className="grid  md:grid-cols-2 grid-cols-1">
      {items.map((item) => (
        <ProductCard
          key={item.name}
          {...item}
          onAddToCart={() => {
            setCart((prevCart) => [...prevCart, item]);
          }}
        />
      ))}
    </div>
  );
}
