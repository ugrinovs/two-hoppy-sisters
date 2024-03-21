import items from "@/mock/items";

export function GET() {
  const data = items;
  return Response.json(data).json();
}
