/* =============================================================
   COLOR DECODED — Richard Landis ASCII Generator
   ============================================================= */

const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const clamp = (v,a,b) => v<a?a:(v>b?b:v);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,7);

/* ---------- Cooper Hewitt artworks (all Untitled per request) ---------- */
const COOPER_HEWITT_BASE = "https://images.collection.cooperhewitt.org/";
const ARTWORKS = [
  { id: "338263_b3968981650b3838", aspect: 1.60, y:  80 },
  { id: "338258_d5db6774c862aa48", aspect: 0.32, y:   0 },
  { id: "338268_6f86fa64365ba914", aspect: 0.94, y:  50 },
  { id: "338272_f848efb0f0d2498d", aspect: 0.25, y:   0 },
  { id: "338265_a672a579705a05d1", aspect: 0.24, y:  30 },
  { id: "338261_845fcd4c38130b06", aspect: 0.65, y:  60 },
  { id: "338269_df054632bcb5d8ba", aspect: 0.72, y:  30 },
  { id: "338273_8c0381572755ddf9", aspect: 0.32, y:   0 },
  { id: "338266_75050f2d5aa1f029", aspect: 0.73, y:  50 },
  { id: "338259_1fe36ee159cbc63c", aspect: 0.52, y:  20 },
  { id: "338278_a4454f12bf1511eb", aspect: 1.00, y:  60 },
  { id: "338274_c06a063fe360f002", aspect: 0.76, y:  30 },
  { id: "338275_57875f8ed734c003", aspect: 0.58, y:   0 },
  { id: "338267_18faed37efdd167d", aspect: 1.00, y:  50 },
  { id: "378707_5862a105fb00f18d", aspect: 0.91, y:  20 },
  { id: "338257_8dfff6b6f2f43cd8", aspect: 0.48, y:   0 },
  { id: "338277_30be65b16d9c675b", aspect: 0.72, y:  40 },
  { id: "338264_a8f6007563003c65", aspect: 0.52, y:  20 },
  { id: "338271_fef377b00b84e74d", aspect: 0.80, y:  50 },
  { id: "338279_fdc451b8740d4dc9", aspect: 0.65, y:   0 },
  { id: "338260_8c450a7de8e0c5dc", aspect: 0.66, y:  40 },
  { id: "338270_60d4eefba8e2189e", aspect: 0.73, y:  20 }
];
const artworkUrl      = (id) => `${COOPER_HEWITT_BASE}${id}_b.jpg`;
const artworkUrlSmall = (id) => `${COOPER_HEWITT_BASE}${id}_n.jpg`;

/* ---------- LINEAR view order (same set as ARTWORKS, preferred order) ---- */
const LINEAR_ORDER_IDS = [
  "338258_d5db6774c862aa48",
  "338268_6f86fa64365ba914",
  "338272_f848efb0f0d2498d",
  "338265_a672a579705a05d1",
  "338261_845fcd4c38130b06",
  "338263_b3968981650b3838",
  "338269_df054632bcb5d8ba",
  "338273_8c0381572755ddf9",
  "338266_75050f2d5aa1f029",
  "338259_1fe36ee159cbc63c",
  "338278_a4454f12bf1511eb",
  "338274_c06a063fe360f002",
  "338275_57875f8ed734c003",
  "338267_18faed37efdd167d",
  "378707_5862a105fb00f18d",
  "338257_8dfff6b6f2f43cd8",
  "338277_30be65b16d9c675b",
  "338264_a8f6007563003c65",
  "338271_fef377b00b84e74d",
  "338279_fdc451b8740d4dc9",
  "338260_8c450a7de8e0c5dc",
  "338270_60d4eefba8e2189e"
];

/* ---------- GALLERY view: 7 rows × 3–4 tiles, all rows same height
   so every artwork displays at the same vertical scale.
   12-column grid; each tile = `row-start / col-start / row-end / col-end`. */
const GALLERY_LAYOUT = [
  // Row 1 (rows 1–10): 3 tiles × 4 cols
  { id: "338258_d5db6774c862aa48", area: "1 / 1 / 10 / 5"   },
  { id: "338268_6f86fa64365ba914", area: "1 / 5 / 10 / 9"   },
  { id: "338272_f848efb0f0d2498d", area: "1 / 9 / 10 / 13"  },

  // Row 2 (rows 12–21): 4 tiles × 3 cols (denser middle row)
  { id: "338265_a672a579705a05d1", area: "12 / 1 / 21 / 4"  },
  { id: "338261_845fcd4c38130b06", area: "12 / 4 / 21 / 7"  },
  { id: "338263_b3968981650b3838", area: "12 / 7 / 21 / 10" },
  { id: "338269_df054632bcb5d8ba", area: "12 / 10 / 21 / 13"},

  // Row 3 (rows 23–32): 3 tiles × 4 cols
  { id: "338273_8c0381572755ddf9", area: "23 / 1 / 32 / 5"  },
  { id: "338266_75050f2d5aa1f029", area: "23 / 5 / 32 / 9"  },
  { id: "338259_1fe36ee159cbc63c", area: "23 / 9 / 32 / 13" },

  // Row 4 (rows 34–43): 3 tiles × 4 cols
  { id: "338278_a4454f12bf1511eb", area: "34 / 1 / 43 / 5"  },
  { id: "338274_c06a063fe360f002", area: "34 / 5 / 43 / 9"  },
  { id: "338275_57875f8ed734c003", area: "34 / 9 / 43 / 13" },

  // Row 5 (rows 45–54): 3 tiles × 4 cols
  { id: "338267_18faed37efdd167d", area: "45 / 1 / 54 / 5"  },
  { id: "378707_5862a105fb00f18d", area: "45 / 5 / 54 / 9"  },
  { id: "338257_8dfff6b6f2f43cd8", area: "45 / 9 / 54 / 13" },

  // Row 6 (rows 56–65): 3 tiles × 4 cols
  { id: "338277_30be65b16d9c675b", area: "56 / 1 / 65 / 5"  },
  { id: "338264_a8f6007563003c65", area: "56 / 5 / 65 / 9"  },
  { id: "338271_fef377b00b84e74d", area: "56 / 9 / 65 / 13" },

  // Row 7 (rows 67–76): 3 tiles × 4 cols
  { id: "338279_fdc451b8740d4dc9", area: "67 / 1 / 76 / 5"  },
  { id: "338260_8c450a7de8e0c5dc", area: "67 / 5 / 76 / 9"  },
  { id: "338270_60d4eefba8e2189e", area: "67 / 9 / 76 / 13" }
];

/* ---------- Character sets ---------- */
const CHARSETS = {
  standard: " .'`,-~:;!*+=#%@$&",
  detailed: " .'`,^:\";~-_+<>i!lI?/\\|()1{}[]rcvunxzjftLCJUYXZO0Qoahkbdpqwm*WMB8&%$#@",
  blocks:   " ░░▒▒▓▓██▀▄▌▐▖▗▘▙▚▛▜▝▞▟",
  simple:   " .,:;ox#@",
  binary:   " 01",
  shaded:   " ··∙∙••◦◦○○●●◐◑◒◓◔◕⬤",
  dense:    "@%#W&8B0Mqphbdkw*oazcvunxrjft|()1{}[]?-_+~<>i!lI;:,\"`'. "
};

/* ---------- Default control values ---------- */
const DEFAULTS = {
  invert: false, charset: "standard",
  brightness: 0, contrast: 0, detail: 140,
  saturation: 20, hue: 0, animSpeed: 0,
  userText: ""
};

