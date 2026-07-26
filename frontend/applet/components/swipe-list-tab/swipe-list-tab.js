(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [79], {
    1976: function(t, e, i) {
      i.r(e);
      var a = i(8);
      Component({
        properties: {
          scroll: {
            type: Boolean,
            value: !1
          },
          tabData: {
            type: Array,
            value: []
          },
          size: {
            type: Number,
            value: 90,
            observer: "sizeChange"
          },
          color: {
            type: String,
            value: "",
            observer: "colorChange"
          }
        },
        data: {
          needTransition: !1,
          translateX: 0,
          lineWidth: 48,
          tabCur: 0,
          scrollLeft: 0
        },
        methods: {
          toggleTab: function(t) {
            this.triggerEvent("change", {
              index: t.currentTarget.dataset.index
            }), this.scrollByIndex(t.currentTarget.dataset.index)
          },
          scrollByIndex: function(t) {
            var e = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1],
              i = (e = (this.setData({
                isScroll: !0
              }), this.setData({
                needTransition: e
              }), this.items[t])).width - 2 * this.itemPadding,
              a = e.left;
            this.data.scroll ? (e = a - (this.windowWidth - e.width) / 2, this.setData({
              tabCur: t,
              scrollLeft: e,
              translateX: a + this.itemPadding + (i - this.data.lineWidth) / 2
            })) : this.setData({
              tabCur: t,
              translateX: a + this.itemPadding + (i - this.data.lineWidth) / 2
            })
          },
          sizeChange: function(t, e) {
            t <= 80 && this.setData({
              size: 80
            })
          },
          colorChange: function(t, e) {
            var i = this;
            setTimeout((function() {
              i.init()
            }), 0)
          },
          init: function() {
            for (var t = Object(a.b)().windowWidth, e = (this.windowWidth = t || 375, this.itemPadding = this.windowWidth / 375 * 15, this), i = e.createSelectorQuery(), n = 0; n < e.data.tabData.length; n++) i.select("#item" + n).boundingClientRect();
            i.exec(function(t) {
              t && (e.items = t, e.scrollByIndex(0, !1))
            }.bind(e))
          }
        },
        ready: function() {
          this.init()
        }
      })
    }
  },
  [
    [1976, 0, 2, 1, 3]
  ]
]);