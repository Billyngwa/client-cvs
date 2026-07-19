"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { createId } from "@/lib/resume-defaults";
import type { LanguageEntry, LanguageProficiency } from "@/types/resume";

export function StepLanguages({
  value,
  onChange,
}: {
  value: LanguageEntry[];
  onChange: (v: LanguageEntry[]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Languages</h2>
          <p className="text-sm text-muted-foreground">Language proficiency</p>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() =>
            onChange([
              ...value,
              { id: createId(), language: "", proficiency: "intermediate" },
            ])
          }
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>
      {value.map((lang) => (
        <div key={lang.id} className="grid grid-cols-[1fr_160px_auto] gap-2">
          <div className="space-y-1">
            <Label className="sr-only">Language</Label>
            <Input
              placeholder="Language"
              value={lang.language}
              onChange={(e) =>
                onChange(
                  value.map((l) =>
                    l.id === lang.id ? { ...l, language: e.target.value } : l
                  )
                )
              }
            />
          </div>
          <Select
            value={lang.proficiency}
            onChange={(e) =>
              onChange(
                value.map((l) =>
                  l.id === lang.id
                    ? { ...l, proficiency: e.target.value as LanguageProficiency }
                    : l
                )
              )
            }
          >
            <option value="native">Native</option>
            <option value="fluent">Fluent</option>
            <option value="professional">Professional</option>
            <option value="intermediate">Intermediate</option>
            <option value="beginner">Beginner</option>
          </Select>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => onChange(value.filter((l) => l.id !== lang.id))}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
