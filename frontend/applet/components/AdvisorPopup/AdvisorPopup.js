var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [6], {
    2278: function(t, e, n) {
      n(693)
    },
    2279: function(t, e, n) {},
    3511: function(e, n, o) {
      o.r(n), o(2278);
      n = o(3);
      var r = o.n(n),
        a = (o(2279), o(0)),
        i = o.n(a),
        u = o(12),
        c = o(1),
        s = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [],
              o = !0,
              r = !1,
              a = void 0;
            try {
              for (var i, u = t[Symbol.iterator](); !(o = (i = u.next()).done) && (n.push(i.value), !e || n.length !== e); o = !0);
            } catch (t) {
              r = !0, a = t
            } finally {
              try {
                !o && u.return && u.return()
              } finally {
                if (r) throw a
              }
            }
            return n
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      n = function(t, e, n) {
        return e && p(t.prototype, e), n && p(t, n), t
      };

      function p(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var l;

      function f(t) {
        return function() {
          var e = t.apply(this, arguments);
          return new Promise((function(t, n) {
            return function o(r, a) {
              try {
                var i = e[r](a),
                  u = i.value
              } catch (r) {
                return void n(r)
              }
              if (!i.done) return Promise.resolve(u).then((function(t) {
                o("next", t)
              }), (function(t) {
                o("throw", t)
              }));
              t(u)
            }("next")
          }))
        }
      }

      function y(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function d() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, d);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = y(this, (e = d.__proto__ || Object.getPrototypeOf(d)).call.apply(e, [this].concat(o)))).$usedState = ["$compid__2636", "dataList", "isEmpty"], e.customComponents = ["Popup"], y(e, t)
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
      })(d, i.a.Component), n(d, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, n, o) : void 0
          })(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          t = f(r.a.mark((function t(e) {
            var n;
            return r.a.wrap((function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  return t.next = 2, c.a.xyb_request("student/practiceplan/loadOptionalAdviserPage.action", "POST", {
                    page: e,
                    pageSize: 10,
                    planId: p.current.planId,
                    projectId: p.current.projectId || 0,
                    projectDateId: p.current.projectDateId || 0
                  }, !1, !1);
                case 2:
                  return n = t.sent, t.abrupt("return", n);
                case 4:
                case "end":
                  return t.stop()
              }
            }), t, this)
          })));
          var t, e = function(e) {
              return t.apply(this, arguments)
            },
            n = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            o = (n = Object(a.genCompid)(n + "$compid__2636"), (n = s(n, 2))[0]),
            i = (n = n[1], this.__props),
            p = Object(a.useRef)({
              planId: "",
              projectId: "",
              projectDateId: ""
            }),
            l = Object(a.useState)(!1),
            y = (l = s(l, 2))[0],
            d = l[1],
            h = (e = ((l = Object(u.a)(e)).loading, l.dataList), l.clearData),
            v = l.isEmpty,
            b = (l = (l.hasMore, l.handleScrollToLower), function(t) {
              p.current = t, d(!0), h()
            });
          return Object(a.useEffect)((function() {
            i.onRef && i.onRef({
              viewAdvisor: b
            })
          }), []), this.anonymousFunc0 = function() {
            return d(!1)
          }, this.anonymousFunc1 = function() {
            return d(!1)
          }, this.anonymousFunc2 = l, a.propsManager.set({
            isOpened: y,
            onClose: this.anonymousFunc0
          }, n, o), Object.assign(this.__state, {
            $compid__2636: n,
            dataList: e,
            isEmpty: v
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {}
      }, {
        key: "anonymousFunc1",
        value: function(t) {}
      }, {
        key: "anonymousFunc2",
        value: function(t) {}
      }]), l = n = d, n.$$events = ["anonymousFunc1", "anonymousFunc2"], n.$$componentPath = "components/AdvisorPopup/AdvisorPopup", (n = l).defaultProps = {
        list: [],
        visible: !1,
        onClose: function() {}
      }, n.options = {
        addGlobalClass: !0
      }, Component(o(0).default.createComponent(n))
    },
    693: function(t, e, n) {
      t.exports = n.p + "components/AdvisorPopup/AdvisorPopup.wxml"
    }
  },
  [
    [3511, 0, 2, 1, 3]
  ]
]);