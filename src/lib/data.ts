// Real content migrated from the legacy Consultoradmin site
// (src/data/index.js + the hand-written copy previously in
// src/components/organisms/*.js). Nothing here is invented: every field
// traces back to that source.
//
// Brand-name inconsistency note (do not "fix" by inventing a new fact):
// the legacy `pageName` constant (src/data/index.js) read `'Versalles'`,
// the legacy contact email was `admversalles@emailsecure.lat`, and `url`
// below is a broken/placeholder link (a Spanish Wiktionary entry, clearly
// not the firm's real domain) — none of that matches `dataSite.name`,
// which is `'Consultoradmin'` (the project/folder name, and the name used
// by the real Navbar/branding). This migration uses `dataSite.name`
// ("Consultoradmin") as the canonical brand across the new site, keeps
// `telephone`/`email`/`address` verbatim (real contact data), and omits
// `url` everywhere rather than inventing a working domain to replace it.
//
// Phone-placeholder note: the legacy OurProcess.js step 1 copy read "Dial
// (316) 555-0116 or contact us online" — a generic template placeholder
// number, not the real business line. This migration drops that specific
// fake number from the copy and, where a number is needed, uses the real
// `dataSite.telephone` (5513358634).
//
// Services (dataSite.services) had no numeric id in the legacy payload;
// synthetic ids (500001-500007) were added here only as React/translation
// keys, the same convention used in the Homelon2/Loyal/Montero migrations
// — no content was changed.
export const dataSite = {
  name: "Consultoradmin",
  telephone: "5513358634",
  email: "admversalles@emailsecure.lat",
  address:
    "CAMPOS ELISEOS 400, PISO 3, DEPTO 302, POLANCO V SECCION, MIGUEL HIDALGO, CIUDAD DE MEXICO, C.P. 11560",
  description:
    "Whether you're a corporation seeking regulatory guidance, an entrepreneur navigating business formation, or an individual in need of legal representation, our team is here to support you with clarity, precision, and results driven solutions.",
  subtitle: "Legal Solutions & Strategic Consulting Tailored to Your Success",
  image_hero:
    "https://cms-webserver-statics.s3.amazonaws.com/media/websites/como_1.jpg",
  image_hero2:
    "https://cms-webserver-statics.s3.amazonaws.com/media/websites/como2.jpg",
  iconImage:
    "https://cms-webserver-statics.s3.amazonaws.com/media/websites/consultoradmin-versalles-s-de-rl-de-cv-high-resolution-logo.png",
  info: [
    {
      title: "Values",
      description:
        "Integrity ,We uphold the highest ethical standards in every legal and consulting engagement,Client,Centered Approach , Your goals guide our strategy; your success is our priority,Excellence ,We deliver precise, results-driven solutions backed by deep expertise and commitment to quality.",
    },
    {
      title: "Clients",
      description:
        "Corporations and Enterprises,Small and Medium Sized Businesses,Startups and Entrepreneurs,Nonprofit Organizations,Individuals ,Government Entities and Public Institutions.",
    },
    {
      title: "Specialty areas",
      description:
        "Corporate and Commercial Law,Regulatory Compliance and Risk Management,Contract Drafting and Negotiation,Labor and Employment Law,Intellectual Property ,Litigation and Dispute Resolution,Tax and Financial Consulting,Real Estate and Property Law.",
    },
    {
      title: "Experience",
      description:
        "With over 15 years of professional practice, our law firm has built a strong reputation for delivering reliable legal and consulting services across diverse industries. Our team of seasoned attorneys and consultants brings deep expertise in corporate law, regulatory compliance, litigation, and business strategy.",
    },
    {
      title: "Object",
      description:
        "Our objective is to provide integrated legal and consulting services that empower our clients to make informed decisions, reduce risks, and achieve sustainable growth. We aim to be a trusted partner by offering strategic guidance, legal precision, and personalized solutions tailored to each client's unique needs.",
    },
  ],
  services: [
    {
      id: 500001,
      title: "Business and Corporate Consulting",
      description:
        "Strategic support for business planning, development, and operational efficiency.",
      image:
        "https://cms-webserver-statics.s3.amazonaws.com/media/services/como_3.jpg",
    },
    {
      id: 500002,
      title: "Contract Drafting and Review",
      description:
        "Creation, negotiation, and analysis of commercial and legal agreements.",
      image:
        "https://cms-webserver-statics.s3.amazonaws.com/media/services/como_5.jpg",
    },
    {
      id: 500003,
      title: "Legal Advisory and Representation",
      description:
        "Comprehensive legal counsel and courtroom representation across multiple areas of law.",
      image:
        "https://cms-webserver-statics.s3.amazonaws.com/media/services/como._4.jpg",
    },
    {
      id: 500004,
      title: "Regulatory Compliance and Risk Management",
      description:
        "Guidance on legal regulations and frameworks to ensure full compliance and minimize liabilities.",
      image:
        "https://cms-webserver-statics.s3.amazonaws.com/media/services/como_6_.jpg",
    },
    {
      id: 500005,
      title: "Litigation and Dispute Resolution",
      description:
        "Professional handling of civil, commercial, and labor disputes, both in and out of court.",
      image:
        "https://cms-webserver-statics.s3.amazonaws.com/media/services/como_7_.jpg",
    },
    {
      id: 500006,
      title: "Labor and Employment Law Consulting",
      description:
        "Assistance with employment contracts, workplace policies, and labor dispute resolution.",
      image:
        "https://cms-webserver-statics.s3.amazonaws.com/media/services/como_8_.jpg",
    },
    {
      id: 500007,
      title: "Intellectual Property Protection",
      description:
        "Registration and defense of trademarks, patents, and copyrights.",
      image:
        "https://cms-webserver-statics.s3.amazonaws.com/media/services/como9_.jpg",
    },
  ],
  references: [
    {
      name: "Mariana Sosa",
      description:
        "Their legal expertise and strategic consulting have been invaluable to our company's growth. The team is professional, responsive, and always delivers practical solutions.",
      rating: 5,
      image: null,
    },
    {
      name: "Themis Cervantes,CEO",
      description:
        "We relied on their guidance for a complex merger, and their attention to detail and clear communication made the process smooth and successful.",
      rating: 5,
      image: null,
    },
    {
      name: "Emily T., Founder",
      description:
        "As a startup, we needed solid legal foundations and business advice. Their Startup Legal Toolkit and personalized consulting helped us launch confidently.",
      rating: 5,
      image: null,
    },
    {
      name: "Michael Boston, Operations Manager",
      description:
        "Their comprehensive compliance audits and risk assessments have helped us stay ahead of regulatory changes and avoid costly penalties.",
      rating: 5,
      image: null,
    },
    {
      name: "Sheila Dominguez",
      description:
        "Excellent service from a knowledgeable team. They handled our litigation case with professionalism and helped us achieve a favorable outcome.",
      rating: 5,
      image: null,
    },
  ],
  products: [
    {
      id: 860,
      name: "Contract Templates Bundle",
      category: "product",
      description:
        "The Contract Templates Bundle is a curated collection of professionally drafted legal agreements tailored to meet the needs of freelancers, entrepreneurs, small businesses, and consultants.",
      price: "599.99",
      stock: 100,
      content:
        "Includes a variety of essential business contracts such as,Service Agreement,Non-Disclosure Agreement (NDA),Independent Contractor Agreement,Employment Agreement,Sales Agreement\nConsulting Agreement,Partnership Agreement,Terms and Conditions,Privacy Policy.",
      product_type: "NORMAL",
      image:
        "https://cms-webserver-statics.s3.amazonaws.com/media/products/como_11.jpg",
      image2: null,
      image3: null,
    },
    {
      id: 859,
      name: "Business Formation Package",
      category: "product",
      description:
        "Includes entity registration, legal structure advice, and foundational corporate documents.",
      price: "499.99",
      stock: 100,
      content:
        "The Business Formation Package is a comprehensive service designed to help entrepreneurs and startups legally establish their business entities with ease and compliance. It includes all the essential components required to form and register a new company, ensuring that clients can focus on launching and growing their business while we handle the paperwork and legal requirements.",
      product_type: "NORMAL",
      image:
        "https://cms-webserver-statics.s3.amazonaws.com/media/products/como_10_.jpg",
      image2: null,
      image3: null,
    },
    {
      id: 861,
      name: "Compliance Audit Kit",
      category: "product",
      description:
        "The Compliance Audit Kit is a comprehensive toolkit designed to help businesses assess, monitor, and maintain compliance with relevant laws, regulations, and internal policies. Ideal for companies of all sizes, this kit provides step-by-step tools to conduct internal audits, identify risk areas, and implement corrective actions ensuring operational integrity and reducing legal exposure.",
      price: "799.99",
      stock: 100,
      content:
        "Audit Checklists,Step-by-Step Audit Guide,Policy Review Templates,Risk Assessment Tools,Worksheets and matrices to identify, rate, and prioritize potential compliance risks across business operations,Corrective Action Plan.",
      product_type: "NORMAL",
      image:
        "https://cms-webserver-statics.s3.amazonaws.com/media/products/como_12.jpg",
      image2: null,
      image3: null,
    },
    {
      id: 862,
      name: "Startup Legal Toolkit",
      category: "product",
      description:
        "The Startup Legal Toolkit is an all-in-one legal resource designed specifically for startups and early-stage entrepreneurs. It provides essential legal documents, templates, and guidance to help founders launch and operate their business legally, efficiently, and with confidence. This toolkit helps reduce legal risks, clarify business relationships, and establish a solid legal foundation from day one.",
      price: "899.99",
      stock: 100,
      content:
        "Business Entity Formation Guidance,Legal consultation to choose the right business structure (LLC, Corporation, etc.) and support with registration,Founders' Agreement Template Clearly outlines the roles, responsibilities, ownership percentages, and decision making processes between co founders.",
      product_type: "NORMAL",
      image:
        "https://cms-webserver-statics.s3.amazonaws.com/media/products/como_13_.jpg",
      image2: null,
      image3: null,
    },
    {
      id: 863,
      name: "Employee Handbook Drafting Service",
      category: "product",
      description: "Custom policy manuals tailored to labor laws and company culture.",
      price: "899.99",
      stock: 100,
      content:
        "Fully Customized Content,Covers Core Policy Areas,Legally Compliant,Written by HR experts or employment law professionals to ensure compliance with current labor laws and regulations,Easy to Understand,Editable Format Provided,Review and Consultation.",
      product_type: "NORMAL",
      image:
        "https://cms-webserver-statics.s3.amazonaws.com/media/products/como_14_.jpg",
      image2: null,
      image3: null,
    },
    {
      id: 864,
      name: "Intellectual Property Registration Pack",
      category: "product",
      description:
        "Covers trademark, copyright, or patent filing processes and legal support.",
      price: "999.99",
      stock: 100,
      content:
        "Trademark Registration Support,Includes guidance and document preparation for registering brand names, logos, and slogans with national or international IP offices (e.g., USPTO, EUIPO, IMPI),Preliminary trademark search to identify potential conflicts,Copyright Registration Services\nAssistance in registering original works such as software, artwork, writings, music, or digital content.\nPreparation of copyright application forms and required supporting documents.",
      product_type: "NORMAL",
      image:
        "https://cms-webserver-statics.s3.amazonaws.com/media/products/como_15_.jpg",
      image2: null,
      image3: null,
    },
    {
      id: 865,
      name: "Legal Risk Assessment Report",
      category: "product",
      description:
        "The Legal Risk Assessment Report is a thorough evaluation service that identifies potential legal risks within a business. It helps organizations proactively uncover vulnerabilities, assess compliance status, and develop strategies to mitigate legal exposure.",
      price: "1099.99",
      stock: 100,
      content:
        "Comprehensive Legal Risk Analysis,Review of contracts, corporate policies, compliance with laws, and operational practices to detect legal risks,Industry Specific Evaluation,Tailored analysis based on the sector's regulatory environment and business model,Risk Prioritization,Categorization of risks by severity and likelihood to focus on critical issues.",
      product_type: "NORMAL",
      image:
        "https://cms-webserver-statics.s3.amazonaws.com/media/products/como_16.jpg",
      image2: null,
      image3: null,
    },
    {
      id: 866,
      name: "Due Diligence Report Service",
      category: "product",
      description:
        "The Due Diligence Report Service offers a comprehensive investigation and analysis of a company, asset, or transaction to assess its legal, financial, and operational risks. This service is crucial for investors, buyers, and partners seeking to make informed decisions by verifying facts, uncovering liabilities, and evaluating compliance before closing deals or investments.",
      price: "899.99",
      stock: 100,
      content:
        "Thorough Legal Review,Examination of corporate documents, contracts, licenses, regulatory compliance, intellectual property, litigation history, and other legal aspects,Financial Analysis,Assessment of financial statements, liabilities, debts, tax compliance, and cash flow health.\nOperational Assessment,Review of business operations, key personnel, supply chain, and organizational structure.",
      product_type: "NORMAL",
      image:
        "https://cms-webserver-statics.s3.amazonaws.com/media/products/como_17_.jpg",
      image2: null,
      image3: null,
    },
  ],
  categories: [] as string[],
};

export const footerData = [
  { href: "/pdf/AP.pdf", label: "Privacy" },
  { href: "/pdf/TYC.pdf", label: "Terms" },
];
