var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [622], {
    1860: function(t, e, n) {
      n(515)
    },
    1861: function(t, e, n) {},
    3334: function(e, n, o) {
      o.r(n), o(1860), o(1861);
      var r = o(0),
        i = o.n(r);
      n = function(t, e, n) {
        return e && a(t.prototype, e), n && a(t, n), t
      };

      function a(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var u;

      function c(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function s() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, s);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = c(this, (e = s.__proto__ || Object.getPrototypeOf(s)).call.apply(e, [this].concat(o)))).config = {
          navigationBarTitleText: "校友邦",
          usingComponents: {}
        }, e.$usedState = ["params"], e.customComponents = [], c(e, t)
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
      })(s, i.a.Component), n(s, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, n, o) : void 0
          })(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.__props;
          var t = Object(r.useRouter)().params,
            e = function() {
              i.a.redirectTo({
                url: "/pages/find/index/index"
              })
            };
          return Object(r.useEffect)((function() {
            return function() {}
          }), []), this.anonymousFunc0 = e, Object.assign(this.__state, {
            params: t
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {}
      }]), u = n = s, n.$$events = ["anonymousFunc0"], n.$$componentPath = "pages/AuthenticationError/AuthenticationError", (n = u).config = {
        navigationBarTitleText: "校友邦",
        usingComponents: {}
      }, n.defaultProps = {}, Component(o(0).default.createComponent(n, !0))
    },
    515: function(t, e, n) {
      t.exports = n.p + "pages/AuthenticationError/AuthenticationError.wxml"
    }
  },
  [
    [3334, 0, 2, 1]
  ]
]);