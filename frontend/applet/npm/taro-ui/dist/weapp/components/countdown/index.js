var t = require("../../../../../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [612], {
    2681: function(t, e, o) {
      o(895)
    },
    3712: function(e, o, n) {
      n.r(o), n(2681);
      var s = n(0),
        r = n.n(s),
        i = (o = n(5), n.n(o)),
        a = (o = n(7), o = n.n(o), n(23)),
        u = function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var o = [],
              n = !0,
              s = !1,
              r = void 0;
            try {
              for (var i, a = t[Symbol.iterator](); !(n = (i = a.next()).done) && (o.push(i.value), !e || o.length !== e); n = !0);
            } catch (t) {
              s = !0, r = t
            } finally {
              try {
                !n && a.return && a.return()
              } finally {
                if (s) throw r
              }
            }
            return o
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        },
        c = function(t, e, o) {
          return e && p(t.prototype, e), o && p(t, o), t
        };

      function p(t, e) {
        for (var o = 0; o < e.length; o++) {
          var n = e[o];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }

      function m(e, o) {
        if (e) return !o || "object" != t(o) && "function" != typeof o ? e : o;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var h = function(t, e, o, n) {
        return 60 * t * 60 * 24 + 60 * e * 60 + 60 * o + n
      };

      function l() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, l);
        for (var o = arguments.length, n = Array(o), s = 0; s < o; s++) n[s] = arguments[s];
        return (t = e = m(this, (e = l.__proto__ || Object.getPrototypeOf(l)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "$compid__2342", "$compid__2343", "$compid__2344", "$compid__2345", "isShowDay", "isShowHour", "_day", "_hours", "_minutes", "_seconds", "day", "hours", "minutes", "seconds", "className", "customStyle", "format", "isCard"], e.customComponents = ["AtCountdownItem"], m(e, t)
      }(a = (function(e, o) {
        if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + t(o));
        e.prototype = Object.create(o && o.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : e.__proto__ = o)
      }(l, a.a), c(l, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, o, n) {
            null === e && (e = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(e, o);
            return void 0 !== s ? "value" in s ? s.value : void 0 !== (s = s.get) ? s.call(n) : void 0 : null !== (s = Object.getPrototypeOf(e)) ? t(s, o, n) : void 0
          })(l.prototype.__proto__ || Object.getPrototypeOf(l.prototype), "_constructor", this).call(this, t);
          var e = (t = this.props).day,
            o = t.hours,
            n = t.minutes;
          t = t.seconds, o = (e = (this.seconds = h(e, o, n, t), this.calculateTime())).day, n = e.hours, t = e.minutes, e = e.seconds;
          this.state = {
            _day: o,
            _hours: n,
            _minutes: t,
            _seconds: e
          }, this.timer = void 0, this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "setTimer",
        value: function() {
          this.timer || this.countdonwn()
        }
      }, {
        key: "clearTimer",
        value: function() {
          this.timer && (clearTimeout(this.timer), this.timer = void 0)
        }
      }, {
        key: "calculateTime",
        value: function() {
          var t = 0,
            e = 0,
            o = 0,
            n = 0;
          return 0 < this.seconds && (t = this.props.isShowDay ? Math.floor(this.seconds / 86400) : 0, e = Math.floor(this.seconds / 3600) - 24 * t, o = Math.floor(this.seconds / 60) - 24 * t * 60 - 60 * e, n = Math.floor(this.seconds) - 24 * t * 60 * 60 - 60 * e * 60 - 60 * o), {
            day: t,
            hours: e,
            minutes: o,
            seconds: n
          }
        }
      }, {
        key: "countdonwn",
        value: function() {
          var t = this,
            e = (s = this.calculateTime()).day,
            o = s.hours,
            n = s.minutes,
            s = s.seconds;
          this.setState({
            _day: e,
            _hours: o,
            _minutes: n,
            _seconds: s
          }), this.seconds--, this.seconds < 0 ? (this.clearTimer(), this.props.onTimeUp && this.props.onTimeUp()) : this.timer = setTimeout((function() {
            t.countdonwn()
          }), 1e3)
        }
      }, {
        key: "componentWillReceiveProps",
        value: function(t) {
          var e, o, n;
          JSON.stringify(this.props) !== JSON.stringify(t) && (e = t.day, o = t.hours, n = t.minutes, t = t.seconds, this.seconds = h(e, o, n, t), this.clearTimer(), this.setTimer())
        }
      }, {
        key: "componentDidMount",
        value: function() {
          this.setTimer()
        }
      }, {
        key: "componentWillUnmount",
        value: function() {
          this.clearTimer()
        }
      }, {
        key: "componentDidHide",
        value: function() {
          this.clearTimer()
        }
      }, {
        key: "componentDidShow",
        value: function() {
          this.setTimer()
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
          var t = this.$prefix,
            e = Object(s.genCompid)(t + "$compid__2342"),
            o = (e = u(e, 2))[0],
            n = (e = e[1], Object(s.genCompid)(t + "$compid__2343")),
            r = (n = u(n, 2))[0],
            a = (n = n[1], Object(s.genCompid)(t + "$compid__2344")),
            c = (a = u(a, 2))[0],
            p = (a = a[1], t = Object(s.genCompid)(t + "$compid__2345"), (t = u(t, 2))[0]),
            m = (t = t[1], (y = this.__props).className),
            h = y.customStyle,
            l = y.format,
            d = y.isShowDay,
            _ = y.isCard,
            y = y.isShowHour,
            f = (w = this.__state)._day,
            b = w._hours,
            v = w._minutes,
            w = w._seconds;
          _ = i()({
            "at-countdown": !0,
            "at-countdown--card": _
          }, m), m = Object(s.internal_inline_style)(h);
          return d && s.propsManager.set({
            num: f,
            separator: l.day
          }, e, o), y && s.propsManager.set({
            num: b,
            separator: l.hours
          }, n, r), s.propsManager.set({
            num: v,
            separator: l.minutes
          }, a, c), s.propsManager.set({
            num: w,
            separator: l.seconds
          }, t, p), Object.assign(this.__state, {
            anonymousState__temp: _,
            anonymousState__temp2: m,
            $compid__2342: e,
            $compid__2343: n,
            $compid__2344: a,
            $compid__2345: t,
            isShowDay: d,
            isShowHour: y
          }), this.__state
        }
      }]), c = a = l, a.$$events = [], a.$$componentPath = "node_modules/taro-ui/dist/weapp/components/countdown/index", c)).defaultProps = {
        customStyle: "",
        className: "",
        isCard: !1,
        isShowDay: !1,
        isShowHour: !0,
        format: {
          day: "天",
          hours: "时",
          minutes: "分",
          seconds: "秒"
        },
        day: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        onTimeUp: function() {}
      }, a.propTypes = {
        customStyle: o.a.oneOfType([o.a.object, o.a.string]),
        className: o.a.oneOfType([o.a.array, o.a.string]),
        isCard: o.a.bool,
        isShowDay: o.a.bool,
        isShowHour: o.a.bool,
        format: o.a.object,
        day: o.a.number,
        hours: o.a.number,
        minutes: o.a.number,
        seconds: o.a.number,
        onTimeUp: o.a.func
      }, Component(n(0).default.createComponent(a))
    },
    895: function(t, e, o) {
      t.exports = o.p + "npm/taro-ui/dist/weapp/components/countdown/index.wxml"
    }
  },
  [
    [3712, 0, 2, 1]
  ]
]);