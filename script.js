// ════════════════════════════════════════════════════
//  DATABASE
// ════════════════════════════════════════════════════
const PETS = [
  // ── Exclusive ────────────────────────────────────────────────────────────
  {
    name: "Rocky", price: 0, bg: "000000", fg: "ff1000", img: null,
    exclusive: true, category: "Exclusive"
  },
  // ── Standard ─────────────────────────────────────────────────────────────
  { name: "Blackhole Goat", price: 125000, bg: "09001c", fg: "9333ea", img: "images/Blackhole_Goat.png" },
  { name: "Cappuccino Clownino", price: 135000, bg: "3d1900", fg: "d4893a", img: "images/Cappuccino_Clownino.png" },
  { name: "Compactoroni Diskaloni", price: 135000, bg: "001930", fg: "38bdf8", img: "images/Compactoroni_Diskaloni.png" },
  { name: "Nuclearo Dinossauro", price: 190000, bg: "001a0c", fg: "22c55e", img: "images/Nuclearo_Dinossauro.png" },
  { name: "Silueta", price: 200000, bg: "14102c", fg: "a78bfa", img: "images/Silueta.png" },
  { name: "Chillin Chilli", price: 220000, bg: "2e0000", fg: "f87171", img: "images/Chillin_Chilli.png" },
  { name: "Corn Sahur", price: 225000, bg: "2b1900", fg: "fbbf24", img: "images/Corn_Sahur.png" },
  { name: "Crazylone Pizaione", price: 225000, bg: "1a0028", fg: "e879f9", img: "images/Crazylone_Pizaione.png" },
  { name: "Meowl", price: 275000, bg: "001728", fg: "67e8f9", img: "images/Meowl.png" },
  { name: "Strawberry Elephant", price: 420000, bg: "2e000e", fg: "fb7185", img: "images/Strawberry_Elephant.png" },
  { name: "Dragonfrutina Dolphinita", price: 475000, bg: "001a13", fg: "34d399", img: "images/Dragonfrutina_Dolphinita.png" },
  { name: "Guerriro Digitale", price: 490000, bg: "001428", fg: "00d4ff", img: "images/Guerriro_Digitale.png" },
  { name: "Chicleteira Bicicleteira", price: 500000, bg: "0f2200", fg: "86efac", img: null },
  { name: "Pot Hotspot", price: 525000, bg: "2a0018", fg: "f0abfc", img: null },
];

// Rainbow gradient stops shared by the Exclusive category
const EXCL_GRAD = ["#ff1000", "#fea100", "#54ff4b", "#00efba", "#2753ff", "#bc08ff"];

const MUTS = [
  { name: "Normal", mult: 1, grad: ["#d0d0d0", "#9a9a9a"], gl: "" },
  { name: "Gold", mult: 1.5, grad: ["#ffe414", "#fe9210"], gl: "gl-gold" },
  { name: "Diamond", mult: 2, grad: ["#00e9ff", "#34c2ff"], gl: "gl-diamond" },
  { name: "Plasma", mult: 4, grad: ["#fe00b7", "#ad00c7"], gl: "gl-plasma" },
  { name: "Molten", mult: 6, grad: ["#ff9e37", "#ff3737"], gl: "gl-molten" },
  { name: "Radioactive", mult: 8, grad: ["#e6ff84", "#87ff1b"], gl: "gl-radioactive" },
  { name: "Shadow", mult: 12, grad: ["#262626", "#474747"], gl: "gl-shadow" },
  { name: "Electrified", mult: 16, grad: ["#474747", "#55eeff"], gl: "gl-electrified" },
  { name: "Rainbow", mult: 30, grad: ["#ff1000", "#fea100", "#54ff4b", "#00efba", "#2753ff", "#bc08ff"], gl: "gl-rainbow" },
  { name: "Astral", mult: 35, grad: ["#bf73ff", "#bf73ff"], gl: "gl-astral" },
  { name: "Wet", mult: 8, grad: ["#4876fd", "#0c23b5"], gl: "gl-wet" },
  { name: "Alien", mult: 16, grad: ["#fe00b7", "#ad00c7"], gl: "gl-alien" },
  { name: "Bacon", mult: 20, grad: ["#ff9e37", "#ff3737"], gl: "gl-bacon" },
  { name: "Virus", mult: 14, grad: ["#32f90f", "#061b03"], gl: "gl-virus" },
  { name: "Void", mult: 12, grad: ["#7d0e8e", "#361a47"], gl: "gl-void" },
  { name: "Enchanted", mult: 12, grad: ["#eac6ff", "#d466ff"], gl: "gl-enchanted" },
  { name: "Phantom", mult: 25, grad: ["#d1ffd0", "#93ff8b"], gl: "gl-phantom" },
  { name: "Volcanic", mult: 22.5, grad: ["#fc0000", "#433515"], gl: "gl-volcanic" },
];

