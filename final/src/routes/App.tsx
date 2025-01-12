import { lazy, Suspense } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";

const Footer = lazy(() => import("../ui/footer/Footer"));
const Nav = lazy(() => import("../ui/nav/Nav"));
const TanStackRouterDevtools = lazy(() =>
  import("@tanstack/router-devtools").then((module) => ({
    default: module.TanStackRouterDevtools,
  }))
);

export const Route = createRootRoute({
  component: App,
});

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Nav />
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
    </Suspense>
  );
}

export default App;
