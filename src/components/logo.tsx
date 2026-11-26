import { cn } from "@/lib/utils";

// A wax/notary seal — a ribboned circular stamp with a quill "V" cut
// through the center — a legal-filing mark distinct from Loyal's
// courthouse pictogram, Homelon2's roofline-over-sofa, Auxida's mark, and
// Montero's water-droplet checkmark.
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-8 w-auto text-primary", className)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Consultoradmin seal</title>
      <circle cx="50" cy="42" r="34" fill="currentColor" />
      <circle
        cx="50"
        cy="42"
        r="34"
        stroke="hsl(var(--background))"
        strokeWidth="2"
        strokeDasharray="4 5"
      />
      <path
        d="M34 30l16 24 16-24"
        stroke="hsl(var(--background))"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M30 70l8 22 12-14 12 14 8-22" fill="currentColor" />
    </svg>
  );
}
