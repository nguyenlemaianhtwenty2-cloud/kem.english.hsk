/* ===== Ngữ pháp, Luyện dịch, Shadowing ===== */

/* ---------- Ngữ pháp ---------- */
App.views.grammar = function (el, arg) {
  if (arg && TOPIC_BY_ID[arg]) return grammarDetail(el, arg);
  let band = "all";
  const card = t => {
    const g = S.grammar[t.id];
    return `<button class="topic-card" data-id="${t.id}">
      <span class="row"><span class="tico">${icon(isTense(t.id) ? "clock" : ["pen", "book", "spark", "chat", "list", "exam"][t.name.length % 6])}</span><span class="tn" style="flex:1">${esc(t.name)}</span>${g ? `<span class="chip ${g.best >= 60 ? "good" : "bad"} num">${g.best}%</span>` : ""}</span>
      <span class="te">${esc(t.en)}</span><span class="row">${chipBand(t.band)}<span class="tiny muted">${t.ex.length} câu luyện</span></span></button>`;
  };
  const draw = () => {
    const f = x => band === "all" || x.band === +band;
    const doneT = TENSES.filter(t => (S.grammar[t.id] || {}).best >= 60).length;
    const doneG = GRAMMAR.filter(t => (S.grammar[t.id] || {}).best >= 60).length;
    el.innerHTML = `
    <div class="grid">
      <section class="glass page-h">
        <div><h1>Ngữ pháp TOEIC</h1><p>Đủ 12 thì và ${GRAMMAR.length} chủ điểm hay ra ở Part 5–6. Mỗi bài gồm công thức, cách dùng, dấu hiệu nhận biết, mẹo làm bài và bài tập có giải thích.</p></div>
        <div class="tabs">${["all", 0, 1, 2, 3, 4].map(b => `<button class="${String(band) === String(b) ? "on" : ""}" data-band="${b}">${b === "all" ? "Tất cả" : "Band " + b}</button>`).join("")}</div>
      </section>
      <section class="glass card">
        <div class="card-h"><h2>12 thì trong tiếng Anh</h2><span class="sub num">${doneT}/12 đạt ≥ 60%</span></div>
        <div class="grid g4" style="gap:10px">${TENSES.filter(f).map(card).join("") || '<p class="muted">Không có thì nào ở band này.</p>'}</div>
      </section>
      <section class="glass card">
        <div class="card-h"><h2>Chủ điểm ngữ pháp</h2><span class="sub num">${doneG}/${GRAMMAR.length} đạt ≥ 60%</span></div>
        <div class="grid g3" style="gap:10px">${GRAMMAR.filter(f).map(card).join("") || '<p class="muted">Không có chủ điểm nào ở band này.</p>'}</div>
      </section>
      <section class="glass card">
        <div class="card-h"><h2>Quy trình 3 bước giải câu Part 5</h2></div>
        <div class="grid g3 small">
          <div class="note"><b>1. Nhìn đáp án</b><br>Cùng gốc khác đuôi → câu từ loại; cùng động từ khác dạng → câu thì/bị động; khác nghĩa → câu từ vựng.</div>
          <div class="note"><b>2. Nhìn quanh chỗ trống</b><br>Đọc 2 từ trước và sau. Câu từ loại và giới từ thường giải được không cần dịch cả câu.</div>
          <div class="note"><b>3. Dịch khi cần</b><br>Chỉ đọc cả câu với câu từ vựng và liên từ. Giới hạn 20–30 giây mỗi câu.</div>
        </div>
      </section>
    </div>`;
    $$("[data-band]", el).forEach(b => b.onclick = () => { band = b.dataset.band; draw(); });
    $$("[data-id]", el).forEach(b => b.onclick = () => App.go("grammar", b.dataset.id));
  };
  draw();
};

