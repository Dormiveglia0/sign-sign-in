var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [649], {
    1857: function(t, e, o) {
      o(512)
    },
    3331: function(e, o, r) {
      r.r(o), r(1857);
      var n = r(0),
        a = r.n(n);
      o = function(t, e, o) {
        return e && i(t.prototype, e), o && i(t, o), t
      };

      function i(t, e) {
        for (var o = 0; o < e.length; o++) {
          var r = e[o];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
      }
      var p;

      function u(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function c() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, c);
        for (var o = arguments.length, r = Array(o), n = 0; n < o; n++) r[n] = arguments[n];
        return (t = e = u(this, (e = c.__proto__ || Object.getPrototypeOf(c)).call.apply(e, [this].concat(r)))).$usedState = [], e.customComponents = [], u(e, t)
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
      })(c, a.a.Component), o(c, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, o, r) {
            null === e && (e = Function.prototype);
            var n = Object.getOwnPropertyDescriptor(e, o);
            return void 0 !== n ? "value" in n ? n.value : void 0 !== (n = n.get) ? n.call(r) : void 0 : null !== (n = Object.getPrototypeOf(e)) ? t(n, o, r) : void 0
          })(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "_constructor", this).call(this, t), this.$$refs = new a.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.__props;
          var t = Object(n.useRouter)();
          return Object(n.useEffect)((function() {
            var e = t.params,
              o = Object.keys(e).map((function(t) {
                return t + "=" + e[t]
              })).join("&");
            a.a.redirectTo({
              url: "/ninthBag/pages/growup/growup" + (o ? "?" + o : "")
            })
          }), []), Object.assign(this.__state, {}), this.__state
        }
      }]), p = o = c, o.$$events = [], o.$$componentPath = "pages/growup/growup", o = p, Component(r(0).default.createComponent(o, !0))
    },
    512: function(t, e, o) {
      t.exports = o.p + "pages/growup/growup.wxml"
    }
  },
  [
    [3331, 0, 2, 1]
  ]
]);