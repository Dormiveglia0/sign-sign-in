var e = require("../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [635], {
    2049: function(e, t, n) {
      n(579)
    },
    2050: function(e, t, n) {},
    3398: function(t, n, a) {
      a.r(n), a(2049);
      n = a(3);
      var i = a.n(n),
        o = (a(2050), a(0)),
        r = a.n(o),
        u = a(1),
        p = a(21),
        c = function(e, t) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return function(e, t) {
            var n = [],
              a = !0,
              i = !1,
              o = void 0;
            try {
              for (var r, u = e[Symbol.iterator](); !(a = (r = u.next()).done) && (n.push(r.value), !t || n.length !== t); a = !0);
            } catch (e) {
              i = !0, o = e
            } finally {
              try {
                !a && u.return && u.return()
              } finally {
                if (i) throw o
              }
            }
            return n
          }(e, t);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      n = function(e, t, n) {
        return t && s(e.prototype, t), n && s(e, n), e
      };

      function s(e, t) {
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
      }
      var l;

      function g(e) {
        return function() {
          var t = e.apply(this, arguments);
          return new Promise((function(e, n) {
            return function a(i, o) {
              try {
                var r = t[i](o),
                  u = r.value
              } catch (i) {
                return void n(i)
              }
              if (!r.done) return Promise.resolve(u).then((function(e) {
                a("next", e)
              }), (function(e) {
                a("throw", e)
              }));
              e(u)
            }("next")
          }))
        }
      }

      function m(t, n) {
        if (t) return !n || "object" != e(n) && "function" != typeof n ? t : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var f = void 0,
        y = r.a.getApp();
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
      })(d, r.a.Component), n(d, [{
        key: "_constructor",
        value: function(e) {
          (function e(t, n, a) {
            null === t && (t = Function.prototype);
            var i = Object.getOwnPropertyDescriptor(t, n);
            return void 0 !== i ? "value" in i ? i.value : void 0 !== (i = i.get) ? i.call(a) : void 0 : null !== (i = Object.getPrototypeOf(t)) ? e(i, n, a) : void 0
          })(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "_constructor", this).call(this, e), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var e = this,
            t = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.__props, Object(o.useState)([])),
            n = (t = c(t, 2))[0],
            a = t[1],
            s = (t = Object(o.useState)(0), (t = c(t, 2))[0]),
            l = t[1],
            m = function(t, n) {
              var o;
              u.a.xyb_request("client/activity/LoadActivityList.action", "POST", {
                showPage: 4
              }, !1, !1).then((o = g(i.a.mark((function t(n) {
                var o;
                return i.a.wrap((function(e) {
                  for (;;) switch (e.prev = e.next) {
                    case 0:
                      if (o = n.data || [], a(o), !(0 < o.length)) {
                        e.next = 7;
                        break
                      }
                      if (o = o[0]) {
                        e.next = 6;
                        break
                      }
                      return e.abrupt("return");
                    case 6:
                      u.a.xyb_request("client/activity/LoadActivityList!expose.action", "POST", {
                        dataId: o.id,
                        type: 14,
                        user: r.a.getStorageSync("openid")
                      }, !1, !1);
                    case 7:
                    case "end":
                      return e.stop()
                  }
                }), t, e)
              }))), function(e) {
                return o.apply(this, arguments)
              }), (function(e) {
                a([])
              }))
            },
            d = function() {
              for (var e = [], t = n, a = 0; a < t.length; a++) e.push({
                id: t[a].id,
                count: t[a].num
              });
              p.a.commonDataStatistics("expose", "pages/find/index/index", "", "", "机会-banner图", JSON.stringify(e), "banner播放");
              var i = n[s];
              i && u.a.xyb_request("client/activity/LoadActivityList!expose.action", "POST", {
                dataId: i.id,
                type: 14,
                user: r.a.getStorageSync("openid")
              }, !1, !1).then((function(e) {}), (function(e) {}))
            },
            v = function(e) {
              var t, n;
              e = e.currentTarget.dataset.item;
              r.a.eventCenter.trigger("taroClick", {
                funName: "运营活动跳转",
                funType: "运营活动banner",
                funData: e.id
              }), 0 == e.jumpType ? e.jumpLink && -1 != e.jumpLink.indexOf("fieldId") ? r.a.navigateTo({
                url: e.jumpLink + "&pageSource=9"
              }) : (n = {
                title: e.title,
                url: encodeURIComponent(e.jumpLink)
              }, r.a.navigateTo({
                url: "/videoBag/pages/h5/h5?model=" + JSON.stringify(n)
              })) : 1 == e.jumpType ? r.a.navigateTo({
                url: "/growUp/pages/home/activitydetail/activitydetail?activityId=" + e.id + "&pageSource=9"
              }) : 2 == e.jumpType && e.jumpLink ? (y.globalData.applyPostSort = 0, r.a.navigateTo({
                url: "/videoBag/pages/posdetail/posdetail?postid=" + e.jumpLink + "&fromType=26&pageSource=9"
              })) : 3 == e.jumpType && e.jumpLink ? (y.globalData.applyPostSort = 1, r.a.navigateTo({
                url: "/echartsBag/pages/comdetail/comdetail?comid=" + e.jumpLink + "&pageSource=9"
              })) : 4 == e.jumpType && e.jumpLink ? r.a.navigateTo({
                url: "/videoBag/pages/preachMeeting/preachMeeting?id=" + e.jumpLink + "&pageSource=9"
              }) : 5 == e.jumpType ? r.a.navigateTo({
                url: "/videoBag/pages/doubleSelectList/doubleSelectList?id=" + e.jumpLink + "&name=" + e.title + "&pageSource=9"
              }) : 6 == e.jumpType && e.jumpLink ? y.globalData.isLogin ? r.a.navigateTo({
                url: "/growUp/pages/home/topicCircle/topicCircle?topicId=" + e.jumpLink + "&pageSource=9"
              }) : f.setData({
                showlogin: !0,
                jumpToPageUrl: ""
              }, (function() {
                r.a.setStorageSync("jumpToPageUrl", "")
              })) : 7 == e.jumpType && e.jumpLink ? r.a.navigateTo({
                url: "/secondBag/pages/courseDetails/courseDetails?id=" + e.jumpLink + "&pageSource=9"
              }) : 8 == e.jumpType && e.jumpLink ? y.globalData.isLogin ? r.a.navigateTo({
                url: "/fifthBag/pages/huzhouList/huzhouList?cityChannelId=" + e.jumpLink + "&pageSource=9"
              }) : f.setData({
                showlogin: !0,
                jumpToPageUrl: ""
              }, (function() {
                r.a.setStorageSync("jumpToPageUrl", "")
              })) : 9 == e.jumpType && e.jumpLink ? r.a.navigateTo({
                url: "/growUp/pages/home/informationdetail/informationdetail?id=" + e.jumpLink + "&pageSource=9"
              }) : 10 == e.jumpType && e.jumpLink ? r.a.navigateTo({
                url: "/growUp/pages/home/dynamicDetail/dynamicDetail?dynamicId=" + e.jumpLink + "&pageSource=9"
              }) : 11 == e.jumpType && e.jumpLink ? r.a.navigateTo({
                url: "/growUp/pages/home/questiondetail/questiondetail?questionId=" + e.jumpLink + "&pageSource=9"
              }) : 12 == e.jumpType && e.jumpLink ? r.a.navigateTo({
                url: "/growUp/pages/home/answerdetail/answerdetail?questionId=" + e.jumpLink2 + "&answerId=" + e.jumpLink + "&pageSource=9"
              }) : 13 == e.jumpType && e.jumpLink && ((n = e.jumpLink).includes("@") ? (n = n.split("@"), t = (n = c(n, 2))[0], n = n[1], r.a.navigateToMiniProgram({
                appId: t,
                path: n,
                envVersion: "release",
                success: function(e) {},
                fail: function(e) {}
              })) : r.a.navigateTo({
                url: e.jumpLink
              })), u.a.xyb_request("client/activity/LoadActivityList!statistic.action", "POST", {
                dataId: e.id,
                type: 14,
                user: r.a.getStorageSync("openid")
              }, !1, !1).then((function(e) {}), (function(e) {}))
            };
          t = function(e) {
            var t = (e = e.detail).current;
            "autoplay" !== (e = e.source) && "touch" !== e || l(t)
          }, Object(o.useEffect)((function() {
            return m(),
              function() {}
          }), []), Object(o.useEffect)((function() {
            d()
          }), [s]), this.anonymousFunc0 = t, t = 1 <= n.length ? n.map((function(t, n) {
            return t = {
              $original: Object(o.internal_get_original)(t)
            }, n = "bhdbz" + n, e.anonymousFunc1Map[n] = v, {
              _$indexKey: n,
              $original: t.$original
            }
          })) : [];
          return Object.assign(this.__state, {
            loopArray1382: t,
            bannerList: n,
            currentSwiper: s
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(e) {}
      }, {
        key: "anonymousFunc1",
        value: function(e) {
          for (var t, n = arguments.length, a = Array(1 < n ? n - 1 : 0), i = 1; i < n; i++) a[i - 1] = arguments[i];
          return this.anonymousFunc1Map[e] && (t = this.anonymousFunc1Map)[e].apply(t, a)
        }
      }]), l = n = d, n.$$events = ["anonymousFunc0", "anonymousFunc1"], n.$$componentPath = "pages/find/components/LearningPromotion/Inc/Banner/Banner", n = l;

      function d() {
        var e, t;
        ! function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, d);
        for (var n = arguments.length, a = Array(n), i = 0; i < n; i++) a[i] = arguments[i];
        return (e = t = m(this, (t = d.__proto__ || Object.getPrototypeOf(d)).call.apply(t, [this].concat(a)))).$usedState = ["loopArray1382", "bannerList", "currentSwiper"], t.anonymousFunc1Map = {}, t.customComponents = [], m(t, e)
      }
      Component(a(0).default.createComponent(n))
    },
    579: function(e, t, n) {
      e.exports = n.p + "pages/find/components/LearningPromotion/Inc/Banner/Banner.wxml"
    }
  },
  [
    [3398, 0, 2, 1, 3]
  ]
]);