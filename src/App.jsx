import { useRef, useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FiGithub,
  FiMail,
  FiExternalLink,
  FiVolume2,
  FiVolumeX,
} from 'react-icons/fi';
import {
  SiReact,
  SiTypescript,
  SiBootstrap,
  SiNodedotjs,
  SiSpringboot,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiSwagger,
  SiOpenjdk,
} from 'react-icons/si';

// ==================== ESTILOS GLOBAIS ====================
const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Nunito', sans-serif;
    background: linear-gradient(135deg, #e0f0ff 0%, #ffffff 100%);
    color: #1e293b;
    overflow-x: hidden;
  }

  @media (pointer: fine) {
    body {
      cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' fill='none' stroke='%234ecdc4' stroke-width='2' opacity='0.8'/><circle cx='12' cy='12' r='3' fill='%23ffffff'/></svg>") 12 12, auto;
    }
  }

  ::selection { background: #4ecdc4; color: #ffffff; }
  a { color: inherit; text-decoration: none; }
`;

// ==================== STYLED COMPONENTS ====================
const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) { padding: 0 1rem; }
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  transition: box-shadow 0.2s ease;

  &:hover { box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08); }

  @media (max-width: 600px) {
    backdrop-filter: none;
    background: rgba(255, 255, 255, 0.85);
    padding: 1.5rem;
    border-radius: 1.2rem;
  }
`;

const HeroSection = styled.section`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem 0 4rem;

  @media (max-width: 600px) {
    min-height: 80vh;
    padding: 1rem 0 2rem;
  }
`;

const Name = styled.h1`
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: clamp(3rem, 10vw, 5rem);
  color: #1e293b;
  margin-bottom: 0.3rem;
  line-height: 1.1;
`;

const Title = styled.p`
  font-family: 'Quicksand', sans-serif;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: #4ecdc4;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
`;

const Frase = styled.p`
  font-family: 'Quicksand', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 600;
  font-style: italic;
`;

const SectionTitle = styled.h2`
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 1.8rem;
  text-align: center;
  margin: 4rem 0 2rem;
  color: #1e293b;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background: #4ecdc4;
    margin: 0.5rem auto 0;
    border-radius: 3px;
  }

  @media (max-width: 600px) {
    margin: 3rem 0 1.5rem;
    font-size: 1.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Tag = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 2rem;
  padding: 0.5rem 1.2rem;
  margin: 0.3rem;
  font-size: 0.9rem;
  color: #1e293b;
  font-weight: 500;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 3rem 0;
  border-top: 1px solid rgba(0,0,0,0.05);
  margin-top: 4rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #4ecdc4;
  font-weight: 600;
  font-size: 0.95rem;
  transition: gap 0.2s;

  &:hover { gap: 0.7rem; text-decoration: underline; }
`;

// Botão de mute no canto inferior direito
const MuteButton = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 999;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #4ecdc4;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.12);
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    bottom: 1rem;
    right: 1rem;
    width: 42px;
    height: 42px;
  }
`;

// ==================== ÍCONES SVG ESTILO NINTENDO ====================
const IconWrapper = styled.div`
  width: 52px;
  height: 52px;
  margin-bottom: 1rem;
  color: #4ecdc4;
