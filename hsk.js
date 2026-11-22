/* ===== Chế độ HSK: trang chủ, lộ trình, từ vựng, luyện viết chữ Hán ===== */
Object.assign(POS_VI, { "pron.": "đại từ", "num.": "số từ", "mw.": "lượng từ", "aux.": "trợ động từ", "part.": "trợ từ", "interj.": "thán từ", "idiom": "thành ngữ", "v./n.": "động từ / danh từ" });
const isZh = t => /[㐀-鿿]/.test(t || "");
const pad2 = n => String(n).padStart(2, "0");

/* ---- Nét chữ: tải thư viện và dữ liệu nét theo từng cấp khi cần ---- */
const Hz = {
  libP: null, lvP: {},
  add(src) { return new Promise((ok, no) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); }); },
  async need(text) {
    if (!this.libP) this.libP = Promise.all([this.add("js/vendor/hanzi-writer.min.js"), this.add("js/hz-index.js")]).catch(e => { this.libP = null; throw e; });
    await this.libP;
    const lvs = new Set([...text].filter(isZh).map(c => Object.keys(HZ_IDX).find(l => HZ_IDX[l].includes(c))).filter(Boolean));
    await Promise.all([...lvs].map(l => this.lvP[l] || (this.lvP[l] = this.add("js/hz-" + l + ".js").catch(e => { delete this.lvP[l]; throw e; }))));
  },
  async mount(box, text, { size = 84, play = true, quiz = false, onDone } = {}) {
    const chars = [...text].filter(isZh);
    box.innerHTML = chars.map(() => `<span class="hz-cell" style="width:${size}px;height:${size}px"></span>`).join("");
    try { await this.need(text); } catch (e) { box.innerHTML = `<small class="muted">Không tải được dữ liệu nét chữ, thử lại sau.</small>`; return []; }
    if (!box.isConnected) return [];
    const D = window.HZDATA || {}, ink = getComputedStyle(document.documentElement).getPropertyValue("--accent-deep").trim() || "#e39aa6";
    const ws = chars.map((c, i) => D[c] ? HanziWriter.create(box.children[i], c, { width: size, height: size, padding: size > 100 ? 10 : 6, showOutline: true, showCharacter: !quiz && !play, strokeColor: "#3a3340", outlineColor: "#e4ddd0", drawingColor: ink, highlightColor: ink, strokeAnimationSpeed: 1.1, delayBetweenStrokes: 140, drawingWidth: Math.max(16, size / 6), charDataLoader: (ch, done) => done(D[ch]) }) : null);
    const run = async () => { for (const w of ws) { if (!box.isConnected) return; if (w) { w.hideCharacter(); await w.animateCharacter(); } } };
    if (quiz) ws.forEach((w, i) => w && w.quiz({ showHintAfterMisses: 2, onComplete: () => { box.children[i].classList.add("ok"); onDone && onDone(chars[i]); } }));
    else { if (play) run(); [...box.children].forEach((c, i) => c.onclick = e => { e.stopPropagation(); ws[i] && ws[i].animateCharacter(); }); }
    box._run = run;
    return ws;
  },
  strokes(text) { const D = window.HZDATA || {}; return [...text].filter(isZh).map(c => (D[c] || { strokes: [] }).strokes.length); },
  wrote(ch) { S.hzDone = S.hzDone || {}; S.hzDone[ch] = 1; const d = S.hzDay && S.hzDay.d === today() ? S.hzDay : (S.hzDay = { d: today(), n: 0 }); d.n++; save(); },
  practice(w, list, at) {
    if (list && at == null) at = list.indexOf(w);
    const nav = list && list.length > 1 && at >= 0;
    const go = (d, close) => { close(); setTimeout(() => Hz.practice(list[(at + d + list.length) % list.length], list, (at + d + list.length) % list.length), 60); };
    modal(`<div class="row"><h2 style="flex:1">Cách viết · ${esc(w[0])}</h2>${nav ? `<span class="muted small num" style="margin-right:8px">${at + 1}/${list.length}</span>` : ""}<button class="btn sm ghost icon-btn" data-close aria-label="Đóng">${icon("x")}</button></div>
      <p class="muted small" style="margin:4px 0 12px">${[w[1], POS_VI[w[2]] || w[2], w[3]].filter(Boolean).map(esc).join(" · ")} <span id="hz-n"></span></p>
      <div class="tabs" style="margin-bottom:12px"><button class="on" data-hzm="see">Xem thứ tự nét</button><button data-hzm="write">Tự viết</button></div>
      <div class="hz-row big" id="hz-big"></div>
      <p class="muted small" id="hz-tip" style="margin:10px 0 12px"></p>
      <div class="row"><button class="btn" id="hz-again"></button>${w[1] ? sayBtn(w[0]) : ""}<span class="spacer"></span>${nav ? `<button class="btn" id="hz-prev">${icon("left")} Trước</button><button class="btn primary" id="hz-next">Chữ tiếp ${icon("right")}</button>` : ""}</div>`,
      (m, close) => {
        if (nav) { $("#hz-prev", m).onclick = () => go(-1, close); $("#hz-next", m).onclick = () => go(1, close); }
        const box = $("#hz-big", m), size = Math.min(150, Math.floor((Math.min(innerWidth, 520) - 80) / Math.min(3, [...w[0]].length)));
        let mode = Hz.mode || "see";
        $$("[data-hzm]", m).forEach(x => x.classList.toggle("on", x.dataset.hzm === mode));
        const draw = async () => {
          $("#hz-tip", m).textContent = mode === "see" ? "Chạm vào một chữ để xem lại nét của chữ đó." : "Viết từng nét theo đúng thứ tự bằng ngón tay hoặc chuột. Sai 2 lần app sẽ gợi ý nét tiếp theo.";
          $("#hz-again", m).innerHTML = icon("refresh") + (mode === "see" ? " Xem lại" : " Viết lại");
          let left = [...w[0]].filter(isZh).length;
          await Hz.mount(box, w[0], { size, play: mode === "see", quiz: mode === "write", onDone: ch => { Hz.wrote(ch); if (--left <= 0 && nav && $("#hz-next", m)) { $("#hz-tip", m).textContent = "Viết đúng rồi! Đang chuyển sang chữ tiếp…"; $("#hz-next", m).classList.add("pulse"); setTimeout(() => { if (m.isConnected && $("#hz-next", m)) $("#hz-next", m).click(); }, 1300); } } });
          const n = Hz.strokes(w[0]); if (n.length) $("#hz-n", m).textContent = "· " + n.join(" + ") + " nét";
        };
        $$("[data-hzm]", m).forEach(b => b.onclick = () => { mode = Hz.mode = b.dataset.hzm; $$("[data-hzm]", m).forEach(x => x.classList.toggle("on", x === b)); draw(); });
        $("#hz-again", m).onclick = draw;
        if (nav) m.addEventListener("keydown", e => { if (e.key === "ArrowRight") go(1, close); else if (e.key === "ArrowLeft") go(-1, close); });
        draw();
      });
  }
};

/* ---- Lộ trình: mỗi cấp chia tuần, mỗi tuần 6 ngày học mới + 1 ngày ôn ---- */
const hskOk = s => !!(S.sets[s.id] && S.sets[s.id].learned);
const HSK = (() => {
  const lv = HSK_LEVELS.map(l => ({ ...l, sets: l.ids.map(id => VOCAB_BY_ID[id]).filter(Boolean) }));
  let day = 0; lv.forEach(l => { l.first = day + 1; l.sets.forEach(s => { s.day = ++day; s.lvl = l; }); });
  return { lv, total: day, all: lv.flatMap(l => l.sets) };
})();
let hskNext = () => HSK.all.find(s => !hskOk(s)) || null;
const hskWords = () => HSK.all.filter(hskOk).reduce((a, s) => a + s.words.length, 0);
let hskGoNext = () => { const s = hskNext(); s ? App.go("hsk", { learn: s.id }) : App.go("hvocab", { review: true, free: true }); };
const baseName = s => s.name.replace(/ · (lần )?\d+\/\d+$/, "");

