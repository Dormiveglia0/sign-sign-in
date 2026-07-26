var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [21], {
    2884: function(t, e, n) {
      n(991)
    },
    2885: function(t, e, n) {},
    3802: function(e, n, o) {
      o.r(n), o(2884);
      var r = o(0),
        a = o.n(r),
        i = (n = o(5), o.n(n));
      o(2885), n = function(t, e, n) {
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

      function l() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, l);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = s(this, (e = l.__proto__ || Object.getPrototypeOf(l)).call.apply(e, [this].concat(o)))).$usedState = ["loopArray1071", "list"], e.anonymousFunc0Map = {}, e.customComponents = [], s(e, t)
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
      })(l, a.a.Component), n(l, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, n, o) : void 0
          })(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "_constructor", this).call(this, t), this.$$refs = new a.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.__props),
            n = e.current,
            o = e.onClick,
            a = e.list,
            c = e.guideActive,
            u = function(t) {
              o && o(t)
            };
          return a && a.length ? (e = a.map((function(e, o) {
            e = {
              $original: Object(r.internal_get_original)(e)
            };
            var a = i()("home-tab-item", e.$original.anchorClass);
            o = "bdaiz" + o;
            return t.anonymousFunc0Map[o] = function() {
              return u(e.$original.id)
            }, {
              $loopState__temp2: a,
              _$indexKey: o,
              $loopState__temp4: i()("home-tab-item-text", n == e.$original.id && "active", c && e.$original.anchorClass && "part-time-tab-guide-active"),
              $original: e.$original
            }
          })), Object.assign(this.__state, {
            loopArray1071: e,
            list: a
          }), this.__state) : null
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          for (var e, n = arguments.length, o = Array(1 < n ? n - 1 : 0), r = 1; r < n; r++) o[r - 1] = arguments[r];
          return this.anonymousFunc0Map[t] && (e = this.anonymousFunc0Map)[t].apply(e, o)
        }
      }]), u = n = l, n.$$events = ["anonymousFunc0"], n.$$componentPath = "components/HomeTab/HomeTab", (n = u).defaultProps = {
        list: [],
        current: 0,
        guideActive: !1,
        onClick: function() {}
      }, n.options = {
        addGlobalClass: !0
      }, Component(o(0).default.createComponent(n))
    },
    991: function(t, e, n) {
      t.exports = n.p + "components/HomeTab/HomeTab.wxml"
    }
  },
  [
    [3802, 0, 2, 1]
  ]
]);