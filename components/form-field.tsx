import { cn } from "@/components/ui/utils";
import { Label } from "@/components/ui/label";

export const LABEL_CLASSES =
  "text-xs font-bold text-foreground/70 uppercase tracking-wide";

type Props = {
  label: string;
  htmlFor?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

export function FormField({
  label,
  htmlFor,
  error,
  className,
  children,
}: Props) {
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={htmlFor} className={LABEL_CLASSES}>
        {label}
      </Label>
      {children}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-destructive text-xs font-medium"
        >
          {error}
        </p>
      )}
    </div>
  );
}
