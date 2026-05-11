'use client';
import { motion } from 'framer-motion';

export default function HeroPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -15 }}
      transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }}
      className="glass-panel"
      style={{ padding:'52px 48px', maxWidth:600, width:'100%', textAlign:'center', position:'relative' }}
    >
      <button className="close-btn" onClick={onClose}>×</button>

      {/* Avatar circle */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type:'spring', stiffness:200 }}
        style={{ width:110, height:110, borderRadius:'50%', margin:'0 auto 22px',
          background:'linear-gradient(135deg,#7c3aed,#be185d)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:48, boxShadow:'0 0 40px rgba(139,92,246,0.6)',
          border:'3px solid rgba(196,181,253,0.4)', overflow:'hidden' }}
      >
        {/* 🔴 Reemplaza con: <img src="/images/giseella.jpg" style={{width:'100%',height:'100%',objectFit:'cover'}}/> */}
        🌸
      </motion.div>

      <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.15}}
        className="glow-text"
        style={{ fontFamily:'"Playfair Display",serif', fontSize:'clamp(1.8rem,4vw,2.4rem)',
          fontWeight:700, color:'#c4b5fd', marginBottom:6 }}>
        Giseella Patricia Sánchez Rico
      </motion.h1>

      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.22}}
        style={{ color:'#f9a8d4', fontSize:'0.82rem', marginBottom:6,
          letterSpacing:2.5, textTransform:'uppercase', fontFamily:'"JetBrains Mono",monospace' }}>
        Full Stack Developer · Tecnóloga ADSO - SENA
      </motion.p>

      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}
        style={{ color:'rgba(196,181,253,0.75)', lineHeight:1.75, marginBottom:30,
          fontSize:'0.93rem', maxWidth:460, margin:'0 auto 30px' }}>
        Transformo ideas en experiencias digitales únicas combinando
        código limpio, diseño creativo y arquitecturas escalables. 🌸
        ¡Bienvenid@ a mi mundo mágico!
      </motion.p>

      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.38}}
        style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:22 }}>
        <button className="btn-primary"
          onClick={()=>window.open('https://github.com/gpsanchezr','_blank')}>
          🐙 GitHub
        </button>
        <button className="btn-primary"
          style={{ background:'linear-gradient(135deg,#0a66c2,#0e7490)' }}
          onClick={()=>window.open('https://www.linkedin.com/in/giseella-sánchez-74b186227/','_blank')}>
          💼 LinkedIn
        </button>
        <button className="btn-primary"
          style={{ background:'linear-gradient(135deg,#059669,#0d9488)' }}
          onClick={()=>window.open('mailto:giseella@email.com','_blank')}>
          📧 Email
        </button>
      </motion.div>

      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
        style={{ color:'rgba(196,181,253,0.35)', fontSize:'0.72rem' }}>
        🚲 Usa las flechas o WASD para explorar · Arrastra para rotar cámara · Scroll para zoom
      </motion.p>
    </motion.div>
  );
}
