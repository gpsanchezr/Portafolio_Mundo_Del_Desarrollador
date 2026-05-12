'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import HeroPanel from './HeroPanel';
import AboutPanel from './AboutPanel';
import SkillsPanel from './SkillsPanel';
import ServicesPanel from './ServicesPanel';
import ProjectsPanel from './ProjectsPanel';
import LandingPageModal from './LandingPageModal';
import {
  TestimonialsPanel,
  ContactPanel,
  FooterPanel,
  ProjectZonePanel,
} from './Panels';

/* ── AUDIO ──────────────────────────────────────────────────── */
function useSounds() {
  const bgRef = useRef<HTMLAudioElement | null>(null);
  const { isMusicPlaying } = useGameStore();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    bgRef.current = new Audio('/audio/background.mp3');
    bgRef.current.loop = true;
    bgRef.current.volume = 0.28;
  }, []);

  useEffect(() => {
    if (!bgRef.current) return;
    if (isMusicPlaying) bgRef.current.play().catch(() => {});
    else bgRef.current.pause();
  }, [isMusicPlaying]);

  const play = (src: string, vol = 0.6) => {
    try {
      const a = new Audio(src);
      a.volume = vol;
      a.play();
    } catch {
      // ignore
    }
  };

  return {
    playOpen: () => play('/audio/open.mp3'),
    playClose: () => play('/audio/close.mp3', 0.5),
    playInside: () => play('/audio/inside.mp3', 0.35),
  };
}

