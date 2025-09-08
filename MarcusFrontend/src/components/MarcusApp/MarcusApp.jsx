import React, { useRef, useEffect } from "react";
import MarcusMain from "../MarcusMain/MarcusMain";
import Sidebar from "../SideBar/SideBar";
import "./MarcusApp.css";

export default function MarcusApp() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    let W = window.innerWidth;
    let H = window.innerHeight;
    const DPR = Math.max(1, window.devicePixelRatio || 1);

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    window.addEventListener("resize", resize, { passive: true });
    resize();

    // Background stars (smaller, fainter)
    const maxStarRadius = 0.6;
    const numStars = Math.floor((W * H) / 30000); // fewer stars

    const stars = [];
    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }
    function irand(min, max) {
      return Math.floor(rand(min, max + 1));
    }

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.min(Math.random() * 1 + 0.2, maxStarRadius),
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: rand(0.002, 0.006),
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    function drawStars(dt) {
      for (let s of stars) {
        s.twinklePhase += s.twinkleSpeed * dt;
        const a = s.alpha * (0.7 + 0.3 * Math.sin(s.twinklePhase));
        ctx.beginPath();
        const glowRadius = s.r * 3;
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowRadius);
        g.addColorStop(0, `rgba(255,255,255, ${a * 0.8})`);
        g.addColorStop(0.2, `rgba(255,255,255, ${a * 0.3})`);
        g.addColorStop(1, `rgba(255,255,255, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(
          s.x - glowRadius,
          s.y - glowRadius,
          glowRadius * 2,
          glowRadius * 2
        );
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Shooting stars (thinner + realistic)
    class ShootingStar {
      constructor() {
        this.x = rand(-W * 0.2, W * 0.7);
        this.y = rand(-H * 0.3, H * 0.3);
        this.len = rand(140, 320); // length of streak
        this.speed = rand(1200, 2200);
        this.angle = rand(Math.PI * 0.15, Math.PI * 0.35);
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.life = 0;
        this.maxLife = rand(0.8, 1.4);
        this.opacity = rand(0.6, 1.0);
        this.hue = irand(200, 220);
        this.trail = [];
      this.trailMax = Math.floor(rand(3, 5));

        this.active = true;
      }
      update(dt) {
        if (!this.active) return;
        this.life += dt;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.trail.unshift({ x: this.x, y: this.y, t: 0 });
        if (this.trail.length > this.trailMax) this.trail.pop();
        for (let seg of this.trail) seg.t += dt;
        if (this.life > this.maxLife) {
          this.opacity -= 2.5 * dt;
          if (this.opacity <= 0.01) this.active = false;
        }
        if (this.x > W + 100 || this.y > H + 100) this.active = false;
      }
      draw(ctx) {
        if (!this.active) return;

        // Trail effect
        for (let i = 0; i < this.trail.length; i++) {
          const seg = this.trail[i];
          const frac = 1 - i / this.trail.length;
          const a = this.opacity * frac * 0.9;
          const size = Math.max(
            0.4,
            this.len * 0.008 * frac * (1 + Math.sin(this.life * 8) * 0.05)
          );
          const gradient = ctx.createRadialGradient(
            seg.x,
            seg.y,
            0,
            seg.x,
            seg.y,
            size * 8
          );
          gradient.addColorStop(0, `hsla(${this.hue},100%,95%,${a})`);
          gradient.addColorStop(0.6, `hsla(${this.hue},90%,70%,${a * 0.3})`);
          gradient.addColorStop(1, `rgba(0,0,0,0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.ellipse(
            seg.x,
            seg.y,
            size * 5,
            size * 1.4,
            Math.atan2(this.vy, this.vx),
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // Main streak
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.atan2(this.vy, this.vx));
        const grd = ctx.createLinearGradient(0, 0, -this.len, 0);
        grd.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
        grd.addColorStop(
          0.15,
          `hsla(${this.hue}, 90%, 80%, ${this.opacity * 0.9})`
        );
        grd.addColorStop(0.6, `hsla(${this.hue}, 80%, 60%, ${this.opacity * 0.3})`);
        grd.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.moveTo(0, -0.6);
        ctx.lineTo(-this.len, -1.2);
        ctx.lineTo(-this.len, 1.2);
        ctx.lineTo(0, 0.6);
        ctx.closePath();
        ctx.fill();

        // Small head
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.ellipse(0, 0, 1.0, 1.0, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    const shootingStars = [];
    let lastSpawn = 0;
    let spawnInterval = Math.random() * 5 + 6; 
// spawns every 6–11 seconds randomly

const maxSimultaneous = 1; // only one at a time


    let lastTime = performance.now();

    function clearCanvas() {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, W, H);
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "rgba(10,12,30,0.12)");
      g.addColorStop(1, "rgba(0,0,0,0.08)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    function loop(now) {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const normDT = dt * 60;
      clearCanvas();
      drawStars(normDT);
      for (let s of shootingStars) s.update(dt);
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        if (!shootingStars[i].active) shootingStars.splice(i, 1);
      }
      for (let s of shootingStars) s.draw(ctx);
      lastSpawn += dt;
      const chance = Math.max(0.05, 1 / (spawnInterval + Math.random() * 2));
      if (
        lastSpawn > rand(0.3, spawnInterval) &&
        shootingStars.length < maxSimultaneous &&
        Math.random() < chance
      ) {
        const n = Math.random() < 0.1 ? irand(1, 2) : 1;
        for (let i = 0; i < n; i++) shootingStars.push(new ShootingStar());
        lastSpawn = 0;
        spawnInterval = rand(1.2, 2.5);
      }
      requestAnimationFrame(loop);
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, W, H);
    const backg = ctx.createLinearGradient(0, 0, W, H);
    backg.addColorStop(0, "rgba(4,8,30,0.12)");
    backg.addColorStop(1, "rgba(0,0,0,0.02)");
    ctx.fillStyle = backg;
    ctx.fillRect(0, 0, W, H);
    requestAnimationFrame(loop);

    window.addEventListener("pointerdown", (e) => {
      for (let i = 0; i < 1 + Math.random() * 2; i++) {
        const s = new ShootingStar();
        s.x = e.clientX + rand(-40, 40);
        s.y = e.clientY + rand(-40, 40);
        s.angle = rand(Math.PI * 0.12, Math.PI * 0.46);
        s.vx = Math.cos(s.angle) * s.speed * rand(0.9, 1.2);
        s.vy = Math.sin(s.angle) * s.speed * rand(0.9, 1.2);
        shootingStars.push(s);
      }
    });

    window.addEventListener("resize", () => {
      const newNum = Math.floor(
        (window.innerWidth * window.innerHeight) / 16000
      );
      while (stars.length < newNum) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 1 + 0.2,
          alpha: Math.random() * 0.7 + 0.2,
          twinkleSpeed: rand(0.002, 0.006),
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
      while (stars.length > newNum) stars.pop();
    });

    return () => {
      window.removeEventListener("resize", resize);
      // window.removeEventListener("pointerdown", null);
    };
  }, []);

  return (
    <div className="marcus-app-bg">
      <canvas ref={canvasRef} id="sky" />
      <div className="marcus-app-ui">
        <Sidebar />
        <div className="main-content-wrapper">
          <MarcusMain />
        </div>
      </div>
    </div>
  );
}

