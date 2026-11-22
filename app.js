/* ===== Khung ứng dụng, trang chủ, lộ trình, cài đặt ===== */
const NAV_TOEIC = [
  ["home", "Hôm nay", "home"], ["roadmap", "Lộ trình", "route"], ["vocab", "Từ vựng", "cards"], ["grammar", "Ngữ pháp", "book"],
  ["translate", "Luyện dịch", "lang"], ["shadowing", "Shadowing", "mic"], ["parts", "Theo Part", "list"], ["exam", "Luyện thi", "exam"], ["books", "Sách của tôi", "shelf"], ["placement", "Test band", "target"], ["stats", "Thành tích", "bars"]
];

const NAV_HSK = [["home", "Hôm nay", "home"], ["hsk", "Lộ trình", "route"], ["hvocab", "Bài học", "cards"], ["hgram", "Ngữ pháp", "book"], ["hwrite", "Luyện viết", "pen"], ["hexam", "Luyện thi", "exam"], ["stats", "Thành tích", "bars"]];
const isHsk = () => !!(S.settings && S.settings.track === "hsk");
const navList = () => isHsk() ? NAV_HSK : NAV_TOEIC;
const brandName = () => isHsk() ? "HSK Path" : "TOEIC Path";
ICONS.zh = '<rect x="3.500" y="3.500" width="17" height="17" rx="4.500"/><path d="M12 7v10M7.500 9.500h9v4.500h-9z"/>';
ICONS.shelf = '<path d="M5 4h4v16H5zM9 6h4v14H9zM14.5 7.2l3.6-1 3 12.8-3.6 1z"/>';
ICONS.bars = '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M9 16v-4M12 16V8M15 16v-2.5"/>';
const App = {
  view: "home", arg: null, views: {}, keyHandler: null, cleanup: null, busy: false, _skip: false,
  go(view, arg) {
    this.arg = arg === undefined ? null : arg;
    if (location.hash.slice(1) !== view) { this._skip = true; location.hash = view; }
    this.show(view);
  },
  show(view) {
    if (!this.views[view]) view = "home";
    /* mỗi chương trình chỉ mở trang của mình: lùi trang về trang của chương trình kia thì đổi sang trang tương ứng */
    const HV = ["hsk", "hvocab", "hgram", "hwrite", "hexam", "hday", "hlesson"], shared = ["home", "stats"];
    if (!shared.includes(view) && HV.includes(view) !== isHsk()) {
      const m = isHsk() ? { vocab: "hvocab", topics: "hvocab", roadmap: "hsk", grammar: "hgram", exam: "hexam" } : { hvocab: "vocab", hsk: "roadmap", hgram: "grammar", hexam: "exam" };
      const a = this.arg, keep = a && typeof a === "object" && (a.review || (a.learn && VOCAB_BY_ID[a.learn] && !!VOCAB_BY_ID[a.learn].zh === isHsk()));
      view = m[view] || "home"; this.arg = keep ? a : null;
      if (location.hash.slice(1) !== view) try { history.replaceState(null, "", "#" + view); } catch (e) { }
    }
    if (this.cleanup) { try { this.cleanup(); } catch (e) { } this.cleanup = null; }
    this.keyHandler = null; this.busy = false;
    Speech.stop();
    this.view = view;
    renderNav();
    const el = $("#view");
    el.innerHTML = "";
    this.views[view](el, this.arg);
    const nv = navList().find(n => n[0] === (view === "hday" ? "hsk" : view === "hlesson" ? "hvocab" : view)) || (["hsk", "hvocab", "hwrite", "hgram", "hexam", "hday", "hlesson"].includes(view) ? NAV_HSK : NAV_TOEIC).find(n => n[0] === view) || navList()[0];
    $("#sheet-h").innerHTML = view === "home" ? "" : `<div class="sheet-h"><b>${brandName()}</b><i title="${nv[1]}">${icon(nv[2])}</i><span>${nv[1]}</span><a href="#home" class="sheet-x" aria-label="Đóng, về trang chủ">${icon("x")}<em>Thoát</em></a></div>`;
    this.arg = null;
    window.scrollTo(0, 0);
    document.body.dataset.view = view;
    applyMode();
  },
  render() { if (!this.busy) this.show(this.view); }
};
window.addEventListener("hashchange", () => { if (App._skip) { App._skip = false; return; } App.show(location.hash.slice(1) || "home"); });
document.addEventListener("keydown", e => { if (App.keyHandler) App.keyHandler(e); });

