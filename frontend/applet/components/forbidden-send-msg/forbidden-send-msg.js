var e = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [57], {
    2380: function(e, t, n) {
      n(745)
    },
    2381: function(e, t, n) {},
    3562: function(t, n, o) {
      o.r(n), o(2380);
      n = o(0);
      var r = o.n(n),
        i = (n = o(4), n = o.n(n), o(2381), function(e, t, n) {
          return t && s(e.prototype, t), n && s(e, n), e
        });

      function s(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
      }

      function a(t, n) {
        if (t) return !n || "object" != e(n) && "function" != typeof n ? t : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function c() {
        var e, t;
        ! function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, c);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (e = t = a(this, (t = c.__proto__ || Object.getPrototypeOf(c)).call.apply(t, [this].concat(o)))).$usedState = ["isForbiddenSendMsg", "forbiddenSendMsgInfo"], t.config = {
          component: !0
        }, t.customComponents = [], a(t, e)
      }
      i = n()({
        properties: {
          isForbiddenSendMsg: {
            type: Boolean,
            value: !1
          },
          forbiddenSendMsgInfo: {
            type: Object,
            value: ""
          }
        },
        data: {},
        ready: function() {},
        detached: function() {},
        methods: {
          clickButton: function() {
            this.setData({
              isForbiddenSendMsg: !1
            })
          }
        }
      })((function(t, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + e(n));
        t.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(t, n) : t.__proto__ = n)
      }(c, r.a.Component), i(c, [{
        key: "_constructor",
        value: function(e) {
          (function e(t, n, o) {
            null === t && (t = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(t, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(t)) ? e(r, n, o) : void 0
          })(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "_constructor", this).call(this, e), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var e = this,
            t = (n = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.data)).forbiddenSendMsgInfo,
            n = n.isForbiddenSendMsg;
          return this.anonymousFunc0 = function(t) {
            t.stopPropagation(), r.a.eventCenter.trigger("taroClick", {
              funName: "关闭禁言提示"
            }), e.clickButton(t)
          }, Object.assign(this.__state, {
            isForbiddenSendMsg: n,
            forbiddenSendMsgInfo: t
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(e) {
          e.stopPropagation()
        }
      }]), i = n = c, n.$$events = ["anonymousFunc0"], n.$$componentPath = "components/forbidden-send-msg/forbidden-send-msg", n = i)) || n, Component(o(0).default.createComponent(i))
    },
    745: function(e, t, n) {
      e.exports = n.p + "components/forbidden-send-msg/forbidden-send-msg.wxml"
    }
  },
  [
    [3562, 0, 2, 1]
  ]
]);