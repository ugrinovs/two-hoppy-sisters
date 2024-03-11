import { useId, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { SfModal, SfButton, SfIconClose } from "@storefront-ui/react";

export default function ProductModal({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const headingId = useId();
  const descriptionId = useId();
  const modalRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <CSSTransition
        in={isOpen}
        nodeRef={backdropRef}
        timeout={200}
        unmountOnExit
        classNames={{
          enter: "opacity-0",
          enterDone: "opacity-100 transition duration-200 ease-out",
          exitActive: "opacity-0 transition duration-200 ease-out",
        }}
      >
        <div
          ref={backdropRef}
          className="fixed inset-0 bg-neutral-700 bg-opacity-50"
        />
      </CSSTransition>

      {/* Modal */}
      <CSSTransition
        in={isOpen}
        nodeRef={modalRef}
        timeout={200}
        unmountOnExit
        classNames={{
          enter: "opacity-0 scale-0",
          enterDone: "opacity-100 transition duration-200 ease-out scale-100",
          exitActive: "opacity-0 transition duration-200 ease-out scale-0",
        }}
      >
        <SfModal
          open
          onClose={close}
          ref={modalRef}
          as="section"
          role="alertdialog"
          aria-labelledby={headingId}
          aria-describedby={descriptionId}
          className="max-w-[90%] md:max-w-lg left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-default border-secondary-700 p-6 shadow-2xl z-50"
        >
          <header>
            <SfButton
              square
              variant="tertiary"
              className="absolute right-2 top-2"
              onClick={close}
            >
              <SfIconClose />
            </SfButton>
            <h3
              id={headingId}
              className="font-bold typography-headline-4 md:typography-headline-3"
            >
              You might miss out on great deals
            </h3>
          </header>
          <p id={descriptionId} className="mt-2">
            There are special offers for some of the items on your wishlist. Do
            you want to see these deals before proceeding to checkout page?
          </p>
          <footer className="flex justify-end gap-4 mt-4">
            <SfButton variant="secondary" onClick={close}>
              Skip
            </SfButton>
            <SfButton onClick={close}>Yes!</SfButton>
          </footer>
        </SfModal>
      </CSSTransition>
    </>
  );
}
