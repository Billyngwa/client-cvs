"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { createId } from "@/lib/resume-defaults";
import type { SkillCategory, SkillLevel } from "@/types/resume";

export function StepSkills({
  value,
  onChange,
}: {
  value: SkillCategory[];
  onChange: (v: SkillCategory[]) => void;
}) {
  function addCategory() {
    onChange([...value, { id: createId(), name: "New category", skills: [] }]);
  }

  function addSkill(categoryId: string) {
    onChange(
      value.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              skills: [...c.skills, { id: createId(), name: "", level: "intermediate" }],
            }
          : c
      )
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Skills</h2>
          <p className="text-sm text-muted-foreground">Group skills by category</p>
        </div>
        <Button type="button" size="sm" onClick={addCategory}>
          <Plus className="h-3.5 w-3.5" /> Category
        </Button>
      </div>
      {value.map((cat) => (
        <div key={cat.id} className="space-y-3 rounded-lg border p-4">
          <div className="flex gap-2">
            <Input
              value={cat.name}
              onChange={(e) =>
                onChange(
                  value.map((c) => (c.id === cat.id ? { ...c, name: e.target.value } : c))
                )
              }
              placeholder="Category name"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => onChange(value.filter((c) => c.id !== cat.id))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          {cat.skills.map((skill) => (
            <div key={skill.id} className="grid grid-cols-[1fr_140px_auto] gap-2">
              <Input
                value={skill.name}
                placeholder="Skill"
                onChange={(e) =>
                  onChange(
                    value.map((c) =>
                      c.id === cat.id
                        ? {
                            ...c,
                            skills: c.skills.map((s) =>
                              s.id === skill.id ? { ...s, name: e.target.value } : s
                            ),
                          }
                        : c
                    )
                  )
                }
              />
              <Select
                value={skill.level}
                onChange={(e) =>
                  onChange(
                    value.map((c) =>
                      c.id === cat.id
                        ? {
                            ...c,
                            skills: c.skills.map((s) =>
                              s.id === skill.id
                                ? { ...s, level: e.target.value as SkillLevel }
                                : s
                            ),
                          }
                        : c
                    )
                  )
                }
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </Select>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() =>
                  onChange(
                    value.map((c) =>
                      c.id === cat.id
                        ? { ...c, skills: c.skills.filter((s) => s.id !== skill.id) }
                        : c
                    )
                  )
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" size="sm" variant="outline" onClick={() => addSkill(cat.id)}>
            <Plus className="h-3.5 w-3.5" /> Skill
          </Button>
        </div>
      ))}
    </div>
  );
}
