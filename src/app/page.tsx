'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Aquí está la clave: Llamamos a Experience, NO a World
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });
const GameUI     = dynamic(() => import('@/components/UI/GameUI'),  { ssr: false });

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: '#020617' }}>
      <Suspense fallback={
        <div
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50"
          style={{ color: '#c4b5fd', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', fontFamily: 'serif' }}
        >
          🌸 Cargando Mundo...
        </div>
      }>
        <Experience />
        <GameUI />
      </Suspense>
    </main>
  );
}