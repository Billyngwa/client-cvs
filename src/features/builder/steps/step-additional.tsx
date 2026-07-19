"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function StepAdditional({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Additional Information</h2>
        <p className="text-sm text-muted-foreground">
          Interests, volunteering, publications, or anything else
        </p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="additional">Details</Label>
        <Textarea
          id="additional"
          rows={10}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
