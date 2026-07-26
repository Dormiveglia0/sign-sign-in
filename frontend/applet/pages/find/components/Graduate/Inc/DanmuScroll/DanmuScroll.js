var t = require("../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [627], {
    2026: function(t, n, e) {
      e(569)
    },
    2027: function(t, n, e) {},
    3388: function(n, e, o) {
      o.r(e), o(2026);
      e = o(3);
      var r = o.n(e),
        u = o(0),
        a = o.n(u),
        c = o(1),
        i = (o(2027), function(t, n) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, n) {
            var e = [],
              o = !0,
              r = !1,
              u = void 0;
            try {
              for (var a, c = t[Symbol.iterator](); !(o = (a = c.next()).done) && (e.push(a.value), !n || e.length !== n); o = !0);
            } catch (t) {
              r = !0, u = t
            } finally {
              try {
                !o && c.return && c.return()
              } finally {
                if (r) throw u
              }
            }
            return e
          }(t, n);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        });
      e = function(t, n, e) {
        return n && s(t.prototype, n), e && s(t, e), t
      };

      function s(t, n) {
        for (var e = 0; e < n.length; e++) {
          var o = n[e];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var l;

      function f(t) {
        return function() {
          var n = t.apply(this, arguments);
          return new Promise((function(t, e) {
            return function o(r, u) {
              try {
                var a = n[r](u),
                  c = a.value
              } catch (r) {
                return void e(r)
              }
              if (!a.done) return Promise.resolve(c).then((function(t) {
                o("next", t)
              }), (function(t) {
                o("throw", t)
              }));
              t(c)
            }("next")
          }))
        }
      }

      function p(n, e) {
        if (n) return !e || "object" != t(e) && "function" != typeof e ? n : e;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function y() {
        var t, n;
        ! function(t, n) {
          if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
        }(this, y);
        for (var e = arguments.length, o = Array(e), r = 0; r < e; r++) o[r] = arguments[r];
        return (t = n = p(this, (n = y.__proto__ || Object.getPrototypeOf(y)).call.apply(n, [this].concat(o)))).$usedState = ["scrollLeft", "scrollList1", "scrollList2", "scrollList3", "emojiList1", "emojiList2", "emojiList3"], n.customComponents = [], p(n, t)
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
      })(y, a.a.Component), e(y, [{
        key: "_constructor",
        value: function(t) {
          (function t(n, e, o) {
            null === n && (n = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(n, e);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(n)) ? t(r, e, o) : void 0
          })(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "_constructor", this).call(this, t), this.$$refs = new a.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t, n = this,
            e = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, Object(u.useState)(0)),
            o = (e = i(e, 2))[0],
            s = e[1],
            l = (e = Object(u.useState)(0), (e = i(e, 2))[0]),
            p = e[1],
            y = (e = Object(u.useState)(!0), (e = i(e, 2))[0]),
            h = e[1],
            m = (e = Object(u.useState)(0), (e = i(e, 2))[0]),
            v = e[1],
            b = (e = Object(u.useState)([]), e = ((e = i(e, 2))[0], e[1], Object(u.useState)([])), (e = i(e, 2))[0]),
            d = e[1],
            g = (e = Object(u.useState)([]), (e = i(e, 2))[0]),
            j = e[1],
            O = (e = Object(u.useState)([]), (e = i(e, 2))[0]),
            _ = e[1],
            w = (Object(u.useEffect)((function() {
              var t = setInterval((function() {
                y && s((function(t) {
                  return (t += 1) >= 50 * (b.length + 1) ? 0 : t
                }))
              }), 30);
              return function() {
                clearInterval(t)
              }
            }), [y, b.length]), Object(u.useEffect)((function() {
              return w(),
                function() {
                  h(!1)
                }
            }), []), Object(u.useDidShow)((function() {
              h(!0), w()
            })), Object(u.useDidHide)((function() {
              h(!1)
            })), t = f(r.a.mark((function t() {
              var e;
              return r.a.wrap((function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, c.a.xyb_request("careerplanning/LoadHotQuestionList.action", "POST", {
                      type: 0
                    }, !1, !1);
                  case 2:
                    "200" === (e = t.sent).code && (e = e.data, e = F(e), d(e[0] || []), j(e[1] || []), _(e[2] || []));
                  case 5:
                  case "end":
                    return t.stop()
                }
              }), t, n)
            }))), function() {
              return t.apply(this, arguments)
            }),
            F = function(t) {
              for (var n = t.length, e = Math.floor(n / 3), o = n % 3, r = [], u = 0, a = 0; a < 3; a++) {
                var c = e + (a < o ? 1 : 0);
                r.push(t.slice(u, u + c)), u += c
              }
              return r
            },
            S = (e = function(t) {
              t.preventDefault(), t = t.touches[0].pageX - m, s(l - t)
            }, function(t) {
              h(!0);
              var n = t.changedTouches[0].clientX;
              Math.abs(n - m) < 5 && L(t)
            }),
            x = function() {
              a.a.eventCenter.trigger("taroClick", {
                funName: "跳转AI热门问题页面"
              }), a.a.navigateTo({
                url: "/thirdBag/pages/HotQuestion/HotQuestion"
              })
            },
            L = function(t) {
              (t = t.target.dataset) && k(t)
            },
            k = function(t) {
              a.a.eventCenter.trigger("taroClick", {
                funName: "跳转生涯规划AI助手页面"
              });
              var n = t.text ? t.text.question.replace("?", "") : "";
              a.a.navigateTo({
                url: "/thirdBag/pages/aiMessage/aiMessage?questionScrollName=" + encodeURIComponent(n) + "&questionScrollId=" + (t.text ? t.text.id : "") + "&qsScroll=2"
              })
            };
          return this.anonymousFunc0 = function(t) {
            v(t.touches[0].pageX), p(o), h(!1)
          }, this.anonymousFunc1 = S, this.anonymousFunc2 = L, this.anonymousFunc3 = e, this.anonymousFunc4 = e, this.anonymousFunc5 = e, this.anonymousFunc6 = x, Object.assign(this.__state, {
            scrollLeft: o,
            scrollList1: b,
            scrollList2: g,
            scrollList3: O,
            emojiList1: ["✏️", "❤️", "☀️", "😊", "📖", "📚", "😘", "💫", "💌", "🥰", "💪🏻", "😎"],
            emojiList2: ["📖", "📚", "😘", "💫", "💌", "🥰", "💪🏻", "😎", "✏️", "❤️", "☀️", "😊"],
            emojiList3: ["💌", "🥰", "💪🏻", "😎", "✏️", "❤️", "☀️", "😊", "📖", "📚", "😘", "💫"]
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
      }, {
        key: "anonymousFunc3",
        value: function(t) {}
      }, {
        key: "anonymousFunc4",
        value: function(t) {}
      }, {
        key: "anonymousFunc5",
        value: function(t) {}
      }, {
        key: "anonymousFunc6",
        value: function(t) {}
      }]), l = e = y, e.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5", "anonymousFunc6"], e.$$componentPath = "pages/find/components/Graduate/Inc/DanmuScroll/DanmuScroll", (e = l).options = {
        addGlobalClass: !0
      }, Component(o(0).default.createComponent(e))
    },
    569: function(t, n, e) {
      t.exports = e.p + "pages/find/components/Graduate/Inc/DanmuScroll/DanmuScroll.wxml"
    }
  },
  [
    [3388, 0, 2, 1, 3]
  ]
]);