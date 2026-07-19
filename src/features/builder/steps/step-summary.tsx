"use client";

import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function StepSummary({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  function enhance() {
    // Placeholder AI service
    const enhanced = value.trim()
      ? `${value.trim()}\n\nResults-driven professional with a proven record of delivering impact through collaboration, critical thinking, and continuous learning.`
      : "Results-driven professional with strong communication skills and a passion for excellence. Experienced in delivering measurable outcomes and collaborating across diverse teams.";
    onChange(enhanced.slice(0, 2000));
    toast.success("AI enhancement applied (demo)");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Professional Summary</h2>
          <p className="text-sm text-muted-foreground">A short pitch for your resume</p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={enhance}>
          <Sparkles className="h-3.5 w-3.5" />
          AI Enhance
        </Button>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          rows={8}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, 2000))}
          placeholder="Summarize your experience and strengths…"
        />
        <p className="text-right text-xs text-muted-foreground">{value.length}/2000</p>
      </div>
    </div>
  );
}
