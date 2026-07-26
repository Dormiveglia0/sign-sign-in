require("../../@babel/runtime/helpers/Arrayincludes");
var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [16], {
    1945: function(t, e, o) {
      o(534)
    },
    1946: function(t, e, o) {},
    3353: function(e, o, a) {
      a.r(o), a(1945);
      var n = a(0),
        r = a.n(n),
        i = (o = a(5), a.n(o));
      a(1946), o = function(t, e, o) {
        return e && l(t.prototype, e), o && l(t, o), t
      };

      function l(t, e) {
        for (var o = 0; o < e.length; o++) {
          var a = e[o];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a)
        }
      }
      var p;

      function s(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var u = ["实习证明", "免费住宿", "免费餐食", "提供转正", "周末双休", "合作基地", "上市公司", "国企", "大厂"];

      function c() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, c);
        for (var o = arguments.length, a = Array(o), n = 0; n < o; n++) a[n] = arguments[n];
        return (t = e = s(this, (e = c.__proto__ || Object.getPrototypeOf(c)).call.apply(e, [this].concat(a)))).$usedState = ["anonymousState__temp", "loopArray1420", "welfareLabels", "_item"], e.customComponents = [], s(e, t)
      }(o = (function(e, o) {
        if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + t(o));
        e.prototype = Object.create(o && o.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : e.__proto__ = o)
      }(c, r.a.Component), o(c, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, o, a) {
            null === e && (e = Function.prototype);
            var n = Object.getOwnPropertyDescriptor(e, o);
            return void 0 !== n ? "value" in n ? n.value : void 0 !== (n = n.get) ? n.call(a) : void 0 : null !== (n = Object.getPrototypeOf(e)) ? t(n, o, a) : void 0
          })(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "_constructor", this).call(this, t), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = this.__props,
            e = t.item || {},
            o = e.welfareLabels && 0 < e.welfareLabels.length ? e.welfareLabels.slice(0, 3) : [],
            a = function() {
              return 0 == e.salaryType ? e.floorSalary || e.upperSalary ? e.floorSalary + "-" + e.upperSalary + "/月" : "面谈" : 2 == e.salaryType ? e.upperSalary ? e.upperSalary + "/月" : "面谈" : 1 == e.salaryType ? e.daySalary ? null === e.miniDaySalary ? e.daySalary + "/天" : e.miniDaySalary + "-" + e.daySalary + "/天" : "面谈" : 3 == e.salaryType ? e.daySalary ? e.daySalary + "/天" : "面谈" : 4 == e.salaryType ? "面谈" : ""
            },
            r = (a = (this.anonymousFunc0 = function(o) {
              o.stopPropagation(), t.onPositionClick && t.onPositionClick(e)
            }, a()), o.map((function(t, e) {
              return t = {
                $original: Object(n.internal_get_original)(t)
              }, {
                $loopState__temp3: i()("company-post-item__tag", u.includes(t.$original) && "company-post-item__tag--highlight"),
                $original: t.$original
              }
            })));
          return Object.assign(this.__state, {
            anonymousState__temp: a,
            loopArray1420: r,
            welfareLabels: o,
            _item: e
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          t.stopPropagation()
        }
      }]), p = o = c, o.$$events = ["anonymousFunc0"], o.$$componentPath = "components/CompanyCard/CompanyPostItem", p)).options = {
        addGlobalClass: !0
      }, Component(a(0).default.createComponent(o))
    },
    534: function(t, e, o) {
      t.exports = o.p + "components/CompanyCard/CompanyPostItem.wxml"
    }
  },
  [
    [3353, 0, 2, 1]
  ]
]);