import { ProductKind } from "@/types/category.types";

export default [
  { name: "IPA - New England", type: "beerType" },
  { name: "Talus", type: "hop" },
  { name: "Strata", type: "hop" },
  { name: "Galaxy", type: "hop" },
  { name: "Fruity", type: "flavor" },
  { name: "Dukat", type: "color", color: "gold" }, // gold
  { name: "Dark Lager", type: "beerType" },
  { name: "Dark", type: "color", color: "#2A0100" },
  { name: "Pale Ale - American", type: "beerType" },
  { name: "Citrus", type: "flavor" },
  { name: "Gold", type: "color", color: "gold" },
] as ProductKind[];
