var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [60], {
    2551: function(t, e, n) {
      n(826)
    },
    2552: function(t, e, n) {},
    3643: function(e, n, o) {
      o.r(n), o(2551);
      n = o(0);
      var r = o.n(n),
        a = (n = o(4), n = o.n(n), o(2552), function(t, e, n) {
          return e && i(t.prototype, e), n && i(t, n), t
        });

      function i(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }

      function u(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function s() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, s);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = u(this, (e = s.__proto__ || Object.getPrototypeOf(s)).call.apply(e, [this].concat(o)))).$usedState = ["isShow", "pageType"], e.config = {
          component: !0
        }, e.customComponents = [], u(e, t)
      }
      a = n()({
        properties: {
          pageType: {
            type: Number,
            value: 0
          },
          isShow: {
            type: Boolean,
            value: !1
          }
        },
        data: {},
        created: function() {},
        attached: function() {},
        detached: function() {},
        methods: {
          hidePage: function() {
            this.setData({
              isShow: !1
            }), this.triggerEvent("onClose", {}, {})
          }
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
      }(s, r.a.Component), a(s, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, n, o) : void 0
          })(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "_constructor", this).call(this, t), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (n = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.data)).pageType,
            n = n.isShow;
          return this.anonymousFunc0 = function(e) {
            e.stopPropagation(), r.a.eventCenter.trigger("taroClick", {
              funName: "关闭积分引导"
            }), t.hidePage(e)
          }, this.anonymousFunc1 = function(e) {
            e.stopPropagation(), r.a.eventCenter.trigger("taroClick", {
              funName: "关闭积分引导"
            }), t.hidePage(e)
          }, this.anonymousFunc2 = function(e) {
            e.stopPropagation(), r.a.eventCenter.trigger("taroClick", {
              funName: "关闭积分引导"
            }), t.hidePage(e)
          }, Object.assign(this.__state, {
            isShow: n,
            pageType: e
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
      }]), a = n = s, n.$$events = ["privateStopNoop", "anonymousFunc0", "anonymousFunc1", "anonymousFunc2"], n.$$componentPath = "components/integral-guid/integral-guid", n = a)) || n, Component(o(0).default.createComponent(a))
    },
    826: function(t, e, n) {
      t.exports = n.p + "components/integral-guid/integral-guid.wxml"
    }
  },
  [
    [3643, 0, 2, 1]
  ]
]);