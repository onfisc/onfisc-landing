import { useEffect, useRef, useState } from 'react';
import PainPointsSection from './components/PainPointsSection';
import MobileCarousel from './components/MobileCarousel';
import SchemaOrg from '../../components/SchemaOrg';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [countersStarted, setCountersStarted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(true);
  const statsRef = useRef<HTMLDivElement>(null);

  // Estados para carrosséis mobile
  const [serviceIndex, setServiceIndex] = useState(0);
  const [diffIndex, setDiffIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [processIndex, setProcessIndex] = useState(0);

  // Novo: Estado para progresso de scroll
  const [scrollProgress, setScrollProgress] = useState(0);

  // Estados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    instituicao: '',
    telefone: '',
    mensagem: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Ref para o vídeo
  const videoRef = useRef<HTMLVideoElement>(null);

  // Bloquear scroll quando modal estiver aberto
  useEffect(() => {
    if (videoModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [videoModalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Calcular progresso de scroll
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [countersStarted]);

  const Counter = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!countersStarted) return;

      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [countersStarted, end]);

    return (
      <span>
        {count}
        {suffix}
      </span>
    );
  };

  const whatsappMessage = encodeURIComponent('Quero saber mais sobre a OnFisc');
  const whatsappLink = `https://wa.me/5571991465614?text=${whatsappMessage}`;

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 768) {
        setServiceIndex((prev) => (prev + 1) % 6);
        setDiffIndex((prev) => (prev + 1) % 6);
        setTestimonialIndex((prev) => (prev + 1) % 3);
        setProcessIndex((prev) => (prev + 1) % 4);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: 'ri-organization-chart',
      title: 'Organização Completa',
      desc: 'Do preparo das salas ao acompanhamento final, cuidamos de cada detalhe para garantir um processo impecável.',
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Ética e Transparência',
      desc: 'Comportamento profissional, imparcial e alinhado às normas internas da instituição de ensino.',
    },
    {
      icon: 'ri-user-star-line',
      title: 'Fiscais Treinados',
      desc: 'Equipe selecionada, capacitada e padronizada para evitar falhas e garantir excelência operacional.',
    },
    {
      icon: 'ri-alert-line',
      title: 'Prevenção de Riscos',
      desc: 'Atuação preventiva para minimizar atrasos, condutas indevidas e erros operacionais durante as provas.',
    },
    {
      icon: 'ri-file-text-line',
      title: 'Relatórios Completos',
      desc: 'Registro e documentação pós-prova para auditoria e revisão, com evidências e ocorrências detalhadas.',
    },
    {
      icon: 'ri-customer-service-2-line',
      title: 'Suporte Dedicado',
      desc: 'Atendimento personalizado e acompanhamento contínuo para garantir a satisfação da instituição.',
    },
  ];

  const differentials = [
    {
      icon: 'ri-focus-3-line',
      title: 'Foco Exclusivo em Fiscalização',
      desc: 'Diferente de empresas comuns de apoio escolar, nascemos com foco total no processo de fiscalização de exames.',
    },
    {
      icon: 'ri-heart-line',
      title: 'Abordagem Humana e Acolhedora',
      desc: 'Profissionalismo com humanização. Tratamos cada situação com empatia, respeito e cuidado.',
    },
    {
      icon: 'ri-shield-star-line',
      title: 'Profissionalismo e Postura Ética',
      desc: 'Equipe treinada para manter imparcialidade, discrição e conduta exemplar em todas as situações.',
    },
    {
      icon: 'ri-layout-grid-line',
      title: 'Organização Minuciosa',
      desc: 'Cada detalhe é planejado e executado com precisão. Nada é deixado ao acaso ou improviso.',
    },
    {
      icon: 'ri-award-line',
      title: 'Experiência Comprovada',
      desc: 'Mais de 500 exames fiscalizados com 98% de satisfação dos gestores entrevistados.',
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Zero Improviso',
      desc: 'Máximo controle operacional. Protocolos claros, equipe preparada e processos padronizados.',
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Diagnóstico Completo',
      desc: 'Entendimento das necessidades, cronograma, número de salas e perfil dos alunos. Mapeamos cada detalhe para personalizar o serviço.',
      icon: 'ri-search-line',
    },
    {
      number: '02',
      title: 'Seleção e Treinamento dos Fiscais',
      desc: 'Equipe preparada com postura ética, comunicação adequada e domínio dos protocolos. Capacitação contínua para garantir excelência.',
      icon: 'ri-user-settings-line',
    },
    {
      number: '03',
      title: 'Fiscalização Operacional',
      desc: 'Acompanhamento presencial, organizado, preventivo e padronizado. Zero improviso e máximo controle operacional durante todo o exame.',
      icon: 'ri-shield-user-line',
    },
    {
      number: '04',
      title: 'Relatório Final e Evidências',
      desc: 'Documento entregue ao gestor, contendo descrição detalhada, evidências fotográficas e registro de todas as ocorrências.',
      icon: 'ri-file-chart-line',
    },
  ];

  const ServiceCard = ({ service }: { service: typeof services[0] }) => (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-onfisc-beige group h-full hover:shadow-[0_0_40px_rgba(243,146,0,0.2)] transition-all duration-500">
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-onfisc-orange/10 flex items-center justify-center mb-4 md:mb-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
        <i className={`${service.icon} text-2xl md:text-3xl text-onfisc-orange`}></i>
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-onfisc-dark">{service.title}</h3>
      <p className="text-sm md:text-base text-onfisc-brown leading-relaxed">{service.desc}</p>
    </div>
  );

  const DifferentialCard = ({ diff }: { diff: typeof differentials[0] }) => (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 group h-full hover:bg-white/15 hover:shadow-[0_0_40px_rgba(243,146,0,0.3)] transition-all duration-500 border border-white/20">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-onfisc-orange/30 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
        <i className={`${diff.icon} text-3xl md:text-4xl text-onfisc-orange`}></i>
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">{diff.title}</h3>
      <p className="text-sm md:text-base text-white/80 leading-relaxed">{diff.desc}</p>
    </div>
  );

  const ProcessCard = ({ step }: { step: typeof processSteps[0] }) => (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-onfisc-beige/50 group h-full hover:shadow-[0_0_40px_rgba(243,146,0,0.2)] transition-all duration-500">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-5xl md:text-6xl font-black text-onfisc-orange/20 group-hover:text-onfisc-orange/40 transition-all duration-500">{step.number}</span>
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-onfisc-dark mb-3 md:mb-4">{step.title}</h3>
      <p className="text-sm md:text-base text-onfisc-brown leading-relaxed">{step.desc}</p>
    </div>
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');
    setFormSuccess(false);

    // Validação
    if (!formData.nome || !formData.email) {
      setFormError('Por favor, preencha os campos obrigatórios.');
      setFormSubmitting(false);
      return;
    }

    if (formData.mensagem.length > 500) {
      setFormError('A mensagem não pode exceder 500 caracteres.');
      setFormSubmitting(false);
      return;
    }

    try {
      const formBody = new URLSearchParams();
      formBody.append('nome', formData.nome);
      formBody.append('email', formData.email);
      formBody.append('instituicao', formData.instituicao);
      formBody.append('telefone', formData.telefone);
      formBody.append('mensagem', formData.mensagem);

      const response = await fetch('https://readdy.ai/api/form/d4qtda9fcjnktac9qtng', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      if (response.ok) {
        setFormSuccess(true);
        setFormData({
          nome: '',
          email: '',
          instituicao: '',
          telefone: '',
          mensagem: ''
        });
        // Scroll suave até a mensagem de sucesso
        setTimeout(() => {
          const successMessage = document.querySelector('.success-message');
          if (successMessage) {
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
        // Ocultar mensagem após 8 segundos
        setTimeout(() => setFormSuccess(false), 8000);
      } else {
        throw new Error('Erro na resposta do servidor');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setFormError('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Detectar quando o vídeo termina e fechar o modal automaticamente
  useEffect(() => {
    if (!videoModalOpen) return;

    // Usar a API do Vimeo para detectar quando o vídeo termina
    const iframe = document.querySelector('#vimeo-player') as HTMLIFrameElement;
    if (!iframe) return;

    const player = new (window as any).Vimeo.Player(iframe);
    
    player.on('ended', () => {
      setTimeout(() => {
        setVideoModalOpen(false);
      }, 1000); // Aguarda 1 segundo após o vídeo terminar para fechar
    });

    return () => {
      player.off('ended');
    };
  }, [videoModalOpen]);

  return (
    <div className="bg-white text-onfisc-dark overflow-hidden font-outfit">
      {/* Schema.org JSON-LD */}
      <SchemaOrg type="LocalBusiness" />
      <SchemaOrg type="Service" />
      <SchemaOrg type="FAQPage" />

      {/* Barra de Progresso de Scroll */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-onfisc-beige/30 z-[60]">
        <div 
          className="h-full bg-gradient-to-r from-onfisc-orange via-[#E88500] to-onfisc-brown transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-onfisc-beige/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center animate-fade-in">
            <img
              src="https://static.readdy.ai/image/bce494a419de709d2f80d1de9873d5fd/854423bfa204ae77916563b2c5d96bf9.png"
              alt="ONFISC - Fiscalização de Exames"
              className="h-14 w-auto"
            />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#servicos"
              className="text-onfisc-dark hover:text-onfisc-orange transition-colors duration-300 relative group whitespace-nowrap font-medium text-[15px]"
            >
              Serviços
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-onfisc-orange group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#como-trabalhamos"
              className="text-onfisc-dark hover:text-onfisc-orange transition-colors duration-300 relative group whitespace-nowrap font-medium text-[15px]"
            >
              Como Trabalhamos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-onfisc-orange group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#diferenciais"
              className="text-onfisc-dark hover:text-onfisc-orange transition-colors duration-300 relative group whitespace-nowrap font-medium text-[15px]"
            >
              Diferenciais
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-onfisc-orange group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#depoimentos"
              className="text-onfisc-dark hover:text-onfisc-orange transition-colors duration-300 relative group whitespace-nowrap font-medium text-[15px]"
            >
              Depoimentos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-onfisc-orange group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-onfisc-orange text-white font-semibold hover:shadow-[0_0_30px_rgba(243,146,0,0.4)] hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer text-[15px]"
            >
              Falar com Especialista
            </a>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-onfisc-dark w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            <i className={`ri-${mobileMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-onfisc-beige/30 py-4 px-6">
            <div className="flex flex-col space-y-4">
              <a href="#servicos" className="text-onfisc-dark hover:text-onfisc-orange transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                Serviços
              </a>
              <a href="#como-trabalhamos" className="text-onfisc-dark hover:text-onfisc-orange transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                Como Trabalhamos
              </a>
              <a href="#diferenciais" className="text-onfisc-dark hover:text-onfisc-orange transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                Diferenciais
              </a>
              <a href="#depoimentos" className="text-onfisc-dark hover:text-onfisc-orange transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                Depoimentos
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-onfisc-orange text-white font-semibold text-center cursor-pointer"
              >
                Falar com Especialista
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section com Vídeo em Destaque */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-6 bg-gradient-to-br from-onfisc-beige/30 via-white to-onfisc-beige/50">
        {/* Fundo Animado com Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-96 h-96 bg-onfisc-orange/8 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-onfisc-brown/8 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-onfisc-orange/5 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Conteúdo Hero */}
        <div className="relative z-10 text-center max-w-6xl mx-auto w-full">
          {/* Frase de Impacto */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 leading-tight animate-fade-in-up text-onfisc-dark">
            Fiscalização Profissional e Ética para Garantir{' '}
            <span className="text-onfisc-orange">
              Tranquilidade no Dia das Provas
            </span>
          </h1>

          {/* Vídeo Institucional em Destaque */}
          <div className="mb-12 animate-fade-in-up animation-delay-200">
            <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(243,146,0,0.25)] hover:shadow-[0_0_80px_rgba(243,146,0,0.4)] transition-all duration-500 hover:scale-[1.02] bg-onfisc-dark/5 backdrop-blur-sm border-4 border-onfisc-orange/20">
              <div className="aspect-video relative group cursor-pointer" onClick={() => setVideoModalOpen(true)}>
                {/* Thumbnail do Vídeo */}
                <img
                  src="https://static.readdy.ai/image/bce494a419de709d2f80d1de9873d5fd/eec83507055414fbd2aae9ead0239933.png"
                  alt="Vídeo Institucional ONFISC"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay com Botão Play */}
                <div className="absolute inset-0 bg-gradient-to-t from-onfisc-dark/60 via-onfisc-dark/20 to-transparent flex items-center justify-center group-hover:bg-onfisc-dark/40 transition-all duration-500">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-onfisc-orange flex items-center justify-center shadow-[0_0_30px_rgba(243,146,0,0.6)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(243,146,0,0.8)] transition-all duration-500 animate-pulse-play">
                    <i className="ri-play-fill text-3xl md:text-4xl text-white ml-1"></i>
                  </div>
                </div>

                {/* Label */}
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-onfisc-orange/90 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full">
                  <p className="text-white font-bold text-xs md:text-sm flex items-center gap-2">
                    <i className="ri-video-line text-base md:text-lg"></i>
                    Assista ao Vídeo Institucional
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Descrição e CTA */}
          <p className="text-xl md:text-2xl text-onfisc-brown mb-10 font-light max-w-3xl mx-auto animate-fade-in-up animation-delay-400 leading-relaxed">
            Garantimos que o dia das provas aconteça de forma tranquila, ética, segura e sem improvisos. Confiança para gestores, coordenadores, professores e estudantes.
          </p>
        </div>

        {/* Indicador de Scroll */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-onfisc-brown/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-onfisc-orange rounded-full animate-scroll-down"></div>
          </div>
        </div>
      </section>

      {/* Modal de Vídeo - FULLSCREEN AUTOMÁTICO NO DESKTOP */}
      {videoModalOpen && (
        <div 
          className="fixed inset-0 bg-onfisc-dark/95 backdrop-blur-md z-[100] flex items-center justify-center animate-fade-in"
          onClick={() => setVideoModalOpen(false)}
        >
          <div className="relative w-full h-full p-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-full bg-onfisc-orange text-white flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer z-10 shadow-[0_0_30px_rgba(243,146,0,0.5)]"
            >
              <i className="ri-close-line text-2xl md:text-3xl"></i>
            </button>
            <div className="w-full h-full bg-black">
              <iframe
                id="vimeo-player"
                src="https://player.vimeo.com/video/1144317718?autoplay=1&title=0&byline=0&portrait=0"
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Nova Seção: Dores do Cliente - AGORA COMO COMPONENTE */}
      <PainPointsSection whatsappLink={whatsappLink} />

      {/* Seção de Números */}
      <section ref={statsRef} className="py-24 relative bg-gradient-to-br from-white via-onfisc-beige/20 to-white">
        <div className="absolute inset-0 bg-gradient-radial from-onfisc-orange/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="text-onfisc-orange uppercase tracking-[0.2em] text-sm font-semibold mb-4">
              Números que Comprovam
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-onfisc-dark">
              Nossa <strong className="text-onfisc-orange">Credibilidade</strong>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'ri-file-list-3-line', number: 500, suffix: '+', label: 'Exames Fiscalizados' },
              { icon: 'ri-emotion-happy-line', number: 98, suffix: '%', label: 'Satisfação dos Gestores' },
              { icon: 'ri-team-line', number: 200, suffix: '+', label: 'Fiscais Treinados' },
              { icon: 'ri-map-pin-line', number: 3, suffix: '+', label: 'Cidades Atendidas' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 hover:bg-onfisc-beige/30 hover:shadow-[0_0_30px_rgba(243,146,0,0.2)] transition-all duration-500 hover:-translate-y-2 animate-on-scroll cursor-pointer border border-onfisc-beige/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 flex items-center justify-center mb-6">
                  <i className={`${stat.icon} text-5xl text-onfisc-orange animate-icon-bounce`}></i>
                </div>
                <div className="text-6xl font-bold text-onfisc-orange mb-4">
                  <Counter end={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-onfisc-brown text-lg font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção O Que Fazemos - COM CARROSSEL MOBILE */}
      <section id="servicos" className="py-16 md:py-24 px-6 bg-white relative overflow-hidden">
        {/* Shapes Animados */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-onfisc-orange/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-onfisc-brown/5 rounded-full blur-3xl animate-float-delayed"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 md:mb-16 animate-on-scroll">
            <p className="text-onfisc-orange uppercase tracking-[0.2em] text-xs md:text-sm font-semibold mb-3 md:mb-4">
              Nossos Serviços
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-onfisc-dark px-4">
              O Que a <strong className="text-onfisc-orange">ONFISC Faz</strong>
            </h2>
            <p className="text-base md:text-lg text-onfisc-brown max-w-3xl mx-auto leading-relaxed px-4">
              Oferecemos serviços completos de fiscalização de provas, garantindo que o processo ocorra com máxima organização, ética e transparência.
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10 md:mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 hover:bg-onfisc-beige/20 hover:shadow-[0_0_30px_rgba(243,146,0,0.15)] transition-all duration-500 hover:-translate-y-2 animate-on-scroll cursor-pointer border border-onfisc-beige/50 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-onfisc-orange/10 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <i className={`${service.icon} text-3xl text-onfisc-orange`}></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-onfisc-dark">{service.title}</h3>
                <p className="text-onfisc-brown leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <MobileCarousel
            items={services.map((service) => <ServiceCard key={service.title} service={service} />)}
            currentIndex={serviceIndex}
            onIndexChange={setServiceIndex}
          />

          {/* CTA após Serviços - CENTRALIZADO */}
          <div className="text-center mt-12 md:mt-16 animate-on-scroll flex flex-col items-center">
            <p className="text-lg md:text-xl text-onfisc-brown mb-5 md:mb-6 px-4">
              Pronto para ter fiscalização profissional na sua instituição?
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 md:gap-3 px-8 md:px-10 py-3 md:py-4 rounded-full bg-onfisc-orange text-white font-bold text-base md:text-lg hover:shadow-[0_0_40px_rgba(243,146,0,0.5)] hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-calendar-check-line text-xl md:text-2xl"></i>
              Agendar Conversa com Especialista
            </a>
          </div>
        </div>
      </section>

      {/* Seção Como Trabalhamos - COM CARROSSEL MOBILE */}
      <section id="como-trabalhamos" className="py-16 md:py-24 px-6 bg-gradient-to-br from-onfisc-beige/30 via-white to-onfisc-beige/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #F39200 0, #F39200 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-20 animate-on-scroll">
            <p className="text-onfisc-orange uppercase tracking-[0.2em] text-xs md:text-sm font-semibold mb-3 md:mb-4">
              Nosso Processo
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-onfisc-dark mb-4 md:mb-6 px-4">
              Como <strong className="text-onfisc-orange">Trabalhamos</strong>
            </h2>
            <p className="text-base md:text-lg text-onfisc-brown max-w-2xl mx-auto px-4">
              Um processo estruturado em 4 etapas para garantir excelência na fiscalização de exames
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="relative hidden md:block">
            {/* Linha Vertical Animada */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-onfisc-orange/20 hidden lg:block">
              <div className="w-full h-0 bg-onfisc-orange animate-draw-line-vertical"></div>
            </div>

            {/* Timeline Items */}
            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-8 animate-on-scroll ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Conteúdo */}
                  <div className="flex-1 lg:text-right lg:pr-12">
                    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-[0_0_40px_rgba(243,146,0,0.2)] transition-all duration-500 hover:-translate-y-2 border border-onfisc-beige/50 group">
                      <div className="flex items-center gap-4 mb-4 lg:justify-end">
                        <span className="text-6xl font-black text-onfisc-orange/20 group-hover:text-onfisc-orange/40 transition-all duration-500">{step.number}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-onfisc-dark mb-4">{step.title}</h3>
                      <p className="text-onfisc-brown leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Ícone Central */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-onfisc-orange flex items-center justify-center shadow-[0_0_30px_rgba(243,146,0,0.4)] hover:scale-110 hover:shadow-[0_0_50px_rgba(243,146,0,0.6)] transition-all duration-500 animate-pulse-slow">
                      <i className={`${step.icon} text-3xl text-white`}></i>
                    </div>
                  </div>

                  {/* Espaço vazio para manter alinhamento */}
                  <div className="flex-1 hidden lg:block"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Carousel */}
          <MobileCarousel
            items={processSteps.map((step) => <ProcessCard key={step.number} step={step} />)}
            currentIndex={processIndex}
            onIndexChange={setProcessIndex}
          />
        </div>
      </section>

      {/* Seção Diferenciais - COM CARROSSEL MOBILE */}
      <section id="diferenciais" className="py-16 md:py-24 px-6 bg-gradient-to-br from-onfisc-brown via-[#7A5230] to-onfisc-dark text-white relative overflow-hidden">
        {/* Shapes de Fundo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-onfisc-orange/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-delayed"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 md:mb-16 animate-on-scroll">
            <p className="text-onfisc-orange uppercase tracking-[0.2em] text-sm font-semibold mb-4">
              Por Que Escolher a ONFISC
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-onfisc-dark mb-4 md:mb-6 px-4">
              Nossos <strong className="text-onfisc-orange">Diferenciais</strong>
            </h2>
            <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
              O que nos torna únicos no mercado de fiscalização de exames
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10 md:mb-16">
            {differentials.map((diff, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 hover:shadow-[0_0_30px_rgba(243,146,0,0.3)] transition-all duration-500 hover:-translate-y-2 animate-on-scroll cursor-pointer group border border-white/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-onfisc-orange/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <i className={`${diff.icon} text-4xl text-onfisc-orange`}></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{diff.title}</h3>
                <p className="text-white/80 leading-relaxed">{diff.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <MobileCarousel
            items={differentials.map((diff) => <DifferentialCard key={diff.title} diff={diff} />)}
            currentIndex={diffIndex}
            onIndexChange={setDiffIndex}
          />

          {/* CTA após Diferenciais */}
          <div className="text-center mt-12 md:mt-16 animate-on-scroll">
            <p className="text-lg md:text-xl text-white/90 mb-5 md:mb-6 px-4">
              Veja como podemos transformar a aplicação de provas na sua escola
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 md:gap-3 px-8 md:px-10 py-3 md:py-4 rounded-full bg-onfisc-orange text-white font-bold text-base md:text-lg hover:shadow-[0_0_40px_rgba(243,146,0,0.5)] hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-message-3-line text-xl md:text-2xl"></i>
              Falar com Consultor
            </a>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos - COM EFEITO PARALLAX */}
      <section id="depoimentos" className="py-24 px-6 bg-gradient-to-br from-white via-onfisc-beige/20 to-white relative overflow-hidden">
        {/* Shapes Animados */}
        <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-onfisc-orange/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-onfisc-brown/5 rounded-full blur-3xl animate-float-delayed"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="text-onfisc-orange uppercase tracking-[0.2em] text-sm font-semibold mb-4">
              Depoimentos Reais
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-onfisc-dark">
              O Que Nossos <strong className="text-onfisc-orange">Clientes Dizem</strong>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: 'A ONFISC mudou completamente nossa rotina de aplicação. Nunca tivemos uma fiscalização tão tranquila e organizada.',
                author: 'Diretora Acadêmica',
                location: 'Salvador',
              },
              {
                text: 'Equipe pontual, ética e extremamente preparada. Hoje dependemos da ONFISC para garantir a lisura dos exames.',
                author: 'Coordenador Pedagógico',
                location: 'Lauro de Freitas',
              },
              {
                text: 'O relatório entregue no final é impecável: claro, objetivo e profissional.',
                author: 'Gestora Administrativa',
                location: 'Camaçari',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-[0_0_40px_rgba(243,146,0,0.2)] transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll group cursor-pointer border border-onfisc-beige/50"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-onfisc-orange/30 text-6xl font-serif mb-4 group-hover:text-onfisc-orange/50 transition-colors duration-500">"</div>
                <p className="text-onfisc-brown text-lg leading-relaxed mb-6 italic">
                  {testimonial.text}
                </p>
                <div className="border-t border-onfisc-beige pt-4">
                  <p className="font-bold text-onfisc-dark text-lg">{testimonial.author}</p>
                  <p className="text-onfisc-brown text-sm flex items-center gap-2">
                    <i className="ri-map-pin-line text-onfisc-orange"></i>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nova Seção: Formulário de Contato */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-onfisc-beige/30 via-white to-onfisc-beige/20 relative overflow-hidden">
        {/* Shapes de fundo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-onfisc-orange/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-onfisc-brown/5 rounded-full blur-3xl animate-float-delayed"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <p className="text-onfisc-orange uppercase tracking-[0.2em] text-sm font-semibold mb-4">
              Entre em Contato
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-onfisc-dark mb-6">
              Pronto Para Transformar <strong className="text-onfisc-orange">Suas Provas?</strong>
            </h2>
            <p className="text-lg text-onfisc-brown max-w-2xl mx-auto">
              Preencha o formulário abaixo e nossa equipe entrará em contato em breve
            </p>
          </div>

          <form 
            id="contact-form"
            data-readdy-form
            onSubmit={handleFormSubmit}
            className="bg-white rounded-3xl p-8 md:p-12 border border-onfisc-beige/50 shadow-lg animate-on-scroll"
          >
            {/* Nome Completo */}
            <div className="mb-6">
              <label htmlFor="nome" className="block text-onfisc-dark font-semibold mb-2">
                Nome completo <span className="text-onfisc-orange">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleFormChange}
                placeholder="Seu nome"
                required
                className="w-full px-5 py-4 rounded-xl border-2 border-onfisc-beige bg-white text-onfisc-dark placeholder:text-onfisc-brown/40 focus:border-onfisc-orange focus:outline-none transition-all duration-300 text-base"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-onfisc-dark font-semibold mb-2">
                Email <span className="text-onfisc-orange">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="seu@email.com"
                required
                className="w-full px-5 py-4 rounded-xl border-2 border-onfisc-beige bg-white text-onfisc-dark placeholder:text-onfisc-brown/40 focus:border-onfisc-orange focus:outline-none transition-all duration-300 text-base"
              />
            </div>

            {/* Instituição e Telefone - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="instituicao" className="block text-onfisc-dark font-semibold mb-2">
                  Instituição
                </label>
                <input
                  type="text"
                  id="instituicao"
                  name="instituicao"
                  value={formData.instituicao}
                  onChange={handleFormChange}
                  placeholder="Nome da instituição"
                  className="w-full px-5 py-4 rounded-xl border-2 border-onfisc-beige bg-white text-onfisc-dark placeholder:text-onfisc-brown/40 focus:border-onfisc-orange focus:outline-none transition-all duration-300 text-base"
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-onfisc-dark font-semibold mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleFormChange}
                  placeholder="(00) 00000-0000"
                  className="w-full px-5 py-4 rounded-xl border-2 border-onfisc-beige bg-white text-onfisc-dark placeholder:text-onfisc-brown/40 focus:border-onfisc-orange focus:outline-none transition-all duration-300 text-base"
                />
              </div>
            </div>

            {/* Mensagem */}
            <div className="mb-6">
              <label htmlFor="mensagem" className="block text-onfisc-dark font-semibold mb-2">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleFormChange}
                placeholder="Como podemos ajudar?"
                rows={5}
                maxLength={500}
                className="w-full px-5 py-4 rounded-xl border-2 border-onfisc-beige bg-white text-onfisc-dark placeholder:text-onfisc-brown/40 focus:border-onfisc-orange focus:outline-none transition-all duration-300 resize-none text-base"
              ></textarea>
              <p className="text-sm text-onfisc-brown/60 mt-2">
                {formData.mensagem.length}/500 caracteres
              </p>
            </div>

            {/* Mensagens de Feedback */}
            {formSuccess && (
              <div className="mb-6 p-5 bg-green-50 border-2 border-green-500 rounded-xl flex items-start gap-3 animate-fade-in success-message">
                <i className="ri-checkbox-circle-fill text-3xl text-green-600 flex-shrink-0"></i>
                <div>
                  <p className="text-green-800 font-bold text-lg mb-1">✅ Mensagem enviada com sucesso!</p>
                  <p className="text-green-700 text-base">Nossa equipe entrará em contato em breve. Obrigado!</p>
                </div>
              </div>
            )}

            {formError && (
              <div className="mb-6 p-5 bg-red-50 border-2 border-red-500 rounded-xl flex items-start gap-3 animate-fade-in">
                <i className="ri-error-warning-fill text-3xl text-red-600 flex-shrink-0"></i>
                <div>
                  <p className="text-red-800 font-bold text-lg mb-1">❌ Erro ao enviar</p>
                  <p className="text-red-700 text-base">{formError}</p>
                </div>
              </div>
            )}

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={formSubmitting}
                className="flex-1 px-8 py-4 rounded-full bg-onfisc-orange text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(243,146,0,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formSubmitting ? (
                  <>
                    <i className="ri-loader-4-line text-xl animate-spin"></i>
                    Enviando...
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-fill text-xl"></i>
                    Enviar Mensagem
                  </>
                )}
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-8 py-4 rounded-full bg-white border-2 border-onfisc-orange text-onfisc-orange font-bold text-lg hover:bg-onfisc-orange hover:text-white transition-all duration-300 flex items-center justify-center gap-3 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-whatsapp-line text-xl"></i>
                WhatsApp
              </a>
            </div>
          </form>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gradient-to-br from-onfisc-brown via-[#7A5230] to-onfisc-dark text-white rounded-t-[40px] mx-6 mt-24 pt-20 pb-12 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 text-[200px] font-extrabold text-white/5 leading-none select-none pointer-events-none">
          ONFISC
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Coluna 1: Branding */}
            <div className="lg:col-span-1">
              <img
                src="https://static.readdy.ai/image/bce494a419de709d2f80d1de9873d5fd/f6e557db2f6435cbde1d76ea72d737a1.png"
                alt="ONFISC"
                className="h-12 w-auto mb-6"
              />
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Fiscalização de exames profissional e humanizada para instituições de ensino
              </p>
              <div className="flex items-center gap-3 text-white/80">
                <i className="ri-map-pin-line text-onfisc-orange text-xl"></i>
                <span className="text-sm">Salvador &amp; Região Metropolitana</span>
              </div>
            </div>

            {/* Coluna 2: Links Rápidos */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Navegação</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Serviços', href: '#servicos' },
                  { label: 'Como Trabalhamos', href: '#como-trabalhamos' },
                  { label: 'Diferenciais', href: '#diferenciais' },
                  { label: 'Depoimentos', href: '#depoimentos' },
                ].map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-white/70 hover:text-onfisc-orange transition-colors duration-300">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 3: Contato */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Contato</h4>
              <div className="space-y-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-onfisc-orange transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-onfisc-orange group-hover:rotate-[360deg] transition-all duration-500">
                    <i className="ri-whatsapp-line text-xl"></i>
                  </div>
                  <span>(71) 99146-5614</span>
                </a>
                <a
                  href="mailto:contato@onfisc.com.br"
                  className="flex items-center gap-3 text-white/70 hover:text-onfisc-orange transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-onfisc-orange group-hover:rotate-[360deg] transition-all duration-500">
                    <i className="ri-mail-line text-xl"></i>
                  </div>
                  <span>contato@onfisc.com.br</span>
                </a>
              </div>
            </div>

            {/* Coluna 4: Redes Sociais */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Conecte-se</h4>
              <div className="space-y-4">
                <a
                  href="https://www.instagram.com/onfiscedu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-onfisc-orange transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-onfisc-orange group-hover:rotate-[360deg] transition-all duration-500">
                    <i className="ri-instagram-line text-xl"></i>
                  </div>
                  <span>@onfiscedu</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/onfisc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-onfisc-orange transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-onfisc-orange group-hover:rotate-[360deg] transition-all duration-500">
                    <i className="ri-linkedin-fill text-xl"></i>
                  </div>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
            <p>© 2024 ONFISC. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-onfisc-orange transition-colors duration-300">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-onfisc-orange transition-colors duration-300">
                Termos de Uso
              </a>
              <a href="https://readdy.ai/?origin=logo" target="_blank" rel="noopener noreferrer" className="hover:text-onfisc-orange transition-colors duration-300">
                Powered by Readdy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante WhatsApp - MENOR */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-onfisc-orange rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(243,146,0,0.5)] hover:scale-110 transition-all duration-300 z-50 cursor-pointer animate-pulse-float"
        aria-label="Falar no WhatsApp"
      >
        <i className="ri-whatsapp-line text-2xl text-white"></i>
      </a>
    </div>
  );
}
