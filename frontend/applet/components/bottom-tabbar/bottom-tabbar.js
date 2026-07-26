require("../../@babel/runtime/helpers/Arrayincludes");
var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [51], {
    2212: function(t, e, o) {
      o(657)
    },
    2213: function(t, e, o) {},
    3475: function(e, o, a) {
      a.r(o), a(2212);
      var n = a(0),
        r = a.n(n),
        i = (o = a(4), o = a.n(o), a(1)),
        s = a(21),
        u = (a(2213), a(2)),
        c = a(6),
        p = a(9),
        g = a(8),
        l = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var o = [],
              a = !0,
              n = !1,
              r = void 0;
            try {
              for (var i, s = t[Symbol.iterator](); !(a = (i = s.next()).done) && (o.push(i.value), !e || o.length !== e); a = !0);
            } catch (t) {
              n = !0, r = t
            } finally {
              try {
                !a && s.return && s.return()
              } finally {
                if (n) throw r
              }
            }
            return o
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        },
        h = function(t, e, o) {
          return e && m(t.prototype, e), o && m(t, o), t
        };

      function m(t, e) {
        for (var o = 0; o < e.length; o++) {
          var a = e[o];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a)
        }
      }

      function f(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var d = r.a.getApp();
      h = Object(c.connect)((function(t) {
        return {
          xybData: t.xybData
        }
      }), (function(t) {
        return {
          setxybdata: function(e) {
            t(Object(p.a)(e))
          }
        }
      }))(u = o()({
        properties: {
          barFlag: {
            type: Number,
            value: 1
          },
          studentFunctionModules: {
            type: Array,
            value: []
          },
          fromWhere: {
            type: String,
            value: ""
          }
        },
        data: {
          showFlag: !0,
          showBottom: !1,
          msgAccount: 0,
          ifIphoneX: !1,
          showGrowUp: !1,
          unreadTalkFlag: !1,
          showGrowTip: !1,
          growNum: 0
        },
        pageLifetimes: {
          show: function() {},
          hide: function() {},
          resize: function() {}
        },
        componentDidShow: function() {
          var t = this;
          d.watch("isLogin", (function(e) {
            e && t.getUreadMsg()
          }))
        },
        ready: function() {
          2 == r.a.getStorageSync("userType") ? this.setData({
            showFlag: !1
          }) : this.setData({
            showFlag: !0
          });
          var t = this;
          t.getShowPracticeMenuBarRedPoint(), Object(g.a)({
            success: function(e) {
              var o;
              e && (o = !1, (o = e && e.system && "function" == typeof e.system.toLowerCase ? !!(e.system.toLowerCase().search("ios") + 1) : o) && (44 <= e.statusBarHeight ? t.setData({
                ifIphoneX: !0
              }) : t.setData({
                ifIphoneX: !1
              }), t.getContainerHeight()), e.safeArea.bottom < e.screenHeight) && (t.setData({
                ifIphoneX: !0
              }), t.getContainerHeight())
            }
          }), this.setData({
            showBottom: !0
          })
        },
        getContainerHeight: function() {
          var t = this;
          r.a.nextTick((function() {
            r.a.createSelectorQuery().in(t.$scope).select("#bottom_bar").boundingClientRect((function(e) {
              var o;
              e && ((o = t.props.xybData).bottomBarHeight = e.height, t.props.setxybdata(o))
            })).exec()
          }))
        },
        methods: {
          getShowPracticeMenuBarRedPoint: function() {
            var t = this;
            i.a.xyb_request("common/ShowPractice!menuBarRedPoint.action", "POST", {}, !1, !1).then((function(e) {
              e.data && e.data.show && t.setData({
                showGrowUp: !0
              })
            }), (function(t) {}))
          },
          clickBottomBar: function() {},
          jumpFind: function() {
            r.a.eventCenter.trigger("taroClick", {
              funName: "tab栏-机会",
              itemId: this.data.fromWhere
            }), this.commonDataStatistics("jumpFind"), r.a.reLaunch({
              url: "/pages/find/index/index"
            })
          },
          jumpGrowup: function() {
            r.a.eventCenter.trigger("taroClick", {
              funName: "tab栏-实习成长",
              itemId: this.data.fromWhere
            }), this.commonDataStatistics("jumpGrowup"), r.a.reLaunch({
              url: "/ninthBag/pages/growup/growup"
            })
          },
          jumpMessage: function() {
            r.a.eventCenter.trigger("taroClick", {
              funName: "tab栏-消息",
              itemId: this.data.fromWhere
            }), this.commonDataStatistics("jumpMessage"), r.a.reLaunch({
              url: "/fourthBag/pages/message/index/index"
            })
          },
          jumpMine: function() {
            r.a.eventCenter.trigger("taroClick", {
              funName: "tab栏-我的",
              itemId: this.data.fromWhere
            }), this.commonDataStatistics("jumpMine"), r.a.reLaunch({
              url: "/fourthBag/pages/mine/index/index"
            })
          },
          commonDataStatistics: function(t) {
            var e = r.a.getCurrentPages() ? r.a.getCurrentPages()[0] : {},
              o = void 0;
            e.__displayReporter && e.__displayReporter.showReferpagepath && (o = e.__displayReporter.showReferpagepath.split(".")[0]), s.a.commonDataStatistics("click", e.route, o, "", t, "", "")
          },
          getUreadMsg: Object(u.debounce)((function() {
            var t = this,
              e = d.globalData.getMsgNumTime,
              o = Date.now(),
              a = d.globalData.getMsgData;
            e && o - e < 3e4 && a ? this.setData(a) : (d.globalData.getMsgNumTime = o, d.globalData.isLogin && i.a.xyb_request("client/message/ClientMessage!getTotalUnreadNum.action", "POST", {}, !1, !1).then((function(e) {
              var o = {
                msgAccount: e.data && e.data.total ? e.data.total : 0,
                unreadTalkFlag: !(!e.data || !e.data.unreadTalkFlag) && e.data.unreadTalkFlag
              };
              d.globalData.getMsgData = o, t.setData(o), t.props.ongetTotalUnreadNum && t.props.ongetTotalUnreadNum(e.data)
            }), (function(e) {
              t.setData({
                msgAccount: 0
              })
            })))
          }), 800),
          getTip: function() {
            var t = this;
            d.globalData.isLogin && (r.a.getStorageSync("growTip") ? r.a.getStorageSync("jobTip") || this.setData({
              showGrowTip: !1
            }) : i.a.xyb_request("student/practiceplan/PracticePlanList!getUnSignPlansByStudentId.action", "POST", {}, !1, !1).then((function(e) {
              e.data && 0 < e.data.length ? t.setData({
                growNum: e.data.length,
                showGrowTip: !0
              }) : r.a.getStorageSync("jobTip") || t.setData({
                showGrowTip: !1
              })
            }), (function(t) {})))
          }
        }
      })((function(e, o) {
        if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + t(o));
        e.prototype = Object.create(o && o.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : e.__proto__ = o)
      }(y, r.a.Component), h(y, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, o, a) {
            null === e && (e = Function.prototype);
            var n = Object.getOwnPropertyDescriptor(e, o);
            return void 0 !== n ? "value" in n ? n.value : void 0 !== (n = n.get) ? n.call(a) : void 0 : null !== (n = Object.getPrototypeOf(e)) ? t(n, o, a) : void 0
          })(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "_constructor", this).call(this, t), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            o = (e = Object(n.genCompid)(e + "$compid__2704"), (e = l(e, 2))[0]),
            a = (e = e[1], (h = this.data).ifIphoneX),
            i = h.barFlag,
            s = h.showFlag,
            u = h.showGrowUp,
            c = h.msgAccount,
            p = h.unreadTalkFlag,
            g = (h.showGrowTip, h.growNum, h.showBottom),
            h = h.studentFunctionModules,
            m = r.a.getStorageSync("schoolId");
          this.anonymousFunc0 = function(e) {
            e.stopPropagation(), t.clickBottomBar(e)
          }, this.anonymousFunc1 = function(e) {
            e.stopPropagation(), t.jumpFind(e)
          }, this.anonymousFunc2 = function(e) {
            e.stopPropagation(), t.jumpGrowup(e)
          }, this.anonymousFunc3 = function(e) {
            e.stopPropagation(), t.jumpMessage(e)
          }, this.anonymousFunc4 = function(e) {
            e.stopPropagation(), t.jumpMine(e)
          }, h = !(h.includes("OPPORTUNITY_RECOMMENDATION") && h.includes("OPPORTUNITY_CAREER_GUIDANCE"));
          return g && "13319" != m && n.propsManager.set({
            className: "unreadTalkFlag",
            showNum: !1,
            msgNum: p && 0 == c
          }, e, o), Object.assign(this.__state, {
            anonymousState__temp: h,
            $compid__2704: e,
            showBottom: g,
            ifIphoneX: a,
            barFlag: i,
            showFlag: s,
            showGrowUp: u,
            schoolId: m,
            msgAccount: c
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc1",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc2",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc3",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc4",
        value: function(t) {
          t.stopPropagation()
        }
      }]), o = c = y, c.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4"], c.$$componentPath = "components/bottom-tabbar/bottom-tabbar", u = o)) || u) || u;

      function y() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, y);
        for (var o = arguments.length, a = Array(o), n = 0; n < o; n++) a[n] = arguments[n];
        return (t = e = f(this, (e = y.__proto__ || Object.getPrototypeOf(y)).call.apply(e, [this].concat(a)))).$usedState = ["anonymousState__temp", "$compid__2704", "showBottom", "ifIphoneX", "barFlag", "showFlag", "showGrowUp", "schoolId", "msgAccount", "xybData", "setxybdata"], e.config = {
          component: !0
        }, e.customComponents = ["MsgDot"], f(e, t)
      }
      Component(a(0).default.createComponent(h))
    },
    657: function(t, e, o) {
      t.exports = o.p + "components/bottom-tabbar/bottom-tabbar.wxml"
    }
  },
  [
    [3475, 0, 2, 1, 3]
  ]
]);