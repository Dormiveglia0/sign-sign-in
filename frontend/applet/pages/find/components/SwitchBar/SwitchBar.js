var t = require("../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [642], {
    2711: function(t, e, n) {
      n(912)
    },
    2712: function(t, e, n) {},
    3729: function(e, n, o) {
      o.r(n), o(2711);
      var r = o(0),
        i = o.n(r),
        a = (n = o(5), o.n(n));
      o(2712), n = function(t, e, n) {
        return e && c(t.prototype, e), n && c(t, n), t
      };

      function c(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var u;

      function s(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function p() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, p);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = s(this, (e = p.__proto__ || Object.getPrototypeOf(p)).call.apply(e, [this].concat(o)))).$usedState = ["loopArray1120", "list", "listIndex", "type", "length"], e.anonymousFunc0Map = {}, e.customComponents = [], s(e, t)
      }(function(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + t(n));
        e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n)
      })(p, i.a.Component), n(p, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, n, o) : void 0
          })(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (i = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.__props)).current,
            n = i.onClick,
            o = i.list,
            i = i.type,
            c = o.length,
            u = function(t) {
              n && n(t)
            },
            s = o.findIndex((function(t) {
              return t.id == e
            })),
            p = o && 0 < o.length ? o.map((function(n, i) {
              n = {
                $original: Object(r.internal_get_original)(n)
              };
              var c = o && 0 < o.length ? a()("switch-bar__item", e === n.$original.id && "switch-bar__item--active") : null;
              i = "bdhfz" + i;
              return t.anonymousFunc0Map[i] = function() {
                return u(n.$original.id)
              }, {
                $loopState__temp2: c,
                _$indexKey: i,
                $original: n.$original
              }
            })) : [];
          return Object.assign(this.__state, {
            loopArray1120: p,
            list: o,
            listIndex: s,
            type: i,
            length: c
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          for (var e, n = arguments.length, o = Array(1 < n ? n - 1 : 0), r = 1; r < n; r++) o[r - 1] = arguments[r];
          return this.anonymousFunc0Map[t] && (e = this.anonymousFunc0Map)[t].apply(e, o)
        }
      }]), u = n = p, n.$$events = ["anonymousFunc0"], n.$$componentPath = "pages/find/components/SwitchBar/SwitchBar", (n = u).defaultProps = {
        list: [],
        current: 0,
        onClick: function() {}
      }, Component(o(0).default.createComponent(n))
    },
    912: function(t, e, n) {
      t.exports = n.p + "pages/find/components/SwitchBar/SwitchBar.wxml"
    }
  },
  [
    [3729, 0, 2, 1]
  ]
]);