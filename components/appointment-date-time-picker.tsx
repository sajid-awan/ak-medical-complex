"use client";

import { format, startOfToday } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/components/ui/utils";

const TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let hour = 8; hour <= 22; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 22 && minute === 30) break;
      const period = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;
      slots.push(`${hour12}:${minute.toString().padStart(2, "0")} ${period}`);
    }
  }
  return slots;
})();

function formatCombined(date?: Date, time?: string) {
  if (!date && !time) return "";
  const datePart = date ? format(date, "dd/MM/yyyy") : "";
  if (datePart && time) return `${datePart}, ${time}`;
  return datePart || time || "";
}

function parseCombined(value?: string) {
  if (!value) return { date: undefined as Date | undefined, time: "" };

  const commaIndex = value.indexOf(", ");
  const datePart = commaIndex === -1 ? value : value.slice(0, commaIndex);
  const timePart = commaIndex === -1 ? "" : value.slice(commaIndex + 2);

  let date: Date | undefined;
  const [day, month, year] = datePart.split("/").map(Number);
  if (day && month && year) {
    date = new Date(year, month - 1, day);
  }

  return { date, time: timePart };
}

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export function AppointmentDateTimePicker({ value = "", onChange }: Props) {
  const { date, time } = parseCombined(value);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            id="appt-date"
            className={cn(
              "h-9 w-full justify-start border-input bg-input-background px-3 text-left font-normal hover:bg-input-background hover:text-foreground",
              date ? "text-foreground" : "text-muted-foreground hover:text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 size-4 shrink-0" />
            <span className="truncate text-left">
              {date ? format(date, "dd/MM/yyyy") : "Pick a date"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(nextDate) => onChange(formatCombined(nextDate, time))}
            disabled={(day) => day < startOfToday()}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Select
        value={time || undefined}
        onValueChange={(nextTime) => onChange(formatCombined(date, nextTime))}
      >
        <SelectTrigger
          id="appt-time"
          className="w-full justify-start text-left [&_[data-slot=select-value]]:flex-1 [&_[data-slot=select-value]]:justify-start [&_[data-slot=select-value]]:text-left [&_svg:last-child]:ml-auto"
          aria-label="Select time"
        >
          <Clock className="size-4 shrink-0 text-muted-foreground" />
          <SelectValue placeholder="Pick a time" />
        </SelectTrigger>
        <SelectContent>
          {TIME_SLOTS.map((slot) => (
            <SelectItem key={slot} value={slot}>
              {slot}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
