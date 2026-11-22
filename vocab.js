/* ===== Từ vựng: danh sách bộ từ, học 10 từ, ôn tập lặp lại ngắt quãng ===== */
document.addEventListener("click", e => {
  const b = e.target.closest("[data-say]");
  if (b) { e.preventDefault(); Speech.say(b.dataset.say, b.dataset.rate ? +b.dataset.rate : undefined); }
});
const vHome = () => ["hsk", "hvocab", "hday", "hlesson"].includes(App.view) ? App.view : isHsk() ? "hvocab" : "vocab";
/* bộ từ tiếp theo đúng chương trình đang học (HSK hoặc TOEIC) */
const vNextSet = () => isHsk() ? ((typeof hskNext === "function" && hskNext()) || {}).id || null : nextVocabSet();
/* nút "quay lại" trong phiên học: về đúng bài/ngày đang mở, không về trang đầu */
const vBack = id => App.view === "hday" && id ? App.go("hday", { day: id }) : App.view === "hlesson" && id ? App.go("hlesson", { set: id }) : App.go(vHome());
const vBackLabel = () => App.view === "hday" ? "Bài hôm nay" : App.view === "hlesson" ? "Bài học" : App.view === "hsk" ? "Lộ trình HSK" : App.view === "hvocab" ? "Bài học HSK" : "Từ vựng";
const sayBtn = (text, cls = "btn sm ghost icon-btn") => `<button class="${cls}" data-say="${esc(text)}" aria-label="Nghe phát âm">${icon(cls === "fc-btn" ? "head" : "vol")}</button>`;
const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function blankExample(word, ex) {
  let re = new RegExp("(^|[^\\p{L}])(" + escRe(word) + "[\\p{L}]*)", "iu");
  if (!re.test(ex)) {
    const stem = word.toLowerCase().replace(/(e|y|s)$/, "");
    if (stem.length >= 4 && !stem.includes(" ")) re = new RegExp("(^|[^\\p{L}])(" + escRe(stem) + "[\\p{L}]*)", "iu");
  }
  return re.test(ex) ? ex.replace(re, "$1_____") : null;
}
const POS_VI = { "n.": "danh từ", "v.": "động từ", "adj.": "tính từ", "adv.": "trạng từ", "phr.": "cụm từ", "prep.": "giới từ", "conj.": "liên từ", "n./v.": "danh từ / động từ", "v./n.": "động từ / danh từ" };
function blankInfo(word, ex) {
  for (const stem of [word, word.toLowerCase().replace(/(e|y|s)$/, "")]) {
    if (stem.length < 3) continue;
    const m = (ex || "").match(new RegExp("(^|[^\\p{L}])(" + escRe(stem) + "[\\p{L}]*)", "iu"));
    if (m) return { text: ex.replace(m[2], "_____"), form: m[2] };
  }
  return null;
}
function meaningOptions(k) {
  const { set, w } = WORDS[k];
  const correct = w[3];
  const pool = shuffle(set.words.filter(x => x[3] !== correct).map(x => x[3]));
  const global = shuffle(Object.values(WORDS).map(x => x.w[3]).filter(m => m !== correct && !pool.includes(m)));
  const opts = [correct, ...pool.slice(0, 2), ...global.slice(0, 1)];
  return { opts: shuffle(opts), correct };
}

