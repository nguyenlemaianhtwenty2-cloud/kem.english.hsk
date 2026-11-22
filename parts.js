/* ===== Cẩm nang theo Part + kế hoạch đạt mục tiêu ===== */
ROADMAP[0][1].tasks.push(["v", "c-airport"]);
ROADMAP[1][0].tasks.push(["v", "c-meeting"], ["v", "c-phone"]);
ROADMAP[1][1].tasks.push(["v", "t-transport"], ["v", "t-education"], ["v", "c-announce"], ["v", "c-order"]);
ROADMAP[2][0].tasks.push(["v", "t-realestate"], ["v", "c-email"], ["v", "c-complaint"]);
ROADMAP[2][1].tasks.push(["v", "t-construction"], ["v", "c-interview"]);
ROADMAP[3][1].tasks.push(["v", "t-media"]);

BANDS.forEach(b => { const extra = VOCAB.filter(v => v.x && v.band === b.id).map(v => ["v", v.id]); if (extra.length) ROADMAP[b.id].push({ w: "Tuần 3 · Mở rộng vốn từ", tasks: extra }); });

const PART_GUIDE = [
  { p: 1, sec: "L", n: 6, name: "Mô tả tranh", what: "Nhìn một bức ảnh, nghe 4 câu mô tả và chọn câu đúng nhất.",
    learn: ["Động từ chỉ hành động và tư thế: leaning, stacking, pouring, boarding", "Đồ vật và vị trí ở văn phòng, đường phố, nhà hàng, kho hàng", "Phân biệt người đang làm (is V-ing) với trạng thái của vật (has been V3, is being V3)"],
    vocab: ["p1", "t-office", "t-transport", "t-construction"], grammar: ["ht-tiepdien", "bi-dong", "gioi-tu"],
    tips: ["Xem ảnh trước khi nghe: ai, làm gì, ở đâu, vật gì nổi bật.", "Loại đáp án có từ nghe giống nhưng sai hành động hoặc sai chủ thể.", "Ảnh không có người thì chú ý câu bị động và giới từ vị trí."] },
  { p: 2, sec: "L", n: 25, name: "Hỏi – đáp", what: "Nghe một câu hỏi hoặc câu nói và 3 câu đáp, không in chữ.", exam: "p2",
    learn: ["Từ để hỏi Who, When, Where, Why, How và kiểu trả lời tương ứng", "Mẫu câu đề nghị, yêu cầu, rủ rê và cách đồng ý, từ chối", "Câu trả lời gián tiếp: I'm not sure, Let me check, It hasn't been decided"],
    vocab: ["p2", "c-phone", "c-meeting", "c-order"], grammar: ["ht-don", "tl-don", "ht-hoanthanh", "dai-tu"],
    tips: ["Bắt cho được 1–2 từ đầu câu hỏi.", "Câu hỏi Wh- không bao giờ trả lời bằng Yes/No.", "Cảnh giác đáp án lặp lại từ hoặc có âm gần giống từ trong câu hỏi."] },
  { p: 3, sec: "L", n: 39, name: "Hội thoại", what: "13 đoạn hội thoại 2–3 người, mỗi đoạn 3 câu hỏi, có câu kèm bảng biểu.", exam: "p3",
    learn: ["Cụm động từ thường dùng trong công việc: fill in for, look into, run out of", "Tình huống đặt hàng, hẹn lịch, sự cố thiết bị, đi công tác", "Câu hỏi về ý chính, chi tiết, hàm ý người nói và việc sẽ làm tiếp theo"],
    vocab: ["p3", "c-meeting", "c-order", "c-complaint", "t-shopping", "t-tech"], grammar: ["tl-don", "ht-hoanthanh", "dieu-kien", "so-sanh"],
    tips: ["Đọc trước 3 câu hỏi trong lúc nghe phần hướng dẫn.", "Câu hỏi thường theo thứ tự thông tin trong bài.", "Việc sẽ làm tiếp theo nằm ở câu cuối: I'll…, Let me…"] },
  { p: 4, sec: "L", n: 30, name: "Bài nói ngắn", what: "10 bài nói một người: thông báo, tin nhắn thoại, quảng cáo, trích đoạn cuộc họp.", exam: "p4",
    learn: ["Từ vựng thông báo: closure, renovation, postpone, upcoming", "Nhận ra người nói là ai và đang ở đâu qua từ đặc trưng", "Cấu trúc quen thuộc của từng loại bài: chào → mục đích → chi tiết → yêu cầu"],
    vocab: ["p4", "c-announce", "c-phone", "c-airport", "t-event", "t-media"], grammar: ["bi-dong", "tl-tiepdien", "gia-dinh", "lien-tu"],
    tips: ["Mục đích bài nói nằm ngay sau lời chào.", "Trích đoạn cuộc họp thường hỏi vấn đề và việc người nghe được yêu cầu làm.", "Ghi nhớ con số và ngày giờ vì hay bị hỏi lại bằng cách diễn đạt khác."] },
  { p: 5, sec: "R", n: 30, name: "Hoàn thành câu", what: "Chọn từ hoặc cụm từ điền vào chỗ trống của một câu.", exam: "p5",
    learn: ["Từ loại và vị trí từ (chiếm nhiều câu nhất)", "Thì, bị động, hòa hợp chủ vị", "Giới từ, liên từ, đại từ, mệnh đề quan hệ", "Cụm cố định và từ vựng theo ngữ cảnh"],
    vocab: ["p5", "t-contract", "t-finance", "t-hr", "t-advanced"], grammar: ["tu-loai", "hoa-hop", "bi-dong", "gioi-tu", "lien-tu", "quan-he", "phan-tu", "danh-dong-tu"],
    tips: ["Nhìn 4 đáp án trước để biết câu hỏi thuộc dạng nào.", "Câu từ loại: chỉ cần đọc 2 từ trước và sau chỗ trống.", "Giữ nhịp 20–30 giây mỗi câu để dành thời gian cho Part 7."] },
  { p: 6, sec: "R", n: 16, name: "Hoàn thành đoạn văn", what: "4 đoạn văn, mỗi đoạn 4 chỗ trống, trong đó có 1 câu cần chèn.", exam: "p6",
    learn: ["Từ nối giữa các câu: however, therefore, in addition, otherwise", "Chọn thì theo mạch thời gian của cả đoạn", "Chèn câu sao cho khớp ý trước và sau"],
    vocab: ["p6", "c-email", "c-announce", "t-realestate"], grammar: ["lien-tu", "ht-hoanthanh", "tl-don", "dai-tu", "bi-dong"],
    tips: ["Đọc cả đoạn, đừng chỉ đọc câu có chỗ trống.", "Câu chèn: để ý đại từ (this, they) và từ nối xem có khớp câu trước không.", "Câu về thì: tìm ngày tháng ở đầu thư hoặc thông báo."] },
  { p: 7, sec: "R", n: 54, name: "Đọc hiểu", what: "Đoạn đơn, đoạn đôi và đoạn ba: e-mail, quảng cáo, bài báo, tin nhắn.", exam: "p7",
    learn: ["Từ đồng nghĩa và cách diễn đạt lại (paraphrase)", "Đọc lướt tìm ý chính, đọc quét tìm chi tiết", "Câu hỏi suy luận, câu NOT, câu chèn vị trí, đối chiếu nhiều văn bản"],
    vocab: ["p7", "t-media", "t-marketing", "c-email", "c-interview", "t-health"], grammar: ["quan-he", "phan-tu", "dieu-kien", "dao-ngu"],
    tips: ["Đọc câu hỏi trước rồi mới tìm trong bài.", "Làm đoạn đơn ngắn trước, đoạn đôi và ba sau.", "Dành ít nhất 55 phút cho Part 7; câu nào quá 1 phút thì đánh dấu và đi tiếp."] }
];
const needRate = sec => Math.pow(clamp((sec - 5) / 490, 0, 1), 1 / 1.08);

