// synthetic-data.js
// Synthetic demo profiles for the Lusha chatbot.
// Provides 10 person profiles and 10 matching company profiles with fuzzy lookup.

const people = [
  {
    name: "Sarah Chen",
    title: "VP of Engineering",
    company: "TechCorp",
    email: "sarah.chen@techcorp.io",
    phone: "+1 (415) 555-0142",
    linkedin: "linkedin.com/in/sarachen",
    location: "San Francisco, CA",
    seniority: "VP",
    department: "Engineering",
  },
  {
    name: "Marcus Johnson",
    title: "Chief Revenue Officer",
    company: "DataStream",
    email: "marcus.johnson@datastream.com",
    phone: "+1 (212) 555-0198",
    linkedin: "linkedin.com/in/marcusjohnson",
    location: "New York, NY",
    seniority: "C-Suite",
    department: "Revenue",
  },
  {
    name: "Emily Rodriguez",
    title: "Director of Marketing",
    company: "CloudScale",
    email: "emily.rodriguez@cloudscale.io",
    phone: "+1 (512) 555-0167",
    linkedin: "linkedin.com/in/emilyrodriguez",
    location: "Austin, TX",
    seniority: "Director",
    department: "Marketing",
  },
  {
    name: "James Mitchell",
    title: "Head of Sales",
    company: "FinEdge",
    email: "james.mitchell@finedge.com",
    phone: "+1 (312) 555-0134",
    linkedin: "linkedin.com/in/jamesmitchell",
    location: "Chicago, IL",
    seniority: "VP",
    department: "Sales",
  },
  {
    name: "Priya Sharma",
    title: "Product Manager",
    company: "NovaTech AI",
    email: "priya.sharma@novatech.ai",
    phone: "+1 (650) 555-0189",
    linkedin: "linkedin.com/in/priyasharma",
    location: "Palo Alto, CA",
    seniority: "Manager",
    department: "Product",
  },
  {
    name: "David Kim",
    title: "Chief Technology Officer",
    company: "GreenWave",
    email: "david.kim@greenwave.co",
    phone: "+1 (206) 555-0156",
    linkedin: "linkedin.com/in/davidkim",
    location: "Seattle, WA",
    seniority: "C-Suite",
    department: "Engineering",
  },
  {
    name: "Lisa Thompson",
    title: "VP of Customer Success",
    company: "RetailPulse",
    email: "lisa.thompson@retailpulse.com",
    phone: "+1 (617) 555-0123",
    linkedin: "linkedin.com/in/lisathompson",
    location: "Boston, MA",
    seniority: "VP",
    department: "Customer Success",
  },
  {
    name: "Ahmed Hassan",
    title: "Director of Business Development",
    company: "CyberShield",
    email: "ahmed.hassan@cybershield.io",
    phone: "+1 (703) 555-0178",
    linkedin: "linkedin.com/in/ahmedhassan",
    location: "Washington, DC",
    seniority: "Director",
    department: "Business Development",
  },
  {
    name: "Rachel Foster",
    title: "Senior Account Executive",
    company: "MedTech Solutions",
    email: "rachel.foster@medtech.com",
    phone: "+1 (858) 555-0145",
    linkedin: "linkedin.com/in/rachelfoster",
    location: "San Diego, CA",
    seniority: "Senior",
    department: "Sales",
  },
  {
    name: "Tom Bradley",
    title: "CEO & Co-Founder",
    company: "SwiftLogistics",
    email: "tom.bradley@swiftlogistics.io",
    phone: "+1 (404) 555-0112",
    linkedin: "linkedin.com/in/tombradley",
    location: "Atlanta, GA",
    seniority: "C-Suite",
    department: "Executive",
  },
];

