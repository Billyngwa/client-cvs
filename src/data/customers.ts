export interface Experience {
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  graduated: string;
  details: string[];
}

export interface CustomerCV {
  slug: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  photo?: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  achievements: string[];
  additionalInfo: { label: string; value: string }[];
}

export const customers: CustomerCV[] = [
  {
    slug: "labaran-moki",
    name: "Labaran Opua Bekondo Moki",
    title: "Legal Educator & Consultant",
    email: "labaranmoki5@gmail.com",
    phone: "+237 654434760 / 679751567",
    address: "St. Joseph's College, Sasse, Cameroon",
    linkedin: "Labaran Moki",
    photo: "/photos/labaran-moki.png",
    summary:
      "I'm a passionate law graduate and experienced legal educator and consultant in International Law and Conflict Resolution. I have strong academic achievements and a deep commitment to growing in the legal field. My skills include research, data analysis, writing, critical thinking, and project management. I'm also great at working with diverse teams and improving community engagement. I'm proficient in Microsoft Office and SPSS, and I always strive for excellence with flexibility and adaptability.",
    experience: [
      {
        role: "Assistant Director",
        company: "The Struggle to Economize Future Environment (SEFE)",
        period: "2007 – Present",
        responsibilities: [
          "Coordinated community-based projects focused on environmental conservation and sustainable development",
          "Collaborated with local stakeholders, including community leaders, government officials, and NGOs",
          "Conducted environmental monitoring and data collection to inform project implementation",
          "Developed and implemented project work plans, budgets, and reports",
          "Built and maintained relationships with project partners and stakeholders",
        ],
      },
      {
        role: "Regional Branch Legal Coordinator and Communication Officer (CO)",
        company:
          "Association of Civil Societies for Sustainable Development (ACSSD), Cameroon",
        period: "2023 – Present",
        responsibilities: [
          "Develop and execute regional strategies in alignment with ACSSD's overall objectives",
          "Identify regional priorities and implement initiatives to address them",
          "Monitor progress and ensure the achievement of goals and targets within the region",
          "Oversee the implementation of programs, projects, or events in the region",
          "Ensure compliance with organizational policies and standards during program execution",
          "Support local chapters or member organizations with resources and guidance",
          "Serve as a primary contact point between the regional offices and the central leadership",
          "Represent ACSSD in regional forums, meetings, and events",
          "Build and maintain relationships with regional stakeholders, including local governments, NGOs, businesses, and community groups",
        ],
      },
    ],
    education: [
      {
        degree: "Master of Laws (LL.M.) in International Law (Conflict Resolution)",
        graduated: "09th January 2025",
        details: [
          "Faculty of Law and Political Sciences, University of Buea",
          "Department of English Law",
          'Dissertation: "The Role of the United Nations in the Resolution of the Armed Conflict in the Central African Republic since 2012."',
        ],
      },
      {
        degree: "Bachelor of Laws (LL.B.) Common Law",
        graduated: "September 2007",
        details: ["University of Yaoundé II, Soa, Yaoundé, Cameroon"],
      },
    ],
    achievements: [
      "Contributed to the reclaiming of about 73,000 hectares of land that would've affected 65 local communities in both Kupe Manenguba and Ndian Divisions (South West Region) Cameroon, from SG Sustainable Oils Cameroon Ltd. (SGSOC)/Herakles Farms (US Company) wanting to establish a Palm Oil project in a legal battle from 2012 that lasted until 2015 by SEFE's Director, Nasako Besingi",
      "Contributed to the development of a community-led conservation plan on mangrove at the creeks, which was adopted by the local authorities and the government. The latter later on created a Marine Reserved in Ndian Division",
    ],
    additionalInfo: [
      {
        label: "Research-Specific Skills",
        value:
          "Fieldwork and Data Collection, Grant Writing and Securing Funding, Qualitative and Quantitative Research Methods",
      },
      {
        label: "Soft Skills",
        value:
          "Communication (Verbal and Written), Collaboration and Teamwork, Leadership and Team Management",
      },
    ],
  },
];

export function getCustomerBySlug(slug: string): CustomerCV | undefined {
  return customers.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return customers.map((c) => c.slug);
}