Object.assign(ICONS, {
  lock: '<rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  search: '<circle cx="11" cy="11" r="6.500"/><path d="M16 16l4.500 4.500"/>'
});
const DOCK = [["books", "shelf", "var(--lilac)", "Sách của tôi"], ["vocab", "cards", "var(--blue)", "Từ vựng"], ["grammar", "book", "var(--pink)", "Ngữ pháp"], ["translate", "lang", "var(--yellow)", "Luyện dịch"], ["exam", "exam", "var(--green)", "Luyện thi"], ["shadowing", "vol", "var(--lilac)", "Shadowing"]];
function renderNav() {
  const br = $(".brand"); if (br) br.innerHTML = `<i>${isHsk() ? "汉" : "TP"}</i><span>${brandName()}</span>`;
  document.documentElement.dataset.track = isHsk() ? "hsk" : "toeic"; document.title = brandName();
  $("#topnav").innerHTML = `<div class="trk" role="group" aria-label="Chọn chương trình học"><button class="${isHsk() ? "" : "on"}" data-trk="toeic">TOEIC</button><button class="${isHsk() ? "on" : ""}" data-trk="hsk">HSK <span lang="zh">汉语</span></button></div>` + navList().map(([id, label, ic]) => `<a href="#${id}" class="${App.view === id ? "on" : ""}" title="${label}" ${App.view === id ? 'aria-current="page"' : ""}>${icon(ic)}<span>${label}</span></a>`).join("");
  const xp = S.xp || 0, dx = (daily().xp0 == null ? (daily().xp0 = xp, 0) : xp - daily().xp0);
  $("#topright").innerHTML = `<button class="tchip num" id="top-streak" title="Điểm danh">${icon("flame")} ${streakNow()}</button>
    <div class="level"><span class="lv-ring" style="--p:${Math.min(100, dx * 2)}"></span><div><b>Cấp ${Math.floor(xp / 100) + 1}</b><small class="num">${Math.min(dx, 50)}/50 XP hôm nay</small></div></div>
    <button class="tchip pf-chip" id="open-pf" aria-label="Hồ sơ học viên" title="Hồ sơ học viên">${Avatars.svg(S.profile.avatar || "basket", 30)}</button>
    <a class="tchip" href="#stats" aria-label="Thành tích" title="Thành tích" style="padding:8px">${icon("bars")}</a>
    <button class="tchip" id="open-settings" aria-label="Cài đặt" style="padding:8px">${icon("sliders")}</button>`;
  $$("[data-trk]").forEach(b => b.onclick = () => { const t = b.dataset.trk; if ((t === "hsk") === isHsk()) return; S.settings.track = t; save(); App.go("home"); });
  $("#top-streak").onclick = doCheckIn;
  if ($("#open-pf")) $("#open-pf").onclick = () => openProfiles();
  $("#open-settings").onclick = openSettings;
  const nt = nextTask();
  const dock = isHsk() ? [["hsk", "route", "var(--pink)", "Lộ trình HSK"], ["hvocab", "cards", "var(--blue)", "Bài học"], ["hgram", "book", "var(--lilac)", "Ngữ pháp"], ["hwrite", "pen", "var(--yellow)", "Luyện viết"], ["hexam", "exam", "var(--green)", "Luyện thi"]] : DOCK;
  $("#dock").innerHTML = dock.map(([id, ic, bg, label]) => `<button data-d="${id}" style="background:${bg}" aria-label="${label}" title="${label}">${icon(ic)}</button>`).join("") + `<span class="sep"></span><button class="go" id="dock-go" aria-label="Học bài tiếp theo" title="Học bài tiếp theo">${iconFill("play")}</button>`;
  $$("#dock [data-d]").forEach(b => b.onclick = () => { if (b.dataset.d === "search") { App.go("home"); setTimeout(() => $("#q") && $("#q").focus(), 30); } else App.go(b.dataset.d); });
  $("#dock-go").onclick = () => isHsk() ? hskGoNext() : nt ? nt.info.open() : App.go("exam");
}

/* ===== Đồng hồ học ===== */
const Timer = {
  mode: "study", running: false, last: 0, elapsed: 0, phase: "work", left: 25 * 60, iv: 0, sinceSave: 0,
  start() { if (this.running) return; this.running = true; this.last = Date.now(); this.iv = setInterval(() => this.tick(), 1000); this.ui(); },
  pause() { this.running = false; clearInterval(this.iv); save(); this.ui(); },
  reset() { this.pause(); this.elapsed = 0; this.phase = "work"; this.left = 25 * 60; this.ui(); },
  setMode(m) { this.pause(); this.mode = m; this.elapsed = 0; this.phase = "work"; this.left = 25 * 60; this.ui(); },
  tick() {
    const now = Date.now(), dt = Math.floor((now - this.last) / 1000);
    if (dt < 1) return;
    this.last += dt * 1000;
    if (this.mode === "study") { this.elapsed += dt; addStudy(dt); }
    else {
      if (this.phase === "work") addStudy(dt);
      this.left -= dt;
      if (this.left <= 0) {
        this.phase = this.phase === "work" ? "break" : "work";
        this.left = this.phase === "work" ? 25 * 60 : 5 * 60;
        toast(this.phase === "break" ? "Hết 25 phút – nghỉ 5 phút nhé!" : "Hết giờ nghỉ – quay lại học thôi!");
      }
    }
    this.ui();
  },
  face() {
    const sec = this.mode === "study" ? this.elapsed : this.left;
    const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
    return (h ? h + ":" + pad(m) : pad(m)) + ":" + pad(s);
  },
  ui() {
    const f = $("#timer-face"); if (f) f.textContent = this.face();
    const b = $("#timer-toggle"); if (b) b.innerHTML = this.running ? `${icon("pause")} Dừng` : `${icon("play")} Bắt đầu`;
    const p = $("#timer-phase"); if (p) p.textContent = this.mode === "pomo" ? (this.phase === "work" ? "Tập trung 25 phút" : "Nghỉ 5 phút") : "Bấm giờ tự do";
    const sec = S.study[today()] || 0;
    ($("#mt-val") || {}).textContent = Math.floor(sec / 3600) ? `${Math.floor(sec / 3600)}:${pad(Math.floor(sec % 3600 / 60))}:${pad(sec % 60)}` : `${Math.floor(sec / 60)}:${pad(sec % 60)}`;
    ($("#mt-label") || {}).textContent = this.running ? "Đang học…" : "Thời gian học hôm nay";
  }
};
function addStudy(dt) {
  const k = today();
  S.study[k] = (S.study[k] || 0) + dt;
  Timer.sinceSave += dt;
  if (Timer.sinceSave >= 60) {
    Timer.sinceSave = 0;
    const keys = Object.keys(S.study).sort();
    if (keys.length > 60) keys.slice(0, keys.length - 60).forEach(x => delete S.study[x]);
    save();
  } else Store.save(true);
}

