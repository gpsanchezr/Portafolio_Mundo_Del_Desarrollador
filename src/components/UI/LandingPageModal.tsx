'use client';
/**
 * SENA LANDING PAGE MODAL
 * Rúbrica completa:
 *  Hero · Sobre Mí · Servicios · Portafolio · Testimonios · Contacto · Footer
 *
 * Abre cuando el avatar entra a la zona "landing" (Dev HQ / 2Story_Columns)
 * Simula integración WordPress/Divi con botón externo.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabaseFetch, type DBProject } from '@/lib/supabase';

/* ── SECTION TABS ──────────────────────────────────────────── */
const TABS = [
  { id:'hero',        label:'🏠 Hero'        },
  { id:'about',       label:'👩‍💻 Sobre Mí'   },
  { id:'services',    label:'⚙️ Servicios'   },
  { id:'portfolio',   label:'💻 Proyectos'   },
  { id:'testimonials',label:'💬 Testimonios' },
  { id:'contact',     label:'📬 Contacto'    },
];

/* ── HERO SECTION ──────────────────────────────────────────── */
function HeroSection() {
  return (
    <div style={{ textAlign:'center', padding:'48px 32px' }}>
      <div style={{ width:100, height:100, borderRadius:'50%', margin:'0 auto 22px',
        background:'linear-gradient(135deg,#7c3aed,#be185d)',
        display:'flex', alignItems:'center', justifyContent:'center', fontSize:46,
        boxShadow:'0 0 40px rgba(139,92,246,0.6)', border:'3px solid rgba(196,181,253,0.4)' }}>
        {/* 🔴 Replace: <img src="/images/giseella.jpg" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}}/> */}
        🌸
      </div>
      <h1 style={{ fontFamily:'"Playfair Display",serif', fontSize:'clamp(1.8rem,4vw,2.6rem)',
        fontWeight:700, color:'#c4b5fd', marginBottom:8,
        textShadow:'0 0 20px rgba(167,139,250,0.6)' }}>
        Giseella Patricia Sánchez Rico
      </h1>
      <p style={{ color:'#f9a8d4', fontSize:'0.88rem', letterSpacing:3,
        textTransform:'uppercase', fontFamily:'"JetBrains Mono",monospace', marginBottom:18 }}>
        Desarrolladora Full Stack · Tecnóloga ADSO-SENA
      </p>
      <p style={{ color:'rgba(196,181,253,0.78)', maxWidth:520, margin:'0 auto 32px',
        lineHeight:1.75, fontSize:'0.95rem' }}>
        Transformo ideas en experiencias digitales únicas. Código limpio, diseño
        creativo y arquitecturas escalables al servicio de tu visión. 🌸
      </p>
      <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
        <button className="btn-primary"
          onClick={()=>window.open('https://github.com/gpsanchezr','_blank')}>🐙 GitHub</button>
        <button className="btn-primary"
          style={{ background:'linear-gradient(135deg,#0a66c2,#0e7490)' }}
          onClick={()=>window.open('https://www.linkedin.com/in/giseella-sánchez-74b186227/','_blank')}>💼 LinkedIn</button>
        <button className="btn-primary"
          style={{ background:'linear-gradient(135deg,#16a34a,#059669)' }}
          onClick={()=>{
            const a=document.createElement('a');
            a.href='/cv/GiseellaSanchez_CV.pdf'; a.download='GiseellaSanchez_CV.pdf'; a.click();
          }}>📄 Descargar CV</button>
      </div>
      {/* WordPress integration note */}
      <div style={{ marginTop:28, padding:'14px 20px',
        background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.25)',
        borderRadius:12 }}>
        <p style={{ color:'rgba(196,181,253,0.6)', fontSize:'0.78rem' }}>
          ¿Prefieres la versión WordPress/Divi?{' '}
          <button onClick={()=>window.open('https://tu-sitio-wordpress.com','_blank')}
            style={{ background:'none', border:'none', color:'#a78bfa', cursor:'pointer',
              textDecoration:'underline', fontSize:'0.78rem', fontFamily:'"DM Sans",sans-serif' }}>
            Ver Landing Page en WordPress →
          </button>
        </p>
      </div>
    </div>
  );
}

