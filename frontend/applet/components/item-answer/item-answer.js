var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [61], {
    1967: function(t, n, o) {
      o(544)
    },
    1968: function(t, n, o) {},
    3363: function(n, o, e) {
      e.r(o), e(1967);
      o = e(0);
      var a = e.n(o),
        i = (o = e(4), o = e.n(o), e(1)),
        s = (e(1968), function(t, n, o) {
          return n && u(t.prototype, n), o && u(t, o), t
        });

      function u(t, n) {
        for (var o = 0; o < n.length; o++) {
          var e = n[o];
          e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e)
        }
      }

      function r(n, o) {
        if (n) return !o || "object" != t(o) && "function" != typeof o ? n : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var c = a.a.getApp();
      s = o()({
        properties: {
          itemData: {
            type: Object,
            value: ""
          },
          itemIndex: {
            type: Number,
            value: ""
          },
          isLogin: {
            type: Boolean,
            value: ""
          },
          isXyq: {
            type: Boolean,
            value: ""
          },
          isHelpType: {
            type: Number,
            value: 0
          },
          isTopic: {
            type: Boolean,
            value: !1
          },
          isMoreOperationShow: {
            type: Boolean,
            value: !1
          },
          cityChannelId: {
            type: String,
            value: ""
          },
          isHot: {
            type: Boolean,
            value: !1
          }
        },
        data: {
          itemDataNew: "",
          overEight: !1,
          images: {},
          tagInfo: ""
        },
        ready: function() {
          var t = this,
            n = t.data.itemData,
            o = '<img style="width:18px;height:18px;margin-right: 5px;position: relative;top:2px;" src="https://xcxstatic.xybsyw.com/xcx/images/hot_answer.png"/>',
            e = '<img style="width:18px;height:18px;margin-right: 5px;position: relative;top:2px;" src="https://xcxstatic.xybsyw.com/xcx/images/questionItemIcon.png"/>';
          t.data.isXyq ? -1 == n.content.indexOf(o) && (n.content = o + n.content) : 1 == t.props.isHelpType && n.title ? -1 == n.title.indexOf(e) && (n.title = e + n.title) : n.answerContent && -1 == n.answerContent.indexOf(o) && (n.answerContent = o + n.answerContent), t.setData({
            itemDataNew: n,
            tagInfo: n.basePersonIdentityDTO
          }), a.a.createSelectorQuery().in(this.$scope).select("#anster_info" + t.data.itemIndex) && a.a.createSelectorQuery().in(this.$scope).select("#anster_info" + t.data.itemIndex).boundingClientRect((function(n) {
            n && n.height && 170 < (n.height || 0) ? t.setData({
              overEight: !0
            }) : t.setData({
              overEight: !1
            })
          })).exec()
        },
        methods: {
          imageLoad: function(t) {
            var n;
            t = (t = t.detail.width / (t.detail.height || 0)) <= .3 ? (n = 260, 360) : .3 < t && t < 1 ? (n = 360 * t, 360) : 1 <= t && t <= 1.5 ? (n = 360) / t : 1.5 < t && t <= 2.5 ? (n = 510) / t : (n = 510, 200);
            this.data.images, this.setData({
              images: {
                width: n,
                height: t
              }
            })
          },
          errImg: function() {
            var t = this.data.itemDataNew;
            t.personPic = "https://xcxstatic.xybsyw.com/static/avatar_man.png", this.setData({
              itemDataNew: t
            })
          },
          toAnswerDetail: function(t) {
            t = t.currentTarget.dataset.item, a.a.navigateTo({
              url: "/growUp/pages/home/answerdetail/answerdetail?questionId=" + t.questionId + "&answerId=" + t.id
            }), this.data.isHot && i.a.xyb_request("client/GetRecommendList!updateHotData.action", "POST", {
              id: t.hotId
            }, !1, !1).then((function(t) {}), (function(t) {}))
          },
          toDetail: function(t) {
            this.toAnswerDetail(t), a.a.setStorageSync("answerdetailComment", !0)
          },
          toQuestionDetail: function(t) {
            40 == this.data.isHelpType ? this.toHelpCenter() : (t = t.currentTarget.dataset.id, a.a.navigateTo({
              url: "/growUp/pages/home/questiondetail/questiondetail?questionId=" + t
            }))
          },
          toAnswerDetail2: function(t) {
            40 == this.data.isHelpType ? this.toHelpCenter() : (t = t.currentTarget.dataset.item, a.a.navigateTo({
              url: "/growUp/pages/home/answerdetail/answerdetail?questionId=" + t.questionId + "&answerId=" + t.answerId
            }))
          },
          changeShowAll: function() {
            this.setData(function(t, n, o) {
              return n in t ? Object.defineProperty(t, n, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
              }) : t[n] = o, t
            }({}, "itemDataNew.showAll", !this.data.itemDataNew.showAll))
          },
          toHelpCenter: function() {
            a.a.navigateTo({
              url: "/fifthBag/pages/helpCenter/index/index?cityChannelId=" + this.data.cityChannelId
            })
          },
          toTopicCircle: function(t) {
            2 == (t = t.currentTarget.dataset.dto).status ? a.a.showToast({
              title: "此话题已停止讨论",
              icon: "none"
            }) : c.globalData.isLogin ? a.a.navigateTo({
              url: "/growUp/pages/home/topicCircle/topicCircle?topicId=" + t.id
            }) : this.triggerEvent("changeShowlogin", !1, {
              bubbles: !1
            })
          },
          toPersonalpage: function(t) {
            var n = 3 == (t = t.currentTarget.dataset.item).creatorType ? 2 : 1;
            this.data.isLogin ? a.a.navigateTo({
              url: "/growUp/pages/home/homePage/index/index?personId=" + t.creatorId + "&creatorType=" + n
            }) : this.triggerEvent("changeShowlogin", !1, {
              bubbles: !1
            })
          },
          viewImg: function(t) {
            this.setData({
              gotoShowBigImg: !0
            });
            t = t.currentTarget.dataset.imgindex;
            var n = [];
            this.data.itemDataNew.imgList.forEach((function(t) {
              n.push(t)
            })), a.a.previewImage({
              current: n[t],
              urls: n
            })
          },
          awesome: function(t) {
            var n = this,
              o = this,
              e = t.currentTarget.dataset.id,
              a = t.currentTarget.dataset.status,
              s = this.data.itemDataNew;
            o.data.isLogin && !s.praise && (s.showLikeGif = !0, this.setData({
              itemDataNew: s
            }), setTimeout((function() {
              s.showLikeGif = !1, o.setData({
                itemDataNew: s
              })
            }), 1e3)), o.data.isLogin ? i.a.xyb_request("client/question/SaveInformation!praiseData.action", "POST", {
              id: e,
              status: a ? 0 : 1
            }, !1, !1).then((function(t) {
              var e = n.data.itemDataNew;
              e.praise = !a, e.totalPraise = t.data.totalPraise, o.setData({
                itemDataNew: e
              }), n.triggerEvent("changeInteractive", !1, {
                bubbles: !1
              })
            }), (function(t) {})) : this.triggerEvent("changeShowlogin", !1, {
              bubbles: !1
            })
          },
          golrregularities: function() {
            a.a.navigateTo({
              url: "/growUp/pages/home/lrregularities/lrregularities"
            })
          },
          moreOperation: function(t) {
            var n = this;
            a.a.createSelectorQuery().in(this.$scope).select(".moreOperationImg").boundingClientRect((function(o) {
              o && o.top ? a.a.setStorageSync("moreOperation_positionY", o.top) : a.a.setStorageSync("moreOperation_positionY", t.touches[0].clientY), n.data.isLogin ? n.triggerEvent("showMoreOperation", n.data.itemData, {
                bubbles: !1
              }) : n.triggerEvent("changeShowlogin", !1, {
                bubbles: !1
              })
            })).exec()
          },
          listImgError: function(t) {
            var n;
            (t = t.target.dataset.index) && ((n = {})["itemDataNew.imgList[" + t + "]"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAElBMVEVHcEzd3d3c3Nzb29vMy8vU09OM7aHFAAAAA3RSTlMAJq2Rz5ivAAABt0lEQVRYw+2YS07EMAyGyw3YcALEBXB9gjgHAMf3vwp+5DkMEh0JiUW86DROPtv543akHk9vcMk+n48XuGgfx+tV5P2Ay7aRjWxkIxvZyD9EkLjdnjQvWkeBFIqZ1Nxl0N9Gv0dQzC4hZJYrgjRZVnIZ1tm8IMsauh12xII1BDRCVqOiJoB6Jb/3IZCOqIgjqe+FrFjdkEcJByx7MdcdRH2F2gnlWwR9mhui5SYfn3XpNyQiRu6OxKoSOuMQzHxmbEjuiGqUS8SNn3NGumIY8RpCYuJAYQlHtqOOnCIKCK+Ipa57TLV44akHmmJTYV7r6dtP0ByT1IaiizwjhbGq5o7cVv1wLqjne7pkNaxOnR4gDfWyt1tDTo0JrOtbWK0xAvBQzxAYbZk8s83VrdgsSQRAbT7tOFmyIDuCVOvymRGgBveGSTePWBl1hSb9nZC8h8rUMLBm8Q7AgYSOoeKCuDKZa1CJxhp1WRaeXhfx8Fmx3rPeDxn1Ir3O8Sz1LK1rc+0giZ/UOhXvILIIETWIIXN5A5EM80sIpN8xtJnC+/9lIxvZyEY28pcIXyXwkY9dD3xSu/7h7gsj7xO5+/krugAAAABJRU5ErkJggg==", this.setData(n))
          },
          followTopic: function() {
            this.data.itemDataNew.talkFollowFlag || this.followTalk()
          },
          followTalk: function() {
            var t = this;
            i.a.xyb_request("client/question/SaveInformation!followTalk.action", "POST", {
              talkType: t.data.itemDataNew.talkTypeDTO.id,
              status: t.data.itemDataNew.talkFollowFlag ? 0 : 1
            }, !1, !1).then((function(n) {
              var o = t.data.itemDataNew;
              o.talkFollowFlag = !0, t.setData({
                itemDataNew: o
              })
            }), (function(t) {}))
          }
        }
      })((function(n, o) {
        if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + t(o));
        n.prototype = Object.create(o && o.prototype, {
          constructor: {
            value: n,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(n, o) : n.__proto__ = o)
      }(p, a.a.Component), s(p, [{
        key: "_constructor",
        value: function(t) {
          (function t(n, o, e) {
            null === n && (n = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(n, o);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(e) : void 0 : null !== (a = Object.getPrototypeOf(n)) ? t(a, o, e) : void 0
          })(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "_constructor", this).call(this, t), this.$$refs = new a.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            n = (g = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.data)).itemDataNew,
            o = g.isMoreOperationShow,
            e = g.isXyq,
            i = g.isHelpType,
            s = g.itemIndex,
            u = g.index,
            r = g.overEight,
            c = g.images,
            p = g.isTopic,
            l = g.itemData,
            g = g.tagInfo,
            m = (this.anonymousFunc0 = function(n) {
              n.stopPropagation(), a.a.eventCenter.trigger("taroClick", {
                funName: "查看回答详情"
              }), t.toAnswerDetail(n)
            }, this.anonymousFunc1 = function(n) {
              n.stopPropagation(), a.a.eventCenter.trigger("taroClick", {
                funName: "更多操作"
              }), t.moreOperation(n)
            }, this.anonymousFunc2 = function(n) {
              n.stopPropagation(), a.a.eventCenter.trigger("taroClick", {
                funName: "查看用户主页"
              }), t.toPersonalpage(n)
            }, this.anonymousFunc3 = function(n) {
              n.stopPropagation(), t.toPersonalpage(n)
            }, this.anonymousFunc4 = function(n) {
              n.stopPropagation(), t.golrregularities(n)
            }, 0 != n.parentShowScope ? n.questionId + "key" : null);
          return this.anonymousFunc5 = function(n) {
            n.stopPropagation(), t.toQuestionDetail(n)
          }, this.anonymousFunc6 = function(n) {
            n.stopPropagation(), t.changeShowAll(n)
          }, this.anonymousFunc7 = function(n) {
            n.stopPropagation(), t.changeShowAll(n)
          }, this.anonymousFunc8 = function(n) {
            n.stopPropagation(), t.viewImg(n)
          }, this.anonymousFunc9 = function(n) {
            n.stopPropagation(), t.viewImg(n)
          }, this.anonymousFunc10 = function(n) {
            n.stopPropagation(), t.viewImg(n)
          }, this.anonymousFunc11 = function(n) {
            n.stopPropagation(), t.viewImg(n)
          }, this.anonymousFunc12 = function(n) {
            n.stopPropagation(), t.viewImg(n)
          }, this.anonymousFunc13 = function(n) {
            n.stopPropagation(), t.viewImg(n)
          }, this.anonymousFunc14 = function(n) {
            n.stopPropagation(), t.viewImg(n)
          }, this.anonymousFunc15 = function(n) {
            n.stopPropagation(), t.golrregularities(n)
          }, this.anonymousFunc16 = function(n) {
            n.stopPropagation(), t.toQuestionDetail(n)
          }, this.anonymousFunc17 = function(n) {
            n.stopPropagation(), t.toDetail(n)
          }, this.anonymousFunc18 = function(n) {
            n.stopPropagation(), t.awesome(n)
          }, this.anonymousFunc19 = function(n) {
            n.stopPropagation(), t.toAnswerDetail2(n)
          }, this.anonymousFunc20 = function(n) {
            n.stopPropagation(), t.__props.onShare(n)
          }, this.anonymousFunc21 = function(n) {
            n.stopPropagation(), t.awesome(n)
          }, Object.assign(this.__state, {
            anonymousState__temp: m,
            itemDataNew: n,
            isMoreOperationShow: o,
            isHelpType: i,
            tagInfo: g,
            isXyq: e,
            itemIndex: s,
            overEight: r,
            index: u,
            images: c,
            isTopic: p,
            itemData: l
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
      }, {
        key: "anonymousFunc5",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc6",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc7",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc8",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc9",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc10",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc11",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc12",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc13",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc14",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc15",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc16",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc17",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc18",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc19",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc20",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc21",
        value: function(t) {
          t.stopPropagation()
        }
      }]), s = o = p, o.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "errImg", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5", "anonymousFunc6", "anonymousFunc7", "imageLoad", "listImgError", "anonymousFunc8", "anonymousFunc9", "anonymousFunc10", "anonymousFunc11", "anonymousFunc12", "anonymousFunc13", "anonymousFunc14", "anonymousFunc15", "anonymousFunc16", "anonymousFunc17", "toDetail", "anonymousFunc18", "anonymousFunc19", "anonymousFunc20", "anonymousFunc21"], o.options = {
        addGlobalClass: !0
      }, o.$$componentPath = "components/item-answer/item-answer", o = s)) || o;

      function p() {
        var t, n;
        ! function(t, n) {
          if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
        }(this, p);
        for (var o = arguments.length, e = Array(o), a = 0; a < o; a++) e[a] = arguments[a];
        return (t = n = r(this, (n = p.__proto__ || Object.getPrototypeOf(p)).call.apply(n, [this].concat(e)))).$usedState = ["anonymousState__temp", "itemDataNew", "isMoreOperationShow", "isHelpType", "tagInfo", "isXyq", "itemIndex", "overEight", "index", "images", "isTopic", "itemData", "onShare"], n.config = {
          component: !0
        }, n.customComponents = [], r(n, t)
      }
      Component(e(0).default.createComponent(s))
    },
    544: function(t, n, o) {
      t.exports = o.p + "components/item-answer/item-answer.wxml"
    }
  },
  [
    [3363, 0, 2, 1, 3]
  ]
]);