// ════════════════════════════════════════════════════
//  STATE & STORAGE
// ════════════════════════════════════════════════════
const STORAGE_KEY = "ppt_save_v1";
const TOTAL = 30;

let S = Array.from({ length: TOTAL }, () => ({ pet: "", mut: "Normal", lvl: 1 }));

// Track which pet name is being dragged
let draggedPetName = null;

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(S)); } catch (e) { }
}

function load() {
  try {
    const d = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(d) && d.length === TOTAL) {
      S = d.map(sl => ({
        pet: (typeof sl.pet === "string" && PETS.some(p => p.name === sl.pet)) ? sl.pet : "",
        mut: (typeof sl.mut === "string" && MUTS.some(m => m.name === sl.mut)) ? sl.mut : "Normal",
        lvl: (typeof sl.lvl === "number" && sl.lvl >= 1 && sl.lvl <= 75) ? sl.lvl : 1,
      }));
    }
  } catch (e) { }
}

// ════════════════════════════════════════════════════
//  UTILS
// ════════════════════════════════════════════════════
function fmt(n) {
  if (n === 0) return "$0";
  const r = Math.round(n);
  if (r >= 1_000_000_000_000) {
    const t = r / 1_000_000_000_000;
    return "$" + (Number.isInteger(t) ? t.toLocaleString("en-US") : t.toFixed(2)) + "T";
  }
  if (r >= 1_000_000_000) {
    const b = r / 1_000_000_000;
    return "$" + (Number.isInteger(b) ? b.toLocaleString("en-US") : b.toFixed(2)) + "B";
  }
  if (r >= 1_000_000) {
    const m = r / 1_000_000;
    return "$" + (Number.isInteger(m) ? m.toLocaleString("en-US") : m.toFixed(2)) + "M";
  }
  if (r >= 1_000) {
    const k = r / 1_000;
    return "$" + (Number.isInteger(k) ? k.toLocaleString("en-US") : k.toFixed(2)) + "K";
  }
  return "$" + r.toLocaleString("en-US");
}

function abbr(name) {
  return name.split(" ").map(w => w[0].toUpperCase()).join("").slice(0, 3);
}

function imgUrl(pet, sz = 36) {
  if (pet.img) return pet.img;
  return `https://placehold.co/${sz}x${sz}/${pet.bg}/${pet.fg}?text=${encodeURIComponent(abbr(pet.name))}`;
}

function getPet(n) { return PETS.find(p => p.name === n) || null; }
function getMut(n) { return MUTS.find(m => m.name === n) || MUTS[0]; }

/** Base generation for a standard (non-exclusive) pet+mutation pair. */
function calcGenBase(pn, mn) {
  const p = getPet(pn);
  if (!p || p.exclusive) return 0;
  return p.price * getMut(mn).mult;
}

/** Best generation value among all non-Rocky slots (used by Rocky). */
function bestNonRockyGen() {
  let best = 0;
  for (let i = 0; i < TOTAL; i++) {
    if (S[i].pet && S[i].pet !== "Rocky") {
      const lvl = S[i].lvl || 1;
      const g = calcGenBase(S[i].pet, S[i].mut) * Math.pow(1.25, lvl - 1);
      if (g > best) best = g;
    }
  }
  return best;
}

