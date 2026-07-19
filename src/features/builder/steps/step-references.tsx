"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createId } from "@/lib/resume-defaults";
import type { ReferenceEntry } from "@/types/resume";

export function StepReferences({
  value,
  onChange,
}: {
  value: ReferenceEntry[];
  onChange: (v: ReferenceEntry[]) => void;
}) {
  function add() {
    onChange([
      ...value,
      { id: createId(), name: "", title: "", company: "", email: "", phone: "" },
    ]);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">References</h2>
          <p className="text-sm text-muted-foreground">Optional professional references</p>
        </div>
        <Button type="button" size="sm" onClick={add}>
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>
      {value.map((r) => (
        <div key={r.id} className="space-y-3 rounded-lg border p-4">
          <div className="flex justify-end">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => onChange(value.filter((x) => x.id !== r.id))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["name", "Name"],
                ["title", "Title"],
                ["company", "Company"],
                ["email", "Email"],
                ["phone", "Phone"],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="space-y-1">
                <Label>{label}</Label>
                <Input
                  value={r[key]}
                  onChange={(e) =>
                    onChange(
                      value.map((x) =>
                        x.id === r.id ? { ...x, [key]: e.target.value } : x
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
