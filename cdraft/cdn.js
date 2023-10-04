"use strict";
const USERAGENT = "u1js (v1.1.20230821)",
  IMPLEMENTED = {
    U: [],
    Q: [],
    S: [],
    require: [],
    v: [],
    id: [],
    error: [],
    open: [],
    save: [],
    style: [],
    "<-": [],
    "U*": [],
    "U**": [],
    R: [],
    T: [],
    Tr: [],
    Td: [],
    Ti: [],
    Tn: [],
    Tc: [],
    c: [
      "txt",
      "doc",
      "file",
      "num",
      "dt",
      "time",
      "btn",
      "hold",
      "opt",
      "bin",
      "grid",
      "one",
      "win",
      "data",
      "dp",
    ],
    cap: [],
    i: [],
    tag: [],
    ef: [],
    tip: [],
    sx: [],
    sy: [],
    ctx: ["v", "df", "toggle"],
    in: [],
    keys: [],
    fcs: [],
    cls: [],
    on: [
      "v",
      "fcs",
      "fold",
      "sx",
      "sy",
      "xy",
      "wh",
      "whc",
      "k",
      "ku",
      "pd",
      "pu",
      "pc",
      "pcc",
      "p",
      "po",
      "md",
      "mu",
      "sw",
      "swh",
    ],
    max: [],
    min: [],
    step: [],
    unit: [],
    grp: [],
    df: [],
    fold: [],
    fmt: ["html", "md"],
    accepts: [],
    mod: [],
    plt: ["col", "xy", "line", "box", "ohlc"],
    axisx: ["cap", "v", "min", "max", "step", "unit"],
    axisy: ["cap", "v", "min", "max", "step", "unit"],
    x: [],
    err: [],
    "+v": [],
    "+v|": [],
    "+x": [],
    "+x|": [],
  };
(location.params = {}),
  location.search
    .substring(1)
    .split("&")
    .forEach(function (t) {
      var e = t.split("=");
      location.params[e[0]] = e[1];
    });
