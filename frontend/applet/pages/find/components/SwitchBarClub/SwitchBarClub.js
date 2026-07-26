var t = require("../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [643], {
    2758: function(t, n, e) {
      e(934)
    },
    2759: function(t, n, e) {},
    3751: function(n, e, o) {
      o.r(e), o(2758);
      var r = o(0),
        i = o.n(r),
        a = (e = o(5), o.n(e));
      o(2759), e = function(t, n, e) {
        return n && u(t.prototype, n), e && u(t, e), t
      };

      function u(t, n) {
        for (var e = 0; e < n.length; e++) {
          var o = n[e];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var c;

      function s(n, e) {
        if (n) return !e || "object" != t(e) && "function" != typeof e ? n : e;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function l() {
        var t, n;
        ! function(t, n) {
          if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
        }(this, l);
        for (var e = arguments.length, o = Array(e), r = 0; r < e; r++) o[r] = arguments[r];
        return (t = n = s(this, (n = l.__proto__ || Object.getPrototypeOf(l)).call.apply(n, [this].concat(o)))).$usedState = ["loopArray1096", "list", "listIndex"], n.anonymousFunc0Map = {}, n.customComponents = [], s(n, t)
      }(function(n, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + t(e));
        n.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: n,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(n, e) : n.__proto__ = e)
      })(l, i.a.Component), e(l, [{
        key: "_constructor",
        value: function(t) {
          (function t(n, e, o) {
            null === n && (n = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(n, e);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(n)) ? t(r, e, o) : void 0
          })(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            n = (u = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.__props)).current,
            e = u.onClick,
            o = u.list,
            i = (u.type, o.length, function(t) {
              e && e(t)
            }),
            u = o.findIndex((function(t) {
              return t.id == n
            })),
            c = o && 0 < o.length ? o.map((function(e, u) {
              e = {
                $original: Object(r.internal_get_original)(e)
              };
              var c = o && 0 < o.length ? a()("switch-bar__item", n === e.$original.id && "switch-bar__item--active") : null;
              u = "bddhz" + u;
              return t.anonymousFunc0Map[u] = function() {
                return i(e.$original.id)
              }, {
                $loopState__temp2: c,
                _$indexKey: u,
                $original: e.$original
              }
            })) : [];
          return Object.assign(this.__state, {
            loopArray1096: c,
            list: o,
            listIndex: u
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          for (var n, e = arguments.length, o = Array(1 < e ? e - 1 : 0), r = 1; r < e; r++) o[r - 1] = arguments[r];
          return this.anonymousFunc0Map[t] && (n = this.anonymousFunc0Map)[t].apply(n, o)
        }
      }]), c = e = l, e.$$events = ["anonymousFunc0"], e.$$componentPath = "pages/find/components/SwitchBarClub/SwitchBarClub", (e = c).defaultProps = {
        list: [],
        current: 0,
        onClick: function() {}
      }, Component(o(0).default.createComponent(e))
    },
    934: function(t, n, e) {
      t.exports = e.p + "pages/find/components/SwitchBarClub/SwitchBarClub.wxml"
    }
  },
  [
    [3751, 0, 2, 1]
  ]
]);