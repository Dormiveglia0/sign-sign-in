(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [936], {
    1891: function(e, o, t) {
      t.r(o), o = t(19), Object(o.a)({
        props: {
          show: Boolean,
          mask: Boolean,
          customStyle: String,
          duration: {
            type: [Number, Object],
            value: 300
          },
          zIndex: {
            type: Number,
            value: 1
          }
        },
        methods: {
          onClick: function() {
            this.$emit("click")
          },
          noop: function() {}
        }
      })
    }
  },
  [
    [1891, 0, 3]
  ]
]);