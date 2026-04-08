"use client";

export default function AmbientBackground() {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1,
      overflow: "hidden", pointerEvents: "none", backgroundColor: "var(--bg-deep)"
    }}>
      {/* 1. Base Gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at top, #0a0a0f 0%, #050506 50%, #020203 100%)"
      }} />

      {/* 2. Grid Overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "64px 64px"
      }} />

      {/* 3. Animated Blobs */}
      <div style={{
        position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
        width: 1000, height: 1000, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(94,106,210,0.15) 0%, transparent 70%)",
        filter: "blur(120px)",
        animation: "float1 10s ease-in-out infinite alternate"
      }} />
      <div style={{
        position: "absolute", top: "20%", left: "-10%",
        width: 800, height: 800, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 60%)",
        filter: "blur(100px)",
        animation: "float2 14s ease-in-out infinite alternate"
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", right: "-10%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 60%)",
        filter: "blur(90px)",
        animation: "float3 12s ease-in-out infinite alternate"
      }} />

      {/* 4. Noise Texture (SVG Data URI for performance & crispness) */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.15, mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />
    </div>
  );
}
