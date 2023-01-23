import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Loader } from "./";

export const AuthGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { loading, user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (router.pathname.includes("/auth/")) {
          router.push("/");
        }
      } else {
        if (!router.pathname.includes("/auth/")) {
          router.push("/auth/login");
        }
      }
    }
  }, [loading, user, router]);

  if (loading) return <Loader />;

  return <>{children}</>;
};
