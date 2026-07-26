var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [8], {
    2149: function(t, e, n) {
      n(625)
    },
    2150: function(t, e, n) {},
    3443: function(e, n, o) {
      o.r(n), o(2149), o(2150);
      var r = o(0),
        a = o.n(r),
        i = (n = o(5), o.n(n)),
        u = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [],
              o = !0,
              r = !1,
              a = void 0;
            try {
              for (var i, u = t[Symbol.iterator](); !(o = (i = u.next()).done) && (n.push(i.value), !e || n.length !== e); o = !0);
            } catch (t) {
              r = !0, a = t
            } finally {
              try {
                !o && u.return && u.return()
              } finally {
                if (r) throw a
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
      var c;

      function l(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var p = a.a.getApp();

      function f() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, f);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = l(this, (e = f.__proto__ || Object.getPrototypeOf(f)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "isLogin", "userId", "__fn_on"], e.customComponents = [], l(e, t)
      }(n = (function(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + t(n));
        e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n)
      }(f, a.a.Component), n(f, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, n, o) : void 0
          })(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "_constructor", this).call(this, t), this.$$refs = new a.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.__props;
          var t = a.a.getStorageSync("userid"),
            e = Object(r.useState)(!0),
            n = (e = u(e, 2))[0],
            o = e[1],
            s = (e = p.globalData.isLogin, function() {
              a.a.eventCenter.trigger("taroClick", {
                funName: "点击进入AI助手"
              }), a.a.navigateTo({
                url: "/secondBag/pages/aiLandingPage/aiLandingPage"
              })
            }),
            c = (Object(r.useEffect)((function() {
              a.a.eventCenter.on("scrollChange", (function(t) {
                t = t.isScrolling, o(!(void 0 !== t && t))
              }))
            }), []), e && "292903" != t ? i()("ai-head-pic", !n && "hide") : null);
          this.anonymousFunc0 = s, n = e && "292903" != t ? i()("ai-small", !n && "show") : null;
          return this.anonymousFunc1 = s, Object.assign(this.__state, {
            anonymousState__temp: c,
            anonymousState__temp2: n,
            isLogin: e,
            userId: t
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {}
      }, {
        key: "anonymousFunc1",
        value: function(t) {}
      }]), c = n = f, n.$$events = ["anonymousFunc0", "anonymousFunc1"], n.$$componentPath = "components/AiEntry/AiEntry", c)).defaultProps = {}, n.options = {
        addGlobalClass: !0
      }, Component(o(0).default.createComponent(n))
    },
    625: function(t, e, n) {
      t.exports = n.p + "components/AiEntry/AiEntry.wxml"
    }
  },
  [
    [3443, 0, 2, 1]
  ]
]);