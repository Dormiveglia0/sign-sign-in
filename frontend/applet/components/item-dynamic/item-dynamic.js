var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [64], {
    1963: function(t, a, e) {
      e(542)
    },
    1964: function(t, a, e) {},
    3361: function(a, e, n) {
      n.r(e), n(1963);
      e = n(0);
      var o = n.n(e),
        i = (e = n(4), e = n.n(e), n(1)),
        s = (n(1964), function(t, a, e) {
          return a && r(t.prototype, a), e && r(t, e), t
        });

      function r(t, a) {
        for (var e = 0; e < a.length; e++) {
          var n = a[e];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }

      function u(a, e) {
        if (a) return !e || "object" != t(e) && "function" != typeof e ? a : e;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function c(t, a, e) {
        return a in t ? Object.defineProperty(t, a, {
          value: e,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : t[a] = e, t
      }
      var p = o.a.getApp();
      s = e()({
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
          isTopic: {
            type: Boolean,
            value: !1
          },
          isMoreOperationShow: {
            type: Boolean,
            value: !1
          },
          showComment: {
            type: Boolean,
            value: !1
          },
          isHot: {
            type: Boolean,
            value: !1
          }
        },
        data: {
          itemDataNew: "",
          images: {},
          tagInfo: ""
        },
        ready: function() {
          var t = this;
          t.setData({
            itemDataNew: t.data.itemData,
            tagInfo: t.data.itemData.basePersonIdentityDTO
          }), o.a.createSelectorQuery().in(this.$scope).select("#anster_info" + t.data.itemIndex).boundingClientRect((function(a) {
            a && 143 < (a.height || 0) ? t.setData((c(a = {}, "itemDataNew.overEight", !0), c(a, "itemDataNew.showAll", !1), a)) : t.setData((c(a = {}, "itemDataNew.showAll", !1), c(a, "itemDataNew.overEight", !1), a))
          })).exec()
        },
        methods: {
          imageLoad: function(t) {
            var a;
            t = (t = t.detail.width / t.detail.height) <= .3 ? (a = 260, 360) : .3 < t && t < 1 ? (a = 360 * t, 360) : 1 <= t && t <= 1.5 ? (a = 360) / t : 1.5 < t && t <= 2.5 ? (a = 510) / t : (a = 510, 200);
            this.data.images, this.setData({
              images: {
                width: a,
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
          toDetailspage: function(t) {
            var a = t.currentTarget.dataset.item,
              e = t.currentTarget.dataset.type;
            t = t.currentTarget.dataset.comment || null;
            2 == e ? o.a.navigateTo({
              url: "/growUp/pages/home/answerdetail/answerdetail?questionId=" + a.questionId + "&answerId=" + a.id
            }) : o.a.navigateTo({
              url: "/growUp/pages/home/dynamicDetail/dynamicDetail?dynamicId=" + a.id + "&showComment=" + t
            }), this.data.isHot && i.a.xyb_request("client/GetRecommendList!updateHotData.action", "POST", {
              id: a.hotId
            }, !1, !1).then((function(t) {}), (function(t) {}))
          },
          toDetail: function(t) {
            var a = t.currentTarget.dataset.comment || null;
            this.data.isLogin || 1 != a ? (this.toDetailspage(t), 2 == t.currentTarget.dataset.type ? o.a.setStorageSync("answerdetailComment", !0) : o.a.setStorageSync("dynamicDetailComment", !0)) : this.triggerEvent("changeShowlogin", !1, {
              bubbles: !1
            })
          },
          toTopicCircle: function(t) {
            2 == (t = t.currentTarget.dataset.dto).status ? o.a.showToast({
              title: "此话题已停止讨论",
              icon: "none"
            }) : p.globalData.isLogin ? o.a.navigateTo({
              url: "/growUp/pages/home/topicCircle/topicCircle?topicId=" + t.id
            }) : this.triggerEvent("changeShowlogin", !1, {
              bubbles: !1
            })
          },
          toPersonalpage: function(t) {
            var a = 3 == (t = t.currentTarget.dataset.item).creatorType ? 2 : 1;
            this.data.isLogin ? o.a.navigateTo({
              url: "/growUp/pages/home/homePage/index/index?personId=" + t.creatorId + "&creatorType=" + a
            }) : this.triggerEvent("changeShowlogin", !1, {
              bubbles: !1
            })
          },
          viewImg: function(t) {
            this.setData({
              gotoShowBigImg: !0
            });
            t = t.currentTarget.dataset.imgindex;
            var a = [];
            this.data.itemDataNew.imgList.forEach((function(t) {
              a.push(t)
            })), o.a.previewImage({
              current: a[t],
              urls: a
            })
          },
          awesome: function(t) {
            var a = this,
              e = this,
              n = t.currentTarget.dataset.id,
              o = t.currentTarget.dataset.status,
              s = this.data.itemDataNew;
            e.data.isLogin && !s.praise && (s.showLikeGif = !0, this.setData({
              itemDataNew: s
            }), setTimeout((function() {
              s.showLikeGif = !1, e.setData({
                itemDataNew: s
              })
            }), 1e3)), e.data.isLogin ? i.a.xyb_request("client/question/SaveInformation!praiseData.action", "POST", {
              id: n,
              status: o ? 0 : 1
            }, !0, !1).then((function(t) {
              var n = a.data.itemDataNew;
              n.praise = !o, n.totalPraise = t.data.totalPraise, e.setData({
                itemDataNew: n
              }), a.triggerEvent("changeInteractive", !1, {
                bubbles: !1
              })
            }), (function(t) {})) : this.triggerEvent("changeShowlogin", !1, {
              bubbles: !1
            })
          },
          moreOperation: function(t) {
            var a = this;
            o.a.createSelectorQuery().in(this.$scope).select(".moreOperationImg").boundingClientRect((function(e) {
              e && e.top ? o.a.setStorageSync("moreOperation_positionY", e.top) : o.a.setStorageSync("moreOperation_positionY", t.touches[0].clientY), a.data.isLogin ? a.triggerEvent("showMoreOperation", a.data.itemData, {
                bubbles: !1
              }) : a.triggerEvent("changeShowlogin", !1, {
                bubbles: !1
              })
            })).exec()
          },
          listImgError: function(t) {
            var a;
            (t = t.target.dataset.index) && ((a = {})["itemDataNew.imgList[" + t + "]"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAElBMVEVHcEzd3d3c3Nzb29vMy8vU09OM7aHFAAAAA3RSTlMAJq2Rz5ivAAABt0lEQVRYw+2YS07EMAyGyw3YcALEBXB9gjgHAMf3vwp+5DkMEh0JiUW86DROPtv543akHk9vcMk+n48XuGgfx+tV5P2Ay7aRjWxkIxvZyD9EkLjdnjQvWkeBFIqZ1Nxl0N9Gv0dQzC4hZJYrgjRZVnIZ1tm8IMsauh12xII1BDRCVqOiJoB6Jb/3IZCOqIgjqe+FrFjdkEcJByx7MdcdRH2F2gnlWwR9mhui5SYfn3XpNyQiRu6OxKoSOuMQzHxmbEjuiGqUS8SNn3NGumIY8RpCYuJAYQlHtqOOnCIKCK+Ipa57TLV44akHmmJTYV7r6dtP0ByT1IaiizwjhbGq5o7cVv1wLqjne7pkNaxOnR4gDfWyt1tDTo0JrOtbWK0xAvBQzxAYbZk8s83VrdgsSQRAbT7tOFmyIDuCVOvymRGgBveGSTePWBl1hSb9nZC8h8rUMLBm8Q7AgYSOoeKCuDKZa1CJxhp1WRaeXhfx8Fmx3rPeDxn1Ir3O8Sz1LK1rc+0giZ/UOhXvILIIETWIIXN5A5EM80sIpN8xtJnC+/9lIxvZyEY28pcIXyXwkY9dD3xSu/7h7gsj7xO5+/krugAAAABJRU5ErkJggg==", this.setData(a))
          },
          followTopic: function() {
            this.data.itemDataNew.talkFollowFlag || this.followTalk()
          },
          followTalk: function() {
            var t = this;
            i.a.xyb_request("client/question/SaveInformation!followTalk.action", "POST", {
              talkType: t.data.itemDataNew.talkTypeDTO.id,
              status: t.data.itemDataNew.talkFollowFlag ? 0 : 1
            }, !0, !1).then((function(a) {
              var e = t.data.itemDataNew;
              e.talkFollowFlag = !0, t.setData({
                itemDataNew: e
              })
            }), (function(t) {}))
          },
          changeShowAll: function() {
            this.setData(c({}, "itemDataNew.showAll", !this.data.itemDataNew.showAll))
          }
        }
      })((function(a, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + t(e));
        a.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(a, e) : a.__proto__ = e)
      }(m, o.a.Component), s(m, [{
        key: "_constructor",
        value: function(t) {
          (function t(a, e, n) {
            null === a && (a = Function.prototype);
            var o = Object.getOwnPropertyDescriptor(a, e);
            return void 0 !== o ? "value" in o ? o.value : void 0 !== (o = o.get) ? o.call(n) : void 0 : null !== (o = Object.getPrototypeOf(a)) ? t(o, e, n) : void 0
          })(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "_constructor", this).call(this, t), this.$$refs = new o.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            a = (p = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.data)).itemDataNew,
            e = p.isMoreOperationShow,
            n = p.isXyq,
            i = p.itemIndex,
            s = p.images,
            r = p.index,
            u = p.isTopic,
            c = p.itemData,
            p = p.tagInfo;
          return this.anonymousFunc0 = function(a) {
            a.stopPropagation(), o.a.eventCenter.trigger("taroClick", {
              funName: "查看动态详情"
            }), t.toDetailspage(a)
          }, this.anonymousFunc1 = function(a) {
            a.stopPropagation(), o.a.eventCenter.trigger("taroClick", {
              funName: "更多操作"
            }), t.moreOperation(a)
          }, this.anonymousFunc2 = function(a) {
            a.stopPropagation(), o.a.eventCenter.trigger("taroClick", {
              funName: "查看用户主页"
            }), t.toPersonalpage(a)
          }, this.anonymousFunc3 = function(a) {
            a.stopPropagation(), t.toPersonalpage(a)
          }, this.anonymousFunc4 = function(a) {
            a.stopPropagation(), t.changeShowAll(a)
          }, this.anonymousFunc5 = function(a) {
            a.stopPropagation(), t.changeShowAll(a)
          }, this.anonymousFunc6 = function(a) {
            a.stopPropagation(), t.viewImg(a)
          }, this.anonymousFunc7 = function(a) {
            a.stopPropagation(), t.viewImg(a)
          }, this.anonymousFunc8 = function(a) {
            a.stopPropagation(), t.viewImg(a)
          }, this.anonymousFunc9 = function(a) {
            a.stopPropagation(), t.viewImg(a)
          }, this.anonymousFunc10 = function(a) {
            a.stopPropagation(), t.viewImg(a)
          }, this.anonymousFunc11 = function(a) {
            a.stopPropagation(), t.viewImg(a)
          }, this.anonymousFunc12 = function(a) {
            a.stopPropagation(), t.viewImg(a)
          }, this.anonymousFunc13 = function(a) {
            a.stopPropagation(), t.toTopicCircle(a)
          }, this.anonymousFunc14 = function(a) {
            a.stopPropagation(), t.__props.onShare(a)
          }, this.anonymousFunc15 = function(a) {
            a.stopPropagation(), t.awesome(a)
          }, Object.assign(this.__state, {
            itemDataNew: a,
            isMoreOperationShow: e,
            tagInfo: p,
            isXyq: n,
            itemIndex: i,
            images: s,
            index: r,
            isTopic: u,
            itemData: c
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
      }]), s = e = m, e.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "errImg", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5", "imageLoad", "listImgError", "anonymousFunc6", "anonymousFunc7", "anonymousFunc8", "anonymousFunc9", "anonymousFunc10", "anonymousFunc11", "anonymousFunc12", "anonymousFunc13", "anonymousFunc14", "anonymousFunc15"], e.options = {
        addGlobalClass: !0
      }, e.$$componentPath = "components/item-dynamic/item-dynamic", e = s)) || e;

      function m() {
        var t, a;
        ! function(t, a) {
          if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function")
        }(this, m);
        for (var e = arguments.length, n = Array(e), o = 0; o < e; o++) n[o] = arguments[o];
        return (t = a = u(this, (a = m.__proto__ || Object.getPrototypeOf(m)).call.apply(a, [this].concat(n)))).$usedState = ["itemDataNew", "isMoreOperationShow", "tagInfo", "isXyq", "itemIndex", "images", "index", "isTopic", "itemData"], a.config = {
          component: !0
        }, a.customComponents = [], u(a, t)
      }
      Component(n(0).default.createComponent(s))
    },
    542: function(t, a, e) {
      t.exports = e.p + "components/item-dynamic/item-dynamic.wxml"
    }
  },
  [
    [3361, 0, 2, 1, 3]
  ]
]);