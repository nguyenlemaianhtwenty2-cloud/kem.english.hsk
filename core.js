/* ===== Tiện ích ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n);
const pad = n => String(n).padStart(2, "0");
const dkey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addDays = (k, n) => { const [y, m, d] = k.split("-").map(Number); return dkey(new Date(y, m - 1, d + n)); };
const today = () => dkey();
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const pct = (c, n) => n ? Math.round(c / n * 100) : 0;
const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/[’‘`]/g, "'").replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();
const tokens = s => norm(s).split(" ").filter(Boolean);
const fmtDate = k => { if (!k) return ""; const [y, m, d] = k.split("-"); return `${d}/${m}/${y}`; };
const LETTERS = ["A", "B", "C", "D"];

const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z"/>',
  route: '<path d="M9 4 3 6.500V20l6-2.500 6 2.500 6-2.500V4l-6 2.500L9 4z"/><path d="M9 4v13.500M15 6.500V20"/>',
  cards: '<rect x="3" y="6" width="14" height="15" rx="3"/><path d="M7 17l3-7 3 7M8.200 14.500h3.600"/><path d="M8 3h10a3 3 0 0 1 3 3v11"/>',
  book: '<path d="M2 5h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2zM22 5h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/>',
  lang: '<path d="M4 5h9M8.5 3v2M6 9c1.2 2.8 3.6 4.8 6.5 6M11 5c-1 4.2-3.8 7.8-7 9.2"/><path d="M13 21l4-9 4 9M14.4 18h5.2"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  exam: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  sliders: '<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
  flame: '<path d="M12 3c.8 3.6 5.5 5.8 5.5 10.6A5.5 5.5 0 0 1 6.5 14c0-2.6 1.4-3.9 2-6 1.6 1 2.4 2.6 2.4 4.4C12 10.6 12.4 6.6 12 3z"/>',
  play: '<path d="M7 4.5v15l12.5-7.5z"/>',
  pause: '<path d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z"/>',
  vol: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 9a4 4 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11"/>',
  check: '<path d="M4.5 12.5l5 5L20 7"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  right: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  left: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4.5V11h-6.5"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  spark: '<path d="M12 3l1.9 5.6L19.5 10.5l-5.6 1.9L12 18l-1.9-5.6-5.6-1.9 5.6-1.9z"/>',
  head: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4.5" height="7" rx="1.5"/><rect x="16.5" y="14" width="4.5" height="7" rx="1.5"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/>'
};
const SOLID = {
  home: '<path d="M12 3.2 3 10.6V20a1 1 0 0 0 1 1h5.5v-6h5v6H20a1 1 0 0 0 1-1v-9.4z"/>',
  route: '<path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>',
  cards: '<path d="M8 3h10a3 3 0 0 1 3 3v11h-2V6a1 1 0 0 0-1-1H8z"/><path d="M3 9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm4 2v1.800h6V11zm0 4v1.800h4V15z"/>',
  book: '<path d="M2 5.5C5 4 8.5 4 11 6v14c-2.5-1.800-6-1.800-9-.5zM22 5.5C19 4 15.5 4 13 6v14c2.5-1.800 6-1.800 9-.5z"/>',
  lang: '<path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3-3.5 8h1.900l.6-1.5h2l.6 1.5h1.900zm-.4 5 .4-1.100.4 1.100z"/>',
  mic: '<path d="M12 2a3.5 3.5 0 0 0-3.5 3.5v6a3.5 3.5 0 0 0 7 0v-6A3.5 3.5 0 0 0 12 2z"/><path d="M5 11a1 1 0 0 1 2 0 5 5 0 0 0 10 0 1 1 0 0 1 2 0 7 7 0 0 1-6 6.900V21h-2v-3.100A7 7 0 0 1 5 11z"/>',
  list: '<rect x="3.5" y="3.5" width="7.5" height="7.5" rx="2.2"/><rect x="13" y="3.5" width="7.5" height="7.5" rx="2.2"/><rect x="3.5" y="13" width="7.5" height="7.5" rx="2.2"/><rect x="13" y="13" width="7.5" height="7.5" rx="2.2"/>',
  exam: '<path d="M9 2h6a1 1 0 0 1 1 1v1h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V3a1 1 0 0 1 1-1zM8 13.5l3.2 3.2 5.300-5.300-1.4-1.4-3.900 3.900-1.800-1.800z"/>',
  target: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>',
  flame: '<path d="M12 2c1 4 6 6 6 11.5A6 6 0 0 1 6 13.5c0-2.5 1.5-4 2-6 1.800 1 2.5 2.5 2.5 4.5C12 10 12.5 6 12 2z"/>',
  head: '<path d="M12 3a9 9 0 0 0-9 9v5a3 3 0 0 0 3 3h1.5a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H5.100a7 7 0 0 1 13.800 0H16.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1H18a3 3 0 0 0 3-3v-5a9 9 0 0 0-9-9z"/>',
  spark: '<path d="M12 2l2.300 6.700L21 11l-6.700 2.300L12 20l-2.300-6.700L3 11l6.700-2.300z"/>',
  clock: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v4.6l3.2 1.900-1 1.700L11 12.800z"/>',
  lock: '<path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 0 1 6 0v3z"/>'
};
/* Biểu tượng kiểu vẽ tay: nét viền tròn + một mảng màu pastel lệch phía sau */
const PASTEL = { y: "#ffe27a", p: "#ffb3cf", s: "#a9dcf5", m: "#b5ebc0", l: "#d4bff5", o: "#ffc078" };
const gearPath = (() => { let d = ""; const n = 8; for (let i = 0; i < n * 2; i++) { const a = Math.PI * i / n - Math.PI / 2, w = Math.PI / n * 0.34, r = i % 2 ? 6.1 : 8.3; for (const [k, aa] of [[0, a - w], [1, a + w]]) d += (i === 0 && k === 0 ? "M" : "L") + (12 + Math.cos(aa) * r).toFixed(2) + " " + (12 + Math.sin(aa) * r).toFixed(2); } return d + "z"; })();
const DOODLE = {
  home: ["y", '<circle cx="16.5" cy="8.5" r="5.5"/>', '<path d="M3.5 11.5 12 4l8.500 7.500"/><path d="M6 10v9.500h12V10"/><path d="M10 19.500v-5h4v5"/>'],
  route: ["p", '<circle cx="16" cy="8" r="5"/>', '<path d="M4 7.500l5-2 6 2 5-2V18l-5 2-6-2-5 2z"/><path d="M9 5.500V18M15 7.500V20"/>'],
  cards: ["s", '<rect x="8.500" y="3" width="12" height="14" rx="3"/>', '<rect x="4" y="7" width="12" height="14" rx="3"/><path d="M7.500 12h5M7.500 15.500h3"/>'],
  book: ["y", '<path d="M3 6c3-1.500 6-1.500 9 .500v13c-3-2-6-2-9-.500z"/>', '<path d="M3 6c3-1.500 6-1.500 9 .500 3-2 6-2 9-.500v13c-3-1.500-6-1.500-9 .500-3-2-6-2-9-.500z"/><path d="M12 6.500v13"/>'],
  lang: ["m", '<circle cx="15.500" cy="9" r="5.500"/>', '<path d="M4 5h16v11h-9l-4 3.500V16H4z"/><path d="M9.500 13.500 12 7.500l2.500 6M10.400 11.500h3.200"/>'],
  mic: ["p", '<circle cx="15.500" cy="8" r="5"/>', '<path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6"/>'],
  list: ["l", '<rect x="12" y="3" width="9" height="9" rx="2.500"/>', '<rect x="4" y="4" width="6.500" height="6.500" rx="1.800"/><rect x="13.500" y="4" width="6.500" height="6.500" rx="1.800"/><rect x="4" y="13.500" width="6.500" height="6.500" rx="1.800"/><rect x="13.500" y="13.500" width="6.500" height="6.500" rx="1.800"/>'],
  exam: ["y", '<rect x="9" y="8" width="11" height="12" rx="2"/>', '<path d="M8.500 5H6v16h12V5h-2.500"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M8.500 13.500l2.500 2.500 4.500-5"/>'],
  target: ["p", '<circle cx="12" cy="12" r="5"/>', '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.200"/>'],
  search: ["s", '<circle cx="12.500" cy="9.500" r="5.500"/>', '<circle cx="10.500" cy="10.500" r="6.500"/><path d="M15.500 15.500 20.500 20.500"/>'],
  vol: ["m", '<circle cx="9" cy="12" r="5.500"/>', '<path d="M4 9.500h3.500L12 6v12l-4.500-3.500H4z"/><path d="M15.500 9.500a3.500 3.500 0 0 1 0 5M18 7a7 7 0 0 1 0 10"/>'],
  head: ["l", '<circle cx="12" cy="10" r="6"/>', '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 13.500h3v6H5.500A1.500 1.500 0 0 1 4 18zM20 13.500h-3v6h1.500a1.500 1.500 0 0 0 1.500-1.500z"/>'],
  flame: ["o", '<path d="M12 9c.500 2.500 3.500 3.500 3.500 6.500a3.500 3.500 0 0 1-7 0c0-1.500.800-2.500 1.200-3.500 1 .500 1.500 1.500 1.500 2.500C12 13.500 12.300 11 12 9z"/>', '<path d="M12 2.500c1 4 6 6 6 11.500a6 6 0 0 1-12 0c0-2.500 1.500-4 2-6 1.800 1 2.500 2.500 2.500 4.500C12 10.500 12.500 6.500 12 2.500z"/>'],
  sliders: ["p", '<path d="M19.500 2l.700 1.800 1.800.700-1.800.700-.700 1.800-.700-1.800-1.800-.700 1.800-.700z"/><circle cx="12" cy="12" r="6.500" opacity=".55"/>', `<path d="${gearPath}"/><circle cx="12" cy="12" r="2.800"/>`],
  clock: ["y", '<circle cx="13.500" cy="10.500" r="6.500"/>', '<circle cx="12" cy="12" r="8.500"/><path d="M12 7.500V12l3 2"/>'],
  lock: ["s", '<rect x="7" y="11" width="13" height="9" rx="2.500"/>', '<rect x="5" y="11" width="14" height="9.500" rx="2.500"/><path d="M8 11V8a4 4 0 0 1 8 0v3M12 14.500v2.500"/>'],
  pen: ["y", '<rect x="2.500" y="19" width="9" height="3" rx="1.500"/>', '<path d="M5.500 18.500l1-4L16 5l3 3-9.500 9.500z"/><path d="M13.500 7.500l3 3M17 15l1.500-.500M17.500 18l1.800.300"/>'],
  spark: ["y", '<circle cx="14" cy="10" r="5.500"/>', '<path d="M12 3l2.200 6.300L20.500 11.500l-6.300 2.200L12 20l-2.200-6.300L3.500 11.500l6.300-2.200z"/>'],
  briefcase: ["o", '<circle cx="16" cy="9" r="5.500"/>', '<rect x="4" y="8" width="16" height="11.500" rx="2"/><path d="M9 8V5.500h6V8M4 13h16M11 13v1.500h2V13"/>'],
  plane: ["s", '<circle cx="15" cy="9" r="5.500"/>', '<path d="M3 11l18-7-6 17-3.500-7z"/><path d="M11.500 14 21 4"/>'],
  cup: ["o", '<circle cx="9" cy="13" r="5.500"/>', '<path d="M5 8.500h11V14a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 10h1.500a2.500 2.500 0 0 1 0 5H16M8.500 3.500v2M12 3.500v2"/>'],
  laptop: ["l", '<rect x="8" y="4" width="12" height="8" rx="2"/>', '<rect x="5" y="6" width="14" height="9.500" rx="1.500"/><path d="M3 18.500h18"/>'],
  bag: ["p", '<circle cx="15.500" cy="12" r="5.500"/>', '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6.500a3 3 0 0 1 6 0V8"/>'],
  coin: ["y", '<circle cx="13.500" cy="10.500" r="6.500"/>', '<circle cx="12" cy="12" r="8.500"/><path d="M12 7.500v9M14.500 9.800c-1.800-1.200-4.800-.800-4.800 1.100s4.800 1.200 4.800 3.200-3 2.300-5 1.100"/>'],
  box: ["o", '<path d="M12 12l8-4v9l-8 4z"/>', '<path d="M4 8l8-4 8 4v9l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v9"/>'],
  heart: ["p", '<circle cx="15" cy="10" r="5.500"/>', '<path d="M12 20s-7.500-4.600-7.500-10A4 4 0 0 1 12 7.500 4 4 0 0 1 19.500 10c0 5.400-7.500 10-7.500 10z"/>'],
  mail: ["s", '<rect x="7" y="4" width="13" height="9" rx="2"/>', '<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4.500 7.500 12 13l7.500-5.500"/>'],
  chat: ["m", '<circle cx="15.500" cy="9" r="5.500"/>', '<path d="M4 5h16v11h-9l-4 3.500V16H4z"/><path d="M8 9.500h8M8 12.500h5"/>']
};
const icon = (n, cls = "") => DOODLE[n] && !cls
  ? `<svg class="ico doo" viewBox="0 0 24 24" aria-hidden="true">${DOODLE[n][2]}</svg>`.replace(/(\d)\.(\d)00/g, "$1.$2")
  : `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ""}</svg>`;
