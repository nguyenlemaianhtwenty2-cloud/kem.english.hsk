/* ===== Bộ nhân vật tròn đội mũ theo dịp (tự vẽ): nét sạch, viền đậm, màu pastel ===== */
const Avatars = (() => {
  const K = "#3a3340";
  const st = (w = 3, c = K) => `stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
  const ln = (w = 3, c = K) => `fill="none" ${st(w, c)}`;
  // thân tròn: màu nền + bóng đổ phía dưới + vệt sáng
  const body = (c, d, id) => `<clipPath id="b${id}"><circle cx="50" cy="62" r="29"/></clipPath><circle cx="50" cy="62" r="29" fill="${c}"/><g clip-path="url(#b${id})"><circle cx="40" cy="50" r="33" fill="none" stroke="${d}" stroke-width="16" opacity=".55" transform="translate(16 20)"/></g><circle cx="50" cy="62" r="29" ${ln(3)}/><path d="M29 52q3-8 10-11" ${ln(3, "#fff")} opacity=".85"/>`;
  const eye = (x, y) => `<circle cx="${x}" cy="${y}" r="3.3" fill="${K}"/><circle cx="${x + 1.1}" cy="${y - 1.2}" r="1.1" fill="#fff"/>`;
  const arc = (x, y, up) => `<path d="M${x - 4} ${y}q4 ${up ? -5 : 5} 8 0" ${ln(2.6)}/>`;
  const blush = y => `<ellipse cx="33" cy="${y}" rx="4.6" ry="2.8" fill="#f79bb0" opacity=".75"/><ellipse cx="67" cy="${y}" rx="4.6" ry="2.8" fill="#f79bb0" opacity=".75"/>`;
  const mouth = (k, y) => k === "d" ? `<path d="M45 ${y - 1}q5 8 10 0z" fill="${K}" ${st(1.6)}/>` : k === "o" ? `<ellipse cx="50" cy="${y + 1}" rx="2.4" ry="3" fill="${K}"/>` : k === "w" ? `<path d="M44 ${y}q3 4 6 0q3 4 6 0" ${ln(2.4)}/>` : `<path d="M45 ${y}q5 5 10 0" ${ln(2.4)}/>`;
  // e: B hai mắt mở, W nháy mắt, J cười tít, S ngủ
  const face = (e = "B", m = "u", y = 64) => (e === "W" ? eye(40, y) + arc(60, y, 1) : e === "J" ? arc(40, y, 1) + arc(60, y, 1) : e === "S" ? arc(40, y) + arc(60, y) : eye(40, y) + eye(60, y)) + blush(y + 7) + mouth(m, y + 7);
  const star = (x, y, s = 1, c = "#f8d667") => `<path d="M${x} ${y - 6 * s}l${1.8 * s} ${4 * s} ${4.3 * s} ${.5 * s}-${3.2 * s} ${3 * s} ${.9 * s} ${4.4 * s}-${3.8 * s}-${2.2 * s}-${3.8 * s} ${2.2 * s} ${.9 * s}-${4.4 * s}-${3.2 * s}-${3 * s} ${4.3 * s}-${.5 * s}z" fill="${c}" ${st(1.6)}/>`;
  const dot = (x, y, c, r = 2.4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
  const L = {
    party: ["Sinh nhật", body("#fbcdd6", "#f3a3b5", 1)
      + `<path d="M50 6L33 38q17 8 34 0z" fill="#ffe08a" ${st(3)}/><path d="M45.500 16l12 6M40 26l22 9" ${ln(3.4, "#7fc8e8")}/><circle cx="50" cy="7" r="5" fill="#f58fa8" ${st(2.6)}/>`
      + face("J", "d") + dot(14, 30, "#7fc8e8") + dot(86, 26, "#ffd166") + dot(90, 50, "#f58fa8", 2) + dot(10, 54, "#a8dba8", 2) + `<path d="M18 16l4 5M82 10l-3 6" ${ln(2.6, "#f58fa8")}/>`],
    witch: ["Halloween", body("#fbc48c", "#f09a52", 2)
      + `<path d="M50 62V33M36 38q-10 24 0 48M64 38q10 24 0 48" ${ln(2, "#e58a45")} opacity=".7"/>`
      + `<path d="M54 4q-14 8-18 30h30q-4-16 2-22q-6 0-14-8z" fill="#8f7fd6" ${st(3)}/><path d="M20 37q30-9 60 0q-30 9-60 0z" fill="#7667c2" ${st(3)}/><path d="M36.500 31q14-4 29 0" ${ln(4, "#ffd166")}/>`
      + face("B", "w") + star(88, 20, .8) + `<path d="M8 22q5-5 9 0q4-5 9 0q-3 1-4 5q-5-4-10 0q-1-4-4-5z" fill="${K}"/>`],
    santa: ["Giáng sinh", body("#fdf8f2", "#e3dccf", 3)
      + `<path d="M28 38q4-24 26-28q16-2 26 12l-10 4q-6-8-14 12z" fill="#ee6b6e" ${st(3)}/><circle cx="81" cy="24" r="6" fill="#fff" ${st(2.6)}/><rect x="24" y="33" width="52" height="11" rx="5.500" fill="#fff" ${st(3)}/>`
      + face("W", "u", 66) + `<path d="M12 60v8M8 64h8M9 61l6 6M15 61l-6 6" ${ln(1.8, "#8ecbe6")}/><path d="M90 66v8M86 70h8" ${ln(1.8, "#8ecbe6")}/>`],
    grad: ["Tốt nghiệp", body("#bfe0f7", "#8fc3ec", 4)
      + `<path d="M34 30v10q16 7 32 0V30z" fill="#4b4660" ${st(3)}/><path d="M50 14L20 26l30 12 30-12z" fill="#5d5778" ${st(3)}/><path d="M74 28v14" ${ln(2.6, "#ffd166")}/><circle cx="74" cy="44" r="3.400" fill="#ffd166" ${st(2)}/>`
      + face("B", "d", 66) + star(12, 34, .8) + star(90, 60, .6)],
    crown: ["Vương miện", body("#dcd0f7", "#b9a6ec", 5)
      + `<path d="M30 38l-4-22 14 11 10-17 10 17 14-11-4 22z" fill="#ffd866" ${st(3)}/>${dot(50, 30, "#f58fa8", 3)}${dot(38, 32, "#7fc8e8", 2.2)}${dot(62, 32, "#7fc8e8", 2.2)}`
      + face("J", "u") + star(88, 26, .7) + star(12, 48, .6)],
    music: ["Nghe nhạc", body("#cfeccf", "#9fd3a2", 6)
      + `<path d="M21 62q-2-40 29-40t29 40" ${ln(5, "#5d5778")}/><rect x="13" y="52" width="13" height="24" rx="6.500" fill="#f58fa8" ${st(3)}/><rect x="74" y="52" width="13" height="24" rx="6.500" fill="#f58fa8" ${st(3)}/>`
      + face("S", "u") + `<path d="M84 14v14M84 14l8 3" ${ln(2.6)}/><ellipse cx="80.500" cy="29" rx="4" ry="3" fill="${K}"/>` + dot(12, 24, "#ffd166")],
    beanie: ["Mùa đông", body("#fbd9b5", "#f3b77d", 7)
      + `<path d="M26 40q0-26 24-26t24 26z" fill="#7fc8e8" ${st(3)}/><path d="M38 18l-4 20M50 14v24M62 18l4 20" ${ln(2, "#5aa9cf")}/><rect x="22" y="35" width="56" height="11" rx="5.500" fill="#fff" ${st(3)}/><circle cx="50" cy="11" r="7" fill="#fff" ${st(2.800)}/>`
      + face("B", "o", 67) + dot(10, 30, "#fff", 2.6) + dot(90, 40, "#fff", 2.2) + dot(86, 16, "#fff", 2)],
    flower: ["Mùa xuân", body("#fdeea6", "#f4d660", 8)
      + [[-20, 0], [20, 0], [-10, -9], [10, -9], [0, -13]].map(([dx, dy], i) => `<g transform="translate(${50 + dx} ${36 + dy})"><circle r="7.500" fill="${["#f9a8bd", "#f9a8bd", "#fff", "#fff", "#f9a8bd"][i]}" ${st(2.4)}/><circle r="2.600" fill="#ffd166" ${st(1.6)}/></g>`).join("")
      + `<path d="M22 40q-6-2-8-8q7 0 9 5M78 40q6-2 8-8q-7 0-9 5" fill="#a8dba8" ${st(2.2)}/>`
      + face("W", "u", 66)],
    bunny: ["Tai thỏ", body("#fde3ea", "#f6bfcd", 9)
      + `<path d="M36 38Q26 6 38 6t8 30z" fill="#fff" ${st(3)}/><path d="M38 30q-4-14 0-17q3 3 3 16z" fill="#f9a8bd"/><path d="M54 36Q58 4 68 8t-6 31z" fill="#fff" ${st(3)}/><path d="M59 31q2-14 6-16q2 4-2 17z" fill="#f9a8bd"/><path d="M26 44q24-12 48 0" ${ln(4, "#8f7fd6")}/>`
      + face("B", "w", 66) + dot(88, 30, "#ffd166") + dot(12, 36, "#7fc8e8")],
    chef: ["Đầu bếp", body("#f7dcc6", "#eab995", 10)
      + `<path d="M32 36q-14-2-10-14q4-9 14-5q4-11 14-11t14 11q10-4 14 5q4 12-10 14z" fill="#fff" ${st(3)}/><rect x="31" y="33" width="38" height="10" rx="3" fill="#fff" ${st(3)}/><path d="M42 24v8M50 20v12M58 24v8" ${ln(1.8, "#d9d2c6")}/>`
      + face("J", "d", 66) + `<path d="M88 50q-4-4 0-8M93 52q-4-5 0-10" ${ln(1.8, "#c9c2b6")}/>`],
    cap: ["Mũ lưỡi trai", body("#c9f0e6", "#96d9c6", 11)
      + `<path d="M24 42q0-26 26-26t26 26z" fill="#f58fa8" ${st(3)}/><path d="M50 16v26" ${ln(2, "#e06f8c")}/><path d="M58 40q24-6 34 4q-18 6-34 2z" fill="#e06f8c" ${st(3)}/><circle cx="50" cy="15" r="3" fill="#fff" ${st(2)}/>`
      + face("W", "d", 66) + star(12, 30, .8)],
    sleepy: ["Buồn ngủ", body("#e3dafa", "#c3b3ef", 12)
      + `<path d="M26 40q4-22 26-22q14 0 22 8q10 2 12 14l-8 2q-2-8-10-6l4 4z" fill="#8ecbe6" ${st(3)}/><path d="M40 21l-6 17M54 18l-2 20" ${ln(2, "#fff")}/><circle cx="86" cy="46" r="5.500" fill="#ffd866" ${st(2.6)}/>`
      + face("S", "o", 66) + `<path d="M8 14h9l-9 10h9" ${ln(2.4)}/><path d="M20 30h6l-6 7h6" ${ln(2)}/>`]
  };
  const D = "party";
  const svg = (k, size = 44) => `<svg class="avt" viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true">${(L[k] || L[D])[1]}</svg>`.replace(/(\d)\.(\d)00\b/g, "$1.$2");
  return { keys: Object.keys(L), name: k => (L[k] || L[D])[0], svg, has: k => !!L[k] };
})();
