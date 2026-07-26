require("../../../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [638], {
    1936: function(e, t, n) {
      n(531)
    },
    1937: function(e, t, n) {},
    3350: function(t, n, o) {
      o.r(n), o(1936);
      n = o(5);
      var a = o.n(n),
        r = (o(1937), o(0)),
        i = o.n(r);
      n = function(e, t, n) {
        return t && s(e.prototype, t), n && s(e, n), e
      };

      function s(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
      }
      var u;

      function l(t, n) {
        if (t) return !n || "object" != e(n) && "function" != typeof n ? t : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function c() {
        var e, t;
        ! function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, c);
        for (var n = arguments.length, o = Array(n), a = 0; a < n; a++) o[a] = arguments[a];
        return (e = t = l(this, (t = c.__proto__ || Object.getPrototypeOf(c)).call.apply(t, [this].concat(o)))).config = {
          usingComponents: {
            "van-icon": "../../../../vant-weapp/dist/icon/index"
          }
        }, t.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp6", "anonymousState__temp7", "loopArray1422", "item", "idKey", "props", "$anonymousCallee__179", "index", "matchMap", "nameKey", "locationKey", "binderrorimg", "__fn_onError", "renderFooter"], t.customComponents = [], l(t, e)
      }(function(t, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + e(n));
        t.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(t, n) : t.__proto__ = n)
      })(c, i.a.Component), n(c, [{
        key: "_constructor",
        value: function(e) {
          (function e(t, n, o) {
            null === t && (t = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(t, n);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(o) : void 0 : null !== (a = Object.getPrototypeOf(t)) ? e(a, n, o) : void 0
          })(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "_constructor", this).call(this, e), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var e = this.__props,
            t = e.data || {},
            n = e.nameKey || "name",
            o = e.idKey || "id",
            s = e.locationKey || "location",
            u = e.index,
            l = function(e) {
              i.a.eventCenter.trigger("taroClick", {
                funName: "首页跳转双选会"
              }), i.a.navigateTo({
                url: "/videoBag/pages/doubleSelectList/doubleSelectList?id=" + e.doubleChoiceDTO.id + "&name=" + e.doubleChoiceDTO.name + "&signUp=false&canSignUp=true&pageSource=21"
              })
            },
            c = Object(r.useMemo)((function() {
              var e = [];
              return t.preferredEmployer && e.push("优选雇主"), t.entTag && e.push(t.entTag), t.practiceLevel && e.push(t.practiceLevel), e.slice(0, 3)
            }), [t]),
            p = ["实习证明", "免费住宿", "免费餐食", "提供转正", "周末双休", "合作基地", "上市公司", "国企", "大厂"],
            f = function(e) {
              var t;
              return e && Array.isArray(e) && 0 !== e.length ? (t = [], p.forEach((function(n) {
                e.includes(n) && t.push(n)
              })), e.forEach((function(e) {
                p.includes(e) || t.push(e)
              })), t.unshift.apply(t, function(e) {
                if (Array.isArray(e)) {
                  for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                  return n
                }
                return Array.from(e)
              }(c)), t) : []
            },
            m = function(e) {
              return {
                0: "当前活跃",
                1: "六小时内活跃",
                2: "当日活跃",
                3: "三日内活跃"
              } [e] || ""
            },
            y = a()("post_box", e.border && "post_box_border"),
            _ = (this.anonymousFunc0 = e.onClick || function() {}, a()("cut_text", "post_name-text", (0 === t.publishNewFlag || 1 === t.publishNewFlag) && t.equalHot && "short_name")),
            h = a()("post_money", 9999 < t.floorSalary && 9999 < t.upperSalary && "post_money_active"),
            d = e.showBottom ? a()("cut_text", c.length && "enterprise-name") : null,
            b = (m = e.showBottom ? m(t.activeStatus) : null, this.anonymousFunc1 = function(n) {
              n.stopPropagation(), e.onCrossClick && e.onCrossClick(t)
            }, this.anonymousFunc2 = function(e) {
              e.stopPropagation(), l(t)
            }, t.welfareLabels && 0 < t.welfareLabels.length ? f(t.welfareLabels) : []);
          f = t.welfareLabels && 0 < t.welfareLabels.length ? f(t.welfareLabels).map((function(e, t) {
            return e = {
              $original: Object(r.internal_get_original)(e)
            }, {
              $loopState__temp5: t <= 5 ? a()("post_welfare max_line1", (p.includes(e.$original) || c.includes(e.$original)) && "highlight") : null,
              $original: e.$original
            }
          })) : [];
          return Object.assign(this.__state, {
            anonymousState__temp: y,
            anonymousState__temp2: _,
            anonymousState__temp3: h,
            anonymousState__temp6: d,
            anonymousState__temp7: m,
            loopArray1422: f,
            item: t,
            idKey: o,
            props: e,
            $anonymousCallee__179: b,
            index: u,
            matchMap: {
              1: "该职位满足您的求职意向",
              2: "该职位跟您的专业匹配",
              3: "该职位符合您的求职意向城市",
              4: "该职位跟您籍贯在同一个城市"
            },
            nameKey: n,
            locationKey: s
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(e) {}
      }, {
        key: "funPrivatebhfiz",
        value: function() {
          return this.props.binderrorimg.apply(void 0, Array.prototype.slice.call(arguments, 1))
        }
      }, {
        key: "anonymousFunc1",
        value: function(e) {
          e.stopPropagation()
        }
      }, {
        key: "anonymousFunc2",
        value: function(e) {
          e.stopPropagation()
        }
      }]), u = n = c, n.$$events = ["anonymousFunc0", "funPrivatebhfiz", "anonymousFunc1", "anonymousFunc2"], n.multipleSlots = !0, n.$$componentPath = "pages/find/components/PostCard/PostCard", (n = u).config = {
        usingComponents: {
          "van-icon": "../../../../vant-weapp/dist/icon/index"
        }
      }, n.defaultProps = {
        data: {},
        index: 0,
        crossIcon: !1,
        matchBar: !1,
        dot: !1,
        border: !1,
        nameKey: "name",
        idKey: "id",
        locationKey: "location",
        renderFooter: null,
        showBottom: !0,
        onClick: function() {},
        onCrossClick: function() {},
        binderrorimg: function() {}
      }, n.options = {
        addGlobalClass: !0
      }, Component(o(0).default.createComponent(n))
    },
    531: function(e, t, n) {
      e.exports = n.p + "pages/find/components/PostCard/PostCard.wxml"
    }
  },
  [
    [3350, 0, 2, 1]
  ]
]);