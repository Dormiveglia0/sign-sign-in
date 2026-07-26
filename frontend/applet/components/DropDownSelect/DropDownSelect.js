var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [20], {
    2201: function(t, e, n) {
      n(651)
    },
    2202: function(t, e, n) {},
    3469: function(e, n, o) {
      o.r(n), o(2201);
      var r = o(0),
        i = o.n(r),
        a = o(6),
        u = (n = (o(2202), o(5)), o.n(n)),
        c = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
          return t(e)
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : t(e)
        },
        l = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [],
              o = !0,
              r = !1,
              i = void 0;
            try {
              for (var a, u = t[Symbol.iterator](); !(o = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e); o = !0);
            } catch (t) {
              r = !0, i = t
            } finally {
              try {
                !o && u.return && u.return()
              } finally {
                if (r) throw i
              }
            }
            return n
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      n = function(t, e, n) {
        return e && s(t.prototype, e), n && s(t, n), t
      };

      function s(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var p;

      function f(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function y() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, y);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = f(this, (e = y.__proto__ || Object.getPrototypeOf(y)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "loopArray1328", "maskVisible", "list"], e.anonymousFunc2Map = {}, e.customComponents = [], f(e, t)
      }(function(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + t(n));
        e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n)
      })(y, i.a.Component), n(y, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, n, o) : void 0
          })(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.__props),
            n = e.list,
            o = Object(r.useScope)(),
            c = Object(a.useSelector)((function(t) {
              return t.xybData.screenHeight
            })),
            s = 300 < (p = 28 * n.length) ? 300 : p,
            p = Object(r.useState)({
              top: "",
              left: "",
              bottom: "",
              width: ""
            }),
            f = (p = l(p, 2))[0],
            y = p[1],
            b = (p = Object(r.useState)(!1), (p = l(p, 2))[0]),
            m = p[1],
            h = function(t) {
              e.onSelect && e.onSelect(t), m(!1)
            };
          p = function() {
            m(!1)
          }, this.anonymousFunc0 = function() {
            i.a.createSelectorQuery().in(o).select("#drop-down-select-wrap").boundingClientRect((function(t) {
              var e = t.top,
                n = t.bottom,
                o = t.width,
                r = {};
              r.width = o + "px", r.left = t.left + "px", c - (n + s) < 30 ? (r.bottom = c - e + 4 + "px", r.top = "unset") : (r.top = n + 4 + "px", r.bottom = "unset"), y(r), m(!0)
            })).exec()
          }, this.anonymousFunc1 = p, p = b ? Object(r.internal_inline_style)(f) : null, f = b ? n.map((function(n, o) {
            n = {
              $original: Object(r.internal_get_original)(n)
            };
            var i = b ? o + n.$original.id : null,
              a = b ? u()("drop-down-item", n.$original.id === e.value && "drop-down-item-hover") : null;
            o = "bggez" + o;
            return t.anonymousFunc2Map[o] = function(t) {
              t.stopPropagation(), h(n.$original)
            }, {
              $loopState__temp3: i,
              $loopState__temp5: a,
              _$indexKey: o,
              $original: n.$original
            }
          })) : [];
          return Object.assign(this.__state, {
            anonymousState__temp: p,
            loopArray1328: f,
            maskVisible: b,
            list: n
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {}
      }, {
        key: "anonymousFunc1",
        value: function(t) {}
      }, {
        key: "anonymousFunc2",
        value: function(t) {
          for (var e, n = arguments.length, o = Array(1 < n ? n - 1 : 0), r = 1; r < n; r++) o[r - 1] = arguments[r];
          return "object" === (void 0 === o ? "undefined" : c(o)) && o.stopPropagation && o.stopPropagation(), this.anonymousFunc2Map[t] && (e = this.anonymousFunc2Map)[t].apply(e, o)
        }
      }]), p = n = y, n.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2"], n.$$componentPath = "components/DropDownSelect/DropDownSelect", (n = p).defaultProps = {
        list: [],
        value: "",
        onSelect: function() {}
      }, Component(o(0).default.createComponent(n))
    },
    651: function(t, e, n) {
      t.exports = n.p + "components/DropDownSelect/DropDownSelect.wxml"
    }
  },
  [
    [3469, 0, 2, 1]
  ]
]);