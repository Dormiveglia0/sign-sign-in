var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [70], {
    2051: function(t, e, a) {
      a(580)
    },
    2052: function(t, e, a) {},
    3399: function(e, a, o) {
      o.r(a), o(2051);
      var n = o(8),
        r = o(0),
        i = o.n(r),
        s = (a = o(4), a = o.n(a), o(1)),
        c = (o(2052), function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var a = [],
              o = !0,
              n = !1,
              r = void 0;
            try {
              for (var i, s = t[Symbol.iterator](); !(o = (i = s.next()).done) && (a.push(i.value), !e || a.length !== e); o = !0);
            } catch (t) {
              n = !0, r = t
            } finally {
              try {
                !o && s.return && s.return()
              } finally {
                if (n) throw r
              }
            }
            return a
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }),
        u = function(t, e, a) {
          return e && p(t.prototype, e), a && p(t, a), t
        };

      function p(t, e) {
        for (var a = 0; a < e.length; a++) {
          var o = e[a];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }

      function h(e, a) {
        if (e) return !a || "object" != t(a) && "function" != typeof a ? e : a;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var l = i.a.getApp();
      u = a()({
        data: {
          noData: !1,
          courseList: [],
          pageIndex: 1,
          maxPage: "",
          hasMore: !0,
          maxHeight: "",
          showChatFlag: !1,
          sphereInfo: {
            status: !1,
            content: ""
          }
        },
        startTime: null,
        onLoad: function(t) {
          this.loadInfo(), this.getCourseList(1), this.isAddWx(), this.startTime = Date.now()
        },
        onUnload: function() {
          var t = this.startTime,
            e = Date.now();
          e = parseInt((e - t) / 1e3);
          i.a.eventCenter.trigger("taroClick", {
            funName: "课程停留",
            stayTime: e
          })
        },
        onShow: function() {},
        errorFunction: function(t) {
          t = t.currentTarget.dataset.index, this.setData(function(t, e, a) {
            return e in t ? Object.defineProperty(t, e, {
              value: a,
              enumerable: !0,
              configurable: !0,
              writable: !0
            }) : t[e] = a, t
          }({}, "handleList[" + t + "].photograph", "https://xcxstatic.xybsyw.com/static/avatar_man.png"))
        },
        jumpNewPeople: function() {
          i.a.eventCenter.trigger("taroClick", {
            funName: "新手指引"
          }), i.a.navigateTo({
            url: "/ninthBag/pages/NoviceTaskGift/NoviceTaskGift"
          })
        },
        scrollToLower: function() {
          var t = this.data.pageIndex + 1;
          this.data.hasMore && (this.setData({
            pageIndex: t
          }), this.getCourseList())
        },
        loadInfo: function() {
          this.setData({
            ifIphoneX: l.globalData.isIphoneX
          });
          var t = this;
          setTimeout((function() {
            Object(n.a)({
              success: function(e) {
                var a = e && e.screenHeight ? e.screenHeight : 0,
                  o = t.data.ifIphoneX ? 80 : 50,
                  n = !!e.system && -1 < e.system.indexOf("iOS");
                e = e.statusBarHeight + (n ? 44 : 48);
                t.setData({
                  maxHeight: a - e - o
                })
              }
            })
          }), 500)
        },
        getCourseList: function(t, e) {
          var a = this,
            o = this;
          s.a.xyb_request("client/course/loadCourseList.action", "POST", {
            page: this.data.pageIndex,
            pageSize: 10
          }, !1, !1).then((function(o) {
            var n = a,
              r = (t && n.setData({
                courseList: []
              }), n.data.courseList),
              i = (o.data.list || []).forEach((function(t) {
                r.push(t)
              }));
            i = 0 != o.data.MaxPage && o.data.MaxPage != a.data.pageIndex;
            n.setData({
              courseList: r,
              maxPage: o.data.MaxPage,
              hasMore: i
            }, (function() {
              t && n.setData({
                showChatFlag: !0
              })
            })), e && e(o)
          }), (function(e) {
            a.setData({
              pageIndex: 1,
              maxPage: "",
              hasMore: !0
            }), t && o.setData({
              showChatFlag: !0
            })
          }))
        },
        goDetail: function(t) {
          i.a.eventCenter.trigger("taroClick", {
            funName: "课程-跳转详情"
          }), t = t.currentTarget.dataset.id, i.a.navigateTo({
            url: "/pages/courseDetails/courseDetails?id=" + t
          })
        },
        jumpToPrivateSphere: function() {
          i.a.eventCenter.trigger("taroClick", {
            funName: "跳转到私域二维码页面"
          }), i.a.navigateTo({
            url: "/thirdBag/pages/privateSphere/privateSphere?groupId=" + this.data.sphereInfo.groupId + "&sphereCode=COURSE"
          })
        },
        isAddWx: function() {
          var t = this;
          return new Promise((function(e, a) {
            var o = i.a.getStorageSync("unionid");
            if (!o) return !1;
            s.a.xyb_request("sphere/sphereInfo.action", "POST", {
              unionId: o,
              sphereCode: "COURSE"
            }, !1, !1).then((function(a) {
              "200" == a.code && (a.data && a.data.status && a.data.status && i.a.eventCenter.trigger("taroClick", {
                funName: "私域入口埋点",
                itemId: a.data.groupId,
                itemTypeName: "COURSE"
              }), t.setData({
                sphereInfo: a.data
              }), e(a.data))
            }), (function(t) {}))
          }))
        }
      })((function(e, a) {
        if ("function" != typeof a && null !== a) throw new TypeError("Super expression must either be null or a function, not " + t(a));
        e.prototype = Object.create(a && a.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), a && (Object.setPrototypeOf ? Object.setPrototypeOf(e, a) : e.__proto__ = a)
      }(f, i.a.Component), u(f, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, a, o) {
            null === e && (e = Function.prototype);
            var n = Object.getOwnPropertyDescriptor(e, a);
            return void 0 !== n ? "value" in n ? n.value : void 0 !== (n = n.get) ? n.call(o) : void 0 : null !== (n = Object.getPrototypeOf(e)) ? t(n, a, o) : void 0
          })(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            a = Object(r.genCompid)(e + "$compid__2786"),
            o = (a = c(a, 2))[0],
            n = (a = a[1], (h = this.data).courseList),
            i = h.hasMore,
            s = h.maxPage,
            u = h.maxHeight,
            p = h.showChatFlag,
            h = (h.isAddWxFlag, h.sphereInfo),
            l = p ? n.map((function(a, o) {
              a = {
                $original: Object(r.internal_get_original)(a)
              };
              var n = Object(r.genCompid)(e + "bhcjzzzzzz" + o, !0),
                i = (n = c(n, 2))[0];
              n = n[1];
              return p && r.propsManager.set({
                itemData: a.$original,
                itemIndex: o,
                taskComplete: t.__props.taskComplete
              }, n, i), {
                $compid__2785: n,
                $original: a.$original
              }
            })) : [];
          return p && i && 1 < s && r.propsManager.set({
            color: "#ff453a",
            size: 26,
            content: "加载中...",
            mode: "center"
          }, a, o), Object.assign(this.__state, {
            loopArray1377: l,
            $compid__2786: a,
            sphereInfo: h,
            showChatFlag: p,
            maxHeight: u,
            courseList: n,
            hasMore: i,
            maxPage: s
          }), this.__state
        }
      }]), u = a = f, a.$$events = ["jumpToPrivateSphere", "scrollToLower", "jumpNewPeople"], a.$$componentPath = "components/myCourse/myCourse", a = u)) || a;

      function f() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, f);
        for (var a = arguments.length, o = Array(a), n = 0; n < a; n++) o[n] = arguments[n];
        return (t = e = h(this, (e = f.__proto__ || Object.getPrototypeOf(f)).call.apply(e, [this].concat(o)))).$usedState = ["loopArray1377", "$compid__2786", "sphereInfo", "showChatFlag", "maxHeight", "courseList", "hasMore", "maxPage", "taskComplete"], e.config = {
          navigationBarTitleText: "我的课程",
          usingComponents: {}
        }, e.customComponents = ["Itemcourse", "AtActivityIndicator"], h(e, t)
      }
      Component(o(0).default.createComponent(u))
    },
    580: function(t, e, a) {
      t.exports = a.p + "components/myCourse/myCourse.wxml"
    }
  },
  [
    [3399, 0, 2, 1, 3]
  ]
]);