/* ===== Part 1: tranh minh họa tự vẽ + 4 câu mô tả (nghe) ===== */
const SK = "#f3c9a5", LN = "#3b3f4a";
const svgWrap = (bg, inner) => `<svg viewBox="0 0 400 260" role="img" aria-label="Tranh Part 1" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="260" fill="${bg}"/>${inner}</svg>`;
const person = (x, y, shirt, hair, extra = "") => `<rect x="${x - 13}" y="${y + 62}" width="11" height="52" rx="5" fill="#4b5568"/><rect x="${x + 2}" y="${y + 62}" width="11" height="52" rx="5" fill="#4b5568"/><rect x="${x - 18}" y="${y + 12}" width="36" height="58" rx="12" fill="${shirt}"/><circle cx="${x}" cy="${y}" r="14" fill="${SK}"/><path d="M${x - 14} ${y - 2}a14 14 0 0 1 28 0q-14 -9 -28 0z" fill="${hair}"/>${extra}`;
const P1 = [
  { svg: svgWrap("#eef3f8", `<rect y="200" width="400" height="60" fill="#d9c7b0"/><rect x="250" y="30" width="110" height="90" rx="4" fill="#cfe6f1" stroke="#fff" stroke-width="6"/><path d="M305 30v90M250 75h110" stroke="#fff" stroke-width="4"/>
      <rect x="165" y="118" width="40" height="70" rx="14" fill="#8fb7e8"/><circle cx="185" cy="100" r="16" fill="${SK}"/><path d="M168 100q-4 -24 17 -24t17 24q-2 30 4 44h-12q-2 -40 -9 -44q-10 -4 -17 0z" fill="#5a3b2e"/>
      <path d="M172 140q-20 14 0 26h28" stroke="#8fb7e8" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M198 140q18 12 22 26" stroke="#8fb7e8" stroke-width="12" fill="none" stroke-linecap="round"/>
      <rect x="70" y="180" width="270" height="12" rx="4" fill="#b08968"/><rect x="85" y="192" width="10" height="60" fill="#8d6e53"/><rect x="315" y="192" width="10" height="60" fill="#8d6e53"/>
      <rect x="190" y="172" width="66" height="8" rx="3" fill="#9aa3b2"/><path d="M200 172l8 -40h56l-8 40z" fill="#5b6475"/><path d="M206 168l6 -32h46l-6 32z" fill="#dff0ff"/>
      <rect x="100" y="162" width="18" height="18" rx="3" fill="#fff"/><path d="M118 166q8 0 8 6t-8 6" stroke="#fff" stroke-width="3" fill="none"/>
      <rect x="290" y="160" width="20" height="20" rx="3" fill="#d98c5f"/><path d="M300 160q-14 -22 -4 -34q4 16 4 34q2 -20 12 -28q2 16 -12 28" fill="#6fbf8b"/>`),
    o: ["She's talking on the phone.", "She's typing on a laptop.", "She's watering a plant.", "She's closing a window."], a: 1 },
  { svg: svgWrap("#f6efe4", `<rect y="205" width="400" height="55" fill="#cdb79e"/><rect x="0" y="0" width="400" height="205" fill="#f4e7d3"/><rect x="0" y="0" width="230" height="205" fill="#cfe3c8"/>
      <path d="M150 205L205 40M190 205L245 40" stroke="#a9773f" stroke-width="7" stroke-linecap="round"/><path d="M160 175h40M168 150h40M177 122h40M186 95h40M195 68h40" stroke="#a9773f" stroke-width="6" stroke-linecap="round"/>
      <rect x="275" y="165" width="42" height="40" rx="4" fill="#9aa3b2"/><path d="M275 172q21 -30 42 0" stroke="#6b7280" stroke-width="3" fill="none"/><rect x="275" y="165" width="42" height="9" fill="#7fb38a"/>
      <rect x="330" y="186" width="46" height="8" rx="3" fill="#c98f52"/><rect x="372" y="183" width="16" height="14" rx="2" fill="#f1e2c4"/>
      <rect x="40" y="198" width="90" height="7" rx="2" fill="#fff" opacity=".8"/>`),
    o: ["A ladder is leaning against a wall.", "A man is climbing a ladder.", "Some paint cans are stacked on a shelf.", "A window is being cleaned."], a: 0 },
  { svg: svgWrap("#fdf3e7", `<rect x="0" y="0" width="400" height="120" fill="#f7dfc8"/><rect x="30" y="24" width="120" height="16" rx="4" fill="#b08968"/><rect x="40" y="2" width="16" height="22" rx="3" fill="#fff"/><rect x="64" y="2" width="16" height="22" rx="3" fill="#fff"/><rect x="88" y="2" width="16" height="22" rx="3" fill="#fff"/>
      <rect x="270" y="20" width="100" height="62" rx="6" fill="#3f4656"/><path d="M284 38h72M284 52h56M284 66h64" stroke="#f7dfc8" stroke-width="4" stroke-linecap="round"/>
      ${person(170, 78, "#7fb38a", "#3b2f2a", `<rect x="152" y="96" width="36" height="52" rx="4" fill="#fff" opacity=".9"/>`)}
      <rect x="0" y="170" width="400" height="90" fill="#a9773f"/><rect x="0" y="162" width="400" height="12" fill="#c99760"/>
      <path d="M186 104q30 0 44 18" stroke="#7fb38a" stroke-width="11" fill="none" stroke-linecap="round"/>
      <path d="M226 108h34v26q0 6 -6 6h-22q-6 0 -6 -6z" fill="#9aa3b2"/><path d="M226 114l-16 -8" stroke="#9aa3b2" stroke-width="6" stroke-linecap="round"/><path d="M260 114q12 0 12 9t-12 9" stroke="#6b7280" stroke-width="4" fill="none"/>
      <path d="M212 108q-6 18 -4 36" stroke="#6b4a2f" stroke-width="3" fill="none"/>
      <rect x="194" y="144" width="26" height="18" rx="3" fill="#fff"/><path d="M220 148q8 0 8 5t-8 5" stroke="#fff" stroke-width="3" fill="none"/>
      <rect x="60" y="140" width="34" height="22" rx="3" fill="#e8b4b8"/><rect x="300" y="146" width="50" height="16" rx="3" fill="#f1e2c4"/>`),
    o: ["A man is wiping a counter.", "A man is washing some cups.", "A man is pouring a drink into a cup.", "A man is handing a menu to a customer."], a: 2 },
  { svg: svgWrap("#dff0fb", `<rect y="190" width="400" height="70" fill="#c9cdd3"/><rect y="180" width="400" height="12" fill="#e4e7eb"/><circle cx="330" cy="46" r="22" fill="#fff6c9"/>
      <rect x="52" y="90" width="12" height="92" fill="#8d6e53"/><circle cx="58" cy="70" r="40" fill="#8fcf9f"/><circle cx="32" cy="92" r="24" fill="#a5dbb2"/><circle cx="86" cy="90" r="24" fill="#7cc48f"/>
      <rect x="120" y="140" width="110" height="9" rx="3" fill="#b08968"/><rect x="120" y="118" width="110" height="9" rx="3" fill="#b08968"/><rect x="128" y="118" width="7" height="64" fill="#6b7280"/><rect x="215" y="118" width="7" height="64" fill="#6b7280"/>
      <g fill="none" stroke="${LN}" stroke-width="4"><circle cx="268" cy="166" r="17"/><circle cx="318" cy="166" r="17"/><path d="M268 166l18 -30h22l10 30M286 136l12 30h-30M280 130h12M308 136l-4 -10h10" stroke="#d9667b"/></g>
      <g fill="none" stroke="${LN}" stroke-width="4"><circle cx="336" cy="170" r="17"/><circle cx="384" cy="170" r="17"/><path d="M336 170l18 -30h20l10 30M354 140l12 30h-30M348 134h12M374 140l-4 -10h10" stroke="#5b8fd9"/></g>`),
    o: ["A man is riding a bicycle.", "People are sitting on a bench.", "A bench is being painted.", "Some bicycles are parked near a bench."], a: 3 },
  { svg: svgWrap("#eef0f3", `<rect y="200" width="400" height="60" fill="#b9bec6"/><rect x="230" y="70" width="150" height="100" rx="6" fill="#f1e2c4"/><rect x="230" y="70" width="150" height="14" fill="#e3cfa6"/><rect x="340" y="110" width="60" height="60" rx="6" fill="#7aa7d9"/><rect x="352" y="118" width="40" height="24" rx="3" fill="#dff0ff"/>
      <circle cx="262" cy="182" r="18" fill="#3b3f4a"/><circle cx="262" cy="182" r="7" fill="#9aa3b2"/><circle cx="362" cy="182" r="18" fill="#3b3f4a"/><circle cx="362" cy="182" r="7" fill="#9aa3b2"/>
      <g fill="#d9a066" stroke="#b07a3e" stroke-width="2"><rect x="30" y="160" width="46" height="40"/><rect x="78" y="160" width="46" height="40"/><rect x="54" y="120" width="46" height="40"/></g>
      ${person(170, 84, "#f0a04b", "#2f2a28", `<path d="M156 108q-2 22 14 26M186 108q4 22 -12 26" stroke="#f0a04b" stroke-width="11" fill="none" stroke-linecap="round"/><rect x="150" y="118" width="44" height="34" fill="#d9a066" stroke="#b07a3e" stroke-width="2"/><path d="M150 134h44" stroke="#b07a3e" stroke-width="2"/>`)}
      <path d="M156 78h28v-8q-14 -8 -28 0z" fill="#f6d04d"/>`),
    o: ["A worker is carrying a box.", "A worker is driving a truck.", "A man is opening a box.", "A truck is being washed."], a: 0 },
  { svg: svgWrap("#f3f1ec", `<rect y="190" width="400" height="70" fill="#d6cdbf"/><rect x="130" y="22" width="140" height="78" rx="5" fill="#3f4656"/><rect x="138" y="30" width="124" height="62" rx="2" fill="#e9eef5"/><path d="M152 78l26 -22 22 12 36 -28" stroke="#7aa7d9" stroke-width="4" fill="none"/>
      <rect x="30" y="40" width="60" height="80" rx="4" fill="#cfe6f1" stroke="#fff" stroke-width="5"/>
      <ellipse cx="200" cy="176" rx="130" ry="30" fill="#b08968"/><ellipse cx="200" cy="170" rx="130" ry="30" fill="#c99760"/>
      <g fill="#6f86b9"><rect x="60" y="130" width="34" height="38" rx="8"/><rect x="306" y="130" width="34" height="38" rx="8"/><rect x="130" y="112" width="34" height="34" rx="8"/><rect x="236" y="112" width="34" height="34" rx="8"/><rect x="118" y="196" width="38" height="44" rx="9"/><rect x="244" y="196" width="38" height="44" rx="9"/></g>
      <rect x="182" y="158" width="36" height="24" rx="2" fill="#fff"/><rect x="330" y="60" width="36" height="60" rx="4" fill="#d98c5f"/><path d="M348 60q-18 -26 -6 -40q6 18 6 40q2 -24 14 -32q4 18 -14 32" fill="#6fbf8b"/>`),
    o: ["People are attending a presentation.", "A table is being moved.", "Chairs have been arranged around a table.", "Some chairs are stacked in a corner."], a: 2 }
];
EXAMS.p1 = { name: "Part 1 · Mô tả tranh", sec: "L", n: 6, min: 5, desc: "Nhìn tranh minh họa, nghe 4 câu mô tả và chọn câu đúng." };
EXAMS.full.n = 42; EXAMS.full.desc = "20 câu nghe (có Part 1) + 22 câu đọc, có ước lượng điểm.";
TAG_STATIC["l-p1"] = ["Part 1 · Mô tả tranh", "p1", "Xem tranh trước khi nghe: ai, đang làm gì, vật gì ở đâu. Loại câu sai hành động hoặc nhắc tới thứ không có trong tranh."];
G.p1 = it => ({ kind: "audio", part: 1, title: "Part 1 · Mô tả tranh", note: "Nhìn tranh, nghe 4 câu mô tả (không in chữ) và chọn câu mô tả đúng nhất.", img: it.svg,
  audio: it.o.map((o, i) => ({ who: "M", text: LETTERS[i] + ". " + o })), transcript: it.o.map((o, i) => `(${LETTERS[i]}) ${o}`).join("\n"),
  qs: [{ q: "Chọn câu mô tả đúng nhất bức tranh.", o: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"], a: it.a, t: "l-p1", part: 1, e: "Đáp án đúng: " + it.o[it.a] }] });
const _buildExam = buildExam;
buildExam = function (type) {
  if (type === "p1") return shuffle(P1).map(G.p1);
  if (type === "full") return [...pick(P1, 2).map(G.p1), ..._buildExam(type)];
  return _buildExam(type);
};
PART_GUIDE[0].exam = "p1";
