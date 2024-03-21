import { useDrag } from "react-dnd";
import classNames from "classnames";

import { ItemTypes, DropResult, Item } from "./drag-n-drop.types";
import React from "react";

type DragComponentProps = {
  name: string;
  translatedType: string;
  type: string;
  additionalInfo?: string;
  onDrop: (dropResult: DropResult, item: Item) => void;
};

export default function DragComponent({
  name,
  translatedType,
  type,

  additionalInfo,
  onDrop,
}: DragComponentProps) {
  const [{ isDragging }, drag] = useDrag<
    Item,
    unknown,
    { isDragging: boolean }
  >(() => ({
    type: ItemTypes.ProductKind,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        console.log("dropResult", dropResult);
        onDrop(dropResult, item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  const backgroundColor = type === "color" ? additionalInfo : "transparent";
  return (
    <tr
      ref={drag}
      style={{ opacity }}
      data-testid={`box`}
      className={classNames("hover:bg-slate-200 dark:hover:bg-slate-700", {
        "bg-slate-50 dark:bg-slate-800": !isDragging,
        "bg-slate-100 dark:bg-slate-700": isDragging,
      })}
    >
      <td className="border border-slate-700 p-4">{name}</td>
      <td className="border border-slate-700 p-4">{translatedType}</td>
      <td className="border border-slate-700 p-4 ">
        <div style={{ backgroundColor }} className="w-8 h-6 rounded mx-auto" />
      </td>
    </tr>
  );
}
