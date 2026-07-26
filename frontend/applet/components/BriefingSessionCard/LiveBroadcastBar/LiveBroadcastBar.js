var t = require("../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [13], {
    1e3: function(t, e, n) {
      t.exports = n.p + "components/BriefingSessionCard/LiveBroadcastBar/LiveBroadcastBar.wxml"
    },
    2898: function(t, e, n) {
      n(1e3)
    },
    2899: function(t, e, n) {},
    3810: function(e, n, o) {
      o.r(n), o(2898), o(2899);
      var r = o(0),
        a = o.n(r),
        i = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [],
              o = !0,
              r = !1,
              a = void 0;
            try {
              for (var i, s = t[Symbol.iterator](); !(o = (i = s.next()).done) && (n.push(i.value), !e || n.length !== e); o = !0);
            } catch (t) {
              r = !0, a = t
            } finally {
              try {
                !o && s.return && s.return()
              } finally {
                if (r) throw a
              }
            }
            return n
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
      n = function(t, e, n) {
        return e && s(t.prototype, e), n && s(t, n), t
      };

      function s(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var c;

      function u(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function p() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, p);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = u(this, (e = p.__proto__ || Object.getPrototypeOf(p)).call.apply(e, [this].concat(o)))).$usedState = ["visible", "item"], e.customComponents = [], u(e, t)
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
      })(p, a.a.Component), n(p, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, o) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, n, o) : void 0
          })(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "_constructor", this).call(this, t), this.$$refs = new a.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = this.__props.item,
            e = Object(r.useState)(!1),
            n = (e = i(e, 2))[0],
            o = e[1],
            s = (e = function(e) {
              e.stopPropagation(), o(!1), a.a.setStorageSync("liveBroadcastBarVisible", {
                id: t.id,
                time: (new Date).toLocaleDateString()
              })
            }, function() {
              a.a.eventCenter.trigger("taroClick", {
                funName: "直播提示-去宣讲会详情"
              });
              var e = (e = (e = a.a.getCurrentPages())[e.length - 1]).options.bType ? "&bType=" + e.options.bType : "";
              a.a.navigateTo({
                url: "/videoBag/pages/preachMeeting/preachMeeting?id=" + t.id + "&fromList=1&pageSource=22" + e
              })
            });
          return Object(r.useEffect)((function() {
            var e = (new Date).toLocaleDateString(),
              n = a.a.getStorageSync("liveBroadcastBarVisible");
            n && n.id === t.id && n.time === e || o(!0)
          }), [t.id]), this.anonymousFunc0 = s, this.anonymousFunc1 = e, Object.assign(this.__state, {
            visible: n,
            item: t
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {}
      }, {
        key: "anonymousFunc1",
        value: function(t) {
          t.stopPropagation()
        }
      }]), c = n = p, n.$$events = ["anonymousFunc0", "anonymousFunc1"], n.$$componentPath = "components/BriefingSessionCard/LiveBroadcastBar/LiveBroadcastBar", (n = c).options = {
        addGlobalClass: !0
      }, n.defaultProps = {
        item: {}
      }, Component(o(0).default.createComponent(n))
    }
  },
  [
    [3810, 0, 2, 1]
  ]
]);