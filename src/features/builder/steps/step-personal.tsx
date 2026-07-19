"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadProfilePhoto } from "@/services/resumes";
import type { PersonalInfo } from "@/types/resume";

export function StepPersonal({
  value,
  userId,
  onChange,
}: {
  value: PersonalInfo;
  userId: string;
  onChange: (v: PersonalInfo) => void;
}) {
  const [uploading, setUploading] = useState(false);

  function set<K extends keyof PersonalInfo>(key: K, v: PersonalInfo[K]) {
    onChange({ ...value, [key]: v });
  }

  async function onPhoto(file?: File | null) {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadProfilePhoto(userId, file);
      set("photoUrl", url);
      toast.success("Photo uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed — check Storage bucket");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <p className="text-sm text-muted-foreground">How recruiters will reach you</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {(
          [
            ["fullName", "Full name", "text"],
            ["jobTitle", "Job title", "text"],
            ["email", "Email", "email"],
            ["phone", "Phone", "tel"],
            ["address", "Address", "text"],
            ["city", "City", "text"],
            ["country", "Country", "text"],
            ["website", "Website", "url"],
            ["linkedin", "LinkedIn", "text"],
            ["github", "GitHub", "text"],
            ["portfolio", "Portfolio", "url"],
          ] as const
        ).map(([key, label, type]) => (
          <div key={key} className="space-y-1.5">
            <Label htmlFor={key}>{label}</Label>
            <Input
              id={key}
              type={type}
              value={value[key]}
              onChange={(e) => set(key, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="photo">Profile picture</Label>
        <Input
          id="photo"
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={(e) => void onPhoto(e.target.files?.[0])}
        />
        {value.photoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value.photoUrl}
            alt="Profile"
            className="mt-2 h-20 w-20 rounded-md object-cover object-top"
          />
        )}
        {uploading && <p className="text-xs text-muted-foreground">Uploading…</p>}
      </div>
    </div>
  );
}
