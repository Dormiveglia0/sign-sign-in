require("./@babel/runtime/helpers/Arrayincludes");
var e = require("./@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [3], {
    1: function(t, n, a) {
      var r, i = a(3),
        o = a.n(i),
        s = (i = a(0), a.n(i)),
        c = a(44),
        u = a(68),
        l = a(14),
        p = (a(16), a(36), a(84)),
        d = a(67),
        g = a(13),
        f = Object.assign || function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n, a = arguments[t];
            for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n])
          }
          return e
        },
        m = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
          return e(t)
        } : function(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
        },
        h = (r = y(o.a.mark((function e(t, n, a) {
          var r, i, h, I, C, P, D, O, k, R, E, L, M, N, _, F;
          return o.a.wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if ("behavior/Duration.action" !== t.url && "" == s.a.getStorageSync("getOpenIdStorage")) return e.prev = 1, e.next = 4, Object(d.a)().then((function(e) {}), (function(e) {}));
                e.next = 8;
                break;
              case 4:
                e.next = 8;
                break;
              case 6:
                e.prev = 6, e.t0 = e.catch(1);
              case 8:
                if (r = t.url, i = t.method, h = t.data, I = t.needLoading, C = t.needCode, P = t.urlType, D = t.getAbort, R = t.otherOptions, O = (R = R || {}).getRequestInstance, k = R.header, R = R.isSSE, E = w + "", void 0 === P ? E = w + "" : 2 == P ? E = U + "" : 3 == P && (E = B + ""), I && s.a.showLoading({
                    title: "加载中",
                    mask: !0
                  }), h && "object" === (void 0 === h ? "undefined" : m(h)))
                  for (L in h) Array.isArray(h[L]) && 0 === h[L].length && (h[L] = "[]");
                return M = h, h && "object" === (void 0 === h ? "undefined" : m(h)) && !Array.isArray(h) ? M = f({}, h) : null == h && (M = {}), e.next = 19, Object(g.f)(f({}, M), t.url);
              case 19:
                N = e.sent, Object.assign(M, N), t.data = f({}, M, N, {
                  fp: Object(g.b)()
                }), N = s.a.getStorageSync("encryptValue") || "", s.a.getStorageSync("openid"), F = s.a.getStorageSync("xcxCurrentEnvironment") || "", N = {
                  encryptValue: N,
                  wechat: F ? 0 : 1,
                  n: S,
                  v: l.default.WxStudentVersion,
                  Cookie: s.a.getStorageSync("Cookie"),
                  "content-type": "application/x-www-form-urlencoded"
                }, R && (N.Accept = "text/event-stream"), F = null, (c.a.needE(r) || u.a.needEother(r) || "common/getOpenId.action" == r) && (F = c.a.fp(), N.devicecode = F), F = R ? wx : s.a, _ = r && r.includes("http") ? r : E + r, e.t1 = F, P ? (e.t2 = _, e.next = 39) : e.next = 36;
                break;
              case 36:
                return e.next = 38, Object(g.a)(_);
              case 38:
                e.t2 = e.sent;
              case 39:
                e.t3 = e.t2, e.t4 = i, e.t5 = f({}, N, k), e.t6 = M, e.t7 = R || !1, e.t8 = function(e) {
                  var l;
                  if (I && s.a.hideLoading(), e.data) return 1 !== P && P || !e.data.mstv || p.a.checkToken(e.data.mstv, r) ? void(200 == e.data.code ? n(e.data) : 701 == e.data.code ? (A.push({
                    options: t,
                    resolve: n,
                    reject: a
                  }), Object(d.a)().then((function() {
                    x()
                  }), (function(e) {
                    a({
                      msg: "openId获取失败"
                    })
                  })).catch((function(e) {}))) : 205 == e.data.code ? (l = s.a.getApp(), s.a.setStorageSync("sessionId", ""), l.globalData.isLogin = !1, A.push({
                    options: t,
                    resolve: n,
                    reject: a
                  }), function(e, t, n, a, r) {
                    var i = this,
                      c = s.a.getStorageSync("xcxCurrentEnvironment") || null,
                      u = s.a.getStorageSync("encryptValueLogin") || null,
                      l = s.a.getStorageSync("logintype") || null,
                      p = s.a.getStorageSync("openid") || null;
                    return b.push({
                      url: e,
                      method: t,
                      data: n,
                      needLoading: a,
                      needCode: r
                    }), new Promise((function(e, t) {
                      var n, a;
                      return v ? (l || t({
                        showlogin: !0
                      }), !1) : (v = !0, setTimeout((function() {
                        v = !1
                      }), 5e3), u ? (n = {
                        encryptValue: u
                      }, c && "wxwork" == c && (n.deviceId = p), void j("login/AutoLogin.action", "POST", n, !1, !0, "").then((a = y(o.a.mark((function t(n) {
                        var a;
                        return o.a.wrap((function(t) {
                          for (;;) switch (t.prev = t.next) {
                            case 0:
                              return t.next = 2, Object(g.e)();
                            case 2:
                              s.a.setStorageSync("sessionId", n.data.sessionId), s.a.setStorageSync("encryptValue", n.data.encryptValue), s.a.setStorageSync("encryptValueLogin", n.data.encryptValue), s.a.setStorageSync("userid", n.data.loginerId), s.a.setStorageSync("encryptLoginerId", n.data.encryptLoginerId), s.a.setStorageSync("Cookie", "JSESSIONID=" + n.data.sessionId), s.a.removeStorageSync("indexPostListCache"), a = Date.parse(new Date), a += 36e5, s.a.setStorageSync("Cookie_time", a), s.a.getApp().globalData.isLogin = !0, e(n);
                            case 15:
                            case "end":
                              return t.stop()
                          }
                        }), t, i)
                      }))), function(e) {
                        return a.apply(this, arguments)
                      }), (function(e) {
                        s.a.getApp().globalData.isLogin = !1, e && 202 == e.code ? ("自动登录失败" == e.msg && (t(e), s.a.redirectTo({
                          url: "/videoBag/pages/login/login/login"
                        })), t(e)) : e && 401 == e.code ? t(e) : t({
                          showlogin: !0,
                          code: 1e3
                        })
                      }))) : (s.a.getApp().globalData.isLogin = !1, t({
                        showlogin: !0
                      }), !1))
                    }))
                  }(r, i, M, I, C).then((function(e) {
                    s.a.getApp().globalData.isLogin = !0;
                    var t, n = (r = new Date).getFullYear(),
                      a = r.getMonth() + 1,
                      r = r.getDate();
                    "" != s.a.getStorageSync("sfxyLoginCount") && s.a.getStorageSync("sfxyLoginCount") == n + "/" + a + "/" + r ? (t = s.a.getStorageSync("todayLoginCount") ? s.a.getStorageSync("todayLoginCount") : 0, s.a.setStorageSync("todayLoginCount", t + 1)) : (s.a.setStorageSync("sfxyLoginCount", n + "/" + a + "/" + r), s.a.setStorageSync("todayLoginCount", 1), s.a.setStorageSync("todayJumpCount", 0)), x(), T("account/LoadAccountInfo.action", "POST", {}, !1, !1, null, null).then((function(e) {
                      s.a.setStorageSync("loginerName", e.data.loginer), s.a.setStorageSync("studentInfoData", e.data), s.a.setStorageSync("schoolId", e.data.schoolId), s.a.getApp().globalData.userSchoolInfo = e.data
                    }))
                  })).catch((function(e) {
                    s.a.getApp().globalData.isLogin = !1, a(e)
                  }))) : 604 == e.data.code ? (Object(g.c)(), s.a.showToast({
                    title: e.data.msg,
                    icon: "none"
                  }), a(e.data.msg)) : C ? a(e.data) : 202 == e.data.code ? ((c.a.needE(r) || u.a.needEother(r)) && ((l = wx.getDeviceInfo()).brand, l.model, l.system, l.platform, e.data.msg), a(e.data), "账号或密码错误" != e.data.msg && s.a.showToast({
                    title: e.data.msg,
                    icon: "none"
                  })) : e.data.msg && s.a.showToast({
                    title: e.data.msg || "",
                    icon: "none"
                  })) : (s.a.showToast({
                    title: "接口回调异常",
                    icon: "none"
                  }), !1)
                }, e.t9 = function(e) {
                  I && s.a.hideLoading(), a({
                    msg: "请求发生错误"
                  })
                }, e.t10 = function(e) {
                  "request:fail" == e.errMsg && a({
                    msg: "请求发生错误"
                  })
                }, e.t11 = {
                  url: e.t3,
                  method: e.t4,
                  header: e.t5,
                  dataType: "json",
                  data: e.t6,
                  enableChunked: e.t7,
                  success: e.t8,
                  fail: e.t9,
                  complete: e.t10
                }, F = e.t1.request.call(e.t1, e.t11), D && "function" == typeof D && D(F.abort), O && "function" == typeof O && O(F);
              case 51:
              case "end":
                return e.stop()
            }
          }), e, this, [
            [1, 6]
          ])
        }))), function(e, t, n) {
          return r.apply(this, arguments)
        });

      function y(e) {
        return function() {
          var t = e.apply(this, arguments);
          return new Promise((function(e, n) {
            return function a(r, i) {
              try {
                var o = t[r](i),
                  s = o.value
              } catch (r) {
                return void n(r)
              }
              if (!o.done) return Promise.resolve(s).then((function(e) {
                a("next", e)
              }), (function(e) {
                a("throw", e)
              }));
              e(s)
            }("next")
          }))
        }
      }
      var v = !1,
        b = [],
        S = Object(g.d)().join(","),
        w = l.default.HOST,
        U = l.default.APPHTTP,
        B = l.default.WEBSOCKETURL_HTTP,
        x = function() {
          for (; 0 < A.length;) I = A.shift(), h(I.options, I.resolve, I.reject)
        },
        I = null,
        A = [];

      function T(e, t, n, a, r, i, o, s) {
        return new Promise((function(c, u) {
          h({
            url: e,
            method: t,
            data: n,
            needLoading: a,
            needCode: r,
            urlType: i,
            getAbort: o,
            otherOptions: s
          }, c, u)
        }))
      }

      function j(e, t, n, a, r, i) {
        return new Promise((function(o, s) {
          h({
            url: e,
            method: t,
            data: n,
            needLoading: a,
            needCode: r,
            urlType: i
          }, o, s)
        }))
      }
      n.a = {
        xyb_request: T
      }
    },
    10: function(e, t, n) {
      n.d(t, "d", (function() {
        return u
      })), n.d(t, "e", (function() {
        return l
      })), n.d(t, "a", (function() {
        return g
      })), n.d(t, "c", (function() {
        return f
      })), n.d(t, "b", (function() {
        return m
      }));
      t = n(3);
      var a = n.n(t),
        r = n(8),
        i = (t = n(0), n.n(t)),
        o = n(2),
        s = function(e, t) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return function(e, t) {
            var n = [],
              a = !0,
              r = !1,
              i = void 0;
            try {
              for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); a = !0);
            } catch (e) {
              r = !0, i = e
            } finally {
              try {
                !a && s.return && s.return()
              } finally {
                if (r) throw i
              }
            }
            return n
          }(e, t);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };

      function c(e) {
        return function() {
          var t = e.apply(this, arguments);
          return new Promise((function(e, n) {
            return function a(r, i) {
              try {
                var o = t[r](i),
                  s = o.value
              } catch (r) {
                return void n(r)
              }
              if (!o.done) return Promise.resolve(s).then((function(e) {
                a("next", e)
              }), (function(e) {
                a("throw", e)
              }));
              e(s)
            }("next")
          }))
        }
      }
      var u = function(e) {
          var t, n;
          return e ? (t = e.lastIndexOf("."), n = e.length, (e = e.substring(t + 1, n).toLocaleLowerCase()).includes("?") ? e.split("?")[0] : e) : ""
        },
        l = function(e) {
          var t, n = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
          e && (t = u(e).toLocaleUpperCase(), ["GIF", "PNG", "JPG", "JPEG"].includes(t) ? i.a.previewImage({
            urls: [e]
          }) : e.includes("http") ? i.a.downloadFile({
            url: e,
            success: function(e) {
              200 === e.statusCode && i.a.saveFile({
                tempFilePath: e.tempFilePath,
                success: function(e) {
                  e = e.savedFilePath, i.a.openDocument({
                    filePath: e,
                    showMenu: n,
                    success: function() {}
                  })
                }
              })
            }
          }) : i.a.openDocument({
            filePath: e
          }))
        },
        p = function(e) {
          return new Promise((function(t, n) {
            i.a.getImageInfo({
              src: e,
              success: function(e) {
                e = e.path, i.a.saveImageToPhotosAlbum({
                  filePath: e,
                  success: function() {
                    t()
                  },
                  fail: function(e) {
                    n(e)
                  }
                })
              },
              fail: function(e) {
                n(e)
              }
            })
          }))
        },
        d = function() {
          return new Promise((function(e, t) {
            i.a.getSetting({
              success: function(n) {
                (n = n.authSetting)["scope.writePhotosAlbum"] ? e(): i.a.authorize({
                  scope: "scope.writePhotosAlbum",
                  success: function() {
                    e()
                  },
                  fail: function(e) {
                    t(e)
                  }
                })
              },
              fail: function(e) {
                t(e)
              }
            })
          }))
        },
        g = function(e) {
          var t, n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
          return new Promise((t = c(a.a.mark((function t(r, c) {
            var u, l;
            return a.a.wrap((function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  return t.next = 3, Object(o.awaitWrap)(d());
                case 3:
                  if (u = t.sent, u = s(u, 2), l = u[0], u[1], l) return c("请获取权限"), t.abrupt("return");
                  t.next = 10;
                  break;
                case 10:
                  if (e && e.length) {
                    t.next = 13;
                    break
                  }
                  return c("图片列表为空"), t.abrupt("return");
                case 13:
                  n && i.a.showLoading({
                    title: "图片保存中",
                    mask: !0
                  }), Promise.all(e.map(p)).then((function() {
                    n && i.a.hideLoading(), r()
                  })).catch((function(e) {
                    n && i.a.hideLoading(), c(e)
                  }));
                case 15:
                case "end":
                  return t.stop()
              }
            }), t, void 0)
          }))), function(e, n) {
            return t.apply(this, arguments)
          }))
        },
        f = function(e) {
          var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
          return new Promise((function(n, a) {
            var r = i.a.createSelectorQuery();
            t && r.in(t), r.select(e).boundingClientRect((function(e) {
              e ? n(e) : a("节点未找到")
            })).exec()
          }))
        };

      function m() {
        return function() {
          var e = wx.getDeviceInfo();
          return "ohos" === e.platform && e.system.includes("HarmonyOS")
        }() || function() {
          var e = Object(r.b)();
          return /HarmonyOS|ArkWeb/i.test(e.system)
        }()
      }
    },
    1009: function(e, t) {
      var n = a = "pro",
        a = function(e, t, n) {
          return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : e[t] = n, e
        }({}, a, "https://ad.bright-sun.cn/")[n];
      e.exports = {
        apiUrl: a
      }
    },
    11: function(e, t, n) {
      var a = n(1),
        r = n(14),
        i = n(0),
        o = n.n(i),
        s = (i = n(35), n.n(i)),
        c = n(24);
      Object.assign, t.a = {
        upLoadOss: function(e, t, n, i) {
          var u = !(4 < arguments.length && void 0 !== arguments[4]) || arguments[4];
          return new Promise((function(l, p) {
            (function(e, t, n) {
              return new Promise((function(r, i) {
                a.a.xyb_request("uploadfile/commonPostPolicy.action", "POST", {
                  customerType: e,
                  uploadType: t,
                  publicRead: n
                }, !1, !1).then((function(e) {
                  e = e.data, r(e)
                }), (function(e) {
                  i(e), o.a.showToast({
                    title: "网络异常",
                    icon: "none"
                  })
                }))
              }))
            })(t, n, i).then((function(a) {
              var i = a,
                d = e.substring(e.lastIndexOf(".") + 1),
                g = (new Date).getTime(),
                f = a.dir + "/" + g + "." + d,
                m = (g = a.policy, d = a.accessid, a.signature),
                h = {
                  key: f,
                  policy: g,
                  OSSAccessKeyId: d,
                  signature: m,
                  success_action_status: "200",
                  customerType: t,
                  uploadType: n
                };
              a.callback && (h.callback = a.callback), u && o.a.showLoading({
                title: "文件上传中",
                mask: !0
              }), g = {
                Cookie: o.a.getStorageSync("Cookie"),
                "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
                v: r.default.WxStudentVersion
              }, g = Object(c.a)(g);
              o.a.uploadFile({
                header: g,
                url: -1 < r.default.HOST.indexOf("https") ? a.host : r.default.HOST + "uploadfile/uploadFile.action",
                filePath: e,
                name: "file",
                method: "POST",
                formData: h,
                success: function(e) {
                  var t;
                  if (u && o.a.hideLoading(), 200 != e.statusCode) return 400 == e.statusCode ? o.a.showToast({
                    title: "文件太大！",
                    icon: "none"
                  }) : o.a.showToast({
                    title: "文件上传失败，请重试！",
                    icon: "none"
                  }), (t = h).url = i.host, t.name = "file", t.method = "POST", a = o.a.getStorageSync("openid") || null, c = o.a.getStorageSync("unionid") || null, n = o.a.getStorageSync("xcxSystemInfo") || null, t.model = n ? n.model : "", t.brand = n ? n.brand : "", t.platform = n ? n.platform : "", t.system = n ? n.system : "", t.openId = a, t.unionId = c, s.a.info("oss-back", e), s.a.info("error-oss-params", t), p(), !1;
                  var n = {},
                    a = e.data;
                  if ("string" != typeof a) return o.a.showToast({
                    title: "返回类型不能被解析,请重试",
                    icon: "none"
                  }), p(), !1;
                  a = (a = a.replace(/\n/g, "\\n")).replace(" ", "");
                  try {
                    n = JSON.parse(a)
                  } catch (e) {
                    return o.a.showToast({
                      title: "JSON.parse 解析失败,请重试",
                      icon: "none"
                    }), s.a.info("parse-fail", "解析失败"), p(), !1
                  }
                  if ("200" == n.status) {
                    if (!n.vo) return o.a.showToast({
                      title: "上传异常，请重试",
                      icon: "none"
                    }), p(), !1;
                    var c = {
                      key: f = -1 == r.default.HOST.indexOf("https") ? n.vo.key : f,
                      url: n.vo.customParams ? n.vo.customParams.ossUrl : ""
                    };
                    l(c)
                  } else {
                    var d = "";
                    switch (n.errorCode) {
                      case "10001":
                        d = "无效请求";
                        break;
                      case "10002":
                        d = "上传用户类型不存在";
                        break;
                      case "10003":
                        d = "上传文件类型不存在";
                        break;
                      case "10004":
                        d = "文件名称过长，不能超过50个字符";
                        break;
                      case "10005":
                        d = "上传文件格式不正确";
                        break;
                      case "10006":
                        d = "文件类型不允许上传";
                        break;
                      case "10007":
                        d = "上传的文件太大";
                        break;
                      case "10008":
                        d = "图片违规";
                        break;
                      case "10009":
                        d = "学校信息不存在";
                        break;
                      default:
                        d = "文件上传失败"
                    }
                    o.a.showToast({
                      title: d,
                      icon: "none"
                    }), p()
                  }
                },
                fail: function(e) {
                  o.a.hideLoading(), p(e), o.a.showToast({
                    title: "文件上传失败",
                    icon: "none"
                  })
                }
              })
            })).catch((function(e) {
              p(e)
            }))
          })).catch((function(e) {
            return o.a.hideLoading(), Promise.reject(e)
          }))
        }
      }
    },
    12: function(t, n, a) {
      var r = a(0),
        i = a(18),
        o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
          return e(t)
        } : function(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
        },
        s = function(e, t) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return function(e, t) {
            var n = [],
              a = !0,
              r = !1,
              i = void 0;
            try {
              for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); a = !0);
            } catch (e) {
              r = !0, i = e
            } finally {
              try {
                !a && s.return && s.return()
              } finally {
                if (r) throw i
              }
            }
            return n
          }(e, t);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };

      function c(e) {
        if (Array.isArray(e)) {
          for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
          return n
        }
        return Array.from(e)
      }
      var u = function(e, t, n) {
        return 0 === n ? t : null != (n = null != e.maxPage ? e.maxPage : e.MaxPage) && "" !== n ? Number(n) : t + 1
      };
      n.a = function(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
          n = Object(r.useRef)(t),
          a = Object(r.useRef)(e),
          l = (t = (a.current = e, Object(r.useState)(1)), (e = s(t, 2))[0]),
          p = e[1],
          d = Object(r.useRef)(l),
          g = (t = (d.current = l, Object(r.useState)([])), (e = s(t, 2))[0]),
          f = e[1],
          m = (t = Object(r.useState)(!1), (e = s(t, 2))[0]),
          h = e[1],
          y = (t = Object(r.useState)(1), (e = s(t, 2))[0]),
          v = e[1],
          b = (t = Object(r.useState)(0), t = (e = s(t, 2))[0], e[1]),
          S = (e = Object(r.useMemo)((function() {
            return !m && l < y
          }), [m, l, y]), Object(r.useMemo)((function() {
            return 1 === l && 0 === g.length
          }), [l, g])),
          w = Object(r.useCallback)((function(e) {
            var t = null != e ? e : d.current;
            h(!0), a.current(t).then((function(e) {
              var n = (e = e && e.data && "object" === o(e.data) ? e.data : {}).list,
                a = Array.isArray(n) ? n : [];
              n = u(e, t, a.length);
              v(n), b(e.total), f(1 === t ? a : function(e) {
                return [].concat(c(Array.isArray(e) ? e : []), c(a))
              })
            })).catch((function() {
              v(t)
            })).finally((function() {
              h(!1)
            }))
          }), []),
          U = Object(r.useCallback)((function() {
            !m && l < y && p((function(e) {
              return e + 1
            }))
          }), [m, l, y]),
          B = Object(i.a)((function() {
            v(1), (1 === d.current ? w : p)(1)
          }));
        return Object(r.useEffect)((function() {
          n.current && w(), n.current = !0
        }), [l, w]), {
          dataList: g,
          loading: m,
          handleScrollToLower: U,
          clearData: B,
          hasMore: e,
          isEmpty: S,
          setDataList: f,
          total: t
        }
      }
    },
    1287: function(e, t, n) {
      n(229)
    },
    1288: function(e, t, n) {},
    13: function(t, n, a) {
      a.d(n, "d", (function() {
        return P
      })), a.d(n, "b", (function() {
        return O
      })), a.d(n, "a", (function() {
        return f
      })), a.d(n, "e", (function() {
        return k
      })), a.d(n, "c", (function() {
        return R
      })), a.d(n, "f", (function() {
        return h
      }));
      n = a(3);
      var r, i, o, s = a.n(n),
        c = (n = a(0), a.n(n)),
        u = a(14),
        l = a(33),
        p = a(36),
        d = (n = a(86), n = a.n(n), a(24)),
        g = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
          return e(t)
        } : function(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
        },
        f = (r = y(s.a.mark((function e(t) {
          var n, a, r, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
            o = arguments[2];
          return s.a.wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return null != i.fp ? i.fp : O(), null != i.appId ? i.appId : D(), o = "", e.prev = 9, e.next = 12, m(t);
              case 12:
                o = e.sent, e.next = 18;
                break;
              case 15:
                e.prev = 15, e.t0 = e.catch(9);
              case 18:
                return n = u.default.HOST || "", n = 0 === t.indexOf("ptth".split("").reverse().join("")) ? t : n + t, a = "" + o, a = Object(l.c)(a), r = 0 <= n.indexOf("?") ? "&" : "?", e.abrupt("return", n + r + "t=" + a);
              case 28:
              case "end":
                return e.stop()
            }
          }), e, this, [
            [9, 15]
          ])
        }))), function(e) {
          return r.apply(this, arguments)
        }),
        m = (i = y(s.a.mark((function e(t) {
          var n, a, r;
          return s.a.wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (n = Date.now(), r = c.a.getStorageSync(S) || "", a = Number(c.a.getStorageSync(w) || 0), "fkplio".split("").reverse().join(""), r && n + U < a) return j = T = 0, e.abrupt("return", r);
                e.next = 9;
                break;
              case 9:
                if (B <= T) {
                  if (n < j) return e.abrupt("return", "");
                  e.next = 12
                } else e.next = 14;
                break;
              case 12:
                j = T = 0;
              case 14:
                return e.prev = 14, a = O(), e.next = 18, k(a);
              case 18:
                return r = e.sent, j = T = 0, e.abrupt("return", r);
              case 24:
                throw e.prev = 24, e.t0 = e.catch(14), c.a.removeStorageSync(S), c.a.removeStorageSync(w), B <= ++T && (j = Date.now() + x), e.t0;
              case 31:
              case "end":
                return e.stop()
            }
          }), e, this, [
            [14, 24]
          ])
        }))), function(e) {
          return i.apply(this, arguments)
        }),
        h = (o = y(s.a.mark((function e(t, n, a, r) {
          var i, o, c, u, d, f;
          return s.a.wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return i = t && "object" === (void 0 === t ? "undefined" : g(t)) ? t : {}, o = O(), a = "", e.prev = 5, e.next = 8, m(n);
              case 8:
                a = e.sent, e.next = 14;
                break;
              case 11:
                e.prev = 11, e.t0 = e.catch(5);
              case 14:
                return u = D(), c = Date.now(), u = function(e, t, n, a, r) {
                  return e ? (e = "" + Object(l.c)(e) + t + n + a, p.a.hexMD5(e)) : ""
                }(a || "", o, c, u), d = function(e, t) {
                  for (var n = new RegExp("[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]"), a = {
                      h5st: 1,
                      _stk: 1,
                      _ste: 1
                    }, r = Object.keys(e || {}).filter((function(e) {
                      return !a[e]
                    })).sort(), i = [], o = 0; o < r.length; o++) {
                    var s = r[o],
                      c = e[s]; - 1 != P().indexOf(s) || n.test(c) || (c = "" === c ? "" : (void 0 === c ? "undefined" : g(c)) === "tcejbo".split("").reverse().join("") ? JSON.stringify(c) : String(c), i.push("" + s + c))
                  }
                  var u = i.join("");
                  return u = (u = (u = (u = (u = (u = (u = (u = (u = u.replace(new RegExp("+s\\".split("").reverse().join(""), "g"), "")).replace("[]", "")).replace(new RegExp("\\n+", "g"), "")).replace(new RegExp("\\r+", "g"), "")).replace(new RegExp("<", "g"), "")).replace(new RegExp(">", "g"), "")).replace(new RegExp("&", "g"), "")).replace(new RegExp("-", "g"), "")).replace(new RegExp("\\uD83C[\\uDF00-\\uDFFF]|\\uD83D[\\uDC00-\\uDE4F]", "g"), ""), encodeURIComponent(u)
                }(i), r = "", a && (f = a.charAt(0), r = "0" == f ? p.a.hexMD5(d + u) : "1" == f ? v.sha256(d + u) : v.sha256.hmac.hex(u, d)), e.abrupt("return", {
                  st: r,
                  ts: c,
                  fp: o
                });
              case 25:
              case "end":
                return e.stop()
            }
          }), e, this, [
            [5, 11]
          ])
        }))), function(e, t, n, a) {
          return o.apply(this, arguments)
        });

      function y(e) {
        return function() {
          var t = e.apply(this, arguments);
          return new Promise((function(e, n) {
            return function a(r, i) {
              try {
                var o = t[r](i),
                  s = o.value
              } catch (r) {
                return void n(r)
              }
              if (!o.done) return Promise.resolve(s).then((function(e) {
                a("next", e)
              }), (function(e) {
                a("throw", e)
              }));
              e(s)
            }("next")
          }))
        }
      }
      var v = n.a && (n.a.default || n.a),
        b = ("ejqgdb".split("").reverse().join(""), "xyb_security_device_fp"),
        S = "nekot_ytiruces_byx".split("").reverse().join(""),
        w = "eripxe_nekot_ytiruces_byx".split("").reverse().join(""),
        U = 4e4,
        B = 3,
        x = 6e4,
        I = ("hgfbep".split("").reverse().join(""), null),
        A = ("qgpfmm".split("").reverse().join(""), !1),
        T = 0,
        j = 0,
        C = 0,
        P = function() {
          return ["content", "deviceName", "keyWord", "blogBody", "blogTitle", "epyTteg".split("").reverse().join(""), "responsibilities", "teerts".split("").reverse().join(""), "text", "nosaer".split("").reverse().join(""), "searchvalue", "yek".split("").reverse().join(""), "answers", "leaveReason", "personRemark", "lasiarppAfles".split("").reverse().join(""), "imgUrl", "emanxw".split("").reverse().join(""), "deviceId", "htaPpmeTratava".split("").reverse().join(""), "elif".split("").reverse().join(""), "model", "brand", "system", "dIecived".split("").reverse().join(""), "mroftalp".split("").reverse().join(""), "code", "dInepo".split("").reverse().join(""), "unionid", "nekoTeciveDkcolc".split("").reverse().join(""), "clockDevice", "address", "eman".split("").reverse().join(""), "liamEesirpretne".split("").reverse().join(""), "responsibilities", "tegraTecitcarp".split("").reverse().join(""), "emaNnaidraug".split("").reverse().join(""), "guardianPhone", "syaDecitcarp".split("").reverse().join(""), "linkman", "emaNesirpretne".split("").reverse().join(""), "companyIntroduction", "accommodationStreet", "accommodationLongitude", "accommodationLatitude", "internshipDestination", "specialStatement", "enterpriseStreet", "emaNecnarusni".split("").reverse().join(""), "gnicnaniFecnarusni".split("").reverse().join(""), "policyNumber", "krameRemitrevo".split("").reverse().join(""), "tnemetatSksir".split("").reverse().join(""), "specialStatement", "unionId"]
        };

      function D() {
        try {
          var e = c.a.getAccountInfoSync();
          return e && e.miniProgram && e.miniProgram.appId || ""
        } catch (e) {
          return ""
        }
      }

      function O() {
        var e, t = c.a.getStorageSync(b);
        return t || (e = Date.now() + "_" + Math.random(), t = p.a.hexMD5(e), c.a.setStorageSync(b, t)), t
      }

      function k(e) {
        var t, n;
        return A && I || (e = e || O(), A = !0, t = u.default.HOST + "common/GetToken.action", n = {
          Cookie: c.a.getStorageSync("Cookie"),
          v: u.default.WxStudentVersion,
          "content-type": "application/x-www-form-urlencoded"
        }, n = Object(d.a)(n), I = new Promise((function(a, r) {
          c.a.request({
            url: t,
            method: "POST",
            header: n,
            data: {
              fp: e
            },
            success: function(e) {
              var t;
              (e = e.data) && 200 == e.code && e.data ? (t = e = e.data, e = Date.now() + 1e3 * Number(e.substring(1, 4)), t && e ? (c.a.setStorageSync(S, t), c.a.setStorageSync(w, Number(e)), A = !1, I = null, a(t)) : (A = !1, I = null, r("security token 返回字段不完整"))) : (A = !1, I = null, r("security token 接口异常"))
            },
            fail: function(e) {
              A = !1, I = null, r("security token 网络失败")
            }
          })
        }))), I
      }

      function R() {
        var e = Date.now();
        if (!(e - C < 1e4)) {
          C = e, A = !1, I = null, j = T = 0;
          try {
            c.a.removeStorageSync(S), c.a.removeStorageSync(w)
          } catch (e) {}
        }
      }
    },
    14: function(e, t, n) {
      n.r(t), t.default = {
        HOST: "https://xcx.xybsyw.com/",
        APPHTTP: "https://app.xybsyw.com/",
        WEBSOCKETURL: "wss://im.xybsyw.com/",
        HTMLJUMP: "https://www.xybsyw.com/",
        tencentMapStaticKey: "GOZBZ-E4L67-6WLXT-PSLBH-2WEZZ-LOFLE",
        TRTC_APPID: 1400322275,
        TRTC_SECRETKEY: "dac43717030243bc021675667b9851d8daa9c31a1987c67b85072105ceaf9c9f",
        WxStudentVersion: "1.7.10",
        WEBSOCKETURL_HTTP: "https://im.xybsyw.com/"
      }
    },
    15: function(e, t, n) {
      var a = [],
        r = function e(t) {
          return t = Object.assign({}, e.currentOptions, t), new Promise((function(e, n) {
            var r = (t.context || function() {
              var e = getCurrentPages();
              return e[e.length - 1]
            }()).selectComponent(t.selector);
            delete t.context, delete t.selector, r && (r.set(Object.assign({
              onCancel: n,
              onConfirm: e
            }, t)), a.push(r))
          }))
        };
      r.defaultOptions = {
        show: !0,
        title: "",
        message: "",
        zIndex: 100,
        overlay: !0,
        className: "",
        customStyle: "",
        asyncClose: !1,
        messageAlign: "",
        transition: "scale",
        selector: "#van-dialog",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        showConfirmButton: !0,
        showCancelButton: !1,
        closeOnClickOverlay: !1,
        confirmButtonOpenType: ""
      }, (r.alert = r).confirm = function(e) {
        return r(Object.assign({
          showCancelButton: !0
        }, e))
      }, r.close = function() {
        a.forEach((function(e) {
          e.close()
        })), a = []
      }, r.stopLoading = function() {
        a.forEach((function(e) {
          e.stopLoading()
        }))
      }, r.setDefaultOptions = function(e) {
        Object.assign(r.currentOptions, e)
      }, (r.resetDefaultOptions = function() {
        r.currentOptions = Object.assign({}, r.defaultOptions)
      })(), t.a = r
    },
    16: function(e, t, n) {
      var a = n(8),
        r = n(0),
        i = n.n(r),
        o = {
          app_id: "",
          event_id: "",
          api_base: "https://pingtas.qq.com/pingd",
          prefix: "_mta_",
          version: "1.3.6",
          stat_share_app: !1,
          stat_pull_down_fresh: !1,
          stat_reach_bottom: !1
        };

      function s() {
        try {
          var e = "s" + c();
          return i.a.setStorageSync(o.prefix + "ssid", e), e
        } catch (e) {}
      }

      function c(e) {
        for (var t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], n = 10; 1 < n; n--) {
          var a = Math.floor(10 * Math.random()),
            r = t[a];
          t[a] = t[n - 1], t[n - 1] = r
        }
        for (n = a = 0; n < 5; n++) a = 10 * a + t[n];
        return (e || "") + (a + "") + +new Date
      }

      function u() {
        var e, t = {
          dm: "wechat.apps.xx",
          url: function() {
            try {
              var e = i.a.getCurrentPages(),
                t = "/";
              return 0 < e.length ? e.pop().__route__ : t
            } catch (e) {}
          }(),
          pvi: "",
          si: "",
          ty: 0
        };
        return t.pvi = ((e = function() {
          try {
            return i.a.getStorageSync(o.prefix + "auid")
          } catch (e) {}
        }()) || (e = function() {
          try {
            var e = c();
            return i.a.setStorageSync(o.prefix + "auid", e), e
          } catch (e) {}
        }(), t.ty = 1), e), t.si = function() {
          try {
            return i.a.getStorageSync(o.prefix + "ssid")
          } catch (e) {}
        }() || s(), t
      }

      function l() {
        var e = function() {
          var e = Object(a.b)();
          return {
            adt: encodeURIComponent(e.model),
            scl: e.pixelRatio,
            scr: e.windowWidth + "x" + e.windowHeight,
            lg: e.language,
            fl: e.version,
            jv: encodeURIComponent(e.system),
            tz: encodeURIComponent(e.platform)
          }
        }();
        return function(e) {
          i.a.getNetworkType({
            success: function(t) {
              e(t.networkType)
            }
          })
        }((function(e) {
          try {
            i.a.setStorageSync(o.prefix + "ntdata", e)
          } catch (e) {}
        })), e.ct = i.a.getStorageSync(o.prefix + "ntdata") || "4g", e
      }

      function p() {
        var e, t = d.Data.userInfo,
          n = [];
        for (e in t) t.hasOwnProperty(e) && n.push(e + "=" + t[e]);
        return t = n.join(";"), {
          r2: o.app_id,
          r4: "wx",
          ext: "v=" + o.version + (null !== t && "" !== t ? ";ui=" + encodeURIComponent(t) : "")
        }
      }
      var d = {
        App: {
          init: function(e) {
            "appID" in e && (o.app_id = e.appID), "eventID" in e && (o.event_id = e.eventID), "statShareApp" in e && (o.stat_share_app = e.statShareApp), "statPullDownFresh" in e && (o.stat_pull_down_fresh = e.statPullDownFresh), "statReachBottom" in e && (o.stat_reach_bottom = e.statReachBottom), s();
            try {
              "lauchOpts" in e && (d.Data.lanchInfo = e.lauchOpts, d.Data.lanchInfo.landing = 1)
            } catch (e) {}
          }
        },
        Page: {
          init: function() {
            var e, t, n, a, r = i.a.getCurrentPages()[i.a.getCurrentPages().length - 1];
            r.onShow && (e = r.onShow, r.onShow = function() {
              d.Page.stat(), e.call(this, arguments)
            }), o.stat_pull_down_fresh && r.onPullDownRefresh && (t = r.onPullDownRefresh, r.onPullDownRefresh = function() {
              d.Event.stat(o.prefix + "pulldownfresh", {
                url: r.__route__
              }), t.call(this, arguments)
            }), o.stat_reach_bottom && r.onReachBottom && (n = r.onReachBottom, r.onReachBottom = function() {
              d.Event.stat(o.prefix + "reachbottom", {
                url: r.__route__
              }), n.call(this, arguments)
            }), o.stat_share_app && r.onShareAppMessage && (a = r.onShareAppMessage, r.onShareAppMessage = function() {
              return d.Event.stat(o.prefix + "shareapp", {
                url: r.__route__
              }), a.call(this, arguments)
            })
          },
          multiStat: function(e, t) {
            var n;
            1 == t ? d.Page.stat(e) : (t = i.a.getCurrentPages()[i.a.getCurrentPages().length - 1]).onShow && (n = t.onShow, t.onShow = function() {
              d.Page.stat(e), n.call(this, arguments)
            })
          },
          stat: function(e) {
            if ("" != o.app_id) {
              var t = [],
                n = p();
              if (e && (n.r2 = e), e = [u(), n, l()], d.Data.lanchInfo) {
                e.push({
                  ht: d.Data.lanchInfo.scene,
                  rdm: "/",
                  rurl: d.Data.lanchInfo.path
                }), d.Data.lanchInfo.query && d.Data.lanchInfo.query._mta_ref_id && e.push({
                  rarg: d.Data.lanchInfo.query._mta_ref_id
                });
                try {
                  1 == d.Data.lanchInfo.landing && (n.ext += ";lp=1", d.Data.lanchInfo.landing = 0)
                } catch (e) {}
              }
              e.push({
                rand: +new Date
              });
              n = 0;
              for (var a = e.length; n < a; n++)
                for (var r in e[n]) e[n].hasOwnProperty(r) && t.push(r + "=" + (void 0 === e[n][r] ? "" : e[n][r]));
              i.a.request({
                url: o.api_base + "?" + t.join("&").toLowerCase()
              })
            }
          }
        },
        Event: {
          stat: function(e, t) {
            if ("" != o.event_id) {
              var n, a = [],
                r = u(),
                s = p(),
                c = (r.dm = "wxapps.click", r.url = e, s.r2 = o.event_id, void 0 === t ? {} : t),
                d = [];
              for (n in c) c.hasOwnProperty(n) && d.push(encodeURIComponent(n) + "=" + encodeURIComponent(c[n]));
              for (c = d.join(";"), s.r5 = c, c = 0, s = (r = [r, s, l(), {
                  rand: +new Date
                }]).length; c < s; c++)
                for (var g in r[c]) r[c].hasOwnProperty(g) && a.push(g + "=" + (void 0 === r[c][g] ? "" : r[c][g]));
              i.a.request({
                url: o.api_base + "?" + a.join("&").toLowerCase()
              })
            }
          }
        },
        Data: {
          userInfo: null,
          lanchInfo: null
        }
      };
      t.a = d
    },
    17: function(e, t, n) {
      var a = n(42),
        r = {
          type: "text",
          mask: !1,
          message: "",
          show: !0,
          zIndex: 1e3,
          duration: 3e3,
          position: "middle",
          forbidClick: !1,
          loadingType: "circular",
          selector: "#van-toast"
        },
        i = [],
        o = Object.assign({}, r);

      function s(e) {
        return Object(a.b)(e) ? e : {
          message: e
        }
      }

      function c(e) {
        var t = Object.assign({}, o, s(e)),
          n = (t.context || function() {
            var e = getCurrentPages();
            return e[e.length - 1]
          }()).selectComponent(t.selector);
        if (n) return delete t.context, delete t.selector, n.clear = function() {
          n.set({
            show: !1
          }), t.onClose && t.onClose()
        }, i.push(n), n.set(t), clearTimeout(n.timer), 0 < t.duration && (n.timer = setTimeout((function() {
          n.clear(), i = i.filter((function(e) {
            return e !== n
          }))
        }), t.duration)), n
      }
      n = function(e) {
        return function(t) {
          return c(Object.assign({
            type: e
          }, s(t)))
        }
      }, c.loading = n("loading"), c.success = n("success"), c.fail = n("fail"), c.clear = function() {
        i.forEach((function(e) {
          e.clear()
        })), i = []
      }, c.setDefaultOptions = function(e) {
        Object.assign(o, e)
      }, c.resetDefaultOptions = function() {
        o = Object.assign({}, r)
      }, t.a = c
    },
    18: function(e, t, n) {
      var a = n(0);
      t.a = function(e) {
        var t = (i = function(e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return function(e, t) {
              var n = [],
                a = !0,
                r = !1,
                i = void 0;
              try {
                for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); a = !0);
              } catch (e) {
                r = !0, i = e
              } finally {
                try {
                  !a && s.return && s.return()
                } finally {
                  if (r) throw i
                }
              }
              return n
            }(e, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
          }(i = Object(a.useState)({
            current: !1
          }), 2))[0],
          n = i[1],
          r = Object(a.useRef)([]),
          i = Object(a.useCallback)((function() {
            for (var e = arguments.length, t = Array(e), a = 0; a < e; a++) t[a] = arguments[a];
            r.current = t, n({
              current: !0
            })
          }), []);
        return Object(a.useEffect)((function() {
          t.current && n({
            current: !1
          })
        }), [t]), Object(a.useEffect)((function() {
          try {
            t.current && e.apply(void 0, function(e) {
              if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
              }
              return Array.from(e)
            }(r.current))
          } catch (e) {}
        }), [t]), i
      }
    },
    19: function(e, t, n) {
      var a = Behavior({
        methods: {
          $emit: function() {
            this.triggerEvent.apply(this, arguments)
          },
          getRect: function(e, t) {
            var n = this;
            return new Promise((function(a) {
              wx.createSelectorQuery().in(n)[t ? "selectAll" : "select"](e).boundingClientRect((function(e) {
                t && Array.isArray(e) && e.length && a(e), !t && e && a(e)
              })).exec()
            }))
          }
        }
      });

      function r(e, t) {
        return new Promise((function(n) {
          e.setData(t, n)
        }))
      }
      var i = Behavior({
        created: function() {
          var e, t, n, a = this;
          this.$options && (e = {}, t = this.$options().computed, n = Object.keys(t), this.calcComputed = function() {
            var r = {};
            return n.forEach((function(n) {
              var i = t[n].call(a);
              e[n] !== i && (r[n] = e[n] = i)
            })), r
          })
        },
        attached: function() {
          this.set()
        },
        methods: {
          set: function(e, t) {
            var n = this,
              a = [];
            return e && a.push(r(this, e)), this.calcComputed && a.push(r(this, this.calcComputed())), Promise.all(a).then((function(e) {
              return t && "function" == typeof t && t.call(n), e
            }))
          }
        }
      });

      function o(e, t) {
        var n, a = e.watch,
          r = e.computed;
        t.behaviors.push(i), a && (n = t.properties || {}, Object.keys(a).forEach((function(e) {
          var t;
          e in n && ((t = null !== (t = n[e]) && "type" in t ? t : {
            type: t
          }).observer = a[e], n[e] = t)
        })), t.properties = n), r && (t.methods = t.methods || {}, t.methods.$options = function() {
          return e
        }, t.properties) && function(e) {
          e && Object.keys(e).forEach((function(t) {
            var n = e[t],
              a = (n = null !== n && "type" in n ? n : {
                type: n
              }).observer;
            n.observer = function() {
              if (a) {
                "string" == typeof a && (a = this[a]);
                for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                a.apply(this, t)
              }
              this.set()
            }, e[t] = n
          }))
        }(t.properties)
      }

      function s() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          t = {},
          n = (function(e, t, n) {
            Object.keys(n).forEach((function(a) {
              e[a] && (t[n[a]] = e[a])
            }))
          }(e, t, {
            data: "data",
            props: "properties",
            mixins: "behaviors",
            methods: "methods",
            beforeCreate: "created",
            created: "attached",
            mounted: "ready",
            relations: "relations",
            destroyed: "detached",
            classes: "externalClasses"
          }), e.relation);
        n && (t.relations = Object.assign(t.relations || {}, function(e, t, n) {
          return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : e[t] = n, e
        }({}, "../" + n.name + "/index", n))), t.externalClasses = t.externalClasses || [], t.externalClasses.push("custom-class"), t.behaviors = t.behaviors || [], t.behaviors.push(a), e.field && t.behaviors.push("wx://form-field"), t.options = {
          multipleSlots: !0,
          addGlobalClass: !0
        }, o(e, t), Component(t)
      }
      n.d(t, "a", (function() {
        return s
      }))
    },
    2: function(t, n) {
      var a = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      };

      function r(e) {
        var t = e;
        return 1 == e.toString().length ? "0" + e : t
      }

      function i(e) {
        var t, n = {};
        for (t in e) n[t] = e[t];
        return n
      }

      function o(e) {
        var t = [];
        if (/\d+/.test(e)) {
          for (; 0 != e;) t[t.length] = Math.abs(e % 65536), e = parseInt(e / 65536);
          return 0 == t.length ? [0] : t
        }
        return [0]
      }
      t.exports = {
        debounceNew: function(e, t) {
          var n = void 0,
            a = function() {
              for (var a = arguments.length, r = Array(a), i = 0; i < a; i++) r[i] = arguments[i];
              var o = this;
              clearTimeout(n), n = setTimeout((function() {
                e.apply(o, r)
              }), t)
            };
          return a.cancel = function() {
            clearTimeout(n)
          }, a
        },
        debounce: function(e, t, n) {
          var a = void 0;
          return function() {
            var r, i = this,
              o = arguments;
            a && clearTimeout(a), n ? (r = !a, a = setTimeout((function() {
              a = null
            }), t), r && e.apply(i, o)) : a = setTimeout((function() {
              e.apply(i, o)
            }), t)
          }
        },
        deepClones: function(e) {
          if (!e && "object" !== (void 0 === e ? "undefined" : a(e))) throw new Error("error arguments");
          var t, n = Array.isArray(e) ? [] : {};
          for (t in e) e.hasOwnProperty(t) && (e[t] && "object" === a(e[t]) ? n[t] = i(e[t]) : n[t] = e[t]);
          return n
        },
        formatTime: function(e) {
          return (e = new Date(e)).getFullYear() + "-" + r(e.getMonth() + 1)
        },
        formatYMD: function(e) {
          return (e = e.split("-"))[0] + "年" + Number(e[1]) + "月" + e[2] + "日"
        },
        json2Form: function(e) {
          var t, n = [];
          for (t in e) n.push(encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
          return n.join("&")
        },
        filterDate: function(e) {
          e = "number" == typeof e ? new Date(e) : new Date((e || "").replace(/-/g, "/"));
          var t = ((new Date).getTime() - e.getTime()) / 1e3,
            n = Math.floor(t / 86400);
          return isNaN(n) || n < 0 || 4 <= n ? function(e) {
            var t = (e = new Date(e)).getFullYear(),
              n = ("0" + (e.getMonth() + 1)).slice(-2),
              a = ("0" + e.getDate()).slice(-2);
            return e.getHours(), e.getMinutes(), e.getSeconds(), t + "-" + n + "-" + a
          }(e) : 0 === n && ((t < 60 ? "刚刚" : t < 120 && "1分钟前") || t < 3600 && Math.floor(t / 60) + "分钟前" || (t < 7200 ? "1小时前" : t < 86400 && Math.floor(t / 3600) + "小时前")) || n < 4 && n + "天前"
        },
        getCurrentPageUrlWithParams: function(e) {
          e = e || 0;
          var t = getCurrentPages(),
            n = (e = (t = t[t.length - e - 1]).route, t.options),
            a = e + "?";
          if (function(e) {
              return 0 == Object.keys(e).length
            }(n)) a = "/" + e;
          else {
            for (var r in a = "/" + e + "?", n) a += r + "=" + n[r] + "&";
            a = a.substring(0, a.length - 1)
          }
          return a
        },
        getDay: function(e) {
          e = (n = new Date).getTime() + 864e5 * e, n.setTime(e), e = n.getFullYear();
          var t = n.getMonth(),
            n = n.getDate();
          return e + "-" + r(t + 1) + "-" + r(n)
        },
        diffObj: function e(t, n) {
          if (t !== n) {
            var a = t instanceof Object,
              r = n instanceof Object;
            if (!a || !r) return !1;
            a = Object.keys(t);
            var i = Object.keys(n);
            if (a.length !== i.length) return !1;
            var o = !0,
              s = (r = !1, void 0);
            try {
              for (var c, u = a[Symbol.iterator](); !(o = (c = u.next()).done); o = !0) {
                var l = c.value;
                if (!i.includes(l)) return !1;
                if (!e(t[l], n[l])) return !1
              }
            } catch (t) {
              r = !0, s = t
            } finally {
              try {
                !o && u.return && u.return()
              } finally {
                if (r) throw s
              }
            }
          }
          return !0
        },
        deepClone: i,
        throttle: function(e, t) {
          var n = Date.now();
          return function() {
            var a = arguments,
              r = Date.now();
            t <= r - n && (e.apply(this, a), n = Date.now())
          }
        },
        calcSwitch: function(e, t) {
          for (var n = o(t), a = o(e), r = 0, i = 1, s = 0; s < n.length; s++) r += (n[s] & a[s]) * i, i *= 65536;
          return r == t
        },
        getRandomNumber: function(e, t) {
          return Math.floor(Math.random() * (t - e + 1) + e)
        },
        awaitWrap: function(e) {
          return e.then((function(e) {
            return [null, e]
          })).catch((function(e) {
            return [e, null]
          }))
        },
        getSafeData: function(e, t) {
          var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
            r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : [];
          if (!e || !t || "string" != typeof t) return r;
          var i = t.split("."),
            o = e,
            s = !0,
            c = !1,
            u = void 0;
          try {
            for (var l, p = i[Symbol.iterator](); !(s = (l = p.next()).done); s = !0) {
              var d = l.value;
              if (null == o || "object" !== (void 0 === o ? "undefined" : a(o))) return r;
              o = o[d]
            }
          } catch (e) {
            c = !0, u = e
          } finally {
            try {
              !s && p.return && p.return()
            } finally {
              if (c) throw u
            }
          }
          return null == o || n && ! function(e, t) {
            return "array" !== t ? (void 0 === e ? "undefined" : a(e)) === t : Array.isArray(e)
          }(o, n) ? r : o
        },
        dealInputVal: function(e) {
          var t = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1],
            n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 2;
          return (e = "number" == typeof e ? e.toString() : e) ? (e = e.replace(/^0*(0\.|[1-9])/, "$1"), e = ("-" === (e = (e = t ? (e = (e = (e = (e = e.replace(/[^-\d.]/g, "")).replace(/^\./g, "")).replace(/\.{1,}/g, ".")).replace(".", "$#$").replace(/\./g, "").replace("$#$", "."), t = new RegExp("^(\\-)*(\\d*)\\.(\\d{" + n + "}).*$"), 0 < (e = e.replace(t, "$1$2.$3")).indexOf(".") ? e.split(".")[0].substring(0, 10) + "." + e.split(".")[1] : e.substring(0, 10)) : e.replace(/[^\d]/g, "")).replace(/^(-)[^-0-9.]*/g, "$1")).charAt(0) ? "-" : "") + e.replace(/-/g, "")) : ""
        }
      }
    },
    20: function(e, t, n) {
      var a = n(87),
        r = n.n(a),
        i = function(e) {
          return (e = e.toString())[1] ? e : "0" + e
        },
        o = function(e) {
          return [e.getFullYear(), e.getMonth() + 1, e.getDate()].map(i).join("-")
        };
      t.a = {
        debounce: function(e, t, n) {
          var a = void 0;
          return function() {
            var r, i = this,
              o = arguments;
            a && clearTimeout(a), n ? (r = !a, a = setTimeout((function() {
              a = null
            }), t), r && e.apply(i, o)) : a = setTimeout((function() {
              e.apply(i, o)
            }), t)
          }
        },
        getArrayIndex: function(e, t, n) {
          for (var a = 0; a < e.length; a++)
            if (e[a][t] == n) return a;
          return -1
        },
        formatDate: o,
        formatDatePoint: function(e) {
          return [e.getFullYear(), e.getMonth() + 1, e.getDate()].map(i).join(".")
        },
        formatDatePointTime: function(e) {
          return e.getFullYear() + "." + (e.getMonth() + 1).toString().padStart(2, "0") + "." + e.getDate().toString().padStart(2, "0") + " " + e.getHours().toString().padStart(2, "0") + ":" + e.getMinutes().toString().padStart(2, "0")
        },
        formatTime: function(e) {
          return o(e) + " " + [e.getHours(), e.getMinutes(), e.getSeconds()].map(i).join(":")
        },
        $init: function(e) {
          e.$data = r.a.$copy(e.data, !0)
        },
        $digest: function(e) {
          var t, n = e.data,
            a = e.$data,
            i = {};
          for (t in n) r.a.$isEqual(n[t], a[t]) || (i[t] = n[t], a[t] = r.a.$copy(n[t], !0));
          Object.keys(i).length && e.setData(i)
        }
      }
    },
    21: function(e, t, n) {
      var a = n(8),
        r = n(0),
        i = n.n(r),
        o = n(14),
        s = n(71);
      t.a = {
        init: function() {
          var e = this,
            t = {
              wxApp: App,
              wxPage: Page,
              rewriteApp: function(e) {
                return t.wxApp(t.instrument(e))
              },
              rewritePage: function(e) {
                return t.wxPage(t.instrument(e))
              },
              appHandlerFuns: ["onLoad", "onShow", "onHide", "onUnload", "onLaunch", "onError"],
              pageHandlerFuns: ["onLoad", "onShow", "onHide", "onUnload", "onLaunch", "onError"],
              log: function(t, n, a) {
                var r, o, s, c;
                "onShow" == t && (r = void 0, n.__displayReporter && n.__displayReporter.showReferpagepath && (r = n.__displayReporter.showReferpagepath.split(".")[0]), e.commonDataStatistics("browse", n.route, r, "", "", n.options, ""), r = {
                  time: (new Date).getTime(),
                  pageUrl: n.route || ""
                }, i.a.setStorageSync("onshowInfo", r)), "onUnload" != t && "onHide" != t || (r = void 0, n.__displayReporter && n.__displayReporter.showReferpagepath && (r = n.__displayReporter.showReferpagepath.split(".")[0]), s = void 0, (o = i.a.getStorageSync("onshowInfo")).pageUrl && n.route && o.pageUrl == n.route && (c = (new Date).getTime(), o.time) && 0 < c - o.time && (s = parseInt((c - o.time) / 1e3)), e.commonDataStatistics("read", n.route, r, s, "", n.options, "")), a[0] && a[0].type && "tap" == a[0].type && (a[0].type, t) && (c = void 0, n.__displayReporter && n.__displayReporter.showReferpagepath && (c = n.__displayReporter.showReferpagepath.split(".")[0]), e.commonDataStatistics("click", n.route, c, "", t, "", ""))
              },
              hook: function(e, n) {
                var a = n;
                return function() {
                  return t.log(e, this, arguments), a.apply(this, arguments)
                }
              },
              instrument: function(e) {
                for (var t in e) "function" == typeof e[t] && (e[t] = this.hook(t, e[t]));
                return e
              },
              logApi: function(e) {}
            };
          App = t.rewriteApp, Page = t.rewritePage
        },
        studentWeChatPage: function(e) {
          var t = void 0;
          return [{
            id: 1,
            name: "机会",
            pageUrl: "pages/find/index/index"
          }, {
            id: "2",
            name: "成长",
            pageUrl: "ninthBag/pages/growup/growup"
          }, {
            id: 4,
            name: "消息",
            pageUrl: "fourthBag/pages/message/index/index"
          }, {
            id: 5,
            name: "我的",
            pageUrl: "fourthBag/pages/mine/index/index"
          }, {
            id: 6,
            name: "登录",
            pageUrl: "videoBag/pages/login/login/login"
          }, {
            id: 7,
            name: "设置求职意向",
            pageUrl: "videoBag/pages/jobintentionsetting/jobobjective/jobobjective"
          }, {
            id: 8,
            name: "求职-我的求职状态（首次并登录）",
            pageUrl: "videoBag/pages/jobintentionsetting/jobstatus/jobstatus"
          }, {
            id: 9,
            name: "我的-求职设置",
            pageUrl: "videoBag/pages/jobintentionsetting/jobset/jobset"
          }, {
            id: 10,
            name: "求职-搜索-选择城市",
            pageUrl: "videoBag/pages/search/selectcity/selectcity"
          }, {
            id: 11,
            name: "求职-搜索",
            pageUrl: "videoBag/pages/search/index/index"
          }, {
            id: 12,
            name: "求职-搜索-公司列表（搜索出的公司大于1时可点击查看全部进入）",
            pageUrl: "videoBag/pages/search/searchcompany/searchcompany"
          }, {
            id: 13,
            name: "公司详情",
            pageUrl: "echartsBag/pages/comdetail/comdetail"
          }, {
            id: 14,
            name: "职位详情",
            pageUrl: "videoBag/pages/posdetail/posdetail"
          }, {
            id: 15,
            name: "查看启动日志（测试用）",
            pageUrl: "videoBag/pages/logs/logs"
          }, {
            id: 16,
            name: "我的-客服与反馈",
            pageUrl: "videoBag/pages/customerservice/servicecenter/servicecenter"
          }, {
            id: 17,
            name: "我的-客服与反馈-意见反馈",
            pageUrl: "videoBag/pages/customerservice/feedback/feedback"
          }, {
            id: 18,
            name: "我的-客服与反馈-意见反馈-历史反馈",
            pageUrl: "videoBag/pages/customerservice/feedbackhistory/feedbackhistory"
          }, {
            id: 19,
            name: "我的-客服与反馈-用户反馈问题详情",
            pageUrl: "videoBag/pages/customerservice/problemdetails/problemdetails"
          }, {
            id: 20,
            name: "校友圈-完善校友资料（登录并未完善）-第一步",
            pageUrl: "videoBag/pages/login/baseInfo/index/index"
          }, {
            id: 21,
            name: "校友圈-完善校友资料-第二步",
            pageUrl: "videoBag/pages/login/baseInfo/myInterest/myInterest"
          }, {
            id: 22,
            name: "校友圈-完善校友资料-第三步",
            pageUrl: "videoBag/pages/login/baseInfo/indexNext/indexNext"
          }, {
            id: 23,
            name: "h5活动页",
            pageUrl: "videoBag/pages/h5/h5"
          }, {
            id: 24,
            name: "双选会详情",
            pageUrl: "videoBag/pages/doubleSelectList/doubleSelectList"
          }, {
            id: 25,
            name: "成长-实习任务-编辑个人评价",
            pageUrl: "echartsBag/pages/internshipEvaluation/selfEvaluation/selfEvaluation"
          }, {
            id: 26,
            name: "成长-实习任务-查看个人评价",
            pageUrl: "echartsBag/pages/internshipEvaluation/selfEvaluationView/selfEvaluationView"
          }, {
            id: 27,
            name: "实习成长-签到",
            pageUrl: "growUp/pages/sign/sign/sign"
          }, {
            id: 28,
            name: "实习成长-签到-统计",
            pageUrl: "growUp/pages/sign/signstatistics/signstatistics"
          }, {
            id: 29,
            name: "实习成长-签到-勤奋榜",
            pageUrl: "growUp/pages/sign/diligentlist/diligentlist"
          }, {
            id: 30,
            name: "实习成长-签到-外勤签到",
            pageUrl: "growUp/pages/sign/outsideSignIn/outsideSignIn"
          }, {
            id: 31,
            name: "成实习长-签到-帮助说明",
            pageUrl: "growUp/pages/sign/commonproblem/commonproblem"
          }, {
            id: 32,
            name: "成长-签到-统计-实习计划",
            pageUrl: "growUp/pages/sign/planList/planList"
          }, {
            id: 33,
            name: "成长-签到-实习计划",
            pageUrl: "growUp/pages/sign/signPlanList/signPlanList"
          }, {
            id: 34,
            name: "我的-问卷列表",
            pageUrl: "echartsBag/pages/questionnaire/questionnairelist/questionnairelist"
          }, {
            id: 35,
            name: "我的-问卷调查-回答问卷",
            pageUrl: "echartsBag/pages/questionnaire/answerquestionnaire/answerquestionnaire"
          }, {
            id: 36,
            name: "我的-问卷调查-问卷详情",
            pageUrl: "echartsBag/pages/questionnaire/rquestionnaireview/rquestionnaireview"
          }, {
            id: 37,
            name: "成长-实习任务-成绩鉴定表",
            pageUrl: "echartsBag/pages/gradeidentification/gradeidentification/gradeidentification"
          }, {
            id: 38,
            name: "成长-实习任务-成绩鉴定表-实习单位鉴定录入",
            pageUrl: "echartsBag/pages/gradeidentification/entryIdentification/entryIdentification"
          }, {
            id: 39,
            name: "成长-实习任务-成绩鉴定表-自我小结",
            pageUrl: "echartsBag/pages/gradeidentification/selfknot/selfknot"
          }, {
            id: 40,
            name: "成长-实习任务-成绩鉴定表-分享页",
            pageUrl: "echartsBag/pages/gradeidentification/h5/h5"
          }, {
            id: 41,
            name: "成长-实习任务",
            pageUrl: "fourthBag/pages/practice/internshipschedule/internshipschedule"
          }, {
            id: 42,
            name: "实习成长-实习计划报名",
            pageUrl: "growUp/pages/enroll/enrolllist/enrolllist"
          }, {
            id: 50,
            name: "实习成长-实习计划报名-自主实习-提交岗位",
            pageUrl: "fourthBag/pages/practice/submitPostInfo/submitPostInfo"
          }, {
            id: 51,
            name: "实习成长-实习计划报名-双向实习-岗位详情",
            pageUrl: "growUp/pages/enroll/enrollitem/jobdeails/jobdeails"
          }, {
            id: 52,
            name: "实习成长-实习计划报名-自主实习-提交岗位-选择所在行业",
            pageUrl: "growUp/pages/enroll/enrollitem/selectIndustry/selectIndustry"
          }, {
            id: 53,
            name: "实习成长-实习计划报名-实习计划详情",
            pageUrl: "fourthBag/pages/practice/planDetails/planDetails"
          }, {
            id: 54,
            name: "实习成长-实习计划报名-自主实习-查看更多信息",
            pageUrl: "growUp/pages/enroll/enrollitem/enrolldetails/enrolldetails"
          }, {
            id: 55,
            name: "成长-周日志-草稿箱",
            pageUrl: "growUp/pages/journal/darftList/darftList"
          }, {
            id: 56,
            name: "成长-周日志-写日志",
            pageUrl: "growUp/pages/journal/dailyeditor/editor"
          }, {
            id: 57,
            name: "日志详情",
            pageUrl: "growUp/pages/journal/journalDetails/journalDetails"
          }, {
            id: 58,
            name: "成长-我的日志",
            pageUrl: "growUp/pages/journal/journalList/journalList"
          }, {
            id: 59,
            name: "成长-周日志-写日志-实习计划",
            pageUrl: "growUp/pages/journal/relativePlanList/relativePlanList"
          }, {
            id: 60,
            name: "成长-周日志-写日志-月志-选择周期",
            pageUrl: "growUp/pages/dateRecord/monthlyRecord/monthlyRecord"
          }, {
            id: 61,
            name: "成长-周日志-写日志-周志-选择周期",
            pageUrl: "growUp/pages/dateRecord/weeklyRecord/weeklyRecord"
          }, {
            id: 62,
            name: "成长-周日志-写日志-日志-选择周期",
            pageUrl: "growUp/pages/dateRecord/dailyRecord/dailyRecord"
          }, {
            id: 63,
            name: "实习成长-实习计划报名-自主/集中提交岗位-工作签到地点",
            pageUrl: "growUp/pages/amap/workSignIn/workSignIn"
          }, {
            id: 64,
            name: "成长-实习任务-提交实习报告",
            pageUrl: "echartsBag/pages/practiceReport/index/index"
          }, {
            id: 65,
            name: "成长-实习任务-查看实习报告",
            pageUrl: "echartsBag/pages/practiceReport/success/success"
          }, {
            id: 66,
            name: "校友圈-校友会",
            pageUrl: "echartsBag/pages/alumnis/index/index"
          }, {
            id: 67,
            name: "校友圈-高校回归榜",
            pageUrl: "echartsBag/pages/alumnis/returnList/retutnList"
          }, {
            id: 68,
            name: "个人主页",
            pageUrl: "growUp/pages/home/homePage/index/index"
          }, {
            id: 69,
            name: "发布动态",
            pageUrl: "growUp/pages/home/addDynamic/addDynamic"
          }, {
            id: 70,
            name: "提问",
            pageUrl: "growUp/pages/home/addQuestion/addQuestion"
          }, {
            id: 71,
            name: "回答",
            pageUrl: "growUp/pages/home/addAnswer/addAnswer"
          }, {
            id: 72,
            name: "机会-搜索",
            pageUrl: "growUp/pages/home/homeSearch/homeSearch"
          }, {
            id: 73,
            name: "校友圈-热心校友榜",
            pageUrl: "echartsBag/pages/alumnis/earnestList/earnestList"
          }, {
            id: 74,
            name: "话题圈",
            pageUrl: "growUp/pages/home/topicCircle/topicCircle"
          }, {
            id: 75,
            name: "动态详情",
            pageUrl: "growUp/pages/home/dynamicDetail/dynamicDetail"
          }, {
            id: 76,
            name: "校友会分享",
            pageUrl: "growUp/pages/home/sharingAlumni/sharingAlumni"
          }, {
            id: 77,
            name: "校友圈-校友会-校友列表",
            pageUrl: "echartsBag/pages/alumnis/allSubList/allSubList"
          }, {
            id: 78,
            name: "校友圈分享",
            pageUrl: "growUp/pages/home/sharingAlumniCircle/sharingAlumniCircle"
          }, {
            id: 79,
            name: "问题详情",
            pageUrl: "growUp/pages/home/questiondetail/questiondetail"
          }, {
            id: 80,
            name: "问题详情-邀请回答",
            pageUrl: "growUp/pages/home/questioninvitelist/questioninvitelist"
          }, {
            id: 81,
            name: "答案详情",
            pageUrl: "growUp/pages/home/answerdetail/answerdetail"
          }, {
            id: 82,
            name: "资讯详情",
            pageUrl: "growUp/pages/home/informationdetail/informationdetail"
          }, {
            id: 83,
            name: "我的-个人主页-编辑个人信息",
            pageUrl: "growUp/pages/home/homePage/personInfo/personInfo"
          }, {
            id: 84,
            name: "我的-banner-活动详情",
            pageUrl: "growUp/pages/home/activitydetail/activitydetail"
          }, {
            id: 85,
            name: "聊天界面",
            pageUrl: "videoBag/pages/Chat/Chat"
          }, {
            id: 86,
            name: "校友会分享进入loading界面",
            pageUrl: "growUp/pages/home/sharingAlumniCircleLoading/sharingAlumniCircleLoading"
          }, {
            id: 87,
            name: "违规申明",
            pageUrl: "growUp/pages/home/lrregularities/lrregularities"
          }, {
            id: 88,
            name: "我的-我的积分",
            pageUrl: "echartsBag/pages/points/index/index"
          }, {
            id: 89,
            name: "我的-我的积分-积分记录",
            pageUrl: "echartsBag/pages/points/IntegralRule/IntegralRule"
          }, {
            id: 90,
            name: "我的-我的积分-积分商城",
            pageUrl: "echartsBag/pages/points/PointsMall/PointsMall"
          }, {
            id: 91,
            name: "我的-我的积分-积分商城-我的订单",
            pageUrl: "echartsBag/pages/points/MyMallOrder/MyMallOrder"
          }, {
            id: 92,
            name: "双选会-企业招聘列表",
            pageUrl: "videoBag/pages/mutualSelection/comRecruitmentList/comRecruitmentList"
          }, {
            id: 93,
            name: "双选会-企业招聘搜索",
            pageUrl: "videoBag/pages/mutualSelection/mutualSelectionSearch/mutualSelectionSearch"
          }, {
            id: 94,
            name: "消息-校招君-消息详情",
            pageUrl: "growUp/pages/home/messagedetail/messagedetail"
          }, {
            id: 95,
            name: "我的-城市-实习就业-更多列表",
            pageUrl: "secondBag/pages/hzsxjyMore/hzsxjyMore"
          }, {
            id: 96,
            name: "我的-城市-人才政策",
            pageUrl: "secondBag/pages/talentPolicy/talentPolicy"
          }, {
            id: 97,
            name: "我的-城市-帮助中心",
            pageUrl: "fifthBag/pages/helpCenter/index/index"
          }, {
            id: 98,
            name: "我的-城市-帮助中心-提问",
            pageUrl: "fifthBag/pages/helpCenter/sendQuestion/sendQuestion"
          }, {
            id: 99,
            name: "我的-城市-官方发布",
            pageUrl: "fifthBag/pages/huzhouDetail/huzhouDetail"
          }, {
            id: 100,
            name: "我的-城市-城市特色",
            pageUrl: "secondBag/pages/meiliDetail/meiliDetail"
          }, {
            id: 101,
            name: "消息-城市频道消息列表-城市频道消息",
            pageUrl: "fifthBag/pages/cityChannelMsg/cityChannelMsg"
          }, {
            id: 102,
            name: "我的-城市-城市频道公司职位搜索",
            pageUrl: "fifthBag/pages/huzhouSearch/huzhouSearch"
          }, {
            id: 103,
            name: "我的-城市-城市频道公司搜索",
            pageUrl: "fifthBag/pages/huzhouSearchCompany/huzhouSearchCompany"
          }, {
            id: 104,
            name: "我的-城市-播放视频",
            pageUrl: "secondBag/pages/videoShow/videoShow"
          }, {
            id: 105,
            name: "点击分享打开的人才政策详情页",
            pageUrl: "secondBag/pages/talentPolicy/ShareTalentPolicyDetail/ShareTalentPolicyDetail"
          }, {
            id: 106,
            name: "我的老师",
            pageUrl: "fifthBag/pages/message/classInfo/teacherList/teacherList"
          }, {
            id: 107,
            name: "企业消息",
            pageUrl: "fifthBag/pages/message/invitelist/invitelist"
          }, {
            id: 108,
            name: "消息-系统通知列表和活动消息列表-消息活动详情",
            pageUrl: "fifthBag/pages/message/activityDetail/activityDetail"
          }, {
            id: 109,
            name: "消息-实习消息",
            pageUrl: "fifthBag/pages/message/internshipnews/internshipnews"
          }, {
            id: 110,
            name: "问答助手",
            pageUrl: "fifthBag/pages/message/quetionnews/questionnews"
          }, {
            id: 111,
            name: "消息-赞消息列表",
            pageUrl: "fifthBag/pages/message/praiseList/praiseList"
          }, {
            id: 112,
            name: "消息-评论消息列表",
            pageUrl: "fifthBag/pages/message/commentList/commentList"
          }, {
            id: 113,
            name: "我的班级",
            pageUrl: "fifthBag/pages/message/classInfo/classList/classList"
          }, {
            id: 114,
            name: "群聊列表",
            pageUrl: "fifthBag/pages/message/groupList/GroupList"
          }, {
            id: 115,
            name: "消息-企业消息-招聘留言-求职进度",
            pageUrl: "fifthBag/pages/message/applyprogress/applyprogress"
          }, {
            id: 116,
            name: "消息-企业消息",
            pageUrl: "fifthBag/pages/message/noticelist/noticelist"
          }, {
            id: 117,
            name: "学校公告列表",
            pageUrl: "fifthBag/pages/message/schoolNotice/schoolNotice"
          }, {
            id: 118,
            name: "学校公告详情",
            pageUrl: "fifthBag/pages/message/schoolNoticeDetail/schoolNoticeDetail"
          }, {
            id: 119,
            name: "消息-系统通知列表和活动消息列表",
            pageUrl: "fifthBag/pages/message/systemActiveMsg/systemActiveMsg"
          }, {
            id: 120,
            name: "系统通知详情",
            pageUrl: "fifthBag/pages/message/systemActiveDetail/systemActiveDetail"
          }, {
            id: 121,
            name: "消息-求职情报",
            pageUrl: "fifthBag/pages/message/jobMessage/jobMessage"
          }, {
            id: 122,
            name: "群组详情",
            pageUrl: "fifthBag/pages/message/classInfo/groupList/groupDetail"
          }, {
            id: 123,
            name: "消息-企业消息-招聘留言",
            pageUrl: "fifthBag/pages/message/newsdetail/newsdetail"
          }, {
            id: 124,
            name: "我的简历",
            pageUrl: "thirdBag/pages/myresume/index/index"
          }, {
            id: 125,
            name: "我的-我的简历-编辑个人信息",
            pageUrl: "thirdBag/pages/myresume/editpersonalinfo/index/index"
          }, {
            id: 126,
            name: "我的-我的简历-校内职务",
            pageUrl: "thirdBag/pages/myresume/editpersonalinfo/schoolduty/schoolduty"
          }, {
            id: 127,
            name: "我的-我的简历-技能与特长",
            pageUrl: "thirdBag/pages/myresume/editpersonalinfo/skills/skills"
          }, {
            id: 128,
            name: "我的简历预览",
            pageUrl: "thirdBag/pages/myresume/resumepreview/resumepreview"
          }, {
            id: 129,
            name: "我的-我的简历-期望岗位",
            pageUrl: "thirdBag/pages/myresume/editpersonalinfo/expectjobs/expectjobs"
          }, {
            id: 130,
            name: "我的-我的简历-期望城市",
            pageUrl: "thirdBag/pages/myresume/editpersonalinfo/expectcitys/expectcitys"
          }, {
            id: 131,
            name: "我的-我的简历-求职意向",
            pageUrl: "thirdBag/pages/myresume/editpersonalinfo/jobintention/jobintention"
          }, {
            id: 132,
            name: "我的-我的简历-教育经历",
            pageUrl: "thirdBag/pages/myresume/editpersonalinfo/educationexp/educationexp"
          }, {
            id: 133,
            name: "我的-我的简历-项目经验",
            pageUrl: "thirdBag/pages/myresume/editpersonalinfo/projectexperience/projectexperience"
          }, {
            id: 134,
            name: "我的-我的简历-实习经历",
            pageUrl: "thirdBag/pages/myresume/editpersonalinfo/internshipexperience/internshipexperience"
          }, {
            id: 135,
            name: "我的-我的简历-自我评价",
            pageUrl: "thirdBag/pages/myresume/editpersonalinfo/summaryintroduce/summaryintroduce"
          }, {
            id: 136,
            name: "我的-我的简历-培训经历",
            pageUrl: "thirdBag/pages/myresume/editpersonalinfo/trainexperience/trainexperience"
          }, {
            id: 137,
            name: "话题圈-热门话题",
            pageUrl: "fourthBag/pages/find/hotTopic/hotTopic"
          }, {
            id: 138,
            name: "求职-名企校招专场",
            pageUrl: "fourthBag/pages/find/enterpriseSession/enterpriseSession"
          }, {
            id: 139,
            name: "banner-春招末班车",
            pageUrl: "fourthBag/pages/find/recruit/recruit"
          }, {
            id: 140,
            name: "banner-春招公司",
            pageUrl: "fourthBag/pages/find/recruitCompany/recruitCompany"
          }, {
            id: 141,
            name: "banner-春招岗位",
            pageUrl: "fourthBag/pages/find/recruitPosition/recruitPosition"
          }, {
            id: 142,
            name: "banner-春招",
            pageUrl: "fourthBag/pages/find/springRecruit/springRecruit"
          }, {
            id: 143,
            name: "banner-专场",
            pageUrl: "fourthBag/pages/find/recruitCity/recruitCity"
          }, {
            id: 144,
            name: "banner-周周新岗位",
            pageUrl: "fourthBag/pages/find/weeklyNewPosts/weeklyNewPosts"
          }, {
            id: 145,
            name: "职引-职业性格测试结果",
            pageUrl: "fourthBag/pages/find/testresult/testresult"
          }, {
            id: 146,
            name: "职引-职业性格测试简介",
            pageUrl: "fourthBag/pages/find/testintroduce/testintroduce"
          }, {
            id: 147,
            name: "职引-一级行业介绍",
            pageUrl: "fourthBag/pages/find/whereindex/whereindex"
          }, {
            id: 148,
            name: "职引-职位介绍",
            pageUrl: "fourthBag/pages/find/wherethird/wherethird"
          }, {
            id: 149,
            name: "职引-二级行业介绍",
            pageUrl: "fourthBag/pages/find/wheresecond/wheresecond"
          }, {
            id: 150,
            name: "职引-选择所在行业(未选择行业)",
            pageUrl: "fourthBag/pages/find/selectprofession/selectprofession"
          }, {
            id: 151,
            name: "职引-职业性格测试选择答案页面",
            pageUrl: "fourthBag/pages/find/naturetest/naturetest"
          }, {
            id: 152,
            name: "职引-职业性格测试介绍",
            pageUrl: "fourthBag/pages/find/introducedetail/introducedetail"
          }, {
            id: 153,
            name: "职引-职业性格测试开始",
            pageUrl: "fourthBag/pages/find/starttest/starttest"
          }, {
            id: 154,
            name: "校友邦事业网",
            pageUrl: "fourthBag/pages/find/wxarticle/wxarticle"
          }, {
            id: 155,
            name: "校友邦用户协议",
            pageUrl: "secondBag/pages/mine/useragreement/useragreement"
          }, {
            id: 156,
            name: "学籍认证成功后的完善简历页",
            pageUrl: "secondBag/pages/mine/schoolcensus/showsuccess/showsuccess"
          }, {
            id: 157,
            name: "我的-学籍认证",
            pageUrl: "secondBag/pages/mine/schoolcensus/sucstatus/sucstatus"
          }, {
            id: 158,
            name: "消息-投递反馈",
            pageUrl: "secondBag/pages/mine/sendrecord/sendrecord"
          }, {
            id: 159,
            name: "我的-我的学籍",
            pageUrl: "secondBag/pages/mine/schoolcensus/index/index"
          }, {
            id: 160,
            name: "我的-学籍认证-学籍认证失败",
            pageUrl: "secondBag/pages/mine/schoolcensus/failstatus/failstatus"
          }, {
            id: 161,
            name: "个人资料",
            pageUrl: "secondBag/pages/mine/personaldata/index/index"
          }, {
            id: 162,
            name: "编辑姓名",
            pageUrl: "secondBag/pages/mine/personaldata/editusername/editusername"
          }, {
            id: 163,
            name: "我的-收藏职位",
            pageUrl: "secondBag/pages/mine/collectposition/collectposition"
          }, {
            id: 164,
            name: "消息-招聘通知-求职详情",
            pageUrl: "secondBag/pages/mine/sendrecorddetail/sendrecorddetail"
          }, {
            id: 165,
            name: "我的-收藏的职位介绍",
            pageUrl: "secondBag/pages/mine/collectposintroduce/collectposintroduce"
          }, {
            id: 166,
            name: "我的-设置",
            pageUrl: "secondBag/pages/mine/setting/setting"
          }, {
            id: 167,
            name: "编辑昵称",
            pageUrl: "secondBag/pages/mine/personaldata/editnickname/editnickname"
          }, {
            id: 168,
            name: "我的-个人主页-共同关注的人",
            pageUrl: "secondBag/pages/mine/commonFollow/index"
          }, {
            id: 169,
            name: "我的简历-编辑个人信息",
            pageUrl: "secondBag/pages/mine/editpersonalinfo/editpersonalinfo"
          }, {
            id: 170,
            name: "我的简历-编辑教育经历",
            pageUrl: "secondBag/pages/mine/editeducationexp/editeducationexp"
          }, {
            id: 171,
            name: "我的简历-编辑工作经历",
            pageUrl: "secondBag/pages/mine/editinternshipexp/editinternshipexp"
          }, {
            id: 172,
            name: "我的-我的发布",
            pageUrl: "secondBag/pages/mine/mypublish/mypublish"
          }, {
            id: 173,
            name: "我的-我的关注",
            pageUrl: "secondBag/pages/mine/myfollow/myfollow"
          }, {
            id: 174,
            name: "我的-我的粉丝",
            pageUrl: "secondBag/pages/mine/myfans/myfans"
          }, {
            id: 175,
            name: "湖州频道联系我们",
            pageUrl: "fifthBag/pages/huzhouLinkMe/huzhouLinkMe"
          }, {
            id: 176,
            name: "认证实习经历列表",
            pageUrl: "thirdBag/pages/myresume/editPractice/editPractice"
          }, {
            id: 177,
            name: "认证实习经历详情",
            pageUrl: "thirdBag/pages/myresume/editPracticeDetail/editPracticeDetail"
          }, {
            id: 178,
            name: "认证实习经历周日志",
            pageUrl: "thirdBag/pages/myresume/addDailog/addDailog"
          }, {
            id: 179,
            name: "认证实习经历周日志详情",
            pageUrl: "thirdBag/pages/myresume/dailogDetail/dailogDetail"
          }, {
            id: 180,
            name: "校友圈",
            pageUrl: "secondBag/pages/alumniCircle/alumniCircle"
          }, {
            id: 181,
            name: "我的-看城市-绍兴湖州",
            pageUrl: "fifthBag/pages/huzhouList/huzhouList"
          }, {
            id: 182,
            name: "求职-名企优选",
            pageUrl: "fifthBag/pages/jobModule/company/company"
          }, {
            id: 183,
            name: "在线宣讲会列表",
            pageUrl: "fifthBag/pages/jobModule/preachMeeting/preachMeeting"
          }, {
            id: 184,
            name: "在线双选会列表",
            pageUrl: "fifthBag/pages/jobModule/doubleMeeting/doubleMeeting"
          }, {
            id: 185,
            name: "课程详情",
            pageUrl: "secondBag/pages/courseDetails/courseDetails"
          }, {
            id: 186,
            name: "热门话题-更多话题列表",
            pageUrl: "fourthBag/pages/find/moreTopic/moreTopic"
          }, {
            id: 187,
            name: "我的课程",
            pageUrl: "secondBag/pages/mine/myCourse/myCourse"
          }, {
            id: 188,
            name: "城市频道首次选择城市",
            pageUrl: "fifthBag/pages/huzhouCityList/huzhouCityList"
          }, {
            id: 189,
            name: "城市频道消息列表",
            pageUrl: "fifthBag/pages/cityChannelMsg/cityMsgList/cityMsgList"
          }, {
            id: 190,
            name: "绍兴频道联系我们",
            pageUrl: "fifthBag/pages/huzhouLinkMe/shaoxinLinkMe/shaoxinLinkMe"
          }, {
            id: 191,
            name: "在线宣讲会详情",
            pageUrl: "videoBag/pages/preachMeeting/preachMeeting"
          }, {
            id: 192,
            name: "收藏的宣讲会",
            pageUrl: "videoBag/pages/collectedCareerTalk/collectedCareerTalk"
          }, {
            id: 193,
            name: "我的简历-优化简历",
            pageUrl: "videoBag/pages/incompleteResume/incompleteResume"
          }, {
            id: 194,
            name: "消息-投递记录",
            pageUrl: "fifthBag/pages/message/jobMessage/jobNotice/jobNotice"
          }, {
            id: 195,
            name: "实习成长-实习计划报名-计划-查看更多信息",
            pageUrl: "growUp/pages/enroll/enrollitem/enrolldetails1/enrolldetails"
          }, {
            id: 196,
            name: "双选会投递成功",
            pageUrl: "fifthBag/pages/jobModule/doubleMeeting/applySuccess/applySuccess"
          }, {
            id: 197,
            name: "机会-求职指南",
            pageUrl: "secondBag/pages/jobBook/jobBook"
          }, {
            id: 198,
            name: "消息-校内消息",
            pageUrl: "fifthBag/pages/message/imList/imList"
          }, {
            id: 199,
            name: "成长-请假申请",
            pageUrl: "echartsBag/pages/offwork/offwork"
          }, {
            id: 200,
            name: "成长-请假列表",
            pageUrl: "echartsBag/pages/offWorkList/offWorkList"
          }, {
            id: 201,
            name: "成长-请假申请-选择老师",
            pageUrl: "echartsBag/pages/offWorkSelectTeacher/offWorkSelectTeacher"
          }, {
            id: 202,
            name: "成长-请假详情",
            pageUrl: "echartsBag/pages/offWorkDetail/offWorkDetail"
          }, {
            id: 203,
            name: "成长-请假申请计划列表",
            pageUrl: "echartsBag/pages/offwork/offworkPlanList/offworkPlanList"
          }, {
            id: 205,
            name: "消息-活动消息-问卷调查",
            pageUrl: "fifthBag/pages/message/questionnaireDetail/questionnaireDetail"
          }, {
            id: 206,
            name: "我的-客服与反馈-商务合作",
            pageUrl: "videoBag/pages/customerservice/cooperation/cooperation"
          }, {
            id: 207,
            name: "我的-学籍认证-选择学校",
            pageUrl: "secondBag/pages/mine/schoolcensus/selectSchool/selectSchool"
          }, {
            id: 208,
            name: "banner-春招快投站",
            pageUrl: "fourthBag/pages/find/springRecruitThreeTypes/springRecruitThreeTypes"
          }, {
            id: 210,
            name: "签到/提交周日志结果页",
            pageUrl: "ninthBag/pages/submitResultPage/submitResultPage"
          }, {
            id: 211,
            name: "找回密码",
            pageUrl: "ninthBag/pages/forgotPassword/forgotPassword"
          }, {
            id: 212,
            name: "账号申诉",
            pageUrl: "ninthBag/pages/accountAppeal/accountAppeal"
          }, {
            id: 213,
            name: "找我内推",
            pageUrl: "ninthBag/pages/lookingForMyPush/lookingForMyPush"
          }, {
            id: 214,
            name: "劳育实践-劳动教育实践学分明细",
            pageUrl: "ninthBag/education/creditList/creditList"
          }, {
            id: 215,
            name: "劳育实践-提交图片资料",
            pageUrl: "ninthBag/education/uploadImgInfo/uploadImgInfo"
          }, {
            id: 216,
            name: "上传总结",
            pageUrl: "ninthBag/education/uploadSummary/uploadSummary"
          }, {
            id: 217,
            name: "劳育项目池",
            pageUrl: "ninthBag/education/educationProjectList/educationProjectList"
          }, {
            id: 218,
            name: "劳育项目详情",
            pageUrl: "ninthBag/education/educationProjectDetails/educationProjectDetails"
          }, {
            id: 219,
            name: "劳育项目参与情况",
            pageUrl: "ninthBag/education/projectJoinDetails/projectJoinDetails"
          }, {
            id: 220,
            name: "劳育项目签到",
            pageUrl: "ninthBag/education/signInAddress/signInAddress"
          }, {
            id: 221,
            name: "劳育项目签到记录",
            pageUrl: "ninthBag/education/signInRecord/signInRecord"
          }, {
            id: 222,
            name: "求职指南",
            pageUrl: "fifthBag/pages/jobModule/jobBook/jobBook"
          }, {
            id: 223,
            name: "机会-授权登录",
            pageUrl: "secondBag/pages/mine/qrLoginSuccess/qrLoginSuccess"
          }, {
            id: 224,
            name: "双选会预告",
            pageUrl: "fifthBag/pages/jobModule/preDoubleMeeting/preDoubleMeeting"
          }, {
            id: 225,
            name: "互动分享",
            pageUrl: "ninthBag/pages/interaction/interaction"
          }, {
            id: 226,
            name: "机会-求职搜索",
            pageUrl: "ninthBag/pages/jobSearch/jobSearch"
          }, {
            id: 227,
            name: "学籍认证",
            pageUrl: "secondBag/pages/mine/schoolcensus/schoolcensuslist/schoolcensuslist"
          }, {
            id: 228,
            name: "劳育实践-总结",
            pageUrl: "ninthBag/cation/summaryDetails/summaryDetail"
          }, {
            id: 229,
            name: "劳育实践-图片资料",
            pageUrl: "ninthBag/education/imgInfoDetails/imgInfoDetails"
          }, {
            id: 230,
            name: "app跳转-关注公众号 H5页面",
            pageUrl: "ninthBag/pages/followWx/followWx"
          }, {
            id: 231,
            name: "简历投递成功",
            pageUrl: "ninthBag/pages/deliverSuccess/deliverSuccess"
          }, {
            id: 232,
            name: "挖掘用户的求职需求",
            pageUrl: "secondBag/pages/jobInformation/jobInformation"
          }, {
            id: 233,
            name: "三方协议 学生提交",
            pageUrl: "echartsBag/pages/agreement/commitAgreement/commitAgreement"
          }, {
            id: 234,
            name: "三方协议详情",
            pageUrl: "echartsBag/pages/agreement/viewAgreement/viewAgreement"
          }, {
            id: 235,
            name: "推荐岗位(模板消息推送)",
            pageUrl: "growUp/pages/recommendJobs/recommendJobs"
          }, {
            id: 236,
            name: "私域加二维码页面",
            pageUrl: "thirdBag/pages/privateSphere/privateSphere"
          }, {
            id: 238,
            name: "本校推荐",
            pageUrl: "ninthBag/pages/schoolRecomm/schoolRecomm"
          }, {
            id: 239,
            name: "邦邦推荐",
            pageUrl: "ninthBag/pages/bangbangRecomm/bangbangRecomm"
          }, {
            id: 240,
            name: "群组列表-更多",
            pageUrl: "fifthBag/pages/message/GroupPersonList/GroupPersonList"
          }, {
            id: 241,
            name: "私域-放弃学籍认证或实习报名未关注公众号",
            pageUrl: "thirdBag/pages/privateSphereAccreditation/privateSphereAccreditation"
          }, {
            id: 242,
            name: "私域-实习报名关注公众号",
            pageUrl: "thirdBag/pages/privateSphereOfficialAccounts/privateSphereOfficialAccounts"
          }, {
            id: 243,
            name: "学籍申述",
            pageUrl: "secondBag/pages/mine/schoolcensus/studentComplaint/studentComplaint"
          }, {
            id: 244,
            name: "三方协议特殊补交",
            pageUrl: "echartsBag/pages/agreement/commitAgreement/relCommitAgreement"
          }, {
            id: 245,
            name: "私域-学籍认证成功",
            pageUrl: "thirdBag/pages/privateSphereSchool/privateSphereSchool"
          }, {
            id: 246,
            name: "实习手册/周日志/成绩鉴定表下载说明",
            pageUrl: "echartsBag/pages/DownloadExplain/DownloadExplain"
          }, {
            id: 247,
            name: "提交监护人知情同意书",
            pageUrl: "echartsBag/pages/informedConsent/commitInformedConsent/commitInformedConsent"
          }, {
            id: 248,
            name: "监护人知情同意书详情",
            pageUrl: "echartsBag/pages/informedConsent/viewInformedConsent/viewInformedConsent"
          }, {
            id: 249,
            name: "就业上报",
            pageUrl: "growUp/pages/employmentReport/employmentReport"
          }, {
            id: 250,
            name: "就业上报详情",
            pageUrl: "growUp/pages/employmentReportDetail/employmentReportDetail"
          }, {
            id: 251,
            name: "附件简历列表",
            pageUrl: "thirdBag/pages/accessoryResume/resumeList/resumeList"
          }, {
            id: 252,
            name: "上传附件简历方式",
            pageUrl: "thirdBag/pages/accessoryResume/uploadWay/uploadWay"
          }, {
            id: 253,
            name: "上传附件简历",
            pageUrl: "thirdBag/pages/accessoryResume/uploadResume/uploadResume"
          }, {
            id: 254,
            name: "就业上报选择职业类别",
            pageUrl: "growUp/pages/jobCategory/jobCategory"
          }, {
            id: 255,
            name: "统一身份认证错误提示页面",
            pageUrl: "pages/AuthenticationError/AuthenticationError"
          }, {
            id: 256,
            name: "统一身份认证绑定手机密码页面",
            pageUrl: "secondBag/pages/mine/schoolcensus/AuthenticationBinding/AuthenticationBinding"
          }, {
            id: 257,
            name: "学校自建应用企业微信登录页面",
            pageUrl: "pages/qyWechatLogin/qyWechatLogin"
          }, {
            id: 258,
            name: "上传劳动报告",
            pageUrl: "ninthBag/education/uploadLaborReport/uploadLaborReport"
          }, {
            id: 259,
            name: "上传日志附件",
            pageUrl: "growUp/pages/journal/uploadBlogAccessory/uploadBlogAccessory"
          }, {
            id: 260,
            name: "签到成功",
            pageUrl: "growUp/pages/sign/successfulCheck/successfulCheck"
          }, {
            id: 261,
            name: "上传实习报告",
            pageUrl: "echartsBag/pages/uploadReport/uploadReport"
          }, {
            id: 262,
            name: "上传实习报告成功",
            pageUrl: "echartsBag/pages/uploadSuccess/uploadSuccess"
          }, {
            id: 263,
            name: "查看提交预实习报告",
            pageUrl: "echartsBag/pages/practiceReport/preReport/index"
          }, {
            id: 264,
            name: "提交过程文档",
            pageUrl: "echartsBag/pages/uploadProcessDoc/uploadProcessDoc"
          }, {
            id: 265,
            name: "岗位推荐-消息模块",
            pageUrl: "fifthBag/pages/recommendedJobs/recommendedJobs"
          }, {
            id: 266,
            name: "学分认定-活动报名",
            pageUrl: "ninthBag/pages/activitySignUp/activitySignUp"
          }, {
            id: 267,
            name: "学分认定-活动详情",
            pageUrl: "ninthBag/pages/activityDetail/activityDetail"
          }, {
            id: 268,
            name: "学分认定-学分申报",
            pageUrl: "ninthBag/pages/creditApplication/creditApplication"
          }, {
            id: 269,
            name: "学分认定-活动参与情况",
            pageUrl: "ninthBag/pages/activityParticipation/activityParticipation"
          }, {
            id: 270,
            name: "学分认定-填写申报",
            pageUrl: "ninthBag/pages/submitDeclaration/submitDeclaration"
          }, {
            id: 271,
            name: "学分认定-申报详情",
            pageUrl: "ninthBag/pages/declarationDetails/declarationDetails"
          }, {
            id: 272,
            name: "学分认定-我的学分",
            pageUrl: "ninthBag/pages/myCredit/myCredit"
          }, {
            id: 273,
            name: "学分认定-学分明细",
            pageUrl: "ninthBag/pages/myCreditList/myCreditList"
          }, {
            id: 274,
            name: "学分认定-学分详情",
            pageUrl: "ninthBag/pages/myCreditDetail/myCreditDetail"
          }, {
            id: 275,
            name: "学分认定-学分统计",
            pageUrl: "ninthBag/pages/creditStatistics/creditStatistics"
          }, {
            id: 276,
            name: "申报提交结果",
            pageUrl: "ninthBag/pages/submitDeclarationResult/submitDeclarationResult"
          }, {
            id: 277,
            name: "学分成绩单",
            pageUrl: "ninthBag/pages/creditTranscript/creditTranscript"
          }, {
            id: 278,
            name: "更多简历模板列表页",
            pageUrl: "secondBag/pages/resumeTemplateList/resumeTemplateList"
          }, {
            id: 279,
            name: "简历模板详情页",
            pageUrl: "thirdBag/pages/myresume/viewResumeTemplate/viewResumeTemplate"
          }, {
            id: 280,
            name: "搜索实习计划页",
            pageUrl: "secondBag/pages/InternshipPlan/InternshipPlan"
          }, {
            id: 281,
            name: "测评页",
            pageUrl: "fourthBag/pages/find/EvaluationPage/EvaluationPage"
          }, {
            id: 282,
            name: "职业生涯规划",
            pageUrl: "echartsBag/pages/careerPlanning/careerPlanning"
          }, {
            id: 283,
            name: "企业热评列表页面",
            pageUrl: "ninthBag/pages/enterpriseReviews/enterpriseReviews"
          }, {
            id: 284,
            name: "企业点评-搜索结果",
            pageUrl: "ninthBag/pages/enterpriseReviewsSearch/enterpriseReviewsSearch"
          }, {
            id: 285,
            name: "进名企",
            pageUrl: "ninthBag/pages/IntoEnterprisePage/IntoEnterprisePage"
          }, {
            id: 286,
            name: "集中项目岗位提交记录",
            pageUrl: "ninthBag/pages/centerItemSubmitLog/centerItemSubmitLog"
          }, {
            id: 287,
            name: "集中项目岗位提交详情",
            pageUrl: "ninthBag/pages/centerItemSubmitLogDetail/centerItemSubmitLogDetail"
          }, {
            id: 288,
            name: "AI助手",
            pageUrl: "echartsBag/pages/aiAssistant/aiAssistant"
          }, {
            id: 289,
            name: "职业生涯规划就业指导",
            pageUrl: "echartsBag/pages/careerGuidance/careerGuidance"
          }, {
            id: 290,
            name: "大学生职业规划大赛",
            pageUrl: "echartsBag/pages/careerPlanCompetition/careerPlanCompetition"
          }, {
            id: 291,
            name: "免实习申请列表",
            pageUrl: "thirdBag/pages/exemptionInternship/exemptionInternshipList/exemptionInternshipList"
          }, {
            id: 292,
            name: "免实习申请",
            pageUrl: "thirdBag/pages/exemptionInternship/exemptionInternshipApply/exemptionInternshipApply"
          }, {
            id: 293,
            name: "免实习申请详情",
            pageUrl: "thirdBag/pages/exemptionInternship/exemptionInternshipDetail/exemptionInternshipDetail"
          }, {
            id: 294,
            name: "社团活动",
            pageUrl: "ninthBag/pages/communityActivities/communityActivities"
          }, {
            id: 295,
            name: "社团活动-发布社团活动",
            pageUrl: "ninthBag/pages/publishActivities/publishActivities"
          }, {
            id: 296,
            name: "社团活动-选择参与学生",
            pageUrl: "ninthBag/pages/selectiveStudent/selectiveStudent"
          }, {
            id: 297,
            name: "社团活动-查看签到",
            pageUrl: "ninthBag/pages/signInDetails/signInDetails"
          }, {
            id: 298,
            name: "社团活动-拍照签到",
            pageUrl: "ninthBag/pages/eventPhotoSignIn/eventPhotoSignIn"
          }, {
            id: 299,
            name: "社团活动-我的社团",
            pageUrl: "ninthBag/pages/MyClub/MyClub"
          }, {
            id: 300,
            name: "社团活动-社团会议记录",
            pageUrl: "ninthBag/pages/clubMeetingRecord/clubMeetingRecord"
          }, {
            id: 301,
            name: "社团活动-社团会议记录详情",
            pageUrl: "ninthBag/pages/clubMeetingRecordDetail/clubMeetingRecordDetail"
          }, {
            id: 302,
            name: "社团活动-社团资料",
            pageUrl: "ninthBag/pages/clubData/clubData"
          }, {
            id: 303,
            name: "社团活动-上传社团资料",
            pageUrl: "ninthBag/pages/uploadClubData/uploadClubData"
          }, {
            id: 304,
            name: "社团活动-社团公告",
            pageUrl: "ninthBag/pages/ClubNotice/ClubNotice"
          }, {
            id: 305,
            name: "社团活动-社团介绍",
            pageUrl: "ninthBag/pages/ClubIntroduction/ClubIntroduction"
          }, {
            id: 306,
            name: "社团活动-社团指导点评",
            pageUrl: "ninthBag/pages/ClubGuideComment/ClubGuideComment"
          }, {
            id: 307,
            name: "社团活动-社团招新",
            pageUrl: "ninthBag/pages/AssociationRecruitment/AssociationRecruitment"
          }, {
            id: 308,
            name: "社团活动-社团资料详情",
            pageUrl: "ninthBag/pages/clubDataDetail/clubDataDetail"
          }, {
            id: 309,
            name: "社团活动-换届申请",
            pageUrl: "ninthBag/pages/changeProprieterApplication/changeProprieterApplication"
          }, {
            id: 310,
            name: "社团活动-公告详情",
            pageUrl: "ninthBag/pages/NoticeDetails/NoticeDetails"
          }, {
            id: 311,
            name: "社团活动-加入社团",
            pageUrl: "ninthBag/pages/addClub/addClub"
          }, {
            id: 312,
            name: "新手指引",
            pageUrl: "ninthBag/pages/novice/novice"
          }, {
            id: 313,
            name: "社团活动-添加会议记录",
            pageUrl: "ninthBag/pages/addClubMettingRecord/addClubMettingRecord"
          }, {
            id: 314,
            name: "社团活动-社长发布公告",
            pageUrl: "ninthBag/pages/announcementByPresident/announcementByPresident"
          }, {
            id: 315,
            name: "社团活动-社长发布公告-上传附件页面",
            pageUrl: "ninthBag/pages/announcementByPresident/uploadAccessory/uploadAccessory"
          }, {
            id: 316,
            name: "实习报告详情",
            pageUrl: "echartsBag/pages/reportDetail/reportDetail"
          }, {
            id: 317,
            name: "宣讲会",
            pageUrl: "pages/find/components/BriefingSession/BriefingSession"
          }, {
            id: 318,
            name: "看城市",
            pageUrl: "secondBag/pages/city/city"
          }, {
            id: 319,
            name: "搜索职位",
            pageUrl: "thirdBag/pages/myresume/editpersonalinfo/expectjobSeach/expectjobSeach"
          }, {
            id: 320,
            name: "AI小助手",
            pageUrl: "thirdBag/pages/aiMessage/aiMessage"
          }, {
            id: 321,
            name: "热门问题",
            pageUrl: "thirdBag/pages/HotQuestion/HotQuestion"
          }, {
            id: 322,
            name: "今日热榜",
            pageUrl: "fourthBag/pages/find/hotMoreTopic/hotMoreTopic"
          }, {
            id: 323,
            name: "空页面",
            pageUrl: "fourthBag/pages/Empty/Empty"
          }, {
            id: 325,
            name: "提交集中实习岗位新页面",
            pageUrl: "fourthBag/pages/practice/submitCenterPostInfo/submitCenterPostInfo"
          }, {
            id: 326,
            name: "在线宣讲会",
            pageUrl: "fifthBag/pages/jobModule/doubleMeeting/mineDoubleMeet/mineDoubleMeet"
          }, {
            id: 327,
            name: "资讯情报站",
            pageUrl: "fifthBag/pages/jobModule/informationStation/informationStation"
          }, {
            id: 328,
            name: "职业百科",
            pageUrl: "fifthBag/pages/jobModule/ProfessionalTreasure/ProfessionalTreasure"
          }, {
            id: 329,
            name: "学分预警",
            pageUrl: "fifthBag/pages/message/creditWarning/creditWarning"
          }, {
            id: 332,
            name: "团队活动",
            pageUrl: "videoBag/pages/GroupActivities/GroupActivities"
          }, {
            id: 333,
            name: "本校专场/专业匹配/家乡名企",
            pageUrl: "videoBag/pages/doubleSelectList/detail/detail"
          }, {
            id: 334,
            name: "同学等等我",
            pageUrl: "videoBag/pages/loading/loading"
          }, {
            id: 335,
            name: "企业点评",
            pageUrl: "videoBag/pages/ComComment/ComComment"
          }, {
            id: 336,
            name: "企业印象点评",
            pageUrl: "videoBag/pages/ImpressionComment/ImpressionComment"
          }, {
            id: 3371,
            name: "企业点评-你对该企业印象如何",
            pageUrl: "videoBag/pages/ImpressionComment/ImpressionComment"
          }, {
            id: 337,
            name: "我的订单",
            pageUrl: "videoBag/pages/MyOrder/MyOrder"
          }, {
            id: 338,
            name: "我的积分",
            pageUrl: "echartsBag/pages/professionalDetail/professionalDetail"
          }, {
            id: 339,
            name: "积分记录",
            pageUrl: "echartsBag/pages/points/integralReport/integralReport"
          }, {
            id: 340,
            name: "上传预实习报告",
            pageUrl: "echartsBag/pages/uploadPreReport/uploadPreReport"
          }, {
            id: 341,
            name: "上传过程文档",
            pageUrl: "echartsBag/pages/processDoc/uploadProcessDoc/uploadProcessDoc"
          }, {
            id: 342,
            name: "pc上传过程文档",
            pageUrl: "echartsBag/pages/processDoc/pcUpload/pcUpload"
          }, {
            id: 343,
            name: "总结",
            pageUrl: "ninthBag/education/summaryDetails/summaryDetails"
          }, {
            id: 344,
            name: "投递简历详情",
            pageUrl: "ninthBag/pages/deliverInviteDetails/deliverInviteDetails"
          }, {
            id: 345,
            name: "邀约投递机会",
            pageUrl: "ninthBag/pages/deliverInviteDetails/deliverInviteDetails"
          }, {
            id: 346,
            name: "推荐岗位",
            pageUrl: "ninthBag/pages/recommendedPosition/recommendedPosition"
          }, {
            id: 347,
            name: "面试邀请",
            pageUrl: "ninthBag/pages/interviewInviteDetails/interviewInviteDetails"
          }, {
            id: 348,
            name: "新手指引",
            pageUrl: "ninthBag/pages/newUserGuide/newUserGuide"
          }, {
            id: 3481,
            name: "个人职位专场-完善求职信息",
            pageUrl: "ninthBag/pages/recommJobobjective/recommJobobjective"
          }, {
            id: 349,
            name: "换届申请详情",
            pageUrl: "ninthBag/pages/changeProprieterApplicationDetail/changeProprieterApplicationDetail"
          }, {
            id: 350,
            name: "新增常用语",
            pageUrl: "fifthBag/pages/phraseManagement/phraseManagement"
          }, {
            id: 351,
            name: "安全责任书详情",
            pageUrl: "fourthBag/pages/practice/safetyResponsibilityLetter/safetyResponsibilityLetter"
          }, {
            id: 352,
            name: "安全责任书签字",
            pageUrl: "thirdBag/pages/signature/signature"
          }, {
            id: 353,
            name: "学籍认证-实习意愿",
            pageUrl: "secondBag/pages/mine/schoolcensus/practiceWillingness/practiceWillingness"
          }, {
            id: 354,
            name: "新手好礼",
            pageUrl: "ninthBag/pages/NoviceTaskGift/NoviceTaskGift"
          }, {
            id: 355,
            name: "h5统一身份认证登录",
            pageUrl: "pages/h5Login/h5Login"
          }, {
            id: 356,
            name: "简历优化",
            pageUrl: "thirdBag/pages/ResumeOptimization/ResumeOptimization"
          }, {
            id: 357,
            name: "简历模板支付成功",
            pageUrl: "thirdBag/pages/PaySuccess/PaySuccess"
          }, {
            id: 358,
            name: "支付订单",
            pageUrl: "thirdBag/pages/PayOrder/PayOrder"
          }, {
            id: 359,
            name: "专属助教",
            pageUrl: "thirdBag/pages/Personalassistant/Personalassistant"
          }, {
            id: 360,
            name: "薪资测评",
            pageUrl: "ninthBag/pages/salaryEvaluation/salaryEvaluation"
          }, {
            id: 361,
            name: "薪资测评结果",
            pageUrl: "ninthBag/pages/salaryEvaluationResult/salaryEvaluationResult"
          }, {
            id: 362,
            name: "劳动教育-学分明细",
            pageUrl: "ninthBag/education/creditList/creditListDetail/creditListDetail"
          }, {
            id: 363,
            name: "考研真题详情",
            pageUrl: "fourthBag/pages/graduateDetail/graduateDetail"
          }, {
            id: 364,
            name: "考研助手",
            pageUrl: "fourthBag/pages/graduateAssistant/graduateAssistant"
          }, {
            id: 365,
            name: "秋招活动页",
            pageUrl: "thirdBag/pages/AutumnRecruitmentDetail/AutumnRecruitmentDetail"
          }, {
            id: 366,
            name: "秋招活动专属岗位",
            pageUrl: "thirdBag/pages/ExclusiveRecommendation/ExclusiveRecommendation"
          }, {
            id: 367,
            name: "双选会推荐企业",
            pageUrl: "fifthBag/pages/message/DoubleMessageList/DoubleMessageList"
          }, {
            id: 368,
            name: "看一看",
            pageUrl: "fifthBag/pages/message/LookInformationStation/LookInformationStation"
          }, {
            id: 369,
            name: "报名详情",
            pageUrl: "fourthBag/pages/signUpDetails/signUpDetails"
          }, {
            id: 370,
            name: "搜索项目",
            pageUrl: "fourthBag/pages/practice/projectSearch/projectSearch"
          }, {
            id: 371,
            name: "名企网申列表",
            pageUrl: "secondBag/pages/enterpriseApplicationList/enterpriseApplicationList"
          }, {
            id: 372,
            name: "名企网申企业主页",
            pageUrl: "secondBag/pages/applicationEnterpriseHome/applicationEnterpriseHome"
          }, {
            id: 373,
            name: "名企网申岗位详情",
            pageUrl: "secondBag/pages/applyJobDetails/applyJobDetails"
          }, {
            id: 374,
            name: "寒假招工列表",
            pageUrl: "secondBag/pages/holidayWorkList/holidayWorkList"
          }, {
            id: 375,
            name: "添加技能与特长",
            pageUrl: "secondBag/pages/languageSkills/addLanguageSkills/addLanguageSkills"
          }, {
            id: 376,
            name: "技能与特长选择",
            pageUrl: "secondBag/pages/languageSkills/languageSkillsSelector/languageSkillsSelector"
          }, {
            id: 377,
            name: "RPO简历投递成功",
            pageUrl: "thirdBag/pages/rpoDeliverySuccess/rpoDeliverySuccess"
          }, {
            id: 378,
            name: "求职雷达",
            pageUrl: "thirdBag/pages/JobSearchRadar/JobSearchRadar"
          }, {
            id: 379,
            name: "金华人社推荐",
            pageUrl: "secondBag/pages/personalRecommendation/personalRecommendation"
          }, {
            id: 380,
            name: "职引",
            pageUrl: "secondBag/pages/jobInduction/jobInduction"
          }, {
            id: 381,
            name: "学长学姐说",
            pageUrl: "secondBag/pages/seniorTalks/seniorTalks"
          }, {
            id: 382,
            name: "学长学姐说详情",
            pageUrl: "secondBag/pages/seniorTalksDetail/seniorTalksDetail"
          }, {
            id: 383,
            name: "ai落地页",
            pageUrl: "secondBag/pages/aiLandingPage/aiLandingPage"
          }, {
            id: 384,
            name: "ai对话",
            pageUrl: "secondBag/pages/aiGc/aiGc"
          }, {
            id: 385,
            name: "项目式实习实习任务",
            pageUrl: "ninthBag/pages/internshipTask/internshipTask"
          }, {
            id: 386,
            name: "我的项目式实习",
            pageUrl: "secondBag/pages/myEnterpriseProject/myEnterpriseProject"
          }, {
            id: 387,
            name: "项目式实习申报",
            pageUrl: "secondBag/pages/enterpriseProjectDeclaration/enterpriseProjectDeclaration"
          }, {
            id: 388,
            name: "上传结题报告",
            pageUrl: "secondBag/pages/uploadFinalReport/uploadFinalReport"
          }, {
            id: 389,
            name: "项目式实习审核详情",
            pageUrl: "secondBag/pages/projectAuditDetails/projectAuditDetails"
          }, {
            id: 390,
            name: "富文本",
            pageUrl: "secondBag/pages/richTextEditor/richTextEditor"
          }, {
            id: 3901,
            name: "电脑端提交方式",
            pageUrl: "secondBag/pages/pcUploadWay/pcUploadWay"
          }, {
            id: 391,
            name: "ai简历",
            pageUrl: "secondBag/pages/aiResume/aiResume"
          }, {
            id: 392,
            name: "快速填写ai简历",
            pageUrl: "secondBag/pages/quickCreationResume/quickCreationResume"
          }, {
            id: 393,
            name: "ai简历模板",
            pageUrl: "secondBag/pages/aiResumeTemplate/aiResumeTemplate"
          }, {
            id: 394,
            name: "润色完成简历预览",
            pageUrl: "secondBag/pages/resumePreview/resumePreview"
          }, {
            id: 395,
            name: "师范版-提交情况列表",
            pageUrl: "secondBag/pages/normalEdition/CommitRecordList/CommitRecordList"
          }, {
            id: 396,
            name: "师范版-提交资料",
            pageUrl: "secondBag/pages/normalEdition/SubmitData/SubmitData"
          }, {
            id: 397,
            name: "师范版-师范版提交详情页",
            pageUrl: "secondBag/pages/normalEdition/SubmitDetail/SubmitDetail"
          }, {
            id: 398,
            name: "留学",
            pageUrl: "thirdBag/pages/studyAbroad/studyAbroad"
          }, {
            id: 399,
            name: "新手引导",
            pageUrl: "fifthBag/pages/beginnerGuide/beginnerGuide"
          }, {
            id: 400,
            name: "一键接受邀约",
            pageUrl: "fourthBag/pages/message/acceptInvitation/acceptInvitation"
          }, {
            id: 401,
            name: "AI客服",
            pageUrl: "videoBag/pages/customerservice/aiCustomerService/aiCustomerService"
          }, {
            id: 402,
            name: "补签申请",
            pageUrl: "growUp/pages/sign/supplementarySign/supplementarySign"
          }, {
            id: 403,
            name: "补签申请详情",
            pageUrl: "growUp/pages/sign/supplementaryInfo/supplementaryInfo"
          }, {
            id: 404,
            name: "补签申请切换计划",
            pageUrl: "growUp/pages/sign/supplementarySign/offworkPlanList/reSignPlanList"
          }, {
            id: 405,
            name: "安全指南",
            pageUrl: "fourthBag/pages/safeGuide/safeGuide"
          }, {
            id: 406,
            name: "推荐岗位",
            pageUrl: "thirdBag/pages/resumeRecommendJob/resumeRecommendJob"
          }, {
            id: 407,
            name: "上传实习报告在线",
            pageUrl: "echartsBag/pages/uploadReportOnline/uploadReportOnline"
          }, {
            id: 408,
            name: "Ai薪资测评",
            pageUrl: "tenthBag/pages/aiSalaryEvaluation/aiSalaryEvaluation"
          }, {
            id: 409,
            name: "获取内测会员",
            pageUrl: "tenthBag/pages/internalTestMember/internalTestMember"
          }, {
            id: 410,
            name: "购买会员",
            pageUrl: "tenthBag/pages/buyMember/buyMember"
          }, {
            id: 411,
            name: "修改我的绑定手机",
            pageUrl: "secondBag/pages/changeBoundPhone/changeBoundPhone"
          }, {
            id: 412,
            name: "福利中心",
            pageUrl: "tenthBag/pages/welfareCenter/welfareCenter"
          }, {
            id: 413,
            name: "智能助手页面",
            pageUrl: "tenthBag/pages/resumeAnalysis/resumeAnalysis"
          }, {
            id: 414,
            name: "专属报告页面",
            pageUrl: "tenthBag/pages/myReport/myReport"
          }, {
            id: 415,
            name: "专属报告预览页面",
            pageUrl: "tenthBag/pages/reportDetail/reportDetail"
          }, {
            id: 416,
            name: "模拟面试落地页",
            pageUrl: "tenthBag/pages/mockInterviewLandingPage/mockInterviewLandingPage"
          }, {
            id: 417,
            name: "安全教育",
            pageUrl: "growUp/pages/safetyEducation/safetyEducation"
          }, {
            id: 418,
            name: "安全教育-列表",
            pageUrl: "growUp/pages/safetyEducation/inc/safetyEducationItem/safetyEducationItem"
          }, {
            id: 419,
            name: "安全教育-列表-详情",
            pageUrl: "growUp/pages/safetyEducation/inc/safetyEducationItem/safetyEducationInfo"
          }, {
            id: 420,
            name: "违规上报列表",
            pageUrl: "growUp/pages/violationReport/violationReport"
          }, {
            id: 421,
            name: "违规上报-添加",
            pageUrl: "growUp/pages/violationReport/violationReportAdd"
          }, {
            id: 422,
            name: "违规上报-详情",
            pageUrl: "growUp/pages/violationReportInfo/violationReportInfo"
          }, {
            id: 424,
            name: "能力管家",
            pageUrl: "pages/abilityManager/abilityManager"
          }, {
            id: 425,
            name: "能力管家子页面",
            pageUrl: "pages/abilityManagerItem/abilityManagerItem"
          }, {
            id: 426,
            name: "完善简历",
            pageUrl: "pages/completeResume/completeResume"
          }, {
            id: 427,
            name: "报名成功",
            pageUrl: "pages/signUpSuccess/signUpSuccess"
          }, {
            id: 428,
            name: "入群享专属求职服务",
            pageUrl: "pages/joinGroup/joinGroup"
          }, {
            id: 429,
            name: "公考事业编公告列表",
            pageUrl: "secondBag/pages/civilNoticeList/civilNoticeList"
          }, {
            id: 430,
            name: "公考事业编信息详情",
            pageUrl: "secondBag/pages/civilNoticeDetail/civilNoticeDetail"
          }, {
            id: 431,
            name: "名企直投-搜索",
            pageUrl: "tenthBag/pages/enterpriseSearch/enterpriseSearch"
          }, {
            id: 432,
            name: "青团宝中转页",
            pageUrl: "tenthBag/pages/qtbTransferPage/qtbTransferPage"
          }, {
            id: 433,
            name: "青团宝webview",
            pageUrl: "tenthBag/pages/qtbWebview/qtbWebview"
          }, {
            id: 434,
            name: "青团宝桥接页",
            pageUrl: "tenthBag/pages/qtbBridgePage/qtbBridgePage"
          }].some((function(n) {
            if (e == n.pageUrl) return t = n
          })), t
        },
        commonDataStatistics: function(e, t, n, r, c, u, l, p) {
          var d = void 0,
            g = void 0,
            f = (p = ("click" == e && (p && p.itemId && (d = p.itemId), p) && p.itemTypeName && (g = p.itemTypeName), "growUp/pages/home/informationdetail/informationdetail" == t && (g = "资讯", u) && u.id && (d = u.id), "growUp/pages/home/dynamicDetail/dynamicDetail" == t && (g = "动态", u) && u.dynamicId && (d = u.dynamicId), "growUp/pages/home/questiondetail/questiondetail" == t && (g = "问题", u) && u.questionId && (d = u.questionId), "growUp/pages/home/answerdetail/answerdetail" == t && (g = "回答", u) && u.answerId && (d = u.answerId), "videoBag/pages/posdetail/posdetail" == t && ("click" == e ? (g = "岗位详情-相似岗位", p && p.itemId && (d = p.itemId)) : (g = "岗位", u && u.postid && (d = u.postid))), "ninthBag/pages/deliverSuccess/deliverSuccess" == t && (g = "岗位投递成功-相似岗位", p) && p.itemId && (d = p.itemId), "secondBag/pages/mine/sendrecorddetail/sendrecorddetail" == t && (g = "求职详情-相似岗位", p) && p.itemId && (d = p.itemId), "growUp/pages/recommendJobs/recommendJobs" == t && (g = "推荐岗位(模板消息推送)", p) && p.itemId && (d = p.itemId), "pages/find/index/index" == t && "click" == e && (g = "机会-岗位详情岗位", p) && p.itemId && (d = p.itemId), "echartsBag/pages/comdetail/comdetail" != t || "browse" != e && "read" != e || (g = "公司详情", u && u.comid && (d = u.comid)), "expose" == e && (g = l, d = u), "运营活动" == l || "站内信" == l ? (g = l, d = u) : "运营活动banner" == l ? (g = "", d = u) : "slideDown" != e && "slideUp" != e && "start" != e && "quit" != e || (g = "", d = u || ""), !u || !u.fromType || "browse" !== e && "read" !== e || "thirdBag/pages/myresume/index/index" !== t && "thirdBag/pages/myresume/editpersonalinfo/jobintention/jobintention" !== t || (g = "wx"), this.studentWeChatPage(t)), l = this.studentWeChatPage(n), void 0),
            m = (u = (Object(a.a)({
              success: function(e) {
                f = e
              }
            }), i.a.getStorageSync("currentCityInfo")), 0 < (n = i.a.getCurrentPages()).length ? n[n.length - 1].options : {}),
            h = (n = (m && "guidance" == m.from && (p = {
              id: 8200,
              name: "文章详情",
              pageUrl: "growUp/pages/home/informationdetail/informationdetail"
            }), ""), "");
          if ("{}" == JSON.stringify(m)) n = "";
          else {
            var y, v = [],
              b = ["echartsBag/pages/aiAssistant/aiAssistant", "videoBag/pages/preachMeeting/preachMeeting", "videoBag/pages/doubleSelectList/doubleSelectList", "videoBag/pages/posdetail/posdetail"];
            for (y in m) "__key_" != y && v.push(y + "=" + m[y]), "fromType" === y && b.includes(t) && (h = m[y]), "fromType" == y && "gzh" == m[y] && (h = "gzh"), "fromType" == y && "ida" == m[y] && (h = "ida");
            n = v.join("&")
          }
          "thirdBag/pages/privateSphere/privateSphere" !== t && "thirdBag/pages/privateSphereAccreditation/privateSphereAccreditation" !== t && "thirdBag/pages/privateSphereOfficialAccounts/privateSphereOfficialAccounts" !== t && "thirdBag/pages/privateSphereSchool/privateSphereSchool" !== t || m && m.groupId && (d = m.groupId, m.sphereCode) && (g = m.sphereCode), ((n = {
            fromType: h,
            urlParamsStr: n,
            app: "wx_student",
            appVersion: o.default.WxStudentVersion,
            userId: i.a.getStorageSync("userid") ? i.a.getStorageSync("userid") : "none",
            deviceToken: i.a.getStorageSync("openid") ? i.a.getStorageSync("openid") : "none",
            userName: i.a.getStorageSync("loginerName") ? i.a.getStorageSync("loginerName") : "none",
            country: u.country || "none",
            province: u.province || "none",
            city: u.city || "none",
            deviceModel: f && f.model ? f.model : "none",
            operatingSystem: f && f.system ? -1 < f.system.indexOf("iOS") ? "IOS" : "android" : "none",
            operatingSystemVersion: f && f.system && f.system.split(" ")[1] ? f.system.split(" ")[1] : "none",
            screenHeight: f && f.windowHeight ? f.windowHeight : "none",
            screenWidth: f && f.windowWidth ? f.windowWidth : "none",
            eventTime: parseInt((new Date).getTime() / 1e3),
            pageId: p && p.id ? p.id : "小程序启动onLaunch" === e ? 9999 : "none",
            pageName: p && p.name ? p.name : "none",
            pageUrl: p && p.pageUrl ? p.pageUrl : "none",
            preferName: l && l.name ? l.name : "none",
            preferId: l && l.id ? l.id : "none",
            preferPageUrl: l && l.pageUrl ? l.pageUrl : "none",
            stayTime: r || "none",
            eventType: e || "none",
            eventName: c || "none",
            clientIP: i.a.getStorageSync("clientIP") ? i.a.getStorageSync("clientIP") : "none",
            reportSrc: 2,
            login: i.a.getStorageSync("loginerName") ? 1 : 0,
            netType: i.a.getStorageSync("networkType") ? i.a.getStorageSync("networkType") : "none",
            itemID: d || "none",
            itemType: g || "其他"
          }).pageId && "none" != n.pageId || !n.pageUrl || "none" == n.pageUrl) && Object(s.b)(n)
        },
        taroClick: function(e) {
          var t, n, a, r;
          e && (t = e.funName) && (n = i.a.getCurrentPages()) && 0 < n.length && n[n.length - 1] && (a = n[n.length - 1].route, r = "", 1 < n.length && (r = n[n.length - 2].route), e.funType && e.funData ? this.commonDataStatistics("click", a, r, e.stayTime || "", t, e.funData, e.funType, e) : this.commonDataStatistics("click", a, r, e.stayTime || "", t, "", "", e))
        },
        taroBrowseAndRead: function(e, t) {
          var n, a, r, o, s;
          e && (n = i.a.getCurrentPages()) && 0 < n.length && (n = (n[n.length - 1] || {}).route) && (a = e.query, "", r = t, t = void 0, (o = i.a.getStorageSync("onshowInfo")).selfRoute && o.time && 0 < (s = (new Date).getTime()) - o.time && (t = parseInt((s - o.time) / 1e3), this.commonDataStatistics("read", o.selfRoute, o.preRoute, t, "", o.selfQuery, "")), s = "", "growUp/pages/sign/successfulCheck/successfulCheck" == n && (s = e.query.practiceType + "-" + e.query.process), "echartsBag/pages/uploadSuccess/uploadSuccess" == n && (s = e.query.successType), this.commonDataStatistics("browse", n, r, "", s, a, ""), t = {
            time: (new Date).getTime(),
            selfRoute: n,
            preRoute: r,
            selfQuery: a
          }, i.a.setStorageSync("onshowInfo", t))
        }
      }
    },
    22: function(e, t, n) {
      n.d(t, "b", (function() {
        return a
      })), n.d(t, "a", (function() {
        return r
      }));
      var a = function(e) {
          var t, n;
          return e ? (t = e.provinceId ? [{
            name: e.province,
            id: e.provinceId,
            isParent: !0
          }, {
            name: e.city,
            id: e.cityId
          }] : [], e.districtId && t.push({
            name: e.district,
            id: e.districtId
          }), n = e.fileList ? e.fileList.map((function(e) {
            return {
              fileName: e.fileName,
              filePath: e.filePath,
              id: e.id
            }
          })) : [], {
            locations: t,
            avatarUrl: e.fileList ? e.fileList.map((function(e) {
              return e.showPath
            })) : [],
            uploadUrl: n
          }) : {}
        },
        r = [{
          id: 0,
          name: "签订毕业生就业协议书",
          describe: "包括公务员、事业单位录取通知书等"
        }, {
          id: 1,
          name: "签订劳动合同，未签毕业生就业协议书",
          describe: ""
        }, {
          id: 2,
          name: "国家基层项目、地方基层项目 ",
          describe: "包括选调生、乡村医生、乡村教师、农机特岗、科研助理、村官、西部计划、三支一扶、苏北计划、博士后等"
        }, {
          id: 3,
          name: "自主创业",
          describe: ""
        }, {
          id: 4,
          name: "自由职业",
          describe: "如家教、作家、自由撰稿人、翻译工作者、中介服务工作者、某些艺术工作者、互联网营销工作者、公众号博主、电子竞技工作者等可报"
        }, {
          id: 5,
          name: "境内升学",
          describe: "考取了境内全日制研究生、第二学士学位填报，不包含非全日制形式再学习"
        }, {
          id: 6,
          name: "出国、出境深造",
          describe: "考取了境外研究生（含港澳台）的填报"
        }, {
          id: 7,
          name: "应征义务兵",
          describe: ""
        }, {
          id: 8,
          name: "暂未就业",
          describe: ""
        }]
    },
    229: function(e, t, n) {
      e.exports = n.p + "fourthBag/pages/practice/Inc/RegistrationReviewPrompt/RegistrationReviewPrompt.wxml"
    },
    24: function(e, t, n) {
      var a = n(44),
        r = n(0),
        i = n.n(r),
        o = n(14),
        s = n(13),
        c = Object.assign || function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n, a = arguments[t];
            for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n])
          }
          return e
        };
      t.a = function(e) {
        var t = a.a.fp(),
          n = i.a.getStorageSync("encryptValue") || "",
          r = (i.a.getStorageSync("openid"), i.a.getStorageSync("xcxCurrentEnvironment") || ""),
          u = Object(s.d)().join(",");
        return c({
          encryptValue: n,
          wechat: r ? 0 : 1,
          n: u,
          v: o.default.WxStudentVersion,
          Cookie: i.a.getStorageSync("Cookie"),
          "content-type": "multipart/form-data",
          devicecode: t
        }, e)
      }
    },
    25: function(e, t) {
      var n = new Date,
        a = n.getFullYear(),
        r = n.getMonth(),
        i = n.getDate(),
        o = new Date;
      e.exports = {
        dealChatTime: function(e, t) {
          return function(e, t) {
            o.setTime(e);
            e = o.getHours() + ":" + (10 <= o.getMinutes() ? o.getMinutes() : "0" + o.getMinutes());
            var n = o.getDate();
            if (o.getFullYear() === a && o.getMonth() === r) {
              if (n === i) return {
                ifShowTime: t,
                timeStr: e
              };
              if (n === i - 1) return {
                ifShowTime: t,
                timeStr: "昨天 " + e
              }
            }
            return {
              ifShowTime: t,
              timeStr: o.getFullYear() + "年" + (o.getMonth() + 1) + "月" + n + "日 " + e
            }
          }(e, function(e, t) {
            return 300 < Math.abs(e - t) / 1e3
          }(e, t))
        },
        isDatePassed: function(e) {
          (e + "").includes(".") && (e = e.split(".").join("/"));
          var t = (a = new Date).getFullYear(),
            n = a.getMonth(),
            a = a.getDate(),
            r = (e = new Date(e)).getFullYear(),
            i = e.getMonth();
          e = e.getDate();
          return t < r || !(r < t) && (n < i || !(i < n) && a <= e)
        },
        customFormatTime: function(e, t) {
          if (e = "string" == typeof e ? new Date(e) : e, isNaN(e)) throw new Error("Invalid date input");
          var n = {
            yyyy: e.getFullYear(),
            mm: (e.getMonth() + 1).toString().padStart(2, "0"),
            dd: e.getDate().toString().padStart(2, "0"),
            HH: e.getHours().toString().padStart(2, "0"),
            MM: e.getMinutes().toString().padStart(2, "0"),
            ss: e.getSeconds().toString().padStart(2, "0")
          };
          return t.replace(/yyyy|mm|dd|HH|MM|ss/g, (function(e) {
            return n[e]
          }))
        }
      }
    },
    26: function(t, n, a) {
      a.d(n, "i", (function() {
        return i
      })), a.d(n, "g", (function() {
        return o
      })), a.d(n, "h", (function() {
        return s
      })), a.d(n, "f", (function() {
        return c
      })), a.d(n, "d", (function() {
        return y
      })), a.d(n, "j", (function() {
        return v
      })), a.d(n, "a", (function() {
        return S
      })), a.d(n, "k", (function() {
        return x
      })), a.d(n, "c", (function() {
        return I
      })), a.d(n, "e", (function() {
        return T
      })), a.d(n, "b", (function() {
        return j
      }));
      var r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
          return e(t)
        } : function(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
        },
        i = [{
          id: "LIABILITY_INSURANCE",
          name: "学生实习责任保险"
        }, {
          id: "ACCIDENT_INSURANCE",
          name: "意外险"
        }, {
          id: "OTHER_INSURANCE",
          name: "其他保险"
        }],
        o = [{
          id: "ENTERPRISE",
          name: "企业"
        }, {
          id: "SCHOOL",
          name: "学校"
        }, {
          id: "OTHER",
          name: "其他"
        }],
        s = {
          LIABILITY_INSURANCE: "学生实习责任保险",
          ACCIDENT_INSURANCE: "意外险",
          OTHER_INSURANCE: "其他保险"
        },
        c = {
          ENTERPRISE: "企业",
          SCHOOL: "学校",
          OTHER: "其他"
        },
        u = "https://ss0.xybsyw.com",
        l = ["LIABILITY_INSURANCE", "ACCIDENT_INSURANCE", "OTHER_INSURANCE"],
        p = ["ENTERPRISE", "SCHOOL", "OTHER"],
        d = {
          "学生实习责任保险": "LIABILITY_INSURANCE",
          "意外险": "ACCIDENT_INSURANCE",
          "其他保险": "OTHER_INSURANCE"
        },
        g = {
          1: "LIABILITY_INSURANCE",
          2: "ACCIDENT_INSURANCE",
          9: "OTHER_INSURANCE"
        },
        f = {
          "企业": "ENTERPRISE",
          "学校": "SCHOOL",
          "其他": "OTHER"
        },
        m = {
          1: "SCHOOL",
          2: "ENTERPRISE",
          9: "OTHER"
        };

      function h(e, t) {
        return e && t ? e.replace(/\./g, "").localeCompare(t.replace(/\./g, "")) : 0
      }
      var y = function(e) {
          return {
            startTime: e.coverageStartTime || e.coverageTimeRange && e.coverageTimeRange[0] || "",
            endTime: e.coverageEndTime || e.coverageTimeRange && e.coverageTimeRange[1] || ""
          }
        },
        v = function(e, t, n) {
          return !t || !n || !(e = (e || []).filter((function(e) {
            var t = (e = y(e)).startTime;
            e = e.endTime;
            return t && e
          }))).length || e.some((function(e) {
            var a = (e = y(e)).startTime;
            e = e.endTime;
            return h(a, t) <= 0 && 0 <= h(e, n)
          }))
        },
        b = function(e, t, n, a, i) {
          var o = function e(t, n, a, i) {
            if (null != t && "" !== t) {
              if ("string" == typeof t) return n.includes(t) ? t : a[t] || "";
              if ("number" == typeof t) return i[t] || "";
              if ("object" === (void 0 === t ? "undefined" : r(t))) {
                if (null != t.id && "" !== t.id) {
                  var o = e(t.id, n, a, i);
                  if (o) return o
                }
                if ("string" == typeof t.name) {
                  if (n.includes(t.name)) return t.name;
                  if (a[t.name]) return a[t.name]
                }
                if (null != t.code && i[t.code]) return i[t.code]
              }
            }
            return ""
          }(e, n, a, i);
          e = t.find((function(e) {
            return e.id === o
          }));
          return {
            id: o || null,
            name: e ? e.name : ""
          }
        },
        S = function() {
          return {
            id: "",
            insuranceType: {
              id: null,
              name: ""
            },
            insuranceName: "",
            policyNumber: "",
            insuranceFinancingType: {
              id: null,
              name: ""
            },
            insuranceFinancing: "",
            buyInsuranceTime: "",
            coverageTimeRange: ["", ""],
            insuranceCertificates: []
          }
        },
        w = function(e) {
          var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : u;
          if (!e) return [];
          var n = [];
          if (Array.isArray(e)) n = e;
          else {
            if ("string" != typeof e) return [];
            try {
              var a = JSON.parse(e);
              n = Array.isArray(a) ? a : e.split(",").filter(Boolean)
            } catch (a) {
              n = e.split(",").filter(Boolean)
            }
          }
          return n.map((function(e) {
            var n;
            return "string" == typeof e ? {
              previewUrl: (n = e).startsWith("http") ? n : t + "/" + n.replace(/^\//, ""),
              filePath: n
            } : (n = e && e.filePath || "", {
              previewUrl: e && e.previewUrl || (n ? n.startsWith("http") ? n : t + "/" + n.replace(/^\//, "") : ""),
              filePath: n
            })
          })).filter((function(e) {
            return e.filePath || e.previewUrl
          }))
        },
        U = function(e, t, n) {
          var a = e.coverageStartTime || "",
            r = e.coverageEndTime || "",
            i = w(e.insuranceCertificates);
          return {
            id: e.id || "",
            insuranceType: b(e.insuranceType, t, l, d, g),
            insuranceName: e.insuranceName || "",
            policyNumber: e.policyNumber || "",
            insuranceFinancingType: b(e.insuranceFinancingType, n, p, f, m),
            insuranceFinancing: e.insuranceFinancing || "",
            buyInsuranceTime: e.buyInsuranceTime || "",
            coverageStartTime: a,
            coverageEndTime: r,
            coverageTimeRange: [a, r],
            insuranceCertificates: i
          }
        },
        B = function(e) {
          if (Array.isArray(e.insuranceList)) return e.insuranceList;
          if ("string" == typeof e.insuranceList && e.insuranceList) try {
            var t = JSON.parse(e.insuranceList);
            if (Array.isArray(t)) return t
          } catch (e) {}
          return e.insuranceName || e.policyNumber || e.insuranceType || e.insuranceFinancing || e.buyInsuranceTime || e.insuranceCertificates && (!Array.isArray(e.insuranceCertificates) || e.insuranceCertificates.length) || e.coverageStartTime || e.coverageEndTime ? [{
            id: e.id || "",
            insuranceType: e.insuranceType,
            insuranceName: e.insuranceName,
            policyNumber: e.policyNumber,
            insuranceFinancingType: e.insuranceFinancingType,
            insuranceFinancing: e.insuranceFinancing,
            buyInsuranceTime: e.buyInsuranceTime,
            insuranceCertificates: e.insuranceCertificates,
            coverageStartTime: e.coverageStartTime,
            coverageEndTime: e.coverageEndTime
          }] : []
        },
        x = function(e) {
          var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : i,
            n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : o;
          return (e = B(e)).length ? e.map((function(e) {
            return U(e, t, n)
          })) : [S()]
        },
        I = function(e) {
          return (e || []).map((function(e) {
            return {
              id: e.id || "",
              insuranceName: e.insuranceName || "",
              policyNumber: e.policyNumber || "",
              insuranceFinancing: e.insuranceFinancing || "",
              insuranceType: e.insuranceType && e.insuranceType.id ? e.insuranceType.id : "",
              insuranceFinancingType: e.insuranceFinancingType && e.insuranceFinancingType.id ? e.insuranceFinancingType.id : "",
              buyInsuranceTime: e.buyInsuranceTime || "",
              coverageStartTime: e.coverageTimeRange && e.coverageTimeRange[0] ? e.coverageTimeRange[0] : "",
              coverageEndTime: e.coverageTimeRange && e.coverageTimeRange[1] ? e.coverageTimeRange[1] : "",
              insuranceCertificates: (e.insuranceCertificates || []).map((function(e) {
                return "string" == typeof e ? {
                  previewUrl: e.startsWith("http") ? e : u + "/" + e.replace(/^\//, ""),
                  filePath: e
                } : {
                  previewUrl: e.previewUrl || "",
                  filePath: e.filePath || ""
                }
              })).filter((function(e) {
                return e.filePath || e.previewUrl
              }))
            }
          }))
        },
        A = function(e) {
          var t = e.insuranceType && e.insuranceType.id ? e.insuranceType.id : e.insuranceType || "",
            n = e.insuranceFinancingType && e.insuranceFinancingType.id ? e.insuranceFinancingType.id : e.insuranceFinancingType || "",
            a = e.coverageStartTime || e.coverageTimeRange && e.coverageTimeRange[0] || "",
            r = e.coverageEndTime || e.coverageTimeRange && e.coverageTimeRange[1] || "",
            i = w(e.insuranceCertificates || e.insuranceCertificateList, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : u);
          return {
            id: e.id || "",
            insuranceType: t,
            insuranceName: e.insuranceName || "",
            policyNumber: e.policyNumber || "",
            insuranceFinancingType: n,
            insuranceFinancing: e.insuranceFinancing || "",
            buyInsuranceTime: e.buyInsuranceTime || "",
            coverageStartTime: a,
            coverageEndTime: r,
            insuranceCertificates: i,
            certificatePaths: i.map((function(e) {
              return e.previewUrl || e.filePath
            })).filter(Boolean)
          }
        },
        T = function(e) {
          var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : u;
          return e && e.buyInsurance ? B(e).map((function(e) {
            return A(e, t)
          })) : []
        },
        j = function(e, t) {
          return e && t ? e + " - " + t : e || t || "-"
        }
    },
    27: function(e, t, n) {
      n.d(t, "a", (function() {
        return c
      }));
      var a = n(0),
        r = n.n(a),
        i = n(1),
        o = function(e, t) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return function(e, t) {
            var n = [],
              a = !0,
              r = !1,
              i = void 0;
            try {
              for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); a = !0);
            } catch (e) {
              r = !0, i = e
            } finally {
              try {
                !a && s.return && s.return()
              } finally {
                if (r) throw i
              }
            }
            return n
          }(e, t);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        },
        s = ["大一", "大二", "大三", "大四"];

      function c() {
        var e = 0 < arguments.length && void 0 !== arguments[0] && arguments[0],
          t = arguments[1],
          n = r.a.getStorageSync("creditSetting") || {
            scoreNoun: "学分",
            courseNoun: "课程",
            xf: "学分",
            kc: "课程",
            kcmk: "课程模块"
          },
          c = (n = Object(a.useState)(n), (n = o(n, 2))[0]),
          u = n[1],
          l = function() {
            i.a.xyb_request("credit/SchoolSetting.action", "POST", {}, !1, !1).then((function(e) {
              "200" === e.code && (e = Object.assign(e.data, {
                yearIndex: e.data.yearIndex && e.data.needSchoolYearMinimumCredit ? e.data.yearIndex || 1 : "",
                yearName: e.data.yearIndex ? s[e.data.yearIndex - 1] : "",
                xf: 0 === e.data.scoreType ? "学分" : "积分",
                kc: "CATEGORY" === e.data.namingMethod ? "类别" : "课程",
                kcmk: "CATEGORY" === e.data.namingMethod ? "学分类别" : "课程模块"
              }), u(e), r.a.setStorageSync("creditSetting", e), t) && t(e)
            }))
          };
        return Object(a.useEffect)((function() {
          !e && Object.keys(c).length ? t && t(c) : l()
        }), []), {
          creditSetting: c
        }
      }
    },
    2792: function(e, t, n) {
      n(951)
    },
    28: function(e, t, n) {
      n.d(t, "a", (function() {
        return i
      })), n.d(t, "b", (function() {
        return o
      }));
      t = n(0);
      var a = n.n(t),
        r = n(1);

      function i() {
        var e, t, n, i = arguments[1],
          o = {
            tRTJnjjYwiXA6W_qTb4l7T4RKLbCf2l6XuvzsM_Lu9A: 1,
            "Eyel4qTaC0NcFyNdpUwtEeV7_-ZcsYibXAx0l4LVbaY": 2,
            "cBBW5JL4wgDyVrF-l-R3wrR-v7Yzr0UQ6Ht0mq9rZPc": 3,
            "1bZvyCb5yhQIVK1QmwOvhGp-9RgiS1Uc1q2owbvLCTI": 4,
            "qUDW9x5ky-Mkikw2eWfcHM7lmdnQYUbNPp5VgGVrDJQ": 5,
            "7q2ISuBaTQWzj3gbbVHKDwSHbN9Df047wnw177j1xTI": 6,
            OmF3XlriTNRknnE_6ogOcPjVSzpK1gs5apNNjUszepU: 7
          };
        (n = (n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : []).filter((function(e) {
          return "accept" === i[e]
        })).map((function(e) {
          return o[e]
        })).filter(Boolean)).length && (e = a.a.getStorageSync("openid") || null, t = a.a.getStorageSync("unionid"), r.a.xyb_request("wx/subscribe/WxSubscribeMessage.action", "POST", {
          templateIds: n.join(","),
          openId: e,
          unionId: t
        }))
      }

      function o(e) {
        e && e.recordId && r.a.xyb_request("common/Common!recordTemplateEvent.action", "POST", {
          recordId: e.recordId
        })
      }
    },
    30: function(e, t, n) {
      n.d(t, "a", (function() {
        return c
      })), n.d(t, "d", (function() {
        return u
      })), n.d(t, "e", (function() {
        return p
      })), n.d(t, "b", (function() {
        return d
      })), n.d(t, "g", (function() {
        return g
      })), n.d(t, "c", (function() {
        return f
      })), n.d(t, "f", (function() {
        return m
      }));
      t = n(0);
      var a = n.n(t),
        r = n(1),
        i = n(25),
        o = n(33),
        s = n(15),
        c = ["preReport", "safetyAgreement", "informedConsent", "tripartiteAgreement"];

      function u(e, t, n) {
        return new Promise((function(a) {
          r.a.xyb_request("student/achievement/checkBeforeSubmitScore.action", "POST", {
            compatibleApplet: !0,
            projectRuleId: e.projectRuleId,
            planId: e.planId
          }, !0, !1).then((function(e) {
            var r, i, s = e.data.study;
            s ? (e = e.data.permission, r = "", i = !1, Object(o.b)(e, 2147483648) ? (r = t.tm_aqzls || "安全责任书", i = !0) : Object(o.b)(e, 1048576) ? (r = t.sfxy || "三方协议", i = !0) : Object(o.b)(e, 2097152) && (r = n.zqtys || "监护人知情同意书", i = !0), a({
              needSafetyEducation: !1,
              materialPermission: i ? e : 0,
              permissionText: r,
              study: s
            })) : a({
              needSafetyEducation: !0,
              materialPermission: 0,
              permissionText: "",
              study: s
            })
          }))
        }))
      }
      var l = new Map;

      function p(e, t, n) {
        var a = e + "-" + t + "-" + (n || "");
        return l.has(a) ? l.get(a) : (e = {
          projectId: e,
          projectDateId: t
        }, n && (e.oldProjectDateId = n), t = r.a.xyb_request("student/practiceplan/checkSignUpBefore.action", "POST", e, !0, !1).then((function(e) {
          var t = e.data || {};
          return 0 === (e = c.filter((function(e) {
            return Object.prototype.hasOwnProperty.call(t, e)
          }))).length ? {
            passed: !0,
            data: t
          } : {
            passed: e.every((function(e) {
              return !0 === t[e]
            })),
            data: t
          }
        })).finally((function() {
          l.delete(a)
        })), l.set(a, t), t)
      }

      function d(e) {
        var t = e.projectRuleId,
          n = void 0 === (n = e.consentRemark) ? "" : n,
          a = e.projectId,
          r = e.tmplId;
        t = "/echartsBag/pages/informedConsent/commitInformedConsent/commitInformedConsent?projectRuleId=" + t;
        return n && (t += "&consentRemark=" + n), a && (t += "&projectId=" + a), r && (t += "&tmplId=" + r), (e = e.studentId) && (t += "&studentId=" + e), t
      }

      function g(e, t, n, a, r) {
        s.a.confirm({
          title: " ",
          message: '当前"' + e + '"材料未提交，无法提交"' + t + '"',
          confirmButtonText: "去提交",
          cancelButtonText: "取消",
          customStyle: "color:#4990E2;font-size:32rpx"
        }).then((function() {
          e === n.tm_aqzls ? r.onToSafeBook() : e === n.sfxy ? r.onGoAgreement(1) : e === (a.zqtys || "监护人知情同意书") && r.onGoInformedConsent(1)
        })).catch((function() {}))
      }

      function f(e) {
        return !(!e.deadline || Object(i.isDatePassed)(e.deadline) || (wx.showModal({
          content: "当前已超出成绩截止时间，不支持提交或重新修改",
          showCancel: !1,
          confirmColor: "#3894C6",
          confirmText: "我知道了"
        }), 0))
      }

      function m(e, t, n) {
        var r = (new Date).getFullYear(),
          i = (new Date).getMonth() + 1,
          o = (new Date).getDate();
        r = r + "/" + (i < 10 ? "0" + i : i) + "/" + (o < 10 ? "0" + o : o);
        return new Date(r) < new Date(e.replace(/\./g, "/")) ? (a.a.showToast({
          icon: "none",
          title: "还没到提交开始时间哦~"
        }), !1) : !(new Date(r) > new Date(t.replace(/\./g, "/")) && !n && (a.a.showToast({
          icon: "none",
          title: "已超过提交结束时间!"
        }), 1))
      }
    },
    31: function(e, t, n) {
      n.d(t, "a", (function() {
        return r
      }));
      var a = n(0);

      function r(e) {
        var t = Object(a.useRef)(e),
          n = (e = function(e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return function(e, t) {
              var n = [],
                a = !0,
                r = !1,
                i = void 0;
              try {
                for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); a = !0);
              } catch (e) {
                r = !0, i = e
              } finally {
                try {
                  !a && s.return && s.return()
                } finally {
                  if (r) throw i
                }
              }
              return n
            }(e, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
          }(e = Object(a.useState)(e), 2))[0],
          r = e[1],
          i = Object(a.useRef)(!0);
        e = function(e) {
          e = "function" == typeof e ? e(t.current) : e, t.current = e, i.current && r(e)
        };
        return Object(a.useEffect)((function() {
          return i.current = !0,
            function() {
              i.current = !1
            }
        }), []), [n, e, new Proxy(t, {
          set: function(e, t, n) {
            return "current" !== t && Reflect.set(e, t, n)
          }
        })]
      }
    },
    32: function(e, t, n) {
      var a = {
        colorToFix: function(e) {
          return "已参与" == e ? "#A8A9B3" : "老师审核中" == e || "审核中" == e ? "#FF8803" : "#FB9018"
        },
        applyStatus: function(e) {
          return 0 == e || 4 == e ? "去报名" : 1 == e ? "修改岗位信息" : 2 == e ? "重新报名" : 5 == e ? "免实习" : ""
        },
        showBtn: function(e, t) {
          return 0 == t ? "老师审核中" == e || "审核中" == e || "已参与" == e ? "修改报名信息" : "老师审核未通过" == e || "审核未通过" == e ? "重新报名" : "立即报名" : "老师审核未通过" == e || "审核未通过" == e || "实习中断" == e ? "重新报名" : "立即报名"
        },
        approvalStatus: function(e) {
          return 0 == e ? "提交待批阅" : 1 == e ? "批阅通过" : 2 == e ? "无需批阅" : "退回修改"
        },
        subString: function(e, t, n) {
          return (e += "").slice(t, n)
        },
        readStatus: function(e) {
          return 0 == e ? "待批阅" : 1 == e ? "批阅通过" : 2 == e ? "无需批阅" : "批阅不通过"
        },
        compareNowDate: function(e) {
          var t = (t = getDate()).getFullYear() + "." + (t.getMonth() + 1) + "." + t.getDay();
          return getDate(e) < getDate(t)
        },
        decodeURIComponent: function(e) {
          function t(t) {
            return e.apply(this, arguments)
          }
          return t.toString = function() {
            return e.toString()
          }, t
        }((function(e) {
          return decodeURIComponent(e)
        })),
        journalType: function(e) {
          return 0 == e ? "日" : 1 == e ? "周" : "月"
        }
      };
      t.a = {
        colorToFix: a.colorToFix,
        applyStatus: a.applyStatus,
        showBtn: a.showBtn,
        approvalStatus: a.approvalStatus,
        subString: a.subString,
        readStatus: a.readStatus,
        compareNowDate: a.compareNowDate,
        decodeURIComponent: a.decodeURIComponent,
        journalType: a.journalType
      }
    },
    33: function(e, t, n) {
      n.d(t, "b", (function() {
        return o
      })), n.d(t, "a", (function() {
        return r
      })), n.d(t, "c", (function() {
        return c
      })), n(0);
      var a, r = function(e, t, n) {
          var a = void 0;
          return function() {
            var r, i = this,
              o = arguments;
            a && clearTimeout(a), n ? (r = !a, a = setTimeout((function() {
              a = null
            }), t), r && e.apply(i, o)) : a = setTimeout((function() {
              e.apply(i, o)
            }), t)
          }
        },
        i = {
          chinese: /[\u4e00-\u9fa5]/gm,
          english: /^[a-z]+$/i,
          capitalized: /^[A-Z]+$/,
          number: /^\d+$/,
          email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
          postCode: /^[0-9]\d{5}(?!\d)$/,
          alphaNumeric: /^[A-Za-z0-9]+$/,
          ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
          ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
          call: /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,6})?$/i,
          telephone: /^(0|86|17951)?(13[0-9]|15[012356789]|16[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/,
          idCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
          url: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
          date: /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/
        };
      for (a in i) i.hasOwnProperty(a);
      var o = function(e, t) {
        for (var n = s(t), a = s(e), r = 0, i = 1, o = 0; o < n.length; o++) r += (n[o] & a[o]) * i, i *= 65536;
        return r
      };

      function s(e) {
        var t = [];
        if (/\d+/.test(e)) {
          for (; 0 != e;) t[t.length] = Math.abs(e % 65536), e = parseInt(e / 65536);
          return 0 == t.length ? [0] : t
        }
        return [0]
      }

      function c(e) {
        for (var t = 5381, n = 0; n < e.length; n++) t = 33 * t + e.charCodeAt(n) >>> 0;
        return t
      }
    },
    34: function(e, t, n) {
      var a = n(0),
        r = n.n(a);
      t.a = function(e, t, n) {
        var a = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "all",
          i = t && Array.isArray(t) ? t : ["doc", "docx", "ppt", "pptx", "xls", "xlsx", "zip", "rar", "raw", "bmp", "tiff", "tif", "gif", "psd", "ai", "cdr", "dwg", "mp3", "mpg", "mp4", "mov", "pdf", "png", "jpg"],
          o = n || 20971520;
        return {
          chooseFile: function() {
            r.a.chooseMessageFile({
              count: 1,
              file: a,
              extension: i,
              success: function(t) {
                var n = (t = t.tempFiles[0]).name.substring(t.name.lastIndexOf(".") + 1);
                i.includes(n) && t.size < o ? e(t, n) : r.a.showToast({
                  title: "请选择符合类型与大小的文件",
                  icon: "none"
                })
              },
              fail: function(e) {}
            }).then((function(e) {}))
          }
        }
      }
    },
    35: function(e, t) {
      var n = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
      e.exports = {
        debug: function() {
          n && n.debug.apply(n, arguments)
        },
        info: function() {
          n && n.info.apply(n, arguments)
        },
        warn: function() {
          n && n.warn.apply(n, arguments)
        },
        error: function() {
          n && n.error.apply(n, arguments)
        },
        setFilterMsg: function(e) {
          n && n.setFilterMsg && "string" == typeof e && n.setFilterMsg(e)
        },
        addFilterMsg: function(e) {
          n && n.addFilterMsg && "string" == typeof e && n.addFilterMsg(e)
        }
      }
    },
    36: function(e, t, n) {
      function a(e, t) {
        var n = (65535 & e) + (65535 & t);
        return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
      }

      function r(e, t, n, r, i, o) {
        return a(function(e, t) {
          return e << t | e >>> 32 - t
        }(a(a(t, e), a(r, o)), i), n)
      }

      function i(e, t, n, a, i, o, s) {
        return r(t & n | ~t & a, e, t, i, o, s)
      }

      function o(e, t, n, a, i, o, s) {
        return r(t & a | n & ~a, e, t, i, o, s)
      }

      function s(e, t, n, a, i, o, s) {
        return r(t ^ n ^ a, e, t, i, o, s)
      }

      function c(e, t, n, a, i, o, s) {
        return r(n ^ (t | ~a), e, t, i, o, s)
      }
      t.a = {
        hexMD5: function(e) {
          return function(e) {
            for (var t = "0123456789abcdef", n = "", a = 0; a < 4 * e.length; a++) n += t.charAt(e[a >> 2] >> a % 4 * 8 + 4 & 15) + t.charAt(e[a >> 2] >> a % 4 * 8 & 15);
            return n
          }(function(e) {
            for (var t = 1732584193, n = -271733879, r = -1732584194, u = 271733878, l = 0; l < e.length; l += 16) {
              var p = t,
                d = n,
                g = r,
                f = u;
              t = i(t, n, r, u, e[l + 0], 7, -680876936), u = i(u, t, n, r, e[l + 1], 12, -389564586), r = i(r, u, t, n, e[l + 2], 17, 606105819), n = i(n, r, u, t, e[l + 3], 22, -1044525330);
              t = i(t, n, r, u, e[l + 4], 7, -176418897), u = i(u, t, n, r, e[l + 5], 12, 1200080426), r = i(r, u, t, n, e[l + 6], 17, -1473231341), n = i(n, r, u, t, e[l + 7], 22, -45705983), t = i(t, n, r, u, e[l + 8], 7, 1770035416), u = i(u, t, n, r, e[l + 9], 12, -1958414417), r = i(r, u, t, n, e[l + 10], 17, -42063), n = i(n, r, u, t, e[l + 11], 22, -1990404162), t = i(t, n, r, u, e[l + 12], 7, 1804603682), u = i(u, t, n, r, e[l + 13], 12, -40341101), r = i(r, u, t, n, e[l + 14], 17, -1502002290), t = o(t, n = i(n, r, u, t, e[l + 15], 22, 1236535329), r, u, e[l + 1], 5, -165796510), u = o(u, t, n, r, e[l + 6], 9, -1069501632), r = o(r, u, t, n, e[l + 11], 14, 643717713), n = o(n, r, u, t, e[l + 0], 20, -373897302), t = o(t, n, r, u, e[l + 5], 5, -701558691), u = o(u, t, n, r, e[l + 10], 9, 38016083), r = o(r, u, t, n, e[l + 15], 14, -660478335), n = o(n, r, u, t, e[l + 4], 20, -405537848), t = o(t, n, r, u, e[l + 9], 5, 568446438), u = o(u, t, n, r, e[l + 14], 9, -1019803690), r = o(r, u, t, n, e[l + 3], 14, -187363961), n = o(n, r, u, t, e[l + 8], 20, 1163531501), t = o(t, n, r, u, e[l + 13], 5, -1444681467), u = o(u, t, n, r, e[l + 2], 9, -51403784), r = o(r, u, t, n, e[l + 7], 14, 1735328473), t = s(t, n = o(n, r, u, t, e[l + 12], 20, -1926607734), r, u, e[l + 5], 4, -378558), u = s(u, t, n, r, e[l + 8], 11, -2022574463), r = s(r, u, t, n, e[l + 11], 16, 1839030562), n = s(n, r, u, t, e[l + 14], 23, -35309556), t = s(t, n, r, u, e[l + 1], 4, -1530992060), u = s(u, t, n, r, e[l + 4], 11, 1272893353), r = s(r, u, t, n, e[l + 7], 16, -155497632), n = s(n, r, u, t, e[l + 10], 23, -1094730640), t = s(t, n, r, u, e[l + 13], 4, 681279174), u = s(u, t, n, r, e[l + 0], 11, -358537222), r = s(r, u, t, n, e[l + 3], 16, -722521979), n = s(n, r, u, t, e[l + 6], 23, 76029189), t = s(t, n, r, u, e[l + 9], 4, -640364487), u = s(u, t, n, r, e[l + 12], 11, -421815835), r = s(r, u, t, n, e[l + 15], 16, 530742520), t = c(t, n = s(n, r, u, t, e[l + 2], 23, -995338651), r, u, e[l + 0], 6, -198630844), u = c(u, t, n, r, e[l + 7], 10, 1126891415), r = c(r, u, t, n, e[l + 14], 15, -1416354905), n = c(n, r, u, t, e[l + 5], 21, -57434055), t = c(t, n, r, u, e[l + 12], 6, 1700485571), u = c(u, t, n, r, e[l + 3], 10, -1894986606), r = c(r, u, t, n, e[l + 10], 15, -1051523), n = c(n, r, u, t, e[l + 1], 21, -2054922799), t = c(t, n, r, u, e[l + 8], 6, 1873313359), u = c(u, t, n, r, e[l + 15], 10, -30611744), r = c(r, u, t, n, e[l + 6], 15, -1560198380), n = c(n, r, u, t, e[l + 13], 21, 1309151649), t = c(t, n, r, u, e[l + 4], 6, -145523070), u = c(u, t, n, r, e[l + 11], 10, -1120210379), r = c(r, u, t, n, e[l + 2], 15, 718787259), n = c(n, r, u, t, e[l + 9], 21, -343485551), t = a(t, p), n = a(n, d), r = a(r, g), u = a(u, f)
            }
            return [t, n, r, u]
          }(function(e) {
            for (var t = 1 + (e.length + 8 >> 6), n = new Array(16 * t), a = 0; a < 16 * t; a++) n[a] = 0;
            for (a = 0; a < e.length; a++) n[a >> 2] |= (255 & e.charCodeAt(a)) << a % 4 * 8;
            return n[a >> 2] |= 128 << a % 4 * 8, n[16 * t - 2] = 8 * e.length, n
          }(e)))
        }
      }
    },
    37: function(e, t, n) {
      var a, r = n(3),
        i = n.n(r),
        o = n(1009);

      function s(e, t) {
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
      }

      function c() {
        ! function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, c)
      }! function(e, t, n) {
        t && s(e.prototype, t)
      }(c, [{
        key: "get",
        value: function() {
          return this.request(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, "GET")
        }
      }, {
        key: "post",
        value: function() {
          return this.request(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, "POST")
        }
      }, {
        key: "request",
        value: (a = function(e) {
          return function() {
            var t = e.apply(this, arguments);
            return new Promise((function(e, n) {
              return function a(r, i) {
                try {
                  var o = t[r](i),
                    s = o.value
                } catch (r) {
                  return void n(r)
                }
                if (!o.done) return Promise.resolve(s).then((function(e) {
                  a("next", e)
                }), (function(e) {
                  a("throw", e)
                }));
                e(s)
              }("next")
            }))
          }
        }(i.a.mark((function e(t) {
          var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
            a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "GET";
          return i.a.wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return n.uuid = this.getUUID(), e.abrupt("return", new Promise((function(e, r) {
                  wx.request({
                    url: o.apiUrl + t,
                    method: a,
                    data: n,
                    header: {
                      "content-type": "application/json"
                    },
                    success: function(t) {
                      e(t.data)
                    },
                    fail: function(e) {
                      r(e)
                    }
                  })
                })));
              case 2:
              case "end":
                return e.stop()
            }
          }), e, this)
        }))), function(e) {
          return a.apply(this, arguments)
        })
      }, {
        key: "getUUID",
        value: function() {
          var e = this,
            t = wx.getStorageSync("coupon_uuid");
          return t && 36 === t.length || (t = "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (function(t) {
            return (t ^ e.unit8() & 15 >> t / 4).toString(16)
          })), wx.setStorageSync("coupon_uuid", t)), t
        }
      }, {
        key: "unit8",
        value: function() {
          return "undefined" != typeof crypto && crypto.getRandomValues ? crypto.getRandomValues(new Uint8Array(1))[0] : Math.floor(255 * Math.random())
        }
      }]);
      var u = new c,
        l = (n.d(t, "c", (function() {
          return l
        })), n.d(t, "d", (function() {
          return p
        })), n.d(t, "e", (function() {
          return d
        })), n.d(t, "a", (function() {
          return g
        })), n.d(t, "b", (function() {
          return f
        })), function(e) {
          return u.get("open/v3/ad/wxpay-flow-page/detail", e)
        }),
        p = function(e, t) {
          return u.get("open/ad/wxpay-flow-page/record", {
            page_id: e,
            d_type: t
          })
        },
        d = function(e, t, n, a, r) {
          return u.post("open/ad/wxpay-flow-coupon/record", {
            page_id: r,
            c_type: e,
            errcode: t,
            msg: n,
            send_coupon_result: a
          })
        },
        g = function(e, t, n, a) {
          return u.post("open/ad/wxpay-flow-content/record", {
            page_id: e,
            list_idx: n,
            m_type: t,
            appid: a
          })
        },
        f = function(e, t, n, a) {
          return u.post("open/ad/wxpay-flow-frame/record", {
            page_id: e,
            list_idx: n,
            m_type: t,
            appid: a
          })
        }
    },
    38: function(t, n, a) {
      a.r(n), a(2792);
      var r = a(0),
        i = a.n(r),
        o = function(e, t, n) {
          return t && s(e.prototype, t), n && s(e, n), e
        };

      function s(e, t) {
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
      }
      var c;

      function u(t, n) {
        if (t) return !n || "object" != e(n) && "function" != typeof n ? t : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var l = Object(r.createContext)({
          talentsInfo: {},
          jobHuntInfo: {},
          refresh: function() {
            return Promise.resolve()
          },
          handleConfirm: function() {}
        }),
        p = (function(t, n) {
          if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + e(n));
          t.prototype = Object.create(n && n.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(t, n) : t.__proto__ = n)
        }(d, i.a.Component), o(d, [{
          key: "_constructor",
          value: function(e) {
            (function e(t, n, a) {
              null === t && (t = Function.prototype);
              var r = Object.getOwnPropertyDescriptor(t, n);
              return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(a) : void 0 : null !== (r = Object.getPrototypeOf(t)) ? e(r, n, a) : void 0
            })(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "_constructor", this).call(this, e), this.$$refs = new i.a.RefsArray
          }
        }, {
          key: "_createData",
          value: function() {
            this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
            var e = this.__props,
              t = e.talentsInfo,
              n = e.jobHuntInfo,
              a = e.refresh,
              r = e.handleConfirm;
            return e.children, l.Provider({
              talentsInfo: t,
              jobHuntInfo: n,
              refresh: a,
              handleConfirm: r
            }), Object.assign(this.__state, {}), this.__state
          }
        }]), c = o = d, o.$$events = [], o.$$componentPath = "tenthBag/pages/aiSalaryEvaluation/Inc/SalaryContext", c);

      function d() {
        var e, t;
        ! function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, d);
        for (var n = arguments.length, a = Array(n), r = 0; r < n; r++) a[r] = arguments[r];
        return (e = t = u(this, (t = d.__proto__ || Object.getPrototypeOf(d)).call.apply(t, [this].concat(a)))).$usedState = [], t.customComponents = [], u(t, e)
      }

      function g() {
        return Object(r.useContext)(l)
      }
      Component(a(0).default.createComponent(p)), a.d(n, "SalaryContext", (function() {
        return l
      })), a.d(n, "SalaryProvider", (function() {
        return p
      })), a.d(n, "useSalaryContext", (function() {
        return g
      }))
    },
    39: function(e, t, n) {
      t.a = {
        tooltipsList: [],
        registerTooltips: function(e) {
          this.tooltipsList.push(e)
        },
        hideAllTooltips: function() {
          var e = !0,
            t = !1,
            n = void 0;
          try {
            for (var a, r = this.tooltipsList[Symbol.iterator](); !(e = (a = r.next()).done); e = !0) a.value.hideTooltips()
          } catch (e) {
            t = !0, n = e
          } finally {
            try {
              !e && r.return && r.return()
            } finally {
              if (t) throw n
            }
          }
        }
      }
    },
    396: function(e, t, n) {},
    41: function(e, t, n) {
      var a = n(1),
        r = n(14),
        i = n(0),
        o = n.n(i);
      t.a = {
        getRegeo: function(e) {
          var t = e.location,
            n = function(t) {
              t = ["location=" + encodeURIComponent(t.location), "key=" + encodeURIComponent(r.default.tencentMapStaticKey), "get_poi=1"].join("&"), o.a.request({
                url: "https://apis.map.qq.com/ws/geocoder/v1/?" + t,
                method: "GET",
                success: function(t) {
                  var n, a, r = t.data || {};
                  200 !== t.statusCode || 0 !== r.status ? (a = r.message || "逆地理编码失败", o.a.showToast({
                    title: a,
                    icon: "none"
                  }), e.fail && e.fail({
                    errCode: null != r.status ? r.status : t.statusCode,
                    errMsg: a
                  })) : (a = (t = r.result).address_component || {}, r = t.ad_info || {}, a = {
                    formatted_address: (n = t.formatted_addresses || {}).recommend || n.rough || t.address || n.standard_address,
                    addressComponent: {
                      province: a.province || "",
                      city: a.city || a.province || "",
                      district: a.district || "",
                      street: a.street || "",
                      streetNumber: a.street_number || "",
                      adcode: r.adcode || ""
                    }
                  }, r = [{
                    iconPath: e.iconPath,
                    width: e.iconWidth,
                    height: e.iconHeight,
                    name: n ? n.recommend : t.address,
                    desc: t.pois && t.pois[0] ? t.pois[0].title + "附近" : "",
                    longitude: t.location.lng,
                    latitude: t.location.lat,
                    id: 0,
                    regeocodeData: a,
                    address: t.address,
                    pois: t.pois || []
                  }], e.success && e.success(r))
                },
                fail: function(t) {
                  e.fail && e.fail({
                    errCode: null != t.errno ? t.errno : -1,
                    errMsg: t.errMsg || "网络请求失败"
                  })
                }
              })
            };
          t ? n({
            location: t
          }) : wx.getLocation({
            type: "gcj02",
            success: function(e) {
              e = {
                location: e.latitude + "," + e.longitude
              }, n(e)
            },
            fail: function(t) {
              e.fail && e.fail({
                errCode: -1,
                errMsg: t.errMsg || "获取定位失败"
              })
            }
          })
        },
        getInputtips: function(e) {
          var t = {
            keywords: e.keywords,
            city: e.city || ""
          };
          a.a.xyb_request("common/gaodeInputTips.action", "POST", t).then((function(t) {
            t = (t.data || []).map((function(e) {
              return {
                id: e.id,
                name: e.title,
                address: e.address || "",
                location: e.location ? e.location.lng + "," + e.location.lat : "",
                adcode: e.adcode,
                city: e.city,
                district: e.district,
                type: e.type
              }
            })), e.success && e.success({
              tips: t
            })
          }), (function(t) {
            e.fail && e.fail({
              errCode: t.status,
              errMsg: t.message
            })
          }))
        },
        getWxLocation: function(e, t) {
          wx.getLocation({
            type: "gcj02",
            success: function(e) {
              e = e.longitude + "," + e.latitude, wx.setStorage({
                key: "userLocation",
                data: e
              }), t && t(e)
            },
            fail: function(n) {
              wx.getStorage({
                key: "userLocation",
                success: function(e) {
                  e.data && t && t(e.data)
                }
              }), e.fail && e.fail({
                errCode: "0",
                errMsg: n.errMsg || ""
              })
            }
          })
        }
      }
    },
    42: function(t, n, a) {
      a.d(n, "b", (function() {
        return o
      })), a.d(n, "a", (function() {
        return i
      })), a.d(n, "c", (function() {
        return s
      }));
      var r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      };

      function i(e) {
        return null != e
      }

      function o(e) {
        var t = void 0 === e ? "undefined" : r(e);
        return null !== e && ("object" === t || "function" === t)
      }

      function s(e, t, n) {
        return Math.min(Math.max(e, t), n)
      }
    },
    44: function(t, n, a) {
      var r = a(0),
        i = a.n(r),
        o = (r = a(1007), a.n(r)),
        s = (r = a(35), a.n(r)),
        c = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
          return e(t)
        } : function(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
        },
        u = f();

      function l(e, t) {
        return p(t - -398, e)
      }
      for (;;) try {
        if (912893 == +parseInt(g(9, -105)) + parseInt(l("J2^$".split("").reverse().join(""), -391)) / 2 + parseInt(function(e, t, n) {
            return p(t - -443, n)
          }(0, -397, "$k^i")) / 3 * (-parseInt(g(36, -104)) / 4) + -parseInt(l("Ns&I", -357)) / 5 + parseInt(function(e, t, n) {
            return p(n - -806, t)
          }(0, "Zkwm".split("").reverse().join(""), -782)) / 6 + -parseInt(g(4, 698)) / 7 * (parseInt(function(e, t, n, a) {
            return g(a - -406, t)
          }(0, -407, 0, -388)) / 8) + parseInt(g(26, 725)) / 9 * (-parseInt(function(e, t, n, a) {
            return p(a - 144, n)
          }(0, 0, "eZkp".split("").reverse().join(""), 146)) / 10)) break;
        u.push(u.shift())
      } catch (t) {
        u.push(u.shift())
      }

      function p(e, t) {
        var n = f();
        return (p = function(t, a) {
          var r, i = n[t = +t];
          void 0 === p.AVaZXX && (r = function(e) {
            for (var t, n, a = "=/+9876543210ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba".split("").reverse().join(""), r = "", i = "", o = 0, s = 0; n = e.charAt(s++); ~n && (t = o % 4 ? 64 * t + n : n, o++ % 4) && (r += String.fromCharCode(255 & t >> (-2 * o & 6)))) n = a.indexOf(n);
            for (var c = 0, u = r.length; c < u; c++) i += "%" + ("00" + r.charCodeAt(c).toString(16)).slice(-2);
            return decodeURIComponent(i)
          }, p.MRooqR = function(e, t) {
            var n = [],
              a = 0,
              i = void 0,
              o = "",
              s = void(e = r(e));
            for (s = 0; s < 256; s++) n[s] = s;
            for (s = 0; s < 256; s++) a = (a + n[s] + t.charCodeAt(s % t.length)) % 256, i = n[s], n[s] = n[a], n[a] = i;
            a = s = 0;
            for (var c = 0; c < e.length; c++) i = n[s = (s + 1) % 256], n[s] = n[a = (a + n[s]) % 256], n[a] = i, o += String.fromCharCode(e.charCodeAt(c) ^ n[(n[s] + n[a]) % 256]);
            return o
          }, e = arguments, p.AVaZXX = !0);
          t += n[0];
          var o = e[t];
          return o ? i = o : (void 0 === p.VpiQKQ && (p.VpiQKQ = !0), i = p.MRooqR(i, a), e[t] = i), i
        })(e, t)
      }
      var d = function(e, t) {
        return g(t - -56, e)
      }(-15, -19);

      function g(e, t) {
        var n = f();
        return (g = function(t, a) {
          var r = n[t = +t];
          void 0 === g.qAkXcH && (g.EwxKJo = function(e) {
            for (var t, n, a = "", r = "", i = 0, o = 0; n = e.charAt(o++); ~n && (t = i % 4 ? 64 * t + n : n, i++ % 4) && (a += String.fromCharCode(255 & t >> (-2 * i & 6)))) n = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(n);
            for (var s = 0, c = a.length; s < c; s++) r += "%" + ("00" + a.charCodeAt(s).toString(16)).slice(-2);
            return decodeURIComponent(r)
          }, e = arguments, g.qAkXcH = !0);
          t += n[0];
          var i = e[t];
          return i ? r = i : (r = g.EwxKJo(r), e[t] = r), r
        })(e, t)
      }

      function f() {
        var e = ["aajEBCojW7H0kq", "BgvUz3rO", "KLMBLb3B".split("").reverse().join(""), "jmkkw8oxCKRcV2SaW6TDzSoYWQFcUCkfW6O6WQ/cQa", "W4hdL8k5hHVdJG", "q1gvAXwuWadm2eZm".split("").reverse().join(""), "tmo6vfaRW53cU8kPW6VcVb8A", "GBVLgDJfMl3vMt0n3Bq9YAJ9gBJ9cDUvgz1r3C".split("").reverse().join(""), "mteYAvvoy1HA", "EqNdSmoZW5ddRJ7cQG", "hoCtkjKv".split("").reverse().join(""), "RoCDyfOWCS0UdpWpxkmaqomC".split("").reverse().join(""), "P9qdNkCg".split("").reverse().join(""), "qEXvKrePNm3idnYetm".split("").reverse().join(""), "e5WDkSUdJ3DtkCAjy5Wf4aclyrKcN4WbaOWZrPWaS5W1j7W0qMOd75WnvQWaoCRdRXbZo8Hc3HPdh1z".split("").reverse().join(""), "WQhdHmoxdq", "W4ZcNmkKW7NcT8k0W74fW4qVzG", "AM9PBG", "mtq4mJq5mev4r3fQAq", "mwynvgDertn1eZm1atm".split("").reverse().join(""), "Bw9KzwW", "TomqukStJkSsQnKIdpHRdhPWp87W".split("").reverse().join(""), "iruDYLesWiZmWetn".split("").reverse().join(""), "FI8guZfeAv7cQf/dT07dH8ojnmoMW7m7hSoedXalwCkQkYNcRSkRWPdcJ0hcUNTIq1q", "zg9fBMnYExb0", "ywLKFf8", "C3r1zgvUDc9IBg9Nl0jSB2CHC2f2zs5Hy3rPB24", "eXHbIkSc".split("").reverse().join(""), "SgB+kSNcpWlab7W4uYorybj".split("").reverse().join(""), "zMLUza", "rPgwmDMB3aJm".split("").reverse().join(""), "C3LZDgvT", "hmkJaXjAWPK", "u3tAoCRc/7WjqexNP4Whk8zvv4WbvPW5zRW+oCIdlRWQkSzJe4WHCPWBomfFyKScZPWIkSSct4WIndssDdKdVOWukmFrL4WBkCGdZhrQrhTdBPWWk8aYo8PcdPWwiQW".split("").reverse().join(""), "a6WLoSz".split("").reverse().join(""), "qVdB4WUkSfrfXKdJ7WTS6WzoSOddQW".split("").reverse().join(""), "Aw5KzxHpzG", "ndj1tMPPEuu", "mheGdSog", "EHhdPmoJW5pdRZJdQmkvwgtcN8oMvmoXoLxdPdLjWP/cT1tcPSk7", "yfDtDNAIrdm1itn".split("").reverse().join(""), "mdrHm2mZnwrLmdC1ytjLodzMmJHKntjHnde5odLHmdHLnZqWytGYzMi5nMq0m2q5ywy4ytu1mdLLmge0ztGZn2vJyJm4ngm0ngzLmwvLotvMnJaXzwyZnMyZyZG5mJiXngq0nwm5yJnMnZvIntC1nty0nJy4nZzHzdyWntjMmgyXzG", "WO/dT2jaWQFcLq", "WO8SW6VcMSkIW7RcIsiix1W", "WBM5wsLnwA2vgr0v2z".split("").reverse().join(""), "zvpcM2FcIdKMbG8sbCokuq", "W4ddM1PjW63dG8oLWQtdOSosWRxdNmk7W6OXW5RdOCoh", "yNXF", "po8UddOW".split("").reverse().join(""), "nCowaSkNW5O"];
        return (f = function() {
          return e
        })()
      }
      n.a = {
        fp: function() {
          function e(e, t, n, a, r) {
            return p(r - -69, t)
          }
          try {
            var t = i.a.getAccountInfoSync().miniProgram.appId,
              n = wx.getDeviceInfo(),
              a = [n.brand, n.model, n.system, n.platform].join(","),
              r = g(43, -26) + a + g(21, -67) + t + p(44, "W21%") + Date.now() + e(0, "eZkp".split("").reverse().join(""), 0, 0, -46) + function() {
                for (var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 16, t = function(e, t, n, a, r) {
                    return p(t - -328, a)
                  }(0, -299, 0, "SVbX".split("").reverse().join("")), n = "", a = 0; a < e; a++) n += t.charAt(Math.floor(Math.random() * t.length));
                return n
              }() + p(45, "v3z6") + i.a.getStorageSync(g(48, -15)),
              u = o.a.doEncrypt(r, d, 1);
            return e(0, "%rH7".split("").reverse().join(""), 0, 0, -31) != (void 0 === u ? "undefined" : c(u)) && s.a.info(function(e, t, n, a, r) {
              return p(a - 304, r)
            }(0, 0, 0, 353, "$^2J"), [a, u]), u
          } catch (t) {}
        },
        needE: function(e) {
          return [p(10, "ssh!"), function(e, t, n, a) {
            return p(a - 564, n)
          }(0, 0, "tCI7".split("").reverse().join(""), 583), function(e, t, n, a, r) {
            return p(r - 983, a)
          }(0, 0, 0, "SZXG".split("").reverse().join(""), 1018), g(3, -90), g(22, -53)].find((function(t) {
            return -1 < t.indexOf(e)
          }))
        }
      }
    },
    46: function(e, t, n) {
      n.d(t, "a", (function() {
        return r
      })), Object.prototype.toString;
      var a, r = {},
        i = {
          chinese: /[\u4e00-\u9fa5]/gm,
          english: /^[a-z]+$/i,
          capitalized: /^[A-Z]+$/,
          number: /^\d+$/,
          email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
          postCode: /^[0-9]\d{5}(?!\d)$/,
          alphaNumeric: /^[A-Za-z0-9]+$/,
          ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
          ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
          call: /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,6})?$/i,
          telephone: /^(0|86|17951)?(11[0-9]|12[0-9]|13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9]|14[0-9])[0-9]{8}$/,
          idCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
          url: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
          date: /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/,
          password8_14: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,14}$/
        },
        o = function(e) {
          r[e] = function(t) {
            return null !== t && i[e].test(t)
          }
        };
      for (a in i) i.hasOwnProperty(a) && o(a)
    },
    47: function(e, t, n) {
      n.d(t, "a", (function() {
        return d
      }));
      t = n(3);
      var a = n.n(t),
        r = n(0),
        i = n.n(r),
        o = n(6),
        s = n(1),
        c = n(30),
        u = n(48),
        l = function(e, t) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return function(e, t) {
            var n = [],
              a = !0,
              r = !1,
              i = void 0;
            try {
              for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); a = !0);
            } catch (e) {
              r = !0, i = e
            } finally {
              try {
                !a && s.return && s.return()
              } finally {
                if (r) throw i
              }
            }
            return n
          }(e, t);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };

      function p(e) {
        return function() {
          var t = e.apply(this, arguments);
          return new Promise((function(e, n) {
            return function a(r, i) {
              try {
                var o = t[r](i),
                  s = o.value
              } catch (r) {
                return void n(r)
              }
              if (!o.done) return Promise.resolve(s).then((function(e) {
                a("next", e)
              }), (function(e) {
                a("throw", e)
              }));
              e(s)
            }("next")
          }))
        }
      }

      function d(e) {
        var t, n, d, g, f, m, h, y = this,
          v = e.planId,
          b = e.safeBookRef,
          S = e.getRuleDetails,
          w = Object(o.useSelector)((function(e) {
            return e.xybData.menuNoun
          })),
          U = Object(o.useSelector)((function(e) {
            return e.xybData.pageNoun
          })),
          B = (e = Object(r.useState)(!1), (e = l(e, 2))[0]),
          x = e[1],
          I = (e = Object(r.useState)({}), (e = l(e, 2))[0]),
          A = e[1],
          T = (e = Object(r.useState)({}), (e = l(e, 2))[0]),
          j = e[1],
          C = Object(r.useRef)(null),
          P = Object(r.useRef)(!1),
          D = function(e) {
            return e || v
          },
          O = function(e, t) {
            var n = S && S(e);
            return n && n.projectRuleId ? (j(n), Promise.resolve(n)) : (n = D(t), s.a.xyb_request("student/practiceplan/LoadRuleDetail.action", "POST", {
              planId: n,
              moduleId: e
            }, !1, !1).then((function(e) {
              return e = e.data || {}, j(e), e
            })))
          },
          k = (t = p(a.a.mark((function e(t, n, r, i, o, s) {
            var u, p;
            return a.a.wrap((function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, Promise.all([Object(c.e)(t, n, i), o && o.projectRuleId ? Promise.resolve(o) : O(r, s)]);
                case 2:
                  return p = e.sent, p = l(p, 2), u = p[0], p = p[1], j(p), e.abrupt("return", {
                    data: u.data,
                    details: p
                  });
                case 8:
                case "end":
                  return e.stop()
              }
            }), e, y)
          }))), function(e, n, a, r, i, o) {
            return t.apply(this, arguments)
          }),
          R = (n = p(a.a.mark((function e() {
            var t, n, r, i, o, s, c;
            return a.a.wrap((function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  if (t = C.current) {
                    e.next = 3;
                    break
                  }
                  return e.abrupt("return");
                case 3:
                  return o = t.projectId, c = t.projectDateId, n = t.oldProjectDateId, r = t.moduleId, i = t.planId, e.next = 6, k(o, c, r, n, T, i);
                case 6:
                  if (o = e.sent, s = o.data, c = o.details, Object(u.c)(s, w, U, c)) return e.next = 12, E();
                  e.next = 13;
                  break;
                case 12:
                  return e.abrupt("return");
                case 13:
                  A(s), x(!0);
                case 15:
                case "end":
                  return e.stop()
              }
            }), e, y)
          }))), function() {
            return n.apply(this, arguments)
          }),
          E = (d = p(a.a.mark((function e() {
            var t, n, r, i, o, s, c;
            return a.a.wrap((function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  if (t = C.current) {
                    e.next = 3;
                    break
                  }
                  return e.abrupt("return");
                case 3:
                  return o = t.projectId, s = t.projectDateId, n = t.oldProjectDateId, c = t.moduleId, r = t.onProceed, i = t.planId, e.next = 6, k(o, s, c, n, T, i);
                case 6:
                  if (o = e.sent, s = o.data, c = o.details, Object(u.c)(s, w, U, c)) {
                    e.next = 12;
                    break
                  }
                  return A(s), e.abrupt("return");
                case 12:
                  x(!1), C.current = null, r && r();
                case 15:
                case "end":
                  return e.stop()
              }
            }), e, y)
          }))), function() {
            return d.apply(this, arguments)
          }),
          L = (g = p(a.a.mark((function e(t, n, r) {
            var o, s;
            return a.a.wrap((function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  o = t.consentRemark || "", s = t.consentTmplId || null, i.a.navigateTo({
                    url: Object(c.b)({
                      projectRuleId: t.projectRuleId,
                      consentRemark: o,
                      projectId: n,
                      tmplId: s,
                      studentId: r
                    })
                  });
                case 3:
                case "end":
                  return e.stop()
              }
            }), e, y)
          }))), function(e, t, n) {
            return g.apply(this, arguments)
          }),
          M = (e = (f = p(a.a.mark((function e(t) {
            var n, r, o, s, c, u, l;
            return a.a.wrap((function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  if (n = C.current) {
                    e.next = 3;
                    break
                  }
                  return e.abrupt("return");
                case 3:
                  r = n.projectId, o = n.moduleId, s = n.planId, c = n.studentId, T.projectRuleId ? (e.t0 = T, e.next = 11) : e.next = 8;
                  break;
                case 8:
                  return e.next = 10, O(o, s);
                case 10:
                  e.t0 = e.sent;
                case 11:
                  u = e.t0, P.current = !0, x(!1), e.t1 = t, e.next = "preReport" === e.t1 ? 17 : "safetyAgreement" === e.t1 ? 20 : "informedConsent" === e.t1 ? 22 : "tripartiteAgreement" === e.t1 ? 25 : 27;
                  break;
                case 17:
                  return l = I.preReportStatus || "未提交", i.a.navigateTo({
                    url: "/echartsBag/pages/uploadPreReport/uploadPreReport?reportReviewStatus=" + l + "&projectRuleId=" + u.projectRuleId
                  }), e.abrupt("break", 30);
                case 20:
                  return b && b.current && b.current.initSafeBook(u.safetyAgreement && u.safetyAgreement.confirmMethod, D(s), String(o)), e.abrupt("break", 30);
                case 22:
                  return e.next = 24, L(u, r, c);
                case 24:
                  return e.abrupt("break", 30);
                case 25:
                  return i.a.navigateTo({
                    url: "/echartsBag/pages/agreement/commitAgreement/commitAgreement?id=" + D(s)
                  }), e.abrupt("break", 30);
                case 27:
                  return x(!0), P.current = !1, e.abrupt("break", 30);
                case 30:
                case "end":
                  return e.stop()
              }
            }), e, y)
          }))), function(e) {
            return f.apply(this, arguments)
          }), m = p(a.a.mark((function e() {
            var t, n, r, i, o, s;
            return a.a.wrap((function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  if (C.current) {
                    e.next = 2;
                    break
                  }
                  return e.abrupt("return", !1);
                case 2:
                  return r = C.current, i = r.projectId, s = r.projectDateId, t = r.oldProjectDateId, n = r.moduleId, r = r.planId, e.next = 5, k(i, s, n, t, T, r);
                case 5:
                  if (i = e.sent, o = i.data, s = i.details, Object(u.c)(o, w, U, s)) return e.next = 11, E();
                  e.next = 13;
                  break;
                case 11:
                  e.next = 16;
                  break;
                case 13:
                  A(o), x(!0), P.current = !1;
                case 16:
                  return e.abrupt("return", !0);
                case 17:
                case "end":
                  return e.stop()
              }
            }), e, y)
          }))), function() {
            return m.apply(this, arguments)
          });
        return Object(r.useDidShow)((function() {
          C.current && P.current && (R(), P.current = !1)
        })), h = p(a.a.mark((function e(t) {
          var n, r, i = t.projectId,
            o = t.projectDateId,
            s = t.moduleId,
            c = t.planId,
            l = t.oldProjectDateId,
            p = t.studentId,
            d = t.onProceed;
          return a.a.wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, k(i, o, s, l, void 0, c);
              case 2:
                if (r = e.sent, n = r.data, r = r.details, Object(u.c)(n, w, U, r)) return d && d(), e.abrupt("return", !0);
                e.next = 8;
                break;
              case 8:
                return C.current = {
                  projectId: i,
                  projectDateId: o,
                  moduleId: s,
                  planId: c,
                  oldProjectDateId: l,
                  studentId: p,
                  onProceed: d
                }, A(n), x(!0), e.abrupt("return", !1);
              case 12:
              case "end":
                return e.stop()
            }
          }), e, y)
        }))), {
          runSignUpBeforeCheck: function(e) {
            return h.apply(this, arguments)
          },
          handleSafeBookConfirm: M,
          signUpBeforeCheckProps: {
            showWin: B,
            checkData: I,
            ruleDetails: T,
            menuNoun: w,
            pageNoun: U,
            onClose: function() {
              x(!1), C.current = null
            },
            onItemClick: e,
            onProceed: E
          },
          ruleDetails: T
        }
      }
    },
    48: function(e, t, n) {
      n.d(t, "a", (function() {
        return u
      })), n.d(t, "c", (function() {
        return l
      })), n.d(t, "b", (function() {
        return p
      }));
      var a = n(30),
        r = [{
          key: "preReport",
          labelKey: "ysxbg",
          defaultLabel: "预实习报告",
          icon: "https://xcxstatic.xybsyw.com/xcx/images/plan-ysxbg.png"
        }, {
          key: "safetyAgreement",
          labelKey: "tm_aqzls",
          defaultLabel: "安全责任书",
          icon: "https://xcxstatic.xybsyw.com/xcx/images/plan-aqzrs.png"
        }, {
          key: "informedConsent",
          labelKey: "zqtys",
          defaultLabel: "监护人知情同意书",
          icon: "https://xcxstatic.xybsyw.com/xcx/images/plan-jhrzqtys.png",
          isPageNoun: !0
        }, {
          key: "tripartiteAgreement",
          labelKey: "sfxy",
          defaultLabel: "三方协议书",
          icon: "https://xcxstatic.xybsyw.com/xcx/images/agreement_icon.png"
        }],
        i = ["PASS", "UNNEED"];

      function o(e, t) {
        return t = 1 < arguments.length && void 0 !== t ? t : {}, (e = 0 < arguments.length && void 0 !== e ? e : {}).preReportStatus || (t.needPrePractice && t.needReview ? function(e) {
          return 2 === e ? "PASS" : 3 === e ? "UNNEED" : 1 === e ? "FAIL" : 0 === e ? "PENDING" : ""
        }(t.auditStatus) : "UNNEED")
      }

      function s(e, t) {
        return !!e && (!t || "FAIL" !== t && "PENDING" !== t && i.includes(t))
      }

      function c(e, t, n, a) {
        return a = 3 < arguments.length && void 0 !== a ? a : {}, "preReport" === e ? function(e, t, n) {
          return "FAIL" === t ? {
            actionText: "重新上传",
            actionClass: "pending",
            subText: n || "审核未通过，已退回",
            subClass: "error"
          } : e ? {
            actionText: "已上传",
            actionClass: "done",
            subText: n = "PENDING" === t ? "审核中" : "",
            subClass: n ? "warning" : ""
          } : {
            actionText: "未上传",
            actionClass: "pending",
            subText: "",
            subClass: ""
          }
        }(t, o(n, a), function(e, t) {
          return (0 < arguments.length && void 0 !== e ? e : {}).preReportDesc || (1 < arguments.length && void 0 !== t ? t : {}).auditDesc || ""
        }(n, a)) : t ? {
          actionText: "已上传",
          actionClass: "done",
          subText: "",
          subClass: ""
        } : {
          actionText: "未上传",
          actionClass: "pending",
          subText: "",
          subClass: ""
        }
      }

      function u(e, t, n) {
        var a = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {};
        return r.filter((function(t) {
          return Object.prototype.hasOwnProperty.call(e, t.key)
        })).map((function(r) {
          var i = !0 === e[r.key],
            u = r.isPageNoun ? n[r.labelKey] || r.defaultLabel : t[r.labelKey] || r.defaultLabel,
            l = c(r.key, i, e, a);
          return {
            key: r.key,
            label: u,
            icon: r.icon,
            actionText: l.actionText,
            actionClass: l.actionClass,
            subText: l.subText,
            subClass: l.subClass,
            complete: function(e, t, n, a) {
              return a = 3 < arguments.length && void 0 !== a ? a : {}, "preReport" === e ? !!t && (!a.needReview || s(t, o(n, a))) : t
            }(r.key, i, e, a)
          }
        }))
      }

      function l() {
        var e = u(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}, 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {});
        return 0 === e.length || e.every((function(e) {
          return e.complete
        }))
      }

      function p() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
          n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
          r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {};
        return 0 === a.a.filter((function(t) {
          return Object.prototype.hasOwnProperty.call(e, t)
        })).length ? !(t.needPrePractice && !t.preReport) && (!(t.needPrePractice && t.needReview && t.preReport) || s(!0, o({}, t))) : l(e, n, r, t)
      }
    },
    50: function(e, t, n) {
      n.d(t, "a", (function() {
        return a
      })), n.d(t, "b", (function() {
        return r
      })), n.d(t, "c", (function() {
        return i
      }));
      var a = "ADD",
        r = "MINUS",
        i = "SET_XYBDATA"
    },
    51: function(e, t, n) {
      n.d(t, "c", (function() {
        return o
      })), n.d(t, "b", (function() {
        return s
      })), n.d(t, "a", (function() {
        return c
      })), n.d(t, "d", (function() {
        return u
      }));
      t = n(0);
      var a = n.n(t),
        r = n(1),
        i = "startPageAdCache";

      function o(e) {
        var t, n;
        return !(!e || !e.workLogo || (t = Math.floor(Date.now() / 1e3), n = e.cacheTime || 0, e.startTime && e.startTime > t) || e.endTime && e.endTime < t || n && 1800 < t - n)
      }

      function s() {
        var e = a.a.getStorageSync(i);
        return o(e) ? e : (a.a.removeStorageSync(i), null)
      }

      function c() {
        return r.a.xyb_request("advertisement/StartPage!listStartPage.action", "POST", {}, !1, !0).then((function(e) {
          return (e = e && "200" === e.code && e.data && e.data[0]) && e.workLogo ? function(e) {
            return e && e.workLogo ? (e = Object.assign({}, e, {
              cacheTime: Math.floor(Date.now() / 1e3)
            }), a.a.setStorageSync(i, e), e) : (a.a.removeStorageSync(i), null)
          }(e) : (a.a.removeStorageSync(i), null)
        }))
      }

      function u(e, t) {
        !e && 0 !== e || r.a.xyb_request("advertisement/StartPage!recordStatistic.action", "POST", {
          id: e,
          eventType: t,
          openId: a.a.getStorageSync("openid") || ""
        }, !1, !0).then((function(e) {}), (function(e) {})).catch((function() {}))
      }
    },
    53: function(e, t, n) {},
    54: function(e, t, n) {
      n.d(t, "c", (function() {
        return i
      })), n.d(t, "b", (function() {
        return o
      })), n.d(t, "a", (function() {
        return s
      }));
      t = n(0);
      var a = n.n(t),
        r = "qtb_third_person_id";

      function i(e) {
        e && a.a.setStorageSync(r, {
          personId: e,
          expireAt: Date.now() + 2592e6
        })
      }

      function o() {
        var e = a.a.getStorageSync(r);
        return e && e.personId && e.expireAt ? Date.now() > e.expireAt ? (a.a.removeStorageSync(r), null) : e.personId : null
      }

      function s() {
        a.a.removeStorageSync(r)
      }
    },
    55: function(e, t, n) {
      n.d(t, "a", (function() {
        return r
      })), n.d(t, "b", (function() {
        return i
      }));
      var a = n(0),
        r = Object(a.createContext)({
          engine: null,
          messageList: [],
          addMessage: function() {},
          updateMessage: function() {},
          removeMessage: function() {},
          agentType: 1
        });

      function i() {
        return Object(a.useContext)(r)
      }
    },
    56: function(e, t, n) {
      n.d(t, "a", (function() {
        return a
      }));
      var a = {
        SECURITY_AUTO_REJECT: "security-auto-reject",
        BLACKLIST_AUTO_REJECT: "blacklist-auto-reject",
        REVIEWING: "reviewing"
      }
    },
    61: function(e, t, n) {
      n.d(t, "a", (function() {
        return o
      }));
      t = n(0);
      var a = n.n(t),
        r = !1,
        i = null;

      function o() {
        r ? (clearTimeout(i), i = setTimeout((function() {
          r = !1, a.a.eventCenter.trigger("scrollChange", {
            isScrolling: r
          })
        }), 500)) : (r = !0, a.a.eventCenter.trigger("scrollChange", {
          isScrolling: r
        }))
      }
    },
    62: function(e, t, n) {
      var a = n(0),
        r = n(1);
      t.a = function() {
        var e, t = (e = function(e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return function(e, t) {
              var n = [],
                a = !0,
                r = !1,
                i = void 0;
              try {
                for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); a = !0);
              } catch (e) {
                r = !0, i = e
              } finally {
                try {
                  !a && s.return && s.return()
                } finally {
                  if (r) throw i
                }
              }
              return n
            }(e, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
          }(e = Object(a.useState)({
            applyContentOpenPossess: 0,
            applyContentRequiredPossess: 0,
            relationType: 1,
            minWordLimit: 1,
            maxWordLimit: 122,
            remark: "备注说明",
            tmplFilePath: null,
            tmplFileFullPath: null,
            tmplFileName: null,
            fileRemark: null,
            scoreType: null,
            minScore: null,
            maxScore: null,
            scorePossess: null,
            scoreLevel: null,
            auditPossess: null
          }), 2))[0],
          n = e[1];
        return Object(a.useEffect)((function() {
          r.a.xyb_request("student/exemptinternship/loadExemptInternshipSetting.action", "POST", {}, !1, !1).then((function(e) {
            n(e.data.setting || {})
          }), (function(e) {}))
        }), []), {
          settings: t
        }
      }
    },
    63: function(e, t, n) {
      var a = n(0);
      n = n.n(a).a.createContext({
        planId: "",
        requirementInfo: {}
      });
      t.a = n
    },
    64: function(e, t, n) {
      n.d(t, "a", (function() {
        return s
      }));
      var a = n(0),
        r = n(1),
        i = Object.assign || function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n, a = arguments[t];
            for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n])
          }
          return e
        },
        o = function(e, t) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return function(e, t) {
            var n = [],
              a = !0,
              r = !1,
              i = void 0;
            try {
              for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); a = !0);
            } catch (e) {
              r = !0, i = e
            } finally {
              try {
                !a && s.return && s.return()
              } finally {
                if (r) throw i
              }
            }
            return n
          }(e, t);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };

      function s(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
          n = Object(a.useState)({
            minScore: null,
            declareScore: 0,
            progress: 0
          }),
          s = (n = o(n, 2))[0],
          c = n[1],
          u = Object(a.useCallback)((function() {
            r.a.xyb_request("credit/LoadCredit.action", "POST", {
              yearIndex: e.id
            }, !1, !1).then((function(e) {
              var t, n, a, r;
              "200" === e.code && (t = "CREDIT" === e.data.scoreType ? e.data.declareScore : e.data.declareIntegral, n = "CREDIT" === e.data.scoreType ? "学分" : "积分", a = "CREDIT" === e.data.scoreType ? e.data.minScore ? e.data.declareScore / e.data.minScore * 100 : 0 : e.data.minIntegral ? e.data.declareIntegral / e.data.minIntegral * 100 : 0, r = "CREDIT" === e.data.scoreType ? e.data.minScore : e.data.minIntegral, e = i({}, e.data, {
                score: t || 0,
                scoreText: n,
                progress: 100 < a ? 100 : a || 0,
                hasMinScore: r
              }), c(e))
            }))
          }), [e.id]);
        return Object(a.useEffect)((function() {
          u()
        }), [u]), Object(a.useDidShow)((function() {
          t && u()
        })), {
          progressInfo: s
        }
      }
    },
    65: function(e, t, n) {
      n.d(t, "a", (function() {
        return i
      })), n.d(t, "c", (function() {
        return o
      })), n.d(t, "b", (function() {
        return s
      }));
      t = n(0);
      var a = n.n(t),
        r = "findInternshipReminderPopupShownAt",
        i = function(e) {
          var t = e.SchoolPracticeVerifyList || [];
          e = e.schoolPracticeDatas || [];
          return 0 < t.length + e.length
        },
        o = function() {
          var e = a.a.getStorageSync(r);
          return !(e && Date.now() - Number(e) < 12096e5)
        },
        s = function() {
          a.a.setStorageSync(r, Date.now())
        }
    },
    66: function(e, t, n) {
      n.d(t, "a", (function() {
        return o
      })), n.d(t, "b", (function() {
        return s
      }));
      t = n(3);
      var a = n.n(t),
        r = n(1);
      i = function(e) {
        return function() {
          var t = e.apply(this, arguments);
          return new Promise((function(e, n) {
            return function a(r, i) {
              try {
                var o = t[r](i),
                  s = o.value
              } catch (r) {
                return void n(r)
              }
              if (!o.done) return Promise.resolve(s).then((function(e) {
                a("next", e)
              }), (function(e) {
                a("throw", e)
              }));
              e(s)
            }("next")
          }))
        }
      }(a.a.mark((function e(t, n, i, o) {
        var s, c, u;
        return a.a.wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return s = {}, c = "careerplanning/aiSession!getResumeOptimizeByAi.action", 0 === t ? (c = "careerplanning/aiSession!getMajorsByAi.action", s = {
                activate: n.active ? 1 : null,
                professionId: n.professionId,
                professionName: n.specialtyName || ""
              }) : 1 === t ? s = {
                aiResumeOptimize: t,
                jobName: n.companyName || "",
                positionName: n.internPosition || "",
                content: n.internDesc || ""
              } : 2 === t ? s = {
                aiResumeOptimize: t,
                jobName: n.schoolPosition,
                content: n.schoolDesc || ""
              } : 3 === t && (s = {
                aiResumeOptimize: t,
                content: n || ""
              }), s.continuousRequest = o, e.next = 6, r.a.xyb_request(c, "POST", s, !1, !1, null, i);
            case 6:
              if (u = e.sent, 0 === t) return e.abrupt("return", u.data && 0 < u.data.length ? u.data.map((function(e) {
                return e.name
              })).join("、") : "");
              e.next = 9;
              break;
            case 9:
              return e.abrupt("return", u.data);
            case 10:
            case "end":
              return e.stop()
          }
        }), e, this)
      })));
      var i, o = function(e, t, n, a) {
        return i.apply(this, arguments)
      };

      function s(e, t, n) {
        return e = {
          type: 1 === e ? 2 : 1 < e ? e + 1 : e,
          id: t && t.id ? t.id : "",
          content: n || ""
        }, r.a.xyb_request("talents/saveResumeSectionOptimizer.action", "POST", e, !1, !1)
      }
    },
    67: function(e, t, n) {
      n.d(t, "a", (function() {
        return f
      }));
      t = n(3);
      var a = n.n(t),
        r = (t = n(0), n.n(t)),
        i = n(14),
        o = n(24),
        s = n(13),
        c = void 0;

      function u(e) {
        return function() {
          var t = e.apply(this, arguments);
          return new Promise((function(e, n) {
            return function a(r, i) {
              try {
                var o = t[r](i),
                  s = o.value
              } catch (r) {
                return void n(r)
              }
              if (!o.done) return Promise.resolve(s).then((function(e) {
                a("next", e)
              }), (function(e) {
                a("throw", e)
              }));
              e(s)
            }("next")
          }))
        }
      }
      var l, p = 0,
        d = null,
        g = !1,
        f = (l = u(a.a.mark((function e() {
          return a.a.wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (g) return e.abrupt("return", d);
                e.next = 2;
                break;
              case 2:
                return g = !0, d = new Promise(function() {
                  var e = u(a.a.mark((function e(t, n) {
                    var l, d;
                    return a.a.wrap((function(e) {
                      for (;;) switch (e.prev = e.next) {
                        case 0:
                          if (2 <= p) return n(), e.abrupt("return");
                          e.next = 3;
                          break;
                        case 3:
                          l = r.a.getStorageSync("xcxCurrentEnvironment"), d = {
                            Cookie: r.a.getStorageSync("Cookie"),
                            v: i.default.WxStudentVersion,
                            "content-type": "application/x-www-form-urlencoded"
                          }, d = Object(o.a)(d), l && "wxwork" == l ? wx.qy.login({
                            success: function() {
                              var e = u(a.a.mark((function e(i) {
                                var o;
                                return a.a.wrap((function(e) {
                                  for (;;) switch (e.prev = e.next) {
                                    case 0:
                                      if (i.code) return e.next = 3, Object(s.a)("login/LoginByQyWx!getQyUserId.action");
                                      e.next = 5;
                                      break;
                                    case 3:
                                      o = e.sent, r.a.request({
                                        url: o,
                                        data: {
                                          code: i.code
                                        },
                                        method: "POST",
                                        header: d,
                                        success: function(e) {
                                          e.data.data ? (r.a.setStorageSync("getOpenIdStorage", "1"), r.a.setStorageSync("openid", e.data.data.deviceId), r.a.setStorageSync("sessionKey", e.data.data.sessionKey), r.a.setStorageSync("encryptValue", e.data.data.encryptValue), r.a.setStorageSync("sessionId", e.data.data.sessionId), r.a.setStorageSync("Cookie", "JSESSIONID=" + e.data.data.sessionId), g = !1, t()) : (g = !1, p < 2 ? (p++, f().then((function(e) {
                                            t()
                                          })).catch((function(e) {
                                            n()
                                          }))) : t())
                                        },
                                        fail: function(e) {
                                          r.a.showToast({
                                            title: e.msg
                                          }), n(), g = !1
                                        }
                                      });
                                    case 5:
                                    case "end":
                                      return e.stop()
                                  }
                                }), e, c)
                              })));
                              return function(t) {
                                return e.apply(this, arguments)
                              }
                            }()
                          }) : r.a.login({
                            success: function() {
                              var e = u(a.a.mark((function e(i) {
                                var o;
                                return a.a.wrap((function(e) {
                                  for (;;) switch (e.prev = e.next) {
                                    case 0:
                                      if (i.code) return g = !0, e.next = 4, Object(s.a)("common/getOpenId.action");
                                      e.next = 6;
                                      break;
                                    case 4:
                                      o = e.sent, r.a.request({
                                        url: o,
                                        data: {
                                          code: i.code
                                        },
                                        method: "POST",
                                        header: d,
                                        success: function(e) {
                                          r.a.setStorageSync("getOpenIdStorage", "1"), e.data.data ? (r.a.setStorageSync("openid", e.data.data.openId), r.a.setStorageSync("sessionKey", e.data.data.sessionKey), r.a.setStorageSync("encryptValue", e.data.data.encryptValue), r.a.setStorageSync("sessionId", e.data.data.sessionId), r.a.setStorageSync("Cookie", "JSESSIONID=" + e.data.data.sessionId), r.a.getApp().globalData.isLogin = !!e.data.data.isLogin, g = !1, t()) : (g = !1, p < 2 ? (p++, f().then((function(e) {
                                            t()
                                          })).catch((function(e) {
                                            n()
                                          }))) : t())
                                        },
                                        fail: function(e) {
                                          n(), g = !1
                                        }
                                      });
                                    case 6:
                                    case "end":
                                      return e.stop()
                                  }
                                }), e, c)
                              })));
                              return function(t) {
                                return e.apply(this, arguments)
                              }
                            }()
                          });
                        case 7:
                        case "end":
                          return e.stop()
                      }
                    }), e, c)
                  })));
                  return function(t, n) {
                    return e.apply(this, arguments)
                  }
                }()), e.abrupt("return", d);
              case 5:
              case "end":
                return e.stop()
            }
          }), e, c)
        }))), function() {
          return l.apply(this, arguments)
        })
    },
    68: function(e, t, n) {
      t.a = {
        needEother: function(e) {
          return ["login/login.action", "login/loginByMobileOrThird!mobileCode.action", "login/login!wx.action", "login/LoginByQyWx!qyWxBind.action", "login/login!wx.action", "login/login!reLogin.action", "uploadfile/commonPostPolicy.action", "common/uploadImg.action", "login/AutoLogin.action", "common/VerifyCodeSend.action", "common/getOpenId.action"].find((function(t) {
            return -1 < t.indexOf(e)
          }))
        }
      }
    },
    70: function(e, t) {
      e.exports = {
        latex: {},
        yuml: {},
        markdown: ["sub", "sup", "ins", "mark"],
        highlight: [],
        wxml: ["view", "video", "text", "image", "navigator", "swiper", "swiper-item", "block", "form", "input", "textarea", "button", "checkbox-group", "checkbox", "radio-group", "radio", "rich-text"],
        components: ["table", "img"],
        attrs: ["class", "data", "id", "style"],
        bindType: "catch",
        events: ["tap", "change"],
        dpr: 1,
        showLineNumber: !0
      }
    },
    71: function(e, t, n) {
      n.d(t, "a", (function() {
        return i
      })), n.d(t, "b", (function() {
        return o
      }));
      var a = n(1),
        r = (t = n(0), n.n(t));

      function i() {
        var e = r.a.getStorageSync("behaviorData") || [];
        0 !== e.length && (e = {
          dataJson: JSON.stringify(e)
        }, a.a.xyb_request("behavior/Duration.action", "POST", e, !1, !0, 2).then((function(e) {}), (function(e) {})), r.a.setStorageSync("behaviorData", []))
      }

      function o(e) {
        a.a.xyb_request("behavior/Duration.action", "POST", e, !1, !0, 2).then((function(e) {}), (function(e) {}))
      }
    },
    72: function(e, t, n) {
      var a = n(0),
        r = function(e, t) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return function(e, t) {
            var n = [],
              a = !0,
              r = !1,
              i = void 0;
            try {
              for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); a = !0);
            } catch (e) {
              r = !0, i = e
            } finally {
              try {
                !a && s.return && s.return()
              } finally {
                if (r) throw i
              }
            }
            return n
          }(e, t);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      t.a = function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1e3,
          t = Object(a.useState)(!1),
          n = (t = r(t, 2))[0],
          i = t[1];
        return [n, Object(a.useCallback)((function() {
          i(!0);
          var t = setTimeout((function() {
            i(!1)
          }), e);
          return function() {
            clearTimeout(t), i(!1)
          }
        }), [e]), Object(a.useCallback)((function() {
          i(!1)
        }), [])]
      }
    },
    73: function(e, t, n) {
      n.d(t, "a", (function() {
        return r
      }));
      var a = n(56);

      function r() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        return e.isBlack ? {
          showPrompt: !0,
          type: a.a.BLACKLIST_AUTO_REJECT,
          blacklistReason: e.blackReason || ""
        } : (e = Array.isArray(e.riskTypes) ? e.riskTypes.filter(Boolean) : []).length ? {
          showPrompt: !0,
          type: a.a.SECURITY_AUTO_REJECT,
          riskTitle: "该企业存在" + e.join("、") + "风险"
        } : {
          showPrompt: !1
        }
      }
    },
    74: function(e, t, n) {
      n.d(t, "a", (function() {
        return a
      }));
      var a = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAAXNSR0IArs4c6QAACQFJREFUeAHtnU2PFEUYx5+el93ZZZeF3UVQlBjloBDRo0fDgYTvwcWrH8Sb4cL3IOFAPHgwMTGKEjUq0VUWcJll2Z336Zn2eRoGhmGqp2aqe7pq6l+EzE69dFf/6zdPV1fVUx3QSKhG0UUK6RpFdIUCOsefayNZ8NUnBQKqMQM7zMItKtGNrSC4O3z5weBLFEVLT3r0JWf+PIqoMIjHJxQYKBAE1GeQrp8s0hdBEHQkPgZI4NkP6SbDc3mQGZ9QQKlAQLc3S3RVIIotzXPLA3iUiiHhFQXY0MTMcGQgfZ4gpDu4bb0iEb5MUEBuZ1GJLhWkwwx4JqiF5NcUiJlhdgrc77nyWioioICOAsxOIX5U18mMPFBgVAEe5hELhHGeUWHwXU8BZgfjPXpSIZdCAQCkEAbRegoAID2dkEuhAABSCINoPQUAkJ5OyKVQAAAphEG0ngIASE8n5FIoAIAUwiBaTwEApKcTcikUAEAKYRCtpwAA0tMJuRQKACCFMIjWUwAA6emEXAoFAJBCGETrKQCA9HRCLoUCAEghDKL1FABAejohl0IBAKQQBtF6CgAgPZ2QS6EAAFIIg2g9BQCQnk7IpVAAACmEQbSeAgBITyfkUihQUsR7G73f7lG1GdJ+O6RWGFGvH1G5GND6UpHeWCnRmWNl7H0zREdQ7bCXs+eh1Ytot96l+7UOtXv9RDVWS0W6sFmhE8vFxHy+JHoLkPxqxNL8y+DIZ8T/dEOBt6b4eHuFtiow4N4BJLel3XontjitCdYmCagSQ/TpmTWqlF5s8paUfWHTvABIbMtjsTZ8i6q2evxN39oktfx2pUyfnFpJyrLwaQttg5tD1mZS32aWln7cCqnR7dNq2d+H2YUDSGzLf40wvk2laW3GAxbRw0aX3ttYHp/sQezCANRgayNPUQ+4U9zpJz9JpdmuR2yBfA5OAyRNt8fWRsCR8Zu0+jbTANEIAdA0elmRt86/+vtsacTadOdobcZdfM/zYTRnLNCgb/MPW5sDHiW2JXjOD29e70DYrXXp3lGbpxb8vl3Y2FRWAySP4T9VG3TYkf4Ngo0KWAvQYadP3+/VKeTJTAR7FbByBKzNk5s/Pm4AHnu5eVEzKwG697Q9cVb8xRXgj1wVsA4g7vbEj+e5qoKTaytgHUD7PL/UT2myU1sFZJxZAesAquGJa+bGzKOgdQA1DNbo5CGg7+e0DiCMFbqFpHUA9R0b9/F9lMo6gHxvELfsD8FDxbUGs62+1lkg2wRCfZIVAEDJ+iB1ggIAaIJASE5WwNrZ+ORqP0vdYrca8RCtsOtxGkEWh9V5HEG8LepdLCHR0dRJgMqFAl1iz9CTGbkXn6dl+pMndP86bOtomJhHxrV2eBUlMZ1b7Fu/wT72ixScBEh807OCRxpX7Nl5dtVpcus/Yrcdk/DbQYsnhxkgDvcYSNmk4f3jy7TNMC1CcK4PtFIq0Kk5iX9ufcm4jcUjdjgc8VzfD7zW6btHDdobSRvO58rfzv0M1srzuwUcMzyXDIqqvEaedkJeNBeSnONN3jLmzGo5tb7cPOFzDqB5+mGZnosXVk4M0ln/40D+t2mzUqTTK2U6zTCxoXUiOAeQ+ITJeunjS9kr/JC9QeYXIpK1UPL/1yetuI/0Flsm6Sul84yZzZVk3wqp1/uZp4Z4bGQZxGkxfnrK8iSKY8teRXvNbrwu/JvdWuxEme3VKiqiEe2cBZJrkqejbx/W6OzaUvxYXGF7n8avVBquxhZONmeotuZpfdQtJbuK/LLfjC3TR1v2bSXjJEAit7gU77CzoS9BhhO2eUc06XDbFBy8hdkkH9dljvcW2UrGtgCAbGuRhPqIv5xtAQDZ1iIJ9bHRSxcAJTSYbUn22R+sSLSNkcT6pPGkmXiCGRJhgWYQLbciFhIEgHKjYfoTW8gPFtVP34woMawALNCwGvh7agUA0NSS5VcgSGXCJt36A6B09cz2aBZ2gpydC5OW2lgqPVtUn9LimYjn12RRvby9x+RFLFlRZCE/buzSOtog8qacCzwzLS+AyyL0ThD9zmuZ5eUsCMkKOHkL+3AzO3hELvES+uBkhd8HZtfMt40WyDmAZO3P6dVsLM/ob+3d4+aL6kePafIdUxkm6j0vu2640H2aKogLjk0BFiiF1mjOcQezpm1v4rGQIOduYXVeUH/E/+cRrFvAZeE9zDmAZN3yz7xGWN60nGWQddF/H+EpbJLG8+mNTqrFlOniS/XtgxqJ5+iJ5RItp7i5giyq3+MF9aYuzVNekrPZnQRI1A550E98zYn8WVifrc2djWHnbmGzXSZKZaUAAMpKWU+OC4A8aeisLhMAZaWsJ8cFQA41tIXjiFjS6hA/VlYVFsjKZnGnUgDInbaapxu+tioASFsqZBynAAAapwritBUAQNpSIeM4BQDQOFWmiLNxfmqK6htnBUDGEvp9gKDa4WntHMNBuxd7P8iemVKTQ94/uevQWwvF2U/e1zEuiLAH7Vc3Gh+XTzeuyN4oG8/PVeC/z/J2d/PadF1Vx9wB+vr+Edm4cZJKMJvixb3ps7fXc61S7rcwwDN7+8uaqLxD7gDlLQDOb6YAADLTz/vSAMh7BMwEAEBm+nlfOneAbNzzxhUqbNAud4DeYdccG4RwBZpBPUWzNF6INzjerJ+5jwPNWnGUs0OB3C2QHTKgFrMqAIBmVQ7lYgUAEEAwUgAAGcmHwgAIDBgpAICM5ENhAAQGjBQAQEbyoTAAAgNGCgAgI/lQGACBASMFAJCRfCgMgMCAkQIAyEg+FAZAYMBIAQBkJB8KAyAwYKQAADKSD4UBEBgwUgAAGcmHwgAIDBgpAICM5ENhAAQGjBQosH9azegIKOyvAsxOgTcf3vFXAVy5kQLMjligW0YHQWF/FWB2gmoUXQxCusObXaE/5C8KU185767Xj0p0qbAVBHfZCl2f+ggo4LcCzIywE79BKIqipf2QbnJ/6LLfquDqtRQI6PZmia4GQdCJb1vyRxxRoK/ENGkdBJm8U0DYCJiRATwiwGvvMJM+EYV0ja3RFU49x59r3imFC36pgAzzyJO6PGyV6Ebc5XmZSv8DcwFyfIALzGEAAAAASUVORK5CYII="
    },
    75: function(e, t, n) {
      n.d(t, "a", (function() {
        return a
      }));
      var a = Behavior({
        methods: {
          touchStart: function(e) {
            e = e.touches[0], this.direction = "", this.deltaX = 0, this.deltaY = 0, this.offsetX = 0, this.offsetY = 0, this.startX = e.clientX, this.startY = e.clientY
          },
          touchMove: function(e) {
            e = e.touches[0], this.deltaX = e.clientX - this.startX, this.deltaY = e.clientY - this.startY, this.offsetX = Math.abs(this.deltaX), this.offsetY = Math.abs(this.deltaY), this.direction = this.offsetX > this.offsetY ? "horizontal" : this.offsetX < this.offsetY ? "vertical" : ""
          }
        }
      })
    },
    76: function(e, t, n) {
      n.d(t, "a", (function() {
        return o
      }));
      var a = n(42),
        r = function(e) {
          return {
            enter: "van-" + e + "-enter van-" + e + "-enter-active enter-class enter-active-class",
            "enter-to": "van-" + e + "-enter-to van-" + e + "-enter-active enter-to-class enter-active-class",
            leave: "van-" + e + "-leave van-" + e + "-leave-active leave-class leave-active-class",
            "leave-to": "van-" + e + "-leave-to van-" + e + "-leave-active leave-to-class leave-active-class"
          }
        },
        i = function() {
          return new Promise((function(e) {
            return setTimeout(e, 33.333333333333336)
          }))
        },
        o = function(e) {
          return Behavior({
            properties: {
              customStyle: String,
              show: {
                type: Boolean,
                value: e,
                observer: "observeShow"
              },
              duration: {
                type: [Number, Object],
                value: 300,
                observer: "observeDuration"
              },
              name: {
                type: String,
                value: "fade"
              }
            },
            data: {
              type: "",
              inited: !1,
              display: !1
            },
            attached: function() {
              this.data.show && this.enter()
            },
            methods: {
              observeShow: function(e) {
                e ? this.enter() : this.leave()
              },
              enter: function() {
                var e = this,
                  t = (n = this.data).duration,
                  n = n.name,
                  o = r(n),
                  s = Object(a.b)(t) ? t.leave : t;
                this.status = "enter", Promise.resolve().then(i).then((function() {
                  e.checkStatus("enter"), e.set({
                    inited: !0,
                    display: !0,
                    classes: o.enter,
                    currentDuration: s
                  })
                })).then(i).then((function() {
                  e.checkStatus("enter"), e.set({
                    classes: o["enter-to"]
                  })
                })).catch((function() {}))
              },
              leave: function() {
                var e = this,
                  t = (n = this.data).duration,
                  n = n.name,
                  o = r(n),
                  s = Object(a.b)(t) ? t.leave : t;
                this.status = "leave", Promise.resolve().then(i).then((function() {
                  e.checkStatus("leave"), e.set({
                    classes: o.leave,
                    currentDuration: s
                  })
                })).then((function() {
                  return setTimeout((function() {
                    return e.onTransitionEnd()
                  }), s)
                })).then(i).then((function() {
                  e.checkStatus("leave"), e.set({
                    classes: o["leave-to"]
                  })
                })).catch((function() {}))
              },
              checkStatus: function(e) {
                if (e !== this.status) throw new Error("incongruent status: " + e)
              },
              onTransitionEnd: function() {
                this.data.show || (this.set({
                  display: !1
                }), this.$emit("transitionEnd"))
              }
            }
          })
        }
    },
    77: function(e, t, n) {
      n.d(t, "a", (function() {
        return a
      }));
      var a = Behavior({
        externalClasses: ["hover-class"],
        properties: {
          id: String,
          lang: {
            type: String,
            value: "en"
          },
          businessId: Number,
          sessionFrom: String,
          sendMessageTitle: String,
          sendMessagePath: String,
          sendMessageImg: String,
          showMessageCard: Boolean,
          appParameter: String,
          ariaLabel: String
        }
      })
    },
    78: function(e, t, n) {
      n.d(t, "a", (function() {
        return a
      }));
      var a = Behavior({
        properties: {
          openType: String
        },
        methods: {
          bindGetUserInfo: function(e) {
            this.$emit("getuserinfo", e.detail)
          },
          bindContact: function(e) {
            this.$emit("contact", e.detail)
          },
          bindGetPhoneNumber: function(e) {
            this.$emit("getphonenumber", e.detail)
          },
          bindError: function(e) {
            this.$emit("error", e.detail)
          },
          bindLaunchApp: function(e) {
            this.$emit("launchapp", e.detail)
          },
          bindOpenSetting: function(e) {
            this.$emit("opensetting", e.detail)
          }
        }
      })
    },
    79: function(e, t, n) {
      n.d(t, "a", (function() {
        return a
      }));
      var a = {
        title: String,
        loading: Boolean,
        showToolbar: Boolean,
        cancelButtonText: {
          type: String,
          value: "取消"
        },
        confirmButtonText: {
          type: String,
          value: "确认"
        },
        visibleItemCount: {
          type: Number,
          value: 5
        },
        itemHeight: {
          type: Number,
          value: 44
        }
      }
    },
    8: function(t, n, a) {
      a.d(n, "b", (function() {
        return u
      })), a.d(n, "a", (function() {
        return l
      }));
      n = a(0);
      var r = a.n(n),
        i = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
          return e(t)
        } : function(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
        },
        o = "undefined" != typeof wx ? wx : {};

      function s(e) {
        var t;
        return e && "object" === (void 0 === e ? "undefined" : i(e)) ? (t = {}, ["albumAuthorized", "cameraAuthorized", "locationAuthorized", "microphoneAuthorized", "notificationAuthorized", "notificationAlertAuthorized", "notificationBadgeAuthorized", "notificationSoundAuthorized", "phoneCalendarAuthorized", "bluetoothAuthorized"].forEach((function(n) {
          void 0 !== e[n] && (t[n] = function(e) {
            return "boolean" == typeof e ? e : "authorized" === e
          }(e[n]))
        })), void 0 !== e.locationReducedAccuracy && (t.locationReducedAccuracy = e.locationReducedAccuracy), t) : {}
      }

      function c() {
        if (!o || "function" != typeof o.getWindowInfo || "function" != typeof o.getDeviceInfo || "function" != typeof o.getAppBaseInfo) try {
          return r.a.getSystemInfoSync() || {}
        } catch (e) {
          return {}
        }
        var e = {},
          t = {},
          n = {},
          a = {},
          i = {};
        try {
          "function" == typeof o.getSystemSetting && (e = o.getSystemSetting() || {})
        } catch (t) {
          e = {}
        }
        try {
          "function" == typeof o.getAppAuthorizeSetting && (t = o.getAppAuthorizeSetting() || {})
        } catch (e) {
          t = {}
        }
        try {
          n = o.getDeviceInfo() || {}
        } catch (e) {
          n = {}
        }
        try {
          a = o.getWindowInfo() || {}
        } catch (e) {
          a = {}
        }
        try {
          i = o.getAppBaseInfo() || {}
        } catch (e) {
          i = {}
        }
        return t = s(t), Object.assign({}, n, a, e, t, i)
      }

      function u() {
        return c()
      }

      function l(e) {
        var t = e || {};
        return new Promise((function(e, n) {
          try {
            var a = c();
            "function" == typeof t.success && t.success(a), "function" == typeof t.complete && t.complete(a), e(a)
          } catch (e) {
            "function" == typeof t.fail && t.fail(e), "function" == typeof t.complete && t.complete(e), n(e)
          }
        }))
      }
    },
    80: function(e, t, n) {
      function a(e) {
        if (Array.isArray(e)) {
          for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
          return n
        }
        return Array.from(e)
      }

      function r(e) {
        return {
          textType: 1,
          text: e
        }
      }

      function i(e, t, n) {
        return {
          textType: 7,
          text: 0 < arguments.length && void 0 !== e ? e : "",
          style: "display:block;color: #A8A9B3;font-size: 13px;font-weight: 400;text-align: right;",
          id: t,
          name: n,
          show: !!t
        }
      }

      function o(e) {
        return Array.isArray(e) ? e.map((function(t, n) {
          return {
            textType: 2,
            text: t.name + (n === e.length ? "" : "："),
            content: (t.str || "") + "\n",
            id: t.id,
            name: t.name
          }
        })) : []
      }

      function s(e, t) {
        var n = [];
        if (e) n = [r(t.content)];
        else {
          if (0 === t.aiMsgType && (n = [r(t.content)]), 1 === t.aiMsgType && (n = [{
              textType: 6,
              text: ""
            }]), 2 === t.aiMsgType) {
            if (!(e = o(t.list)).length) return [r(t.content || "我给不出您想要的回答")];
            n = {
              2: [r("根据您的专业，为您推荐了几个您可能感兴趣的行业，快去点击看看吧！")].concat(a(e)),
              3: [r("你的专业考研可以考")].concat(a(e), [r("等方向"), i("点击了解详情")]),
              4: [r("你的专业考公可以考")].concat(a(e), [r("等部门"), i("点击了解详情")]),
              5: [r("根据您的专业，为您推荐了几个您可能感兴趣的职位，点击你感兴趣的职位，获取从事该职位需要掌握的能力")].concat(a(e), [r("等部门"), i("点击了解详情")])
            } [t.questionType]
          }
          if (3 === t.aiMsgType && (n = [r(t.content), t.name && {
              textType: 3,
              text: "点击获取您在" + t.name + "能够从事的职位"
            }].filter(Boolean)), 4 === t.aiMsgType && (e = (e = o(t.list)).length ? [i(" "), r("了解以上内容后，你的专业可以从事")].concat(a(e), [r("等行业"), i("点击了解行业")]) : [], n = [r(t.content)].concat(a(e))), 5 === t.aiMsgType && (n = [r(t.content), {
              textType: 3,
              text: "您是否想要从事该行业？点击了解该行业的职位"
            }]), 6 === t.aiMsgType) {
            if (!t.list.length) return [r(t.content || "我给不出您想要的回答")];
            n = [r("根据您的性格测试结果为您推荐以下适合的行业")].concat(a(o(t.list)), [i("点击了解行业")])
          }
          if (7 === t.aiMsgType) {
            if (!(e = o(t.list)).length) return [r(t.content || "我给不出您想要的回答")];
            n = [r("根据您的专业，为您推荐了几个您可能感兴趣的职位，点击你感兴趣的职位，获取从事该职位需要掌握的能力")].concat(a(e), [i("了解行业现状 >", t.industryId, t.name)])
          }
          8 === t.aiMsgType && (n = [r(t.content), t.name && {
            textType: 3,
            text: "点击获取" + t.name + "需要哪些能力吧"
          }].filter(Boolean)), 9 === t.aiMsgType && (e = (e = o(t.list)).length ? [i(" "), r("了解以上内容后，你的专业可以从事")].concat(a(e), [r("等行业"), i("点击了解行业")]) : [], n = [r(t.content)].concat(a(e))), 10 === t.aiMsgType && (n = [r(t.content), t.name].filter(Boolean)), 11 === t.aiMsgType && (n = [t.list && t.list.length ? {
            textType: 4,
            text: ""
          } : r(t.content || "我给不出您想要的回答")]), 12 !== t.aiMsgType && 13 !== t.aiMsgType || (n = [{
            textType: 5,
            text: ""
          }])
        }
        return n
      }
      n.d(t, "a", (function() {
        return s
      }))
    },
    81: function(e, t, n) {
      var a = n(0),
        r = n(1),
        i = function(e, t) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return function(e, t) {
            var n = [],
              a = !0,
              r = !1,
              i = void 0;
            try {
              for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); a = !0);
            } catch (e) {
              r = !0, i = e
            } finally {
              try {
                !a && s.return && s.return()
              } finally {
                if (r) throw i
              }
            }
            return n
          }(e, t);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      t.a = function() {
        var e = Object(a.useState)({
            applyContentOpenPossess: 0,
            applyContentRequiredPossess: 0,
            relationType: 1,
            minWordLimit: 1,
            maxWordLimit: 122,
            remark: "备注说明",
            tmplFilePath: null,
            tmplFileFullPath: null,
            tmplFileName: null,
            fileRemark: null,
            scoreType: null,
            minScore: null,
            maxScore: null,
            scorePossess: null,
            scoreLevel: null,
            auditPossess: null
          }),
          t = (e = i(e, 2))[0],
          n = e[1],
          o = (e = Object(a.useState)(!1), (e = i(e, 2))[0]),
          s = e[1];
        return Object(a.useEffect)((function() {
          r.a.xyb_request("student/exemptinternship/loadExemptInternshipSetting.action", "POST", {}, !1, !1).then((function(e) {
            n(e.data.setting || {}), s(e.data.open)
          }), (function(e) {}))
        }), []), {
          settings: t,
          open: o
        }
      }
    },
    82: function(e, t, n) {
      n.d(t, "a", (function() {
        return o
      }));
      var a = n(0),
        r = n.n(a),
        i = n(1);

      function o() {
        var e = Object(a.useRef)({
            resolve: null,
            reject: null
          }),
          t = (c = function(e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return function(e, t) {
              var n = [],
                a = !0,
                r = !1,
                i = void 0;
              try {
                for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); a = !0);
              } catch (e) {
                r = !0, i = e
              } finally {
                try {
                  !a && s.return && s.return()
                } finally {
                  if (r) throw i
                }
              }
              return n
            }(e, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
          }(c = Object(a.useState)(null), 2))[0],
          n = c[1],
          o = (Object(a.useCallback)((function() {
            return new Promise((function(e, t) {
              r.a.getLocation({
                type: "gcj02",
                success: function(t) {
                  t = {
                    latitude: t.latitude.toFixed(6),
                    longitude: t.longitude.toFixed(6)
                  }, e(t)
                },
                fail: function(e) {
                  r.a.showToast({
                    title: "经纬度获取失败,请重新定位后再试",
                    icon: "none"
                  })
                }
              })
            }))
          }), []), Object(a.useCallback)((function(e) {
            var t = r.a.getStorageSync("xcxSystemInfo");
            i.a.xyb_request("credit/signin/Signin.action", "POST", {
              jsonStr: e,
              clockDeviceToken: t ? t.model : "",
              clockDevice: t ? t.brand : ""
            }, !1, !1).then((function(e) {
              "200" === e.code && n(e.data)
            }))
          }), [])),
          s = Object(a.useCallback)((function() {
            r.a.eventCenter.trigger("taroClick", {
              funName: "扫码签到"
            }), r.a.scanCode({
              success: function(e) {
                "QR_CODE" !== e.scanType ? r.a.showToast({
                  title: "请扫描正确的二维码",
                  icon: "none"
                }) : (e = e.result, o(e))
              }
            })
          }), [o]),
          c = Object(a.useCallback)((function() {
            return new Promise((function(t, n) {
              e.current = {
                resolve: t,
                reject: n
              }, s()
            }))
          }), [s]);
        return Object(a.useEffect)((function() {
          i.a.xyb_request("credit/signin/loadUnScoreActivity.action", "POST", {}, !1, !1).then((function(e) {
            "200" === e.code && e.data && n({
              isSuccess: !0,
              success: !0,
              status: null,
              signinTime: e.data.clockTime,
              successStatus: 1 == e.data.clockType ? 9 : 10,
              activityId: e.data.id,
              activityName: e.data.name,
              credit: null,
              needScore: !0
            })
          }))
        }), []), {
          signInAction: c,
          signInResult: t,
          clearResult: function() {
            return n(null)
          }
        }
      }
    },
    83: function(t, n, a) {
      a.r(n), a(1287);
      var r = a(0),
        i = a.n(r),
        o = (a(1288), a(56));
      r = function(e, t, n) {
        return t && s(e.prototype, t), n && s(e, n), e
      };

      function s(e, t) {
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
      }
      var c;

      function u(t, n) {
        if (t) return !n || "object" != e(n) && "function" != typeof n ? t : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function l() {
        var e, t;
        ! function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, l);
        for (var n = arguments.length, a = Array(n), r = 0; r < n; r++) a[r] = arguments[r];
        return (e = t = u(this, (t = l.__proto__ || Object.getPrototypeOf(l)).call.apply(t, [this].concat(a)))).$usedState = ["visible", "type", "PROMPT_TYPE", "blacklistReason", "riskTitle", "riskDesc", "blacklistDesc"], t.customComponents = [], u(t, e)
      }(function(t, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + e(n));
        t.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(t, n) : t.__proto__ = n)
      })(l, i.a.Component), r(l, [{
        key: "_constructor",
        value: function(e) {
          (function e(t, n, a) {
            null === t && (t = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(t, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(a) : void 0 : null !== (r = Object.getPrototypeOf(t)) ? e(r, n, a) : void 0
          })(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "_constructor", this).call(this, e), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var e = this.__props,
            t = e.visible,
            n = e.type,
            a = void 0 === (a = e.riskTitle) ? "该企业存在xxx风险" : a,
            r = void 0 === (r = e.riskDesc) ? "学校已设置自动驳回，为您实习安全，请更换实习单位！" : r,
            i = void 0 === (i = e.blacklistDesc) ? "该企业在学校黑名单中，已自动驳回。为您实习安全，请更换实习单位！" : i,
            s = void 0 === (s = e.blacklistReason) ? "" : s,
            c = e.onConfirm;
          return t ? (this.anonymousFunc0 = e = function() {
            c && c()
          }, this.anonymousFunc1 = e, Object.assign(this.__state, {
            visible: t,
            type: n,
            PROMPT_TYPE: o.a,
            blacklistReason: s,
            riskTitle: a,
            riskDesc: r,
            blacklistDesc: i
          }), this.__state) : null
        }
      }, {
        key: "anonymousFunc0",
        value: function(e) {}
      }, {
        key: "anonymousFunc1",
        value: function(e) {}
      }]), c = r = l, r.$$events = ["anonymousFunc0", "anonymousFunc1"], r.$$componentPath = "fourthBag/pages/practice/Inc/RegistrationReviewPrompt/RegistrationReviewPrompt", (r = c).defaultProps = {
        visible: !1,
        type: o.a.SECURITY_AUTO_REJECT,
        riskTitle: "该企业存在xxx风险",
        riskDesc: "学校已设置自动驳回，为您实习安全，请更换实习单位！",
        blacklistDesc: "该企业在学校黑名单中，已自动驳回。为您实习安全，请更换实习单位！",
        blacklistReason: "",
        onConfirm: function() {}
      }, r.options = {
        addGlobalClass: !0
      }, Component(a(0).default.createComponent(r)), a.d(n, "PROMPT_TYPE", (function() {
        return o.a
      }))
    },
    84: function(e, t, n) {
      for (var a = n(36), r = o();;) try {
        if (804708 == -parseInt(i(6, -461)) + parseInt(i(1, -475)) / 2 * (parseInt(i(7, -463)) / 3) + -parseInt(i(2, 474)) / 4 + -parseInt(i(8, 741)) / 5 * (-parseInt(i(9, 485)) / 6) + -parseInt(i(4, -468)) / 7 * (parseInt(function(e, t, n, a) {
            return i(e - -65, a)
          }(-60, 0, 0, -58)) / 8) + -parseInt(function(e, t, n, a, r) {
            return i(r - -11, n)
          }(0, 0, -5, 0, -8)) / 9 + parseInt(i(0, 727)) / 10) break;
        r.push(r.shift())
      } catch (e) {
        r.push(r.shift())
      }

      function i(e, t) {
        var n = o();
        return (i = function(e, t) {
          return n[e = +e]
        })(e, t)
      }

      function o() {
        var e = ["1672734lleXWC", "14208100NcosTg", "svZkfo8414513".split("").reverse().join(""), "4317472ltErKd", "4369104BLlkqY", "HvqzKT0852562".split("").reverse().join(""), "16JsEckH", "428050UvggEG", "nZrOVy3".split("").reverse().join(""), "10YPcdbM"];
        return (o = function() {
          return e
        })()
      }
      var s = new RegExp("[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]"),
        c = (new RegExp("[\\u4E00-\\u9FFF]+"), function() {
          return ["content", "deviceName", "keyWord", "blogBody", "blogTitle", "getType", "responsibilities", "street", "text", "reason", "searchvalue", "key", "answers", "leaveReason", "personRemark", "selfAppraisal", "imgUrl", "wxname", "deviceId", "avatarTempPath", "file", "file", "model", "brand", "system", "deviceId", "platform", "code", "openId", "unionid", "clockDeviceToken", "clockDevice", "address", "name", "enterpriseEmail", "responsibilities", "practiceTarget", "guardianName", "guardianPhone", "practiceDays", "linkman", "enterpriseName", "companyIntroduction", "accommodationStreet", "accommodationLongitude", "accommodationLatitude", "internshipDestination", "specialStatement", "enterpriseStreet", "insuranceName", "insuranceFinancing", "policyNumber", "overtimeRemark", "riskStatement", "specialStatement"]
        });
      t.a = {
        getTokenData: function(e, t) {
          for (var n = ["Z", "s", "E", "4", "r", "G", "n", "j", "I", "9", "P", "k", "H", "q", "A", "z", "2", "W", "s", "e", "D", "c", "4", "R", "F", "8", "U", "h", "7", "Y", "g", "V", "M", "b", "5", "K", "e", "4", "8", "N", "e", "m", "J", "4", "s", "a", "A", "6", "X", "c", "Q", "8", "2", "1", "f", "F", "T", "0", "6", "1", "p", "C"], r = [], i = 0; i < 62; i++) r.push(i + "");
          var o, u = Math.round((new Date).getTime() / 1e3),
            l = function(e, t) {
              for (var n, a, r = e.slice(0), i = e.length, o = i - t; i-- > o;) n = r[a = Math.floor((i + 1) * Math.random())], r[a] = r[i], r[i] = n;
              return r.slice(o)
            }(r, 20),
            p = "",
            d = (l.forEach((function(e, t) {
              p += n[e]
            })), function(e) {
              for (var t = Object.keys(e).sort(), n = {}, a = 0; a < t.length; a++) n[t[a]] = e[t[a]];
              return n
            }(e)),
            g = "";
          for (o in d) - 1 != c().indexOf(o) || s.test(d[o]) || (g += d[o]);
          return g = (g = (g = (g = (g = (g = (g = (g = (g = g + u + p).replace(/\s+/g, "")).replace(/\n+/g, "")).replace(/\r+/g, "")).replace(/</g, "")).replace(/>/g, "")).replace(/&/g, "")).replace(/-/g, "")).replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, ""), g = encodeURIComponent(g), {
            md5: g = a.a.hexMD5(g),
            tstr: u,
            iArrStr: l && 0 < l.length ? l.join("_") : ""
          }
        },
        checkToken: function(e, t) {
          var n, r, i, o;
          if (e) return ["5", "b", "f", "A", "J", "Q", "g", "a", "l", "p", "s", "q", "H", "4", "L", "Q", "g", "1", "6", "Q", "Z", "v", "w", "b", "c", "e", "2", "2", "m", "l", "E", "g", "G", "H", "I", "r", "o", "s", "d", "5", "7", "x", "t", "J", "S", "T", "F", "v", "w", "4", "8", "9", "0", "K", "E", "3", "4", "0", "m", "r", "i", "n"], n = ["Z", "s", "E", "4", "r", "G", "n", "j", "I", "9", "P", "k", "H", "q", "A", "z", "2", "W", "s", "e", "D", "c", "4", "R", "F", "8", "U", "h", "7", "Y", "g", "V", "M", "b", "5", "K", "e", "4", "8", "N", "e", "m", "J", "4", "s", "a", "A", "6", "X", "c", "Q", "8", "2", "1", "f", "F", "T", "0", "6", "1", "p", "C"], r = e.t, o = e.s.split("_"), i = "", o.forEach((function(e, t) {
            i += n[e]
          })), o = (o = (o = (o = (o = (o = (o = (o = (o = (o = "") + r + i).replace(/\s+/g, "")).replace(/\n+/g, "")).replace(/\r+/g, "")).replace(/</g, "")).replace(/>/g, "")).replace(/&/g, "")).replace(/-/g, "")).replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, ""), o = encodeURIComponent(o), (o = a.a.hexMD5(o)) == e.m
        },
        nocheckArrs: c
      }
    },
    85: function(e, t, n) {
      var a = n(0),
        r = n.n(a),
        i = (a = n(14), Object.assign || function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n, a = arguments[t];
            for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n])
          }
          return e
        }),
        o = a.default.HOST,
        s = (a.default.APPHTTP, {}),
        c = (n.d(t, "a", (function() {
          return c
        })), function(e, t) {
          var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
          return function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {
              method: "GET",
              data: {}
            };
            return e.showLoding && r.a.showLoading({
              title: "loading"
            }), r.a.request({
              url: o + e.url,
              data: i({}, s, e.data),
              header: {
                Cookie: r.a.getStorageSync("Cookies"),
                "content-type": "application/x-www-form-urlencoded"
              },
              method: e.method.toUpperCase()
            }).then((function(t) {
              e.showLoding && r.a.hideLoading;
              var n = t.statusCode;
              t = t.data;
              if (200 <= n && n < 300) return "205" == t.code && r.a.showToast({
                title: t.code,
                icon: "none",
                mask: !0
              }), t;
              throw new Error("网络请求错误，状态码" + code)
            }))
          }({
            url: e,
            method: 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "POST",
            data: t,
            showLoding: n
          })
        })
    },
    86: function(t, n, a) {
      (function(t, r, i) {
        var o, s = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
          return e(t)
        } : function(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
        };
        ! function() {
          function e(e, t) {
            t ? (S[0] = S[16] = S[1] = S[2] = S[3] = S[4] = S[5] = S[6] = S[7] = S[8] = S[9] = S[10] = S[11] = S[12] = S[13] = S[14] = S[15] = 0, this.blocks = S) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], e ? (this.h0 = 3238371032, this.h1 = 914150663, this.h2 = 812702999, this.h3 = 4144912697, this.h4 = 4290775857, this.h5 = 1750603025, this.h6 = 1694076839, this.h7 = 3204075428) : (this.h0 = 1779033703, this.h1 = 3144134277, this.h2 = 1013904242, this.h3 = 2773480762, this.h4 = 1359893119, this.h5 = 2600822924, this.h6 = 528734635, this.h7 = 1541459225), this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0, this.is224 = e
          }

          function c(t, n, a) {
            var r = void 0 === t ? "undefined" : s(t);
            if ("string" === r) {
              for (var i, o = [], c = t.length, l = 0, p = 0; p < c; ++p)(i = t.charCodeAt(p)) < 128 ? o[l++] = i : (i < 2048 ? o[l++] = 192 | i >>> 6 : (i < 55296 || 57344 <= i ? o[l++] = 224 | i >>> 12 : (i = 65536 + ((1023 & i) << 10 | 1023 & t.charCodeAt(++p)), o[l++] = 240 | i >>> 18, o[l++] = 128 | i >>> 12 & 63), o[l++] = 128 | i >>> 6 & 63), o[l++] = 128 | 63 & i);
              t = o
            } else {
              if ("object" !== r) throw new Error(u);
              if (null === t) throw new Error(u);
              if (f && t.constructor === ArrayBuffer) t = new Uint8Array(t);
              else if (!(Array.isArray(t) || f && ArrayBuffer.isView(t))) throw new Error(u)
            }
            64 < t.length && (t = new e(n, !0).update(t).array());
            var d = [],
              g = [];
            for (p = 0; p < 64; ++p) {
              var m = t[p] || 0;
              d[p] = 92 ^ m, g[p] = 54 ^ m
            }
            e.call(this, n, a), this.update(g), this.oKeyPad = d, this.inner = !0, this.sharedMemory = a
          }
          var u = "input is invalid type",
            l = (p = "object" == ("undefined" == typeof window ? "undefined" : s(window))) ? window : {},
            p = !(p = !l.JS_SHA256_NO_WINDOW && p) && "object" == ("undefined" == typeof self ? "undefined" : s(self)),
            d = !l.JS_SHA256_NO_NODE_JS && "object" == (void 0 === t ? "undefined" : s(t)) && t.versions && t.versions.node && "renderer" != t.type,
            g = (p = (d ? l = r : p && (l = self), !l.JS_SHA256_NO_COMMON_JS && "object" == s(i) && i.exports), a(88)),
            f = !l.JS_SHA256_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,
            m = "0123456789abcdef".split(""),
            h = [-2147483648, 8388608, 32768, 128],
            y = [24, 16, 8, 0],
            v = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
            b = ["hex", "array", "digest", "arrayBuffer"],
            S = [],
            w = (!l.JS_SHA256_NO_NODE_JS && Array.isArray || (Array.isArray = function(e) {
              return "[object Array]" === Object.prototype.toString.call(e)
            }), !f || !l.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function(e) {
              return "object" == (void 0 === e ? "undefined" : s(e)) && e.buffer && e.buffer.constructor === ArrayBuffer
            }), function(t, n) {
              return function(a) {
                return new e(n, !0).update(a)[t]()
              }
            }),
            U = function(t) {
              var n = w("hex", t);
              (n = d ? B(n, t) : n).create = function() {
                return new e(t)
              }, n.update = function(e) {
                return n.create().update(e)
              };
              for (var a = 0; a < b.length; ++a) {
                var r = b[a];
                n[r] = w(r, t)
              }
              return n
            },
            B = function(e, t) {
              var n = a(! function() {
                  var e = new Error("Cannot find module 'crypto'");
                  throw e.code = "MODULE_NOT_FOUND", e
                }()),
                r = a(! function() {
                  var e = new Error("Cannot find module 'buffer'");
                  throw e.code = "MODULE_NOT_FOUND", e
                }()).Buffer,
                i = t ? "sha224" : "sha256",
                o = r.from && !l.JS_SHA256_NO_BUFFER_FROM ? r.from : function(e) {
                  return new r(e)
                };
              return function(t) {
                if ("string" == typeof t) return n.createHash(i).update(t, "utf8").digest("hex");
                if (null == t) throw new Error(u);
                return t.constructor === ArrayBuffer && (t = new Uint8Array(t)), Array.isArray(t) || ArrayBuffer.isView(t) || t.constructor === r ? n.createHash(i).update(o(t)).digest("hex") : e(t)
              }
            },
            x = function(e, t) {
              return function(n, a) {
                return new c(n, t, !0).update(a)[e]()
              }
            },
            I = function(e) {
              var t = x("hex", e);
              t.create = function(t) {
                return new c(t, e)
              }, t.update = function(e, n) {
                return t.create(e).update(n)
              };
              for (var n = 0; n < b.length; ++n) {
                var a = b[n];
                t[a] = x(a, e)
              }
              return t
            },
            A = (e.prototype.update = function(e) {
              if (!this.finalized) {
                var t, n = void 0 === e ? "undefined" : s(e);
                if ("string" !== n) {
                  if ("object" !== n) throw new Error(u);
                  if (null === e) throw new Error(u);
                  if (f && e.constructor === ArrayBuffer) e = new Uint8Array(e);
                  else if (!(Array.isArray(e) || f && ArrayBuffer.isView(e))) throw new Error(u);
                  t = !0
                }
                for (var a, r, i = 0, o = e.length, c = this.blocks; i < o;) {
                  if (this.hashed && (this.hashed = !1, c[0] = this.block, this.block = c[16] = c[1] = c[2] = c[3] = c[4] = c[5] = c[6] = c[7] = c[8] = c[9] = c[10] = c[11] = c[12] = c[13] = c[14] = c[15] = 0), t)
                    for (r = this.start; i < o && r < 64; ++i) c[r >>> 2] |= e[i] << y[3 & r++];
                  else
                    for (r = this.start; i < o && r < 64; ++i)(a = e.charCodeAt(i)) < 128 ? c[r >>> 2] |= a << y[3 & r++] : (a < 2048 ? c[r >>> 2] |= (192 | a >>> 6) << y[3 & r++] : (a < 55296 || 57344 <= a ? c[r >>> 2] |= (224 | a >>> 12) << y[3 & r++] : (a = 65536 + ((1023 & a) << 10 | 1023 & e.charCodeAt(++i)), c[r >>> 2] |= (240 | a >>> 18) << y[3 & r++], c[r >>> 2] |= (128 | a >>> 12 & 63) << y[3 & r++]), c[r >>> 2] |= (128 | a >>> 6 & 63) << y[3 & r++]), c[r >>> 2] |= (128 | 63 & a) << y[3 & r++]);
                  this.lastByteIndex = r, this.bytes += r - this.start, 64 <= r ? (this.block = c[16], this.start = r - 64, this.hash(), this.hashed = !0) : this.start = r
                }
                return 4294967295 < this.bytes && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this
              }
            }, e.prototype.finalize = function() {
              var e, t;
              this.finalized || (this.finalized = !0, e = this.blocks, t = this.lastByteIndex, e[16] = this.block, e[t >>> 2] |= h[3 & t], this.block = e[16], 56 <= t && (this.hashed || this.hash(), e[0] = this.block, e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0), e[14] = this.hBytes << 3 | this.bytes >>> 29, e[15] = this.bytes << 3, this.hash())
            }, e.prototype.hash = function() {
              for (var e, t, n, a, r, i, o, s, c = this.h0, u = this.h1, l = this.h2, p = this.h3, d = this.h4, g = this.h5, f = this.h6, m = this.h7, h = this.blocks, y = 16; y < 64; ++y) e = ((a = h[y - 15]) >>> 7 | a << 25) ^ (a >>> 18 | a << 14) ^ a >>> 3, t = ((a = h[y - 2]) >>> 17 | a << 15) ^ (a >>> 19 | a << 13) ^ a >>> 10, h[y] = h[y - 16] + e + h[y - 7] + t << 0;
              for (s = u & l, y = 0; y < 64; y += 4) this.first ? (p = this.is224 ? (r = 300032, m = (a = h[0] - 1413257819) - 150054599 << 0, a + 24177077 << 0) : (r = 704751109, m = (a = h[0] - 210244248) - 1521486534 << 0, a + 143694565 << 0), this.first = !1) : (n = (r = c & u) ^ c & l ^ s, m = p + (a = m + (t = (d >>> 6 | d << 26) ^ (d >>> 11 | d << 21) ^ (d >>> 25 | d << 7)) + (d & g ^ ~d & f) + v[y] + h[y]) << 0, p = a + ((e = (c >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10)) + n) << 0), n = (i = p & c) ^ p & u ^ r, f = l + (a = f + (t = (m >>> 6 | m << 26) ^ (m >>> 11 | m << 21) ^ (m >>> 25 | m << 7)) + (m & d ^ ~m & g) + v[y + 1] + h[y + 1]) << 0, e = ((l = a + ((e = (p >>> 2 | p << 30) ^ (p >>> 13 | p << 19) ^ (p >>> 22 | p << 10)) + n) << 0) >>> 2 | l << 30) ^ (l >>> 13 | l << 19) ^ (l >>> 22 | l << 10), n = (o = l & p) ^ l & c ^ i, g = u + (a = g + (t = (f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7)) + (f & m ^ ~f & d) + v[y + 2] + h[y + 2]) << 0, e = ((u = a + (e + n) << 0) >>> 2 | u << 30) ^ (u >>> 13 | u << 19) ^ (u >>> 22 | u << 10), n = (s = u & l) ^ u & p ^ o, d = c + (a = d + (t = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7)) + (g & f ^ ~g & m) + v[y + 3] + h[y + 3]) << 0, c = a + (e + n) << 0, this.chromeBugWorkAround = !0;
              this.h0 = this.h0 + c << 0, this.h1 = this.h1 + u << 0, this.h2 = this.h2 + l << 0, this.h3 = this.h3 + p << 0, this.h4 = this.h4 + d << 0, this.h5 = this.h5 + g << 0, this.h6 = this.h6 + f << 0, this.h7 = this.h7 + m << 0
            }, e.prototype.toString = e.prototype.hex = function() {
              this.finalize();
              var e = this.h0,
                t = this.h1,
                n = this.h2,
                a = this.h3,
                r = this.h4,
                i = this.h5,
                o = this.h6,
                s = this.h7;
              e = m[e >>> 28 & 15] + m[e >>> 24 & 15] + m[e >>> 20 & 15] + m[e >>> 16 & 15] + m[e >>> 12 & 15] + m[e >>> 8 & 15] + m[e >>> 4 & 15] + m[15 & e] + m[t >>> 28 & 15] + m[t >>> 24 & 15] + m[t >>> 20 & 15] + m[t >>> 16 & 15] + m[t >>> 12 & 15] + m[t >>> 8 & 15] + m[t >>> 4 & 15] + m[15 & t] + m[n >>> 28 & 15] + m[n >>> 24 & 15] + m[n >>> 20 & 15] + m[n >>> 16 & 15] + m[n >>> 12 & 15] + m[n >>> 8 & 15] + m[n >>> 4 & 15] + m[15 & n] + m[a >>> 28 & 15] + m[a >>> 24 & 15] + m[a >>> 20 & 15] + m[a >>> 16 & 15] + m[a >>> 12 & 15] + m[a >>> 8 & 15] + m[a >>> 4 & 15] + m[15 & a] + m[r >>> 28 & 15] + m[r >>> 24 & 15] + m[r >>> 20 & 15] + m[r >>> 16 & 15] + m[r >>> 12 & 15] + m[r >>> 8 & 15] + m[r >>> 4 & 15] + m[15 & r] + m[i >>> 28 & 15] + m[i >>> 24 & 15] + m[i >>> 20 & 15] + m[i >>> 16 & 15] + m[i >>> 12 & 15] + m[i >>> 8 & 15] + m[i >>> 4 & 15] + m[15 & i] + m[o >>> 28 & 15] + m[o >>> 24 & 15] + m[o >>> 20 & 15] + m[o >>> 16 & 15] + m[o >>> 12 & 15] + m[o >>> 8 & 15] + m[o >>> 4 & 15] + m[15 & o];
              return this.is224 || (e += m[s >>> 28 & 15] + m[s >>> 24 & 15] + m[s >>> 20 & 15] + m[s >>> 16 & 15] + m[s >>> 12 & 15] + m[s >>> 8 & 15] + m[s >>> 4 & 15] + m[15 & s]), e
            }, e.prototype.array = e.prototype.digest = function() {
              this.finalize();
              var e = this.h0,
                t = this.h1,
                n = this.h2,
                a = this.h3,
                r = this.h4,
                i = this.h5,
                o = this.h6,
                s = this.h7;
              e = [e >>> 24 & 255, e >>> 16 & 255, e >>> 8 & 255, 255 & e, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, a >>> 24 & 255, a >>> 16 & 255, a >>> 8 & 255, 255 & a, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, o >>> 24 & 255, o >>> 16 & 255, o >>> 8 & 255, 255 & o];
              return this.is224 || e.push(s >>> 24 & 255, s >>> 16 & 255, s >>> 8 & 255, 255 & s), e
            }, e.prototype.arrayBuffer = function() {
              this.finalize();
              var e = new ArrayBuffer(this.is224 ? 28 : 32),
                t = new DataView(e);
              return t.setUint32(0, this.h0), t.setUint32(4, this.h1), t.setUint32(8, this.h2), t.setUint32(12, this.h3), t.setUint32(16, this.h4), t.setUint32(20, this.h5), t.setUint32(24, this.h6), this.is224 || t.setUint32(28, this.h7), e
            }, (c.prototype = new e).finalize = function() {
              var t;
              e.prototype.finalize.call(this), this.inner && (this.inner = !1, t = this.array(), e.call(this, this.is224, this.sharedMemory), this.update(this.oKeyPad), this.update(t), e.prototype.finalize.call(this))
            }, U());
          (A.sha256 = A).sha224 = U(!0), A.sha256.hmac = I(), A.sha224.hmac = I(!0), p ? i.exports = A : (l.sha256 = A.sha256, l.sha224 = A.sha224, g && void 0 !== (o = function() {
            return A
          }.call(n, a, n, i)) && (i.exports = o))
        }()
      }).call(this, a(93), a(52), a(95)(t))
    },
    87: function(t, n) {
      var a = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
        return e(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t)
      };
      t.exports = {
        $isEmpty: function(e) {
          return 0 === Object.keys(e).length
        },
        $isEqual: function(e, t, n, r) {
          var i;
          return e === t ? 0 !== e || 1 / e == 1 / t : e != e ? t != t : e && t ? ("function" === (i = void 0 === e ? "undefined" : a(e)) || "object" === i || "object" === (void 0 === t ? "undefined" : a(t))) && this.$isDeepEqual(e, t, n, r) : e === t
        },
        $isDeepEqual: function(e, t, n, r) {
          var i = toString.call(e);
          if (i !== toString.call(t)) return !1;
          switch (i) {
            case "[object RegExp]":
            case "[object String]":
              return "" + e == "" + t;
            case "[object Number]":
              return +e != +e ? +t != +t : 0 == +e ? 1 / +e == 1 / t : +e == +t;
            case "[object Date]":
            case "[object Boolean]":
              return +e == +t;
            case "[object Symbol]":
              var o = "undefined" != typeof Symbol ? Symbol.prototype : null;
              return o.valueOf.call(e) === o.valueOf.call(t)
          }
          if (!(i = "[object Array]" === i)) {
            if ("object" !== (void 0 === e ? "undefined" : a(e)) || "object" !== (void 0 === t ? "undefined" : a(t))) return e === t;
            var s = e.constructor,
              c = t.constructor;
            if (s !== c && !("function" == typeof s && s instanceof s && "function" == typeof c && c instanceof c) && "constructor" in e && "constructor" in t) return !1
          }
          r = r || [];
          for (var u = (n = n || []).length; u--;)
            if (n[u] === e) return r[u] === t;
          if (n.push(e), r.push(t), i) {
            if ((u = e.length) !== t.length) return !1;
            for (; u--;)
              if (!this.$isEqual(e[u], t[u], n, r)) return !1
          } else {
            var l, p = Object.keys(e);
            u = p.length;
            if (Object.keys(t).length !== u) return !1;
            for (; u--;)
              if (l = p[u], !this.$has(t, l) || !this.$isEqual(e[l], t[l], n, r)) return !1
          }
          return n.pop(), r.pop(), !0
        },
        $has: function(e, t) {
          if ("[object Array]" !== toString.call(t)) return e && hasOwnProperty.call(e, t);
          for (var n = t.length, a = 0; a < n; a++) {
            var r = t[a];
            if (!e || !hasOwnProperty.call(e, r)) return !1;
            e = e[r]
          }
          return !!n
        },
        $extend: function() {
          var e, t, n, r, i, o = arguments[0] || {},
            s = 1,
            c = arguments.length,
            u = !1;
          for ("boolean" == typeof o && (u = o, o = arguments[s] || {}, s++), "object" !== (void 0 === o ? "undefined" : a(o)) && "function" != typeof o && (o = {}), s === c && (o = this, s--); s < c; s++)
            if (e = arguments[s])
              for (t in e) i = o[t], o !== (n = e[t]) && (u && n && (this.$isPlainObject(n) || (r = Array.isArray(n))) ? (i = r ? (r = !1, i && Array.isArray(i) ? i : []) : i && this.$isPlainObject(i) ? i : {}, o[t] = this.$extend(u, i, n)) : o[t] = n);
          return o
        },
        $copy: function(e) {
          var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
          return Array.isArray(e) ? this.$extend(t, [], e) : "" + e != "null" && "object" === (void 0 === e ? "undefined" : a(e)) ? this.$extend(t, {}, e) : e
        },
        $isPlainObject: function(e) {
          return !(!e || "[object Object]" !== Object.prototype.toString.call(e) || (e = Object.getPrototypeOf(e)) && ("function" != typeof(e = Object.prototype.hasOwnProperty.call(e, "constructor") && e.constructor) || Object.prototype.hasOwnProperty.toString.call(e) !== Object.prototype.hasOwnProperty.toString.call(Object)))
        },
        $resolvePath: function(e, t) {
          var n;
          return t ? "/" === t[0] ? (t = t.substr(1), this.$resolvePath("", t)) : "." !== t[0] ? this.$resolvePath(e, "./" + t) : (n = e.split("/"), "." === t[0] && "/" === t[1] ? "." !== (t = t.substr(2))[0] ? (n.length ? n[n.length - 1] = t : n = [t], 1 === n.length ? "/" + n[0] : n.join("/")) : this.$resolvePath(n.join("/"), t) : "." === t[0] && "." === t[1] && "/" === t[2] ? (t = t.replace(/^\.*/gi, ""), n.pop(), this.$resolvePath(n.join("/"), "." + t)) : "." === t[0] ? this.$resolvePath(e, t.substr(1)) : void 0) : e
        },
        $getParams: function(e) {
          var t, n = {},
            a = e.indexOf("?");
          return -1 !== a && (e = e.substr(a + 1), t = void 0, e.split("&").forEach((function(e) {
            t = e.split("="), n[t[0]] = decodeURIComponent(t[1])
          }))), n
        }
      }
    },
    89: function(e, t, n) {},
    9: function(e, t, n) {
      n.d(t, "a", (function() {
        return r
      }));
      var a = n(50),
        r = function(e) {
          return {
            type: a.c,
            xybdata: e
          }
        }
    },
    951: function(e, t, n) {
      e.exports = n.p + "tenthBag/pages/aiSalaryEvaluation/Inc/SalaryContext.wxml"
    },
    994: function(e, t, n) {}
  }
]);