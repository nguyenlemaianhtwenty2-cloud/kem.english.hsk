/* ===== Luyện thi & Test band ===== */
const estSec = p => clamp(Math.round((5 + 490 * Math.pow(clamp(p, 0, 1), 1.08)) / 5) * 5, 5, 495);
function p5Pool() {
  return [...TENSES, ...GRAMMAR].flatMap(t => t.ex.map(q => ({ ...q, t: t.id, band: t.band }))).concat(VOCAB_P5.map(q => ({ ...q, band: 3 })));
}
const G = {
  p2: it => ({ kind: "audio", part: 2, title: "Part 2 · Hỏi – đáp", note: "Nghe câu hỏi và 3 câu trả lời (không in chữ), chọn câu trả lời phù hợp nhất.",
    audio: [{ who: "W", text: it.q }, { who: "M", text: "A. " + it.o[0] }, { who: "M", text: "B. " + it.o[1] }, { who: "M", text: "C. " + it.o[2] }],
    transcript: `${it.q}\n(A) ${it.o[0]}\n(B) ${it.o[1]}\n(C) ${it.o[2]}`,
    qs: [{ q: "Chọn câu trả lời phù hợp nhất.", o: ["Đáp án A", "Đáp án B", "Đáp án C"], a: it.a, t: it.t, part: 2, e: "Đáp án đúng: " + it.o[it.a] }] }),
  p3: c => ({ kind: "audio", part: 3, title: "Part 3 · Hội thoại", note: "Nghe đoạn hội thoại rồi trả lời 3 câu hỏi.",
    audio: c.lines.map(([w, t]) => ({ who: w, text: t })), transcript: c.lines.map(([w, t]) => `${w === "M" ? "Nam" : "Nữ"}: ${t}`).join("\n"),
    qs: c.qs.map(q => ({ ...q, part: 3 })) }),
  p4: k => ({ kind: "audio", part: 4, title: "Part 4 · " + k.kind, note: "Nghe bài nói rồi trả lời 3 câu hỏi.",
    audio: [{ who: "N", text: k.text }], transcript: k.text, qs: k.qs.map(q => ({ ...q, part: 4 })) }),
  p5: q => ({ kind: "single", part: 5, title: "Part 5 · Hoàn thành câu", qs: [{ ...q, part: 5 }] }),
  p6: p => ({ kind: "passage", part: 6, title: "Part 6 · " + p.title, passage: p.text, qs: p.qs.map(q => ({ ...q, part: 6 })) }),
  p7: p => ({ kind: "passage", part: 7, title: "Part 7 · " + p.title, passage: p.text, qs: p.qs.map(q => ({ ...q, part: 7 })) })
};
// Kịch bản đọc như đề TOEIC thật: lời dẫn, số câu, khoảng lặng giữa các lựa chọn, câu hỏi được đọc lại sau đoạn nghe
function examScript(g) {
  const N = t => ({ who: "N", text: t }), P = ms => ({ pause: ms }), nos = g.qs.map(q => q.no), out = [];
  if (g.part === 1) { out.push(N(`Number ${nos[0]}. Look at the picture marked number ${nos[0]} in your test book.`), P(1200)); g.audio.forEach(l => out.push(l, P(1400))); }
  else if (g.part === 2) { out.push(N(`Number ${nos[0]}.`), P(700), g.audio[0], P(1500)); g.audio.slice(1).forEach(l => out.push(l, P(1300))); }
  else {
    out.push(N(`Questions ${nos[0]} through ${nos[nos.length - 1]} refer to the following ${g.part === 3 ? "conversation" : "talk"}.`), P(1200));
    g.audio.forEach(l => out.push(l, P(g.part === 3 ? 500 : 300)));
    out.push(P(1500));
    g.qs.forEach(q => { if (/^[\x00-\x7F’‘“”–—]+$/.test(q.q)) out.push(N(`${q.no}. ${q.q}`), P(2500)); });
  }
  return out;
}
function buildExam(type) {
  const pool = p5Pool();
  switch (type) {
    case "p2": return pick(P2, 10).map(G.p2);
    case "p3": return pick(P3, 3).map(G.p3);
    case "p4": return pick(P4, 3).map(G.p4);
    case "p5": return pick(pool, 20).map(G.p5);
    case "p6": return P6.map(G.p6);
    case "p7": return pick(P7, 3).map(G.p7);
    case "full": return [...pick(P2, 6).map(G.p2), ...pick(P3, 2).map(G.p3), ...pick(P4, 2).map(G.p4), ...pick(pool, 12).map(G.p5), G.p6(pick(P6, 1)[0]), ...pick(P7, 2).map(G.p7)];
    case "placement": {
      const byBand = b => pool.filter(q => q.band === b && !q.t.startsWith("v-"));
      const p5 = [...pick(byBand(0), 3), ...pick(byBand(1), 3), ...pick(byBand(2), 2), ...pick(byBand(3), 2), ...pick(byBand(4), 2)];
      return [...[P2[0], P2[4], P2[6], P2[8], P2[10], P2[3]].map(G.p2), G.p3(P3[1]), G.p4(P4[1]), ...p5.map(G.p5), G.p6(P6[0]), G.p7(P7[0]), G.p7(P7[2])];
    }
  }
  return [];
}
const LISTEN_PARTS = [1, 2, 3, 4];

