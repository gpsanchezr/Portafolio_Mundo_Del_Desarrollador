'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const PROJECTS = [
  {
    id:1, name:'GlowCode', subtitle:'E-commerce de Moda',
    emoji:'✨', color:'#be185d', image:'🛍️', status:'Completado',
    description:'Tienda online completa para una marca de moda con catálogo de productos, carrito de compras, sistema de pagos Stripe, panel de administración y autenticación JWT.',
    techs:['React','Django','PostgreSQL','Stripe API','Docker'],
    features:['Sistema de pagos Stripe','Panel admin completo','Responsive design','Auth JWT','Deploy en Railway'],
    demo:'https://glowcode.ejemplo.com',
    github:'https://github.com/gpsanchezr/glowcode',
    // 🔴 Añade: screenshot: '/images/projects/glowcode.png',
  },
  {
    id:2, name:'Cine-Verse', subtitle:'Plataforma de Streaming & Reseñas',
    emoji:'🎬', color:'#dc2626', image:'🎭', status:'Completado',
    description:'Plataforma web para descubrir, calificar y reseñar películas. Integración con TMDB API, sistema de recomendaciones, perfiles de usuario y listas de seguimiento.',
    techs:['React','FastAPI','PostgreSQL','TMDB API','Tailwind'],
    features:['Integración TMDB','Sistema de reseñas','Recomendaciones IA','Listas personalizadas','Auth Social'],
    demo:'https://cineverse.ejemplo.com',
    github:'https://github.com/gpsanchezr/cine-verse',
  },
  {
    id:3, name:'ParkNidus', subtitle:'Gestión de Parqueaderos',
    emoji:'🚗', color:'#6366f1', image:'🅿️', status:'En desarrollo',
    description:'Sistema inteligente de gestión de parqueaderos. Reservas en tiempo real, reconocimiento de placas, reportes de ocupación, facturación automática y app móvil.',
    techs:['Next.js','FastAPI','PostgreSQL','OpenCV','React Native'],
    features:['Reservas en tiempo real','Reconocimiento de placas','Dashboard analytics','Facturación auto','App móvil'],
    demo:null,
    github:'https://github.com/gpsanchezr/parknidus',
  },
  {
    id:4, name:'Happy-Farm', subtitle:'Gestión Agropecuaria',
    emoji:'🌾', color:'#65a30d', image:'🐄', status:'Completado',
    description:'Sistema para fincas y empresas agropecuarias. Registra cultivos, inventarios, ventas, gastos y genera reportes automatizados con gráficos para toma de decisiones.',
    techs:['Python','FastAPI','PostgreSQL','React','NumPy'],
    features:['Gestión de cultivos','Reportes PDF','Dashboard analytics','Inventario inteligente','Alertas automáticas'],
    demo:'https://happyfarm.ejemplo.com',
    github:'https://github.com/gpsanchezr/happy-farm',
  },
];

export default function ProjectsPanel({ onClose }: { onClose: () => void }) {
  const [cur, setCur] = useState(0);
  const total = PROJECTS.length;
  const p = PROJECTS[cur];

  return (
    <motion.div
      initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}
      exit={{opacity:0}} transition={{duration:0.4}}
      className="glass-panel"
      style={{ padding:'36px', maxWidth:700, width:'100%', position:'relative' }}
    >
      <button className="close-btn" onClick={onClose}>×</button>

      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
        <div style={{ width:4, height:30, background:'linear-gradient(180deg,#7c3aed,#be185d)', borderRadius:2 }}/>
        <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.65rem', color:'#c4b5fd', fontStyle:'italic' }}>
          Portafolio 💻
        </h2>
      </div>

      {/* Carousel dots */}
      <div style={{ display:'flex', gap:8, marginBottom:22, alignItems:'center' }}>
        {PROJECTS.map((_,i)=>(
          <button key={i} onClick={()=>setCur(i)} style={{
            width:i===cur?24:8, height:8, borderRadius:4, border:'none', cursor:'pointer',
            background:i===cur?p.color:'rgba(139,92,246,0.25)', transition:'all 0.3s',
          }}/>
        ))}
        <span style={{ marginLeft:'auto', color:'rgba(196,181,253,0.35)', fontSize:'0.78rem' }}>
          {cur+1} / {total}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={p.id}
          initial={{opacity:0,x:50}} animate={{opacity:1,x:0}}
          exit={{opacity:0,x:-50}} transition={{duration:0.28}}>

          {/* Project image placeholder */}
          <div style={{ width:'100%', height:140, borderRadius:14, marginBottom:18, overflow:'hidden',
            background:`linear-gradient(135deg,${p.color}22,${p.color}08)`,
            border:`1px solid ${p.color}33`,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:64 }}>
            {/* 🔴 Reemplaza con: <img src={p.screenshot} style={{width:'100%',height:'100%',objectFit:'cover'}}/> */}
            {p.image}
          </div>

          {/* Header */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
            <div style={{ width:52, height:52, borderRadius:13,
              background:`${p.color}22`, border:`1px solid ${p.color}33`,
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>
              {p.image}
            </div>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <h3 style={{ color:'#e2d9f3', fontSize:'1.2rem', fontWeight:700 }}>
                  {p.emoji} {p.name}
                </h3>
                <span style={{ padding:'2px 9px', background:`${p.color}20`,
                  border:`1px solid ${p.color}44`, borderRadius:999,
                  color:p.color, fontSize:'0.66rem' }}>{p.status}</span>
              </div>
              <p style={{ color:'rgba(196,181,253,0.45)', fontSize:'0.78rem' }}>{p.subtitle}</p>
            </div>
          </div>

          <p style={{ color:'rgba(196,181,253,0.8)', fontSize:'0.87rem', lineHeight:1.65, marginBottom:14 }}>
            {p.description}
          </p>

          {/* Features */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:14 }}>
            {p.features.map(f=>(
              <span key={f} style={{ color:'rgba(196,181,253,0.65)', fontSize:'0.75rem', display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ color:p.color }}>✦</span>{f}
              </span>
            ))}
          </div>

          {/* Techs */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:20 }}>
            {p.techs.map(t=>(
              <span key={t} className="skill-badge">{t}</span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {p.demo && (
              <button className="btn-primary" style={{ fontSize:'0.83rem' }}
                onClick={()=>window.open(p.demo!,'_blank')}>🌐 Ver Demo</button>
            )}
            <button className="btn-primary"
              style={{ background:'linear-gradient(135deg,#1f2937,#374151)', fontSize:'0.83rem' }}
              onClick={()=>window.open(p.github,'_blank')}>🐙 Ver Código</button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows */}
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:20 }}>
        {[['← Anterior', ()=>setCur((cur-1+total)%total)],
          ['Siguiente →', ()=>setCur((cur+1)%total)]].map(([label,fn],i)=>(
          <button key={i} onClick={fn as ()=>void} style={{
            background:'rgba(139,92,246,0.15)', border:'1px solid rgba(139,92,246,0.3)',
            borderRadius:11, padding:'8px 20px', color:'#c4b5fd', cursor:'pointer',
            fontSize:'0.87rem', transition:'all 0.2s', fontFamily:'"DM Sans",sans-serif',
          }}>{label as string}</button>
        ))}
      </div>
    </motion.div>
  );
}
