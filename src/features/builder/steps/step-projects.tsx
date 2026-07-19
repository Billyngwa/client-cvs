"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createId } from "@/lib/resume-defaults";
import type { ProjectEntry } from "@/types/resume";

export function StepProjects({
  value,
  onChange,
}: {
  value: ProjectEntry[];
  onChange: (v: ProjectEntry[]) => void;
}) {
  function add() {
    onChange([
      ...value,
      {
        id: createId(),
        name: "",
        description: "",
        technologies: "",
        githubUrl: "",
        liveUrl: "",
      },
    ]);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="text-sm text-muted-foreground">Portfolio work</p>
        </div>
        <Button type="button" size="sm" onClick={add}>
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>
      {value.map((p) => (
        <div key={p.id} className="space-y-3 rounded-lg border p-4">
          <div className="flex justify-end">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => onChange(value.filter((x) => x.id !== p.id))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <Label>Name</Label>
              <Input
                value={p.name}
                onChange={(e) =>
                  onChange(value.map((x) => (x.id === p.id ? { ...x, name: e.target.value } : x)))
                }
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label>Description</Label>
              <Textarea
                value={p.description}
                onChange={(e) =>
                  onChange(
                    value.map((x) =>
                      x.id === p.id ? { ...x, description: e.target.value } : x
                    )
                  )
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Technologies</Label>
              <Input
                value={p.technologies}
                onChange={(e) =>
                  onChange(
                    value.map((x) =>
                      x.id === p.id ? { ...x, technologies: e.target.value } : x
                    )
                  )
                }
              />
            </div>
            <div className="space-y-1">
              <Label>GitHub URL</Label>
              <Input
                value={p.githubUrl}
                onChange={(e) =>
                  onChange(
                    value.map((x) =>
                      x.id === p.id ? { ...x, githubUrl: e.target.value } : x
                    )
                  )
                }
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label>Live URL</Label>
              <Input
                value={p.liveUrl}
                onChange={(e) =>
                  onChange(
                    value.map((x) =>
                      x.id === p.id ? { ...x, liveUrl: e.target.value } : x
                    )
                  )
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
