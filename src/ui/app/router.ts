import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { EntryPage } from "../pages/entry";
import { ResumePage } from "../pages/resume";
import { Root } from "./root";

const entryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: EntryPage,
});

const resumeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resume",
  component: ResumePage,
});

const coverLetterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/coverletter",
  component: ResumePage,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  component: ResumePage,
});

const rootRoute = createRootRoute({
  component: Root,
});

const routeTree = rootRoute.addChildren([
  entryRoute,
  resumeRoute,
  coverLetterRoute,
  portfolioRoute,
]);

export const router = createRouter({
  routeTree,
  history: createHashHistory(),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
