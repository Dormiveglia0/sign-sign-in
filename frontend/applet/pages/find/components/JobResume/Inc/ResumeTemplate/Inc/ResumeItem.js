var e = require("../../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [631], {
    1984: function(e, t, n) {
      n(548)
    },
    1985: function(e, t, n) {},
    3367: function(t, n, o) {
      o.r(n), o(1984), o(1985);
      var r = o(0),
        a = o.n(r);
      n = function(e, t, n) {
        return t && i(e.prototype, t), n && i(e, n), e
      };

      function i(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
      }
      var s;

      function u(t, n) {
        if (t) return !n || "object" != e(n) && "function" != typeof n ? t : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function c() {
        var e, t;
        ! function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, c);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (e = t = u(this, (t = c.__proto__ || Object.getPrototypeOf(c)).call.apply(t, [this].concat(o)))).config = {
          navigationBarTitleText: "校友邦",
          usingComponents: {}
        }, t.$usedState = ["index", "type", "itemData"], t.customComponents = [], u(t, e)
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
      })(c, a.a.Component), n(c, [{
        key: "_constructor",
        value: function(e) {
          (function e(t, n, o) {
            null === t && (t = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(t, n);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(o) : void 0 : null !== (r = Object.getPrototypeOf(t)) ? e(r, n, o) : void 0
          })(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "_constructor", this).call(this, e), this.$$refs = new a.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var e = (n = this.__props).itemData,
            t = n.index,
            n = n.type,
            o = function(e) {
              a.a.eventCenter.trigger("taroClick", {
                funName: "文档模版预览"
              }), a.a.navigateTo({
                url: "/thirdBag/pages/myresume/viewResumeTemplate/viewResumeTemplate?id=" + e.id + "&name=" + e.name
              })
            };
          return Object(r.useEffect)((function() {
            return function() {}
          }), []), this.anonymousFunc0 = function() {
            o(e)
          }, Object.assign(this.__state, {
            index: t,
            type: n,
            itemData: e
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(e) {}
      }]), s = n = c, n.$$events = ["anonymousFunc0"], n.$$componentPath = "pages/find/components/JobResume/Inc/ResumeTemplate/Inc/ResumeItem", (n = s).config = {
        navigationBarTitleText: "校友邦",
        usingComponents: {}
      }, n.options = {
        addGlobalClass: !0
      }, n.defaultProps = {
        itemData: {},
        index: 0,
        type: 0
      }, Component(o(0).default.createComponent(n))
    },
    548: function(e, t, n) {
      e.exports = n.p + "pages/find/components/JobResume/Inc/ResumeTemplate/Inc/ResumeItem.wxml"
    }
  },
  [
    [3367, 0, 2, 1]
  ]
]);