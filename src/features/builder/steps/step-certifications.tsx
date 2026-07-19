"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createId } from "@/lib/resume-defaults";
import type { CertificationEntry } from "@/types/resume";

export function StepCertifications({
  value,
  onChange,
}: {
  value: CertificationEntry[];
  onChange: (v: CertificationEntry[]) => void;
}) {
  function add() {
    onChange([
      ...value,
      {
        id: createId(),
        name: "",
        issuer: "",
        date: "",
        credentialId: "",
        verificationUrl: "",
      },
    ]);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Certifications</h2>
          <p className="text-sm text-muted-foreground">Licenses and credentials</p>
        </div>
        <Button type="button" size="sm" onClick={add}>
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>
      {value.map((c) => (
        <div key={c.id} className="space-y-3 rounded-lg border p-4">
          <div className="flex justify-end">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => onChange(value.filter((x) => x.id !== c.id))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["name", "Name", "text"],
                ["issuer", "Issuer", "text"],
                ["date", "Date", "month"],
                ["credentialId", "Credential ID", "text"],
                ["verificationUrl", "Verification URL", "url"],
              ] as const
            ).map(([key, label, type]) => (
              <div key={key} className="space-y-1">
                <Label>{label}</Label>
                <Input
                  type={type}
                  value={c[key]}
                  onChange={(e) =>
                    onChange(
                      value.map((x) =>
                        x.id === c.id ? { ...x, [key]: e.target.value } : x
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
