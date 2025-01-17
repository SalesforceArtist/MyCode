/*! modernizr 3.0.0-alpha.4 (Custom Build) | MIT *
 * http://modernizr.com/download/#-adownload-ambientlight-animation-apng-appearance-applicationcache-audio-audioloop-audiopreload-backgroundblendmode-backgroundcliptext-backgroundsize-batteryapi-beacon-bgpositionshorthand-bgpositionxy-bgrepeatspace_bgrepeatround-bgsizecover-blobconstructor-bloburls-blobworkers-borderimage-borderradius-boxshadow-boxsizing-canvas-canvasblending-canvastext-canvaswinding-capture-checked-classlist-contains-contenteditable-contextmenu-cookies-cors-createelementattrs_createelement_attrs-cssall-cssanimations-csscalc-csschunit-csscolumns-cssescape-cssexunit-cssfilters-cssgradients-csshyphens_softhyphens_softhyphensfind-cssinvalid-cssmask-csspointerevents-csspositionsticky-csspseudoanimations-csspseudotransitions-cssreflections-cssremunit-cssresize-cssscrollbar-csstransforms-csstransforms3d-csstransitions-cssvalid-cssvhunit-cssvmaxunit-cssvminunit-cssvwunit-cubicbezierrange-customevent-customprotocolhandler-dart-datachannel-datalistelem-dataset-datauri-dataview-dataworkers-details-devicemotion_deviceorientation-directory-display_runin-displaytable-documentfragment-ellipsis-emoji-es5-es5array-es5date-es5function-es5object-es5string-es5syntax-es5undefined-es6array-es6math-es6number-es6object-es6string-eventlistener-eventsource-exiforientation-fetch-fileinput-filereader-filesystem-flash-flexbox-flexboxlegacy-flexboxtweener-flexwrap-fontface-formattribute-formvalidation-framed-fullscreen-gamepads-generatedcontent-generators-geolocation-getrandomvalues-getusermedia-hashchange-hidden-hiddenscroll-history-hsla-htmlimports-ie8compat-indexeddb-indexeddbblob-inlinesvg-input-inputformaction-inputformenctype-inputformmethod-inputformtarget-inputtypes-intl-jpegxr-json-lastchild-localizednumber-localstorage-lowbandwidth-lowbattery-matchmedia-mathml-mediaqueries-microdata-multiplebgs-mutationobserver-notification-nthchild-objectfit-olreversed-oninput-opacity-outputelem-overflowscrolling-pagevisibility-peerconnection-performance-picture-placeholder-pointerevents-pointerlock-postmessage-preserve3d-progressbar_meter-promises-proximity-queryselector-quotamanagement-regions-requestanimationframe-requestautocomplete-rgba-ruby-sandbox-scriptasync-scriptdefer-seamless-search-serviceworker-sessionstorage-shapes-sharedworkers-siblinggeneral-sizes-smil-speechrecognition-speechsynthesis-srcdoc-srcset-strictmode-stylescoped-subpixelfont-supports-svg-svgasimg-svgclippaths-svgfilters-svgforeignobject-target-template-templatestrings-textalignlast-textareamaxlength-textshadow-texttrackapi_track-time-todataurljpeg_todataurlpng_todataurlwebp-touchevents-transferables-typedarrays-unicode-unicoderange-unknownelements-urlparser-userdata-userselect-vibrate-video-videoautoplay-videoloop-videopreload-vml-webaudio-webgl-webglextensions-webintents-webp-webpalpha-webpanimation-webplossless_webp_lossless-websockets-websocketsbinary-websqldatabase-webworkers-willchange-wrapflow-xhr2-xhrresponsetype-xhrresponsetypearraybuffer-xhrresponsetypeblob-xhrresponsetypedocument-xhrresponsetypejson-xhrresponsetypetext-addtest-atrule-domprefixes-hasevent-mq-prefixed-prefixedcss-prefixes-shiv-testallprops-testprop-teststyles !*/
