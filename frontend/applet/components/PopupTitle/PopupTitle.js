var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [37], {
    2092: function(t, e, n) {
      n(601)
    },
    2093: function(t, e, n) {},
    3420: function(e, n, o) {
      o.r(n), o(2092);
      n = o(0);
      var r = o.n(n),
        i = o(6),
        u = o(9),
        c = (o(2093), function(t, e, n) {
          return e && a(t.prototype, e), n && a(t, n), t
        });

      function a(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }

      function p(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function s() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, s);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = p(this, (e = s.__proto__ || Object.getPrototypeOf(s)).call.apply(e, [this].concat(o)))).$usedState = ["leftText", "title", "rightText", "key"], e.customComponents = [], p(e, t)
      }(i = Object(i.connect)((function(t) {
        return {
          xybData: t.xybData
        }
      }), (function(t) {
        return {
          setxybdata: function(e) {
            t(Object(u.a)(e))
          }
        }
      }))((function(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + t(n));
        e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n)
      }(s, n.Component), c(s, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, n, o) : void 0
          })(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "_constructor", this).call(this, t), this.state = {
            key: ""
          }, this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "componentWillReceiveProps",
        value: function(t) {}
      }, {
        key: "componentWillMount",
        value: function() {}
      }, {
        key: "componentDidMount",
        value: function() {}
      }, {
        key: "componentDidShow",
        value: function() {}
      }, {
        key: "componentDidHide",
        value: function() {}
      }, {
        key: "componentWillUnmount",
        value: function() {}
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (o = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.__props)).title,
            n = o.leftText,
            o = o.rightText;
          return this.anonymousFunc0 = function() {
            r.a.eventCenter.trigger("taroClick", {
              funName: "取消"
            }), t.__props.onClose()
          }, this.anonymousFunc1 = function() {
            r.a.eventCenter.trigger("taroClick", {
              funName: "确定"
            }), t.__props.onGetData()
          }, Object.assign(this.__state, {
            leftText: n,
            title: e,
            rightText: o
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {}
      }, {
        key: "anonymousFunc1",
        value: function(t) {}
      }]), n = i = s, i.$$events = ["anonymousFunc0", "anonymousFunc1"], i.$$componentPath = "components/PopupTitle/PopupTitle", c = n)) || c).defaultProps = {
        title: "",
        leftText: "取消",
        rightText: "确定"
      }, Component(o(0).default.createComponent(i))
    },
    601: function(t, e, n) {
      t.exports = n.p + "components/PopupTitle/PopupTitle.wxml"
    }
  },
  [
    [3420, 0, 2, 1, 3]
  ]
]);