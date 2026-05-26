var Jy = (e) => {
  throw TypeError(e);
};
var af = (e, t, n) => t.has(e) || Jy("Cannot " + n);
var O = (e, t, n) => (
    af(e, t, "read from private field"),
    n ? n.call(e) : t.get(e)
  ),
  be = (e, t, n) =>
    t.has(e)
      ? Jy("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, n),
  se = (e, t, n, s) => (
    af(e, t, "write to private field"),
    s ? s.call(e, n) : t.set(e, n),
    n
  ),
  Oe = (e, t, n) => (af(e, t, "access private method"), n);
var zl = (e, t, n, s) => ({
  set _(i) {
    se(e, t, i, n);
  },
  get _() {
    return O(e, t, s);
  },
});
function pT(e, t) {
  for (var n = 0; n < t.length; n++) {
    const s = t[n];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const i in s)
        if (i !== "default" && !(i in e)) {
          const l = Object.getOwnPropertyDescriptor(s, i);
          l &&
            Object.defineProperty(
              e,
              i,
              l.get ? l : { enumerable: !0, get: () => s[i] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
  new MutationObserver((i) => {
    for (const l of i)
      if (l.type === "childList")
        for (const c of l.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && s(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const l = {};
    return (
      i.integrity && (l.integrity = i.integrity),
      i.referrerPolicy && (l.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (l.credentials = "omit")
          : (l.credentials = "same-origin"),
      l
    );
  }
  function s(i) {
    if (i.ep) return;
    i.ep = !0;
    const l = n(i);
    fetch(i.href, l);
  }
})();
function Gh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var lf = { exports: {} },
  Fi = {},
  cf = { exports: {} },
  _e = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Zy;
function mT() {
  if (Zy) return _e;
  Zy = 1;
  var e = Symbol.for("react.element"),
    t = Symbol.for("react.portal"),
    n = Symbol.for("react.fragment"),
    s = Symbol.for("react.strict_mode"),
    i = Symbol.for("react.profiler"),
    l = Symbol.for("react.provider"),
    c = Symbol.for("react.context"),
    u = Symbol.for("react.forward_ref"),
    f = Symbol.for("react.suspense"),
    h = Symbol.for("react.memo"),
    m = Symbol.for("react.lazy"),
    y = Symbol.iterator;
  function w(L) {
    return L === null || typeof L != "object"
      ? null
      : ((L = (y && L[y]) || L["@@iterator"]),
        typeof L == "function" ? L : null);
  }
  var C = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    E = Object.assign,
    v = {};
  function x(L, H, we) {
    ((this.props = L),
      (this.context = H),
      (this.refs = v),
      (this.updater = we || C));
  }
  ((x.prototype.isReactComponent = {}),
    (x.prototype.setState = function (L, H) {
      if (typeof L != "object" && typeof L != "function" && L != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, L, H, "setState");
    }),
    (x.prototype.forceUpdate = function (L) {
      this.updater.enqueueForceUpdate(this, L, "forceUpdate");
    }));
  function T() {}
  T.prototype = x.prototype;
  function P(L, H, we) {
    ((this.props = L),
      (this.context = H),
      (this.refs = v),
      (this.updater = we || C));
  }
  var R = (P.prototype = new T());
  ((R.constructor = P), E(R, x.prototype), (R.isPureReactComponent = !0));
  var _ = Array.isArray,
    M = Object.prototype.hasOwnProperty,
    V = { current: null },
    U = { key: !0, ref: !0, __self: !0, __source: !0 };
  function D(L, H, we) {
    var ve,
      pe = {},
      ye = null,
      ne = null;
    if (H != null)
      for (ve in (H.ref !== void 0 && (ne = H.ref),
      H.key !== void 0 && (ye = "" + H.key),
      H))
        M.call(H, ve) && !U.hasOwnProperty(ve) && (pe[ve] = H[ve]);
    var me = arguments.length - 2;
    if (me === 1) pe.children = we;
    else if (1 < me) {
      for (var fe = Array(me), Pe = 0; Pe < me; Pe++)
        fe[Pe] = arguments[Pe + 2];
      pe.children = fe;
    }
    if (L && L.defaultProps)
      for (ve in ((me = L.defaultProps), me))
        pe[ve] === void 0 && (pe[ve] = me[ve]);
    return {
      $$typeof: e,
      type: L,
      key: ye,
      ref: ne,
      props: pe,
      _owner: V.current,
    };
  }
  function Q(L, H) {
    return {
      $$typeof: e,
      type: L.type,
      key: H,
      ref: L.ref,
      props: L.props,
      _owner: L._owner,
    };
  }
  function J(L) {
    return typeof L == "object" && L !== null && L.$$typeof === e;
  }
  function ee(L) {
    var H = { "=": "=0", ":": "=2" };
    return (
      "$" +
      L.replace(/[=:]/g, function (we) {
        return H[we];
      })
    );
  }
  var de = /\/+/g;
  function ge(L, H) {
    return typeof L == "object" && L !== null && L.key != null
      ? ee("" + L.key)
      : H.toString(36);
  }
  function le(L, H, we, ve, pe) {
    var ye = typeof L;
    (ye === "undefined" || ye === "boolean") && (L = null);
    var ne = !1;
    if (L === null) ne = !0;
    else
      switch (ye) {
        case "string":
        case "number":
          ne = !0;
          break;
        case "object":
          switch (L.$$typeof) {
            case e:
            case t:
              ne = !0;
          }
      }
    if (ne)
      return (
        (ne = L),
        (pe = pe(ne)),
        (L = ve === "" ? "." + ge(ne, 0) : ve),
        _(pe)
          ? ((we = ""),
            L != null && (we = L.replace(de, "$&/") + "/"),
            le(pe, H, we, "", function (Pe) {
              return Pe;
            }))
          : pe != null &&
            (J(pe) &&
              (pe = Q(
                pe,
                we +
                  (!pe.key || (ne && ne.key === pe.key)
                    ? ""
                    : ("" + pe.key).replace(de, "$&/") + "/") +
                  L,
              )),
            H.push(pe)),
        1
      );
    if (((ne = 0), (ve = ve === "" ? "." : ve + ":"), _(L)))
      for (var me = 0; me < L.length; me++) {
        ye = L[me];
        var fe = ve + ge(ye, me);
        ne += le(ye, H, we, fe, pe);
      }
    else if (((fe = w(L)), typeof fe == "function"))
      for (L = fe.call(L), me = 0; !(ye = L.next()).done; )
        ((ye = ye.value),
          (fe = ve + ge(ye, me++)),
          (ne += le(ye, H, we, fe, pe)));
    else if (ye === "object")
      throw (
        (H = String(L)),
        Error(
          "Objects are not valid as a React child (found: " +
            (H === "[object Object]"
              ? "object with keys {" + Object.keys(L).join(", ") + "}"
              : H) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    return ne;
  }
  function Ee(L, H, we) {
    if (L == null) return L;
    var ve = [],
      pe = 0;
    return (
      le(L, ve, "", "", function (ye) {
        return H.call(we, ye, pe++);
      }),
      ve
    );
  }
  function te(L) {
    if (L._status === -1) {
      var H = L._result;
      ((H = H()),
        H.then(
          function (we) {
            (L._status === 0 || L._status === -1) &&
              ((L._status = 1), (L._result = we));
          },
          function (we) {
            (L._status === 0 || L._status === -1) &&
              ((L._status = 2), (L._result = we));
          },
        ),
        L._status === -1 && ((L._status = 0), (L._result = H)));
    }
    if (L._status === 1) return L._result.default;
    throw L._result;
  }
  var Z = { current: null },
    $ = { transition: null },
    X = {
      ReactCurrentDispatcher: Z,
      ReactCurrentBatchConfig: $,
      ReactCurrentOwner: V,
    };
  function W() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (_e.Children = {
      map: Ee,
      forEach: function (L, H, we) {
        Ee(
          L,
          function () {
            H.apply(this, arguments);
          },
          we,
        );
      },
      count: function (L) {
        var H = 0;
        return (
          Ee(L, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (L) {
        return (
          Ee(L, function (H) {
            return H;
          }) || []
        );
      },
      only: function (L) {
        if (!J(L))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return L;
      },
    }),
    (_e.Component = x),
    (_e.Fragment = n),
    (_e.Profiler = i),
    (_e.PureComponent = P),
    (_e.StrictMode = s),
    (_e.Suspense = f),
    (_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = X),
    (_e.act = W),
    (_e.cloneElement = function (L, H, we) {
      if (L == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            L +
            ".",
        );
      var ve = E({}, L.props),
        pe = L.key,
        ye = L.ref,
        ne = L._owner;
      if (H != null) {
        if (
          (H.ref !== void 0 && ((ye = H.ref), (ne = V.current)),
          H.key !== void 0 && (pe = "" + H.key),
          L.type && L.type.defaultProps)
        )
          var me = L.type.defaultProps;
        for (fe in H)
          M.call(H, fe) &&
            !U.hasOwnProperty(fe) &&
            (ve[fe] = H[fe] === void 0 && me !== void 0 ? me[fe] : H[fe]);
      }
      var fe = arguments.length - 2;
      if (fe === 1) ve.children = we;
      else if (1 < fe) {
        me = Array(fe);
        for (var Pe = 0; Pe < fe; Pe++) me[Pe] = arguments[Pe + 2];
        ve.children = me;
      }
      return {
        $$typeof: e,
        type: L.type,
        key: pe,
        ref: ye,
        props: ve,
        _owner: ne,
      };
    }),
    (_e.createContext = function (L) {
      return (
        (L = {
          $$typeof: c,
          _currentValue: L,
          _currentValue2: L,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (L.Provider = { $$typeof: l, _context: L }),
        (L.Consumer = L)
      );
    }),
    (_e.createElement = D),
    (_e.createFactory = function (L) {
      var H = D.bind(null, L);
      return ((H.type = L), H);
    }),
    (_e.createRef = function () {
      return { current: null };
    }),
    (_e.forwardRef = function (L) {
      return { $$typeof: u, render: L };
    }),
    (_e.isValidElement = J),
    (_e.lazy = function (L) {
      return { $$typeof: m, _payload: { _status: -1, _result: L }, _init: te };
    }),
    (_e.memo = function (L, H) {
      return { $$typeof: h, type: L, compare: H === void 0 ? null : H };
    }),
    (_e.startTransition = function (L) {
      var H = $.transition;
      $.transition = {};
      try {
        L();
      } finally {
        $.transition = H;
      }
    }),
    (_e.unstable_act = W),
    (_e.useCallback = function (L, H) {
      return Z.current.useCallback(L, H);
    }),
    (_e.useContext = function (L) {
      return Z.current.useContext(L);
    }),
    (_e.useDebugValue = function () {}),
    (_e.useDeferredValue = function (L) {
      return Z.current.useDeferredValue(L);
    }),
    (_e.useEffect = function (L, H) {
      return Z.current.useEffect(L, H);
    }),
    (_e.useId = function () {
      return Z.current.useId();
    }),
    (_e.useImperativeHandle = function (L, H, we) {
      return Z.current.useImperativeHandle(L, H, we);
    }),
    (_e.useInsertionEffect = function (L, H) {
      return Z.current.useInsertionEffect(L, H);
    }),
    (_e.useLayoutEffect = function (L, H) {
      return Z.current.useLayoutEffect(L, H);
    }),
    (_e.useMemo = function (L, H) {
      return Z.current.useMemo(L, H);
    }),
    (_e.useReducer = function (L, H, we) {
      return Z.current.useReducer(L, H, we);
    }),
    (_e.useRef = function (L) {
      return Z.current.useRef(L);
    }),
    (_e.useState = function (L) {
      return Z.current.useState(L);
    }),
    (_e.useSyncExternalStore = function (L, H, we) {
      return Z.current.useSyncExternalStore(L, H, we);
    }),
    (_e.useTransition = function () {
      return Z.current.useTransition();
    }),
    (_e.version = "18.3.1"),
    _e
  );
}
var ev;
function Yh() {
  return (ev || ((ev = 1), (cf.exports = mT())), cf.exports);
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var tv;
function gT() {
  if (tv) return Fi;
  tv = 1;
  var e = Yh(),
    t = Symbol.for("react.element"),
    n = Symbol.for("react.fragment"),
    s = Object.prototype.hasOwnProperty,
    i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(u, f, h) {
    var m,
      y = {},
      w = null,
      C = null;
    (h !== void 0 && (w = "" + h),
      f.key !== void 0 && (w = "" + f.key),
      f.ref !== void 0 && (C = f.ref));
    for (m in f) s.call(f, m) && !l.hasOwnProperty(m) && (y[m] = f[m]);
    if (u && u.defaultProps)
      for (m in ((f = u.defaultProps), f)) y[m] === void 0 && (y[m] = f[m]);
    return {
      $$typeof: t,
      type: u,
      key: w,
      ref: C,
      props: y,
      _owner: i.current,
    };
  }
  return ((Fi.Fragment = n), (Fi.jsx = c), (Fi.jsxs = c), Fi);
}
var nv;
function yT() {
  return (nv || ((nv = 1), (lf.exports = gT())), lf.exports);
}
var S = yT(),
  b = Yh();
const rt = Gh(b),
  $c = pT({ __proto__: null, default: rt }, [b]);
var $l = {},
  uf = { exports: {} },
  Bt = {},
  df = { exports: {} },
  ff = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var rv;
function vT() {
  return (
    rv ||
      ((rv = 1),
      (function (e) {
        function t($, X) {
          var W = $.length;
          $.push(X);
          e: for (; 0 < W; ) {
            var L = (W - 1) >>> 1,
              H = $[L];
            if (0 < i(H, X)) (($[L] = X), ($[W] = H), (W = L));
            else break e;
          }
        }
        function n($) {
          return $.length === 0 ? null : $[0];
        }
        function s($) {
          if ($.length === 0) return null;
          var X = $[0],
            W = $.pop();
          if (W !== X) {
            $[0] = W;
            e: for (var L = 0, H = $.length, we = H >>> 1; L < we; ) {
              var ve = 2 * (L + 1) - 1,
                pe = $[ve],
                ye = ve + 1,
                ne = $[ye];
              if (0 > i(pe, W))
                ye < H && 0 > i(ne, pe)
                  ? (($[L] = ne), ($[ye] = W), (L = ye))
                  : (($[L] = pe), ($[ve] = W), (L = ve));
              else if (ye < H && 0 > i(ne, W))
                (($[L] = ne), ($[ye] = W), (L = ye));
              else break e;
            }
          }
          return X;
        }
        function i($, X) {
          var W = $.sortIndex - X.sortIndex;
          return W !== 0 ? W : $.id - X.id;
        }
        if (
          typeof performance == "object" &&
          typeof performance.now == "function"
        ) {
          var l = performance;
          e.unstable_now = function () {
            return l.now();
          };
        } else {
          var c = Date,
            u = c.now();
          e.unstable_now = function () {
            return c.now() - u;
          };
        }
        var f = [],
          h = [],
          m = 1,
          y = null,
          w = 3,
          C = !1,
          E = !1,
          v = !1,
          x = typeof setTimeout == "function" ? setTimeout : null,
          T = typeof clearTimeout == "function" ? clearTimeout : null,
          P = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function R($) {
          for (var X = n(h); X !== null; ) {
            if (X.callback === null) s(h);
            else if (X.startTime <= $)
              (s(h), (X.sortIndex = X.expirationTime), t(f, X));
            else break;
            X = n(h);
          }
        }
        function _($) {
          if (((v = !1), R($), !E))
            if (n(f) !== null) ((E = !0), te(M));
            else {
              var X = n(h);
              X !== null && Z(_, X.startTime - $);
            }
        }
        function M($, X) {
          ((E = !1), v && ((v = !1), T(D), (D = -1)), (C = !0));
          var W = w;
          try {
            for (
              R(X), y = n(f);
              y !== null && (!(y.expirationTime > X) || ($ && !ee()));
            ) {
              var L = y.callback;
              if (typeof L == "function") {
                ((y.callback = null), (w = y.priorityLevel));
                var H = L(y.expirationTime <= X);
                ((X = e.unstable_now()),
                  typeof H == "function"
                    ? (y.callback = H)
                    : y === n(f) && s(f),
                  R(X));
              } else s(f);
              y = n(f);
            }
            if (y !== null) var we = !0;
            else {
              var ve = n(h);
              (ve !== null && Z(_, ve.startTime - X), (we = !1));
            }
            return we;
          } finally {
            ((y = null), (w = W), (C = !1));
          }
        }
        var V = !1,
          U = null,
          D = -1,
          Q = 5,
          J = -1;
        function ee() {
          return !(e.unstable_now() - J < Q);
        }
        function de() {
          if (U !== null) {
            var $ = e.unstable_now();
            J = $;
            var X = !0;
            try {
              X = U(!0, $);
            } finally {
              X ? ge() : ((V = !1), (U = null));
            }
          } else V = !1;
        }
        var ge;
        if (typeof P == "function")
          ge = function () {
            P(de);
          };
        else if (typeof MessageChannel < "u") {
          var le = new MessageChannel(),
            Ee = le.port2;
          ((le.port1.onmessage = de),
            (ge = function () {
              Ee.postMessage(null);
            }));
        } else
          ge = function () {
            x(de, 0);
          };
        function te($) {
          ((U = $), V || ((V = !0), ge()));
        }
        function Z($, X) {
          D = x(function () {
            $(e.unstable_now());
          }, X);
        }
        ((e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function ($) {
            $.callback = null;
          }),
          (e.unstable_continueExecution = function () {
            E || C || ((E = !0), te(M));
          }),
          (e.unstable_forceFrameRate = function ($) {
            0 > $ || 125 < $
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (Q = 0 < $ ? Math.floor(1e3 / $) : 5);
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return w;
          }),
          (e.unstable_getFirstCallbackNode = function () {
            return n(f);
          }),
          (e.unstable_next = function ($) {
            switch (w) {
              case 1:
              case 2:
              case 3:
                var X = 3;
                break;
              default:
                X = w;
            }
            var W = w;
            w = X;
            try {
              return $();
            } finally {
              w = W;
            }
          }),
          (e.unstable_pauseExecution = function () {}),
          (e.unstable_requestPaint = function () {}),
          (e.unstable_runWithPriority = function ($, X) {
            switch ($) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                $ = 3;
            }
            var W = w;
            w = $;
            try {
              return X();
            } finally {
              w = W;
            }
          }),
          (e.unstable_scheduleCallback = function ($, X, W) {
            var L = e.unstable_now();
            switch (
              (typeof W == "object" && W !== null
                ? ((W = W.delay),
                  (W = typeof W == "number" && 0 < W ? L + W : L))
                : (W = L),
              $)
            ) {
              case 1:
                var H = -1;
                break;
              case 2:
                H = 250;
                break;
              case 5:
                H = 1073741823;
                break;
              case 4:
                H = 1e4;
                break;
              default:
                H = 5e3;
            }
            return (
              (H = W + H),
              ($ = {
                id: m++,
                callback: X,
                priorityLevel: $,
                startTime: W,
                expirationTime: H,
                sortIndex: -1,
              }),
              W > L
                ? (($.sortIndex = W),
                  t(h, $),
                  n(f) === null &&
                    $ === n(h) &&
                    (v ? (T(D), (D = -1)) : (v = !0), Z(_, W - L)))
                : (($.sortIndex = H), t(f, $), E || C || ((E = !0), te(M))),
              $
            );
          }),
          (e.unstable_shouldYield = ee),
          (e.unstable_wrapCallback = function ($) {
            var X = w;
            return function () {
              var W = w;
              w = X;
              try {
                return $.apply(this, arguments);
              } finally {
                w = W;
              }
            };
          }));
      })(ff)),
    ff
  );
}
var sv;
function wT() {
  return (sv || ((sv = 1), (df.exports = vT())), df.exports);
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ov;
function xT() {
  if (ov) return Bt;
  ov = 1;
  var e = Yh(),
    t = wT();
  function n(r) {
    for (
      var o = "https://reactjs.org/docs/error-decoder.html?invariant=" + r,
        a = 1;
      a < arguments.length;
      a++
    )
      o += "&args[]=" + encodeURIComponent(arguments[a]);
    return (
      "Minified React error #" +
      r +
      "; visit " +
      o +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var s = new Set(),
    i = {};
  function l(r, o) {
    (c(r, o), c(r + "Capture", o));
  }
  function c(r, o) {
    for (i[r] = o, r = 0; r < o.length; r++) s.add(o[r]);
  }
  var u = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    f = Object.prototype.hasOwnProperty,
    h =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    m = {},
    y = {};
  function w(r) {
    return f.call(y, r)
      ? !0
      : f.call(m, r)
        ? !1
        : h.test(r)
          ? (y[r] = !0)
          : ((m[r] = !0), !1);
  }
  function C(r, o, a, d) {
    if (a !== null && a.type === 0) return !1;
    switch (typeof o) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return d
          ? !1
          : a !== null
            ? !a.acceptsBooleans
            : ((r = r.toLowerCase().slice(0, 5)),
              r !== "data-" && r !== "aria-");
      default:
        return !1;
    }
  }
  function E(r, o, a, d) {
    if (o === null || typeof o > "u" || C(r, o, a, d)) return !0;
    if (d) return !1;
    if (a !== null)
      switch (a.type) {
        case 3:
          return !o;
        case 4:
          return o === !1;
        case 5:
          return isNaN(o);
        case 6:
          return isNaN(o) || 1 > o;
      }
    return !1;
  }
  function v(r, o, a, d, p, g, k) {
    ((this.acceptsBooleans = o === 2 || o === 3 || o === 4),
      (this.attributeName = d),
      (this.attributeNamespace = p),
      (this.mustUseProperty = a),
      (this.propertyName = r),
      (this.type = o),
      (this.sanitizeURL = g),
      (this.removeEmptyString = k));
  }
  var x = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (r) {
      x[r] = new v(r, 0, !1, r, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (r) {
      var o = r[0];
      x[o] = new v(o, 1, !1, r[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (r) {
        x[r] = new v(r, 2, !1, r.toLowerCase(), null, !1, !1);
      },
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (r) {
      x[r] = new v(r, 2, !1, r, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (r) {
        x[r] = new v(r, 3, !1, r.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (r) {
      x[r] = new v(r, 3, !0, r, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (r) {
      x[r] = new v(r, 4, !1, r, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (r) {
      x[r] = new v(r, 6, !1, r, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (r) {
      x[r] = new v(r, 5, !1, r.toLowerCase(), null, !1, !1);
    }));
  var T = /[\-:]([a-z])/g;
  function P(r) {
    return r[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (r) {
      var o = r.replace(T, P);
      x[o] = new v(o, 1, !1, r, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (r) {
        var o = r.replace(T, P);
        x[o] = new v(o, 1, !1, r, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (r) {
      var o = r.replace(T, P);
      x[o] = new v(o, 1, !1, r, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (r) {
      x[r] = new v(r, 1, !1, r.toLowerCase(), null, !1, !1);
    }),
    (x.xlinkHref = new v(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1,
    )),
    ["src", "href", "action", "formAction"].forEach(function (r) {
      x[r] = new v(r, 1, !1, r.toLowerCase(), null, !0, !0);
    }));
  function R(r, o, a, d) {
    var p = x.hasOwnProperty(o) ? x[o] : null;
    (p !== null
      ? p.type !== 0
      : d ||
        !(2 < o.length) ||
        (o[0] !== "o" && o[0] !== "O") ||
        (o[1] !== "n" && o[1] !== "N")) &&
      (E(o, a, p, d) && (a = null),
      d || p === null
        ? w(o) &&
          (a === null ? r.removeAttribute(o) : r.setAttribute(o, "" + a))
        : p.mustUseProperty
          ? (r[p.propertyName] = a === null ? (p.type === 3 ? !1 : "") : a)
          : ((o = p.attributeName),
            (d = p.attributeNamespace),
            a === null
              ? r.removeAttribute(o)
              : ((p = p.type),
                (a = p === 3 || (p === 4 && a === !0) ? "" : "" + a),
                d ? r.setAttributeNS(d, o, a) : r.setAttribute(o, a))));
  }
  var _ = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    M = Symbol.for("react.element"),
    V = Symbol.for("react.portal"),
    U = Symbol.for("react.fragment"),
    D = Symbol.for("react.strict_mode"),
    Q = Symbol.for("react.profiler"),
    J = Symbol.for("react.provider"),
    ee = Symbol.for("react.context"),
    de = Symbol.for("react.forward_ref"),
    ge = Symbol.for("react.suspense"),
    le = Symbol.for("react.suspense_list"),
    Ee = Symbol.for("react.memo"),
    te = Symbol.for("react.lazy"),
    Z = Symbol.for("react.offscreen"),
    $ = Symbol.iterator;
  function X(r) {
    return r === null || typeof r != "object"
      ? null
      : ((r = ($ && r[$]) || r["@@iterator"]),
        typeof r == "function" ? r : null);
  }
  var W = Object.assign,
    L;
  function H(r) {
    if (L === void 0)
      try {
        throw Error();
      } catch (a) {
        var o = a.stack.trim().match(/\n( *(at )?)/);
        L = (o && o[1]) || "";
      }
    return (
      `
` +
      L +
      r
    );
  }
  var we = !1;
  function ve(r, o) {
    if (!r || we) return "";
    we = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (o)
        if (
          ((o = function () {
            throw Error();
          }),
          Object.defineProperty(o.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(o, []);
          } catch (B) {
            var d = B;
          }
          Reflect.construct(r, [], o);
        } else {
          try {
            o.call();
          } catch (B) {
            d = B;
          }
          r.call(o.prototype);
        }
      else {
        try {
          throw Error();
        } catch (B) {
          d = B;
        }
        r();
      }
    } catch (B) {
      if (B && d && typeof B.stack == "string") {
        for (
          var p = B.stack.split(`
`),
            g = d.stack.split(`
`),
            k = p.length - 1,
            A = g.length - 1;
          1 <= k && 0 <= A && p[k] !== g[A];
        )
          A--;
        for (; 1 <= k && 0 <= A; k--, A--)
          if (p[k] !== g[A]) {
            if (k !== 1 || A !== 1)
              do
                if ((k--, A--, 0 > A || p[k] !== g[A])) {
                  var N =
                    `
` + p[k].replace(" at new ", " at ");
                  return (
                    r.displayName &&
                      N.includes("<anonymous>") &&
                      (N = N.replace("<anonymous>", r.displayName)),
                    N
                  );
                }
              while (1 <= k && 0 <= A);
            break;
          }
      }
    } finally {
      ((we = !1), (Error.prepareStackTrace = a));
    }
    return (r = r ? r.displayName || r.name : "") ? H(r) : "";
  }
  function pe(r) {
    switch (r.tag) {
      case 5:
        return H(r.type);
      case 16:
        return H("Lazy");
      case 13:
        return H("Suspense");
      case 19:
        return H("SuspenseList");
      case 0:
      case 2:
      case 15:
        return ((r = ve(r.type, !1)), r);
      case 11:
        return ((r = ve(r.type.render, !1)), r);
      case 1:
        return ((r = ve(r.type, !0)), r);
      default:
        return "";
    }
  }
  function ye(r) {
    if (r == null) return null;
    if (typeof r == "function") return r.displayName || r.name || null;
    if (typeof r == "string") return r;
    switch (r) {
      case U:
        return "Fragment";
      case V:
        return "Portal";
      case Q:
        return "Profiler";
      case D:
        return "StrictMode";
      case ge:
        return "Suspense";
      case le:
        return "SuspenseList";
    }
    if (typeof r == "object")
      switch (r.$$typeof) {
        case ee:
          return (r.displayName || "Context") + ".Consumer";
        case J:
          return (r._context.displayName || "Context") + ".Provider";
        case de:
          var o = r.render;
          return (
            (r = r.displayName),
            r ||
              ((r = o.displayName || o.name || ""),
              (r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef")),
            r
          );
        case Ee:
          return (
            (o = r.displayName || null),
            o !== null ? o : ye(r.type) || "Memo"
          );
        case te:
          ((o = r._payload), (r = r._init));
          try {
            return ye(r(o));
          } catch {}
      }
    return null;
  }
  function ne(r) {
    var o = r.type;
    switch (r.tag) {
      case 24:
        return "Cache";
      case 9:
        return (o.displayName || "Context") + ".Consumer";
      case 10:
        return (o._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (r = o.render),
          (r = r.displayName || r.name || ""),
          o.displayName || (r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return o;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return ye(o);
      case 8:
        return o === D ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof o == "function") return o.displayName || o.name || null;
        if (typeof o == "string") return o;
    }
    return null;
  }
  function me(r) {
    switch (typeof r) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return r;
      case "object":
        return r;
      default:
        return "";
    }
  }
  function fe(r) {
    var o = r.type;
    return (
      (r = r.nodeName) &&
      r.toLowerCase() === "input" &&
      (o === "checkbox" || o === "radio")
    );
  }
  function Pe(r) {
    var o = fe(r) ? "checked" : "value",
      a = Object.getOwnPropertyDescriptor(r.constructor.prototype, o),
      d = "" + r[o];
    if (
      !r.hasOwnProperty(o) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var p = a.get,
        g = a.set;
      return (
        Object.defineProperty(r, o, {
          configurable: !0,
          get: function () {
            return p.call(this);
          },
          set: function (k) {
            ((d = "" + k), g.call(this, k));
          },
        }),
        Object.defineProperty(r, o, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return d;
          },
          setValue: function (k) {
            d = "" + k;
          },
          stopTracking: function () {
            ((r._valueTracker = null), delete r[o]);
          },
        }
      );
    }
  }
  function Ae(r) {
    r._valueTracker || (r._valueTracker = Pe(r));
  }
  function Ne(r) {
    if (!r) return !1;
    var o = r._valueTracker;
    if (!o) return !0;
    var a = o.getValue(),
      d = "";
    return (
      r && (d = fe(r) ? (r.checked ? "true" : "false") : r.value),
      (r = d),
      r !== a ? (o.setValue(r), !0) : !1
    );
  }
  function Ge(r) {
    if (
      ((r = r || (typeof document < "u" ? document : void 0)), typeof r > "u")
    )
      return null;
    try {
      return r.activeElement || r.body;
    } catch {
      return r.body;
    }
  }
  function lt(r, o) {
    var a = o.checked;
    return W({}, o, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? r._wrapperState.initialChecked,
    });
  }
  function fr(r, o) {
    var a = o.defaultValue == null ? "" : o.defaultValue,
      d = o.checked != null ? o.checked : o.defaultChecked;
    ((a = me(o.value != null ? o.value : a)),
      (r._wrapperState = {
        initialChecked: d,
        initialValue: a,
        controlled:
          o.type === "checkbox" || o.type === "radio"
            ? o.checked != null
            : o.value != null,
      }));
  }
  function hr(r, o) {
    ((o = o.checked), o != null && R(r, "checked", o, !1));
  }
  function Kn(r, o) {
    hr(r, o);
    var a = me(o.value),
      d = o.type;
    if (a != null)
      d === "number"
        ? ((a === 0 && r.value === "") || r.value != a) && (r.value = "" + a)
        : r.value !== "" + a && (r.value = "" + a);
    else if (d === "submit" || d === "reset") {
      r.removeAttribute("value");
      return;
    }
    (o.hasOwnProperty("value")
      ? pr(r, o.type, a)
      : o.hasOwnProperty("defaultValue") && pr(r, o.type, me(o.defaultValue)),
      o.checked == null &&
        o.defaultChecked != null &&
        (r.defaultChecked = !!o.defaultChecked));
  }
  function ja(r, o, a) {
    if (o.hasOwnProperty("value") || o.hasOwnProperty("defaultValue")) {
      var d = o.type;
      if (
        !(
          (d !== "submit" && d !== "reset") ||
          (o.value !== void 0 && o.value !== null)
        )
      )
        return;
      ((o = "" + r._wrapperState.initialValue),
        a || o === r.value || (r.value = o),
        (r.defaultValue = o));
    }
    ((a = r.name),
      a !== "" && (r.name = ""),
      (r.defaultChecked = !!r._wrapperState.initialChecked),
      a !== "" && (r.name = a));
  }
  function pr(r, o, a) {
    (o !== "number" || Ge(r.ownerDocument) !== r) &&
      (a == null
        ? (r.defaultValue = "" + r._wrapperState.initialValue)
        : r.defaultValue !== "" + a && (r.defaultValue = "" + a));
  }
  var Zo = Array.isArray;
  function $s(r, o, a, d) {
    if (((r = r.options), o)) {
      o = {};
      for (var p = 0; p < a.length; p++) o["$" + a[p]] = !0;
      for (a = 0; a < r.length; a++)
        ((p = o.hasOwnProperty("$" + r[a].value)),
          r[a].selected !== p && (r[a].selected = p),
          p && d && (r[a].defaultSelected = !0));
    } else {
      for (a = "" + me(a), o = null, p = 0; p < r.length; p++) {
        if (r[p].value === a) {
          ((r[p].selected = !0), d && (r[p].defaultSelected = !0));
          return;
        }
        o !== null || r[p].disabled || (o = r[p]);
      }
      o !== null && (o.selected = !0);
    }
  }
  function gu(r, o) {
    if (o.dangerouslySetInnerHTML != null) throw Error(n(91));
    return W({}, o, {
      value: void 0,
      defaultValue: void 0,
      children: "" + r._wrapperState.initialValue,
    });
  }
  function lm(r, o) {
    var a = o.value;
    if (a == null) {
      if (((a = o.children), (o = o.defaultValue), a != null)) {
        if (o != null) throw Error(n(92));
        if (Zo(a)) {
          if (1 < a.length) throw Error(n(93));
          a = a[0];
        }
        o = a;
      }
      (o == null && (o = ""), (a = o));
    }
    r._wrapperState = { initialValue: me(a) };
  }
  function cm(r, o) {
    var a = me(o.value),
      d = me(o.defaultValue);
    (a != null &&
      ((a = "" + a),
      a !== r.value && (r.value = a),
      o.defaultValue == null && r.defaultValue !== a && (r.defaultValue = a)),
      d != null && (r.defaultValue = "" + d));
  }
  function um(r) {
    var o = r.textContent;
    o === r._wrapperState.initialValue &&
      o !== "" &&
      o !== null &&
      (r.value = o);
  }
  function dm(r) {
    switch (r) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function yu(r, o) {
    return r == null || r === "http://www.w3.org/1999/xhtml"
      ? dm(o)
      : r === "http://www.w3.org/2000/svg" && o === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : r;
  }
  var La,
    fm = (function (r) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (o, a, d, p) {
            MSApp.execUnsafeLocalFunction(function () {
              return r(o, a, d, p);
            });
          }
        : r;
    })(function (r, o) {
      if (r.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in r)
        r.innerHTML = o;
      else {
        for (
          La = La || document.createElement("div"),
            La.innerHTML = "<svg>" + o.valueOf().toString() + "</svg>",
            o = La.firstChild;
          r.firstChild;
        )
          r.removeChild(r.firstChild);
        for (; o.firstChild; ) r.appendChild(o.firstChild);
      }
    });
  function ei(r, o) {
    if (o) {
      var a = r.firstChild;
      if (a && a === r.lastChild && a.nodeType === 3) {
        a.nodeValue = o;
        return;
      }
    }
    r.textContent = o;
  }
  var ti = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    vC = ["Webkit", "ms", "Moz", "O"];
  Object.keys(ti).forEach(function (r) {
    vC.forEach(function (o) {
      ((o = o + r.charAt(0).toUpperCase() + r.substring(1)), (ti[o] = ti[r]));
    });
  });
  function hm(r, o, a) {
    return o == null || typeof o == "boolean" || o === ""
      ? ""
      : a || typeof o != "number" || o === 0 || (ti.hasOwnProperty(r) && ti[r])
        ? ("" + o).trim()
        : o + "px";
  }
  function pm(r, o) {
    r = r.style;
    for (var a in o)
      if (o.hasOwnProperty(a)) {
        var d = a.indexOf("--") === 0,
          p = hm(a, o[a], d);
        (a === "float" && (a = "cssFloat"),
          d ? r.setProperty(a, p) : (r[a] = p));
      }
  }
  var wC = W(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
  );
  function vu(r, o) {
    if (o) {
      if (wC[r] && (o.children != null || o.dangerouslySetInnerHTML != null))
        throw Error(n(137, r));
      if (o.dangerouslySetInnerHTML != null) {
        if (o.children != null) throw Error(n(60));
        if (
          typeof o.dangerouslySetInnerHTML != "object" ||
          !("__html" in o.dangerouslySetInnerHTML)
        )
          throw Error(n(61));
      }
      if (o.style != null && typeof o.style != "object") throw Error(n(62));
    }
  }
  function wu(r, o) {
    if (r.indexOf("-") === -1) return typeof o.is == "string";
    switch (r) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var xu = null;
  function Su(r) {
    return (
      (r = r.target || r.srcElement || window),
      r.correspondingUseElement && (r = r.correspondingUseElement),
      r.nodeType === 3 ? r.parentNode : r
    );
  }
  var bu = null,
    Ws = null,
    Hs = null;
  function mm(r) {
    if ((r = Ei(r))) {
      if (typeof bu != "function") throw Error(n(280));
      var o = r.stateNode;
      o && ((o = rl(o)), bu(r.stateNode, r.type, o));
    }
  }
  function gm(r) {
    Ws ? (Hs ? Hs.push(r) : (Hs = [r])) : (Ws = r);
  }
  function ym() {
    if (Ws) {
      var r = Ws,
        o = Hs;
      if (((Hs = Ws = null), mm(r), o)) for (r = 0; r < o.length; r++) mm(o[r]);
    }
  }
  function vm(r, o) {
    return r(o);
  }
  function wm() {}
  var Eu = !1;
  function xm(r, o, a) {
    if (Eu) return r(o, a);
    Eu = !0;
    try {
      return vm(r, o, a);
    } finally {
      ((Eu = !1), (Ws !== null || Hs !== null) && (wm(), ym()));
    }
  }
  function ni(r, o) {
    var a = r.stateNode;
    if (a === null) return null;
    var d = rl(a);
    if (d === null) return null;
    a = d[o];
    e: switch (o) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((d = !d.disabled) ||
          ((r = r.type),
          (d = !(
            r === "button" ||
            r === "input" ||
            r === "select" ||
            r === "textarea"
          ))),
          (r = !d));
        break e;
      default:
        r = !1;
    }
    if (r) return null;
    if (a && typeof a != "function") throw Error(n(231, o, typeof a));
    return a;
  }
  var Cu = !1;
  if (u)
    try {
      var ri = {};
      (Object.defineProperty(ri, "passive", {
        get: function () {
          Cu = !0;
        },
      }),
        window.addEventListener("test", ri, ri),
        window.removeEventListener("test", ri, ri));
    } catch {
      Cu = !1;
    }
  function xC(r, o, a, d, p, g, k, A, N) {
    var B = Array.prototype.slice.call(arguments, 3);
    try {
      o.apply(a, B);
    } catch (K) {
      this.onError(K);
    }
  }
  var si = !1,
    Ma = null,
    Da = !1,
    ku = null,
    SC = {
      onError: function (r) {
        ((si = !0), (Ma = r));
      },
    };
  function bC(r, o, a, d, p, g, k, A, N) {
    ((si = !1), (Ma = null), xC.apply(SC, arguments));
  }
  function EC(r, o, a, d, p, g, k, A, N) {
    if ((bC.apply(this, arguments), si)) {
      if (si) {
        var B = Ma;
        ((si = !1), (Ma = null));
      } else throw Error(n(198));
      Da || ((Da = !0), (ku = B));
    }
  }
  function ss(r) {
    var o = r,
      a = r;
    if (r.alternate) for (; o.return; ) o = o.return;
    else {
      r = o;
      do ((o = r), (o.flags & 4098) !== 0 && (a = o.return), (r = o.return));
      while (r);
    }
    return o.tag === 3 ? a : null;
  }
  function Sm(r) {
    if (r.tag === 13) {
      var o = r.memoizedState;
      if (
        (o === null && ((r = r.alternate), r !== null && (o = r.memoizedState)),
        o !== null)
      )
        return o.dehydrated;
    }
    return null;
  }
  function bm(r) {
    if (ss(r) !== r) throw Error(n(188));
  }
  function CC(r) {
    var o = r.alternate;
    if (!o) {
      if (((o = ss(r)), o === null)) throw Error(n(188));
      return o !== r ? null : r;
    }
    for (var a = r, d = o; ; ) {
      var p = a.return;
      if (p === null) break;
      var g = p.alternate;
      if (g === null) {
        if (((d = p.return), d !== null)) {
          a = d;
          continue;
        }
        break;
      }
      if (p.child === g.child) {
        for (g = p.child; g; ) {
          if (g === a) return (bm(p), r);
          if (g === d) return (bm(p), o);
          g = g.sibling;
        }
        throw Error(n(188));
      }
      if (a.return !== d.return) ((a = p), (d = g));
      else {
        for (var k = !1, A = p.child; A; ) {
          if (A === a) {
            ((k = !0), (a = p), (d = g));
            break;
          }
          if (A === d) {
            ((k = !0), (d = p), (a = g));
            break;
          }
          A = A.sibling;
        }
        if (!k) {
          for (A = g.child; A; ) {
            if (A === a) {
              ((k = !0), (a = g), (d = p));
              break;
            }
            if (A === d) {
              ((k = !0), (d = g), (a = p));
              break;
            }
            A = A.sibling;
          }
          if (!k) throw Error(n(189));
        }
      }
      if (a.alternate !== d) throw Error(n(190));
    }
    if (a.tag !== 3) throw Error(n(188));
    return a.stateNode.current === a ? r : o;
  }
  function Em(r) {
    return ((r = CC(r)), r !== null ? Cm(r) : null);
  }
  function Cm(r) {
    if (r.tag === 5 || r.tag === 6) return r;
    for (r = r.child; r !== null; ) {
      var o = Cm(r);
      if (o !== null) return o;
      r = r.sibling;
    }
    return null;
  }
  var km = t.unstable_scheduleCallback,
    Tm = t.unstable_cancelCallback,
    kC = t.unstable_shouldYield,
    TC = t.unstable_requestPaint,
    et = t.unstable_now,
    PC = t.unstable_getCurrentPriorityLevel,
    Tu = t.unstable_ImmediatePriority,
    Pm = t.unstable_UserBlockingPriority,
    Ia = t.unstable_NormalPriority,
    RC = t.unstable_LowPriority,
    Rm = t.unstable_IdlePriority,
    Fa = null,
    _n = null;
  function AC(r) {
    if (_n && typeof _n.onCommitFiberRoot == "function")
      try {
        _n.onCommitFiberRoot(Fa, r, void 0, (r.current.flags & 128) === 128);
      } catch {}
  }
  var pn = Math.clz32 ? Math.clz32 : OC,
    _C = Math.log,
    NC = Math.LN2;
  function OC(r) {
    return ((r >>>= 0), r === 0 ? 32 : (31 - ((_C(r) / NC) | 0)) | 0);
  }
  var Va = 64,
    Ba = 4194304;
  function oi(r) {
    switch (r & -r) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return r & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return r;
    }
  }
  function Ua(r, o) {
    var a = r.pendingLanes;
    if (a === 0) return 0;
    var d = 0,
      p = r.suspendedLanes,
      g = r.pingedLanes,
      k = a & 268435455;
    if (k !== 0) {
      var A = k & ~p;
      A !== 0 ? (d = oi(A)) : ((g &= k), g !== 0 && (d = oi(g)));
    } else ((k = a & ~p), k !== 0 ? (d = oi(k)) : g !== 0 && (d = oi(g)));
    if (d === 0) return 0;
    if (
      o !== 0 &&
      o !== d &&
      (o & p) === 0 &&
      ((p = d & -d), (g = o & -o), p >= g || (p === 16 && (g & 4194240) !== 0))
    )
      return o;
    if (((d & 4) !== 0 && (d |= a & 16), (o = r.entangledLanes), o !== 0))
      for (r = r.entanglements, o &= d; 0 < o; )
        ((a = 31 - pn(o)), (p = 1 << a), (d |= r[a]), (o &= ~p));
    return d;
  }
  function jC(r, o) {
    switch (r) {
      case 1:
      case 2:
      case 4:
        return o + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return o + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function LC(r, o) {
    for (
      var a = r.suspendedLanes,
        d = r.pingedLanes,
        p = r.expirationTimes,
        g = r.pendingLanes;
      0 < g;
    ) {
      var k = 31 - pn(g),
        A = 1 << k,
        N = p[k];
      (N === -1
        ? ((A & a) === 0 || (A & d) !== 0) && (p[k] = jC(A, o))
        : N <= o && (r.expiredLanes |= A),
        (g &= ~A));
    }
  }
  function Pu(r) {
    return (
      (r = r.pendingLanes & -1073741825),
      r !== 0 ? r : r & 1073741824 ? 1073741824 : 0
    );
  }
  function Am() {
    var r = Va;
    return ((Va <<= 1), (Va & 4194240) === 0 && (Va = 64), r);
  }
  function Ru(r) {
    for (var o = [], a = 0; 31 > a; a++) o.push(r);
    return o;
  }
  function ii(r, o, a) {
    ((r.pendingLanes |= o),
      o !== 536870912 && ((r.suspendedLanes = 0), (r.pingedLanes = 0)),
      (r = r.eventTimes),
      (o = 31 - pn(o)),
      (r[o] = a));
  }
  function MC(r, o) {
    var a = r.pendingLanes & ~o;
    ((r.pendingLanes = o),
      (r.suspendedLanes = 0),
      (r.pingedLanes = 0),
      (r.expiredLanes &= o),
      (r.mutableReadLanes &= o),
      (r.entangledLanes &= o),
      (o = r.entanglements));
    var d = r.eventTimes;
    for (r = r.expirationTimes; 0 < a; ) {
      var p = 31 - pn(a),
        g = 1 << p;
      ((o[p] = 0), (d[p] = -1), (r[p] = -1), (a &= ~g));
    }
  }
  function Au(r, o) {
    var a = (r.entangledLanes |= o);
    for (r = r.entanglements; a; ) {
      var d = 31 - pn(a),
        p = 1 << d;
      ((p & o) | (r[d] & o) && (r[d] |= o), (a &= ~p));
    }
  }
  var Fe = 0;
  function _m(r) {
    return (
      (r &= -r),
      1 < r ? (4 < r ? ((r & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
  }
  var Nm,
    _u,
    Om,
    jm,
    Lm,
    Nu = !1,
    za = [],
    mr = null,
    gr = null,
    yr = null,
    ai = new Map(),
    li = new Map(),
    vr = [],
    DC =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " ",
      );
  function Mm(r, o) {
    switch (r) {
      case "focusin":
      case "focusout":
        mr = null;
        break;
      case "dragenter":
      case "dragleave":
        gr = null;
        break;
      case "mouseover":
      case "mouseout":
        yr = null;
        break;
      case "pointerover":
      case "pointerout":
        ai.delete(o.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        li.delete(o.pointerId);
    }
  }
  function ci(r, o, a, d, p, g) {
    return r === null || r.nativeEvent !== g
      ? ((r = {
          blockedOn: o,
          domEventName: a,
          eventSystemFlags: d,
          nativeEvent: g,
          targetContainers: [p],
        }),
        o !== null && ((o = Ei(o)), o !== null && _u(o)),
        r)
      : ((r.eventSystemFlags |= d),
        (o = r.targetContainers),
        p !== null && o.indexOf(p) === -1 && o.push(p),
        r);
  }
  function IC(r, o, a, d, p) {
    switch (o) {
      case "focusin":
        return ((mr = ci(mr, r, o, a, d, p)), !0);
      case "dragenter":
        return ((gr = ci(gr, r, o, a, d, p)), !0);
      case "mouseover":
        return ((yr = ci(yr, r, o, a, d, p)), !0);
      case "pointerover":
        var g = p.pointerId;
        return (ai.set(g, ci(ai.get(g) || null, r, o, a, d, p)), !0);
      case "gotpointercapture":
        return (
          (g = p.pointerId),
          li.set(g, ci(li.get(g) || null, r, o, a, d, p)),
          !0
        );
    }
    return !1;
  }
  function Dm(r) {
    var o = os(r.target);
    if (o !== null) {
      var a = ss(o);
      if (a !== null) {
        if (((o = a.tag), o === 13)) {
          if (((o = Sm(a)), o !== null)) {
            ((r.blockedOn = o),
              Lm(r.priority, function () {
                Om(a);
              }));
            return;
          }
        } else if (o === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          r.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    r.blockedOn = null;
  }
  function $a(r) {
    if (r.blockedOn !== null) return !1;
    for (var o = r.targetContainers; 0 < o.length; ) {
      var a = ju(r.domEventName, r.eventSystemFlags, o[0], r.nativeEvent);
      if (a === null) {
        a = r.nativeEvent;
        var d = new a.constructor(a.type, a);
        ((xu = d), a.target.dispatchEvent(d), (xu = null));
      } else return ((o = Ei(a)), o !== null && _u(o), (r.blockedOn = a), !1);
      o.shift();
    }
    return !0;
  }
  function Im(r, o, a) {
    $a(r) && a.delete(o);
  }
  function FC() {
    ((Nu = !1),
      mr !== null && $a(mr) && (mr = null),
      gr !== null && $a(gr) && (gr = null),
      yr !== null && $a(yr) && (yr = null),
      ai.forEach(Im),
      li.forEach(Im));
  }
  function ui(r, o) {
    r.blockedOn === o &&
      ((r.blockedOn = null),
      Nu ||
        ((Nu = !0),
        t.unstable_scheduleCallback(t.unstable_NormalPriority, FC)));
  }
  function di(r) {
    function o(p) {
      return ui(p, r);
    }
    if (0 < za.length) {
      ui(za[0], r);
      for (var a = 1; a < za.length; a++) {
        var d = za[a];
        d.blockedOn === r && (d.blockedOn = null);
      }
    }
    for (
      mr !== null && ui(mr, r),
        gr !== null && ui(gr, r),
        yr !== null && ui(yr, r),
        ai.forEach(o),
        li.forEach(o),
        a = 0;
      a < vr.length;
      a++
    )
      ((d = vr[a]), d.blockedOn === r && (d.blockedOn = null));
    for (; 0 < vr.length && ((a = vr[0]), a.blockedOn === null); )
      (Dm(a), a.blockedOn === null && vr.shift());
  }
  var qs = _.ReactCurrentBatchConfig,
    Wa = !0;
  function VC(r, o, a, d) {
    var p = Fe,
      g = qs.transition;
    qs.transition = null;
    try {
      ((Fe = 1), Ou(r, o, a, d));
    } finally {
      ((Fe = p), (qs.transition = g));
    }
  }
  function BC(r, o, a, d) {
    var p = Fe,
      g = qs.transition;
    qs.transition = null;
    try {
      ((Fe = 4), Ou(r, o, a, d));
    } finally {
      ((Fe = p), (qs.transition = g));
    }
  }
  function Ou(r, o, a, d) {
    if (Wa) {
      var p = ju(r, o, a, d);
      if (p === null) (Yu(r, o, d, Ha, a), Mm(r, d));
      else if (IC(p, r, o, a, d)) d.stopPropagation();
      else if ((Mm(r, d), o & 4 && -1 < DC.indexOf(r))) {
        for (; p !== null; ) {
          var g = Ei(p);
          if (
            (g !== null && Nm(g),
            (g = ju(r, o, a, d)),
            g === null && Yu(r, o, d, Ha, a),
            g === p)
          )
            break;
          p = g;
        }
        p !== null && d.stopPropagation();
      } else Yu(r, o, d, null, a);
    }
  }
  var Ha = null;
  function ju(r, o, a, d) {
    if (((Ha = null), (r = Su(d)), (r = os(r)), r !== null))
      if (((o = ss(r)), o === null)) r = null;
      else if (((a = o.tag), a === 13)) {
        if (((r = Sm(o)), r !== null)) return r;
        r = null;
      } else if (a === 3) {
        if (o.stateNode.current.memoizedState.isDehydrated)
          return o.tag === 3 ? o.stateNode.containerInfo : null;
        r = null;
      } else o !== r && (r = null);
    return ((Ha = r), null);
  }
  function Fm(r) {
    switch (r) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (PC()) {
          case Tu:
            return 1;
          case Pm:
            return 4;
          case Ia:
          case RC:
            return 16;
          case Rm:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var wr = null,
    Lu = null,
    qa = null;
  function Vm() {
    if (qa) return qa;
    var r,
      o = Lu,
      a = o.length,
      d,
      p = "value" in wr ? wr.value : wr.textContent,
      g = p.length;
    for (r = 0; r < a && o[r] === p[r]; r++);
    var k = a - r;
    for (d = 1; d <= k && o[a - d] === p[g - d]; d++);
    return (qa = p.slice(r, 1 < d ? 1 - d : void 0));
  }
  function Ka(r) {
    var o = r.keyCode;
    return (
      "charCode" in r
        ? ((r = r.charCode), r === 0 && o === 13 && (r = 13))
        : (r = o),
      r === 10 && (r = 13),
      32 <= r || r === 13 ? r : 0
    );
  }
  function Qa() {
    return !0;
  }
  function Bm() {
    return !1;
  }
  function qt(r) {
    function o(a, d, p, g, k) {
      ((this._reactName = a),
        (this._targetInst = p),
        (this.type = d),
        (this.nativeEvent = g),
        (this.target = k),
        (this.currentTarget = null));
      for (var A in r)
        r.hasOwnProperty(A) && ((a = r[A]), (this[A] = a ? a(g) : g[A]));
      return (
        (this.isDefaultPrevented = (
          g.defaultPrevented != null ? g.defaultPrevented : g.returnValue === !1
        )
          ? Qa
          : Bm),
        (this.isPropagationStopped = Bm),
        this
      );
    }
    return (
      W(o.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != "unknown" && (a.returnValue = !1),
            (this.isDefaultPrevented = Qa));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = Qa));
        },
        persist: function () {},
        isPersistent: Qa,
      }),
      o
    );
  }
  var Ks = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (r) {
        return r.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Mu = qt(Ks),
    fi = W({}, Ks, { view: 0, detail: 0 }),
    UC = qt(fi),
    Du,
    Iu,
    hi,
    Ga = W({}, fi, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Vu,
      button: 0,
      buttons: 0,
      relatedTarget: function (r) {
        return r.relatedTarget === void 0
          ? r.fromElement === r.srcElement
            ? r.toElement
            : r.fromElement
          : r.relatedTarget;
      },
      movementX: function (r) {
        return "movementX" in r
          ? r.movementX
          : (r !== hi &&
              (hi && r.type === "mousemove"
                ? ((Du = r.screenX - hi.screenX), (Iu = r.screenY - hi.screenY))
                : (Iu = Du = 0),
              (hi = r)),
            Du);
      },
      movementY: function (r) {
        return "movementY" in r ? r.movementY : Iu;
      },
    }),
    Um = qt(Ga),
    zC = W({}, Ga, { dataTransfer: 0 }),
    $C = qt(zC),
    WC = W({}, fi, { relatedTarget: 0 }),
    Fu = qt(WC),
    HC = W({}, Ks, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    qC = qt(HC),
    KC = W({}, Ks, {
      clipboardData: function (r) {
        return "clipboardData" in r ? r.clipboardData : window.clipboardData;
      },
    }),
    QC = qt(KC),
    GC = W({}, Ks, { data: 0 }),
    zm = qt(GC),
    YC = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    XC = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    JC = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function ZC(r) {
    var o = this.nativeEvent;
    return o.getModifierState
      ? o.getModifierState(r)
      : (r = JC[r])
        ? !!o[r]
        : !1;
  }
  function Vu() {
    return ZC;
  }
  var ek = W({}, fi, {
      key: function (r) {
        if (r.key) {
          var o = YC[r.key] || r.key;
          if (o !== "Unidentified") return o;
        }
        return r.type === "keypress"
          ? ((r = Ka(r)), r === 13 ? "Enter" : String.fromCharCode(r))
          : r.type === "keydown" || r.type === "keyup"
            ? XC[r.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Vu,
      charCode: function (r) {
        return r.type === "keypress" ? Ka(r) : 0;
      },
      keyCode: function (r) {
        return r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
      },
      which: function (r) {
        return r.type === "keypress"
          ? Ka(r)
          : r.type === "keydown" || r.type === "keyup"
            ? r.keyCode
            : 0;
      },
    }),
    tk = qt(ek),
    nk = W({}, Ga, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    $m = qt(nk),
    rk = W({}, fi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Vu,
    }),
    sk = qt(rk),
    ok = W({}, Ks, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ik = qt(ok),
    ak = W({}, Ga, {
      deltaX: function (r) {
        return "deltaX" in r
          ? r.deltaX
          : "wheelDeltaX" in r
            ? -r.wheelDeltaX
            : 0;
      },
      deltaY: function (r) {
        return "deltaY" in r
          ? r.deltaY
          : "wheelDeltaY" in r
            ? -r.wheelDeltaY
            : "wheelDelta" in r
              ? -r.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    lk = qt(ak),
    ck = [9, 13, 27, 32],
    Bu = u && "CompositionEvent" in window,
    pi = null;
  u && "documentMode" in document && (pi = document.documentMode);
  var uk = u && "TextEvent" in window && !pi,
    Wm = u && (!Bu || (pi && 8 < pi && 11 >= pi)),
    Hm = " ",
    qm = !1;
  function Km(r, o) {
    switch (r) {
      case "keyup":
        return ck.indexOf(o.keyCode) !== -1;
      case "keydown":
        return o.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Qm(r) {
    return (
      (r = r.detail),
      typeof r == "object" && "data" in r ? r.data : null
    );
  }
  var Qs = !1;
  function dk(r, o) {
    switch (r) {
      case "compositionend":
        return Qm(o);
      case "keypress":
        return o.which !== 32 ? null : ((qm = !0), Hm);
      case "textInput":
        return ((r = o.data), r === Hm && qm ? null : r);
      default:
        return null;
    }
  }
  function fk(r, o) {
    if (Qs)
      return r === "compositionend" || (!Bu && Km(r, o))
        ? ((r = Vm()), (qa = Lu = wr = null), (Qs = !1), r)
        : null;
    switch (r) {
      case "paste":
        return null;
      case "keypress":
        if (!(o.ctrlKey || o.altKey || o.metaKey) || (o.ctrlKey && o.altKey)) {
          if (o.char && 1 < o.char.length) return o.char;
          if (o.which) return String.fromCharCode(o.which);
        }
        return null;
      case "compositionend":
        return Wm && o.locale !== "ko" ? null : o.data;
      default:
        return null;
    }
  }
  var hk = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Gm(r) {
    var o = r && r.nodeName && r.nodeName.toLowerCase();
    return o === "input" ? !!hk[r.type] : o === "textarea";
  }
  function Ym(r, o, a, d) {
    (gm(d),
      (o = el(o, "onChange")),
      0 < o.length &&
        ((a = new Mu("onChange", "change", null, a, d)),
        r.push({ event: a, listeners: o })));
  }
  var mi = null,
    gi = null;
  function pk(r) {
    pg(r, 0);
  }
  function Ya(r) {
    var o = Zs(r);
    if (Ne(o)) return r;
  }
  function mk(r, o) {
    if (r === "change") return o;
  }
  var Xm = !1;
  if (u) {
    var Uu;
    if (u) {
      var zu = "oninput" in document;
      if (!zu) {
        var Jm = document.createElement("div");
        (Jm.setAttribute("oninput", "return;"),
          (zu = typeof Jm.oninput == "function"));
      }
      Uu = zu;
    } else Uu = !1;
    Xm = Uu && (!document.documentMode || 9 < document.documentMode);
  }
  function Zm() {
    mi && (mi.detachEvent("onpropertychange", eg), (gi = mi = null));
  }
  function eg(r) {
    if (r.propertyName === "value" && Ya(gi)) {
      var o = [];
      (Ym(o, gi, r, Su(r)), xm(pk, o));
    }
  }
  function gk(r, o, a) {
    r === "focusin"
      ? (Zm(), (mi = o), (gi = a), mi.attachEvent("onpropertychange", eg))
      : r === "focusout" && Zm();
  }
  function yk(r) {
    if (r === "selectionchange" || r === "keyup" || r === "keydown")
      return Ya(gi);
  }
  function vk(r, o) {
    if (r === "click") return Ya(o);
  }
  function wk(r, o) {
    if (r === "input" || r === "change") return Ya(o);
  }
  function xk(r, o) {
    return (r === o && (r !== 0 || 1 / r === 1 / o)) || (r !== r && o !== o);
  }
  var mn = typeof Object.is == "function" ? Object.is : xk;
  function yi(r, o) {
    if (mn(r, o)) return !0;
    if (
      typeof r != "object" ||
      r === null ||
      typeof o != "object" ||
      o === null
    )
      return !1;
    var a = Object.keys(r),
      d = Object.keys(o);
    if (a.length !== d.length) return !1;
    for (d = 0; d < a.length; d++) {
      var p = a[d];
      if (!f.call(o, p) || !mn(r[p], o[p])) return !1;
    }
    return !0;
  }
  function tg(r) {
    for (; r && r.firstChild; ) r = r.firstChild;
    return r;
  }
  function ng(r, o) {
    var a = tg(r);
    r = 0;
    for (var d; a; ) {
      if (a.nodeType === 3) {
        if (((d = r + a.textContent.length), r <= o && d >= o))
          return { node: a, offset: o - r };
        r = d;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = tg(a);
    }
  }
  function rg(r, o) {
    return r && o
      ? r === o
        ? !0
        : r && r.nodeType === 3
          ? !1
          : o && o.nodeType === 3
            ? rg(r, o.parentNode)
            : "contains" in r
              ? r.contains(o)
              : r.compareDocumentPosition
                ? !!(r.compareDocumentPosition(o) & 16)
                : !1
      : !1;
  }
  function sg() {
    for (var r = window, o = Ge(); o instanceof r.HTMLIFrameElement; ) {
      try {
        var a = typeof o.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) r = o.contentWindow;
      else break;
      o = Ge(r.document);
    }
    return o;
  }
  function $u(r) {
    var o = r && r.nodeName && r.nodeName.toLowerCase();
    return (
      o &&
      ((o === "input" &&
        (r.type === "text" ||
          r.type === "search" ||
          r.type === "tel" ||
          r.type === "url" ||
          r.type === "password")) ||
        o === "textarea" ||
        r.contentEditable === "true")
    );
  }
  function Sk(r) {
    var o = sg(),
      a = r.focusedElem,
      d = r.selectionRange;
    if (
      o !== a &&
      a &&
      a.ownerDocument &&
      rg(a.ownerDocument.documentElement, a)
    ) {
      if (d !== null && $u(a)) {
        if (
          ((o = d.start),
          (r = d.end),
          r === void 0 && (r = o),
          "selectionStart" in a)
        )
          ((a.selectionStart = o),
            (a.selectionEnd = Math.min(r, a.value.length)));
        else if (
          ((r = ((o = a.ownerDocument || document) && o.defaultView) || window),
          r.getSelection)
        ) {
          r = r.getSelection();
          var p = a.textContent.length,
            g = Math.min(d.start, p);
          ((d = d.end === void 0 ? g : Math.min(d.end, p)),
            !r.extend && g > d && ((p = d), (d = g), (g = p)),
            (p = ng(a, g)));
          var k = ng(a, d);
          p &&
            k &&
            (r.rangeCount !== 1 ||
              r.anchorNode !== p.node ||
              r.anchorOffset !== p.offset ||
              r.focusNode !== k.node ||
              r.focusOffset !== k.offset) &&
            ((o = o.createRange()),
            o.setStart(p.node, p.offset),
            r.removeAllRanges(),
            g > d
              ? (r.addRange(o), r.extend(k.node, k.offset))
              : (o.setEnd(k.node, k.offset), r.addRange(o)));
        }
      }
      for (o = [], r = a; (r = r.parentNode); )
        r.nodeType === 1 &&
          o.push({ element: r, left: r.scrollLeft, top: r.scrollTop });
      for (typeof a.focus == "function" && a.focus(), a = 0; a < o.length; a++)
        ((r = o[a]),
          (r.element.scrollLeft = r.left),
          (r.element.scrollTop = r.top));
    }
  }
  var bk = u && "documentMode" in document && 11 >= document.documentMode,
    Gs = null,
    Wu = null,
    vi = null,
    Hu = !1;
  function og(r, o, a) {
    var d =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Hu ||
      Gs == null ||
      Gs !== Ge(d) ||
      ((d = Gs),
      "selectionStart" in d && $u(d)
        ? (d = { start: d.selectionStart, end: d.selectionEnd })
        : ((d = (
            (d.ownerDocument && d.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (d = {
            anchorNode: d.anchorNode,
            anchorOffset: d.anchorOffset,
            focusNode: d.focusNode,
            focusOffset: d.focusOffset,
          })),
      (vi && yi(vi, d)) ||
        ((vi = d),
        (d = el(Wu, "onSelect")),
        0 < d.length &&
          ((o = new Mu("onSelect", "select", null, o, a)),
          r.push({ event: o, listeners: d }),
          (o.target = Gs))));
  }
  function Xa(r, o) {
    var a = {};
    return (
      (a[r.toLowerCase()] = o.toLowerCase()),
      (a["Webkit" + r] = "webkit" + o),
      (a["Moz" + r] = "moz" + o),
      a
    );
  }
  var Ys = {
      animationend: Xa("Animation", "AnimationEnd"),
      animationiteration: Xa("Animation", "AnimationIteration"),
      animationstart: Xa("Animation", "AnimationStart"),
      transitionend: Xa("Transition", "TransitionEnd"),
    },
    qu = {},
    ig = {};
  u &&
    ((ig = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Ys.animationend.animation,
      delete Ys.animationiteration.animation,
      delete Ys.animationstart.animation),
    "TransitionEvent" in window || delete Ys.transitionend.transition);
  function Ja(r) {
    if (qu[r]) return qu[r];
    if (!Ys[r]) return r;
    var o = Ys[r],
      a;
    for (a in o) if (o.hasOwnProperty(a) && a in ig) return (qu[r] = o[a]);
    return r;
  }
  var ag = Ja("animationend"),
    lg = Ja("animationiteration"),
    cg = Ja("animationstart"),
    ug = Ja("transitionend"),
    dg = new Map(),
    fg =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  function xr(r, o) {
    (dg.set(r, o), l(o, [r]));
  }
  for (var Ku = 0; Ku < fg.length; Ku++) {
    var Qu = fg[Ku],
      Ek = Qu.toLowerCase(),
      Ck = Qu[0].toUpperCase() + Qu.slice(1);
    xr(Ek, "on" + Ck);
  }
  (xr(ag, "onAnimationEnd"),
    xr(lg, "onAnimationIteration"),
    xr(cg, "onAnimationStart"),
    xr("dblclick", "onDoubleClick"),
    xr("focusin", "onFocus"),
    xr("focusout", "onBlur"),
    xr(ug, "onTransitionEnd"),
    c("onMouseEnter", ["mouseout", "mouseover"]),
    c("onMouseLeave", ["mouseout", "mouseover"]),
    c("onPointerEnter", ["pointerout", "pointerover"]),
    c("onPointerLeave", ["pointerout", "pointerover"]),
    l(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    l(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    l("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    l(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    l(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    l(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var wi =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    kk = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(wi),
    );
  function hg(r, o, a) {
    var d = r.type || "unknown-event";
    ((r.currentTarget = a), EC(d, o, void 0, r), (r.currentTarget = null));
  }
  function pg(r, o) {
    o = (o & 4) !== 0;
    for (var a = 0; a < r.length; a++) {
      var d = r[a],
        p = d.event;
      d = d.listeners;
      e: {
        var g = void 0;
        if (o)
          for (var k = d.length - 1; 0 <= k; k--) {
            var A = d[k],
              N = A.instance,
              B = A.currentTarget;
            if (((A = A.listener), N !== g && p.isPropagationStopped()))
              break e;
            (hg(p, A, B), (g = N));
          }
        else
          for (k = 0; k < d.length; k++) {
            if (
              ((A = d[k]),
              (N = A.instance),
              (B = A.currentTarget),
              (A = A.listener),
              N !== g && p.isPropagationStopped())
            )
              break e;
            (hg(p, A, B), (g = N));
          }
      }
    }
    if (Da) throw ((r = ku), (Da = !1), (ku = null), r);
  }
  function ze(r, o) {
    var a = o[nd];
    a === void 0 && (a = o[nd] = new Set());
    var d = r + "__bubble";
    a.has(d) || (mg(o, r, 2, !1), a.add(d));
  }
  function Gu(r, o, a) {
    var d = 0;
    (o && (d |= 4), mg(a, r, d, o));
  }
  var Za = "_reactListening" + Math.random().toString(36).slice(2);
  function xi(r) {
    if (!r[Za]) {
      ((r[Za] = !0),
        s.forEach(function (a) {
          a !== "selectionchange" && (kk.has(a) || Gu(a, !1, r), Gu(a, !0, r));
        }));
      var o = r.nodeType === 9 ? r : r.ownerDocument;
      o === null || o[Za] || ((o[Za] = !0), Gu("selectionchange", !1, o));
    }
  }
  function mg(r, o, a, d) {
    switch (Fm(o)) {
      case 1:
        var p = VC;
        break;
      case 4:
        p = BC;
        break;
      default:
        p = Ou;
    }
    ((a = p.bind(null, o, a, r)),
      (p = void 0),
      !Cu ||
        (o !== "touchstart" && o !== "touchmove" && o !== "wheel") ||
        (p = !0),
      d
        ? p !== void 0
          ? r.addEventListener(o, a, { capture: !0, passive: p })
          : r.addEventListener(o, a, !0)
        : p !== void 0
          ? r.addEventListener(o, a, { passive: p })
          : r.addEventListener(o, a, !1));
  }
  function Yu(r, o, a, d, p) {
    var g = d;
    if ((o & 1) === 0 && (o & 2) === 0 && d !== null)
      e: for (;;) {
        if (d === null) return;
        var k = d.tag;
        if (k === 3 || k === 4) {
          var A = d.stateNode.containerInfo;
          if (A === p || (A.nodeType === 8 && A.parentNode === p)) break;
          if (k === 4)
            for (k = d.return; k !== null; ) {
              var N = k.tag;
              if (
                (N === 3 || N === 4) &&
                ((N = k.stateNode.containerInfo),
                N === p || (N.nodeType === 8 && N.parentNode === p))
              )
                return;
              k = k.return;
            }
          for (; A !== null; ) {
            if (((k = os(A)), k === null)) return;
            if (((N = k.tag), N === 5 || N === 6)) {
              d = g = k;
              continue e;
            }
            A = A.parentNode;
          }
        }
        d = d.return;
      }
    xm(function () {
      var B = g,
        K = Su(a),
        G = [];
      e: {
        var q = dg.get(r);
        if (q !== void 0) {
          var re = Mu,
            ie = r;
          switch (r) {
            case "keypress":
              if (Ka(a) === 0) break e;
            case "keydown":
            case "keyup":
              re = tk;
              break;
            case "focusin":
              ((ie = "focus"), (re = Fu));
              break;
            case "focusout":
              ((ie = "blur"), (re = Fu));
              break;
            case "beforeblur":
            case "afterblur":
              re = Fu;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              re = Um;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              re = $C;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              re = sk;
              break;
            case ag:
            case lg:
            case cg:
              re = qC;
              break;
            case ug:
              re = ik;
              break;
            case "scroll":
              re = UC;
              break;
            case "wheel":
              re = lk;
              break;
            case "copy":
            case "cut":
            case "paste":
              re = QC;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              re = $m;
          }
          var ue = (o & 4) !== 0,
            tt = !ue && r === "scroll",
            I = ue ? (q !== null ? q + "Capture" : null) : q;
          ue = [];
          for (var j = B, F; j !== null; ) {
            F = j;
            var Y = F.stateNode;
            if (
              (F.tag === 5 &&
                Y !== null &&
                ((F = Y),
                I !== null &&
                  ((Y = ni(j, I)), Y != null && ue.push(Si(j, Y, F)))),
              tt)
            )
              break;
            j = j.return;
          }
          0 < ue.length &&
            ((q = new re(q, ie, null, a, K)),
            G.push({ event: q, listeners: ue }));
        }
      }
      if ((o & 7) === 0) {
        e: {
          if (
            ((q = r === "mouseover" || r === "pointerover"),
            (re = r === "mouseout" || r === "pointerout"),
            q &&
              a !== xu &&
              (ie = a.relatedTarget || a.fromElement) &&
              (os(ie) || ie[Qn]))
          )
            break e;
          if (
            (re || q) &&
            ((q =
              K.window === K
                ? K
                : (q = K.ownerDocument)
                  ? q.defaultView || q.parentWindow
                  : window),
            re
              ? ((ie = a.relatedTarget || a.toElement),
                (re = B),
                (ie = ie ? os(ie) : null),
                ie !== null &&
                  ((tt = ss(ie)),
                  ie !== tt || (ie.tag !== 5 && ie.tag !== 6)) &&
                  (ie = null))
              : ((re = null), (ie = B)),
            re !== ie)
          ) {
            if (
              ((ue = Um),
              (Y = "onMouseLeave"),
              (I = "onMouseEnter"),
              (j = "mouse"),
              (r === "pointerout" || r === "pointerover") &&
                ((ue = $m),
                (Y = "onPointerLeave"),
                (I = "onPointerEnter"),
                (j = "pointer")),
              (tt = re == null ? q : Zs(re)),
              (F = ie == null ? q : Zs(ie)),
              (q = new ue(Y, j + "leave", re, a, K)),
              (q.target = tt),
              (q.relatedTarget = F),
              (Y = null),
              os(K) === B &&
                ((ue = new ue(I, j + "enter", ie, a, K)),
                (ue.target = F),
                (ue.relatedTarget = tt),
                (Y = ue)),
              (tt = Y),
              re && ie)
            )
              t: {
                for (ue = re, I = ie, j = 0, F = ue; F; F = Xs(F)) j++;
                for (F = 0, Y = I; Y; Y = Xs(Y)) F++;
                for (; 0 < j - F; ) ((ue = Xs(ue)), j--);
                for (; 0 < F - j; ) ((I = Xs(I)), F--);
                for (; j--; ) {
                  if (ue === I || (I !== null && ue === I.alternate)) break t;
                  ((ue = Xs(ue)), (I = Xs(I)));
                }
                ue = null;
              }
            else ue = null;
            (re !== null && gg(G, q, re, ue, !1),
              ie !== null && tt !== null && gg(G, tt, ie, ue, !0));
          }
        }
        e: {
          if (
            ((q = B ? Zs(B) : window),
            (re = q.nodeName && q.nodeName.toLowerCase()),
            re === "select" || (re === "input" && q.type === "file"))
          )
            var he = mk;
          else if (Gm(q))
            if (Xm) he = wk;
            else {
              he = yk;
              var xe = gk;
            }
          else
            (re = q.nodeName) &&
              re.toLowerCase() === "input" &&
              (q.type === "checkbox" || q.type === "radio") &&
              (he = vk);
          if (he && (he = he(r, B))) {
            Ym(G, he, a, K);
            break e;
          }
          (xe && xe(r, q, B),
            r === "focusout" &&
              (xe = q._wrapperState) &&
              xe.controlled &&
              q.type === "number" &&
              pr(q, "number", q.value));
        }
        switch (((xe = B ? Zs(B) : window), r)) {
          case "focusin":
            (Gm(xe) || xe.contentEditable === "true") &&
              ((Gs = xe), (Wu = B), (vi = null));
            break;
          case "focusout":
            vi = Wu = Gs = null;
            break;
          case "mousedown":
            Hu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Hu = !1), og(G, a, K));
            break;
          case "selectionchange":
            if (bk) break;
          case "keydown":
          case "keyup":
            og(G, a, K);
        }
        var Se;
        if (Bu)
          e: {
            switch (r) {
              case "compositionstart":
                var Te = "onCompositionStart";
                break e;
              case "compositionend":
                Te = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Te = "onCompositionUpdate";
                break e;
            }
            Te = void 0;
          }
        else
          Qs
            ? Km(r, a) && (Te = "onCompositionEnd")
            : r === "keydown" &&
              a.keyCode === 229 &&
              (Te = "onCompositionStart");
        (Te &&
          (Wm &&
            a.locale !== "ko" &&
            (Qs || Te !== "onCompositionStart"
              ? Te === "onCompositionEnd" && Qs && (Se = Vm())
              : ((wr = K),
                (Lu = "value" in wr ? wr.value : wr.textContent),
                (Qs = !0))),
          (xe = el(B, Te)),
          0 < xe.length &&
            ((Te = new zm(Te, r, null, a, K)),
            G.push({ event: Te, listeners: xe }),
            Se
              ? (Te.data = Se)
              : ((Se = Qm(a)), Se !== null && (Te.data = Se)))),
          (Se = uk ? dk(r, a) : fk(r, a)) &&
            ((B = el(B, "onBeforeInput")),
            0 < B.length &&
              ((K = new zm("onBeforeInput", "beforeinput", null, a, K)),
              G.push({ event: K, listeners: B }),
              (K.data = Se))));
      }
      pg(G, o);
    });
  }
  function Si(r, o, a) {
    return { instance: r, listener: o, currentTarget: a };
  }
  function el(r, o) {
    for (var a = o + "Capture", d = []; r !== null; ) {
      var p = r,
        g = p.stateNode;
      (p.tag === 5 &&
        g !== null &&
        ((p = g),
        (g = ni(r, a)),
        g != null && d.unshift(Si(r, g, p)),
        (g = ni(r, o)),
        g != null && d.push(Si(r, g, p))),
        (r = r.return));
    }
    return d;
  }
  function Xs(r) {
    if (r === null) return null;
    do r = r.return;
    while (r && r.tag !== 5);
    return r || null;
  }
  function gg(r, o, a, d, p) {
    for (var g = o._reactName, k = []; a !== null && a !== d; ) {
      var A = a,
        N = A.alternate,
        B = A.stateNode;
      if (N !== null && N === d) break;
      (A.tag === 5 &&
        B !== null &&
        ((A = B),
        p
          ? ((N = ni(a, g)), N != null && k.unshift(Si(a, N, A)))
          : p || ((N = ni(a, g)), N != null && k.push(Si(a, N, A)))),
        (a = a.return));
    }
    k.length !== 0 && r.push({ event: o, listeners: k });
  }
  var Tk = /\r\n?/g,
    Pk = /\u0000|\uFFFD/g;
  function yg(r) {
    return (typeof r == "string" ? r : "" + r)
      .replace(
        Tk,
        `
`,
      )
      .replace(Pk, "");
  }
  function tl(r, o, a) {
    if (((o = yg(o)), yg(r) !== o && a)) throw Error(n(425));
  }
  function nl() {}
  var Xu = null,
    Ju = null;
  function Zu(r, o) {
    return (
      r === "textarea" ||
      r === "noscript" ||
      typeof o.children == "string" ||
      typeof o.children == "number" ||
      (typeof o.dangerouslySetInnerHTML == "object" &&
        o.dangerouslySetInnerHTML !== null &&
        o.dangerouslySetInnerHTML.__html != null)
    );
  }
  var ed = typeof setTimeout == "function" ? setTimeout : void 0,
    Rk = typeof clearTimeout == "function" ? clearTimeout : void 0,
    vg = typeof Promise == "function" ? Promise : void 0,
    Ak =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof vg < "u"
          ? function (r) {
              return vg.resolve(null).then(r).catch(_k);
            }
          : ed;
  function _k(r) {
    setTimeout(function () {
      throw r;
    });
  }
  function td(r, o) {
    var a = o,
      d = 0;
    do {
      var p = a.nextSibling;
      if ((r.removeChild(a), p && p.nodeType === 8))
        if (((a = p.data), a === "/$")) {
          if (d === 0) {
            (r.removeChild(p), di(o));
            return;
          }
          d--;
        } else (a !== "$" && a !== "$?" && a !== "$!") || d++;
      a = p;
    } while (a);
    di(o);
  }
  function Sr(r) {
    for (; r != null; r = r.nextSibling) {
      var o = r.nodeType;
      if (o === 1 || o === 3) break;
      if (o === 8) {
        if (((o = r.data), o === "$" || o === "$!" || o === "$?")) break;
        if (o === "/$") return null;
      }
    }
    return r;
  }
  function wg(r) {
    r = r.previousSibling;
    for (var o = 0; r; ) {
      if (r.nodeType === 8) {
        var a = r.data;
        if (a === "$" || a === "$!" || a === "$?") {
          if (o === 0) return r;
          o--;
        } else a === "/$" && o++;
      }
      r = r.previousSibling;
    }
    return null;
  }
  var Js = Math.random().toString(36).slice(2),
    Nn = "__reactFiber$" + Js,
    bi = "__reactProps$" + Js,
    Qn = "__reactContainer$" + Js,
    nd = "__reactEvents$" + Js,
    Nk = "__reactListeners$" + Js,
    Ok = "__reactHandles$" + Js;
  function os(r) {
    var o = r[Nn];
    if (o) return o;
    for (var a = r.parentNode; a; ) {
      if ((o = a[Qn] || a[Nn])) {
        if (
          ((a = o.alternate),
          o.child !== null || (a !== null && a.child !== null))
        )
          for (r = wg(r); r !== null; ) {
            if ((a = r[Nn])) return a;
            r = wg(r);
          }
        return o;
      }
      ((r = a), (a = r.parentNode));
    }
    return null;
  }
  function Ei(r) {
    return (
      (r = r[Nn] || r[Qn]),
      !r || (r.tag !== 5 && r.tag !== 6 && r.tag !== 13 && r.tag !== 3)
        ? null
        : r
    );
  }
  function Zs(r) {
    if (r.tag === 5 || r.tag === 6) return r.stateNode;
    throw Error(n(33));
  }
  function rl(r) {
    return r[bi] || null;
  }
  var rd = [],
    eo = -1;
  function br(r) {
    return { current: r };
  }
  function $e(r) {
    0 > eo || ((r.current = rd[eo]), (rd[eo] = null), eo--);
  }
  function Be(r, o) {
    (eo++, (rd[eo] = r.current), (r.current = o));
  }
  var Er = {},
    Ct = br(Er),
    Mt = br(!1),
    is = Er;
  function to(r, o) {
    var a = r.type.contextTypes;
    if (!a) return Er;
    var d = r.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === o)
      return d.__reactInternalMemoizedMaskedChildContext;
    var p = {},
      g;
    for (g in a) p[g] = o[g];
    return (
      d &&
        ((r = r.stateNode),
        (r.__reactInternalMemoizedUnmaskedChildContext = o),
        (r.__reactInternalMemoizedMaskedChildContext = p)),
      p
    );
  }
  function Dt(r) {
    return ((r = r.childContextTypes), r != null);
  }
  function sl() {
    ($e(Mt), $e(Ct));
  }
  function xg(r, o, a) {
    if (Ct.current !== Er) throw Error(n(168));
    (Be(Ct, o), Be(Mt, a));
  }
  function Sg(r, o, a) {
    var d = r.stateNode;
    if (((o = o.childContextTypes), typeof d.getChildContext != "function"))
      return a;
    d = d.getChildContext();
    for (var p in d) if (!(p in o)) throw Error(n(108, ne(r) || "Unknown", p));
    return W({}, a, d);
  }
  function ol(r) {
    return (
      (r =
        ((r = r.stateNode) && r.__reactInternalMemoizedMergedChildContext) ||
        Er),
      (is = Ct.current),
      Be(Ct, r),
      Be(Mt, Mt.current),
      !0
    );
  }
  function bg(r, o, a) {
    var d = r.stateNode;
    if (!d) throw Error(n(169));
    (a
      ? ((r = Sg(r, o, is)),
        (d.__reactInternalMemoizedMergedChildContext = r),
        $e(Mt),
        $e(Ct),
        Be(Ct, r))
      : $e(Mt),
      Be(Mt, a));
  }
  var Gn = null,
    il = !1,
    sd = !1;
  function Eg(r) {
    Gn === null ? (Gn = [r]) : Gn.push(r);
  }
  function jk(r) {
    ((il = !0), Eg(r));
  }
  function Cr() {
    if (!sd && Gn !== null) {
      sd = !0;
      var r = 0,
        o = Fe;
      try {
        var a = Gn;
        for (Fe = 1; r < a.length; r++) {
          var d = a[r];
          do d = d(!0);
          while (d !== null);
        }
        ((Gn = null), (il = !1));
      } catch (p) {
        throw (Gn !== null && (Gn = Gn.slice(r + 1)), km(Tu, Cr), p);
      } finally {
        ((Fe = o), (sd = !1));
      }
    }
    return null;
  }
  var no = [],
    ro = 0,
    al = null,
    ll = 0,
    tn = [],
    nn = 0,
    as = null,
    Yn = 1,
    Xn = "";
  function ls(r, o) {
    ((no[ro++] = ll), (no[ro++] = al), (al = r), (ll = o));
  }
  function Cg(r, o, a) {
    ((tn[nn++] = Yn), (tn[nn++] = Xn), (tn[nn++] = as), (as = r));
    var d = Yn;
    r = Xn;
    var p = 32 - pn(d) - 1;
    ((d &= ~(1 << p)), (a += 1));
    var g = 32 - pn(o) + p;
    if (30 < g) {
      var k = p - (p % 5);
      ((g = (d & ((1 << k) - 1)).toString(32)),
        (d >>= k),
        (p -= k),
        (Yn = (1 << (32 - pn(o) + p)) | (a << p) | d),
        (Xn = g + r));
    } else ((Yn = (1 << g) | (a << p) | d), (Xn = r));
  }
  function od(r) {
    r.return !== null && (ls(r, 1), Cg(r, 1, 0));
  }
  function id(r) {
    for (; r === al; )
      ((al = no[--ro]), (no[ro] = null), (ll = no[--ro]), (no[ro] = null));
    for (; r === as; )
      ((as = tn[--nn]),
        (tn[nn] = null),
        (Xn = tn[--nn]),
        (tn[nn] = null),
        (Yn = tn[--nn]),
        (tn[nn] = null));
  }
  var Kt = null,
    Qt = null,
    He = !1,
    gn = null;
  function kg(r, o) {
    var a = an(5, null, null, 0);
    ((a.elementType = "DELETED"),
      (a.stateNode = o),
      (a.return = r),
      (o = r.deletions),
      o === null ? ((r.deletions = [a]), (r.flags |= 16)) : o.push(a));
  }
  function Tg(r, o) {
    switch (r.tag) {
      case 5:
        var a = r.type;
        return (
          (o =
            o.nodeType !== 1 || a.toLowerCase() !== o.nodeName.toLowerCase()
              ? null
              : o),
          o !== null
            ? ((r.stateNode = o), (Kt = r), (Qt = Sr(o.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (o = r.pendingProps === "" || o.nodeType !== 3 ? null : o),
          o !== null ? ((r.stateNode = o), (Kt = r), (Qt = null), !0) : !1
        );
      case 13:
        return (
          (o = o.nodeType !== 8 ? null : o),
          o !== null
            ? ((a = as !== null ? { id: Yn, overflow: Xn } : null),
              (r.memoizedState = {
                dehydrated: o,
                treeContext: a,
                retryLane: 1073741824,
              }),
              (a = an(18, null, null, 0)),
              (a.stateNode = o),
              (a.return = r),
              (r.child = a),
              (Kt = r),
              (Qt = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function ad(r) {
    return (r.mode & 1) !== 0 && (r.flags & 128) === 0;
  }
  function ld(r) {
    if (He) {
      var o = Qt;
      if (o) {
        var a = o;
        if (!Tg(r, o)) {
          if (ad(r)) throw Error(n(418));
          o = Sr(a.nextSibling);
          var d = Kt;
          o && Tg(r, o)
            ? kg(d, a)
            : ((r.flags = (r.flags & -4097) | 2), (He = !1), (Kt = r));
        }
      } else {
        if (ad(r)) throw Error(n(418));
        ((r.flags = (r.flags & -4097) | 2), (He = !1), (Kt = r));
      }
    }
  }
  function Pg(r) {
    for (
      r = r.return;
      r !== null && r.tag !== 5 && r.tag !== 3 && r.tag !== 13;
    )
      r = r.return;
    Kt = r;
  }
  function cl(r) {
    if (r !== Kt) return !1;
    if (!He) return (Pg(r), (He = !0), !1);
    var o;
    if (
      ((o = r.tag !== 3) &&
        !(o = r.tag !== 5) &&
        ((o = r.type),
        (o = o !== "head" && o !== "body" && !Zu(r.type, r.memoizedProps))),
      o && (o = Qt))
    ) {
      if (ad(r)) throw (Rg(), Error(n(418)));
      for (; o; ) (kg(r, o), (o = Sr(o.nextSibling)));
    }
    if ((Pg(r), r.tag === 13)) {
      if (((r = r.memoizedState), (r = r !== null ? r.dehydrated : null), !r))
        throw Error(n(317));
      e: {
        for (r = r.nextSibling, o = 0; r; ) {
          if (r.nodeType === 8) {
            var a = r.data;
            if (a === "/$") {
              if (o === 0) {
                Qt = Sr(r.nextSibling);
                break e;
              }
              o--;
            } else (a !== "$" && a !== "$!" && a !== "$?") || o++;
          }
          r = r.nextSibling;
        }
        Qt = null;
      }
    } else Qt = Kt ? Sr(r.stateNode.nextSibling) : null;
    return !0;
  }
  function Rg() {
    for (var r = Qt; r; ) r = Sr(r.nextSibling);
  }
  function so() {
    ((Qt = Kt = null), (He = !1));
  }
  function cd(r) {
    gn === null ? (gn = [r]) : gn.push(r);
  }
  var Lk = _.ReactCurrentBatchConfig;
  function Ci(r, o, a) {
    if (
      ((r = a.ref),
      r !== null && typeof r != "function" && typeof r != "object")
    ) {
      if (a._owner) {
        if (((a = a._owner), a)) {
          if (a.tag !== 1) throw Error(n(309));
          var d = a.stateNode;
        }
        if (!d) throw Error(n(147, r));
        var p = d,
          g = "" + r;
        return o !== null &&
          o.ref !== null &&
          typeof o.ref == "function" &&
          o.ref._stringRef === g
          ? o.ref
          : ((o = function (k) {
              var A = p.refs;
              k === null ? delete A[g] : (A[g] = k);
            }),
            (o._stringRef = g),
            o);
      }
      if (typeof r != "string") throw Error(n(284));
      if (!a._owner) throw Error(n(290, r));
    }
    return r;
  }
  function ul(r, o) {
    throw (
      (r = Object.prototype.toString.call(o)),
      Error(
        n(
          31,
          r === "[object Object]"
            ? "object with keys {" + Object.keys(o).join(", ") + "}"
            : r,
        ),
      )
    );
  }
  function Ag(r) {
    var o = r._init;
    return o(r._payload);
  }
  function _g(r) {
    function o(I, j) {
      if (r) {
        var F = I.deletions;
        F === null ? ((I.deletions = [j]), (I.flags |= 16)) : F.push(j);
      }
    }
    function a(I, j) {
      if (!r) return null;
      for (; j !== null; ) (o(I, j), (j = j.sibling));
      return null;
    }
    function d(I, j) {
      for (I = new Map(); j !== null; )
        (j.key !== null ? I.set(j.key, j) : I.set(j.index, j), (j = j.sibling));
      return I;
    }
    function p(I, j) {
      return ((I = Or(I, j)), (I.index = 0), (I.sibling = null), I);
    }
    function g(I, j, F) {
      return (
        (I.index = F),
        r
          ? ((F = I.alternate),
            F !== null
              ? ((F = F.index), F < j ? ((I.flags |= 2), j) : F)
              : ((I.flags |= 2), j))
          : ((I.flags |= 1048576), j)
      );
    }
    function k(I) {
      return (r && I.alternate === null && (I.flags |= 2), I);
    }
    function A(I, j, F, Y) {
      return j === null || j.tag !== 6
        ? ((j = ef(F, I.mode, Y)), (j.return = I), j)
        : ((j = p(j, F)), (j.return = I), j);
    }
    function N(I, j, F, Y) {
      var he = F.type;
      return he === U
        ? K(I, j, F.props.children, Y, F.key)
        : j !== null &&
            (j.elementType === he ||
              (typeof he == "object" &&
                he !== null &&
                he.$$typeof === te &&
                Ag(he) === j.type))
          ? ((Y = p(j, F.props)), (Y.ref = Ci(I, j, F)), (Y.return = I), Y)
          : ((Y = Ll(F.type, F.key, F.props, null, I.mode, Y)),
            (Y.ref = Ci(I, j, F)),
            (Y.return = I),
            Y);
    }
    function B(I, j, F, Y) {
      return j === null ||
        j.tag !== 4 ||
        j.stateNode.containerInfo !== F.containerInfo ||
        j.stateNode.implementation !== F.implementation
        ? ((j = tf(F, I.mode, Y)), (j.return = I), j)
        : ((j = p(j, F.children || [])), (j.return = I), j);
    }
    function K(I, j, F, Y, he) {
      return j === null || j.tag !== 7
        ? ((j = gs(F, I.mode, Y, he)), (j.return = I), j)
        : ((j = p(j, F)), (j.return = I), j);
    }
    function G(I, j, F) {
      if ((typeof j == "string" && j !== "") || typeof j == "number")
        return ((j = ef("" + j, I.mode, F)), (j.return = I), j);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case M:
            return (
              (F = Ll(j.type, j.key, j.props, null, I.mode, F)),
              (F.ref = Ci(I, null, j)),
              (F.return = I),
              F
            );
          case V:
            return ((j = tf(j, I.mode, F)), (j.return = I), j);
          case te:
            var Y = j._init;
            return G(I, Y(j._payload), F);
        }
        if (Zo(j) || X(j))
          return ((j = gs(j, I.mode, F, null)), (j.return = I), j);
        ul(I, j);
      }
      return null;
    }
    function q(I, j, F, Y) {
      var he = j !== null ? j.key : null;
      if ((typeof F == "string" && F !== "") || typeof F == "number")
        return he !== null ? null : A(I, j, "" + F, Y);
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case M:
            return F.key === he ? N(I, j, F, Y) : null;
          case V:
            return F.key === he ? B(I, j, F, Y) : null;
          case te:
            return ((he = F._init), q(I, j, he(F._payload), Y));
        }
        if (Zo(F) || X(F)) return he !== null ? null : K(I, j, F, Y, null);
        ul(I, F);
      }
      return null;
    }
    function re(I, j, F, Y, he) {
      if ((typeof Y == "string" && Y !== "") || typeof Y == "number")
        return ((I = I.get(F) || null), A(j, I, "" + Y, he));
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case M:
            return (
              (I = I.get(Y.key === null ? F : Y.key) || null),
              N(j, I, Y, he)
            );
          case V:
            return (
              (I = I.get(Y.key === null ? F : Y.key) || null),
              B(j, I, Y, he)
            );
          case te:
            var xe = Y._init;
            return re(I, j, F, xe(Y._payload), he);
        }
        if (Zo(Y) || X(Y))
          return ((I = I.get(F) || null), K(j, I, Y, he, null));
        ul(j, Y);
      }
      return null;
    }
    function ie(I, j, F, Y) {
      for (
        var he = null, xe = null, Se = j, Te = (j = 0), mt = null;
        Se !== null && Te < F.length;
        Te++
      ) {
        Se.index > Te ? ((mt = Se), (Se = null)) : (mt = Se.sibling);
        var De = q(I, Se, F[Te], Y);
        if (De === null) {
          Se === null && (Se = mt);
          break;
        }
        (r && Se && De.alternate === null && o(I, Se),
          (j = g(De, j, Te)),
          xe === null ? (he = De) : (xe.sibling = De),
          (xe = De),
          (Se = mt));
      }
      if (Te === F.length) return (a(I, Se), He && ls(I, Te), he);
      if (Se === null) {
        for (; Te < F.length; Te++)
          ((Se = G(I, F[Te], Y)),
            Se !== null &&
              ((j = g(Se, j, Te)),
              xe === null ? (he = Se) : (xe.sibling = Se),
              (xe = Se)));
        return (He && ls(I, Te), he);
      }
      for (Se = d(I, Se); Te < F.length; Te++)
        ((mt = re(Se, I, Te, F[Te], Y)),
          mt !== null &&
            (r &&
              mt.alternate !== null &&
              Se.delete(mt.key === null ? Te : mt.key),
            (j = g(mt, j, Te)),
            xe === null ? (he = mt) : (xe.sibling = mt),
            (xe = mt)));
      return (
        r &&
          Se.forEach(function (jr) {
            return o(I, jr);
          }),
        He && ls(I, Te),
        he
      );
    }
    function ue(I, j, F, Y) {
      var he = X(F);
      if (typeof he != "function") throw Error(n(150));
      if (((F = he.call(F)), F == null)) throw Error(n(151));
      for (
        var xe = (he = null), Se = j, Te = (j = 0), mt = null, De = F.next();
        Se !== null && !De.done;
        Te++, De = F.next()
      ) {
        Se.index > Te ? ((mt = Se), (Se = null)) : (mt = Se.sibling);
        var jr = q(I, Se, De.value, Y);
        if (jr === null) {
          Se === null && (Se = mt);
          break;
        }
        (r && Se && jr.alternate === null && o(I, Se),
          (j = g(jr, j, Te)),
          xe === null ? (he = jr) : (xe.sibling = jr),
          (xe = jr),
          (Se = mt));
      }
      if (De.done) return (a(I, Se), He && ls(I, Te), he);
      if (Se === null) {
        for (; !De.done; Te++, De = F.next())
          ((De = G(I, De.value, Y)),
            De !== null &&
              ((j = g(De, j, Te)),
              xe === null ? (he = De) : (xe.sibling = De),
              (xe = De)));
        return (He && ls(I, Te), he);
      }
      for (Se = d(I, Se); !De.done; Te++, De = F.next())
        ((De = re(Se, I, Te, De.value, Y)),
          De !== null &&
            (r &&
              De.alternate !== null &&
              Se.delete(De.key === null ? Te : De.key),
            (j = g(De, j, Te)),
            xe === null ? (he = De) : (xe.sibling = De),
            (xe = De)));
      return (
        r &&
          Se.forEach(function (hT) {
            return o(I, hT);
          }),
        He && ls(I, Te),
        he
      );
    }
    function tt(I, j, F, Y) {
      if (
        (typeof F == "object" &&
          F !== null &&
          F.type === U &&
          F.key === null &&
          (F = F.props.children),
        typeof F == "object" && F !== null)
      ) {
        switch (F.$$typeof) {
          case M:
            e: {
              for (var he = F.key, xe = j; xe !== null; ) {
                if (xe.key === he) {
                  if (((he = F.type), he === U)) {
                    if (xe.tag === 7) {
                      (a(I, xe.sibling),
                        (j = p(xe, F.props.children)),
                        (j.return = I),
                        (I = j));
                      break e;
                    }
                  } else if (
                    xe.elementType === he ||
                    (typeof he == "object" &&
                      he !== null &&
                      he.$$typeof === te &&
                      Ag(he) === xe.type)
                  ) {
                    (a(I, xe.sibling),
                      (j = p(xe, F.props)),
                      (j.ref = Ci(I, xe, F)),
                      (j.return = I),
                      (I = j));
                    break e;
                  }
                  a(I, xe);
                  break;
                } else o(I, xe);
                xe = xe.sibling;
              }
              F.type === U
                ? ((j = gs(F.props.children, I.mode, Y, F.key)),
                  (j.return = I),
                  (I = j))
                : ((Y = Ll(F.type, F.key, F.props, null, I.mode, Y)),
                  (Y.ref = Ci(I, j, F)),
                  (Y.return = I),
                  (I = Y));
            }
            return k(I);
          case V:
            e: {
              for (xe = F.key; j !== null; ) {
                if (j.key === xe)
                  if (
                    j.tag === 4 &&
                    j.stateNode.containerInfo === F.containerInfo &&
                    j.stateNode.implementation === F.implementation
                  ) {
                    (a(I, j.sibling),
                      (j = p(j, F.children || [])),
                      (j.return = I),
                      (I = j));
                    break e;
                  } else {
                    a(I, j);
                    break;
                  }
                else o(I, j);
                j = j.sibling;
              }
              ((j = tf(F, I.mode, Y)), (j.return = I), (I = j));
            }
            return k(I);
          case te:
            return ((xe = F._init), tt(I, j, xe(F._payload), Y));
        }
        if (Zo(F)) return ie(I, j, F, Y);
        if (X(F)) return ue(I, j, F, Y);
        ul(I, F);
      }
      return (typeof F == "string" && F !== "") || typeof F == "number"
        ? ((F = "" + F),
          j !== null && j.tag === 6
            ? (a(I, j.sibling), (j = p(j, F)), (j.return = I), (I = j))
            : (a(I, j), (j = ef(F, I.mode, Y)), (j.return = I), (I = j)),
          k(I))
        : a(I, j);
    }
    return tt;
  }
  var oo = _g(!0),
    Ng = _g(!1),
    dl = br(null),
    fl = null,
    io = null,
    ud = null;
  function dd() {
    ud = io = fl = null;
  }
  function fd(r) {
    var o = dl.current;
    ($e(dl), (r._currentValue = o));
  }
  function hd(r, o, a) {
    for (; r !== null; ) {
      var d = r.alternate;
      if (
        ((r.childLanes & o) !== o
          ? ((r.childLanes |= o), d !== null && (d.childLanes |= o))
          : d !== null && (d.childLanes & o) !== o && (d.childLanes |= o),
        r === a)
      )
        break;
      r = r.return;
    }
  }
  function ao(r, o) {
    ((fl = r),
      (ud = io = null),
      (r = r.dependencies),
      r !== null &&
        r.firstContext !== null &&
        ((r.lanes & o) !== 0 && (It = !0), (r.firstContext = null)));
  }
  function rn(r) {
    var o = r._currentValue;
    if (ud !== r)
      if (((r = { context: r, memoizedValue: o, next: null }), io === null)) {
        if (fl === null) throw Error(n(308));
        ((io = r), (fl.dependencies = { lanes: 0, firstContext: r }));
      } else io = io.next = r;
    return o;
  }
  var cs = null;
  function pd(r) {
    cs === null ? (cs = [r]) : cs.push(r);
  }
  function Og(r, o, a, d) {
    var p = o.interleaved;
    return (
      p === null ? ((a.next = a), pd(o)) : ((a.next = p.next), (p.next = a)),
      (o.interleaved = a),
      Jn(r, d)
    );
  }
  function Jn(r, o) {
    r.lanes |= o;
    var a = r.alternate;
    for (a !== null && (a.lanes |= o), a = r, r = r.return; r !== null; )
      ((r.childLanes |= o),
        (a = r.alternate),
        a !== null && (a.childLanes |= o),
        (a = r),
        (r = r.return));
    return a.tag === 3 ? a.stateNode : null;
  }
  var kr = !1;
  function md(r) {
    r.updateQueue = {
      baseState: r.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function jg(r, o) {
    ((r = r.updateQueue),
      o.updateQueue === r &&
        (o.updateQueue = {
          baseState: r.baseState,
          firstBaseUpdate: r.firstBaseUpdate,
          lastBaseUpdate: r.lastBaseUpdate,
          shared: r.shared,
          effects: r.effects,
        }));
  }
  function Zn(r, o) {
    return {
      eventTime: r,
      lane: o,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function Tr(r, o, a) {
    var d = r.updateQueue;
    if (d === null) return null;
    if (((d = d.shared), (Me & 2) !== 0)) {
      var p = d.pending;
      return (
        p === null ? (o.next = o) : ((o.next = p.next), (p.next = o)),
        (d.pending = o),
        Jn(r, a)
      );
    }
    return (
      (p = d.interleaved),
      p === null ? ((o.next = o), pd(d)) : ((o.next = p.next), (p.next = o)),
      (d.interleaved = o),
      Jn(r, a)
    );
  }
  function hl(r, o, a) {
    if (
      ((o = o.updateQueue), o !== null && ((o = o.shared), (a & 4194240) !== 0))
    ) {
      var d = o.lanes;
      ((d &= r.pendingLanes), (a |= d), (o.lanes = a), Au(r, a));
    }
  }
  function Lg(r, o) {
    var a = r.updateQueue,
      d = r.alternate;
    if (d !== null && ((d = d.updateQueue), a === d)) {
      var p = null,
        g = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var k = {
            eventTime: a.eventTime,
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: a.callback,
            next: null,
          };
          (g === null ? (p = g = k) : (g = g.next = k), (a = a.next));
        } while (a !== null);
        g === null ? (p = g = o) : (g = g.next = o);
      } else p = g = o;
      ((a = {
        baseState: d.baseState,
        firstBaseUpdate: p,
        lastBaseUpdate: g,
        shared: d.shared,
        effects: d.effects,
      }),
        (r.updateQueue = a));
      return;
    }
    ((r = a.lastBaseUpdate),
      r === null ? (a.firstBaseUpdate = o) : (r.next = o),
      (a.lastBaseUpdate = o));
  }
  function pl(r, o, a, d) {
    var p = r.updateQueue;
    kr = !1;
    var g = p.firstBaseUpdate,
      k = p.lastBaseUpdate,
      A = p.shared.pending;
    if (A !== null) {
      p.shared.pending = null;
      var N = A,
        B = N.next;
      ((N.next = null), k === null ? (g = B) : (k.next = B), (k = N));
      var K = r.alternate;
      K !== null &&
        ((K = K.updateQueue),
        (A = K.lastBaseUpdate),
        A !== k &&
          (A === null ? (K.firstBaseUpdate = B) : (A.next = B),
          (K.lastBaseUpdate = N)));
    }
    if (g !== null) {
      var G = p.baseState;
      ((k = 0), (K = B = N = null), (A = g));
      do {
        var q = A.lane,
          re = A.eventTime;
        if ((d & q) === q) {
          K !== null &&
            (K = K.next =
              {
                eventTime: re,
                lane: 0,
                tag: A.tag,
                payload: A.payload,
                callback: A.callback,
                next: null,
              });
          e: {
            var ie = r,
              ue = A;
            switch (((q = o), (re = a), ue.tag)) {
              case 1:
                if (((ie = ue.payload), typeof ie == "function")) {
                  G = ie.call(re, G, q);
                  break e;
                }
                G = ie;
                break e;
              case 3:
                ie.flags = (ie.flags & -65537) | 128;
              case 0:
                if (
                  ((ie = ue.payload),
                  (q = typeof ie == "function" ? ie.call(re, G, q) : ie),
                  q == null)
                )
                  break e;
                G = W({}, G, q);
                break e;
              case 2:
                kr = !0;
            }
          }
          A.callback !== null &&
            A.lane !== 0 &&
            ((r.flags |= 64),
            (q = p.effects),
            q === null ? (p.effects = [A]) : q.push(A));
        } else
          ((re = {
            eventTime: re,
            lane: q,
            tag: A.tag,
            payload: A.payload,
            callback: A.callback,
            next: null,
          }),
            K === null ? ((B = K = re), (N = G)) : (K = K.next = re),
            (k |= q));
        if (((A = A.next), A === null)) {
          if (((A = p.shared.pending), A === null)) break;
          ((q = A),
            (A = q.next),
            (q.next = null),
            (p.lastBaseUpdate = q),
            (p.shared.pending = null));
        }
      } while (!0);
      if (
        (K === null && (N = G),
        (p.baseState = N),
        (p.firstBaseUpdate = B),
        (p.lastBaseUpdate = K),
        (o = p.shared.interleaved),
        o !== null)
      ) {
        p = o;
        do ((k |= p.lane), (p = p.next));
        while (p !== o);
      } else g === null && (p.shared.lanes = 0);
      ((fs |= k), (r.lanes = k), (r.memoizedState = G));
    }
  }
  function Mg(r, o, a) {
    if (((r = o.effects), (o.effects = null), r !== null))
      for (o = 0; o < r.length; o++) {
        var d = r[o],
          p = d.callback;
        if (p !== null) {
          if (((d.callback = null), (d = a), typeof p != "function"))
            throw Error(n(191, p));
          p.call(d);
        }
      }
  }
  var ki = {},
    On = br(ki),
    Ti = br(ki),
    Pi = br(ki);
  function us(r) {
    if (r === ki) throw Error(n(174));
    return r;
  }
  function gd(r, o) {
    switch ((Be(Pi, o), Be(Ti, r), Be(On, ki), (r = o.nodeType), r)) {
      case 9:
      case 11:
        o = (o = o.documentElement) ? o.namespaceURI : yu(null, "");
        break;
      default:
        ((r = r === 8 ? o.parentNode : o),
          (o = r.namespaceURI || null),
          (r = r.tagName),
          (o = yu(o, r)));
    }
    ($e(On), Be(On, o));
  }
  function lo() {
    ($e(On), $e(Ti), $e(Pi));
  }
  function Dg(r) {
    us(Pi.current);
    var o = us(On.current),
      a = yu(o, r.type);
    o !== a && (Be(Ti, r), Be(On, a));
  }
  function yd(r) {
    Ti.current === r && ($e(On), $e(Ti));
  }
  var qe = br(0);
  function ml(r) {
    for (var o = r; o !== null; ) {
      if (o.tag === 13) {
        var a = o.memoizedState;
        if (
          a !== null &&
          ((a = a.dehydrated), a === null || a.data === "$?" || a.data === "$!")
        )
          return o;
      } else if (o.tag === 19 && o.memoizedProps.revealOrder !== void 0) {
        if ((o.flags & 128) !== 0) return o;
      } else if (o.child !== null) {
        ((o.child.return = o), (o = o.child));
        continue;
      }
      if (o === r) break;
      for (; o.sibling === null; ) {
        if (o.return === null || o.return === r) return null;
        o = o.return;
      }
      ((o.sibling.return = o.return), (o = o.sibling));
    }
    return null;
  }
  var vd = [];
  function wd() {
    for (var r = 0; r < vd.length; r++)
      vd[r]._workInProgressVersionPrimary = null;
    vd.length = 0;
  }
  var gl = _.ReactCurrentDispatcher,
    xd = _.ReactCurrentBatchConfig,
    ds = 0,
    Ke = null,
    ct = null,
    ht = null,
    yl = !1,
    Ri = !1,
    Ai = 0,
    Mk = 0;
  function kt() {
    throw Error(n(321));
  }
  function Sd(r, o) {
    if (o === null) return !1;
    for (var a = 0; a < o.length && a < r.length; a++)
      if (!mn(r[a], o[a])) return !1;
    return !0;
  }
  function bd(r, o, a, d, p, g) {
    if (
      ((ds = g),
      (Ke = o),
      (o.memoizedState = null),
      (o.updateQueue = null),
      (o.lanes = 0),
      (gl.current = r === null || r.memoizedState === null ? Vk : Bk),
      (r = a(d, p)),
      Ri)
    ) {
      g = 0;
      do {
        if (((Ri = !1), (Ai = 0), 25 <= g)) throw Error(n(301));
        ((g += 1),
          (ht = ct = null),
          (o.updateQueue = null),
          (gl.current = Uk),
          (r = a(d, p)));
      } while (Ri);
    }
    if (
      ((gl.current = xl),
      (o = ct !== null && ct.next !== null),
      (ds = 0),
      (ht = ct = Ke = null),
      (yl = !1),
      o)
    )
      throw Error(n(300));
    return r;
  }
  function Ed() {
    var r = Ai !== 0;
    return ((Ai = 0), r);
  }
  function jn() {
    var r = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (ht === null ? (Ke.memoizedState = ht = r) : (ht = ht.next = r), ht);
  }
  function sn() {
    if (ct === null) {
      var r = Ke.alternate;
      r = r !== null ? r.memoizedState : null;
    } else r = ct.next;
    var o = ht === null ? Ke.memoizedState : ht.next;
    if (o !== null) ((ht = o), (ct = r));
    else {
      if (r === null) throw Error(n(310));
      ((ct = r),
        (r = {
          memoizedState: ct.memoizedState,
          baseState: ct.baseState,
          baseQueue: ct.baseQueue,
          queue: ct.queue,
          next: null,
        }),
        ht === null ? (Ke.memoizedState = ht = r) : (ht = ht.next = r));
    }
    return ht;
  }
  function _i(r, o) {
    return typeof o == "function" ? o(r) : o;
  }
  function Cd(r) {
    var o = sn(),
      a = o.queue;
    if (a === null) throw Error(n(311));
    a.lastRenderedReducer = r;
    var d = ct,
      p = d.baseQueue,
      g = a.pending;
    if (g !== null) {
      if (p !== null) {
        var k = p.next;
        ((p.next = g.next), (g.next = k));
      }
      ((d.baseQueue = p = g), (a.pending = null));
    }
    if (p !== null) {
      ((g = p.next), (d = d.baseState));
      var A = (k = null),
        N = null,
        B = g;
      do {
        var K = B.lane;
        if ((ds & K) === K)
          (N !== null &&
            (N = N.next =
              {
                lane: 0,
                action: B.action,
                hasEagerState: B.hasEagerState,
                eagerState: B.eagerState,
                next: null,
              }),
            (d = B.hasEagerState ? B.eagerState : r(d, B.action)));
        else {
          var G = {
            lane: K,
            action: B.action,
            hasEagerState: B.hasEagerState,
            eagerState: B.eagerState,
            next: null,
          };
          (N === null ? ((A = N = G), (k = d)) : (N = N.next = G),
            (Ke.lanes |= K),
            (fs |= K));
        }
        B = B.next;
      } while (B !== null && B !== g);
      (N === null ? (k = d) : (N.next = A),
        mn(d, o.memoizedState) || (It = !0),
        (o.memoizedState = d),
        (o.baseState = k),
        (o.baseQueue = N),
        (a.lastRenderedState = d));
    }
    if (((r = a.interleaved), r !== null)) {
      p = r;
      do ((g = p.lane), (Ke.lanes |= g), (fs |= g), (p = p.next));
      while (p !== r);
    } else p === null && (a.lanes = 0);
    return [o.memoizedState, a.dispatch];
  }
  function kd(r) {
    var o = sn(),
      a = o.queue;
    if (a === null) throw Error(n(311));
    a.lastRenderedReducer = r;
    var d = a.dispatch,
      p = a.pending,
      g = o.memoizedState;
    if (p !== null) {
      a.pending = null;
      var k = (p = p.next);
      do ((g = r(g, k.action)), (k = k.next));
      while (k !== p);
      (mn(g, o.memoizedState) || (It = !0),
        (o.memoizedState = g),
        o.baseQueue === null && (o.baseState = g),
        (a.lastRenderedState = g));
    }
    return [g, d];
  }
  function Ig() {}
  function Fg(r, o) {
    var a = Ke,
      d = sn(),
      p = o(),
      g = !mn(d.memoizedState, p);
    if (
      (g && ((d.memoizedState = p), (It = !0)),
      (d = d.queue),
      Td(Ug.bind(null, a, d, r), [r]),
      d.getSnapshot !== o || g || (ht !== null && ht.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        Ni(9, Bg.bind(null, a, d, p, o), void 0, null),
        pt === null)
      )
        throw Error(n(349));
      (ds & 30) !== 0 || Vg(a, o, p);
    }
    return p;
  }
  function Vg(r, o, a) {
    ((r.flags |= 16384),
      (r = { getSnapshot: o, value: a }),
      (o = Ke.updateQueue),
      o === null
        ? ((o = { lastEffect: null, stores: null }),
          (Ke.updateQueue = o),
          (o.stores = [r]))
        : ((a = o.stores), a === null ? (o.stores = [r]) : a.push(r)));
  }
  function Bg(r, o, a, d) {
    ((o.value = a), (o.getSnapshot = d), zg(o) && $g(r));
  }
  function Ug(r, o, a) {
    return a(function () {
      zg(o) && $g(r);
    });
  }
  function zg(r) {
    var o = r.getSnapshot;
    r = r.value;
    try {
      var a = o();
      return !mn(r, a);
    } catch {
      return !0;
    }
  }
  function $g(r) {
    var o = Jn(r, 1);
    o !== null && xn(o, r, 1, -1);
  }
  function Wg(r) {
    var o = jn();
    return (
      typeof r == "function" && (r = r()),
      (o.memoizedState = o.baseState = r),
      (r = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _i,
        lastRenderedState: r,
      }),
      (o.queue = r),
      (r = r.dispatch = Fk.bind(null, Ke, r)),
      [o.memoizedState, r]
    );
  }
  function Ni(r, o, a, d) {
    return (
      (r = { tag: r, create: o, destroy: a, deps: d, next: null }),
      (o = Ke.updateQueue),
      o === null
        ? ((o = { lastEffect: null, stores: null }),
          (Ke.updateQueue = o),
          (o.lastEffect = r.next = r))
        : ((a = o.lastEffect),
          a === null
            ? (o.lastEffect = r.next = r)
            : ((d = a.next), (a.next = r), (r.next = d), (o.lastEffect = r))),
      r
    );
  }
  function Hg() {
    return sn().memoizedState;
  }
  function vl(r, o, a, d) {
    var p = jn();
    ((Ke.flags |= r),
      (p.memoizedState = Ni(1 | o, a, void 0, d === void 0 ? null : d)));
  }
  function wl(r, o, a, d) {
    var p = sn();
    d = d === void 0 ? null : d;
    var g = void 0;
    if (ct !== null) {
      var k = ct.memoizedState;
      if (((g = k.destroy), d !== null && Sd(d, k.deps))) {
        p.memoizedState = Ni(o, a, g, d);
        return;
      }
    }
    ((Ke.flags |= r), (p.memoizedState = Ni(1 | o, a, g, d)));
  }
  function qg(r, o) {
    return vl(8390656, 8, r, o);
  }
  function Td(r, o) {
    return wl(2048, 8, r, o);
  }
  function Kg(r, o) {
    return wl(4, 2, r, o);
  }
  function Qg(r, o) {
    return wl(4, 4, r, o);
  }
  function Gg(r, o) {
    if (typeof o == "function")
      return (
        (r = r()),
        o(r),
        function () {
          o(null);
        }
      );
    if (o != null)
      return (
        (r = r()),
        (o.current = r),
        function () {
          o.current = null;
        }
      );
  }
  function Yg(r, o, a) {
    return (
      (a = a != null ? a.concat([r]) : null),
      wl(4, 4, Gg.bind(null, o, r), a)
    );
  }
  function Pd() {}
  function Xg(r, o) {
    var a = sn();
    o = o === void 0 ? null : o;
    var d = a.memoizedState;
    return d !== null && o !== null && Sd(o, d[1])
      ? d[0]
      : ((a.memoizedState = [r, o]), r);
  }
  function Jg(r, o) {
    var a = sn();
    o = o === void 0 ? null : o;
    var d = a.memoizedState;
    return d !== null && o !== null && Sd(o, d[1])
      ? d[0]
      : ((r = r()), (a.memoizedState = [r, o]), r);
  }
  function Zg(r, o, a) {
    return (ds & 21) === 0
      ? (r.baseState && ((r.baseState = !1), (It = !0)), (r.memoizedState = a))
      : (mn(a, o) ||
          ((a = Am()), (Ke.lanes |= a), (fs |= a), (r.baseState = !0)),
        o);
  }
  function Dk(r, o) {
    var a = Fe;
    ((Fe = a !== 0 && 4 > a ? a : 4), r(!0));
    var d = xd.transition;
    xd.transition = {};
    try {
      (r(!1), o());
    } finally {
      ((Fe = a), (xd.transition = d));
    }
  }
  function ey() {
    return sn().memoizedState;
  }
  function Ik(r, o, a) {
    var d = _r(r);
    if (
      ((a = {
        lane: d,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ty(r))
    )
      ny(o, a);
    else if (((a = Og(r, o, a, d)), a !== null)) {
      var p = jt();
      (xn(a, r, d, p), ry(a, o, d));
    }
  }
  function Fk(r, o, a) {
    var d = _r(r),
      p = {
        lane: d,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (ty(r)) ny(o, p);
    else {
      var g = r.alternate;
      if (
        r.lanes === 0 &&
        (g === null || g.lanes === 0) &&
        ((g = o.lastRenderedReducer), g !== null)
      )
        try {
          var k = o.lastRenderedState,
            A = g(k, a);
          if (((p.hasEagerState = !0), (p.eagerState = A), mn(A, k))) {
            var N = o.interleaved;
            (N === null
              ? ((p.next = p), pd(o))
              : ((p.next = N.next), (N.next = p)),
              (o.interleaved = p));
            return;
          }
        } catch {
        } finally {
        }
      ((a = Og(r, o, p, d)),
        a !== null && ((p = jt()), xn(a, r, d, p), ry(a, o, d)));
    }
  }
  function ty(r) {
    var o = r.alternate;
    return r === Ke || (o !== null && o === Ke);
  }
  function ny(r, o) {
    Ri = yl = !0;
    var a = r.pending;
    (a === null ? (o.next = o) : ((o.next = a.next), (a.next = o)),
      (r.pending = o));
  }
  function ry(r, o, a) {
    if ((a & 4194240) !== 0) {
      var d = o.lanes;
      ((d &= r.pendingLanes), (a |= d), (o.lanes = a), Au(r, a));
    }
  }
  var xl = {
      readContext: rn,
      useCallback: kt,
      useContext: kt,
      useEffect: kt,
      useImperativeHandle: kt,
      useInsertionEffect: kt,
      useLayoutEffect: kt,
      useMemo: kt,
      useReducer: kt,
      useRef: kt,
      useState: kt,
      useDebugValue: kt,
      useDeferredValue: kt,
      useTransition: kt,
      useMutableSource: kt,
      useSyncExternalStore: kt,
      useId: kt,
      unstable_isNewReconciler: !1,
    },
    Vk = {
      readContext: rn,
      useCallback: function (r, o) {
        return ((jn().memoizedState = [r, o === void 0 ? null : o]), r);
      },
      useContext: rn,
      useEffect: qg,
      useImperativeHandle: function (r, o, a) {
        return (
          (a = a != null ? a.concat([r]) : null),
          vl(4194308, 4, Gg.bind(null, o, r), a)
        );
      },
      useLayoutEffect: function (r, o) {
        return vl(4194308, 4, r, o);
      },
      useInsertionEffect: function (r, o) {
        return vl(4, 2, r, o);
      },
      useMemo: function (r, o) {
        var a = jn();
        return (
          (o = o === void 0 ? null : o),
          (r = r()),
          (a.memoizedState = [r, o]),
          r
        );
      },
      useReducer: function (r, o, a) {
        var d = jn();
        return (
          (o = a !== void 0 ? a(o) : o),
          (d.memoizedState = d.baseState = o),
          (r = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: r,
            lastRenderedState: o,
          }),
          (d.queue = r),
          (r = r.dispatch = Ik.bind(null, Ke, r)),
          [d.memoizedState, r]
        );
      },
      useRef: function (r) {
        var o = jn();
        return ((r = { current: r }), (o.memoizedState = r));
      },
      useState: Wg,
      useDebugValue: Pd,
      useDeferredValue: function (r) {
        return (jn().memoizedState = r);
      },
      useTransition: function () {
        var r = Wg(!1),
          o = r[0];
        return ((r = Dk.bind(null, r[1])), (jn().memoizedState = r), [o, r]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (r, o, a) {
        var d = Ke,
          p = jn();
        if (He) {
          if (a === void 0) throw Error(n(407));
          a = a();
        } else {
          if (((a = o()), pt === null)) throw Error(n(349));
          (ds & 30) !== 0 || Vg(d, o, a);
        }
        p.memoizedState = a;
        var g = { value: a, getSnapshot: o };
        return (
          (p.queue = g),
          qg(Ug.bind(null, d, g, r), [r]),
          (d.flags |= 2048),
          Ni(9, Bg.bind(null, d, g, a, o), void 0, null),
          a
        );
      },
      useId: function () {
        var r = jn(),
          o = pt.identifierPrefix;
        if (He) {
          var a = Xn,
            d = Yn;
          ((a = (d & ~(1 << (32 - pn(d) - 1))).toString(32) + a),
            (o = ":" + o + "R" + a),
            (a = Ai++),
            0 < a && (o += "H" + a.toString(32)),
            (o += ":"));
        } else ((a = Mk++), (o = ":" + o + "r" + a.toString(32) + ":"));
        return (r.memoizedState = o);
      },
      unstable_isNewReconciler: !1,
    },
    Bk = {
      readContext: rn,
      useCallback: Xg,
      useContext: rn,
      useEffect: Td,
      useImperativeHandle: Yg,
      useInsertionEffect: Kg,
      useLayoutEffect: Qg,
      useMemo: Jg,
      useReducer: Cd,
      useRef: Hg,
      useState: function () {
        return Cd(_i);
      },
      useDebugValue: Pd,
      useDeferredValue: function (r) {
        var o = sn();
        return Zg(o, ct.memoizedState, r);
      },
      useTransition: function () {
        var r = Cd(_i)[0],
          o = sn().memoizedState;
        return [r, o];
      },
      useMutableSource: Ig,
      useSyncExternalStore: Fg,
      useId: ey,
      unstable_isNewReconciler: !1,
    },
    Uk = {
      readContext: rn,
      useCallback: Xg,
      useContext: rn,
      useEffect: Td,
      useImperativeHandle: Yg,
      useInsertionEffect: Kg,
      useLayoutEffect: Qg,
      useMemo: Jg,
      useReducer: kd,
      useRef: Hg,
      useState: function () {
        return kd(_i);
      },
      useDebugValue: Pd,
      useDeferredValue: function (r) {
        var o = sn();
        return ct === null ? (o.memoizedState = r) : Zg(o, ct.memoizedState, r);
      },
      useTransition: function () {
        var r = kd(_i)[0],
          o = sn().memoizedState;
        return [r, o];
      },
      useMutableSource: Ig,
      useSyncExternalStore: Fg,
      useId: ey,
      unstable_isNewReconciler: !1,
    };
  function yn(r, o) {
    if (r && r.defaultProps) {
      ((o = W({}, o)), (r = r.defaultProps));
      for (var a in r) o[a] === void 0 && (o[a] = r[a]);
      return o;
    }
    return o;
  }
  function Rd(r, o, a, d) {
    ((o = r.memoizedState),
      (a = a(d, o)),
      (a = a == null ? o : W({}, o, a)),
      (r.memoizedState = a),
      r.lanes === 0 && (r.updateQueue.baseState = a));
  }
  var Sl = {
    isMounted: function (r) {
      return (r = r._reactInternals) ? ss(r) === r : !1;
    },
    enqueueSetState: function (r, o, a) {
      r = r._reactInternals;
      var d = jt(),
        p = _r(r),
        g = Zn(d, p);
      ((g.payload = o),
        a != null && (g.callback = a),
        (o = Tr(r, g, p)),
        o !== null && (xn(o, r, p, d), hl(o, r, p)));
    },
    enqueueReplaceState: function (r, o, a) {
      r = r._reactInternals;
      var d = jt(),
        p = _r(r),
        g = Zn(d, p);
      ((g.tag = 1),
        (g.payload = o),
        a != null && (g.callback = a),
        (o = Tr(r, g, p)),
        o !== null && (xn(o, r, p, d), hl(o, r, p)));
    },
    enqueueForceUpdate: function (r, o) {
      r = r._reactInternals;
      var a = jt(),
        d = _r(r),
        p = Zn(a, d);
      ((p.tag = 2),
        o != null && (p.callback = o),
        (o = Tr(r, p, d)),
        o !== null && (xn(o, r, d, a), hl(o, r, d)));
    },
  };
  function sy(r, o, a, d, p, g, k) {
    return (
      (r = r.stateNode),
      typeof r.shouldComponentUpdate == "function"
        ? r.shouldComponentUpdate(d, g, k)
        : o.prototype && o.prototype.isPureReactComponent
          ? !yi(a, d) || !yi(p, g)
          : !0
    );
  }
  function oy(r, o, a) {
    var d = !1,
      p = Er,
      g = o.contextType;
    return (
      typeof g == "object" && g !== null
        ? (g = rn(g))
        : ((p = Dt(o) ? is : Ct.current),
          (d = o.contextTypes),
          (g = (d = d != null) ? to(r, p) : Er)),
      (o = new o(a, g)),
      (r.memoizedState =
        o.state !== null && o.state !== void 0 ? o.state : null),
      (o.updater = Sl),
      (r.stateNode = o),
      (o._reactInternals = r),
      d &&
        ((r = r.stateNode),
        (r.__reactInternalMemoizedUnmaskedChildContext = p),
        (r.__reactInternalMemoizedMaskedChildContext = g)),
      o
    );
  }
  function iy(r, o, a, d) {
    ((r = o.state),
      typeof o.componentWillReceiveProps == "function" &&
        o.componentWillReceiveProps(a, d),
      typeof o.UNSAFE_componentWillReceiveProps == "function" &&
        o.UNSAFE_componentWillReceiveProps(a, d),
      o.state !== r && Sl.enqueueReplaceState(o, o.state, null));
  }
  function Ad(r, o, a, d) {
    var p = r.stateNode;
    ((p.props = a), (p.state = r.memoizedState), (p.refs = {}), md(r));
    var g = o.contextType;
    (typeof g == "object" && g !== null
      ? (p.context = rn(g))
      : ((g = Dt(o) ? is : Ct.current), (p.context = to(r, g))),
      (p.state = r.memoizedState),
      (g = o.getDerivedStateFromProps),
      typeof g == "function" && (Rd(r, o, g, a), (p.state = r.memoizedState)),
      typeof o.getDerivedStateFromProps == "function" ||
        typeof p.getSnapshotBeforeUpdate == "function" ||
        (typeof p.UNSAFE_componentWillMount != "function" &&
          typeof p.componentWillMount != "function") ||
        ((o = p.state),
        typeof p.componentWillMount == "function" && p.componentWillMount(),
        typeof p.UNSAFE_componentWillMount == "function" &&
          p.UNSAFE_componentWillMount(),
        o !== p.state && Sl.enqueueReplaceState(p, p.state, null),
        pl(r, a, p, d),
        (p.state = r.memoizedState)),
      typeof p.componentDidMount == "function" && (r.flags |= 4194308));
  }
  function co(r, o) {
    try {
      var a = "",
        d = o;
      do ((a += pe(d)), (d = d.return));
      while (d);
      var p = a;
    } catch (g) {
      p =
        `
Error generating stack: ` +
        g.message +
        `
` +
        g.stack;
    }
    return { value: r, source: o, stack: p, digest: null };
  }
  function _d(r, o, a) {
    return { value: r, source: null, stack: a ?? null, digest: o ?? null };
  }
  function Nd(r, o) {
    try {
      console.error(o.value);
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  var zk = typeof WeakMap == "function" ? WeakMap : Map;
  function ay(r, o, a) {
    ((a = Zn(-1, a)), (a.tag = 3), (a.payload = { element: null }));
    var d = o.value;
    return (
      (a.callback = function () {
        (Rl || ((Rl = !0), (qd = d)), Nd(r, o));
      }),
      a
    );
  }
  function ly(r, o, a) {
    ((a = Zn(-1, a)), (a.tag = 3));
    var d = r.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var p = o.value;
      ((a.payload = function () {
        return d(p);
      }),
        (a.callback = function () {
          Nd(r, o);
        }));
    }
    var g = r.stateNode;
    return (
      g !== null &&
        typeof g.componentDidCatch == "function" &&
        (a.callback = function () {
          (Nd(r, o),
            typeof d != "function" &&
              (Rr === null ? (Rr = new Set([this])) : Rr.add(this)));
          var k = o.stack;
          this.componentDidCatch(o.value, {
            componentStack: k !== null ? k : "",
          });
        }),
      a
    );
  }
  function cy(r, o, a) {
    var d = r.pingCache;
    if (d === null) {
      d = r.pingCache = new zk();
      var p = new Set();
      d.set(o, p);
    } else ((p = d.get(o)), p === void 0 && ((p = new Set()), d.set(o, p)));
    p.has(a) || (p.add(a), (r = nT.bind(null, r, o, a)), o.then(r, r));
  }
  function uy(r) {
    do {
      var o;
      if (
        ((o = r.tag === 13) &&
          ((o = r.memoizedState),
          (o = o !== null ? o.dehydrated !== null : !0)),
        o)
      )
        return r;
      r = r.return;
    } while (r !== null);
    return null;
  }
  function dy(r, o, a, d, p) {
    return (r.mode & 1) === 0
      ? (r === o
          ? (r.flags |= 65536)
          : ((r.flags |= 128),
            (a.flags |= 131072),
            (a.flags &= -52805),
            a.tag === 1 &&
              (a.alternate === null
                ? (a.tag = 17)
                : ((o = Zn(-1, 1)), (o.tag = 2), Tr(a, o, 1))),
            (a.lanes |= 1)),
        r)
      : ((r.flags |= 65536), (r.lanes = p), r);
  }
  var $k = _.ReactCurrentOwner,
    It = !1;
  function Ot(r, o, a, d) {
    o.child = r === null ? Ng(o, null, a, d) : oo(o, r.child, a, d);
  }
  function fy(r, o, a, d, p) {
    a = a.render;
    var g = o.ref;
    return (
      ao(o, p),
      (d = bd(r, o, a, d, g, p)),
      (a = Ed()),
      r !== null && !It
        ? ((o.updateQueue = r.updateQueue),
          (o.flags &= -2053),
          (r.lanes &= ~p),
          er(r, o, p))
        : (He && a && od(o), (o.flags |= 1), Ot(r, o, d, p), o.child)
    );
  }
  function hy(r, o, a, d, p) {
    if (r === null) {
      var g = a.type;
      return typeof g == "function" &&
        !Zd(g) &&
        g.defaultProps === void 0 &&
        a.compare === null &&
        a.defaultProps === void 0
        ? ((o.tag = 15), (o.type = g), py(r, o, g, d, p))
        : ((r = Ll(a.type, null, d, o, o.mode, p)),
          (r.ref = o.ref),
          (r.return = o),
          (o.child = r));
    }
    if (((g = r.child), (r.lanes & p) === 0)) {
      var k = g.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : yi), a(k, d) && r.ref === o.ref)
      )
        return er(r, o, p);
    }
    return (
      (o.flags |= 1),
      (r = Or(g, d)),
      (r.ref = o.ref),
      (r.return = o),
      (o.child = r)
    );
  }
  function py(r, o, a, d, p) {
    if (r !== null) {
      var g = r.memoizedProps;
      if (yi(g, d) && r.ref === o.ref)
        if (((It = !1), (o.pendingProps = d = g), (r.lanes & p) !== 0))
          (r.flags & 131072) !== 0 && (It = !0);
        else return ((o.lanes = r.lanes), er(r, o, p));
    }
    return Od(r, o, a, d, p);
  }
  function my(r, o, a) {
    var d = o.pendingProps,
      p = d.children,
      g = r !== null ? r.memoizedState : null;
    if (d.mode === "hidden")
      if ((o.mode & 1) === 0)
        ((o.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          Be(fo, Gt),
          (Gt |= a));
      else {
        if ((a & 1073741824) === 0)
          return (
            (r = g !== null ? g.baseLanes | a : a),
            (o.lanes = o.childLanes = 1073741824),
            (o.memoizedState = {
              baseLanes: r,
              cachePool: null,
              transitions: null,
            }),
            (o.updateQueue = null),
            Be(fo, Gt),
            (Gt |= r),
            null
          );
        ((o.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (d = g !== null ? g.baseLanes : a),
          Be(fo, Gt),
          (Gt |= d));
      }
    else
      (g !== null ? ((d = g.baseLanes | a), (o.memoizedState = null)) : (d = a),
        Be(fo, Gt),
        (Gt |= d));
    return (Ot(r, o, p, a), o.child);
  }
  function gy(r, o) {
    var a = o.ref;
    ((r === null && a !== null) || (r !== null && r.ref !== a)) &&
      ((o.flags |= 512), (o.flags |= 2097152));
  }
  function Od(r, o, a, d, p) {
    var g = Dt(a) ? is : Ct.current;
    return (
      (g = to(o, g)),
      ao(o, p),
      (a = bd(r, o, a, d, g, p)),
      (d = Ed()),
      r !== null && !It
        ? ((o.updateQueue = r.updateQueue),
          (o.flags &= -2053),
          (r.lanes &= ~p),
          er(r, o, p))
        : (He && d && od(o), (o.flags |= 1), Ot(r, o, a, p), o.child)
    );
  }
  function yy(r, o, a, d, p) {
    if (Dt(a)) {
      var g = !0;
      ol(o);
    } else g = !1;
    if ((ao(o, p), o.stateNode === null))
      (El(r, o), oy(o, a, d), Ad(o, a, d, p), (d = !0));
    else if (r === null) {
      var k = o.stateNode,
        A = o.memoizedProps;
      k.props = A;
      var N = k.context,
        B = a.contextType;
      typeof B == "object" && B !== null
        ? (B = rn(B))
        : ((B = Dt(a) ? is : Ct.current), (B = to(o, B)));
      var K = a.getDerivedStateFromProps,
        G =
          typeof K == "function" ||
          typeof k.getSnapshotBeforeUpdate == "function";
      (G ||
        (typeof k.UNSAFE_componentWillReceiveProps != "function" &&
          typeof k.componentWillReceiveProps != "function") ||
        ((A !== d || N !== B) && iy(o, k, d, B)),
        (kr = !1));
      var q = o.memoizedState;
      ((k.state = q),
        pl(o, d, k, p),
        (N = o.memoizedState),
        A !== d || q !== N || Mt.current || kr
          ? (typeof K == "function" && (Rd(o, a, K, d), (N = o.memoizedState)),
            (A = kr || sy(o, a, A, d, q, N, B))
              ? (G ||
                  (typeof k.UNSAFE_componentWillMount != "function" &&
                    typeof k.componentWillMount != "function") ||
                  (typeof k.componentWillMount == "function" &&
                    k.componentWillMount(),
                  typeof k.UNSAFE_componentWillMount == "function" &&
                    k.UNSAFE_componentWillMount()),
                typeof k.componentDidMount == "function" &&
                  (o.flags |= 4194308))
              : (typeof k.componentDidMount == "function" &&
                  (o.flags |= 4194308),
                (o.memoizedProps = d),
                (o.memoizedState = N)),
            (k.props = d),
            (k.state = N),
            (k.context = B),
            (d = A))
          : (typeof k.componentDidMount == "function" && (o.flags |= 4194308),
            (d = !1)));
    } else {
      ((k = o.stateNode),
        jg(r, o),
        (A = o.memoizedProps),
        (B = o.type === o.elementType ? A : yn(o.type, A)),
        (k.props = B),
        (G = o.pendingProps),
        (q = k.context),
        (N = a.contextType),
        typeof N == "object" && N !== null
          ? (N = rn(N))
          : ((N = Dt(a) ? is : Ct.current), (N = to(o, N))));
      var re = a.getDerivedStateFromProps;
      ((K =
        typeof re == "function" ||
        typeof k.getSnapshotBeforeUpdate == "function") ||
        (typeof k.UNSAFE_componentWillReceiveProps != "function" &&
          typeof k.componentWillReceiveProps != "function") ||
        ((A !== G || q !== N) && iy(o, k, d, N)),
        (kr = !1),
        (q = o.memoizedState),
        (k.state = q),
        pl(o, d, k, p));
      var ie = o.memoizedState;
      A !== G || q !== ie || Mt.current || kr
        ? (typeof re == "function" && (Rd(o, a, re, d), (ie = o.memoizedState)),
          (B = kr || sy(o, a, B, d, q, ie, N) || !1)
            ? (K ||
                (typeof k.UNSAFE_componentWillUpdate != "function" &&
                  typeof k.componentWillUpdate != "function") ||
                (typeof k.componentWillUpdate == "function" &&
                  k.componentWillUpdate(d, ie, N),
                typeof k.UNSAFE_componentWillUpdate == "function" &&
                  k.UNSAFE_componentWillUpdate(d, ie, N)),
              typeof k.componentDidUpdate == "function" && (o.flags |= 4),
              typeof k.getSnapshotBeforeUpdate == "function" &&
                (o.flags |= 1024))
            : (typeof k.componentDidUpdate != "function" ||
                (A === r.memoizedProps && q === r.memoizedState) ||
                (o.flags |= 4),
              typeof k.getSnapshotBeforeUpdate != "function" ||
                (A === r.memoizedProps && q === r.memoizedState) ||
                (o.flags |= 1024),
              (o.memoizedProps = d),
              (o.memoizedState = ie)),
          (k.props = d),
          (k.state = ie),
          (k.context = N),
          (d = B))
        : (typeof k.componentDidUpdate != "function" ||
            (A === r.memoizedProps && q === r.memoizedState) ||
            (o.flags |= 4),
          typeof k.getSnapshotBeforeUpdate != "function" ||
            (A === r.memoizedProps && q === r.memoizedState) ||
            (o.flags |= 1024),
          (d = !1));
    }
    return jd(r, o, a, d, g, p);
  }
  function jd(r, o, a, d, p, g) {
    gy(r, o);
    var k = (o.flags & 128) !== 0;
    if (!d && !k) return (p && bg(o, a, !1), er(r, o, g));
    ((d = o.stateNode), ($k.current = o));
    var A =
      k && typeof a.getDerivedStateFromError != "function" ? null : d.render();
    return (
      (o.flags |= 1),
      r !== null && k
        ? ((o.child = oo(o, r.child, null, g)), (o.child = oo(o, null, A, g)))
        : Ot(r, o, A, g),
      (o.memoizedState = d.state),
      p && bg(o, a, !0),
      o.child
    );
  }
  function vy(r) {
    var o = r.stateNode;
    (o.pendingContext
      ? xg(r, o.pendingContext, o.pendingContext !== o.context)
      : o.context && xg(r, o.context, !1),
      gd(r, o.containerInfo));
  }
  function wy(r, o, a, d, p) {
    return (so(), cd(p), (o.flags |= 256), Ot(r, o, a, d), o.child);
  }
  var Ld = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Md(r) {
    return { baseLanes: r, cachePool: null, transitions: null };
  }
  function xy(r, o, a) {
    var d = o.pendingProps,
      p = qe.current,
      g = !1,
      k = (o.flags & 128) !== 0,
      A;
    if (
      ((A = k) ||
        (A = r !== null && r.memoizedState === null ? !1 : (p & 2) !== 0),
      A
        ? ((g = !0), (o.flags &= -129))
        : (r === null || r.memoizedState !== null) && (p |= 1),
      Be(qe, p & 1),
      r === null)
    )
      return (
        ld(o),
        (r = o.memoizedState),
        r !== null && ((r = r.dehydrated), r !== null)
          ? ((o.mode & 1) === 0
              ? (o.lanes = 1)
              : r.data === "$!"
                ? (o.lanes = 8)
                : (o.lanes = 1073741824),
            null)
          : ((k = d.children),
            (r = d.fallback),
            g
              ? ((d = o.mode),
                (g = o.child),
                (k = { mode: "hidden", children: k }),
                (d & 1) === 0 && g !== null
                  ? ((g.childLanes = 0), (g.pendingProps = k))
                  : (g = Ml(k, d, 0, null)),
                (r = gs(r, d, a, null)),
                (g.return = o),
                (r.return = o),
                (g.sibling = r),
                (o.child = g),
                (o.child.memoizedState = Md(a)),
                (o.memoizedState = Ld),
                r)
              : Dd(o, k))
      );
    if (((p = r.memoizedState), p !== null && ((A = p.dehydrated), A !== null)))
      return Wk(r, o, k, d, A, p, a);
    if (g) {
      ((g = d.fallback), (k = o.mode), (p = r.child), (A = p.sibling));
      var N = { mode: "hidden", children: d.children };
      return (
        (k & 1) === 0 && o.child !== p
          ? ((d = o.child),
            (d.childLanes = 0),
            (d.pendingProps = N),
            (o.deletions = null))
          : ((d = Or(p, N)), (d.subtreeFlags = p.subtreeFlags & 14680064)),
        A !== null ? (g = Or(A, g)) : ((g = gs(g, k, a, null)), (g.flags |= 2)),
        (g.return = o),
        (d.return = o),
        (d.sibling = g),
        (o.child = d),
        (d = g),
        (g = o.child),
        (k = r.child.memoizedState),
        (k =
          k === null
            ? Md(a)
            : {
                baseLanes: k.baseLanes | a,
                cachePool: null,
                transitions: k.transitions,
              }),
        (g.memoizedState = k),
        (g.childLanes = r.childLanes & ~a),
        (o.memoizedState = Ld),
        d
      );
    }
    return (
      (g = r.child),
      (r = g.sibling),
      (d = Or(g, { mode: "visible", children: d.children })),
      (o.mode & 1) === 0 && (d.lanes = a),
      (d.return = o),
      (d.sibling = null),
      r !== null &&
        ((a = o.deletions),
        a === null ? ((o.deletions = [r]), (o.flags |= 16)) : a.push(r)),
      (o.child = d),
      (o.memoizedState = null),
      d
    );
  }
  function Dd(r, o) {
    return (
      (o = Ml({ mode: "visible", children: o }, r.mode, 0, null)),
      (o.return = r),
      (r.child = o)
    );
  }
  function bl(r, o, a, d) {
    return (
      d !== null && cd(d),
      oo(o, r.child, null, a),
      (r = Dd(o, o.pendingProps.children)),
      (r.flags |= 2),
      (o.memoizedState = null),
      r
    );
  }
  function Wk(r, o, a, d, p, g, k) {
    if (a)
      return o.flags & 256
        ? ((o.flags &= -257), (d = _d(Error(n(422)))), bl(r, o, k, d))
        : o.memoizedState !== null
          ? ((o.child = r.child), (o.flags |= 128), null)
          : ((g = d.fallback),
            (p = o.mode),
            (d = Ml({ mode: "visible", children: d.children }, p, 0, null)),
            (g = gs(g, p, k, null)),
            (g.flags |= 2),
            (d.return = o),
            (g.return = o),
            (d.sibling = g),
            (o.child = d),
            (o.mode & 1) !== 0 && oo(o, r.child, null, k),
            (o.child.memoizedState = Md(k)),
            (o.memoizedState = Ld),
            g);
    if ((o.mode & 1) === 0) return bl(r, o, k, null);
    if (p.data === "$!") {
      if (((d = p.nextSibling && p.nextSibling.dataset), d)) var A = d.dgst;
      return (
        (d = A),
        (g = Error(n(419))),
        (d = _d(g, d, void 0)),
        bl(r, o, k, d)
      );
    }
    if (((A = (k & r.childLanes) !== 0), It || A)) {
      if (((d = pt), d !== null)) {
        switch (k & -k) {
          case 4:
            p = 2;
            break;
          case 16:
            p = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            p = 32;
            break;
          case 536870912:
            p = 268435456;
            break;
          default:
            p = 0;
        }
        ((p = (p & (d.suspendedLanes | k)) !== 0 ? 0 : p),
          p !== 0 &&
            p !== g.retryLane &&
            ((g.retryLane = p), Jn(r, p), xn(d, r, p, -1)));
      }
      return (Jd(), (d = _d(Error(n(421)))), bl(r, o, k, d));
    }
    return p.data === "$?"
      ? ((o.flags |= 128),
        (o.child = r.child),
        (o = rT.bind(null, r)),
        (p._reactRetry = o),
        null)
      : ((r = g.treeContext),
        (Qt = Sr(p.nextSibling)),
        (Kt = o),
        (He = !0),
        (gn = null),
        r !== null &&
          ((tn[nn++] = Yn),
          (tn[nn++] = Xn),
          (tn[nn++] = as),
          (Yn = r.id),
          (Xn = r.overflow),
          (as = o)),
        (o = Dd(o, d.children)),
        (o.flags |= 4096),
        o);
  }
  function Sy(r, o, a) {
    r.lanes |= o;
    var d = r.alternate;
    (d !== null && (d.lanes |= o), hd(r.return, o, a));
  }
  function Id(r, o, a, d, p) {
    var g = r.memoizedState;
    g === null
      ? (r.memoizedState = {
          isBackwards: o,
          rendering: null,
          renderingStartTime: 0,
          last: d,
          tail: a,
          tailMode: p,
        })
      : ((g.isBackwards = o),
        (g.rendering = null),
        (g.renderingStartTime = 0),
        (g.last = d),
        (g.tail = a),
        (g.tailMode = p));
  }
  function by(r, o, a) {
    var d = o.pendingProps,
      p = d.revealOrder,
      g = d.tail;
    if ((Ot(r, o, d.children, a), (d = qe.current), (d & 2) !== 0))
      ((d = (d & 1) | 2), (o.flags |= 128));
    else {
      if (r !== null && (r.flags & 128) !== 0)
        e: for (r = o.child; r !== null; ) {
          if (r.tag === 13) r.memoizedState !== null && Sy(r, a, o);
          else if (r.tag === 19) Sy(r, a, o);
          else if (r.child !== null) {
            ((r.child.return = r), (r = r.child));
            continue;
          }
          if (r === o) break e;
          for (; r.sibling === null; ) {
            if (r.return === null || r.return === o) break e;
            r = r.return;
          }
          ((r.sibling.return = r.return), (r = r.sibling));
        }
      d &= 1;
    }
    if ((Be(qe, d), (o.mode & 1) === 0)) o.memoizedState = null;
    else
      switch (p) {
        case "forwards":
          for (a = o.child, p = null; a !== null; )
            ((r = a.alternate),
              r !== null && ml(r) === null && (p = a),
              (a = a.sibling));
          ((a = p),
            a === null
              ? ((p = o.child), (o.child = null))
              : ((p = a.sibling), (a.sibling = null)),
            Id(o, !1, p, a, g));
          break;
        case "backwards":
          for (a = null, p = o.child, o.child = null; p !== null; ) {
            if (((r = p.alternate), r !== null && ml(r) === null)) {
              o.child = p;
              break;
            }
            ((r = p.sibling), (p.sibling = a), (a = p), (p = r));
          }
          Id(o, !0, a, null, g);
          break;
        case "together":
          Id(o, !1, null, null, void 0);
          break;
        default:
          o.memoizedState = null;
      }
    return o.child;
  }
  function El(r, o) {
    (o.mode & 1) === 0 &&
      r !== null &&
      ((r.alternate = null), (o.alternate = null), (o.flags |= 2));
  }
  function er(r, o, a) {
    if (
      (r !== null && (o.dependencies = r.dependencies),
      (fs |= o.lanes),
      (a & o.childLanes) === 0)
    )
      return null;
    if (r !== null && o.child !== r.child) throw Error(n(153));
    if (o.child !== null) {
      for (
        r = o.child, a = Or(r, r.pendingProps), o.child = a, a.return = o;
        r.sibling !== null;
      )
        ((r = r.sibling),
          (a = a.sibling = Or(r, r.pendingProps)),
          (a.return = o));
      a.sibling = null;
    }
    return o.child;
  }
  function Hk(r, o, a) {
    switch (o.tag) {
      case 3:
        (vy(o), so());
        break;
      case 5:
        Dg(o);
        break;
      case 1:
        Dt(o.type) && ol(o);
        break;
      case 4:
        gd(o, o.stateNode.containerInfo);
        break;
      case 10:
        var d = o.type._context,
          p = o.memoizedProps.value;
        (Be(dl, d._currentValue), (d._currentValue = p));
        break;
      case 13:
        if (((d = o.memoizedState), d !== null))
          return d.dehydrated !== null
            ? (Be(qe, qe.current & 1), (o.flags |= 128), null)
            : (a & o.child.childLanes) !== 0
              ? xy(r, o, a)
              : (Be(qe, qe.current & 1),
                (r = er(r, o, a)),
                r !== null ? r.sibling : null);
        Be(qe, qe.current & 1);
        break;
      case 19:
        if (((d = (a & o.childLanes) !== 0), (r.flags & 128) !== 0)) {
          if (d) return by(r, o, a);
          o.flags |= 128;
        }
        if (
          ((p = o.memoizedState),
          p !== null &&
            ((p.rendering = null), (p.tail = null), (p.lastEffect = null)),
          Be(qe, qe.current),
          d)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((o.lanes = 0), my(r, o, a));
    }
    return er(r, o, a);
  }
  var Ey, Fd, Cy, ky;
  ((Ey = function (r, o) {
    for (var a = o.child; a !== null; ) {
      if (a.tag === 5 || a.tag === 6) r.appendChild(a.stateNode);
      else if (a.tag !== 4 && a.child !== null) {
        ((a.child.return = a), (a = a.child));
        continue;
      }
      if (a === o) break;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === o) return;
        a = a.return;
      }
      ((a.sibling.return = a.return), (a = a.sibling));
    }
  }),
    (Fd = function () {}),
    (Cy = function (r, o, a, d) {
      var p = r.memoizedProps;
      if (p !== d) {
        ((r = o.stateNode), us(On.current));
        var g = null;
        switch (a) {
          case "input":
            ((p = lt(r, p)), (d = lt(r, d)), (g = []));
            break;
          case "select":
            ((p = W({}, p, { value: void 0 })),
              (d = W({}, d, { value: void 0 })),
              (g = []));
            break;
          case "textarea":
            ((p = gu(r, p)), (d = gu(r, d)), (g = []));
            break;
          default:
            typeof p.onClick != "function" &&
              typeof d.onClick == "function" &&
              (r.onclick = nl);
        }
        vu(a, d);
        var k;
        a = null;
        for (B in p)
          if (!d.hasOwnProperty(B) && p.hasOwnProperty(B) && p[B] != null)
            if (B === "style") {
              var A = p[B];
              for (k in A) A.hasOwnProperty(k) && (a || (a = {}), (a[k] = ""));
            } else
              B !== "dangerouslySetInnerHTML" &&
                B !== "children" &&
                B !== "suppressContentEditableWarning" &&
                B !== "suppressHydrationWarning" &&
                B !== "autoFocus" &&
                (i.hasOwnProperty(B)
                  ? g || (g = [])
                  : (g = g || []).push(B, null));
        for (B in d) {
          var N = d[B];
          if (
            ((A = p != null ? p[B] : void 0),
            d.hasOwnProperty(B) && N !== A && (N != null || A != null))
          )
            if (B === "style")
              if (A) {
                for (k in A)
                  !A.hasOwnProperty(k) ||
                    (N && N.hasOwnProperty(k)) ||
                    (a || (a = {}), (a[k] = ""));
                for (k in N)
                  N.hasOwnProperty(k) &&
                    A[k] !== N[k] &&
                    (a || (a = {}), (a[k] = N[k]));
              } else (a || (g || (g = []), g.push(B, a)), (a = N));
            else
              B === "dangerouslySetInnerHTML"
                ? ((N = N ? N.__html : void 0),
                  (A = A ? A.__html : void 0),
                  N != null && A !== N && (g = g || []).push(B, N))
                : B === "children"
                  ? (typeof N != "string" && typeof N != "number") ||
                    (g = g || []).push(B, "" + N)
                  : B !== "suppressContentEditableWarning" &&
                    B !== "suppressHydrationWarning" &&
                    (i.hasOwnProperty(B)
                      ? (N != null && B === "onScroll" && ze("scroll", r),
                        g || A === N || (g = []))
                      : (g = g || []).push(B, N));
        }
        a && (g = g || []).push("style", a);
        var B = g;
        (o.updateQueue = B) && (o.flags |= 4);
      }
    }),
    (ky = function (r, o, a, d) {
      a !== d && (o.flags |= 4);
    }));
  function Oi(r, o) {
    if (!He)
      switch (r.tailMode) {
        case "hidden":
          o = r.tail;
          for (var a = null; o !== null; )
            (o.alternate !== null && (a = o), (o = o.sibling));
          a === null ? (r.tail = null) : (a.sibling = null);
          break;
        case "collapsed":
          a = r.tail;
          for (var d = null; a !== null; )
            (a.alternate !== null && (d = a), (a = a.sibling));
          d === null
            ? o || r.tail === null
              ? (r.tail = null)
              : (r.tail.sibling = null)
            : (d.sibling = null);
      }
  }
  function Tt(r) {
    var o = r.alternate !== null && r.alternate.child === r.child,
      a = 0,
      d = 0;
    if (o)
      for (var p = r.child; p !== null; )
        ((a |= p.lanes | p.childLanes),
          (d |= p.subtreeFlags & 14680064),
          (d |= p.flags & 14680064),
          (p.return = r),
          (p = p.sibling));
    else
      for (p = r.child; p !== null; )
        ((a |= p.lanes | p.childLanes),
          (d |= p.subtreeFlags),
          (d |= p.flags),
          (p.return = r),
          (p = p.sibling));
    return ((r.subtreeFlags |= d), (r.childLanes = a), o);
  }
  function qk(r, o, a) {
    var d = o.pendingProps;
    switch ((id(o), o.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Tt(o), null);
      case 1:
        return (Dt(o.type) && sl(), Tt(o), null);
      case 3:
        return (
          (d = o.stateNode),
          lo(),
          $e(Mt),
          $e(Ct),
          wd(),
          d.pendingContext &&
            ((d.context = d.pendingContext), (d.pendingContext = null)),
          (r === null || r.child === null) &&
            (cl(o)
              ? (o.flags |= 4)
              : r === null ||
                (r.memoizedState.isDehydrated && (o.flags & 256) === 0) ||
                ((o.flags |= 1024), gn !== null && (Gd(gn), (gn = null)))),
          Fd(r, o),
          Tt(o),
          null
        );
      case 5:
        yd(o);
        var p = us(Pi.current);
        if (((a = o.type), r !== null && o.stateNode != null))
          (Cy(r, o, a, d, p),
            r.ref !== o.ref && ((o.flags |= 512), (o.flags |= 2097152)));
        else {
          if (!d) {
            if (o.stateNode === null) throw Error(n(166));
            return (Tt(o), null);
          }
          if (((r = us(On.current)), cl(o))) {
            ((d = o.stateNode), (a = o.type));
            var g = o.memoizedProps;
            switch (((d[Nn] = o), (d[bi] = g), (r = (o.mode & 1) !== 0), a)) {
              case "dialog":
                (ze("cancel", d), ze("close", d));
                break;
              case "iframe":
              case "object":
              case "embed":
                ze("load", d);
                break;
              case "video":
              case "audio":
                for (p = 0; p < wi.length; p++) ze(wi[p], d);
                break;
              case "source":
                ze("error", d);
                break;
              case "img":
              case "image":
              case "link":
                (ze("error", d), ze("load", d));
                break;
              case "details":
                ze("toggle", d);
                break;
              case "input":
                (fr(d, g), ze("invalid", d));
                break;
              case "select":
                ((d._wrapperState = { wasMultiple: !!g.multiple }),
                  ze("invalid", d));
                break;
              case "textarea":
                (lm(d, g), ze("invalid", d));
            }
            (vu(a, g), (p = null));
            for (var k in g)
              if (g.hasOwnProperty(k)) {
                var A = g[k];
                k === "children"
                  ? typeof A == "string"
                    ? d.textContent !== A &&
                      (g.suppressHydrationWarning !== !0 &&
                        tl(d.textContent, A, r),
                      (p = ["children", A]))
                    : typeof A == "number" &&
                      d.textContent !== "" + A &&
                      (g.suppressHydrationWarning !== !0 &&
                        tl(d.textContent, A, r),
                      (p = ["children", "" + A]))
                  : i.hasOwnProperty(k) &&
                    A != null &&
                    k === "onScroll" &&
                    ze("scroll", d);
              }
            switch (a) {
              case "input":
                (Ae(d), ja(d, g, !0));
                break;
              case "textarea":
                (Ae(d), um(d));
                break;
              case "select":
              case "option":
                break;
              default:
                typeof g.onClick == "function" && (d.onclick = nl);
            }
            ((d = p), (o.updateQueue = d), d !== null && (o.flags |= 4));
          } else {
            ((k = p.nodeType === 9 ? p : p.ownerDocument),
              r === "http://www.w3.org/1999/xhtml" && (r = dm(a)),
              r === "http://www.w3.org/1999/xhtml"
                ? a === "script"
                  ? ((r = k.createElement("div")),
                    (r.innerHTML = "<script><\/script>"),
                    (r = r.removeChild(r.firstChild)))
                  : typeof d.is == "string"
                    ? (r = k.createElement(a, { is: d.is }))
                    : ((r = k.createElement(a)),
                      a === "select" &&
                        ((k = r),
                        d.multiple
                          ? (k.multiple = !0)
                          : d.size && (k.size = d.size)))
                : (r = k.createElementNS(r, a)),
              (r[Nn] = o),
              (r[bi] = d),
              Ey(r, o, !1, !1),
              (o.stateNode = r));
            e: {
              switch (((k = wu(a, d)), a)) {
                case "dialog":
                  (ze("cancel", r), ze("close", r), (p = d));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  (ze("load", r), (p = d));
                  break;
                case "video":
                case "audio":
                  for (p = 0; p < wi.length; p++) ze(wi[p], r);
                  p = d;
                  break;
                case "source":
                  (ze("error", r), (p = d));
                  break;
                case "img":
                case "image":
                case "link":
                  (ze("error", r), ze("load", r), (p = d));
                  break;
                case "details":
                  (ze("toggle", r), (p = d));
                  break;
                case "input":
                  (fr(r, d), (p = lt(r, d)), ze("invalid", r));
                  break;
                case "option":
                  p = d;
                  break;
                case "select":
                  ((r._wrapperState = { wasMultiple: !!d.multiple }),
                    (p = W({}, d, { value: void 0 })),
                    ze("invalid", r));
                  break;
                case "textarea":
                  (lm(r, d), (p = gu(r, d)), ze("invalid", r));
                  break;
                default:
                  p = d;
              }
              (vu(a, p), (A = p));
              for (g in A)
                if (A.hasOwnProperty(g)) {
                  var N = A[g];
                  g === "style"
                    ? pm(r, N)
                    : g === "dangerouslySetInnerHTML"
                      ? ((N = N ? N.__html : void 0), N != null && fm(r, N))
                      : g === "children"
                        ? typeof N == "string"
                          ? (a !== "textarea" || N !== "") && ei(r, N)
                          : typeof N == "number" && ei(r, "" + N)
                        : g !== "suppressContentEditableWarning" &&
                          g !== "suppressHydrationWarning" &&
                          g !== "autoFocus" &&
                          (i.hasOwnProperty(g)
                            ? N != null && g === "onScroll" && ze("scroll", r)
                            : N != null && R(r, g, N, k));
                }
              switch (a) {
                case "input":
                  (Ae(r), ja(r, d, !1));
                  break;
                case "textarea":
                  (Ae(r), um(r));
                  break;
                case "option":
                  d.value != null && r.setAttribute("value", "" + me(d.value));
                  break;
                case "select":
                  ((r.multiple = !!d.multiple),
                    (g = d.value),
                    g != null
                      ? $s(r, !!d.multiple, g, !1)
                      : d.defaultValue != null &&
                        $s(r, !!d.multiple, d.defaultValue, !0));
                  break;
                default:
                  typeof p.onClick == "function" && (r.onclick = nl);
              }
              switch (a) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  d = !!d.autoFocus;
                  break e;
                case "img":
                  d = !0;
                  break e;
                default:
                  d = !1;
              }
            }
            d && (o.flags |= 4);
          }
          o.ref !== null && ((o.flags |= 512), (o.flags |= 2097152));
        }
        return (Tt(o), null);
      case 6:
        if (r && o.stateNode != null) ky(r, o, r.memoizedProps, d);
        else {
          if (typeof d != "string" && o.stateNode === null) throw Error(n(166));
          if (((a = us(Pi.current)), us(On.current), cl(o))) {
            if (
              ((d = o.stateNode),
              (a = o.memoizedProps),
              (d[Nn] = o),
              (g = d.nodeValue !== a) && ((r = Kt), r !== null))
            )
              switch (r.tag) {
                case 3:
                  tl(d.nodeValue, a, (r.mode & 1) !== 0);
                  break;
                case 5:
                  r.memoizedProps.suppressHydrationWarning !== !0 &&
                    tl(d.nodeValue, a, (r.mode & 1) !== 0);
              }
            g && (o.flags |= 4);
          } else
            ((d = (a.nodeType === 9 ? a : a.ownerDocument).createTextNode(d)),
              (d[Nn] = o),
              (o.stateNode = d));
        }
        return (Tt(o), null);
      case 13:
        if (
          ($e(qe),
          (d = o.memoizedState),
          r === null ||
            (r.memoizedState !== null && r.memoizedState.dehydrated !== null))
        ) {
          if (He && Qt !== null && (o.mode & 1) !== 0 && (o.flags & 128) === 0)
            (Rg(), so(), (o.flags |= 98560), (g = !1));
          else if (((g = cl(o)), d !== null && d.dehydrated !== null)) {
            if (r === null) {
              if (!g) throw Error(n(318));
              if (
                ((g = o.memoizedState),
                (g = g !== null ? g.dehydrated : null),
                !g)
              )
                throw Error(n(317));
              g[Nn] = o;
            } else
              (so(),
                (o.flags & 128) === 0 && (o.memoizedState = null),
                (o.flags |= 4));
            (Tt(o), (g = !1));
          } else (gn !== null && (Gd(gn), (gn = null)), (g = !0));
          if (!g) return o.flags & 65536 ? o : null;
        }
        return (o.flags & 128) !== 0
          ? ((o.lanes = a), o)
          : ((d = d !== null),
            d !== (r !== null && r.memoizedState !== null) &&
              d &&
              ((o.child.flags |= 8192),
              (o.mode & 1) !== 0 &&
                (r === null || (qe.current & 1) !== 0
                  ? ut === 0 && (ut = 3)
                  : Jd())),
            o.updateQueue !== null && (o.flags |= 4),
            Tt(o),
            null);
      case 4:
        return (
          lo(),
          Fd(r, o),
          r === null && xi(o.stateNode.containerInfo),
          Tt(o),
          null
        );
      case 10:
        return (fd(o.type._context), Tt(o), null);
      case 17:
        return (Dt(o.type) && sl(), Tt(o), null);
      case 19:
        if (($e(qe), (g = o.memoizedState), g === null)) return (Tt(o), null);
        if (((d = (o.flags & 128) !== 0), (k = g.rendering), k === null))
          if (d) Oi(g, !1);
          else {
            if (ut !== 0 || (r !== null && (r.flags & 128) !== 0))
              for (r = o.child; r !== null; ) {
                if (((k = ml(r)), k !== null)) {
                  for (
                    o.flags |= 128,
                      Oi(g, !1),
                      d = k.updateQueue,
                      d !== null && ((o.updateQueue = d), (o.flags |= 4)),
                      o.subtreeFlags = 0,
                      d = a,
                      a = o.child;
                    a !== null;
                  )
                    ((g = a),
                      (r = d),
                      (g.flags &= 14680066),
                      (k = g.alternate),
                      k === null
                        ? ((g.childLanes = 0),
                          (g.lanes = r),
                          (g.child = null),
                          (g.subtreeFlags = 0),
                          (g.memoizedProps = null),
                          (g.memoizedState = null),
                          (g.updateQueue = null),
                          (g.dependencies = null),
                          (g.stateNode = null))
                        : ((g.childLanes = k.childLanes),
                          (g.lanes = k.lanes),
                          (g.child = k.child),
                          (g.subtreeFlags = 0),
                          (g.deletions = null),
                          (g.memoizedProps = k.memoizedProps),
                          (g.memoizedState = k.memoizedState),
                          (g.updateQueue = k.updateQueue),
                          (g.type = k.type),
                          (r = k.dependencies),
                          (g.dependencies =
                            r === null
                              ? null
                              : {
                                  lanes: r.lanes,
                                  firstContext: r.firstContext,
                                })),
                      (a = a.sibling));
                  return (Be(qe, (qe.current & 1) | 2), o.child);
                }
                r = r.sibling;
              }
            g.tail !== null &&
              et() > ho &&
              ((o.flags |= 128), (d = !0), Oi(g, !1), (o.lanes = 4194304));
          }
        else {
          if (!d)
            if (((r = ml(k)), r !== null)) {
              if (
                ((o.flags |= 128),
                (d = !0),
                (a = r.updateQueue),
                a !== null && ((o.updateQueue = a), (o.flags |= 4)),
                Oi(g, !0),
                g.tail === null &&
                  g.tailMode === "hidden" &&
                  !k.alternate &&
                  !He)
              )
                return (Tt(o), null);
            } else
              2 * et() - g.renderingStartTime > ho &&
                a !== 1073741824 &&
                ((o.flags |= 128), (d = !0), Oi(g, !1), (o.lanes = 4194304));
          g.isBackwards
            ? ((k.sibling = o.child), (o.child = k))
            : ((a = g.last),
              a !== null ? (a.sibling = k) : (o.child = k),
              (g.last = k));
        }
        return g.tail !== null
          ? ((o = g.tail),
            (g.rendering = o),
            (g.tail = o.sibling),
            (g.renderingStartTime = et()),
            (o.sibling = null),
            (a = qe.current),
            Be(qe, d ? (a & 1) | 2 : a & 1),
            o)
          : (Tt(o), null);
      case 22:
      case 23:
        return (
          Xd(),
          (d = o.memoizedState !== null),
          r !== null && (r.memoizedState !== null) !== d && (o.flags |= 8192),
          d && (o.mode & 1) !== 0
            ? (Gt & 1073741824) !== 0 &&
              (Tt(o), o.subtreeFlags & 6 && (o.flags |= 8192))
            : Tt(o),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(n(156, o.tag));
  }
  function Kk(r, o) {
    switch ((id(o), o.tag)) {
      case 1:
        return (
          Dt(o.type) && sl(),
          (r = o.flags),
          r & 65536 ? ((o.flags = (r & -65537) | 128), o) : null
        );
      case 3:
        return (
          lo(),
          $e(Mt),
          $e(Ct),
          wd(),
          (r = o.flags),
          (r & 65536) !== 0 && (r & 128) === 0
            ? ((o.flags = (r & -65537) | 128), o)
            : null
        );
      case 5:
        return (yd(o), null);
      case 13:
        if (
          ($e(qe), (r = o.memoizedState), r !== null && r.dehydrated !== null)
        ) {
          if (o.alternate === null) throw Error(n(340));
          so();
        }
        return (
          (r = o.flags),
          r & 65536 ? ((o.flags = (r & -65537) | 128), o) : null
        );
      case 19:
        return ($e(qe), null);
      case 4:
        return (lo(), null);
      case 10:
        return (fd(o.type._context), null);
      case 22:
      case 23:
        return (Xd(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Cl = !1,
    Pt = !1,
    Qk = typeof WeakSet == "function" ? WeakSet : Set,
    oe = null;
  function uo(r, o) {
    var a = r.ref;
    if (a !== null)
      if (typeof a == "function")
        try {
          a(null);
        } catch (d) {
          Ye(r, o, d);
        }
      else a.current = null;
  }
  function Vd(r, o, a) {
    try {
      a();
    } catch (d) {
      Ye(r, o, d);
    }
  }
  var Ty = !1;
  function Gk(r, o) {
    if (((Xu = Wa), (r = sg()), $u(r))) {
      if ("selectionStart" in r)
        var a = { start: r.selectionStart, end: r.selectionEnd };
      else
        e: {
          a = ((a = r.ownerDocument) && a.defaultView) || window;
          var d = a.getSelection && a.getSelection();
          if (d && d.rangeCount !== 0) {
            a = d.anchorNode;
            var p = d.anchorOffset,
              g = d.focusNode;
            d = d.focusOffset;
            try {
              (a.nodeType, g.nodeType);
            } catch {
              a = null;
              break e;
            }
            var k = 0,
              A = -1,
              N = -1,
              B = 0,
              K = 0,
              G = r,
              q = null;
            t: for (;;) {
              for (
                var re;
                G !== a || (p !== 0 && G.nodeType !== 3) || (A = k + p),
                  G !== g || (d !== 0 && G.nodeType !== 3) || (N = k + d),
                  G.nodeType === 3 && (k += G.nodeValue.length),
                  (re = G.firstChild) !== null;
              )
                ((q = G), (G = re));
              for (;;) {
                if (G === r) break t;
                if (
                  (q === a && ++B === p && (A = k),
                  q === g && ++K === d && (N = k),
                  (re = G.nextSibling) !== null)
                )
                  break;
                ((G = q), (q = G.parentNode));
              }
              G = re;
            }
            a = A === -1 || N === -1 ? null : { start: A, end: N };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      Ju = { focusedElem: r, selectionRange: a }, Wa = !1, oe = o;
      oe !== null;
    )
      if (
        ((o = oe), (r = o.child), (o.subtreeFlags & 1028) !== 0 && r !== null)
      )
        ((r.return = o), (oe = r));
      else
        for (; oe !== null; ) {
          o = oe;
          try {
            var ie = o.alternate;
            if ((o.flags & 1024) !== 0)
              switch (o.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (ie !== null) {
                    var ue = ie.memoizedProps,
                      tt = ie.memoizedState,
                      I = o.stateNode,
                      j = I.getSnapshotBeforeUpdate(
                        o.elementType === o.type ? ue : yn(o.type, ue),
                        tt,
                      );
                    I.__reactInternalSnapshotBeforeUpdate = j;
                  }
                  break;
                case 3:
                  var F = o.stateNode.containerInfo;
                  F.nodeType === 1
                    ? (F.textContent = "")
                    : F.nodeType === 9 &&
                      F.documentElement &&
                      F.removeChild(F.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(n(163));
              }
          } catch (Y) {
            Ye(o, o.return, Y);
          }
          if (((r = o.sibling), r !== null)) {
            ((r.return = o.return), (oe = r));
            break;
          }
          oe = o.return;
        }
    return ((ie = Ty), (Ty = !1), ie);
  }
  function ji(r, o, a) {
    var d = o.updateQueue;
    if (((d = d !== null ? d.lastEffect : null), d !== null)) {
      var p = (d = d.next);
      do {
        if ((p.tag & r) === r) {
          var g = p.destroy;
          ((p.destroy = void 0), g !== void 0 && Vd(o, a, g));
        }
        p = p.next;
      } while (p !== d);
    }
  }
  function kl(r, o) {
    if (
      ((o = o.updateQueue), (o = o !== null ? o.lastEffect : null), o !== null)
    ) {
      var a = (o = o.next);
      do {
        if ((a.tag & r) === r) {
          var d = a.create;
          a.destroy = d();
        }
        a = a.next;
      } while (a !== o);
    }
  }
  function Bd(r) {
    var o = r.ref;
    if (o !== null) {
      var a = r.stateNode;
      switch (r.tag) {
        case 5:
          r = a;
          break;
        default:
          r = a;
      }
      typeof o == "function" ? o(r) : (o.current = r);
    }
  }
  function Py(r) {
    var o = r.alternate;
    (o !== null && ((r.alternate = null), Py(o)),
      (r.child = null),
      (r.deletions = null),
      (r.sibling = null),
      r.tag === 5 &&
        ((o = r.stateNode),
        o !== null &&
          (delete o[Nn],
          delete o[bi],
          delete o[nd],
          delete o[Nk],
          delete o[Ok])),
      (r.stateNode = null),
      (r.return = null),
      (r.dependencies = null),
      (r.memoizedProps = null),
      (r.memoizedState = null),
      (r.pendingProps = null),
      (r.stateNode = null),
      (r.updateQueue = null));
  }
  function Ry(r) {
    return r.tag === 5 || r.tag === 3 || r.tag === 4;
  }
  function Ay(r) {
    e: for (;;) {
      for (; r.sibling === null; ) {
        if (r.return === null || Ry(r.return)) return null;
        r = r.return;
      }
      for (
        r.sibling.return = r.return, r = r.sibling;
        r.tag !== 5 && r.tag !== 6 && r.tag !== 18;
      ) {
        if (r.flags & 2 || r.child === null || r.tag === 4) continue e;
        ((r.child.return = r), (r = r.child));
      }
      if (!(r.flags & 2)) return r.stateNode;
    }
  }
  function Ud(r, o, a) {
    var d = r.tag;
    if (d === 5 || d === 6)
      ((r = r.stateNode),
        o
          ? a.nodeType === 8
            ? a.parentNode.insertBefore(r, o)
            : a.insertBefore(r, o)
          : (a.nodeType === 8
              ? ((o = a.parentNode), o.insertBefore(r, a))
              : ((o = a), o.appendChild(r)),
            (a = a._reactRootContainer),
            a != null || o.onclick !== null || (o.onclick = nl)));
    else if (d !== 4 && ((r = r.child), r !== null))
      for (Ud(r, o, a), r = r.sibling; r !== null; )
        (Ud(r, o, a), (r = r.sibling));
  }
  function zd(r, o, a) {
    var d = r.tag;
    if (d === 5 || d === 6)
      ((r = r.stateNode), o ? a.insertBefore(r, o) : a.appendChild(r));
    else if (d !== 4 && ((r = r.child), r !== null))
      for (zd(r, o, a), r = r.sibling; r !== null; )
        (zd(r, o, a), (r = r.sibling));
  }
  var vt = null,
    vn = !1;
  function Pr(r, o, a) {
    for (a = a.child; a !== null; ) (_y(r, o, a), (a = a.sibling));
  }
  function _y(r, o, a) {
    if (_n && typeof _n.onCommitFiberUnmount == "function")
      try {
        _n.onCommitFiberUnmount(Fa, a);
      } catch {}
    switch (a.tag) {
      case 5:
        Pt || uo(a, o);
      case 6:
        var d = vt,
          p = vn;
        ((vt = null),
          Pr(r, o, a),
          (vt = d),
          (vn = p),
          vt !== null &&
            (vn
              ? ((r = vt),
                (a = a.stateNode),
                r.nodeType === 8
                  ? r.parentNode.removeChild(a)
                  : r.removeChild(a))
              : vt.removeChild(a.stateNode)));
        break;
      case 18:
        vt !== null &&
          (vn
            ? ((r = vt),
              (a = a.stateNode),
              r.nodeType === 8
                ? td(r.parentNode, a)
                : r.nodeType === 1 && td(r, a),
              di(r))
            : td(vt, a.stateNode));
        break;
      case 4:
        ((d = vt),
          (p = vn),
          (vt = a.stateNode.containerInfo),
          (vn = !0),
          Pr(r, o, a),
          (vt = d),
          (vn = p));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !Pt &&
          ((d = a.updateQueue), d !== null && ((d = d.lastEffect), d !== null))
        ) {
          p = d = d.next;
          do {
            var g = p,
              k = g.destroy;
            ((g = g.tag),
              k !== void 0 && ((g & 2) !== 0 || (g & 4) !== 0) && Vd(a, o, k),
              (p = p.next));
          } while (p !== d);
        }
        Pr(r, o, a);
        break;
      case 1:
        if (
          !Pt &&
          (uo(a, o),
          (d = a.stateNode),
          typeof d.componentWillUnmount == "function")
        )
          try {
            ((d.props = a.memoizedProps),
              (d.state = a.memoizedState),
              d.componentWillUnmount());
          } catch (A) {
            Ye(a, o, A);
          }
        Pr(r, o, a);
        break;
      case 21:
        Pr(r, o, a);
        break;
      case 22:
        a.mode & 1
          ? ((Pt = (d = Pt) || a.memoizedState !== null), Pr(r, o, a), (Pt = d))
          : Pr(r, o, a);
        break;
      default:
        Pr(r, o, a);
    }
  }
  function Ny(r) {
    var o = r.updateQueue;
    if (o !== null) {
      r.updateQueue = null;
      var a = r.stateNode;
      (a === null && (a = r.stateNode = new Qk()),
        o.forEach(function (d) {
          var p = sT.bind(null, r, d);
          a.has(d) || (a.add(d), d.then(p, p));
        }));
    }
  }
  function wn(r, o) {
    var a = o.deletions;
    if (a !== null)
      for (var d = 0; d < a.length; d++) {
        var p = a[d];
        try {
          var g = r,
            k = o,
            A = k;
          e: for (; A !== null; ) {
            switch (A.tag) {
              case 5:
                ((vt = A.stateNode), (vn = !1));
                break e;
              case 3:
                ((vt = A.stateNode.containerInfo), (vn = !0));
                break e;
              case 4:
                ((vt = A.stateNode.containerInfo), (vn = !0));
                break e;
            }
            A = A.return;
          }
          if (vt === null) throw Error(n(160));
          (_y(g, k, p), (vt = null), (vn = !1));
          var N = p.alternate;
          (N !== null && (N.return = null), (p.return = null));
        } catch (B) {
          Ye(p, o, B);
        }
      }
    if (o.subtreeFlags & 12854)
      for (o = o.child; o !== null; ) (Oy(o, r), (o = o.sibling));
  }
  function Oy(r, o) {
    var a = r.alternate,
      d = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((wn(o, r), Ln(r), d & 4)) {
          try {
            (ji(3, r, r.return), kl(3, r));
          } catch (ue) {
            Ye(r, r.return, ue);
          }
          try {
            ji(5, r, r.return);
          } catch (ue) {
            Ye(r, r.return, ue);
          }
        }
        break;
      case 1:
        (wn(o, r), Ln(r), d & 512 && a !== null && uo(a, a.return));
        break;
      case 5:
        if (
          (wn(o, r),
          Ln(r),
          d & 512 && a !== null && uo(a, a.return),
          r.flags & 32)
        ) {
          var p = r.stateNode;
          try {
            ei(p, "");
          } catch (ue) {
            Ye(r, r.return, ue);
          }
        }
        if (d & 4 && ((p = r.stateNode), p != null)) {
          var g = r.memoizedProps,
            k = a !== null ? a.memoizedProps : g,
            A = r.type,
            N = r.updateQueue;
          if (((r.updateQueue = null), N !== null))
            try {
              (A === "input" &&
                g.type === "radio" &&
                g.name != null &&
                hr(p, g),
                wu(A, k));
              var B = wu(A, g);
              for (k = 0; k < N.length; k += 2) {
                var K = N[k],
                  G = N[k + 1];
                K === "style"
                  ? pm(p, G)
                  : K === "dangerouslySetInnerHTML"
                    ? fm(p, G)
                    : K === "children"
                      ? ei(p, G)
                      : R(p, K, G, B);
              }
              switch (A) {
                case "input":
                  Kn(p, g);
                  break;
                case "textarea":
                  cm(p, g);
                  break;
                case "select":
                  var q = p._wrapperState.wasMultiple;
                  p._wrapperState.wasMultiple = !!g.multiple;
                  var re = g.value;
                  re != null
                    ? $s(p, !!g.multiple, re, !1)
                    : q !== !!g.multiple &&
                      (g.defaultValue != null
                        ? $s(p, !!g.multiple, g.defaultValue, !0)
                        : $s(p, !!g.multiple, g.multiple ? [] : "", !1));
              }
              p[bi] = g;
            } catch (ue) {
              Ye(r, r.return, ue);
            }
        }
        break;
      case 6:
        if ((wn(o, r), Ln(r), d & 4)) {
          if (r.stateNode === null) throw Error(n(162));
          ((p = r.stateNode), (g = r.memoizedProps));
          try {
            p.nodeValue = g;
          } catch (ue) {
            Ye(r, r.return, ue);
          }
        }
        break;
      case 3:
        if (
          (wn(o, r), Ln(r), d & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            di(o.containerInfo);
          } catch (ue) {
            Ye(r, r.return, ue);
          }
        break;
      case 4:
        (wn(o, r), Ln(r));
        break;
      case 13:
        (wn(o, r),
          Ln(r),
          (p = r.child),
          p.flags & 8192 &&
            ((g = p.memoizedState !== null),
            (p.stateNode.isHidden = g),
            !g ||
              (p.alternate !== null && p.alternate.memoizedState !== null) ||
              (Hd = et())),
          d & 4 && Ny(r));
        break;
      case 22:
        if (
          ((K = a !== null && a.memoizedState !== null),
          r.mode & 1 ? ((Pt = (B = Pt) || K), wn(o, r), (Pt = B)) : wn(o, r),
          Ln(r),
          d & 8192)
        ) {
          if (
            ((B = r.memoizedState !== null),
            (r.stateNode.isHidden = B) && !K && (r.mode & 1) !== 0)
          )
            for (oe = r, K = r.child; K !== null; ) {
              for (G = oe = K; oe !== null; ) {
                switch (((q = oe), (re = q.child), q.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    ji(4, q, q.return);
                    break;
                  case 1:
                    uo(q, q.return);
                    var ie = q.stateNode;
                    if (typeof ie.componentWillUnmount == "function") {
                      ((d = q), (a = q.return));
                      try {
                        ((o = d),
                          (ie.props = o.memoizedProps),
                          (ie.state = o.memoizedState),
                          ie.componentWillUnmount());
                      } catch (ue) {
                        Ye(d, a, ue);
                      }
                    }
                    break;
                  case 5:
                    uo(q, q.return);
                    break;
                  case 22:
                    if (q.memoizedState !== null) {
                      My(G);
                      continue;
                    }
                }
                re !== null ? ((re.return = q), (oe = re)) : My(G);
              }
              K = K.sibling;
            }
          e: for (K = null, G = r; ; ) {
            if (G.tag === 5) {
              if (K === null) {
                K = G;
                try {
                  ((p = G.stateNode),
                    B
                      ? ((g = p.style),
                        typeof g.setProperty == "function"
                          ? g.setProperty("display", "none", "important")
                          : (g.display = "none"))
                      : ((A = G.stateNode),
                        (N = G.memoizedProps.style),
                        (k =
                          N != null && N.hasOwnProperty("display")
                            ? N.display
                            : null),
                        (A.style.display = hm("display", k))));
                } catch (ue) {
                  Ye(r, r.return, ue);
                }
              }
            } else if (G.tag === 6) {
              if (K === null)
                try {
                  G.stateNode.nodeValue = B ? "" : G.memoizedProps;
                } catch (ue) {
                  Ye(r, r.return, ue);
                }
            } else if (
              ((G.tag !== 22 && G.tag !== 23) ||
                G.memoizedState === null ||
                G === r) &&
              G.child !== null
            ) {
              ((G.child.return = G), (G = G.child));
              continue;
            }
            if (G === r) break e;
            for (; G.sibling === null; ) {
              if (G.return === null || G.return === r) break e;
              (K === G && (K = null), (G = G.return));
            }
            (K === G && (K = null),
              (G.sibling.return = G.return),
              (G = G.sibling));
          }
        }
        break;
      case 19:
        (wn(o, r), Ln(r), d & 4 && Ny(r));
        break;
      case 21:
        break;
      default:
        (wn(o, r), Ln(r));
    }
  }
  function Ln(r) {
    var o = r.flags;
    if (o & 2) {
      try {
        e: {
          for (var a = r.return; a !== null; ) {
            if (Ry(a)) {
              var d = a;
              break e;
            }
            a = a.return;
          }
          throw Error(n(160));
        }
        switch (d.tag) {
          case 5:
            var p = d.stateNode;
            d.flags & 32 && (ei(p, ""), (d.flags &= -33));
            var g = Ay(r);
            zd(r, g, p);
            break;
          case 3:
          case 4:
            var k = d.stateNode.containerInfo,
              A = Ay(r);
            Ud(r, A, k);
            break;
          default:
            throw Error(n(161));
        }
      } catch (N) {
        Ye(r, r.return, N);
      }
      r.flags &= -3;
    }
    o & 4096 && (r.flags &= -4097);
  }
  function Yk(r, o, a) {
    ((oe = r), jy(r));
  }
  function jy(r, o, a) {
    for (var d = (r.mode & 1) !== 0; oe !== null; ) {
      var p = oe,
        g = p.child;
      if (p.tag === 22 && d) {
        var k = p.memoizedState !== null || Cl;
        if (!k) {
          var A = p.alternate,
            N = (A !== null && A.memoizedState !== null) || Pt;
          A = Cl;
          var B = Pt;
          if (((Cl = k), (Pt = N) && !B))
            for (oe = p; oe !== null; )
              ((k = oe),
                (N = k.child),
                k.tag === 22 && k.memoizedState !== null
                  ? Dy(p)
                  : N !== null
                    ? ((N.return = k), (oe = N))
                    : Dy(p));
          for (; g !== null; ) ((oe = g), jy(g), (g = g.sibling));
          ((oe = p), (Cl = A), (Pt = B));
        }
        Ly(r);
      } else
        (p.subtreeFlags & 8772) !== 0 && g !== null
          ? ((g.return = p), (oe = g))
          : Ly(r);
    }
  }
  function Ly(r) {
    for (; oe !== null; ) {
      var o = oe;
      if ((o.flags & 8772) !== 0) {
        var a = o.alternate;
        try {
          if ((o.flags & 8772) !== 0)
            switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Pt || kl(5, o);
                break;
              case 1:
                var d = o.stateNode;
                if (o.flags & 4 && !Pt)
                  if (a === null) d.componentDidMount();
                  else {
                    var p =
                      o.elementType === o.type
                        ? a.memoizedProps
                        : yn(o.type, a.memoizedProps);
                    d.componentDidUpdate(
                      p,
                      a.memoizedState,
                      d.__reactInternalSnapshotBeforeUpdate,
                    );
                  }
                var g = o.updateQueue;
                g !== null && Mg(o, g, d);
                break;
              case 3:
                var k = o.updateQueue;
                if (k !== null) {
                  if (((a = null), o.child !== null))
                    switch (o.child.tag) {
                      case 5:
                        a = o.child.stateNode;
                        break;
                      case 1:
                        a = o.child.stateNode;
                    }
                  Mg(o, k, a);
                }
                break;
              case 5:
                var A = o.stateNode;
                if (a === null && o.flags & 4) {
                  a = A;
                  var N = o.memoizedProps;
                  switch (o.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      N.autoFocus && a.focus();
                      break;
                    case "img":
                      N.src && (a.src = N.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (o.memoizedState === null) {
                  var B = o.alternate;
                  if (B !== null) {
                    var K = B.memoizedState;
                    if (K !== null) {
                      var G = K.dehydrated;
                      G !== null && di(G);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(n(163));
            }
          Pt || (o.flags & 512 && Bd(o));
        } catch (q) {
          Ye(o, o.return, q);
        }
      }
      if (o === r) {
        oe = null;
        break;
      }
      if (((a = o.sibling), a !== null)) {
        ((a.return = o.return), (oe = a));
        break;
      }
      oe = o.return;
    }
  }
  function My(r) {
    for (; oe !== null; ) {
      var o = oe;
      if (o === r) {
        oe = null;
        break;
      }
      var a = o.sibling;
      if (a !== null) {
        ((a.return = o.return), (oe = a));
        break;
      }
      oe = o.return;
    }
  }
  function Dy(r) {
    for (; oe !== null; ) {
      var o = oe;
      try {
        switch (o.tag) {
          case 0:
          case 11:
          case 15:
            var a = o.return;
            try {
              kl(4, o);
            } catch (N) {
              Ye(o, a, N);
            }
            break;
          case 1:
            var d = o.stateNode;
            if (typeof d.componentDidMount == "function") {
              var p = o.return;
              try {
                d.componentDidMount();
              } catch (N) {
                Ye(o, p, N);
              }
            }
            var g = o.return;
            try {
              Bd(o);
            } catch (N) {
              Ye(o, g, N);
            }
            break;
          case 5:
            var k = o.return;
            try {
              Bd(o);
            } catch (N) {
              Ye(o, k, N);
            }
        }
      } catch (N) {
        Ye(o, o.return, N);
      }
      if (o === r) {
        oe = null;
        break;
      }
      var A = o.sibling;
      if (A !== null) {
        ((A.return = o.return), (oe = A));
        break;
      }
      oe = o.return;
    }
  }
  var Xk = Math.ceil,
    Tl = _.ReactCurrentDispatcher,
    $d = _.ReactCurrentOwner,
    on = _.ReactCurrentBatchConfig,
    Me = 0,
    pt = null,
    ot = null,
    wt = 0,
    Gt = 0,
    fo = br(0),
    ut = 0,
    Li = null,
    fs = 0,
    Pl = 0,
    Wd = 0,
    Mi = null,
    Ft = null,
    Hd = 0,
    ho = 1 / 0,
    tr = null,
    Rl = !1,
    qd = null,
    Rr = null,
    Al = !1,
    Ar = null,
    _l = 0,
    Di = 0,
    Kd = null,
    Nl = -1,
    Ol = 0;
  function jt() {
    return (Me & 6) !== 0 ? et() : Nl !== -1 ? Nl : (Nl = et());
  }
  function _r(r) {
    return (r.mode & 1) === 0
      ? 1
      : (Me & 2) !== 0 && wt !== 0
        ? wt & -wt
        : Lk.transition !== null
          ? (Ol === 0 && (Ol = Am()), Ol)
          : ((r = Fe),
            r !== 0 ||
              ((r = window.event), (r = r === void 0 ? 16 : Fm(r.type))),
            r);
  }
  function xn(r, o, a, d) {
    if (50 < Di) throw ((Di = 0), (Kd = null), Error(n(185)));
    (ii(r, a, d),
      ((Me & 2) === 0 || r !== pt) &&
        (r === pt && ((Me & 2) === 0 && (Pl |= a), ut === 4 && Nr(r, wt)),
        Vt(r, d),
        a === 1 &&
          Me === 0 &&
          (o.mode & 1) === 0 &&
          ((ho = et() + 500), il && Cr())));
  }
  function Vt(r, o) {
    var a = r.callbackNode;
    LC(r, o);
    var d = Ua(r, r === pt ? wt : 0);
    if (d === 0)
      (a !== null && Tm(a), (r.callbackNode = null), (r.callbackPriority = 0));
    else if (((o = d & -d), r.callbackPriority !== o)) {
      if ((a != null && Tm(a), o === 1))
        (r.tag === 0 ? jk(Fy.bind(null, r)) : Eg(Fy.bind(null, r)),
          Ak(function () {
            (Me & 6) === 0 && Cr();
          }),
          (a = null));
      else {
        switch (_m(d)) {
          case 1:
            a = Tu;
            break;
          case 4:
            a = Pm;
            break;
          case 16:
            a = Ia;
            break;
          case 536870912:
            a = Rm;
            break;
          default:
            a = Ia;
        }
        a = qy(a, Iy.bind(null, r));
      }
      ((r.callbackPriority = o), (r.callbackNode = a));
    }
  }
  function Iy(r, o) {
    if (((Nl = -1), (Ol = 0), (Me & 6) !== 0)) throw Error(n(327));
    var a = r.callbackNode;
    if (po() && r.callbackNode !== a) return null;
    var d = Ua(r, r === pt ? wt : 0);
    if (d === 0) return null;
    if ((d & 30) !== 0 || (d & r.expiredLanes) !== 0 || o) o = jl(r, d);
    else {
      o = d;
      var p = Me;
      Me |= 2;
      var g = By();
      (pt !== r || wt !== o) && ((tr = null), (ho = et() + 500), ps(r, o));
      do
        try {
          eT();
          break;
        } catch (A) {
          Vy(r, A);
        }
      while (!0);
      (dd(),
        (Tl.current = g),
        (Me = p),
        ot !== null ? (o = 0) : ((pt = null), (wt = 0), (o = ut)));
    }
    if (o !== 0) {
      if (
        (o === 2 && ((p = Pu(r)), p !== 0 && ((d = p), (o = Qd(r, p)))),
        o === 1)
      )
        throw ((a = Li), ps(r, 0), Nr(r, d), Vt(r, et()), a);
      if (o === 6) Nr(r, d);
      else {
        if (
          ((p = r.current.alternate),
          (d & 30) === 0 &&
            !Jk(p) &&
            ((o = jl(r, d)),
            o === 2 && ((g = Pu(r)), g !== 0 && ((d = g), (o = Qd(r, g)))),
            o === 1))
        )
          throw ((a = Li), ps(r, 0), Nr(r, d), Vt(r, et()), a);
        switch (((r.finishedWork = p), (r.finishedLanes = d), o)) {
          case 0:
          case 1:
            throw Error(n(345));
          case 2:
            ms(r, Ft, tr);
            break;
          case 3:
            if (
              (Nr(r, d),
              (d & 130023424) === d && ((o = Hd + 500 - et()), 10 < o))
            ) {
              if (Ua(r, 0) !== 0) break;
              if (((p = r.suspendedLanes), (p & d) !== d)) {
                (jt(), (r.pingedLanes |= r.suspendedLanes & p));
                break;
              }
              r.timeoutHandle = ed(ms.bind(null, r, Ft, tr), o);
              break;
            }
            ms(r, Ft, tr);
            break;
          case 4:
            if ((Nr(r, d), (d & 4194240) === d)) break;
            for (o = r.eventTimes, p = -1; 0 < d; ) {
              var k = 31 - pn(d);
              ((g = 1 << k), (k = o[k]), k > p && (p = k), (d &= ~g));
            }
            if (
              ((d = p),
              (d = et() - d),
              (d =
                (120 > d
                  ? 120
                  : 480 > d
                    ? 480
                    : 1080 > d
                      ? 1080
                      : 1920 > d
                        ? 1920
                        : 3e3 > d
                          ? 3e3
                          : 4320 > d
                            ? 4320
                            : 1960 * Xk(d / 1960)) - d),
              10 < d)
            ) {
              r.timeoutHandle = ed(ms.bind(null, r, Ft, tr), d);
              break;
            }
            ms(r, Ft, tr);
            break;
          case 5:
            ms(r, Ft, tr);
            break;
          default:
            throw Error(n(329));
        }
      }
    }
    return (Vt(r, et()), r.callbackNode === a ? Iy.bind(null, r) : null);
  }
  function Qd(r, o) {
    var a = Mi;
    return (
      r.current.memoizedState.isDehydrated && (ps(r, o).flags |= 256),
      (r = jl(r, o)),
      r !== 2 && ((o = Ft), (Ft = a), o !== null && Gd(o)),
      r
    );
  }
  function Gd(r) {
    Ft === null ? (Ft = r) : Ft.push.apply(Ft, r);
  }
  function Jk(r) {
    for (var o = r; ; ) {
      if (o.flags & 16384) {
        var a = o.updateQueue;
        if (a !== null && ((a = a.stores), a !== null))
          for (var d = 0; d < a.length; d++) {
            var p = a[d],
              g = p.getSnapshot;
            p = p.value;
            try {
              if (!mn(g(), p)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((a = o.child), o.subtreeFlags & 16384 && a !== null))
        ((a.return = o), (o = a));
      else {
        if (o === r) break;
        for (; o.sibling === null; ) {
          if (o.return === null || o.return === r) return !0;
          o = o.return;
        }
        ((o.sibling.return = o.return), (o = o.sibling));
      }
    }
    return !0;
  }
  function Nr(r, o) {
    for (
      o &= ~Wd,
        o &= ~Pl,
        r.suspendedLanes |= o,
        r.pingedLanes &= ~o,
        r = r.expirationTimes;
      0 < o;
    ) {
      var a = 31 - pn(o),
        d = 1 << a;
      ((r[a] = -1), (o &= ~d));
    }
  }
  function Fy(r) {
    if ((Me & 6) !== 0) throw Error(n(327));
    po();
    var o = Ua(r, 0);
    if ((o & 1) === 0) return (Vt(r, et()), null);
    var a = jl(r, o);
    if (r.tag !== 0 && a === 2) {
      var d = Pu(r);
      d !== 0 && ((o = d), (a = Qd(r, d)));
    }
    if (a === 1) throw ((a = Li), ps(r, 0), Nr(r, o), Vt(r, et()), a);
    if (a === 6) throw Error(n(345));
    return (
      (r.finishedWork = r.current.alternate),
      (r.finishedLanes = o),
      ms(r, Ft, tr),
      Vt(r, et()),
      null
    );
  }
  function Yd(r, o) {
    var a = Me;
    Me |= 1;
    try {
      return r(o);
    } finally {
      ((Me = a), Me === 0 && ((ho = et() + 500), il && Cr()));
    }
  }
  function hs(r) {
    Ar !== null && Ar.tag === 0 && (Me & 6) === 0 && po();
    var o = Me;
    Me |= 1;
    var a = on.transition,
      d = Fe;
    try {
      if (((on.transition = null), (Fe = 1), r)) return r();
    } finally {
      ((Fe = d), (on.transition = a), (Me = o), (Me & 6) === 0 && Cr());
    }
  }
  function Xd() {
    ((Gt = fo.current), $e(fo));
  }
  function ps(r, o) {
    ((r.finishedWork = null), (r.finishedLanes = 0));
    var a = r.timeoutHandle;
    if ((a !== -1 && ((r.timeoutHandle = -1), Rk(a)), ot !== null))
      for (a = ot.return; a !== null; ) {
        var d = a;
        switch ((id(d), d.tag)) {
          case 1:
            ((d = d.type.childContextTypes), d != null && sl());
            break;
          case 3:
            (lo(), $e(Mt), $e(Ct), wd());
            break;
          case 5:
            yd(d);
            break;
          case 4:
            lo();
            break;
          case 13:
            $e(qe);
            break;
          case 19:
            $e(qe);
            break;
          case 10:
            fd(d.type._context);
            break;
          case 22:
          case 23:
            Xd();
        }
        a = a.return;
      }
    if (
      ((pt = r),
      (ot = r = Or(r.current, null)),
      (wt = Gt = o),
      (ut = 0),
      (Li = null),
      (Wd = Pl = fs = 0),
      (Ft = Mi = null),
      cs !== null)
    ) {
      for (o = 0; o < cs.length; o++)
        if (((a = cs[o]), (d = a.interleaved), d !== null)) {
          a.interleaved = null;
          var p = d.next,
            g = a.pending;
          if (g !== null) {
            var k = g.next;
            ((g.next = p), (d.next = k));
          }
          a.pending = d;
        }
      cs = null;
    }
    return r;
  }
  function Vy(r, o) {
    do {
      var a = ot;
      try {
        if ((dd(), (gl.current = xl), yl)) {
          for (var d = Ke.memoizedState; d !== null; ) {
            var p = d.queue;
            (p !== null && (p.pending = null), (d = d.next));
          }
          yl = !1;
        }
        if (
          ((ds = 0),
          (ht = ct = Ke = null),
          (Ri = !1),
          (Ai = 0),
          ($d.current = null),
          a === null || a.return === null)
        ) {
          ((ut = 1), (Li = o), (ot = null));
          break;
        }
        e: {
          var g = r,
            k = a.return,
            A = a,
            N = o;
          if (
            ((o = wt),
            (A.flags |= 32768),
            N !== null && typeof N == "object" && typeof N.then == "function")
          ) {
            var B = N,
              K = A,
              G = K.tag;
            if ((K.mode & 1) === 0 && (G === 0 || G === 11 || G === 15)) {
              var q = K.alternate;
              q
                ? ((K.updateQueue = q.updateQueue),
                  (K.memoizedState = q.memoizedState),
                  (K.lanes = q.lanes))
                : ((K.updateQueue = null), (K.memoizedState = null));
            }
            var re = uy(k);
            if (re !== null) {
              ((re.flags &= -257),
                dy(re, k, A, g, o),
                re.mode & 1 && cy(g, B, o),
                (o = re),
                (N = B));
              var ie = o.updateQueue;
              if (ie === null) {
                var ue = new Set();
                (ue.add(N), (o.updateQueue = ue));
              } else ie.add(N);
              break e;
            } else {
              if ((o & 1) === 0) {
                (cy(g, B, o), Jd());
                break e;
              }
              N = Error(n(426));
            }
          } else if (He && A.mode & 1) {
            var tt = uy(k);
            if (tt !== null) {
              ((tt.flags & 65536) === 0 && (tt.flags |= 256),
                dy(tt, k, A, g, o),
                cd(co(N, A)));
              break e;
            }
          }
          ((g = N = co(N, A)),
            ut !== 4 && (ut = 2),
            Mi === null ? (Mi = [g]) : Mi.push(g),
            (g = k));
          do {
            switch (g.tag) {
              case 3:
                ((g.flags |= 65536), (o &= -o), (g.lanes |= o));
                var I = ay(g, N, o);
                Lg(g, I);
                break e;
              case 1:
                A = N;
                var j = g.type,
                  F = g.stateNode;
                if (
                  (g.flags & 128) === 0 &&
                  (typeof j.getDerivedStateFromError == "function" ||
                    (F !== null &&
                      typeof F.componentDidCatch == "function" &&
                      (Rr === null || !Rr.has(F))))
                ) {
                  ((g.flags |= 65536), (o &= -o), (g.lanes |= o));
                  var Y = ly(g, A, o);
                  Lg(g, Y);
                  break e;
                }
            }
            g = g.return;
          } while (g !== null);
        }
        zy(a);
      } catch (he) {
        ((o = he), ot === a && a !== null && (ot = a = a.return));
        continue;
      }
      break;
    } while (!0);
  }
  function By() {
    var r = Tl.current;
    return ((Tl.current = xl), r === null ? xl : r);
  }
  function Jd() {
    ((ut === 0 || ut === 3 || ut === 2) && (ut = 4),
      pt === null ||
        ((fs & 268435455) === 0 && (Pl & 268435455) === 0) ||
        Nr(pt, wt));
  }
  function jl(r, o) {
    var a = Me;
    Me |= 2;
    var d = By();
    (pt !== r || wt !== o) && ((tr = null), ps(r, o));
    do
      try {
        Zk();
        break;
      } catch (p) {
        Vy(r, p);
      }
    while (!0);
    if ((dd(), (Me = a), (Tl.current = d), ot !== null)) throw Error(n(261));
    return ((pt = null), (wt = 0), ut);
  }
  function Zk() {
    for (; ot !== null; ) Uy(ot);
  }
  function eT() {
    for (; ot !== null && !kC(); ) Uy(ot);
  }
  function Uy(r) {
    var o = Hy(r.alternate, r, Gt);
    ((r.memoizedProps = r.pendingProps),
      o === null ? zy(r) : (ot = o),
      ($d.current = null));
  }
  function zy(r) {
    var o = r;
    do {
      var a = o.alternate;
      if (((r = o.return), (o.flags & 32768) === 0)) {
        if (((a = qk(a, o, Gt)), a !== null)) {
          ot = a;
          return;
        }
      } else {
        if (((a = Kk(a, o)), a !== null)) {
          ((a.flags &= 32767), (ot = a));
          return;
        }
        if (r !== null)
          ((r.flags |= 32768), (r.subtreeFlags = 0), (r.deletions = null));
        else {
          ((ut = 6), (ot = null));
          return;
        }
      }
      if (((o = o.sibling), o !== null)) {
        ot = o;
        return;
      }
      ot = o = r;
    } while (o !== null);
    ut === 0 && (ut = 5);
  }
  function ms(r, o, a) {
    var d = Fe,
      p = on.transition;
    try {
      ((on.transition = null), (Fe = 1), tT(r, o, a, d));
    } finally {
      ((on.transition = p), (Fe = d));
    }
    return null;
  }
  function tT(r, o, a, d) {
    do po();
    while (Ar !== null);
    if ((Me & 6) !== 0) throw Error(n(327));
    a = r.finishedWork;
    var p = r.finishedLanes;
    if (a === null) return null;
    if (((r.finishedWork = null), (r.finishedLanes = 0), a === r.current))
      throw Error(n(177));
    ((r.callbackNode = null), (r.callbackPriority = 0));
    var g = a.lanes | a.childLanes;
    if (
      (MC(r, g),
      r === pt && ((ot = pt = null), (wt = 0)),
      ((a.subtreeFlags & 2064) === 0 && (a.flags & 2064) === 0) ||
        Al ||
        ((Al = !0),
        qy(Ia, function () {
          return (po(), null);
        })),
      (g = (a.flags & 15990) !== 0),
      (a.subtreeFlags & 15990) !== 0 || g)
    ) {
      ((g = on.transition), (on.transition = null));
      var k = Fe;
      Fe = 1;
      var A = Me;
      ((Me |= 4),
        ($d.current = null),
        Gk(r, a),
        Oy(a, r),
        Sk(Ju),
        (Wa = !!Xu),
        (Ju = Xu = null),
        (r.current = a),
        Yk(a),
        TC(),
        (Me = A),
        (Fe = k),
        (on.transition = g));
    } else r.current = a;
    if (
      (Al && ((Al = !1), (Ar = r), (_l = p)),
      (g = r.pendingLanes),
      g === 0 && (Rr = null),
      AC(a.stateNode),
      Vt(r, et()),
      o !== null)
    )
      for (d = r.onRecoverableError, a = 0; a < o.length; a++)
        ((p = o[a]), d(p.value, { componentStack: p.stack, digest: p.digest }));
    if (Rl) throw ((Rl = !1), (r = qd), (qd = null), r);
    return (
      (_l & 1) !== 0 && r.tag !== 0 && po(),
      (g = r.pendingLanes),
      (g & 1) !== 0 ? (r === Kd ? Di++ : ((Di = 0), (Kd = r))) : (Di = 0),
      Cr(),
      null
    );
  }
  function po() {
    if (Ar !== null) {
      var r = _m(_l),
        o = on.transition,
        a = Fe;
      try {
        if (((on.transition = null), (Fe = 16 > r ? 16 : r), Ar === null))
          var d = !1;
        else {
          if (((r = Ar), (Ar = null), (_l = 0), (Me & 6) !== 0))
            throw Error(n(331));
          var p = Me;
          for (Me |= 4, oe = r.current; oe !== null; ) {
            var g = oe,
              k = g.child;
            if ((oe.flags & 16) !== 0) {
              var A = g.deletions;
              if (A !== null) {
                for (var N = 0; N < A.length; N++) {
                  var B = A[N];
                  for (oe = B; oe !== null; ) {
                    var K = oe;
                    switch (K.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ji(8, K, g);
                    }
                    var G = K.child;
                    if (G !== null) ((G.return = K), (oe = G));
                    else
                      for (; oe !== null; ) {
                        K = oe;
                        var q = K.sibling,
                          re = K.return;
                        if ((Py(K), K === B)) {
                          oe = null;
                          break;
                        }
                        if (q !== null) {
                          ((q.return = re), (oe = q));
                          break;
                        }
                        oe = re;
                      }
                  }
                }
                var ie = g.alternate;
                if (ie !== null) {
                  var ue = ie.child;
                  if (ue !== null) {
                    ie.child = null;
                    do {
                      var tt = ue.sibling;
                      ((ue.sibling = null), (ue = tt));
                    } while (ue !== null);
                  }
                }
                oe = g;
              }
            }
            if ((g.subtreeFlags & 2064) !== 0 && k !== null)
              ((k.return = g), (oe = k));
            else
              e: for (; oe !== null; ) {
                if (((g = oe), (g.flags & 2048) !== 0))
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ji(9, g, g.return);
                  }
                var I = g.sibling;
                if (I !== null) {
                  ((I.return = g.return), (oe = I));
                  break e;
                }
                oe = g.return;
              }
          }
          var j = r.current;
          for (oe = j; oe !== null; ) {
            k = oe;
            var F = k.child;
            if ((k.subtreeFlags & 2064) !== 0 && F !== null)
              ((F.return = k), (oe = F));
            else
              e: for (k = j; oe !== null; ) {
                if (((A = oe), (A.flags & 2048) !== 0))
                  try {
                    switch (A.tag) {
                      case 0:
                      case 11:
                      case 15:
                        kl(9, A);
                    }
                  } catch (he) {
                    Ye(A, A.return, he);
                  }
                if (A === k) {
                  oe = null;
                  break e;
                }
                var Y = A.sibling;
                if (Y !== null) {
                  ((Y.return = A.return), (oe = Y));
                  break e;
                }
                oe = A.return;
              }
          }
          if (
            ((Me = p),
            Cr(),
            _n && typeof _n.onPostCommitFiberRoot == "function")
          )
            try {
              _n.onPostCommitFiberRoot(Fa, r);
            } catch {}
          d = !0;
        }
        return d;
      } finally {
        ((Fe = a), (on.transition = o));
      }
    }
    return !1;
  }
  function $y(r, o, a) {
    ((o = co(a, o)),
      (o = ay(r, o, 1)),
      (r = Tr(r, o, 1)),
      (o = jt()),
      r !== null && (ii(r, 1, o), Vt(r, o)));
  }
  function Ye(r, o, a) {
    if (r.tag === 3) $y(r, r, a);
    else
      for (; o !== null; ) {
        if (o.tag === 3) {
          $y(o, r, a);
          break;
        } else if (o.tag === 1) {
          var d = o.stateNode;
          if (
            typeof o.type.getDerivedStateFromError == "function" ||
            (typeof d.componentDidCatch == "function" &&
              (Rr === null || !Rr.has(d)))
          ) {
            ((r = co(a, r)),
              (r = ly(o, r, 1)),
              (o = Tr(o, r, 1)),
              (r = jt()),
              o !== null && (ii(o, 1, r), Vt(o, r)));
            break;
          }
        }
        o = o.return;
      }
  }
  function nT(r, o, a) {
    var d = r.pingCache;
    (d !== null && d.delete(o),
      (o = jt()),
      (r.pingedLanes |= r.suspendedLanes & a),
      pt === r &&
        (wt & a) === a &&
        (ut === 4 || (ut === 3 && (wt & 130023424) === wt && 500 > et() - Hd)
          ? ps(r, 0)
          : (Wd |= a)),
      Vt(r, o));
  }
  function Wy(r, o) {
    o === 0 &&
      ((r.mode & 1) === 0
        ? (o = 1)
        : ((o = Ba), (Ba <<= 1), (Ba & 130023424) === 0 && (Ba = 4194304)));
    var a = jt();
    ((r = Jn(r, o)), r !== null && (ii(r, o, a), Vt(r, a)));
  }
  function rT(r) {
    var o = r.memoizedState,
      a = 0;
    (o !== null && (a = o.retryLane), Wy(r, a));
  }
  function sT(r, o) {
    var a = 0;
    switch (r.tag) {
      case 13:
        var d = r.stateNode,
          p = r.memoizedState;
        p !== null && (a = p.retryLane);
        break;
      case 19:
        d = r.stateNode;
        break;
      default:
        throw Error(n(314));
    }
    (d !== null && d.delete(o), Wy(r, a));
  }
  var Hy;
  Hy = function (r, o, a) {
    if (r !== null)
      if (r.memoizedProps !== o.pendingProps || Mt.current) It = !0;
      else {
        if ((r.lanes & a) === 0 && (o.flags & 128) === 0)
          return ((It = !1), Hk(r, o, a));
        It = (r.flags & 131072) !== 0;
      }
    else ((It = !1), He && (o.flags & 1048576) !== 0 && Cg(o, ll, o.index));
    switch (((o.lanes = 0), o.tag)) {
      case 2:
        var d = o.type;
        (El(r, o), (r = o.pendingProps));
        var p = to(o, Ct.current);
        (ao(o, a), (p = bd(null, o, d, r, p, a)));
        var g = Ed();
        return (
          (o.flags |= 1),
          typeof p == "object" &&
          p !== null &&
          typeof p.render == "function" &&
          p.$$typeof === void 0
            ? ((o.tag = 1),
              (o.memoizedState = null),
              (o.updateQueue = null),
              Dt(d) ? ((g = !0), ol(o)) : (g = !1),
              (o.memoizedState =
                p.state !== null && p.state !== void 0 ? p.state : null),
              md(o),
              (p.updater = Sl),
              (o.stateNode = p),
              (p._reactInternals = o),
              Ad(o, d, r, a),
              (o = jd(null, o, d, !0, g, a)))
            : ((o.tag = 0), He && g && od(o), Ot(null, o, p, a), (o = o.child)),
          o
        );
      case 16:
        d = o.elementType;
        e: {
          switch (
            (El(r, o),
            (r = o.pendingProps),
            (p = d._init),
            (d = p(d._payload)),
            (o.type = d),
            (p = o.tag = iT(d)),
            (r = yn(d, r)),
            p)
          ) {
            case 0:
              o = Od(null, o, d, r, a);
              break e;
            case 1:
              o = yy(null, o, d, r, a);
              break e;
            case 11:
              o = fy(null, o, d, r, a);
              break e;
            case 14:
              o = hy(null, o, d, yn(d.type, r), a);
              break e;
          }
          throw Error(n(306, d, ""));
        }
        return o;
      case 0:
        return (
          (d = o.type),
          (p = o.pendingProps),
          (p = o.elementType === d ? p : yn(d, p)),
          Od(r, o, d, p, a)
        );
      case 1:
        return (
          (d = o.type),
          (p = o.pendingProps),
          (p = o.elementType === d ? p : yn(d, p)),
          yy(r, o, d, p, a)
        );
      case 3:
        e: {
          if ((vy(o), r === null)) throw Error(n(387));
          ((d = o.pendingProps),
            (g = o.memoizedState),
            (p = g.element),
            jg(r, o),
            pl(o, d, null, a));
          var k = o.memoizedState;
          if (((d = k.element), g.isDehydrated))
            if (
              ((g = {
                element: d,
                isDehydrated: !1,
                cache: k.cache,
                pendingSuspenseBoundaries: k.pendingSuspenseBoundaries,
                transitions: k.transitions,
              }),
              (o.updateQueue.baseState = g),
              (o.memoizedState = g),
              o.flags & 256)
            ) {
              ((p = co(Error(n(423)), o)), (o = wy(r, o, d, a, p)));
              break e;
            } else if (d !== p) {
              ((p = co(Error(n(424)), o)), (o = wy(r, o, d, a, p)));
              break e;
            } else
              for (
                Qt = Sr(o.stateNode.containerInfo.firstChild),
                  Kt = o,
                  He = !0,
                  gn = null,
                  a = Ng(o, null, d, a),
                  o.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
          else {
            if ((so(), d === p)) {
              o = er(r, o, a);
              break e;
            }
            Ot(r, o, d, a);
          }
          o = o.child;
        }
        return o;
      case 5:
        return (
          Dg(o),
          r === null && ld(o),
          (d = o.type),
          (p = o.pendingProps),
          (g = r !== null ? r.memoizedProps : null),
          (k = p.children),
          Zu(d, p) ? (k = null) : g !== null && Zu(d, g) && (o.flags |= 32),
          gy(r, o),
          Ot(r, o, k, a),
          o.child
        );
      case 6:
        return (r === null && ld(o), null);
      case 13:
        return xy(r, o, a);
      case 4:
        return (
          gd(o, o.stateNode.containerInfo),
          (d = o.pendingProps),
          r === null ? (o.child = oo(o, null, d, a)) : Ot(r, o, d, a),
          o.child
        );
      case 11:
        return (
          (d = o.type),
          (p = o.pendingProps),
          (p = o.elementType === d ? p : yn(d, p)),
          fy(r, o, d, p, a)
        );
      case 7:
        return (Ot(r, o, o.pendingProps, a), o.child);
      case 8:
        return (Ot(r, o, o.pendingProps.children, a), o.child);
      case 12:
        return (Ot(r, o, o.pendingProps.children, a), o.child);
      case 10:
        e: {
          if (
            ((d = o.type._context),
            (p = o.pendingProps),
            (g = o.memoizedProps),
            (k = p.value),
            Be(dl, d._currentValue),
            (d._currentValue = k),
            g !== null)
          )
            if (mn(g.value, k)) {
              if (g.children === p.children && !Mt.current) {
                o = er(r, o, a);
                break e;
              }
            } else
              for (g = o.child, g !== null && (g.return = o); g !== null; ) {
                var A = g.dependencies;
                if (A !== null) {
                  k = g.child;
                  for (var N = A.firstContext; N !== null; ) {
                    if (N.context === d) {
                      if (g.tag === 1) {
                        ((N = Zn(-1, a & -a)), (N.tag = 2));
                        var B = g.updateQueue;
                        if (B !== null) {
                          B = B.shared;
                          var K = B.pending;
                          (K === null
                            ? (N.next = N)
                            : ((N.next = K.next), (K.next = N)),
                            (B.pending = N));
                        }
                      }
                      ((g.lanes |= a),
                        (N = g.alternate),
                        N !== null && (N.lanes |= a),
                        hd(g.return, a, o),
                        (A.lanes |= a));
                      break;
                    }
                    N = N.next;
                  }
                } else if (g.tag === 10) k = g.type === o.type ? null : g.child;
                else if (g.tag === 18) {
                  if (((k = g.return), k === null)) throw Error(n(341));
                  ((k.lanes |= a),
                    (A = k.alternate),
                    A !== null && (A.lanes |= a),
                    hd(k, a, o),
                    (k = g.sibling));
                } else k = g.child;
                if (k !== null) k.return = g;
                else
                  for (k = g; k !== null; ) {
                    if (k === o) {
                      k = null;
                      break;
                    }
                    if (((g = k.sibling), g !== null)) {
                      ((g.return = k.return), (k = g));
                      break;
                    }
                    k = k.return;
                  }
                g = k;
              }
          (Ot(r, o, p.children, a), (o = o.child));
        }
        return o;
      case 9:
        return (
          (p = o.type),
          (d = o.pendingProps.children),
          ao(o, a),
          (p = rn(p)),
          (d = d(p)),
          (o.flags |= 1),
          Ot(r, o, d, a),
          o.child
        );
      case 14:
        return (
          (d = o.type),
          (p = yn(d, o.pendingProps)),
          (p = yn(d.type, p)),
          hy(r, o, d, p, a)
        );
      case 15:
        return py(r, o, o.type, o.pendingProps, a);
      case 17:
        return (
          (d = o.type),
          (p = o.pendingProps),
          (p = o.elementType === d ? p : yn(d, p)),
          El(r, o),
          (o.tag = 1),
          Dt(d) ? ((r = !0), ol(o)) : (r = !1),
          ao(o, a),
          oy(o, d, p),
          Ad(o, d, p, a),
          jd(null, o, d, !0, r, a)
        );
      case 19:
        return by(r, o, a);
      case 22:
        return my(r, o, a);
    }
    throw Error(n(156, o.tag));
  };
  function qy(r, o) {
    return km(r, o);
  }
  function oT(r, o, a, d) {
    ((this.tag = r),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = o),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = d),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function an(r, o, a, d) {
    return new oT(r, o, a, d);
  }
  function Zd(r) {
    return ((r = r.prototype), !(!r || !r.isReactComponent));
  }
  function iT(r) {
    if (typeof r == "function") return Zd(r) ? 1 : 0;
    if (r != null) {
      if (((r = r.$$typeof), r === de)) return 11;
      if (r === Ee) return 14;
    }
    return 2;
  }
  function Or(r, o) {
    var a = r.alternate;
    return (
      a === null
        ? ((a = an(r.tag, o, r.key, r.mode)),
          (a.elementType = r.elementType),
          (a.type = r.type),
          (a.stateNode = r.stateNode),
          (a.alternate = r),
          (r.alternate = a))
        : ((a.pendingProps = o),
          (a.type = r.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = r.flags & 14680064),
      (a.childLanes = r.childLanes),
      (a.lanes = r.lanes),
      (a.child = r.child),
      (a.memoizedProps = r.memoizedProps),
      (a.memoizedState = r.memoizedState),
      (a.updateQueue = r.updateQueue),
      (o = r.dependencies),
      (a.dependencies =
        o === null ? null : { lanes: o.lanes, firstContext: o.firstContext }),
      (a.sibling = r.sibling),
      (a.index = r.index),
      (a.ref = r.ref),
      a
    );
  }
  function Ll(r, o, a, d, p, g) {
    var k = 2;
    if (((d = r), typeof r == "function")) Zd(r) && (k = 1);
    else if (typeof r == "string") k = 5;
    else
      e: switch (r) {
        case U:
          return gs(a.children, p, g, o);
        case D:
          ((k = 8), (p |= 8));
          break;
        case Q:
          return (
            (r = an(12, a, o, p | 2)),
            (r.elementType = Q),
            (r.lanes = g),
            r
          );
        case ge:
          return (
            (r = an(13, a, o, p)),
            (r.elementType = ge),
            (r.lanes = g),
            r
          );
        case le:
          return (
            (r = an(19, a, o, p)),
            (r.elementType = le),
            (r.lanes = g),
            r
          );
        case Z:
          return Ml(a, p, g, o);
        default:
          if (typeof r == "object" && r !== null)
            switch (r.$$typeof) {
              case J:
                k = 10;
                break e;
              case ee:
                k = 9;
                break e;
              case de:
                k = 11;
                break e;
              case Ee:
                k = 14;
                break e;
              case te:
                ((k = 16), (d = null));
                break e;
            }
          throw Error(n(130, r == null ? r : typeof r, ""));
      }
    return (
      (o = an(k, a, o, p)),
      (o.elementType = r),
      (o.type = d),
      (o.lanes = g),
      o
    );
  }
  function gs(r, o, a, d) {
    return ((r = an(7, r, d, o)), (r.lanes = a), r);
  }
  function Ml(r, o, a, d) {
    return (
      (r = an(22, r, d, o)),
      (r.elementType = Z),
      (r.lanes = a),
      (r.stateNode = { isHidden: !1 }),
      r
    );
  }
  function ef(r, o, a) {
    return ((r = an(6, r, null, o)), (r.lanes = a), r);
  }
  function tf(r, o, a) {
    return (
      (o = an(4, r.children !== null ? r.children : [], r.key, o)),
      (o.lanes = a),
      (o.stateNode = {
        containerInfo: r.containerInfo,
        pendingChildren: null,
        implementation: r.implementation,
      }),
      o
    );
  }
  function aT(r, o, a, d, p) {
    ((this.tag = o),
      (this.containerInfo = r),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = Ru(0)),
      (this.expirationTimes = Ru(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Ru(0)),
      (this.identifierPrefix = d),
      (this.onRecoverableError = p),
      (this.mutableSourceEagerHydrationData = null));
  }
  function nf(r, o, a, d, p, g, k, A, N) {
    return (
      (r = new aT(r, o, a, A, N)),
      o === 1 ? ((o = 1), g === !0 && (o |= 8)) : (o = 0),
      (g = an(3, null, null, o)),
      (r.current = g),
      (g.stateNode = r),
      (g.memoizedState = {
        element: d,
        isDehydrated: a,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      md(g),
      r
    );
  }
  function lT(r, o, a) {
    var d =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: V,
      key: d == null ? null : "" + d,
      children: r,
      containerInfo: o,
      implementation: a,
    };
  }
  function Ky(r) {
    if (!r) return Er;
    r = r._reactInternals;
    e: {
      if (ss(r) !== r || r.tag !== 1) throw Error(n(170));
      var o = r;
      do {
        switch (o.tag) {
          case 3:
            o = o.stateNode.context;
            break e;
          case 1:
            if (Dt(o.type)) {
              o = o.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        o = o.return;
      } while (o !== null);
      throw Error(n(171));
    }
    if (r.tag === 1) {
      var a = r.type;
      if (Dt(a)) return Sg(r, a, o);
    }
    return o;
  }
  function Qy(r, o, a, d, p, g, k, A, N) {
    return (
      (r = nf(a, d, !0, r, p, g, k, A, N)),
      (r.context = Ky(null)),
      (a = r.current),
      (d = jt()),
      (p = _r(a)),
      (g = Zn(d, p)),
      (g.callback = o ?? null),
      Tr(a, g, p),
      (r.current.lanes = p),
      ii(r, p, d),
      Vt(r, d),
      r
    );
  }
  function Dl(r, o, a, d) {
    var p = o.current,
      g = jt(),
      k = _r(p);
    return (
      (a = Ky(a)),
      o.context === null ? (o.context = a) : (o.pendingContext = a),
      (o = Zn(g, k)),
      (o.payload = { element: r }),
      (d = d === void 0 ? null : d),
      d !== null && (o.callback = d),
      (r = Tr(p, o, k)),
      r !== null && (xn(r, p, k, g), hl(r, p, k)),
      k
    );
  }
  function Il(r) {
    if (((r = r.current), !r.child)) return null;
    switch (r.child.tag) {
      case 5:
        return r.child.stateNode;
      default:
        return r.child.stateNode;
    }
  }
  function Gy(r, o) {
    if (((r = r.memoizedState), r !== null && r.dehydrated !== null)) {
      var a = r.retryLane;
      r.retryLane = a !== 0 && a < o ? a : o;
    }
  }
  function rf(r, o) {
    (Gy(r, o), (r = r.alternate) && Gy(r, o));
  }
  function cT() {
    return null;
  }
  var Yy =
    typeof reportError == "function"
      ? reportError
      : function (r) {
          console.error(r);
        };
  function sf(r) {
    this._internalRoot = r;
  }
  ((Fl.prototype.render = sf.prototype.render =
    function (r) {
      var o = this._internalRoot;
      if (o === null) throw Error(n(409));
      Dl(r, o, null, null);
    }),
    (Fl.prototype.unmount = sf.prototype.unmount =
      function () {
        var r = this._internalRoot;
        if (r !== null) {
          this._internalRoot = null;
          var o = r.containerInfo;
          (hs(function () {
            Dl(null, r, null, null);
          }),
            (o[Qn] = null));
        }
      }));
  function Fl(r) {
    this._internalRoot = r;
  }
  Fl.prototype.unstable_scheduleHydration = function (r) {
    if (r) {
      var o = jm();
      r = { blockedOn: null, target: r, priority: o };
      for (var a = 0; a < vr.length && o !== 0 && o < vr[a].priority; a++);
      (vr.splice(a, 0, r), a === 0 && Dm(r));
    }
  };
  function of(r) {
    return !(!r || (r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11));
  }
  function Vl(r) {
    return !(
      !r ||
      (r.nodeType !== 1 &&
        r.nodeType !== 9 &&
        r.nodeType !== 11 &&
        (r.nodeType !== 8 || r.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function Xy() {}
  function uT(r, o, a, d, p) {
    if (p) {
      if (typeof d == "function") {
        var g = d;
        d = function () {
          var B = Il(k);
          g.call(B);
        };
      }
      var k = Qy(o, d, r, 0, null, !1, !1, "", Xy);
      return (
        (r._reactRootContainer = k),
        (r[Qn] = k.current),
        xi(r.nodeType === 8 ? r.parentNode : r),
        hs(),
        k
      );
    }
    for (; (p = r.lastChild); ) r.removeChild(p);
    if (typeof d == "function") {
      var A = d;
      d = function () {
        var B = Il(N);
        A.call(B);
      };
    }
    var N = nf(r, 0, !1, null, null, !1, !1, "", Xy);
    return (
      (r._reactRootContainer = N),
      (r[Qn] = N.current),
      xi(r.nodeType === 8 ? r.parentNode : r),
      hs(function () {
        Dl(o, N, a, d);
      }),
      N
    );
  }
  function Bl(r, o, a, d, p) {
    var g = a._reactRootContainer;
    if (g) {
      var k = g;
      if (typeof p == "function") {
        var A = p;
        p = function () {
          var N = Il(k);
          A.call(N);
        };
      }
      Dl(o, k, r, p);
    } else k = uT(a, o, r, p, d);
    return Il(k);
  }
  ((Nm = function (r) {
    switch (r.tag) {
      case 3:
        var o = r.stateNode;
        if (o.current.memoizedState.isDehydrated) {
          var a = oi(o.pendingLanes);
          a !== 0 &&
            (Au(o, a | 1),
            Vt(o, et()),
            (Me & 6) === 0 && ((ho = et() + 500), Cr()));
        }
        break;
      case 13:
        (hs(function () {
          var d = Jn(r, 1);
          if (d !== null) {
            var p = jt();
            xn(d, r, 1, p);
          }
        }),
          rf(r, 1));
    }
  }),
    (_u = function (r) {
      if (r.tag === 13) {
        var o = Jn(r, 134217728);
        if (o !== null) {
          var a = jt();
          xn(o, r, 134217728, a);
        }
        rf(r, 134217728);
      }
    }),
    (Om = function (r) {
      if (r.tag === 13) {
        var o = _r(r),
          a = Jn(r, o);
        if (a !== null) {
          var d = jt();
          xn(a, r, o, d);
        }
        rf(r, o);
      }
    }),
    (jm = function () {
      return Fe;
    }),
    (Lm = function (r, o) {
      var a = Fe;
      try {
        return ((Fe = r), o());
      } finally {
        Fe = a;
      }
    }),
    (bu = function (r, o, a) {
      switch (o) {
        case "input":
          if ((Kn(r, a), (o = a.name), a.type === "radio" && o != null)) {
            for (a = r; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                "input[name=" + JSON.stringify("" + o) + '][type="radio"]',
              ),
                o = 0;
              o < a.length;
              o++
            ) {
              var d = a[o];
              if (d !== r && d.form === r.form) {
                var p = rl(d);
                if (!p) throw Error(n(90));
                (Ne(d), Kn(d, p));
              }
            }
          }
          break;
        case "textarea":
          cm(r, a);
          break;
        case "select":
          ((o = a.value), o != null && $s(r, !!a.multiple, o, !1));
      }
    }),
    (vm = Yd),
    (wm = hs));
  var dT = { usingClientEntryPoint: !1, Events: [Ei, Zs, rl, gm, ym, Yd] },
    Ii = {
      findFiberByHostInstance: os,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    fT = {
      bundleType: Ii.bundleType,
      version: Ii.version,
      rendererPackageName: Ii.rendererPackageName,
      rendererConfig: Ii.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: _.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (r) {
        return ((r = Em(r)), r === null ? null : r.stateNode);
      },
      findFiberByHostInstance: Ii.findFiberByHostInstance || cT,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ul = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ul.isDisabled && Ul.supportsFiber)
      try {
        ((Fa = Ul.inject(fT)), (_n = Ul));
      } catch {}
  }
  return (
    (Bt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = dT),
    (Bt.createPortal = function (r, o) {
      var a =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!of(o)) throw Error(n(200));
      return lT(r, o, null, a);
    }),
    (Bt.createRoot = function (r, o) {
      if (!of(r)) throw Error(n(299));
      var a = !1,
        d = "",
        p = Yy;
      return (
        o != null &&
          (o.unstable_strictMode === !0 && (a = !0),
          o.identifierPrefix !== void 0 && (d = o.identifierPrefix),
          o.onRecoverableError !== void 0 && (p = o.onRecoverableError)),
        (o = nf(r, 1, !1, null, null, a, !1, d, p)),
        (r[Qn] = o.current),
        xi(r.nodeType === 8 ? r.parentNode : r),
        new sf(o)
      );
    }),
    (Bt.findDOMNode = function (r) {
      if (r == null) return null;
      if (r.nodeType === 1) return r;
      var o = r._reactInternals;
      if (o === void 0)
        throw typeof r.render == "function"
          ? Error(n(188))
          : ((r = Object.keys(r).join(",")), Error(n(268, r)));
      return ((r = Em(o)), (r = r === null ? null : r.stateNode), r);
    }),
    (Bt.flushSync = function (r) {
      return hs(r);
    }),
    (Bt.hydrate = function (r, o, a) {
      if (!Vl(o)) throw Error(n(200));
      return Bl(null, r, o, !0, a);
    }),
    (Bt.hydrateRoot = function (r, o, a) {
      if (!of(r)) throw Error(n(405));
      var d = (a != null && a.hydratedSources) || null,
        p = !1,
        g = "",
        k = Yy;
      if (
        (a != null &&
          (a.unstable_strictMode === !0 && (p = !0),
          a.identifierPrefix !== void 0 && (g = a.identifierPrefix),
          a.onRecoverableError !== void 0 && (k = a.onRecoverableError)),
        (o = Qy(o, null, r, 1, a ?? null, p, !1, g, k)),
        (r[Qn] = o.current),
        xi(r),
        d)
      )
        for (r = 0; r < d.length; r++)
          ((a = d[r]),
            (p = a._getVersion),
            (p = p(a._source)),
            o.mutableSourceEagerHydrationData == null
              ? (o.mutableSourceEagerHydrationData = [a, p])
              : o.mutableSourceEagerHydrationData.push(a, p));
      return new Fl(o);
    }),
    (Bt.render = function (r, o, a) {
      if (!Vl(o)) throw Error(n(200));
      return Bl(null, r, o, !1, a);
    }),
    (Bt.unmountComponentAtNode = function (r) {
      if (!Vl(r)) throw Error(n(40));
      return r._reactRootContainer
        ? (hs(function () {
            Bl(null, null, r, !1, function () {
              ((r._reactRootContainer = null), (r[Qn] = null));
            });
          }),
          !0)
        : !1;
    }),
    (Bt.unstable_batchedUpdates = Yd),
    (Bt.unstable_renderSubtreeIntoContainer = function (r, o, a, d) {
      if (!Vl(a)) throw Error(n(200));
      if (r == null || r._reactInternals === void 0) throw Error(n(38));
      return Bl(r, o, a, !1, d);
    }),
    (Bt.version = "18.3.1-next-f1338f8080-20240426"),
    Bt
  );
}
var iv;
function px() {
  if (iv) return uf.exports;
  iv = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return (e(), (uf.exports = xT()), uf.exports);
}
var av;
function ST() {
  if (av) return $l;
  av = 1;
  var e = px();
  return (($l.createRoot = e.createRoot), ($l.hydrateRoot = e.hydrateRoot), $l);
}
var bT = ST();
const ET = Gh(bT),
  CT = 20,
  kT = 1e6,
  ir = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST",
  };
let hf = 0;
function TT() {
  return ((hf = (hf + 1) % Number.MAX_VALUE), hf.toString());
}
const pf = new Map(),
  lv = (e) => {
    if (pf.has(e)) return;
    const t = setTimeout(() => {
      (pf.delete(e), Ji({ type: ir.REMOVE_TOAST, toastId: e }));
    }, kT);
    pf.set(e, t);
  },
  PT = (e, t) => {
    switch (t.type) {
      case ir.ADD_TOAST:
        return { ...e, toasts: [t.toast, ...e.toasts].slice(0, CT) };
      case ir.UPDATE_TOAST:
        return {
          ...e,
          toasts: e.toasts.map((n) =>
            n.id === t.toast.id ? { ...n, ...t.toast } : n,
          ),
        };
      case ir.DISMISS_TOAST: {
        const { toastId: n } = t;
        return (
          n
            ? lv(n)
            : e.toasts.forEach((s) => {
                lv(s.id);
              }),
          {
            ...e,
            toasts: e.toasts.map((s) =>
              s.id === n || n === void 0 ? { ...s, open: !1 } : s,
            ),
          }
        );
      }
      case ir.REMOVE_TOAST:
        return t.toastId === void 0
          ? { ...e, toasts: [] }
          : { ...e, toasts: e.toasts.filter((n) => n.id !== t.toastId) };
    }
  },
  ic = [];
let ac = { toasts: [] };
function Ji(e) {
  ((ac = PT(ac, e)),
    ic.forEach((t) => {
      t(ac);
    }));
}
function RT({ ...e }) {
  const t = TT(),
    n = (i) => Ji({ type: ir.UPDATE_TOAST, toast: { ...i, id: t } }),
    s = () => Ji({ type: ir.DISMISS_TOAST, toastId: t });
  return (
    Ji({
      type: ir.ADD_TOAST,
      toast: {
        ...e,
        id: t,
        open: !0,
        onOpenChange: (i) => {
          i || s();
        },
      },
    }),
    { id: t, dismiss: s, update: n }
  );
}
function AT() {
  const [e, t] = b.useState(ac);
  return (
    b.useEffect(
      () => (
        ic.push(t),
        () => {
          const n = ic.indexOf(t);
          n > -1 && ic.splice(n, 1);
        }
      ),
      [e],
    ),
    {
      ...e,
      toast: RT,
      dismiss: (n) => Ji({ type: ir.DISMISS_TOAST, toastId: n }),
    }
  );
}
function mx(e) {
  var t,
    n,
    s = "";
  if (typeof e == "string" || typeof e == "number") s += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var i = e.length;
      for (t = 0; t < i; t++)
        e[t] && (n = mx(e[t])) && (s && (s += " "), (s += n));
    } else for (n in e) e[n] && (s && (s += " "), (s += n));
  return s;
}
function gx() {
  for (var e, t, n = 0, s = "", i = arguments.length; n < i; n++)
    (e = arguments[n]) && (t = mx(e)) && (s && (s += " "), (s += t));
  return s;
}
const cv = (e) => (typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e),
  uv = gx,
  yx = (e, t) => (n) => {
    var s;
    if ((t == null ? void 0 : t.variants) == null)
      return uv(
        e,
        n == null ? void 0 : n.class,
        n == null ? void 0 : n.className,
      );
    const { variants: i, defaultVariants: l } = t,
      c = Object.keys(i).map((h) => {
        const m = n == null ? void 0 : n[h],
          y = l == null ? void 0 : l[h];
        if (m === null) return null;
        const w = cv(m) || cv(y);
        return i[h][w];
      }),
      u =
        n &&
        Object.entries(n).reduce((h, m) => {
          let [y, w] = m;
          return (w === void 0 || (h[y] = w), h);
        }, {}),
      f =
        t == null || (s = t.compoundVariants) === null || s === void 0
          ? void 0
          : s.reduce((h, m) => {
              let { class: y, className: w, ...C } = m;
              return Object.entries(C).every((E) => {
                let [v, x] = E;
                return Array.isArray(x)
                  ? x.includes({ ...l, ...u }[v])
                  : { ...l, ...u }[v] === x;
              })
                ? [...h, y, w]
                : h;
            }, []);
    return uv(
      e,
      c,
      f,
      n == null ? void 0 : n.class,
      n == null ? void 0 : n.className,
    );
  };
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _T = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  vx = (...e) =>
    e
      .filter((t, n, s) => !!t && t.trim() !== "" && s.indexOf(t) === n)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var NT = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const OT = b.forwardRef(
  (
    {
      color: e = "currentColor",
      size: t = 24,
      strokeWidth: n = 2,
      absoluteStrokeWidth: s,
      className: i = "",
      children: l,
      iconNode: c,
      ...u
    },
    f,
  ) =>
    b.createElement(
      "svg",
      {
        ref: f,
        ...NT,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: s ? (Number(n) * 24) / Number(t) : n,
        className: vx("lucide", i),
        ...u,
      },
      [
        ...c.map(([h, m]) => b.createElement(h, m)),
        ...(Array.isArray(l) ? l : [l]),
      ],
    ),
);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const yt = (e, t) => {
  const n = b.forwardRef(({ className: s, ...i }, l) =>
    b.createElement(OT, {
      ref: l,
      iconNode: t,
      className: vx(`lucide-${_T(e)}`, s),
      ...i,
    }),
  );
  return ((n.displayName = `${e}`), n);
};
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const jT = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
  ],
  wx = yt("ArrowRight", jT);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const LT = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]],
  MT = yt("Check", LT);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const DT = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]],
  Xh = yt("ChevronDown", DT);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const IT = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]],
  FT = yt("ChevronUp", IT);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const VT = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
  ],
  BT = yt("CircleCheckBig", VT);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const UT = [
    [
      "rect",
      {
        width: "8",
        height: "4",
        x: "8",
        y: "2",
        rx: "1",
        ry: "1",
        key: "tgr4d6",
      },
    ],
    [
      "path",
      {
        d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
        key: "116196",
      },
    ],
    ["path", { d: "m9 14 2 2 4-4", key: "df797q" }],
  ],
  zT = yt("ClipboardCheck", UT);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $T = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }],
  ],
  WT = yt("Clock", $T);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const HT = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  qT = yt("LoaderCircle", HT);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const KT = [
    [
      "rect",
      { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" },
    ],
    ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ],
  xx = yt("Mail", KT);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const QT = [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
        key: "1r0f0z",
      },
    ],
    ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ],
  GT = yt("MapPin", QT);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const YT = [
    ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
    ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
    ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }],
  ],
  XT = yt("Menu", YT);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const JT = [
    [
      "path",
      {
        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
        key: "foiqr5",
      },
    ],
    ["path", { d: "M14.05 2a9 9 0 0 1 8 7.94", key: "vmijpz" }],
    ["path", { d: "M14.05 6A5 5 0 0 1 18 10", key: "13nbpp" }],
  ],
  ZT = yt("PhoneCall", JT);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const eP = [
    [
      "path",
      {
        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
        key: "foiqr5",
      },
    ],
  ],
  bc = yt("Phone", eP);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const tP = [
    [
      "path",
      {
        d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
        key: "rib7q0",
      },
    ],
    [
      "path",
      {
        d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
        key: "1ymkrd",
      },
    ],
  ],
  nP = yt("Quote", tP);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const rP = [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3",
      },
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }],
  ],
  sP = yt("Send", rP);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const oP = [
    [
      "path",
      {
        d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
        key: "4pj2yx",
      },
    ],
    ["path", { d: "M20 3v4", key: "1olli1" }],
    ["path", { d: "M22 5h-4", key: "1gvqau" }],
    ["path", { d: "M4 17v2", key: "vumght" }],
    ["path", { d: "M5 18H3", key: "zchphs" }],
  ],
  iP = yt("Sparkles", oP);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const aP = [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s",
      },
    ],
  ],
  Sx = yt("Star", aP);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const lP = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  bx = yt("X", lP),
  cP = (e, t) => {
    const n = new Array(e.length + t.length);
    for (let s = 0; s < e.length; s++) n[s] = e[s];
    for (let s = 0; s < t.length; s++) n[e.length + s] = t[s];
    return n;
  },
  uP = (e, t) => ({ classGroupId: e, validator: t }),
  Ex = (e = new Map(), t = null, n) => ({
    nextPart: e,
    validators: t,
    classGroupId: n,
  }),
  Ec = "-",
  dv = [],
  dP = "arbitrary..",
  fP = (e) => {
    const t = pP(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: s } = e;
    return {
      getClassGroupId: (c) => {
        if (c.startsWith("[") && c.endsWith("]")) return hP(c);
        const u = c.split(Ec),
          f = u[0] === "" && u.length > 1 ? 1 : 0;
        return Cx(u, f, t);
      },
      getConflictingClassGroupIds: (c, u) => {
        if (u) {
          const f = s[c],
            h = n[c];
          return f ? (h ? cP(h, f) : f) : h || dv;
        }
        return n[c] || dv;
      },
    };
  },
  Cx = (e, t, n) => {
    if (e.length - t === 0) return n.classGroupId;
    const i = e[t],
      l = n.nextPart.get(i);
    if (l) {
      const h = Cx(e, t + 1, l);
      if (h) return h;
    }
    const c = n.validators;
    if (c === null) return;
    const u = t === 0 ? e.join(Ec) : e.slice(t).join(Ec),
      f = c.length;
    for (let h = 0; h < f; h++) {
      const m = c[h];
      if (m.validator(u)) return m.classGroupId;
    }
  },
  hP = (e) =>
    e.slice(1, -1).indexOf(":") === -1
      ? void 0
      : (() => {
          const t = e.slice(1, -1),
            n = t.indexOf(":"),
            s = t.slice(0, n);
          return s ? dP + s : void 0;
        })(),
  pP = (e) => {
    const { theme: t, classGroups: n } = e;
    return mP(n, t);
  },
  mP = (e, t) => {
    const n = Ex();
    for (const s in e) {
      const i = e[s];
      Jh(i, n, s, t);
    }
    return n;
  },
  Jh = (e, t, n, s) => {
    const i = e.length;
    for (let l = 0; l < i; l++) {
      const c = e[l];
      gP(c, t, n, s);
    }
  },
  gP = (e, t, n, s) => {
    if (typeof e == "string") {
      yP(e, t, n);
      return;
    }
    if (typeof e == "function") {
      vP(e, t, n, s);
      return;
    }
    wP(e, t, n, s);
  },
  yP = (e, t, n) => {
    const s = e === "" ? t : kx(t, e);
    s.classGroupId = n;
  },
  vP = (e, t, n, s) => {
    if (xP(e)) {
      Jh(e(s), t, n, s);
      return;
    }
    (t.validators === null && (t.validators = []), t.validators.push(uP(n, e)));
  },
  wP = (e, t, n, s) => {
    const i = Object.entries(e),
      l = i.length;
    for (let c = 0; c < l; c++) {
      const [u, f] = i[c];
      Jh(f, kx(t, u), n, s);
    }
  },
  kx = (e, t) => {
    let n = e;
    const s = t.split(Ec),
      i = s.length;
    for (let l = 0; l < i; l++) {
      const c = s[l];
      let u = n.nextPart.get(c);
      (u || ((u = Ex()), n.nextPart.set(c, u)), (n = u));
    }
    return n;
  },
  xP = (e) => "isThemeGetter" in e && e.isThemeGetter === !0,
  SP = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0,
      n = Object.create(null),
      s = Object.create(null);
    const i = (l, c) => {
      ((n[l] = c), t++, t > e && ((t = 0), (s = n), (n = Object.create(null))));
    };
    return {
      get(l) {
        let c = n[l];
        if (c !== void 0) return c;
        if ((c = s[l]) !== void 0) return (i(l, c), c);
      },
      set(l, c) {
        l in n ? (n[l] = c) : i(l, c);
      },
    };
  },
  Kf = "!",
  fv = ":",
  bP = [],
  hv = (e, t, n, s, i) => ({
    modifiers: e,
    hasImportantModifier: t,
    baseClassName: n,
    maybePostfixModifierPosition: s,
    isExternal: i,
  }),
  EP = (e) => {
    const { prefix: t, experimentalParseClassName: n } = e;
    let s = (i) => {
      const l = [];
      let c = 0,
        u = 0,
        f = 0,
        h;
      const m = i.length;
      for (let v = 0; v < m; v++) {
        const x = i[v];
        if (c === 0 && u === 0) {
          if (x === fv) {
            (l.push(i.slice(f, v)), (f = v + 1));
            continue;
          }
          if (x === "/") {
            h = v;
            continue;
          }
        }
        x === "[" ? c++ : x === "]" ? c-- : x === "(" ? u++ : x === ")" && u--;
      }
      const y = l.length === 0 ? i : i.slice(f);
      let w = y,
        C = !1;
      y.endsWith(Kf)
        ? ((w = y.slice(0, -1)), (C = !0))
        : y.startsWith(Kf) && ((w = y.slice(1)), (C = !0));
      const E = h && h > f ? h - f : void 0;
      return hv(l, C, w, E);
    };
    if (t) {
      const i = t + fv,
        l = s;
      s = (c) =>
        c.startsWith(i) ? l(c.slice(i.length)) : hv(bP, !1, c, void 0, !0);
    }
    if (n) {
      const i = s;
      s = (l) => n({ className: l, parseClassName: i });
    }
    return s;
  },
  CP = (e) => {
    const t = new Map();
    return (
      e.orderSensitiveModifiers.forEach((n, s) => {
        t.set(n, 1e6 + s);
      }),
      (n) => {
        const s = [];
        let i = [];
        for (let l = 0; l < n.length; l++) {
          const c = n[l],
            u = c[0] === "[",
            f = t.has(c);
          u || f
            ? (i.length > 0 && (i.sort(), s.push(...i), (i = [])), s.push(c))
            : i.push(c);
        }
        return (i.length > 0 && (i.sort(), s.push(...i)), s);
      }
    );
  },
  kP = (e) => ({
    cache: SP(e.cacheSize),
    parseClassName: EP(e),
    sortModifiers: CP(e),
    ...fP(e),
  }),
  TP = /\s+/,
  PP = (e, t) => {
    const {
        parseClassName: n,
        getClassGroupId: s,
        getConflictingClassGroupIds: i,
        sortModifiers: l,
      } = t,
      c = [],
      u = e.trim().split(TP);
    let f = "";
    for (let h = u.length - 1; h >= 0; h -= 1) {
      const m = u[h],
        {
          isExternal: y,
          modifiers: w,
          hasImportantModifier: C,
          baseClassName: E,
          maybePostfixModifierPosition: v,
        } = n(m);
      if (y) {
        f = m + (f.length > 0 ? " " + f : f);
        continue;
      }
      let x = !!v,
        T = s(x ? E.substring(0, v) : E);
      if (!T) {
        if (!x) {
          f = m + (f.length > 0 ? " " + f : f);
          continue;
        }
        if (((T = s(E)), !T)) {
          f = m + (f.length > 0 ? " " + f : f);
          continue;
        }
        x = !1;
      }
      const P = w.length === 0 ? "" : w.length === 1 ? w[0] : l(w).join(":"),
        R = C ? P + Kf : P,
        _ = R + T;
      if (c.indexOf(_) > -1) continue;
      c.push(_);
      const M = i(T, x);
      for (let V = 0; V < M.length; ++V) {
        const U = M[V];
        c.push(R + U);
      }
      f = m + (f.length > 0 ? " " + f : f);
    }
    return f;
  },
  RP = (...e) => {
    let t = 0,
      n,
      s,
      i = "";
    for (; t < e.length; )
      (n = e[t++]) && (s = Tx(n)) && (i && (i += " "), (i += s));
    return i;
  },
  Tx = (e) => {
    if (typeof e == "string") return e;
    let t,
      n = "";
    for (let s = 0; s < e.length; s++)
      e[s] && (t = Tx(e[s])) && (n && (n += " "), (n += t));
    return n;
  },
  AP = (e, ...t) => {
    let n, s, i, l;
    const c = (f) => {
        const h = t.reduce((m, y) => y(m), e());
        return (
          (n = kP(h)),
          (s = n.cache.get),
          (i = n.cache.set),
          (l = u),
          u(f)
        );
      },
      u = (f) => {
        const h = s(f);
        if (h) return h;
        const m = PP(f, n);
        return (i(f, m), m);
      };
    return ((l = c), (...f) => l(RP(...f)));
  },
  _P = [],
  dt = (e) => {
    const t = (n) => n[e] || _P;
    return ((t.isThemeGetter = !0), t);
  },
  Px = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Rx = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  NP = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
  OP = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  jP =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  LP = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  MP = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  DP =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Lr = (e) => NP.test(e),
  Re = (e) => !!e && !Number.isNaN(Number(e)),
  Mr = (e) => !!e && Number.isInteger(Number(e)),
  mf = (e) => e.endsWith("%") && Re(e.slice(0, -1)),
  nr = (e) => OP.test(e),
  Ax = () => !0,
  IP = (e) => jP.test(e) && !LP.test(e),
  Zh = () => !1,
  FP = (e) => MP.test(e),
  VP = (e) => DP.test(e),
  BP = (e) => !ae(e) && !ce(e),
  UP = (e) => es(e, Ox, Zh),
  ae = (e) => Px.test(e),
  ys = (e) => es(e, jx, IP),
  pv = (e) => es(e, GP, Re),
  zP = (e) => es(e, Mx, Ax),
  $P = (e) => es(e, Lx, Zh),
  mv = (e) => es(e, _x, Zh),
  WP = (e) => es(e, Nx, VP),
  Wl = (e) => es(e, Dx, FP),
  ce = (e) => Rx.test(e),
  Vi = (e) => Us(e, jx),
  HP = (e) => Us(e, Lx),
  gv = (e) => Us(e, _x),
  qP = (e) => Us(e, Ox),
  KP = (e) => Us(e, Nx),
  Hl = (e) => Us(e, Dx, !0),
  QP = (e) => Us(e, Mx, !0),
  es = (e, t, n) => {
    const s = Px.exec(e);
    return s ? (s[1] ? t(s[1]) : n(s[2])) : !1;
  },
  Us = (e, t, n = !1) => {
    const s = Rx.exec(e);
    return s ? (s[1] ? t(s[1]) : n) : !1;
  },
  _x = (e) => e === "position" || e === "percentage",
  Nx = (e) => e === "image" || e === "url",
  Ox = (e) => e === "length" || e === "size" || e === "bg-size",
  jx = (e) => e === "length",
  GP = (e) => e === "number",
  Lx = (e) => e === "family-name",
  Mx = (e) => e === "number" || e === "weight",
  Dx = (e) => e === "shadow",
  YP = () => {
    const e = dt("color"),
      t = dt("font"),
      n = dt("text"),
      s = dt("font-weight"),
      i = dt("tracking"),
      l = dt("leading"),
      c = dt("breakpoint"),
      u = dt("container"),
      f = dt("spacing"),
      h = dt("radius"),
      m = dt("shadow"),
      y = dt("inset-shadow"),
      w = dt("text-shadow"),
      C = dt("drop-shadow"),
      E = dt("blur"),
      v = dt("perspective"),
      x = dt("aspect"),
      T = dt("ease"),
      P = dt("animate"),
      R = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      _ = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      M = () => [..._(), ce, ae],
      V = () => ["auto", "hidden", "clip", "visible", "scroll"],
      U = () => ["auto", "contain", "none"],
      D = () => [ce, ae, f],
      Q = () => [Lr, "full", "auto", ...D()],
      J = () => [Mr, "none", "subgrid", ce, ae],
      ee = () => ["auto", { span: ["full", Mr, ce, ae] }, Mr, ce, ae],
      de = () => [Mr, "auto", ce, ae],
      ge = () => ["auto", "min", "max", "fr", ce, ae],
      le = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      Ee = () => [
        "start",
        "end",
        "center",
        "stretch",
        "center-safe",
        "end-safe",
      ],
      te = () => ["auto", ...D()],
      Z = () => [
        Lr,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...D(),
      ],
      $ = () => [
        Lr,
        "screen",
        "full",
        "dvw",
        "lvw",
        "svw",
        "min",
        "max",
        "fit",
        ...D(),
      ],
      X = () => [
        Lr,
        "screen",
        "full",
        "lh",
        "dvh",
        "lvh",
        "svh",
        "min",
        "max",
        "fit",
        ...D(),
      ],
      W = () => [e, ce, ae],
      L = () => [..._(), gv, mv, { position: [ce, ae] }],
      H = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      we = () => ["auto", "cover", "contain", qP, UP, { size: [ce, ae] }],
      ve = () => [mf, Vi, ys],
      pe = () => ["", "none", "full", h, ce, ae],
      ye = () => ["", Re, Vi, ys],
      ne = () => ["solid", "dashed", "dotted", "double"],
      me = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      fe = () => [Re, mf, gv, mv],
      Pe = () => ["", "none", E, ce, ae],
      Ae = () => ["none", Re, ce, ae],
      Ne = () => ["none", Re, ce, ae],
      Ge = () => [Re, ce, ae],
      lt = () => [Lr, "full", ...D()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [nr],
        breakpoint: [nr],
        color: [Ax],
        container: [nr],
        "drop-shadow": [nr],
        ease: ["in", "out", "in-out"],
        font: [BP],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [nr],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [nr],
        shadow: [nr],
        spacing: ["px", Re],
        text: [nr],
        "text-shadow": [nr],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", Lr, ae, ce, x] }],
        container: ["container"],
        columns: [{ columns: [Re, ae, ce, u] }],
        "break-after": [{ "break-after": R() }],
        "break-before": [{ "break-before": R() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: M() }],
        overflow: [{ overflow: V() }],
        "overflow-x": [{ "overflow-x": V() }],
        "overflow-y": [{ "overflow-y": V() }],
        overscroll: [{ overscroll: U() }],
        "overscroll-x": [{ "overscroll-x": U() }],
        "overscroll-y": [{ "overscroll-y": U() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: Q() }],
        "inset-x": [{ "inset-x": Q() }],
        "inset-y": [{ "inset-y": Q() }],
        start: [{ "inset-s": Q(), start: Q() }],
        end: [{ "inset-e": Q(), end: Q() }],
        "inset-bs": [{ "inset-bs": Q() }],
        "inset-be": [{ "inset-be": Q() }],
        top: [{ top: Q() }],
        right: [{ right: Q() }],
        bottom: [{ bottom: Q() }],
        left: [{ left: Q() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [Mr, "auto", ce, ae] }],
        basis: [{ basis: [Lr, "full", "auto", u, ...D()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [Re, Lr, "auto", "initial", "none", ae] }],
        grow: [{ grow: ["", Re, ce, ae] }],
        shrink: [{ shrink: ["", Re, ce, ae] }],
        order: [{ order: [Mr, "first", "last", "none", ce, ae] }],
        "grid-cols": [{ "grid-cols": J() }],
        "col-start-end": [{ col: ee() }],
        "col-start": [{ "col-start": de() }],
        "col-end": [{ "col-end": de() }],
        "grid-rows": [{ "grid-rows": J() }],
        "row-start-end": [{ row: ee() }],
        "row-start": [{ "row-start": de() }],
        "row-end": [{ "row-end": de() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": ge() }],
        "auto-rows": [{ "auto-rows": ge() }],
        gap: [{ gap: D() }],
        "gap-x": [{ "gap-x": D() }],
        "gap-y": [{ "gap-y": D() }],
        "justify-content": [{ justify: [...le(), "normal"] }],
        "justify-items": [{ "justify-items": [...Ee(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...Ee()] }],
        "align-content": [{ content: ["normal", ...le()] }],
        "align-items": [{ items: [...Ee(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...Ee(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": le() }],
        "place-items": [{ "place-items": [...Ee(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...Ee()] }],
        p: [{ p: D() }],
        px: [{ px: D() }],
        py: [{ py: D() }],
        ps: [{ ps: D() }],
        pe: [{ pe: D() }],
        pbs: [{ pbs: D() }],
        pbe: [{ pbe: D() }],
        pt: [{ pt: D() }],
        pr: [{ pr: D() }],
        pb: [{ pb: D() }],
        pl: [{ pl: D() }],
        m: [{ m: te() }],
        mx: [{ mx: te() }],
        my: [{ my: te() }],
        ms: [{ ms: te() }],
        me: [{ me: te() }],
        mbs: [{ mbs: te() }],
        mbe: [{ mbe: te() }],
        mt: [{ mt: te() }],
        mr: [{ mr: te() }],
        mb: [{ mb: te() }],
        ml: [{ ml: te() }],
        "space-x": [{ "space-x": D() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": D() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: Z() }],
        "inline-size": [{ inline: ["auto", ...$()] }],
        "min-inline-size": [{ "min-inline": ["auto", ...$()] }],
        "max-inline-size": [{ "max-inline": ["none", ...$()] }],
        "block-size": [{ block: ["auto", ...X()] }],
        "min-block-size": [{ "min-block": ["auto", ...X()] }],
        "max-block-size": [{ "max-block": ["none", ...X()] }],
        w: [{ w: [u, "screen", ...Z()] }],
        "min-w": [{ "min-w": [u, "screen", "none", ...Z()] }],
        "max-w": [
          { "max-w": [u, "screen", "none", "prose", { screen: [c] }, ...Z()] },
        ],
        h: [{ h: ["screen", "lh", ...Z()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...Z()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...Z()] }],
        "font-size": [{ text: ["base", n, Vi, ys] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [s, QP, zP] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              mf,
              ae,
            ],
          },
        ],
        "font-family": [{ font: [HP, $P, t] }],
        "font-features": [{ "font-features": [ae] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [i, ce, ae] }],
        "line-clamp": [{ "line-clamp": [Re, "none", ce, pv] }],
        leading: [{ leading: [l, ...D()] }],
        "list-image": [{ "list-image": ["none", ce, ae] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", ce, ae] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: W() }],
        "text-color": [{ text: W() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...ne(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: [Re, "from-font", "auto", ce, ys] },
        ],
        "text-decoration-color": [{ decoration: W() }],
        "underline-offset": [{ "underline-offset": [Re, "auto", ce, ae] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: D() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              ce,
              ae,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", ce, ae] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: L() }],
        "bg-repeat": [{ bg: H() }],
        "bg-size": [{ bg: we() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  Mr,
                  ce,
                  ae,
                ],
                radial: ["", ce, ae],
                conic: [Mr, ce, ae],
              },
              KP,
              WP,
            ],
          },
        ],
        "bg-color": [{ bg: W() }],
        "gradient-from-pos": [{ from: ve() }],
        "gradient-via-pos": [{ via: ve() }],
        "gradient-to-pos": [{ to: ve() }],
        "gradient-from": [{ from: W() }],
        "gradient-via": [{ via: W() }],
        "gradient-to": [{ to: W() }],
        rounded: [{ rounded: pe() }],
        "rounded-s": [{ "rounded-s": pe() }],
        "rounded-e": [{ "rounded-e": pe() }],
        "rounded-t": [{ "rounded-t": pe() }],
        "rounded-r": [{ "rounded-r": pe() }],
        "rounded-b": [{ "rounded-b": pe() }],
        "rounded-l": [{ "rounded-l": pe() }],
        "rounded-ss": [{ "rounded-ss": pe() }],
        "rounded-se": [{ "rounded-se": pe() }],
        "rounded-ee": [{ "rounded-ee": pe() }],
        "rounded-es": [{ "rounded-es": pe() }],
        "rounded-tl": [{ "rounded-tl": pe() }],
        "rounded-tr": [{ "rounded-tr": pe() }],
        "rounded-br": [{ "rounded-br": pe() }],
        "rounded-bl": [{ "rounded-bl": pe() }],
        "border-w": [{ border: ye() }],
        "border-w-x": [{ "border-x": ye() }],
        "border-w-y": [{ "border-y": ye() }],
        "border-w-s": [{ "border-s": ye() }],
        "border-w-e": [{ "border-e": ye() }],
        "border-w-bs": [{ "border-bs": ye() }],
        "border-w-be": [{ "border-be": ye() }],
        "border-w-t": [{ "border-t": ye() }],
        "border-w-r": [{ "border-r": ye() }],
        "border-w-b": [{ "border-b": ye() }],
        "border-w-l": [{ "border-l": ye() }],
        "divide-x": [{ "divide-x": ye() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": ye() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...ne(), "hidden", "none"] }],
        "divide-style": [{ divide: [...ne(), "hidden", "none"] }],
        "border-color": [{ border: W() }],
        "border-color-x": [{ "border-x": W() }],
        "border-color-y": [{ "border-y": W() }],
        "border-color-s": [{ "border-s": W() }],
        "border-color-e": [{ "border-e": W() }],
        "border-color-bs": [{ "border-bs": W() }],
        "border-color-be": [{ "border-be": W() }],
        "border-color-t": [{ "border-t": W() }],
        "border-color-r": [{ "border-r": W() }],
        "border-color-b": [{ "border-b": W() }],
        "border-color-l": [{ "border-l": W() }],
        "divide-color": [{ divide: W() }],
        "outline-style": [{ outline: [...ne(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [Re, ce, ae] }],
        "outline-w": [{ outline: ["", Re, Vi, ys] }],
        "outline-color": [{ outline: W() }],
        shadow: [{ shadow: ["", "none", m, Hl, Wl] }],
        "shadow-color": [{ shadow: W() }],
        "inset-shadow": [{ "inset-shadow": ["none", y, Hl, Wl] }],
        "inset-shadow-color": [{ "inset-shadow": W() }],
        "ring-w": [{ ring: ye() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: W() }],
        "ring-offset-w": [{ "ring-offset": [Re, ys] }],
        "ring-offset-color": [{ "ring-offset": W() }],
        "inset-ring-w": [{ "inset-ring": ye() }],
        "inset-ring-color": [{ "inset-ring": W() }],
        "text-shadow": [{ "text-shadow": ["none", w, Hl, Wl] }],
        "text-shadow-color": [{ "text-shadow": W() }],
        opacity: [{ opacity: [Re, ce, ae] }],
        "mix-blend": [
          { "mix-blend": [...me(), "plus-darker", "plus-lighter"] },
        ],
        "bg-blend": [{ "bg-blend": me() }],
        "mask-clip": [
          {
            "mask-clip": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
          "mask-no-clip",
        ],
        "mask-composite": [
          { mask: ["add", "subtract", "intersect", "exclude"] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [Re] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": fe() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": fe() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": W() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": W() }],
        "mask-image-t-from-pos": [{ "mask-t-from": fe() }],
        "mask-image-t-to-pos": [{ "mask-t-to": fe() }],
        "mask-image-t-from-color": [{ "mask-t-from": W() }],
        "mask-image-t-to-color": [{ "mask-t-to": W() }],
        "mask-image-r-from-pos": [{ "mask-r-from": fe() }],
        "mask-image-r-to-pos": [{ "mask-r-to": fe() }],
        "mask-image-r-from-color": [{ "mask-r-from": W() }],
        "mask-image-r-to-color": [{ "mask-r-to": W() }],
        "mask-image-b-from-pos": [{ "mask-b-from": fe() }],
        "mask-image-b-to-pos": [{ "mask-b-to": fe() }],
        "mask-image-b-from-color": [{ "mask-b-from": W() }],
        "mask-image-b-to-color": [{ "mask-b-to": W() }],
        "mask-image-l-from-pos": [{ "mask-l-from": fe() }],
        "mask-image-l-to-pos": [{ "mask-l-to": fe() }],
        "mask-image-l-from-color": [{ "mask-l-from": W() }],
        "mask-image-l-to-color": [{ "mask-l-to": W() }],
        "mask-image-x-from-pos": [{ "mask-x-from": fe() }],
        "mask-image-x-to-pos": [{ "mask-x-to": fe() }],
        "mask-image-x-from-color": [{ "mask-x-from": W() }],
        "mask-image-x-to-color": [{ "mask-x-to": W() }],
        "mask-image-y-from-pos": [{ "mask-y-from": fe() }],
        "mask-image-y-to-pos": [{ "mask-y-to": fe() }],
        "mask-image-y-from-color": [{ "mask-y-from": W() }],
        "mask-image-y-to-color": [{ "mask-y-to": W() }],
        "mask-image-radial": [{ "mask-radial": [ce, ae] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": fe() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": fe() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": W() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": W() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: ["side", "corner"], farthest: ["side", "corner"] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": _() }],
        "mask-image-conic-pos": [{ "mask-conic": [Re] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": fe() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": fe() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": W() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": W() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          {
            "mask-origin": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
        ],
        "mask-position": [{ mask: L() }],
        "mask-repeat": [{ mask: H() }],
        "mask-size": [{ mask: we() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", ce, ae] }],
        filter: [{ filter: ["", "none", ce, ae] }],
        blur: [{ blur: Pe() }],
        brightness: [{ brightness: [Re, ce, ae] }],
        contrast: [{ contrast: [Re, ce, ae] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", C, Hl, Wl] }],
        "drop-shadow-color": [{ "drop-shadow": W() }],
        grayscale: [{ grayscale: ["", Re, ce, ae] }],
        "hue-rotate": [{ "hue-rotate": [Re, ce, ae] }],
        invert: [{ invert: ["", Re, ce, ae] }],
        saturate: [{ saturate: [Re, ce, ae] }],
        sepia: [{ sepia: ["", Re, ce, ae] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", ce, ae] }],
        "backdrop-blur": [{ "backdrop-blur": Pe() }],
        "backdrop-brightness": [{ "backdrop-brightness": [Re, ce, ae] }],
        "backdrop-contrast": [{ "backdrop-contrast": [Re, ce, ae] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", Re, ce, ae] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [Re, ce, ae] }],
        "backdrop-invert": [{ "backdrop-invert": ["", Re, ce, ae] }],
        "backdrop-opacity": [{ "backdrop-opacity": [Re, ce, ae] }],
        "backdrop-saturate": [{ "backdrop-saturate": [Re, ce, ae] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", Re, ce, ae] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": D() }],
        "border-spacing-x": [{ "border-spacing-x": D() }],
        "border-spacing-y": [{ "border-spacing-y": D() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "",
              "all",
              "colors",
              "opacity",
              "shadow",
              "transform",
              "none",
              ce,
              ae,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [Re, "initial", ce, ae] }],
        ease: [{ ease: ["linear", "initial", T, ce, ae] }],
        delay: [{ delay: [Re, ce, ae] }],
        animate: [{ animate: ["none", P, ce, ae] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [v, ce, ae] }],
        "perspective-origin": [{ "perspective-origin": M() }],
        rotate: [{ rotate: Ae() }],
        "rotate-x": [{ "rotate-x": Ae() }],
        "rotate-y": [{ "rotate-y": Ae() }],
        "rotate-z": [{ "rotate-z": Ae() }],
        scale: [{ scale: Ne() }],
        "scale-x": [{ "scale-x": Ne() }],
        "scale-y": [{ "scale-y": Ne() }],
        "scale-z": [{ "scale-z": Ne() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: Ge() }],
        "skew-x": [{ "skew-x": Ge() }],
        "skew-y": [{ "skew-y": Ge() }],
        transform: [{ transform: [ce, ae, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: M() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: lt() }],
        "translate-x": [{ "translate-x": lt() }],
        "translate-y": [{ "translate-y": lt() }],
        "translate-z": [{ "translate-z": lt() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: W() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: W() }],
        "color-scheme": [
          {
            scheme: [
              "normal",
              "dark",
              "light",
              "light-dark",
              "only-dark",
              "only-light",
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              ce,
              ae,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": D() }],
        "scroll-mx": [{ "scroll-mx": D() }],
        "scroll-my": [{ "scroll-my": D() }],
        "scroll-ms": [{ "scroll-ms": D() }],
        "scroll-me": [{ "scroll-me": D() }],
        "scroll-mbs": [{ "scroll-mbs": D() }],
        "scroll-mbe": [{ "scroll-mbe": D() }],
        "scroll-mt": [{ "scroll-mt": D() }],
        "scroll-mr": [{ "scroll-mr": D() }],
        "scroll-mb": [{ "scroll-mb": D() }],
        "scroll-ml": [{ "scroll-ml": D() }],
        "scroll-p": [{ "scroll-p": D() }],
        "scroll-px": [{ "scroll-px": D() }],
        "scroll-py": [{ "scroll-py": D() }],
        "scroll-ps": [{ "scroll-ps": D() }],
        "scroll-pe": [{ "scroll-pe": D() }],
        "scroll-pbs": [{ "scroll-pbs": D() }],
        "scroll-pbe": [{ "scroll-pbe": D() }],
        "scroll-pt": [{ "scroll-pt": D() }],
        "scroll-pr": [{ "scroll-pr": D() }],
        "scroll-pb": [{ "scroll-pb": D() }],
        "scroll-pl": [{ "scroll-pl": D() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          {
            "will-change": ["auto", "scroll", "contents", "transform", ce, ae],
          },
        ],
        fill: [{ fill: ["none", ...W()] }],
        "stroke-w": [{ stroke: [Re, Vi, ys, pv] }],
        stroke: [{ stroke: ["none", ...W()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "inset-bs",
          "inset-be",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-bs",
          "border-w-be",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-bs",
          "border-color-be",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": [
          "translate",
          "translate-x",
          "translate-y",
          "translate-z",
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mbs",
          "scroll-mbe",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pbs",
          "scroll-pbe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  XP = AP(YP);
function ft(...e) {
  return XP(gx(e));
}
const Ix = b.forwardRef(({ ...e }, t) =>
  S.jsx("div", {
    ref: t,
    className:
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
    ...e,
  }),
);
Ix.displayName = "ToastProvider";
const Fx = b.forwardRef(({ ...e }, t) =>
  S.jsx("div", {
    ref: t,
    className:
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
    ...e,
  }),
);
Fx.displayName = "ToastViewport";
const JP = yx(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
      variants: {
        variant: {
          default: "border bg-background text-foreground",
          destructive:
            "destructive group border-destructive bg-destructive text-destructive-foreground",
        },
      },
      defaultVariants: { variant: "default" },
    },
  ),
  Vx = b.forwardRef(({ className: e, variant: t, ...n }, s) =>
    S.jsx("div", { ref: s, className: ft(JP({ variant: t }), e), ...n }),
  );
Vx.displayName = "Toast";
const ZP = b.forwardRef(({ className: e, ...t }, n) =>
  S.jsx("div", {
    ref: n,
    className: ft(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      e,
    ),
    ...t,
  }),
);
ZP.displayName = "ToastAction";
const Bx = b.forwardRef(({ className: e, ...t }, n) =>
  S.jsx("button", {
    ref: n,
    className: ft(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      e,
    ),
    "toast-close": "",
    ...t,
    children: S.jsx(bx, { className: "h-4 w-4" }),
  }),
);
Bx.displayName = "ToastClose";
const Ux = b.forwardRef(({ className: e, ...t }, n) =>
  S.jsx("div", { ref: n, className: ft("text-sm font-semibold", e), ...t }),
);
Ux.displayName = "ToastTitle";
const zx = b.forwardRef(({ className: e, ...t }, n) =>
  S.jsx("div", { ref: n, className: ft("text-sm opacity-90", e), ...t }),
);
zx.displayName = "ToastDescription";
function eR() {
  const { toasts: e } = AT();
  return S.jsxs(Ix, {
    children: [
      e.map(function ({ id: t, title: n, description: s, action: i, ...l }) {
        return S.jsxs(
          Vx,
          {
            ...l,
            children: [
              S.jsxs("div", {
                className: "grid gap-1",
                children: [
                  n && S.jsx(Ux, { children: n }),
                  s && S.jsx(zx, { children: s }),
                ],
              }),
              i,
              S.jsx(Bx, {}),
            ],
          },
          t,
        );
      }),
      S.jsx(Fx, {}),
    ],
  });
}
var va = class {
    constructor() {
      ((this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this)));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          (this.listeners.delete(e), this.onUnsubscribe());
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  tR = {
    setTimeout: (e, t) => setTimeout(e, t),
    clearTimeout: (e) => clearTimeout(e),
    setInterval: (e, t) => setInterval(e, t),
    clearInterval: (e) => clearInterval(e),
  },
  Vr,
  Qh,
  sx,
  nR =
    ((sx = class {
      constructor() {
        be(this, Vr, tR);
        be(this, Qh, !1);
      }
      setTimeoutProvider(e) {
        se(this, Vr, e);
      }
      setTimeout(e, t) {
        return O(this, Vr).setTimeout(e, t);
      }
      clearTimeout(e) {
        O(this, Vr).clearTimeout(e);
      }
      setInterval(e, t) {
        return O(this, Vr).setInterval(e, t);
      }
      clearInterval(e) {
        O(this, Vr).clearInterval(e);
      }
    }),
    (Vr = new WeakMap()),
    (Qh = new WeakMap()),
    sx),
  Ss = new nR();
function rR(e) {
  setTimeout(e, 0);
}
var Ms = typeof window > "u" || "Deno" in globalThis;
function zt() {}
function sR(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Qf(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function $x(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function Qr(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function fn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function yv(e, t) {
  const {
    type: n = "all",
    exact: s,
    fetchStatus: i,
    predicate: l,
    queryKey: c,
    stale: u,
  } = e;
  if (c) {
    if (s) {
      if (t.queryHash !== ep(c, t.options)) return !1;
    } else if (!oa(t.queryKey, c)) return !1;
  }
  if (n !== "all") {
    const f = t.isActive();
    if ((n === "active" && !f) || (n === "inactive" && f)) return !1;
  }
  return !(
    (typeof u == "boolean" && t.isStale() !== u) ||
    (i && i !== t.state.fetchStatus) ||
    (l && !l(t))
  );
}
function vv(e, t) {
  const { exact: n, status: s, predicate: i, mutationKey: l } = e;
  if (l) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if (sa(t.options.mutationKey) !== sa(l)) return !1;
    } else if (!oa(t.options.mutationKey, l)) return !1;
  }
  return !((s && t.state.status !== s) || (i && !i(t)));
}
function ep(e, t) {
  return ((t == null ? void 0 : t.queryKeyHashFn) || sa)(e);
}
function sa(e) {
  return JSON.stringify(e, (t, n) =>
    Yf(n)
      ? Object.keys(n)
          .sort()
          .reduce((s, i) => ((s[i] = n[i]), s), {})
      : n,
  );
}
function oa(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
      ? !1
      : e && t && typeof e == "object" && typeof t == "object"
        ? Object.keys(t).every((n) => oa(e[n], t[n]))
        : !1;
}
var oR = Object.prototype.hasOwnProperty;
function Wx(e, t, n = 0) {
  if (e === t) return e;
  if (n > 500) return t;
  const s = wv(e) && wv(t);
  if (!s && !(Yf(e) && Yf(t))) return t;
  const l = (s ? e : Object.keys(e)).length,
    c = s ? t : Object.keys(t),
    u = c.length,
    f = s ? new Array(u) : {};
  let h = 0;
  for (let m = 0; m < u; m++) {
    const y = s ? m : c[m],
      w = e[y],
      C = t[y];
    if (w === C) {
      ((f[y] = w), (s ? m < l : oR.call(e, y)) && h++);
      continue;
    }
    if (
      w === null ||
      C === null ||
      typeof w != "object" ||
      typeof C != "object"
    ) {
      f[y] = C;
      continue;
    }
    const E = Wx(w, C, n + 1);
    ((f[y] = E), E === w && h++);
  }
  return l === u && h === l ? e : f;
}
function Gf(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (e[n] !== t[n]) return !1;
  return !0;
}
function wv(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Yf(e) {
  if (!xv(e)) return !1;
  const t = e.constructor;
  if (t === void 0) return !0;
  const n = t.prototype;
  return !(
    !xv(n) ||
    !n.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(e) !== Object.prototype
  );
}
function xv(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function iR(e) {
  return new Promise((t) => {
    Ss.setTimeout(t, e);
  });
}
function Xf(e, t, n) {
  return typeof n.structuralSharing == "function"
    ? n.structuralSharing(e, t)
    : n.structuralSharing !== !1
      ? Wx(e, t)
      : t;
}
function aR(e, t, n = 0) {
  const s = [...e, t];
  return n && s.length > n ? s.slice(1) : s;
}
function lR(e, t, n = 0) {
  const s = [t, ...e];
  return n && s.length > n ? s.slice(0, -1) : s;
}
var tp = Symbol();
function Hx(e, t) {
  return !e.queryFn && t != null && t.initialPromise
    ? () => t.initialPromise
    : !e.queryFn || e.queryFn === tp
      ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
      : e.queryFn;
}
function qx(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
function cR(e, t, n) {
  let s = !1,
    i;
  return (
    Object.defineProperty(e, "signal", {
      enumerable: !0,
      get: () => (
        i ?? (i = t()),
        s ||
          ((s = !0),
          i.aborted ? n() : i.addEventListener("abort", n, { once: !0 })),
        i
      ),
    }),
    e
  );
}
var Cs,
  Br,
  Ro,
  ox,
  uR =
    ((ox = class extends va {
      constructor() {
        super();
        be(this, Cs);
        be(this, Br);
        be(this, Ro);
        se(this, Ro, (t) => {
          if (!Ms && window.addEventListener) {
            const n = () => t();
            return (
              window.addEventListener("visibilitychange", n, !1),
              () => {
                window.removeEventListener("visibilitychange", n);
              }
            );
          }
        });
      }
      onSubscribe() {
        O(this, Br) || this.setEventListener(O(this, Ro));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() ||
          ((t = O(this, Br)) == null || t.call(this), se(this, Br, void 0));
      }
      setEventListener(t) {
        var n;
        (se(this, Ro, t),
          (n = O(this, Br)) == null || n.call(this),
          se(
            this,
            Br,
            t((s) => {
              typeof s == "boolean" ? this.setFocused(s) : this.onFocus();
            }),
          ));
      }
      setFocused(t) {
        O(this, Cs) !== t && (se(this, Cs, t), this.onFocus());
      }
      onFocus() {
        const t = this.isFocused();
        this.listeners.forEach((n) => {
          n(t);
        });
      }
      isFocused() {
        var t;
        return typeof O(this, Cs) == "boolean"
          ? O(this, Cs)
          : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !==
              "hidden";
      }
    }),
    (Cs = new WeakMap()),
    (Br = new WeakMap()),
    (Ro = new WeakMap()),
    ox),
  np = new uR();
function Jf() {
  let e, t;
  const n = new Promise((i, l) => {
    ((e = i), (t = l));
  });
  ((n.status = "pending"), n.catch(() => {}));
  function s(i) {
    (Object.assign(n, i), delete n.resolve, delete n.reject);
  }
  return (
    (n.resolve = (i) => {
      (s({ status: "fulfilled", value: i }), e(i));
    }),
    (n.reject = (i) => {
      (s({ status: "rejected", reason: i }), t(i));
    }),
    n
  );
}
var dR = rR;
function fR() {
  let e = [],
    t = 0,
    n = (u) => {
      u();
    },
    s = (u) => {
      u();
    },
    i = dR;
  const l = (u) => {
      t
        ? e.push(u)
        : i(() => {
            n(u);
          });
    },
    c = () => {
      const u = e;
      ((e = []),
        u.length &&
          i(() => {
            s(() => {
              u.forEach((f) => {
                n(f);
              });
            });
          }));
    };
  return {
    batch: (u) => {
      let f;
      t++;
      try {
        f = u();
      } finally {
        (t--, t || c());
      }
      return f;
    },
    batchCalls:
      (u) =>
      (...f) => {
        l(() => {
          u(...f);
        });
      },
    schedule: l,
    setNotifyFunction: (u) => {
      n = u;
    },
    setBatchNotifyFunction: (u) => {
      s = u;
    },
    setScheduler: (u) => {
      i = u;
    },
  };
}
var bt = fR(),
  Ao,
  Ur,
  _o,
  ix,
  hR =
    ((ix = class extends va {
      constructor() {
        super();
        be(this, Ao, !0);
        be(this, Ur);
        be(this, _o);
        se(this, _o, (t) => {
          if (!Ms && window.addEventListener) {
            const n = () => t(!0),
              s = () => t(!1);
            return (
              window.addEventListener("online", n, !1),
              window.addEventListener("offline", s, !1),
              () => {
                (window.removeEventListener("online", n),
                  window.removeEventListener("offline", s));
              }
            );
          }
        });
      }
      onSubscribe() {
        O(this, Ur) || this.setEventListener(O(this, _o));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() ||
          ((t = O(this, Ur)) == null || t.call(this), se(this, Ur, void 0));
      }
      setEventListener(t) {
        var n;
        (se(this, _o, t),
          (n = O(this, Ur)) == null || n.call(this),
          se(this, Ur, t(this.setOnline.bind(this))));
      }
      setOnline(t) {
        O(this, Ao) !== t &&
          (se(this, Ao, t),
          this.listeners.forEach((s) => {
            s(t);
          }));
      }
      isOnline() {
        return O(this, Ao);
      }
    }),
    (Ao = new WeakMap()),
    (Ur = new WeakMap()),
    (_o = new WeakMap()),
    ix),
  Cc = new hR();
function pR(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function Kx(e) {
  return (e ?? "online") === "online" ? Cc.isOnline() : !0;
}
var Zf = class extends Error {
  constructor(e) {
    (super("CancelledError"),
      (this.revert = e == null ? void 0 : e.revert),
      (this.silent = e == null ? void 0 : e.silent));
  }
};
function Qx(e) {
  let t = !1,
    n = 0,
    s;
  const i = Jf(),
    l = () => i.status !== "pending",
    c = (v) => {
      var x;
      if (!l()) {
        const T = new Zf(v);
        (w(T), (x = e.onCancel) == null || x.call(e, T));
      }
    },
    u = () => {
      t = !0;
    },
    f = () => {
      t = !1;
    },
    h = () =>
      np.isFocused() &&
      (e.networkMode === "always" || Cc.isOnline()) &&
      e.canRun(),
    m = () => Kx(e.networkMode) && e.canRun(),
    y = (v) => {
      l() || (s == null || s(), i.resolve(v));
    },
    w = (v) => {
      l() || (s == null || s(), i.reject(v));
    },
    C = () =>
      new Promise((v) => {
        var x;
        ((s = (T) => {
          (l() || h()) && v(T);
        }),
          (x = e.onPause) == null || x.call(e));
      }).then(() => {
        var v;
        ((s = void 0), l() || (v = e.onContinue) == null || v.call(e));
      }),
    E = () => {
      if (l()) return;
      let v;
      const x = n === 0 ? e.initialPromise : void 0;
      try {
        v = x ?? e.fn();
      } catch (T) {
        v = Promise.reject(T);
      }
      Promise.resolve(v)
        .then(y)
        .catch((T) => {
          var V;
          if (l()) return;
          const P = e.retry ?? (Ms ? 0 : 3),
            R = e.retryDelay ?? pR,
            _ = typeof R == "function" ? R(n, T) : R,
            M =
              P === !0 ||
              (typeof P == "number" && n < P) ||
              (typeof P == "function" && P(n, T));
          if (t || !M) {
            w(T);
            return;
          }
          (n++,
            (V = e.onFail) == null || V.call(e, n, T),
            iR(_)
              .then(() => (h() ? void 0 : C()))
              .then(() => {
                t ? w(T) : E();
              }));
        });
    };
  return {
    promise: i,
    status: () => i.status,
    cancel: c,
    continue: () => (s == null || s(), i),
    cancelRetry: u,
    continueRetry: f,
    canStart: m,
    start: () => (m() ? E() : C().then(E), i),
  };
}
var ks,
  ax,
  Gx =
    ((ax = class {
      constructor() {
        be(this, ks);
      }
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        (this.clearGcTimeout(),
          Qf(this.gcTime) &&
            se(
              this,
              ks,
              Ss.setTimeout(() => {
                this.optionalRemove();
              }, this.gcTime),
            ));
      }
      updateGcTime(e) {
        this.gcTime = Math.max(this.gcTime || 0, e ?? (Ms ? 1 / 0 : 300 * 1e3));
      }
      clearGcTimeout() {
        O(this, ks) && (Ss.clearTimeout(O(this, ks)), se(this, ks, void 0));
      }
    }),
    (ks = new WeakMap()),
    ax),
  Ts,
  No,
  dn,
  Ps,
  gt,
  ha,
  Rs,
  En,
  rr,
  lx,
  mR =
    ((lx = class extends Gx {
      constructor(t) {
        super();
        be(this, En);
        be(this, Ts);
        be(this, No);
        be(this, dn);
        be(this, Ps);
        be(this, gt);
        be(this, ha);
        be(this, Rs);
        (se(this, Rs, !1),
          se(this, ha, t.defaultOptions),
          this.setOptions(t.options),
          (this.observers = []),
          se(this, Ps, t.client),
          se(this, dn, O(this, Ps).getQueryCache()),
          (this.queryKey = t.queryKey),
          (this.queryHash = t.queryHash),
          se(this, Ts, bv(this.options)),
          (this.state = t.state ?? O(this, Ts)),
          this.scheduleGc());
      }
      get meta() {
        return this.options.meta;
      }
      get promise() {
        var t;
        return (t = O(this, gt)) == null ? void 0 : t.promise;
      }
      setOptions(t) {
        if (
          ((this.options = { ...O(this, ha), ...t }),
          this.updateGcTime(this.options.gcTime),
          this.state && this.state.data === void 0)
        ) {
          const n = bv(this.options);
          n.data !== void 0 &&
            (this.setState(Sv(n.data, n.dataUpdatedAt)), se(this, Ts, n));
        }
      }
      optionalRemove() {
        !this.observers.length &&
          this.state.fetchStatus === "idle" &&
          O(this, dn).remove(this);
      }
      setData(t, n) {
        const s = Xf(this.state.data, t, this.options);
        return (
          Oe(this, En, rr).call(this, {
            data: s,
            type: "success",
            dataUpdatedAt: n == null ? void 0 : n.updatedAt,
            manual: n == null ? void 0 : n.manual,
          }),
          s
        );
      }
      setState(t, n) {
        Oe(this, En, rr).call(this, {
          type: "setState",
          state: t,
          setStateOptions: n,
        });
      }
      cancel(t) {
        var s, i;
        const n = (s = O(this, gt)) == null ? void 0 : s.promise;
        return (
          (i = O(this, gt)) == null || i.cancel(t),
          n ? n.then(zt).catch(zt) : Promise.resolve()
        );
      }
      destroy() {
        (super.destroy(), this.cancel({ silent: !0 }));
      }
      reset() {
        (this.destroy(), this.setState(O(this, Ts)));
      }
      isActive() {
        return this.observers.some((t) => fn(t.options.enabled, this) !== !1);
      }
      isDisabled() {
        return this.getObserversCount() > 0
          ? !this.isActive()
          : this.options.queryFn === tp ||
              this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
      }
      isStatic() {
        return this.getObserversCount() > 0
          ? this.observers.some(
              (t) => Qr(t.options.staleTime, this) === "static",
            )
          : !1;
      }
      isStale() {
        return this.getObserversCount() > 0
          ? this.observers.some((t) => t.getCurrentResult().isStale)
          : this.state.data === void 0 || this.state.isInvalidated;
      }
      isStaleByTime(t = 0) {
        return this.state.data === void 0
          ? !0
          : t === "static"
            ? !1
            : this.state.isInvalidated
              ? !0
              : !$x(this.state.dataUpdatedAt, t);
      }
      onFocus() {
        var n;
        const t = this.observers.find((s) => s.shouldFetchOnWindowFocus());
        (t == null || t.refetch({ cancelRefetch: !1 }),
          (n = O(this, gt)) == null || n.continue());
      }
      onOnline() {
        var n;
        const t = this.observers.find((s) => s.shouldFetchOnReconnect());
        (t == null || t.refetch({ cancelRefetch: !1 }),
          (n = O(this, gt)) == null || n.continue());
      }
      addObserver(t) {
        this.observers.includes(t) ||
          (this.observers.push(t),
          this.clearGcTimeout(),
          O(this, dn).notify({
            type: "observerAdded",
            query: this,
            observer: t,
          }));
      }
      removeObserver(t) {
        this.observers.includes(t) &&
          ((this.observers = this.observers.filter((n) => n !== t)),
          this.observers.length ||
            (O(this, gt) &&
              (O(this, Rs)
                ? O(this, gt).cancel({ revert: !0 })
                : O(this, gt).cancelRetry()),
            this.scheduleGc()),
          O(this, dn).notify({
            type: "observerRemoved",
            query: this,
            observer: t,
          }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated ||
          Oe(this, En, rr).call(this, { type: "invalidate" });
      }
      async fetch(t, n) {
        var f, h, m, y, w, C, E, v, x, T, P, R;
        if (
          this.state.fetchStatus !== "idle" &&
          ((f = O(this, gt)) == null ? void 0 : f.status()) !== "rejected"
        ) {
          if (this.state.data !== void 0 && n != null && n.cancelRefetch)
            this.cancel({ silent: !0 });
          else if (O(this, gt))
            return (O(this, gt).continueRetry(), O(this, gt).promise);
        }
        if ((t && this.setOptions(t), !this.options.queryFn)) {
          const _ = this.observers.find((M) => M.options.queryFn);
          _ && this.setOptions(_.options);
        }
        const s = new AbortController(),
          i = (_) => {
            Object.defineProperty(_, "signal", {
              enumerable: !0,
              get: () => (se(this, Rs, !0), s.signal),
            });
          },
          l = () => {
            const _ = Hx(this.options, n),
              V = (() => {
                const U = {
                  client: O(this, Ps),
                  queryKey: this.queryKey,
                  meta: this.meta,
                };
                return (i(U), U);
              })();
            return (
              se(this, Rs, !1),
              this.options.persister ? this.options.persister(_, V, this) : _(V)
            );
          },
          u = (() => {
            const _ = {
              fetchOptions: n,
              options: this.options,
              queryKey: this.queryKey,
              client: O(this, Ps),
              state: this.state,
              fetchFn: l,
            };
            return (i(_), _);
          })();
        ((h = this.options.behavior) == null || h.onFetch(u, this),
          se(this, No, this.state),
          (this.state.fetchStatus === "idle" ||
            this.state.fetchMeta !==
              ((m = u.fetchOptions) == null ? void 0 : m.meta)) &&
            Oe(this, En, rr).call(this, {
              type: "fetch",
              meta: (y = u.fetchOptions) == null ? void 0 : y.meta,
            }),
          se(
            this,
            gt,
            Qx({
              initialPromise: n == null ? void 0 : n.initialPromise,
              fn: u.fetchFn,
              onCancel: (_) => {
                (_ instanceof Zf &&
                  _.revert &&
                  this.setState({ ...O(this, No), fetchStatus: "idle" }),
                  s.abort());
              },
              onFail: (_, M) => {
                Oe(this, En, rr).call(this, {
                  type: "failed",
                  failureCount: _,
                  error: M,
                });
              },
              onPause: () => {
                Oe(this, En, rr).call(this, { type: "pause" });
              },
              onContinue: () => {
                Oe(this, En, rr).call(this, { type: "continue" });
              },
              retry: u.options.retry,
              retryDelay: u.options.retryDelay,
              networkMode: u.options.networkMode,
              canRun: () => !0,
            }),
          ));
        try {
          const _ = await O(this, gt).start();
          if (_ === void 0)
            throw new Error(`${this.queryHash} data is undefined`);
          return (
            this.setData(_),
            (C = (w = O(this, dn).config).onSuccess) == null ||
              C.call(w, _, this),
            (v = (E = O(this, dn).config).onSettled) == null ||
              v.call(E, _, this.state.error, this),
            _
          );
        } catch (_) {
          if (_ instanceof Zf) {
            if (_.silent) return O(this, gt).promise;
            if (_.revert) {
              if (this.state.data === void 0) throw _;
              return this.state.data;
            }
          }
          throw (
            Oe(this, En, rr).call(this, { type: "error", error: _ }),
            (T = (x = O(this, dn).config).onError) == null ||
              T.call(x, _, this),
            (R = (P = O(this, dn).config).onSettled) == null ||
              R.call(P, this.state.data, _, this),
            _
          );
        } finally {
          this.scheduleGc();
        }
      }
    }),
    (Ts = new WeakMap()),
    (No = new WeakMap()),
    (dn = new WeakMap()),
    (Ps = new WeakMap()),
    (gt = new WeakMap()),
    (ha = new WeakMap()),
    (Rs = new WeakMap()),
    (En = new WeakSet()),
    (rr = function (t) {
      const n = (s) => {
        switch (t.type) {
          case "failed":
            return {
              ...s,
              fetchFailureCount: t.failureCount,
              fetchFailureReason: t.error,
            };
          case "pause":
            return { ...s, fetchStatus: "paused" };
          case "continue":
            return { ...s, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...s,
              ...Yx(s.data, this.options),
              fetchMeta: t.meta ?? null,
            };
          case "success":
            const i = {
              ...s,
              ...Sv(t.data, t.dataUpdatedAt),
              dataUpdateCount: s.dataUpdateCount + 1,
              ...(!t.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
            return (se(this, No, t.manual ? i : void 0), i);
          case "error":
            const l = t.error;
            return {
              ...s,
              error: l,
              errorUpdateCount: s.errorUpdateCount + 1,
              errorUpdatedAt: Date.now(),
              fetchFailureCount: s.fetchFailureCount + 1,
              fetchFailureReason: l,
              fetchStatus: "idle",
              status: "error",
              isInvalidated: !0,
            };
          case "invalidate":
            return { ...s, isInvalidated: !0 };
          case "setState":
            return { ...s, ...t.state };
        }
      };
      ((this.state = n(this.state)),
        bt.batch(() => {
          (this.observers.forEach((s) => {
            s.onQueryUpdate();
          }),
            O(this, dn).notify({ query: this, type: "updated", action: t }));
        }));
    }),
    lx);
function Yx(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Kx(t.networkMode) ? "fetching" : "paused",
    ...(e === void 0 && { error: null, status: "pending" }),
  };
}
function Sv(e, t) {
  return {
    data: e,
    dataUpdatedAt: t ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success",
  };
}
function bv(e) {
  const t =
      typeof e.initialData == "function" ? e.initialData() : e.initialData,
    n = t !== void 0,
    s = n
      ? typeof e.initialDataUpdatedAt == "function"
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: n ? (s ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: n ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var Ut,
  je,
  pa,
  Lt,
  As,
  Oo,
  sr,
  zr,
  ma,
  jo,
  Lo,
  _s,
  Ns,
  $r,
  Mo,
  Ie,
  Wi,
  eh,
  th,
  nh,
  rh,
  sh,
  oh,
  ih,
  Xx,
  cx,
  gR =
    ((cx = class extends va {
      constructor(t, n) {
        super();
        be(this, Ie);
        be(this, Ut);
        be(this, je);
        be(this, pa);
        be(this, Lt);
        be(this, As);
        be(this, Oo);
        be(this, sr);
        be(this, zr);
        be(this, ma);
        be(this, jo);
        be(this, Lo);
        be(this, _s);
        be(this, Ns);
        be(this, $r);
        be(this, Mo, new Set());
        ((this.options = n),
          se(this, Ut, t),
          se(this, zr, null),
          se(this, sr, Jf()),
          this.bindMethods(),
          this.setOptions(n));
      }
      bindMethods() {
        this.refetch = this.refetch.bind(this);
      }
      onSubscribe() {
        this.listeners.size === 1 &&
          (O(this, je).addObserver(this),
          Ev(O(this, je), this.options)
            ? Oe(this, Ie, Wi).call(this)
            : this.updateResult(),
          Oe(this, Ie, rh).call(this));
      }
      onUnsubscribe() {
        this.hasListeners() || this.destroy();
      }
      shouldFetchOnReconnect() {
        return ah(O(this, je), this.options, this.options.refetchOnReconnect);
      }
      shouldFetchOnWindowFocus() {
        return ah(O(this, je), this.options, this.options.refetchOnWindowFocus);
      }
      destroy() {
        ((this.listeners = new Set()),
          Oe(this, Ie, sh).call(this),
          Oe(this, Ie, oh).call(this),
          O(this, je).removeObserver(this));
      }
      setOptions(t) {
        const n = this.options,
          s = O(this, je);
        if (
          ((this.options = O(this, Ut).defaultQueryOptions(t)),
          this.options.enabled !== void 0 &&
            typeof this.options.enabled != "boolean" &&
            typeof this.options.enabled != "function" &&
            typeof fn(this.options.enabled, O(this, je)) != "boolean")
        )
          throw new Error(
            "Expected enabled to be a boolean or a callback that returns a boolean",
          );
        (Oe(this, Ie, ih).call(this),
          O(this, je).setOptions(this.options),
          n._defaulted &&
            !Gf(this.options, n) &&
            O(this, Ut)
              .getQueryCache()
              .notify({
                type: "observerOptionsUpdated",
                query: O(this, je),
                observer: this,
              }));
        const i = this.hasListeners();
        (i &&
          Cv(O(this, je), s, this.options, n) &&
          Oe(this, Ie, Wi).call(this),
          this.updateResult(),
          i &&
            (O(this, je) !== s ||
              fn(this.options.enabled, O(this, je)) !==
                fn(n.enabled, O(this, je)) ||
              Qr(this.options.staleTime, O(this, je)) !==
                Qr(n.staleTime, O(this, je))) &&
            Oe(this, Ie, eh).call(this));
        const l = Oe(this, Ie, th).call(this);
        i &&
          (O(this, je) !== s ||
            fn(this.options.enabled, O(this, je)) !==
              fn(n.enabled, O(this, je)) ||
            l !== O(this, $r)) &&
          Oe(this, Ie, nh).call(this, l);
      }
      getOptimisticResult(t) {
        const n = O(this, Ut).getQueryCache().build(O(this, Ut), t),
          s = this.createResult(n, t);
        return (
          vR(this, s) &&
            (se(this, Lt, s),
            se(this, Oo, this.options),
            se(this, As, O(this, je).state)),
          s
        );
      }
      getCurrentResult() {
        return O(this, Lt);
      }
      trackResult(t, n) {
        return new Proxy(t, {
          get: (s, i) => (
            this.trackProp(i),
            n == null || n(i),
            i === "promise" &&
              (this.trackProp("data"),
              !this.options.experimental_prefetchInRender &&
                O(this, sr).status === "pending" &&
                O(this, sr).reject(
                  new Error(
                    "experimental_prefetchInRender feature flag is not enabled",
                  ),
                )),
            Reflect.get(s, i)
          ),
        });
      }
      trackProp(t) {
        O(this, Mo).add(t);
      }
      getCurrentQuery() {
        return O(this, je);
      }
      refetch({ ...t } = {}) {
        return this.fetch({ ...t });
      }
      fetchOptimistic(t) {
        const n = O(this, Ut).defaultQueryOptions(t),
          s = O(this, Ut).getQueryCache().build(O(this, Ut), n);
        return s.fetch().then(() => this.createResult(s, n));
      }
      fetch(t) {
        return Oe(this, Ie, Wi)
          .call(this, { ...t, cancelRefetch: t.cancelRefetch ?? !0 })
          .then(() => (this.updateResult(), O(this, Lt)));
      }
      createResult(t, n) {
        var Q;
        const s = O(this, je),
          i = this.options,
          l = O(this, Lt),
          c = O(this, As),
          u = O(this, Oo),
          h = t !== s ? t.state : O(this, pa),
          { state: m } = t;
        let y = { ...m },
          w = !1,
          C;
        if (n._optimisticResults) {
          const J = this.hasListeners(),
            ee = !J && Ev(t, n),
            de = J && Cv(t, s, n, i);
          ((ee || de) && (y = { ...y, ...Yx(m.data, t.options) }),
            n._optimisticResults === "isRestoring" && (y.fetchStatus = "idle"));
        }
        let { error: E, errorUpdatedAt: v, status: x } = y;
        C = y.data;
        let T = !1;
        if (n.placeholderData !== void 0 && C === void 0 && x === "pending") {
          let J;
          (l != null &&
          l.isPlaceholderData &&
          n.placeholderData === (u == null ? void 0 : u.placeholderData)
            ? ((J = l.data), (T = !0))
            : (J =
                typeof n.placeholderData == "function"
                  ? n.placeholderData(
                      (Q = O(this, Lo)) == null ? void 0 : Q.state.data,
                      O(this, Lo),
                    )
                  : n.placeholderData),
            J !== void 0 &&
              ((x = "success"),
              (C = Xf(l == null ? void 0 : l.data, J, n)),
              (w = !0)));
        }
        if (n.select && C !== void 0 && !T)
          if (
            l &&
            C === (c == null ? void 0 : c.data) &&
            n.select === O(this, ma)
          )
            C = O(this, jo);
          else
            try {
              (se(this, ma, n.select),
                (C = n.select(C)),
                (C = Xf(l == null ? void 0 : l.data, C, n)),
                se(this, jo, C),
                se(this, zr, null));
            } catch (J) {
              se(this, zr, J);
            }
        O(this, zr) &&
          ((E = O(this, zr)),
          (C = O(this, jo)),
          (v = Date.now()),
          (x = "error"));
        const P = y.fetchStatus === "fetching",
          R = x === "pending",
          _ = x === "error",
          M = R && P,
          V = C !== void 0,
          D = {
            status: x,
            fetchStatus: y.fetchStatus,
            isPending: R,
            isSuccess: x === "success",
            isError: _,
            isInitialLoading: M,
            isLoading: M,
            data: C,
            dataUpdatedAt: y.dataUpdatedAt,
            error: E,
            errorUpdatedAt: v,
            failureCount: y.fetchFailureCount,
            failureReason: y.fetchFailureReason,
            errorUpdateCount: y.errorUpdateCount,
            isFetched: y.dataUpdateCount > 0 || y.errorUpdateCount > 0,
            isFetchedAfterMount:
              y.dataUpdateCount > h.dataUpdateCount ||
              y.errorUpdateCount > h.errorUpdateCount,
            isFetching: P,
            isRefetching: P && !R,
            isLoadingError: _ && !V,
            isPaused: y.fetchStatus === "paused",
            isPlaceholderData: w,
            isRefetchError: _ && V,
            isStale: rp(t, n),
            refetch: this.refetch,
            promise: O(this, sr),
            isEnabled: fn(n.enabled, t) !== !1,
          };
        if (this.options.experimental_prefetchInRender) {
          const J = D.data !== void 0,
            ee = D.status === "error" && !J,
            de = (Ee) => {
              ee ? Ee.reject(D.error) : J && Ee.resolve(D.data);
            },
            ge = () => {
              const Ee = se(this, sr, (D.promise = Jf()));
              de(Ee);
            },
            le = O(this, sr);
          switch (le.status) {
            case "pending":
              t.queryHash === s.queryHash && de(le);
              break;
            case "fulfilled":
              (ee || D.data !== le.value) && ge();
              break;
            case "rejected":
              (!ee || D.error !== le.reason) && ge();
              break;
          }
        }
        return D;
      }
      updateResult() {
        const t = O(this, Lt),
          n = this.createResult(O(this, je), this.options);
        if (
          (se(this, As, O(this, je).state),
          se(this, Oo, this.options),
          O(this, As).data !== void 0 && se(this, Lo, O(this, je)),
          Gf(n, t))
        )
          return;
        se(this, Lt, n);
        const s = () => {
          if (!t) return !0;
          const { notifyOnChangeProps: i } = this.options,
            l = typeof i == "function" ? i() : i;
          if (l === "all" || (!l && !O(this, Mo).size)) return !0;
          const c = new Set(l ?? O(this, Mo));
          return (
            this.options.throwOnError && c.add("error"),
            Object.keys(O(this, Lt)).some((u) => {
              const f = u;
              return O(this, Lt)[f] !== t[f] && c.has(f);
            })
          );
        };
        Oe(this, Ie, Xx).call(this, { listeners: s() });
      }
      onQueryUpdate() {
        (this.updateResult(),
          this.hasListeners() && Oe(this, Ie, rh).call(this));
      }
    }),
    (Ut = new WeakMap()),
    (je = new WeakMap()),
    (pa = new WeakMap()),
    (Lt = new WeakMap()),
    (As = new WeakMap()),
    (Oo = new WeakMap()),
    (sr = new WeakMap()),
    (zr = new WeakMap()),
    (ma = new WeakMap()),
    (jo = new WeakMap()),
    (Lo = new WeakMap()),
    (_s = new WeakMap()),
    (Ns = new WeakMap()),
    ($r = new WeakMap()),
    (Mo = new WeakMap()),
    (Ie = new WeakSet()),
    (Wi = function (t) {
      Oe(this, Ie, ih).call(this);
      let n = O(this, je).fetch(this.options, t);
      return ((t != null && t.throwOnError) || (n = n.catch(zt)), n);
    }),
    (eh = function () {
      Oe(this, Ie, sh).call(this);
      const t = Qr(this.options.staleTime, O(this, je));
      if (Ms || O(this, Lt).isStale || !Qf(t)) return;
      const s = $x(O(this, Lt).dataUpdatedAt, t) + 1;
      se(
        this,
        _s,
        Ss.setTimeout(() => {
          O(this, Lt).isStale || this.updateResult();
        }, s),
      );
    }),
    (th = function () {
      return (
        (typeof this.options.refetchInterval == "function"
          ? this.options.refetchInterval(O(this, je))
          : this.options.refetchInterval) ?? !1
      );
    }),
    (nh = function (t) {
      (Oe(this, Ie, oh).call(this),
        se(this, $r, t),
        !(
          Ms ||
          fn(this.options.enabled, O(this, je)) === !1 ||
          !Qf(O(this, $r)) ||
          O(this, $r) === 0
        ) &&
          se(
            this,
            Ns,
            Ss.setInterval(
              () => {
                (this.options.refetchIntervalInBackground || np.isFocused()) &&
                  Oe(this, Ie, Wi).call(this);
              },
              O(this, $r),
            ),
          ));
    }),
    (rh = function () {
      (Oe(this, Ie, eh).call(this),
        Oe(this, Ie, nh).call(this, Oe(this, Ie, th).call(this)));
    }),
    (sh = function () {
      O(this, _s) && (Ss.clearTimeout(O(this, _s)), se(this, _s, void 0));
    }),
    (oh = function () {
      O(this, Ns) && (Ss.clearInterval(O(this, Ns)), se(this, Ns, void 0));
    }),
    (ih = function () {
      const t = O(this, Ut).getQueryCache().build(O(this, Ut), this.options);
      if (t === O(this, je)) return;
      const n = O(this, je);
      (se(this, je, t),
        se(this, pa, t.state),
        this.hasListeners() &&
          (n == null || n.removeObserver(this), t.addObserver(this)));
    }),
    (Xx = function (t) {
      bt.batch(() => {
        (t.listeners &&
          this.listeners.forEach((n) => {
            n(O(this, Lt));
          }),
          O(this, Ut)
            .getQueryCache()
            .notify({ query: O(this, je), type: "observerResultsUpdated" }));
      });
    }),
    cx);
function yR(e, t) {
  return (
    fn(t.enabled, e) !== !1 &&
    e.state.data === void 0 &&
    !(e.state.status === "error" && t.retryOnMount === !1)
  );
}
function Ev(e, t) {
  return yR(e, t) || (e.state.data !== void 0 && ah(e, t, t.refetchOnMount));
}
function ah(e, t, n) {
  if (fn(t.enabled, e) !== !1 && Qr(t.staleTime, e) !== "static") {
    const s = typeof n == "function" ? n(e) : n;
    return s === "always" || (s !== !1 && rp(e, t));
  }
  return !1;
}
function Cv(e, t, n, s) {
  return (
    (e !== t || fn(s.enabled, e) === !1) &&
    (!n.suspense || e.state.status !== "error") &&
    rp(e, n)
  );
}
function rp(e, t) {
  return fn(t.enabled, e) !== !1 && e.isStaleByTime(Qr(t.staleTime, e));
}
function vR(e, t) {
  return !Gf(e.getCurrentResult(), t);
}
function kv(e) {
  return {
    onFetch: (t, n) => {
      var m, y, w, C, E;
      const s = t.options,
        i =
          (w =
            (y = (m = t.fetchOptions) == null ? void 0 : m.meta) == null
              ? void 0
              : y.fetchMore) == null
            ? void 0
            : w.direction,
        l = ((C = t.state.data) == null ? void 0 : C.pages) || [],
        c = ((E = t.state.data) == null ? void 0 : E.pageParams) || [];
      let u = { pages: [], pageParams: [] },
        f = 0;
      const h = async () => {
        let v = !1;
        const x = (R) => {
            cR(
              R,
              () => t.signal,
              () => (v = !0),
            );
          },
          T = Hx(t.options, t.fetchOptions),
          P = async (R, _, M) => {
            if (v) return Promise.reject();
            if (_ == null && R.pages.length) return Promise.resolve(R);
            const U = (() => {
                const ee = {
                  client: t.client,
                  queryKey: t.queryKey,
                  pageParam: _,
                  direction: M ? "backward" : "forward",
                  meta: t.options.meta,
                };
                return (x(ee), ee);
              })(),
              D = await T(U),
              { maxPages: Q } = t.options,
              J = M ? lR : aR;
            return {
              pages: J(R.pages, D, Q),
              pageParams: J(R.pageParams, _, Q),
            };
          };
        if (i && l.length) {
          const R = i === "backward",
            _ = R ? wR : Tv,
            M = { pages: l, pageParams: c },
            V = _(s, M);
          u = await P(M, V, R);
        } else {
          const R = e ?? l.length;
          do {
            const _ = f === 0 ? (c[0] ?? s.initialPageParam) : Tv(s, u);
            if (f > 0 && _ == null) break;
            ((u = await P(u, _)), f++);
          } while (f < R);
        }
        return u;
      };
      t.options.persister
        ? (t.fetchFn = () => {
            var v, x;
            return (x = (v = t.options).persister) == null
              ? void 0
              : x.call(
                  v,
                  h,
                  {
                    client: t.client,
                    queryKey: t.queryKey,
                    meta: t.options.meta,
                    signal: t.signal,
                  },
                  n,
                );
          })
        : (t.fetchFn = h);
    },
  };
}
function Tv(e, { pages: t, pageParams: n }) {
  const s = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(t[s], t, n[s], n) : void 0;
}
function wR(e, { pages: t, pageParams: n }) {
  var s;
  return t.length > 0
    ? (s = e.getPreviousPageParam) == null
      ? void 0
      : s.call(e, t[0], t, n[0], n)
    : void 0;
}
var ga,
  Mn,
  Rt,
  Os,
  Dn,
  Dr,
  ux,
  xR =
    ((ux = class extends Gx {
      constructor(t) {
        super();
        be(this, Dn);
        be(this, ga);
        be(this, Mn);
        be(this, Rt);
        be(this, Os);
        (se(this, ga, t.client),
          (this.mutationId = t.mutationId),
          se(this, Rt, t.mutationCache),
          se(this, Mn, []),
          (this.state = t.state || SR()),
          this.setOptions(t.options),
          this.scheduleGc());
      }
      setOptions(t) {
        ((this.options = t), this.updateGcTime(this.options.gcTime));
      }
      get meta() {
        return this.options.meta;
      }
      addObserver(t) {
        O(this, Mn).includes(t) ||
          (O(this, Mn).push(t),
          this.clearGcTimeout(),
          O(this, Rt).notify({
            type: "observerAdded",
            mutation: this,
            observer: t,
          }));
      }
      removeObserver(t) {
        (se(
          this,
          Mn,
          O(this, Mn).filter((n) => n !== t),
        ),
          this.scheduleGc(),
          O(this, Rt).notify({
            type: "observerRemoved",
            mutation: this,
            observer: t,
          }));
      }
      optionalRemove() {
        O(this, Mn).length ||
          (this.state.status === "pending"
            ? this.scheduleGc()
            : O(this, Rt).remove(this));
      }
      continue() {
        var t;
        return (
          ((t = O(this, Os)) == null ? void 0 : t.continue()) ??
          this.execute(this.state.variables)
        );
      }
      async execute(t) {
        var c, u, f, h, m, y, w, C, E, v, x, T, P, R, _, M, V, U;
        const n = () => {
            Oe(this, Dn, Dr).call(this, { type: "continue" });
          },
          s = {
            client: O(this, ga),
            meta: this.options.meta,
            mutationKey: this.options.mutationKey,
          };
        se(
          this,
          Os,
          Qx({
            fn: () =>
              this.options.mutationFn
                ? this.options.mutationFn(t, s)
                : Promise.reject(new Error("No mutationFn found")),
            onFail: (D, Q) => {
              Oe(this, Dn, Dr).call(this, {
                type: "failed",
                failureCount: D,
                error: Q,
              });
            },
            onPause: () => {
              Oe(this, Dn, Dr).call(this, { type: "pause" });
            },
            onContinue: n,
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => O(this, Rt).canRun(this),
          }),
        );
        const i = this.state.status === "pending",
          l = !O(this, Os).canStart();
        try {
          if (i) n();
          else {
            (Oe(this, Dn, Dr).call(this, {
              type: "pending",
              variables: t,
              isPaused: l,
            }),
              O(this, Rt).config.onMutate &&
                (await O(this, Rt).config.onMutate(t, this, s)));
            const Q = await ((u = (c = this.options).onMutate) == null
              ? void 0
              : u.call(c, t, s));
            Q !== this.state.context &&
              Oe(this, Dn, Dr).call(this, {
                type: "pending",
                context: Q,
                variables: t,
                isPaused: l,
              });
          }
          const D = await O(this, Os).start();
          return (
            await ((h = (f = O(this, Rt).config).onSuccess) == null
              ? void 0
              : h.call(f, D, t, this.state.context, this, s)),
            await ((y = (m = this.options).onSuccess) == null
              ? void 0
              : y.call(m, D, t, this.state.context, s)),
            await ((C = (w = O(this, Rt).config).onSettled) == null
              ? void 0
              : C.call(
                  w,
                  D,
                  null,
                  this.state.variables,
                  this.state.context,
                  this,
                  s,
                )),
            await ((v = (E = this.options).onSettled) == null
              ? void 0
              : v.call(E, D, null, t, this.state.context, s)),
            Oe(this, Dn, Dr).call(this, { type: "success", data: D }),
            D
          );
        } catch (D) {
          try {
            await ((T = (x = O(this, Rt).config).onError) == null
              ? void 0
              : T.call(x, D, t, this.state.context, this, s));
          } catch (Q) {
            Promise.reject(Q);
          }
          try {
            await ((R = (P = this.options).onError) == null
              ? void 0
              : R.call(P, D, t, this.state.context, s));
          } catch (Q) {
            Promise.reject(Q);
          }
          try {
            await ((M = (_ = O(this, Rt).config).onSettled) == null
              ? void 0
              : M.call(
                  _,
                  void 0,
                  D,
                  this.state.variables,
                  this.state.context,
                  this,
                  s,
                ));
          } catch (Q) {
            Promise.reject(Q);
          }
          try {
            await ((U = (V = this.options).onSettled) == null
              ? void 0
              : U.call(V, void 0, D, t, this.state.context, s));
          } catch (Q) {
            Promise.reject(Q);
          }
          throw (Oe(this, Dn, Dr).call(this, { type: "error", error: D }), D);
        } finally {
          O(this, Rt).runNext(this);
        }
      }
    }),
    (ga = new WeakMap()),
    (Mn = new WeakMap()),
    (Rt = new WeakMap()),
    (Os = new WeakMap()),
    (Dn = new WeakSet()),
    (Dr = function (t) {
      const n = (s) => {
        switch (t.type) {
          case "failed":
            return {
              ...s,
              failureCount: t.failureCount,
              failureReason: t.error,
            };
          case "pause":
            return { ...s, isPaused: !0 };
          case "continue":
            return { ...s, isPaused: !1 };
          case "pending":
            return {
              ...s,
              context: t.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: t.isPaused,
              status: "pending",
              variables: t.variables,
              submittedAt: Date.now(),
            };
          case "success":
            return {
              ...s,
              data: t.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: !1,
            };
          case "error":
            return {
              ...s,
              data: void 0,
              error: t.error,
              failureCount: s.failureCount + 1,
              failureReason: t.error,
              isPaused: !1,
              status: "error",
            };
        }
      };
      ((this.state = n(this.state)),
        bt.batch(() => {
          (O(this, Mn).forEach((s) => {
            s.onMutationUpdate(t);
          }),
            O(this, Rt).notify({ mutation: this, type: "updated", action: t }));
        }));
    }),
    ux);
function SR() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var or,
  Cn,
  ya,
  dx,
  bR =
    ((dx = class extends va {
      constructor(t = {}) {
        super();
        be(this, or);
        be(this, Cn);
        be(this, ya);
        ((this.config = t),
          se(this, or, new Set()),
          se(this, Cn, new Map()),
          se(this, ya, 0));
      }
      build(t, n, s) {
        const i = new xR({
          client: t,
          mutationCache: this,
          mutationId: ++zl(this, ya)._,
          options: t.defaultMutationOptions(n),
          state: s,
        });
        return (this.add(i), i);
      }
      add(t) {
        O(this, or).add(t);
        const n = ql(t);
        if (typeof n == "string") {
          const s = O(this, Cn).get(n);
          s ? s.push(t) : O(this, Cn).set(n, [t]);
        }
        this.notify({ type: "added", mutation: t });
      }
      remove(t) {
        if (O(this, or).delete(t)) {
          const n = ql(t);
          if (typeof n == "string") {
            const s = O(this, Cn).get(n);
            if (s)
              if (s.length > 1) {
                const i = s.indexOf(t);
                i !== -1 && s.splice(i, 1);
              } else s[0] === t && O(this, Cn).delete(n);
          }
        }
        this.notify({ type: "removed", mutation: t });
      }
      canRun(t) {
        const n = ql(t);
        if (typeof n == "string") {
          const s = O(this, Cn).get(n),
            i =
              s == null ? void 0 : s.find((l) => l.state.status === "pending");
          return !i || i === t;
        } else return !0;
      }
      runNext(t) {
        var s;
        const n = ql(t);
        if (typeof n == "string") {
          const i =
            (s = O(this, Cn).get(n)) == null
              ? void 0
              : s.find((l) => l !== t && l.state.isPaused);
          return (i == null ? void 0 : i.continue()) ?? Promise.resolve();
        } else return Promise.resolve();
      }
      clear() {
        bt.batch(() => {
          (O(this, or).forEach((t) => {
            this.notify({ type: "removed", mutation: t });
          }),
            O(this, or).clear(),
            O(this, Cn).clear());
        });
      }
      getAll() {
        return Array.from(O(this, or));
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find((s) => vv(n, s));
      }
      findAll(t = {}) {
        return this.getAll().filter((n) => vv(t, n));
      }
      notify(t) {
        bt.batch(() => {
          this.listeners.forEach((n) => {
            n(t);
          });
        });
      }
      resumePausedMutations() {
        const t = this.getAll().filter((n) => n.state.isPaused);
        return bt.batch(() =>
          Promise.all(t.map((n) => n.continue().catch(zt))),
        );
      }
    }),
    (or = new WeakMap()),
    (Cn = new WeakMap()),
    (ya = new WeakMap()),
    dx);
function ql(e) {
  var t;
  return (t = e.options.scope) == null ? void 0 : t.id;
}
var In,
  fx,
  ER =
    ((fx = class extends va {
      constructor(t = {}) {
        super();
        be(this, In);
        ((this.config = t), se(this, In, new Map()));
      }
      build(t, n, s) {
        const i = n.queryKey,
          l = n.queryHash ?? ep(i, n);
        let c = this.get(l);
        return (
          c ||
            ((c = new mR({
              client: t,
              queryKey: i,
              queryHash: l,
              options: t.defaultQueryOptions(n),
              state: s,
              defaultOptions: t.getQueryDefaults(i),
            })),
            this.add(c)),
          c
        );
      }
      add(t) {
        O(this, In).has(t.queryHash) ||
          (O(this, In).set(t.queryHash, t),
          this.notify({ type: "added", query: t }));
      }
      remove(t) {
        const n = O(this, In).get(t.queryHash);
        n &&
          (t.destroy(),
          n === t && O(this, In).delete(t.queryHash),
          this.notify({ type: "removed", query: t }));
      }
      clear() {
        bt.batch(() => {
          this.getAll().forEach((t) => {
            this.remove(t);
          });
        });
      }
      get(t) {
        return O(this, In).get(t);
      }
      getAll() {
        return [...O(this, In).values()];
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find((s) => yv(n, s));
      }
      findAll(t = {}) {
        const n = this.getAll();
        return Object.keys(t).length > 0 ? n.filter((s) => yv(t, s)) : n;
      }
      notify(t) {
        bt.batch(() => {
          this.listeners.forEach((n) => {
            n(t);
          });
        });
      }
      onFocus() {
        bt.batch(() => {
          this.getAll().forEach((t) => {
            t.onFocus();
          });
        });
      }
      onOnline() {
        bt.batch(() => {
          this.getAll().forEach((t) => {
            t.onOnline();
          });
        });
      }
    }),
    (In = new WeakMap()),
    fx),
  Xe,
  Wr,
  Hr,
  Do,
  Io,
  qr,
  Fo,
  Vo,
  hx,
  CR =
    ((hx = class {
      constructor(e = {}) {
        be(this, Xe);
        be(this, Wr);
        be(this, Hr);
        be(this, Do);
        be(this, Io);
        be(this, qr);
        be(this, Fo);
        be(this, Vo);
        (se(this, Xe, e.queryCache || new ER()),
          se(this, Wr, e.mutationCache || new bR()),
          se(this, Hr, e.defaultOptions || {}),
          se(this, Do, new Map()),
          se(this, Io, new Map()),
          se(this, qr, 0));
      }
      mount() {
        (zl(this, qr)._++,
          O(this, qr) === 1 &&
            (se(
              this,
              Fo,
              np.subscribe(async (e) => {
                e &&
                  (await this.resumePausedMutations(), O(this, Xe).onFocus());
              }),
            ),
            se(
              this,
              Vo,
              Cc.subscribe(async (e) => {
                e &&
                  (await this.resumePausedMutations(), O(this, Xe).onOnline());
              }),
            )));
      }
      unmount() {
        var e, t;
        (zl(this, qr)._--,
          O(this, qr) === 0 &&
            ((e = O(this, Fo)) == null || e.call(this),
            se(this, Fo, void 0),
            (t = O(this, Vo)) == null || t.call(this),
            se(this, Vo, void 0)));
      }
      isFetching(e) {
        return O(this, Xe).findAll({ ...e, fetchStatus: "fetching" }).length;
      }
      isMutating(e) {
        return O(this, Wr).findAll({ ...e, status: "pending" }).length;
      }
      getQueryData(e) {
        var n;
        const t = this.defaultQueryOptions({ queryKey: e });
        return (n = O(this, Xe).get(t.queryHash)) == null
          ? void 0
          : n.state.data;
      }
      ensureQueryData(e) {
        const t = this.defaultQueryOptions(e),
          n = O(this, Xe).build(this, t),
          s = n.state.data;
        return s === void 0
          ? this.fetchQuery(e)
          : (e.revalidateIfStale &&
              n.isStaleByTime(Qr(t.staleTime, n)) &&
              this.prefetchQuery(t),
            Promise.resolve(s));
      }
      getQueriesData(e) {
        return O(this, Xe)
          .findAll(e)
          .map(({ queryKey: t, state: n }) => {
            const s = n.data;
            return [t, s];
          });
      }
      setQueryData(e, t, n) {
        const s = this.defaultQueryOptions({ queryKey: e }),
          i = O(this, Xe).get(s.queryHash),
          l = i == null ? void 0 : i.state.data,
          c = sR(t, l);
        if (c !== void 0)
          return O(this, Xe)
            .build(this, s)
            .setData(c, { ...n, manual: !0 });
      }
      setQueriesData(e, t, n) {
        return bt.batch(() =>
          O(this, Xe)
            .findAll(e)
            .map(({ queryKey: s }) => [s, this.setQueryData(s, t, n)]),
        );
      }
      getQueryState(e) {
        var n;
        const t = this.defaultQueryOptions({ queryKey: e });
        return (n = O(this, Xe).get(t.queryHash)) == null ? void 0 : n.state;
      }
      removeQueries(e) {
        const t = O(this, Xe);
        bt.batch(() => {
          t.findAll(e).forEach((n) => {
            t.remove(n);
          });
        });
      }
      resetQueries(e, t) {
        const n = O(this, Xe);
        return bt.batch(
          () => (
            n.findAll(e).forEach((s) => {
              s.reset();
            }),
            this.refetchQueries({ type: "active", ...e }, t)
          ),
        );
      }
      cancelQueries(e, t = {}) {
        const n = { revert: !0, ...t },
          s = bt.batch(() =>
            O(this, Xe)
              .findAll(e)
              .map((i) => i.cancel(n)),
          );
        return Promise.all(s).then(zt).catch(zt);
      }
      invalidateQueries(e, t = {}) {
        return bt.batch(
          () => (
            O(this, Xe)
              .findAll(e)
              .forEach((n) => {
                n.invalidate();
              }),
            (e == null ? void 0 : e.refetchType) === "none"
              ? Promise.resolve()
              : this.refetchQueries(
                  {
                    ...e,
                    type:
                      (e == null ? void 0 : e.refetchType) ??
                      (e == null ? void 0 : e.type) ??
                      "active",
                  },
                  t,
                )
          ),
        );
      }
      refetchQueries(e, t = {}) {
        const n = { ...t, cancelRefetch: t.cancelRefetch ?? !0 },
          s = bt.batch(() =>
            O(this, Xe)
              .findAll(e)
              .filter((i) => !i.isDisabled() && !i.isStatic())
              .map((i) => {
                let l = i.fetch(void 0, n);
                return (
                  n.throwOnError || (l = l.catch(zt)),
                  i.state.fetchStatus === "paused" ? Promise.resolve() : l
                );
              }),
          );
        return Promise.all(s).then(zt);
      }
      fetchQuery(e) {
        const t = this.defaultQueryOptions(e);
        t.retry === void 0 && (t.retry = !1);
        const n = O(this, Xe).build(this, t);
        return n.isStaleByTime(Qr(t.staleTime, n))
          ? n.fetch(t)
          : Promise.resolve(n.state.data);
      }
      prefetchQuery(e) {
        return this.fetchQuery(e).then(zt).catch(zt);
      }
      fetchInfiniteQuery(e) {
        return ((e.behavior = kv(e.pages)), this.fetchQuery(e));
      }
      prefetchInfiniteQuery(e) {
        return this.fetchInfiniteQuery(e).then(zt).catch(zt);
      }
      ensureInfiniteQueryData(e) {
        return ((e.behavior = kv(e.pages)), this.ensureQueryData(e));
      }
      resumePausedMutations() {
        return Cc.isOnline()
          ? O(this, Wr).resumePausedMutations()
          : Promise.resolve();
      }
      getQueryCache() {
        return O(this, Xe);
      }
      getMutationCache() {
        return O(this, Wr);
      }
      getDefaultOptions() {
        return O(this, Hr);
      }
      setDefaultOptions(e) {
        se(this, Hr, e);
      }
      setQueryDefaults(e, t) {
        O(this, Do).set(sa(e), { queryKey: e, defaultOptions: t });
      }
      getQueryDefaults(e) {
        const t = [...O(this, Do).values()],
          n = {};
        return (
          t.forEach((s) => {
            oa(e, s.queryKey) && Object.assign(n, s.defaultOptions);
          }),
          n
        );
      }
      setMutationDefaults(e, t) {
        O(this, Io).set(sa(e), { mutationKey: e, defaultOptions: t });
      }
      getMutationDefaults(e) {
        const t = [...O(this, Io).values()],
          n = {};
        return (
          t.forEach((s) => {
            oa(e, s.mutationKey) && Object.assign(n, s.defaultOptions);
          }),
          n
        );
      }
      defaultQueryOptions(e) {
        if (e._defaulted) return e;
        const t = {
          ...O(this, Hr).queries,
          ...this.getQueryDefaults(e.queryKey),
          ...e,
          _defaulted: !0,
        };
        return (
          t.queryHash || (t.queryHash = ep(t.queryKey, t)),
          t.refetchOnReconnect === void 0 &&
            (t.refetchOnReconnect = t.networkMode !== "always"),
          t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
          !t.networkMode && t.persister && (t.networkMode = "offlineFirst"),
          t.queryFn === tp && (t.enabled = !1),
          t
        );
      }
      defaultMutationOptions(e) {
        return e != null && e._defaulted
          ? e
          : {
              ...O(this, Hr).mutations,
              ...((e == null ? void 0 : e.mutationKey) &&
                this.getMutationDefaults(e.mutationKey)),
              ...e,
              _defaulted: !0,
            };
      }
      clear() {
        (O(this, Xe).clear(), O(this, Wr).clear());
      }
    }),
    (Xe = new WeakMap()),
    (Wr = new WeakMap()),
    (Hr = new WeakMap()),
    (Do = new WeakMap()),
    (Io = new WeakMap()),
    (qr = new WeakMap()),
    (Fo = new WeakMap()),
    (Vo = new WeakMap()),
    hx),
  Jx = b.createContext(void 0),
  kR = (e) => {
    const t = b.useContext(Jx);
    if (!t)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return t;
  },
  TR = ({ client: e, children: t }) => (
    b.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e],
    ),
    S.jsx(Jx.Provider, { value: e, children: t })
  ),
  Zx = b.createContext(!1),
  PR = () => b.useContext(Zx);
Zx.Provider;
function RR() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e,
  };
}
var AR = b.createContext(RR()),
  _R = () => b.useContext(AR),
  NR = (e, t, n) => {
    const s =
      n != null && n.state.error && typeof e.throwOnError == "function"
        ? qx(e.throwOnError, [n.state.error, n])
        : e.throwOnError;
    (e.suspense || e.experimental_prefetchInRender || s) &&
      (t.isReset() || (e.retryOnMount = !1));
  },
  OR = (e) => {
    b.useEffect(() => {
      e.clearReset();
    }, [e]);
  },
  jR = ({
    result: e,
    errorResetBoundary: t,
    throwOnError: n,
    query: s,
    suspense: i,
  }) =>
    e.isError &&
    !t.isReset() &&
    !e.isFetching &&
    s &&
    ((i && e.data === void 0) || qx(n, [e.error, s])),
  LR = (e) => {
    if (e.suspense) {
      const n = (i) => (i === "static" ? i : Math.max(i ?? 1e3, 1e3)),
        s = e.staleTime;
      ((e.staleTime = typeof s == "function" ? (...i) => n(s(...i)) : n(s)),
        typeof e.gcTime == "number" && (e.gcTime = Math.max(e.gcTime, 1e3)));
    }
  },
  MR = (e, t) => e.isLoading && e.isFetching && !t,
  DR = (e, t) => (e == null ? void 0 : e.suspense) && t.isPending,
  Pv = (e, t, n) =>
    t.fetchOptimistic(e).catch(() => {
      n.clearReset();
    });
function IR(e, t, n) {
  var w, C, E, v;
  const s = PR(),
    i = _R(),
    l = kR(),
    c = l.defaultQueryOptions(e);
  (C =
    (w = l.getDefaultOptions().queries) == null
      ? void 0
      : w._experimental_beforeQuery) == null || C.call(w, c);
  const u = l.getQueryCache().get(c.queryHash);
  ((c._optimisticResults = s ? "isRestoring" : "optimistic"),
    LR(c),
    NR(c, i, u),
    OR(i));
  const f = !l.getQueryCache().get(c.queryHash),
    [h] = b.useState(() => new t(l, c)),
    m = h.getOptimisticResult(c),
    y = !s && e.subscribed !== !1;
  if (
    (b.useSyncExternalStore(
      b.useCallback(
        (x) => {
          const T = y ? h.subscribe(bt.batchCalls(x)) : zt;
          return (h.updateResult(), T);
        },
        [h, y],
      ),
      () => h.getCurrentResult(),
      () => h.getCurrentResult(),
    ),
    b.useEffect(() => {
      h.setOptions(c);
    }, [c, h]),
    DR(c, m))
  )
    throw Pv(c, h, i);
  if (
    jR({
      result: m,
      errorResetBoundary: i,
      throwOnError: c.throwOnError,
      query: u,
      suspense: c.suspense,
    })
  )
    throw m.error;
  if (
    ((v =
      (E = l.getDefaultOptions().queries) == null
        ? void 0
        : E._experimental_afterQuery) == null || v.call(E, c, m),
    c.experimental_prefetchInRender && !Ms && MR(m, s))
  ) {
    const x = f ? Pv(c, h, i) : u == null ? void 0 : u.promise;
    x == null ||
      x.catch(zt).finally(() => {
        h.updateResult();
      });
  }
  return c.notifyOnChangeProps ? m : h.trackResult(m);
}
function FR(e, t) {
  return IR(e, gR);
}
const VR = new CR({
  defaultOptions: { queries: { refetchOnWindowFocus: !1, retry: 1 } },
});
var wa = px();
const BR = Gh(wa);
/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function kc() {
  return (
    (kc = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var s in n)
              Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
          }
          return e;
        }),
    kc.apply(this, arguments)
  );
}
var Kr;
(function (e) {
  ((e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE"));
})(Kr || (Kr = {}));
const Rv = "popstate";
function UR(e) {
  e === void 0 && (e = {});
  function t(s, i) {
    let { pathname: l, search: c, hash: u } = s.location;
    return lh(
      "",
      { pathname: l, search: c, hash: u },
      (i.state && i.state.usr) || null,
      (i.state && i.state.key) || "default",
    );
  }
  function n(s, i) {
    return typeof i == "string" ? i : tS(i);
  }
  return $R(t, n, null, e);
}
function Ht(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function eS(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function zR() {
  return Math.random().toString(36).substr(2, 8);
}
function Av(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function lh(e, t, n, s) {
  return (
    n === void 0 && (n = null),
    kc(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? Wc(t) : t,
      { state: n, key: (t && t.key) || s || zR() },
    )
  );
}
function tS(e) {
  let { pathname: t = "/", search: n = "", hash: s = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    s && s !== "#" && (t += s.charAt(0) === "#" ? s : "#" + s),
    t
  );
}
function Wc(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let s = e.indexOf("?");
    (s >= 0 && ((t.search = e.substr(s)), (e = e.substr(0, s))),
      e && (t.pathname = e));
  }
  return t;
}
function $R(e, t, n, s) {
  s === void 0 && (s = {});
  let { window: i = document.defaultView, v5Compat: l = !1 } = s,
    c = i.history,
    u = Kr.Pop,
    f = null,
    h = m();
  h == null && ((h = 0), c.replaceState(kc({}, c.state, { idx: h }), ""));
  function m() {
    return (c.state || { idx: null }).idx;
  }
  function y() {
    u = Kr.Pop;
    let x = m(),
      T = x == null ? null : x - h;
    ((h = x), f && f({ action: u, location: v.location, delta: T }));
  }
  function w(x, T) {
    u = Kr.Push;
    let P = lh(v.location, x, T);
    h = m() + 1;
    let R = Av(P, h),
      _ = v.createHref(P);
    try {
      c.pushState(R, "", _);
    } catch (M) {
      if (M instanceof DOMException && M.name === "DataCloneError") throw M;
      i.location.assign(_);
    }
    l && f && f({ action: u, location: v.location, delta: 1 });
  }
  function C(x, T) {
    u = Kr.Replace;
    let P = lh(v.location, x, T);
    h = m();
    let R = Av(P, h),
      _ = v.createHref(P);
    (c.replaceState(R, "", _),
      l && f && f({ action: u, location: v.location, delta: 0 }));
  }
  function E(x) {
    let T = i.location.origin !== "null" ? i.location.origin : i.location.href,
      P = typeof x == "string" ? x : tS(x);
    return (
      (P = P.replace(/ $/, "%20")),
      Ht(
        T,
        "No window.location.(origin|href) available to create URL for href: " +
          P,
      ),
      new URL(P, T)
    );
  }
  let v = {
    get action() {
      return u;
    },
    get location() {
      return e(i, c);
    },
    listen(x) {
      if (f) throw new Error("A history only accepts one active listener");
      return (
        i.addEventListener(Rv, y),
        (f = x),
        () => {
          (i.removeEventListener(Rv, y), (f = null));
        }
      );
    },
    createHref(x) {
      return t(i, x);
    },
    createURL: E,
    encodeLocation(x) {
      let T = E(x);
      return { pathname: T.pathname, search: T.search, hash: T.hash };
    },
    push: w,
    replace: C,
    go(x) {
      return c.go(x);
    },
  };
  return v;
}
var _v;
(function (e) {
  ((e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error"));
})(_v || (_v = {}));
function WR(e, t, n) {
  return (n === void 0 && (n = "/"), HR(e, t, n));
}
function HR(e, t, n, s) {
  let i = typeof t == "string" ? Wc(t) : t,
    l = sS(i.pathname || "/", n);
  if (l == null) return null;
  let c = nS(e);
  qR(c);
  let u = null;
  for (let f = 0; u == null && f < c.length; ++f) {
    let h = sA(l);
    u = tA(c[f], h);
  }
  return u;
}
function nS(e, t, n, s) {
  (t === void 0 && (t = []),
    n === void 0 && (n = []),
    s === void 0 && (s = ""));
  let i = (l, c, u) => {
    let f = {
      relativePath: u === void 0 ? l.path || "" : u,
      caseSensitive: l.caseSensitive === !0,
      childrenIndex: c,
      route: l,
    };
    f.relativePath.startsWith("/") &&
      (Ht(
        f.relativePath.startsWith(s),
        'Absolute route path "' +
          f.relativePath +
          '" nested under path ' +
          ('"' + s + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (f.relativePath = f.relativePath.slice(s.length)));
    let h = ko([s, f.relativePath]),
      m = n.concat(f);
    (l.children &&
      l.children.length > 0 &&
      (Ht(
        l.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + h + '".'),
      ),
      nS(l.children, t, m, h)),
      !(l.path == null && !l.index) &&
        t.push({ path: h, score: ZR(h, l.index), routesMeta: m }));
  };
  return (
    e.forEach((l, c) => {
      var u;
      if (l.path === "" || !((u = l.path) != null && u.includes("?"))) i(l, c);
      else for (let f of rS(l.path)) i(l, c, f);
    }),
    t
  );
}
function rS(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...s] = t,
    i = n.endsWith("?"),
    l = n.replace(/\?$/, "");
  if (s.length === 0) return i ? [l, ""] : [l];
  let c = rS(s.join("/")),
    u = [];
  return (
    u.push(...c.map((f) => (f === "" ? l : [l, f].join("/")))),
    i && u.push(...c),
    u.map((f) => (e.startsWith("/") && f === "" ? "/" : f))
  );
}
function qR(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : eA(
          t.routesMeta.map((s) => s.childrenIndex),
          n.routesMeta.map((s) => s.childrenIndex),
        ),
  );
}
const KR = /^:[\w-]+$/,
  QR = 3,
  GR = 2,
  YR = 1,
  XR = 10,
  JR = -2,
  Nv = (e) => e === "*";
function ZR(e, t) {
  let n = e.split("/"),
    s = n.length;
  return (
    n.some(Nv) && (s += JR),
    t && (s += GR),
    n
      .filter((i) => !Nv(i))
      .reduce((i, l) => i + (KR.test(l) ? QR : l === "" ? YR : XR), s)
  );
}
function eA(e, t) {
  return e.length === t.length && e.slice(0, -1).every((s, i) => s === t[i])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function tA(e, t, n) {
  let { routesMeta: s } = e,
    i = {},
    l = "/",
    c = [];
  for (let u = 0; u < s.length; ++u) {
    let f = s[u],
      h = u === s.length - 1,
      m = l === "/" ? t : t.slice(l.length) || "/",
      y = nA(
        { path: f.relativePath, caseSensitive: f.caseSensitive, end: h },
        m,
      ),
      w = f.route;
    if (!y) return null;
    (Object.assign(i, y.params),
      c.push({
        params: i,
        pathname: ko([l, y.pathname]),
        pathnameBase: oA(ko([l, y.pathnameBase])),
        route: w,
      }),
      y.pathnameBase !== "/" && (l = ko([l, y.pathnameBase])));
  }
  return c;
}
function nA(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, s] = rA(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let l = i[0],
    c = l.replace(/(.)\/+$/, "$1"),
    u = i.slice(1);
  return {
    params: s.reduce((h, m, y) => {
      let { paramName: w, isOptional: C } = m;
      if (w === "*") {
        let v = u[y] || "";
        c = l.slice(0, l.length - v.length).replace(/(.)\/+$/, "$1");
      }
      const E = u[y];
      return (
        C && !E ? (h[w] = void 0) : (h[w] = (E || "").replace(/%2F/g, "/")),
        h
      );
    }, {}),
    pathname: l,
    pathnameBase: c,
    pattern: e,
  };
}
function rA(e, t, n) {
  (t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    eS(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'),
    ));
  let s = [],
    i =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (c, u, f) => (
            s.push({ paramName: u, isOptional: f != null }),
            f ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (s.push({ paramName: "*" }),
        (i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
        ? (i += "\\/*$")
        : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"),
    [new RegExp(i, t ? void 0 : "i"), s]
  );
}
function sA(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      eS(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ")."),
      ),
      e
    );
  }
}
function sS(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    s = e.charAt(n);
  return s && s !== "/" ? null : e.slice(n) || "/";
}
const ko = (e) => e.join("/").replace(/\/\/+/g, "/"),
  oA = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/");
function iA(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const oS = ["post", "put", "patch", "delete"];
new Set(oS);
const aA = ["get", ...oS];
new Set(aA);
/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Tc() {
  return (
    (Tc = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var s in n)
              Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
          }
          return e;
        }),
    Tc.apply(this, arguments)
  );
}
const lA = b.createContext(null),
  cA = b.createContext(null),
  iS = b.createContext(null),
  Hc = b.createContext(null),
  qc = b.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  aS = b.createContext(null);
function sp() {
  return b.useContext(Hc) != null;
}
function lS() {
  return (sp() || Ht(!1), b.useContext(Hc).location);
}
function uA(e, t) {
  return dA(e, t);
}
function dA(e, t, n, s) {
  sp() || Ht(!1);
  let { navigator: i } = b.useContext(iS),
    { matches: l } = b.useContext(qc),
    c = l[l.length - 1],
    u = c ? c.params : {};
  c && c.pathname;
  let f = c ? c.pathnameBase : "/";
  c && c.route;
  let h = lS(),
    m;
  if (t) {
    var y;
    let x = typeof t == "string" ? Wc(t) : t;
    (f === "/" || ((y = x.pathname) != null && y.startsWith(f)) || Ht(!1),
      (m = x));
  } else m = h;
  let w = m.pathname || "/",
    C = w;
  if (f !== "/") {
    let x = f.replace(/^\//, "").split("/");
    C = "/" + w.replace(/^\//, "").split("/").slice(x.length).join("/");
  }
  let E = WR(e, { pathname: C }),
    v = gA(
      E &&
        E.map((x) =>
          Object.assign({}, x, {
            params: Object.assign({}, u, x.params),
            pathname: ko([
              f,
              i.encodeLocation
                ? i.encodeLocation(x.pathname).pathname
                : x.pathname,
            ]),
            pathnameBase:
              x.pathnameBase === "/"
                ? f
                : ko([
                    f,
                    i.encodeLocation
                      ? i.encodeLocation(x.pathnameBase).pathname
                      : x.pathnameBase,
                  ]),
          }),
        ),
      l,
      n,
      s,
    );
  return t && v
    ? b.createElement(
        Hc.Provider,
        {
          value: {
            location: Tc(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              m,
            ),
            navigationType: Kr.Pop,
          },
        },
        v,
      )
    : v;
}
function fA() {
  let e = xA(),
    t = iA(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    i = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return b.createElement(
    b.Fragment,
    null,
    b.createElement("h2", null, "Unexpected Application Error!"),
    b.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? b.createElement("pre", { style: i }, n) : null,
    null,
  );
}
const hA = b.createElement(fA, null);
class pA extends b.Component {
  constructor(t) {
    (super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      }));
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n,
    );
  }
  render() {
    return this.state.error !== void 0
      ? b.createElement(
          qc.Provider,
          { value: this.props.routeContext },
          b.createElement(aS.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function mA(e) {
  let { routeContext: t, match: n, children: s } = e,
    i = b.useContext(lA);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = n.route.id),
    b.createElement(qc.Provider, { value: t }, s)
  );
}
function gA(e, t, n, s) {
  var i;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    s === void 0 && (s = null),
    e == null)
  ) {
    var l;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (l = s) != null &&
      l.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let c = e,
    u = (i = n) == null ? void 0 : i.errors;
  if (u != null) {
    let m = c.findIndex(
      (y) => y.route.id && (u == null ? void 0 : u[y.route.id]) !== void 0,
    );
    (m >= 0 || Ht(!1), (c = c.slice(0, Math.min(c.length, m + 1))));
  }
  let f = !1,
    h = -1;
  if (n && s && s.v7_partialHydration)
    for (let m = 0; m < c.length; m++) {
      let y = c[m];
      if (
        ((y.route.HydrateFallback || y.route.hydrateFallbackElement) && (h = m),
        y.route.id)
      ) {
        let { loaderData: w, errors: C } = n,
          E =
            y.route.loader &&
            w[y.route.id] === void 0 &&
            (!C || C[y.route.id] === void 0);
        if (y.route.lazy || E) {
          ((f = !0), h >= 0 ? (c = c.slice(0, h + 1)) : (c = [c[0]]));
          break;
        }
      }
    }
  return c.reduceRight((m, y, w) => {
    let C,
      E = !1,
      v = null,
      x = null;
    n &&
      ((C = u && y.route.id ? u[y.route.id] : void 0),
      (v = y.route.errorElement || hA),
      f &&
        (h < 0 && w === 0
          ? (SA("route-fallback"), (E = !0), (x = null))
          : h === w &&
            ((E = !0), (x = y.route.hydrateFallbackElement || null))));
    let T = t.concat(c.slice(0, w + 1)),
      P = () => {
        let R;
        return (
          C
            ? (R = v)
            : E
              ? (R = x)
              : y.route.Component
                ? (R = b.createElement(y.route.Component, null))
                : y.route.element
                  ? (R = y.route.element)
                  : (R = m),
          b.createElement(mA, {
            match: y,
            routeContext: { outlet: m, matches: T, isDataRoute: n != null },
            children: R,
          })
        );
      };
    return n && (y.route.ErrorBoundary || y.route.errorElement || w === 0)
      ? b.createElement(pA, {
          location: n.location,
          revalidation: n.revalidation,
          component: v,
          error: C,
          children: P(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
        })
      : P();
  }, null);
}
var cS = (function (e) {
  return (
    (e.UseBlocker = "useBlocker"),
    (e.UseLoaderData = "useLoaderData"),
    (e.UseActionData = "useActionData"),
    (e.UseRouteError = "useRouteError"),
    (e.UseNavigation = "useNavigation"),
    (e.UseRouteLoaderData = "useRouteLoaderData"),
    (e.UseMatches = "useMatches"),
    (e.UseRevalidator = "useRevalidator"),
    (e.UseNavigateStable = "useNavigate"),
    (e.UseRouteId = "useRouteId"),
    e
  );
})(cS || {});
function yA(e) {
  let t = b.useContext(cA);
  return (t || Ht(!1), t);
}
function vA(e) {
  let t = b.useContext(qc);
  return (t || Ht(!1), t);
}
function wA(e) {
  let t = vA(),
    n = t.matches[t.matches.length - 1];
  return (n.route.id || Ht(!1), n.route.id);
}
function xA() {
  var e;
  let t = b.useContext(aS),
    n = yA(cS.UseRouteError),
    s = wA();
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[s];
}
const Ov = {};
function SA(e, t, n) {
  Ov[e] || (Ov[e] = !0);
}
function bA(e, t) {
  (e == null || e.v7_startTransition, e == null || e.v7_relativeSplatPath);
}
function ch(e) {
  Ht(!1);
}
function EA(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: s,
    navigationType: i = Kr.Pop,
    navigator: l,
    static: c = !1,
    future: u,
  } = e;
  sp() && Ht(!1);
  let f = t.replace(/^\/*/, "/"),
    h = b.useMemo(
      () => ({
        basename: f,
        navigator: l,
        static: c,
        future: Tc({ v7_relativeSplatPath: !1 }, u),
      }),
      [f, u, l, c],
    );
  typeof s == "string" && (s = Wc(s));
  let {
      pathname: m = "/",
      search: y = "",
      hash: w = "",
      state: C = null,
      key: E = "default",
    } = s,
    v = b.useMemo(() => {
      let x = sS(m, f);
      return x == null
        ? null
        : {
            location: { pathname: x, search: y, hash: w, state: C, key: E },
            navigationType: i,
          };
    }, [f, m, y, w, C, E, i]);
  return v == null
    ? null
    : b.createElement(
        iS.Provider,
        { value: h },
        b.createElement(Hc.Provider, { children: n, value: v }),
      );
}
function CA(e) {
  let { children: t, location: n } = e;
  return uA(uh(t), n);
}
new Promise(() => {});
function uh(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    b.Children.forEach(e, (s, i) => {
      if (!b.isValidElement(s)) return;
      let l = [...t, i];
      if (s.type === b.Fragment) {
        n.push.apply(n, uh(s.props.children, l));
        return;
      }
      (s.type !== ch && Ht(!1), !s.props.index || !s.props.children || Ht(!1));
      let c = {
        id: s.props.id || l.join("-"),
        caseSensitive: s.props.caseSensitive,
        element: s.props.element,
        Component: s.props.Component,
        index: s.props.index,
        path: s.props.path,
        loader: s.props.loader,
        action: s.props.action,
        errorElement: s.props.errorElement,
        ErrorBoundary: s.props.ErrorBoundary,
        hasErrorBoundary:
          s.props.ErrorBoundary != null || s.props.errorElement != null,
        shouldRevalidate: s.props.shouldRevalidate,
        handle: s.props.handle,
        lazy: s.props.lazy,
      };
      (s.props.children && (c.children = uh(s.props.children, l)), n.push(c));
    }),
    n
  );
}
/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const kA = "6";
try {
  window.__reactRouterVersion = kA;
} catch {}
const TA = "startTransition",
  jv = $c[TA];
function PA(e) {
  let { basename: t, children: n, future: s, window: i } = e,
    l = b.useRef();
  l.current == null && (l.current = UR({ window: i, v5Compat: !0 }));
  let c = l.current,
    [u, f] = b.useState({ action: c.action, location: c.location }),
    { v7_startTransition: h } = s || {},
    m = b.useCallback(
      (y) => {
        h && jv ? jv(() => f(y)) : f(y);
      },
      [f, h],
    );
  return (
    b.useLayoutEffect(() => c.listen(m), [c, m]),
    b.useEffect(() => bA(s), [s]),
    b.createElement(EA, {
      basename: t,
      children: n,
      location: u.location,
      navigationType: u.action,
      navigator: c,
      future: s,
    })
  );
}
var Lv;
(function (e) {
  ((e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState"));
})(Lv || (Lv = {}));
var Mv;
(function (e) {
  ((e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration"));
})(Mv || (Mv = {}));
function uS(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: RA } = Object.prototype,
  { getPrototypeOf: op } = Object,
  { iterator: Kc, toStringTag: dS } = Symbol,
  Qc = ((e) => (t) => {
    const n = RA.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Rn = (e) => ((e = e.toLowerCase()), (t) => Qc(t) === e),
  Gc = (e) => (t) => typeof t === e,
  { isArray: qo } = Array,
  Bo = Gc("undefined");
function xa(e) {
  return (
    e !== null &&
    !Bo(e) &&
    e.constructor !== null &&
    !Bo(e.constructor) &&
    $t(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const fS = Rn("ArrayBuffer");
function AA(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && fS(e.buffer)),
    t
  );
}
const _A = Gc("string"),
  $t = Gc("function"),
  hS = Gc("number"),
  Sa = (e) => e !== null && typeof e == "object",
  NA = (e) => e === !0 || e === !1,
  lc = (e) => {
    if (Qc(e) !== "object") return !1;
    const t = op(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(dS in e) &&
      !(Kc in e)
    );
  },
  OA = (e) => {
    if (!Sa(e) || xa(e)) return !1;
    try {
      return (
        Object.keys(e).length === 0 &&
        Object.getPrototypeOf(e) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  jA = Rn("Date"),
  LA = Rn("File"),
  MA = Rn("Blob"),
  DA = Rn("FileList"),
  IA = (e) => Sa(e) && $t(e.pipe),
  FA = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        ($t(e.append) &&
          ((t = Qc(e)) === "formdata" ||
            (t === "object" &&
              $t(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  VA = Rn("URLSearchParams"),
  [BA, UA, zA, $A] = ["ReadableStream", "Request", "Response", "Headers"].map(
    Rn,
  ),
  WA = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ba(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let s, i;
  if ((typeof e != "object" && (e = [e]), qo(e)))
    for (s = 0, i = e.length; s < i; s++) t.call(null, e[s], s, e);
  else {
    if (xa(e)) return;
    const l = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      c = l.length;
    let u;
    for (s = 0; s < c; s++) ((u = l[s]), t.call(null, e[u], u, e));
  }
}
function pS(e, t) {
  if (xa(e)) return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length,
    i;
  for (; s-- > 0; ) if (((i = n[s]), t === i.toLowerCase())) return i;
  return null;
}
const bs =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  mS = (e) => !Bo(e) && e !== bs;
function dh() {
  const { caseless: e, skipUndefined: t } = (mS(this) && this) || {},
    n = {},
    s = (i, l) => {
      if (l === "__proto__" || l === "constructor" || l === "prototype") return;
      const c = (e && pS(n, l)) || l;
      lc(n[c]) && lc(i)
        ? (n[c] = dh(n[c], i))
        : lc(i)
          ? (n[c] = dh({}, i))
          : qo(i)
            ? (n[c] = i.slice())
            : (!t || !Bo(i)) && (n[c] = i);
    };
  for (let i = 0, l = arguments.length; i < l; i++)
    arguments[i] && ba(arguments[i], s);
  return n;
}
const HA = (e, t, n, { allOwnKeys: s } = {}) => (
    ba(
      t,
      (i, l) => {
        n && $t(i)
          ? Object.defineProperty(e, l, {
              value: uS(i, n),
              writable: !0,
              enumerable: !0,
              configurable: !0,
            })
          : Object.defineProperty(e, l, {
              value: i,
              writable: !0,
              enumerable: !0,
              configurable: !0,
            });
      },
      { allOwnKeys: s },
    ),
    e
  ),
  qA = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  KA = (e, t, n, s) => {
    ((e.prototype = Object.create(t.prototype, s)),
      Object.defineProperty(e.prototype, "constructor", {
        value: e,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n));
  },
  QA = (e, t, n, s) => {
    let i, l, c;
    const u = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (i = Object.getOwnPropertyNames(e), l = i.length; l-- > 0; )
        ((c = i[l]),
          (!s || s(c, e, t)) && !u[c] && ((t[c] = e[c]), (u[c] = !0)));
      e = n !== !1 && op(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  GA = (e, t, n) => {
    ((e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length));
    const s = e.indexOf(t, n);
    return s !== -1 && s === n;
  },
  YA = (e) => {
    if (!e) return null;
    if (qo(e)) return e;
    let t = e.length;
    if (!hS(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  XA = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && op(Uint8Array)),
  JA = (e, t) => {
    const s = (e && e[Kc]).call(e);
    let i;
    for (; (i = s.next()) && !i.done; ) {
      const l = i.value;
      t.call(e, l[0], l[1]);
    }
  },
  ZA = (e, t) => {
    let n;
    const s = [];
    for (; (n = e.exec(t)) !== null; ) s.push(n);
    return s;
  },
  e_ = Rn("HTMLFormElement"),
  t_ = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, s, i) {
      return s.toUpperCase() + i;
    }),
  Dv = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  n_ = Rn("RegExp"),
  gS = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      s = {};
    (ba(n, (i, l) => {
      let c;
      (c = t(i, l, e)) !== !1 && (s[l] = c || i);
    }),
      Object.defineProperties(e, s));
  },
  r_ = (e) => {
    gS(e, (t, n) => {
      if ($t(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const s = e[n];
      if ($t(s)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  s_ = (e, t) => {
    const n = {},
      s = (i) => {
        i.forEach((l) => {
          n[l] = !0;
        });
      };
    return (qo(e) ? s(e) : s(String(e).split(t)), n);
  },
  o_ = () => {},
  i_ = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function a_(e) {
  return !!(e && $t(e.append) && e[dS] === "FormData" && e[Kc]);
}
const l_ = (e) => {
    const t = new Array(10),
      n = (s, i) => {
        if (Sa(s)) {
          if (t.indexOf(s) >= 0) return;
          if (xa(s)) return s;
          if (!("toJSON" in s)) {
            t[i] = s;
            const l = qo(s) ? [] : {};
            return (
              ba(s, (c, u) => {
                const f = n(c, i + 1);
                !Bo(f) && (l[u] = f);
              }),
              (t[i] = void 0),
              l
            );
          }
        }
        return s;
      };
    return n(e, 0);
  },
  c_ = Rn("AsyncFunction"),
  u_ = (e) => e && (Sa(e) || $t(e)) && $t(e.then) && $t(e.catch),
  yS = ((e, t) =>
    e
      ? setImmediate
      : t
        ? ((n, s) => (
            bs.addEventListener(
              "message",
              ({ source: i, data: l }) => {
                i === bs && l === n && s.length && s.shift()();
              },
              !1,
            ),
            (i) => {
              (s.push(i), bs.postMessage(n, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (n) => setTimeout(n))(
    typeof setImmediate == "function",
    $t(bs.postMessage),
  ),
  d_ =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(bs)
      : (typeof process < "u" && process.nextTick) || yS,
  f_ = (e) => e != null && $t(e[Kc]),
  z = {
    isArray: qo,
    isArrayBuffer: fS,
    isBuffer: xa,
    isFormData: FA,
    isArrayBufferView: AA,
    isString: _A,
    isNumber: hS,
    isBoolean: NA,
    isObject: Sa,
    isPlainObject: lc,
    isEmptyObject: OA,
    isReadableStream: BA,
    isRequest: UA,
    isResponse: zA,
    isHeaders: $A,
    isUndefined: Bo,
    isDate: jA,
    isFile: LA,
    isBlob: MA,
    isRegExp: n_,
    isFunction: $t,
    isStream: IA,
    isURLSearchParams: VA,
    isTypedArray: XA,
    isFileList: DA,
    forEach: ba,
    merge: dh,
    extend: HA,
    trim: WA,
    stripBOM: qA,
    inherits: KA,
    toFlatObject: QA,
    kindOf: Qc,
    kindOfTest: Rn,
    endsWith: GA,
    toArray: YA,
    forEachEntry: JA,
    matchAll: ZA,
    isHTMLForm: e_,
    hasOwnProperty: Dv,
    hasOwnProp: Dv,
    reduceDescriptors: gS,
    freezeMethods: r_,
    toObjectSet: s_,
    toCamelCase: t_,
    noop: o_,
    toFiniteNumber: i_,
    findKey: pS,
    global: bs,
    isContextDefined: mS,
    isSpecCompliantForm: a_,
    toJSONObject: l_,
    isAsyncFn: c_,
    isThenable: u_,
    setImmediate: yS,
    asap: d_,
    isIterable: f_,
  };
let ke = class vS extends Error {
  static from(t, n, s, i, l, c) {
    const u = new vS(t.message, n || t.code, s, i, l);
    return ((u.cause = t), (u.name = t.name), c && Object.assign(u, c), u);
  }
  constructor(t, n, s, i, l) {
    (super(t),
      (this.name = "AxiosError"),
      (this.isAxiosError = !0),
      n && (this.code = n),
      s && (this.config = s),
      i && (this.request = i),
      l && ((this.response = l), (this.status = l.status)));
  }
  toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: z.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  }
};
ke.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
ke.ERR_BAD_OPTION = "ERR_BAD_OPTION";
ke.ECONNABORTED = "ECONNABORTED";
ke.ETIMEDOUT = "ETIMEDOUT";
ke.ERR_NETWORK = "ERR_NETWORK";
ke.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
ke.ERR_DEPRECATED = "ERR_DEPRECATED";
ke.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
ke.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
ke.ERR_CANCELED = "ERR_CANCELED";
ke.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
ke.ERR_INVALID_URL = "ERR_INVALID_URL";
const h_ = null;
function fh(e) {
  return z.isPlainObject(e) || z.isArray(e);
}
function wS(e) {
  return z.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Iv(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (i, l) {
          return ((i = wS(i)), !n && l ? "[" + i + "]" : i);
        })
        .join(n ? "." : "")
    : t;
}
function p_(e) {
  return z.isArray(e) && !e.some(fh);
}
const m_ = z.toFlatObject(z, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function Yc(e, t, n) {
  if (!z.isObject(e)) throw new TypeError("target must be an object");
  ((t = t || new FormData()),
    (n = z.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (v, x) {
        return !z.isUndefined(x[v]);
      },
    )));
  const s = n.metaTokens,
    i = n.visitor || m,
    l = n.dots,
    c = n.indexes,
    f = (n.Blob || (typeof Blob < "u" && Blob)) && z.isSpecCompliantForm(t);
  if (!z.isFunction(i)) throw new TypeError("visitor must be a function");
  function h(E) {
    if (E === null) return "";
    if (z.isDate(E)) return E.toISOString();
    if (z.isBoolean(E)) return E.toString();
    if (!f && z.isBlob(E))
      throw new ke("Blob is not supported. Use a Buffer instead.");
    return z.isArrayBuffer(E) || z.isTypedArray(E)
      ? f && typeof Blob == "function"
        ? new Blob([E])
        : Buffer.from(E)
      : E;
  }
  function m(E, v, x) {
    let T = E;
    if (E && !x && typeof E == "object") {
      if (z.endsWith(v, "{}"))
        ((v = s ? v : v.slice(0, -2)), (E = JSON.stringify(E)));
      else if (
        (z.isArray(E) && p_(E)) ||
        ((z.isFileList(E) || z.endsWith(v, "[]")) && (T = z.toArray(E)))
      )
        return (
          (v = wS(v)),
          T.forEach(function (R, _) {
            !(z.isUndefined(R) || R === null) &&
              t.append(
                c === !0 ? Iv([v], _, l) : c === null ? v : v + "[]",
                h(R),
              );
          }),
          !1
        );
    }
    return fh(E) ? !0 : (t.append(Iv(x, v, l), h(E)), !1);
  }
  const y = [],
    w = Object.assign(m_, {
      defaultVisitor: m,
      convertValue: h,
      isVisitable: fh,
    });
  function C(E, v) {
    if (!z.isUndefined(E)) {
      if (y.indexOf(E) !== -1)
        throw Error("Circular reference detected in " + v.join("."));
      (y.push(E),
        z.forEach(E, function (T, P) {
          (!(z.isUndefined(T) || T === null) &&
            i.call(t, T, z.isString(P) ? P.trim() : P, v, w)) === !0 &&
            C(T, v ? v.concat(P) : [P]);
        }),
        y.pop());
    }
  }
  if (!z.isObject(e)) throw new TypeError("data must be an object");
  return (C(e), t);
}
function Fv(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (s) {
    return t[s];
  });
}
function ip(e, t) {
  ((this._pairs = []), e && Yc(e, this, t));
}
const xS = ip.prototype;
xS.append = function (t, n) {
  this._pairs.push([t, n]);
};
xS.toString = function (t) {
  const n = t
    ? function (s) {
        return t.call(this, s, Fv);
      }
    : Fv;
  return this._pairs
    .map(function (i) {
      return n(i[0]) + "=" + n(i[1]);
    }, "")
    .join("&");
};
function g_(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function SS(e, t, n) {
  if (!t) return e;
  const s = (n && n.encode) || g_,
    i = z.isFunction(n) ? { serialize: n } : n,
    l = i && i.serialize;
  let c;
  if (
    (l
      ? (c = l(t, i))
      : (c = z.isURLSearchParams(t) ? t.toString() : new ip(t, i).toString(s)),
    c)
  ) {
    const u = e.indexOf("#");
    (u !== -1 && (e = e.slice(0, u)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + c));
  }
  return e;
}
class Vv {
  constructor() {
    this.handlers = [];
  }
  use(t, n, s) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: s ? s.synchronous : !1,
        runWhen: s ? s.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    z.forEach(this.handlers, function (s) {
      s !== null && t(s);
    });
  }
}
const ap = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
    legacyInterceptorReqResOrdering: !0,
  },
  y_ = typeof URLSearchParams < "u" ? URLSearchParams : ip,
  v_ = typeof FormData < "u" ? FormData : null,
  w_ = typeof Blob < "u" ? Blob : null,
  x_ = {
    isBrowser: !0,
    classes: { URLSearchParams: y_, FormData: v_, Blob: w_ },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  lp = typeof window < "u" && typeof document < "u",
  hh = (typeof navigator == "object" && navigator) || void 0,
  S_ =
    lp &&
    (!hh || ["ReactNative", "NativeScript", "NS"].indexOf(hh.product) < 0),
  b_ =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  E_ = (lp && window.location.href) || "http://localhost",
  C_ = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: lp,
        hasStandardBrowserEnv: S_,
        hasStandardBrowserWebWorkerEnv: b_,
        navigator: hh,
        origin: E_,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  _t = { ...C_, ...x_ };
function k_(e, t) {
  return Yc(e, new _t.classes.URLSearchParams(), {
    visitor: function (n, s, i, l) {
      return _t.isNode && z.isBuffer(n)
        ? (this.append(s, n.toString("base64")), !1)
        : l.defaultVisitor.apply(this, arguments);
    },
    ...t,
  });
}
function T_(e) {
  return z
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function P_(e) {
  const t = {},
    n = Object.keys(e);
  let s;
  const i = n.length;
  let l;
  for (s = 0; s < i; s++) ((l = n[s]), (t[l] = e[l]));
  return t;
}
function bS(e) {
  function t(n, s, i, l) {
    let c = n[l++];
    if (c === "__proto__") return !0;
    const u = Number.isFinite(+c),
      f = l >= n.length;
    return (
      (c = !c && z.isArray(i) ? i.length : c),
      f
        ? (z.hasOwnProp(i, c) ? (i[c] = [i[c], s]) : (i[c] = s), !u)
        : ((!i[c] || !z.isObject(i[c])) && (i[c] = []),
          t(n, s, i[c], l) && z.isArray(i[c]) && (i[c] = P_(i[c])),
          !u)
    );
  }
  if (z.isFormData(e) && z.isFunction(e.entries)) {
    const n = {};
    return (
      z.forEachEntry(e, (s, i) => {
        t(T_(s), i, n, 0);
      }),
      n
    );
  }
  return null;
}
function R_(e, t, n) {
  if (z.isString(e))
    try {
      return ((t || JSON.parse)(e), z.trim(e));
    } catch (s) {
      if (s.name !== "SyntaxError") throw s;
    }
  return (n || JSON.stringify)(e);
}
const Ea = {
  transitional: ap,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (t, n) {
      const s = n.getContentType() || "",
        i = s.indexOf("application/json") > -1,
        l = z.isObject(t);
      if ((l && z.isHTMLForm(t) && (t = new FormData(t)), z.isFormData(t)))
        return i ? JSON.stringify(bS(t)) : t;
      if (
        z.isArrayBuffer(t) ||
        z.isBuffer(t) ||
        z.isStream(t) ||
        z.isFile(t) ||
        z.isBlob(t) ||
        z.isReadableStream(t)
      )
        return t;
      if (z.isArrayBufferView(t)) return t.buffer;
      if (z.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          t.toString()
        );
      let u;
      if (l) {
        if (s.indexOf("application/x-www-form-urlencoded") > -1)
          return k_(t, this.formSerializer).toString();
        if ((u = z.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
          const f = this.env && this.env.FormData;
          return Yc(
            u ? { "files[]": t } : t,
            f && new f(),
            this.formSerializer,
          );
        }
      }
      return l || i ? (n.setContentType("application/json", !1), R_(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || Ea.transitional,
        s = n && n.forcedJSONParsing,
        i = this.responseType === "json";
      if (z.isResponse(t) || z.isReadableStream(t)) return t;
      if (t && z.isString(t) && ((s && !this.responseType) || i)) {
        const c = !(n && n.silentJSONParsing) && i;
        try {
          return JSON.parse(t, this.parseReviver);
        } catch (u) {
          if (c)
            throw u.name === "SyntaxError"
              ? ke.from(u, ke.ERR_BAD_RESPONSE, this, null, this.response)
              : u;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: _t.classes.FormData, Blob: _t.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
z.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Ea.headers[e] = {};
});
const A_ = z.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  __ = (e) => {
    const t = {};
    let n, s, i;
    return (
      e &&
        e
          .split(
            `
`,
          )
          .forEach(function (c) {
            ((i = c.indexOf(":")),
              (n = c.substring(0, i).trim().toLowerCase()),
              (s = c.substring(i + 1).trim()),
              !(!n || (t[n] && A_[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(s)
                    : (t[n] = [s])
                  : (t[n] = t[n] ? t[n] + ", " + s : s)));
          }),
      t
    );
  },
  Bv = Symbol("internals");
function Bi(e) {
  return e && String(e).trim().toLowerCase();
}
function cc(e) {
  return e === !1 || e == null ? e : z.isArray(e) ? e.map(cc) : String(e);
}
function N_(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; (s = n.exec(e)); ) t[s[1]] = s[2];
  return t;
}
const O_ = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function gf(e, t, n, s, i) {
  if (z.isFunction(s)) return s.call(this, t, n);
  if ((i && (t = n), !!z.isString(t))) {
    if (z.isString(s)) return t.indexOf(s) !== -1;
    if (z.isRegExp(s)) return s.test(t);
  }
}
function j_(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function L_(e, t) {
  const n = z.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(e, s + n, {
      value: function (i, l, c) {
        return this[s].call(this, t, i, l, c);
      },
      configurable: !0,
    });
  });
}
let Wt = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, s) {
    const i = this;
    function l(u, f, h) {
      const m = Bi(f);
      if (!m) throw new Error("header name must be a non-empty string");
      const y = z.findKey(i, m);
      (!y || i[y] === void 0 || h === !0 || (h === void 0 && i[y] !== !1)) &&
        (i[y || f] = cc(u));
    }
    const c = (u, f) => z.forEach(u, (h, m) => l(h, m, f));
    if (z.isPlainObject(t) || t instanceof this.constructor) c(t, n);
    else if (z.isString(t) && (t = t.trim()) && !O_(t)) c(__(t), n);
    else if (z.isObject(t) && z.isIterable(t)) {
      let u = {},
        f,
        h;
      for (const m of t) {
        if (!z.isArray(m))
          throw TypeError("Object iterator must return a key-value pair");
        u[(h = m[0])] = (f = u[h])
          ? z.isArray(f)
            ? [...f, m[1]]
            : [f, m[1]]
          : m[1];
      }
      c(u, n);
    } else t != null && l(n, t, s);
    return this;
  }
  get(t, n) {
    if (((t = Bi(t)), t)) {
      const s = z.findKey(this, t);
      if (s) {
        const i = this[s];
        if (!n) return i;
        if (n === !0) return N_(i);
        if (z.isFunction(n)) return n.call(this, i, s);
        if (z.isRegExp(n)) return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = Bi(t)), t)) {
      const s = z.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!n || gf(this, this[s], s, n)));
    }
    return !1;
  }
  delete(t, n) {
    const s = this;
    let i = !1;
    function l(c) {
      if (((c = Bi(c)), c)) {
        const u = z.findKey(s, c);
        u && (!n || gf(s, s[u], u, n)) && (delete s[u], (i = !0));
      }
    }
    return (z.isArray(t) ? t.forEach(l) : l(t), i);
  }
  clear(t) {
    const n = Object.keys(this);
    let s = n.length,
      i = !1;
    for (; s--; ) {
      const l = n[s];
      (!t || gf(this, this[l], l, t, !0)) && (delete this[l], (i = !0));
    }
    return i;
  }
  normalize(t) {
    const n = this,
      s = {};
    return (
      z.forEach(this, (i, l) => {
        const c = z.findKey(s, l);
        if (c) {
          ((n[c] = cc(i)), delete n[l]);
          return;
        }
        const u = t ? j_(l) : String(l).trim();
        (u !== l && delete n[l], (n[u] = cc(i)), (s[u] = !0));
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      z.forEach(this, (s, i) => {
        s != null && s !== !1 && (n[i] = t && z.isArray(s) ? s.join(", ") : s);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const s = new this(t);
    return (n.forEach((i) => s.set(i)), s);
  }
  static accessor(t) {
    const s = (this[Bv] = this[Bv] = { accessors: {} }).accessors,
      i = this.prototype;
    function l(c) {
      const u = Bi(c);
      s[u] || (L_(i, c), (s[u] = !0));
    }
    return (z.isArray(t) ? t.forEach(l) : l(t), this);
  }
};
Wt.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
z.reduceDescriptors(Wt.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(s) {
      this[n] = s;
    },
  };
});
z.freezeMethods(Wt);
function yf(e, t) {
  const n = this || Ea,
    s = t || n,
    i = Wt.from(s.headers);
  let l = s.data;
  return (
    z.forEach(e, function (u) {
      l = u.call(n, l, i.normalize(), t ? t.status : void 0);
    }),
    i.normalize(),
    l
  );
}
function ES(e) {
  return !!(e && e.__CANCEL__);
}
let Ca = class extends ke {
  constructor(t, n, s) {
    (super(t ?? "canceled", ke.ERR_CANCELED, n, s),
      (this.name = "CanceledError"),
      (this.__CANCEL__ = !0));
  }
};
function CS(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status)
    ? e(n)
    : t(
        new ke(
          "Request failed with status code " + n.status,
          [ke.ERR_BAD_REQUEST, ke.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n,
        ),
      );
}
function M_(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function D_(e, t) {
  e = e || 10;
  const n = new Array(e),
    s = new Array(e);
  let i = 0,
    l = 0,
    c;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (f) {
      const h = Date.now(),
        m = s[l];
      (c || (c = h), (n[i] = f), (s[i] = h));
      let y = l,
        w = 0;
      for (; y !== i; ) ((w += n[y++]), (y = y % e));
      if (((i = (i + 1) % e), i === l && (l = (l + 1) % e), h - c < t)) return;
      const C = m && h - m;
      return C ? Math.round((w * 1e3) / C) : void 0;
    }
  );
}
function I_(e, t) {
  let n = 0,
    s = 1e3 / t,
    i,
    l;
  const c = (h, m = Date.now()) => {
    ((n = m), (i = null), l && (clearTimeout(l), (l = null)), e(...h));
  };
  return [
    (...h) => {
      const m = Date.now(),
        y = m - n;
      y >= s
        ? c(h, m)
        : ((i = h),
          l ||
            (l = setTimeout(() => {
              ((l = null), c(i));
            }, s - y)));
    },
    () => i && c(i),
  ];
}
const Pc = (e, t, n = 3) => {
    let s = 0;
    const i = D_(50, 250);
    return I_((l) => {
      const c = l.loaded,
        u = l.lengthComputable ? l.total : void 0,
        f = c - s,
        h = i(f),
        m = c <= u;
      s = c;
      const y = {
        loaded: c,
        total: u,
        progress: u ? c / u : void 0,
        bytes: f,
        rate: h || void 0,
        estimated: h && u && m ? (u - c) / h : void 0,
        event: l,
        lengthComputable: u != null,
        [t ? "download" : "upload"]: !0,
      };
      e(y);
    }, n);
  },
  Uv = (e, t) => {
    const n = e != null;
    return [(s) => t[0]({ lengthComputable: n, total: e, loaded: s }), t[1]];
  },
  zv =
    (e) =>
    (...t) =>
      z.asap(() => e(...t)),
  F_ = _t.hasStandardBrowserEnv
    ? ((e, t) => (n) => (
        (n = new URL(n, _t.origin)),
        e.protocol === n.protocol &&
          e.host === n.host &&
          (t || e.port === n.port)
      ))(
        new URL(_t.origin),
        _t.navigator && /(msie|trident)/i.test(_t.navigator.userAgent),
      )
    : () => !0,
  V_ = _t.hasStandardBrowserEnv
    ? {
        write(e, t, n, s, i, l, c) {
          if (typeof document > "u") return;
          const u = [`${e}=${encodeURIComponent(t)}`];
          (z.isNumber(n) && u.push(`expires=${new Date(n).toUTCString()}`),
            z.isString(s) && u.push(`path=${s}`),
            z.isString(i) && u.push(`domain=${i}`),
            l === !0 && u.push("secure"),
            z.isString(c) && u.push(`SameSite=${c}`),
            (document.cookie = u.join("; ")));
        },
        read(e) {
          if (typeof document > "u") return null;
          const t = document.cookie.match(
            new RegExp("(?:^|; )" + e + "=([^;]*)"),
          );
          return t ? decodeURIComponent(t[1]) : null;
        },
        remove(e) {
          this.write(e, "", Date.now() - 864e5, "/");
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function B_(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function U_(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function kS(e, t, n) {
  let s = !B_(t);
  return e && (s || n == !1) ? U_(e, t) : t;
}
const $v = (e) => (e instanceof Wt ? { ...e } : e);
function Ds(e, t) {
  t = t || {};
  const n = {};
  function s(h, m, y, w) {
    return z.isPlainObject(h) && z.isPlainObject(m)
      ? z.merge.call({ caseless: w }, h, m)
      : z.isPlainObject(m)
        ? z.merge({}, m)
        : z.isArray(m)
          ? m.slice()
          : m;
  }
  function i(h, m, y, w) {
    if (z.isUndefined(m)) {
      if (!z.isUndefined(h)) return s(void 0, h, y, w);
    } else return s(h, m, y, w);
  }
  function l(h, m) {
    if (!z.isUndefined(m)) return s(void 0, m);
  }
  function c(h, m) {
    if (z.isUndefined(m)) {
      if (!z.isUndefined(h)) return s(void 0, h);
    } else return s(void 0, m);
  }
  function u(h, m, y) {
    if (y in t) return s(h, m);
    if (y in e) return s(void 0, h);
  }
  const f = {
    url: l,
    method: l,
    data: l,
    baseURL: c,
    transformRequest: c,
    transformResponse: c,
    paramsSerializer: c,
    timeout: c,
    timeoutMessage: c,
    withCredentials: c,
    withXSRFToken: c,
    adapter: c,
    responseType: c,
    xsrfCookieName: c,
    xsrfHeaderName: c,
    onUploadProgress: c,
    onDownloadProgress: c,
    decompress: c,
    maxContentLength: c,
    maxBodyLength: c,
    beforeRedirect: c,
    transport: c,
    httpAgent: c,
    httpsAgent: c,
    cancelToken: c,
    socketPath: c,
    responseEncoding: c,
    validateStatus: u,
    headers: (h, m, y) => i($v(h), $v(m), y, !0),
  };
  return (
    z.forEach(Object.keys({ ...e, ...t }), function (m) {
      if (m === "__proto__" || m === "constructor" || m === "prototype") return;
      const y = z.hasOwnProp(f, m) ? f[m] : i,
        w = y(e[m], t[m], m);
      (z.isUndefined(w) && y !== u) || (n[m] = w);
    }),
    n
  );
}
const TS = (e) => {
    const t = Ds({}, e);
    let {
      data: n,
      withXSRFToken: s,
      xsrfHeaderName: i,
      xsrfCookieName: l,
      headers: c,
      auth: u,
    } = t;
    if (
      ((t.headers = c = Wt.from(c)),
      (t.url = SS(
        kS(t.baseURL, t.url, t.allowAbsoluteUrls),
        e.params,
        e.paramsSerializer,
      )),
      u &&
        c.set(
          "Authorization",
          "Basic " +
            btoa(
              (u.username || "") +
                ":" +
                (u.password ? unescape(encodeURIComponent(u.password)) : ""),
            ),
        ),
      z.isFormData(n))
    ) {
      if (_t.hasStandardBrowserEnv || _t.hasStandardBrowserWebWorkerEnv)
        c.setContentType(void 0);
      else if (z.isFunction(n.getHeaders)) {
        const f = n.getHeaders(),
          h = ["content-type", "content-length"];
        Object.entries(f).forEach(([m, y]) => {
          h.includes(m.toLowerCase()) && c.set(m, y);
        });
      }
    }
    if (
      _t.hasStandardBrowserEnv &&
      (s && z.isFunction(s) && (s = s(t)), s || (s !== !1 && F_(t.url)))
    ) {
      const f = i && l && V_.read(l);
      f && c.set(i, f);
    }
    return t;
  },
  z_ = typeof XMLHttpRequest < "u",
  $_ =
    z_ &&
    function (e) {
      return new Promise(function (n, s) {
        const i = TS(e);
        let l = i.data;
        const c = Wt.from(i.headers).normalize();
        let { responseType: u, onUploadProgress: f, onDownloadProgress: h } = i,
          m,
          y,
          w,
          C,
          E;
        function v() {
          (C && C(),
            E && E(),
            i.cancelToken && i.cancelToken.unsubscribe(m),
            i.signal && i.signal.removeEventListener("abort", m));
        }
        let x = new XMLHttpRequest();
        (x.open(i.method.toUpperCase(), i.url, !0), (x.timeout = i.timeout));
        function T() {
          if (!x) return;
          const R = Wt.from(
              "getAllResponseHeaders" in x && x.getAllResponseHeaders(),
            ),
            M = {
              data:
                !u || u === "text" || u === "json"
                  ? x.responseText
                  : x.response,
              status: x.status,
              statusText: x.statusText,
              headers: R,
              config: e,
              request: x,
            };
          (CS(
            function (U) {
              (n(U), v());
            },
            function (U) {
              (s(U), v());
            },
            M,
          ),
            (x = null));
        }
        ("onloadend" in x
          ? (x.onloadend = T)
          : (x.onreadystatechange = function () {
              !x ||
                x.readyState !== 4 ||
                (x.status === 0 &&
                  !(x.responseURL && x.responseURL.indexOf("file:") === 0)) ||
                setTimeout(T);
            }),
          (x.onabort = function () {
            x &&
              (s(new ke("Request aborted", ke.ECONNABORTED, e, x)), (x = null));
          }),
          (x.onerror = function (_) {
            const M = _ && _.message ? _.message : "Network Error",
              V = new ke(M, ke.ERR_NETWORK, e, x);
            ((V.event = _ || null), s(V), (x = null));
          }),
          (x.ontimeout = function () {
            let _ = i.timeout
              ? "timeout of " + i.timeout + "ms exceeded"
              : "timeout exceeded";
            const M = i.transitional || ap;
            (i.timeoutErrorMessage && (_ = i.timeoutErrorMessage),
              s(
                new ke(
                  _,
                  M.clarifyTimeoutError ? ke.ETIMEDOUT : ke.ECONNABORTED,
                  e,
                  x,
                ),
              ),
              (x = null));
          }),
          l === void 0 && c.setContentType(null),
          "setRequestHeader" in x &&
            z.forEach(c.toJSON(), function (_, M) {
              x.setRequestHeader(M, _);
            }),
          z.isUndefined(i.withCredentials) ||
            (x.withCredentials = !!i.withCredentials),
          u && u !== "json" && (x.responseType = i.responseType),
          h && (([w, E] = Pc(h, !0)), x.addEventListener("progress", w)),
          f &&
            x.upload &&
            (([y, C] = Pc(f)),
            x.upload.addEventListener("progress", y),
            x.upload.addEventListener("loadend", C)),
          (i.cancelToken || i.signal) &&
            ((m = (R) => {
              x &&
                (s(!R || R.type ? new Ca(null, e, x) : R),
                x.abort(),
                (x = null));
            }),
            i.cancelToken && i.cancelToken.subscribe(m),
            i.signal &&
              (i.signal.aborted
                ? m()
                : i.signal.addEventListener("abort", m))));
        const P = M_(i.url);
        if (P && _t.protocols.indexOf(P) === -1) {
          s(new ke("Unsupported protocol " + P + ":", ke.ERR_BAD_REQUEST, e));
          return;
        }
        x.send(l || null);
      });
    },
  W_ = (e, t) => {
    const { length: n } = (e = e ? e.filter(Boolean) : []);
    if (t || n) {
      let s = new AbortController(),
        i;
      const l = function (h) {
        if (!i) {
          ((i = !0), u());
          const m = h instanceof Error ? h : this.reason;
          s.abort(
            m instanceof ke ? m : new Ca(m instanceof Error ? m.message : m),
          );
        }
      };
      let c =
        t &&
        setTimeout(() => {
          ((c = null), l(new ke(`timeout of ${t}ms exceeded`, ke.ETIMEDOUT)));
        }, t);
      const u = () => {
        e &&
          (c && clearTimeout(c),
          (c = null),
          e.forEach((h) => {
            h.unsubscribe
              ? h.unsubscribe(l)
              : h.removeEventListener("abort", l);
          }),
          (e = null));
      };
      e.forEach((h) => h.addEventListener("abort", l));
      const { signal: f } = s;
      return ((f.unsubscribe = () => z.asap(u)), f);
    }
  },
  H_ = function* (e, t) {
    let n = e.byteLength;
    if (n < t) {
      yield e;
      return;
    }
    let s = 0,
      i;
    for (; s < n; ) ((i = s + t), yield e.slice(s, i), (s = i));
  },
  q_ = async function* (e, t) {
    for await (const n of K_(e)) yield* H_(n, t);
  },
  K_ = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    const t = e.getReader();
    try {
      for (;;) {
        const { done: n, value: s } = await t.read();
        if (n) break;
        yield s;
      }
    } finally {
      await t.cancel();
    }
  },
  Wv = (e, t, n, s) => {
    const i = q_(e, t);
    let l = 0,
      c,
      u = (f) => {
        c || ((c = !0), s && s(f));
      };
    return new ReadableStream(
      {
        async pull(f) {
          try {
            const { done: h, value: m } = await i.next();
            if (h) {
              (u(), f.close());
              return;
            }
            let y = m.byteLength;
            if (n) {
              let w = (l += y);
              n(w);
            }
            f.enqueue(new Uint8Array(m));
          } catch (h) {
            throw (u(h), h);
          }
        },
        cancel(f) {
          return (u(f), i.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  Hv = 64 * 1024,
  { isFunction: Kl } = z,
  Q_ = (({ Request: e, Response: t }) => ({ Request: e, Response: t }))(
    z.global,
  ),
  { ReadableStream: qv, TextEncoder: Kv } = z.global,
  Qv = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  G_ = (e) => {
    e = z.merge.call({ skipUndefined: !0 }, Q_, e);
    const { fetch: t, Request: n, Response: s } = e,
      i = t ? Kl(t) : typeof fetch == "function",
      l = Kl(n),
      c = Kl(s);
    if (!i) return !1;
    const u = i && Kl(qv),
      f =
        i &&
        (typeof Kv == "function"
          ? (
              (E) => (v) =>
                E.encode(v)
            )(new Kv())
          : async (E) => new Uint8Array(await new n(E).arrayBuffer())),
      h =
        l &&
        u &&
        Qv(() => {
          let E = !1;
          const v = new n(_t.origin, {
            body: new qv(),
            method: "POST",
            get duplex() {
              return ((E = !0), "half");
            },
          }).headers.has("Content-Type");
          return E && !v;
        }),
      m = c && u && Qv(() => z.isReadableStream(new s("").body)),
      y = { stream: m && ((E) => E.body) };
    i &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((E) => {
        !y[E] &&
          (y[E] = (v, x) => {
            let T = v && v[E];
            if (T) return T.call(v);
            throw new ke(
              `Response type '${E}' is not supported`,
              ke.ERR_NOT_SUPPORT,
              x,
            );
          });
      });
    const w = async (E) => {
        if (E == null) return 0;
        if (z.isBlob(E)) return E.size;
        if (z.isSpecCompliantForm(E))
          return (
            await new n(_t.origin, { method: "POST", body: E }).arrayBuffer()
          ).byteLength;
        if (z.isArrayBufferView(E) || z.isArrayBuffer(E)) return E.byteLength;
        if ((z.isURLSearchParams(E) && (E = E + ""), z.isString(E)))
          return (await f(E)).byteLength;
      },
      C = async (E, v) => {
        const x = z.toFiniteNumber(E.getContentLength());
        return x ?? w(v);
      };
    return async (E) => {
      let {
          url: v,
          method: x,
          data: T,
          signal: P,
          cancelToken: R,
          timeout: _,
          onDownloadProgress: M,
          onUploadProgress: V,
          responseType: U,
          headers: D,
          withCredentials: Q = "same-origin",
          fetchOptions: J,
        } = TS(E),
        ee = t || fetch;
      U = U ? (U + "").toLowerCase() : "text";
      let de = W_([P, R && R.toAbortSignal()], _),
        ge = null;
      const le =
        de &&
        de.unsubscribe &&
        (() => {
          de.unsubscribe();
        });
      let Ee;
      try {
        if (
          V &&
          h &&
          x !== "get" &&
          x !== "head" &&
          (Ee = await C(D, T)) !== 0
        ) {
          let L = new n(v, { method: "POST", body: T, duplex: "half" }),
            H;
          if (
            (z.isFormData(T) &&
              (H = L.headers.get("content-type")) &&
              D.setContentType(H),
            L.body)
          ) {
            const [we, ve] = Uv(Ee, Pc(zv(V)));
            T = Wv(L.body, Hv, we, ve);
          }
        }
        z.isString(Q) || (Q = Q ? "include" : "omit");
        const te = l && "credentials" in n.prototype,
          Z = {
            ...J,
            signal: de,
            method: x.toUpperCase(),
            headers: D.normalize().toJSON(),
            body: T,
            duplex: "half",
            credentials: te ? Q : void 0,
          };
        ge = l && new n(v, Z);
        let $ = await (l ? ee(ge, J) : ee(v, Z));
        const X = m && (U === "stream" || U === "response");
        if (m && (M || (X && le))) {
          const L = {};
          ["status", "statusText", "headers"].forEach((pe) => {
            L[pe] = $[pe];
          });
          const H = z.toFiniteNumber($.headers.get("content-length")),
            [we, ve] = (M && Uv(H, Pc(zv(M), !0))) || [];
          $ = new s(
            Wv($.body, Hv, we, () => {
              (ve && ve(), le && le());
            }),
            L,
          );
        }
        U = U || "text";
        let W = await y[z.findKey(y, U) || "text"]($, E);
        return (
          !X && le && le(),
          await new Promise((L, H) => {
            CS(L, H, {
              data: W,
              headers: Wt.from($.headers),
              status: $.status,
              statusText: $.statusText,
              config: E,
              request: ge,
            });
          })
        );
      } catch (te) {
        throw (
          le && le(),
          te && te.name === "TypeError" && /Load failed|fetch/i.test(te.message)
            ? Object.assign(
                new ke(
                  "Network Error",
                  ke.ERR_NETWORK,
                  E,
                  ge,
                  te && te.response,
                ),
                { cause: te.cause || te },
              )
            : ke.from(te, te && te.code, E, ge, te && te.response)
        );
      }
    };
  },
  Y_ = new Map(),
  PS = (e) => {
    let t = (e && e.env) || {};
    const { fetch: n, Request: s, Response: i } = t,
      l = [s, i, n];
    let c = l.length,
      u = c,
      f,
      h,
      m = Y_;
    for (; u--; )
      ((f = l[u]),
        (h = m.get(f)),
        h === void 0 && m.set(f, (h = u ? new Map() : G_(t))),
        (m = h));
    return h;
  };
PS();
const cp = { http: h_, xhr: $_, fetch: { get: PS } };
z.forEach(cp, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Gv = (e) => `- ${e}`,
  X_ = (e) => z.isFunction(e) || e === null || e === !1;
function J_(e, t) {
  e = z.isArray(e) ? e : [e];
  const { length: n } = e;
  let s, i;
  const l = {};
  for (let c = 0; c < n; c++) {
    s = e[c];
    let u;
    if (
      ((i = s),
      !X_(s) && ((i = cp[(u = String(s)).toLowerCase()]), i === void 0))
    )
      throw new ke(`Unknown adapter '${u}'`);
    if (i && (z.isFunction(i) || (i = i.get(t)))) break;
    l[u || "#" + c] = i;
  }
  if (!i) {
    const c = Object.entries(l).map(
      ([f, h]) =>
        `adapter ${f} ` +
        (h === !1
          ? "is not supported by the environment"
          : "is not available in the build"),
    );
    let u = n
      ? c.length > 1
        ? `since :
` +
          c.map(Gv).join(`
`)
        : " " + Gv(c[0])
      : "as no adapter specified";
    throw new ke(
      "There is no suitable adapter to dispatch the request " + u,
      "ERR_NOT_SUPPORT",
    );
  }
  return i;
}
const RS = { getAdapter: J_, adapters: cp };
function vf(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Ca(null, e);
}
function Yv(e) {
  return (
    vf(e),
    (e.headers = Wt.from(e.headers)),
    (e.data = yf.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    RS.getAdapter(
      e.adapter || Ea.adapter,
      e,
    )(e).then(
      function (s) {
        return (
          vf(e),
          (s.data = yf.call(e, e.transformResponse, s)),
          (s.headers = Wt.from(s.headers)),
          s
        );
      },
      function (s) {
        return (
          ES(s) ||
            (vf(e),
            s &&
              s.response &&
              ((s.response.data = yf.call(e, e.transformResponse, s.response)),
              (s.response.headers = Wt.from(s.response.headers)))),
          Promise.reject(s)
        );
      },
    )
  );
}
const AS = "1.13.5",
  Xc = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    Xc[e] = function (s) {
      return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  },
);
const Xv = {};
Xc.transitional = function (t, n, s) {
  function i(l, c) {
    return (
      "[Axios v" +
      AS +
      "] Transitional option '" +
      l +
      "'" +
      c +
      (s ? ". " + s : "")
    );
  }
  return (l, c, u) => {
    if (t === !1)
      throw new ke(
        i(c, " has been removed" + (n ? " in " + n : "")),
        ke.ERR_DEPRECATED,
      );
    return (
      n &&
        !Xv[c] &&
        ((Xv[c] = !0),
        console.warn(
          i(
            c,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future",
          ),
        )),
      t ? t(l, c, u) : !0
    );
  };
};
Xc.spelling = function (t) {
  return (n, s) => (console.warn(`${s} is likely a misspelling of ${t}`), !0);
};
function Z_(e, t, n) {
  if (typeof e != "object")
    throw new ke("options must be an object", ke.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let i = s.length;
  for (; i-- > 0; ) {
    const l = s[i],
      c = t[l];
    if (c) {
      const u = e[l],
        f = u === void 0 || c(u, l, e);
      if (f !== !0)
        throw new ke("option " + l + " must be " + f, ke.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new ke("Unknown option " + l, ke.ERR_BAD_OPTION);
  }
}
const uc = { assertOptions: Z_, validators: Xc },
  ln = uc.validators;
let js = class {
  constructor(t) {
    ((this.defaults = t || {}),
      (this.interceptors = { request: new Vv(), response: new Vv() }));
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (s) {
      if (s instanceof Error) {
        let i = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(i)
          : (i = new Error());
        const l = i.stack ? i.stack.replace(/^.+\n/, "") : "";
        try {
          s.stack
            ? l &&
              !String(s.stack).endsWith(l.replace(/^.+\n.+\n/, "")) &&
              (s.stack +=
                `
` + l)
            : (s.stack = l);
        } catch {}
      }
      throw s;
    }
  }
  _request(t, n) {
    (typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = Ds(this.defaults, n)));
    const { transitional: s, paramsSerializer: i, headers: l } = n;
    (s !== void 0 &&
      uc.assertOptions(
        s,
        {
          silentJSONParsing: ln.transitional(ln.boolean),
          forcedJSONParsing: ln.transitional(ln.boolean),
          clarifyTimeoutError: ln.transitional(ln.boolean),
          legacyInterceptorReqResOrdering: ln.transitional(ln.boolean),
        },
        !1,
      ),
      i != null &&
        (z.isFunction(i)
          ? (n.paramsSerializer = { serialize: i })
          : uc.assertOptions(
              i,
              { encode: ln.function, serialize: ln.function },
              !0,
            )),
      n.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (n.allowAbsoluteUrls = !0)),
      uc.assertOptions(
        n,
        {
          baseUrl: ln.spelling("baseURL"),
          withXsrfToken: ln.spelling("withXSRFToken"),
        },
        !0,
      ),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase()));
    let c = l && z.merge(l.common, l[n.method]);
    (l &&
      z.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (E) => {
          delete l[E];
        },
      ),
      (n.headers = Wt.concat(c, l)));
    const u = [];
    let f = !0;
    this.interceptors.request.forEach(function (v) {
      if (typeof v.runWhen == "function" && v.runWhen(n) === !1) return;
      f = f && v.synchronous;
      const x = n.transitional || ap;
      x && x.legacyInterceptorReqResOrdering
        ? u.unshift(v.fulfilled, v.rejected)
        : u.push(v.fulfilled, v.rejected);
    });
    const h = [];
    this.interceptors.response.forEach(function (v) {
      h.push(v.fulfilled, v.rejected);
    });
    let m,
      y = 0,
      w;
    if (!f) {
      const E = [Yv.bind(this), void 0];
      for (
        E.unshift(...u), E.push(...h), w = E.length, m = Promise.resolve(n);
        y < w;
      )
        m = m.then(E[y++], E[y++]);
      return m;
    }
    w = u.length;
    let C = n;
    for (; y < w; ) {
      const E = u[y++],
        v = u[y++];
      try {
        C = E(C);
      } catch (x) {
        v.call(this, x);
        break;
      }
    }
    try {
      m = Yv.call(this, C);
    } catch (E) {
      return Promise.reject(E);
    }
    for (y = 0, w = h.length; y < w; ) m = m.then(h[y++], h[y++]);
    return m;
  }
  getUri(t) {
    t = Ds(this.defaults, t);
    const n = kS(t.baseURL, t.url, t.allowAbsoluteUrls);
    return SS(n, t.params, t.paramsSerializer);
  }
};
z.forEach(["delete", "get", "head", "options"], function (t) {
  js.prototype[t] = function (n, s) {
    return this.request(
      Ds(s || {}, { method: t, url: n, data: (s || {}).data }),
    );
  };
});
z.forEach(["post", "put", "patch"], function (t) {
  function n(s) {
    return function (l, c, u) {
      return this.request(
        Ds(u || {}, {
          method: t,
          headers: s ? { "Content-Type": "multipart/form-data" } : {},
          url: l,
          data: c,
        }),
      );
    };
  }
  ((js.prototype[t] = n()), (js.prototype[t + "Form"] = n(!0)));
});
let eN = class _S {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (l) {
      n = l;
    });
    const s = this;
    (this.promise.then((i) => {
      if (!s._listeners) return;
      let l = s._listeners.length;
      for (; l-- > 0; ) s._listeners[l](i);
      s._listeners = null;
    }),
      (this.promise.then = (i) => {
        let l;
        const c = new Promise((u) => {
          (s.subscribe(u), (l = u));
        }).then(i);
        return (
          (c.cancel = function () {
            s.unsubscribe(l);
          }),
          c
        );
      }),
      t(function (l, c, u) {
        s.reason || ((s.reason = new Ca(l, c, u)), n(s.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(),
      n = (s) => {
        t.abort(s);
      };
    return (
      this.subscribe(n),
      (t.signal.unsubscribe = () => this.unsubscribe(n)),
      t.signal
    );
  }
  static source() {
    let t;
    return {
      token: new _S(function (i) {
        t = i;
      }),
      cancel: t,
    };
  }
};
function tN(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function nN(e) {
  return z.isObject(e) && e.isAxiosError === !0;
}
const ph = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};
Object.entries(ph).forEach(([e, t]) => {
  ph[t] = e;
});
function NS(e) {
  const t = new js(e),
    n = uS(js.prototype.request, t);
  return (
    z.extend(n, js.prototype, t, { allOwnKeys: !0 }),
    z.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (i) {
      return NS(Ds(e, i));
    }),
    n
  );
}
const st = NS(Ea);
st.Axios = js;
st.CanceledError = Ca;
st.CancelToken = eN;
st.isCancel = ES;
st.VERSION = AS;
st.toFormData = Yc;
st.AxiosError = ke;
st.Cancel = st.CanceledError;
st.all = function (t) {
  return Promise.all(t);
};
st.spread = tN;
st.isAxiosError = nN;
st.mergeConfig = Ds;
st.AxiosHeaders = Wt;
st.formToJSON = (e) => bS(z.isHTMLForm(e) ? new FormData(e) : e);
st.getAdapter = RS.getAdapter;
st.HttpStatusCode = ph;
st.default = st;
const {
    Axios: q4,
    AxiosError: K4,
    CanceledError: Q4,
    isCancel: G4,
    CancelToken: Y4,
    VERSION: X4,
    all: J4,
    Cancel: Z4,
    isAxiosError: eB,
    spread: tB,
    toFormData: nB,
    AxiosHeaders: rB,
    HttpStatusCode: sB,
    formToJSON: oB,
    getAdapter: iB,
    mergeConfig: aB,
  } = st,
  rN = typeof window > "u",
  Jv = !rN && window.self !== window.top,
  wf = () =>
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15),
  xt = [];
for (let e = 0; e < 256; ++e) xt.push((e + 256).toString(16).slice(1));
function sN(e, t = 0) {
  return (
    xt[e[t + 0]] +
    xt[e[t + 1]] +
    xt[e[t + 2]] +
    xt[e[t + 3]] +
    "-" +
    xt[e[t + 4]] +
    xt[e[t + 5]] +
    "-" +
    xt[e[t + 6]] +
    xt[e[t + 7]] +
    "-" +
    xt[e[t + 8]] +
    xt[e[t + 9]] +
    "-" +
    xt[e[t + 10]] +
    xt[e[t + 11]] +
    xt[e[t + 12]] +
    xt[e[t + 13]] +
    xt[e[t + 14]] +
    xt[e[t + 15]]
  ).toLowerCase();
}
let xf;
const oN = new Uint8Array(16);
function iN() {
  if (!xf) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
      );
    xf = crypto.getRandomValues.bind(crypto);
  }
  return xf(oN);
}
const aN =
    typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
  Zv = { randomUUID: aN };
function lN(e, t, n) {
  var i;
  e = e || {};
  const s = e.random ?? ((i = e.rng) == null ? void 0 : i.call(e)) ?? iN();
  if (s.length < 16) throw new Error("Random bytes length must be >= 16");
  return ((s[6] = (s[6] & 15) | 64), (s[8] = (s[8] & 63) | 128), sN(s));
}
function cN(e, t, n) {
  return Zv.randomUUID && !e ? Zv.randomUUID() : lN(e);
}
class uN extends Error {
  constructor(t, n, s, i, l) {
    (super(t),
      (this.name = "NanofusionError"),
      (this.status = n),
      (this.code = s),
      (this.data = i),
      (this.originalError = l));
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      code: this.code,
      data: this.data,
    };
  }
}
function Hi({
  baseURL: e,
  headers: t = {},
  token: n,
  interceptResponses: s = !0,
  onError: i,
}) {
  const l = st.create({
    baseURL: e,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...t,
    },
  });
  return (
    n && (l.defaults.headers.common.Authorization = `Bearer ${n}`),
    l.interceptors.request.use((c) => {
      typeof window < "u" &&
        c.headers.set("X-Origin-URL", window.location.href);
      const u = cN();
      if (((c.requestId = u), Jv))
        try {
          window.parent.postMessage(
            {
              type: "api-request-start",
              requestId: u,
              data: {
                url: e + c.url,
                method: c.method,
                body: c.data instanceof FormData ? "[FormData object]" : c.data,
              },
            },
            "*",
          );
        } catch {}
      return c;
    }),
    s &&
      l.interceptors.response.use(
        (c) => {
          var u;
          const f =
            (u = c.config) === null || u === void 0 ? void 0 : u.requestId;
          try {
            Jv &&
              f &&
              window.parent.postMessage(
                {
                  type: "api-request-end",
                  requestId: f,
                  data: { statusCode: c.status, response: c.data },
                },
                "*",
              );
          } catch {}
          return c.data;
        },
        (c) => {
          var u, f, h, m, y, w, C, E;
          const v =
              ((f =
                (u = c.response) === null || u === void 0 ? void 0 : u.data) ===
                null || f === void 0
                ? void 0
                : f.message) ||
              ((m =
                (h = c.response) === null || h === void 0 ? void 0 : h.data) ===
                null || m === void 0
                ? void 0
                : m.detail) ||
              c.message,
            x = new uN(
              v,
              (y = c.response) === null || y === void 0 ? void 0 : y.status,
              (C =
                (w = c.response) === null || w === void 0 ? void 0 : w.data) ===
                null || C === void 0
                ? void 0
                : C.code,
              (E = c.response) === null || E === void 0 ? void 0 : E.data,
              c,
            );
          return (i == null || i(x), Promise.reject(x));
        },
      ),
    l
  );
}
function e0(e) {
  const { axios: t, appId: n, getSocket: s } = e;
  return new Proxy(
    {},
    {
      get(i, l) {
        if (!(typeof l != "string" || l === "then" || l.startsWith("_")))
          return fN(t, n, l, s);
      },
    },
  );
}
function dN(e) {
  var t;
  try {
    const n = JSON.parse(e);
    return {
      type: n.type,
      data: n.data,
      id: n.id || ((t = n.data) === null || t === void 0 ? void 0 : t.id),
      timestamp: n.timestamp || new Date().toISOString(),
    };
  } catch (n) {
    return (
      console.warn("[NANOfusion SDK] Failed to parse realtime message:", n),
      null
    );
  }
}
function fN(e, t, n, s) {
  const i = `/apps/${t}/entities/${n}`;
  return {
    async list(l, c, u, f) {
      const h = {};
      return (
        l && (h.sort = l),
        c && (h.limit = c),
        u && (h.skip = u),
        f && (h.fields = Array.isArray(f) ? f.join(",") : f),
        e.get(i, { params: h })
      );
    },
    async filter(l, c, u, f, h) {
      const m = { q: JSON.stringify(l) };
      return (
        c && (m.sort = c),
        u && (m.limit = u),
        f && (m.skip = f),
        h && (m.fields = Array.isArray(h) ? h.join(",") : h),
        e.get(i, { params: m })
      );
    },
    async get(l) {
      return e.get(`${i}/${l}`);
    },
    async create(l) {
      return e.post(i, l);
    },
    async update(l, c) {
      return e.put(`${i}/${l}`, c);
    },
    async delete(l) {
      return e.delete(`${i}/${l}`);
    },
    async deleteMany(l) {
      return e.delete(i, { data: l });
    },
    async bulkCreate(l) {
      return e.post(`${i}/bulk`, l);
    },
    async updateMany(l, c) {
      return e.patch(`${i}/update-many`, { query: l, data: c });
    },
    async bulkUpdate(l) {
      return e.put(`${i}/bulk`, l);
    },
    async importEntities(l) {
      const c = new FormData();
      return (
        c.append("file", l, l.name),
        e.post(`${i}/import`, c, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      );
    },
    subscribe(l) {
      const c = `entities:${t}:${n}`;
      return s().subscribeToRoom(c, {
        update_model: (h) => {
          const m = dN(h.data);
          if (m)
            try {
              l(m);
            } catch (y) {
              console.error("[NANOfusion SDK] Subscription callback error:", y);
            }
        },
      });
    },
  };
}
function hN(e, t) {
  return {
    async call(n, s, i) {
      if (!(n != null && n.trim()))
        throw new Error("Integration slug is required and cannot be empty");
      if (!(s != null && s.trim()))
        throw new Error("Operation ID is required and cannot be empty");
      const { pathParams: l, queryParams: c, ...u } = i ?? {},
        f = {
          ...u,
          ...(l && { path_params: l }),
          ...(c && { query_params: c }),
        };
      return await e.post(`/apps/${t}/integrations/custom/${n}/${s}`, f);
    },
  };
}
function t0(e, t) {
  const n = hN(e, t);
  return new Proxy(
    {},
    {
      get(s, i) {
        if (!(typeof i != "string" || i === "then" || i.startsWith("_")))
          return i === "custom"
            ? n
            : new Proxy(
                {},
                {
                  get(l, c) {
                    if (
                      !(
                        typeof c != "string" ||
                        c === "then" ||
                        c.startsWith("_")
                      )
                    )
                      return async (u) => {
                        if (typeof u == "string")
                          throw new Error(
                            `Integration ${c} must receive an object with named parameters, received: ${u}`,
                          );
                        let f, h;
                        return (
                          u instanceof FormData ||
                          (u && Object.values(u).some((m) => m instanceof File))
                            ? ((f = new FormData()),
                              Object.keys(u).forEach((m) => {
                                u[m] instanceof File
                                  ? f.append(m, u[m], u[m].name)
                                  : typeof u[m] == "object" && u[m] !== null
                                    ? f.append(m, JSON.stringify(u[m]))
                                    : f.append(m, u[m]);
                              }),
                              (h = "multipart/form-data"))
                            : ((f = u), (h = "application/json")),
                          i === "Core"
                            ? e.post(
                                `/apps/${t}/integration-endpoints/Core/${c}`,
                                f || u,
                                { headers: { "Content-Type": h } },
                              )
                            : e.post(
                                `/apps/${t}/integration-endpoints/installable/${i}/integration-endpoints/${c}`,
                                f || u,
                                { headers: { "Content-Type": h } },
                              )
                        );
                      };
                  },
                },
              );
      },
    },
  );
}
function pN(e, t, n, s) {
  return {
    async me() {
      return e.get(`/apps/${n}/entities/User/me`);
    },
    async updateMe(i) {
      return e.put(`/apps/${n}/entities/User/me`, i);
    },
    redirectToLogin(i) {
      if (typeof window > "u")
        throw new Error(
          "Login method can only be used in a browser environment",
        );
      const l = i
          ? new URL(i, window.location.origin).toString()
          : window.location.href,
        c = `${s.appBaseUrl}/login?from_url=${encodeURIComponent(l)}`;
      window.location.href = c;
    },
    loginWithProvider(i, l = "/") {
      const c = new URL(l, window.location.origin).toString(),
        u = `app_id=${n}&from_url=${encodeURIComponent(c)}`;
      let f;
      i === "sso"
        ? (f = `/apps/${n}/auth/sso/login`)
        : (f = `/apps/auth${i === "google" ? "" : `/${i}`}/login`);
      const h = `${s.appBaseUrl}/api${f}?${u}`;
      window.location.href = h;
    },
    logout(i) {
      if (
        (delete e.defaults.headers.common.Authorization, typeof window < "u")
      ) {
        if (window.localStorage)
          try {
            (window.localStorage.removeItem("nanofusion_access_token"),
              window.localStorage.removeItem("token"));
          } catch (u) {
            console.error("Failed to remove token from localStorage:", u);
          }
        const l = i || window.location.href,
          c = `${s.appBaseUrl}/api/apps/auth/logout?from_url=${encodeURIComponent(l)}`;
        window.location.href = c;
      }
    },
    setToken(i, l = !0) {
      if (
        i &&
        ((e.defaults.headers.common.Authorization = `Bearer ${i}`),
        (t.defaults.headers.common.Authorization = `Bearer ${i}`),
        l && typeof window < "u" && window.localStorage)
      )
        try {
          (window.localStorage.setItem("nanofusion_access_token", i),
            window.localStorage.setItem("token", i));
        } catch (c) {
          console.error("Failed to save token to localStorage:", c);
        }
    },
    async loginViaEmailPassword(i, l, c) {
      var u;
      try {
        const f = await e.post(`/apps/${n}/auth/login`, {
            email: i,
            password: l,
            ...(c && { turnstile_token: c }),
          }),
          { access_token: h, user: m } = f;
        return (h && this.setToken(h), { access_token: h, user: m });
      } catch (f) {
        throw (
          ((u = f.response) === null || u === void 0 ? void 0 : u.status) ===
            401 && (await this.logout()),
          f
        );
      }
    },
    async isAuthenticated() {
      try {
        return (await this.me(), !0);
      } catch {
        return !1;
      }
    },
    inviteUser(i, l) {
      return e.post(`/apps/${n}/users/invite-user`, { user_email: i, role: l });
    },
    register(i) {
      return e.post(`/apps/${n}/auth/register`, i);
    },
    verifyOtp({ email: i, otpCode: l }) {
      return e.post(`/apps/${n}/auth/verify-otp`, { email: i, otp_code: l });
    },
    resendOtp(i) {
      return e.post(`/apps/${n}/auth/resend-otp`, { email: i });
    },
    resetPasswordRequest(i) {
      return e.post(`/apps/${n}/auth/reset-password-request`, { email: i });
    },
    resetPassword({ resetToken: i, newPassword: l }) {
      return e.post(`/apps/${n}/auth/reset-password`, {
        reset_token: i,
        new_password: l,
      });
    },
    changePassword({ userId: i, currentPassword: l, newPassword: c }) {
      return e.post(`/apps/${n}/auth/change-password`, {
        user_id: i,
        current_password: l,
        new_password: c,
      });
    },
  };
}
function mN(e, t) {
  return {
    async getAccessToken(n) {
      const s = `/apps/${t}/auth/sso/accesstoken/${n}`;
      return e.get(s);
    },
  };
}
function gN(e, t) {
  return {
    async getAccessToken(n) {
      if (!n || typeof n != "string")
        throw new Error("Integration type is required and must be a string");
      return (await e.get(`/apps/${t}/external-auth/tokens/${n}`)).access_token;
    },
    async getConnection(n) {
      var s;
      if (!n || typeof n != "string")
        throw new Error("Integration type is required and must be a string");
      const l = await e.get(`/apps/${t}/external-auth/tokens/${n}`);
      return {
        accessToken: l.access_token,
        connectionConfig:
          (s = l.connection_config) !== null && s !== void 0 ? s : null,
      };
    },
    async getCurrentAppUserAccessToken(n) {
      if (!n || typeof n != "string")
        throw new Error("Connector ID is required and must be a string");
      return (await e.get(`/apps/${t}/app-user-auth/connectors/${n}/token`))
        .access_token;
    },
  };
}
function yN(e, t) {
  return {
    async connectAppUser(n) {
      if (!n || typeof n != "string")
        throw new Error("Connector ID is required and must be a string");
      return (await e.post(`/apps/${t}/app-user-auth/connectors/${n}/initiate`))
        .redirect_url;
    },
    async disconnectAppUser(n) {
      if (!n || typeof n != "string")
        throw new Error("Connector ID is required and must be a string");
      await e.delete(`/apps/${t}/app-user-auth/connectors/${n}`);
    },
  };
}
function Rc(e = {}) {
  const {
    storageKey: t = "base44_access_token",
    paramName: n = "access_token",
    saveToStorage: s = !0,
    removeFromUrl: i = !0,
  } = e;
  let l = null;
  if (typeof window < "u" && window.location)
    try {
      const c = new URLSearchParams(window.location.search);
      if (((l = c.get(n)), l)) {
        if ((s && vN(l, { storageKey: t }), i)) {
          c.delete(n);
          const u = `${window.location.pathname}${c.toString() ? `?${c.toString()}` : ""}${window.location.hash}`;
          window.history.replaceState({}, document.title, u);
        }
        return l;
      }
    } catch (c) {
      console.error("Error retrieving token from URL:", c);
    }
  if (typeof window < "u" && window.localStorage)
    try {
      return ((l = window.localStorage.getItem(t)), l);
    } catch (c) {
      console.error("Error retrieving token from local storage:", c);
    }
  return null;
}
function vN(e, t) {
  const { storageKey: n = "base44_access_token" } = t;
  if (typeof window > "u" || !window.localStorage || !e) return !1;
  try {
    return (
      window.localStorage.setItem(n, e),
      window.localStorage.setItem("token", e),
      !0
    );
  } catch (s) {
    return (console.error("Error saving token to local storage:", s), !1);
  }
}
function n0(e, t, n) {
  const s = (l, c) => (l ? `${String(l).replace(/\/$/, "")}${c}` : c),
    i = (l) => {
      const c = new Headers();
      if (n != null && n.getAuthHeaders) {
        const u = n.getAuthHeaders();
        Object.entries(u).forEach(([f, h]) => {
          h != null && c.set(f, String(h));
        });
      }
      return (
        l &&
          new Headers(l).forEach((u, f) => {
            c.set(f, u);
          }),
        c
      );
    };
  return {
    async invoke(l, c) {
      if (typeof c == "string")
        throw new Error(
          `Function ${l} must receive an object with named parameters, received: ${c}`,
        );
      let u, f;
      return (
        c instanceof FormData ||
        (c && Object.values(c).some((h) => h instanceof File))
          ? ((u = new FormData()),
            Object.keys(c).forEach((h) => {
              c[h] instanceof File
                ? u.append(h, c[h], c[h].name)
                : typeof c[h] == "object" && c[h] !== null
                  ? u.append(h, JSON.stringify(c[h]))
                  : u.append(h, c[h]);
            }),
            (f = "multipart/form-data"))
          : ((u = c), (f = "application/json")),
        e.post(`/apps/${t}/functions/${l}`, u || c, {
          headers: { "Content-Type": f },
        })
      );
    },
    async fetch(l, c = {}) {
      const f = `/functions${l.startsWith("/") ? l : `/${l}`}`,
        h = i(c.headers),
        m = { ...c, headers: h };
      return await fetch(s(n == null ? void 0 : n.baseURL, f), m);
    },
  };
}
function r0({ axios: e, getSocket: t, appId: n, serverUrl: s, token: i }) {
  const l = `/apps/${n}/agents`,
    c = {},
    u = () => e.get(`${l}/conversations`),
    f = (E) => e.get(`${l}/conversations/${E}`);
  return {
    getConversations: u,
    getConversation: f,
    listConversations: (E) => e.get(`${l}/conversations`, { params: E }),
    createConversation: (E) => e.post(`${l}/conversations`, E),
    addMessage: async (E, v) =>
      e.post(`${l}/conversations/v2/${E.id}/messages`, v),
    subscribeToConversation: (E, v) => {
      const x = `/agent-conversations/${E}`,
        T = t(),
        P = f(E).then((R) => ((c[E] = R), R));
      return T.subscribeToRoom(x, {
        connect: () => {},
        update_model: async ({ data: R }) => {
          const _ = JSON.parse(R);
          if (_._message) {
            await P;
            const M = _._message,
              V = c[E];
            if (V) {
              const U = V.messages || [],
                D = U.findIndex((J) => J.id === M.id),
                Q = D !== -1 ? U.map((J, ee) => (ee === D ? M : J)) : [...U, M];
              ((c[E] = { ...V, messages: Q }), v == null || v(c[E]));
            }
          }
        },
      });
    },
    getWhatsAppConnectURL: (E) => {
      const v = `${s}/api/apps/${n}/agents/${encodeURIComponent(E)}/whatsapp`,
        x = i ?? Rc();
      return x ? `${v}?token=${x}` : v;
    },
  };
}
function s0(e, t) {
  const n = `/app-logs/${t}`;
  return {
    async logUserInApp(s) {
      await e.post(`${n}/log-user-in-app/${s}`);
    },
    async fetchLogs(s = {}) {
      return await e.get(n, { params: s });
    },
    async getStats(s = {}) {
      return await e.get(`${n}/stats`, { params: s });
    },
  };
}
function wN(e, t) {
  return {
    async inviteUser(n, s) {
      if (s !== "user" && s !== "admin")
        throw new Error(
          `Invalid role: "${s}". Role must be either "user" or "admin".`,
        );
      return await e.post(`/apps/${t}/runtime/users/invite-user`, {
        user_email: n,
        role: s,
      });
    },
  };
}
const Wn = Object.create(null);
Wn.open = "0";
Wn.close = "1";
Wn.ping = "2";
Wn.pong = "3";
Wn.message = "4";
Wn.upgrade = "5";
Wn.noop = "6";
const dc = Object.create(null);
Object.keys(Wn).forEach((e) => {
  dc[Wn[e]] = e;
});
const mh = { type: "error", data: "parser error" },
  OS =
    typeof Blob == "function" ||
    (typeof Blob < "u" &&
      Object.prototype.toString.call(Blob) === "[object BlobConstructor]"),
  jS = typeof ArrayBuffer == "function",
  LS = (e) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(e)
      : e && e.buffer instanceof ArrayBuffer,
  up = ({ type: e, data: t }, n, s) =>
    OS && t instanceof Blob
      ? n
        ? s(t)
        : o0(t, s)
      : jS && (t instanceof ArrayBuffer || LS(t))
        ? n
          ? s(t)
          : o0(new Blob([t]), s)
        : s(Wn[e] + (t || "")),
  o0 = (e, t) => {
    const n = new FileReader();
    return (
      (n.onload = function () {
        const s = n.result.split(",")[1];
        t("b" + (s || ""));
      }),
      n.readAsDataURL(e)
    );
  };
function i0(e) {
  return e instanceof Uint8Array
    ? e
    : e instanceof ArrayBuffer
      ? new Uint8Array(e)
      : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
let Sf;
function xN(e, t) {
  if (OS && e.data instanceof Blob)
    return e.data.arrayBuffer().then(i0).then(t);
  if (jS && (e.data instanceof ArrayBuffer || LS(e.data))) return t(i0(e.data));
  up(e, !1, (n) => {
    (Sf || (Sf = new TextEncoder()), t(Sf.encode(n)));
  });
}
const a0 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  qi = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < a0.length; e++) qi[a0.charCodeAt(e)] = e;
const SN = (e) => {
    let t = e.length * 0.75,
      n = e.length,
      s,
      i = 0,
      l,
      c,
      u,
      f;
    e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
    const h = new ArrayBuffer(t),
      m = new Uint8Array(h);
    for (s = 0; s < n; s += 4)
      ((l = qi[e.charCodeAt(s)]),
        (c = qi[e.charCodeAt(s + 1)]),
        (u = qi[e.charCodeAt(s + 2)]),
        (f = qi[e.charCodeAt(s + 3)]),
        (m[i++] = (l << 2) | (c >> 4)),
        (m[i++] = ((c & 15) << 4) | (u >> 2)),
        (m[i++] = ((u & 3) << 6) | (f & 63)));
    return h;
  },
  bN = typeof ArrayBuffer == "function",
  dp = (e, t) => {
    if (typeof e != "string") return { type: "message", data: MS(e, t) };
    const n = e.charAt(0);
    return n === "b"
      ? { type: "message", data: EN(e.substring(1), t) }
      : dc[n]
        ? e.length > 1
          ? { type: dc[n], data: e.substring(1) }
          : { type: dc[n] }
        : mh;
  },
  EN = (e, t) => {
    if (bN) {
      const n = SN(e);
      return MS(n, t);
    } else return { base64: !0, data: e };
  },
  MS = (e, t) => {
    switch (t) {
      case "blob":
        return e instanceof Blob ? e : new Blob([e]);
      case "arraybuffer":
      default:
        return e instanceof ArrayBuffer ? e : e.buffer;
    }
  },
  DS = "",
  CN = (e, t) => {
    const n = e.length,
      s = new Array(n);
    let i = 0;
    e.forEach((l, c) => {
      up(l, !1, (u) => {
        ((s[c] = u), ++i === n && t(s.join(DS)));
      });
    });
  },
  kN = (e, t) => {
    const n = e.split(DS),
      s = [];
    for (let i = 0; i < n.length; i++) {
      const l = dp(n[i], t);
      if ((s.push(l), l.type === "error")) break;
    }
    return s;
  };
function TN() {
  return new TransformStream({
    transform(e, t) {
      xN(e, (n) => {
        const s = n.length;
        let i;
        if (s < 126)
          ((i = new Uint8Array(1)), new DataView(i.buffer).setUint8(0, s));
        else if (s < 65536) {
          i = new Uint8Array(3);
          const l = new DataView(i.buffer);
          (l.setUint8(0, 126), l.setUint16(1, s));
        } else {
          i = new Uint8Array(9);
          const l = new DataView(i.buffer);
          (l.setUint8(0, 127), l.setBigUint64(1, BigInt(s)));
        }
        (e.data && typeof e.data != "string" && (i[0] |= 128),
          t.enqueue(i),
          t.enqueue(n));
      });
    },
  });
}
let bf;
function Ql(e) {
  return e.reduce((t, n) => t + n.length, 0);
}
function Gl(e, t) {
  if (e[0].length === t) return e.shift();
  const n = new Uint8Array(t);
  let s = 0;
  for (let i = 0; i < t; i++)
    ((n[i] = e[0][s++]), s === e[0].length && (e.shift(), (s = 0)));
  return (e.length && s < e[0].length && (e[0] = e[0].slice(s)), n);
}
function PN(e, t) {
  bf || (bf = new TextDecoder());
  const n = [];
  let s = 0,
    i = -1,
    l = !1;
  return new TransformStream({
    transform(c, u) {
      for (n.push(c); ; ) {
        if (s === 0) {
          if (Ql(n) < 1) break;
          const f = Gl(n, 1);
          ((l = (f[0] & 128) === 128),
            (i = f[0] & 127),
            i < 126 ? (s = 3) : i === 126 ? (s = 1) : (s = 2));
        } else if (s === 1) {
          if (Ql(n) < 2) break;
          const f = Gl(n, 2);
          ((i = new DataView(f.buffer, f.byteOffset, f.length).getUint16(0)),
            (s = 3));
        } else if (s === 2) {
          if (Ql(n) < 8) break;
          const f = Gl(n, 8),
            h = new DataView(f.buffer, f.byteOffset, f.length),
            m = h.getUint32(0);
          if (m > Math.pow(2, 21) - 1) {
            u.enqueue(mh);
            break;
          }
          ((i = m * Math.pow(2, 32) + h.getUint32(4)), (s = 3));
        } else {
          if (Ql(n) < i) break;
          const f = Gl(n, i);
          (u.enqueue(dp(l ? f : bf.decode(f), t)), (s = 0));
        }
        if (i === 0 || i > e) {
          u.enqueue(mh);
          break;
        }
      }
    },
  });
}
const IS = 4;
function it(e) {
  if (e) return RN(e);
}
function RN(e) {
  for (var t in it.prototype) e[t] = it.prototype[t];
  return e;
}
it.prototype.on = it.prototype.addEventListener = function (e, t) {
  return (
    (this._callbacks = this._callbacks || {}),
    (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t),
    this
  );
};
it.prototype.once = function (e, t) {
  function n() {
    (this.off(e, n), t.apply(this, arguments));
  }
  return ((n.fn = t), this.on(e, n), this);
};
it.prototype.off =
  it.prototype.removeListener =
  it.prototype.removeAllListeners =
  it.prototype.removeEventListener =
    function (e, t) {
      if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
        return ((this._callbacks = {}), this);
      var n = this._callbacks["$" + e];
      if (!n) return this;
      if (arguments.length == 1) return (delete this._callbacks["$" + e], this);
      for (var s, i = 0; i < n.length; i++)
        if (((s = n[i]), s === t || s.fn === t)) {
          n.splice(i, 1);
          break;
        }
      return (n.length === 0 && delete this._callbacks["$" + e], this);
    };
it.prototype.emit = function (e) {
  this._callbacks = this._callbacks || {};
  for (
    var t = new Array(arguments.length - 1),
      n = this._callbacks["$" + e],
      s = 1;
    s < arguments.length;
    s++
  )
    t[s - 1] = arguments[s];
  if (n) {
    n = n.slice(0);
    for (var s = 0, i = n.length; s < i; ++s) n[s].apply(this, t);
  }
  return this;
};
it.prototype.emitReserved = it.prototype.emit;
it.prototype.listeners = function (e) {
  return (
    (this._callbacks = this._callbacks || {}),
    this._callbacks["$" + e] || []
  );
};
it.prototype.hasListeners = function (e) {
  return !!this.listeners(e).length;
};
const Jc =
    typeof Promise == "function" && typeof Promise.resolve == "function"
      ? (t) => Promise.resolve().then(t)
      : (t, n) => n(t, 0),
  hn =
    typeof self < "u"
      ? self
      : typeof window < "u"
        ? window
        : Function("return this")(),
  AN = "arraybuffer";
function FS(e, ...t) {
  return t.reduce((n, s) => (e.hasOwnProperty(s) && (n[s] = e[s]), n), {});
}
const _N = hn.setTimeout,
  NN = hn.clearTimeout;
function Zc(e, t) {
  t.useNativeTimers
    ? ((e.setTimeoutFn = _N.bind(hn)), (e.clearTimeoutFn = NN.bind(hn)))
    : ((e.setTimeoutFn = hn.setTimeout.bind(hn)),
      (e.clearTimeoutFn = hn.clearTimeout.bind(hn)));
}
const ON = 1.33;
function jN(e) {
  return typeof e == "string"
    ? LN(e)
    : Math.ceil((e.byteLength || e.size) * ON);
}
function LN(e) {
  let t = 0,
    n = 0;
  for (let s = 0, i = e.length; s < i; s++)
    ((t = e.charCodeAt(s)),
      t < 128
        ? (n += 1)
        : t < 2048
          ? (n += 2)
          : t < 55296 || t >= 57344
            ? (n += 3)
            : (s++, (n += 4)));
  return n;
}
function VS() {
  return (
    Date.now().toString(36).substring(3) +
    Math.random().toString(36).substring(2, 5)
  );
}
function MN(e) {
  let t = "";
  for (let n in e)
    e.hasOwnProperty(n) &&
      (t.length && (t += "&"),
      (t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n])));
  return t;
}
function DN(e) {
  let t = {},
    n = e.split("&");
  for (let s = 0, i = n.length; s < i; s++) {
    let l = n[s].split("=");
    t[decodeURIComponent(l[0])] = decodeURIComponent(l[1]);
  }
  return t;
}
class IN extends Error {
  constructor(t, n, s) {
    (super(t),
      (this.description = n),
      (this.context = s),
      (this.type = "TransportError"));
  }
}
class fp extends it {
  constructor(t) {
    (super(),
      (this.writable = !1),
      Zc(this, t),
      (this.opts = t),
      (this.query = t.query),
      (this.socket = t.socket),
      (this.supportsBinary = !t.forceBase64));
  }
  onError(t, n, s) {
    return (super.emitReserved("error", new IN(t, n, s)), this);
  }
  open() {
    return ((this.readyState = "opening"), this.doOpen(), this);
  }
  close() {
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        (this.doClose(), this.onClose()),
      this
    );
  }
  send(t) {
    this.readyState === "open" && this.write(t);
  }
  onOpen() {
    ((this.readyState = "open"),
      (this.writable = !0),
      super.emitReserved("open"));
  }
  onData(t) {
    const n = dp(t, this.socket.binaryType);
    this.onPacket(n);
  }
  onPacket(t) {
    super.emitReserved("packet", t);
  }
  onClose(t) {
    ((this.readyState = "closed"), super.emitReserved("close", t));
  }
  pause(t) {}
  createUri(t, n = {}) {
    return (
      t +
      "://" +
      this._hostname() +
      this._port() +
      this.opts.path +
      this._query(n)
    );
  }
  _hostname() {
    const t = this.opts.hostname;
    return t.indexOf(":") === -1 ? t : "[" + t + "]";
  }
  _port() {
    return this.opts.port &&
      ((this.opts.secure && Number(this.opts.port) !== 443) ||
        (!this.opts.secure && Number(this.opts.port) !== 80))
      ? ":" + this.opts.port
      : "";
  }
  _query(t) {
    const n = MN(t);
    return n.length ? "?" + n : "";
  }
}
class FN extends fp {
  constructor() {
    (super(...arguments), (this._polling = !1));
  }
  get name() {
    return "polling";
  }
  doOpen() {
    this._poll();
  }
  pause(t) {
    this.readyState = "pausing";
    const n = () => {
      ((this.readyState = "paused"), t());
    };
    if (this._polling || !this.writable) {
      let s = 0;
      (this._polling &&
        (s++,
        this.once("pollComplete", function () {
          --s || n();
        })),
        this.writable ||
          (s++,
          this.once("drain", function () {
            --s || n();
          })));
    } else n();
  }
  _poll() {
    ((this._polling = !0), this.doPoll(), this.emitReserved("poll"));
  }
  onData(t) {
    const n = (s) => {
      if (
        (this.readyState === "opening" && s.type === "open" && this.onOpen(),
        s.type === "close")
      )
        return (
          this.onClose({ description: "transport closed by the server" }),
          !1
        );
      this.onPacket(s);
    };
    (kN(t, this.socket.binaryType).forEach(n),
      this.readyState !== "closed" &&
        ((this._polling = !1),
        this.emitReserved("pollComplete"),
        this.readyState === "open" && this._poll()));
  }
  doClose() {
    const t = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? t() : this.once("open", t);
  }
  write(t) {
    ((this.writable = !1),
      CN(t, (n) => {
        this.doWrite(n, () => {
          ((this.writable = !0), this.emitReserved("drain"));
        });
      }));
  }
  uri() {
    const t = this.opts.secure ? "https" : "http",
      n = this.query || {};
    return (
      this.opts.timestampRequests !== !1 &&
        (n[this.opts.timestampParam] = VS()),
      !this.supportsBinary && !n.sid && (n.b64 = 1),
      this.createUri(t, n)
    );
  }
}
let BS = !1;
try {
  BS = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {}
const VN = BS;
function BN() {}
class UN extends FN {
  constructor(t) {
    if ((super(t), typeof location < "u")) {
      const n = location.protocol === "https:";
      let s = location.port;
      (s || (s = n ? "443" : "80"),
        (this.xd =
          (typeof location < "u" && t.hostname !== location.hostname) ||
          s !== t.port));
    }
  }
  doWrite(t, n) {
    const s = this.request({ method: "POST", data: t });
    (s.on("success", n),
      s.on("error", (i, l) => {
        this.onError("xhr post error", i, l);
      }));
  }
  doPoll() {
    const t = this.request();
    (t.on("data", this.onData.bind(this)),
      t.on("error", (n, s) => {
        this.onError("xhr poll error", n, s);
      }),
      (this.pollXhr = t));
  }
}
class Bn extends it {
  constructor(t, n, s) {
    (super(),
      (this.createRequest = t),
      Zc(this, s),
      (this._opts = s),
      (this._method = s.method || "GET"),
      (this._uri = n),
      (this._data = s.data !== void 0 ? s.data : null),
      this._create());
  }
  _create() {
    var t;
    const n = FS(
      this._opts,
      "agent",
      "pfx",
      "key",
      "passphrase",
      "cert",
      "ca",
      "ciphers",
      "rejectUnauthorized",
      "autoUnref",
    );
    n.xdomain = !!this._opts.xd;
    const s = (this._xhr = this.createRequest(n));
    try {
      s.open(this._method, this._uri, !0);
      try {
        if (this._opts.extraHeaders) {
          s.setDisableHeaderCheck && s.setDisableHeaderCheck(!0);
          for (let i in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(i) &&
              s.setRequestHeader(i, this._opts.extraHeaders[i]);
        }
      } catch {}
      if (this._method === "POST")
        try {
          s.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch {}
      try {
        s.setRequestHeader("Accept", "*/*");
      } catch {}
      ((t = this._opts.cookieJar) === null || t === void 0 || t.addCookies(s),
        "withCredentials" in s &&
          (s.withCredentials = this._opts.withCredentials),
        this._opts.requestTimeout && (s.timeout = this._opts.requestTimeout),
        (s.onreadystatechange = () => {
          var i;
          (s.readyState === 3 &&
            ((i = this._opts.cookieJar) === null ||
              i === void 0 ||
              i.parseCookies(s.getResponseHeader("set-cookie"))),
            s.readyState === 4 &&
              (s.status === 200 || s.status === 1223
                ? this._onLoad()
                : this.setTimeoutFn(() => {
                    this._onError(typeof s.status == "number" ? s.status : 0);
                  }, 0)));
        }),
        s.send(this._data));
    } catch (i) {
      this.setTimeoutFn(() => {
        this._onError(i);
      }, 0);
      return;
    }
    typeof document < "u" &&
      ((this._index = Bn.requestsCount++), (Bn.requests[this._index] = this));
  }
  _onError(t) {
    (this.emitReserved("error", t, this._xhr), this._cleanup(!0));
  }
  _cleanup(t) {
    if (!(typeof this._xhr > "u" || this._xhr === null)) {
      if (((this._xhr.onreadystatechange = BN), t))
        try {
          this._xhr.abort();
        } catch {}
      (typeof document < "u" && delete Bn.requests[this._index],
        (this._xhr = null));
    }
  }
  _onLoad() {
    const t = this._xhr.responseText;
    t !== null &&
      (this.emitReserved("data", t),
      this.emitReserved("success"),
      this._cleanup());
  }
  abort() {
    this._cleanup();
  }
}
Bn.requestsCount = 0;
Bn.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function") attachEvent("onunload", l0);
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in hn ? "pagehide" : "unload";
    addEventListener(e, l0, !1);
  }
}
function l0() {
  for (let e in Bn.requests)
    Bn.requests.hasOwnProperty(e) && Bn.requests[e].abort();
}
const zN = (function () {
  const e = US({ xdomain: !1 });
  return e && e.responseType !== null;
})();
class $N extends UN {
  constructor(t) {
    super(t);
    const n = t && t.forceBase64;
    this.supportsBinary = zN && !n;
  }
  request(t = {}) {
    return (
      Object.assign(t, { xd: this.xd }, this.opts),
      new Bn(US, this.uri(), t)
    );
  }
}
function US(e) {
  const t = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || VN)) return new XMLHttpRequest();
  } catch {}
  if (!t)
    try {
      return new hn[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {}
}
const zS =
  typeof navigator < "u" &&
  typeof navigator.product == "string" &&
  navigator.product.toLowerCase() === "reactnative";
class WN extends fp {
  get name() {
    return "websocket";
  }
  doOpen() {
    const t = this.uri(),
      n = this.opts.protocols,
      s = zS
        ? {}
        : FS(
            this.opts,
            "agent",
            "perMessageDeflate",
            "pfx",
            "key",
            "passphrase",
            "cert",
            "ca",
            "ciphers",
            "rejectUnauthorized",
            "localAddress",
            "protocolVersion",
            "origin",
            "maxPayload",
            "family",
            "checkServerIdentity",
          );
    this.opts.extraHeaders && (s.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(t, n, s);
    } catch (i) {
      return this.emitReserved("error", i);
    }
    ((this.ws.binaryType = this.socket.binaryType), this.addEventListeners());
  }
  addEventListeners() {
    ((this.ws.onopen = () => {
      (this.opts.autoUnref && this.ws._socket.unref(), this.onOpen());
    }),
      (this.ws.onclose = (t) =>
        this.onClose({
          description: "websocket connection closed",
          context: t,
        })),
      (this.ws.onmessage = (t) => this.onData(t.data)),
      (this.ws.onerror = (t) => this.onError("websocket error", t)));
  }
  write(t) {
    this.writable = !1;
    for (let n = 0; n < t.length; n++) {
      const s = t[n],
        i = n === t.length - 1;
      up(s, this.supportsBinary, (l) => {
        try {
          this.doWrite(s, l);
        } catch {}
        i &&
          Jc(() => {
            ((this.writable = !0), this.emitReserved("drain"));
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < "u" &&
      ((this.ws.onerror = () => {}), this.ws.close(), (this.ws = null));
  }
  uri() {
    const t = this.opts.secure ? "wss" : "ws",
      n = this.query || {};
    return (
      this.opts.timestampRequests && (n[this.opts.timestampParam] = VS()),
      this.supportsBinary || (n.b64 = 1),
      this.createUri(t, n)
    );
  }
}
const Ef = hn.WebSocket || hn.MozWebSocket;
class HN extends WN {
  createSocket(t, n, s) {
    return zS ? new Ef(t, n, s) : n ? new Ef(t, n) : new Ef(t);
  }
  doWrite(t, n) {
    this.ws.send(n);
  }
}
class qN extends fp {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      this._transport = new WebTransport(
        this.createUri("https"),
        this.opts.transportOptions[this.name],
      );
    } catch (t) {
      return this.emitReserved("error", t);
    }
    (this._transport.closed
      .then(() => {
        this.onClose();
      })
      .catch((t) => {
        this.onError("webtransport error", t);
      }),
      this._transport.ready.then(() => {
        this._transport.createBidirectionalStream().then((t) => {
          const n = PN(Number.MAX_SAFE_INTEGER, this.socket.binaryType),
            s = t.readable.pipeThrough(n).getReader(),
            i = TN();
          (i.readable.pipeTo(t.writable),
            (this._writer = i.writable.getWriter()));
          const l = () => {
            s.read()
              .then(({ done: u, value: f }) => {
                u || (this.onPacket(f), l());
              })
              .catch((u) => {});
          };
          l();
          const c = { type: "open" };
          (this.query.sid && (c.data = `{"sid":"${this.query.sid}"}`),
            this._writer.write(c).then(() => this.onOpen()));
        });
      }));
  }
  write(t) {
    this.writable = !1;
    for (let n = 0; n < t.length; n++) {
      const s = t[n],
        i = n === t.length - 1;
      this._writer.write(s).then(() => {
        i &&
          Jc(() => {
            ((this.writable = !0), this.emitReserved("drain"));
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    var t;
    (t = this._transport) === null || t === void 0 || t.close();
  }
}
const KN = { websocket: HN, webtransport: qN, polling: $N },
  QN =
    /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  GN = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor",
  ];
function gh(e) {
  if (e.length > 8e3) throw "URI too long";
  const t = e,
    n = e.indexOf("["),
    s = e.indexOf("]");
  n != -1 &&
    s != -1 &&
    (e =
      e.substring(0, n) +
      e.substring(n, s).replace(/:/g, ";") +
      e.substring(s, e.length));
  let i = QN.exec(e || ""),
    l = {},
    c = 14;
  for (; c--; ) l[GN[c]] = i[c] || "";
  return (
    n != -1 &&
      s != -1 &&
      ((l.source = t),
      (l.host = l.host.substring(1, l.host.length - 1).replace(/;/g, ":")),
      (l.authority = l.authority
        .replace("[", "")
        .replace("]", "")
        .replace(/;/g, ":")),
      (l.ipv6uri = !0)),
    (l.pathNames = YN(l, l.path)),
    (l.queryKey = XN(l, l.query)),
    l
  );
}
function YN(e, t) {
  const n = /\/{2,9}/g,
    s = t.replace(n, "/").split("/");
  return (
    (t.slice(0, 1) == "/" || t.length === 0) && s.splice(0, 1),
    t.slice(-1) == "/" && s.splice(s.length - 1, 1),
    s
  );
}
function XN(e, t) {
  const n = {};
  return (
    t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (s, i, l) {
      i && (n[i] = l);
    }),
    n
  );
}
const yh =
    typeof addEventListener == "function" &&
    typeof removeEventListener == "function",
  fc = [];
yh &&
  addEventListener(
    "offline",
    () => {
      fc.forEach((e) => e());
    },
    !1,
  );
class Gr extends it {
  constructor(t, n) {
    if (
      (super(),
      (this.binaryType = AN),
      (this.writeBuffer = []),
      (this._prevBufferLen = 0),
      (this._pingInterval = -1),
      (this._pingTimeout = -1),
      (this._maxPayload = -1),
      (this._pingTimeoutTime = 1 / 0),
      t && typeof t == "object" && ((n = t), (t = null)),
      t)
    ) {
      const s = gh(t);
      ((n.hostname = s.host),
        (n.secure = s.protocol === "https" || s.protocol === "wss"),
        (n.port = s.port),
        s.query && (n.query = s.query));
    } else n.host && (n.hostname = gh(n.host).host);
    (Zc(this, n),
      (this.secure =
        n.secure != null
          ? n.secure
          : typeof location < "u" && location.protocol === "https:"),
      n.hostname && !n.port && (n.port = this.secure ? "443" : "80"),
      (this.hostname =
        n.hostname ||
        (typeof location < "u" ? location.hostname : "localhost")),
      (this.port =
        n.port ||
        (typeof location < "u" && location.port
          ? location.port
          : this.secure
            ? "443"
            : "80")),
      (this.transports = []),
      (this._transportsByName = {}),
      n.transports.forEach((s) => {
        const i = s.prototype.name;
        (this.transports.push(i), (this._transportsByName[i] = s));
      }),
      (this.opts = Object.assign(
        {
          path: "/engine.io",
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: "t",
          rememberUpgrade: !1,
          addTrailingSlash: !0,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !1,
        },
        n,
      )),
      (this.opts.path =
        this.opts.path.replace(/\/$/, "") +
        (this.opts.addTrailingSlash ? "/" : "")),
      typeof this.opts.query == "string" &&
        (this.opts.query = DN(this.opts.query)),
      yh &&
        (this.opts.closeOnBeforeunload &&
          ((this._beforeunloadEventListener = () => {
            this.transport &&
              (this.transport.removeAllListeners(), this.transport.close());
          }),
          addEventListener(
            "beforeunload",
            this._beforeunloadEventListener,
            !1,
          )),
        this.hostname !== "localhost" &&
          ((this._offlineEventListener = () => {
            this._onClose("transport close", {
              description: "network connection lost",
            });
          }),
          fc.push(this._offlineEventListener))),
      this.opts.withCredentials && (this._cookieJar = void 0),
      this._open());
  }
  createTransport(t) {
    const n = Object.assign({}, this.opts.query);
    ((n.EIO = IS), (n.transport = t), this.id && (n.sid = this.id));
    const s = Object.assign(
      {},
      this.opts,
      {
        query: n,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port,
      },
      this.opts.transportOptions[t],
    );
    return new this._transportsByName[t](s);
  }
  _open() {
    if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    }
    const t =
      this.opts.rememberUpgrade &&
      Gr.priorWebsocketSuccess &&
      this.transports.indexOf("websocket") !== -1
        ? "websocket"
        : this.transports[0];
    this.readyState = "opening";
    const n = this.createTransport(t);
    (n.open(), this.setTransport(n));
  }
  setTransport(t) {
    (this.transport && this.transport.removeAllListeners(),
      (this.transport = t),
      t
        .on("drain", this._onDrain.bind(this))
        .on("packet", this._onPacket.bind(this))
        .on("error", this._onError.bind(this))
        .on("close", (n) => this._onClose("transport close", n)));
  }
  onOpen() {
    ((this.readyState = "open"),
      (Gr.priorWebsocketSuccess = this.transport.name === "websocket"),
      this.emitReserved("open"),
      this.flush());
  }
  _onPacket(t) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    )
      switch (
        (this.emitReserved("packet", t), this.emitReserved("heartbeat"), t.type)
      ) {
        case "open":
          this.onHandshake(JSON.parse(t.data));
          break;
        case "ping":
          (this._sendPacket("pong"),
            this.emitReserved("ping"),
            this.emitReserved("pong"),
            this._resetPingTimeout());
          break;
        case "error":
          const n = new Error("server error");
          ((n.code = t.data), this._onError(n));
          break;
        case "message":
          (this.emitReserved("data", t.data),
            this.emitReserved("message", t.data));
          break;
      }
  }
  onHandshake(t) {
    (this.emitReserved("handshake", t),
      (this.id = t.sid),
      (this.transport.query.sid = t.sid),
      (this._pingInterval = t.pingInterval),
      (this._pingTimeout = t.pingTimeout),
      (this._maxPayload = t.maxPayload),
      this.onOpen(),
      this.readyState !== "closed" && this._resetPingTimeout());
  }
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const t = this._pingInterval + this._pingTimeout;
    ((this._pingTimeoutTime = Date.now() + t),
      (this._pingTimeoutTimer = this.setTimeoutFn(() => {
        this._onClose("ping timeout");
      }, t)),
      this.opts.autoUnref && this._pingTimeoutTimer.unref());
  }
  _onDrain() {
    (this.writeBuffer.splice(0, this._prevBufferLen),
      (this._prevBufferLen = 0),
      this.writeBuffer.length === 0
        ? this.emitReserved("drain")
        : this.flush());
  }
  flush() {
    if (
      this.readyState !== "closed" &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      const t = this._getWritablePackets();
      (this.transport.send(t),
        (this._prevBufferLen = t.length),
        this.emitReserved("flush"));
    }
  }
  _getWritablePackets() {
    if (
      !(
        this._maxPayload &&
        this.transport.name === "polling" &&
        this.writeBuffer.length > 1
      )
    )
      return this.writeBuffer;
    let n = 1;
    for (let s = 0; s < this.writeBuffer.length; s++) {
      const i = this.writeBuffer[s].data;
      if ((i && (n += jN(i)), s > 0 && n > this._maxPayload))
        return this.writeBuffer.slice(0, s);
      n += 2;
    }
    return this.writeBuffer;
  }
  _hasPingExpired() {
    if (!this._pingTimeoutTime) return !0;
    const t = Date.now() > this._pingTimeoutTime;
    return (
      t &&
        ((this._pingTimeoutTime = 0),
        Jc(() => {
          this._onClose("ping timeout");
        }, this.setTimeoutFn)),
      t
    );
  }
  write(t, n, s) {
    return (this._sendPacket("message", t, n, s), this);
  }
  send(t, n, s) {
    return (this._sendPacket("message", t, n, s), this);
  }
  _sendPacket(t, n, s, i) {
    if (
      (typeof n == "function" && ((i = n), (n = void 0)),
      typeof s == "function" && ((i = s), (s = null)),
      this.readyState === "closing" || this.readyState === "closed")
    )
      return;
    ((s = s || {}), (s.compress = s.compress !== !1));
    const l = { type: t, data: n, options: s };
    (this.emitReserved("packetCreate", l),
      this.writeBuffer.push(l),
      i && this.once("flush", i),
      this.flush());
  }
  close() {
    const t = () => {
        (this._onClose("forced close"), this.transport.close());
      },
      n = () => {
        (this.off("upgrade", n), this.off("upgradeError", n), t());
      },
      s = () => {
        (this.once("upgrade", n), this.once("upgradeError", n));
      };
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        ((this.readyState = "closing"),
        this.writeBuffer.length
          ? this.once("drain", () => {
              this.upgrading ? s() : t();
            })
          : this.upgrading
            ? s()
            : t()),
      this
    );
  }
  _onError(t) {
    if (
      ((Gr.priorWebsocketSuccess = !1),
      this.opts.tryAllTransports &&
        this.transports.length > 1 &&
        this.readyState === "opening")
    )
      return (this.transports.shift(), this._open());
    (this.emitReserved("error", t), this._onClose("transport error", t));
  }
  _onClose(t, n) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    ) {
      if (
        (this.clearTimeoutFn(this._pingTimeoutTimer),
        this.transport.removeAllListeners("close"),
        this.transport.close(),
        this.transport.removeAllListeners(),
        yh &&
          (this._beforeunloadEventListener &&
            removeEventListener(
              "beforeunload",
              this._beforeunloadEventListener,
              !1,
            ),
          this._offlineEventListener))
      ) {
        const s = fc.indexOf(this._offlineEventListener);
        s !== -1 && fc.splice(s, 1);
      }
      ((this.readyState = "closed"),
        (this.id = null),
        this.emitReserved("close", t, n),
        (this.writeBuffer = []),
        (this._prevBufferLen = 0));
    }
  }
}
Gr.protocol = IS;
class JN extends Gr {
  constructor() {
    (super(...arguments), (this._upgrades = []));
  }
  onOpen() {
    if ((super.onOpen(), this.readyState === "open" && this.opts.upgrade))
      for (let t = 0; t < this._upgrades.length; t++)
        this._probe(this._upgrades[t]);
  }
  _probe(t) {
    let n = this.createTransport(t),
      s = !1;
    Gr.priorWebsocketSuccess = !1;
    const i = () => {
      s ||
        (n.send([{ type: "ping", data: "probe" }]),
        n.once("packet", (y) => {
          if (!s)
            if (y.type === "pong" && y.data === "probe") {
              if (
                ((this.upgrading = !0), this.emitReserved("upgrading", n), !n)
              )
                return;
              ((Gr.priorWebsocketSuccess = n.name === "websocket"),
                this.transport.pause(() => {
                  s ||
                    (this.readyState !== "closed" &&
                      (m(),
                      this.setTransport(n),
                      n.send([{ type: "upgrade" }]),
                      this.emitReserved("upgrade", n),
                      (n = null),
                      (this.upgrading = !1),
                      this.flush()));
                }));
            } else {
              const w = new Error("probe error");
              ((w.transport = n.name), this.emitReserved("upgradeError", w));
            }
        }));
    };
    function l() {
      s || ((s = !0), m(), n.close(), (n = null));
    }
    const c = (y) => {
      const w = new Error("probe error: " + y);
      ((w.transport = n.name), l(), this.emitReserved("upgradeError", w));
    };
    function u() {
      c("transport closed");
    }
    function f() {
      c("socket closed");
    }
    function h(y) {
      n && y.name !== n.name && l();
    }
    const m = () => {
      (n.removeListener("open", i),
        n.removeListener("error", c),
        n.removeListener("close", u),
        this.off("close", f),
        this.off("upgrading", h));
    };
    (n.once("open", i),
      n.once("error", c),
      n.once("close", u),
      this.once("close", f),
      this.once("upgrading", h),
      this._upgrades.indexOf("webtransport") !== -1 && t !== "webtransport"
        ? this.setTimeoutFn(() => {
            s || n.open();
          }, 200)
        : n.open());
  }
  onHandshake(t) {
    ((this._upgrades = this._filterUpgrades(t.upgrades)), super.onHandshake(t));
  }
  _filterUpgrades(t) {
    const n = [];
    for (let s = 0; s < t.length; s++)
      ~this.transports.indexOf(t[s]) && n.push(t[s]);
    return n;
  }
}
let ZN = class extends JN {
  constructor(t, n = {}) {
    const s = typeof t == "object" ? t : n;
    ((!s.transports || (s.transports && typeof s.transports[0] == "string")) &&
      (s.transports = (s.transports || ["polling", "websocket", "webtransport"])
        .map((i) => KN[i])
        .filter((i) => !!i)),
      super(t, s));
  }
};
function eO(e, t = "", n) {
  let s = e;
  ((n = n || (typeof location < "u" && location)),
    e == null && (e = n.protocol + "//" + n.host),
    typeof e == "string" &&
      (e.charAt(0) === "/" &&
        (e.charAt(1) === "/" ? (e = n.protocol + e) : (e = n.host + e)),
      /^(https?|wss?):\/\//.test(e) ||
        (typeof n < "u" ? (e = n.protocol + "//" + e) : (e = "https://" + e)),
      (s = gh(e))),
    s.port ||
      (/^(http|ws)$/.test(s.protocol)
        ? (s.port = "80")
        : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")),
    (s.path = s.path || "/"));
  const l = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return (
    (s.id = s.protocol + "://" + l + ":" + s.port + t),
    (s.href =
      s.protocol + "://" + l + (n && n.port === s.port ? "" : ":" + s.port)),
    s
  );
}
const tO = typeof ArrayBuffer == "function",
  nO = (e) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(e)
      : e.buffer instanceof ArrayBuffer,
  $S = Object.prototype.toString,
  rO =
    typeof Blob == "function" ||
    (typeof Blob < "u" && $S.call(Blob) === "[object BlobConstructor]"),
  sO =
    typeof File == "function" ||
    (typeof File < "u" && $S.call(File) === "[object FileConstructor]");
function hp(e) {
  return (
    (tO && (e instanceof ArrayBuffer || nO(e))) ||
    (rO && e instanceof Blob) ||
    (sO && e instanceof File)
  );
}
function hc(e, t) {
  if (!e || typeof e != "object") return !1;
  if (Array.isArray(e)) {
    for (let n = 0, s = e.length; n < s; n++) if (hc(e[n])) return !0;
    return !1;
  }
  if (hp(e)) return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return hc(e.toJSON(), !0);
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && hc(e[n])) return !0;
  return !1;
}
function oO(e) {
  const t = [],
    n = e.data,
    s = e;
  return (
    (s.data = vh(n, t)),
    (s.attachments = t.length),
    { packet: s, buffers: t }
  );
}
function vh(e, t) {
  if (!e) return e;
  if (hp(e)) {
    const n = { _placeholder: !0, num: t.length };
    return (t.push(e), n);
  } else if (Array.isArray(e)) {
    const n = new Array(e.length);
    for (let s = 0; s < e.length; s++) n[s] = vh(e[s], t);
    return n;
  } else if (typeof e == "object" && !(e instanceof Date)) {
    const n = {};
    for (const s in e)
      Object.prototype.hasOwnProperty.call(e, s) && (n[s] = vh(e[s], t));
    return n;
  }
  return e;
}
function iO(e, t) {
  return ((e.data = wh(e.data, t)), delete e.attachments, e);
}
function wh(e, t) {
  if (!e) return e;
  if (e && e._placeholder === !0) {
    if (typeof e.num == "number" && e.num >= 0 && e.num < t.length)
      return t[e.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(e))
    for (let n = 0; n < e.length; n++) e[n] = wh(e[n], t);
  else if (typeof e == "object")
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (e[n] = wh(e[n], t));
  return e;
}
const aO = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener",
];
var Le;
(function (e) {
  ((e[(e.CONNECT = 0)] = "CONNECT"),
    (e[(e.DISCONNECT = 1)] = "DISCONNECT"),
    (e[(e.EVENT = 2)] = "EVENT"),
    (e[(e.ACK = 3)] = "ACK"),
    (e[(e.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
    (e[(e.BINARY_EVENT = 5)] = "BINARY_EVENT"),
    (e[(e.BINARY_ACK = 6)] = "BINARY_ACK"));
})(Le || (Le = {}));
class lO {
  constructor(t) {
    this.replacer = t;
  }
  encode(t) {
    return (t.type === Le.EVENT || t.type === Le.ACK) && hc(t)
      ? this.encodeAsBinary({
          type: t.type === Le.EVENT ? Le.BINARY_EVENT : Le.BINARY_ACK,
          nsp: t.nsp,
          data: t.data,
          id: t.id,
        })
      : [this.encodeAsString(t)];
  }
  encodeAsString(t) {
    let n = "" + t.type;
    return (
      (t.type === Le.BINARY_EVENT || t.type === Le.BINARY_ACK) &&
        (n += t.attachments + "-"),
      t.nsp && t.nsp !== "/" && (n += t.nsp + ","),
      t.id != null && (n += t.id),
      t.data != null && (n += JSON.stringify(t.data, this.replacer)),
      n
    );
  }
  encodeAsBinary(t) {
    const n = oO(t),
      s = this.encodeAsString(n.packet),
      i = n.buffers;
    return (i.unshift(s), i);
  }
}
class pp extends it {
  constructor(t) {
    (super(), (this.reviver = t));
  }
  add(t) {
    let n;
    if (typeof t == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      n = this.decodeString(t);
      const s = n.type === Le.BINARY_EVENT;
      s || n.type === Le.BINARY_ACK
        ? ((n.type = s ? Le.EVENT : Le.ACK),
          (this.reconstructor = new cO(n)),
          n.attachments === 0 && super.emitReserved("decoded", n))
        : super.emitReserved("decoded", n);
    } else if (hp(t) || t.base64)
      if (this.reconstructor)
        ((n = this.reconstructor.takeBinaryData(t)),
          n && ((this.reconstructor = null), super.emitReserved("decoded", n)));
      else throw new Error("got binary data when not reconstructing a packet");
    else throw new Error("Unknown type: " + t);
  }
  decodeString(t) {
    let n = 0;
    const s = { type: Number(t.charAt(0)) };
    if (Le[s.type] === void 0) throw new Error("unknown packet type " + s.type);
    if (s.type === Le.BINARY_EVENT || s.type === Le.BINARY_ACK) {
      const l = n + 1;
      for (; t.charAt(++n) !== "-" && n != t.length; );
      const c = t.substring(l, n);
      if (c != Number(c) || t.charAt(n) !== "-")
        throw new Error("Illegal attachments");
      s.attachments = Number(c);
    }
    if (t.charAt(n + 1) === "/") {
      const l = n + 1;
      for (; ++n && !(t.charAt(n) === "," || n === t.length); );
      s.nsp = t.substring(l, n);
    } else s.nsp = "/";
    const i = t.charAt(n + 1);
    if (i !== "" && Number(i) == i) {
      const l = n + 1;
      for (; ++n; ) {
        const c = t.charAt(n);
        if (c == null || Number(c) != c) {
          --n;
          break;
        }
        if (n === t.length) break;
      }
      s.id = Number(t.substring(l, n + 1));
    }
    if (t.charAt(++n)) {
      const l = this.tryParse(t.substr(n));
      if (pp.isPayloadValid(s.type, l)) s.data = l;
      else throw new Error("invalid payload");
    }
    return s;
  }
  tryParse(t) {
    try {
      return JSON.parse(t, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(t, n) {
    switch (t) {
      case Le.CONNECT:
        return c0(n);
      case Le.DISCONNECT:
        return n === void 0;
      case Le.CONNECT_ERROR:
        return typeof n == "string" || c0(n);
      case Le.EVENT:
      case Le.BINARY_EVENT:
        return (
          Array.isArray(n) &&
          (typeof n[0] == "number" ||
            (typeof n[0] == "string" && aO.indexOf(n[0]) === -1))
        );
      case Le.ACK:
      case Le.BINARY_ACK:
        return Array.isArray(n);
    }
  }
  destroy() {
    this.reconstructor &&
      (this.reconstructor.finishedReconstruction(),
      (this.reconstructor = null));
  }
}
class cO {
  constructor(t) {
    ((this.packet = t), (this.buffers = []), (this.reconPack = t));
  }
  takeBinaryData(t) {
    if (
      (this.buffers.push(t), this.buffers.length === this.reconPack.attachments)
    ) {
      const n = iO(this.reconPack, this.buffers);
      return (this.finishedReconstruction(), n);
    }
    return null;
  }
  finishedReconstruction() {
    ((this.reconPack = null), (this.buffers = []));
  }
}
function c0(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
const uO = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Decoder: pp,
      Encoder: lO,
      get PacketType() {
        return Le;
      },
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function kn(e, t, n) {
  return (
    e.on(t, n),
    function () {
      e.off(t, n);
    }
  );
}
const dO = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
});
class WS extends it {
  constructor(t, n, s) {
    (super(),
      (this.connected = !1),
      (this.recovered = !1),
      (this.receiveBuffer = []),
      (this.sendBuffer = []),
      (this._queue = []),
      (this._queueSeq = 0),
      (this.ids = 0),
      (this.acks = {}),
      (this.flags = {}),
      (this.io = t),
      (this.nsp = n),
      s && s.auth && (this.auth = s.auth),
      (this._opts = Object.assign({}, s)),
      this.io._autoConnect && this.open());
  }
  get disconnected() {
    return !this.connected;
  }
  subEvents() {
    if (this.subs) return;
    const t = this.io;
    this.subs = [
      kn(t, "open", this.onopen.bind(this)),
      kn(t, "packet", this.onpacket.bind(this)),
      kn(t, "error", this.onerror.bind(this)),
      kn(t, "close", this.onclose.bind(this)),
    ];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    return this.connected
      ? this
      : (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        this.io._readyState === "open" && this.onopen(),
        this);
  }
  open() {
    return this.connect();
  }
  send(...t) {
    return (t.unshift("message"), this.emit.apply(this, t), this);
  }
  emit(t, ...n) {
    var s, i, l;
    if (dO.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    if (
      (n.unshift(t),
      this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
    )
      return (this._addToQueue(n), this);
    const c = { type: Le.EVENT, data: n };
    if (
      ((c.options = {}),
      (c.options.compress = this.flags.compress !== !1),
      typeof n[n.length - 1] == "function")
    ) {
      const m = this.ids++,
        y = n.pop();
      (this._registerAckCallback(m, y), (c.id = m));
    }
    const u =
        (i =
          (s = this.io.engine) === null || s === void 0
            ? void 0
            : s.transport) === null || i === void 0
          ? void 0
          : i.writable,
      f =
        this.connected &&
        !(
          !((l = this.io.engine) === null || l === void 0) &&
          l._hasPingExpired()
        );
    return (
      (this.flags.volatile && !u) ||
        (f
          ? (this.notifyOutgoingListeners(c), this.packet(c))
          : this.sendBuffer.push(c)),
      (this.flags = {}),
      this
    );
  }
  _registerAckCallback(t, n) {
    var s;
    const i =
      (s = this.flags.timeout) !== null && s !== void 0
        ? s
        : this._opts.ackTimeout;
    if (i === void 0) {
      this.acks[t] = n;
      return;
    }
    const l = this.io.setTimeoutFn(() => {
        delete this.acks[t];
        for (let u = 0; u < this.sendBuffer.length; u++)
          this.sendBuffer[u].id === t && this.sendBuffer.splice(u, 1);
        n.call(this, new Error("operation has timed out"));
      }, i),
      c = (...u) => {
        (this.io.clearTimeoutFn(l), n.apply(this, u));
      };
    ((c.withError = !0), (this.acks[t] = c));
  }
  emitWithAck(t, ...n) {
    return new Promise((s, i) => {
      const l = (c, u) => (c ? i(c) : s(u));
      ((l.withError = !0), n.push(l), this.emit(t, ...n));
    });
  }
  _addToQueue(t) {
    let n;
    typeof t[t.length - 1] == "function" && (n = t.pop());
    const s = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: t,
      flags: Object.assign({ fromQueue: !0 }, this.flags),
    };
    (t.push(
      (i, ...l) => (
        this._queue[0],
        i !== null
          ? s.tryCount > this._opts.retries && (this._queue.shift(), n && n(i))
          : (this._queue.shift(), n && n(null, ...l)),
        (s.pending = !1),
        this._drainQueue()
      ),
    ),
      this._queue.push(s),
      this._drainQueue());
  }
  _drainQueue(t = !1) {
    if (!this.connected || this._queue.length === 0) return;
    const n = this._queue[0];
    (n.pending && !t) ||
      ((n.pending = !0),
      n.tryCount++,
      (this.flags = n.flags),
      this.emit.apply(this, n.args));
  }
  packet(t) {
    ((t.nsp = this.nsp), this.io._packet(t));
  }
  onopen() {
    typeof this.auth == "function"
      ? this.auth((t) => {
          this._sendConnectPacket(t);
        })
      : this._sendConnectPacket(this.auth);
  }
  _sendConnectPacket(t) {
    this.packet({
      type: Le.CONNECT,
      data: this._pid
        ? Object.assign({ pid: this._pid, offset: this._lastOffset }, t)
        : t,
    });
  }
  onerror(t) {
    this.connected || this.emitReserved("connect_error", t);
  }
  onclose(t, n) {
    ((this.connected = !1),
      delete this.id,
      this.emitReserved("disconnect", t, n),
      this._clearAcks());
  }
  _clearAcks() {
    Object.keys(this.acks).forEach((t) => {
      if (!this.sendBuffer.some((s) => String(s.id) === t)) {
        const s = this.acks[t];
        (delete this.acks[t],
          s.withError &&
            s.call(this, new Error("socket has been disconnected")));
      }
    });
  }
  onpacket(t) {
    if (t.nsp === this.nsp)
      switch (t.type) {
        case Le.CONNECT:
          t.data && t.data.sid
            ? this.onconnect(t.data.sid, t.data.pid)
            : this.emitReserved(
                "connect_error",
                new Error(
                  "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)",
                ),
              );
          break;
        case Le.EVENT:
        case Le.BINARY_EVENT:
          this.onevent(t);
          break;
        case Le.ACK:
        case Le.BINARY_ACK:
          this.onack(t);
          break;
        case Le.DISCONNECT:
          this.ondisconnect();
          break;
        case Le.CONNECT_ERROR:
          this.destroy();
          const s = new Error(t.data.message);
          ((s.data = t.data.data), this.emitReserved("connect_error", s));
          break;
      }
  }
  onevent(t) {
    const n = t.data || [];
    (t.id != null && n.push(this.ack(t.id)),
      this.connected
        ? this.emitEvent(n)
        : this.receiveBuffer.push(Object.freeze(n)));
  }
  emitEvent(t) {
    if (this._anyListeners && this._anyListeners.length) {
      const n = this._anyListeners.slice();
      for (const s of n) s.apply(this, t);
    }
    (super.emit.apply(this, t),
      this._pid &&
        t.length &&
        typeof t[t.length - 1] == "string" &&
        (this._lastOffset = t[t.length - 1]));
  }
  ack(t) {
    const n = this;
    let s = !1;
    return function (...i) {
      s || ((s = !0), n.packet({ type: Le.ACK, id: t, data: i }));
    };
  }
  onack(t) {
    const n = this.acks[t.id];
    typeof n == "function" &&
      (delete this.acks[t.id],
      n.withError && t.data.unshift(null),
      n.apply(this, t.data));
  }
  onconnect(t, n) {
    ((this.id = t),
      (this.recovered = n && this._pid === n),
      (this._pid = n),
      (this.connected = !0),
      this.emitBuffered(),
      this._drainQueue(!0),
      this.emitReserved("connect"));
  }
  emitBuffered() {
    (this.receiveBuffer.forEach((t) => this.emitEvent(t)),
      (this.receiveBuffer = []),
      this.sendBuffer.forEach((t) => {
        (this.notifyOutgoingListeners(t), this.packet(t));
      }),
      (this.sendBuffer = []));
  }
  ondisconnect() {
    (this.destroy(), this.onclose("io server disconnect"));
  }
  destroy() {
    (this.subs && (this.subs.forEach((t) => t()), (this.subs = void 0)),
      this.io._destroy(this));
  }
  disconnect() {
    return (
      this.connected && this.packet({ type: Le.DISCONNECT }),
      this.destroy(),
      this.connected && this.onclose("io client disconnect"),
      this
    );
  }
  close() {
    return this.disconnect();
  }
  compress(t) {
    return ((this.flags.compress = t), this);
  }
  get volatile() {
    return ((this.flags.volatile = !0), this);
  }
  timeout(t) {
    return ((this.flags.timeout = t), this);
  }
  onAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.push(t),
      this
    );
  }
  prependAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.unshift(t),
      this
    );
  }
  offAny(t) {
    if (!this._anyListeners) return this;
    if (t) {
      const n = this._anyListeners;
      for (let s = 0; s < n.length; s++)
        if (t === n[s]) return (n.splice(s, 1), this);
    } else this._anyListeners = [];
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
  onAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.push(t),
      this
    );
  }
  prependAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.unshift(t),
      this
    );
  }
  offAnyOutgoing(t) {
    if (!this._anyOutgoingListeners) return this;
    if (t) {
      const n = this._anyOutgoingListeners;
      for (let s = 0; s < n.length; s++)
        if (t === n[s]) return (n.splice(s, 1), this);
    } else this._anyOutgoingListeners = [];
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(t) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const n = this._anyOutgoingListeners.slice();
      for (const s of n) s.apply(this, t.data);
    }
  }
}
function Ko(e) {
  ((e = e || {}),
    (this.ms = e.min || 100),
    (this.max = e.max || 1e4),
    (this.factor = e.factor || 2),
    (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
    (this.attempts = 0));
}
Ko.prototype.duration = function () {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(),
      n = Math.floor(t * this.jitter * e);
    e = (Math.floor(t * 10) & 1) == 0 ? e - n : e + n;
  }
  return Math.min(e, this.max) | 0;
};
Ko.prototype.reset = function () {
  this.attempts = 0;
};
Ko.prototype.setMin = function (e) {
  this.ms = e;
};
Ko.prototype.setMax = function (e) {
  this.max = e;
};
Ko.prototype.setJitter = function (e) {
  this.jitter = e;
};
class xh extends it {
  constructor(t, n) {
    var s;
    (super(),
      (this.nsps = {}),
      (this.subs = []),
      t && typeof t == "object" && ((n = t), (t = void 0)),
      (n = n || {}),
      (n.path = n.path || "/socket.io"),
      (this.opts = n),
      Zc(this, n),
      this.reconnection(n.reconnection !== !1),
      this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(n.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3),
      this.randomizationFactor(
        (s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5,
      ),
      (this.backoff = new Ko({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(n.timeout == null ? 2e4 : n.timeout),
      (this._readyState = "closed"),
      (this.uri = t));
    const i = n.parser || uO;
    ((this.encoder = new i.Encoder()),
      (this.decoder = new i.Decoder()),
      (this._autoConnect = n.autoConnect !== !1),
      this._autoConnect && this.open());
  }
  reconnection(t) {
    return arguments.length
      ? ((this._reconnection = !!t), t || (this.skipReconnect = !0), this)
      : this._reconnection;
  }
  reconnectionAttempts(t) {
    return t === void 0
      ? this._reconnectionAttempts
      : ((this._reconnectionAttempts = t), this);
  }
  reconnectionDelay(t) {
    var n;
    return t === void 0
      ? this._reconnectionDelay
      : ((this._reconnectionDelay = t),
        (n = this.backoff) === null || n === void 0 || n.setMin(t),
        this);
  }
  randomizationFactor(t) {
    var n;
    return t === void 0
      ? this._randomizationFactor
      : ((this._randomizationFactor = t),
        (n = this.backoff) === null || n === void 0 || n.setJitter(t),
        this);
  }
  reconnectionDelayMax(t) {
    var n;
    return t === void 0
      ? this._reconnectionDelayMax
      : ((this._reconnectionDelayMax = t),
        (n = this.backoff) === null || n === void 0 || n.setMax(t),
        this);
  }
  timeout(t) {
    return arguments.length ? ((this._timeout = t), this) : this._timeout;
  }
  maybeReconnectOnOpen() {
    !this._reconnecting &&
      this._reconnection &&
      this.backoff.attempts === 0 &&
      this.reconnect();
  }
  open(t) {
    if (~this._readyState.indexOf("open")) return this;
    this.engine = new ZN(this.uri, this.opts);
    const n = this.engine,
      s = this;
    ((this._readyState = "opening"), (this.skipReconnect = !1));
    const i = kn(n, "open", function () {
        (s.onopen(), t && t());
      }),
      l = (u) => {
        (this.cleanup(),
          (this._readyState = "closed"),
          this.emitReserved("error", u),
          t ? t(u) : this.maybeReconnectOnOpen());
      },
      c = kn(n, "error", l);
    if (this._timeout !== !1) {
      const u = this._timeout,
        f = this.setTimeoutFn(() => {
          (i(), l(new Error("timeout")), n.close());
        }, u);
      (this.opts.autoUnref && f.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(f);
        }));
    }
    return (this.subs.push(i), this.subs.push(c), this);
  }
  connect(t) {
    return this.open(t);
  }
  onopen() {
    (this.cleanup(), (this._readyState = "open"), this.emitReserved("open"));
    const t = this.engine;
    this.subs.push(
      kn(t, "ping", this.onping.bind(this)),
      kn(t, "data", this.ondata.bind(this)),
      kn(t, "error", this.onerror.bind(this)),
      kn(t, "close", this.onclose.bind(this)),
      kn(this.decoder, "decoded", this.ondecoded.bind(this)),
    );
  }
  onping() {
    this.emitReserved("ping");
  }
  ondata(t) {
    try {
      this.decoder.add(t);
    } catch (n) {
      this.onclose("parse error", n);
    }
  }
  ondecoded(t) {
    Jc(() => {
      this.emitReserved("packet", t);
    }, this.setTimeoutFn);
  }
  onerror(t) {
    this.emitReserved("error", t);
  }
  socket(t, n) {
    let s = this.nsps[t];
    return (
      s
        ? this._autoConnect && !s.active && s.connect()
        : ((s = new WS(this, t, n)), (this.nsps[t] = s)),
      s
    );
  }
  _destroy(t) {
    const n = Object.keys(this.nsps);
    for (const s of n) if (this.nsps[s].active) return;
    this._close();
  }
  _packet(t) {
    const n = this.encoder.encode(t);
    for (let s = 0; s < n.length; s++) this.engine.write(n[s], t.options);
  }
  cleanup() {
    (this.subs.forEach((t) => t()),
      (this.subs.length = 0),
      this.decoder.destroy());
  }
  _close() {
    ((this.skipReconnect = !0),
      (this._reconnecting = !1),
      this.onclose("forced close"));
  }
  disconnect() {
    return this._close();
  }
  onclose(t, n) {
    var s;
    (this.cleanup(),
      (s = this.engine) === null || s === void 0 || s.close(),
      this.backoff.reset(),
      (this._readyState = "closed"),
      this.emitReserved("close", t, n),
      this._reconnection && !this.skipReconnect && this.reconnect());
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const t = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      (this.backoff.reset(),
        this.emitReserved("reconnect_failed"),
        (this._reconnecting = !1));
    else {
      const n = this.backoff.duration();
      this._reconnecting = !0;
      const s = this.setTimeoutFn(() => {
        t.skipReconnect ||
          (this.emitReserved("reconnect_attempt", t.backoff.attempts),
          !t.skipReconnect &&
            t.open((i) => {
              i
                ? ((t._reconnecting = !1),
                  t.reconnect(),
                  this.emitReserved("reconnect_error", i))
                : t.onreconnect();
            }));
      }, n);
      (this.opts.autoUnref && s.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(s);
        }));
    }
  }
  onreconnect() {
    const t = this.backoff.attempts;
    ((this._reconnecting = !1),
      this.backoff.reset(),
      this.emitReserved("reconnect", t));
  }
}
const Ui = {};
function pc(e, t) {
  (typeof e == "object" && ((t = e), (e = void 0)), (t = t || {}));
  const n = eO(e, t.path || "/socket.io"),
    s = n.source,
    i = n.id,
    l = n.path,
    c = Ui[i] && l in Ui[i].nsps,
    u = t.forceNew || t["force new connection"] || t.multiplex === !1 || c;
  let f;
  return (
    u ? (f = new xh(s, t)) : (Ui[i] || (Ui[i] = new xh(s, t)), (f = Ui[i])),
    n.query && !t.query && (t.query = n.queryKey),
    f.socket(n.path, t)
  );
}
Object.assign(pc, { Manager: xh, Socket: WS, io: pc, connect: pc });
function u0(e, t) {
  var n;
  const s = pc(e.serverUrl, {
    path: e.mountPath,
    transports: e.transports,
    query: {
      app_id: e.appId,
      token: (n = e.token) !== null && n !== void 0 ? n : Rc(),
    },
  });
  return (
    s.on("connect", async () => {
      var i;
      return (
        console.log("connect", s.id),
        (i = t.connect) === null || i === void 0 ? void 0 : i.call(t)
      );
    }),
    s.on("update_model", async (i) => {
      var l;
      return (l = t.update_model) === null || l === void 0
        ? void 0
        : l.call(t, i);
    }),
    s.on("error", async (i) => {
      var l;
      return (l = t.error) === null || l === void 0 ? void 0 : l.call(t, i);
    }),
    s.on("connect_error", async (i) => {
      var l;
      return (
        console.error("connect_error", i),
        (l = t.error) === null || l === void 0 ? void 0 : l.call(t, i)
      );
    }),
    s
  );
}
function fO({ config: e }) {
  let t = { ...e };
  const n = {},
    s = {
      connect: async () => {
        const C = [];
        (Object.keys(n).forEach((E) => {
          f(E);
          const v = y(E);
          v == null ||
            v.forEach(({ connect: x }) => {
              const T = async () => (x == null ? void 0 : x());
              C.push(T());
            });
        }),
          await Promise.all(C));
      },
      update_model: async (C) => {
        const v = y(C.room).map((x) => {
          var T;
          return (T = x.update_model) === null || T === void 0
            ? void 0
            : T.call(x, C);
        });
        await Promise.all(v);
      },
      error: async (C) => {
        console.error("error", C);
        const E = Object.values(n)
          .flat()
          .map((v) => {
            var x;
            return (x = v.error) === null || x === void 0
              ? void 0
              : x.call(v, C);
          });
        await Promise.all(E);
      },
    };
  let i = u0(e, s);
  function l() {
    c();
  }
  function c() {
    i && i.disconnect();
  }
  function u(C) {
    (l(), (t = { ...t, ...C }), (i = u0(t, s)));
  }
  function f(C) {
    i.emit("join", C);
  }
  function h(C) {
    i.emit("leave", C);
  }
  async function m(C, E) {
    var v;
    const x = JSON.stringify(E);
    return (v = s.update_model) === null || v === void 0
      ? void 0
      : v.call(s, { room: C, data: x });
  }
  function y(C) {
    return n[C];
  }
  return {
    socket: i,
    subscribeToRoom: (C, E) => (
      n[C] || (f(C), (n[C] = [])),
      n[C].push(E),
      () => {
        var v, x;
        ((n[C] =
          (x =
            (v = n[C]) === null || v === void 0
              ? void 0
              : v.filter((T) => T !== E)) !== null && x !== void 0
            ? x
            : []),
          n[C].length === 0 && h(C));
      }
    ),
    updateConfig: u,
    updateModel: m,
    disconnect: c,
  };
}
const zi = typeof window < "u" ? window : { base44SharedInstances: {} };
function hO(e, t) {
  return (
    zi.base44SharedInstances || (zi.base44SharedInstances = {}),
    zi.base44SharedInstances[e] ||
      (zi.base44SharedInstances[e] = { instance: t() }),
    zi.base44SharedInstances[e].instance
  );
}
const pO = "__user_heartbeat_event__",
  mO = "__initialization_event__",
  gO = "__session_duration_event__",
  d0 = "analytics-enable",
  f0 = "base44_analytics_session_id",
  yO = {
    enabled: !0,
    maxQueueSize: 1e3,
    throttleTime: 1e3,
    batchSize: 30,
    heartBeatInterval: 60 * 1e3,
  },
  vO = "analytics",
  Ve = hO(vO, () => ({
    requestsQueue: [],
    isProcessing: !1,
    isHeartBeatProcessing: !1,
    wasInitializationTracked: !1,
    sessionContext: null,
    sessionStartTime: null,
    config: { ...yO, ...TO() },
  })),
  wO = ({ axiosClient: e, serverUrl: t, appId: n, userAuthModule: s }) => {
    var i;
    const { maxQueueSize: l, throttleTime: c, batchSize: u } = Ve.config;
    if (!(!((i = Ve.config) === null || i === void 0) && i.enabled))
      return { track: () => {}, cleanup: () => {} };
    let f;
    const h = `${t}/api/apps/${n}/analytics/track/batch`,
      m = async (R) => {
        await e.request({
          method: "POST",
          url: `/apps/${n}/analytics/track/batch`,
          data: { events: R },
        });
      },
      y = (R) => {
        try {
          const _ = JSON.stringify({ events: R }),
            M = new Blob([_], { type: "application/json" });
          return (
            typeof navigator > "u" ||
            _.length > 6e4 ||
            !navigator.sendBeacon(h, M)
          );
        } catch {
          return !1;
        }
      },
      w = async (R, _ = {}) => {
        if (R.length === 0) return;
        const M = await kO(s),
          V = R.map(CO(M));
        try {
          (!_.isBeacon || !y(V)) && (await m(V));
        } catch {}
      },
      C = () => {
        p0(w, { throttleTime: c, batchSize: u });
      },
      E = (R) => {
        if (Ve.requestsQueue.length >= l) return;
        const _ = EO();
        (Ve.requestsQueue.push({ ...R, ..._ }), C());
      },
      v = () => {
        (p0(w, { throttleTime: c, batchSize: u }), (f = m0(E)), SO());
      },
      x = () => {
        (h0(), f == null || f(), bO(E));
        const R = Ve.requestsQueue.splice(0);
        w(R, { isBeacon: !0 });
      },
      T = () => {
        typeof window > "u" ||
          (document.visibilityState === "hidden"
            ? x()
            : document.visibilityState === "visible" && v());
      },
      P = () => {
        (h0(),
          f == null || f(),
          typeof window < "u" &&
            window.removeEventListener("visibilitychange", T));
      };
    return (
      C(),
      (f = m0(E)),
      xO(E),
      typeof window < "u" && window.addEventListener("visibilitychange", T),
      { track: E, cleanup: P }
    );
  };
function h0() {
  Ve.isProcessing = !1;
}
async function p0(e, t) {
  if (Ve.isProcessing) return;
  Ve.isProcessing = !0;
  const { throttleTime: n = 1e3, batchSize: s = 30 } = t ?? {};
  for (; Ve.isProcessing && Ve.requestsQueue.length > 0; ) {
    const i = Ve.requestsQueue.splice(0, s);
    (i.length && (await e(i)), await new Promise((l) => setTimeout(l, n)));
  }
  Ve.isProcessing = !1;
}
function m0(e) {
  var t;
  if (
    Ve.isHeartBeatProcessing ||
    ((t = Ve.config.heartBeatInterval) !== null && t !== void 0 ? t : 0) < 10
  )
    return () => {};
  Ve.isHeartBeatProcessing = !0;
  const n = setInterval(() => {
    e({ eventName: pO });
  }, Ve.config.heartBeatInterval);
  return () => {
    (clearInterval(n), (Ve.isHeartBeatProcessing = !1));
  };
}
function xO(e) {
  typeof window > "u" ||
    Ve.wasInitializationTracked ||
    ((Ve.wasInitializationTracked = !0),
    e({
      eventName: mO,
      properties: { referrer: document == null ? void 0 : document.referrer },
    }));
}
function SO() {
  typeof window > "u" ||
    Ve.sessionStartTime !== null ||
    (Ve.sessionStartTime = new Date().toISOString());
}
function bO(e) {
  if (typeof window > "u" || Ve.sessionStartTime === null) return;
  const t = new Date().getTime() - new Date(Ve.sessionStartTime).getTime();
  ((Ve.sessionStartTime = null),
    e({ eventName: gO, properties: { sessionDuration: t } }));
}
function EO() {
  return {
    timestamp: new Date().toISOString(),
    pageUrl: typeof window < "u" ? window.location.pathname : null,
  };
}
function CO(e) {
  return (t) => ({
    event_name: t.eventName,
    properties: t.properties,
    timestamp: t.timestamp,
    page_url: t.pageUrl,
    ...e,
  });
}
let Cf = null;
async function kO(e) {
  if (!Ve.sessionContext) {
    if (!Cf) {
      const t = PO();
      Cf = e
        .me()
        .then((n) => ({ user_id: n.id, session_id: t }))
        .catch(() => ({ user_id: null, session_id: t }));
    }
    Ve.sessionContext = await Cf;
  }
  return Ve.sessionContext;
}
function TO() {
  if (typeof window > "u") return;
  const t = new URLSearchParams(window.location.search).get(d0);
  if (t == null || !t.length) return;
  const n = new URLSearchParams(window.location.search);
  n.delete(d0);
  const s = window.location.pathname + (n.toString() ? "?" + n.toString() : "");
  return (window.history.replaceState({}, "", s), { enabled: t === "true" });
}
function PO() {
  if (typeof window > "u") return wf();
  try {
    const e = localStorage.getItem(f0);
    if (!e) {
      const t = wf();
      return (localStorage.setItem(f0, t), t);
    }
    return e;
  } catch {
    return wf();
  }
}
function RO(e) {
  var t, n;
  const {
      serverUrl: s = "https://nanofusion.cz",
      appId: i,
      token: l,
      serviceToken: c,
      requiresAuth: u = !1,
      appBaseUrl: f,
      options: h,
      functionsVersion: m,
      headers: y,
    } = e,
    w = typeof f == "string" ? f : "",
    C = {
      serverUrl: s,
      mountPath: "/ws-user-apps/socket.io/",
      transports: ["websocket"],
      appId: i,
      token: l,
    };
  let E = null;
  const v = () => (E || (E = fO({ config: C })), E),
    x = { ...y, "X-App-Id": String(i) },
    T = m ? { ...x, "Base44-Functions-Version": m } : x,
    P = Hi({
      baseURL: `${s}/api`,
      headers: x,
      token: l,
      onError: h == null ? void 0 : h.onError,
    }),
    R = Hi({
      baseURL: `${s}/api`,
      headers: T,
      token: l,
      interceptResponses: !1,
      onError: h == null ? void 0 : h.onError,
    }),
    _ = { ...x, ...(l ? { "on-behalf-of": `Bearer ${l}` } : {}) },
    M = Hi({
      baseURL: `${s}/api`,
      headers: _,
      token: c,
      onError: h == null ? void 0 : h.onError,
    }),
    V = Hi({
      baseURL: `${s}/api`,
      headers: T,
      token: c,
      interceptResponses: !1,
    }),
    U = pN(P, R, i, { appBaseUrl: w }),
    D = {
      entities: e0({ axios: P, appId: i, getSocket: v }),
      integrations: t0(P, i),
      connectors: yN(P, i),
      auth: U,
      functions: n0(R, i, {
        getAuthHeaders: () => {
          const ee = {},
            de = l || Rc();
          return (de && (ee.Authorization = `Bearer ${de}`), ee);
        },
        baseURL: (t = R.defaults) === null || t === void 0 ? void 0 : t.baseURL,
      }),
      agents: r0({ axios: P, getSocket: v, appId: i, serverUrl: s, token: l }),
      appLogs: s0(P, i),
      users: wN(P, i),
      analytics: wO({
        axiosClient: P,
        serverUrl: s,
        appId: i,
        userAuthModule: U,
      }),
      cleanup: () => {
        (D.analytics.cleanup(), E && E.disconnect());
      },
    },
    Q = {
      entities: e0({ axios: M, appId: i, getSocket: v }),
      integrations: t0(M, i),
      sso: mN(M, i),
      connectors: gN(M, i),
      functions: n0(V, i, {
        getAuthHeaders: () => {
          const ee = {};
          return (c && (ee.Authorization = `Bearer ${c}`), ee);
        },
        baseURL: (n = V.defaults) === null || n === void 0 ? void 0 : n.baseURL,
      }),
      agents: r0({ axios: M, getSocket: v, appId: i, serverUrl: s, token: l }),
      appLogs: s0(M, i),
      cleanup: () => {
        E && E.disconnect();
      },
    };
  if (typeof window < "u") {
    const ee = l || Rc();
    ee && D.auth.setToken(ee);
  }
  return (
    u &&
      typeof window < "u" &&
      setTimeout(async () => {
        try {
          (await D.auth.isAuthenticated()) ||
            D.auth.redirectToLogin(window.location.href);
        } catch (ee) {
          (console.error("Authentication check failed:", ee),
            D.auth.redirectToLogin(window.location.href));
        }
      }, 0),
    {
      ...D,
      setToken(ee) {
        (D.auth.setToken(ee),
          E && E.updateConfig({ token: ee }),
          (C.token = ee));
      },
      getConfig() {
        return { serverUrl: s, appId: i, requiresAuth: u };
      },
      get asServiceRole() {
        if (!c)
          throw new Error(
            "Service token is required to use asServiceRole. Please provide a serviceToken when creating the client.",
          );
        return Q;
      },
    }
  );
}
const HS = typeof window > "u",
  AO = HS ? { localStorage: new Map() } : window,
  Zi = AO.localStorage,
  _O = (e) => e.replace(/([A-Z])/g, "_$1").toLowerCase(),
  mo = (e, { defaultValue: t = void 0, removeFromUrl: n = !1 } = {}) => {
    if (HS) return t;
    const s = `base44_${_O(e)}`,
      i = new URLSearchParams(window.location.search),
      l = i.get(e);
    if (n) {
      i.delete(e);
      const u = `${window.location.pathname}${i.toString() ? `?${i.toString()}` : ""}${window.location.hash}`;
      window.history.replaceState({}, document.title, u);
    }
    if (l) return (Zi.setItem(s, l), l);
    if (t) return (Zi.setItem(s, t), t);
    const c = Zi.getItem(s);
    return c || null;
  },
  NO = () => (
    mo("clear_access_token") === "true" &&
      (Zi.removeItem("base44_access_token"), Zi.removeItem("token")),
    {
      appId: mo("app_id", { defaultValue: "69c6b151f7a89f94f9b87555" }),
      token: mo("access_token", { removeFromUrl: !0 }),
      fromUrl: mo("from_url", { defaultValue: window.location.href }),
      functionsVersion: mo("functions_version", { defaultValue: "prod" }),
      appBaseUrl: mo("app_base_url", { defaultValue: void 0 }),
    }
  ),
  Ki = { ...NO() },
  { appId: OO, token: jO, functionsVersion: LO, appBaseUrl: MO } = Ki,
  wo = RO({
    appId: OO,
    token: jO,
    functionsVersion: LO,
    serverUrl: "",
    requiresAuth: !1,
    appBaseUrl: MO,
  });
function DO({}) {
  var i;
  const t = lS().pathname.substring(1),
    { data: n, isFetched: s } = FR({
      queryKey: ["user"],
      queryFn: async () => {
        try {
          return { user: await wo.auth.me(), isAuthenticated: !0 };
        } catch {
          return { user: null, isAuthenticated: !1 };
        }
      },
    });
  return S.jsx("div", {
    className: "min-h-screen flex items-center justify-center p-6 bg-slate-50",
    children: S.jsx("div", {
      className: "max-w-md w-full",
      children: S.jsxs("div", {
        className: "text-center space-y-6",
        children: [
          S.jsxs("div", {
            className: "space-y-2",
            children: [
              S.jsx("h1", {
                className: "text-7xl font-light text-slate-300",
                children: "404",
              }),
              S.jsx("div", { className: "h-0.5 w-16 bg-slate-200 mx-auto" }),
            ],
          }),
          S.jsxs("div", {
            className: "space-y-3",
            children: [
              S.jsx("h2", {
                className: "text-2xl font-medium text-slate-800",
                children: "Page Not Found",
              }),
              S.jsxs("p", {
                className: "text-slate-600 leading-relaxed",
                children: [
                  "The page ",
                  S.jsxs("span", {
                    className: "font-medium text-slate-700",
                    children: ['"', t, '"'],
                  }),
                  " could not be found in this application.",
                ],
              }),
            ],
          }),
          s &&
            n.isAuthenticated &&
            ((i = n.user) == null ? void 0 : i.role) === "admin" &&
            S.jsx("div", {
              className:
                "mt-8 p-4 bg-slate-100 rounded-lg border border-slate-200",
              children: S.jsxs("div", {
                className: "flex items-start space-x-3",
                children: [
                  S.jsx("div", {
                    className:
                      "flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5",
                    children: S.jsx("div", {
                      className: "w-2 h-2 rounded-full bg-orange-400",
                    }),
                  }),
                  S.jsxs("div", {
                    className: "text-left space-y-1",
                    children: [
                      S.jsx("p", {
                        className: "text-sm font-medium text-slate-700",
                        children: "Admin Note",
                      }),
                      S.jsx("p", {
                        className: "text-sm text-slate-600 leading-relaxed",
                        children:
                          "This could mean that the AI hasn't implemented this page yet. Ask it to implement it in the chat.",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          S.jsx("div", {
            className: "pt-6",
            children: S.jsxs("button", {
              onClick: () => (window.location.href = "/"),
              className:
                "inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500",
              children: [
                S.jsx("svg", {
                  className: "w-4 h-4 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: S.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                  }),
                }),
                "Go Home",
              ],
            }),
          }),
        ],
      }),
    }),
  });
}
const qS = b.createContext(),
  IO = ({ children: e }) => {
    const [t, n] = b.useState(null),
      [s, i] = b.useState(!1),
      [l, c] = b.useState(!0),
      [u, f] = b.useState(!0),
      [h, m] = b.useState(null),
      [y, w] = b.useState(null);
    b.useEffect(() => {
      C();
    }, []);
    const C = async () => {
        var T, P;
        try {
          (f(!0), m(null));
          const R = Hi({
            baseURL: "/api/apps/public",
            headers: { "X-App-Id": Ki.appId },
            token: Ki.token,
            interceptResponses: !0,
          });
          try {
            const _ = await R.get(`/prod/public-settings/by-id/${Ki.appId}`);
            (w(_), Ki.token ? await E() : (c(!1), i(!1)), f(!1));
          } catch (_) {
            if (
              (console.error("App state check failed:", _),
              _.status === 403 &&
                (P = (T = _.data) == null ? void 0 : T.extra_data) != null &&
                P.reason)
            ) {
              const M = _.data.extra_data.reason;
              m(
                M === "auth_required"
                  ? {
                      type: "auth_required",
                      message: "Authentication required",
                    }
                  : M === "user_not_registered"
                    ? {
                        type: "user_not_registered",
                        message: "User not registered for this app",
                      }
                    : { type: M, message: _.message },
              );
            } else
              m({
                type: "unknown",
                message: _.message || "Failed to load app",
              });
            (f(!1), c(!1));
          }
        } catch (R) {
          (console.error("Unexpected error:", R),
            m({
              type: "unknown",
              message: R.message || "An unexpected error occurred",
            }),
            f(!1),
            c(!1));
        }
      },
      E = async () => {
        try {
          c(!0);
          const T = await wo.auth.me();
          (n(T), i(!0), c(!1));
        } catch (T) {
          (console.error("User auth check failed:", T),
            c(!1),
            i(!1),
            (T.status === 401 || T.status === 403) &&
              m({ type: "auth_required", message: "Authentication required" }));
        }
      },
      v = (T = !0) => {
        (n(null),
          i(!1),
          T ? wo.auth.logout(window.location.href) : wo.auth.logout());
      },
      x = () => {
        wo.auth.redirectToLogin(window.location.href);
      };
    return S.jsx(qS.Provider, {
      value: {
        user: t,
        isAuthenticated: s,
        isLoadingAuth: l,
        isLoadingPublicSettings: u,
        authError: h,
        appPublicSettings: y,
        logout: v,
        navigateToLogin: x,
        checkAppState: C,
      },
      children: e,
    });
  },
  FO = () => {
    const e = b.useContext(qS);
    if (!e) throw new Error("useAuth must be used within an AuthProvider");
    return e;
  },
  VO = () =>
    S.jsx("div", {
      className:
        "flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-slate-50",
      children: S.jsx("div", {
        className:
          "max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-slate-100",
        children: S.jsxs("div", {
          className: "text-center",
          children: [
            S.jsx("div", {
              className:
                "inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100",
              children: S.jsx("svg", {
                className: "w-8 h-8 text-orange-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: S.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
                }),
              }),
            }),
            S.jsx("h1", {
              className: "text-3xl font-bold text-slate-900 mb-4",
              children: "Access Restricted",
            }),
            S.jsx("p", {
              className: "text-slate-600 mb-8",
              children:
                "You are not registered to use this application. Please contact the app administrator to request access.",
            }),
            S.jsxs("div", {
              className: "p-4 bg-slate-50 rounded-md text-sm text-slate-600",
              children: [
                S.jsx("p", {
                  children: "If you believe this is an error, you can:",
                }),
                S.jsxs("ul", {
                  className: "list-disc list-inside mt-2 space-y-1",
                  children: [
                    S.jsx("li", {
                      children:
                        "Verify you are logged in with the correct account",
                    }),
                    S.jsx("li", {
                      children: "Contact the app administrator for access",
                    }),
                    S.jsx("li", {
                      children: "Try logging out and back in again",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    });
function g0(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
function ka(...e) {
  return (t) => {
    let n = !1;
    const s = e.map((i) => {
      const l = g0(i, t);
      return (!n && typeof l == "function" && (n = !0), l);
    });
    if (n)
      return () => {
        for (let i = 0; i < s.length; i++) {
          const l = s[i];
          typeof l == "function" ? l() : g0(e[i], null);
        }
      };
  };
}
function at(...e) {
  return b.useCallback(ka(...e), e);
}
var BO = Symbol.for("react.lazy"),
  Ac = $c[" use ".trim().toString()];
function UO(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function KS(e) {
  return (
    e != null &&
    typeof e == "object" &&
    "$$typeof" in e &&
    e.$$typeof === BO &&
    "_payload" in e &&
    UO(e._payload)
  );
}
function zO(e) {
  const t = WO(e),
    n = b.forwardRef((s, i) => {
      let { children: l, ...c } = s;
      KS(l) && typeof Ac == "function" && (l = Ac(l._payload));
      const u = b.Children.toArray(l),
        f = u.find(qO);
      if (f) {
        const h = f.props.children,
          m = u.map((y) =>
            y === f
              ? b.Children.count(h) > 1
                ? b.Children.only(null)
                : b.isValidElement(h)
                  ? h.props.children
                  : null
              : y,
          );
        return S.jsx(t, {
          ...c,
          ref: i,
          children: b.isValidElement(h) ? b.cloneElement(h, void 0, m) : null,
        });
      }
      return S.jsx(t, { ...c, ref: i, children: l });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
var $O = zO("Slot");
function WO(e) {
  const t = b.forwardRef((n, s) => {
    let { children: i, ...l } = n;
    if (
      (KS(i) && typeof Ac == "function" && (i = Ac(i._payload)),
      b.isValidElement(i))
    ) {
      const c = QO(i),
        u = KO(l, i.props);
      return (
        i.type !== b.Fragment && (u.ref = s ? ka(s, c) : c),
        b.cloneElement(i, u)
      );
    }
    return b.Children.count(i) > 1 ? b.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var HO = Symbol("radix.slottable");
function qO(e) {
  return (
    b.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === HO
  );
}
function KO(e, t) {
  const n = { ...t };
  for (const s in t) {
    const i = e[s],
      l = t[s];
    /^on[A-Z]/.test(s)
      ? i && l
        ? (n[s] = (...u) => {
            const f = l(...u);
            return (i(...u), f);
          })
        : i && (n[s] = i)
      : s === "style"
        ? (n[s] = { ...i, ...l })
        : s === "className" && (n[s] = [i, l].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function QO(e) {
  var s, i;
  let t =
      (s = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
        ? void 0
        : s.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t =
        (i = Object.getOwnPropertyDescriptor(e, "ref")) == null
          ? void 0
          : i.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
const GO = yx(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
      variants: {
        variant: {
          default:
            "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          destructive:
            "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
          outline:
            "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
          secondary:
            "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-9 px-4 py-2",
          sm: "h-8 rounded-md px-3 text-xs",
          lg: "h-10 rounded-md px-8",
          icon: "h-9 w-9",
        },
      },
      defaultVariants: { variant: "default", size: "default" },
    },
  ),
  Uo = b.forwardRef(
    ({ className: e, variant: t, size: n, asChild: s = !1, ...i }, l) => {
      const c = s ? $O : "button";
      return S.jsx(c, {
        className: ft(GO({ variant: t, size: n, className: e })),
        ref: l,
        ...i,
      });
    },
  );
Uo.displayName = "Button";
const y0 = [
  { label: "Služby", href: "#sluzby" },
  { label: "Jak to funguje", href: "#proces" },
  { label: "Reference", href: "#reference" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];
function YO() {
  const [e, t] = b.useState(!1),
    [n, s] = b.useState(!1);
  return (
    b.useEffect(() => {
      const i = () => t(window.scrollY > 20);
      return (
        window.addEventListener("scroll", i),
        () => window.removeEventListener("scroll", i)
      );
    }, []),
    S.jsxs(S.Fragment, {
      children: [
        S.jsx("div", {
          className: "bg-neutral-800 text-white text-sm py-2 hidden md:block",
          children: S.jsxs("div", {
            className:
              "max-w-7xl mx-auto px-6 flex items-center justify-between",
            children: [
              S.jsx("span", {
                className: "text-neutral-300",
                children: "Jezdíme po celé ČR · Po–Pá 7:00–18:00",
              }),
              S.jsxs("div", {
                className: "flex items-center gap-6",
                children: [
                  S.jsxs("a", {
                    href: "tel:+420774509409",
                    className:
                      "flex items-center gap-2 hover:text-primary transition-colors",
                    children: [
                      S.jsx(bc, { className: "h-3.5 w-3.5" }),
                      "+420 774 509 409",
                    ],
                  }),
                  S.jsxs("a", {
                    href: "mailto:info@nanofusion.cz",
                    className:
                      "flex items-center gap-2 hover:text-primary transition-colors",
                    children: [
                      S.jsx(xx, { className: "h-3.5 w-3.5" }),
                      "info@nanofusion.cz",
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
        S.jsxs("header", {
          className: `sticky top-0 z-50 transition-all duration-300 ${e ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"}`,
          children: [
            S.jsxs("div", {
              className:
                "max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20",
              children: [
                S.jsx("a", {
                  href: "#",
                  className: "flex-shrink-0",
                  children: S.jsx("img", {
                    src: "/static/logo.jpg",
                    alt: "NANOfusion",
                    className: "h-10 md:h-12 w-auto",
                  }),
                }),
                S.jsx("nav", {
                  className: "hidden lg:flex items-center gap-1",
                  children: y0.map((i) =>
                    S.jsx(
                      "a",
                      {
                        href: i.href,
                        className:
                          "px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-50 transition-all",
                        children: i.label,
                      },
                      i.href,
                    ),
                  ),
                }),
                S.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [
                    S.jsxs("a", {
                      href: "tel:+420774509409",
                      className:
                        "hidden md:flex items-center gap-2 text-sm font-semibold text-neutral-700",
                      children: [
                        S.jsx("div", {
                          className:
                            "h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center",
                          children: S.jsx(bc, {
                            className: "h-4 w-4 text-primary",
                          }),
                        }),
                        "+420 774 509 409",
                      ],
                    }),
                    S.jsx(Uo, {
                      className:
                        "bg-primary hover:bg-primary/90 text-white font-semibold px-6 rounded-full hidden sm:flex",
                      onClick: () => {
                        var i;
                        return (i = document.getElementById("kontakt")) == null
                          ? void 0
                          : i.scrollIntoView({ behavior: "smooth" });
                      },
                      children: "Nezávazná poptávka",
                    }),
                    S.jsx("button", {
                      className:
                        "lg:hidden p-2 rounded-lg hover:bg-neutral-100",
                      onClick: () => s(!n),
                      children: n
                        ? S.jsx(bx, { className: "h-6 w-6" })
                        : S.jsx(XT, { className: "h-6 w-6" }),
                    }),
                  ],
                }),
              ],
            }),
            n &&
              S.jsxs("div", {
                className: "lg:hidden border-t bg-white px-6 py-4 space-y-1",
                children: [
                  y0.map((i) =>
                    S.jsx(
                      "a",
                      {
                        href: i.href,
                        className:
                          "block px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg",
                        onClick: () => s(!1),
                        children: i.label,
                      },
                      i.href,
                    ),
                  ),
                  S.jsx(Uo, {
                    className:
                      "w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-full mt-3",
                    onClick: () => {
                      var i;
                      (s(!1),
                        (i = document.getElementById("kontakt")) == null ||
                          i.scrollIntoView({ behavior: "smooth" }));
                    },
                    children: "Nezávazná poptávka",
                  }),
                ],
              }),
          ],
        }),
      ],
    })
  );
}
const QS = b.createContext({});
function XO(e) {
  const t = b.useRef(null);
  return (t.current === null && (t.current = e()), t.current);
}
const mp = b.createContext(null),
  GS = b.createContext({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  });
function JO(e = !0) {
  const t = b.useContext(mp);
  if (t === null) return [!0, null];
  const { isPresent: n, onExitComplete: s, register: i } = t,
    l = b.useId();
  b.useEffect(() => {
    e && i(l);
  }, [e]);
  const c = b.useCallback(() => e && s && s(l), [l, s, e]);
  return !n && s ? [!1, c] : [!0];
}
const gp = typeof window < "u",
  ZO = gp ? b.useLayoutEffect : b.useEffect,
  Xt = (e) => e;
let YS = Xt;
function yp(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const zo = (e, t, n) => {
    const s = t - e;
    return s === 0 ? 1 : (n - e) / s;
  },
  ar = (e) => e * 1e3,
  lr = (e) => e / 1e3,
  e2 = { useManualTiming: !1 };
function t2(e) {
  let t = new Set(),
    n = new Set(),
    s = !1,
    i = !1;
  const l = new WeakSet();
  let c = { delta: 0, timestamp: 0, isProcessing: !1 };
  function u(h) {
    (l.has(h) && (f.schedule(h), e()), h(c));
  }
  const f = {
    schedule: (h, m = !1, y = !1) => {
      const C = y && s ? t : n;
      return (m && l.add(h), C.has(h) || C.add(h), h);
    },
    cancel: (h) => {
      (n.delete(h), l.delete(h));
    },
    process: (h) => {
      if (((c = h), s)) {
        i = !0;
        return;
      }
      ((s = !0),
        ([t, n] = [n, t]),
        t.forEach(u),
        t.clear(),
        (s = !1),
        i && ((i = !1), f.process(h)));
    },
  };
  return f;
}
const Yl = [
    "read",
    "resolveKeyframes",
    "update",
    "preRender",
    "render",
    "postRender",
  ],
  n2 = 40;
function XS(e, t) {
  let n = !1,
    s = !0;
  const i = { delta: 0, timestamp: 0, isProcessing: !1 },
    l = () => (n = !0),
    c = Yl.reduce((T, P) => ((T[P] = t2(l)), T), {}),
    {
      read: u,
      resolveKeyframes: f,
      update: h,
      preRender: m,
      render: y,
      postRender: w,
    } = c,
    C = () => {
      const T = performance.now();
      ((n = !1),
        (i.delta = s ? 1e3 / 60 : Math.max(Math.min(T - i.timestamp, n2), 1)),
        (i.timestamp = T),
        (i.isProcessing = !0),
        u.process(i),
        f.process(i),
        h.process(i),
        m.process(i),
        y.process(i),
        w.process(i),
        (i.isProcessing = !1),
        n && t && ((s = !1), e(C)));
    },
    E = () => {
      ((n = !0), (s = !0), i.isProcessing || e(C));
    };
  return {
    schedule: Yl.reduce((T, P) => {
      const R = c[P];
      return (
        (T[P] = (_, M = !1, V = !1) => (n || E(), R.schedule(_, M, V))),
        T
      );
    }, {}),
    cancel: (T) => {
      for (let P = 0; P < Yl.length; P++) c[Yl[P]].cancel(T);
    },
    state: i,
    steps: c,
  };
}
const {
    schedule: We,
    cancel: Yr,
    state: St,
    steps: kf,
  } = XS(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Xt, !0),
  JS = b.createContext({ strict: !1 }),
  v0 = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  $o = {};
for (const e in v0) $o[e] = { isEnabled: (t) => v0[e].some((n) => !!t[n]) };
function r2(e) {
  for (const t in e) $o[t] = { ...$o[t], ...e[t] };
}
const s2 = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function _c(e) {
  return (
    e.startsWith("while") ||
    (e.startsWith("drag") && e !== "draggable") ||
    e.startsWith("layout") ||
    e.startsWith("onTap") ||
    e.startsWith("onPan") ||
    e.startsWith("onLayout") ||
    s2.has(e)
  );
}
let ZS = (e) => !_c(e);
function o2(e) {
  e && (ZS = (t) => (t.startsWith("on") ? !_c(t) : e(t)));
}
try {
  o2(require("@emotion/is-prop-valid").default);
} catch {}
function i2(e, t, n) {
  const s = {};
  for (const i in e)
    (i === "values" && typeof e.values == "object") ||
      ((ZS(i) ||
        (n === !0 && _c(i)) ||
        (!t && !_c(i)) ||
        (e.draggable && i.startsWith("onDrag"))) &&
        (s[i] = e[i]));
  return s;
}
function a2(e) {
  if (typeof Proxy > "u") return e;
  const t = new Map(),
    n = (...s) => e(...s);
  return new Proxy(n, {
    get: (s, i) =>
      i === "create" ? e : (t.has(i) || t.set(i, e(i)), t.get(i)),
  });
}
const eu = b.createContext({});
function ia(e) {
  return typeof e == "string" || Array.isArray(e);
}
function tu(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
const vp = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  wp = ["initial", ...vp];
function nu(e) {
  return tu(e.animate) || wp.some((t) => ia(e[t]));
}
function eb(e) {
  return !!(nu(e) || e.variants);
}
function l2(e, t) {
  if (nu(e)) {
    const { initial: n, animate: s } = e;
    return {
      initial: n === !1 || ia(n) ? n : void 0,
      animate: ia(s) ? s : void 0,
    };
  }
  return e.inherit !== !1 ? t : {};
}
function c2(e) {
  const { initial: t, animate: n } = l2(e, b.useContext(eu));
  return b.useMemo(() => ({ initial: t, animate: n }), [w0(t), w0(n)]);
}
function w0(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const u2 = Symbol.for("motionComponentSymbol");
function xo(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.hasOwnProperty.call(e, "current")
  );
}
function d2(e, t, n) {
  return b.useCallback(
    (s) => {
      (s && e.onMount && e.onMount(s),
        t && (s ? t.mount(s) : t.unmount()),
        n && (typeof n == "function" ? n(s) : xo(n) && (n.current = s)));
    },
    [t],
  );
}
const xp = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  f2 = "framerAppearId",
  tb = "data-" + xp(f2),
  { schedule: Sp } = XS(queueMicrotask, !1),
  nb = b.createContext({});
function h2(e, t, n, s, i) {
  var l, c;
  const { visualElement: u } = b.useContext(eu),
    f = b.useContext(JS),
    h = b.useContext(mp),
    m = b.useContext(GS).reducedMotion,
    y = b.useRef(null);
  ((s = s || f.renderer),
    !y.current &&
      s &&
      (y.current = s(e, {
        visualState: t,
        parent: u,
        props: n,
        presenceContext: h,
        blockInitialAnimation: h ? h.initial === !1 : !1,
        reducedMotionConfig: m,
      })));
  const w = y.current,
    C = b.useContext(nb);
  w &&
    !w.projection &&
    i &&
    (w.type === "html" || w.type === "svg") &&
    p2(y.current, n, i, C);
  const E = b.useRef(!1);
  b.useInsertionEffect(() => {
    w && E.current && w.update(n, h);
  });
  const v = n[tb],
    x = b.useRef(
      !!v &&
        !(
          !((l = window.MotionHandoffIsComplete) === null || l === void 0) &&
          l.call(window, v)
        ) &&
        ((c = window.MotionHasOptimisedAnimation) === null || c === void 0
          ? void 0
          : c.call(window, v)),
    );
  return (
    ZO(() => {
      w &&
        ((E.current = !0),
        (window.MotionIsMounted = !0),
        w.updateFeatures(),
        Sp.render(w.render),
        x.current && w.animationState && w.animationState.animateChanges());
    }),
    b.useEffect(() => {
      w &&
        (!x.current && w.animationState && w.animationState.animateChanges(),
        x.current &&
          (queueMicrotask(() => {
            var T;
            (T = window.MotionHandoffMarkAsComplete) === null ||
              T === void 0 ||
              T.call(window, v);
          }),
          (x.current = !1)));
    }),
    w
  );
}
function p2(e, t, n, s) {
  const {
    layoutId: i,
    layout: l,
    drag: c,
    dragConstraints: u,
    layoutScroll: f,
    layoutRoot: h,
  } = t;
  ((e.projection = new n(
    e.latestValues,
    t["data-framer-portal-id"] ? void 0 : rb(e.parent),
  )),
    e.projection.setOptions({
      layoutId: i,
      layout: l,
      alwaysMeasureLayout: !!c || (u && xo(u)),
      visualElement: e,
      animationType: typeof l == "string" ? l : "both",
      initialPromotionConfig: s,
      layoutScroll: f,
      layoutRoot: h,
    }));
}
function rb(e) {
  if (e) return e.options.allowProjection !== !1 ? e.projection : rb(e.parent);
}
function m2({
  preloadedFeatures: e,
  createVisualElement: t,
  useRender: n,
  useVisualState: s,
  Component: i,
}) {
  var l, c;
  e && r2(e);
  function u(h, m) {
    let y;
    const w = { ...b.useContext(GS), ...h, layoutId: g2(h) },
      { isStatic: C } = w,
      E = c2(h),
      v = s(h, C);
    if (!C && gp) {
      y2();
      const x = v2(w);
      ((y = x.MeasureLayout),
        (E.visualElement = h2(i, v, w, t, x.ProjectionNode)));
    }
    return S.jsxs(eu.Provider, {
      value: E,
      children: [
        y && E.visualElement
          ? S.jsx(y, { visualElement: E.visualElement, ...w })
          : null,
        n(i, h, d2(v, E.visualElement, m), v, C, E.visualElement),
      ],
    });
  }
  u.displayName = `motion.${typeof i == "string" ? i : `create(${(c = (l = i.displayName) !== null && l !== void 0 ? l : i.name) !== null && c !== void 0 ? c : ""})`}`;
  const f = b.forwardRef(u);
  return ((f[u2] = i), f);
}
function g2({ layoutId: e }) {
  const t = b.useContext(QS).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function y2(e, t) {
  b.useContext(JS).strict;
}
function v2(e) {
  const { drag: t, layout: n } = $o;
  if (!t && !n) return {};
  const s = { ...t, ...n };
  return {
    MeasureLayout:
      (t != null && t.isEnabled(e)) || (n != null && n.isEnabled(e))
        ? s.MeasureLayout
        : void 0,
    ProjectionNode: s.ProjectionNode,
  };
}
const w2 = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function bp(e) {
  return typeof e != "string" || e.includes("-")
    ? !1
    : !!(w2.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
function x0(e) {
  const t = [{}, {}];
  return (
    e == null ||
      e.values.forEach((n, s) => {
        ((t[0][s] = n.get()), (t[1][s] = n.getVelocity()));
      }),
    t
  );
}
function Ep(e, t, n, s) {
  if (typeof t == "function") {
    const [i, l] = x0(s);
    t = t(n !== void 0 ? n : e.custom, i, l);
  }
  if (
    (typeof t == "string" && (t = e.variants && e.variants[t]),
    typeof t == "function")
  ) {
    const [i, l] = x0(s);
    t = t(n !== void 0 ? n : e.custom, i, l);
  }
  return t;
}
const Sh = (e) => Array.isArray(e),
  x2 = (e) => !!(e && typeof e == "object" && e.mix && e.toValue),
  S2 = (e) => (Sh(e) ? e[e.length - 1] || 0 : e),
  Nt = (e) => !!(e && e.getVelocity);
function mc(e) {
  const t = Nt(e) ? e.get() : e;
  return x2(t) ? t.toValue() : t;
}
function b2(
  { scrapeMotionValuesFromProps: e, createRenderState: t, onUpdate: n },
  s,
  i,
  l,
) {
  const c = { latestValues: E2(s, i, l, e), renderState: t() };
  return (
    n &&
      ((c.onMount = (u) => n({ props: s, current: u, ...c })),
      (c.onUpdate = (u) => n(u))),
    c
  );
}
const sb = (e) => (t, n) => {
  const s = b.useContext(eu),
    i = b.useContext(mp),
    l = () => b2(e, t, s, i);
  return n ? l() : XO(l);
};
function E2(e, t, n, s) {
  const i = {},
    l = s(e, {});
  for (const w in l) i[w] = mc(l[w]);
  let { initial: c, animate: u } = e;
  const f = nu(e),
    h = eb(e);
  t &&
    h &&
    !f &&
    e.inherit !== !1 &&
    (c === void 0 && (c = t.initial), u === void 0 && (u = t.animate));
  let m = n ? n.initial === !1 : !1;
  m = m || c === !1;
  const y = m ? u : c;
  if (y && typeof y != "boolean" && !tu(y)) {
    const w = Array.isArray(y) ? y : [y];
    for (let C = 0; C < w.length; C++) {
      const E = Ep(e, w[C]);
      if (E) {
        const { transitionEnd: v, transition: x, ...T } = E;
        for (const P in T) {
          let R = T[P];
          if (Array.isArray(R)) {
            const _ = m ? R.length - 1 : 0;
            R = R[_];
          }
          R !== null && (i[P] = R);
        }
        for (const P in v) i[P] = v[P];
      }
    }
  }
  return i;
}
const Qo = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  zs = new Set(Qo),
  ob = (e) => (t) => typeof t == "string" && t.startsWith(e),
  ib = ob("--"),
  C2 = ob("var(--"),
  Cp = (e) => (C2(e) ? k2.test(e.split("/*")[0].trim()) : !1),
  k2 =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  ab = (e, t) => (t && typeof e == "number" ? t.transform(e) : e),
  cr = (e, t, n) => (n > t ? t : n < e ? e : n),
  Go = {
    test: (e) => typeof e == "number",
    parse: parseFloat,
    transform: (e) => e,
  },
  aa = { ...Go, transform: (e) => cr(0, 1, e) },
  Xl = { ...Go, default: 1 },
  Ta = (e) => ({
    test: (t) =>
      typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  Ir = Ta("deg"),
  Un = Ta("%"),
  Ce = Ta("px"),
  T2 = Ta("vh"),
  P2 = Ta("vw"),
  S0 = {
    ...Un,
    parse: (e) => Un.parse(e) / 100,
    transform: (e) => Un.transform(e * 100),
  },
  R2 = {
    borderWidth: Ce,
    borderTopWidth: Ce,
    borderRightWidth: Ce,
    borderBottomWidth: Ce,
    borderLeftWidth: Ce,
    borderRadius: Ce,
    radius: Ce,
    borderTopLeftRadius: Ce,
    borderTopRightRadius: Ce,
    borderBottomRightRadius: Ce,
    borderBottomLeftRadius: Ce,
    width: Ce,
    maxWidth: Ce,
    height: Ce,
    maxHeight: Ce,
    top: Ce,
    right: Ce,
    bottom: Ce,
    left: Ce,
    padding: Ce,
    paddingTop: Ce,
    paddingRight: Ce,
    paddingBottom: Ce,
    paddingLeft: Ce,
    margin: Ce,
    marginTop: Ce,
    marginRight: Ce,
    marginBottom: Ce,
    marginLeft: Ce,
    backgroundPositionX: Ce,
    backgroundPositionY: Ce,
  },
  A2 = {
    rotate: Ir,
    rotateX: Ir,
    rotateY: Ir,
    rotateZ: Ir,
    scale: Xl,
    scaleX: Xl,
    scaleY: Xl,
    scaleZ: Xl,
    skew: Ir,
    skewX: Ir,
    skewY: Ir,
    distance: Ce,
    translateX: Ce,
    translateY: Ce,
    translateZ: Ce,
    x: Ce,
    y: Ce,
    z: Ce,
    perspective: Ce,
    transformPerspective: Ce,
    opacity: aa,
    originX: S0,
    originY: S0,
    originZ: Ce,
  },
  b0 = { ...Go, transform: Math.round },
  kp = {
    ...R2,
    ...A2,
    zIndex: b0,
    size: Ce,
    fillOpacity: aa,
    strokeOpacity: aa,
    numOctaves: b0,
  },
  _2 = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  N2 = Qo.length;
function O2(e, t, n) {
  let s = "",
    i = !0;
  for (let l = 0; l < N2; l++) {
    const c = Qo[l],
      u = e[c];
    if (u === void 0) continue;
    let f = !0;
    if (
      (typeof u == "number"
        ? (f = u === (c.startsWith("scale") ? 1 : 0))
        : (f = parseFloat(u) === 0),
      !f || n)
    ) {
      const h = ab(u, kp[c]);
      if (!f) {
        i = !1;
        const m = _2[c] || c;
        s += `${m}(${h}) `;
      }
      n && (t[c] = h);
    }
  }
  return ((s = s.trim()), n ? (s = n(t, i ? "" : s)) : i && (s = "none"), s);
}
function Tp(e, t, n) {
  const { style: s, vars: i, transformOrigin: l } = e;
  let c = !1,
    u = !1;
  for (const f in t) {
    const h = t[f];
    if (zs.has(f)) {
      c = !0;
      continue;
    } else if (ib(f)) {
      i[f] = h;
      continue;
    } else {
      const m = ab(h, kp[f]);
      f.startsWith("origin") ? ((u = !0), (l[f] = m)) : (s[f] = m);
    }
  }
  if (
    (t.transform ||
      (c || n
        ? (s.transform = O2(t, e.transform, n))
        : s.transform && (s.transform = "none")),
    u)
  ) {
    const { originX: f = "50%", originY: h = "50%", originZ: m = 0 } = l;
    s.transformOrigin = `${f} ${h} ${m}`;
  }
}
const j2 = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  L2 = { offset: "strokeDashoffset", array: "strokeDasharray" };
function M2(e, t, n = 1, s = 0, i = !0) {
  e.pathLength = 1;
  const l = i ? j2 : L2;
  e[l.offset] = Ce.transform(-s);
  const c = Ce.transform(t),
    u = Ce.transform(n);
  e[l.array] = `${c} ${u}`;
}
function E0(e, t, n) {
  return typeof e == "string" ? e : Ce.transform(t + n * e);
}
function D2(e, t, n) {
  const s = E0(t, e.x, e.width),
    i = E0(n, e.y, e.height);
  return `${s} ${i}`;
}
function Pp(
  e,
  {
    attrX: t,
    attrY: n,
    attrScale: s,
    originX: i,
    originY: l,
    pathLength: c,
    pathSpacing: u = 1,
    pathOffset: f = 0,
    ...h
  },
  m,
  y,
) {
  if ((Tp(e, h, y), m)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  ((e.attrs = e.style), (e.style = {}));
  const { attrs: w, style: C, dimensions: E } = e;
  (w.transform && (E && (C.transform = w.transform), delete w.transform),
    E &&
      (i !== void 0 || l !== void 0 || C.transform) &&
      (C.transformOrigin = D2(
        E,
        i !== void 0 ? i : 0.5,
        l !== void 0 ? l : 0.5,
      )),
    t !== void 0 && (w.x = t),
    n !== void 0 && (w.y = n),
    s !== void 0 && (w.scale = s),
    c !== void 0 && M2(w, c, u, f, !1));
}
const Rp = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} }),
  lb = () => ({ ...Rp(), attrs: {} }),
  Ap = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function cb(e, { style: t, vars: n }, s, i) {
  Object.assign(e.style, t, i && i.getProjectionStyles(s));
  for (const l in n) e.style.setProperty(l, n[l]);
}
const ub = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function db(e, t, n, s) {
  cb(e, t, void 0, s);
  for (const i in t.attrs) e.setAttribute(ub.has(i) ? i : xp(i), t.attrs[i]);
}
const Nc = {};
function I2(e) {
  Object.assign(Nc, e);
}
function fb(e, { layout: t, layoutId: n }) {
  return (
    zs.has(e) ||
    e.startsWith("origin") ||
    ((t || n !== void 0) && (!!Nc[e] || e === "opacity"))
  );
}
function _p(e, t, n) {
  var s;
  const { style: i } = e,
    l = {};
  for (const c in i)
    (Nt(i[c]) ||
      (t.style && Nt(t.style[c])) ||
      fb(c, e) ||
      ((s = n == null ? void 0 : n.getValue(c)) === null || s === void 0
        ? void 0
        : s.liveStyle) !== void 0) &&
      (l[c] = i[c]);
  return l;
}
function hb(e, t, n) {
  const s = _p(e, t, n);
  for (const i in e)
    if (Nt(e[i]) || Nt(t[i])) {
      const l =
        Qo.indexOf(i) !== -1
          ? "attr" + i.charAt(0).toUpperCase() + i.substring(1)
          : i;
      s[l] = e[i];
    }
  return s;
}
function F2(e, t) {
  try {
    t.dimensions =
      typeof e.getBBox == "function" ? e.getBBox() : e.getBoundingClientRect();
  } catch {
    t.dimensions = { x: 0, y: 0, width: 0, height: 0 };
  }
}
const C0 = ["x", "y", "width", "height", "cx", "cy", "r"],
  V2 = {
    useVisualState: sb({
      scrapeMotionValuesFromProps: hb,
      createRenderState: lb,
      onUpdate: ({
        props: e,
        prevProps: t,
        current: n,
        renderState: s,
        latestValues: i,
      }) => {
        if (!n) return;
        let l = !!e.drag;
        if (!l) {
          for (const u in i)
            if (zs.has(u)) {
              l = !0;
              break;
            }
        }
        if (!l) return;
        let c = !t;
        if (t)
          for (let u = 0; u < C0.length; u++) {
            const f = C0[u];
            e[f] !== t[f] && (c = !0);
          }
        c &&
          We.read(() => {
            (F2(n, s),
              We.render(() => {
                (Pp(s, i, Ap(n.tagName), e.transformTemplate), db(n, s));
              }));
          });
      },
    }),
  },
  B2 = {
    useVisualState: sb({
      scrapeMotionValuesFromProps: _p,
      createRenderState: Rp,
    }),
  };
function pb(e, t, n) {
  for (const s in t) !Nt(t[s]) && !fb(s, n) && (e[s] = t[s]);
}
function U2({ transformTemplate: e }, t) {
  return b.useMemo(() => {
    const n = Rp();
    return (Tp(n, t, e), Object.assign({}, n.vars, n.style));
  }, [t]);
}
function z2(e, t) {
  const n = e.style || {},
    s = {};
  return (pb(s, n, e), Object.assign(s, U2(e, t)), s);
}
function $2(e, t) {
  const n = {},
    s = z2(e, t);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((n.draggable = !1),
      (s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none"),
      (s.touchAction =
        e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`)),
    e.tabIndex === void 0 &&
      (e.onTap || e.onTapStart || e.whileTap) &&
      (n.tabIndex = 0),
    (n.style = s),
    n
  );
}
function W2(e, t, n, s) {
  const i = b.useMemo(() => {
    const l = lb();
    return (
      Pp(l, t, Ap(s), e.transformTemplate),
      { ...l.attrs, style: { ...l.style } }
    );
  }, [t]);
  if (e.style) {
    const l = {};
    (pb(l, e.style, e), (i.style = { ...l, ...i.style }));
  }
  return i;
}
function H2(e = !1) {
  return (n, s, i, { latestValues: l }, c) => {
    const f = (bp(n) ? W2 : $2)(s, l, c, n),
      h = i2(s, typeof n == "string", e),
      m = n !== b.Fragment ? { ...h, ...f, ref: i } : {},
      { children: y } = s,
      w = b.useMemo(() => (Nt(y) ? y.get() : y), [y]);
    return b.createElement(n, { ...m, children: w });
  };
}
function q2(e, t) {
  return function (s, { forwardMotionProps: i } = { forwardMotionProps: !1 }) {
    const c = {
      ...(bp(s) ? V2 : B2),
      preloadedFeatures: e,
      useRender: H2(i),
      createVisualElement: t,
      Component: s,
    };
    return m2(c);
  };
}
function mb(e, t) {
  if (!Array.isArray(t)) return !1;
  const n = t.length;
  if (n !== e.length) return !1;
  for (let s = 0; s < n; s++) if (t[s] !== e[s]) return !1;
  return !0;
}
function ru(e, t, n) {
  const s = e.getProps();
  return Ep(s, t, n !== void 0 ? n : s.custom, e);
}
const K2 = yp(() => window.ScrollTimeline !== void 0);
class Q2 {
  constructor(t) {
    ((this.stop = () => this.runAll("stop")),
      (this.animations = t.filter(Boolean)));
  }
  get finished() {
    return Promise.all(
      this.animations.map((t) => ("finished" in t ? t.finished : t)),
    );
  }
  getAll(t) {
    return this.animations[0][t];
  }
  setAll(t, n) {
    for (let s = 0; s < this.animations.length; s++) this.animations[s][t] = n;
  }
  attachTimeline(t, n) {
    const s = this.animations.map((i) => {
      if (K2() && i.attachTimeline) return i.attachTimeline(t);
      if (typeof n == "function") return n(i);
    });
    return () => {
      s.forEach((i, l) => {
        (i && i(), this.animations[l].stop());
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(t) {
    this.setAll("time", t);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(t) {
    this.setAll("speed", t);
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    let t = 0;
    for (let n = 0; n < this.animations.length; n++)
      t = Math.max(t, this.animations[n].duration);
    return t;
  }
  runAll(t) {
    this.animations.forEach((n) => n[t]());
  }
  flatten() {
    this.runAll("flatten");
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
class G2 extends Q2 {
  then(t, n) {
    return Promise.all(this.animations).then(t).catch(n);
  }
}
function Np(e, t) {
  return e ? e[t] || e.default || e : void 0;
}
const bh = 2e4;
function gb(e) {
  let t = 0;
  const n = 50;
  let s = e.next(t);
  for (; !s.done && t < bh; ) ((t += n), (s = e.next(t)));
  return t >= bh ? 1 / 0 : t;
}
function Op(e) {
  return typeof e == "function";
}
function k0(e, t) {
  ((e.timeline = t), (e.onfinish = null));
}
const jp = (e) => Array.isArray(e) && typeof e[0] == "number",
  Y2 = { linearEasing: void 0 };
function X2(e, t) {
  const n = yp(e);
  return () => {
    var s;
    return (s = Y2[t]) !== null && s !== void 0 ? s : n();
  };
}
const Oc = X2(() => {
    try {
      document
        .createElement("div")
        .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  yb = (e, t, n = 10) => {
    let s = "";
    const i = Math.max(Math.round(t / n), 2);
    for (let l = 0; l < i; l++) s += e(zo(0, i - 1, l)) + ", ";
    return `linear(${s.substring(0, s.length - 2)})`;
  };
function vb(e) {
  return !!(
    (typeof e == "function" && Oc()) ||
    !e ||
    (typeof e == "string" && (e in Eh || Oc())) ||
    jp(e) ||
    (Array.isArray(e) && e.every(vb))
  );
}
const Qi = ([e, t, n, s]) => `cubic-bezier(${e}, ${t}, ${n}, ${s})`,
  Eh = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: Qi([0, 0.65, 0.55, 1]),
    circOut: Qi([0.55, 0, 1, 0.45]),
    backIn: Qi([0.31, 0.01, 0.66, -0.59]),
    backOut: Qi([0.33, 1.53, 0.69, 0.99]),
  };
function wb(e, t) {
  if (e)
    return typeof e == "function" && Oc()
      ? yb(e, t)
      : jp(e)
        ? Qi(e)
        : Array.isArray(e)
          ? e.map((n) => wb(n, t) || Eh.easeOut)
          : Eh[e];
}
const Sn = { x: !1, y: !1 };
function xb() {
  return Sn.x || Sn.y;
}
function J2(e, t, n) {
  var s;
  if (e instanceof Element) return [e];
  if (typeof e == "string") {
    let i = document;
    const l = (s = void 0) !== null && s !== void 0 ? s : i.querySelectorAll(e);
    return l ? Array.from(l) : [];
  }
  return Array.from(e);
}
function Sb(e, t) {
  const n = J2(e),
    s = new AbortController(),
    i = { passive: !0, ...t, signal: s.signal };
  return [n, i, () => s.abort()];
}
function T0(e) {
  return (t) => {
    t.pointerType === "touch" || xb() || e(t);
  };
}
function Z2(e, t, n = {}) {
  const [s, i, l] = Sb(e, n),
    c = T0((u) => {
      const { target: f } = u,
        h = t(u);
      if (typeof h != "function" || !f) return;
      const m = T0((y) => {
        (h(y), f.removeEventListener("pointerleave", m));
      });
      f.addEventListener("pointerleave", m, i);
    });
  return (
    s.forEach((u) => {
      u.addEventListener("pointerenter", c, i);
    }),
    l
  );
}
const bb = (e, t) => (t ? (e === t ? !0 : bb(e, t.parentElement)) : !1),
  Lp = (e) =>
    e.pointerType === "mouse"
      ? typeof e.button != "number" || e.button <= 0
      : e.isPrimary !== !1,
  ej = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function tj(e) {
  return ej.has(e.tagName) || e.tabIndex !== -1;
}
const Gi = new WeakSet();
function P0(e) {
  return (t) => {
    t.key === "Enter" && e(t);
  };
}
function Tf(e, t) {
  e.dispatchEvent(
    new PointerEvent("pointer" + t, { isPrimary: !0, bubbles: !0 }),
  );
}
const nj = (e, t) => {
  const n = e.currentTarget;
  if (!n) return;
  const s = P0(() => {
    if (Gi.has(n)) return;
    Tf(n, "down");
    const i = P0(() => {
        Tf(n, "up");
      }),
      l = () => Tf(n, "cancel");
    (n.addEventListener("keyup", i, t), n.addEventListener("blur", l, t));
  });
  (n.addEventListener("keydown", s, t),
    n.addEventListener("blur", () => n.removeEventListener("keydown", s), t));
};
function R0(e) {
  return Lp(e) && !xb();
}
function rj(e, t, n = {}) {
  const [s, i, l] = Sb(e, n),
    c = (u) => {
      const f = u.currentTarget;
      if (!R0(u) || Gi.has(f)) return;
      Gi.add(f);
      const h = t(u),
        m = (C, E) => {
          (window.removeEventListener("pointerup", y),
            window.removeEventListener("pointercancel", w),
            !(!R0(C) || !Gi.has(f)) &&
              (Gi.delete(f), typeof h == "function" && h(C, { success: E })));
        },
        y = (C) => {
          m(C, n.useGlobalTarget || bb(f, C.target));
        },
        w = (C) => {
          m(C, !1);
        };
      (window.addEventListener("pointerup", y, i),
        window.addEventListener("pointercancel", w, i));
    };
  return (
    s.forEach((u) => {
      (!tj(u) && u.getAttribute("tabindex") === null && (u.tabIndex = 0),
        (n.useGlobalTarget ? window : u).addEventListener("pointerdown", c, i),
        u.addEventListener("focus", (h) => nj(h, i), i));
    }),
    l
  );
}
function sj(e) {
  return e === "x" || e === "y"
    ? Sn[e]
      ? null
      : ((Sn[e] = !0),
        () => {
          Sn[e] = !1;
        })
    : Sn.x || Sn.y
      ? null
      : ((Sn.x = Sn.y = !0),
        () => {
          Sn.x = Sn.y = !1;
        });
}
const Eb = new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Qo,
]);
let gc;
function oj() {
  gc = void 0;
}
const zn = {
  now: () => (
    gc === void 0 &&
      zn.set(
        St.isProcessing || e2.useManualTiming
          ? St.timestamp
          : performance.now(),
      ),
    gc
  ),
  set: (e) => {
    ((gc = e), queueMicrotask(oj));
  },
};
function Mp(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function Dp(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
class Ip {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return (Mp(this.subscriptions, t), () => Dp(this.subscriptions, t));
  }
  notify(t, n, s) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1) this.subscriptions[0](t, n, s);
      else
        for (let l = 0; l < i; l++) {
          const c = this.subscriptions[l];
          c && c(t, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
function Cb(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const A0 = 30,
  ij = (e) => !isNaN(parseFloat(e));
class aj {
  constructor(t, n = {}) {
    ((this.version = "11.18.2"),
      (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (s, i = !0) => {
        const l = zn.now();
        (this.updatedAt !== l && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(s),
          this.current !== this.prev &&
            this.events.change &&
            this.events.change.notify(this.current),
          i &&
            this.events.renderRequest &&
            this.events.renderRequest.notify(this.current));
      }),
      (this.hasAnimated = !1),
      this.setCurrent(t),
      (this.owner = n.owner));
  }
  setCurrent(t) {
    ((this.current = t),
      (this.updatedAt = zn.now()),
      this.canTrackVelocity === null &&
        t !== void 0 &&
        (this.canTrackVelocity = ij(this.current)));
  }
  setPrevFrameValue(t = this.current) {
    ((this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt));
  }
  onChange(t) {
    return this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new Ip());
    const s = this.events[t].add(n);
    return t === "change"
      ? () => {
          (s(),
            We.read(() => {
              this.events.change.getSize() || this.stop();
            }));
        }
      : s;
  }
  clearListeners() {
    for (const t in this.events) this.events[t].clear();
  }
  attach(t, n) {
    ((this.passiveEffect = t), (this.stopPassiveEffect = n));
  }
  set(t, n = !0) {
    !n || !this.passiveEffect
      ? this.updateAndNotify(t, n)
      : this.passiveEffect(t, this.updateAndNotify);
  }
  setWithVelocity(t, n, s) {
    (this.set(n),
      (this.prev = void 0),
      (this.prevFrameValue = t),
      (this.prevUpdatedAt = this.updatedAt - s));
  }
  jump(t, n = !0) {
    (this.updateAndNotify(t),
      (this.prev = t),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      n && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const t = zn.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      t - this.updatedAt > A0
    )
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, A0);
    return Cb(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  start(t) {
    return (
      this.stop(),
      new Promise((n) => {
        ((this.hasAnimated = !0),
          (this.animation = t(n)),
          this.events.animationStart && this.events.animationStart.notify());
      }).then(() => {
        (this.events.animationComplete &&
          this.events.animationComplete.notify(),
          this.clearAnimation());
      })
    );
  }
  stop() {
    (this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation());
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    (this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
}
function la(e, t) {
  return new aj(e, t);
}
function lj(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, la(n));
}
function cj(e, t) {
  const n = ru(e, t);
  let { transitionEnd: s = {}, transition: i = {}, ...l } = n || {};
  l = { ...l, ...s };
  for (const c in l) {
    const u = S2(l[c]);
    lj(e, c, u);
  }
}
function uj(e) {
  return !!(Nt(e) && e.add);
}
function Ch(e, t) {
  const n = e.getValue("willChange");
  if (uj(n)) return n.add(t);
}
function kb(e) {
  return e.props[tb];
}
const Tb = (e, t, n) =>
    (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  dj = 1e-7,
  fj = 12;
function hj(e, t, n, s, i) {
  let l,
    c,
    u = 0;
  do ((c = t + (n - t) / 2), (l = Tb(c, s, i) - e), l > 0 ? (n = c) : (t = c));
  while (Math.abs(l) > dj && ++u < fj);
  return c;
}
function Pa(e, t, n, s) {
  if (e === t && n === s) return Xt;
  const i = (l) => hj(l, 0, 1, e, n);
  return (l) => (l === 0 || l === 1 ? l : Tb(i(l), t, s));
}
const Pb = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
  Rb = (e) => (t) => 1 - e(1 - t),
  Ab = Pa(0.33, 1.53, 0.69, 0.99),
  Fp = Rb(Ab),
  _b = Pb(Fp),
  Nb = (e) =>
    (e *= 2) < 1 ? 0.5 * Fp(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
  Vp = (e) => 1 - Math.sin(Math.acos(e)),
  Ob = Rb(Vp),
  jb = Pb(Vp),
  Lb = (e) => /^0[^.\s]+$/u.test(e);
function pj(e) {
  return typeof e == "number"
    ? e === 0
    : e !== null
      ? e === "none" || e === "0" || Lb(e)
      : !0;
}
const ea = (e) => Math.round(e * 1e5) / 1e5,
  Bp = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function mj(e) {
  return e == null;
}
const gj =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  Up = (e, t) => (n) =>
    !!(
      (typeof n == "string" && gj.test(n) && n.startsWith(e)) ||
      (t && !mj(n) && Object.prototype.hasOwnProperty.call(n, t))
    ),
  Mb = (e, t, n) => (s) => {
    if (typeof s != "string") return s;
    const [i, l, c, u] = s.match(Bp);
    return {
      [e]: parseFloat(i),
      [t]: parseFloat(l),
      [n]: parseFloat(c),
      alpha: u !== void 0 ? parseFloat(u) : 1,
    };
  },
  yj = (e) => cr(0, 255, e),
  Pf = { ...Go, transform: (e) => Math.round(yj(e)) },
  Es = {
    test: Up("rgb", "red"),
    parse: Mb("red", "green", "blue"),
    transform: ({ red: e, green: t, blue: n, alpha: s = 1 }) =>
      "rgba(" +
      Pf.transform(e) +
      ", " +
      Pf.transform(t) +
      ", " +
      Pf.transform(n) +
      ", " +
      ea(aa.transform(s)) +
      ")",
  };
function vj(e) {
  let t = "",
    n = "",
    s = "",
    i = "";
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)),
        (n = e.substring(3, 5)),
        (s = e.substring(5, 7)),
        (i = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (n = e.substring(2, 3)),
        (s = e.substring(3, 4)),
        (i = e.substring(4, 5)),
        (t += t),
        (n += n),
        (s += s),
        (i += i)),
    {
      red: parseInt(t, 16),
      green: parseInt(n, 16),
      blue: parseInt(s, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  );
}
const kh = { test: Up("#"), parse: vj, transform: Es.transform },
  So = {
    test: Up("hsl", "hue"),
    parse: Mb("hue", "saturation", "lightness"),
    transform: ({ hue: e, saturation: t, lightness: n, alpha: s = 1 }) =>
      "hsla(" +
      Math.round(e) +
      ", " +
      Un.transform(ea(t)) +
      ", " +
      Un.transform(ea(n)) +
      ", " +
      ea(aa.transform(s)) +
      ")",
  },
  At = {
    test: (e) => Es.test(e) || kh.test(e) || So.test(e),
    parse: (e) =>
      Es.test(e) ? Es.parse(e) : So.test(e) ? So.parse(e) : kh.parse(e),
    transform: (e) =>
      typeof e == "string"
        ? e
        : e.hasOwnProperty("red")
          ? Es.transform(e)
          : So.transform(e),
  },
  wj =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function xj(e) {
  var t, n;
  return (
    isNaN(e) &&
    typeof e == "string" &&
    (((t = e.match(Bp)) === null || t === void 0 ? void 0 : t.length) || 0) +
      (((n = e.match(wj)) === null || n === void 0 ? void 0 : n.length) || 0) >
      0
  );
}
const Db = "number",
  Ib = "color",
  Sj = "var",
  bj = "var(",
  _0 = "${}",
  Ej =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ca(e) {
  const t = e.toString(),
    n = [],
    s = { color: [], number: [], var: [] },
    i = [];
  let l = 0;
  const u = t
    .replace(
      Ej,
      (f) => (
        At.test(f)
          ? (s.color.push(l), i.push(Ib), n.push(At.parse(f)))
          : f.startsWith(bj)
            ? (s.var.push(l), i.push(Sj), n.push(f))
            : (s.number.push(l), i.push(Db), n.push(parseFloat(f))),
        ++l,
        _0
      ),
    )
    .split(_0);
  return { values: n, split: u, indexes: s, types: i };
}
function Fb(e) {
  return ca(e).values;
}
function Vb(e) {
  const { split: t, types: n } = ca(e),
    s = t.length;
  return (i) => {
    let l = "";
    for (let c = 0; c < s; c++)
      if (((l += t[c]), i[c] !== void 0)) {
        const u = n[c];
        u === Db
          ? (l += ea(i[c]))
          : u === Ib
            ? (l += At.transform(i[c]))
            : (l += i[c]);
      }
    return l;
  };
}
const Cj = (e) => (typeof e == "number" ? 0 : e);
function kj(e) {
  const t = Fb(e);
  return Vb(e)(t.map(Cj));
}
const Xr = {
    test: xj,
    parse: Fb,
    createTransformer: Vb,
    getAnimatableNone: kj,
  },
  Tj = new Set(["brightness", "contrast", "saturate", "opacity"]);
function Pj(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow") return e;
  const [s] = n.match(Bp) || [];
  if (!s) return e;
  const i = n.replace(s, "");
  let l = Tj.has(t) ? 1 : 0;
  return (s !== n && (l *= 100), t + "(" + l + i + ")");
}
const Rj = /\b([a-z-]*)\(.*?\)/gu,
  Th = {
    ...Xr,
    getAnimatableNone: (e) => {
      const t = e.match(Rj);
      return t ? t.map(Pj).join(" ") : e;
    },
  },
  Aj = {
    ...kp,
    color: At,
    backgroundColor: At,
    outlineColor: At,
    fill: At,
    stroke: At,
    borderColor: At,
    borderTopColor: At,
    borderRightColor: At,
    borderBottomColor: At,
    borderLeftColor: At,
    filter: Th,
    WebkitFilter: Th,
  },
  zp = (e) => Aj[e];
function Bb(e, t) {
  let n = zp(e);
  return (
    n !== Th && (n = Xr),
    n.getAnimatableNone ? n.getAnimatableNone(t) : void 0
  );
}
const _j = new Set(["auto", "none", "0"]);
function Nj(e, t, n) {
  let s = 0,
    i;
  for (; s < e.length && !i; ) {
    const l = e[s];
    (typeof l == "string" && !_j.has(l) && ca(l).values.length && (i = e[s]),
      s++);
  }
  if (i && n) for (const l of t) e[l] = Bb(n, i);
}
const N0 = (e) => e === Go || e === Ce,
  O0 = (e, t) => parseFloat(e.split(", ")[t]),
  j0 =
    (e, t) =>
    (n, { transform: s }) => {
      if (s === "none" || !s) return 0;
      const i = s.match(/^matrix3d\((.+)\)$/u);
      if (i) return O0(i[1], t);
      {
        const l = s.match(/^matrix\((.+)\)$/u);
        return l ? O0(l[1], e) : 0;
      }
    },
  Oj = new Set(["x", "y", "z"]),
  jj = Qo.filter((e) => !Oj.has(e));
function Lj(e) {
  const t = [];
  return (
    jj.forEach((n) => {
      const s = e.getValue(n);
      s !== void 0 &&
        (t.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
    }),
    t
  );
}
const Wo = {
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  x: j0(4, 13),
  y: j0(5, 14),
};
Wo.translateX = Wo.x;
Wo.translateY = Wo.y;
const Ls = new Set();
let Ph = !1,
  Rh = !1;
function Ub() {
  if (Rh) {
    const e = Array.from(Ls).filter((s) => s.needsMeasurement),
      t = new Set(e.map((s) => s.element)),
      n = new Map();
    (t.forEach((s) => {
      const i = Lj(s);
      i.length && (n.set(s, i), s.render());
    }),
      e.forEach((s) => s.measureInitialState()),
      t.forEach((s) => {
        s.render();
        const i = n.get(s);
        i &&
          i.forEach(([l, c]) => {
            var u;
            (u = s.getValue(l)) === null || u === void 0 || u.set(c);
          });
      }),
      e.forEach((s) => s.measureEndState()),
      e.forEach((s) => {
        s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
      }));
  }
  ((Rh = !1), (Ph = !1), Ls.forEach((e) => e.complete()), Ls.clear());
}
function zb() {
  Ls.forEach((e) => {
    (e.readKeyframes(), e.needsMeasurement && (Rh = !0));
  });
}
function Mj() {
  (zb(), Ub());
}
class $p {
  constructor(t, n, s, i, l, c = !1) {
    ((this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...t]),
      (this.onComplete = n),
      (this.name = s),
      (this.motionValue = i),
      (this.element = l),
      (this.isAsync = c));
  }
  scheduleResolve() {
    ((this.isScheduled = !0),
      this.isAsync
        ? (Ls.add(this),
          Ph || ((Ph = !0), We.read(zb), We.resolveKeyframes(Ub)))
        : (this.readKeyframes(), this.complete()));
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: t,
      name: n,
      element: s,
      motionValue: i,
    } = this;
    for (let l = 0; l < t.length; l++)
      if (t[l] === null)
        if (l === 0) {
          const c = i == null ? void 0 : i.get(),
            u = t[t.length - 1];
          if (c !== void 0) t[0] = c;
          else if (s && n) {
            const f = s.readValue(n, u);
            f != null && (t[0] = f);
          }
          (t[0] === void 0 && (t[0] = u), i && c === void 0 && i.set(t[0]));
        } else t[l] = t[l - 1];
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    ((this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      Ls.delete(this));
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), Ls.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const $b = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),
  Dj = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function Ij(e) {
  const t = Dj.exec(e);
  if (!t) return [,];
  const [, n, s, i] = t;
  return [`--${n ?? s}`, i];
}
function Wb(e, t, n = 1) {
  const [s, i] = Ij(e);
  if (!s) return;
  const l = window.getComputedStyle(t).getPropertyValue(s);
  if (l) {
    const c = l.trim();
    return $b(c) ? parseFloat(c) : c;
  }
  return Cp(i) ? Wb(i, t, n + 1) : i;
}
const Hb = (e) => (t) => t.test(e),
  Fj = { test: (e) => e === "auto", parse: (e) => e },
  qb = [Go, Ce, Un, Ir, P2, T2, Fj],
  L0 = (e) => qb.find(Hb(e));
class Kb extends $p {
  constructor(t, n, s, i, l) {
    super(t, n, s, i, l, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: s } = this;
    if (!n || !n.current) return;
    super.readKeyframes();
    for (let f = 0; f < t.length; f++) {
      let h = t[f];
      if (typeof h == "string" && ((h = h.trim()), Cp(h))) {
        const m = Wb(h, n.current);
        (m !== void 0 && (t[f] = m),
          f === t.length - 1 && (this.finalKeyframe = h));
      }
    }
    if ((this.resolveNoneKeyframes(), !Eb.has(s) || t.length !== 2)) return;
    const [i, l] = t,
      c = L0(i),
      u = L0(l);
    if (c !== u)
      if (N0(c) && N0(u))
        for (let f = 0; f < t.length; f++) {
          const h = t[f];
          typeof h == "string" && (t[f] = parseFloat(h));
        }
      else this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this,
      s = [];
    for (let i = 0; i < t.length; i++) pj(t[i]) && s.push(i);
    s.length && Nj(t, s, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: s } = this;
    if (!t || !t.current) return;
    (s === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = Wo[s](
        t.measureViewportBox(),
        window.getComputedStyle(t.current),
      )),
      (n[0] = this.measuredOrigin));
    const i = n[n.length - 1];
    i !== void 0 && t.getValue(s, i).jump(i, !1);
  }
  measureEndState() {
    var t;
    const { element: n, name: s, unresolvedKeyframes: i } = this;
    if (!n || !n.current) return;
    const l = n.getValue(s);
    l && l.jump(this.measuredOrigin, !1);
    const c = i.length - 1,
      u = i[c];
    ((i[c] = Wo[s](n.measureViewportBox(), window.getComputedStyle(n.current))),
      u !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = u),
      !((t = this.removedTransforms) === null || t === void 0) &&
        t.length &&
        this.removedTransforms.forEach(([f, h]) => {
          n.getValue(f).set(h);
        }),
      this.resolveNoneKeyframes());
  }
}
const M0 = (e, t) =>
  t === "zIndex"
    ? !1
    : !!(
        typeof e == "number" ||
        Array.isArray(e) ||
        (typeof e == "string" &&
          (Xr.test(e) || e === "0") &&
          !e.startsWith("url("))
      );
function Vj(e) {
  const t = e[0];
  if (e.length === 1) return !0;
  for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function Bj(e, t, n, s) {
  const i = e[0];
  if (i === null) return !1;
  if (t === "display" || t === "visibility") return !0;
  const l = e[e.length - 1],
    c = M0(i, t),
    u = M0(l, t);
  return !c || !u ? !1 : Vj(e) || ((n === "spring" || Op(n)) && s);
}
const Uj = (e) => e !== null;
function su(e, { repeat: t, repeatType: n = "loop" }, s) {
  const i = e.filter(Uj),
    l = t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
  return !l || s === void 0 ? i[l] : s;
}
const zj = 40;
class Qb {
  constructor({
    autoplay: t = !0,
    delay: n = 0,
    type: s = "keyframes",
    repeat: i = 0,
    repeatDelay: l = 0,
    repeatType: c = "loop",
    ...u
  }) {
    ((this.isStopped = !1),
      (this.hasAttemptedResolve = !1),
      (this.createdAt = zn.now()),
      (this.options = {
        autoplay: t,
        delay: n,
        type: s,
        repeat: i,
        repeatDelay: l,
        repeatType: c,
        ...u,
      }),
      this.updateFinishedPromise());
  }
  calcStartTime() {
    return this.resolvedAt
      ? this.resolvedAt - this.createdAt > zj
        ? this.resolvedAt
        : this.createdAt
      : this.createdAt;
  }
  get resolved() {
    return (
      !this._resolved && !this.hasAttemptedResolve && Mj(),
      this._resolved
    );
  }
  onKeyframesResolved(t, n) {
    ((this.resolvedAt = zn.now()), (this.hasAttemptedResolve = !0));
    const {
      name: s,
      type: i,
      velocity: l,
      delay: c,
      onComplete: u,
      onUpdate: f,
      isGenerator: h,
    } = this.options;
    if (!h && !Bj(t, s, i, l))
      if (c) this.options.duration = 0;
      else {
        (f && f(su(t, this.options, n)),
          u && u(),
          this.resolveFinishedPromise());
        return;
      }
    const m = this.initPlayback(t, n);
    m !== !1 &&
      ((this._resolved = { keyframes: t, finalKeyframe: n, ...m }),
      this.onPostResolved());
  }
  onPostResolved() {}
  then(t, n) {
    return this.currentFinishedPromise.then(t, n);
  }
  flatten() {
    ((this.options.type = "keyframes"), (this.options.ease = "linear"));
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((t) => {
      this.resolveFinishedPromise = t;
    });
  }
}
const Qe = (e, t, n) => e + (t - e) * n;
function Rf(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * 6 * n
      : n < 1 / 2
        ? t
        : n < 2 / 3
          ? e + (t - e) * (2 / 3 - n) * 6
          : e
  );
}
function $j({ hue: e, saturation: t, lightness: n, alpha: s }) {
  ((e /= 360), (t /= 100), (n /= 100));
  let i = 0,
    l = 0,
    c = 0;
  if (!t) i = l = c = n;
  else {
    const u = n < 0.5 ? n * (1 + t) : n + t - n * t,
      f = 2 * n - u;
    ((i = Rf(f, u, e + 1 / 3)), (l = Rf(f, u, e)), (c = Rf(f, u, e - 1 / 3)));
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(l * 255),
    blue: Math.round(c * 255),
    alpha: s,
  };
}
function jc(e, t) {
  return (n) => (n > 0 ? t : e);
}
const Af = (e, t, n) => {
    const s = e * e,
      i = n * (t * t - s) + s;
    return i < 0 ? 0 : Math.sqrt(i);
  },
  Wj = [kh, Es, So],
  Hj = (e) => Wj.find((t) => t.test(e));
function D0(e) {
  const t = Hj(e);
  if (!t) return !1;
  let n = t.parse(e);
  return (t === So && (n = $j(n)), n);
}
const I0 = (e, t) => {
    const n = D0(e),
      s = D0(t);
    if (!n || !s) return jc(e, t);
    const i = { ...n };
    return (l) => (
      (i.red = Af(n.red, s.red, l)),
      (i.green = Af(n.green, s.green, l)),
      (i.blue = Af(n.blue, s.blue, l)),
      (i.alpha = Qe(n.alpha, s.alpha, l)),
      Es.transform(i)
    );
  },
  qj = (e, t) => (n) => t(e(n)),
  Ra = (...e) => e.reduce(qj),
  Ah = new Set(["none", "hidden"]);
function Kj(e, t) {
  return Ah.has(e) ? (n) => (n <= 0 ? e : t) : (n) => (n >= 1 ? t : e);
}
function Qj(e, t) {
  return (n) => Qe(e, t, n);
}
function Wp(e) {
  return typeof e == "number"
    ? Qj
    : typeof e == "string"
      ? Cp(e)
        ? jc
        : At.test(e)
          ? I0
          : Xj
      : Array.isArray(e)
        ? Gb
        : typeof e == "object"
          ? At.test(e)
            ? I0
            : Gj
          : jc;
}
function Gb(e, t) {
  const n = [...e],
    s = n.length,
    i = e.map((l, c) => Wp(l)(l, t[c]));
  return (l) => {
    for (let c = 0; c < s; c++) n[c] = i[c](l);
    return n;
  };
}
function Gj(e, t) {
  const n = { ...e, ...t },
    s = {};
  for (const i in n)
    e[i] !== void 0 && t[i] !== void 0 && (s[i] = Wp(e[i])(e[i], t[i]));
  return (i) => {
    for (const l in s) n[l] = s[l](i);
    return n;
  };
}
function Yj(e, t) {
  var n;
  const s = [],
    i = { color: 0, var: 0, number: 0 };
  for (let l = 0; l < t.values.length; l++) {
    const c = t.types[l],
      u = e.indexes[c][i[c]],
      f = (n = e.values[u]) !== null && n !== void 0 ? n : 0;
    ((s[l] = f), i[c]++);
  }
  return s;
}
const Xj = (e, t) => {
  const n = Xr.createTransformer(t),
    s = ca(e),
    i = ca(t);
  return s.indexes.var.length === i.indexes.var.length &&
    s.indexes.color.length === i.indexes.color.length &&
    s.indexes.number.length >= i.indexes.number.length
    ? (Ah.has(e) && !i.values.length) || (Ah.has(t) && !s.values.length)
      ? Kj(e, t)
      : Ra(Gb(Yj(s, i), i.values), n)
    : jc(e, t);
};
function Yb(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number"
    ? Qe(e, t, n)
    : Wp(e)(e, t);
}
const Jj = 5;
function Xb(e, t, n) {
  const s = Math.max(t - Jj, 0);
  return Cb(n - e(s), t - s);
}
const Je = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  _f = 0.001;
function Zj({
  duration: e = Je.duration,
  bounce: t = Je.bounce,
  velocity: n = Je.velocity,
  mass: s = Je.mass,
}) {
  let i,
    l,
    c = 1 - t;
  ((c = cr(Je.minDamping, Je.maxDamping, c)),
    (e = cr(Je.minDuration, Je.maxDuration, lr(e))),
    c < 1
      ? ((i = (h) => {
          const m = h * c,
            y = m * e,
            w = m - n,
            C = _h(h, c),
            E = Math.exp(-y);
          return _f - (w / C) * E;
        }),
        (l = (h) => {
          const y = h * c * e,
            w = y * n + n,
            C = Math.pow(c, 2) * Math.pow(h, 2) * e,
            E = Math.exp(-y),
            v = _h(Math.pow(h, 2), c);
          return ((-i(h) + _f > 0 ? -1 : 1) * ((w - C) * E)) / v;
        }))
      : ((i = (h) => {
          const m = Math.exp(-h * e),
            y = (h - n) * e + 1;
          return -_f + m * y;
        }),
        (l = (h) => {
          const m = Math.exp(-h * e),
            y = (n - h) * (e * e);
          return m * y;
        })));
  const u = 5 / e,
    f = tL(i, l, u);
  if (((e = ar(e)), isNaN(f)))
    return { stiffness: Je.stiffness, damping: Je.damping, duration: e };
  {
    const h = Math.pow(f, 2) * s;
    return { stiffness: h, damping: c * 2 * Math.sqrt(s * h), duration: e };
  }
}
const eL = 12;
function tL(e, t, n) {
  let s = n;
  for (let i = 1; i < eL; i++) s = s - e(s) / t(s);
  return s;
}
function _h(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const nL = ["duration", "bounce"],
  rL = ["stiffness", "damping", "mass"];
function F0(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function sL(e) {
  let t = {
    velocity: Je.velocity,
    stiffness: Je.stiffness,
    damping: Je.damping,
    mass: Je.mass,
    isResolvedFromDuration: !1,
    ...e,
  };
  if (!F0(e, rL) && F0(e, nL))
    if (e.visualDuration) {
      const n = e.visualDuration,
        s = (2 * Math.PI) / (n * 1.2),
        i = s * s,
        l = 2 * cr(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
      t = { ...t, mass: Je.mass, stiffness: i, damping: l };
    } else {
      const n = Zj(e);
      ((t = { ...t, ...n, mass: Je.mass }), (t.isResolvedFromDuration = !0));
    }
  return t;
}
function Jb(e = Je.visualDuration, t = Je.bounce) {
  const n =
    typeof e != "object"
      ? { visualDuration: e, keyframes: [0, 1], bounce: t }
      : e;
  let { restSpeed: s, restDelta: i } = n;
  const l = n.keyframes[0],
    c = n.keyframes[n.keyframes.length - 1],
    u = { done: !1, value: l },
    {
      stiffness: f,
      damping: h,
      mass: m,
      duration: y,
      velocity: w,
      isResolvedFromDuration: C,
    } = sL({ ...n, velocity: -lr(n.velocity || 0) }),
    E = w || 0,
    v = h / (2 * Math.sqrt(f * m)),
    x = c - l,
    T = lr(Math.sqrt(f / m)),
    P = Math.abs(x) < 5;
  (s || (s = P ? Je.restSpeed.granular : Je.restSpeed.default),
    i || (i = P ? Je.restDelta.granular : Je.restDelta.default));
  let R;
  if (v < 1) {
    const M = _h(T, v);
    R = (V) => {
      const U = Math.exp(-v * T * V);
      return (
        c - U * (((E + v * T * x) / M) * Math.sin(M * V) + x * Math.cos(M * V))
      );
    };
  } else if (v === 1) R = (M) => c - Math.exp(-T * M) * (x + (E + T * x) * M);
  else {
    const M = T * Math.sqrt(v * v - 1);
    R = (V) => {
      const U = Math.exp(-v * T * V),
        D = Math.min(M * V, 300);
      return (
        c - (U * ((E + v * T * x) * Math.sinh(D) + M * x * Math.cosh(D))) / M
      );
    };
  }
  const _ = {
    calculatedDuration: (C && y) || null,
    next: (M) => {
      const V = R(M);
      if (C) u.done = M >= y;
      else {
        let U = 0;
        v < 1 && (U = M === 0 ? ar(E) : Xb(R, M, V));
        const D = Math.abs(U) <= s,
          Q = Math.abs(c - V) <= i;
        u.done = D && Q;
      }
      return ((u.value = u.done ? c : V), u);
    },
    toString: () => {
      const M = Math.min(gb(_), bh),
        V = yb((U) => _.next(M * U).value, M, 30);
      return M + "ms " + V;
    },
  };
  return _;
}
function V0({
  keyframes: e,
  velocity: t = 0,
  power: n = 0.8,
  timeConstant: s = 325,
  bounceDamping: i = 10,
  bounceStiffness: l = 500,
  modifyTarget: c,
  min: u,
  max: f,
  restDelta: h = 0.5,
  restSpeed: m,
}) {
  const y = e[0],
    w = { done: !1, value: y },
    C = (D) => (u !== void 0 && D < u) || (f !== void 0 && D > f),
    E = (D) =>
      u === void 0
        ? f
        : f === void 0 || Math.abs(u - D) < Math.abs(f - D)
          ? u
          : f;
  let v = n * t;
  const x = y + v,
    T = c === void 0 ? x : c(x);
  T !== x && (v = T - y);
  const P = (D) => -v * Math.exp(-D / s),
    R = (D) => T + P(D),
    _ = (D) => {
      const Q = P(D),
        J = R(D);
      ((w.done = Math.abs(Q) <= h), (w.value = w.done ? T : J));
    };
  let M, V;
  const U = (D) => {
    C(w.value) &&
      ((M = D),
      (V = Jb({
        keyframes: [w.value, E(w.value)],
        velocity: Xb(R, D, w.value),
        damping: i,
        stiffness: l,
        restDelta: h,
        restSpeed: m,
      })));
  };
  return (
    U(0),
    {
      calculatedDuration: null,
      next: (D) => {
        let Q = !1;
        return (
          !V && M === void 0 && ((Q = !0), _(D), U(D)),
          M !== void 0 && D >= M ? V.next(D - M) : (!Q && _(D), w)
        );
      },
    }
  );
}
const oL = Pa(0.42, 0, 1, 1),
  iL = Pa(0, 0, 0.58, 1),
  Zb = Pa(0.42, 0, 0.58, 1),
  aL = (e) => Array.isArray(e) && typeof e[0] != "number",
  lL = {
    linear: Xt,
    easeIn: oL,
    easeInOut: Zb,
    easeOut: iL,
    circIn: Vp,
    circInOut: jb,
    circOut: Ob,
    backIn: Fp,
    backInOut: _b,
    backOut: Ab,
    anticipate: Nb,
  },
  B0 = (e) => {
    if (jp(e)) {
      YS(e.length === 4);
      const [t, n, s, i] = e;
      return Pa(t, n, s, i);
    } else if (typeof e == "string") return lL[e];
    return e;
  };
function cL(e, t, n) {
  const s = [],
    i = n || Yb,
    l = e.length - 1;
  for (let c = 0; c < l; c++) {
    let u = i(e[c], e[c + 1]);
    if (t) {
      const f = Array.isArray(t) ? t[c] || Xt : t;
      u = Ra(f, u);
    }
    s.push(u);
  }
  return s;
}
function uL(e, t, { clamp: n = !0, ease: s, mixer: i } = {}) {
  const l = e.length;
  if ((YS(l === t.length), l === 1)) return () => t[0];
  if (l === 2 && t[0] === t[1]) return () => t[1];
  const c = e[0] === e[1];
  e[0] > e[l - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
  const u = cL(t, s, i),
    f = u.length,
    h = (m) => {
      if (c && m < e[0]) return t[0];
      let y = 0;
      if (f > 1) for (; y < e.length - 2 && !(m < e[y + 1]); y++);
      const w = zo(e[y], e[y + 1], m);
      return u[y](w);
    };
  return n ? (m) => h(cr(e[0], e[l - 1], m)) : h;
}
function dL(e, t) {
  const n = e[e.length - 1];
  for (let s = 1; s <= t; s++) {
    const i = zo(0, t, s);
    e.push(Qe(n, 1, i));
  }
}
function fL(e) {
  const t = [0];
  return (dL(t, e.length - 1), t);
}
function hL(e, t) {
  return e.map((n) => n * t);
}
function pL(e, t) {
  return e.map(() => t || Zb).splice(0, e.length - 1);
}
function Lc({
  duration: e = 300,
  keyframes: t,
  times: n,
  ease: s = "easeInOut",
}) {
  const i = aL(s) ? s.map(B0) : B0(s),
    l = { done: !1, value: t[0] },
    c = hL(n && n.length === t.length ? n : fL(t), e),
    u = uL(c, t, { ease: Array.isArray(i) ? i : pL(t, i) });
  return {
    calculatedDuration: e,
    next: (f) => ((l.value = u(f)), (l.done = f >= e), l),
  };
}
const mL = (e) => {
    const t = ({ timestamp: n }) => e(n);
    return {
      start: () => We.update(t, !0),
      stop: () => Yr(t),
      now: () => (St.isProcessing ? St.timestamp : zn.now()),
    };
  },
  gL = { decay: V0, inertia: V0, tween: Lc, keyframes: Lc, spring: Jb },
  yL = (e) => e / 100;
class Hp extends Qb {
  constructor(t) {
    (super(t),
      (this.holdTime = null),
      (this.cancelTime = null),
      (this.currentTime = 0),
      (this.playbackSpeed = 1),
      (this.pendingPlayState = "running"),
      (this.startTime = null),
      (this.state = "idle"),
      (this.stop = () => {
        if (
          (this.resolver.cancel(), (this.isStopped = !0), this.state === "idle")
        )
          return;
        this.teardown();
        const { onStop: f } = this.options;
        f && f();
      }));
    const { name: n, motionValue: s, element: i, keyframes: l } = this.options,
      c = (i == null ? void 0 : i.KeyframeResolver) || $p,
      u = (f, h) => this.onKeyframesResolved(f, h);
    ((this.resolver = new c(l, u, n, s, i)), this.resolver.scheduleResolve());
  }
  flatten() {
    (super.flatten(),
      this._resolved &&
        Object.assign(
          this._resolved,
          this.initPlayback(this._resolved.keyframes),
        ));
  }
  initPlayback(t) {
    const {
        type: n = "keyframes",
        repeat: s = 0,
        repeatDelay: i = 0,
        repeatType: l,
        velocity: c = 0,
      } = this.options,
      u = Op(n) ? n : gL[n] || Lc;
    let f, h;
    u !== Lc &&
      typeof t[0] != "number" &&
      ((f = Ra(yL, Yb(t[0], t[1]))), (t = [0, 100]));
    const m = u({ ...this.options, keyframes: t });
    (l === "mirror" &&
      (h = u({ ...this.options, keyframes: [...t].reverse(), velocity: -c })),
      m.calculatedDuration === null && (m.calculatedDuration = gb(m)));
    const { calculatedDuration: y } = m,
      w = y + i,
      C = w * (s + 1) - i;
    return {
      generator: m,
      mirroredGenerator: h,
      mapPercentToKeyframes: f,
      calculatedDuration: y,
      resolvedDuration: w,
      totalDuration: C,
    };
  }
  onPostResolved() {
    const { autoplay: t = !0 } = this.options;
    (this.play(),
      this.pendingPlayState === "paused" || !t
        ? this.pause()
        : (this.state = this.pendingPlayState));
  }
  tick(t, n = !1) {
    const { resolved: s } = this;
    if (!s) {
      const { keyframes: D } = this.options;
      return { done: !0, value: D[D.length - 1] };
    }
    const {
      finalKeyframe: i,
      generator: l,
      mirroredGenerator: c,
      mapPercentToKeyframes: u,
      keyframes: f,
      calculatedDuration: h,
      totalDuration: m,
      resolvedDuration: y,
    } = s;
    if (this.startTime === null) return l.next(0);
    const {
      delay: w,
      repeat: C,
      repeatType: E,
      repeatDelay: v,
      onUpdate: x,
    } = this.options;
    (this.speed > 0
      ? (this.startTime = Math.min(this.startTime, t))
      : this.speed < 0 &&
        (this.startTime = Math.min(t - m / this.speed, this.startTime)),
      n
        ? (this.currentTime = t)
        : this.holdTime !== null
          ? (this.currentTime = this.holdTime)
          : (this.currentTime = Math.round(t - this.startTime) * this.speed));
    const T = this.currentTime - w * (this.speed >= 0 ? 1 : -1),
      P = this.speed >= 0 ? T < 0 : T > m;
    ((this.currentTime = Math.max(T, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = m));
    let R = this.currentTime,
      _ = l;
    if (C) {
      const D = Math.min(this.currentTime, m) / y;
      let Q = Math.floor(D),
        J = D % 1;
      (!J && D >= 1 && (J = 1),
        J === 1 && Q--,
        (Q = Math.min(Q, C + 1)),
        !!(Q % 2) &&
          (E === "reverse"
            ? ((J = 1 - J), v && (J -= v / y))
            : E === "mirror" && (_ = c)),
        (R = cr(0, 1, J) * y));
    }
    const M = P ? { done: !1, value: f[0] } : _.next(R);
    u && (M.value = u(M.value));
    let { done: V } = M;
    !P &&
      h !== null &&
      (V = this.speed >= 0 ? this.currentTime >= m : this.currentTime <= 0);
    const U =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && V));
    return (
      U && i !== void 0 && (M.value = su(f, this.options, i)),
      x && x(M.value),
      U && this.finish(),
      M
    );
  }
  get duration() {
    const { resolved: t } = this;
    return t ? lr(t.calculatedDuration) : 0;
  }
  get time() {
    return lr(this.currentTime);
  }
  set time(t) {
    ((t = ar(t)),
      (this.currentTime = t),
      this.holdTime !== null || this.speed === 0
        ? (this.holdTime = t)
        : this.driver && (this.startTime = this.driver.now() - t / this.speed));
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    const n = this.playbackSpeed !== t;
    ((this.playbackSpeed = t), n && (this.time = lr(this.currentTime)));
  }
  play() {
    if (
      (this.resolver.isScheduled || this.resolver.resume(), !this._resolved)
    ) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped) return;
    const { driver: t = mL, onPlay: n, startTime: s } = this.options;
    (this.driver || (this.driver = t((l) => this.tick(l))), n && n());
    const i = this.driver.now();
    (this.holdTime !== null
      ? (this.startTime = i - this.holdTime)
      : this.startTime
        ? this.state === "finished" && (this.startTime = i)
        : (this.startTime = s ?? this.calcStartTime()),
      this.state === "finished" && this.updateFinishedPromise(),
      (this.cancelTime = this.startTime),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start());
  }
  pause() {
    var t;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    ((this.state = "paused"),
      (this.holdTime =
        (t = this.currentTime) !== null && t !== void 0 ? t : 0));
  }
  complete() {
    (this.state !== "running" && this.play(),
      (this.pendingPlayState = this.state = "finished"),
      (this.holdTime = null));
  }
  finish() {
    (this.teardown(), (this.state = "finished"));
    const { onComplete: t } = this.options;
    t && t();
  }
  cancel() {
    (this.cancelTime !== null && this.tick(this.cancelTime),
      this.teardown(),
      this.updateFinishedPromise());
  }
  teardown() {
    ((this.state = "idle"),
      this.stopDriver(),
      this.resolveFinishedPromise(),
      this.updateFinishedPromise(),
      (this.startTime = this.cancelTime = null),
      this.resolver.cancel());
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(t) {
    return ((this.startTime = 0), this.tick(t, !0));
  }
}
const vL = new Set(["opacity", "clipPath", "filter", "transform"]);
function wL(
  e,
  t,
  n,
  {
    delay: s = 0,
    duration: i = 300,
    repeat: l = 0,
    repeatType: c = "loop",
    ease: u = "easeInOut",
    times: f,
  } = {},
) {
  const h = { [t]: n };
  f && (h.offset = f);
  const m = wb(u, i);
  return (
    Array.isArray(m) && (h.easing = m),
    e.animate(h, {
      delay: s,
      duration: i,
      easing: Array.isArray(m) ? "linear" : m,
      fill: "both",
      iterations: l + 1,
      direction: c === "reverse" ? "alternate" : "normal",
    })
  );
}
const xL = yp(() => Object.hasOwnProperty.call(Element.prototype, "animate")),
  Mc = 10,
  SL = 2e4;
function bL(e) {
  return Op(e.type) || e.type === "spring" || !vb(e.ease);
}
function EL(e, t) {
  const n = new Hp({
    ...t,
    keyframes: e,
    repeat: 0,
    delay: 0,
    isGenerator: !0,
  });
  let s = { done: !1, value: e[0] };
  const i = [];
  let l = 0;
  for (; !s.done && l < SL; ) ((s = n.sample(l)), i.push(s.value), (l += Mc));
  return { times: void 0, keyframes: i, duration: l - Mc, ease: "linear" };
}
const e1 = { anticipate: Nb, backInOut: _b, circInOut: jb };
function CL(e) {
  return e in e1;
}
class U0 extends Qb {
  constructor(t) {
    super(t);
    const { name: n, motionValue: s, element: i, keyframes: l } = this.options;
    ((this.resolver = new Kb(
      l,
      (c, u) => this.onKeyframesResolved(c, u),
      n,
      s,
      i,
    )),
      this.resolver.scheduleResolve());
  }
  initPlayback(t, n) {
    let {
      duration: s = 300,
      times: i,
      ease: l,
      type: c,
      motionValue: u,
      name: f,
      startTime: h,
    } = this.options;
    if (!u.owner || !u.owner.current) return !1;
    if (
      (typeof l == "string" && Oc() && CL(l) && (l = e1[l]), bL(this.options))
    ) {
      const {
          onComplete: y,
          onUpdate: w,
          motionValue: C,
          element: E,
          ...v
        } = this.options,
        x = EL(t, v);
      ((t = x.keyframes),
        t.length === 1 && (t[1] = t[0]),
        (s = x.duration),
        (i = x.times),
        (l = x.ease),
        (c = "keyframes"));
    }
    const m = wL(u.owner.current, f, t, {
      ...this.options,
      duration: s,
      times: i,
      ease: l,
    });
    return (
      (m.startTime = h ?? this.calcStartTime()),
      this.pendingTimeline
        ? (k0(m, this.pendingTimeline), (this.pendingTimeline = void 0))
        : (m.onfinish = () => {
            const { onComplete: y } = this.options;
            (u.set(su(t, this.options, n)),
              y && y(),
              this.cancel(),
              this.resolveFinishedPromise());
          }),
      { animation: m, duration: s, times: i, type: c, ease: l, keyframes: t }
    );
  }
  get duration() {
    const { resolved: t } = this;
    if (!t) return 0;
    const { duration: n } = t;
    return lr(n);
  }
  get time() {
    const { resolved: t } = this;
    if (!t) return 0;
    const { animation: n } = t;
    return lr(n.currentTime || 0);
  }
  set time(t) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: s } = n;
    s.currentTime = ar(t);
  }
  get speed() {
    const { resolved: t } = this;
    if (!t) return 1;
    const { animation: n } = t;
    return n.playbackRate;
  }
  set speed(t) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: s } = n;
    s.playbackRate = t;
  }
  get state() {
    const { resolved: t } = this;
    if (!t) return "idle";
    const { animation: n } = t;
    return n.playState;
  }
  get startTime() {
    const { resolved: t } = this;
    if (!t) return null;
    const { animation: n } = t;
    return n.startTime;
  }
  attachTimeline(t) {
    if (!this._resolved) this.pendingTimeline = t;
    else {
      const { resolved: n } = this;
      if (!n) return Xt;
      const { animation: s } = n;
      k0(s, t);
    }
    return Xt;
  }
  play() {
    if (this.isStopped) return;
    const { resolved: t } = this;
    if (!t) return;
    const { animation: n } = t;
    (n.playState === "finished" && this.updateFinishedPromise(), n.play());
  }
  pause() {
    const { resolved: t } = this;
    if (!t) return;
    const { animation: n } = t;
    n.pause();
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === "idle"))
      return;
    (this.resolveFinishedPromise(), this.updateFinishedPromise());
    const { resolved: t } = this;
    if (!t) return;
    const {
      animation: n,
      keyframes: s,
      duration: i,
      type: l,
      ease: c,
      times: u,
    } = t;
    if (n.playState === "idle" || n.playState === "finished") return;
    if (this.time) {
      const {
          motionValue: h,
          onUpdate: m,
          onComplete: y,
          element: w,
          ...C
        } = this.options,
        E = new Hp({
          ...C,
          keyframes: s,
          duration: i,
          type: l,
          ease: c,
          times: u,
          isGenerator: !0,
        }),
        v = ar(this.time);
      h.setWithVelocity(E.sample(v - Mc).value, E.sample(v).value, Mc);
    }
    const { onStop: f } = this.options;
    (f && f(), this.cancel());
  }
  complete() {
    const { resolved: t } = this;
    t && t.animation.finish();
  }
  cancel() {
    const { resolved: t } = this;
    t && t.animation.cancel();
  }
  static supports(t) {
    const {
      motionValue: n,
      name: s,
      repeatDelay: i,
      repeatType: l,
      damping: c,
      type: u,
    } = t;
    if (!n || !n.owner || !(n.owner.current instanceof HTMLElement)) return !1;
    const { onUpdate: f, transformTemplate: h } = n.owner.getProps();
    return (
      xL() &&
      s &&
      vL.has(s) &&
      !f &&
      !h &&
      !i &&
      l !== "mirror" &&
      c !== 0 &&
      u !== "inertia"
    );
  }
}
const kL = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  TL = (e) => ({
    type: "spring",
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  PL = { type: "keyframes", duration: 0.8 },
  RL = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  AL = (e, { keyframes: t }) =>
    t.length > 2
      ? PL
      : zs.has(e)
        ? e.startsWith("scale")
          ? TL(t[1])
          : kL
        : RL;
function _L({
  when: e,
  delay: t,
  delayChildren: n,
  staggerChildren: s,
  staggerDirection: i,
  repeat: l,
  repeatType: c,
  repeatDelay: u,
  from: f,
  elapsed: h,
  ...m
}) {
  return !!Object.keys(m).length;
}
const qp =
  (e, t, n, s = {}, i, l) =>
  (c) => {
    const u = Np(s, e) || {},
      f = u.delay || s.delay || 0;
    let { elapsed: h = 0 } = s;
    h = h - ar(f);
    let m = {
      keyframes: Array.isArray(n) ? n : [null, n],
      ease: "easeOut",
      velocity: t.getVelocity(),
      ...u,
      delay: -h,
      onUpdate: (w) => {
        (t.set(w), u.onUpdate && u.onUpdate(w));
      },
      onComplete: () => {
        (c(), u.onComplete && u.onComplete());
      },
      name: e,
      motionValue: t,
      element: l ? void 0 : i,
    };
    (_L(u) || (m = { ...m, ...AL(e, m) }),
      m.duration && (m.duration = ar(m.duration)),
      m.repeatDelay && (m.repeatDelay = ar(m.repeatDelay)),
      m.from !== void 0 && (m.keyframes[0] = m.from));
    let y = !1;
    if (
      ((m.type === !1 || (m.duration === 0 && !m.repeatDelay)) &&
        ((m.duration = 0), m.delay === 0 && (y = !0)),
      y && !l && t.get() !== void 0)
    ) {
      const w = su(m.keyframes, u);
      if (w !== void 0)
        return (
          We.update(() => {
            (m.onUpdate(w), m.onComplete());
          }),
          new G2([])
        );
    }
    return !l && U0.supports(m) ? new U0(m) : new Hp(m);
  };
function NL({ protectedKeys: e, needsAnimating: t }, n) {
  const s = e.hasOwnProperty(n) && t[n] !== !0;
  return ((t[n] = !1), s);
}
function t1(e, t, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  var l;
  let { transition: c = e.getDefaultTransition(), transitionEnd: u, ...f } = t;
  s && (c = s);
  const h = [],
    m = i && e.animationState && e.animationState.getState()[i];
  for (const y in f) {
    const w = e.getValue(
        y,
        (l = e.latestValues[y]) !== null && l !== void 0 ? l : null,
      ),
      C = f[y];
    if (C === void 0 || (m && NL(m, y))) continue;
    const E = { delay: n, ...Np(c || {}, y) };
    let v = !1;
    if (window.MotionHandoffAnimation) {
      const T = kb(e);
      if (T) {
        const P = window.MotionHandoffAnimation(T, y, We);
        P !== null && ((E.startTime = P), (v = !0));
      }
    }
    (Ch(e, y),
      w.start(
        qp(y, w, C, e.shouldReduceMotion && Eb.has(y) ? { type: !1 } : E, e, v),
      ));
    const x = w.animation;
    x && h.push(x);
  }
  return (
    u &&
      Promise.all(h).then(() => {
        We.update(() => {
          u && cj(e, u);
        });
      }),
    h
  );
}
function Nh(e, t, n = {}) {
  var s;
  const i = ru(
    e,
    t,
    n.type === "exit"
      ? (s = e.presenceContext) === null || s === void 0
        ? void 0
        : s.custom
      : void 0,
  );
  let { transition: l = e.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (l = n.transitionOverride);
  const c = i ? () => Promise.all(t1(e, i, n)) : () => Promise.resolve(),
    u =
      e.variantChildren && e.variantChildren.size
        ? (h = 0) => {
            const {
              delayChildren: m = 0,
              staggerChildren: y,
              staggerDirection: w,
            } = l;
            return OL(e, t, m + h, y, w, n);
          }
        : () => Promise.resolve(),
    { when: f } = l;
  if (f) {
    const [h, m] = f === "beforeChildren" ? [c, u] : [u, c];
    return h().then(() => m());
  } else return Promise.all([c(), u(n.delay)]);
}
function OL(e, t, n = 0, s = 0, i = 1, l) {
  const c = [],
    u = (e.variantChildren.size - 1) * s,
    f = i === 1 ? (h = 0) => h * s : (h = 0) => u - h * s;
  return (
    Array.from(e.variantChildren)
      .sort(jL)
      .forEach((h, m) => {
        (h.notify("AnimationStart", t),
          c.push(
            Nh(h, t, { ...l, delay: n + f(m) }).then(() =>
              h.notify("AnimationComplete", t),
            ),
          ));
      }),
    Promise.all(c)
  );
}
function jL(e, t) {
  return e.sortNodePosition(t);
}
function LL(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let s;
  if (Array.isArray(t)) {
    const i = t.map((l) => Nh(e, l, n));
    s = Promise.all(i);
  } else if (typeof t == "string") s = Nh(e, t, n);
  else {
    const i = typeof t == "function" ? ru(e, t, n.custom) : t;
    s = Promise.all(t1(e, i, n));
  }
  return s.then(() => {
    e.notify("AnimationComplete", t);
  });
}
const ML = wp.length;
function n1(e) {
  if (!e) return;
  if (!e.isControllingVariants) {
    const n = e.parent ? n1(e.parent) || {} : {};
    return (e.props.initial !== void 0 && (n.initial = e.props.initial), n);
  }
  const t = {};
  for (let n = 0; n < ML; n++) {
    const s = wp[n],
      i = e.props[s];
    (ia(i) || i === !1) && (t[s] = i);
  }
  return t;
}
const DL = [...vp].reverse(),
  IL = vp.length;
function FL(e) {
  return (t) =>
    Promise.all(t.map(({ animation: n, options: s }) => LL(e, n, s)));
}
function VL(e) {
  let t = FL(e),
    n = z0(),
    s = !0;
  const i = (f) => (h, m) => {
    var y;
    const w = ru(
      e,
      m,
      f === "exit"
        ? (y = e.presenceContext) === null || y === void 0
          ? void 0
          : y.custom
        : void 0,
    );
    if (w) {
      const { transition: C, transitionEnd: E, ...v } = w;
      h = { ...h, ...v, ...E };
    }
    return h;
  };
  function l(f) {
    t = f(e);
  }
  function c(f) {
    const { props: h } = e,
      m = n1(e.parent) || {},
      y = [],
      w = new Set();
    let C = {},
      E = 1 / 0;
    for (let x = 0; x < IL; x++) {
      const T = DL[x],
        P = n[T],
        R = h[T] !== void 0 ? h[T] : m[T],
        _ = ia(R),
        M = T === f ? P.isActive : null;
      M === !1 && (E = x);
      let V = R === m[T] && R !== h[T] && _;
      if (
        (V && s && e.manuallyAnimateOnMount && (V = !1),
        (P.protectedKeys = { ...C }),
        (!P.isActive && M === null) ||
          (!R && !P.prevProp) ||
          tu(R) ||
          typeof R == "boolean")
      )
        continue;
      const U = BL(P.prevProp, R);
      let D = U || (T === f && P.isActive && !V && _) || (x > E && _),
        Q = !1;
      const J = Array.isArray(R) ? R : [R];
      let ee = J.reduce(i(T), {});
      M === !1 && (ee = {});
      const { prevResolvedValues: de = {} } = P,
        ge = { ...de, ...ee },
        le = (Z) => {
          ((D = !0),
            w.has(Z) && ((Q = !0), w.delete(Z)),
            (P.needsAnimating[Z] = !0));
          const $ = e.getValue(Z);
          $ && ($.liveStyle = !1);
        };
      for (const Z in ge) {
        const $ = ee[Z],
          X = de[Z];
        if (C.hasOwnProperty(Z)) continue;
        let W = !1;
        (Sh($) && Sh(X) ? (W = !mb($, X)) : (W = $ !== X),
          W
            ? $ != null
              ? le(Z)
              : w.add(Z)
            : $ !== void 0 && w.has(Z)
              ? le(Z)
              : (P.protectedKeys[Z] = !0));
      }
      ((P.prevProp = R),
        (P.prevResolvedValues = ee),
        P.isActive && (C = { ...C, ...ee }),
        s && e.blockInitialAnimation && (D = !1),
        D &&
          (!(V && U) || Q) &&
          y.push(...J.map((Z) => ({ animation: Z, options: { type: T } }))));
    }
    if (w.size) {
      const x = {};
      (w.forEach((T) => {
        const P = e.getBaseTarget(T),
          R = e.getValue(T);
        (R && (R.liveStyle = !0), (x[T] = P ?? null));
      }),
        y.push({ animation: x }));
    }
    let v = !!y.length;
    return (
      s &&
        (h.initial === !1 || h.initial === h.animate) &&
        !e.manuallyAnimateOnMount &&
        (v = !1),
      (s = !1),
      v ? t(y) : Promise.resolve()
    );
  }
  function u(f, h) {
    var m;
    if (n[f].isActive === h) return Promise.resolve();
    ((m = e.variantChildren) === null ||
      m === void 0 ||
      m.forEach((w) => {
        var C;
        return (C = w.animationState) === null || C === void 0
          ? void 0
          : C.setActive(f, h);
      }),
      (n[f].isActive = h));
    const y = c(f);
    for (const w in n) n[w].protectedKeys = {};
    return y;
  }
  return {
    animateChanges: c,
    setActive: u,
    setAnimateFunction: l,
    getState: () => n,
    reset: () => {
      ((n = z0()), (s = !0));
    },
  };
}
function BL(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !mb(t, e) : !1;
}
function vs(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function z0() {
  return {
    animate: vs(!0),
    whileInView: vs(),
    whileHover: vs(),
    whileTap: vs(),
    whileDrag: vs(),
    whileFocus: vs(),
    exit: vs(),
  };
}
class ts {
  constructor(t) {
    ((this.isMounted = !1), (this.node = t));
  }
  update() {}
}
class UL extends ts {
  constructor(t) {
    (super(t), t.animationState || (t.animationState = VL(t)));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    tu(t) && (this.unmountControls = t.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(),
      { animate: n } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var t;
    (this.node.animationState.reset(),
      (t = this.unmountControls) === null || t === void 0 || t.call(this));
  }
}
let zL = 0;
class $L extends ts {
  constructor() {
    (super(...arguments), (this.id = zL++));
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext,
      { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === s) return;
    const i = this.node.animationState.setActive("exit", !t);
    n && !t && i.then(() => n(this.id));
  }
  mount() {
    const { register: t } = this.node.presenceContext || {};
    t && (this.unmount = t(this.id));
  }
  unmount() {}
}
const WL = { animation: { Feature: UL }, exit: { Feature: $L } };
function ua(e, t, n, s = { passive: !0 }) {
  return (e.addEventListener(t, n, s), () => e.removeEventListener(t, n));
}
function Aa(e) {
  return { point: { x: e.pageX, y: e.pageY } };
}
const HL = (e) => (t) => Lp(t) && e(t, Aa(t));
function ta(e, t, n, s) {
  return ua(e, t, HL(n), s);
}
const $0 = (e, t) => Math.abs(e - t);
function qL(e, t) {
  const n = $0(e.x, t.x),
    s = $0(e.y, t.y);
  return Math.sqrt(n ** 2 + s ** 2);
}
class r1 {
  constructor(
    t,
    n,
    { transformPagePoint: s, contextWindow: i, dragSnapToOrigin: l = !1 } = {},
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const y = Of(this.lastMoveEventInfo, this.history),
          w = this.startEvent !== null,
          C = qL(y.offset, { x: 0, y: 0 }) >= 3;
        if (!w && !C) return;
        const { point: E } = y,
          { timestamp: v } = St;
        this.history.push({ ...E, timestamp: v });
        const { onStart: x, onMove: T } = this.handlers;
        (w ||
          (x && x(this.lastMoveEvent, y),
          (this.startEvent = this.lastMoveEvent)),
          T && T(this.lastMoveEvent, y));
      }),
      (this.handlePointerMove = (y, w) => {
        ((this.lastMoveEvent = y),
          (this.lastMoveEventInfo = Nf(w, this.transformPagePoint)),
          We.update(this.updatePoint, !0));
      }),
      (this.handlePointerUp = (y, w) => {
        this.end();
        const { onEnd: C, onSessionEnd: E, resumeAnimation: v } = this.handlers;
        if (
          (this.dragSnapToOrigin && v && v(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const x = Of(
          y.type === "pointercancel"
            ? this.lastMoveEventInfo
            : Nf(w, this.transformPagePoint),
          this.history,
        );
        (this.startEvent && C && C(y, x), E && E(y, x));
      }),
      !Lp(t))
    )
      return;
    ((this.dragSnapToOrigin = l),
      (this.handlers = n),
      (this.transformPagePoint = s),
      (this.contextWindow = i || window));
    const c = Aa(t),
      u = Nf(c, this.transformPagePoint),
      { point: f } = u,
      { timestamp: h } = St;
    this.history = [{ ...f, timestamp: h }];
    const { onSessionStart: m } = n;
    (m && m(t, Of(u, this.history)),
      (this.removeListeners = Ra(
        ta(this.contextWindow, "pointermove", this.handlePointerMove),
        ta(this.contextWindow, "pointerup", this.handlePointerUp),
        ta(this.contextWindow, "pointercancel", this.handlePointerUp),
      )));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    (this.removeListeners && this.removeListeners(), Yr(this.updatePoint));
  }
}
function Nf(e, t) {
  return t ? { point: t(e.point) } : e;
}
function W0(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Of({ point: e }, t) {
  return {
    point: e,
    delta: W0(e, s1(t)),
    offset: W0(e, KL(t)),
    velocity: QL(t, 0.1),
  };
}
function KL(e) {
  return e[0];
}
function s1(e) {
  return e[e.length - 1];
}
function QL(e, t) {
  if (e.length < 2) return { x: 0, y: 0 };
  let n = e.length - 1,
    s = null;
  const i = s1(e);
  for (; n >= 0 && ((s = e[n]), !(i.timestamp - s.timestamp > ar(t))); ) n--;
  if (!s) return { x: 0, y: 0 };
  const l = lr(i.timestamp - s.timestamp);
  if (l === 0) return { x: 0, y: 0 };
  const c = { x: (i.x - s.x) / l, y: (i.y - s.y) / l };
  return (c.x === 1 / 0 && (c.x = 0), c.y === 1 / 0 && (c.y = 0), c);
}
const o1 = 1e-4,
  GL = 1 - o1,
  YL = 1 + o1,
  i1 = 0.01,
  XL = 0 - i1,
  JL = 0 + i1;
function Zt(e) {
  return e.max - e.min;
}
function ZL(e, t, n) {
  return Math.abs(e - t) <= n;
}
function H0(e, t, n, s = 0.5) {
  ((e.origin = s),
    (e.originPoint = Qe(t.min, t.max, e.origin)),
    (e.scale = Zt(n) / Zt(t)),
    (e.translate = Qe(n.min, n.max, e.origin) - e.originPoint),
    ((e.scale >= GL && e.scale <= YL) || isNaN(e.scale)) && (e.scale = 1),
    ((e.translate >= XL && e.translate <= JL) || isNaN(e.translate)) &&
      (e.translate = 0));
}
function na(e, t, n, s) {
  (H0(e.x, t.x, n.x, s ? s.originX : void 0),
    H0(e.y, t.y, n.y, s ? s.originY : void 0));
}
function q0(e, t, n) {
  ((e.min = n.min + t.min), (e.max = e.min + Zt(t)));
}
function eM(e, t, n) {
  (q0(e.x, t.x, n.x), q0(e.y, t.y, n.y));
}
function K0(e, t, n) {
  ((e.min = t.min - n.min), (e.max = e.min + Zt(t)));
}
function ra(e, t, n) {
  (K0(e.x, t.x, n.x), K0(e.y, t.y, n.y));
}
function tM(e, { min: t, max: n }, s) {
  return (
    t !== void 0 && e < t
      ? (e = s ? Qe(t, e, s.min) : Math.max(e, t))
      : n !== void 0 && e > n && (e = s ? Qe(n, e, s.max) : Math.min(e, n)),
    e
  );
}
function Q0(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0,
  };
}
function nM(e, { top: t, left: n, bottom: s, right: i }) {
  return { x: Q0(e.x, n, i), y: Q0(e.y, t, s) };
}
function G0(e, t) {
  let n = t.min - e.min,
    s = t.max - e.max;
  return (
    t.max - t.min < e.max - e.min && ([n, s] = [s, n]),
    { min: n, max: s }
  );
}
function rM(e, t) {
  return { x: G0(e.x, t.x), y: G0(e.y, t.y) };
}
function sM(e, t) {
  let n = 0.5;
  const s = Zt(e),
    i = Zt(t);
  return (
    i > s
      ? (n = zo(t.min, t.max - s, e.min))
      : s > i && (n = zo(e.min, e.max - i, t.min)),
    cr(0, 1, n)
  );
}
function oM(e, t) {
  const n = {};
  return (
    t.min !== void 0 && (n.min = t.min - e.min),
    t.max !== void 0 && (n.max = t.max - e.min),
    n
  );
}
const Oh = 0.35;
function iM(e = Oh) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = Oh),
    { x: Y0(e, "left", "right"), y: Y0(e, "top", "bottom") }
  );
}
function Y0(e, t, n) {
  return { min: X0(e, t), max: X0(e, n) };
}
function X0(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const J0 = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  bo = () => ({ x: J0(), y: J0() }),
  Z0 = () => ({ min: 0, max: 0 }),
  nt = () => ({ x: Z0(), y: Z0() });
function un(e) {
  return [e("x"), e("y")];
}
function a1({ top: e, left: t, right: n, bottom: s }) {
  return { x: { min: t, max: n }, y: { min: e, max: s } };
}
function aM({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function lM(e, t) {
  if (!t) return e;
  const n = t({ x: e.left, y: e.top }),
    s = t({ x: e.right, y: e.bottom });
  return { top: n.y, left: n.x, bottom: s.y, right: s.x };
}
function jf(e) {
  return e === void 0 || e === 1;
}
function jh({ scale: e, scaleX: t, scaleY: n }) {
  return !jf(e) || !jf(t) || !jf(n);
}
function ws(e) {
  return (
    jh(e) ||
    l1(e) ||
    e.z ||
    e.rotate ||
    e.rotateX ||
    e.rotateY ||
    e.skewX ||
    e.skewY
  );
}
function l1(e) {
  return ew(e.x) || ew(e.y);
}
function ew(e) {
  return e && e !== "0%";
}
function Dc(e, t, n) {
  const s = e - n,
    i = t * s;
  return n + i;
}
function tw(e, t, n, s, i) {
  return (i !== void 0 && (e = Dc(e, i, s)), Dc(e, n, s) + t);
}
function Lh(e, t = 0, n = 1, s, i) {
  ((e.min = tw(e.min, t, n, s, i)), (e.max = tw(e.max, t, n, s, i)));
}
function c1(e, { x: t, y: n }) {
  (Lh(e.x, t.translate, t.scale, t.originPoint),
    Lh(e.y, n.translate, n.scale, n.originPoint));
}
const nw = 0.999999999999,
  rw = 1.0000000000001;
function cM(e, t, n, s = !1) {
  const i = n.length;
  if (!i) return;
  t.x = t.y = 1;
  let l, c;
  for (let u = 0; u < i; u++) {
    ((l = n[u]), (c = l.projectionDelta));
    const { visualElement: f } = l.options;
    (f && f.props.style && f.props.style.display === "contents") ||
      (s &&
        l.options.layoutScroll &&
        l.scroll &&
        l !== l.root &&
        Co(e, { x: -l.scroll.offset.x, y: -l.scroll.offset.y }),
      c && ((t.x *= c.x.scale), (t.y *= c.y.scale), c1(e, c)),
      s && ws(l.latestValues) && Co(e, l.latestValues));
  }
  (t.x < rw && t.x > nw && (t.x = 1), t.y < rw && t.y > nw && (t.y = 1));
}
function Eo(e, t) {
  ((e.min = e.min + t), (e.max = e.max + t));
}
function sw(e, t, n, s, i = 0.5) {
  const l = Qe(e.min, e.max, i);
  Lh(e, t, n, l, s);
}
function Co(e, t) {
  (sw(e.x, t.x, t.scaleX, t.scale, t.originX),
    sw(e.y, t.y, t.scaleY, t.scale, t.originY));
}
function u1(e, t) {
  return a1(lM(e.getBoundingClientRect(), t));
}
function uM(e, t, n) {
  const s = u1(e, n),
    { scroll: i } = t;
  return (i && (Eo(s.x, i.offset.x), Eo(s.y, i.offset.y)), s);
}
const d1 = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  dM = new WeakMap();
class fM {
  constructor(t) {
    ((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = nt()),
      (this.visualElement = t));
  }
  start(t, { snapToCursor: n = !1 } = {}) {
    const { presenceContext: s } = this.visualElement;
    if (s && s.isPresent === !1) return;
    const i = (m) => {
        const { dragSnapToOrigin: y } = this.getProps();
        (y ? this.pauseAnimation() : this.stopAnimation(),
          n && this.snapToCursor(Aa(m).point));
      },
      l = (m, y) => {
        const { drag: w, dragPropagation: C, onDragStart: E } = this.getProps();
        if (
          w &&
          !C &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = sj(w)),
          !this.openDragLock)
        )
          return;
        ((this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          un((x) => {
            let T = this.getAxisMotionValue(x).get() || 0;
            if (Un.test(T)) {
              const { projection: P } = this.visualElement;
              if (P && P.layout) {
                const R = P.layout.layoutBox[x];
                R && (T = Zt(R) * (parseFloat(T) / 100));
              }
            }
            this.originPoint[x] = T;
          }),
          E && We.postRender(() => E(m, y)),
          Ch(this.visualElement, "transform"));
        const { animationState: v } = this.visualElement;
        v && v.setActive("whileDrag", !0);
      },
      c = (m, y) => {
        const {
          dragPropagation: w,
          dragDirectionLock: C,
          onDirectionLock: E,
          onDrag: v,
        } = this.getProps();
        if (!w && !this.openDragLock) return;
        const { offset: x } = y;
        if (C && this.currentDirection === null) {
          ((this.currentDirection = hM(x)),
            this.currentDirection !== null && E && E(this.currentDirection));
          return;
        }
        (this.updateAxis("x", y.point, x),
          this.updateAxis("y", y.point, x),
          this.visualElement.render(),
          v && v(m, y));
      },
      u = (m, y) => this.stop(m, y),
      f = () =>
        un((m) => {
          var y;
          return (
            this.getAnimationState(m) === "paused" &&
            ((y = this.getAxisMotionValue(m).animation) === null || y === void 0
              ? void 0
              : y.play())
          );
        }),
      { dragSnapToOrigin: h } = this.getProps();
    this.panSession = new r1(
      t,
      {
        onSessionStart: i,
        onStart: l,
        onMove: c,
        onSessionEnd: u,
        resumeAnimation: f,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: h,
        contextWindow: d1(this.visualElement),
      },
    );
  }
  stop(t, n) {
    const s = this.isDragging;
    if ((this.cancel(), !s)) return;
    const { velocity: i } = n;
    this.startAnimation(i);
    const { onDragEnd: l } = this.getProps();
    l && We.postRender(() => l(t, n));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: n } = this.visualElement;
    (t && (t.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0));
    const { dragPropagation: s } = this.getProps();
    (!s &&
      this.openDragLock &&
      (this.openDragLock(), (this.openDragLock = null)),
      n && n.setActive("whileDrag", !1));
  }
  updateAxis(t, n, s) {
    const { drag: i } = this.getProps();
    if (!s || !Jl(t, i, this.currentDirection)) return;
    const l = this.getAxisMotionValue(t);
    let c = this.originPoint[t] + s[t];
    (this.constraints &&
      this.constraints[t] &&
      (c = tM(c, this.constraints[t], this.elastic[t])),
      l.set(c));
  }
  resolveConstraints() {
    var t;
    const { dragConstraints: n, dragElastic: s } = this.getProps(),
      i =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (t = this.visualElement.projection) === null || t === void 0
            ? void 0
            : t.layout,
      l = this.constraints;
    (n && xo(n)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : n && i
        ? (this.constraints = nM(i.layoutBox, n))
        : (this.constraints = !1),
      (this.elastic = iM(s)),
      l !== this.constraints &&
        i &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        un((c) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(c) &&
            (this.constraints[c] = oM(i.layoutBox[c], this.constraints[c]));
        }));
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !xo(t)) return !1;
    const s = t.current,
      { projection: i } = this.visualElement;
    if (!i || !i.layout) return !1;
    const l = uM(s, i.root, this.visualElement.getTransformPagePoint());
    let c = rM(i.layout.layoutBox, l);
    if (n) {
      const u = n(aM(c));
      ((this.hasMutatedConstraints = !!u), u && (c = a1(u)));
    }
    return c;
  }
  startAnimation(t) {
    const {
        drag: n,
        dragMomentum: s,
        dragElastic: i,
        dragTransition: l,
        dragSnapToOrigin: c,
        onDragTransitionEnd: u,
      } = this.getProps(),
      f = this.constraints || {},
      h = un((m) => {
        if (!Jl(m, n, this.currentDirection)) return;
        let y = (f && f[m]) || {};
        c && (y = { min: 0, max: 0 });
        const w = i ? 200 : 1e6,
          C = i ? 40 : 1e7,
          E = {
            type: "inertia",
            velocity: s ? t[m] : 0,
            bounceStiffness: w,
            bounceDamping: C,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...l,
            ...y,
          };
        return this.startAxisValueAnimation(m, E);
      });
    return Promise.all(h).then(u);
  }
  startAxisValueAnimation(t, n) {
    const s = this.getAxisMotionValue(t);
    return (
      Ch(this.visualElement, t),
      s.start(qp(t, s, 0, n, this.visualElement, !1))
    );
  }
  stopAnimation() {
    un((t) => this.getAxisMotionValue(t).stop());
  }
  pauseAnimation() {
    un((t) => {
      var n;
      return (n = this.getAxisMotionValue(t).animation) === null || n === void 0
        ? void 0
        : n.pause();
    });
  }
  getAnimationState(t) {
    var n;
    return (n = this.getAxisMotionValue(t).animation) === null || n === void 0
      ? void 0
      : n.state;
  }
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`,
      s = this.visualElement.getProps(),
      i = s[n];
    return (
      i ||
      this.visualElement.getValue(t, (s.initial ? s.initial[t] : void 0) || 0)
    );
  }
  snapToCursor(t) {
    un((n) => {
      const { drag: s } = this.getProps();
      if (!Jl(n, s, this.currentDirection)) return;
      const { projection: i } = this.visualElement,
        l = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: c, max: u } = i.layout.layoutBox[n];
        l.set(t[n] - Qe(c, u, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: t, dragConstraints: n } = this.getProps(),
      { projection: s } = this.visualElement;
    if (!xo(n) || !s || !this.constraints) return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    un((c) => {
      const u = this.getAxisMotionValue(c);
      if (u && this.constraints !== !1) {
        const f = u.get();
        i[c] = sM({ min: f, max: f }, this.constraints[c]);
      }
    });
    const { transformTemplate: l } = this.visualElement.getProps();
    ((this.visualElement.current.style.transform = l ? l({}, "") : "none"),
      s.root && s.root.updateScroll(),
      s.updateLayout(),
      this.resolveConstraints(),
      un((c) => {
        if (!Jl(c, t, null)) return;
        const u = this.getAxisMotionValue(c),
          { min: f, max: h } = this.constraints[c];
        u.set(Qe(f, h, i[c]));
      }));
  }
  addListeners() {
    if (!this.visualElement.current) return;
    dM.set(this.visualElement, this);
    const t = this.visualElement.current,
      n = ta(t, "pointerdown", (f) => {
        const { drag: h, dragListener: m = !0 } = this.getProps();
        h && m && this.start(f);
      }),
      s = () => {
        const { dragConstraints: f } = this.getProps();
        xo(f) && f.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: i } = this.visualElement,
      l = i.addEventListener("measure", s);
    (i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()),
      We.read(s));
    const c = ua(window, "resize", () => this.scalePositionWithinConstraints()),
      u = i.addEventListener(
        "didUpdate",
        ({ delta: f, hasLayoutChanged: h }) => {
          this.isDragging &&
            h &&
            (un((m) => {
              const y = this.getAxisMotionValue(m);
              y &&
                ((this.originPoint[m] += f[m].translate),
                y.set(y.get() + f[m].translate));
            }),
            this.visualElement.render());
        },
      );
    return () => {
      (c(), n(), l(), u && u());
    };
  }
  getProps() {
    const t = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: s = !1,
        dragPropagation: i = !1,
        dragConstraints: l = !1,
        dragElastic: c = Oh,
        dragMomentum: u = !0,
      } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: s,
      dragPropagation: i,
      dragConstraints: l,
      dragElastic: c,
      dragMomentum: u,
    };
  }
}
function Jl(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function hM(e, t = 10) {
  let n = null;
  return (Math.abs(e.y) > t ? (n = "y") : Math.abs(e.x) > t && (n = "x"), n);
}
class pM extends ts {
  constructor(t) {
    (super(t),
      (this.removeGroupControls = Xt),
      (this.removeListeners = Xt),
      (this.controls = new fM(t)));
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    (t && (this.removeGroupControls = t.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || Xt));
  }
  unmount() {
    (this.removeGroupControls(), this.removeListeners());
  }
}
const ow = (e) => (t, n) => {
  e && We.postRender(() => e(t, n));
};
class mM extends ts {
  constructor() {
    (super(...arguments), (this.removePointerDownListener = Xt));
  }
  onPointerDown(t) {
    this.session = new r1(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: d1(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: t,
      onPanStart: n,
      onPan: s,
      onPanEnd: i,
    } = this.node.getProps();
    return {
      onSessionStart: ow(t),
      onStart: ow(n),
      onMove: s,
      onEnd: (l, c) => {
        (delete this.session, i && We.postRender(() => i(l, c)));
      },
    };
  }
  mount() {
    this.removePointerDownListener = ta(this.node.current, "pointerdown", (t) =>
      this.onPointerDown(t),
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    (this.removePointerDownListener(), this.session && this.session.end());
  }
}
const yc = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function iw(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
const $i = {
    correct: (e, t) => {
      if (!t.target) return e;
      if (typeof e == "string")
        if (Ce.test(e)) e = parseFloat(e);
        else return e;
      const n = iw(e, t.target.x),
        s = iw(e, t.target.y);
      return `${n}% ${s}%`;
    },
  },
  gM = {
    correct: (e, { treeScale: t, projectionDelta: n }) => {
      const s = e,
        i = Xr.parse(e);
      if (i.length > 5) return s;
      const l = Xr.createTransformer(e),
        c = typeof i[0] != "number" ? 1 : 0,
        u = n.x.scale * t.x,
        f = n.y.scale * t.y;
      ((i[0 + c] /= u), (i[1 + c] /= f));
      const h = Qe(u, f, 0.5);
      return (
        typeof i[2 + c] == "number" && (i[2 + c] /= h),
        typeof i[3 + c] == "number" && (i[3 + c] /= h),
        l(i)
      );
    },
  };
class yM extends b.Component {
  componentDidMount() {
    const {
        visualElement: t,
        layoutGroup: n,
        switchLayoutGroup: s,
        layoutId: i,
      } = this.props,
      { projection: l } = t;
    (I2(vM),
      l &&
        (n.group && n.group.add(l),
        s && s.register && i && s.register(l),
        l.root.didUpdate(),
        l.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        l.setOptions({
          ...l.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (yc.hasEverUpdated = !0));
  }
  getSnapshotBeforeUpdate(t) {
    const {
        layoutDependency: n,
        visualElement: s,
        drag: i,
        isPresent: l,
      } = this.props,
      c = s.projection;
    return (
      c &&
        ((c.isPresent = l),
        i || t.layoutDependency !== n || n === void 0
          ? c.willUpdate()
          : this.safeToRemove(),
        t.isPresent !== l &&
          (l
            ? c.promote()
            : c.relegate() ||
              We.postRender(() => {
                const u = c.getStack();
                (!u || !u.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t &&
      (t.root.didUpdate(),
      Sp.postRender(() => {
        !t.currentAnimation && t.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: t,
        layoutGroup: n,
        switchLayoutGroup: s,
      } = this.props,
      { projection: i } = t;
    i &&
      (i.scheduleCheckAfterUnmount(),
      n && n.group && n.group.remove(i),
      s && s.deregister && s.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function f1(e) {
  const [t, n] = JO(),
    s = b.useContext(QS);
  return S.jsx(yM, {
    ...e,
    layoutGroup: s,
    switchLayoutGroup: b.useContext(nb),
    isPresent: t,
    safeToRemove: n,
  });
}
const vM = {
  borderRadius: {
    ...$i,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
    ],
  },
  borderTopLeftRadius: $i,
  borderTopRightRadius: $i,
  borderBottomLeftRadius: $i,
  borderBottomRightRadius: $i,
  boxShadow: gM,
};
function wM(e, t, n) {
  const s = Nt(e) ? e : la(e);
  return (s.start(qp("", s, t, n)), s.animation);
}
function xM(e) {
  return e instanceof SVGElement && e.tagName !== "svg";
}
const SM = (e, t) => e.depth - t.depth;
class bM {
  constructor() {
    ((this.children = []), (this.isDirty = !1));
  }
  add(t) {
    (Mp(this.children, t), (this.isDirty = !0));
  }
  remove(t) {
    (Dp(this.children, t), (this.isDirty = !0));
  }
  forEach(t) {
    (this.isDirty && this.children.sort(SM),
      (this.isDirty = !1),
      this.children.forEach(t));
  }
}
function EM(e, t) {
  const n = zn.now(),
    s = ({ timestamp: i }) => {
      const l = i - n;
      l >= t && (Yr(s), e(l - t));
    };
  return (We.read(s, !0), () => Yr(s));
}
const h1 = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  CM = h1.length,
  aw = (e) => (typeof e == "string" ? parseFloat(e) : e),
  lw = (e) => typeof e == "number" || Ce.test(e);
function kM(e, t, n, s, i, l) {
  i
    ? ((e.opacity = Qe(0, n.opacity !== void 0 ? n.opacity : 1, TM(s))),
      (e.opacityExit = Qe(t.opacity !== void 0 ? t.opacity : 1, 0, PM(s))))
    : l &&
      (e.opacity = Qe(
        t.opacity !== void 0 ? t.opacity : 1,
        n.opacity !== void 0 ? n.opacity : 1,
        s,
      ));
  for (let c = 0; c < CM; c++) {
    const u = `border${h1[c]}Radius`;
    let f = cw(t, u),
      h = cw(n, u);
    if (f === void 0 && h === void 0) continue;
    (f || (f = 0),
      h || (h = 0),
      f === 0 || h === 0 || lw(f) === lw(h)
        ? ((e[u] = Math.max(Qe(aw(f), aw(h), s), 0)),
          (Un.test(h) || Un.test(f)) && (e[u] += "%"))
        : (e[u] = h));
  }
  (t.rotate || n.rotate) && (e.rotate = Qe(t.rotate || 0, n.rotate || 0, s));
}
function cw(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const TM = p1(0, 0.5, Ob),
  PM = p1(0.5, 0.95, Xt);
function p1(e, t, n) {
  return (s) => (s < e ? 0 : s > t ? 1 : n(zo(e, t, s)));
}
function uw(e, t) {
  ((e.min = t.min), (e.max = t.max));
}
function cn(e, t) {
  (uw(e.x, t.x), uw(e.y, t.y));
}
function dw(e, t) {
  ((e.translate = t.translate),
    (e.scale = t.scale),
    (e.originPoint = t.originPoint),
    (e.origin = t.origin));
}
function fw(e, t, n, s, i) {
  return (
    (e -= t),
    (e = Dc(e, 1 / n, s)),
    i !== void 0 && (e = Dc(e, 1 / i, s)),
    e
  );
}
function RM(e, t = 0, n = 1, s = 0.5, i, l = e, c = e) {
  if (
    (Un.test(t) &&
      ((t = parseFloat(t)), (t = Qe(c.min, c.max, t / 100) - c.min)),
    typeof t != "number")
  )
    return;
  let u = Qe(l.min, l.max, s);
  (e === l && (u -= t),
    (e.min = fw(e.min, t, n, u, i)),
    (e.max = fw(e.max, t, n, u, i)));
}
function hw(e, t, [n, s, i], l, c) {
  RM(e, t[n], t[s], t[i], t.scale, l, c);
}
const AM = ["x", "scaleX", "originX"],
  _M = ["y", "scaleY", "originY"];
function pw(e, t, n, s) {
  (hw(e.x, t, AM, n ? n.x : void 0, s ? s.x : void 0),
    hw(e.y, t, _M, n ? n.y : void 0, s ? s.y : void 0));
}
function mw(e) {
  return e.translate === 0 && e.scale === 1;
}
function m1(e) {
  return mw(e.x) && mw(e.y);
}
function gw(e, t) {
  return e.min === t.min && e.max === t.max;
}
function NM(e, t) {
  return gw(e.x, t.x) && gw(e.y, t.y);
}
function yw(e, t) {
  return (
    Math.round(e.min) === Math.round(t.min) &&
    Math.round(e.max) === Math.round(t.max)
  );
}
function g1(e, t) {
  return yw(e.x, t.x) && yw(e.y, t.y);
}
function vw(e) {
  return Zt(e.x) / Zt(e.y);
}
function ww(e, t) {
  return (
    e.translate === t.translate &&
    e.scale === t.scale &&
    e.originPoint === t.originPoint
  );
}
class OM {
  constructor() {
    this.members = [];
  }
  add(t) {
    (Mp(this.members, t), t.scheduleRender());
  }
  remove(t) {
    if (
      (Dp(this.members, t),
      t === this.prevLead && (this.prevLead = void 0),
      t === this.lead)
    ) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex((i) => t === i);
    if (n === 0) return !1;
    let s;
    for (let i = n; i >= 0; i--) {
      const l = this.members[i];
      if (l.isPresent !== !1) {
        s = l;
        break;
      }
    }
    return s ? (this.promote(s), !0) : !1;
  }
  promote(t, n) {
    const s = this.lead;
    if (t !== s && ((this.prevLead = s), (this.lead = t), t.show(), s)) {
      (s.instance && s.scheduleRender(),
        t.scheduleRender(),
        (t.resumeFrom = s),
        n && (t.resumeFrom.preserveOpacity = !0),
        s.snapshot &&
          ((t.snapshot = s.snapshot),
          (t.snapshot.latestValues = s.animationValues || s.latestValues)),
        t.root && t.root.isUpdating && (t.isLayoutDirty = !0));
      const { crossfade: i } = t.options;
      i === !1 && s.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: s } = t;
      (n.onExitComplete && n.onExitComplete(),
        s && s.options.onExitComplete && s.options.onExitComplete());
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function jM(e, t, n) {
  let s = "";
  const i = e.x.translate / t.x,
    l = e.y.translate / t.y,
    c = (n == null ? void 0 : n.z) || 0;
  if (
    ((i || l || c) && (s = `translate3d(${i}px, ${l}px, ${c}px) `),
    (t.x !== 1 || t.y !== 1) && (s += `scale(${1 / t.x}, ${1 / t.y}) `),
    n)
  ) {
    const {
      transformPerspective: h,
      rotate: m,
      rotateX: y,
      rotateY: w,
      skewX: C,
      skewY: E,
    } = n;
    (h && (s = `perspective(${h}px) ${s}`),
      m && (s += `rotate(${m}deg) `),
      y && (s += `rotateX(${y}deg) `),
      w && (s += `rotateY(${w}deg) `),
      C && (s += `skewX(${C}deg) `),
      E && (s += `skewY(${E}deg) `));
  }
  const u = e.x.scale * t.x,
    f = e.y.scale * t.y;
  return ((u !== 1 || f !== 1) && (s += `scale(${u}, ${f})`), s || "none");
}
const xs = {
    type: "projectionFrame",
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  },
  Yi = typeof window < "u" && window.MotionDebug !== void 0,
  Lf = ["", "X", "Y", "Z"],
  LM = { visibility: "hidden" },
  xw = 1e3;
let MM = 0;
function Mf(e, t, n, s) {
  const { latestValues: i } = t;
  i[e] && ((n[e] = i[e]), t.setStaticValue(e, 0), s && (s[e] = 0));
}
function y1(e) {
  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
  const { visualElement: t } = e.options;
  if (!t) return;
  const n = kb(t);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: i, layoutId: l } = e.options;
    window.MotionCancelOptimisedAnimation(n, "transform", We, !(i || l));
  }
  const { parent: s } = e;
  s && !s.hasCheckedOptimisedAppear && y1(s);
}
function v1({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: n,
  checkIsScrollRoot: s,
  resetTransform: i,
}) {
  return class {
    constructor(c = {}, u = t == null ? void 0 : t()) {
      ((this.id = MM++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          ((this.projectionUpdateScheduled = !1),
            Yi &&
              (xs.totalNodes =
                xs.resolvedTargetDeltas =
                xs.recalculatedProjection =
                  0),
            this.nodes.forEach(FM),
            this.nodes.forEach($M),
            this.nodes.forEach(WM),
            this.nodes.forEach(VM),
            Yi && window.MotionDebug.record(xs));
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = c),
        (this.root = u ? u.root || u : this),
        (this.path = u ? [...u.path, u] : []),
        (this.parent = u),
        (this.depth = u ? u.depth + 1 : 0));
      for (let f = 0; f < this.path.length; f++)
        this.path[f].shouldResetTransform = !0;
      this.root === this && (this.nodes = new bM());
    }
    addEventListener(c, u) {
      return (
        this.eventHandlers.has(c) || this.eventHandlers.set(c, new Ip()),
        this.eventHandlers.get(c).add(u)
      );
    }
    notifyListeners(c, ...u) {
      const f = this.eventHandlers.get(c);
      f && f.notify(...u);
    }
    hasListeners(c) {
      return this.eventHandlers.has(c);
    }
    mount(c, u = this.root.hasTreeAnimated) {
      if (this.instance) return;
      ((this.isSVG = xM(c)), (this.instance = c));
      const { layoutId: f, layout: h, visualElement: m } = this.options;
      if (
        (m && !m.current && m.mount(c),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        u && (h || f) && (this.isLayoutDirty = !0),
        e)
      ) {
        let y;
        const w = () => (this.root.updateBlockedByResize = !1);
        e(c, () => {
          ((this.root.updateBlockedByResize = !0),
            y && y(),
            (y = EM(w, 250)),
            yc.hasAnimatedSinceResize &&
              ((yc.hasAnimatedSinceResize = !1), this.nodes.forEach(bw)));
        });
      }
      (f && this.root.registerSharedNode(f, this),
        this.options.animate !== !1 &&
          m &&
          (f || h) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: y,
              hasLayoutChanged: w,
              hasRelativeTargetChanged: C,
              layout: E,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                ((this.target = void 0), (this.relativeTarget = void 0));
                return;
              }
              const v =
                  this.options.transition || m.getDefaultTransition() || GM,
                { onLayoutAnimationStart: x, onLayoutAnimationComplete: T } =
                  m.getProps(),
                P = !this.targetLayout || !g1(this.targetLayout, E) || C,
                R = !w && C;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                R ||
                (w && (P || !this.currentAnimation))
              ) {
                (this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(y, R));
                const _ = { ...Np(v, "layout"), onPlay: x, onComplete: T };
                ((m.shouldReduceMotion || this.options.layoutRoot) &&
                  ((_.delay = 0), (_.type = !1)),
                  this.startAnimation(_));
              } else
                (w || bw(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete());
              this.targetLayout = E;
            },
          ));
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(),
        this.root.nodes.remove(this));
      const c = this.getStack();
      (c && c.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        Yr(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(HM),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: c } = this.options;
      return c && c.getProps().transformTemplate;
    }
    willUpdate(c = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          y1(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let m = 0; m < this.path.length; m++) {
        const y = this.path[m];
        ((y.shouldResetTransform = !0),
          y.updateScroll("snapshot"),
          y.options.layoutRoot && y.willUpdate(!1));
      }
      const { layoutId: u, layout: f } = this.options;
      if (u === void 0 && !f) return;
      const h = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = h
        ? h(this.latestValues, "")
        : void 0),
        this.updateSnapshot(),
        c && this.notifyListeners("willUpdate"));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        (this.unblockUpdate(),
          this.clearAllSnapshots(),
          this.nodes.forEach(Sw));
        return;
      }
      (this.isUpdating || this.nodes.forEach(UM),
        (this.isUpdating = !1),
        this.nodes.forEach(zM),
        this.nodes.forEach(DM),
        this.nodes.forEach(IM),
        this.clearAllSnapshots());
      const u = zn.now();
      ((St.delta = cr(0, 1e3 / 60, u - St.timestamp)),
        (St.timestamp = u),
        (St.isProcessing = !0),
        kf.update.process(St),
        kf.preRender.process(St),
        kf.render.process(St),
        (St.isProcessing = !1));
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), Sp.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(BM), this.sharedNodes.forEach(qM));
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        We.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      We.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let f = 0; f < this.path.length; f++) this.path[f].updateScroll();
      const c = this.layout;
      ((this.layout = this.measure(!1)),
        (this.layoutCorrected = nt()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox));
      const { visualElement: u } = this.options;
      u &&
        u.notify(
          "LayoutMeasure",
          this.layout.layoutBox,
          c ? c.layoutBox : void 0,
        );
    }
    updateScroll(c = "measure") {
      let u = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === c &&
          (u = !1),
        u)
      ) {
        const f = s(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: c,
          isRoot: f,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : f,
        };
      }
    }
    resetTransform() {
      if (!i) return;
      const c =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        u = this.projectionDelta && !m1(this.projectionDelta),
        f = this.getTransformTemplate(),
        h = f ? f(this.latestValues, "") : void 0,
        m = h !== this.prevTransformTemplateValue;
      c &&
        (u || ws(this.latestValues) || m) &&
        (i(this.instance, h),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(c = !0) {
      const u = this.measurePageBox();
      let f = this.removeElementScroll(u);
      return (
        c && (f = this.removeTransform(f)),
        YM(f),
        {
          animationId: this.root.animationId,
          measuredBox: u,
          layoutBox: f,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var c;
      const { visualElement: u } = this.options;
      if (!u) return nt();
      const f = u.measureViewportBox();
      if (
        !(
          ((c = this.scroll) === null || c === void 0 ? void 0 : c.wasRoot) ||
          this.path.some(XM)
        )
      ) {
        const { scroll: m } = this.root;
        m && (Eo(f.x, m.offset.x), Eo(f.y, m.offset.y));
      }
      return f;
    }
    removeElementScroll(c) {
      var u;
      const f = nt();
      if (
        (cn(f, c), !((u = this.scroll) === null || u === void 0) && u.wasRoot)
      )
        return f;
      for (let h = 0; h < this.path.length; h++) {
        const m = this.path[h],
          { scroll: y, options: w } = m;
        m !== this.root &&
          y &&
          w.layoutScroll &&
          (y.wasRoot && cn(f, c), Eo(f.x, y.offset.x), Eo(f.y, y.offset.y));
      }
      return f;
    }
    applyTransform(c, u = !1) {
      const f = nt();
      cn(f, c);
      for (let h = 0; h < this.path.length; h++) {
        const m = this.path[h];
        (!u &&
          m.options.layoutScroll &&
          m.scroll &&
          m !== m.root &&
          Co(f, { x: -m.scroll.offset.x, y: -m.scroll.offset.y }),
          ws(m.latestValues) && Co(f, m.latestValues));
      }
      return (ws(this.latestValues) && Co(f, this.latestValues), f);
    }
    removeTransform(c) {
      const u = nt();
      cn(u, c);
      for (let f = 0; f < this.path.length; f++) {
        const h = this.path[f];
        if (!h.instance || !ws(h.latestValues)) continue;
        jh(h.latestValues) && h.updateSnapshot();
        const m = nt(),
          y = h.measurePageBox();
        (cn(m, y),
          pw(u, h.latestValues, h.snapshot ? h.snapshot.layoutBox : void 0, m));
      }
      return (ws(this.latestValues) && pw(u, this.latestValues), u);
    }
    setTargetDelta(c) {
      ((this.targetDelta = c),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0));
    }
    setOptions(c) {
      this.options = {
        ...this.options,
        ...c,
        crossfade: c.crossfade !== void 0 ? c.crossfade : !0,
      };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== St.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(c = !1) {
      var u;
      const f = this.getLead();
      (this.isProjectionDirty || (this.isProjectionDirty = f.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = f.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = f.isSharedProjectionDirty));
      const h = !!this.resumingFrom || this !== f;
      if (
        !(
          c ||
          (h && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          (!((u = this.parent) === null || u === void 0) &&
            u.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: y, layoutId: w } = this.options;
      if (!(!this.layout || !(y || w))) {
        if (
          ((this.resolvedRelativeTargetAt = St.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const C = this.getClosestProjectingParent();
          C && C.layout && this.animationProgress !== 1
            ? ((this.relativeParent = C),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = nt()),
              (this.relativeTargetOrigin = nt()),
              ra(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                C.layout.layoutBox,
              ),
              cn(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target ||
              ((this.target = nt()), (this.targetWithTransforms = nt())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                eM(
                  this.target,
                  this.relativeTarget,
                  this.relativeParent.target,
                ))
              : this.targetDelta
                ? (this.resumingFrom
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : cn(this.target, this.layout.layoutBox),
                  c1(this.target, this.targetDelta))
                : cn(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            const C = this.getClosestProjectingParent();
            C &&
            !!C.resumingFrom == !!this.resumingFrom &&
            !C.options.layoutScroll &&
            C.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = C),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = nt()),
                (this.relativeTargetOrigin = nt()),
                ra(this.relativeTargetOrigin, this.target, C.target),
                cn(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          Yi && xs.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          jh(this.parent.latestValues) ||
          l1(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      var c;
      const u = this.getLead(),
        f = !!this.resumingFrom || this !== u;
      let h = !0;
      if (
        ((this.isProjectionDirty ||
          (!((c = this.parent) === null || c === void 0) &&
            c.isProjectionDirty)) &&
          (h = !1),
        f &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (h = !1),
        this.resolvedRelativeTargetAt === St.timestamp && (h = !1),
        h)
      )
        return;
      const { layout: m, layoutId: y } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(m || y))
      )
        return;
      cn(this.layoutCorrected, this.layout.layoutBox);
      const w = this.treeScale.x,
        C = this.treeScale.y;
      (cM(this.layoutCorrected, this.treeScale, this.path, f),
        u.layout &&
          !u.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((u.target = u.layout.layoutBox), (u.targetWithTransforms = nt())));
      const { target: E } = u;
      if (!E) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      (!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (dw(this.prevProjectionDelta.x, this.projectionDelta.x),
          dw(this.prevProjectionDelta.y, this.projectionDelta.y)),
        na(this.projectionDelta, this.layoutCorrected, E, this.latestValues),
        (this.treeScale.x !== w ||
          this.treeScale.y !== C ||
          !ww(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !ww(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", E)),
        Yi && xs.recalculatedProjection++);
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(c = !0) {
      var u;
      if (
        ((u = this.options.visualElement) === null ||
          u === void 0 ||
          u.scheduleRender(),
        c)
      ) {
        const f = this.getStack();
        f && f.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      ((this.prevProjectionDelta = bo()),
        (this.projectionDelta = bo()),
        (this.projectionDeltaWithTransform = bo()));
    }
    setAnimationOrigin(c, u = !1) {
      const f = this.snapshot,
        h = f ? f.latestValues : {},
        m = { ...this.latestValues },
        y = bo();
      ((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !u));
      const w = nt(),
        C = f ? f.source : void 0,
        E = this.layout ? this.layout.source : void 0,
        v = C !== E,
        x = this.getStack(),
        T = !x || x.members.length <= 1,
        P = !!(v && !T && this.options.crossfade === !0 && !this.path.some(QM));
      this.animationProgress = 0;
      let R;
      ((this.mixTargetDelta = (_) => {
        const M = _ / 1e3;
        (Ew(y.x, c.x, M),
          Ew(y.y, c.y, M),
          this.setTargetDelta(y),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (ra(w, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            KM(this.relativeTarget, this.relativeTargetOrigin, w, M),
            R && NM(this.relativeTarget, R) && (this.isProjectionDirty = !1),
            R || (R = nt()),
            cn(R, this.relativeTarget)),
          v &&
            ((this.animationValues = m), kM(m, h, this.latestValues, M, P, T)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = M));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
    }
    startAnimation(c) {
      (this.notifyListeners("animationStart"),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation &&
          (Yr(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = We.update(() => {
          ((yc.hasAnimatedSinceResize = !0),
            (this.currentAnimation = wM(0, xw, {
              ...c,
              onUpdate: (u) => {
                (this.mixTargetDelta(u), c.onUpdate && c.onUpdate(u));
              },
              onComplete: () => {
                (c.onComplete && c.onComplete(), this.completeAnimation());
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0));
        })));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const c = this.getStack();
      (c && c.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete"));
    }
    finishAnimation() {
      (this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(xw),
        this.currentAnimation.stop()),
        this.completeAnimation());
    }
    applyTransformsToTarget() {
      const c = this.getLead();
      let {
        targetWithTransforms: u,
        target: f,
        layout: h,
        latestValues: m,
      } = c;
      if (!(!u || !f || !h)) {
        if (
          this !== c &&
          this.layout &&
          h &&
          w1(this.options.animationType, this.layout.layoutBox, h.layoutBox)
        ) {
          f = this.target || nt();
          const y = Zt(this.layout.layoutBox.x);
          ((f.x.min = c.target.x.min), (f.x.max = f.x.min + y));
          const w = Zt(this.layout.layoutBox.y);
          ((f.y.min = c.target.y.min), (f.y.max = f.y.min + w));
        }
        (cn(u, f),
          Co(u, m),
          na(this.projectionDeltaWithTransform, this.layoutCorrected, u, m));
      }
    }
    registerSharedNode(c, u) {
      (this.sharedNodes.has(c) || this.sharedNodes.set(c, new OM()),
        this.sharedNodes.get(c).add(u));
      const h = u.options.initialPromotionConfig;
      u.promote({
        transition: h ? h.transition : void 0,
        preserveFollowOpacity:
          h && h.shouldPreserveFollowOpacity
            ? h.shouldPreserveFollowOpacity(u)
            : void 0,
      });
    }
    isLead() {
      const c = this.getStack();
      return c ? c.lead === this : !0;
    }
    getLead() {
      var c;
      const { layoutId: u } = this.options;
      return u
        ? ((c = this.getStack()) === null || c === void 0 ? void 0 : c.lead) ||
            this
        : this;
    }
    getPrevLead() {
      var c;
      const { layoutId: u } = this.options;
      return u
        ? (c = this.getStack()) === null || c === void 0
          ? void 0
          : c.prevLead
        : void 0;
    }
    getStack() {
      const { layoutId: c } = this.options;
      if (c) return this.root.sharedNodes.get(c);
    }
    promote({ needsReset: c, transition: u, preserveFollowOpacity: f } = {}) {
      const h = this.getStack();
      (h && h.promote(this, f),
        c && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        u && this.setOptions({ transition: u }));
    }
    relegate() {
      const c = this.getStack();
      return c ? c.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: c } = this.options;
      if (!c) return;
      let u = !1;
      const { latestValues: f } = c;
      if (
        ((f.z ||
          f.rotate ||
          f.rotateX ||
          f.rotateY ||
          f.rotateZ ||
          f.skewX ||
          f.skewY) &&
          (u = !0),
        !u)
      )
        return;
      const h = {};
      f.z && Mf("z", c, h, this.animationValues);
      for (let m = 0; m < Lf.length; m++)
        (Mf(`rotate${Lf[m]}`, c, h, this.animationValues),
          Mf(`skew${Lf[m]}`, c, h, this.animationValues));
      c.render();
      for (const m in h)
        (c.setStaticValue(m, h[m]),
          this.animationValues && (this.animationValues[m] = h[m]));
      c.scheduleRender();
    }
    getProjectionStyles(c) {
      var u, f;
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return LM;
      const h = { visibility: "" },
        m = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (h.opacity = ""),
          (h.pointerEvents = mc(c == null ? void 0 : c.pointerEvents) || ""),
          (h.transform = m ? m(this.latestValues, "") : "none"),
          h
        );
      const y = this.getLead();
      if (!this.projectionDelta || !this.layout || !y.target) {
        const v = {};
        return (
          this.options.layoutId &&
            ((v.opacity =
              this.latestValues.opacity !== void 0
                ? this.latestValues.opacity
                : 1),
            (v.pointerEvents = mc(c == null ? void 0 : c.pointerEvents) || "")),
          this.hasProjected &&
            !ws(this.latestValues) &&
            ((v.transform = m ? m({}, "") : "none"), (this.hasProjected = !1)),
          v
        );
      }
      const w = y.animationValues || y.latestValues;
      (this.applyTransformsToTarget(),
        (h.transform = jM(
          this.projectionDeltaWithTransform,
          this.treeScale,
          w,
        )),
        m && (h.transform = m(w, h.transform)));
      const { x: C, y: E } = this.projectionDelta;
      ((h.transformOrigin = `${C.origin * 100}% ${E.origin * 100}% 0`),
        y.animationValues
          ? (h.opacity =
              y === this
                ? (f =
                    (u = w.opacity) !== null && u !== void 0
                      ? u
                      : this.latestValues.opacity) !== null && f !== void 0
                  ? f
                  : 1
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : w.opacityExit)
          : (h.opacity =
              y === this
                ? w.opacity !== void 0
                  ? w.opacity
                  : ""
                : w.opacityExit !== void 0
                  ? w.opacityExit
                  : 0));
      for (const v in Nc) {
        if (w[v] === void 0) continue;
        const { correct: x, applyTo: T } = Nc[v],
          P = h.transform === "none" ? w[v] : x(w[v], y);
        if (T) {
          const R = T.length;
          for (let _ = 0; _ < R; _++) h[T[_]] = P;
        } else h[v] = P;
      }
      return (
        this.options.layoutId &&
          (h.pointerEvents =
            y === this
              ? mc(c == null ? void 0 : c.pointerEvents) || ""
              : "none"),
        h
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach((c) => {
        var u;
        return (u = c.currentAnimation) === null || u === void 0
          ? void 0
          : u.stop();
      }),
        this.root.nodes.forEach(Sw),
        this.root.sharedNodes.clear());
    }
  };
}
function DM(e) {
  e.updateLayout();
}
function IM(e) {
  var t;
  const n =
    ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) ||
    e.snapshot;
  if (e.isLead() && e.layout && n && e.hasListeners("didUpdate")) {
    const { layoutBox: s, measuredBox: i } = e.layout,
      { animationType: l } = e.options,
      c = n.source !== e.layout.source;
    l === "size"
      ? un((y) => {
          const w = c ? n.measuredBox[y] : n.layoutBox[y],
            C = Zt(w);
          ((w.min = s[y].min), (w.max = w.min + C));
        })
      : w1(l, n.layoutBox, s) &&
        un((y) => {
          const w = c ? n.measuredBox[y] : n.layoutBox[y],
            C = Zt(s[y]);
          ((w.max = w.min + C),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0),
              (e.relativeTarget[y].max = e.relativeTarget[y].min + C)));
        });
    const u = bo();
    na(u, s, n.layoutBox);
    const f = bo();
    c ? na(f, e.applyTransform(i, !0), n.measuredBox) : na(f, s, n.layoutBox);
    const h = !m1(u);
    let m = !1;
    if (!e.resumeFrom) {
      const y = e.getClosestProjectingParent();
      if (y && !y.resumeFrom) {
        const { snapshot: w, layout: C } = y;
        if (w && C) {
          const E = nt();
          ra(E, n.layoutBox, w.layoutBox);
          const v = nt();
          (ra(v, s, C.layoutBox),
            g1(E, v) || (m = !0),
            y.options.layoutRoot &&
              ((e.relativeTarget = v),
              (e.relativeTargetOrigin = E),
              (e.relativeParent = y)));
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: s,
      snapshot: n,
      delta: f,
      layoutDelta: u,
      hasLayoutChanged: h,
      hasRelativeTargetChanged: m,
    });
  } else if (e.isLead()) {
    const { onExitComplete: s } = e.options;
    s && s();
  }
  e.options.transition = void 0;
}
function FM(e) {
  (Yi && xs.totalNodes++,
    e.parent &&
      (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
      e.isSharedProjectionDirty ||
        (e.isSharedProjectionDirty = !!(
          e.isProjectionDirty ||
          e.parent.isProjectionDirty ||
          e.parent.isSharedProjectionDirty
        )),
      e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty)));
}
function VM(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function BM(e) {
  e.clearSnapshot();
}
function Sw(e) {
  e.clearMeasurements();
}
function UM(e) {
  e.isLayoutDirty = !1;
}
function zM(e) {
  const { visualElement: t } = e.options;
  (t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"),
    e.resetTransform());
}
function bw(e) {
  (e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0));
}
function $M(e) {
  e.resolveTargetDelta();
}
function WM(e) {
  e.calcProjection();
}
function HM(e) {
  e.resetSkewAndRotation();
}
function qM(e) {
  e.removeLeadSnapshot();
}
function Ew(e, t, n) {
  ((e.translate = Qe(t.translate, 0, n)),
    (e.scale = Qe(t.scale, 1, n)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint));
}
function Cw(e, t, n, s) {
  ((e.min = Qe(t.min, n.min, s)), (e.max = Qe(t.max, n.max, s)));
}
function KM(e, t, n, s) {
  (Cw(e.x, t.x, n.x, s), Cw(e.y, t.y, n.y, s));
}
function QM(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const GM = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  kw = (e) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(e),
  Tw = kw("applewebkit/") && !kw("chrome/") ? Math.round : Xt;
function Pw(e) {
  ((e.min = Tw(e.min)), (e.max = Tw(e.max)));
}
function YM(e) {
  (Pw(e.x), Pw(e.y));
}
function w1(e, t, n) {
  return (
    e === "position" || (e === "preserve-aspect" && !ZL(vw(t), vw(n), 0.2))
  );
}
function XM(e) {
  var t;
  return (
    e !== e.root &&
    ((t = e.scroll) === null || t === void 0 ? void 0 : t.wasRoot)
  );
}
const JM = v1({
    attachResizeListener: (e, t) => ua(e, "resize", t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  Df = { current: void 0 },
  x1 = v1({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!Df.current) {
        const e = new JM({});
        (e.mount(window), e.setOptions({ layoutScroll: !0 }), (Df.current = e));
      }
      return Df.current;
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : "none";
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed",
  }),
  ZM = {
    pan: { Feature: mM },
    drag: { Feature: pM, ProjectionNode: x1, MeasureLayout: f1 },
  };
function Rw(e, t, n) {
  const { props: s } = e;
  e.animationState &&
    s.whileHover &&
    e.animationState.setActive("whileHover", n === "Start");
  const i = "onHover" + n,
    l = s[i];
  l && We.postRender(() => l(t, Aa(t)));
}
class eD extends ts {
  mount() {
    const { current: t } = this.node;
    t &&
      (this.unmount = Z2(
        t,
        (n) => (Rw(this.node, n, "Start"), (s) => Rw(this.node, s, "End")),
      ));
  }
  unmount() {}
}
class tD extends ts {
  constructor() {
    (super(...arguments), (this.isActive = !1));
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = Ra(
      ua(this.node.current, "focus", () => this.onFocus()),
      ua(this.node.current, "blur", () => this.onBlur()),
    );
  }
  unmount() {}
}
function Aw(e, t, n) {
  const { props: s } = e;
  e.animationState &&
    s.whileTap &&
    e.animationState.setActive("whileTap", n === "Start");
  const i = "onTap" + (n === "End" ? "" : n),
    l = s[i];
  l && We.postRender(() => l(t, Aa(t)));
}
class nD extends ts {
  mount() {
    const { current: t } = this.node;
    t &&
      (this.unmount = rj(
        t,
        (n) => (
          Aw(this.node, n, "Start"),
          (s, { success: i }) => Aw(this.node, s, i ? "End" : "Cancel")
        ),
        { useGlobalTarget: this.node.props.globalTapTarget },
      ));
  }
  unmount() {}
}
const Mh = new WeakMap(),
  If = new WeakMap(),
  rD = (e) => {
    const t = Mh.get(e.target);
    t && t(e);
  },
  sD = (e) => {
    e.forEach(rD);
  };
function oD({ root: e, ...t }) {
  const n = e || document;
  If.has(n) || If.set(n, {});
  const s = If.get(n),
    i = JSON.stringify(t);
  return (
    s[i] || (s[i] = new IntersectionObserver(sD, { root: e, ...t })),
    s[i]
  );
}
function iD(e, t, n) {
  const s = oD(t);
  return (
    Mh.set(e, n),
    s.observe(e),
    () => {
      (Mh.delete(e), s.unobserve(e));
    }
  );
}
const aD = { some: 0, all: 1 };
class lD extends ts {
  constructor() {
    (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(),
      { root: n, margin: s, amount: i = "some", once: l } = t,
      c = {
        root: n ? n.current : void 0,
        rootMargin: s,
        threshold: typeof i == "number" ? i : aD[i],
      },
      u = (f) => {
        const { isIntersecting: h } = f;
        if (
          this.isInView === h ||
          ((this.isInView = h), l && !h && this.hasEnteredView)
        )
          return;
        (h && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive("whileInView", h));
        const { onViewportEnter: m, onViewportLeave: y } = this.node.getProps(),
          w = h ? m : y;
        w && w(f);
      };
    return iD(this.node.current, c, u);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(cD(t, n)) && this.startObserver();
  }
  unmount() {}
}
function cD({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const uD = {
    inView: { Feature: lD },
    tap: { Feature: nD },
    focus: { Feature: tD },
    hover: { Feature: eD },
  },
  dD = { layout: { ProjectionNode: x1, MeasureLayout: f1 } },
  Dh = { current: null },
  S1 = { current: !1 };
function fD() {
  if (((S1.current = !0), !!gp))
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"),
        t = () => (Dh.current = e.matches);
      (e.addListener(t), t());
    } else Dh.current = !1;
}
const hD = [...qb, At, Xr],
  pD = (e) => hD.find(Hb(e)),
  _w = new WeakMap();
function mD(e, t, n) {
  for (const s in t) {
    const i = t[s],
      l = n[s];
    if (Nt(i)) e.addValue(s, i);
    else if (Nt(l)) e.addValue(s, la(i, { owner: e }));
    else if (l !== i)
      if (e.hasValue(s)) {
        const c = e.getValue(s);
        c.liveStyle === !0 ? c.jump(i) : c.hasAnimated || c.set(i);
      } else {
        const c = e.getStaticValue(s);
        e.addValue(s, la(c !== void 0 ? c : i, { owner: e }));
      }
  }
  for (const s in n) t[s] === void 0 && e.removeValue(s);
  return t;
}
const Nw = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
class gD {
  scrapeMotionValuesFromProps(t, n, s) {
    return {};
  }
  constructor(
    {
      parent: t,
      props: n,
      presenceContext: s,
      reducedMotionConfig: i,
      blockInitialAnimation: l,
      visualState: c,
    },
    u = {},
  ) {
    ((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = $p),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection,
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const C = zn.now();
        this.renderScheduledAt < C &&
          ((this.renderScheduledAt = C), We.render(this.render, !1, !0));
      }));
    const { latestValues: f, renderState: h, onUpdate: m } = c;
    ((this.onUpdate = m),
      (this.latestValues = f),
      (this.baseTarget = { ...f }),
      (this.initialValues = n.initial ? { ...f } : {}),
      (this.renderState = h),
      (this.parent = t),
      (this.props = n),
      (this.presenceContext = s),
      (this.depth = t ? t.depth + 1 : 0),
      (this.reducedMotionConfig = i),
      (this.options = u),
      (this.blockInitialAnimation = !!l),
      (this.isControllingVariants = nu(n)),
      (this.isVariantNode = eb(n)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(t && t.current)));
    const { willChange: y, ...w } = this.scrapeMotionValuesFromProps(
      n,
      {},
      this,
    );
    for (const C in w) {
      const E = w[C];
      f[C] !== void 0 && Nt(E) && E.set(f[C], !1);
    }
  }
  mount(t) {
    ((this.current = t),
      _w.set(t, this),
      this.projection && !this.projection.instance && this.projection.mount(t),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((n, s) => this.bindToMotionValue(s, n)),
      S1.current || fD(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
            ? !0
            : Dh.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext));
  }
  unmount() {
    (_w.delete(this.current),
      this.projection && this.projection.unmount(),
      Yr(this.notifyUpdate),
      Yr(this.render),
      this.valueSubscriptions.forEach((t) => t()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this));
    for (const t in this.events) this.events[t].clear();
    for (const t in this.features) {
      const n = this.features[t];
      n && (n.unmount(), (n.isMounted = !1));
    }
    this.current = null;
  }
  bindToMotionValue(t, n) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
    const s = zs.has(t),
      i = n.on("change", (u) => {
        ((this.latestValues[t] = u),
          this.props.onUpdate && We.preRender(this.notifyUpdate),
          s && this.projection && (this.projection.isTransformDirty = !0));
      }),
      l = n.on("renderRequest", this.scheduleRender);
    let c;
    (window.MotionCheckAppearSync &&
      (c = window.MotionCheckAppearSync(this, t, n)),
      this.valueSubscriptions.set(t, () => {
        (i(), l(), c && c(), n.owner && n.stop());
      }));
  }
  sortNodePosition(t) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== t.type
      ? 0
      : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in $o) {
      const n = $o[t];
      if (!n) continue;
      const { isEnabled: s, Feature: i } = n;
      if (
        (!this.features[t] &&
          i &&
          s(this.props) &&
          (this.features[t] = new i(this)),
        this.features[t])
      ) {
        const l = this.features[t];
        l.isMounted ? l.update() : (l.mount(), (l.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : nt();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  update(t, n) {
    ((t.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = t),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n));
    for (let s = 0; s < Nw.length; s++) {
      const i = Nw[s];
      this.propEventSubscriptions[i] &&
        (this.propEventSubscriptions[i](),
        delete this.propEventSubscriptions[i]);
      const l = "on" + i,
        c = t[l];
      c && (this.propEventSubscriptions[i] = this.on(i, c));
    }
    ((this.prevMotionValues = mD(
      this,
      this.scrapeMotionValuesFromProps(t, this.prevProps, this),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue(),
      this.onUpdate && this.onUpdate(this));
  }
  getProps() {
    return this.props;
  }
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
        ? this.parent.getClosestVariantNode()
        : void 0;
  }
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return (
        n.variantChildren && n.variantChildren.add(t),
        () => n.variantChildren.delete(t)
      );
  }
  addValue(t, n) {
    const s = this.values.get(t);
    n !== s &&
      (s && this.removeValue(t),
      this.bindToMotionValue(t, n),
      this.values.set(t, n),
      (this.latestValues[t] = n.get()));
  }
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    (n && (n(), this.valueSubscriptions.delete(t)),
      delete this.latestValues[t],
      this.removeValueFromRenderState(t, this.renderState));
  }
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t]) return this.props.values[t];
    let s = this.values.get(t);
    return (
      s === void 0 &&
        n !== void 0 &&
        ((s = la(n === null ? void 0 : n, { owner: this })),
        this.addValue(t, s)),
      s
    );
  }
  readValue(t, n) {
    var s;
    let i =
      this.latestValues[t] !== void 0 || !this.current
        ? this.latestValues[t]
        : (s = this.getBaseTargetFromProps(this.props, t)) !== null &&
            s !== void 0
          ? s
          : this.readValueFromInstance(this.current, t, this.options);
    return (
      i != null &&
        (typeof i == "string" && ($b(i) || Lb(i))
          ? (i = parseFloat(i))
          : !pD(i) && Xr.test(n) && (i = Bb(t, n)),
        this.setBaseTarget(t, Nt(i) ? i.get() : i)),
      Nt(i) ? i.get() : i
    );
  }
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  getBaseTarget(t) {
    var n;
    const { initial: s } = this.props;
    let i;
    if (typeof s == "string" || typeof s == "object") {
      const c = Ep(
        this.props,
        s,
        (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom,
      );
      c && (i = c[t]);
    }
    if (s && i !== void 0) return i;
    const l = this.getBaseTargetFromProps(this.props, t);
    return l !== void 0 && !Nt(l)
      ? l
      : this.initialValues[t] !== void 0 && i === void 0
        ? void 0
        : this.baseTarget[t];
  }
  on(t, n) {
    return (
      this.events[t] || (this.events[t] = new Ip()),
      this.events[t].add(n)
    );
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
}
class b1 extends gD {
  constructor() {
    (super(...arguments), (this.KeyframeResolver = Kb));
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: s }) {
    (delete n[t], delete s[t]);
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    Nt(t) &&
      (this.childSubscription = t.on("change", (n) => {
        this.current && (this.current.textContent = `${n}`);
      }));
  }
}
function yD(e) {
  return window.getComputedStyle(e);
}
class vD extends b1 {
  constructor() {
    (super(...arguments), (this.type = "html"), (this.renderInstance = cb));
  }
  readValueFromInstance(t, n) {
    if (zs.has(n)) {
      const s = zp(n);
      return (s && s.default) || 0;
    } else {
      const s = yD(t),
        i = (ib(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return u1(t, n);
  }
  build(t, n, s) {
    Tp(t, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, s) {
    return _p(t, n, s);
  }
}
class wD extends b1 {
  constructor() {
    (super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = nt));
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (zs.has(n)) {
      const s = zp(n);
      return (s && s.default) || 0;
    }
    return ((n = ub.has(n) ? n : xp(n)), t.getAttribute(n));
  }
  scrapeMotionValuesFromProps(t, n, s) {
    return hb(t, n, s);
  }
  build(t, n, s) {
    Pp(t, n, this.isSVGTag, s.transformTemplate);
  }
  renderInstance(t, n, s, i) {
    db(t, n, s, i);
  }
  mount(t) {
    ((this.isSVGTag = Ap(t.tagName)), super.mount(t));
  }
}
const xD = (e, t) =>
    bp(e) ? new wD(t) : new vD(t, { allowProjection: e !== b.Fragment }),
  SD = q2({ ...WL, ...uD, ...ZM, ...dD }, xD),
  en = a2(SD);
function bD() {
  return S.jsxs("section", {
    className: "relative overflow-hidden bg-neutral-900 text-white",
    children: [
      S.jsxs("div", {
        className: "absolute inset-0",
        children: [
          S.jsx("img", {
            src: "https://media.base44.com/images/public/69c6b151f7a89f94f9b87555/5c6875c11_generated_7253f879.png",
            alt: "Profesionální čištění střechy",
            className: "w-full h-full object-cover opacity-40",
          }),
          S.jsx("div", {
            className:
              "absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/70 to-neutral-900/40",
          }),
        ],
      }),
      S.jsx("div", {
        className: "relative max-w-7xl mx-auto px-6 py-20 md:py-32 lg:py-40",
        children: S.jsxs(en.div, {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7 },
          className: "max-w-2xl",
          children: [
            S.jsxs("div", {
              className:
                "inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6",
              children: [
                S.jsx("div", {
                  className: "flex -space-x-1",
                  children: [...Array(5)].map((e, t) =>
                    S.jsx(
                      Sx,
                      { className: "h-4 w-4 text-primary fill-primary" },
                      t,
                    ),
                  ),
                }),
                S.jsx("span", {
                  className: "text-sm text-neutral-200",
                  children: "950+ spokojených zákazníků",
                }),
              ],
            }),
            S.jsxs("h1", {
              className:
                "font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight",
              children: [
                "Čistíme a chráníme to,",
                " ",
                S.jsx("span", {
                  className: "text-primary",
                  children: "co jste vybudovali",
                }),
              ],
            }),
            S.jsx("p", {
              className:
                "mt-6 text-lg md:text-xl text-neutral-300 leading-relaxed max-w-xl",
              children:
                "Profesionální vysokotlaké čištění, impregnace a nátěry střech, fasád a dlažeb. 13 let zkušeností po celé ČR.",
            }),
            S.jsxs("div", {
              className: "mt-8 flex flex-col sm:flex-row gap-4",
              children: [
                S.jsxs(Uo, {
                  size: "lg",
                  className:
                    "bg-primary hover:bg-primary/90 text-white font-semibold px-8 rounded-full text-base group",
                  onClick: () => {
                    var e;
                    return (e = document.getElementById("kontakt")) == null
                      ? void 0
                      : e.scrollIntoView({ behavior: "smooth" });
                  },
                  children: [
                    "Nezávazná cenová nabídka",
                    S.jsx(wx, {
                      className:
                        "ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform",
                    }),
                  ],
                }),
                S.jsx(Uo, {
                  size: "lg",
                  variant: "outline",
                  className:
                    "border-white/30 bg-white !text-neutral-900 hover:bg-white/90 rounded-full text-base font-semibold",
                  style: { color: "#111827" },
                  onClick: () => {
                    var e;
                    return (e = document.getElementById("sluzby")) == null
                      ? void 0
                      : e.scrollIntoView({ behavior: "smooth" });
                  },
                  children: "Prozkoumat služby",
                }),
              ],
            }),
          ],
        }),
      }),
      S.jsx("div", {
        className: "absolute bottom-0 left-0 right-0",
        children: S.jsx("svg", {
          viewBox: "0 0 1440 60",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          className: "w-full",
          children: S.jsx("path", {
            d: "M0 60L1440 60L1440 30C1440 30 1200 0 720 0C240 0 0 30 0 30L0 60Z",
            fill: "hsl(var(--background))",
          }),
        }),
      }),
    ],
  });
}
const ED = [
  { value: "950+", label: "Dokončených projektů" },
  { value: "745 000", label: "m² ošetřených ploch" },
  { value: "13", label: "Let zkušeností" },
  { value: "100%", label: "Bezplatná konzultace" },
];
function CD() {
  return S.jsx("section", {
    className: "py-12 md:py-16 bg-background",
    children: S.jsx("div", {
      className: "max-w-7xl mx-auto px-6",
      children: S.jsx("div", {
        className: "grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8",
        children: ED.map((e, t) =>
          S.jsxs(
            en.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: !0 },
              transition: { delay: t * 0.1, duration: 0.5 },
              className: "text-center",
              children: [
                S.jsx("div", {
                  className:
                    "font-heading text-3xl md:text-4xl font-bold text-primary",
                  children: e.value,
                }),
                S.jsx("div", {
                  className: "mt-1 text-sm text-muted-foreground",
                  children: e.label,
                }),
              ],
            },
            t,
          ),
        ),
      }),
    }),
  });
}
const kD = [
  {
    title: "Čištění fasád",
    desc: "Precizní čištění fasád od řas, plísní a smogu. Ochrana nano impregnací až na 10 let.",
    image:
      "https://media.base44.com/images/public/69c6b151f7a89f94f9b87555/ca9840b57_generated_23cd1d83.png",
  },
  {
    title: "Čištění střech",
    desc: "Profesionální čištění všech typů střech od mechů a lišejníků. Nano impregnace s ochranou až 7 let.",
    image:
      "https://media.base44.com/images/public/69c6b151f7a89f94f9b87555/8a33d42db_generated_dd359d4c.png",
  },
  {
    title: "Čištění dlažeb",
    desc: "Důkladné čištění dlažby a chodníků. Odstraňujeme mechy, mastnotu i zašlou špínu.",
    image:
      "https://media.base44.com/images/public/69c6b151f7a89f94f9b87555/300a8ac7c_generated_bf93bc68.png",
  },
  {
    title: "Solární panely",
    desc: "Šetrné čištění solárních panelů demineralizovanou vodou s keramickou nano ochranou.",
    image:
      "https://media.base44.com/images/public/69c6b151f7a89f94f9b87555/738b76aca_generated_b2c46e30.png",
  },
  {
    title: "Odstranění graffiti",
    desc: "Odstraňujeme graffiti z různých povrchů. Aplikujeme antigraffiti nátěry s dlouhou životností.",
    image:
      "https://media.base44.com/images/public/69c6b151f7a89f94f9b87555/da1886573_generated_f1a4dfcc.png",
  },
  {
    title: "Průmyslové čištění",
    desc: "Čištění průmyslových hal od podlahy ke stropu. Práce i za provozu, likvidace odpadu.",
    image:
      "https://media.base44.com/images/public/69c6b151f7a89f94f9b87555/78f96e4dd_generated_f900fa0b.png",
  },
];
function TD() {
  return S.jsx("section", {
    id: "sluzby",
    className: "py-20 md:py-28 bg-background",
    children: S.jsxs("div", {
      className: "max-w-7xl mx-auto px-6",
      children: [
        S.jsxs(en.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0 },
          className: "text-center mb-14",
          children: [
            S.jsx("span", {
              className:
                "inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3",
              children: "Naše služby",
            }),
            S.jsx("h2", {
              className:
                "font-heading text-3xl md:text-4xl font-bold text-foreground",
              children: "Dočista kvalitní služby",
            }),
            S.jsx("p", {
              className: "mt-4 text-muted-foreground max-w-2xl mx-auto text-lg",
              children:
                "Kompletní péče o váš majetek – od čištění po dlouhodobou ochranu povrchů",
            }),
          ],
        }),
        S.jsx("div", {
          className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
          children: kD.map((e, t) =>
            S.jsxs(
              en.div,
              {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: !0 },
                transition: { delay: t * 0.08, duration: 0.5 },
                className:
                  "group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer",
                onClick: () => {
                  var n;
                  return (n = document.getElementById("kontakt")) == null
                    ? void 0
                    : n.scrollIntoView({ behavior: "smooth" });
                },
                children: [
                  S.jsx("div", {
                    className: "aspect-[4/3] overflow-hidden",
                    children: S.jsx("img", {
                      src: e.image,
                      alt: e.title,
                      className:
                        "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                    }),
                  }),
                  S.jsxs("div", {
                    className: "p-6",
                    children: [
                      S.jsx("h3", {
                        className:
                          "font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors",
                        children: e.title,
                      }),
                      S.jsx("p", {
                        className:
                          "mt-2 text-sm text-muted-foreground leading-relaxed",
                        children: e.desc,
                      }),
                      S.jsxs("div", {
                        className:
                          "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity",
                        children: [
                          "Poptat službu",
                          S.jsx(wx, {
                            className:
                              "h-4 w-4 group-hover:translate-x-1 transition-transform",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              },
              t,
            ),
          ),
        }),
      ],
    }),
  });
}
const Ow = [
  {
    icon: ZT,
    num: "01",
    title: "Kontaktujte nás",
    desc: "Vyplňte formulář nebo zavolejte. Domluvíme nezávaznou konzultaci a prohlídku zdarma.",
  },
  {
    icon: zT,
    num: "02",
    title: "Zaměření a nabídka",
    desc: "Přijedeme, vše odborně posoudíme a připravíme cenovou nabídku na míru – zdarma.",
  },
  {
    icon: iP,
    num: "03",
    title: "Realizace a ochrana",
    desc: "Profesionálně vyčistíme a ošetříme váš majetek s dlouhodobou ochranou až 10 let.",
  },
];
function PD() {
  return S.jsx("section", {
    id: "proces",
    className: "py-20 md:py-28 bg-neutral-50",
    children: S.jsxs("div", {
      className: "max-w-7xl mx-auto px-6",
      children: [
        S.jsxs(en.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0 },
          className: "text-center mb-14",
          children: [
            S.jsx("span", {
              className:
                "inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3",
              children: "Jak to funguje",
            }),
            S.jsx("h2", {
              className:
                "font-heading text-3xl md:text-4xl font-bold text-foreground",
              children: "3 jednoduché kroky ke změně",
            }),
          ],
        }),
        S.jsx("div", {
          className: "grid md:grid-cols-3 gap-8 md:gap-12",
          children: Ow.map((e, t) => {
            const n = e.icon;
            return S.jsxs(
              en.div,
              {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: !0 },
                transition: { delay: t * 0.15, duration: 0.5 },
                className: "relative text-center",
                children: [
                  t < Ow.length - 1 &&
                    S.jsx("div", {
                      className:
                        "hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-primary/30",
                    }),
                  S.jsxs("div", {
                    className:
                      "inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-primary/10 mb-6 relative",
                    children: [
                      S.jsx(n, { className: "h-8 w-8 text-primary" }),
                      S.jsx("span", {
                        className:
                          "absolute -top-2 -right-2 h-7 w-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center",
                        children: e.num,
                      }),
                    ],
                  }),
                  S.jsx("h3", {
                    className: "font-heading text-xl font-bold text-foreground",
                    children: e.title,
                  }),
                  S.jsx("p", {
                    className: "mt-3 text-muted-foreground leading-relaxed",
                    children: e.desc,
                  }),
                ],
              },
              t,
            );
          }),
        }),
      ],
    }),
  });
}
const RD = [
  {
    text: "Nemohla jsem uvěřit, že tahle fasáda může znovu vypadat jako nová! Vaše práce je naprosto neuvěřitelná – jste doslova kouzelníci!",
    name: "Zdenka K.",
    location: "Brno",
    service: "Čištění fasády",
  },
  {
    text: "Ty brďo! Já už po těch letech vlastně zapomněl jakou barvu naše střecha měla! Výsledek je úplně neuvěřitelný.",
    name: "Eduard P.",
    location: "Brandýs nad Labem",
    service: "Čištění střechy",
  },
  {
    text: "Profesionální přístup od A do Z. Přijeli přesně na čas, pracovali rychle a výsledek předčil naše očekávání. Doporučuji každému!",
    name: "Martin H.",
    location: "Praha",
    service: "Čištění dlažby",
  },
];
function AD() {
  return S.jsx("section", {
    id: "reference",
    className: "py-20 md:py-28 bg-neutral-900 text-white",
    children: S.jsxs("div", {
      className: "max-w-7xl mx-auto px-6",
      children: [
        S.jsxs(en.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0 },
          className: "text-center mb-14",
          children: [
            S.jsx("span", {
              className:
                "inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3",
              children: "Reference",
            }),
            S.jsx("h2", {
              className: "font-heading text-3xl md:text-4xl font-bold",
              children: "Co říkají naši zákazníci",
            }),
          ],
        }),
        S.jsx("div", {
          className: "grid md:grid-cols-3 gap-6",
          children: RD.map((e, t) =>
            S.jsxs(
              en.div,
              {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: !0 },
                transition: { delay: t * 0.1, duration: 0.5 },
                className:
                  "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8",
                children: [
                  S.jsx(nP, { className: "h-8 w-8 text-primary/60 mb-4" }),
                  S.jsx("div", {
                    className: "flex gap-1 mb-4",
                    children: [...Array(5)].map((n, s) =>
                      S.jsx(
                        Sx,
                        { className: "h-4 w-4 text-primary fill-primary" },
                        s,
                      ),
                    ),
                  }),
                  S.jsxs("p", {
                    className: "text-neutral-200 leading-relaxed italic mb-6",
                    children: ['"', e.text, '"'],
                  }),
                  S.jsxs("div", {
                    className: "border-t border-white/10 pt-4",
                    children: [
                      S.jsx("div", {
                        className: "font-semibold text-white",
                        children: e.name,
                      }),
                      S.jsxs("div", {
                        className: "text-sm text-neutral-400",
                        children: [e.location, " · ", e.service],
                      }),
                    ],
                  }),
                ],
              },
              t,
            ),
          ),
        }),
      ],
    }),
  });
}
function _a(e, t = []) {
  let n = [];
  function s(l, c) {
    const u = b.createContext(c),
      f = n.length;
    n = [...n, c];
    const h = (y) => {
      var T;
      const { scope: w, children: C, ...E } = y,
        v = ((T = w == null ? void 0 : w[e]) == null ? void 0 : T[f]) || u,
        x = b.useMemo(() => E, Object.values(E));
      return S.jsx(v.Provider, { value: x, children: C });
    };
    h.displayName = l + "Provider";
    function m(y, w) {
      var v;
      const C = ((v = w == null ? void 0 : w[e]) == null ? void 0 : v[f]) || u,
        E = b.useContext(C);
      if (E) return E;
      if (c !== void 0) return c;
      throw new Error(`\`${y}\` must be used within \`${l}\``);
    }
    return [h, m];
  }
  const i = () => {
    const l = n.map((c) => b.createContext(c));
    return function (u) {
      const f = (u == null ? void 0 : u[e]) || l;
      return b.useMemo(() => ({ [`__scope${e}`]: { ...u, [e]: f } }), [u, f]);
    };
  };
  return ((i.scopeName = e), [s, _D(i, ...t)]);
}
function _D(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const s = e.map((i) => ({ useScope: i(), scopeName: i.scopeName }));
    return function (l) {
      const c = s.reduce((u, { useScope: f, scopeName: h }) => {
        const y = f(l)[`__scope${h}`];
        return { ...u, ...y };
      }, {});
      return b.useMemo(() => ({ [`__scope${t.scopeName}`]: c }), [c]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
function jw(e) {
  const t = ND(e),
    n = b.forwardRef((s, i) => {
      const { children: l, ...c } = s,
        u = b.Children.toArray(l),
        f = u.find(jD);
      if (f) {
        const h = f.props.children,
          m = u.map((y) =>
            y === f
              ? b.Children.count(h) > 1
                ? b.Children.only(null)
                : b.isValidElement(h)
                  ? h.props.children
                  : null
              : y,
          );
        return S.jsx(t, {
          ...c,
          ref: i,
          children: b.isValidElement(h) ? b.cloneElement(h, void 0, m) : null,
        });
      }
      return S.jsx(t, { ...c, ref: i, children: l });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
function ND(e) {
  const t = b.forwardRef((n, s) => {
    const { children: i, ...l } = n;
    if (b.isValidElement(i)) {
      const c = MD(i),
        u = LD(l, i.props);
      return (
        i.type !== b.Fragment && (u.ref = s ? ka(s, c) : c),
        b.cloneElement(i, u)
      );
    }
    return b.Children.count(i) > 1 ? b.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var OD = Symbol("radix.slottable");
function jD(e) {
  return (
    b.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === OD
  );
}
function LD(e, t) {
  const n = { ...t };
  for (const s in t) {
    const i = e[s],
      l = t[s];
    /^on[A-Z]/.test(s)
      ? i && l
        ? (n[s] = (...u) => {
            const f = l(...u);
            return (i(...u), f);
          })
        : i && (n[s] = i)
      : s === "style"
        ? (n[s] = { ...i, ...l })
        : s === "className" && (n[s] = [i, l].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function MD(e) {
  var s, i;
  let t =
      (s = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
        ? void 0
        : s.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t =
        (i = Object.getOwnPropertyDescriptor(e, "ref")) == null
          ? void 0
          : i.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function E1(e) {
  const t = e + "CollectionProvider",
    [n, s] = _a(t),
    [i, l] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    c = (v) => {
      const { scope: x, children: T } = v,
        P = rt.useRef(null),
        R = rt.useRef(new Map()).current;
      return S.jsx(i, { scope: x, itemMap: R, collectionRef: P, children: T });
    };
  c.displayName = t;
  const u = e + "CollectionSlot",
    f = jw(u),
    h = rt.forwardRef((v, x) => {
      const { scope: T, children: P } = v,
        R = l(u, T),
        _ = at(x, R.collectionRef);
      return S.jsx(f, { ref: _, children: P });
    });
  h.displayName = u;
  const m = e + "CollectionItemSlot",
    y = "data-radix-collection-item",
    w = jw(m),
    C = rt.forwardRef((v, x) => {
      const { scope: T, children: P, ...R } = v,
        _ = rt.useRef(null),
        M = at(x, _),
        V = l(m, T);
      return (
        rt.useEffect(
          () => (
            V.itemMap.set(_, { ref: _, ...R }),
            () => void V.itemMap.delete(_)
          ),
        ),
        S.jsx(w, { [y]: "", ref: M, children: P })
      );
    });
  C.displayName = m;
  function E(v) {
    const x = l(e + "CollectionConsumer", v);
    return rt.useCallback(() => {
      const P = x.collectionRef.current;
      if (!P) return [];
      const R = Array.from(P.querySelectorAll(`[${y}]`));
      return Array.from(x.itemMap.values()).sort(
        (V, U) => R.indexOf(V.ref.current) - R.indexOf(U.ref.current),
      );
    }, [x.collectionRef, x.itemMap]);
  }
  return [{ Provider: c, Slot: h, ItemSlot: C }, E, s];
}
function Ze(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (i) {
    if ((e == null || e(i), n === !1 || !i.defaultPrevented))
      return t == null ? void 0 : t(i);
  };
}
var Et =
    globalThis != null && globalThis.document ? b.useLayoutEffect : () => {},
  DD = $c[" useInsertionEffect ".trim().toString()] || Et;
function da({ prop: e, defaultProp: t, onChange: n = () => {}, caller: s }) {
  const [i, l, c] = ID({ defaultProp: t, onChange: n }),
    u = e !== void 0,
    f = u ? e : i;
  {
    const m = b.useRef(e !== void 0);
    b.useEffect(() => {
      const y = m.current;
      (y !== u &&
        console.warn(
          `${s} is changing from ${y ? "controlled" : "uncontrolled"} to ${u ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (m.current = u));
    }, [u, s]);
  }
  const h = b.useCallback(
    (m) => {
      var y;
      if (u) {
        const w = FD(m) ? m(e) : m;
        w !== e && ((y = c.current) == null || y.call(c, w));
      } else l(m);
    },
    [u, e, l, c],
  );
  return [f, h];
}
function ID({ defaultProp: e, onChange: t }) {
  const [n, s] = b.useState(e),
    i = b.useRef(n),
    l = b.useRef(t);
  return (
    DD(() => {
      l.current = t;
    }, [t]),
    b.useEffect(() => {
      var c;
      i.current !== n &&
        ((c = l.current) == null || c.call(l, n), (i.current = n));
    }, [n, i]),
    [n, s, l]
  );
}
function FD(e) {
  return typeof e == "function";
}
function VD(e) {
  const t = BD(e),
    n = b.forwardRef((s, i) => {
      const { children: l, ...c } = s,
        u = b.Children.toArray(l),
        f = u.find(zD);
      if (f) {
        const h = f.props.children,
          m = u.map((y) =>
            y === f
              ? b.Children.count(h) > 1
                ? b.Children.only(null)
                : b.isValidElement(h)
                  ? h.props.children
                  : null
              : y,
          );
        return S.jsx(t, {
          ...c,
          ref: i,
          children: b.isValidElement(h) ? b.cloneElement(h, void 0, m) : null,
        });
      }
      return S.jsx(t, { ...c, ref: i, children: l });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
function BD(e) {
  const t = b.forwardRef((n, s) => {
    const { children: i, ...l } = n;
    if (b.isValidElement(i)) {
      const c = WD(i),
        u = $D(l, i.props);
      return (
        i.type !== b.Fragment && (u.ref = s ? ka(s, c) : c),
        b.cloneElement(i, u)
      );
    }
    return b.Children.count(i) > 1 ? b.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var UD = Symbol("radix.slottable");
function zD(e) {
  return (
    b.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === UD
  );
}
function $D(e, t) {
  const n = { ...t };
  for (const s in t) {
    const i = e[s],
      l = t[s];
    /^on[A-Z]/.test(s)
      ? i && l
        ? (n[s] = (...u) => {
            const f = l(...u);
            return (i(...u), f);
          })
        : i && (n[s] = i)
      : s === "style"
        ? (n[s] = { ...i, ...l })
        : s === "className" && (n[s] = [i, l].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function WD(e) {
  var s, i;
  let t =
      (s = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
        ? void 0
        : s.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t =
        (i = Object.getOwnPropertyDescriptor(e, "ref")) == null
          ? void 0
          : i.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var HD = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  Ue = HD.reduce((e, t) => {
    const n = VD(`Primitive.${t}`),
      s = b.forwardRef((i, l) => {
        const { asChild: c, ...u } = i,
          f = c ? n : t;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          S.jsx(f, { ...u, ref: l })
        );
      });
    return ((s.displayName = `Primitive.${t}`), { ...e, [t]: s });
  }, {});
function qD(e, t) {
  e && wa.flushSync(() => e.dispatchEvent(t));
}
function KD(e, t) {
  return b.useReducer((n, s) => t[n][s] ?? n, e);
}
var C1 = (e) => {
  const { present: t, children: n } = e,
    s = QD(t),
    i =
      typeof n == "function" ? n({ present: s.isPresent }) : b.Children.only(n),
    l = at(s.ref, GD(i));
  return typeof n == "function" || s.isPresent
    ? b.cloneElement(i, { ref: l })
    : null;
};
C1.displayName = "Presence";
function QD(e) {
  const [t, n] = b.useState(),
    s = b.useRef(null),
    i = b.useRef(e),
    l = b.useRef("none"),
    c = e ? "mounted" : "unmounted",
    [u, f] = KD(c, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    b.useEffect(() => {
      const h = Zl(s.current);
      l.current = u === "mounted" ? h : "none";
    }, [u]),
    Et(() => {
      const h = s.current,
        m = i.current;
      if (m !== e) {
        const w = l.current,
          C = Zl(h);
        (e
          ? f("MOUNT")
          : C === "none" || (h == null ? void 0 : h.display) === "none"
            ? f("UNMOUNT")
            : f(m && w !== C ? "ANIMATION_OUT" : "UNMOUNT"),
          (i.current = e));
      }
    }, [e, f]),
    Et(() => {
      if (t) {
        let h;
        const m = t.ownerDocument.defaultView ?? window,
          y = (C) => {
            const v = Zl(s.current).includes(CSS.escape(C.animationName));
            if (C.target === t && v && (f("ANIMATION_END"), !i.current)) {
              const x = t.style.animationFillMode;
              ((t.style.animationFillMode = "forwards"),
                (h = m.setTimeout(() => {
                  t.style.animationFillMode === "forwards" &&
                    (t.style.animationFillMode = x);
                })));
            }
          },
          w = (C) => {
            C.target === t && (l.current = Zl(s.current));
          };
        return (
          t.addEventListener("animationstart", w),
          t.addEventListener("animationcancel", y),
          t.addEventListener("animationend", y),
          () => {
            (m.clearTimeout(h),
              t.removeEventListener("animationstart", w),
              t.removeEventListener("animationcancel", y),
              t.removeEventListener("animationend", y));
          }
        );
      } else f("ANIMATION_END");
    }, [t, f]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(u),
      ref: b.useCallback((h) => {
        ((s.current = h ? getComputedStyle(h) : null), n(h));
      }, []),
    }
  );
}
function Zl(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function GD(e) {
  var s, i;
  let t =
      (s = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
        ? void 0
        : s.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t =
        (i = Object.getOwnPropertyDescriptor(e, "ref")) == null
          ? void 0
          : i.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var YD = $c[" useId ".trim().toString()] || (() => {}),
  XD = 0;
function Na(e) {
  const [t, n] = b.useState(YD());
  return (
    Et(() => {
      n((s) => s ?? String(XD++));
    }, [e]),
    t ? `radix-${t}` : ""
  );
}
var ou = "Collapsible",
  [JD, k1] = _a(ou),
  [ZD, Kp] = JD(ou),
  T1 = b.forwardRef((e, t) => {
    const {
        __scopeCollapsible: n,
        open: s,
        defaultOpen: i,
        disabled: l,
        onOpenChange: c,
        ...u
      } = e,
      [f, h] = da({ prop: s, defaultProp: i ?? !1, onChange: c, caller: ou });
    return S.jsx(ZD, {
      scope: n,
      disabled: l,
      contentId: Na(),
      open: f,
      onOpenToggle: b.useCallback(() => h((m) => !m), [h]),
      children: S.jsx(Ue.div, {
        "data-state": Gp(f),
        "data-disabled": l ? "" : void 0,
        ...u,
        ref: t,
      }),
    });
  });
T1.displayName = ou;
var P1 = "CollapsibleTrigger",
  R1 = b.forwardRef((e, t) => {
    const { __scopeCollapsible: n, ...s } = e,
      i = Kp(P1, n);
    return S.jsx(Ue.button, {
      type: "button",
      "aria-controls": i.contentId,
      "aria-expanded": i.open || !1,
      "data-state": Gp(i.open),
      "data-disabled": i.disabled ? "" : void 0,
      disabled: i.disabled,
      ...s,
      ref: t,
      onClick: Ze(e.onClick, i.onOpenToggle),
    });
  });
R1.displayName = P1;
var Qp = "CollapsibleContent",
  A1 = b.forwardRef((e, t) => {
    const { forceMount: n, ...s } = e,
      i = Kp(Qp, e.__scopeCollapsible);
    return S.jsx(C1, {
      present: n || i.open,
      children: ({ present: l }) => S.jsx(eI, { ...s, ref: t, present: l }),
    });
  });
A1.displayName = Qp;
var eI = b.forwardRef((e, t) => {
  const { __scopeCollapsible: n, present: s, children: i, ...l } = e,
    c = Kp(Qp, n),
    [u, f] = b.useState(s),
    h = b.useRef(null),
    m = at(t, h),
    y = b.useRef(0),
    w = y.current,
    C = b.useRef(0),
    E = C.current,
    v = c.open || u,
    x = b.useRef(v),
    T = b.useRef(void 0);
  return (
    b.useEffect(() => {
      const P = requestAnimationFrame(() => (x.current = !1));
      return () => cancelAnimationFrame(P);
    }, []),
    Et(() => {
      const P = h.current;
      if (P) {
        ((T.current = T.current || {
          transitionDuration: P.style.transitionDuration,
          animationName: P.style.animationName,
        }),
          (P.style.transitionDuration = "0s"),
          (P.style.animationName = "none"));
        const R = P.getBoundingClientRect();
        ((y.current = R.height),
          (C.current = R.width),
          x.current ||
            ((P.style.transitionDuration = T.current.transitionDuration),
            (P.style.animationName = T.current.animationName)),
          f(s));
      }
    }, [c.open, s]),
    S.jsx(Ue.div, {
      "data-state": Gp(c.open),
      "data-disabled": c.disabled ? "" : void 0,
      id: c.contentId,
      hidden: !v,
      ...l,
      ref: m,
      style: {
        "--radix-collapsible-content-height": w ? `${w}px` : void 0,
        "--radix-collapsible-content-width": E ? `${E}px` : void 0,
        ...e.style,
      },
      children: v && i,
    })
  );
});
function Gp(e) {
  return e ? "open" : "closed";
}
var tI = T1,
  nI = R1,
  rI = A1,
  sI = b.createContext(void 0);
function _1(e) {
  const t = b.useContext(sI);
  return e || t || "ltr";
}
var An = "Accordion",
  oI = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"],
  [Yp, iI, aI] = E1(An),
  [iu] = _a(An, [aI, k1]),
  Xp = k1(),
  N1 = rt.forwardRef((e, t) => {
    const { type: n, ...s } = e,
      i = s,
      l = s;
    return S.jsx(Yp.Provider, {
      scope: e.__scopeAccordion,
      children:
        n === "multiple"
          ? S.jsx(dI, { ...l, ref: t })
          : S.jsx(uI, { ...i, ref: t }),
    });
  });
N1.displayName = An;
var [O1, lI] = iu(An),
  [j1, cI] = iu(An, { collapsible: !1 }),
  uI = rt.forwardRef((e, t) => {
    const {
        value: n,
        defaultValue: s,
        onValueChange: i = () => {},
        collapsible: l = !1,
        ...c
      } = e,
      [u, f] = da({ prop: n, defaultProp: s ?? "", onChange: i, caller: An });
    return S.jsx(O1, {
      scope: e.__scopeAccordion,
      value: rt.useMemo(() => (u ? [u] : []), [u]),
      onItemOpen: f,
      onItemClose: rt.useCallback(() => l && f(""), [l, f]),
      children: S.jsx(j1, {
        scope: e.__scopeAccordion,
        collapsible: l,
        children: S.jsx(L1, { ...c, ref: t }),
      }),
    });
  }),
  dI = rt.forwardRef((e, t) => {
    const { value: n, defaultValue: s, onValueChange: i = () => {}, ...l } = e,
      [c, u] = da({ prop: n, defaultProp: s ?? [], onChange: i, caller: An }),
      f = rt.useCallback((m) => u((y = []) => [...y, m]), [u]),
      h = rt.useCallback((m) => u((y = []) => y.filter((w) => w !== m)), [u]);
    return S.jsx(O1, {
      scope: e.__scopeAccordion,
      value: c,
      onItemOpen: f,
      onItemClose: h,
      children: S.jsx(j1, {
        scope: e.__scopeAccordion,
        collapsible: !0,
        children: S.jsx(L1, { ...l, ref: t }),
      }),
    });
  }),
  [fI, au] = iu(An),
  L1 = rt.forwardRef((e, t) => {
    const {
        __scopeAccordion: n,
        disabled: s,
        dir: i,
        orientation: l = "vertical",
        ...c
      } = e,
      u = rt.useRef(null),
      f = at(u, t),
      h = iI(n),
      y = _1(i) === "ltr",
      w = Ze(e.onKeyDown, (C) => {
        var D;
        if (!oI.includes(C.key)) return;
        const E = C.target,
          v = h().filter((Q) => {
            var J;
            return !((J = Q.ref.current) != null && J.disabled);
          }),
          x = v.findIndex((Q) => Q.ref.current === E),
          T = v.length;
        if (x === -1) return;
        C.preventDefault();
        let P = x;
        const R = 0,
          _ = T - 1,
          M = () => {
            ((P = x + 1), P > _ && (P = R));
          },
          V = () => {
            ((P = x - 1), P < R && (P = _));
          };
        switch (C.key) {
          case "Home":
            P = R;
            break;
          case "End":
            P = _;
            break;
          case "ArrowRight":
            l === "horizontal" && (y ? M() : V());
            break;
          case "ArrowDown":
            l === "vertical" && M();
            break;
          case "ArrowLeft":
            l === "horizontal" && (y ? V() : M());
            break;
          case "ArrowUp":
            l === "vertical" && V();
            break;
        }
        const U = P % T;
        (D = v[U].ref.current) == null || D.focus();
      });
    return S.jsx(fI, {
      scope: n,
      disabled: s,
      direction: i,
      orientation: l,
      children: S.jsx(Yp.Slot, {
        scope: n,
        children: S.jsx(Ue.div, {
          ...c,
          "data-orientation": l,
          ref: f,
          onKeyDown: s ? void 0 : w,
        }),
      }),
    });
  }),
  Ic = "AccordionItem",
  [hI, Jp] = iu(Ic),
  M1 = rt.forwardRef((e, t) => {
    const { __scopeAccordion: n, value: s, ...i } = e,
      l = au(Ic, n),
      c = lI(Ic, n),
      u = Xp(n),
      f = Na(),
      h = (s && c.value.includes(s)) || !1,
      m = l.disabled || e.disabled;
    return S.jsx(hI, {
      scope: n,
      open: h,
      disabled: m,
      triggerId: f,
      children: S.jsx(tI, {
        "data-orientation": l.orientation,
        "data-state": U1(h),
        ...u,
        ...i,
        ref: t,
        disabled: m,
        open: h,
        onOpenChange: (y) => {
          y ? c.onItemOpen(s) : c.onItemClose(s);
        },
      }),
    });
  });
M1.displayName = Ic;
var D1 = "AccordionHeader",
  I1 = rt.forwardRef((e, t) => {
    const { __scopeAccordion: n, ...s } = e,
      i = au(An, n),
      l = Jp(D1, n);
    return S.jsx(Ue.h3, {
      "data-orientation": i.orientation,
      "data-state": U1(l.open),
      "data-disabled": l.disabled ? "" : void 0,
      ...s,
      ref: t,
    });
  });
I1.displayName = D1;
var Ih = "AccordionTrigger",
  F1 = rt.forwardRef((e, t) => {
    const { __scopeAccordion: n, ...s } = e,
      i = au(An, n),
      l = Jp(Ih, n),
      c = cI(Ih, n),
      u = Xp(n);
    return S.jsx(Yp.ItemSlot, {
      scope: n,
      children: S.jsx(nI, {
        "aria-disabled": (l.open && !c.collapsible) || void 0,
        "data-orientation": i.orientation,
        id: l.triggerId,
        ...u,
        ...s,
        ref: t,
      }),
    });
  });
F1.displayName = Ih;
var V1 = "AccordionContent",
  B1 = rt.forwardRef((e, t) => {
    const { __scopeAccordion: n, ...s } = e,
      i = au(An, n),
      l = Jp(V1, n),
      c = Xp(n);
    return S.jsx(rI, {
      role: "region",
      "aria-labelledby": l.triggerId,
      "data-orientation": i.orientation,
      ...c,
      ...s,
      ref: t,
      style: {
        "--radix-accordion-content-height":
          "var(--radix-collapsible-content-height)",
        "--radix-accordion-content-width":
          "var(--radix-collapsible-content-width)",
        ...e.style,
      },
    });
  });
B1.displayName = V1;
function U1(e) {
  return e ? "open" : "closed";
}
var pI = N1,
  mI = M1,
  gI = I1,
  z1 = F1,
  $1 = B1;
const yI = pI,
  W1 = b.forwardRef(({ className: e, ...t }, n) =>
    S.jsx(mI, { ref: n, className: ft("border-b", e), ...t }),
  );
W1.displayName = "AccordionItem";
const H1 = b.forwardRef(({ className: e, children: t, ...n }, s) =>
  S.jsx(gI, {
    className: "flex",
    children: S.jsxs(z1, {
      ref: s,
      className: ft(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        e,
      ),
      ...n,
      children: [
        t,
        S.jsx(Xh, {
          className:
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
        }),
      ],
    }),
  }),
);
H1.displayName = z1.displayName;
const q1 = b.forwardRef(({ className: e, children: t, ...n }, s) =>
  S.jsx($1, {
    ref: s,
    className:
      "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...n,
    children: S.jsx("div", { className: ft("pb-4 pt-0", e), children: t }),
  }),
);
q1.displayName = $1.displayName;
const vI = [
  {
    q: "Jak dlouho trvá čištění střechy?",
    a: "Záleží na velikosti a stavu střechy. Běžný rodinný dům zvládneme za 1–2 dny. Při zaměření vám sdělíme přesný odhad.",
  },
  {
    q: "Může čištění poškodit střešní krytinu?",
    a: "Ne, používáme profesionální techniku a přizpůsobujeme tlak typu krytiny. Naši technici mají mnohaleté zkušenosti a všechny postupy jsou šetrné.",
  },
  {
    q: "Jak dlouho vydrží impregnace?",
    a: "Nano impregnace chrání povrchy 5–10 let v závislosti na typu povrchu a expozici. Přesnou životnost vám upřesníme při konzultaci.",
  },
  {
    q: "Poskytnete cenovou nabídku zdarma?",
    a: "Ano, konzultace a zaměření jsou zcela zdarma a nezávazné. Přijedeme, vše posoudíme a připravíme nabídku na míru.",
  },
  {
    q: "Působíte po celé ČR?",
    a: "Ano, jezdíme po celé České republice. Naše základna je ve středních Čechách, ale zakázky realizujeme kdekoliv.",
  },
  {
    q: "Jaká je záruka na vaše práce?",
    a: "Na naše služby poskytujeme záruku. Konkrétní délka záruky závisí na typu služby – u nátěrů až 14 let, u impregnací až 10 let.",
  },
];
function wI() {
  return S.jsx("section", {
    id: "faq",
    className: "py-20 md:py-28 bg-neutral-50",
    children: S.jsxs("div", {
      className: "max-w-3xl mx-auto px-6",
      children: [
        S.jsxs(en.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0 },
          className: "text-center mb-14",
          children: [
            S.jsx("span", {
              className:
                "inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3",
              children: "Časté dotazy",
            }),
            S.jsx("h2", {
              className:
                "font-heading text-3xl md:text-4xl font-bold text-foreground",
              children: "Máte otázky? Máme odpovědi",
            }),
          ],
        }),
        S.jsx(en.div, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0 },
          children: S.jsx(yI, {
            type: "single",
            collapsible: !0,
            className: "space-y-3",
            children: vI.map((e, t) =>
              S.jsxs(
                W1,
                {
                  value: `faq-${t}`,
                  className:
                    "bg-white rounded-xl border border-border px-6 data-[state=open]:shadow-sm",
                  children: [
                    S.jsx(H1, {
                      className:
                        "text-left font-semibold text-foreground hover:text-primary py-5 text-base",
                      children: e.q,
                    }),
                    S.jsx(q1, {
                      className: "text-muted-foreground leading-relaxed pb-5",
                      children: e.a,
                    }),
                  ],
                },
                t,
              ),
            ),
          }),
        }),
      ],
    }),
  });
}
const vc = b.forwardRef(({ className: e, type: t, ...n }, s) =>
  S.jsx("input", {
    type: t,
    className: ft(
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      e,
    ),
    ref: s,
    ...n,
  }),
);
vc.displayName = "Input";
const K1 = b.forwardRef(({ className: e, ...t }, n) =>
  S.jsx("textarea", {
    className: ft(
      "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      e,
    ),
    ref: n,
    ...t,
  }),
);
K1.displayName = "Textarea";
function Lw(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function Is(e) {
  const t = b.useRef(e);
  return (
    b.useEffect(() => {
      t.current = e;
    }),
    b.useMemo(
      () =>
        (...n) => {
          var s;
          return (s = t.current) == null ? void 0 : s.call(t, ...n);
        },
      [],
    )
  );
}
function xI(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Is(e);
  b.useEffect(() => {
    const s = (i) => {
      i.key === "Escape" && n(i);
    };
    return (
      t.addEventListener("keydown", s, { capture: !0 }),
      () => t.removeEventListener("keydown", s, { capture: !0 })
    );
  }, [n, t]);
}
var SI = "DismissableLayer",
  Fh = "dismissableLayer.update",
  bI = "dismissableLayer.pointerDownOutside",
  EI = "dismissableLayer.focusOutside",
  Mw,
  Q1 = b.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  G1 = b.forwardRef((e, t) => {
    const {
        disableOutsidePointerEvents: n = !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: i,
        onFocusOutside: l,
        onInteractOutside: c,
        onDismiss: u,
        ...f
      } = e,
      h = b.useContext(Q1),
      [m, y] = b.useState(null),
      w =
        (m == null ? void 0 : m.ownerDocument) ??
        (globalThis == null ? void 0 : globalThis.document),
      [, C] = b.useState({}),
      E = at(t, (U) => y(U)),
      v = Array.from(h.layers),
      [x] = [...h.layersWithOutsidePointerEventsDisabled].slice(-1),
      T = v.indexOf(x),
      P = m ? v.indexOf(m) : -1,
      R = h.layersWithOutsidePointerEventsDisabled.size > 0,
      _ = P >= T,
      M = TI((U) => {
        const D = U.target,
          Q = [...h.branches].some((J) => J.contains(D));
        !_ ||
          Q ||
          (i == null || i(U),
          c == null || c(U),
          U.defaultPrevented || u == null || u());
      }, w),
      V = PI((U) => {
        const D = U.target;
        [...h.branches].some((J) => J.contains(D)) ||
          (l == null || l(U),
          c == null || c(U),
          U.defaultPrevented || u == null || u());
      }, w);
    return (
      xI((U) => {
        P === h.layers.size - 1 &&
          (s == null || s(U),
          !U.defaultPrevented && u && (U.preventDefault(), u()));
      }, w),
      b.useEffect(() => {
        if (m)
          return (
            n &&
              (h.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((Mw = w.body.style.pointerEvents),
                (w.body.style.pointerEvents = "none")),
              h.layersWithOutsidePointerEventsDisabled.add(m)),
            h.layers.add(m),
            Dw(),
            () => {
              n &&
                h.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (w.body.style.pointerEvents = Mw);
            }
          );
      }, [m, w, n, h]),
      b.useEffect(
        () => () => {
          m &&
            (h.layers.delete(m),
            h.layersWithOutsidePointerEventsDisabled.delete(m),
            Dw());
        },
        [m, h],
      ),
      b.useEffect(() => {
        const U = () => C({});
        return (
          document.addEventListener(Fh, U),
          () => document.removeEventListener(Fh, U)
        );
      }, []),
      S.jsx(Ue.div, {
        ...f,
        ref: E,
        style: {
          pointerEvents: R ? (_ ? "auto" : "none") : void 0,
          ...e.style,
        },
        onFocusCapture: Ze(e.onFocusCapture, V.onFocusCapture),
        onBlurCapture: Ze(e.onBlurCapture, V.onBlurCapture),
        onPointerDownCapture: Ze(
          e.onPointerDownCapture,
          M.onPointerDownCapture,
        ),
      })
    );
  });
G1.displayName = SI;
var CI = "DismissableLayerBranch",
  kI = b.forwardRef((e, t) => {
    const n = b.useContext(Q1),
      s = b.useRef(null),
      i = at(t, s);
    return (
      b.useEffect(() => {
        const l = s.current;
        if (l)
          return (
            n.branches.add(l),
            () => {
              n.branches.delete(l);
            }
          );
      }, [n.branches]),
      S.jsx(Ue.div, { ...e, ref: i })
    );
  });
kI.displayName = CI;
function TI(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Is(e),
    s = b.useRef(!1),
    i = b.useRef(() => {});
  return (
    b.useEffect(() => {
      const l = (u) => {
          if (u.target && !s.current) {
            let f = function () {
              Y1(bI, n, h, { discrete: !0 });
            };
            const h = { originalEvent: u };
            u.pointerType === "touch"
              ? (t.removeEventListener("click", i.current),
                (i.current = f),
                t.addEventListener("click", i.current, { once: !0 }))
              : f();
          } else t.removeEventListener("click", i.current);
          s.current = !1;
        },
        c = window.setTimeout(() => {
          t.addEventListener("pointerdown", l);
        }, 0);
      return () => {
        (window.clearTimeout(c),
          t.removeEventListener("pointerdown", l),
          t.removeEventListener("click", i.current));
      };
    }, [t, n]),
    { onPointerDownCapture: () => (s.current = !0) }
  );
}
function PI(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Is(e),
    s = b.useRef(!1);
  return (
    b.useEffect(() => {
      const i = (l) => {
        l.target &&
          !s.current &&
          Y1(EI, n, { originalEvent: l }, { discrete: !1 });
      };
      return (
        t.addEventListener("focusin", i),
        () => t.removeEventListener("focusin", i)
      );
    }, [t, n]),
    {
      onFocusCapture: () => (s.current = !0),
      onBlurCapture: () => (s.current = !1),
    }
  );
}
function Dw() {
  const e = new CustomEvent(Fh);
  document.dispatchEvent(e);
}
function Y1(e, t, n, { discrete: s }) {
  const i = n.originalEvent.target,
    l = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  (t && i.addEventListener(e, t, { once: !0 }),
    s ? qD(i, l) : i.dispatchEvent(l));
}
var Ff = 0;
function RI() {
  b.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement("afterbegin", e[0] ?? Iw()),
      document.body.insertAdjacentElement("beforeend", e[1] ?? Iw()),
      Ff++,
      () => {
        (Ff === 1 &&
          document
            .querySelectorAll("[data-radix-focus-guard]")
            .forEach((t) => t.remove()),
          Ff--);
      }
    );
  }, []);
}
function Iw() {
  const e = document.createElement("span");
  return (
    e.setAttribute("data-radix-focus-guard", ""),
    (e.tabIndex = 0),
    (e.style.outline = "none"),
    (e.style.opacity = "0"),
    (e.style.position = "fixed"),
    (e.style.pointerEvents = "none"),
    e
  );
}
var Vf = "focusScope.autoFocusOnMount",
  Bf = "focusScope.autoFocusOnUnmount",
  Fw = { bubbles: !1, cancelable: !0 },
  AI = "FocusScope",
  X1 = b.forwardRef((e, t) => {
    const {
        loop: n = !1,
        trapped: s = !1,
        onMountAutoFocus: i,
        onUnmountAutoFocus: l,
        ...c
      } = e,
      [u, f] = b.useState(null),
      h = Is(i),
      m = Is(l),
      y = b.useRef(null),
      w = at(t, (v) => f(v)),
      C = b.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (b.useEffect(() => {
      if (s) {
        let v = function (R) {
            if (C.paused || !u) return;
            const _ = R.target;
            u.contains(_) ? (y.current = _) : Fr(y.current, { select: !0 });
          },
          x = function (R) {
            if (C.paused || !u) return;
            const _ = R.relatedTarget;
            _ !== null && (u.contains(_) || Fr(y.current, { select: !0 }));
          },
          T = function (R) {
            if (document.activeElement === document.body)
              for (const M of R) M.removedNodes.length > 0 && Fr(u);
          };
        (document.addEventListener("focusin", v),
          document.addEventListener("focusout", x));
        const P = new MutationObserver(T);
        return (
          u && P.observe(u, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener("focusin", v),
              document.removeEventListener("focusout", x),
              P.disconnect());
          }
        );
      }
    }, [s, u, C.paused]),
      b.useEffect(() => {
        if (u) {
          Bw.add(C);
          const v = document.activeElement;
          if (!u.contains(v)) {
            const T = new CustomEvent(Vf, Fw);
            (u.addEventListener(Vf, h),
              u.dispatchEvent(T),
              T.defaultPrevented ||
                (_I(MI(J1(u)), { select: !0 }),
                document.activeElement === v && Fr(u)));
          }
          return () => {
            (u.removeEventListener(Vf, h),
              setTimeout(() => {
                const T = new CustomEvent(Bf, Fw);
                (u.addEventListener(Bf, m),
                  u.dispatchEvent(T),
                  T.defaultPrevented || Fr(v ?? document.body, { select: !0 }),
                  u.removeEventListener(Bf, m),
                  Bw.remove(C));
              }, 0));
          };
        }
      }, [u, h, m, C]));
    const E = b.useCallback(
      (v) => {
        if ((!n && !s) || C.paused) return;
        const x = v.key === "Tab" && !v.altKey && !v.ctrlKey && !v.metaKey,
          T = document.activeElement;
        if (x && T) {
          const P = v.currentTarget,
            [R, _] = NI(P);
          R && _
            ? !v.shiftKey && T === _
              ? (v.preventDefault(), n && Fr(R, { select: !0 }))
              : v.shiftKey &&
                T === R &&
                (v.preventDefault(), n && Fr(_, { select: !0 }))
            : T === P && v.preventDefault();
        }
      },
      [n, s, C.paused],
    );
    return S.jsx(Ue.div, { tabIndex: -1, ...c, ref: w, onKeyDown: E });
  });
X1.displayName = AI;
function _I(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const s of e)
    if ((Fr(s, { select: t }), document.activeElement !== n)) return;
}
function NI(e) {
  const t = J1(e),
    n = Vw(t, e),
    s = Vw(t.reverse(), e);
  return [n, s];
}
function J1(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (s) => {
        const i = s.tagName === "INPUT" && s.type === "hidden";
        return s.disabled || s.hidden || i
          ? NodeFilter.FILTER_SKIP
          : s.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Vw(e, t) {
  for (const n of e) if (!OI(n, { upTo: t })) return n;
}
function OI(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function jI(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Fr(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== n && jI(e) && t && e.select());
  }
}
var Bw = LI();
function LI() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      (t !== n && (n == null || n.pause()), (e = Uw(e, t)), e.unshift(t));
    },
    remove(t) {
      var n;
      ((e = Uw(e, t)), (n = e[0]) == null || n.resume());
    },
  };
}
function Uw(e, t) {
  const n = [...e],
    s = n.indexOf(t);
  return (s !== -1 && n.splice(s, 1), n);
}
function MI(e) {
  return e.filter((t) => t.tagName !== "A");
}
const DI = ["top", "right", "bottom", "left"],
  Jr = Math.min,
  Yt = Math.max,
  Fc = Math.round,
  ec = Math.floor,
  $n = (e) => ({ x: e, y: e }),
  II = { left: "right", right: "left", bottom: "top", top: "bottom" },
  FI = { start: "end", end: "start" };
function Vh(e, t, n) {
  return Yt(e, Jr(t, n));
}
function ur(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function dr(e) {
  return e.split("-")[0];
}
function Yo(e) {
  return e.split("-")[1];
}
function Zp(e) {
  return e === "x" ? "y" : "x";
}
function em(e) {
  return e === "y" ? "height" : "width";
}
const VI = new Set(["top", "bottom"]);
function Vn(e) {
  return VI.has(dr(e)) ? "y" : "x";
}
function tm(e) {
  return Zp(Vn(e));
}
function BI(e, t, n) {
  n === void 0 && (n = !1);
  const s = Yo(e),
    i = tm(e),
    l = em(i);
  let c =
    i === "x"
      ? s === (n ? "end" : "start")
        ? "right"
        : "left"
      : s === "start"
        ? "bottom"
        : "top";
  return (t.reference[l] > t.floating[l] && (c = Vc(c)), [c, Vc(c)]);
}
function UI(e) {
  const t = Vc(e);
  return [Bh(e), t, Bh(t)];
}
function Bh(e) {
  return e.replace(/start|end/g, (t) => FI[t]);
}
const zw = ["left", "right"],
  $w = ["right", "left"],
  zI = ["top", "bottom"],
  $I = ["bottom", "top"];
function WI(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? $w : zw) : t ? zw : $w;
    case "left":
    case "right":
      return t ? zI : $I;
    default:
      return [];
  }
}
function HI(e, t, n, s) {
  const i = Yo(e);
  let l = WI(dr(e), n === "start", s);
  return (
    i && ((l = l.map((c) => c + "-" + i)), t && (l = l.concat(l.map(Bh)))),
    l
  );
}
function Vc(e) {
  return e.replace(/left|right|bottom|top/g, (t) => II[t]);
}
function qI(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function Z1(e) {
  return typeof e != "number"
    ? qI(e)
    : { top: e, right: e, bottom: e, left: e };
}
function Bc(e) {
  const { x: t, y: n, width: s, height: i } = e;
  return {
    width: s,
    height: i,
    top: n,
    left: t,
    right: t + s,
    bottom: n + i,
    x: t,
    y: n,
  };
}
function Ww(e, t, n) {
  let { reference: s, floating: i } = e;
  const l = Vn(t),
    c = tm(t),
    u = em(c),
    f = dr(t),
    h = l === "y",
    m = s.x + s.width / 2 - i.width / 2,
    y = s.y + s.height / 2 - i.height / 2,
    w = s[u] / 2 - i[u] / 2;
  let C;
  switch (f) {
    case "top":
      C = { x: m, y: s.y - i.height };
      break;
    case "bottom":
      C = { x: m, y: s.y + s.height };
      break;
    case "right":
      C = { x: s.x + s.width, y };
      break;
    case "left":
      C = { x: s.x - i.width, y };
      break;
    default:
      C = { x: s.x, y: s.y };
  }
  switch (Yo(t)) {
    case "start":
      C[c] -= w * (n && h ? -1 : 1);
      break;
    case "end":
      C[c] += w * (n && h ? -1 : 1);
      break;
  }
  return C;
}
async function KI(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: s, y: i, platform: l, rects: c, elements: u, strategy: f } = e,
    {
      boundary: h = "clippingAncestors",
      rootBoundary: m = "viewport",
      elementContext: y = "floating",
      altBoundary: w = !1,
      padding: C = 0,
    } = ur(t, e),
    E = Z1(C),
    x = u[w ? (y === "floating" ? "reference" : "floating") : y],
    T = Bc(
      await l.getClippingRect({
        element:
          (n = await (l.isElement == null ? void 0 : l.isElement(x))) == null ||
          n
            ? x
            : x.contextElement ||
              (await (l.getDocumentElement == null
                ? void 0
                : l.getDocumentElement(u.floating))),
        boundary: h,
        rootBoundary: m,
        strategy: f,
      }),
    ),
    P =
      y === "floating"
        ? { x: s, y: i, width: c.floating.width, height: c.floating.height }
        : c.reference,
    R = await (l.getOffsetParent == null
      ? void 0
      : l.getOffsetParent(u.floating)),
    _ = (await (l.isElement == null ? void 0 : l.isElement(R)))
      ? (await (l.getScale == null ? void 0 : l.getScale(R))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    M = Bc(
      l.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: u,
            rect: P,
            offsetParent: R,
            strategy: f,
          })
        : P,
    );
  return {
    top: (T.top - M.top + E.top) / _.y,
    bottom: (M.bottom - T.bottom + E.bottom) / _.y,
    left: (T.left - M.left + E.left) / _.x,
    right: (M.right - T.right + E.right) / _.x,
  };
}
const QI = async (e, t, n) => {
    const {
        placement: s = "bottom",
        strategy: i = "absolute",
        middleware: l = [],
        platform: c,
      } = n,
      u = l.filter(Boolean),
      f = await (c.isRTL == null ? void 0 : c.isRTL(t));
    let h = await c.getElementRects({ reference: e, floating: t, strategy: i }),
      { x: m, y } = Ww(h, s, f),
      w = s,
      C = {},
      E = 0;
    for (let x = 0; x < u.length; x++) {
      var v;
      const { name: T, fn: P } = u[x],
        {
          x: R,
          y: _,
          data: M,
          reset: V,
        } = await P({
          x: m,
          y,
          initialPlacement: s,
          placement: w,
          strategy: i,
          middlewareData: C,
          rects: h,
          platform: {
            ...c,
            detectOverflow: (v = c.detectOverflow) != null ? v : KI,
          },
          elements: { reference: e, floating: t },
        });
      ((m = R ?? m),
        (y = _ ?? y),
        (C = { ...C, [T]: { ...C[T], ...M } }),
        V &&
          E <= 50 &&
          (E++,
          typeof V == "object" &&
            (V.placement && (w = V.placement),
            V.rects &&
              (h =
                V.rects === !0
                  ? await c.getElementRects({
                      reference: e,
                      floating: t,
                      strategy: i,
                    })
                  : V.rects),
            ({ x: m, y } = Ww(h, w, f))),
          (x = -1)));
    }
    return { x: m, y, placement: w, strategy: i, middlewareData: C };
  },
  GI = (e) => ({
    name: "arrow",
    options: e,
    async fn(t) {
      const {
          x: n,
          y: s,
          placement: i,
          rects: l,
          platform: c,
          elements: u,
          middlewareData: f,
        } = t,
        { element: h, padding: m = 0 } = ur(e, t) || {};
      if (h == null) return {};
      const y = Z1(m),
        w = { x: n, y: s },
        C = tm(i),
        E = em(C),
        v = await c.getDimensions(h),
        x = C === "y",
        T = x ? "top" : "left",
        P = x ? "bottom" : "right",
        R = x ? "clientHeight" : "clientWidth",
        _ = l.reference[E] + l.reference[C] - w[C] - l.floating[E],
        M = w[C] - l.reference[C],
        V = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(h));
      let U = V ? V[R] : 0;
      (!U || !(await (c.isElement == null ? void 0 : c.isElement(V)))) &&
        (U = u.floating[R] || l.floating[E]);
      const D = _ / 2 - M / 2,
        Q = U / 2 - v[E] / 2 - 1,
        J = Jr(y[T], Q),
        ee = Jr(y[P], Q),
        de = J,
        ge = U - v[E] - ee,
        le = U / 2 - v[E] / 2 + D,
        Ee = Vh(de, le, ge),
        te =
          !f.arrow &&
          Yo(i) != null &&
          le !== Ee &&
          l.reference[E] / 2 - (le < de ? J : ee) - v[E] / 2 < 0,
        Z = te ? (le < de ? le - de : le - ge) : 0;
      return {
        [C]: w[C] + Z,
        data: {
          [C]: Ee,
          centerOffset: le - Ee - Z,
          ...(te && { alignmentOffset: Z }),
        },
        reset: te,
      };
    },
  }),
  YI = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var n, s;
          const {
              placement: i,
              middlewareData: l,
              rects: c,
              initialPlacement: u,
              platform: f,
              elements: h,
            } = t,
            {
              mainAxis: m = !0,
              crossAxis: y = !0,
              fallbackPlacements: w,
              fallbackStrategy: C = "bestFit",
              fallbackAxisSideDirection: E = "none",
              flipAlignment: v = !0,
              ...x
            } = ur(e, t);
          if ((n = l.arrow) != null && n.alignmentOffset) return {};
          const T = dr(i),
            P = Vn(u),
            R = dr(u) === u,
            _ = await (f.isRTL == null ? void 0 : f.isRTL(h.floating)),
            M = w || (R || !v ? [Vc(u)] : UI(u)),
            V = E !== "none";
          !w && V && M.push(...HI(u, v, E, _));
          const U = [u, ...M],
            D = await f.detectOverflow(t, x),
            Q = [];
          let J = ((s = l.flip) == null ? void 0 : s.overflows) || [];
          if ((m && Q.push(D[T]), y)) {
            const le = BI(i, c, _);
            Q.push(D[le[0]], D[le[1]]);
          }
          if (
            ((J = [...J, { placement: i, overflows: Q }]),
            !Q.every((le) => le <= 0))
          ) {
            var ee, de;
            const le = (((ee = l.flip) == null ? void 0 : ee.index) || 0) + 1,
              Ee = U[le];
            if (
              Ee &&
              (!(y === "alignment" ? P !== Vn(Ee) : !1) ||
                J.every(($) =>
                  Vn($.placement) === P ? $.overflows[0] > 0 : !0,
                ))
            )
              return {
                data: { index: le, overflows: J },
                reset: { placement: Ee },
              };
            let te =
              (de = J.filter((Z) => Z.overflows[0] <= 0).sort(
                (Z, $) => Z.overflows[1] - $.overflows[1],
              )[0]) == null
                ? void 0
                : de.placement;
            if (!te)
              switch (C) {
                case "bestFit": {
                  var ge;
                  const Z =
                    (ge = J.filter(($) => {
                      if (V) {
                        const X = Vn($.placement);
                        return X === P || X === "y";
                      }
                      return !0;
                    })
                      .map(($) => [
                        $.placement,
                        $.overflows
                          .filter((X) => X > 0)
                          .reduce((X, W) => X + W, 0),
                      ])
                      .sort(($, X) => $[1] - X[1])[0]) == null
                      ? void 0
                      : ge[0];
                  Z && (te = Z);
                  break;
                }
                case "initialPlacement":
                  te = u;
                  break;
              }
            if (i !== te) return { reset: { placement: te } };
          }
          return {};
        },
      }
    );
  };
function Hw(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function qw(e) {
  return DI.some((t) => e[t] >= 0);
}
const XI = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "hide",
        options: e,
        async fn(t) {
          const { rects: n, platform: s } = t,
            { strategy: i = "referenceHidden", ...l } = ur(e, t);
          switch (i) {
            case "referenceHidden": {
              const c = await s.detectOverflow(t, {
                  ...l,
                  elementContext: "reference",
                }),
                u = Hw(c, n.reference);
              return {
                data: { referenceHiddenOffsets: u, referenceHidden: qw(u) },
              };
            }
            case "escaped": {
              const c = await s.detectOverflow(t, { ...l, altBoundary: !0 }),
                u = Hw(c, n.floating);
              return { data: { escapedOffsets: u, escaped: qw(u) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  eE = new Set(["left", "top"]);
async function JI(e, t) {
  const { placement: n, platform: s, elements: i } = e,
    l = await (s.isRTL == null ? void 0 : s.isRTL(i.floating)),
    c = dr(n),
    u = Yo(n),
    f = Vn(n) === "y",
    h = eE.has(c) ? -1 : 1,
    m = l && f ? -1 : 1,
    y = ur(t, e);
  let {
    mainAxis: w,
    crossAxis: C,
    alignmentAxis: E,
  } = typeof y == "number"
    ? { mainAxis: y, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: y.mainAxis || 0,
        crossAxis: y.crossAxis || 0,
        alignmentAxis: y.alignmentAxis,
      };
  return (
    u && typeof E == "number" && (C = u === "end" ? E * -1 : E),
    f ? { x: C * m, y: w * h } : { x: w * h, y: C * m }
  );
}
const ZI = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          var n, s;
          const { x: i, y: l, placement: c, middlewareData: u } = t,
            f = await JI(t, e);
          return c === ((n = u.offset) == null ? void 0 : n.placement) &&
            (s = u.arrow) != null &&
            s.alignmentOffset
            ? {}
            : { x: i + f.x, y: l + f.y, data: { ...f, placement: c } };
        },
      }
    );
  },
  eF = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: n, y: s, placement: i, platform: l } = t,
            {
              mainAxis: c = !0,
              crossAxis: u = !1,
              limiter: f = {
                fn: (T) => {
                  let { x: P, y: R } = T;
                  return { x: P, y: R };
                },
              },
              ...h
            } = ur(e, t),
            m = { x: n, y: s },
            y = await l.detectOverflow(t, h),
            w = Vn(dr(i)),
            C = Zp(w);
          let E = m[C],
            v = m[w];
          if (c) {
            const T = C === "y" ? "top" : "left",
              P = C === "y" ? "bottom" : "right",
              R = E + y[T],
              _ = E - y[P];
            E = Vh(R, E, _);
          }
          if (u) {
            const T = w === "y" ? "top" : "left",
              P = w === "y" ? "bottom" : "right",
              R = v + y[T],
              _ = v - y[P];
            v = Vh(R, v, _);
          }
          const x = f.fn({ ...t, [C]: E, [w]: v });
          return {
            ...x,
            data: { x: x.x - n, y: x.y - s, enabled: { [C]: c, [w]: u } },
          };
        },
      }
    );
  },
  tF = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: s, placement: i, rects: l, middlewareData: c } = t,
            { offset: u = 0, mainAxis: f = !0, crossAxis: h = !0 } = ur(e, t),
            m = { x: n, y: s },
            y = Vn(i),
            w = Zp(y);
          let C = m[w],
            E = m[y];
          const v = ur(u, t),
            x =
              typeof v == "number"
                ? { mainAxis: v, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...v };
          if (f) {
            const R = w === "y" ? "height" : "width",
              _ = l.reference[w] - l.floating[R] + x.mainAxis,
              M = l.reference[w] + l.reference[R] - x.mainAxis;
            C < _ ? (C = _) : C > M && (C = M);
          }
          if (h) {
            var T, P;
            const R = w === "y" ? "width" : "height",
              _ = eE.has(dr(i)),
              M =
                l.reference[y] -
                l.floating[R] +
                ((_ && ((T = c.offset) == null ? void 0 : T[y])) || 0) +
                (_ ? 0 : x.crossAxis),
              V =
                l.reference[y] +
                l.reference[R] +
                (_ ? 0 : ((P = c.offset) == null ? void 0 : P[y]) || 0) -
                (_ ? x.crossAxis : 0);
            E < M ? (E = M) : E > V && (E = V);
          }
          return { [w]: C, [y]: E };
        },
      }
    );
  },
  nF = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(t) {
          var n, s;
          const { placement: i, rects: l, platform: c, elements: u } = t,
            { apply: f = () => {}, ...h } = ur(e, t),
            m = await c.detectOverflow(t, h),
            y = dr(i),
            w = Yo(i),
            C = Vn(i) === "y",
            { width: E, height: v } = l.floating;
          let x, T;
          y === "top" || y === "bottom"
            ? ((x = y),
              (T =
                w ===
                ((await (c.isRTL == null ? void 0 : c.isRTL(u.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((T = y), (x = w === "end" ? "top" : "bottom"));
          const P = v - m.top - m.bottom,
            R = E - m.left - m.right,
            _ = Jr(v - m[x], P),
            M = Jr(E - m[T], R),
            V = !t.middlewareData.shift;
          let U = _,
            D = M;
          if (
            ((n = t.middlewareData.shift) != null && n.enabled.x && (D = R),
            (s = t.middlewareData.shift) != null && s.enabled.y && (U = P),
            V && !w)
          ) {
            const J = Yt(m.left, 0),
              ee = Yt(m.right, 0),
              de = Yt(m.top, 0),
              ge = Yt(m.bottom, 0);
            C
              ? (D =
                  E - 2 * (J !== 0 || ee !== 0 ? J + ee : Yt(m.left, m.right)))
              : (U =
                  v -
                  2 * (de !== 0 || ge !== 0 ? de + ge : Yt(m.top, m.bottom)));
          }
          await f({ ...t, availableWidth: D, availableHeight: U });
          const Q = await c.getDimensions(u.floating);
          return E !== Q.width || v !== Q.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function lu() {
  return typeof window < "u";
}
function Xo(e) {
  return tE(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Jt(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function qn(e) {
  var t;
  return (t = (tE(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function tE(e) {
  return lu() ? e instanceof Node || e instanceof Jt(e).Node : !1;
}
function Tn(e) {
  return lu() ? e instanceof Element || e instanceof Jt(e).Element : !1;
}
function Hn(e) {
  return lu() ? e instanceof HTMLElement || e instanceof Jt(e).HTMLElement : !1;
}
function Kw(e) {
  return !lu() || typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof Jt(e).ShadowRoot;
}
const rF = new Set(["inline", "contents"]);
function Oa(e) {
  const { overflow: t, overflowX: n, overflowY: s, display: i } = Pn(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + s + n) && !rF.has(i);
}
const sF = new Set(["table", "td", "th"]);
function oF(e) {
  return sF.has(Xo(e));
}
const iF = [":popover-open", ":modal"];
function cu(e) {
  return iF.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const aF = ["transform", "translate", "scale", "rotate", "perspective"],
  lF = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  cF = ["paint", "layout", "strict", "content"];
function nm(e) {
  const t = rm(),
    n = Tn(e) ? Pn(e) : e;
  return (
    aF.some((s) => (n[s] ? n[s] !== "none" : !1)) ||
    (n.containerType ? n.containerType !== "normal" : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== "none" : !1)) ||
    (!t && (n.filter ? n.filter !== "none" : !1)) ||
    lF.some((s) => (n.willChange || "").includes(s)) ||
    cF.some((s) => (n.contain || "").includes(s))
  );
}
function uF(e) {
  let t = Zr(e);
  for (; Hn(t) && !Ho(t); ) {
    if (nm(t)) return t;
    if (cu(t)) return null;
    t = Zr(t);
  }
  return null;
}
function rm() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
const dF = new Set(["html", "body", "#document"]);
function Ho(e) {
  return dF.has(Xo(e));
}
function Pn(e) {
  return Jt(e).getComputedStyle(e);
}
function uu(e) {
  return Tn(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Zr(e) {
  if (Xo(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (Kw(e) && e.host) || qn(e);
  return Kw(t) ? t.host : t;
}
function nE(e) {
  const t = Zr(e);
  return Ho(t)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : Hn(t) && Oa(t)
      ? t
      : nE(t);
}
function fa(e, t, n) {
  var s;
  (t === void 0 && (t = []), n === void 0 && (n = !0));
  const i = nE(e),
    l = i === ((s = e.ownerDocument) == null ? void 0 : s.body),
    c = Jt(i);
  if (l) {
    const u = Uh(c);
    return t.concat(
      c,
      c.visualViewport || [],
      Oa(i) ? i : [],
      u && n ? fa(u) : [],
    );
  }
  return t.concat(i, fa(i, [], n));
}
function Uh(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function rE(e) {
  const t = Pn(e);
  let n = parseFloat(t.width) || 0,
    s = parseFloat(t.height) || 0;
  const i = Hn(e),
    l = i ? e.offsetWidth : n,
    c = i ? e.offsetHeight : s,
    u = Fc(n) !== l || Fc(s) !== c;
  return (u && ((n = l), (s = c)), { width: n, height: s, $: u });
}
function sm(e) {
  return Tn(e) ? e : e.contextElement;
}
function To(e) {
  const t = sm(e);
  if (!Hn(t)) return $n(1);
  const n = t.getBoundingClientRect(),
    { width: s, height: i, $: l } = rE(t);
  let c = (l ? Fc(n.width) : n.width) / s,
    u = (l ? Fc(n.height) : n.height) / i;
  return (
    (!c || !Number.isFinite(c)) && (c = 1),
    (!u || !Number.isFinite(u)) && (u = 1),
    { x: c, y: u }
  );
}
const fF = $n(0);
function sE(e) {
  const t = Jt(e);
  return !rm() || !t.visualViewport
    ? fF
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function hF(e, t, n) {
  return (t === void 0 && (t = !1), !n || (t && n !== Jt(e)) ? !1 : t);
}
function Fs(e, t, n, s) {
  (t === void 0 && (t = !1), n === void 0 && (n = !1));
  const i = e.getBoundingClientRect(),
    l = sm(e);
  let c = $n(1);
  t && (s ? Tn(s) && (c = To(s)) : (c = To(e)));
  const u = hF(l, n, s) ? sE(l) : $n(0);
  let f = (i.left + u.x) / c.x,
    h = (i.top + u.y) / c.y,
    m = i.width / c.x,
    y = i.height / c.y;
  if (l) {
    const w = Jt(l),
      C = s && Tn(s) ? Jt(s) : s;
    let E = w,
      v = Uh(E);
    for (; v && s && C !== E; ) {
      const x = To(v),
        T = v.getBoundingClientRect(),
        P = Pn(v),
        R = T.left + (v.clientLeft + parseFloat(P.paddingLeft)) * x.x,
        _ = T.top + (v.clientTop + parseFloat(P.paddingTop)) * x.y;
      ((f *= x.x),
        (h *= x.y),
        (m *= x.x),
        (y *= x.y),
        (f += R),
        (h += _),
        (E = Jt(v)),
        (v = Uh(E)));
    }
  }
  return Bc({ width: m, height: y, x: f, y: h });
}
function du(e, t) {
  const n = uu(e).scrollLeft;
  return t ? t.left + n : Fs(qn(e)).left + n;
}
function oE(e, t) {
  const n = e.getBoundingClientRect(),
    s = n.left + t.scrollLeft - du(e, n),
    i = n.top + t.scrollTop;
  return { x: s, y: i };
}
function pF(e) {
  let { elements: t, rect: n, offsetParent: s, strategy: i } = e;
  const l = i === "fixed",
    c = qn(s),
    u = t ? cu(t.floating) : !1;
  if (s === c || (u && l)) return n;
  let f = { scrollLeft: 0, scrollTop: 0 },
    h = $n(1);
  const m = $n(0),
    y = Hn(s);
  if (
    (y || (!y && !l)) &&
    ((Xo(s) !== "body" || Oa(c)) && (f = uu(s)), Hn(s))
  ) {
    const C = Fs(s);
    ((h = To(s)), (m.x = C.x + s.clientLeft), (m.y = C.y + s.clientTop));
  }
  const w = c && !y && !l ? oE(c, f) : $n(0);
  return {
    width: n.width * h.x,
    height: n.height * h.y,
    x: n.x * h.x - f.scrollLeft * h.x + m.x + w.x,
    y: n.y * h.y - f.scrollTop * h.y + m.y + w.y,
  };
}
function mF(e) {
  return Array.from(e.getClientRects());
}
function gF(e) {
  const t = qn(e),
    n = uu(e),
    s = e.ownerDocument.body,
    i = Yt(t.scrollWidth, t.clientWidth, s.scrollWidth, s.clientWidth),
    l = Yt(t.scrollHeight, t.clientHeight, s.scrollHeight, s.clientHeight);
  let c = -n.scrollLeft + du(e);
  const u = -n.scrollTop;
  return (
    Pn(s).direction === "rtl" && (c += Yt(t.clientWidth, s.clientWidth) - i),
    { width: i, height: l, x: c, y: u }
  );
}
const Qw = 25;
function yF(e, t) {
  const n = Jt(e),
    s = qn(e),
    i = n.visualViewport;
  let l = s.clientWidth,
    c = s.clientHeight,
    u = 0,
    f = 0;
  if (i) {
    ((l = i.width), (c = i.height));
    const m = rm();
    (!m || (m && t === "fixed")) && ((u = i.offsetLeft), (f = i.offsetTop));
  }
  const h = du(s);
  if (h <= 0) {
    const m = s.ownerDocument,
      y = m.body,
      w = getComputedStyle(y),
      C =
        (m.compatMode === "CSS1Compat" &&
          parseFloat(w.marginLeft) + parseFloat(w.marginRight)) ||
        0,
      E = Math.abs(s.clientWidth - y.clientWidth - C);
    E <= Qw && (l -= E);
  } else h <= Qw && (l += h);
  return { width: l, height: c, x: u, y: f };
}
const vF = new Set(["absolute", "fixed"]);
function wF(e, t) {
  const n = Fs(e, !0, t === "fixed"),
    s = n.top + e.clientTop,
    i = n.left + e.clientLeft,
    l = Hn(e) ? To(e) : $n(1),
    c = e.clientWidth * l.x,
    u = e.clientHeight * l.y,
    f = i * l.x,
    h = s * l.y;
  return { width: c, height: u, x: f, y: h };
}
function Gw(e, t, n) {
  let s;
  if (t === "viewport") s = yF(e, n);
  else if (t === "document") s = gF(qn(e));
  else if (Tn(t)) s = wF(t, n);
  else {
    const i = sE(e);
    s = { x: t.x - i.x, y: t.y - i.y, width: t.width, height: t.height };
  }
  return Bc(s);
}
function iE(e, t) {
  const n = Zr(e);
  return n === t || !Tn(n) || Ho(n)
    ? !1
    : Pn(n).position === "fixed" || iE(n, t);
}
function xF(e, t) {
  const n = t.get(e);
  if (n) return n;
  let s = fa(e, [], !1).filter((u) => Tn(u) && Xo(u) !== "body"),
    i = null;
  const l = Pn(e).position === "fixed";
  let c = l ? Zr(e) : e;
  for (; Tn(c) && !Ho(c); ) {
    const u = Pn(c),
      f = nm(c);
    (!f && u.position === "fixed" && (i = null),
      (
        l
          ? !f && !i
          : (!f && u.position === "static" && !!i && vF.has(i.position)) ||
            (Oa(c) && !f && iE(e, c))
      )
        ? (s = s.filter((m) => m !== c))
        : (i = u),
      (c = Zr(c)));
  }
  return (t.set(e, s), s);
}
function SF(e) {
  let { element: t, boundary: n, rootBoundary: s, strategy: i } = e;
  const c = [
      ...(n === "clippingAncestors"
        ? cu(t)
          ? []
          : xF(t, this._c)
        : [].concat(n)),
      s,
    ],
    u = c[0],
    f = c.reduce(
      (h, m) => {
        const y = Gw(t, m, i);
        return (
          (h.top = Yt(y.top, h.top)),
          (h.right = Jr(y.right, h.right)),
          (h.bottom = Jr(y.bottom, h.bottom)),
          (h.left = Yt(y.left, h.left)),
          h
        );
      },
      Gw(t, u, i),
    );
  return {
    width: f.right - f.left,
    height: f.bottom - f.top,
    x: f.left,
    y: f.top,
  };
}
function bF(e) {
  const { width: t, height: n } = rE(e);
  return { width: t, height: n };
}
function EF(e, t, n) {
  const s = Hn(t),
    i = qn(t),
    l = n === "fixed",
    c = Fs(e, !0, l, t);
  let u = { scrollLeft: 0, scrollTop: 0 };
  const f = $n(0);
  function h() {
    f.x = du(i);
  }
  if (s || (!s && !l))
    if (((Xo(t) !== "body" || Oa(i)) && (u = uu(t)), s)) {
      const C = Fs(t, !0, l, t);
      ((f.x = C.x + t.clientLeft), (f.y = C.y + t.clientTop));
    } else i && h();
  l && !s && i && h();
  const m = i && !s && !l ? oE(i, u) : $n(0),
    y = c.left + u.scrollLeft - f.x - m.x,
    w = c.top + u.scrollTop - f.y - m.y;
  return { x: y, y: w, width: c.width, height: c.height };
}
function Uf(e) {
  return Pn(e).position === "static";
}
function Yw(e, t) {
  if (!Hn(e) || Pn(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return (qn(e) === n && (n = n.ownerDocument.body), n);
}
function aE(e, t) {
  const n = Jt(e);
  if (cu(e)) return n;
  if (!Hn(e)) {
    let i = Zr(e);
    for (; i && !Ho(i); ) {
      if (Tn(i) && !Uf(i)) return i;
      i = Zr(i);
    }
    return n;
  }
  let s = Yw(e, t);
  for (; s && oF(s) && Uf(s); ) s = Yw(s, t);
  return s && Ho(s) && Uf(s) && !nm(s) ? n : s || uF(e) || n;
}
const CF = async function (e) {
  const t = this.getOffsetParent || aE,
    n = this.getDimensions,
    s = await n(e.floating);
  return {
    reference: EF(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: s.width, height: s.height },
  };
};
function kF(e) {
  return Pn(e).direction === "rtl";
}
const TF = {
  convertOffsetParentRelativeRectToViewportRelativeRect: pF,
  getDocumentElement: qn,
  getClippingRect: SF,
  getOffsetParent: aE,
  getElementRects: CF,
  getClientRects: mF,
  getDimensions: bF,
  getScale: To,
  isElement: Tn,
  isRTL: kF,
};
function lE(e, t) {
  return (
    e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
  );
}
function PF(e, t) {
  let n = null,
    s;
  const i = qn(e);
  function l() {
    var u;
    (clearTimeout(s), (u = n) == null || u.disconnect(), (n = null));
  }
  function c(u, f) {
    (u === void 0 && (u = !1), f === void 0 && (f = 1), l());
    const h = e.getBoundingClientRect(),
      { left: m, top: y, width: w, height: C } = h;
    if ((u || t(), !w || !C)) return;
    const E = ec(y),
      v = ec(i.clientWidth - (m + w)),
      x = ec(i.clientHeight - (y + C)),
      T = ec(m),
      R = {
        rootMargin: -E + "px " + -v + "px " + -x + "px " + -T + "px",
        threshold: Yt(0, Jr(1, f)) || 1,
      };
    let _ = !0;
    function M(V) {
      const U = V[0].intersectionRatio;
      if (U !== f) {
        if (!_) return c();
        U
          ? c(!1, U)
          : (s = setTimeout(() => {
              c(!1, 1e-7);
            }, 1e3));
      }
      (U === 1 && !lE(h, e.getBoundingClientRect()) && c(), (_ = !1));
    }
    try {
      n = new IntersectionObserver(M, { ...R, root: i.ownerDocument });
    } catch {
      n = new IntersectionObserver(M, R);
    }
    n.observe(e);
  }
  return (c(!0), l);
}
function RF(e, t, n, s) {
  s === void 0 && (s = {});
  const {
      ancestorScroll: i = !0,
      ancestorResize: l = !0,
      elementResize: c = typeof ResizeObserver == "function",
      layoutShift: u = typeof IntersectionObserver == "function",
      animationFrame: f = !1,
    } = s,
    h = sm(e),
    m = i || l ? [...(h ? fa(h) : []), ...fa(t)] : [];
  m.forEach((T) => {
    (i && T.addEventListener("scroll", n, { passive: !0 }),
      l && T.addEventListener("resize", n));
  });
  const y = h && u ? PF(h, n) : null;
  let w = -1,
    C = null;
  c &&
    ((C = new ResizeObserver((T) => {
      let [P] = T;
      (P &&
        P.target === h &&
        C &&
        (C.unobserve(t),
        cancelAnimationFrame(w),
        (w = requestAnimationFrame(() => {
          var R;
          (R = C) == null || R.observe(t);
        }))),
        n());
    })),
    h && !f && C.observe(h),
    C.observe(t));
  let E,
    v = f ? Fs(e) : null;
  f && x();
  function x() {
    const T = Fs(e);
    (v && !lE(v, T) && n(), (v = T), (E = requestAnimationFrame(x)));
  }
  return (
    n(),
    () => {
      var T;
      (m.forEach((P) => {
        (i && P.removeEventListener("scroll", n),
          l && P.removeEventListener("resize", n));
      }),
        y == null || y(),
        (T = C) == null || T.disconnect(),
        (C = null),
        f && cancelAnimationFrame(E));
    }
  );
}
const AF = ZI,
  _F = eF,
  NF = YI,
  OF = nF,
  jF = XI,
  Xw = GI,
  LF = tF,
  MF = (e, t, n) => {
    const s = new Map(),
      i = { platform: TF, ...n },
      l = { ...i.platform, _c: s };
    return QI(e, t, { ...i, platform: l });
  };
var DF = typeof document < "u",
  IF = function () {},
  wc = DF ? b.useLayoutEffect : IF;
function Uc(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == "function" && e.toString() === t.toString()) return !0;
  let n, s, i;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (s = n; s-- !== 0; ) if (!Uc(e[s], t[s])) return !1;
      return !0;
    }
    if (((i = Object.keys(e)), (n = i.length), n !== Object.keys(t).length))
      return !1;
    for (s = n; s-- !== 0; ) if (!{}.hasOwnProperty.call(t, i[s])) return !1;
    for (s = n; s-- !== 0; ) {
      const l = i[s];
      if (!(l === "_owner" && e.$$typeof) && !Uc(e[l], t[l])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function cE(e) {
  return typeof window > "u"
    ? 1
    : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Jw(e, t) {
  const n = cE(e);
  return Math.round(t * n) / n;
}
function zf(e) {
  const t = b.useRef(e);
  return (
    wc(() => {
      t.current = e;
    }),
    t
  );
}
function FF(e) {
  e === void 0 && (e = {});
  const {
      placement: t = "bottom",
      strategy: n = "absolute",
      middleware: s = [],
      platform: i,
      elements: { reference: l, floating: c } = {},
      transform: u = !0,
      whileElementsMounted: f,
      open: h,
    } = e,
    [m, y] = b.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [w, C] = b.useState(s);
  Uc(w, s) || C(s);
  const [E, v] = b.useState(null),
    [x, T] = b.useState(null),
    P = b.useCallback(($) => {
      $ !== V.current && ((V.current = $), v($));
    }, []),
    R = b.useCallback(($) => {
      $ !== U.current && ((U.current = $), T($));
    }, []),
    _ = l || E,
    M = c || x,
    V = b.useRef(null),
    U = b.useRef(null),
    D = b.useRef(m),
    Q = f != null,
    J = zf(f),
    ee = zf(i),
    de = zf(h),
    ge = b.useCallback(() => {
      if (!V.current || !U.current) return;
      const $ = { placement: t, strategy: n, middleware: w };
      (ee.current && ($.platform = ee.current),
        MF(V.current, U.current, $).then((X) => {
          const W = { ...X, isPositioned: de.current !== !1 };
          le.current &&
            !Uc(D.current, W) &&
            ((D.current = W),
            wa.flushSync(() => {
              y(W);
            }));
        }));
    }, [w, t, n, ee, de]);
  wc(() => {
    h === !1 &&
      D.current.isPositioned &&
      ((D.current.isPositioned = !1), y(($) => ({ ...$, isPositioned: !1 })));
  }, [h]);
  const le = b.useRef(!1);
  (wc(
    () => (
      (le.current = !0),
      () => {
        le.current = !1;
      }
    ),
    [],
  ),
    wc(() => {
      if ((_ && (V.current = _), M && (U.current = M), _ && M)) {
        if (J.current) return J.current(_, M, ge);
        ge();
      }
    }, [_, M, ge, J, Q]));
  const Ee = b.useMemo(
      () => ({ reference: V, floating: U, setReference: P, setFloating: R }),
      [P, R],
    ),
    te = b.useMemo(() => ({ reference: _, floating: M }), [_, M]),
    Z = b.useMemo(() => {
      const $ = { position: n, left: 0, top: 0 };
      if (!te.floating) return $;
      const X = Jw(te.floating, m.x),
        W = Jw(te.floating, m.y);
      return u
        ? {
            ...$,
            transform: "translate(" + X + "px, " + W + "px)",
            ...(cE(te.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: n, left: X, top: W };
    }, [n, u, te.floating, m.x, m.y]);
  return b.useMemo(
    () => ({ ...m, update: ge, refs: Ee, elements: te, floatingStyles: Z }),
    [m, ge, Ee, te, Z],
  );
}
const VF = (e) => {
    function t(n) {
      return {}.hasOwnProperty.call(n, "current");
    }
    return {
      name: "arrow",
      options: e,
      fn(n) {
        const { element: s, padding: i } = typeof e == "function" ? e(n) : e;
        return s && t(s)
          ? s.current != null
            ? Xw({ element: s.current, padding: i }).fn(n)
            : {}
          : s
            ? Xw({ element: s, padding: i }).fn(n)
            : {};
      },
    };
  },
  BF = (e, t) => ({ ...AF(e), options: [e, t] }),
  UF = (e, t) => ({ ..._F(e), options: [e, t] }),
  zF = (e, t) => ({ ...LF(e), options: [e, t] }),
  $F = (e, t) => ({ ...NF(e), options: [e, t] }),
  WF = (e, t) => ({ ...OF(e), options: [e, t] }),
  HF = (e, t) => ({ ...jF(e), options: [e, t] }),
  qF = (e, t) => ({ ...VF(e), options: [e, t] });
var KF = "Arrow",
  uE = b.forwardRef((e, t) => {
    const { children: n, width: s = 10, height: i = 5, ...l } = e;
    return S.jsx(Ue.svg, {
      ...l,
      ref: t,
      width: s,
      height: i,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : S.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
uE.displayName = KF;
var QF = uE;
function GF(e) {
  const [t, n] = b.useState(void 0);
  return (
    Et(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        const s = new ResizeObserver((i) => {
          if (!Array.isArray(i) || !i.length) return;
          const l = i[0];
          let c, u;
          if ("borderBoxSize" in l) {
            const f = l.borderBoxSize,
              h = Array.isArray(f) ? f[0] : f;
            ((c = h.inlineSize), (u = h.blockSize));
          } else ((c = e.offsetWidth), (u = e.offsetHeight));
          n({ width: c, height: u });
        });
        return (s.observe(e, { box: "border-box" }), () => s.unobserve(e));
      } else n(void 0);
    }, [e]),
    t
  );
}
var om = "Popper",
  [dE, fE] = _a(om),
  [YF, hE] = dE(om),
  pE = (e) => {
    const { __scopePopper: t, children: n } = e,
      [s, i] = b.useState(null);
    return S.jsx(YF, { scope: t, anchor: s, onAnchorChange: i, children: n });
  };
pE.displayName = om;
var mE = "PopperAnchor",
  gE = b.forwardRef((e, t) => {
    const { __scopePopper: n, virtualRef: s, ...i } = e,
      l = hE(mE, n),
      c = b.useRef(null),
      u = at(t, c),
      f = b.useRef(null);
    return (
      b.useEffect(() => {
        const h = f.current;
        ((f.current = (s == null ? void 0 : s.current) || c.current),
          h !== f.current && l.onAnchorChange(f.current));
      }),
      s ? null : S.jsx(Ue.div, { ...i, ref: u })
    );
  });
gE.displayName = mE;
var im = "PopperContent",
  [XF, JF] = dE(im),
  yE = b.forwardRef((e, t) => {
    var ne, me, fe, Pe, Ae, Ne;
    const {
        __scopePopper: n,
        side: s = "bottom",
        sideOffset: i = 0,
        align: l = "center",
        alignOffset: c = 0,
        arrowPadding: u = 0,
        avoidCollisions: f = !0,
        collisionBoundary: h = [],
        collisionPadding: m = 0,
        sticky: y = "partial",
        hideWhenDetached: w = !1,
        updatePositionStrategy: C = "optimized",
        onPlaced: E,
        ...v
      } = e,
      x = hE(im, n),
      [T, P] = b.useState(null),
      R = at(t, (Ge) => P(Ge)),
      [_, M] = b.useState(null),
      V = GF(_),
      U = (V == null ? void 0 : V.width) ?? 0,
      D = (V == null ? void 0 : V.height) ?? 0,
      Q = s + (l !== "center" ? "-" + l : ""),
      J =
        typeof m == "number"
          ? m
          : { top: 0, right: 0, bottom: 0, left: 0, ...m },
      ee = Array.isArray(h) ? h : [h],
      de = ee.length > 0,
      ge = { padding: J, boundary: ee.filter(eV), altBoundary: de },
      {
        refs: le,
        floatingStyles: Ee,
        placement: te,
        isPositioned: Z,
        middlewareData: $,
      } = FF({
        strategy: "fixed",
        placement: Q,
        whileElementsMounted: (...Ge) =>
          RF(...Ge, { animationFrame: C === "always" }),
        elements: { reference: x.anchor },
        middleware: [
          BF({ mainAxis: i + D, alignmentAxis: c }),
          f &&
            UF({
              mainAxis: !0,
              crossAxis: !1,
              limiter: y === "partial" ? zF() : void 0,
              ...ge,
            }),
          f && $F({ ...ge }),
          WF({
            ...ge,
            apply: ({
              elements: Ge,
              rects: lt,
              availableWidth: fr,
              availableHeight: hr,
            }) => {
              const { width: Kn, height: ja } = lt.reference,
                pr = Ge.floating.style;
              (pr.setProperty("--radix-popper-available-width", `${fr}px`),
                pr.setProperty("--radix-popper-available-height", `${hr}px`),
                pr.setProperty("--radix-popper-anchor-width", `${Kn}px`),
                pr.setProperty("--radix-popper-anchor-height", `${ja}px`));
            },
          }),
          _ && qF({ element: _, padding: u }),
          tV({ arrowWidth: U, arrowHeight: D }),
          w && HF({ strategy: "referenceHidden", ...ge }),
        ],
      }),
      [X, W] = xE(te),
      L = Is(E);
    Et(() => {
      Z && (L == null || L());
    }, [Z, L]);
    const H = (ne = $.arrow) == null ? void 0 : ne.x,
      we = (me = $.arrow) == null ? void 0 : me.y,
      ve = ((fe = $.arrow) == null ? void 0 : fe.centerOffset) !== 0,
      [pe, ye] = b.useState();
    return (
      Et(() => {
        T && ye(window.getComputedStyle(T).zIndex);
      }, [T]),
      S.jsx("div", {
        ref: le.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...Ee,
          transform: Z ? Ee.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: pe,
          "--radix-popper-transform-origin": [
            (Pe = $.transformOrigin) == null ? void 0 : Pe.x,
            (Ae = $.transformOrigin) == null ? void 0 : Ae.y,
          ].join(" "),
          ...(((Ne = $.hide) == null ? void 0 : Ne.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none",
          }),
        },
        dir: e.dir,
        children: S.jsx(XF, {
          scope: n,
          placedSide: X,
          onArrowChange: M,
          arrowX: H,
          arrowY: we,
          shouldHideArrow: ve,
          children: S.jsx(Ue.div, {
            "data-side": X,
            "data-align": W,
            ...v,
            ref: R,
            style: { ...v.style, animation: Z ? void 0 : "none" },
          }),
        }),
      })
    );
  });
yE.displayName = im;
var vE = "PopperArrow",
  ZF = { top: "bottom", right: "left", bottom: "top", left: "right" },
  wE = b.forwardRef(function (t, n) {
    const { __scopePopper: s, ...i } = t,
      l = JF(vE, s),
      c = ZF[l.placedSide];
    return S.jsx("span", {
      ref: l.onArrowChange,
      style: {
        position: "absolute",
        left: l.arrowX,
        top: l.arrowY,
        [c]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[l.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[l.placedSide],
        visibility: l.shouldHideArrow ? "hidden" : void 0,
      },
      children: S.jsx(QF, {
        ...i,
        ref: n,
        style: { ...i.style, display: "block" },
      }),
    });
  });
wE.displayName = vE;
function eV(e) {
  return e !== null;
}
var tV = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var x, T, P;
    const { placement: n, rects: s, middlewareData: i } = t,
      c = ((x = i.arrow) == null ? void 0 : x.centerOffset) !== 0,
      u = c ? 0 : e.arrowWidth,
      f = c ? 0 : e.arrowHeight,
      [h, m] = xE(n),
      y = { start: "0%", center: "50%", end: "100%" }[m],
      w = (((T = i.arrow) == null ? void 0 : T.x) ?? 0) + u / 2,
      C = (((P = i.arrow) == null ? void 0 : P.y) ?? 0) + f / 2;
    let E = "",
      v = "";
    return (
      h === "bottom"
        ? ((E = c ? y : `${w}px`), (v = `${-f}px`))
        : h === "top"
          ? ((E = c ? y : `${w}px`), (v = `${s.floating.height + f}px`))
          : h === "right"
            ? ((E = `${-f}px`), (v = c ? y : `${C}px`))
            : h === "left" &&
              ((E = `${s.floating.width + f}px`), (v = c ? y : `${C}px`)),
      { data: { x: E, y: v } }
    );
  },
});
function xE(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var nV = pE,
  rV = gE,
  sV = yE,
  oV = wE,
  iV = "Portal",
  SE = b.forwardRef((e, t) => {
    var u;
    const { container: n, ...s } = e,
      [i, l] = b.useState(!1);
    Et(() => l(!0), []);
    const c =
      n ||
      (i &&
        ((u = globalThis == null ? void 0 : globalThis.document) == null
          ? void 0
          : u.body));
    return c ? BR.createPortal(S.jsx(Ue.div, { ...s, ref: t }), c) : null;
  });
SE.displayName = iV;
function aV(e) {
  const t = lV(e),
    n = b.forwardRef((s, i) => {
      const { children: l, ...c } = s,
        u = b.Children.toArray(l),
        f = u.find(uV);
      if (f) {
        const h = f.props.children,
          m = u.map((y) =>
            y === f
              ? b.Children.count(h) > 1
                ? b.Children.only(null)
                : b.isValidElement(h)
                  ? h.props.children
                  : null
              : y,
          );
        return S.jsx(t, {
          ...c,
          ref: i,
          children: b.isValidElement(h) ? b.cloneElement(h, void 0, m) : null,
        });
      }
      return S.jsx(t, { ...c, ref: i, children: l });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
function lV(e) {
  const t = b.forwardRef((n, s) => {
    const { children: i, ...l } = n;
    if (b.isValidElement(i)) {
      const c = fV(i),
        u = dV(l, i.props);
      return (
        i.type !== b.Fragment && (u.ref = s ? ka(s, c) : c),
        b.cloneElement(i, u)
      );
    }
    return b.Children.count(i) > 1 ? b.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var cV = Symbol("radix.slottable");
function uV(e) {
  return (
    b.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === cV
  );
}
function dV(e, t) {
  const n = { ...t };
  for (const s in t) {
    const i = e[s],
      l = t[s];
    /^on[A-Z]/.test(s)
      ? i && l
        ? (n[s] = (...u) => {
            const f = l(...u);
            return (i(...u), f);
          })
        : i && (n[s] = i)
      : s === "style"
        ? (n[s] = { ...i, ...l })
        : s === "className" && (n[s] = [i, l].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function fV(e) {
  var s, i;
  let t =
      (s = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
        ? void 0
        : s.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t =
        (i = Object.getOwnPropertyDescriptor(e, "ref")) == null
          ? void 0
          : i.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function hV(e) {
  const t = b.useRef({ value: e, previous: e });
  return b.useMemo(
    () => (
      t.current.value !== e &&
        ((t.current.previous = t.current.value), (t.current.value = e)),
      t.current.previous
    ),
    [e],
  );
}
var bE = Object.freeze({
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
  }),
  pV = "VisuallyHidden",
  mV = b.forwardRef((e, t) =>
    S.jsx(Ue.span, { ...e, ref: t, style: { ...bE, ...e.style } }),
  );
mV.displayName = pV;
var gV = function (e) {
    if (typeof document > "u") return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  },
  go = new WeakMap(),
  tc = new WeakMap(),
  nc = {},
  $f = 0,
  EE = function (e) {
    return e && (e.host || EE(e.parentNode));
  },
  yV = function (e, t) {
    return t
      .map(function (n) {
        if (e.contains(n)) return n;
        var s = EE(n);
        return s && e.contains(s)
          ? s
          : (console.error(
              "aria-hidden",
              n,
              "in not contained inside",
              e,
              ". Doing nothing",
            ),
            null);
      })
      .filter(function (n) {
        return !!n;
      });
  },
  vV = function (e, t, n, s) {
    var i = yV(t, Array.isArray(e) ? e : [e]);
    nc[n] || (nc[n] = new WeakMap());
    var l = nc[n],
      c = [],
      u = new Set(),
      f = new Set(i),
      h = function (y) {
        !y || u.has(y) || (u.add(y), h(y.parentNode));
      };
    i.forEach(h);
    var m = function (y) {
      !y ||
        f.has(y) ||
        Array.prototype.forEach.call(y.children, function (w) {
          if (u.has(w)) m(w);
          else
            try {
              var C = w.getAttribute(s),
                E = C !== null && C !== "false",
                v = (go.get(w) || 0) + 1,
                x = (l.get(w) || 0) + 1;
              (go.set(w, v),
                l.set(w, x),
                c.push(w),
                v === 1 && E && tc.set(w, !0),
                x === 1 && w.setAttribute(n, "true"),
                E || w.setAttribute(s, "true"));
            } catch (T) {
              console.error("aria-hidden: cannot operate on ", w, T);
            }
        });
    };
    return (
      m(t),
      u.clear(),
      $f++,
      function () {
        (c.forEach(function (y) {
          var w = go.get(y) - 1,
            C = l.get(y) - 1;
          (go.set(y, w),
            l.set(y, C),
            w || (tc.has(y) || y.removeAttribute(s), tc.delete(y)),
            C || y.removeAttribute(n));
        }),
          $f--,
          $f ||
            ((go = new WeakMap()),
            (go = new WeakMap()),
            (tc = new WeakMap()),
            (nc = {})));
      }
    );
  },
  wV = function (e, t, n) {
    n === void 0 && (n = "data-aria-hidden");
    var s = Array.from(Array.isArray(e) ? e : [e]),
      i = gV(e);
    return i
      ? (s.push.apply(s, Array.from(i.querySelectorAll("[aria-live], script"))),
        vV(s, i, n, "aria-hidden"))
      : function () {
          return null;
        };
  },
  Fn = function () {
    return (
      (Fn =
        Object.assign ||
        function (t) {
          for (var n, s = 1, i = arguments.length; s < i; s++) {
            n = arguments[s];
            for (var l in n)
              Object.prototype.hasOwnProperty.call(n, l) && (t[l] = n[l]);
          }
          return t;
        }),
      Fn.apply(this, arguments)
    );
  };
function CE(e, t) {
  var n = {};
  for (var s in e)
    Object.prototype.hasOwnProperty.call(e, s) &&
      t.indexOf(s) < 0 &&
      (n[s] = e[s]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, s = Object.getOwnPropertySymbols(e); i < s.length; i++)
      t.indexOf(s[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, s[i]) &&
        (n[s[i]] = e[s[i]]);
  return n;
}
function xV(e, t, n) {
  if (n || arguments.length === 2)
    for (var s = 0, i = t.length, l; s < i; s++)
      (l || !(s in t)) &&
        (l || (l = Array.prototype.slice.call(t, 0, s)), (l[s] = t[s]));
  return e.concat(l || Array.prototype.slice.call(t));
}
var xc = "right-scroll-bar-position",
  Sc = "width-before-scroll-bar",
  SV = "with-scroll-bars-hidden",
  bV = "--removed-body-scroll-bar-size";
function Wf(e, t) {
  return (typeof e == "function" ? e(t) : e && (e.current = t), e);
}
function EV(e, t) {
  var n = b.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(s) {
          var i = n.value;
          i !== s && ((n.value = s), n.callback(s, i));
        },
      },
    };
  })[0];
  return ((n.callback = t), n.facade);
}
var CV = typeof window < "u" ? b.useLayoutEffect : b.useEffect,
  Zw = new WeakMap();
function kV(e, t) {
  var n = EV(null, function (s) {
    return e.forEach(function (i) {
      return Wf(i, s);
    });
  });
  return (
    CV(
      function () {
        var s = Zw.get(n);
        if (s) {
          var i = new Set(s),
            l = new Set(e),
            c = n.current;
          (i.forEach(function (u) {
            l.has(u) || Wf(u, null);
          }),
            l.forEach(function (u) {
              i.has(u) || Wf(u, c);
            }));
        }
        Zw.set(n, e);
      },
      [e],
    ),
    n
  );
}
function TV(e) {
  return e;
}
function PV(e, t) {
  t === void 0 && (t = TV);
  var n = [],
    s = !1,
    i = {
      read: function () {
        if (s)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
          );
        return n.length ? n[n.length - 1] : e;
      },
      useMedium: function (l) {
        var c = t(l, s);
        return (
          n.push(c),
          function () {
            n = n.filter(function (u) {
              return u !== c;
            });
          }
        );
      },
      assignSyncMedium: function (l) {
        for (s = !0; n.length; ) {
          var c = n;
          ((n = []), c.forEach(l));
        }
        n = {
          push: function (u) {
            return l(u);
          },
          filter: function () {
            return n;
          },
        };
      },
      assignMedium: function (l) {
        s = !0;
        var c = [];
        if (n.length) {
          var u = n;
          ((n = []), u.forEach(l), (c = n));
        }
        var f = function () {
            var m = c;
            ((c = []), m.forEach(l));
          },
          h = function () {
            return Promise.resolve().then(f);
          };
        (h(),
          (n = {
            push: function (m) {
              (c.push(m), h());
            },
            filter: function (m) {
              return ((c = c.filter(m)), n);
            },
          }));
      },
    };
  return i;
}
function RV(e) {
  e === void 0 && (e = {});
  var t = PV(null);
  return ((t.options = Fn({ async: !0, ssr: !1 }, e)), t);
}
var kE = function (e) {
  var t = e.sideCar,
    n = CE(e, ["sideCar"]);
  if (!t)
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car",
    );
  var s = t.read();
  if (!s) throw new Error("Sidecar medium not found");
  return b.createElement(s, Fn({}, n));
};
kE.isSideCarExport = !0;
function AV(e, t) {
  return (e.useMedium(t), kE);
}
var TE = RV(),
  Hf = function () {},
  fu = b.forwardRef(function (e, t) {
    var n = b.useRef(null),
      s = b.useState({
        onScrollCapture: Hf,
        onWheelCapture: Hf,
        onTouchMoveCapture: Hf,
      }),
      i = s[0],
      l = s[1],
      c = e.forwardProps,
      u = e.children,
      f = e.className,
      h = e.removeScrollBar,
      m = e.enabled,
      y = e.shards,
      w = e.sideCar,
      C = e.noRelative,
      E = e.noIsolation,
      v = e.inert,
      x = e.allowPinchZoom,
      T = e.as,
      P = T === void 0 ? "div" : T,
      R = e.gapMode,
      _ = CE(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noRelative",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      M = w,
      V = kV([n, t]),
      U = Fn(Fn({}, _), i);
    return b.createElement(
      b.Fragment,
      null,
      m &&
        b.createElement(M, {
          sideCar: TE,
          removeScrollBar: h,
          shards: y,
          noRelative: C,
          noIsolation: E,
          inert: v,
          setCallbacks: l,
          allowPinchZoom: !!x,
          lockRef: n,
          gapMode: R,
        }),
      c
        ? b.cloneElement(b.Children.only(u), Fn(Fn({}, U), { ref: V }))
        : b.createElement(P, Fn({}, U, { className: f, ref: V }), u),
    );
  });
fu.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
fu.classNames = { fullWidth: Sc, zeroRight: xc };
var _V = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function NV() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = _V();
  return (t && e.setAttribute("nonce", t), e);
}
function OV(e, t) {
  e.styleSheet
    ? (e.styleSheet.cssText = t)
    : e.appendChild(document.createTextNode(t));
}
function jV(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var LV = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        (e == 0 && (t = NV()) && (OV(t, n), jV(t)), e++);
      },
      remove: function () {
        (e--,
          !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  MV = function () {
    var e = LV();
    return function (t, n) {
      b.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n],
      );
    };
  },
  PE = function () {
    var e = MV(),
      t = function (n) {
        var s = n.styles,
          i = n.dynamic;
        return (e(s, i), null);
      };
    return t;
  },
  DV = { left: 0, top: 0, right: 0, gap: 0 },
  qf = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  IV = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === "padding" ? "paddingLeft" : "marginLeft"],
      s = t[e === "padding" ? "paddingTop" : "marginTop"],
      i = t[e === "padding" ? "paddingRight" : "marginRight"];
    return [qf(n), qf(s), qf(i)];
  },
  FV = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return DV;
    var t = IV(e),
      n = document.documentElement.clientWidth,
      s = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, s - n + t[2] - t[0]),
    };
  },
  VV = PE(),
  Po = "data-scroll-locked",
  BV = function (e, t, n, s) {
    var i = e.left,
      l = e.top,
      c = e.right,
      u = e.gap;
    return (
      n === void 0 && (n = "margin"),
      `
  .`
        .concat(
          SV,
          ` {
   overflow: hidden `,
        )
        .concat(
          s,
          `;
   padding-right: `,
        )
        .concat(u, "px ")
        .concat(
          s,
          `;
  }
  body[`,
        )
        .concat(
          Po,
          `] {
    overflow: hidden `,
        )
        .concat(
          s,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            t && "position: relative ".concat(s, ";"),
            n === "margin" &&
              `
    padding-left: `
                .concat(
                  i,
                  `px;
    padding-top: `,
                )
                .concat(
                  l,
                  `px;
    padding-right: `,
                )
                .concat(
                  c,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(u, "px ")
                .concat(
                  s,
                  `;
    `,
                ),
            n === "padding" &&
              "padding-right: ".concat(u, "px ").concat(s, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`,
        )
        .concat(
          xc,
          ` {
    right: `,
        )
        .concat(u, "px ")
        .concat(
          s,
          `;
  }
  
  .`,
        )
        .concat(
          Sc,
          ` {
    margin-right: `,
        )
        .concat(u, "px ")
        .concat(
          s,
          `;
  }
  
  .`,
        )
        .concat(xc, " .")
        .concat(
          xc,
          ` {
    right: 0 `,
        )
        .concat(
          s,
          `;
  }
  
  .`,
        )
        .concat(Sc, " .")
        .concat(
          Sc,
          ` {
    margin-right: 0 `,
        )
        .concat(
          s,
          `;
  }
  
  body[`,
        )
        .concat(
          Po,
          `] {
    `,
        )
        .concat(bV, ": ")
        .concat(
          u,
          `px;
  }
`,
        )
    );
  },
  ex = function () {
    var e = parseInt(document.body.getAttribute(Po) || "0", 10);
    return isFinite(e) ? e : 0;
  },
  UV = function () {
    b.useEffect(function () {
      return (
        document.body.setAttribute(Po, (ex() + 1).toString()),
        function () {
          var e = ex() - 1;
          e <= 0
            ? document.body.removeAttribute(Po)
            : document.body.setAttribute(Po, e.toString());
        }
      );
    }, []);
  },
  zV = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      s = e.gapMode,
      i = s === void 0 ? "margin" : s;
    UV();
    var l = b.useMemo(
      function () {
        return FV(i);
      },
      [i],
    );
    return b.createElement(VV, { styles: BV(l, !t, i, n ? "" : "!important") });
  },
  zh = !1;
if (typeof window < "u")
  try {
    var rc = Object.defineProperty({}, "passive", {
      get: function () {
        return ((zh = !0), !0);
      },
    });
    (window.addEventListener("test", rc, rc),
      window.removeEventListener("test", rc, rc));
  } catch {
    zh = !1;
  }
var yo = zh ? { passive: !1 } : !1,
  $V = function (e) {
    return e.tagName === "TEXTAREA";
  },
  RE = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return (
      n[t] !== "hidden" &&
      !(n.overflowY === n.overflowX && !$V(e) && n[t] === "visible")
    );
  },
  WV = function (e) {
    return RE(e, "overflowY");
  },
  HV = function (e) {
    return RE(e, "overflowX");
  },
  tx = function (e, t) {
    var n = t.ownerDocument,
      s = t;
    do {
      typeof ShadowRoot < "u" && s instanceof ShadowRoot && (s = s.host);
      var i = AE(e, s);
      if (i) {
        var l = _E(e, s),
          c = l[1],
          u = l[2];
        if (c > u) return !0;
      }
      s = s.parentNode;
    } while (s && s !== n.body);
    return !1;
  },
  qV = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      s = e.clientHeight;
    return [t, n, s];
  },
  KV = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      s = e.clientWidth;
    return [t, n, s];
  },
  AE = function (e, t) {
    return e === "v" ? WV(t) : HV(t);
  },
  _E = function (e, t) {
    return e === "v" ? qV(t) : KV(t);
  },
  QV = function (e, t) {
    return e === "h" && t === "rtl" ? -1 : 1;
  },
  GV = function (e, t, n, s, i) {
    var l = QV(e, window.getComputedStyle(t).direction),
      c = l * s,
      u = n.target,
      f = t.contains(u),
      h = !1,
      m = c > 0,
      y = 0,
      w = 0;
    do {
      if (!u) break;
      var C = _E(e, u),
        E = C[0],
        v = C[1],
        x = C[2],
        T = v - x - l * E;
      (E || T) && AE(e, u) && ((y += T), (w += E));
      var P = u.parentNode;
      u = P && P.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? P.host : P;
    } while ((!f && u !== document.body) || (f && (t.contains(u) || t === u)));
    return (((m && Math.abs(y) < 1) || (!m && Math.abs(w) < 1)) && (h = !0), h);
  },
  sc = function (e) {
    return "changedTouches" in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  nx = function (e) {
    return [e.deltaX, e.deltaY];
  },
  rx = function (e) {
    return e && "current" in e ? e.current : e;
  },
  YV = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  XV = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        e,
        ` {pointer-events: all;}
`,
      );
  },
  JV = 0,
  vo = [];
function ZV(e) {
  var t = b.useRef([]),
    n = b.useRef([0, 0]),
    s = b.useRef(),
    i = b.useState(JV++)[0],
    l = b.useState(PE)[0],
    c = b.useRef(e);
  (b.useEffect(
    function () {
      c.current = e;
    },
    [e],
  ),
    b.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(i));
          var v = xV([e.lockRef.current], (e.shards || []).map(rx), !0).filter(
            Boolean,
          );
          return (
            v.forEach(function (x) {
              return x.classList.add("allow-interactivity-".concat(i));
            }),
            function () {
              (document.body.classList.remove("block-interactivity-".concat(i)),
                v.forEach(function (x) {
                  return x.classList.remove("allow-interactivity-".concat(i));
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var u = b.useCallback(function (v, x) {
      if (
        ("touches" in v && v.touches.length === 2) ||
        (v.type === "wheel" && v.ctrlKey)
      )
        return !c.current.allowPinchZoom;
      var T = sc(v),
        P = n.current,
        R = "deltaX" in v ? v.deltaX : P[0] - T[0],
        _ = "deltaY" in v ? v.deltaY : P[1] - T[1],
        M,
        V = v.target,
        U = Math.abs(R) > Math.abs(_) ? "h" : "v";
      if ("touches" in v && U === "h" && V.type === "range") return !1;
      var D = window.getSelection(),
        Q = D && D.anchorNode,
        J = Q ? Q === V || Q.contains(V) : !1;
      if (J) return !1;
      var ee = tx(U, V);
      if (!ee) return !0;
      if ((ee ? (M = U) : ((M = U === "v" ? "h" : "v"), (ee = tx(U, V))), !ee))
        return !1;
      if (
        (!s.current && "changedTouches" in v && (R || _) && (s.current = M), !M)
      )
        return !0;
      var de = s.current || M;
      return GV(de, x, v, de === "h" ? R : _);
    }, []),
    f = b.useCallback(function (v) {
      var x = v;
      if (!(!vo.length || vo[vo.length - 1] !== l)) {
        var T = "deltaY" in x ? nx(x) : sc(x),
          P = t.current.filter(function (M) {
            return (
              M.name === x.type &&
              (M.target === x.target || x.target === M.shadowParent) &&
              YV(M.delta, T)
            );
          })[0];
        if (P && P.should) {
          x.cancelable && x.preventDefault();
          return;
        }
        if (!P) {
          var R = (c.current.shards || [])
              .map(rx)
              .filter(Boolean)
              .filter(function (M) {
                return M.contains(x.target);
              }),
            _ = R.length > 0 ? u(x, R[0]) : !c.current.noIsolation;
          _ && x.cancelable && x.preventDefault();
        }
      }
    }, []),
    h = b.useCallback(function (v, x, T, P) {
      var R = { name: v, delta: x, target: T, should: P, shadowParent: e4(T) };
      (t.current.push(R),
        setTimeout(function () {
          t.current = t.current.filter(function (_) {
            return _ !== R;
          });
        }, 1));
    }, []),
    m = b.useCallback(function (v) {
      ((n.current = sc(v)), (s.current = void 0));
    }, []),
    y = b.useCallback(function (v) {
      h(v.type, nx(v), v.target, u(v, e.lockRef.current));
    }, []),
    w = b.useCallback(function (v) {
      h(v.type, sc(v), v.target, u(v, e.lockRef.current));
    }, []);
  b.useEffect(function () {
    return (
      vo.push(l),
      e.setCallbacks({
        onScrollCapture: y,
        onWheelCapture: y,
        onTouchMoveCapture: w,
      }),
      document.addEventListener("wheel", f, yo),
      document.addEventListener("touchmove", f, yo),
      document.addEventListener("touchstart", m, yo),
      function () {
        ((vo = vo.filter(function (v) {
          return v !== l;
        })),
          document.removeEventListener("wheel", f, yo),
          document.removeEventListener("touchmove", f, yo),
          document.removeEventListener("touchstart", m, yo));
      }
    );
  }, []);
  var C = e.removeScrollBar,
    E = e.inert;
  return b.createElement(
    b.Fragment,
    null,
    E ? b.createElement(l, { styles: XV(i) }) : null,
    C
      ? b.createElement(zV, { noRelative: e.noRelative, gapMode: e.gapMode })
      : null,
  );
}
function e4(e) {
  for (var t = null; e !== null; )
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)),
      (e = e.parentNode));
  return t;
}
const t4 = AV(TE, ZV);
var NE = b.forwardRef(function (e, t) {
  return b.createElement(fu, Fn({}, e, { ref: t, sideCar: t4 }));
});
NE.classNames = fu.classNames;
var n4 = [" ", "Enter", "ArrowUp", "ArrowDown"],
  r4 = [" ", "Enter"],
  Vs = "Select",
  [hu, pu, s4] = E1(Vs),
  [Jo] = _a(Vs, [s4, fE]),
  mu = fE(),
  [o4, ns] = Jo(Vs),
  [i4, a4] = Jo(Vs),
  OE = (e) => {
    const {
        __scopeSelect: t,
        children: n,
        open: s,
        defaultOpen: i,
        onOpenChange: l,
        value: c,
        defaultValue: u,
        onValueChange: f,
        dir: h,
        name: m,
        autoComplete: y,
        disabled: w,
        required: C,
        form: E,
      } = e,
      v = mu(t),
      [x, T] = b.useState(null),
      [P, R] = b.useState(null),
      [_, M] = b.useState(!1),
      V = _1(h),
      [U, D] = da({ prop: s, defaultProp: i ?? !1, onChange: l, caller: Vs }),
      [Q, J] = da({ prop: c, defaultProp: u, onChange: f, caller: Vs }),
      ee = b.useRef(null),
      de = x ? E || !!x.closest("form") : !0,
      [ge, le] = b.useState(new Set()),
      Ee = Array.from(ge)
        .map((te) => te.props.value)
        .join(";");
    return S.jsx(nV, {
      ...v,
      children: S.jsxs(o4, {
        required: C,
        scope: t,
        trigger: x,
        onTriggerChange: T,
        valueNode: P,
        onValueNodeChange: R,
        valueNodeHasChildren: _,
        onValueNodeHasChildrenChange: M,
        contentId: Na(),
        value: Q,
        onValueChange: J,
        open: U,
        onOpenChange: D,
        dir: V,
        triggerPointerDownPosRef: ee,
        disabled: w,
        children: [
          S.jsx(hu.Provider, {
            scope: t,
            children: S.jsx(i4, {
              scope: e.__scopeSelect,
              onNativeOptionAdd: b.useCallback((te) => {
                le((Z) => new Set(Z).add(te));
              }, []),
              onNativeOptionRemove: b.useCallback((te) => {
                le((Z) => {
                  const $ = new Set(Z);
                  return ($.delete(te), $);
                });
              }, []),
              children: n,
            }),
          }),
          de
            ? S.jsxs(
                nC,
                {
                  "aria-hidden": !0,
                  required: C,
                  tabIndex: -1,
                  name: m,
                  autoComplete: y,
                  value: Q,
                  onChange: (te) => J(te.target.value),
                  disabled: w,
                  form: E,
                  children: [
                    Q === void 0 ? S.jsx("option", { value: "" }) : null,
                    Array.from(ge),
                  ],
                },
                Ee,
              )
            : null,
        ],
      }),
    });
  };
OE.displayName = Vs;
var jE = "SelectTrigger",
  LE = b.forwardRef((e, t) => {
    const { __scopeSelect: n, disabled: s = !1, ...i } = e,
      l = mu(n),
      c = ns(jE, n),
      u = c.disabled || s,
      f = at(t, c.onTriggerChange),
      h = pu(n),
      m = b.useRef("touch"),
      [y, w, C] = sC((v) => {
        const x = h().filter((R) => !R.disabled),
          T = x.find((R) => R.value === c.value),
          P = oC(x, v, T);
        P !== void 0 && c.onValueChange(P.value);
      }),
      E = (v) => {
        (u || (c.onOpenChange(!0), C()),
          v &&
            (c.triggerPointerDownPosRef.current = {
              x: Math.round(v.pageX),
              y: Math.round(v.pageY),
            }));
      };
    return S.jsx(rV, {
      asChild: !0,
      ...l,
      children: S.jsx(Ue.button, {
        type: "button",
        role: "combobox",
        "aria-controls": c.contentId,
        "aria-expanded": c.open,
        "aria-required": c.required,
        "aria-autocomplete": "none",
        dir: c.dir,
        "data-state": c.open ? "open" : "closed",
        disabled: u,
        "data-disabled": u ? "" : void 0,
        "data-placeholder": rC(c.value) ? "" : void 0,
        ...i,
        ref: f,
        onClick: Ze(i.onClick, (v) => {
          (v.currentTarget.focus(), m.current !== "mouse" && E(v));
        }),
        onPointerDown: Ze(i.onPointerDown, (v) => {
          m.current = v.pointerType;
          const x = v.target;
          (x.hasPointerCapture(v.pointerId) &&
            x.releasePointerCapture(v.pointerId),
            v.button === 0 &&
              v.ctrlKey === !1 &&
              v.pointerType === "mouse" &&
              (E(v), v.preventDefault()));
        }),
        onKeyDown: Ze(i.onKeyDown, (v) => {
          const x = y.current !== "";
          (!(v.ctrlKey || v.altKey || v.metaKey) &&
            v.key.length === 1 &&
            w(v.key),
            !(x && v.key === " ") &&
              n4.includes(v.key) &&
              (E(), v.preventDefault()));
        }),
      }),
    });
  });
LE.displayName = jE;
var ME = "SelectValue",
  DE = b.forwardRef((e, t) => {
    const {
        __scopeSelect: n,
        className: s,
        style: i,
        children: l,
        placeholder: c = "",
        ...u
      } = e,
      f = ns(ME, n),
      { onValueNodeHasChildrenChange: h } = f,
      m = l !== void 0,
      y = at(t, f.onValueNodeChange);
    return (
      Et(() => {
        h(m);
      }, [h, m]),
      S.jsx(Ue.span, {
        ...u,
        ref: y,
        style: { pointerEvents: "none" },
        children: rC(f.value) ? S.jsx(S.Fragment, { children: c }) : l,
      })
    );
  });
DE.displayName = ME;
var l4 = "SelectIcon",
  IE = b.forwardRef((e, t) => {
    const { __scopeSelect: n, children: s, ...i } = e;
    return S.jsx(Ue.span, {
      "aria-hidden": !0,
      ...i,
      ref: t,
      children: s || "▼",
    });
  });
IE.displayName = l4;
var c4 = "SelectPortal",
  FE = (e) => S.jsx(SE, { asChild: !0, ...e });
FE.displayName = c4;
var Bs = "SelectContent",
  VE = b.forwardRef((e, t) => {
    const n = ns(Bs, e.__scopeSelect),
      [s, i] = b.useState();
    if (
      (Et(() => {
        i(new DocumentFragment());
      }, []),
      !n.open)
    ) {
      const l = s;
      return l
        ? wa.createPortal(
            S.jsx(BE, {
              scope: e.__scopeSelect,
              children: S.jsx(hu.Slot, {
                scope: e.__scopeSelect,
                children: S.jsx("div", { children: e.children }),
              }),
            }),
            l,
          )
        : null;
    }
    return S.jsx(UE, { ...e, ref: t });
  });
VE.displayName = Bs;
var bn = 10,
  [BE, rs] = Jo(Bs),
  u4 = "SelectContentImpl",
  d4 = aV("SelectContent.RemoveScroll"),
  UE = b.forwardRef((e, t) => {
    const {
        __scopeSelect: n,
        position: s = "item-aligned",
        onCloseAutoFocus: i,
        onEscapeKeyDown: l,
        onPointerDownOutside: c,
        side: u,
        sideOffset: f,
        align: h,
        alignOffset: m,
        arrowPadding: y,
        collisionBoundary: w,
        collisionPadding: C,
        sticky: E,
        hideWhenDetached: v,
        avoidCollisions: x,
        ...T
      } = e,
      P = ns(Bs, n),
      [R, _] = b.useState(null),
      [M, V] = b.useState(null),
      U = at(t, (ne) => _(ne)),
      [D, Q] = b.useState(null),
      [J, ee] = b.useState(null),
      de = pu(n),
      [ge, le] = b.useState(!1),
      Ee = b.useRef(!1);
    (b.useEffect(() => {
      if (R) return wV(R);
    }, [R]),
      RI());
    const te = b.useCallback(
        (ne) => {
          const [me, ...fe] = de().map((Ne) => Ne.ref.current),
            [Pe] = fe.slice(-1),
            Ae = document.activeElement;
          for (const Ne of ne)
            if (
              Ne === Ae ||
              (Ne == null || Ne.scrollIntoView({ block: "nearest" }),
              Ne === me && M && (M.scrollTop = 0),
              Ne === Pe && M && (M.scrollTop = M.scrollHeight),
              Ne == null || Ne.focus(),
              document.activeElement !== Ae)
            )
              return;
        },
        [de, M],
      ),
      Z = b.useCallback(() => te([D, R]), [te, D, R]);
    b.useEffect(() => {
      ge && Z();
    }, [ge, Z]);
    const { onOpenChange: $, triggerPointerDownPosRef: X } = P;
    (b.useEffect(() => {
      if (R) {
        let ne = { x: 0, y: 0 };
        const me = (Pe) => {
            var Ae, Ne;
            ne = {
              x: Math.abs(
                Math.round(Pe.pageX) -
                  (((Ae = X.current) == null ? void 0 : Ae.x) ?? 0),
              ),
              y: Math.abs(
                Math.round(Pe.pageY) -
                  (((Ne = X.current) == null ? void 0 : Ne.y) ?? 0),
              ),
            };
          },
          fe = (Pe) => {
            (ne.x <= 10 && ne.y <= 10
              ? Pe.preventDefault()
              : R.contains(Pe.target) || $(!1),
              document.removeEventListener("pointermove", me),
              (X.current = null));
          };
        return (
          X.current !== null &&
            (document.addEventListener("pointermove", me),
            document.addEventListener("pointerup", fe, {
              capture: !0,
              once: !0,
            })),
          () => {
            (document.removeEventListener("pointermove", me),
              document.removeEventListener("pointerup", fe, { capture: !0 }));
          }
        );
      }
    }, [R, $, X]),
      b.useEffect(() => {
        const ne = () => $(!1);
        return (
          window.addEventListener("blur", ne),
          window.addEventListener("resize", ne),
          () => {
            (window.removeEventListener("blur", ne),
              window.removeEventListener("resize", ne));
          }
        );
      }, [$]));
    const [W, L] = sC((ne) => {
        const me = de().filter((Ae) => !Ae.disabled),
          fe = me.find((Ae) => Ae.ref.current === document.activeElement),
          Pe = oC(me, ne, fe);
        Pe && setTimeout(() => Pe.ref.current.focus());
      }),
      H = b.useCallback(
        (ne, me, fe) => {
          const Pe = !Ee.current && !fe;
          ((P.value !== void 0 && P.value === me) || Pe) &&
            (Q(ne), Pe && (Ee.current = !0));
        },
        [P.value],
      ),
      we = b.useCallback(() => (R == null ? void 0 : R.focus()), [R]),
      ve = b.useCallback(
        (ne, me, fe) => {
          const Pe = !Ee.current && !fe;
          ((P.value !== void 0 && P.value === me) || Pe) && ee(ne);
        },
        [P.value],
      ),
      pe = s === "popper" ? $h : zE,
      ye =
        pe === $h
          ? {
              side: u,
              sideOffset: f,
              align: h,
              alignOffset: m,
              arrowPadding: y,
              collisionBoundary: w,
              collisionPadding: C,
              sticky: E,
              hideWhenDetached: v,
              avoidCollisions: x,
            }
          : {};
    return S.jsx(BE, {
      scope: n,
      content: R,
      viewport: M,
      onViewportChange: V,
      itemRefCallback: H,
      selectedItem: D,
      onItemLeave: we,
      itemTextRefCallback: ve,
      focusSelectedItem: Z,
      selectedItemText: J,
      position: s,
      isPositioned: ge,
      searchRef: W,
      children: S.jsx(NE, {
        as: d4,
        allowPinchZoom: !0,
        children: S.jsx(X1, {
          asChild: !0,
          trapped: P.open,
          onMountAutoFocus: (ne) => {
            ne.preventDefault();
          },
          onUnmountAutoFocus: Ze(i, (ne) => {
            var me;
            ((me = P.trigger) == null || me.focus({ preventScroll: !0 }),
              ne.preventDefault());
          }),
          children: S.jsx(G1, {
            asChild: !0,
            disableOutsidePointerEvents: !0,
            onEscapeKeyDown: l,
            onPointerDownOutside: c,
            onFocusOutside: (ne) => ne.preventDefault(),
            onDismiss: () => P.onOpenChange(!1),
            children: S.jsx(pe, {
              role: "listbox",
              id: P.contentId,
              "data-state": P.open ? "open" : "closed",
              dir: P.dir,
              onContextMenu: (ne) => ne.preventDefault(),
              ...T,
              ...ye,
              onPlaced: () => le(!0),
              ref: U,
              style: {
                display: "flex",
                flexDirection: "column",
                outline: "none",
                ...T.style,
              },
              onKeyDown: Ze(T.onKeyDown, (ne) => {
                const me = ne.ctrlKey || ne.altKey || ne.metaKey;
                if (
                  (ne.key === "Tab" && ne.preventDefault(),
                  !me && ne.key.length === 1 && L(ne.key),
                  ["ArrowUp", "ArrowDown", "Home", "End"].includes(ne.key))
                ) {
                  let Pe = de()
                    .filter((Ae) => !Ae.disabled)
                    .map((Ae) => Ae.ref.current);
                  if (
                    (["ArrowUp", "End"].includes(ne.key) &&
                      (Pe = Pe.slice().reverse()),
                    ["ArrowUp", "ArrowDown"].includes(ne.key))
                  ) {
                    const Ae = ne.target,
                      Ne = Pe.indexOf(Ae);
                    Pe = Pe.slice(Ne + 1);
                  }
                  (setTimeout(() => te(Pe)), ne.preventDefault());
                }
              }),
            }),
          }),
        }),
      }),
    });
  });
UE.displayName = u4;
var f4 = "SelectItemAlignedPosition",
  zE = b.forwardRef((e, t) => {
    const { __scopeSelect: n, onPlaced: s, ...i } = e,
      l = ns(Bs, n),
      c = rs(Bs, n),
      [u, f] = b.useState(null),
      [h, m] = b.useState(null),
      y = at(t, (U) => m(U)),
      w = pu(n),
      C = b.useRef(!1),
      E = b.useRef(!0),
      {
        viewport: v,
        selectedItem: x,
        selectedItemText: T,
        focusSelectedItem: P,
      } = c,
      R = b.useCallback(() => {
        if (l.trigger && l.valueNode && u && h && v && x && T) {
          const U = l.trigger.getBoundingClientRect(),
            D = h.getBoundingClientRect(),
            Q = l.valueNode.getBoundingClientRect(),
            J = T.getBoundingClientRect();
          if (l.dir !== "rtl") {
            const Ae = J.left - D.left,
              Ne = Q.left - Ae,
              Ge = U.left - Ne,
              lt = U.width + Ge,
              fr = Math.max(lt, D.width),
              hr = window.innerWidth - bn,
              Kn = Lw(Ne, [bn, Math.max(bn, hr - fr)]);
            ((u.style.minWidth = lt + "px"), (u.style.left = Kn + "px"));
          } else {
            const Ae = D.right - J.right,
              Ne = window.innerWidth - Q.right - Ae,
              Ge = window.innerWidth - U.right - Ne,
              lt = U.width + Ge,
              fr = Math.max(lt, D.width),
              hr = window.innerWidth - bn,
              Kn = Lw(Ne, [bn, Math.max(bn, hr - fr)]);
            ((u.style.minWidth = lt + "px"), (u.style.right = Kn + "px"));
          }
          const ee = w(),
            de = window.innerHeight - bn * 2,
            ge = v.scrollHeight,
            le = window.getComputedStyle(h),
            Ee = parseInt(le.borderTopWidth, 10),
            te = parseInt(le.paddingTop, 10),
            Z = parseInt(le.borderBottomWidth, 10),
            $ = parseInt(le.paddingBottom, 10),
            X = Ee + te + ge + $ + Z,
            W = Math.min(x.offsetHeight * 5, X),
            L = window.getComputedStyle(v),
            H = parseInt(L.paddingTop, 10),
            we = parseInt(L.paddingBottom, 10),
            ve = U.top + U.height / 2 - bn,
            pe = de - ve,
            ye = x.offsetHeight / 2,
            ne = x.offsetTop + ye,
            me = Ee + te + ne,
            fe = X - me;
          if (me <= ve) {
            const Ae = ee.length > 0 && x === ee[ee.length - 1].ref.current;
            u.style.bottom = "0px";
            const Ne = h.clientHeight - v.offsetTop - v.offsetHeight,
              Ge = Math.max(pe, ye + (Ae ? we : 0) + Ne + Z),
              lt = me + Ge;
            u.style.height = lt + "px";
          } else {
            const Ae = ee.length > 0 && x === ee[0].ref.current;
            u.style.top = "0px";
            const Ge = Math.max(ve, Ee + v.offsetTop + (Ae ? H : 0) + ye) + fe;
            ((u.style.height = Ge + "px"),
              (v.scrollTop = me - ve + v.offsetTop));
          }
          ((u.style.margin = `${bn}px 0`),
            (u.style.minHeight = W + "px"),
            (u.style.maxHeight = de + "px"),
            s == null || s(),
            requestAnimationFrame(() => (C.current = !0)));
        }
      }, [w, l.trigger, l.valueNode, u, h, v, x, T, l.dir, s]);
    Et(() => R(), [R]);
    const [_, M] = b.useState();
    Et(() => {
      h && M(window.getComputedStyle(h).zIndex);
    }, [h]);
    const V = b.useCallback(
      (U) => {
        U && E.current === !0 && (R(), P == null || P(), (E.current = !1));
      },
      [R, P],
    );
    return S.jsx(p4, {
      scope: n,
      contentWrapper: u,
      shouldExpandOnScrollRef: C,
      onScrollButtonChange: V,
      children: S.jsx("div", {
        ref: f,
        style: {
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          zIndex: _,
        },
        children: S.jsx(Ue.div, {
          ...i,
          ref: y,
          style: { boxSizing: "border-box", maxHeight: "100%", ...i.style },
        }),
      }),
    });
  });
zE.displayName = f4;
var h4 = "SelectPopperPosition",
  $h = b.forwardRef((e, t) => {
    const {
        __scopeSelect: n,
        align: s = "start",
        collisionPadding: i = bn,
        ...l
      } = e,
      c = mu(n);
    return S.jsx(sV, {
      ...c,
      ...l,
      ref: t,
      align: s,
      collisionPadding: i,
      style: {
        boxSizing: "border-box",
        ...l.style,
        "--radix-select-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-select-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)",
      },
    });
  });
$h.displayName = h4;
var [p4, am] = Jo(Bs, {}),
  Wh = "SelectViewport",
  $E = b.forwardRef((e, t) => {
    const { __scopeSelect: n, nonce: s, ...i } = e,
      l = rs(Wh, n),
      c = am(Wh, n),
      u = at(t, l.onViewportChange),
      f = b.useRef(0);
    return S.jsxs(S.Fragment, {
      children: [
        S.jsx("style", {
          dangerouslySetInnerHTML: {
            __html:
              "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}",
          },
          nonce: s,
        }),
        S.jsx(hu.Slot, {
          scope: n,
          children: S.jsx(Ue.div, {
            "data-radix-select-viewport": "",
            role: "presentation",
            ...i,
            ref: u,
            style: {
              position: "relative",
              flex: 1,
              overflow: "hidden auto",
              ...i.style,
            },
            onScroll: Ze(i.onScroll, (h) => {
              const m = h.currentTarget,
                { contentWrapper: y, shouldExpandOnScrollRef: w } = c;
              if (w != null && w.current && y) {
                const C = Math.abs(f.current - m.scrollTop);
                if (C > 0) {
                  const E = window.innerHeight - bn * 2,
                    v = parseFloat(y.style.minHeight),
                    x = parseFloat(y.style.height),
                    T = Math.max(v, x);
                  if (T < E) {
                    const P = T + C,
                      R = Math.min(E, P),
                      _ = P - R;
                    ((y.style.height = R + "px"),
                      y.style.bottom === "0px" &&
                        ((m.scrollTop = _ > 0 ? _ : 0),
                        (y.style.justifyContent = "flex-end")));
                  }
                }
              }
              f.current = m.scrollTop;
            }),
          }),
        }),
      ],
    });
  });
$E.displayName = Wh;
var WE = "SelectGroup",
  [m4, g4] = Jo(WE),
  y4 = b.forwardRef((e, t) => {
    const { __scopeSelect: n, ...s } = e,
      i = Na();
    return S.jsx(m4, {
      scope: n,
      id: i,
      children: S.jsx(Ue.div, {
        role: "group",
        "aria-labelledby": i,
        ...s,
        ref: t,
      }),
    });
  });
y4.displayName = WE;
var HE = "SelectLabel",
  qE = b.forwardRef((e, t) => {
    const { __scopeSelect: n, ...s } = e,
      i = g4(HE, n);
    return S.jsx(Ue.div, { id: i.id, ...s, ref: t });
  });
qE.displayName = HE;
var zc = "SelectItem",
  [v4, KE] = Jo(zc),
  QE = b.forwardRef((e, t) => {
    const {
        __scopeSelect: n,
        value: s,
        disabled: i = !1,
        textValue: l,
        ...c
      } = e,
      u = ns(zc, n),
      f = rs(zc, n),
      h = u.value === s,
      [m, y] = b.useState(l ?? ""),
      [w, C] = b.useState(!1),
      E = at(t, (P) => {
        var R;
        return (R = f.itemRefCallback) == null ? void 0 : R.call(f, P, s, i);
      }),
      v = Na(),
      x = b.useRef("touch"),
      T = () => {
        i || (u.onValueChange(s), u.onOpenChange(!1));
      };
    if (s === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.",
      );
    return S.jsx(v4, {
      scope: n,
      value: s,
      disabled: i,
      textId: v,
      isSelected: h,
      onItemTextChange: b.useCallback((P) => {
        y((R) => R || ((P == null ? void 0 : P.textContent) ?? "").trim());
      }, []),
      children: S.jsx(hu.ItemSlot, {
        scope: n,
        value: s,
        disabled: i,
        textValue: m,
        children: S.jsx(Ue.div, {
          role: "option",
          "aria-labelledby": v,
          "data-highlighted": w ? "" : void 0,
          "aria-selected": h && w,
          "data-state": h ? "checked" : "unchecked",
          "aria-disabled": i || void 0,
          "data-disabled": i ? "" : void 0,
          tabIndex: i ? void 0 : -1,
          ...c,
          ref: E,
          onFocus: Ze(c.onFocus, () => C(!0)),
          onBlur: Ze(c.onBlur, () => C(!1)),
          onClick: Ze(c.onClick, () => {
            x.current !== "mouse" && T();
          }),
          onPointerUp: Ze(c.onPointerUp, () => {
            x.current === "mouse" && T();
          }),
          onPointerDown: Ze(c.onPointerDown, (P) => {
            x.current = P.pointerType;
          }),
          onPointerMove: Ze(c.onPointerMove, (P) => {
            var R;
            ((x.current = P.pointerType),
              i
                ? (R = f.onItemLeave) == null || R.call(f)
                : x.current === "mouse" &&
                  P.currentTarget.focus({ preventScroll: !0 }));
          }),
          onPointerLeave: Ze(c.onPointerLeave, (P) => {
            var R;
            P.currentTarget === document.activeElement &&
              ((R = f.onItemLeave) == null || R.call(f));
          }),
          onKeyDown: Ze(c.onKeyDown, (P) => {
            var _;
            (((_ = f.searchRef) == null ? void 0 : _.current) !== "" &&
              P.key === " ") ||
              (r4.includes(P.key) && T(), P.key === " " && P.preventDefault());
          }),
        }),
      }),
    });
  });
QE.displayName = zc;
var Xi = "SelectItemText",
  GE = b.forwardRef((e, t) => {
    const { __scopeSelect: n, className: s, style: i, ...l } = e,
      c = ns(Xi, n),
      u = rs(Xi, n),
      f = KE(Xi, n),
      h = a4(Xi, n),
      [m, y] = b.useState(null),
      w = at(
        t,
        (T) => y(T),
        f.onItemTextChange,
        (T) => {
          var P;
          return (P = u.itemTextRefCallback) == null
            ? void 0
            : P.call(u, T, f.value, f.disabled);
        },
      ),
      C = m == null ? void 0 : m.textContent,
      E = b.useMemo(
        () =>
          S.jsx(
            "option",
            { value: f.value, disabled: f.disabled, children: C },
            f.value,
          ),
        [f.disabled, f.value, C],
      ),
      { onNativeOptionAdd: v, onNativeOptionRemove: x } = h;
    return (
      Et(() => (v(E), () => x(E)), [v, x, E]),
      S.jsxs(S.Fragment, {
        children: [
          S.jsx(Ue.span, { id: f.textId, ...l, ref: w }),
          f.isSelected && c.valueNode && !c.valueNodeHasChildren
            ? wa.createPortal(l.children, c.valueNode)
            : null,
        ],
      })
    );
  });
GE.displayName = Xi;
var YE = "SelectItemIndicator",
  XE = b.forwardRef((e, t) => {
    const { __scopeSelect: n, ...s } = e;
    return KE(YE, n).isSelected
      ? S.jsx(Ue.span, { "aria-hidden": !0, ...s, ref: t })
      : null;
  });
XE.displayName = YE;
var Hh = "SelectScrollUpButton",
  JE = b.forwardRef((e, t) => {
    const n = rs(Hh, e.__scopeSelect),
      s = am(Hh, e.__scopeSelect),
      [i, l] = b.useState(!1),
      c = at(t, s.onScrollButtonChange);
    return (
      Et(() => {
        if (n.viewport && n.isPositioned) {
          let u = function () {
            const h = f.scrollTop > 0;
            l(h);
          };
          const f = n.viewport;
          return (
            u(),
            f.addEventListener("scroll", u),
            () => f.removeEventListener("scroll", u)
          );
        }
      }, [n.viewport, n.isPositioned]),
      i
        ? S.jsx(eC, {
            ...e,
            ref: c,
            onAutoScroll: () => {
              const { viewport: u, selectedItem: f } = n;
              u && f && (u.scrollTop = u.scrollTop - f.offsetHeight);
            },
          })
        : null
    );
  });
JE.displayName = Hh;
var qh = "SelectScrollDownButton",
  ZE = b.forwardRef((e, t) => {
    const n = rs(qh, e.__scopeSelect),
      s = am(qh, e.__scopeSelect),
      [i, l] = b.useState(!1),
      c = at(t, s.onScrollButtonChange);
    return (
      Et(() => {
        if (n.viewport && n.isPositioned) {
          let u = function () {
            const h = f.scrollHeight - f.clientHeight,
              m = Math.ceil(f.scrollTop) < h;
            l(m);
          };
          const f = n.viewport;
          return (
            u(),
            f.addEventListener("scroll", u),
            () => f.removeEventListener("scroll", u)
          );
        }
      }, [n.viewport, n.isPositioned]),
      i
        ? S.jsx(eC, {
            ...e,
            ref: c,
            onAutoScroll: () => {
              const { viewport: u, selectedItem: f } = n;
              u && f && (u.scrollTop = u.scrollTop + f.offsetHeight);
            },
          })
        : null
    );
  });
ZE.displayName = qh;
var eC = b.forwardRef((e, t) => {
    const { __scopeSelect: n, onAutoScroll: s, ...i } = e,
      l = rs("SelectScrollButton", n),
      c = b.useRef(null),
      u = pu(n),
      f = b.useCallback(() => {
        c.current !== null &&
          (window.clearInterval(c.current), (c.current = null));
      }, []);
    return (
      b.useEffect(() => () => f(), [f]),
      Et(() => {
        var m;
        const h = u().find((y) => y.ref.current === document.activeElement);
        (m = h == null ? void 0 : h.ref.current) == null ||
          m.scrollIntoView({ block: "nearest" });
      }, [u]),
      S.jsx(Ue.div, {
        "aria-hidden": !0,
        ...i,
        ref: t,
        style: { flexShrink: 0, ...i.style },
        onPointerDown: Ze(i.onPointerDown, () => {
          c.current === null && (c.current = window.setInterval(s, 50));
        }),
        onPointerMove: Ze(i.onPointerMove, () => {
          var h;
          ((h = l.onItemLeave) == null || h.call(l),
            c.current === null && (c.current = window.setInterval(s, 50)));
        }),
        onPointerLeave: Ze(i.onPointerLeave, () => {
          f();
        }),
      })
    );
  }),
  w4 = "SelectSeparator",
  tC = b.forwardRef((e, t) => {
    const { __scopeSelect: n, ...s } = e;
    return S.jsx(Ue.div, { "aria-hidden": !0, ...s, ref: t });
  });
tC.displayName = w4;
var Kh = "SelectArrow",
  x4 = b.forwardRef((e, t) => {
    const { __scopeSelect: n, ...s } = e,
      i = mu(n),
      l = ns(Kh, n),
      c = rs(Kh, n);
    return l.open && c.position === "popper"
      ? S.jsx(oV, { ...i, ...s, ref: t })
      : null;
  });
x4.displayName = Kh;
var S4 = "SelectBubbleInput",
  nC = b.forwardRef(({ __scopeSelect: e, value: t, ...n }, s) => {
    const i = b.useRef(null),
      l = at(s, i),
      c = hV(t);
    return (
      b.useEffect(() => {
        const u = i.current;
        if (!u) return;
        const f = window.HTMLSelectElement.prototype,
          m = Object.getOwnPropertyDescriptor(f, "value").set;
        if (c !== t && m) {
          const y = new Event("change", { bubbles: !0 });
          (m.call(u, t), u.dispatchEvent(y));
        }
      }, [c, t]),
      S.jsx(Ue.select, {
        ...n,
        style: { ...bE, ...n.style },
        ref: l,
        defaultValue: t,
      })
    );
  });
nC.displayName = S4;
function rC(e) {
  return e === "" || e === void 0;
}
function sC(e) {
  const t = Is(e),
    n = b.useRef(""),
    s = b.useRef(0),
    i = b.useCallback(
      (c) => {
        const u = n.current + c;
        (t(u),
          (function f(h) {
            ((n.current = h),
              window.clearTimeout(s.current),
              h !== "" && (s.current = window.setTimeout(() => f(""), 1e3)));
          })(u));
      },
      [t],
    ),
    l = b.useCallback(() => {
      ((n.current = ""), window.clearTimeout(s.current));
    }, []);
  return (
    b.useEffect(() => () => window.clearTimeout(s.current), []),
    [n, i, l]
  );
}
function oC(e, t, n) {
  const i = t.length > 1 && Array.from(t).every((h) => h === t[0]) ? t[0] : t,
    l = n ? e.indexOf(n) : -1;
  let c = b4(e, Math.max(l, 0));
  i.length === 1 && (c = c.filter((h) => h !== n));
  const f = c.find((h) =>
    h.textValue.toLowerCase().startsWith(i.toLowerCase()),
  );
  return f !== n ? f : void 0;
}
function b4(e, t) {
  return e.map((n, s) => e[(t + s) % e.length]);
}
var E4 = OE,
  iC = LE,
  C4 = DE,
  k4 = IE,
  T4 = FE,
  aC = VE,
  P4 = $E,
  lC = qE,
  cC = QE,
  R4 = GE,
  A4 = XE,
  uC = JE,
  dC = ZE,
  fC = tC;
const _4 = E4,
  N4 = C4,
  hC = b.forwardRef(({ className: e, children: t, ...n }, s) =>
    S.jsxs(iC, {
      ref: s,
      className: ft(
        "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        e,
      ),
      ...n,
      children: [
        t,
        S.jsx(k4, {
          asChild: !0,
          children: S.jsx(Xh, { className: "h-4 w-4 opacity-50" }),
        }),
      ],
    }),
  );
hC.displayName = iC.displayName;
const pC = b.forwardRef(({ className: e, ...t }, n) =>
  S.jsx(uC, {
    ref: n,
    className: ft("flex cursor-default items-center justify-center py-1", e),
    ...t,
    children: S.jsx(FT, { className: "h-4 w-4" }),
  }),
);
pC.displayName = uC.displayName;
const mC = b.forwardRef(({ className: e, ...t }, n) =>
  S.jsx(dC, {
    ref: n,
    className: ft("flex cursor-default items-center justify-center py-1", e),
    ...t,
    children: S.jsx(Xh, { className: "h-4 w-4" }),
  }),
);
mC.displayName = dC.displayName;
const gC = b.forwardRef(
  ({ className: e, children: t, position: n = "popper", ...s }, i) =>
    S.jsx(T4, {
      children: S.jsxs(aC, {
        ref: i,
        className: ft(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          n === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          e,
        ),
        position: n,
        ...s,
        children: [
          S.jsx(pC, {}),
          S.jsx(P4, {
            className: ft(
              "p-1",
              n === "popper" &&
                "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
            ),
            children: t,
          }),
          S.jsx(mC, {}),
        ],
      }),
    }),
);
gC.displayName = aC.displayName;
const O4 = b.forwardRef(({ className: e, ...t }, n) =>
  S.jsx(lC, {
    ref: n,
    className: ft("px-2 py-1.5 text-sm font-semibold", e),
    ...t,
  }),
);
O4.displayName = lC.displayName;
const yC = b.forwardRef(({ className: e, children: t, ...n }, s) =>
  S.jsxs(cC, {
    ref: s,
    className: ft(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e,
    ),
    ...n,
    children: [
      S.jsx("span", {
        className:
          "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
        children: S.jsx(A4, { children: S.jsx(MT, { className: "h-4 w-4" }) }),
      }),
      S.jsx(R4, { children: t }),
    ],
  }),
);
yC.displayName = cC.displayName;
const j4 = b.forwardRef(({ className: e, ...t }, n) =>
  S.jsx(fC, { ref: n, className: ft("-mx-1 my-1 h-px bg-muted", e), ...t }),
);
j4.displayName = fC.displayName;
const L4 = [
  "Čištění fasád",
  "Čištění střech",
  "Čištění dlažeb",
  "Solární panely",
  "Odstranění graffiti",
  "Průmyslové čištění",
  "Nátěry fasád",
  "Nátěry střech",
  "Impregnace",
  "Jiné",
];
function M4() {
  const [e, t] = b.useState({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    }),
    [n, s] = b.useState(!1),
    [i, l] = b.useState(!1),
    c = async (u) => {
      (u.preventDefault(),
        s(!0),
        await wo.entities.Inquiry.create(e),
        s(!1),
        l(!0));
    };
  return i
    ? S.jsxs(en.div, {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        className: "text-center py-12",
        children: [
          S.jsx("div", {
            className:
              "inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4",
            children: S.jsx(BT, { className: "h-8 w-8 text-green-600" }),
          }),
          S.jsx("h3", {
            className: "font-heading text-2xl font-bold text-foreground",
            children: "Děkujeme za poptávku!",
          }),
          S.jsx("p", {
            className: "mt-2 text-muted-foreground",
            children: "Ozveme se vám co nejdříve s cenovou nabídkou.",
          }),
        ],
      })
    : S.jsxs("form", {
        onSubmit: c,
        className: "space-y-4",
        children: [
          S.jsxs("div", {
            className: "grid sm:grid-cols-2 gap-4",
            children: [
              S.jsxs("div", {
                children: [
                  S.jsx("label", {
                    className:
                      "block text-sm font-medium text-foreground mb-1.5",
                    children: "Jméno a příjmení *",
                  }),
                  S.jsx(vc, {
                    required: !0,
                    placeholder: "Jan Novák",
                    value: e.name,
                    onChange: (u) => t({ ...e, name: u.target.value }),
                    className: "h-12 rounded-xl",
                  }),
                ],
              }),
              S.jsxs("div", {
                children: [
                  S.jsx("label", {
                    className:
                      "block text-sm font-medium text-foreground mb-1.5",
                    children: "Telefon *",
                  }),
                  S.jsx(vc, {
                    required: !0,
                    type: "tel",
                    placeholder: "+420 ...",
                    value: e.phone,
                    onChange: (u) => t({ ...e, phone: u.target.value }),
                    className: "h-12 rounded-xl",
                  }),
                ],
              }),
            ],
          }),
          S.jsxs("div", {
            className: "grid sm:grid-cols-2 gap-4",
            children: [
              S.jsxs("div", {
                children: [
                  S.jsx("label", {
                    className:
                      "block text-sm font-medium text-foreground mb-1.5",
                    children: "E-mail *",
                  }),
                  S.jsx(vc, {
                    required: !0,
                    type: "email",
                    placeholder: "jan@email.cz",
                    value: e.email,
                    onChange: (u) => t({ ...e, email: u.target.value }),
                    className: "h-12 rounded-xl",
                  }),
                ],
              }),
              S.jsxs("div", {
                children: [
                  S.jsx("label", {
                    className:
                      "block text-sm font-medium text-foreground mb-1.5",
                    children: "O jakou službu máte zájem?",
                  }),
                  S.jsxs(_4, {
                    value: e.service,
                    onValueChange: (u) => t({ ...e, service: u }),
                    children: [
                      S.jsx(hC, {
                        className: "h-12 rounded-xl",
                        children: S.jsx(N4, { placeholder: "Vyberte službu" }),
                      }),
                      S.jsx(gC, {
                        children: L4.map((u) =>
                          S.jsx(yC, { value: u, children: u }, u),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          S.jsxs("div", {
            children: [
              S.jsx("label", {
                className: "block text-sm font-medium text-foreground mb-1.5",
                children: "Zpráva",
              }),
              S.jsx(K1, {
                placeholder: "Popište nám prosím vaše potřeby...",
                value: e.message,
                onChange: (u) => t({ ...e, message: u.target.value }),
                className: "min-h-[100px] rounded-xl",
              }),
            ],
          }),
          S.jsxs(Uo, {
            type: "submit",
            disabled: n,
            size: "lg",
            className:
              "w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-full text-base h-13",
            children: [
              n
                ? S.jsx(qT, { className: "h-5 w-5 animate-spin mr-2" })
                : S.jsx(sP, { className: "h-5 w-5 mr-2" }),
              n ? "Odesílám..." : "Odeslat nezávaznou poptávku",
            ],
          }),
          S.jsx("p", {
            className: "text-center text-xs text-muted-foreground",
            children:
              "Odesláním souhlasíte se zpracováním osobních údajů. Odpovíme do 24 hodin.",
          }),
        ],
      });
}
function D4() {
  return S.jsx("section", {
    id: "kontakt",
    className: "py-20 md:py-28 bg-background",
    children: S.jsx("div", {
      className: "max-w-7xl mx-auto px-6",
      children: S.jsxs("div", {
        className: "grid lg:grid-cols-2 gap-12 lg:gap-16",
        children: [
          S.jsxs(en.div, {
            initial: { opacity: 0, x: -30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: !0 },
            transition: { duration: 0.5 },
            children: [
              S.jsx("span", {
                className:
                  "inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3",
                children: "Kontaktujte nás",
              }),
              S.jsxs("h2", {
                className:
                  "font-heading text-3xl md:text-4xl font-bold text-foreground",
                children: [
                  "Získejte cenovou nabídku ",
                  S.jsx("span", {
                    className: "text-primary",
                    children: "zdarma",
                  }),
                ],
              }),
              S.jsx("p", {
                className: "mt-4 text-muted-foreground text-lg leading-relaxed",
                children:
                  "Vyplňte formulář a my se vám ozveme do 24 hodin s nezávaznou cenovou nabídkou. Konzultace a zaměření je zcela zdarma.",
              }),
              S.jsxs("div", {
                className: "mt-8 space-y-5",
                children: [
                  S.jsxs("a", {
                    href: "tel:+420774509409",
                    className: "flex items-center gap-4 group",
                    children: [
                      S.jsx("div", {
                        className:
                          "h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0",
                        children: S.jsx(bc, {
                          className: "h-5 w-5 text-primary",
                        }),
                      }),
                      S.jsxs("div", {
                        children: [
                          S.jsx("div", {
                            className: "text-sm text-muted-foreground",
                            children: "Zavolejte nám",
                          }),
                          S.jsx("div", {
                            className:
                              "font-semibold text-foreground group-hover:text-primary transition-colors",
                            children: "+420 774 509 409",
                          }),
                        ],
                      }),
                    ],
                  }),
                  S.jsxs("a", {
                    href: "mailto:info@nanofusion.cz",
                    className: "flex items-center gap-4 group",
                    children: [
                      S.jsx("div", {
                        className:
                          "h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0",
                        children: S.jsx(xx, {
                          className: "h-5 w-5 text-primary",
                        }),
                      }),
                      S.jsxs("div", {
                        children: [
                          S.jsx("div", {
                            className: "text-sm text-muted-foreground",
                            children: "Napište nám",
                          }),
                          S.jsx("div", {
                            className:
                              "font-semibold text-foreground group-hover:text-primary transition-colors",
                            children: "info@nanofusion.cz",
                          }),
                        ],
                      }),
                    ],
                  }),
                  S.jsxs("div", {
                    className: "flex items-center gap-4",
                    children: [
                      S.jsx("div", {
                        className:
                          "h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0",
                        children: S.jsx(GT, {
                          className: "h-5 w-5 text-primary",
                        }),
                      }),
                      S.jsxs("div", {
                        children: [
                          S.jsx("div", {
                            className: "text-sm text-muted-foreground",
                            children: "Působnost",
                          }),
                          S.jsx("div", {
                            className: "font-semibold text-foreground",
                            children: "Celá Česká republika",
                          }),
                        ],
                      }),
                    ],
                  }),
                  S.jsxs("div", {
                    className: "flex items-center gap-4",
                    children: [
                      S.jsx("div", {
                        className:
                          "h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0",
                        children: S.jsx(WT, {
                          className: "h-5 w-5 text-primary",
                        }),
                      }),
                      S.jsxs("div", {
                        children: [
                          S.jsx("div", {
                            className: "text-sm text-muted-foreground",
                            children: "Otevírací doba",
                          }),
                          S.jsx("div", {
                            className: "font-semibold text-foreground",
                            children: "Po–Pá 7:00–18:00",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          S.jsx(en.div, {
            initial: { opacity: 0, x: 30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: !0 },
            transition: { duration: 0.5 },
            className:
              "bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm",
            children: S.jsx(M4, {}),
          }),
        ],
      }),
    }),
  });
}
function I4() {
  return S.jsx("footer", {
    className: "bg-neutral-900 text-white",
    children: S.jsxs("div", {
      className: "max-w-7xl mx-auto px-6 py-12 md:py-16",
      children: [
        S.jsxs("div", {
          className: "grid md:grid-cols-3 gap-10",
          children: [
            S.jsxs("div", {
              children: [
                S.jsx("img", {
                  src: "/static/logo.jpg",
                  alt: "NANOfusion",
                  className: "h-10 w-auto mb-4",
                }),
                S.jsx("p", {
                  className: "text-sm text-neutral-400 leading-relaxed",
                  children:
                    "Profesionální čištění, impregnace a nátěry. Od roku 2012 pečujeme o váš majetek po celé ČR.",
                }),
                S.jsxs("div", {
                  className: "flex gap-3 mt-5",
                  children: [
                    S.jsx(oc, {
                      href: "https://facebook.com/",
                      label: "Facebook",
                    }),
                    S.jsx(oc, {
                      href: "https://instagram.com/nano_fusion_cz/",
                      label: "Instagram",
                    }),
                    S.jsx(oc, {
                      href: "https://linkedin.com/company/nanofusion/",
                      label: "LinkedIn",
                    }),
                    S.jsx(oc, {
                      href: "https://youtube.com/channel/UCBX5e_PVDcAKmurD9GsdYSA",
                      label: "YouTube",
                    }),
                  ],
                }),
              ],
            }),
            S.jsxs("div", {
              children: [
                S.jsx("h4", {
                  className:
                    "font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-neutral-300",
                  children: "Služby",
                }),
                S.jsxs("ul", {
                  className: "space-y-2 text-sm text-neutral-400",
                  children: [
                    S.jsx("li", { children: "Čištění fasád" }),
                    S.jsx("li", { children: "Čištění střech" }),
                    S.jsx("li", { children: "Čištění dlažeb" }),
                    S.jsx("li", { children: "Nátěry fasád a střech" }),
                    S.jsx("li", { children: "Průmyslové čištění" }),
                    S.jsx("li", { children: "Nano impregnace" }),
                  ],
                }),
              ],
            }),
            S.jsxs("div", {
              children: [
                S.jsx("h4", {
                  className:
                    "font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-neutral-300",
                  children: "Kontakt",
                }),
                S.jsxs("ul", {
                  className: "space-y-2 text-sm text-neutral-400",
                  children: [
                    S.jsx("li", {
                      children: S.jsx("a", {
                        href: "tel:+420774509409",
                        className: "hover:text-primary transition-colors",
                        children: "+420 774 509 409",
                      }),
                    }),
                    S.jsx("li", {
                      children: S.jsx("a", {
                        href: "mailto:info@nanofusion.cz",
                        className: "hover:text-primary transition-colors",
                        children: "info@nanofusion.cz",
                      }),
                    }),
                    S.jsx("li", { children: "Celá Česká republika" }),
                    S.jsx("li", { children: "Po–Pá 7:00–18:00" }),
                  ],
                }),
              ],
            }),
          ],
        }),
        S.jsxs("div", {
          className:
            "border-t border-neutral-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4",
          children: [
            S.jsxs("p", {
              className: "text-xs text-neutral-500",
              children: [
                "© ",
                new Date().getFullYear(),
                " NANOfusion s.r.o. Všechna práva vyhrazena.",
              ],
            }),
            S.jsx("p", {
              className: "text-xs text-neutral-500",
              children: "IČ: 02491346",
            }),
          ],
        }),
      ],
    }),
  });
}
function oc({ href: e, label: t }) {
  return S.jsx("a", {
    href: e,
    target: "_blank",
    rel: "noopener noreferrer",
    className:
      "h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors",
    "aria-label": t,
    children: S.jsx("span", {
      className: "text-xs font-bold text-neutral-300",
      children: t[0],
    }),
  });
}
function F4() {
  return S.jsx("div", {
    className: "fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end",
    children: S.jsx("a", {
      href: "tel:+420774509409",
      className:
        "h-14 w-14 rounded-full bg-primary text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center",
      "aria-label": "Zavolat",
      children: S.jsx(bc, { className: "h-6 w-6" }),
    }),
  });
}
function V4() {
  return S.jsxs("div", {
    className: "min-h-screen",
    children: [
      S.jsx(YO, {}),
      S.jsx(bD, {}),
      S.jsx(CD, {}),
      S.jsx(TD, {}),
      S.jsx(PD, {}),
      S.jsx(AD, {}),
      S.jsx(wI, {}),
      S.jsx(D4, {}),
      S.jsx(I4, {}),
      S.jsx(F4, {}),
    ],
  });
}
const B4 = () => {
  const {
    isLoadingAuth: e,
    isLoadingPublicSettings: t,
    authError: n,
    navigateToLogin: s,
  } = FO();
  if (t || e)
    return S.jsx("div", {
      className: "fixed inset-0 flex items-center justify-center",
      children: S.jsx("div", {
        className:
          "w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin",
      }),
    });
  if (n) {
    if (n.type === "user_not_registered") return S.jsx(VO, {});
    if (n.type === "auth_required") return (s(), null);
  }
  return S.jsxs(CA, {
    children: [
      S.jsx(ch, { path: "/", element: S.jsx(V4, {}) }),
      S.jsx(ch, { path: "*", element: S.jsx(DO, {}) }),
    ],
  });
};
function U4() {
  return S.jsx(IO, {
    children: S.jsxs(TR, {
      client: VR,
      children: [S.jsx(PA, { children: S.jsx(B4, {}) }), S.jsx(eR, {})],
    }),
  });
}
ET.createRoot(document.getElementById("root")).render(S.jsx(U4, {}));
