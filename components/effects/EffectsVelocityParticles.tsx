"use client";

import {
  bindScrollProgress,
  mapRange,
  prefersReducedMotion,
} from "@/lib/scrollProgress";
import { useEffect, useRef, useState } from "react";

const DOT_COUNT = 48;

export default function EffectsVelocityParticles() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots = Array.from({ length: DOT_COUNT }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      baseX: 0,
      baseY: 0,
      size: 1 + Math.random() * 2,
    }));

    let velocity = 0;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let frame = 0;
    let sectionProgress = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      dots.forEach((dot, i) => {
        dot.baseX = (i % 8) / 7;
        dot.baseY = Math.floor(i / 8) / 5;
        dot.x = dot.baseX;
        dot.y = dot.baseY;
      });
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      velocity *= 0.92;

      dots.forEach((dot) => {
        dot.x += velocity * 0.0004 * (Math.random() - 0.5);
        dot.y += velocity * 0.0008;
        if (dot.y > 1.1) dot.y = -0.05;
        if (dot.x < -0.05) dot.x = 1.05;
        if (dot.x > 1.05) dot.x = -0.05;

        const alpha = 0.15 + sectionProgress * 0.45 + Math.min(velocity * 0.002, 0.35);
        ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.beginPath();
        ctx.arc(dot.x * w, dot.y * h, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      const now = performance.now();
      const deltaY = Math.abs(window.scrollY - lastScrollY);
      const deltaT = Math.max(now - lastTime, 16);
      velocity = Math.min(120, velocity + (deltaY / deltaT) * 8);
      lastScrollY = window.scrollY;
      lastTime = now;
    };

    resize();
    draw();
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    const cleanupProgress = bindScrollProgress(section, (progress) => {
      sectionProgress = progress;
    });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      cleanupProgress();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="px-6 py-24 text-center" aria-label="Velocity particles">
        <p className="text-zinc-500">Particle motion disabled for reduced motion preference.</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[280vh] w-full"
      aria-label="Scroll velocity reactive particles"
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-6">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full opacity-80"
          aria-hidden
        />
        <div className="relative z-10 max-w-md text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Scroll faster — particles drift more
          </h2>
          <p className="mt-4 text-sm text-zinc-400">
            Velocity spikes on fast scroll and decays when you stop.
          </p>
        </div>
      </div>
    </section>
  );
}
