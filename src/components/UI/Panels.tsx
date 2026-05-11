'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

/* ══════════════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { name:'Alexander Rivera',  role:'Instructor ADSO · SENA', avatar:'👨‍🏫', color:'#7c3aed', rating:5,
    text:'Giseella demuestra capacidad excepcional para aprender y aplicar conceptos técnicos. Su portafolio 3D interactivo es evidencia de un talento muy por encima del nivel esperado.' },
  { name:'Eleanyeris Pérez',  role:'Compañera de equipo',    avatar:'👩‍💻', color:'#be185d', rating:5,
    text:'Trabajar con Giseella es enriquecedor. Aporta soluciones innovadoras y hace el código elegante y hermoso. Su pasión por el diseño transforma cada proyecto.' },
  { name:'Happy-Farm · Cliente', role:'Proyecto académico',  avatar:'🌾', color:'#65a30d', rating:5,
    text:'El sistema agropecuario superó expectativas. Entrega a tiempo, código limpio y el dashboard era exactamente lo que necesitábamos.' },
  { name:'Cine-Verse · Usuario', role:'Proyecto personal',   avatar:'🎬', color:'#dc2626', rating:5,
    text:'La plataforma de streaming que construyó es increíble. Las recomendaciones son precisas y la interfaz es absolutamente intuitiva.' },
];

export function TestimonialsPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
      transition={{duration:0.4}} className="glass-panel"
      style={{ padding:'36px', maxWidth:680, width:'100%', position:'relative', maxHeight:'82vh', overflowY:'auto' }}>
      <button className="close-btn" onClick={onClose}>×</button>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
        <div style={{ width:4, height:30, background:'linear-gradient(180deg,#b45309,#92400e)', borderRadius:2 }}/>
        <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.65rem', color:'#c4b5fd', fontStyle:'italic' }}>Testimonios 💬</h2>
      </div>
      <p style={{ color:'rgba(196,181,253,0.55)', fontSize:'0.83rem', marginBottom:22 }}>Lo que dicen quienes han trabajado conmigo</p>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {TESTIMONIALS.map((t,i)=>(
          <motion.div key={i} initial={{opacity:0,x:-18}} animate={{opacity:1,x:0}} transition={{delay:i*0.1}}
            style={{ background:`linear-gradient(135deg,${t.color}12,transparent)`, border:`1px solid ${t.color}28`, borderRadius:14, padding:'18px 20px' }}>
            <div style={{ display:'flex', gap:3, marginBottom:9 }}>{Array.from({length:t.rating}).map((_,s)=>(<span key={s} style={{color:'#fbbf24',fontSize:'0.86rem'}}>★</span>))}</div>
            <p style={{ color:'rgba(196,181,253,0.84)', lineHeight:1.7, fontSize:'0.86rem', marginBottom:12, fontStyle:'italic' }}>"{t.text}"</p>
            <div style={{ display:'flex', alignItems:'center', gap:9 }}>
              <div style={{ width:38,height:38,borderRadius:'50%',background:`${t.color}20`,border:`1px solid ${t.color}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18 }}>{t.avatar}</div>
              <div><p style={{ color:'#e2d9f3', fontSize:'0.84rem', fontWeight:600 }}>{t.name}</p><p style={{ color:t.color, fontSize:'0.72rem' }}>{t.role}</p></div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════ */
