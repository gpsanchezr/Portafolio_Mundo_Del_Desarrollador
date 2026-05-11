import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Giseella Sánchez | Mundo del Desarrollador 🌸',
  description:
    'Portafolio interactivo 3D estilo RPG — Tecnóloga en Análisis y Desarrollo de Software, Técnica en Programación de Software. Explora el jardín mágico del desarrollo.',
  keywords: ['portafolio','desarrolladora','software','3D','RPG','Python','PostgreSQL','React','SENA','ADSO'],
  authors: [{ name: 'Giseella Patricia Sánchez Rico' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Giseella Sánchez | Mundo del Desarrollador 🌸',
    description: 'Portafolio interactivo 3D estilo videojuego RPG',
    type: 'website',
    locale: 'es_CO',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