function hskSheet(s) {
  modal(`<div class="row"><h2 style="flex:1">Ngày ${pad2(s.day)} · ${esc(s.name)}</h2><button class="btn sm ghost icon-btn" data-close aria-label="Đóng">${icon("x")}</button></div>
    <p class="muted small" style="margin:4px 0 10px">${esc(s.lvl.name)} · ${s.words.length} từ · chạm chữ Hán để xem cách viết</p>
    <div class="hsk-list">${s.words.map((w, i) => `<div class="word-row"><div><button class="hsk-hz" data-hz="${i}">${esc(w[0])}</button><div class="muted tiny">${esc(w[1])} · ${esc(POS_VI[w[2]] || w[2])}</div></div><div class="small">${esc(w[3])}</div>${sayBtn(w[0])}</div>`).join("")}</div>
    <button class="btn primary" id="hsk-start" style="width:100%;margin-top:14px">${hskOk(s) ? "Học lại" : "Bắt đầu học"}</button>`,
    (m, close) => {
      $("#hsk-start", m).onclick = () => { close(); App.go("hsk", { learn: s.id }); };
      $$("[data-hz]", m).forEach(b => b.onclick = () => { close(); Hz.practice(s.words[+b.dataset.hz], s.words); });
    });
}
function levelTabs(li, id) {
  return `<div class="tabs hsk-lvt">${HSK.lv.map((l, i) => `<button class="${i === li ? "on" : ""}" data-${id}="${i}">${l.lv === 7 ? "HSK 7–9" : "HSK " + l.lv} <small class="num">${l.sets.reduce((a, x) => a + x.words.length, 0)} từ</small></button>`).join("")}</div>`;
}
function hskHead(title, sub) {
  return `<div class="hsk-top"><div><span class="hsk-zh">汉语 · HSK 3.0</span><h1>${title}</h1><p>${sub}</p></div><div class="hsk-stat"><b class="num">${hskWords()}</b><span>/ ${HSK.all.reduce((a, s) => a + s.words.length, 0)} từ đã học</span></div></div>`;
}
const HSK_DESC = {
  1: "Giao tiếp đơn giản, ngắn gọn về các chủ đề quen thuộc: thông tin cá nhân, sinh hoạt hằng ngày, ăn uống, đi lại, sở thích.",
  2: "Trao đổi cơ bản về gia đình, học tập, mua sắm, ăn uống, cảm xúc cá nhân và các kế hoạch đơn giản.",
  3: "Hoàn thành giao tiếp hằng ngày về cuộc sống, học tập và công việc; kể lại trải nghiệm và nêu ý kiến đơn giản.",
  4: "Giao tiếp tương đối độc lập trong học tập, công việc và đời sống; nghe, nói, đọc, viết khá chuẩn và dịch được nội dung đơn giản.",
  5: "Trao đổi trôi chảy về các chủ đề xã hội, kinh tế, văn hóa; đọc hiểu văn bản dài, trình bày và lập luận rõ ràng.",
  6: "Thảo luận sâu và phong phú về công việc, nghiên cứu và các vấn đề xã hội; đọc được báo chí và tài liệu chuyên ngành.",
  7: "Dùng tiếng Trung ở trình độ cao trong học thuật, chuyên môn, dịch thuật và nghiên cứu."
};
const HSK_CUM = (() => { const o = {}; let c = 0; HSK.lv.forEach(L => { c += L.sets.reduce((a, s) => a + s.words.length, 0); o[L.lv] = c; }); return o; })();
const hpNew = P => P.L.sets.reduce((a, s) => a + s.words.length, 0);
const hpTasks = d => d.kind === "study" && d.no > 1 ? pdTasks(d).concat([{ k: "rv", t: "Ôn tập · Từ đến hạn", sub: `${dueKeys().length} từ đến hạn hôm nay`, done: !dueKeys().length, go: () => App.go("hsk", { review: true, free: !dueKeys().length }) }]) : pdTasks(d);
App.views.hsk = function (el, arg) {
  if (arg && (arg.learn || arg.review)) return App.views.vocab(el, arg);
  const nd = hskNextDay();
  let li = arg && arg.lv != null ? arg.lv : nd ? HPLAN.findIndex(p => p.days.includes(nd)) : 0;
  let openW = null, openD = nd ? nd.no : null;
  const IC = { v: "cards", g: "book", w: "pen", x: "exam", wk: "refresh", gr: "book", rv: "refresh", ex: "target" };
  const draw = () => {
    const P = HPLAN[li], L = P.L, dn = P.days.filter(pdDone).length, nNew = hpNew(P), nG = HG.filter(g => g.lv === L.lv).length;
    if (openW == null) { const w = P.weeks.find(w => w.days.includes(nd)); openW = w ? w.no : 1; }
    const left = P.days.length - dn, fin = addDays(today(), left), mins = left * 50;
    const weekHTML = w => {
      const all = w.days, done = all.filter(pdDone).length, p = pct(done, all.length), on = openW === w.no, cur = all.includes(nd);
      return `<div class="wk-item ${on ? "open" : ""}">
        <button class="wk-head" data-w="${w.no}" aria-expanded="${on}">
          <span class="wk-ring ${p === 100 ? "full" : ""}" style="--p:${p}"><b class="num">${p === 100 ? icon("check") : p + "%"}</b></span>
          <span class="wk-t"><b>${w.topics.map(esc).join(" · ")}</b><small class="num">Tuần ${w.no} · Ngày ${pad2(all[0].no)}–${pad2(all[all.length - 1].no)} · ${done}/${all.length} ngày · ${esc(lvLabel(L.lv))}</small></span>
          ${cur ? '<span class="chip accent">Đang học</span>' : ""}<span class="chev">${icon("right")}</span>
        </button>
        ${on ? `<div class="wk-days">${all.map(d => {
          const ts = hpTasks(d), n = ts.filter(x => x.done).length, full = pdDone(d), isCur = d === nd, od = openD === d.no;
          return `<div class="day ${isCur ? "cur" : ""} ${full ? "full" : ""}">
            <button class="day-head" data-d="${d.no}" aria-expanded="${od}"><span class="day-no"><small>NGÀY</small><b class="num">${full ? icon("check") : d.no}</b></span><span class="day-t">${esc(pdTitle(d))}${d.kind === "study" ? `<small class="day-zh">${d.set.words.slice(0, 6).map(x => esc(x[0])).join(" · ")}</small>` : ""}</span>${isCur ? '<span class="chip accent">Đang học</span>' : ""}<span class="num muted">${n}/${ts.length}</span><span class="chev">${icon("right")}</span></button>
            ${od ? `<div class="day-tasks">${ts.map((f, i) => `<button class="rtask ${f.done ? "done" : ""}" data-task="${d.no}:${i}"><span class="ti">${f.done ? icon("check") : icon(IC[f.k] || "right")}</span><span><div class="tt">${esc(f.t)}</div><div class="ts">${esc(f.sub)}</div></span>${icon("right")}</button>`).join("")}${d.kind === "study" ? `<button class="rtask" data-open="${d.set.id}"><span class="ti">${icon("list")}</span><span><div class="tt">Mở trang bài Ngày ${pad2(d.no)}</div><div class="ts">Xem đủ ${d.set.words.length} từ, nghe, xem cách viết</div></span>${icon("right")}</button>` : ""}</div>` : ""}
          </div>`; }).join("")}</div>` : ""}
      </div>`;
    };
    el.innerHTML = `
    <div class="grid">
      <section class="glass page-h">
        <div><h1>Lộ trình HSK ${esc(lvLabel(L.lv).replace("HSK ", ""))} · ${P.weeks.length} tuần</h1><p>Theo đề cương HSK 3.0. Mỗi tuần 6 ngày học và 1 ngày ôn tập: mỗi ngày học từ vựng theo chủ đề, ngữ pháp (khi có bài mới), tập viết chữ Hán và bài tập nhiều dạng; cuối cấp có bài kiểm tra 30 câu. Nhiệm vụ tự đánh dấu xong khi bạn làm xong.</p></div>
        <div class="row hsk-lvpick">${HPLAN.map((x, i) => `<button class="btn sm ${i === li ? "primary" : ""}" data-lv="${i}">${esc(lvLabel(x.L.lv))}</button>`).join("")}</div>
      </section>
      <section class="glass card">
        <div class="card-h"><div><h2>${esc(L.name)}</h2><p class="muted small" style="margin-top:4px">Chủ đề: ${[...new Set(L.sets.map(baseName))].map(esc).join(" · ")}</p></div></div>
        <div class="grid g4" style="gap:10px">
          <div class="stat in"><div class="v num">${HSK_CUM[L.lv].toLocaleString("vi-VN")}</div><div class="l">từ tích lũy đến ${esc(lvLabel(L.lv))}</div></div>
          <div class="stat in"><div class="v num">${nNew.toLocaleString("vi-VN")}</div><div class="l">từ mới của cấp này · ${nG ? nG + " bài ngữ pháp" : "ôn ngữ pháp HSK 5–6"}</div></div>
          <div class="stat in"><div class="v num">${Math.round(mins / 6) / 10} giờ</div><div class="l">thời lượng còn lại (khoảng 50 phút/ngày)</div></div>
          <div class="stat in"><div class="v num">${left} ngày</div><div class="l">${left ? "xong khoảng " + fin.slice(8) + "/" + fin.slice(5, 7) + "/" + fin.slice(0, 4) : "đã xong cấp này"}</div></div>
        </div>
        <div style="margin-top:14px">${bar(pct(dn, P.days.length))}<div class="row small muted" style="margin-top:6px"><span class="num">Đã xong ${dn}/${P.days.length} ngày</span><span class="spacer"></span><span class="num">Đã học ${hskWords()} từ HSK</span></div></div>
        <div class="note small" style="margin-top:14px">${esc(lvLabel(L.lv))} yêu cầu khoảng <b class="num">${HSK_CUM[L.lv].toLocaleString("vi-VN")}</b> từ tích lũy: <b class="num">${nNew.toLocaleString("vi-VN")}</b> từ mới ở cấp này${L.lv > 1 ? ` cộng với các từ của ${L.lv === 7 ? "HSK 1–6" : L.lv === 2 ? "HSK 1" : "HSK 1–" + (L.lv - 1)}` : ""}. Từ đã học ở cấp trước được ôn lại qua mục "Ôn tập · Từ đến hạn" mỗi ngày.</div>
      </section>
      <section class="glass weeks">${P.weeks.map(weekHTML).join("")}
        <div class="wk-end">${icon("target")} Đích đến: ${esc(lvLabel(L.lv))} · ${HSK_CUM[L.lv].toLocaleString("vi-VN")} từ</div>
      </section>
    </div>`;
    $$("[data-lv]", el).forEach(b => b.onclick = () => { li = +b.dataset.lv; openW = null; draw(); });
    $$("[data-w]", el).forEach(x => x.onclick = () => { openW = openW === +x.dataset.w ? -1 : +x.dataset.w; draw(); });
    $$("[data-d]", el).forEach(x => x.onclick = () => { openD = openD === +x.dataset.d ? null : +x.dataset.d; draw(); });
    $$("[data-task]", el).forEach(x => x.onclick = () => { const [n, i] = x.dataset.task.split(":").map(Number); hpTasks(HSK.days.find(d => d.no === n))[i].go(); });
    $$("[data-open]", el).forEach(x => x.onclick = () => App.go("hday", { day: x.dataset.open }));
  };
  draw();
};

/* ---- Trang chủ HSK ---- */
function hskHome(el) {
  const nx = hskNext(), due = dueKeys().length, checked = S.streak.last === today();
  const learnedToday = HSK.all.some(s => S.sets[s.id] && S.sets[s.id].at === today());
  const wrote = S.hzDay && S.hzDay.d === today() ? S.hzDay.n : 0;
  const nd = hskNextDay();
  const tasks = [{ t: "Điểm danh & ôn từ đến hạn", done: checked && !due, go: () => doCheckIn() }].concat(nd ? pdTasks(nd).filter(x => x.k !== "rv").map(x => ({ t: x.t, done: x.done, go: x.go })) : []);
  const doneN = tasks.filter(t => t.done).length, cur = tasks.findIndex(t => !t.done);
  const ndi = nd ? HSK.days.indexOf(nd) : HSK.days.length - 6, up = HSK.days.slice(ndi, ndi + 6);
  const now = new Date(), name = esc((S.profile.name || "bạn").trim().split(/\s+/).slice(-2).join(" "));
  el.innerHTML = `
  <div class="hm hsk-home">
    <div>
      <div class="hero"><span class="hero-tag">你好 · ${now.getHours() < 11 ? "Buổi sáng" : now.getHours() < 18 ? "Buổi chiều" : "Buổi tối"}</span>
        <h1>Hi ${name}</h1>
        <p>${nd ? `Hôm nay: <b>Ngày ${pad2(nd.no)} · ${esc(pdTitle(nd))}</b>` : "Bạn đã học hết HSK 1–9. Ôn lại để nhớ lâu nhé!"}</p>
        <button class="hero-go" id="hero-go">${nd && pdTasks(nd).some(x => x.done && x.k !== "rv") ? "Học tiếp bài hôm nay" : "Bắt đầu bài học"}</button>
        <div class="hprog"><div class="hpr-ring" style="--p:${pct(doneN, tasks.length)}"><b class="num">${pct(doneN, tasks.length)}<small>%</small></b></div>
          <div class="hpr-main"><div class="hpr-top"><span>Tiến độ hôm nay</span><b class="num">${doneN}/${tasks.length} bước</b></div>
            <div class="hpr-seg">${tasks.map((t, i) => `<i class="${t.done ? "ok" : i === cur ? "cur" : ""}"></i>`).join("")}</div>
            <div class="hpr-next">${cur < 0 ? "Xong hết bài hôm nay rồi" : "Tiếp theo: <b>" + esc(tasks[cur].t) + "</b>"}</div></div></div></div>
      <div class="hm-row">
        <div class="todo"><span class="tape"><i></i><i></i><i></i></span><span class="todo-av">${Avatars.svg(S.profile.avatar || "party", 64)}</span><small>VIỆC HÔM NAY · <span class="num">${doneN}/${tasks.length}</span></small>
          <ul class="tlist">${tasks.map((t, i) => `<li class="${t.done ? "done" : ""}"><button data-t="${i}"><span class="cb">${t.done ? icon("check") : ""}</span><span class="t">${esc(t.t)}</span></button></li>`).join("")}</ul></div>
        <a class="stk" href="#hsk"><span>Học theo</span><b>LỘ TRÌNH</b></a>
      </div>
      <div class="hm-mini"><div class="mini"><small>STREAK</small><b class="num">${S.streak.count} ${icon("flame")}</b></div>
        <div class="mini grow"><small>ĐÃ HỌC</small><b><span class="num">${hskWords()}</span> từ · Ôn <span class="num">${due}</span></b><button class="mini-b" id="mini-check">${checked ? "Ôn ngay" : "Điểm danh"}</button></div></div>
      <div class="stage-h"><span>${up.length ? "Ngày " + pad2(up[0].no) + "–" + pad2(up[up.length - 1].no) : "Đã xong lộ trình"}</span><a href="#hsk">Xem cả lộ trình →</a></div>
      <div class="path">${up.map(d => { const ok = pdDone(d), now = d === nd, ts = pdTasks(d); return `<button class="node ${ok ? "done" : now ? "now" : "later"}" data-pd="${d.no}">
        <i class="sheet"></i><i class="face"></i><span class="corner">${ok ? icon("check") : now ? iconFill("play") : icon("lock")}</span>
        <h3>${esc(pdTitle(d))}</h3><span class="kind">Ngày ${pad2(d.no)}${d.kind === "study" ? " · " + d.set.words.length + " từ · " + esc(lvLabel(d.set.lvl.lv)) : ""}</span>
        <p>${ts.filter(x => x.k !== "rv").map(x => esc(x.t.split(" · ")[0])).join(" · ")}</p>
        ${d.kind === "study" ? `<p class="hsk-prev">${d.set.words.slice(0, 5).map(w => esc(w[0])).join(" · ")}</p>` : ""}
        <span class="foot">${now ? `<span class="pillb">${icon("clock")} Bắt đầu học</span>` : `<span class="pillb soon">${ok ? "Đã xong" : "Sắp tới"}</span>`}</span></button>`; }).join("")}</div>
    </div>
  </div>`;
  $("#hero-go").onclick = hskGoNext;
  $("#mini-check").onclick = doCheckIn;
  $$("[data-t]", el).forEach(b => b.onclick = () => tasks[+b.dataset.t].go());
  $$("[data-pd]", el).forEach(b => b.onclick = () => { const d = HSK.days.find(x => x.no === +b.dataset.pd); d.kind === "study" ? App.go("hday", { day: d.set.id }) : pdTasks(d)[0].go(); });
}

