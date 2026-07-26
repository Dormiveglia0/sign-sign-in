var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [62], {
    2352: function(t, e, o) {
      o(731)
    },
    2353: function(t, e, o) {},
    3548: function(e, o, n) {
      n.r(o), n(2352);
      o = n(0);
      var r = n.n(o),
        a = (o = n(4), o = n.n(o), n(2353), function(t, e, o) {
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
        return (t = e = c(this, (e = p.__proto__ || Object.getPrototypeOf(p)).call.apply(e, [this].concat(n)))).$usedState = ["type", "itemData", "binderrorimg"], e.config = {
          component: !0
        }, e.customComponents = [], c(e, t)
      }
      a = o()({
        properties: {
          itemData: {
            type: Object,
            value: ""
          },
          itemIndex: {
            type: Number,
            value: ""
          },
          pageSource: {
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
            t.personPic = "https://xcxstatic.xybsyw.com/xcx/images/com_default.png", this.setData({
              itemData: t
            })
          },
          tocomdetail: function(t) {
            var e;
            t && t.currentTarget && t.currentTarget.dataset && (t = t.currentTarget.dataset.id, e = "", this.data.pageSource && (e = "&pageSource=" + this.data.pageSource), r.a.navigateTo({
              url: "/echartsBag/pages/comdetail/comdetail?comid=" + t + e
            }))
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
      }(p, r.a.Component), a(p, [{
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
          var t = this,
            e = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.binderrorimg),
            o = (n = this.data).type,
            n = n.itemData;
          return this.anonymousFunc0 = function(e) {
            e.stopPropagation(), r.a.eventCenter.trigger("taroClick", {
              funName: "查看企业详情"
            }), t.tocomdetail(e)
          }, Object.assign(this.__state, {
            type: o,
            itemData: n,
            binderrorimg: e
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          t.stopPropagation()
        }
      }]), a = o = p, o.$$events = ["anonymousFunc0", "binderrorimg"], o.$$componentPath = "components/item-company/item-company", o = a)) || o, Component(n(0).default.createComponent(a))
    },
    731: function(t, e, o) {
      t.exports = o.p + "components/item-company/item-company.wxml"
    }
  },
  [
    [3548, 0, 2, 1]
  ]
]);