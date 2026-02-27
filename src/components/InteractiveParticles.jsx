import React, { useEffect, useRef } from 'react';

class Particle {
  constructor(c) {
    this.x = Math.random() * c.width;
    this.y = Math.random() * c.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.size = Math.random() * 2 + 1.5;
  }

  update(c, m, mDist) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > c.width) this.vx = -this.vx;
    if (this.y < 0 || this.y > c.height) this.vy = -this.vy;

    if (m.x != null) {
      let dx = m.x - this.x;
      let dy = m.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mDist) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mDist - distance) / mDist;
        const directionX = forceDirectionX * force * 0.6;
        const directionY = forceDirectionY * force * 0.6;
        this.vx += directionX;
        this.vy += directionY;
      }
    }
  }

  draw(context) {
    context.fillStyle = 'rgba(26, 26, 26, 0.3)';
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
  }
}

const InteractiveParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const particleCount = 80;
    const connectionDistance = 140;
    const mouseDistance = 180;

    let mouse = { x: null, y: null };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas));
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            let opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(26, 26, 26, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(particle => {
        particle.update(canvas, mouse, mouseDistance);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX; // Changed to clientX/Y for better accuracy
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', () => {});
      window.removeEventListener('mouseleave', () => {});
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] bg-[#fdfdfd]"
    />
  );
};

export default InteractiveParticles;
