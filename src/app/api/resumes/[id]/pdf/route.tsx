import { renderToBuffer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import type { ResumeContent } from "@/types/resume";

export const runtime = "nodejs";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", lineHeight: 1.4 },
  name: { fontSize: 18, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  title: { fontSize: 11, color: "#555", marginBottom: 8 },
  contact: { fontSize: 9, color: "#666", marginBottom: 14 },
  section: { marginBottom: 12 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 6,
    paddingBottom: 2,
    textTransform: "uppercase",
  },
  jobHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  bold: { fontFamily: "Helvetica-Bold" },
  muted: { color: "#666", fontSize: 9 },
  body: { marginBottom: 4 },
});

function PdfDoc({ content }: { content: ResumeContent }) {
  const p = content.personal;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{p.fullName || "Untitled"}</Text>
        {p.jobTitle ? <Text style={styles.title}>{p.jobTitle}</Text> : null}
        <Text style={styles.contact}>
          {[p.email, p.phone, [p.city, p.country].filter(Boolean).join(", "), p.linkedin]
            .filter(Boolean)
            .join(" · ")}
        </Text>

        {content.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text>{content.summary}</Text>
          </View>
        ) : null}

        {content.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {content.experience.map((job) => (
              <View key={job.id} style={{ marginBottom: 8 }}>
                <View style={styles.jobHeader}>
                  <Text style={styles.bold}>
                    {job.position}
                    {job.company ? `, ${job.company}` : ""}
                  </Text>
                  <Text style={styles.muted}>
                    {job.startDate} – {job.currentlyWorking ? "Present" : job.endDate}
                  </Text>
                </View>
                {job.responsibilities ? (
                  <Text style={styles.body}>{job.responsibilities}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {content.education.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {content.education.map((ed) => (
              <View key={ed.id} style={{ marginBottom: 6 }}>
                <Text style={styles.bold}>
                  {ed.degree}
                  {ed.field ? ` in ${ed.field}` : ""}
                </Text>
                <Text style={styles.muted}>
                  {ed.school} · {ed.startDate} – {ed.endDate}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {content.skills.some((c) => c.skills.length) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {content.skills
              .filter((c) => c.skills.length)
              .map((c) => (
                <Text key={c.id} style={styles.body}>
                  <Text style={styles.bold}>{c.name}: </Text>
                  {c.skills.map((s) => s.name).join(", ")}
                </Text>
              ))}
          </View>
        ) : null}

        {content.projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {content.projects.map((pr) => (
              <View key={pr.id} style={{ marginBottom: 6 }}>
                <Text style={styles.bold}>{pr.name}</Text>
                <Text>{pr.description}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {content.additional ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional</Text>
            <Text>{content.additional}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: RouteParams) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) {
    return new Response("Not found", { status: 404 });
  }

  const content = (data.content || {}) as ResumeContent;
  const buffer = await renderToBuffer(<PdfDoc content={content} />);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${(data.title || "resume").replace(/[^\w.-]+/g, "_")}.pdf"`,
    },
  });
}
