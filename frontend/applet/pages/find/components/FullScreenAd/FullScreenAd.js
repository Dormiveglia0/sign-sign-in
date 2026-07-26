var t = require("../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [625], {
    1005: function(t, e, n) {
      t.exports = n.p + "pages/find/components/FullScreenAd/FullScreenAd.wxml"
    },
    2908: function(t, e, n) {
      n(1005)
    },
    2909: function(t, e, n) {},
    3815: function(e, n, o) {
      o.r(n), o(2908);
      var a = o(8),
        r = (o(2909), o(0)),
        u = o.n(r),
        c = o(31),
        i = o(51),
        s = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [],
              o = !0,
              a = !1,
              r = void 0;
            try {
              for (var u, c = t[Symbol.iterator](); !(o = (u = c.next()).done) && (n.push(u.value), !e || n.length !== e); o = !0);
            } catch (t) {
              a = !0, r = t
            } finally {
              try {
                !o && c.return && c.return()
              } finally {
                if (a) throw r
              }
            }
            return n
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      n = function(t, e, n) {
        return e && l(t.prototype, e), n && l(t, n), t
      };

      function l(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var f;

      function p(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var m = u.a.getApp();

      function b() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, b);
        for (var n = arguments.length, o = Array(n), a = 0; a < n; a++) o[a] = arguments[a];
        return (t = e = p(this, (e = b.__proto__ || Object.getPrototypeOf(b)).call.apply(e, [this].concat(o)))).$usedState = ["loading", "visible", "safeBottom", "adInfo", "count"], e.customComponents = [], p(e, t)
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
      }(b, u.a.Component), n(b, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(o) : void 0 : null !== (a = Object.getPrototypeOf(e)) ? t(a, n, o) : void 0
          })(b.prototype.__proto__ || Object.getPrototypeOf(b.prototype), "_constructor", this).call(this, t), this.$$refs = new u.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.__props;
          var t = Object(r.useState)(!1),
            e = (t = s(t, 2))[0],
            n = t[1],
            o = (t = Object(c.a)(5), (t = s(t, 3))[0]),
            l = t[1],
            f = t[2],
            p = (t = Object(r.useState)({}), (t = s(t, 2))[0]),
            b = t[1],
            h = Object(r.useRef)(null),
            y = Object(r.useRef)(!1),
            d = Object(r.useRef)(Object(a.b)()).current,
            g = (t = d && d.safeArea && d.screenHeight ? Math.max(d.screenHeight - d.safeArea.bottom, 0) : 0, Object(r.useState)(!m.globalData.hasShowFullScreenAd)),
            v = (g = s(g, 2))[0],
            j = g[1],
            O = function(t, e) {
              Object(i.d)(t, e)
            },
            _ = function(t) {
              y.current = !1, b(t), l(5), n(!0)
            },
            w = function() {
              var t = d.platform;
              m.globalData.hasShowFullScreenAd || "mac" === t || "ohos" === t ? j(!1) : (t = (Object(i.c)(m.globalData.startPageAd) ? m.globalData.startPageAd : null) || Object(i.b)()) ? (_(t), j(!1), m.globalData.hasShowFullScreenAd = !0, Object(i.a)().then((function(t) {
                m.globalData.startPageAd = t
              })).catch((function() {}))) : (t = m.globalData.startPageAdPromise || Object(i.a)(), Promise.race([t, new Promise((function(t) {
                setTimeout((function() {
                  t({
                    isTimeout: !0
                  })
                }), 3e3)
              }))]).then((function(t) {
                t && !t.isTimeout && Object(i.c)(t) && (m.globalData.startPageAd = t, _(t))
              })).catch((function() {})).finally((function() {
                j(!1), m.globalData.hasShowFullScreenAd = !0
              })))
            },
            F = function t() {
              clearTimeout(h.current), f.current <= 0 ? A() : h.current = setTimeout((function() {
                l((function(t) {
                  return t - 1
                })), t()
              }), 1e3)
            },
            A = function() {
              n(!1), clearTimeout(h.current)
            },
            P = (g = function(t) {
              t.stopPropagation(), A()
            }, function() {
              var t, e;
              p.jumpUrl && (O(p.id, 1), A(), 0 === p.linkType || /^https?:\/\//i.test(p.jumpUrl) ? (t = {
                title: p.name,
                url: encodeURIComponent(p.jumpUrl)
              }, u.a.navigateTo({
                url: "/videoBag/pages/h5/h5?model=" + JSON.stringify(t)
              })) : p.jumpUrl.includes("@") ? (t = p.jumpUrl.split("@")[0], e = p.jumpUrl.split("@")[1], u.a.navigateToMiniProgram({
                appId: t,
                path: e,
                envVersion: "release",
                success: function(t) {},
                fail: function(t) {}
              })) : u.a.navigateTo({
                url: p.jumpUrl
              }).catch((function() {
                u.a.showToast({
                  icon: "none",
                  title: "跳转失败"
                })
              })))
            }),
            S = function() {
              y.current || (y.current = !0, O(p.id, 0)), F()
            },
            T = function() {
              A()
            };
          return Object(r.useEffect)((function() {
            return w(),
              function() {
                return clearTimeout(h.current)
              }
          }), []), this.anonymousFunc0 = S, this.anonymousFunc1 = T, this.anonymousFunc2 = P, this.anonymousFunc3 = P, this.anonymousFunc4 = g, Object.assign(this.__state, {
            loading: v,
            visible: e,
            safeBottom: t,
            adInfo: p,
            count: o
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
        value: function(t) {}
      }, {
        key: "anonymousFunc3",
        value: function(t) {}
      }, {
        key: "anonymousFunc4",
        value: function(t) {
          t.stopPropagation()
        }
      }]), f = n = b, n.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4"], n.$$componentPath = "pages/find/components/FullScreenAd/FullScreenAd", f)).defaultProps = {}, n.options = {
        addGlobalClass: !0
      }, Component(o(0).default.createComponent(n))
    }
  },
  [
    [3815, 0, 2, 1, 3]
  ]
]);