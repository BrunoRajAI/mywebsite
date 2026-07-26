// Resume data extracted from Bruno Lionel Raj M's resume
// NO fabricated data — everything comes directly from the uploaded resume

export interface Stat {
  value: string;
  label: string;
  description: string;
}

export interface ExperienceRole {
  company: string;
  location: string;
  designation: string;
  duration: string;
  roleType: "promotion" | "standard";
  responsibilities: {
    category: string;
    icon?: string;
    items: string[];
    highlights?: { metric: string; context: string }[];
  }[];
}

export interface Tool {
  name: string;
  category: string;
  proficiency?: "expert" | "advanced" | "proficient";
}

export interface CaseStudy {
  id: string;
  index: number;
  title: string;
  company: string;
  category: string;
  tags: string[];
  problem: string;
  action: string;
  results: { metric: string; label: string; description: string }[];
  icon: "automation" | "ai-search" | "authority";
}

export interface ResumeData {
  name: string;
  initials: string;
  qualification: string;
  title: string;
  titleShort: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  calendly: string;

  professionalSummary: string;
  professionalSummaryExtended: string;

  // Expertise pillars derived from resume
  expertiseAreas: {
    title: string;
    description: string;
    keywords: string[];
  }[];

  achievements: {
    text: string;
    metric?: string;
    category: string;
  }[];

  caseStudies: CaseStudy[];

  experience: ExperienceRole[];

  skills: {
    competencies: { name: string; level: "expert" | "advanced" }[];
    tools: Tool[];
    // Grouped by category
    toolCategories: {
      name: string;
      description: string;
      tools: Tool[];
    }[];
  };

  education: { degree: string; field?: string }[];

  // Sections to hide (no data in resume)
  hasProjects: boolean;
  hasCertifications: boolean;
  hasAwards: boolean;
  hasBlog: boolean;
  hasTestimonials: boolean;

  // Statistics derived from resume achievements (only real numbers)
  stats: Stat[];

  // Additional resume-derived data
  totalCompanies: number;
  totalTeamManaged: number;
  marqueeKeywords: string[];
}

