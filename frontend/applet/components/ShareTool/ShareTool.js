var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [42], {
    1971: function(t, n, e) {
      e(546)
    },
    1972: function(t, n, e) {},
    3365: function(n, e, o) {
      o.r(e), o(1971);
      var r = o(8),
        a = (o(1972), o(0)),
        u = o.n(a),
        i = function(t, n) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, n) {
            var e = [],
              o = !0,
              r = !1,
              a = void 0;
            try {
              for (var u, i = t[Symbol.iterator](); !(o = (u = i.next()).done) && (e.push(u.value), !n || e.length !== n); o = !0);
            } catch (t) {
              r = !0, a = t
            } finally {
              try {
                !o && i.return && i.return()
              } finally {
                if (r) throw a
              }
            }
            return e
          }(t, n);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      e = function(t, n, e) {
        return n && s(t.prototype, n), e && s(t, e), t
      };

      function s(t, n) {
        for (var e = 0; e < n.length; e++) {
          var o = n[e];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var c;

      function p(n, e) {
        if (n) return !e || "object" != t(e) && "function" != typeof e ? n : e;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function l() {
        var t, n;
        ! function(t, n) {
          if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
        }(this, l);
        for (var e = arguments.length, o = Array(e), r = 0; r < e; r++) o[r] = arguments[r];
        return (t = n = p(this, (n = l.__proto__ || Object.getPrototypeOf(l)).call.apply(n, [this].concat(o)))).config = {
          navigationBarTitleText: "校友邦",
          usingComponents: {}
        }, n.$usedState = ["$compid__2816", "tipFlag", "isDefaultTop", "statusHeight"], n.customComponents = ["Popup"], p(n, t)
      }(function(n, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + t(e));
        n.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: n,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(n, e) : n.__proto__ = e)
      })(l, u.a.Component), e(l, [{
        key: "_constructor",
        value: function(t) {
          (function t(n, e, o) {
            null === n && (n = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(n, e);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(n)) ? t(r, e, o) : void 0
          })(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "_constructor", this).call(this, t), this.$$refs = new u.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
          var t = this.$prefix,
            n = (t = Object(a.genCompid)(t + "$compid__2816"), (t = i(t, 2))[0]),
            e = (t = t[1], this.__props),
            o = e.isOpened,
            s = e.isDefaultTop,
            c = (Object(a.useRouter)(), Object(a.useScope)(), Object(a.useState)(44)),
            p = (c = i(c, 2))[0],
            l = c[1],
            f = (c = Object(a.useState)(!1), (c = i(c, 2))[0]),
            y = c[1],
            h = function() {
              u.a.eventCenter.trigger("taroClick", {
                funName: "分享朋友圈"
              }), e.onHandleClose()
            },
            m = (c = function() {
              u.a.eventCenter.trigger("taroClick", {
                funName: "分享给好友"
              }), e.onHandleClose(), e.onGetItem()
            }, function() {
              Object(r.a)({
                success: function(t) {
                  var n = !!t.system && -1 < t.system.indexOf("iOS");
                  l(t.statusBarHeight + (n ? 44 : 48))
                }
              })
            }),
            b = function(t) {
              u.a.eventCenter.trigger("taroClick", {
                funName: "关闭分享朋友圈提示"
              }), y(!1)
            };
          return Object(a.useEffect)((function() {
            return m(),
              function() {}
          }), []), this.anonymousFunc0 = function(t) {
            t.stopPropagation(), b()
          }, this.anonymousFunc1 = h, this.anonymousFunc2 = h, this.anonymousFunc3 = c, this.anonymousFunc4 = function() {
            h(), y(!0)
          }, a.propsManager.set({
            isOpened: o,
            onClose: this.anonymousFunc1
          }, t, n), Object.assign(this.__state, {
            $compid__2816: t,
            tipFlag: f,
            isDefaultTop: s,
            statusHeight: p
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc1",
        value: function(t) {}
      }, {
        key: "anonymousFunc2",
        value: function(t) {}
      }, {
        key: "anonymousFunc3",
        value: function(t) {}
      }, {
        key: "anonymousFunc4",
        value: function(t) {}
      }]), c = e = l, e.$$events = ["anonymousFunc0", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4"], e.$$componentPath = "components/ShareTool/ShareTool", (e = c).config = {
        navigationBarTitleText: "校友邦",
        usingComponents: {}
      }, e.options = {
        addGlobalClass: !0,
        rowData: {}
      }, e.defaultProps = {
        isDefaultTop: !0,
        isOpened: !1,
        onHandleClose: function() {}
      }, Component(o(0).default.createComponent(e))
    },
    546: function(t, n, e) {
      t.exports = e.p + "components/ShareTool/ShareTool.wxml"
    }
  },
  [
    [3365, 0, 2, 1, 3]
  ]
]);