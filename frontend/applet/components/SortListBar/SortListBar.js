var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [43], {
    2646: function(t, e, o) {
      o(875)
    },
    2647: function(t, e, o) {},
    3692: function(e, o, s) {
      s.r(o), s(2646);
      o = s(0);
      var n = s.n(o),
        r = (s(2647), function(t, e, o) {
          return e && a(t.prototype, e), o && a(t, o), t
        });

      function a(t, e) {
        for (var o = 0; o < e.length; o++) {
          var s = e[o];
          s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s)
        }
      }

      function i(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function p() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, p);
        for (var o = arguments.length, s = Array(o), n = 0; n < o; n++) s[n] = arguments[n];
        return (t = e = i(this, (e = p.__proto__ || Object.getPrototypeOf(p)).call.apply(e, [this].concat(s)))).$usedState = ["sortStadus", "isClear", "status", "icon", "title"], e.customComponents = [], i(e, t)
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
      })(p, o.Component), r(p, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, o, s) {
            null === e && (e = Function.prototype);
            var n = Object.getOwnPropertyDescriptor(e, o);
            return void 0 !== n ? "value" in n ? n.value : void 0 !== (n = n.get) ? n.call(s) : void 0 : null !== (n = Object.getPrototypeOf(e)) ? t(n, o, s) : void 0
          })(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "_constructor", this).call(this, t), this.state = {
            sortStadus: 0
          }, this.toSort = this.toSort.bind(this), this.$$refs = new n.a.RefsArray
        }
      }, {
        key: "componentWillReceiveProps",
        value: function(t) {
          this.props.isClear != t.isClear && this.clear()
        }
      }, {
        key: "componentWillMount",
        value: function() {}
      }, {
        key: "componentDidMount",
        value: function() {
          var t = this,
            e = this.props.status;
          this.setState({
            sortStadus: e
          }, (function() {
            t.toSort(), 1 != t.props.status && t.props.status
          }))
        }
      }, {
        key: "componentDidShow",
        value: function() {}
      }, {
        key: "componentDidHide",
        value: function() {}
      }, {
        key: "componentWillUnmount",
        value: function() {}
      }, {
        key: "clear",
        value: function() {
          this.setState({
            sortStadus: 0
          })
        }
      }, {
        key: "toSort",
        value: function() {
          n.a.eventCenter.trigger("taroClick", {
            funName: "排序变更"
          });
          var t = "",
            e = "左右" == this.props.icon ? 1 == this.state.sortStadus ? t = 2 : 2 == this.state.sortStadus && (t = 1) : 1 == this.state.sortStadus ? t = 2 : 2 == this.state.sortStadus ? t = 1 : 0 == this.state.sortStadus && (t = 2);
          switch (this.setState({
              sortStadus: t
            }), e = 1 == t ? "ASC" : 2 == t ? "DESC" : "", this.props.title) {
            case "计划":
              this.props.onChangeType(e, "planCount");
              break;
            case "进行中":
              this.props.onChangeType(e, "planingCount");
              break;
            case "总签到":
              this.props.onChangeType(e, "ALL_CLOCK");
              break;
            case "正常":
              this.props.onChangeType(e, "NORMAL_CLOCK");
              break;
            case "外勤":
              this.props.onChangeType(e, "ABNORMAL_CLOCK");
              break;
            default:
              this.props.onChangeType(e)
          }
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = this.__state.sortStadus;
          return "上下" != this.__props.icon && "左右" == this.__props.icon && (0 == t || 1 == this.__props.status ? this.setState({
            sortStadus: 1
          }, (function() {})) : 0 != t && 2 != this.__props.status || this.setState({
            sortStadus: 2
          }, (function() {}))), Object.assign(this.__state, {}), this.__state
        }
      }]), r = o = p, o.$$events = ["toSort"], o.options = {
        addGlobalClass: !0
      }, o.$$componentPath = "components/SortListBar/SortListBar", (o = r).defaultProps = {
        status: 2,
        title: "标题",
        icon: "上下",
        isClear: 0
      }, o.options = {
        addGlobalClass: !0
      }, Component(s(0).default.createComponent(o))
    },
    875: function(t, e, o) {
      t.exports = o.p + "components/SortListBar/SortListBar.wxml"
    }
  },
  [
    [3692, 0, 2, 1]
  ]
]);