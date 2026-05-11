# 🌸 Mundo del Desarrollador v2.0
### Portafolio 3D RPG — Giseella Patricia Sánchez Rico

> Portafolio interactivo estilo videojuego AAA — inspirado en Bruno Simon, Animal Crossing y Stardew Valley.
> Avatar femenino en bicicleta, jardín con flores violetas, ciclo día/noche, NPCs con diálogos,
> edificios con proyectos, mapa miniatura y rúbrica ADSO-SENA completa.

---

## ⚡ Instalación en 3 pasos

```bash
# 1 · Requisito: Node.js 20 LTS
node -v   # debe mostrar v20.x.x
# Si tienes nvm:  nvm use 20

# 2 · Instalar dependencias
npm install

# 3 · Iniciar servidor de desarrollo
npm run dev
```

Abre **http://localhost:3000** 🎮

---

## 📜 Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor local (hot reload) |
| `npm run build` | Build de producción |
| `npm run start` | Inicia build de producción |
| `npm run clean:next` | Limpia caché `.next` (úsalo si hay errores) |
| `npm run typecheck` | Valida TypeScript |

---

## 🗺 Mapa del mundo

| Zona | Edificio | Contenido |
|---|---|---|
| 🌸 Centro | Pedestal | Hero — nombre, rol, GitHub, LinkedIn |
| 🏢 Dev HQ | Oficina columnas | Landing page SENA completa (7 secciones) |
| 🌳 Sobre Mí | Mansión verde | Bio profesional + Descargar CV |
| 🐍 Totems | Pilares mágicos | Habilidades — Python, React, PostgreSQL… |
| 🏪 Servicios | Mercado | 4 servicios con tarjetas |
| ✨ GlowCode | Mansión rosa | Proyecto e-commerce |
| 🎬 Cine-Verse | Teatro neón | Proyecto streaming |
| 🚗 ParkNidus | Edificio parking | Proyecto parqueaderos |
| 🌾 Happy-Farm | Granja + vaca + caballo | Proyecto agropecuario |
| 🏠 Terrasoft | Oficina azul | Proyecto inmobiliario |
| 🤖 Tech-IA Lab | Plataforma drone+torreta | Proyecto conteo de personas IA |
| 💬 Testimonios | Mansión ámbar | Comentarios de colaboradores |
| 📬 Contacto | Buzón rojo | Formulario + redes sociales |
| 🌙 Créditos | Pedestal final | Footer con stack tecnológico |

**NPCs interactivos:** 🐍 Python · 🐘 PostgreSQL · 🐳 Docker · ⚛️ React · 🐙 Git · ⚡ JS · 🐬 MySQL

---

## 🎮 Controles del juego

| Tecla | Acción |
|---|---|
| `↑ ↓ ← →` / `WASD` | Mover la bicicleta |
| `Click + Arrastrar` | Rotar cámara (360°) |
| `Scroll` | Zoom in/out |
| `Acércate` a edificios | Abrir panel de información |
| 🔊 botón inferior izq. | Activar/pausar música |

---

## 📁 Qué personalizar

### 🖼 Tu foto de perfil
```
public/images/giseella.jpg    ← coloca tu foto aquí
```
Luego en `HeroPanel.tsx` y `AboutPanel.tsx` descomenta:
```tsx
<img src="/images/giseella.jpg" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}}/>
```

### 📄 Tu CV
```
public/cv/GiseellaSanchez_CV.pdf    ← coloca tu PDF aquí
```

### 🔗 Tus redes sociales
Busca y reemplaza en todo el proyecto:
| Texto a buscar | Tu valor real |
|---|---|
| `https://github.com/gpsanchezr` | Tu GitHub |
| `https://www.linkedin.com/in/giseella-sánchez-74b186227/` | Tu LinkedIn |
| `giseella@email.com` | Tu email |
| `https://tu-sitio-wordpress.com` | Tu sitio WordPress |

### 💻 Añadir un proyecto nuevo
`src/components/UI/ProjectsPanel.tsx` → array `PROJECTS`:
```ts
{
  id: 6,
  name: 'NuevoProyecto',
  subtitle: 'Descripción corta',
  emoji: '🚀',
  color: '#7c3aed',
  description: 'Descripción completa...',
  image: '🌟',
  techs: ['React', 'Python'],
  features: ['Feature 1', 'Feature 2'],
  demo: 'https://demo.com',    // null si no hay demo
  github: 'https://github.com/gpsanchezr/nuevo',
  status: 'Completado',
},
```
Y en `src/components/UI/Panels.tsx` → objeto `PROJECT_MAP` agrega el ID y datos.

