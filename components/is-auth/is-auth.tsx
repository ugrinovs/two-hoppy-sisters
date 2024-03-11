"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/auth/is-authenticated";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth = isAuthenticated;

    useEffect(() => {
      if (!auth) {
        return redirect("/home");
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
