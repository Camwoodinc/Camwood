import type { Chunk } from './store'; // Assume Chunk is defined here

export const knowledgePack = {
  core_identity: {
    name: "Camwood Inc.",
    positioning:
      "A global decision intelligence company that turns data into direction.",
    philosophy: "AI should serve people, not the other way around.",
    edge: "Engineering data into decision engines that deliver clarity, elevate experiences, and enrich everyday life.",
  },
  brand_pillars: [
    "Clarity in Motion – Transforming complexity into clear, actionable intelligence.",
    "Decision Engines – Adaptive, human-centered systems engineered with precision and purpose.",
    "Elevation, Not Just Automation – Beyond efficiency: creating experiences that enrich and inspire.",
    "Human-Centered Intelligence – Accessible, intuitive, and impactful at every level of an organization.",
    "Scalable Impact – From pilots to enterprise-wide deployments, Camwood grows with the organization.",
  ],
  company_overview: {
    summary:
      "Camwood Inc. helps organizations transform overwhelming data into clear direction. Unlike firms that simply build dashboards or automate processes, Camwood designs decision engines that evolve with business needs, delivering clarity, confidence, and competitive edge.",
    presence:
      "Partnering with clients across North America, Europe, Africa, and Asia.",
    ecosystem_fit:
      "Camwood integrates with AWS, Azure, GCP, Databricks, Snowflake, and Salesforce.",
  },
  industries_served: {
    financial_services: "Risk modeling, fraud detection, predictive analytics.",
    healthcare_life_sciences:
      "Patient flow optimization, clinical decision support, data harmonization.",
    retail_ecommerce:
      "Demand forecasting, personalized recommendations, supply chain clarity.",
    manufacturing_logistics:
      "Predictive maintenance, efficiency optimization, route intelligence.",
    technology_saas:
      "Product analytics, user engagement intelligence, growth decision engines.",
  },
  use_cases: [
    "Executive Decision Support – distilling complex realities into simple choices.",
    "Operational Efficiency – reducing workflow noise and increasing clarity.",
    "Customer Experience Enhancement – elevating journeys with personalization.",
    "Data Integration & Noise Reduction – unifying fragmented systems into actionable intelligence.",
    "Future-Readiness – adaptive intelligence that grows with organizations.",
  ],
  engagement_model: [
    "Consulting & Strategy – design tailored decision frameworks.",
    "Custom Engineering – build pipelines, models, and systems aligned with goals.",
    "Deployment & Integration – plug Camwood solutions into ecosystems seamlessly.",
    "Ongoing Partnership – continuous improvement, adaptation, and scaling.",
  ],
  values: [
    "Fun – technology that surprises and delights.",
    "Memorable – experiences that leave lasting impressions.",
    "Meaningful – returning time, focus, and attention back to people.",
    "Trustworthy – transparent, reliable, and ethical in every engagement.",
    "Compliant – designed with GDPR, HIPAA, SOC 2, ISO 27001 in mind.",
  ],
  differentiators: [
    "Where others sell algorithms, Camwood delivers clarity in motion.",
    "Where others automate, Camwood elevates.",
    "Where others process data, Camwood turns it into direction.",
    "Where others focus on outputs, Camwood engineers outcomes.",
  ],
  closing_promise: {
    purpose:
      "Decision intelligence that sharpens businesses and makes life more vivid.",
    edge: "Turning data into direction, and direction into lasting impact.",
    vision:
      "Decision intelligence as the connective tissue between AI, data, and human decision-making — shaping adaptive organizations.",
  },
  faq: [
    {
      q: "What does Camwood do?",
      a: "Camwood Inc. is a decision intelligence company that transforms complex data into clear, actionable direction through human-centered AI and decision engines.",
    },
    {
      q: "How is Camwood different from other AI companies?",
      a: "Unlike firms that focus only on automation or dashboards, Camwood builds decision intelligence systems designed to elevate human experiences and drive real-world outcomes.",
    },
    {
      q: "Who are Camwood’s clients?",
      a: "Camwood works with organizations across industries including finance, healthcare, retail, manufacturing, and technology.",
    },
    {
      q: "Does Camwood provide off-the-shelf products or custom solutions?",
      a: "Both. We offer pre-built frameworks and decision modules, but specialize in tailoring solutions for each client’s unique goals.",
    },
    {
      q: "How can my organization work with Camwood?",
      a: "Engagements typically start with a strategy consultation, followed by tailored solution engineering and long-term scaling.",
    },
    {
      q: "Is Camwood’s AI ethical and transparent?",
      a: "Yes. Human-centered intelligence and ethical AI principles are at the heart of Camwood’s philosophy.",
    },
    {
      q: "What ROI can I expect?",
      a: "We focus on outcomes like faster time-to-decision, reduced workflow noise, improved customer satisfaction, and measurable trust. Financial ROI projections are handled in consultation with our team.",
    },
  ],
  chatbot_guidelines: {
    tone: "Clear, confident, human-centered.",
    style: "Concise but warm, authoritative but approachable.",
    traits: ["Insightful", "Trustworthy", "Elevating", "Purposeful"],
    response_style:
      "Turns jargon into clarity, always guiding toward direction.",
  },
  escalation_rules: {
    financial_specifics:
      "Escalate to human for ROI in money terms, pricing, or cost breakdowns.",
    contractual_legal:
      "Escalate to human for contracts, SLAs, compliance audits.",
    technical_integrations:
      "Escalate when asked about deep proprietary integrations.",
    sensitive_info: "Decline to process PII/financial data and escalate.",
    uncertainty: "If low confidence, hand off to human specialist.",
  },
  sample_phrasing: [
    "Let’s turn your data into direction.",
    "I can simplify that for you—here’s the clear path forward.",
    "This isn’t just about automation—it’s about elevation.",
    "Clarity is powerful. Here’s how Camwood can bring it to you.",
    "For ROI specifics, I’ll connect you with our team — but here’s the kind of value outcomes our clients typically experience.",
  ],
};

