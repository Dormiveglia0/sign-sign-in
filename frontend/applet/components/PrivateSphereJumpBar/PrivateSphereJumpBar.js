var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [39], {
    2570: function(t, e, r) {
      r(836)
    },
    2571: function(t, e, r) {},
    3653: function(e, r, n) {
      n.r(r), n(2570);
      r = n(0);
      var o = n.n(r),
        i = (n(2571), function(t, e, r) {
          return e && a(t.prototype, e), r && a(t, r), t
        });

      function a(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }

      function p(e, r) {
        if (e) return !r || "object" != t(r) && "function" != typeof r ? e : r;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function c() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, c);
        for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
        return (t = e = p(this, (e = c.__proto__ || Object.getPrototypeOf(c)).call.apply(e, [this].concat(n)))).$usedState = ["title"], e.customComponents = [], p(e, t)
      }(function(e, r) {
        if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function, not " + t(r));
        e.prototype = Object.create(r && r.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r)
      })(c, r.Component), i(c, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, r, n) {
            null === e && (e = Function.prototype);
            var o = Object.getOwnPropertyDescriptor(e, r);
            return void 0 !== o ? "value" in o ? o.value : void 0 !== (o = o.get) ? o.call(n) : void 0 : null !== (o = Object.getPrototypeOf(e)) ? t(o, r, n) : void 0
          })(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "_constructor", this).call(this, t), this.$$refs = new o.a.RefsArray
        }
      }, {
        key: "handleClick",
        value: function() {
          o.a.eventCenter.trigger("taroClick", {
            funName: "跳转私域栏目-关闭"
          }), this.props.onClick()
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = this.__props.title;
          return Object.assign(this.__state, {
            title: t
          }), this.__state
        }
      }]), i = r = c, r.$$events = ["handleClick"], r.$$componentPath = "components/PrivateSphereJumpBar/PrivateSphereJumpBar", (r = i).defaultProps = {
        title: "",
        onClick: function() {}
      }, Component(n(0).default.createComponent(r))
    },
    836: function(t, e, r) {
      t.exports = r.p + "components/PrivateSphereJumpBar/PrivateSphereJumpBar.wxml"
    }
  },
  [
    [3653, 0, 2, 1]
  ]
]);