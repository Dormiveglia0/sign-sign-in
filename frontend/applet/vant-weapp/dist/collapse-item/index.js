(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [912], {
    2494: function(t, e, n) {
      n.r(e);
      e = n(19);
      var a = function() {
        return new Promise((function(t) {
          return setTimeout(t, 20)
        }))
      };
      Object(e.a)({
        classes: ["title-class", "content-class"],
        relation: {
          name: "collapse",
          type: "ancestor",
          linked: function(t) {
            this.parent = t
          }
        },
        props: {
          name: null,
          title: null,
          value: null,
          icon: String,
          label: String,
          disabled: Boolean,
          clickable: Boolean,
          border: {
            type: Boolean,
            value: !0
          },
          isLink: {
            type: Boolean,
            value: !0
          }
        },
        data: {
          contentHeight: 0,
          expanded: !1,
          transition: !1
        },
        mounted: function() {
          var t = this;
          this.updateExpanded().then(a).then((function() {
            var e = {
              transition: !0
            };
            t.data.expanded && (e.contentHeight = "auto"), t.set(e)
          }))
        },
        methods: {
          updateExpanded: function() {
            var t, e, n, a, i;
            return this.parent ? (t = (a = this.parent.data).value, a = a.accordion, e = this.parent.children, i = this.data.name, e = (void 0 === e ? [] : e).indexOf(this), n = null == i ? e : i, i = [], (a = a ? t === n : (t || []).some((function(t) {
              return t === n
            }))) !== this.data.expanded && i.push(this.updateStyle(a)), i.push(this.set({
              index: e,
              expanded: a
            })), Promise.all(i)) : Promise.resolve()
          },
          updateStyle: function(t) {
            var e = this;
            return this.getRect(".van-collapse-item__content").then((function(t) {
              return t.height || 0
            })).then((function(n) {
              return t ? e.set({
                contentHeight: n ? n + "px" : "auto"
              }) : e.set({
                contentHeight: n + "px"
              }).then(a).then((function() {
                return e.set({
                  contentHeight: 0
                })
              }))
            }))
          },
          onClick: function() {
            var t, e, n;
            this.data.disabled || (t = (e = this.data).name, e = e.expanded, n = this.parent.children.indexOf(this), this.parent.switch(null == t ? n : t, !e))
          },
          onTransitionEnd: function() {
            this.data.expanded && this.set({
              contentHeight: "auto"
            })
          }
        }
      })
    }
  },
  [
    [2494, 0, 3]
  ]
]);