/* ===== Lộ trình: thông tin nhiệm vụ ===== */
function taskInfo(t) {
  const [type, id] = t;
  if (type === "pl") return { icon: "target", title: "Test band đầu vào", sub: "34 câu · ước lượng điểm hiện tại", done: !!S.placement, open: () => App.go("placement") };
  if (type === "v") { const s = VOCAB_BY_ID[id]; return { icon: "cards", title: "Từ vựng · " + s.name, sub: "10 từ · học rồi ôn bằng trắc nghiệm, điền từ, ghi lại, nghe", done: !!(S.sets[id] && S.sets[id].learned), open: () => App.go("vocab", { learn: id }) }; }
  if (type === "t" || type === "g") { const g = TOPIC_BY_ID[id]; const best = (S.grammar[id] || {}).best; return { icon: "book", title: (type === "t" ? "Thì · " : "Ngữ pháp · ") + g.name, sub: best != null ? `Điểm cao nhất ${best}% · cần ≥ 60%` : "Lý thuyết, mẹo và bài tập", done: (best || 0) >= 60, open: () => App.go("grammar", id) }; }
  if (type === "x") { const e = EXAMS[id]; return { icon: "exam", title: "Luyện thi · " + e.name, sub: `${e.n} câu · ${e.min} phút`, done: S.tests.some(x => x.type === id), open: () => App.go("exam", { start: id }) }; }
  if (type === "tr") { const c = S.transCount[id] || 0; return { icon: "lang", title: `Luyện dịch cấp ${id}`, sub: `${Math.min(c, 3)}/3 câu`, done: c >= 3, open: () => App.go("translate", id) }; }
  if (type === "sh") { const c = S.shadowCount[id] || 0; return { icon: "mic", title: `Shadowing cấp ${id}`, sub: `${Math.min(c, 3)}/3 câu`, done: c >= 3, open: () => App.go("shadowing", id) }; }
}
function routeBands() {
  const a = bandOf(S.profile.current || 10), b = Math.max(a, bandOf(Math.max((S.profile.target || 0) - 1, 10)));
  return BANDS.slice(a, b + 1).map(x => x.id);
}
function nextTask() {
  for (const b of routeBands().concat(BANDS.map(x => x.id))) {
    for (const wk of ROADMAP[b]) for (const t of wk.tasks) { const info = taskInfo(t); if (!info.done) return { info, band: b, week: wk.w }; }
  }
  return null;
}
function bandProgress(b) {
  const all = ROADMAP[b].flatMap(w => w.tasks).map(taskInfo);
  return { done: all.filter(x => x.done).length, total: all.length };
}

/* ===== Trang chủ ===== */
function greet() { const h = new Date().getHours(); return h < 11 ? "Chào buổi sáng" : h < 14 ? "Chào buổi trưa" : h < 18 ? "Chào buổi chiều" : "Chào buổi tối"; }
function doCheckIn() {
  const first = checkIn();
  const due = dueKeys().length;
  if (first) toast(`Điểm danh thành công – chuỗi ${S.streak.count} ngày!`);
  if (due) App.go(isHsk() ? "hvocab" : "vocab", { review: true });
  else { if (!first) toast("Hôm nay bạn đã điểm danh và không còn từ nào đến hạn."); else if (!learnedCount()) toast("Học bộ 10 từ đầu tiên để có từ ôn tập ngày mai."); App.render(); }
}
function dailyTasks() {
  const d = daily(), due = dueKeys().length, checked = S.streak.last === today();
  return [
    { t: "Điểm danh & ôn từ đến hạn", s: checked ? (due ? `Còn ${due} từ cần ôn` : "Đã ôn xong hôm nay") : `${due} từ đến hạn ôn`, done: checked && due === 0, go: doCheckIn },
    { t: "Học 10 từ mới", s: "1 bộ flashcard", done: (d.newSets || 0) >= 1, go: () => App.go("vocab", nextVocabSet() ? { learn: nextVocabSet() } : null) },
    { t: "1 bài ngữ pháp", s: "Lý thuyết + bài tập", done: (d.grammar || 0) >= 1, go: () => App.go("grammar") },
    { t: "Dịch 3 câu", s: `${Math.min(d.trans || 0, 3)}/3`, done: (d.trans || 0) >= 3, go: () => App.go("translate") },
    { t: "Shadowing 3 câu", s: `${Math.min(d.shadow || 0, 3)}/3`, done: (d.shadow || 0) >= 3, go: () => App.go("shadowing") },
    { t: "1 đề luyện thi", s: "Bất kỳ Part nào", done: (d.test || 0) >= 1, go: () => App.go("exam") }
  ];
}
function nextVocabSet() {
  const order = routeBands();
  const s = VOCAB.filter(x => order.includes(x.band) && !(S.sets[x.id] && S.sets[x.id].learned))[0] || VOCAB.find(x => !(S.sets[x.id] && S.sets[x.id].learned));
  return s ? s.id : null;
}
function weakTags(min = 2) {
  return Object.entries(S.tags).filter(([, v]) => v.n >= min).map(([k, v]) => ({ tag: k, c: v.c, n: v.n, p: pct(v.c, v.n) })).sort((a, b) => a.p - b.p || b.n - a.n);
}
function lastEstimate() { const t = [...S.tests].reverse().find(x => x.est); return t ? t.est.T : null; }