const TOPIC_ICONS = [[/văn phòng|thư tín|giấy/i, "briefcase"], [/nhân sự|tuyển|đi làm/i, "chat"], [/du lịch|hàng không|đi lại/i, "plane"], [/khách sạn|nhà ở|đời sống/i, "home"], [/ăn uống|nhà hàng/i, "cup"], [/công nghệ/i, "laptop"], [/marketing|mua|bán/i, "bag"], [/tài chính|ngân hàng/i, "coin"], [/sản xuất|nhà máy|kho/i, "box"], [/hợp đồng|pháp|thương lượng/i, "exam"], [/chiến lược|dự án/i, "target"], [/sức khỏe|cảm xúc|sự cố/i, "heart"], [/giao thông|chỉ đường|hướng dẫn/i, "route"], [/giáo dục|giải trí/i, "spark"], [/truyền thông|e-mail|thông báo/i, "mail"], [/họp|gọi điện|trò chuyện|lịch hẹn/i, "chat"], [/part 1/i, "search"], [/part 2/i, "chat"], [/part 3/i, "head"], [/part 4/i, "vol"], [/part 5/i, "pen"], [/part 6/i, "mail"], [/part 7/i, "book"]];
const topicIcon = name => (TOPIC_ICONS.find(([re]) => re.test(name)) || [0, "cards"])[1];
const CUTE_COLORS = ["#fff3b0", "#a9e4f5", "#ffc2dc", "#c4f0cc", "#dcc8fb"];
const iconFill = n => icon(n, "fill");

