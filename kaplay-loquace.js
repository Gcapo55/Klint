function D() {
  return {
    loquace: {
      config: x,
      init: R,
      characters: T,
      script: Z,
      registerCommand: v,
      start: b,
      next: f,
      parse: B,
      clear: w,
      pop: P,
      choix: choix,
      vn: N
    }
  };
}
const p = {};
let A = {}, m, d = 0;
const x = {
  showNextPrompt: !0,
  // Default values for pop dialog
  pop: {
    position: "topleft",
    sideImage: {
      options: {
        // For the sprite object
        width: 60
      }
    },
    textBox: {
      width: 450,
      margin: 20,
      // FIXME: Should this also be an object with top, right, bottom, left ?
      padding: {
        top: 15,
        right: 20,
        bottom: 15,
        left: 20
      },
      options: {
        // For the rect object
        radius: 15
      }
    },
    dialogText: {
      offsetX: 1,
      options: {
        // For the text object
        size: 20,
        letterSpacing: 10,
        lineSpacing: 10,
        width: 350
      }
    },
    nextPrompt: {
      name: "right-arrow",
      options: {
        width: 20
      }
    },
    doTween: !0
  },
  // Default values for vn dialog
  vn: {
    sideImage: {
      options: {
        // For the sprite object
        width: 120
      }
    },
    textBox: {
      margin: 20,
      // FIXME: Should this also be an object with top, right, bottom, left ?
      padding: {
        top: 15,
        right: 20,
        bottom: 15,
        left: 20
      },
      options: {
        // For the rect object
        radius: 15
      }
    },
    dialogText: {
      offsetX: 1,
      options: {
        // For the text object
        size: 20,
        letterSpacing: 0,
        lineSpacing: 10
        // width: Calculated dynamically for full width
      }
    },
    nextPrompt: {
      name: "right-arrow",
      options: {
        width: 20
      }
    },
    doTween: !0
  },
  // Default values for choix dialog
  choix: {
    width: 400,
    margin: 20,
    padding: {
      top: 15,
      right: 20,
      bottom: 15,
      left: 20
    },
    gap: 12,
    options: {
      // For the outer rect
      radius: 15
    },
    buttonOptions: {
      // For each choice button rect
      radius: 10
    },
    textOptions: {
      // For choice label text
      size: 20,
      letterSpacing: 0,
      lineSpacing: 8
    },
    colors: {
      background: null,    // null → WHITE
      button: null,        // null → a light blue  rgb(100,160,220)
      buttonHover: null,   // null → a darker blue rgb(60,120,180)
      text: null,          // null → WHITE
      textHover: null      // null → WHITE
    },
    doTween: !0
  }
}, u = {
  // Built-in commands (can be overloaded)
  enableNextPrompt: null,
  // Change showNextPrompt property to display next prompt
  disableNextPrompt: null
  // Change showNextPrompt property to hide next prompt
};
p.narrator = {
  dialogType: "vn"
};
function R(e) {
  Object.assign(x, e), M();
}
function M() {
  loadSprite(
    "right-arrow",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAFEmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL1Bob3Rvc2hvcC8xLjAvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMTAtMjBUMTE6MTA6NTArMDIwMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMTAtMjFUMDk6NTg6NTYrMDI6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMTAtMjFUMDk6NTg6NTYrMDI6MDAiCiAgIHBob3Rvc2hvcDpEYXRlQ3JlYXRlZD0iMjAyNC0xMC0yMFQxMToxMDo1MCswMjAwIgogICBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIgogICBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIyMCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjIwIgogICBleGlmOkNvbG9yU3BhY2U9IjEiCiAgIHRpZmY6SW1hZ2VXaWR0aD0iMjAiCiAgIHRpZmY6SW1hZ2VMZW5ndGg9IjIwIgogICB0aWZmOlJlc29sdXRpb25Vbml0PSIyIgogICB0aWZmOlhSZXNvbHV0aW9uPSI3Mi8xIgogICB0aWZmOllSZXNvbHV0aW9uPSI3Mi8xIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0icHJvZHVjZWQiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFmZmluaXR5IFBob3RvIDIgMi41LjIiCiAgICAgIHN0RXZ0OndoZW49IjIwMjQtMTAtMjFUMDk6NTg6NTYrMDI6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0iciI/Pn/5LRsAAAGAaUNDUHNSR0IgSUVDNjE5NjYtMi4xAAAokXWRz0tCQRDHP1phqGFQhw4dpKyTRRlEXYKUsEBCzCCriz5/BWqP94yIrkFXoSDq0q9D/QV1DToHQVEE0blzUZeS17wUlMhZZuez390ZdmfBGs0peb15CPKFohYJ+t0LsUW37RU7NhyM0RtXdHUyHA7R0D4fsJjxbsCs1fjcv+ZIpnQFLK3CE4qqFYWnhUPrRdXkXeFOJRtPCp8LezW5oPC9qScq/GpypsLfJmvRSACs7cLuTB0n6ljJanlheTmefG5Nqd7HfIkzVZifk9gj3o1OhCB+3MwwRYBRhhmXeZQBfAzKigb5Q7/5s6xKriKzygYaK2TIUsQr6ppUT0lMi56SkWPD7P/fvurpEV+lutMPLS+G8d4Hth0olwzj69gwyifQ9AxXhVr+6hGMfYheqmmeQ3BtwcV1TUvsweU2dD2pcS3+KzWJW9NpeDuDthh03IJ9qdKz6j6njxDdlK+6gf0D6JfzruUfgfln8vsju8EAAAAJcEhZcwAACxMAAAsTAQCanBgAAAB2SURBVDiNtdVRDoAgDANQ5v3vDD9KNoajlNHEL+BpUhZLwVPfJ4xsYNC5BwRXL6BB/WVTVKJFcL+MG3axL1NUg2hBIcqWYhCNn4IOzQANmgX2ZIG9nAzQNH0Kumtz5WKPiwgajh4SPU2/GAMuz7KlMHPvAv0CGp6cGRkB3yELAAAAAElFTkSuQmCC"
  );
}
function T(e) {
  Object.assign(p, e);
}
function Z(e, o = !0) {
  Array.isArray(e) ? (m = e, d = 0, o && f()) : Object.assign(A, e);
}
function v(e, o) {
  u[e] = o;
}
function b(e, o = !0) {
  m = A[e], d = 0, o && f();
}
function f() {
  if (!m) return !1;
  if (d > m.length - 1)
    return w(), !1;
  w();
  const e = B(m[d], !1);
  return d++, C(e.commands), y(e), !0;
}
function B(e, o = !0) {
  const t = {
    originalStatement: e,
    statement: "",
    commands: []
  };
  return S(t), G(t), W(t), o && (C(t), y(t)), t;
}
function S(e) {
  const o = e.originalStatement;
  return Array.isArray(o) ? e.statement = choose(o) : typeof o == "object" ? e.statement = o.statement : e.statement = o, e;
}
function G(e) {
  let o;
  for (; (o = e.statement.match(/^(\w+)/)) && Object.keys(u).includes(o[1]); )
    e.commands.push(o[1]), e.statement = e.statement.replace(/^\w+\s*/, "");
}
function W(e) {
  if (e.statement === "") return;
  const o = e.statement.match(/^(\w+):(\S+)\s/);
  if (o && (e.who = o[1], e.expression = o[2], e.statement = e.statement.replace(
    /^(\w+):(\S+)\s*/,
    ""
  )), e.who === void 0) {
    for (const t in p)
      if (e.statement.startsWith(t + " ")) {
        e.who = t, p[e.who].defaultExpression && (e.expression = p[e.who].defaultExpression), e.statement = e.statement.replace(t + " ", "");
        break;
      }
  }
  if (e.who === void 0 && (e.who = "narrator"), e.expression !== void 0 && !p[e.who].expressions[e.expression])
    throw new Error(
      `Expression "${e.expression}" not found for character "${e.who}"`
    );
  e.sideImage = e.expression ? p[e.who].expressions[e.expression] : void 0;
}
function C(e) {
  e.forEach((o) => {
    typeof u[o] == "function" && u[o](), o === "enableNextPrompt" && (x.showNextPrompt = !0), o === "disableNextPrompt" && (x.showNextPrompt = !1);
  });
}
function y(e) {
  if (e.statement !== "")
    switch (p[e.who].dialogType) {
      case "vn":
        N(
          e.statement,
          c(
            x.vn,
            {
              name: p[e.who].name,
              sideImage: { name: e.sideImage }
            },
            p[e.who].dialogOptions || {}
          )
        );
        break;
      default:
        P(
          e.statement,
          c(
            x.pop,
            {
              name: p[e.who].name,
              position: p[e.who].position ? p[e.who].position : x.pop.position,
              // NOTE: Optional shorthand for dialogOptions.position
              sideImage: { name: e.sideImage }
            },
            p[e.who].dialogOptions || {}
          )
        );
    }
}
function w() {
  get("loquaceDialog").forEach((e) => {
    e.is("persistent") || tween(
      e.opacity,
      0,
      0.5,
      (o) => {
        e.opacity = o, e.children.forEach((t) => t.opacity = o);
      },
      easings.easeOutQuad
    ).onEnd(() => e.destroy());
  });
}
function P(e, o = {}) {
  var I;
  const t = c(x.pop, o), s = t.dialogText.options.size + t.textBox.padding.top + t.textBox.padding.bottom;
  let n, i, a;
  switch (t.position) {
    case "topleft":
      n = t.textBox.margin, i = t.textBox.margin, a = -s;
      break;
    case "top":
      n = (width() - t.textBox.width) / 2, i = t.textBox.margin, a = -s;
      break;
    case "topright":
      n = width() - t.textBox.width - t.textBox.margin, i = t.textBox.margin, a = -s;
      break;
    case "left":
      n = t.textBox.margin, i = height() / 2, a = i;
      break;
    case "center":
      n = (width() - t.textBox.width) / 2, i = height() / 2, a = i;
      break;
    case "right":
      n = width() - t.textBox.width - t.textBox.margin, i = height() / 2, a = i;
      break;
    case "botleft":
      n = t.textBox.margin, i = height() - t.textBox.margin, a = height() + s;
      break;
    case "bot":
      n = (width() - t.textBox.width) / 2, i = height() - t.textBox.margin, a = height() + s;
      break;
    case "botright":
      n = width() - t.textBox.width - t.textBox.margin, i = height() - t.textBox.margin, a = height() + s;
      break;
    default:
      n = t.textBox.margin, i = t.textBox.margin, a = -s;
  }
  const r = add([
    rect(t.textBox.width, s, t.textBox.options),
    color(t.textBox.color ? Object.values(t.textBox.color) : WHITE),
    pos(n, a),
    opacity(t.doTween ? 0 : 1),
    "loquaceDialog"
  ]);
  t.persistent && r.tag("persistent"), t.sideImage.name && r.add([
    sprite(t.sideImage.name, t.sideImage.options),
    pos(-t.textBox.padding.top, -t.textBox.padding.left),
    opacity(1)
  ]);
  const h = r.add([
    text(e, t.dialogText.options),
    color(t.dialogText.color ? Object.values(t.dialogText.color) : BLACK),
    pos(
      t.sideImage.name ? t.sideImage.options.width : t.textBox.padding.left,
      t.textBox.padding.top + t.dialogText.offsetX
    ),
    opacity(1)
  ]);
  r.height = h.height + t.textBox.padding.top + t.textBox.padding.bottom, (t.showNextPrompt !== void 0 ? t.showNextPrompt : x.showNextPrompt) && r.add([
    sprite(t.nextPrompt.name, t.nextPrompt.options),
    pos(
      t.textBox.width - t.textBox.padding.right - t.nextPrompt.options.width / 2,
      r.height - t.textBox.padding.bottom - t.nextPrompt.options.width / 2
    ),
    anchor("center"),
    opacity(1),
    animate()
  ]).animate("scale", [vec2(1.2), vec2(1)], {
    duration: 0.5,
    direction: "ping-pong"
  });
  let g = 0;
  return (I = t.position) != null && I.includes("bot") ? g = 1 : (t.position === "left" || t.position === "center" || t.position === "right") && (g = 0.5), t.doTween ? (tween(
    r.pos.y,
    i - r.height * g,
    0.5,
    (l) => r.pos.y = l,
    easings.easeOutQuad
  ), tween(
    r.opacity,
    1,
    0.5,
    (l) => r.opacity = l,
    easings.easeOutQuad
  )) : r.pos.y = i - r.height * g, r;
}
function N(e, o = {}) {
  var h;
  const t = c(x.vn, o), s = (h = o.sideImage) != null && h.name ? t.textBox.margin + t.sideImage.options.width : 0, n = t.dialogText.options.size + t.textBox.padding.top + t.textBox.padding.bottom, i = add([
    rect(
      width() - 2 * t.textBox.margin - s,
      n,
      t.textBox.options
    ),
    color(t.textBox.color ? Object.values(t.textBox.color) : WHITE),
    pos(
      s + t.textBox.margin,
      t.doTween ? height() + n : height() - t.textBox.margin - n
    ),
    opacity(t.doTween ? 0 : 1),
    "loquaceDialog"
  ]);
  t.persistent && i.tag("persistent");
  let a;
  t.sideImage.name && (a = i.add([
    sprite(t.sideImage.name, t.sideImage.options),
    pos(
      -t.sideImage.options.width - t.textBox.margin,
      -t.sideImage.options.width + n
    ),
    opacity(1)
  ])), t.dialogText.options.width = i.width - t.textBox.padding.left - 2 * t.textBox.padding.right - t.nextPrompt.options.width;
  const r = i.add([
    text(e, t.dialogText.options),
    color(t.dialogText.color ? Object.values(t.dialogText.color) : BLACK),
    pos(
      t.textBox.padding.left,
      t.textBox.padding.top + t.dialogText.offsetX
    ),
    opacity(1)
  ]);
  return i.height = r.height + t.textBox.padding.top + t.textBox.padding.bottom, t.sideImage.name && (a.pos.y = -t.sideImage.options.width + i.height), (t.showNextPrompt !== void 0 ? t.showNextPrompt : x.showNextPrompt) && i.add([
    sprite(t.nextPrompt.name, t.nextPrompt.options),
    pos(
      width() - 2 * t.textBox.margin - s - t.textBox.padding.right - t.nextPrompt.options.width / 2,
      i.height - t.textBox.padding.bottom - t.nextPrompt.options.width / 2
    ),
    anchor("center"),
    opacity(1),
    animate()
  ]).animate("scale", [vec2(1.2), vec2(1)], {
    duration: 0.5,
    direction: "ping-pong"
  }), t.doTween ? (tween(
    i.pos.y,
    height() - t.textBox.margin - i.height,
    0.5,
    (g) => i.pos.y = g,
    easings.easeOutQuad
  ), tween(
    i.opacity,
    1,
    0.5,
    (g) => i.opacity = g,
    easings.easeOutQuad
  )) : i.pos.y = height() - t.textBox.margin - i.height, i;
}

