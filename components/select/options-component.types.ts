export type SelectOption = {
  label: string | JSX.Element;
  value: string;
};
export type OptionsComponentProps = {
  listboxId: string;
  options: { label: string | JSX.Element; value: string }[];
  selectedOption: { label: string | JSX.Element; value: string } | undefined;
  selectOption: (option: {
    label: string | JSX.Element;
    value: string;
  }) => void;
  handleOptionItemKeyDown: (
    event: React.KeyboardEvent<HTMLLIElement>,
    option: { label: string | JSX.Element; value: string },
  ) => void;
  refs: {
    setFloating: (node: HTMLUListElement) => void;
  };
  isOpen: boolean;
  dropdownStyle: React.CSSProperties;
};

export type SelectedValueComponentProps = {
  selectTriggerRef: React.RefObject<HTMLDivElement>;
  id: string;
  listboxId: string;
  selectedOption: SelectOption;
  isOpen: boolean;
  toggle: () => void;
  handleTriggerKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};
