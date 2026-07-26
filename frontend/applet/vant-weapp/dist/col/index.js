(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [909], {
    2327: function(t, e, s) {
      s.r(e), e = s(19), Object(e.a)({
        relation: {
          name: "row",
          type: "ancestor"
        },
        props: {
          span: Number,
          offset: Number
        },
        data: {
          style: ""
        },
        methods: {
          setGutter: function(t) {
            var e = t / 2 + "px";
            (t = t ? "padding-left: " + e + "; padding-right: " + e + ";" : "") !== this.data.style && this.set({
              style: t
            })
          }
        }
      })
    }
  },
  [
    [2327, 0, 3]
  ]
]);