const companies = [
  {
    name: "TechCorp",
    industry: "Enterprise Software",
    size: "501-1000",
    revenue: "$50M-$100M",
    founded: 2015,
    hq: "San Francisco, CA",
    website: "techcorp.io",
    techStack: ["AWS", "React", "Python", "Kubernetes", "Snowflake"],
    funding: "Series C — $85M",
    intentSignals: ["Hiring engineers", "Evaluating CI/CD tools"],
  },
  {
    name: "DataStream",
    industry: "Data Analytics",
    size: "1001-5000",
    revenue: "$100M-$250M",
    founded: 2012,
    hq: "New York, NY",
    website: "datastream.com",
    techStack: ["GCP", "Spark", "Kafka", "Tableau", "dbt"],
    funding: "Series D — $140M",
    intentSignals: ["Expanding EMEA office", "Researching data governance"],
  },
  {
    name: "CloudScale",
    industry: "Cloud Infrastructure",
    size: "201-500",
    revenue: "$20M-$50M",
    founded: 2018,
    hq: "Austin, TX",
    website: "cloudscale.io",
    techStack: ["Azure", "Terraform", "Go", "Prometheus", "Grafana"],
    funding: "Series B — $42M",
    intentSignals: ["Launching new product line", "Hiring marketing team"],
  },
  {
    name: "FinEdge",
    industry: "FinTech",
    size: "201-500",
    revenue: "$20M-$50M",
    founded: 2017,
    hq: "Chicago, IL",
    website: "finedge.com",
    techStack: ["AWS", "Java", "PostgreSQL", "Redis", "Stripe"],
    funding: "Series B — $55M",
    intentSignals: ["SOC 2 certification in progress", "Evaluating sales tools"],
  },
  {
    name: "NovaTech AI",
    industry: "Artificial Intelligence",
    size: "51-200",
    revenue: "$5M-$20M",
    founded: 2020,
    hq: "Palo Alto, CA",
    website: "novatech.ai",
    techStack: ["AWS", "PyTorch", "FastAPI", "MongoDB", "Hugging Face"],
    funding: "Series A — $18M",
    intentSignals: ["Rapid headcount growth", "Exploring enterprise sales motion"],
  },
  {
    name: "GreenWave",
    industry: "CleanTech / Energy",
    size: "201-500",
    revenue: "$20M-$50M",
    founded: 2016,
    hq: "Seattle, WA",
    website: "greenwave.co",
    techStack: ["Azure", "Python", "IoT Hub", "Time Series Insights", "React"],
    funding: "Series C — $70M",
    intentSignals: ["Government contract wins", "Hiring data scientists"],
  },
  {
    name: "RetailPulse",
    industry: "Retail Tech",
    size: "501-1000",
    revenue: "$50M-$100M",
    founded: 2014,
    hq: "Boston, MA",
    website: "retailpulse.com",
    techStack: ["AWS", "Node.js", "Elasticsearch", "Segment", "Looker"],
    funding: "Series C — $90M",
    intentSignals: ["Expanding to APAC", "Evaluating CDP platforms"],
  },
  {
    name: "CyberShield",
    industry: "Cybersecurity",
    size: "201-500",
    revenue: "$20M-$50M",
    founded: 2019,
    hq: "Washington, DC",
    website: "cybershield.io",
    techStack: ["AWS", "Rust", "Kafka", "Elastic SIEM", "Terraform"],
    funding: "Series B — $38M",
    intentSignals: ["FedRAMP authorization pending", "Hiring sales reps"],
  },
  {
    name: "MedTech Solutions",
    industry: "HealthTech",
    size: "1001-5000",
    revenue: "$100M-$250M",
    founded: 2010,
    hq: "San Diego, CA",
    website: "medtech.com",
    techStack: ["Azure", "C#", ".NET", "SQL Server", "Power BI"],
    funding: "Series E — $200M",
    intentSignals: ["HIPAA re-certification", "Exploring AI diagnostics"],
  },
  {
    name: "SwiftLogistics",
    industry: "Supply Chain / Logistics",
    size: "51-200",
    revenue: "$5M-$20M",
    founded: 2021,
    hq: "Atlanta, GA",
    website: "swiftlogistics.io",
    techStack: ["GCP", "Python", "Flutter", "BigQuery", "Mapbox"],
    funding: "Series A — $12M",
    intentSignals: ["Raised new round", "Hiring first sales team"],
  },
];

/**
 * Fuzzy substring match for person lookup.
 * Searches across name, email, company, and title fields.
 */
function lookupPerson(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return people.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.company.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q)
    );
  });
}

/**
 * Fuzzy substring match for company lookup.
 * Searches across name, industry, website, and tech stack.
 */
function lookupCompany(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return companies.filter((c) => {
    return (
      c.name.toLowerCase().includes(q) ||
      c.industry.toLowerCase().includes(q) ||
      c.website.toLowerCase().includes(q) ||
      c.techStack.some((t) => t.toLowerCase().includes(q))
    );
  });
}

module.exports = { people, companies, lookupPerson, lookupCompany };
