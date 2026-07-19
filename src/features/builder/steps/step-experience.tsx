"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createId } from "@/lib/resume-defaults";
import type { ExperienceEntry } from "@/types/resume";

function SortableJob({
  entry,
  onUpdate,
  onRemove,
}: {
  entry: ExperienceEntry;
  onUpdate: (id: string, patch: Partial<ExperienceEntry>) => void;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: entry.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="space-y-3 rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="cursor-grab text-muted-foreground"
          aria-label="Drag to reorder"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5" />
        </button>
        <Button type="button" size="icon" variant="ghost" onClick={() => onRemove(entry.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label>Company</Label>
          <Input
            value={entry.company}
            onChange={(e) => onUpdate(entry.id, { company: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label>Position</Label>
          <Input
            value={entry.position}
            onChange={(e) => onUpdate(entry.id, { position: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label>Employment type</Label>
          <Select
            value={entry.employmentType}
            onChange={(e) =>
              onUpdate(entry.id, {
                employmentType: e.target.value as ExperienceEntry["employmentType"],
              })
            }
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
          </Select>
        </div>
        <div className="flex items-end gap-2 pb-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={entry.currentlyWorking}
              onChange={(e) =>
                onUpdate(entry.id, { currentlyWorking: e.target.checked })
              }
            />
            Currently working
          </label>
        </div>
        <div className="space-y-1">
          <Label>Start date</Label>
          <Input
            type="month"
            value={entry.startDate}
            onChange={(e) => onUpdate(entry.id, { startDate: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label>End date</Label>
          <Input
            type="month"
            value={entry.endDate}
            disabled={entry.currentlyWorking}
            onChange={(e) => onUpdate(entry.id, { endDate: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label>Responsibilities</Label>
        <Textarea
          value={entry.responsibilities}
          onChange={(e) => onUpdate(entry.id, { responsibilities: e.target.value })}
          placeholder="One bullet per line"
        />
      </div>
      <div className="space-y-1">
        <Label>Achievements</Label>
        <Textarea
          value={entry.achievements}
          onChange={(e) => onUpdate(entry.id, { achievements: e.target.value })}
        />
      </div>
    </div>
  );
}

export function StepExperience({
  value,
  onChange,
}: {
  value: ExperienceEntry[];
  onChange: (v: ExperienceEntry[]) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function add() {
    onChange([
      ...value,
      {
        id: createId(),
        company: "",
        position: "",
        employmentType: "full-time",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        responsibilities: "",
        achievements: "",
      },
    ]);
  }

  function update(id: string, patch: Partial<ExperienceEntry>) {
    onChange(value.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = value.findIndex((i) => i.id === active.id);
    const newIndex = value.findIndex((i) => i.id === over.id);
    onChange(arrayMove(value, oldIndex, newIndex));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Work Experience</h2>
          <p className="text-sm text-muted-foreground">Drag to reorder</p>
        </div>
        <Button type="button" size="sm" onClick={add}>
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={value.map((v) => v.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {value.map((entry) => (
              <SortableJob
                key={entry.id}
                entry={entry}
                onUpdate={update}
                onRemove={(id) => onChange(value.filter((e) => e.id !== id))}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
