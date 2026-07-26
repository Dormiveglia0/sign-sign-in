var n = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [25], {
    2163: function(n, t, e) {
      e(632)
    },
    2164: function(n, t, e) {},
    3450: function(t, e, o) {
      o.r(e), o(2163);
      e = o(3);
      var r = o.n(e),
        a = (o(2164), o(0)),
        i = o.n(a),
        u = o(1),
        c = function(n, t) {
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
        return t && s(n.prototype, t), e && s(n, e), n
      };

      function s(n, t) {
        for (var e = 0; e < t.length; e++) {
          var o = t[e];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(n, o.key, o)
        }
      }
      var p;

      function l(n) {
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

      function f(t, e) {
        if (t) return !e || "object" != n(e) && "function" != typeof e ? t : e;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function y() {
        var n, t;
        ! function(n, t) {
          if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, y);
        for (var e = arguments.length, o = Array(e), r = 0; r < e; r++) o[r] = arguments[r];
        return (n = t = f(this, (t = y.__proto__ || Object.getPrototypeOf(y)).call.apply(t, [this].concat(o)))).$usedState = ["loopArray1343", "$compid__2726", "$compid__2727", "closeIcon", "jobHuntDtoNeed", "educationexpNeed", "skillList", "winName"], t.anonymousFunc2Map = {}, t.customComponents = ["Popup", "AtIcon"], f(t, n)
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
      })(y, i.a.Component), e(y, [{
        key: "_constructor",
        value: function(n) {
          (function n(t, e, o) {
            null === t && (t = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(t, e);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(t)) ? n(r, e, o) : void 0
          })(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "_constructor", this).call(this, n), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var n, t, e = this,
            o = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            s = Object(a.genCompid)(o + "$compid__2726"),
            p = (s = c(s, 2))[0],
            f = (s = s[1], o = Object(a.genCompid)(o + "$compid__2727"), (o = c(o, 2))[0]),
            y = (o = o[1], this.__props),
            h = y.showWin,
            m = y.winName,
            d = y.educationexpNeed,
            b = y.closeIcon,
            v = y.jobHuntDtoNeed,
            _ = Object(a.useState)([]),
            w = (_ = c(_, 2))[0],
            g = _[1],
            O = function() {
              i.a.eventCenter.trigger("taroClick", {
                funName: "关闭弹窗"
              }), y && y.onClose()
            },
            x = (Object(a.useEffect)((function() {
              j()
            }), [h]), function(n) {
              i.a.eventCenter.trigger("taroClick", {
                funName: "删除技能要求"
              });
              var t = [].concat(function(n) {
                if (Array.isArray(n)) {
                  for (var t = 0, e = Array(n.length); t < n.length; t++) e[t] = n[t];
                  return e
                }
                return Array.from(n)
              }(w));
              t.splice(n, 1), g(t)
            }),
            j = (_ = (n = l(r.a.mark((function n() {
              var t;
              return r.a.wrap((function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    return i.a.eventCenter.trigger("taroClick", {
                      funName: "添加技能要求"
                    }), (t = w).forEach((function(n) {
                      delete n.version
                    })), n.next = 5, u.a.xyb_request("talents/TalentsSkill!batchAdd.action", "POST", {
                      skillJsonStr: JSON.stringify(t),
                      masterType: 1
                    }, !1, !1);
                  case 5:
                    return 200 == (t = n.sent).code ? (i.a.showToast({
                      title: "保存成功",
                      icon: "none",
                      duration: 2e3
                    }), setTimeout((function() {
                      y && y.onGetData()
                    }), 2e3), O()) : i.a.showToast({
                      title: t.msg,
                      icon: "none",
                      duration: 2e3
                    }), n.abrupt("return", t);
                  case 8:
                  case "end":
                    return n.stop()
                }
              }), n, e)
            }))), function() {
              return n.apply(this, arguments)
            }), t = l(r.a.mark((function n() {
              var t;
              return r.a.wrap((function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    return n.next = 2, u.a.xyb_request("client/talent/LoadSkillList.action", "POST", {}, !1, !1);
                  case 2:
                    return 200 == (t = n.sent).code ? g(t.data) : i.a.showToast({
                      title: t.msg,
                      icon: "none",
                      duration: 2e3
                    }), n.abrupt("return", t);
                  case 6:
                  case "end":
                    return n.stop()
                }
              }), n, e)
            }))), function() {
              return t.apply(this, arguments)
            });
          this.anonymousFunc0 = O, this.anonymousFunc1 = O, this.anonymousFunc3 = _, _ = w && 0 < w.length ? w.map((function(n, t) {
            n = {
              $original: Object(a.internal_get_original)(n)
            };
            var o = "bgiiz" + t;
            return e.anonymousFunc2Map[o] = function() {
              return x(t)
            }, {
              _$indexKey: o,
              $original: n.$original
            }
          })) : [];
          return a.propsManager.set({
            isOpened: h,
            onClose: this.anonymousFunc0
          }, s, p), b && a.propsManager.set({
            prefixClass: "icon icon-guanbi",
            value: "guanbi",
            size: "16",
            color: "#757575"
          }, o, f), Object.assign(this.__state, {
            loopArray1343: _,
            $compid__2726: s,
            $compid__2727: o,
            closeIcon: b,
            jobHuntDtoNeed: v,
            educationexpNeed: d,
            skillList: w,
            winName: m
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
        value: function(n) {
          for (var t, e = arguments.length, o = Array(1 < e ? e - 1 : 0), r = 1; r < e; r++) o[r - 1] = arguments[r];
          return this.anonymousFunc2Map[n] && (t = this.anonymousFunc2Map)[n].apply(t, o)
        }
      }, {
        key: "anonymousFunc3",
        value: function(n) {}
      }]), p = e = y, e.$$events = ["anonymousFunc1", "anonymousFunc2", "anonymousFunc3"], e.$$componentPath = "components/JobIntentionTwoPop/JobIntentionTwoPop", (e = p).options = {
        addGlobalClass: !0
      }, e.defaultProps = {
        showWin: !1,
        winName: "",
        educationexpNeed: !1,
        closeIcon: !0,
        onClose: function() {},
        onGetData: function() {},
        jobHuntDtoNeed: !1
      }, Component(o(0).default.createComponent(e))
    },
    632: function(n, t, e) {
      n.exports = e.p + "components/JobIntentionTwoPop/JobIntentionTwoPop.wxml"
    }
  },
  [
    [3450, 0, 2, 1, 3]
  ]
]);