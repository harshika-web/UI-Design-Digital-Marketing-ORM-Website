/**
 * Neural Network Particle Background
 * Creates an interactive, floating particle system with connecting lines.
 */

class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.connectionDistance = 150;
        this.mouse = { x: null, y: null, radius: 150 };

        this.init();
    }

    init() {
        this.canvas.id = 'bg-canvas';
        this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
      background: transparent;
    `;
        document.body.prepend(this.canvas);

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Adjust particle count based on screen size
        if (window.innerWidth < 768) {
            this.particleCount = 40;
        } else {
            this.particleCount = 80;
        }
        this.createParticles();
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const directionX = (Math.random() * 0.4) - 0.2;
            const directionY = (Math.random() * 0.4) - 0.2;
            const color = 'rgba(124, 92, 255, 0.4)';

            this.particles.push({ x, y, directionX, directionY, size, color });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            let p1 = this.particles[i];

            // Update position
            p1.x += p1.directionX;
            p1.y += p1.directionY;

            // Bounce off walls
            if (p1.x > this.canvas.width || p1.x < 0) p1.directionX = -p1.directionX;
            if (p1.y > this.canvas.height || p1.y < 0) p1.directionY = -p1.directionY;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p1.color;
            this.ctx.fill();

            // Connections
            for (let j = i; j < this.particles.length; j++) {
                let p2 = this.particles[j];
                let dx = p1.x - p2.x;
                let dy = p1.y - p2.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    let opacity = 1 - (distance / this.connectionDistance);
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.2})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }

            // Mouse interaction (push away)
            if (this.mouse.x != null) {
                let mdx = p1.x - this.mouse.x;
                let mdy = p1.y - this.mouse.y;
                let mDistance = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDistance < this.mouse.radius) {
                    if (this.mouse.x < p1.x && p1.x < this.canvas.width - p1.size * 10) p1.x += 1;
                    if (this.mouse.x > p1.x && p1.x > p1.size * 10) p1.x -= 1;
                    if (this.mouse.y < p1.y && p1.y < this.canvas.height - p1.size * 10) p1.y += 1;
                    if (this.mouse.y > p1.y && p1.y > p1.size * 10) p1.y -= 1;
                }
            }
        }
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize on Home Page only
if (document.body.dataset.page === 'home') {
    new ParticleBackground();
}