/* ---------- State ---------- */
const state = {
  ...DEFAULTS,
  image: null,
  imageId: "",
  savedAs: "",

  cells: [],
  cols: 0, rows: 0,
  cellW: 0, cellH: 0,

  drafts: [],
  editingDraftId: null,

  rafId: null,
  lastTick: 0
};

const navContext = { skipReset: false };

/* ---------- Persistence ---------- */
const LS_KEY = "color_decoded_drafts_v5";
function migrateDraft(d){
  // Older drafts stored canvasW in device pixels; convert to CSS pixels.
  if (d && d.params && d.params.canvasW && d.params.canvasW > 1500) {
    d.params.canvasW = Math.round(d.params.canvasW / 2);
    if (d.params.canvasH) d.params.canvasH = Math.round(d.params.canvasH / 2);
  }
  return d;
}
function loadDrafts(){
  try {
    const raw = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    state.drafts = raw.map(migrateDraft);
    saveDrafts();
  } catch(_) { state.drafts = []; }
}
function saveDrafts(){
  try { localStorage.setItem(LS_KEY, JSON.stringify(state.drafts)); } catch(_){}
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg){
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> el.classList.remove("show"), 2200);
}

/* =============================================================
   NAVIGATION + RESET
   ============================================================= */
function resetCreateState(){
  state.image = null;
  state.imageId = "";
  state.savedAs = "";
  state.editingDraftId = null;

  Object.assign(state, DEFAULTS);
  state.cells = []; state.cols = 0; state.rows = 0;
  state.userText = "";

  syncControlsFromState();

  const c = $("#ascii-canvas");
  if (c) {
    const ctx = c.getContext("2d");
    ctx.clearRect(0,0,c.width,c.height);
    c.width = 0; c.height = 0;
  }
  $("#empty-stage")?.classList.remove("hide");
  $("#src-name").textContent = "";

  const ti = $("#text-input"); if (ti) ti.value = "";
  $("#charset-select")?.classList.remove("open");

  if (state.rafId) cancelAnimationFrame(state.rafId);
  state.rafId = null;
}

function syncControlsFromState(){
  $("#brightness").value = state.brightness; $("#val-brightness").textContent = state.brightness;
  $("#contrast").value   = state.contrast;   $("#val-contrast").textContent   = state.contrast;
  $("#detail").value     = state.detail;     $("#val-detail").textContent     = state.detail;
  $("#saturation").value = state.saturation; $("#val-saturation").textContent = state.saturation;
  $("#hue").value        = state.hue;        $("#val-hue").textContent        = state.hue;
  $("#anim").value       = state.animSpeed;  $("#val-anim").textContent       = state.animSpeed;
  $$("#charset-options li").forEach(x => x.classList.toggle("active", x.dataset.value === state.charset));
  $("#charset-display").textContent = state.charset.charAt(0).toUpperCase() + state.charset.slice(1);
  $("#invert-toggle").classList.toggle("on", state.invert);
  $("#invert-toggle").setAttribute("aria-pressed", String(state.invert));
}

function goto(name){
  if (name === "create" && !navContext.skipReset) {
    resetCreateState();
  }
  navContext.skipReset = false;

  $("#charset-select")?.classList.remove("open");
  $("#decode-modal")?.classList.remove("open");
  $("#name-modal")?.classList.remove("open");
  $("#export-modal")?.classList.remove("open");

  $$(".page").forEach(p => p.classList.remove("active"));
  const target = $(`#page-${name}`);
  if (target) target.classList.add("active");
  $$(".topbar .nav-link").forEach(n => {
    n.classList.toggle("active", n.dataset.go === name);
  });

  // body class controls home-only chrome (transparent topbar)
  document.body.classList.toggle("on-home", name === "home");

  if (name === "saved") renderSaved();
  if (name !== "saved") stopPreviewAnimation();
  if (name === "about") {
    setTimeout(() => startAboutWave(), 80);
  } else {
    stopAboutWave();
  }

  if (name === "create" && state.image) {
    setTimeout(() => { render(); positionAllTexts(); }, 60);
    armHideTimer();
  } else {
    showTopbar();
  }
}

$$(".topbar [data-go]").forEach(b => {
  b.addEventListener("click", () => goto(b.dataset.go));
});

/* Topbar auto-hide on Create */
let hideTimer = null;
function showTopbar(){ $("#topbar").classList.remove("hidden"); }
function armHideTimer(){
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    if ($("#page-create").classList.contains("active")) {
      $("#topbar").classList.add("hidden");
    }
  }, 2500);
}
$("#topbar").addEventListener("mouseenter", () => { showTopbar(); clearTimeout(hideTimer); });
$("#topbar").addEventListener("mouseleave", armHideTimer);
window.addEventListener("mousemove", (e) => {
  if (e.clientY < 80) { showTopbar(); armHideTimer(); }
});

/* =============================================================
   GALLERY (home)
   ============================================================= */
function renderGallery(){
  const linear = $("#gallery-linear");
  const grid   = $("#gallery-grid");
  linear.innerHTML = "";
  grid.innerHTML = "";

  // LINEAR view — explicit order from LINEAR_ORDER_IDS, image-dictated tile
  // width via inline aspect-ratio, vertical offset for rhythm.
  LINEAR_ORDER_IDS.forEach((id) => {
    const a = ARTWORKS.find(x => x.id === id);
    if (!a) return;
    const lt = document.createElement("div");
    lt.className = "tile";
    lt.style.aspectRatio = String(a.aspect || 0.7);
    lt.style.setProperty("--y", (a.y || 0) + "px");
    lt.innerHTML = `<img loading="lazy" alt="" crossorigin="anonymous"
                         src="${artworkUrl(a.id)}"
                         onerror="this.onerror=null;this.src='${artworkUrlSmall(a.id)}';" />`;
    lt.addEventListener("click", () => openDecode({ id: a.id }));
    linear.appendChild(lt);
  });

  // GRID view — explicit grid-area placements, 6 rows × 3–4 tiles
  GALLERY_LAYOUT.forEach((a) => {
    const gt = document.createElement("div");
    gt.className = "tile";
    gt.style.gridArea = a.area;
    gt.innerHTML = `<img loading="lazy" alt="" crossorigin="anonymous"
                         src="${artworkUrl(a.id)}"
                         onerror="this.onerror=null;this.src='${artworkUrlSmall(a.id)}';" />`;
    gt.addEventListener("click", () => openDecode({ id: a.id }));
    grid.appendChild(gt);
  });

  shuffleTiles($("#gallery-linear"));
  setupMomentumScroll($("#gallery-linear"));
  setupScrollJiggle($("#gallery-linear"), true);
  setupScrollJiggle($("#gallery-grid"), false);
}

/* Subtle scroll-driven jiggle: tiles drift a few pixels and rotate
   slightly while the user is scrolling, then ease back to rest. */
