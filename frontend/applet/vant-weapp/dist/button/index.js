(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [897], {
    1921: function(a, o, e) {
      e.r(o);
      o = e(19);
      var n = e(77);
      e = e(78);
      Object(o.a)({
        mixins: [n.a, e.a],
        classes: ["hover-class", "loading-class"],
        props: {
          icon: String,
          plain: Boolean,
          block: Boolean,
          round: Boolean,
          square: Boolean,
          loading: Boolean,
          hairline: Boolean,
          disabled: Boolean,
          loadingText: String,
          type: {
            type: String,
            value: "default"
          },
          size: {
            type: String,
            value: "normal"
          },
          loadingSize: {
            type: String,
            value: "20px"
          }
        },
        methods: {
          onClick: function() {
            this.data.disabled || this.data.loading || this.$emit("click")
          }
        }
      })
    }
  },
  [
    [1921, 0, 3]
  ]
]);