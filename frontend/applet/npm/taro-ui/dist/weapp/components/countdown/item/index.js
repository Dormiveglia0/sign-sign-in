var t = require("../../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [613], {
    2682: function(t, e, o) {
      o(896)
    },
    3713: function(e, o, n) {
      n.r(o), n(2682);
      o = n(0);
      var r = n.n(o),
        a = (o = n(7), o = n.n(o), n(23)),
        i = function(t, e, o) {
          return e && s(t.prototype, e), o && s(t, o), t
        };

      function s(t, e) {
        for (var o = 0; o < e.length; o++) {
          var n = e[o];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }

      function p(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function u() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, u);
        for (var o = arguments.length, n = Array(o), r = 0; r < o; r++) n[r] = arguments[r];
        return (t = e = p(this, (e = u.__proto__ || Object.getPrototypeOf(u)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp", "separator", "num"], e.customComponents = [], p(e, t)
      }(function(e, o) {
        if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + t(o));
        e.prototype = Object.create(o && o.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : e.__proto__ = o)
      })(u, a.a), i(u, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, o, n) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, o);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(n) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, o, n) : void 0
          })(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "_constructor", this).call(this, t), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "formatNum",
        value: function(t) {
          return t <= 9 ? "0" + t : "" + t
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = (e = this.__props).num,
            e = e.separator;
          t = this.formatNum(t);
          return Object.assign(this.__state, {
            anonymousState__temp: t,
            separator: e
          }), this.__state
        }
      }]), i = a = u, a.$$events = [], a.$$componentPath = "node_modules/taro-ui/dist/weapp/components/countdown/item/index", (a = i).defaultProps = {
        num: 0,
        separator: ":"
      }, a.propTypes = {
        num: o.a.number.isRequired,
        separator: o.a.string
      }, Component(n(0).default.createComponent(a))
    },
    896: function(t, e, o) {
      t.exports = o.p + "npm/taro-ui/dist/weapp/components/countdown/item/index.wxml"
    }
  },
  [
    [3713, 0, 2, 1]
  ]
]);