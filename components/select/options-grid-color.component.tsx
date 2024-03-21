import { SfIconCheck } from "@storefront-ui/react";
import classNames from "classnames";
import { OptionsComponentProps } from "./options-component.types";
import SfListItem from "../overrides/SfListItem/SfListItem";

export default function OptionsGridColorComponent({
  listboxId,
  options,
  selectedOption,
  selectOption,
  handleOptionItemKeyDown,
  refs,
  isOpen,
  dropdownStyle,
}: OptionsComponentProps) {
  return (
    <ul
      id={listboxId}
      ref={refs.setFloating}
      role="listbox"
      aria-label="Select one option"
      className={classNames(
        "py-2 rounded-md shadow-md border border-neutral-100 bg-default-main z-10 grid grid-cols-10 w-max",
        {
          hidden: !isOpen,
        },
      )}
      style={dropdownStyle}
    >
      {options.map((option) => {
        return (
          <SfListItem
            id={`${listboxId}-${option.value}`}
            key={option.value}
            role="option"
            tabIndex={0}
            aria-selected={option.value === selectedOption?.value}
            className={classNames(
              "block !w-12 h-8 !p-0 m-1 rounded hover:ring-2 hover:ring-primary-700",
              `bg-${option?.value}`,
              `hover:bg-${option?.value} active:bg-${option?.value}`,
              {
                "font-medium": option.value === selectedOption?.value,
              },
            )}
            onClick={() => selectOption(option)}
            onKeyDown={(event) => handleOptionItemKeyDown(event, option)}
            slotSuffix={
              option.value === selectedOption?.value && (
                <SfIconCheck className="text-primary-700" />
              )
            }
          ></SfListItem>
        );
      })}
    </ul>
  );
}
