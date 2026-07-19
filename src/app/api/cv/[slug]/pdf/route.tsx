import { renderToBuffer } from "@react-pdf/renderer";
import { CVPdfDocument } from "@/lib/CVPdfDocument";
import { getCustomerBySlug } from "@/data/customers";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const customer = getCustomerBySlug(slug);

  if (!customer) {
    return new Response("CV not found", { status: 404 });
  }

  const buffer = await renderToBuffer(
    <CVPdfDocument customer={customer} />
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${slug}-cv.pdf"`,
    },
  });
}
