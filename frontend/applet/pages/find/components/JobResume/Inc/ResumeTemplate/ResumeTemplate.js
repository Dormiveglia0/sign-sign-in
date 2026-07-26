var t = require("../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [632], {
    2035: function(t, e, n) {
      n(572)
    },
    2036: function(t, e, n) {},
    3391: function(e, n, r) {
      r.r(n), r(2035);
      n = r(3);
      var o = r.n(n),
        a = (r(2036), r(0)),
        i = r.n(a),
        u = r(1),
        c = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [],
              r = !0,
              o = !1,
              a = void 0;
            try {
              for (var i, u = t[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), !e || n.length !== e); r = !0);
            } catch (t) {
              o = !0, a = t
            } finally {
              try {
                !r && u.return && u.return()
              } finally {
                if (o) throw a
              }
            }
            return n
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      n = function(t, e, n) {
        return e && s(t.prototype, e), n && s(t, n), t
      };

      function s(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
      }
      var p;

      function l(t) {
        return function() {
          var e = t.apply(this, arguments);
          return new Promise((function(t, n) {
            return function r(o, a) {
              try {
                var i = e[o](a),
                  u = i.value
              } catch (o) {
                return void n(o)
              }
              if (!i.done) return Promise.resolve(u).then((function(t) {
                r("next", t)
              }), (function(t) {
                r("throw", t)
              }));
              t(u)
            }("next")
          }))
        }
      }

      function f(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function m() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, m);
        for (var n = arguments.length, r = Array(n), o = 0; o < n; o++) r[o] = arguments[o];
        return (t = e = f(this, (e = m.__proto__ || Object.getPrototypeOf(m)).call.apply(e, [this].concat(r)))).$usedState = ["loopArray1387", "templateList"], e.customComponents = ["ResumeItem"], f(e, t)
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
      })(m, i.a.Component), n(m, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, r) {
            null === e && (e = Function.prototype);
            var o = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== o ? "value" in o ? o.value : void 0 !== (o = o.get) ? o.call(r) : void 0 : null !== (o = Object.getPrototypeOf(e)) ? t(o, n, r) : void 0
          })(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            n = (this.__props, Object(a.useState)([])),
            r = (n = c(n, 2))[0],
            s = n[1],
            p = function() {
              var e;
              u.a.xyb_request("client/talent/LoadRecommendTalentTmpl.action", "POST", {
                page: 1,
                pageSize: 6
              }, !1, !1).then((e = l(o.a.mark((function e(n) {
                var r;
                return o.a.wrap((function(t) {
                  for (;;) switch (t.prev = t.next) {
                    case 0:
                      r = n.data.list || [], s(r);
                    case 2:
                    case "end":
                      return t.stop()
                  }
                }), e, t)
              }))), function(t) {
                return e.apply(this, arguments)
              }), (function(t) {
                s([])
              }))
            };
          n = function() {
            i.a.eventCenter.trigger("taroClick", {
              funName: "跳转到更多简历列表"
            }), i.a.navigateTo({
              url: "/secondBag/pages/resumeTemplateList/resumeTemplateList"
            })
          }, Object(a.useEffect)((function() {
            return p(),
              function() {}
          }), []), this.anonymousFunc0 = n, n = r.map((function(t, n) {
            t = {
              $original: Object(a.internal_get_original)(t)
            };
            var r = Object(a.genCompid)(e + "bhdhzzzzzz" + n, !0),
              o = (r = c(r, 2))[0];
            r = r[1];
            return a.propsManager.set({
              itemData: t.$original,
              index: n
            }, r, o), {
              $compid__2794: r,
              $original: t.$original
            }
          }));
          return Object.assign(this.__state, {
            loopArray1387: n,
            templateList: r
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {}
      }]), p = n = m, n.$$events = ["anonymousFunc0"], n.$$componentPath = "pages/find/components/JobResume/Inc/ResumeTemplate/ResumeTemplate", (n = p).options = {
        addGlobalClass: !0
      }, Component(r(0).default.createComponent(n))
    },
    572: function(t, e, n) {
      t.exports = n.p + "pages/find/components/JobResume/Inc/ResumeTemplate/ResumeTemplate.wxml"
    }
  },
  [
    [3391, 0, 2, 1, 3]
  ]
]);