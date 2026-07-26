var n = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [24], {
    2506: function(n, t, o) {
      o(806)
    },
    2507: function(n, t, o) {},
    3623: function(t, o, e) {
      e.r(o), e(2506), e(2507);
      var i = e(0),
        r = e.n(i),
        a = e(18),
        u = function(n, t) {
          if (Array.isArray(n)) return n;
          if (Symbol.iterator in Object(n)) return function(n, t) {
            var o = [],
              e = !0,
              i = !1,
              r = void 0;
            try {
              for (var a, u = n[Symbol.iterator](); !(e = (a = u.next()).done) && (o.push(a.value), !t || o.length !== t); e = !0);
            } catch (n) {
              i = !0, r = n
            } finally {
              try {
                !e && u.return && u.return()
              } finally {
                if (i) throw r
              }
            }
            return o
          }(n, t);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      o = function(n, t, o) {
        return t && s(n.prototype, t), o && s(n, o), n
      };

      function s(n, t) {
        for (var o = 0; o < t.length; o++) {
          var e = t[o];
          e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(n, e.key, e)
        }
      }
      var c;

      function l(t, o) {
        if (t) return !o || "object" != n(o) && "function" != typeof o ? t : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function p() {
        var n, t;
        ! function(n, t) {
          if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, p);
        for (var o = arguments.length, e = Array(o), i = 0; i < o; i++) e[i] = arguments[i];
        return (n = t = l(this, (t = p.__proto__ || Object.getPrototypeOf(p)).call.apply(t, [this].concat(e)))).$usedState = ["loopArray1222", "loopArray1223", "$compid__2416", "positions", "locations", "title", "props"], t.anonymousFunc0Map = {}, t.anonymousFunc1Map = {}, t.customComponents = ["Popup"], l(t, n)
      }(function(t, o) {
        if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + n(o));
        t.prototype = Object.create(o && o.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(t, o) : t.__proto__ = o)
      })(p, r.a.Component), o(p, [{
        key: "_constructor",
        value: function(n) {
          (function n(t, o, e) {
            null === t && (t = Function.prototype);
            var i = Object.getOwnPropertyDescriptor(t, o);
            return void 0 !== i ? "value" in i ? i.value : void 0 !== (i = i.get) ? i.call(e) : void 0 : null !== (i = Object.getPrototypeOf(t)) ? n(i, o, e) : void 0
          })(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "_constructor", this).call(this, n), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var n = this,
            t = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            o = (t = Object(i.genCompid)(t + "$compid__2416"), (t = u(t, 2))[0]),
            e = (t = t[1], this.__props),
            s = Object(i.useState)(e.locations || []),
            c = (s = u(s, 2))[0],
            l = s[1],
            p = (s = Object(i.useState)(e.positions || []), (s = u(s, 2))[0]),
            f = s[1],
            y = (s = Object(i.useMemo)((function() {
              return e.customTitle ? e.title : e.positions && 10 <= e.positions.length && 10 <= p.length ? "您的求职意向已达上限，请先删除后再添加~" : e.locations && 5 <= e.locations.length && 5 <= c.length ? "您的求职意向城市已达5个上限，请先删除后再添加~" : "是否确认添加？"
            }), [e.customTitle, e.title, c, p]), Object(a.a)((function() {
              0 === c.length && 0 === p.length && e.closeAfterClearing && e.onCancel && e.onCancel()
            }))),
            h = function(n) {
              f((function(t) {
                return t.filter((function(t, o) {
                  return n !== o
                }))
              })), y(), e.onDeletePosition && e.onDeletePosition(), r.a.showToast({
                title: "期望职位已删除~",
                icon: "none"
              })
            },
            b = function(n) {
              l((function(t) {
                return t.filter((function(t, o) {
                  return n !== o
                }))
              })), y(), e.onDeleteLocation && e.onDeleteLocation(), r.a.showToast({
                title: "期望城市已删除~",
                icon: "none"
              })
            },
            m = function() {
              e.onConfirm && e.onConfirm({
                locations: c,
                positions: p
              })
            },
            g = function() {
              e.onCancel && e.onCancel()
            };
          Object(i.useEffect)((function() {
            e.visible && (l(e.locations || []), f(e.positions || []))
          }), [e.locations, e.positions, e.visible]), this.anonymousFunc2 = g, this.anonymousFunc3 = m, g = 0 < p.length ? p.map((function(t, o) {
            t = {
              $original: Object(i.internal_get_original)(t)
            };
            var e = 0 < p.length ? t.$original.id || t.$original.dataId || o : null,
              r = "bfbgz" + o;
            return n.anonymousFunc0Map[r] = function() {
              return h(o)
            }, {
              $loopState__temp2: e,
              _$indexKey: r,
              $original: t.$original
            }
          })) : [], m = 0 < c.length ? c.map((function(t, o) {
            t = {
              $original: Object(i.internal_get_original)(t)
            };
            var e = 0 < c.length ? t.$original.id || t.$original.dataId || o : null,
              r = "bfbhz" + o;
            return n.anonymousFunc1Map[r] = function() {
              return b(o)
            }, {
              $loopState__temp4: e,
              _$indexKey2: r,
              $original: t.$original
            }
          })) : [];
          return i.propsManager.set({
            isOpened: e.visible
          }, t, o), Object.assign(this.__state, {
            loopArray1222: g,
            loopArray1223: m,
            $compid__2416: t,
            positions: p,
            locations: c,
            title: s,
            props: e
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(n) {
          for (var t, o = arguments.length, e = Array(1 < o ? o - 1 : 0), i = 1; i < o; i++) e[i - 1] = arguments[i];
          return this.anonymousFunc0Map[n] && (t = this.anonymousFunc0Map)[n].apply(t, e)
        }
      }, {
        key: "anonymousFunc1",
        value: function(n) {
          for (var t, o = arguments.length, e = Array(1 < o ? o - 1 : 0), i = 1; i < o; i++) e[i - 1] = arguments[i];
          return this.anonymousFunc1Map[n] && (t = this.anonymousFunc1Map)[n].apply(t, e)
        }
      }, {
        key: "anonymousFunc2",
        value: function(n) {}
      }, {
        key: "anonymousFunc3",
        value: function(n) {}
      }]), c = o = p, o.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3"], o.$$componentPath = "components/JobIntentionPopup/JobIntentionPopup", (o = c).options = {
        addGlobalClass: !0
      }, Component(e(0).default.createComponent(o))
    },
    806: function(n, t, o) {
      n.exports = o.p + "components/JobIntentionPopup/JobIntentionPopup.wxml"
    }
  },
  [
    [3623, 0, 2, 1, 3]
  ]
]);