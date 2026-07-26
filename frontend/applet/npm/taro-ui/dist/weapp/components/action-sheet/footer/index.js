var t = require("../../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [607], {
    2244: function(t, e, o) {
      o(675)
    },
    3493: function(e, o, n) {
      n.r(o), n(2244);
      o = n(0);
      var r = n.n(o),
        i = (o = n(5), n.n(o)),
        a = (o = n(7), o = n.n(o), n(23)),
        s = function(t, e, o) {
          return e && c(t.prototype, e), o && c(t, o), t
        };

      function c(t, e) {
        for (var o = 0; o < e.length; o++) {
          var n = e[o];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }
      var p, u = function t(e, o, n) {
        null === e && (e = Function.prototype);
        var r = Object.getOwnPropertyDescriptor(e, o);
        return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(n) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, o, n) : void 0
      };

      function l(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function f() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, f);
        for (var o = arguments.length, n = Array(o), r = 0; r < o; r++) n[r] = arguments[r];
        return e = l(this, (e = f.__proto__ || Object.getPrototypeOf(f)).call.apply(e, [this].concat(n))), p.call(t = e), l(e, t)
      }(function(e, o) {
        if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + t(o));
        e.prototype = Object.create(o && o.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : e.__proto__ = o)
      })(f, a.a), s(f, [{
        key: "_constructor",
        value: function() {
          u(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "_constructor", this).apply(this, arguments), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = i()("at-action-sheet__footer", this.__props.className);
          return Object.assign(this.__state, {
            rootClass: t
          }), this.__state
        }
      }]), s = a = f, a.$$events = ["handleClick"], a.$$componentPath = "node_modules/taro-ui/dist/weapp/components/action-sheet/footer/index", p = function() {
        var t = this;
        this.$usedState = ["rootClass", "className", "children"], this.handleClick = function() {
          var e;
          "function" == typeof t.props.onClick && (e = t.props).onClick.apply(e, arguments)
        }, this.customComponents = []
      }, (a = s).defaultProps = {
        onClick: function() {}
      }, a.propTypes = {
        onClick: o.a.func
      }, Component(n(0).default.createComponent(a))
    },
    675: function(t, e, o) {
      t.exports = o.p + "npm/taro-ui/dist/weapp/components/action-sheet/footer/index.wxml"
    }
  },
  [
    [3493, 0, 2, 1]
  ]
]);