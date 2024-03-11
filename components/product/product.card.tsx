import { Product, ProductKind, ProductKindType } from "@/types/product.types";
import { CSSTransition } from "react-transition-group";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
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
import Markdown from "react-markdown";

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
  const [descriptionHeight, setDescriptionHeight] = useState(336);
  const descriptionContainerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [overflowDescription, setOverflowDescription] = useState(false);
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
          className="w-2 h-2 rounded-full overflow-hidden mr-2"
          style={{
            backgroundColor: k.color,
          }}
        />
      );
    }

    if (k.type === ProductKindType.hop) {
      return (
        <SfThumbnail className="w-3 h-3 rounded-full overflow-hidden mr-2">
          <Image
            src="/images/hop-image.png"
            alt={k.name}
            width="16"
            height="16"
          />
        </SfThumbnail>
      );
    }

    return null;
  }, []);

  useEffect(() => {
    if (descriptionRef.current) {
      const c = descriptionRef.current;
      const textContainer = {
        width: c.scrollWidth,
        height: c.scrollHeight,
      };

      const cont = c.getBoundingClientRect();
      const container = {
        width: cont.width,
        height: cont.height,
      };

      console.log(
        "oveflow",
        textContainer.width > container.width ||
          textContainer.height > container.height,
        {
          textContainer,
          container,
          text: c.innerText,
        },
      );
      setDescriptionHeight(textContainer.height + 32);
      setOverflowDescription(
        textContainer.width > container.width ||
          textContainer.height > container.height,
      );
    }
  }, [descriptionRef, description]);

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

  console.log("overflowDescription", overflowDescription);
  return (
    <div
      className="shadow-md hover:shadow-lg max-w-[300px] my-8 md:mx-4 rounded-md"
      ref={productRef}
    >
      <div className="relative h-[336px] overflow-hidden">
        <SfLink className="block w-full  h-[336px]" onClick={open}>
          <Image
            src={image}
            alt={name}
            className={`object-cover h-full  aspect-square transition-all duration-200 pb-8 rounded-t-md ${
              isOpen && description ? "filter blur-sm" : ""
            }`}
            width="300"
            height="332"
          />
          {description && (
            <CSSTransition
              nodeRef={imageRef}
              in={!isOpen}
              timeout={100}
              onEnter={() => {
                console.log("entering desc");
              }}
              onExit={() => {
                console.log("exiting desc");
              }}
              // classNames={{
              //   enter: "translate-y-full duration-500 ease-out",
              //   enterDone:
              //     "-translate-y-[72px] transition duration-500 ease-out",
              //   exitActive: "-translate-y-[72px]",
              //   exitDone: "translate-y-full transition duration-500 ease-out",
              // }}
            >
              <div
                className=" text-primary-700 flex flex-col justify-start items-center dark:bg-neutral-900 bg-default text-xs -translate-y-full transition-all duration-500"
                ref={imageRef}
              >
                <KeyboardDoubleArrowUpIcon className="!w-4 !h-5" />
                Opis
              </div>
            </CSSTransition>
          )}
        </SfLink>

        {description && (
          <CSSTransition
            nodeRef={descriptionContainerRef}
            in={isOpen}
            timeout={100}
            onEnter={() => {
              console.log("entering desc");
            }}
            onExit={() => {
              console.log("exiting desc");
            }}
            classNames={{
              enter: "translate-y-0",
              enterDone:
                "-translate-y-[336px] transition duration-200 ease-out",
              exitActive: "-translate-y-[336px]",
              exitDone: "translate-y-0 transition duration-200 ease-out",
            }}
          >
            <div
              className="px-4 py-4 relative w-[300px] h-[300px] overflow-y-auto"
              ref={descriptionContainerRef}
              onClick={close}
            >
              <p
                ref={descriptionRef}
                className="block font-normal typography-text-sm text-default z-10 prose dark:prose-invert"
              >
                <Markdown>{description}</Markdown>
              </p>
              <div
                className="absolute w-full top-0 left-0 right-0 h-full bg-gray-200 dark:bg-gray-800 opacity-40 filter blur-sm z-[-1]"
                style={{ height: `max(100%,${descriptionHeight}px)` }}
              />
            </div>
          </CSSTransition>
        )}
      </div>
      <div className="px-4 pb-4 pt-2 dark:bg-neutral-900 min-h-32 flex flex-col justify-between rounded-b-md">
        <SfScrollable
          className="m-auto py-1 items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-auto !gap-0"
          // drag
        >
          {kind?.map((k) => (
            <SfChip
              key={k.name}
              size="sm"
              className="mx-1 px-2 py-0 rounded-xl ring-1 ring-primary-700 text-nowrap text-xs flex flex-row"
              slotPrefix={getSlotPrefix(k)}
            >
              {k.name}
            </SfChip>
          ))}
        </SfScrollable>
        <div className="flex justify-between">
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
            className="flex flex-grow ml-8 px-2 py-1 flex-row justify-evenly text-inherit"
            slotPrefix={<SfIconShoppingCart className="text-sm fill-current" />}
            onClick={onAddToCart}
          >
            Add to cart
          </SfButton>
        </div>
      </div>
    </div>
  );
}
