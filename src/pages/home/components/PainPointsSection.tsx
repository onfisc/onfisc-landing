import { useState, useEffect } from 'react';
import MobileCarousel from './MobileCarousel';

interface PainPoint {
  icon: string;
  title: string;
  desc: string;
}

const pains: PainPoint[] = [
  {
    icon: 'ri-time-line',
    title: 'Atrasos e Desorganização',
    desc: 'Fiscais que chegam atrasados, salas mal preparadas e falta de padronização geram caos e insegurança no dia da prova.',
  },
  {
    icon: 'ri-user-unfollow-line',
    title: 'Falta de Profissionalismo',
    desc: 'Fiscais improvisados, sem treinamento adequado, que não sabem lidar com situações críticas ou comportamentos inadequados.',
  },
  {
    icon: 'ri-error-warning-line',
    title: 'Risco de Fraudes e Irregularidades',
    desc: 'Ausência de controle rigoroso pode comprometer a lisura do processo e gerar questionamentos sobre a validade dos resultados.',
  },
  {
    icon: 'ri-emotion-unhappy-line',
    title: 'Estresse para Coordenadores',
    desc: 'Gestores e coordenadores sobrecarregados, tendo que resolver problemas de última hora ao invés de focar na estratégia.',
  },
  {
    icon: 'ri-file-damage-line',
    title: 'Falta de Documentação',
    desc: 'Sem relatórios detalhados, fica impossível auditar o processo ou identificar pontos de melhoria para próximas aplicações.',
  },
  {
    icon: 'ri-question-line',
    title: 'Improviso e Incerteza',
    desc: 'Cada prova é diferente, sem padrão estabelecido. Você nunca sabe o que esperar ou se tudo vai funcionar como deveria.',
  },
];

export default function PainPointsSection({ whatsappLink }: { whatsappLink: string }) {
  const [painIndex, setPainIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 768) {
        setPainIndex((prev) => (prev + 1) % pains.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const PainCard = ({ pain }: { pain: PainPoint }) => (
    <div className="bg-onfisc-beige/50 rounded-3xl p-6 border-2 border-onfisc-orange/20">
      <div className="w-14 h-14 rounded-full bg-onfisc-orange/10 flex items-center justify-center mb-5">
        <i className={`${pain.icon} text-3xl text-onfisc-orange`}></i>
      </div>
      <h3 className="text-lg font-bold mb-3 text-onfisc-dark">{pain.title}</h3>
      <p className="text-onfisc-brown leading-relaxed text-sm">{pain.desc}</p>
    </div>
  );

  return (
    <section className="py-12 md:py-20 px-6 bg-gradient-to-br from-onfisc-orange/5 via-white to-onfisc-beige/30 relative overflow-hidden">
      {/* Padrão de fundo decorativo */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #F39200 0, #F39200 1px, transparent 0, transparent 50%)', backgroundSize: '30px 30px' }}></div>
      </div>
      
      {/* Shapes animados */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-onfisc-orange/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-onfisc-brown/10 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-14 animate-on-scroll">
          <p className="text-onfisc-orange uppercase tracking-[0.2em] text-xs md:text-sm font-semibold mb-3 md:mb-4">
            Você Reconhece Esses Problemas?
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-onfisc-dark mb-3 md:mb-5 px-4">
            Desafios Comuns no <strong className="text-onfisc-orange">Dia das Provas</strong>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-onfisc-brown max-w-3xl mx-auto leading-relaxed px-4">
            Sabemos que a aplicação de exames pode ser um momento de grande estresse e preocupação
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10 md:mb-12">
          {pains.map((pain, index) => (
            <div
              key={index}
              className="bg-onfisc-beige/50 rounded-3xl p-6 lg:p-8 border-2 border-onfisc-orange/20 hover:border-onfisc-orange hover:shadow-[0_0_30px_rgba(243,146,0,0.2)] transition-all duration-500 hover:-translate-y-2 animate-on-scroll cursor-pointer group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-onfisc-orange/10 flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-onfisc-orange/20 transition-all duration-500">
                <i className={`${pain.icon} text-2xl lg:text-3xl text-onfisc-orange`}></i>
              </div>
              <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4 text-onfisc-dark">{pain.title}</h3>
              <p className="text-sm lg:text-base text-onfisc-brown leading-relaxed">{pain.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <MobileCarousel
          items={pains.map((pain) => <PainCard key={pain.title} pain={pain} />)}
          currentIndex={painIndex}
          onIndexChange={setPainIndex}
        />

        {/* CTA */}
        <div className="text-center animate-on-scroll mt-8 md:mt-0">
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-onfisc-dark mb-5 md:mb-6 px-4">
            Esses problemas acabam <span className="text-onfisc-orange">AGORA</span>
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-4 rounded-full bg-onfisc-orange text-white font-bold text-sm md:text-base lg:text-lg hover:shadow-[0_0_40px_rgba(243,146,0,0.5)] hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-whatsapp-line text-lg md:text-xl lg:text-2xl"></i>
            Quero Resolver Isso Agora
          </a>
        </div>
      </div>
    </section>
  );
}
