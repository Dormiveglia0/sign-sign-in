var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [28], {
    2024: function(t, e, n) {
      n(568)
    },
    2025: function(t, e, n) {},
    3387: function(e, n, o) {
      o.r(n), o(2024), o(3);
      var r = o(0),
        i = o.n(r),
        a = (o(29), o(2025), o(13), function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [],
              o = !0,
              r = !1,
              i = void 0;
            try {
              for (var a, c = t[Symbol.iterator](); !(o = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e); o = !0);
            } catch (t) {
              r = !0, i = t
            } finally {
              try {
                !o && c.return && c.return()
              } finally {
                if (r) throw i
              }
            }
            return n
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        });
      n = function(t, e, n) {
        return e && c(t.prototype, e), n && c(t, n), t
      };

      function c(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var s;

      function u(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function p() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, p);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = u(this, (e = p.__proto__ || Object.getPrototypeOf(p)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "imgSrc"], e.customComponents = [], u(e, t)
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
      })(p, i.a.Component), n(p, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, n, o) : void 0
          })(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = (c = this.__props).width,
            e = c.height,
            n = (c.canvasWidth, c.canvasHeight, c.url),
            o = c.loop,
            i = c.autoplay,
            c = (c.ref, c.isToImage, Object(r.useRef)(null), Object(r.useScope)(), Object(r.useState)("")),
            s = (c = a(c, 2))[0];
          c[1], Object(r.useEffect)((function() {
            if (!n) throw new Error("¬∆¬LottieIcon: url is required")
          }), [i, o, n, t]), c = s ? null : Object(r.internal_inline_style)({
            width: t + "rpx",
            height: e + "rpx",
            display: "inline-block"
          }), i = Object(r.internal_inline_style)({
            width: t + "rpx",
            height: e + "rpx",
            display: s ? "" : "none"
          });
          return Object.assign(this.__state, {
            anonymousState__temp: c,
            anonymousState__temp2: i,
            imgSrc: s
          }), this.__state
        }
      }]), s = n = p, n.$$events = [], n.$$componentPath = "components/LottieIcon/LottieIcon", (n = s).defaultProps = {
        width: 90,
        height: 90,
        canvasWidth: "",
        canvasHeight: "",
        loop: 1,
        autoplay: !0,
        url: "",
        isToImage: !0
      }, Component(o(0).default.createComponent(n))
    },
    568: function(t, e, n) {
      t.exports = n.p + "components/LottieIcon/LottieIcon.wxml"
    }
  },
  [
    [3387, 0, 2, 1, 3]
  ]
]);