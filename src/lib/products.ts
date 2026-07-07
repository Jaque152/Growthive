export interface ProductPlan {
  id: string;
  priceMXN: number;
  taxIncluded: boolean;
  currency: string;
  imageUrl: string;
  es: {
    name: string;
    description: string;
    features: string[];
  };
  en: {
    name: string;
    description: string;
    features: string[];
  };
}

export const webPlans: ProductPlan[] = [
  {
    id: 'plan-web-restaurantes',
    priceMXN: 19390.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Web para Restaurantes',
      description: 'Menú digital, sistema de reservaciones, integración WhatsApp para pedidos, Google Maps, galería de imágenes.',
      features: [
        'Menú digital',
        'Sistema de reservaciones',
        'Integración WhatsApp para pedidos',
        'Integración con Google Maps',
        'Galería de imágenes'
      ]
    },
    en: {
      name: 'Website Plan for Restaurants',
      description: 'Digital menu, reservation system, WhatsApp integration for orders, Google Maps, image gallery.',
      features: [
        'Digital menu',
        'Reservation system',
        'WhatsApp order integration',
        'Google Maps integration',
        'Image gallery'
      ]
    }
  },
  {
    id: 'plan-marca-sitio-web-profesional',
    priceMXN: 24530.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Marca + Sitio Web Profesional',
      description: 'Diseño de logotipo profesional, 3 propuestas de diseño, paleta de colores corporativos, tipografía recomendada, sitio web hasta 3 secciones, diseño responsive, formulario de contacto, integración redes sociales.',
      features: [
        'Diseño de logotipo profesional (3 propuestas)',
        'Paleta de colores corporativos y tipografía recomendada',
        'Sitio web hasta 3 secciones',
        'Diseño responsive (adaptable a móviles)',
        'Formulario de contacto e integración de redes sociales'
      ]
    },
    en: {
      name: 'Branding + Professional Website Plan',
      description: 'Professional logo design, 3 design proposals, corporate color palette, recommended typography, website up to 3 sections, responsive design, contact form, social media integration.',
      features: [
        'Professional logo design (3 proposals)',
        'Corporate color palette and recommended typography',
        'Website up to 3 sections',
        'Responsive design (mobile-friendly)',
        'Contact form and social media integration'
      ]
    }
  },
  {
    id: 'plan-web-marketing-digital',
    priceMXN: 21940.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Web + Marketing Digital',
      description: 'Sitio web profesional, configuración Google Ads, configuración Facebook Ads, instalación píxel de seguimiento, configuración Google Analytics.',
      features: [
        'Sitio web profesional',
        'Configuración de campañas en Google Ads',
        'Configuración de campañas en Facebook Ads',
        'Instalación de píxel de seguimiento',
        'Configuración de Google Analytics'
      ]
    },
    en: {
      name: 'Website + Digital Marketing Plan',
      description: 'Professional website, Google Ads setup, Facebook Ads setup, tracking pixel installation, Google Analytics configuration.',
      features: [
        'Professional website',
        'Google Ads campaign setup',
        'Facebook Ads campaign setup',
        'Tracking pixel installation',
        'Google Analytics configuration'
      ]
    }
  },
  {
    id: 'plan-landing-page-emprendedor',
    priceMXN: 4250.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Landing Page Emprendedor',
      description: 'Diseño de landing page (1 página), formulario de contacto, integración redes sociales (2 máximo), entrega digital. Servicio 100% en línea.',
      features: [
        'Diseño de landing page (1 página)',
        'Formulario de contacto',
        'Integración con redes sociales (máximo 2)',
        'Entrega digital',
        'Servicio 100% en línea'
      ]
    },
    en: {
      name: 'Entrepreneur Landing Page Plan',
      description: 'Landing page design (1 page), contact form, social media integration (maximum 2), digital delivery. 100% online service.',
      features: [
        'Landing page design (1 page)',
        'Contact form',
        'Social media integration (2 max)',
        'Digital delivery',
        '100% online service'
      ]
    }
  },
  {
    id: 'plan-web-empresarial',
    priceMXN: 17320.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Web Empresarial',
      description: 'Hasta 5 páginas, diseño UX/UI profesional, formularios avanzados, optimización SEO inicial, optimización de velocidad.',
      features: [
        'Hasta 5 páginas internas',
        'Diseño UX/UI profesional y personalizado',
        'Formularios de contacto avanzados',
        'Optimización SEO inicial',
        'Optimización de velocidad de carga'
      ]
    },
    en: {
      name: 'Corporate Website Plan',
      description: 'Up to 5 pages, professional UX/UI design, advanced forms, initial SEO optimization, speed optimization.',
      features: [
        'Up to 5 internal pages',
        'Professional custom UX/UI design',
        'Advanced contact forms',
        'Initial SEO optimization',
        'Page speed loading optimization'
      ]
    }
  },
  {
    id: 'plan-web-seo-inicial',
    priceMXN: 16520.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Web + SEO Inicial',
      description: 'Sitio web hasta 2 páginas, investigación de palabras clave, configuración Google Search Console, SEO técnico inicial, optimización de contenido.',
      features: [
        'Sitio web hasta 2 páginas',
        'Investigación de palabras clave (Keyword Research)',
        'Configuración de Google Search Console',
        'SEO técnico inicial',
        'Optimización de contenido'
      ]
    },
    en: {
      name: 'Website + Initial SEO Plan',
      description: 'Website up to 2 pages, keyword research, Google Search Console setup, initial technical SEO, content optimization.',
      features: [
        'Website up to 2 pages',
        'Keyword research',
        'Google Search Console setup',
        'Initial technical SEO',
        'Content optimization'
      ]
    }
  },
  {
    id: 'plan-sitio-web-profesional',
    priceMXN: 11370.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Sitio Web Profesional',
      description: 'Hasta 3 páginas, diseño web personalizado, optimización SEO básica, publicación del sitio en servidor del cliente.',
      features: [
        'Hasta 3 páginas',
        'Diseño web personalizado',
        'Optimización SEO básica',
        'Publicación e instalación en servidor del cliente'
      ]
    },
    en: {
      name: 'Professional Website Plan',
      description: 'Up to 3 pages, custom web design, basic SEO optimization, site publishing on client server.',
      features: [
        'Up to 3 pages',
        'Custom web design',
        'Basic SEO optimization',
        'Site deployment on client server'
      ]
    }
  },
  {
    id: 'plan-tienda-en-linea-basica',
    priceMXN: 25600.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Tienda en Línea Básica',
      description: 'Tienda en línea, hasta 20 productos, carrito de compras, integración con pasarelas de pago, panel administrador.',
      features: [
        'Tienda en línea e-commerce',
        'Carga y configuración de hasta 20 productos',
        'Carrito de compras funcional',
        'Integración con pasarelas de pago',
        'Panel autoadministrable'
      ]
    },
    en: {
      name: 'Basic Online Store Plan',
      description: 'Online store, up to 20 products, shopping cart, payment gateway integration, admin dashboard.',
      features: [
        'E-commerce online store',
        'Catalog setup for up to 20 products',
        'Functional shopping cart',
        'Payment gateway integration',
        'Admin dashboard'
      ]
    }
  },
  {
    id: 'plan-presencia-digital-basica',
    priceMXN: 7420.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Presencia Digital Básica',
      description: 'Sitio web hasta 1 sección, diseño adaptable a dispositivos móviles, formulario de contacto, publicación del sitio en servidor del cliente.',
      features: [
        'Sitio web de 1 sección (One Page)',
        'Diseño adaptable a dispositivos móviles',
        'Formulario de contacto funcional',
        'Publicación en el servidor del cliente'
      ]
    },
    en: {
      name: 'Basic Digital Presence Plan',
      description: 'Website up to 1 section, mobile-responsive design, contact form, site publishing on client server.',
      features: [
        '1-section website (One Page)',
        'Mobile-responsive layout',
        'Functional contact form',
        'Site deployment on client server'
      ]
    }
  },
  {
    id: 'plan-web-para-profesionistas',
    priceMXN: 12770.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Web para Profesionistas',
      description: 'Sitio web de 3 secciones, blog profesional, sistema de agenda de citas, formularios de contacto.',
      features: [
        'Sitio web de 3 secciones',
        'Blog profesional integrado',
        'Sistema de agenda de citas',
        'Formularios de contacto'
      ]
    },
    en: {
      name: 'Website Plan for Professionals',
      description: '3-section website, professional blog, appointment scheduling system, contact forms.',
      features: [
        '3-section website',
        'Integrated professional blog',
        'Appointment booking & scheduling system',
        'Contact forms'
      ]
    }
  },
  {
    id: 'plan-portal-inmobiliario',
    priceMXN: 48820.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Portal Inmobiliario',
      description: 'Publicación de propiedades, buscador avanzado, integración de mapas, panel de agentes, galerías multimedia.',
      features: ['Publicación de propiedades', 'Buscador avanzado', 'Integración de mapas', 'Panel de agentes', 'Galerías multimedia']
    },
    en: {
      name: 'Real Estate Portal Plan',
      description: 'Property listings, advanced search, map integration, agent dashboard, multimedia galleries.',
      features: ['Property listings', 'Advanced search', 'Map integration', 'Agent dashboard', 'Multimedia galleries']
    }
  },
  {
    id: 'plan-ecommerce-avanzado',
    priceMXN: 64680.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Ecommerce Avanzado',
      description: 'Tienda online hasta 100 productos, panel multiadministrador, integración logística de envíos, SEO para ecommerce, estadísticas de ventas.',
      features: ['Tienda online hasta 100 productos', 'Panel multiadministrador', 'Integración logística de envíos', 'SEO para ecommerce', 'Estadísticas de ventas']
    },
    en: {
      name: 'Advanced Ecommerce Plan',
      description: 'Online store up to 100 products, multi-admin dashboard, shipping logistics integration, ecommerce SEO, sales statistics.',
      features: ['Online store up to 100 products', 'Multi-admin dashboard', 'Shipping logistics integration', 'Ecommerce SEO', 'Sales statistics']
    }
  },
  {
    id: 'plan-portal-de-empleo',
    priceMXN: 51890.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Portal de Empleo',
      description: 'Registro de empresas, publicación de vacantes, registro de candidatos, subida de CV, panel administrador.',
      features: ['Registro de empresas', 'Publicación de vacantes', 'Registro de candidatos', 'Subida de CV', 'Panel administrador']
    },
    en: {
      name: 'Job Portal Plan',
      description: 'Company registration, job postings, candidate registration, CV upload, admin dashboard.',
      features: ['Company registration', 'Job postings', 'Candidate registration', 'CV upload', 'Admin dashboard']
    }
  },
  {
    id: 'plan-ecommerce-profesional',
    priceMXN: 41780.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Ecommerce Profesional',
      description: 'Tienda online hasta 60 productos, diseño personalizado, gestión de inventario, cupones de descuento, pasarelas de pago integradas.',
      features: ['Tienda online hasta 60 productos', 'Diseño personalizado', 'Gestión de inventario', 'Cupones de descuento', 'Pasarelas de pago integradas']
    },
    en: {
      name: 'Professional Ecommerce Plan',
      description: 'Online store up to 60 products, custom design, inventory management, discount coupons, integrated payment gateways.',
      features: ['Online store up to 60 products', 'Custom design', 'Inventory management', 'Discount coupons', 'Integrated payment gateways']
    }
  },
  {
    id: 'plan-identidad-digital-emprendedor',
    priceMXN: 29840.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Identidad Digital Emprendedor',
      description: 'Diseño de logotipo profesional, hasta 2 propuestas de diseño, 1 ronda de ajustes, entrega en PNG/JPG/vectorial, landing page profesional, diseño responsive, formulario de contacto, botón WhatsApp, entrega digital.',
      features: ['Diseño de logotipo profesional', 'Hasta 2 propuestas de diseño', '1 ronda de ajustes', 'Entrega en PNG/JPG/vectorial', 'Landing page profesional', 'Diseño responsive', 'Formulario de contacto', 'Botón WhatsApp', 'Entrega digital']
    },
    en: {
      name: 'Entrepreneur Digital Identity Plan',
      description: 'Professional logo design, up to 2 design proposals, 1 revision round, delivery in PNG/JPG/vector, professional landing page, responsive design, contact form, WhatsApp button, digital delivery.',
      features: ['Professional logo design', 'Up to 2 design proposals', '1 revision round', 'Delivery in PNG/JPG/vector', 'Professional landing page', 'Responsive design', 'Contact form', 'WhatsApp button', 'Digital delivery']
    }
  },
  {
    id: 'plan-branding-web-empresarial',
    priceMXN: 33760.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Branding + Web Empresarial',
      description: 'Diseño de logotipo premium, hasta 5 propuestas creativas, paleta de colores corporativos, tipografías corporativas, favicon, kit de logotipo para redes sociales, sitio web empresarial hasta 3 páginas, SEO inicial, formularios avanzados.',
      features: ['Diseño de logotipo premium', 'Hasta 5 propuestas creativas', 'Paleta de colores corporativos y tipografías', 'Favicon y kit de logotipo para redes sociales', 'Sitio web empresarial hasta 3 páginas', 'SEO inicial y formularios avanzados']
    },
    en: {
      name: 'Branding + Corporate Website Plan',
      description: 'Premium logo design, up to 5 creative proposals, corporate color palette, corporate typography, favicon, social media logo kit, corporate website up to 3 pages, initial SEO, advanced forms.',
      features: ['Premium logo design', 'Up to 5 creative proposals', 'Corporate color palette and typography', 'Favicon and social media logo kit', 'Corporate website up to 3 pages', 'Initial SEO and advanced forms']
    }
  },
  {
    id: 'plan-plataforma-cursos-online',
    priceMXN: 47800.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Plataforma de Cursos Online',
      description: 'Plataforma LMS, registro de alumnos, videos y materiales, evaluaciones en línea.',
      features: ['Plataforma LMS', 'Registro de alumnos', 'Videos y materiales', 'Evaluaciones en línea']
    },
    en: {
      name: 'Online Course Platform Plan',
      description: 'LMS platform, student registration, videos and materials, online assessments.',
      features: ['LMS platform', 'Student registration', 'Videos and materials', 'Online assessments']
    }
  },
  {
    id: 'plan-web-corporativo-premium',
    priceMXN: 28580.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    es: {
      name: 'Plan Web Corporativo Premium',
      description: 'Hasta 8 páginas, diseño corporativo personalizado, optimización SEO técnica inicial, integración con CRM, seguridad web avanzada.',
      features: ['Hasta 8 páginas', 'Diseño corporativo personalizado', 'Optimización SEO técnica inicial', 'Integración con CRM', 'Seguridad web avanzada']
    },
    en: {
      name: 'Premium Corporate Website Plan',
      description: 'Up to 8 pages, custom corporate design, initial technical SEO optimization, CRM integration, advanced web security.',
      features: ['Up to 8 pages', 'Custom corporate design', 'Initial technical SEO optimization', 'CRM integration', 'Advanced web security']
    }
  }
];

export function formatMXN(amount: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
}