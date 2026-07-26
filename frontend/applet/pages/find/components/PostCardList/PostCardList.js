var t = require("../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [640], {
    2894: function(t, e, o) {
      o(998)
    },
    2895: function(t, e, o) {},
    3808: function(e, o, n) {
      n.r(o), n(2894);
      var i = n(0),
        s = n.n(i),
        a = (o = (n(2895), n(6)), n(9)),
        r = n(21),
        c = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
          return t(e)
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : t(e)
        },
        p = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var o = [],
              n = !0,
              i = !1,
              s = void 0;
            try {
              for (var a, r = t[Symbol.iterator](); !(n = (a = r.next()).done) && (o.push(a.value), !e || o.length !== e); n = !0);
            } catch (t) {
              i = !0, s = t
            } finally {
              try {
                !n && r.return && r.return()
              } finally {
                if (i) throw s
              }
            }
            return o
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        },
        l = Object.assign || function(t) {
          for (var e = 1; e < arguments.length; e++) {
            var o, n = arguments[e];
            for (o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
          }
          return t
        },
        u = function(t, e, o) {
          return e && f(t.prototype, e), o && f(t, o), t
        };

      function f(t, e) {
        for (var o = 0; o < e.length; o++) {
          var n = e[o];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }

      function h(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function g() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, g);
        for (var o = arguments.length, n = Array(o), i = 0; i < o; i++) n[i] = arguments[i];
        return (t = e = h(this, (e = g.__proto__ || Object.getPrototypeOf(g)).call.apply(e, [this].concat(n)))).$usedState = ["loopArray1069", "$compid__2212", "$compid__2213", "$compid__2214", "jobHuntInfo", "postList", "showMoreButton", "hasScorll", "hasMore", "maxPage", "hasLiving", "activatePopFlag", "activateDate", "intentionStatus", "toJobobjective", "xybData", "briefingSessionList", "doubleChoiceSession", "isLogin", "binderrorimg", "resumeCompleteProcess", "postTotal", "toposDetail", "jobTipPreference", "__fn_onClick", "page", "onClickShowMore", "onEditJobobjective", "onSelectCity"], e.config = {
          usingComponents: {
            "van-icon": "../../../../vant-weapp/dist/icon/index"
          },
          componentPlaceholder: {
            "custom-size-ad": "view"
          }
        }, e.observer = null, e.postListDataLength = 0, e.copyPostList = [], e.isFirstObserve = !0, e.anonymousFunc0Map = {}, e.anonymousFunc1Map = {}, e.customComponents = ["PostCard", "CustomSizeAd", "AtActivityIndicator", "BottomBlock", "LiveBroadcastBar"], h(e, t)
      }(u = Object(o.connect)((function(t) {
        return {
          xybData: t.xybData
        }
      }), (function(t) {
        return {
          setxybdata: function(e) {
            t(Object(a.a)(e))
          }
        }
      }))((function(e, o) {
        if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + t(o));
        e.prototype = Object.create(o && o.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : e.__proto__ = o)
      }(g, s.a.Component), u(g, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, o, n) {
            null === e && (e = Function.prototype);
            var i = Object.getOwnPropertyDescriptor(e, o);
            return void 0 !== i ? "value" in i ? i.value : void 0 !== (i = i.get) ? i.call(n) : void 0 : null !== (i = Object.getPrototypeOf(e)) ? t(i, o, n) : void 0
          })(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "_constructor", this).call(this, t), this.state = {
            activatePopFlag: !1
          }, this.$$refs = new s.a.RefsArray
        }
      }, {
        key: "componentWillMount",
        value: function() {
          var t = this.props.activateDate,
            e = this.props.jobHuntInfo;
          t && e.locations && 0 == e.locations.length && (t = (e = new Date).getTime() - 1e3 * t, (t = Math.ceil(t / 864e5)) <= 15 ? 3 !== t && 7 !== t && 14 !== t || (s.a.eventCenter.trigger("taroClick", {
            funName: "岗位不合适卡片曝光数弹出注册后的第3天、第7天或第14天"
          }), this.setState({
            activatePopFlag: !0
          })) : s.a.getStorageSync("activateCloseTime") ? (t = s.a.getStorageSync("activateCloseTime"), e = e.getTime() - t, 14 <= Math.ceil(e / 864e5) && (this.setState({
            activatePopFlag: !0
          }), s.a.eventCenter.trigger("taroClick", {
            funName: "岗位不合适卡片曝光数弹出每两周"
          }))) : (s.a.eventCenter.trigger("taroClick", {
            funName: "岗位不合适卡片曝光数弹出每两周"
          }), this.setState({
            activatePopFlag: !0
          }))), this.postListDataLength = this.props.postList.length, this.copyPostList = JSON.parse(JSON.stringify(this.props.postList.map((function(t) {
            return l({}, t, {
              isExpose: !1,
              startExposeTime: 0
            })
          })))), this.initObserver(), this.props.onRef && this.props.onRef(this)
        }
      }, {
        key: "componentDidShow",
        value: function() {}
      }, {
        key: "componentWillReceiveProps",
        value: function(t) {
          var e = this;
          this.postListDataLength !== t.postList.length && (this.copyPostList = JSON.parse(JSON.stringify(t.postList.map((function(t, o) {
            return o = e.copyPostList[o], l({}, t, {
              isExpose: !!o && o.isExpose,
              startExposeTime: o ? o.startExposeTime : 0
            })
          })))), 1 === t.page && (this.isFirstObserve = !0), setTimeout((function() {
            return e.initObserver()
          }), 100)), this.postListDataLength = t.postList.length
        }
      }, {
        key: "componentDidHide",
        value: function() {}
      }, {
        key: "componentWillUnmount",
        value: function() {
          this.onHideExpose()
        }
      }, {
        key: "onHideExpose",
        value: function() {
          var t = this;
          this.copyPostList.forEach((function(e, o) {
            var n = e.id,
              i = (e.name, Date.now()),
              s = e.startExposeTime;
            i = parseInt((i - s) / 1e3);
            e.isExpose && 0 < i && r.a.commonDataStatistics("expose", "pages/find/index/index", "", i, "首页-岗位卡片曝光结束", n, t.props.intentionStatus + "", {
              singleReport: !0
            })
          }))
        }
      }, {
        key: "onShowExpose",
        value: function() {
          this.copyPostList.forEach((function(t) {
            t.isExpose && (t.startExposeTime = Date.now())
          }))
        }
      }, {
        key: "componentDidUnmount",
        value: function() {}
      }, {
        key: "toJobobjective",
        value: function() {
          this.props.toJobobjective && this.props.toJobobjective()
        }
      }, {
        key: "handleCross",
        value: function(t) {
          this.props.onClickCross(t)
        }
      }, {
        key: "handleLoginClick",
        value: function() {
          this.props && this.props.onLoginClick()
        }
      }, {
        key: "handleBottomClick",
        value: function(t) {
          switch (t) {
            case 1:
              this.handleLoginClick();
              break;
            case 2:
              s.a.eventCenter.trigger("taroClick", {
                funName: "跳转求职意向"
              }), s.a.navigateTo({
                url: "/videoBag/pages/jobintentionsetting/jobobjective/jobobjective?reconfirm=1"
              });
              break;
            case 3:
              s.a.eventCenter.trigger("taroClick", {
                funName: "完善教育经历"
              }), s.a.navigateTo({
                url: "/thirdBag/pages/myresume/index/index"
              })
          }
        }
      }, {
        key: "initObserver",
        value: function() {
          var t = this;
          this.observer && this.observer.disconnect(), this.observer = null, this.observer = s.a.createIntersectionObserver(this.$scope, {
            thresholds: [0, 1],
            initialRatio: this.isFirstObserve ? 0 : 1,
            observeAll: !0
          }), this.isFirstObserve = !1, this.observer.relativeToViewport({
            bottom: -this.props.xybData.bottomBarHeight,
            top: -this.props.xybData.statusBarHeight - 54
          }).observe(".post-item", (function(e) {
            var o, n, i, s;
            1 === e.intersectionRatio ? (o = e.dataset.id, e.dataset.name, n = e.dataset.index, r.a.commonDataStatistics("expose", "pages/find/index/index", "", "", "首页-岗位卡片曝光", o, t.props.intentionStatus + "", {
              singleReport: !0
            }), t.copyPostList[n].isExpose = !0, t.copyPostList[n].startExposeTime = Date.now()) : 0 === e.intersectionRatio && (o = e.dataset.id, e.dataset.name, n = e.dataset.index, e = t.copyPostList[n], s = Date.now(), i = e.startExposeTime, s = parseInt((s - i) / 1e3), e.isExpose && 0 < s && r.a.commonDataStatistics("expose", "pages/find/index/index", "", s, "首页-岗位卡片曝光结束", o, t.props.intentionStatus + "", {
              singleReport: !0
            }), t.copyPostList[n].isExpose = !1, t.copyPostList[n].startExposeTime = 0)
          }))
        }
      }, {
        key: "goSetPost",
        value: function() {
          s.a.eventCenter.trigger("taroClick", {
            funName: "岗位不合适卡片-跳转求职意向"
          }), s.a.navigateTo({
            url: "/videoBag/pages/jobintentionsetting/jobobjective/jobobjective?reconfirm=1&isIndex=1"
          })
        }
      }, {
        key: "closeHandle",
        value: function(t) {
          s.a.eventCenter.trigger("taroClick", {
            funName: "岗位不合适卡片-关闭注册激活弹窗"
          }), this.setState({
            activatePopFlag: !1
          }), s.a.setStorageSync("activateCloseTime", (new Date).getTime())
        }
      }, {
        key: "toEnterpriseList",
        value: function() {
          s.a.eventCenter.trigger("taroClick", {
            funName: "去看看名企岗位-空状态"
          }), s.a.navigateTo({
            url: "/secondBag/pages/enterpriseApplicationList/enterpriseApplicationList"
          })
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            o = Object(i.genCompid)(e + "$compid__2212"),
            n = (o = p(o, 2))[0],
            s = (o = o[1], Object(i.genCompid)(e + "$compid__2213")),
            a = (s = p(s, 2))[0],
            r = (s = s[1], Object(i.genCompid)(e + "$compid__2214")),
            c = (r = p(r, 2))[0],
            l = (r = r[1], (y = this.__props).postList),
            u = y.briefingSessionList,
            f = (y.doubleChoiceSession, y.hasMore),
            h = y.maxPage,
            g = (y.onSelectCity, y.onEditJobobjective, y.showMoreButton),
            b = (y.onClickShowMore, y.isLogin),
            d = y.jobHuntInfo,
            m = y.binderrorimg,
            v = y.hasScorll,
            y = (y.resumeCompleteProcess, y.postTotal, u.find((function(t) {
              return 0 === t.status
            })));
          u = l.map((function(o, n) {
            var s = (o = {
                $original: Object(i.internal_get_original)(o)
              }).$original.id + "-" + n,
              a = "bcjhz" + n,
              r = (t.anonymousFunc0Map[a] = function(e) {
                e.stopPropagation(), t.closeHandle(e)
              }, o.$original.id + "-" + n),
              c = "bcjiz" + n,
              u = (t.anonymousFunc1Map[c] = function() {
                return t.handleCross(o.$original)
              }, 1 === n && 1 < l.length ? {
                marginBottom: "20rpx",
                borderRadius: "16rpx"
              } : null),
              f = Object(i.genCompid)(e + "bdaczzzzzz" + n, !0),
              h = (f = p(f, 2))[0],
              g = (f = f[1], h = (i.propsManager.set({
                data: o.$original,
                index: n,
                crossIcon: !0,
                onClick: t.__props.toposDetail,
                onCrossClick: t.anonymousFunc1.bind(t, c),
                binderrorimg: m
              }, f, h), Object(i.genCompid)(e + "bdadzzzzzz" + n, !0)), (h = p(h, 2))[0]);
            h = h[1];
            return 1 === n && 1 < l.length && i.propsManager.set({
              advertId: "201A32D20DA9F6249F585408AE4F8A50",
              mgAdId: "647391",
              type: "首页信息流",
              style: u
            }, h, g), {
              $loopState__temp2: s,
              _$indexKey: a,
              $loopState__temp4: r,
              _$indexKey2: c,
              $loopState__temp6: u,
              $compid__2210: f,
              $compid__2211: h,
              $original: o.$original
            }
          }));
          return f && i.propsManager.set({
            color: "#ff453a",
            size: 26,
            content: "加载中...",
            mode: "center"
          }, o, n), !f && !g && 1 <= h && l && 0 < l.length && i.propsManager.set({
            isLogin: b,
            jobHuntInfo: d,
            onClick: this.handleBottomClick.bind(this)
          }, s, a), y && i.propsManager.set({
            item: y
          }, r, c), Object.assign(this.__state, {
            loopArray1069: u,
            $compid__2212: o,
            $compid__2213: s,
            $compid__2214: r,
            jobHuntInfo: d,
            postList: l,
            showMoreButton: g,
            hasScorll: v,
            hasMore: f,
            maxPage: h,
            hasLiving: y
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          for (var e, o = arguments.length, n = Array(1 < o ? o - 1 : 0), i = 1; i < o; i++) n[i - 1] = arguments[i];
          return "object" === (void 0 === n ? "undefined" : c(n)) && n.stopPropagation && n.stopPropagation(), this.anonymousFunc0Map[t] && (e = this.anonymousFunc0Map)[t].apply(e, n)
        }
      }, {
        key: "anonymousFunc1",
        value: function(t) {
          for (var e, o = arguments.length, n = Array(1 < o ? o - 1 : 0), i = 1; i < o; i++) n[i - 1] = arguments[i];
          return this.anonymousFunc1Map[t] && (e = this.anonymousFunc1Map)[t].apply(e, n)
        }
      }, {
        key: "funPrivatebcjjz",
        value: function() {
          return this.props.onClickShowMore.apply(void 0, Array.prototype.slice.call(arguments, 1))
        }
      }, {
        key: "funPrivatebdaaz",
        value: function() {
          return this.props.onEditJobobjective.apply(void 0, Array.prototype.slice.call(arguments, 1))
        }
      }, {
        key: "funPrivatebdabz",
        value: function() {
          return this.props.onSelectCity.apply(void 0, Array.prototype.slice.call(arguments, 1))
        }
      }]), u = o = g, o.$$events = ["handleBottomClick", "goSetPost", "anonymousFunc0", "toJobobjective", "funPrivatebcjjz", "funPrivatebdaaz", "funPrivatebdabz", "toEnterpriseList"], o.options = {
        addGlobalClass: !0
      }, o.$$componentPath = "pages/find/components/PostCardList/PostCardList", o = u)) || o).defaultProps = {
        data: [],
        briefingSessionList: [],
        postList: [],
        doubleChoiceSession: [],
        page: 1,
        maxPage: 2,
        hasMore: !0,
        isLogin: !1,
        resumeCompleteProcess: 0,
        postTotal: 0,
        jobHuntInfo: {},
        toposDetail: function() {},
        binderrorimg: function() {},
        onClickCross: function() {},
        onSelectCity: function() {},
        onEditJobobjective: function() {},
        showMoreButton: !1,
        isLoadMorePost: !1,
        onClickShowMore: function() {},
        onLoginClick: function() {},
        hasScorll: 0
      }, Component(n(0).default.createComponent(u))
    },
    998: function(t, e, o) {
      t.exports = o.p + "pages/find/components/PostCardList/PostCardList.wxml"
    }
  },
  [
    [3808, 0, 2, 1, 3]
  ]
]);