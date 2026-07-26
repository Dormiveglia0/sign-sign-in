var t = require("../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [641], {
    2218: function(t, e, n) {
      n(660)
    },
    2219: function(t, e, n) {},
    3478: function(e, n, o) {
      o.r(n), o(2218), o(2219);
      var r = o(0),
        i = o.n(r),
        a = o(6),
        s = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [],
              o = !0,
              r = !1,
              i = void 0;
            try {
              for (var a, s = t[Symbol.iterator](); !(o = (a = s.next()).done) && (n.push(a.value), !e || n.length !== e); o = !0);
            } catch (t) {
              r = !0, i = t
            } finally {
              try {
                !o && s.return && s.return()
              } finally {
                if (r) throw i
              }
            }
            return n
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      n = function(t, e, n) {
        return e && u(t.prototype, e), n && u(t, n), t
      };

      function u(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var p;

      function c(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function l() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, l);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = c(this, (e = l.__proto__ || Object.getPrototypeOf(l)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "props", "step"], e.customComponents = [], c(e, t)
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
      })(l, i.a.Component), n(l, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, n, o) : void 0
          })(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = this.__props,
            e = Object(r.useState)(0),
            n = (e = s(e, 2))[0],
            o = e[1],
            u = (e = Object(a.useSelector)((function(t) {
              return t.xybData.statusBarHeight
            })), function() {
              1 === n && (1 === t.type ? i.a.setStorageSync("AiResumeTips1", !0) : i.a.setStorageSync("AiResumeTips2", !0)), o((function(t) {
                return t < 1 ? t + 1 : 0
              }))
            });
          Object(r.useEffect)((function() {
            t.visible && ((1 === t.type ? i.a.getStorageSync("AiResumeTips1") : i.a.getStorageSync("AiResumeTips2")) ? o(0) : o(1))
          }), [t.visible]), this.anonymousFunc0 = u, u = 1 === n && t.visible && 0 < n ? Object(r.internal_inline_style)(t.top ? "top:" + t.top + "px" : t.hasBanner ? "top:calc(" + e + "px + 392rpx)" : "top:calc(" + e + "px + 108rpx)") : null;
          return Object.assign(this.__state, {
            anonymousState__temp: u,
            props: t,
            step: n
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {}
      }]), p = n = l, n.$$events = ["anonymousFunc0"], n.$$componentPath = "pages/find/components/StudentReformTips/StudentReformTips", (n = p).defaultProps = {
        visible: !1,
        hasBanner: !1,
        type: 1
      }, n.options = {
        addGlobalClass: !0
      }, Component(o(0).default.createComponent(n))
    },
    660: function(t, e, n) {
      t.exports = n.p + "pages/find/components/StudentReformTips/StudentReformTips.wxml"
    }
  },
  [
    [3478, 0, 2, 1]
  ]
]);