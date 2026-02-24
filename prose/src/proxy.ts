import { withAuth } from "next-auth/middleware";
import { PROSE_DEMO_MODE } from "@/lib/runtimeMode";

const publicRoutes = new Set([
  "/signin",
  "/register",
  "/wireframes",
  "/wireframes-native",
]);

export default withAuth({
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized: ({ token, req }) => {
      if (PROSE_DEMO_MODE) {
        return true;
      }

      const pathname = req.nextUrl.pathname;

      if (publicRoutes.has(pathname)) {
        return true;
      }

      if (pathname.startsWith("/wireframes/")) {
        return true;
      }

      return Boolean(token);
    },
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
