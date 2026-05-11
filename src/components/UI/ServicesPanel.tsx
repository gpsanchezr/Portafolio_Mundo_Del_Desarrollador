'use client';
import { motion } from 'framer-motion';

const SERVICES = [
  {
    icon:'🌐', color:'#7c3aed',
    title:'Desarrollo Web Full Stack',
    description:'Creo aplicaciones web completas de principio a fin. Desde el diseño de interfaces modernas en React/Next.js hasta APIs robustas en FastAPI/Django con bases de datos PostgreSQL.',
    techs:['React','Next.js','Python','FastAPI','PostgreSQL'],
    features:['Apps responsivas','APIs RESTful','Autenticación JWT','Despliegue en Vercel/Railway'],
  },
  {
    icon:'🎨', color:'#be185d',
    title:'Diseño UI/UX & Experiencias 3D',
    description:'Diseño interfaces intuitivas y visualmente impactantes. Especialista en crear experiencias interactivas únicas usando Three.js y React Three Fiber — como este mismo portafolio.',
    techs:['Figma','Tailwind CSS','Three.js','Framer Motion','R3F'],
    features:['Prototipos en Figma','Animaciones fluidas','Mundos 3D interactivos','Diseño accesible'],
  },
  {
    icon:'🗄️', color:'#0891b2',
    title:'Arquitectura Backend & Bases de Datos',
    description:'Modelo, diseño y optimizo bases de datos relacionales y no relacionales. Construyo APIs seguras, eficientes y bien documentadas listas para producción.',
    techs:['PostgreSQL','MySQL','MongoDB','FastAPI','Docker'],
    features:['Modelado ER','APIs documentadas','Docker Compose','Queries optimizados'],
  },
  {
    icon:'🤖', color:'#059669',
    title:'Automatización con Python',
    description:'Desarrollo scripts y bots que automatizan procesos repetitivos. Análisis y visualización de datos con NumPy, Pandas y Matplotlib para toma de decisiones.',
    techs:['Python','NumPy','Pandas','Selenium','Matplotlib'],
    features:['Web scraping','Reportes automáticos','Análisis de datos','Integración con APIs'],
  },
];

export default function ServicesPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
      exit={{opacity:0,scale:0.95}} transition={{duration:0.4}}
      className="glass-panel"
      style={{ padding:'36px', maxWidth:740, width:'100%', position:'relative', maxHeight:'84vh', overflowY:'auto' }}
    >
      <button className="close-btn" onClick={onClose}>×</button>

      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
        <div style={{ width:4, height:30, background:'linear-gradient(180deg,#f59e0b,#d97706)', borderRadius:2 }}/>
        <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.65rem', color:'#c4b5fd', fontStyle:'italic' }}>
          Mis Servicios 🏪
        </h2>
      </div>
      <p style={{ color:'rgba(196,181,253,0.55)', fontSize:'0.83rem', marginBottom:24 }}>
        Soluciones digitales que puedo crear para ti o tu empresa
      </p>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:16 }}>
        {SERVICES.map((s,i)=>(
          <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            transition={{delay:i*0.1}} className="project-card" style={{ padding:'24px' }}>
            <div style={{ width:54, height:54, borderRadius:14,
              background:`${s.color}22`, border:`1px solid ${s.color}44`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:28, marginBottom:14 }}>
              {s.icon}
            </div>
            <h3 style={{ color:'#e2d9f3', fontSize:'0.98rem', fontWeight:700, marginBottom:10 }}>{s.title}</h3>
            <p style={{ color:'rgba(196,181,253,0.7)', fontSize:'0.82rem', lineHeight:1.65, marginBottom:14 }}>{s.description}</p>
            {/* Features */}
            <div style={{ display:'flex', flexDirection:'column', gap:4, marginBottom:14 }}>
              {s.features.map((f,j)=>(
                <span key={j} style={{ color:'rgba(196,181,253,0.65)', fontSize:'0.76rem', display:'flex', alignItems:'center', gap:6 }}>
                  <span style={{ color:s.color }}>✦</span>{f}
                </span>
              ))}
            </div>
            {/* Techs */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {s.techs.map(t=>(
                <span key={t} style={{ padding:'3px 10px', background:`${s.color}15`,
                  border:`1px solid ${s.color}33`, borderRadius:999, color:s.color,
                  fontSize:'0.7rem', fontFamily:'"JetBrains Mono",monospace' }}>{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop:24, textAlign:'center' }}>
        <p style={{ color:'rgba(196,181,253,0.5)', fontSize:'0.8rem', marginBottom:12 }}>
          ¿Tienes un proyecto en mente? 🌸
        </p>
        <button className="btn-primary"
          onClick={()=>window.open('mailto:giseella@email.com?subject=Proyecto desde portafolio','_blank')}>
          📧 Contáctame
        </button>
      </div>
    </motion.div>
  );
}
