"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createId } from "@/lib/resume-defaults";
import type { EducationEntry } from "@/types/resume";

export function StepEducation({
  value,
  onChange,
}: {
  value: EducationEntry[];
  onChange: (v: EducationEntry[]) => void;
}) {
  function add() {
    onChange([
      ...value,
      {
        id: createId(),
        school: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: "",
        description: "",
      },
    ]);
  }

  function update(id: string, patch: Partial<EducationEntry>) {
    onChange(value.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }

  function remove(id: string) {
    onChange(value.filter((e) => e.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Education</h2>
          <p className="text-sm text-muted-foreground">Schools and degrees</p>
        </div>
        <Button type="button" size="sm" onClick={add}>
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>
      {value.length === 0 && (
        <p className="text-sm text-muted-foreground">No education entries yet.</p>
      )}
      {value.map((entry) => (
        <div key={entry.id} className="space-y-3 rounded-lg border p-4">
          <div className="flex justify-end">
            <Button type="button" size="icon" variant="ghost" onClick={() => remove(entry.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["school", "School"],
                ["degree", "Degree"],
                ["field", "Field of study"],
                ["gpa", "GPA"],
                ["startDate", "Start date"],
                ["endDate", "End date"],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="space-y-1">
                <Label>{label}</Label>
                <Input
                  type={key.includes("Date") ? "month" : "text"}
                  value={entry[key]}
                  onChange={(e) => update(entry.id, { [key]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea
              value={entry.description}
              onChange={(e) => update(entry.id, { description: e.target.value })}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