const MIMETYPES = {
  txt: "text/plain",
  csv: "text/csv",
  js: "text/js",
  css: "text/css",
  ics: "text/calendar",
  html: "text/html",
  xml: "text/xml",
  json: "application/json",
};
function addCSS(t) {
  document.head.appendChild(document.createElement("style")).innerHTML = t;
}
function urlInDocument(t, e, i) {
  for (var n = document.getElementsByTagName(t), o = 0; o < n.length; ++o)
    if (n[o][e] == i) return !0;
}
async function load(urls, callback, onerror, filetype) {
  var url, onload, fileref;
  if (
    (urls.constructor === Array
      ? ((url = urls[0]), (urls = urls.slice(1)))
      : ((url = urls), (urls = [])),
    (onload = urls.length
      ? function () {
          load(urls, callback, onerror, filetype);
        }
      : callback || function () {}),
    url && (url.endsWith(".js") || "js" === filetype))
  )
    urlInDocument("script", "src", url)
      ? onload()
      : ((fileref = document.createElement("script")),
        fileref.setAttribute("filetype", "text/javascript"),
        fileref.setAttribute("src", url));
  else {
    if (!url || (!url.endsWith(".css") && "css" !== filetype)) {
      try {
        eval(url);
      } catch (t) {
        console.warn("Adding as a style-sheet:\n" + url), addCSS(url);
      }
      return void onload();
    }
    urlInDocument("link", "href", url)
      ? onload()
      : ((fileref = document.createElement("link")),
        fileref.setAttribute("rel", "stylesheet"),
        fileref.setAttribute("filetype", "text/css"),
        fileref.setAttribute("href", url));
  }
  if (fileref) {
    (fileref.onreadystatechange = onload), (fileref.onload = onload);
    try {
      var urlo = new URL(url);
      fileref.onerror = function () {
        load(urlo.pathname.split("/").pop(), onload, onerror, filetype);
      };
    } catch (t) {
      fileref.onerror =
        onerror ||
        function (t) {
          console.error(t), onload();
        };
    }
    document.head.appendChild(fileref);
  }
}
function localTimestamp() {
  var t = new Date(),
    e = 60 * t.getTimezoneOffset();
  return +t / 1e3 - e;
}
function dateISO() {
  var t = new Date(1e3 * localTimestamp()),
    e = t.getTimezoneOffset(),
    i = e <= 0 ? "+" : "-";
  return (
    (e = Math.abs(e)),
    t.toJSON().substring(0, 23) +
      i +
      Math.floor(e / 60)
        .toString()
        .padStart(2, "0") +
      (e % 60).toString().padStart(2, "0")
  );
}
function createSVG(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function objectify(t) {
  var e = {};
  for (var i in t)
    "object" == typeof t[i] ? (e[i] = objectify(t[i])) : (e[i] = t[i]);
  return e;
}
function hiddenProp(t, e, i) {
  Object.defineProperty(t, e, { enumerable: !1, writable: !0, value: i });
}
function dragElement(t, e, i) {
  var n, o, r, s;
  const a = function (e) {
      (r += e.clientX - n),
        (s += e.clientY - o),
        (t.style.left = r),
        (t.style.top = s),
        (n = e.clientX),
        (o = e.clientY);
    },
    l = function () {
      document.removeEventListener("mousemove", a),
        document.removeEventListener("mouseup", l);
    };
  (e || t).addEventListener("mousedown", function (e) {
    0 !== e.button ||
      (i && e.target.classList.contains(i)) ||
      ((n = e.clientX),
      (o = e.clientY),
      (r = t.offsetLeft),
      (s = t.offsetTop),
      (t.style.left = r),
      (t.style.top = s),
      document.addEventListener("mousemove", a),
      document.addEventListener("mouseup", l));
  });
}
(Math.round2 = (t, e) => Math.round(t / e) * e),
  (HTMLElement.prototype._listen = function (t, e) {
    this._listeners || (this._listeners = {}),
      this.addEventListener(t, e),
      (this._listeners[t] = e);
  }),
  (HTMLElement.prototype._removeListeners = function () {
    if (this._listeners)
      for (var t in this._listeners)
        this.removeEventListener(t, this._listeners[t]);
  });
const pass = function () {};
var logline = pass;
function json(t) {
  return "string" == typeof t ? t : JSON.stringify(t);
}
function stopLog() {
  logline = pass;
}
function logToConsole() {
  logline = function (t) {
    console.log(json(t));
  };
}
function toggleLogging() {
  logline === pass ? logToConsole() : stopLog();
}
function gui(t) {
  t.constructor === Object &&
    ((t = gui.shortProp(t)), gui.rootContainer._update(t));
}
window.addEventListener("keydown", (t) => {
  t.ctrlKey && "|" === t.key && toggleLogging();
}),
  (gui.appEvent = function (t) {
    logline(t), gui(t);
  }),
  (gui.appEventJSON = function (t) {
    gui.appEvent(JSON.parse(t));
  }),
  (gui.REQUIRED = {
    "fmt:md": [
      "https://cdn.jsdelivr.net/npm/marked/marked.min.js",
      "gui.markdown=marked;",
    ],
    "c:file": [
      "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
      "gui.ZipArchive=JSZip;",
    ],
  }),
  (gui.LONGFORM = {
    state: "S",
    queue: "Q",
    update: "U",
    add: "A",
    class: "c",
    value: "v",
    time: "T",
    trigger: "Tr",
    timeDelay: "Td",
    timeInterval: "Ti",
    timingName: "Tn",
    timingCancel: "Tc",
    request: "R",
    updateChildren: "U*",
    updateDeep: "U**",
    move: "M",
    addTags: "Atag",
    async: "@",
    templates: "tem",
    caption: "cap",
    contextMenu: "ctx",
    scrollX: "sx",
    scrollY: "sy",
    index: "i",
    effect: "ef",
    affect: "af",
    reference: "ref",
    input: "in",
    onEvent: "on",
    throttle: "throt",
    focus: "fcs",
    keyShortcuts: "keys",
    movable: "mv",
    movableDeep: "mv*",
    deletable: "del",
    closeable: "cls",
    reorderable: "ro",
    goButton: "go",
    encrypt: "enc",
    markText: "mark",
    foldable: "fold",
    size: "wh",
    defaults: "df",
    logScale: "log",
    length: "len",
    optionGroup: "grp",
    holdGroup: "hgrp",
    modal: "mod",
    location: "xy",
    columns: "cols",
    headerRow: "head",
    hexGrid: "hex",
    format: "fmt",
    plotType: "plt",
    errorBar: "err",
    errorBarBottom: "err2",
    width: "w",
    height: "h",
    rotation: "rot",
    shape: "shp",
    opaque: "opq",
    scaleX: "x^",
    scaleY: "y^",
    direction: "dir",
    depth: "d",
    rotationX: "rx",
    rotationY: "ry",
    scaleZ: "z^",
    overlap: "ovr",
    frameset: "fs",
    frame: "f",
    "+frame": "+f",
    "+value": "+v",
    "+scrollX": "+sx",
    "+scrollY": "+sy",
    "+width": "+w",
    "+height": "+h",
    "+rotation": "+rot",
    "+scaleX": "+x^",
    "+scaleY": "+y^",
    "+frameOptions": "+f|",
    "+valueOptions": "+v|",
    "+scrollXOptions": "+sx|",
    "+scrollYOptions": "+sy|",
    "+xOptions": "+x|",
    "+yOptions": "+y|",
    "+widthOptions": "+w|",
    "+heightOptions": "+h|",
    "+rotationOptions": "+rot|",
    "+scaleXOptions": "+x^|",
    "+scaleYOptions": "+y^|",
    "+depth": "+d",
    "+rotationX": "+rx",
    "+rotationY": "+ry",
    "+scaleZ": "+z^",
    "+depthOptions": "+d|",
    "+zOptions": "+z|",
    "+rotationXOptions": "+rx|",
    "+rotationYOptions": "+ry|",
    "+scaleZOptions": "+z^|",
  }),
  (gui.TYPES = {}),
  (gui.NO_ATTR = new Set([
    "error",
    "style",
    "require",
    "open",
    "A",
    "Atag",
    "Q",
    "R",
    "S",
    "T",
    "Td",
    "U",
    "U*",
    "U**",
    "<-",
    "+v|",
    "+x|",
    "+y|",
    "+w|",
    "+h|",
    "df",
    "on",
    "throt",
  ])),
  (gui.resetDisplay = function () {
    (document.body.innerHTML = ""),
      gui.cancelScheduledEvents({}),
      (gui.rootContainer = new gui.Root({}, document.body)),
      (document.body._item = gui.rootContainer),
      (window._item = gui.rootContainer),
      document.body.appendChild(darkModeIcon);
  }),
  (gui.ums = 0),
  (gui.sendUserEvent = async function (t) {
    (t.t = gui.ums || 1),
      gui.session && (t.s = gui.session),
      logline(t),
      gui.checkMessageTriggers(t),
      gui.userEvent(t);
  }),
  (gui.vType = function (t) {
    return {
      undefined: gui.Bin,
      object: gui.Bin,
      string: gui.Txt,
      number: gui.Num,
      boolean: gui.Btn,
    }[typeof t];
  }),
  (gui.getType = function (t) {
    if (t.c && t.c in gui.TYPES) return gui.TYPES[t.c];
  }),
  (gui.shortProp = function (t) {
    if (t && t.constructor === Object) {
      var e = {};
      for (let i of Object.entries(t))
        e[gui.LONGFORM[i[0]] || i[0]] = gui.shortProp(i[1]);
      return e;
    }
    if (t && t.constructor === Array) {
      e = [];
      for (let i of t) e.push(gui.shortProp(i));
      return e;
    }
    return t;
  }),
  (gui.prop = (t) => (t.constructor === Object ? t : { v: t })),
  (gui.getColor = (t) =>
    getComputedStyle(document.body).getPropertyValue("--color" + t)),
  (gui.color = (t) => (gui.getColor(t) ? `var(--color${t})` : t)),
  (gui.ids = {}),
  (gui.uniqueId = function (t) {
    var e = gui.ids[t];
    if (1 == e.length) return !0;
    for (var i = e.length; i--; ) e[i]._exists() || e.splice(i, 1);
    return 1 == e.length || void 0;
  }),
  (gui.scheduledUpdates = {}),
  (gui.cancelScheduledEvents = function (t) {
    if (t.constructor === Object)
      for (let t in gui.scheduledUpdates)
        gui.scheduledUpdates[t].constructor === Array
          ? gui.msgTriggers.delete(gui.scheduledUpdates[t])
          : gui.scheduledUpdates[t].constructor === Number &&
            (clearTimeout(gui.scheduledUpdates[t]),
            clearInterval(gui.scheduledUpdates[t])),
          delete gui.scheduledUpdates[t];
    else
      gui.scheduledUpdates[t] &&
        (gui.scheduledUpdates[t].constructor === Array
          ? gui.msgTriggers.delete(gui.scheduledUpdates[t])
          : gui.scheduledUpdates[t].constructor === Number &&
            (clearTimeout(gui.scheduledUpdates[t]),
            clearInterval(gui.scheduledUpdates[t])),
        delete gui.scheduledUpdates[t]);
  }),
  (gui.msgTriggers = new Set()),
  (gui.triggerMatch = function (t, e) {
    if (0 === Object.keys(t).length) return !0;
    var i;
    for (var n in t)
      if ((i = t[n]) && i.constructor === Object) {
        if (!(n in e)) return !1;
      } else if (e[n] !== i) return !1;
    return !0;
  }),
  (gui.checkMessageTriggers = function (t) {
    for (var [e, i] of gui.msgTriggers) gui.triggerMatch(e, t) && i(t);
  }),
  (gui.animations = new Set()),
  (gui.propWatch = new Set()),
  (gui.loop = function (t) {
    if (gui.animations.size) {
      const e = (t - gui.ums) / 1e3;
      for (let t of gui.animations) gui.animationStep(e, t);
    }
    if (gui.propWatch.size) {
      let t;
      for (let e of gui.propWatch)
        if (e._propWatch.size && e._exists())
          for (t of e._propWatch) e._checkProp(t);
        else gui.propWatch.delete(e);
    }
    (gui.ums = Math.round(t)), requestAnimationFrame(gui.loop);
  }),
  requestAnimationFrame(gui.loop),
  (gui.require = function (t, e) {
    var i;
    if (!e) {
      var n = [];
      for (var o in t)
        for (i of t[o])
          `${o}:${i}` in gui.REQUIRED && n.push(...gui.REQUIRED[`${o}:${i}`]);
      if (n.length)
        return void load(n, function () {
          gui.require(t, !0);
        });
    }
    var r = [];
    for (var o in t)
      if (o in IMPLEMENTED) {
        if (IMPLEMENTED[o].length)
          if (
            (t[o].constructor !== Array && (t[o] = [t[o]]), 0 === t[o].length)
          )
            gui.sendUserEvent({
              error:
                "Sorry, I cannot handle required all possible values for {" +
                o +
                "}",
            }),
              r.push({
                id: "Cannot handle all values for required property",
                v: [o],
              });
          else
            for (var s of t[o])
              IMPLEMENTED[o].includes(s) ||
                (gui.sendUserEvent({
                  error:
                    "Sorry, I cannot handle required option-value: {" +
                    o +
                    ":" +
                    JSON.stringify(s) +
                    "}",
                }),
                r.push({
                  id: "Cannot handle required property option(s)",
                  v: ["{" + o + ":" + JSON.stringify(s) + "}"],
                }));
      } else
        gui.sendUserEvent({
          error: "Sorry, I cannot handle required option: " + o,
        }),
          r.push({ id: "Cannot handle required property option(s)", v: [o] });
    r.length &&
      (gui({ v: [null, { id: "Error", v: r }] }), gui.ws && gui.ws.close());
  }),
  void 0 === localStorage.darkModePreferred &&
    (localStorage.darkModePreferred = window?.matchMedia?.(
      "(prefers-color-scheme:dark)"
    )?.matches
      ? "yes"
      : ""),
  document.documentElement.setAttribute(
    "theme",
    localStorage.darkModePreferred ? "dark" : "light"
  );
const darkModeIcon = document.createElement("span");
function autoHeight(t) {
  if (t.constructor === HTMLTextAreaElement) {
    (t.style.height = "0px"), (t.style.height = 5 + t.scrollHeight + "px");
    let e = t._item._parent,
      i = e._content;
    !("ch" in e._prop) &&
      i.scrollHeight > getComputedStyle(i).height &&
      (e._content.style.height = e._content.scrollHeight);
  }
}
(darkModeIcon.style =
  "position:fixed;bottom:0px;right:0px;font-size:12px;padding:1px;cursor:pointer;"),
  (darkModeIcon.innerText = localStorage.darkModePreferred ? "🌖" : "🌒"),
  (darkModeIcon.onclick = () => {
    localStorage.darkModePreferred
      ? (document.documentElement.setAttribute("theme", "light"),
        (localStorage.darkModePreferred = ""),
        (darkModeIcon.innerText = "🌒"))
      : (document.documentElement.setAttribute("theme", "dark"),
        (localStorage.darkModePreferred = "yes"),
        (darkModeIcon.innerText = "🌖"));
  }),
  addCSS(
    '\n:root {\n--color0: white;\n--color1: #444;\n--colorHead: #f0f8f8;\n--colorBorder: #e8e8e8;\n--colorFalse: #f8f8f8;\n--colorFalseHover: #f0f0f0;\n--colorTrue: lightblue;\n--colorInput: white;\n--colorInputText: #444;\n--colorLink: #06f;\n}\n[theme="dark"] {\n    --color0: #182028;\n    --color1: #ccc;\n    --colorHead: #245;\n    --colorBorder: #333;\n    --colorFalse: #444;\n    --colorFalseHover: #555;\n    --colorTrue: #224058;\n    --colorInput: #eee;\n    --colorInputText: #000;\n    --colorLink: #06d;\n    --colorData: rgba(0,130,255,0.75);\n}\n* {scrollbar-width:thin;box-sizing:border-box;z-index:1;white-space:pre-wrap}\n*:before {box-sizing:border-box}\n*:after {box-sizing:border-box}\nscrollbar {width:5px;height:5px;}\na {color:var(--colorLink);cursor:pointer;text-decoration:underline}\n::-webkit-scrollbar {width:5px;height:5px;}\n::-webkit-scrollbar-thumb {background: var(--colorTrue);}\n::-webkit-scrollbar-track {background: rgba(0,0,0,0.1);}\nbody {background-color:var(--color0);color:var(--color1);font-size:18pt;overflow:overlay;font-family: trebuchet ms, open sans, lato, montserrat, sans-serif}\n[level="0"] , [level="0"]>* {margin:0px !important;padding:0px !important;width:100% !important;height:100% !important}\ndiv {position:relative}\n[c] {border-width:0px;border-style:solid;border-color:var(--colorBorder);stroke:var(--color1);fill:none;overflow:visible;z-index:1;margin:3px;margin-left:6px; margin-top:0.5em; min-width:1em;min-height:1em;}\n[c][level="1"] {margin-left:1px}\n.title:not(:empty):not(td) {white-space:nowrap;overflow:visible;user-select:none;display:flex}\n.title > span {flex:1 0}\n.title:empty {margin:0px}\n.subcaption {font-size:70%;font-weight:500;text-decoration:underline}\n.content {overflow:hidden;border:none;left:0px;right:0px;font-size:90%}\n.frame {overflow:auto;max-width:100%;max-height:100%;}\ninput , textarea {font-family:consolas, monospace;background-color:var(--colorInput);color:var(--colorInputText)}\n[c] {overflow:visible}\n*:focus {outline: 0px solid transparent;box-shadow:0px 0px 5px 2px var(--colorTrue) !important;}\n'
  ),
  (gui._Item = class {
    constructor(t, e) {
      (this._parent = e),
        this._initContent(),
        (this._moveTriggers = {}),
        (this._lockTriggers = {}),
        (this._propWatch = new Set()),
        (this._propOld = {}),
        this._content.classList.add("content"),
        this._frame.classList.add("frame"),
        this._title.classList.add("title"),
        (this._content._item =
          this._title._item =
          this._frame._item =
          this._element._item =
          this._outerElement._item =
            this),
        (this._level = e._level + 1),
        this._setAttr("level", this._level),
        this._classDefaults &&
          ((this._prop = { c: this._classDefaults.c }),
          this._setAttr("c", this._classDefaults.c)),
        this._initDefaults(t),
        this._update(t);
    }
    _initContent() {
      (this._element = document.createElement("div")),
        (this._title = this._element.appendChild(
          document.createElement("div")
        )),
        (this._content = this._element.appendChild(
          document.createElement("div")
        )),
        (this._frame = this._content),
        this._parent._placeChildElement(this);
    }
    _initDefaults(t) {
      var e = this._parent._prop.df;
      for (var i in e)
        if (e[i] && e[i].constructor === Object)
          if (i in t)
            for (var n in e[i])
              n in t[i] || (t[i][n] = JSON.parse(JSON.stringify(e[i][n])));
          else t[i] = JSON.parse(JSON.stringify(e[i]));
        else
          i in t ||
            (t[i] = e[i] && e[i].constructor === Array ? [...e[i]] : e[i]);
      "v" in t || (t.v = this._classDefaults.v), delete t.c;
    }
    _beforeRemove() {}
    _attr(t) {
      return this._element.getAttribute(t);
    }
    _setAttr(t, e) {
      null === e
        ? this._element.removeAttribute(t)
        : this._element.setAttribute(t, e);
    }
    _delay(t, e) {
      "Tn" in t || (t.Tn = Math.random());
      var i = setTimeout(() => {
        delete gui.scheduledUpdates[t.Tn], this._update(t);
      }, e);
      gui.scheduledUpdates[t.Tn] = i;
    }
    _interval(t) {
      var e,
        i = 1e3 * t.Ti;
      delete t.Ti,
        "Tn" in t || (t.Tn = Math.random()),
        (e = JSON.stringify(t)),
        this._update(JSON.parse(e));
      var n = setInterval(() => {
        this._update(JSON.parse(e));
      }, i);
      gui.scheduledUpdates[t.Tn] = n;
    }
    _update(t) {
      if (t.Td) {
        let e = 1e3 * t.Td;
        delete t.Td, this._delay(t, e);
      } else if (t.Ti) this._interval(t);
      else if (null === t.v)
        (this._prop.v = null),
          this._parent
            ? (this._parent._removeChild(this), t.R && this.R(t.R))
            : (gui.resetDisplay(), t.R && gui.rootContainer.R(t.R));
      else {
        if (void 0 !== t.c) {
          if (t.c !== this._classDefaults.c) return void this.c(t.c, t);
        } else if (
          void 0 !== t.v &&
          t.v.constructor !== this._classDefaults.v.constructor
        )
          return (
            (t.c = gui.vType(t.v).prototype._classDefaults.c),
            void this.c(t.c, t)
          );
        void 0 !== t.df && (this._updateProp("df", t.df), delete t.df),
          void 0 !== t.v && (this._updateProp("v", t.v), delete t.v);
        let i = t.R;
        i && delete t.R;
        let n = t.Q;
        for (var e in (n && delete t.Q, t))
          e.startsWith("+") || this._updateProp(e, t[e]);
        for (var e in t)
          e.startsWith("+") && e.endsWith("|") && this._updateProp(e, t[e]);
        for (var e in t)
          e.startsWith("+") && !e.endsWith("|") && this._updateProp(e, t[e]);
        if ((i && this.R(i), n && n.constructor === Array))
          for (let t of n) this._update(t);
      }
    }
    _updateProp(t, e) {
      if (null === e) {
        if (t in this._prop) {
          if (this._prop[t] && this._prop[t].constructor === Object)
            for (var i in ((e = {}), this._prop[t])) e[i] = null;
          delete this._prop[t];
        }
      } else if (
        this._prop[t] &&
        this._prop[t].constructor === Object &&
        e.constructor === Object
      )
        for (var n in e)
          null === e[n] ? delete this._prop[t][n] : (this._prop[t][n] = e[n]);
      else this._prop[t] = e;
      this._refreshProp(t, e);
    }
    _refreshProp(t, e) {
      try {
        if (this[t]) {
          if ("v" === t)
            e.constructor === Boolean
              ? this._setAttr("v", e)
              : this._moveHook();
          else if (!gui.NO_ATTR.has(t))
            try {
              this._setAttr(t, e);
            } catch (t) {}
          this[t](e);
        }
      } catch (i) {
        console.error(i.stack),
          this._sendMsg({
            error: `Problem setting ${t} to ${e} :: [[${i.stack}]]`,
          });
      }
    }
    _getIndex() {
      return this._parent._children.indexOf(this);
    }
    _match(t) {
      if (t.constructor === Object) {
        for (var e in t)
          if (this._prop[e] && t[e].constructor === Array) {
            var i =
              this._prop[e].constructor === Array
                ? this._prop[e]
                : Object.keys(this._prop[e]);
            for (var n of t[e]) if (!i.includes(n)) return !1;
          } else if (t[e] !== this._prop[e]) return !1;
        return !0;
      }
    }
    _uniqueId() {
      return this._prop.id && gui.uniqueId(this._prop.id);
    }
    _getId() {
      if (this._uniqueId()) return this._prop.id;
      if (this._parent === gui.rootContainer)
        return this._prop.id || this._getIndex();
      for (
        var t = this._parent,
          e = [this._prop.id || this._getIndex(), t._prop.id || t._getIndex()];
        t._parent !== gui.rootContainer && !t._uniqueId();

      )
        (t = t._parent), e.push(t._prop.id || t._getIndex());
      return e.reverse();
    }
    _sendMsg(t) {
      (t.u = this._getId()), gui.sendUserEvent(t);
    }
    _moveHook() {
      for (var t in this._moveTriggers) this._moveTriggers[t]();
    }
    _exists() {
      return document.body.contains(this._element);
    }
    c(t, e = {}) {
      t !== this._classDefaults.c &&
        (void 0 === this._prop.v || this instanceof gui.vType(this._prop.v)
          ? (this._prop.v = gui.INFO.v(this))
          : delete this._prop.v,
        (this._prop.i = this._getIndex()),
        (e = Object.assign({}, this._prop, e)),
        this._parent._removeChild(this),
        this._parent._newChild(e));
    }
    v(t) {
      this._content.innerText = t;
    }
    id(t) {
      if ("string" == typeof t) {
        (this._parent._childmap[t] = this), this.cap();
        var e = gui.ids[t];
        e ? e.push(this) : (gui.ids[t] = [this]);
      }
    }
    cap(t) {
      var e = null == t ? this._prop.id : t;
      e
        ? (this._titleText ||
            ((this._titleText = this._title.appendChild(
              document.createElement("span")
            )),
            (this._titleText._item = this)),
          (this._titleText.innerText = e))
        : this._titleText && this._titleText.remove();
    }
    error(t) {
      console.error(this._prop, t);
    }
  }),
  (gui._Container = class extends gui._Item {
    _initDefaults(t) {
      (this._prop.df = Object.create(this._parent._prop.df)),
        (this._children = []),
        (this._childmap = {}),
        super._initDefaults(t);
    }
    _update(t) {
      if (t.Td) {
        let e = 1e3 * t.Td;
        delete t.Td, this._delay(t, e);
      } else if (t.Ti) this._interval(t);
      else if ("U" in t) {
        let e = t.U;
        delete t.U, this._searchId(e, t);
      } else if ("U**" in t) {
        let e = t["U**"];
        delete t["U**"], this._searchRecur(e, t);
      } else if ("U*" in t) {
        let e = t["U*"];
        delete t["U*"], this._searchStar(e, t);
      } else super._update(t);
    }
    _placeChildElement(t) {
      this._content.appendChild(t._element), (t._outerElement = t._element);
    }
    _checkContainerBool() {
      var t;
      for (var e of this._children)
        if (e instanceof gui.Btn) {
          if (t) return null;
          t = e;
        }
      if (
        t &&
        0 !== t._prop.in &&
        -1 !== t._prop.in &&
        ("" == t._prop.cap || (!t._prop.cap && !t._prop.id))
      )
        return t;
    }
    _containerBool() {
      var t = this._checkContainerBool();
      this._containerBoolean &&
        t != this._containerBoolean &&
        this._containerBoolean._unbind &&
        this._containerBoolean._unbind(),
        (this._containerBoolean = t),
        t
          ? (this._containerBoolean._bind(this),
            this._setAttr("btnContainer", 1),
            this._setAttr("v", Boolean(this._containerBoolean._prop.v)))
          : this._setAttr("btnContainer", null);
    }
    _newChild(t) {
      var e = gui.getType(t);
      if (e) {
        if ("v" in t) {
          let i = gui.vType(t.v);
          i === e ||
            e.prototype instanceof i ||
            (gui.sendUserEvent({
              error: `Component class "${
                e.prototype._classDefaults.c
              }" is incompatible with a value whose type is ${
                t.v.constructor.name
              }.\nOccurred in the following:\n${JSON.stringify(t)}`,
            }),
            (e = i));
        }
      } else {
        var i = gui.getType(this._prop.df);
        "v" in t
          ? ((e = gui.vType(t.v)), i && i.prototype instanceof e && (e = i))
          : i
          ? (e = i)
          : "v" in this._prop.df
          ? (e = gui.vType(this._prop.df.v))
          : ((e = gui.Bin), (t.v = []));
      }
      var n = new e(t, this);
      return this._children.includes(n) || this._children.push(n), n;
    }
    _beforeRemove() {
      for (var t = this._children.length; t--; )
        this._children[t]._beforeRemove();
      super._beforeRemove();
    }
    _afterMove() {}
    _removeChild(t) {
      t._beforeRemove(),
        t._prop.id && delete this._childmap[t._prop.id],
        this._children.splice(this._children.indexOf(t), 1),
        t._outerElement.remove();
    }
    _searchStar(t, e) {
      for (var i of this._children) i._match(t) && i._update(e);
    }
    _searchRecur(t, e) {
      for (var i of this._children)
        i._match(t) && i._update(e),
          i instanceof gui.Bin && i._searchRecur(t, e);
    }
    _searchId(t, e) {
      return this._searchIdArray(t.constructor === Array ? t : [t], e);
    }
    _searchIdArray(t, e) {
      if (
        ("number" == typeof t[0]
          ? (t[0] < 0 && (t[0] = this._children.length + t[0]),
            (i = this._children[t[0]]))
          : (i = this._childmap[t[0]]),
        i)
      )
        return t.length > 1
          ? i._searchIdArray(t.slice(1), e)
          : (e && i._update(e), i);
      for (var i of this._children)
        if (i instanceof gui.Bin) {
          var n = i._searchIdArray(t, e);
          if (n) return n;
        }
    }
    A(t) {
      for (var e of t) null !== e && this._newChild(gui.prop(e));
    }
    v(t) {
      for (var e = this._children.length; e--; )
        this._children[e]._beforeRemove(),
          this._children[e]._outerElement.remove();
      (this._childmap = {}), (this._children = []), this.A(t);
    }
    df(t) {
      t &&
        t.v &&
        t.v.constructor === Array &&
        (gui.sendUserEvent({
          error:
            "Default item values can never be arrays (for safety reasons, to prevent infinite loops).\nOccurred in:\n df:" +
            JSON.stringify(t),
        }),
        delete this._prop.df.v);
    }
  }),
  (gui._ContainerWithNoParent = class extends gui._Container {
    _initDefaults(t) {
      (this._prop.df = {}),
        (this._children = []),
        (this._childmap = {}),
        (this._parent = null),
        (this._prop.id = null);
    }
  }),
  addCSS(
    "\n[c='bin']:not(tr):not([tag]):not([shp]):not([h]):not([level='0']) {border-left: solid 0.2px var(--colorBorder)}\n\n[c='bin']:not(tr) > .title:empty {display:none}\n[c='bin']:not(tr) > .title:not(empty) {border-bottom:solid 1px var(--colorBorder);}\n[c='bin']:not(tr) {display:flex;flex-direction:column}\n[c]>.title {flex-grow:0}\n[c]>.frame {flex-grow:1}\n"
  ),
  (gui.Bin = class extends gui._Container {}),
  (gui.Bin.prototype._classDefaults = { c: "bin", v: [] }),
  (gui.Root = class extends gui._ContainerWithNoParent {
    _sendMsg(t) {
      gui.sendUserEvent(t);
    }
    _update(t) {
      if (("Tc" in t && gui.cancelScheduledEvents(t.Tc), t.T)) {
        let e = t.T - gui.ums;
        delete t.T, this._delay(t, e);
      } else if (t.Tr) {
        "Tn" in t || (t.Tn = Math.random());
        var e,
          i = this,
          n = [t.Tr];
        delete t.Tr,
          (e = JSON.stringify(t)),
          n.push(() => i._update(JSON.parse(e))),
          gui.msgTriggers.add(n),
          (gui.scheduledUpdates[t.Tn] = n);
      } else
        for (var o of ((gui.btnBinsChanged = new Set()),
        super._update(t),
        gui.btnBinsChanged))
          o._containerBool();
    }
    S(t) {
      gui.session = t;
    }
    require(t) {
      Object.keys(t).length
        ? gui.require(t)
        : this._sendMsg({ requirable: IMPLEMENTED });
    }
    id() {}
    style(t) {
      load(t);
    }
    open(t) {
      window.open(t);
    }
    save(t) {
      if (t.constructor === Array && 2 === t.length) {
        var e = new Blob([t[1]], { type: "text/plain" }),
          i = document.createElement("a"),
          n = URL.createObjectURL(e);
        (i.href = n),
          (i.download = t[0]),
          document.body.appendChild(i),
          i.click(),
          setTimeout(function () {
            document.body.removeChild(i), window.URL.revokeObjectURL(n);
          }, 0);
      }
    }
    cap(t) {
      document.title = null == t ? "" : t;
    }
  }),
  (gui.Root.prototype._classDefaults = { c: "bin", v: [] }),
  addCSS(
    "\n[c='txt'] > .title:empty {width:0px;height:0px;overflow:hidden}\n[c='txt'] > .content {white-space:pre-wrap}\n[c='txt'][id] > .content {margin-left:.5em}\n[c='txt'][cap]:not([cap='']) > .content {margin-left:.5em}\ntextarea {white-space:pre;min-height:8ex;max-height:28ex;width:40em;max-width:calc(100% - 0.5em) !important;font-size:11pt;border:solid 1px var(--colorBorder) !important}\n"
  ),
  (gui.Txt = class extends gui._Item {
    v(t) {
      this._prop.in && this._prop.in > 0
        ? ("\n" === t && (t = ""),
          (this._content.value = t),
          autoHeight(this._content))
        : (this._content.innerText = t);
    }
    A(t) {
      this.v(this._prop.v + t);
    }
    in(t) {
      if ((this._content._removeListeners(), t && t > 0)) {
        var e = this,
          i = !this._prop.v.includes("\n");
        this._content.remove(),
          (this._frame = this._content =
            this._element.appendChild(
              document.createElement(i ? "input" : "textarea")
            )),
          (this._frame._item = this);
        var n = e._prop.v;
        function o() {
          n !== e._prop.v && (e._sendMsg({ v: e._prop.v }), (n = e._prop.v));
        }
        this._content._listen("input", function (t) {
          (e._prop.v =
            i || e._content.value.includes("\n")
              ? e._content.value
              : e._content.value + "\n"),
            autoHeight(e._content);
        }),
          (this._content.onblur = o),
          i &&
            this._content._listen("keypress", (t) => {
              "Enter" == t.key && (t.preventDefault(), o());
            });
      } else
        this._content.remove(),
          (this._frame = this._content =
            this._element.appendChild(document.createElement("div")));
      (this._frame.className = "frame content"), this.v(this._prop.v);
    }
  }),
  (gui.Txt.prototype._classDefaults = { c: "txt", v: "" }),
  addCSS(
    "\n[c='num'] > input {padding-right:0px; text-align:right}\n[c='num'] * {display:inline-block;vertical-align:middle}\n[c='num'] > .title:empty {width:0px;height:0px;overflow:hidden}\n[c='num'] > .title:not(:empty) {border-bottom:solid 1px var(--colorBorder);vertical-align:bottom;margin-top:inherit;margin-right:.75em}\n[c='num'] > .title:not(:empty) > span:after {content:\":\"}\n[c='num'] > .content {display:inline-block; }\n\ninput[disabled] {background-color:transparent !important;color:var(--color1)}\ninput:not([disabled]) {border:solid 1px var(--colorBorder)}\n\n[c='num'][unit]:after {content: attr(unit);font-size:80%;padding-left:2px;vertical-align:text-bottom}\n"
  ),
  (gui.Num = class extends gui._Item {
    _display(t, e, i = 0) {
      return t.toFixed(
        Math.max(
          e?.toString().split(".")[1]?.length || 0,
          i?.toString().split(".")[1]?.length || 0
        )
      );
    }
    in(t) {
      var e;
      t && t > 0
        ? (this._content.remove(),
          ((e = this._content =
            this._element.appendChild(document.createElement("input"))).type =
            "number"),
          (e._item = this),
          this.v(this._prop.v || 0),
          (e.oninput = function () {
            e._item._adjustWidth(e.value.length);
          }),
          (e.onchange = function () {
            try {
              e._item._updateProp("v", parseFloat(e.value)),
                e._item._sendMsg({ v: e._item._prop.v });
            } catch (t) {}
          }))
        : (this._content.remove(),
          (this._content = this._element.appendChild(
            document.createElement("div")
          )),
          (this._content._item = this),
          this.v(this._prop.v || 0));
    }
    max(t) {
      this.step();
    }
    min(t) {
      this.step();
    }
    step(t) {
      this._prop.step < 0 && (this._prop.step *= -1),
        this._content.setAttribute("max", this._prop.max),
        this._content.setAttribute("min", this._prop.min),
        this._content.setAttribute("step", this._prop.step),
        this.v(this._prop.v);
    }
    unit(t) {
      this.v(this._prop.v);
    }
    v(t) {
      void 0 !== this._prop.min && (t = Math.max(t, this._prop.min)),
        void 0 !== this._prop.max &&
          ((t = Math.min(t, this._prop.max)),
          this._element.style.setProperty(
            "--pp",
            (100 * t) / (this._prop.max - (this._prop.min || 0)) + "%"
          )),
        this._prop.step &&
          (t =
            (this._prop.min || 0) +
            Math.round2(t - (this._prop.min || 0), this._prop.step)),
        (this._prop.v = t),
        this._content.constructor === HTMLInputElement
          ? ((this._content.value = this._display(
              t,
              this._prop.step,
              this._prop.min || 0
            )),
            this._lastLength !== this._content.value.length &&
              this._adjustWidth(
                (this._lastLength = this._content.value.length)
              ))
          : (this._content.innerText = this._display(
              t,
              this._prop.step,
              this._prop.min || 0
            ));
    }
    A(t) {
      this.v(this._prop.v + t);
    }
    _adjustWidth(t) {
      this._content.style.width = `calc(${t + 1}ch + 2em)`;
    }
  }),
  (gui.Num.prototype._classDefaults = { c: "num", v: 0 }),
  addCSS(
    "\n[c='btn']:hover {background-color:var(--colorFalseHover) !important;}\n[c='btn']:active {background-color:var(--colorTrue) !important;}\n[c='btn'] {text-align:center;display:inline-block;padding:.4em;background-color:var(--colorFalse);vertical-align:middle;box-shadow:0px 0px 3px 1px rgba(0, 0, 0, 0.3);border-radius:4px;}\n[c='btn'] > * {display:inline-block}\n[c='btn']:not(:empty),[select=\"0\"]:not(:empty) {min-width:100px}\n[c='btn'][in]:empty {width:1em;height:1em;border-radius:2em;}\n[btnContainer] [c='btn'] {display:none}\n[btnContainer]:hover {background-color:var(--colorFalseHover) !important;}\n[btnContainer]:active {background-color:var(--colorTrue) !important;}\n[btnContainer]:not(tr) {box-shadow:0px 0px 3px 1px rgba(0, 0, 0, 0.3);cursor:pointer;border-radius:4px;}\n[v=\"true\"]:not([c='txt']) {background-color:var(--colorTrue) !important;}\n"
  ),
  (gui.Btn = class extends gui._Item {
    _initContent() {
      (this._element = document.createElement("div")),
        this._setAttr("tabindex", 0),
        (this._element.onkeydown = function (t) {
          t.repeat ||
            ("Enter" != t.key && " " !== t.key) ||
            (this._item._btnDown(), t.preventDefault(), t.stopPropagation());
        }),
        (this._element.onkeyup = function (t) {
          ("Enter" != t.key && " " !== t.key) ||
            (this._item._btnUp(), t.preventDefault(), t.stopPropagation());
        }),
        (this._frame = this._element),
        (this._content = this._element),
        (this._title = this._frame.appendChild(document.createElement("div"))),
        this._parent._placeChildElement(this),
        this._bind(this);
    }
    _refreshProp(t, e) {
      super._refreshProp(t, e), gui.btnBinsChanged.add(this._parent);
    }
    _beforeRemove() {
      this._unbind(),
        gui.btnBinsChanged.add(this._parent),
        super._beforeRemove();
    }
    v(t) {
      t &&
        (this._boundTo &&
          this._boundTo !== this &&
          this._boundTo._setAttr("v", t),
        1 === this._prop.in &&
          setTimeout(() => this._updateProp("v", !1), 200));
    }
    A(t) {
      this.v(!this._prop.v);
    }
    _btnDown() {
      this._setAttr("v", !0);
    }
    _btnUp() {
      this._setAttr("v", !1),
        this._boundTo._element.dispatchEvent(new Event("click"));
    }
    _bind(t) {
      var e = this;
      (this._boundTo = t),
        this._unbind && this._unbind(),
        this._prop && t._setAttr("btnin", this._prop.in),
        (t._element.onclick = function (t) {
          e._sendMsg({ v: !0 });
        }),
        (this._unbind = function () {
          t._element.onclick = null;
        });
    }
  }),
  (gui.Btn.prototype._classDefaults = { c: "btn", v: !1 }),
  (function () {
    function t() {
      let t = {
        userAgent: USERAGENT,
        wh: [
          gui.rootContainer._element.offsetWidth,
          gui.rootContainer._element.offsetHeight,
        ],
        platform: navigator.userAgent,
        time: dateISO(),
        url: location.href,
        screen: objectify(screen),
        t: 0,
      };
      logline(t), gui.userEvent(t);
    }
    window.app || (window.app = {}),
      (app.event = function (t, e) {
        app._eventHandlers || (app._eventHandlers = []),
          app._eventHandlers.push([t, e]);
      }),
      (app.start = function (t) {
        app._eventHandlers || (app._eventHandlers = []),
          app._eventHandlers.push([{ t: 0 }, t]);
      }),
      window.addEventListener("load", function () {
        Object.values(gui)
          .filter((t) => t.prototype && t.prototype._classDefaults)
          .forEach((t) => {
            gui.TYPES[t.prototype._classDefaults.c] ||
              (gui.TYPES[t.prototype._classDefaults.c] = t);
          }),
          (document.body._level = -1),
          (document.body._content = document.body),
          (document.body._placeChildElement = function (t) {
            this._content.appendChild(t._element),
              (t._outerElement = t._element);
          }),
          gui.resetDisplay(),
          window.userEvent || app.userEvent || app._eventHandlers
            ? (function () {
                if (app && app._eventHandlers) {
                  const t = (t, e) =>
                    Object.entries(e).every((e) => e[1] === t[e[0]]);
                  gui.userEvent = function (e) {
                    for (let [i, n] of app._eventHandlers)
                      if (t(e, i)) {
                        n(e);
                        break;
                      }
                  };
                } else gui.userEvent = app.userEvent || userEvent;
                (app.display = gui.display = gui.appEvent), t();
              })()
            : location.params.l || app.location
            ? (gui({ v: ["Loading..."] }),
              (app.location = app.location || location.params.l),
              app.location.startsWith("ws://") ||
              app.location.startsWith("wss://")
                ? "WebSocket" in window
                  ? ((gui.userEvent = function (t) {
                      gui.ws.send(JSON.stringify(t));
                    }),
                    (gui.ws = new window.WebSocket(app.location)),
                    (gui.ws.onerror = function (t) {
                      gui({
                        v: null,
                        error: "Cannot establish connection to " + app.location,
                      });
                    }),
                    (gui.ws.onclose = function (t) {
                      console.log("Connection closed (" + t.code + ").");
                    }),
                    (gui.ws.onopen = t),
                    (gui.ws.onmessage = gui.appEventJSON))
                  : gui({
                      v: [
                        null,
                        {
                          id: "Error",
                          v: "Your browser does not support websockets. Please use a modern browser to run this application.",
                        },
                      ],
                    })
                : (function () {
                    if (
                      (location.params.method &&
                        "GET" === location.params.method.toUpperCase()) ||
                      (app.method && "GET" === app.method.toUpperCase())
                    ) {
                      var [e, i] = app.location.split("?");
                      i
                        ? (e = i.endsWith("&")
                            ? app.location + "event="
                            : app.location + "&event=")
                        : (e += "?event="),
                        (gui.userEvent = function (t) {
                          fetch(e + JSON.stringify(t))
                            .then((t) => t.text())
                            .then(gui.appEventJSON);
                        });
                    } else
                      gui.userEvent = function (t) {
                        fetch(app.location, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(t),
                        })
                          .then((t) => t.text())
                          .then(gui.appEventJSON);
                      };
                    t();
                  })())
            : gui({
                v: [
                  "Hey there...",
                  {
                    id: "Interested in the UINL?",
                    v: "http://uinl.github.io/",
                  },
                ],
              });
      });
  })(),
  (gui._Item.prototype._rectx = function () {
    return (
      this._element.getBoundingClientRect().x -
      this._parent._content.getBoundingClientRect().x
    );
  }),
  (gui._Item.prototype._recty = function () {
    return (
      this._element.getBoundingClientRect().y -
      this._parent._content.getBoundingClientRect().y
    );
  }),
  (gui._Item.prototype._rectw = function () {
    return this._element.offsetWidth;
  }),
  (gui._Item.prototype._recth = function () {
    return this._element.offsetHeight;
  }),
  (gui._Item.prototype._rectcw = function () {
    return this._content.getBoundingClientRect().width;
  }),
  (gui._Item.prototype._rectch = function () {
    return this._content.getBoundingClientRect().height;
  }),
  (gui.INFO = {
    v(t) {
      if (t instanceof gui.Bin) {
        var e,
          i = [];
        for (var n of t._children) {
          for (var o in ((e = {}), n._prop))
            e[o] = o in gui.INFO ? gui.INFO[o](n) : n._prop[o];
          i.push(e);
        }
        return i;
      }
      return t._prop.v;
    },
    i: (t) => t._getIndex(),
    fcs: (t) => t._content === document.activeElement,
    sx: (t) => t._frame.scrollLeft / t._rectcw(),
    sy: (t) => t._frame.scrollTop / t._rectch(),
    xy: (t) => [t._rectx(), t._recty()],
    wh: (t) => [t._rectw(), t._recth()],
    whc: (t) => [t._rectcw(), t._rectch()],
  }),
  (gui._Item.prototype.R = async function (t, e = {}) {
    var i = {};
    for (var n of t)
      n in gui.INFO ? (i[n] = await gui.INFO[n](this)) : (i[n] = this._prop[n]),
        void 0 === i[n] && (i[n] = null);
    (e.r = i), this._sendMsg(e);
  }),
  addCSS(
    "\n.tooltiptext {visibility:hidden;background-color:var(--color1);color:var(--color0);text-align:left;border-radius:3px;padding:0.5em 1em 0.5em 1.5em;margin:3px;position:fixed;bottom:3px;left:3px;z-index:999;font-size:12pt;font-family:Arial;text-shadow:none;white-space:pre-wrap}\n.tooltiptext:before {content:'💡';position:absolute;left:0px;top:5px}\n"
  ),
  (gui.tooltipOn = function (t) {
    gui.tooltip ||
      ((gui.tooltip = document.body.appendChild(
        document.createElement("span")
      )),
      gui.tooltip.setAttribute("class", "tooltiptext")),
      (gui.tooltip.innerHTML = this._item._prop.tip),
      (gui.tooltip.style.visibility = "visible");
  }),
  (gui.tooltipOff = function (t) {
    gui.tooltip.style.visibility = "hidden";
  }),
  (gui._Item.prototype.i = function (t) {
    var e = this._parent;
    if (
      (t < 0 && ((t = this._parent._children.length + t), (this._prop.i = t)),
      e && e._children[t] !== this)
    ) {
      var i = e._children.indexOf(this);
      i > -1 && e._children.splice(i, 1),
        t < e._children.length
          ? (e._content.insertBefore(
              this._outerElement,
              e._children[t]._glass || e._children[t]._outerElement
            ),
            e._children.splice(t, 0, this))
          : (e._content.appendChild(this._outerElement),
            e._children.push(this));
      for (var n = 0; n < e._children.length; n++) e._children[n]._prop.i = n;
    }
    e._afterMove();
  }),
  (gui._Item.prototype.tip = function (t) {
    t
      ? (this._element.addEventListener("mouseenter", gui.tooltipOn),
        this._element.addEventListener("mouseleave", gui.tooltipOff))
      : (this._element.removeEventListener("mouseenter", gui.tooltipOn),
        this._element.removeEventListener("mouseleave", gui.tooltipOff));
  }),
  (gui._Item.prototype.ef = function (t) {
    (this.style.borderWidth = 1 + t / 2 + "px"),
      (this.style.strokeWidth = 1 + t / 2 + "px"),
      (this.style.fontWeight = 400 + 300 * t);
  }),
  (gui._Item.prototype.tag = function (t) {
    if (
      ((this._element.className = ""),
      this._element === this._content && this._element.classList.add("content"),
      this._element === this._frame && this._element.classList.add("frame"),
      this._element === this._title && this._element.classList.add("title"),
      t && t.length)
    )
      for (var e of t)
        null !== e &&
          this._element.classList.add(e.constructor === String ? e : "tag" + e);
  }),
  (gui._Item.prototype.sx = function (t) {
    this._frame.scrollLeft = t + "%";
  }),
  (gui._Item.prototype.sy = function (t) {
    this._frame.scrollTop = t + "%";
  }),
  addCSS(
    "\n.contextMenu {display:none;position:fixed;z-index:10;width:auto !important;height:auto !important;padding:0.5em !important;background-color:var(--color0);border:solid 1px var(--colorBorder);box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;}\n.contextMenu > .content {display:flex;flex-direction:column}\n.ctxShown {background-color:var(--colorFalseHover) !important}\n"
  ),
  (gui.Ctx = class extends gui._ContainerWithNoParent {}),
  (gui.Ctx.prototype._classDefaults = { c: "ctx", v: [] }),
  (gui._Item.prototype._beforeRemove = function () {
    this._contextMenuItem &&
      (this._removeCtxFunctionality(), this._contextMenuItem._element.remove());
  }),
  (gui._Item.prototype.ctx = function (t) {
    this._contextMenuItem &&
      (this._removeCtxFunctionality(), this._contextMenuItem._element.remove());
    var e = this._prop.ctx;
    if (e.constructor === Object && e.v && e.v.constructor === Array) {
      this._contextMenuItem = new gui.Ctx(e, document.body);
      for (let t of this._contextMenuItem._children) t._parent = this;
      (this._contextMenuItem._element.className = "contextMenu"),
        this._contextMenuItem._element.setAttribute("tabindex", "0"),
        this._addCtxFunctionality();
    }
  }),
  (gui._Item.prototype._ctxShow = function (t) {
    t.preventDefault();
    var e = t.currentTarget,
      i = e._item,
      n = i._contextMenuItem._element;
    function o(t) {
      n.contains(t.relatedTarget) || t.relatedTarget === e || i._ctxHide();
    }
    function r(t) {
      t.target._item && "btn" === t.target._item._prop.c && i._ctxHide();
    }
    (n.style.display = "block"),
      e.classList.add("ctxShown"),
      i._prop.ctx.toggle
        ? ((n.style.left = e.getBoundingClientRect().left + "px"),
          (n.style.top = e.getBoundingClientRect().bottom + "px"))
        : ((n.style.left = t.clientX + 1 + "px"),
          (n.style.top = t.clientY + 1 + "px")),
      n.focus(),
      (i._ctxHide = function () {
        e.classList.remove("ctxShown"),
          (n.style.display = "none"),
          n.removeEventListener("focusout", o),
          n.removeEventListener("click", r);
      }),
      n.addEventListener("focusout", o),
      n.addEventListener("click", r);
  }),
  (gui._Item.prototype._addCtxFunctionality = function () {
    this._element.addEventListener("contextmenu", this._ctxShow);
  }),
  (gui.Btn.prototype._addCtxFunctionality = function () {
    this._prop.ctx.toggle
      ? this._element.addEventListener("click", (t) => {
          "block" === this._contextMenuItem._element.style.display
            ? this._ctxHide()
            : this._ctxShow(t);
        })
      : this._element.addEventListener("contextmenu", this._ctxShow);
  }),
  (gui._Item.prototype._removeCtxFunctionality = function () {
    this._element.removeEventListener("contextmenu", this._ctxShow),
      this._element.removeEventListener("click", this._ctxShow);
  }),
  addCSS(
    "\n[in=\"-1\"] {pointer-events:none}\n.controlWidth {z-index:10000;cursor:ew-resize;height:50%;width:0px;border-right:dotted 3px var(--colorBorder);position:absolute;right:-2.5px;top:25%}\n.controlHeight {z-index:10000;cursor:ns-resize;width:50%;height:0px;border-bottom:dotted 3px var(--colorBorder);position:absolute;bottom:-2.5px;left:25%}\n.controlMove {z-index:10000;cursor:move;width:50%;height:0px;border-top:solid 3px var(--colorBorder);position:absolute;top:-2.5px;left:25%}\n[man*='x'],[man*='y'] {cursor:move}\n"
  ),
  (gui.Bin.prototype._hasDescendant = function (t) {
    for (; (t = t._parent); ) if (t === this) return !0;
  }),
  (gui.disableFocus = function (t) {
    t.preventDefault(), t.stopPropagation();
  }),
  (gui.disableElement = function (t) {
    (t.style.pointerEvents = "none"),
      t.addEventListener("focusin", gui.disableFocus),
      (t === document.activeElement || t.contains(document.activeElement)) &&
        document.activeElement.blur();
  }),
  (gui.enableElement = function (t) {
    (t.style.pointerEvents = ""),
      t.removeEventListener("focusin", gui.disableFocus);
  }),
  (gui.Bin.prototype.in = function (t) {
    -1 === t
      ? gui.disableElement(this._outerElement)
      : this._disabled && gui.enableElement(this._outerElement);
  }),
  (gui._Item.prototype.fcs = function (t) {
    this._prop.in > 0 && (t ? this._content.focus() : this._content.blur());
  }),
  (gui.preventDefault = function (t) {
    t.preventDefault();
  }),
  (gui.POINTER_EVENTS = {
    mousemove: "p",
    mousedown: "pd",
    mouseup: "pu",
    click: "pc",
    dblclick: "pcc",
  }),
  (gui.sendEventXY = function (t) {
    if (!t.button) {
      var e,
        i,
        n = this._item,
        o = n._content.getBoundingClientRect(),
        r = gui.POINTER_EVENTS[t.type];
      (e = t.clientX - o.left),
        (i = t.clientY - o.top),
        n._prop.on[r][0] && (e = Math.round2(e, n._prop.on[r][0])),
        n._prop.on[r][1] && (i = Math.round2(i, n._prop.on[r][1])),
        (n["_lastX" + r] === e && n["_lastY" + r] === i) ||
          (n._event(r, [e, i], !0),
          (n["_lastX" + r] = e),
          (n["_lastY" + r] = i));
    }
  }),
  (gui.sendMouseButtonEvent = function (t) {
    if (t.button) {
      var e,
        i,
        n = this._item,
        o = n._content.getBoundingClientRect();
      (e = t.clientX - o.left),
        (i = t.clientY - o.top),
        n._event("mousedown" === t.type ? "md" : "mu", [
          1 === t.button ? 2 : 2 === t.button ? 1 : t.button,
          e,
          i,
        ]);
    }
  }),
  (gui.checkSx = function () {
    var t = this._item,
      e = gui.INFO.sx(t);
    t._prop.on.sx[0] && (e = Math.round2(e, t._prop.on.sx[0])),
      e !== t._prop.sx && ((t._prop.sx = e), t._event("sx", e, !0));
  }),
  (gui.checkSy = function () {
    var t = this._item,
      e = gui.INFO.sy(t);
    t._prop.on.sy[0] && (e = Math.round2(e, t._prop.on.sy[0])),
      e !== t._prop.sy && ((t._prop.sy = e), t._event("sy", e, !0));
  }),
  (gui._Item.prototype._checkProp = function (t) {
    var e = gui.INFO[t](this);
    (this._propOld[t] &&
      e[0] === this._propOld[t][0] &&
      e[1] === this._propOld[t][1]) ||
      ((this._propOld[t] = e), this._event(t, e));
  }),
  (gui.EVENTS = {
    v: {
      input: function (t) {
        this._item._event("v", this._item._prop.v);
      },
    },
    sx: { scroll: gui.checkSx },
    sy: { scroll: gui.checkSy },
    fold: null,
    fcs: {
      focus: function (t) {
        this._item._event("fcs", 1);
      },
      blur: function (t) {
        this._item._event("fcs", 0);
      },
    },
    po: {
      mouseenter: function (t) {
        this._item._event("po", 1);
      },
      mouseleave: function (t) {
        this._item._event("po", 0);
      },
    },
    p: { mousemove: gui.sendEventXY },
    pc: { click: gui.sendEventXY },
    pcc: { dblclick: gui.sendEventXY },
    pd: { mousedown: gui.sendEventXY },
    pu: { mouseup: gui.sendEventXY },
    md: { mousedown: gui.sendMouseButtonEvent },
    mu: { mouseup: gui.sendMouseButtonEvent },
    sw: {
      mousewheel: function (t) {
        t.wheelDeltaY && this._item._event("sw", t.wheelDeltaY > 0 ? 1 : 0);
      },
    },
    swh: {
      mousewheel: function (t) {
        t.wheelDeltaX && this._item._event("swh", t.wheelDeltaX > 0 ? 1 : 0);
      },
    },
    k: {
      keydown: function (t) {
        t.repeat || this._item._event("k", t.key);
      },
    },
    ku: {
      keyup: function (t) {
        t.repeat || this._item._event("ku", t.key);
      },
    },
  }),
  (gui._Item.prototype._event = function (t, e, i) {
    var n = this._prop.on[t];
    (i ||
      !n.length ||
      n.includes(e) ||
      (("md" === t || "mu" === t) && n.includes(e[0]))) &&
      this._sendMsg({ [t]: e });
  }),
  (gui._Item.prototype.on = function (t) {
    if (!t) for (var e in ((t = {}), this._on)) t[e] = null;
    for (var e in (this._on || (this._on = {}), t))
      if (((this._on[e] = t[e]), gui.EVENTS[e]))
        for (var i in gui.EVENTS[e])
          t[e]
            ? (("sx" === e || "sy" === e
                ? this._frame
                : this === gui.rootContainer
                ? document.body
                : "fcs" === e
                ? this._content
                : this._element
              ).addEventListener(i, gui.EVENTS[e][i]),
              ("md" !== e && "mu" !== e) ||
                (this === gui.rootContainer
                  ? document.body
                  : this._element
                ).addEventListener("contextmenu", gui.preventDefault))
            : (("sx" === e || "sy" === e
                ? this._frame
                : this === gui.rootContainer
                ? document.body
                : this._element
              ).removeEventListener(i, gui.EVENTS[e][i]),
              ("md" !== e && "mu" !== e) ||
                (this === gui.rootContainer
                  ? document.body
                  : this._element
                ).removeEventListener("contextmenu", gui.preventDefault)),
            (this._frame._item = this);
      else
        ("xy" !== e && "wh" !== e && "whc" !== e) ||
          (t[e]
            ? (this._propWatch.add(e), gui.propWatch.add(this))
            : this._propWatch.delete(e));
  }),
  addCSS(
    "\n.controlTitle {cursor:pointer;user-select:none;display:inline-block;width:1em;text-align:center;font-family:monospace;overflow:visible !important;background-color:var(--colorFalse);color:var(--color1);margin-right:1px}\n[fold=\"2\"]>.title {position:relative !important;display:block}\n[fold=\"2\"]>.title:after {content:\"...\";padding:2px;}\n[fold=\"2\"]>.frame {display:none}\n[fold=\"2\"] {max-height:2em !important;resize:none !important;}\n.controlFold:hover {background-color:var(--colorFalseHover)}\n[fold='1']>.title>.controlFold:before {content:'-'}\n[fold='2']>.title>.controlFold:before {content:'+'}\n.controlClose:hover {background-color:f33}\n.controlClose:before {content:'\\00d7'}\n"
  ),
  (gui.Bin.prototype.fold = function (t) {
    if (t && !this._manFold) {
      this._element;
      const t = this;
      (this._manFold = document.createElement("div")),
        this._title.prepend(this._manFold),
        this._manClose && this._title.prepend(this._manClose),
        (this._manFold.className = "controlTitle controlFold"),
        (this._manFold.onclick = function (e) {
          t._updateProp("fold", 3 - t._prop.fold),
            t._prop.on && t._prop.on.fold && t._event("fold", t._prop.fold);
        });
    } else
      !t && this._manFold && (this._manFold.remove(), delete this._manFold);
  }),
  (gui.Bin.prototype._userClosed = function () {
    this._sendMsg({ v: null }), this._parent._removeChild(this);
  }),
  (gui.Bin.prototype.cls = function (t) {
    if (t) {
      this._element;
      const t = this;
      (this._manClose = document.createElement("div")),
        this._title.prepend(this._manClose),
        (this._manClose.className = "controlTitle controlClose"),
        (this._manClose.onclick = function () {
          t._userClosed();
        });
    } else this._manClose && (this._manClose.remove(), delete this._manClose);
  }),
  (gui.Bin.prototype["<-"] = function (t) {
    if (t && t.constructor === Object)
      for (var e in t) {
        var i = t[e];
        if (i && i.constructor === Array)
          for (var n = 0; n < this._children.length && n < i.length; n++)
            this._children[n]._updateProp(e, i[n]);
      }
  }),
  addCSS(
    '\n[c=\'bin\']:not(tr)[in="1"] {cursor:pointer;user-select:none;-moz-user-select:none;}\n[btnin="0"] {pointer-events:none}\n[c=\'btn\'][in="0"] , [c=\'opt\'][in="0"] , [c=\'hold\'][in="0"] {opacity:.75;pointer-events:none}\n'
  ),
  (gui.Btn.prototype.in = function (t) {
    t > 0 ? this._setAttr("tabindex", 0) : this._setAttr("tabindex", null);
  }),
  (gui._Item.prototype.keys = function (t) {
    if (null == t || 0 == t.length) {
      for (var e of this._prop.keys) gui.keys[e] == this && delete gui.keys[e];
      0 == Object.keys(gui.keys).length &&
        (window.removeEventListener("keydown", gui.keyCheck),
        window.removeEventListener("keyup", gui.keyCheck));
    } else
      for (var e of (0 == Object.keys(gui.keys).length &&
        (window.addEventListener("keydown", gui.keyCheck),
        window.addEventListener("keyup", gui.keyCheck)),
      t))
        gui.keys[e] = this;
  }),
  (gui.keys = {}),
  (gui.keyCheck = function (t) {
    if (
      (!t.target.isContentEditable || 1 !== t.target._item._prop.in) &&
      (t.target.constructor !== HTMLInputElement || t.target.disabled)
    ) {
      var e = gui.keys[t.key];
      e &&
        (e._exists()
          ? (t.preventDefault(),
            t.stopPropagation(),
            t.repeat ||
              ("keydown" === t.type
                ? 2 === e._prop.fold
                  ? e._updateProp("fold", 1)
                  : 1 === e._prop.fold
                  ? e._updateProp("fold", 2)
                  : 0 !== e._prop.in &&
                    -1 !== e._prop.in &&
                    (e._content.focus(), e._btnDown && e._btnDown())
                : "keyup" === t.type && e._btnUp && e._btnUp()))
          : (delete gui.keys[t.key],
            0 === Object.keys(gui.keys).length &&
              (window.removeEventListener("keydown", gui.keyCheck),
              window.removeEventListener("keyup", gui.keyCheck))));
    }
  }),
  addCSS(
    "\n[c='dt'] * {display:inline-block;vertical-align:middle}\n[c='dt'] > .title:empty {width:0px;height:0px;overflow:hidden}\n[c='dt'] > .title:not(:empty) {border-bottom:solid 1px var(--colorBorder);vertical-align:bottom;margin-top:inherit;margin-right:.75em}\n[c='dt'] > .title:not(:empty) > span:after {content:\":\"}\n[c='dt'] > .content {display:inline-block}\n[c='dt'][unit]:after {content: attr(unit);font-size:80%;padding-left:2px;vertical-align:bottom}\n"
  ),
  (gui.Dt = class extends gui.Num {
    _initContent() {
      (this._element = document.createElement("div")),
        (this._frame = this._element),
        (this._title = this._frame.appendChild(document.createElement("div"))),
        (this._content = this._frame.appendChild(
          document.createElement("input")
        )),
        (this._content.type = "datetime-local"),
        (this._content.disabled = !0),
        this._parent._placeChildElement(this);
    }
    _initDefaults(t) {
      "v" in t || (this._classDefaults.v = localTimestamp()),
        super._initDefaults(t);
    }
    _display(t, e = 0, i = 0) {
      return (
        e && (t = i + Math.round2(t - i, e)),
        (t =
          e >= 86400
            ? new Date(1e3 * t).toJSON().substring(0, 10)
            : e >= 60
            ? new Date(1e3 * t).toJSON().substring(0, 16)
            : e >= 1
            ? new Date(1e3 * t).toJSON().substring(0, 19)
            : e >= 0.1
            ? new Date(1e3 * t).toJSON().substring(0, 21)
            : e >= 0.01
            ? new Date(1e3 * t).toJSON().substring(0, 22)
            : new Date(1e3 * t).toJSON().substring(0, 23))
      );
    }
    _adjustWidth() {}
    step(t) {
      this._prop.step < 0 && (this._prop.step *= -1),
        "max" in this._prop
          ? this._content.setAttribute(
              "max",
              this._display(this._prop.max, this._prop.step)
            )
          : this._content.removeAttribute("max"),
        "min" in this._prop
          ? this._content.setAttribute(
              "min",
              this._display(this._prop.min, this._prop.step)
            )
          : this._content.removeAttribute("min"),
        this._content.setAttribute(
          "step",
          this._prop.step >= 86400 ? this._prop.step / 86400 : this._prop.step
        ),
        this.v(this._prop.v);
    }
    v(t) {
      this._prop.step && this._prop.step >= 86400
        ? (this._content.type = "date")
        : (this._content.type = "datetime-local"),
        super.v(t);
    }
    in(t) {
      var e = this._content;
      if ((e._removeListeners(), t > 0)) {
        function i() {
          e._item._updateProp(
            "v",
            Date.parse(e.value.length > 10 ? e.value + "+00:00" : e.value) / 1e3
          ),
            e._item._sendMsg({ v: e._item._prop.v });
        }
        e.removeAttribute("disabled"),
          e._listen("blur", i),
          e._listen("keypress", (t) => {
            "Enter" == t.key && i();
          });
      } else e.setAttribute("disabled", "");
    }
  }),
  (gui.Dt.prototype._classDefaults = { c: "dt", v: localTimestamp() }),
  addCSS(
    "\n[c='time'] * {display:inline-block;vertical-align:middle}\n[c='time'] > .title:empty {width:0px;height:0px;overflow:hidden}\n[c='time'] > .title:not(:empty) {border-bottom:solid 1px var(--colorBorder);vertical-align:bottom;margin-top:inherit;margin-right:.75em}\n[c='time'] > .title:not(:empty) > span:after {content:\":\"}\n[c='time'] > .content {display:inline-block}\n[c='time'][unit]:after {content: attr(unit);font-size:80%;padding-left:2px;vertical-align:bottom}\n"
  ),
  (gui.Time = class extends gui.Num {
    _initContent() {
      (this._element = document.createElement("div")),
        (this._frame = this._element),
        (this._title = this._frame.appendChild(document.createElement("div"))),
        (this._content = this._frame.appendChild(
          document.createElement("input")
        )),
        (this._content.disabled = !0),
        this._parent._placeChildElement(this),
        (this._content.type = ""),
        this._content.setAttribute(
          "pattern",
          "(-)?(\\d+h)?[0-5]?\\d(m|(m[0-5]?\\d(\\.\\d+)?(s)?))?"
        ),
        (this._content.oninput = function () {
          this.reportValidity();
        });
    }
    _display(t, e = 0, i = 0) {
      var n = 0,
        o = 0,
        r = "";
      if (
        (t >= 3600
          ? ((n = Math.trunc(t / 3600)),
            (t = Math.abs(t - 3600 * n)),
            (r += n + "h"))
          : e >= 60 && (r = "0h"),
        t >= 60 && (t -= 60 * (o = Math.trunc(t / 60))),
        (r += r ? o.toString().padStart(2, "0") + "m" : o + "m"),
        e < 60)
      ) {
        if (e && e < 1) t = t.toFixed(e.toString().split(".")[1].length);
        else {
          let e = t.toString(),
            i = t.toFixed(3);
          t = e.length > i.length ? i : e;
        }
        1 === t.split(".")[0].length && (t = "0" + t),
          (r += t.toString().padStart(2, "0") + "s");
      }
      return r;
    }
    _adjustWidth(t) {
      this._content.setAttribute("size", t + 1);
    }
    step(t) {
      this._prop.step < 0 && (this._prop.step *= -1);
      var e = "Must be the following format: #h##m##.###s.\n";
      "min" in this._prop &&
        (e += "Minimum value: " + this._display(this._prop.min) + ".\n"),
        "max" in this._prop &&
          (e += "Maximum value: " + this._display(this._prop.max) + ".\n"),
        "step" in this._prop &&
          (e += "Step size: " + this._display(this._prop.step) + ".\n"),
        this._content.setAttribute("title", e),
        this.v(this._prop.v);
    }
    in(t) {
      var e = this._content;
      t > 0
        ? (e.removeAttribute("disabled"),
          (e.onchange = function () {
            if (this.reportValidity()) {
              var t = e.value,
                i = 0,
                n = 0,
                o = 0;
              t.includes("h") && (([i, t] = t.split("h")), (i = parseInt(i))),
                t.includes("m") &&
                  (([n, o] = t.split("m")),
                  (n = parseInt(n)),
                  (o = parseFloat(o) || 0)),
                e._item._updateProp("v", 3600 * i + 60 * n + o),
                e._item._sendMsg({ v: e._item._prop.v });
            }
          }))
        : e.setAttribute("disabled", "");
    }
  }),
  (gui.Time.prototype._classDefaults = { c: "time", v: 0 }),
  addCSS(
    "\n[c='hold']:hover {background-color:var(--colorFalseHover) !important;}\n[c='hold']:active {background-color:var(--colorTrue) !important;}\n[c='hold'] {text-align:center;display:inline-block;padding:.4em;color:var(--color1);border:1px solid rgba(0,0,0,0.2);background-color:var(--colorFalse);box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);vertical-align:middle;}\n[c='hold']:not(:empty),[select=\"0\"]:not(:empty) {min-width:100px;border-radius:4px;}\n[c='hold'][in]:empty {width:2em;height:2em;border-radius:2em;}\n"
  ),
  (gui.Hold = class extends gui.Btn {
    _btnDown() {
      this._boundTo._element.dispatchEvent(new Event("mousedown"));
    }
    _btnUp() {
      this._boundTo._element.dispatchEvent(new Event("mouseup"));
    }
    _bind(t) {
      var e = this;
      function i() {
        e._prop.v && (e._updateProp("v", !1), e._sendMsg({ v: !1 }));
      }
      (this._boundTo = t),
        this._unbind && this._unbind(),
        this._prop && t._setAttr("in", this._prop.in),
        (t._element.onmousedown = function (t) {
          e._updateProp("v", !0), e._sendMsg({ v: !0 });
        }),
        document.addEventListener("mouseup", i),
        (this._unbind = function () {
          (t._element.onmousedown = null),
            document.removeEventListener("mouseup", i);
        });
    }
    _addCtxFunctionality() {
      this._prop.ctx.toggle
        ? (this._element.addEventListener("mousedown", this._ctxShow),
          this._element.addEventListener("mouseup", (t) => this._ctxHide()))
        : this._element.addEventListener("contextmenu", this._ctxShow);
    }
    _removeCtxFunctionality() {
      this._element.removeEventListener("contextmenu", this._ctxShow),
        this._element.removeEventListener("mousedown", this._ctxShow),
        this._element.removeEventListener("mouseup", this._ctxShow);
    }
    v(t) {}
  }),
  (gui.Hold.prototype._classDefaults = { c: "hold", v: !1 }),
  addCSS(
    '\n[c=\'opt\'] {display:block;text-align:center}\n[c=\'opt\'] > .title {display:inline-block !important}\n[c=\'opt\']:not([v="true"]):before {content:"\\2610" " ";display:inline}\n[c=\'opt\'][v="true"]:before {content:"\\2611" " ";display:inline}\n[c=\'opt\'][grp]:not([v="true"]):before {content:"\\029be" " ";display:inline}\n[c=\'opt\'][grp][v="true"]:before {content:"\\029bf" " ";display:inline}\n'
  ),
  (gui.selectGroups = {}),
  (gui.Opt = class extends gui.Btn {
    _bind(t) {
      var e = this;
      (this._boundTo = t),
        this._unbind && this._unbind(),
        this._prop && t._setAttr("in", this._prop.in),
        (t._element.onclick = function () {
          e._prop.v
            ? (e._sendMsg({ v: !1 }), e._updateProp("v", !1))
            : (e._sendMsg({ v: !0 }), e._updateProp("v", !0));
        }),
        (this._unbind = function () {
          t._element.onclick = null;
        });
    }
    _addCtxFunctionality() {
      this._element.addEventListener("contextmenu", this._ctxShow);
    }
    cap(t) {
      super.cap(t),
        (null == t ? this._prop.id : t)
          ? (this._element.style.textAlign = "left")
          : (this._element.style.textAlign = "center");
    }
    v(t) {
      this._boundTo && this._boundTo !== this && this._boundTo._setAttr("v", t);
      var e = this._prop.grp;
      if (e) {
        var i = gui.selectGroups[e];
        t
          ? (i && i !== this && i._updateProp("v", !1),
            (gui.selectGroups[e] = this))
          : i === this && (gui.selectGroups[e] = void 0);
      }
    }
    grp(t) {}
  }),
  (gui.Opt.prototype._classDefaults = { c: "opt", v: !1 }),
  addCSS("\n[c='doc'] > .content {white-space:normal;}\n"),
  (gui.Doc = class extends gui.Txt {
    v(t) {
      this.in(this._prop.in);
    }
    in(t) {
      t > 0
        ? ((this._content.innerText = this._prop.v),
          gui.Txt.prototype.in.call(this, t))
        : this._content.getAttribute("contenteditable") &&
          (this._content.removeAttribute("contenteditable"),
          "md" == this._prop.fmt
            ? (this._content.innerHTML = gui.markdown(this._prop.v))
            : (this._content.innerHTML = this._prop.v));
    }
    fmt(t) {}
  }),
  (gui.Doc.prototype._classDefaults = { c: "doc", v: "" }),
  addCSS(
    '\ninput::file-selector-button {color:var(--color1);border:solid 1px var(--colorBorder);text-align:center;display:inline-block;padding:.4em;background-color:var(--colorFalse);vertical-align:middle;box-shadow:0px 0px 3px 1px rgba(0, 0, 0, 0.3);border-radius:4px;}\ninput::file-selector-button:hover {background-color:var(--colorFalseHover) !important;}\ninput::file-selector-button:active {background-color:var(--colorTrue) !important;}\ninput[type="file"] {background-color:var(--color0);color:var(--color1);border:none}\ninput[disabled]::file-selector-button {opacity:.75;pointer-events:none}\ninput:not([disabled])::file-selector-button {border:solid 1px var(--colorBorder)}\n'
  ),
  (gui.File = class extends gui.Txt {
    _initContent() {
      (this._element = document.createElement("div")),
        (this._title = this._element.appendChild(
          document.createElement("div")
        )),
        (this._content = this._element.appendChild(
          document.createElement("input")
        )),
        (this._frame = this._content),
        (this._outerElement = this._element),
        this._parent._placeChildElement(this),
        this._content.setAttribute("type", "file");
      var t = this;
      this._content.onchange = function (e) {
        if (e.target.files.length)
          if (
            !isNaN(t._prop.accepts) &&
            e.target.files.length > t._prop.accepts
          )
            alert(
              `You have chosen too many files.\nThe maximum number of files you can choose is ${t._prop.accepts}.`
            );
          else {
            var i = new FileReader(),
              n = e.target.files[0];
            if (
              ((i.onload = function () {
                let e = i.result;
                "text" === t._prop.accepts
                  ? (t._prop.v = e)
                  : isNaN(t._prop.accepts)
                  ? (t._prop.v = e.slice(e.indexOf(",") + 1))
                  : (s.file(n.name, e),
                    ++o < r.length
                      ? ((n = r[o]), i.readAsArrayBuffer(n))
                      : s
                          .generateAsync({
                            type: "base64",
                            compression: "DEFLATE",
                            compressionOptions: { level: 9 },
                          })
                          .then((e) => (t._prop.v = e))),
                  t._sendMsg({ v: t._prop.v });
              }),
              "text" === t._prop.accepts)
            )
              i.readAsText(n);
            else if (isNaN(t._prop.accepts)) i.readAsDataURL(n);
            else {
              var o = 0,
                r = e.target.files,
                s = gui.ZipArchive();
              i.readAsArrayBuffer(n);
            }
          }
      };
    }
    v(t) {}
    in(t) {
      t > 0
        ? this._content.removeAttribute("disabled")
        : this._content.setAttribute("disabled", "");
    }
    accepts(t) {
      isNaN(t) || t < 2
        ? this._content.removeAttribute("multiple")
        : this._content.setAttribute("multiple", "multiple");
    }
    fmt(t) {
      t
        ? this._content.setAttribute("accept", t)
        : this._content.removeAttribute("accept");
    }
  }),
  (gui.File.prototype._classDefaults = { c: "file", v: "" }),
  addCSS(
    "\nglass:last-of-type {z-index:10;position:absolute;top:0px;left:0px;background-color:rgba(255,255,255,.3);pointer-events:all;min-height:100%;min-width:100%}\n[c='win'] {z-index:10;position:absolute;width:350;height:250;max-width:90vw;max-height:90vh;border:solid 1px var(--colorBorder);border-radius:4px;padding:0px;background-color:var(--color0);box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);display:flex;flex-direction:column;overflow:auto;resize:both}\n[c='win']>.title {padding:5px; background:linear-gradient(#fff,#fff,#fff,#eee,#ddd)}\n[c='win']>.frame {margin:1em}\n.haswindows {min-height:400px;resize:both;overflow:auto}\n.hasglass {overflow:hidden}\nwin:last-of-type>.title {background:none;background-color:var(--colorTrue)}\n"
  ),
  (gui.focusedToTop = function (t) {
    var e = t.currentTarget;
    e._item._prop.i !== e._item._parent._children.length - 1 &&
      setTimeout(() => e.isConnected && e._item.i(-1), 150);
  }),
  (gui.Win = class extends gui.Bin {
    _initContent() {
      (this._element = document.createElement("win")),
        (this._title = this._element.appendChild(
          document.createElement("div")
        )),
        (this._frame = this._element.appendChild(
          document.createElement("div")
        )),
        (this._content = this._frame),
        this._parent._content.appendChild(this._element),
        (this._outerElement = this._element),
        document.activeElement.blur(),
        this._parent._element.classList.add("haswindows"),
        (this._parent._childWindowX = (this._parent._childWindowX || 0) + 25),
        (this._parent._childWindowY = (this._parent._childWindowY || 0) + 25),
        (this._element.style.left =
          this._parent._childWindowX + this._parent._content.scrollLeft + "px"),
        (this._element.style.top =
          this._parent._childWindowY + this._parent._content.scrollTop + "px"),
        this._element.addEventListener("mousedown", gui.focusedToTop),
        dragElement(this._element, this._title, "controlTitle");
    }
    _beforeRemove() {
      this._glass &&
        (this._glass.remove(),
        1 === this._parent._children.filter((t) => t._glass).length &&
          this._parent._frame.classList.remove("hasglass"),
        this._disableAllUnderGlass()),
        1 ==
          this._parent._children.filter((t) => t.constructor === gui.Win)
            .length && this._parent._element.classList.remove("haswindows"),
        super._beforeRemove();
    }
    _disableAllUnderGlass() {
      for (var t = this._frame, e = t.childElementCount, i = !1; e--; )
        i
          ? gui.disableElement(t.children[e])
          : "glass" === t.children[e].tagName
          ? (i = !0)
          : gui.enableElement(t.children[e]);
    }
    mod(t) {
      t && !this._glass
        ? ((this._glass = this._parent._frame.insertBefore(
            document.createElement("glass"),
            this._outerElement
          )),
          setTimeout(() => {
            (this._glass.style.width = this._parent._content.offsetWidth),
              (this._glass.style.height = this._parent._content.offsetHeight);
          }, 0),
          this._parent._frame.classList.add("hasglass"))
        : !t &&
          this._glass &&
          (this._parent._frame.classList.remove("hasglass"),
          this._glass.remove()),
        this._disableAllUnderGlass();
    }
    fold(t) {
      super.fold(t),
        2 === t
          ? ((this._oldTop = this._element.style.top),
            (this._element.style.top = ""),
            (this._element.style.bottom = 0))
          : 1 === t &&
            ((this._element.style.bottom = ""),
            this._oldTop && (this._element.style.top = this._oldTop));
    }
    i(t) {
      super.i(t),
        this._glass &&
          this._parent._content.insertBefore(this._glass, this._outerElement),
        this._disableAllUnderGlass();
    }
  }),
  (gui.Win.prototype._classDefaults = { c: "win", v: [] }),
  addCSS(
    '\n[c="one"] > .content > * {border:none !important}\n[c="one"] > .content > *:not([fold="1"]) {display:none}\n[c="one"] > .content > * > .title {display:none}\n[c="one"] > .frame {border: solid 1px var(--colorBorder);background-color:var(--color0)}\n.tabTitles {margin-top:5px;z-index:1;margin:4px}\n.tabTitles > span {border:solid 1px var(--colorBorder);border-radius:3px;font-size:70%;font-family:Arial;margin:4px;padding-left:10px;padding-right:10px;cursor:pointer;background-color:var(--colorHead)}\n.visibleTabTitle {border-bottom:none !important;font-weight:bold;padding-bottom:5.5px;background-color:var(--color0) !important;border-radius: 3px 3px 0px 0px !important;}\n'
  ),
  (gui.One = class extends gui.Bin {
    _switchTabs(t) {
      this._visibleTab &&
        ((this._visibleTab._tabTitle.className = ""),
        this._visibleTab._updateProp("fold", null)),
        (this._visibleTab = t),
        (t._tabTitle.className = "visibleTabTitle");
    }
    _updateTabTitles() {
      var t, e;
      for (t of (this._tabTitles
        ? (this._tabTitles.innerHTML = "")
        : ((this._tabTitles = this._element.insertBefore(
            document.createElement("div"),
            this._frame
          )),
          (this._tabTitles.className = "tabTitles")),
      this._children))
        ((e = this._tabTitles.appendChild(
          document.createElement("span")
        )).innerText = t._titleText.innerText),
          (e._item = t),
          (t._tabTitle = e),
          t === this._visibleTab && (e.className = "visibleTabTitle"),
          (e.onclick = function () {
            this._item._updateProp("fold", 1);
          });
    }
    _afterMove() {
      this._updateTabTitles();
    }
    _removeChild(t) {
      super._removeChild(t),
        t === this._visibleTab &&
          ((this._visibleTab = this._children[0]),
          this._visibleTab._updateProp("fold", 1)),
        this._updateTabTitles();
    }
    _newChild(t) {
      var e = gui.getType(t);
      if (!e || e == gui.Bin) {
        var i = 1 === t.fold || !this._visibleTab;
        delete t.fold;
        var n = new gui.Bin(t, this);
        this._children.includes(n) || this._children.push(n),
          (n.fold = function (t) {
            1 === t && this._parent._switchTabs(this);
          }),
          this._updateTabTitles(),
          i && (this._switchTabs(n), n._setAttr("fold", 1));
      }
    }
  }),
  (gui.One.prototype._classDefaults = { c: "one", v: [] }),
  addCSS(
    '\n[c="grid"] > .title:not(empty) {border-bottom:solid 1px var(--colorBorder);flex:none}\n[c="grid"] {display:flex;flex-direction:column}\n[c="grid"] > div {overflow:auto;flex:1 1 auto}\n[c="grid"] > .frame {max-height: 400px}\ntr {margin:0}\ntable {border-spacing:0;border-collapse:collapse;overflow:scroll !important}\nth {background:var(--colorHead);position:sticky;top:0;font:inherit;z-index:2}\ntd {background-clip:padding-box}\ntd,th {padding-right:1em; vertical-align:text-bottom}\ntd.title:empty {display:table-cell}\n'
  ),
  (gui.Grid = class extends gui.Bin {
    _initContent() {
      (this._element = document.createElement("div")),
        (this._title = this._element.appendChild(
          document.createElement("div")
        )),
        (this._frame = this._element.appendChild(
          document.createElement("div")
        )),
        (this._frame.style.overflow = "auto"),
        (this._content = this._frame.appendChild(
          document.createElement("table")
        )),
        this._parent._placeChildElement(this);
    }
    _newChild(t) {
      var e = gui.getType(t);
      if (!e || e == gui.Bin) {
        var i = new gui.GridRow(t, this);
        this._children.includes(i) || this._children.push(i);
      }
    }
    _floatRow(t) {
      var e = this.scrollTop
          ? "translate(0," + (this.scrollTop - 3) + "px)"
          : null,
        i = this.firstChild.firstChild.querySelectorAll("td");
      for (var n in i) i[n] && i[n].style && (i[n].style.transform = e);
    }
    rows(t) {
      for (
        var e = new Array(this._prop.cols || 1).fill(0);
        t > this._children.length;

      )
        this._newChild(e.map((t) => []));
    }
    cols(t) {
      for (var e of this._children)
        for (; t > e._children.length; ) e._newChild([]);
    }
  }),
  (gui.Grid.prototype._classDefaults = { c: "grid", v: [] }),
  (gui.GridRow = class extends gui.Bin {
    _initContent() {
      (this._element = document.createElement("tr")),
        (this._frame = this._element),
        (this._title = this._element.appendChild(document.createElement("td"))),
        (this._title2 = this._element.appendChild(
          document.createElement("td")
        )),
        (this._content = this._element),
        this._parent._placeChildElement(this);
    }
    _placeChildElement(t) {
      var e = this._content.appendChild(document.createElement("td"));
      e.appendChild(t._element), (t._outerElement = e);
    }
  }),
  (gui.GridRow.prototype._classDefaults = { c: "bin", v: [] }),
  addCSS(
    '\n  /* plot (with multiple data series inside) */\n[c="plot"] {width:fit-content;border:solid 1px #ddd;background-color:white;color:#444;}\n[c="plot"] > .title {text-align:center}\n[c="plot"] [c="data"] > .title {display:none}\n[c="plot"] > .content {display: grid}\n[c="plot"] [c="data"] {grid-column: 1;grid-row: 1;background-color:transparent !important}\n[c="plot"] [c="data"]:nth-child(1) {--colorData:blue}\n[c="plot"] [c="data"]:nth-child(2) {--colorData:orange}\n[c="plot"] [c="data"]:nth-child(3) {--colorData:green}\n[c="plot"] [c="data"]:nth-child(4) {--colorData:red}\n[c="plot"] [c="data"]:nth-child(5) {--colorData:purple}\n[c="plot"] [c="data"]:nth-child(6) {--colorData:brown}\n[c="plot"] [c="data"]:nth-child(7) {--colorData:pink}\n[c="plot"] [c="data"]:nth-child(8) {--colorData:gray}\n[c="plot"] [c="data"]:nth-child(9) {--colorData:olive}\n[c="plot"] [c="data"]:nth-child(10) {--colorData:cyan}\n  /* data and data points */\n[c="data"] {width:fit-content;border:solid 1px #ddd;background-color:white;color:#444;}\n[c="data"] > .title {text-align:center}\n[c="data"] > .frame {overflow:auto}\n[c="data"] > .frame > .content {width:300;height:200;margin:10px;padding:0px;overflow:visible}\n[c="data"] > .frame > .content {border-left:solid 1px black;border-bottom:solid 1px black;}\n[c="data"] svg {position:absolute;top:0px;left:0px;width:100%;height:100%;stroke:var(--colorData)}\n[c="dp"] {position:absolute;background-color:var(--colorData);min-width:2px;min-height:2px;transform:translateX(-50%);margin:0px;}\n[c="dp"] .title > span {padding-left:3px;}\n  /* column chart (default) */\n[c="data"]:not([plt="xy"]):not([plt="line"]):not([plt="box"]):not([plt="ohlc"]) [c="dp"] {bottom:0;width:var(--dpWidth)}\n  /* scatter and line charts */\n[plt="xy"] {--ef:0px}\n[plt="xy"] [c="dp"],[plt="line"] [c="dp"] {width:1px;height:1px;border-radius:100%;transform:translate(-50%,50%);}\n[plt="xy"] [c="dp"] {border:solid calc(3px + var(--ef)) var(--colorData)}\n  /* box chart */\n[plt="box"] [c="dp"] {border-radius:0;width:var(--dpWidth);transform:translateX(-50%) translateY(var(--boxBottomSize));}\n  /* ohlc chart */\n[plt="ohlc"] [c="dp"] {width:7px;background-color:transparent;border-color:green;--af:0px}\n[plt="ohlc"] [c="dp"] > .frame {width:7px;height:1px;border-color:inherit;border-width:1px;border-bottom-style:solid;display:block}\n[plt="ohlc"] [c="dp"]:before {content:\'\';background-color:transparent;border-color:inherit;border-width:1px;border-right-style:solid;width:4.5px;display:block;height:var(--errTop);position:absolute;bottom:calc(1px - var(--af));left:-1.5px}\n[plt="ohlc"] [c="dp"][af]:before {border-bottom-style:solid}\n[plt="ohlc"] [c="dp"]:after {content:\'\';background-color:transparent;border-color:inherit;border-width:1px;border-right-style:solid;width:3.5px;display:block;height:var(--errBottom);position:absolute;top:calc(1px + var(--af));left:0px;}\n[plt="ohlc"] [c="dp"][af="0"] , [plt="ohlc"] [c="dp"]:not([af]) {border-color:black}\n[plt="ohlc"] [c="dp"][af^="-"] {border-color:red}\n  /* error bars */\n[c="data"]:not([plt="ohlc"]) [c="dp"]:before {content:\'\';width:1px;height:var(--errTop);background:#444;position:absolute;bottom:100%;left:50%;margin:0px;border:none;padding:0px;margin-left:-0.5px}\n[c="data"]:not([plt="ohlc"]):not([plt="col"]) [c="dp"]:after {content:\'\';width:1px;height:var(--errBottom);background:#444;position:absolute;top:100%;left:50%;margin:0px;border:none;padding:0px;margin-left:-0.5px}\n  /* axes */\n[c="data"][axisx] > .frame, [axisx] [c="data"] > .frame {padding-bottom:2em}\n.axisX {height:2.5em;border:none;left:0px;top:100%;width:100%;position:absolute;margin:0px;overflow:visible;border-top:solid 1px gray}\n.axisXmarker {position:absolute;font-size:10px;top:3px;margin:0px;border:none;padding:0px;min-width:10px;min-height:10px}\n.axisXmarker[style~="left:"] {transform:translateX(-50%)}\n.axisXmarker[style~="right:"] {transform:translateX(50%)}\n.axisXmarker:before {content:\'\';width:1px;height:7px;background:#444;position:absolute;bottom:100%;left:50%;margin:0px;border:none;padding:0px;margin-left:-0.5px}\n.axisX > .title {text-align:center;position:relative;margin-top:1.2em;width:100%;font-size:10pt;display:block !important}\n[c="data"][axisy] > .frame, [axisy] [c="data"] > .frame {padding-left:2em;padding-top:1em;}\n.axisY {border:none;right:100%;top:0;height:100%;position:absolute;overflow:visible;width:1.1em;margin:0px;border-right:solid 1px gray}\n.axisYmarker {position:absolute;font-size:8px;right:4px;margin:0px;border:none;padding:0px;min-height:10px}\n.axisYmarker[style~="top:"] {transform:translateY(-50%)}\n.axisYmarker[style~="bottom:"] {transform:translateY(50%)}\n.axisYmarker:after {content:\'\';height:1px;width:7px;background:#444;position:absolute;right:-8px;top:50%;margin:0px;border:none;padding:0px;margin-top:-0.5px}\n.axisY > .title {right:100%;text-align:center;height:100%;writing-mode:vertical-rl;transform:rotate(180deg);font-size:10pt;display:block !important}\n'
  ),
  (gui.getAxisValuesOffsets = function (t, e, i, n) {
    if (t.v) return [t.v, [...t.v.keys()]];
    var o = [],
      r = [];
    if (t.step) var s = t.step;
    else {
      s = (i - e) / ((n || 6) - 1);
      let t = Math.max(
        e.toString().split(".")[1]?.length || 0,
        i.toString().split(".")[1]?.length || 0
      );
      s.toString().split(".")[1]?.length > t + 1 &&
        (s = parseFloat(s.toFixed(t + 1)));
    }
    for (let n = e, a = 0; a <= (i - e) / s; a++)
      r.push((gui.TYPES[t.c] || gui.Num).prototype._display(n, s, e || 0)),
        o.push(n),
        (n += s);
    return [r, o];
  }),
  (gui.Data = class extends gui.Bin {
    _initContent() {
      (this._element = document.createElement("div")),
        (this._title = this._element.appendChild(
          document.createElement("div")
        )),
        (this._frame = this._element.appendChild(
          document.createElement("div")
        )),
        (this._content = this._frame.appendChild(
          document.createElement("div")
        )),
        this._parent._placeChildElement(this),
        this._resetRatios();
    }
    _resetRatios() {
      (this._padX = 10),
        (this._padTop = 10),
        (this._minX = 0),
        (this._maxX = 0),
        (this._minY = 0),
        (this._maxY = 0),
        (this._pPerX = 20),
        (this._pPerY = 20);
    }
    _initDefaults(t) {
      super._initDefaults(t),
        IMPLEMENTED.plt.includes(t.plt) || (t.plt = "col");
    }
    _newChild(t) {
      var e = gui.getType(t);
      if (!e || e == gui.Num || e == gui.Dp) {
        var i = new gui.Dp(t, this);
        this._children.includes(i) || this._children.push(i);
      }
    }
    _scheduleAxisXUpdate() {
      var t = "plot" === this._parent._prop.c ? this._parent : this;
      clearTimeout(t._axisXupdateTimeout),
        (t._axisXupdateTimeout = setTimeout(() => {
          t._axisXUpdate();
        }, 20));
    }
    _scheduleAxisYUpdate() {
      var t = "plot" === this._parent._prop.c ? this._parent : this;
      clearTimeout(t._axisYupdateTimeout),
        (t._axisYupdateTimeout = setTimeout(() => {
          t._axisYUpdate();
        }, 20));
    }
    _getXs() {
      return this._children.map((t) =>
        "number" == typeof t._prop.x ? t._prop.x : t._getIndex()
      );
    }
    _axisXUpdate() {
      var t = this._getXs();
      this._prop.axisx
        ? this._prop.axisx.v
          ? ((this._axisXvaluesAndOffsets = gui.getAxisValuesOffsets(
              this._prop.axisx
            )),
            (this._minX = 0),
            (this._maxX = this._prop.axisx.v.length))
          : ((this._minX =
              "number" == typeof this._prop.axisx.min
                ? this._prop.axisx.min
                : Math.min(...t)),
            (this._maxX =
              "number" == typeof this._prop.axisx.max
                ? this._prop.axisx.max
                : Math.max(...t)),
            (this._axisXvaluesAndOffsets = gui.getAxisValuesOffsets(
              this._prop.axisx,
              this._minX,
              this._maxX,
              t.length
            )))
        : ((this._minX = Math.min(...t)), (this._maxX = Math.max(...t)));
      var e = this._content.getBoundingClientRect();
      if ("col" === this._prop.plt || "box" === this._prop.plt) {
        t.sort((t, e) => t - e);
        var i = t.reduce(
            ([t, e], i) => [Math.min(t, i - e), i],
            [9e9, -9e9]
          )[0],
          n = this._maxX - this._minX + i;
        (this._pPerX = (e.width - 20) / n),
          (this._padX = 10 + (this._pPerX * i) / 2),
          this._element.style.setProperty("--dpWidth", this._pPerX * i - 10);
      } else
        (this._pPerX = (e.width - 20) / (this._maxX - this._minX)),
          (this._padX = 10);
      this._redrawX();
    }
    _getMinY() {
      var t,
        e = 0;
      for (var i of this._children)
        (t =
          "number" == typeof i._prop.err
            ? i._prop.err
            : i._prop?.err?.constructor === Array
            ? Math.max(i._prop.err[1] || 0, i._prop.err[3] || 0)
            : 0),
          (e = Math.min(e, i._prop.v - t));
      return Math.floor(e);
    }
    _getMaxY() {
      var t,
        e = -9e9;
      for (var i of this._children)
        (t =
          "number" == typeof i._prop.err
            ? i._prop.err
            : i._prop?.err?.constructor === Array
            ? Math.max(i._prop.err[0] || 0, i._prop.err[2] || 0)
            : 0),
          (e = Math.max(e, i._prop.v + t));
      return Math.ceil(e);
    }
    _axisYUpdate() {
      this._prop.axisy
        ? this._prop.axisy.v
          ? ((this._axisYvaluesAndOffsets = gui.getAxisValuesOffsets(
              this._prop.axisy
            )),
            (this._minY = 0),
            (this._maxY = this._prop.axisy.v.length))
          : ((this._minY =
              "number" == typeof this._prop.axisy.min
                ? this._prop.axisy.min
                : this._getMinY()),
            (this._maxY =
              "number" == typeof this._prop.axisy.max
                ? this._prop.axisy.max
                : this._getMaxY()),
            (this._axisYvaluesAndOffsets = gui.getAxisValuesOffsets(
              this._prop.axisy,
              this._minY,
              this._maxY
            )))
        : ((this._minY = this._getMinY()), (this._maxY = this._getMaxY()));
      var t = this._content.getBoundingClientRect().height - this._padTop;
      (this._pPerY = t / (this._maxY - this._minY)), this._redrawY();
    }
    _redrawX() {
      this._axisX && this._drawAxisX(),
        this._children.forEach((t) => t._redrawX());
    }
    _redrawY() {
      this._axisY && this._drawAxisY(),
        this._children.forEach((t) => t._redrawY());
    }
    _drawLines() {
      this._svg ||
        ((this._svg = createSVG("svg")),
        this._content.insertBefore(this._svg, this._content.firstChild)),
        this._line ||
          (this._line = this._svg.appendChild(createSVG("polyline")));
      try {
        var t = this._svg.getBoundingClientRect().height,
          e = this._children.map((e) => [
            parseFloat(e._element.style.left),
            t - parseFloat(e._element.style.bottom),
          ]);
        this._line.setAttribute("points", e);
      } catch (t) {}
    }
    _drawAxisX() {
      for (var t = this._axisX.children.length; t--; )
        "axisXmarker" === this._axisX.children[t].className &&
          this._axisX.children[t].remove();
      var [e, i] =
        this._axisXvaluesAndOffsets || this._parent._axisXvaluesAndOffsets;
      for (t = 0; t < e.length; t++) {
        var n = this._axisX.appendChild(document.createElement("div"));
        (n.innerHTML = e[t]),
          (n.style.left =
            (this._parent._padX || this._padX) +
            (i[t] - this._minX) * this._pPerX +
            "px"),
          n.setAttribute("title", n.innerHTML),
          n.classList.add("axisXmarker");
      }
    }
    _drawAxisY() {
      for (var t = this._axisY.children.length; t--; )
        "axisYmarker" === this._axisY.children[t].className &&
          this._axisY.children[t].remove();
      var [e, i] =
        this._axisYvaluesAndOffsets || this._parent._axisYvaluesAndOffsets;
      for (t = 0; t < e.length; t++) {
        var n = this._axisY.appendChild(document.createElement("div"));
        (n.innerHTML = e[t]),
          (n.style.bottom = (i[t] - this._minY) * this._pPerY + "px"),
          n.setAttribute("title", n.innerHTML),
          n.classList.add("axisYmarker");
      }
    }
    axisx(t) {
      if (null === t && this._axisX)
        this._axisX.remove(), delete this._axisX, this._scheduleAxisXUpdate();
      else if (t && t.constructor === Object) {
        if (
          (this._axisX ||
            ((this._axisX = this._content.appendChild(
              document.createElement("div")
            )),
            this._axisX.setAttribute("class", "axisX")),
          "cap" in t || "unit" in t)
        ) {
          var e = t.cap || "";
          t.unit && ":" !== t.unit[0] && (e = e + " (" + t.unit + ")"),
            e
              ? (this._axisX._title ||
                  ((this._axisX._title = this._axisX.appendChild(
                    document.createElement("div")
                  )),
                  this._axisX._title.setAttribute("class", "title")),
                (this._axisX._title.innerHTML = e))
              : this._axisX._title && this._axisX._title.remove();
        }
        ("x" in t ||
          "v" in t ||
          "max" in t ||
          "min" in t ||
          "step" in t ||
          "c" in t) &&
          this._scheduleAxisXUpdate();
      }
    }
    axisy(t) {
      if (null === t && this._axisY)
        this._axisY.remove(), delete this._axisY, this._scheduleAxisYUpdate();
      else if (t && t.constructor === Object) {
        if (
          (this._axisY ||
            ((this._axisY = this._content.appendChild(
              document.createElement("div")
            )),
            this._axisY.setAttribute("class", "axisY")),
          "cap" in t || "unit" in t)
        ) {
          var e = t.cap || "";
          t.unit && ":" !== t.unit[0] && (e = e + " (" + t.unit + ")"),
            e
              ? (this._axisY._title ||
                  ((this._axisY._title = this._axisY.appendChild(
                    document.createElement("div")
                  )),
                  this._axisY._title.setAttribute("class", "title")),
                (this._axisY._title.innerHTML = e))
              : this._axisY._title && this._axisY._title.remove();
        }
        ("y" in t ||
          "v" in t ||
          "max" in t ||
          "min" in t ||
          "step" in t ||
          "c" in t) &&
          this._scheduleAxisYUpdate();
      }
    }
    plt(t) {
      "line" !== t && this._svg && (this._svg.remove(), delete this._svg),
        this._scheduleAxisXUpdate(),
        this._scheduleAxisYUpdate();
    }
  }),
  (gui.Data.prototype._classDefaults = { c: "data", v: [] }),
  (gui.Dp = class extends gui.Num {
    _initContent() {
      (this._element = document.createElement("div")),
        (this._title =
          this._frame =
          this._content =
            this._element.appendChild(document.createElement("div"))),
        this._parent._placeChildElement(this);
    }
    _redrawX() {
      (this._element.style.left = this._element.style.width = ""),
        this.x(this._prop.x, !0);
    }
    _redrawY() {
      (this._element.style.bottom = this._element.style.height = ""),
        this.v(this._prop.v, !0),
        this.err(this._prop.err, !0);
    }
    v(t, e) {
      this._setAttr("title", t);
      let i = (t - this._parent._minY) * this._parent._pPerY + "px",
        n = this._parent._prop.plt;
      "xy" === n || "box" === n || "ohlc" === n
        ? (this._element.style.bottom = i)
        : "line" === n
        ? ((this._element.style.bottom = i), this._parent._drawLines())
        : (this._element.style.height = i),
        e || this._parent._scheduleAxisYUpdate();
    }
    x(t, e) {
      "number" != typeof t && (t = this._getIndex()),
        (this._element.style.left =
          this._parent._padX +
          (t - this._parent._minX) * this._parent._pPerX +
          "px"),
        "line" === this._parent._prop.plt && this._parent._drawLines(),
        e || this._parent._scheduleAxisXUpdate();
    }
    err(t, e) {
      t
        ? (t.constructor === Number && (t = [t, t]),
          t.constructor === Array &&
            ("box" === this._parent._prop.plt
              ? (this._element.style.setProperty(
                  "--boxBottomSize",
                  t[1] * this._parent._pPerY + "px"
                ),
                (this._element.style.height =
                  (t[0] + t[1]) * this._parent._pPerY),
                this._element.style.setProperty(
                  "--errTop",
                  t[2] * this._parent._pPerY
                ),
                this._element.style.setProperty(
                  "--errBottom",
                  t[3] * this._parent._pPerY
                ))
              : (this._element.style.setProperty(
                  "--errTop",
                  t[0] * this._parent._pPerY
                ),
                this._element.style.setProperty(
                  "--errBottom",
                  t[1] * this._parent._pPerY
                ),
                this._prop.af &&
                  "ohlc" === this._parent._prop.plt &&
                  this.af(this._prop.af))))
        : (this._element.style.setProperty("--errTop", 0),
          this._element.style.setProperty("--errBottom", 0),
          this._element.style.setProperty("--boxBottomSize", 0)),
        e || this._parent._scheduleAxisYUpdate();
    }
    af(t) {
      "ohlc" === this._parent._prop.plt &&
        ((t *= this._parent._pPerY),
        this._element.style.setProperty("--af", t + "px"),
        this._element.style.setProperty(
          "--errTop",
          parseFloat(this._element.style.getPropertyValue("--errTop")) +
            t +
            "px"
        ),
        this._element.style.setProperty(
          "--errBottom",
          parseFloat(this._element.style.getPropertyValue("--errBottom")) -
            t +
            "px"
        ));
    }
    ef(t) {
      "xy" === this._parent._prop.plt &&
        ("number" == typeof t
          ? ((t = Math.min(1, Math.max(0, t))),
            (t *= 10),
            this._element.style.setProperty("--ef", t + "px"))
          : this._element.style.removeProperty("--ef"));
    }
    i(t) {
      super.i(t), this._parent._children.forEach((t) => t._redrawX());
    }
  }),
  (gui.Dp.prototype._classDefaults = { c: "dp", v: 0 }),
  (gui.Plot = class extends gui.Bin {
    _newChild(t) {
      var e = gui.getType(t);
      if (!e || e == gui.Bin || e == gui.Data) {
        var i = new gui.Data(t, this);
        this._children.includes(i) || this._children.push(i);
      }
    }
    _scheduleAxisXUpdate() {
      var t = this;
      clearTimeout(t._axisXupdateTimeout),
        (t._axisXupdateTimeout = setTimeout(() => {
          t._axisXUpdate();
        }, 20));
    }
    _scheduleAxisYUpdate() {
      var t = this;
      clearTimeout(t._axisYupdateTimeout),
        (t._axisYupdateTimeout = setTimeout(() => {
          t._axisYUpdate();
        }, 20));
    }
    axisx(t) {
      this._children[0].axisx(t);
    }
    axisy(t) {
      this._children[0].axisy(t);
    }
    _getMinX() {
      return Math.min(...this._children.map((t) => Math.min(...t._getXs())));
    }
    _getMaxX() {
      return Math.max(...this._children.map((t) => Math.max(...t._getXs())));
    }
    _axisXUpdate() {
      this._prop.axisx
        ? this._prop.axisx.v
          ? ((this._axisXvaluesAndOffsets = gui.getAxisValuesOffsets(
              this._prop.axisx
            )),
            (this._minX = 0),
            (this._maxX = this._prop.axisx.v.length))
          : ((this._minX =
              "number" == typeof this._prop.axisx.min
                ? this._prop.axisx.min
                : this._getMinX()),
            (this._maxX =
              "number" == typeof this._prop.axisx.max
                ? this._prop.axisx.max
                : this._getMaxX()),
            (this._axisXvaluesAndOffsets = gui.getAxisValuesOffsets(
              this._prop.axisx,
              this._minX,
              this._maxX,
              Math.max(...this._children.map((t) => t._children.length))
            )))
        : ((this._minX = this._getMinX()), (this._maxX = this._getMaxX()));
      var t = this._children[0]._content.getBoundingClientRect(),
        e = this._children.filter(
          (t) => "col" === t._prop.plt || "box" === t._prop.plt
        );
      if (e.length) {
        var i,
          n = 9e9;
        for (let t of e)
          (i = t._getXs()).sort((t, e) => t - e),
            (n = Math.min(
              n,
              i.reduce(([t, e], i) => [Math.min(t, i - e), i], [9e9, -9e9])[0]
            )),
            console.log("" + i, n);
        var o = this._maxX - this._minX + n;
        (this._pPerX = (t.width - 20) / o),
          (this._padX = 10 + (this._pPerX * n) / 2);
        var r = this._pPerX * n - 10,
          s = r / e.length;
        this._element.style.setProperty("--dpWidth", s);
        for (let t = 0; t < e.length; t++) {
          e[t]._padX = this._padX + t * s - r / 2 + s / 2;
        }
        this._children
          .filter((t) => "col" !== t._prop.plt && "box" !== t._prop.plt)
          .forEach((t) => {
            t._padX = this._padX;
          });
      } else
        (this._pPerX = (t.width - 20) / (this._maxX - this._minX)),
          (this._padX = 10),
          this._children.forEach((t) => {
            t._padX = this._padX;
          });
      this._children.forEach((t) => {
        (t._minX = this._minX),
          (t._maxX = this._maxX),
          (t._pPerX = this._pPerX),
          t._redrawX();
      });
    }
    _getMinY() {
      return Math.min(...this._children.map((t) => t._getMinY()));
    }
    _getMaxY() {
      return Math.max(...this._children.map((t) => t._getMaxY()));
    }
    _axisYUpdate() {
      this._prop.axisy
        ? this._prop.axisy.v
          ? ((this._axisYvaluesAndOffsets = gui.getAxisValuesOffsets(
              this._prop.axisy
            )),
            (this._minY = 0),
            (this._maxY = this._prop.axisy.v.length))
          : ((this._minY =
              "number" == typeof this._prop.axisy.min
                ? this._prop.axisy.min
                : this._getMinY()),
            (this._maxY =
              "number" == typeof this._prop.axisy.max
                ? this._prop.axisy.max
                : this._getMaxY()),
            (this._axisYvaluesAndOffsets = gui.getAxisValuesOffsets(
              this._prop.axisy,
              this._minY,
              this._maxY
            )))
        : ((this._minY = this._getMinY()), (this._maxY = this._getMaxY()));
      var t = this._children[0]._content.getBoundingClientRect(),
        e = t.height - 10;
      (this._pPerY = e / (this._maxY - this._minY)),
        console.log("bounds", this._minY, this._maxY),
        console.log(t.height, e, this._pPerY),
        this._children.forEach((t) => {
          (t._minY = this._minY),
            (t._maxY = this._maxY),
            (t._pPerY = this._pPerY),
            t._redrawY();
        });
    }
  }),
  (gui.Plot.prototype.axisx = gui.Plot.prototype.axisx),
  (gui.Plot.prototype._classDefaults = { c: "plot", v: [] }),
  (gui.animationStep = function (t, e) {
    const i = e._item,
      n = i._prop[e._velocityPropName];
    if (i._exists() && "number" == typeof n) {
      var o = e._currentValue + n * t,
        r = "number" == typeof e.min ? e.min : i._prop.min;
      if ("number" == typeof r && o <= r) return void i._stopAnimation(e, r, n);
      var s = "number" == typeof e.max ? e.max : i._prop.max;
      if ("number" == typeof s && o >= s) return void i._stopAnimation(e, s, n);
      e._currentValue = o;
      var a = e.step || i._prop.step;
      a
        ? Math.abs(e._item._prop[e._propName] - o) >= a &&
          ((e._item._prop[e._propName] = o), e._item[e._propName](o))
        : ((e._item._prop[e._propName] = o), e._item[e._propName](o)),
        e["++"] &&
          e["++"].constructor === Number &&
          (i._prop[e._velocityPropName] += e["++"] * t);
    } else gui.animations.delete(e);
  }),
  (gui._Item.prototype._stopAnimation = function (t, e, i) {
    gui.animations.delete(t),
      (t._item._prop[t._propName] = t._currentValue = e),
      t._item[t._propName](e),
      (i = i.toString()),
      (t._item._prop[t._velocityPropName] = i),
      t.r
        ? this.R(t.r, { [t._velocityPropName]: i })
        : this._sendMsg({ [t._velocityPropName]: i });
  }),
  (gui._Item.prototype._startAnimation = function (t, e) {
    if ("number" == typeof e) {
      const e = "+" + t + "|";
      this._prop[e] || (this._prop[e] = {});
      var i = this._prop[e];
      hiddenProp(i, "_item", this),
        hiddenProp(i, "_propName", t),
        hiddenProp(i, "_velocityPropName", "+" + t),
        hiddenProp(i, "_currentValue", this._prop[t] || 0),
        gui.animations.add(i);
    }
  }),
  (gui.Num.prototype["+v"] = function (t) {
    this._startAnimation("v", t);
  }),
  (gui.Num.prototype["+v|"] = function () {}),
  (gui.Dp.prototype["+x"] = function (t) {
    this._startAnimation("x", t);
  }),
  (gui.Dp.prototype["+x|"] = function () {});
//# sourceMappingURL=/sm/e5e4250799e3d7f52e0464794d997dca397b5b62f47be49f06550885cbd7c2bb.map