// generate searchable chunks with stable, unique ids
function makeChunksFromKP(kp: typeof knowledgePack) {
  const out: Chunk[] = [];
  let counter = 1;

  if (kp.core_identity) {
    out.push({
      id: `kp-core`,
      content: `${kp.core_identity.positioning} ${kp.core_identity.edge}`,
      title: kp.core_identity.name,
      url: "" 
    });
  }

  (kp.brand_pillars || []).forEach((p) =>
    out.push({ id: `kp-pillar-${counter++}`, content: p, title: "", url: "" })
  );

  if (kp.company_overview?.summary) {
    out.push({
      id: `kp-overview-${counter++}`,
      content: kp.company_overview.summary,
      title: "",
      url: "" 
    });
  }

  Object.values(kp.industries_served || {}).forEach((v) =>
    out.push({ id: `kp-ind-${counter++}`, content: v, title: "", url: "" })
  );

  (kp.use_cases || []).forEach((u) =>
    out.push({ id: `kp-use-${counter++}`, content: u, title: "", url: "" }) 
  );

  (kp.differentiators || []).forEach((d) =>
    out.push({ id: `kp-diff-${counter++}`, content: d, title: "", url: "" }) 
  );

  (kp.faq || []).forEach((f) =>
    out.push({
      id: `kp-faq-${counter++}`,
      content: `${f.q} ${f.a}`,
      title: "",
      url: "" 
    })
  );

  // add some values / sample phrasing as smaller docs
  (kp.values || []).forEach((v) =>
    out.push({ id: `kp-val-${counter++}`, content: v, title: "", url: "" }) 
  );
  (kp.sample_phrasing || []).forEach((s) =>
    out.push({ id: `kp-phr-${counter++}`, content: s, title: "", url: "" }) 
  );

  return out;
}

export const chunks = makeChunksFromKP(knowledgePack);