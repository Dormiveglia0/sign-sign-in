require("../../@babel/runtime/helpers/Arrayincludes");
var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [55], {
    2077: function(t, e, n) {
      n(593)
    },
    3412: function(e, n, r) {
      r.r(n), r(2077);
      var o = r(0),
        i = r.n(o),
        a = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [],
              r = !0,
              o = !1,
              i = void 0;
            try {
              for (var a, c = t[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !e || n.length !== e); r = !0);
            } catch (t) {
              o = !0, i = t
            } finally {
              try {
                !r && c.return && c.return()
              } finally {
                if (o) throw i
              }
            }
            return n
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      n = function(t, e, n) {
        return e && c(t.prototype, e), n && c(t, n), t
      };

      function c(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
      }
      var s;

      function p(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function u() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, u);
        for (var n = arguments.length, r = Array(n), o = 0; o < n; o++) r[o] = arguments[o];
        return (t = e = p(this, (e = u.__proto__ || Object.getPrototypeOf(u)).call.apply(e, [this].concat(r)))).$usedState = ["anonymousState__temp", "src"], e.customComponents = [], p(e, t)
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
      })(u, i.a.Component), n(u, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, r) {
            null === e && (e = Function.prototype);
            var o = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== o ? "value" in o ? o.value : void 0 !== (o = o.get) ? o.call(r) : void 0 : null !== (o = Object.getPrototypeOf(e)) ? t(o, n, r) : void 0
          })(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = void 0 === (e = (n = this.__props).name) ? "" : e,
            e = n.imageStyle,
            n = Object(o.useState)("https://xcxstatic.xybsyw.com/xcx/images/ic_tongyong.png"),
            r = (n = a(n, 2))[0],
            i = n[1];
          Object(o.useEffect)((function() {
            if (!t) return "";
            var e = t.lastIndexOf("."),
              n = t.length;
            e = t.substring(e + 1, n).toLocaleUpperCase(), n = void 0; - 1 < (e = e.includes("?") ? e.split("?")[0] : e).indexOf("DOC") || -1 < e.indexOf("DOCX") ? n = "doc" : -1 < e.indexOf("PDF") ? n = "pdf" : (-1 < e.indexOf("JPG") || -1 < e.indexOf("JPEG") || -1 < e.indexOf("PNG") || -1 < e.indexOf("GIF")) && (n = "image"), i({
              doc: "https://xcxstatic.xybsyw.com/xcx/images/ic_word112x140.png",
              pdf: "https://xcxstatic.xybsyw.com/xcx/images/ic_pdf_img.png",
              image: "https://xcxstatic.xybsyw.com/xcx/images/ic_word_img_112x140.png"
            } [n] || "https://xcxstatic.xybsyw.com/xcx/images/ic_tongyong.png")
          }), [t]), n = Object(o.internal_inline_style)(e);
          return Object.assign(this.__state, {
            anonymousState__temp: n,
            src: r
          }), this.__state
        }
      }]), s = n = u, n.$$events = [], n.$$componentPath = "components/fileImage/fileImage", (n = s).defaultProps = {
        imageStyle: {
          width: "62rpx",
          height: "78rpx"
        }
      }, Component(r(0).default.createComponent(n))
    },
    593: function(t, e, n) {
      t.exports = n.p + "components/fileImage/fileImage.wxml"
    }
  },
  [
    [3412, 0, 2, 1]
  ]
]);