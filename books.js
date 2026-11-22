/* ===== Sách của tôi: người dùng tự thêm PDF của mình, đọc trong trang và tự làm bài với phiếu trả lời ===== */
const Books = (() => {
  const LS = "toeicpath.books";
  let db = null; const mem = new Map();
  // Giữ tham chiếu tới file (không chép vào bộ nhớ) và lưu nguyên file vào IndexedDB
  const put = async (key, file) => { mem.set(key, file); try { await tx("readwrite", s => s.put(file, key)); return true; } catch (e) { return false; } };
  const read = async key => { if (mem.has(key)) return mem.get(key); let v = null; try { v = await tx("readonly", s => s.get(key)); } catch (e) { } if (v && v.buf) return new Blob([v.buf], { type: v.type }); return v instanceof Blob ? v : null; };
  const open = () => db ? Promise.resolve(db) : new Promise((res, rej) => { let r; try { r = indexedDB.open("toeicpath-books", 1); } catch (e) { return rej(e); } r.onupgradeneeded = () => r.result.createObjectStore("files"); r.onsuccess = () => res(db = r.result); r.onerror = () => rej(r.error); });
  const tx = (mode, fn) => open().then(d => new Promise((res, rej) => { const t = d.transaction("files", mode), q = fn(t.objectStore("files")); t.oncomplete = () => res(q && q.result); t.onerror = t.onabort = () => rej(t.error); }));
  const list = () => { if (!Array.isArray(S.books)) { let old = []; try { old = JSON.parse(localStorage.getItem(LS) || "[]"); } catch (e) { } S.books = old; } return S.books; };
  const saveList = l => { S.books = l; save(); };
  return {
    list, get: id => list().find(b => b.id === id),
    update(id, patch) { const l = list(), b = l.find(x => x.id === id); if (b) { Object.assign(b, patch); saveList(l); } return b; },
    async add(file, pages) { const id = "b" + Date.now().toString(36); this.kept = await put(id + ":pdf", file); const l = list(); l.unshift({ id, name: file.name.replace(/\.pdf$/i, ""), pages, page: 1, zoom: 1, ans: {}, key: null, secs: 0, notes: {} }); saveList(l); return id; },
    attach: (id, file) => put(id + ":pdf", file),
    file: (id, kind) => read(id + ":" + kind),
    setAudio: (id, f) => put(id + ":audio", f),
    async remove(id) { mem.delete(id + ":pdf"); mem.delete(id + ":audio"); try { await tx("readwrite", s => { s.delete(id + ":pdf"); s.delete(id + ":audio"); }); } catch (e) { } saveList(list().filter(b => b.id !== id)); }
  };
})();
/* Mở PDF theo từng đoạn nhỏ đọc từ file, không nạp cả file vào bộ nhớ (file đề vài chục – vài trăm MB vẫn mở được trên điện thoại) */
async function openPdfBlob(blob) {
  const lib = await loadPdfJs(), CH = 1 << 18, first = new Uint8Array(await blob.slice(0, CH).arrayBuffer());
  const tr = new lib.PDFDataRangeTransport(blob.size, first);
  tr.requestDataRange = (b, e) => { blob.slice(b, e).arrayBuffer().then(buf => tr.onDataRange(b, new Uint8Array(buf))).catch(() => { }); };
  return lib.getDocument({ range: tr, length: blob.size, disableAutoFetch: true, disableStream: true, rangeChunkSize: CH }).promise;
}
ICONS.shelf = '<path d="M5 4h4v16H5zM9 6h4v14H9zM14.5 7.2l3.6-1 3 12.8-3.6 1z"/>';
const BOOK_PARTS = [["Part 1", 1, 6, 4], ["Part 2", 7, 31, 3], ["Part 3", 32, 70, 4], ["Part 4", 71, 100, 4], ["Part 5", 101, 130, 4], ["Part 6", 131, 146, 4], ["Part 7", 147, 200, 4]];

