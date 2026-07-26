var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [82], {
    1882: function(t, e, o) {
      o(516)
    },
    1883: function(t, e, o) {},
    3335: function(e, o, n) {
      n.r(o), n(1882);
      var a = n(8),
        u = (o = n(0), n.n(o)),
        i = (o = n(4), o = n.n(o), n(1883), function(t, e, o) {
          return e && s(t.prototype, e), o && s(t, o), t
        });

      function s(t, e) {
        for (var o = 0; o < e.length; o++) {
          var n = e[o];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }

      function r(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function c() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, c);
        for (var o = arguments.length, n = Array(o), a = 0; a < o; a++) n[a] = arguments[a];
        return (t = e = r(this, (e = c.__proto__ || Object.getPrototypeOf(c)).call.apply(e, [this].concat(n)))).$usedState = ["statusHeight", "navHeight", "hidePlaceHolder", "incompleteResume", "transparent", "customBackgroundColor", "needHome", "fromShareLink", "isBlack", "hideBack", "titleLeftButtonRight", "career", "topBar", "isBold", "titleImage", "focusState", "focusStateText", "children"], e.config = {
          component: !0
        }, e.customComponents = [], r(e, t)
      }
      i = o()({
        properties: {
          career: {
            type: Number,
            value: 0
          },
          customBackReturn: {
            type: Boolean,
            value: !1
          },
          customHomeReturn: {
            type: Boolean,
            value: !1
          },
          customTitleReturn: {
            type: Boolean,
            value: !1
          },
          topBar: {
            type: Object,
            value: !1
          },
          needHome: {
            type: Boolean,
            value: !1
          },
          transparent: {
            type: Boolean,
            value: !1
          },
          isBlack: {
            type: Boolean,
            value: !0
          },
          isBold: {
            type: Boolean,
            value: !1
          },
          customBackgroundColor: {
            type: String,
            value: "#ffffff"
          },
          hideBack: {
            type: Boolean,
            value: !1
          },
          incompleteResume: {
            type: Boolean,
            value: !1
          },
          hidePlaceHolder: {
            type: Boolean,
            value: !1
          },
          titleLeftButtonRight: {
            type: Boolean,
            value: !1
          },
          titleImage: {
            type: String,
            value: ""
          },
          personId: {
            type: Number,
            value: null
          },
          focusState: {
            type: Boolean,
            value: !1
          },
          focusStateText: {
            type: String,
            value: ""
          },
          fromShareLink: {
            type: Boolean,
            value: !1
          }
        },
        data: {},
        methods: {
          backClick: function() {
            this.data.customBackReturn ? this.triggerEvent("customBackReturn") : 1 == u.a.getCurrentPages().length ? u.a.reLaunch({
              url: "/pages/find/index/index"
            }) : u.a.navigateBack({
              delta: 1
            })
          },
          homeClick: function() {
            this.data.customHomeReturn && this.triggerEvent("customHomeReturn")
          },
          homeClickEvent: function() {
            this.triggerEvent("customHomeReturn")
          },
          titleClick: function() {
            this.data.customTitleReturn && this.triggerEvent("customTitleReturn")
          },
          changeFocusStatus: function() {
            this.data.personId ? this.triggerEvent("changeFocusStatusEvent", this.data.personId) : this.triggerEvent("changeFocusStatusEvent", this.data.topBar.title)
          }
        },
        attached: function() {
          var t = this;
          Object(a.a)({
            success: function(e) {
              var o = !!e.system && -1 < e.system.indexOf("iOS");
              t.setData({
                statusHeight: e.statusBarHeight,
                navHeight: o ? 44 : 48
              }), e = e.statusBarHeight + (o ? 44 : 48);
              t.triggerEvent("getNavHeight", e)
            }
          })
        }
      })((function(e, o) {
        if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + t(o));
        e.prototype = Object.create(o && o.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : e.__proto__ = o)
      }(c, u.a.Component), i(c, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, o, n) {
            null === e && (e = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(e, o);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(n) : void 0 : null !== (a = Object.getPrototypeOf(e)) ? t(a, o, n) : void 0
          })(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "_constructor", this).call(this, t), this.$$refs = new u.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (k = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.data)).statusHeight,
            o = k.navHeight,
            n = k.hidePlaceHolder,
            a = k.incompleteResume,
            i = k.transparent,
            s = k.customBackgroundColor,
            r = k.isBlack,
            c = k.needHome,
            l = k.hideBack,
            p = k.topBar,
            m = k.isBold,
            f = k.titleLeftButtonRight,
            h = k.titleImage,
            g = k.focusState,
            y = k.focusStateText,
            v = k.fromShareLink,
            k = k.career;
          return this.anonymousFunc0 = function(e) {
            e.stopPropagation(), u.a.eventCenter.trigger("taroClick", {
              funName: "返回"
            }), t.backClick(e)
          }, this.anonymousFunc1 = function(e) {
            e.stopPropagation(), t.homeClick(e)
          }, this.anonymousFunc2 = function(e) {
            e.stopPropagation(), t.backClick(e)
          }, this.anonymousFunc3 = function(e) {
            e.stopPropagation(), t.homeClick(e)
          }, this.anonymousFunc4 = function(e) {
            e.stopPropagation(), t.backClick(e)
          }, this.anonymousFunc5 = function(e) {
            e.stopPropagation(), t.homeClickEvent(e)
          }, this.anonymousFunc6 = function(e) {
            e.stopPropagation(), t.homeClickEvent(e)
          }, this.anonymousFunc7 = function(e) {
            e.stopPropagation(), t.titleClick(e)
          }, this.anonymousFunc8 = function(e) {
            e.stopPropagation(), t.titleClick(e)
          }, this.anonymousFunc9 = function(e) {
            e.stopPropagation(), t.changeFocusStatus(e)
          }, Object.assign(this.__state, {
            statusHeight: e,
            navHeight: o,
            hidePlaceHolder: n,
            incompleteResume: a,
            transparent: i,
            customBackgroundColor: s,
            needHome: c,
            fromShareLink: v,
            isBlack: r,
            hideBack: l,
            titleLeftButtonRight: f,
            career: k,
            topBar: p,
            isBold: m,
            titleImage: h,
            focusState: g,
            focusStateText: y
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc1",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc2",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc3",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc4",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc5",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc6",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc7",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc8",
        value: function(t) {
          t.stopPropagation()
        }
      }, {
        key: "anonymousFunc9",
        value: function(t) {
          t.stopPropagation()
        }
      }]), i = o = c, o.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5", "anonymousFunc6", "anonymousFunc7", "anonymousFunc8", "anonymousFunc9"], o.$$componentPath = "components/top-button-group/top-button-group", o = i)) || o, Component(n(0).default.createComponent(i))
    },
    516: function(t, e, o) {
      t.exports = o.p + "components/top-button-group/top-button-group.wxml"
    }
  },
  [
    [3335, 0, 2, 1, 3]
  ]
]);