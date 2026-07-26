var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [69], {
    2210: function(t, e, o) {
      o(656)
    },
    2211: function(t, e, o) {},
    3474: function(e, o, n) {
      n.r(o), n(2210);
      o = n(0);
      var r = n.n(o),
        s = (o = n(4), o = n.n(o), n(2211), function(t, e, o) {
          return e && a(t.prototype, e), o && a(t, o), t
        });

      function a(t, e) {
        for (var o = 0; o < e.length; o++) {
          var n = e[o];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }

      function i(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function u() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, u);
        for (var o = arguments.length, n = Array(o), r = 0; r < o; r++) n[r] = arguments[r];
        return (t = e = i(this, (e = u.__proto__ || Object.getPrototypeOf(u)).call.apply(e, [this].concat(n)))).$usedState = ["showNum", "msgNum"], e.config = {
          component: !0
        }, e.customComponents = [], i(e, t)
      }
      s = o()({
        properties: {
          msgNum: {
            type: Number,
            value: 0
          },
          showNum: {
            type: Boolean,
            value: !1
          }
        },
        data: {},
        methods: {}
      })((function(e, o) {
        if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + t(o));
        e.prototype = Object.create(o && o.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : e.__proto__ = o)
      }(u, r.a.Component), s(u, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, o, n) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, o);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(n) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, o, n) : void 0
          })(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "_constructor", this).call(this, t), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = (e = this.data).showNum,
            e = e.msgNum;
          return Object.assign(this.__state, {
            showNum: t,
            msgNum: e
          }), this.__state
        }
      }]), s = o = u, o.$$events = [], o.$$componentPath = "components/msg-dot/msg-dot", o = s)) || o, Component(n(0).default.createComponent(s))
    },
    656: function(t, e, o) {
      t.exports = o.p + "components/msg-dot/msg-dot.wxml"
    }
  },
  [
    [3474, 0, 2, 1]
  ]
]);