/** Returns the index of the slot that currently holds Rocky, or -1. */
function findRockySlot() {
  return S.findIndex(sl => sl.pet === "Rocky");
}

/**
 * Removes an exclusive pet from every slot except newIdx.
 * Returns an array of floor indices (1-based) that were affected.
 */
function enforceExclusive(petName, newIdx) {
  const affected = new Set();
  S.forEach((sl, idx) => {
    if (idx !== newIdx && sl.pet === petName) {
      S[idx] = { pet: "", mut: "Normal", lvl: 1 };
      renderSlot(idx);
      affected.add(Math.floor(idx / 10) + 1);
    }
  });
  return affected;
}

function calcGen(pn, mn, lvl = 1) {
  if (pn === "Rocky") return bestNonRockyGen() * 1.75 * Math.pow(1.25, lvl - 1);
  return calcGenBase(pn, mn) * Math.pow(1.25, lvl - 1);
}

// ════════════════════════════════════════════════════
//  GRADIENT HELPERS
// ════════════════════════════════════════════════════
function gradStr(grad, deg = 135) {
  return `linear-gradient(${deg}deg, ${grad.join(', ')})`;
}

/**
 * Renders the mutation badge with:
 *   - gradient border  (padding-box / border-box trick)
 *   - gradient text    (background-clip: text)
 * Shadow is a special case — both stops are near-black so we
 * use a lighter gray for the text to keep it readable.
 */
function mutBadgeHTML(mut) {
  const gs = gradStr(mut.grad);
  const isDarkMut = mut.name === 'Shadow';
  const textStyle = isDarkMut
    ? `color:#888;`
    : `background:${gs};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;`;

  const borderStyle =
    `background:linear-gradient(#0d0d0d,#0d0d0d) padding-box,${gs} border-box;` +
    `border:1px solid transparent;`;

  return `<span class="mbadge" style="${borderStyle}">` +
    `<span style="${textStyle}">${mut.name}</span>` +
    `</span>`;
}

// ════════════════════════════════════════════════════
//  BUILD DICTIONARY (with drag support)
// ════════════════════════════════════════════════════
function buildDict() {
  const el = document.getElementById("dict");

  PETS.forEach(p => {
    const d = document.createElement("div");
    d.className = "dcard";
    d.draggable = true;
    d.dataset.petName = p.name;

    if (p.exclusive) {
      // ── Exclusive card: standard layout with exclusive tags ──
      d.classList.add("dcard-exclusive");
      d.title = `${p.name} — EXCLUSIVE · Solo 1 slot · 175% del mejor pet · Arrastra a un slot`;
      d.innerHTML = `
        <img src="${imgUrl(p, 33)}" alt="${p.name}" loading="lazy">
        <div class="dc-excl-info">
          <span class="dc-name" style="font-weight:900;">${p.name}</span>
          <span class="dc-excl-tag" style="color:var(--gold);">✦ EXCLUSIVE</span>
        </div>
        <div class="dc-price"><span>💵</span> <span class="slot-gv-val">175%</span></div>`;
    } else {
      d.title = `${p.name} — Base: ${fmt(p.price)} · Arrastra a un slot`;
      d.innerHTML = `
        <img src="${imgUrl(p, 33)}" alt="${p.name}" loading="lazy">
        <span class="dc-name">${p.name}</span>
        <div class="dc-price"><span>💵</span> <span class="slot-gv-val">${fmt(p.price)}/s</span></div>`;
    }

    // Drag events
    d.addEventListener("dragstart", e => {
      draggedPetName = p.name;
      d.classList.add("dragging");
      e.dataTransfer.effectAllowed = "copy";
      e.dataTransfer.setData("text/plain", p.name);
    });
    d.addEventListener("dragend", () => {
      d.classList.remove("dragging");
    });

    el.appendChild(d);
  });
}

