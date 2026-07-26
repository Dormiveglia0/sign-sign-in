var n = require("../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [11], {
    2889: function(n, o, t) {
      t(995)
    },
    3805: function(o, t, e) {
      e.r(t), e(2889);
      var i = e(0),
        a = e.n(i),
        r = (e(994), function(n, o) {
          if (Array.isArray(n)) return n;
          if (Symbol.iterator in Object(n)) return function(n, o) {
            var t = [],
              e = !0,
              i = !1,
              a = void 0;
            try {
              for (var r, s = n[Symbol.iterator](); !(e = (r = s.next()).done) && (t.push(r.value), !o || t.length !== o); e = !0);
            } catch (n) {
              i = !0, a = n
            } finally {
              try {
                !e && s.return && s.return()
              } finally {
                if (i) throw a
              }
            }
            return t
          }(n, o);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        });
      t = function(n, o, t) {
        return o && s(n.prototype, o), t && s(n, t), n
      };

      function s(n, o) {
        for (var t = 0; t < o.length; t++) {
          var e = o[t];
          e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(n, e.key, e)
        }
      }
      var u;

      function c(o, t) {
        if (o) return !t || "object" != n(t) && "function" != typeof t ? o : t;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function p() {
        var n, o;
        ! function(n, o) {
          if (!(n instanceof o)) throw new TypeError("Cannot call a class as a function")
        }(this, p);
        for (var t = arguments.length, e = Array(t), i = 0; i < t; i++) e[i] = arguments[i];
        return (n = o = c(this, (o = p.__proto__ || Object.getPrototypeOf(p)).call.apply(o, [this].concat(e)))).config = {
          usingComponents: {
            "van-icon": "../../../vant-weapp/dist/icon/index"
          }
        }, o.$usedState = ["anonymousState__temp", "$compid__2215", "$compid__2216", "$compid__2217", "item", "index", "hasWIFI", "isPlay", "cardClick", "__fn_onClick", "goLiveDetails", "onCountDownEnd", "videoClick"], o.customComponents = ["CountDown"], c(o, n)
      }(function(o, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + n(t));
        o.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: o,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(o, t) : o.__proto__ = t)
      })(p, a.a.Component), t(p, [{
        key: "_constructor",
        value: function(n) {
          (function n(o, t, e) {
            null === o && (o = Function.prototype);
            var i = Object.getOwnPropertyDescriptor(o, t);
            return void 0 !== i ? "value" in i ? i.value : void 0 !== (i = i.get) ? i.call(e) : void 0 : null !== (i = Object.getPrototypeOf(o)) ? n(i, t, e) : void 0
          })(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "_constructor", this).call(this, n), this.$$refs = new a.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
          var n = this.$prefix,
            o = Object(i.genCompid)(n + "$compid__2215"),
            t = (o = r(o, 2))[0],
            e = (o = o[1], Object(i.genCompid)(n + "$compid__2216")),
            a = (e = r(e, 2))[0],
            s = (e = e[1], n = Object(i.genCompid)(n + "$compid__2217"), (n = r(n, 2))[0]),
            u = (n = n[1], this.__props),
            c = u.item,
            p = u.index,
            l = u.hasWIFI,
            f = u.isPlay,
            y = (this.anonymousFunc0 = function(n) {
              n.stopPropagation(), u.videoPlay(n, p)
            }, this.anonymousFunc1 = function(n) {
              n.stopPropagation(), u.siwtchVoice(n, p)
            }, c.preVideoUrl ? null : {
              width: "100%"
            });
          return this.anonymousFunc2 = function(n) {
            n.stopPropagation(), u.videoPlay(n, p)
          }, this.anonymousFunc3 = function(n) {
            n.stopPropagation(), u.siwtchVoice(n, p)
          }, this.anonymousFunc4 = function(n) {
            n.stopPropagation(), u.siwtchVoice(n, p)
          }, this.anonymousFunc5 = function(n) {
            n.stopPropagation(), u.siwtchVoice(n, p)
          }, -1 === c.status && c.preVideoUrl && !l && i.propsManager.set({
            data: p,
            onEnd: this.__props.onCountDownEnd,
            countDownNum: c.countDownNum
          }, o, t), -1 === c.status && c.preVideoUrl && l && i.propsManager.set({
            data: p,
            onEnd: this.__props.onCountDownEnd,
            countDownNum: c.countDownNum
          }, e, a), -1 !== c.status || c.preVideoUrl || i.propsManager.set({
            data: p,
            onEnd: this.__props.onCountDownEnd,
            style: y,
            countDownNum: c.countDownNum
          }, n, s), Object.assign(this.__state, {
            anonymousState__temp: y,
            $compid__2215: o,
            $compid__2216: e,
            $compid__2217: n,
            item: c,
            index: p,
            hasWIFI: l,
            isPlay: f
          }), this.__state
        }
      }, {
        key: "funPrivatebdaez",
        value: function() {
          return this.props.cardClick.apply(void 0, Array.prototype.slice.call(arguments, 1))
        }
      }, {
        key: "funPrivatebdafz",
        value: function() {
          return this.props.goLiveDetails.apply(void 0, Array.prototype.slice.call(arguments, 1))
        }
      }, {
        key: "funPrivatebdagz",
        value: function() {
          return this.props.videoClick.apply(void 0, Array.prototype.slice.call(arguments, 1))
        }
      }, {
        key: "anonymousFunc0",
        value: function(n) {
          n.stopPropagation()
        }
      }, {
        key: "anonymousFunc1",
        value: function(n) {
          n.stopPropagation()
        }
      }, {
        key: "anonymousFunc2",
        value: function(n) {
          n.stopPropagation()
        }
      }, {
        key: "anonymousFunc3",
        value: function(n) {
          n.stopPropagation()
        }
      }, {
        key: "anonymousFunc4",
        value: function(n) {
          n.stopPropagation()
        }
      }, {
        key: "anonymousFunc5",
        value: function(n) {
          n.stopPropagation()
        }
      }]), u = t = p, t.$$events = ["funPrivatebdaez", "funPrivatebdafz", "funPrivatebdagz", "anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5"], t.$$componentPath = "components/BriefingSessionCard/BriefingSessionCardItem/BriefingSessionCardItem", (t = u).options = {
        addGlobalClass: !0
      }, t.config = {
        usingComponents: {
          "van-icon": "../../../vant-weapp/dist/icon/index"
        }
      }, t.defaultProps = {
        item: {},
        index: 0,
        hasWIFI: !1,
        isPlay: !1,
        cardClick: function() {},
        goLiveDetails: function() {},
        onCountDownEnd: function() {},
        videoClick: function() {},
        videoPlay: function() {},
        siwtchVoice: function() {}
      }, Component(e(0).default.createComponent(t))
    },
    995: function(n, o, t) {
      n.exports = t.p + "components/BriefingSessionCard/BriefingSessionCardItem/BriefingSessionCardItem.wxml"
    }
  },
  [
    [3805, 0, 2, 1, 3]
  ]
]);