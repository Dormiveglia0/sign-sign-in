var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [75], {
    2398: function(t, e, n) {
      n(754)
    },
    2399: function(t, e, n) {},
    3571: function(e, n, a) {
      a.r(n), a(2398);
      var o = a(0),
        i = a.n(o),
        r = (n = a(4), n = a.n(n), a(1)),
        s = a(21),
        u = (a(2399), a(29)),
        c = a.n(u),
        l = (u = a(6), a(9)),
        p = function(t, e, n) {
          return e && d(t.prototype, e), n && d(t, n), t
        };

      function d(t, e) {
        for (var n = 0; n < e.length; n++) {
          var a = e[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a)
        }
      }

      function g(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function f() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, f);
        for (var n = arguments.length, a = Array(n), o = 0; o < n; o++) a[o] = arguments[o];
        return (t = e = g(this, (e = f.__proto__ || Object.getPrototypeOf(f)).call.apply(e, [this].concat(a)))).$usedState = ["loopArray1261", "isShow", "onClose", "lastPageType", "otherFlag", "integrateFlag", "journalType", "randomNumber", "startTraineeDayNum", "signRandomNumber", "signRandomNumber2", "postSize", "postInfo", "postList", "jobHunt", "countDownTime", "submitNum", "signPersonNum", "xybData"], e.config = {
          navigationStyle: "custom",
          navigationBarTextStyle: "white",
          enablePullDownRefresh: !0,
          usingComponents: {
            "van-popup": "../../vant-weapp/dist/popup/index"
          }
        }, e.customComponents = [], g(e, t)
      }
      i.a.getApp(), u = Object(u.connect)((function(t) {
        return {
          xybData: t.xybData
        }
      }), (function(t) {
        return {
          setxybdata: function(e) {
            t(Object(l.a)(e))
          }
        }
      }))(p = n()({
        data: {
          lastPageType: null,
          journalType: null,
          submitNum: null,
          signPersonNum: null,
          startTraineeDayNum: null,
          randomNumber: null,
          signRandomNumber: null,
          signRandomNumber2: null,
          integrateFlag: null,
          hotInfo: {},
          postInfo: {},
          sxhInfo: {},
          bannerInfo: {},
          scrollTop: 30,
          followXcx: !1,
          journalCount: 0,
          isAddWxFlag: !1,
          sphereInfo: {
            status: !1
          },
          isShow: !1,
          jobHunt: !0,
          postSize: 0,
          postList: [],
          countDownId: null,
          countDownTime: 0,
          otherFlag: !1
        },
        onClose: function() {
          this.setData({
            isShow: !1
          })
        },
        onLoad: function() {},
        onShowPop: function(t) {
          var e, n;
          this.setData({
            isShow: !0
          }), 1 == t.lastPageType ? (e = Math.floor(2 * Math.random()), this.setData({
            journalType: t.journalType,
            submitNum: t.submitNum,
            startTraineeDayNum: t.startTraineeDayNum,
            randomNumber: e
          })) : (e = Math.floor(3 * Math.random()), n = Math.floor(7 * Math.random()), this.setData({
            signPersonNum: t.signPersonNum,
            startTraineeDayNum: t.startTraineeDayNum,
            signRandomNumber: e,
            signRandomNumber2: n
          })), this.setData({
            integrateFlag: t.integrateFlag
          }), this.getRecommendDataOther(), this.setData({
            lastPageType: t.lastPageType,
            otherFlag: t.otherFlag || !1
          })
        },
        onPageScroll: function(t) {},
        getSubscrib: function() {
          var t = this;
          r.a.xyb_request("account/LoadAccountInfo!getSubscribe.action", "POST", {}, !0, !1).then((function(e) {
            var n = i.a.getStorageSync("journalCount") || 0,
              a = i.a.getStorageSync("journalDate") || 0;
            a && (new Date).toDateString() !== new Date(a).toDateString() && (i.a.setStorageSync("journalDate", new Date), i.a.setStorageSync("journalCount", 2), n = 2), e.data || a || (i.a.setStorageSync("journalDate", new Date), i.a.setStorageSync("journalCount", 2), n = 2), t.setData({
              followXcx: e.data,
              journalCount: n
            }, (function() {
              e.data || (n -= 1, i.a.setStorageSync("journalCount", n))
            }))
          }), (function(t) {}))
        },
        getLocation: function() {
          var t = this;
          i.a.getLocation({
            type: "wgs84",
            success: function(e) {
              var n = e.longitude.toFixed(6);
              e = e.latitude.toFixed(6);
              t.loadCity(n, e)
            },
            fail: function(t) {}
          })
        },
        loadCity: function(t, e) {
          var n = this,
            a = this;
          r.a.xyb_request("common/tencentGeocoderLocation.action", "POST", {
            location: e + "," + t
          }).then((function(t) {
            0 === t.data.status ? (t = (t = t.data.result.address_component).city || t.province, a.getcityId(t)) : n.setData({
              loading: !1
            })
          }))
        },
        getcityId: function(t) {
          var e = this;
          r.a.xyb_request("common/loadLocation!getCityId.action", "POST", {
            cityName: t
          }, !1, !1).then((function(t) {
            i.a.setStorageSync("currentCityId", t.data), e.getBannerlist(t.data)
          }), (function(t) {}))
        },
        getRecommendDataOther: function() {
          var t = this;
          r.a.xyb_request("post/GetPostList!findRecommendPostList.action", "POST", {}, !1, !1).then((function(e) {
            t.setData({
              postSize: e.data.postSize,
              postList: e.data.postList
            }), r.a.xyb_request("common/info.action", "POST", {}, !1, !1).then((function(e) {
              t.setData({
                jobHunt: e.data.jobHunt
              }, (function() {
                var n, a = 0,
                  o = t.data.postSize;
                0 == o ? a = 5 : 0 != o && e.data.jobHunt && (a = 20), 0 != a && (n = setInterval((function() {
                  t.setData({
                    countDownTime: a
                  }), --a <= 0 && (t.backCallback(), clearInterval(n))
                }), 1e3), t.setData({
                  countDownTime: a,
                  countDownId: n
                }))
              }))
            }))
          }))
        },
        getHotList: function() {
          var t = this,
            e = this;
          r.a.xyb_request("client/GetRecommendList!getHotList.action", "POST", {
            num: 1
          }, !1, !1).then((function(n) {
            n && n.data && (t.setData({
              hotInfo: n.data[0] || {}
            }), setTimeout((function(t, n) {
              e.data.hotInfo && e.data.hotInfo.title && e.initAnimate()
            }), 500))
          }), (function(t) {}))
        },
        getBannerlist: function(t) {
          var e = this,
            n = this;
          r.a.xyb_request("client/activity/LoadActivityList.action", "POST", {
            locationId: t,
            showPage: 1 == this.data.lastPageType ? 3 : 2
          }, !1, !1).then((function(t) {
            t = t.data || [];
            e.setData({
              bannerInfo: t[0] || {}
            }), t && 0 < t.length && (t = [{
              id: t[0].id,
              count: 1
            }], s.a.commonDataStatistics("expose", "ninthBag/pages/submitResultPop/submitResultPop", "", "", 1 == n.data.lastPageType ? "提交" + e.props.xybData.pageNoun.zrz + "结果页-banner图" : "签到结果页-banner图", JSON.stringify(t), "banner播放"))
          }), (function(t) {}))
        },
        onReady: function() {},
        onShow: function() {},
        onHide: function() {},
        onUnload: function() {
          clearInterval(this.data.countDownId)
        },
        onPullDownRefresh: function() {},
        onReachBottom: function() {},
        onShareAppMessage: function(t) {
          return t.from, {}
        },
        editAgain: function() {
          clearInterval(this.data.countDownId), i.a.eventCenter.trigger("taroClick", {
            funName: "再写一篇"
          }), i.a.redirectTo({
            url: "/growUp/pages/journal/dailyeditor/editor?blogType=" + this.data.journalType
          })
        },
        toQiuzhi: function() {
          clearInterval(this.data.countDownId);
          var t = 1 != this.data.lastPageType ? 1 : 2;
          i.a.eventCenter.trigger("taroClick", {
            funName: "跳转求职_" + t
          }), i.a.reLaunch({
            url: "/pages/find/index/index"
          })
        },
        toposDetail: function(t) {
          var e = 1 != this.data.lastPageType ? 1 : 2;
          i.a.eventCenter.trigger("taroClick", {
            funName: "跳转岗位详情_" + e
          }), t.currentTarget.dataset.item.id && (e = t.currentTarget.dataset.item.id, i.a.navigateTo({
            url: "/videoBag/pages/posdetail/posdetail?postid=" + e + "&fromType=25&pageSource=30"
          }))
        },
        toSxhDetail: function(t) {
          var e = 1 != this.data.lastPageType ? 1 : 2;
          i.a.eventCenter.trigger("taroClick", {
            funName: "跳转双选会_" + e
          }), e = t.currentTarget.dataset.item;
          i.a.navigateTo({
            url: "/videoBag/pages/doubleSelectList/doubleSelectList?id=" + e.id + "&name=" + e.name
          })
        },
        toRecommendDetail: function(t) {
          t = t.currentTarget.dataset.item;
          var e = 1 != this.data.lastPageType ? 1 : 2;
          1 == (e = (i.a.eventCenter.trigger("taroClick", {
            funName: "跳转热榜详情_" + e
          }), r.a.xyb_request("client/GetRecommendList!updateHotData.action", "POST", {
            id: t.id
          }, !1, !1).then((function(t) {}), (function(t) {})), t.contentType)) ? i.a.navigateTo({
            url: "/growUp/pages/home/questiondetail/questiondetail?questionId=" + t.infoId
          }) : 2 == e ? i.a.navigateTo({
            url: "/growUp/pages/home/answerdetail/answerdetail?questionId=" + t.questionId + "&answerId=" + t.infoId
          }) : 3 == e ? i.a.navigateTo({
            url: "/growUp/pages/home/dynamicDetail/dynamicDetail?dynamicId=" + t.infoId
          }) : 4 == e && i.a.navigateTo({
            url: "/growUp/pages/home/informationdetail/informationdetail?id=" + t.infoId
          })
        },
        hotMoreClick: function() {
          var t = 1 != this.data.lastPageType ? 1 : 2;
          i.a.eventCenter.trigger("taroClick", {
            funName: "获取更多热榜数据_" + t
          }), i.a.navigateTo({
            url: "/fourthBag/pages/find/hotMoreTopic/hotMoreTopic"
          })
        },
        downLottieData: function(t) {
          return new Promise((function(e, n) {
            wx.request({
              url: t,
              header: {
                "content-type": "application/json"
              },
              success: function(t) {
                e(t.data)
              }
            })
          }))
        },
        initAnimate: function() {
          var t = this;
          this.inited || this.setState({}, (function() {
            t.downLottieData("https://xcxstatic.xybsyw.com/lottieData/loading3.js").then((function(e) {
              i.a.createSelectorQuery().selectAll("#lottieAnimate").node((function(n) {
                var a;
                (n = n[0] && n[0].node ? n[0].node : "") && (a = n.getContext("2d"), n.width = 300, n.height = 300, c.a.setup(n), t.ani = c.a.loadAnimation({
                  loop: !0,
                  autoplay: !0,
                  animationData: e,
                  rendererSettings: {
                    context: a
                  }
                }), t.inited = !0)
              })).exec()
            }))
          }))
        },
        play: function() {
          this.ani.play()
        },
        pause: function() {
          this.ani.pause()
        },
        stop: function() {
          this.ani.stop()
        },
        customBackReturn: function() {
          1 == this.data.lastPageType ? i.a.reLaunch({
            url: "/growUp/pages/journal/journalList/journalList?journalType=" + this.data.journalType
          }) : i.a.redirectTo({
            url: "/growUp/pages/sign/sign/sign"
          })
        },
        jumpToPrivateSphere: function() {
          i.a.eventCenter.trigger("taroClick", {
            funName: "跳转到私域二维码页面"
          }), i.a.navigateTo({
            url: "/thirdBag/pages/privateSphere/privateSphere?isSignPendant=1&typeIndex=9&groupId=" + this.data.sphereInfo.groupId + "&sphereCode=BLOG_PENDANT"
          })
        },
        isAddWx: function() {
          var t = this,
            e = i.a.getStorageSync("unionid");
          if (!e) return !1;
          r.a.xyb_request("sphere/sphereInfo.action", "POST", {
            unionId: e,
            sphereCode: "BLOG_PENDANT"
          }, !0, !1).then((function(e) {
            var n;
            "200" == e.code && ((n = !(!e.data || !e.data.status) && e.data.status) && i.a.eventCenter.trigger("taroClick", {
              funName: "私域入口埋点",
              itemId: e.data.groupId,
              itemTypeName: "BLOG"
            }), t.setData({
              isAddWxFlag: n,
              sphereInfo: e.data
            }))
          }), (function(t) {}))
        },
        backCallback: function() {
          clearInterval(this.data.countDownId), this.triggerEvent("back"), this.setData({
            isShow: !1
          })
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
      }(f, i.a.Component), p(f, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, a) {
            null === e && (e = Function.prototype);
            var o = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== o ? "value" in o ? o.value : void 0 !== (o = o.get) ? o.call(a) : void 0 : null !== (o = Object.getPrototypeOf(e)) ? t(o, n, a) : void 0
          })(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = this.onClose,
            e = (b = this.data).isShow,
            n = (b.hotInfo, b.postInfo),
            a = (b.sxhInfo, b.bannerInfo, b.integrateFlag),
            r = b.lastPageType,
            s = b.journalType,
            u = b.submitNum,
            c = b.randomNumber,
            l = b.signRandomNumber,
            p = b.signRandomNumber2,
            d = b.signPersonNum,
            g = b.startTraineeDayNum,
            f = (b.journalCount, b.followXcx, b.sphereInfo, b.jobHunt),
            m = b.postSize,
            h = b.postList,
            y = b.countDownTime,
            b = b.otherFlag,
            v = (this.anonymousFunc0 = function() {
              i.a.eventCenter.trigger("taroClick", {
                funName: "跳转期望职位"
              }), i.a.navigateTo({
                url: "/videoBag/pages/jobintentionsetting/jobobjective/jobobjective?reconfirm=1"
              })
            }, 0 < m ? h.map((function(t, e) {
              return t = {
                $original: Object(o.internal_get_original)(t)
              }, {
                $anonymousCallee__162: 0 < m ? t.$original.welfareLabels.slice(0, 4) : [],
                $original: t.$original
              }
            })) : []);
          return Object.assign(this.__state, {
            loopArray1261: v,
            isShow: e,
            onClose: t,
            lastPageType: r,
            otherFlag: b,
            integrateFlag: a,
            journalType: s,
            randomNumber: c,
            startTraineeDayNum: g,
            signRandomNumber: l,
            signRandomNumber2: p,
            postSize: m,
            postInfo: n,
            postList: h,
            jobHunt: f,
            countDownTime: y,
            submitNum: u,
            signPersonNum: d
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {}
      }]), n = u = f, u.$$events = ["onClose", "editAgain", "toposDetail", "toQiuzhi", "anonymousFunc0", "backCallback"], u.$$componentPath = "components/submitResultPop/submitResultPop", p = n)) || p) || p, Component(a(0).default.createComponent(u))
    },
    754: function(t, e, n) {
      t.exports = n.p + "components/submitResultPop/submitResultPop.wxml"
    }
  },
  [
    [3571, 0, 2, 1, 3]
  ]
]);