const TASK_DESC = { pl: "Làm bài test để biết trình độ hiện tại.", v: "Học 10 từ qua flashcard, trắc nghiệm, gõ từ và nghe.", t: "Công thức, cách dùng, dấu hiệu và bài tập.", g: "Lý thuyết, mẹo làm bài và bài tập có giải thích.", x: "Làm đề tính giờ, xem câu sai và dạng cần ôn.", tr: "Dịch 3 câu theo ngữ cảnh TOEIC.", sh: "Nghe và nhắc lại 3 câu mẫu." };
let SEARCH_INDEX = null;
function searchIndex() {
  if (SEARCH_INDEX) return SEARCH_INDEX;
  SEARCH_INDEX = [...TENSES, ...GRAMMAR].map(t => ({ k: norm(t.name + " " + t.en), label: t.name, kind: "Ngữ pháp", go: () => App.go("grammar", t.id) }))
    .concat(VOCAB.map(v => ({ k: norm(v.name + " " + v.en), label: v.name, kind: "Bộ từ", go: () => App.go("vocab", { learn: v.id }) })))
    .concat(VOCAB.flatMap(v => v.words.map(w => ({ k: norm(w[0] + " " + w[3]), label: w[0] + " – " + w[3], kind: "Từ", go: () => wordListModal(v.id) }))));
  return SEARCH_INDEX;
}
function achHTML() {
  const now = new Date();
        const mon = new Date(now); mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
        const wkd = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((l, i) => { const d = new Date(mon); d.setDate(mon.getDate() + i); const k = dkey(d); return { l, m: Math.round((S.study[k] || 0) / 60), on: k === today() }; });
        const mx = Math.max(10, ...wkd.map(x => x.m)), q = QUOTES[Math.floor(Date.now() / 864e5) % QUOTES.length];
        return `<section class="ach"><h2>Thành tích</h2>
        <div class="ach-grid">
          <div class="ach-t blue big"><b class="num">${S.streak.count}<small>/${Math.max(S.streak.best, 7)}</small></b><span>Chuỗi ngày học</span>${icon("flame")}</div>
          <div class="ach-t mint"><b class="num">${learnedCount()}</b><span>Từ đã học</span>${icon("cards")}</div>
          <div class="ach-t cream"><b class="num">${masteredCount()}</b><span>Từ đã thuộc</span>${icon("check")}</div>
          <div class="ach-t cream"><b class="num">${S.xp}</b><span>Điểm XP</span>${icon("spark")}</div>
        </div>
        <h2 class="ach-c">Phút học trong tuần</h2>
        <div class="ach-week">${wkd.map(x => `<div class="${x.on ? "on" : ""}"><i style="height:${x.m ? Math.max(14, Math.round(x.m / mx * 100)) : 0}%">${x.m ? `<b class="num">${x.m}</b>` : ""}</i><span>${x.l}</span></div>`).join("")}</div>
        </section>
        <section class="quote-card"><h2>Câu nói mỗi ngày</h2><div class="qc-box"><b>${esc(q[0])}</b><span>${esc(q[1])}</span></div></section>`;
}
App.views.stats = function (el) {
  const d = typeof planData === "function" ? planData() : null;
  el.innerHTML = `<div class="stats-pg">${achHTML()}</div>`;
};
App.views.home = function (el) {
  if (isHsk()) return hskHome(el);
  const nt = nextTask(), band = nt ? nt.band : 0;
  const wk = nt ? { w: nt.label, tasks: nt.dayObj.tasks } : { w: "Đã hoàn thành lộ trình", tasks: PLAN[PLAN.length - 1].days[6].tasks };
  const infos = wk.tasks.map(t => ({ ...taskInfo(t), type: t[0] }));
  const doneN = infos.filter(x => x.done).length, cur = infos.findIndex(x => !x.done);
  const tasks = dailyTasks(), due = dueKeys().length, checked = S.streak.last === today();
  const now = new Date(), wd = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][now.getDay()];
  el.innerHTML = `
  <div class="hm">
    <div>
      <div class="hero"><span class="hero-tag">${now.getHours() < 11 ? "Buổi sáng" : now.getHours() < 18 ? "Buổi chiều" : "Buổi tối"}</span>
        <h1>Hi ${esc((S.profile.name || "bạn").trim().split(/\s+/).slice(-2).join(" "))}</h1>
        <p>${nt ? "Chào mừng trở lại, cùng học một chút nhé!" : "Bạn đã xong lộ trình. Làm thêm một đề nhé!"}</p>
        <button class="hero-go" id="hero-go">${doneN && doneN < infos.length ? "Học tiếp bài hôm nay" : "Bắt đầu bài học"}</button>
        <div class="hprog"><div class="hpr-ring" style="--p:${pct(doneN, infos.length)}"><b class="num">${pct(doneN, infos.length)}<small>%</small></b></div>
          <div class="hpr-main"><div class="hpr-top"><span>Tiến độ hôm nay</span><b class="num">${doneN}/${infos.length} bước</b></div>
            <div class="hpr-seg">${infos.map((f, i) => `<i class="${f.done ? "ok" : i === cur ? "cur" : ""}" title="${esc(f.title)}"></i>`).join("")}</div>
            <div class="hpr-next">${cur < 0 ? "Xong hết bài hôm nay rồi" : "Tiếp theo: <b>" + esc(infos[cur].title) + "</b>"}</div></div></div></div>
      <div class="hm-row">
        <div class="todo"><span class="tape"><i></i><i></i><i></i></span><span class="todo-av">${Avatars.svg(S.profile.avatar || "basket", 64)}</span><small>VIỆC HÔM NAY · <span class="num">${tasks.filter(t => t.done).length}/${tasks.length}</span></small>
          <ul class="tlist">${tasks.slice(0, 4).map((t, i) => `<li class="${t.done ? "done" : ""}"><button data-t="${i}"><span class="cb">${t.done ? icon("check") : ""}</span><span class="t">${t.t}</span></button></li>`).join("")}</ul></div>
        <a class="stk" href="#roadmap"><span>Học theo</span><b>LỘ TRÌNH</b></a>
      </div>
      <div class="hm-mini"><div class="mini"><small>STREAK</small><b class="num">${S.streak.count} ${icon("flame")}</b></div>
        <div class="mini grow"><small>HÔM NAY</small><b>Ôn từ <span class="num">${due}</span></b><button class="mini-b" id="mini-check">${checked ? "Ôn ngay" : "Điểm danh"}</button></div></div>
      <div hidden>
      ${S.settings.guide === false ? "" : `<div class="guide"><button class="guide-x" id="guide-x" aria-label="Ẩn hướng dẫn">${icon("x")}</button><b>Dùng trang này thế nào?</b>
        <ol><li><span>1</span><div><b>Làm Test band</b> để trang xếp lộ trình đúng trình độ của bạn. <a href="#placement">Làm ngay</a></div></li>
        <li><span>2</span><div><b>Mỗi ngày bấm thẻ đang tô màu</b> bên dưới để học bài của ngày, rồi làm lần lượt các thẻ kế tiếp.</div></li>
        <li><span>3</span><div><b>Điểm danh</b> ở cột Hôm nay để ôn từ cũ; giữa và cuối tuần có đề luyện.</div></li></ol></div>`}
      <div class="hm-head"><h1>Lộ trình của tôi</h1>
        <div class="search">${icon("search")}<input id="q" type="search" placeholder="Tìm bài, ngữ pháp, từ vựng…" autocomplete="off" aria-label="Tìm kiếm"><div class="res" id="q-res"></div></div></div>
      <div class="hm-stats">
        <div class="rail"><button class="on" aria-label="Lộ trình">${icon("route")}</button><button id="r-list" aria-label="Tất cả các chặng">${icon("list")}</button></div>
        <div class="sbox blue"><b class="num">${infos.length}</b>Việc trong ngày</div>
        <div class="sbox green big"><b class="num">${doneN}</b>Đã xong</div>
        <div class="sbox dash"><b class="num">${infos.length - doneN}</b>Còn lại</div>
        <div class="sbox dash" id="goal" style="cursor:pointer" role="button" tabindex="0"><b class="num">${S.profile.current} → ${S.profile.target}</b>Điểm mục tiêu</div>
      </div>
      </div>
      <div class="stage-h"><span>${esc(wk.w)}</span><a href="#roadmap">Xem cả lộ trình →</a></div>
      <div class="path">${infos.map((f, i) => `<button class="node ${f.done ? "done" : i === cur ? "now" : "later"}" data-n="${i}">
        <i class="sheet"></i><i class="face"></i><span class="corner">${f.done ? icon("check") : i === cur ? iconFill("play") : icon("lock")}</span>
        <h3>${esc(f.title.split(" · ").slice(1).join(" · ") || f.title)}</h3><span class="kind">${esc(f.title.includes(" · ") ? f.title.split(" · ")[0] : "Kiểm tra")} · ${esc(f.sub)}</span>
        <p>${TASK_DESC[f.type]}</p>
        <span class="foot">${i === cur ? `<span class="pillb">${icon("clock")} Bắt đầu học</span>` : `<span class="pillb soon">${f.done ? "Đã xong" : "Sắp tới"}</span>`}</span></button>`).join("")}</div>
    </div>
    <aside class="today" hidden>
      <h2>Hôm nay</h2>
      <div class="tcard blue"><div class="th"><i>${icon("cards")}</i>Ôn từ vựng<small class="num">${wd}, ${pad(now.getDate())}.${pad(now.getMonth() + 1)}</small></div>
        <div class="tin">${due ? `<b class="num">${due}</b> từ đã đến hạn ôn.` : learnedCount() ? "Hôm nay không còn từ nào đến hạn." : "Từ vựng sẽ xuất hiện ở đây sau khi bạn học một bộ từ."}</div>
        <button class="tbtn" id="t-check">${checked ? (due ? "Ôn ngay" : "Ôn tự do") : "Điểm danh & ôn"} ${icon("right")}</button></div>
      <div class="tcard lilac"><div class="th"><i>${icon("book")}</i>Bài học<small class="num">${doneN}/${infos.length} bước</small></div>
        <div class="tin">${nt ? `<b>${esc(nt.info.title)}</b><br>${esc(nt.info.sub)}` : "Đã hoàn thành lộ trình."}</div>
        <button class="tbtn" id="t-start">Bắt đầu ${icon("right")}</button></div>
      <div class="tcard green"><div class="th"><i>${icon("clock")}</i>Đồng hồ học<small id="timer-phase"></small></div>
        <div class="tin row"><b class="num" id="timer-face" style="font-size:24px;flex:1">${Timer.face()}</b><button class="btn sm" id="timer-mode">${Timer.mode === "pomo" ? "Pomodoro" : "Bấm giờ"}</button></div>
        <div class="row"><button class="tbtn" id="timer-toggle" style="flex:1"></button><button class="tbtn" id="timer-reset" aria-label="Đặt lại" style="width:40px">${icon("refresh")}</button></div></div>
    </aside>
  </div>`;
  $$("[data-n]", el).forEach(b => b.onclick = () => infos[+b.dataset.n].open());
  $("#hero-go").onclick = () => $("#t-start").click();
  $("#mini-check").onclick = () => $("#t-check").click();
  $$("[data-t]", el).forEach(b => b.onclick = () => tasks[+b.dataset.t].go());
  $("#r-list").onclick = () => App.go("roadmap");
  $("#goal").onclick = openGoal;
  if ($("#guide-x")) $("#guide-x").onclick = () => { S.settings.guide = false; save(); App.render(); };
  $("#t-check").onclick = doCheckIn;
  $("#t-start").onclick = nt ? nt.info.open : () => App.go("exam");
  $("#timer-mode").onclick = () => { Timer.setMode(Timer.mode === "pomo" ? "study" : "pomo"); App.render(); };
  $("#timer-toggle").onclick = () => Timer.running ? Timer.pause() : Timer.start();
  $("#timer-reset").onclick = () => Timer.reset();
  Timer.ui();
  const q = $("#q"), res = $("#q-res");
  q.oninput = () => {
    const v = norm(q.value);
    const hits = v.length < 2 ? [] : searchIndex().filter(x => x.k.includes(v)).slice(0, 7);
    res.classList.toggle("open", v.length >= 2);
    res.innerHTML = hits.length ? hits.map((h, i) => `<button data-h="${i}"><span>${esc(h.label)}</span><small>${h.kind}</small></button>`).join("") : `<div class="muted small" style="padding:8px 10px">Không tìm thấy kết quả.</div>`;
    $$("[data-h]", res).forEach(b => b.onclick = () => hits[+b.dataset.h].go());
  };
  App.keyHandler = e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); q.focus(); } else if (e.key === "Escape") res.classList.remove("open"); };
};

