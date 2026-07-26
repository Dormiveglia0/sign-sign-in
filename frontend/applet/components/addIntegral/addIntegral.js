var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [49], {
    2384: function(t, e, n) {
      n(747)
    },
    2385: function(t, e, n) {},
    3564: function(e, n, o) {
      o.r(n), o(2384);
      n = o(0);
      var a = o.n(n),
        r = (n = o(4), n = o.n(n), o(2385), function(t, e, n) {
          return e && i(t.prototype, e), n && i(t, n), t
        });

      function i(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }

      function s(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function p() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, p);
        for (var n = arguments.length, o = Array(n), a = 0; a < n; a++) o[a] = arguments[a];
        return (t = e = s(this, (e = p.__proto__ || Object.getPrototypeOf(p)).call.apply(e, [this].concat(o)))).$usedState = ["isShow", "animationData", "goldType", "fengType"], e.config = {
          component: !0
        }, e.customComponents = [], s(e, t)
      }
      r = n()({
        properties: {
          goldType: {
            type: Number,
            value: 0
          },
          fengType: {
            type: Number,
            value: -1
          },
          isShow: {
            type: Boolean,
            value: !1
          }
        },
        data: {
          animationData: "",
          setInter: ""
        },
        created: function() {
          var t = a.a.createAnimation({
              duration: 1500,
              timingFunction: "linear"
            }),
            e = (this.animation = t, this.setData({
              animationData: t.export()
            }), 0),
            n = this;
          n.data.setInter = setInterval(function() {
            e += 1, n.animation.rotate(180 * e).step(), n.setData({
              animationData: n.animation.export()
            })
          }.bind(n), 1500)
        },
        attached: function() {},
        detached: function() {
          clearInterval(this.data.setInter)
        },
        methods: {}
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
      }(p, a.a.Component), r(p, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(o) : void 0 : null !== (a = Object.getPrototypeOf(e)) ? t(a, n, o) : void 0
          })(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "_constructor", this).call(this, t), this.$$refs = new a.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = (o = this.data).animationData,
            e = o.goldType,
            n = o.fengType,
            o = o.isShow;
          return Object.assign(this.__state, {
            isShow: o,
            animationData: t,
            goldType: e,
            fengType: n
          }), this.__state
        }
      }]), r = n = p, n.$$events = [], n.$$componentPath = "components/addIntegral/addIntegral", n = r)) || n, Component(o(0).default.createComponent(r))
    },
    747: function(t, e, n) {
      t.exports = n.p + "components/addIntegral/addIntegral.wxml"
    }
  },
  [
    [3564, 0, 2, 1]
  ]
]);