function setupScrollJiggle(container, isHorizontal){
  let lastScroll = isHorizontal ? container.scrollLeft : container.scrollTop;
  let vel = 0;
  let active = false;

  container.addEventListener("scroll", () => {
    const cur = isHorizontal ? container.scrollLeft : container.scrollTop;
    // smoothed velocity so single jumps don't spike the jiggle
    vel = vel * 0.5 + (cur - lastScroll) * 0.5;
    lastScroll = cur;
    if (!active) { active = true; requestAnimationFrame(step); }
  }, { passive: true });

  function step(){
    const tiles = container.querySelectorAll(".tile");
    const intensity = clamp(Math.abs(vel) / 50, 0, 1);
    tiles.forEach((t, i) => {
      const seed = i * 0.6 + 0.5;
      // small drift in both axes plus a hair of rotation
      const sx = Math.sin(seed * 1.3) * 4 * intensity;
      const sy = Math.cos(seed * 1.7) * 3 * intensity;
      const sr = Math.sin(seed * 0.9) * 0.7 * intensity;
      t.style.setProperty("--jx", sx + "px");
      t.style.setProperty("--jy", sy + "px");
      t.style.setProperty("--jr", sr + "deg");
    });
    vel *= 0.85;
    if (Math.abs(vel) > 0.4) {
      requestAnimationFrame(step);
    } else {
      tiles.forEach(t => {
        t.style.setProperty("--jx", "0px");
        t.style.setProperty("--jy", "0px");
        t.style.setProperty("--jr", "0deg");
      });
      active = false;
    }
  }
}

/* Toggle linear ↔ grid */
function setLayout(mode){
  const pill = $("#gallery-pill");
  pill.dataset.mode = mode;
  if (mode === "linear") {
    $("#gallery-grid").classList.add("hide");
    $("#gallery-linear").classList.remove("hide");
    shuffleTiles($("#gallery-linear"));
  } else {
    $("#gallery-linear").classList.add("hide");
    $("#gallery-grid").classList.remove("hide");
    shuffleTiles($("#gallery-grid"));
  }
}
$("#gallery-pill").addEventListener("click", () => {
  setLayout($("#gallery-pill").dataset.mode === "linear" ? "grid" : "linear");
});
$("#lbl-linear").addEventListener("click", () => setLayout("linear"));
$("#lbl-grid").addEventListener("click",  () => setLayout("grid"));

/* "shuffle in place" — synchronized arrival, no opacity
   (so the screen never flashes white) */
function shuffleTiles(container){
  const tiles = container.querySelectorAll(".tile");
  const animName = container.id === "gallery-linear" ? "shuffleInLinear" : "shuffleIn";
  tiles.forEach((t) => {
    const sx = (Math.random() - 0.5) * 60;
    const sy = (Math.random() - 0.5) * 40;
    const sr = (Math.random() - 0.5) * 4;     // very subtle rotation
    t.style.setProperty("--sx", sx + "px");
    t.style.setProperty("--sy", sy + "px");
    t.style.setProperty("--sr", sr + "deg");
    t.style.animation = "none";
    void t.offsetWidth;
    // No stagger — every tile starts together so they arrive together.
    t.style.animation = `${animName} 0.95s cubic-bezier(0.22, 1, 0.36, 1)`;
  });
}

/* Momentum-style horizontal scroll for the linear view.
   Wheel deltaY (and trackpad horizontal scroll) accumulate into
   a velocity that decelerates smoothly to a stop — gives a
   "floating, slow stop" feel without JS-driven jank. */
function setupMomentumScroll(el){
  let vel = 0;
  let active = false;
  let last = 0;

  el.addEventListener("wheel", (e) => {
    // Allow native horizontal scroll if that's already the dominant axis
    const dx = Math.abs(e.deltaX), dy = Math.abs(e.deltaY);
    if (dx > dy && dx > 0) return;          // native horizontal already
    e.preventDefault();
    const delta = e.deltaY || e.deltaX;
    vel += delta * 0.55;                    // accumulate impulse
    if (!active) { active = true; last = performance.now(); requestAnimationFrame(step); }
  }, { passive: false });

  function step(now){
    if (!active) return;
    const dt = now - last; last = now;
    if (Math.abs(vel) < 0.4) { active = false; return; }
    el.scrollLeft += vel;
    // Time-based friction so deceleration feels consistent
    const friction = Math.pow(0.92, dt / 16);
    vel *= friction;
    requestAnimationFrame(step);
  }
}

/* =============================================================
   DECODE MODAL
   ============================================================= */
let pendingArtwork = null;
function openDecode(artwork){
  pendingArtwork = artwork;
  const img = $("#decode-img");
  img.src = artworkUrl(artwork.id);
  img.onerror = () => { img.onerror = null; img.src = artworkUrlSmall(artwork.id); };
  $("#decode-modal").classList.add("open");
}
$("#decode-close").addEventListener("click", () => $("#decode-modal").classList.remove("open"));
$("#decode-go").addEventListener("click", async () => {
  if (!pendingArtwork) return;
  $("#decode-modal").classList.remove("open");
  resetCreateState();
  navContext.skipReset = true;
  goto("create");
  await loadImageFromUrl(artworkUrl(pendingArtwork.id), pendingArtwork);
});
// Clicking the artwork image inside the decode modal also starts the design
$("#decode-img").addEventListener("click", () => $("#decode-go").click());
$("#decode-img").style.cursor = "pointer";
$("#decode-modal").addEventListener("click", (e) => {
  if (e.target.id === "decode-modal") $("#decode-modal").classList.remove("open");
});

/* image cache */
const imageCache = new Map();
function loadImage(url){
  if (imageCache.has(url)) return Promise.resolve(imageCache.get(url));
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => { imageCache.set(url, img); resolve(img); };
    img.onerror = () => reject(new Error("image load failed"));
    img.src = url;
  });
}
function loadImageFromUrl(url, artwork){
  return loadImage(url).catch(() => {
    if (artwork && url.endsWith("_b.jpg")) return loadImage(artworkUrlSmall(artwork.id));
    throw new Error("CORS or load error");
  }).then(img => {
    state.image = img;
    state.imageId = artwork ? artwork.id : "";
    $("#empty-stage")?.classList.add("hide");
    render();
  }).catch(() => toast("Image could not load."));
}

/* =============================================================
   ASCII RENDERING
   ============================================================= */