export function ContactPanel({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({name:'',email:'',msg:''});
  const [sent, setSent] = useState(false);
  const inp:React.CSSProperties={ width:'100%',padding:'9px 13px',background:'rgba(139,92,246,0.08)',border:'1px solid rgba(139,92,246,0.28)',borderRadius:9,color:'#e2d9f3',fontSize:'0.86rem',fontFamily:'"DM Sans",sans-serif',outline:'none',boxSizing:'border-box' };

  return (
    <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.4}}
      className="glass-panel" style={{ padding:'36px', maxWidth:580, width:'100%', position:'relative' }}>
      <button className="close-btn" onClick={onClose}>×</button>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
        <div style={{ width:4, height:30, background:'linear-gradient(180deg,#0891b2,#0e7490)', borderRadius:2 }}/>
        <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.65rem', color:'#c4b5fd', fontStyle:'italic' }}>Contacto 📬</h2>
      </div>
      <p style={{ color:'rgba(196,181,253,0.55)', fontSize:'0.83rem', marginBottom:20 }}>¿Tienes un proyecto en mente? ¡Hablemos! 🌸</p>
      <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
        {[{l:'GitHub',i:'🐙',url:'https://github.com/gpsanchezr'},{l:'LinkedIn',i:'💼',url:'https://www.linkedin.com/in/giseella-sánchez-74b186227/'},{l:'Email',i:'📧',url:'mailto:giseella@email.com'},{l:'WordPress',i:'🌐',url:'https://tu-sitio-wordpress.com'}].map(lk=>(
          <button key={lk.l} onClick={()=>window.open(lk.url,'_blank')}
            style={{ display:'flex',alignItems:'center',gap:6,padding:'7px 13px',background:'rgba(139,92,246,0.1)',border:'1px solid rgba(139,92,246,0.26)',borderRadius:10,color:'#c4b5fd',cursor:'pointer',fontSize:'0.81rem',fontFamily:'"DM Sans",sans-serif' }}>
            {lk.i} {lk.l}</button>
        ))}
      </div>
      {sent ? (
        <div style={{ textAlign:'center', padding:'28px' }}><div style={{fontSize:46,marginBottom:12}}>🌸</div><p style={{color:'#86efac'}}>¡Mensaje enviado! Gracias 💜</p></div>
      ) : (
        <form onSubmit={e=>{e.preventDefault();window.location.href=`mailto:giseella@email.com?subject=Contacto - ${form.name}&body=${form.msg}%0AEmail: ${form.email}`;setSent(true);}}>
          {[{id:'name',label:'Nombre',type:'text',ph:'Tu nombre',val:form.name,set:(v:string)=>setForm(f=>({...f,name:v}))},{id:'email',label:'Email',type:'email',ph:'tu@email.com',val:form.email,set:(v:string)=>setForm(f=>({...f,email:v}))}].map(fld=>(
            <div key={fld.id} style={{marginBottom:13}}><label style={{color:'rgba(196,181,253,0.6)',fontSize:'0.79rem',display:'block',marginBottom:5}}>{fld.label}</label><input required type={fld.type} placeholder={fld.ph} value={fld.val} onChange={e=>fld.set(e.target.value)} style={inp}/></div>
          ))}
          <div style={{marginBottom:18}}><label style={{color:'rgba(196,181,253,0.6)',fontSize:'0.79rem',display:'block',marginBottom:5}}>Mensaje</label><textarea required rows={4} placeholder="Cuéntame sobre tu proyecto…" value={form.msg} onChange={e=>setForm(f=>({...f,msg:e.target.value}))} style={{...inp,resize:'vertical'}}/></div>
          <button type="submit" className="btn-primary" style={{width:'100%'}}>📬 Enviar Mensaje</button>
        </form>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════ */
export function FooterPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.4}}
      className="glass-panel" style={{ padding:'42px', maxWidth:520, width:'100%', position:'relative', textAlign:'center' }}>
      <button className="close-btn" onClick={onClose}>×</button>
      <div className="animate-float" style={{fontSize:52,marginBottom:16}}>🌸</div>
      <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.5rem', color:'#c4b5fd', marginBottom:8 }}>Mundo del Desarrollador</h2>
      <p style={{ color:'rgba(196,181,253,0.6)', fontSize:'0.88rem', lineHeight:1.7, marginBottom:22 }}>
        Portafolio interactivo 3D RPG creado con ❤️ por<br/>
        <strong style={{color:'#f9a8d4'}}>Giseella Patricia Sánchez Rico</strong><br/>
        Tecnóloga ADSO-SENA · Cali, Colombia
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:22, textAlign:'left' }}>
        {[{l:'Framework',v:'Next.js 14'},{l:'3D Engine',v:'React Three Fiber'},{l:'Físicas',v:'@react-three/rapier'},{l:'Estado',v:'Zustand'},{l:'Backend',v:'Supabase'},{l:'Estilos',v:'Tailwind CSS'}].map(it=>(
          <div key={it.l} style={{ padding:'9px 13px', background:'rgba(139,92,246,0.08)', borderRadius:10, border:'1px solid rgba(139,92,246,0.18)' }}>
            <p style={{color:'rgba(196,181,253,0.35)',fontSize:'0.68rem',fontFamily:'"JetBrains Mono",monospace'}}>{it.l}</p>
            <p style={{color:'#c4b5fd',fontSize:'0.8rem',fontWeight:600}}>{it.v}</p>
          </div>
        ))}
      </div>
      <p style={{color:'rgba(196,181,253,0.25)',fontSize:'0.72rem'}}>© 2026 Giseella P. Sánchez Rico · ADSO-SENA · Hecho con flores violetas 💜</p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   PROJECT ZONE PANELS (farm / cinema / parking / glowcode / terrasoft / techlab)