/* ===== Lộ trình ===== */
App.views.roadmap = function (el, arg) {
  const route = routeBands();
  let sel = typeof arg === "number" ? arg : route[0];
  const draw = () => {
    const b = BANDS[sel], pr = bandProgress(sel);
    el.innerHTML = `
    <div class="grid">
      <section class="glass page-h">
        <div><h1>Lộ trình học theo band</h1><p>Mỗi band gồm 2 tuần: từ vựng theo chủ đề và theo Part, ngữ pháp có bài tập, luyện dịch, shadowing và đề luyện. Nhiệm vụ tự đánh dấu hoàn thành khi bạn học xong.</p></div>
        <div class="row"><span class="chip">Hiện tại <b class="num">&nbsp;${S.profile.current}</b></span>${icon("right")}<span class="chip accent">Mục tiêu <b class="num">&nbsp;${S.profile.target}</b></span><button class="btn sm" id="edit-goal">${icon("pen")} Sửa</button></div>
      </section>
      ${planHTML()}
      <div class="bands">${BANDS.map(x => { const p = bandProgress(x.id); return `<button class="band-pick ${x.id === sel ? "on" : ""}" data-b="${x.id}">
        <span class="row"><span class="bn">Band ${x.id}</span><span class="spacer"></span>${route.includes(x.id) ? '<span class="chip accent">Lộ trình của bạn</span>' : ""}</span>
        <span class="bs num">${x.range} · ${x.label}</span>${bar(pct(p.done, p.total))}<span class="bs num">${p.done}/${p.total} nhiệm vụ</span></button>`; }).join("")}</div>
      <section class="glass card">
        <div class="card-h"><div><h2>Band ${b.id} · ${b.label} <span class="muted num" style="font-weight:500">(${b.range})</span></h2><p class="muted small" style="margin-top:4px;max-width:70ch">${b.desc}</p></div><span class="chip ${pr.done === pr.total ? "good" : "accent"} num">${pct(pr.done, pr.total)}% hoàn thành</span></div>
        ${ROADMAP[sel].map((wk, wi) => `<div class="week-block"><h3 style="margin-bottom:10px">${esc(wk.w)}</h3><div class="grid g2" style="gap:10px">${wk.tasks.map((t, ti) => { const f = taskInfo(t); return `<button class="rtask ${f.done ? "done" : ""}" data-w="${wi}" data-ti="${ti}"><span class="ti">${f.done ? icon("check") : icon(f.icon)}</span><span><div class="tt">${esc(f.title)}</div><div class="ts">${esc(f.sub)}</div></span>${icon("right")}</button>`; }).join("")}</div></div>`).join("")}
      </section>
      <section class="glass card">
        <h3 style="margin-bottom:8px">Nhịp học mỗi ngày (khoảng 60–90 phút)</h3>
        <div class="grid g3 small">
          <div class="note"><b>Sáng · 20'</b><br>Điểm danh, ôn từ đến hạn, học 10 từ mới.</div>
          <div class="note"><b>Trưa · 20'</b><br>1 chủ điểm ngữ pháp + bài tập; dịch 3 câu.</div>
          <div class="note"><b>Tối · 30'</b><br>Shadowing 3 câu; 1 đề luyện theo Part. Cuối tuần làm Mini test tổng hợp.</div>
        </div>
      </section>
    </div>`;
    $$("[data-b]", el).forEach(x => x.onclick = () => { sel = +x.dataset.b; draw(); });
    $$("[data-w]", el).forEach(x => x.onclick = () => taskInfo(ROADMAP[sel][+x.dataset.w].tasks[+x.dataset.ti]).open());
    $("#edit-goal").onclick = openGoal;
    $$("[data-daily]", el).forEach(x => x.onclick = () => { S.settings.daily = +x.dataset.daily; save(); draw(); });
  };
  draw();
};