function buildGridFor(image, params){
  const work = $("#work-canvas");
  const wctx = work.getContext("2d", { willReadFrequently: true });
  const cols = Math.max(40, Math.floor(params.detail));
  const cellAspect = 0.55;
  // accept either an HTMLImageElement (.naturalWidth) or a canvas (.width)
  const srcW = image.naturalWidth || image.width;
  const srcH = image.naturalHeight || image.height;
  const imgAspect = srcW / srcH;
  const rows = Math.max(20, Math.round(cols / imgAspect * cellAspect));

  work.width = cols; work.height = rows;
  const brightness = 100 + params.brightness;
  const contrast   = 100 + params.contrast;
  const saturation = 100 + params.saturation;
  const hue        = params.hue;
  const invert     = params.invert ? 100 : 0;
  wctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg) invert(${invert}%)`;
  wctx.imageSmoothingEnabled = true;
  wctx.imageSmoothingQuality = "high";
  let imgData;
  try {
    wctx.clearRect(0,0,cols,rows);
    wctx.drawImage(image, 0, 0, cols, rows);
    imgData = wctx.getImageData(0,0,cols,rows);
  } catch (err) {
    return null;
  }
  const set = CHARSETS[params.charset] || CHARSETS.standard;
  const setLen = set.length;

  // Weave the user's typed text into the grid as part of the ASCII art.
  // Two layers:
  //   1. A handful of "readable zones" — short horizontal runs of
  //      contiguous characters at fixed positions, so a word or two
  //      from the user's input shows up legibly inside the textile.
  //   2. Everywhere else, occasional scattered single-character
  //      substitutions, deterministically placed by a per-cell hash so
  //      they stay stable between renders.
  const ut = (params.userText || "").replace(/[\r\n\t]+/g, " ");
  const textChars = ut ? ut.split("") : [];
  const textLen = textChars.length;
  const TEXT_PROB = 0.22;
  let textIdx = 0;

  // Build readable zones from the user's words. Many positions are
  // distributed across the canvas; if the user has fewer words than
  // zones, the words cycle so the design is still peppered with
  // legible runs throughout, not just at a few spots.
  const words = ut.split(/\s+/).filter(w => w.length > 0);
  const zonePositions = [
    { yFrac: 0.08, xFrac: 0.10 },
    { yFrac: 0.16, xFrac: 0.55 },
    { yFrac: 0.24, xFrac: 0.28 },
    { yFrac: 0.34, xFrac: 0.62 },
    { yFrac: 0.42, xFrac: 0.12 },
    { yFrac: 0.50, xFrac: 0.46 },
    { yFrac: 0.58, xFrac: 0.20 },
    { yFrac: 0.66, xFrac: 0.58 },
    { yFrac: 0.74, xFrac: 0.30 },
    { yFrac: 0.82, xFrac: 0.55 },
    { yFrac: 0.90, xFrac: 0.12 }
  ];
  const zones = [];
  if (words.length > 0) {
    for (let i = 0; i < zonePositions.length; i++) {
      const w = words[i % words.length];
      const pos = zonePositions[i];
      const x0 = clamp(Math.floor(pos.xFrac * cols), 0, Math.max(0, cols - w.length - 1));
      const y0 = clamp(Math.floor(pos.yFrac * rows), 0, rows - 1);
      zones.push({ x: x0, y: y0, chars: w });
    }
  }
  function zoneCharAt(x, y){
    for (let i = 0; i < zones.length; i++) {
      const z = zones[i];
      if (y === z.y && x >= z.x && x < z.x + z.chars.length) {
        return z.chars[x - z.x];
      }
    }
    return null;
  }

  const cells = new Array(cols * rows);
  for (let y=0; y<rows; y++) {
    for (let x=0; x<cols; x++) {
      const i = (y*cols + x) * 4;
      let r = imgData.data[i];
      let g = imgData.data[i+1];
      let b = imgData.data[i+2];
      const hsl = rgbToHsl(r, g, b);
      hsl[1] = clamp(hsl[1] * 1.25, 0, 1);
      const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
      r = rgb[0]; g = rgb[1]; b = rgb[2];
      const lum = (0.299*r + 0.587*g + 0.114*b) / 255;
      const idx = clamp(Math.floor((1 - lum) * (setLen - 1) + 0.5), 0, setLen - 1);
      let ch = set[idx] || " ";

      // First check if we're inside a "readable zone" — those show
      // a contiguous slice of the user's text, legibly.
      const zoneCh = zoneCharAt(x, y);
      if (zoneCh && zoneCh !== " ") {
        ch = zoneCh;
      } else if (textLen > 0 && ch !== " ") {
        // Otherwise: scattered single-character substitution.
        const seed = ((x * 73856093) ^ (y * 19349663)) >>> 0;
        const r01 = (seed % 10000) / 10000;
        if (r01 < TEXT_PROB) {
          const tc = textChars[textIdx % textLen];
          if (tc && tc !== " ") ch = tc;
          textIdx++;
        }
      }

      cells[y*cols + x] = {
        ch, baseCh: ch,
        color: `rgb(${r},${g},${b})`,
        baseColor: `rgb(${r},${g},${b})`,
        ox: 0, oy: 0, vx: 0, vy: 0
      };
    }
  }
  return { cells, cols, rows };
}
function rgbToHsl(r,g,b){
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h, s, l=(max+min)/2;
  if (max===min){ h=0; s=0; }
  else {
    const d=max-min;
    s = l>0.5 ? d/(2-max-min) : d/(max+min);
    switch(max){
      case r: h=(g-b)/d + (g<b?6:0); break;
      case g: h=(b-r)/d + 2; break;
      case b: h=(r-g)/d + 4; break;
    }
    h/=6;
  }
  return [h,s,l];
}
function hslToRgb(h,s,l){
  let r,g,b;
  if (s===0){ r=g=b=l; }
  else {
    const hue2rgb=(p,q,t)=>{
      if (t<0) t+=1; if (t>1) t-=1;
      if (t<1/6) return p+(q-p)*6*t;
      if (t<1/2) return q;
      if (t<2/3) return p+(q-p)*(2/3-t)*6;
      return p;
    };
    const q = l<0.5 ? l*(1+s) : l+s-l*s;
    const p = 2*l - q;
    r = hue2rgb(p,q,h+1/3);
    g = hue2rgb(p,q,h);
    b = hue2rgb(p,q,h-1/3);
  }
  return [Math.round(r*255), Math.round(g*255), Math.round(b*255)];
}

function fitCanvas(){
  const stage = $("#stage");
  const canvas = $("#ascii-canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const sw = stage.clientWidth;
  const sh = stage.clientHeight;
  const imgAspect = state.cols && state.rows
    ? (state.cols * 0.55) / state.rows
    : (state.image ? (state.image.naturalWidth / state.image.naturalHeight) : 1.5);
  let dw = sw, dh = sw / imgAspect;
  if (dh > sh) { dh = sh; dw = sh * imgAspect; }
  canvas.style.width = dw + "px";
  canvas.style.height = dh + "px";
  canvas.width  = Math.max(1, Math.floor(dw * dpr));
  canvas.height = Math.max(1, Math.floor(dh * dpr));
  state.cellW = canvas.width / state.cols;
  state.cellH = canvas.height / state.rows;
}
function paint(){
  if (!state.image || !state.cells.length) return;
  const canvas = $("#ascii-canvas");
  const ctx = canvas.getContext("2d");
  const cellW = state.cellW, cellH = state.cellH;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const fontSize = Math.max(4, cellH * 1.05);
  ctx.font = `${fontSize}px "JetBrains Mono", Menlo, Consolas, monospace`;
  ctx.textBaseline = "top";

  for (let y=0; y<state.rows; y++) {
    for (let x=0; x<state.cols; x++) {
      const c = state.cells[y*state.cols + x];
      if (c.ch === " ") continue;
      ctx.fillStyle = c.color;
      ctx.fillText(c.ch, x*cellW + c.ox, y*cellH + c.oy);
    }
  }
  positionAllTexts();
}
function render(){
  if (!state.image) return;
  const result = buildGridFor(state.image, {
    detail: state.detail, brightness: state.brightness, contrast: state.contrast,
    saturation: state.saturation, hue: state.hue, invert: state.invert,
    charset: state.charset, userText: state.userText
  });
  if (!result) { toast("Cannot read image pixels (CORS)."); return; }
  state.cells = result.cells;
  state.cols = result.cols; state.rows = result.rows;
  fitCanvas();
  paint();
  startAnimation();
}
window.addEventListener("resize", () => {
  if (state.image) { fitCanvas(); paint(); positionAllTexts(); }
});
/* Re-fit the canvas after fullscreen toggles so the design fills the
   new viewport cleanly without ever being cut off at the bottom. */
document.addEventListener("fullscreenchange", () => {
  if (state.image && $("#page-create").classList.contains("active")) {
    setTimeout(() => { fitCanvas(); paint(); positionAllTexts(); }, 80);
  }
});

/* =============================================================
   ANIMATION (ASCII bounce)
   ============================================================= */
function startAnimation(){
  if (state.rafId) cancelAnimationFrame(state.rafId);
  state.lastTick = 0;
  if (state.animSpeed <= 0) { paint(); return; }
  const SPRING = 0.10, DAMP = 0.86, KICK_FRAC_MAX = 0.18;
  function tick(t){
    state.rafId = requestAnimationFrame(tick);
    if (!state.lastTick) state.lastTick = t;
    const dt = t - state.lastTick;
    if (dt < 16) return;
    state.lastTick = t;
    const intensity = state.animSpeed / 100;
    const maxOffset = state.cellH * 1.4;
    const kickCount = Math.max(1, Math.floor(state.cells.length * KICK_FRAC_MAX * intensity));
    for (let i=0; i<kickCount; i++) {
      const idx = Math.floor(Math.random() * state.cells.length);
      const c = state.cells[idx];
      if (!c) continue;
      const a = Math.random() * Math.PI * 2;
      const s = (1.5 + Math.random()*4.5) * intensity;
      c.vx += Math.cos(a) * s;
      c.vy += Math.sin(a) * s;
    }
    for (let i=0; i<state.cells.length; i++) {
      const c = state.cells[i];
      c.vx += -c.ox * SPRING; c.vy += -c.oy * SPRING;
      c.vx *= DAMP; c.vy *= DAMP;
      c.ox = clamp(c.ox + c.vx, -maxOffset, maxOffset);
      c.oy = clamp(c.oy + c.vy, -maxOffset, maxOffset);
    }
    paint();
  }
  state.rafId = requestAnimationFrame(tick);
}

/* =============================================================
   TEXT-INTO-ASCII source
   The textarea drives state.userText; that string gets woven into
   the ASCII grid by buildGridFor(). No floating overlays — the
   characters are part of the artwork itself.
   - Empty stub kept so any other code that calls positionAllTexts()
     during render() doesn't error.
   ============================================================= */
function positionAllTexts(){ /* no-op (text is baked into the ASCII grid now) */ }

$("#text-input").addEventListener("input", (e) => {
  state.userText = e.target.value;
  if (state.image) render();
});

/* =============================================================
   CONTROL BINDINGS
   ============================================================= */
function bindSwitch(id, prop, after){
  const el = $(id);
  el.addEventListener("click", () => {
    state[prop] = !state[prop];
    el.classList.toggle("on", state[prop]);
    el.setAttribute("aria-pressed", String(state[prop]));
    if (after) after();
  });
}
bindSwitch("#invert-toggle", "invert", () => render());

function bindRange(id, prop, valId){
  const el = $(id);
  const vEl = $(valId);
  el.addEventListener("input", () => {
    const v = parseFloat(el.value);
    state[prop] = v;
    vEl.textContent = v;
    if (prop === "animSpeed") startAnimation();
    else render();
  });
}
bindRange("#brightness", "brightness", "#val-brightness");
bindRange("#contrast",   "contrast",   "#val-contrast");
bindRange("#detail",     "detail",     "#val-detail");
bindRange("#saturation", "saturation", "#val-saturation");
bindRange("#hue",        "hue",        "#val-hue");
bindRange("#anim",       "animSpeed",  "#val-anim");

(function setupDropdown(){
  const wrap = $("#charset-select");
  const btn  = $("#charset-btn");
  const display = $("#charset-display");
  function close(){ wrap.classList.remove("open"); btn.setAttribute("aria-expanded","false"); }
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    wrap.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(wrap.classList.contains("open")));
  });
  $$("#charset-options li").forEach(li => {
    li.addEventListener("click", () => {
      const v = li.dataset.value;
      state.charset = v;
      $$("#charset-options li").forEach(x => x.classList.toggle("active", x === li));
      display.textContent = li.textContent;
      close();
      render();
    });
  });
  document.addEventListener("click", (e) => {
    if (!wrap.contains(e.target)) close();
  });
})();

$("#btn-reset").addEventListener("click", () => {
  Object.assign(state, DEFAULTS);
  state.userText = "";
  $("#text-input").value = "";
  syncControlsFromState();
  if (state.image) render();
});

/* =============================================================
   SAVE
   ============================================================= */
function captureThumb(){
  // Text is now baked into the ASCII grid itself — just snapshot the canvas.
  const src = $("#ascii-canvas");
  if (!src || !src.width) return null;
  const tw = 640;
  const th = Math.round(tw * (src.height / src.width));
  const c = document.createElement("canvas");
  c.width = tw; c.height = th;
  const cx = c.getContext("2d");
  cx.fillStyle = "#fff"; cx.fillRect(0,0,tw,th);
  cx.drawImage(src, 0, 0, tw, th);
  return c.toDataURL("image/png");
}
function snapshotParams(){
  const c = $("#ascii-canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cssW = c ? (c.clientWidth || (c.width / dpr)) : 800;
  const cssH = c ? (c.clientHeight || (c.height / dpr)) : 600;
  return {
    invert: state.invert, charset: state.charset,
    brightness: state.brightness, contrast: state.contrast,
    saturation: state.saturation, hue: state.hue,
    detail: state.detail, animSpeed: state.animSpeed,
    sourceId: state.imageId,
    canvasW: Math.round(cssW),
    canvasH: Math.round(cssH),
    userText: state.userText || ""
  };
}
function performSave(label, draftId){
  const draft = {
    id: draftId || (Date.now() + Math.floor(Math.random()*1000)),
    label: label.trim() || "Untitled",
    src: state.imageId,
    thumb: captureThumb(),
    hasAnim: state.animSpeed > 0,
    params: snapshotParams()
  };
  if (draftId) {
    const idx = state.drafts.findIndex(d => d.id === draftId);
    if (idx >= 0) state.drafts[idx] = draft; else state.drafts.push(draft);
    toast(`Updated ${draft.label}`);
  } else {
    state.drafts.push(draft);
    toast(`Saved as ${draft.label}`);
  }
  state.editingDraftId = draft.id;
  state.savedAs = draft.label;
  $("#src-name").textContent = draft.label;
  saveDrafts();
}
function openNameModal(){
  if (!state.image || !state.cells.length) {
    toast("Pick an artwork first.");
    return;
  }
  const m = $("#name-modal");
  const inp = $("#name-input");
  inp.value = "";
  m.classList.add("open");
  setTimeout(() => inp.focus(), 30);
}
$("#btn-save").addEventListener("click", () => {
  if (state.editingDraftId && state.drafts.some(d => d.id === state.editingDraftId)) {
    const d = state.drafts.find(d => d.id === state.editingDraftId);
    performSave(d.label, state.editingDraftId);
    return;
  }
  openNameModal();
});
$("#name-cancel").addEventListener("click", () => $("#name-modal").classList.remove("open"));
$("#name-confirm").addEventListener("click", () => {
  const v = $("#name-input").value.trim() || "Untitled";
  performSave(v);
  $("#name-modal").classList.remove("open");
});
$("#name-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") $("#name-confirm").click();
  if (e.key === "Escape") $("#name-cancel").click();
});

/* =============================================================
   SAVED PAGE
   ============================================================= */
const previewState = {
  cells: [], cols: 0, rows: 0, cellW: 0, cellH: 0,
  image: null, params: null,
  rafId: null, lastTick: 0
};

function fitPreviewCanvas(image, cols, rows){
  const wrap = $(".saved-preview-wrap");
  const canvas = $("#saved-preview");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const sw = wrap.clientWidth * 0.9;
  const sh = wrap.clientHeight * 0.96;
  const imgAspect = (cols * 0.55) / rows;
  let dw = sw, dh = sw / imgAspect;
  if (dh > sh) { dh = sh; dw = sh * imgAspect; }
  canvas.style.width = dw + "px";
  canvas.style.height = dh + "px";
  canvas.width  = Math.max(1, Math.floor(dw * dpr));
  canvas.height = Math.max(1, Math.floor(dh * dpr));
  previewState.cellW = canvas.width / cols;
  previewState.cellH = canvas.height / rows;
}
function paintPreview(){
  // Text is now woven into the cells themselves — draw the grid only.
  const canvas = $("#saved-preview");
  if (!canvas.width || !previewState.cells.length) return;
  const ctx = canvas.getContext("2d");
  const cellW = previewState.cellW, cellH = previewState.cellH;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#fff"; ctx.fillRect(0,0,canvas.width,canvas.height);
  const fontSize = Math.max(4, cellH * 1.05);
  ctx.font = `${fontSize}px "JetBrains Mono", Menlo, Consolas, monospace`;
  ctx.textBaseline = "top";
  for (let y=0; y<previewState.rows; y++) {
    for (let x=0; x<previewState.cols; x++) {
      const c = previewState.cells[y*previewState.cols+x];
      if (c.ch === " ") continue;
      ctx.fillStyle = c.color;
      ctx.fillText(c.ch, x*cellW + c.ox, y*cellH + c.oy);
    }
  }
}
async function showPreviewFor(d){
  const url = artworkUrl(d.src);
  let img;
  try { img = await loadImage(url); }
  catch(_) {
    try { img = await loadImage(artworkUrlSmall(d.src)); }
    catch(_) { return; }
  }
  const result = buildGridFor(img, d.params);
  if (!result) return;
  previewState.cells = result.cells;
  previewState.cols  = result.cols;
  previewState.rows  = result.rows;
  previewState.image = img;
  previewState.params = d.params;
  fitPreviewCanvas(img, result.cols, result.rows);
  $("#saved-preview").classList.add("show");
  paintPreview();
  startPreviewAnimation();
}
function startPreviewAnimation(){
  stopPreviewAnimation();
  const animSpeed = previewState.params?.animSpeed || 0;
  if (animSpeed <= 0) { paintPreview(); return; }
  const SPRING = 0.10, DAMP = 0.86, KICK_FRAC_MAX = 0.18;
  function tick(t){
    previewState.rafId = requestAnimationFrame(tick);
    if (!previewState.lastTick) previewState.lastTick = t;
    const dt = t - previewState.lastTick;
    if (dt < 16) return;
    previewState.lastTick = t;
    const intensity = animSpeed / 100;
    const maxOffset = previewState.cellH * 1.4;
    const kickCount = Math.max(1, Math.floor(previewState.cells.length * KICK_FRAC_MAX * intensity));
    for (let i=0; i<kickCount; i++) {
      const idx = Math.floor(Math.random() * previewState.cells.length);
      const c = previewState.cells[idx];
      if (!c) continue;
      const a = Math.random()*Math.PI*2;
      const s = (1.5 + Math.random()*4.5)*intensity;
      c.vx += Math.cos(a)*s; c.vy += Math.sin(a)*s;
    }
    for (let i=0; i<previewState.cells.length; i++) {
      const c = previewState.cells[i];
      c.vx += -c.ox * SPRING; c.vy += -c.oy * SPRING;
      c.vx *= DAMP; c.vy *= DAMP;
      c.ox = clamp(c.ox + c.vx, -maxOffset, maxOffset);
      c.oy = clamp(c.oy + c.vy, -maxOffset, maxOffset);
    }
    paintPreview();
  }
  previewState.rafId = requestAnimationFrame(tick);
}
function stopPreviewAnimation(){
  if (previewState.rafId) cancelAnimationFrame(previewState.rafId);
  previewState.rafId = null;
  previewState.lastTick = 0;
}
function hidePreview(){
  stopPreviewAnimation();
  $("#saved-preview").classList.remove("show");
}

let hoveredRowId = null;
let savedHideTimer = null;
function clearSavedHover(){
  hoveredRowId = null;
  $$(".saved-row").forEach(r => r.classList.remove("is-active"));
  hidePreview();
}
function renderSaved(){
  const tbl = $("#saved-table");
  tbl.innerHTML = "";
  clearTimeout(savedHideTimer);
  hidePreview();
  hoveredRowId = null;
  if (!state.drafts.length) {
    tbl.innerHTML = `<div class="saved-empty">No saved drafts yet.</div>`;
    return;
  }
  // Inner wrapper anchors rows to the bottom when short, and lets them
  // scroll once they overflow.
  const wrap = document.createElement("div");
  wrap.className = "saved-rows";
  tbl.appendChild(wrap);

  state.drafts.forEach(d => {
    const row = document.createElement("div");
    row.className = "saved-row";
    row.dataset.id = String(d.id);
    row.innerHTML = `
      <div class="name"><span class="label">${d.label}</span></div>
      <button class="saved-row-link" data-act="edit">Edit</button>
      <button class="saved-row-link" data-act="export">Export</button>
      <button class="saved-row-link" data-act="delete">Delete</button>
    `;
    row.addEventListener("mouseenter", () => {
      clearTimeout(savedHideTimer);
      hoveredRowId = d.id;
      $$(".saved-row").forEach(r => r.classList.remove("is-active"));
      row.classList.add("is-active");
      showPreviewFor(d);
    });
    // Per-row leave with a tiny grace period so moving between rows
    // doesn't flicker, but moving off the rows entirely clears state.
    row.addEventListener("mouseleave", () => {
      clearTimeout(savedHideTimer);
      savedHideTimer = setTimeout(() => {
        if (hoveredRowId === d.id) clearSavedHover();
      }, 60);
    });
    row.querySelector('[data-act="edit"]').addEventListener("click", (e) => { e.stopPropagation(); editDraft(d); });
    row.querySelector('[data-act="export"]').addEventListener("click", (e) => { e.stopPropagation(); openExportModal(d); });
    row.querySelector('[data-act="delete"]').addEventListener("click", (e) => { e.stopPropagation(); deleteDraft(d); });
    wrap.appendChild(row);
  });

  // Whole-table leave (mouse moves off the table area entirely)
  tbl.onmouseleave = () => {
    clearTimeout(savedHideTimer);
    clearSavedHover();
  };

  // Start with the latest entry visible
  tbl.scrollTop = tbl.scrollHeight;
}

function applyParams(p){
  state.invert = !!p.invert; state.charset = p.charset || "standard";
  state.brightness = p.brightness || 0; state.contrast = p.contrast || 0;
  state.saturation = p.saturation == null ? 20 : p.saturation; state.hue = p.hue || 0;
  state.detail = p.detail || 140; state.animSpeed = p.animSpeed || 0;
  state.userText = p.userText || "";
  syncControlsFromState();
  // restore textarea content
  const ti = $("#text-input");
  if (ti) ti.value = state.userText;
}
function editDraft(d){
  resetCreateState();
  state.editingDraftId = d.id;
  state.savedAs = d.label;
  applyParams(d.params || {});
  navContext.skipReset = true;
  goto("create");
  $("#src-name").textContent = d.label;
  loadImageFromUrl(artworkUrl(d.src), { id: d.src });
}
function deleteDraft(d){
  if (!confirm(`Delete ${d.label}?`)) return;
  state.drafts = state.drafts.filter(x => x.id !== d.id);
  if (state.editingDraftId === d.id) state.editingDraftId = null;
  saveDrafts();
  renderSaved();
}

/* =============================================================
   EXPORT — PNG or MOV
   MOV: H.264 video container (.mov extension). MediaRecorder
   produces MP4-with-H.264 in most modern browsers, which is
   container-compatible with QuickTime; we save it with a .mov
   extension so QuickTime/Finder treats it as such. Falls back
   to WebM only on browsers without H.264 support.
   ============================================================= */
let pendingExport = null;
function openExportModal(d){
  pendingExport = d;
  if (!d.hasAnim) { exportPng(d); return; }
  $("#export-modal").classList.add("open");
}
$("#export-cancel").addEventListener("click", () => $("#export-modal").classList.remove("open"));
$$('#export-modal [data-export]').forEach(b => {
  b.addEventListener("click", () => {
    const kind = b.dataset.export;
    $("#export-modal").classList.remove("open");
    if (!pendingExport) return;
    if (kind === "png") exportPng(pendingExport);
    else exportVideo(pendingExport);
  });
});

function exportPng(d){
  toast("Rendering PNG…");
  renderDraftToCanvas(d, false).then(canvas => {
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url; a.download = `${(d.label||"untitled").replace(/\s+/g,'_')}.png`;
    document.body.appendChild(a); a.click(); a.remove();
    toast("Exported PNG");
  }).catch(()=> toast("PNG export failed"));
}

let offscreenAnim = null;
function stopOffscreenAnim(){ if (offscreenAnim) { cancelAnimationFrame(offscreenAnim); offscreenAnim = null; } }

async function exportVideo(d){
  toast("Recording 5 seconds…");
  let canvas;
  try { canvas = await renderDraftToCanvas(d, true); }
  catch(_) { toast("Video export failed"); return; }
  if (!canvas.captureStream) { toast("Browser doesn't support video capture"); return; }
  // Prefer QuickTime / H.264 codecs; fall back to WebM if necessary.
  let mime = null;
  const candidates = [
    "video/quicktime",
    "video/mp4;codecs=h264",
    "video/mp4;codecs=avc1",
    "video/mp4",
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm"
  ];
  for (const m of candidates) {
    if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) { mime = m; break; }
  }
  const stream = canvas.captureStream(30);
  let recorder;
  try { recorder = new MediaRecorder(stream, mime ? { mimeType: mime, videoBitsPerSecond: 5000000 } : undefined); }
  catch(e) { toast("Video recording not supported here."); return; }
  const chunks = [];
  recorder.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
  recorder.onstop = () => {
    stopOffscreenAnim();
    const recordedMime = recorder.mimeType || mime || "video/webm";
    // H.264 video saved as .mov; vp8/vp9 webm saved as .webm.
    const isMovish = recordedMime.includes("mp4") || recordedMime.includes("quicktime");
    const outputType = isMovish ? "video/quicktime" : "video/webm";
    const ext = isMovish ? "mov" : "webm";
    const blob = new Blob(chunks, { type: outputType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${(d.label||"untitled").replace(/\s+/g,'_')}.${ext}`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    toast(isMovish ? "Exported MOV" : "Exported WebM (MOV not supported here)");
  };
  recorder.start();
  setTimeout(() => recorder.stop(), 5000);
}

