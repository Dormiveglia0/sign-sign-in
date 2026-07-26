var e = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [10], {
    2888: function(e, t, a) {
      a(993)
    },
    3804: function(t, a, i) {
      i.r(a), i(2888);
      var n = i(0),
        o = i.n(n),
        r = (i(994), i(1)),
        s = i(21),
        u = function(e, t) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return function(e, t) {
            var a = [],
              i = !0,
              n = !1,
              o = void 0;
            try {
              for (var r, s = e[Symbol.iterator](); !(i = (r = s.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0);
            } catch (e) {
              n = !0, o = e
            } finally {
              try {
                !i && s.return && s.return()
              } finally {
                if (n) throw o
              }
            }
            return a
          }(e, t);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        },
        p = Object.assign || function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var a, i = arguments[t];
            for (a in i) Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a])
          }
          return e
        };
      a = function(e, t, a) {
        return t && c(e.prototype, t), a && c(e, a), e
      };

      function c(e, t) {
        for (var a = 0; a < t.length; a++) {
          var i = t[a];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      var l;

      function g(t, a) {
        if (t) return !a || "object" != e(a) && "function" != typeof a ? t : a;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var d, v = o.a.getApp(),
        m = void 0;

      function y() {
        var e, t;
        ! function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, y);
        for (var a = arguments.length, i = Array(a), n = 0; n < a; n++) i[n] = arguments[n];
        return (e = t = g(this, (e = y.__proto__ || Object.getPrototypeOf(y)).call.apply(e, [this].concat(i)))).$usedState = ["loopArray1061", "loopArray1062", "privateData", "sessionLength", "bannerLength", "totalLength", "isPlay", "bannerList", "hasWIFI", "currentSwipe"], t.VideoContexts = [], t.onCountDownEnd = function(e) {
          var a = t.state.privateData;
          a[e].status = 1, t.setState({
            privateData: a
          })
        }, t.customComponents = ["BriefingSessionCardItem"], g(t, e)
      }(a = (function(t, a) {
        if ("function" != typeof a && null !== a) throw new TypeError("Super expression must either be null or a function, not " + e(a));
        t.prototype = Object.create(a && a.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), a && (Object.setPrototypeOf ? Object.setPrototypeOf(t, a) : t.__proto__ = a)
      }(y, n.Component), a(y, [{
        key: "_constructor",
        value: function(e) {
          var t = this;
          (function e(t, a, i) {
            null === t && (t = Function.prototype);
            var n = Object.getOwnPropertyDescriptor(t, a);
            return void 0 !== n ? "value" in n ? n.value : void 0 !== (n = n.get) ? n.call(i) : void 0 : null !== (n = Object.getPrototypeOf(t)) ? e(n, a, i) : void 0
          })(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "_constructor", this).call(this, e), d = this.clone(e.data), e = "WIFI" === o.a.getStorageSync("networkType");
          this.state = {
            hasWIFI: e,
            currentSwipe: 0,
            isPlay: !1,
            privateData: this.formatData(d)
          }, setTimeout((function() {
            t.state.privateData.forEach((function(e, a) {
              t.VideoContexts.push(o.a.createVideoContext("Double" + e.id, t.$scope.selectComponent("#BriefingSessionCardItem-" + a)))
            }))
          }), 100), this.$$refs = new o.a.RefsArray
        }
      }, {
        key: "clone",
        value: function(e) {
          return JSON.parse(JSON.stringify(e))
        }
      }, {
        key: "siwtchVoice",
        value: function(e, t) {
          e.stopPropagation(), (e = this.state.privateData)[t].isMute = !e[t].isMute, this.setState({
            privateData: e
          })
        }
      }, {
        key: "videoClick",
        value: function(e) {
          e.stopPropagation(), this.goLiveDetails(e)
        }
      }, {
        key: "videoPlay",
        value: function(e, t) {
          var a = this;
          (e = (e.stopPropagation(), this.state.privateData))[t].isMute = !1, e[t].isShowVideo = !0, this.setState({
            privateData: e,
            isPlay: !0
          }, (function() {
            a.VideoContexts[t].play()
          }))
        }
      }, {
        key: "formatData",
        value: function(e) {
          var t = this,
            a = (this.VideoContexts = [], (new Date).getTime());
          return e.map((function(e, i) {
            var n = 1e3 * Number(e.startTime);
            return 1 === e.status && n - a < 108e5 && 0 < n - a && (e.status = -1, e.countDownNum = (n - a) / 1e3), e.startDate = t.startDateFormat(e.startDate) || e.startDate, p({}, e, {
              isShowVideo: !!t.state.privateData && t.state.privateData[i].isShowVideo,
              isMute: !t.state.privateData || t.state.privateData[i].isMute
            })
          }))
        }
      }, {
        key: "goLiveDetails",
        value: function(e) {
          o.a.eventCenter.trigger("taroClick", {
            funName: "首页宣讲会卡片-去宣讲会详情"
          });
          var t = e.currentTarget.dataset.id,
            a = e.currentTarget.dataset.status;
          e = e.currentTarget.dataset.picurl;
          3 == a ? o.a.showToast({
            title: "此宣讲会已结束，看看其他的吧~",
            icon: "none"
          }) : (o.a.setStorageSync("onSharePreachMeetingImg", e), a = (e = (a = o.a.getCurrentPages())[a.length - 1]).options.bType ? "&bType=" + e.options.bType : "", o.a.navigateTo({
            url: "/videoBag/pages/preachMeeting/preachMeeting?id=" + t + "&fromList=1&pageSource=22" + a
          }))
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
          this.openObserver()
        }
      }, {
        key: "openObserver",
        value: function() {
          var e = this;
          (m = o.a.createIntersectionObserver(this.$scope, {
            thresholds: [0, 1],
            initialRatio: 0,
            observeAll: !0
          })).relativeToViewport({
            bottom: -77,
            top: -88
          }).observe(".card-content-wrap", (function(t) {
            var a = t.dataset.index,
              i = t.dataset.id,
              n = e.state.privateData,
              o = n[a];
            1 === t.intersectionRatio ? (!o.isShowVideo && e.state.hasWIFI && (o.isShowVideo = !0, e.setState({
              privateData: n
            })), setTimeout((function() {
              o.preVideoUrl && e.state.hasWIFI && (e.VideoContexts.forEach((function(e, t) {
                t === a ? e.play() : e.pause()
              })), e.setState({
                isPlay: !0
              }))
            }), 300), e.exposure({
              talkType: 0,
              talkId: i,
              doType: 1,
              pageSource: 0
            })) : 0 === t.intersectionRatio && o.preVideoUrl && e.state.isPlay && (e.VideoContexts[a].pause(), e.setState({
              isPlay: !1
            }))
          }))
        }
      }, {
        key: "clearObserver",
        value: function() {
          m && (m.disconnect(), m = null)
        }
      }, {
        key: "exposure",
        value: function(e) {
          r.a.xyb_request("index/TalkOperateData!statistics.action", "POST", e, !1, !1).then((function(e) {}))
        }
      }, {
        key: "componentDidShow",
        value: function() {
          null === m && this.openObserver()
        }
      }, {
        key: "componentDidHide",
        value: function() {
          this.clearObserver()
        }
      }, {
        key: "componentWillUnmount",
        value: function() {
          this.clearObserver()
        }
      }, {
        key: "cardClick",
        value: function(e) {
          this.exposure({
            talkType: 0,
            talkId: e.currentTarget.dataset.id,
            doType: 2,
            pageSource: 0
          })
        }
      }, {
        key: "startDateFormat",
        value: function(e) {
          var t = e,
            a = (n = new Date).getFullYear(),
            i = n.getMonth() + 1,
            n = n.getDay(),
            o = (a = (a + "." + e).replace(/\./g, "/"), a = (e = new Date(a)).getMonth() + 1, e.getDay()),
            r = e.getHours();
          e = e.getMinutes();
          return i === a && n === o ? "今天 " + (r || "00") + ":" + (e || "00") : t
        }
      }, {
        key: "toBannerDetailOld",
        value: function(e) {
          var t, a;
          e = e.currentTarget.dataset.item;
          o.a.eventCenter.trigger("taroClick", {
            funName: "运营活动跳转",
            funType: "运营活动banner",
            funData: e.id
          }), 0 == e.jumpType ? e.jumpLink && -1 != e.jumpLink.indexOf("fieldId") ? o.a.navigateTo({
            url: e.jumpLink + "&pageSource=9"
          }) : (a = {
            title: e.title,
            url: encodeURIComponent(e.jumpLink)
          }, o.a.navigateTo({
            url: "/videoBag/pages/h5/h5?model=" + JSON.stringify(a)
          })) : 1 == e.jumpType ? o.a.navigateTo({
            url: "/growUp/pages/home/activitydetail/activitydetail?activityId=" + e.id + "&pageSource=9"
          }) : 2 == e.jumpType && e.jumpLink ? (v.globalData.applyPostSort = 0, o.a.navigateTo({
            url: "/videoBag/pages/posdetail/posdetail?postid=" + e.jumpLink + "&fromType=26&pageSource=9"
          })) : 3 == e.jumpType && e.jumpLink ? (v.globalData.applyPostSort = 1, o.a.navigateTo({
            url: "/echartsBag/pages/comdetail/comdetail?comid=" + e.jumpLink + "&pageSource=9"
          })) : 4 == e.jumpType && e.jumpLink ? o.a.navigateTo({
            url: "/videoBag/pages/preachMeeting/preachMeeting?id=" + e.jumpLink + "&pageSource=9"
          }) : 5 == e.jumpType ? o.a.navigateTo({
            url: "/videoBag/pages/doubleSelectList/doubleSelectList?id=" + e.jumpLink + "&name=" + e.title + "&pageSource=9"
          }) : 6 == e.jumpType && e.jumpLink ? v.globalData.isLogin ? o.a.navigateTo({
            url: "/growUp/pages/home/topicCircle/topicCircle?topicId=" + e.jumpLink + "&pageSource=9"
          }) : this.setData({
            showlogin: !0,
            jumpToPageUrl: ""
          }, (function() {
            o.a.setStorageSync("jumpToPageUrl", "")
          })) : 7 == e.jumpType && e.jumpLink ? o.a.navigateTo({
            url: "/secondBag/pages/courseDetails/courseDetails?id=" + e.jumpLink + "&pageSource=9"
          }) : 8 == e.jumpType && e.jumpLink ? v.globalData.isLogin ? o.a.navigateTo({
            url: "/fifthBag/pages/huzhouList/huzhouList?cityChannelId=" + e.jumpLink + "&pageSource=9"
          }) : this.setData({
            showlogin: !0,
            jumpToPageUrl: ""
          }, (function() {
            o.a.setStorageSync("jumpToPageUrl", "")
          })) : 9 == e.jumpType && e.jumpLink ? o.a.navigateTo({
            url: "/growUp/pages/home/informationdetail/informationdetail?id=" + e.jumpLink + "&pageSource=9"
          }) : 10 == e.jumpType && e.jumpLink ? o.a.navigateTo({
            url: "/growUp/pages/home/dynamicDetail/dynamicDetail?dynamicId=" + e.jumpLink + "&pageSource=9"
          }) : 11 == e.jumpType && e.jumpLink ? o.a.navigateTo({
            url: "/growUp/pages/home/questiondetail/questiondetail?questionId=" + e.jumpLink + "&pageSource=9"
          }) : 12 == e.jumpType && e.jumpLink ? o.a.navigateTo({
            url: "/growUp/pages/home/answerdetail/answerdetail?questionId=" + e.jumpLink2 + "&answerId=" + e.jumpLink + "&pageSource=9"
          }) : 13 == e.jumpType && e.jumpLink && ((a = e.jumpLink).includes("@") ? (a = a.split("@"), t = (a = u(a, 2))[0], a = a[1], o.a.navigateToMiniProgram({
            appId: t,
            path: a,
            envVersion: "release",
            success: function(e) {},
            fail: function(e) {}
          })) : o.a.navigateTo({
            url: e.jumpLink
          })), r.a.xyb_request("client/activity/LoadActivityList!statistic.action", "POST", {
            dataId: e.id,
            type: 14,
            user: o.a.getStorageSync("openid")
          }, !1, !1).then((function(e) {}), (function(e) {}))
        }
      }, {
        key: "recommendComNum",
        value: function() {
          var e = this.state.currentSwipe - this.state.privateData.length,
            t = this.props.bannerList || [],
            a = t.map((function(e) {
              return {
                id: e.id
              }
            }));
          (a = (s.a.commonDataStatistics("expose", "pages/find/index/index", "", "", "机会-banner图", JSON.stringify(a), "banner播放"), t[e])) && r.a.xyb_request("client/activity/LoadActivityList!expose.action", "POST", {
            dataId: a.id,
            type: 14,
            user: o.a.getStorageSync("openid")
          }, !1, !1).then((function(e) {}), (function(e) {}))
        }
      }, {
        key: "_createData",
        value: function() {
          var e = this,
            t = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            a = this.__props.bannerList,
            i = ((l = this.__state).currentSwipe, l.isPlay),
            o = l.privateData,
            r = l.hasWIFI,
            s = o ? o.length : 0,
            p = a ? a.length : 0,
            c = s + p,
            l = (new Array(c).fill(0), o.map((function(a, o) {
              a = {
                $original: Object(n.internal_get_original)(a)
              };
              var s = "BriefingSessionCardItem-" + o,
                p = Object(n.genCompid)(t + "bcjazzzzzz" + o, !0),
                c = (p = u(p, 2))[0];
              p = p[1];
              return n.propsManager.set({
                item: a.$original,
                index: o,
                hasWIFI: r,
                isPlay: i,
                cardClick: e.cardClick.bind(e),
                goLiveDetails: e.goLiveDetails.bind(e),
                onCountDownEnd: e.onCountDownEnd.bind(e),
                videoClick: e.videoClick.bind(e),
                videoPlay: e.videoPlay.bind(e),
                siwtchVoice: e.siwtchVoice.bind(e)
              }, p, c), {
                $loopState__temp2: s,
                $compid__2207: p,
                $original: a.$original
              }
            })));
          o = 0 <= c && (1 !== s || 0 !== p) ? o.map((function(a, o) {
            a = {
              $original: Object(n.internal_get_original)(a)
            };
            var l = 0 <= c && (1 !== s || 0 !== p) ? "BriefingSessionCardItem-" + o : null,
              g = Object(n.genCompid)(t + "bcjbzzzzzz" + o, !0),
              d = (g = u(g, 2))[0];
            g = g[1];
            return 0 <= c && (1 !== s || 0 !== p) && n.propsManager.set({
              item: a.$original,
              index: o,
              hasWIFI: r,
              isPlay: i,
              cardClick: e.cardClick.bind(e),
              goLiveDetails: e.goLiveDetails.bind(e),
              onCountDownEnd: e.onCountDownEnd.bind(e),
              videoClick: e.videoClick.bind(e),
              videoPlay: e.videoPlay.bind(e),
              siwtchVoice: e.siwtchVoice.bind(e)
            }, g, d), {
              $loopState__temp4: l,
              $compid__2208: g,
              $original: a.$original
            }
          })) : [];
          return Object.assign(this.__state, {
            loopArray1061: l,
            loopArray1062: o,
            sessionLength: s,
            bannerLength: p,
            totalLength: c,
            bannerList: a
          }), this.__state
        }
      }, {
        key: "swiperChange",
        value: function(e) {
          var t, a = this,
            i = (e = e.detail).current;
          "autoplay" !== (e = e.source) && "touch" !== e || (t = i >= this.state.privateData.length, this.setState({
            currentSwipe: i
          }, (function() {
            t && a.recommendComNum()
          })))
        }
      }]), l = a = y, a.$$events = ["swiperChange", "toBannerDetailOld"], a.options = {
        addGlobalClass: !0
      }, a.$$componentPath = "components/BriefingSessionCard/BriefingSessionCard", l)).defaultProps = {
        data: [],
        bannerList: []
      }, Component(i(0).default.createComponent(a))
    },
    993: function(e, t, a) {
      e.exports = a.p + "components/BriefingSessionCard/BriefingSessionCard.wxml"
    }
  },
  [
    [3804, 0, 2, 1, 3]
  ]
]);