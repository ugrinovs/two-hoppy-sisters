"use client";
import { SfAccordionItem, SfIconChevronRight } from "@storefront-ui/react";
import { Transition } from "react-transition-group";
import classNames from "classnames";
import { useState } from "react";
import { Product } from "@/types/product.types";
import DropComponent from "../drag-n-drop/drop.component";

export default function AccordionProductComponent({
  accordionItems,
}: {
  accordionItems: Product[];
}) {
  const [isTransitioning, setTransitioning] = useState(false);
  const [opened, setOpened] = useState<number | null>(null);

  const isOpen = (id: number) => opened === id;

  const handleToggle = (id: number) => (open: boolean) => {
    setTransitioning(true);
    if (open) {
      setOpened(id);
    } else if (isOpen(id)) {
      setOpened(null);
    }
  };
  const handleStopTransition = () => {
    setTransitioning(false);
  };

  return (
    <div className="border border-neutral-500 rounded-md divide-y ">
      {accordionItems.map(({ id, name, kind }) => (
        <SfAccordionItem
          key={id}
          summary={
            <div className="flex justify-between p-4 font-medium border border-slate-500 bg-white dark:bg-slate-800 w-full hover:bg-slate-200 dark:hover:bg-slate-700">
              <p className="font-medium ">{name}</p>
              <SfIconChevronRight
                className={classNames("hover:text-black", {
                  "rotate-90": isOpen(id),
                })}
              />
            </div>
          }
          onToggle={handleToggle(id)}
          open={isTransitioning || isOpen(id)}
        >
          <Transition
            in={isOpen(id)}
            timeout={300}
            onEntered={handleStopTransition}
            onExited={handleStopTransition}
            mountOnEnter
            unmountOnExit
          >
            {(state) => (
              <div
                className={classNames(
                  "grid transition-[grid-template-rows] duration-300 grid-rows-[0fr]",
                  {
                    "!grid-rows-[1fr]":
                      state === "entering" || state === "entered",
                    "grid-rows-[0fr]": state === "exiting",
                  },
                )}
              >
                <div className="overflow-hidden">
                  <DropComponent id={id} kind={kind} name={name}>
                    <p className="p-4">{JSON.stringify(kind)}</p>
                  </DropComponent>
                </div>
              </div>
            )}
          </Transition>
        </SfAccordionItem>
      ))}
    </div>
  );
}
