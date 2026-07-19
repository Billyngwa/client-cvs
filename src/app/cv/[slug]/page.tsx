import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CV } from "@/components/CV";
import { DownloadPDFButton } from "@/components/DownloadPDFButton";
import { getAllSlugs, getCustomerBySlug } from "@/data/customers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const customer = getCustomerBySlug(slug);
  if (!customer) return { title: "CV Not Found" };
  return { title: `${customer.name} – CV` };
}

export default async function CVPage({ params }: PageProps) {
  const { slug } = await params;
  const customer = getCustomerBySlug(slug);

  if (!customer) {
    notFound();
  }

  return (
    <main>
      <nav className="cv-nav">
        <Link href="/">← All CVs</Link>
        <DownloadPDFButton
          slug={customer.slug}
          filename={`${customer.slug}-cv.pdf`}
        />
      </nav>
      <CV customer={customer} />
    </main>
  );
}
