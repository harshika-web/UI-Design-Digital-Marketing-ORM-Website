/**
 * Vanilla JS Spotlight Effect
 * Creates interactive mouse-tracking spotlight effects on designated sections
 */

class SpotlightEffect {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.size = options.size || 300;
    this.opacity = options.opacity || 0.3;
    this.blur = options.blur || 80;
    this.color = options.color || 'rgba(124, 92, 255, 0.4)';
    this.easing = options.easing || 0.1; // Easing factor for smooth following

    this.mouseX = 0;
    this.mouseY = 0;
    this.spotlightX = 0;
    this.spotlightY = 0;
    this.isVisible = false;

    this.init();
  }

  init() {
    // Create spotlight element
    this.spotlight = document.createElement('div');
    this.spotlight.className = 'spotlight-effect';
    this.spotlight.style.cssText = `
      position: absolute;
      pointer-events: none;
      border-radius: 50%;
      filter: blur(${this.blur}px);
      opacity: 0;
      z-index: 0;
      transition: opacity 0.3s ease;
      background: radial-gradient(circle, ${this.color}, transparent 70%);
      width: ${this.size}px;
      height: ${this.size}px;
    `;

    this.container.style.position = 'relative';
    this.container.insertBefore(this.spotlight, this.container.firstChild);

    // Event listeners
    this.container.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.container.addEventListener('mouseenter', () => this.onMouseEnter());
    this.container.addEventListener('mouseleave', () => this.onMouseLeave());

    // Animation loop for smooth spotlight following
    this.animate();
  }

  onMouseMove(e) {
    const rect = this.container.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  }

  onMouseEnter() {
    this.isVisible = true;
    this.spotlight.style.opacity = this.opacity;
  }

  onMouseLeave() {
    this.isVisible = false;
    this.spotlight.style.opacity = '0';
  }

  animate() {
    if (this.isVisible) {
      // Smooth easing towards mouse position
      this.spotlightX += (this.mouseX - this.spotlightX) * this.easing;
      this.spotlightY += (this.mouseY - this.spotlightY) * this.easing;

      this.spotlight.style.left = `${this.spotlightX - this.size / 2}px`;
      this.spotlight.style.top = `${this.spotlightY - this.size / 2}px`;
    }

    requestAnimationFrame(() => this.animate());
  }
}

/**
 * Static Spotlight - Non-interactive background glow
 */
class StaticSpotlight {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.size = options.size || 400;
    this.x = options.x || '50%';
    this.y = options.y || '-50%';
    this.color = options.color || 'rgba(124, 92, 255, 0.2)';
    this.blur = options.blur || 100;

    this.init();
  }

  init() {
    const spotlight = document.createElement('div');
    spotlight.className = 'static-spotlight-effect';
    spotlight.style.cssText = `
      position: absolute;
      pointer-events: none;
      border-radius: 50%;
      filter: blur(${this.blur}px);
      z-index: 0;
      background: radial-gradient(circle, ${this.color}, transparent 70%);
      width: ${this.size}px;
      height: ${this.size}px;
      left: ${this.x};
      top: ${this.y};
      transform: translate(-50%, -50%);
    `;

    this.container.style.position = 'relative';
    this.container.insertBefore(spotlight, this.container.firstChild);
  }
}

/**
 * Pulse Animation - Add pulsing effect to spotlights
 */
class PulseSpotlight {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.size = options.size || 300;
    this.color = options.color || 'rgba(0, 212, 255, 0.3)';
    this.duration = options.duration || 3000;
    this.blur = options.blur || 80;

    this.init();
  }

  init() {
    // Add animation keyframes if not already present
    if (!document.getElementById('pulse-spotlight-keyframes')) {
      const style = document.createElement('style');
      style.id = 'pulse-spotlight-keyframes';
      style.textContent = `
        @keyframes pulse-spotlight {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.3;
          }
          50% { 
            transform: scale(1.2); 
            opacity: 0.15;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const spotlight = document.createElement('div');
    spotlight.className = 'pulse-spotlight-effect';
    spotlight.style.cssText = `
      position: absolute;
      pointer-events: none;
      border-radius: 50%;
      filter: blur(${this.blur}px);
      z-index: 0;
      background: radial-gradient(circle, ${this.color}, transparent 70%);
      width: ${this.size}px;
      height: ${this.size}px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      animation: pulse-spotlight ${this.duration}ms ease-in-out infinite;
    `;

    this.container.style.position = 'relative';
    this.container.insertBefore(spotlight, this.container.firstChild);
  }
}

// Initialize spotlight effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Interactive spotlight on Why section
  new SpotlightEffect('.why', {
    size: 350,
    opacity: 0.25,
    blur: 80,
    color: 'rgba(124, 92, 255, 0.4)',
  });

  // Interactive spotlight on Stats section
  new SpotlightEffect('.stats', {
    size: 400,
    opacity: 0.2,
    blur: 100,
    color: 'rgba(0, 212, 255, 0.3)',
  });

  // Interactive spotlight on CTA section
  new SpotlightEffect('.cta', {
    size: 350,
    opacity: 0.25,
    blur: 90,
    color: 'rgba(124, 92, 255, 0.35)',
  });

  // Static spotlight on services section
  new StaticSpotlight('.services-preview', {
    size: 500,
    x: '50%',
    y: '-20%',
    color: 'rgba(124, 92, 255, 0.15)',
    blur: 120,
  });

  // Pulsing spotlight on hero
  new PulseSpotlight('.hero', {
    size: 600,
    color: 'rgba(124, 92, 255, 0.25)',
    duration: 4000,
    blur: 100,
  });
});
