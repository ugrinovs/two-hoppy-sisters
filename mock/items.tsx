import { Product } from "@/types/product.types";

const items = [
  {
    id: 1,
    name: "Firstborn",
    image: require("../assets/firstborn.jpeg"),
    price: "200",
    onSalePrice: "180",
    description:
      "Predstavljamo Vam FIRSTBORN. New England IPA koja osvaja svojom zahmeljenoscu, pitkosti i vodi Vas na suncane plaze Pacifika. Stvara slozenost u jednostavnosti. Talus, Strata i Galaxy hmeljevi, kao smeo karakter za raskos ukusa i dozivljaja koje Vas nece ostaviti ravnodusnim. Krojen po meri, boje dukata i strastvenih reskih vocnih ukusa.",
    kind: [
      { name: "IPA - New England", type: "beerType" },
      { name: "Talus", type: "hop" },
      { name: "Strata", type: "hop" },
      { name: "Galaxy", type: "hop" },
      { name: "Fruity", type: "flavor" },
      { name: "Dukat", type: "color", color: "gold" }, // gold
    ],
  },
  {
    id: 2,
    name: "Helen's Dark Lager",
    image: require("../assets/helens-dark-lager.jpeg"),
    price: "200",
    description: `
### Helen’s Dark & Easy
In the depths of a brewery’s heart,
A beer is born, a tale to start.
Dark lager, rich and bold,
A symphony for the senses to hold.

Malted grains, roasted and brown,
Aromas rise, a scent unbound.
Hops and yeast, a dance so fine,
A flavor profile, so divine.

Carbonation, a gentle kiss,
Bubbles rise, a lively bliss.
Serve it cold, let it flow,
Helen’s dark & easy, a story to know.`,
    kind: [
      { name: "Dark Lager", type: "beerType" },
      { name: "Dark", type: "color", color: "#2A0100" },
    ],
  },
  {
    id: 3,
    name: "Citratonic",
    image: require("../assets/two-hoppy-sisters.jpeg"),
    price: "180",
    description: `Two Hoppy Sisters, dve muze božanske, dva izvora inspiracije koncipirali su Pale Ale Citratonic u slikovito umetničko delo. Kreiran je šarmantni eliksir odmerene okrepljujuće gorčine, savršeno izbalansiranih delikatnih aroma i voćnih ukusa vedrog karaktera i stimulativne pitkosti. Citratonic je poput sipanja osmeha u vas život. Svi veruju u nešto, mi verujemo u drugo pivo nakon prvog. Flašica, limenka ili točeno? Odluka je na vama.`,
    kind: [
      { name: "Pale Ale - American", type: "beerType" },
      { name: "Citrus", type: "flavor" },
      { name: "Gold", type: "color", color: "gold" },
    ],
  },
  {
    id: 4,
    name: "Three Hoppy Sisters",
    image: require("../assets/three-hoppy-sisters.jpeg"),
    price: "230",
    description: `Smela i do sad zapravo neviđena kod nas, ova Triple Neipa satkana je od obilja ječma, pšenice i hmelja. Kremasta, balansirane gorčine sa mrvicom kiselkastih nota, Three hoppy sisters biće vam definitivno dobro društvo nakon napornog dana i dnevnih obaveza.`,
  },
] as Product[];
export default items;
