(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [957], {
    2330: function(t, e, s) {
      s.r(e), e = s(19), Object(e.a)({
        relation: {
          name: "col",
          type: "descendant",
          linked: function(t) {
            this.data.gutter && t.setGutter(this.data.gutter)
          }
        },
        props: {
          gutter: Number
        },
        watch: {
          gutter: "setGutter"
        },
        mounted: function() {
          this.data.gutter && this.setGutter()
        },
        methods: {
          setGutter: function() {
            var t = this,
              e = this.data.gutter,
              s = "-" + Number(e) / 2 + "px";
            this.set({
              style: e ? "margin-right: " + s + "; margin-left: " + s + ";" : ""
            }), this.getRelationNodes("../col/index").forEach((function(e) {
              e.setGutter(t.data.gutter)
            }))
          }
        }
      })
    }
  },
  [
    [2330, 0, 3]
  ]
]);