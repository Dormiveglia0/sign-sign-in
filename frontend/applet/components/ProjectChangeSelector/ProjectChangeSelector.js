var n = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [40], {
    2288: function(n, e, t) {
      t(698)
    },
    2289: function(n, e, t) {},
    3516: function(e, t, o) {
      o.r(t), o(2288);
      t = o(3);
      var r = o.n(t),
        a = (o(2289), o(0)),
        i = o.n(a),
        u = (t = o(5), o.n(t)),
        c = o(12),
        s = o(1),
        p = o(18),
        l = o(2),
        d = function(n, e) {
          if (Array.isArray(n)) return n;
          if (Symbol.iterator in Object(n)) return function(n, e) {
            var t = [],
              o = !0,
              r = !1,
              a = void 0;
            try {
              for (var i, u = n[Symbol.iterator](); !(o = (i = u.next()).done) && (t.push(i.value), !e || t.length !== e); o = !0);
            } catch (n) {
              r = !0, a = n
            } finally {
              try {
                !o && u.return && u.return()
              } finally {
                if (r) throw a
              }
            }
            return t
          }(n, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      t = function(n, e, t) {
        return e && f(n.prototype, e), t && f(n, t), n
      };

      function f(n, e) {
        for (var t = 0; t < e.length; t++) {
          var o = e[t];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(n, o.key, o)
        }
      }
      var y;

      function m(n) {
        return function() {
          var e = n.apply(this, arguments);
          return new Promise((function(n, t) {
            return function o(r, a) {
              try {
                var i = e[r](a),
                  u = i.value
              } catch (r) {
                return void t(r)
              }
              if (!i.done) return Promise.resolve(u).then((function(n) {
                o("next", n)
              }), (function(n) {
                o("throw", n)
              }));
              n(u)
            }("next")
          }))
        }
      }

      function h(e, t) {
        if (e) return !t || "object" != n(t) && "function" != typeof t ? e : t;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function v() {
        var n, e;
        ! function(n, e) {
          if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, v);
        for (var t = arguments.length, o = Array(t), r = 0; r < t; r++) o[r] = arguments[r];
        return (n = e = h(this, (e = v.__proto__ || Object.getPrototypeOf(v)).call.apply(e, [this].concat(o)))).config = {
          usingComponents: {
            "van-search": "../../vant-weapp/dist/search/index"
          }
        }, e.$usedState = ["loopArray1301", "$compid__2625", "$compid__2626", "$compid__2627", "visible", "searchValue", "isEmpty", "list", "current"], e.anonymousFunc5Map = {}, e.anonymousFunc6Map = {}, e.customComponents = ["Popup", "AdvisorSelector", "AdvisorPopup"], h(e, n)
      }(function(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + n(t));
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
      })(v, i.a.Component), t(v, [{
        key: "_constructor",
        value: function(n) {
          (function n(e, t, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, t);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? n(r, t, o) : void 0
          })(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "_constructor", this).call(this, n), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var n, e = this,
            t = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            o = Object(a.genCompid)(t + "$compid__2625"),
            f = (o = d(o, 2))[0],
            y = (o = o[1], Object(a.genCompid)(t + "$compid__2626")),
            h = (y = d(y, 2))[0],
            v = (y = y[1], t = Object(a.genCompid)(t + "$compid__2627"), (t = d(t, 2))[0]),
            g = (t = t[1], this.__props),
            j = g.visible,
            b = g.onClose,
            I = g.onSelect,
            _ = g.runSignUpBeforeCheck,
            $ = Object(a.useState)(-1),
            F = ($ = d($, 2))[0],
            P = $[1],
            C = ($ = Object(a.useState)(""), ($ = d($, 2))[0]),
            O = $[1],
            x = Object(a.useRef)(null),
            w = Object(a.useRef)(null),
            S = function(n, e) {
              n === F ? P(-1) : (P(n), I && I(e))
            },
            D = ($ = function(n) {
              O(n.detail)
            }, function() {
              R()
            }),
            k = function(n) {
              return n = {
                page: n,
                pageSize: 10,
                key: C,
                planId: g.planId,
                projectId: g.projectId,
                projectDateId: g.projectDateId
              }, s.a.xyb_request("student/practiceplan/loadCanChangeProject.action", "POST", n, !1, !1)
            },
            A = (k = Object(c.a)(k)).dataList,
            M = k.clearData,
            T = k.handleScrollToLower,
            E = (k = k.isEmpty, Object(a.useMemo)((function() {
              return A && 0 !== A.length ? A : []
            }), [A])),
            R = Object(p.a)((function() {
              P(-1), M()
            })),
            L = (n = m(r.a.mark((function n() {
              var t, o, a;
              return r.a.wrap((function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    if (-1 === F) return n.abrupt("return");
                    n.next = 2;
                    break;
                  case 2:
                    if (t = E[F], o = "", 0 < t.optionalCount && 0 < t.optionalAdviserCount && t.optionalCount !== t.optionalAdviserCount) return n.next = 7, x.current.selectAdvisor({
                      planId: g.planId,
                      projectDateId: t.id,
                      limitLength: t.optionalCount,
                      needPosition: t.needPost
                    });
                    n.next = 10;
                    break;
                  case 7:
                    if (o = n.sent) {
                      n.next = 10;
                      break
                    }
                    return n.abrupt("return");
                  case 10:
                    if (t.needPost) return a = g.group, g.onClose && g.onClose(), n.next = 15, _({
                      planId: g.planId,
                      projectId: t.projectId,
                      projectDateId: t.id,
                      moduleId: t.moduleId,
                      oldProjectDateId: g.projectDateId,
                      studentId: g.studentId,
                      onProceed: function() {
                        1 === t.moduleId ? i.a.navigateTo({
                          url: "/fourthBag/pages/practice/submitPostInfo/submitPostInfo?projectid=" + t.projectId + "&projectDateId=" + t.id + "&showPosts=1&oldProjectDateId=" + g.projectDateId + "&teacherStr=" + o
                        }) : i.a.navigateTo({
                          url: "/fourthBag/pages/practice/submitCenterPostInfo/submitCenterPostInfo?projectDateId=" + t.id + "&projectId=" + t.projectId + "&date=" + a.startDate + "-" + a.endDate + "&signUpId=" + a.signUpId + "&oldProjectDateId=" + g.projectDateId + "&teacherStr=" + o + "&needEnt=" + ("NEED_APPLY_POST" === t.joinType)
                        })
                      }
                    });
                    n.next = 17;
                    break;
                  case 15:
                    n.next = 20;
                    break;
                  case 17:
                    return g.onClose && g.onClose(), n.next = 20, _({
                      planId: g.planId,
                      projectId: t.projectId,
                      projectDateId: t.id,
                      moduleId: t.moduleId,
                      oldProjectDateId: g.projectDateId,
                      studentId: g.studentId,
                      onProceed: function() {
                        s.a.xyb_request("student/practiceplan/applyChangeProject.action", "POST", {
                          projectDateId: g.projectDateId,
                          projectId: g.projectId,
                          planId: g.planId,
                          changeId: t.id,
                          teacherStr: o
                        }).then((function(n) {
                          i.a.showToast({
                            title: "操作成功！",
                            icon: "none"
                          })
                        }))
                      }
                    });
                  case 20:
                  case "end":
                    return n.stop()
                }
              }), n, e)
            }))), function() {
              return n.apply(this, arguments)
            }),
            q = function(n, e) {
              w.current && w.current.viewAdvisor({
                planId: g.planId,
                projectId: n || 0,
                projectDateId: e || 0
              })
            };
          Object(a.useEffect)((function() {
            j && R()
          }), [j]), this.anonymousFunc0 = b, this.anonymousFunc1 = $, this.anonymousFunc2 = D, this.anonymousFunc3 = D, this.anonymousFunc4 = T, this.anonymousFunc7 = L, this.anonymousFunc8 = function(n) {
            return x.current = n
          }, this.anonymousFunc9 = function(n) {
            return w.current = n
          }, b = E.map((function(n, t) {
            n = {
              $original: Object(a.internal_get_original)(n)
            };
            var o = "bfjjz" + t,
              r = (e.anonymousFunc5Map[o] = function() {
                return S(t, n.$original)
              }, u()("icon plan-checkbox", t === F ? "icon-xiaotubiao-duoxuan-yigouxuan1" : "icon-xiaotubiao-duoxuan-weigouxuan")),
              i = 0 < n.$original.optionalAdviserCount ? n.$original.optionalAdvisers && n.$original.optionalAdvisers.length ? n.$original.optionalAdvisers.join("、") : "" : null,
              c = "bgaaz" + t;
            return e.anonymousFunc6Map[c] = function() {
              return q(n.$original.projectId, n.$original.id)
            }, {
              _$indexKey: o,
              $loopState__temp2: r,
              $loopState__temp4: i,
              _$indexKey2: c,
              $loopState__temp6: 0 < n.$original.optionalAdviserCount ? Object(l.getSafeData)(n.$original, "optionalAdvisers.length", "number", 0) : null,
              $loopState__temp8: n.$original.advisers && n.$original.advisers.length ? n.$original.advisers.join("、") : "",
              $original: n.$original
            }
          }));
          return a.propsManager.set({
            isOpened: j,
            onClose: this.anonymousFunc0,
            needTitle: !0,
            title: "请选择需要更换的项目"
          }, o, f), a.propsManager.set({
            onRef: this.anonymousFunc8
          }, y, h), a.propsManager.set({
            onRef: this.anonymousFunc9
          }, t, v), Object.assign(this.__state, {
            loopArray1301: b,
            $compid__2625: o,
            $compid__2626: y,
            $compid__2627: t,
            visible: j,
            searchValue: C,
            isEmpty: k,
            list: E,
            current: F
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(n) {}
      }, {
        key: "anonymousFunc1",
        value: function(n) {}
      }, {
        key: "anonymousFunc2",
        value: function(n) {}
      }, {
        key: "anonymousFunc3",
        value: function(n) {}
      }, {
        key: "anonymousFunc4",
        value: function(n) {}
      }, {
        key: "anonymousFunc5",
        value: function(n) {
          for (var e, t = arguments.length, o = Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) o[r - 1] = arguments[r];
          return this.anonymousFunc5Map[n] && (e = this.anonymousFunc5Map)[n].apply(e, o)
        }
      }, {
        key: "anonymousFunc6",
        value: function(n) {
          for (var e, t = arguments.length, o = Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) o[r - 1] = arguments[r];
          return this.anonymousFunc6Map[n] && (e = this.anonymousFunc6Map)[n].apply(e, o)
        }
      }, {
        key: "anonymousFunc7",
        value: function(n) {}
      }, {
        key: "anonymousFunc8",
        value: function(n) {}
      }, {
        key: "anonymousFunc9",
        value: function(n) {}
      }]), y = t = v, t.$$events = ["anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5", "anonymousFunc6", "anonymousFunc7"], t.$$componentPath = "components/ProjectChangeSelector/ProjectChangeSelector", (t = y).options = {
        addGlobalClass: !0
      }, t.config = {
        usingComponents: {
          "van-search": "../../vant-weapp/dist/search/index"
        }
      }, Component(o(0).default.createComponent(t))
    },
    698: function(n, e, t) {
      n.exports = t.p + "components/ProjectChangeSelector/ProjectChangeSelector.wxml"
    }
  },
  [
    [3516, 0, 2, 1, 3]
  ]
]);