/* ── ABOUT SECTION ─────────────────────────────────────────── */
function AboutSection() {
  const skills = [
    {name:'Python',  level:82,color:'#22c55e',icon:'🐍'},
    {name:'React',   level:78,color:'#61dafb',icon:'⚛️'},
    {name:'FastAPI', level:68,color:'#34d399',icon:'🚀'},
    {name:'PostgreSQL',level:74,color:'#60a5fa',icon:'🐘'},
    {name:'OpenCV',  level:65,color:'#22c55e',icon:'👁️'},
    {name:'Supabase',level:70,color:'#3ecf8e',icon:'⚡'},
    {name:'Docker',  level:60,color:'#2496ed',icon:'🐳'},
    {name:'Git',     level:85,color:'#f05032',icon:'🐙'},
  ];
  return (
    <div style={{ padding:'32px' }}>
      <div style={{ display:'flex', gap:28, flexWrap:'wrap', alignItems:'flex-start' }}>
        <div style={{ flex:1, minWidth:220 }}>
          <h3 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.4rem',
            color:'#c4b5fd', fontStyle:'italic', marginBottom:14 }}>
            ¿Quién soy? 🌸
          </h3>
          <p style={{ color:'rgba(196,181,253,0.82)', lineHeight:1.75, fontSize:'0.9rem', marginBottom:14 }}>
            Soy <strong style={{color:'#86efac'}}>Giseella Patricia Sánchez Rico</strong>, Tecnóloga
            en Análisis y Desarrollo de Software y Técnica en Programación del SENA (Cali, Colombia).
          </p>
          <p style={{ color:'rgba(196,181,253,0.72)', lineHeight:1.75, fontSize:'0.87rem', marginBottom:20 }}>
            Me apasiona crear soluciones que mezclen funcionalidad e identidad visual única.
            Especialista en Python, React, FastAPI, OpenCV y Supabase. 💜
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
            {['📍 Cali, Colombia','🎓 SENA ADSO','💻 Full Stack','🌸 UX/UI','🤖 IA/CV'].map((t,i)=>(
              <span key={i} className="skill-badge" style={{fontSize:'0.75rem'}}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ flex:1, minWidth:220 }}>
          <h3 style={{ color:'#c4b5fd', fontSize:'0.9rem', fontWeight:600,
            marginBottom:16, fontFamily:'"JetBrains Mono",monospace' }}>TECH STACK</h3>
          {skills.map((s,i)=>(
            <div key={i} style={{ marginBottom:10 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                <span style={{ color:'#c4b5fd', fontSize:'0.82rem' }}>{s.icon} {s.name}</span>
                <span style={{ color:'rgba(196,181,253,0.4)', fontSize:'0.7rem',
                  fontFamily:'"JetBrains Mono",monospace' }}>{s.level}%</span>
              </div>
              <div style={{ height:5, background:'rgba(139,92,246,0.12)', borderRadius:3, overflow:'hidden' }}>
                <motion.div initial={{width:0}} animate={{width:`${s.level}%`}}
                  transition={{delay:i*0.04, duration:0.7, ease:'easeOut'}}
                  style={{ height:'100%', background:`linear-gradient(90deg,${s.color},${s.color}88)`,
                    borderRadius:3, boxShadow:`0 0 6px ${s.color}55` }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SERVICES SECTION ──────────────────────────────────────── */
const SERVICES = [
  { icon:'🌐', color:'#7c3aed', title:'Desarrollo Web Full Stack',
    desc:'Apps completas con React/Next.js + FastAPI/Django + PostgreSQL. Desde el diseño hasta el despliegue en producción.',
    techs:['React','Next.js','FastAPI','PostgreSQL','Docker'] },
  { icon:'🤖', color:'#22c55e', title:'IA & Visión por Computador',
    desc:'Sistemas inteligentes con OpenCV y Python. Reconocimiento de imágenes, automatización y análisis de datos.',
    techs:['Python','OpenCV','NumPy','Raspberry Pi','FastAPI'] },
  { icon:'🗄️', color:'#0891b2', title:'Arquitectura de Bases de Datos',
    desc:'Modelado, optimización y administración de bases de datos relacionales. APIs REST seguras y documentadas.',
    techs:['PostgreSQL','MySQL','Supabase','Docker','SQL'] },
  { icon:'🎨', color:'#be185d', title:'Diseño UI/UX & Experiencias 3D',
    desc:'Interfaces intuitivas y mundos 3D interactivos (como este portafolio) con Three.js y React Three Fiber.',
    techs:['Figma','Three.js','R3F','Tailwind','Framer Motion'] },
];

function ServicesSection() {
  return (
    <div style={{ padding:'28px' }}>
      <h3 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.4rem', color:'#c4b5fd',
        fontStyle:'italic', marginBottom:20 }}>Mis Servicios ⚙️</h3>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
        {SERVICES.map((s,i)=>(
          <motion.div key={i} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
            transition={{delay:i*0.08}} className="project-card" style={{padding:'20px'}}>
            <div style={{ width:48, height:48, borderRadius:12, background:`${s.color}20`,
              border:`1px solid ${s.color}40`, display:'flex', alignItems:'center',
              justifyContent:'center', fontSize:24, marginBottom:12 }}>{s.icon}</div>
            <h4 style={{ color:'#e2d9f3', fontSize:'0.95rem', fontWeight:700, marginBottom:8 }}>{s.title}</h4>
            <p style={{ color:'rgba(196,181,253,0.68)', fontSize:'0.82rem', lineHeight:1.62, marginBottom:12 }}>{s.desc}</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
              {s.techs.map(t=>(<span key={t} style={{ padding:'2px 9px', background:`${s.color}12`,
                border:`1px solid ${s.color}30`, borderRadius:999, color:s.color,
                fontSize:'0.68rem', fontFamily:'"JetBrains Mono",monospace' }}>{t}</span>))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── PORTFOLIO SECTION (Supabase-fed) ──────────────────────── */
const FALLBACK_PROJECTS = [
  { id:1, name:'GlowCode',   description:'E-commerce de moda con React + Django + Stripe.',      techs:['React','Django','PostgreSQL','Stripe'], github_url:'https://github.com/gpsanchezr/glowcode',   demo_url:'https://glowcode.ejemplo.com',  status:'Completado',   image_url:null },
  { id:2, name:'Cine-Verse', description:'Plataforma de streaming y reseñas con TMDB API.',      techs:['React','FastAPI','PostgreSQL','TMDB'],  github_url:'https://github.com/gpsanchezr/cine-verse', demo_url:'https://cineverse.ejemplo.com', status:'Completado',   image_url:null },
  { id:3, name:'ParkNidus',  description:'Gestión de parqueaderos con reconocimiento de placas.',techs:['Next.js','OpenCV','FastAPI','React Native'],github_url:'https://github.com/gpsanchezr/parknidus', demo_url:null,                           status:'En desarrollo',image_url:null },
  { id:4, name:'Happy-Farm', description:'Sistema agropecuario con reportes automáticos.',       techs:['Python','FastAPI','PostgreSQL','NumPy'], github_url:'https://github.com/gpsanchezr/happy-farm', demo_url:'https://happyfarm.ejemplo.com', status:'Completado',   image_url:null },
  { id:5, name:'Terrasoft',  description:'Gestión inmobiliaria con dashboard analytics.',        techs:['React','Django','PostgreSQL','Docker'],  github_url:'https://github.com/gpsanchezr/terrasoft',  demo_url:null,                           status:'En desarrollo',image_url:null },
];

const PROJECT_COLORS: Record<number, string> = { 1:'#be185d', 2:'#dc2626', 3:'#6366f1', 4:'#65a30d', 5:'#0891b2' };

function PortfolioSection() {
  const [projects, setProjects] = useState<DBProject[]>(FALLBACK_PROJECTS as DBProject[]);
  const [loading, setLoading] = useState(true);
  const [sel, setSel] = useState(0);

  useEffect(() => {
    supabaseFetch<DBProject>('projects', 'order=id').then(data => {
      if (data.length) setProjects(data);
      setLoading(false);
    }).catch(()=>setLoading(false));
  }, []);

  const p = projects[sel];
  if (!p) return null;
  const c = PROJECT_COLORS[p.id] ?? '#7c3aed';

  return (
    <div style={{ padding:'28px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:10 }}>
        <h3 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.4rem', color:'#c4b5fd', fontStyle:'italic' }}>Proyectos 💻</h3>
        {loading && <span style={{ color:'rgba(196,181,253,0.4)', fontSize:'0.72rem' }}>📡 Cargando desde Supabase…</span>}
      </div>
      {/* Dots */}
      <div style={{ display:'flex', gap:8, marginBottom:20 }}>
        {projects.map((_,i)=>(<button key={i} onClick={()=>setSel(i)} style={{ width:i===sel?22:8, height:8, borderRadius:4, border:'none', cursor:'pointer', background:i===sel?c:'rgba(139,92,246,0.25)', transition:'all 0.3s' }}/>))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={p.id} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} transition={{duration:0.25}}>
          <div style={{ background:`linear-gradient(135deg,${c}18,${c}06)`, border:`1px solid ${c}30`,
            borderRadius:16, padding:'22px', marginBottom:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
              <h4 style={{ color:'#e2d9f3', fontSize:'1.1rem', fontWeight:700 }}>{p.name}</h4>
              <span style={{ padding:'2px 9px', background:`${c}20`, border:`1px solid ${c}40`,
                borderRadius:999, color:c, fontSize:'0.66rem' }}>{p.status}</span>
            </div>
            {p.image_url && (
              <img src={p.image_url} alt={p.name} style={{ width:'100%', height:120, objectFit:'cover',
                borderRadius:10, marginBottom:12 }}/>
            )}
            <p style={{ color:'rgba(196,181,253,0.8)', fontSize:'0.87rem', lineHeight:1.65, marginBottom:14 }}>{p.description}</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:16 }}>
              {(Array.isArray(p.techs) ? p.techs : []).map((t: string)=>(<span key={t} className="skill-badge">{t}</span>))}
            </div>
            <div style={{ display:'flex', gap:9, flexWrap:'wrap' }}>
              {p.demo_url && (<button className="btn-primary" style={{fontSize:'0.82rem'}} onClick={()=>window.open(p.demo_url!,'_blank')}>🌐 Demo</button>)}
              <button className="btn-primary" style={{background:'linear-gradient(135deg,#1f2937,#374151)',fontSize:'0.82rem'}} onClick={()=>window.open(p.github_url,'_blank')}>🐙 Código</button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        {[['← Ant.',()=>setSel((sel-1+projects.length)%projects.length)],['Sig. →',()=>setSel((sel+1)%projects.length)]].map(([l,fn],i)=>(
          <button key={i} onClick={fn as ()=>void} style={{ background:'rgba(139,92,246,0.14)', border:'1px solid rgba(139,92,246,0.28)', borderRadius:10, padding:'7px 18px', color:'#c4b5fd', cursor:'pointer', fontSize:'0.84rem', fontFamily:'"DM Sans",sans-serif' }}>{l as string}</button>
        ))}
      </div>
    </div>
  );
}

/* ── TESTIMONIALS SECTION ──────────────────────────────────── */
const TESTIMONIALS = [
  { name:'Alexander Rivera', role:'Instructor ADSO · SENA', avatar:'👨‍🏫', color:'#7c3aed', rating:5,
    text:'Giseella demuestra capacidad excepcional para aprender y aplicar conceptos técnicos. Su portafolio 3D interactivo es evidencia de un talento muy por encima del nivel esperado.' },
  { name:'Eleanyeris Pérez',  role:'Compañera de equipo',   avatar:'👩‍💻', color:'#be185d', rating:5,
    text:'Trabajar con Giseella es enriquecedor. Siempre aporta soluciones innovadoras y hace el código elegante, legible y hermoso. Su pasión por el diseño transforma cada proyecto.' },
  { name:'Happy-Farm · Cliente', role:'Proyecto académico', avatar:'🌾', color:'#65a30d', rating:5,
    text:'El sistema agropecuario superó expectativas. Entrega a tiempo, código limpio y dashboard exactamente lo que necesitábamos.' },
];

function TestimonialsSection() {
  return (
    <div style={{ padding:'28px' }}>
      <h3 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.4rem', color:'#c4b5fd', fontStyle:'italic', marginBottom:20 }}>Testimonios 💬</h3>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {TESTIMONIALS.map((t,i)=>(
          <motion.div key={i} initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:i*0.1}}
            style={{ background:`linear-gradient(135deg,${t.color}12,transparent)`, border:`1px solid ${t.color}28`, borderRadius:14, padding:'18px 20px' }}>
            <div style={{ display:'flex', gap:3, marginBottom:9 }}>{Array.from({length:t.rating}).map((_,s)=>(<span key={s} style={{color:'#fbbf24',fontSize:'0.86rem'}}>★</span>))}</div>
            <p style={{ color:'rgba(196,181,253,0.84)', lineHeight:1.68, fontSize:'0.86rem', marginBottom:12, fontStyle:'italic' }}>"{t.text}"</p>
            <div style={{ display:'flex', alignItems:'center', gap:9 }}>
              <div style={{ width:38,height:38,borderRadius:'50%',background:`${t.color}20`,border:`1px solid ${t.color}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18 }}>{t.avatar}</div>
              <div>
                <p style={{ color:'#e2d9f3', fontSize:'0.84rem', fontWeight:600 }}>{t.name}</p>
                <p style={{ color:t.color, fontSize:'0.72rem' }}>{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── CONTACT SECTION ───────────────────────────────────────── */
function ContactSection() {
  const [form, setForm] = useState({name:'',email:'',msg:''});
  const [sent, setSent] = useState(false);
  const inp:React.CSSProperties={ width:'100%',padding:'9px 13px',background:'rgba(139,92,246,0.08)',border:'1px solid rgba(139,92,246,0.28)',borderRadius:9,color:'#e2d9f3',fontSize:'0.86rem',fontFamily:'"DM Sans",sans-serif',outline:'none',boxSizing:'border-box' };

  return (
    <div style={{ padding:'28px' }}>
      <h3 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.4rem', color:'#c4b5fd', fontStyle:'italic', marginBottom:20 }}>Contacto 📬</h3>
      <div style={{ display:'flex', gap:28, flexWrap:'wrap' }}>
        <div style={{ flex:1, minWidth:200 }}>
          <p style={{ color:'rgba(196,181,253,0.7)', fontSize:'0.87rem', lineHeight:1.7, marginBottom:18 }}>¿Tienes un proyecto o propuesta? ¡Hablemos! 🌸</p>
          <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
            {[
              {l:'GitHub',  i:'🐙',url:'https://github.com/gpsanchezr'},
              {l:'LinkedIn',i:'💼',url:'https://www.linkedin.com/in/giseella-sánchez-74b186227/'},
              {l:'Email',   i:'📧',url:'mailto:giseella@email.com'},
              {l:'WordPress Site',i:'🌐',url:'https://tu-sitio-wordpress.com'},
            ].map(lk=>(
              <button key={lk.l} onClick={()=>window.open(lk.url,'_blank')}
                style={{ display:'flex',alignItems:'center',gap:8,padding:'8px 14px',background:'rgba(139,92,246,0.1)',border:'1px solid rgba(139,92,246,0.26)',borderRadius:10,color:'#c4b5fd',cursor:'pointer',fontSize:'0.82rem',fontFamily:'"DM Sans",sans-serif',textAlign:'left' }}>
                {lk.i} {lk.l}
              </button>
            ))}
          </div>
        </div>
        <div style={{ flex:1, minWidth:220 }}>
          {sent ? (
            <div style={{ textAlign:'center', padding:'28px 0' }}>
              <div style={{ fontSize:42,marginBottom:10 }}>🌸</div>
              <p style={{ color:'#86efac', fontSize:'0.95rem' }}>¡Mensaje enviado! Gracias 💜</p>
            </div>
          ) : (
            <form onSubmit={e=>{e.preventDefault();window.location.href=`mailto:giseella@email.com?subject=Contacto - ${form.name}&body=${form.msg}%0AEmail: ${form.email}`;setSent(true);}}>
              {[{id:'name',label:'Nombre',type:'text',ph:'Tu nombre',val:form.name,set:(v:string)=>setForm(f=>({...f,name:v}))},
                {id:'email',label:'Email',type:'email',ph:'tu@email.com',val:form.email,set:(v:string)=>setForm(f=>({...f,email:v}))}].map(fld=>(
                <div key={fld.id} style={{marginBottom:12}}>
                  <label style={{color:'rgba(196,181,253,0.6)',fontSize:'0.78rem',display:'block',marginBottom:4}}>{fld.label}</label>
                  <input required type={fld.type} placeholder={fld.ph} value={fld.val} onChange={e=>fld.set(e.target.value)} style={inp}/>
                </div>
              ))}
              <div style={{marginBottom:16}}>
                <label style={{color:'rgba(196,181,253,0.6)',fontSize:'0.78rem',display:'block',marginBottom:4}}>Mensaje</label>
                <textarea required rows={3} placeholder="Cuéntame sobre tu proyecto…" value={form.msg} onChange={e=>setForm(f=>({...f,msg:e.target.value}))} style={{...inp,resize:'vertical'}}/>
              </div>
              <button type="submit" className="btn-primary" style={{width:'100%'}}>📬 Enviar</button>
            </form>
          )}
        </div>
      </div>
      {/* Footer */}
      <div style={{ borderTop:'1px solid rgba(139,92,246,0.14)', marginTop:24, paddingTop:16, textAlign:'center' }}>
        <p style={{ color:'rgba(196,181,253,0.28)', fontSize:'0.7rem' }}>
          © 2026 Giseella Patricia Sánchez Rico · Actividad ADSO-SENA · Hecho con 💜 y código
        </p>
      </div>
    </div>
  );
}

/* ── MAIN MODAL ────────────────────────────────────────────── */
export default function LandingPageModal({ onClose }:{ onClose:()=>void }) {
  const [tab, setTab] = useState('hero');

  const SECTIONS: Record<string, React.ReactNode> = {
    hero:         <HeroSection/>,
    about:        <AboutSection/>,
    services:     <ServicesSection/>,
    portfolio:    <PortfolioSection/>,
    testimonials: <TestimonialsSection/>,
    contact:      <ContactSection/>,
  };

  return (
    <motion.div
      initial={{opacity:0,scale:0.88,y:30}} animate={{opacity:1,scale:1,y:0}}
      exit={{opacity:0,scale:0.94,y:-20}} transition={{duration:0.45,ease:[0.22,1,0.36,1]}}
      style={{ background:'rgba(10,4,21,0.97)', backdropFilter:'blur(24px)',
        border:'1px solid rgba(139,92,246,0.35)', borderRadius:24, position:'relative',
        maxWidth:780, width:'100%', maxHeight:'88vh', display:'flex', flexDirection:'column',
        boxShadow:'0 0 80px rgba(139,92,246,0.18), inset 0 0 60px rgba(139,92,246,0.04)' }}>

      {/* Header */}
      <div style={{ padding:'20px 28px 0', borderBottom:'1px solid rgba(139,92,246,0.15)', flexShrink:0 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div>
            <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.3rem', color:'#c4b5fd', fontStyle:'italic' }}>
              🏢 Portafolio Profesional
            </h2>
            <p style={{ color:'rgba(196,181,253,0.4)', fontSize:'0.7rem', fontFamily:'"JetBrains Mono",monospace' }}>
              ADSO-SENA · Giseella Sánchez Rico · 2026
            </p>
          </div>
          <button className="close-btn" onClick={onClose} style={{ position:'static' }}>×</button>
        </div>
        {/* Tabs */}
        <div style={{ display:'flex', gap:4, flexWrap:'wrap', paddingBottom:0 }}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              padding:'7px 14px', border:'none', background:tab===t.id?'rgba(139,92,246,0.25)':'transparent',
              borderRadius:'8px 8px 0 0', color:tab===t.id?'#c4b5fd':'rgba(196,181,253,0.45)',
              cursor:'pointer', fontSize:'0.78rem', fontFamily:'"DM Sans",sans-serif',
              fontWeight:tab===t.id?600:400, transition:'all 0.2s',
              borderBottom:tab===t.id?'2px solid #7c3aed':'2px solid transparent',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ overflowY:'auto', flex:1 }}>
        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{opacity:0,x:16}} animate={{opacity:1,x:0}}
            exit={{opacity:0,x:-16}} transition={{duration:0.22}}>
            {SECTIONS[tab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
