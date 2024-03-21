"use client";

import {
  ColorProductKind,
  ProductKind,
  ProductKindType,
} from "@/types/category.types";
import { useMemo, useState } from "react";
import classNames from "classnames";
import CategoryFieldEditComponent from "../field/category-field-edit.component";
import { yellow, amber, orange } from "tailwindcss/colors";
import { DefaultColors } from "tailwindcss/types/generated/colors";
import OptionsGridColorComponent from "../select/options-grid-color.component";
import SelectedValueColorComponent from "../select/selected-value-color.component";

type CategoryAddItemProps = {};

const colors = { yellow, amber, orange };

const categoryTypeTranslation: Record<ProductKindType, string> = {
  beerType: "Tip Piva",
  hop: "Hmelj",
  flavor: "Aroma",
  color: "Boja",
};
export function CategoryAddItem({}: CategoryAddItemProps) {
  const [values, setValues] = useState<ProductKind>({
    name: "",
    type: ProductKindType.beerType as ProductKindType,
  });
  const categoryTypeOptions = useMemo(() => {
    return Object.keys(ProductKindType) as ProductKindType[];
  }, []);

  const handleChange = (field: keyof ColorProductKind, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className="min-w-64">
      <div>
        <CategoryFieldEditComponent
          type="text"
          field="name"
          title="Ime"
          value={values.name}
          handleChange={handleChange}
        />
      </div>
      <CategoryFieldEditComponent
        type="dropdown"
        options={categoryTypeOptions.map((c) => ({
          label: categoryTypeTranslation[c],
          value: c,
        }))}
        selectedOption={{
          label: categoryTypeTranslation[values.type],
          value: values.type,
        }}
        field="type"
        title="Tip"
        handleChange={handleChange}
      />
      {values.type === ProductKindType.color && (
        <div className="flex">
          <CategoryFieldEditComponent<ColorProductKind>
            // className="flex flex-col items-end"
            // labelClassName="self-start"
            type="dropdown"
            field="color"
            title="Boja"
            options={
              (
                Object.keys(colors) as Array<
                  keyof Pick<DefaultColors, "amber" | "yellow" | "orange">
                >
              )
                .flatMap((color) => {
                  return Object.keys(colors[color]).map((shade) => {
                    if (shade === "50") {
                      return null;
                    }
                    return {
                      label: (
                        <div
                          className={classNames(
                            "w-12 h-8 rounded",
                            `bg-${color}-${shade}`,
                          )}
                        />
                      ),
                      value: `${color}-${shade}`,
                    };
                  });
                })
                .filter((c) => c !== null) as {
                label: string | JSX.Element;
                value: string;
              }[]
            }
            SelectedValueComponent={SelectedValueColorComponent}
            SelectOptionsComponent={OptionsGridColorComponent}
            handleChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}
