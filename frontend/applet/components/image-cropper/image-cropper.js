var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [58], {
    2159: function(t, a, i) {
      i(630)
    },
    2160: function(t, a, i) {},
    3448: function(a, i, e) {
      e.r(i), e(2159);
      var h = e(8),
        s = (i = e(0), e.n(i)),
        _ = (i = e(4), i = e.n(i), e(2160), function(t, a, i) {
          return a && d(t.prototype, a), i && d(t, i), t
        });

      function d(t, a) {
        for (var i = 0; i < a.length; i++) {
          var e = a[i];
          e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e)
        }
      }
      var o = function t(a, i, e) {
        null === a && (a = Function.prototype);
        var h = Object.getOwnPropertyDescriptor(a, i);
        return void 0 !== h ? "value" in h ? h.value : void 0 !== (h = h.get) ? h.call(e) : void 0 : null !== (h = Object.getPrototypeOf(a)) ? t(h, i, e) : void 0
      };

      function n(a, i) {
        if (a) return !i || "object" != t(i) && "function" != typeof i ? a : i;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function c() {
        var t, a;
        ! function(t, a) {
          if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function")
        }(this, c);
        for (var i = arguments.length, e = Array(i), h = 0; h < i; h++) e[h] = arguments[h];
        return (t = a = n(this, (a = c.__proto__ || Object.getPrototypeOf(c)).call.apply(a, [this].concat(e)))).$usedState = ["_flag_bright", "cut_top", "_cut_animation", "height", "cut_left", "width", "img_width", "img_height", "_img_left", "_img_top", "scale", "angle", "imgSrc", "_canvas_width", "export_scale", "_canvas_height", "canvas_left", "canvas_top"], a.config = {
          component: !0
        }, a.customComponents = [], n(a, t)
      }
      _ = i()({
        properties: {
          imgSrc: {
            type: String
          },
          angle: {
            type: Number,
            value: 0
          },
          height: {
            type: Number,
            value: 335
          },
          width: {
            type: Number,
            value: 335
          },
          childType: {
            type: Number,
            value: 0
          }
        },
        data: {
          el: "image-cropper",
          info: Object(h.b)(),
          MOVE_THROTTLE: null,
          MOVE_THROTTLE_FLAG: !0,
          INIT_IMGWIDTH: 0,
          INIT_IMGHEIGHT: 0,
          TIME_BG: null,
          TIME_CUT_CENTER: null,
          _touch_img_relative: [{
            x: 0,
            y: 0
          }],
          _flag_cut_touch: !1,
          _hypotenuse_length: 0,
          _flag_img_endtouch: !1,
          _flag_bright: !0,
          _canvas_overflow: !0,
          _canvas_width: 200,
          _canvas_height: 200,
          origin_x: .5,
          origin_y: .5,
          _cut_animation: !1,
          _img_top: Object(h.b)().windowHeight / 2,
          _img_left: Object(h.b)().windowWidth / 2,
          min_width: 100,
          min_height: 100,
          max_width: 400,
          max_height: 400,
          disable_width: !1,
          disable_height: !1,
          disable_ratio: !0,
          export_scale: 3,
          quality: 1,
          cut_top: null,
          cut_left: null,
          canvas_top: null,
          canvas_left: null,
          img_width: null,
          img_height: null,
          scale: 1,
          min_scale: .5,
          max_scale: 2,
          disable_rotate: !1,
          limit_move: !1,
          watch: {
            width: function(t, a) {
              t < a.data.min_width && a.setData({
                width: a.data.min_width
              }), a._computeCutSize()
            },
            height: function(t, a) {
              t < a.data.min_height && a.setData({
                height: a.data.min_height
              }), a._computeCutSize()
            },
            angle: function(t, a) {
              a._moveStop(), a.data.limit_move && a.data.angle % 90 && a.setData({
                angle: 90 * Math.round(a.data.angle / 90)
              })
            },
            _cut_animation: function(t, a) {
              clearTimeout(a.data._cut_animation_time), t && (a.data._cut_animation_time = setTimeout((function() {
                a.setData({
                  _cut_animation: !1
                })
              }), 300))
            },
            limit_move: function(t, a) {
              t && (a.data.angle % 90 && a.setData({
                angle: 90 * Math.round(a.data.angle / 90)
              }), a._imgMarginDetectionScale(), a.data._canvas_overflow || a._draw())
            },
            canvas_top: function(t, a) {
              a._canvasDetectionPosition()
            },
            canvas_left: function(t, a) {
              a._canvasDetectionPosition()
            },
            imgSrc: function(t, a) {
              a.pushImg()
            },
            cut_top: function(t, a) {
              a._cutDetectionPosition(), a.data.limit_move && !a.data._canvas_overflow && a._draw()
            },
            cut_left: function(t, a) {
              a._cutDetectionPosition(), a.data.limit_move && !a.data._canvas_overflow && a._draw()
            }
          }
        },
        attached: function() {
          this.data.info = Object(h.b)(), this._watcher(), this.data.INIT_IMGWIDTH = this.data.img_width, this.data.INIT_IMGHEIGHT = this.data.img_height, this.setData({
            _canvas_height: this.data.height,
            _canvas_width: this.data.width
          }), this._initCanvas(), this.pushImg(), this._initImageSize(), this._computeCutSize(), this._cutDetectionPosition(), this._canvasDetectionPosition(), this.triggerEvent("load", {
            cropper: this
          })
        },
        componentWillReceiveProps: function(t) {
          var a = t.childType,
            i = t.imgSrc,
            e = t.angle,
            h = t.height,
            s = (t = t.width, this),
            _ = !1;
          i != s.data.imgSrc && (s.pushImg(i), _ = !0), e != s.data.angle && (_ = !0), h != s.data.height && (s._computeCutSize(), _ = !0), t != s.data.width && (s._computeCutSize(), _ = !0), !_ && a == s.data.childType || (1 == a ? s.getImg((function(t) {
            s.triggerEvent("uploadHeadImg", t.url)
          })) : 2 == a && s.imgReset())
        },
        methods: {
          upload: function() {
            var t = this;
            s.a.chooseImage({
              count: 1,
              sizeType: ["original", "compressed"],
              sourceType: ["album", "camera"],
              success: function(a) {
                a = a.tempFilePaths[0], t.pushImg(a), s.a.showLoading({
                  title: "加载中..."
                })
              }
            })
          },
          getImg: function(t) {
            var a = this;
            this._draw((function() {
              s.a.canvasToTempFilePath({
                width: a.data.width * a.data.export_scale,
                height: Math.round(a.data.height * a.data.export_scale),
                destWidth: a.data.width * a.data.export_scale,
                destHeight: Math.round(a.data.height) * a.data.export_scale,
                fileType: "png",
                quality: a.data.quality,
                canvasId: a.data.el,
                success: function(i) {
                  t({
                    url: i.tempFilePath,
                    width: a.data.width * a.data.export_scale,
                    height: a.data.height * a.data.export_scale
                  })
                }
              }, a.$scope)
            }))
          },
          setTransform: function(t) {
            var a, i;
            t && (this.data.disable_rotate || this.setData({
              angle: t.angle ? this.data.angle + t.angle : this.data.angle
            }), a = this.data.scale, t.scale && (a = (a = (a = this.data.scale + t.scale) <= this.data.min_scale ? this.data.min_scale : a) >= this.data.max_scale ? this.data.max_scale : a), this.data.scale = a, a = this.data.cut_left, i = this.data.cut_top, t.cutX && (this.setData({
              cut_left: a + t.cutX
            }), this.data.watch.cut_left(null, this)), t.cutY && (this.setData({
              cut_top: i + t.cutY
            }), this.data.watch.cut_top(null, this)), this.data._img_top = t.y ? this.data._img_top + t.y : this.data._img_top, this.data._img_left = t.x ? this.data._img_left + t.x : this.data._img_left, this._imgMarginDetectionScale(), this._moveDuring(), this.setData({
              scale: this.data.scale,
              _img_top: this.data._img_top,
              _img_left: this.data._img_left
            }), this.data._canvas_overflow || this._draw(), this._moveStop())
          },
          setCutXY: function(t, a) {
            this.setData({
              cut_top: a,
              cut_left: t
            })
          },
          setCutSize: function(t, a) {
            this.setData({
              width: t,
              height: a
            }), this._computeCutSize()
          },
          setCutCenter: function() {
            var t = .5 * (this.data.info.windowHeight - this.data.height),
              a = .5 * (this.data.info.windowWidth - this.data.width);
            this.setData({
              _img_top: this.data._img_top - this.data.cut_top + t,
              cut_top: t,
              _img_left: this.data._img_left - this.data.cut_left + a,
              cut_left: a
            })
          },
          _setCutCenter: function() {
            var t = .5 * (this.data.info.windowHeight - this.data.height),
              a = .5 * (this.data.info.windowWidth - this.data.width);
            this.setData({
              cut_top: t,
              cut_left: a
            })
          },
          setWidth: function(t) {
            this.setData({
              width: t
            }), this._computeCutSize()
          },
          setHeight: function(t) {
            this.setData({
              height: t
            }), this._computeCutSize()
          },
          setDisableRotate: function(t) {
            this.data.disable_rotate = t
          },
          setLimitMove: function(t) {
            this.setData({
              _cut_animation: !0,
              limit_move: !!t
            })
          },
          imgReset: function() {
            this.setData({
              scale: 1,
              angle: 0,
              _img_top: Object(h.b)().windowHeight / 2,
              _img_left: Object(h.b)().windowWidth / 2
            })
          },
          pushImg: function(t) {
            var a = this;
            t = t || this.data.imgSrc, s.a.getImageInfo({
              src: t,
              success: function(t) {
                a.setData({
                  imageObject: t
                }, (function() {
                  a._imgComputeSize(), a.data.limit_move && a._imgMarginDetectionScale(), a._draw()
                }))
              },
              fail: function(t) {}
            })
          },
          imageLoad: function(t) {
            var a = this;
            setTimeout((function() {
              a.triggerEvent("imageload", a.data.imageObject)
            }), 1e3)
          },
          setScale: function(t) {
            t && (this.setData({
              scale: t
            }), this.data._canvas_overflow || this._draw())
          },
          setAngle: function(t) {
            t && (this.setData({
              _cut_animation: !0,
              angle: t
            }), this._imgMarginDetectionScale(), this.data._canvas_overflow || this._draw())
          },
          _initCanvas: function() {
            this.ctx || (this.ctx = s.a.createCanvasContext("image-cropper", this.$scope))
          },
          _initImageSize: function() {
            var t;
            this.data.INIT_IMGWIDTH && "string" == typeof this.data.INIT_IMGWIDTH && -1 != this.data.INIT_IMGWIDTH.indexOf("%") && (t = this.data.INIT_IMGWIDTH.replace("%", ""), this.data.INIT_IMGWIDTH = this.data.img_width = this.data.info.windowWidth / 100 * t), this.data.INIT_IMGHEIGHT && "string" == typeof this.data.INIT_IMGHEIGHT && -1 != this.data.INIT_IMGHEIGHT.indexOf("%") && (t = this.data.img_height.replace("%", ""), this.data.INIT_IMGHEIGHT = this.data.img_height = this.data.info.windowHeight / 100 * t)
          },
          _cutDetectionPosition: function() {
            var t = this,
              a = function() {
                t.data.cut_top < 0 && t.setData({
                  cut_top: 0
                }), t.data.cut_top > t.data.info.windowHeight - t.data.height && t.setData({
                  cut_top: t.data.info.windowHeight - t.data.height
                })
              },
              i = function() {
                t.data.cut_left < 0 && t.setData({
                  cut_left: 0
                }), t.data.cut_left > t.data.info.windowWidth - t.data.width && t.setData({
                  cut_left: t.data.info.windowWidth - t.data.width
                })
              };
            null == this.data.cut_top && null == this.data.cut_left ? this._setCutCenter() : null != this.data.cut_top && null != this.data.cut_left ? (a(), i()) : null != this.data.cut_top && null == this.data.cut_left ? (a(), this.setData({
              cut_left: (this.data.info.windowWidth - this.data.width) / 2
            })) : null == this.data.cut_top && null != this.data.cut_left && (i(), this.setData({
              cut_top: (this.data.info.windowHeight - this.data.height) / 2
            }))
          },
          _canvasDetectionPosition: function() {
            null == this.data.canvas_top && null == this.data.canvas_left ? (this.data._canvas_overflow = !1, this.setData({
              canvas_top: -5e3,
              canvas_left: -5e3
            })) : null != this.data.canvas_top && null != this.data.canvas_left ? this.data.canvas_top < -this.data.height || this.data.canvas_top > this.data.info.windowHeight ? this.data._canvas_overflow = !0 : this.data._canvas_overflow = !1 : null != this.data.canvas_top && null == this.data.canvas_left ? this.setData({
              canvas_left: 0
            }) : null == this.data.canvas_top && null != this.data.canvas_left && (this.setData({
              canvas_top: 0
            }), this.data.canvas_left < -this.data.width || this.data.canvas_left > this.data.info.windowWidth ? this.data._canvas_overflow = !0 : this.data._canvas_overflow = !1)
          },
          _imgMarginDetectionPosition: function(t) {
            var a, i, e, h;
            this.data.limit_move && (a = this.data._img_left, i = this.data._img_top, t = t || this.data.scale, e = this.data.img_width, h = this.data.img_height, this.data.angle / 90 % 2 && (e = this.data.img_height, h = this.data.img_width), a = this.data.cut_left + e * t / 2 >= a ? a : this.data.cut_left + e * t / 2, a = this.data.cut_left + this.data.width - e * t / 2 <= a ? a : this.data.cut_left + this.data.width - e * t / 2, i = this.data.cut_top + h * t / 2 >= i ? i : this.data.cut_top + h * t / 2, i = this.data.cut_top + this.data.height - h * t / 2 <= i ? i : this.data.cut_top + this.data.height - h * t / 2, this.setData({
              _img_left: a,
              _img_top: i,
              scale: t
            }))
          },
          _imgMarginDetectionScale: function() {
            var t, a, i;
            this.data.limit_move && (t = this.data.scale, a = this.data.img_width, i = this.data.img_height, this.data.angle / 90 % 2 && (a = this.data.img_height, i = this.data.img_width), i * (t = a * t < this.data.width ? this.data.width / a : t) < this.data.height && (t = Math.max(t, this.data.height / i)), this._imgMarginDetectionPosition(t))
          },
          _setData: function(t) {
            var a, i = {};
            for (a in t) this.data[a] != t[a] && (i[a] = t[a]);
            return this.setData(i), i
          },
          _imgComputeSize: function() {
            var t = this.data.img_width,
              a = this.data.img_height;
            this.data.INIT_IMGHEIGHT || this.data.INIT_IMGWIDTH ? this.data.INIT_IMGHEIGHT && !this.data.INIT_IMGWIDTH ? t = this.data.imageObject.width / this.data.imageObject.height * this.data.INIT_IMGHEIGHT : !this.data.INIT_IMGHEIGHT && this.data.INIT_IMGWIDTH && (a = this.data.imageObject.height / this.data.imageObject.width * this.data.INIT_IMGWIDTH) : (t = this.data.imageObject.width) / (a = this.data.imageObject.height) > this.data.width / this.data.height ? (a = this.data.height, t = this.data.imageObject.width / this.data.imageObject.height * a) : (t = this.data.width, a = this.data.imageObject.height / this.data.imageObject.width * t), this.setData({
              img_width: t,
              img_height: a
            })
          },
          _computeCutSize: function() {
            this.data.width > this.data.info.windowWidth ? this.setData({
              width: this.data.info.windowWidth
            }) : this.data.width + this.data.cut_left > this.data.info.windowWidth && this.setData({
              cut_left: this.data.info.windowWidth - this.data.cut_left
            }), this.data.height > this.data.info.windowHeight ? this.setData({
              height: this.data.info.windowHeight
            }) : this.data.height + this.data.cut_top > this.data.info.windowHeight && this.setData({
              cut_top: this.data.info.windowHeight - this.data.cut_top
            }), this.data._canvas_overflow || this._draw()
          },
          _start: function(t) {
            var a, i;
            this.setData({
              _flag_img_endtouch: !1
            }), 1 == t.touches.length ? this.setData({
              _touch_img_relative: [{
                x: t.touches[0].clientX - this.data._img_left,
                y: t.touches[0].clientY - this.data._img_top
              }]
            }) : 2 == t.touches.length && (a = Math.abs(t.touches[0].clientX - t.touches[1].clientX), i = Math.abs(t.touches[0].clientY - t.touches[1].clientY), this.setData({
              _touch_img_relative: [{
                x: t.touches[0].clientX - this.data._img_left,
                y: t.touches[0].clientY - this.data._img_top
              }, {
                x: t.touches[1].clientX - this.data._img_left,
                y: t.touches[1].clientY - this.data._img_top
              }],
              _hypotenuse_length: Math.sqrt(Math.pow(a, 2) + Math.pow(i, 2))
            })), this.data._canvas_overflow || this._draw()
          },
          _move_throttle: function() {
            var t = this;
            if ("android" == this.data.info.platform) return clearTimeout(this.data.MOVE_THROTTLE), this.data.MOVE_THROTTLE = setTimeout((function() {
              t.data.MOVE_THROTTLE_FLAG = !0
            }), 25), this.data.MOVE_THROTTLE_FLAG;
            this.data.MOVE_THROTTLE_FLAG = !0
          },
          _move: function(t) {
            var a, i, e, h, s, _ = this;
            this.data._flag_img_endtouch || !this.data.MOVE_THROTTLE_FLAG || (this.data.MOVE_THROTTLE_FLAG = !1, this._move_throttle(), this._moveDuring(), 1 == t.touches.length ? (a = t.touches[0].clientX - this.data._touch_img_relative[0].x, i = t.touches[0].clientY - this.data._touch_img_relative[0].y, this.setData({
              _img_left: a,
              _img_top: i
            }, (function() {
              _._imgMarginDetectionPosition()
            }))) : 2 == t.touches.length && (a = Math.abs(t.touches[0].clientX - t.touches[1].clientX), i = Math.abs(t.touches[0].clientY - t.touches[1].clientY), h = Math.sqrt(Math.pow(a, 2) + Math.pow(i, 2)), e = 0, h = (h = (h = this.data.scale * (h / this.data._hypotenuse_length)) <= this.data.min_scale ? this.data.min_scale : h) >= this.data.max_scale ? this.data.max_scale : h, this.setData({
              scale: h
            }, (function() {
              _._imgMarginDetectionScale()
            })), h = [{
              x: t.touches[0].clientX - this.data._img_left || 0,
              y: t.touches[0].clientY - this.data._img_top || 0
            }, {
              x: t.touches[1].clientX - this.data._img_left || 0,
              y: t.touches[1].clientY - this.data._img_top || 0
            }], this.data.disable_rotate || (s = (t = 180) / Math.PI * Math.atan2(h[0].y, h[0].x) - 180 / Math.PI * Math.atan2(this.data._touch_img_relative[0].y, this.data._touch_img_relative[0].x), t = 180 / Math.PI * Math.atan2(h[1].y, h[1].x) - (t = this.data._touch_img_relative[1] && this.data._touch_img_relative[1].y ? 180 / Math.PI * Math.atan2(this.data._touch_img_relative[1].y, this.data._touch_img_relative[1].x) : t), 0 != s ? e = s : 0 != t && (e = t)), this.setData({
              _touch_img_relative: h,
              _hypotenuse_length: Math.sqrt(Math.pow(a, 2) + Math.pow(i, 2)),
              angle: this.data.angle + e,
              scale: this.data.scale
            })), this.data._canvas_overflow) || this._draw()
          },
          _end: function(t) {
            var a = this;
            this.setData({
              _flag_img_endtouch: !0
            }, (function() {
              a._moveStop()
            }))
          },
          _click: function(t) {
            var a = this;
            this.data.imgSrc ? t.touches.length && this._draw((function() {
              var i = t.detail ? t.detail.x : t.touches[0].clientX,
                e = t.detail ? t.detail.y : t.touches[0].clientY;
              i >= a.data.cut_left && i <= a.data.cut_left + a.data.width && e >= a.data.cut_top && e <= a.data.cut_top + a.data.height && s.a.canvasToTempFilePath({
                width: a.data.width * a.data.export_scale,
                height: Math.round(a.data.height * a.data.export_scale),
                destWidth: a.data.width * a.data.export_scale,
                destHeight: Math.round(a.data.height) * a.data.export_scale,
                fileType: "png",
                quality: a.data.quality,
                canvasId: a.data.el,
                success: function(t) {
                  a.triggerEvent("tapcut", {
                    url: t.tempFilePath,
                    width: a.data.width * a.data.export_scale,
                    height: a.data.height * a.data.export_scale
                  })
                }
              }, a.$scope)
            })) : this.upload()
          },
          _draw: function(t) {
            var a, i = this;
            this.data.imgSrc && (a = function() {
              var a = i.data.img_width * i.data.scale * i.data.export_scale,
                e = i.data.img_height * i.data.scale * i.data.export_scale,
                h = i.data._img_left - i.data.cut_left,
                s = i.data._img_top - i.data.cut_top;
              i.ctx.translate(h * i.data.export_scale, s * i.data.export_scale), i.ctx.rotate(i.data.angle * Math.PI / 180), i.ctx.drawImage(i.data.imgSrc, -a / 2, -e / 2, a, e), i.ctx.draw(!1, (function() {
                t && t()
              }))
            }, this.ctx.width != this.data.width || this.ctx.height != this.data.height ? this.setData({
              _canvas_height: this.data.height,
              _canvas_width: this.data.width
            }, (function() {
              setTimeout((function() {
                a()
              }), 40)
            })) : a())
          },
          _cutTouchMove: function(t) {
            var a = this;
            if (this.data._flag_cut_touch && this.data.MOVE_THROTTLE_FLAG && (!this.data.disable_ratio || !this.data.disable_width && !this.data.disable_height)) {
              this.data.MOVE_THROTTLE_FLAG = !1, this._move_throttle();
              var i = this.data.width,
                e = this.data.height,
                h = this.data.cut_top,
                s = this.data.cut_left,
                _ = function() {
                  i = i <= a.data.max_width ? i >= a.data.min_width ? i : a.data.min_width : a.data.max_width, e = e <= a.data.max_height ? e >= a.data.min_height ? e : a.data.min_height : a.data.max_height
                },
                d = function() {
                  return (i > a.data.max_width || i < a.data.min_width || e > a.data.max_height || e < a.data.min_height) && a.data.disable_ratio ? (_(), !1) : (_(), !0)
                };
              e = this.data.CUT_START.height + (1 < this.data.CUT_START.corner && this.data.CUT_START.corner < 4 ? 1 : -1) * (this.data.CUT_START.y - t.touches[0].clientY);
              switch (this.data.CUT_START.corner) {
                case 1:
                  if (i = this.data.CUT_START.width + this.data.CUT_START.x - t.touches[0].clientX, this.data.disable_ratio && (e = i / (this.data.width / this.data.height)), !d()) return;
                  s = this.data.CUT_START.cut_left - (i - this.data.CUT_START.width);
                  break;
                case 2:
                  if (i = this.data.CUT_START.width + this.data.CUT_START.x - t.touches[0].clientX, this.data.disable_ratio && (e = i / (this.data.width / this.data.height)), !d()) return;
                  h = this.data.CUT_START.cut_top - (e - this.data.CUT_START.height), s = this.data.CUT_START.cut_left - (i - this.data.CUT_START.width);
                  break;
                case 3:
                  if (i = this.data.CUT_START.width - this.data.CUT_START.x + t.touches[0].clientX, this.data.disable_ratio && (e = i / (this.data.width / this.data.height)), !d()) return;
                  h = this.data.CUT_START.cut_top - (e - this.data.CUT_START.height);
                  break;
                case 4:
                  if (i = this.data.CUT_START.width - this.data.CUT_START.x + t.touches[0].clientX, this.data.disable_ratio && (e = i / (this.data.width / this.data.height)), d()) break;
                  return
              }
              this.data.disable_width || this.data.disable_height ? this.data.disable_width ? this.data.disable_height || this.setData({
                height: e,
                cut_top: h
              }) : this.setData({
                width: i,
                cut_left: s
              }) : this.setData({
                width: i,
                cut_left: s,
                height: e,
                cut_top: h
              }), this._imgMarginDetectionScale()
            }
          },
          _cutTouchStart: function(t) {
            var a, i, e, h, s, _, d, o, n, c, u, l, g, r, m, f, p;
            0 < t.touches.length && (a = t.touches[0].clientX, t = t.touches[0].clientY, i = this.data.cut_top + this.data.height - 30, e = this.data.cut_top + this.data.height + 20, h = this.data.cut_left + this.data.width - 30, s = this.data.cut_left + this.data.width + 30, _ = this.data.cut_top - 30, d = this.data.cut_top + 30, o = this.data.cut_left + this.data.width - 30, n = this.data.cut_left + this.data.width + 30, c = this.data.cut_top - 30, u = this.data.cut_top + 30, l = this.data.cut_left - 30, g = this.data.cut_left + 30, r = this.data.cut_top + this.data.height - 30, m = this.data.cut_top + this.data.height + 30, f = this.data.cut_left - 30, p = this.data.cut_left + 30, h < a && a < s && i < t && t < e ? (this._moveDuring(), this.data._flag_cut_touch = !0, this.data._flag_img_endtouch = !0, this.data.CUT_START = {
              width: this.data.width,
              height: this.data.height,
              x: a,
              y: t,
              corner: 4
            }) : o < a && a < n && _ < t && t < d ? (this._moveDuring(), this.data._flag_cut_touch = !0, this.data._flag_img_endtouch = !0, this.data.CUT_START = {
              width: this.data.width,
              height: this.data.height,
              x: a,
              y: t,
              cut_top: this.data.cut_top,
              cut_left: this.data.cut_left,
              corner: 3
            }) : l < a && a < g && c < t && t < u ? (this._moveDuring(), this.data._flag_cut_touch = !0, this.data._flag_img_endtouch = !0, this.data.CUT_START = {
              width: this.data.width,
              height: this.data.height,
              cut_top: this.data.cut_top,
              cut_left: this.data.cut_left,
              x: a,
              y: t,
              corner: 2
            }) : f < a && a < p && r < t && t < m && (this._moveDuring(), this.data._flag_cut_touch = !0, this.data._flag_img_endtouch = !0, this.data.CUT_START = {
              width: this.data.width,
              height: this.data.height,
              cut_top: this.data.cut_top,
              cut_left: this.data.cut_left,
              x: a,
              y: t,
              corner: 1
            }))
          },
          _cutTouchEnd: function(t) {
            this._moveStop(), this.data._flag_cut_touch = !1
          },
          _moveStop: function() {
            var t = this;
            clearTimeout(this.data.TIME_CUT_CENTER), this.data.TIME_CUT_CENTER = setTimeout((function() {
              t.data._cut_animation || t.setData({
                _cut_animation: !0
              }), t.setCutCenter()
            }), 1e3), clearTimeout(this.data.TIME_BG), this.data.TIME_BG = setTimeout((function() {
              t.data._flag_bright && t.setData({
                _flag_bright: !1
              })
            }), 2e3)
          },
          _moveDuring: function() {
            clearTimeout(this.data.TIME_CUT_CENTER), clearTimeout(this.data.TIME_BG), this.data._flag_bright || this.setData({
              _flag_bright: !0
            })
          },
          _watcher: function() {
            var t = this;
            Object.keys(this.data).forEach((function(a) {
              t._observe(t.data, a, t.data.watch[a])
            }))
          },
          _observe: function(t, a, i) {
            var e = this,
              h = t[a];
            Object.defineProperty(t, a, {
              configurable: !0,
              enumerable: !0,
              set: function(t) {
                h = t, i && i(h, e)
              },
              get: function() {
                var t;
                return h && -1 != "_img_top|img_left||width|height|min_width|max_width|min_height|max_height|export_scale|cut_top|cut_left|canvas_top|canvas_left|img_width|img_height|scale|angle|min_scale|max_scale".indexOf(a) ? (t = parseFloat(parseFloat(h).toFixed(3)), "string" == typeof h && -1 != h.indexOf("%") && (t += "%"), t) : h
              }
            })
          },
          _preventTouchMove: function() {}
        }
      })((function(a, i) {
        if ("function" != typeof i && null !== i) throw new TypeError("Super expression must either be null or a function, not " + t(i));
        a.prototype = Object.create(i && i.prototype, {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), i && (Object.setPrototypeOf ? Object.setPrototypeOf(a, i) : a.__proto__ = i)
      }(c, s.a.Component), _(c, [{
        key: "_constructor",
        value: function(t) {
          o(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "_constructor", this).call(this, t), this.$$refs = new s.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix;
          var t = (p = this.data)._flag_bright,
            a = p.cut_top,
            i = p._cut_animation,
            e = p.height,
            h = p.cut_left,
            s = p.width,
            _ = p.img_width,
            d = p.img_height,
            o = p._img_left,
            n = p._img_top,
            c = p.scale,
            u = p.angle,
            l = p.imgSrc,
            g = p._canvas_width,
            r = p.export_scale,
            m = p._canvas_height,
            f = p.canvas_left,
            p = p.canvas_top;
          return Object.assign(this.__state, {
            _flag_bright: t,
            cut_top: a,
            _cut_animation: i,
            height: e,
            cut_left: h,
            width: s,
            img_width: _,
            img_height: d,
            _img_left: o,
            _img_top: n,
            scale: c,
            angle: u,
            imgSrc: l,
            _canvas_width: g,
            export_scale: r,
            _canvas_height: m,
            canvas_left: f,
            canvas_top: p
          }), this.__state
        }
      }]), _ = i = c, i.$$events = ["_preventTouchMove", "_cutTouchEnd", "_cutTouchStart", "_cutTouchMove", "imageLoad", "_start", "_move", "_end"], i.$$componentPath = "components/image-cropper/image-cropper", i = _)) || i, Component(e(0).default.createComponent(_))
    },
    630: function(t, a, i) {
      t.exports = i.p + "components/image-cropper/image-cropper.wxml"
    }
  },
  [
    [3448, 0, 2, 1, 3]
  ]
]);