/* ---- Từ vựng HSK: theo cấp, gom theo chủ đề, tra từ ---- */
App.views.hvocab = function (el, arg) {
  if (arg && (arg.learn || arg.review)) return App.views.vocab(el, arg);
  let li = S.settings.hskLv != null ? S.settings.hskLv : 0, q = "";
  const draw = () => {
    const L = HSK.lv[li], m = new Map();
    L.sets.forEach(s => { const k = baseName(s); if (!m.has(k)) m.set(k, []); m.get(k).push(s); });
    const topics = [...m].map(([name, sets]) => ({ name, en: L.name, sets }));
    const st = t => { const n = t.sets.reduce((a, x) => a + x.words.length, 0), got = t.sets.filter(hskOk).reduce((a, x) => a + x.words.length, 0); return { n, got, p: pct(got, n) }; };
    const curI = topics.findIndex(t => st(t).p < 100);
    el.innerHTML = `
    <div class="vpage hskp">
      ${hskHead("Từ vựng HSK", "HSK 1–9 theo đề cương HSK 3.0 (11/2025), gom theo chủ đề · gõ chữ Hán, pinyin không dấu hoặc tiếng Việt để tra")}
      <div class="hsk-search">${icon("search")}<input id="hq" type="search" placeholder="Tra từ: 学习, xuexi, học tập…" value="${esc(q)}" autocomplete="off"></div>
      <div id="hres"></div>
      <div class="vbar">${levelTabs(li, "lv")}<div class="vbar-r"><button class="btn sm ${dueKeys().length ? "primary" : ""}" id="hv-rev">${icon("refresh")} ${dueKeys().length ? "Ôn " + dueKeys().length + " từ" : "Ôn tự do"}</button></div></div>
      <div class="vboard">${topics.map((t, ti) => { const s = st(t); return `<button class="vnote ${s.p === 100 ? "done" : ti === curI ? "cur" : ""}" data-topic="${ti}">
          <em>${esc(t.name)}</em><small class="vsub hsk-prev">${t.sets[0].words.slice(0, 4).map(w => esc(w[0])).join(" · ")}</small>
          ${s.got ? `<span class="vscore"><span class="vring num">${s.p}</span></span>` : `<small class="num">${s.n} từ · ${t.sets.length} lần học</small>`}
          ${ti === curI ? `<span class="vgo">${s.got ? "TIẾP TỤC" : "BẮT ĐẦU"}</span>` : ""}<i class="ln"></i></button>`; }).join("")}</div>
    </div>`;
    const inp = $("#hq", el), res = $("#hres", el);
    const search = () => {
      q = inp.value.trim(); if (!q) { res.innerHTML = ""; return; }
      const nq = norm(q).replace(/ /g, ""), out = [];
      for (const s of HSK.all) for (const w of s.words) {
        if (w[0].includes(q) || (nq && norm(w[1]).replace(/ /g, "").startsWith(nq)) || (nq.length > 1 && norm(w[3]).includes(norm(q)))) out.push([w, s]);
        if (out.length >= 30) break;
      }
      res.innerHTML = `<div class="glass card hsk-res">${out.length ? out.map(([w, s], i) => `<div class="word-row"><div><button class="hsk-hz" data-r="${i}">${esc(w[0])}</button><div class="muted tiny">${esc(w[1])} · ${esc(POS_VI[w[2]] || w[2])} · HSK ${s.lvl.lv}</div></div><div class="small">${esc(w[3])}</div>${sayBtn(w[0])}</div>`).join("") : `<p class="muted small">Không tìm thấy từ nào.</p>`}</div>`;
      $$("[data-r]", res).forEach(b => b.onclick = () => Hz.practice(out[+b.dataset.r][0], out.map(x => x[0])));
    };
    inp.oninput = search; if (q) search();
    $$("[data-lv]", el).forEach(b => b.onclick = () => { li = +b.dataset.lv; S.settings.hskLv = li; save(); draw(); });
    $("#hv-rev").onclick = () => App.go("hvocab", { review: true, free: !dueKeys().length });
    $$("[data-topic]", el).forEach(b => b.onclick = () => topicSheet(topics[+b.dataset.topic]));
  };
  draw();
};

/* ---- Luyện viết: các chữ Hán của từng cấp ---- */
App.views.hwrite = function (el) {
  let li = S.settings.hskLv != null ? S.settings.hskLv : 0, only = false;
  const draw = () => {
    const L = HSK.lv[li], seen = new Map();
    L.sets.forEach(s => s.words.forEach(w => [...w[0]].filter(isZh).forEach(c => { if (!seen.has(c)) seen.set(c, { w, s }); })));
    let list = [...seen]; if (only) list = list.filter(([, x]) => hskOk(x.s));
    const D = S.hzDone || {}, n = list.filter(([c]) => D[c]).length, wrote = S.hzDay && S.hzDay.d === today() ? S.hzDay.n : 0;
    el.innerHTML = `
    <div class="vpage hskp">
      ${hskHead("Luyện viết chữ Hán", "Chạm vào một chữ để xem thứ tự nét rồi tự viết lại · hôm nay đã viết " + wrote + " chữ")}
      <div class="vbar">${levelTabs(li, "lv")}<div class="vbar-r"><div class="tabs"><button class="${only ? "" : "on"}" data-only="0">Tất cả</button><button class="${only ? "on" : ""}" data-only="1">Chữ trong từ đã học</button></div></div></div>
      <p class="muted small" style="margin:6px 0 12px">${esc(L.name)} · ${list.length} chữ · đã viết đúng ${n}</p>
      ${list.length ? `<div class="hz-grid">${list.map(([c, x], i) => `<button class="hz-tile ${D[c] ? "ok" : ""}" data-c="${i}" title="${esc(x.w[0] + " · " + x.w[3])}"><b>${c}</b><small>${esc(x.w[0])}</small></button>`).join("")}</div>` : `<div class="empty">Chưa có từ nào đã học ở cấp này. Chọn "Tất cả" hoặc học một ngày trong lộ trình trước.</div>`}
    </div>`;
    $$("[data-lv]", el).forEach(b => b.onclick = () => { li = +b.dataset.lv; S.settings.hskLv = li; save(); draw(); });
    $$("[data-only]", el).forEach(b => b.onclick = () => { only = b.dataset.only === "1"; draw(); });
    const items = list.map(([c, x]) => [c, "", "", "chữ trong từ " + x.w[0] + " (" + x.w[1] + ") · " + x.w[3]]);
    $$("[data-c]", el).forEach(b => b.onclick = () => Hz.practice(items[+b.dataset.c], items, +b.dataset.c));
  };
  draw();
};