! function(window, document, undefined) {
  function is(e, t) {
    return typeof e === t
  }

  function testRunner() {
    var e, t, n, r, o, i, d;
    for (var a in tests) {
      if (e = [], t = tests[a], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
        for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
      for (r = is(t.fn, "function") ? t.fn() : t.fn, o = 0; o < e.length; o++) i = e[o], d = i.split("."), 1 === d.length ? Modernizr[d[0]] = r : (!Modernizr[d[0]] || Modernizr[d[0]] instanceof Boolean || (Modernizr[d[0]] = new Boolean(Modernizr[d[0]])), Modernizr[d[0]][d[1]] = r), classes.push((r ? "" : "no-") + d.join("-"))
    }
  }

  function setClasses(e) {
    var t = docElement.className,
      n = Modernizr._config.classPrefix || "";
    if (isSVG && (t = t.baseVal), Modernizr._config.enableJSClass) {
      var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
      t = t.replace(r, "$1" + n + "js$2")
    }
    Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), isSVG ? docElement.className.baseVal = t : docElement.className = t)
  }

  function addTest(e, t) {
    if ("object" == typeof e)
      for (var n in e) hasOwnProp(e, n) && addTest(n, e[n]);
    else {
      e = e.toLowerCase();
      var r = e.split("."),
        o = Modernizr[r[0]];
      if (2 == r.length && (o = o[r[1]]), "undefined" != typeof o) return Modernizr;
      t = "function" == typeof t ? t() : t, 1 == r.length ? Modernizr[r[0]] = t : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = t), setClasses([(t && 0 != t ? "" : "no-") + r.join("-")]), Modernizr._trigger(e, t)
    }
    return Modernizr
  }

  function createElement() {
    return "function" != typeof document.createElement ? document.createElement(arguments[0]) : isSVG ? document.createElementNS.call(document, "http://www.w3.org/2000/svg", arguments[0]) : document.createElement.apply(document, arguments)
  }

  function cssToDOM(e) {
    return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
      return t + n.toUpperCase()
    }).replace(/^-/, "")
  }

  function domToCSS(e) {
    return e.replace(/([A-Z])/g, function(e, t) {
      return "-" + t.toLowerCase()
    }).replace(/^ms-/, "-ms-")
  }

  function getBody() {
    var e = document.body;
    return e || (e = createElement(isSVG ? "svg" : "body"), e.fake = !0), e
  }

  function injectElementWithStyles(e, t, n, r) {
    var o, i, d, a, s = "modernizr",
      A = createElement("div"),
      l = getBody();
    if (parseInt(n, 10))
      for (; n--;) d = createElement("div"), d.id = r ? r[n] : s + (n + 1), A.appendChild(d);
    return o = createElement("style"), o.type = "text/css", o.id = "s" + s, (l.fake ? l : A).appendChild(o), l.appendChild(A), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(document.createTextNode(e)), A.id = s, l.fake && (l.style.background = "", l.style.overflow = "hidden", a = docElement.style.overflow, docElement.style.overflow = "hidden", docElement.appendChild(l)), i = t(A, e), l.fake ? (l.parentNode.removeChild(l), docElement.style.overflow = a, docElement.offsetHeight) : A.parentNode.removeChild(A), !!i
  }

  function contains(e, t) {
    return !!~("" + e).indexOf(t)
  }

  function roundedEquals(e, t) {
    return e - 1 === t || e === t || e + 1 === t
  }

  function nativeTestProps(e, t) {
    var n = e.length;
    if ("CSS" in window && "supports" in window.CSS) {
      for (; n--;)
        if (window.CSS.supports(domToCSS(e[n]), t)) return !0;
      return !1
    }
    if ("CSSSupportsRule" in window) {
      for (var r = []; n--;) r.push("(" + domToCSS(e[n]) + ":" + t + ")");
      return r = r.join(" or "), injectElementWithStyles("@supports (" + r + ") { #modernizr { position: absolute; } }", function(e) {
        return "absolute" == getComputedStyle(e, null).position
      })
    }
    return undefined
  }

  function testProps(e, t, n, r) {
    function o() {
      d && (delete mStyle.style, delete mStyle.modElem)
    }
    if (r = is(r, "undefined") ? !1 : r, !is(n, "undefined")) {
      var i = nativeTestProps(e, n);
      if (!is(i, "undefined")) return i
    }
    for (var d, a, s, A, l, c = ["modernizr", "tspan"]; !mStyle.style;) d = !0, mStyle.modElem = createElement(c.shift()), mStyle.style = mStyle.modElem.style;
    for (s = e.length, a = 0; s > a; a++)
      if (A = e[a], l = mStyle.style[A], contains(A, "-") && (A = cssToDOM(A)), mStyle.style[A] !== undefined) {
        if (r || is(n, "undefined")) return o(), "pfx" == t ? A : !0;
        try {
          mStyle.style[A] = n
        } catch (u) {}
        if (mStyle.style[A] != l) return o(), "pfx" == t ? A : !0
      }
    return o(), !1
  }

  function fnBind(e, t) {
    return function() {
      return e.apply(t, arguments)
    }
  }

  function testDOMProps(e, t, n) {
    var r;
    for (var o in e)
      if (e[o] in t) return n === !1 ? e[o] : (r = t[e[o]], is(r, "function") ? fnBind(r, n || t) : r);
    return !1
  }

  function testPropsAll(e, t, n, r, o) {
    var i = e.charAt(0).toUpperCase() + e.slice(1),
      d = (e + " " + cssomPrefixes.join(i + " ") + i).split(" ");
    return is(t, "string") || is(t, "undefined") ? testProps(d, t, r, o) : (d = (e + " " + domPrefixes.join(i + " ") + i).split(" "), testDOMProps(d, t, n))
  }

  function testAllProps(e, t, n) {
    return testPropsAll(e, undefined, undefined, t, n)
  }
  var classes = [],
    tests = [],
    ModernizrProto = {
      _version: "3.0.0-alpha.4",
      _config: {
        classPrefix: "",
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0
      },
      _q: [],
      on: function(e, t) {
        var n = this;
        setTimeout(function() {
          t(n[e])
        }, 0)
      },
      addTest: function(e, t, n) {
        tests.push({
          name: e,
          fn: t,
          options: n
        })
      },
      addAsyncTest: function(e) {
        tests.push({
          name: null,
          fn: e
        })
      }
    },
    Modernizr = function() {};
  Modernizr.prototype = ModernizrProto, Modernizr = new Modernizr, Modernizr.addTest("applicationcache", "applicationCache" in window), Modernizr.addTest("blobconstructor", function() {
    try {
      return !!new Blob
    } catch (e) {
      return !1
    }
  }, {
    aliases: ["blob-constructor"]
  }), Modernizr.addTest("cookies", function() {
    try {
      document.cookie = "cookietest=1";
      var e = -1 != document.cookie.indexOf("cookietest=");
      return document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT", e
    } catch (t) {
      return !1
    }
  }), Modernizr.addTest("cors", "XMLHttpRequest" in window && "withCredentials" in new XMLHttpRequest), Modernizr.addTest("customprotocolhandler", function() {
    if (!navigator.registerProtocolHandler) return !1;
    try {
      navigator.registerProtocolHandler("thisShouldFail")
    } catch (e) {
      return e instanceof TypeError
    }
    return !1
  }), Modernizr.addTest("customevent", "CustomEvent" in window && "function" == typeof window.CustomEvent), Modernizr.addTest("dataview", "undefined" != typeof DataView && "getFloat64" in DataView.prototype), Modernizr.addTest("eventlistener", "addEventListener" in window), Modernizr.addTest("geolocation", "geolocation" in navigator), Modernizr.addTest("history", function() {
    var e = navigator.userAgent;
    return -1 === e.indexOf("Android 2.") && -1 === e.indexOf("Android 4.0") || -1 === e.indexOf("Mobile Safari") || -1 !== e.indexOf("Chrome") || -1 !== e.indexOf("Windows Phone") ? window.history && "pushState" in window.history : !1
  }), Modernizr.addTest("ie8compat", !window.addEventListener && !!document.documentMode && 7 === document.documentMode), Modernizr.addTest("json", "JSON" in window && "parse" in JSON && "stringify" in JSON), Modernizr.addTest("notification", "Notification" in window && "permission" in window.Notification && "requestPermission" in window.Notification), Modernizr.addTest("postmessage", "postMessage" in window), Modernizr.addTest("queryselector", "querySelector" in document && "querySelectorAll" in document), Modernizr.addTest("serviceworker", "serviceWorker" in navigator), Modernizr.addTest("svg", !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect), Modernizr.addTest("templatestrings", function() {
    var supports;
    try {
      eval("``"), supports = !0
    } catch (e) {}
    return !!supports
  }), Modernizr.addTest("typedarrays", "ArrayBuffer" in window), Modernizr.addTest("websockets", "WebSocket" in window && 2 === window.WebSocket.CLOSING), Modernizr.addTest("webaudio", function() {
    var e = "webkitAudioContext" in window,
      t = "AudioContext" in window;
    return Modernizr._config.usePrefixes ? e || t : t
  });
  var CSS = window.CSS;
  Modernizr.addTest("cssescape", CSS ? "function" == typeof CSS.escape : !1);
  var newSyntax = "CSS" in window && "supports" in window.CSS,
    oldSyntax = "supportsCSS" in window;
  Modernizr.addTest("supports", newSyntax || oldSyntax), Modernizr.addTest("target", function() {
    var e = window.document;
    if (!("querySelectorAll" in e)) return !1;
    try {
      return e.querySelectorAll(":target"), !0
    } catch (t) {
      return !1
    }
  }), Modernizr.addTest("microdata", "getItems" in document), Modernizr.addTest("mutationobserver", !!window.MutationObserver || !!window.WebKitMutationObserver), Modernizr.addTest("picture", "HTMLPictureElement" in window), Modernizr.addTest("es5array", function() {
    return !!(Array.prototype && Array.prototype.every && Array.prototype.filter && Array.prototype.forEach && Array.prototype.indexOf && Array.prototype.lastIndexOf && Array.prototype.map && Array.prototype.some && Array.prototype.reduce && Array.prototype.reduceRight && Array.isArray)
  }), Modernizr.addTest("es5date", function() {
    var e = "2013-04-12T06:06:37.307Z",
      t = !1;
    try {
      t = !!Date.parse(e)
    } catch (n) {}
    return !!(Date.now && Date.prototype && Date.prototype.toISOString && Date.prototype.toJSON && t)
  }), Modernizr.addTest("es5function", function() {
    return !(!Function.prototype || !Function.prototype.bind)
  }), Modernizr.addTest("es5object", function() {
    return !!(Object.keys && Object.create && Object.getPrototypeOf && Object.getOwnPropertyNames && Object.isSealed && Object.isFrozen && Object.isExtensible && Object.getOwnPropertyDescriptor && Object.defineProperty && Object.defineProperties && Object.seal && Object.freeze && Object.preventExtensions)
  }), Modernizr.addTest("strictmode", function() {
    "use strict";
    return !this
  }()), Modernizr.addTest("es5string", function() {
    return !(!String.prototype || !String.prototype.trim)
  }), Modernizr.addTest("es5syntax", function() {
    var value, obj, stringAccess, getter, setter, reservedWords, zeroWidthChars;
    try {
      return stringAccess = eval('"foobar"[3] === "b"'), getter = eval("({ get x(){ return 1 } }).x === 1"), eval("({ set x(v){ value = v; } }).x = 1"), setter = 1 === value, eval("obj = ({ if: 1 })"), reservedWords = 1 === obj["if"], zeroWidthChars = eval("_‌‍ = true"), stringAccess && getter && setter && reservedWords && zeroWidthChars
    } catch (ignore) {
      return !1
    }
  }), Modernizr.addTest("es5undefined", function() {
    var e, t;
    try {
      t = window.undefined, window.undefined = 12345, e = "undefined" == typeof window.undefined, window.undefined = t
    } catch (n) {
      return !1
    }
    return e
  }), Modernizr.addTest("es5", function() {
    return !!(Modernizr.es5array && Modernizr.es5date && Modernizr.es5function && Modernizr.es5object && Modernizr.strictmode && Modernizr.es5string && Modernizr.json && Modernizr.es5syntax && Modernizr.es5undefined)
  }), Modernizr.addTest("es6array", !!(Array.prototype && Array.prototype.copyWithin && Array.prototype.fill && Array.prototype.find && Array.prototype.findIndex && Array.prototype.keys && Array.prototype.entries && Array.prototype.values && Array.from && Array.of)), Modernizr.addTest("generators", function() {
    try {
      new Function("function* test() {}")()
    } catch (e) {
      return !1
    }
    return !0
  }), Modernizr.addTest("es6math", !!(Math && Math.clz32 && Math.cbrt && Math.imul && Math.sign && Math.log10 && Math.log2 && Math.log1p && Math.expm1 && Math.cosh && Math.sinh && Math.tanh && Math.acosh && Math.asinh && Math.atanh && Math.hypot && Math.trunc && Math.fround)), Modernizr.addTest("es6number", !!(Number.isFinite && Number.isInteger && Number.isSafeInteger && Number.isNaN && Number.parseInt && Number.parseFloat && Number.isInteger(Number.MAX_SAFE_INTEGER) && Number.isInteger(Number.MIN_SAFE_INTEGER) && Number.isFinite(Number.EPSILON))), Modernizr.addTest("es6object", !!(Object.assign && Object.is && Object.setPrototypeOf)), Modernizr.addTest("promises", function() {
    return "Promise" in window && "resolve" in window.Promise && "reject" in window.Promise && "all" in window.Promise && "race" in window.Promise && function() {
      var e;
      return new window.Promise(function(t) {
        e = t
      }), "function" == typeof e
    }()
  }), Modernizr.addTest("es6string", !!(String.fromCodePoint && String.raw && String.prototype.codePointAt && String.prototype.repeat && String.prototype.startsWith && String.prototype.endsWith && String.prototype.contains)), Modernizr.addTest("devicemotion", "DeviceMotionEvent" in window), Modernizr.addTest("deviceorientation", "DeviceOrientationEvent" in window), Modernizr.addTest("filereader", !!(window.File && window.FileList && window.FileReader)), Modernizr.addTest("beacon", "sendBeacon" in navigator), Modernizr.addTest("lowbandwidth", function() {
    var e = navigator.connection || {
      type: 0
    };
    return 3 == e.type || 4 == e.type || /^[23]g$/.test(e.type)
  }), Modernizr.addTest("eventsource", "EventSource" in window), Modernizr.addTest("fetch", "fetch" in window), Modernizr.addTest("xhrresponsetype", function() {
    if ("undefined" == typeof XMLHttpRequest) return !1;
    var e = new XMLHttpRequest;
    return e.open("get", "/", !0), "response" in e
  }()), Modernizr.addTest("xhr2", "XMLHttpRequest" in window && "withCredentials" in new XMLHttpRequest), Modernizr.addTest("speechsynthesis", "SpeechSynthesisUtterance" in window), Modernizr.addTest("localstorage", function() {
    var e = "modernizr";
    try {
      return localStorage.setItem(e, e), localStorage.removeItem(e), !0
    } catch (t) {
      return !1
    }
  }), Modernizr.addTest("sessionstorage", function() {
    var e = "modernizr";
    try {
      return sessionStorage.setItem(e, e), sessionStorage.removeItem(e), !0
    } catch (t) {
      return !1
    }
  }), Modernizr.addTest("websqldatabase", "openDatabase" in window), Modernizr.addTest("svgfilters", function() {
    var e = !1;
    try {
      e = "SVGFEColorMatrixElement" in window && 2 == SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE
    } catch (t) {}
    return e
  }), Modernizr.addTest("urlparser", function() {
    var e;
    try {
      return e = new URL("http://modernizr.com/"), "http://modernizr.com/" === e.href
    } catch (t) {
      return !1
    }
  }), Modernizr.addTest("websocketsbinary", function() {
    var e, t = "https:" == location.protocol ? "wss" : "ws";
    if ("WebSocket" in window) {
      if (e = "binaryType" in WebSocket.prototype) return e;
      try {
        return !!new WebSocket(t + "://.").binaryType
      } catch (n) {}
    }
    return !1
  }), Modernizr.addTest("framed", window.location != top.location), Modernizr.addTest("sharedworkers", "SharedWorker" in window), Modernizr.addTest("webworkers", "Worker" in window);
  var prefixes = ModernizrProto._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : [];
  ModernizrProto._prefixes = prefixes, Modernizr.addTest("contains", is(String.prototype.contains, "function"));
  var docElement = document.documentElement;
  Modernizr.addTest("contextmenu", "contextMenu" in docElement && "HTMLMenuItemElement" in window), Modernizr.addTest("cssall", "all" in docElement.style), Modernizr.addTest("willchange", "willChange" in docElement.style), Modernizr.addTest("classlist", "classList" in docElement), Modernizr.addTest("documentfragment", function() {
    return "createDocumentFragment" in document && "appendChild" in docElement
  });
  var isSVG = "svg" === docElement.nodeName.toLowerCase(),
    html5;
  isSVG || ! function(e, t) {
    function n(e, t) {
      var n = e.createElement("p"),
        r = e.getElementsByTagName("head")[0] || e.documentElement;
      return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
    }

    function r() {
      var e = v.elements;
      return "string" == typeof e ? e.split(" ") : e
    }

    function o(e, t) {
      var n = v.elements;
      "string" != typeof n && (n = n.join(" ")), "string" != typeof e && (e = e.join(" ")), v.elements = n + " " + e, A(t)
    }

    function i(e) {
      var t = w[e[h]];
      return t || (t = {}, g++, e[h] = g, w[g] = t), t
    }

    function d(e, n, r) {
      if (n || (n = t), c) return n.createElement(e);
      r || (r = i(n));
      var o;
      return o = r.cache[e] ? r.cache[e].cloneNode() : f.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), !o.canHaveChildren || m.test(e) || o.tagUrn ? o : r.frag.appendChild(o)
    }

    function a(e, n) {
      if (e || (e = t), c) return e.createDocumentFragment();
      n = n || i(e);
      for (var o = n.frag.cloneNode(), d = 0, a = r(), s = a.length; s > d; d++) o.createElement(a[d]);
      return o
    }

    function s(e, t) {
      t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
        return v.shivMethods ? d(n, e, t) : t.createElem(n)
      }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-:]+/g, function(e) {
        return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
      }) + ");return n}")(v, t.frag)
    }

    function A(e) {
      e || (e = t);
      var r = i(e);
      return !v.shivCSS || l || r.hasCSS || (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), c || s(e, r), e
    }
    var l, c, u = "3.7.2",
      p = e.html5 || {},
      m = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
      f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
      h = "_html5shiv",
      g = 0,
      w = {};
    ! function() {
      try {
        var e = t.createElement("a");
        e.innerHTML = "<xyz></xyz>", l = "hidden" in e, c = 1 == e.childNodes.length || function() {
          t.createElement("a");
          var e = t.createDocumentFragment();
          return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
        }()
      } catch (n) {
        l = !0, c = !0
      }
    }();
    var v = {
      elements: p.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
      version: u,
      shivCSS: p.shivCSS !== !1,
      supportsUnknownElements: c,
      shivMethods: p.shivMethods !== !1,
      type: "default",
      shivDocument: A,
      createElement: d,
      createDocumentFragment: a,
      addElements: o
    };
    e.html5 = v, A(t)
  }(this, document);
  var omPrefixes = "Moz O ms Webkit",
    domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(" ") : [];
  ModernizrProto._domPrefixes = domPrefixes;
  var hasOwnProp;
  ! function() {
    var e = {}.hasOwnProperty;
    hasOwnProp = is(e, "undefined") || is(e.call, "undefined") ? function(e, t) {
      return t in e && is(e.constructor.prototype[t], "undefined")
    } : function(t, n) {
      return e.call(t, n)
    }
  }(), ModernizrProto._l = {}, ModernizrProto.on = function(e, t) {
    this._l[e] || (this._l[e] = []), this._l[e].push(t), Modernizr.hasOwnProperty(e) && setTimeout(function() {
      Modernizr._trigger(e, Modernizr[e])
    }, 0)
  }, ModernizrProto._trigger = function(e, t) {
    if (this._l[e]) {
      var n = this._l[e];
      setTimeout(function() {
        var e, r;
        for (e = 0; e < n.length; e++)(r = n[e])(t)
      }, 0), delete this._l[e]
    }
  }, Modernizr._q.push(function() {
    ModernizrProto.addTest = addTest
  }), Modernizr.addAsyncTest(function() {
    var e = new Image;
    e.onerror = function() {
      addTest("exiforientation", !1, {
        aliases: ["exif-orientation"]
      })
    }, e.onload = function() {
      addTest("exiforientation", 2 !== e.width, {
        aliases: ["exif-orientation"]
      })
    }, e.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAASUkqAAgAAAABABIBAwABAAAABgASAAAAAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/iiiigD/2Q=="
  }), Modernizr.addAsyncTest(function() {
    function e() {
      clearTimeout(t), window.removeEventListener("deviceproximity", e), addTest("proximity", !0)
    }
    var t, n = 300;
    "ondeviceproximity" in window && "onuserproximity" in window ? (window.addEventListener("deviceproximity", e), t = setTimeout(function() {
      window.removeEventListener("deviceproximity", e), addTest("proximity", !1)
    }, n)) : addTest("proximity", !1)
  }), Modernizr.addAsyncTest(function() {
    var e = new Image;
    e.onload = e.onerror = function() {
      addTest("jpegxr", 1 == e.width, {
        aliases: ["jpeg-xr"]
      })
    }, e.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA=="
  }), Modernizr.addAsyncTest(function() {
    var e = new Image;
    e.onerror = function() {
      addTest("webpalpha", !1, {
        aliases: ["webp-alpha"]
      })
    }, e.onload = function() {
      addTest("webpalpha", 1 == e.width, {
        aliases: ["webp-alpha"]
      })
    }, e.src = "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="
  }), Modernizr.addAsyncTest(function() {
    var e = new Image;
    e.onerror = function() {
      addTest("webpanimation", !1, {
        aliases: ["webp-animation"]
      })
    }, e.onload = function() {
      addTest("webpanimation", 1 == e.width, {
        aliases: ["webp-animation"]
      })
    }, e.src = "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
  }), Modernizr.addAsyncTest(function() {
    var e = new Image;
    e.onerror = function() {
      addTest("webplossless", !1, {
        aliases: ["webp-lossless"]
      })
    }, e.onload = function() {
      addTest("webplossless", 1 == e.width, {
        aliases: ["webp-lossless"]
      })
    }, e.src = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
  }), Modernizr.addAsyncTest(function() {
    function e(e, t, n) {
      function r(t) {
        var r = t && "load" === t.type ? 1 == o.width : !1,
          i = "webp" === e;
        addTest(e, i ? new Boolean(r) : r), n && n(t)
      }
      var o = new Image;
      o.onerror = r, o.onload = r, o.src = t
    }
    var t = [{
        uri: "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",
        name: "webp"
      }, {
        uri: "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",
        name: "webp.alpha"
      }, {
        uri: "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
        name: "webp.animation"
      }, {
        uri: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",
        name: "webp.lossless"
      }],
      n = t.shift();
    e(n.name, n.uri, function(n) {
      if (n && "load" === n.type)
        for (var r = 0; r < t.length; r++) e(t[r].name, t[r].uri)
    })
  }), Modernizr.addTest("svgasimg", document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")), Modernizr.addAsyncTest(function() {
    function e() {
      var e = new Image;
      e.onerror = function() {
        addTest("datauri", !0), Modernizr.datauri = new Boolean(!0), Modernizr.datauri.over32kb = !1
      }, e.onload = function() {
        addTest("datauri", !0), Modernizr.datauri = new Boolean(!0), Modernizr.datauri.over32kb = 1 == e.width && 1 == e.height
      };
      for (var t = "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="; t.length < 33e3;) t = "\r\n" + t;
      e.src = "data:image/gif;base64," + t
    } - 1 !== navigator.userAgent.indexOf("MSIE 7.") && setTimeout(function() {
      addTest("datauri", !1)
    }, 10);
    var t = new Image;
    t.onerror = function() {
      addTest("datauri", !1)
    }, t.onload = function() {
      1 == t.width && 1 == t.height ? e() : addTest("datauri", !1)
    }, t.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
  }), Modernizr.addAsyncTest(function() {
    function e() {
      addTest("blobworkers", !1), t()
    }

    function t() {
      a && r.revokeObjectURL(a), d && d.terminate(), s && clearTimeout(s)
    }
    try {
      var n = window.BlobBuilder,
        r = window.URL;
      Modernizr._config.usePrefix && (n = n || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder || window.OBlobBuilder, r = r || window.MozURL || window.webkitURL || window.MSURL || window.OURL);
      var o, i, d, a, s, A = "Modernizr",
        l = "this.onmessage=function(e){postMessage(e.data)}";
      try {
        o = new Blob([l], {
          type: "text/javascript"
        })
      } catch (c) {}
      o || (i = new n, i.append(l), o = i.getBlob()), a = r.createObjectURL(o), d = new Worker(a), d.onmessage = function(e) {
        addTest("blobworkers", A === e.data), t()
      }, d.onerror = e, s = setTimeout(e, 200), d.postMessage(A)
    } catch (c) {
      e()
    }
  }), Modernizr.addAsyncTest(function() {
    try {
      var e = "Modernizr",
        t = new Worker("data:text/javascript;base64,dGhpcy5vbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7cG9zdE1lc3NhZ2UoZS5kYXRhKX0=");
      t.onmessage = function(n) {
        t.terminate(), addTest("dataworkers", e === n.data), t = null
      }, t.onerror = function() {
        addTest("dataworkers", !1), t = null
      }, setTimeout(function() {
        addTest("dataworkers", !1)
      }, 200), t.postMessage(e)
    } catch (n) {
      setTimeout(function() {
        addTest("dataworkers", !1)
      }, 0)
    }
  });
  var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(" ") : [];
  ModernizrProto._cssomPrefixes = cssomPrefixes;
  var atRule = function(e) {
    var t, n = prefixes.length,
      r = window.CSSRule;
    if ("undefined" == typeof r) return undefined;
    if (!e) return !1;
    if (e = e.replace(/^@/, ""), t = e.replace(/-/g, "_").toUpperCase() + "_RULE", t in r) return "@" + e;
    for (var o = 0; n > o; o++) {
      var i = prefixes[o],
        d = i.toUpperCase() + "_" + t;
      if (d in r) return "@-" + i.toLowerCase() + "-" + e
    }
    return !1
  };
  ModernizrProto.atRule = atRule;
  var hasEvent = function(e) {
    function t(t, r) {
      var o;
      return t ? (r && "string" != typeof r || (r = createElement(r || "div")), t = "on" + t, o = t in r, !o && n && (r.setAttribute || (r = createElement("div")), r.setAttribute(t, ""), o = "function" == typeof r[t], r[t] !== e && (r[t] = e), r.removeAttribute(t)), o) : !1
    }
    var n = !("onblur" in document.documentElement);
    return t
  }();
  ModernizrProto.hasEvent = hasEvent, Modernizr.addTest("ambientlight", hasEvent("devicelight", window)), Modernizr.addTest("hashchange", function() {
    return hasEvent("hashchange", window) === !1 ? !1 : document.documentMode === undefined || document.documentMode > 7
  }), Modernizr.addTest("inputsearchevent", hasEvent("search")), Modernizr.addTest("pointerevents", function() {
    var e = !1,
      t = domPrefixes.length;
    for (e = Modernizr.hasEvent("pointerdown"); t-- && !e;) hasEvent(domPrefixes[t] + "pointerdown") && (e = !0);
    return e
  }), Modernizr.addTest("audio", function() {
    var e = createElement("audio"),
      t = !1;
    try {
      (t = !!e.canPlayType) && (t = new Boolean(t), t.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), t.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), t.opus = e.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""), t.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), t.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
    } catch (n) {}
    return t
  }), Modernizr.addTest("canvas", function() {
    var e = createElement("canvas");
    return !(!e.getContext || !e.getContext("2d"))
  }), Modernizr.addTest("canvastext", function() {
    return Modernizr.canvas === !1 ? !1 : "function" == typeof createElement("canvas").getContext("2d").fillText
  }), Modernizr.addTest("contenteditable", function() {
    if ("contentEditable" in docElement) {
      var e = createElement("div");
      return e.contentEditable = !0, "true" === e.contentEditable
    }
  }), Modernizr.addTest("emoji", function() {
    if (!Modernizr.canvastext) return !1;
    var e = window.devicePixelRatio || 1,
      t = 12 * e,
      n = createElement("canvas"),
      r = n.getContext("2d");
    return r.fillStyle = "#f00", r.textBaseline = "top", r.font = "32px Arial", r.fillText("🐨", 0, 0), 0 !== r.getImageData(t, t, 1, 1).data[0]
  }), addTest("htmlimports", "import" in createElement("link")), Modernizr.addTest("olreversed", "reversed" in createElement("ol")), Modernizr.addTest("userdata", !!createElement("div").addBehavior), Modernizr.addTest("video", function() {
    var e = createElement("video"),
      t = !1;
    try {
      (t = !!e.canPlayType) && (t = new Boolean(t), t.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), t.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), t.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), t.vp9 = e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), t.hls = e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""))
    } catch (n) {}
    return t
  }), Modernizr.addTest("vml", function() {
    var e, t = createElement("div"),
      n = !1;
    return isSVG || (t.innerHTML = '<v:shape id="vml_flag1" adj="1" />', e = t.firstChild, e.style.behavior = "url(#default#VML)", n = e ? "object" == typeof e.adj : !0), n
  }), Modernizr.addTest("webanimations", "animate" in createElement("div")), Modernizr.addTest("webgl", function() {
    var e = createElement("canvas"),
      t = "probablySupportsContext" in e ? "probablySupportsContext" : "supportsContext";
    return t in e ? e[t]("webgl") || e[t]("experimental-webgl") : "WebGLRenderingContext" in window
  }), Modernizr.addTest("adownload", !window.externalHost && "download" in createElement("a")), Modernizr.addTest("audioloop", "loop" in createElement("audio")), Modernizr.addTest("audiopreload", "preload" in createElement("audio")), Modernizr.addTest("canvasblending", function() {
    if (Modernizr.canvas === !1) return !1;
    var e = createElement("canvas").getContext("2d");
    try {
      e.globalCompositeOperation = "screen"
    } catch (t) {}
    return "screen" === e.globalCompositeOperation
  });
  var canvas = createElement("canvas");
  Modernizr.addTest("todataurljpeg", function() {
    return !!Modernizr.canvas && 0 === canvas.toDataURL("image/jpeg").indexOf("data:image/jpeg")
  }), Modernizr.addTest("todataurlpng", function() {
    return !!Modernizr.canvas && 0 === canvas.toDataURL("image/png").indexOf("data:image/png")
  }), Modernizr.addTest("todataurlwebp", function() {
    var e = !1;
    try {
      e = !!Modernizr.canvas && 0 === canvas.toDataURL("image/webp").indexOf("data:image/webp")
    } catch (t) {}
    return e
  }), Modernizr.addTest("canvaswinding", function() {
    if (Modernizr.canvas === !1) return !1;
    var e = createElement("canvas").getContext("2d");
    return e.rect(0, 0, 10, 10), e.rect(2, 2, 6, 6), e.isPointInPath(5, 5, "evenodd") === !1
  }), Modernizr.addTest("bgpositionshorthand", function() {
    var e = createElement("a"),
      t = e.style,
      n = "right 10px bottom 10px";
    return t.cssText = "background-position: " + n + ";", t.backgroundPosition === n
  }), Modernizr.addTest("csscalc", function() {
    var e = "width:",
      t = "calc(10px);",
      n = createElement("a");
    return n.style.cssText = e + prefixes.join(t + e), !!n.style.length
  }), Modernizr.addTest("cubicbezierrange", function() {
    var e = createElement("a");
    return e.style.cssText = prefixes.join("transition-timing-function:cubic-bezier(1,0,0,1.1); "), !!e.style.length
  }), Modernizr.addTest("cssgradients", function() {
    var e = "background-image:",
      t = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
      n = "linear-gradient(left top,#9f9, white);",
      r = e + prefixes.join(n + e).slice(0, -e.length);
    Modernizr._config.usePrefixes && (r += e + "-webkit-" + t);
    var o = createElement("a"),
      i = o.style;
    return i.cssText = r, ("" + i.backgroundImage).indexOf("gradient") > -1
  }), Modernizr.addTest("multiplebgs", function() {
    var e = createElement("a").style;
    return e.cssText = "background:url(https://),url(https://),red url(https://)", /(url\s*\(.*?){3}/.test(e.background)
  }), Modernizr.addTest("opacity", function() {
    var e = createElement("a").style;
    return e.cssText = prefixes.join("opacity:.55;"), /^0.55$/.test(e.opacity)
  }), Modernizr.addTest("csspointerevents", function() {
    var e = createElement("a").style;
    return e.cssText = "pointer-events:auto", "auto" === e.pointerEvents
  }), Modernizr.addTest("csspositionsticky", function() {
    var e = "position:",
      t = "sticky",
      n = createElement("a"),
      r = n.style;
    return r.cssText = e + prefixes.join(t + ";" + e).slice(0, -e.length), -1 !== r.position.indexOf(t)
  }), Modernizr.addTest("regions", function() {
    if (isSVG) return !1;
    var e = Modernizr.prefixed("flowFrom"),
      t = Modernizr.prefixed("flowInto"),
      n = !1;
    if (!e || !t) return n;
    var r = createElement("iframe"),
      o = createElement("div"),
      i = createElement("div"),
      d = createElement("div"),
      a = "modernizr_flow_for_regions_check";
    i.innerText = "M", o.style.cssText = "top: 150px; left: 150px; padding: 0px;", d.style.cssText = "width: 50px; height: 50px; padding: 42px;", d.style[e] = a, o.appendChild(i), o.appendChild(d), docElement.appendChild(o);
    var s, A, l = i.getBoundingClientRect();
    return i.style[t] = a, s = i.getBoundingClientRect(), A = parseInt(s.left - l.left, 10), docElement.removeChild(o), 42 == A ? n = !0 : (docElement.appendChild(r), l = r.getBoundingClientRect(), r.style[t] = a, s = r.getBoundingClientRect(), l.height > 0 && l.height !== s.height && 0 === s.height && (n = !0)), i = d = o = r = undefined, n
  }), Modernizr.addTest("cssremunit", function() {
    var e = createElement("a").style;
    try {
      e.fontSize = "3rem"
    } catch (t) {}
    return /rem/.test(e.fontSize)
  }), Modernizr.addTest("rgba", function() {
    var e = createElement("a").style;
    return e.cssText = "background-color:rgba(150,255,150,.5)", ("" + e.backgroundColor).indexOf("rgba") > -1
  }), Modernizr.addTest("createelementattrs", function() {
    try {
      return "test" == createElement('<input name="test" />').getAttribute("name")
    } catch (e) {
      return !1
    }
  }, {
    aliases: ["createelement-attrs"]
  }), Modernizr.addTest("dataset", function() {
    var e = createElement("div");
    return e.setAttribute("data-a-b", "c"), !(!e.dataset || "c" !== e.dataset.aB)
  }), Modernizr.addTest("hidden", "hidden" in createElement("a")), Modernizr.addTest("outputelem", "value" in createElement("output")), Modernizr.addTest("progressbar", createElement("progress").max !== undefined), Modernizr.addTest("meter", createElement("meter").max !== undefined), Modernizr.addTest("ruby", function() {
    function e(e, t) {
      var n;
      return window.getComputedStyle ? n = document.defaultView.getComputedStyle(e, null).getPropertyValue(t) : e.currentStyle && (n = e.currentStyle[t]), n
    }

    function t() {
      docElement.removeChild(n), n = null, r = null, o = null
    }
    var n = createElement("ruby"),
      r = createElement("rt"),
      o = createElement("rp"),
      i = "display",
      d = "fontSize";
    return n.appendChild(o), n.appendChild(r), docElement.appendChild(n), "none" == e(o, i) || "ruby" == e(n, i) && "ruby-text" == e(r, i) || "6pt" == e(o, d) && "6pt" == e(r, d) ? (t(), !0) : (t(), !1)
  }), Modernizr.addTest("template", "content" in createElement("template")), Modernizr.addTest("time", "valueAsDate" in createElement("time")), Modernizr.addTest("texttrackapi", "function" == typeof createElement("video").addTextTrack), Modernizr.addTest("track", "kind" in createElement("track")), Modernizr.addTest("unknownelements", function() {
    var e = createElement("a");
    return e.innerHTML = "<xyz></xyz>", 1 === e.childNodes.length
  }), Modernizr.addTest("capture", "capture" in createElement("input")), Modernizr.addTest("fileinput", function() {
    if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) return !1;
    var e = createElement("input");
    return e.type = "file", !e.disabled
  }), Modernizr.addTest("fileinputdirectory", function() {
    var e = createElement("input"),
      t = "directory";
    if (e.type = "file", t in e) return !0;
    for (var n = 0, r = domPrefixes.length; r > n; n++)
      if (domPrefixes[n] + t in e) return !0;
    return !1
  }), Modernizr.addTest("formattribute", function() {
    var e, t = createElement("form"),
      n = createElement("input"),
      r = createElement("div"),
      o = "formtest" + (new Date).getTime(),
      i = !1;
    t.id = o;
    try {
      n.setAttribute("form", o)
    } catch (d) {
      document.createAttribute && (e = document.createAttribute("form"), e.nodeValue = o, n.setAttributeNode(e))
    }
    return r.appendChild(t), r.appendChild(n), docElement.appendChild(r), i = t.elements && 1 === t.elements.length && n.form == t, r.parentNode.removeChild(r), i
  }), Modernizr.addTest("placeholder", "placeholder" in createElement("input") && "placeholder" in createElement("textarea")), Modernizr.addTest("sandbox", "sandbox" in createElement("iframe")), Modernizr.addTest("seamless", "seamless" in createElement("iframe")), Modernizr.addTest("srcdoc", "srcdoc" in createElement("iframe")), Modernizr.addAsyncTest(function() {
    if (!Modernizr.canvas) return !1;
    var e = new Image,
      t = createElement("canvas"),
      n = t.getContext("2d");
    e.onload = function() {
      addTest("apng", function() {
        return "undefined" == typeof t.getContext ? !1 : (n.drawImage(e, 0, 0), 0 === n.getImageData(0, 0, 1, 1).data[3])
      })
    }, e.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg=="
  }), Modernizr.addTest("sizes", "sizes" in createElement("img")), Modernizr.addTest("srcset", "srcset" in createElement("img")), Modernizr.addTest("inputformaction", !!("formAction" in createElement("input")), {
    aliases: ["input-formaction"]
  }), Modernizr.addTest("inputformenctype", !!("formEnctype" in createElement("input")), {
    aliases: ["input-formenctype"]
  }), Modernizr.addTest("inputformmethod", !!("formMethod" in createElement("input"))), Modernizr.addTest("inputformtarget", !!("formtarget" in createElement("input")), {
    aliases: ["input-formtarget"]
  }), Modernizr.addTest("scriptasync", "async" in createElement("script")), Modernizr.addTest("scriptdefer", "defer" in createElement("script")), Modernizr.addTest("stylescoped", "scoped" in createElement("style")), Modernizr.addTest("inlinesvg", function() {
    var e = createElement("div");
    return e.innerHTML = "<svg/>", "http://www.w3.org/2000/svg" == ("undefined" != typeof SVGRect && e.firstChild && e.firstChild.namespaceURI)
  }), Modernizr.addTest("textareamaxlength", !!("maxLength" in createElement("textarea"))), Modernizr.addAsyncTest(function() {
    function e(n) {
      clearTimeout(t), r.removeEventListener("playing", e, !1), addTest("videoautoplay", n && "playing" === n.type || 0 !== r.currentTime), r.parentNode.removeChild(r)
    }
    var t, n = 300,
      r = createElement("video"),
      o = r.style;
    if (!(Modernizr.video && "autoplay" in r)) return void addTest("videoautoplay", !1);
    o.position = "absolute", o.height = 0, o.width = 0;
    try {
      if (Modernizr.video.ogg) r.src = "data:video/ogg;base64,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";
      else {
        if (!Modernizr.video.h264) return void addTest("videoautoplay", !1);
        r.src = "data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAAAAG1wNDJpc29tYXZjMQAAAz5tb292AAAAbG12aGQAAAAAzaNacc2jWnEAAV+QAAFfkAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAGGlvZHMAAAAAEICAgAcAT////3//AAACQ3RyYWsAAABcdGtoZAAAAAHNo1pxzaNacQAAAAEAAAAAAAFfkAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAEAAAABAAAAAAAd9tZGlhAAAAIG1kaGQAAAAAzaNacc2jWnEAAV+QAAFfkFXEAAAAAAAhaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAAAAAAGWbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAABVnN0YmwAAACpc3RzZAAAAAAAAAABAAAAmWF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAEAAQAEgAAABIAAAAAAAAAAEOSlZUL0FWQyBDb2RpbmcAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwH0AAr/4QAZZ/QACq609NQYBBkAAAMAAQAAAwAKjxImoAEABWjOAa8gAAAAEmNvbHJuY2xjAAYAAQAGAAAAGHN0dHMAAAAAAAAAAQAAAAUAAEZQAAAAKHN0c3oAAAAAAAAAAAAAAAUAAAIqAAAACAAAAAgAAAAIAAAACAAAAChzdHNjAAAAAAAAAAIAAAABAAAABAAAAAEAAAACAAAAAQAAAAEAAAAYc3RjbwAAAAAAAAACAAADYgAABaQAAAAUc3RzcwAAAAAAAAABAAAAAQAAABFzZHRwAAAAAAREREREAAAAb3VkdGEAAABnbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcgAAAAAAAAAAAAAAAAAAAAA6aWxzdAAAADKpdG9vAAAAKmRhdGEAAAABAAAAAEhhbmRCcmFrZSAwLjkuOCAyMDEyMDcxODAwAAACUm1kYXQAAAHkBgX/4NxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxMjAgLSBILjI2NC9NUEVHLTQgQVZDIGNvZGVjIC0gQ29weWxlZnQgMjAwMy0yMDExIC0gaHR0cDovL3d3dy52aWRlb2xhbi5vcmcveDI2NC5odG1sIC0gb3B0aW9uczogY2FiYWM9MCByZWY9MSBkZWJsb2NrPTE6MDowIGFuYWx5c2U9MHgxOjAgbWU9ZXNhIHN1Ym1lPTkgcHN5PTAgbWl4ZWRfcmVmPTAgbWVfcmFuZ2U9NCBjaHJvbWFfbWU9MSB0cmVsbGlzPTAgOHg4ZGN0PTAgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0wIGNocm9tYV9xcF9vZmZzZXQ9MCB0aHJlYWRzPTYgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlnaHRwPTAga2V5aW50PTUwIGtleWludF9taW49NSBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmM9Y3FwIG1idHJlZT0wIHFwPTAAgAAAAD5liISscR8A+E4ACAACFoAAITAAAgsAAPgYCoKgoC+L4vi+KAvi+L4YfAEAACMzgABF9AAEUGUgABDJiXnf4AAAAARBmiKUAAAABEGaQpQAAAAEQZpilAAAAARBmoKU"
      }
    } catch (i) {
      return void addTest("videoautoplay", !1)
    }
    r.setAttribute("autoplay", ""), r.style.cssText = "display:none", docElement.appendChild(r), setTimeout(function() {
      r.addEventListener("playing", e, !1), t = setTimeout(e, n)
    }, 0)
  }), Modernizr.addTest("videoloop", "loop" in createElement("video")), Modernizr.addTest("videopreload", "preload" in createElement("video")), Modernizr.addAsyncTest(function() {
    if (Modernizr.webglextensions = new Boolean(!1), Modernizr.webgl) {
      var e, t, n;
      try {
        e = createElement("canvas"), t = e.getContext("webgl") || e.getContext("experimental-webgl"), n = t.getSupportedExtensions()
      } catch (r) {
        return
      }
      t !== undefined && (Modernizr.webglextensions = new Boolean(!0));
      for (var o = -1, i = n.length; ++o < i;) Modernizr.webglextensions[n[o]] = !0;
      e = undefined
    }
  }), Modernizr.addAsyncTest(function() {
    var e, t, n = function(e) {
        e.fake && e.parentNode && e.parentNode.removeChild(e)
      },
      r = function(e, t) {
        var n = !!e;
        if (n && (n = new Boolean(n), n.blocked = "blocked" === e), addTest("flash", function() {
            return n
          }), t && s.contains(t)) {
          for (; t.parentNode !== s;) t = t.parentNode;
          s.removeChild(t)
        }
      };
    try {
      t = "ActiveXObject" in window && "Pan" in new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")
    } catch (o) {}
    if (e = !("plugins" in navigator && "Shockwave Flash" in navigator.plugins || t), e || isSVG) r(!1);
    else {
      var i, d, a = createElement("embed"),
        s = getBody();
      if (a.type = "application/x-shockwave-flash", s.appendChild(a), docElement.appendChild(s), !("Pan" in a || t)) return r("blocked", a), void n(s);
      i = function() {
        return docElement.contains(s) ? (docElement.contains(a) ? (d = a.style.cssText, "" !== d ? r("blocked", a) : r(!0, a)) : r("blocked"), void n(s)) : (s = document.body || s, a = createElement("embed"), a.type = "application/x-shockwave-flash", s.appendChild(a), setTimeout(i, 1e3))
      }, setTimeout(i, 10)
    }
  });
  var mq = function() {
    var e = window.matchMedia || window.msMatchMedia;
    return e ? function(t) {
      var n = e(t);
      return n && n.matches || !1
    } : function(e) {
      var t = !1;
      return injectElementWithStyles("@media " + e + " { #modernizr { position: absolute; } }", function(e) {
        t = "absolute" == (window.getComputedStyle ? window.getComputedStyle(e, null) : e.currentStyle).position
      }), t
    }
  }();
  ModernizrProto.mq = mq, Modernizr.addTest("mediaqueries", mq("only all"));
  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;
  Modernizr.addTest("hiddenscroll", function() {
    return testStyles("#modernizr {width:100px;height:100px;overflow:scroll}", function(e) {
      return e.offsetWidth === e.clientWidth
    })
  }), Modernizr.addTest("mathml", function() {
    var e;
    return testStyles("#modernizr{position:absolute;display:inline-block}", function(t) {
      t.innerHTML += "<math><mfrac><mi>xx</mi><mi>yy</mi></mfrac></math>", e = t.offsetHeight > t.offsetWidth
    }), e
  }), Modernizr.addTest("touchevents", function() {
    var e;
    if ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) e = !0;
    else {
      var t = ["@media (", prefixes.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
      testStyles(t, function(t) {
        e = 9 === t.offsetTop
      })
    }
    return e
  }), Modernizr.addTest("unicoderange", function() {
    return Modernizr.testStyles('@font-face{font-family:"unicodeRange";src:local("Arial");unicode-range:U+0020,U+002E}#modernizr span{font-size:20px;display:inline-block;font-family:"unicodeRange",monospace}#modernizr .mono{font-family:monospace}', function(e) {
      for (var t = [".", ".", "m", "m"], n = 0; n < t.length; n++) {
        var r = createElement("span");
        r.innerHTML = t[n], r.className = n % 2 ? "mono" : "", e.appendChild(r), t[n] = r.clientWidth
      }
      return t[0] !== t[1] && t[2] === t[3]
    })
  }), Modernizr.addTest("unicode", function() {
    var e, t = createElement("span"),
      n = createElement("span");
    return testStyles("#modernizr{font-family:Arial,sans;font-size:300em;}", function(r) {
      t.innerHTML = isSVG ? "妇" : "&#5987", n.innerHTML = isSVG ? "☆" : "&#9734", r.appendChild(t), r.appendChild(n), e = "offsetWidth" in t && t.offsetWidth !== n.offsetWidth
    }), e
  }), Modernizr.addTest("checked", function() {
    return testStyles("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}", function(e) {
      var t = createElement("input");
      return t.setAttribute("type", "checkbox"), t.setAttribute("checked", "checked"), e.appendChild(t), 20 === t.offsetLeft
    })
  }), testStyles("#modernizr{display: table; direction: ltr}#modernizr div{display: table-cell; padding: 10px}", function(e) {
    var t, n = e.childNodes;
    t = n[0].offsetLeft < n[1].offsetLeft, Modernizr.addTest("displaytable", t, {
      aliases: ["display-table"]
    })
  }, 2);
  var blacklist = function() {
    var e = navigator.userAgent,
      t = e.match(/applewebkit\/([0-9]+)/gi) && parseFloat(RegExp.$1),
      n = e.match(/w(eb)?osbrowser/gi),
      r = e.match(/windows phone/gi) && e.match(/iemobile\/([0-9])+/gi) && parseFloat(RegExp.$1) >= 9,
      o = 533 > t && e.match(/android/gi);
    return n || o || r
  }();
  blacklist ? Modernizr.addTest("fontface", !1) : testStyles('@font-face {font-family:"font";src:url("https://")}', function(e, t) {
    var n = document.getElementById("smodernizr"),
      r = n.sheet || n.styleSheet,
      o = r ? r.cssRules && r.cssRules[0] ? r.cssRules[0].cssText : r.cssText || "" : "",
      i = /src/i.test(o) && 0 === o.indexOf(t.split(" ")[0]);
    Modernizr.addTest("fontface", i)
  }), testStyles('#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}', function(e) {
    Modernizr.addTest("generatedcontent", e.offsetHeight >= 7)
  }), Modernizr.addTest("cssinvalid", function() {
    return testStyles("#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:invalid{width:50px}", function(e) {
      var t = createElement("input");
      return t.required = !0, e.appendChild(t), t.clientWidth > 10
    })
  }), testStyles("#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}", function(e) {
    Modernizr.addTest("lastchild", e.lastChild.offsetWidth > e.firstChild.offsetWidth)
  }, 2), testStyles("#modernizr div {width:1px} #modernizr div:nth-child(2n) {width:2px;}", function(e) {
    Modernizr.addTest("nthchild", function() {
      for (var t = e.getElementsByTagName("div"), n = !0, r = 0; 5 > r; r++) n = n && t[r].offsetWidth === r % 2 + 1;
      return n
    })
  }, 5), testStyles("#modernizr{overflow: scroll; width: 40px; height: 40px; }#" + prefixes.join("scrollbar{width:0px} #modernizr::").split("#").slice(1).join("#") + "scrollbar{width:0px}", function(e) {
    Modernizr.addTest("cssscrollbar", 40 == e.scrollWidth)
  }), Modernizr.addTest("siblinggeneral", function() {
    return testStyles("#modernizr div {width:100px} #modernizr div ~ div {width:200px;display:block}", function(e) {
      return 200 == e.lastChild.offsetWidth
    }, 2)
  }), testStyles("#modernizr{position: absolute; top: -10em; visibility:hidden; font: normal 10px arial;}#subpixel{float: left; font-size: 33.3333%;}", function(e) {
    var t = e.firstChild;
    t.innerHTML = "This is a text written in Arial", Modernizr.addTest("subpixelfont", window.getComputedStyle ? "44px" !== window.getComputedStyle(t, null).getPropertyValue("width") : !1)
  }, 1, ["subpixel"]), Modernizr.addTest("cssvalid", function() {
    return testStyles("#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:valid{width:50px}", function(e) {
      var t = createElement("input");
      return e.appendChild(t), t.clientWidth > 10
    })
  }), testStyles("#modernizr { height: 50vh; }", function(e) {
    var t = parseInt(window.innerHeight / 2, 10),
      n = parseInt((window.getComputedStyle ? getComputedStyle(e, null) : e.currentStyle).height, 10);
    Modernizr.addTest("cssvhunit", n == t)
  }), testStyles("#modernizr { width: 50vw; }", function(e) {
    var t = parseInt(window.innerWidth / 2, 10),
      n = parseInt((window.getComputedStyle ? getComputedStyle(e, null) : e.currentStyle).width, 10);
    Modernizr.addTest("cssvwunit", n == t)
  }), Modernizr.addTest("details", function() {
    var e, t = createElement("details");
    return "open" in t ? (testStyles("#modernizr details{display:block}", function(n) {
      n.appendChild(t), t.innerHTML = "<summary>a</summary>b", e = t.offsetHeight, t.open = !0, e = e != t.offsetHeight
    }), e) : !1
  }), Modernizr.addTest("oninput", function() {
    var e, t = createElement("input");
    if (t.setAttribute("oninput", "return"), hasEvent("oninput", docElement) || "function" == typeof t.oninput) return !0;
    try {
      var n = document.createEvent("KeyboardEvent");
      e = !1;
      var r = function(t) {
        e = !0, t.preventDefault(), t.stopPropagation()
      };
      n.initKeyEvent("keypress", !0, !0, window, !1, !1, !1, !1, 0, "e".charCodeAt(0)), docElement.appendChild(t), t.addEventListener("input", r, !1), t.focus(), t.dispatchEvent(n), t.removeEventListener("input", r, !1), docElement.removeChild(t)
    } catch (o) {
      e = !1
    }
    return e
  }), Modernizr.addTest("formvalidation", function() {
    var e = createElement("form");
    if (!("checkValidity" in e && "addEventListener" in e)) return !1;
    if ("reportValidity" in e) return !0;
    var t, n = !1;
    return Modernizr.formvalidationapi = !0, e.addEventListener("submit", function(e) {
      window.opera || e.preventDefault(), e.stopPropagation()
    }, !1), e.innerHTML = '<input name="modTest" required><button></button>', testStyles("#modernizr form{position:absolute;top:-99999em}", function(r) {
      r.appendChild(e), t = e.getElementsByTagName("input")[0], t.addEventListener("invalid", function(e) {
        n = !0, e.preventDefault(), e.stopPropagation()
      }, !1), Modernizr.formvalidationmessage = !!t.validationMessage, e.getElementsByTagName("button")[0].click()
    }), n
  });
  var modElem = {
    elem: createElement("modernizr")
  };
  Modernizr._q.push(function() {
    delete modElem.elem
  }), Modernizr.addTest("csschunit", function() {
    var e, t = modElem.elem.style;
    try {
      t.fontSize = "3ch", e = -1 !== t.fontSize.indexOf("ch")
    } catch (n) {
      e = !1
    }
    return e
  }), Modernizr.addTest("cssexunit", function() {
    var e, t = modElem.elem.style;
    try {
      t.fontSize = "3ex", e = -1 !== t.fontSize.indexOf("ex")
    } catch (n) {
      e = !1
    }
    return e
  });
  var inputElem = createElement("input"),
    inputattrs = "autocomplete autofocus list placeholder max min multiple pattern required step".split(" "),
    attrs = {};
  Modernizr.input = function(e) {
    for (var t = 0, n = e.length; n > t; t++) attrs[e[t]] = !!(e[t] in inputElem);
    return attrs.list && (attrs.list = !(!createElement("datalist") || !window.HTMLDataListElement)), attrs
  }(inputattrs), Modernizr.addTest("datalistelem", Modernizr.input.list);
  var inputtypes = "search tel url email datetime date month week time datetime-local number range color".split(" "),
    inputs = {};
  Modernizr.inputtypes = function(e) {
    for (var t, n, r, o = e.length, i = ":)", d = 0; o > d; d++) inputElem.setAttribute("type", t = e[d]), r = "text" !== inputElem.type && "style" in inputElem, r && (inputElem.value = i, inputElem.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(t) && inputElem.style.WebkitAppearance !== undefined ? (docElement.appendChild(inputElem), n = document.defaultView, r = n.getComputedStyle && "textfield" !== n.getComputedStyle(inputElem, null).WebkitAppearance && 0 !== inputElem.offsetHeight, docElement.removeChild(inputElem)) : /^(search|tel)$/.test(t) || (r = /^(url|email|number)$/.test(t) ? inputElem.checkValidity && inputElem.checkValidity() === !1 : inputElem.value != i)), inputs[e[d]] = !!r;
    return inputs
  }(inputtypes), Modernizr.addTest("localizednumber", function() {
    if (!Modernizr.inputtypes.number) return !1;
    if (!Modernizr.formvalidation) return !1;
    var e, t = createElement("div"),
      n = getBody(),
      r = function() {
        return docElement.insertBefore(n, docElement.firstElementChild || docElement.firstChild)
      }();
    t.innerHTML = '<input type="number" value="1.0" step="0.1"/>';
    var o = t.childNodes[0];
    r.appendChild(t), o.focus();
    try {
      document.execCommand("InsertText", !1, "1,1")
    } catch (i) {}
    return e = "number" === o.type && 1.1 === o.valueAsNumber && o.checkValidity(), r.removeChild(t), n.fake && r.parentNode.removeChild(r), e
  }), Modernizr.addTest("hsla", function() {
    var e = createElement("a").style;
    return e.cssText = "background-color:hsla(120,40%,100%,.5)", contains(e.backgroundColor, "rgba") || contains(e.backgroundColor, "hsla")
  }), testStyles("#modernizr1{width: 50vmax}#modernizr2{width:50px;height:50px;overflow:scroll}", function(e) {
    var t = e.childNodes[1],
      n = e.childNodes[0],
      r = parseInt((n.offsetWidth - n.clientWidth) / 2, 10),
      o = docElement.clientWidth / 100,
      i = docElement.clientHeight / 100,
      d = parseInt(50 * Math.max(o, i), 10),
      a = parseInt((window.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).width, 10);
    Modernizr.addTest("cssvmaxunit", roundedEquals(d, a) || roundedEquals(d, a - r))
  }, 2), testStyles("#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}", function(e) {
    var t = e.childNodes[1],
      n = e.childNodes[0],
      r = parseInt((n.offsetWidth - n.clientWidth) / 2, 10),
      o = docElement.clientWidth / 100,
      i = docElement.clientHeight / 100,
      d = parseInt(50 * Math.min(o, i), 10),
      a = parseInt((window.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).width, 10);
    Modernizr.addTest("cssvminunit", roundedEquals(d, a) || roundedEquals(d, a - r))
  }, 2);
  var testXhrType = function(e) {
    if ("undefined" == typeof XMLHttpRequest) return !1;
    var t = new XMLHttpRequest;
    t.open("get", "/", !0);
    try {
      t.responseType = e
    } catch (n) {
      return !1
    }
    return "response" in t && t.responseType == e
  };
  Modernizr.addTest("xhrresponsetypearraybuffer", testXhrType("arraybuffer")), Modernizr.addTest("xhrresponsetypeblob", testXhrType("blob")), Modernizr.addTest("xhrresponsetypedocument", testXhrType("document")), Modernizr.addTest("xhrresponsetypejson", testXhrType("json")), Modernizr.addTest("xhrresponsetypetext", testXhrType("text"));
  var toStringFn = {}.toString;
  Modernizr.addTest("svgclippaths", function() {
    return !!document.createElementNS && /SVGClipPath/.test(toStringFn.call(document.createElementNS("http://www.w3.org/2000/svg", "clipPath")))
  }), Modernizr.addTest("svgforeignobject", function() {
    return !!document.createElementNS && /SVGForeignObject/.test(toStringFn.call(document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")))
  }), Modernizr.addTest("smil", function() {
    return !!document.createElementNS && /SVGAnimate/.test(toStringFn.call(document.createElementNS("http://www.w3.org/2000/svg", "animate")))
  });
  var mStyle = {
    style: modElem.elem.style
  };
  Modernizr._q.unshift(function() {
    delete mStyle.style
  });
  var testProp = ModernizrProto.testProp = function(e, t, n) {
    return testProps([e], undefined, t, n)
  };
  Modernizr.addTest("textshadow", testProp("textShadow", "1px 1px")), ModernizrProto.testAllProps = testPropsAll;
  var prefixed = ModernizrProto.prefixed = function(e, t, n) {
      return 0 === e.indexOf("@") ? atRule(e) : (-1 != e.indexOf("-") && (e = cssToDOM(e)), t ? testPropsAll(e, t, n) : testPropsAll(e, "pfx"))
    },
    prefixedCSS = ModernizrProto.prefixedCSS = function(e) {
      var t = prefixed(e);
      return t && domToCSS(t)
    };
  Modernizr.addTest("batteryapi", !!prefixed("battery", navigator), {
    aliases: ["battery-api"]
  }), Modernizr.addTest("dart", !!prefixed("startDart", navigator)), Modernizr.addTest("fullscreen", !(!prefixed("exitFullscreen", document, !1) && !prefixed("cancelFullScreen", document, !1))), Modernizr.addTest("gamepads", !!prefixed("getGamepads", navigator));
  var indexeddb = prefixed("indexedDB", window);
  Modernizr.addTest("indexeddb", !!indexeddb), indexeddb && Modernizr.addTest("indexeddb.deletedatabase", "deleteDatabase" in indexeddb), Modernizr.addAsyncTest(function() {
    var e, t, n = prefixed("indexedDB", window),
      r = "detect-blob-support",
      o = !1;
    if (!Modernizr.indexeddb || !Modernizr.indexeddb.deleteDatabase) return !1;
    try {
      n.deleteDatabase(r).onsuccess = function() {
        e = n.open(r, 1), e.onupgradeneeded = function() {
          e.result.createObjectStore("store")
        }, e.onsuccess = function() {
          t = e.result;
          try {
            t.transaction("store", "readwrite").objectStore("store").put(new Blob, "key"), o = !0
          } catch (i) {
            o = !1
          } finally {
            addTest("indexeddbblob", o), t.close(), n.deleteDatabase(r)
          }
        }
      }
    } catch (i) {
      addTest("indexeddbblob", !1)
    }
  }), Modernizr.addTest("intl", !!prefixed("Intl", window)), Modernizr.addTest("pagevisibility", !!prefixed("hidden", document, !1)), Modernizr.addTest("performance", !!prefixed("performance", window)), Modernizr.addTest("pointerlock", !!prefixed("exitPointerLock", document)), Modernizr.addTest("quotamanagement", function() {
    var e = prefixed("temporaryStorage", navigator),
      t = prefixed("persistentStorage", navigator);
    return !(!e || !t)
  }), Modernizr.addTest("requestanimationframe", !!prefixed("requestAnimationFrame", window), {
    aliases: ["raf"]
  }), Modernizr.addTest("vibrate", !!prefixed("vibrate", navigator)), Modernizr.addTest("webintents", !!prefixed("startActivity", navigator)), Modernizr.addTest("lowbattery", function() {
    var e = .2,
      t = prefixed("battery", navigator);
    return !!(t && !t.charging && t.level <= e)
  });
  var crypto = prefixed("crypto", window),
    supportsGetRandomValues;
  if (crypto && "getRandomValues" in crypto && "Uint32Array" in window) {
    var array = new Uint32Array(10),
      values = crypto.getRandomValues(array);
    supportsGetRandomValues = values && is(values[0], "number")
  }
  Modernizr.addTest("getrandomvalues", !!supportsGetRandomValues), Modernizr.addTest("backgroundblendmode", prefixed("backgroundBlendMode", "text")), Modernizr.addTest("objectfit", !!prefixed("objectFit"), {
    aliases: ["object-fit"]
  }), Modernizr.addTest("wrapflow", function() {
    var e = prefixed("wrapFlow");
    if (!e || isSVG) return !1;
    var t = e.replace(/([A-Z])/g, function(e, t) {
        return "-" + t.toLowerCase()
      }).replace(/^ms-/, "-ms-"),
      n = createElement("div"),
      r = createElement("div"),
      o = createElement("span");
    r.style.cssText = "position: absolute; left: 50px; width: 100px; height: 20px;" + t + ":end;", o.innerText = "X", n.appendChild(r), n.appendChild(o), docElement.appendChild(n);
    var i = o.offsetLeft;
    return docElement.removeChild(n), r = o = n = undefined, 150 == i
  }), Modernizr.addTest("filesystem", !!prefixed("requestFileSystem", window)), Modernizr.addTest("requestautocomplete", !!prefixed("requestAutocomplete", createElement("form"))), Modernizr.addTest("speechrecognition", !!prefixed("SpeechRecognition", window));
  var url = prefixed("URL", window, !1);
  url = url && window[url], Modernizr.addTest("bloburls", url && "revokeObjectURL" in url && "createObjectURL" in url), Modernizr.addAsyncTest(function() {
      function e() {
        addTest("transferables", !1), t()
      }

      function t() {
        a && URL.revokeObjectURL(a), s && s.terminate(), o && clearTimeout(o)
      }
      var n = !!(Modernizr.blobconstructor && Modernizr.bloburls && Modernizr.webworkers && Modernizr.typedarrays);
      if (!n) return addTest("transferables", !1);
      try {
        var r, o, i = 'var hello = "world"',
          d = new Blob([i], {
            type: "text/javascript"
          }),
          a = URL.createObjectURL(d),
          s = new Worker(a);
        s.onerror = e, o = setTimeout(e, 200), r = new ArrayBuffer(1), s.postMessage(r, [r]), addTest("transferables", 0 === r.byteLength), t()
      } catch (A) {
        e()
      }
    }), Modernizr.addTest("getusermedia", !!prefixed("getUserMedia", navigator)), Modernizr.addTest("peerconnection", !!prefixed("RTCPeerConnection", window)), Modernizr.addTest("datachannel", function() {
      if (!Modernizr.peerconnection) return !1;
      for (var e = 0, t = domPrefixes.length; t > e; e++) {
        var n = window[domPrefixes[e] + "RTCPeerConnection"];
        if (n) {
          var r = new n({
            iceServers: [{
              url: "stun:0"
            }]
          });
          return "createDataChannel" in r
        }
      }
      return !1
    }), Modernizr.addTest("matchmedia", !!prefixed("matchMedia", window)), ModernizrProto.testAllProps = testAllProps, Modernizr.addTest("cssanimations", testAllProps("animationName", "a", !0)), Modernizr.addTest("csspseudoanimations", function() {
      var e = !1;
      if (!Modernizr.cssanimations || !window.getComputedStyle) return e;
      var t = ["@", Modernizr._prefixes.join("keyframes csspseudoanimations { from { font-size: 10px; } }@").replace(/\@$/, ""), '#modernizr:before { content:" "; font-size:5px;', Modernizr._prefixes.join("animation:csspseudoanimations 1ms infinite;"), "}"].join("");
      return Modernizr.testStyles(t, function(t) {
        e = "10px" === window.getComputedStyle(t, ":before").getPropertyValue("font-size")
      }), e
    }), Modernizr.addTest("appearance", testAllProps("appearance")), Modernizr.addTest("backgroundcliptext", function() {
      return testAllProps("backgroundClip", "text")
    }), Modernizr.addTest("bgpositionxy", function() {
      return testAllProps("backgroundPositionX", "3px", !0) && testAllProps("backgroundPositionY", "5px", !0)
    }), Modernizr.addTest("bgrepeatround", testAllProps("backgroundRepeat", "round")), Modernizr.addTest("bgrepeatspace", testAllProps("backgroundRepeat", "space")), Modernizr.addTest("backgroundsize", testAllProps("backgroundSize", "100%", !0)), Modernizr.addTest("bgsizecover", testAllProps("backgroundSize", "cover")), Modernizr.addTest("borderimage", testAllProps("borderImage", "url() 1", !0)), Modernizr.addTest("borderradius", testAllProps("borderRadius", "0px", !0)), Modernizr.addTest("boxshadow", testAllProps("boxShadow", "1px 1px", !0)), Modernizr.addTest("boxsizing", testAllProps("boxSizing", "border-box", !0) && (document.documentMode === undefined || document.documentMode > 7)),
    function() {
      Modernizr.addTest("csscolumns", function() {
        var e = !1,
          t = testAllProps("columnCount");
        try {
          (e = !!t) && (e = new Boolean(e))
        } catch (n) {}
        return e
      });
      for (var e, t, n = ["Width", "Span", "Fill", "Gap", "Rule", "RuleColor", "RuleStyle", "RuleWidth", "BreakBefore", "BreakAfter", "BreakInside"], r = 0; r < n.length; r++) e = n[r].toLowerCase(), t = testAllProps("column" + n[r]), ("breakbefore" === e || "breakafter" === e || "breakinside" == e) && (t = t || testAllProps(n[r])), Modernizr.addTest("csscolumns." + e, t)
    }(), Modernizr.addTest("displayrunin", testAllProps("display", "run-in"), {
      aliases: ["display-runin"]
    }), Modernizr.addTest("ellipsis", testAllProps("textOverflow", "ellipsis")), Modernizr.addTest("cssfilters", function() {
      if (Modernizr.supports) return testAllProps("filter", "blur(2px)");
      var e = createElement("a");
      return e.style.cssText = prefixes.join("filter:blur(2px); "), !!e.style.length && (document.documentMode === undefined || document.documentMode > 9)
    }), Modernizr.addTest("flexbox", testAllProps("flexBasis", "1px", !0)), Modernizr.addTest("flexboxlegacy", testAllProps("boxDirection", "reverse", !0)), Modernizr.addTest("flexboxtweener", testAllProps("flexAlign", "end", !0)), Modernizr.addTest("flexwrap", testAllProps("flexWrap", "wrap", !0)), Modernizr.addAsyncTest(function() {
      function e() {
        function n() {
          try {
            var e = createElement("div"),
              t = createElement("span"),
              n = e.style,
              r = 0,
              o = 0,
              i = !1,
              d = document.body.firstElementChild || document.body.firstChild;
            return e.appendChild(t), t.innerHTML = "Bacon ipsum dolor sit amet jerky velit in culpa hamburger et. Laborum dolor proident, enim dolore duis commodo et strip steak. Salami anim et, veniam consectetur dolore qui tenderloin jowl velit sirloin. Et ad culpa, fatback cillum jowl ball tip ham hock nulla short ribs pariatur aute. Pig pancetta ham bresaola, ut boudin nostrud commodo flank esse cow tongue culpa. Pork belly bresaola enim pig, ea consectetur nisi. Fugiat officia turkey, ea cow jowl pariatur ullamco proident do laborum velit sausage. Magna biltong sint tri-tip commodo sed bacon, esse proident aliquip. Ullamco ham sint fugiat, velit in enim sed mollit nulla cow ut adipisicing nostrud consectetur. Proident dolore beef ribs, laborum nostrud meatball ea laboris rump cupidatat labore culpa. Shankle minim beef, velit sint cupidatat fugiat tenderloin pig et ball tip. Ut cow fatback salami, bacon ball tip et in shank strip steak bresaola. In ut pork belly sed mollit tri-tip magna culpa veniam, short ribs qui in andouille ham consequat. Dolore bacon t-bone, velit short ribs enim strip steak nulla. Voluptate labore ut, biltong swine irure jerky. Cupidatat excepteur aliquip salami dolore. Ball tip strip steak in pork dolor. Ad in esse biltong. Dolore tenderloin exercitation ad pork loin t-bone, dolore in chicken ball tip qui pig. Ut culpa tongue, sint ribeye dolore ex shank voluptate hamburger. Jowl et tempor, boudin pork chop labore ham hock drumstick consectetur tri-tip elit swine meatball chicken ground round. Proident shankle mollit dolore. Shoulder ut duis t-bone quis reprehenderit. Meatloaf dolore minim strip steak, laboris ea aute bacon beef ribs elit shank in veniam drumstick qui. Ex laboris meatball cow tongue pork belly. Ea ball tip reprehenderit pig, sed fatback boudin dolore flank aliquip laboris eu quis. Beef ribs duis beef, cow corned beef adipisicing commodo nisi deserunt exercitation. Cillum dolor t-bone spare ribs, ham hock est sirloin. Brisket irure meatloaf in, boudin pork belly sirloin ball tip. Sirloin sint irure nisi nostrud aliqua. Nostrud nulla aute, enim officia culpa ham hock. Aliqua reprehenderit dolore sunt nostrud sausage, ea boudin pork loin ut t-bone ham tempor. Tri-tip et pancetta drumstick laborum. Ham hock magna do nostrud in proident. Ex ground round fatback, venison non ribeye in.",
              document.body.insertBefore(e, d), n.cssText = "position:absolute;top:0;left:0;width:5em;text-align:justify;text-justification:newspaper;", r = t.offsetHeight, o = t.offsetWidth, n.cssText = "position:absolute;top:0;left:0;width:5em;text-align:justify;text-justification:newspaper;" + prefixes.join("hyphens:auto; "), i = t.offsetHeight != r || t.offsetWidth != o, document.body.removeChild(e), e.removeChild(t), i
          } catch (a) {
            return !1
          }
        }

        function r(e, t) {
          try {
            var n = createElement("div"),
              r = createElement("span"),
              o = n.style,
              i = 0,
              d = !1,
              a = !1,
              s = !1,
              A = document.body.firstElementChild || document.body.firstChild;
            return o.cssText = "position:absolute;top:0;left:0;overflow:visible;width:1.25em;", n.appendChild(r), document.body.insertBefore(n, A), r.innerHTML = "mm", i = r.offsetHeight, r.innerHTML = "m" + e + "m", a = r.offsetHeight > i, t ? (r.innerHTML = "m<br />m", i = r.offsetWidth, r.innerHTML = "m" + e + "m", s = r.offsetWidth > i) : s = !0, a === !0 && s === !0 && (d = !0), document.body.removeChild(n), n.removeChild(r), d
          } catch (l) {
            return !1
          }
        }

        function o(e) {
          try {
            var t, n = createElement("input"),
              r = createElement("div"),
              o = "lebowski",
              i = !1,
              d = document.body.firstElementChild || document.body.firstChild;
            if (r.innerHTML = o + e + o, document.body.insertBefore(r, d), document.body.insertBefore(n, r), n.setSelectionRange ? (n.focus(), n.setSelectionRange(0, 0)) : n.createTextRange && (t = n.createTextRange(), t.collapse(!0), t.moveEnd("character", 0), t.moveStart("character", 0), t.select()), window.find) i = window.find(o + o);
            else try {
              t = window.self.document.body.createTextRange(), i = t.findText(o + o)
            } catch (a) {
              i = !1
            }
            return document.body.removeChild(r), document.body.removeChild(n), i
          } catch (a) {
            return !1
          }
        }
        return document.body || document.getElementsByTagName("body")[0] ? (addTest("csshyphens", function() {
          if (!testAllProps("hyphens", "auto", !0)) return !1;
          try {
            return n()
          } catch (e) {
            return !1
          }
        }), addTest("softhyphens", function() {
          try {
            return r("&#173;", !0) && r("&#8203;", !1)
          } catch (e) {
            return !1
          }
        }), void addTest("softhyphensfind", function() {
          try {
            return o("&#173;") && o("&#8203;")
          } catch (e) {
            return !1
          }
        })) : void setTimeout(e, t)
      }
      var t = 300;
      setTimeout(e, t)
    }), Modernizr.addTest("cssmask", testAllProps("maskRepeat", "repeat-x", !0)), Modernizr.addTest("overflowscrolling", testAllProps("overflowScrolling", "touch", !0)), Modernizr.addTest("cssreflections", testAllProps("boxReflect", "above", !0)), Modernizr.addTest("cssresize", testAllProps("resize", "both", !0)), Modernizr.addTest("shapes", testAllProps("shapeOutside", "content-box", !0)), Modernizr.addTest("textalignlast", testAllProps("textAlignLast")), Modernizr.addTest("csstransforms", function() {
      return -1 === navigator.userAgent.indexOf("Android 2.") && testAllProps("transform", "scale(1)", !0)
    }), Modernizr.addTest("csstransforms3d", function() {
      var e = !!testAllProps("perspective", "1px", !0),
        t = Modernizr._config.usePrefixes;
      if (e && (!t || "webkitPerspective" in docElement.style)) {
        var n;
        Modernizr.supports ? n = "@supports (perspective: 1px)" : (n = "@media (transform-3d)", t && (n += ",(-webkit-transform-3d)")), n += "{#modernizr{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0}}", testStyles(n, function(t) {
          e = 9 === t.offsetLeft && 5 === t.offsetHeight
        })
      }
      return e
    }), Modernizr.addTest("preserve3d", testAllProps("transformStyle", "preserve-3d")), Modernizr.addTest("csstransitions", testAllProps("transition", "all", !0)), Modernizr.addTest("csspseudotransitions", function() {
      var e = !1;
      if (!Modernizr.csstransitions || !window.getComputedStyle) return e;
      var t = '#modernizr:before { content:" "; font-size:5px;' + Modernizr._prefixes.join("transition:0s 100s;") + "}#modernizr.trigger:before { font-size:10px; }";
      return Modernizr.testStyles(t, function(t) {
        window.getComputedStyle(t, ":before").getPropertyValue("font-size"), t.className += "trigger", e = "5px" === window.getComputedStyle(t, ":before").getPropertyValue("font-size")
      }), e
    }), Modernizr.addTest("userselect", testAllProps("userSelect", "none", !0)), testRunner(), setClasses(classes), delete ModernizrProto.addTest, delete ModernizrProto.addAsyncTest;
  for (var i = 0; i < Modernizr._q.length; i++) Modernizr._q[i]();
  window.Modernizr = Modernizr
}(window, document);