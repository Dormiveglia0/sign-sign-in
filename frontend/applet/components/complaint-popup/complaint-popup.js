var e = require("../../@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [52], {
    1969: function(e, t, n) {
      n(545)
    },
    1970: function(e, t, n) {},
    3364: function(t, n, o) {
      o.r(n), o(1969);
      n = o(0);
      var a = o.n(n),
        i = (n = o(4), n = o.n(n), o(1)),
        s = (o(1970), function(e, t, n) {
          return t && c(e.prototype, t), n && c(e, n), e
        });

      function c(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
      }

      function r(t, n) {
        if (t) return !n || "object" != e(n) && "function" != typeof n ? t : n;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function u() {
        var e, t;
        ! function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, u);
        for (var n = arguments.length, o = Array(n), a = 0; a < n; a++) o[a] = arguments[a];
        return (e = t = r(this, (t = u.__proto__ || Object.getPrototypeOf(u)).call.apply(t, [this].concat(o)))).$usedState = ["isShow", "onClose", "loadSuccess", "labTabList", "showReason", "reasonTabList", "contentLength", "maxWordNum", "allowSubmit", "loadText"], t.config = {
          component: !0,
          usingComponents: {
            "van-popup": "../../vant-weapp/dist/popup/index"
          }
        }, t.customComponents = [], r(t, e)
      }
      s = n()({
        properties: {
          isShow: {
            type: Boolean,
            value: ""
          },
          reportId: {
            type: String,
            value: ""
          },
          type: {
            type: Number,
            value: ""
          }
        },
        data: {
          loadSuccess: !0,
          labTabList: [{
            id: 1,
            name: "垃圾营销",
            checked: !1,
            list: [{
              id: 0,
              name: "广告信息",
              checked: !1
            }, {
              id: 1,
              name: "虚假广告",
              checked: !1
            }, {
              id: 2,
              name: "其他广告",
              checked: !1
            }]
          }, {
            id: 2,
            name: "有害信息",
            checked: !1,
            list: [{
              id: 3,
              name: "暴恐血腥",
              checked: !1
            }, {
              id: 4,
              name: "宗教民族问题",
              checked: !1
            }, {
              id: 5,
              name: "侮辱英烈",
              checked: !1
            }, {
              id: 6,
              name: "其他有害信息",
              checked: !1
            }]
          }, {
            id: 3,
            name: "违法信息",
            checked: !1,
            list: [{
              id: 7,
              name: "涉枪爆刀",
              checked: !1
            }, {
              id: 8,
              name: "赌博",
              checked: !1
            }, {
              id: 9,
              name: "毒品",
              checked: !1
            }, {
              id: 10,
              name: "假证",
              checked: !1
            }, {
              id: 11,
              name: "其他违禁品",
              checked: !1
            }]
          }, {
            id: 4,
            name: "涉黄信息",
            checked: !1,
            list: [{
              id: 12,
              name: "低俗信息",
              checked: !1
            }, {
              id: 13,
              name: "招嫖信息",
              checked: !1
            }, {
              id: 14,
              name: "色情图文",
              checked: !1
            }, {
              id: 15,
              name: "侵害未成年人",
              checked: !1
            }, {
              id: 16,
              name: "售卖色情资源",
              checked: !1
            }]
          }, {
            id: 5,
            name: "侵犯权益",
            checked: !1,
            list: [{
              id: 17,
              name: "人身攻击",
              checked: !1
            }, {
              id: 18,
              name: "泄露隐私",
              checked: !1
            }, {
              id: 19,
              name: "侵犯肖像权",
              checked: !1
            }, {
              id: 20,
              name: "其他非法侵犯",
              checked: !1
            }]
          }],
          reasonTabList: [],
          showReason: !1,
          currentLab: {},
          currentReason: {},
          allowSubmit: !1,
          inputText: "",
          loadText: "正在加载...",
          contentLength: 0,
          maxWordNum: 200,
          editorCtx: null
        },
        lifetimes: {
          attached: function() {},
          detached: function() {},
          ready: function() {}
        },
        methods: {
          onClose: function() {
            this.triggerEvent("close", "", {
              bubbles: !1
            }), this.init()
          },
          hide: function() {
            this.triggerEvent("close", "", {
              bubbles: !1
            })
          },
          show: function(e, t) {
            var n;
            this.data.loadSuccess || (n = this, setTimeout((function() {
              n.setData({
                loadText: "加载失败，点击重试",
                loadSuccess: !1
              })
            }), 2e3)), this.setData({
              reportId: e,
              type: t,
              isShow: !this.data.isShow
            })
          },
          init: function() {
            for (var e = this.data.labTabList, t = 0; t < e.length; t++) {
              e[t].checked = !1;
              for (var n = e[t].list, o = 0; o < n.length; o++) n[o].checked = !1
            }
            this.setData({
              labTabList: e,
              reasonTabList: [],
              showReason: !1,
              currentLab: {},
              currentReason: {},
              allowSubmit: !1,
              inputText: ""
            })
          },
          labRadioChange: function(e) {
            var t = e.detail.value;
            if (null == this.data.currentLab || this.data.currentLab.id != t) {
              for (var n = this.data.labTabList, o = null, a = !1, i = null, s = 0; s < n.length; s++) t == n[s].id ? ((o = n[s]).checked = !0, i = o.list, a = !0) : n[s].checked = !1;
              if (null != i)
                for (var c = 0; c < i.length; c++) i[c].checked = !1;
              this.setData({
                labTabList: n,
                reasonTabList: o.list,
                currentLab: o,
                currentReason: null,
                showReason: a,
                allowSubmit: !1
              })
            }
          },
          reasonRadioChange: function(e) {
            var t = e.detail.value;
            if (null == this.data.currentReason || this.data.currentReason.id != t) {
              for (var n = this.data.reasonTabList, o = null, a = 0; a < n.length; a++) t == n[a].id ? (o = n[a], n[a].checked = !0) : n[a].checked = !1;
              this.setData({
                reasonTabList: n,
                currentReason: o,
                allowSubmit: !0
              })
            }
          },
          inputListener: function(e) {
            var t = (e = e.detail.text).length - 1;
            0 < t ? 200 < t ? a.a.createSelectorQuery().in(this.$scope).select("#editor").context((function(e) {
              (e.context || "").undo()
            })).exec() : this.setData({
              contentLength: t,
              inputText: e
            }) : this.setData({
              contentLength: t,
              inputText: ""
            })
          },
          sumit: function() {
            var e = this;
            this.data.allowSubmit && (200 < this.data.contentLength ? a.a.showToast({
              title: "输入文字不能大于200字",
              icon: "none"
            }) : i.a.xyb_request("common/Report.action", "POST", {
              reportId: this.data.reportId,
              type: this.data.type,
              reason: this.data.inputText,
              category: this.data.currentReason.id
            }, !0, !1).then((function(t) {
              a.a.showToast({
                title: "提交成功",
                icon: "none"
              }), e.hide(), e.init()
            }), (function(e) {})))
          },
          reLoadForError: function() {
            "加载失败，点击重试" == this.data.loadText && this.setData({
              loadText: "正在加载..."
            })
          },
          onEditorReady: function() {}
        }
      })((function(t, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + e(n));
        t.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(t, n) : t.__proto__ = n)
      }(u, a.a.Component), s(u, [{
        key: "_constructor",
        value: function(e) {
          (function e(t, n, o) {
            null === t && (t = Function.prototype);
            var a = Object.getOwnPropertyDescriptor(t, n);
            return void 0 !== a ? "value" in a ? a.value : void 0 !== (a = a.get) ? a.call(o) : void 0 : null !== (a = Object.getPrototypeOf(t)) ? e(a, n, o) : void 0
          })(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "_constructor", this).call(this, e), this.$$refs = new a.a.RefsArray
        }
      }, {
        key: "_createData",
        value: function() {
          var e = this,
            t = (this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {}, this.$prefix, this.onClose),
            n = (d = this.data).isShow,
            o = d.labTabList,
            i = d.reasonTabList,
            s = d.contentLength,
            c = d.maxWordNum,
            r = d.showReason,
            u = d.loadSuccess,
            l = d.loadText,
            d = d.allowSubmit;
          return this.anonymousFunc0 = function(t) {
            t.stopPropagation(), a.a.eventCenter.trigger("taroClick", {
              funName: "关闭投诉弹窗"
            }), e.onClose(t)
          }, this.anonymousFunc1 = function(t) {
            t.stopPropagation(), a.a.eventCenter.trigger("taroClick", {
              funName: "重试加载"
            }), e.reLoadForError(t)
          }, this.anonymousFunc2 = function(t) {
            t.stopPropagation(), a.a.eventCenter.trigger("taroClick", {
              funName: "提交投诉"
            }), e.sumit(t)
          }, Object.assign(this.__state, {
            isShow: n,
            onClose: t,
            loadSuccess: u,
            labTabList: o,
            showReason: r,
            reasonTabList: i,
            contentLength: s,
            maxWordNum: c,
            allowSubmit: d,
            loadText: l
          }), this.__state
        }
      }, {
        key: "anonymousFunc0",
        value: function(e) {
          e.stopPropagation()
        }
      }, {
        key: "anonymousFunc1",
        value: function(e) {
          e.stopPropagation()
        }
      }, {
        key: "anonymousFunc2",
        value: function(e) {
          e.stopPropagation()
        }
      }]), s = n = u, n.$$events = ["onClose", "anonymousFunc0", "labRadioChange", "reasonRadioChange", "inputListener", "anonymousFunc1", "anonymousFunc2"], n.$$componentPath = "components/complaint-popup/complaint-popup", n = s)) || n, Component(o(0).default.createComponent(s))
    },
    545: function(e, t, n) {
      e.exports = n.p + "components/complaint-popup/complaint-popup.wxml"
    }
  },
  [
    [3364, 0, 2, 1, 3]
  ]
]);