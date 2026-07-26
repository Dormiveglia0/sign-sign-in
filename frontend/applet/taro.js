var e = require("./@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [2], {
    0: function(e, t, n) {
      e.exports = n(1010).default, e.exports.default = e.exports
    },
    1010: function(t, n, r) {
      (function(t, o) {
        var i = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
            return e(t)
          } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
          },
          a = (Object.defineProperty(n, "__esModule", {
            value: !0
          }), r(94));

        function c(e) {
          return (c = "function" == typeof Symbol && "symbol" === i(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : i(e)
          } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : i(e)
          })(e)
        }

        function u(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function s(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
        }

        function f(e, t, n) {
          t && s(e.prototype, t), n && s(e, n)
        }

        function l(e, t, n) {
          t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : e[t] = n
        }

        function p(e, t) {
          var n, r = Object.keys(e);
          return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e), t && (n = n.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
          }))), r.push.apply(r, n)), r
        }

        function d(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? p(Object(n), !0).forEach((function(t) {
              l(e, t, n[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : p(Object(n)).forEach((function(t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }))
          }
          return e
        }

        function h(e) {
          return (h = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
          })(e)
        }

        function y(e, t) {
          return (y = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
          })(e, t)
        }

        function g(e) {
          if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e
        }

        function m(e) {
          var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
            } catch (e) {
              return !1
            }
          }();
          return function() {
            var n, r = h(e);
            return function(e, t) {
              return !t || "object" !== (void 0 === t ? "undefined" : i(t)) && "function" != typeof t ? g(e) : t
            }(this, t ? (n = h(this).constructor, Reflect.construct(r, arguments, n)) : r.apply(this, arguments))
          }
        }

        function v(e) {
          return function(e) {
            if (Array.isArray(e)) return b(e)
          }(e) || function(e) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
          }(e) || function(e, t) {
            var n;
            if (e) return "string" == typeof e ? b(e, t) : "Map" === (n = "Object" === (n = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? b(e, t) : void 0
          }(e) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
          }()
        }

        function b(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
          return r
        }
        var _ = Object.is || function(e, t) {
          return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
        };

        function S(e, t) {
          if ("object" !== c(e) && "object" !== c(t)) return e === t;
          if (null !== e || null !== t) {
            if (null === e || null === t) return !1;
            if (!_(e, t)) {
              var n = e ? Object.keys(e) : [],
                r = t ? Object.keys(t) : [];
              if (n.length !== r.length) return !1;
              for (var o = 0; o < n.length; o++) {
                var i = n[o];
                if (!t.hasOwnProperty(i) || !_(e[i], t[i])) return !1
              }
            }
          }
          return !0
        }
        var w = function() {
          function e() {
            u(this, e), this.cache = [], this.size = 0
          }
          return f(e, [{
            key: "set",
            value: function(e, t) {
              var n = this.cache.length;
              if (n)
                for (var r = 0; r < n; r++) {
                  var o = this.cache[r];
                  if (o.k === e) return void(o.v = t)
                }
              this.cache.push({
                k: e,
                v: t
              }), this.size += 1
            }
          }, {
            key: "get",
            value: function(e) {
              var t = this.cache.length;
              if (t)
                for (var n = 0; n < t; n++) {
                  var r = this.cache[n];
                  if (r.k === e) return r.v
                }
            }
          }, {
            key: "has",
            value: function(e) {
              var t = this.cache.length;
              if (t)
                for (var n = 0; n < t; n++)
                  if (this.cache[n].k === e) return !0;
              return !1
            }
          }, {
            key: "delete",
            value: function(e) {
              for (var t = this.cache.length, n = 0; n < t; n++)
                if (this.cache[n].k === e) return this.cache.splice(n, 1), --this.size, !0;
              return !1
            }
          }, {
            key: "clear",
            value: function() {
              var e = this.cache.length;
              if (this.size = 0, e)
                for (; e;) this.cache.pop(), e--
            }
          }]), e
        }();
        var P = function(e) {
          for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
          e = "function" == typeof e ? e.bind.apply(e, [null].concat(n)) : e, (wx.nextTick || setTimeout)(e)
        };
        t = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {};

        function C(e, t) {
          return e(t = {
            exports: {}
          }, t.exports), t.exports
        }
        var O = (Y = "function" == typeof Symbol && Symbol.for) ? Symbol.for("react.element") : 60103,
          A = Y ? Symbol.for("react.portal") : 60106,
          j = Y ? Symbol.for("react.fragment") : 60107,
          E = Y ? Symbol.for("react.strict_mode") : 60108,
          $ = Y ? Symbol.for("react.profiler") : 60114,
          k = Y ? Symbol.for("react.provider") : 60109,
          T = Y ? Symbol.for("react.context") : 60110,
          x = Y ? Symbol.for("react.async_mode") : 60111,
          R = Y ? Symbol.for("react.concurrent_mode") : 60111,
          I = Y ? Symbol.for("react.forward_ref") : 60112,
          D = Y ? Symbol.for("react.suspense") : 60113,
          L = Y ? Symbol.for("react.suspense_list") : 60120,
          M = Y ? Symbol.for("react.memo") : 60115,
          B = Y ? Symbol.for("react.lazy") : 60116,
          F = Y ? Symbol.for("react.block") : 60121,
          U = Y ? Symbol.for("react.fundamental") : 60117,
          W = Y ? Symbol.for("react.responder") : 60118,
          N = Y ? Symbol.for("react.scope") : 60119;

        function q(e) {
          if ("object" === c(e) && null !== e) {
            var t = e.$$typeof;
            switch (t) {
              case O:
                switch (e = e.type) {
                  case x:
                  case R:
                  case j:
                  case $:
                  case E:
                  case D:
                    return e;
                  default:
                    switch (e = e && e.$$typeof) {
                      case T:
                      case I:
                      case B:
                      case M:
                      case k:
                        return e;
                      default:
                        return t
                    }
                }
              case A:
                return t
            }
          }
        }

        function V(e) {
          return q(e) === R
        }
        var H = {
          AsyncMode: x,
          ConcurrentMode: R,
          ContextConsumer: T,
          ContextProvider: k,
          Element: O,
          ForwardRef: I,
          Fragment: j,
          Lazy: B,
          Memo: M,
          Portal: A,
          Profiler: $,
          StrictMode: E,
          Suspense: D,
          isAsyncMode: function(e) {
            return V(e) || q(e) === x
          },
          isConcurrentMode: V,
          isContextConsumer: function(e) {
            return q(e) === T
          },
          isContextProvider: function(e) {
            return q(e) === k
          },
          isElement: function(e) {
            return "object" === c(e) && null !== e && e.$$typeof === O
          },
          isForwardRef: function(e) {
            return q(e) === I
          },
          isFragment: function(e) {
            return q(e) === j
          },
          isLazy: function(e) {
            return q(e) === B
          },
          isMemo: function(e) {
            return q(e) === M
          },
          isPortal: function(e) {
            return q(e) === A
          },
          isProfiler: function(e) {
            return q(e) === $
          },
          isStrictMode: function(e) {
            return q(e) === E
          },
          isSuspense: function(e) {
            return q(e) === D
          },
          isValidElementType: function(e) {
            return "string" == typeof e || "function" == typeof e || e === j || e === R || e === $ || e === E || e === D || e === L || "object" === c(e) && null !== e && (e.$$typeof === B || e.$$typeof === M || e.$$typeof === k || e.$$typeof === T || e.$$typeof === I || e.$$typeof === U || e.$$typeof === W || e.$$typeof === N || e.$$typeof === F)
          },
          typeOf: q
        };
        (Y = C((function(e, t) {}))).AsyncMode, Y.ConcurrentMode, Y.ContextConsumer, Y.ContextProvider, Y.Element, Y.ForwardRef, Y.Fragment, Y.Lazy, Y.Memo, Y.Portal, Y.Profiler, Y.StrictMode, Y.Suspense, Y.isAsyncMode, Y.isConcurrentMode, Y.isContextConsumer, Y.isContextProvider, Y.isElement, Y.isForwardRef, Y.isFragment, Y.isLazy, Y.isMemo, Y.isPortal, Y.isProfiler, Y.isStrictMode, Y.isSuspense, Y.isValidElementType, Y.typeOf, C((function(e) {
          e.exports = H
        })), Object.getOwnPropertySymbols, Object.prototype.hasOwnProperty, Object.prototype.propertyIsEnumerable, ! function() {
          try {
            if (Object.assign) {
              var e = new String("abc");
              if (e[5] = "de", "5" !== Object.getOwnPropertyNames(e)[0]) {
                for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
                var r;
                if ("0123456789" === Object.getOwnPropertyNames(t).map((function(e) {
                    return t[e]
                  })).join("")) return r = {}, "abcdefghijklmnopqrst".split("").forEach((function(e) {
                  r[e] = e
                })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("") ? 1 : void 0
              }
            }
          } catch (e) {}
        }() || Object.assign;

        function Q() {}

        function z() {}
        Function.call.bind(Object.prototype.hasOwnProperty), z.resetWarningCache = Q;
        var G = C((function(e) {
            e.exports = function() {
              function e(e, t, n, r, o, i) {
                if ("SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED" !== i) throw (i = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")).name = "Invariant Violation", i
              }

              function t() {
                return e
              }
              var n = {
                array: e.isRequired = e,
                bool: e,
                func: e,
                number: e,
                object: e,
                string: e,
                symbol: e,
                any: e,
                arrayOf: t,
                element: e,
                elementType: e,
                instanceOf: t,
                node: e,
                objectOf: t,
                oneOf: t,
                oneOfType: t,
                shape: t,
                exact: t,
                checkPropTypes: z,
                resetWarningCache: Q
              };
              return n.PropTypes = n
            }()
          })),
          Y = "object" == c(t) && t && t.Object === Object && t,
          J = (t = "object" == ("undefined" == typeof self ? "undefined" : c(self)) && self && self.Object === Object && self, Y = (Y || t || {
            Function: Function,
            Boolean: Boolean,
            Object: Object,
            Number: Number,
            Array: Array,
            Date: Date,
            String: String,
            Symbol: Symbol,
            Error: Error,
            TypeError: TypeError,
            Map: Map,
            Set: Set,
            WeakMap: WeakMap,
            WeakSet: WeakSet,
            ArrayBuffer: ArrayBuffer,
            Math: Math,
            Promise: Promise,
            RegExp: RegExp,
            DataView: DataView,
            isFinite: isFinite,
            parseInt: parseInt,
            parseFloat: parseFloat,
            Float32Array: Float32Array,
            Float64Array: Float64Array,
            Int8Array: Int8Array,
            Int16Array: Int16Array,
            Int32Array: Int32Array,
            Uint8Array: Uint8Array,
            Uint16Array: Uint16Array,
            Uint32Array: Uint32Array,
            Uint8ClampedArray: Uint8ClampedArray,
            setTimeout: setTimeout,
            clearTimeout: clearTimeout,
            setInterval: setInterval,
            clearInterval: clearInterval
          }).Symbol, (t = Object.prototype).hasOwnProperty),
          K = t.toString,
          X = Y ? Y.toStringTag : void 0,
          Z = function(e) {
            var t = J.call(e, X),
              n = e[X];
            try {
              e[X] = void 0
            } catch (e) {}
            var r = K.call(e);
            return t ? e[X] = n : delete e[X], r
          },
          ee = Object.prototype.toString,
          te = function(e) {
            return ee.call(e)
          },
          ne = Y ? Y.toStringTag : void 0,
          re = function(e) {
            return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : (ne && ne in Object(e) ? Z : te)(e)
          },
          oe = function(e, t) {
            return function(n) {
              return e(t(n))
            }
          }(Object.getPrototypeOf, Object),
          ie = (t = Function.prototype, Y = Object.prototype, t.toString),
          ae = Y.hasOwnProperty,
          ce = ie.call(Object),
          ue = function(e) {
            return !(! function(e) {
              return null != e && "object" == c(e)
            }(e) || "[object Object]" != re(e)) && (null === (e = oe(e)) || "function" == typeof(e = ae.call(e, "constructor") && e.constructor) && e instanceof e && ie.call(e) == ce)
          };

        function se(e) {
          if (e && ue(e)) {
            for (var t in e)
              if (e.hasOwnProperty(t)) return;
            return 1
          }
        }

        function fe(e) {
          return "function" == typeof e
        }

        function le(e) {
          return Array.isArray(e)
        }
        var pe = Object.keys,
          de = Object.prototype.hasOwnProperty;

        function he(e) {
          for (var t, n, r, o = decodeURIComponent, i = e.split("&"), a = {}, c = 0, u = i.length; c < u; ++c)(r = i[c]).length && (r = (n = r.indexOf("=")) < 0 ? (t = o(r), "") : (t = o(r.slice(0, n)), o(r.slice(n + 1))), "string" == typeof a[t] && (a[t] = [a[t]]), le(a[t]) ? a[t].push(r) : a[t] = r);
          return a
        }
        var ye, ge = (new Date).getTime().toString(),
          me = 1,
          ve = 0;

        function be() {
          return String(ve++)
        }
        try {
          ye = new Map
        } catch (t) {
          ye = new w
        }
        var _e = 0,
          Se = {};

        function we(e, t) {
          Se[e] = t
        }

        function Pe(e, t) {
          var n = Se[e];
          return t && delete Se[e], n
        }

        function Ce(e) {
          return e in Se
        }
        var Oe = new(function() {
            function e() {
              u(this, e), l(this, "map", {}), l(this, "observers", {})
            }
            return f(e, [{
              key: "set",
              value: function() {
                var e, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                  n = 1 < arguments.length ? arguments[1] : void 0,
                  r = 2 < arguments.length ? arguments[2] : void 0;
                n && (r && this.delete(r), e = this.observers, this.map[n] || Object.defineProperty(this.map, n, {
                  configurable: !0,
                  get: function() {
                    return this["__".concat(n)]
                  },
                  set: function(t) {
                    this["__".concat(n)] = t;
                    var r, o = e[n] && e[n].component,
                      i = e[n] && e[n].ComponentClass;
                    o && i && o.__isReady && (r = o.$scope && o.$scope.data && o.$scope.data.extraProps || null, i = Te(i.defaultProps, t, o.props, r), o.props = i, P((function() {
                      o._unsafeCallUpdate = !0, Me(o), o._unsafeCallUpdate = !1
                    })))
                  }
                }), this.map[n] = t)
              }
            }, {
              key: "delete",
              value: function(e) {
                delete this.map[e], delete this.map["__".concat(e)], delete this.observers[e]
              }
            }]), e
          }()),
          Ae = "__key_",
          je = "__preload_",
          Ee = "preload",
          $e = "$preloadComponent",
          ke = ["onPullDownRefresh", "onReachBottom", "onShareAppMessage", "onPageScroll", "onTabItemTap", "onResize"];

        function Te(e, t, n, r) {
          var o = 0 < arguments.length && void 0 !== e ? e : {},
            i = (e = 1 < arguments.length && void 0 !== t ? t : {}, t = 2 < arguments.length && void 0 !== n ? n : {}, n = 3 < arguments.length ? r : void 0, Object.assign({}, t, e));
          if (!se(o))
            for (var a in o) void 0 === i[a] && (i[a] = o[a]);
          return n ? Object.assign({}, i, n) : i
        }

        function xe(e, t, n) {
          var r, o;
          n = n || [], "componentDidMount" === t && (e.$$refs && 0 < e.$$refs.length && (r = {}, e.$$refs.forEach((function(t) {
            var n;
            n = "component" === t.type ? (n = e.$scope.selectComponent("#".concat(t.id))) ? n.$component || n : null : wx.createSelectorQuery().in(e.$scope).select("#".concat(t.id)), a.commitAttachRef(t, n, e, r, !0), t.target = n
          })), e.refs = Object.assign({}, e.refs || {}, r)), e.$$hasLoopRef) && (a.Current.current = e, a.Current.index = 0, e._disableEffect = !0, e._createData(e.state, e.props, !0), e._disableEffect = !1, a.Current.current = null), "componentWillUnmount" === t && (o = e.$scope.data.compid) && Oe.delete(o), e[t] && "function" == typeof e[t] && (o = e[t]).call.apply(o, [e].concat(v(n))), "componentWillMount" === t && (e._dirty = !1, e._disable = !1, e.state = e.getState()), "componentWillUnmount" === t && (e._dirty = !0, e._disable = !0, e.$router = {
            params: {},
            path: ""
          }, e._pendingStates = [], e._pendingCallbacks = [], a.detachAllRef(e))
        }

        function Re(e, t) {
          this.$component.__isReady || (this.$component.__isReady = !0, t ? this.$component.$router.path = function() {
            var e;
            return function(e) {
              return "/" === e.charAt(0) ? e : "/" + e
            }((e = (e = getCurrentPages())[e.length - 1]).route || e.__route__)
          }() : ((t = this.data.compid) && (Oe.observers[t] = {
            component: this.$component,
            ComponentClass: e
          }), e = Te(e.defaultProps, Oe.map[t], this.$component.props, this.data.extraProps), this.$component.props = e), function(e) {
            var t = e.props;
            e.__componentWillMountTriggered || e._constructor && e._constructor(t);
            var n = Le(e, t, e.state);
            void 0 !== n && (e.state = n), e._dirty = !1, e._disable = !1, e._isForceUpdate = !1, e.__componentWillMountTriggered || (e.__componentWillMountTriggered = !0, De(e)) || xe(e, "componentWillMount"), Be(e, t, e.state), e.prevProps = e.props, e.prevState = e.state
          }(this.$component))
        }
        var Ie = void 0 === o || !o.env || !1;

        function De(e) {
          var t = e.constructor.getDerivedStateFromProps;
          e = e.getSnapshotBeforeUpdate;
          return fe(t) || fe(e)
        }

        function Le(e, t, n) {
          var r;
          return fe(e = e.constructor.getDerivedStateFromProps) && void 0 !== (e = e(t, n)) ? Object.assign({}, n, e) : r
        }

        function Me(e) {
          var t = e.props,
            n = e.__propTypes,
            r = (Ie && n && (void 0 === (o = e.constructor.name) && (o = le(r = e.constructor.toString().match(/^function\s*([^\s(]+)/)) ? r[0] : "Component"), G.checkPropTypes(n, t, "prop", o)), e.prevProps || t),
            o = (n = (e.props = r, e.__mounted && !0 === e._unsafeCallUpdate && !De(e) && e.componentWillReceiveProps && (e._disable = !0, e.componentWillReceiveProps(t), e._disable = !1), e.getState()), e.prevState || n),
            i = (void 0 !== (i = Le(e, t, n)) && (n = i), !1);
          e.__mounted && ("function" != typeof e.shouldComponentUpdate || e._isForceUpdate || !1 !== e.shouldComponentUpdate(t, n) ? !De(e) && fe(e.componentWillUpdate) && e.componentWillUpdate(t, n) : i = !0), e.props = t, e.state = n, e._dirty = !1, e._isForceUpdate = !1, i || Be(e, r, o), e.prevProps = e.props, e.prevState = e.state
        }

        function Be(e, t, n) {
          var r, o, i = e.state,
            u = void 0 === (u = e.props) ? {} : u,
            s = i || {},
            f = (i = (e._createData && (e.__isReady && (function(e) {
              var t, n = e.constructor.contextType;
              n && (null === (t = (n = n.context).emitter) ? e.context = n._defaultValue : (e._hasContext || (e._hasContext = !0, t.on((function(t) {
                return Ue(e)
              }))), e.context = t.value))
            }(e), a.Current.current = e, a.Current.index = 0, a.invokeEffects(e, !0)), s = e._createData(i, u) || s, e.__isReady) && (a.Current.current = null), s = Object.assign({}, u, s), e.$usedState && e.$usedState.length && (r = {}, e.$usedState.forEach((function(e) {
              var t = a.internal_safe_get(s, e);
              if (void 0 !== t)
                if ("object" === c(t)) {
                  if (se(t)) return a.internal_safe_set(r, e, {});
                  se(t = function e(t) {
                    if (le(t))
                      for (var n = [], r = t.length, o = 0; o < r; o++) n.push(e(t[o]));
                    else {
                      if (!ue(t)) return t;
                      for (var i in n = {}, t) {
                        var a = e(t[i]);
                        n[i] = a
                      }
                    }
                    return n
                  }(t)) || a.internal_safe_set(r, e, t)
                } else a.internal_safe_set(r, e, t)
            })), s = r), s.$taroCompReady = !0, a.getIsUsingDiff() ? function e(t, n, r, o) {
              for (var i = 2 < arguments.length && void 0 !== r ? r : {}, a = 3 < arguments.length && void 0 !== o ? o : "", u = pe(t), s = u.length, f = function(r) {
                  r = u[r];
                  var o, s, f = t[r],
                    l = n[r],
                    p = "".concat(a).concat(r);
                  if (/^\$compid__/.test(r)) i[p] = f;
                  else {
                    if (f === l) return "continue";
                    de.call(n, r) && c(f) === c(l) && "object" === c(f) && (r = le(f)) === (o = le(l)) ? r && o ? f.length < l.length ? i[p] = f : function t(n, r, o, i) {
                      for (var a = 2 < arguments.length && void 0 !== o ? o : {}, u = 3 < arguments.length && void 0 !== i ? i : "", s = n.length, f = function(o) {
                          var i, s, f, l = n[o],
                            p = r[o];
                          o = "".concat(u, "[").concat(o, "]");
                          if (l === p) return "continue";
                          c(l) !== c(p) || "object" !== c(l) || (i = le(l)) !== (s = le(p)) ? a[o] = l : i && s ? l.length < p.length ? a[o] = l : t(l, p, a, "".concat(o)) : l && p && !(pe(l).length < pe(p).length) && ((f = ue(l)) && Object.keys(p).some((function(e) {
                            if (void 0 === l[e] && void 0 !== p[e]) return !(f = !1)
                          })), f) ? e(l, p, a, "".concat(o, ".")) : a[o] = l
                        }, l = 0; l < s; l++) f(l)
                    }(f, l, i, "".concat(p)) : f && l && ((s = ue(f)) && Object.keys(l).some((function(e) {
                      if (void 0 === f[e] && void 0 !== l[e]) return !(s = !1)
                    })), s) ? e(f, l, i, "".concat(p, ".")) : i[p] = f : i[p] = f
                  }
                }, l = 0; l < s; l++) f(l);
              return i
            }(s, e.$scope.data) : s), e.__mounted),
            l = (f && (o = function(e, t, n) {
              var r, o = e.getSnapshotBeforeUpdate;
              return fe(o) ? o.call(e, t, n) : r
            }(e, t, n)), []);
          e._pendingCallbacks && e._pendingCallbacks.length && (l = e._pendingCallbacks, e._pendingCallbacks = []), u = function() {
            if (a.invokeEffects(e), f && (e.$$refs && 0 < e.$$refs.length && e.$$refs.forEach((function(t) {
                var n;
                "component" === t.type && (n = (n = e.$scope.selectComponent("#".concat(t.id))) ? n.$component || n : null) !== t.target && (a.commitAttachRef(t, n, e, e.refs), t.target = n)
              })), e.$$hasLoopRef && (a.Current.current = e, a.Current.index = 0, e._disableEffect = !0, e._createData(e.state, e.props, !0), e._disableEffect = !1, a.Current.current = null), fe(e.componentDidUpdate)) && e.componentDidUpdate(t, n, o), l.length)
              for (var r = l.length; 0 <= --r;) "function" == typeof l[r] && l[r].call(e)
          };
          0 === Object.keys(i).length ? (u(), a.invokeEffects(e)) : e.$scope.setData(i, u)
        }
        var Fe = [];

        function Ue(e, t) {
          e._isForceUpdate = 1 < arguments.length && void 0 !== t && t, e._dirty || (e._dirty = !0, 1 !== Fe.push(e)) || P((function() {
            ! function() {
              var e, t = Fe;
              for (Fe = []; e = t.pop();) e._dirty && Me(e)
            }()
          }))
        }
        var We = "preload",
          Ne = function() {
            function e() {
              var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                n = 1 < arguments.length ? arguments[1] : void 0;
              u(this, e), l(this, "__computed", {}), l(this, "__props", {}), l(this, "__isReady", !1), l(this, "__mounted", !1), l(this, "context", {}), l(this, "_dirty", !0), l(this, "_disable", !0), l(this, "_isForceUpdate", !1), l(this, "_pendingStates", []), l(this, "_pendingCallbacks", []), l(this, "$componentType", ""), l(this, "$router", {
                params: {},
                path: ""
              }), l(this, "_afterScheduleEffect", !1), l(this, "_disableEffect", !1), l(this, "hooks", []), l(this, "effects", []), l(this, "layoutEffects", []), this.state = {}, this.props = t, this.$componentType = n ? "PAGE" : "COMPONENT", this.$prefix = String(_e++), this.isTaroComponent = this.$componentType && this.$router && this._pendingStates
            }
            return f(e, [{
              key: "_constructor",
              value: function(e) {
                this.props = e || {}
              }
            }, {
              key: "_init",
              value: function(e) {
                this.$scope = e
              }
            }, {
              key: "setState",
              value: function(e, t) {
                e && (this._pendingStates = this._pendingStates || []).push(e), fe(t) && (this._pendingCallbacks = this._pendingCallbacks || []).push(t), this._disable || Ue(this, t === a.internal_force_update)
              }
            }, {
              key: "getState",
              value: function() {
                var e = this,
                  t = this._pendingStates,
                  n = this.state,
                  r = this.props,
                  o = Object.assign({}, n);
                return delete o.__data, t.length && (n = t.concat(), this._pendingStates.length = 0, n.forEach((function(t) {
                  fe(t) && (t = t.call(e, o, r)), Object.assign(o, t)
                }))), o
              }
            }, {
              key: "forceUpdate",
              value: function(e) {
                fe(e) && (this._pendingCallbacks = this._pendingCallbacks || []).push(e), this._isForceUpdate = !0, Me(this)
              }
            }, {
              key: "$preload",
              value: function(e, t) {
                var n = Pe(We) || {};
                if ("object" === c(e))
                  for (var r in e) n[r] = e[r];
                else n[e] = t;
                we(We, n)
              }
            }, {
              key: "__triggerPropsFn",
              value: function(e, t) {
                var n, r = e.split("."),
                  o = "__event_" + r.shift();
                o in this ? (n = t.shift(), (0 < r.length ? a.internal_safe_get(this[o], r.join(".")) : this[o]).apply(n, t)) : (r = e.toLocaleLowerCase(), o = {
                  __isCustomEvt: !0,
                  __arguments: t
                }, 0 < t.length && (o.value = t.slice(1)), this.$scope.triggerEvent(r, o))
              }
            }]), e
          }(),
          qe = (t = function() {
            ! function(e, t) {
              if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
              e.prototype = Object.create(t && t.prototype, {
                constructor: {
                  value: e,
                  writable: !0,
                  configurable: !0
                }
              }), t && y(e, t)
            }(t, Ne);
            var e = m(t);

            function t() {
              var n;
              u(this, t);
              for (var r = arguments.length, o = new Array(r), i = 0; i < r; i++) o[i] = arguments[i];
              return l(g(n = e.call.apply(e, [this].concat(o))), "isPureComponent", !0), n
            }
            return f(t, [{
              key: "shouldComponentUpdate",
              value: function(e, t) {
                return !S(this.props, e) || !S(this.state, t)
              }
            }]), t
          }(), {
            MAX_REQUEST: 10,
            queue: [],
            pendingQueue: [],
            request: function(e) {
              return this.queue.push(e), this.run()
            },
            run: function() {
              var e = this;
              if (this.queue.length)
                for (var t = function() {
                    var t = e.queue.shift(),
                      n = t.success,
                      r = t.fail;
                    return t.success = function() {
                      e.pendingQueue = e.pendingQueue.filter((function(e) {
                        return e !== t
                      })), e.run();
                      for (var r = arguments.length, o = new Array(r), i = 0; i < r; i++) o[i] = arguments[i];
                      n && n.apply(t, o)
                    }, t.fail = function() {
                      e.pendingQueue = e.pendingQueue.filter((function(e) {
                        return e !== t
                      })), e.run();
                      for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
                      r && r.apply(t, o)
                    }, e.pendingQueue.push(t), {
                      v: wx.request(t)
                    }
                  }; this.pendingQueue.length < this.MAX_REQUEST;) {
                  var n = t();
                  if ("object" === c(n)) return n.v
                }
            }
          }),
          Ve = new a.Link((function(e) {
            return function(e) {
              "string" == typeof(e = e || {}) && (e = {
                url: e
              });
              var t, n = e.success,
                r = e.fail,
                o = e.complete,
                i = new Promise((function(i, a) {
                  e.success = function(e) {
                    n && n(e), i(e)
                  }, e.fail = function(e) {
                    r && r(e), a(e)
                  }, e.complete = function(e) {
                    o && o(e)
                  }, t = qe.request(e)
                }));
              return i.abort = function(e) {
                return e && e(), t && t.abort(), i
              }, i
            }(e.requestParams)
          }));

        function He() {
          var e = wx.getSystemInfoSync().platform.toLowerCase();
          return "android" === e || "devtools" === e
        }

        function Qe(e) {
          ! function(e) {
            var t = Object.assign({}, a.onAndSyncApis, a.noPromiseApis, a.otherApis),
              n = {
                navigateTo: !0,
                redirectTo: !0,
                reLaunch: !0
              };
            Object.keys(t).forEach((function(t) {
              t in wx ? a.onAndSyncApis[t] || a.noPromiseApis[t] ? e[t] = function() {
                for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                var o = n.length,
                  i = n.concat(),
                  a = i[o - 1];
                return a && a.isTaroComponent && a.$scope && i.splice(o - 1, 1, a.$scope), wx[t].apply(wx, i)
              } : e[t] = function(e) {
                for (var r = arguments.length, o = new Array(1 < r ? r - 1 : 0), i = 1; i < r; i++) o[i - 1] = arguments[i];
                e = e || {};
                var a, c, u, s, f = null,
                  l = Object.assign({}, e);
                if ("string" == typeof e) return o.length ? (u = wx)[t].apply(u, [e].concat(o)) : wx[t](e);
                "navigateTo" !== t && "redirectTo" !== t || (u = Pe(u = -1 < (u = l.url ? l.url.replace(/^\//, "") : "").indexOf("?") ? u.split("?")[0] : u)) && (u = new u).componentWillPreload && (s = ge + me++, c = he((a = -1 < (c = l.url.indexOf("?"))) ? l.url.substring(c + 1, l.url.length) : ""), l.url += (a ? "&" : "?") + "".concat("__preload_", "=").concat(s), we(s, u.componentWillPreload(c)), we("$preloadComponent", u)), n[t] && (u = he((c = -1 < (s = (a = l.url = l.url || "").indexOf("?"))) ? a.substring(s + 1, a.length) : ""), s = ge + me++, l.url += (c ? "&" : "?") + "".concat("__key_", "=").concat(s), we(s, u));
                var p = new Promise((function(n, r) {
                  var i;
                  ["fail", "success", "complete"].forEach((function(o) {
                    l[o] = function(i) {
                      e[o] && e[o](i), "success" === o ? n("connectSocket" === t ? Promise.resolve().then((function() {
                        return Object.assign(f, i)
                      })) : i) : "fail" === o && r(i)
                    }
                  })), f = o.length ? (i = wx)[t].apply(i, [l].concat(o)) : wx[t](l)
                }));
                return "uploadFile" !== t && "downloadFile" !== t || (p.progress = function(e) {
                  return f && f.onProgressUpdate(e), p
                }, p.headersReceived = function(e) {
                  return f && f.onHeadersReceived(e), p
                }, p.abort = function(e) {
                  return e && e(), f && f.abort(), p
                }), p
              } : e[t] = function() {}
            }))
          }(e), e.request = Ve.request.bind(Ve), e.addInterceptor = Ve.addInterceptor.bind(Ve), e.cleanInterceptors = Ve.cleanInterceptors.bind(Ve), e.getCurrentPages = getCurrentPages, e.getApp = getApp, e.requirePlugin = requirePlugin, e.initPxTransform = a.initPxTransform.bind(e), e.pxTransform = function(e) {
              var t, n = void 0 === (n = (t = this.config || {}).designWidth) ? 750 : n;
              if (n in (t = void 0 === (t = t.deviceRatio) ? {
                  640: 1.17,
                  750: 1,
                  828: .905
                } : t)) return parseInt(e, 10) / t[n] + "rpx";
              throw new Error("deviceRatio 配置中不存在 ".concat(n, " 的设置！"))
            }.bind(e), e.canIUseWebp = He,
            function(e) {
              var t = wx.cloud || {},
                n = {};
              ["init", "database", "uploadFile", "downloadFile", "getTempFileURL", "deleteFile", "callFunction", "CloudID"].forEach((function(e) {
                n[e] = t[e]
              })), e.cloud = n
            }(e),
            function(e) {
              var t = wx.env || {},
                n = {};
              ["USER_DATA_PATH"].forEach((function(e) {
                return n[e] = t[e]
              })), e.env = n
            }(e)
        }
        Qe(Y = {
          Component: Ne,
          PureComponent: t,
          createApp: function(e) {
            var t = new e;
            return Object.assign({
              onLaunch: function(e) {
                t.$app = this, t.$app.$router = t.$router = {
                  params: e
                }, t.componentWillMount && t.componentWillMount(), t.componentDidMount && t.componentDidMount()
              },
              onShow: function(e) {
                Object.assign(t.$router.params, e), t.componentDidShow && t.componentDidShow()
              },
              onHide: function() {
                t.componentDidHide && t.componentDidHide()
              },
              onError: function(e) {
                t.componentDidCatchError && t.componentDidCatchError(e)
              },
              onPageNotFound: function(e) {
                t.componentDidNotFound && t.componentDidNotFound(e)
              }
            }, t)
          },
          initNativeApi: Qe,
          Events: a.Events,
          eventCenter: a.eventCenter,
          getEnv: a.getEnv,
          createRef: a.createRef,
          render: a.render,
          ENV_TYPE: a.ENV_TYPE,
          internal_safe_get: a.internal_safe_get,
          internal_safe_set: a.internal_safe_set,
          internal_inline_style: a.internal_inline_style,
          createComponent: function(e, t) {
            var n = Te(e.defaultProps),
              r = new e(n);
            r._constructor && r._constructor(n);
            try {
              a.Current.current = r, a.Current.index = 0, r.state = r._createData() || r.state
            } catch (e) {}
            var o = {
              data: Object.assign({}, {}, r.props, r.state),
              created: function() {
                var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                t && Ce($e) ? (this.$component = Pe($e, !0), this.$component.$componentType = "PAGE") : this.$component = new e({}, t), this.$component._init(this), this.$component.render = this.$component._createData, this.$component.__propTypes = e.propTypes, Object.assign(this.$component.$router.params, n)
              },
              attached: function() {
                var n, r, o;
                t && ({}, o = (r = Ce(this.data[Ae])) ? Object.assign({}, e.defaultParams, Pe(this.data[Ae], !0)) : function(e, t) {
                  var n, r = 1 < arguments.length && void 0 !== t ? t : {},
                    o = {};
                  for (n in r) o[n] = (n in e ? e : r)[n];
                  return o
                }(this.data, e.defaultParams), Ce(Ee) && (n = Pe(Ee, !0), this.$component.$router.preload = n), Object.assign(this.$component.$router.params, o), Ce(this.data[je]) ? this.$component.$preloadData = Pe(this.data[je], !0) : this.$component.$preloadData = null), !r && t || Re.apply(this, [e, t])
              },
              ready: function() {
                t || this.$component.__mounted || (this.$component.__mounted = !0, xe(this.$component, "componentDidMount"))
              },
              detached: function() {
                var e;
                le(e = (xe(e = this.$component, "componentWillUnmount"), e.hooks.forEach((function(e) {
                  fe(e.cleanup) && e.cleanup()
                })), e.$$renderPropsEvents)) && e.forEach((function(e) {
                  return a.eventCenter.off(e)
                }))
              }
            };
            return t ? (o.methods = o.methods || {}, o.methods.onLoad = function() {
                this.$component.__isReady || (Object.assign(this.$component.$router.params, 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}), Re.apply(this, [e, t]))
              }, o.methods.onReady = function() {
                this.$component.__mounted = !0, xe(this.$component, "componentDidMount")
              }, o.methods.onShow = function() {
                xe(this.$component, "componentDidShow")
              }, o.methods.onHide = function() {
                xe(this.$component, "componentDidHide")
              }, ke.forEach((function(e) {
                r[e] && "function" == typeof r[e] && (o.methods[e] = function() {
                  var t, n = this.$component;
                  if (n && n[e] && "function" == typeof n[e]) return (t = n[e]).call.apply(t, [n].concat(Array.prototype.slice.call(arguments)))
                })
              })), __wxRoute && we(__wxRoute, e)) : (o.pageLifetimes = o.pageLifetimes || {}, o.pageLifetimes.show = function() {
                xe(this.$component, "componentDidShow")
              }, o.pageLifetimes.hide = function() {
                xe(this.$component, "componentDidHide")
              }, o.pageLifetimes.resize = function() {
                xe(this.$component, "onResize")
              }),
              function(e, t, n) {
                if (e.properties = {}, n) {
                  e.properties[Ae] = {
                    type: null,
                    value: null
                  }, e.properties[je] = {
                    type: null,
                    value: null
                  };
                  var r, o = t.defaultParams || {};
                  for (r in o) o.hasOwnProperty(r) && (e.properties[r] = {
                    type: null,
                    value: null
                  })
                }
                e.properties.compid = {
                  type: null,
                  value: null,
                  observer: function(e, r) {
                    var o, i = this;
                    Re.apply(this, [t, n]), r && r !== e && (r = this.data.extraProps, o = this.$component, Oe.observers[e] = {
                      component: o,
                      ComponentClass: o.constructor
                    }, e = Te(o.constructor.defaultProps, Oe.map[e], o.props, r || null), this.$component.props = e, P((function() {
                      i.$component._unsafeCallUpdate = !0, Me(i.$component), i.$component._unsafeCallUpdate = !1
                    })))
                  }
                }, e.properties.extraProps = {
                  type: null,
                  value: null,
                  observer: function() {
                    var e, n = this;
                    this.$component && this.$component.__isReady && (e = Te(t.defaultProps, {}, this.$component.props, this.data.extraProps), this.$component.props = e, P((function() {
                      n.$component._unsafeCallUpdate = !0, Me(n.$component), n.$component._unsafeCallUpdate = !1
                    })))
                  }
                }
              }(o, e, t),
              function(e, t) {
                t.behaviors && (e.behaviors = t.behaviors)
              }(o, e),
              function(e, t) {
                for (var n in t) "function" == typeof t[n] && (e[n] = t[n]);
                Object.getOwnPropertyNames(t).forEach((function(n) {
                  ["arguments", "caller", "length", "name", "prototype"].indexOf(n) < 0 && "function" == typeof t[n] && (e[n] = t[n])
                }))
              }(o, e),
              function(e, t) {
                t.options && (e.options = t.options)
              }(o, e),
              function(e, t) {
                (t = t.multipleSlots) && (e.options = d(d({}, e.options), {
                  multipleSlots: t
                }))
              }(o, e), e.$$events && function(e, t) {
                e.methods = e.methods || {};
                var n = e.methods;
                t.forEach((function(e) {
                  ! function(e, t) {
                    t[e] || (t[e] = function(t) {
                      t && (t.preventDefault = function() {}, t.stopPropagation = function() {}, t.currentTarget = t.currentTarget || t.target || {}, t.target && Object.assign(t.target, t.detail), Object.assign(t.currentTarget, t.detail));
                      var n, r, o, i, a, c, u, s, f, l = this.$component;
                      if (l && l[e]) return n = l, f = -1 < e.indexOf("funPrivate"), [], o = [], a = !(i = []), c = t.currentTarget.dataset || {}, u = {}, s = t.type.toLocaleLowerCase(), Object.keys(c).forEach((function(e) {
                        var t = e.toLocaleLowerCase();
                        /^e/.test(t) && 0 <= (t = t.replace(/^e/, "")).indexOf(s) && (t = t.replace(s, ""), /^(a[a-z]|so)$/.test(t)) && (u[t] = c[e])
                      })), t.detail && t.detail.__arguments && 0 < t.detail.__arguments.length && (o = t.detail.__arguments), r = (f ? (f = null, "so" in u && ("this" !== u.so && (f = u.so), a = !0, delete u.so), 0 < o.length && (!a && o[0] && (n = o[0]), o.shift()), se(u) || (i = Object.keys(u).sort().map((function(e) {
                        return u[e]
                      }))), [f]) : ("so" in u && ("this" !== u.so && (n = u.so), a = !0, delete u.so), 0 < o.length && (!a && o[0] && (n = o[0]), o.shift()), se(u) || (i = Object.keys(u).sort().map((function(e) {
                        return u[e]
                      }))), [])).concat(v(i), v(o), [t]), l[e].apply(n, r)
                    })
                  }(e, n)
                }))
              }(o, e.$$events), e.externalClasses && e.externalClasses.length && (o.externalClasses = e.externalClasses), o
          },
          internal_get_original: a.internal_get_original,
          handleLoopRef: a.handleLoopRef((function(e, t, n) {
            var r;
            return e && (r = "component" === n ? (r = e.selectComponent(t)) ? r.$component || r : null : wx.createSelectorQuery().in(e).select(t)) || null
          })),
          propsManager: Oe,
          interceptors: a.interceptors,
          RefsArray: a.RefsArray,
          genCompid: function(e, t) {
            var n;
            return a.Current && a.Current.current && a.Current.current.$scope ? (n = ye.get(e), t ? (t = be(), ye.set(e, t), [n, t]) : (t = n || be(), n || ye.set(e, t), [null, t])) : []
          },
          useEffect: a.useEffect,
          useLayoutEffect: a.useLayoutEffect,
          useReducer: a.useReducer,
          useState: a.useState,
          useDidShow: a.useDidShow,
          useDidHide: a.useDidHide,
          usePullDownRefresh: a.usePullDownRefresh,
          useReachBottom: a.useReachBottom,
          usePageScroll: a.usePageScroll,
          useResize: a.useResize,
          useShareAppMessage: a.useShareAppMessage,
          useTabItemTap: a.useTabItemTap,
          useRouter: a.useRouter,
          useScope: a.useScope,
          useRef: a.useRef,
          useCallback: a.useCallback,
          useMemo: a.useMemo,
          useImperativeHandle: a.useImperativeHandle,
          useContext: a.useContext,
          createContext: a.createContext,
          memo: a.memo,
          shallowEqual: S,
          setIsUsingDiff: a.setIsUsingDiff
        }), n.Taro = Y, n.default = Y
      }).call(this, r(52), r(93))
    },
    94: function(t, n, r) {
      r.r(n),
        function(t) {
          r.d(n, "Component", (function() {
            return m
          })), r.d(n, "Events", (function() {
            return le
          })), r.d(n, "eventCenter", (function() {
            return lt
          })), r.d(n, "getEnv", (function() {
            return ue
          })), r.d(n, "ENV_TYPE", (function() {
            return ae
          })), r.d(n, "render", (function() {
            return pe
          })), r.d(n, "internal_safe_get", (function() {
            return te
          })), r.d(n, "internal_safe_set", (function() {
            return ne
          })), r.d(n, "internal_inline_style", (function() {
            return ie
          })), r.d(n, "internal_get_original", (function() {
            return fe
          })), r.d(n, "internal_force_update", (function() {
            return xe
          })), r.d(n, "noPromiseApis", (function() {
            return we
          })), r.d(n, "onAndSyncApis", (function() {
            return Se
          })), r.d(n, "otherApis", (function() {
            return Pe
          })), r.d(n, "initPxTransform", (function() {
            return Ce
          })), r.d(n, "createRef", (function() {
            return de
          })), r.d(n, "commitAttachRef", (function() {
            return he
          })), r.d(n, "detachAllRef", (function() {
            return ye
          })), r.d(n, "Link", (function() {
            return be
          })), r.d(n, "interceptors", (function() {
            return _e
          })), r.d(n, "RefsArray", (function() {
            return ge
          })), r.d(n, "handleLoopRef", (function() {
            return me
          })), r.d(n, "Current", (function() {
            return Ye
          })), r.d(n, "useEffect", (function() {
            return Xe
          })), r.d(n, "useLayoutEffect", (function() {
            return Ze
          })), r.d(n, "useReducer", (function() {
            return Qe
          })), r.d(n, "useState", (function() {
            return Ie
          })), r.d(n, "useDidShow", (function() {
            return Le
          })), r.d(n, "useDidHide", (function() {
            return Me
          })), r.d(n, "usePullDownRefresh", (function() {
            return Be
          })), r.d(n, "useReachBottom", (function() {
            return Fe
          })), r.d(n, "usePageScroll", (function() {
            return Ue
          })), r.d(n, "useResize", (function() {
            return We
          })), r.d(n, "useShareAppMessage", (function() {
            return Ne
          })), r.d(n, "useTabItemTap", (function() {
            return qe
          })), r.d(n, "useRouter", (function() {
            return Ve
          })), r.d(n, "useScope", (function() {
            return He
          })), r.d(n, "useRef", (function() {
            return et
          })), r.d(n, "useCallback", (function() {
            return rt
          })), r.d(n, "useMemo", (function() {
            return nt
          })), r.d(n, "useImperativeHandle", (function() {
            return ot
          })), r.d(n, "invokeEffects", (function() {
            return Ge
          })), r.d(n, "useContext", (function() {
            return it
          })), r.d(n, "createContext", (function() {
            return ut
          })), r.d(n, "memo", (function() {
            return ft
          })), r.d(n, "getIsUsingDiff", (function() {
            return ke
          })), r.d(n, "setIsUsingDiff", (function() {
            return Te
          }));
          var o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
            return e(t)
          } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
          };

          function i(e) {
            return (i = "function" == typeof Symbol && "symbol" === o(Symbol.iterator) ? function(e) {
              return void 0 === e ? "undefined" : o(e)
            } : function(e) {
              return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : o(e)
            })(e)
          }

          function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }

          function c(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }

          function u(e, t, n) {
            t && c(e.prototype, t), n && c(e, n)
          }

          function s(e, t) {
            var n, r = Object.keys(e);
            return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e), t && (n = n.filter((function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)), r
          }

          function f(e) {
            return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
          }

          function l(e, t) {
            return (l = Object.setPrototypeOf || function(e, t) {
              return e.__proto__ = t, e
            })(e, t)
          }

          function p() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
            } catch (e) {
              return !1
            }
          }

          function d(e, t, n) {
            return (d = p() ? Reflect.construct : function(e, t, n) {
              var r = [null];
              return r.push.apply(r, t), t = new(Function.bind.apply(e, r)), n && l(t, n.prototype), t
            }).apply(null, arguments)
          }

          function h(e, t) {
            return !t || "object" !== (void 0 === t ? "undefined" : o(t)) && "function" != typeof t ? function(e) {
              if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return e
            }(e) : t
          }

          function y(e) {
            return function(e) {
              if (Array.isArray(e)) return g(e)
            }(e) || function(e) {
              if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
            }(e) || function(e, t) {
              var n;
              if (e) return "string" == typeof e ? g(e, t) : "Map" === (n = "Object" === (n = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? g(e, t) : void 0
            }(e) || function() {
              throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
          }

          function g(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
            return r
          }
          "function" != typeof Object.assign && (Object.assign = function(e) {
            if (null == e) throw new TypeError("Cannot convert undefined or null to object");
            for (var t = Object(e), n = 1; n < arguments.length; n++) {
              var r = arguments[n];
              if (null != r)
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o])
            }
            return t
          }), "function" != typeof Object.defineProperties && (Object.defineProperties = function(e, t) {
            if ("object" !== i(e) || null === e) throw new TypeError("bad obj");
            t = Object(t);
            for (var n = Object.keys(t), r = [], o = 0; o < n.length; o++) r.push([n[o], function(e) {
              function t(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
              }

              function n(e) {
                return "function" == typeof e
              }
              if ("object" !== i(e) || null === e) throw new TypeError("bad desc");
              var r = {};
              if (t(e, "enumerable") && (r.enumerable = !!e.enumerable), t(e, "configurable") && (r.configurable = !!e.configurable), t(e, "value") && (r.value = e.value), t(e, "writable") && (r.writable = !!e.writable), t(e, "get")) {
                var o = e.get;
                if (!n(o) && void 0 !== o) throw new TypeError("bad get");
                r.get = o
              }
              if (t(e, "set")) {
                if (!n(o = e.set) && void 0 !== o) throw new TypeError("bad set");
                r.set = o
              }
              if (("get" in r || "set" in r) && ("value" in r || "writable" in r)) throw new TypeError("identity-confused descriptor");
              return r
            }(t[n[o]])]);
            for (o = 0; o < r.length; o++) Object.defineProperty(e, r[o][0], r[o][1]);
            return e
          });
          var m = function e(t) {
              a(this, e), this.state = {}, this.props = t || {}
            },
            v = "__lodash_hash_undefined__",
            b = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
            _ = /^\w*$/,
            S = /^\./,
            w = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
            P = /\\(\\)?/g,
            C = /^\[object .+?Constructor\]$/,
            O = "object" === (void 0 === t ? "undefined" : i(t)) && t && t.Object === Object && t,
            A = "object" === ("undefined" == typeof self ? "undefined" : i(self)) && self && self.Object === Object && self,
            j = (O = O || A || {
              Function: Function,
              Boolean: Boolean,
              Object: Object,
              Number: Number,
              Array: Array,
              Date: Date,
              String: String,
              Symbol: Symbol,
              Error: Error,
              TypeError: TypeError,
              Map: Map,
              Set: Set,
              WeakMap: WeakMap,
              WeakSet: WeakSet,
              ArrayBuffer: ArrayBuffer,
              Math: Math,
              Promise: Promise,
              RegExp: RegExp,
              DataView: DataView,
              isFinite: isFinite,
              parseInt: parseInt,
              parseFloat: parseFloat,
              Float32Array: Float32Array,
              Float64Array: Float64Array,
              Int8Array: Int8Array,
              Int16Array: Int16Array,
              Int32Array: Int32Array,
              Uint8Array: Uint8Array,
              Uint16Array: Uint16Array,
              Uint32Array: Uint32Array,
              Uint8ClampedArray: Uint8ClampedArray,
              setTimeout: setTimeout,
              clearTimeout: clearTimeout,
              setInterval: setInterval,
              clearInterval: clearInterval
            }, /^(?:0|[1-9]\d*)$/),
            E = (A = Array.prototype, Function.prototype),
            $ = Object.prototype,
            k = O["__core-js_shared__"],
            T = (k = /[^.]+$/.exec(k && k.keys && k.keys.IE_PROTO || "")) ? "Symbol(src)_1." + k : "",
            x = E.toString,
            R = $.hasOwnProperty,
            I = $.toString,
            D = RegExp("^" + x.call(R).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
            L = (k = O.Symbol, A.splice),
            M = Q(O, "Map"),
            B = Q(Object, "create"),
            F = (E = k ? k.prototype : void 0) ? E.toString : void 0;

          function U(e) {
            var t = -1,
              n = e ? e.length : 0;
            for (this.clear(); ++t < n;) {
              var r = e[t];
              this.set(r[0], r[1])
            }
          }

          function W(e) {
            var t = -1,
              n = e ? e.length : 0;
            for (this.clear(); ++t < n;) {
              var r = e[t];
              this.set(r[0], r[1])
            }
          }

          function N(e) {
            var t = -1,
              n = e ? e.length : 0;
            for (this.clear(); ++t < n;) {
              var r = e[t];
              this.set(r[0], r[1])
            }
          }

          function q(e, t) {
            for (var n = e.length; n--;)
              if (J(e[n][0], t)) return n;
            return -1
          }

          function V(e) {
            return K(e) ? e : z(e)
          }

          function H(e, t) {
            return e = e.__data__,
              function(e) {
                var t = i(e);
                return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e
              }(t) ? e["string" == typeof t ? "string" : "hash"] : e.map
          }

          function Q(e, t) {
            return function(e) {
              return X(e) && ! function(e) {
                return T && T in e
              }(e) && (function(e) {
                return "[object Function]" == (e = X(e) ? I.call(e) : "") || "[object GeneratorFunction]" == e
              }(e) || function(e) {
                var t = !1;
                if (null != e && "function" != typeof e.toString) try {
                  t = !!(e + "")
                } catch (e) {}
                return t
              }(e) ? D : C).test(function(e) {
                if (null != e) {
                  try {
                    return x.call(e)
                  } catch (e) {}
                  try {
                    return e + ""
                  } catch (e) {}
                }
                return ""
              }(e))
            }(e = function(e, t) {
              return null == e ? void 0 : e[t]
            }(e, t)) ? e : void 0
          }
          U.prototype.clear = function() {
            this.__data__ = B ? B(null) : {}
          }, U.prototype.delete = function(e) {
            return this.has(e) && delete this.__data__[e]
          }, U.prototype.get = function(e) {
            var t, n = this.__data__;
            return B ? (t = n[e]) === v ? void 0 : t : R.call(n, e) ? n[e] : void 0
          }, U.prototype.has = function(e) {
            var t = this.__data__;
            return B ? void 0 !== t[e] : R.call(t, e)
          }, U.prototype.set = function(e, t) {
            return this.__data__[e] = B && void 0 === t ? v : t, this
          }, W.prototype.clear = function() {
            this.__data__ = []
          }, W.prototype.delete = function(e) {
            var t = this.__data__;
            return !((e = q(t, e)) < 0 || (e == t.length - 1 ? t.pop() : L.call(t, e, 1), 0))
          }, W.prototype.get = function(e) {
            var t = this.__data__;
            return (e = q(t, e)) < 0 ? void 0 : t[e][1]
          }, W.prototype.has = function(e) {
            return -1 < q(this.__data__, e)
          }, W.prototype.set = function(e, t) {
            var n = this.__data__,
              r = q(n, e);
            return r < 0 ? n.push([e, t]) : n[r][1] = t, this
          }, N.prototype.clear = function() {
            this.__data__ = {
              hash: new U,
              map: new(M || W),
              string: new U
            }
          }, N.prototype.delete = function(e) {
            return H(this, e).delete(e)
          }, N.prototype.get = function(e) {
            return H(this, e).get(e)
          }, N.prototype.has = function(e) {
            return H(this, e).has(e)
          }, N.prototype.set = function(e, t) {
            return H(this, e).set(e, t), this
          };
          var z = Y((function(e) {
            e = function(e) {
              return null == e ? "" : function(e) {
                var t;
                return "string" == typeof e ? e : Z(e) ? F ? F.call(e) : "" : "0" == (t = e + "") && 1 / e == -1 / 0 ? "-0" : t
              }(e)
            }(e);
            var t = [];
            return S.test(e) && t.push(""), e.replace(w, (function(e, n, r, o) {
              t.push(r ? o.replace(P, "$1") : n || e)
            })), t
          }));

          function G(e) {
            var t;
            return "string" == typeof e || Z(e) ? e : "0" == (t = e + "") && 1 / e == -1 / 0 ? "-0" : t
          }

          function Y(e, t) {
            if ("function" != typeof e || t && "function" != typeof t) throw new TypeError("Expected a function");
            var n = function n() {
              var r = arguments,
                o = t ? t.apply(this, r) : r[0],
                i = n.cache;
              return i.has(o) ? i.get(o) : (r = e.apply(this, r), n.cache = i.set(o, r), r)
            };
            return n.cache = new(Y.Cache || N), n
          }

          function J(e, t) {
            return e === t || e != e && t != t
          }
          Y.Cache = N;
          var K = Array.isArray;

          function X(e) {
            var t = i(e);
            return e && ("object" == t || "function" == t)
          }

          function Z(e) {
            return "symbol" === i(e) || function(e) {
              return !!e && "object" === i(e)
            }(e) && "[object Symbol]" == I.call(e)
          }

          function ee(e, t, n) {
            var r = e[t];
            R.call(e, t) && J(r, n) && (void 0 !== n || t in e) || function(e, t, n) {
              "__proto__" == t ? Object.defineProperty(e, t, {
                configurable: !0,
                enumerable: !0,
                value: n,
                writable: !0
              }) : e[t] = n
            }(e, t, n)
          }

          function te(e, t, n) {
            return void 0 === (e = null == e ? void 0 : function(e, t) {
              for (var n = 0, r = (t = function(e, t) {
                  if (!K(e)) {
                    var n = i(e);
                    return "number" == n || "symbol" == n || "boolean" == n || null == e || Z(e) ? 1 : _.test(e) || !b.test(e) || null != t && e in Object(t)
                  }
                }(t, e) ? [t] : V(t)).length; null != e && n < r;) e = e[G(t[n++])];
              return n && n == r ? e : void 0
            }(e, t)) ? n : e
          }

          function ne(e, t, n) {
            return null == e ? e : function(e, t, n, r) {
              if (X(e))
                for (var o = (t = V(t)).length, a = o - 1, c = -1, u = e; null != u && ++c < o;) {
                  var s, f = G(t[c]),
                    l = n;
                  ee(u, f, l = c != a && (s = u[f], void 0 === (l = r ? r(s, f, u) : void 0)) ? X(s) ? s : function(e, t) {
                    var n = i(e);
                    return (t = null == t ? 9007199254740991 : t) && ("number" == n || "symbol" != n && j.test(e)) && -1 < e && e % 1 == 0 && e < t
                  }(t[c + 1]) ? [] : {} : l), u = u[f]
                }
              return e
            }(e, t, n)
          }
          R = Object.prototype.hasOwnProperty;
          var re = /([A-Z])/g;

          function oe(e) {
            return "-" + e.toLowerCase()
          }

          function ie(e) {
            if (null == e) return "";
            if ("string" == typeof e) return e;
            if (null == e) return "";
            if (function(e) {
                return null != e && "object" === i(e) && !1 === Array.isArray(e)
              }(e)) return Object.keys(e).map((function(t) {
              return function(e) {
                return e.replace(re, oe)
              }(t).concat(":").concat(e[t])
            })).join(";");
            throw new TypeError("style 只能是一个对象或字符串。")
          }
          var ae = {
              WEAPP: "WEAPP",
              WEB: "WEB",
              RN: "RN",
              SWAN: "SWAN",
              ALIPAY: "ALIPAY",
              QUICKAPP: "QUICKAPP",
              TT: "TT",
              QQ: "QQ",
              JD: "JD"
            },
            ce = null;

          function ue() {
            return ce || ("undefined" != typeof jd && jd.getSystemInfo ? (ce = ae.JD, ae.JD) : "undefined" != typeof qq && qq.getSystemInfo ? (ce = ae.QQ, ae.QQ) : "undefined" != typeof tt && tt.getSystemInfo ? (ce = ae.TT, ae.TT) : "undefined" != typeof wx && wx.getSystemInfo ? (ce = ae.WEAPP, ae.WEAPP) : "undefined" != typeof qa && qa.getSystemInfo ? (ce = ae.QUICKAPP, ae.QUICKAPP) : "undefined" != typeof swan && swan.getSystemInfo ? (ce = ae.SWAN, ae.SWAN) : "undefined" != typeof my && my.getSystemInfo ? (ce = ae.ALIPAY, ae.ALIPAY) : void 0 !== t && t.__fbGenNativeModule ? (ce = ae.RN, ae.RN) : "undefined" != typeof window ? (ce = ae.WEB, ae.WEB) : "Unknown environment")
          }
          var se = null;

          function fe(e) {
            return null === se && (se = ue()),
              function(e) {
                return e === Object(e) && "function" != typeof e
              }(e) && e[se === ae.SWAN ? "privateOriginal" : "$original"] || e
          }
          var le = function() {
            function e(t) {
              a(this, e), void 0 !== t && t.callbacks ? this.callbacks = t.callbacks : this.callbacks = {}
            }
            return u(e, [{
              key: "on",
              value: function(t, n, r) {
                var o, i, a, c, u;
                if (n)
                  for (t = t.split(e.eventSplitter), o = this.callbacks; i = t.shift();)(a = (u = o[i]) ? u.tail : {}).next = c = {}, a.context = r, a.callback = n, o[i] = {
                    tail: c,
                    next: u ? u.next : a
                  };
                return this
              }
            }, {
              key: "once",
              value: function(e, t, n) {
                var r = this;
                return this.on(e, (function o() {
                  for (var i = arguments.length, a = new Array(i), c = 0; c < i; c++) a[c] = arguments[c];
                  t.apply(r, a), r.off(e, o, n)
                }), n), this
              }
            }, {
              key: "off",
              value: function(t, n, r) {
                var o, i, a, c, u, s;
                if (i = this.callbacks)
                  if (t || n || r) {
                    for (t = t ? t.split(e.eventSplitter) : Object.keys(i); o = t.shift();)
                      if (a = i[o], delete i[o], a && (n || r))
                        for (c = a.tail;
                          (a = a.next) !== c;) u = a.callback, s = a.context, (n && u !== n || r && s !== r) && this.on(o, u, s)
                  } else delete this.callbacks;
                return this
              }
            }, {
              key: "trigger",
              value: function(t) {
                var n, r, o, i, a;
                if (o = this.callbacks)
                  for (t = t.split(e.eventSplitter), a = [].slice.call(arguments, 1); n = t.shift();)
                    if (r = o[n])
                      for (i = r.tail;
                        (r = r.next) !== i;) r.callback.apply(r.context || this, a);
                return this
              }
            }]), e
          }();

          function pe() {}

          function de() {
            return {
              current: null
            }
          }

          function he(e, t, n, r) {
            4 < arguments.length && void 0 !== arguments[4] && arguments[4] && !t || ("refName" in e && e.refName ? r[e.refName] = t : "fn" in e && "function" == typeof e.fn ? e.fn.call(n, t) : e.fn && "object" === i(e.fn) && "current" in e.fn && (e.fn.current = t))
          }

          function ye(e) {
            e.$$refs && 0 < e.$$refs.length && (e.$$refs.forEach((function(t) {
              "function" == typeof t.fn ? t.fn.call(e, null) : t.fn && "object" === i(t.fn) && "current" in t.fn && (t.fn.current = null), "target" in t && delete t.target
            })), e.refs = {})
          }
          le.eventSplitter = /\s+/;
          var ge = function() {
            ! function(e, t) {
              if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
              e.prototype = Object.create(t && t.prototype, {
                constructor: {
                  value: e,
                  writable: !0,
                  configurable: !0
                }
              }), t && l(e, t)
            }(t, function(e) {
              var t = "function" == typeof Map ? new Map : void 0;
              return function(e) {
                if (null === e || ! function(e) {
                    return -1 !== Function.toString.call(e).indexOf("[native code]")
                  }(e)) return e;
                if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
                if (void 0 !== t) {
                  if (t.has(e)) return t.get(e);
                  t.set(e, n)
                }

                function n() {
                  return d(e, arguments, f(this).constructor)
                }
                return n.prototype = Object.create(e.prototype, {
                  constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                  }
                }), l(n, e)
              }(e)
            }(Array));
            var e = function(e) {
              var t = p();
              return function() {
                var n, r = f(e);
                return h(this, t ? (n = f(this).constructor, Reflect.construct(r, arguments, n)) : r.apply(this, arguments))
              }
            }(t);

            function t() {
              var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [];
              return a(this, t), (n = e.call.apply(e, [this].concat(y(n)))).inited = !1, n
            }
            return u(t, [{
              key: "pushRefs",
              value: function(e) {
                var t = this;
                this.inited || (e.forEach((function(e) {
                  return t.pushRef(e)
                })), this.inited = !0)
              }
            }, {
              key: "pushRef",
              value: function(e) {
                this.find((function(t) {
                  return t.id === e.id
                })) || this.push(e)
              }
            }]), t
          }();

          function me(e) {
            return function(t, n, r, o) {
              if (!t) return null;
              n = e(t, n, r), "function" !== (r = i(o)) && "object" !== r || ("object" === r ? o.current = n : "function" === r && o.call(t.$component, n))
            }
          }
          var ve = function() {
              function e(t) {
                var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [],
                  r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0;
                a(this, e), this.index = r, this.requestParams = t, this.interceptors = n
              }
              return u(e, [{
                key: "proceed",
                value: function(e) {
                  if (this.requestParams = e, this.index >= this.interceptors.length) throw new Error("chain 参数错误, 请勿直接修改 request.chain");
                  var t = (e = this._getNextInterceptor()(this._getNextChain())).catch((function(e) {
                    return Promise.reject(e)
                  }));
                  return "function" == typeof e.abort && (t.abort = e.abort), t
                }
              }, {
                key: "_getNextInterceptor",
                value: function() {
                  return this.interceptors[this.index]
                }
              }, {
                key: "_getNextChain",
                value: function() {
                  return new e(this.requestParams, this.interceptors, this.index + 1)
                }
              }]), e
            }(),
            be = function() {
              function e(t) {
                a(this, e), this.taroInterceptor = t, this.chain = new ve
              }
              return u(e, [{
                key: "request",
                value: function(e) {
                  var t = this;
                  return this.chain.interceptors = this.chain.interceptors.filter((function(e) {
                    return e !== t.taroInterceptor
                  })), this.chain.interceptors.push(this.taroInterceptor), this.chain.proceed(function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                      var n = null != arguments[t] ? arguments[t] : {};
                      t % 2 ? s(Object(n), !0).forEach((function(t) {
                        ! function(e, t, n) {
                          t in e ? Object.defineProperty(e, t, {
                            value: n,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                          }) : e[t] = n
                        }(e, t, n[t])
                      })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : s(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                      }))
                    }
                    return e
                  }({}, e))
                }
              }, {
                key: "addInterceptor",
                value: function(e) {
                  this.chain.interceptors.push(e)
                }
              }, {
                key: "cleanInterceptors",
                value: function() {
                  this.chain = new ve
                }
              }]), e
            }(),
            _e = Object.freeze({
              timeoutInterceptor: function(e) {
                var t, n = e.requestParams,
                  r = new Promise((function(r, o) {
                    var i = setTimeout((function() {
                      i = null, o(new Error("网络链接超时,请稍后再试！"))
                    }), n && n.timeout || 6e4);
                    (t = e.proceed(n)).then((function(e) {
                      i && (clearTimeout(i), r(e))
                    })).catch((function(e) {
                      i && clearTimeout(i), o(e)
                    }))
                  }));
                return "function" == typeof t.abort && (r.abort = t.abort), r
              },
              logInterceptor: function(e) {
                (t = e.requestParams).method, t.data, t.url;
                var t = (e = e.proceed(t)).then((function(e) {
                  return e
                }));
                return "function" == typeof e.abort && (t.abort = e.abort), t
              }
            }),
            Se = {
              onSocketOpen: !0,
              onSocketError: !0,
              onSocketMessage: !0,
              onSocketClose: !0,
              onBackgroundAudioPlay: !0,
              onBackgroundAudioPause: !0,
              onBackgroundAudioStop: !0,
              onNetworkStatusChange: !0,
              onAccelerometerChange: !0,
              offAccelerometerChange: !0,
              onCompassChange: !0,
              onBluetoothAdapterStateChange: !0,
              onBluetoothDeviceFound: !0,
              onBLEConnectionStateChange: !0,
              onBLECharacteristicValueChange: !0,
              onBeaconUpdate: !0,
              onBeaconServiceChange: !0,
              onUserCaptureScreen: !0,
              onHCEMessage: !0,
              onGetWifiList: !0,
              onWifiConnected: !0,
              offWifiConnected: !0,
              offGetWifiList: !0,
              onDeviceMotionChange: !0,
              setStorageSync: !0,
              getStorageSync: !0,
              getStorageInfoSync: !0,
              removeStorageSync: !0,
              clearStorageSync: !0,
              getSystemInfoSync: !0,
              getExtConfigSync: !0,
              getLogManager: !0,
              onMemoryWarning: !0,
              reportMonitor: !0,
              reportAnalytics: !0,
              navigateToSmartGameProgram: !0,
              getFileSystemManager: !0,
              getLaunchOptionsSync: !0,
              onPageNotFound: !0,
              onError: !0,
              onAppShow: !0,
              onAppHide: !0,
              offPageNotFound: !0,
              offError: !0,
              offAppShow: !0,
              offAppHide: !0,
              onAudioInterruptionEnd: !0,
              onAudioInterruptionBegin: !0,
              onLocationChange: !0,
              offLocationChange: !0,
              onLocalServiceResolveFail: !0,
              onLocalServiceLost: !0,
              onLocalServiceFound: !0,
              onLocalServiceDiscoveryStop: !0,
              offLocalServiceResolveFail: !0,
              offLocalServiceLost: !0,
              offLocalServiceFound: !0,
              offLocalServiceDiscoveryStop: !0
            },
            we = {
              stopRecord: !0,
              getRecorderManager: !0,
              pauseVoice: !0,
              stopVoice: !0,
              pauseBackgroundAudio: !0,
              stopBackgroundAudio: !0,
              getBackgroundAudioManager: !0,
              createAudioContext: !0,
              createInnerAudioContext: !0,
              createVideoContext: !0,
              createCameraContext: !0,
              createLivePlayerContext: !0,
              createLivePusherContext: !0,
              createMapContext: !0,
              canIUse: !0,
              startAccelerometer: !0,
              stopAccelerometer: !0,
              startCompass: !0,
              stopCompass: !0,
              hideToast: !0,
              hideLoading: !0,
              showNavigationBarLoading: !0,
              hideNavigationBarLoading: !0,
              createAnimation: !0,
              createSelectorQuery: !0,
              createOffscreenCanvas: !0,
              createCanvasContext: !0,
              drawCanvas: !0,
              hideKeyboard: !0,
              stopPullDownRefresh: !0,
              createIntersectionObserver: !0,
              nextTick: !0,
              getMenuButtonBoundingClientRect: !0,
              onWindowResize: !0,
              offWindowResize: !0,
              arrayBufferToBase64: !0,
              base64ToArrayBuffer: !0,
              getAccountInfoSync: !0,
              getUpdateManager: !0,
              createWorker: !0,
              createRewardedVideoAd: !0,
              createInterstitialAd: !0,
              getRealtimeLogManager: !0
            },
            Pe = {
              uploadFile: !0,
              downloadFile: !0,
              connectSocket: !0,
              sendSocketMessage: !0,
              closeSocket: !0,
              chooseImage: !0,
              chooseMessageFile: !0,
              chooseMedia: !0,
              previewImage: !0,
              getImageInfo: !0,
              compressImage: !0,
              saveImageToPhotosAlbum: !0,
              startRecord: !0,
              playVoice: !0,
              setInnerAudioOption: !0,
              getAvailableAudioSources: !0,
              getBackgroundAudioPlayerState: !0,
              playBackgroundAudio: !0,
              seekBackgroundAudio: !0,
              chooseVideo: !0,
              saveVideoToPhotosAlbum: !0,
              loadFontFace: !0,
              saveFile: !0,
              getFileInfo: !0,
              getSavedFileList: !0,
              getSavedFileInfo: !0,
              removeSavedFile: !0,
              openDocument: !0,
              setStorage: !0,
              getStorage: !0,
              getStorageInfo: !0,
              removeStorage: !0,
              clearStorage: !0,
              navigateBack: !0,
              navigateTo: !0,
              redirectTo: !0,
              switchTab: !0,
              reLaunch: !0,
              startLocationUpdate: !0,
              startLocationUpdateBackground: !0,
              stopLocationUpdate: !0,
              getLocation: !0,
              chooseLocation: !0,
              openLocation: !0,
              getSystemInfo: !0,
              getNetworkType: !0,
              makePhoneCall: !0,
              scanCode: !0,
              setClipboardData: !0,
              getClipboardData: !0,
              openBluetoothAdapter: !0,
              closeBluetoothAdapter: !0,
              getBluetoothAdapterState: !0,
              startBluetoothDevicesDiscovery: !0,
              stopBluetoothDevicesDiscovery: !0,
              getBluetoothDevices: !0,
              getConnectedBluetoothDevices: !0,
              createBLEConnection: !0,
              closeBLEConnection: !0,
              getBLEDeviceServices: !0,
              getBLEDeviceCharacteristics: !0,
              readBLECharacteristicValue: !0,
              writeBLECharacteristicValue: !0,
              notifyBLECharacteristicValueChange: !0,
              startBeaconDiscovery: !0,
              stopBeaconDiscovery: !0,
              getBeacons: !0,
              setScreenBrightness: !0,
              getScreenBrightness: !0,
              setKeepScreenOn: !0,
              vibrateLong: !0,
              vibrateShort: !0,
              addPhoneContact: !0,
              getHCEState: !0,
              startHCE: !0,
              stopHCE: !0,
              sendHCEMessage: !0,
              startWifi: !0,
              stopWifi: !0,
              connectWifi: !0,
              getWifiList: !0,
              setWifiList: !0,
              getConnectedWifi: !0,
              startDeviceMotionListening: !0,
              stopDeviceMotionListening: !0,
              pageScrollTo: !0,
              showToast: !0,
              showLoading: !0,
              showModal: !0,
              showActionSheet: !0,
              setNavigationBarTitle: !0,
              setNavigationBarColor: !0,
              setTabBarBadge: !0,
              removeTabBarBadge: !0,
              showTabBarRedDot: !0,
              hideTabBarRedDot: !0,
              setTabBarStyle: !0,
              setTabBarItem: !0,
              showTabBar: !0,
              hideTabBar: !0,
              setTopBarText: !0,
              startPullDownRefresh: !0,
              canvasToTempFilePath: !0,
              canvasGetImageData: !0,
              canvasPutImageData: !0,
              setBackgroundColor: !0,
              setBackgroundTextStyle: !0,
              getSelectedTextRange: !0,
              hideHomeButton: !0,
              stopLocalServiceDiscovery: !0,
              startLocalServiceDiscovery: !0,
              getExtConfig: !0,
              login: !0,
              checkSession: !0,
              authorize: !0,
              getUserInfo: !0,
              checkIsSupportFacialRecognition: !0,
              startFacialRecognitionVerify: !0,
              startFacialRecognitionVerifyAndUploadVideo: !0,
              faceVerifyForPay: !0,
              requestPayment: !0,
              showShareMenu: !0,
              hideShareMenu: !0,
              updateShareMenu: !0,
              getShareInfo: !0,
              chooseAddress: !0,
              addCard: !0,
              openCard: !0,
              openSetting: !0,
              getSetting: !0,
              getWeRunData: !0,
              navigateToMiniProgram: !0,
              navigateBackMiniProgram: !0,
              chooseInvoice: !0,
              chooseInvoiceTitle: !0,
              checkIsSupportSoterAuthentication: !0,
              startSoterAuthentication: !0,
              checkIsSoterEnrolledInDevice: !0,
              requestSubscribeMessage: !0,
              setEnableDebug: !0,
              getOpenUserInfo: !0,
              ocrIdCard: !0,
              ocrBankCard: !0,
              ocrDrivingLicense: !0,
              ocrVehicleLicense: !0,
              textReview: !0,
              textToAudio: !0,
              imageAudit: !0,
              advancedGeneralIdentify: !0,
              objectDetectIdentify: !0,
              carClassify: !0,
              dishClassify: !0,
              logoClassify: !0,
              animalClassify: !0,
              plantClassify: !0,
              setPageInfo: !0,
              getSwanId: !0,
              requestPolymerPayment: !0,
              navigateToSmartProgram: !0,
              navigateBackSmartProgram: !0,
              preloadSubPackage: !0
            };

          function Ce(e) {
            var t = void 0 === (t = e.designWidth) ? 700 : t;
            e = void 0 === (e = e.deviceRatio) ? {
              640: 1.17,
              750: 1,
              828: .905
            } : e;
            this.config = this.config || {}, this.config.designWidth = t, this.config.deviceRatio = e
          }

          function Oe(e, t) {
            return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
          }

          function Ae(e) {
            return "function" == typeof e
          }
          var je = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

          function Ee(e) {
            return null == e
          }
          var $e = !0;

          function ke() {
            return $e
          }

          function Te(e) {
            $e = Boolean(e)
          }

          function xe() {}

          function Re(e) {
            if (null === Ye.current) throw new Error("invalid hooks call: hooks can only be called in a stateless component.");
            var t = Ye.current.hooks;
            return e >= t.length && t.push({}), t[e]
          }

          function Ie(e) {
            Ae(e) && (e = e());
            var t = Re(Ye.index++);
            return t.state || (t.component = Ye.current, t.state = [e, function(e) {
              e = Ae(e) ? e(t.state[0]) : e, t.state[0] !== e && (t.state[0] = e, t.component._disable = !1, t.component.setState({}, xe))
            }]), t.state
          }

          function De(e, t) {
            var n, r, o = Re(Ye.index++);
            o.marked ? o.callback = e : (o.marked = !0, o.component = Ye.current, o.callback = e, n = o.component, r = n[t], o.component[t] = function() {
              var e = o.callback;
              return r && r.call.apply(r, [n].concat(Array.prototype.slice.call(arguments))), e && e.call.apply(e, [n].concat(Array.prototype.slice.call(arguments)))
            })
          }

          function Le(e) {
            De(e, "componentDidShow")
          }

          function Me(e) {
            De(e, "componentDidHide")
          }

          function Be(e) {
            De(e, "onPullDownRefresh")
          }

          function Fe(e) {
            De(e, "onReachBottom")
          }

          function Ue(e) {
            De(e, "onPageScroll")
          }

          function We(e) {
            De(e, "onResize")
          }

          function Ne(e) {
            De(e, "onShareAppMessage")
          }

          function qe(e) {
            De(e, "onTabItemTap")
          }

          function Ve() {
            var e = Re(Ye.index++);
            return e.router || (e.component = Ye.current, e.router = e.component.$router), e.router
          }

          function He() {
            var e = Re(Ye.index++);
            return e.scope || (e.component = Ye.current, e.scope = e.component.$scope), e.scope
          }

          function Qe(e, t, n) {
            Ae(t) && (t = t());
            var r = Re(Ye.index++);
            return r.state || (r.component = Ye.current, r.state = [void 0 === n ? t : n(t), function(t) {
              r.state[0] = e(r.state[0], t), r.component._disable = !1, r.component.setState({}, xe)
            }]), r.state
          }

          function ze(e, t) {
            return Ee(e) || Ee(t) || t.some((function(t, n) {
              return !Oe(t, e[n])
            }))
          }

          function Ge(e, t) {
            (t ? e.effects : e.layoutEffects).forEach((function(e) {
              Ae(e.cleanup) && e.cleanup();
              var t = e.effect();
              Ae(t) && (e.cleanup = t)
            })), t ? e.effects = [] : e.layoutEffects = []
          }
          var Ye = {
              current: null,
              index: 0
            },
            Je = [];

          function Ke(e, t, n) {
            var r = Re(Ye.index++);
            !Ye.current._disableEffect && Ye.current.__isReady && ze(r.deps, t) && (r.effect = e, r.deps = t, n ? (Ye.current.effects = Ye.current.effects.concat(r), function(e) {
              e._afterScheduleEffect || (e._afterScheduleEffect = !0, Je.push(e), 1 === Je.length && je((function() {
                setTimeout((function() {
                  Je.forEach((function(e) {
                    e._afterScheduleEffect = !1, Ge(e, !0)
                  })), Je = []
                }), 0)
              })))
            }(Ye.current)) : Ye.current.layoutEffects = Ye.current.layoutEffects.concat(r))
          }

          function Xe(e, t) {
            Ke(e, t, !0)
          }

          function Ze(e, t) {
            Ke(e, t)
          }

          function et(e) {
            var t = Re(Ye.index++);
            return t.ref || (t.ref = {
              current: e
            }), t.ref
          }

          function nt(e, t) {
            var n = Re(Ye.index++);
            return ze(n.deps, t) && (n.deps = t, n.callback = e, n.value = e()), n.value
          }

          function rt(e, t) {
            return nt((function() {
              return e
            }), t)
          }

          function ot(e, t, n) {
            Ze((function() {
              return Ae(e) ? (e(t()), function() {
                return e(null)
              }) : void 0 !== e ? (e.current = t(), function() {
                delete e.current
              }) : void 0
            }), function(e) {
              return Array.isArray(e)
            }(n) ? n.concat([e]) : void 0)
          }

          function it(e) {
            var t, n = (e = e.context).emitter;
            return null === n ? e._defaultValue : (void 0 === (t = Re(Ye.index++)).context && (t.context = !0, t.component = Ye.current, n.on((function(e) {
              t.component && (t.component._disable = !1, t.component.setState({}))
            }))), n.value)
          }
          var at = function() {
              function e() {
                var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                a(this, e), this.value = t, this.handlers = []
              }
              return u(e, [{
                key: "on",
                value: function(e) {
                  this.handlers.push(e)
                }
              }, {
                key: "off",
                value: function(e) {
                  this.handlers = this.handlers.filter((function(t) {
                    return t !== e
                  }))
                }
              }, {
                key: "set",
                value: function(e) {
                  var t = this;
                  Oe(e, this.value) || (this.value = e, this.handlers.forEach((function(e) {
                    return e(t.value)
                  })))
                }
              }]), e
            }(),
            ct = 0;

          function ut(e) {
            var t = {
              emitter: null,
              _id: "__context_" + ct++ + "__",
              _defaultValue: e
            };
            return {
              Provider: function(n) {
                var r = t.emitter;
                r ? r.set(n) : t.emitter = new at(e)
              },
              context: t
            }
          }
          var st = Object.is || function(e, t) {
            return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
          };

          function ft(e, t) {
            return e.prototype.shouldComponentUpdate = function(e) {
              return Ae(t) ? !t(this.props, e) : ! function(e, t) {
                if ("object" !== i(e) && "object" !== i(t)) return e === t;
                if (null === e && null === t) return 1;
                if (null !== e && null !== t) {
                  if (st(e, t)) return 1;
                  var n = e ? Object.keys(e) : [],
                    r = t ? Object.keys(t) : [];
                  if (n.length === r.length) {
                    for (var o = 0; o < n.length; o++) {
                      var a = n[o];
                      if (!t.hasOwnProperty(a) || !st(e[a], t[a])) return
                    }
                    return 1
                  }
                }
              }(this.props, e)
            }, e
          }
          var lt = new le;
          $ = {
            Component: m,
            Events: le,
            eventCenter: lt,
            getEnv: ue,
            ENV_TYPE: ae,
            render: pe,
            internal_safe_get: te,
            internal_safe_set: ne,
            internal_inline_style: ie,
            internal_get_original: fe,
            internal_force_update: xe,
            noPromiseApis: we,
            onAndSyncApis: Se,
            otherApis: Pe,
            initPxTransform: Ce,
            createRef: de,
            commitAttachRef: he,
            detachAllRef: ye,
            Link: be,
            interceptors: _e,
            RefsArray: ge,
            handleLoopRef: me,
            Current: Ye,
            useEffect: Xe,
            useLayoutEffect: Ze,
            useReducer: Qe,
            useState: Ie,
            useDidShow: Le,
            useDidHide: Me,
            usePullDownRefresh: Be,
            useReachBottom: Fe,
            usePageScroll: Ue,
            useResize: We,
            useShareAppMessage: Ne,
            useTabItemTap: qe,
            useRouter: Ve,
            useScope: He,
            useRef: et,
            useCallback: rt,
            useMemo: nt,
            useImperativeHandle: ot,
            invokeEffects: Ge,
            useContext: it,
            createContext: ut,
            memo: ft,
            getIsUsingDiff: ke,
            setIsUsingDiff: Te
          };
          n.default = $
        }.call(this, r(52))
    }
  }
]);