"use client";

import { useState } from "react";

interface DownloadPDFButtonProps {
  slug: string;
  filename: string;
}

export function DownloadPDFButton({ slug, filename }: DownloadPDFButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/cv/${slug}/pdf`);

      if (!response.ok) {
        throw new Error("PDF generation failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError("Failed to download PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="download-pdf">
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className="download-pdf-btn"
      >
        {loading ? "Generating…" : "Download PDF"}
      </button>
      {error && <p className="download-pdf-error">{error}</p>}
    </div>
  );
}
