import { redirect } from "next/navigation";
import { isAuthenticated } from "@/auth/is-authenticated";

export default function Index({}) {
  const isAuth = isAuthenticated;

  if (!isAuth) {
    redirect("/home");
  }
  return redirect("/admin");
}
