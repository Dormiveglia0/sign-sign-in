(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [644], {
    2028: function(t, a, e) {
      e.r(a);
      var i = e(1);
      Component({
        properties: {
          itemData: {
            type: Object,
            value: ""
          },
          itemIndex: {
            type: Number,
            value: ""
          }
        },
        observers: {
          itemData: function(t) {
            this.setData({
              itemDataNew: t
            })
          }
        },
        data: {
          itemDataNew: "",
          images: {}
        },
        ready: function() {
          this.setData({
            itemDataNew: this.data.itemData
          })
        },
        methods: {
          toNewsDetail: function(t) {
            var a = t.currentTarget.dataset.id;
            t = t.currentTarget.dataset.comment || null;
            wx.navigateTo({
              url: "/growUp/pages/home/informationdetail/informationdetail?id=" + a + "&showComment=" + t
            })
          },
          listImgError: function(t) {
            var a = {};
            a["itemDataNew.imgList[" + t.target.dataset.index + "]"] = "https://xcxstatic.xybsyw.com/xcx/images/com_default.png", this.setData(a)
          },
          awesome: function(t) {
            var a = this,
              e = this,
              s = t.currentTarget.dataset.id,
              n = t.currentTarget.dataset.status,
              o = this.data.itemDataNew;
            e.data.isLogin && !o.praise && (o.showLikeGif = !0, this.setData({
              itemDataNew: o
            }), setTimeout((function() {
              o.showLikeGif = !1, e.setData({
                itemDataNew: o
              })
            }), 1e3)), i.a.xyb_request("client/question/SaveInformation!praiseData.action", "POST", {
              id: s,
              status: n ? 0 : 1
            }).then((function(t) {
              var i = a.data.itemDataNew;
              i.praise = !n, i.totalPraise = t.data.totalPraise, e.setData({
                itemDataNew: i
              })
            }), (function(t) {}))
          }
        }
      })
    }
  },
  [
    [2028, 0, 2, 1, 3]
  ]
]);