/* ── INTRO SCREEN ───────────────────────────────────────────── */
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.55 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'radial-gradient(ellipse at 50% 55%,#1a0533 0%,#0a0415 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            bottom: 0,
            left: `${5 + i * 5}%`,
            fontSize: '1.4rem',
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.7, 0], y: -(300 + Math.random() * 400) }}
          transition={{
            delay: i * 0.35,
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          {['🌸', '🌷', '💜', '🌺', '✨'][i % 5]}
        </motion.span>
      ))}

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 590,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 68,
            marginBottom: 20,
            filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.9))',
          }}
        >
          🌸
        </div>
        <h1
          style={{
            fontFamily: '"Playfair Display",serif',
            fontSize: 'clamp(2rem,6vw,3.4rem)',
            fontWeight: 700,
            background:
              'linear-gradient(135deg,#c4b5fd,#f9a8d4,#c4b5fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 8,
            lineHeight: 1.2,
          }}
        >
          Mundo del Desarrollador
        </h1>
        <p
          style={{
            color: '#f9a8d4',
            fontSize: '0.9rem',
            marginBottom: 4,
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontFamily: '"JetBrains Mono",monospace',
          }}
        >
          Giseella Patricia Sánchez Rico
        </p>
        <p
          style={{
            color: 'rgba(196,181,253,0.55)',
            fontSize: '0.8rem',
            marginBottom: 32,
            lineHeight: 1.6,
          }}
        >
          Tecnología en Análisis y Desarrollo de Software<br />
          Técnica en Programación de Software · SENA
        </p>
        <div
          style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 36,
          }}
        >
          {[
            { k: '↑↓←→ / WASD', d: 'Mover bicicleta' },
            { k: 'Click + Drag', d: 'Rotar cámara' },
            { k: 'Scroll', d: 'Zoom' },
            { k: 'Acércate', d: 'Explorar zonas' },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.28)',
                borderRadius: 12,
                padding: '8px 14px',
                textAlign: 'center',
                minWidth: 110,
              }}
            >
              <p
                style={{
                  color: '#c4b5fd',
                  fontSize: '0.76rem',
                  fontFamily: '"JetBrains Mono",monospace',
                  marginBottom: 3,
                }}
              >
                {c.k}
              </p>
              <p
                style={{
                  color: 'rgba(196,181,253,0.45)',
                  fontSize: '0.68rem',
                }}
              >
                {c.d}
              </p>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="btn-primary"
          style={{ fontSize: '1.05rem', padding: '14px 52px' }}
        >
          🚲 Entrar al Mundo Mágico
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ── CONTROLS HUD ───────────────────────────────────────────── */
function ControlsHUD() {
  const [open, setOpen] = useState(true);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ delay: 0.8 }}
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 30,
            background: 'rgba(10,4,21,0.84)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(139,92,246,0.22)',
            borderRadius: 16,
            padding: '14px 18px',
            maxWidth: 218,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <p
              style={{
                color: '#c4b5fd',
                fontSize: '0.7rem',
                fontFamily: '"JetBrains Mono",monospace',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              AYUDA
            </p>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(196,181,253,0.3)',
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              ×
            </button>
          </div>

          {[
            { k: '⬆⬇⬅➡', t: 'Mover bicicleta' },
            { k: 'WASD', t: 'Alternativa' },
            { k: '🖱 Drag', t: 'Rotar cámara' },
            { k: '🖱 Scroll', t: 'Zoom' },
            { k: 'Acércate 🏠', t: 'Explorar secciones' },
          ].map((c, i) => (
            <div
              key={i}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}
            >
              <span
                style={{
                  background: 'rgba(139,92,246,0.2)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  borderRadius: 6,
                  padding: '2px 7px',
                  fontSize: '0.63rem',
                  color: '#c4b5fd',
                  fontFamily: '"JetBrains Mono",monospace',
                  minWidth: 62,
                  textAlign: 'center',
                  flexShrink: 0,
                }}
              >
                {c.k}
              </span>
              <span style={{ color: 'rgba(196,181,253,0.55)', fontSize: '0.68rem' }}>
                {c.t}
              </span>
            </div>
          ))}

          <div style={{ borderTop: '1px solid rgba(139,92,246,0.12)', marginTop: 8, paddingTop: 8 }}>
            <p style={{ color: 'rgba(196,181,253,0.35)', fontSize: '0.63rem', lineHeight: 1.55 }}>
              Organizando reqs.<br />ADSO-SENA portafolio
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── ZONE HINT ──────────────────────────────────────────────── */
function ZoneHint() {
  const hint = useGameStore((s) => s.nearbyZoneHint);
  return (
    <AnimatePresence>
      {hint && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          style={{
            position: 'fixed',
            top: 18,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10,4,21,0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(139,92,246,0.3)',
            borderRadius: 999,
            padding: '8px 24px',
            color: '#c4b5fd',
            fontSize: '0.78rem',
            fontFamily: '"JetBrains Mono",monospace',
            pointerEvents: 'none',
            zIndex: 30,
          }}
        >
          {hint}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── MINIMAP ────────────────────────────────────────────────── */
function MiniMap() {
  const { playerPosition, currentZone } = useGameStore();
  const S = 126,
    W = 65;
  const toMap = (v: number) => (v / W) * S * 0.46 + S / 2;
  const blips = [
    { id: 'hero', x: 0, z: 0, c: '#7c3aed' },
    { id: 'about', x: -22, z: -8, c: '#16a34a' },
    { id: 'landing', x: -14, z: 0, c: '#a855f7' },
    { id: 'skills', x: -8, z: 15, c: '#0ea5e9' },
    { id: 'services', x: 0, z: 22, c: '#f59e0b' },
    { id: 'happyfarm', x: -8, z: -22, c: '#65a30d' },
    { id: 'cineversa', x: 22, z: -12, c: '#dc2626' },
    { id: 'parknidus', x: 20, z: 10, c: '#6366f1' },
    { id: 'glowcode', x: 10, z: -20, c: '#be185d' },
    { id: 'terrasoft', x: -20, z: -20, c: '#0891b2' },
    { id: 'techlab', x: 14, z: 18, c: '#22c55e' },
    { id: 'contact', x: 0, z: -30, c: '#0891b2' },
    { id: 'testimonials', x: -20, z: 18, c: '#b45309' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 18,
        right: 18,
        width: S,
        height: S,
        zIndex: 30,
        background: 'rgba(10,4,21,0.9)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(139,92,246,0.3)',
        borderRadius: 14,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 14,
          background:
            'radial-gradient(circle,rgba(21,88,30,0.5) 0%,rgba(10,4,21,0) 70%)',
        }}
      />
      {blips.map((b) => (
        <div
          key={b.id}
          style={{
            position: 'absolute',
            width: currentZone === b.id ? 13 : 8,
            height: currentZone === b.id ? 13 : 8,
            borderRadius: '50%',
            background: b.c,
            left: toMap(b.x) - 5,
            top: toMap(-b.z) - 5,
            boxShadow: `0 0 ${currentZone === b.id ? 10 : 4}px ${b.c}`,
            transform: currentZone === b.id ? 'scale(1.3)' : 'scale(1)',
            transition: 'all 0.3s',
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          width: 9,
          height: 9,
          borderRadius: '50%',
          background: '#fde68a',
          boxShadow: '0 0 10px #fde68a',
          zIndex: 2,
          left: toMap(playerPosition[0]) - 4,
          top: toMap(-playerPosition[2]) - 4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 4,
          left: 6,
          color: 'rgba(196,181,253,0.35)',
          fontSize: '0.52rem',
          fontFamily: '"JetBrains Mono",monospace',
        }}
      >
        🗺 MAPA
      </div>
    </div>
  );
}

/* ── MUSIC + FOOTER HUD ─────────────────────────────────────── */
function MusicBtn() {
  const { isMusicPlaying, toggleMusic } = useGameStore();
  return (
    <button
      onClick={toggleMusic}
      title={isMusicPlaying ? 'Pausar' : 'Reproducir'}
      style={{
        position: 'fixed',
        bottom: 18,
        left: 18,
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: isMusicPlaying ? 'rgba(124,58,237,0.4)' : 'rgba(10,4,21,0.85)',
        border: `1px solid ${isMusicPlaying ? 'rgba(139,92,246,0.7)' : 'rgba(139,92,246,0.3)'}`,
        color: '#c4b5fd',
        fontSize: 20,
        cursor: 'pointer',
        zIndex: 30,
        backdropFilter: 'blur(12px)',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isMusicPlaying ? '🔊' : '🔇'}
    </button>
  );
}

function FooterHUD() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        pointerEvents: 'none',
        background: 'linear-gradient(to top,rgba(10,4,21,0.72) 0%,transparent 100%)',
        padding: '8px 24px 5px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <p
        style={{
          color: 'rgba(196,181,253,0.28)',
          fontSize: '0.67rem',
          fontFamily: '"JetBrains Mono",monospace',
        }}
      >
        © 2026 Giseella Patricia Sánchez Rico · ADSO-SENA · All rights reserved 💜
      </p>
    </div>
  );
}

function GithubLink() {
  return (
    <a
      href="https://github.com/gpsanchezr"
      target="_blank"
      rel="noreferrer"
      style={{
        position: 'fixed',
        top: 14,
        right: 14,
        zIndex: 30,
        background: 'rgba(10,4,21,0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(139,92,246,0.28)',
        borderRadius: 999,
        padding: '6px 14px',
        color: '#c4b5fd',
        fontSize: '0.73rem',
        fontFamily: '"JetBrains Mono",monospace',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      🐙 @gpsanchezr
    </a>
  );
}

/* ── DAY/NIGHT INDICATOR ────────────────────────────────────── */
function TimeIndicator() {
  const [time, setTime] = useState('☀️ Día');
  const isNight = useGameStore((s) => s.isNight);

  useEffect(() => {
    setTime(isNight ? '🌙 Noche' : '☀️ Día');
  }, [isNight]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 14,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        background: 'rgba(10,4,21,0.82)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(139,92,246,0.22)',
        borderRadius: 999,
        padding: '5px 16px',
        color: 'rgba(196,181,253,0.55)',
        fontSize: '0.72rem',
        fontFamily: '"JetBrains Mono",monospace',
        pointerEvents: 'none',
      }}
    >
      {time}
    </div>
  );
}

/* ── ZONE PANEL SELECTOR ────────────────────────────────────── */
const PROJECT_ZONES = new Set(['happyfarm', 'cineversa', 'parknidus', 'glowcode', 'terrasoft', 'techlab']);

function ZonePanel() {
  const { currentZone, closeUI } = useGameStore();
  const sounds = useSounds();

  useEffect(() => {
    if (currentZone) sounds.playInside();
  }, [currentZone]);

  const handleClose = () => {
    sounds.playClose();
    closeUI();
  };

  const renderPanel = () => {
    if (!currentZone) return null;
    if (PROJECT_ZONES.has(currentZone)) return <ProjectZonePanel zone={currentZone} onClose={handleClose} />;

    switch (currentZone) {
      case 'hero':
        return <HeroPanel onClose={handleClose} />;
      case 'about':
        return <AboutPanel onClose={handleClose} />;
      case 'skills':
        return <SkillsPanel onClose={handleClose} />;
      case 'services':
        return <ServicesPanel onClose={handleClose} />;
      case 'projects':
        return <ProjectsPanel onClose={handleClose} />;
      case 'landing':
        return <LandingPageModal onClose={handleClose} />;
      case 'testimonials':
        return <TestimonialsPanel onClose={handleClose} />;
      case 'contact':
        return <ContactPanel onClose={handleClose} />;
      case 'footer':
        return <FooterPanel onClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {currentZone && (
        <motion.div
          key={currentZone}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 60,
            padding: 20,
            overflowY: 'auto',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          {renderPanel()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── MAIN GAME UI ───────────────────────────────────────────── */
export default function GameUI() {
  const { hasStarted, setStarted, toggleMusic, isNight, toggleDayNight } = useGameStore();
  const sounds = useSounds();

  const handleStart = () => {
    setStarted();
    toggleMusic();
    sounds.playOpen();
  };

  return (
    <>
      <AnimatePresence>
        {!hasStarted && <IntroScreen onStart={handleStart} />}
      </AnimatePresence>
      {hasStarted && (
        <>
          <button
            onClick={toggleDayNight}
            style={{ position: 'fixed', bottom: '160px', right: '20px', zIndex: 9999, background: 'rgba(0,0,0,0.6)', border: '2px solid #c4b5fd', borderRadius: '50%', width: '45px', height: '45px', fontSize: '22px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 10px rgba(196, 181, 253, 0.4)' }}>

            {isNight ? '🌙' : '☀️'}
          </button>

          <ControlsHUD />
          <ZoneHint />
          <MiniMap />
          <MusicBtn />
          <GithubLink />
          <TimeIndicator />
          <FooterHUD />
          <ZonePanel />
        </>
      )}
    </>
  );
}

