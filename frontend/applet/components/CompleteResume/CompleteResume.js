var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [19], {
    2654: function(t, e, n) {
      n(879)
    },
    2655: function(t, e, n) {},
    3696: function(e, n, o) {
      o.r(n), o(2654);
      var r = o(0),
        i = o.n(r),
        a = (n = (o(2655), o(5)), o.n(n)),
        s = o(6),
        u = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [],
              o = !0,
              r = !1,
              i = void 0;
            try {
              for (var a, s = t[Symbol.iterator](); !(o = (a = s.next()).done) && (n.push(a.value), !e || n.length !== e); o = !0);
            } catch (t) {
              r = !0, i = t
            } finally {
              try {
                !o && s.return && s.return()
              } finally {
                if (r) throw i
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
      var l;

      function p(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function m() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, m);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = p(this, (e = m.__proto__ || Object.getPrototypeOf(m)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "visible", "title"], e.customComponents = [], p(e, t)
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
      })(m, i.a.Component), n(m, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, n, o) : void 0
          })(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = this.__props,
            e = t.jobHuntInfo,
            n = t.studentStatus,
            o = Object(s.useSelector)((function(t) {
              return t.xybData.bottomBarHeight
            })),
            c = Object(r.useState)(!1),
            l = (c = u(c, 2))[0],
            p = c[1],
            m = Object(r.useMemo)((function() {
              return !!n || !(!e || !e.activate)
            }), [e, n]),
            f = Object(r.useMemo)((function() {
              return !!(e.locations && 0 < e.locations.length || e.positions && 0 < e.positions.length)
            }), [e.locations, e.positions]),
            b = Object(r.useMemo)((function() {
              var t, n = e.resumeOptimization;
              return !!n && (t = n.schoolPracticeDatas, n = n.projectExpDatas, 0 === t || 0 === n)
            }), [e]),
            y = (c = function() {
              m ? f ? (i.a.eventCenter.trigger("taroClick", {
                funName: "去完善简历"
              }), i.a.navigateTo({
                url: "/thirdBag/pages/myresume/index/index"
              })) : (i.a.eventCenter.trigger("taroClick", {
                funName: "去填写简历求职意向"
              }), i.a.navigateTo({
                url: "/videoBag/pages/jobintentionsetting/jobobjective/jobobjective?recommonDialog=1"
              })) : (i.a.eventCenter.trigger("taroClick", {
                funName: "去认证学籍"
              }), i.a.navigateTo({
                url: "/secondBag/pages/mine/schoolcensus/index/index"
              }))
            }, function() {
              p(!1), i.a.setStorageSync("homeCompleteResumeClosed", (new Date).toLocaleDateString())
            }),
            h = Object(r.useMemo)((function() {
              return m ? f ? b ? {
                title: "Hi同学，完善简历后将获得更多的面试机会",
                subTitle: "填写实习经历、项目经历更吸引企业HR邀约哦！",
                buttonText: "去完善"
              } : {
                title: "Hi同学，完善简历后将获得更多的面试机会",
                subTitle: "填写求职意向、项目经历更吸引企业HR邀约哦！",
                buttonText: "去完善"
              } : {
                title: "Hi同学，完善求职意向将获得更精准的职位推荐",
                subTitle: "填写求职意向，将为您推荐更适合您的职位",
                buttonText: "去填写"
              } : {
                title: "Hi同学，认证学籍即可快速参与实习和投递简历",
                subTitle: "认证学籍后，将为您推荐适合您的职位",
                buttonText: "去认证"
              }
            }), [m, f, b]),
            v = (Object(r.useEffect)((function() {
              var e = (new Date).toLocaleDateString(),
                n = i.a.getStorageSync("homeCompleteResumeClosed"),
                o = !m || !f || !b;
              p(t.isFixed ? e !== n && o : o)
            }), [t.isFixed, m, f, b]), l ? a()("completeness_box", t.isFixed && "is-fixed") : null);
          o = l ? Object(r.internal_inline_style)(t.isFixed ? "bottom:" + (o + 6) + "px" : "") : null, this.anonymousFunc0 = y, y = l ? a()("text1", t.isSmall && "is-small") : null;
          return this.anonymousFunc1 = c, Object.assign(this.__state, {
            anonymousState__temp: v,
            anonymousState__temp2: o,
            anonymousState__temp3: y,
            visible: l,
            title: h
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {}
      }, {
        key: "anonymousFunc1",
        value: function(t) {}
      }]), l = n = m, n.$$events = ["anonymousFunc0", "anonymousFunc1"], n.$$componentPath = "components/CompleteResume/CompleteResume", (n = l).options = {
        addGlobalClass: !0
      }, n.defaultProps = {
        isFixed: !1,
        studentStatus: !1,
        jobHuntInfo: {}
      }, Component(o(0).default.createComponent(n))
    },
    879: function(t, e, n) {
      t.exports = n.p + "components/CompleteResume/CompleteResume.wxml"
    }
  },
  [
    [3696, 0, 2, 1]
  ]
]);