var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [59], {
    2376: function(t, o, e) {
      e(743)
    },
    2377: function(t, o, e) {},
    3560: function(o, e, n) {
      n.r(e), n(2376);
      var a = n(0),
        i = n.n(a),
        r = (e = n(4), e = n.n(e), n(2377), "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(o) {
          return t(o)
        } : function(o) {
          return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : t(o)
        }),
        s = function(t, o, e) {
          return o && u(t.prototype, o), e && u(t, e), t
        };

      function u(t, o) {
        for (var e = 0; e < o.length; e++) {
          var n = o[e];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }

      function c(o, e) {
        if (o) return !e || "object" != t(e) && "function" != typeof e ? o : e;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var p = i.a.getApp();
      s = e()({
        options: {
          multipleSlots: !0
        },
        properties: {
          showKeyboard: {
            type: Boolean,
            value: !1
          },
          content: {
            type: String,
            value: ""
          },
          bottom: {
            type: Number,
            value: ""
          }
        },
        data: {
          emojiChar: "😠-😩-😲-😞-😵-😰-😒-😍-😤-😜-😝-😋-😘-😚-😷-😳-😃-😅-😆-😁-😂-😊-😄-😢-😭-😨-😣-😡-😡-😌-😖-😔-😱-😪-😏-😓-😥-😫-😉-👍",
          emoji: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39"],
          emojiPages: [],
          ifIphoneX: !1,
          showKeyboard: !1
        },
        ready: function() {
          var t, o = this.data.emojiChar.split("-"),
            e = [],
            n = [];
          this.data.emoji.forEach((function(a, i) {
            t = {
              char: o[i]
            }, (28 <= i ? n : e).push(t)
          })), this.setData({
            emojiPages: [e, n]
          }), this.setData({
            ifIphoneX: p.globalData.isIphoneX
          })
        },
        methods: {
          showKey: function() {
            this.triggerEvent("changeKey", !0)
          },
          hideKey: function() {
            this.triggerEvent("changeKey", !1)
          },
          emojiChoose: function(t) {
            var o;
            o = t.currentTarget.dataset.emoji ? this.data.content + t.currentTarget.dataset.emoji : (t = this.data.content).substring(0, t.length - 2), this.triggerEvent("emojiChoose", o)
          },
          insertImage: function() {
            this.triggerEvent("insertImage")
          },
          send: function() {
            var t = this,
              o = this.data.emojiChar.split("-"),
              e = this.data.content;
            o.forEach((function(o, n) {
              -1 < e.indexOf(o) && (e = e.replace(new RegExp(o, "gm"), '<img width="20" height="20" src="https://xcxstatic.xybsyw.com/xcx/emoji/emoji_' + t.data.emoji[n] + '.png">'))
            })), this.triggerEvent("send", e)
          }
        }
      })((function(o, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + t(e));
        o.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: o,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(o, e) : o.__proto__ = e)
      }(h, i.a.Component), s(h, [{
        key: "_constructor",
        value: function(t) {
          (function t(o, e, n) {
            null === o && (o = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(o, e);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(n) : void 0 : null !== (a = Object.getPrototypeOf(o)) ? t(a, e, n) : void 0
          })(h.prototype.__proto__ || Object.getPrototypeOf(h.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            o = (r = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.data)).bottom,
            e = r.ifIphoneX,
            n = r.showKeyboard,
            r = r.emojiPages,
            s = (this.anonymousFunc0 = function(o) {
              o.stopPropagation(), i.a.eventCenter.trigger("taroClick", {
                funName: "插入图片"
              }), t.insertImage(o)
            }, this.anonymousFunc1 = function(o) {
              o.stopPropagation(), i.a.eventCenter.trigger("taroClick", {
                funName: "隐藏键盘"
              }), t.hideKey(o)
            }, this.anonymousFunc2 = function(o) {
              o.stopPropagation(), i.a.eventCenter.trigger("taroClick", {
                funName: "显示键盘"
              }), t.showKey(o)
            }, this.anonymousFunc3 = function(o) {
              o.stopPropagation(), i.a.eventCenter.trigger("taroClick", {
                funName: "发布"
              }), t.send(o)
            }, n ? r.map((function(o, e) {
              return o = {
                $original: Object(a.internal_get_original)(o)
              }, e = "bfgdz" + e, t.anonymousFunc4Map[e] = function(o) {
                o.stopPropagation(), t.emojiChoose(o)
              }, {
                _$indexKey: e,
                $original: o.$original
              }
            })) : []);
          return Object.assign(this.__state, {
            loopArray1266: s,
            bottom: o,
            ifIphoneX: e,
            showKeyboard: n,
            emojiPages: r
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
          for (var o, e = arguments.length, n = Array(1 < e ? e - 1 : 0), a = 1; a < e; a++) n[a - 1] = arguments[a];
          return "object" === (void 0 === n ? "undefined" : r(n)) && n.stopPropagation && n.stopPropagation(), this.anonymousFunc4Map[t] && (o = this.anonymousFunc4Map)[t].apply(o, n)
        }
      }]), s = e = h, e.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "emojiChoose", "anonymousFunc4"], e.$$componentPath = "components/insertBottom/insertBottom", e = s)) || e;

      function h() {
        var t, o;
        ! function(t, o) {
          if (!(t instanceof o)) throw new TypeError("Cannot call a class as a function")
        }(this, h);
        for (var e = arguments.length, n = Array(e), a = 0; a < e; a++) n[a] = arguments[a];
        return (t = o = c(this, (o = h.__proto__ || Object.getPrototypeOf(h)).call.apply(o, [this].concat(n)))).$usedState = ["loopArray1266", "bottom", "ifIphoneX", "showKeyboard", "emojiPages"], o.config = {}, o.anonymousFunc4Map = {}, o.customComponents = [], c(o, t)
      }
      Component(n(0).default.createComponent(s))
    },
    743: function(t, o, e) {
      t.exports = e.p + "components/insertBottom/insertBottom.wxml"
    }
  },
  [
    [3560, 0, 2, 1]
  ]
]);