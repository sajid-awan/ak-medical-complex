import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  body: string;
  actionLabel: string;
  onReset: () => void;
};

export function SuccessPanel({ title, body, actionLabel, onReset }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="p-8 flex flex-col items-center text-center gap-3"
    >
      <CheckCircle2 size={40} className="text-primary" />
      <h4 className="font-black text-lg">{title}</h4>
      <p className="text-muted-foreground text-sm">{body}</p>
      <Button
        variant="link"
        onClick={onReset}
        className="mt-2 text-primary text-sm font-bold px-0"
      >
        {actionLabel}
      </Button>
    </div>
  );
}
