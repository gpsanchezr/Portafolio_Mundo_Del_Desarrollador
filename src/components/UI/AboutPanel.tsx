'use client';
import { motion } from 'framer-motion';

export default function AboutPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }}
      exit={{ opacity:0, x:40 }} transition={{ duration:0.4 }}
      className="glass-panel"
      style={{ padding:'40px', maxWidth:720, width:'100%', position:'relative', maxHeight:'85vh', overflowY:'auto' }}
    >
      <button className="close-btn" onClick={onClose}>×</button>

      <div style={{ display:'flex', gap:32, alignItems:'flex-start', flexWrap:'wrap' }}>
        {/* Photo */}
        <div style={{ flexShrink:0 }}>
          <div style={{ width:150, height:190, borderRadius:18,
            background:'linear-gradient(135deg,rgba(22,163,74,0.3),rgba(5,150,105,0.3))',
            border:'2px solid rgba(22,163,74,0.5)', display:'flex', alignItems:'center',
            justifyContent:'center', fontSize:54, overflow:'hidden',
            boxShadow:'0 0 30px rgba(22,163,74,0.3)' }}>
            {/* 🔴 Reemplaza: <img src="/images/giseella.jpg" style={{width:'100%',height:'100%',objectFit:'cover'}}/> */}
            🌸
          </div>
          <p style={{ textAlign:'center', color:'rgba(196,181,253,0.35)', fontSize:'0.65rem', marginTop:6 }}>
            Tu foto aquí →<br/>/public/images/giseella.jpg
          </p>
        </div>

        {/* Content */}
        <div style={{ flex:1, minWidth:220 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
            <div style={{ width:4, height:30, background:'linear-gradient(180deg,#16a34a,#059669)', borderRadius:2 }}/>
            <h2 style={{ fontFamily:'"Playfair Display",serif', fontSize:'1.7rem', color:'#c4b5fd', fontStyle:'italic' }}>
              Sobre Mí 🌳
            </h2>
          </div>

          <p style={{ color:'rgba(196,181,253,0.85)', lineHeight:1.75, fontSize:'0.9rem', marginBottom:14 }}>
            Soy <strong style={{ color:'#86efac' }}>Giseella Patricia Sánchez Rico</strong>, Tecnóloga en
            Análisis y Desarrollo de Software y Técnica en Programación de Software del SENA
            (Cali, Valle del Cauca). 💜
          </p>
          <p style={{ color:'rgba(196,181,253,0.78)', lineHeight:1.75, fontSize:'0.88rem', marginBottom:20 }}>
            Me apasiona crear soluciones digitales que combinen funcionalidad con identidad visual única.
            Creo que cada línea de código puede ser tan hermosa como un jardín en flor. 🌷
          </p>

          {/* Info chips */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:24 }}>
            {['📍 Cali, Colombia','🎓 Aprendiz SENA','💻 Full Stack Dev','🌸 UX/UI Design','🐍 Python','⚛️ React'].map((info,i)=>(
              <span key={i} className="skill-badge" style={{ fontSize:'0.76rem' }}>{info}</span>
            ))}
          </div>

          {/* CV Download */}
          <div style={{ background:'rgba(22,163,74,0.12)', border:'1px solid rgba(22,163,74,0.35)',
            borderRadius:16, padding:'18px 20px', marginBottom:20 }}>
            <p style={{ color:'#86efac', fontSize:'0.82rem', marginBottom:10, fontWeight:600 }}>
              📄 Hoja de Vida disponible
            </p>
            <p style={{ color:'rgba(196,181,253,0.6)', fontSize:'0.78rem', marginBottom:14 }}>
              Descarga mi CV completo con experiencia, proyectos y certificaciones.
              {/* 🔴 Coloca tu PDF en: /public/cv/GiseellaSanchez_CV.pdf */}
            </p>
            <button className="btn-primary"
              style={{ background:'linear-gradient(135deg,#16a34a,#059669)' }}
              onClick={() => {
                const a=document.createElement('a');
                a.href='/cv/GiseellaSanchez_CV.pdf';
                a.download='GiseellaSanchez_CV.pdf';
                a.click();
              }}>
              📥 Descargar Hoja de Vida (PDF)
            </button>
          </div>

          {/* Education */}
          <div style={{ borderTop:'1px solid rgba(139,92,246,0.2)', paddingTop:16 }}>
            <p style={{ color:'rgba(196,181,253,0.5)', fontSize:'0.72rem', fontFamily:'"JetBrains Mono",monospace',
              marginBottom:8, textTransform:'uppercase', letterSpacing:1 }}>Formación</p>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {[
                { t:'Tecnóloga en Análisis y Desarrollo de Software', i:'SENA • 2022–2025' },
                { t:'Técnica en Programación de Software', i:'SENA • 2021–2022' },
              ].map((ed,i)=>(
                <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:'#16a34a',
                    marginTop:5, flexShrink:0 }}/>
                  <div>
                    <p style={{ color:'#e2d9f3', fontSize:'0.83rem', fontWeight:500 }}>{ed.t}</p>
                    <p style={{ color:'rgba(196,181,253,0.45)', fontSize:'0.73rem' }}>{ed.i}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
