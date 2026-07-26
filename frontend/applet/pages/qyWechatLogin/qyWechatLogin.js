var e = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [651], {
    1858: function(e, t, n) {
      n(513)
    },
    3332: function(t, n, o) {
      o.r(n), o(1858);
      n = o(3);
      var a = o.n(n),
        r = o(8),
        i = (n = o(0), o.n(n)),
        c = o(1),
        s = o(13),
        u = function(e, t, n) {
          return t && p(e.prototype, t), n && p(e, n), e
        };

      function p(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
      }

      function l(t, n) {
        if (t) return !n || "object" != e(n) && "function" != typeof n ? t : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var f = i.a.getApp();
      (function(t, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + e(n));
        t.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(t, n) : t.__proto__ = n)
      })(d, n.Component), u(d, [{
        key: "_constructor",
        value: function(e) {
          (function e(t, n, o) {
            null === t && (t = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(t, n);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(o) : void 0 : null !== (a = Object.getPrototypeOf(t)) ? e(a, n, o) : void 0
          })(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "_constructor", this).call(this, e), this.state = {}, this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "componentWillReceiveProps",
        value: function(e) {}
      }, {
        key: "componentWillMount",
        value: function() {}
      }, {
        key: "componentDidMount",
        value: function() {
          var e = this,
            t = this.$router.params;
          if (t.state) return Object(r.a)({
            desc: "用于完善会员资料",
            success: function(n) {
              "wxwork" == n.environment && wx.qy.login({
                success: function(n) {
                  e.loginAction(n.code, t.state)
                }
              })
            },
            fail: function(e) {
              i.a.redirectTo({
                url: "/pages/find/index/index"
              })
            }
          }), !1;
          i.a.redirectTo({
            url: "/pages/find/index/index"
          })
        }
      }, {
        key: "componentDidShow",
        value: function() {}
      }, {
        key: "componentDidHide",
        value: function() {}
      }, {
        key: "componentWillUnmount",
        value: function() {}
      }, {
        key: "loginAction",
        value: function(e, t) {
          var n, o = this;
          c.a.xyb_request("login/cp/weComStudentLogin.action", "POST", {
            state: t,
            code: e,
            newFlag: 1
          }, !1, !0).then((n = function(e) {
            return function() {
              var t = e.apply(this, arguments);
              return new Promise((function(e, n) {
                return function o(a, r) {
                  try {
                    var i = t[a](r),
                      c = i.value
                  } catch (a) {
                    return void n(a)
                  }
                  if (!i.done) return Promise.resolve(c).then((function(e) {
                    o("next", e)
                  }), (function(e) {
                    o("throw", e)
                  }));
                  e(c)
                }("next")
              }))
            }
          }(a.a.mark((function e(t) {
            return a.a.wrap((function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, Object(s.e)();
                case 2:
                  i.a.getApp().globalData.isLogin = !0, t.data && t.data.key ? (i.a.setStorageSync("Cookie", "JSESSIONID=" + t.data.sessionId), i.a.setStorageSync("sessionId", t.data.sessionId), i.a.redirectTo({
                    url: "/secondBag/pages/mine/schoolcensus/AuthenticationBinding/AuthenticationBinding?key=" + t.data.key
                  })) : (i.a.setStorageSync("Cookie", "JSESSIONID=" + t.data), i.a.setStorageSync("sessionId", t.data.sessionId), i.a.setStorageSync("encryptValue", t.data.encryptValue), i.a.setStorageSync("encryptValueLogin", t.data.encryptValue), f.globalData.isLogin = !0, f.globalData.studentActivate = !0, i.a.setStorage({
                    key: "studentActivate",
                    data: !0
                  }), i.a.redirectTo({
                    url: "/pages/find/index/index"
                  }));
                case 5:
                case "end":
                  return e.stop()
              }
            }), e, o)
          }))), function(e) {
            return n.apply(this, arguments)
          }), (function(e) {
            202 == e.code && i.a.redirectTo({
              url: "/pages/AuthenticationError/AuthenticationError?desc=" + e.msg
            })
          })).catch((function() {
            i.a.redirectTo({
              url: "/pages/find/index/index"
            })
          }))
        }
      }, {
        key: "_createData",
        value: function() {
          return this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, Object.assign(this.__state, {}), this.__state
        }
      }]), u = n = d, n.$$events = [], n.$$componentPath = "pages/qyWechatLogin/qyWechatLogin", n = u;

      function d() {
        var e, t;
        ! function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, d);
        for (var n = arguments.length, o = Array(n), a = 0; a < n; a++) o[a] = arguments[a];
        return (e = t = l(this, (t = d.__proto__ || Object.getPrototypeOf(d)).call.apply(t, [this].concat(o)))).$usedState = [], t.config = {
          navigationBarTitleText: "企业微信登录"
        }, t.customComponents = [], l(t, e)
      }
      Component(o(0).default.createComponent(n, !0))
    },
    513: function(e, t, n) {
      e.exports = n.p + "pages/qyWechatLogin/qyWechatLogin.wxml"
    }
  },
  [
    [3332, 0, 2, 1, 3]
  ]
]);