"use client";

import { useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import {
  CV_ACCEPT,
  CV_MAX_BYTES,
  isAllowedCvFile,
} from "@/lib/schemas";

type Props = {
  id?: string;
  value?: File;
  onChange: (file: File | undefined) => void;
  "aria-invalid"?: boolean;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function CvUploadDropzone({
  id,
  value,
  onChange,
  "aria-invalid": invalid,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  function validate(file: File): string | null {
    if (!isAllowedCvFile(file)) return "Upload a PDF, DOC, or DOCX file";
    if (file.size > CV_MAX_BYTES) return "File must be under 5MB";
    return null;
  }

  function handleFile(file: File | undefined) {
    if (!file) {
      onChange(undefined);
      setLocalError(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const error = validate(file);
    if (error) {
      setLocalError(error);
      return;
    }

    setLocalError(null);
    onChange(file);
  }

  function onDragOver(event: React.DragEvent) {
    event.preventDefault();
    setDragging(true);
  }

  function onDrop(event: React.DragEvent) {
    event.preventDefault();
    setDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  }

  if (value) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-md border border-input bg-input-background px-3 py-2.5",
          invalid && "border-destructive",
        )}
        aria-invalid={invalid}
      >
        <FileText className="size-4 shrink-0 text-primary" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{value.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(value.size)}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 shrink-0"
          aria-label="Remove CV"
          onClick={() => handleFile(undefined)}
        >
          <X className="size-4" />
        </Button>
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={CV_ACCEPT}
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={onDragOver}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed px-4 py-8 text-center transition-colors",
          "border-input bg-input-background hover:border-primary/50 hover:bg-primary/5",
          dragging && "border-primary bg-primary/5",
          invalid && "border-destructive",
        )}
        aria-invalid={invalid}
      >
        <Upload className="size-6 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Drop your CV here or click to browse</p>
          <p className="mt-1 text-xs text-muted-foreground">
            PDF, DOC, DOCX · Max 5MB
          </p>
        </div>
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={CV_ACCEPT}
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </div>
      {localError && (
        <p role="alert" className="text-destructive text-xs font-medium">
          {localError}
        </p>
      )}
    </div>
  );
}
