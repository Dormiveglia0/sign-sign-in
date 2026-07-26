var n = require("../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [624], {
    2039: function(n, e, t) {
      t(574)
    },
    2040: function(n, e, t) {},
    3393: function(e, t, o) {
      o.r(t), o(2039);
      t = o(3);
      var a = o.n(t),
        r = (o(2040), o(1)),
        i = o(0),
        u = o.n(i),
        c = o(18),
        s = o(12),
        l = function(n, e) {
          if (Array.isArray(n)) return n;
          if (Symbol.iterator in Object(n)) return function(n, e) {
            var t = [],
              o = !0,
              a = !1,
              r = void 0;
            try {
              for (var i, u = n[Symbol.iterator](); !(o = (i = u.next()).done) && (t.push(i.value), !e || t.length !== e); o = !0);
            } catch (n) {
              a = !0, r = n
            } finally {
              try {
                !o && u.return && u.return()
              } finally {
                if (a) throw r
              }
            }
            return t
          }(n, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      t = function(n, e, t) {
        return e && p(n.prototype, e), t && p(n, t), n
      };

      function p(n, e) {
        for (var t = 0; t < e.length; t++) {
          var o = e[t];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(n, o.key, o)
        }
      }
      var f;

      function y(n) {
        return function() {
          var e = n.apply(this, arguments);
          return new Promise((function(n, t) {
            return function o(a, r) {
              try {
                var i = e[a](r),
                  u = i.value
              } catch (a) {
                return void t(a)
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

      function m(e, t) {
        if (e) return !t || "object" != n(t) && "function" != typeof t ? e : t;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var h = u.a.getApp();

      function g() {
        var n, e;
        ! function(n, e) {
          if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, g);
        for (var t = arguments.length, o = Array(t), a = 0; a < t; a++) o[a] = arguments[a];
        return (n = e = m(this, (e = g.__proto__ || Object.getPrototypeOf(g)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "loopArray1384", "loopArray1385", "$compid__2792", "$compid__2793", "companyList", "dataList", "isEmpty", "selectCityName", "__fn_on"], e.anonymousFunc3Map = {}, e.anonymousFunc4Map = {}, e.customComponents = ["CompanyCard", "CompanyReviews", "ListStatusBar", "CitySelect"], m(e, n)
      }(t = (function(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + n(t));
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
      }(g, u.a.Component), t(g, [{
        key: "_constructor",
        value: function(n) {
          (function n(e, t, o) {
            null === e && (e = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(e, t);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(o) : void 0 : null !== (a = Object.getPrototypeOf(e)) ? n(a, t, o) : void 0
          })(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "_constructor", this).call(this, n), this.$$refs = new u.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var n, e = this,
            t = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            o = Object(i.genCompid)(t + "$compid__2792"),
            p = (o = l(o, 2))[0],
            f = (o = o[1], Object(i.genCompid)(t + "$compid__2793")),
            m = (f = l(f, 2))[0],
            g = (f = f[1], Object(i.useState)([])),
            d = (g = l(g, 2))[0],
            v = g[1],
            b = (g = Object(i.useState)(!1), (g = l(g, 2))[0]),
            _ = g[1],
            C = (g = 0 < d.length ? d.map((function(n) {
              return n.name
            })).join(",") : "全国", Object(i.useState)([])),
            w = (C = l(C, 2))[0],
            F = C[1],
            O = (C = function() {
              u.a.eventCenter.trigger("taroClick", {
                funName: "企业热评-点击搜索"
              }), u.a.navigateTo({
                url: "/ninthBag/pages/enterpriseReviewsSearch/enterpriseReviewsSearch"
              })
            }, function() {
              u.a.eventCenter.trigger("taroClick", {
                funName: "企业热评-查看全部"
              }), u.a.navigateTo({
                url: "/ninthBag/pages/enterpriseReviews/enterpriseReviews"
              })
            }),
            j = Object(c.a)((function() {
              var n = {
                locationId: 0 < d.length ? d.map((function(n) {
                  return n.id
                })).join(",") : ""
              };
              r.a.xyb_request("enterprise/getHotEnterprise.action", "POST", n, !1, !1).then((function(n) {
                "200" === n.code && F(n.data)
              })).catch((function(n) {}))
            })),
            $ = function(n) {
              n = n.detail, u.a.eventCenter.trigger("taroClick", {
                funName: "选择城市"
              }), v(n), h.globalData.selectCityArray = n, j(), R(), _(!1)
            },
            k = function(n) {
              r.a.xyb_request("talents/JobHuntCheck.action", "POST", {}, !1, !0).then((function(e) {
                var t = h.globalData.selectCityArray;
                t ? v(t) : e.data.locations && 0 < e.data.locations.length && v(e.data.locations), j(), n && R()
              })).catch((function(e) {
                var t = h.globalData.selectCityArray;
                t && v(t), j(), n && R()
              }))
            },
            S = function(n) {
              u.a.eventCenter.trigger("taroClick", {
                funName: "跳转公司详情"
              }), (n = n.enterpriseId) && u.a.navigateTo({
                url: "/echartsBag/pages/comdetail/comdetail?comid=" + n
              })
            },
            x = function(n) {
              u.a.eventCenter.trigger("taroClick", {
                funName: "跳转点评详情"
              }), (n = n.enterpriseId) && u.a.navigateTo({
                url: "/echartsBag/pages/comdetail/comdetail?comid=" + n + "&tabIndex=2"
              })
            },
            z = (n = y(a.a.mark((function n(t) {
              var o;
              return a.a.wrap((function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    return o = {
                      page: t,
                      pageSize: 10,
                      locationId: 0 < d.length ? d.map((function(n) {
                        return n.id
                      })).join(",") : ""
                    }, n.next = 3, r.a.xyb_request("enterprise/getHotEvaluate.action", "POST", o, !1, !1).catch((function(n) {}));
                  case 3:
                    return o = n.sent, n.abrupt("return", o);
                  case 5:
                  case "end":
                    return n.stop()
                }
              }), n, e)
            }))), function(e) {
              return n.apply(this, arguments)
            }),
            A = (z = Object(s.a)(z)).loading,
            E = z.dataList,
            R = z.clearData,
            M = z.isEmpty,
            P = z.hasMore,
            T = z.handleScrollToLower,
            D = Object(i.useCallback)((function() {
              T()
            }), [T]);
          Object(i.useEffect)((function() {
            return u.a.eventCenter.on("indexReachBottom", D),
              function() {
                u.a.eventCenter.off("indexReachBottom", D)
              }
          }), [D]), Object(i.useEffect)((function() {
            k(!0);
            var n = Date.now();
            return function() {
              var e = Date.now();
              e = parseInt((e - n) / 1e3);
              u.a.eventCenter.trigger("taroClick", {
                funName: "企业热评停留",
                stayTime: e
              })
            }
          }), []), Object(i.useDidShow)((function() {
            k(!1)
          })), this.anonymousFunc0 = C, this.anonymousFunc1 = function() {
            return _(!0)
          }, this.anonymousFunc2 = O, this.anonymousFunc5 = function() {
            return _(!0)
          }, z = 0 < E.length ? !P : null, this.anonymousFunc6 = function() {
            return _(!0)
          }, this.anonymousFunc7 = $, this.anonymousFunc8 = function() {
            return _(!1)
          }, C = w.map((function(n, o) {
            n = {
              $original: Object(i.internal_get_original)(n)
            };
            var a = "bhdcz" + o,
              r = (e.anonymousFunc3Map[a] = function() {
                return S(n.$original)
              }, "bhddz" + o),
              u = (o = (e.anonymousFunc4Map[r] = function() {
                return x(n.$original)
              }, Object(i.genCompid)(t + "bhdezzzzzz" + o, !0)), (o = l(o, 2))[0]);
            o = o[1];
            return i.propsManager.set({
              data: n.$original,
              border: !0,
              hasComment: !0,
              onClick: e.anonymousFunc3.bind(e, a),
              onCommentClick: e.anonymousFunc4.bind(e, r)
            }, o, u), {
              _$indexKey: a,
              _$indexKey2: r,
              $compid__2790: o,
              $original: n.$original
            }
          })), O = E.map((function(n, e) {
            n = {
              $original: Object(i.internal_get_original)(n)
            };
            e = Object(i.genCompid)(t + "bhdfzzzzzz" + e, !0);
            var o = (e = l(e, 2))[0];
            e = e[1];
            return i.propsManager.set({
              data: n.$original,
              border: !0
            }, e, o), {
              $compid__2791: e,
              $original: n.$original
            }
          }));
          return 0 < E.length && i.propsManager.set({
            loading: A,
            isComplete: z
          }, o, p), i.propsManager.set({
            title: "选择城市",
            onReceive: this.anonymousFunc7,
            isShow: b,
            cityArray: d,
            onClose: this.anonymousFunc8
          }, f, m), Object.assign(this.__state, {
            anonymousState__temp: z,
            loopArray1384: C,
            loopArray1385: O,
            $compid__2792: o,
            $compid__2793: f,
            companyList: w,
            dataList: E,
            isEmpty: M,
            selectCityName: g
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
        value: function(n) {
          for (var e, t = arguments.length, o = Array(1 < t ? t - 1 : 0), a = 1; a < t; a++) o[a - 1] = arguments[a];
          return this.anonymousFunc3Map[n] && (e = this.anonymousFunc3Map)[n].apply(e, o)
        }
      }, {
        key: "anonymousFunc4",
        value: function(n) {
          for (var e, t = arguments.length, o = Array(1 < t ? t - 1 : 0), a = 1; a < t; a++) o[a - 1] = arguments[a];
          return this.anonymousFunc4Map[n] && (e = this.anonymousFunc4Map)[n].apply(e, o)
        }
      }, {
        key: "anonymousFunc5",
        value: function(n) {}
      }, {
        key: "anonymousFunc6",
        value: function(n) {}
      }, {
        key: "anonymousFunc7",
        value: function(n) {}
      }, {
        key: "anonymousFunc8",
        value: function(n) {}
      }]), f = t = g, t.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc5", "anonymousFunc6"], t.$$componentPath = "pages/find/components/EnterpriseReviews/EnterpriseReviews", f)).options = {
        addGlobalClass: !0
      }, Component(o(0).default.createComponent(t))
    },
    574: function(n, e, t) {
      n.exports = t.p + "pages/find/components/EnterpriseReviews/EnterpriseReviews.wxml"
    }
  },
  [
    [3393, 0, 2, 1, 3]
  ]
]);