var t = require("../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [616], {
    1913: function(t, e, n) {
      n(523)
    },
    3342: function(e, n, o) {
      o.r(n), o(1913);
      n = o(7), n = o.n(n);
      var r = o(0),
        a = o.n(r),
        i = o(23),
        s = o(45),
        p = function(t, e, n) {
          return e && c(t.prototype, e), n && c(t, n), t
        };

      function c(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }

      function u(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function l() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, l);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = u(this, (e = l.__proto__ || Object.getPrototypeOf(l)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "color", "size"], e.customComponents = [], u(e, t)
      }
      Object(s.a)(),
        function(e, n) {
          if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + t(n));
          e.prototype = Object.create(n && n.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n)
        }(l, i.a), p(l, [{
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
            this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
            var t = (n = this.__props).color,
              e = "string" == typeof(n = n.size) ? n : String(n),
              n = {
                width: n ? "" + a.a.pxTransform(parseInt(e)) : "",
                height: n ? "" + a.a.pxTransform(parseInt(e)) : ""
              },
              o = (e = Object.assign({}, {
                border: t ? "1px solid " + t : "",
                "border-color": t ? t + " transparent transparent transparent" : ""
              }, n), t = Object(r.internal_inline_style)(n), n = Object(r.internal_inline_style)(e), Object(r.internal_inline_style)(e));
            e = Object(r.internal_inline_style)(e);
            return Object.assign(this.__state, {
              anonymousState__temp: t,
              anonymousState__temp2: n,
              anonymousState__temp3: o,
              anonymousState__temp4: e
            }), this.__state
          }
        }]), i = s = l, s.$$events = [], s.$$componentPath = "node_modules/taro-ui/dist/weapp/components/loading/index", (p = i).defaultProps = {
          size: 0,
          color: ""
        }, p.propTypes = {
          size: n.a.oneOfType([n.a.string, n.a.number]),
          color: n.a.oneOfType([n.a.string, n.a.number])
        }, Component(o(0).default.createComponent(p))
    },
    523: function(t, e, n) {
      t.exports = n.p + "npm/taro-ui/dist/weapp/components/loading/index.wxml"
    }
  },
  [
    [3342, 0, 2, 1]
  ]
]);