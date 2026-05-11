# Capturas de pantalla de proyectos

Coloca aquí las imágenes de tus proyectos:

- glowcode.png      → Screenshot del e-commerce GlowCode
- cineverse.png     → Screenshot de Cine-Verse
- parknidus.png     → Screenshot de ParkNidus
- happyfarm.png     → Screenshot de Happy-Farm

Tamaño recomendado: 800x450px (16:9), formato .png o .jpg
Máx 200KB por imagen (usa https://tinypng.com para comprimir)

Para usarlas, en ProjectsPanel.tsx añade:
  screenshot: '/images/projects/glowcode.png',

Y en el panel muestra la imagen:
  <img src={p.screenshot} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