/* ===== Mục tiêu & cài đặt ===== */
function openGoal() {
  modal(`<h2>Trình độ & mục tiêu</h2>
    <p class="muted small" style="margin:6px 0 16px">Điểm TOEIC Listening + Reading (10–990). Lộ trình và bài học hôm nay sẽ tự điều chỉnh theo.</p>
    <div class="grid g2" style="gap:12px">
      <label class="field" for="g-cur">Điểm hiện tại<input class="input num" id="g-cur" type="number" min="10" max="990" step="5" value="${S.profile.current}"></label>
      <label class="field" for="g-tgt">Điểm mục tiêu<input class="input num" id="g-tgt" type="number" min="10" max="990" step="5" value="${S.profile.target}"></label>
    </div>
    <div class="row" style="margin-top:18px;justify-content:flex-end"><button class="btn" data-close>Hủy</button><button class="btn primary" id="g-save">Lưu</button></div>`,
    (m, close) => {
      $("#g-save", m).onclick = () => {
        const c = clamp(+$("#g-cur", m).value || 10, 10, 990), t = clamp(+$("#g-tgt", m).value || 990, 10, 990);
        S.profile.current = c; S.profile.target = t; save(); close(); App.render(); toast("Đã cập nhật mục tiêu");
      };
    });
}
function applyMode() {
  const st = S.settings, r = document.documentElement;
  let m = st.mode || "light";
  if (m === "auto") m = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const tone = m;
  // Nền "Đêm sương": trang Hôm nay là kính tối mờ, các trang học là tờ giấy caro
  if ((st.bg || "night") === "night" && st.ui !== "journal2" && (["home", "stats"].includes(document.body.dataset.view) || document.querySelector("#view .vboard"))) m = "dark";
  r.dataset.mode = m;
  r.dataset.tone = tone;
}
function applySettings() {
  if (S.settings.themeV !== 6) { Object.assign(S.settings, { themeV: 6, mode: "light", accent: "sakura", art: S.settings.art || "mist" }); }
  if (S.settings.bg !== "night" || S.settings.ui !== "clean") { Object.assign(S.settings, { bg: "night", ui: "clean" }); try { save(); } catch (e) { } }
  const st = S.settings, r = document.documentElement;
  if (true) r.dataset.accent = st.accent; else delete r.dataset.accent;
  r.dataset.ui = "clean";
  r.dataset.bg = "night";
  applyMode();
  BgArt.set(st.art || "mist"); BgArt.look(st.bgblur == null ? (st.art === "photo" ? 1 : 0) : st.bgblur, st.bgdim == null ? st.art === "photo" : st.bgdim);
  if (st.accent === "custom" && st.custom) r.style.setProperty("--c", st.custom); else r.style.removeProperty("--c");
  Scene.set({ mode: st.scene || "auto", weather: st.weather || "petals" });
}
function openSettings() {
  const st = S.settings;
  const opt = (name, val, label) => `<button class="${(st[name] || { bg: "night", ui: "clean", mode: "light", art: "mist" }[name]) === val ? "on" : ""}" data-set="${name}" data-val="${val}">${label}</button>`;
  modal(`<h2>Cài đặt</h2>
    <div class="stack" style="margin-top:16px;gap:16px">
      <label class="field" for="s-name">Tên hiển thị<input class="input" id="s-name" value="${esc(S.profile.name)}" maxlength="40"></label>
      <div class="field">Chế độ<div class="tabs">${opt("mode", "light", "Sáng")}${opt("mode", "dark", "Tối")}${opt("mode", "auto", "Theo máy")}</div></div>
      <div class="field">Nền<div class="tabs">${BgArt.NAMES.map(([k, l]) => opt("art", k, l)).join("")}<label class="tabs-file ${st.art === "photo" ? "on" : ""}">+ Ảnh của tôi<input type="file" id="s-bgfile" accept="image/*" hidden></label></div><span class="tiny">“Ảnh của tôi”: chọn một ảnh lofi/chill bạn thích trong máy làm nền. Ảnh chỉ lưu trên máy này.</span></div>
      <div class="field">Làm mờ nền<div class="tabs">${[[0, "Không"], [1, "Ít"], [2, "Nhiều"]].map(([v, l]) => `<button class="${(st.bgblur == null ? (st.art === "photo" ? 1 : 0) : st.bgblur) === v ? "on" : ""}" data-set="bgblur" data-val="${v}">${l}</button>`).join("")}<button class="${(st.bgdim == null ? st.art === "photo" : st.bgdim) ? "on" : ""}" id="s-dim">Làm tối</button></div></div>
      <div class="field">Hiệu ứng rơi<div class="tabs">${opt("weather", "petals", "Hoa rơi")}${opt("weather", "snow", "Tuyết")}${opt("weather", "rain", "Mưa")}${opt("weather", "none", "Tắt")}</div></div>
      <div class="field">Màu nhấn<div class="swatches">${[["sakura", "#e39aa6", "#f6d0d3", "Hồng anh đào"], ["coral", "#ec9a6a", "#f6cfa6", "Cam san hô"], ["yellow", "#dcb650", "#f3e6a2", "Vàng"], ["lime", "#a3c57e", "#dfe9a3", "Xanh chanh"], ["sky", "#76b7f5", "#a9dcd6", "Xanh trời"], ["sunset", "#a998e3", "#f0e3a4", "Hoàng hôn"], ["red", "#c9403c", "#f7c4c0", "Đỏ"], ["wine", "#8e3048", "#ecc3cc", "Đỏ rượu vang"], ["brown", "#8d6142", "#e8d3bf", "Nâu"], ["tiffany", "#3fb0a6", "#81d8d0", "Tiffany blue"], ["jade", "#3e9f78", "#a8e0c4", "Xanh ngọc"], ["navy", "#34508f", "#c3cfe8", "Xanh navy"]].map(([k, c, d, n]) => `<button class="${({ green: "sakura", ocean: "sky", orange: "coral" }[st.accent] || st.accent || "sakura") === k ? "on" : ""}" data-set="accent" data-val="${k}" style="background:linear-gradient(90deg, ${c} 50%, ${d} 50%)" aria-label="Màu ${n}" title="${n}"></button>`).join("")}<label class="custom-c ${st.accent === "custom" ? "on" : ""}" title="Màu tự chọn"><input type="color" id="s-color" value="${st.custom || "#dcea9d"}" aria-label="Màu tự chọn"></label></div><span class="tiny">Ô cuối cùng để tự chọn màu chủ đạo của riêng bạn.</span></div>
      <div class="field">Tốc độ đọc mặc định<div class="tabs">${[0.8, 1, 1.2].map(v => `<button class="${(st.rate || 1) === v ? "on" : ""}" data-set="rate" data-val="${v}">${v}x</button>`).join("")}</div></div>
      <div class="field">Giọng đọc tiếng Anh<select id="set-voice" style="width:100%;margin-top:6px;padding:10px 12px;border-radius:14px;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.9);color:#26303a;font:inherit"><option value="">Tự động (app tự chọn giọng tự nhiên nhất)</option>${Speech.choices().map(([v, l]) => `<option value="${esc(v)}" ${st.voice === v ? "selected" : ""}>${esc(l)}</option>`).join("")}</select><div class="note small" style="margin-top:6px">Chọn xong app đọc thử một câu. Danh sách giọng tùy theo máy và trình duyệt bạn đang dùng.</div></div>
      <div class="note small">${Store.ref ? "Tiến độ được đồng bộ với tài khoản Claude của bạn, mở trên máy khác vẫn còn." : "Tiến độ đang lưu trên trình duyệt này."}</div>
      <div class="row"><button class="btn sm" id="s-reset" style="color:var(--bad)">Xóa toàn bộ tiến độ</button><span class="spacer"></span><button class="btn primary" data-close>Xong</button></div>
    </div>`, (m, close) => {
    $("#s-name", m).oninput = e => { S.profile.name = e.target.value.trim() || "bạn"; save(); };
    $("#set-voice", m).onchange = e => { S.settings.voice = e.target.value; save(); Speech.say("The meeting has been moved to Friday morning."); };
    $$("[data-set]", m).forEach(b => b.onclick = () => {
      const k = b.dataset.set; let v = b.dataset.val; if (k === "rate" || k === "bgblur") v = +v;
      S.settings[k] = v; save(); applySettings();
      $$(`[data-set="${k}"]`, m).forEach(x => x.classList.toggle("on", x === b));
    });
    $("#s-dim", m).onclick = e => { S.settings.bgdim = !(S.settings.bgdim == null ? S.settings.art === "photo" : S.settings.bgdim); save(); applySettings(); e.currentTarget.classList.toggle("on", S.settings.bgdim); };
    $("#s-bgfile", m).onchange = e => { const f = e.target.files[0]; if (!f) return; const img = new Image(), url = URL.createObjectURL(f);
      img.onload = () => { const k = Math.min(1, 1600 / Math.max(img.width, img.height)), c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
        try { localStorage.setItem("toeicpath.bg", c.toDataURL("image/jpeg", .82)); S.settings.art = "photo"; save(); BgArt.set("photo", true); applySettings(); $$('[data-set="art"]', m).forEach(x => x.classList.remove("on")); e.target.parentNode.classList.add("on"); toast("Đã đặt ảnh của bạn làm nền"); }
        catch (err) { toast("Ảnh quá lớn, không lưu được. Hãy thử ảnh nhỏ hơn."); } };
      img.onerror = () => toast("Không đọc được ảnh này."); img.src = url; };
    $("#s-color", m).oninput = e => { S.settings.custom = e.target.value; S.settings.accent = "custom"; save(); applySettings(); $$('[data-set="accent"]', m).forEach(x => x.classList.remove("on")); e.target.parentNode.classList.add("on"); };
    $("#s-reset", m).onclick = e => {
      if (e.target.dataset.armed) { const keep = { profile: S.profile, settings: S.settings }; S = Object.assign(DEFAULT(), keep); save(); close(); App.render(); toast("Đã xóa tiến độ"); }
      else { e.target.dataset.armed = "1"; e.target.textContent = "Bấm lần nữa để xác nhận xóa"; }
    };
    m.addEventListener("click", ev => { if (ev.target.closest("[data-close]")) App.render(); });
  });
}

/* ===== Khởi động ===== */
function boot() {
  applySettings();
  Speech.init();
  initCaps();
  App.show(location.hash.slice(1) || "home");
  Store.connect();
}
window.addEventListener("DOMContentLoaded", boot);