/* ===== Band & lộ trình ===== */
const BANDS = [
  { id: 0, range: "10–300", label: "Mất gốc", goal: 300, min: 10, desc: "Xây nền: từ loại, các thì cơ bản, từ vựng văn phòng – du lịch, làm quen Part 1 và Part 2." },
  { id: 1, range: "300–450", label: "Cơ bản", goal: 450, min: 300, desc: "Mở rộng thì hoàn thành, hòa hợp chủ vị, so sánh, giới từ; bắt đầu Part 5 và nghe hội thoại ngắn." },
  { id: 2, range: "450–650", label: "Trung cấp", goal: 650, min: 450, desc: "Bị động, mệnh đề quan hệ, liên từ, V-ing/To V; luyện Part 3–4 và đọc đoạn Part 6." },
  { id: 3, range: "650–800", label: "Khá", goal: 800, min: 650, desc: "Phân từ, câu điều kiện, từ vựng hợp đồng – sản xuất; tăng tốc Part 7 và làm đề tổng hợp." },
  { id: 4, range: "800–990", label: "Nâng cao", goal: 990, min: 800, desc: "Giả định, đảo ngữ, từ học thuật; giữ phong độ bằng đề tổng hợp và shadowing đoạn dài." }
];
const bandOf = s => s < 300 ? 0 : s < 450 ? 1 : s < 650 ? 2 : s < 800 ? 3 : 4;

