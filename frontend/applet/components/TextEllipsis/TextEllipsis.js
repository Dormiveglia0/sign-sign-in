var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [44], {
    2010: function(t, e, o) {
      o(561)
    },
    2011: function(t, e, o) {},
    3380: function(e, o, n) {
      n.r(o), n(2010);
      var r = n(0),
        a = n.n(r),
        s = (o = (n(2011), n(5)), n.n(o)),
        i = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var o = [],
              n = !0,
              r = !1,
              a = void 0;
            try {
              for (var s, i = t[Symbol.iterator](); !(n = (s = i.next()).done) && (o.push(s.value), !e || o.length !== e); n = !0);
            } catch (t) {
              r = !0, a = t
            } finally {
              try {
                !n && i.return && i.return()
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
      var u;

      function l(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function p() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, p);
        for (var o = arguments.length, n = Array(o), r = 0; r < o; r++) n[r] = arguments[r];
        return (t = e = l(this, (e = p.__proto__ || Object.getPrototypeOf(p)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "rows", "props", "content", "alwaysShowButton", "buttonVisible", "showShadow", "isExpand", "actionText"], e.customComponents = [], l(e, t)
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
            e = t.content,
            o = t.expandText,
            n = t.collapseText,
            c = t.actionVisible,
            u = t.collapseVisible,
            l = t.rows,
            p = t.alwaysShowButton,
            f = t.customClass,
            h = t.showShadow,
            y = Object(r.useScope)(),
            b = Object(r.useState)(!1),
            w = (b = i(b, 2))[0],
            _ = b[1],
            m = (b = w ? n : o, n = Object(r.useState)(!1), (o = i(n, 2))[0]),
            d = o[1],
            v = (n = Object(r.useMemo)((function() {
              return !!p || !!c && !(!m || !u && w)
            }), [c, u, w, m, p]), o = function(e) {
              e.stopPropagation(), t.beforeExpand && !w && !t.beforeExpand(w) || _(!w)
            }, function() {
              var t = a.a.createSelectorQuery().in(y);
              t.select(".get-height").boundingClientRect(), t.select(".inner").boundingClientRect().exec((function(t) {
                var e = (t = i(t, 2))[0];
                t = t[1], e = parseInt(e.height);
                parseInt(t.height) < e && 0 < e && d(!0)
              }))
            }),
            x = (Object(r.useEffect)((function() {
              a.a.nextTick(v)
            }), [e]), s()("inner", !w && "ellipsis", f)),
            S = p || n ? s()("collapse", w && "collapse-fold") : null;
          this.anonymousFunc0 = o, o = s()("get-height", f);
          return Object.assign(this.__state, {
            anonymousState__temp: x,
            anonymousState__temp2: S,
            anonymousState__temp3: o,
            rows: l,
            props: t,
            content: e,
            alwaysShowButton: p,
            buttonVisible: n,
            showShadow: h,
            isExpand: w,
            actionText: b
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          t.stopPropagation()
        }
      }]), u = o = p, o.$$events = ["anonymousFunc0"], o.$$componentPath = "components/TextEllipsis/TextEllipsis", (o = u).defaultProps = {
        content: "",
        rows: 1,
        expandText: "展开",
        collapseText: "收起",
        actionVisible: !0,
        collapseVisible: !0,
        useRichText: !1,
        alwaysShowButton: !1,
        customClass: "",
        showShadow: !1
      }, o.options = {
        addGlobalClass: !0
      }, Component(n(0).default.createComponent(o))
    },
    561: function(t, e, o) {
      t.exports = o.p + "components/TextEllipsis/TextEllipsis.wxml"
    }
  },
  [
    [3380, 0, 2, 1]
  ]
]);