// ════════════════════════════════════════════════════
//  OPTION BUILDERS
// ════════════════════════════════════════════════════
function petOpts(sel) {
  return `<option value="">— Sin pet —</option>` +
    PETS.map(p => `<option value="${p.name}"${p.name === sel ? " selected" : ""}>${p.exclusive ? "✦ " : ""}${p.name}</option>`).join("");
}

function mutOpts(sel) {
  let reg = "";
  let evt = "";

  const icons = {
    Normal: "⬜", Gold: "🟨", Diamond: "🟦", Plasma: "🟪", Molten: "🟧",
    Radioactive: "🟩", Shadow: "⬛", Electrified: "🟦", Rainbow: "🌈", Astral: "🟪",
    Wet: "🟦", Alien: "🟪", Bacon: "🟫", Virus: "🟩", Void: "⬛",
    Enchanted: "🟪", Phantom: "🟩", Volcanic: "🟥"
  };

  MUTS.forEach((m, i) => {
    const isEvent = i >= 10;
    const color = m.grad[0];
    const icon = icons[m.name] || "▪️";
    const opt = `<option value="${m.name}" style="color: ${color}; font-weight: bold;"${m.name === sel ? " selected" : ""}>${icon} ${m.name} ×${m.mult}</option>`;
    if (isEvent) evt += opt;
    else reg += opt;
  });
  return `<optgroup label="Regular">${reg}</optgroup><optgroup label="Event">${evt}</optgroup>`;
}

// ════════════════════════════════════════════════════
//  SLOT RENDER
// ════════════════════════════════════════════════════
function renderSlot(i) {
  const el = document.getElementById(`sl-${i}`);
  if (!el) return;

  const { pet: pn, mut: mn, lvl = 1 } = S[i];
  const pet = getPet(pn);
  const mut = getMut(mn);

  // Reset classes (preserve drag-over if present)
  const hasDragOver = el.classList.contains("drag-over");
  el.className = "slot";
  if (hasDragOver) el.classList.add("drag-over");
  el.removeAttribute("data-prev-pet");

  const isMax = lvl === 75;
  const lvlStr = isMax ? "Lvl 75 MAX" : `Lvl ${lvl}`;
  const lvlCls = isMax ? "lvl-text max" : "lvl-text";

  if (pet && pet.exclusive) {
    // ── ROCKY / EXCLUSIVE slot ──────────────────────────────────────
    el.classList.add("has-pet", "gl-rainbow", "slot-exclusive");
    const baseGen = bestNonRockyGen() * 1.75;
    const totalGen = baseGen * Math.pow(1.25, lvl - 1);
    const gs = gradStr(EXCL_GRAD);
    const textSt = `background:${gs};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;`;
    const brdSt = `background:linear-gradient(#0d0d0d,#0d0d0d) padding-box,${gs} border-box;border:1px solid transparent;`;

    el.innerHTML = `
      <button class="s-clr" data-i="${i}" title="Limpiar slot">✕</button>
      <div class="slot-fil">
        <div class="slot-r1">
          <img class="slot-img" src="${imgUrl(pet, 36)}" alt="${pet.name}" loading="lazy">
          <div class="slot-meta">
            <span class="mbadge" style="${brdSt}">
              <span style="${textSt}">✦ EXCLUSIVE</span>
            </span>
            <div class="slot-nm" style="font-weight:900;" title="${pet.name}">${pet.name}</div>
            <div class="slot-gv"><span>💵</span> <span class="slot-gv-val">${fmt(baseGen)}/s</span></div>
          </div>
          <div class="slot-lvl">
            <div class="${lvlCls}">${lvlStr}</div>
            <div class="lvl-gen">${fmt(totalGen)}/s</div>
            <div class="lvl-controls">
              <button class="btn-lvl" data-dir="-1" data-i="${i}">-</button>
              <button class="btn-lvl" data-dir="1" data-i="${i}">+</button>
            </div>
          </div>
        </div>
        <div class="slot-r2">
          <select class="ps" data-i="${i}">${petOpts(pn)}</select>
          <span class="excl-note">Mutación no aplica</span>
        </div>
      </div>`;

  } else if (pet) {
    // ── Standard slot ───────────────────────────────────────────────
    el.classList.add("has-pet");
    if (mut.gl) el.classList.add(mut.gl);

    const baseGen = calcGenBase(pn, mn);
    const totalGen = baseGen * Math.pow(1.25, lvl - 1);
    el.innerHTML = `
      <button class="s-clr" data-i="${i}" title="Limpiar slot">✕</button>
      <div class="slot-fil">
        <div class="slot-r1">
          <img class="slot-img" src="${imgUrl(pet, 36)}" alt="${pet.name}" loading="lazy">
          <div class="slot-meta">
            ${mutBadgeHTML(mut)}
            <div class="slot-nm" title="${pet.name}">${pet.name}</div>
            <div class="slot-gv"><span>💵</span> <span class="slot-gv-val">${fmt(baseGen)}/s</span></div>
          </div>
          <div class="slot-lvl">
            <div class="${lvlCls}">${lvlStr}</div>
            <div class="lvl-gen">${fmt(totalGen)}/s</div>
            <div class="lvl-controls">
              <button class="btn-lvl" data-dir="-1" data-i="${i}">-</button>
              <button class="btn-lvl" data-dir="1" data-i="${i}">+</button>
            </div>
          </div>
        </div>
        <div class="slot-r2">
          <select class="ps" data-i="${i}">${petOpts(pn)}</select>
          <select class="ms" data-i="${i}">${mutOpts(mn)}</select>
        </div>
      </div>`;

  } else {
    // ── Empty slot ──────────────────────────────────────────────────
    el.innerHTML = `
      <div class="slot-emp">
        <div class="drag-hint">↓ Arrastra aquí</div>
        <select class="ps" data-i="${i}">${petOpts("")}</select>
        <select class="ms" data-i="${i}">${mutOpts(mn)}</select>
      </div>`;
  }

  attachSlotDropEvents(el, i);
}

