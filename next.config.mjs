/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    '@react-three/rapier',
  ],
  webpack(config) {
    // Allow importing .glb/.gltf/.fbx/.obj files
    config.module.rules.push({
      test: /\.(glb|gltf|fbx|obj|mtl)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
