var e = require("../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [615], {
    2445: function(e, o, t) {
      t(775)
    },
    3592: function(o, t, n) {
      n.r(t), n(2445);
      var r = n(0),
        a = n.n(r),
        i = (t = n(5), n.n(t)),
        l = (t = n(7), t = n.n(t), n(23)),
        s = function(e, o, t) {
          return o && c(e.prototype, o), t && c(e, t), e
        };

      function c(e, o) {
        for (var t = 0; t < o.length; t++) {
          var n = o[t];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
      }
      var p = function e(o, t, n) {
        null === o && (o = Function.prototype);
        var r = Object.getOwnPropertyDescriptor(o, t);
        return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(n) : void 0 : null !== (r = Object.getPrototypeOf(o)) ? e(r, t, n) : void 0
      };

      function u(o, t) {
        if (o) return !t || "object" != e(t) && "function" != typeof t ? o : t;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function d() {
        var e, o;
        ! function(e, o) {
          if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function")
        }(this, d);
        for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
        return (e = o = u(this, (e = d.__proto__ || Object.getPrototypeOf(d)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp", "rootCls", "containerCls", "overlayCls", "title", "required", "name", "type", "password", "placeholderStyle", "placeholderCls", "placeholder", "cursorSpacing", "maxLength", "autoFocus", "focus", "value", "confirmType", "cursor", "selectionStart", "selectionEnd", "adjustPosition", "clear", "error", "className", "customStyle", "border", "placeholderClass", "editable", "children"], o.handleInput = function(e) {
          return o.props.onChange(e.detail.value, e)
        }, o.handleFocus = function(e) {
          "function" == typeof o.props.onFocus && o.props.onFocus(e.detail.value, e)
        }, o.handleBlur = function(e) {
          "function" == typeof o.props.onBlur && o.props.onBlur(e.detail.value, e), "blur" !== e.type || o.inputClearing || o.props.onChange(e.detail.value, e), o.inputClearing = !1
        }, o.handleConfirm = function(e) {
          "function" == typeof o.props.onConfirm && o.props.onConfirm(e.detail.value, e)
        }, o.handleClick = function(e) {
          o.props.editable || "function" != typeof o.props.onClick || o.props.onClick(e)
        }, o.handleClearValue = function(e) {
          o.inputClearing = !0, o.props.onChange("", e)
        }, o.handleKeyboardHeightChange = function(e) {
          "function" == typeof o.props.onKeyboardHeightChange && o.props.onKeyboardHeightChange(e)
        }, o.handleErrorClick = function(e) {
          "function" == typeof o.props.onErrorClick && o.props.onErrorClick(e)
        }, o.customComponents = [], u(o, e)
      }(function(o, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + e(t));
        o.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: o,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(o, t) : o.__proto__ = t)
      })(d, l.a), s(d, [{
        key: "_constructor",
        value: function() {
          p(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "_constructor", this).apply(this, arguments), this.inputClearing = !1, this.$$refs = new a.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var e = (v = this.__props).className,
            o = v.customStyle,
            t = v.name,
            n = v.cursorSpacing,
            a = v.confirmType,
            l = v.cursor,
            s = v.selectionStart,
            c = v.selectionEnd,
            p = v.adjustPosition,
            u = v.border,
            d = v.title,
            f = v.error,
            h = v.clear,
            y = v.placeholder,
            b = v.placeholderStyle,
            m = v.placeholderClass,
            g = v.autoFocus,
            C = v.focus,
            _ = v.value,
            v = v.required,
            w = (k = function(e) {
              var o = {
                type: e.type,
                maxLength: e.maxLength,
                disabled: e.disabled,
                password: !1
              };
              switch (o.type) {
                case "phone":
                  o.type = "number", o.maxLength = 11;
                  break;
                case "password":
                  o.type = "text", o.password = !0
              }
              return e.disabled || e.editable || (o.disabled = !0), o
            }(this.__props)).type,
            O = k.maxLength,
            S = k.disabled,
            k = k.password;
          u = i()("at-input", {
            "at-input--without-border": !u
          }, e), e = i()("at-input__container", {
            "at-input--error": f,
            "at-input--disabled": S
          }), S = i()("at-input__overlay", {
            "at-input__overlay--hidden": !S
          }), m = i()("placeholder", m), o = Object(r.internal_inline_style)(o);
          return Object.assign(this.__state, {
            anonymousState__temp: o,
            rootCls: u,
            containerCls: e,
            overlayCls: S,
            title: d,
            required: v,
            name: t,
            type: w,
            password: k,
            placeholderStyle: b,
            placeholderCls: m,
            placeholder: y,
            cursorSpacing: n,
            maxLength: O,
            autoFocus: g,
            focus: C,
            value: _,
            confirmType: a,
            cursor: l,
            selectionStart: s,
            selectionEnd: c,
            adjustPosition: p,
            clear: h,
            error: f
          }), this.__state
        }
      }]), s = l = d, l.$$events = ["handleClick", "handleInput", "handleFocus", "handleBlur", "handleConfirm", "handleKeyboardHeightChange", "handleClearValue", "handleErrorClick"], l.$$componentPath = "node_modules/taro-ui/dist/weapp/components/input/index", (l = s).defaultProps = {
        className: "",
        customStyle: "",
        value: "",
        name: "",
        placeholder: "",
        placeholderStyle: "",
        placeholderClass: "",
        title: "",
        cursorSpacing: 50,
        confirmType: "done",
        cursor: 0,
        selectionStart: -1,
        selectionEnd: -1,
        adjustPosition: !0,
        maxLength: 140,
        type: "text",
        disabled: !1,
        border: !0,
        editable: !0,
        error: !1,
        clear: !1,
        autoFocus: !1,
        focus: !1,
        required: !1,
        onChange: function() {},
        onFocus: function() {},
        onBlur: function() {},
        onConfirm: function() {},
        onErrorClick: function() {},
        onClick: function() {}
      }, l.propTypes = {
        className: t.a.oneOfType([t.a.string, t.a.array]),
        customStyle: t.a.oneOfType([t.a.string, t.a.object]),
        value: t.a.oneOfType([t.a.string, t.a.number]),
        name: t.a.string,
        placeholder: t.a.string,
        placeholderStyle: t.a.string,
        placeholderClass: t.a.string,
        title: t.a.string,
        confirmType: t.a.string,
        cursor: t.a.oneOfType([t.a.string, t.a.number]),
        selectionStart: t.a.oneOfType([t.a.string, t.a.number]),
        selectionEnd: t.a.oneOfType([t.a.string, t.a.number]),
        adjustPosition: t.a.bool,
        cursorSpacing: t.a.oneOfType([t.a.string, t.a.number]),
        maxLength: t.a.oneOfType([t.a.string, t.a.number]),
        type: t.a.string,
        disabled: t.a.bool,
        border: t.a.bool,
        editable: t.a.bool,
        error: t.a.bool,
        clear: t.a.bool,
        autoFocus: t.a.bool,
        focus: t.a.bool,
        onChange: t.a.func,
        onFocus: t.a.func,
        onBlur: t.a.func,
        onConfirm: t.a.func,
        onErrorClick: t.a.func,
        onClick: t.a.func,
        required: t.a.bool
      }, Component(n(0).default.createComponent(l))
    },
    775: function(e, o, t) {
      e.exports = t.p + "npm/taro-ui/dist/weapp/components/input/index.wxml"
    }
  },
  [
    [3592, 0, 2, 1]
  ]
]);