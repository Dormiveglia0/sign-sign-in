var e = require("../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [609], {
    2241: function(e, t, n) {
      n(672)
    },
    3490: function(t, n, o) {
      o.r(n), o(2241);
      var r = o(0),
        i = o.n(r),
        a = (n = o(5), o.n(n)),
        s = (n = o(7), n = o.n(n), o(23)),
        c = function(e, t) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return function(e, t) {
            var n = [],
              o = !0,
              r = !1,
              i = void 0;
            try {
              for (var a, s = e[Symbol.iterator](); !(o = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); o = !0);
            } catch (e) {
              r = !0, i = e
            } finally {
              try {
                !o && s.return && s.return()
              } finally {
                if (r) throw i
              }
            }
            return n
          }(e, t);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        },
        p = function(e, t, n) {
          return t && l(e.prototype, t), n && l(e, n), e
        };

      function l(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
      }

      function u(t, n) {
        if (t) return !n || "object" != e(n) && "function" != typeof n ? t : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function f() {
        var e, t;
        ! function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, f);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (e = t = u(this, (e = f.__proto__ || Object.getPrototypeOf(f)).call.apply(e, [this].concat(o)))).$usedState = ["$compid__2683", "rootClass", "title", "cancelText", "_isOpened", "className", "isOpened", "children"], t.handleClose = function() {
          "function" == typeof t.props.onClose && t.props.onClose()
        }, t.handleCancel = function() {
          if ("function" == typeof t.props.onCancel) return t.props.onCancel();
          t.close()
        }, t.close = function() {
          t.setState({
            _isOpened: !1
          }, t.handleClose)
        }, t.handleTouchMove = function(e) {
          e.stopPropagation(), e.preventDefault()
        }, t.customComponents = ["AtActionSheetHeader", "AtActionSheetBody", "AtActionSheetFooter"], u(t, e)
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
      })(f, s.a), p(f, [{
        key: "_constructor",
        value: function(e) {
          (function e(t, n, o) {
            null === t && (t = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(t, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(t)) ? e(r, n, o) : void 0
          })(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "_constructor", this).call(this, e), e = e.isOpened, this.state = {
            _isOpened: e
          }, this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "componentWillReceiveProps",
        value: function(e) {
          (e = e.isOpened) !== this.state._isOpened && (this.setState({
            _isOpened: e
          }), e || this.handleClose())
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
          var e = this.$prefix,
            t = (e = Object(r.genCompid)(e + "$compid__2683"), (e = c(e, 2))[0]),
            n = (e = e[1], (i = this.__props).title),
            o = i.cancelText,
            i = i.className,
            s = this.__state._isOpened;
          s = a()("at-action-sheet", {
            "at-action-sheet--active": s
          }, i);
          return o && r.propsManager.set({
            onClick: this.handleCancel
          }, e, t), Object.assign(this.__state, {
            $compid__2683: e,
            rootClass: s,
            title: n,
            cancelText: o
          }), this.__state
        }
      }]), p = s = f, s.$$events = ["handleTouchMove", "close"], s.$$componentPath = "node_modules/taro-ui/dist/weapp/components/action-sheet/index", (s = p).defaultProps = {
        title: "",
        cancelText: "",
        isOpened: !1
      }, s.propTypes = {
        title: n.a.string,
        onClose: n.a.func,
        onCancel: n.a.func,
        isOpened: n.a.bool.isRequired,
        cancelText: n.a.string
      }, Component(o(0).default.createComponent(s))
    },
    672: function(e, t, n) {
      e.exports = n.p + "npm/taro-ui/dist/weapp/components/action-sheet/index.wxml"
    }
  },
  [
    [3490, 0, 2, 1]
  ]
]);