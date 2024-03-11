import Image from "next/image";

// 7
const portfolioImages: Array<keyof typeof colSpanMap> = [
  "portfolio-2.jpeg",
  "portfolio-3.jpeg",
  "portfolio-5.jpeg",
  "portfolio-4.jpeg",
  "portfolio-6.jpeg",
  "portfolio-1.jpeg",
  "portfolio-7.jpeg",
  "portfolio-8.jpeg",
].map((image) => `/images/portfolio/${image}` as keyof typeof colSpanMap);

const colSpanMap = {
  "/images/portfolio/portfolio-1.jpeg": 1,
  "/images/portfolio/portfolio-2.jpeg": 1,
  "/images/portfolio/portfolio-3.jpeg": 2,
  "/images/portfolio/portfolio-4.jpeg": 1,
  "/images/portfolio/portfolio-5.jpeg": 2,
  "/images/portfolio/portfolio-6.jpeg": 2,
  "/images/portfolio/portfolio-7.jpeg": 2,
  "/images/portfolio/portfolio-8.jpeg": 1,
};
export default function HeaderGalleryComponent() {
  return (
    <div className="grid grid-cols-6">
      {portfolioImages.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt="portfolio"
          width={300}
          height={300}
          className={`object-cover w-full h-full col-span-${colSpanMap[image]} row-span-${colSpanMap[image]}`}
        />
      ))}
    </div>
  );
}