function runExam(el, type) {
  const meta = type === "placement" ? { name: "Test band đầu vào", min: 30, sec: "LR" } : EXAMS[type];
  const groups = buildExam(type);
  let no = 0;
  groups.forEach((g, gi) => g.qs.forEach(q => { q.no = ++no; q.gi = gi; }));
  const flat = groups.flatMap(g => g.qs);
  const hasL = flat.some(q => LISTEN_PARTS.includes(q.part));
  const maxPlays = type === "placement" ? 2 : 99;
  const ans = {}, plays = {};
  let gi = 0, left = meta.min * 60, iv = 0, started = false, warned = false;
  App.cleanup = () => clearInterval(iv);

  // Màn hình bắt đầu
  el.innerHTML = `<div class="glass card session">
    <button class="back" id="back">${icon("left")} ${type === "placement" ? "Test band" : "Luyện thi"}</button>
    <h1>${esc(meta.name)}</h1>
    <div class="row" style="margin:12px 0 16px"><span class="chip accent num">${flat.length} câu</span><span class="chip num">${meta.min} phút</span>${hasL ? `<span class="chip">${icon("head")} Có phần nghe</span>` : ""}</div>
    <div class="stack small">
      ${hasL ? `<div class="note"><b>Phần nghe:</b> bật loa hoặc tai nghe. Bấm nút phát để nghe từng đoạn${maxPlays < 99 ? `, tối đa ${maxPlays} lần mỗi đoạn` : ""}. Lời thoại hiện sau khi nộp bài.</div>` : ""}
      <div class="note"><b>Cách làm:</b> chọn đáp án bằng chuột hoặc phím 1–4; dùng phím ← → để chuyển câu. Hết giờ bài tự nộp.</div>
      ${type === "placement" || type === "full" ? `<div class="note"><b>Ước lượng điểm:</b> kết quả quy đổi sang thang 10–990 chỉ mang tính tham khảo, đề thật dài 200 câu.</div>` : ""}
    </div>
    <div class="row" style="justify-content:flex-end;margin-top:18px"><button class="btn primary lg" id="go">Bắt đầu làm bài ${icon("right")}</button></div>
  </div>`;
  $("#back").onclick = () => App.go(type === "placement" ? "placement" : "exam");
  $("#go").onclick = () => {
    started = true; App.busy = true;
    iv = setInterval(() => {
      left--;
      const c = $("#cd"); if (c) { c.textContent = `${pad(Math.floor(left / 60))}:${pad(left % 60)}`; c.classList.toggle("low", left < 60); }
      if (left <= 0) { clearInterval(iv); submit(true); }
    }, 1000);
    draw();
  };

  const draw = () => {
    const g = groups[gi];
    const range = g.qs.length > 1 ? `Câu ${g.qs[0].no}–${g.qs[g.qs.length - 1].no}` : `Câu ${g.qs[0].no}`;
    let content = "";
    if (g.kind === "audio") {
      const p = plays[gi] || 0;
      content = `<p class="muted small" style="margin-bottom:10px">${esc(g.note)}</p>${g.img ? `<div class="p1img">${g.img}</div>` : ""}<div class="row exam-rate"><span class="muted small">Tốc độ nghe</span>${[0.8, 0.9, 1].map(r => `<button class="btn sm ${(S.settings.examRate || 0.9) === r ? "primary" : ""}" data-er="${r}">${r === 1 ? "Như đề thật" : r === 0.9 ? "Chậm vừa" : "Chậm"}</button>`).join("")}</div><div class="audio-box"><button class="play" id="play" aria-label="Phát âm thanh" ${p >= maxPlays ? "disabled" : ""}>${iconFill("play")}</button><div><b>Nghe ${g.part === 1 ? "4 câu mô tả" : g.part === 2 ? "câu hỏi" : g.part === 3 ? "đoạn hội thoại" : "bài nói"}</b><div class="muted small num">Đã nghe ${p}${maxPlays < 99 ? "/" + maxPlays : ""} lần</div></div></div>`;
    } else if (g.kind === "passage") {
      const body = esc(g.passage).replace(/\{(\d)\}/g, (_, d) => `<span class="blank">${g.qs[+d - 1].no}</span>`);
      content = `<div class="passage">${body}</div>`;
    }
    el.innerHTML = `<div class="runner">
      <section class="glass card">
        <div class="card-h"><h2>${esc(g.title)}</h2><span class="chip accent num">${range}</span></div>
        ${content}
        <div style="margin-top:14px">${g.qs.map(q => `<div class="qblock" data-no="${q.no}"><div class="qn"><span class="muted num">${q.no}.</span> ${g.part === 6 ? "Chọn đáp án cho chỗ trống " + q.no : esc(q.q)}</div><div class="opts ${q.o.length <= 3 || q.o.every(o => o.length < 26) ? "two" : ""}">${q.o.map((o, j) => optHTML(o, j, ans[q.no] === j ? "sel" : "")).join("")}</div></div>`).join("")}</div>
        <div class="row" style="margin-top:12px"><button class="btn" id="prev" ${gi ? "" : "disabled"}>${icon("left")} Trước</button><span class="spacer"></span><button class="btn primary" id="next">${gi < groups.length - 1 ? "Tiếp " + icon("right") : "Nộp bài"}</button></div>
      </section>
      <aside class="glass card" style="position:sticky;top:20px">
        <div class="row"><span class="muted small">Thời gian còn lại</span><span class="spacer"></span><span class="countdown num ${left < 60 ? "low" : ""}" id="cd">${pad(Math.floor(left / 60))}:${pad(left % 60)}</span></div>
        <div class="muted small" style="margin:12px 0 8px">Đã làm <b class="num" id="answered">${Object.keys(ans).length}</b>/${flat.length}</div>
        <div class="qnav">${flat.map(q => `<button class="${ans[q.no] != null ? "ans" : ""} ${q.gi === gi ? "cur" : ""}" data-go="${q.gi}">${q.no}</button>`).join("")}</div>
        <button class="btn primary" id="submit" style="width:100%;margin-top:14px">Nộp bài</button>
        <p class="tiny muted" id="sub-warn" style="margin-top:8px"></p>
      </aside>
    </div>`;
    if ($("#play")) $("#play").onclick = async () => {
      if ((plays[gi] || 0) >= maxPlays) return;
      plays[gi] = (plays[gi] || 0) + 1;
      $("#play").disabled = true;
      const my = gi;
      await Speech.script(examScript(g), S.settings.examRate || 0.9);
      if (gi === my && $("#play")) { $("#play").disabled = plays[gi] >= maxPlays; draw(); }
    };
    $$("[data-er]", el).forEach(b => b.onclick = () => { S.settings.examRate = +b.dataset.er; save(); $$("[data-er]", el).forEach(x => x.classList.toggle("primary", x === b)); });
    $$(".qblock", el).forEach(qb => {
      const n = +qb.dataset.no;
      $$(".opt", qb).forEach(b => b.onclick = () => {
        ans[n] = +b.dataset.i;
        $$(".opt", qb).forEach(x => x.classList.toggle("sel", x === b));
        const nb = $(`.qnav [data-go]:nth-child(${n})`, el); if (nb) nb.classList.add("ans");
        $("#answered").textContent = Object.keys(ans).length;
      });
    });
    $$(".qnav [data-go]", el).forEach(b => b.onclick = () => { gi = +b.dataset.go; Speech.stop(); draw(); });
    $("#prev").onclick = () => { gi--; Speech.stop(); draw(); };
    $("#next").onclick = () => { if (gi < groups.length - 1) { gi++; Speech.stop(); draw(); } else submit(false); };
    $("#submit").onclick = () => submit(false);
    App.keyHandler = e => {
      if (e.target.matches("input,textarea")) return;
      if (/^[1-4]$/.test(e.key) && g.qs.length === 1) { const b = $$(".opt", el)[+e.key - 1]; if (b) b.click(); }
      else if (e.key === "ArrowRight" && gi < groups.length - 1) { gi++; Speech.stop(); draw(); }
      else if (e.key === "ArrowLeft" && gi > 0) { gi--; Speech.stop(); draw(); }
    };
  };

  const submit = timeout => {
    const miss = flat.length - Object.keys(ans).length;
    if (!timeout && miss && !warned) {
      warned = true;
      const w = $("#sub-warn"); if (w) w.textContent = `Còn ${miss} câu chưa làm. Bấm Nộp bài lần nữa để nộp.`;
      return;
    }
    clearInterval(iv); Speech.stop();
    App.busy = false; App.keyHandler = null;
    const res = { id: Date.now(), type, title: meta.name, date: today(), total: flat.length, correct: 0, L: { c: 0, n: 0 }, R: { c: 0, n: 0 }, parts: {}, tags: {}, used: meta.min * 60 - left };
    flat.forEach(q => {
      const ok = ans[q.no] === q.a;
      if (ok) res.correct++;
      const sec = LISTEN_PARTS.includes(q.part) ? res.L : res.R;
      sec.n++; if (ok) sec.c++;
      const p = res.parts[q.part] || (res.parts[q.part] = { c: 0, n: 0 }); p.n++; if (ok) p.c++;
      const t = res.tags[q.t] || (res.tags[q.t] = [0, 0]); t[1]++; if (ok) t[0]++;
      tagHit(q.t, ok);
    });
    if (type === "full" || type === "placement") {
      const L = res.L.n ? estSec(res.L.c / res.L.n) : 5, R = res.R.n ? estSec(res.R.c / res.R.n) : 5;
      res.est = { L, R, T: L + R };
    }
    if (type === "placement") { S.placement = { date: today(), ...res.est }; S.profile.current = res.est.T; }
    S.tests.push(res);
    if (S.tests.length > 60) S.tests = S.tests.slice(-60);
    addXP(10 + res.correct * 2);
    markPlan("x"); bump("test");
    showResult(el, res, groups, ans, timeout);
  };
}

