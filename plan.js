/* ===== Lộ trình 13 tuần theo Part: tuần → ngày → nhiệm vụ ===== */
const PLAN_SRC = [
  ["Nền tảng — Part 1 mô tả tranh", 0, 1, ["p1", "y-p1out", "y-p1in", "t-office", "x-equip", "x-places", "y-daily"], ["tu-loai", "ht-don", "ht-tiepdien", "dai-tu", "danh-tu"], "p1"],
  ["Part 2 — câu hỏi Wh- và Yes/No", 0, 2, ["p2", "x-time", "x-eat", "x-price", "x-jobs", "t-travel", "t-event"], ["qk-don", "tl-don"], "p2"],
  ["Part 2 — đề nghị, lựa chọn, đáp gián tiếp", 1, 2, ["y-p2", "c-airport", "x-shop", "y-clothes", "y-home", "c-phone", "y-firstday"], ["ht-hoanthanh", "qk-tiepdien", "hoa-hop"], "p2"],
  ["Part 3 — hội thoại công sở", 1, 3, ["p3", "c-meeting", "t-hr", "t-tech", "x-it", "c-order", "x-pay"], ["so-sanh", "gioi-tu"], "p3"],
  ["Part 3 — dịch vụ, ngân hàng, đi lại", 1, 3, ["y-p3", "t-transport", "x-rent", "x-bank", "x-post", "x-doctor", "y-hotel"], ["ht-htttd"], "p3"],
  ["Part 4 — thông báo, tin nhắn thoại", 2, 4, ["p4", "c-announce", "y-air", "x-news", "t-education", "x-fun", "y-tour"], ["bi-dong", "qk-hoanthanh"], "p4"],
  ["Part 4 — quảng cáo, cuộc họp, tham quan", 2, 4, ["y-p4", "t-marketing", "y-ads", "t-shopping", "x-retail", "y-sport", "x-conf"], ["tl-tiepdien", "lien-tu"], "p4"],
  ["Part 5 — từ loại, mệnh đề, V-ing/To V", 2, 5, ["p5", "x-verbs", "x-adjs", "x-advs", "y-nouns", "t-finance", "x-acct"], ["quan-he", "danh-dong-tu"], "p5"],
  ["Part 5 — collocation, giới từ, liên từ", 3, 5, ["y-colloc", "x-preps", "x-confuse", "y-conj", "t-contract", "x-policy", "y-review"], ["phan-tu", "dieu-kien", "tl-hoanthanh"], "p5"],
  ["Part 6 — từ nối, thì và chèn câu", 3, 6, ["p6", "y-p6", "c-email", "y-memo", "t-realestate", "t-construction", "c-complaint"], ["nho-va", "qk-httd"], "p6"],
  ["Part 7 — e-mail, thông báo, tin nhắn", 3, 7, ["p7", "x-para", "y-p7b", "c-interview", "x-report", "t-factory", "y-supply"], ["gia-dinh"], "p7"],
  ["Part 7 — bài báo và văn bản kinh doanh", 4, 7, ["t-media", "x-strategy", "x-project", "x-research", "y-econ", "x-product", "x-qc"], ["dao-ngu", "tl-httd"], "p7"],
  ["Về đích — từ nâng cao và đề tổng hợp", 4, 0, ["t-advanced", "x-legal", "x-tax", "x-invest", "y-mna", "y-medical", "y-nego", "t-health", "y-energy", "y-service"], [], "full"]
];
VOCAB.filter(v => v.wk != null).forEach(v => PLAN_SRC[v.wk][3].push(v.id));
GRAMMAR.filter(g => g.wk != null).forEach(g => PLAN_SRC[g.wk][4].push(g.id));
const PLAN = (() => {
  let dayNo = 0;
  const seen = [];   /* các bài ngữ pháp đã học ở những tuần trước, để xếp bài ôn */
  return PLAN_SRC.map(([title, band, part, vs, gs, exam], wi) => {
    const lv = band <= 1 ? 1 : band === 2 ? 2 : 3, nDays = 7, days = [];
    /* ngày nào cũng có ngữ pháp: rải đều bài mới trong tuần, ngày còn lại ôn lại bài đã học (trong tuần trước, rồi tới các tuần trước) */
    const newAt = {}, n = Math.min(gs.length, nDays);
    if (gs.length > nDays) gs.forEach((g, i) => { const d = i % nDays; (newAt[d] = newAt[d] || []).push(g); });
    else gs.forEach((g, i) => { newAt[Math.floor(i * nDays / Math.max(n, 1))] = [g]; });
    const learned = [];
    let back = 0;
    for (let d = 0; d < nDays; d++) {
      dayNo++;
      const key = `w${wi}d${d}`, mine = vs.filter((_, i) => i % nDays === d), tasks = [];
      if (wi === 0 && d === 0) tasks.push(["pl"]);
      mine.forEach(id => tasks.push(["v", id]));
      let gName = "";
      if (newAt[d]) { newAt[d].forEach(g => { tasks.push([isTense(g) ? "t" : "g", g]); learned.push(g); }); gName = TOPIC_BY_ID[newAt[d][0]].name; }
      else {
        const pool = learned.length ? learned.slice() : seen.slice(-6).reverse();
        const g = pool.length ? pool[back++ % pool.length] : null;
        if (g) { tasks.push(["gr", g, key + "gr"]); gName = "Ôn " + TOPIC_BY_ID[g].name; }
      }
      if (dayNo > 1) tasks.push(["rv", null, key + "rv"]);
      tasks.push(d % 2 === 0 ? ["tr", lv, key + "tr"] : ["sh", lv, key + "sh"]);
      if (exam && (d === 3 || d === 6)) tasks.push(["x", exam, key + "x"]);
      const vt = mine.map(id => VOCAB_BY_ID[id].name.replace(/^Part \d · /, "")).join(" + ");
      const sub = [gName ? `<b>Ngữ pháp:</b> ${esc(gName)}` : "", dayNo > 1 ? "<b>Ôn:</b> từ đến hạn" : "", `<b>Luyện:</b> ${d % 2 === 0 ? "dịch" : "shadowing"}${exam && (d === 3 || d === 6) ? " + đề " + (part ? "Part " + part : "tổng hợp") : ""}`].filter(Boolean).join(" · ");
      days.push({ no: dayNo, key, title: vt + (gName ? " · " + gName : ""), vt: "Từ vựng: " + vt, sub, tasks });
    }
    seen.push(...learned);
    return { i: wi, title, band, part, days };
  });
})();