/* ===== Ngữ pháp HSK ===== */
const HG = window.HSK_GRAMMAR || [], HG_BY = Object.fromEntries(HG.map(g => [g.id, g]));
const hgDone = id => !!(S.hg && S.hg[id]);
const shuf = a => { a = a.slice(); for (let k = a.length - 1; k > 0; k--) { const r = Math.floor(Math.random() * (k + 1)); [a[k], a[r]] = [a[r], a[k]]; } return a; };
const mixOpts = q => { const ord = shuf(q.o.map((_, k) => k)); return { ...q, o: ord.map(k => q.o[k]), a: ord.indexOf(q.a) }; };
const lvLabel = lv => lv === 7 ? "HSK 7–9" : "HSK " + lv;
// bộ câu trắc nghiệm dùng chung cho bài ngữ pháp và đề luyện thi
function mcqBlock(box, qs, { pinyin = true, onSubmit } = {}) {
  let ans = {}, done = false, showPy = !!S.settings.hpy;
  const draw = () => {
    box.innerHTML = `${pinyin ? `<div class="row" style="justify-content:flex-end;margin-bottom:8px"><button class="btn sm ${showPy ? "primary" : ""}" data-py>${showPy ? "Ẩn" : "Hiện"} pinyin</button></div>` : ""}
      ${qs.map((q, i) => `<div class="qblock" data-q="${i}"><div class="qn"><span class="muted num">${i + 1}.</span> ${q.html || `<span class="zh-q">${esc(q.q)}</span>`}${pinyin && q.p ? `<div class="py-line" ${showPy ? "" : "hidden"}>${esc(q.p)}</div>` : ""}</div>
        <div class="opts two">${q.o.map((o, j) => optHTML(o, j, ans[i] === j ? "sel" : "")).join("")}</div><div class="exp"></div></div>`).join("")}
      <div class="row" style="margin-top:14px"><span class="muted small" data-st></span><span class="spacer"></span><button class="btn primary" data-sub>Nộp bài</button></div>`;
    if ($("[data-py]", box)) $("[data-py]", box).onclick = () => { showPy = S.settings.hpy = !showPy; save(); $$(".py-line", box).forEach(x => x.hidden = !showPy); $("[data-py]", box).textContent = (showPy ? "Ẩn" : "Hiện") + " pinyin"; $("[data-py]", box).classList.toggle("primary", showPy); };
    $$(".qblock", box).forEach(qb => { const i = +qb.dataset.q; $$(".opt", qb).forEach(b => b.onclick = () => { if (done) return; ans[i] = +b.dataset.i; $$(".opt", qb).forEach(x => x.classList.toggle("sel", x === b)); $("[data-st]", box).textContent = `Đã chọn ${Object.keys(ans).length}/${qs.length}`; if (qs[i].say) Speech.say(qs[i].say); }); });
    $("[data-sub]", box).onclick = () => {
      if (done) return onSubmit && onSubmit(null, true);
      if (Object.keys(ans).length < qs.length && !box.dataset.warn) { box.dataset.warn = 1; $("[data-st]", box).textContent = `Còn ${qs.length - Object.keys(ans).length} câu chưa chọn – bấm Nộp bài lần nữa để nộp luôn.`; return; }
      done = true; let right = 0;
      qs.forEach((q, i) => { const qb = $(`.qblock[data-q="${i}"]`, box), a = ans[i], ok = a === q.a; if (ok) right++;
        $$(".opt", qb).forEach((b, j) => { b.disabled = true; b.classList.remove("sel"); if (j === q.a) b.classList.add("right"); else if (j === a) b.classList.add("wrong"); });
        $(".py-line", qb) && ($(".py-line", qb).hidden = false);
        $(".exp", qb).innerHTML = `<div class="feedback ${ok ? "ok" : "no"}" style="margin-top:10px"><b>${ok ? "Đúng" : a == null ? "Chưa làm" : "Sai"}</b>${q.e ? ` · <span class="fx">${esc(q.e)}</span>` : ""}</div>`; });
      onSubmit && onSubmit(right);
    };
  };
  draw();
}
App.views.hgram = function (el, arg) {
  if (arg && HG_BY[arg]) return hgDetail(el, HG_BY[arg]);
  window._hdRet = null;
  let li = Math.min(S.settings.hskLv != null ? S.settings.hskLv : 0, 5);
  const draw = () => {
    const lv = li + 1, list = HG.filter(g => g.lv === lv), cur = list.findIndex(g => !hgDone(g.id));
    el.innerHTML = `<div class="vpage hskp">
      ${hskHead("Ngữ pháp HSK", "Các điểm ngữ pháp trọng tâm theo từng cấp · công thức, ví dụ có pinyin, lỗi hay gặp và bài tập")}
      <div class="vbar"><div class="tabs hsk-lvt">${[1, 2, 3, 4, 5, 6].map((l, i) => `<button class="${i === li ? "on" : ""}" data-gl="${i}">HSK ${l} <small class="num">${HG.filter(g => g.lv === l && hgDone(g.id)).length}/${HG.filter(g => g.lv === l).length}</small></button>`).join("")}</div></div>
      <div class="vboard">${list.map((g, i) => `<button class="vnote ${hgDone(g.id) ? "done" : i === cur ? "cur" : ""}" data-g="${g.id}"><small class="num hsk-day">BÀI ${i + 1} · HSK ${lv}</small><em>${esc(g.name)}</em><small class="vsub hsk-prev">${esc(g.zh)}</small>${hgDone(g.id) ? `<span class="vscore"><span class="vring num">${S.hg[g.id].best}</span></span>` : `<small class="num">${g.ex.length} câu bài tập</small>`}${i === cur ? `<span class="vgo">${cur ? "TIẾP TỤC" : "BẮT ĐẦU"}</span>` : ""}<i class="ln"></i></button>`).join("")}</div></div>`;
    $$("[data-gl]", el).forEach(b => b.onclick = () => { li = +b.dataset.gl; draw(); });
    $$("[data-g]", el).forEach(b => b.onclick = () => App.go("hgram", b.dataset.g));
  };
  draw();
};
function hgDetail(el, g) {
  const sec = (label, body, cls = "") => `<div class="gsec ${cls}"><div class="glabel">${label}</div>${body}</div>`;
  const same = HG.filter(x => x.lv === g.lv), next = HG[HG.indexOf(g) + 1];
  const hiZh = (s, keys) => { let h = esc(s); keys.forEach(k => { if (k && h.includes(k)) h = h.split(k).join(`<em>${k}</em>`); }); return h; };
  const keys = g.zh.split(/\s*\/\s*|…|\s+/).map(x => x.replace(/[A-Za-z+()]/g, "").trim()).filter(x => x.length && /[㐀-鿿]/.test(x));
  el.innerHTML = `<div class="grid">
    <section class="glass card gnote hsk-g">
      <button class="back" id="back">${icon("left")} Ngữ pháp HSK</button>
      <div class="geyebrow">HSK ${g.lv} · bài ${same.indexOf(g) + 1}/${same.length}${hgDone(g.id) ? " · cao nhất " + S.hg[g.id].best + "%" : ""}</div>
      <h1 class="gtitle">${esc(g.name)}</h1><div class="gen zh-big">${esc(g.zh)}</div>
      <div class="gtabs"><span class="on">${icon("book")} Xem kiến thức</span><button id="to-ex">${icon("pen")} Luyện tập</button></div>
      <p class="gintro">${esc(g.use)}</p>
      ${sec("Cấu trúc", g.form.map(([a, b]) => `<div class="gform"><mark>${esc(a)}</mark><i>${esc(b)}</i></div>`).join(""), "box")}
      ${sec("Ví dụ", g.eg.map(([zh, py, vi]) => `<div class="gex"><div><b class="zh-s">${hiZh(zh, keys)}</b>${sayBtn(zh)}</div><small class="py-s">${esc(py)}</small><i>${esc(vi)}</i></div>`).join(""), "eg")}
      ${g.fix ? `<div class="gsec gfix"><div class="glabel">Lỗi hay gặp</div><div class="gfix-pad"><p class="gfix-s"><s class="zh-s">${esc(g.fix[0])}</s></p><p class="gfix-s"><b class="zh-s">${esc(g.fix[1])}</b> <small class="py-s">${esc(g.fix[3])}</small></p><p class="gfix-n">${esc(g.fix[2])}</p></div></div>` : ""}
      ${g.tips.length ? sec("Mẹo", `<ul>${g.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>`, "tip") : ""}
    </section>
    <section class="glass card" id="exbox"><div class="card-h"><h2>Bài tập (${g.ex.length} câu)</h2><span class="sub">Chọn từ đúng điền vào chỗ trống. Thứ tự câu và đáp án được xáo mỗi lần.</span></div><div id="qs"></div>
      <div class="row" style="margin-top:12px"><span class="spacer"></span>${next ? `<button class="btn" id="g-next">Bài tiếp: ${esc(next.name)} ${icon("right")}</button>` : ""}</div></section></div>`;
  const ret = window._hdRet && VOCAB_BY_ID[window._hdRet];
  if (ret) $("#back").innerHTML = icon("left") + " Ngày " + pad2(ret.day);
  $("#back").onclick = () => ret ? App.go("hday", { day: ret.id }) : App.go("hgram");
  $("#to-ex").onclick = () => $("#exbox").scrollIntoView({ behavior: "smooth", block: "start" });
  if (next) $("#g-next").onclick = () => App.go("hgram", next.id);
  const run = () => mcqBlock($("#qs"), shuf(g.ex).map(mixOpts), { onSubmit: (right, again) => {
    if (again) return run();
    const p = pct(right, g.ex.length); S.hg = S.hg || {}; S.hg[g.id] = { best: Math.max(p, (S.hg[g.id] || {}).best || 0), at: today() }; S.xp = (S.xp || 0) + right * 2; save();
    toast(`Đúng ${right}/${g.ex.length} câu`); $("#qs [data-sub]").textContent = "Làm lại";
    if (ret) $("#qs [data-sub]").insertAdjacentHTML("afterend", `<button class="btn primary" id="g-ret" style="margin-left:8px">Về bài Ngày ${pad2(ret.day)} ${icon("right")}</button>`), $("#g-ret").onclick = () => App.go("hday", { day: ret.id });
  } });
  run();
}

/* ===== Luyện thi HSK: đề tổng hợp theo cấp ===== */
App.views.hexam = function (el, arg) {
  if (arg && arg.lv) return hexamRun(el, arg.lv);
  const R = S.hexam || {};
  el.innerHTML = `<div class="vpage hskp">
    ${hskHead("Luyện thi HSK", "Đề tổng hợp 30 câu theo từng cấp: nghe, đọc hiểu từ, ngữ pháp và sắp xếp câu · mỗi lần làm là một đề khác")}
    <div class="hx-grid">${HSK.lv.map(l => `<button class="hx-card" data-x="${l.lv}"><b>${lvLabel(l.lv)}</b><span>${esc(l.name.split(" · ")[1])}</span><small class="num">${R[l.lv] ? "Cao nhất " + R[l.lv].best + "% · " + R[l.lv].n + " lần" : "Chưa làm"}</small><i>${icon("play")}</i></button>`).join("")}</div>
    <p class="muted small" style="margin-top:14px">Đề do app tự tạo từ danh sách từ và bài ngữ pháp của cấp đó, giúp luyện các dạng câu hỏi, không phải đề thi chính thức. Phần ngữ pháp và sắp xếp câu của HSK 7–9 dùng bài ngữ pháp HSK 1–6.</p></div>`;
  $$("[data-x]", el).forEach(b => b.onclick = () => App.go("hexam", { lv: +b.dataset.x }));
};
function hexamRun(el, lv) {
  const L = HSK.lv.find(l => l.lv === lv), pool = L.sets.flatMap(s => s.words), mean = w => w[3];
  const pick = (a, n) => shuf(a).slice(0, n);
  const others = (w, f, n = 3) => { const out = []; for (const x of shuf(pool)) { if (x !== w && f(x) !== f(w) && !out.includes(f(x))) out.push(f(x)); if (out.length === n) break; } return out; };
  const qListen = pick(pool, 8).map(w => ({ html: `<button class="btn sm" data-say="${esc(w[0])}">${icon("head")} Nghe</button> <span class="muted">Nghe và chọn nghĩa đúng</span>`, say: null, o: [mean(w), ...others(w, mean)], a: 0, e: `${w[0]} (${w[1]}) – ${mean(w)}` }));
  const qRead1 = pick(pool, 8).map(w => ({ q: w[0], p: w[1], o: [mean(w), ...others(w, mean)], a: 0, e: `${w[0]} (${w[1]}) – ${mean(w)}` }));
  const qRead2 = pick(pool, 4).map(w => ({ html: `<span class="muted">Chọn từ có nghĩa:</span> <b>${esc(mean(w))}</b>`, o: [w[0], ...others(w, x => x[0])], a: 0, e: `${w[0]} (${w[1]})` }));
  const gl = HG.filter(g => g.lv <= Math.min(lv, 6));
  const qGram = pick(gl.flatMap(g => g.ex.map(q => ({ ...q, e: g.name + " · " + q.e }))), 6);
  const qOrder = pick(gl.flatMap(g => g.eg.filter(e => e[3].length >= 3 && e[3].length <= 9)), 4);
  const parts = [["听力 · Nghe", qListen], ["阅读 · Đọc hiểu từ", qRead1.concat(qRead2)], ["语法 · Ngữ pháp", qGram]];
  const t0 = Date.now(); let scores = {}, tick;
  el.innerHTML = `<div class="grid"><section class="glass card hx-run">
    <button class="back" id="back">${icon("left")} Luyện thi HSK</button>
    <div class="card-h"><div><h2>Đề luyện ${lvLabel(lv)}</h2><div class="sub">30 câu · làm lần lượt từng phần rồi bấm Nộp bài ở cuối mỗi phần</div></div><b class="num hx-time" id="hx-t">00:00</b></div>
    ${parts.map(([n], i) => `<h3 class="hx-h">Phần ${i + 1} · ${n}</h3><div id="hx-p${i}"></div>`).join("")}
    <h3 class="hx-h">Phần 4 · 书写 · Sắp xếp thành câu</h3><div id="hx-p3"></div>
    <div id="hx-sum"></div></section></div>`;
  $("#back").onclick = () => App.go("hexam");
  tick = setInterval(() => { const s = Math.floor((Date.now() - t0) / 1000), t = $("#hx-t"); if (!t) return clearInterval(tick); t.textContent = pad2(Math.floor(s / 60)) + ":" + pad2(s % 60); }, 1000);
  App.cleanup = () => clearInterval(tick);
  const finish = () => {
    if (Object.keys(scores).length < 4) return;
    clearInterval(tick);
    const right = Object.values(scores).reduce((a, x) => a + x, 0), p = pct(right, 30);
    S.hexam = S.hexam || {}; const r = S.hexam[lv] || { best: 0, n: 0 }; S.hexam[lv] = { best: Math.max(r.best, p), n: r.n + 1, at: today() }; S.xp = (S.xp || 0) + right; save();
    $("#hx-sum").innerHTML = `<div class="hx-sum"><b class="num">${right}/30</b><span>${p >= 80 ? "Rất tốt! Bạn đã sẵn sàng cho cấp này." : p >= 60 ? "Khá ổn, ôn thêm các câu sai nhé." : "Cần ôn lại từ vựng và ngữ pháp của cấp này."}</span>
      <small class="num">Nghe ${scores[0]}/8 · Đọc ${scores[1]}/12 · Ngữ pháp ${scores[2]}/6 · Sắp xếp ${scores[3]}/4 · ${$("#hx-t").textContent}</small>
      <div class="row" style="justify-content:center;margin-top:10px"><button class="btn primary" id="hx-again">${icon("refresh")} Làm đề khác</button></div></div>`;
    $("#hx-again").onclick = () => App.go("hexam", { lv });
    $("#hx-sum").scrollIntoView({ behavior: "smooth", block: "center" });
  };
  parts.forEach(([, qs], i) => mcqBlock($("#hx-p" + i), qs.map(mixOpts), { pinyin: i === 2, onSubmit: (r, again) => { if (again) return; scores[i] = r; finish(); } }));
  // sắp xếp câu: chạm lần lượt các mảnh theo đúng thứ tự
  const box = $("#hx-p3"), st = qOrder.map(e => ({ e, toks: e[3].filter(t => !/^[，。？！、；：]$/.test(t)), got: [] }));
  const drawO = done => {
    box.innerHTML = st.map((x, i) => { const left = shuf(x.toks.map((t, k) => k)).filter(k => !x.got.includes(k)); x.left = x.left && !done ? x.left.filter(k => !x.got.includes(k)) : left;
      const ok = x.got.map(k => x.toks[k]).join("") === x.toks.join("");
      return `<div class="qblock" data-o="${i}"><div class="qn"><span class="muted num">${i + 1}.</span> <span class="muted">${esc(x.e[2])}</span></div>
        <div class="ord-ans">${x.got.map((k, j) => `<button class="ord-t on" data-back="${j}" ${done ? "disabled" : ""}>${esc(x.toks[k])}</button>`).join("") || `<span class="muted small">Chạm các mảnh bên dưới theo đúng thứ tự</span>`}</div>
        <div class="ord-pool">${done ? "" : x.left.map(k => `<button class="ord-t" data-k="${k}">${esc(x.toks[k])}</button>`).join("")}</div>
        ${done ? `<div class="feedback ${ok ? "ok" : "no"}" style="margin-top:8px"><b>${ok ? "Đúng" : "Sai"}</b> · <span class="zh-s">${esc(x.e[0])}</span> <small class="py-s">${esc(x.e[1])}</small></div>` : ""}</div>`; }).join("")
      + (done ? "" : `<div class="row" style="margin-top:14px"><span class="spacer"></span><button class="btn primary" id="ord-sub">Nộp bài</button></div>`);
    if (done) return;
    $$("[data-o]", box).forEach(qb => { const x = st[+qb.dataset.o];
      $$("[data-k]", qb).forEach(b => b.onclick = () => { x.got.push(+b.dataset.k); drawO(); });
      $$("[data-back]", qb).forEach(b => b.onclick = () => { x.got.splice(+b.dataset.back, 1); x.left = null; drawO(); }); });
    $("#ord-sub").onclick = () => { scores[3] = st.filter(x => x.got.map(k => x.toks[k]).join("") === x.toks.join("")).length; drawO(true); finish(); };
  };
  drawO();
}

/* ===== Mỗi ngày trong lộ trình HSK = 10 từ + ngữ pháp + tập viết + bài tập nhiều dạng ===== */
/* Kế hoạch: mỗi cấp chia tuần; tuần = 6 ngày học (mỗi ngày 1 lần học từ vựng) + 1 ngày ôn tập; cuối cấp có ngày kiểm tra */
const HDAY = {};
const HPLAN = (() => {
  let no = 0; const out = [];
  HSK.lv.forEach(L => {
    const gl = HG.filter(g => g.lv === L.lv), rev = HG.filter(x => x.lv >= 5), n = L.sets.length, weeks = [];
    L.sets.forEach((s, i) => {
      const k = gl.length ? Math.min(gl.length - 1, Math.floor(i * gl.length / n)) : -1, g = k >= 0 ? gl[k] : null;
      const isNew = g && (i === 0 || Math.min(gl.length - 1, Math.floor((i - 1) * gl.length / n)) !== k);
      HDAY[s.id] = { g, gNew: isNew ? g : null, gRev: g || rev[i % Math.max(1, rev.length)] };
    });
    for (let i = 0; i < n; i += 6) {
      const ss = L.sets.slice(i, i + 6), days = ss.map(s => ({ kind: "study", no: ++no, set: s }));
      days.forEach(d => { d.set.day = d.no; d.set.lvl = L; });
      days.push({ kind: "review", no: ++no, first: ss[0].id, sets: ss, grams: [...new Set(ss.map(s => HDAY[s.id].g).filter(Boolean))] });
      weeks.push({ no: weeks.length + 1, days, topics: [...new Set(ss.map(baseName))] });
    }
    weeks[weeks.length - 1].days.push({ kind: "test", no: ++no, lv: L.lv });
    out.push({ L, weeks, days: weeks.flatMap(w => w.days) });
  });
  return out;
})();
HSK.days = HPLAN.flatMap(x => x.days);
const hdS = s => (S.hday = S.hday || {})[s.id] || {};
const hdSet = (s, k, v) => { S.hday = S.hday || {}; S.hday[s.id] = { ...hdS(s), [k]: v }; save(); };
const hdChars = s => [...new Set(s.words.flatMap(w => [...w[0]].filter(isZh)))];
const hdWrote = s => { const D = S.hzDone || {}, cs = hdChars(s); return cs.filter(c => D[c]).length >= Math.min(3, cs.length); };
const hdSteps = s => {
  const d = HDAY[s.id], st = hdS(s), out = [];
  out.push({ k: "v", t: `Từ vựng · ${s.words.length} từ mới`, sub: s.words.slice(0, 7).map(w => w[0]).join(" · ") + (s.words.length > 7 ? " …" : ""), done: hskOk(s), go: () => App.go("hday", { learn: s.id }) });
  if (d.gNew) out.push({ k: "g", t: `Ngữ pháp · ${d.gNew.name}`, sub: d.gNew.zh + " · lý thuyết, ví dụ, bài tập", done: hgDone(d.gNew.id), go: () => { window._hdRet = s.id; App.go("hgram", d.gNew.id); } });
  out.push({ k: "w", t: "Tập viết chữ Hán của bài", sub: `Viết đúng ít nhất ${Math.min(3, hdChars(s).length)} chữ trong ${hdChars(s).length} chữ`, done: hdWrote(s), go: () => hdWrite(s) });
  out.push({ k: "x", t: "Bài tập tổng hợp · 12 câu", sub: "Nghĩa, chữ Hán, pinyin, nghe, đúng/sai, ngữ pháp, sắp xếp câu", done: st.x != null, go: () => App.go("hday", { quiz: s.id }) });
  return out;
};
const dayDone = s => hdSteps(s).every(x => x.done);
const pdDone = d => d.kind === "study" ? dayDone(d.set) : d.kind === "review" ? (S.hwk || {})[d.first] != null : !!(S.hexam || {})[d.lv];
const pdTasks = d => d.kind === "study" ? hdSteps(d.set)
  : d.kind === "review" ? [{ k: "wk", t: "Ôn tập tuần · 16 câu", sub: "Từ vựng, nghe, ngữ pháp và sắp xếp câu của 6 ngày vừa học", done: pdDone(d), go: () => App.go("hday", { week: d.first }) }]
      .concat(d.grams.map(g => ({ k: "gr", t: "Ôn ngữ pháp · " + g.name, sub: g.zh + " · làm lại bài tập", done: hgDone(g.id), go: () => App.go("hgram", g.id) })))
      .concat([{ k: "rv", t: "Ôn từ đến hạn", sub: "Theo lịch lặp lại ngắt quãng", done: !dueKeys().length, go: () => App.go("hsk", { review: true, free: !dueKeys().length }) }])
  : [{ k: "ex", t: "Kiểm tra " + lvLabel(d.lv) + " · 30 câu", sub: "Nghe, đọc hiểu từ, ngữ pháp, sắp xếp câu", done: pdDone(d), go: () => App.go("hexam", { lv: d.lv }) }];
let pdTitle = d => d.kind === "study" ? d.set.name : d.kind === "review" ? "Ôn tập tuần" : "Kiểm tra cuối cấp";
// thay trạng thái "đã học" trong lộ trình: ngày xong khi đủ các bước
const hskNextDay = () => HSK.days.find(d => !pdDone(d)) || null;
hskNext = () => { const d = hskNextDay(); return d && d.kind === "study" ? d.set : null; };
hskGoNext = () => { const d = hskNextDay(); if (!d) return App.go("hsk"); if (d.kind === "study") return App.go("hday", { day: d.set.id }); pdTasks(d)[0].go(); };

/* ---- Bài tập nhiều dạng, làm từng câu một ---- */
function hdQuestions(words, pool, grams, n) {
  const mean = w => w[3], pyk = w => w[1];
  const others = (w, f, k = 3) => { const out = []; for (const x of shuf(pool)) { if (x[0] !== w[0] && f(x) !== f(w) && !out.includes(f(x))) out.push(f(x)); if (out.length === k) break; } return out; };
  const mk = {
    mean: w => ({ type: "Chọn nghĩa", ask: `<div class="hq-big">${esc(w[0])}</div><div class="hq-sub">${esc(w[1])}</div>`, o: [mean(w), ...others(w, mean)], say: w[0] }),
    hanzi: w => ({ type: "Chọn chữ Hán", ask: `<div class="hq-mid">${esc(mean(w))}</div>`, o: [w[0], ...others(w, x => x[0])], big: 1, say: w[0] }),
    pyhz: w => ({ type: "Pinyin → chữ Hán", ask: `<div class="hq-mid">${esc(w[1])}</div>`, o: [w[0], ...others(w, x => x[0])], big: 1, say: w[0] }),
    listen: w => ({ type: "Nghe chọn từ", ask: `<button class="btn primary" data-say="${esc(w[0])}">${icon("head")} Nghe</button>`, o: [w[0], ...others(w, x => x[0])], big: 1, auto: w[0] }),
    pinyin: w => ({ type: "Chọn pinyin đúng", ask: `<div class="hq-big">${esc(w[0])}</div><div class="hq-sub">${esc(mean(w))}</div>`, o: [w[1], ...others(w, pyk)], say: w[0] }),
    tf: w => { const ok = Math.random() < .5, m = ok ? mean(w) : others(w, mean, 1)[0]; return { type: "Đúng hay sai", ask: `<div class="hq-big">${esc(w[0])}</div><div class="hq-mid">nghĩa là “${esc(m)}”?</div>`, o: ["Đúng", "Sai"], a0: ok ? 0 : 1, say: w[0], e: `${w[0]} = ${mean(w)}` }; },
    type: w => ({ type: "Viết từ", ask: `<div class="hq-mid">${esc(mean(w))}</div><div class="hq-sub">Gõ chữ Hán hoặc pinyin không dấu</div>`, input: w, say: w[0] })
  };
  const kinds = ["mean", "hanzi", "pyhz", "listen", "pinyin", "tf", "type"];
  const vq = shuf(words).concat(shuf(words)).slice(0, Math.max(0, n - (grams.length ? 3 : 0))).map((w, i) => {
    const q = mk[kinds[i % kinds.length]](w); q.e = q.e || `${w[0]} (${w[1]}) – ${mean(w)}`;
    if (q.o) { const a = q.a0 || 0, ord = q.a0 != null ? [0, 1] : shuf(q.o.map((_, k) => k)); q.o = ord.map(k => q.o[k]); q.a = ord.indexOf(a); } return q;
  });
  const gq = [];
  if (grams.length) {
    const ex = shuf(grams.flatMap(g => g.ex.map(x => ({ ...x, g })))).slice(0, 2);
    ex.forEach(x => { const m = mixOpts(x); gq.push({ type: "Ngữ pháp · " + x.g.name, ask: `<div class="hq-mid zh-s">${esc(x.q)}</div>`, py: x.p, o: m.o, a: m.a, e: x.e }); });
    const eg = shuf(grams.flatMap(g => g.eg.filter(e => e[3].length >= 3 && e[3].length <= 9)))[0];
    if (eg) gq.push({ type: "Sắp xếp thành câu", order: eg, ask: `<div class="hq-sub">${esc(eg[2])}</div>`, e: eg[0] });
  }
  return shuf(vq.concat(gq));
}
function hdQuiz(box, qs, onDone) {
  let i = 0, right = 0, wrong = [];
  const step = () => {
    if (i >= qs.length) return onDone(right, wrong);
    const q = qs[i]; let answered = false;
    const toks = q.order ? q.order[3].filter(t => !/^[，。？！、；：]$/.test(t)) : null, got = [], left = toks ? shuf(toks.map((_, k) => k)) : null;
    box.innerHTML = `<div class="hq">
      <div class="hq-top"><span class="chip">${esc(q.type)}</span><span class="num muted">${i + 1}/${qs.length}</span></div>
      <div class="hq-bar"><i style="width:${pct(i, qs.length)}%"></i></div>
      <div class="hq-ask">${q.ask}${q.py ? `<div class="hq-sub py-line" hidden>${esc(q.py)}</div>` : ""}</div>
      ${q.o ? `<div class="opts ${q.o.length === 2 ? "two" : "two"} ${q.big ? "zh-opts" : ""}">${q.o.map((o, j) => optHTML(o, j)).join("")}</div>` : ""}
      ${q.input ? `<div class="row" style="max-width:460px;margin:0 auto"><input class="input" id="hq-in" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="学习 / xuexi" style="flex:1"><button class="btn primary" id="hq-ok">Kiểm tra</button></div>` : ""}
      ${toks ? `<div class="ord-ans" id="ord-a"><span class="muted small">Chạm các mảnh theo đúng thứ tự</span></div><div class="ord-pool" id="ord-p"></div><div class="row" style="justify-content:center;margin-top:10px"><button class="btn sm" id="ord-x">${icon("refresh")} Làm lại</button><button class="btn primary" id="ord-ok">Kiểm tra</button></div>` : ""}
      <div class="hq-fb"></div>
      <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn primary" id="hq-next" hidden>${i === qs.length - 1 ? "Xem kết quả" : "Câu tiếp"} ${icon("right")}</button></div></div>`;
    const fb = ok => { answered = true; if (ok) right++; else wrong.push(q); $(".hq-fb", box).innerHTML = `<div class="feedback ${ok ? "ok" : "no"}" style="margin-top:12px"><b>${ok ? "Chính xác!" : "Chưa đúng."}</b> <span class="fx zh-s">${esc(q.e || "")}</span></div>`; $$(".py-line", box).forEach(x => x.hidden = false); $("#hq-next", box).hidden = false; if (q.say) Speech.say(q.say); $("#hq-next", box).focus(); };
    if (q.o) $$(".opt", box).forEach(b => b.onclick = () => { if (answered) return; const a = +b.dataset.i; $$(".opt", box).forEach((x, j) => { x.disabled = true; if (j === q.a) x.classList.add("right"); else if (j === a) x.classList.add("wrong"); }); fb(a === q.a); });
    if (q.input) { const inp = $("#hq-in", box), w = q.input, chk = () => { if (answered || !inp.value.trim()) return; const v = inp.value.trim(), p = x => norm(x).replace(/[ ']/g, ""); inp.disabled = true; fb(v === w[0] || (p(v) && p(v) === p(w[1]))); }; $("#hq-ok", box).onclick = chk; inp.onkeydown = e => { if (e.key === "Enter") chk(); }; setTimeout(() => inp.focus(), 50); }
    if (toks) {
      const dr = () => { $("#ord-a", box).innerHTML = got.length ? got.map(k => `<span class="ord-t on">${esc(toks[k])}</span>`).join("") : `<span class="muted small">Chạm các mảnh theo đúng thứ tự</span>`; $("#ord-p", box).innerHTML = left.filter(k => !got.includes(k)).map(k => `<button class="ord-t" data-k="${k}">${esc(toks[k])}</button>`).join(""); $$("[data-k]", box).forEach(b => b.onclick = () => { if (answered) return; got.push(+b.dataset.k); dr(); }); };
      dr(); $("#ord-x", box).onclick = () => { if (!answered) { got.length = 0; dr(); } };
      $("#ord-ok", box).onclick = () => { if (answered) return; fb(got.map(k => toks[k]).join("") === toks.join("")); q.e = q.order[0] + " · " + q.order[1]; $(".hq-fb .fx", box).textContent = q.e; };
    }
    if (q.auto) setTimeout(() => Speech.say(q.auto), 200);
    $("#hq-next", box).onclick = () => { i++; step(); };
    App.keyHandler = e => { if (e.key === "Enter" && answered) { e.preventDefault(); i++; step(); } else if (q.o && !answered && /^[1-4]$/.test(e.key)) { const b = $$(".opt", box)[+e.key - 1]; b && b.click(); } };
  };
  step();
}

/* ---- Trang một ngày học ---- */
function hdWrite(s) {
  modal(`<div class="row"><h2 style="flex:1">Tập viết · Ngày ${pad2(s.day)}</h2><button class="btn sm ghost icon-btn" data-close aria-label="Đóng">${icon("x")}</button></div>
    <p class="muted small" style="margin:4px 0 12px">Chạm vào một chữ, xem thứ tự nét rồi chuyển sang "Tự viết". Chữ viết đúng sẽ có dấu ✓.</p>
    <div class="hz-grid">${hdChars(s).map(c => { const w = s.words.find(x => x[0].includes(c)); return `<button class="hz-tile ${(S.hzDone || {})[c] ? "ok" : ""}" data-c="${c}"><b>${c}</b><small>${esc(w[0])}</small></button>`; }).join("")}</div>`,
    (m, close) => { const items = hdChars(s).map(c => { const w = s.words.find(x => x[0].includes(c)); return [c, "", "", "chữ trong từ " + w[0] + " (" + w[1] + ") · " + w[3]]; });
      $$("[data-c]", m).forEach((b, i) => b.onclick = () => { close(); Hz.practice(items[i], items, i); }); });
}
App.views.hday = function (el, arg) {
  if (arg && (arg.learn || arg.review)) return App.views.vocab(el, arg);
  const s = arg && (arg.day || arg.quiz) ? VOCAB_BY_ID[arg.day || arg.quiz] : arg && arg.week ? null : hskNext() || HSK.all[0];
  if (arg && arg.week) return hdWeek(el, arg.week);
  const d = HDAY[s.id], L = s.lvl, pool = L.sets.flatMap(x => x.words);
  window._hdRet = s.id;
  if (arg && arg.quiz) {
    el.innerHTML = `<div class="grid"><section class="glass card session"><button class="back" id="back">${icon("left")} Ngày ${pad2(s.day)}</button>
      <div class="card-h"><div><h2>Bài tập tổng hợp · ${esc(s.name)}</h2><div class="sub">${esc(L.name)} · 12 câu, mỗi câu một dạng khác nhau</div></div></div><div id="hq"></div></section></div>`;
    $("#back").onclick = () => App.go("hday", { day: s.id });
    const grams = d.g ? [d.g] : [d.gRev];
    hdQuiz($("#hq"), hdQuestions(s.words, pool, grams.filter(Boolean), 12), (right, wrong) => {
      const p = pct(right, 12); hdSet(s, "x", Math.max(p, hdS(s).x || 0)); S.xp = (S.xp || 0) + right * 2; save();
      $("#hq").innerHTML = `<div class="hx-sum"><b class="num">${right}/12</b><span>${p >= 80 ? "Tuyệt vời!" : p >= 50 ? "Khá tốt, xem lại các câu sai nhé." : "Ôn lại từ và ngữ pháp của bài rồi làm lại nhé."}</span>
        ${wrong.length ? `<div class="hq-wrong">${wrong.map(q => `<div class="word-row"><div class="small">${esc(q.type)}</div><div class="zh-s">${esc(q.e || "")}</div></div>`).join("")}</div>` : ""}
        <div class="row" style="justify-content:center;margin-top:10px"><button class="btn" id="hq-again">${icon("refresh")} Làm bộ khác</button><button class="btn primary" id="hq-back">Về bài hôm nay ${icon("right")}</button></div></div>`;
      $("#hq-again").onclick = () => App.go("hday", { quiz: s.id }); $("#hq-back").onclick = () => App.go("hday", { day: s.id });
    });
    return;
  }
  const steps = hdSteps(s), doneN = steps.filter(x => x.done).length, cur = steps.findIndex(x => !x.done), all = dayDone(s);
  const nextDay = HSK.all[HSK.all.indexOf(s) + 1], nextPD = HSK.days[HSK.days.findIndex(x => x.set === s) + 1], wkStart = L.sets.indexOf(s) - L.sets.indexOf(s) % 6;
  el.innerHTML = `<div class="vpage hskp hday">
    <div class="hsk-top"><div><span class="hsk-zh">${esc(lvLabel(L.lv))} · Tuần ${Math.floor(L.sets.indexOf(s) / 6) + 1} · ${esc(baseName(s))}</span><h1>Ngày ${pad2(s.day)} · ${esc(s.name)}</h1>
      <p>${s.words.slice(0, 6).map(w => esc(w[0])).join(" · ")}${s.words.length > 6 ? " …" : ""}</p></div>
      <div class="hsk-stat"><b class="num">${doneN}/${steps.length}</b><span>bước đã xong</span></div></div>
    <div class="hd-steps">${steps.map((x, i) => `<button class="hd-step ${x.done ? "done" : i === cur ? "now" : ""}" data-st="${i}">
      <span class="hd-n">${x.done ? icon("check") : i + 1}</span><span class="hd-t"><b>${esc(x.t)}</b><small>${esc(x.sub)}</small></span><span class="hd-go">${x.done ? "Làm lại" : i === cur ? "Bắt đầu" : "Mở"}</span></button>`).join("")}</div>
    ${all ? `<div class="hx-sum"><b>🎉 Xong Ngày ${pad2(s.day)}!</b><span>Từ của bài đã vào hộp ôn tập, mai điểm danh để ôn lại nhé.</span>
      <div class="row" style="justify-content:center;margin-top:8px">${nextPD ? `<button class="btn primary" id="hd-next">Sang Ngày ${pad2(nextPD.no)} · ${esc(pdTitle(nextPD))} ${icon("right")}</button>` : ""}</div></div>` : ""}
    <h3 class="hx-h">${s.words.length} từ của bài</h3>
    <div class="hsk-list hd-words">${s.words.map((w, i) => `<div class="word-row"><div><button class="hsk-hz" data-hz="${i}">${esc(w[0])}</button><div class="muted tiny">${esc(w[1])} · ${esc(POS_VI[w[2]] || w[2])}</div></div><div class="small">${esc(w[3])}</div>${sayBtn(w[0])}</div>`).join("")}</div>
    ${d.g && !d.gNew ? `<p class="muted small" style="margin-top:12px">Ngữ pháp đang luyện: <a href="#" id="hd-g">${esc(d.g.name)}</a> (câu ngữ pháp có trong bài tập tổng hợp).</p>` : ""}
    <div class="row" style="margin-top:16px"><button class="btn" id="hd-route">${icon("route")} Xem lộ trình</button><span class="spacer"></span><button class="btn" id="hd-week">Ôn tập tuần này</button></div></div>`;
  $$("[data-st]", el).forEach(b => b.onclick = () => steps[+b.dataset.st].go());
  $$("[data-hz]", el).forEach(b => b.onclick = () => Hz.practice(s.words[+b.dataset.hz], s.words));
  if ($("#hd-next")) $("#hd-next").onclick = () => nextPD.kind === "study" ? App.go("hday", { day: nextPD.set.id }) : pdTasks(nextPD)[0].go();
  if ($("#hd-g")) $("#hd-g").onclick = e => { e.preventDefault(); App.go("hgram", d.g.id); };
  $("#hd-route").onclick = () => App.go("hsk");
  $("#hd-week").onclick = () => App.go("hday", { week: L.sets[wkStart].id });
};
function hdWeek(el, firstId) {
  const f = VOCAB_BY_ID[firstId], L = f.lvl, i0 = L.sets.indexOf(f), W = L.sets.slice(i0, i0 + 6), wk = Math.floor(i0 / 6) + 1;
  const words = W.flatMap(s => s.words), grams = [...new Set(W.map(s => HDAY[s.id].g || HDAY[s.id].gRev).filter(Boolean))];
  el.innerHTML = `<div class="grid"><section class="glass card session"><button class="back" id="back">${icon("left")} Lộ trình</button>
    <div class="card-h"><div><h2>Ôn tập tuần ${wk} · ${esc(lvLabel(L.lv))}</h2><div class="sub">Ngày ${pad2(W[0].day)}–${pad2(W[W.length - 1].day)} · 16 câu nhiều dạng từ ${words.length} từ và ${grams.length} bài ngữ pháp</div></div></div><div id="hq"></div></section></div>`;
  $("#back").onclick = () => App.go("hsk");
  hdQuiz($("#hq"), hdQuestions(words, L.sets.flatMap(x => x.words), grams, 16), (right, wrong) => {
    const p = pct(right, 16); S.hwk = S.hwk || {}; S.hwk[firstId] = Math.max(p, S.hwk[firstId] || 0); S.xp = (S.xp || 0) + right * 2; save();
    $("#hq").innerHTML = `<div class="hx-sum"><b class="num">${right}/16</b><span>${p >= 80 ? "Bạn nắm chắc tuần này rồi!" : "Xem lại các câu sai bên dưới nhé."}</span>
      ${wrong.length ? `<div class="hq-wrong">${wrong.map(q => `<div class="word-row"><div class="small">${esc(q.type)}</div><div class="zh-s">${esc(q.e || "")}</div></div>`).join("")}</div>` : ""}
      <div class="row" style="justify-content:center;margin-top:10px"><button class="btn" id="hq-again">${icon("refresh")} Làm bộ khác</button><button class="btn primary" id="hq-back">Về lộ trình</button></div></div>`;
    $("#hq-again").onclick = () => App.go("hday", { week: firstId }); $("#hq-back").onclick = () => App.go("hsk");
  });
}

/* ===== Bài học HSK: mỗi bài = câu tiêu đề + hội thoại + 2–3 chặng từ + ngữ pháp + luyện tập ===== */
const HLES = (() => {
  const out = [], byLv = {};
  HSK.lv.forEach(L => {
    const list = [], man = (window.HSK_LESSONS || []).filter(x => x.lv === L.lv);
    // theo từng chủ đề: bài tự soạn (có hội thoại) nhận các chặng đầu, phần còn lại ghép thành bài tiếp theo (tối đa 3 chặng/bài)
    const topics = []; L.sets.forEach(s => { const b = baseName(s); let t = topics.find(x => x.name === b); if (!t) topics.push(t = { name: b, sets: [] }); t.sets.push(s); });
    topics.forEach(t => {
      const ms = man.filter(m => m.topic === t.name), left = t.sets.slice(), part = [];
      if (ms.length) { const per = Math.max(1, Math.min(3, Math.ceil(left.length / ms.length))); ms.forEach(m => { const ss = left.splice(0, per); if (ss.length) part.push({ zh: m.zh, py: m.py, vi: m.vi, dlg: m.dlg, sets: ss }); }); }
      while (left.length) part.push({ vi: t.name, topic: t.name, sets: left.splice(0, 3) });
      const auto = part.filter(x => !x.dlg); if (auto.length > 1 || (auto.length && ms.length)) auto.forEach((x, k) => x.vi = `${t.name} · phần ${k + 1 + (ms.length ? 1 : 0)}`);
      list.push(...part);
    });
    list.forEach((x, n) => { x.lv = L.lv; x.no = n + 1; x.L = L; x.id = "L" + L.lv + "-" + (n + 1); x.sets.forEach((s, j) => { s.les = x; s.stage = j + 1; }); out.push(x); });
    byLv[L.lv] = list;
  });
  return { all: out, byLv, byId: Object.fromEntries(out.map(x => [x.id, x])) };
})();
const lesWords = l => l.sets.flatMap(s => s.words);
const lesDone = l => l.sets.filter(hskOk).length;
const lesGrams = l => [...new Set(l.sets.map(s => HDAY[s.id] && HDAY[s.id].g).filter(Boolean))];
// tiêu đề ngày học trong lộ trình theo bài
const _pdTitle0 = pdTitle;
pdTitle = d => d.kind === "study" && d.set.les ? `Bài ${pad2(d.set.les.no)} · ${d.set.les.vi}${d.set.les.sets.length > 1 ? ` · chặng ${d.set.stage}/${d.set.les.sets.length}` : ""}` : _pdTitle0(d);

App.views.hlesson = function (el, arg) {
  if (arg && (arg.learn || arg.review)) return App.views.vocab(el, arg);
  const l = arg && (HLES.byId[arg.id] || (arg.set && VOCAB_BY_ID[arg.set] && VOCAB_BY_ID[arg.set].les)) || HLES.all[0];
  const ws = lesWords(l), grams = lesGrams(l), pool = l.L.sets.flatMap(s => s.words);
  if (arg && arg.quiz) {
    el.innerHTML = `<div class="grid"><section class="glass card session"><button class="back" id="back">${icon("left")} Bài ${pad2(l.no)}</button>
      <div class="card-h"><div><h2>Luyện tập · Bài ${pad2(l.no)} · ${esc(l.vi)}</h2><div class="sub">${esc(lvLabel(l.lv))} · 15 câu nhiều dạng từ ${ws.length} từ${grams.length ? " và ngữ pháp của bài" : ""}</div></div></div><div id="hq"></div></section></div>`;
    $("#back").onclick = () => App.go("hlesson", { id: l.id });
    hdQuiz($("#hq"), hdQuestions(ws, pool, grams.length ? grams : [HDAY[l.sets[0].id].gRev].filter(Boolean), 15), (right, wrong) => {
      const p = pct(right, 15); S.hles = S.hles || {}; S.hles[l.id] = Math.max(p, S.hles[l.id] || 0); S.xp = (S.xp || 0) + right * 2; save();
      $("#hq").innerHTML = `<div class="hx-sum"><b class="num">${right}/15</b><span>${p >= 80 ? "Tuyệt vời!" : "Xem lại các câu sai rồi làm bộ khác nhé."}</span>
        ${wrong.length ? `<div class="hq-wrong">${wrong.map(q => `<div class="word-row"><div class="small">${esc(q.type)}</div><div class="zh-s">${esc(q.e || "")}</div></div>`).join("")}</div>` : ""}
        <div class="row" style="justify-content:center;margin-top:10px"><button class="btn" id="hq-again">${icon("refresh")} Làm bộ khác</button><button class="btn primary" id="hq-back">Về bài học</button></div></div>`;
      $("#hq-again").onclick = () => App.go("hlesson", { id: l.id, quiz: 1 }); $("#hq-back").onclick = () => App.go("hlesson", { id: l.id });
    });
    return;
  }
  let showPy = S.settings.hpy !== false, showVi = true;
  const draw = () => {
    el.innerHTML = `<div class="grid hles">
    <section class="glass card gnote">
      <button class="back" id="back">${icon("left")} Bài học ${esc(lvLabel(l.lv))}</button>
      <div class="geyebrow">${esc(lvLabel(l.lv))} · BÀI ${pad2(l.no)} · ${ws.length} từ · ${l.sets.length} chặng</div>
      <h1 class="gtitle">${esc(l.vi)}</h1>
      ${l.zh ? `<div class="hl-zh"><b class="zh-s">${esc(l.zh)}</b>${sayBtn(l.zh)}</div>${showPy ? `<div class="py-s">${esc(l.py)}</div>` : ""}` : ""}
      <div class="row" style="margin:12px 0 4px;gap:6px"><button class="btn sm ${showPy ? "primary" : ""}" id="t-py">Pinyin</button>${l.dlg ? `<button class="btn sm ${showVi ? "primary" : ""}" id="t-vi">Bản dịch</button>` : ""}<span class="spacer"></span><button class="btn primary" id="go-quiz">${icon("play")} Luyện tập</button></div>
      ${l.dlg ? `<div class="gsec eg"><div class="glabel">Hội thoại <button class="btn sm" id="play-all" style="margin-left:8px">${icon("head")} Nghe cả bài</button></div>
        ${l.dlg.map(([w, zh, py, vi]) => `<div class="hl-line"><span class="hl-who ${w === "A" ? "a" : "b"}">${w}</span><div><div><b class="zh-s">${esc(zh)}</b>${sayBtn(zh)}</div>${showPy ? `<small class="py-s">${esc(py)}</small>` : ""}${showVi ? `<i>${esc(vi)}</i>` : ""}</div></div>`).join("")}</div>`
        : `<p class="muted small">Bài ở cấp này chưa có hội thoại riêng; học từ theo các chặng bên dưới và làm luyện tập.</p>`}
      <div class="gsec box"><div class="glabel">Từ vựng theo chặng</div>
        ${l.sets.map((s, j) => `<div class="hl-stage ${hskOk(s) ? "ok" : ""}"><span class="hd-n">${hskOk(s) ? icon("check") : j + 1}</span><div class="hd-t"><b>Chặng ${j + 1} · ${s.words.length} từ</b><small class="zh-s">${s.words.map(w => esc(w[0])).join(" · ")}</small></div><button class="btn sm ${hskOk(s) ? "" : "primary"}" data-learn="${s.id}">${hskOk(s) ? "Học lại" : "Học"}</button></div>`).join("")}
      </div>
      ${grams.length ? `<div class="gsec tip"><div class="glabel">Ngữ pháp trong bài</div><ul>${grams.map(g => `<li><a href="#" data-g="${g.id}">${esc(g.name)}</a> <span class="muted">${esc(g.zh)}</span>${hgDone(g.id) ? " ✓" : ""}</li>`).join("")}</ul></div>` : ""}
      <div class="gsec"><div class="glabel">Danh sách từ</div><div class="hsk-list">${ws.map((w, i) => `<div class="word-row"><div><button class="hsk-hz" data-hz="${i}">${esc(w[0])}</button><div class="muted tiny">${esc(w[1])} · ${esc(POS_VI[w[2]] || w[2])}</div></div><div class="small">${esc(w[3])}</div>${sayBtn(w[0])}</div>`).join("")}</div></div>
      <div class="row" style="margin-top:14px">${HLES.byId["L" + l.lv + "-" + (l.no - 1)] ? `<button class="btn" id="prev-l">${icon("left")} Bài ${pad2(l.no - 1)}</button>` : ""}<span class="spacer"></span>${HLES.byId["L" + l.lv + "-" + (l.no + 1)] ? `<button class="btn" id="next-l">Bài ${pad2(l.no + 1)} ${icon("right")}</button>` : ""}</div>
    </section></div>`;
    $("#back").onclick = () => { S.settings.hskLv = l.lv - 1; App.go("hvocab"); };
    $("#t-py").onclick = () => { showPy = S.settings.hpy = !showPy; save(); draw(); };
    if ($("#t-vi")) $("#t-vi").onclick = () => { showVi = !showVi; draw(); };
    $("#go-quiz").onclick = () => App.go("hlesson", { id: l.id, quiz: 1 });
    if ($("#play-all")) $("#play-all").onclick = () => Speech.script(l.dlg.flatMap(([w, zh]) => [{ who: w === "A" ? "W" : "M", text: zh }, { pause: 500 }]));
    $$("[data-learn]", el).forEach(b => b.onclick = () => App.go("hlesson", { learn: b.dataset.learn }));
    $$("[data-g]", el).forEach(a => a.onclick = e => { e.preventDefault(); App.go("hgram", a.dataset.g); });
    $$("[data-hz]", el).forEach(b => b.onclick = () => Hz.practice(ws[+b.dataset.hz], ws));
    if ($("#prev-l")) $("#prev-l").onclick = () => App.go("hlesson", { id: "L" + l.lv + "-" + (l.no - 1) });
    if ($("#next-l")) $("#next-l").onclick = () => App.go("hlesson", { id: "L" + l.lv + "-" + (l.no + 1) });
  };
  draw();
};

/* ---- Trang "Bài học" theo cấp: tab Bài học · Chủ đề · Ngữ pháp ---- */
App.views.hvocab = function (el, arg) {
  if (arg && (arg.learn || arg.review)) return App.views.vocab(el, arg);
  let li = S.settings.hskLv != null ? S.settings.hskLv : 0, tab = S.settings.hTab || "les", q = "";
  const draw = () => {
    const L = HSK.lv[li], les = HLES.byLv[L.lv], m = new Map();
    L.sets.forEach(s => { const k = baseName(s); if (!m.has(k)) m.set(k, []); m.get(k).push(s); });
    const topics = [...m].map(([name, sets]) => ({ name, en: L.name, sets })), gl = HG.filter(g => g.lv === Math.min(L.lv, 6));
    const nW = L.sets.reduce((a, s) => a + s.words.length, 0);
    el.innerHTML = `<div class="vpage hskp">
      <div class="hv-lv">${HSK.lv.map((l, i) => `<button class="${i === li ? "on" : ""}" data-lv="${i}"><b>${esc(lvLabel(l.lv).replace("HSK", "Cấp"))}</b><small>${l.lv <= 3 ? "Sơ cấp" : l.lv <= 6 ? "Trung cấp" : "Cao cấp"}</small></button>`).join("")}</div>
      <section class="hv-hero"><div class="hv-crumb">Thư viện HSK 3.0 (9 cấp) › <b>HSK 3.0 ${esc(lvLabel(L.lv).replace("HSK ", "cấp "))}</b></div>
        <div class="hv-row"><span class="hv-badge">${L.lv === 7 ? "高" : "新"}<small>${L.lv === 7 ? "7–9" : L.lv}</small></span><div><small class="hv-tier">${L.lv <= 3 ? "Sơ cấp" : L.lv <= 6 ? "Trung cấp" : "Cao cấp"}</small><h1>HSK 3.0 ${esc(lvLabel(L.lv).replace("HSK ", "cấp "))}</h1><p>${esc(HSK_DESC[L.lv])}</p></div></div><i class="hv-bgzh">新</i></section>
      ${(() => { const nx = les.find(x => lesDone(x) < x.sets.length), started = les.some(x => lesDone(x)); return `<section class="hv-cont"><div>${started && nx ? `<small>Tiếp tục</small><b>${esc(nx.vi)}</b>` : nx ? `<b>Chưa học bài nào? Bắt đầu từ đầu.</b>` : `<b>Bạn đã học hết các bài của cấp này 🎉</b>`}</div>${nx ? `<button class="btn primary" data-les-go="${nx.id}">${icon("play")} ${started ? "Học tiếp bài " + nx.no : "Học bài 1"}</button>` : ""}</section>`; })()}
      <div class="hv-stats"><div><span>${icon("book")}</span><small>Từ vựng</small><b class="num">${nW.toLocaleString("vi-VN")}</b></div><div><span>${icon("spark")}</span><small>Chủ đề</small><b class="num">${topics.length}</b></div><div><span>${icon("clock")}</span><small>Ước tính</small><b class="num">${Math.round(nW / 6)} giờ</b></div></div>
      <div class="hsk-search">${icon("search")}<input id="hq" type="search" placeholder="Tra từ: 学习, xuexi, học tập…" value="${esc(q)}" autocomplete="off"></div>
      <div id="hres"></div>
      <div class="hv-tabs"><button class="${tab === "les" ? "on" : ""}" data-tab="les">Bài học <small>${les.length}</small></button><button class="${tab === "top" ? "on" : ""}" data-tab="top">Chủ đề <small>${topics.length}</small></button><button class="${tab === "gram" ? "on" : ""}" data-tab="gram">Ngữ pháp <small>${gl.length}</small></button></div>
      ${tab === "les" ? `<h2 class="hv-h">Danh sách bài học</h2><p class="muted small" style="margin-bottom:14px">${les.length} bài học · ${nW.toLocaleString("vi-VN")} từ mới của ${esc(lvLabel(L.lv))}${L.lv > 1 ? ` · cộng với từ các cấp trước là ${HSK_CUM[L.lv].toLocaleString("vi-VN")} từ` : ""}${L.lv > 3 ? " · bài ở cấp này ghép theo chủ đề, chưa có hội thoại" : ""}</p>
        <div class="hl-grid">${les.map(x => { const n = lesWords(x).length, d = lesDone(x); return `<div class="hl-card ${d === x.sets.length ? "done" : ""}" data-les="${x.id}" role="button" tabindex="0">
          <span class="hl-no">BÀI ${pad2(x.no)}</span>${icon("right")}<b>${esc(x.vi)}</b>${x.zh ? `<span class="hl-czh">${esc(x.zh)}</span>` : `<span class="hl-czh">${x.sets[0].words.slice(0, 5).map(w => esc(w[0])).join(" · ")}</span>`}
          <span class="hl-meta">${icon("book")} ${n} từ · ${icon("clock")} ${x.sets.length > 1 ? x.sets.length + " chặng · ~10 phút/chặng" : "~10 phút"}${d ? ` · đã học ${d}/${x.sets.length}` : ""}</span>
          <button class="hl-prac" data-prac="${x.id}">${icon("play")} Luyện tập${(S.hles || {})[x.id] != null ? " · " + S.hles[x.id] + "%" : ""}</button><i class="hl-big num">${pad2(x.no)}</i></div>`; }).join("")}</div>` : ""}
      ${tab === "top" ? `<div class="vbar"><span class="muted small">${topics.length} chủ đề theo khung ${esc(lvLabel(L.lv))}</span><div class="vbar-r"><button class="btn sm ${dueKeys().length ? "primary" : ""}" id="hv-rev">${icon("refresh")} ${dueKeys().length ? "Ôn " + dueKeys().length + " từ" : "Ôn tự do"}</button></div></div>
        <div class="vboard">${topics.map((t, ti) => { const n = t.sets.reduce((a, x) => a + x.words.length, 0), got = t.sets.filter(hskOk).reduce((a, x) => a + x.words.length, 0), p = pct(got, n); return `<button class="vnote ${p === 100 ? "done" : ""}" data-topic="${ti}"><em>${esc(t.name)}</em><small class="vsub hsk-prev">${t.sets[0].words.slice(0, 4).map(w => esc(w[0])).join(" · ")}</small>${got ? `<span class="vscore"><span class="vring num">${p}</span></span>` : `<small class="num">${n} từ · ${t.sets.length} chặng</small>`}<i class="ln"></i></button>`; }).join("")}</div>` : ""}
      ${tab === "gram" ? `<h2 class="hv-h">Ngữ pháp ${esc(lvLabel(Math.min(L.lv, 6)))}</h2>${L.lv === 7 ? `<p class="muted small">Chưa có bài ngữ pháp riêng cho HSK 7–9; dưới đây là ngữ pháp HSK 6 để ôn.</p>` : ""}
        <div class="hl-grid">${gl.map((g, i) => `<div class="hl-card ${hgDone(g.id) ? "done" : ""}" data-g="${g.id}" role="button" tabindex="0"><span class="hl-no">NGỮ PHÁP ${pad2(i + 1)}</span>${icon("right")}<b>${esc(g.name)}</b><span class="hl-czh">${esc(g.zh)}</span><span class="hl-meta">${g.eg.length} ví dụ · ${g.ex.length} câu bài tập${hgDone(g.id) ? " · cao nhất " + S.hg[g.id].best + "%" : ""}</span><i class="hl-big num">${pad2(i + 1)}</i></div>`).join("")}</div>` : ""}
    </div>`;
    const inp = $("#hq", el), res = $("#hres", el);
    const search = () => {
      q = inp.value.trim(); if (!q) { res.innerHTML = ""; return; }
      const nq = norm(q).replace(/ /g, ""), out = [];
      for (const s of HSK.all) { for (const w of s.words) { if (w[0].includes(q) || (nq && norm(w[1]).replace(/ /g, "").startsWith(nq)) || (nq.length > 1 && norm(w[3]).includes(norm(q)))) out.push([w, s]); } if (out.length >= 30) break; }
      res.innerHTML = `<div class="glass card hsk-res">${out.length ? out.slice(0, 30).map(([w, s], i) => `<div class="word-row"><div><button class="hsk-hz" data-r="${i}">${esc(w[0])}</button><div class="muted tiny">${esc(w[1])} · ${esc(POS_VI[w[2]] || w[2])} · ${esc(lvLabel(s.lvl.lv))}${s.les ? " · Bài " + s.les.no : ""}</div></div><div class="small">${esc(w[3])}</div>${sayBtn(w[0])}</div>`).join("") : `<p class="muted small">Không tìm thấy từ nào.</p>`}</div>`;
      $$("[data-r]", res).forEach(b => b.onclick = () => Hz.practice(out[+b.dataset.r][0], out.map(x => x[0])));
    };
    inp.oninput = search; if (q) search();
    $$("[data-lv]", el).forEach(b => b.onclick = () => { li = +b.dataset.lv; S.settings.hskLv = li; save(); draw(); });
    $$("[data-tab]", el).forEach(b => b.onclick = () => { tab = S.settings.hTab = b.dataset.tab; save(); draw(); });
    $$("[data-les]", el).forEach(c => c.onclick = e => { if (e.target.closest("[data-prac]")) return; App.go("hlesson", { id: c.dataset.les }); });
    $$("[data-prac]", el).forEach(b => b.onclick = () => App.go("hlesson", { id: b.dataset.prac, quiz: 1 }));
    $$("[data-les-go]", el).forEach(b => b.onclick = () => App.go("hlesson", { id: b.dataset.lesGo }));
    $$("[data-g]", el).forEach(c => c.onclick = () => App.go("hgram", c.dataset.g));
    if ($("#hv-rev")) $("#hv-rev").onclick = () => App.go("hvocab", { review: true, free: !dueKeys().length });
    $$("[data-topic]", el).forEach(b => b.onclick = () => topicSheet(topics[+b.dataset.topic]));
  };
  draw();
};