export const resumeData: ResumeData = {
  name: "Bruno Lionel Raj M",
  initials: "BLR",
  qualification: "B.Com — Information Technology",
  title: "Digital Marketing & Marketing Automation Specialist",
  titleShort: "Marketing Automation Specialist",
  location: "Coimbatore, India",
  phone: "+91-8870142873",
  email: "brunoel1998@gmail.com",
  linkedin: "https://linkedin.com/in/bruno-lionel-raj",
  calendly: "https://calendly.com/brunolionelraj/30min",

  professionalSummary:
    "Digital Marketing & Marketing Automation Specialist with 6+ years of experience in Local SEO, Technical SEO, AEO, GEO, Email Marketing, Lead Generation, and AI-powered automation.",

  professionalSummaryExtended:
    "Skilled in building production-grade workflows using n8n, AI agents, APIs, DataForSEO, Exa, and Mem0 to streamline SEO and marketing operations. Proven track record of increasing leads, improving search visibility, driving organic growth, and reducing operational effort through scalable automation solutions.",

  // Expertise pillars derived from resume content
  expertiseAreas: [
    {
      title: "AI-Powered Automation",
      description:
        "Building production-grade AI marketing automation systems using n8n workflows, AI agents, and persistent memory systems (Mem0) to eliminate manual effort and scale operations.",
      keywords: ["n8n", "AI Agents", "Mem0", "WebMCP", "API Integration", "Workflow Automation"],
    },
    {
      title: "Search Engine Optimization",
      description:
        "Driving organic growth through Local SEO, Technical SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) strategies for maximum search visibility.",
      keywords: ["Local SEO", "Technical SEO", "AEO", "GEO", "Schema Markup", "Keyword Research"],
    },
    {
      title: "Email Marketing & Lead Generation",
      description:
        "Designing segmented email campaigns and lead nurturing funnels that convert — from MQL/SQL qualification frameworks to multi-channel campaign orchestration.",
      keywords: ["Mailchimp", "Mautic", "Campaign Segmentation", "MQL/SQL", "Lead Generation", "CRO"],
    },
    {
      title: "Analytics & Data-Driven Strategy",
      description:
        "Leveraging Google Analytics, Search Console, SEMrush, Ahrefs, and DataForSEO APIs for automated reporting, competitor analysis, and performance optimization.",
      keywords: ["Google Analytics", "SEMrush", "Ahrefs", "DataForSEO", "BrightLocal", "A/B Testing"],
    },
  ],

  achievements: [
    {
      text: "Increased Property Enquiry Leads by 10% through targeted digital marketing and conversion optimization initiatives.",
      metric: "10%",
      category: "Lead Generation",
    },
    {
      text: "Increased Valuation Leads by 49% through SEO and digital marketing strategies for estate agency websites.",
      metric: "49%",
      category: "SEO & Growth",
    },
    {
      text: "Reduced Marketing Operational Effort by 50% through AI-powered workflow automation.",
      metric: "50%",
      category: "Automation",
    },
    {
      text: "Reduced Google Business Profile (GBP) Management Time by 68% using n8n automation workflows.",
      metric: "68%",
      category: "Automation",
    },
    {
      text: "Achieved Multiple Top-10 Google Rankings for competitive target keywords.",
      metric: "Top 10",
      category: "SEO",
    },
    {
      text: "Built and deployed production-grade AI marketing automation systems for link building, guest posting, SEO reporting, and competitor research.",
      metric: "Production-Grade",
      category: "AI & Automation",
    },
    {
      text: "Increased overall website traffic by 10% through AEO and GEO strategies.",
      metric: "10%",
      category: "AEO/GEO",
    },
    {
      text: "Increased AI-search-driven traffic by 67% and improved AI search visibility by 45% through schema implementation, entity optimization, and AI-search-focused SEO initiatives.",
      metric: "67%",
      category: "AI Search",
    },
  ],

  caseStudies: [
    {
      id: "gbp-automation-starberry",
      index: 1,
      title: "GBP Automation",
      company: "Starberry",
      category: "Marketing Automation",
      tags: ["n8n", "Google Business Profile", "DataForSEO", "Workflow Automation"],
      problem:
        "Manual Google Business Profile updates were consuming hours every week across multiple estate agency listings. The repetitive posting and update workflow was eating into the team's bandwidth for strategic SEO work, creating a chronic bottleneck that did not scale as new branches were onboarded.",
      action:
        "Built an end-to-end n8n automation workflow that handled GBP posting and updates across all listings from a single source of truth. The workflow integrated DataForSEO for live keyword and SERP tracking, so posts could be scheduled, optimized, and published based on actual search demand rather than guesswork. Reusable trigger nodes let the marketing team launch a batch of location-aware updates in minutes instead of hours.",
      results: [
        {
          metric: "68%",
          label: "GBP Time Reduced",
          description: "Cut weekly Google Business Profile management time by two-thirds, freeing the team to focus on higher-value SEO initiatives.",
        },
        {
          metric: "100%",
          label: "Posting Automated",
          description: "Replaced manual cross-listing updates with a single workflow that pushes to every GBP listing at once.",
        },
        {
          metric: "1→N",
          label: "Scalable Workflow",
          description: "Single n8n workflow scales from 1 to N branches with no additional manual effort per listing.",
        },
      ],
      icon: "automation",
    },
    {
      id: "aeo-geo-starberry",
      index: 2,
      title: "AEO & GEO Visibility",
      company: "Starberry",
      category: "AI Search Optimization",
      tags: ["AEO", "GEO", "Schema Markup", "Entity Optimization", "AI Search"],
      problem:
        "Traffic was Google-only. There was zero presence in AI search answers like ChatGPT and Perplexity, meaning the brand was invisible to a fast-growing channel of high-intent users who never clicked a blue link. As AI search adoption accelerated, this gap translated directly into missed valuation and enquiry opportunities.",
      action:
        "Rebuilt the content architecture around AI search engines rather than classic blue links. Deployed comprehensive schema markup, entity optimization, and structured data designed to be machine-readable by ChatGPT, Perplexity, and other answer engines. Re-authored key landing pages to answer questions directly, aligned internal linking around entities rather than keywords, and submitted structured feeds to maximize the chance of being cited inside AI-generated answers.",
      results: [
        {
          metric: "67%",
          label: "AI Search Traffic Growth",
          description: "AI-search-driven traffic grew 67% after the schema and entity optimization push.",
        },
        {
          metric: "45%",
          label: "AI Search Visibility",
          description: "Improved AI search visibility by 45% across ChatGPT, Perplexity, and other answer engines.",
        },
        {
          metric: "49%",
          label: "Valuation Leads Increase",
          description: "Valuation leads rose 49% off the back of the new AI search visibility, directly tying the work to revenue.",
        },
      ],
      icon: "ai-search",
    },
    {
      id: "domain-authority-deckzi",
      index: 3,
      title: "Domain Authority & Organic Growth",
      company: "Deckzi",
      category: "Organic SEO Growth",
      tags: ["Link Building", "Content Optimization", "Social Growth", "Domain Authority"],
      problem:
        "A low-authority site starting at DA 9 with almost no organic visibility or social presence. The brand was invisible in search, had no keyword rankings of consequence, and a social following of zero — making it nearly impossible to compete with established players in the niche.",
      action:
        "Ran a sustained, multi-quarter link-building and content optimization push. Acquired high-quality backlinks through outreach and partnerships, paired with consistent content optimization targeting commercially valuable keywords. Ran a parallel social posting cadence to build audience and brand signals, ensuring every piece of content had distribution behind it rather than sitting orphaned on the blog.",
      results: [
        {
          metric: "9→35",
          label: "Domain Authority Growth",
          description: "Domain Authority climbed from 9 to 35 — a 4x improvement that unlocked real organic visibility.",
        },
        {
          metric: "Top 10",
          label: "Multiple Keywords Ranked",
          description: "Multiple target keywords entered Google's Top 10, driving consistent organic traffic.",
        },
        {
          metric: "1K+",
          label: "Social Following Built",
          description: "Grew the social media audience from 0 to 1,000+ followers through consistent content and engagement.",
        },
      ],
      icon: "authority",
    },
  ],

  experience: [
    {
      company: "Starberry Pvt. Ltd",
      location: "Coimbatore",
      designation: "Email Marketing Lead → Local SEO & Marketing Automation Specialist",
      duration: "Apr 2023 – August 2026",
      roleType: "promotion",
      responsibilities: [
        {
          category: "SEO Analyst",
          items: [
            "Increased property enquiry leads by 10% through segmented email campaigns targeting buyers, sellers, landlords, and investors.",
            "Managed and mentored a team of 4 digital marketers, improving productivity by 25% through structured workflows and process improvements.",
            "Optimized Google Business Profiles and implemented schema markup strategies to improve local search visibility and map pack rankings.",
            "Conducted keyword research, competitor analysis, and local SEO audits to improve organic search performance.",
            "Increased valuation leads by 49% through SEO and digital marketing initiatives for estate agency websites.",
            "Ranked high-priority keywords within Google's Top 3 positions, driving growth in organic traffic and enquiries.",
            "Conducted technical SEO audits and collaborated with developers to resolve indexing, crawlability, site speed, and structured data issues.",
            "Increased AI-search-driven traffic by 67% through AEO/GEO content optimization and entity-based SEO strategies.",
            "Improved AI search visibility by 45% through schema implementation, entity optimization, and AI-search-readiness enhancements.",
          ],
          highlights: [
            { metric: "49%", context: "Valuation Lead Increase" },
            { metric: "Top 3", context: "Google Keyword Rankings" },
            { metric: "67%", context: "AI Search Traffic Growth" },
            { metric: "4", context: "Team Members Mentored" },
          ],
        },
        {
          category: "Marketing Automation & AI Workflows",
          items: [
            "Designed and deployed production-grade automation workflows using n8n to streamline SEO and marketing operations.",
            "Integrated DataForSEO API for automated SERP tracking, keyword monitoring, and performance reporting.",
            "Implemented Mem0-based persistent memory systems for AI-powered marketing workflows.",
            "Leveraged WebMCP for structured data retrieval and automation processes.",
            "Utilized Exa semantic search to automate competitor research and significantly reduce manual analysis.",
            "Built automated link-building and guest-posting workflows, reducing manual effort by 50%.",
            "Developed Google Business Profile posting automation, reducing operational management time by 68%.",
            "Automated SEO reporting and research processes, improving scalability, accuracy, and team efficiency.",
          ],
          highlights: [
            { metric: "50%", context: "Manual Effort Reduced" },
            { metric: "68%", context: "GBP Post Time Reduction" },
            { metric: "Production-Grade", context: "AI Systems Deployed" },
          ],
        },
      ],
    },
    {
      company: "Unisoft System Consultancy",
      location: "Coimbatore",
      designation: "Digital Marketing Executive",
      duration: "Jul 2022 – Mar 2023",
      roleType: "standard",
      responsibilities: [
        {
          category: "Digital Marketing",
          items: [
            "Increased ERP software sales by 15% through strategic email marketing campaigns and lead nurturing initiatives.",
            "Improved website conversion rates by 5% through technical SEO enhancements and on-page optimization.",
            "Conducted competitor analysis and market research to support data-driven marketing campaigns.",
            "Generated and qualified marketing leads using MQL and SQL frameworks.",
            "Improved organic traffic through keyword research, content optimization, and SEO best practices.",
            "Managed multi-channel marketing activities including SEO, email marketing, and social media campaigns.",
          ],
          highlights: [
            { metric: "15%", context: "ERP Sales Increase" },
            { metric: "5%", context: "Conversion Rate Improvement" },
          ],
        },
      ],
    },
    {
      company: "Deckzi Solution",
      location: "Chennai",
      designation: "Digital Marketing Executive",
      duration: "Jul 2020 – Jun 2022",
      roleType: "standard",
      responsibilities: [
        {
          category: "Digital Marketing",
          items: [
            "Reduced social media management workload by 35% through workflow optimization and automation.",
            "Executed on-page and off-page SEO strategies to improve organic search rankings and website visibility.",
            "Built high-quality backlinks and optimized website content to increase organic traffic and search performance.",
            "Supported digital marketing campaigns across SEO, content marketing, social media, email marketing, SEM, and display advertising.",
            "Increased Domain Authority from 9 to 35 through strategic SEO initiatives and high-quality link acquisition.",
            "Achieved Top-10 Google rankings for multiple target keywords through technical and content optimization.",
            "Grew the social media audience from 0 to 1,000+ followers through content optimization and engagement strategies.",
            "Managed SEO, SEM, email marketing, and display advertising campaigns to drive qualified traffic and conversions.",
            "Implemented data-driven marketing strategies that improved brand visibility, lead generation, and overall campaign performance.",
          ],
          highlights: [
            { metric: "9→35", context: "Domain Authority Growth" },
            { metric: "1K+", context: "Social Media Followers Gained" },
            { metric: "35%", context: "Social Media Workload Reduced" },
          ],
        },
      ],
    },
  ],

  skills: {
    competencies: [
      { name: "Local SEO", level: "expert" },
      { name: "Technical SEO", level: "expert" },
      { name: "On-Page SEO", level: "expert" },
      { name: "Off-Page SEO", level: "expert" },
      { name: "Google Business Profile Optimization", level: "expert" },
      { name: "Email Marketing", level: "expert" },
      { name: "Marketing Automation", level: "expert" },
      { name: "AI Workflow Development", level: "expert" },
      { name: "AI Agents", level: "advanced" },
      { name: "API Integration", level: "advanced" },
      { name: "Lead Generation", level: "expert" },
      { name: "Conversion Rate Optimization", level: "advanced" },
      { name: "Keyword Research", level: "expert" },
      { name: "Competitor Analysis", level: "expert" },
      { name: "Schema Markup", level: "advanced" },
      { name: "AEO & GEO", level: "advanced" },
      { name: "Team Leadership", level: "advanced" },
      { name: "CRM & Marketing Operations", level: "advanced" },
      { name: "Data Analysis", level: "advanced" },
      { name: "Process Automation", level: "expert" },
      { name: "Technical Documentation", level: "advanced" },
      { name: "Project Coordination", level: "advanced" },
    ],
    tools: [
      { name: "n8n", category: "AI & Automation", proficiency: "expert" },
      { name: "MindPal", category: "AI & Automation", proficiency: "proficient" },
      { name: "Mem0", category: "AI & Automation", proficiency: "advanced" },
      { name: "WebMCP", category: "AI & Automation", proficiency: "advanced" },
      { name: "DataForSEO API", category: "AI & Automation", proficiency: "expert" },
      { name: "Exa AI Search", category: "AI & Automation", proficiency: "advanced" },
      { name: "Make", category: "AI & Automation", proficiency: "proficient" },
      { name: "AirOps", category: "AI & Automation", proficiency: "proficient" },
      { name: "Claude AI", category: "AI & Automation", proficiency: "advanced" },
      { name: "Prompt Engineering", category: "AI & Automation", proficiency: "advanced" },
      { name: "AI Agent Development", category: "AI & Automation", proficiency: "advanced" },
      { name: "Zapier", category: "AI & Automation", proficiency: "proficient" },
      { name: "Google Analytics", category: "SEO & Analytics", proficiency: "expert" },
      { name: "Google Search Console", category: "SEO & Analytics", proficiency: "expert" },
      { name: "Google Tag Manager", category: "SEO & Analytics", proficiency: "advanced" },
      { name: "SEMrush", category: "SEO & Analytics", proficiency: "expert" },
      { name: "Ahrefs", category: "SEO & Analytics", proficiency: "advanced" },
      { name: "BrightLocal", category: "SEO & Analytics", proficiency: "advanced" },
      { name: "BrightEdge", category: "SEO & Analytics", proficiency: "proficient" },
      { name: "Ubersuggest", category: "SEO & Analytics", proficiency: "proficient" },
      { name: "Mailchimp", category: "Email Marketing", proficiency: "expert" },
      { name: "Mautic", category: "Email Marketing", proficiency: "proficient" },
      { name: "Brief Your Market", category: "Email Marketing", proficiency: "proficient" },
      { name: "Campaign Segmentation", category: "Email Marketing", proficiency: "expert" },
      { name: "Lead Qualification (MQL/SQL)", category: "Lead Management", proficiency: "advanced" },
    ],
    toolCategories: [
      {
        name: "AI & Automation",
        description: "Production-grade workflow automation, AI agent orchestration, and intelligent marketing systems",
        tools: [
          { name: "n8n", category: "AI & Automation", proficiency: "expert" },
          { name: "Mem0", category: "AI & Automation", proficiency: "advanced" },
          { name: "DataForSEO API", category: "AI & Automation", proficiency: "expert" },
          { name: "Exa AI Search", category: "AI & Automation", proficiency: "advanced" },
          { name: "Claude AI", category: "AI & Automation", proficiency: "advanced" },
          { name: "WebMCP", category: "AI & Automation", proficiency: "advanced" },
          { name: "Prompt Engineering", category: "AI & Automation", proficiency: "advanced" },
          { name: "AI Agent Development", category: "AI & Automation", proficiency: "advanced" },
          { name: "Zapier", category: "AI & Automation", proficiency: "proficient" },
          { name: "Make", category: "AI & Automation", proficiency: "proficient" },
          { name: "MindPal", category: "AI & Automation", proficiency: "proficient" },
          { name: "AirOps", category: "AI & Automation", proficiency: "proficient" },
        ],
      },
      {
        name: "SEO & Analytics",
        description: "Comprehensive search optimization, performance monitoring, and competitive intelligence",
        tools: [
          { name: "Google Analytics", category: "SEO & Analytics", proficiency: "expert" },
          { name: "Google Search Console", category: "SEO & Analytics", proficiency: "expert" },
          { name: "SEMrush", category: "SEO & Analytics", proficiency: "expert" },
          { name: "Google Tag Manager", category: "SEO & Analytics", proficiency: "advanced" },
          { name: "Ahrefs", category: "SEO & Analytics", proficiency: "advanced" },
          { name: "BrightLocal", category: "SEO & Analytics", proficiency: "advanced" },
          { name: "BrightEdge", category: "SEO & Analytics", proficiency: "proficient" },
          { name: "Ubersuggest", category: "SEO & Analytics", proficiency: "proficient" },
        ],
      },
      {
        name: "Email Marketing",
        description: "Segmented campaigns, automation workflows, and performance-driven email strategies",
        tools: [
          { name: "Mailchimp", category: "Email Marketing", proficiency: "expert" },
          { name: "Campaign Segmentation", category: "Email Marketing", proficiency: "expert" },
          { name: "Mautic", category: "Email Marketing", proficiency: "proficient" },
          { name: "Brief Your Market", category: "Email Marketing", proficiency: "proficient" },
        ],
      },
      {
        name: "Lead Management",
        description: "MQL/SQL frameworks, lead qualification, and conversion optimization strategies",
        tools: [
          { name: "Lead Qualification (MQL/SQL)", category: "Lead Management", proficiency: "advanced" },
        ],
      },
    ],
  },

  education: [
    {
      degree: "B.Com — Information Technology",
    },
  ],

  // Sections to hide (no data in resume)
  hasProjects: false,
  hasCertifications: false,
  hasAwards: false,
  hasBlog: false,
  hasTestimonials: false,

  // Statistics derived from resume achievements (only real numbers)
  stats: [
    { value: "6+", label: "Years Experience", description: "Across 3 companies in digital marketing & automation" },
    { value: "49%", label: "Valuation Lead Increase", description: "Through SEO & digital marketing strategies" },
    { value: "67%", label: "AI Search Traffic Growth", description: "Via AEO/GEO content optimization" },
    { value: "68%", label: "GBP Post Time Reduction", description: "Using n8n automation workflows" },
    { value: "50%", label: "Operational Effort Reduced", description: "Through AI-powered workflow automation" },
    { value: "Top 3", label: "Google Keyword Rankings", description: "For competitive high-priority keywords" },
    { value: "15%", label: "ERP Sales Increase", description: "Via strategic email campaigns at Unisoft" },
    { value: "9→35", label: "Domain Authority Growth", description: "Through strategic SEO initiatives at Deckzi" },
  ],

  totalCompanies: 3,
  totalTeamManaged: 4,
  marqueeKeywords: [
    "Local SEO",
    "Technical SEO",
    "AEO",
    "GEO",
    "n8n",
    "AI Agents",
    "Email Marketing",
    "Lead Generation",
    "Marketing Automation",
    "Schema Markup",
    "DataForSEO",
    "Mem0",
    "SEMrush",
    "CRO",
    "API Integration",
    "Competitor Analysis",
  ],
};