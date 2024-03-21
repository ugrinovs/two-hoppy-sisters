import { SfInput } from "@storefront-ui/react";
import classNames from "classnames";
import { useCallback, useMemo } from "react";
import { ProductKind } from "@/types/category.types";
import SelectDropdownComponent from "../select/select-dropdown.component";
import {
  OptionsComponentProps,
  SelectedValueComponentProps,
} from "../select/options-component.types";

type Option = { label: string | JSX.Element; value: string };
type Options = Option[];

type DropdownProps<T> = {
  type: "dropdown";
  field: keyof T;
  options: Options;
  selectedOption?: Option;
  SelectOptionsComponent?: React.FC<OptionsComponentProps>;
  SelectedValueComponent?: React.FC<SelectedValueComponentProps>;
  title: string;
};

type InputProps<T> = {
  type: "text" | "number" | "checkbox";
  field: keyof T;
  title: string;
  value?: string | number | boolean;
};
type FieldEditComponentProps<T> = (DropdownProps<T> | InputProps<T>) & {
  className?: string;
  labelClassName?: string;
  handleChange: (field: keyof T, value: string) => void;
};

export default function CategoryFieldEditComponent<T = ProductKind>({
  title,
  field,
  type,
  className,
  labelClassName,
  handleChange,
  ...restProps
}: FieldEditComponentProps<T>) {
  const onChange = useCallback(
    (value: string) => {
      handleChange(field, value);
    },
    [field, handleChange],
  );

  const input = useMemo(() => {
    if (type === "dropdown") {
      return (
        <SelectDropdownComponent
          options={(restProps as DropdownProps<T>).options}
          selectedOption={(restProps as DropdownProps<T>).selectedOption}
          onChange={onChange}
          SelectedValueComponent={
            (restProps as DropdownProps<T>).SelectedValueComponent
          }
          SelectComponent={
            (restProps as DropdownProps<T>).SelectOptionsComponent
          }
        />
      );
    }
    return (
      <SfInput
        value={(restProps as InputProps<T>).value as string | number}
        wrapperClassName="text-black"
        type={type ?? "text"}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }, [type, restProps, onChange]);
  return (
    <label className={classNames("block py-2", className)}>
      <span className={classNames("text-sm font-medium", labelClassName)}>
        {title}
      </span>
      {input}
    </label>
  );
}
