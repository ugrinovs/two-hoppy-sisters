import Image from "next/image";

export default function HeaderComponent({}) {
  return (
    <div className="w-full pt-12">
      <div
        className="bg-primary-700 flex place-items-center lg:h-96 md:h-64 sm:h-48 h-32 bg-center bg-cover bg-no-repeat "
        style={{ backgroundImage: "url(/images/header-1.jpeg)" }}
      ></div>
      <div className="bg-secondary-700 px-16 pb-16 relative 2xl:h-96 lg:h-48 md:h-32 sm:h-32 h-20">
        <Image
          src="/images/two-hoppy-sisters-header-3.png"
          alt="Sf Logo"
          width={400}
          height={400}
          className="2xl:w-1/4 xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-1/2 xs:w-2/3 w-9/12 h-auto object-cover px-16 mx-auto absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
        />
      </div>
    </div>
  );
}
