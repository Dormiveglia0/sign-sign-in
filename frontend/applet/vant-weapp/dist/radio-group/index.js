(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [948], {
    1904: function(e, i, t) {
      t.r(i), i = t(19), Object(i.a)({
        field: !0,
        relation: {
          name: "radio",
          type: "descendant",
          linked: function(e) {
            this.children = this.children || [], this.children.push(e), this.updateChild(e)
          },
          unlinked: function(e) {
            this.children = this.children.filter((function(i) {
              return i !== e
            }))
          }
        },
        props: {
          value: {
            type: null,
            observer: "updateChildren"
          },
          disabled: {
            type: Boolean,
            observer: "updateChildren"
          }
        },
        methods: {
          updateChildren: function() {
            var e = this;
            (this.children || []).forEach((function(i) {
              return e.updateChild(i)
            }))
          },
          updateChild: function(e) {
            var i = (t = this.data).value,
              t = t.disabled;
            e.set({
              value: i,
              disabled: t || e.data.disabled
            })
          }
        }
      })
    }
  },
  [
    [1904, 0, 3]
  ]
]);