// code-snippets.js
// API code generation templates for the Lusha chatbot.
// Generates curl, Python, and Node.js examples for 6 endpoint types.

const endpoints = {
  personLookup: {
    label: "Person Lookup",
    curl: `curl -X POST https://api.lusha.com/v2/person/lookup \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "Sarah",
    "lastName": "Chen",
    "company": "TechCorp"
  }'`,
    python: `import requests

url = "https://api.lusha.com/v2/person/lookup"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "firstName": "Sarah",
    "lastName": "Chen",
    "company": "TechCorp"
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()

print(f"Name: {data['fullName']}")
print(f"Email: {data['emails'][0]['email']}")
print(f"Phone: {data['phones'][0]['phone']}")`,
    node: `const https = require("https");

const payload = JSON.stringify({
  firstName: "Sarah",
  lastName: "Chen",
  company: "TechCorp",
});

const options = {
  hostname: "api.lusha.com",
  path: "/v2/person/lookup",
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
    "Content-Length": payload.length,
  },
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    const result = JSON.parse(data);
    console.log("Name:", result.fullName);
    console.log("Email:", result.emails[0].email);
  });
});

req.write(payload);
req.end();`,
  },

  companyLookup: {
    label: "Company Lookup",
    curl: `curl -X GET "https://api.lusha.com/v2/company/lookup?domain=techcorp.io" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    python: `import requests

url = "https://api.lusha.com/v2/company/lookup"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {"domain": "techcorp.io"}

response = requests.get(url, params=params, headers=headers)
company = response.json()

print(f"Company: {company['name']}")
print(f"Industry: {company['industry']}")
print(f"Size: {company['employeeCount']} employees")
print(f"Revenue: {company['revenue']}")`,
    node: `const https = require("https");

const options = {
  hostname: "api.lusha.com",
  path: "/v2/company/lookup?domain=techcorp.io",
  method: "GET",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
  },
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    const company = JSON.parse(data);
    console.log("Company:", company.name);
    console.log("Industry:", company.industry);
    console.log("Size:", company.employeeCount);
  });
});