const ROADMAP = {
  0: [
    { w: "Tuần 1 · Làm quen", tasks: [["pl"], ["v", "t-office"], ["v", "p1"], ["g", "tu-loai"], ["t", "ht-don"], ["t", "ht-tiepdien"], ["sh", 1]] },
    { w: "Tuần 2 · Câu cơ bản", tasks: [["v", "t-travel"], ["v", "t-event"], ["g", "dai-tu"], ["g", "danh-tu"], ["t", "qk-don"], ["t", "tl-don"], ["tr", 1], ["x", "p2"]] }
  ],
  1: [
    { w: "Tuần 1 · Mở rộng ngữ pháp", tasks: [["v", "t-hr"], ["v", "p2"], ["t", "ht-hoanthanh"], ["t", "qk-tiepdien"], ["g", "hoa-hop"], ["x", "p2"], ["sh", 1]] },
    { w: "Tuần 2 · Part 5 & hội thoại", tasks: [["v", "t-tech"], ["g", "so-sanh"], ["g", "gioi-tu"], ["tr", 1], ["x", "p5"], ["x", "p3"]] }
  ],
  2: [
    { w: "Tuần 1 · Bị động & mệnh đề", tasks: [["v", "t-marketing"], ["v", "t-shopping"], ["v", "p3"], ["g", "bi-dong"], ["g", "quan-he"], ["t", "ht-htttd"], ["x", "p5"], ["sh", 2]] },
    { w: "Tuần 2 · Từ nối & đọc đoạn", tasks: [["v", "t-finance"], ["v", "p4"], ["g", "lien-tu"], ["g", "danh-dong-tu"], ["t", "qk-hoanthanh"], ["t", "tl-tiepdien"], ["tr", 2], ["x", "p4"], ["x", "p6"]] }
  ],
  3: [
    { w: "Tuần 1 · Phân từ & điều kiện", tasks: [["v", "t-factory"], ["v", "p5"], ["g", "phan-tu"], ["g", "dieu-kien"], ["t", "tl-hoanthanh"], ["x", "p7"], ["sh", 2]] },
    { w: "Tuần 2 · Tổng hợp", tasks: [["v", "t-contract"], ["v", "t-health"], ["v", "p6"], ["g", "nho-va"], ["t", "qk-httd"], ["tr", 3], ["x", "full"]] }
  ],
  4: [
    { w: "Tuần 1 · Cấu trúc nâng cao", tasks: [["v", "t-advanced"], ["v", "p7"], ["g", "gia-dinh"], ["g", "dao-ngu"], ["t", "tl-httd"], ["sh", 3], ["x", "p7"]] },
    { w: "Tuần 2 · Về đích", tasks: [["tr", 3], ["x", "full"], ["x", "p5"], ["sh", 3]] }
  ]
};

const EXAMS = {
  p2: { name: "Part 2 · Hỏi – đáp", sec: "L", n: 10, min: 8, desc: "Nghe câu hỏi và 3 lựa chọn, không in chữ." },
  p3: { name: "Part 3 · Hội thoại", sec: "L", n: 9, min: 8, desc: "3 đoạn hội thoại, mỗi đoạn 3 câu hỏi." },
  p4: { name: "Part 4 · Bài nói", sec: "L", n: 9, min: 8, desc: "Thông báo, cuộc họp, tin nhắn thoại." },
  p5: { name: "Part 5 · Hoàn thành câu", sec: "R", n: 20, min: 12, desc: "Ngữ pháp + từ vựng, ngẫu nhiên mỗi lần." },
  p6: { name: "Part 6 · Hoàn thành đoạn văn", sec: "R", n: 8, min: 8, desc: "Điền từ và chèn câu vào đoạn văn." },
  p7: { name: "Part 7 · Đọc hiểu", sec: "R", n: 9, min: 12, desc: "Quảng cáo, e-mail, bài báo." },
  full: { name: "Mini test tổng hợp", sec: "LR", n: 40, min: 35, desc: "18 câu nghe + 22 câu đọc, có ước lượng điểm." }
};

