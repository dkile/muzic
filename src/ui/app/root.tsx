import { Link, LinkProps, Outlet } from "@tanstack/react-router";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";
import { Columns2, SquareMenu } from "lucide-react";

import { Layout } from "./layout";
import { cn } from "../shared/cn";
import { Dots } from "../shared/dots";

function Root() {
  return <Layout sidebar={<Index />} page={<Outlet />} />;
}

function Index() {
  return (
    <NavSections>
      <NavSection
        navs={[
          { label: "이력서", to: "/resume", leftIcon: <SquareMenu height={14} /> },
          { label: "포트폴리오", to: "/portfolio", leftIcon: <Columns2 height={14} /> },
        ]}
      />
      <NavSection
        title="파이프라인"
        navs={[{ label: "공고 발견", to: "/", leftIcon: <Dots count={1} /> }]}
      />
    </NavSections>
  );
}

interface NavSectionsProps {
  children: ReactNode;
}

function NavSections({ children }: NavSectionsProps) {
  return (
    <LayoutGroup id="sidebar-nav">
      <div className="flex h-full min-h-0 flex-col">{children}</div>
    </LayoutGroup>
  );
}

interface NavSectionProps {
  navs: Array<{ to: LinkProps["to"]; label: string; leftIcon?: ReactNode; right?: ReactNode }>;
  title?: string;
}

function NavSection({ title, navs }: NavSectionProps) {
  return (
    <section className="flex flex-col gap-2 px-12 py-8">
      {title ? (
        <p className="h-24 px-10 text-[oklch(48%_0.018_252)] text-sm font-bold flex items-center">
          {title}
        </p>
      ) : null}
      <ul className="flex flex-col gap-2">
        {navs.map((nav) => (
          <li key={`${nav.to}-${nav.label}`}>
            <NavLink to={nav.to} className="flex items-center h-32 w-full px-2 text-sm font-medium">
              {nav.leftIcon ? (
                <span className="flex-[0_0_28px] inline-flex items-center justify-center text-[oklch(63%_0.022_252)] h-28 w-28">
                  {nav.leftIcon}
                </span>
              ) : null}
              <span className="flex-[1_1_0px] text-[oklch(30%_0.02_252)]">{nav.label}</span>
              {nav.right ? <span className="inline-block flex-[0_0_auto]">{nav.right}</span> : null}
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

interface NavLinkProps extends Omit<LinkProps, "children"> {
  className?: string;
  children: ReactNode;
}

function NavLink({ children, className, ...props }: NavLinkProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Link {...props} className={cn("group relative", className)}>
      {({ isActive }) => (
        <>
          {isActive ? (
            <motion.span
              className="absolute left-10 top-1/2 h-18 w-3 -translate-y-1/2 rounded-full bg-(--accent)"
              layoutId="sidebar-active-line"
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "tween", duration: 0.34, ease: [0.45, 0, 0.2, 1] }
              }
            />
          ) : null}
          <motion.span
            animate={{ transform: activeNavContentTransform(isActive) }}
            className="flex min-h-36 w-full items-center gap-6"
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    duration: 0.38,
                    bounce: 0.08,
                    delay: isActive ? 0 : 0.04,
                  }
            }
            whileHover={
              shouldReduceMotion ? undefined : { transform: "translateX(10px)" }
            }
          >
            {children}
          </motion.span>
        </>
      )}
    </Link>
  );
}

const activeNavContentTransform = (isActive: boolean) => {
  return isActive ? "translateX(10px)" : "translateX(0px)";
};

export { Root };
