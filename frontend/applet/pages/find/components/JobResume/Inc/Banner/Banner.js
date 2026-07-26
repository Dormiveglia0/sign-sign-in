var t = require("../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [629], {
    2033: function(t, n, e) {
      e(571)
    },
    2034: function(t, n, e) {},
    3390: function(n, e, r) {
      r.r(e), r(2033);
      e = r(3);
      var o = r.n(e),
        a = (r(2034), r(0)),
        i = r.n(a),
        u = r(1),
        c = function(t, n) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, n) {
            var e = [],
              r = !0,
              o = !1,
              a = void 0;
            try {
              for (var i, u = t[Symbol.iterator](); !(r = (i = u.next()).done) && (e.push(i.value), !n || e.length !== n); r = !0);
            } catch (t) {
              o = !0, a = t
            } finally {
              try {
                !r && u.return && u.return()
              } finally {
                if (o) throw a
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
          var r = n[e];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
      }
      var p;

      function f(t) {
        return function() {
          var n = t.apply(this, arguments);
          return new Promise((function(t, e) {
            return function r(o, a) {
              try {
                var i = n[o](a),
                  u = i.value
              } catch (o) {
                return void e(o)
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

      function l(n, e) {
        if (n) return !e || "object" != t(e) && "function" != typeof e ? n : e;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function y() {
        var t, n;
        ! function(t, n) {
          if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
        }(this, y);
        for (var e = arguments.length, r = Array(e), o = 0; o < e; o++) r[o] = arguments[o];
        return (t = n = l(this, (n = y.__proto__ || Object.getPrototypeOf(y)).call.apply(n, [this].concat(r)))).$usedState = ["loopArray1388", "bannerList", "currentSwiper"], n.anonymousFunc1Map = {}, n.customComponents = [], l(n, t)
      }
      i.a.getApp(),
        function(n, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + t(e));
          n.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: n,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(n, e) : n.__proto__ = e)
        }(y, i.a.Component), e(y, [{
          key: "_constructor",
          value: function(t) {
            (function t(n, e, r) {
              null === n && (n = Function.prototype);
              var o = Object.getOwnPropertyDescriptor(n, e);
              return void 0 !== o ? "value" in o ? o.value : void 0 !== (o = o.get) ? o.call(r) : void 0 : null !== (o = Object.getPrototypeOf(n)) ? t(o, e, r) : void 0
            })(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
          }
        }, {
          key: "_createData",
          value: function() {
            var t = this,
              n = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.__props),
              e = Object(a.useState)([]),
              r = (e = c(e, 2))[0],
              s = e[1],
              p = (e = Object(a.useState)(0), (e = c(e, 2))[0]),
              l = e[1],
              y = function() {
                var e, r = "",
                  a = 1 == n.type ? (r = "client/activity/LoadActivityList.action", {
                    showPage: 4
                  }) : (r = "client/talent/LoadTopGuideArticle.action", {});
                u.a.xyb_request(r, "POST", a, !1, !1).then((e = f(o.a.mark((function n(e) {
                  var r;
                  return o.a.wrap((function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        r = e.data || [], s(r);
                      case 2:
                      case "end":
                        return t.stop()
                    }
                  }), n, t)
                }))), function(t) {
                  return e.apply(this, arguments)
                }), (function(t) {
                  s([])
                }))
              },
              h = function(t) {
                t = t.currentTarget.dataset.item, i.a.eventCenter.trigger("taroClick", {
                  funName: "指导文章详情",
                  funType: "指导文章详情banner",
                  funData: t.id
                }), i.a.navigateTo({
                  url: "/growUp/pages/home/informationdetail/informationdetail?from=guidance&id=" + t.id
                })
              };
            e = function(t) {
              var n = (t = t.detail).current;
              "autoplay" !== (t = t.source) && "touch" !== t || l(n)
            }, Object(a.useEffect)((function() {
              return y(),
                function() {}
            }), []), this.anonymousFunc0 = e, e = 1 <= r.length ? r.map((function(n, e) {
              return n = {
                $original: Object(a.internal_get_original)(n)
              }, e = "bhdiz" + e, t.anonymousFunc1Map[e] = h, {
                _$indexKey: e,
                $original: n.$original
              }
            })) : [];
            return Object.assign(this.__state, {
              loopArray1388: e,
              bannerList: r,
              currentSwiper: p
            }), this.__state
          }
        }, {
          key: "anonymousFunc0",
          value: function(t) {}
        }, {
          key: "anonymousFunc1",
          value: function(t) {
            for (var n, e = arguments.length, r = Array(1 < e ? e - 1 : 0), o = 1; o < e; o++) r[o - 1] = arguments[o];
            return this.anonymousFunc1Map[t] && (n = this.anonymousFunc1Map)[t].apply(n, r)
          }
        }]), p = e = y, e.$$events = ["anonymousFunc0", "anonymousFunc1"], e.$$componentPath = "pages/find/components/JobResume/Inc/Banner/Banner", e = p, Component(r(0).default.createComponent(e))
    },
    571: function(t, n, e) {
      t.exports = e.p + "pages/find/components/JobResume/Inc/Banner/Banner.wxml"
    }
  },
  [
    [3390, 0, 2, 1, 3]
  ]
]);