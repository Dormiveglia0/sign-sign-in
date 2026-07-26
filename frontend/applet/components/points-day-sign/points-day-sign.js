var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [71], {
    2547: function(t, n, e) {
      e(824)
    },
    2548: function(t, n, e) {},
    3641: function(n, e, o) {
      o.r(e), o(2547);
      e = o(0);
      var i = o.n(e),
        a = (e = o(4), e = o.n(e), o(1)),
        s = (o(2548), function(t, n, e) {
          return n && r(t.prototype, n), e && r(t, e), t
        });

      function r(t, n) {
        for (var e = 0; e < n.length; e++) {
          var o = n[e];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }

      function c(n, e) {
        if (n) return !e || "object" != t(e) && "function" != typeof e ? n : e;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function p() {
        var t, n;
        ! function(t, n) {
          if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
        }(this, p);
        for (var e = arguments.length, o = Array(e), i = 0; i < e; i++) o[i] = arguments[i];
        return (t = n = c(this, (n = p.__proto__ || Object.getPrototypeOf(p)).call.apply(n, [this].concat(o)))).$usedState = ["signed", "imagePointsSrc", "labConstainLab"], n.config = {
          component: !0
        }, n.customComponents = [], c(n, t)
      }
      s = e()({
        properties: {
          signed: {
            type: Boolean,
            value: !1
          },
          signDay: {
            type: Number,
            value: 0,
            observer: function(t, n) {
              var e = "每日签到",
                o = this.data.signed ? "https://xcxstatic.xybsyw.com/xcx/images/points_day_" + t + "_ed.png" : "https://xcxstatic.xybsyw.com/xcx/images/points_day_" + ((t = 7 == t ? 0 : t) + 1) + ".png";
              this.setData({
                signDay: t,
                labConstainLab: e = 0 < t ? "已连续签到" + t + "天" : e,
                imagePointsSrc: o
              })
            }
          }
        },
        data: {
          labConstainLab: "每日签到",
          imagePointsSrc: "https://xcxstatic.xybsyw.com/xcx/images/points_day_1.png"
        },
        methods: {
          sign: function() {
            var t = this;
            this.data.signed ? i.a.showToast({
              title: "签到过了",
              icon: "none"
            }) : a.a.xyb_request("client/point/TaskPoint.action", "POST", {}).then((function(n) {
              200 == n.code && (n = t.data.signDay + 1, t.setData({
                signed: !0,
                signDay: n,
                imagePointsSrc: "https://xcxstatic.xybsyw.com/xcx/images/points_day_" + n + "_ed.png"
              }), t.triggerEvent("signSuccess"), i.a.showToast({
                title: "签到成功",
                icon: "none"
              }))
            }), (function(t) {}))
          }
        }
      })((function(n, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + t(e));
        n.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: n,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(n, e) : n.__proto__ = e)
      }(p, i.a.Component), s(p, [{
        key: "_constructor",
        value: function(t) {
          (function t(n, e, o) {
            null === n && (n = Function.prototype);
            var i = Object.getOwnPropertyDescriptor(n, e);
            return void 0 !== i ? "value" in i ? i.value : void 0 !== (i = i.get) ? i.call(o) : void 0 : null !== (i = Object.getPrototypeOf(n)) ? t(i, e, o) : void 0
          })(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            n = (o = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.data)).labConstainLab,
            e = o.signed,
            o = o.imagePointsSrc;
          return this.anonymousFunc0 = function(n) {
            n.stopPropagation(), i.a.eventCenter.trigger("taroClick", {
              funName: "签到"
            }), t.sign(n)
          }, Object.assign(this.__state, {
            signed: e,
            imagePointsSrc: o,
            labConstainLab: n
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          t.stopPropagation()
        }
      }]), s = e = p, e.$$events = ["anonymousFunc0"], e.$$componentPath = "components/points-day-sign/points-day-sign", e = s)) || e, Component(o(0).default.createComponent(s))
    },
    824: function(t, n, e) {
      t.exports = e.p + "components/points-day-sign/points-day-sign.wxml"
    }
  },
  [
    [3641, 0, 2, 1, 3]
  ]
]);