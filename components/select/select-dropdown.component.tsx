import { useId, useRef, useState, type KeyboardEvent } from "react";
import classNames from "classnames";
import {
  SfIconExpandMore,
  SfListItem,
  useDisclosure,
  useDropdown,
  SfIconCheck,
  useTrapFocus,
  InitialFocusType,
} from "@storefront-ui/react";
import {
  OptionsComponentProps,
  SelectOption,
  SelectedValueComponentProps,
} from "./options-component.types";
import { offset } from "@floating-ui/react";

const DefaultSelectedValueComponent = ({
  selectTriggerRef,
  id,
  listboxId,
  selectedOption,
  isOpen,
  toggle,
  handleTriggerKeyDown,
}: SelectedValueComponentProps) => {
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
      className="mt-0.5 flex items-center gap-8 relative font-normal typography-text-base ring-1 ring-neutral-300 ring-inset rounded-md py-2 px-4 hover:ring-primary-700 active:ring-primary-700 active:ring-2 focus:ring-primary-700 focus:ring-2 focus-visible:outline focus-visible:outline-offset cursor-pointer bg-white text-black"
      tabIndex={0}
      onKeyDown={handleTriggerKeyDown}
      onClick={toggle}
    >
      {selectedOption ? (
        selectedOption.label
      ) : (
        <span className="text-neutral-500">Choose from the list</span>
      )}
      <SfIconExpandMore
        className={classNames(
          "ml-auto text-neutral-500 transition-transform ease-in-out duration-300",
          {
            "rotate-180": isOpen,
          },
        )}
      />
    </div>
  );
};

const DefaultOptionsComponent = ({
  listboxId,
  options,
  selectedOption,
  selectOption,
  handleOptionItemKeyDown,
  refs,
  isOpen,
  dropdownStyle,
}: OptionsComponentProps) => {
  return (
    <ul
      id={listboxId}
      ref={refs.setFloating}
      role="listbox"
      aria-label="Select one option"
      className={classNames(
        "w-full py-2 rounded-md shadow-md border border-neutral-100 bg-default-main  z-10",
        {
          hidden: !isOpen,
        },
      )}
      style={dropdownStyle}
    >
      {options.map((option) => (
        <SfListItem
          id={`${listboxId}-${option.value}`}
          key={option.value}
          role="option"
          tabIndex={0}
          aria-selected={option.value === selectedOption?.value}
          className={classNames("block dark:hover:text-black", {
            "font-medium": option.value === selectedOption?.value,
          })}
          onClick={() => selectOption(option)}
          onKeyDown={(event) => handleOptionItemKeyDown(event, option)}
          slotSuffix={
            option.value === selectedOption?.value && (
              <SfIconCheck className="text-primary-700" />
            )
          }
        >
          {option.label}
        </SfListItem>
      ))}
    </ul>
  );
};

export default function SelectDropdownComponent({
  options = [],
  className,
  selectedOption: selectedOptionProp,
  onChange,
  SelectedValueComponent,
  SelectComponent,
}: {
  options?: SelectOption[];
  className?: string;
  selectedOption?: SelectOption;
  onChange: (value: string) => void;
  SelectedValueComponent?: React.FC<SelectedValueComponentProps>;
  SelectComponent?: React.FC<OptionsComponentProps>;
}) {
  const { close, toggle, isOpen } = useDisclosure({ initialValue: false });
  const [selectedOption, setSelectedOption] = useState<SelectOption>(
    selectedOptionProp ?? options[0],
  );
  const id = useId();
  const listboxId = useId();
  const selectTriggerRef = useRef<HTMLDivElement>(null);

  const { refs, style: dropdownStyle } = useDropdown({
    isOpen,
    onClose: close,
    placement: "bottom-start",
    middleware: [offset(8)],
  });

  useTrapFocus(refs.floating, {
    arrowKeysUpDown: true,
    activeState: isOpen,
    initialFocus: InitialFocusType.autofocus,
    initialFocusContainerFallback: true,
  });

  const selectOption = (option: SelectOption) => {
    setSelectedOption(option);
    onChange(option.value);
    close();
    selectTriggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " ") toggle();
  };

  const handleOptionItemKeyDown = (
    event: KeyboardEvent<HTMLLIElement>,
    option: SelectOption,
  ) => {
    if (event.key === " " || event.key === "Enter") selectOption(option);
  };

  return (
    <>
      <div
        ref={refs.setReference}
        className={classNames("relative", className)}
      >
        {SelectedValueComponent ? (
          <SelectedValueComponent
            selectTriggerRef={selectTriggerRef}
            id={id}
            listboxId={listboxId}
            selectedOption={selectedOption}
            isOpen={isOpen}
            toggle={toggle}
            handleTriggerKeyDown={handleTriggerKeyDown}
          />
        ) : (
          <DefaultSelectedValueComponent
            selectTriggerRef={selectTriggerRef}
            id={id}
            listboxId={listboxId}
            selectedOption={selectedOption}
            isOpen={isOpen}
            toggle={toggle}
            handleTriggerKeyDown={handleTriggerKeyDown}
          />
        )}
        {SelectComponent ? (
          <SelectComponent
            listboxId={listboxId}
            options={options}
            selectedOption={selectedOption}
            selectOption={selectOption}
            handleOptionItemKeyDown={handleOptionItemKeyDown}
            refs={refs}
            isOpen={isOpen}
            dropdownStyle={dropdownStyle}
          />
        ) : (
          <DefaultOptionsComponent
            listboxId={listboxId}
            options={options}
            selectedOption={selectedOption}
            selectOption={selectOption}
            handleOptionItemKeyDown={handleOptionItemKeyDown}
            refs={refs}
            isOpen={isOpen}
            dropdownStyle={dropdownStyle}
          />
        )}
      </div>
    </>
  );
}
