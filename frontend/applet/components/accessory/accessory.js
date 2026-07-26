var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [48], {
    2075: function(t, e, n) {
      n(592)
    },
    2076: function(t, e, n) {},
    3411: function(e, n, o) {
      o.r(n), o(2075);
      var r = o(0),
        a = o.n(r),
        i = (o(2076), function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [],
              o = !0,
              r = !1,
              a = void 0;
            try {
              for (var i, c = t[Symbol.iterator](); !(o = (i = c.next()).done) && (n.push(i.value), !e || n.length !== e); o = !0);
            } catch (t) {
              r = !0, a = t
            } finally {
              try {
                !o && c.return && c.return()
              } finally {
                if (r) throw a
              }
            }
            return n
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        });
      n = function(t, e, n) {
        return e && c(t.prototype, e), n && c(t, n), t
      };

      function c(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }
      var u;

      function s(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function p() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, p);
        for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];
        return (t = e = s(this, (e = p.__proto__ || Object.getPrototypeOf(p)).call.apply(e, [this].concat(o)))).$usedState = ["$compid__2767", "props"], e.customComponents = ["FileImage"], s(e, t)
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
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
          var t = this.$prefix,
            e = (t = Object(r.genCompid)(t + "$compid__2767"), (t = i(t, 2))[0]),
            n = (t = t[1], this.__props),
            o = function(t) {
              n.onClick(t)
            };
          return this.anonymousFunc0 = function() {
            return o("preview")
          }, this.anonymousFunc1 = function() {
            return o("download")
          }, this.anonymousFunc2 = function() {
            return o("delete")
          }, r.propsManager.set({
            name: n.fileName,
            imageStyle: n.imageStyle
          }, t, e), Object.assign(this.__state, {
            $compid__2767: t,
            props: n
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {}
      }, {
        key: "anonymousFunc1",
        value: function(t) {}
      }, {
        key: "anonymousFunc2",
        value: function(t) {}
      }]), u = n = p, n.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2"], n.$$componentPath = "components/accessory/accessory", (n = u).defaultProps = {
        title: "附件",
        fileName: "",
        imageStyle: "display:flex;width: 48rpx;height: 59rpx;",
        time: "",
        canDownload: !1,
        canPreview: !0,
        canDelete: !1,
        onClick: function() {}
      }, n.options = {
        addGlobalClass: !0
      }, Component(o(0).default.createComponent(n))
    },
    592: function(t, e, n) {
      t.exports = n.p + "components/accessory/accessory.wxml"
    }
  },
  [
    [3411, 0, 2, 1]
  ]
]);