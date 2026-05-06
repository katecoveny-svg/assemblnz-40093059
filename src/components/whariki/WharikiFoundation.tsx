import { useEffect, useRef } from "react";

/**
 * Whāriki Foundation Layer — the digital woven mat that sits beneath all content.
 * Subtle cross-hatch pattern with ambient glow pools for depth and warmth.
 */
const WharikiFoundation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const sy = window.scrollY;
      const vh = window.innerHeight;
      const brightness = Math.min(1, 0.6 + (Math.sin(sy / vh * Math.PI) * 0.4));
      el.style.opacity = String(brightness);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Cross-hatch weave */}
      <div
        ref={ref}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(58,125,110,0.04) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(58,125,110,0.04) 1px, transparent 1px),
            linear-gradient(45deg, rgba(212,168,83,0.02) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(212,168,83,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px, 24px 24px, 48px 48px, 48px 48px",
          opacity: 0.7,
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Ambient glow pools — adds warmth and depth to the dark background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: `
          radial-gradient(ellipse 50% 40% at 20% 20%, rgba(58,125,110,0.08) 0%, transparent 70%),
          radial-gradient(ellipse 45% 35% at 80% 30%, rgba(212,168,83,0.06) 0%, transparent 70%),
          radial-gradient(ellipse 60% 40% at 50% 70%, rgba(58,125,110,0.05) 0%, transparent 60%),
          radial-gradient(ellipse 40% 50% at 15% 80%, rgba(212,168,83,0.04) 0%, transparent 60%),
          radial-gradient(ellipse 35% 30% at 85% 75%, rgba(79,228,167,0.03) 0%, transparent 50%)
        `,
      }} />
    </>
  );
};

export default WharikiFoundation;