// ════════════════════════════════════════════════════
//  DRAG & DROP — SLOT DROP TARGETS
// ════════════════════════════════════════════════════
function attachSlotDropEvents(el, i) {
  el.addEventListener("dragover", e => {
    if (!draggedPetName) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    el.classList.add("drag-over");
  });

  el.addEventListener("dragleave", e => {
    // Only remove if leaving the slot entirely (not entering a child)
    if (!el.contains(e.relatedTarget)) {
      el.classList.remove("drag-over");
    }
  });

  el.addEventListener("drop", e => {
    e.preventDefault();
    el.classList.remove("drag-over");
    const name = e.dataTransfer.getData("text/plain") || draggedPetName;
    if (!name || !PETS.some(p => p.name === name)) return;

    // Enforce exclusive: remove Rocky from any other slot first
    const droppedPet = getPet(name);
    if (droppedPet && droppedPet.exclusive) {
      const affectedFloors = enforceExclusive(name, i);
      affectedFloors.forEach(f => updateFloor(f));
    }

    S[i].pet = name;
    save();
    renderSlot(i);
    updateFloor(Math.floor(i / 10) + 1);
    updateGlobal();
  });
}

// ════════════════════════════════════════════════════
//  BUILD FLOORS
// ════════════════════════════════════════════════════
function buildFloors() {
  const cont = document.getElementById("floors");

  for (let f = 0; f < 3; f++) {
    const div = document.createElement("div");
    div.className = "floor";
    div.innerHTML = `
      <div class="floor-hd">
        <div class="floor-lbl">
          <span class="fbadge">${f + 1}</span>
          Planta ${f + 1}
        </div>
        <div class="floor-hd-r">
          <span class="floor-gen" id="fg-${f + 1}">Gen: $0/s</span>
          <button class="btn-fr" data-floor="${f + 1}">↺ Limpiar</button>
        </div>
      </div>
      <div class="floor-body">
        <div class="floor-side" id="fs-${f + 1}-l">
          <div class="side-hdr">◀ Izquierda</div>
        </div>
        <div class="floor-sep"></div>
        <div class="floor-side" id="fs-${f + 1}-r">
          <div class="side-hdr">Derecha ▶</div>
        </div>
      </div>`;
    cont.appendChild(div);

    // Floor f → slots f*10 … f*10+9
    // Left  : f*10 + 0…4
    // Right : f*10 + 5…9
    for (let side = 0; side < 2; side++) {
      const sideEl = document.getElementById(`fs-${f + 1}-${side === 0 ? "l" : "r"}`);
      for (let s = 0; s < 5; s++) {
        const idx = f * 10 + side * 5 + s;
        const slotEl = document.createElement("div");
        slotEl.id = `sl-${idx}`;
        sideEl.appendChild(slotEl);
        renderSlot(idx);
      }
    }
  }
}

