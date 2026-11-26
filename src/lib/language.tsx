"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "es";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en) => string;
};

const translations = {
  en: {
    // Header / nav
    navAbout: "About",
    navServices: "Services",
    navProducts: "Products",
    navProcess: "Process",
    navTestimonials: "Testimonials",
    navContact: "Contact",
    goToCart: "Go to Cart",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    shoppingCart: "Shopping Cart",
    languageLabel: "Language",

    // Hero (dataSite.subtitle / description, real copy from Hero.js)
    heroEyebrow: "Legal & Business Consulting",
    heroCtaPrimary: "Contact us now",
    heroCtaSecondary: "Know us",

    // Features band (legacy LegalFeatures.js — real copy, not in dataSite)
    featuresEyebrow: "Why Clients Rely on Us",
    featuresHeading: "Counsel built for when it matters most.",

    // About (legacy AboutLegalFirm.js — real copy, not in dataSite)
    aboutEyebrow: "About us",
    aboutHeading:
      "We are committed to providing strategic, professional, and dedicated legal services when you need them most.",
    aboutParagraph:
      "With a focus on diligence, efficiency, and advanced legal strategy, we bridge the gap between complex challenges and clear resolutions. Whether it's a critical corporate negotiation, a personal legal matter, or complex litigation.",
    aboutCta: "Schedule a Consultation",

    // Firm profile / "at a glance" (dataSite.info, 5 real items: Values,
    // Clients, Specialty areas, Experience, Object — present in the legacy
    // data but unused by any legacy component)
    infoEyebrow: "Who We Are",
    infoHeading: "The Firm at a Glance",

    // Services (dataSite.services, 7 real items)
    servicesEyebrow: "We provide a comprehensive range of legal services.",
    servicesHeading: "Our Legal & Consulting Services",

    // Products (dataSite.products, a mix of legal products and services)
    productsHeading: "Our Legal Products & Services",
    productsParagraph: "Essential legal solutions, available instantly.",
    addToCart: "Add to Cart",
    removeFromCart: "Remove from Cart",
    fileLabel: "File",

    // Process (legacy OurProcess.js — real copy, not in dataSite; the
    // legacy "Dial (316) 555-0116" placeholder phone is replaced with the
    // real dataSite.telephone, see step 1 content below)
    processEyebrow:
      "When a legal challenge arises, every second counts. Here's how our consultancy ensures you get the help you need, fast and efficiently.",
    processHeading: "How We Work",

    // Testimonials (dataSite.references, 5 real items)
    testimonialsEyebrow: "Testimonials",
    testimonialsHeading:
      "Don't take our word for it! Hear it from our clients.",

    // Contact section (home) + contact page
    contactTitle: "Request a confidential consultation.",
    contactDescription:
      "Tell us about your matter, your company, or the regulatory question you're facing. Our team responds within one business day.",
    discussSituation: "Get in Touch",
    contactPageHeading: "Let's talk about your matter.",
    contactPageSubheading:
      "Tell us about the legal or business challenge you're facing, a product you'd like to order, or a consultation you'd like to schedule.",
    contactSendHeading: "Send us the details",
    formName: "Your name",
    formNamePlaceholder: "Your full name",
    formEmail: "Email",
    formEmailPlaceholder: "you@email.com",
    formMessage: "How can we help?",
    formMessagePlaceholder: "Tell us about your matter.",
    formSubmit: "Send message",
    formNameError: "Name must be at least 2 characters.",
    formEmailError: "Please enter a valid email address.",
    formMessageError: "Message must be at least 10 characters.",
    toastSuccessTitle: "Message sent!",
    toastSuccessDescription:
      "Thank you for reaching out. We'll be in touch soon.",
    toastErrorTitle: "Something went wrong.",
    toastErrorDescription:
      "There was a problem with your request. Please try again.",
    phoneLabel: "Phone",
    emailLabel: "Email",
    addressLabel: "Address",

    // Footer
    footerDescription:
      "Legal and business consulting for corporations, entrepreneurs, and individuals — from business formation and contracts to compliance, litigation, and strategic growth.",
    quickLinks: "Quick Links",
    aboutUs: "About",
    termsOfService: "Terms",
    privacyPolicy: "Privacy",
    paymentMethods: "Payment methods",
    allRightsReserved: "All rights reserved.",
  },
  es: {
    // Header / nav
    navAbout: "Nosotros",
    navServices: "Servicios",
    navProducts: "Productos",
    navProcess: "Proceso",
    navTestimonials: "Testimonios",
    navContact: "Contacto",
    goToCart: "Ir al carrito",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    shoppingCart: "Carrito de compras",
    languageLabel: "Idioma",

    // Hero
    heroEyebrow: "Consultoría Legal y de Negocios",
    heroCtaPrimary: "Contáctanos ahora",
    heroCtaSecondary: "Conócenos",

    // Features
    featuresEyebrow: "Por Qué Confían en Nosotros",
    featuresHeading: "Asesoría legal para cuando más importa.",

    // About
    aboutEyebrow: "Nosotros",
    aboutHeading:
      "Estamos comprometidos a brindar servicios legales estratégicos, profesionales y dedicados cuando más los necesitas.",
    aboutParagraph:
      "Con un enfoque en la diligencia, la eficiencia y una estrategia legal avanzada, cerramos la brecha entre los retos complejos y las soluciones claras. Ya sea una negociación corporativa crítica, un asunto legal personal o un litigio complejo.",
    aboutCta: "Programa una Consulta",

    // Firm profile
    infoEyebrow: "Quiénes Somos",
    infoHeading: "El Despacho en una Mirada",

    // Services
    servicesEyebrow: "Ofrecemos una gama integral de servicios legales.",
    servicesHeading: "Nuestros Servicios Legales y de Consultoría",

    // Products
    productsHeading: "Nuestros Productos y Servicios Legales",
    productsParagraph:
      "Soluciones legales esenciales, disponibles al instante.",
    addToCart: "Agregar al carrito",
    removeFromCart: "Quitar del carrito",
    fileLabel: "Expediente",

    // Process
    processEyebrow:
      "Cuando surge un reto legal, cada segundo cuenta. Así es como nuestra consultoría te brinda la ayuda que necesitas, de forma rápida y eficiente.",
    processHeading: "Cómo Trabajamos",

    // Testimonials
    testimonialsEyebrow: "Testimonios",
    testimonialsHeading:
      "¡No solo confíes en nuestra palabra! Escúchalo de nuestros clientes.",

    // Contact
    contactTitle: "Solicita una consulta confidencial.",
    contactDescription:
      "Cuéntanos sobre tu asunto, tu empresa o la duda regulatoria que enfrentas. Nuestro equipo responde en menos de un día hábil.",
    discussSituation: "Contáctanos",
    contactPageHeading: "Hablemos de tu asunto.",
    contactPageSubheading:
      "Cuéntanos sobre el reto legal o de negocios que enfrentas, un producto que quieras pedir o una consulta que te gustaría programar.",
    contactSendHeading: "Envíanos los detalles",
    formName: "Tu nombre",
    formNamePlaceholder: "Tu nombre completo",
    formEmail: "Correo electrónico",
    formEmailPlaceholder: "tucorreo@email.com",
    formMessage: "¿Cómo podemos ayudarte?",
    formMessagePlaceholder: "Cuéntanos sobre tu asunto.",
    formSubmit: "Enviar mensaje",
    formNameError: "El nombre debe tener al menos 2 caracteres.",
    formEmailError: "Ingresa un correo electrónico válido.",
    formMessageError: "El mensaje debe tener al menos 10 caracteres.",
    toastSuccessTitle: "¡Mensaje enviado!",
    toastSuccessDescription:
      "Gracias por contactarnos. Te responderemos pronto.",
    toastErrorTitle: "Algo salió mal.",
    toastErrorDescription:
      "Hubo un problema con tu solicitud. Inténtalo de nuevo.",
    phoneLabel: "Teléfono",
    emailLabel: "Correo",
    addressLabel: "Dirección",

    // Footer
    footerDescription:
      "Consultoría legal y de negocios para corporaciones, emprendedores e individuos: desde la formación de empresas y contratos hasta cumplimiento, litigio y crecimiento estratégico.",
    quickLinks: "Enlaces rápidos",
    aboutUs: "Nosotros",
    termsOfService: "Términos",
    privacyPolicy: "Privacidad",
    paymentMethods: "Métodos de pago",
    allRightsReserved: "Todos los derechos reservados.",
  },
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Consultoradmin's raw data is natively English (same direction as
  // Homelon2/Montero); default to English and let visitors switch to
  // Spanish.
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("consultoradmin-language");
    if (stored === "en" || stored === "es") setLanguageState(stored);
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("consultoradmin-language", nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: (key) => translations[language][key] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

// Product names and descriptions translated to Spanish, keyed by product id.
export const productSpanish: Record<
  number,
  { name: string; description: string }
> = {
  624187286: {
    name: "Programa de Prevención de Riesgos Legales",
    description:
      "Programa especializado en identificar, evaluar y prevenir riesgos legales para personas y empresas. Incluye un análisis de posibles contingencias legales, recomendaciones preventivas y estrategias para minimizar disputas, proteger intereses y fortalecer la certeza jurídica.",
  },
  890301437: {
    name: "Seguimiento de Asuntos Corporativos",
    description:
      "Los abogados de esta organización dan seguimiento diario y oportuno a cada asunto mediante las plataformas o sistemas adecuados para cada caso.",
  },
  2088610853: {
    name: "Kit Legal para Startups",
    description:
      "El Kit Legal para Startups es un recurso integral diseñado específicamente para startups y emprendedores en etapa inicial. Proporciona documentos legales esenciales, plantillas y orientación para ayudar a los fundadores a lanzar y operar su negocio de forma legal, eficiente y con confianza. Ayuda a reducir riesgos legales, aclarar relaciones comerciales y establecer una base legal sólida desde el primer día.",
  },
  91784385: {
    name: "Paquete de Constitución de Empresa",
    description:
      "Incluye el registro de la entidad, asesoría sobre la estructura legal y documentos corporativos fundamentales.",
  },
  1748789990: {
    name: "Paquete de Plantillas de Contratos",
    description:
      "El Paquete de Plantillas de Contratos es una colección seleccionada de acuerdos legales redactados profesionalmente para freelancers, emprendedores, pequeñas empresas y consultores.",
  },
  51985886: {
    name: "Kit de Auditoría de Cumplimiento",
    description:
      "El Kit de Auditoría de Cumplimiento es un conjunto integral de herramientas para ayudar a las empresas a evaluar, monitorear y mantener el cumplimiento de las leyes, regulaciones y políticas internas aplicables. Es ideal para empresas de cualquier tamaño y ofrece herramientas paso a paso para realizar auditorías internas, identificar áreas de riesgo e implementar acciones correctivas, asegurando la integridad operativa y reduciendo la exposición legal.",
  },
  267438488: {
    name: "Reporte de Evaluación de Riesgos Legales",
    description:
      "El Reporte de Evaluación de Riesgos Legales es un servicio de evaluación exhaustiva que identifica posibles riesgos legales en una empresa. Ayuda a las organizaciones a detectar vulnerabilidades de forma proactiva, evaluar su situación de cumplimiento y desarrollar estrategias para mitigar la exposición legal.",
  },
  751973037: {
    name: "Servicio de Redacción de Manual del Empleado",
    description:
      "Manuales de políticas personalizados, adaptados a las leyes laborales y a la cultura de la empresa.",
  },
  76519426: {
    name: "Revisión y Análisis de Contratos por Hora",
    description:
      "Revisión de cláusulas clave y elaboración de una estrategia previa al juicio.",
  },
  819581846: {
    name: "Servicio de Reporte de Debida Diligencia",
    description:
      "El Servicio de Reporte de Debida Diligencia ofrece una investigación y análisis integral de una empresa, activo o transacción para evaluar sus riesgos legales, financieros y operativos. Es fundamental para inversionistas, compradores y socios que buscan tomar decisiones informadas mediante la verificación de hechos, la detección de responsabilidades y la evaluación del cumplimiento antes de cerrar acuerdos o inversiones.",
  },
  748100074: {
    name: "Paquete de Registro de Propiedad Intelectual",
    description:
      "Cubre los procesos de registro de marcas, derechos de autor o patentes, con el respaldo legal correspondiente.",
  },
  308597835: {
    name: "Acceso a un Expediente",
    description:
      "Se consulta el expediente del caso en el juzgado correspondiente.",
  },
  158175692: {
    name: "Redacción del Preámbulo de un Documento",
    description:
      "Consiste en estructurar el inicio de un documento para que se desarrolle de manera más efectiva.",
  },
};

export const legacyProductSpanish: Record<
  number,
  { name: string; description: string }
> = {
  860: {
    name: "Paquete de Plantillas de Contratos",
    description:
      "El Paquete de Plantillas de Contratos es una colección curada de acuerdos legales redactados profesionalmente, diseñada para freelancers, emprendedores, pequeñas empresas y consultores.",
  },
  859: {
    name: "Paquete de Formación de Empresa",
    description:
      "Incluye registro de la entidad, asesoría sobre la estructura legal y documentos corporativos fundamentales.",
  },
  861: {
    name: "Kit de Auditoría de Cumplimiento",
    description:
      "El Kit de Auditoría de Cumplimiento es un conjunto de herramientas integral diseñado para ayudar a las empresas a evaluar, monitorear y mantener el cumplimiento de las leyes, regulaciones y políticas internas aplicables. Ideal para empresas de cualquier tamaño, este kit ofrece herramientas paso a paso para realizar auditorías internas, identificar áreas de riesgo e implementar acciones correctivas, asegurando la integridad operativa y reduciendo la exposición legal.",
  },
  862: {
    name: "Kit Legal para Startups",
    description:
      "El Kit Legal para Startups es un recurso legal integral diseñado específicamente para startups y emprendedores en etapa inicial. Proporciona documentos legales esenciales, plantillas y orientación para ayudar a los fundadores a lanzar y operar su negocio de forma legal, eficiente y con confianza. Este kit ayuda a reducir riesgos legales, clarificar relaciones comerciales y establecer una base legal sólida desde el primer día.",
  },
  863: {
    name: "Servicio de Redacción de Manual del Empleado",
    description:
      "Manuales de políticas personalizados, adaptados a las leyes laborales y a la cultura de tu empresa.",
  },
  864: {
    name: "Paquete de Registro de Propiedad Intelectual",
    description:
      "Cubre los procesos de registro de marcas, derechos de autor o patentes, con el respaldo legal correspondiente.",
  },
  865: {
    name: "Reporte de Evaluación de Riesgo Legal",
    description:
      "El Reporte de Evaluación de Riesgo Legal es una evaluación exhaustiva que identifica los riesgos legales potenciales dentro de una empresa. Ayuda a las organizaciones a detectar proactivamente vulnerabilidades, evaluar su estado de cumplimiento y desarrollar estrategias para mitigar la exposición legal.",
  },
  866: {
    name: "Servicio de Reporte de Debida Diligencia",
    description:
      "El Servicio de Reporte de Debida Diligencia ofrece una investigación y análisis integral de una empresa, activo o transacción, para evaluar sus riesgos legales, financieros y operativos. Este servicio es crucial para inversionistas, compradores y socios que buscan tomar decisiones informadas al verificar hechos, descubrir pasivos y evaluar el cumplimiento antes de cerrar acuerdos o inversiones.",
  },
};

export const serviceSpanish: Record<
  number,
  { title: string; description: string }
> = {
  500001: {
    title: "Consultoría Empresarial y Corporativa",
    description:
      "Apoyo estratégico para la planeación, el desarrollo y la eficiencia operativa de tu negocio.",
  },
  500002: {
    title: "Redacción y Revisión de Contratos",
    description:
      "Creación, negociación y análisis de acuerdos comerciales y legales.",
  },
  500003: {
    title: "Asesoría y Representación Legal",
    description:
      "Asesoría legal integral y representación en tribunales en múltiples áreas del derecho.",
  },
  500004: {
    title: "Cumplimiento Regulatorio y Gestión de Riesgos",
    description:
      "Orientación sobre regulaciones y marcos legales para asegurar el pleno cumplimiento y minimizar responsabilidades.",
  },
  500005: {
    title: "Litigio y Resolución de Disputas",
    description:
      "Manejo profesional de disputas civiles, comerciales y laborales, tanto dentro como fuera de los tribunales.",
  },
  500006: {
    title: "Consultoría en Derecho Laboral",
    description:
      "Asistencia con contratos laborales, políticas del lugar de trabajo y resolución de disputas laborales.",
  },
  500007: {
    title: "Protección de Propiedad Intelectual",
    description: "Registro y defensa de marcas, patentes y derechos de autor.",
  },
};

// dataSite.info translated (index-keyed: 0 Values, 1 Clients, 2 Specialty
// areas, 3 Experience, 4 Object).
export const infoSpanish: Record<
  number,
  { title: string; description: string }
> = {
  0: {
    title: "Valores",
    description:
      "Integridad: mantenemos los más altos estándares éticos en cada asunto legal y de consultoría. Enfoque centrado en el cliente: tus objetivos guían nuestra estrategia; tu éxito es nuestra prioridad. Excelencia: entregamos soluciones precisas y orientadas a resultados, respaldadas por experiencia profunda y compromiso con la calidad.",
  },
  1: {
    title: "Clientes",
    description:
      "Corporaciones y empresas, pequeñas y medianas empresas, startups y emprendedores, organizaciones sin fines de lucro, personas físicas, entidades gubernamentales e instituciones públicas.",
  },
  2: {
    title: "Áreas de especialidad",
    description:
      "Derecho corporativo y comercial, cumplimiento regulatorio y gestión de riesgos, redacción y negociación de contratos, derecho laboral, propiedad intelectual, litigio y resolución de disputas, consultoría fiscal y financiera, derecho inmobiliario y de propiedad.",
  },
  3: {
    title: "Experiencia",
    description:
      "Con más de 15 años de práctica profesional, nuestro despacho ha construido una sólida reputación por ofrecer servicios legales y de consultoría confiables en diversas industrias. Nuestro equipo de abogados y consultores con amplia trayectoria aporta un profundo conocimiento en derecho corporativo, cumplimiento regulatorio, litigio y estrategia de negocios.",
  },
  4: {
    title: "Objetivo",
    description:
      "Nuestro objetivo es brindar servicios legales y de consultoría integrados que permitan a nuestros clientes tomar decisiones informadas, reducir riesgos y lograr un crecimiento sostenible. Buscamos ser un socio de confianza ofreciendo orientación estratégica, precisión legal y soluciones personalizadas adaptadas a las necesidades particulares de cada cliente.",
  },
};

// dataSite.references translated (index-keyed, same 5 testimonials/order;
// names are proper nouns and are kept as in the source).
export const referenceSpanish: Record<number, { description: string }> = {
  0: {
    description:
      "Su experiencia legal y consultoría estratégica han sido invaluables para el crecimiento de nuestra empresa. El equipo es profesional, receptivo y siempre entrega soluciones prácticas.",
  },
  1: {
    description:
      "Confiamos en su asesoría para una fusión compleja, y su atención al detalle y comunicación clara hicieron que el proceso fuera fluido y exitoso.",
  },
  2: {
    description:
      "Como startup, necesitábamos bases legales sólidas y asesoría de negocios. Su Kit Legal para Startups y su consultoría personalizada nos ayudaron a lanzar con confianza.",
  },
  3: {
    description:
      "Sus auditorías de cumplimiento integrales y evaluaciones de riesgo nos han ayudado a mantenernos al día frente a los cambios regulatorios y evitar sanciones costosas.",
  },
  4: {
    description:
      "Excelente servicio de un equipo muy capacitado. Manejaron nuestro caso de litigio con profesionalismo y nos ayudaron a lograr un resultado favorable.",
  },
};

// Features band (legacy LegalFeatures.js — real copy, not sourced from
// dataSite). Icon assignment stays in the component, indexed to this array.
export const featuresItems: Record<
  Language,
  { title: string; description: string }[]
> = {
  en: [
    {
      title: "24/7 Expert Counsel",
      description:
        "Our team is always on standby, ready to respond to critical legal inquiries anytime, day or night.",
    },
    {
      title: "Strategic & Swift Response",
      description:
        "We ensure rapid and strategic action, providing critical advice when every second counts for your case.",
    },
    {
      title: "Specialized Legal Team",
      description:
        "Our attorneys deliver top-tier legal assistance with specialized knowledge and unwavering precision.",
    },
    {
      title: "Data-Driven Strategy",
      description:
        "Equipped with state-of-the-art legal tech, we bring a modern, evidence-based approach directly to you.",
    },
  ],
  es: [
    {
      title: "Asesoría Experta 24/7",
      description:
        "Nuestro equipo siempre está disponible, listo para responder a consultas legales críticas en cualquier momento, de día o de noche.",
    },
    {
      title: "Respuesta Estratégica y Ágil",
      description:
        "Garantizamos una acción rápida y estratégica, brindando asesoría crítica cuando cada segundo cuenta para tu caso.",
    },
    {
      title: "Equipo Legal Especializado",
      description:
        "Nuestros abogados brindan asistencia legal de primer nivel con conocimiento especializado y precisión inquebrantable.",
    },
    {
      title: "Estrategia Basada en Datos",
      description:
        "Equipados con tecnología legal de última generación, llevamos un enfoque moderno y basado en evidencia directamente a ti.",
    },
  ],
};

// About principles (legacy AboutLegalFirm.js — real copy, not sourced from
// dataSite).
export const aboutPrinciples: Record<
  Language,
  { number: string; text: string }[]
> = {
  en: [
    { number: "01.", text: "Diligence & Reliability" },
    { number: "02.", text: "Dedication & Client Care" },
    { number: "03.", text: "Excellence & Professionalism" },
    { number: "04.", text: "Innovation & Strategy" },
  ],
  es: [
    { number: "01.", text: "Diligencia y Confiabilidad" },
    { number: "02.", text: "Dedicación y Cuidado del Cliente" },
    { number: "03.", text: "Excelencia y Profesionalismo" },
    { number: "04.", text: "Innovación y Estrategia" },
  ],
};

// Process steps (legacy OurProcess.js — real copy, not sourced from
// dataSite). Step 1 originally referenced a generic placeholder phone
// number "(316) 555-0116"; replaced here with the real dataSite.telephone
// via a template token consumed by the component, not a hardcoded fake
// number.
export const processSteps: Record<
  Language,
  { number: string; title: string; description: string }[]
> = {
  en: [
    {
      number: "01.",
      title: "Initial Consultation",
      description:
        "Call us or contact us online. Our trained team will assess your situation, gather details, and schedule your confidential legal consultation.",
    },
    {
      number: "02.",
      title: "Case Assessment & Strategy",
      description:
        "Our legal team is deployed immediately. With strategically developed frameworks and data-driven insights, we build a tailored strategy for your case.",
    },
    {
      number: "03.",
      title: "Action & Implementation",
      description:
        "If further legal action is required, we proceed with precision, whether it involves negotiation, drafting documents, or filing motions, while keeping you informed.",
    },
    {
      number: "04.",
      title: "Ongoing Communication",
      description:
        "We ensure a seamless flow of information, providing regular updates and reports to you and your team, guiding you on the next steps.",
    },
    {
      number: "05.",
      title: "Review & Adaptation",
      description:
        "We provide continuous oversight and adapt our strategy as the case evolves, ensuring the approach remains effective for a successful outcome.",
    },
    {
      number: "06.",
      title: "Resolution & Finalization",
      description:
        "We ensure a smooth handover at case completion, offering post-resolution guidance and ensuring all legal matters are formally concluded.",
    },
  ],
  es: [
    {
      number: "01.",
      title: "Consulta Inicial",
      description:
        "Llámanos o contáctanos en línea. Nuestro equipo capacitado evaluará tu situación, reunirá los detalles y programará tu consulta legal confidencial.",
    },
    {
      number: "02.",
      title: "Evaluación del Caso y Estrategia",
      description:
        "Nuestro equipo legal se activa de inmediato. Con marcos de trabajo desarrollados estratégicamente y análisis basados en datos, construimos una estrategia a la medida de tu caso.",
    },
    {
      number: "03.",
      title: "Acción e Implementación",
      description:
        "Si se requiere una acción legal adicional, procedemos con precisión, ya sea mediante negociación, redacción de documentos o presentación de mociones, manteniéndote siempre informado.",
    },
    {
      number: "04.",
      title: "Comunicación Continua",
      description:
        "Garantizamos un flujo de información fluido, con actualizaciones y reportes regulares para ti y tu equipo, guiándote en los próximos pasos.",
    },
    {
      number: "05.",
      title: "Revisión y Adaptación",
      description:
        "Brindamos supervisión continua y adaptamos nuestra estrategia conforme el caso evoluciona, asegurando que el enfoque siga siendo eficaz para lograr un resultado exitoso.",
    },
    {
      number: "06.",
      title: "Resolución y Finalización",
      description:
        "Garantizamos una transición fluida al concluir el caso, ofreciendo orientación posterior a la resolución y asegurando que todos los asuntos legales queden formalmente concluidos.",
    },
  ],
};
