"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";

interface WaveConfig {
  amplitude: number;
  frequency: number;
  speed: number;
  color: string;
  lineWidth: number;
  phase: number;
}

export const AudioWavesCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const primary = isDark
      ? theme.palette.primary.light
      : theme.palette.primary.main;
    const warning = isDark
      ? theme.palette.warning.light
      : theme.palette.warning.main;

    const hexToRgba = (hex: string, a: number) => {
      const r = Number.parseInt(hex.slice(1, 3), 16);
      const g = Number.parseInt(hex.slice(3, 5), 16);
      const b = Number.parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    };

    const op = (d: number, l: number) => (isDark ? d : l);

    const waves: WaveConfig[] = [
      {
        amplitude: 85,
        frequency: 0.0028,
        speed: 0.01,
        color: hexToRgba(primary, op(0.38, 0.2)),
        lineWidth: 3,
        phase: 0,
      },
      {
        amplitude: 55,
        frequency: 0.0045,
        speed: 0.014,
        color: hexToRgba(warning, op(0.32, 0.16)),
        lineWidth: 2.5,
        phase: 1.2,
      },
      {
        amplitude: 38,
        frequency: 0.0065,
        speed: 0.02,
        color: hexToRgba(primary, op(0.28, 0.14)),
        lineWidth: 2,
        phase: 2.5,
      },
      {
        amplitude: 24,
        frequency: 0.009,
        speed: 0.026,
        color: hexToRgba(warning, op(0.22, 0.11)),
        lineWidth: 1.5,
        phase: 4,
      },
      {
        amplitude: 32,
        frequency: 0.0055,
        speed: 0.016,
        color: hexToRgba(primary, op(0.2, 0.1)),
        lineWidth: 1.8,
        phase: 3.1,
      },
      {
        amplitude: 110,
        frequency: 0.002,
        speed: 0.006,
        color: hexToRgba(primary, op(0.18, 0.08)),
        lineWidth: 4,
        phase: 0.8,
      },
    ];

    const resize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawWave = (w: WaveConfig, t: number) => {
      if (!ctx || !canvas) return;
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;
      const centerY = height * 0.5;

      ctx.beginPath();
      ctx.strokeStyle = w.color;
      ctx.lineWidth = w.lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let x = 0; x <= width; x += 2) {
        const y =
          centerY +
          w.amplitude *
            Math.sin(x * w.frequency + t * w.speed * 60 + w.phase) *
            Math.sin(x * w.frequency * 0.4 + t * w.speed * 20 + w.phase * 0.7) *
            Math.sin((x / width) * Math.PI);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, width, height);

      for (const wave of waves) {
        drawWave(wave, time);
      }

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPref = () => {
      if (mq.matches) {
        cancelAnimationFrame(animationId);
        if (ctx && canvas) {
          const width = canvas.getBoundingClientRect().width;
          const height = canvas.getBoundingClientRect().height;
          ctx.clearRect(0, 0, width, height);
          for (const wave of waves) {
            drawWave(wave, 0);
          }
        }
      } else {
        animate();
      }
    };
    mq.addEventListener("change", handleMotionPref);
    if (mq.matches) handleMotionPref();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      mq.removeEventListener("change", handleMotionPref);
    };
  }, [theme, isDark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
        filter: `blur(${isDark ? 10 : 12}px)`,
        opacity: 1,
      }}
    />
  );
};
