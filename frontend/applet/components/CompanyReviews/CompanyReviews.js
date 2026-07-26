var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [18], {
    2041: function(t, e, n) {
      n(575)
    },
    2042: function(t, e, n) {},
    3394: function(e, n, o) {
      o.r(n), o(2041), o(2042);
      var a = o(0),
        r = o.n(a),
        i = o(1),
        s = (n = o(5), o.n(n)),
        u = function(t, e) {
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
        return e && c(t.prototype, e), n && c(t, n), t
      };

      function c(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var p;

      function m(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function y() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, y);
        for (var n = arguments.length, o = Array(n), a = 0; a < n; a++) o[a] = arguments[a];
        return (t = e = m(this, (e = y.__proto__ || Object.getPrototypeOf(y)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "$compid__2789", "isZiwenZiDA", "avatar", "noCompanyName", "data", "active", "replyComments", "studentName", "timeKey", "num"], e.customComponents = ["CompanyRate"], m(e, t)
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
            e = (t = Object(a.genCompid)(t + "$compid__2789"), (t = u(t, 2))[0]),
            n = (t = t[1], this.__props),
            o = n.replyComments,
            c = n.data,
            p = void 0 !== (p = n.noCompanyName) && p,
            m = n.timeKey,
            y = n.border,
            l = Object(a.useState)(c.praise || c.hasPraise),
            f = (l = u(l, 2))[0],
            _ = l[1],
            v = (l = Object(a.useState)(c.praiseCount || 0), (l = u(l, 2))[0]),
            h = l[1],
            b = (l = Object(a.useState)(c.headPic || "https://xcxstatic.xybsyw.com/static/avatar_deafault.png"), (l = u(l, 2))[0]),
            d = l[1],
            g = (l = 1 == c.type, function() {
              d("https://xcxstatic.xybsyw.com/static/avatar_deafault.png")
            }),
            C = function(t) {
              r.a.eventCenter.trigger("taroClick", {
                funName: t ? "有用" : "取消有用"
              });
              var e = {
                status: t ? 0 : 1,
                id: c.contentId || c.id
              };
              i.a.xyb_request("enterprise/EvaluateOperate!praise.action", "POST", e, !0, !1).then((function(t) {})).catch((function(t) {})), _(t), h(t ? v + 1 : v - 1 <= 0 ? 0 : v - 1)
            },
            w = function() {
              n.onCompanyClick && n.onCompanyClick(c), P(0)
            },
            O = function() {
              n.onClick && n.onClick(c), P(2)
            },
            P = function(t) {
              r.a.eventCenter.trigger("taroClick", {
                funName: 0 === t ? "企业热评-点击公司名称" : "企业热评-点击评论"
              });
              var e = c.enterpriseId;
              e && r.a.navigateTo({
                url: "/echartsBag/pages/comdetail/comdetail?comid=" + e + "&tabIndex=" + t
              })
            },
            j = c.anonymous || "匿名" === c.personName || !c.personName && !c.name ? "匿名" : (c.personName || c.name || "") + "  · " + (c.postName || "");
          j = l ? "企业发布" : j, y = s()("company-reviews-card", y && "border"), this.anonymousFunc0 = O, this.anonymousFunc1 = g, O = Object(a.internal_inline_style)(l ? "font-weight: bold;" : ""), this.anonymousFunc2 = function(t) {
            t.stopPropagation(), w()
          }, g = c.content ? Object(a.internal_inline_style)(l ? "font-weight: bold;" : "") : null;
          return this.anonymousFunc3 = function(t) {
            t.stopPropagation(), C(!1)
          }, this.anonymousFunc4 = function(t) {
            t.stopPropagation(), C(!0)
          }, l || a.propsManager.set({
            name: "评分",
            value: c.score
          }, t, e), Object.assign(this.__state, {
            anonymousState__temp: y,
            anonymousState__temp2: O,
            anonymousState__temp3: g,
            $compid__2789: t,
            isZiwenZiDA: l,
            avatar: b,
            noCompanyName: p,
            data: c,
            active: f,
            replyComments: o,
            studentName: j,
            timeKey: m,
            num: v
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
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc3",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc4",
        value: function(t) {
          t.stopPropagation()
        }
      }]), p = n = y, n.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4"], n.$$componentPath = "components/CompanyReviews/CompanyReviews", (n = p).options = {
        addGlobalClass: !0
      }, n.defaultProps = {
        replyComments: "",
        data: {},
        timeKey: "createTimeStr"
      }, Component(o(0).default.createComponent(n))
    },
    575: function(t, e, n) {
      t.exports = n.p + "components/CompanyReviews/CompanyReviews.wxml"
    }
  },
  [
    [3394, 0, 2, 1, 3]
  ]
]);