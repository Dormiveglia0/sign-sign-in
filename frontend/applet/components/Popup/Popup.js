var e = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [36], {
    1916: function(e, t, n) {
      n(525)
    },
    1917: function(e, t, n) {},
    3344: function(t, n, o) {
      o.r(n), o(1916);
      var i = o(0),
        r = o.n(i),
        l = (n = (o(1917), o(7)), n = o.n(n), function(e, t, n) {
          return t && s(e.prototype, t), n && s(e, n), e
        });

      function s(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
      }
      var a;

      function p(t, n) {
        if (t) return !n || "object" != e(n) && "function" != typeof n ? t : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function c() {
        var e, t;
        ! function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, c);
        for (var n = arguments.length, o = Array(n), i = 0; i < n; i++) o[i] = arguments[i];
        return (e = t = p(this, (t = c.__proto__ || Object.getPrototypeOf(c)).call.apply(t, [this].concat(o)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "isOpened", "divZindex", "needTitle", "needCloseIcon", "title", "lockScroll", "hideMask", "titleAlign", "children"], t.state = {
          divZindex: !1
        }, t.customComponents = [], p(t, e)
      }(function(t, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + e(n));
        t.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(t, n) : t.__proto__ = n)
      })(c, i.Component), l(c, [{
        key: "_constructor",
        value: function(e) {
          (function e(t, n, o) {
            null === t && (t = Function.prototype);
            var i = Object.getOwnPropertyDescriptor(t, n);
            return void 0 !== i ? "value" in i ? i.value : void 0 !== (i = i.get) ? i.call(o) : void 0 : null !== (i = Object.getPrototypeOf(t)) ? e(i, n, o) : void 0
          })(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "_constructor", this).call(this, e), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "handleClose",
        value: function() {
          r.a.eventCenter.trigger("taroClick", {
            funName: "通用弹窗-关闭"
          }), this.props.onClose()
        }
      }, {
        key: "handleTouchMove",
        value: function(e) {
          e.preventDefault(), e.stopPropagation()
        }
      }, {
        key: "componentWillReceiveProps",
        value: function(e) {
          var t = this;
          e.isOpened ? (this.props.lockScroll && wx.setPageStyle({
            style: {
              height: "100vh",
              overflow: "hidden"
            }
          }), this.setState({
            divZindex: !1
          })) : (this.props.lockScroll && wx.setPageStyle({
            style: {
              height: "unset",
              overflow: "unset"
            }
          }), setTimeout((function() {
            t.setState({
              divZindex: !0
            })
          }), 500))
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var e = (r = this.__props).isOpened,
            t = r.title,
            n = r.needTitle,
            o = r.needCloseIcon,
            r = r.hideMask,
            l = (r = (this.__state.divZindex, e ? Object(i.internal_inline_style)(r ? "background-color:transparent" : "") : null), n ? Object(i.internal_inline_style)({
              textAlign: this.__props.titleAlign
            }) : null);
          return Object.assign(this.__state, {
            anonymousState__temp: r,
            anonymousState__temp2: l,
            isOpened: e,
            needTitle: n,
            needCloseIcon: o,
            title: t
          }), this.__state
        }
      }]), a = l = c, l.$$events = ["handleTouchMove", "handleClose"], l.options = {
        addGlobalClass: !0
      }, l.$$componentPath = "components/Popup/Popup", (l = a).defaultProps = {
        isOpened: !1,
        needTitle: !1,
        needCloseIcon: !1,
        title: "",
        titleAlign: "center",
        hideMask: !1,
        onClose: function() {}
      }, l.propTypes = {
        isOpened: n.a.bool,
        needTitle: n.a.bool,
        needCloseIcon: n.a.bool,
        title: n.a.string,
        titleAlign: n.a.string,
        onClose: n.a.func,
        lockScroll: n.a.bool,
        hideMask: n.a.bool
      }, Component(o(0).default.createComponent(l))
    },
    525: function(e, t, n) {
      e.exports = n.p + "components/Popup/Popup.wxml"
    }
  },
  [
    [3344, 0, 2, 1]
  ]
]);