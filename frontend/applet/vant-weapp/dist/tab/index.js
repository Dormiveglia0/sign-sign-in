(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [969], {
    1879: function(t, e, a) {
      a.r(e), e = a(19), Object(e.a)({
        relation: {
          name: "tabs",
          type: "ancestor"
        },
        props: {
          dot: Boolean,
          info: null,
          title: String,
          disabled: Boolean,
          titleStyle: String
        },
        data: {
          width: null,
          inited: !1,
          active: !1,
          animated: !1
        },
        watch: {
          title: "update",
          disabled: "update",
          dot: "update",
          info: "update",
          titleStyle: "update"
        },
        methods: {
          update: function() {
            var t = this.getRelationNodes("../tabs/index")[0];
            t && t.updateTabs()
          }
        }
      })
    }
  },
  [
    [1879, 0, 3]
  ]
]);