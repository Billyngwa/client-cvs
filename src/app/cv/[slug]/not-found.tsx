import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>CV Not Found</h1>
      <p>The customer CV you are looking for does not exist.</p>
      <Link href="/">Back to all CVs</Link>
    </main>
  );
}
