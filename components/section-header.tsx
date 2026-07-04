import { cn } from "@/components/ui/utils";
import { FadeUp } from "@/components/motion-fade";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  variant?: "light" | "dark";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  variant = "light",
  className,
}: Props) {
  const isDark = variant === "dark";
  return (
    <FadeUp className={cn("mb-12", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-8 bg-primary" />
        <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
          {eyebrow}
        </span>
      </div>
      <h2
        className={cn(
          "text-3xl lg:text-4xl font-black",
          isDark ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-sm leading-relaxed max-w-lg",
            isDark ? "text-white/40" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </FadeUp>
  );
}