const VOCAB_BY_ID = Object.fromEntries(VOCAB.map(s => [s.id, s]));
const TOPIC_BY_ID = Object.fromEntries([...TENSES, ...GRAMMAR].map(t => [t.id, t]));
const isTense = id => TENSES.some(t => t.id === id);

const TAG_STATIC = {
  "l-p2-wh": ["Part 2 · Câu hỏi Wh-", "p2", "Nghe thật kỹ 1–2 từ đầu (Where/When/Who/Why). Loại ngay đáp án Yes/No và đáp án lặp lại từ trong câu hỏi."],
  "l-p2-request": ["Part 2 · Đề nghị, yêu cầu", "p2", "Could you / Why don't we / Would you mind → đáp án thường là đồng ý (Sure, I'd be happy to) hoặc từ chối kèm lý do."],
  "l-p2-yn": ["Part 2 · Yes/No & câu hỏi đuôi", "p2", "Đáp án đúng có thể bỏ Yes/No và trả lời thẳng thông tin mới (Actually…, I'm working on it)."],
  "l-p2-choice": ["Part 2 · Câu hỏi lựa chọn", "p2", "Câu hỏi A or B: đáp án hay là chọn 1, cả hai (Either / Both), hoặc không cái nào."],
  "l-p2-indirect": ["Part 2 · Trả lời gián tiếp", "p2", "Đáp án khó nhất thường không trả lời thẳng: “Mr. Lee just e-mailed it”, “She's in a meeting until two”."],
  "l-p3-main": ["Part 3 · Ý chính hội thoại", "p3", "Ý chính nằm ở 1–2 câu đầu. Đọc trước câu hỏi trong lúc nghe hướng dẫn."],
  "l-p3-detail": ["Part 3 · Chi tiết", "p3", "Gạch từ khóa trong câu hỏi; đáp án thường diễn đạt lại (paraphrase), không lặp nguyên văn."],
  "l-p3-next": ["Part 3 · Hành động tiếp theo", "p3", "Đáp án nằm ở cuối bài: I'll…, Let me…, Why don't I… "],
  "l-p3-intent": ["Part 3 · Hàm ý người nói", "p3", "Suy luận từ ngữ cảnh: câu nói ẩn ý điều gì, không chỉ nghĩa đen."],
  "l-p4-purpose": ["Part 4 · Mục đích / vấn đề", "p4", "Mục đích bài nói nằm ở phần mở đầu sau lời chào."],
  "l-p4-detail": ["Part 4 · Chi tiết", "p4", "Nghe theo thứ tự câu hỏi – thông tin xuất hiện lần lượt."],
  "l-p4-speaker": ["Part 4 · Người nói & địa điểm", "p4", "Dựa vào từ đặc trưng: shoppers → siêu thị, passengers → sân bay, returning your call → nhân viên công ty."],
  "l-p4-next": ["Part 4 · Hành động tiếp theo", "p4", "Đáp án thường ở câu cuối: I'll post…, Please sign up…"],
  "r-p6-sentence": ["Part 6 · Chèn câu", "p6", "Đọc câu trước và sau chỗ trống; câu đúng phải nối mạch ý và đại từ/từ nối khớp."],
  "r-p7-main": ["Part 7 · Mục đích, ý chính", "p7", "Đọc tiêu đề, dòng Subject và 2 câu đầu."],
  "r-p7-detail": ["Part 7 · Chi tiết", "p7", "Quét (scan) từ khóa, số liệu, tên riêng rồi đọc kỹ câu chứa nó."],
  "r-p7-not": ["Part 7 · Câu hỏi NOT", "p7", "Đối chiếu từng đáp án với bài; đáp án không có trong bài là đáp án đúng."],
  "r-p7-synonym": ["Part 7 · Từ đồng nghĩa", "p7", "Thay từng đáp án vào câu gốc, chọn nghĩa hợp ngữ cảnh chứ không phải nghĩa phổ biến nhất."],
  "r-p7-infer": ["Part 7 · Suy luận", "p7", "Đáp án suy ra từ thông tin trong bài, thường được paraphrase."]
};
const TAG_VOCAB = { "v-hr": "t-hr", "v-colloc": "p5", "v-shopping": "t-shopping", "v-contract": "t-contract", "v-finance": "t-finance", "v-advanced": "t-advanced", "v-event": "t-event", "v-phrasal": "p3" };
function tagInfo(tag) {
  if (TOPIC_BY_ID[tag]) { const t = TOPIC_BY_ID[tag]; return { label: (isTense(tag) ? "Thì · " : "Ngữ pháp · ") + t.name, go: ["grammar", tag], kind: "g" }; }
  if (TAG_VOCAB[tag]) { const s = VOCAB_BY_ID[TAG_VOCAB[tag]]; return { label: "Từ vựng · " + s.name, go: ["vocab", s.id], kind: "v" }; }
  if (TAG_STATIC[tag]) { const [label, ex, tip] = TAG_STATIC[tag]; return { label, go: ["exam", ex], tip, kind: "x" }; }
  return { label: tag, go: ["exam"], kind: "x" };
}

