import { Product } from "@/types/product.types";
import { formatPrice } from "@/utils/price-formatter.util";
import {
  SfButton,
  SfLink,
  SfIconShoppingCart,
  useDisclosure,
  SfChip,
  SfScrollable,
  SfThumbnail,
} from "@storefront-ui/react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import QuantityChange from "./quantity-change.component";
import {
  ColorProductKind,
  ProductKind,
  ProductKindType,
} from "@/types/category.types";
import ProductCardImage from "./product-card.image";

type ProductCardProps = {
  onAddToCart: () => void;
} & Product;

export default function ProductCard({
  image,
  name,
  description,
  price,
  kind,
  onSalePrice,
  onAddToCart,
}: ProductCardProps) {
  const { isOpen, open, close } = useDisclosure({ initialValue: false });
  const productRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(0);
  const priceComponent = useMemo(() => {
    if (onSalePrice) {
      return (
        <span className="flex flex-col text-right">
          <span className="line-through text-2xs text-gray-500 ">
            {formatPrice(Number(price))}
          </span>
          <span className="font-bold text-special">
            {formatPrice(Number(onSalePrice))}
          </span>
        </span>
      );
    }

    // <span className="block pb-2 font-bold typography-text-lg text-special">
    //   {formatPrice(Number(price))}
    // </span>
    return (
      <span className="font-bold text-special">
        {formatPrice(Number(price))}
      </span>
    );
  }, [price, onSalePrice]);

  const getSlotPrefix = useCallback((k: ProductKind) => {
    if (k.type === ProductKindType.color) {
      return (
        <SfThumbnail
          size="sm"
          className="!w-4 !h-4 rounded-full overflow-hidden mr-2 text-xs"
          style={{
            backgroundColor: (k as ColorProductKind).color,
          }}
        />
      );
    }

    if (k.type === ProductKindType.hop) {
      return (
        <SfThumbnail
          className="!w-4 !h-4 rounded-full overflow-hidden mr-1 p-0"
          size="sm"
        >
          <Image
            src="/images/hop-image.png"
            alt={k.name}
            width="20"
            height="20"
            className="w-4 h-4 object-cover"
          />
        </SfThumbnail>
      );
    }

    return null;
  }, []);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (productRef.current?.contains(e.target as Node)) {
        return;
      }
      close();
    };
    document.addEventListener("click", clickHandler, {
      capture: false,
    });

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [productRef, close]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setQuantity(Number(Math.min(Math.max(Number(value), 0), 100)));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(prev + 1, 100));
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div
      className="shadow-md hover:shadow-lg max-w-[300px] my-8 md:mx-4 rounded-md"
      ref={productRef}
    >
      <ProductCardImage
        image={image}
        description={description}
        isOpen={isOpen}
        open={open}
        close={close}
        name={name}
      />
      <div className="px-4 pb-4 pt-2 dark:bg-neutral-900 min-h-32 flex flex-col justify-between rounded-b-md ">
        <SfScrollable
          className="m-auto py-1 items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-auto !gap-0 min-h-10"
          buttonsPlacement="none"
          // draggable
          drag={{
            sensitivity: 1,
          }}
          // drag
        >
          {kind?.map((k) => (
            <SfChip
              key={k.name}
              size="base"
              className="mx-1 px-2 py-0 rounded-xl ring-1 ring-primary-700 text-nowrap text-xs flex flex-row hover:text-white hover:bg-slate-500"
              slotPrefix={getSlotPrefix(k)}
            >
              {k.name}
            </SfChip>
          ))}
        </SfScrollable>
        <div className="flex justify-between h-10 my-1 items-start">
          <SfLink href="#" variant="secondary" className="no-underline">
            {name}
          </SfLink>
          {priceComponent}
        </div>
        <div className="flex justify-between">
          <QuantityChange
            value={quantity}
            min={0}
            max={100}
            inputId="quantity"
            handleOnChange={handleQuantityChange}
            inc={handleIncrease}
            dec={handleDecrease}
          />
          <SfButton
            size="sm"
            className="flex flex-grow ml-4 px-2 py-1 flex-row justify-evenly text-inherit"
            slotPrefix={<SfIconShoppingCart className="text-sm fill-current" />}
            onClick={onAddToCart}
          >
            Dodaj u korpu
          </SfButton>
        </div>
      </div>
    </div>
  );
}
