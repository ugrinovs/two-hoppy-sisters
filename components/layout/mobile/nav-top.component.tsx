import {
  SfButton,
  SfIconShoppingCart,
  SfIconFavorite,
  SfIconPerson,
  SfIconExpandMore,
  SfIconMenu,
} from "@storefront-ui/react";

export default function NavbarTop() {
  const actionItems = [
    {
      icon: <SfIconShoppingCart className="fill-primary-700 md:w-10 md:h-10" />,
      label: "",
      ariaLabel: "Cart",
      role: "button",
    },
    {
      label: "Log in",
      icon: <SfIconPerson className="fill-primary-700 md:w-10 md:h-10" />,
      ariaLabel: "Log in",
      role: "login",
    },
  ];

  return (
    <header className="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 text-white border-0 bg-secondary-700 fixed z-10">
      <div className="flex flex-wrap lg:flex-nowrap items-center flex-row justify-start h-full max-w-[1536px] w-full">
        <a
          href="#"
          aria-label="SF Homepage"
          className="inline-block mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
        >
          <picture>
            <img
              src="/images/two-hoppy-sisters-logo.png"
              alt="Sf Logo"
              className="w-8 h-8  md:h-14 md:w-14 lg:w-[5.5rem] lg:h-[5.5rem]"
            />
          </picture>
        </a>
        <nav className="flex-1 flex justify-end order-last ml-4">
          <div className="flex flex-row flex-nowrap">
            {actionItems.map((actionItem) => (
              <SfButton
                key={actionItem.ariaLabel}
                className="mr-2 -ml-0.5 rounded-md text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900"
                aria-label={actionItem.ariaLabel}
                variant="tertiary"
                square
                slotPrefix={actionItem.icon}
              >
                {actionItem.role === "login" && (
                  <p className="hidden xl:inline-flex whitespace-nowrap">
                    {actionItem.label}
                  </p>
                )}
              </SfButton>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
