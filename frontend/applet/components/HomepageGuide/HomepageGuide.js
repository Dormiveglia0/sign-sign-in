var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [22], {
    2882: function(t, e, n) {
      n(990)
    },
    2883: function(t, e, n) {},
    3801: function(e, n, o) {
      o.r(n), o(2882);
      n = o(0);
      var i = o.n(n),
        r = (o(2883), o(5)),
        a = o.n(r);
      r = function(t, e, n) {
        return e && s(t.prototype, e), n && s(t, n), t
      };

      function s(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }

      function u(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var p = i.a.getApp();

      function c() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, c);
        for (var n = arguments.length, o = Array(n), i = 0; i < n; i++) o[i] = arguments[i];
        return (t = e = u(this, (e = c.__proto__ || Object.getPrototypeOf(c)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "guideIndex", "isIphoneX", "isFirstShow", "changeOrderFlag"], e.timer = null, e.customComponents = [], u(e, t)
      }(n = (function(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + t(n));
        e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n)
      }(c, n.Component), r(c, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var i = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== i ? "value" in i ? i.value : void 0 !== (i = i.get) ? i.call(o) : void 0 : null !== (i = Object.getPrototypeOf(e)) ? t(i, n, o) : void 0
          })(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "_constructor", this).call(this, t), this.state = {
            guideIndex: -1,
            isIphoneX: p.globalData.isIphoneX
          }, this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "componentDidMount",
        value: function() {
          var t = this;
          this.props.isFirstShow && this.setState({
            guideIndex: 0
          }, (function() {
            clearTimeout(t.timer), t.timer = setTimeout((function() {
              t.nextStep()
            }), 100)
          }))
        }
      }, {
        key: "nextStep",
        value: function() {
          i.a.eventCenter.trigger("taroClick", {
            funName: "首页引导欢迎语引导弹窗-下一步"
          }), 2 === this.state.guideIndex && this.props.isFirstShow ? (this.setState({
            guideIndex: -1
          }), this.props.changeOrderFlag()) : (clearTimeout(this.timer), this.setState((function(t) {
            return {
              guideIndex: t.guideIndex + 1
            }
          }), (function() {})))
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = (e = this.__state).guideIndex,
            e = e.isIphoneX;
          t = 0 <= t ? a()("full-mask", e && "iphoneX") : null;
          return this.anonymousFunc0 = function(t) {
            t.stopPropagation()
          }, Object.assign(this.__state, {
            anonymousState__temp: t
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          t.stopPropagation()
        }
      }]), r = n = c, n.$$events = ["anonymousFunc0", "nextStep"], n.$$componentPath = "components/HomepageGuide/HomepageGuide", r)).defaultProps = {
        isFirstShow: !1,
        onClose: function() {}
      }, Component(o(0).default.createComponent(n))
    },
    990: function(t, e, n) {
      t.exports = n.p + "components/HomepageGuide/HomepageGuide.wxml"
    }
  },
  [
    [3801, 0, 2, 1]
  ]
]);