`;

const GamepadIcon = () => (
  <IconWrapper>
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="14" width="36" height="24" rx="8" />
      <circle cx="16" cy="26" r="3" />
      <circle cx="32" cy="26" r="3" />
      <path d="M24 18v-4" />
    </svg>
  </IconWrapper>
);

const PcComponentesIcon = () => (
  <IconWrapper>
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="12" width="36" height="26" rx="4" />
      <path d="M6 20h36" />
      <circle cx="16" cy="36" r="4" />
      <circle cx="32" cy="36" r="4" />
      <path d="M14 36h4M30 36h4" />
    </svg>
  </IconWrapper>
);

const AyapiIcon = () => (
  <IconWrapper>
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="14" width="28" height="24" rx="2" />
      <path d="M18 14V6M30 14V6" />
      <path d="M14 6h20" />
      <line x1="16" y1="20" x2="16" y2="34" />
      <line x1="24" y1="20" x2="24" y2="34" />
      <line x1="32" y1="20" x2="32" y2="34" />
      <path d="M10 14l4-4M38 14l-4-4" />
    </svg>
  </IconWrapper>
);

const OpinacashIcon = () => (
  <IconWrapper>
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="8" width="36" height="32" rx="3" />
      <path d="M14 26v8M24 20v14M34 16v18" />
      <circle cx="24" cy="14" r="2" />
    </svg>
  </IconWrapper>
);

// ==================== DADOS ====================
const experiences = [
  {
    role: "Full Stack Developer (Freelance)",
    company: "Opinacash / Enova",
    period: "Fev 2025 – Presente",
    achievements: [
      "Reduzi erros de submissão em 60% implementando validações no front e back.",
      "Construí dashboards analíticos com React e Recharts em tempo real.",
      "APIs REST com Node.js, Express e Sequelize garantindo consistência de dados."
    ],
    icon: <OpinacashIcon />
  },
  {
    role: "Frontend Developer (Jr.)",
    company: "PcComponentes",
    period: "Dez 2024 – Dez 2025",
    achievements: [
      "Home 15% mais rápida (Lighthouse) com lazy loading para 500k+ usuários.",
      "Conversão do checkout +8% corrigindo validações de CEP/frete.",
      "99% de consistência visual entre 5 navegadores e 10+ dispositivos."
    ],
    icon: <PcComponentesIcon />
  },
  {
    role: "Estágio em Eng. de Software",
    company: "AYAPI.AI",
    period: "Jul 2024 – Nov 2024",
    achievements: [
      "Eliminei 100% dos erros de inicialização de fluxos de IA com geolocalização e áudio.",
      "Simulei latências de rede e permissões, assegurando resiliência da aplicação."
    ],
    icon: <AyapiIcon />
  }
];

const projects = [
  {
    title: "2US – Backend",
    description: "API REST com Java Spring Boot, JWT, PostgreSQL. Convite com código único, finanças, calendário e wishlist.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "JWT", "Flyway"],
    link: "https://github.com/PauloTorrente/2Us",
    icon: <GamepadIcon />
  },
  {
    title: "2US – Android",
    description: "App nativo em Kotlin com Jetpack Compose, MVVM, Retrofit. Experiência completa de casal sincronizada.",
    tech: ["Kotlin", "Jetpack Compose", "MVVM", "Retrofit", "DataStore"],
    link: "#",
    icon: (
      <IconWrapper>
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="4" width="28" height="40" rx="4" />
          <circle cx="24" cy="34" r="2" />
          <path d="M18 8h12" />
        </svg>
      </IconWrapper>
    )
  },
  {
    title: "BoxShop Orders API",
    description: "Order management com state machine, controle de estoque automático, audit trail completo e relatórios de receita.",
    tech: ["Java 21", "Spring Boot 3.2", "JPA", "H2", "Docker", "Swagger"],
    link: "https://github.com/PauloTorrente/orders-service",
    icon: (
      <IconWrapper>
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="12" width="32" height="28" rx="3" />
          <path d="M8 20h32" />
          <path d="M16 28l4 4 8-8" />
          <circle cx="36" cy="10" r="4" />
        </svg>
      </IconWrapper>
    )
  },
  {
    title: "Catálogo de Peças Industriais",
    description: "Interface completa para distribuidores com busca inteligente, filtros dinâmicos, grid responsivo e disponibilidade por filial.",
    tech: ["React 18", "Styled Components", "Axios", "React Router", "Vite"],
    link: "https://parts-catalog-henna.vercel.app",
    secondaryLink: "https://github.com/PauloTorrente/bearings-catalog-api",
    secondaryLabel: "API Backend",
    icon: (
      <IconWrapper>
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="16" r="6" />
          <circle cx="32" cy="16" r="6" />
          <path d="M18 22v16M32 22v16" />
          <rect x="8" y="32" width="12" height="8" rx="2" />
          <rect x="28" y="32" width="12" height="8" rx="2" />
          <path d="M24 14v4" />
        </svg>
      </IconWrapper>
    )
  },
  {
    title: "Portfolio Frutiger Aero",
    description: "Este site. Construído com React, Styled-Components e Framer Motion. Design inspirado no Nintendo Wii/DS e na estética Frutiger Aero.",
    tech: ["React", "Styled-Components", "Framer Motion", "Vite"],
    link: "#",
    icon: (
      <IconWrapper>
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="10" width="36" height="28" rx="6" />
          <circle cx="24" cy="20" r="4" />
          <path d="M16 34l8-6 8 6" />
          <path d="M12 14l4 4M36 14l-4 4" />
        </svg>
      </IconWrapper>
    )
  }
];

const stackData = [
  { category: "Frontend", items: [
    { name: "React", icon: <SiReact size={18} /> },
    { name: "TypeScript", icon: <SiTypescript size={18} /> },
    { name: "Bootstrap", icon: <SiBootstrap size={18} /> },
  ]},
  { category: "Backend", items: [
    { name: "Node.js", icon: <SiNodedotjs size={18} /> },
    { name: "Java", icon: <SiOpenjdk size={18} /> },
    { name: "Spring Boot", icon: <SiSpringboot size={18} /> },
  ]},
  { category: "Banco de Dados", items: [
    { name: "PostgreSQL", icon: <SiPostgresql size={18} /> },
    { name: "MongoDB", icon: <SiMongodb size={18} /> },
  ]},
  { category: "Ferramentas", items: [
    { name: "Git", icon: <SiGit size={18} /> },
    { name: "Docker", icon: <SiDocker size={18} /> },
    { name: "Swagger", icon: <SiSwagger size={18} /> },
  ]},
];

// ==================== COMPONENTE PRINCIPAL ====================
export default function App() {
  const targetRef = useRef(null);
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.25;

    const unlockAudio = () => {
      audio.play().catch(() => {});
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };

    document.addEventListener('click', unlockAudio);
    document.addEventListener('keydown', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);

    audio.play().catch(() => {});

    return () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <>
      <GlobalStyle />
      <audio ref={audioRef} src="/wii-shop.mp3" loop preload="auto" />

      <MuteButton onClick={toggleMute} aria-label={isMuted ? 'Ativar som' : 'Mutar som'}>
        {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
      </MuteButton>

      <motion.div
        ref={targetRef}
        style={{
          background: `linear-gradient(180deg, #e0f0ff 0%, #ffffff ${backgroundY})`,
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "-100px", left: "-50px",
            width: "300px", height: "300px", borderRadius: "50%",
            background: "rgba(78,205,196,0.12)", filter: "blur(80px)",
          }} />
          <div style={{
            position: "absolute", bottom: "-80px", right: "-60px",
            width: "250px", height: "250px", borderRadius: "50%",
            background: "rgba(255,107,107,0.08)", filter: "blur(80px)",
          }} />
        </div>

        <Container>
          <HeroSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Name>Paulo Marcelo Moreno Pacheco</Name>
              <Title>Fullstack Developer</Title>
              <Frase>“Fazendo meu sonho de infância ser realidade.”</Frase>
            </motion.div>
          </HeroSection>

          <SectionTitle>Experiência</SectionTitle>
          <Grid>
            {experiences.map((exp, i) => (
              <GlassCard
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {exp.icon}
                <h3 style={{ fontFamily: "'Quicksand', sans-serif", marginBottom: "0.3rem", fontSize: "1.1rem" }}>
                  {exp.role}
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "1rem" }}>
                  {exp.company} · {exp.period}
                </p>
                <ul style={{ paddingLeft: "1.5rem", color: "#334155", fontSize: "0.95rem" }}>
                  {exp.achievements.map((ach, j) => (
                    <li key={j} style={{ marginBottom: "0.5rem", lineHeight: 1.5 }}>{ach}</li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </Grid>

          <SectionTitle>Projetos</SectionTitle>
          <Grid>
            {projects.map((proj, i) => (
              <GlassCard
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {proj.icon}
                <h3 style={{ fontFamily: "'Quicksand', sans-serif", marginBottom: "0.5rem" }}>{proj.title}</h3>
                <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1rem" }}>
                  {proj.description}
                </p>
                <div style={{ marginBottom: "0.8rem" }}>
                  {proj.tech.map(t => (
                    <Tag key={t} style={{ fontSize: "0.8rem", padding: "0.3rem 0.8rem" }}>{t}</Tag>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {proj.link !== '#' && (
                    <ProjectLink href={proj.link} target="_blank" rel="noreferrer">
                      <FiExternalLink size={16} /> {proj.link.includes('vercel') ? 'Ver demo' : 'Ver repositório'}
                    </ProjectLink>
                  )}
                  {proj.secondaryLink && (
                    <ProjectLink href={proj.secondaryLink} target="_blank" rel="noreferrer">
                      <FiExternalLink size={16} /> {proj.secondaryLabel}
                    </ProjectLink>
                  )}
                </div>
              </GlassCard>
            ))}
          </Grid>

          <SectionTitle>Stack</SectionTitle>
          <GlassCard
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{ textAlign: "center" }}
          >
            {stackData.map((group) => (
              <div key={group.category} style={{ marginBottom: "1.5rem" }}>
                <h4 style={{
                  color: "#4ecdc4",
                  marginBottom: "0.8rem",
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: "1rem",
                }}>
                  {group.category}
                </h4>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                  {group.items.map((item) => (
                    <Tag key={item.name} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      {item.icon}
                      {item.name}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </GlassCard>

          <Footer>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{
                display: "flex",
                gap: "1.5rem",
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: "1.5rem"
              }}
            >
              <a
                href="mailto:paulommorenotorrente@gmail.com"
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.8rem 1.5rem",
                  background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)",
                  borderRadius: "2rem", border: "1px solid rgba(255,255,255,0.8)",
                  transition: "all 0.2s", fontSize: "0.95rem",
                }}
              >
                <FiMail /> paulommorenotorrente@gmail.com
              </a>
              <a
                href="https://github.com/PauloTorrente"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.8rem 1.5rem",
                  background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)",
                  borderRadius: "2rem", border: "1px solid rgba(255,255,255,0.8)",
                  transition: "all 0.2s", fontSize: "0.95rem",
                }}
              >
                <FiGithub /> github.com/PauloTorrente
              </a>
            </motion.div>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
              © 2026 — Um portfolio com alma de console.
            </p>
          </Footer>
        </Container>
      </motion.div>
    </>
  );
}
