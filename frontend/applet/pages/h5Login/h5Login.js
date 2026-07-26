var e = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [650], {
    1859: function(e, n, t) {
      t(514)
    },
    3333: function(n, t, o) {
      o.r(t), o(1859);
      t = o(3);
      var a = o.n(t),
        i = (t = o(0), o.n(t)),
        r = o(1),
        c = o(35),
        s = o.n(c),
        u = o(13);
      c = function(e, n, t) {
        return n && p(e.prototype, n), t && p(e, t), e
      };

      function p(e, n) {
        for (var t = 0; t < n.length; t++) {
          var o = n[t];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
      }

      function l(e) {
        return function() {
          var n = e.apply(this, arguments);
          return new Promise((function(e, t) {
            return function o(a, i) {
              try {
                var r = n[a](i),
                  c = r.value
              } catch (a) {
                return void t(a)
              }
              if (!r.done) return Promise.resolve(c).then((function(e) {
                o("next", e)
              }), (function(e) {
                o("throw", e)
              }));
              e(c)
            }("next")
          }))
        }
      }

      function d(n, t) {
        if (n) return !t || "object" != e(t) && "function" != typeof t ? n : t;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var f, g, h, y, v = i.a.getApp();
      (function(n, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + e(t));
        n.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: n,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(n, t) : n.__proto__ = t)
      })(m, t.Component), c(m, [{
        key: "_constructor",
        value: function(e) {
          (function e(n, t, o) {
            null === n && (n = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(n, t);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(o) : void 0 : null !== (a = Object.getPrototypeOf(n)) ? e(a, t, o) : void 0
          })(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "_constructor", this).call(this, e), this.state = {}, this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "componentWillMount",
        value: function(e) {}
      }, {
        key: "componentDidMount",
        value: function() {
          var e, n = this,
            t = this.$router.params;
          s.a.info("h5Login-params", t), s.a.info("h5Login-schoolJumpToken", i.a.getStorageSync("schoolJumpToken")), t.sessionId && !t.schoolId ? (n.saveLoginInfo(t.sessionId, t.loginerId), i.a.login({
            success: function(e) {
              n.getOpenId(e.code, t.loginerId)
            }
          })) : t.schoolId && i.a.getStorageSync("schoolJumpToken") ? (e = i.a.getStorageSync("schoolJumpToken"), i.a.removeStorage({
            key: "schoolJumpToken"
          }), this.casTokenCommonLogin(t.schoolId, e)) : i.a.redirectTo({
            url: "/pages/find/index/index"
          })
        }
      }, {
        key: "componentDidShow",
        value: function() {}
      }, {
        key: "saveLoginInfo",
        value: (y = l(a.a.mark((function e(n, t, o) {
          return a.a.wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, Object(u.e)();
              case 2:
                i.a.setStorageSync("Cookie", "JSESSIONID=" + n), i.a.setStorageSync("sessionId", n), i.a.setStorageSync("userid", t), v.globalData.isLogin = !0, v.globalData.studentActivate = !0, i.a.setStorage({
                  key: "studentActivate",
                  data: !0
                });
              case 8:
              case "end":
                return e.stop()
            }
          }), e, this)
        }))), function(e, n, t) {
          return y.apply(this, arguments)
        })
      }, {
        key: "casTokenCommonLogin",
        value: (h = l(a.a.mark((function e(n, t) {
          var o, c;
          return a.a.wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                o = this, c = {
                  schoolId: n,
                  token: t
                }, r.a.xyb_request("login/token/casTokenCommonLogin.action", "POST", c, !1, !1).then((function(e) {
                  e.data ? e.data.key ? i.a.redirectTo({
                    url: "/secondBag/pages/mine/schoolcensus/AuthenticationBinding/AuthenticationBinding?key=" + e.data.key
                  }) : (i.a.setStorageSync("encryptValue", e.data.encryptValue), i.a.setStorageSync("encryptValueLogin", e.data.encryptValue), o.saveLoginInfo(e.data.sessionId, e.data.loginerId), i.a.login({
                    success: function(n) {
                      o.getOpenId(n.code, e.data.loginerId)
                    }
                  })) : (i.a.showToast({
                    title: e.msg,
                    icon: "none",
                    duration: 2e3
                  }), i.a.redirectTo({
                    url: "/pages/find/index/index"
                  }))
                }), (function(e) {
                  i.a.showToast({
                    title: e.msg,
                    icon: "none",
                    duration: 3e3
                  }), setTimeout((function() {
                    i.a.redirectTo({
                      url: "/pages/find/index/index"
                    })
                  }), 3e3)
                }));
              case 3:
              case "end":
                return e.stop()
            }
          }), e, this)
        }))), function(e, n) {
          return h.apply(this, arguments)
        })
      }, {
        key: "getOpenId",
        value: (g = l(a.a.mark((function e(n, t) {
          var o, c = this;
          return a.a.wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                o = {
                  code: n,
                  isStudent: 1
                }, r.a.xyb_request("school/common/secret/loadSchoolOpenId!newVersion.action", "POST", o, !1, !1).then((function(e) {
                  var n, o;
                  e.data ? (n = e.data.openId, o = e.data.accessToken, e = e.data.unionId, c.bindEvent(o, e, n, t)) : i.a.redirectTo({
                    url: "/pages/find/index/index"
                  })
                }), (function(e) {
                  i.a.redirectTo({
                    url: "/pages/find/index/index"
                  })
                }));
              case 2:
              case "end":
                return e.stop()
            }
          }), e, this)
        }))), function(e, n) {
          return g.apply(this, arguments)
        })
      }, {
        key: "bindEvent",
        value: (f = l(a.a.mark((function e(n, t, o, c) {
          var s;
          return a.a.wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                s = {
                  accessToken: n,
                  unionId: t,
                  openId: o,
                  loginerId: c
                }, r.a.xyb_request("school/login/wxMiniProgramBindLoginer.action", "POST", s, !1, !1).then((function(e) {
                  e.data && (i.a.setStorageSync("logintype", 1), i.a.getStorageSync("openid", o), i.a.getStorageSync("unionid", t)), i.a.redirectTo({
                    url: "/pages/find/index/index"
                  })
                }), (function(e) {
                  i.a.redirectTo({
                    url: "/pages/find/index/index"
                  })
                }));
              case 2:
              case "end":
                return e.stop()
            }
          }), e, this)
        }))), function(e, n, t, o) {
          return f.apply(this, arguments)
        })
      }, {
        key: "componentWillReceiveProps",
        value: function(e) {}
      }, {
        key: "componentWillUnmount",
        value: function() {}
      }, {
        key: "componentDidHide",
        value: function() {}
      }, {
        key: "_createData",
        value: function() {
          return this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, Object.assign(this.__state, {}), this.__state
        }
      }]), c = t = m, t.$$events = [], t.$$componentPath = "pages/h5Login/h5Login", t = c;

      function m() {
        var e, n;
        ! function(e, n) {
          if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
        }(this, m);
        for (var t = arguments.length, o = Array(t), a = 0; a < t; a++) o[a] = arguments[a];
        return (e = n = d(this, (n = m.__proto__ || Object.getPrototypeOf(m)).call.apply(n, [this].concat(o)))).$usedState = [], n.config = {
          navigationBarTitleText: "统一身份认证登录"
        }, n.customComponents = [], d(n, e)
      }
      Component(o(0).default.createComponent(t, !0))
    },
    514: function(e, n, t) {
      e.exports = t.p + "pages/h5Login/h5Login.wxml"
    }
  },
  [
    [3333, 0, 2, 1, 3]
  ]
]);