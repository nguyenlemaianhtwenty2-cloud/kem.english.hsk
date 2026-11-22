/* ===== Hồ sơ học viên: tên + mật khẩu, mỗi hồ sơ một tiến độ riêng ===== */
const Profiles = (() => {
  const RK = "toeicpath.profiles";
  const list = () => { try { return JSON.parse(localStorage.getItem(RK) || "[]"); } catch (e) { return []; } };
  const keep = l => { try { localStorage.setItem(RK, JSON.stringify(l)); } catch (e) { } if (Store.regRef) Store.regRef.set({ list: l, t: Date.now() }).catch(() => { }); };
  const hash = async (salt, pw) => { const txt = salt + "|" + pw; try { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(txt)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join(""); } catch (e) { let h = 5381; for (const c of txt) h = (h * 33 ^ c.charCodeAt(0)) >>> 0; return "x" + h.toString(16); } };
  const cur = () => PROFILE_ID ? list().find(p => p.id === PROFILE_ID) || { id: PROFILE_ID, name: "Hồ sơ" } : { id: "", name: (S.profile.name || "").trim() || "Hồ sơ chính", main: true, ...(list().find(p => p.id === "") || {}) };
  const go = id => { try { if (id) localStorage.setItem("toeicpath.profile", id); else localStorage.removeItem("toeicpath.profile"); } catch (e) { } location.hash = "home"; location.reload(); };
  return {
    list, cur, hash,
    async sync() { try { const snap = await Store.regRef.get(), r = snap && typeof snap.data === "function" ? snap.data() : snap, mine = list(); if (r && Array.isArray(r.list)) { const m = new Map(r.list.map(p => [p.id, p])); mine.forEach(p => m.set(p.id, p)); const all = [...m.values()]; try { localStorage.setItem(RK, JSON.stringify(all)); } catch (e) { } if (all.length !== r.list.length) keep(all); } else if (mine.length) keep(mine); } catch (e) { } },
    async create(name, pw) { const id = "p" + Date.now().toString(36), salt = Math.random().toString(36).slice(2), l = list(); l.push({ id, name, salt, hash: pw ? await hash(salt, pw) : "" }); keep(l); try { localStorage.setItem("toeicpath.v1." + id, JSON.stringify({ ...DEFAULT(), profile: { ...DEFAULT().profile, name } })); localStorage.setItem("toeicpath.auth", id); } catch (e) { } go(id); },
    async check(p, pw) { return !p.hash || p.hash === await hash(p.salt, pw); },
    async setPw(id, pw) { const l = list(); let p = l.find(x => x.id === id); if (!p) { p = { id, name: cur().name }; l.push(p); } p.salt = Math.random().toString(36).slice(2); p.hash = pw ? await hash(p.salt, pw) : ""; keep(l); },
    remove(id) { keep(list().filter(p => p.id !== id)); try { localStorage.removeItem("toeicpath.v1." + id); } catch (e) { } },
    go
  };
})();
window.Profiles = Profiles;
/* ===== Màn hình đăng nhập khi vào trang ===== */
const Auth = {
  K: "toeicpath.auth",
  get() { try { return localStorage.getItem(this.K); } catch (e) { return null; } },
  set(id) { try { localStorage.setItem(this.K, id || "main"); } catch (e) { } },
  out() { try { localStorage.removeItem(this.K); } catch (e) { } location.hash = "home"; location.reload(); },
  ok() { return this.get() === (PROFILE_ID || "main"); },
  accounts() { const main = { id: "", name: (Profiles.list().find(p => p.id === "") || {}).name || "", ...(Profiles.list().find(p => p.id === "") || {}) }; return [main, ...Profiles.list().filter(p => p.id)]; },
  enter(id) { this.set(id); if ((id || "") === PROFILE_ID) { const g = document.getElementById("gate"); if (g) g.remove(); document.body.classList.remove("gated"); App.render(); } else Profiles.go(id); },
  gate() {
    if (document.getElementById("gate")) return;
    document.body.classList.add("gated");
    const g = document.createElement("div"); g.id = "gate"; let mode = "in";
    const mainName = () => { let n = ""; try { n = (JSON.parse(localStorage.getItem("toeicpath.v1") || "{}").profile || {}).name || ""; } catch (e) { } return n.trim(); };
    const draw = () => {
      g.innerHTML = `<form class="gate-card" autocomplete="on"><div class="gate-brand"><i>TP</i><b>TOEIC Path</b></div>
        <div class="tabs"><button type="button" class="${mode === "in" ? "on" : ""}" data-m="in">Đăng nhập</button><button type="button" class="${mode === "up" ? "on" : ""}" data-m="up">Đăng ký</button></div>
        <label class="field">Tên đăng nhập<input class="input" id="ga-name" maxlength="30" autocomplete="username" required></label>
        <label class="field">Mật khẩu<input class="input" id="ga-pw" type="password" autocomplete="${mode === "in" ? "current-password" : "new-password"}" required></label>
        ${mode === "up" ? `<label class="field">Nhập lại mật khẩu<input class="input" id="ga-pw2" type="password" autocomplete="new-password" required></label>` : ""}
        <button class="btn primary" type="submit">${mode === "in" ? "Đăng nhập" : "Tạo tài khoản và vào học"}</button>
        <div class="gate-msg" id="ga-msg">${mode === "in" ? "Chưa có tài khoản? Chọn “Đăng ký”." : "Mỗi tài khoản có lộ trình và tiến độ riêng."}</div></form>`;
      $$("[data-m]", g).forEach(b => b.onclick = () => { mode = b.dataset.m; draw(); });
      const msg = t => { $("#ga-msg", g).innerHTML = `<span class="bad">${t}</span>`; };
      $("form", g).onsubmit = async e => {
        e.preventDefault(); const name = $("#ga-name", g).value.trim(), pw = $("#ga-pw", g).value, low = name.toLowerCase();
        if (!name || !pw) return msg("Hãy nhập đủ tên và mật khẩu.");
        const accs = Profiles.list(), mainReg = accs.find(p => p.id === ""), mName = (mainReg && mainReg.name) || mainName();
        const hit = accs.find(p => p.id && p.name.toLowerCase() === low), isMain = mName && mName.toLowerCase() === low;
        if (mode === "in") {
          if (hit) { if (await Profiles.check(hit, pw)) return Auth.enter(hit.id); return msg("Sai mật khẩu."); }
          if (isMain) { if (mainReg && mainReg.hash) { if (await Profiles.check(mainReg, pw)) return Auth.enter(""); return msg("Sai mật khẩu."); }
            await Profiles.setPw("", pw); const l = Profiles.list(); (l.find(p => p.id === "") || {}).name = mName; try { localStorage.setItem("toeicpath.profiles", JSON.stringify(l)); } catch (e2) { } return Auth.enter(""); }
          return msg("Chưa có tài khoản tên này trên máy. Hãy chọn “Đăng ký”.");
        }
        if (pw !== $("#ga-pw2", g).value) return msg("Hai lần nhập mật khẩu chưa khớp.");
        if (hit || isMain) return msg("Tên này đã có. Hãy chọn “Đăng nhập”.");
        if (!mName && !mainReg) { // tài khoản đầu tiên dùng luôn hồ sơ gốc
          await Profiles.setPw("", pw); const l = Profiles.list(); l.find(p => p.id === "").name = name; try { localStorage.setItem("toeicpath.profiles", JSON.stringify(l)); } catch (e2) { }
          if (!PROFILE_ID) { S.profile.name = name; save(); } return Auth.enter(""); }
        Auth.set("pending"); const id = "p" + Date.now().toString(36), salt = Math.random().toString(36).slice(2), l = Profiles.list(); l.push({ id, name, salt, hash: await Profiles.hash(salt, pw) });
        try { localStorage.setItem("toeicpath.profiles", JSON.stringify(l)); localStorage.setItem("toeicpath.v1." + id, JSON.stringify({ ...DEFAULT(), profile: { ...DEFAULT().profile, name } })); } catch (e2) { }
        if (Store.regRef) Store.regRef.set({ list: l, t: Date.now() }).catch(() => { });
        Auth.enter(id);
      };
    };
    draw(); document.body.appendChild(g); const n = mainName(); if (n && !Profiles.list().some(p => p.id)) { $("#ga-name", g).value = n; $("#ga-msg", g).textContent = "Lần đầu: mật khẩu bạn nhập bây giờ sẽ là mật khẩu của tài khoản này, tiến độ hiện có được giữ nguyên."; }
  }
};
if (PROFILE_ID) { const me = Profiles.list().find(p => p.id === PROFILE_ID); if (me && S.profile.name !== me.name) { S.profile.name = me.name; try { Store.save(true); } catch (e) { } } }
if (!Auth.ok()) Auth.gate();

