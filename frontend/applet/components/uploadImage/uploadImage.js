var n = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [83], {
    2173: function(n, e, t) {
      t(637)
    },
    2174: function(n, e, t) {},
    3455: function(e, t, o) {
      o.r(t), o(2173), o(2174);
      var a = o(0),
        r = o.n(a),
        i = o(11),
        u = (t = o(5), o.n(t));
      t = function(n, e, t) {
        return e && s(n.prototype, e), t && s(n, t), n
      };

      function s(n, e) {
        for (var t = 0; t < e.length; t++) {
          var o = e[t];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(n, o.key, o)
        }
      }
      var c;

      function l(n) {
        if (Array.isArray(n)) {
          for (var e = 0, t = Array(n.length); e < n.length; e++) t[e] = n[e];
          return t
        }
        return Array.from(n)
      }

      function p(e, t) {
        if (e) return !t || "object" != n(t) && "function" != typeof t ? e : t;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var f = r.a.getApp();

      function y() {
        var n, e;
        ! function(n, e) {
          if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, y);
        for (var t = arguments.length, o = Array(t), a = 0; a < t; a++) o[a] = arguments[a];
        return (n = e = p(this, (e = y.__proto__ || Object.getPrototypeOf(y)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "loopArray1341", "fileList", "urlField", "previewMode", "maxLength", "uploadImgType"], e.anonymousFunc0Map = {}, e.anonymousFunc1Map = {}, e.customComponents = [], p(e, n)
      }(t = (function(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + n(t));
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
      }(y, r.a.Component), t(y, [{
        key: "_constructor",
        value: function(n) {
          (function n(e, t, o) {
            null === e && (e = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(e, t);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(o) : void 0 : null !== (a = Object.getPrototypeOf(e)) ? n(a, t, o) : void 0
          })(y.prototype.__proto__ || Object.getPrototypeOf(y.prototype), "_constructor", this).call(this, n), this.$$refs = new r.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var n = this,
            e = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.__props),
            t = e.fileList,
            o = e.urlField,
            s = void 0 === (c = e.maxLength) ? 9 : c,
            c = void 0 !== (c = e.previewMode) && c,
            p = e.uploadImgType,
            y = function(n) {
              f.globalData.abnormalHide = !0;
              var e = t.map((function(n) {
                return n.originalPath || n[o]
              }));
              r.a.previewImage({
                current: e[n],
                urls: e
              })
            },
            m = function(n) {
              var o = t[n].id,
                a = JSON.parse(JSON.stringify(t));
              a.splice(n, 1), e.onDelete && e.onDelete(a, n, o)
            },
            h = function() {
              r.a.eventCenter.trigger("taroClick", {
                funName: "上传图片"
              });
              var n = s - t.length;
              r.a.chooseImage({
                count: n,
                sizeType: ["compressed"],
                sourceType: ["album", "camera"],
                success: function(n) {
                  var o = JSON.parse(JSON.stringify(t));
                  n = n.tempFilePaths.reverse();
                  Promise.all(n.map((function(n, t) {
                    return new Promise((function(o, a) {
                      i.a.upLoadOss(n, "STUDENT", e.uploadType, !0).then((function(e) {
                        var r = e && e.key ? e.key.toLowerCase().split("/").splice(-1)[0] : "img.png";
                        e && e.key ? o({
                          filePath: e.key,
                          fileName: r,
                          originalPath: n,
                          index: t,
                          ossUrl: e.url
                        }) : a()
                      })).catch((function() {
                        return a()
                      }))
                    }))
                  }))).then((function(n) {
                    n.sort((function(n, e) {
                      return n.index - e.index
                    })), n = [].concat(l(o), l(n)), e.onChange && e.onChange(n)
                  })).catch((function(n) {}))
                }
              })
            },
            g = function() {
              e.onUploadClick && e.onUploadClick(), e.isManual || h()
            },
            d = (Object(a.useEffect)((function() {
              e.uploadRefs && e.uploadRefs({
                uploadImg: h
              })
            }), [h]), u()("upload-image-container", e.hasPadding && "has-padding"));
          this.anonymousFunc2 = g, this.anonymousFunc3 = g, g = t ? t.map((function(e, t) {
            e = {
              $original: Object(a.internal_get_original)(e)
            };
            var o = "bgifz" + t,
              r = (n.anonymousFunc0Map[o] = function() {
                return y(t)
              }, "bgigz" + t);
            return n.anonymousFunc1Map[r] = function() {
              return m(t)
            }, {
              _$indexKey: o,
              _$indexKey2: r,
              $original: e.$original
            }
          })) : [];
          return Object.assign(this.__state, {
            anonymousState__temp: d,
            loopArray1341: g,
            fileList: t,
            urlField: o,
            previewMode: c,
            maxLength: s,
            uploadImgType: p
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(n) {
          for (var e, t = arguments.length, o = Array(1 < t ? t - 1 : 0), a = 1; a < t; a++) o[a - 1] = arguments[a];
          return this.anonymousFunc0Map[n] && (e = this.anonymousFunc0Map)[n].apply(e, o)
        }
      }, {
        key: "anonymousFunc1",
        value: function(n) {
          for (var e, t = arguments.length, o = Array(1 < t ? t - 1 : 0), a = 1; a < t; a++) o[a - 1] = arguments[a];
          return this.anonymousFunc1Map[n] && (e = this.anonymousFunc1Map)[n].apply(e, o)
        }
      }, {
        key: "anonymousFunc2",
        value: function(n) {}
      }, {
        key: "anonymousFunc3",
        value: function(n) {}
      }]), c = t = y, t.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3"], t.$$componentPath = "components/uploadImage/uploadImage", c)).defaultProps = {
        uploadImgType: "DEFAULT",
        fileList: [],
        urlField: "filePath",
        onChange: function() {},
        onDelete: function() {},
        hasPadding: !0
      }, t.options = {
        addGlobalClass: !0
      }, Component(o(0).default.createComponent(t))
    },
    637: function(n, e, t) {
      n.exports = t.p + "components/uploadImage/uploadImage.wxml"
    }
  },
  [
    [3455, 0, 2, 1, 3]
  ]
]);