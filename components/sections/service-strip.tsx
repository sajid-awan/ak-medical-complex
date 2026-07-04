import { serviceStrip } from "@/lib/site-data";

function ServiceItems({ prefix }: { prefix: string }) {
  return (
    <>
      {serviceStrip.map((item) => (
        <span
          key={`${prefix}-${item}`}
          className="flex shrink-0 items-center gap-3"
        >
          <span className="h-1 w-1 rounded-full bg-white/40" />
          {item}
        </span>
      ))}
    </>
  );
}

export function ServiceStrip() {
  return (
    <div
      className="overflow-hidden bg-primary py-3.5 text-white"
      aria-label="Hospital services"
    >
      <div className="flex w-max animate-marquee motion-reduce:hidden">
        <div className="flex items-center gap-10 px-8 text-xs font-bold tracking-widest uppercase">
          <ServiceItems prefix="a" />
        </div>
        <div
          className="flex items-center gap-10 px-8 text-xs font-bold tracking-widest uppercase"
          aria-hidden
        >
          <ServiceItems prefix="b" />
        </div>
      </div>

      <div className="hidden items-center justify-center gap-10 px-8 text-xs font-bold tracking-widest uppercase motion-reduce:flex">
        <ServiceItems prefix="static" />
      </div>
    </div>
  );
}
