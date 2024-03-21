import { SfLink } from "@storefront-ui/react";
import Image from "next/image";
import Markdown from "react-markdown";
import { CSSTransition } from "react-transition-group";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { useEffect, useRef, useState } from "react";

type ProductImageCardProps = {
  image: string;
  name: string;
  description?: string;
  open: () => void;
  close: () => void;
  isOpen: boolean;
};
export default function ProductCardImage({
  image,
  name,
  description,
  open,
  close,
  isOpen,
}: ProductImageCardProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const descriptionContainerRef = useRef<HTMLDivElement>(null);

  const [descriptionHeight, setDescriptionHeight] = useState(336);

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
    }
  }, [descriptionRef, description]);
  return (
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
              className=" text-primary-700 flex flex-col justify-start items-center dark:bg-neutral-900 bg-default-main text-xs -translate-y-full transition-all duration-500"
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
            enterDone: "-translate-y-[336px] transition duration-200 ease-out",
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
              className="block font-normal typography-text-sm text-default-main z-10 prose dark:prose-invert"
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
  );
}
