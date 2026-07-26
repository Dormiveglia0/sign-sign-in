var o = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [15], {
    1938: function(o, t, n) {
      n(532)
    },
    1939: function(o, t, n) {},
    3351: function(t, n, e) {
      e.r(n), e(1938), e(1939);
      var a = e(0),
        r = e.n(a),
        i = (n = e(5), e.n(n)),
        s = function(o, t) {
          if (Array.isArray(o)) return o;
          if (Symbol.iterator in Object(o)) return function(o, t) {
            var n = [],
              e = !0,
              a = !1,
              r = void 0;
            try {
              for (var i, s = o[Symbol.iterator](); !(e = (i = s.next()).done) && (n.push(i.value), !t || n.length !== t); e = !0);
            } catch (o) {
              a = !0, r = o
            } finally {
              try {
                !e && s.return && s.return()
              } finally {
                if (a) throw r
              }
            }
            return n
          }(o, t);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      n = function(o, t, n) {
        return t && u(o.prototype, t), n && u(o, n), o
      };

      function u(o, t) {
        for (var n = 0; n < t.length; n++) {
          var e = t[n];
          e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(o, e.key, e)
        }
      }
      var c;

      function p(t, n) {
        if (t) return !n || "object" != o(n) && "function" != typeof n ? t : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function l() {
        var o, t;
        ! function(o, t) {
          if (!(o instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, l);
        for (var n = arguments.length, e = Array(n), a = 0; a < n; a++) e[a] = arguments[a];
        return (o = t = p(this, (t = l.__proto__ || Object.getPrototypeOf(l)).call.apply(t, [this].concat(e)))).config = {
          usingComponents: {
            "van-rate": "../../vant-weapp/dist/rate/index"
          }
        }, t.$usedState = ["anonymousState__temp", "anonymousState__temp2", "loopArray1421", "$compid__2823", "$compid__2824", "logo", "props", "item", "postList", "displayPostList", "remainingPostCount", "isExpandMode", "scoreText"], t.anonymousFunc2Map = {}, t.customComponents = ["CompanyRate", "CompanyPostItem"], p(t, o)
      }(function(t, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + o(n));
        t.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(t, n) : t.__proto__ = n)
      })(l, r.a.Component), n(l, [{
        key: "_constructor",
        value: function(o) {
          (function o(t, n, e) {
            null === t && (t = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(t, n);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(e) : void 0 : null !== (a = Object.getPrototypeOf(t)) ? o(a, n, e) : void 0
          })(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "_constructor", this).call(this, o), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var o = this,
            t = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            n = Object(a.genCompid)(t + "$compid__2823"),
            e = (n = s(n, 2))[0],
            r = (n = n[1], Object(a.genCompid)(t + "$compid__2824")),
            u = (r = s(r, 2))[0],
            c = (r = r[1], this.__props),
            p = void 0 === (l = c.data) ? {} : l,
            l = c.border,
            m = void 0 === (m = c.postFooterMode) ? "expand" : m,
            y = Object(a.useState)(p.logoUrl || p.logo),
            f = (y = s(y, 2))[0],
            h = y[1],
            d = (y = Object(a.useState)(!1), (y = s(y, 2))[0]),
            _ = y[1],
            g = function() {
              c.onClick && c.onClick(p)
            },
            b = function(o) {
              c.onPositionClick && c.onPositionClick(o)
            },
            v = function(o) {
              c.onCommentClick && c.onCommentClick(o)
            },
            C = (y = p.entScore || p.score, y = Number("null" === y ? 0 : y).toFixed(1), p.postList || []),
            P = p.postNum || C.length,
            w = "expand" === m,
            $ = (m = w && d ? C : C.slice(0, 3), d = w ? C.length - m.length : P - m.length, P = function(o) {
              o.stopPropagation(), w ? _(!0) : g()
            }, l = i()("company-card", l && "border", c.hasPost && "company-card--has-post"), this.anonymousFunc0 = g, this.anonymousFunc1 = function() {
              return h("https://xcxstatic.xybsyw.com/xcx/images/com_default.png")
            }, !p.industry && p.industryList && 0 < p.industryList.length ? p.industryList.join("/") : null);
          this.anonymousFunc3 = P, this.anonymousFunc4 = function(o) {
            o.stopPropagation(), v(p)
          }, P = c.hasPost && 0 < C.length ? m.map((function(n, e) {
            n = {
              $original: Object(a.internal_get_original)(n)
            };
            var r = c.hasPost && 0 < C.length ? n.$original.id || n.$original.name : null,
              i = "bhfgz" + e,
              u = (e = (o.anonymousFunc2Map[i] = b, Object(a.genCompid)(t + "bhfhzzzzzz" + e, !0)), (e = s(e, 2))[0]);
            e = e[1];
            return c.hasPost && 0 < C.length && a.propsManager.set({
              item: n.$original,
              onPositionClick: o.anonymousFunc2.bind(o, i)
            }, e, u), {
              $loopState__temp4: r,
              _$indexKey: i,
              $compid__2822: e,
              $original: n.$original
            }
          })) : [];
          return c.hasPost && !c.hasComment && c.showScore && p.entScore && a.propsManager.set({
            value: p.entScore
          }, n, e), c.hasPost && !c.hasComment && c.showScore && p.score && a.propsManager.set({
            value: p.score
          }, r, u), Object.assign(this.__state, {
            anonymousState__temp: l,
            anonymousState__temp2: $,
            loopArray1421: P,
            $compid__2823: n,
            $compid__2824: r,
            logo: f,
            props: c,
            item: p,
            postList: C,
            displayPostList: m,
            remainingPostCount: d,
            isExpandMode: w,
            scoreText: y
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(o) {}
      }, {
        key: "anonymousFunc1",
        value: function(o) {}
      }, {
        key: "anonymousFunc2",
        value: function(o) {
          for (var t, n = arguments.length, e = Array(1 < n ? n - 1 : 0), a = 1; a < n; a++) e[a - 1] = arguments[a];
          return this.anonymousFunc2Map[o] && (t = this.anonymousFunc2Map)[o].apply(t, e)
        }
      }, {
        key: "anonymousFunc3",
        value: function(o) {
          o.stopPropagation()
        }
      }, {
        key: "anonymousFunc4",
        value: function(o) {
          o.stopPropagation()
        }
      }]), c = n = l, n.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc3", "anonymousFunc4"], n.$$componentPath = "components/CompanyCard/CompanyCard", (n = c).options = {
        addGlobalClass: !0
      }, n.config = {
        usingComponents: {
          "van-rate": "../../vant-weapp/dist/rate/index"
        }
      }, n.defaultProps = {
        data: {},
        hasPost: !1,
        hasComment: !1,
        showScore: !0,
        postFooterMode: "detail",
        onClick: function() {}
      }, Component(e(0).default.createComponent(n))
    },
    532: function(o, t, n) {
      o.exports = n.p + "components/CompanyCard/CompanyCard.wxml"
    }
  },
  [
    [3351, 0, 2, 1]
  ]
]);