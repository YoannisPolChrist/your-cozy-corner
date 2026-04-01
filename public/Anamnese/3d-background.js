/**
 * Ambient canvas background for the anamnesis page.
 * Uses subtle pointer drift and respects reduced-motion preferences.
 */
document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = document.createElement('canvas');
    canvas.id = 'premium-3d-bg';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-2';
    canvas.style.opacity = '0.82';
    canvas.style.pointerEvents = 'none';

    const appBg = document.querySelector('.app-background');
    if (appBg) {
        appBg.style.background = 'transparent';
        document.body.insertBefore(canvas, appBg);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let t = 0;
    let pointerX = 0.5;
    let pointerY = 0.45;
    let smoothX = 0.5;
    let smoothY = 0.45;

    const colors = [
        { r: 31, g: 58, b: 95 },
        { r: 196, g: 163, b: 90 },
        { r: 244, g: 241, b: 238 }
    ];

    function resize() {
        const ratio = Math.min(window.devicePixelRatio || 1, 1.8);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function drawFrame() {
        ctx.fillStyle = `rgb(${colors[2].r}, ${colors[2].g}, ${colors[2].b})`;
        ctx.fillRect(0, 0, width, height);

        smoothX += (pointerX - smoothX) * 0.035;
        smoothY += (pointerY - smoothY) * 0.035;

        for (let i = 0; i < 4; i++) {
            const driftX = prefersReducedMotion ? 0 : (smoothX - 0.5) * width * (0.08 + i * 0.015);
            const driftY = prefersReducedMotion ? 0 : (smoothY - 0.5) * height * (0.08 + i * 0.015);
            const cx = width * (0.5 + 0.27 * Math.sin(t * 0.00045 + i * 1.8)) + driftX;
            const cy = height * (0.48 + 0.24 * Math.cos(t * 0.00028 + i * 1.35)) + driftY;
            const radius = Math.max(width, height) * (0.52 + 0.08 * Math.sin(t * 0.00035 + i));

            const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            const r = colors[i % 2].r;
            const g = colors[i % 2].g;
            const b = colors[i % 2].b;

            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${i % 2 === 0 ? 0.13 : 0.09})`);
            gradient.addColorStop(0.42, `rgba(${r}, ${g}, ${b}, 0.05)`);
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }

        const vignette = ctx.createLinearGradient(0, 0, width, height);
        vignette.addColorStop(0, 'rgba(255,255,255,0.16)');
        vignette.addColorStop(1, 'rgba(31,58,95,0.05)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);
    }

    function draw() {
        drawFrame();
        if (prefersReducedMotion) return;
        t += 16;
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    document.addEventListener('pointermove', (event) => {
        pointerX = event.clientX / Math.max(window.innerWidth, 1);
        pointerY = event.clientY / Math.max(window.innerHeight, 1);
    }, { passive: true });

    resize();
    draw();
});