async function renderDraftToCanvas(d, animate){
  const url = artworkUrl(d.src);
  let img;
  try { img = await loadImage(url); }
  catch(_) {
    try { img = await loadImage(artworkUrlSmall(d.src)); }
    catch(_) { throw new Error("image"); }
  }
  const result = buildGridFor(img, d.params);
  if (!result) throw new Error("grid");
  const cols = result.cols, rows = result.rows;
  const cells = result.cells;
  const c = document.createElement("canvas");
  const W = 1280;
  const cellAspect = 0.55;
  c.width = W;
  c.height = Math.round(W / ((cols*cellAspect)/rows));
  const ctx = c.getContext("2d");
  const cellW = c.width / cols;
  const cellH = c.height / rows;
  const fontSize = Math.max(4, cellH * 1.05);

  function drawFrame(){
    // Text is woven into `cells` by buildGridFor; no separate overlay.
    ctx.fillStyle = "#fff"; ctx.fillRect(0,0,c.width,c.height);
    ctx.font = `${fontSize}px "JetBrains Mono", Menlo, Consolas, monospace`;
    ctx.textBaseline = "top";
    for (let y=0; y<rows; y++) {
      for (let x=0; x<cols; x++) {
        const cell = cells[y*cols + x];
        if (cell.ch === " ") continue;
        ctx.fillStyle = cell.color;
        ctx.fillText(cell.ch, x*cellW + cell.ox, y*cellH + cell.oy);
      }
    }
  }
  drawFrame();
  if (animate) {
    const SPRING = 0.10, DAMP = 0.86, KICK_FRAC_MAX = 0.18;
    const animSpeed = d.params.animSpeed || 0;
    function tick(){
      offscreenAnim = requestAnimationFrame(tick);
      if (animSpeed > 0) {
        const intensity = animSpeed / 100;
        const maxOffset = cellH * 1.4;
        const kickCount = Math.max(1, Math.floor(cells.length * KICK_FRAC_MAX * intensity));
        for (let i=0; i<kickCount; i++) {
          const idx = Math.floor(Math.random()*cells.length);
          const cl = cells[idx];
          const a = Math.random()*Math.PI*2;
          const s = (1.5 + Math.random()*4.5)*intensity;
          cl.vx += Math.cos(a)*s; cl.vy += Math.sin(a)*s;
        }
        for (let i=0; i<cells.length; i++) {
          const cl = cells[i];
          cl.vx += -cl.ox * SPRING; cl.vy += -cl.oy * SPRING;
          cl.vx *= DAMP; cl.vy *= DAMP;
          cl.ox = clamp(cl.ox + cl.vx, -maxOffset, maxOffset);
          cl.oy = clamp(cl.oy + cl.vy, -maxOffset, maxOffset);
        }
      }
      drawFrame();
    }
    offscreenAnim = requestAnimationFrame(tick);
  }
  return c;
}

