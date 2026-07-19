import Link from "next/link";
import { ArrowRight, FileText, Sparkles, Wand2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <FileText className="h-5 w-5 text-primary" />
          CVForge
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className={cn(buttonVariants({ variant: "ghost" }))}>
            Log in
          </Link>
          <Link href="/signup" className={cn(buttonVariants())}>
            Get started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-16">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Modern resume builder with live preview
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Craft a resume that gets you hired
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Multi-step builder, 8 professional templates, autosave, and PDF export —
            all in one clean workspace.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className={cn(buttonVariants({ size: "lg" }))}>
              Create your resume
            </Link>
            <Link
              href="/login"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              I already have an account
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Wand2,
              title: "Guided builder",
              body: "Personal info through references with validation at every step.",
            },
            {
              icon: FileText,
              title: "8 templates",
              body: "Switch Modern, ATS, Elegant, Dark, and more in real time.",
            },
            {
              icon: Sparkles,
              title: "Export ready",
              body: "Download polished PDFs that keep your formatting intact.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border bg-card p-5 shadow-sm">
              <item.icon className="mb-3 h-5 w-5 text-primary" />
              <h2 className="font-semibold">{item.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
