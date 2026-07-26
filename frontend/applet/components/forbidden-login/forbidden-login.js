var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [56], {
    2214: function(t, e, n) {
      n(658)
    },
    2215: function(t, e, n) {},
    3476: function(e, n, o) {
      o.r(n), o(2214);
      n = o(3);
      var r = o.n(n),
        i = (n = o(0), o.n(n)),
        a = (n = o(4), n = o.n(n), o(1)),
        c = (o(2215), o(13)),
        s = function(t, e, n) {
          return e && u(t.prototype, e), n && u(t, n), t
        };

      function u(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }

      function p(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function f() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, f);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = p(this, (e = f.__proto__ || Object.getPrototypeOf(f)).call.apply(e, [this].concat(o)))).$usedState = ["isForbiddenLogin"], e.config = {
          component: !0
        }, e.customComponents = [], p(e, t)
      }
      s = n()({
        properties: {
          isForbiddenLogin: {
            type: Boolean,
            value: !1
          }
        },
        data: {},
        ready: function() {},
        detached: function() {},
        methods: {
          toLoginOut: function() {
            var t, e = this;
            this.setData({
              isForbiddenLogin: !1
            }), a.a.xyb_request("login/logout.action", "POST", {}, !1, !1).then((t = function(t) {
              return function() {
                var e = t.apply(this, arguments);
                return new Promise((function(t, n) {
                  return function o(r, i) {
                    try {
                      var a = e[r](i),
                        c = a.value
                    } catch (r) {
                      return void n(r)
                    }
                    if (!a.done) return Promise.resolve(c).then((function(t) {
                      o("next", t)
                    }), (function(t) {
                      o("throw", t)
                    }));
                    t(c)
                  }("next")
                }))
              }
            }(r.a.mark((function t(n) {
              return r.a.wrap((function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return i.a.removeStorage({
                      key: "Cookie",
                      success: function(t) {}
                    }), i.a.setStorageSync("xyb_security_device_fp", ""), i.a.setStorageSync("xyb_security_token", ""), i.a.setStorageSync("xyb_security_token_expire", ""), t.next = 6, Object(c.e)();
                  case 6:
                    i.a.setStorageSync("studentInfoData", ""), i.a.setStorageSync("sessionId", ""), i.a.setStorageSync("encryptValueLogin", ""), i.a.setStorageSync("userid", ""), i.a.setStorageSync("encryptLoginerId", ""), i.a.setStorageSync("logintype", ""), i.a.setStorageSync("userType", "1"), i.a.removeStorageSync("showboxFlag"), i.a.navigateTo({
                      url: "/videoBag/pages/login/login/login"
                    });
                  case 15:
                  case "end":
                    return t.stop()
                }
              }), t, e)
            }))), function(e) {
              return t.apply(this, arguments)
            }), (function(t) {}))
          }
        }
      })((function(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + t(n));
        e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n)
      }(f, i.a.Component), s(f, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, n, o) : void 0
          })(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.data.isForbiddenLogin);
          return this.anonymousFunc0 = function(e) {
            e.stopPropagation(), i.a.eventCenter.trigger("taroClick", {
              funName: "退出登录"
            }), t.toLoginOut(e)
          }, Object.assign(this.__state, {
            isForbiddenLogin: e
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          t.stopPropagation()
        }
      }]), s = n = f, n.$$events = ["anonymousFunc0"], n.$$componentPath = "components/forbidden-login/forbidden-login", n = s)) || n, Component(o(0).default.createComponent(s))
    },
    658: function(t, e, n) {
      t.exports = n.p + "components/forbidden-login/forbidden-login.wxml"
    }
  },
  [
    [3476, 0, 2, 1, 3]
  ]
]);