import { SfButton, SfIconRemove, SfIconAdd } from "@storefront-ui/react";

export default function QuantityChange({
  value,
  min,
  max,
  inputId,
  handleOnChange,
  inc,
  dec,
}: {
  value: number;
  min: number;
  max: number;
  inputId: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inc: () => void;
  dec: () => void;
}) {
  return (
    <div className="flex border border-primary-700 rounded-md">
      <SfButton
        variant="tertiary"
        square
        className="rounded-r-none px-1"
        disabled={value <= min}
        aria-controls={inputId}
        aria-label="Decrease value"
        onClick={() => dec()}
      >
        <SfIconRemove className="fill-primary-700" />
      </SfButton>
      <input
        id={inputId}
        type="number"
        role="spinbutton"
        className="appearance-none mx-1 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
        min={min}
        max={max}
        value={value.toString()}
        onChange={handleOnChange}
      />
      <SfButton
        variant="tertiary"
        square
        className="rounded-l-none"
        disabled={value >= max}
        aria-controls={inputId}
        aria-label="Increase value"
        onClick={() => inc()}
      >
        <SfIconAdd className="fill-primary-700" />
      </SfButton>
    </div>
  );
}
