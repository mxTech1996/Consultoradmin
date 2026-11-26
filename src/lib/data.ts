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
      id: 624187286,
      name: "Legal Risk Prevention Programme",
      category: "product",
      description:
        "A programme specialising in the identification, assessment and prevention of legal risks for individuals and businesses. It includes an analysis of potential legal contingencies, preventative recommendations and strategies to minimise legal disputes, protect interests and strengthen legal certainty.",
      price: "45",
      stock: 100,
      content: "",
      contentList: [],
      product_type: "NORMAL",
      image:
        "https://firebasestorage.googleapis.com/v0/b/studio-7228882240-381f4.firebasestorage.app/o/users%2Fw4oe6wkce3accA6Pre774sAN8Ah1%2Fsitios%2F7QOZdUvR65oA6LEeo28V%2Fproducts%2Fnew_1795721576530_pexels-mizunokozuki-12903124.jpg?alt=media&token=a90ca2b2-8754-4060-9a71-075a4503ef90",
      image2: null,
      image3: null,
    },
    {
      id: 890301437,
      name: "Follow up on corporate matters",
      category: "product",
      description:
        "The lawyers at this organisation monitor each matter promptly on a daily basis using platforms or systems appropriate to the matter in question.",
      price: "50",
      stock: 100,
      content: "",
      contentList: [],
      product_type: "NORMAL",
      image:
        "https://firebasestorage.googleapis.com/v0/b/studio-7228882240-381f4.firebasestorage.app/o/users%2Fw4oe6wkce3accA6Pre774sAN8Ah1%2Fsitios%2F7QOZdUvR65oA6LEeo28V%2Fproducts%2Fnew_1795719781644_pexels-kampus-8463163.jpg?alt=media&token=fc304ad5-8633-4cdd-89a6-e9c3fd555189",
      image2: null,
      image3: null,
    },
    {
      id: 2088610853,
      name: "Startup Legal Toolkit",
      category: "product",
      description:
        "The Startup Legal Toolkit is an all-in-one legal resource designed specifically for startups and early-stage entrepreneurs. It provides essential legal documents, templates, and guidance to help founders launch and operate their business legally, efficiently, and with confidence. This toolkit helps reduce legal risks, clarify business relationships, and establish a solid legal foundation from day one.",
      price: "900",
      stock: 100,
      content: "",
      contentList: [],
      product_type: "NORMAL",
      image:
        "https://firebasestorage.googleapis.com/v0/b/studio-7228882240-381f4.firebasestorage.app/o/users%2Fw4oe6wkce3accA6Pre774sAN8Ah1%2Fsitios%2F7QOZdUvR65oA6LEeo28V%2Fproducts%2Fnew_1795719148590_como_13_.jpg?alt=media&token=11ea859e-681c-4834-9d72-864a6fff9ea2",
      image2: null,
      image3: null,
    },
    {
      id: 91784385,
      name: "Business Formation Package",
      category: "product",
      description:
        "Includes entity registration, legal structure advice, and foundational corporate documents.",
      price: "500",
      stock: 100,
      content: "",
      contentList: [],
      product_type: "NORMAL",
      image:
        "https://firebasestorage.googleapis.com/v0/b/studio-7228882240-381f4.firebasestorage.app/o/users%2Fw4oe6wkce3accA6Pre774sAN8Ah1%2Fsitios%2F7QOZdUvR65oA6LEeo28V%2Fproducts%2Fnew_1795718989643_como_10_.jpg?alt=media&token=a2a37e46-3d30-4057-ada1-2666143e3192",
      image2: null,
      image3: null,
    },
    {
      id: 1748789990,
      name: "Contract Templates Bundle",
      category: "product",
      description:
        "The Contract Templates Bundle is a curated collection of professionally drafted legal agreements, tailored to meet the needs of freelancers, entrepreneurs, small businesses, and consultants.",
      price: "600",
      stock: 100,
      content: "",
      contentList: [],
      product_type: "NORMAL",
      image:
        "https://firebasestorage.googleapis.com/v0/b/studio-7228882240-381f4.firebasestorage.app/o/users%2Fw4oe6wkce3accA6Pre774sAN8Ah1%2Fsitios%2F7QOZdUvR65oA6LEeo28V%2Fproducts%2Fnew_1795718909608_como_11.jpg?alt=media&token=e7e3822c-a78a-4eba-a3b6-932079381f37",
      image2: null,
      image3: null,
    },
    {
      id: 51985886,
      name: "Compliance Audit Kit",
      category: "product",
      description:
        "The Compliance Audit Kit is a comprehensive toolkit designed to help businesses assess, monitor, and maintain compliance with relevant laws, regulations, and internal policies. Ideal for companies of all sizes, this kit provides step-by-step tools to conduct internal audits, identify risk areas, and implement corrective actions ensuring operational integrity and reducing legal exposure.",
      price: "800",
      stock: 100,
      content: "",
      contentList: [],
      product_type: "NORMAL",
      image:
        "https://firebasestorage.googleapis.com/v0/b/studio-7228882240-381f4.firebasestorage.app/o/users%2Fw4oe6wkce3accA6Pre774sAN8Ah1%2Fsitios%2F7QOZdUvR65oA6LEeo28V%2Fproducts%2Fnew_1795719090773_como_12.jpg?alt=media&token=1d6757ef-97e0-459b-849b-38a4550f1b50",
      image2: null,
      image3: null,
    },
    {
      id: 267438488,
      name: "Legal Risk Assessment Report",
      category: "product",
      description:
        "The Legal Risk Assessment Report is a thorough evaluation service that identifies potential legal risks within a business. It helps organizations proactively uncover vulnerabilities, assess compliance status, and develop strategies to mitigate legal exposure.",
      price: "1100",
      stock: 100,
      content: "",
      contentList: [],
      product_type: "NORMAL",
      image:
        "https://firebasestorage.googleapis.com/v0/b/studio-7228882240-381f4.firebasestorage.app/o/users%2Fw4oe6wkce3accA6Pre774sAN8Ah1%2Fsitios%2F7QOZdUvR65oA6LEeo28V%2Fproducts%2Fnew_1795719327058_como_16.jpg?alt=media&token=63ebad92-c53a-47c0-a23d-c98d3f79bcc9",
      image2: null,
      image3: null,
    },
    {
      id: 751973037,
      name: "Employee Handbook Drafting Service",
      category: "product",
      description:
        "Custom policy manuals tailored to labor laws and company culture.",
      price: "900",
      stock: 100,
      content: "",
      contentList: [],
      product_type: "NORMAL",
      image:
        "https://firebasestorage.googleapis.com/v0/b/studio-7228882240-381f4.firebasestorage.app/o/users%2Fw4oe6wkce3accA6Pre774sAN8Ah1%2Fsitios%2F7QOZdUvR65oA6LEeo28V%2Fproducts%2Fnew_1795719230988_como_14_.jpg?alt=media&token=983ac220-a24f-44aa-bad3-bb94b517e3d1",
      image2: null,
      image3: null,
    },
    {
      id: 76519426,
      name: "Contract Review and Analysis for hour",
      category: "product",
      description:
        "Review of key clauses and development of a pre-trial strategy",
      price: "25",
      stock: 100,
      content: "",
      contentList: [],
      product_type: "NORMAL",
      image:
        "https://firebasestorage.googleapis.com/v0/b/studio-7228882240-381f4.firebasestorage.app/o/users%2Fw4oe6wkce3accA6Pre774sAN8Ah1%2Fsitios%2F7QOZdUvR65oA6LEeo28V%2Fproducts%2Fnew_1795720357424_pexels-man98-6314604.jpg?alt=media&token=82d9afc9-e2a1-46b4-80d0-b9e2113df25f",
      image2: null,
      image3: null,
    },
    {
      id: 819581846,
      name: "Due Diligence Report Service",
      category: "product",
      description:
        "The Due Diligence Report Service offers a comprehensive investigation and analysis of a company, asset, or transaction to assess its legal, financial, and operational risks. This service is crucial for investors, buyers, and partners seeking to make informed decisions by verifying facts, uncovering liabilities, and evaluating compliance before closing deals or investments.",
      price: "900",
      stock: 100,
      content: "",
      contentList: [],
      product_type: "NORMAL",
      image:
        "https://firebasestorage.googleapis.com/v0/b/studio-7228882240-381f4.firebasestorage.app/o/users%2Fw4oe6wkce3accA6Pre774sAN8Ah1%2Fsitios%2F7QOZdUvR65oA6LEeo28V%2Fproducts%2Fnew_1795719371930_como_17_.jpg?alt=media&token=770ac046-7643-4453-9c98-90430b2ba01b",
      image2: null,
      image3: null,
    },
    {
      id: 748100074,
      name: "Intellectual Property Registration Pack",
      category: "product",
      description:
        "Covers trademark, copyright, or patent filing processes and legal support.",
      price: "1000",
      stock: 100,
      content: "",
      contentList: [],
      product_type: "NORMAL",
      image:
        "https://firebasestorage.googleapis.com/v0/b/studio-7228882240-381f4.firebasestorage.app/o/users%2Fw4oe6wkce3accA6Pre774sAN8Ah1%2Fsitios%2F7QOZdUvR65oA6LEeo28V%2Fproducts%2Fnew_1795719275520_como_15_.jpg?alt=media&token=45febdd2-c807-46d2-9b5f-7bd84c5f438d",
      image2: null,
      image3: null,
    },
    {
      id: 308597835,
      name: "Access to a file",
      category: "product",
      description: "The case file is examined at the relevant court",
      price: "20",
      stock: 100,
      content: "",
      contentList: [],
      product_type: "NORMAL",
      image:
        "https://firebasestorage.googleapis.com/v0/b/studio-7228882240-381f4.firebasestorage.app/o/users%2Fw4oe6wkce3accA6Pre774sAN8Ah1%2Fsitios%2F7QOZdUvR65oA6LEeo28V%2Fproducts%2Fnew_1795719975865_pexels-mibernaa-28948052%20(1).jpg?alt=media&token=e8e83120-272d-486b-9769-9411d8558160",
      image2: null,
      image3: null,
    },
    {
      id: 158175692,
      name: "Drafting the preamble to a document",
      category: "product",
      description:
        "It involves structuring the beginning of a document to ensure it is carried out more effectively",
      price: "30",
      stock: 100,
      content: "",
      contentList: [],
      product_type: "NORMAL",
      image:
        "https://firebasestorage.googleapis.com/v0/b/studio-7228882240-381f4.firebasestorage.app/o/users%2Fw4oe6wkce3accA6Pre774sAN8Ah1%2Fsitios%2F7QOZdUvR65oA6LEeo28V%2Fproducts%2Fnew_1795720190132_pexels-ekaterina-bolovtsova-6077587.jpg?alt=media&token=d47b804f-f0ba-498f-906c-311dc631eca1",
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
