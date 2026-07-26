var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [23], {
    2606: function(t, e, n) {
      n(855)
    },
    2607: function(t, e, n) {},
    3672: function(e, n, o) {
      o.r(n), o(2606), o(2607);
      var a = o(0),
        r = o.n(a),
        i = o(1),
        s = (n = o(5), o.n(n)),
        c = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [],
              o = !0,
              a = !1,
              r = void 0;
            try {
              for (var i, s = t[Symbol.iterator](); !(o = (i = s.next()).done) && (n.push(i.value), !e || n.length !== e); o = !0);
            } catch (t) {
              a = !0, r = t
            } finally {
              try {
                !o && s.return && s.return()
              } finally {
                if (a) throw r
              }
            }
            return n
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      n = function(t, e, n) {
        return e && u(t.prototype, e), n && u(t, n), t
      };

      function u(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var p;

      function l(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function y() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, y);
        for (var n = arguments.length, o = Array(n), a = 0; a < n; a++) o[a] = arguments[a];
        return (t = e = l(this, (e = y.__proto__ || Object.getPrototypeOf(y)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "data", "$compid__2377", "avatar", "textNode", "active", "replyComments", "num"], e.customComponents = ["CompanyRate"], l(e, t)
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
      })(y, r.a.Component), n(y, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(o) : void 0 : null !== (a = Object.getPrototypeOf(e)) ? t(a, n, o) : void 0
          })(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "_constructor", this).call(this, t), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
          var t = this.$prefix,
            e = (t = Object(a.genCompid)(t + "$compid__2377"), (t = c(t, 2))[0]),
            n = (t = t[1], (u = this.__props).replyComments),
            o = u.data,
            u = (u.noCompanyName, u.timeKey, u.border),
            p = Object(a.useState)(o.praise || o.hasPraise),
            l = (p = c(p, 2))[0],
            y = p[1],
            m = (p = Object(a.useState)(o.praiseCount || 0), (p = c(p, 2))[0]),
            f = p[1],
            v = (p = Object(a.useState)(o.headPic || "https://xcxstatic.xybsyw.com/static/avatar_deafault.png"), (p = c(p, 2))[0]),
            h = p[1],
            _ = (p = 1 == o.type, Object(a.useState)([{
              name: "div",
              attrs: {
                class: "desc",
                style: "color: #5c5c66; font-size: 12px;line-height: 21px;"
              },
              children: [{
                type: "text",
                text: "公司印象：" + o.evaluateInfo
              }]
            }])),
            b = (_ = c(_, 2))[0],
            d = (_ = (_[1], function() {
              h("https://xcxstatic.xybsyw.com/static/avatar_deafault.png")
            }), function(t) {
              r.a.eventCenter.trigger("taroClick", {
                funName: t ? "有用" : "取消有用"
              });
              var e = {
                status: t ? 1 : 0,
                interviewEvaluateId: o.contentId || o.id
              };
              i.a.xyb_request("enterprise/EntInterviewEvaluate!praise.action", "POST", e, !0, !1).then((function(t) {})).catch((function(t) {})), y(t), f(t ? m + 1 : m - 1 <= 0 ? 0 : m - 1)
            });
          o.anonymous || "匿名" === o.personName || (o.personName || o.name, o.postName), u = s()("company-reviews-card", u && "border"), this.anonymousFunc0 = _, _ = o.evaluateInfo ? Object(a.internal_inline_style)(p ? "font-weight: bold;" : "") : null;
          return this.anonymousFunc1 = function(t) {
            t.stopPropagation(), d(!1)
          }, this.anonymousFunc2 = function(t) {
            t.stopPropagation(), d(!0)
          }, a.propsManager.set({
            name: "整体感受",
            value: o.interviewScore
          }, t, e), Object.assign(this.__state, {
            anonymousState__temp: u,
            anonymousState__temp2: _,
            data: o,
            $compid__2377: t,
            avatar: v,
            textNode: b,
            active: l,
            replyComments: n,
            num: m
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {}
      }, {
        key: "anonymousFunc1",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc2",
        value: function(t) {
          t.stopPropagation()
        }
      }]), p = n = y, n.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2"], n.$$componentPath = "components/InterviewReviews/InterviewReviews", (n = p).options = {
        addGlobalClass: !0
      }, n.defaultProps = {
        replyComments: "",
        data: {},
        timeKey: "createTimeStr"
      }, Component(o(0).default.createComponent(n))
    },
    855: function(t, e, n) {
      t.exports = n.p + "components/InterviewReviews/InterviewReviews.wxml"
    }
  },
  [
    [3672, 0, 2, 1, 3]
  ]
]);