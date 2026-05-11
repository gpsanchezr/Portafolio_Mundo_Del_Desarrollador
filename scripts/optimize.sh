#!/bin/bash
echo "🌸 Optimizando proyecto Mundo del Desarrollador..."
find public/models   -name "*.blend" -delete 2>/dev/null
find public/models   -name "*.fbx"   -delete 2>/dev/null
find public/models   -name "*.obj"   -delete 2>/dev/null
find public/textures -name "*.psd"   -delete 2>/dev/null
find public/textures -name "*.tga"   -delete 2>/dev/null
echo "✅ Archivos pesados eliminados."
echo ""
echo "📦 Archivos restantes en public/:"
find public/ -type f | sort
