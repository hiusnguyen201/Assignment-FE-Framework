import { format as dateFnsFormat } from "date-fns";

export function capitalizeFirstLetter(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatDate(
  date: Date,
  format: string = "MMM d, yyyy"
): string {
  return dateFnsFormat(date, format);
}
