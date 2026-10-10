import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };
type Pulse = { a: number; b: number; t: number; speed: number };

const LINK_DISTANCE = 140;
const MOUSE_DISTANCE = 170;

/**
 * A living "neural network": drifting nodes connect to their neighbours, light
 * up around the cursor, and send glowing signals along the connections.
 */
export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(26, Math.min(95, Math.floor((w * h) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
      pulses = [];
    };

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, w, h);

      if (animate) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;

          // gentle pull toward the cursor
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_DISTANCE && d > 1) {
            n.x += (dx / d) * 0.35;
            n.y += (dy / d) * 0.35;
          }
        }
      }

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(96,165,250,${(1 - d / LINK_DISTANCE) * 0.28})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // cursor links + nodes
      for (const n of nodes) {
        const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        if (d < MOUSE_DISTANCE) {
          ctx.strokeStyle = `rgba(129,140,248,${(1 - d / MOUSE_DISTANCE) * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = d < MOUSE_DISTANCE ? "rgba(165,180,252,0.95)" : "rgba(96,165,250,0.7)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, d < MOUSE_DISTANCE ? 2.4 : 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!animate) return;

      // signals travelling along connections
      if (pulses.length < 14 && Math.random() < 0.06 && nodes.length > 1) {
        const a = Math.floor(Math.random() * nodes.length);
        const candidates: number[] = [];
        for (let b = 0; b < nodes.length; b++) {
          if (b !== a && Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y) < LINK_DISTANCE) {
            candidates.push(b);
          }
        }
        if (candidates.length > 0) {
          pulses.push({
            a,
            b: candidates[Math.floor(Math.random() * candidates.length)],
            t: 0,
            speed: 0.012 + Math.random() * 0.016,
          });
        }
      }

      pulses = pulses.filter((p) => p.t < 1);
      for (const p of pulses) {
        p.t += p.speed;
        const A = nodes[p.a];
        const B = nodes[p.b];
        const x = A.x + (B.x - A.x) * p.t;
        const y = A.y + (B.y - A.y) * p.t;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 12);
        glow.addColorStop(0, "rgba(34,211,238,0.95)");
        glow.addColorStop(1, "rgba(34,211,238,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!running) return;
      draw(true);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reduceMotion) raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduceMotion) {
      draw(false); // one static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
