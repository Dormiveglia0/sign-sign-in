var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [54], {
    1952: function(t, e, n) {
      n(536)
    },
    1953: function(t, e, n) {},
    3355: function(e, n, a) {
      a.r(n), a(1952);
      n = a(3);
      var o = a.n(n),
        i = a(8),
        s = a(0),
        r = a.n(s),
        c = (n = a(4), n = a.n(n), a(1)),
        u = a(11),
        l = a(14),
        g = (a(1953), a(5)),
        d = a.n(g),
        f = a(9),
        p = (g = a(6), a(44)),
        y = a(13),
        h = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [],
              a = !0,
              o = !1,
              i = void 0;
            try {
              for (var s, r = t[Symbol.iterator](); !(a = (s = r.next()).done) && (n.push(s.value), !e || n.length !== e); a = !0);
            } catch (t) {
              o = !0, i = t
            } finally {
              try {
                !a && r.return && r.return()
              } finally {
                if (o) throw i
              }
            }
            return n
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        },
        S = function(t, e, n) {
          return e && m(t.prototype, e), n && m(t, n), t
        };

      function m(t, e) {
        for (var n = 0; n < e.length; n++) {
          var a = e[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a)
        }
      }

      function v(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function w(t) {
        return function() {
          var e = t.apply(this, arguments);
          return new Promise((function(t, n) {
            return function a(o, i) {
              try {
                var s = e[o](i),
                  r = s.value
              } catch (o) {
                return void n(o)
              }
              if (!s.done) return Promise.resolve(r).then((function(t) {
                a("next", t)
              }), (function(t) {
                a("throw", t)
              }));
              t(r)
            }("next")
          }))
        }
      }
      var b, x, I, D = r.a.getApp();
      g = Object(g.connect)((function(t) {
        return {
          xybData: t.xybData
        }
      }), (function(t) {
        return {
          setxybdata: function(e) {
            t(Object(f.a)(e))
          }
        }
      }))(S = n()({
        options: {
          multipleSlots: !0
        },
        properties: {
          title: {
            type: String,
            value: "标题"
          },
          source: {
            type: String,
            value: ""
          },
          showLogin: {
            type: Boolean,
            value: !1
          },
          posResumeMatch: {
            type: Boolean,
            value: !1
          },
          currentEnvironment: {
            type: String,
            value: D.globalData.currentEnvironment
          },
          isFromRecomm: {
            type: Boolean,
            value: !1
          },
          needTips: {
            type: Boolean,
            value: !0
          },
          isFromGuest: {
            type: Boolean,
            value: !1
          }
        },
        data: {
          result: "",
          mobile: "",
          errorMsg: "",
          complete: !1,
          showbind: !1,
          wxUserInfo: {},
          filePath: "",
          currentEnvironment: "",
          wxSessionKey: "",
          ifIphoneX: !1,
          tipFlag: !1,
          statusHeight: 88,
          canIUseGetUserProfile: !1,
          selectDeal2: !1,
          isShowLoading: !1,
          isShowLoadingAnimate: !1,
          canFastLogin: !1
        },
        observers: {
          showLogin: function(t) {
            t && this.checkCanFastLogin()
          }
        },
        ready: function() {
          r.a.getStorageSync("wxUserInfo") && this.setData({
            wxUserInfo: r.a.getStorageSync("wxUserInfo")
          }), wx.getUserProfile && this.setData({
            canIUseGetUserProfile: !0
          }), this.setData({
            ifIphoneX: D.globalData.isIphoneX
          });
          var t = this;
          D.globalData.currentEnvironment ? t.data.currentEnvironment = D.globalData.currentEnvironment : Object(i.a)({
            success: function(e) {
              D.globalData.currentEnvironment = e.environment || "", t.data.currentEnvironment = e.environment || ""
            }
          }), r.a.downloadFile({
            url: "https://xcxstatic.xybsyw.com/static/avatar_man.png",
            success: function(e) {
              200 === e.statusCode && t.setData({
                filePath: e.tempFilePath
              })
            }
          }), Object(i.a)({
            success: function(e) {
              var n = !!e.system && -1 < e.system.indexOf("iOS");
              t.setData({
                statusHeight: e.statusBarHeight + (n ? 44 : 48)
              })
            }
          })
        },
        methods: {
          wxlogin: function() {
            var t = this;
            return Object(i.a)({
              success: function(t) {
                var e;
                t && (t.model, e = !1, (e = t && t.system && "function" == typeof t.system.toLowerCase ? !!(t.system.toLowerCase().search("ios") + 1) : e) && (44 <= t.statusBarHeight ? D.globalData.isIphoneX = !0 : D.globalData.isIphoneX = !1), D.globalData.currentEnvironment = t.environment || "", r.a.setStorageSync("xcxCurrentEnvironment", D.globalData.currentEnvironment))
              }
            }), D.globalData.baseUrl, new Promise((function(e, n) {
              var a, i;
              D.globalData.currentEnvironment && "wxwork" == D.globalData.currentEnvironment ? r.a.qy.login({
                success: (i = w(o.a.mark((function a(i) {
                  var s;
                  return o.a.wrap((function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (i.code) return t.next = 5, Object(y.a)("login/LoginByQyWx!getQyUserId.action");
                        t.next = 7;
                        break;
                      case 5:
                        s = t.sent, r.a.request({
                          url: s,
                          data: {
                            code: i.code
                          },
                          method: "POST",
                          header: {
                            Cookie: r.a.getStorageSync("Cookie"),
                            v: l.default.WxStudentVersion,
                            devicecode: p.a.fp(),
                            "content-type": "application/x-www-form-urlencoded"
                          },
                          success: function(t) {
                            t.data.data ? (r.a.setStorageSync("openid", t.data.data.deviceId), r.a.setStorageSync("sessionKey", t.data.data.sessionKey), e(t)) : n(error)
                          },
                          fail: function(t) {
                            n(t)
                          }
                        });
                      case 7:
                      case "end":
                        return t.stop()
                    }
                  }), a, t)
                }))), function(t) {
                  return i.apply(this, arguments)
                }),
                fail: function(t) {
                  n(t)
                }
              }) : r.a.login({
                success: (a = w(o.a.mark((function a(i) {
                  var s;
                  return o.a.wrap((function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        if (i.code) return a.next = 3, Object(y.a)("common/getOpenId.action");
                        a.next = 5;
                        break;
                      case 3:
                        s = a.sent, r.a.request({
                          url: s,
                          data: {
                            fp: Object(y.b)(),
                            code: i.code
                          },
                          method: "POST",
                          header: {
                            v: l.default.WxStudentVersion,
                            devicecode: p.a.fp(),
                            "content-type": "application/x-www-form-urlencoded",
                            Cookie: r.a.getStorageSync("Cookie")
                          },
                          success: function() {
                            var n = w(o.a.mark((function n(a) {
                              return o.a.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                  case 0:
                                    a.data.data ? (r.a.removeStorageSync("indexPostListCache"), r.a.setStorageSync("openid", a.data.data.openId), r.a.setStorageSync("sessionKey", a.data.data.sessionKey), r.a.setStorageSync("encryptValue", a.data.data.encryptValue), r.a.setStorageSync("sessionId", a.data.data.sessionId), r.a.setStorageSync("Cookie", "JSESSIONID=" + a.data.data.sessionId), r.a.removeStorageSync("indexPostListCache"), e(a)) : r.a.showToast({
                                      title: "微信登录失败,请选择其他方式!",
                                      icon: "none"
                                    });
                                  case 1:
                                  case "end":
                                    return t.stop()
                                }
                              }), n, t)
                            })));
                            return function(t) {
                              return n.apply(this, arguments)
                            }
                          }(),
                          fail: function(t) {
                            n(t)
                          }
                        });
                      case 5:
                      case "end":
                        return a.stop()
                    }
                  }), a, t)
                }))), function(t) {
                  return a.apply(this, arguments)
                })
              })
            }))
          },
          closeLogin: function() {
            this.data.isFromRecomm || this.triggerEvent("closeLogin")
          },
          closePhone: function() {
            this.setData({
              showbind: !1
            }), D.globalData.currentEnvironment && "wxwork" == D.globalData.currentEnvironment && this.wxlogin()
          },
          toAccountLogin: function() {
            var t = getCurrentPages();
            "videoBag/pages/login/login/login" !== t[t.length - 1].route && (t = this.data.isFromGuest ? "?isFromGuest=1" : "", r.a.navigateTo({
              url: "/videoBag/pages/login/login/login" + t
            })), this.closeLogin()
          },
          getUserInfo: function(t) {
            var e;
            this.data.selectDeal2 ? (e = this, wx.getUserProfile({
              desc: "用于完善会员资料",
              success: function(t) {
                r.a.setStorageSync("wxUserInfo", t.userInfo), e.setData({
                  wxUserInfo: t.userInfo
                });
                var n = r.a.getStorageSync("sessionKey") || "";
                n ? c.a.xyb_request("common/getUnionId.action", "POST", {
                  encryptedData: t.encryptedData,
                  iv: t.iv,
                  key: n
                }, !1, !1).then((function(t) {
                  var n = t.data.unionId;
                  r.a.setStorageSync("unionid", n), r.a.getStorage({
                    key: "openid",
                    success: function(t) {
                      e.usewxlogin(t.data, n)
                    }
                  })
                }), (function(t) {})) : e.wxlogin().then((function(n) {
                  c.a.xyb_request("common/getUnionId.action", "POST", {
                    encryptedData: t.encryptedData,
                    iv: t.iv,
                    key: n.data.data.sessionKey
                  }, !1, !1).then((function(t) {
                    var n = t.data.unionId;
                    r.a.setStorageSync("unionid", n), r.a.getStorage({
                      key: "openid",
                      success: function(t) {
                        e.usewxlogin(t.data, n)
                      }
                    })
                  }), (function(t) {}))
                }), (function(t) {}))
              },
              fail: function(t) {
                r.a.showToast({
                  title: "您已拒绝，登录失败",
                  icon: "none"
                })
              }
            }), this.closeLogin()) : r.a.showToast({
              title: "请先同意协议",
              icon: "none"
            })
          },
          getUserProfile: function() {
            var t, e;
            this.data.selectDeal2 || 0 < arguments.length && void 0 !== arguments[0] && arguments[0] ? (t = this, (e = r.a.getStorageSync("wxUserInfo")) && e.nickName ? t.wxlogin().then((function(e) {
              var n;
              e.data.data.unionId && (n = e.data.data.unionId, r.a.setStorageSync("unionid", n), r.a.getStorage({
                key: "openid",
                success: function(e) {
                  t.usewxlogin(e.data, n)
                }
              }))
            }), (function(t) {})) : this.getUserProfileFun(), this.closeLogin()) : r.a.showToast({
              title: "请先同意协议",
              icon: "none"
            })
          },
          getUserProfileFun: function() {
            var t = this;
            wx.getUserProfile({
              desc: "登录",
              lang: "zh_CN",
              success: function(e) {
                r.a.setStorageSync("wxUserInfo", e.userInfo), t.setData({
                  wxUserInfo: e.userInfo
                }), t.wxlogin().then((function(n) {
                  var a;
                  n.data.data.unionId ? (a = n.data.data.unionId, r.a.setStorageSync("unionid", a), r.a.getStorage({
                    key: "openid",
                    success: function(e) {
                      t.usewxlogin(e.data, a)
                    }
                  })) : c.a.xyb_request("common/getUnionId.action", "POST", {
                    encryptedData: e.encryptedData,
                    iv: e.iv,
                    key: n.data.data.sessionKey
                  }, !1, !1).then((function(e) {
                    var n = e.data.unionId;
                    r.a.setStorageSync("unionid", n), r.a.getStorage({
                      key: "openid",
                      success: function(e) {
                        t.usewxlogin(e.data, n)
                      }
                    })
                  }), (function(t) {}))
                }), (function(t) {}))
              },
              fail: function(t) {
                r.a.showToast({
                  title: "您已拒绝，登录失败",
                  icon: "none"
                })
              }
            })
          },
          getEnterpriseUserInfo: function(t) {
            var e = this,
              n = r.a.getStorageSync("openid") || null;
            c.a.xyb_request("login/LoginByQyWx!qyWxBind.action", "POST", {
              deviceId: n,
              phone: null
            }, !1, !1).then((function(t) {
              200 == t.code && "success" == t.msg ? e.qyWxBind() : e.toAccountLogin()
            }), (function(t) {})), this.closeLogin()
          },
          enterpriseLogin: function(t) {
            var e;
            this.data.selectDeal2 ? (e = this).wxlogin().then((function() {
              e.qyWxBind()
            })).catch((function() {
              e.toAccountLogin()
            })) : r.a.showToast({
              title: "请先同意协议",
              icon: "none"
            })
          },
          getEnterpriseUserPhone: function(t) {
            var e = this,
              n = this;
            c.a.xyb_request("common/GetPhone!getNew.action", "POST", {
              code: t.detail.code
            }, !1, !1).then((function(t) {
              t.data.phone ? (r.a.getStorageSync("wxUserInfo") && n.setData({
                wxUserInfo: r.a.getStorageSync("wxUserInfo")
              }), n.wxlogin().then((function(e) {
                n.uploadImg(t.data.phone)
              }), (function(t) {
                r.a.showToast({
                  title: "企业微信快速登录失败,请选择其他方式!",
                  icon: "none"
                }), setTimeout((function() {
                  n.toAccountLogin()
                }), 2e3)
              }))) : (r.a.showToast({
                title: "企业微信快速登录失败,请选择其他方式!",
                icon: "none"
              }), e.toAccountLogin()), n.setData({
                showbind: !1
              })
            }), (function(t) {
              n.wxlogin()
            }))
          },
          patchCache: function() {
            var t, e = (a = new Date).getFullYear(),
              n = a.getMonth() + 1,
              a = a.getDate();
            "" != r.a.getStorageSync("sfxyLoginCount") && r.a.getStorageSync("sfxyLoginCount") == e + "/" + n + "/" + a ? (t = r.a.getStorageSync("todayLoginCount") ? r.a.getStorageSync("todayLoginCount") : 0, r.a.setStorageSync("todayLoginCount", t + 1)) : (r.a.setStorageSync("sfxyLoginCount", e + "/" + n + "/" + a), r.a.setStorageSync("todayLoginCount", 1), r.a.setStorageSync("todayJumpCount", 0))
          },
          usewxlogin: function(t, e) {
            var n, a = this,
              i = this;
            c.a.xyb_request("login/login!checkWxBind.action", "POST", {
              openId: t,
              unionId: e
            }, !1, !1).then((n = w(o.a.mark((function n(s) {
              return o.a.wrap((function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    return n.next = 2, Object(y.e)();
                  case 2:
                    r.a.setStorageSync("Cookie", "JSESSIONID=" + s.data.sessionId), s.data.bind ? (a.setData({
                      complete: s.data.complete
                    }), c.a.xyb_request("login/login!wx.action", "POST", {
                      openId: t,
                      unionId: e
                    }, !1, !1).then(function() {
                      var t = w(o.a.mark((function t(e) {
                        var n;
                        return o.a.wrap((function(t) {
                          for (;;) switch (t.prev = t.next) {
                            case 0:
                              return t.next = 2, Object(y.e)();
                            case 2:
                              r.a.removeStorageSync("indexPostListCache"), r.a.setStorageSync("logintype", "1"), r.a.setStorageSync("sessionId", e.data.sessionId), r.a.setStorageSync("encryptValue", e.data.encryptValue), r.a.setStorageSync("encryptValueLogin", e.data.encryptValue), r.a.setStorageSync("username", e.data.md5Uid), D.globalData.isLogin = !0, "" != e.data.loginerId && "null" != e.data.loginerId && (r.a.setStorageSync("userid", e.data.loginerId), r.a.setStorageSync("encryptLoginerId", e.data.encryptLoginerId)), r.a.setStorageSync("Cookie", "JSESSIONID=" + e.data.sessionId), n = Date.parse(new Date), n += 36e5, r.a.setStorageSync("Cookie_time", n), D.globalData.shareschoolId = "", r.a.setStorage({
                                key: "studentActivate",
                                data: e.data.activate
                              }), D.globalData.studentActivate = e.data.activate, a.triggerEvent("receive", !1, {
                                bubbles: !1
                              }), D.globalData.isLogin = !0, a.triggerEvent("receiveLogin", !0, {
                                bubbles: !1
                              }), a.setData({
                                tipFlag: !0
                              }), setTimeout((function() {
                                i.setData({
                                  tipFlag: !1
                                })
                              }), 1500), a.patchCache();
                            case 23:
                            case "end":
                              return t.stop()
                          }
                        }), t, a)
                      })));
                      return function(e) {
                        return t.apply(this, arguments)
                      }
                    }(), (function(t) {}))) : a.setData({
                      showbind: !0
                    });
                  case 4:
                  case "end":
                    return n.stop()
                }
              }), n, a)
            }))), function(t) {
              return n.apply(this, arguments)
            }), (function(t) {}))
          },
          getAccountinfo: function() {
            c.a.xyb_request("account/LoadAccountInfo.action", "POST", {}, !1, !1).then((function(t) {
              r.a.setStorageSync("loginerName", t.data.loginer), r.a.setStorageSync("studentInfoData", t.data), r.a.setStorageSync("schoolId", t.data.schoolId), r.a.setStorage({
                key: "studentActivate",
                data: t.data.activate
              }), D.globalData.studentActivate = t.data.activate, D.globalData.userSchoolInfo = t.data
            }), (function(t) {}))
          },
          getCustomNoun: function() {
            var t = this;
            c.a.xyb_request("login/schoolNoun.action", "POST", {}, !1, !1).then((function(e) {
              var n;
              "200" === e.code && (n = t.props.xybData, e.data.menuNoun) && e.data.pageNoun && (n.menuNoun = e.data.menuNoun, n.pageNoun = e.data.pageNoun, t.props.setxybdata(n))
            }))
          },
          uploadImg: function(t) {
            var e, n = this,
              a = this;
            if (!(e = D.globalData.currentEnvironment && "wxwork" == D.globalData.currentEnvironment || !a.data.wxUserInfo || !a.data.wxUserInfo.avatarUrl ? null : a.data.wxUserInfo.avatarUrl)) return D.globalData.currentEnvironment && "wxwork" == D.globalData.currentEnvironment ? a.qyWxBind(t) : a.getIsMobile(t, null), !1;
            r.a.downloadFile({
              url: e,
              success: function(e) {
                200 === e.statusCode && (a.setData({
                  filePath: e.tempFilePath
                }), D.globalData.currentEnvironment && "wxwork" == D.globalData.currentEnvironment ? a.qyWxBind(t) : u.a.upLoadOss(n.data.filePath, "STUDENT", "WX_AVATAR_IMAGES", !0, !1).then((function(e) {
                  e && e.key && a.getIsMobile(t, e.key)
                })).catch((function() {})))
              }
            })
          },
          getPhoneNumber: function(t) {
            t.detail.encryptedData ? this.loginByWXGetPhone(t.detail.code) : (this.setData({
              showbind: !1
            }), this.toAccountLogin())
          },
          loginByWXGetPhone: (I = w(o.a.mark((function t(e) {
            var n = this;
            return o.a.wrap((function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  c.a.xyb_request("login/LoginByMobileAutomatic.action", "POST", {
                    code: e,
                    openId: r.a.getStorageSync("openid"),
                    unionId: r.a.getStorageSync("unionid")
                  }, !0, !0).then((function(t) {
                    "200" === t.code ? n.loginSuccess(t) : n.toAccountLogin()
                  }), (function(t) {
                    "200" !== t.code && n.toAccountLogin()
                  }));
                case 1:
                case "end":
                  return t.stop()
              }
            }), t, this)
          }))), function(t) {
            return I.apply(this, arguments)
          }),
          loginSuccess: (x = w(o.a.mark((function t(e) {
            var n, a, i = this;
            return o.a.wrap((function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  if (n = e.data, 200 == e.code) return t.next = 5, Object(y.e)();
                  t.next = 28;
                  break;
                case 5:
                  this.triggerEvent("receive", !1, {
                    bubbles: !1
                  }), this.patchCache(), r.a.removeStorageSync("indexPostListCache"), r.a.setStorageSync("logintype", "1"), r.a.setStorageSync("sessionId", n.sessionId), r.a.setStorageSync("encryptValue", n.encryptValue), r.a.setStorageSync("encryptValueLogin", n.encryptValue), r.a.setStorageSync("userid", n.loginerId), r.a.setStorageSync("encryptLoginerId", e.data.encryptLoginerId), r.a.setStorageSync("Cookie", "JSESSIONID=" + n.sessionId), a = Date.parse(new Date), a += 36e5, r.a.setStorageSync("Cookie_time", a), r.a.setStorageSync("username", n.md5Uid || n.phone), D.globalData.isLogin = !0, this.getAccountinfo(), this.getCustomNoun(), this.closeLogin(), D.globalData.shareschoolId = "", r.a.setStorage({
                    key: "studentActivate",
                    data: n.activate
                  }), n.activate || this.data.isFromGuest ? this.data.needTips ? (this.setData({
                    tipFlag: !0
                  }), setTimeout((function() {
                    i.setData({
                      tipFlag: !1
                    }), i.triggerEvent("receiveLogin", !0, {
                      bubbles: !1
                    })
                  }), 1500)) : this.triggerEvent("receiveLogin", !0, {
                    bubbles: !1
                  }) : this.openLoading().then((function() {
                    r.a.reLaunch({
                      url: "/secondBag/pages/mine/schoolcensus/index/index"
                    })
                  })), t.next = 29;
                  break;
                case 28:
                  r.a.showToast({
                    title: e.msg,
                    icon: "none"
                  });
                case 29:
                case "end":
                  return t.stop()
              }
            }), t, this)
          }))), function(t) {
            return x.apply(this, arguments)
          }),
          getIsMobile: function(t, e) {
            var n = this;
            c.a.xyb_request("common/GetIsMobile.action", "POST", {
              mobile: t,
              unionId: r.a.getStorageSync("unionid") || ""
            }, !1, !1).then((function(a) {
              a.data.isMobile ? n.usewxbind(t, e) : r.a.navigateTo({
                url: "/videoBag/pages/login/login/login?phone=" + t
              })
            }), (function(t) {}))
          },
          usewxbind: function(t, e) {
            var n = this;
            D.globalData.baseUrl, t = {
              openId: r.a.getStorageSync("openid") || null,
              unionId: r.a.getStorageSync("unionid") || null,
              phone: t,
              wxname: this.data.wxUserInfo.nickName,
              wxCity: this.data.wxUserInfo.city
            };
            e && (t.avatarTempPath = e), c.a.xyb_request("login/loginByMobileOrThird!wxBind.action", "POST", t, !1, !1).then((function(t) {
              t.data && n.loginSuccess(t)
            }), (function(t) {
              r.a.showToast({
                title: "绑定失败",
                icon: "none"
              })
            }))
          },
          qyWxBind: function(t) {
            var e, n = this,
              a = this,
              i = r.a.getStorageSync("openid") || null;
            c.a.xyb_request("login/LoginByQyWx!qyWxBind.action", "POST", {
              deviceId: i,
              phone: t || null
            }, !1, !0).then((e = w(o.a.mark((function e(i) {
              var s, c;
              return o.a.wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (s = i, a.triggerEvent("receive", !1, {
                        bubbles: !1
                      }), 200 == i.code) return e.next = 5, Object(y.e)();
                    e.next = 26;
                    break;
                  case 5:
                    n.getAccountinfo(), n.getCustomNoun(), n.patchCache(), r.a.removeStorageSync("indexPostListCache"), r.a.setStorageSync("logintype", "1"), r.a.setStorageSync("qywxPhone", t), r.a.setStorageSync("sessionId", s.data.sessionId), r.a.setStorageSync("encryptValue", s.data.encryptValue), r.a.setStorageSync("encryptValueLogin", s.data.encryptValue), r.a.setStorageSync("userid", s.data.loginerId), r.a.setStorageSync("encryptLoginerId", i.data.encryptLoginerId), r.a.setStorageSync("Cookie", "JSESSIONID=" + s.data.sessionId), c = Date.parse(new Date), c += 36e5, r.a.setStorageSync("Cookie_time", c), a.triggerEvent("receiveLogin", !0, {
                      bubbles: !1
                    }), D.globalData.isLogin = !0, D.globalData.shareschoolId = "", r.a.reLaunch({
                      url: "/pages/find/index/index?fromAutoLogin=true"
                    }), e.next = 28;
                    break;
                  case 26:
                    a.toAccountLogin();
                  case 28:
                  case "end":
                    return e.stop()
                }
              }), e, n)
            }))), function(t) {
              return e.apply(this, arguments)
            }), (function(t) {
              n.toAccountLogin()
            })).catch((function() {
              n.toAccountLogin()
            }))
          },
          show: function() {
            this.setData({
              isShow: !this.data.isShow
            })
          },
          selectRadio: function(t) {
            this.setData({
              result: t.currentTarget.dataset.result,
              isShow: !1
            }), t = this.data.result, this.triggerEvent("receive", t, {
              bubbles: !1
            })
          },
          jumpUserAgreement: function(t) {
            r.a.eventCenter.trigger("taroClick", {
              funName: "快速登录点击-" + (0 === t ? "校友邦用户协议" : "校友邦隐私政策")
            });
            var e = l.default.APPHTTP + "pages/webPage.html#/userAgreement?tabIndex=" + t;
            t = {
              title: 0 === t ? "校友邦用户协议" : "校友邦隐私政策",
              url: encodeURIComponent(e)
            };
            r.a.navigateTo({
              url: "/videoBag/pages/h5/h5?model=" + JSON.stringify(t)
            })
          },
          uploadAvatar: function() {
            var t = this;
            return new Promise((function(e) {
              var n;
              (n = D.globalData.currentEnvironment && "wxwork" === D.globalData.currentEnvironment || !t.data.wxUserInfo || !t.data.wxUserInfo.avatarUrl ? null : t.data.wxUserInfo.avatarUrl) ? r.a.downloadFile({
                url: n,
                success: function(n) {
                  200 === n.statusCode && (t.setData({
                    filePath: n.tempFilePath
                  }), D.globalData.currentEnvironment && "wxwork" === D.globalData.currentEnvironment ? e("") : u.a.upLoadOss(t.data.filePath, "STUDENT", "WX_AVATAR_IMAGES", !0, !1).then((function(t) {
                    e(t.key)
                  })).catch((function() {
                    e("")
                  })))
                }
              }): e("")
            }))
          },
          timer1: null,
          timer2: null,
          openLoading: function() {
            var t = this;
            return new Promise((function(e, n) {
              clearTimeout(t.timer1), clearTimeout(t.timer2), t.setData({
                isShowLoading: !0
              }, (function() {
                t.timer1 = setTimeout((function() {
                  t.setData({
                    isShowLoadingAnimate: !0
                  }), e()
                }), 2e3), t.timer2 = setTimeout((function() {
                  t.setData({
                    isShowLoading: !1,
                    isShowLoadingAnimate: !1
                  })
                }), 2500)
              }))
            }))
          },
          checkCanFastLogin: function() {
            var t = this;
            return new Promise((function(e) {
              t.wxlogin().then((function(n) {
                var a, i = n.data.data.unionId;
                i && r.a.setStorageSync("unionid", i), n = n.data.data.openId || r.a.getStorageSync({
                  key: "openid"
                });
                !r.a.getStorageSync({
                  key: "openid"
                }) && n && r.a.setStorageSync("openid", n), c.a.xyb_request("login/login!checkWxBind.action", "POST", {
                  openId: n,
                  unionId: i
                }, !1, !1).then((a = w(o.a.mark((function n(a) {
                  return o.a.wrap((function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        return n.next = 2, Object(y.e)();
                      case 2:
                        r.a.setStorageSync("Cookie", "JSESSIONID=" + a.data.sessionId), t.setData({
                          canFastLogin: a.data.bind
                        }), e(a.data.bind);
                      case 5:
                      case "end":
                        return n.stop()
                    }
                  }), n, t)
                }))), function(t) {
                  return a.apply(this, arguments)
                }), (function(t) {
                  e(!1)
                }))
              }), (function(t) {}))
            }))
          },
          getUnionId: function(t) {
            var e, n = void 0 === (e = t.encryptedData) ? "" : e,
              a = void 0 === (e = t.iv) ? "" : e;
            return new Promise((function(t) {
              c.a.xyb_request("common/getUnionId.action", "POST", {
                encryptedData: n,
                iv: a,
                key: r.a.getStorageSync("sessionKey") || ""
              }, !1, !1).then((function(e) {
                (e = e.data.unionId) && r.a.setStorageSync("unionid", e), t(e)
              }), (function(t) {}))
            }))
          },
          onGetPhoneNumber: (b = w(o.a.mark((function t(e) {
            return o.a.wrap((function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  e.detail.encryptedData ? this.loginByWXGetPhone(e.detail.code) : (this.closeLogin(), this.toAccountLogin());
                case 2:
                case "end":
                  return t.stop()
              }
            }), t, this)
          }))), function(t) {
            return b.apply(this, arguments)
          }),
          fastLogin: function() {
            var t, e = this,
              n = r.a.getStorageSync("openid") || null,
              a = r.a.getStorageSync("unionid") || null;
            c.a.xyb_request("login/login!wx.action", "POST", {
              openId: n,
              unionId: a
            }, !1, !1).then((t = w(o.a.mark((function t(n) {
              return o.a.wrap((function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    e.loginSuccess(n);
                  case 1:
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
      }(L, r.a.Component), S(L, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, a) {
            null === e && (e = Function.prototype);
            var o = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== o ? "value" in o ? o.value : void 0 !== (o = o.get) ? o.call(a) : void 0 : null !== (o = Object.getPrototypeOf(e)) ? t(o, n, a) : void 0
          })(L.prototype.__proto__ || Object.getPrototypeOf(L.prototype), "_constructor", this).call(this, t), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            n = this.closeLogin,
            a = (e = Object(s.genCompid)(e + "$compid__2818"), (e = h(e, 2))[0]),
            o = (e = e[1], (v = this.data).selectDeal2),
            i = v.showLogin,
            c = v.posResumeMatch,
            u = v.currentEnvironment,
            l = v.showbind,
            g = v.ifIphoneX,
            f = v.tipFlag,
            p = v.statusHeight,
            y = v.canFastLogin,
            S = v.isFromRecomm,
            m = v.isShowLoading,
            v = v.isShowLoadingAnimate;
          this.anonymousFunc0 = function(e) {
            e.stopPropagation(), t.closeLogin(e)
          }, this.anonymousFunc1 = function() {
            t.data.selectDeal2 || r.a.showToast({
              title: "请先同意协议",
              icon: "none"
            })
          }, this.anonymousFunc2 = function() {
            return t.setData({
              selectDeal2: !0
            })
          }, this.anonymousFunc3 = function() {
            return t.setData({
              selectDeal2: !1
            })
          }, this.anonymousFunc4 = function() {
            return t.setData({
              selectDeal2: !t.data.selectDeal2
            })
          }, this.anonymousFunc5 = function() {
            return t.jumpUserAgreement(0)
          }, this.anonymousFunc6 = function() {
            return t.jumpUserAgreement(1)
          }, this.anonymousFunc7 = function(e) {
            e.stopPropagation(), t.closePhone(e)
          }, v = m ? d()("certification-loading", v && "certification-loading-hide") : null;
          return m && s.propsManager.set({
            color: "#ff453a",
            size: 68
          }, e, a), Object.assign(this.__state, {
            anonymousState__temp: v,
            $compid__2818: e,
            tipFlag: f,
            statusHeight: p,
            showLogin: i,
            closeLogin: n,
            ifIphoneX: g,
            isFromRecomm: S,
            currentEnvironment: u,
            canFastLogin: y,
            selectDeal2: o,
            showbind: l,
            isShowLoading: m,
            posResumeMatch: c
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          t.stopPropagation()
        }
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
        value: function(t) {}
      }, {
        key: "anonymousFunc5",
        value: function(t) {}
      }, {
        key: "anonymousFunc6",
        value: function(t) {}
      }, {
        key: "anonymousFunc7",
        value: function(t) {
          t.stopPropagation()
        }
      }]), n = g = L, g.$$events = ["closeLogin", "anonymousFunc0", "toAccountLogin", "fastLogin", "anonymousFunc1", "enterpriseLogin", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5", "anonymousFunc6", "anonymousFunc7", "getPhoneNumber", "getEnterpriseUserPhone"], g.options = {
        addGlobalClass: !0
      }, g.$$componentPath = "components/fastlogin/fastlogin", S = n)) || S) || S;

      function L() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, L);
        for (var n = arguments.length, a = Array(n), o = 0; o < n; o++) a[o] = arguments[o];
        return (t = e = v(this, (e = L.__proto__ || Object.getPrototypeOf(L)).call.apply(e, [this].concat(a)))).$usedState = ["anonymousState__temp", "$compid__2818", "tipFlag", "statusHeight", "showLogin", "closeLogin", "ifIphoneX", "isFromRecomm", "currentEnvironment", "canFastLogin", "selectDeal2", "showbind", "isShowLoading", "posResumeMatch", "xybData", "setxybdata"], e.config = {
          component: !0,
          usingComponents: {
            "van-popup": "../../vant-weapp/dist/popup/index"
          }
        }, e.customComponents = ["AtActivityIndicator"], v(e, t)
      }
      Component(a(0).default.createComponent(g))
    },
    536: function(t, e, n) {
      t.exports = n.p + "components/fastlogin/fastlogin.wxml"
    }
  },
  [
    [3355, 0, 2, 1, 3]
  ]
]);