'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const SKILLS = [
  { name:'Python',      icon:'🐍', cat:'Lenguajes',     level:82, color:'#22c55e' },
  { name:'JavaScript',  icon:'⚡', cat:'Lenguajes',     level:78, color:'#fbbf24' },
  { name:'TypeScript',  icon:'🔷', cat:'Lenguajes',     level:65, color:'#60a5fa' },
  { name:'HTML/CSS',    icon:'🎨', cat:'Lenguajes',     level:88, color:'#f97316' },
  { name:'SQL',         icon:'🗄️', cat:'Lenguajes',     level:75, color:'#a78bfa' },
  { name:'React',       icon:'⚛️', cat:'Frameworks',    level:75, color:'#61dafb' },
  { name:'Next.js',     icon:'▲',  cat:'Frameworks',    level:62, color:'#e2e8f0' },
  { name:'Django',      icon:'🎸', cat:'Frameworks',    level:58, color:'#4ade80' },
  { name:'FastAPI',     icon:'🚀', cat:'Frameworks',    level:65, color:'#34d399' },
  { name:'Three.js',    icon:'🎮', cat:'Frameworks',    level:60, color:'#818cf8' },
  { name:'PostgreSQL',  icon:'🐘', cat:'Bases de Datos',level:72, color:'#60a5fa' },
  { name:'MySQL',       icon:'🐬', cat:'Bases de Datos',level:70, color:'#22d3ee' },
  { name:'MongoDB',     icon:'🍃', cat:'Bases de Datos',level:52, color:'#4ade80' },
  { name:'Git',         icon:'🐙', cat:'Herramientas',  level:84, color:'#f87171' },
  { name:'Docker',      icon:'🐳', cat:'Herramientas',  level:57, color:'#60a5fa' },
  { name:'NumPy',       icon:'🔢', cat:'Herramientas',  level:68, color:'#818cf8' },
  { name:'Figma',       icon:'🎭', cat:'Herramientas',  level:72, color:'#f472b6' },
  { name:'VS Code',     icon:'💙', cat:'Herramientas',  level:92, color:'#38bdf8' },
];

const CATS = ['Todos','Lenguajes','Frameworks','Bases de Datos','Herramientas'];

export default function SkillsPanel({ onClose }: { onClose: () => void }) {
  const [cat, setCat] = useState('Todos');
  const list = cat==='Todos' ? SKILLS : SKILLS.filter(s=>s.cat===cat);

  return (
    <motion.div
      initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}
      exit={{opacity:0,y:-20}} transition={{duration:0.4}}
      className="glass-panel"
      style={{ padding:'36px', maxWidth:700, width:'100%', position:'relative', maxHeight:'82vh', overflowY:'auto' }}
    >
      <button className="close-btn" onClick={onClose}>×</button>

      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
        <div style={{ width:4, height:30, background:'linear-gradient(180deg,#22c55e,#059669)', borderRadius:2 }}/>
        <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.65rem', color:'#c4b5fd', fontStyle:'italic' }}>
          Habilidades 🐍
        </h2>
      </div>
      <p style={{ color:'rgba(196,181,253,0.55)', fontSize:'0.83rem', marginBottom:20 }}>
        Las tecnologías que habitan en mi jardín del desarrollo
      </p>

      {/* Category pills */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:22 }}>
        {CATS.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{
            padding:'5px 14px', borderRadius:999, cursor:'pointer', transition:'all 0.2s',
            border:`1px solid ${cat===c?'#22c55e':'rgba(139,92,246,0.3)'}`,
            background: cat===c?'rgba(34,197,94,0.2)':'transparent',
            color: cat===c?'#86efac':'rgba(196,181,253,0.5)',
            fontSize:'0.78rem', fontFamily:'"DM Sans",sans-serif',
          }}>{c}</button>
        ))}
      </div>

      {/* Skill badges */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:22 }}>
        {list.map((s,i)=>(
          <motion.span key={s.name} initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}}
            transition={{delay:i*0.025}} className="skill-badge">
            {s.icon} {s.name}
          </motion.span>
        ))}
      </div>

      {/* Skill bars */}
      {list.map((s,i)=>(
        <motion.div key={s.name} initial={{opacity:0,x:-18}} animate={{opacity:1,x:0}}
          transition={{delay:i*0.035}} style={{ marginBottom:11 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
            <span style={{ color:'#c4b5fd', fontSize:'0.83rem' }}>{s.icon} {s.name}</span>
            <span style={{ color:'rgba(196,181,253,0.45)', fontSize:'0.72rem', fontFamily:'"JetBrains Mono",monospace' }}>{s.level}%</span>
          </div>
          <div style={{ height:6, background:'rgba(139,92,246,0.12)', borderRadius:3, overflow:'hidden' }}>
            <motion.div initial={{width:0}} animate={{width:`${s.level}%`}}
              transition={{delay:i*0.035+0.1, duration:0.75, ease:'easeOut'}}
              style={{ height:'100%', background:`linear-gradient(90deg,${s.color},${s.color}88)`,
                borderRadius:3, boxShadow:`0 0 8px ${s.color}55` }}/>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