function planData() {
  const cur = S.profile.current, tgt = S.profile.target, MIN = { v: 20, t: 25, g: 25, gr: 10, tr: 10, sh: 10, pl: 30, rv: 10 };
  const left = routeBands().flatMap(b => ROADMAP[b].flatMap(w => w.tasks)).filter(t => !taskInfo(t).done);
  const all = routeBands().flatMap(b => ROADMAP[b].flatMap(w => w.tasks));
  const mins = left.reduce((a, t) => a + (t[0] === "x" ? EXAMS[t[1]].min + 10 : MIN[t[0]]), 0);
  const daily = S.settings.daily || 60, days = Math.ceil(mins / daily);
  return { cur, tgt, gap: Math.max(0, tgt - cur), left, all, mins, daily, days, words: left.filter(t => t[0] === "v").length * 10, rate: needRate(tgt / 2), rateNow: needRate(cur / 2) };
}
function planHTML() {
  const d = planData(), est = lastEstimate(), done = d.all.length - d.left.length;
  const fin = addDays(today(), d.days);
  return `<section class="glass card">
    <div class="card-h"><div><h2>Kế hoạch đạt mục tiêu ${d.tgt}</h2><p class="muted small" style="margin-top:4px">Tính từ các bài còn lại trong lộ trình của bạn (Band ${routeBands()[0]} → Band ${routeBands().slice(-1)[0]}).</p></div>
      <div class="field" style="align-items:flex-end">Mỗi ngày học<div class="tabs">${[30, 60, 90, 120].map(m => `<button class="${d.daily === m ? "on" : ""}" data-daily="${m}">${m} phút</button>`).join("")}</div></div></div>
    <div class="grid g4" style="gap:10px">
      <div class="stat in"><div class="v num">${d.gap}</div><div class="l">điểm còn thiếu (${d.cur} → ${d.tgt})</div></div>
      <div class="stat in"><div class="v num">${d.left.length}</div><div class="l">bài còn lại · ${d.words} từ mới</div></div>
      <div class="stat in"><div class="v num">${Math.round(d.mins / 6) / 10} giờ</div><div class="l">thời lượng học còn lại</div></div>
      <div class="stat in"><div class="v num">${d.days} ngày</div><div class="l">${d.left.length ? "xong khoảng " + fin.slice(8) + "/" + fin.slice(5, 7) + "/" + fin.slice(0, 4) : "đã xong lộ trình"}</div></div>
    </div>
    <div style="margin-top:14px">${bar(pct(done, d.all.length))}<div class="row small muted" style="margin-top:6px"><span class="num">Đã xong ${done}/${d.all.length} bài của lộ trình</span><span class="spacer"></span><span class="num">${est ? "Điểm ước lượng gần nhất: " + est : "Chưa có điểm ước lượng"}</span></div></div>
    <div class="note small" style="margin-top:14px">Để đạt khoảng <b class="num">${d.tgt}</b> điểm, bạn cần đúng khoảng <b class="num">${Math.round(d.rate * 100)}%</b> số câu, tức khoảng <b class="num">${Math.ceil(d.rate * 100)}/100</b> câu nghe và <b class="num">${Math.ceil(d.rate * 100)}/100</b> câu đọc. Mức hiện tại của bạn tương ứng khoảng ${Math.round(d.rateNow * 100)}%. Xem số câu cần đúng từng Part ở mục <a href="#parts">Theo Part</a>. Đây là ước tính theo lộ trình của trang, không phải bảng quy đổi chính thức. Ngoài bài mới, mỗi ngày nhớ điểm danh để ôn lại từ đến hạn.</div>
  </section>`;
}

