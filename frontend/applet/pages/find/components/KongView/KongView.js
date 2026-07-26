var e = require("../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [634], {
    2892: function(e, n, t) {
      t(997)
    },
    2893: function(e, n, t) {},
    3807: function(n, t, o) {
      o.r(t), o(2892), o(2893);
      var a = o(0),
        r = o.n(a),
        i = o(1),
        u = (t = o(5), o.n(t)),
        s = function(e, n) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return function(e, n) {
            var t = [],
              o = !0,
              a = !1,
              r = void 0;
            try {
              for (var i, u = e[Symbol.iterator](); !(o = (i = u.next()).done) && (t.push(i.value), !n || t.length !== n); o = !0);
            } catch (e) {
              a = !0, r = e
            } finally {
              try {
                !o && u.return && u.return()
              } finally {
                if (a) throw r
              }
            }
            return t
          }(e, n);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      t = function(e, n, t) {
        return n && c(e.prototype, n), t && c(e, t), e
      };

      function c(e, n) {
        for (var t = 0; t < n.length; t++) {
          var o = n[t];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
      }
      var p;

      function l(n, t) {
        if (n) return !t || "object" != e(t) && "function" != typeof t ? n : t;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function f() {
        var e, n;
        ! function(e, n) {
          if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
        }(this, f);
        for (var t = arguments.length, o = Array(t), a = 0; a < t; a++) o[a] = arguments[a];
        return (e = n = l(this, (n = f.__proto__ || Object.getPrototypeOf(f)).call.apply(n, [this].concat(o)))).$usedState = ["anonymousState__temp", "loopArray1070", "hasLoad", "list"], n.anonymousFunc0Map = {}, n.customComponents = [], l(n, e)
      }(function(n, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + e(t));
        n.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: n,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(n, t) : n.__proto__ = t)
      })(f, r.a.Component), t(f, [{
        key: "_constructor",
        value: function(e) {
          (function e(n, t, o) {
            null === n && (n = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(n, t);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(o) : void 0 : null !== (a = Object.getPrototypeOf(n)) ? e(a, t, o) : void 0
          })(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "_constructor", this).call(this, e), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var e = this,
            n = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.__props),
            t = Object(a.useState)(!1),
            o = (t = s(t, 2))[0],
            c = t[1],
            p = (t = Object(a.useState)([]), (t = s(t, 2))[0]),
            l = t[1],
            f = (t = Object(a.useState)({}), (t = s(t, 2))[0]),
            m = t[1],
            g = Object(a.useRef)(!0),
            h = function(e) {
              if (p && 0 < p.length) {
                var n;
                _(e), r.a.eventCenter.trigger("taroClick", {
                  funName: "金刚区图标点击",
                  itemId: e.name
                }), 1 === e.jumpType ? r.a.navigateTo({
                  url: e.jumpLink
                }) : (n = {
                  title: e.title || e.name,
                  url: encodeURIComponent(e.jumpLink)
                }, r.a.navigateTo({
                  url: "/videoBag/pages/h5/h5?model=" + JSON.stringify(n)
                }))
              } else {
                r.a.eventCenter.trigger("taroClick", {
                  funName: "金刚区图标点击",
                  itemId: e
                });
                var t = "";
                switch (e) {
                  case "学长学姐说":
                    t = "/secondBag/pages/seniorTalks/seniorTalks";
                    break;
                  case "名企岗位":
                    t = "/secondBag/pages/enterpriseApplicationList/enterpriseApplicationList";
                    break;
                  case "简历优化":
                    t = "/secondBag/pages/aiResume/aiResume";
                    break;
                  case "双选会":
                    r.a.eventCenter.trigger("taroClick", {
                      funName: "跳转双选会列表"
                    }), t = "/fifthBag/pages/jobModule/doubleMeeting/doubleMeeting";
                    break;
                  case "宣讲会":
                    t = "/fifthBag/pages/jobModule/preachMeeting/preachMeeting";
                    break;
                  case "资讯":
                    t = "/fifthBag/pages/jobModule/informationStation/informationStation";
                    break;
                  case "专家服务":
                    t = "/secondBag/pages/aiResume/aiResume"
                }
                t && r.a.navigateTo({
                  url: t
                })
              }
            },
            y = function() {
              i.a.xyb_request("homepage/loadHomepage.action", "POST", {}, !1, !0).then((function(e) {
                "200" === e.code && (l(e.data || []), c(!0)), c(!0)
              })).catch((function() {
                c(!0)
              }))
            },
            d = function() {
              i.a.xyb_request("homepage/homepageRedDot.action", "POST", {}, !1, !0).then((function(e) {
                "200" === e.code && m(e.data || [])
              }))
            },
            b = function(e) {
              return [{
                path: "/secondBag/pages/seniorTalks/seniorTalks",
                mapName: "SISTER_TALK"
              }, {
                path: "/secondBag/pages/enterpriseApplicationList/enterpriseApplicationList",
                mapName: "FAMOUS_ENTERPRISE"
              }, {
                path: "/fifthBag/pages/jobModule/informationStation/informationStation",
                mapName: "INFORMATION"
              }].find((function(n) {
                return e.jumpLink && e.jumpLink.includes(n.path)
              })) || !1
            },
            v = function(e) {
              return (e = b(e)) && f[e.mapName] || !1
            },
            _ = function(e) {
              (e = b(e)) && i.a.xyb_request("homepage/homepageRedDot!saveUserClickModule.action", "POST", {
                moduleType: e.mapName
              }, !1, !0).then((function(e) {}))
            },
            O = (Object(a.useDidShow)((function() {
              g.current ? g.current = !1 : (y(), d())
            })), function() {
              y(), d()
            }),
            k = (t = (Object(a.useEffect)((function() {
              O(), n.onRef && n.onRef({
                reloading: O
              })
            }), []), o && p && 0 < p.length ? u()("kong-view", p.length <= 5 && "default") : null), this.anonymousFunc1 = function() {
              return h("名企岗位")
            }, this.anonymousFunc2 = function() {
              return h("双选会")
            }, this.anonymousFunc3 = function() {
              return h("宣讲会")
            }, o && p && 0 < p.length ? p.map((function(n, t) {
              return n = {
                $original: Object(a.internal_get_original)(n)
              }, t = "bdahz" + t, e.anonymousFunc0Map[t] = function() {
                return h(n.$original)
              }, {
                _$indexKey: t,
                $loopState__temp3: v(n.$original),
                $original: n.$original
              }
            })) : []);
          return Object.assign(this.__state, {
            anonymousState__temp: t,
            loopArray1070: k,
            hasLoad: o,
            list: p
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(e) {
          for (var n, t = arguments.length, o = Array(1 < t ? t - 1 : 0), a = 1; a < t; a++) o[a - 1] = arguments[a];
          return this.anonymousFunc0Map[e] && (n = this.anonymousFunc0Map)[e].apply(n, o)
        }
      }, {
        key: "anonymousFunc1",
        value: function(e) {}
      }, {
        key: "anonymousFunc2",
        value: function(e) {}
      }, {
        key: "anonymousFunc3",
        value: function(e) {}
      }]), p = t = f, t.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3"], t.$$componentPath = "pages/find/components/KongView/KongView", (t = p).defaultProps = {}, t.options = {
        addGlobalClass: !0
      }, Component(o(0).default.createComponent(t))
    },
    997: function(e, n, t) {
      e.exports = t.p + "pages/find/components/KongView/KongView.wxml"
    }
  },
  [
    [3807, 0, 2, 1, 3]
  ]
]);