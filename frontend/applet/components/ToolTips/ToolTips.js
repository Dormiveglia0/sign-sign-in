var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [45], {
    2553: function(t, e, o) {
      o(827)
    },
    2554: function(t, e, o) {},
    3644: function(e, o, n) {
      n.r(o), n(2553);
      var r = n(0),
        a = n.n(r),
        i = (n(2554), n(39)),
        l = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var o = [],
              n = !0,
              r = !1,
              a = void 0;
            try {
              for (var i, l = t[Symbol.iterator](); !(n = (i = l.next()).done) && (o.push(i.value), !e || o.length !== e); n = !0);
            } catch (t) {
              r = !0, a = t
            } finally {
              try {
                !n && l.return && l.return()
              } finally {
                if (r) throw a
              }
            }
            return o
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      o = function(t, e, o) {
        return e && c(t.prototype, e), o && c(t, o), t
      };

      function c(t, e) {
        for (var o = 0; o < e.length; o++) {
          var n = e[o];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }
      var s;

      function u(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function p() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, p);
        for (var o = arguments.length, n = Array(o), r = 0; r < o; r++) n[r] = arguments[r];
        return (t = e = u(this, (e = p.__proto__ || Object.getPrototypeOf(p)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "show", "colorStyle", "titleName", "positionName", "align", "content"], e.customComponents = [], u(e, t)
      }(function(e, o) {
        if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + t(o));
        e.prototype = Object.create(o && o.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : e.__proto__ = o)
      })(p, a.a.Component), o(p, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, o, n) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, o);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(n) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, o, n) : void 0
          })(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "_constructor", this).call(this, t), this.$$refs = new a.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = this.__props,
            e = Object(r.useScope)(),
            o = t.colorStyle,
            n = t.align,
            c = t.content,
            s = t.positionName,
            u = t.titleName,
            p = t.leftSet,
            f = t.autoLeft,
            y = t.offsetTop,
            h = (t = t.rightSet, Object(r.useState)(!1)),
            m = (h = l(h, 2))[0],
            _ = h[1],
            b = (h = Object(r.useState)({
              left: 0,
              top: 0
            }), (h = l(h, 2))[0]),
            v = h[1],
            O = (h = Object(r.useState)(0), (h = l(h, 2))[0]),
            g = h[1],
            S = (h = Object(r.useState)(0), (h = l(h, 2))[0]),
            w = h[1],
            d = (h = (Object(r.useEffect)((function() {
              var t;
              m && ((t = a.a.createSelectorQuery().in(e)).select(".tooltips-content").boundingClientRect(), t.exec((function(t) {
                var e;
                t && t[0] && (g(t[0].height), (e = b).top = "top" == n ? S - t[0].height - y : S + y, v(e))
              })))
            }), [c, m]), function() {
              var t = a.a.createSelectorQuery().in(e);
              t.select(".tooltips-trigger").boundingClientRect(), t.exec((function(t) {
                var e, o, r, a, l;
                t && t[0] && (l = (t = t[0]).left, e = t.top, t = t.width, o = Math.max(0, f ? l : p), r = Math.max(0, e - O - y), a = Math.max(0, e + y), l = Math.max(0, l + t / 2 - p - 4), v({
                  left: o,
                  top: "top" == n ? r : a,
                  arrowLeft: l
                }), w(e), i.a.hideAllTooltips(), _(!0))
              }))
            }), function() {
              _(!1)
            }),
            j = (h = (Object(r.useEffect)((function() {
              return i.a.registerTooltips({
                  hideTooltips: d
                }),
                function() {}
            }), []), this.anonymousFunc0 = h, m ? Object(r.internal_inline_style)({
              left: b.left + "px",
              top: b.top + "px",
              right: "auto" == t ? "auto" : t + "px"
            }) : null), t = "top" == n ? Object(r.internal_inline_style)({
              left: b.arrowLeft + "px"
            }) : null, "top" != n ? Object(r.internal_inline_style)({
              left: b.arrowLeft + "px"
            }) : null);
          return Object.assign(this.__state, {
            anonymousState__temp: h,
            anonymousState__temp2: t,
            anonymousState__temp3: j,
            show: m,
            colorStyle: o,
            titleName: u,
            positionName: s,
            align: n,
            content: c
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {}
      }]), s = o = p, o.$$events = ["anonymousFunc0"], o.$$componentPath = "components/ToolTips/ToolTips", (o = s).options = {
        addGlobalClass: !0
      }, o.defaultProps = {
        colorStyle: "black",
        align: "top",
        content: "",
        titleName: "",
        positionName: "",
        autoLeft: !1,
        leftSet: 20,
        rightSet: "auto",
        offsetTop: 10
      }, Component(n(0).default.createComponent(o))
    },
    827: function(t, e, o) {
      t.exports = o.p + "components/ToolTips/ToolTips.wxml"
    }
  },
  [
    [3644, 0, 2, 1, 3]
  ]
]);