req.end();`,
  },

  contactSearch: {
    label: "Contact Search (Prospecting)",
    curl: `curl -X POST https://api.lusha.com/v2/contacts/search \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "filters": {
      "jobTitle": ["VP of Engineering", "CTO"],
      "companySize": ["201-500", "501-1000"],
      "industry": ["SaaS", "Enterprise Software"],
      "location": "United States"
    },
    "limit": 25
  }'`,
    python: `import requests

url = "https://api.lusha.com/v2/contacts/search"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "filters": {
        "jobTitle": ["VP of Engineering", "CTO"],
        "companySize": ["201-500", "501-1000"],
        "industry": ["SaaS", "Enterprise Software"],
        "location": "United States"
    },
    "limit": 25
}

response = requests.post(url, json=payload, headers=headers)
results = response.json()

for contact in results["contacts"]:
    print(f"{contact['fullName']} - {contact['title']} at {contact['company']}")`,
    node: `const https = require("https");

const payload = JSON.stringify({
  filters: {
    jobTitle: ["VP of Engineering", "CTO"],
    companySize: ["201-500", "501-1000"],
    industry: ["SaaS", "Enterprise Software"],
    location: "United States",
  },
  limit: 25,
});

const options = {
  hostname: "api.lusha.com",
  path: "/v2/contacts/search",
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
    "Content-Length": payload.length,
  },
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    const results = JSON.parse(data);
    results.contacts.forEach((c) => {
      console.log(\`\${c.fullName} - \${c.title} at \${c.company}\`);
    });
  });
});

req.write(payload);
req.end();`,
  },

  contactEnrich: {
    label: "Contact Enrichment",
    curl: `curl -X POST https://api.lusha.com/v2/contact/enrich \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "sarah.chen@techcorp.io",
    "fields": ["phone", "title", "company", "social"]
  }'`,
    python: `import requests

url = "https://api.lusha.com/v2/contact/enrich"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "email": "sarah.chen@techcorp.io",
    "fields": ["phone", "title", "company", "social"]
}

response = requests.post(url, json=payload, headers=headers)
enriched = response.json()

print(f"Phone: {enriched['phone']}")
print(f"Title: {enriched['title']}")
print(f"LinkedIn: {enriched['social']['linkedin']}")`,
    node: `const https = require("https");

const payload = JSON.stringify({
  email: "sarah.chen@techcorp.io",
  fields: ["phone", "title", "company", "social"],
});

const options = {
  hostname: "api.lusha.com",
  path: "/v2/contact/enrich",
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
    "Content-Length": payload.length,
  },
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    const enriched = JSON.parse(data);
    console.log("Phone:", enriched.phone);
    console.log("Title:", enriched.title);
    console.log("LinkedIn:", enriched.social.linkedin);
  });
});

req.write(payload);
req.end();`,
  },

  companySearch: {
    label: "Company Search",
    curl: `curl -X POST https://api.lusha.com/v2/companies/search \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "filters": {
      "industry": ["Cybersecurity", "FinTech"],
      "employeeCount": { "min": 50, "max": 500 },
      "revenue": { "min": 5000000, "max": 100000000 },
      "technologies": ["AWS", "Kubernetes"]
    },
    "limit": 10
  }'`,
    python: `import requests

url = "https://api.lusha.com/v2/companies/search"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "filters": {
        "industry": ["Cybersecurity", "FinTech"],
        "employeeCount": {"min": 50, "max": 500},
        "revenue": {"min": 5000000, "max": 100000000},
        "technologies": ["AWS", "Kubernetes"]
    },
    "limit": 10
}

response = requests.post(url, json=payload, headers=headers)
results = response.json()

for company in results["companies"]:
    print(f"{company['name']} - {company['industry']} ({company['employeeCount']} employees)")`,
    node: `const https = require("https");

const payload = JSON.stringify({
  filters: {
    industry: ["Cybersecurity", "FinTech"],
    employeeCount: { min: 50, max: 500 },
    revenue: { min: 5000000, max: 100000000 },
    technologies: ["AWS", "Kubernetes"],
  },
  limit: 10,
});

const options = {
  hostname: "api.lusha.com",
  path: "/v2/companies/search",
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
    "Content-Length": payload.length,
  },
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    const results = JSON.parse(data);
    results.companies.forEach((c) => {
      console.log(\`\${c.name} - \${c.industry} (\${c.employeeCount} employees)\`);
    });
  });
});

req.write(payload);
req.end();`,
  },

  webhookSetup: {
    label: "Webhook Setup",
    curl: `curl -X POST https://api.lusha.com/v2/webhooks \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-app.com/webhooks/lusha",
    "events": ["contact.enriched", "list.completed", "credit.low"],
    "secret": "your_webhook_secret"
  }'`,
    python: `import requests

url = "https://api.lusha.com/v2/webhooks"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "url": "https://your-app.com/webhooks/lusha",
    "events": ["contact.enriched", "list.completed", "credit.low"],
    "secret": "your_webhook_secret"
}

response = requests.post(url, json=payload, headers=headers)
webhook = response.json()

print(f"Webhook ID: {webhook['id']}")
print(f"Status: {webhook['status']}")
print(f"Events: {', '.join(webhook['events'])}")`,
    node: `const https = require("https");

const payload = JSON.stringify({
  url: "https://your-app.com/webhooks/lusha",
  events: ["contact.enriched", "list.completed", "credit.low"],
  secret: "your_webhook_secret",
});

const options = {
  hostname: "api.lusha.com",
  path: "/v2/webhooks",
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
    "Content-Length": payload.length,
  },
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    const webhook = JSON.parse(data);
    console.log("Webhook ID:", webhook.id);
    console.log("Status:", webhook.status);
    console.log("Events:", webhook.events.join(", "));
  });
});

req.write(payload);
req.end();`,
  },
};

/**
 * Generate a code snippet for a specific endpoint and language.
 * @param {string} type - Endpoint type (personLookup, companyLookup, etc.)
 * @param {string} language - Language (curl, python, node)
 * @returns {string} Formatted code block with label
 */
function generateSnippet(type, language) {
  const endpoint = endpoints[type];
  if (!endpoint) {
    return `Unknown endpoint type: "${type}". Available: ${Object.keys(endpoints).join(", ")}`;
  }

  const langKey = language.toLowerCase().replace("js", "node").replace("javascript", "node").replace("nodejs", "node");
  const code = endpoint[langKey];
  if (!code) {
    return `Unknown language: "${language}". Available: curl, python, node`;
  }

  const langLabel = langKey === "node" ? "javascript" : langKey === "curl" ? "bash" : langKey;
  return `**${endpoint.label} — ${langKey === "node" ? "Node.js" : langKey === "curl" ? "cURL" : "Python"}**\n\n\`\`\`${langLabel}\n${code}\n\`\`\``;
}

/**
 * Generate all language snippets for a given endpoint type.
 * @param {string} type - Endpoint type
 * @returns {string} All three code blocks
 */
function generateAllSnippets(type) {
  const endpoint = endpoints[type];
  if (!endpoint) {
    return `Unknown endpoint type: "${type}". Available: ${Object.keys(endpoints).join(", ")}`;
  }

  return [
    `**${endpoint.label} — cURL**\n\n\`\`\`bash\n${endpoint.curl}\n\`\`\``,
    `**${endpoint.label} — Python**\n\n\`\`\`python\n${endpoint.python}\n\`\`\``,
    `**${endpoint.label} — Node.js**\n\n\`\`\`javascript\n${endpoint.node}\n\`\`\``,
  ].join("\n\n");
}

module.exports = { generateSnippet, generateAllSnippets, endpoints };
