var t = require("../../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [608], {
    2242: function(t, e, o) {
      o(673)
    },
    3491: function(e, o, n) {
      n.r(o), n(2242);
      o = n(0);
      var r = n.n(o),
        a = (o = n(5), n.n(o)),
        s = (o = n(23), function(t, e, o) {
          return e && i(t.prototype, e), o && i(t, o), t
        });

      function i(t, e) {
        for (var o = 0; o < e.length; o++) {
          var n = e[o];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }

      function c(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function p() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, p);
        for (var o = arguments.length, n = Array(o), r = 0; r < o; r++) n[r] = arguments[r];
        return (t = e = c(this, (e = p.__proto__ || Object.getPrototypeOf(p)).call.apply(e, [this].concat(n)))).$usedState = ["rootClass", "className", "children"], e.customComponents = [], c(e, t)
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
      })(p, o.a), s(p, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, o, n) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, o);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(n) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, o, n) : void 0
          })(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "_constructor", this).call(this, t), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = a()("at-action-sheet__header", this.__props.className);
          return Object.assign(this.__state, {
            rootClass: t
          }), this.__state
        }
      }]), s = o = p, o.$$events = [], o.$$componentPath = "node_modules/taro-ui/dist/weapp/components/action-sheet/header/index", o = s, Component(n(0).default.createComponent(o))
    },
    673: function(t, e, o) {
      t.exports = o.p + "npm/taro-ui/dist/weapp/components/action-sheet/header/index.wxml"
    }
  },
  [
    [3491, 0, 2, 1]
  ]
]);