App.views.vocab = function (el, arg) {
  if (arg && arg.learn) return learnSession(el, arg.learn);
  if (arg && arg.review) return reviewSession(el, arg.free);
  let tab = (arg && arg.tab) || "topic";
  const draw = () => {
    const due = dueKeys().length;
    const boxes = [1, 2, 3, 4, 5, 6].map(b => Object.values(S.srs).filter(x => x.b === b).length);
    const maxB = Math.max(1, ...boxes);
    const sets = VOCAB.filter(s => s.group === tab);
    el.innerHTML = `
    <div class="grid">
      <section class="glass page-h">
        <div><h1>Từ vựng TOEIC</h1><p>Mỗi lần học 10 từ: flashcard → trắc nghiệm → gõ từ → nghe → đánh câu. Từ đã học vào hộp ôn tập; mỗi ngày điểm danh để ôn lại đúng lúc sắp quên (1 → 2 → 4 → 7 → 15 → 30 ngày).</p></div>
      </section>
      <div class="grid g3">
        <section class="glass card">
          <div class="card-h"><h2>Ôn tập hôm nay</h2></div>
          <div class="row"><div class="stat" style="padding:0"><div class="v num" style="color:var(--warm)">${due}</div><div class="l">từ đến hạn</div></div><span class="spacer"></span>
          <button class="btn ${due ? "primary" : ""}" id="rev">${due ? "Ôn ngay" : "Ôn tự do"}</button></div>
          <p class="muted small" style="margin-top:10px">${S.streak.last === today() ? "Đã điểm danh hôm nay." : "Điểm danh ở Trang chủ để giữ chuỗi ngày học."}</p>
        </section>
        <section class="glass card span2">
          <div class="card-h"><h2>Hộp ghi nhớ</h2><span class="sub num">${learnedCount()} từ đã học · ${masteredCount()} từ đã thuộc</span></div>
          <div class="boxes">${boxes.map((n, i) => `<div><span class="num">${n}</span><i style="height:${Math.round(n / maxB * 46) + 3}px;opacity:${0.35 + i * 0.13}"></i><span>Hộp ${i + 1}</span></div>`).join("")}</div>
        </section>
      </div>
      <section class="glass card">
        <div class="card-h"><div class="tabs"><button class="${tab === "topic" ? "on" : ""}" data-tab="topic">Theo chủ đề</button><button class="${tab === "part" ? "on" : ""}" data-tab="part">Theo Part</button><button class="${tab === "context" ? "on" : ""}" data-tab="context">Theo ngữ cảnh</button><button class="${tab === "mine" ? "on" : ""}" data-tab="mine">Của tôi</button></div><div class="row"><span class="sub num">${sets.length} bộ · ${sets.reduce((n, x) => n + x.words.length, 0)} từ</span><button class="btn sm" id="imp">+ Nhập từ của tôi</button></div></div>
        ${sets.length ? "" : `<div class="empty">Chưa có bộ từ nào do bạn nhập. Bấm “Nhập từ của tôi” để dán danh sách từ của riêng bạn.</div>`}
        <div class="grid g3" style="gap:12px">${sets.map(s => {
          const keys = s.words.map(w => s.id + "|" + w[0]);
          const learned = !!(S.sets[s.id] && S.sets[s.id].learned);
          const mast = keys.filter(k => S.srs[k] && S.srs[k].b >= 4).length;
          return `<div class="set-card">
            <div class="row"><div style="flex:1;min-width:0"><h3>${esc(s.name)}</h3><div class="en">${esc(s.en)}</div></div>${chipBand(s.band)}</div>
            ${bar(learned ? 40 + mast * 6 : 0)}
            <div class="row small muted"><span>${learned ? `Đã học · ${mast}/${keys.length} đã thuộc` : "Chưa học"}</span></div>
            <div class="row"><button class="btn sm primary" data-learn="${s.id}">${learned ? "Học lại" : "Học " + keys.length + " từ"}</button><button class="btn sm" data-list="${s.id}">${icon("list")} Xem từ</button></div>
          </div>`;
        }).join("")}</div>
      </section>
    </div>`;
    $("#rev").onclick = () => App.go(vHome(), { review: true, free: !due });
    $("#imp").onclick = () => openImport(() => { tab = "mine"; draw(); });
    $$("[data-tab]", el).forEach(b => b.onclick = () => { tab = b.dataset.tab; draw(); });
    $$("[data-learn]", el).forEach(b => b.onclick = () => App.go(vHome(), { learn: b.dataset.learn }));
    $$("[data-list]", el).forEach(b => b.onclick = () => wordListModal(b.dataset.list));
  };
  draw();
};

function wordListModal(id) {
  const s = VOCAB_BY_ID[id];
  modal(`<div class="row"><h2 style="flex:1">${esc(s.name)}</h2><button class="btn sm ghost icon-btn" data-close aria-label="Đóng">${icon("x")}</button></div>
    <div style="margin-top:10px">${s.words.map(w => `<div class="word-row"><div><b>${esc(w[0])}</b> <span class="muted small">${esc(w[2])}</span><div class="muted tiny">${esc(w[1])}</div></div><div class="small">${esc(w[3])}<div class="muted tiny">${esc(w[4])}</div></div>${sayBtn(w[0])}</div>`).join("")}</div>
    <div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn primary" id="wl-learn">Học bộ này</button></div>`,
    (m, close) => { $("#wl-learn", m).onclick = () => { close(); App.go(vHome(), { learn: id }); }; });
}