/* =============================================================
   ABOUT page — wave-to-ASCII transition
   - Uses the tall textile 338258, pre-rotated 90° so it reads
     sideways in the wide horizontal canvas.
   - Each cell crosses from "image" to "ASCII" individually
     based on a noisy threshold, so the boundary looks like an
     organic dissolving wave rather than a scanner line.
   - No white fade band — converted cells get a thin per-cell
     wash matching their pixel color, so the transition is
     seamless.
   ============================================================= */
const aboutState = {
  rafId: null,
  cells: null,
  cols: 0, rows: 0,
  cellW: 0, cellH: 0,
  fontSize: 0,
  source: null,            // pre-rotated landscape canvas
  noise: null,             // per-cell noise array (0..1)
  waveX: 0,
  paused: false,
  startTime: 0,
  lastTick: 0
};

function fitWaveCanvas(){
  const canvas = $("#wave-canvas");
  if (!canvas) return;
  const wrap = canvas.parentElement;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cssW = wrap.clientWidth;
  const cssH = Math.max(220, Math.round(cssW / 3.0)); // wider, lower band
  canvas.style.width = cssW + "px";
  canvas.style.height = cssH + "px";
  canvas.width  = Math.max(1, Math.floor(cssW * dpr));
  canvas.height = Math.max(1, Math.floor(cssH * dpr));
}