// ════════════════════════════════════════════════════
//  STATS
// ════════════════════════════════════════════════════
function updateFloor(f) {           // f = 1-indexed
  const start = (f - 1) * 10;
  let t = 0;
  for (let i = start; i < start + 10; i++) t += calcGen(S[i].pet, S[i].mut, S[i].lvl);
  const el = document.getElementById(`fg-${f}`);
  if (el) el.textContent = `Gen: ${fmt(t)}/s`;
}

function updateGlobal() {
  let tot = 0, act = 0;
  for (let i = 0; i < TOTAL; i++) {
    if (S[i].pet) { tot += calcGen(S[i].pet, S[i].mut, S[i].lvl); act++; }
  }
  document.getElementById("hs-tot").textContent = `${fmt(tot)}/s`;
  document.getElementById("hs-act").textContent = `${act} / 30`;

  // Rocky's displayed gen is dynamic (depends on other slots) — re-render it
  const ri = findRockySlot();
  if (ri >= 0 && document.getElementById(`sl-${ri}`)) renderSlot(ri);
}

function updateAll() {
  updateGlobal();
  for (let f = 1; f <= 3; f++) updateFloor(f);
}

// ════════════════════════════════════════════════════
//  EVENT DELEGATION — SELECT CHANGES
// ════════════════════════════════════════════════════
document.getElementById("floors").addEventListener("change", e => {
  const t = e.target;
  const i = parseInt(t.dataset.i, 10);
  if (isNaN(i)) return;

  if (t.classList.contains("ps")) {
    const newPet = getPet(t.value);
    // Enforce exclusive constraint via dropdown too
    if (newPet && newPet.exclusive) {
      const affectedFloors = enforceExclusive(t.value, i);
      affectedFloors.forEach(f => updateFloor(f));
    }
    S[i].pet = t.value;
  }
  if (t.classList.contains("ms")) S[i].mut = t.value;

  save();
  renderSlot(i);
  updateFloor(Math.floor(i / 10) + 1);
  updateGlobal();
});

// ════════════════════════════════════════════════════
//  EVENT DELEGATION — CLICK (clear slot / reset floor)
// ════════════════════════════════════════════════════
document.getElementById("floors").addEventListener("click", e => {
  // Clear single slot
  const clrBtn = e.target.closest(".s-clr");
  if (clrBtn) {
    const i = parseInt(clrBtn.dataset.i, 10);
    if (isNaN(i)) return;
    S[i] = { pet: "", mut: "Normal", lvl: 1 };
    save(); renderSlot(i);
    updateFloor(Math.floor(i / 10) + 1); updateGlobal();
    return;
  }

  // Reset entire floor
  const frBtn = e.target.closest(".btn-fr");
  if (frBtn) {
    const f = parseInt(frBtn.dataset.floor, 10);
    if (!confirm(`¿Limpiar todos los slots de la Planta ${f}?`)) return;
    const start = (f - 1) * 10;
    for (let i = start; i < start + 10; i++) {
      S[i] = { pet: "", mut: "Normal", lvl: 1 };
      renderSlot(i);
    }
    save(); updateFloor(f); updateGlobal();
  }

  // Level up/down
  const lvlBtn = e.target.closest(".btn-lvl");
  if (lvlBtn) {
    const i = parseInt(lvlBtn.dataset.i, 10);
    const dir = parseInt(lvlBtn.dataset.dir, 10);
    if (isNaN(i) || isNaN(dir)) return;
    
    let newLvl = (S[i].lvl || 1) + dir;
    if (newLvl < 1) newLvl = 1;
    if (newLvl > 75) newLvl = 75;
    
    if (newLvl !== S[i].lvl) {
      S[i].lvl = newLvl;
      save();
      renderSlot(i);
      const ri = findRockySlot();
      if (ri >= 0 && ri !== i) renderSlot(ri);
      
      updateFloor(Math.floor(i / 10) + 1);
      updateGlobal();
    }
  }
});

