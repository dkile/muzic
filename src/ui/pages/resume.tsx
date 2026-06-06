function ResumePage() {
  return (
    <main className="relative flex h-full flex-col overflow-hidden">
      <header className="relative z-20 flex h-56 shrink-0 items-center bg-transparent px-12">
        <h1 className="inline-flex h-32 items-center rounded-full bg-[oklch(100%_0_0/72%)] px-16 text-15 font-medium tracking-none text-[oklch(22%_0.018_255)] shadow-[inset_0_1px_0_oklch(100%_0_0/70%)] transition-shadow duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:shadow-[inset_0_1px_0_oklch(100%_0_0/78%),inset_0_-1px_0_oklch(87%_0.006_245/36%),0_6px_12px_-8px_oklch(32%_0.016_250/16%)]">
          이력서
        </h1>
      </header>
      <div className="flex-[1_1_0px] px-16">
        <article className="mx-auto max-w-720 w-full h-full"></article>
      </div>
    </main>
  );
}

export { ResumePage };
