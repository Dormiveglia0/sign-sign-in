var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [17], {
    1940: function(t, e, n) {
      n(533)
    },
    1941: function(t, e, n) {},
    3352: function(e, n, o) {
      o.r(n), o(1940);
      var r = o(0),
        a = o.n(r),
        i = (o(1941), function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [],
              o = !0,
              r = !1,
              a = void 0;
            try {
              for (var i, s = t[Symbol.iterator](); !(o = (i = s.next()).done) && (n.push(i.value), !e || n.length !== e); o = !0);
            } catch (t) {
              r = !0, a = t
            } finally {
              try {
                !o && s.return && s.return()
              } finally {
                if (r) throw a
              }
            }
            return n
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        });
      n = function(t, e, n) {
        return e && s(t.prototype, e), n && s(t, n), t
      };

      function s(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var u;

      function p(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function c() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, c);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = p(this, (e = c.__proto__ || Object.getPrototypeOf(c)).call.apply(e, [this].concat(o)))).config = {
          usingComponents: {
            "van-rate": "../../vant-weapp/dist/rate/index"
          }
        }, e.$usedState = ["props", "nameVisible", "sizeVal", "name", "valueText"], e.customComponents = [], p(e, t)
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
      })(c, a.a.Component), n(c, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, n, o) : void 0
          })(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "_constructor", this).call(this, t), this.$$refs = new a.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = this.__props,
            e = t.showValue ? Number(t.value).toFixed(1) + ("整体感受" == t.name ? "" : "分") : "",
            n = t.name || "综合评分",
            o = Object(r.useState)(20),
            a = (o = i(o, 2))[0],
            s = o[1],
            u = (o = Object(r.useState)(!0), (o = i(o, 2))[0]),
            p = o[1];
          return Object(r.useEffect)((function() {
            0 == t.type && (s(10), p(!0)), 1 == t.type && (s(16), p(!1)), "整体感受" == t.name && s(16)
          }), []), Object.assign(this.__state, {
            props: t,
            nameVisible: u,
            sizeVal: a,
            name: n,
            valueText: e
          }), this.__state
        }
      }]), u = n = c, n.$$events = [], n.$$componentPath = "components/CompanyRate/CompanyRate", (n = u).config = {
        usingComponents: {
          "van-rate": "../../vant-weapp/dist/rate/index"
        }
      }, n.defaultProps = {
        value: 0,
        showValue: !0,
        name: "综合评分"
      }, Component(o(0).default.createComponent(n))
    },
    533: function(t, e, n) {
      t.exports = n.p + "components/CompanyRate/CompanyRate.wxml"
    }
  },
  [
    [3352, 0, 2, 1]
  ]
]);