function openProfiles() {
  const draw = (m, close) => {
    const c = Profiles.cur(), others = [{ id: "", name: "Hồ sơ chính", ...(Profiles.list().find(p => p.id === "") || {}) }, ...Profiles.list().filter(p => p.id)].filter(p => p.id !== c.id);
    $(".pf", m).innerHTML = `
      <div class="pf-cur"><span class="pf-avbig">${Avatars.svg(S.profile.avatar || "basket", 56)}</span><div style="flex:1"><b>${esc(c.name)}</b><div class="muted tiny">Đang học bằng hồ sơ này${c.hash ? " · có mật khẩu" : " · chưa đặt mật khẩu"}</div></div></div>
      <div class="field">Chọn hình đại diện<div class="av-grid">${Avatars.keys.map(k => `<button type="button" class="${(S.profile.avatar || "basket") === k ? "on" : ""}" data-av="${k}" title="${Avatars.name(k)}" aria-label="${Avatars.name(k)}">${Avatars.svg(k, 52)}</button>`).join("")}</div></div>
      <div class="field">Đặt hoặc đổi mật khẩu cho hồ sơ này<div class="row"><input class="input" id="pf-np" type="password" placeholder="Mật khẩu mới (để trống = bỏ mật khẩu)" autocomplete="new-password" style="flex:1"><button class="btn" id="pf-sp">Lưu</button></div></div>
      ${others.length ? `<div class="field">Đổi sang hồ sơ khác<div class="pf-list">${others.map(p => `<div class="pf-row" data-id="${p.id}"><span class="pf-av sm">${esc(p.name.trim().slice(0, 1).toUpperCase())}</span><b style="flex:1">${esc(p.name)}</b>${p.hash ? `<input class="input" type="password" placeholder="Mật khẩu" autocomplete="current-password" style="width:120px">` : ""}<button class="btn primary sm" data-in>Vào</button>${p.id ? `<button class="btn sm" data-rm title="Xoá hồ sơ">Xoá</button>` : ""}</div>`).join("")}</div></div>` : ""}
      <div class="field">Tạo hồ sơ mới (tiến độ bắt đầu từ đầu)<input class="input" id="pf-name" placeholder="Tên" maxlength="30" autocomplete="off"><input class="input" id="pf-pw" type="password" placeholder="Mật khẩu (có thể để trống)" autocomplete="new-password" style="margin-top:6px"><button class="btn primary" id="pf-new" style="margin-top:8px">Tạo và vào học</button></div>
      <button class="btn" id="pf-out">Đăng xuất</button>
      <div class="muted tiny" id="pf-msg">Mật khẩu ở đây chỉ để mọi người không vào nhầm hồ sơ của nhau, không phải lớp bảo mật mạnh: đừng dùng lại mật khẩu quan trọng. Quên mật khẩu thì không lấy lại được.</div>`;
    const msg = t => { $("#pf-msg", m).innerHTML = `<span style="color:var(--bad)">${t}</span>`; };
    $("#pf-out", m).onclick = () => Auth.out();
    $$("[data-av]", m).forEach(b => b.onclick = () => { S.profile.avatar = b.dataset.av; save(); App.render(); draw(m, close); });
    $("#pf-sp", m).onclick = async () => { await Profiles.setPw(c.id, $("#pf-np", m).value); draw(m, close); $("#pf-msg", m).textContent = "Đã lưu mật khẩu cho hồ sơ này."; };
    $("#pf-new", m).onclick = async () => { const n = $("#pf-name", m).value.trim(); if (!n) return msg("Hãy nhập tên."); if ([...Profiles.list(), c].some(p => p.name.toLowerCase() === n.toLowerCase())) return msg("Tên này đã có."); await Profiles.create(n, $("#pf-pw", m).value); };
    $$(".pf-row", m).forEach(row => { const p = others.find(x => x.id === row.dataset.id);
      $("[data-in]", row).onclick = async () => { const i = $("input", row); if (await Profiles.check(p, i ? i.value : "")) { Auth.set(p.id); Profiles.go(p.id); } else msg("Sai mật khẩu."); };
      const rm = $("[data-rm]", row); if (rm) rm.onclick = async () => { const i = $("input", row); if (!(await Profiles.check(p, i ? i.value : ""))) return msg("Nhập đúng mật khẩu của hồ sơ này rồi mới xoá được."); if (!rm.dataset.armed) { rm.dataset.armed = 1; rm.textContent = "Bấm lần nữa"; return; } Profiles.remove(p.id); draw(m, close); }; });
  };
  modal(`<div class="row"><h2 style="flex:1">Tài khoản</h2><button class="btn sm ghost icon-btn" data-close aria-label="Đóng">${icon("x")}</button></div><div class="pf stack" style="margin-top:10px"></div>`, draw);
}