══════════════════════════════════════════════════ */
const PROJECT_MAP: Record<string, {name:string;emoji:string;color:string;desc:string;techs:string[];github:string;demo:string|null;status:string;extra?:string}> = {
  happyfarm:  { name:'Happy-Farm',  emoji:'🌾', color:'#65a30d', status:'Completado',   desc:'Sistema integral para gestión agropecuaria: cultivos, inventarios, ventas y reportes automáticos con gráficos para la toma de decisiones.', techs:['Python','FastAPI','PostgreSQL','React','NumPy'], github:'https://github.com/gpsanchezr/happy-farm', demo:'https://happyfarm.ejemplo.com' },
  cineversa:  { name:'Cine-Verse',  emoji:'🎬', color:'#dc2626', status:'Completado',   desc:'Plataforma de streaming y reseñas de películas. Integración con TMDB API, recomendaciones personalizadas y listas de seguimiento.', techs:['React','FastAPI','PostgreSQL','TMDB API','Tailwind'], github:'https://github.com/gpsanchezr/cine-verse', demo:'https://cineverse.ejemplo.com' },
  parknidus:  { name:'ParkNidus',   emoji:'🚗', color:'#6366f1', status:'En desarrollo',desc:'Sistema inteligente de parqueaderos con reservas en tiempo real, reconocimiento de placas y facturación automática.', techs:['Next.js','FastAPI','PostgreSQL','OpenCV','React Native'], github:'https://github.com/gpsanchezr/parknidus', demo:null },
  glowcode:   { name:'GlowCode',    emoji:'✨', color:'#be185d', status:'Completado',   desc:'E-commerce completo para marca de moda: catálogo, carrito, pagos Stripe, panel de administración y autenticación JWT.', techs:['React','Django','PostgreSQL','Stripe API','Docker'], github:'https://github.com/gpsanchezr/glowcode', demo:'https://glowcode.ejemplo.com' },
  terrasoft:  { name:'Terrasoft',   emoji:'🏠', color:'#0891b2', status:'En desarrollo',desc:'Sistema de gestión inmobiliaria con dashboard analytics, control de inventario de propiedades y reportes de gestión.', techs:['React','Django','PostgreSQL','Docker','Chart.js'], github:'https://github.com/gpsanchezr/terrasoft', demo:null },
  techlab:    { name:'Tech-IA Lab', emoji:'🤖', color:'#22c55e', status:'Completado',   desc:'Sistema de conteo de personas con Raspberry Pi 5 y OpenCV. Detección y seguimiento en tiempo real con dashboard de analytics.', techs:['Python','OpenCV','Raspberry Pi 5','FastAPI','React'], github:'https://github.com/gpsanchezr/people-counter', demo:null, extra:'🍓 Hardware: Raspberry Pi 5 · Cámara HQ · 4GB RAM' },
};

export function ProjectZonePanel({ zone, onClose }: { zone:string; onClose:()=>void }) {
  const p = PROJECT_MAP[zone];
  if (!p) return null;
  return (
    <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:0.38}}
      className="glass-panel" style={{ padding:'36px', maxWidth:560, width:'100%', position:'relative' }}>
      <button className="close-btn" onClick={onClose}>×</button>
      <div style={{ textAlign:'center', marginBottom:18 }}>
        <div style={{fontSize:50,marginBottom:10}}>{p.emoji}</div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:6 }}>
          <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.55rem', color:'#c4b5fd' }}>{p.name}</h2>
          <span style={{ padding:'2px 10px', background:`${p.color}22`, border:`1px solid ${p.color}44`, borderRadius:999, color:p.color, fontSize:'0.66rem' }}>{p.status}</span>
        </div>
      </div>
      <div style={{ width:'100%', height:120, borderRadius:14, marginBottom:18, background:`linear-gradient(135deg,${p.color}20,${p.color}08)`, border:`1px solid ${p.color}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:58 }}>{p.emoji}</div>
      <p style={{ color:'rgba(196,181,253,0.82)', fontSize:'0.88rem', lineHeight:1.68, marginBottom:14 }}>{p.desc}</p>
      {p.extra && (<div style={{ background:`${p.color}10`, border:`1px solid ${p.color}25`, borderRadius:10, padding:'10px 14px', marginBottom:14 }}><p style={{color:p.color,fontSize:'0.78rem'}}>{p.extra}</p></div>)}
      <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:20 }}>{p.techs.map(t=>(<span key={t} className="skill-badge">{t}</span>))}</div>
      <div style={{ display:'flex', gap:9, flexWrap:'wrap' }}>
        {p.demo && (<button className="btn-primary" onClick={()=>window.open(p.demo!,'_blank')}>🌐 Ver Demo</button>)}
        <button className="btn-primary" style={{background:'linear-gradient(135deg,#1f2937,#374151)'}} onClick={()=>window.open(p.github,'_blank')}>🐙 Ver Código</button>
      </div>
    </motion.div>
  );
}
