import { cn } from "./cn";

interface DotsProps {
  className?: string;
  count: 1 | 2 | 3 | 4;
}

function Dots({ className, count }: DotsProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("grid size-14 place-items-center", dotGridClassNames[count], className)}
    >
      {Array.from({ length: count }, (_, index) => (
        <span key={index} className="size-4 rounded-full bg-current" />
      ))}
    </span>
  );
}

const dotGridClassNames = {
  1: "grid-cols-1 grid-rows-1",
  2: "grid-cols-1 grid-rows-2 gap-1",
  3: "grid-cols-2 grid-rows-2 gap-y-1 [&>span:first-child]:col-span-2",
  4: "grid-cols-2 grid-rows-2 gap-1",
} as const;

export { Dots };