App.views.books = function (el, arg) {
  if (arg && Books.get(arg)) return bookReader(el, arg);
  const draw = () => {
    const l = Books.list();
    el.innerHTML = `<div class="grid">
      <section class="glass page-h"><div><h1>Sách của tôi</h1><p>Thêm file PDF sách hoặc đề của riêng bạn để đọc ngay trong trang, ghi chú và tự làm bài bằng phiếu trả lời có bấm giờ. Trang đang đọc, phiếu trả lời và ghi chú lưu theo tài khoản của bạn; còn file PDF chỉ nằm trên máy này.</p></div>
        <label class="btn primary" style="cursor:pointer">+ Thêm sách PDF<input type="file" id="bk-file" accept="application/pdf,.pdf" hidden></label></section>
      <div id="bk-msg" class="muted small"></div>
      ${l.length ? `<div class="grid g3" style="gap:12px">${l.map(b => { const n = Object.keys(b.ans || {}).length; return `<div class="set-card bk-card"><div class="row" style="align-items:flex-start"><span class="tico">${icon("shelf")}</span><div style="flex:1;min-width:0"><h3>${esc(b.name)}</h3><div class="en num">${b.pages} trang · đang ở trang ${b.page}${n ? ` · đã tô ${n} câu` : ""}${Object.keys(b.notes || {}).length ? ` · ${Object.keys(b.notes).length} ghi chú` : ""}</div></div></div>
        ${bar(pct(b.page, b.pages))}<div class="row"><button class="btn sm primary" data-open="${b.id}" style="flex:1">Mở sách</button><button class="btn sm" data-del="${b.id}">Xoá</button></div></div>`; }).join("")}</div>`
        : `<div class="empty">Chưa có sách nào. Bấm “+ Thêm sách PDF” và chọn file trong máy của bạn.</div>`}
    </div>`;
    $("#bk-file").onchange = async e => {
      const f = e.target.files[0]; if (!f) return; const msg = $("#bk-msg"); msg.textContent = "Đang mở file…";
      try { const doc = await openPdfBlob(f), n = doc.numPages; try { await doc.destroy(); } catch (e2) { } const id = await Books.add(f, n); if (!Books.kept) toast("Máy này không cho lưu file: sách mở được ngay, nhưng lần sau cần chọn lại file. Tiến trình vẫn được giữ."); App.go("books", id); }
      catch (err) { msg.innerHTML = `<span style="color:var(--bad)">Không mở hoặc không lưu được file này (${esc(String(err && err.message || err).slice(0, 80))}). Hãy thử lại hoặc chọn file PDF khác.</span>`; }
    };
    $$("[data-open]", el).forEach(b => b.onclick = () => App.go("books", b.dataset.open));
    $$("[data-del]", el).forEach(b => b.onclick = () => { const bk = Books.get(b.dataset.del);
      modal(`<h2>Xoá sách này?</h2><p class="muted" style="margin:8px 0 16px">“${esc(bk.name)}” và phiếu trả lời của nó sẽ bị xoá khỏi máy này. Không khôi phục được.</p><div class="row"><button class="btn" data-close style="flex:1">Giữ lại</button><button class="btn primary" id="bk-yes" style="flex:1">Xoá</button></div>`,
        (m, close) => { $("#bk-yes", m).onclick = async () => { try { await Books.remove(bk.id); } catch (e) { } close(); draw(); }; }); });
  };
  draw();
};