const _taskInfo = taskInfo;
taskInfo = function (t) {
  const done = S.done || (S.done = {}), key = t[2];
  const arm = (type, need, open) => () => { S.pending = { key, type, need, n: 0 }; Store.save(true); open(); };
  if (t[0] === "rv") return { icon: "refresh", title: "Ôn tập · Từ đến hạn", sub: `${dueKeys().length} từ đến hạn hôm nay`, done: !!done[key], open: arm("rv", 1, () => App.go("vocab", { review: true })) };
  if (t[0] === "gr") { const g = TOPIC_BY_ID[t[1]]; return { icon: "book", title: "Ôn ngữ pháp · " + g.name, sub: "Làm lại bài tập của bài đã học · cần đúng ≥ 60%", done: !!done[key], open: arm("gr", 1, () => App.go("grammar", t[1])) }; }
  const f = _taskInfo(t);
  if (key) {
    f.done = !!done[key];
    if (t[0] === "tr" || t[0] === "sh") f.sub = "3 câu";
    f.open = arm(t[0], t[0] === "x" ? 1 : 3, f.open);
  }
  return f;
};
function markPlan(type) {
  const p = S.pending; if (!p || p.type !== type) return;
  p.n = (p.n || 0) + 1;
  if (p.n >= (p.need || 1)) { (S.done || (S.done = {}))[p.key] = 1; S.pending = null; }
}
TASK_DESC.rv = "Ôn các từ đã học theo lịch lặp lại ngắt quãng.";
TASK_DESC.gr = "Làm lại bài tập ngữ pháp đã học để nhớ lâu.";

