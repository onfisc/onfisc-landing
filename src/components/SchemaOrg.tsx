import { useEffect } from 'react';

interface SchemaOrgProps {
  type: 'Organization' | 'LocalBusiness' | 'FAQPage' | 'Service';
}

export default function SchemaOrg({ type }: SchemaOrgProps) {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';
    
    let schema: any = {};

    if (type === 'Organization' || type === 'LocalBusiness') {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${siteUrl}/#organization`,
        name: 'ONFISC',
        description: 'Fiscalização profissional e ética de exames em Salvador, Lauro de Freitas e Camaçari. Equipe treinada, relatórios completos e 98% de satisfação.',
        url: siteUrl,
        logo: 'https://static.readdy.ai/image/bce494a419de709d2f80d1de9873d5fd/854423bfa204ae77916563b2c5d96bf9.png',
        image: 'https://static.readdy.ai/image/bce494a419de709d2f80d1de9873d5fd/854423bfa204ae77916563b2c5d96bf9.png',
        telephone: '+5571991465614',
        email: 'contato@onfisc.com.br',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Salvador',
          addressRegion: 'BA',
          addressCountry: 'BR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -12.9714,
          longitude: -38.5014,
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Salvador',
          },
          {
            '@type': 'City',
            name: 'Lauro de Freitas',
          },
          {
            '@type': 'City',
            name: 'Camaçari',
          },
        ],
        sameAs: [
          'https://www.instagram.com/onfiscedu',
          'https://www.linkedin.com/in/onfisc',
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '500',
          bestRating: '5',
          worstRating: '1',
        },
      };
    }

    if (type === 'Service') {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${siteUrl}/#service`,
        serviceType: 'Fiscalização de Exames e Provas',
        provider: {
          '@type': 'LocalBusiness',
          name: 'ONFISC',
          url: siteUrl,
        },
        areaServed: {
          '@type': 'State',
          name: 'Bahia',
        },
        description: 'Serviço completo de fiscalização profissional de exames e provas para instituições de ensino. Equipe treinada, relatórios detalhados e máxima organização.',
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'BRL',
          },
        },
      };
    }

    if (type === 'FAQPage') {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'O que a ONFISC faz?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A ONFISC oferece serviços completos de fiscalização de provas e exames para instituições de ensino. Garantimos organização completa, ética, transparência, fiscais treinados, prevenção de riscos, relatórios completos e suporte dedicado.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quais cidades a ONFISC atende?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Atendemos Salvador, Lauro de Freitas, Camaçari e região metropolitana de Salvador.',
            },
          },
          {
            '@type': 'Question',
            name: 'Como funciona o processo de fiscalização?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nosso processo tem 4 etapas: 1) Diagnóstico completo das necessidades, 2) Seleção e treinamento dos fiscais, 3) Fiscalização operacional durante o exame, 4) Relatório final com evidências e ocorrências detalhadas.',
            },
          },
          {
            '@type': 'Question',
            name: 'Qual a taxa de satisfação dos clientes?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Temos 98% de satisfação dos gestores entrevistados, com mais de 500 exames fiscalizados com excelência.',
            },
          },
        ],
      };
    }

    const scriptId = `schema-org-${type}`;
    let scriptElement = document.getElementById(scriptId);

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    scriptElement.textContent = JSON.stringify(schema);

    return () => {
      const element = document.getElementById(scriptId);
      if (element) {
        element.remove();
      }
    };
  }, [type]);

  return null;
}