//--------IMPORTANT-------
// La fonction ci-dessous a été générée par Claude (version free).
// Sa tâche était de générer une fonction utilisable avec loquace qui permettrait à l'utilisateur de séléctionner une réponse à l'aide de son clavier.
// Claude a reçu ce document en pièce jointe dans lequel il a directement inseré la fonction.
// Certains détails ont par la suite été modifiés par mes soins.

/**
 * @param {Array<{ label: string, onSelect: function }>} choices
 *   Liste des options proposées au joueur. Chaque entrée doit avoir :
 *     - label     : texte affiché sur le bouton
 *     - onSelect  : callback appelé quand le joueur confirme ce choix
 *
 * @param {object} [opts={}]
 *   Options de surcharge (fusionnées avec x.choix par deep-merge) :
 *     - width          : largeur du panneau
 *     - margin         : marge extérieure
 *     - padding        : { top, right, bottom, left }
 *     - gap            : espace vertical entre les boutons
 *     - options        : options du rect de fond (ex: { radius })
 *     - buttonOptions  : options des rects de bouton (ex: { radius })
 *     - textOptions    : options du texte (ex: { size, letterSpacing })
 *     - colors         : { background, button, buttonHover, text, textHover }
 *     - doTween        : true/false
 *
 * @returns {GameObj} Le game object racine du panneau (tag "loquaceDialog").
 *
 * Usage minimal :
 *   choix([
 *     { label: "Oui, je suis partant !", onSelect: () => loquace.start("brancheOui") },
 *     { label: "Non, laisse-moi tranquille.", onSelect: () => loquace.start("brancheNon") }
 *   ]);
 *
 * Usage avec options :
 *   choix([...], { width: 500, colors: { button: { r: 80, g: 160, b: 80 } } });
 */
