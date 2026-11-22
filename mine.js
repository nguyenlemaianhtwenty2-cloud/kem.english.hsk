/* ===== Bộ từ của tôi: người học tự nhập danh sách hoặc file của mình, lưu riêng trong tài khoản ===== */
const CLS_PART = { p1: "Part 1 · Mô tả tranh", p2: "Part 2 · Hỏi – đáp", p3: "Part 3 · Hội thoại", p4: "Part 4 · Bài nói", p5: "Part 5 · Từ loại hay gặp", p6: "Part 6 · Hoàn thành đoạn văn", p7: "Part 7 · Đọc hiểu" };
const CLS_OPTS = [["mine", "Của tôi"], ["topic", "Theo chủ đề"], ["context", "Theo ngữ cảnh"], ...Object.keys(CLS_PART).map(k => [k, "Part " + k[1]])];
/* Xếp một bộ từ tự nhập vào tab Của tôi / Chủ đề / Ngữ cảnh / Part n */
function classifyCustom(s) {
  const set = VOCAB_BY_ID[s.id]; if (!set) return; const c = s.cls || "mine", topic = s.topic || s.name;
  if (c === "mine") { set.group = "mine"; delete set.big; }
  else if (CLS_PART[c]) { set.group = "part"; set.big = CLS_PART[c]; }
  else { set.group = c; set.big = topic; }
  set.mine = 1;
}
function registerCustom() {
  (S.custom || []).forEach(s => {
    if (VOCAB_BY_ID[s.id]) { classifyCustom(s); return; }
    const set = { id: s.id, group: "mine", band: 0, name: s.name, topic: s.topic || s.name.replace(/ · phần \d+\/\d+$/, ""), en: "Bộ từ của tôi", words: s.words };
    VOCAB.push(set); VOCAB_BY_ID[s.id] = set;
    s.words.forEach(w => { WORDS[s.id + "|" + w[0]] = { set, w }; });
    classifyCustom(s);
  });
}
const POS_RE = /^\(?\s*((n|v|adj|adv|prep|conj|phr|pron|det)\.?(\s*[,\/]\s*(n|v|adj|adv|prep|conj|phr)\.?)*)\s*\)?$/i;
function parseDoc(text, fallbackName) {
  const secs = []; let cur = null, last = null, major = "";
  const sec = name => { cur = { name, words: [], major }; secs.push(cur); last = null; };
  const SPLIT = /\t+|\s*\|\s*|\s{2,}|\s+[-–—:]\s+/;
  const wordLine = t => { const ps = String(t || "").trim().split(SPLIT).map(x => x.trim()).filter(Boolean); return ps.length >= 2 && /^[A-Za-z][A-Za-z' \-]{0,38}(\s*\([^)]{1,16}\))?$/.test(ps[0]) && !POS_RE.test(ps[0]); };
  const lines = String(text || "").split(/\r?\n/), strict = /^#!toc/.test(lines[0] || "");
  lines.forEach((raw, idx) => {
    const line = raw.trim(); if (!line || /Phiên âm|Dịch nghĩa/.test(line)) return;
    if (/^#!/.test(line)) return;
    if (/^###\s+/.test(line)) { major = line.slice(3).trim(); return; }
    if (/^##\s+/.test(line)) { sec(line.slice(2).trim().slice(0, 60)); return; }
    const parts = line.split(/\t+|\s*\|\s*|\s{2,}|\s+[-–—:]\s+/).map(x => x.trim()).filter(Boolean);
    const head = parts.length <= 2 && line.replace(/\s{2,}/g, " ").match(/^(.{2,50}?)\s*\(?([A-Z][A-Za-z &\/,'\-]+)\)$/);
    if (head) { if (!strict) sec(head[1].replace(/\s+/g, " ").trim()); return; }
    // tiêu đề kiểu "Lesson 3: Marketing", "Bài 2 - Hợp đồng", "Unit 5"
    const kw = line.match(/^(?:lesson|unit|bài|chủ đề|topic|chapter|day|ngày|week|tuần)\s*\.?\s*\d+\s*[:.\-–—)]*\s*(.*)$/i);
    if (kw) { if (!strict) sec((kw[1].replace(/\s*\|.*$/, "").trim() || line).slice(0, 60)); return; }
    // một dòng ngắn viết hoa đứng riêng, ngay sau nó là dòng từ vựng → coi là tên chủ đề
    if (parts.length === 1 && line.length <= 45 && /^\p{Lu}/u.test(line) && line.split(" ").length <= 6 && !/[.;!?,]$/.test(line) && !POS_RE.test(line) && !/^[\/\[]/.test(line)) {
      let k = idx + 1; while (k < lines.length && !lines[k].trim()) k++;
      if (k < lines.length && wordLine(lines[k])) { if (!strict) sec(line.replace(/\s+/g, " ").slice(0, 60)); return; }
    }
    const wm = parts.length >= 2 && parts[0].match(/^([A-Za-z][A-Za-z' \-]{0,38}?)\s*(\(([^)]{1,16})\)?)?$/);
    if (wm && !POS_RE.test(parts[0])) {
      if (!cur) sec(fallbackName);
      let word = wm[1].trim(), pos = wm[3] ? wm[3].replace(/\s/g, "") + "." : "", ipa = "";
      parts.shift();
      if (parts[0] && POS_RE.test(parts[0])) pos = parts.shift().replace(/[()\s]/g, "");
      if (parts[0] && /^[\/\[]/.test(parts[0])) ipa = parts.shift();
      const meaning = parts.shift() || "";
      last = [word.charAt(0).toLowerCase() + word.slice(1), ipa, pos, meaning, parts.join(" ")];
      cur.words.push(last); return;
    }
    if (!last) return;
    parts.forEach(p => {
      if (!/[\p{L}\d]/u.test(p)) return;
      if (POS_RE.test(p)) last[2] = p.replace(/[()\s]/g, "") + (/\.$/.test(p) ? "" : ".");
      else if (/^\S{1,12}\/$/.test(p) && last[1] && !/\/$/.test(last[1].slice(1))) last[1] += p;
      else if (!last[3]) last[3] = p; else last[3] += " " + p;
    });
  });
  secs.forEach(s => { const seen = new Set(); s.words = s.words.filter(w => w[3] && !seen.has(w[0].toLowerCase()) && seen.add(w[0].toLowerCase())); });
  return secs.filter(s => s.words.length);
}
const PDFJS_BASE = window.PDFJS_BASE || "js/vendor/";
function loadPdfJs() {
  if (window.pdfjsLib && window.pdfjsWorker) return Promise.resolve(window.pdfjsLib);
  const add = src => new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = () => rej(new Error("không tải được " + src)); document.head.appendChild(s); });
  // Nạp luôn phần xử lý vào trang chính (không dùng Web Worker) để chạy được trong khung của Claude trên iPhone
  return add(PDFJS_BASE + "pdf.min.js").then(() => add(PDFJS_BASE + "pdf.worker.min.js")).then(() => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_BASE + "pdf.worker.min.js"; return window.pdfjsLib; });
}
/* Đọc toàn bộ PDF một lượt: chữ có toạ độ của từng trang + mục lục (bookmark của file hoặc trang "Mục lục") */
async function pdfLoad(file, onProgress) {
  const lib = await loadPdfJs(), doc = await lib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise, pages = [];
  for (let p = 1; p <= doc.numPages; p++) {
    pages.push((await (await doc.getPage(p)).getTextContent()).items.filter(i => i.str && i.str.trim()).map(i => ({ s: i.str.trim(), x0: i.transform[4], w: i.width, x: i.transform[4] + i.width / 2, y: i.transform[5], h: i.height || 0 })));
    if (onProgress) onProgress(p, doc.numPages);
  }
  const rowsOf = items => { const rows = []; items.forEach(i => { let r = rows.find(r => Math.abs(r.y - i.y) < 4); if (!r) rows.push(r = { y: i.y, it: [] }); r.it.push(i); });
    return rows.sort((a, b) => b.y - a.y).map(r => { r.it.sort((a, b) => a.x0 - b.x0); let t = "", end = null; r.it.forEach(i => { t += end == null ? "" : i.x0 - end > 7 ? "   " : i.x0 - end > 1 ? " " : ""; t += i.s; end = i.x0 + i.w; }); return t; }); };
  const rows = pages.map(rowsOf), nk = t => String(t).toLowerCase().replace(/[^\p{L}\d]+/gu, "");
  let toc = [], tocPages = new Set();
  // 1) bookmark có sẵn trong file
  try { const ol = await doc.getOutline(); const walk = async (list, parent) => { for (const it of list || []) { let d = it.dest; if (typeof d === "string") d = await doc.getDestination(d); let pg = null; try { if (d && d[0]) pg = (await doc.getPageIndex(d[0])) + 1; } catch (e) { }
      const kids = it.items && it.items.length; if (pg && !kids) toc.push({ title: it.title.trim(), page: pg, major: parent || "" }); if (kids) await walk(it.items, it.title.trim()); else if (!pg) { } } };
    await walk(ol, ""); } catch (e) { toc = []; }
  // 2) trang mục lục trong nội dung: các dòng "Tên chủ đề ...... 12"
  if (toc.length < 3) { toc = [];
    const TL = /^(.*?\p{L}.*?)[\s.·…_]{2,}(\d{1,4})$/u, cand = [];
    rows.forEach((rs, pi) => { const hits = rs.map(t => t.match(TL)).filter(m => m && m[1].replace(/[.\s·…_]+$/, "").length >= 3 && m[1].length <= 80 && +m[2] <= doc.numPages + 60);
      const marked = rs.some(t => /mục lục|table of contents|^contents$/i.test(t.trim()));
      if (hits.length >= (marked ? 3 : 5)) { let asc = 0; hits.forEach((m, k) => { if (!k || +m[2] >= +hits[k - 1][2]) asc++; }); if (asc >= hits.length * .8) { tocPages.add(pi + 1); hits.forEach(m => cand.push({ title: m[1].replace(/[.\s·…_]+$/, "").replace(/^[\dIVX]+[.)]\s*/, "").trim(), printed: +m[2] })); } } });
    if (cand.length >= 3) { // số trang in trên giấy có thể lệch so với thứ tự trang trong file → dò độ lệch
      const votes = {}; cand.slice(0, 8).forEach(c => { const k = nk(c.title); if (k.length < 4) return; for (let pi = 0; pi < rows.length; pi++) { if (tocPages.has(pi + 1)) continue; if (rows[pi].some(t => nk(t) === k || (nk(t).startsWith(k) && nk(t).length < k.length + 6))) { const off = pi + 1 - c.printed; votes[off] = (votes[off] || 0) + 1; break; } } });
      const best = Object.entries(votes).sort((a, b) => b[1] - a[1])[0], off = best ? +best[0] : 0;
      toc = cand.map(c => ({ title: c.title, page: clamp(c.printed + off, 1, doc.numPages), major: "" })); } else tocPages = new Set(); }
  toc.forEach(t => { const c = t.title.replace(/^(?:lesson|unit|bài|chủ đề|topic|chapter|day|ngày|week|tuần)\s*\d+\s*[:.\-–—)]*\s*/i, "").trim(); if (c.length >= 3) t.title = c; });
  toc = toc.filter(t => t.title && /\p{L}{2}/u.test(t.title)).sort((a, b) => a.page - b.page);
  try { doc.destroy(); } catch (e) { }
  return { pages, rows, toc: toc.length >= 3 ? toc : [], tocPages, nk };
}
/* Chèn tên chủ đề lấy từ mục lục vào đúng trang (và đúng dòng nếu tìm thấy tiêu đề trên trang) */
function tocMarks(ctx, p, lines, asMajor) {
  const es = ctx.toc.filter(t => t.page === p); if (!es.length) return lines;
  const out = lines.slice(), pre = [];
  es.forEach(e => { const k = ctx.nk(e.title), at = out.findIndex(t => !/^#/.test(t) && !/\|/.test(t) && (ctx.nk(t) === k || ((ctx.nk(t).startsWith(k) || ctx.nk(t).endsWith(k)) && ctx.nk(t).length < k.length + 12)));
    const mk = asMajor ? "### " + e.title : (e.major ? "### " + e.major + "\n" : "") + "## " + e.title; if (at >= 0) out[at] = mk; else pre.push(mk); });
  return pre.concat(out);
}
function fileToTextCtx(ctx) {
  const out = ctx.toc.length ? ["#!toc"] : [];
  ctx.rows.forEach((rs, pi) => { if (ctx.tocPages.has(pi + 1)) return; out.push(...(ctx.toc.length ? tocMarks(ctx, pi + 1, rs) : rs)); });
  return out.join("\n");
}
async function fileToText(file, onProgress) {
  if (!/\.pdf$/i.test(file.name) && file.type !== "application/pdf") return await file.text();
  return fileToTextCtx(await pdfLoad(file, onProgress));
}
/* PDF dạng bảng có tiêu đề cột No. | Word | Part of speech | Phonetic | Meaning | Example (ô nhiều dòng, căn giữa) */
function fileToTableCtx(ctx) {
  // file dạng bảng: tên chủ đề lấy từ dòng ngay trên mỗi bảng; các mục trong mục lục dùng làm nhóm lớn (để xếp theo Part)
  const out = [], strict = false, hasToc = ctx.toc.length > 0 && !ctx.pages.some(items => items.some(i => i.h >= 16 && /^PART\s*\d/i.test(i.s)));
  ctx.tocUsed = hasToc;
  const COLS = [[/^no\.?$/i, "no"], [/^word/i, "word"], [/^part of|^pos$/i, "pos"], [/^phonetic|^ipa$|^phiên âm/i, "ipa"], [/^meaning|^nghĩa/i, "mean"], [/^example|^ví dụ/i, "ex"]];
  let cols = null, rowsN = 0;
  ctx.pages.forEach((items, pi) => {
    const p = pi + 1, pageOut = []; if (ctx.tocPages.has(p)) return;
    const pm = items.find(i => i.h >= 16 && /^PART\s*\d/i.test(i.s)); if (pm) pageOut.push("### " + pm.s);
    const heads = []; items.forEach(i => { const c = COLS.find(c => c[0].test(i.s)); if (c && !heads.find(h => h.k === c[1] && Math.abs(h.y - i.y) > 30)) heads.push({ k: c[1], x: i.x, y: i.y }); });
    const hNo = heads.find(h => h.k === "no"), near = hNo ? heads.filter(h => Math.abs(h.y - hNo.y) < 14) : [];
    let top = Infinity;
    if (hNo && near.find(h => h.k === "word") && near.find(h => h.k === "mean")) {
      cols = near.sort((a, b) => a.x - b.x).filter((h, i, a) => a.findIndex(z => z.k === h.k) === i); top = hNo.y - 12;
      const above = items.filter(i => i.y > hNo.y + 14 && !/^\d+$/.test(i.s)).sort((a, b) => a.y - b.y)[0];
      if (above && !strict) { const line = items.filter(i => Math.abs(i.y - above.y) < 4).sort((a, b) => a.x - b.x).map(i => i.s).join(" ").replace(/^[\dIVX]+\.\s*/, ""); if (/\p{L}{2}/u.test(line)) pageOut.push("## " + line); }
    }
    if (cols) {
      const body = items.filter(i => i.y < top), col = i => cols.reduce((b, c) => Math.abs(c.x - i.x) < Math.abs(b.x - i.x) ? c : b).k;
      const nums = body.filter(i => /^\d{1,4}$/.test(i.s) && col(i) === "no").sort((a, b) => b.y - a.y);
      const rows = nums.map(n => ({ y: n.y, c: {} }));
      body.forEach(i => { if (nums.includes(i) || !rows.length) return; const r = rows.reduce((b, r) => Math.abs(r.y - i.y) < Math.abs(b.y - i.y) ? r : b); if (Math.abs(r.y - i.y) > 60) return; (r.c[col(i)] = r.c[col(i)] || []).push(i); });
      rows.forEach(r => { const g = k => (r.c[k] || []).sort((a, b) => b.y - a.y || a.x - b.x).map(i => i.s).join(k === "ipa" ? "" : " ").replace(/\s+/g, " ").replace(/\|/g, "/").trim();
        const w = g("word").replace(/[^A-Za-z' \-]/g, " ").replace(/\s+/g, " ").trim(), m = g("mean"); if (!w || !m) return; rowsN++;
        pageOut.push([w, g("pos"), g("ipa").replace(/\s+/g, ""), m, g("ex")].join(" | ")); });
    }
    out.push(...(hasToc ? tocMarks(ctx, p, pageOut, true) : pageOut));
  });
  return rowsN >= 20 ? out.join("\n") : null;
}
const VI_RE = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
/* Tự sửa các dòng sai định dạng về dạng: từ | loại từ | phiên âm | nghĩa */
function fixLines(text) {
  let fixed = 0; const strict = /^#!toc/.test(String(text || ""));
  const out = String(text || "").split(/\r?\n/).map(raw => {
    let line = raw.trim(); if (!line || /^#/.test(line)) return raw;
    const hk = line.match(/^(?:\(?\d{1,3}[.)]\s*)?(?:lesson|unit|bài|chủ đề|topic|chapter|day|ngày|week|tuần)\s*\.?\s*\d+\s*[:.\-–—)]*\s*(.*)$/i);
    if (hk) return strict ? "" : "## " + (hk[1].trim() || line);
    const cap = line.match(/^((?:[A-Z][A-Z&\/'\-]*\s?){1,6})(\s*\(.{1,40}\))?$/);
    if (cap && /[A-Z]{4}/.test(cap[1])) { const t = cap[1].trim().toLowerCase(); return strict ? "" : "## " + t.charAt(0).toUpperCase() + t.slice(1); }
    const orig = line;
    line = line.replace(/^(?:[-*•–·]+|\(?\d{1,4}[.)\]:]?)\s+/, "").replace(/[“”"]/g, "").replace(/\s+/g, m => m.includes("\t") ? "\t" : " ");
    if (/\||\t/.test(line)) { if (line !== orig) fixed++; return line; }
    let ipa = "", early = ""; line = line.replace(/\s*([\/\[][^\/\[\]|]{1,40}[\/\]])\s*/, (m0, g) => { if (/[ˈˌəɪʊɛæʌɔɑθðʃʒŋː]/.test(g) || /^\/.*\/$/.test(g)) { ipa = g.replace(/^\[|\]$/g, "/"); return " "; } return m0; }).trim();
    let pos = ""; { const tk = line.split(/\s+/), k = tk.slice(0, 8).findIndex((x, n) => n > 0 && /^\(?(n|v|adj|adv|prep|conj|phr|pron|det|noun|verb|adjective|adverb)\.?\)?[:=]?$/i.test(x));
      if (k > 0 && !tk.slice(0, k).some(x => VI_RE.test(x))) { const g = tk[k].replace(/[().:=]/g, "").toLowerCase(), tail = /[:=]$/.test(tk[k]) ? ":" : ""; pos = ({ noun: "n", verb: "v", adjective: "adj", adverb: "adv" }[g] || g) + "."; const head = tk.slice(0, k).join(" "), rest = tk.slice(k + 1).join(" "); line = /[|:=]|\s[-–—]\s/.test(rest) || /^[\/\[]/.test(rest) || !rest ? head + (tail ? ":" : "") + " " + rest : (early = head + "\u0001" + rest, head + " " + rest); } }
    line = line.replace(/\s+/g, " ").trim();
    let w = "", mean = "";
    const sep = line.match(/^(.{1,60}?)\s*(?:=>|→|=|:|\s[-–—]\s|–|—)\s*(.+)$/);
    if (sep && /^[A-Za-z]/.test(sep[1])) { w = sep[1]; mean = sep[2]; }
    else if ((line.match(/,/g) || []).length === 1 && /^[A-Za-z][A-Za-z' \-]*,/.test(line)) { [w, mean] = line.split(/\s*,\s*/); }
    else { const t = line.split(" "), i = t.findIndex(x => VI_RE.test(x)); if (i > 0 && i <= 6 && t.slice(0, i).every(x => /^[A-Za-z'’\-\/().]+$/.test(x))) { w = t.slice(0, i).join(" "); mean = t.slice(i).join(" "); } }
    if (early) [w, mean] = early.split("\u0001");
    w = w.replace(/[^A-Za-z' \-]/g, " ").replace(/\s+/g, " ").trim(); mean = mean.replace(/^[\s:=\-–—.,;]+|[\s;,]+$/g, "");
    if (!w || !mean) return raw;
    fixed++; return [w, pos, ipa, mean].join(" | ");
  });
  return { text: out.join("\n"), fixed };
}
/* Tự xếp một chủ đề vào Part / Chủ đề dựa trên tiêu đề lớn (PART n) và tên chủ đề */
function autoCls(sec) {
  const mj = (sec.major || "").toLowerCase(), nm = (sec.name || "").toLowerCase();
  let m = mj.match(/part\s*(\d)((?:\s*[-–,]\s*\d)*)/) || nm.match(/part\s*(\d)((?:\s*[-–,]\s*\d)*)/);
  if (m) { const all = (m[1] + m[2]).match(/\d/g).map(Number); return "p" + (all.length > 1 ? Math.max(...all.filter(n => n <= 7)) : clamp(all[0], 1, 7)); }
  const t = mj + " " + nm, R = [
    ["p1", /picture|photo|tranh|gesture|posture|eyes|mouth|appearance|vehicle|aircraft|scenery|mô tả/],
    ["p2", /question|response|hỏi\s*[-–]?\s*đáp|request|suggestion|statement/],
    ["p3", /conversation|hội thoại|dialog/],
    ["p4", /short talk|announcement|bài nói|broadcast|recorded message|news report|speech|excerpt/],
    ["p6", /text completion|hoàn thành đoạn/],
    ["p5", /incomplete sentence|word form|từ loại|collocation|preposition|giới từ|conjunction|liên từ/],
    ["p7", /reading|đọc hiểu|e-?mail|letter|memo|article|notice|invoice|advertisement|quảng cáo/]];
  const hit = R.find(r => r[1].test(t)); return hit ? hit[0] : "topic";
}
function openImport(after) {
  const groups = () => { const m = {}; (S.custom || []).forEach(s => { const t = s.topic || s.name; (m[t] = m[t] || []).push(s); }); return m; };
  const list = () => { const g = groups(), ks = Object.keys(g); return ks.length ? `<div class="stack" style="gap:6px;margin-top:6px;max-height:180px;overflow:auto">${ks.map(k => `<div class="row small"><span style="flex:1">${esc(k)} · <span class="num">${g[k].reduce((a, s) => a + s.words.length, 0)}</span> từ</span><select class="input cls-sel" data-cls="${esc(k)}" aria-label="Xếp vào">${CLS_OPTS.map(([v, l]) => `<option value="${v}" ${(g[k][0].cls || "mine") === v ? "selected" : ""}>${l}</option>`).join("")}</select><button class="btn sm" data-del="${esc(k)}" style="color:var(--bad)">Xóa</button></div>`).join("")}</div>` : `<p class="muted small">Chưa có chủ đề nào.</p>`; };
  let secs = [];
  modal(`<div class="row"><h2 style="flex:1">Bộ từ của tôi</h2><button class="btn sm ghost icon-btn" data-close aria-label="Đóng">${icon("x")}</button></div>
    <p class="muted small" style="margin:6px 0 12px">Đưa danh sách từ của riêng bạn vào trang: chọn file PDF hoặc TXT từ máy, hoặc dán trực tiếp. Trang tách theo chủ đề, chia mỗi chủ đề thành các lần học 10 từ, và chỉ lưu trong tài khoản của bạn.</p>
    <div class="stack">
      <label class="field" for="im-file">Chọn file từ máy (PDF dạng bảng từ – phiên âm – nghĩa, hoặc TXT)<input class="input" id="im-file" type="file" accept=".pdf,.txt,.csv,application/pdf,text/plain"></label>
      <label class="field" for="im-text">Hoặc dán danh sách (mỗi dòng: <span class="kbd">từ | nghĩa | câu ví dụ</span>, <span class="kbd">từ - nghĩa</span>, hay <span class="kbd">Từ (n)  /phiên âm/  nghĩa</span>)<textarea class="input" id="im-text" spellcheck="false" style="min-height:110px"></textarea></label>
      <label class="field" for="im-name">Tên chủ đề (dùng khi danh sách không có tiêu đề chủ đề)<input class="input" id="im-name" placeholder="Ví dụ: Hợp đồng" maxlength="40"></label>
      <label class="field" for="im-cls">Xếp các từ này vào<select class="input" id="im-cls"><option value="auto">Tự phân loại theo Part và chủ đề (khuyên dùng)</option>${CLS_OPTS.map(([v, l]) => `<option value="${v}">${v === "mine" ? "Tab “Của tôi”" : v === "topic" ? "Tab “Chủ đề” (giữ tên chủ đề trong file)" : v === "context" ? "Tab “Ngữ cảnh” (giữ tên chủ đề trong file)" : "Tab “Theo Part” → " + CLS_PART[v]}</option>`).join("")}</select></label>
      <div id="im-out" class="small muted"></div>
      <div class="row" style="justify-content:flex-end"><button class="btn primary" id="im-go">Thêm vào bộ từ của tôi</button></div>
      <div style="border-top:1px dashed var(--line);padding-top:10px"><b class="small">Chủ đề đã nhập</b><div id="im-list">${list()}</div></div>
    </div>`, (m) => {
    const out = $("#im-out", m);
    let skipped = 0, fixedN = 0, tocN = 0;
    const clsOf = sc => { const v = $("#im-cls", m).value; return v === "auto" ? autoCls(sc) : v; };
    const spread = () => { const c = {}; secs.forEach(sc => { const k = clsOf(sc); c[k] = (c[k] || 0) + 1; }); return Object.entries(c).map(([k, n]) => `${(CLS_OPTS.find(o => o[0] === k) || [0, k])[1]}: ${n} chủ đề`).join(" · "); };
    const nk = w => String(w).toLowerCase().replace(/\s+/g, " ").trim();
    const preview = () => {
      const fx = fixLines($("#im-text", m).value); fixedN = fx.fixed;
      secs = parseDoc(fx.text, $("#im-name", m).value.trim() || "Bộ từ của tôi");
      // loại từ trùng: đã có sẵn trong trang (kể cả từ đã nhập trước đó) hoặc lặp lại trong chính file
      const have = new Set(); VOCAB.forEach(v => v.words.forEach(w => have.add(nk(w[0])))); skipped = 0;
      secs.forEach(sc => { sc.words = sc.words.filter(w => { const k = nk(w[0]); if (have.has(k)) { skipped++; return false; } have.add(k); return true; }); });
      secs = secs.filter(sc => sc.words.length);
      const n = secs.reduce((a, s) => a + s.words.length, 0);
      out.innerHTML = n ? `${tocN ? `Đọc được mục lục của file (<b class="num">${tocN}</b> mục), chủ đề được chia theo mục lục. ` : ""}${fixedN ? `Đã tự sửa định dạng <b class="num">${fixedN}</b> dòng. ` : ""}${skipped ? `Đã loại <b class="num">${skipped}</b> từ trùng. ` : ""}Nhận ra <b class="num">${n}</b> từ mới trong <b class="num">${secs.length}</b> chủ đề: ${secs.slice(0, 6).map(s => `${esc(s.name)} (${s.words.length})`).join(", ")}${secs.length > 6 ? "…" : ""}<br>Sẽ xếp vào → ${spread()}<br>Ví dụ: <b>${esc(secs[0].words[0][0])}</b> ${esc(secs[0].words[0][1])} – ${esc(secs[0].words[0][3])}` : skipped ? `Cả <b class="num">${skipped}</b> từ trong danh sách đều đã có sẵn, không có từ mới để thêm.` : "Chưa nhận ra từ nào.";
    };
    const wire = () => { $$("[data-cls]", m).forEach(sel => sel.onchange = () => { (groups()[sel.dataset.cls] || []).forEach(x => { x.cls = sel.value; classifyCustom(x); }); save(); if (after) after(); }); wireDel(); };
    const wireDel = () => $$("[data-del]", m).forEach(b => b.onclick = () => {
      if (!b.dataset.armed) { b.dataset.armed = "1"; b.textContent = "Bấm lần nữa để xóa"; return; }
      (groups()[b.dataset.del] || []).forEach(s => {
        const i = VOCAB.findIndex(v => v.id === s.id); if (i >= 0) VOCAB.splice(i, 1);
        delete VOCAB_BY_ID[s.id]; delete S.sets[s.id];
        s.words.forEach(w => { delete WORDS[s.id + "|" + w[0]]; delete S.srs[s.id + "|" + w[0]]; });
        S.custom.splice(S.custom.indexOf(s), 1);
      });
      save(); $("#im-list", m).innerHTML = list(); wire(); if (after) after();
    });
    wire();
    $("#im-cls", m).onchange = preview;
    $("#im-text", m).oninput = preview; $("#im-name", m).oninput = preview;
    $("#im-file", m).onchange = async e => {
      const f = e.target.files[0]; if (!f) return;
      out.textContent = "Đang đọc file…";
      try { const prog = (p, n) => { out.textContent = `Đang đọc trang ${p}/${n}…`; }; let txt = null;
        if (/\.pdf$/i.test(f.name) || f.type === "application/pdf") { const ctx = await pdfLoad(f, prog); txt = fileToTableCtx(ctx); tocN = txt ? (ctx.tocUsed ? ctx.toc.length : 0) : ctx.toc.length; txt = txt || fileToTextCtx(ctx); } else { tocN = 0; txt = await f.text(); }
        $("#im-text", m).value = txt; preview(); }
      catch (err) { out.innerHTML = `<span style="color:var(--bad)">Không đọc được file này. Hãy thử file khác, hoặc mở file rồi sao chép và dán nội dung vào ô bên dưới.</span>`; }
    };
    $("#im-go", m).onclick = () => {
      preview();
      const n = secs.reduce((a, s) => a + s.words.length, 0), have = (S.custom || []).reduce((a, s) => a + s.words.length, 0);
      if (!n) { if (!skipped) out.innerHTML = `<span style="color:var(--bad)">Chưa nhận ra từ nào. Kiểm tra lại định dạng mỗi dòng.</span>`; return; }
      const sk = skipped;
      if (have + n > 3000) { out.innerHTML = `<span style="color:var(--bad)">Tối đa 3.000 từ tự nhập; hiện đã có ${have}, file này có ${n}.</span>`; return; }
      S.custom = S.custom || [];
      const stamp = Date.now().toString(36);
      secs.forEach((s, si) => { const k = Math.ceil(s.words.length / 10); for (let i = 0; i < k; i++) S.custom.push({ id: `m-${stamp}-${si}-${i}`, topic: s.name, cls: clsOf(s), name: k > 1 ? `${s.name} · phần ${i + 1}/${k}` : s.name, words: s.words.slice(i * 10, i * 10 + 10) }); });
      registerCustom(); save();
      $("#im-text", m).value = ""; $("#im-file", m).value = ""; out.textContent = `Đã thêm ${n} từ mới vào ${secs.length} chủ đề.${sk ? ` Đã loại ${sk} từ trùng.` : ""}`; secs = [];
      $("#im-list", m).innerHTML = list(); wire(); if (after) after();
    };
  });
}
const _applySettings = applySettings;
applySettings = function () { _applySettings(); registerCustom(); };
registerCustom();