App.views.parts = function (el, arg) {
  let sel = typeof arg === "number" ? arg : 5;
  const d = planData();
  const draw = () => {
    const g = PART_GUIDE.find(x => x.p === sel);
    const need = Math.ceil(d.rate * g.n), ps = S.tests.reduce((a, t) => { const x = (t.parts || {})[sel]; if (x) { a.c += x.c; a.n += x.n; } return a; }, { c: 0, n: 0 });
    const link = (kind, id) => kind === "v" ? `<button class="rtask ${S.sets[id] && S.sets[id].learned ? "done" : ""}" data-v="${id}"><span class="ti">${S.sets[id] && S.sets[id].learned ? icon("check") : icon("cards")}</span><span><div class="tt">${esc(VOCAB_BY_ID[id].name)}</div><div class="ts">10 từ · Band ${VOCAB_BY_ID[id].band}</div></span>${icon("right")}</button>`
      : `<button class="rtask ${(S.grammar[id] || {}).best >= 60 ? "done" : ""}" data-g="${id}"><span class="ti">${(S.grammar[id] || {}).best >= 60 ? icon("check") : icon("book")}</span><span><div class="tt">${esc(TOPIC_BY_ID[id].name)}</div><div class="ts">${isTense(id) ? "Thì" : "Ngữ pháp"} · Band ${TOPIC_BY_ID[id].band}</div></span>${icon("right")}</button>`;
    el.innerHTML = `
    <div class="grid">
      <section class="glass page-h"><div><h1>Học theo từng Part</h1><p>Mỗi Part thi gì, cần học từ vựng nào, ngữ pháp nào và phải đúng bao nhiêu câu để đạt mục tiêu ${d.tgt}.</p></div>
        <div class="tabs">${PART_GUIDE.map(x => `<button class="${x.p === sel ? "on" : ""}" data-p="${x.p}">Part ${x.p}</button>`).join("")}</div></section>
      <section class="glass card">
        <div class="card-h"><div><h2>Part ${g.p} · ${g.name}</h2><p class="muted small" style="margin-top:4px;max-width:70ch">${g.what}</p></div><span class="chip ${g.sec === "L" ? "warm" : "accent"}">${g.sec === "L" ? "Nghe" : "Đọc"} · ${g.n} câu</span></div>
        <div class="grid g3" style="gap:10px">
          <div class="stat in"><div class="v num">${need}/${g.n}</div><div class="l">câu cần đúng cho mục tiêu ${d.tgt}</div></div>
          <div class="stat in"><div class="v num">${ps.n ? pct(ps.c, ps.n) + "%" : "–"}</div><div class="l">${ps.n ? `tỉ lệ đúng của bạn (${ps.c}/${ps.n} câu đã làm)` : "chưa có dữ liệu luyện Part này"}</div></div>
          <div class="stat in"><div class="v num">${Math.round(d.rate * 100)}%</div><div class="l">tỉ lệ đúng cần đạt</div></div>
        </div>
        <div class="grid g2" style="margin-top:16px">
          <div class="theory"><h3 style="margin-bottom:6px">Cần học gì</h3><ul>${g.learn.map(x => `<li>${x}</li>`).join("")}</ul></div>
          <div class="tipbox"><h4>Chiến thuật làm bài</h4><ul>${g.tips.map(x => `<li>${x}</li>`).join("")}</ul></div>
        </div>
      </section>
      <div class="grid g2">
        <section class="glass card"><div class="card-h"><h2>Từ vựng cho Part ${g.p}</h2><span class="sub num">${g.vocab.filter(id => S.sets[id] && S.sets[id].learned).length}/${g.vocab.length} bộ đã học</span></div><div class="stack">${g.vocab.map(id => link("v", id)).join("")}</div></section>
        <section class="glass card"><div class="card-h"><h2>Ngữ pháp cho Part ${g.p}</h2><span class="sub num">${g.grammar.filter(id => (S.grammar[id] || {}).best >= 60).length}/${g.grammar.length} bài đạt</span></div><div class="stack">${g.grammar.map(id => link("g", id)).join("")}</div>
          <div class="row" style="margin-top:14px">${g.exam ? `<button class="btn primary" id="p-exam">Làm đề Part ${g.p} ${icon("right")}</button>` : `<span class="muted small">Chưa có đề luyện cho Part này.</span>`}</div></section>
      </div>
    </div>`;
    $$("[data-p]", el).forEach(b => b.onclick = () => { sel = +b.dataset.p; draw(); });
    $$("[data-v]", el).forEach(b => b.onclick = () => App.go("vocab", { learn: b.dataset.v }));
    $$("[data-g]", el).forEach(b => b.onclick = () => App.go("grammar", b.dataset.g));
    if ($("#p-exam")) $("#p-exam").onclick = () => App.go("exam", { start: g.exam });
  };
  draw();
};

