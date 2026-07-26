var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [53], {
    2157: function(t, e, n) {
      n(629)
    },
    2158: function(t, e, n) {},
    3447: function(e, n, o) {
      o.r(n), o(2157);
      var r = o(0),
        a = o.n(r),
        i = (n = o(4), n = o.n(n), o(2158), function(t, e) {
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
        }),
        c = function(t, e, n) {
          return e && u(t.prototype, e), n && u(t, n), t
        };

      function u(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
      }

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
        return (t = e = s(this, (e = p.__proto__ || Object.getPrototypeOf(p)).call.apply(e, [this].concat(o)))).$usedState = ["$compid__2731"], e.config = {
          component: !0
        }, e.customComponents = ["ImageCropper"], s(e, t)
      }
      c = n()({
        properties: {
          src: {
            type: String,
            value: ""
          }
        },
        data: {
          childType: 0,
          recommonendImgs: [],
          recommonendImgsData: [],
          angle: 0
        },
        ready: function() {
          this.cropper = this.$scope.selectComponent("#image-cropper")
        },
        methods: {
          cropperload: function(t) {},
          loadimage: function(t) {
            a.a.hideLoading()
          },
          clickcut: function(t) {
            a.a.previewImage({
              current: t.detail.url,
              urls: [t.detail.url]
            })
          },
          submit: function() {
            var t = this;
            this.setData({
              childType: null
            }), setTimeout((function() {
              t.setData({
                childType: 1
              })
            }), 100)
          },
          uploadHeadImg: function(t) {
            this.triggerEvent("uploadHeadImg", t)
          },
          rotate: function() {
            var t = this.data.angle - 90;
            this.setData({
              angle: t
            })
          },
          resetImg: function() {
            var t = this;
            this.setData({
              childType: null
            }), setTimeout((function() {
              t.setData({
                childType: 2
              })
            }), 100)
          },
          cancelCutImg: function() {
            this.triggerEvent("closeCropper")
          }
        }
      })((function(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + t(n));
        e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n)
      }(p, a.a.Component), c(p, [{
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
          var t = this,
            e = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            n = (e = Object(r.genCompid)(e + "$compid__2731"), (e = i(e, 2))[0]),
            o = (e = e[1], (u = this.data).src),
            c = u.angle,
            u = u.childType;
          return this.anonymousFunc0 = function(e) {
            e.stopPropagation(), a.a.eventCenter.trigger("taroClick", {
              funName: "旋转图片"
            }), t.rotate(e)
          }, this.anonymousFunc1 = function(e) {
            e.stopPropagation(), a.a.eventCenter.trigger("taroClick", {
              funName: "取消裁剪"
            }), t.cancelCutImg(e)
          }, this.anonymousFunc2 = function(e) {
            e.stopPropagation(), a.a.eventCenter.trigger("taroClick", {
              funName: "还原图片"
            }), t.resetImg(e)
          }, this.anonymousFunc3 = function(e) {
            e.stopPropagation(), a.a.eventCenter.trigger("taroClick", {
              funName: "完成裁剪"
            }), t.submit(e)
          }, r.propsManager.set({
            onLoad: this.cropperload,
            onImageload: this.loadimage,
            onTapcut: this.clickcut,
            onUploadHeadImg: this.uploadHeadImg,
            angle: c,
            imgSrc: o,
            childType: u
          }, e, n), Object.assign(this.__state, {
            $compid__2731: e
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
      }]), c = n = p, n.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3"], n.$$componentPath = "components/cropper/cropper", n = c)) || n, Component(o(0).default.createComponent(c))
    },
    629: function(t, e, n) {
      t.exports = n.p + "components/cropper/cropper.wxml"
    }
  },
  [
    [3447, 0, 2, 1]
  ]
]);