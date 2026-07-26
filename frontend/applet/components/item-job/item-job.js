var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [67], {
    2313: function(t, e, o) {
      o(718)
    },
    2314: function(t, e, o) {},
    3536: function(e, o, r) {
      r.r(o), r(2313);
      o = r(0);
      var n = r.n(o),
        a = (o = r(4), o = r.n(o), r(2314), function(t, e, o) {
          return e && i(t.prototype, e), o && i(t, o), t
        });

      function i(t, e) {
        for (var o = 0; o < e.length; o++) {
          var r = e[o];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
      }

      function p(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function s() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, s);
        for (var o = arguments.length, r = Array(o), n = 0; n < o; n++) r[n] = arguments[n];
        return (t = e = p(this, (e = s.__proto__ || Object.getPrototypeOf(s)).call.apply(e, [this].concat(r)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "itemData", "type", "binderrorimg"], e.config = {
          component: !0
        }, e.customComponents = [], p(e, t)
      }
      a = o()({
        properties: {
          itemData: {
            type: Object,
            value: ""
          },
          pageSource: {
            type: String,
            value: ""
          },
          itemIndex: {
            type: Number,
            value: ""
          },
          type: {
            type: Number,
            value: 1
          }
        },
        data: {},
        methods: {
          binderrorimg: function() {
            var t = this.data.itemData;
            1 == this.data.type ? t.logoUrl = "https://xcxstatic.xybsyw.com/xcx/images/com_default.png" : t.enterpriseLog = "https://xcxstatic.xybsyw.com/xcx/images/com_default.png", this.setData({
              itemData: t
            })
          }
        }
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
      }(s, n.a.Component), a(s, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, o, r) {
            null === e && (e = Function.prototype);
            var n = Object.getOwnPropertyDescriptor(e, o);
            return void 0 !== n ? "value" in n ? n.value : void 0 !== (n = n.get) ? n.call(r) : void 0 : null !== (n = Object.getPrototypeOf(e)) ? t(n, o, r) : void 0
          })(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "_constructor", this).call(this, t), this.$$refs = new n.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = this.binderrorimg,
            e = (o = this.data).itemData,
            o = o.type,
            r = e.floorSalary || e.upperSalary ? +(e.floorSalary / 1e3).toFixed(1) + "-" + +(e.upperSalary / 1e3).toFixed(1) + "k/月" : null,
            n = e.upperSalary ? +(e.upperSalary / 1e3).toFixed(1) + "k/月" : null;
          return Object.assign(this.__state, {
            anonymousState__temp: r,
            anonymousState__temp2: n,
            itemData: e,
            type: o,
            binderrorimg: t
          }), this.__state
        }
      }]), a = o = s, o.$$events = ["binderrorimg"], o.options = {
        addGlobalClass: !0
      }, o.$$componentPath = "components/item-job/item-job", o = a)) || o, Component(r(0).default.createComponent(a))
    },
    718: function(t, e, o) {
      t.exports = o.p + "components/item-job/item-job.wxml"
    }
  },
  [
    [3536, 0, 2, 1]
  ]
]);