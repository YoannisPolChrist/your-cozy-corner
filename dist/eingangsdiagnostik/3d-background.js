/**
 * 3D Background Fluid Animation (Lightweight WebGL/Canvas)
 * Creates a slow, premium, abstract liquid-like gradient background.
 */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'premium-3d-bg';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-2';
    canvas.style.opacity = '0.8';
    canvas.style.pointerEvents = 'none';

    // Insert right before the app-container
    const appBg = document.querySelector('.app-background');
    if (appBg) {
        appBg.style.background = 'transparent'; // Remove old static gradient
        document.body.insertBefore(canvas, appBg);
    }

    const ctx = canvas.getContext('2d');

    let width, height;
    let t = 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    // Define Premium Colors (Christ-Blue, Christ-Gold, Christ-Sand)
    const colors = [
        { r: 31, g: 58, b: 95 },    // #1F3A5F
        { r: 196, g: 163, b: 90 },   // #C4A35A
        { r: 244, g: 241, b: 238 }   // #F4F1EE
    ];

    function draw() {
        // Clear with Sand color
        ctx.fillStyle = `rgb(${colors[2].r}, ${colors[2].g}, ${colors[2].b})`;
        ctx.fillRect(0, 0, width, height);

        // Create fluid blobs
        for (let i = 0; i < 3; i++) {
            const cx = width * (0.5 + 0.3 * Math.sin(t * 0.0005 + i * 2));
            const cy = height * (0.5 + 0.3 * Math.cos(t * 0.0003 + i * 1.5));
            const radius = Math.max(width, height) * (0.6 + 0.1 * Math.sin(t * 0.0004 + i));

            const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            const r = colors[i % 2].r;
            const g = colors[i % 2].g;
            const b = colors[i % 2].b;

            // Very subtle opacity for extreme premium feel
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.12)`);
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }

        t += 16; // Time step (~60fps)
        requestAnimationFrame(draw);
    }

    // Start animation loop
    draw();
});