### 🧠 Añadir habilidad
`src/components/UI/SkillsPanel.tsx` → array `SKILLS`:
```ts
{ name:'Kotlin', icon:'📱', cat:'Lenguajes', level:55, color:'#7f52ff' },
```

### 💬 Añadir testimonio
`src/components/UI/Panels.tsx` → array `TESTIMONIALS`.

### 🖼 Screenshots de proyectos
Coloca imágenes en `public/images/projects/` y en cada panel añade:
```tsx
<img src="/images/projects/glowcode.png" style={{width:'100%',height:120,objectFit:'cover',borderRadius:10}}/>
```

---

## 🔊 Audio (ya incluido)

Los archivos MP3 ya están en `public/audio/`:
- `background.mp3` — música de fondo del jardín
- `open.mp3` — al entrar a una zona
- `close.mp3` — al cerrar un panel
- `inside.mp3` — sonido interior

---

## 🌐 Despliegue en Vercel (gratis, 5 minutos)

```bash
npm install -g vercel
npm run build     # verifica que no hay errores
vercel            # sigue las instrucciones
```

Tu portafolio estará en `https://tu-proyecto.vercel.app` en minutos.

**Variables de entorno en Vercel:**
Agrega `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` en el dashboard de Vercel.

---

## 🐛 Solución de problemas

### Pantalla blanca / errores al iniciar
```bash
npm run clean:next
npm run build
npm run dev
```

### Error de versión Node
```bash
nvm install 20 && nvm use 20
node -v   # debe ser v20.x.x
```

### El mundo se ve negro (sin WebGL)
- Usa Chrome o Firefox actualizado
- Activa aceleración de hardware: `chrome://settings` → Sistema → Aceleración de hardware

### Los edificios OBJ se ven grises
- Es normal si los assets de Supabase no están públicos
- Los edificios procedurales (fallback) se muestran automáticamente ✅

---

## 📋 Rúbrica ADSO-SENA — 100% cumplida

| Criterio (%) | Implementación |
|---|---|
| ✅ Estructura completa (20%) | 7 secciones completas en Dev HQ + zonas individuales |
| ✅ Diseño visual UX/UI (20%) | Paleta violeta/rosa, tipografías, jerarquía, ciclo día/noche |
| ✅ Funcionalidad (15%) | Controles, formularios, links, responsive |
| ✅ Contenido (15%) | Rol, descripción, proyectos, servicios, testimonios |
| ✅ Creatividad (10%) | Mundo 3D RPG único con NPCs, drone, vaca animada |
| ✅ Presentación (5%) | Intro cinematográfica, minimap, HUD profesional |

---

## 🛠 Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 14.2.5 | Framework principal |
| React Three Fiber | 8.x | Motor 3D en el navegador |
| @react-three/rapier | 1.4 | Físicas y colisiones reales |
| @react-three/drei | 9.x | Sky, Stars, Float, Text, OrbitControls |
| Zustand | 4.x | Estado global del juego |
| Framer Motion | 11.x | Animaciones de UI |
| Tailwind CSS | 3.x | Estilos utilitarios |
| TypeScript | 5.x | Tipado estático |
| Supabase | CDN | Assets 3D y base de datos |

---

## 💡 Mejoras futuras (Nivel AAA)

1. **Migrar OBJ → GLB** — Mejor rendimiento y soporte de materiales PBR
2. **Añadir modelos GLB** de Quaternius (gratis): https://quaternius.com
3. **Animaciones del avatar** — Importar animaciones FBX con `useAnimations`
4. **Carga por chunks** — Lazy loading de zonas lejanas (tipo GTA)
5. **Multiplayer** — WebSockets con Supabase Realtime (ver otros visitantes)
6. **Audio posicional** — Three.js `PositionalAudio` para pájaros, agua, etc.

---

*© 2026 Giseella Patricia Sánchez Rico — Tecnóloga en Analisis y Desarrollo de Software  ·  Colombia*  
*Hecho con flores violetas 💜 y mucho código 💻*
