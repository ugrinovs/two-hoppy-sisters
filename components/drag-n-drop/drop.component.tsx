"use client";
import classNames from "classnames";
import { useDrop } from "react-dnd";

import { Item, ItemTypes } from "./drag-n-drop.types";
import { ProductKind } from "@/types/category.types";
import { useMemo } from "react";

export default function DropComponent({
  id,
  kind,
  name,
  children,
}: {
  id: number;
  name: string;
  kind?: ProductKind[];
  children: React.ReactNode;
}) {
  const [{ canDrop, isOver, item }, drop] = useDrop(() => ({
    accept: ItemTypes.ProductKind,
    drop: () => ({ name: "Category", id }),
    collect: (monitor) => {
      const item = monitor.getItem<Item>();
      const isExisting = kind?.find((kind) => kind.name === item?.name);
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop() && !isExisting,
        item: monitor.getItem<Item>(),
      };
    },
  }));

  const isActive = canDrop && isOver;
  // if (isActive) {
  //   backgroundColor = "darkgreen";
  // } else if (canDrop) {
  //   backgroundColor = "darkkhaki";
  // }

  const overlay = useMemo(() => {
    if (!canDrop && item) {
      return (
        <div className="bg-red-500">
          <div className="absolute inset-0 bg-red-500 opacity-25" />
          <div className="relative">
            <strong>{item?.name}</strong> već postoji u <strong>{name}</strong>
          </div>
        </div>
      );
    }

    if (canDrop && item && !isActive) {
      return (
        <div className="bg-yellow-500">
          <div className="absolute inset-0 bg-yellow-500 opacity-25" />
          <div className="relative">
            Prevuci <strong>{item?.name}</strong> ovde da ga dodaš u{" "}
            <strong>{name}</strong>
          </div>
        </div>
      );
    }

    if (!isActive) {
      return (
        <div className="bg-yellow-500">
          <div className="absolute inset-0 bg-yellow-500 opacity-25" />
          <div className="relative">
            Prevuci kategoriju ovde da je dodaš u <strong>{name}</strong>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-green-500">
        <div className="absolute inset-0 bg-green-500 opacity-25" />
        <div className="relative">
          Dodaj <strong>{item?.name}</strong> u <strong>{name}</strong>
        </div>
      </div>
    );
  }, [canDrop, isActive, item, name]);
  return (
    <div
      ref={drop}
      data-testid="dustbin"
      className={classNames("relative", {
        "border-dashed border border-neutral-500": !isActive,
        "border border-green-500": isActive,
      })}
    >
      {overlay}
      {children}
    </div>
  );
}
