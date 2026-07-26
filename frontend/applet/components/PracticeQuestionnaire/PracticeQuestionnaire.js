var n = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [38], {
    2428: function(n, o, i) {
      i(766)
    },
    2429: function(n, o, i) {},
    3583: function(o, i, e) {
      e.r(i), e(2428);
      var t = e(0),
        r = e.n(t),
        a = e(1),
        u = (i = e(5), e.n(i)),
        s = (e(2429), function(n, o) {
          if (Array.isArray(n)) return n;
          if (Symbol.iterator in Object(n)) return function(n, o) {
            var i = [],
              e = !0,
              t = !1,
              r = void 0;
            try {
              for (var a, u = n[Symbol.iterator](); !(e = (a = u.next()).done) && (i.push(a.value), !o || i.length !== o); e = !0);
            } catch (n) {
              t = !0, r = n
            } finally {
              try {
                !e && u.return && u.return()
              } finally {
                if (t) throw r
              }
            }
            return i
          }(n, o);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        });
      i = function(n, o, i) {
        return o && l(n.prototype, o), i && l(n, i), n
      };

      function l(n, o) {
        for (var i = 0; i < o.length; i++) {
          var e = o[i];
          e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(n, e.key, e)
        }
      }
      var c;

      function p(n) {
        if (Array.isArray(n)) {
          for (var o = 0, i = Array(n.length); o < n.length; o++) i[o] = n[o];
          return i
        }
        return Array.from(n)
      }

      function f(o, i) {
        if (o) return !i || "object" != n(i) && "function" != typeof i ? o : i;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var y = r.a.getApp();

      function g() {
        var n, o;
        ! function(n, o) {
          if (!(n instanceof o)) throw new TypeError("Cannot call a class as a function")
        }(this, g);
        for (var i = arguments.length, e = Array(i), t = 0; t < i; t++) e[t] = arguments[t];
        return (n = o = f(this, (o = g.__proto__ || Object.getPrototypeOf(g)).call.apply(o, [this].concat(e)))).$usedState = ["loopArray1252", "loopArray1253", "loopArray1254", "loopArray1255", "$compid__2581", "working_pressureList", "adaptation_situationList", "interpersonal_relationshipList", "work_environmentList", "schoolname"], o.anonymousFunc1Map = {}, o.anonymousFunc2Map = {}, o.anonymousFunc3Map = {}, o.anonymousFunc4Map = {}, o.anonymousFunc5Map = {}, o.anonymousFunc6Map = {}, o.anonymousFunc7Map = {}, o.customComponents = ["Popup"], f(o, n)
      }(i = (function(o, i) {
        if ("function" != typeof i && null !== i) throw new TypeError("Super expression must either be null or a function, not " + n(i));
        o.prototype = Object.create(i && i.prototype, {
          constructor: {
            value: o,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), i && (Object.setPrototypeOf ? Object.setPrototypeOf(o, i) : o.__proto__ = i)
      }(g, r.a.Component), i(g, [{
        key: "_constructor",
        value: function(n) {
          (function n(o, i, e) {
            null === o && (o = Function.prototype);
            var t = Object.getOwnPropertyDescriptor(o, i);
            return void 0 !== t ? "value" in t ? t.value : void 0 !== (t = t.get) ? t.call(e) : void 0 : null !== (t = Object.getPrototypeOf(o)) ? n(t, i, e) : void 0
          })(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "_constructor", this).call(this, n), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var n = this,
            o = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            i = (o = Object(t.genCompid)(o + "$compid__2581"), (o = s(o, 2))[0]),
            e = (o = o[1], this.__props),
            l = e.visible,
            c = e.onClose,
            f = e.questionData,
            g = y.globalData.userSchoolInfo.school,
            m = Object(t.useState)([]),
            d = (m = s(m, 2))[0],
            $ = m[1],
            h = (m = Object(t.useState)([]), (m = s(m, 2))[0]),
            _ = m[1],
            w = (m = Object(t.useState)([]), (m = s(m, 2))[0]),
            v = m[1],
            b = (m = Object(t.useState)([]), (m = s(m, 2))[0]),
            F = m[1],
            O = function(n, o, i) {
              var e, t;
              1 === i && (d[o].answer = n.id, 1 == n.questionId && (e = d.findIndex((function(n) {
                return 2 == n.questionId
              })), t = d.findIndex((function(n) {
                return 3 == n.questionId
              })), 3 == d[o].answer || 4 == d[o].answer ? (-1 < e && (d[e].hide = 0), -1 < t && (d[t].hide = 0)) : (-1 < e && (d[e].hide = 1), -1 < t && (d[t].hide = 1))), $([].concat(p(d)))), 2 === i && (h[o].answer = n.id, _([].concat(p(h)))), 3 === i && (w[o].answer = n.id, 7 == n.questionId && (e = w.findIndex((function(n) {
                return 8 == n.questionId
              })), 27 != w[o].answer ? -1 < e && (w[e].hide = 0) : -1 < e && (w[e].hide = 1)), v([].concat(p(w)))), 4 === i && (b[o].answer = n.id, 12 == n.questionId && (t = b.findIndex((function(n) {
                return 13 == n.questionId
              })), 53 == b[o].answer || 54 == b[o].answer ? -1 < t && (b[t].hide = 0) : -1 < t && (b[t].hide = 1)), F([].concat(p(b))))
            },
            I = function(n, o, i) {
              var e = (o.answer || []).findIndex((function(o) {
                return o === n.id
              })); - 1 < e ? o.answer.splice(e, 1) : o.answer.push(n.id), 1 === i && $([].concat(p(d))), 2 === i && _([].concat(p(h))), 3 === i && v([].concat(p(w))), 4 === i && F([].concat(p(b)))
            },
            q = Object(t.useRef)(!1),
            j = (m = function() {
              var n, o, i = !1;
              d.forEach((function(n) {
                1 == n.hide || n.answer && 0 != n.answer.length || (r.a.showToast({
                  title: "请选择" + n.questionName,
                  icon: "none"
                }), i = !0)
              })), i || (w.forEach((function(n) {
                1 == n.hide || n.answer && 0 != n.answer.length || (r.a.showToast({
                  title: "请选择" + n.questionName,
                  icon: "none"
                }), i = !0)
              })), i) || (h.forEach((function(n) {
                1 == n.hide || n.answer && 0 != n.answer.length || (r.a.showToast({
                  title: "请选择" + n.questionName,
                  icon: "none"
                }), i = !0)
              })), i) || (b.forEach((function(n) {
                1 == n.hide || n.answer && 0 != n.answer.length || (r.a.showToast({
                  title: "请选择" + n.questionName,
                  icon: "none"
                }), i = !0)
              })), i) || (n = [], b.forEach((function(o) {
                n.push({
                  questionId: o.questionId,
                  optionIds: Array.isArray(o.answer) ? o.answer.join(",") : o.answer
                })
              })), w.forEach((function(o) {
                n.push({
                  questionId: o.questionId,
                  optionIds: Array.isArray(o.answer) ? o.answer.join(",") : o.answer
                })
              })), h.forEach((function(o) {
                n.push({
                  questionId: o.questionId,
                  optionIds: Array.isArray(o.answer) ? o.answer.join(",") : o.answer
                })
              })), d.forEach((function(o) {
                n.push({
                  questionId: o.questionId,
                  optionIds: Array.isArray(o.answer) ? o.answer.join(",") : o.answer
                })
              })), o = {
                questionnaireId: f.questionnaireId,
                answerJson: JSON.stringify(n)
              }, q.current) || (q.current = !0, a.a.xyb_request("mentalhealth/MentalHealthQuestion!submitQuestionnaire.action", "POST", o, !0, !1).then((function(n) {
                r.a.showToast({
                  title: "提交成功",
                  icon: "none"
                }), e.onClose()
              })).finally((function() {
                setTimeout((function() {
                  q.current = !1
                }), 5e3)
              })))
            }, c = (Object(t.useEffect)((function() {
              f.questionnaireId && ($(f.questionDTOList.filter((function(n) {
                return "working_pressure" === n.filed
              }))), _(f.questionDTOList.filter((function(n) {
                return "adaptation_situation" === n.filed
              }))), v(f.questionDTOList.filter((function(n) {
                return "interpersonal_relationship" === n.filed
              }))), F(f.questionDTOList.filter((function(n) {
                return "work_environment" === n.filed
              }))))
            }), [f]), this.anonymousFunc0 = c, this.anonymousFunc8 = m, d.map((function(o, i) {
              return o = {
                $original: Object(t.internal_get_original)(o)
              }, {
                $loopState__temp2: Object(t.internal_inline_style)(o.$original.hide || d && d[1].hide ? "border:0;" : ""),
                $anonymousCallee__154: 2 == o.$original.questionId ? o.$original.optionDTOList.map((function(e, r) {
                  e = {
                    $original: Object(t.internal_get_original)(e)
                  };
                  var a = 2 == o.$original.questionId ? u()("item ", -1 < (o.$original.answer || []).findIndex((function(n) {
                    return n == e.$original.id
                  })) && "active ") : null;
                  r = "bfeaz" + i + "-" + r;
                  return n.anonymousFunc1Map[r] = function() {
                    return I(e.$original, o.$original, 1)
                  }, {
                    $loopState__temp4: a,
                    _$indexKey: r,
                    $original: e.$original
                  }
                })) : [],
                $anonymousCallee__155: 2 != o.$original.questionId ? o.$original.optionDTOList.map((function(e, r) {
                  e = {
                    $original: Object(t.internal_get_original)(e)
                  };
                  var a = 2 != o.$original.questionId ? u()("item ", e.$original.id == o.$original.answer && "active ") : null;
                  r = "bfebz" + i + "-" + r;
                  return n.anonymousFunc2Map[r] = function() {
                    return O(e.$original, i, 1)
                  }, {
                    $loopState__temp6: a,
                    _$indexKey2: r,
                    $original: e.$original
                  }
                })) : [],
                $original: o.$original
              }
            }))), m = h.map((function(o, i) {
              return {
                $anonymousCallee__156: 4 == (o = {
                  $original: Object(t.internal_get_original)(o)
                }).$original.questionId ? o.$original.optionDTOList.map((function(e, r) {
                  e = {
                    $original: Object(t.internal_get_original)(e)
                  };
                  var a = 4 == o.$original.questionId ? u()("item ", e.$original.id == o.$original.answer && "active ") : null;
                  r = "bfecz" + i + "-" + r;
                  return n.anonymousFunc3Map[r] = function() {
                    return O(e.$original, i, 2)
                  }, {
                    $loopState__temp8: a,
                    _$indexKey3: r,
                    $original: e.$original
                  }
                })) : [],
                $anonymousCallee__157: 4 != o.$original.questionId ? o.$original.optionDTOList.map((function(e, r) {
                  e = {
                    $original: Object(t.internal_get_original)(e)
                  };
                  var a = 4 != o.$original.questionId ? u()("item ", e.$original.id == o.$original.answer && "active ") : null;
                  r = "bfedz" + i + "-" + r;
                  return n.anonymousFunc4Map[r] = function() {
                    return O(e.$original, i, 2)
                  }, {
                    $loopState__temp10: a,
                    _$indexKey4: r,
                    $original: e.$original
                  }
                })) : [],
                $original: o.$original
              }
            })), w.map((function(o, i) {
              return {
                $anonymousCallee__158: 8 == (o = {
                  $original: Object(t.internal_get_original)(o)
                }).$original.questionId ? o.$original.optionDTOList.map((function(e, r) {
                  e = {
                    $original: Object(t.internal_get_original)(e)
                  };
                  var a = 8 == o.$original.questionId ? u()("item ", -1 < (o.$original.answer || []).findIndex((function(n) {
                    return n == e.$original.id
                  })) && "active ") : null;
                  r = "bfeez" + i + "-" + r;
                  return n.anonymousFunc5Map[r] = function() {
                    return I(e.$original, o.$original, 3)
                  }, {
                    $loopState__temp12: a,
                    _$indexKey5: r,
                    $original: e.$original
                  }
                })) : [],
                $anonymousCallee__159: 8 != o.$original.questionId ? o.$original.optionDTOList.map((function(e, r) {
                  e = {
                    $original: Object(t.internal_get_original)(e)
                  };
                  var a = 8 != o.$original.questionId ? u()("item ", e.$original.id == o.$original.answer && "active ") : null;
                  r = "bfefz" + i + "-" + r;
                  return n.anonymousFunc6Map[r] = function() {
                    return O(e.$original, i, 3)
                  }, {
                    $loopState__temp14: a,
                    _$indexKey6: r,
                    $original: e.$original
                  }
                })) : [],
                $original: o.$original
              }
            }))),
            A = b.map((function(o, i) {
              return {
                $anonymousCallee__160: (o = {
                  $original: Object(t.internal_get_original)(o)
                }).$original.optionDTOList.map((function(e, r) {
                  e = {
                    $original: Object(t.internal_get_original)(e)
                  };
                  var a = u()("item ", e.$original.id == o.$original.answer && "active ");
                  r = "bfegz" + i + "-" + r;
                  return n.anonymousFunc7Map[r] = function() {
                    return O(e.$original, i, 4)
                  }, {
                    $loopState__temp16: a,
                    _$indexKey7: r,
                    $original: e.$original
                  }
                })),
                $original: o.$original
              }
            }));
          return t.propsManager.set({
            lockScroll: !0,
            isOpened: l,
            onClose: this.anonymousFunc0,
            needCloseIcon: !0
          }, o, i), Object.assign(this.__state, {
            loopArray1252: c,
            loopArray1253: m,
            loopArray1254: j,
            loopArray1255: A,
            $compid__2581: o,
            working_pressureList: d,
            adaptation_situationList: h,
            interpersonal_relationshipList: w,
            work_environmentList: b,
            schoolname: g
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(n) {}
      }, {
        key: "anonymousFunc1",
        value: function(n) {
          for (var o, i = arguments.length, e = Array(1 < i ? i - 1 : 0), t = 1; t < i; t++) e[t - 1] = arguments[t];
          return this.anonymousFunc1Map[n] && (o = this.anonymousFunc1Map)[n].apply(o, e)
        }
      }, {
        key: "anonymousFunc2",
        value: function(n) {
          for (var o, i = arguments.length, e = Array(1 < i ? i - 1 : 0), t = 1; t < i; t++) e[t - 1] = arguments[t];
          return this.anonymousFunc2Map[n] && (o = this.anonymousFunc2Map)[n].apply(o, e)
        }
      }, {
        key: "anonymousFunc3",
        value: function(n) {
          for (var o, i = arguments.length, e = Array(1 < i ? i - 1 : 0), t = 1; t < i; t++) e[t - 1] = arguments[t];
          return this.anonymousFunc3Map[n] && (o = this.anonymousFunc3Map)[n].apply(o, e)
        }
      }, {
        key: "anonymousFunc4",
        value: function(n) {
          for (var o, i = arguments.length, e = Array(1 < i ? i - 1 : 0), t = 1; t < i; t++) e[t - 1] = arguments[t];
          return this.anonymousFunc4Map[n] && (o = this.anonymousFunc4Map)[n].apply(o, e)
        }
      }, {
        key: "anonymousFunc5",
        value: function(n) {
          for (var o, i = arguments.length, e = Array(1 < i ? i - 1 : 0), t = 1; t < i; t++) e[t - 1] = arguments[t];
          return this.anonymousFunc5Map[n] && (o = this.anonymousFunc5Map)[n].apply(o, e)
        }
      }, {
        key: "anonymousFunc6",
        value: function(n) {
          for (var o, i = arguments.length, e = Array(1 < i ? i - 1 : 0), t = 1; t < i; t++) e[t - 1] = arguments[t];
          return this.anonymousFunc6Map[n] && (o = this.anonymousFunc6Map)[n].apply(o, e)
        }
      }, {
        key: "anonymousFunc7",
        value: function(n) {
          for (var o, i = arguments.length, e = Array(1 < i ? i - 1 : 0), t = 1; t < i; t++) e[t - 1] = arguments[t];
          return this.anonymousFunc7Map[n] && (o = this.anonymousFunc7Map)[n].apply(o, e)
        }
      }, {
        key: "anonymousFunc8",
        value: function(n) {}
      }]), c = i = g, i.$$events = ["anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5", "anonymousFunc6", "anonymousFunc7", "anonymousFunc8"], i.$$componentPath = "components/PracticeQuestionnaire/PracticeQuestionnaire", c)).defaultProps = {
        visible: !1,
        onClose: function() {},
        questionData: {}
      }, Component(e(0).default.createComponent(i))
    },
    766: function(n, o, i) {
      n.exports = i.p + "components/PracticeQuestionnaire/PracticeQuestionnaire.wxml"
    }
  },
  [
    [3583, 0, 2, 1, 3]
  ]
]);