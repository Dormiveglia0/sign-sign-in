var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [46], {
    2437: function(t, e, o) {
      o(771)
    },
    2438: function(t, e, o) {},
    3588: function(e, o, n) {
      n.r(o), n(2437);
      var r = n(8),
        i = n(0),
        s = n.n(i);
      n(2438), o = function(t, e, o) {
        return e && a(t.prototype, e), o && a(t, o), t
      };

      function a(t, e) {
        for (var o = 0; o < e.length; o++) {
          var n = e[o];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }
      var c;

      function p(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function l() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, l);
        for (var o = arguments.length, n = Array(o), r = 0; r < o; r++) n[r] = arguments[r];
        return (t = e = p(this, (e = l.__proto__ || Object.getPrototypeOf(l)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "isOpen", "isWhiteColor", "text", "otherWidth", "position", "clientX", "needArrow"], e.state = {
          otherWidth: 100
        }, e.customComponents = [], p(e, t)
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
      })(l, i.Component), o(l, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, o, n) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, o);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(n) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, o, n) : void 0
          })(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "_constructor", this).call(this, t), this.$$refs = new s.a.RefsArray
        }
      }, {
        key: "componentDidUpdate",
        value: function(t, e) {
          var o = this,
            n = this;
          t.isOpen != this.props.isOpen && setTimeout((function() {
            var t = s.a.createSelectorQuery().in(o.$scope);
            t.select(".tooltips-container").boundingClientRect(), t.exec((function(t) {
              var e;
              t[0] && (e = Object(r.b)().screenWidth, n.setState({
                otherWidth: (e - t[0].width) / 2
              }))
            }))
          }), 100)
        }
      }, {
        key: "componentDidMount",
        value: function() {}
      }, {
        key: "handleClose",
        value: function() {
          this.props.onClose()
        }
      }, {
        key: "handleClick",
        value: function(t) {
          t.stopPropagation(), s.a.eventCenter.trigger("taroClick", {
            funName: "点击提示"
          }), this.props.onClick()
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (s = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.__props)).isOpen,
            o = s.text,
            n = s.position,
            r = s.clientX,
            s = s.isWhiteColor,
            a = this.__state.otherWidth;
          n = e ? Object(i.internal_inline_style)(n) : null, this.anonymousFunc0 = function(e) {
            return t.handleClick(e)
          }, r = this.__props.needArrow ? Object(i.internal_inline_style)({
            left: r - a + "px"
          }) : null;
          return Object.assign(this.__state, {
            anonymousState__temp: n,
            anonymousState__temp2: r,
            isOpen: e,
            isWhiteColor: s,
            text: o
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {}
      }]), c = o = l, o.$$events = ["handleClose", "anonymousFunc0"], o.$$componentPath = "components/TooltipsArrow/TooltipsArrow", (o = c).defaultProps = {
        isWhiteColor: !0,
        isOpen: !1,
        text: "",
        clientX: 0,
        needArrow: !0,
        position: {
          top: "50%",
          left: "50%"
        },
        onClose: function() {},
        onClick: function() {}
      }, Component(n(0).default.createComponent(o))
    },
    771: function(t, e, o) {
      t.exports = o.p + "components/TooltipsArrow/TooltipsArrow.wxml"
    }
  },
  [
    [3588, 0, 2, 1, 3]
  ]
]);