function partAcc(part) { return S.tests.reduce((a, t) => { const x = (t.parts || {})[part]; if (x) { a.c += x.c; a.n += x.n; } return a; }, { c: 0, n: 0 }); }
function weekPrio(w) {
  if (!w.part) return 0;
  const a = partAcc(w.part); if (a.n < 3) return 0;
  const r = a.c / a.n, need = needRate((S.profile.target || 990) / 2);
  return r < need - 0.1 ? 1 : r >= Math.max(0.9, need) ? -1 : 0;
}
function routeWeeks() {
  /* lộ trình gồm toàn bộ các tuần: đủ 7 Part, mọi chủ đề từ vựng và mọi bài ngữ pháp, kết thúc bằng tuần đề tổng hợp.
     Tuần dưới trình độ để ôn nhanh, tuần trên mục tiêu để nâng cao; Part bạn làm còn yếu được đưa lên trước */
  return PLAN.map(w => ({ w, p: weekPrio(w) })).sort((a, b) => b.p - a.p || a.w.i - b.w.i).map(x => x.w);
}
/* nhãn cho tuần so với trình độ: dưới mức hiện tại → ôn nhanh, trên mục tiêu → nâng cao */
function weekTag(w) {
  const lo = bandOf(S.profile.current || 10), hi = Math.max(lo, bandOf(Math.max((S.profile.target || 990) - 1, 10)));
  const core = w.band > hi && PLAN.some(x => x.part === w.part && x.i < w.i);  /* Part này đã có tuần trước đó → tuần này là phần nâng cao */
  return w.part === 0 ? "Thi thử tổng hợp" : w.band < lo ? "Ôn nhanh" : core ? "Nâng cao" : "";
}
const weekStat = w => { const all = w.days.flatMap(d => d.tasks).map(taskInfo); return { done: all.filter(x => x.done).length, total: all.length }; };
nextTask = function () {
  const route = routeWeeks(), rest = PLAN.filter(w => !route.includes(w));
  for (const [ri, w] of [...route, ...rest].entries()) for (const [di, d] of w.days.entries()) for (const t of d.tasks) {
    const info = taskInfo(t);
    if (!info.done) return { info, band: w.band, week: w.title, weekObj: w, dayObj: d, label: ri < route.length ? `Tuần ${ri + 1}/${route.length} · Ngày ${ri * 7 + di + 1} · ${d.title}` : `Ngoài lộ trình · ${w.title} · ${d.title}` };
  }
  return null;
};
planData = function () {
  const cur = S.profile.current, tgt = S.profile.target, MIN = { v: 20, t: 25, g: 25, gr: 10, tr: 10, sh: 10, pl: 30, rv: 10 };
  const lo = bandOf(cur || 10), hi = Math.max(lo, bandOf(Math.max(tgt - 1, 10)));
  const weeks = routeWeeks();
  const all = weeks.flatMap(w => w.days.flatMap(d => d.tasks)), left = all.filter(t => !taskInfo(t).done);
  const mins = left.reduce((a, t) => a + (t[0] === "x" ? EXAMS[t[1]].min + 10 : MIN[t[0]]), 0);
  const daily = S.settings.daily || 60, days = Math.ceil(mins / daily);
  return { cur, tgt, gap: Math.max(0, tgt - cur), left, all, mins, daily, days, weeks, words: left.filter(t => t[0] === "v").length * 10, rate: needRate(tgt / 2), rateNow: needRate(cur / 2) };
};
planHTML = function () {
  const d = planData(), est = lastEstimate(), done = d.all.length - d.left.length, fin = addDays(today(), d.days);
  return `<section class="glass card">
    <div class="card-h"><div><h2>Kế hoạch đạt mục tiêu ${d.tgt}</h2><p class="muted small" style="margin-top:4px">Lộ trình riêng cho mức ${d.cur} → ${d.tgt}: ${d.weeks.length} tuần, đủ 7 Part, mọi chủ đề từ vựng và ngữ pháp, kết thúc bằng tuần thi thử.</p></div>
      <div class="field" style="align-items:flex-end">Mỗi ngày học<div class="tabs">${[30, 60, 90, 120].map(m => `<button class="${d.daily === m ? "on" : ""}" data-daily="${m}">${m} phút</button>`).join("")}</div></div></div>
    <div class="grid g4" style="gap:10px">
      <div class="stat in"><div class="v num">${d.gap}</div><div class="l">điểm còn thiếu (${d.cur} → ${d.tgt})</div></div>
      <div class="stat in"><div class="v num">${d.left.length}</div><div class="l">nhiệm vụ còn lại · ${d.words} từ mới</div></div>
      <div class="stat in"><div class="v num">${Math.round(d.mins / 6) / 10} giờ</div><div class="l">thời lượng học còn lại</div></div>
      <div class="stat in"><div class="v num">${d.days} ngày</div><div class="l">${d.left.length ? "xong khoảng " + fmtDate(fin) : "đã xong phần này"}</div></div>
    </div>
    <div style="margin-top:14px">${bar(pct(done, d.all.length))}<div class="row small muted" style="margin-top:6px"><span class="num">Đã xong ${done}/${d.all.length} nhiệm vụ</span><span class="spacer"></span><span class="num">${est ? "Điểm ước lượng gần nhất: " + est : "Chưa có điểm ước lượng"}</span></div></div>
    <div class="note small" style="margin-top:14px">Để đạt khoảng <b class="num">${d.tgt}</b> điểm, bạn cần đúng khoảng <b class="num">${Math.ceil(d.rate * 100)}/100</b> câu nghe và <b class="num">${Math.ceil(d.rate * 100)}/100</b> câu đọc (mức hiện tại khoảng ${Math.round(d.rateNow * 100)}%). Số câu cần đúng từng Part xem ở mục <a href="#parts">Theo Part</a>. Đây là ước tính của trang, không phải bảng quy đổi chính thức.</div>
  </section>`;
};

