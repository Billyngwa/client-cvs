import fs from "fs";
import path from "path";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { CustomerCV } from "@/data/customers";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Times-Roman",
    fontSize: 10,
    lineHeight: 1.4,
    color: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 16,
  },
  photo: {
    width: 80,
    height: 100,
    objectFit: "contain",
    objectPosition: "top",
  },
  headerContent: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  contact: {
    fontSize: 9,
    marginBottom: 2,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingBottom: 3,
    marginBottom: 6,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  jobTitle: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    flex: 1,
    paddingRight: 8,
  },
  period: {
    fontSize: 9,
    color: "#444444",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 8,
  },
  bulletPoint: {
    width: 8,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
  },
  additional: {
    fontSize: 9,
    marginBottom: 4,
  },
  job: {
    marginBottom: 10,
  },
});

function getPhotoSrc(photo?: string): string | null {
  if (!photo) return null;
  const photoPath = path.join(process.cwd(), "public", photo.replace(/^\//, ""));
  if (!fs.existsSync(photoPath)) return null;
  const data = fs.readFileSync(photoPath);

  let mime = "png";
  if (data[0] === 0xff && data[1] === 0xd8) {
    mime = "jpeg";
  } else if (data[0] === 0x89 && data[1] === 0x50) {
    mime = "png";
  }

  return `data:image/${mime};base64,${data.toString("base64")}`;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <View key={item} style={styles.bullet}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </>
  );
}

export function CVPdfDocument({ customer }: { customer: CustomerCV }) {
  const photoSrc = getPhotoSrc(customer.photo);

  return (
    <Document title={`${customer.name} – CV`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {photoSrc && <Image src={photoSrc} style={styles.photo} />}
          <View style={styles.headerContent}>
            <Text style={styles.name}>{customer.name}</Text>
            <Text style={styles.contact}>
              <Text style={{ fontFamily: "Times-Bold" }}>Address: </Text>
              {customer.address}
            </Text>
            <Text style={styles.contact}>
              <Text style={{ fontFamily: "Times-Bold" }}>Phone: </Text>
              {customer.phone}
            </Text>
            <Text style={styles.contact}>
              <Text style={{ fontFamily: "Times-Bold" }}>Email: </Text>
              {customer.email}
            </Text>
            {customer.linkedin && (
              <Text style={styles.contact}>
                <Text style={{ fontFamily: "Times-Bold" }}>LinkedIn: </Text>
                {customer.linkedin}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text>{customer.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {customer.experience.map((job) => (
            <View key={`${job.company}-${job.role}`} style={styles.job}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobTitle}>
                  {job.role}, {job.company}
                </Text>
                <Text style={styles.period}>{job.period}</Text>
              </View>
              <Bullets items={job.responsibilities} />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {customer.education.map((entry) => (
            <View key={entry.degree} style={styles.job}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobTitle}>{entry.degree}</Text>
                <Text style={styles.period}>Graduated: {entry.graduated}</Text>
              </View>
              <Bullets items={entry.details} />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <Bullets items={customer.achievements} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          {customer.additionalInfo.map((item) => (
            <Text key={item.label} style={styles.additional}>
              <Text style={{ fontFamily: "Times-Bold" }}>{item.label}: </Text>
              {item.value}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
