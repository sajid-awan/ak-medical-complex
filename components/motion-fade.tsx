"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/components/ui/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
};

function useReveal(once: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin: "-60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return { ref, visible };
}

function Reveal({
  y,
  delay = 0,
  duration = 0.6,
  once = true,
  className,
  style,
  children,
  ...rest
}: Required<Pick<Props, "y">> & Props) {
  const { ref, visible } = useReveal(once);
  return (
    <div
      ref={ref}
      className={cn(
        "will-change-[opacity,transform] motion-reduce:transition-none",
        className,
      )}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function FadeUp({ y = 24, ...rest }: Props) {
  return <Reveal y={y} {...rest} />;
}

export function FadeIn({ y = 0, ...rest }: Props) {
  return <Reveal y={y} {...rest} />;
}