function grammarDetail(el, id) {
  const t = TOPIC_BY_ID[id], tense = isTense(id);
  const all = [...TENSES, ...GRAMMAR];
  const nextT = all[(all.findIndex(x => x.id === id) + 1) % all.length];
  const sec = (label, body, cls = "") => `<div class="gsec ${cls}"><div class="glabel">${label}</div>${body}</div>`;
  const lines = v => esc(v).replace(/([\p{Ll}\)"”]{2,}[.;])\s+(?=\p{Lu})/gu, "$1\n").split("\n");
  const toks = f => esc(f).split(" + ").map(x => `<b class="${/^(S|Am\/Is\/Are|Do\/Does|Did|Have\/Has|Had|Will|Was\/Were)$/.test(x) || /^S\b/.test(x) ? "s" : /^V|V-ing|V3|V2|V\(/.test(x) ? "v" : "a"}">${x}</b>`).join('<u>+</u>');
  const hi = (en, k) => { const parts = k.split(" … ").map(esc); let h = esc(en); parts.forEach(x => { h = h.replace(x, "<em>" + x + "</em>"); }); return h; };
  const solved = ((window.TENSE_EG || {})[id] || []).map(([en, k, vi]) => ({ html: hi(en, k), text: en, why: vi }));
  const SIGN = { "Khẳng định": "+", "Phủ định": "−", "Nghi vấn": "?" };
  const theory = tense
    ? `<p class="gintro">${esc(t.name)} (${esc(t.en)}) dùng để diễn tả: ${t.use.map(u => esc(u.charAt(0).toLowerCase() + u.slice(1))).join("; ")}.</p>`
      + sec("Dùng khi", `<ul>${t.use.map(u => `<li>${esc(u)}</li>`).join("")}</ul>`, "plain")
      + sec("Cấu trúc", Object.entries(t.form).map(([k, v]) => `<div class="gform"><mark>${esc(v)}</mark><i>${k}</i></div>`).join(""), "box")
      + sec("Dấu hiệu nhận biết", `<ul>${t.signs.map(u => `<li>${esc(u)}</li>`).join("")}</ul>`, "plain")
      + (solved.length ? sec("Ví dụ", solved.map(x => `<div class="gex"><div><b>${x.html}</b>${sayBtn(x.text)}</div><i>${esc(x.why)}</i></div>`).join(""), "eg") : "")
      + sec("Mẹo TOEIC", `<p>${esc(t.tip)}</p>`, "tip")
    : sec("Cấu trúc & quy tắc", t.theory.map(([k, v]) => `<div class="gform"><mark>${esc(k)}</mark><i>${esc(v)}</i></div>`).join(""), "box")
      + (t.eg ? sec("Ví dụ", t.eg.map(([en, vi]) => `<div class="gex"><div><b>${esc(en)}</b>${sayBtn(en)}</div><i>${esc(vi)}</i></div>`).join(""), "eg") : "")
      + sec("Mẹo làm bài", `<ul>${t.tips.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`, "tip");
  const fx = (t.ex || [])[(t.ex || []).length - 1];
  const fixHTML = fx && fx.q.includes("___") ? (() => { const [a, b] = fx.q.split("___"), wrong = fx.o.find((o, i) => i !== fx.a);
    return `<div class="gsec gfix"><div class="glabel">Lỗi hay gặp</div><div class="gfix-pad"><p class="gfix-s">${esc(a)}<span class="gfix-w"><b>${esc(fx.o[fx.a])}</b><s>${esc(wrong)}</s></span>${esc(b || "")}</p><p class="gfix-n">${esc(fx.e)}</p></div></div>`; })() : "";
  const theoryFull = theory.replace('<div class="gsec tip">', fixHTML + '<div class="gsec tip">');
  let answers = {}, submitted = false, cur = [];
  const shuffle = a => { a = a.slice(); for (let k = a.length - 1; k > 0; k--) { const r = Math.floor(Math.random() * (k + 1)); [a[k], a[r]] = [a[r], a[k]]; } return a; };
  const extra = () => ((S.genEx || {})[id] || []);
  const seen = () => ((S.exSeen || {})[id] || []);
  // mỗi lần vào: ưu tiên câu chưa làm, xáo thứ tự câu và thứ tự đáp án
  const pick = () => { const all = [...t.ex.map(q => ({ ...q })), ...extra().map(q => ({ ...q, ai: 1 }))], sn = seen();
    const fresh = shuffle(all.filter(q => !sn.includes(q.q))), old = shuffle(all.filter(q => sn.includes(q.q)));
    return fresh.concat(old).slice(0, 5).map(q => { const ord = shuffle(q.o.map((_, k) => k)); return { q: q.q, o: ord.map(k => q.o[k]), a: ord.indexOf(q.a), e: q.e, ai: q.ai }; }); };
  const freshLeft = () => [...t.ex, ...extra()].filter(q => !seen().includes(q.q)).length;
  let making = null;
  const makeMore = () => making || (making = (async () => {
    try {
      const brief = tense ? `Cách dùng: ${t.use.join("; ")}. Công thức: ${Object.values(t.form).join(" / ")}.` : t.theory.map(([k, v]) => `${k}: ${v}`).join(" ").slice(0, 900);
      const r = await askJSON(`Bạn là giáo viên luyện thi TOEIC. Hãy viết 6 câu trắc nghiệm MỚI kiểu TOEIC Part 5 để luyện chủ điểm ngữ pháp "${t.name} (${t.en})". ${brief}
Yêu cầu: mỗi câu là một câu tiếng Anh ngữ cảnh công sở có đúng một chỗ trống viết là ___ ; có đúng 4 lựa chọn khác nhau, chỉ MỘT lựa chọn đúng ngữ pháp; lời giải thích ngắn bằng tiếng Việt nói rõ vì sao đáp án đúng. Độ khó tăng dần. Không lặp lại các câu sau: ${[...t.ex, ...extra()].slice(-12).map(q => q.q).join(" | ")}
Chỉ trả về JSON đúng dạng: {"questions":[{"q":"câu có ___","o":["A","B","C","D"],"a":0,"e":"giải thích"}]} với a là vị trí (0–3) của đáp án đúng.`);
      const have = new Set([...t.ex, ...extra()].map(q => q.q)), ok = ((r && r.questions) || []).filter(q => q && typeof q.q === "string" && q.q.includes("___") && Array.isArray(q.o) && q.o.length === 4 && new Set(q.o.map(x => String(x).trim().toLowerCase())).size === 4 && Number.isInteger(q.a) && q.a >= 0 && q.a < 4 && typeof q.e === "string" && !have.has(q.q)).map(q => ({ q: q.q.trim(), o: q.o.map(x => String(x).trim()), a: q.a, e: q.e.trim() }));
      if (ok.length) { S.genEx = S.genEx || {}; S.genEx[id] = extra().concat(ok).slice(-40); save(); }
      return ok.length;
    } catch (e) { return 0; } finally { making = null; }
  })());
  el.innerHTML = `
  <div class="grid">
    <section class="glass card gnote">
      <button class="back" id="back">${icon("left")} Ngữ pháp</button>
      <div class="geyebrow">${tense ? "12 thì tiếng Anh" : "Chủ điểm ngữ pháp"} · Band ${t.band}${S.grammar[id] ? " · cao nhất " + S.grammar[id].best + "%" : ""}</div>
      <h1 class="gtitle">${esc(t.name)}</h1><div class="gen">${esc(t.en)}</div>
      <div class="gtabs"><span class="on">${icon("book")} Xem kiến thức</span><button id="to-ex">${icon("pen")} Luyện tập</button></div>
      ${theoryFull}
    </section>
    <section class="glass card" id="exbox">
      <div class="card-h"><h2 id="ex-h">Bài tập</h2><span class="sub">Mỗi lần vào là một bộ câu khác. Chọn đáp án rồi bấm Nộp bài để xem giải thích.</span></div>
      <div id="qs"></div>
      <div class="row" style="margin-top:14px;flex-wrap:wrap"><span id="gscore" class="muted small"></span><span class="spacer"></span><button class="btn" id="other">${icon("refresh")} Bài tập khác</button><button class="btn primary" id="submit">Nộp bài</button></div>
    </section>
  </div>`;
  const drawQs = () => {
    cur = pick(); answers = {}; submitted = false;
    $("#ex-h").textContent = `Bài tập (${cur.length} câu)`; $("#gscore").textContent = ""; $("#submit").textContent = "Nộp bài"; delete $("#submit").dataset.warned;
    $("#qs").innerHTML = cur.map((q, i) => `<div class="qblock" data-q="${i}"><div class="qn"><span class="muted num">${i + 1}.</span> ${esc(q.q)}${q.ai ? ` <span class="chip" title="Câu do AI tạo thêm, có thể có sai sót">AI</span>` : ""}</div><div class="opts two">${q.o.map((o, j) => optHTML(o, j)).join("")}</div><div class="exp"></div></div>`).join("");
    $$(".qblock", el).forEach(qb => { const qi = +qb.dataset.q;
      $$(".opt", qb).forEach(b => b.onclick = () => { if (submitted) return; answers[qi] = +b.dataset.i; $$(".opt", qb).forEach(x => x.classList.toggle("sel", x === b)); $("#gscore").textContent = `Đã chọn ${Object.keys(answers).length}/${cur.length}`; }); });
    if (Caps.sample && freshLeft() < 10) makeMore(); // chuẩn bị sẵn câu mới cho lần sau
  };
  $("#back").onclick = () => App.go("grammar");
  $("#to-ex").onclick = () => $("#exbox").scrollIntoView({ behavior: "smooth", block: "start" });
  $("#submit").onclick = () => {
    if (submitted) { App.go("grammar", nextT.id); return; }
    if (Object.keys(answers).length < cur.length && !$("#submit").dataset.warned) {
      $("#submit").dataset.warned = "1"; $("#gscore").textContent = `Còn ${cur.length - Object.keys(answers).length} câu chưa chọn – bấm Nộp bài lần nữa để nộp luôn.`; return;
    }
    submitted = true;
    let right = 0;
    cur.forEach((q, i) => {
      const qb = $(`.qblock[data-q="${i}"]`, el), a = answers[i], ok = a === q.a;
      if (ok) right++;
      tagHit(id, ok);
      $$(".opt", qb).forEach((b, j) => { b.disabled = true; b.classList.remove("sel"); if (j === q.a) b.classList.add("right"); else if (j === a) b.classList.add("wrong"); });
      $(".exp", qb).innerHTML = `<div class="feedback ${ok ? "ok" : "no"}" style="margin-top:10px"><b>${ok ? "Đúng" : a == null ? "Chưa làm" : "Sai"}</b> · <span class="fx">${esc(q.e)}</span></div>`;
    });
    S.exSeen = S.exSeen || {}; S.exSeen[id] = seen().concat(cur.map(q => q.q)).slice(-60);
    if (freshLeft() === 0) S.exSeen[id] = cur.map(q => q.q); // đã làm hết → quay vòng lại từ đầu, trừ bộ vừa làm
    const p = pct(right, cur.length);
    const prev = S.grammar[id] || { best: 0 };
    S.grammar[id] = { best: Math.max(prev.best || 0, p), last: p, at: today() };
    addXP(right * 2 + 5);
    bump("grammar");
    $("#gscore").innerHTML = `<b class="num" style="font-size:18px;color:${p >= 60 ? "var(--good)" : "var(--bad)"}">${right}/${cur.length} · ${p}%</b> ${p >= 60 ? "– đạt yêu cầu lộ trình" : "– xem lại lý thuyết và làm lại nhé"}`;
    $("#submit").innerHTML = `Bài tiếp: ${esc(nextT.name)} ${icon("right")}`;
  };
  $("#other").onclick = async () => {
    const b = $("#other");
    if (Caps.sample && freshLeft() < 3) { b.disabled = true; b.textContent = "Đang tạo bài tập mới…"; const n = await makeMore(); if (!document.body.contains(b)) return; b.disabled = false; b.innerHTML = `${icon("refresh")} Bài tập khác`; if (!n) toast("Chưa tạo thêm được câu mới – xáo lại các câu hiện có."); }
    drawQs(); $("#exbox").scrollIntoView({ behavior: "smooth", block: "start" });
  };
  drawQs();
}

/* ---------- Luyện dịch ---------- */
App.views.translate = function (el, arg) {
  let lv = typeof arg === "number" ? arg : 0, dir = "vi", order = [], idx = 0;
  const pool = () => TRANSLATE.filter(x => (dir === "vi" ? !x.dir : x.dir === "en") && (!lv || x.lv === lv));
  const reshuffle = () => { order = shuffle(pool()); idx = 0; };
  reshuffle();
  const draw = () => {
    const it = order[idx];
    const src = dir === "vi" ? it.vi : it.en, ref = dir === "vi" ? it.en : it.vi;
    const ai = !!Caps.sample;
    el.innerHTML = `
    <div class="grid">
      <section class="glass page-h">
        <div><h1>Luyện dịch</h1><p>Dịch câu theo ngữ cảnh TOEIC. ${ai ? "AI chấm điểm, sửa câu và giải thích lỗi bằng tiếng Việt." : "Hệ thống so khớp từ khóa và câu mẫu để chấm."} Dịch Việt → Anh giúp ghi nhớ cấu trúc cho Part 5–6; Anh → Việt giúp đọc hiểu Part 7.</p></div>
        <div class="stack" style="align-items:flex-end">
          <div class="tabs"><button class="${dir === "vi" ? "on" : ""}" data-dir="vi">Việt → Anh</button><button class="${dir === "en" ? "on" : ""}" data-dir="en">Anh → Việt</button></div>
          <div class="tabs">${[0, 1, 2, 3].map(l => `<button class="${lv === l ? "on" : ""}" data-lv="${l}">${l ? "Cấp " + l : "Tất cả"}</button>`).join("")}</div>
        </div>
      </section>
      <section class="glass card session">
        <div class="card-h"><span class="chip accent">Cấp ${it.lv} · ${dir === "vi" ? "Việt → Anh" : "Anh → Việt"}</span><span class="sub num">Câu ${idx + 1}/${order.length}${S.trans[it.id] != null ? ` · Điểm cao nhất ${S.trans[it.id]}/10` : ""}</span></div>
        <div class="row" style="align-items:flex-start"><p class="src" style="flex:1">${esc(src)}</p>${dir === "en" ? sayBtn(src) : ""}</div>
        <label class="field" for="tr-in" style="margin-top:16px">Bản dịch của bạn<textarea class="input" id="tr-in" placeholder="${dir === "vi" ? "Type your English translation…" : "Nhập bản dịch tiếng Việt…"}"></textarea></label>
        <div class="row" style="margin-top:12px"><button class="btn primary" id="grade">${ai ? icon("spark") + " Chấm bằng AI" : icon("check") + " Chấm bài"}</button><button class="btn" id="show">${icon("eye")} Xem đáp án</button><span class="spacer"></span><button class="btn" id="next">Câu khác ${icon("right")}</button></div>
        <div id="tr-out" style="margin-top:16px"></div>
      </section>
    </div>`;
    $$("[data-dir]", el).forEach(b => b.onclick = () => { dir = b.dataset.dir; reshuffle(); draw(); });
    $$("[data-lv]", el).forEach(b => b.onclick = () => { lv = +b.dataset.lv; reshuffle(); if (!order.length) { lv = 0; reshuffle(); } draw(); });
    $("#next").onclick = () => { idx = (idx + 1) % order.length; if (idx === 0) reshuffle(); draw(); };
    const out = $("#tr-out");
    const showRef = () => `<div class="note"><b>Câu mẫu:</b> ${esc(ref)} ${dir === "vi" ? sayBtn(ref) : ""}</div>`;
    $("#show").onclick = () => { out.innerHTML = showRef(); };
    const record = score => {
      S.trans[it.id] = Math.max(S.trans[it.id] || 0, score);
      S.transCount[it.lv] = (S.transCount[it.lv] || 0) + 1;
      addXP(3 + score);
      markPlan("tr"); bump("trans");
    };
    const localGrade = ans => {
      const f1 = wordDiff(ref, ans).score;
      const got = new Set(tokens(ans));
      const refT = tokens(ref);
      const prec = tokens(ans).length ? tokens(ans).filter(x => refT.includes(x)).length / tokens(ans).length : 0;
      let score;
      if (dir === "vi") {
        const kw = it.kw.filter(k => tokens(k).every(t => got.has(t) || [...got].some(g => g.startsWith(t.slice(0, Math.max(4, t.length - 2))))));
        score = Math.round(10 * (0.55 * kw.length / it.kw.length + 0.25 * f1 + 0.2 * prec));
        return { score, html: `<div class="small" style="margin-top:8px">Từ khóa cần có: ${it.kw.map(k => `<span class="chip ${kw.includes(k) ? "good" : "bad"}">${esc(k)}</span>`).join(" ")}</div>` };
      }
      score = Math.round(10 * (0.6 * f1 + 0.4 * prec));
      return { score, html: "" };
    };
    $("#grade").onclick = async () => {
      const ans = $("#tr-in").value.trim();
      if (!ans) { $("#tr-in").focus(); toast("Hãy nhập bản dịch trước khi chấm."); return; }
      const btn = $("#grade");
      if (Caps.sample) {
        btn.disabled = true; btn.innerHTML = `${icon("spark")} Đang chấm…`;
        try {
          const prompt = `You are a TOEIC teacher grading a Vietnamese learner's translation.
Direction: ${dir === "vi" ? "Vietnamese to English" : "English to Vietnamese"}.
Source sentence: "${src}"
Reference translation: "${ref}"
Student translation: "${ans}"
Grade meaning accuracy, grammar and natural word choice. Accept valid alternatives to the reference.
Reply with ONLY a JSON object: {"score": integer 0-10, "verdict": "short verdict in Vietnamese", "corrected": "the student's sentence minimally corrected to be natural and correct, in the target language", "notes": ["up to 3 short notes in Vietnamese explaining each error or a useful tip"]}`;
          const r = await askJSON(prompt);
          const score = clamp(Math.round(+r.score || 0), 0, 10);
          record(score);
          out.innerHTML = `<div class="feedback ${score >= 7 ? "ok" : "no"}"><b class="num">${score}/10</b> · ${esc(r.verdict || "")}</div>
            ${r.corrected ? `<div class="note" style="margin-top:10px"><b>Bản sửa:</b> ${esc(r.corrected)}</div>` : ""}
            ${(r.notes || []).length ? `<ul class="small" style="margin:10px 0 0;padding-left:18px">${r.notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}
            <div style="margin-top:10px">${showRef()}</div>`;
        } catch (e) {
          if (e && e.code === "not_granted") Caps.sample = null;
          const g = localGrade(ans); record(g.score);
          out.innerHTML = `<div class="feedback ${g.score >= 7 ? "ok" : "no"}"><b class="num">${g.score}/10</b> · Chấm tự động (AI chưa sẵn sàng)</div>${g.html}<div style="margin-top:10px">${showRef()}</div><div class="diff small" style="margin-top:8px">So với câu mẫu: ${wordDiff(ref, ans).html}</div>`;
        }
        btn.disabled = false; btn.innerHTML = `${icon("spark")} Chấm lại`;
      } else {
        const g = localGrade(ans); record(g.score);
        out.innerHTML = `<div class="feedback ${g.score >= 7 ? "ok" : "no"}"><b class="num">${g.score}/10</b> · ${g.score >= 8 ? "Rất tốt!" : g.score >= 5 ? "Khá – so sánh với câu mẫu để hoàn thiện." : "Cần xem lại cấu trúc câu."}</div>${g.html}<div style="margin-top:10px">${showRef()}</div><div class="diff small" style="margin-top:8px">Từ trong câu mẫu bạn đã dùng (xanh) / còn thiếu (đỏ): ${wordDiff(ref, ans).html}</div>`;
      }
    };
  };
  draw();
};

/* ---------- Shadowing ---------- */
App.views.shadowing = function (el, arg) {
  let lv = typeof arg === "number" ? arg : 1, idx = 0, rate = 1, hide = false, showVi = false, transcript = "", listening = false;
  const list = () => SHADOW.filter(x => x.lv === lv);
  let d = Caps.dictation;
  if (d && !Caps._wired) {
    Caps._wired = true;
    d.onPartial(x => Caps.onPartial && Caps.onPartial(x));
    d.onFinal(x => Caps.onFinal && Caps.onFinal(x));
    d.onState(x => Caps.onDictState && Caps.onDictState(x));
  }
  App.cleanup = () => { Caps.onPartial = Caps.onFinal = Caps.onDictState = null; if (listening && d) d.stop().catch(() => { }); };
  const evaluate = got => {
    const it = list()[idx];
    const r = wordDiff(it.en, got);
    const sc = Math.round(r.score * 100);
    S.shadow[it.id] = Math.max(S.shadow[it.id] || 0, sc);
    S.shadowCount[lv] = (S.shadowCount[lv] || 0) + 1;
    addXP(2 + Math.round(sc / 25));
    markPlan("sh"); bump("shadow");
    $("#sh-out").innerHTML = `<div class="feedback ${sc >= 80 ? "ok" : "no"}"><b class="num">${sc}%</b> từ khớp · ${sc >= 90 ? "Xuất sắc!" : sc >= 70 ? "Tốt – luyện thêm các từ màu đỏ." : "Nghe chậm (0.75x) rồi nhắc lại từng cụm."}</div>
      <div class="diff" style="margin-top:10px;line-height:2">${r.html}</div>
      <p class="muted small" style="margin-top:6px">Bạn đã nói: “${esc(got)}”</p>`;
    $$(".sh-item", el).forEach((b, i) => { if (i === idx) b.querySelector(".chip") && (b.querySelector(".chip").textContent = S.shadow[it.id] + "%"); });
  };
  const draw = () => {
    const items = list(), it = items[idx];
    transcript = "";
    el.innerHTML = `
    <div class="grid">
      <section class="glass page-h">
        <div><h1>Shadowing</h1><p>Nghe câu mẫu, nhắc lại ngay theo đúng nhịp và ngữ điệu. ${d ? "Bấm micro để ghi âm – hệ thống nhận diện lời nói và tô màu từ đúng/sai." : "Trình duyệt này chưa hỗ trợ ghi âm trong trang – hãy nói thành tiếng rồi gõ lại câu bạn nghe để kiểm tra."}</p></div>
        <div class="tabs">${[1, 2, 3].map(l => `<button class="${lv === l ? "on" : ""}" data-lv="${l}">${["", "Cấp 1 · Câu ngắn", "Cấp 2 · Câu dài", "Cấp 3 · Đoạn Part 4"][l]}</button>`).join("")}</div>
      </section>
      <div class="grid g3">
        <section class="glass card span2">
          <div class="card-h"><span class="chip accent num">Câu ${idx + 1}/${items.length}</span>
            <div class="row"><button class="btn sm ${hide ? "primary" : ""}" id="hide">${icon("eye")} ${hide ? "Hiện chữ" : "Ẩn chữ"}</button><button class="btn sm ${showVi ? "primary" : ""}" id="vi">Nghĩa</button></div></div>
          <p class="src ${hide ? "hidden-text" : ""}" id="sh-text">${esc(it.en)}</p>
          <p class="muted" style="margin-top:8px" ${showVi ? "" : "hidden"}>${esc(it.vi)}</p>
          <div class="audio-box" style="margin-top:18px">
            <button class="play" id="play" aria-label="Phát câu mẫu">${iconFill("play")}</button>
            <div style="flex:1"><b>Nghe câu mẫu</b><div class="muted small">Tốc độ</div></div>
            <div class="tabs speed">${[0.75, 1, 1.25].map(r => `<button class="${rate === r ? "on" : ""}" data-rate="${r}">${r}x</button>`).join("")}</div>
            <button class="btn sm" id="loop">${icon("refresh")} Lặp 3 lần</button>
          </div>
          <div style="margin-top:18px">
            ${d ? `<div class="row"><button class="mic" id="mic" aria-label="Ghi âm">${icon("mic")}</button><div style="flex:1"><b id="mic-label">Bấm để nói theo</b><div class="muted small" id="live">Nói xong bấm lại để chấm.</div></div></div>`
              : `<label class="field" for="sh-type">Gõ lại câu bạn vừa nói/nghe<textarea class="input" id="sh-type" style="min-height:70px"></textarea></label><div class="row" style="margin-top:10px"><button class="btn primary" id="sh-check">${icon("check")} Kiểm tra</button></div>`}
          </div>
          <div id="sh-out" style="margin-top:16px"></div>
          <div class="row" style="margin-top:16px"><button class="btn" id="prev" ${idx ? "" : "disabled"}>${icon("left")} Câu trước</button><span class="spacer"></span><button class="btn primary" id="next">${idx < items.length - 1 ? "Câu tiếp" : "Về câu đầu"} ${icon("right")}</button></div>
        </section>
        <section class="glass card">
          <h3 style="margin-bottom:10px">Danh sách câu</h3>
          <div class="stack" style="gap:6px">${items.map((x, i) => `<button class="task sh-item ${i === idx ? "done" : ""}" data-i="${i}" style="${i === idx ? "background:var(--accent-soft)" : ""}"><span class="small" style="flex:1;text-decoration:none;color:var(--ink)">${esc(x.en.length > 56 ? x.en.slice(0, 54) + "…" : x.en)}</span><span class="chip ${S.shadow[x.id] >= 80 ? "good" : ""} num">${S.shadow[x.id] != null ? S.shadow[x.id] + "%" : "–"}</span></button>`).join("")}</div>
          <h3 style="margin:18px 0 8px">5 bước shadowing</h3>
          <ol class="small" style="margin:0;padding-left:18px;color:var(--muted)">
            <li>Nghe 2–3 lần, hiểu nghĩa (bấm Nghĩa).</li><li>Nghe 0.75x, nhìn chữ, nhắc theo từng cụm.</li><li>Nhắc đồng thời với tốc độ 1x.</li><li>Ẩn chữ, chỉ nghe và nhắc.</li><li>Ghi âm, so sánh, sửa từ màu đỏ.</li>
          </ol>
        </section>
      </div>
    </div>`;
    $$("[data-lv]", el).forEach(b => b.onclick = () => { lv = +b.dataset.lv; idx = 0; draw(); });
    $$("[data-rate]", el).forEach(b => b.onclick = () => { rate = +b.dataset.rate; $$("[data-rate]", el).forEach(x => x.classList.toggle("on", x === b)); Speech.say(it.en, rate); });
    $$(".sh-item", el).forEach(b => b.onclick = () => { idx = +b.dataset.i; draw(); });
    $("#hide").onclick = () => { hide = !hide; draw(); };
    $("#vi").onclick = () => { showVi = !showVi; draw(); };
    $("#play").onclick = () => Speech.say(it.en, rate);
    $("#loop").onclick = async () => { for (let k = 0; k < 3; k++) { const ok = await Speech.say(it.en, rate); if (ok === false || App.view !== "shadowing") break; await new Promise(r => setTimeout(r, 1800)); } };
    $("#prev").onclick = () => { idx--; draw(); };
    $("#next").onclick = () => { idx = (idx + 1) % items.length; draw(); };
    if (d) {
      const mic = $("#mic");
      Caps.onPartial = ({ text }) => { $("#live").textContent = (transcript + " " + text).trim(); };
      Caps.onFinal = ({ text }) => { transcript = (transcript + " " + text).trim(); $("#live").textContent = transcript; };
      Caps.onDictState = ({ state, reason }) => {
        listening = state === "listening";
        mic.classList.toggle("on", listening);
        $("#mic-label").textContent = listening ? "Đang nghe… bấm để dừng" : "Bấm để nói theo";
        if (!listening && transcript) evaluate(transcript);
        else if (!listening && reason && reason !== "stopped" && reason !== "viewer_stopped") $("#live").textContent = "Không nghe thấy gì – thử lại gần micro hơn.";
      };
      mic.onclick = () => {
        if (listening) { d.stop().catch(() => { }); return; }
        transcript = ""; $("#sh-out").innerHTML = ""; Speech.stop();
        d.start().catch(e => {
          if (e && e.code === "not_granted") { Caps.dictation = null; d = null; toast("Micro bị tắt – chuyển sang chế độ gõ lại."); draw(); }
          else $("#live").textContent = "Chưa bật được micro, thử lại nhé.";
        });
      };
    } else {
      $("#sh-check").onclick = () => { const v = $("#sh-type").value.trim(); if (v) evaluate(v); else toast("Hãy gõ lại câu trước khi kiểm tra."); };
    }
  };
  draw();
};
