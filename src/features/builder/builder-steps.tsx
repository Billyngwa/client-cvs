"use client";

import { cn } from "@/lib/utils";
import { BUILDER_STEPS, type BuilderStepId } from "@/types/resume";

export function BuilderSteps({
  current,
  onChange,
}: {
  current: BuilderStepId;
  onChange: (id: BuilderStepId) => void;
}) {
  return (
    <nav
      aria-label="Resume builder steps"
      className="overflow-x-auto border-b bg-muted/40 px-2 py-2"
    >
      <ol className="flex min-w-max gap-1">
        {BUILDER_STEPS.map((step, i) => {
          const active = step.id === current;
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => onChange(step.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-left text-xs transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="font-medium">
                  {i + 1}. {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