/* ---- Khung câu hỏi dùng chung ---- */
function drillQuestion(box, k, mode, done) {
  if (mode === "sentence" && !WORDS[k].w[4]) mode = "type";
  const fillInfo = mode === "fill" ? blankInfo(WORDS[k].w[0], WORDS[k].w[4]) : null;
  if (mode === "fill" && !fillInfo) mode = "type";
  const { w } = WORDS[k];
  let answered = false;
  const finish = (ok, chosenHTML) => {
    answered = true;
    const fb = document.createElement("div");
    fb.className = "feedback " + (ok ? "ok" : "no");
    fb.innerHTML = `<b>${ok ? "Chính xác!" : "Chưa đúng."}</b> <span class="fx"><b>${esc(w[0])}</b> ${esc(w[1])} (${esc(w[2])}) – ${esc(w[3])}<br><span class="muted">${esc(w[4])}</span></span>`;
    $(".drill-fb", box).appendChild(fb);
    const nx = $(".drill-next", box);
    nx.hidden = false; nx.focus();
    nx.onclick = () => done(ok);
  };
  if (mode === "sentence") {
    box.innerHTML = `
      <div class="stack" style="align-items:center;text-align:center;gap:8px;margin-bottom:14px">
        <div class="muted small">Nghe và gõ lại cả câu có chứa</div>
        <div class="q-big">${esc(w[0])}</div><div class="muted small">${esc(w[3])}</div>
        <div class="row" style="justify-content:center"><button class="btn primary" data-say="${esc(w[4])}">${icon("head")} Nghe câu</button><button class="btn" data-say="${esc(w[4])}" data-rate="0.75">Nghe chậm</button><button class="btn ghost sm" id="peek">${icon("eye")} Xem câu</button></div>
        <div class="muted" id="peektext" hidden>${esc(w[4])}</div>
      </div>
      <textarea class="input" id="sentin" spellcheck="false" autocapitalize="off" placeholder="Gõ cả câu tiếng Anh…" style="min-height:70px"></textarea>
      <div class="row" style="justify-content:flex-end;margin-top:10px"><button class="btn primary" id="sentok">Kiểm tra</button></div>
      <div class="drill-fb" style="margin-top:14px"></div>
      <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn primary drill-next" hidden>Tiếp ${icon("right")}</button></div>`;
    const inp = $("#sentin", box);
    setTimeout(() => { inp.focus(); Speech.say(w[4]); }, 150);
    $("#peek", box).onclick = () => { $("#peektext", box).hidden = false; };
    const check = () => {
      if (answered || !inp.value.trim()) return;
      const r = wordDiff(w[4], inp.value), ok = r.score >= 0.85;
      inp.disabled = true; $("#sentok", box).disabled = true;
      $(".drill-fb", box).innerHTML = `<div class="diff" style="margin-bottom:8px;line-height:1.9">${r.html}</div>`;
      finish(ok);
    };
    $("#sentok", box).onclick = check;
    App.keyHandler = e => { if (e.key !== "Enter" || e.shiftKey) return; e.preventDefault(); if (!answered) check(); else $(".drill-next", box).click(); };
    return;
  }
  if (mode === "mc" || mode === "listen") {
    const { opts, correct } = meaningOptions(k);
    box.innerHTML = `
      <div class="stack" style="align-items:center;gap:6px;margin-bottom:18px">
        ${mode === "mc" ? `<div class="q-big">${esc(w[0])}</div><div class="row muted small">${esc([w[1], w[2]].filter(Boolean).join(" · "))} ${sayBtn(w[0])}</div>`
          : `<button class="btn primary lg" data-say="${esc(w[0])}">${icon("head")} Nghe lại</button><div class="muted small" style="margin-top:6px">Nghe từ và chọn nghĩa đúng</div>`}
      </div>
      <div class="opts two">${opts.map((o, i) => optHTML(o, i)).join("")}</div>
      <div class="drill-fb" style="margin-top:14px"></div>
      <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn primary drill-next" hidden>Tiếp ${icon("right")}</button></div>`;
    if (mode === "listen") setTimeout(() => Speech.say(w[0]), 150);
    const choose = i => {
      if (answered) return;
      const ok = opts[i] === correct;
      $$(".opt", box).forEach((b, j) => { b.disabled = true; if (opts[j] === correct) b.classList.add("right"); else if (j === i) b.classList.add("wrong"); });
      if (mode === "listen" || !ok) Speech.say(w[0]);
      finish(ok);
    };
    $$(".opt", box).forEach(b => b.onclick = () => choose(+b.dataset.i));
    App.keyHandler = e => {
      if (e.target.matches("input,textarea")) return;
      if (!answered && /^[1-4]$/.test(e.key)) choose(+e.key - 1);
      else if (answered && e.key === "Enter") { e.preventDefault(); $(".drill-next", box).click(); }
    };
  } else if (mode === "fill") {
    // Điền vào câu: chọn từ đúng trong ô gợi ý (không gõ). Chưa có câu ví dụ thì chọn từ theo nghĩa.
    const others = shuffle(WORDS[k].set.words.filter(x => x[0] !== w[0])).slice(0, 3).map(x => x[0]);
    const right = fillInfo ? fillInfo.form : w[0], opts = shuffle([right, ...others]);
    box.innerHTML = `
      <div class="stack" style="align-items:center;text-align:center;gap:6px;margin-bottom:16px">
        ${fillInfo ? `<div class="muted small">Chọn từ thích hợp điền vào chỗ trống</div><div class="q-big fillq" style="font-size:20px;max-width:36ch">${esc(fillInfo.text).replace("_____", '<span class="fillgap" id="gap">_____</span>')}</div><div class="muted small">Gợi ý nghĩa: ${esc(w[3])}</div>`
          : `<div class="muted small">Chọn từ có nghĩa</div><div class="q-big">${esc(w[3])}</div><div class="muted small">${esc(POS_VI[w[2]] || w[2] || "")}</div>`}
      </div>
      <div class="wbank">${opts.map((o, i) => `<button class="wchip" data-i="${i}">${esc(o)}</button>`).join("")}</div>
      <div class="drill-fb" style="margin-top:14px"></div>
      <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn primary drill-next" hidden>Tiếp ${icon("right")}</button></div>`;
    const choose = i => {
      if (answered) return;
      const ok = opts[i] === right;
      $$(".wchip", box).forEach((b, j) => { b.disabled = true; if (opts[j] === right) b.classList.add("right"); else if (j === i) b.classList.add("wrong"); });
      if ($("#gap", box)) { $("#gap", box).textContent = right; $("#gap", box).classList.add(ok ? "ok" : "no"); }
      Speech.say(fillInfo && w[4] ? w[4] : w[0]);
      finish(ok);
    };
    $$(".wchip", box).forEach(b => b.onclick = () => choose(+b.dataset.i));
    App.keyHandler = e => { if (!answered && /^[1-4]$/.test(e.key)) choose(+e.key - 1); else if (answered && e.key === "Enter") { e.preventDefault(); $(".drill-next", box).click(); } };
  } else if (mode === "type" && (drillQuestion.n = (drillQuestion.n || 0) + 1) % 3 === 1 && [...w[0].replace(/\s/g, "")].length >= 2 && [...w[0].replace(/\s/g, "")].length <= 12) {
    // Ghép chữ – kiểu xếp ô: chữ cái (tiếng Anh) hoặc chữ Hán (thêm vài chữ nhiễu)
    const zh = isZh(w[0]), target = [...w[0].replace(/\s/g, "")];
    let tiles = target.slice();
    if (zh) { const extra = shuffle([...new Set(WORDS[k].set.words.flatMap(x => [...x[0]]).filter(c => isZh(c) && !target.includes(c)))]).slice(0, Math.max(2, 5 - target.length)); tiles = tiles.concat(extra); }
    tiles = shuffle(tiles.map((c, i) => ({ c, i })));
    const got = [];
    box.innerHTML = `
      <div class="stack" style="align-items:center;text-align:center;gap:6px;margin-bottom:14px">
        <div class="muted small">${zh ? "Chọn các chữ Hán theo đúng thứ tự để ghép thành từ có nghĩa" : "Sắp xếp các chữ cái thành từ có nghĩa"}</div>
        <div class="q-big">${esc(w[3])}</div><div class="muted small">${esc(POS_VI[w[2]] || w[2] || "")}${zh ? "" : ` · ${target.length} chữ cái`}</div>
      </div>
      <div class="spell-ans" id="sp-a"></div><div class="spell-pool" id="sp-p"></div>
      <div class="row" style="justify-content:center;margin-top:10px;gap:8px"><button class="btn sm" id="sp-back">${icon("left")} Xóa</button><button class="btn sm" id="sp-clr">${icon("refresh")} Làm lại</button><button class="btn primary" id="sp-ok">Kiểm tra</button></div>
      <div class="drill-fb" style="margin-top:14px"></div>
      <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn primary drill-next" hidden>Tiếp ${icon("right")}</button></div>`;
    const draw = () => {
      $("#sp-a", box).innerHTML = (zh ? got.map(t => `<span class="sp-t on">${esc(t.c)}</span>`) : target.map((_, i) => `<span class="sp-t slot ${got[i] ? "on" : ""}">${got[i] ? esc(got[i].c) : ""}</span>`)).join("") || `<span class="muted small">Chạm các ô bên dưới</span>`;
      $("#sp-p", box).innerHTML = tiles.map((t, j) => `<button class="sp-t" data-j="${j}" ${got.includes(t) ? "disabled" : ""}>${esc(t.c)}</button>`).join("");
      $$("[data-j]", box).forEach(b => b.onclick = () => { if (answered) return; got.push(tiles[+b.dataset.j]); draw(); if (!zh && got.length === target.length) check(); });
    };
    const check = () => {
      if (answered || !got.length) return;
      const ok = got.map(t => t.c).join("").toLowerCase() === target.join("").toLowerCase();
      $$("#sp-p button", box).forEach(b => b.disabled = true);
      Speech.say(w[0]); finish(ok);
    };
    $("#sp-back", box).onclick = () => { if (!answered) { got.pop(); draw(); } };
    $("#sp-clr", box).onclick = () => { if (!answered) { got.length = 0; draw(); } };
    $("#sp-ok", box).onclick = check;
    App.keyHandler = e => {
      if (answered) { if (e.key === "Enter") { e.preventDefault(); $(".drill-next", box).click(); } return; }
      if (e.key === "Backspace") { got.pop(); draw(); return; }
      if (e.key === "Enter") { e.preventDefault(); check(); return; }
      const t = tiles.find(t => !got.includes(t) && t.c.toLowerCase() === e.key.toLowerCase()); if (t) { got.push(t); draw(); if (!zh && got.length === target.length) check(); }
    };
    draw();
  } else {
    const ex = blankExample(w[0], w[4]);
    // Ghép chữ – kiểu gõ: lần lượt "gõ theo nghĩa" và "điền chữ cái còn thiếu"
    const holes = !isZh(w[0]) && w[0].length >= 4 && drillQuestion.n % 3 === 2 ? [...w[0]].map((c, i) => /[a-z]/i.test(c) && i % 2 === 1 ? "_" : c).join(" ") : "";
    box.innerHTML = `
      <div class="stack" style="align-items:center;text-align:center;gap:6px;margin-bottom:16px">
        ${fillInfo ? `<div class="muted small">Điền từ còn thiếu vào câu</div><div class="q-big" style="font-size:19px;max-width:34ch">${esc(fillInfo.text)}</div><div class="muted small">Nghĩa của từ cần điền: ${esc(w[3])}</div>`
          : holes ? `<div class="muted small">Điền các chữ cái còn thiếu rồi gõ lại cả từ</div><div class="q-big spell-holes">${esc(holes)}</div><div class="muted small">${esc(w[3])} · ${esc(POS_VI[w[2]] || w[2])}</div>`
          : `<div class="muted small">${isZh(w[0]) ? "Viết từ tiếng Trung có nghĩa" : "Gõ từ tiếng Anh có nghĩa"}</div><div class="q-big">${esc(w[3])}</div><div class="muted small">${esc(POS_VI[w[2]] || w[2])}${ex ? ` · <i>${esc(ex)}</i>` : ""}</div>`}
      </div>
      <div class="row" style="max-width:460px;margin:0 auto">
        <input class="input" id="typein" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${isZh(w[0]) ? "Gõ chữ Hán hoặc pinyin không dấu…" : "Gõ từ tại đây…"}" style="flex:1">
        <button class="btn primary" id="typeok">Kiểm tra</button>
      </div>
      <div class="row" style="justify-content:center;margin-top:8px"><button class="btn sm ghost" id="hint">Gợi ý</button><span class="muted small" id="hinttext"></span></div>
      <div class="drill-fb" style="margin-top:14px"></div>
      <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn primary drill-next" hidden>Tiếp ${icon("right")}</button></div>`;
    const inp = $("#typein", box);
    setTimeout(() => inp.focus(), 50);
    let hints = 0;
    $("#hint", box).onclick = () => { if (isZh(w[0])) { hints++; $("#hinttext", box).textContent = hints === 1 ? "pinyin: " + w[1] : "chữ đầu: " + [...w[0]][0] + "…"; return; } hints = Math.min(w[0].length, hints + 1); $("#hinttext", box).textContent = w[0].slice(0, hints) + "…" + ` (${w[0].length} ký tự)`; };
    const check = () => {
      if (answered || !inp.value.trim()) return;
      const zh = /[\u3400-\u9fff]/.test(w[0]), py = x => norm(x).replace(/[ ']/g, "");
      const ok = zh ? (inp.value.trim() === w[0] || (py(inp.value) && py(inp.value) === py(w[1]))) : norm(inp.value) === norm(w[0]) || (fillInfo && norm(inp.value) === norm(fillInfo.form));
      inp.disabled = true; $("#typeok", box).disabled = true;
      inp.style.borderColor = ok ? "var(--good)" : "var(--bad)";
      Speech.say(w[0]);
      finish(ok);
    };
    $("#typeok", box).onclick = check;
    App.keyHandler = e => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (!answered) check(); else $(".drill-next", box).click();
    };
  }
}

/* ---- Học bộ 10 từ ---- */
function learnSession(el, id) {
  const s = VOCAB_BY_ID[id];
  const allKeys = s.words.map(w => id + "|" + w[0]), size = S.settings.chunk || 10;
  let part = 0, keys = allKeys.slice(0, size);
  const STAGES = [["flash", "Flashcard"], ["mc", "Trắc nghiệm"], ["fill", "Điền vào câu"], ["type", "Ghép chữ"], ["listen", "Nghe"], ["sentence", "Đánh câu"]];
  const mistakes = Object.fromEntries(allKeys.map(k => [k, 0]));
  let stage = 0, queue = [], idx = 0, flipped = false;
  App.busy = true;

  const shell = inner => {
    el.innerHTML = `<div class="grid"><section class="glass card session">
      <button class="back" id="back">${icon("left")} ${vBackLabel()}</button>
      <div class="card-h"><div><h2>${esc(s.name)}</h2><div class="sub">${esc(s.en)} · Band ${s.band}${allKeys.length > size ? ` · lượt ${Math.min(part + 1, Math.ceil(allKeys.length / size))}/${Math.ceil(allKeys.length / size)}` : ""}</div></div>
      <div class="stepper">${STAGES.map(([, n], i) => `<span class="${i === stage ? "on" : i < stage ? "ok" : ""}">${i < stage ? "✓ " : ""}${n}</span>`).join("")}</div></div>
      <div id="sbody">${inner}</div></section></div>`;
    $("#back").onclick = () => vBack(id);
  };

  const startStage = () => {
    if (stage >= STAGES.length) {
      part++;
      if (part * size >= allKeys.length) return finishAll();
      keys = allKeys.slice(part * size, part * size + size); stage = 0;
      toast(`Xong lượt ${part}. Học tiếp ${keys.length} từ tiếp theo.`);
    }
    queue = shuffle(keys); idx = 0;
    if (STAGES[stage][0] === "flash") { queue = keys.slice(); return drawFlash(); }
    if (STAGES[stage][0] === "sentence") { queue = pick(keys.filter(k => WORDS[k].w[4]), 5); if (!queue.length) { stage++; return startStage(); } }
    nextQ();
  };
  const drawFlash = () => {
    const k = queue[idx], w = WORDS[k].w, zh = typeof isZh === "function" && isZh(w[0]);
    flipped = false;
    shell(`
      <div class="row muted small" style="justify-content:center;margin-bottom:16px"><span class="num">Thẻ ${idx + 1} / ${queue.length}</span><span class="kbd-hint"> · phím <span class="kbd">Space</span> lật thẻ, <span class="kbd">→</span> thẻ sau</span></div>
      <div class="flash-wrap"><div class="flash ${zh ? "zh" : ""}" id="card" tabindex="0" role="button" aria-label="Lật thẻ">
        <div class="face fx">
          <div class="fc-top"><div class="fc-chips">${w[2] ? `<span class="pos">${esc(POS_VI[w[2]] || w[2])}</span>` : ""}${w[1] ? `<span class="ipa2">${esc(w[1])}</span>` : ""}</div><div class="fc-btns">${sayBtn(w[0], "fc-btn")}</div></div>
          <div class="fc-word"><mark>${esc(w[0])}</mark></div><div class="fc-hint">${icon("refresh")} Chạm thẻ để lật xem nghĩa</div>
        </div>
        <div class="face back-f fx">
          <div class="fc-top"><div class="fc-chips"><span class="pos">nghĩa</span><span class="ipa2">${esc(w[0])}</span></div>${w[4] ? sayBtn(w[4], "fc-btn") : ""}</div>
          <div class="fc-mean">${esc(w[3].charAt(0).toUpperCase() + w[3].slice(1))}.</div>
          ${zh ? `<div class="fc-zh"><div class="fc-zh-l"><b>${esc(w[0])}</b><span>${esc(w[1])}</span><span>${esc(POS_VI[w[2]] || w[2] || "")}</span></div><div class="hz-row" id="fc-hz"></div><button class="btn sm" id="fc-write" type="button">${icon("pen")} Tập viết</button></div>` : ""}
          ${w[4] ? `<div class="fc-ex"><div><small>CÂU VÍ DỤ</small><p>${(b => b ? esc(w[4]).replace(esc(b.form), "<em>" + esc(b.form) + "</em>") : esc(w[4]))(blankInfo(w[0], w[4]))}</p></div></div>` : ""}
        </div>
      </div></div>
      <div class="row" style="justify-content:center;margin-top:22px">
        <button class="btn" id="prev" ${idx ? "" : "disabled"}>${icon("left")} Trước</button>
        <button class="btn" id="flip">${icon("refresh")} Lật thẻ</button>
        <button class="btn primary" id="next">${idx === queue.length - 1 ? "Bắt đầu kiểm tra" : "Tiếp"} ${icon("right")}</button>
      </div>`);
    const flip = () => { flipped = !flipped; const c = $("#card"); c.classList.add("ready"); c.classList.toggle("flip", flipped); if (zh && flipped) { const b = $("#fc-hz"); b._run ? b._run() : Hz.mount(b, w[0], { size: [...w[0]].length > 3 ? 58 : 76 }); } };
    $("#card").onclick = e => { if (!e.target.closest("[data-say], .fc-zh")) flip(); };
    if (zh) $("#fc-write").onclick = e => { e.stopPropagation(); const items = [...w[0]].filter(isZh).map(c => [c, "", "", "chữ trong từ " + w[0] + " (" + w[1] + ") · " + w[3]]); items.length > 1 ? Hz.practice(items[0], items, 0) : Hz.practice(w); };
    $("#flip").onclick = flip;
    $("#prev").onclick = () => { if (idx) { idx--; drawFlash(); } };
    const next = () => { if (idx < queue.length - 1) { idx++; drawFlash(); } else { stage++; startStage(); } };
    $("#next").onclick = next;
    setTimeout(() => Speech.say(w[0]), 120);
    App.keyHandler = e => {
      if (e.key === " ") { e.preventDefault(); flip(); }
      else if (e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft" && idx) { idx--; drawFlash(); }
    };
  };
  const nextQ = () => {
    if (idx >= queue.length) { stage++; return startStage(); }
    const k = queue[idx];
    shell(`<div class="row muted small" style="justify-content:space-between;margin-bottom:6px"><span>${STAGES[stage][1]}</span><span class="num">${idx + 1} / ${queue.length}</span></div>${bar(idx / queue.length * 100)}<div id="qbox" style="margin-top:18px"></div>`);
    drillQuestion($("#qbox"), k, STAGES[stage][0], ok => {
      if (!ok) { mistakes[k]++; queue.push(k); }
      else addXP(1);
      idx++; nextQ();
    });
  };
  const finishAll = () => {
    const first = !(S.sets[id] && S.sets[id].learned);
    learnSet(id);
    addXP(20);
    if (first) bump("newSets"); else save();
    App.busy = false;
    App.keyHandler = null;
    const nxt = (typeof nextInTopic === "function" && nextInTopic(id)) || vNextSet();
    shell(`
      <div class="stack" style="align-items:center;text-align:center;padding:10px 0 18px">
        <div class="flame">${icon("check")}</div>
        <h2>Hoàn thành ${esc(s.name)}!</h2>
        <p class="muted">${allKeys.length} từ đã vào hộp ôn tập. Ngày mai điểm danh để ôn lại lần 1.</p>
      </div>
      <div>${allKeys.map(k => { const w = WORDS[k].w; const m = mistakes[k]; return `<div class="word-row"><div><b>${esc(w[0])}</b> <span class="muted tiny">${esc(w[1])}</span></div><div class="small">${esc(w[3])}</div><span class="chip ${m ? "bad" : "good"}">${m ? m + " lần sai" : "Đúng hết"}</span></div>`; }).join("")}</div>
      <div class="row" style="justify-content:flex-end;margin-top:16px">
        <button class="btn ${App.view === "hday" ? "primary" : ""}" id="tolist">${App.view === "hday" ? "Về bài hôm nay → bước tiếp" : App.view === "hlesson" ? "Về bài học" : "Về danh sách"}</button>
        ${nxt && nxt !== id && App.view !== "hday" ? `<button class="btn primary" id="tonext">Học bộ tiếp: ${esc(VOCAB_BY_ID[nxt].name)} ${icon("right")}</button>` : ""}
      </div>`);
    $("#tolist").onclick = () => vBack(id);
    if ($("#tonext")) $("#tonext").onclick = () => App.go(vHome(), { learn: nxt });
  };
  startStage();
}

/* ---- Ôn tập ---- */
function reviewSession(el, free) {
  let keys = dueKeys();
  let isFree = false;
  if (!keys.length) {
    keys = Object.keys(S.srs).filter(k => onTrack(k)).sort((a, b) => S.srs[a].b - S.srs[b].b || S.srs[b].w - S.srs[a].w).slice(0, 10);
    isFree = true;
  }
  if (!keys.length) {
    el.innerHTML = `<div class="glass card session"><button class="back" id="back">${icon("left")} ${vBackLabel()}</button><div class="empty"><h2>Chưa có từ để ôn</h2><p style="margin:8px 0 14px">Học một bộ 10 từ trước, ngày mai từ sẽ đến hạn ôn.</p><button class="btn primary" id="go">Học bộ đầu tiên</button></div></div>`;
    $("#back").onclick = () => App.go(vHome());
    $("#go").onclick = () => { const n = vNextSet(); App.go(vHome(), n ? { learn: n } : null); };
    return;
  }
  App.busy = true;
  const queue = shuffle(keys).slice(0, 30).map(k => ({ k, mode: pick(["mc", "mc", "fill", "fill", "type", "listen", "listen", "sentence"], 1)[0], graded: false }));
  const total = queue.length;
  let i = 0, right = 0;
  const firstTry = {};
  const draw = () => {
    if (i >= queue.length) return end();
    const it = queue[i];
    el.innerHTML = `<div class="grid"><section class="glass card session">
      <button class="back" id="back">${icon("left")} ${vBackLabel()}</button>
      <div class="card-h"><div><h2>${isFree ? "Ôn tự do" : "Ôn tập hôm nay"}</h2><div class="sub">${isFree ? "Không có từ đến hạn – ôn 10 từ yếu nhất (không đổi lịch ôn)" : "Trả lời đúng lần đầu → từ lên hộp, giãn lịch ôn"}</div></div><span class="chip accent num">${Math.min(i + 1, queue.length)} / ${queue.length}</span></div>
      ${bar(i / queue.length * 100)}<div id="qbox" style="margin-top:18px"></div></section></div>`;
    $("#back").onclick = () => App.go(vHome());
    drillQuestion($("#qbox"), it.k, it.mode, ok => {
      if (!it.graded) {
        it.graded = true; firstTry[it.k] = ok;
        if (!isFree) gradeWord(it.k, ok);
        if (ok) { right++; addXP(2); }
        else queue.push({ k: it.k, mode: "mc", graded: true });
      }
      i++; save(); draw();
    });
  };
  const end = () => {
    App.busy = false; App.keyHandler = null;
    markPlan("rv"); bump("reviewed", total);
    const wrong = Object.keys(firstTry).filter(k => !firstTry[k]);
    el.innerHTML = `<div class="grid"><section class="glass card session">
      <div class="stack" style="align-items:center;text-align:center;padding:6px 0 16px">
        <div class="score-big num">${right}/${total}</div><p class="muted">từ trả lời đúng ngay lần đầu</p>
        ${isFree ? "" : `<p class="small">${wrong.length ? `${wrong.length} từ quay về hộp 1 – sẽ ôn lại vào ngày mai.` : "Tuyệt vời! Tất cả từ đều lên hộp."}</p>`}
      </div>
      ${wrong.length ? `<h3 style="margin-bottom:6px">Từ cần chú ý</h3><div>${wrong.map(k => { const w = WORDS[k].w; return `<div class="word-row"><div><b>${esc(w[0])}</b> <span class="muted tiny">${esc(w[1])}</span></div><div class="small">${esc(w[3])}</div>${sayBtn(w[0])}</div>`; }).join("")}</div>` : ""}
      <div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn" id="home">Trang chủ</button><button class="btn primary" id="more">Học từ mới ${icon("right")}</button></div>
    </section></div>`;
    $("#home").onclick = () => App.go("home");
    $("#more").onclick = () => { const n = vNextSet(); App.go(vHome(), n ? { learn: n } : null); };
  };
  draw();
}
