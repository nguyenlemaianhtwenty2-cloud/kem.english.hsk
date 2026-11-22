/* Lớp hiệu ứng rơi nhẹ phủ trên trang: cánh hoa / tuyết / mưa / tắt */
window.Scene = (function () {
  const cv = document.createElement("canvas"), ctx = cv.getContext("2d");
  cv.setAttribute("aria-hidden", "true");
  cv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:25";
  let weather = "petals", W = 0, H = 0, dpr = 1, raf = 0, parts = [], last = 0, T = 0;
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sprites = [["#fff3f7", "#ffc4d8"], ["#ffe9f0", "#ffb1cb"], ["#f3ecff", "#d9c7f4"]].map(([a, z]) => {
    const c = document.createElement("canvas"); c.width = c.height = 48; const x = c.getContext("2d"); x.translate(24, 24);
    const g = x.createLinearGradient(0, 20, 0, -20); g.addColorStop(0, a); g.addColorStop(1, z); x.fillStyle = g;
    x.beginPath(); x.moveTo(0, 21); x.bezierCurveTo(-17, 8, -15, -16, -5, -20); x.quadraticCurveTo(-1, -19, 0, -14); x.quadraticCurveTo(1, -19, 5, -20); x.bezierCurveTo(15, -16, 17, 8, 0, 21); x.fill(); return c;
  });
  const np = any => { const z = 0.5 + Math.random() * 0.9; return { x: Math.random() * (W + 160) - 160, y: any ? Math.random() * H : -20, z, v: weather === "rain" ? 460 + Math.random() * 240 : weather === "snow" ? 18 + Math.random() * 26 : (20 + Math.random() * 18) * z, r: weather === "snow" ? 1.5 + Math.random() * 2.5 : 9 + 8 * z, ph: Math.random() * 6.3, rot: Math.random() * 6.3, vr: (Math.random() - 0.5) * 1.4, fl: Math.random() * 6.3, vf: 1.2 + Math.random() * 2, sp: Math.floor(Math.random() * 3) }; };
  function frame(t) {
    const dt = Math.min(0.05, (t - last) / 1000 || 0.016); last = t; T += dt;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    if (document.querySelector(".session, .exam-run")) { cv.style.visibility = "hidden"; raf = requestAnimationFrame(frame); return; } else if (cv.style.visibility) cv.style.visibility = "";
    const wind = 14 + Math.sin(T * 0.35) * 12;
    parts.forEach(q => {
      if (q.y > H + 24 || q.x > W + 40) Object.assign(q, np(false));
      if (weather === "rain") { q.y += q.v * dt; ctx.strokeStyle = "rgba(120,150,200,.35)"; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(q.x - 3, q.y + 12); ctx.stroke(); }
      else if (weather === "snow") { q.y += q.v * dt; q.ph += dt; ctx.fillStyle = "rgba(190,200,225,.8)"; ctx.beginPath(); ctx.arc(q.x + Math.sin(q.ph) * 12, q.y, q.r, 0, 6.3); ctx.fill(); }
      else { q.ph += dt * 1.1; q.fl += dt * q.vf; q.rot += dt * q.vr; q.y += (q.v + Math.sin(q.fl) * 8) * dt; q.x += (wind * q.z + Math.cos(q.ph) * 14) * dt;
        ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.rot + Math.sin(q.ph) * 0.5); ctx.scale(1, 0.25 + 0.75 * Math.abs(Math.cos(q.fl))); ctx.globalAlpha = 0.85; ctx.drawImage(sprites[q.sp], -q.r / 2, -q.r / 2, q.r, q.r); ctx.restore(); }
    });
    raf = requestAnimationFrame(frame);
  }
  function start() {
    cancelAnimationFrame(raf);
    if (!cv.parentNode) document.body.appendChild(cv);
    dpr = Math.min(window.devicePixelRatio || 1, 2); W = window.innerWidth; H = window.innerHeight; cv.width = W * dpr; cv.height = H * dpr;
    const n = reduce || weather === "none" ? 0 : weather === "rain" ? 60 : weather === "snow" ? 40 : Math.round(8 + W / 160);
    parts = Array.from({ length: n }, () => np(true)); ctx.clearRect(0, 0, cv.width, cv.height);
    if (n) { last = performance.now(); raf = requestAnimationFrame(frame); }
  }
  let rt; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(start, 150); });
  document.addEventListener("visibilitychange", () => { cancelAnimationFrame(raf); if (!document.hidden && parts.length) { last = performance.now(); raf = requestAnimationFrame(frame); } });
  return { set(o) { if (o && o.weather) weather = o.weather; start(); }, current() { const h = new Date().getHours(); return h < 11 ? "morning" : h < 17 ? "afternoon" : "night"; } };
})();