// Reset All
document.getElementById("btn-ra").addEventListener("click", () => {
  if (!confirm("¿Limpiar los 30 slots de todas las plantas?")) return;
  S = Array.from({ length: TOTAL }, () => ({ pet: "", mut: "Normal", lvl: 1 }));
  save();
  for (let i = 0; i < TOTAL; i++) renderSlot(i);
  updateAll();
});

// Exportar
document.getElementById("btn-exp").addEventListener("click", () => {
  const dataStr = JSON.stringify(S, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pets_config.json";
  a.click();
  URL.revokeObjectURL(url);
});

// Importar Trigger
document.getElementById("btn-imp").addEventListener("click", () => {
  document.getElementById("file-imp").click();
});

// Importar Handle
document.getElementById("file-imp").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const d = JSON.parse(event.target.result);
      if (Array.isArray(d) && d.length === TOTAL) {
        S = d.map(sl => ({
          pet: (typeof sl.pet === "string" && PETS.some(p => p.name === sl.pet)) ? sl.pet : "",
          mut: (typeof sl.mut === "string" && MUTS.some(m => m.name === sl.mut)) ? sl.mut : "Normal",
          lvl: (typeof sl.lvl === "number" && sl.lvl >= 1 && sl.lvl <= 75) ? sl.lvl : 1,
        }));
        save();
        for (let i = 0; i < TOTAL; i++) renderSlot(i);
        updateAll();
        alert("Configuración importada con éxito.");
      } else {
        alert("El archivo de configuración es inválido.");
      }
    } catch (err) {
      alert("Error al leer el archivo. Asegúrate de que sea un JSON válido.");
    }
    e.target.value = "";
  };
  reader.readAsText(file);
});

// ════════════════════════════════════════════════════
//  THEME TOGGLE
// ════════════════════════════════════════════════════
const btnTheme = document.getElementById("btn-theme");
let currentTheme = localStorage.getItem("ppt_theme") || "dark";
document.documentElement.setAttribute("data-theme", currentTheme);
btnTheme.textContent = currentTheme === "light" ? "🌙" : "☀️";

btnTheme.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  localStorage.setItem("ppt_theme", currentTheme);
  btnTheme.textContent = currentTheme === "light" ? "🌙" : "☀️";
});

// ════════════════════════════════════════════════════
//  RESIZER
// ════════════════════════════════════════════════════
const resizer = document.getElementById('sb-resizer');
const sidebar = document.getElementById('sb');

let isResizing = false;

if (resizer) {
  resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'ew-resize';
    resizer.classList.add('is-resizing');
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const newWidth = e.clientX;
    sidebar.style.width = `${newWidth}px`;
  });

  document.addEventListener('mouseup', () => {
    if (isResizing) {
      isResizing = false;
      document.body.style.cursor = '';
      resizer.classList.remove('is-resizing');
      document.body.style.userSelect = '';
      localStorage.setItem('ppt_sb_width', sidebar.style.width);
    }
  });
}

// ════════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════════
const savedWidth = localStorage.getItem('ppt_sb_width');
if (savedWidth && sidebar) sidebar.style.width = savedWidth;

load();
buildDict();
buildFloors();
updateAll();