function bookReader(el, id) {
  let b = Books.get(id), doc = null, task = null, urls = [], tick = null, running = false, part = 0, sheet = false, noteOpen = false;
  const save = p => { b = Books.update(id, p) || b; };
  const fmt = s => `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
  el.innerHTML = `<div class="bk">
    <div class="bk-bar"><button class="btn sm" id="bk-back">${icon("left")} Sách</button><b class="bk-name">${esc(b.name)}</b>
      <span class="bk-tools"><button class="btn sm" id="bk-zo" aria-label="Thu nhỏ">A−</button><button class="btn sm" id="bk-zi" aria-label="Phóng to">A+</button><button class="btn sm" id="bk-full">Toàn màn hình</button></span></div>
    <div class="bk-bar"><button class="btn sm" id="bk-prev" aria-label="Trang trước">◀</button><span class="num bk-pg"><input class="input" id="bk-n" type="number" min="1" max="${b.pages}" value="${b.page}" aria-label="Số trang"> / ${b.pages}</span><button class="btn sm" id="bk-next" aria-label="Trang sau">▶</button>
      <span class="spacer"></span><button class="btn sm" id="bk-time">${icon("clock")} <span class="num" id="bk-clock">${fmt(b.secs || 0)}</span></button><button class="btn sm" id="bk-note">Ghi chú</button><button class="btn sm primary" id="bk-sheet">Phiếu trả lời</button></div>
    <div class="bk-audio" id="bk-audio"></div>
    <div class="bk-page" id="bk-page"><canvas id="bk-cv"></canvas><div class="bk-load" id="bk-load">Đang tải trang…</div></div>
    <div class="bk-sheet" id="bk-nt" hidden></div>
    <div class="bk-sheet" id="bk-sh" hidden></div>
    <div class="bk-float" id="bk-float"><button id="bf-prev" aria-label="Trang trước">◀</button><span class="num" id="bf-pg"></span><button id="bf-next" aria-label="Trang sau">▶</button><button id="bf-zo">A−</button><button id="bf-zi">A+</button><button id="bf-x">Thu nhỏ</button></div>
  </div>`;
  const cv = $("#bk-cv"), wrap = $("#bk-page");
  const render = async () => {
    if (!doc) return; if (task) { try { task.cancel(); } catch (e) { } }
    $("#bk-load").hidden = false; $("#bk-n").value = b.page; $("#bf-pg").textContent = b.page + "/" + b.pages; $("#bk-note").classList.toggle("has", !!(b.notes || {})[b.page]); if (noteOpen) drawNotes();
    const page = await doc.getPage(b.page), base = page.getViewport({ scale: 1 }), cssW = Math.max(240, wrap.clientWidth) * (b.zoom || 1);
    const dpr = Math.min(2, window.devicePixelRatio || 1, 2000 / cssW, Math.sqrt(4.5e6 / (cssW * cssW * base.height / base.width))), vp = page.getViewport({ scale: cssW / base.width * dpr });
    cv.width = Math.round(vp.width); cv.height = Math.round(vp.height); cv.style.width = cssW + "px";
    task = page.render({ canvasContext: cv.getContext("2d"), viewport: vp });
    wrap.classList.toggle("zoomed", (b.zoom || 1) > 1);
    try { await task.promise; $("#bk-load").hidden = true; try { page.cleanup(); doc.cleanup(); } catch (e3) { } } catch (e) { if (e && e.name !== "RenderingCancelledException") { const ld = $("#bk-load"); if (ld) ld.textContent = "Không vẽ được trang này (" + String(e.message || e).slice(0, 80) + ")."; } }
  };
  let t0 = null;
  wrap.addEventListener("touchstart", e => { t0 = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null; }, { passive: true });
  wrap.addEventListener("touchend", e => { if (!t0 || (b.zoom || 1) > 1) return; const t = e.changedTouches[0], dx = t.clientX - t0.x, dy = t.clientY - t0.y; t0 = null; if (Math.abs(dx) > 60 && Math.abs(dx) > 2 * Math.abs(dy)) go(b.page + (dx < 0 ? 1 : -1)); }, { passive: true });
  const go = n => { n = clamp(n, 1, b.pages); if (n === b.page) return; save({ page: n }); wrap.scrollTop = 0; window.scrollTo(0, 0); render(); };
  const drawNotes = () => {
    const box = $("#bk-nt"); box.hidden = !noteOpen; $("#bk-note").textContent = noteOpen ? "Ẩn ghi chú" : "Ghi chú"; if (!noteOpen) return;
    const notes = b.notes || {}, pages = Object.keys(notes).map(Number).sort((x, y) => x - y);
    box.innerHTML = `<b>Ghi chú trang ${b.page}</b><textarea class="input" id="nt-text" rows="3" placeholder="Viết ghi chú cho trang này…">${esc(notes[b.page] || "")}</textarea>
      <div class="row"><span class="muted tiny" id="nt-state" style="flex:1">Tự lưu khi bạn gõ.</span>${notes[b.page] ? `<button class="btn sm" id="nt-del">Xoá ghi chú này</button>` : ""}</div>
      ${pages.length ? `<div class="nt-list">${pages.map(pn => `<button data-np="${pn}" class="${pn === b.page ? "on" : ""}"><b class="num">Trang ${pn}</b><span>${esc(notes[pn].slice(0, 90))}</span></button>`).join("")}</div>` : ""}`;
    let tm = 0;
    $("#nt-text").oninput = e => { clearTimeout(tm); const v = e.target.value; tm = setTimeout(() => { const n = { ...(b.notes || {}) }; if (v.trim()) n[b.page] = v; else delete n[b.page]; save({ notes: n }); $("#nt-state").textContent = "Đã lưu."; $("#bk-note").classList.toggle("has", !!n[b.page]); }, 500); };
    if ($("#nt-del")) $("#nt-del").onclick = () => { const n = { ...(b.notes || {}) }; delete n[b.page]; save({ notes: n }); drawNotes(); $("#bk-note").classList.remove("has"); };
    $$("[data-np]", box).forEach(x => x.onclick = () => go(+x.dataset.np));
  };
  const full = on => { document.body.classList.toggle("bk-fs", on); render(); };
  const audioUI = async () => {
    let f = null; try { f = await Books.file(id, "audio"); } catch (e) { }
    const box = $("#bk-audio"); if (!box) return;
    if (f) { const u = URL.createObjectURL(f); urls.push(u); box.innerHTML = `<audio controls preload="metadata" src="${u}"></audio><label class="btn sm" style="cursor:pointer">Đổi file nghe<input type="file" id="bk-af" accept="audio/*" hidden></label>`; }
    else box.innerHTML = `<label class="btn sm" style="cursor:pointer">+ Thêm file nghe (mp3) cho phần Listening<input type="file" id="bk-af" accept="audio/*" hidden></label>`;
    $("#bk-af").onchange = async e => { const a = e.target.files[0]; if (!a) return; try { await Books.setAudio(id, a); audioUI(); } catch (err) { toast("Không lưu được file nghe (file quá lớn?)."); } };
  };
  const drawSheet = () => {
    const box = $("#bk-sh"); box.hidden = !sheet; $("#bk-sheet").textContent = sheet ? "Ẩn phiếu" : "Phiếu trả lời"; if (!sheet) return;
    const [, from, to, nOpt] = BOOK_PARTS[part], ans = b.ans || {}, key = b.key, done = Object.keys(ans).length;
    box.innerHTML = `<div class="row"><b style="flex:1">Phiếu trả lời <span class="muted num">· đã tô ${done}/200</span></b><button class="btn sm" id="bk-clear">Xoá phiếu</button><button class="btn sm primary" id="bk-grade">Chấm điểm</button></div>
      <div class="tabs">${BOOK_PARTS.map((p, i) => `<button class="${i === part ? "on" : ""}" data-p="${i}">${p[0]}</button>`).join("")}</div>
      <div class="bk-rows">${Array.from({ length: to - from + 1 }, (_, k) => { const q = from + k, a = ans[q], ok = key && key[q - 1] != null && key[q - 1] >= 0 ? key[q - 1] : null;
        return `<div class="bk-row"><span class="num">${q}</span>${"ABCD".slice(0, nOpt).split("").map((c, i) => `<button class="${a === i ? "on" : ""} ${ok != null ? (i === ok ? "ok" : a === i ? "bad" : "") : ""}" data-q="${q}" data-a="${i}">${c}</button>`).join("")}</div>`; }).join("")}</div>`;
    $$("[data-p]", box).forEach(x => x.onclick = () => { part = +x.dataset.p; drawSheet(); });
    $$("[data-q]", box).forEach(x => x.onclick = () => { const q = +x.dataset.q, a = +x.dataset.a, ans = { ...(b.ans || {}) }; if (ans[q] === a) delete ans[q]; else ans[q] = a; save({ ans }); drawSheet(); });
    $("#bk-clear").onclick = () => modal(`<h2>Xoá phiếu trả lời?</h2><p class="muted" style="margin:8px 0 16px">Toàn bộ câu đã tô, đáp án đã nhập và đồng hồ của sách này sẽ về 0.</p><div class="row"><button class="btn" data-close style="flex:1">Giữ lại</button><button class="btn primary" id="bk-y" style="flex:1">Xoá phiếu</button></div>`, (m, close) => { $("#bk-y", m).onclick = () => { save({ ans: {}, key: null, secs: 0 }); $("#bk-clock").textContent = fmt(0); close(); drawSheet(); }; });
    $("#bk-grade").onclick = grade;
  };
  const grade = () => modal(`<div class="row"><h2 style="flex:1">Chấm điểm</h2><button class="btn sm ghost icon-btn" data-close aria-label="Đóng">${icon("x")}</button></div>
    <p class="muted small" style="margin:6px 0 12px">Dán đáp án đúng ở cuối sách của bạn, theo thứ tự từ câu 1. Viết liền <span class="kbd">ABCD…</span> hoặc <span class="kbd">1.A 2.C …</span> đều được.</p>
    <label class="field">Bắt đầu từ câu số<input class="input" id="gk-from" type="number" min="1" max="200" value="1"></label>
    <textarea class="input" id="gk-key" rows="5" placeholder="Ví dụ: BACDA CBDAB …"></textarea>
    <div id="gk-out" style="margin-top:12px"></div><button class="btn primary" id="gk-go" style="width:100%;margin-top:12px">Chấm</button>`,
    m => { $("#gk-go", m).onclick = () => {
      const arr = parseAnswers($("#gk-key", m).value), from = clamp(+$("#gk-from", m).value || 1, 1, 200), out = $("#gk-out", m);
      if (!arr.length) { out.innerHTML = `<span style="color:var(--bad)">Chưa đọc được đáp án nào. Hãy dán các chữ A, B, C, D.</span>`; return; }
      const key = (b.key || Array(200).fill(null)).slice(); arr.slice(0, 201 - from).forEach((v, i) => { key[from - 1 + i] = v; }); save({ key });
      const ans = b.ans || {}, rows = BOOK_PARTS.map(([name, a, z]) => { let n = 0, c = 0, wrong = []; for (let q = a; q <= z; q++) { const k = key[q - 1]; if (k == null || k < 0) continue; n++; if (ans[q] === k) c++; else wrong.push(q); } return { name, n, c, wrong }; }).filter(r => r.n);
      const N = rows.reduce((s, r) => s + r.n, 0), C = rows.reduce((s, r) => s + r.c, 0);
      out.innerHTML = `<div class="stat in" style="margin-bottom:10px"><div class="v num">${C}/${N}</div><div class="l">câu đúng (${pct(C, N)}%) · thời gian ${fmt(b.secs || 0)}</div></div>
        ${rows.map(r => `<div class="word-row"><div><b>${r.name}</b><div class="muted tiny num">${r.wrong.length ? "Sai/chưa làm: " + r.wrong.join(", ") : "Đúng hết"}</div></div><div class="num"><b>${r.c}/${r.n}</b></div></div>`).join("")}
        <p class="muted tiny" style="margin-top:8px">Đây là số câu đúng, chưa quy đổi sang thang 990. Trên phiếu, ô xanh là đáp án đúng, ô đỏ là câu bạn chọn sai.</p>`;
      drawSheet();
    }; });
  $("#bk-back").onclick = () => App.go("books");
  $("#bk-prev").onclick = () => go(b.page - 1); $("#bk-next").onclick = () => go(b.page + 1);
  $("#bk-n").onchange = e => go(+e.target.value || 1);
  $("#bk-zi").onclick = () => { save({ zoom: Math.min(3, (b.zoom || 1) + .25) }); render(); }; $("#bk-zo").onclick = () => { save({ zoom: Math.max(.75, (b.zoom || 1) - .25) }); render(); };
  $("#bk-sheet").onclick = () => { sheet = !sheet; drawSheet(); if (sheet) $("#bk-sh").scrollIntoView({ behavior: "smooth", block: "nearest" }); };
  $("#bk-time").onclick = () => { running = !running; $("#bk-time").classList.toggle("primary", running); clearInterval(tick); if (running) tick = setInterval(() => { b.secs = (b.secs || 0) + 1; if (b.secs % 15 === 0) save({ secs: b.secs }); const c = $("#bk-clock"); if (c) c.textContent = fmt(b.secs); }, 1000); else save({ secs: b.secs || 0 }); };
  $("#bk-note").onclick = () => { noteOpen = !noteOpen; drawNotes(); if (noteOpen) $("#bk-nt").scrollIntoView({ behavior: "smooth", block: "nearest" }); };
  $("#bk-full").onclick = () => full(true); $("#bf-x").onclick = () => full(false);
  $("#bf-prev").onclick = () => go(b.page - 1); $("#bf-next").onclick = () => go(b.page + 1);
  $("#bf-zi").onclick = () => $("#bk-zi").click(); $("#bf-zo").onclick = () => $("#bk-zo").click();
  App.keyHandler = e => { if (e.target.matches("input, textarea")) return; if (e.key === "ArrowRight") go(b.page + 1); if (e.key === "ArrowLeft") go(b.page - 1); };
  App.cleanup = () => { document.body.classList.remove("bk-fs"); if (running) Books.update(id, { secs: b.secs || 0 }); clearInterval(tick); urls.forEach(u => URL.revokeObjectURL(u)); if (task) { try { task.cancel(); } catch (e) { } } if (doc) { try { doc.destroy(); } catch (e) { } } };
  (async () => { try { const f = await Books.file(id, "pdf"); if (!f) throw new Error("nofile"); doc = await openPdfBlob(f); await render(); } catch (e) { const ld = $("#bk-load"); if (!ld) return; if (!e || e.message !== "nofile") { ld.innerHTML = `<div style="text-align:center;padding:20px">Không mở được sách.<br><small>Lỗi: ${esc(String(e && (e.message || e.name) || e).slice(0, 140))}</small></div>`; return; } ld.innerHTML = `<div style="text-align:center;padding:20px"><p>Máy này chưa có file PDF của sách “${esc(b.name)}”.<br>Tiến trình, phiếu trả lời và ghi chú vẫn còn.</p><label class="btn primary" style="cursor:pointer;margin-top:10px">Chọn lại file PDF<input type="file" id="bk-re" accept="application/pdf,.pdf" hidden></label></div>`;
      $("#bk-re").onchange = async ev => { const f = ev.target.files[0]; if (!f) return; try { await Books.attach(id, f); App.go("books", id); } catch (er) { toast("Không lưu được file này."); } }; } })();
  audioUI();
}