/* ===== Trạng thái & lưu trữ ===== */
let PROFILE_ID = ""; try { PROFILE_ID = localStorage.getItem("toeicpath.profile") || ""; } catch (e) { }
const KEY = "toeicpath.v1" + (PROFILE_ID ? "." + PROFILE_ID : "");
const DEFAULT = () => ({
  v: 1, updatedAt: 0,
  profile: { name: "Hiếu Nhi", current: 720, target: 850 },
  settings: { scene: "auto", weather: "petals", blur: "med", accent: "green", rate: 1, ui: "clean" },
  srs: {}, sets: {}, xp: 0,
  streak: { count: 0, best: 0, last: null, days: [] },
  grammar: {}, tests: [], tags: {}, trans: {}, transCount: {}, shadow: {}, shadowCount: {},
  daily: { date: today() }, study: {}, placement: null
});
let S = DEFAULT();
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(DEFAULT(), JSON.parse(raw)); } catch (e) { /* trình duyệt chặn lưu trữ */ }

const Store = {
  db: null, ref: null, busy: false, pending: false, timer: 0,
  save(local = false) {
    S.updatedAt = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { }
    if (local || !this.ref) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.push(), 1200);
  },
  async push() {
    if (this.busy) { this.pending = true; return; }
    this.busy = true;
    try { await this.ref.set(JSON.parse(JSON.stringify(S))); setSync("Đã đồng bộ với tài khoản của bạn"); }
    catch (e) { setSync("Chưa đồng bộ được – tiến độ vẫn lưu trên máy này"); }
    this.busy = false;
    if (this.pending) { this.pending = false; this.push(); }
  },
  async connect() {
    if (!window.claude || !window.claude.use) return;
    try {
      const [db, user] = await Promise.all([claude.use("db"), claude.use("user")]);
      if (!db || !user) return;
      const id = await user.id();
      if (!id) return;
      this.ref = db.collection("data/users/" + id).doc("state" + (PROFILE_ID ? "-" + PROFILE_ID : "")); this.regRef = db.collection("data/users/" + id).doc("profiles"); if (window.Profiles) Profiles.sync();
      const snap = await Promise.race([this.ref.get(), new Promise((_, r) => setTimeout(() => r(new Error("timeout")), 10000))]);
      const remote = snap && typeof snap.data === "function" ? snap.data() : snap;
      if (remote && remote.updatedAt && remote.updatedAt > (S.updatedAt || 0)) {
        S = Object.assign(DEFAULT(), remote);
        try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { }
        applySettings(); App.render();
      } else if (S.updatedAt) this.push();
      setSync("Đã đồng bộ với tài khoản của bạn");
    } catch (e) { setSync("Tiến độ lưu trên trình duyệt này"); }
  }
};
function setSync(t) { const el = $("#sync"); if (el) el.textContent = t; }
function save() { Store.save(); }

function daily() {
  if (!S.daily || S.daily.date !== today()) S.daily = { date: today() };
  return S.daily;
}
function bump(k, n = 1) { const d = daily(); d[k] = (d[k] || 0) + n; save(); }
function addXP(n) { S.xp = (S.xp || 0) + n; }
function tagHit(tag, ok) { if (!tag) return; const t = S.tags[tag] || (S.tags[tag] = { c: 0, n: 0 }); t.n++; if (ok) t.c++; }

/* ===== Lặp lại ngắt quãng (Leitner) ===== */
const BOX_DAYS = [0, 1, 2, 4, 7, 15, 30];
const WORDS = {};
VOCAB.forEach(s => s.words.forEach(w => { WORDS[s.id + "|" + w[0]] = { set: s, w }; }));
function learnSet(id) {
  const s = VOCAB_BY_ID[id];
  s.words.forEach(w => { const k = id + "|" + w[0]; if (!S.srs[k]) S.srs[k] = { b: 1, due: addDays(today(), 1), c: 0, w: 0 }; });
  S.sets[id] = { learned: true, at: today() };
}
function gradeWord(k, ok) {
  const s = S.srs[k]; if (!s) return;
  if (ok) { s.c++; s.b = Math.min(6, s.b + 1); } else { s.w++; s.b = 1; }
  s.due = addDays(today(), BOX_DAYS[s.b]);
  s.last = today();
}
const onTrack = k => WORDS[k] && !!WORDS[k].set.zh === !!(S.settings && S.settings.track === "hsk");
const dueKeys = () => Object.keys(S.srs).filter(k => onTrack(k) && S.srs[k].due <= today());
const learnedCount = () => Object.keys(S.srs).length;
const masteredCount = () => Object.values(S.srs).filter(x => x.b >= 4).length;