/* ===== Chấm đề làm trong sách: chỉ nhập đáp án, không chứa nội dung đề ===== */
const SHEET_PARTS = [[1, 1, 6], [2, 7, 31], [3, 32, 70], [4, 71, 100], [5, 101, 130], [6, 131, 146], [7, 147, 200]];
function parseAnswers(t) {
  const raw = String(t || "").toUpperCase();
  const tight = raw.replace(/[\d\s.,;:()\[\]\/]/g, "");
  if (/^[ABCD\-_?]+$/.test(tight)) return [...tight].map(c => "ABCD".indexOf(c));
  return (raw.match(/(^|[^A-ZÀ-Ỹ])([ABCD\-])(?![A-ZÀ-Ỹ])/g) || []).map(m => "ABCD".indexOf(m.slice(-1)));
}
function openAnswerSheet() {
  let scope = "full";
  modal(`<div class="row"><h2 style="flex:1">Chấm đề làm trong sách</h2><button class="btn sm ghost icon-btn" data-close aria-label="Đóng">${icon("x")}</button></div>
    <p class="muted small" style="margin:6px 0 14px">Làm đề trong sách hoặc file của bạn, rồi dán đáp án của bạn và đáp án đúng vào đây. Trang chấm điểm, tách theo Part và lưu vào lịch sử. Có thể dán dạng <span class="kbd">ABCD…</span> hoặc <span class="kbd">1 A 2 B…</span>; câu bỏ trống ghi dấu <span class="kbd">-</span>.</p>
    <div class="stack">
      <label class="field" for="as-name">Tên đề<input class="input" id="as-name" placeholder="Ví dụ: ETS 2026 – Test 1" maxlength="60"></label>
      <div class="field">Phạm vi<div class="tabs"><button class="on" data-sc="full">Cả đề (200 câu)</button><button data-sc="L">Listening (1–100)</button><button data-sc="R">Reading (101–200)</button></div></div>
      <label class="field" for="as-mine">Đáp án của bạn<textarea class="input" id="as-mine" spellcheck="false"></textarea></label>
      <label class="field" for="as-key">Đáp án đúng<textarea class="input" id="as-key" spellcheck="false"></textarea></label>
      <div id="as-out"></div>
      <div class="row" style="justify-content:flex-end"><button class="btn primary" id="as-go">Chấm điểm</button></div>
    </div>`, (m) => {
    $$("[data-sc]", m).forEach(b => b.onclick = () => { scope = b.dataset.sc; $$("[data-sc]", m).forEach(x => x.classList.toggle("on", x === b)); });
    $("#as-go", m).onclick = () => {
      const mine = parseAnswers($("#as-mine", m).value), key = parseAnswers($("#as-key", m).value);
      const n = scope === "full" ? 200 : 100, first = scope === "R" ? 101 : 1, out = $("#as-out", m);
      if (key.length !== n || mine.length !== n) { out.innerHTML = `<div class="feedback no">Cần đúng ${n} đáp án ở mỗi ô. Hiện có ${mine.length} đáp án của bạn và ${key.length} đáp án đúng.</div>`; return; }
      const res = { id: Date.now(), type: "book", title: $("#as-name", m).value.trim() || "Đề trong sách", date: today(), total: n, correct: 0, L: { c: 0, n: 0 }, R: { c: 0, n: 0 }, parts: {}, tags: {}, used: 0 };
      const wrong = [];
      for (let i = 0; i < n; i++) {
        const no = first + i, ok = mine[i] >= 0 && mine[i] === key[i], part = SHEET_PARTS.find(p => no >= p[1] && no <= p[2])[0];
        const sec = no <= 100 ? res.L : res.R; sec.n++; if (ok) { sec.c++; res.correct++; } else wrong.push(no);
        const pp = res.parts[part] || (res.parts[part] = { c: 0, n: 0 }); pp.n++; if (ok) pp.c++;
      }
      const L = res.L.n ? estSec(res.L.c / res.L.n) : null, R = res.R.n ? estSec(res.R.c / res.R.n) : null;
      if (scope === "full") res.est = { L, R, T: L + R };
      S.tests.push(res); if (S.tests.length > 60) S.tests = S.tests.slice(-60);
      addXP(20); bump("test");
      out.innerHTML = `<div class="feedback ok"><b class="num">${res.correct}/${n} câu đúng</b> · ${scope === "full" ? `ước lượng <b class="num">${res.est.T}</b> điểm (L ${L} · R ${R})` : `ước lượng phần ${scope === "L" ? "nghe " + L : "đọc " + R}/495`}</div>
        <div style="margin-top:10px">${Object.entries(res.parts).map(([k, v]) => `<div class="tag-row" style="grid-template-columns:minmax(0,1fr) 120px 60px"><span>Part ${k}</span>${bar(pct(v.c, v.n), pct(v.c, v.n) < 50 ? "warm" : "")}<span class="num small">${v.c}/${v.n}</span></div>`).join("")}</div>
        ${wrong.length ? `<p class="small muted" style="margin-top:10px">Câu sai hoặc bỏ trống: <span class="num">${wrong.join(", ")}</span></p>` : ""}
        <p class="tiny muted" style="margin-top:6px">Đã lưu vào lịch sử. Điểm ước lượng theo công thức gần đúng của trang, không phải bảng quy đổi của từng đề.</p>`;
      $("#as-go", m).disabled = true;
      if (App.view === "exam") { /* cập nhật khi đóng */ }
    };
    m.addEventListener("click", e => { if (e.target.closest("[data-close]") && App.view === "exam") App.render(); });
  });
}
