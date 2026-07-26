require("../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [29], {
    2220: function(e, t, n) {
      n(661)
    },
    2221: function(e, t, n) {},
    3479: function(t, n, a) {
      a.r(n), a(2220);
      var o = a(0),
        r = a.n(o),
        s = (a(2221), a(1)),
        i = function(e, t) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return function(e, t) {
            var n = [],
              a = !0,
              o = !1,
              r = void 0;
            try {
              for (var s, i = e[Symbol.iterator](); !(a = (s = i.next()).done) && (n.push(s.value), !t || n.length !== t); a = !0);
            } catch (e) {
              o = !0, r = e
            } finally {
              try {
                !a && i.return && i.return()
              } finally {
                if (o) throw r
              }
            }
            return n
          }(e, t);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      n = function(e, t, n) {
        return t && u(e.prototype, t), n && u(e, n), e
      };

      function u(e, t) {
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
      }
      var c;

      function l(t, n) {
        if (t) return !n || "object" != e(n) && "function" != typeof n ? t : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var p = "famousTrialVipBarShownPeriod";

      function f() {
        var e, t;
        ! function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, f);
        for (var n = arguments.length, a = Array(n), o = 0; o < n; o++) a[o] = arguments[o];
        return (e = t = l(this, (t = f.__proto__ || Object.getPrototypeOf(f)).call.apply(t, [this].concat(a)))).$usedState = ["vipTrialBarVisible", "showVipMessage", "deliverMessageVisible", "messageInfo", "showDeliverMessage", "vipTrialDays"], t.customComponents = [], l(t, e)
      }(n = (function(t, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + e(n));
        t.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(t, n) : t.__proto__ = n)
      }(f, r.a.Component), n(f, [{
        key: "_constructor",
        value: function(e) {
          (function e(t, n, a) {
            null === t && (t = Function.prototype);
            var o = Object.getOwnPropertyDescriptor(t, n);
            return void 0 !== o ? "value" in o ? o.value : void 0 !== (o = o.get) ? o.call(a) : void 0 : null !== (o = Object.getPrototypeOf(t)) ? e(o, n, a) : void 0
          })(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "_constructor", this).call(this, e), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var e = void 0 === (n = (t = this.__props).showVipMessage) || n,
            t = void 0 === (n = t.showDeliverMessage) || n,
            n = Object(o.useState)(!1),
            a = (n = i(n, 2))[0],
            u = n[1],
            c = (n = Object(o.useState)({
              enterpriseName: "",
              studentName: "",
              postName: ""
            }), (n = i(n, 2))[0]),
            l = n[1],
            f = (n = Object(o.useState)(!1), (n = i(n, 2))[0]),
            g = n[1],
            h = (n = Object(o.useState)(0), (n = i(n, 2))[0]),
            y = n[1],
            m = function(e) {
              setTimeout((function() {
                l(e), u(!0), r.a.setStorageSync("messageBarShow", (new Date).toLocaleDateString()), setTimeout((function() {
                  u(!1)
                }), 2500)
              }), 500)
            },
            b = Object(o.useCallback)((function() {
              s.a.xyb_request("message/StudentMessage!inviteMsg.action", "POST", {}, !1, !1).then((function(e) {
                var t = (new Date).toLocaleDateString();
                t = r.a.getStorageSync("messageBarShow") === t;
                200 == e.code && e.data && e.data.studentName && !t && m(e.data)
              }))
            }), []),
            v = (n = function() {
              r.a.eventCenter.trigger("taroClick", {
                funName: "首页消息弹窗-去消息中心"
              }), "fourthBag/pages/message/index/index" !== Object(o.getCurrentPages)()[Object(o.getCurrentPages)().length - 1].route && r.a.reLaunch({
                url: "/fourthBag/pages/message/index/index"
              })
            }, function() {
              r.a.reLaunch({
                url: "/pages/find/index/index?switchBarId=1"
              })
            }),
            d = function(e) {
              e && e.stopPropagation && e.stopPropagation(), g(!1)
            },
            w = Object(o.useCallback)((function() {
              e ? s.a.xyb_request("enterprise/FamousEnterprise!getFamousMemberInfo.action", "POST", {}, !1, !1).then((function(e) {
                var t, n, a;
                200 == e.code && e.data && (n = (e = e.data).famousMember, t = e.startTime, e = e.endTime, a = Math.floor(Date.now() / 1e3), t = Number(t) || 0, e = Number(e) || 0, [2, 4, 5, 6].includes(Number(n))) && a < e && (n = t + "_" + e, r.a.getStorageSync(p) !== n) ? (a = Math.max(1, Math.ceil((e - t) / 86400)), y(a), g(!0), r.a.setStorageSync(p, n), r.a.setStorageSync("famousTrialVipBarShownDate", (new Date).toLocaleDateString())) : g(!1)
              })).catch((function() {
                g(!1)
              })) : g(!1)
            }), [e]);
          return Object(o.useEffect)((function() {
            b(), w()
          }), [b, w]), this.anonymousFunc0 = v, this.anonymousFunc1 = d, this.anonymousFunc2 = n, Object.assign(this.__state, {
            vipTrialBarVisible: f,
            showVipMessage: e,
            deliverMessageVisible: a,
            messageInfo: c,
            showDeliverMessage: t,
            vipTrialDays: h
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(e) {}
      }, {
        key: "anonymousFunc1",
        value: function(e) {
          e.stopPropagation()
        }
      }, {
        key: "anonymousFunc2",
        value: function(e) {}
      }]), c = n = f, n.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2"], n.$$componentPath = "components/MessageBar/MessageBar", c)).defaultProps = {
        showVipMessage: !0,
        showDeliverMessage: !0
      }, Component(a(0).default.createComponent(n))
    },
    661: function(e, t, n) {
      e.exports = n.p + "components/MessageBar/MessageBar.wxml"
    }
  },
  [
    [3479, 0, 2, 1, 3]
  ]
]);