var t = require("../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [630], {
    2037: function(t, e, n) {
      n(573)
    },
    2038: function(t, e, n) {},
    3392: function(e, n, o) {
      o.r(n), o(2037), o(2038);
      var r = o(0),
        a = o.n(r),
        i = o(1),
        u = function(t, e) {
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
        return e && c(t.prototype, e), n && c(t, n), t
      };

      function c(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var s;

      function p(t) {
        if (Array.isArray(t)) {
          for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
          return n
        }
        return Array.from(t)
      }

      function l(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function f() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, f);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = l(this, (e = f.__proto__ || Object.getPrototypeOf(f)).call.apply(e, [this].concat(o)))).$usedState = ["loopArray1386", "templateList", "__fn_on"], e.anonymousFunc0Map = {}, e.customComponents = [], l(e, t)
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
      })(f, a.a.Component), n(f, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, n, o) : void 0
          })(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "_constructor", this).call(this, t), this.$$refs = new a.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.__props, Object(r.useState)(1)),
            n = (e = u(e, 2))[0],
            o = e[1],
            c = (e = Object(r.useState)(2), (e = u(e, 2))[0]),
            s = e[1],
            l = (e = Object(r.useState)([]), (e = u(e, 2))[0]),
            f = e[1],
            y = function() {
              i.a.xyb_request("client/talent/LoadGuideArticleList.action", "POST", {
                page: n,
                pageSize: 10
              }, !1, !1).then((function(t) {
                1 == n && f([]);
                var e = t.data || [];
                f([].concat(p(l), p(e))), s(t.data.maxPage)
              }), (function(t) {
                f([])
              }))
            },
            h = function(t) {
              a.a.eventCenter.trigger("taroClick", {
                funName: "指导文章列表",
                funType: "指导文章列表详情",
                funData: t.id
              }), a.a.navigateTo({
                url: "/growUp/pages/home/informationdetail/informationdetail?from=guidance&id=" + t.id
              })
            },
            b = function() {
              a.a.eventCenter.on("indexReachBottom", (function(t) {
                n <= c || (o(n + 1), y())
              }))
            };
          Object(r.useEffect)((function() {
            return b(), y(),
              function() {}
          }), []), e = l.map((function(e, n) {
            return e = {
              $original: Object(r.internal_get_original)(e)
            }, n = "bhdgz" + n, t.anonymousFunc0Map[n] = function() {
              h(e.$original)
            }, {
              _$indexKey: n,
              $original: e.$original
            }
          }));
          return Object.assign(this.__state, {
            loopArray1386: e,
            templateList: l
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          for (var e, n = arguments.length, o = Array(1 < n ? n - 1 : 0), r = 1; r < n; r++) o[r - 1] = arguments[r];
          return this.anonymousFunc0Map[t] && (e = this.anonymousFunc0Map)[t].apply(e, o)
        }
      }]), s = n = f, n.$$events = ["anonymousFunc0"], n.$$componentPath = "pages/find/components/JobResume/Inc/MoreGuidance/MoreGuidance", (n = s).options = {
        addGlobalClass: !0
      }, Component(o(0).default.createComponent(n))
    },
    573: function(t, e, n) {
      t.exports = n.p + "pages/find/components/JobResume/Inc/MoreGuidance/MoreGuidance.wxml"
    }
  },
  [
    [3392, 0, 2, 1, 3]
  ]
]);