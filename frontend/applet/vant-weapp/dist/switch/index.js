(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [966], {
    2733: function(e, t, a) {
      a.r(t), t = a(19), Object(t.a)({
        field: !0,
        classes: ["node-class"],
        props: {
          checked: null,
          loading: Boolean,
          disabled: Boolean,
          activeColor: String,
          inactiveColor: String,
          size: {
            type: String,
            value: "30px"
          },
          activeValue: {
            type: null,
            value: !0
          },
          inactiveValue: {
            type: null,
            value: !1
          }
        },
        watch: {
          checked: function(e) {
            this.set({
              value: e
            })
          }
        },
        created: function() {
          this.set({
            value: this.data.checked
          })
        },
        methods: {
          onClick: function() {
            var e = (t = this.data).activeValue,
              t = t.inactiveValue;
            this.data.disabled || this.data.loading || (t = this.data.checked === e ? t : e, this.$emit("input", t), this.$emit("change", t))
          }
        }
      })
    }
  },
  [
    [2733, 0, 3]
  ]
]);