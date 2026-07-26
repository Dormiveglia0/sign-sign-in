var e = require("../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [614], {
    1886: function(e, t, o) {
      o(518)
    },
    3337: function(t, o, n) {
      n.r(o), n(1886);
      o = n(5);
      var r = n.n(o),
        a = (o = n(7), o = n.n(o), n(0)),
        s = n.n(a),
        i = n(23),
        c = n(45),
        p = function(e, t, o) {
          return t && l(e.prototype, t), o && l(e, o), e
        };

      function l(e, t) {
        for (var o = 0; o < t.length; o++) {
          var n = t[o];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
      }

      function u(t, o) {
        if (t) return !o || "object" != e(o) && "function" != typeof o ? t : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function f() {
        var e, t;
        ! function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, f);
        for (var o = arguments.length, n = Array(o), r = 0; r < o; r++) n[r] = arguments[r];
        return (e = t = u(this, (t = f.__proto__ || Object.getPrototypeOf(f)).call.apply(t, [this].concat(n)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "customStyle", "className", "prefixClass", "value", "size", "color"], t.customComponents = [], u(t, e)
      }
      Object(c.a)(),
        function(t, o) {
          if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + e(o));
          t.prototype = Object.create(o && o.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(t, o) : t.__proto__ = o)
        }(f, i.a), p(f, [{
          key: "_constructor",
          value: function(e) {
            (function e(t, o, n) {
              null === t && (t = Function.prototype);
              var r = Object.getOwnPropertyDescriptor(t, o);
              return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(n) : void 0 : null !== (r = Object.getPrototypeOf(t)) ? e(r, o, n) : void 0
            })(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "_constructor", this).call(this, e), this.$$refs = new s.a.RefsArray
          }
        }, {
          key: "handleClick",
          value: function() {
            this.props.onClick && this.props.onClick(arguments)
          }
        }, {
          key: "_createData",
          value: function() {
            this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
            var e = (c = this.__props).customStyle,
              t = c.className,
              o = c.prefixClass,
              n = c.value,
              i = c.size,
              c = c.color;
            i = {
              fontSize: "" + s.a.pxTransform(2 * parseInt(String(i))),
              color: c
            }, c = n ? o + "-" + n : "", n = r()(o, c, t), o = Object(a.internal_inline_style)(this.mergeStyle(i, e));
            return Object.assign(this.__state, {
              anonymousState__temp: n,
              anonymousState__temp2: o
            }), this.__state
          }
        }]), i = c = f, c.$$events = ["handleClick"], c.$$componentPath = "node_modules/taro-ui/dist/weapp/components/icon/index", (p = i).defaultProps = {
          customStyle: "",
          className: "",
          prefixClass: "at-icon",
          value: "",
          color: "",
          size: 24,
          onClick: function() {}
        }, p.propTypes = {
          customStyle: o.a.oneOfType([o.a.object, o.a.string]),
          className: o.a.oneOfType([o.a.array, o.a.string]),
          prefixClass: o.a.string,
          value: o.a.string,
          color: o.a.string,
          size: o.a.oneOfType([o.a.string, o.a.number]),
          onClick: o.a.func
        }, Component(n(0).default.createComponent(p))
    },
    518: function(e, t, o) {
      e.exports = o.p + "npm/taro-ui/dist/weapp/components/icon/index.wxml"
    }
  },
  [
    [3337, 0, 2, 1]
  ]
]);