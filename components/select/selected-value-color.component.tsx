import classNames from "classnames";
import { SelectedValueComponentProps } from "./options-component.types";
import { SfIconExpandMore } from "@storefront-ui/react";

export default function SelectedValueColorComponent({
  selectedOption,
  selectTriggerRef,
  id,
  listboxId,
  isOpen,
  toggle,
  handleTriggerKeyDown,
}: SelectedValueComponentProps) {
  return (
    <div
      ref={selectTriggerRef}
      id={id}
      role="combobox"
      aria-controls={listboxId}
      aria-expanded={isOpen}
      aria-label="Select one option"
      aria-activedescendant={
        selectedOption ? `${listboxId}-${selectedOption.value}` : undefined
      }
      className={classNames(
        "w-fit mt-0.5 flex items-center gap-8 relative font-normal typography-text-base ring-1 ring-neutral-300 ring-inset rounded-md py-2 px-4 hover:ring-primary-700 active:ring-primary-700 active:ring-2 focus:ring-primary-700 focus:ring-2 focus-visible:outline focus-visible:outline-offset cursor-pointer bg-gray-500 text-black",
      )}
      tabIndex={0}
      onKeyDown={handleTriggerKeyDown}
      onClick={toggle}
    >
      <span
        className={classNames(
          "w-12 h-6 rounded",
          `bg-${selectedOption?.value}`,
        )}
      />
      <SfIconExpandMore
        className={classNames(
          "text-black transition-transform ease-in-out duration-300",
          {
            "rotate-180": isOpen,
          },
        )}
      />
    </div>
  );
}
