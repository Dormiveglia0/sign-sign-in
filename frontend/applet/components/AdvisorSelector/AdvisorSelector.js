var n = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [7], {
    2276: function(n, t, e) {
      e(692)
    },
    2277: function(n, t, e) {},
    3510: function(t, e, o) {
      o.r(e), o(2276);
      e = o(3);
      var r = o.n(e),
        a = (o(2277), o(0)),
        i = o.n(a),
        u = o(12),
        c = o(1),
        s = (e = o(5), o.n(e)),
        l = function(n, t) {
          if (Array.isArray(n)) return n;
          if (Symbol.iterator in Object(n)) return function(n, t) {
            var e = [],
              o = !0,
              r = !1,
              a = void 0;
            try {
              for (var i, u = n[Symbol.iterator](); !(o = (i = u.next()).done) && (e.push(i.value), !t || e.length !== t); o = !0);
            } catch (n) {
              r = !0, a = n
            } finally {
              try {
                !o && u.return && u.return()
              } finally {
                if (r) throw a
              }
            }
            return e
          }(n, t);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      e = function(n, t, e) {
        return t && p(n.prototype, t), e && p(n, e), n
      };

      function p(n, t) {
        for (var e = 0; e < t.length; e++) {
          var o = t[e];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(n, o.key, o)
        }
      }
      var f;

      function y(n) {
        return function() {
          var t = n.apply(this, arguments);
          return new Promise((function(n, e) {
            return function o(r, a) {
              try {
                var i = t[r](a),
                  u = i.value
              } catch (r) {
                return void e(r)
              }
              if (!i.done) return Promise.resolve(u).then((function(n) {
                o("next", n)
              }), (function(n) {
                o("throw", n)
              }));
              n(u)
            }("next")
          }))
        }
      }

      function m(t, e) {
        if (t) return !e || "object" != n(e) && "function" != typeof e ? t : e;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function h() {
        var n, t;
        ! function(n, t) {
          if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, h);
        for (var e = arguments.length, o = Array(e), r = 0; r < e; r++) o[r] = arguments[r];
        return (n = t = m(this, (t = h.__proto__ || Object.getPrototypeOf(h)).call.apply(t, [this].concat(o)))).$usedState = ["anonymousState__temp5", "loopArray1306", "loopArray1307", "$compid__2637", "visible", "dataList", "checkedList", "currentInfo", "isEmpty"], t.anonymousFunc6Map = {}, t.anonymousFunc7Map = {}, t.customComponents = ["Popup"], m(t, n)
      }(function(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
      })(h, i.a.Component), e(h, [{
        key: "_constructor",
        value: function(n) {
          (function n(t, e, o) {
            null === t && (t = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(t, e);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(t)) ? n(r, e, o) : void 0
          })(h.prototype.__proto__ || Object.getPrototypeOf(h.prototype), "_constructor", this).call(this, n), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var n, t = this,
            e = (n = y(r.a.mark((function n(t) {
              var e;
              return r.a.wrap((function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    return n.next = 2, c.a.xyb_request("student/practiceplan/loadOptionalTeacher.action", "POST", {
                      page: t,
                      pageSize: 10,
                      key: v,
                      planId: b.planId,
                      projectDateId: b.projectDateId || 0
                    }, !1, !1);
                  case 2:
                    return e = n.sent, n.abrupt("return", e);
                  case 4:
                  case "end":
                    return n.stop()
                }
              }), n, this)
            }))), function(t) {
              return n.apply(this, arguments)
            }),
            o = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            i = (o = Object(a.genCompid)(o + "$compid__2637"), (o = l(o, 2))[0]),
            p = (o = o[1], this.__props),
            f = Object(a.useRef)(null),
            m = Object(a.useState)(!1),
            h = (m = l(m, 2))[0],
            d = m[1],
            v = (m = Object(a.useState)(""), (m = l(m, 2))[0]),
            g = m[1],
            b = (m = Object(a.useState)({
              planId: "",
              projectDateId: "",
              limitLength: 10,
              hasPosition: !1
            }), (m = l(m, 2))[0]),
            _ = m[1],
            O = ((m = Object(u.a)(e)).loading, m.dataList),
            F = m.clearData,
            j = (e = m.isEmpty, m.hasMore, m.handleScrollToLower),
            $ = m.setDataList,
            k = Object(a.useMemo)((function() {
              return O.filter((function(n) {
                return n.checked
              }))
            }), [O]),
            w = function(n) {
              return new Promise((function(t) {
                f.current = t, _(n), d(!0), F()
              }))
            },
            S = (m = function() {
              d(!1), f.current && f.current()
            }, function(n) {
              !O[n].checked && b.limitLength === k.length || $((function(t) {
                return (t = JSON.parse(JSON.stringify(t)))[n].checked = !t[n].checked, t
              }))
            }),
            x = function(n) {
              var t = O.findIndex((function(t) {
                return t.id === n.id
              }));
              $((function(n) {
                return (n = JSON.parse(JSON.stringify(n)))[t].checked = !1, n
              }))
            },
            A = function() {
              b.limitLength === k.length && (f.current && f.current(k.map((function(n) {
                return n.id
              })).join(",")), d(!1))
            };
          Object(a.useEffect)((function() {
            p.onRef && p.onRef({
              selectAdvisor: w
            })
          }), []), Object(a.useEffect)((function() {
            h && F()
          }), [h]), this.anonymousFunc0 = m, this.anonymousFunc1 = m, this.anonymousFunc2 = function(n) {
            return g(n.detail.value)
          }, this.anonymousFunc3 = F, this.anonymousFunc4 = F, this.anonymousFunc5 = j, m = Object(a.internal_inline_style)(b.limitLength === k.length ? "" : "opacity:0.6"), this.anonymousFunc8 = A, j = O.map((function(n, e) {
            n = {
              $original: Object(a.internal_get_original)(n)
            };
            var o = s()("selector-item ", n.$original.checked && "checked ", !n.$original.checked && k.length >= b.limitLength && " disabled"),
              r = "bgafz" + e;
            return t.anonymousFunc6Map[r] = function() {
              return S(e)
            }, {
              $loopState__temp2: o,
              _$indexKey: r,
              $loopState__temp4: n.$original.departments && n.$original.departments.length ? n.$original.departments.join("、") : "",
              $original: n.$original
            }
          })), A = 0 < k.length ? k.map((function(n, e) {
            return n = {
              $original: Object(a.internal_get_original)(n)
            }, e = "bgagz" + e, t.anonymousFunc7Map[e] = function() {
              return x(n.$original)
            }, {
              _$indexKey2: e,
              $original: n.$original
            }
          })) : [];
          return a.propsManager.set({
            isOpened: h,
            onClose: this.anonymousFunc0
          }, o, i), Object.assign(this.__state, {
            anonymousState__temp5: m,
            loopArray1306: j,
            loopArray1307: A,
            $compid__2637: o,
            visible: h,
            dataList: O,
            checkedList: k,
            currentInfo: b,
            isEmpty: e
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(n) {}
      }, {
        key: "anonymousFunc1",
        value: function(n) {}
      }, {
        key: "anonymousFunc2",
        value: function(n) {}
      }, {
        key: "anonymousFunc3",
        value: function(n) {}
      }, {
        key: "anonymousFunc4",
        value: function(n) {}
      }, {
        key: "anonymousFunc5",
        value: function(n) {}
      }, {
        key: "anonymousFunc6",
        value: function(n) {
          for (var t, e = arguments.length, o = Array(1 < e ? e - 1 : 0), r = 1; r < e; r++) o[r - 1] = arguments[r];
          return this.anonymousFunc6Map[n] && (t = this.anonymousFunc6Map)[n].apply(t, o)
        }
      }, {
        key: "anonymousFunc7",
        value: function(n) {
          for (var t, e = arguments.length, o = Array(1 < e ? e - 1 : 0), r = 1; r < e; r++) o[r - 1] = arguments[r];
          return this.anonymousFunc7Map[n] && (t = this.anonymousFunc7Map)[n].apply(t, o)
        }
      }, {
        key: "anonymousFunc8",
        value: function(n) {}
      }]), f = e = h, e.$$events = ["anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5", "anonymousFunc6", "anonymousFunc7", "anonymousFunc8"], e.$$componentPath = "components/AdvisorSelector/AdvisorSelector", (e = f).defaultProps = {}, e.options = {
        addGlobalClass: !0
      }, Component(o(0).default.createComponent(e))
    },
    692: function(n, t, e) {
      n.exports = e.p + "components/AdvisorSelector/AdvisorSelector.wxml"
    }
  },
  [
    [3510, 0, 2, 1, 3]
  ]
]);