/* Pre-rotate a portrait image 90° so it becomes landscape. */
function rotateImageSideways(img){
  const c = document.createElement("canvas");
  c.width  = img.naturalHeight;
  c.height = img.naturalWidth;
  const cx = c.getContext("2d");
  cx.translate(c.width / 2, c.height / 2);
  cx.rotate(Math.PI / 2);
  cx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
  return c;
}

/* IntersectionObserver — toggles .in-view on each About section based
   on whether it's currently in the viewport. Removing the class on
   leave means the staggered fade-up reveals replay every time a
   section scrolls back into view. */
let aboutIO = null;
function setupAboutReveals(){
  if (aboutIO) return;
  const sections = $$("#page-about .about-section");
  if (!sections.length) return;
  aboutIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        requestAnimationFrame(() => e.target.classList.add("in-view"));
      } else {
        e.target.classList.remove("in-view");
      }
    });
  }, {
    root: $("#page-about"),
    threshold: 0.18
  });
  sections.forEach(s => aboutIO.observe(s));
}

async function startAboutWave(){
  const canvas = $("#wave-canvas");
  if (!canvas) return;

  // Reset state for a clean replay each time the user enters About.
  const aboutPage = $("#page-about");
  if (aboutPage) aboutPage.scrollTop = 0;
  const sections = $$("#page-about .about-section");
  sections.forEach(s => s.classList.remove("in-view"));

  // Force a synchronous layout/reflow so the browser commits the
  // "hidden" state before we add `.in-view` again. Without this, the
  // remove + add can collapse into a single frame and the animation
  // either doesn't restart or starts mid-state, which reads as a
  // glitch on first arrival.
  if (aboutPage) void aboutPage.offsetWidth;

  setupAboutReveals();

  // One RAF after the reflow → the hidden frame has painted; flipping
  // to `.in-view` here triggers the keyframe animation cleanly.
  requestAnimationFrame(() => {
    if (sections[0]) sections[0].classList.add("in-view");
  });

  fitWaveCanvas();

  // Use the tall narrow Landis textile rotated sideways.
  const id = "338258_d5db6774c862aa48";
  let img;
  try { img = await loadImage(artworkUrl(id)); }
  catch(_) {
    try { img = await loadImage(artworkUrlSmall(id)); }
    catch(_) { return; }
  }
  const source = rotateImageSideways(img);

  // Build ASCII grid from the rotated image so cells line up
  // with how it's displayed on the canvas.
  const result = buildGridFor(source, {
    detail: 240, brightness: 0, contrast: 0,
    saturation: 30, hue: 0, invert: false,
    charset: "standard"
  });
  if (!result) return;

  aboutState.cells = result.cells;
  aboutState.cols  = result.cols;
  aboutState.rows  = result.rows;
  aboutState.source = source;
  aboutState.cellW = canvas.width / result.cols;
  aboutState.cellH = canvas.height / result.rows;
  aboutState.fontSize = Math.max(4, aboutState.cellH * 1.05);

  // Pre-compute per-cell noise once. Used to scatter when each cell
  // transitions, giving the boundary a soft organic shape instead
  // of a hard vertical line.
  const total = result.cols * result.rows;
  const noise = new Float32Array(total);
  for (let i = 0; i < total; i++) noise[i] = Math.random();
  aboutState.noise = noise;

  aboutState.waveX = -200;
  aboutState.paused = false;
  aboutState.startTime = 0;
  aboutState.lastTick = 0;

  if (aboutState.rafId) cancelAnimationFrame(aboutState.rafId);
  aboutState.rafId = requestAnimationFrame(stepAboutWave);
}