/* ===== Điểm danh ===== */
function streakNow() {
  const st = S.streak;
  if (!st.last) return 0;
  return st.last === today() || st.last === addDays(today(), -1) ? st.count : 0;
}
function checkIn() {
  const st = S.streak, t = today();
  if (st.last === t) return false;
  st.count = st.last === addDays(t, -1) ? st.count + 1 : 1;
  st.best = Math.max(st.best || 0, st.count);
  st.last = t;
  st.days = [...(st.days || []).filter(d => d !== t), t].slice(-120);
  addXP(5);
  save();
  return true;
}

/* ===== Giọng đọc ===== */
const Speech = {
  cap: null, state: "idle", webVoices: [],
  init() {
    if (window.claude && claude.use) claude.use("tts").then(t => { this.cap = t; if (t) t.onState(({ state }) => { this.state = state; }); }).catch(() => { });
    if ("speechSynthesis" in window) {
      const load = () => { this.webVoices = speechSynthesis.getVoices().filter(v => /^en(-|_)/i.test(v.lang)); };
      load(); speechSynthesis.onvoiceschanged = load;
    }
  },
  available() { return !!this.cap || "speechSynthesis" in window; },
  stop() { this.tok = (this.tok || 0) + 1; try { this.cap && this.cap.stop(); } catch (e) { } if ("speechSynthesis" in window) speechSynthesis.cancel(); },
  // đọc theo kịch bản như đề thi: các đoạn nói xen khoảng lặng { pause: ms }
  async script(steps, rate) {
    const tok = this.tok = (this.tok || 0) + 1, wait = ms => new Promise(r => setTimeout(r, ms));
    let buf = [];
    const flush = async () => { if (!buf.length) return true; const l = buf; buf = []; const ok = await this.lines(l, rate); return ok && tok === this.tok; };
    for (const st of steps) {
      if (tok !== this.tok) return false;
      if (st.pause) { if (!(await flush())) return false; await wait(st.pause); }
      else buf.push(st);
    }
    return (await flush()) && tok === this.tok;
  },
  odd: /albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|kathy|ralph|eddy|flo\b|grandma|grandpa|reed|rocko|sandy|shelley|deranged|hysterical|pipe|princess|agnes|bruce|vicki|novelty|espeak/i,
  // các giọng người học có thể chọn trong Cài đặt: "c:<giọng Claude>" hoặc "w:<tên giọng của máy>"
  choices() {
    const out = [];
    if (this.cap) [["buttery", "ấm"], ["airy", "nhẹ"], ["glassy", "trong"], ["rounded", "tròn"]].forEach(([v, l]) => out.push(["c:" + v, "Giọng Claude · " + l]));
    this.webVoices.filter(v => !this.odd.test(v.name)).sort((a, b) => (/en[-_]US/i.test(b.lang) - /en[-_]US/i.test(a.lang)) || a.name.localeCompare(b.name)).forEach(v => out.push(["w:" + v.name, "Giọng máy · " + v.name + " (" + v.lang + ")"]));
    return out;
  },
  picked() { const v = (S.settings && S.settings.voice) || ""; return v ? [v[0], v.slice(2)] : ["", ""]; },
  voiceFor(who) { const [k, n] = this.picked(); return who === "M" ? "glassy" : who === "W" ? "airy" : k === "c" ? n : "buttery"; },
  async say(text, rate) { return this.lines([{ text, who: "N" }], rate); },
  async lines(list, rate = S.settings.rate || 1) {
    this.stop();
    const gen = this.gen = (this.gen || 0) + 1;
    // Chữ Hán: nếu máy có sẵn giọng tiếng Trung thì dùng giọng máy (chắc chắn đọc đúng tiếng Trung)
    const zhText = list.some(l => /[\u3400-\u9fff]/.test(l.text));
    const zhLocal = zhText && "speechSynthesis" in window && speechSynthesis.getVoices().some(x => /^(zh|cmn)/i.test(x.lang));
    const [pk, pn] = this.picked();
    const useWeb = pk === "w" && !zhText && this.webVoices.some(v => v.name === pn);
    if (this.cap && !zhLocal && !useWeb) {
      // Giọng Claude: lần đọc mới tự thay lần đang đọc. Lần cũ bị thay sẽ báo lỗi, KHÔNG được chuyển sang giọng trình duyệt
      // (nếu không sẽ có hai giọng đọc chồng lên nhau).
      try {
        await this.cap.speak(list.map(l => ({ text: l.text, voice: this.voiceFor(l.who), language: /[\u3400-\u9fff]/.test(l.text) ? "zh" : "en", rate: clamp(rate, 0.7, 1.5) })));
        return gen === this.gen;
      } catch (e) {
        if (e && e.code === "not_granted") this.cap = null; else return false;
        if (gen !== this.gen) return false;
      }
    }
    if (!("speechSynthesis" in window)) { toast("Thiết bị này không hỗ trợ đọc âm thanh – hãy xem phần chữ."); return false; }
    // Giọng trình duyệt: bỏ các giọng "đồ chơi"/robot của máy (Albert, Bells, Zarvox, Fred, bộ Eloquence…), ưu tiên giọng tự nhiên
    const odd = /albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|kathy|ralph|eddy|flo\b|grandma|grandpa|reed|rocko|sandy|shelley|deranged|hysterical|pipe|princess|agnes|bruce|vicki|novelty|espeak/i;
    const vs = this.webVoices.filter(v => !odd.test(v.name));
    const us = vs.filter(v => /en[-_]US/i.test(v.lang));
    const pool = us.length ? us : vs.length ? vs : this.webVoices;
    const rank = (v, pref) => { const i = pref.findIndex(r => r.test(v.name)); return (i < 0 ? 50 : i) - (/premium|enhanced|natural|neural|siri/i.test(v.name) ? 100 : 0); };
    const best = pref => pool.slice().sort((x, y) => rank(x, pref) - rank(y, pref))[0];
    const female = best([/samantha/i, /ava\b/i, /allison/i, /susan/i, /zoe/i, /aria/i, /jenny/i, /google us english/i, /zira/i, /female/i]);
    const mPref = [/\balex\b/i, /aaron/i, /evan/i, /nathan/i, /\btom\b/i, /\bguy\b/i, /davis/i, /david/i, /mark/i, /\bmale/i];
    const male = pool.find(v => v !== female && mPref.some(r => r.test(v.name))) ? best(mPref) : female;
    for (const l of list) {
      if (gen !== this.gen) return false;
      await new Promise(res => {
        const u = new SpeechSynthesisUtterance(l.text);
        u.rate = clamp(rate, 0.6, 1.5); u.pitch = 1;
        if (/[\u3400-\u9fff]/.test(l.text)) {
          // tiếng Trung: dùng giọng phổ thông của máy nếu có
          u.lang = "zh-CN"; u.rate = Math.min(u.rate, 0.9);
          const zv = speechSynthesis.getVoices().filter(x => /^zh[-_](CN|Hans)/i.test(x.lang) || /^cmn/i.test(x.lang));
          const z = zv.find(x => /tingting|ting-ting|xiaoxiao|google 普通话|li-?mu|yu-?shu/i.test(x.name)) || zv[0];
          if (z) u.voice = z;
        } else {
          u.lang = "en-US";
          const mine = pk === "w" && this.webVoices.find(x => x.name === pn);
          const v = l.who === "M" ? male : l.who === "W" ? female : mine || female;
          if (v) u.voice = v;
        }
        u.onend = u.onerror = res;
        speechSynthesis.speak(u);
      });
    }
    return gen === this.gen;
  }
};

