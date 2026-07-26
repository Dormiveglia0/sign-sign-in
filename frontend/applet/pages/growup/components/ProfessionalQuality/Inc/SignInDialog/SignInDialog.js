var t = require("../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [648], {
    2216: function(t, n, e) {
      e(659)
    },
    2217: function(t, n, e) {},
    3477: function(n, e, o) {
      o.r(e), o(2216), o(2217);
      e = o(5);
      var s = o.n(e),
        i = o(0),
        a = o.n(i),
        r = o(1),
        c = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(n) {
          return t(n)
        } : function(n) {
          return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : t(n)
        },
        u = function(t, n) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, n) {
            var e = [],
              o = !0,
              s = !1,
              i = void 0;
            try {
              for (var a, r = t[Symbol.iterator](); !(o = (a = r.next()).done) && (e.push(a.value), !n || e.length !== n); o = !0);
            } catch (t) {
              s = !0, i = t
            } finally {
              try {
                !o && r.return && r.return()
              } finally {
                if (s) throw i
              }
            }
            return e
          }(t, n);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      e = function(t, n, e) {
        return n && l(t.prototype, n), e && l(t, e), t
      };

      function l(t, n) {
        for (var e = 0; e < n.length; e++) {
          var o = n[e];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var p;

      function f(n, e) {
        if (n) return !e || "object" != t(e) && "function" != typeof e ? n : e;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var y = {
        success: !1,
        title: "签到成功",
        time: "18:30",
        content: "当前活动您还未报名参与，是否报名并签到",
        confirmText: "好的，知道了",
        cancelVisible: !1,
        activityId: "",
        activityName: "",
        needScore: !1
      };

      function m() {
        var t, n;
        ! function(t, n) {
          if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
        }(this, m);
        for (var e = arguments.length, o = Array(e), s = 0; s < e; s++) o[s] = arguments[s];
        return (t = n = f(this, (n = m.__proto__ || Object.getPrototypeOf(m)).call.apply(n, [this].concat(o)))).$usedState = ["anonymousState__temp", "loopArray1327", "$compid__2705", "mode", "result", "config", "markList", "markId"], n.anonymousFunc0Map = {}, n.customComponents = ["Popup"], f(n, t)
      }(e = (function(n, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + t(e));
        n.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: n,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(n, e) : n.__proto__ = e)
      }(m, a.a.Component), e(m, [{
        key: "_constructor",
        value: function(t) {
          (function t(n, e, o) {
            null === n && (n = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(n, e);
            return void 0 !== s ? "value" in s ? s.value : void 0 !== (s = s.get) ? s.call(o) : void 0 : null !== (s = Object.getPrototypeOf(n)) ? t(s, e, o) : void 0
          })(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "_constructor", this).call(this, t), this.$$refs = new a.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            n = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            e = (n = Object(i.genCompid)(n + "$compid__2705"), (n = u(n, 2))[0]),
            o = (n = n[1], this.__props),
            c = o.result,
            l = Object(i.useState)(!1),
            p = (l = u(l, 2))[0],
            f = l[1],
            m = (l = Object(i.useState)(y), (l = u(l, 2))[0]),
            d = l[1],
            g = (l = Object(i.useState)([{
              id: 1,
              name: "非常不满意"
            }, {
              id: 2,
              name: "不满意"
            }, {
              id: 3,
              name: "一般"
            }, {
              id: 4,
              name: "满意"
            }, {
              id: 5,
              name: "非常满意"
            }]), (l = u(l, 2))[0]),
            b = (l = (l[1], Object(i.useState)(null)), (l = u(l, 2))[0]),
            h = l[1],
            S = (l = Object(i.useState)(2), (l = u(l, 2))[0]),
            _ = l[1],
            v = function() {
              h(null), f(!1), o.onClose()
            },
            O = function() {
              b ? r.a.xyb_request("credit/signin/satisfaction.action", "POST", {
                score: b,
                activityId: c.activityId
              }, !1, !1).then((function(t) {
                "200" === t.code && (a.a.showToast({
                  title: "评价成功",
                  icon: "none"
                }), v())
              })) : a.a.showToast({
                title: "请选择活动满意度评分",
                icon: "none"
              })
            },
            w = (l = function() {
              a.a.eventCenter.trigger("taroClick", {
                funName: "关闭签到弹窗"
              }), !c || c.isSuccess || 2 !== c.status && 7 !== c.status || (2 === c.status && o.onSignUpAndSignIn(), 7 === c.status && o.onReScan()), (!c || 9 !== c.successStatus && 10 !== c.successStatus && 12 !== c.successStatus || 2 != S ? v : O)()
            }, Object(i.useEffect)((function() {
              var t, n, e;
              h(null), c && (t = (9 == c.successStatus || 10 == c.successStatus || 12 == c.successStatus) && c.needScore, void _(t ? 2 : 1), e = c.success ? (n = c.successStatus ? {
                9: "获得的" + (c.credit || 0) + "学分将在1小时内发放",
                10: "已获得" + (c.credit || 0) + "学分",
                11: "活动结束不要忘记签退哦",
                12: "当前活动您还未报名参与，已为您自动报名并签到"
              } [c.successStatus] : "", {
                success: !0,
                title: 10 !== c.successStatus ? "签到成功" : "签退成功",
                time: c.signinTime,
                content: n,
                confirmText: t ? "提交" : "好的，知道了",
                cancelVisible: !1
              }) : (_(1), {
                success: !1,
                content: c.msg,
                confirmText: 2 === c.status ? "报名并签到" : 7 === c.status ? "重新扫码" : "好的，知道了",
                cancelVisible: 2 === c.status || 7 === c.status
              }), d(e), f(!0))
            }), [c]), s()("dialog-container", m.success ? "dialog-container-success" : "dialog-container-fail"));
          this.anonymousFunc1 = l, l = 2 == S ? g.map((function(n, e) {
            return n = {
              $original: Object(i.internal_get_original)(n)
            }, e = "bggdz" + e, t.anonymousFunc0Map[e] = function(t) {
              t.stopPropagation(), h(n.$original.id)
            }, {
              _$indexKey: e,
              $original: n.$original
            }
          })) : [];
          return i.propsManager.set({
            isOpened: p
          }, n, e), Object.assign(this.__state, {
            anonymousState__temp: w,
            loopArray1327: l,
            $compid__2705: n,
            mode: S,
            result: c,
            config: m,
            markList: g,
            markId: b
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          for (var n, e = arguments.length, o = Array(1 < e ? e - 1 : 0), s = 1; s < e; s++) o[s - 1] = arguments[s];
          return "object" === (void 0 === o ? "undefined" : c(o)) && o.stopPropagation && o.stopPropagation(), this.anonymousFunc0Map[t] && (n = this.anonymousFunc0Map)[t].apply(n, o)
        }
      }, {
        key: "anonymousFunc1",
        value: function(t) {}
      }]), p = e = m, e.$$events = ["anonymousFunc0", "anonymousFunc1"], e.$$componentPath = "pages/growup/components/ProfessionalQuality/Inc/SignInDialog/SignInDialog", p)).options = {
        addGlobalClass: !0
      }, e.defaultProps = {
        result: null,
        onClose: function() {},
        onReScan: function() {},
        onSignUpAndSignIn: function() {}
      }, Component(o(0).default.createComponent(e))
    },
    659: function(t, n, e) {
      t.exports = e.p + "pages/growup/components/ProfessionalQuality/Inc/SignInDialog/SignInDialog.wxml"
    }
  },
  [
    [3477, 0, 2, 1, 3]
  ]
]);