function choix(choices, opts = {width: 1000}) {
  const t = c(x.choix, opts);

  // Couleurs par défaut
  const bgColor  = t.colors && t.colors.background  ? Object.values(t.colors.background)  : [255, 255, 255];
  const btnColor = t.colors && t.colors.button       ? Object.values(t.colors.button)       : [100, 160, 220];
  const btnHover = t.colors && t.colors.buttonHover  ? Object.values(t.colors.buttonHover)  : [60,  120, 180];
  const txtColor = t.colors && t.colors.text         ? Object.values(t.colors.text)         : [255, 255, 255];

  // La flèche de sélection reprend la même couleur que le texte (blanc par défaut)
  const arrowColor = txtColor;

  // Largeur réservée à la flèche (sprite "right-arrow" + marge)
  const arrowW = (t.nextPrompt && t.nextPrompt.options && t.nextPrompt.options.width)
    ? t.nextPrompt.options.width
    : 20;
  const arrowMargin = 20; // espace entre la flèche et le texte

  // Largeur utile du texte à l'intérieur d'un bouton (on réserve la place de la flèche à gauche)
  const innerTextWidth = t.width - t.padding.left - t.padding.right - arrowW - arrowMargin;

  // ── Pré-calculer la hauteur de chaque bouton ──────────────────────────────
  const buttonHeights = choices.map((ch) => {
    const probe = add([
      text(ch.label, { ...t.textOptions, width: innerTextWidth }),
      pos(-9999, -9999),
      opacity(0)
    ]);
    const h = probe.height + t.padding.top + t.padding.bottom;
    probe.destroy();
    return h;
  });

  // ── Hauteur totale du panneau ──────────────────────────────────────────────
  const totalBtnHeight = buttonHeights.reduce((acc, h) => acc + h, 0);
  const panelHeight = t.padding.top + totalBtnHeight + t.gap * (choices.length - 1) + t.padding.bottom;
  const panelWidth  = t.width;

  // Position en bas de l'écran (comme les boîtes vn)
  const margin = t.margin ?? 20;
  const panelX = (width() - panelWidth) / 2;
  const panelY = height() - margin - panelHeight;

  // ── Panneau racine ─────────────────────────────────────────────────────────
  const panel = add([
    rect(panelWidth, panelHeight, t.options),
    color(...bgColor),
    pos(panelX, t.doTween ? height() + panelHeight : panelY),
    opacity(t.doTween ? 0 : 1),
    "loquaceDialog",
    "loquaceChoix"
  ]);

  // ── Boutons ────────────────────────────────────────────────────────────────
  let cursorY = t.padding.top;
  const btns = [];   // refs vers les GameObj bouton
  const arrows = []; // refs vers les GameObj flèche de sélection

  choices.forEach((ch, idx) => {
    const btnH = buttonHeights[idx];
    const btnW = panelWidth - t.padding.left - t.padding.right;

    const btn = panel.add([
      rect(btnW, btnH, t.buttonOptions),
      color(...btnColor),
      pos(t.padding.left, cursorY),
      opacity(1),
      "loquaceChoixBtn"
    ]);
    btns.push(btn);

    // ── Flèche de sélection (sprite right-arrow, cachée par défaut) ──────────
    const arrowObj = btn.add([
      sprite(
        (t.nextPrompt && t.nextPrompt.name) ? t.nextPrompt.name : "right-arrow",
        { width: arrowW }
      ),
      pos(
        t.padding.left,
        (btnH - arrowW) / 2   // centré verticalement dans le bouton
      ),
      color(...arrowColor),
      opacity(0),              // invisible jusqu'à la sélection
      anchor("topleft"),
      animate()
    ]);
    arrows.push(arrowObj);

    // ── Texte du choix (décalé pour laisser la place à la flèche) ────────────
    btn.add([
      text(ch.label, { ...t.textOptions, width: innerTextWidth }),
      color(...txtColor),
      pos(t.padding.left + arrowW + arrowMargin, t.padding.top),
      opacity(1)
    ]);

    cursorY += btnH + t.gap;
  });

  // ── Gestion du curseur clavier ─────────────────────────────────────────────
  let selectedIdx = 0;

  // Applique visuellement la sélection sur l'index donné
  function applySelection(newIdx) {
    // Réinitialise l'ancien bouton
    btns[selectedIdx].color = rgb(...btnColor);
    arrows[selectedIdx].opacity = 0;
    arrows[selectedIdx].paused  = true;

    selectedIdx = newIdx;

    // Met en valeur le nouveau bouton sélectionné
    btns[selectedIdx].color = rgb(...btnHover);
    arrows[selectedIdx].opacity = 1;
    arrows[selectedIdx].paused  = false;
    arrows[selectedIdx].animate(
      "scale",
      [vec2(1.2), vec2(1)],
      { duration: 0.5, direction: "ping-pong" }
    );
  }

  // Sélection initiale
  applySelection(0);

  // ── Gestionnaires clavier (actifs seulement quand le panel existe) ─────────
  const evDown = onKeyPress("down", () => {
    if (!panel.exists()) return;
    applySelection((selectedIdx + 1) % choices.length);
  });

  const evUp = onKeyPress("up", () => {
    if (!panel.exists()) return;
    applySelection((selectedIdx - 1 + choices.length) % choices.length);
  });

  const evEnter = onKeyPress("enter", () => {
    if (!panel.exists()) return;
    const chosen = choices[selectedIdx];
    // Désinscription des écouteurs clavier
    evDown.cancel();
    evUp.cancel();
    evEnter.cancel();
    // Tween de sortie puis destruction et callback
    if (t.doTween) {
      tween(panel.opacity, 0, 0, (v) => {
        panel.opacity = v;
        panel.children.forEach((child) => child.opacity = v);
      }, easings.easeOutQuad).onEnd(() => {
        panel.destroy();
        chosen.onSelect();
      });
    } else {
      panel.destroy();
      chosen.onSelect();
    }
  });

  // ── Animation d'entrée ────────────────────────────────────────────────────
  if (t.doTween) {
    tween(panel.pos.y, panelY, 0.5, (v) => panel.pos.y  = v, easings.easeOutQuad);
    tween(panel.opacity,   1,  0.5, (v) => panel.opacity = v, easings.easeOutQuad);
  }

  return panel;
}

/*!
 * Deep merge two or more objects or arrays.
 * (c) 2023 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param   {*} ...objs  The arrays or objects to merge
 * @returns {*}          The merged arrays or objects
 */
function c(...e) {
  function o(n) {
    return Object.prototype.toString.call(n).slice(8, -1).toLowerCase();
  }
  function t(n, i) {
    for (let [a, r] of Object.entries(i)) {
      let h = o(r);
      n[a] !== void 0 && o(n[a]) === h && ["array", "object"].includes(h) ? n[a] = c(n[a], r) : n[a] = structuredClone(r);
    }
  }
  let s = structuredClone(e.shift());
  for (let n of e) {
    let i = o(n);
    if (o(s) !== i) {
      s = structuredClone(n);
      continue;
    }
    i === "array" ? s = [...s, ...structuredClone(n)] : i === "object" ? t(s, n) : s = n;
  }
  return s;
}
export {
  T as characters,
  w as clear,
  x as config,
  R as init,
  D as loquacePlugin,
  f as next,
  B as parse,
  P as pop,
  v as registerCommand,
  Z as script,
  b as start,
  choix as choix,
  N as vn
};
//# sourceMappingURL=kaplay-loquace.js.map