/* ===== Nhận giọng nói & AI chấm ===== */
const Caps = { dictation: null, sample: null };
function initCaps() {
  if (!window.claude || !claude.use) return;
  claude.use("dictation").then(d => { Caps.dictation = d; if (App.view === "shadowing") App.render(); }).catch(() => { });
  claude.use("sample").then(s => { Caps.sample = s; if (App.view === "translate") App.render(); }).catch(() => { });
}
async function askJSON(prompt) {
  const s = Caps.sample;
  if (!s) throw { code: "unavailable" };
  if (typeof s.json === "function") return await s.json(prompt, { modelTier: "quick" });
  const r = await s(prompt, { modelTier: "quick" });
  const m = (r.text || "").match(/\{[\s\S]*\}/);
  return JSON.parse(m ? m[0] : r.text);
}

/* ===== Giao diện chung ===== */
function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast"; el.textContent = msg; el.setAttribute("role", "status");
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}
function modal(html, onMount) {
  const layer = $("#layer");
  layer.innerHTML = `<div class="modal-bg" id="mbg"><div class="modal" role="dialog" aria-modal="true">${html}</div></div>`;
  const close = () => { layer.innerHTML = ""; };
  $("#mbg").addEventListener("click", e => { if (e.target.id === "mbg" || e.target.closest("[data-close]")) close(); });
  if (onMount) onMount($(".modal", layer), close);
  return close;
}
function bar(p, cls = "") { return `<div class="bar ${cls}"><i style="width:${clamp(p, 0, 100)}%"></i></div>`; }
function chipBand(b) { return `<span class="chip accent">Band ${b}</span>`; }
function optHTML(o, i, cls = "", extra = "") { return `<button class="opt ${cls}" data-i="${i}" ${extra}><span class="k">${LETTERS[i]}</span><span>${esc(o)}</span></button>`; }

/* Đối chiếu từ (LCS) cho dịch và shadowing */
function wordDiff(refText, gotText) {
  const a = refText.split(/\s+/).filter(Boolean), an = a.map(w => norm(w));
  const b = tokens(gotText);
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = an[i] && an[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  let i = 0, j = 0; const out = [];
  while (i < n) {
    if (!an[i]) { out.push(["hit", a[i]]); i++; continue; }
    if (j < m && an[i] === b[j]) { out.push(["hit", a[i]]); i++; j++; }
    else if (j < m && dp[i][j + 1] >= dp[i + 1][j]) j++;
    else { out.push(["miss", a[i]]); i++; }
  }
  const hits = out.filter(x => x[0] === "hit").length;
  return { html: out.map(([c, w]) => `<span class="${c}">${esc(w)}</span>`).join(" "), score: n ? hits / n : 0, extra: Math.max(0, m - dp[0][0]) };
}
