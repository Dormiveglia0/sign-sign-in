var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [32], {
    2446: function(t, e, o) {
      o(776)
    },
    2447: function(t, e, o) {},
    3593: function(e, o, n) {
      n.r(o), n(2446);
      var r = n(0),
        s = n.n(r),
        i = (n(2447), function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var o = [],
              n = !0,
              r = !1,
              s = void 0;
            try {
              for (var i, c = t[Symbol.iterator](); !(n = (i = c.next()).done) && (o.push(i.value), !e || o.length !== e); n = !0);
            } catch (t) {
              r = !0, s = t
            } finally {
              try {
                !n && c.return && c.return()
              } finally {
                if (r) throw s
              }
            }
            return o
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        });
      o = function(t, e, o) {
        return e && c(t.prototype, e), o && c(t, o), t
      };

      function c(t, e) {
        for (var o = 0; o < e.length; o++) {
          var n = e[o];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }
      var a;

      function u(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function p() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, p);
        for (var o = arguments.length, n = Array(o), r = 0; r < o; r++) n[r] = arguments[r];
        return (t = e = u(this, (e = p.__proto__ || Object.getPrototypeOf(p)).call.apply(e, [this].concat(n)))).$usedState = ["$compid__2574", "$compid__2575", "status", "describe", "openText", "show"], e.config = {
          addGlobalClass: !0
        }, e.customComponents = ["AtActionSheet", "AtActionSheetItem"], u(e, t)
      }(function(e, o) {
        if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + t(o));
        e.prototype = Object.create(o && o.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : e.__proto__ = o)
      })(p, r.Component), o(p, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, o, n) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, o);
            return void 0 !== r ? "value" in r ? r.value : void 0 !== (r = r.get) ? r.call(n) : void 0 : null !== (r = Object.getPrototypeOf(e)) ? t(r, o, n) : void 0
          })(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "_constructor", this).call(this, t), this.state = {
            status: !1,
            show: !1
          }, this.$$refs = new s.a.RefsArray
        }
      }, {
        key: "componentWillReceiveProps",
        value: function(t, e) {
          t = t.show || !1, this.state.show !== t && this.setState({
            show: t
          })
        }
      }, {
        key: "cancel",
        value: function(t) {
          this.state.status ? (this.setState({
            status: !1
          }), this.props.onClose()) : this.setState({
            show: !0,
            status: !0
          })
        }
      }, {
        key: "close",
        value: function() {
          this.setState({
            show: !1
          })
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            o = Object(r.genCompid)(e + "$compid__2574"),
            n = (o = i(o, 2))[0],
            c = (o = o[1], e = Object(r.genCompid)(e + "$compid__2575"), (e = i(e, 2))[0]),
            a = (e = e[1], (u = this.__props).describe),
            u = u.openText,
            p = (l = this.__state).show,
            l = l.status;
          return this.anonymousFunc0 = function() {
            s.a.eventCenter.trigger("taroClick", {
              funName: "去开启通知"
            }), t.__props.onJump(), t.close()
          }, r.propsManager.set({
            className: "OfficialAccountsPopup",
            isOpened: p,
            cancelText: l ? "仍不开启" : "取消",
            onClose: this.cancel.bind(this)
          }, o, n), r.propsManager.set({
            onClick: this.anonymousFunc0
          }, e, c), Object.assign(this.__state, {
            $compid__2574: o,
            $compid__2575: e,
            describe: a,
            openText: u
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {}
      }]), a = o = p, o.$$events = [], o.$$componentPath = "components/OfficialAccountsPopup/OfficialAccountsPopup", (o = a).defaultProps = {
        describe: "",
        openText: "",
        show: !1,
        onClose: function() {},
        onJump: function() {}
      }, Component(n(0).default.createComponent(o))
    },
    776: function(t, e, o) {
      t.exports = o.p + "components/OfficialAccountsPopup/OfficialAccountsPopup.wxml"
    }
  },
  [
    [3593, 0, 2, 1]
  ]
]);