"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { updateResume } from "@/services/resumes";
import type { ResumeContent, SaveStatus, TemplateId } from "@/types/resume";

export function useAutosave(
  resumeId: string,
  content: ResumeContent,
  title: string,
  templateId: TemplateId,
  enabled = true
) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const first = useRef(true);
  const lastError = useRef<string | null>(null);

  const save = useCallback(async () => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setStatus("offline");
      return;
    }
    setStatus("saving");
    try {
      await updateResume(resumeId, {
        content,
        title,
        template_id: templateId,
      });
      setStatus("saved");
      lastError.current = null;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Save failed";
      setStatus("error");
      if (lastError.current !== message) {
        lastError.current = message;
        toast.error(`Could not save: ${message}`);
      }
    }
  }, [resumeId, content, title, templateId]);

  useEffect(() => {
    if (!enabled) return;
    if (first.current) {
      first.current = false;
      return;
    }
    setStatus("unsaved");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      void save();
    }, 1200);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [content, title, templateId, enabled, save]);

  useEffect(() => {
    const onOffline = () => setStatus("offline");
    const onOnline = () => setStatus("unsaved");
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  return { status, saveNow: save };
}
