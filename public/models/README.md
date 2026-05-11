# 🏗 Modelos 3D opcionales

El proyecto funciona SIN modelos .glb/.obj — usa geometrías procedurales como fallback.

Los modelos mejoran el realismo visualmente. Descárgalos gratis de:

## Quaternius (totalmente gratis, CC0)
https://quaternius.com/packs/ultimatenaturepack.html

## Archivos recomendados para este proyecto:
- characters/Formal.gltf     → Avatar de Giseella
- characters/Robot/Robot.fbx → Robot guía NPC
- buildings/2Story_Sign.obj  → Cinema (Cine-Verse)
- buildings/4Story_Wide_2Doors_Base.obj → Parking (ParkNidus)
- buildings/2Story_Columns.obj → Dev HQ / Terrasoft
- props/Animals/Cow.obj      → Vaca de Happy-Farm
- props/Animals/Horse.obj    → Caballo de Happy-Farm
- props/Drone.obj            → Dron del Tech-IA Lab
- props/Turret_Gun.obj       → Torreta del Tech-IA Lab

## Cómo activar los modelos
Los modelos de Supabase ya están referenciados en src/lib/supabase.ts.
Si tienes los archivos localmente, muévelos aquí y actualiza las URLs en supabase.ts:
  cinema: '/models/buildings/2Story_Sign.obj',
  cow:    '/models/props/Cow.obj',
  etc.
