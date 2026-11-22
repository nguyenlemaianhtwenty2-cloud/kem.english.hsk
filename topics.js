/* ===== Từ vựng theo chủ đề lớn: mỗi chủ đề 20–60 từ, chia thành các lần học 10 từ ===== */
const TOPIC_GROUPS = [
  ["topic", "Văn phòng & lịch làm việc", "Office", ["t-office", "x-equip", "y-daily", "x-time"]],
  ["topic", "Nhân sự & tuyển dụng", "Personnel", ["x-jobs", "t-hr", "x-pay", "y-review"]],
  ["topic", "Du lịch & hàng không", "Travel", ["t-travel", "y-air", "y-tour"]],
  ["topic", "Khách sạn & thuê xe", "Hotels & car rental", ["y-hotel", "x-rent"]],
  ["topic", "Ăn uống, sự kiện & hội nghị", "Dining & events", ["x-eat", "t-event", "x-conf"]],
  ["topic", "Công nghệ & phát triển sản phẩm", "Technology", ["t-tech", "x-product", "x-qc"]],
  ["topic", "Marketing & bán lẻ", "Marketing", ["t-marketing", "y-ads", "x-retail", "x-research"]],
  ["topic", "Mua sắm & chăm sóc khách hàng", "Shopping", ["x-price", "y-clothes", "t-shopping", "y-service"]],
  ["topic", "Tài chính, ngân hàng & thuế", "Finance", ["x-bank", "t-finance", "x-acct", "x-invest", "x-tax"]],
  ["topic", "Sản xuất & chuỗi cung ứng", "Manufacturing", ["x-post", "t-factory", "y-supply"]],
  ["topic", "Hợp đồng & pháp lý", "Contracts", ["x-policy", "t-contract", "x-legal"]],
  ["topic", "Chiến lược, dự án & kinh tế", "Strategy", ["x-strategy", "x-project", "y-econ", "y-mna"]],
  ["topic", "Sức khỏe & môi trường", "Health", ["t-health", "y-energy", "y-medical"]],
  ["topic", "Giao thông & địa điểm", "Transport", ["x-places", "t-transport"]],
  ["topic", "Nhà ở & xây dựng", "Housing", ["y-home", "t-realestate", "t-construction"]],
  ["topic", "Giáo dục, giải trí & thể thao", "Leisure", ["t-education", "x-fun", "y-sport"]],
  ["topic", "Truyền thông & tin tức", "Media", ["x-news", "t-media"]],
  ["part", "Part 1 · Mô tả tranh", "Photographs", ["p1", "y-p1out", "y-p1in"]],
  ["part", "Part 2 · Hỏi – đáp", "Question-Response", ["p2", "y-p2"]],
  ["part", "Part 3 · Hội thoại", "Conversations", ["p3", "y-p3"]],
  ["part", "Part 4 · Bài nói", "Talks", ["p4", "y-p4"]],
  ["part", "Part 5 · Từ loại hay gặp", "Word forms", ["x-verbs", "x-adjs", "x-advs", "y-nouns"]],
  ["part", "Part 5 · Cụm từ, giới từ, liên từ", "Phrases", ["p5", "y-colloc", "x-preps", "y-conj", "x-confuse", "t-advanced"]],
  ["part", "Part 6 · Hoàn thành đoạn văn", "Text completion", ["p6", "y-p6"]],
  ["part", "Part 7 · Đọc hiểu", "Reading", ["p7", "x-para", "y-p7b"]],
  ["context", "Họp, gọi điện & thuyết trình", "Meetings & calls", ["c-phone", "c-meeting", "x-report"]],
  ["context", "E-mail & thông báo", "E-mail & notices", ["c-announce", "c-email", "y-memo"]],
  ["context", "Mua bán, đặt hàng & khiếu nại", "Buying & complaints", ["x-shop", "c-order", "c-complaint", "y-nego"]],
  ["context", "Đi lại & dịch vụ", "Travel & services", ["c-airport", "x-doctor", "x-it"]],
  ["context", "Tuyển dụng & đi làm", "Getting a job", ["y-firstday", "c-interview"]]
];
/* 600 từ lõi: 60 bộ nền tảng có đủ phiên âm và câu ví dụ (do trang tự soạn), gom thành 20 chặng × 30 từ */
function coreTopics() {
  const sets = VOCAB.filter(v => !v.mine && v.words.length === 10 && v.words.every(w => w[4])).slice(0, 60), out = [];
  for (let i = 0; i < sets.length; i += 3) { const g = sets.slice(i, i + 3); out.push({ name: "Chặng " + (i / 3 + 1), sub: g.map(x => x.name.replace(/^Part \d · /, "")).join(" · "), en: g.map(x => x.name).join(" · "), sets: g }); }
  return out;
}
function topicsOf(tab) {
  if (tab === "core") return coreTopics();
  if (tab === "mine") { const m = new Map(); VOCAB.filter(s => s.group === "mine").forEach(s => { if (!m.has(s.topic)) m.set(s.topic, []); m.get(s.topic).push(s); }); return [...m].map(([name, sets]) => ({ name, en: "Bộ từ của tôi", sets })); }
  const mineFirst = tab === "topic" ? topicsOf("mine").map(t => ({ ...t, mine: true })) : [];
  const list = TOPIC_GROUPS.filter(g => g[0] === tab).map(([, name, en, ids]) => ({ name, en, sets: ids.map(id => VOCAB_BY_ID[id]).filter(Boolean) }));
  VOCAB.filter(v => v.big && v.group === tab).forEach(v => { let t = list.find(x => x.name === v.big); if (!t) list.push(t = { name: v.big, en: "", sets: [] }); t.sets.push(v); });
  return [...mineFirst, ...list];
}
function topicModal(t) {
  modal(`<div class="row"><h2 style="flex:1">${esc(t.name)}</h2><button class="btn sm ghost icon-btn" data-close aria-label="Đóng">${icon("x")}</button></div>
    ${t.sets.map((s, i) => `<h4 style="margin:14px 0 4px">Lần ${i + 1} · ${esc(s.name)}</h4>${s.words.map(w => `<div class="word-row"><div><b>${esc(w[0])}</b> <span class="muted small">${esc(w[2])}</span><div class="muted tiny">${esc(w[1])}</div></div><div class="small">${esc(w[3])}<div class="muted tiny">${esc(w[4])}</div></div>${sayBtn(w[0])}</div>`).join("")}`).join("")}`);
}
function topicSheet(t) {
  const n = t.sets.reduce((a, x) => a + x.words.length, 0), ok = x => S.sets[x.id] && S.sets[x.id].learned, next = t.sets.find(x => !ok(x));
  const got = t.sets.filter(ok).reduce((a, x) => a + x.words.length, 0);
  modal(`<div class="row"><h2 style="flex:1">${esc(t.name)}</h2><button class="btn sm ghost icon-btn" data-close aria-label="Đóng">${icon("x")}</button></div>
    <p class="muted small num" style="margin:4px 0 12px">${esc(t.en || "")}${t.en ? " · " : ""}${n} từ · đã học ${got} · ${t.sets.length} lần học</p>${bar(pct(got, n))}
    <div class="sessions" style="margin:14px 0">${t.sets.map((x, i) => `<button class="sess ${ok(x) ? "ok" : x === next ? "next" : ""}" data-go="${x.id}" title="${esc(x.name)}">${ok(x) ? icon("check") : ""}Lần ${i + 1}</button>`).join("")}</div>
    <div class="row"><button class="btn primary" data-go="${(next || t.sets[0]).id}" style="flex:1">${next ? (got ? "Học tiếp lần " + (t.sets.indexOf(next) + 1) : "Bắt đầu học") : "Học lại"}</button><button class="btn" id="ts-words">${icon("list")} Xem ${n} từ</button></div>`,
    (m, close) => { $$("[data-go]", m).forEach(b => b.onclick = () => { close(); App.go("vocab", { learn: b.dataset.go }); }); $("#ts-words", m).onclick = () => topicModal(t); });
}
const _vocabView = App.views.vocab;
App.views.vocab = function (el, arg) {
  if (arg && (arg.learn || arg.review)) return _vocabView(el, arg);
  let tab = (arg && arg.tab) || "topic";
  const draw = () => {
    const due = dueKeys().length, boxes = [1, 2, 3, 4, 5, 6].map(b => Object.values(S.srs).filter(x => x.b === b).length), maxB = Math.max(1, ...boxes);
    const topics = topicsOf(tab), nWords = topics.reduce((a, t) => a + t.sets.reduce((n, s) => n + s.words.length, 0), 0);
    const stat = t => { const n = t.sets.reduce((a, x) => a + x.words.length, 0), got = t.sets.filter(x => S.sets[x.id] && S.sets[x.id].learned).reduce((a, x) => a + x.words.length, 0); return { n, got, p: pct(got, n) }; };
    const curI = topics.findIndex(t => stat(t).p < 100);
    el.innerHTML = `
    <div class="vpage">
      ${S.settings.vtip === false ? "" : `<div class="tipline"><span>#Mẹo: Học trọn một chủ đề mỗi ngày giúp bạn nhớ từ theo ngữ cảnh tốt hơn.</span><button id="vtip-x" aria-label="Ẩn mẹo">${icon("x")}</button></div>`}
      <div class="vbar"><div class="tabs">${[["topic", "Chủ đề"], ["core", "600 từ lõi"], ["part", "Theo Part"], ["context", "Ngữ cảnh"], ["mine", "Của tôi"]].map(([k, l]) => `<button class="${tab === k ? "on" : ""}" data-tab="${k}">${l}</button>`).join("")}</div>
        <div class="vbar-r"><button class="btn sm ${due ? "primary" : ""}" id="rev">${icon("refresh")} ${due ? "Ôn " + due + " từ" : "Ôn tự do"}</button><div class="tabs">${[5, 10].map(n => `<button class="${(S.settings.chunk || 10) === n ? "on" : ""}" data-chunk="${n}">${n} từ</button>`).join("")}</div><button class="btn sm" id="imp">+ Nhập từ</button></div></div>
      ${topics.length ? "" : `<div class="empty">Chưa có chủ đề nào do bạn nhập. Bấm “Nhập từ” để chọn file hoặc dán danh sách từ của riêng bạn.</div>`}
      <div class="vboard">${topics.map((t, ti) => { const st = stat(t); return `<button class="vnote ${st.p === 100 ? "done" : ti === curI ? "cur" : ""}" data-topic="${ti}">
          <em>${esc(t.name)}</em>${t.sub ? `<small class="vsub">${esc(t.sub)}</small>` : ""}
          ${st.got ? `<span class="vscore"><span class="vring num">${st.p}</span><span class="vstars">${"★".repeat(st.p >= 100 ? 3 : st.p >= 50 ? 2 : 1)}</span></span>` : `<small class="num">${st.n} từ · ${t.sets.length} lần học</small>`}
          ${ti === curI ? `<span class="vgo">${st.got ? "TIẾP TỤC" : "BẮT ĐẦU"}</span>` : ""}<i class="ln"></i></button>`; }).join("")}</div>
    </div>`;
    if ($("#vtip-x")) $("#vtip-x").onclick = () => { S.settings.vtip = false; save(); draw(); };
    $("#rev").onclick = () => App.go("vocab", { review: true, free: !due });
    $("#imp").onclick = () => openImport(() => { tab = "mine"; draw(); });
    $$("[data-tab]", el).forEach(b => b.onclick = () => { tab = b.dataset.tab; draw(); });
    $$("[data-chunk]", el).forEach(b => b.onclick = () => { S.settings.chunk = +b.dataset.chunk; save(); draw(); });
    $$("[data-learn]", el).forEach(b => b.onclick = () => App.go("vocab", { learn: b.dataset.learn }));
    $$("[data-topic]", el).forEach(b => b.onclick = () => topicSheet(topics[+b.dataset.topic]));
  };
  draw();
};

function nextInTopic(id) {
  for (const tab of ["topic", "part", "context", "mine"]) { const t = topicsOf(tab).find(x => x.sets.some(s => s.id === id)); if (t) { const n = t.sets.find(s => s.id !== id && !(S.sets[s.id] && S.sets[s.id].learned)); return n ? n.id : null; } }
  return null;
}
