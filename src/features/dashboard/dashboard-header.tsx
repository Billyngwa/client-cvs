"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, LogOut, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function DashboardHeader({ email }: { email?: string }) {
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("Signed out");
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <FileText className="h-5 w-5 text-primary" />
          CVForge
        </Link>
        <div className="flex items-center gap-2">
          {email && (
            <span className="hidden text-sm text-muted-foreground sm:inline">{email}</span>
          )}
          <ThemeToggle />
          <Link href="/dashboard" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            My Resumes
          </Link>
          <Button type="button" variant="ghost" size="icon" aria-label="Log out" onClick={logout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

export function CreateResumeButton() {
  const router = useRouter();

  async function create() {
    try {
      const { createResume } = await import("@/services/resumes");
      const resume = await createResume();
      toast.success("Resume created");
      router.push(`/builder/${resume.id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create resume");
    }
  }

  return (
    <Button type="button" onClick={create}>
      <Plus className="h-4 w-4" />
      Create New Resume
    </Button>
  );
}