function showResult(el, res, groups, ans, timeout) {
  const p = pct(res.correct, res.total);
  const tagList = Object.entries(res.tags).map(([t, [c, n]]) => ({ t, c, n, p: pct(c, n) })).sort((a, b) => a.p - b.p || b.n - a.n);
  const weak = tagList.filter(x => x.p < 100);
  const b = res.est ? bandOf(res.est.T) : null;
  const partName = { 1: "Part 1 · Mô tả tranh", 2: "Part 2 · Hỏi – đáp", 3: "Part 3 · Hội thoại", 4: "Part 4 · Bài nói", 5: "Part 5 · Hoàn thành câu", 6: "Part 6 · Đoạn văn", 7: "Part 7 · Đọc hiểu" };
  el.innerHTML = `
  <div class="grid">
    <section class="glass card">
      <button class="back" id="back">${icon("left")} ${res.type === "placement" ? "Test band" : "Luyện thi"}</button>
      <div class="card-h"><div><h1>Kết quả · ${esc(res.title)}</h1><div class="sub">${timeout ? "Hết giờ – bài đã tự nộp. " : ""}Thời gian làm ${Math.floor(res.used / 60)} phút ${res.used % 60} giây</div></div></div>
      <div class="grid ${res.est ? "g4" : "g3"}">
        <div class="stat" style="padding:0"><div class="score-big">${res.correct}<span class="muted" style="font-size:24px">/${res.total}</span></div><div class="l">câu đúng · ${p}%</div></div>
        <div class="stat" style="padding:0"><div class="v" style="color:var(--bad)">${res.total - res.correct}</div><div class="l">câu sai hoặc bỏ trống</div></div>
        ${res.est ? `<div class="stat" style="padding:0"><div class="v num">${res.est.T}</div><div class="l">Ước lượng tổng (L ${res.est.L} · R ${res.est.R})</div></div>
        <div class="stat" style="padding:0"><div class="v">Band ${b}</div><div class="l">${BANDS[b].label} · ${BANDS[b].range}</div></div>`
        : `<div class="stat" style="padding:0"><div class="v num">${res.L.n ? pct(res.L.c, res.L.n) + "%" : pct(res.R.c, res.R.n) + "%"}</div><div class="l">Tỉ lệ đúng ${res.L.n ? "phần nghe" : "phần đọc"}</div></div>`}
      </div>
      ${res.type === "placement" ? `<div class="note" style="margin-top:16px">Trình độ ước lượng: <b>${res.est.T}</b> điểm (Band ${b} · ${BANDS[b].label}). Điểm hiện tại đã được cập nhật và lộ trình tự chuyển sang tuần phù hợp với trình độ này.
        <div class="row" style="margin-top:10px"><button class="btn primary sm" id="toroute">Xem lộ trình của tôi</button></div></div>` : ""}
    </section>
    <div class="grid g2">
      <section class="glass card">
        <div class="card-h"><h2>Theo Part</h2></div>
        ${Object.entries(res.parts).map(([k, v]) => `<div class="tag-row" style="grid-template-columns:minmax(0,1fr) 140px 70px"><span>${partName[k]}</span>${bar(pct(v.c, v.n), pct(v.c, v.n) < 50 ? "warm" : "")}<span class="num small">${v.c}/${v.n}</span></div>`).join("")}
      </section>
      <section class="glass card">
        <div class="card-h"><h2>Cần ôn</h2><span class="sub">Dạng sai trong đề này</span></div>
        ${weak.length ? weak.slice(0, 6).map(x => { const ti = tagInfo(x.t); return `<div class="tag-row"><span>${esc(ti.label)}${ti.tip ? `<div class="tiny muted">${esc(ti.tip)}</div>` : ""}</span>${bar(x.p, x.p < 50 ? "warm" : "")}<span class="num small">${x.c}/${x.n}</span>${ti.kind !== "x" ? `<button class="btn sm" data-tag="${esc(x.t)}">Ôn</button>` : "<span></span>"}</div>`; }).join("")
          : `<p class="muted">Không sai câu nào – xuất sắc! Thử đề khó hơn hoặc Mini test tổng hợp.</p>`}
      </section>
    </div>
    <section class="glass card">
      <div class="card-h"><h2>Xem lại bài làm</h2><span class="sub">Lời thoại và giải thích</span></div>
      ${groups.map(g => `<div class="week-block">
        <h3 style="margin-bottom:8px">${esc(g.title)}</h3>
        ${g.img ? `<div class="p1img">${g.img}</div>` : ""}${g.kind === "audio" ? `<div class="row" style="align-items:flex-start"><div class="transcript" style="flex:1">${esc(g.transcript)}</div><button class="btn sm" data-replay="${groups.indexOf(g)}">${icon("vol")} Nghe lại</button></div>` : ""}
        ${g.kind === "passage" ? `<div class="passage">${esc(g.passage).replace(/\{(\d)\}/g, (_, d) => `<span class="blank">${g.qs[+d - 1].no}</span>`)}</div>` : ""}
        ${g.qs.map(q => { const a = ans[q.no], ok = a === q.a; return `<div class="qblock"><div class="qn"><span class="chip ${ok ? "good" : "bad"} num">${q.no}</span> ${g.part === 6 ? "Chỗ trống " + q.no : esc(q.q)}</div>
          <div class="opts ${q.o.every(o => o.length < 26) ? "two" : ""}">${q.o.map((o, j) => optHTML(g.part === 2 ? g.audio[j + 1].text.slice(3) : g.part === 1 ? g.audio[j].text.slice(3) : o, j, j === q.a ? "right" : j === a ? "wrong" : "", "disabled")).join("")}</div>
          ${q.e ? `<div class="feedback ${ok ? "ok" : "no"}" style="margin-top:8px"><span class="fx">${esc(q.e)}</span></div>` : ""}</div>`; }).join("")}
      </div>`).join("")}
      <div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn" id="again">${icon("refresh")} Làm đề mới cùng dạng</button><button class="btn primary" id="done">Về Luyện thi</button></div>
    </section>
  </div>`;
  $("#back").onclick = () => App.go(res.type === "placement" ? "placement" : "exam");
  $("#done").onclick = () => App.go("exam");
  $("#again").onclick = () => App.go(res.type === "placement" ? "placement" : "exam", res.type === "placement" ? { start: true } : { start: res.type });
  $$("[data-replay]", el).forEach(x => x.onclick = () => Speech.lines(groups[+x.dataset.replay].audio));
  $$("[data-tag]", el).forEach(x => x.onclick = () => { const ti = tagInfo(x.dataset.tag); App.go(ti.go[0], ti.go[0] === "vocab" ? { learn: ti.go[1] } : ti.go[1]); });
  if ($("#apply")) $("#apply").onclick = () => { S.profile.current = res.est.T; save(); toast("Đã cập nhật điểm hiện tại"); $("#apply").disabled = true; };
  if ($("#toroute")) $("#toroute").onclick = () => App.go("roadmap", b);
  window.scrollTo(0, 0);
}

