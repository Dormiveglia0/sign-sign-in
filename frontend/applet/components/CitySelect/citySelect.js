var t = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [14], {
    2045: function(t, e, n) {
      n(577)
    },
    2046: function(t, e, n) {},
    3396: function(e, n, r) {
      r.r(n), r(2045);
      var a = r(0),
        i = r.n(a),
        o = (n = r(4), n = r.n(n), r(1)),
        s = (r(2046), function(t, e) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return function(t, e) {
            var n = [],
              r = !0,
              a = !1,
              i = void 0;
            try {
              for (var o, s = t[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !e || n.length !== e); r = !0);
            } catch (t) {
              a = !0, i = t
            } finally {
              try {
                !r && s.return && s.return()
              } finally {
                if (a) throw i
              }
            }
            return n
          }(t, e);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }),
        c = function(t, e, n) {
          return e && d(t.prototype, e), n && d(t, n), t
        };

      function d(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
      }

      function u(e, n) {
        if (e) return !n || "object" != t(n) && "function" != typeof n ? e : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }
      var l = i.a.getApp();
      c = n()({
        options: {
          multipleSlots: !0,
          addGlobalClass: !0
        },
        properties: {
          title: {
            type: String,
            value: "标题"
          },
          isShow: {
            type: Boolean,
            value: !1,
            observer: function(t, e, n) {}
          },
          cityArray: {
            type: Array,
            value: [{
              name: "选项一",
              id: 1
            }, {
              name: "选项二",
              id: 2
            }]
          },
          maxLength: {
            type: Number,
            value: 10
          },
          needAll: {
            type: Boolean,
            value: !0
          }
        },
        data: {
          firstArr: [],
          firstId: "",
          secondArr: [],
          resultArr: [],
          contentHeight: "",
          height: "",
          ifIphoneX: !1,
          loading: !1
        },
        observers: {
          isShow: function(t) {
            var e;
            t && (1 == (e = this).data.cityArray.length && "全国" == this.data.cityArray[0].name || 0 == this.data.cityArray.length || this.setData({
              resultArr: JSON.parse(JSON.stringify(this.data.cityArray))
            }), setTimeout((function() {
              e.getHeight()
            }), 1e3))
          }
        },
        ready: function() {
          this.getProvinceData(), this.setData({
            ifIphoneX: l.globalData.isIphoneX
          })
        },
        methods: {
          onClose: function() {
            this.triggerEvent("close", {
              bubbles: !1
            })
          },
          onCloseEvent: function() {
            i.a.eventCenter.trigger("taroClick", {
              funName: "城市选择组件-关闭"
            }), this.onClose()
          },
          getProvinceData: function() {
            var t = this;
            o.a.xyb_request("common/loadLocation!getProvince.action", "POST", {}, !1, !1).then((function(e) {
              e = e.data || [], t.setData({
                firstArr: e
              })
            }), (function(t) {}))
          },
          getHeight: function() {
            var t = i.a.createSelectorQuery().in(this.$scope),
              e = this;
            t.select(".actionradio_warp").boundingClientRect((function(t) {
              e.setData({
                contentHeight: t.height || 0
              })
            })).exec(), t.select(".footer").boundingClientRect((function(t) {
              t = e.data.contentHeight - (t.height || 0) - 40, e.setData({
                height: t
              })
            })).exec()
          },
          selectFirst: function(t) {
            var e = this,
              n = (i.a.eventCenter.trigger("taroClick", {
                funName: "城市选择组件-选择第一级"
              }), this),
              r = (this.setData({
                firstId: t.currentTarget.dataset.item.id
              }), t.currentTarget.dataset.item); - 1 === (t = (this.data.resultArr, this.data.firstId)) ? this.getLocation() : (this.setData({
              loading: !0
            }), o.a.xyb_request("/common/loadLocation!getCity.action", "POST", {
              id: t
            }, !1, !1).then((function(t) {
              var a = t.data || [];
              e.data.needAll && ("全国" == r.name ? a.unshift({
                name: "全国",
                id: e.data.firstId
              }) : "北京市" != r.name && "天津市" != r.name && "上海市" != r.name && "重庆市" != r.name && a.unshift({
                name: r.name,
                nameHtml: "全" + r.name,
                id: e.data.firstId
              }));
              for (var i = 0; i < a.length; i++) a[i].checked = !1, a[i].parentId = n.data.firstId;
              for (var o = n.data.resultArr, s = function(t) {
                  var e = a.findIndex((function(e, n, r) {
                    return e.id == o[t].id
                  })); - 1 != e && (a[e].checked = !0)
                }, c = 0; c < o.length; c++) s(c);
              n.setData({
                secondArr: a,
                loading: !1
              })
            }), (function(t) {
              e.setData({
                loading: !1
              })
            })))
          },
          selectChange: function(t) {
            var e, n, r = this,
              a = (i.a.eventCenter.trigger("taroClick", {
                funName: "城市选择组件-选择第二级"
              }), Number(t.currentTarget.id)),
              o = (t = t.currentTarget).dataset.value,
              s = this.data.resultArr;
            if ("全国" == o.name ? -1 == s.findIndex((function(t, e, n) {
                return t.name == o.name
              })) ? (s = [{
                name: "全国",
                id: null
              }], r.setData({
                resultArr: s,
                firstId: null
              })) : (s.splice(0, 1), this.setData({
                resultArr: s,
                firstId: ""
              })) : s && s[0] && "全国" == s[0].name && (s.splice(0, 1), this.setData({
                resultArr: s
              })), t.dataset.checked) o.id == o.parentId ? (t = s.findIndex((function(t, e, n) {
              return t.id == o.id
            })), this.data.secondArr.findIndex((function(t, e, n) {
              return t.id == o.id
            })), -1 != t && s.splice(t, 1), this.data.secondArr.forEach((function(t, e) {
              t.checked = !1
            }))) : (e = 10 - s.length, n = [], this.data.secondArr[0].checked && this.data.secondArr.length > 10 - s.length - 1 && i.a.showToast({
              title: "省市数量不要超过10个哦",
              icon: "none"
            }), t = s.findIndex((function(t, e, n) {
              return t.id == o.id
            })), s.splice(t, 1), this.data.secondArr.forEach((function(t, i) {
              r.data.secondArr[0].checked && 0 != i && i != a && 0 <= e && (n.push(t), --e)
            })), n.forEach((function(t, e) {
              s.push(t)
            })), r.data.secondArr[0].checked = !1, r.data.secondArr[a].checked = !1, s.forEach((function(t, e) {
              r.data.secondArr.forEach((function(e, n) {
                e.id == t.id && (e.checked = !0)
              }))
            })));
            else {
              if (s.length >= (this.data.maxLength || 10) && !this.data.secondArr[a].checked && o.id != o.parentId) return i.a.showToast({
                title: "省市数量不要超过" + (this.data.maxLength || 10) + "个哦",
                icon: "none"
              }), !1;
              this.data.secondArr[a].checked = !0;
              var c, d = [];
              this.data.secondArr.forEach((function(t, e) {
                "全国" != t.name && "北京市" != t.name && "天津市" != t.name && "上海市" != t.name && "重庆市" != t.name && t.checked && 0 != e && d.push(t)
              })), o.id == o.parentId || d.length == this.data.secondArr.length - 1 ? (c = [], s.forEach((function(t, e) {
                t.parentId == r.data.secondArr[0].id && c.push(t)
              })), c.forEach((function(t) {
                s.forEach((function(e, n) {
                  t.name == e.name && s.splice(n)
                }))
              })), this.data.secondArr.forEach((function(t) {
                t.checked = !0
              })), s.push(this.data.secondArr[0])) : s.push(o)
            }
            this.setData({
              secondArr: this.data.secondArr,
              resultArr: s
            }), setTimeout((function() {
              r.getHeight()
            }), 500)
          },
          deleteResult: function(t) {
            i.a.eventCenter.trigger("taroClick", {
              funName: "城市选择组件-删除已选中"
            });
            var e = t.currentTarget.dataset.index,
              n = t.currentTarget.dataset.id,
              r = (t = t.currentTarget.dataset.name, e = (this.data.resultArr.splice(e, 1), this.data.secondArr.findIndex((function(t, e, r) {
                return t.id == n
              }))), this.data.secondArr),
              a = (-1 != e && (r[e].checked = !1), this.data.secondArr.forEach((function(t, e) {
                n == t.parentId && (t.checked = !1)
              })), this.setData({
                resultArr: this.data.resultArr,
                secondArr: r
              }), "全国" == t && this.setData({
                firstId: ""
              }), this);
            setTimeout((function() {
              a.getHeight()
            }), 500)
          },
          resetResult: function() {
            i.a.eventCenter.trigger("taroClick", {
              funName: "城市选择组件-重置"
            });
            for (var t = this.data.secondArr, e = 0; e < t.length; e++) t[e].checked = !1;
            this.setData({
              resultArr: [],
              secondArr: t
            });
            var n = this;
            setTimeout((function() {
              n.getHeight()
            }), 500)
          },
          sureSelect: function() {
            var t = this.data.resultArr;
            i.a.eventCenter.trigger("taroClick", {
              funName: "城市选择组件-确认",
              itemId: t.map((function(t) {
                return t.id
              })).join(",")
            }), this.triggerEvent("receive", t, {
              bubbles: !1
            }), this.onClose()
          },
          getLocation: function() {
            var t = this;
            this.setData({
              loading: !0
            }), i.a.getLocation({
              type: "wgs84",
              success: function(e) {
                var n = e.longitude.toFixed(6);
                e = e.latitude.toFixed(6);
                o.a.xyb_request("/common/tencentGeocoderLocation.action", "POST", {
                  location: e + "," + n
                }).then((function(e) {
                  0 === e.data.status ? (e = e.data.result.address_component.city || "全国", t.getCityId(e)) : t.setData({
                    loading: !1
                  })
                }), (function(e) {
                  t.setData({
                    loading: !1
                  })
                }))
              },
              fail: function(e) {
                "getLocation:fail auth deny" === e.errMsg && i.a.showModal({
                  title: "提示",
                  content: "获取定位失败，请打开微信定位功能",
                  confirmText: "去打开",
                  success: function(t) {
                    t.confirm && i.a.openSetting()
                  }
                }), t.setData({
                  loading: !1
                })
              }
            })
          },
          getCityId: function(t) {
            var e = this;
            o.a.xyb_request("common/loadLocation!getCityId.action", "POST", {
              cityName: t,
              selfFlag: 1
            }, !1, !1).then((function(n) {
              var r = {
                checked: e.data.resultArr.some((function(t) {
                  return t.id === n.data
                })),
                id: n.data,
                name: t
              };
              e.setData({
                secondArr: [r],
                loading: !1
              })
            }), (function(t) {
              e.setData({
                loading: !1
              })
            }))
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
      }(h, i.a.Component), c(h, [{
        key: "_constructor",
        value: function(t) {
          (function t(e, n, r) {
            null === e && (e = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(e, n);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(r) : void 0 : null !== (a = Object.getPrototypeOf(e)) ? t(a, n, r) : void 0
          })(h.prototype.__proto__ || Object.getPrototypeOf(h.prototype), "_constructor", this).call(this, t), this.$$refs = new i.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var t = this,
            e = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix),
            n = this.onClose,
            r = (e = Object(a.genCompid)(e + "$compid__2787"), (e = s(e, 2))[0]),
            i = (e = e[1], (p = this.data).isShow),
            o = p.title,
            c = p.height,
            d = p.firstId,
            u = p.firstArr,
            l = p.secondArr,
            h = p.ifIphoneX,
            f = p.resultArr,
            p = p.loading;
          return this.anonymousFunc0 = function(e) {
            e.stopPropagation(), t.onCloseEvent(e)
          }, p && a.propsManager.set({
            mode: "center",
            color: "#ff453a",
            size: 26,
            content: "加载中..."
          }, e, r), Object.assign(this.__state, {
            anonymousState__temp: {
              id: -1
            },
            $compid__2787: e,
            isShow: i,
            onClose: n,
            height: c,
            firstId: d,
            firstArr: u,
            loading: p,
            secondArr: l,
            ifIphoneX: h,
            resultArr: f,
            title: o
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(t) {
          t.stopPropagation()
        }
      }]), c = n = h, n.$$events = ["onClose", "anonymousFunc0", "selectFirst", "selectChange", "deleteResult", "resetResult", "sureSelect"], n.options = {
        addGlobalClass: !0
      }, n.$$componentPath = "components/CitySelect/citySelect", n = c)) || n;

      function h() {
        var t, e;
        ! function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, h);
        for (var n = arguments.length, r = Array(n), a = 0; a < n; a++) r[a] = arguments[a];
        return (t = e = u(this, (e = h.__proto__ || Object.getPrototypeOf(h)).call.apply(e, [this].concat(r)))).$usedState = ["anonymousState__temp", "$compid__2787", "isShow", "onClose", "height", "firstId", "firstArr", "loading", "secondArr", "ifIphoneX", "resultArr", "title"], e.config = {
          component: !0,
          usingComponents: {
            "van-popup": "../../vant-weapp/dist/popup/index"
          }
        }, e.customComponents = ["AtActivityIndicator"], u(e, t)
      }
      Component(r(0).default.createComponent(c))
    },
    577: function(t, e, n) {
      t.exports = n.p + "components/CitySelect/citySelect.wxml"
    }
  },
  [
    [3396, 0, 2, 1, 3]
  ]
]);