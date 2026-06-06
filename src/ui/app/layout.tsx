import { getCurrentWindow } from "@tauri-apps/api/window";
import { PointerEvent, ReactNode } from "react";
import { Group, Panel } from "react-resizable-panels";

interface Props {
  page: ReactNode;
  sidebar: ReactNode;
}

function Layout({ sidebar, page }: Props) {
  const handleDragWindow = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }

    void getCurrentWindow().startDragging();
  };

  return (
    <div className="h-dvh h-vh flex overflow-hidden bg-[oklch(100%_0_0/0%)]">
      <div
        className="pointer-events-auto fixed inset-x-0 top-0 z-100 h-48"
        data-tauri-drag-region
        onPointerDown={handleDragWindow}
      />
      <Group>
        <Panel
          defaultSize="25%"
          minSize="200px"
          maxSize="50%"
          groupResizeBehavior="preserve-pixel-size"
        >
          <nav className="relative z-50 h-full w-full shrink-0 grow-0 overflow-hidden border-r border-[oklch(91%_0.007_240/50%)] bg-[oklch(98%_0.006_235/47%)] pt-64 shadow-[inset_0_1px_0_oklch(100%_0_0/54%),inset_-1px_0_0_oklch(100%_0_0/28%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,oklch(100%_0_0/36%),oklch(100%_0_0/12%)_46%,oklch(93%_0.025_146/16%)),radial-gradient(circle_at_24px_80px,oklch(100%_0_0/30%),oklch(100%_0_0/0%)_220px)] before:content-['']">
            <div className="relative h-full">{sidebar}</div>
          </nav>
        </Panel>
        <Panel defaultSize="75%" minSize="50%" groupResizeBehavior="preserve-relative-size">
          <div className="flex h-full w-full grow-0 flex-col overflow-hidden rounded-r-[18px] border-y border-r border-[oklch(97%_0.004_245)] bg-[oklch(100%_0_0)]">
            {page}
          </div>
        </Panel>
      </Group>
    </div>
  );
}

export { Layout };
