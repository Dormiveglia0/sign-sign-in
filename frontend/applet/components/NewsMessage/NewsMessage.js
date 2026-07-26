var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [31], {
    2305: function(t, e, n) {
      n(714)
    },
    2306: function(t, e, n) {},
    3532: function(e, n, o) {
      o.r(n), o(2305);
      var a = o(0),
        s = o.n(a),
        i = (n = o(4), n = o.n(n), o(6)),
        r = o(1),
        c = o(29),
        u = o.n(c),
        l = (o(2306), "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
          return t(e)
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : t(e)
        });
      c = function(t, e, n) {
        return e && p(t.prototype, e), n && p(t, n), t
      };

      function p(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var g = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n, o = arguments[e];
          for (n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n])
        }
        return t
      };

      function f(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var m = getApp();
      i = Object(i.connect)((function(t) {
        return {
          xybData: t.xybData
        }
      }), (function(t) {
        return {
          setxybdata: function(t) {
            function e(e) {
              return t.apply(this, arguments)
            }
            return e.toString = function() {
              return t.toString()
            }, e
          }((function(e) {
            t(setxybdata(e))
          }))
        }
      }))(c = n()({
        data: {
          isLottieOut: !1,
          newBoxFlg: !1,
          newsListFlg: !1,
          activeItem: null,
          messageArr: []
        },
        onLoad: function(t) {},
        onShow: function() {
          var t = this;
          m.connectSocket().then((function() {
            t.startListening()
          })).catch((function(t) {}))
        },
        onHide: function() {
          s.a.getApp().globalData.jumpType = "link-ws", m.closeSocketConnection()
        },
        startListening: function() {
          s.a.getApp().globalData.jumpType = "ent-recruitmsg";
          var t = this;
          this.props.xybData.getWebsocketCallBack = function(e) {
            t.data.messageArr && 0 == t.data.messageArr.length && (t.setData({
              isLottieOut: !1,
              newBoxFlg: !0
            }), t.init());
            var n = t.data.messageArr || [];
            e = g({}, JSON.parse(e.data));
            4 < n.length && n.pop(), n.unshift(e), t.setData({
              messageArr: n,
              activeItem: null
            }, (function() {}))
          }, t.data.messageArr && 0 < t.data.messageArr.length && t.getMessage()
        },
        onUnload: function() {
          s.a.getApp().globalData.jumpType = "link-ws", m.closeSocketConnection()
        },
        onReady: function() {
          this.getMessage()
        },
        downLottieData: function(t) {
          return new Promise((function(e, n) {
            wx.request({
              url: t,
              header: {
                "content-type": "application/json"
              },
              success: function(t) {
                200 === t.statusCode && t.data ? e(t.data) : n(new Error("Failed to load animation data"))
              },
              fail: function(t) {
                n(t)
              }
            })
          }))
        },
        init: function() {
          var t = this;
          this.inited || this.setState({}, (function() {
            t.downLottieData("https://xcxstatic.xybsyw.com/lottieData/newMessage.js").then((function(e) {
              s.a.createSelectorQuery().in(t.$scope).selectAll("#lottie_demo").node((function(n) {
                var o;
                (n = n[0] && n[0].node ? n[0].node : "") && (o = n.getContext("2d"), n.width = 300, n.height = 300, u.a.setup(n), t.ani = u.a.loadAnimation({
                  loop: !1,
                  autoplay: !0,
                  animationData: e,
                  rendererSettings: {
                    context: o
                  }
                }), t.inited = !0, setTimeout((function() {
                  t.setData({
                    isLottieOut: !0
                  })
                }), 1500))
              })).exec()
            })).catch((function(e) {
              t.setData({
                isLottieOut: !0
              })
            }))
          }))
        },
        getMessage: function() {
          var t = this,
            e = this;
          r.a.xyb_request("client/message/EnterpriseTipsMes!listMessage.action", "POST", {}, !1, !1).then((function(n) {
            n.data && e.data.messageArr && 0 == e.data.messageArr.length && n.data && (e.setData({
              isLottieOut: !1,
              newBoxFlg: !0
            }), e.init()), n.data && n.data.length ? t.setData({
              isLottieOut: !1,
              newBoxFlg: !1,
              messageArr: n.data,
              newsListFlg: !1,
              activeItem: null
            }) : t.setData({
              messageArr: n.data,
              newsListFlg: !1,
              activeItem: null
            })
          })).catch((function(t) {}))
        },
        allRead: function() {
          var t = this;
          s.a.eventCenter.trigger("taroClick", {
            funName: "新消息-全部已读"
          }), r.a.xyb_request("client/message/EnterpriseTipsMes!tagAllRead.action", "POST", {}, !1, !1).then((function() {
            t.setData({
              isLottieOut: !1,
              newBoxFlg: !1,
              newsListFlg: !1,
              activeItem: null,
              messageArr: []
            })
          }))
        },
        onShowNewsList: function() {
          s.a.eventCenter.trigger("taroClick", {
            funName: "新消息-展开列表"
          }), this.setData({
            newsListFlg: !this.data.newsListFlg,
            activeItem: null
          })
        },
        closeNwes: function() {
          s.a.eventCenter.trigger("taroClick", {
            funName: "新消息-关闭显示"
          }), this.setData({
            newBoxFlg: !1,
            newsListFlg: !1,
            activeItem: null
          })
        },
        onNesBox: function() {
          s.a.eventCenter.trigger("taroClick", {
            funName: "新消息-收起列表"
          }), this.setData({
            newsListFlg: !1,
            activeItem: null
          })
        },
        onDialogue: function(t, e) {
          s.a.eventCenter.trigger("taroClick", {
            funName: "新消息-点击消息"
          }), r.a.xyb_request("client/message/EnterpriseTipsMes!clickRead.action", "POST", {
            msgId: t.id
          }, !1, !1).then((function(t) {})).catch((function(t) {})), this.setData({
            activeItem: t.id
          });
          var n = this;
          s.a.navigateTo({
            url: "/fifthBag/pages/message/newsdetail/newsdetail?sessionid=" + t.sessionId + "&comid=" + t.enterpriseId,
            success: function() {
              var t = n.data.messageArr || [];
              t.splice(e, 1), 0 == t.length ? n.setData({
                isLottieOut: !1,
                newBoxFlg: !1,
                newsListFlg: !1,
                activeItem: null,
                messageArr: []
              }) : n.setData({
                newsListFlg: !1,
                activeItem: null,
                messageArr: t
              })
            }
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
      }(y, s.a.Component), c(y, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(o) : void 0 : null !== (a = Object.getPrototypeOf(e)) ? t(a, n, o) : void 0
          })(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "_constructor", this).call(this, t), this.$$refs = new s.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (i = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.data)).isLottieOut,
            n = i.newBoxFlg,
            o = i.newsListFlg,
            s = i.activeItem,
            i = i.messageArr,
            r = (this.anonymousFunc0 = function(e) {
              e.stopPropagation(), t.onNesBox()
            }, this.anonymousFunc1 = function(e) {
              e.stopPropagation(), t.closeNwes()
            }, this.anonymousFunc2 = function(e) {
              e.stopPropagation(), t.onShowNewsList()
            }, this.anonymousFunc4 = function(e) {
              e.stopPropagation(), t.allRead()
            }, o ? i.map((function(e, n) {
              e = {
                $original: Object(a.internal_get_original)(e)
              };
              var o = "bfigz" + n;
              return t.anonymousFunc3Map[o] = function(o) {
                o.stopPropagation(), t.onDialogue(e.$original, n)
              }, {
                _$indexKey: o,
                $original: e.$original
              }
            })) : []);
          return Object.assign(this.__state, {
            loopArray1294: r,
            newsListFlg: o,
            newBoxFlg: n,
            isLottieOut: e,
            activeItem: s,
            messageArr: i
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
          for (var e, n = arguments.length, o = Array(1 < n ? n - 1 : 0), a = 1; a < n; a++) o[a - 1] = arguments[a];
          return "object" === (void 0 === o ? "undefined" : l(o)) && o.stopPropagation && o.stopPropagation(), this.anonymousFunc3Map[t] && (e = this.anonymousFunc3Map)[t].apply(e, o)
        }
      }, {
        key: "anonymousFunc4",
        value: function(t) {
          t.stopPropagation()
        }
      }]), n = i = y, i.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4"], i.$$componentPath = "components/NewsMessage/NewsMessage", c = n)) || c) || c;

      function y() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, y);
        for (var n = arguments.length, o = Array(n), a = 0; a < n; a++) o[a] = arguments[a];
        return (t = e = f(this, (e = y.__proto__ || Object.getPrototypeOf(y)).call.apply(e, [this].concat(o)))).$usedState = ["loopArray1294", "newsListFlg", "newBoxFlg", "isLottieOut", "activeItem", "messageArr", "xybData"], e.anonymousFunc3Map = {}, e.customComponents = [], f(e, t)
      }
      Component(o(0).default.createComponent(i))
    },
    714: function(t, e, n) {
      t.exports = n.p + "components/NewsMessage/NewsMessage.wxml"
    }
  },
  [
    [3532, 0, 2, 1, 3]
  ]
]);