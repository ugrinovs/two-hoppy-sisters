import categories from "@/mock/categories";

export async function GET() {
  const data = categories;
  return Response.json(data).json();
}
