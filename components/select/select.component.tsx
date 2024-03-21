import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  useCallback,
  useMemo,
} from "react";
import classNames from "classnames";
import {
  SfIconExpandMore,
  SfListItem,
  useDisclosure,
  useDropdown,
  SfIconCheck,
  useTrapFocus,
  InitialFocusType,
  SfChip,
  SfInput,
} from "@storefront-ui/react";

type SelectOption = {
  label: string;
  value: string;
  [key: string]: any;
};

export default function MultiSelect({
  options = [],
  selectedOptions = [],
  handleSearch,
}: {
  options?: SelectOption[];
  selectedOptions?: SelectOption[];
  handleSearch?: (value: string) => SelectOption[];
}) {
  const { close, toggle, isOpen } = useDisclosure({ initialValue: false });
  const [searchOption, setSearchOption] = useState<SelectOption[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] =
    useState<SelectOption[]>(selectedOptions);
  const allOptions = useMemo(() => {
    return searchOption.length ? searchOption : options;
  }, [options, searchOption]);
  const id = useId();
  const listboxId = useId();
  const selectTriggerRef = useRef<HTMLDivElement>(null);

  const { refs, style: dropdownStyle } = useDropdown({
    isOpen,
    onClose: close,
    placement: "bottom",
    middleware: [],
  });

  useTrapFocus(refs.floating, {
    arrowKeysUpDown: true,
    activeState: isOpen,
    initialFocus: InitialFocusType.autofocus,
    initialFocusContainerFallback: true,
  });

  const selectOption = (option: SelectOption) => {
    setSelectedOption((prev) => [...prev, option]);
    close();
    selectTriggerRef.current?.focus();
  };

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (handleSearch) {
      const result = handleSearch(event.target.value);
      if (result) {
        setSearchOption(result);
      }
    }
  };

  const isSelected = useCallback(
    (option: SelectOption) =>
      !!selectedOption.find((selected) => selected.value === option.value),
    [selectedOption],
  );

  const handleOptionItemKeyDown = (
    event: KeyboardEvent<HTMLLIElement>,
    option: SelectOption,
  ) => {
    if (event.key === " " || event.key === "Enter") selectOption(option);
  };

  return (
    <div className=" lg:ml-8 py-2 lg:py-0">
      <label className="font-medium typography-label-sm" htmlFor={id}>
        Kateogrije
      </label>
      <div ref={refs.setReference} className="relative ">
        <div
          ref={selectTriggerRef}
          id={id}
          role="combobox"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-label="Select one option"
          className={classNames(
            "mt-0.5 flex items-center gap-8 relative font-normal typography-text-base ring-1 ring-neutral-300 ring-inset rounded-md py-2 px-4 hover:ring-primary-700 active:ring-primary-700 active:ring-2 focus:ring-primary-700 focus:ring-2 focus-visible:outline focus-visible:outline-offset cursor-pointer bg-white",
            {
              "ring-primary-700": isOpen,
            },
          )}
          tabIndex={0}
          onClick={toggle}
        >
          <div>
            {isOpen && (
              <SfInput
                className="bg-white shadow-none"
                wrapperClassName="mb-2 !bg-white !outline-none  ring-0 focus-within:ring-0 active:ring-0"
                autoFocus
                value={searchValue}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={handleOnSearch}
              />
            )}
            {selectedOption.length ? (
              selectedOption.map((option) => (
                <SfChip
                  size="sm"
                  className="mr-1 mb-1 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-800 transition-colors ease-in-out duration-300 !ring-slate-700"
                  key={option.value}
                  inputProps={{ disabled: true }}
                >
                  {option.label}
                </SfChip>
              ))
            ) : (
              <span className="text-neutral-500">Choose from the list</span>
            )}
          </div>
          <SfIconExpandMore
            className={classNames(
              "ml-auto text-neutral-500 transition-transform ease-in-out duration-300",
              {
                "rotate-180": isOpen,
              },
            )}
          />
        </div>
        <ul
          id={listboxId}
          ref={refs.setFloating}
          role="listbox"
          aria-label="Select one option"
          className={classNames(
            "w-full py-2 rounded-md shadow-md border border-neutral-100 bg-default-main z-10",
            {
              hidden: !isOpen,
            },
          )}
          style={dropdownStyle}
        >
          {allOptions.map((option) => (
            <SfListItem
              id={`${listboxId}-${option.value}`}
              key={option.value}
              role="option"
              tabIndex={0}
              aria-selected={isSelected(option) ? true : false}
              className={classNames("block", {
                "font-medium": isSelected(option),
                "text-neutral-500 bg-neutral-900": isSelected(option),
              })}
              disabled={isSelected(option)}
              onClick={() => selectOption(option)}
              onKeyDown={(event) => handleOptionItemKeyDown(event, option)}
              slotSuffix={
                isSelected(option) && (
                  <SfIconCheck className="text-primary-700" />
                )
              }
            >
              {option.label}
            </SfListItem>
          ))}
        </ul>
      </div>
    </div>
  );
}