App.views.roadmap = function (el) {
  const nt = nextTask();
  let openW = nt ? nt.weekObj.i : -1, openD = nt ? nt.dayObj.key : null, showRest = false;
  const draw = () => {
    const route = routeWeeks(), below = PLAN.filter(w => !route.includes(w) && w.band < bandOf(S.profile.current || 10)), above = PLAN.filter(w => !route.includes(w) && !below.includes(w));
    const d = planData(), weak = weakTags().filter(w => w.p < 75).slice(0, 3);
    const weekHTML = (w, ri) => {
      const s = weekStat(w), p = pct(s.done, s.total), on = w.i === openW, pr = ri == null ? 0 : weekPrio(w), a = w.part ? partAcc(w.part) : { n: 0 };
      return `<div class="wk-item ${on ? "open" : ""}">
        <button class="wk-head" data-w="${w.i}" aria-expanded="${on}">
          <span class="wk-ring ${p === 100 ? "full" : ""}" style="--p:${p}"><b class="num">${p === 100 ? icon("check") : p + "%"}</b></span>
          <span class="wk-t"><b>${esc(w.title)}</b><small class="num">${ri == null ? "Ngoài lộ trình" : "Tuần " + (ri + 1)} · ${s.done}/${s.total} nhiệm vụ · Band ${w.band}${ri != null && weekTag(w) ? " · " + weekTag(w) : ""}${a.n >= 3 ? ` · bạn đúng ${pct(a.c, a.n)}% Part ${w.part}` : ""}</small></span>
          ${nt && nt.weekObj.i === w.i ? '<span class="chip accent">Đang học</span>' : pr > 0 ? '<span class="chip bad">Ưu tiên · Part này còn yếu</span>' : pr < 0 ? '<span class="chip good">Bạn làm tốt · học lướt</span>' : ""}<span class="chev">${icon("right")}</span>
        </button>
        ${on ? `<div class="wk-days">${w.days.map((dd, di) => {
          const infos = dd.tasks.map(taskInfo), dn = infos.filter(x => x.done).length, full = dn === infos.length, cur = nt && nt.dayObj.key === dd.key, od = openD === dd.key;
          return `<div class="day ${cur ? "cur" : ""} ${full ? "full" : ""}">
            <button class="day-head" data-d="${dd.key}" aria-expanded="${od}"><span class="day-no"><small>NGÀY</small><b class="num">${full ? icon("check") : (ri == null ? di + 1 : ri * 7 + di + 1)}</b></span><span class="day-t">${esc(dd.vt || dd.title)}${dd.sub ? `<small class="day-sub">${dd.sub}</small>` : ""}</span>${cur ? '<span class="chip accent">Đang học</span>' : ""}<span class="num muted">${dn}/${infos.length}</span><span class="chev">${icon("right")}</span></button>
            ${od ? `<div class="day-tasks">${infos.map((f, i) => `<button class="rtask ${f.done ? "done" : ""}" data-task="${dd.key}:${i}"><span class="ti">${f.done ? icon("check") : icon(f.icon)}</span><span><div class="tt">${esc(f.title)}</div><div class="ts">${esc(f.sub)}</div></span>${icon("right")}</button>`).join("")}</div>` : ""}
          </div>`;
        }).join("")}</div>` : ""}
      </div>`;
    };
    el.innerHTML = `
    <div class="grid">
      <section class="glass page-h">
        <div><h1>Lộ trình ${route.length} tuần của bạn</h1><p>Lộ trình được dựng riêng theo điểm hiện tại ${d.cur} và mục tiêu ${d.tgt}: đi qua đủ 7 Part, mọi chủ đề từ vựng và bài ngữ pháp, rồi kết thúc bằng tuần thi thử. Tuần dưới trình độ ghi “Ôn nhanh”, tuần trên mục tiêu ghi “Nâng cao”, Part bạn làm còn yếu được đưa lên trước. Đổi điểm, làm Test band hoặc làm thêm đề thì lộ trình tự thay đổi.</p></div>
        <div class="row"><span class="chip">Hiện tại <b class="num">&nbsp;${d.cur}</b></span>${icon("right")}<span class="chip accent">Mục tiêu <b class="num">&nbsp;${d.tgt}</b></span><button class="btn sm" id="edit-goal">${icon("pen")} Đổi</button><button class="btn sm" id="do-test">${icon("target")} Test band</button></div>
      </section>
      ${weak.length ? `<section class="prio"><b>Điểm yếu cần ưu tiên</b> <span class="muted small">(từ các bài bạn đã làm)</span><div class="row" style="margin-top:8px">${weak.map(w => `<button class="btn sm" data-tag="${esc(w.tag)}">${esc(tagInfo(w.tag).label)} · <span class="num">${w.p}%</span></button>`).join("")}</div></section>` : `<section class="prio"><b>Chưa có dữ liệu về điểm yếu.</b> <span class="small">Làm Test band hoặc vài đề luyện để lộ trình biết Part nào cần ưu tiên.</span></section>`}
      ${planHTML()}
      <section class="glass weeks">${route.map((w, ri) => weekHTML(w, ri)).join("")}
        <div class="wk-end">${icon("target")} Đích đến: ${d.tgt} điểm</div>
      </section>
      ${below.length + above.length ? `<section class="glass card"><div class="card-h"><div><h2>Ngoài lộ trình của bạn</h2><p class="muted small" style="margin-top:4px">${below.length ? below.length + " tuần nền tảng dưới trình độ" : ""}${below.length && above.length ? " · " : ""}${above.length ? above.length + " tuần nâng cao vượt mục tiêu" : ""}. Mở ra nếu bạn muốn học thêm.</p></div><button class="btn sm" id="rest">${showRest ? "Ẩn" : "Xem"}</button></div>
        ${showRest ? `<div class="weeks" style="padding:0">${[...below, ...above].map(w => weekHTML(w, null)).join("")}</div>` : ""}</section>` : ""}
    </div>`;
    $("#edit-goal").onclick = openGoal;
    $("#do-test").onclick = () => App.go("placement");
    if ($("#rest")) $("#rest").onclick = () => { showRest = !showRest; draw(); };
    $$("[data-daily]", el).forEach(x => x.onclick = () => { S.settings.daily = +x.dataset.daily; save(); draw(); });
    $$("[data-w]", el).forEach(x => x.onclick = () => { openW = openW === +x.dataset.w ? -1 : +x.dataset.w; draw(); });
    $$("[data-d]", el).forEach(x => x.onclick = () => { openD = openD === x.dataset.d ? null : x.dataset.d; draw(); });
    $$("[data-task]", el).forEach(x => x.onclick = () => { const [k, i] = x.dataset.task.split(":"); taskInfo(PLAN.flatMap(w => w.days).find(dd => dd.key === k).tasks[+i]).open(); });
    $$("[data-tag]", el).forEach(b => b.onclick = () => { const ti = tagInfo(b.dataset.tag); App.go(ti.go[0], ti.go[0] === "exam" ? { start: ti.go[1] } : ti.go[0] === "vocab" ? { learn: ti.go[1] } : ti.go[1]); });
  };
  draw();
};