function stepAboutWave(t){
  aboutState.rafId = requestAnimationFrame(stepAboutWave);
  const canvas = $("#wave-canvas");
  if (!canvas) return;
  if (!aboutState.startTime) aboutState.startTime = t;

  // Seamless loop: wave oscillates back and forth using a smooth
  // cosine driver. Forward sweep dissolves the textile into ASCII;
  // reverse sweep dissolves the ASCII back into the textile. No
  // pauses or hard resets — the motion never breaks.
  const period = 14000; // ms for one complete cycle (forward + back)
  const W = canvas.width;
  const band = Math.max(80, aboutState.cellW * 14);
  const phase = ((t - aboutState.startTime) % period) / period;       // 0..1
  const eased = (1 - Math.cos(phase * Math.PI * 2)) / 2;              // 0..1..0
  aboutState.waveX = eased * (W + band * 2) - band;

  paintAboutWave(t);
}

function paintAboutWave(t){
  const canvas = $("#wave-canvas");
  if (!canvas || !aboutState.cells) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  const wave = aboutState.waveX;

  // Base layer: the rotated textile
  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(aboutState.source, 0, 0, W, H);

  ctx.font = `${aboutState.fontSize}px "JetBrains Mono", Menlo, Consolas, monospace`;
  ctx.textBaseline = "top";

  const cellW = aboutState.cellW;
  const cellH = aboutState.cellH;
  const cols  = aboutState.cols;
  const rows  = aboutState.rows;
  const noise = aboutState.noise;

  // Width of the dissolving band (in canvas pixels)
  const band = Math.max(80, cellW * 14);

  // Organic per-row drift: each row's wave is offset by a slow sine
  // so the boundary undulates instead of running as a straight line.
  const time = (t || 0) * 0.001;

  for (let y = 0; y < rows; y++) {
    const rowSine = Math.sin(y * 0.18 + time * 1.8) * (band * 0.35);
    const rowWave = wave + rowSine;

    for (let x = 0; x < cols; x++) {
      const cellCenter = x * cellW + cellW * 0.5;
      // Each cell flips earlier or later within the band based on noise.
      const localOffset = (noise[y * cols + x] - 0.5) * band;
      const cellWave = rowWave + localOffset;
      if (cellCenter > cellWave) continue; // image still showing

      const cell = aboutState.cells[y * cols + x];
      // Per-cell wash in the cell's own color (tinted lighter) — this
      // gives a seamless feel; no white scanner band.
      ctx.fillStyle = lightenColor(cell.color, 0.78);
      ctx.fillRect(x * cellW - 0.5, y * cellH - 0.5, cellW + 1, cellH + 1);

      if (cell.ch === " ") continue;
      ctx.fillStyle = cell.color;
      ctx.fillText(cell.ch, x * cellW, y * cellH);
    }
  }
}

/* lighten "rgb(r,g,b)" toward white by amount in [0,1] */
function lightenColor(rgb, amount){
  const m = rgb.match(/rgb\((\d+),(\d+),(\d+)\)/);
  if (!m) return rgb;
  const r = +m[1], g = +m[2], b = +m[3];
  const lr = Math.round(r + (255 - r) * amount);
  const lg = Math.round(g + (255 - g) * amount);
  const lb = Math.round(b + (255 - b) * amount);
  return `rgb(${lr},${lg},${lb})`;
}

function stopAboutWave(){
  if (aboutState.rafId) cancelAnimationFrame(aboutState.rafId);
  aboutState.rafId = null;
}

window.addEventListener("resize", () => {
  if ($("#page-about").classList.contains("active")) {
    fitWaveCanvas();
    if (aboutState.source) {
      const canvas = $("#wave-canvas");
      aboutState.cellW = canvas.width / aboutState.cols;
      aboutState.cellH = canvas.height / aboutState.rows;
      aboutState.fontSize = Math.max(4, aboutState.cellH * 1.05);
    }
  }
});

/* =============================================================
   BOOT
   ============================================================= */
loadDrafts();
renderGallery();
syncControlsFromState();
// initial body class — Color Decoded is the landing page
document.body.classList.add("on-home");