function scoreChart() {
  const pts = S.tests.filter(t => t.est).slice(-12);
  const tgt = S.profile.target;
  if (!pts.length) return `<div class="empty">Chưa có điểm ước lượng. Làm <b>Test band</b> hoặc <b>Mini test tổng hợp</b> để theo dõi tiến bộ so với mục tiêu.</div>`;
  const W = 600, H = 220, l = 40, r = 16, t = 14, bt = 28;
  const vals = pts.map(p => p.est.T).concat([tgt, S.profile.current]);
  let lo = Math.max(0, Math.floor((Math.min(...vals) - 60) / 100) * 100), hi = Math.min(1000, Math.ceil((Math.max(...vals) + 40) / 100) * 100);
  if (hi - lo < 200) hi = Math.min(1000, lo + 200);
  const x = i => pts.length === 1 ? l + (W - l - r) / 2 : l + i * (W - l - r) / (pts.length - 1);
  const y = v => t + (H - t - bt) * (1 - (v - lo) / (hi - lo));
  const step = hi - lo > 600 ? 200 : 100; const ticks = []; for (let v = lo; v <= hi; v += step) ticks.push(v);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.est.T).toFixed(1)}`).join(" ");
  const area = `${line} L${x(pts.length - 1).toFixed(1)},${H - bt} L${x(0).toFixed(1)},${H - bt} Z`;
  const lastP = pts[pts.length - 1];
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Biểu đồ điểm ước lượng qua các lần thi">
    ${ticks.map(v => `<line class="gl" x1="${l}" x2="${W - r}" y1="${y(v)}" y2="${y(v)}"/><text class="tx" x="${l - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join("")}
    <line class="tg" x1="${l}" x2="${W - r}" y1="${y(tgt)}" y2="${y(tgt)}"/><text class="tx" x="${W - r}" y="${y(tgt) - 6}" text-anchor="end" style="fill:var(--warm)">Mục tiêu ${tgt}</text>
    ${pts.length > 1 ? `<path class="ar" d="${area}"/>` : ""}<path class="ln" d="${line}"/>
    ${pts.map((p, i) => `<circle class="dot" cx="${x(i)}" cy="${y(p.est.T)}" r="${i === pts.length - 1 ? 5.5 : 3.5}"><title>${fmtDate(p.date)} · ${p.title}: ${p.est.T}</title></circle>`).join("")}
    <text class="tx" x="${x(pts.length - 1)}" y="${y(lastP.est.T) - 10}" text-anchor="${pts.length > 1 ? "end" : "middle"}" style="fill:var(--ink);font-weight:700">${lastP.est.T}</text>
    ${pts.map((p, i) => (pts.length <= 6 || i % 2 === 0) ? `<text class="tx" x="${x(i)}" y="${H - 8}" text-anchor="middle">${p.date.slice(8)}/${p.date.slice(5, 7)}</text>` : "").join("")}
  </svg></div>`;
}

App.views.exam = function (el, arg) {
  if (arg && arg.start && EXAMS[arg.start]) return runExam(el, arg.start);
  const est = lastEstimate();
  const cur = S.profile.current, tgt = S.profile.target;
  const weak = weakTags();
  const hist = [...S.tests].reverse().slice(0, 12);
  el.innerHTML = `
  <div class="grid">
    <section class="glass page-h"><div><h1>Luyện thi</h1><p>Đề luyện theo từng Part và Mini test tổng hợp. Sau mỗi đề, hệ thống ghi lại số câu sai theo dạng để chỉ ra bạn cần ôn gì.</p></div></section>
    <div class="grid g3">
      <section class="glass card">
        <div class="card-h"><h2>Mục tiêu</h2><button class="btn sm ghost" id="edit-goal">${icon("pen")} Sửa</button></div>
        <div class="grid g2" style="gap:12px">
          <div class="stat" style="padding:0"><div class="v num">${cur}</div><div class="l">Hiện tại · Band ${bandOf(cur)}</div></div>
          <div class="stat" style="padding:0"><div class="v num" style="color:var(--accent-ink)">${tgt}</div><div class="l">Mục tiêu · Band ${bandOf(tgt - 1)}</div></div>
        </div>
        <div style="margin-top:14px">${bar(pct(Math.max(0, (est || cur) - 10), Math.max(1, tgt - 10)))}</div>
        <p class="small muted" style="margin-top:8px">${est ? `Ước lượng gần nhất <b class="num">${est}</b> – ${est >= tgt ? "đã chạm mục tiêu!" : `còn ${tgt - est} điểm.`}` : "Chưa có ước lượng từ đề tổng hợp."}</p>
      </section>
      <section class="glass card span2">
        <div class="card-h"><h2>Tiến bộ điểm ước lượng</h2><span class="sub">Từ Test band và Mini test tổng hợp</span></div>
        ${scoreChart()}
      </section>
    </div>
    <section class="glass card">
      <div class="card-h"><h2>Chọn đề luyện</h2><div class="row"><button class="btn sm" id="sheet">${icon("pen")} Chấm đề làm trong sách</button><button class="btn sm" id="pl">${icon("target")} Test band đầu vào</button></div></div>
      <div class="grid g4" style="gap:12px">${Object.entries(EXAMS).map(([k, e]) => {
        const last = [...S.tests].reverse().find(t => t.type === k);
        return `<div class="set-card"><div class="row"><h3 style="flex:1">${esc(e.name)}</h3><span class="chip ${e.sec === "L" ? "warm" : e.sec === "R" ? "accent" : "good"}">${e.sec === "L" ? "Nghe" : e.sec === "R" ? "Đọc" : "Nghe + Đọc"}</span></div>
          <p class="small muted">${esc(e.desc)}</p><div class="row small muted num"><span>${e.n} câu · ${e.min} phút</span><span class="spacer"></span>${last ? `<span class="chip ${pct(last.correct, last.total) >= 70 ? "good" : "bad"}">Lần trước ${last.correct}/${last.total}</span>` : ""}</div>
          <button class="btn sm primary" data-start="${k}">Làm đề</button></div>`;
      }).join("")}</div>
    </section>
    <div class="grid g2">
      <section class="glass card">
        <div class="card-h"><h2>Phân tích điểm yếu</h2><span class="sub">Tích lũy từ mọi bài đã làm</span></div>
        ${weak.length ? weak.slice(0, 8).map(w => { const ti = tagInfo(w.tag); return `<div class="tag-row"><span>${esc(ti.label)}${ti.tip && w.p < 70 ? `<div class="tiny muted">${esc(ti.tip)}</div>` : ""}</span>${bar(w.p, w.p < 50 ? "warm" : "")}<span class="num small">${w.p}%</span><button class="btn sm" data-tag="${esc(w.tag)}">Ôn</button></div>`; }).join("")
          : `<div class="empty">Làm ít nhất một đề để xem phân tích.</div>`}
      </section>
      <section class="glass card">
        <div class="card-h"><h2>Lịch sử làm bài</h2></div>
        ${hist.length ? `<div class="scroll-x"><table class="table"><thead><tr><th>Ngày</th><th>Đề</th><th class="r">Đúng</th><th class="r">Sai</th><th class="r">Ước lượng</th></tr></thead><tbody>
          ${hist.map(h => `<tr><td class="num">${fmtDate(h.date)}</td><td>${esc(h.title)}</td><td class="r">${h.correct}/${h.total}</td><td class="r" style="color:var(--bad)">${h.total - h.correct}</td><td class="r">${h.est ? h.est.T : "–"}</td></tr>`).join("")}
        </tbody></table></div>` : `<div class="empty">Chưa có bài nào.</div>`}
      </section>
    </div>
  </div>`;
  $("#edit-goal").onclick = openGoal;
  $("#pl").onclick = () => App.go("placement");
  $("#sheet").onclick = openAnswerSheet;
  $$("[data-start]", el).forEach(b => b.onclick = () => App.go("exam", { start: b.dataset.start }));
  $$("[data-tag]", el).forEach(b => b.onclick = () => { const ti = tagInfo(b.dataset.tag); App.go(ti.go[0], ti.go[0] === "exam" ? { start: ti.go[1] } : ti.go[0] === "vocab" ? { learn: ti.go[1] } : ti.go[1]); });
};

App.views.placement = function (el, arg) {
  if (arg && arg.start) return runExam(el, "placement");
  const pl = S.placement;
  el.innerHTML = `
  <div class="grid">
    <section class="glass page-h"><div><h1>Test band</h1><p>Bài kiểm tra đầu vào 34 câu (12 câu nghe Part 2–4, 22 câu đọc Part 5–7), độ khó tăng dần từ Band 0 đến Band 4. Kết quả ước lượng điểm và gợi ý lộ trình phù hợp.</p></div></section>
    <div class="grid g3">
      <section class="glass card span2">
        <h2>Trước khi làm</h2>
        <ul class="small" style="padding-left:18px;margin:10px 0 0;line-height:1.9">
          <li>Thời gian: 30 phút, hết giờ tự nộp.</li>
          <li>Mỗi đoạn nghe được phát tối đa 2 lần – bật loa hoặc tai nghe.</li>
          <li>Không tra từ điển để kết quả sát trình độ thật.</li>
          <li>Kết quả quy đổi sang thang 10–990 chỉ để tham khảo.</li>
        </ul>
        <div class="row" style="margin-top:18px"><button class="btn primary lg" id="start">${pl ? "Làm lại bài test" : "Bắt đầu Test band"} ${icon("right")}</button></div>
      </section>
      <section class="glass card">
        <h2>Kết quả gần nhất</h2>
        ${pl ? `<div class="score-big num" style="margin-top:10px">${pl.T}</div><p class="muted small">Ngày ${fmtDate(pl.date)} · Listening ${pl.L} · Reading ${pl.R}</p><div class="row" style="margin-top:10px">${chipBand(bandOf(pl.T))}<span class="chip">${BANDS[bandOf(pl.T)].label}</span></div>
          <button class="btn sm" id="route" style="margin-top:14px">Xem lộ trình Band ${bandOf(pl.T)}</button>` : `<p class="muted" style="margin-top:10px">Bạn chưa làm bài test band.</p>`}
      </section>
    </div>
    <section class="glass card">
      <h2 style="margin-bottom:12px">Thang band của TOEIC Path</h2>
      <div class="bands">${BANDS.map(b => `<div class="band-pick" style="cursor:default"><span class="bn">Band ${b.id}</span><span class="bs num">${b.range} · ${b.label}</span><span class="tiny muted">${esc(b.desc)}</span></div>`).join("")}</div>
    </section>
  </div>`;
  $("#start").onclick = () => App.go("placement", { start: true });
  if ($("#route")) $("#route").onclick = () => App.go("roadmap", bandOf(pl.T));
};
