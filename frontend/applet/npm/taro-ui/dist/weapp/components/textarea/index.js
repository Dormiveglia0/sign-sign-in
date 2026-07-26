var e = require("../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [620], {
    2347: function(e, t, o) {
      o(728)
    },
    3545: function(t, o, n) {
      n.r(o), n(2347);
      o = n(5);
      var a = n.n(o),
        r = (o = n(7), o = n.n(o), n(0)),
        s = n.n(r),
        c = n(23),
        l = n(45),
        i = function(e, t, o) {
          return t && u(e.prototype, t), o && u(e, o), e
        };

      function u(e, t) {
        for (var o = 0; o < t.length; o++) {
          var n = t[o];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
      }
      var p = function e(t, o, n) {
        null === t && (t = Function.prototype);
        var a = Object.getOwnPropertyDescriptor(t, o);
        return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(n) : void 0 : null !== (a = Object.getPrototypeOf(t)) ? e(a, o, n) : void 0
      };

      function f(t, o) {
        if (t) return !o || "object" != e(o) && "function" != typeof o ? t : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var h = s.a.getEnv();

      function d() {
        var e, t;
        ! function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, d);
        for (var o = arguments.length, n = Array(o), a = 0; a < o; a++) n[a] = arguments[a];
        return (e = t = f(this, (e = d.__proto__ || Object.getPrototypeOf(d)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "rootCls", "placeholderStyle", "placeholderCls", "cursorSpacing", "value", "actualMaxLength", "placeholder", "disabled", "autoFocus", "focus", "showConfirmBar", "selectionStart", "selectionEnd", "fixed", "count", "_maxLength", "customStyle", "className", "placeholderClass", "maxLength", "textOverflowForbidden", "height"], t.handleInput = function(e) {
          t.props.onChange(e.target.value, e)
        }, t.handleFocus = function(e) {
          t.props.onFocus && t.props.onFocus(e)
        }, t.handleBlur = function(e) {
          t.props.onBlur && t.props.onBlur(e)
        }, t.handleConfirm = function(e) {
          t.props.onConfirm && t.props.onConfirm(e)
        }, t.handleLinechange = function(e) {
          t.props.onLinechange && t.props.onLinechange(e)
        }, t.customComponents = [], f(t, e)
      }(i = (Object(l.a)(), function(t, o) {
        if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + e(o));
        t.prototype = Object.create(o && o.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(t, o) : t.__proto__ = o)
      }(d, c.a), i(d, [{
        key: "_constructor",
        value: function() {
          p(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "_constructor", this).apply(this, arguments), this.$$refs = new s.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var e = (x = this.__props).customStyle,
            t = x.className,
            o = x.value,
            n = x.cursorSpacing,
            c = x.placeholder,
            l = x.placeholderStyle,
            i = x.placeholderClass,
            u = x.maxLength,
            p = x.count,
            f = x.disabled,
            d = x.autoFocus,
            m = x.focus,
            b = x.showConfirmBar,
            g = x.selectionStart,
            y = x.selectionEnd,
            _ = x.fixed,
            v = x.textOverflowForbidden,
            x = x.height;
          v = function(e, t) {
            return t ? e : e + 500
          }(u = parseInt(u.toString()), v), x = x ? "height:" + s.a.pxTransform(Number(x)) : "", t = a()("at-textarea", "at-textarea--" + h, {
            "at-textarea--error": u < o.length
          }, t), i = a()("placeholder", i), e = Object(r.internal_inline_style)(e), x = Object(r.internal_inline_style)(x);
          return Object.assign(this.__state, {
            anonymousState__temp: e,
            anonymousState__temp2: x,
            rootCls: t,
            placeholderStyle: l,
            placeholderCls: i,
            cursorSpacing: n,
            value: o,
            actualMaxLength: v,
            placeholder: c,
            disabled: f,
            autoFocus: d,
            focus: m,
            showConfirmBar: b,
            selectionStart: g,
            selectionEnd: y,
            fixed: _,
            count: p,
            _maxLength: u
          }), this.__state
        }
      }]), c = l = d, l.$$events = ["handleInput", "handleFocus", "handleBlur", "handleConfirm", "handleLinechange"], l.$$componentPath = "node_modules/taro-ui/dist/weapp/components/textarea/index", c)).defaultProps = {
        customStyle: "",
        className: "",
        value: "",
        cursorSpacing: 100,
        maxLength: 200,
        placeholder: "",
        disabled: !1,
        autoFocus: !1,
        focus: !1,
        showConfirmBar: !1,
        selectionStart: -1,
        selectionEnd: -1,
        count: !0,
        fixed: !1,
        height: "",
        textOverflowForbidden: !0,
        onLinechange: function() {},
        onChange: function() {},
        onFocus: function() {},
        onBlur: function() {},
        onConfirm: function() {}
      }, i.propTypes = {
        customStyle: o.a.oneOfType([o.a.object, o.a.string]),
        className: o.a.oneOfType([o.a.array, o.a.string]),
        value: o.a.string.isRequired,
        cursorSpacing: o.a.number,
        maxLength: o.a.oneOfType([o.a.string, o.a.number]),
        placeholderClass: o.a.string,
        placeholderStyle: o.a.string,
        placeholder: o.a.string,
        disabled: o.a.bool,
        autoFocus: o.a.bool,
        focus: o.a.bool,
        showConfirmBar: o.a.bool,
        selectionStart: o.a.number,
        selectionEnd: o.a.number,
        count: o.a.bool,
        textOverflowForbidden: o.a.bool,
        fixed: o.a.bool,
        height: o.a.oneOfType([o.a.string, o.a.number]),
        onLinechange: o.a.func,
        onChange: o.a.func.isRequired,
        onFocus: o.a.func,
        onBlur: o.a.func,
        onConfirm: o.a.func
      }, Component(n(0).default.createComponent(i))
    },
    728: function(e, t, o) {
      e.exports = o.p + "npm/taro-ui/dist/weapp/components/textarea/index.wxml"
    }
  },
  [
    [3545, 0, 2, 1]
  ]
]);