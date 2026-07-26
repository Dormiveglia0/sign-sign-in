var _typeof4 = require("./@babel/runtime/helpers/typeof");
(wx.webpackJsonp = wx.webpackJsonp || []).push([
  [1], {
    1007: function(t, e, r) {
      function i(t) {
        if (Array.isArray(t)) {
          for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
          return r
        }
        return Array.from(t)
      }
      var n, s = r(69).BigInteger,
        a = (n = r(1014)).encodeDer,
        o = n.decodeDer,
        h = r(1015),
        l = r(1017).sm3,
        p = (n = h.generateEcparam()).G,
        c = n.curve,
        f = n.n;

      function u(t, e, r) {
        var i = h.utf8ToHex(2 < arguments.length && void 0 !== r ? r : "1234567812345678"),
          n = h.leftPad(p.curve.a.toBigInteger().toRadix(16), 64),
          s = h.leftPad(p.curve.b.toBigInteger().toRadix(16), 64),
          a = h.leftPad(p.getX().toBigInteger().toRadix(16), 64),
          o = h.leftPad(p.getY().toBigInteger().toRadix(16), 64),
          c = void 0,
          f = void 0,
          u = (f = 128 === e.length ? (c = e.substr(0, 64), e.substr(64, 64)) : (u = p.curve.decodePointHex(e), c = h.leftPad(u.getX().toBigInteger().toRadix(16), 64), h.leftPad(u.getY().toBigInteger().toRadix(16), 64)), h.hexToArray(i + n + s + a + o + c + f));
        n = 4 * i.length, u.unshift(255 & n), u.unshift(n >> 8 & 255), s = l(u);
        return h.arrayToHex(l(s.concat(h.hexToArray(t))))
      }

      function m(t) {
        return t = p.multiply(new s(t, 16)), "04" + h.leftPad(t.getX().toBigInteger().toString(16), 64) + h.leftPad(t.getY().toBigInteger().toString(16), 64)
      }

      function d() {
        var t = h.generateKeyPairHex(),
          e = c.decodePointHex(t.publicKey);
        return t.k = new s(t.privateKey, 16), t.x1 = e.getX().toBigInteger(), t
      }
      t.exports = {
        generateKeyPairHex: h.generateKeyPairHex,
        compressPublicKeyHex: h.compressPublicKeyHex,
        comparePublicKeyHex: h.comparePublicKeyHex,
        doEncrypt: function(t, e) {
          var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1,
            n = (t = "string" == typeof t ? h.hexToArray(h.utf8ToHex(t)) : Array.prototype.slice.call(t), e = h.getGlobalCurve().decodePointHex(e), h.generateKeyPairHex()),
            a = new s(n.privateKey, 16),
            o = (a = (128 < (n = n.publicKey).length && (n = n.substr(n.length - 128)), e.multiply(a)), h.hexToArray(h.leftPad(a.getX().toBigInteger().toRadix(16), 64))),
            p = (a = h.hexToArray(h.leftPad(a.getY().toBigInteger().toRadix(16), 64)), h.arrayToHex(l([].concat(o, t, a)))),
            c = 1,
            f = 0,
            u = [],
            m = [].concat(o, a),
            d = function() {
              u = l([].concat(i(m), [c >> 24 & 255, c >> 16 & 255, c >> 8 & 255, 255 & c])), c++, f = 0
            };
          d();
          for (var y = 0, g = t.length; y < g; y++) f === u.length && d(), t[y] ^= 255 & u[f++];
          return o = h.arrayToHex(t), 0 === r ? n + o + p : n + p + o
        },
        doDecrypt: function(t, e) {
          var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1,
            n = void 0 === (n = (3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {}).output) ? "string" : n,
            a = (e = new s(e, 16), t.substr(128, 64)),
            o = t.substr(192),
            p = (0 === r && (a = t.substr(t.length - 64), o = t.substr(128, t.length - 128 - 64)), h.hexToArray(o)),
            c = (r = h.getGlobalCurve().decodePointHex("04" + t.substr(0, 128)).multiply(e), o = h.hexToArray(h.leftPad(r.getX().toBigInteger().toRadix(16), 64)), r = h.hexToArray(h.leftPad(r.getY().toBigInteger().toRadix(16), 64)), 1),
            f = 0,
            u = [],
            m = [].concat(o, r),
            d = function() {
              u = l([].concat(i(m), [c >> 24 & 255, c >> 16 & 255, c >> 8 & 255, 255 & c])), c++, f = 0
            };
          d();
          for (var y = 0, g = p.length; y < g; y++) f === u.length && d(), p[y] ^= 255 & u[f++];
          return h.arrayToHex(l([].concat(o, p, r))) === a.toLowerCase() ? "array" === n ? p : h.arrayToUtf8(p) : "array" === n ? [] : ""
        },
        doSignature: function(t, e) {
          var r = (l = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}).pointPool,
            i = l.der,
            n = l.hash,
            o = l.publicKey,
            l = l.userId,
            p = "string" == typeof t ? h.utf8ToHex(t) : h.arrayToHex(t),
            c = (n && (p = u(p, o || m(e), l)), new s(e, 16)),
            y = new s(p, 16),
            g = null,
            v = null,
            b = null;
          do {
            do {
              var P = void 0;
              g = (P = r && r.length ? r.pop() : d()).k, v = y.add(P.x1).mod(f)
            } while (v.equals(s.ZERO) || v.add(g).equals(f))
          } while ((b = c.add(s.ONE).modInverse(f).multiply(g.subtract(v.multiply(c))).mod(f)).equals(s.ZERO));
          return i ? a(v, b) : h.leftPad(v.toString(16), 64) + h.leftPad(b.toString(16), 64)
        },
        doVerifySignature: function(t, e, r) {
          var i = (a = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {}).der,
            n = a.hash,
            a = a.userId,
            l = "string" == typeof t ? h.utf8ToHex(t) : h.arrayToHex(t),
            m = (n = void(n && (l = u(l, r, a))), a = void 0, i = (a = i ? (n = (i = o(e)).r, i.s) : (n = new s(e.substring(0, 64), 16), new s(e.substring(64), 16)), c.decodePointHex(r)), l = new s(l, 16), n.add(a).mod(f));
          return !m.equals(s.ZERO) && (a = p.multiply(a).add(i.multiply(m)), i = l.add(a.getX().toBigInteger()).mod(f), n.equals(i))
        },
        getPublicKeyFromPrivateKey: m,
        getPoint: d,
        verifyPublicKey: h.verifyPublicKey
      }
    },
    1011: function(t, e, r) {
      var i, n, s = "function" == typeof Symbol && "symbol" == _typeof4(Symbol.iterator) ? function(t) {
          return _typeof4(t)
        } : function(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof4(t)
        },
        a = (Object.defineProperty(e, "__esModule", {
          value: !0
        }), r(0)),
        o = ((r = i = i || {}).WillMount = "componentWillMount", r.DidMount = "componentDidMount", r.DidShow = "componentDidShow", r.DidHide = "componentDidHide", r.WillUnmount = "componentWillUnmount", {}),
        h = (o[i.WillMount] = ["created", "onLoad", "onLanuch"], o[i.DidMount] = ["onReady", "ready", "attached"], o[i.DidShow] = ["onShow"], o[i.DidHide] = ["onHide"], o[i.WillUnmount] = ["detached", "onUnload"], new Set);
      for (n in o) o[n].forEach((function(t) {
        return h.add(t)
      }));

      function l(t, e) {
        return !!t && (r._length = t.length, r);

        function r(r) {
          var i = arguments.length;
          return i ? 1 < i ? t.apply(e, arguments) : t.call(e, r) : t.call(e)
        }
      }

      function p() {
        for (var t = arguments.length; t--;);
      }
      var c = {
        enumerable: !0,
        configurable: !0,
        get: p,
        set: p
      };

      function f(t, e, r) {
        c.get = function() {
          return this[e][r]
        }, c.set = function(t) {
          this[e][r] = t
        }, Object.defineProperty(t, r, c)
      }
      var u = "[object Array]",
        m = "[object Object]";

      function d(t, e, r) {
        "[object Function]" != y(r) && (t[e] = r)
      }

      function y(t) {
        return Object.prototype.toString.call(t)
      }
      var g = JSON,
        v = Array.isArray || function(t) {
          return "[object Array]" === {}.toString.call(t)
        },
        b = Object.keys || function(t) {
          var e, r = Object.prototype.hasOwnProperty || function() {
              return !0
            },
            i = [];
          for (e in t) r.call(t, e) && i.push(e);
          return i
        };

      function P(t, e, r) {
        Object.defineProperty(t, e, {
          enumerable: !0,
          configurable: !0,
          get: function() {
            return "props" === r ? t.props : Object.assign(Object.assign({}, t.state), t.props)
          }
        })
      }

      function x(t) {
        return "function" == typeof t
      }
      e.default = function(t) {
        return function(e) {
          var r, n = function(e) {
              function r(r) {
                var i = this;
                e.call(this, r), this._observeProps = [], this.willMounts = [], this.didMounts = [], this.didHides = [], this.didShows = [], this.willUnmounts = [], this.safeExecute = function(t) {
                  for (var e = [], r = arguments.length - 1; 0 < r--;) e[r] = arguments[r + 1];
                  x(t) && t.apply(i, e)
                }, this.selectComponent = function() {
                  for (var t, e = [], r = arguments.length; r--;) e[r] = arguments[r];
                  i.$scope && i.$scope.selectComponent && (t = i.$scope).selectComponent.apply(t, e)
                }, this.getRelationNodes = function() {
                  for (var t, e = [], r = arguments.length; r--;) e[r] = arguments[r];
                  i.$scope && i.$scope.getRelationNodes && (t = i.$scope).getRelationNodes.apply(t, e)
                }, this.setData = function(t, e) {
                  var r;
                  i.observers && Object.keys(Object.keys(i.observers)) && (r = function(t) {
                    return g.parse(function(t, e) {
                      "function" == typeof(e = e || {}) && (e = {
                        cmp: e
                      });
                      var r = e.space || "";
                      "number" == typeof r && (r = Array(r + 1).join(" "));
                      var i = "boolean" == typeof e.cycles && e.cycles,
                        n = e.replacer || function(t, e) {
                          return e
                        },
                        a = e.cmp && function(t) {
                          return function(e) {
                            return function(r, i) {
                              return r = {
                                key: r,
                                value: e[r]
                              }, i = {
                                key: i,
                                value: e[i]
                              }, t(r, i)
                            }
                          }
                        }(e.cmp),
                        o = [];
                      return function t(e, h, l, p) {
                        var c = r ? "\n" + new Array(p + 1).join(r) : "",
                          f = r ? ": " : ":";
                        if (l && l.toJSON && "function" == typeof l.toJSON && (l = l.toJSON()), void 0 !== (l = n.call(e, h, l))) {
                          if ("object" !== (void 0 === l ? "undefined" : s(l)) || null === l) return g.stringify(l);
                          if (v(l)) {
                            for (var u = [], m = 0; m < l.length; m++) {
                              var d = t(l, m, l[m], p + 1) || g.stringify(null);
                              u.push(c + r + d)
                            }
                            return "[" + u.join(",") + c + "]"
                          }
                          if (-1 !== o.indexOf(l)) {
                            if (i) return g.stringify("__cycle__");
                            throw new TypeError("Converting circular structure to JSON")
                          }
                          o.push(l);
                          for (var y = b(l).sort(a && a(l)), P = [], x = 0; x < y.length; x++) {
                            var _ = y[x],
                              T = t(l, _, l[_], p + 1);
                            T && (_ = g.stringify(_) + f + T, P.push(c + r + _))
                          }
                          return o.splice(o.indexOf(l), 1), "{" + P.join(",") + c + "}"
                        }
                      }({
                        "": t
                      }, "", t, 0)
                    }(t))
                  }(i.state)), Object.keys(t).forEach((function(e) {
                    a.internal_safe_set(i.state, e, t[e])
                  })), a.setIsUsingDiff(!1), i.setState(i.state, (function() {
                    a.setIsUsingDiff(!0), i.triggerObservers(i.state, r), e && e.call(i)
                  }))
                }, this.triggerEvent = function(t) {
                  for (var e = [], r = arguments.length - 1; 0 < r--;) e[r] = arguments[r + 1];
                  x(t = i.props["on" + t[0].slice(0, 1).toUpperCase() + t.slice(1)]) && t.apply(i, e.map((function(t) {
                    return {
                      detail: t
                    }
                  })))
                }, this.init(t), P(this, "data", "state"), P(this, "properties", "props")
              }
              return e && (r.__proto__ = e), ((r.prototype = Object.create(e && e.prototype)).constructor = r).prototype.initProps = function(t) {
                for (var e in t) {
                  var r;
                  t.hasOwnProperty(e) && (x(r = t[e]) || r.observer && this._observeProps.push({
                    name: e,
                    observer: r.observer
                  }), f(this, "props", e))
                }
              }, r.prototype.init = function(t) {
                for (var e in t) {
                  var r, i = t[e];
                  switch (e) {
                    case "externalClasses":
                      break;
                    case "data":
                      this.state = i;
                      for (var n = Object.keys(this.state), s = n.length; s--;) f(this, "state", n[s]);
                      break;
                    case "properties":
                      this.initProps(i);
                      break;
                    case "methods":
                      for (var a in i) {
                        var o = i[a];
                        this[a] = l(o, this)
                      }
                      break;
                    case "behaviors":
                      break;
                    case "lifetimes":
                      for (var p in i) {
                        var c = i[p];
                        this.initLifeCycles(p, c)
                      }
                      break;
                    default:
                      h.has(e) ? (r = t[e], this.initLifeCycles(e, r)) : x(i) ? this[e] = l(i, this) : this[e] = i
                  }
                }
              }, r.prototype.initLifeCycles = function(t, e) {
                for (var r in o)
                  if (-1 !== o[r].indexOf(t)) switch (r) {
                    case i.DidHide:
                      this.didHides.push(e);
                      break;
                    case i.DidMount:
                      this.didMounts.push(e);
                      break;
                    case i.DidShow:
                      this.didShows.push(e);
                      break;
                    case i.WillMount:
                      this.willMounts.push(e);
                      break;
                    case i.WillUnmount:
                      this.willUnmounts.push(e)
                  }
                x(this[t]) || (this[t] = e)
              }, r.prototype.executeLifeCycles = function(t) {
                for (var e = [], r = arguments.length - 1; 0 < r--;) e[r] = arguments[r + 1];
                for (var i = 0; i < t.length; i++) {
                  var n = t[i];
                  this.safeExecute.apply(this, [n].concat(e))
                }
              }, r.prototype.triggerObservers = function(t, e) {
                var r = this.observers;
                if (null != r && 0 !== Object.keys(r).length) {
                  e = function(t, e) {
                    var r = {};
                    return function t(e, r) {
                        if (e !== r) {
                          var i = y(e),
                            n = y(r);
                          if (i == m && n == m)
                            for (var s in r) {
                              var a = e[s];
                              void 0 === a ? e[s] = null : t(a, r[s])
                            } else i == u && n == u && e.length >= r.length && r.forEach((function(r, i) {
                              t(e[i], r)
                            }))
                        }
                      }(t, e),
                      function t(e, r, i, n) {
                        if (e !== r) {
                          var s = y(e),
                            a = y(r);
                          if (s == m)
                            if (a != m || Object.keys(e).length < Object.keys(r).length) d(n, i, e);
                            else {
                              var o, h = function(s) {
                                var a = e[s],
                                  o = r[s],
                                  h = y(a),
                                  l = y(o);
                                if (h != u && h != m) a != r[s] && d(n, ("" == i ? "" : i + ".") + s, a);
                                else if (h == u) l != u || a.length < o.length ? d(n, ("" == i ? "" : i + ".") + s, a) : a.forEach((function(e, r) {
                                  t(e, o[r], ("" == i ? "" : i + ".") + s + "[" + r + "]", n)
                                }));
                                else if (h == m)
                                  if (l != m || Object.keys(a).length < Object.keys(o).length) d(n, ("" == i ? "" : i + ".") + s, a);
                                  else
                                    for (var p in a) t(a[p], o[p], ("" == i ? "" : i + ".") + s + "." + p, n)
                              };
                              for (o in e) h(o)
                            }
                          else s != u || a != u || e.length < r.length ? d(n, i, e) : e.forEach((function(e, s) {
                            t(e, r[s], i + "[" + s + "]", n)
                          }))
                        }
                      }(t, e, "", r), r
                  }(t, e);
                  var i = Object.keys(e);
                  if (0 !== i.length)
                    for (var n in r) {
                      for (var s = n.split(",").map((function(t) {
                          return t.trim()
                        })), o = [], h = 0; h < s.length; h++)
                        for (var l = s[h], p = 0; p < i.length; p++) {
                          var c = i[p];
                          (c.startsWith(l) || l.startsWith(c) && l.endsWith("]")) && o.push(a.internal_safe_get(t, l))
                        }
                      o.length && r[n].apply(this, o)
                    }
                }
              }, r.prototype.componentWillMount = function() {
                var t = this;
                this._observeProps.forEach((function(e) {
                  var r, i = e.name,
                    n = (e = e.observer, t.props[i]);
                  "string" == typeof e ? x(r = t[e]) && r.call(t, n, n, i) : x(e) && e.call(t, n, n, i)
                })), this.safeExecute.call(this, e.prototype.componentWillMount), this.executeLifeCycles(this.willMounts, this.$router.params || {})
              }, r.prototype.componentDidMount = function() {
                this.safeExecute.call(this, e.prototype.componentDidMount), this.executeLifeCycles(this.didMounts)
              }, r.prototype.componentWillUnmount = function() {
                this.safeExecute.call(this, e.prototype.componentWillUnmount), this.executeLifeCycles(this.willUnmounts)
              }, r.prototype.componentDidHide = function() {
                this.safeExecute.call(this, e.prototype.componentDidHide), this.executeLifeCycles(this.didHides)
              }, r.prototype.componentDidShow = function() {
                this.safeExecute.call(this, e.prototype.componentDidShow), this.executeLifeCycles(this.didShows, this.$router.params || {})
              }, r.prototype.componentWillReceiveProps = function(t) {
                var r = this;
                this.triggerObservers(t, this.props), this._observeProps.forEach((function(e) {
                  var i, n = e.name,
                    s = (e = e.observer, r.props[n]),
                    a = t[n];
                  ! function(t, e) {
                    return JSON.stringify(t) === JSON.stringify(e)
                  }(s, a) && ("string" == typeof e ? x(i = r[e]) && i.call(r, a, s, n) : x(e) && e.call(r, a, s, n))
                })), this.safeExecute.call(this, e.prototype.componentWillReceiveProps)
              }, r
            }(e),
            p = t.properties;
          if (p)
            for (var c in p) {
              var _ = p[c];
              null == _ || x(_) || void 0 !== _.value && (n.defaultProps = Object.assign(((r = {})[c] = _.value, r), n.defaultProps))
            }
          return ["externalClasses", "relations", "options"].forEach((function(e) {
            var r = t[e];
            null != r && (n[e] = r)
          })), n
        }
      }
    },
    1012: function(t, e, r) {
      var i = function() {
          return this
        }() || {
          Function: Function,
          Boolean: Boolean,
          Object: Object,
          Number: Number,
          Array: Array,
          Date: Date,
          String: String,
          Symbol: Symbol,
          Error: Error,
          TypeError: TypeError,
          Map: Map,
          Set: Set,
          WeakMap: WeakMap,
          WeakSet: WeakSet,
          ArrayBuffer: ArrayBuffer,
          Math: Math,
          Promise: Promise,
          RegExp: RegExp,
          DataView: DataView,
          isFinite: isFinite,
          parseInt: parseInt,
          parseFloat: parseFloat,
          Float32Array: Float32Array,
          Float64Array: Float64Array,
          Int8Array: Int8Array,
          Int16Array: Int16Array,
          Int32Array: Int32Array,
          Uint8Array: Uint8Array,
          Uint16Array: Uint16Array,
          Uint32Array: Uint32Array,
          Uint8ClampedArray: Uint8ClampedArray,
          setTimeout: setTimeout,
          clearTimeout: clearTimeout,
          setInterval: setInterval,
          clearInterval: clearInterval
        },
        n = i.regeneratorRuntime && 0 <= Object.getOwnPropertyNames(i).indexOf("regeneratorRuntime"),
        s = n && i.regeneratorRuntime;
      if (i.regeneratorRuntime = void 0, t.exports = r(1013), n) i.regeneratorRuntime = s;
      else try {
        delete i.regeneratorRuntime
      } catch (t) {
        i.regeneratorRuntime = void 0
      }
    },
    1013: function(t, e, r) {
      (function(t) {
        var e = "function" == typeof Symbol && "symbol" == _typeof4(Symbol.iterator) ? function(t) {
          return _typeof4(t)
        } : function(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof4(t)
        };
        ! function(r) {
          var i, n, s, a, o, h, l, p = Object.prototype,
            c = p.hasOwnProperty,
            f = (d = "function" == typeof Symbol ? Symbol : {}).iterator || "@@iterator",
            u = d.asyncIterator || "@@asyncIterator",
            m = d.toStringTag || "@@toStringTag",
            d = "object" === e(t),
            y = r.regeneratorRuntime;

          function g(t, e, r, l) {
            return e = e && e.prototype instanceof b ? e : b, e = Object.create(e.prototype), l = new w(l || []), e._invoke = function(t, e, r) {
              var l = n;
              return function(p, c) {
                if (l === a) throw new Error("Generator is already running");
                if (l === o) {
                  if ("throw" === p) throw c;
                  return C()
                }
                for (r.method = p, r.arg = c;;) {
                  var f = r.delegate;
                  if (f && (f = function t(e, r) {
                      var n = e.iterator[r.method];
                      if (n === i) {
                        if (r.delegate = null, "throw" === r.method) {
                          if (e.iterator.return && (r.method = "return", r.arg = i, t(e, r), "throw" === r.method)) return h;
                          r.method = "throw", r.arg = new TypeError("The iterator does not provide a 'throw' method")
                        }
                        return h
                      }
                      return "throw" === (n = v(n, e.iterator, r.arg)).type ? (r.method = "throw", r.arg = n.arg, r.delegate = null, h) : (n = n.arg) ? n.done ? (r[e.resultName] = n.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = i), r.delegate = null, h) : n : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, h)
                    }(f, r))) {
                    if (f === h) continue;
                    return f
                  }
                  if ("next" === r.method) r.sent = r._sent = r.arg;
                  else if ("throw" === r.method) {
                    if (l === n) throw l = o, r.arg;
                    r.dispatchException(r.arg)
                  } else "return" === r.method && r.abrupt("return", r.arg);
                  if (l = a, "normal" === (f = v(t, e, r)).type) {
                    if (l = r.done ? o : s, f.arg !== h) return {
                      value: f.arg,
                      done: r.done
                    }
                  } else "throw" === f.type && (l = o, r.method = "throw", r.arg = f.arg)
                }
              }
            }(t, r, l), e
          }

          function v(t, e, r) {
            try {
              return {
                type: "normal",
                arg: t.call(e, r)
              }
            } catch (t) {
              return {
                type: "throw",
                arg: t
              }
            }
          }

          function b() {}

          function P() {}

          function x() {}

          function _(t) {
            ["next", "throw", "return"].forEach((function(e) {
              t[e] = function(t) {
                return this._invoke(e, t)
              }
            }))
          }

          function T(t) {
            var r;
            this._invoke = function(i, n) {
              function s() {
                return new Promise((function(r, s) {
                  ! function r(i, n, s, a) {
                    if ("throw" === (i = v(t[i], t, n)).type) a(i.arg);
                    else {
                      var o = i.arg;
                      if ((n = o.value) && "object" === (void 0 === n ? "undefined" : e(n)) && c.call(n, "__await")) return Promise.resolve(n.__await).then((function(t) {
                        r("next", t, s, a)
                      }), (function(t) {
                        r("throw", t, s, a)
                      }));
                      Promise.resolve(n).then((function(t) {
                        o.value = t, s(o)
                      }), a)
                    }
                  }(i, n, r, s)
                }))
              }
              return r = r ? r.then(s, s) : s()
            }
          }

          function S(t) {
            var e = {
              tryLoc: t[0]
            };
            1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
          }

          function E(t) {
            var e = t.completion || {};
            e.type = "normal", delete e.arg, t.completion = e
          }

          function w(t) {
            this.tryEntries = [{
              tryLoc: "root"
            }], t.forEach(S, this), this.reset(!0)
          }

          function A(t) {
            if (t) {
              var e, r = t[f];
              if (r) return r.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) return e = -1, (r = function r() {
                for (; ++e < t.length;)
                  if (c.call(t, e)) return r.value = t[e], r.done = !1, r;
                return r.value = i, r.done = !0, r
              }).next = r
            }
            return {
              next: C
            }
          }

          function C() {
            return {
              value: i,
              done: !0
            }
          }
          y ? d && (t.exports = y) : ((y = r.regeneratorRuntime = d ? t.exports : {}).wrap = g, n = "suspendedStart", s = "suspendedYield", a = "executing", o = "completed", h = {}, (r = {})[f] = function() {
            return this
          }, (d = (d = Object.getPrototypeOf) && d(d(A([])))) && d !== p && c.call(d, f) && (r = d), l = x.prototype = b.prototype = Object.create(r), (P.prototype = l.constructor = x).constructor = P, x[m] = P.displayName = "GeneratorFunction", y.isGeneratorFunction = function(t) {
            return !!(t = "function" == typeof t && t.constructor) && (t === P || "GeneratorFunction" === (t.displayName || t.name))
          }, y.mark = function(t) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t, x) : (t.__proto__ = x, m in t || (t[m] = "GeneratorFunction")), t.prototype = Object.create(l), t
          }, y.awrap = function(t) {
            return {
              __await: t
            }
          }, _(T.prototype), T.prototype[u] = function() {
            return this
          }, y.AsyncIterator = T, y.async = function(t, e, r, i) {
            var n = new T(g(t, e, r, i));
            return y.isGeneratorFunction(e) ? n : n.next().then((function(t) {
              return t.done ? t.value : n.next()
            }))
          }, _(l), l[m] = "Generator", l[f] = function() {
            return this
          }, l.toString = function() {
            return "[object Generator]"
          }, y.keys = function(t) {
            var e, r = [];
            for (e in t) r.push(e);
            return r.reverse(),
              function e() {
                for (; r.length;) {
                  var i = r.pop();
                  if (i in t) return e.value = i, e.done = !1, e
                }
                return e.done = !0, e
              }
          }, y.values = A, w.prototype = {
            constructor: w,
            reset: function(t) {
              if (this.prev = 0, this.next = 0, this.sent = this._sent = i, this.done = !1, this.delegate = null, this.method = "next", this.arg = i, this.tryEntries.forEach(E), !t)
                for (var e in this) "t" === e.charAt(0) && c.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = i)
            },
            stop: function() {
              this.done = !0;
              var t = this.tryEntries[0].completion;
              if ("throw" === t.type) throw t.arg;
              return this.rval
            },
            dispatchException: function(t) {
              if (this.done) throw t;
              var e = this;

              function r(r, n) {
                return a.type = "throw", a.arg = t, e.next = r, n && (e.method = "next", e.arg = i), !!n
              }
              for (var n = this.tryEntries.length - 1; 0 <= n; --n) {
                var s = this.tryEntries[n],
                  a = s.completion;
                if ("root" === s.tryLoc) return r("end");
                if (s.tryLoc <= this.prev) {
                  var o = c.call(s, "catchLoc"),
                    h = c.call(s, "finallyLoc");
                  if (o && h) {
                    if (this.prev < s.catchLoc) return r(s.catchLoc, !0);
                    if (this.prev < s.finallyLoc) return r(s.finallyLoc)
                  } else if (o) {
                    if (this.prev < s.catchLoc) return r(s.catchLoc, !0)
                  } else {
                    if (!h) throw new Error("try statement without catch or finally");
                    if (this.prev < s.finallyLoc) return r(s.finallyLoc)
                  }
                }
              }
            },
            abrupt: function(t, e) {
              for (var r = this.tryEntries.length - 1; 0 <= r; --r) {
                var i = this.tryEntries[r];
                if (i.tryLoc <= this.prev && c.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
                  var n = i;
                  break
                }
              }
              var s = (n = n && ("break" === t || "continue" === t) && n.tryLoc <= e && e <= n.finallyLoc ? null : n) ? n.completion : {};
              return s.type = t, s.arg = e, n ? (this.method = "next", this.next = n.finallyLoc, h) : this.complete(s)
            },
            complete: function(t, e) {
              if ("throw" === t.type) throw t.arg;
              return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), h
            },
            finish: function(t) {
              for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                var r = this.tryEntries[e];
                if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), E(r), h
              }
            },
            catch: function(t) {
              for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                var r, i, n = this.tryEntries[e];
                if (n.tryLoc === t) return "throw" === (r = n.completion).type && (i = r.arg, E(n)), i
              }
              throw new Error("illegal catch attempt")
            },
            delegateYield: function(t, e, r) {
              return this.delegate = {
                iterator: A(t),
                resultName: e,
                nextLoc: r
              }, "next" === this.method && (this.arg = i), h
            }
          })
        }(function() {
          return this
        }() || {
          Function: Function,
          Boolean: Boolean,
          Object: Object,
          Number: Number,
          Array: Array,
          Date: Date,
          String: String,
          Symbol: Symbol,
          Error: Error,
          TypeError: TypeError,
          Map: Map,
          Set: Set,
          WeakMap: WeakMap,
          WeakSet: WeakSet,
          ArrayBuffer: ArrayBuffer,
          Math: Math,
          Promise: Promise,
          RegExp: RegExp,
          DataView: DataView,
          isFinite: isFinite,
          parseInt: parseInt,
          parseFloat: parseFloat,
          Float32Array: Float32Array,
          Float64Array: Float64Array,
          Int8Array: Int8Array,
          Int16Array: Int16Array,
          Int32Array: Int32Array,
          Uint8Array: Uint8Array,
          Uint16Array: Uint16Array,
          Uint32Array: Uint32Array,
          Uint8ClampedArray: Uint8ClampedArray,
          setTimeout: setTimeout,
          clearTimeout: clearTimeout,
          setInterval: setInterval,
          clearInterval: clearInterval
        })
      }).call(this, r(95)(t))
    },
    1014: function(t, e, r) {
      var i = function(t, e, r) {
        return e && n(t.prototype, e), r && n(t, r), t
      };

      function n(t, e) {
        for (var r = 0; r < e.length; r++) {
          var i = e[r];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
      }

      function s(t, e) {
        if (t) return !e || "object" != _typeof4(e) && "function" != typeof e ? t : e;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
      }

      function a(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof4(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
      }

      function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
      }
      var h = r(69).BigInteger;

      function l() {
        o(this, l), this.tlv = null, this.t = "00", this.l = "00", this.v = ""
      }
      i(l, [{
        key: "getEncodedHex",
        value: function() {
          return this.tlv || (this.v = this.getValue(), this.l = this.getLength(), this.tlv = this.t + this.l + this.v), this.tlv
        }
      }, {
        key: "getLength",
        value: function() {
          var t = this.v.length / 2,
            e = t.toString(16);
          return e.length % 2 == 1 && (e = "0" + e), t < 128 ? e : (128 + e.length / 2).toString(16) + e
        }
      }, {
        key: "getValue",
        value: function() {
          return ""
        }
      }]), a(c, r = l), i(c, [{
        key: "getValue",
        value: function() {
          return this.v
        }
      }]);
      var p = c;

      function c(t) {
        o(this, c);
        var e = s(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this));
        return e.t = "02", t && (e.v = function(t) {
          if ("-" !== (e = t.toString(16))[0]) e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
          else {
            for (var e, r = (e = e.substr(1)).length, i = (r % 2 == 1 ? r += 1 : e.match(/^[0-7]/) || (r += 2), ""), n = 0; n < r; n++) i += "f";
            e = (e = (i = new h(i, 16)).xor(t).add(h.ONE)).toString(16).replace(/^-/, "")
          }
          return e
        }(t)), e
      }
      a(u, r), i(u, [{
        key: "getValue",
        value: function() {
          return this.v = this.asn1Array.map((function(t) {
            return t.getEncodedHex()
          })).join(""), this.v
        }
      }]);
      var f = u;

      function u(t) {
        o(this, u);
        var e = s(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this));
        return e.t = "30", e.asn1Array = t, e
      }

      function m(t, e) {
        return +t[e + 2] < 8 ? 1 : 128 & +t.substr(e + 2, 2)
      }

      function d(t, e) {
        var r = m(t, e);
        return (t = t.substr(e + 2, 2 * r)) ? (+t[0] < 8 ? new h(t, 16) : new h(t.substr(2), 16)).intValue() : -1
      }

      function y(t, e) {
        return e + 2 * (m(t, e) + 1)
      }
      t.exports = {
        encodeDer: function(t, e) {
          return t = new p(t), e = new p(e), new f([t, e]).getEncodedHex()
        },
        decodeDer: function(t) {
          var e = y(t, 0),
            r = y(t, e),
            i = (e = d(t, e), e = t.substr(r, 2 * e), y(t, r = r + e.length));
          r = d(t, r), t = t.substr(i, 2 * r);
          return {
            r: new h(e, 16),
            s: new h(t, 16)
          }
        }
      }
    },
    1015: function(t, e, r) {
      var i = (n = r(69)).BigInteger,
        n = n.SecureRandom,
        s = r(1016).ECCurveFp,
        a = new n,
        o = (r = p()).curve,
        h = r.G,
        l = r.n;

      function p() {
        var t = new i("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF", 16),
          e = new i("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC", 16),
          r = new i("28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93", 16);
        e = (t = new s(t, e, r)).decodePointHex("0432C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0");
        return {
          curve: t,
          G: e,
          n: new i("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123", 16)
        }
      }

      function c(t, e) {
        return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
      }
      t.exports = {
        getGlobalCurve: function() {
          return o
        },
        generateEcparam: p,
        generateKeyPairHex: function(t, e, r) {
          return {
            privateKey: e = c((t = (t ? new i(t, e, r) : new i(l.bitLength(), a)).mod(l.subtract(i.ONE)).add(i.ONE)).toString(16), 64),
            publicKey: "04" + c((r = h.multiply(t)).getX().toBigInteger().toString(16), 64) + c(r.getY().toBigInteger().toString(16), 64)
          }
        },
        compressPublicKeyHex: function(t) {
          if (130 !== t.length) throw new Error("Invalid public key to compress");
          var e = (t.length - 2) / 2,
            r = t.substr(2, e),
            n = "03";
          return (n = new i(t.substr(2 + e, e), 16).mod(new i("2")).equals(i.ZERO) ? "02" : n) + r
        },
        utf8ToHex: function(t) {
          for (var e = (t = unescape(encodeURIComponent(t))).length, r = [], i = 0; i < e; i++) r[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8;
          for (var n = [], s = 0; s < e; s++) {
            var a = r[s >>> 2] >>> 24 - s % 4 * 8 & 255;
            n.push((a >>> 4).toString(16)), n.push((15 & a).toString(16))
          }
          return n.join("")
        },
        leftPad: c,
        arrayToHex: function(t) {
          return t.map((function(t) {
            return 1 === (t = t.toString(16)).length ? "0" + t : t
          })).join("")
        },
        arrayToUtf8: function(t) {
          for (var e = [], r = 0, i = 0; i < 2 * t.length; i += 2) e[i >>> 3] |= parseInt(t[r], 10) << 24 - i % 8 * 4, r++;
          try {
            for (var n = [], s = 0; s < t.length; s++) {
              var a = e[s >>> 2] >>> 24 - s % 4 * 8 & 255;
              n.push(String.fromCharCode(a))
            }
            return decodeURIComponent(escape(n.join("")))
          } catch (t) {
            throw new Error("Malformed UTF-8 data")
          }
        },
        hexToArray: function(t) {
          for (var e = [], r = (t = (r = t.length) % 2 != 0 ? c(t, r + 1) : t).length, i = 0; i < r; i += 2) e.push(parseInt(t.substr(i, 2), 16));
          return e
        },
        verifyPublicKey: function(t) {
          var e;
          return !!(t = o.decodePointHex(t)) && (e = t.getX(), t.getY().square().equals(e.multiply(e.square()).add(e.multiply(o.a)).add(o.b)))
        },
        comparePublicKeyHex: function(t, e) {
          return !!(t = o.decodePointHex(t)) && !!(e = o.decodePointHex(e)) && t.equals(e)
        }
      }
    },
    1016: function(t, e, r) {
      var i = function(t, e, r) {
        return e && n(t.prototype, e), r && n(t, r), t
      };

      function n(t, e) {
        for (var r = 0; r < e.length; r++) {
          var i = e[r];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
      }

      function s(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
      }
      var a = r(69).BigInteger,
        o = new a("2"),
        h = new a("3"),
        l = (i(p, [{
          key: "equals",
          value: function(t) {
            return t === this || this.q.equals(t.q) && this.x.equals(t.x)
          }
        }, {
          key: "toBigInteger",
          value: function() {
            return this.x
          }
        }, {
          key: "negate",
          value: function() {
            return new p(this.q, this.x.negate().mod(this.q))
          }
        }, {
          key: "add",
          value: function(t) {
            return new p(this.q, this.x.add(t.toBigInteger()).mod(this.q))
          }
        }, {
          key: "subtract",
          value: function(t) {
            return new p(this.q, this.x.subtract(t.toBigInteger()).mod(this.q))
          }
        }, {
          key: "multiply",
          value: function(t) {
            return new p(this.q, this.x.multiply(t.toBigInteger()).mod(this.q))
          }
        }, {
          key: "divide",
          value: function(t) {
            return new p(this.q, this.x.multiply(t.toBigInteger().modInverse(this.q)).mod(this.q))
          }
        }, {
          key: "square",
          value: function() {
            return new p(this.q, this.x.square().mod(this.q))
          }
        }]), p);

      function p(t, e) {
        s(this, p), this.x = e, this.q = t
      }
      i(f, [{
        key: "getX",
        value: function() {
          return null === this.zinv && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))
        }
      }, {
        key: "getY",
        value: function() {
          return null === this.zinv && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))
        }
      }, {
        key: "equals",
        value: function(t) {
          return t === this || (this.isInfinity() ? t.isInfinity() : t.isInfinity() ? this.isInfinity() : !!t.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(a.ZERO) && t.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(a.ZERO))
        }
      }, {
        key: "isInfinity",
        value: function() {
          return null === this.x && null === this.y || this.z.equals(a.ZERO) && !this.y.toBigInteger().equals(a.ZERO)
        }
      }, {
        key: "negate",
        value: function() {
          return new f(this.curve, this.x, this.y.negate(), this.z)
        }
      }, {
        key: "add",
        value: function(t) {
          var e, r, i, n, s, o, h, l;
          return this.isInfinity() ? t : t.isInfinity() ? this : (r = this.x.toBigInteger(), i = this.y.toBigInteger(), n = this.z, o = t.x.toBigInteger(), l = t.y.toBigInteger(), t = t.z, e = this.curve.q, r = r.multiply(t).mod(e), o = o.multiply(n).mod(e), h = r.subtract(o), i = i.multiply(t).mod(e), l = l.multiply(n).mod(e), l = i.subtract(l), a.ZERO.equals(h) ? a.ZERO.equals(l) ? this.twice() : this.curve.infinity : (o = r.add(o), n = n.multiply(t).mod(e), t = h.square().mod(e), s = h.multiply(t).mod(e), o = n.multiply(l.square()).subtract(o.multiply(t)).mod(e), h = h.multiply(o).mod(e), l = l.multiply(t.multiply(r).subtract(o)).subtract(i.multiply(s)).mod(e), t = s.multiply(n).mod(e), new f(this.curve, this.curve.fromBigInteger(h), this.curve.fromBigInteger(l), t)))
        }
      }, {
        key: "twice",
        value: function() {
          var t, e, r, i, n, s, a, o;
          return this.isInfinity() ? this : this.y.toBigInteger().signum() ? (o = this.x.toBigInteger(), r = this.y.toBigInteger(), i = this.z, t = this.curve.q, a = this.curve.a.toBigInteger(), a = o.square().multiply(h).add(a.multiply(i.square())).mod(t), e = r.shiftLeft(1).multiply(i).mod(t), o = (r = r.square().mod(t)).multiply(o).multiply(i).mod(t), i = e.square().mod(t), n = a.square().subtract(o.shiftLeft(3)).mod(t), s = e.multiply(n).mod(t), a = a.multiply(o.shiftLeft(2).subtract(n)).subtract(i.shiftLeft(1).multiply(r)).mod(t), o = e.multiply(i).mod(t), new f(this.curve, this.curve.fromBigInteger(s), this.curve.fromBigInteger(a), o)) : this.curve.infinity
        }
      }, {
        key: "multiply",
        value: function(t) {
          if (this.isInfinity()) return this;
          if (!t.signum()) return this.curve.infinity;
          for (var e = t.multiply(h), r = this.negate(), i = this, n = e.bitLength() - 2; 0 < n; n--) {
            i = i.twice();
            var s = e.testBit(n);
            s !== t.testBit(n) && (i = i.add(s ? this : r))
          }
          return i
        }
      }]);
      var c = f;

      function f(t, e, r, i) {
        s(this, f), this.curve = t, this.x = e, this.y = r, this.z = null == i ? a.ONE : i, this.zinv = null
      }

      function u(t, e, r) {
        s(this, u), this.q = t, this.a = this.fromBigInteger(e), this.b = this.fromBigInteger(r), this.infinity = new c(this, null, null)
      }
      i(u, [{
        key: "equals",
        value: function(t) {
          return t === this || this.q.equals(t.q) && this.a.equals(t.a) && this.b.equals(t.b)
        }
      }, {
        key: "fromBigInteger",
        value: function(t) {
          return new l(this.q, t)
        }
      }, {
        key: "decodePointHex",
        value: function(t) {
          switch (parseInt(t.substr(0, 2), 16)) {
            case 0:
              return this.infinity;
            case 2:
            case 3:
              var e = this.fromBigInteger(new a(t.substr(2), 16)),
                r = this.fromBigInteger(e.multiply(e.square()).add(e.multiply(this.a)).add(this.b).toBigInteger().modPow(this.q.divide(new a("4")).add(a.ONE), this.q));
              return r.toBigInteger().mod(o).equals(new a(t.substr(0, 2), 16).subtract(o)) || (r = r.negate()), new c(this, e, r);
            case 4:
            case 6:
            case 7:
              return e = (t.length - 2) / 2, r = t.substr(2, e), e = t.substr(2 + e, e), new c(this, this.fromBigInteger(new a(r, 16)), this.fromBigInteger(new a(e, 16)));
            default:
              return null
          }
        }
      }]), r = u, t.exports = {
        ECPointFp: c,
        ECCurveFp: r
      }
    },
    1017: function(t, e) {
      function r(t) {
        if (Array.isArray(t)) {
          for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
          return r
        }
        return Array.from(t)
      }
      var i = new Uint32Array(68),
        n = new Uint32Array(64);

      function s(t, e) {
        return t << (e &= 31) | t >>> 32 - e
      }

      function a(t, e) {
        for (var r = [], i = t.length - 1; 0 <= i; i--) r[i] = 255 & (t[i] ^ e[i]);
        return r
      }

      function o(t) {
        for (var e = 448 <= (e = (u = 8 * t.length) % 512) ? 512 - e % 448 - 1 : 448 - e - 1, a = new Array((e - 7) / 8), o = new Array(8), h = 0, l = a.length; h < l; h++) a[h] = 0;
        for (var p = 0, c = o.length; p < c; p++) o[p] = 0;
        for (var f, u = u.toString(2), m = 7; 0 <= m; m--) 8 < u.length ? (f = u.length - 8, o[m] = parseInt(u.substr(f), 2), u = u.substr(0, f)) : 0 < u.length && (o[m] = parseInt(u, 2), u = "");
        e = new Uint8Array([].concat(r(t), [128], a, o));
        for (var d = new DataView(e.buffer, 0), y = e.length / 64, g = new Uint32Array([1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522, 3817729613, 2969243214]), v = 0; v < y; v++) {
          i.fill(0), n.fill(0);
          for (var b = 16 * v, P = 0; P < 16; P++) i[P] = d.getUint32(4 * (b + P), !1);
          for (var x = 16; x < 68; x++) i[x] = function(t) {
            return t ^ s(t, 15) ^ s(t, 23)
          }(i[x - 16] ^ i[x - 9] ^ s(i[x - 3], 15)) ^ s(i[x - 13], 7) ^ i[x - 6];
          for (var _ = 0; _ < 64; _++) n[_] = i[_] ^ i[_ + 4];
          for (var T, S, E = g[0], w = g[1], A = g[2], C = g[3], D = g[4], k = g[5], I = g[6], F = g[7], M = 0; M < 64; M++) T = (0 <= M && M <= 15 ? E ^ w ^ A : E & w | E & A | w & A) + C + ((S = s(s(E, 12) + D + s(0 <= M && M <= 15 ? 2043430169 : 2055708042, M), 7)) ^ s(E, 12)) + n[M], S = (0 <= M && M <= 15 ? D ^ k ^ I : D & k | ~D & I) + F + S + i[M], C = A, A = s(w, 9), w = E, E = T, F = I, I = s(k, 19), k = D, D = function(t) {
            return t ^ s(t, 9) ^ s(t, 17)
          }(S);
          g[0] ^= E, g[1] ^= w, g[2] ^= A, g[3] ^= C, g[4] ^= D, g[5] ^= k, g[6] ^= I, g[7] ^= F
        }
        for (var R = [], O = 0, L = g.length; O < L; O++) {
          var V = g[O];
          R.push((4278190080 & V) >>> 24, (16711680 & V) >>> 16, (65280 & V) >>> 8, 255 & V)
        }
        return R
      }
      for (var h = new Uint8Array(64), l = new Uint8Array(64), p = 0; p < 64; p++) h[p] = 54, l[p] = 92;
      t.exports = {
        sm3: o,
        hmac: function(t, e) {
          for (64 < e.length && (e = o(e)); e.length < 64;) e.push(0);
          var i = a(e, h),
            n = a(e, l);
          i = o([].concat(r(i), r(t)));
          return o([].concat(r(n), r(i)))
        }
      }
    },
    1019: function(t, e, r) {
      (function(t) {
        var i = "function" == typeof Symbol && "symbol" == _typeof4(Symbol.iterator) ? function(t) {
          return _typeof4(t)
        } : function(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof4(t)
        };
        Object.defineProperty(e, "__esModule", {
          value: !0
        });
        var n = r(94),
          s = function(t) {
            return t && "object" === (void 0 === t ? "undefined" : i(t)) && "default" in t ? t.default : t
          }(n),
          a = null;
        t = t || {};

        function o() {
          return a
        }

        function h(t) {
          a = t
        }

        function l(t) {
          return (l = "function" == typeof Symbol && "symbol" === i(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : i(t)
          } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : i(t)
          })(t)
        }

        function p(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function c(t, e) {
          for (var r = 0; r < e.length; r++) {
            var i = e[r];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }

        function f(t, e, r) {
          e && c(t.prototype, e), r && c(t, r)
        }

        function u(t) {
          return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
          })(t)
        }

        function m(t, e) {
          return (m = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
          })(t, e)
        }

        function d(t, e) {
          return !e || "object" !== (void 0 === e ? "undefined" : i(e)) && "function" != typeof e ? function(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
          }(t) : e
        }

        function y(t, e, r) {
          return (y = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t, e, r) {
            if (t = function(t, e) {
                for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = u(t)););
                return t
              }(t, e)) return (t = Object.getOwnPropertyDescriptor(t, e)).get ? t.get.call(r) : t.value
          })(t, e, r || t)
        }

        function g(t, e) {
          return function(t) {
            if (Array.isArray(t)) return t
          }(t) || function(t, e) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) {
              var r = [],
                i = !0,
                n = !1,
                s = void 0;
              try {
                for (var a, o = t[Symbol.iterator](); !(i = (a = o.next()).done) && (r.push(a.value), !e || r.length !== e); i = !0);
              } catch (t) {
                n = !0, s = t
              } finally {
                try {
                  i || null == o.return || o.return()
                } finally {
                  if (n) throw s
                }
              }
              return r
            }
          }(t, e) || function(t, e) {
            var r;
            if (t) return "string" == typeof t ? v(t, e) : "Map" === (r = "Object" === (r = Object.prototype.toString.call(t).slice(8, -1)) && t.constructor ? t.constructor.name : r) || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? v(t, e) : void 0
          }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
          }()
        }

        function v(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, i = new Array(e); r < e; r++) i[r] = t[r];
          return i
        }

        function b(t) {
          return null != t && "object" === l(t) && !Array.isArray(t)
        }

        function P(t, e) {
          var r = Object.assign({}, t);
          if (b(t) && b(e))
            for (var i in e) b(t[i]) && b(e[i]) ? r[i] = P(t[i], e[i]) : r[i] = e[i];
          return r
        }

        function x(t, e) {
          var r = a,
            i = r.dispatch,
            n = function(t, e) {
              return "function" == typeof t ? t(e) : b(t) ? Object.keys(t).reduce((function(r, i) {
                var n = t[i];
                return "function" == typeof n && (r[i] = function() {
                  return e(n.apply(void 0, arguments))
                }), r
              }), {}) : {}
            }(e, i),
            s = (n.dispatch = i, function() {
              var e = this,
                i = !1,
                s = t(r.getState(), this.props),
                a = Object.assign({}, this.props);
              Object.keys(s).forEach((function(t) {
                var r = s[t];
                b(r) && b(n[t]) && (r = P(r, n[t])), e.props[t] !== r && (e.props[t] = r, i = !0)
              })), i && (this._dirty || (this.prevProps = a), this._unsafeCallUpdate = !0, this.setState({}, (function() {
                delete e._unsafeCallUpdate
              })))
            });
          return function(e) {
            var i = t(r.getState(), e.defaultProps || {}),
              o = (e.properties && i && Object.keys(i).forEach((function(t) {
                delete e.properties[t]
              })), null);
            return function() {
              ! function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                  constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                  }
                }), e && m(t, e)
              }(h, e);
              var i = function(t) {
                var e = function() {
                  if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                  if (Reflect.construct.sham) return !1;
                  if ("function" == typeof Proxy) return !0;
                  try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
                  } catch (t) {
                    return !1
                  }
                }();
                return function() {
                  var r, i = u(t);
                  return d(this, e ? (r = u(this).constructor, Reflect.construct(i, arguments, r)) : i.apply(this, arguments))
                }
              }(h);

              function h(e, s) {
                var a;
                return p(this, h), a = i.call(this, Object.assign.apply(Object, Array.prototype.slice.call(arguments).concat([P(t(r.getState(), e), n)])), s), Object.keys(n).forEach((function(t) {
                  a["__event_".concat(t)] = n[t]
                })), a
              }
              return f(h, [{
                key: "_constructor",
                value: function() {
                  var e;
                  this.$scope && (e = a, Object.assign(this.props, P(t(e.getState(), this.props), n)), o = e.subscribe(s.bind(this))), y(u(h.prototype), "_constructor", this) && y(u(h.prototype), "_constructor", this).call(this, this.props)
                }
              }, {
                key: "componentWillUnmount",
                value: function() {
                  y(u(h.prototype), "componentWillUnmount", this) && y(u(h.prototype), "componentWillUnmount", this).call(this), o && o(), o = null
                }
              }]), h
            }()
          }
        }
        Object.getPrototypeOf(t);
        t = function t() {
          p(this, t)
        };
        var _ = s.createContext(null);

        function T() {
          return n.useContext(_)
        }

        function S() {
          return T().store
        }

        function E() {
          return S().dispatch
        }
        var w = function(t) {
            t()
          },
          A = {
            notify: function() {}
          },
          C = function() {
            function t(e, r) {
              p(this, t), this.store = e, this.parentSub = r, this.unsubscribe = null, this.listeners = A, this.handleChangeWrapper = this.handleChangeWrapper.bind(this)
            }
            return f(t, [{
              key: "addNestedSub",
              value: function(t) {
                return this.trySubscribe(), this.listeners.subscribe(t)
              }
            }, {
              key: "notifyNestedSubs",
              value: function() {
                this.listeners.notify()
              }
            }, {
              key: "handleChangeWrapper",
              value: function() {
                this.onStateChange && this.onStateChange()
              }
            }, {
              key: "isSubscribed",
              value: function() {
                return Boolean(this.unsubscribe)
              }
            }, {
              key: "trySubscribe",
              value: function() {
                this.unsubscribe || (this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.handleChangeWrapper) : this.store.subscribe(this.handleChangeWrapper), this.listeners = function() {
                  var t = w,
                    e = [],
                    r = [];
                  return {
                    clear: function() {
                      e = r = null
                    },
                    notify: function() {
                      var i = e = r;
                      t((function() {
                        for (var t = 0; t < i.length; t++) i[t]()
                      }))
                    },
                    get: function() {
                      return r
                    },
                    subscribe: function(t) {
                      var i = !0;
                      return (r = r === e ? e.slice() : r).push(t),
                        function() {
                          i && null !== e && (i = !1, (r = r === e ? e.slice() : r).splice(r.indexOf(t), 1))
                        }
                    }
                  }
                }())
              }
            }, {
              key: "tryUnsubscribe",
              value: function() {
                this.unsubscribe && (this.unsubscribe(), this.unsubscribe = null, this.listeners.clear(), this.listeners = A)
              }
            }]), t
          }(),
          D = function(t, e) {
            return t === e
          };

        function k(t) {
          var e, r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : D,
            i = (function(t, e, r, i, n, s, a, o) {
              var h, l, p;
              if (!t) throw void 0 === e ? p = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.") : (h = [r, i, n, s, a, o], l = 0, (p = new Error(e.replace(/%s/g, (function() {
                return h[l++]
              })))).name = "Invariant Violation"), p.framesToPop = 1, p
            }(t, "You must pass a selector to useSelectors"), T()),
            s = i.store,
            a = i.subscription,
            o = g(n.useReducer((function(t) {
              return t + 1
            }), 0), 2)[1],
            h = n.useMemo((function() {
              return new C(s, a)
            }), [s, a]),
            l = n.useRef(),
            p = n.useRef(),
            c = n.useRef();
          try {
            e = t !== p.current || l.current ? t(s.getState()) : c.current
          } catch (t) {
            throw i = "An error occured while selecting the store state: ".concat(t.message, "."), l.current && (i += "\nThe error may be correlated with this previous error:\n".concat(l.current.stack, "\n\nOriginal stack trace:")), new Error(i)
          }
          return n.useEffect((function() {
            p.current = t, c.current = e, l.current = void 0
          })), n.useEffect((function() {
            function t() {
              try {
                var t = p.current(s.getState());
                if (r(t, c.current)) return;
                c.current = t
              } catch (t) {
                l.current = t
              }
              o({})
            }
            return h.onStateChange = t, h.trySubscribe(), t(),
              function() {
                return h.tryUnsubscribe()
              }
          }), [s, h]), e
        }
        e.default = {
          connect: x,
          Provider: t,
          getStore: o,
          setStore: h,
          useDispatch: E,
          useSelector: k,
          useStore: S,
          ReduxContext: _
        }, e.connect = x, e.Provider = t, e.getStore = o, e.setStore = h, e.useDispatch = E, e.useSelector = k, e.useStore = S, e.ReduxContext = _
      }).call(this, r(52))
    },
    1887: function(t, e, r) {
      var i = r(1888);

      function n() {}

      function s() {}
      s.resetWarningCache = n, t.exports = function() {
        function t(t, e, r, n, s, a) {
          if (a !== i) throw (a = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")).name = "Invariant Violation", a
        }

        function e() {
          return t
        }
        var r = {
          array: t.isRequired = t,
          bool: t,
          func: t,
          number: t,
          object: t,
          string: t,
          symbol: t,
          any: t,
          arrayOf: e,
          element: t,
          elementType: t,
          instanceOf: e,
          node: t,
          objectOf: e,
          oneOf: e,
          oneOfType: e,
          shape: e,
          exact: e,
          checkPropTypes: s,
          resetWarningCache: n
        };
        return r.PropTypes = r
      }
    },
    1888: function(t, e, r) {
      t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
    },
    23: function(t, e, r) {
      function i(t, e) {
        for (var r = 0; r < e.length; r++) {
          var i = e[r];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
      }
      r.d(e, "a", (function() {
        return a
      })), e = r(0), r = function(t, e, r) {
        return e && i(t.prototype, e), r && i(t, r), t
      };
      var n = "function" == typeof Symbol && "symbol" == _typeof4(Symbol.iterator) ? function(t) {
          return _typeof4(t)
        } : function(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof4(t)
        },
        s = function(t) {
          var e;
          return t && "object" === (void 0 === t ? "undefined" : n(t)) ? (e = "", Object.keys(t).forEach((function(r) {
            var i = r.replace(/([A-Z])/g, "-$1").toLowerCase();
            e += i + ":" + t[r] + ";"
          })), e) : t && "string" == typeof t ? t : ""
        },
        a = (function(t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof4(e));
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(o, e.Component), r(o, [{
          key: "mergeStyle",
          value: function(t, e) {
            return t && "object" === (void 0 === t ? "undefined" : n(t)) && e && "object" === (void 0 === e ? "undefined" : n(e)) ? Object.assign({}, t, e) : s(t) + s(e)
          }
        }]), o);

      function o() {
        return function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }(this, o),
          function(t, e) {
            if (t) return !e || "object" != _typeof4(e) && "function" != typeof e ? t : e;
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
          }(this, (o.__proto__ || Object.getPrototypeOf(o)).apply(this, arguments))
      }
      a.options = {
        addGlobalClass: !0
      }
    },
    29: function _(module, exports) {
      var _typeof2 = "function" == typeof Symbol && "symbol" == _typeof4(Symbol.iterator) ? function(t) {
        return _typeof4(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof4(t)
      };
      ! function(t, e) {
        for (var r in e) t[r] = e[r]
      }(exports, function(t) {
        var e = {};

        function r(i) {
          var n;
          return (e[i] || (n = e[i] = {
            i: i,
            l: !1,
            exports: {}
          }, t[i].call(n.exports, n, n.exports, r), n.l = !0, n)).exports
        }
        return r.m = t, r.c = e, r.d = function(t, e, i) {
          r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: i
          })
        }, r.r = function(t) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(t, "__esModule", {
            value: !0
          })
        }, r.t = function(t, e) {
          if (1 & e && (t = r(t)), 8 & e) return t;
          if (4 & e && "object" == (void 0 === t ? "undefined" : _typeof2(t)) && t && t.__esModule) return t;
          var i = Object.create(null);
          if (r.r(i), Object.defineProperty(i, "default", {
              enumerable: !0,
              value: t
            }), 2 & e && "string" != typeof t)
            for (var n in t) r.d(i, n, function(e) {
              return t[e]
            }.bind(null, n));
          return i
        }, r.n = function(t) {
          var e = t && t.__esModule ? function() {
            return t.default
          } : function() {
            return t
          };
          return r.d(e, "a", e), e
        }, r.o = function(t, e) {
          return Object.prototype.hasOwnProperty.call(t, e)
        }, r.p = "", r(r.s = 1)
      }([function(t, e, r) {
        function i(t, e, r) {
          e in t ? Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : t[e] = r
        }
        var n = new WeakMap,
          s = new WeakMap,
          a = new WeakMap,
          o = new WeakMap,
          h = new WeakMap;

        function l(t) {
          if ("function" == typeof this["on".concat(t)]) {
            for (var e = arguments.length, r = new Array(1 < e ? e - 1 : 0), i = 1; i < e; i++) r[i - 1] = arguments[i];
            this["on".concat(t)].apply(this, r)
          }
        }

        function p(t) {
          this.readyState = t, l.call(this, "readystatechange")
        }! function(t, e) {
          for (var r = 0; r < e.length; r++) {
            var i = e[r];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }(f.prototype, [{
          key: "abort",
          value: function() {
            var t = h.get(this);
            t && t.abort()
          }
        }, {
          key: "getAllResponseHeaders",
          value: function() {
            var t = o.get(this);
            return Object.keys(t).map((function(e) {
              return "".concat(e, ": ").concat(t[e])
            })).join("\n")
          }
        }, {
          key: "getResponseHeader",
          value: function(t) {
            return o.get(this)[t]
          }
        }, {
          key: "open",
          value: function(t, e) {
            s.set(this, t), n.set(this, e), p.call(this, f.OPENED)
          }
        }, {
          key: "overrideMimeType",
          value: function() {}
        }, {
          key: "send",
          value: function() {
            var t = this,
              e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
            if (this.readyState !== f.OPENED) throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
            wx.request({
              data: e,
              url: n.get(this),
              method: s.get(this),
              header: a.get(this),
              success: function(e) {
                var r = e.data,
                  i = e.statusCode;
                e = e.header;
                if ("string" != typeof r && !(r instanceof ArrayBuffer)) try {
                  r = JSON.stringify(r)
                } catch (t) {}
                if (t.status = i, o.set(t, e), l.call(t, "loadstart"), p.call(t, f.HEADERS_RECEIVED), p.call(t, f.LOADING), (t.response = r) instanceof ArrayBuffer) {
                  t.responseText = "";
                  for (var n = new Uint8Array(r), s = n.byteLength, a = 0; a < s; a++) t.responseText += String.fromCharCode(n[a])
                } else t.responseText = r;
                p.call(t, f.DONE), l.call(t, "load"), l.call(t, "loadend")
              },
              fail: function(e) {
                -1 !== (e = e.errMsg).indexOf("abort") ? l.call(t, "abort") : l.call(t, "error", e), l.call(t, "loadend")
              }
            })
          }
        }, {
          key: "setRequestHeader",
          value: function(t, e) {
            var r = a.get(this);
            r[t] = e, a.set(this, r)
          }
        }]);
        var c = f;

        function f() {
          if (!(this instanceof f)) throw new TypeError("Cannot call a class as a function");
          i(this, "onabort", null), i(this, "onerror", null), i(this, "onload", null), i(this, "onloadstart", null), i(this, "onprogress", null), i(this, "ontimeout", null), i(this, "onloadend", null), i(this, "onreadystatechange", null), i(this, "readyState", 0), i(this, "response", null), i(this, "responseText", null), i(this, "responseType", ""), i(this, "responseXML", null), i(this, "status", 0), i(this, "statusText", ""), i(this, "upload", {}), i(this, "withCredentials", !1), a.set(this, {
            "content-type": "application/x-www-form-urlencoded"
          }), o.set(this, {})
        }

        function u() {}

        function m() {}

        function d(t) {
          return "canvas" === t ? {
            getContext: function() {
              return {
                fillRect: u,
                createImage: m,
                drawImage: m
              }
            }
          } : "img" === t ? void 0 === (t = this).createImage ? {} : ((e = t.createImage()).addEventListener = e.addEventListener || function(t, r) {
            "load" === t ? e.onload = function() {
              setTimeout(r, 0)
            } : "error" === t && (e.onerror = r)
          }, e) : void 0;
          var e
        }

        function y(t, e) {
          return function(r) {
            return e.call(t, Array.from(r))
          }
        }

        function g(t, e) {
          return function() {
            return e.call(t)
          }
        }

        function v(t, e, r) {
          var i = t[e];
          Object.defineProperty(t, e, {
            get: function() {
              return r(t, i)
            },
            configurable: !0,
            enumerable: !0
          })
        }
        i(c, "UNSEND", 0), i(c, "OPENED", 1), i(c, "HEADERS_RECEIVED", 2), i(c, "LOADING", 3), i(c, "DONE", 4), r.d(e, "c", (function() {
          return P
        })), r.d(e, "b", (function() {
          return x
        })), r.d(e, "a", (function() {
          return b
        }));
        r = wx.getSystemInfoSync();
        var b = {
            requestAnimationFrame: function(t) {
              setTimeout((function() {
                "function" == typeof t && t(Date.now())
              }), 16)
            }
          },
          P = (b.window = {
            devicePixelRatio: r.pixelRatio
          }, b.document = b.window.document = {
            body: {},
            createElement: d
          }, b.navigator = b.window.navigator = {
            userAgent: ""
          }, XMLHttpRequest = c, function(t) {
            var e = b.window,
              r = b.document;
            (e = (b._requestAnimationFrame = e.requestAnimationFrame, b._cancelAnimationFrame = e.cancelAnimationFrame, e.requestAnimationFrame = function(e) {
              var r = !1;
              setTimeout((function() {
                r || (r = !0, "function" == typeof e && e(Date.now()))
              }), 100), t.requestAnimationFrame((function(t) {
                r || (r = !0, "function" == typeof e && e(t))
              }))
            }, e.cancelAnimationFrame = t.cancelAnimationFrame.bind(t), b._body = r.body, b._createElement = r.createElement, r.body = {}, r.createElement = d.bind(t), t.getContext("2d"))).canvas || (e.canvas = t), v(e, "setLineDash", y), v(e, "fill", g)
          }),
          x = function() {
            var t = b.window,
              e = b.document;
            t.requestAnimationFrame = b._requestAnimationFrame, t.cancelAnimationFrame = b._cancelAnimationFrame, e.body = b._body, e.createElement = b._createElement
          }
      }, function(module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__),
          function(module) {
            __webpack_require__.d(__webpack_exports__, "loadAnimation", (function() {
              return loadAnimation
            })), __webpack_require__.d(__webpack_exports__, "freeze", (function() {
              return freeze
            })), __webpack_require__.d(__webpack_exports__, "unfreeze", (function() {
              return unfreeze
            }));
            var _adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);

            function _typeof(t) {
              return (_typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(t) {
                return void 0 === t ? "undefined" : _typeof2(t)
              } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof2(t)
              })(t)
            }
            __webpack_require__.d(__webpack_exports__, "setup", (function() {
              return _adapter__WEBPACK_IMPORTED_MODULE_0__.c
            }));
            var window = _adapter__WEBPACK_IMPORTED_MODULE_0__.a.window,
              document = _adapter__WEBPACK_IMPORTED_MODULE_0__.a.document,
              navigator = _adapter__WEBPACK_IMPORTED_MODULE_0__.a.navigator;

            function loadAnimation(t) {
              if (["wrapper", "container"].forEach((function(e) {
                  if (e in t) throw new Error("Not support '".concat(e, "' parameter in miniprogram version of lottie."))
                })), "string" == typeof t.path && !/^https?\:\/\//.test(t.path)) throw new Error("The 'path' is only support http protocol.");
              if (!t.rendererSettings || !t.rendererSettings.context) throw new Error("Parameter 'rendererSettings.context' should be a CanvasRenderingContext2D.");
              t.renderer = "canvas";
              var e = window.lottie.loadAnimation(t),
                r = e.destroy.bind(e);
              return e.destroy = function() {
                Object(_adapter__WEBPACK_IMPORTED_MODULE_0__.b)(), e.renderer && !e.renderer.destroyed && (e.renderer.renderConfig.clearCanvas = !1), r()
              }.bind(e), e
            }
            void 0 !== navigator && function(t, e) {
              "object" === _typeof(module) && module.exports ? module.exports = e(t) : (t.lottie = e(t), t.bodymovin = t.lottie)
            }(window || {}, (function(window) {
              var svgNS = "http://www.w3.org/2000/svg",
                locationHref = "",
                initialDefaultFrame = -999999,
                subframeEnabled = !0,
                expressionsPlugin, isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
                cachedColors = {},
                bm_rounder = Math.round,
                bm_rnd, bm_pow = Math.pow,
                bm_sqrt = Math.sqrt,
                bm_abs = Math.abs,
                bm_floor = Math.floor,
                bm_max = Math.max,
                bm_min = Math.min,
                blitter = 10,
                BMMath = {};

              function ProjectInterface() {
                return {}
              }! function() {
                for (var t = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"], e = t.length, r = 0; r < e; r += 1) BMMath[t[r]] = Math[t[r]]
              }(), BMMath.random = Math.random, BMMath.abs = function(t) {
                if ("object" === _typeof(t) && t.length) {
                  for (var e = createSizedArray(t.length), r = t.length, i = 0; i < r; i += 1) e[i] = Math.abs(t[i]);
                  return e
                }
                return Math.abs(t)
              };
              var defaultCurveSegments = 150,
                degToRads = Math.PI / 180,
                roundCorner = .5519;

              function roundValues(t) {
                bm_rnd = t ? Math.round : function(t) {
                  return t
                }
              }

              function styleDiv(t) {
                t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.display = "block", t.style.transformOrigin = t.style.webkitTransformOrigin = "0 0", t.style.backfaceVisibility = t.style.webkitBackfaceVisibility = "visible", t.style.transformStyle = t.style.webkitTransformStyle = t.style.mozTransformStyle = "preserve-3d"
              }

              function BMEnterFrameEvent(t, e, r, i) {
                this.type = t, this.currentTime = e, this.totalTime = r, this.direction = i < 0 ? -1 : 1
              }

              function BMCompleteEvent(t, e) {
                this.type = t, this.direction = e < 0 ? -1 : 1
              }

              function BMCompleteLoopEvent(t, e, r, i) {
                this.type = t, this.currentLoop = r, this.totalLoops = e, this.direction = i < 0 ? -1 : 1
              }

              function BMSegmentStartEvent(t, e, r) {
                this.type = t, this.firstFrame = e, this.totalFrames = r
              }

              function BMDestroyEvent(t, e) {
                this.type = t, this.target = e
              }
              roundValues(!1);
              var createElementID = (_count = 0, function() {
                  return "__lottie_element_" + ++_count
                }),
                _count;

              function HSVtoRGB(t, e, r) {
                var i, n, s, a, o = r * (1 - e),
                  h = r * (1 - (a = 6 * t - (t = Math.floor(6 * t))) * e),
                  l = r * (1 - (1 - a) * e);
                switch (t % 6) {
                  case 0:
                    i = r, n = l, s = o;
                    break;
                  case 1:
                    i = h, n = r, s = o;
                    break;
                  case 2:
                    i = o, n = r, s = l;
                    break;
                  case 3:
                    i = o, n = h, s = r;
                    break;
                  case 4:
                    i = l, n = o, s = r;
                    break;
                  case 5:
                    i = r, n = o, s = h
                }
                return [i, n, s]
              }

              function RGBtoHSV(t, e, r) {
                var i, n = Math.max(t, e, r),
                  s = Math.min(t, e, r),
                  a = n - s,
                  o = 0 === n ? 0 : a / n,
                  h = n / 255;
                switch (n) {
                  case s:
                    i = 0;
                    break;
                  case t:
                    i = e - r + a * (e < r ? 6 : 0), i /= 6 * a;
                    break;
                  case e:
                    i = r - t + 2 * a, i /= 6 * a;
                    break;
                  case r:
                    i = t - e + 4 * a, i /= 6 * a
                }
                return [i, o, h]
              }

              function addSaturationToRGB(t, e) {
                return (t = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]))[1] += e, 1 < t[1] ? t[1] = 1 : t[1] <= 0 && (t[1] = 0), HSVtoRGB(t[0], t[1], t[2])
              }

              function addBrightnessToRGB(t, e) {
                return (t = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]))[2] += e, 1 < t[2] ? t[2] = 1 : t[2] < 0 && (t[2] = 0), HSVtoRGB(t[0], t[1], t[2])
              }

              function addHueToRGB(t, e) {
                return (t = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]))[0] += e / 360, 1 < t[0] ? --t[0] : t[0] < 0 && (t[0] += 1), HSVtoRGB(t[0], t[1], t[2])
              }
              var rgbToHex = function() {
                for (var t, e = [], r = 0; r < 256; r += 1) t = r.toString(16), e[r] = 1 == t.length ? "0" + t : t;
                return function(t, r, i) {
                  return "#" + e[t = t < 0 ? 0 : t] + e[r = r < 0 ? 0 : r] + e[i = i < 0 ? 0 : i]
                }
              }();

              function BaseEvent() {}
              BaseEvent.prototype = {
                triggerEvent: function(t, e) {
                  if (this._cbs[t])
                    for (var r = this._cbs[t].length, i = 0; i < r; i++) this._cbs[t][i](e)
                },
                addEventListener: function(t, e) {
                  return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e),
                    function() {
                      this.removeEventListener(t, e)
                    }.bind(this)
                },
                removeEventListener: function(t, e) {
                  if (e) {
                    if (this._cbs[t]) {
                      for (var r = 0, i = this._cbs[t].length; r < i;) this._cbs[t][r] === e && (this._cbs[t].splice(r, 1), --r, --i), r += 1;
                      this._cbs[t].length || (this._cbs[t] = null)
                    }
                  } else this._cbs[t] = null
                }
              };
              var createTypedArray = "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function(t, e) {
                return "float32" === t ? new Float32Array(e) : "int16" === t ? new Int16Array(e) : "uint8c" === t ? new Uint8ClampedArray(e) : void 0
              } : function(t, e) {
                var r, i = 0,
                  n = [];
                switch (t) {
                  case "int16":
                  case "uint8c":
                    r = 1;
                    break;
                  default:
                    r = 1.1
                }
                for (i = 0; i < e; i += 1) n.push(r);
                return n
              };

              function createSizedArray(t) {
                return Array.apply(null, {
                  length: t
                })
              }

              function createTag(t) {
                return document.createElement(t)
              }

              function DynamicPropertyContainer() {}
              DynamicPropertyContainer.prototype = {
                addDynamicProperty: function(t) {
                  -1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), this._isAnimated = !0)
                },
                iterateDynamicProperties: function() {
                  this._mdf = !1;
                  for (var t = this.dynamicProperties.length, e = 0; e < t; e += 1) this.dynamicProperties[e].getValue(), this.dynamicProperties[e]._mdf && (this._mdf = !0)
                },
                initDynamicPropertyContainer: function(t) {
                  this.container = t, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1
                }
              };
              var getBlendMode = (blendModeEnums = {
                  0: "source-over",
                  1: "multiply",
                  2: "screen",
                  3: "overlay",
                  4: "darken",
                  5: "lighten",
                  6: "color-dodge",
                  7: "color-burn",
                  8: "hard-light",
                  9: "soft-light",
                  10: "difference",
                  11: "exclusion",
                  12: "hue",
                  13: "saturation",
                  14: "color",
                  15: "luminosity"
                }, function(t) {
                  return blendModeEnums[t] || ""
                }),
                blendModeEnums, Matrix = function() {
                  var t = Math.cos,
                    e = Math.sin,
                    r = Math.tan,
                    i = Math.round;

                  function n() {
                    return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this
                  }

                  function s(r) {
                    var i;
                    return 0 === r ? this : (i = t(r), r = e(r), this._t(i, -r, 0, 0, r, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1))
                  }

                  function a(r) {
                    var i;
                    return 0 === r ? this : (i = t(r), r = e(r), this._t(1, 0, 0, 0, 0, i, -r, 0, 0, r, i, 0, 0, 0, 0, 1))
                  }

                  function o(r) {
                    var i;
                    return 0 === r ? this : (i = t(r), r = e(r), this._t(i, 0, r, 0, 0, 1, 0, 0, -r, 0, i, 0, 0, 0, 0, 1))
                  }

                  function h(r) {
                    var i;
                    return 0 === r ? this : (i = t(r), r = e(r), this._t(i, -r, 0, 0, r, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1))
                  }

                  function l(t, e) {
                    return this._t(1, e, t, 1, 0, 0)
                  }

                  function p(t, e) {
                    return this.shear(r(t), r(e))
                  }

                  function c(i, n) {
                    var s = t(n);
                    n = e(n);
                    return this._t(s, n, 0, 0, -n, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, r(i), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(s, -n, 0, 0, n, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                  }

                  function f(t, e, r) {
                    return r || 0 === r || (r = 1), 1 === t && 1 === e && 1 === r ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1)
                  }

                  function u(t, e, r, i, n, s, a, o, h, l, p, c, f, u, m, d) {
                    return this.props[0] = t, this.props[1] = e, this.props[2] = r, this.props[3] = i, this.props[4] = n, this.props[5] = s, this.props[6] = a, this.props[7] = o, this.props[8] = h, this.props[9] = l, this.props[10] = p, this.props[11] = c, this.props[12] = f, this.props[13] = u, this.props[14] = m, this.props[15] = d, this
                  }

                  function m(t, e, r) {
                    return r = r || 0, 0 !== t || 0 !== e || 0 !== r ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, r, 1) : this
                  }

                  function d(t, e, r, i, n, s, a, o, h, l, p, c, f, u, m, d) {
                    var y, g, v, b, P, x, _, T, S, E, w, A, C, D, k, I, F = this.props;
                    return 1 === t && 0 === e && 0 === r && 0 === i && 0 === n && 1 === s && 0 === a && 0 === o && 0 === h && 0 === l && 1 === p && 0 === c ? (F[12] = F[12] * t + F[15] * f, F[13] = F[13] * s + F[15] * u, F[14] = F[14] * p + F[15] * m, F[15] = F[15] * d, this._identityCalculated = !1) : (y = F[0], g = F[1], v = F[2], b = F[3], P = F[4], x = F[5], _ = F[6], T = F[7], S = F[8], E = F[9], w = F[10], A = F[11], C = F[12], D = F[13], k = F[14], I = F[15], F[0] = y * t + g * n + v * h + b * f, F[1] = y * e + g * s + v * l + b * u, F[2] = y * r + g * a + v * p + b * m, F[3] = y * i + g * o + v * c + b * d, F[4] = P * t + x * n + _ * h + T * f, F[5] = P * e + x * s + _ * l + T * u, F[6] = P * r + x * a + _ * p + T * m, F[7] = P * i + x * o + _ * c + T * d, F[8] = S * t + E * n + w * h + A * f, F[9] = S * e + E * s + w * l + A * u, F[10] = S * r + E * a + w * p + A * m, F[11] = S * i + E * o + w * c + A * d, F[12] = C * t + D * n + k * h + I * f, F[13] = C * e + D * s + k * l + I * u, F[14] = C * r + D * a + k * p + I * m, F[15] = C * i + D * o + k * c + I * d, this._identityCalculated = !1), this
                  }

                  function y() {
                    return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = !0), this._identity
                  }

                  function g(t) {
                    for (var e = 0; e < 16;) {
                      if (t.props[e] !== this.props[e]) return !1;
                      e += 1
                    }
                    return !0
                  }

                  function v(t) {
                    for (var e = 0; e < 16; e += 1) t.props[e] = this.props[e]
                  }

                  function b(t) {
                    for (var e = 0; e < 16; e += 1) this.props[e] = t[e]
                  }

                  function P(t, e, r) {
                    return {
                      x: t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12],
                      y: t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13],
                      z: t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
                    }
                  }

                  function x(t, e, r) {
                    return t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12]
                  }

                  function _(t, e, r) {
                    return t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13]
                  }

                  function T(t, e, r) {
                    return t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
                  }

                  function S(t) {
                    var e = this.props[0] * this.props[5] - this.props[1] * this.props[4],
                      r = this.props[5] / e,
                      i = -this.props[1] / e,
                      n = -this.props[4] / e,
                      s = this.props[0] / e,
                      a = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / e;
                    e = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / e;
                    return [t[0] * r + t[1] * n + a, t[0] * i + t[1] * s + e, 0]
                  }

                  function E(t) {
                    for (var e = t.length, r = [], i = 0; i < e; i += 1) r[i] = S(t[i]);
                    return r
                  }

                  function w(t, e, r) {
                    var i, n, s, a, o, h, l = createTypedArray("float32", 6);
                    return this.isIdentity() ? (l[0] = t[0], l[1] = t[1], l[2] = e[0], l[3] = e[1], l[4] = r[0], l[5] = r[1]) : (i = this.props[0], n = this.props[1], s = this.props[4], a = this.props[5], o = this.props[12], h = this.props[13], l[0] = t[0] * i + t[1] * s + o, l[1] = t[0] * n + t[1] * a + h, l[2] = e[0] * i + e[1] * s + o, l[3] = e[0] * n + e[1] * a + h, l[4] = r[0] * i + r[1] * s + o, l[5] = r[0] * n + r[1] * a + h), l
                  }

                  function A(t, e, r) {
                    return this.isIdentity() ? [t, e, r] : [t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]]
                  }

                  function C(t, e) {
                    var r;
                    return this.isIdentity() ? t + "," + e : (r = this.props, Math.round(100 * (t * r[0] + e * r[4] + r[12])) / 100 + "," + Math.round(100 * (t * r[1] + e * r[5] + r[13])) / 100)
                  }

                  function D() {
                    for (var t = 0, e = this.props, r = "matrix3d("; t < 16;) r = r + i(1e4 * e[t]) / 1e4 + (15 === t ? ")" : ","), t += 1;
                    return r
                  }

                  function k(t) {
                    return t < 1e-6 && 0 < t || -1e-6 < t && t < 0 ? i(1e4 * t) / 1e4 : t
                  }

                  function I() {
                    var t = this.props;
                    return "matrix(" + k(t[0]) + "," + k(t[1]) + "," + k(t[4]) + "," + k(t[5]) + "," + k(t[12]) + "," + k(t[13]) + ")"
                  }
                  return function() {
                    this.reset = n, this.rotate = s, this.rotateX = a, this.rotateY = o, this.rotateZ = h, this.skew = p, this.skewFromAxis = c, this.shear = l, this.scale = f, this.setTransform = u, this.translate = m, this.transform = d, this.applyToPoint = P, this.applyToX = x, this.applyToY = _, this.applyToZ = T, this.applyToPointArray = A, this.applyToTriplePoints = w, this.applyToPointStringified = C, this.toCSS = D, this.to2dCSS = I, this.clone = v, this.cloneFromProps = b, this.equals = g, this.inversePoints = E, this.inversePoint = S, this._t = this.transform, this.isIdentity = y, this._identity = !0, this._identityCalculated = !1, this.props = createTypedArray("float32", 16), this.reset()
                  }
                }(),
                BezierFactory = (function(t, e) {
                  var r = this,
                    i = 256,
                    n = e.pow(i, 6),
                    s = e.pow(2, 52),
                    a = 2 * s,
                    o = 255;

                  function h(t) {
                    var e, r = t.length,
                      n = this,
                      s = 0,
                      a = n.i = n.j = 0,
                      h = n.S = [];
                    for (r || (t = [r++]); s < i;) h[s] = s++;
                    for (s = 0; s < i; s++) h[s] = h[a = o & a + t[s % r] + (e = h[s])], h[a] = e;
                    n.g = function(t) {
                      for (var e, r = 0, s = n.i, a = n.j, h = n.S; t--;) e = h[s = o & s + 1], r = r * i + h[o & (h[s] = h[a = o & a + e]) + (h[a] = e)];
                      return n.i = s, n.j = a, r
                    }
                  }

                  function l(t, e) {
                    return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e
                  }

                  function p(t, e) {
                    for (var r, i = t + "", n = 0; n < i.length;) e[o & n] = o & (r ^= 19 * e[o & n]) + i.charCodeAt(n++);
                    return c(e)
                  }

                  function c(t) {
                    return String.fromCharCode.apply(0, t)
                  }
                  e.seedrandom = function(o, f, u) {
                    var m = [],
                      d = (o = p(function t(e, r) {
                        var i, n = [],
                          s = _typeof(e);
                        if (r && "object" == s)
                          for (i in e) try {
                            n.push(t(e[i], r - 1))
                          } catch (t) {}
                        return n.length ? n : "string" == s ? e : e + "\0"
                      }((f = !0 === f ? {
                        entropy: !0
                      } : f || {}).entropy ? [o, c(t)] : null === o ? function() {
                        try {
                          var e = new Uint8Array(i);
                          return (r.crypto || r.msCrypto).getRandomValues(e), c(e)
                        } catch (e) {
                          var n = (n = r.navigator) && n.plugins;
                          return [+new Date, r, n, r.screen, c(t)]
                        }
                      }() : o, 3), m), new h(m));
                    return (m = function() {
                      for (var t = d.g(6), e = n, r = 0; t < s;) t = (t + r) * i, e *= i, r = d.g(1);
                      for (; a <= t;) t /= 2, e /= 2, r >>>= 1;
                      return (t + r) / e
                    }).int32 = function() {
                      return 0 | d.g(4)
                    }, m.quick = function() {
                      return d.g(4) / 4294967296
                    }, m.double = m, p(c(d.S), t), (f.pass || u || function(t, r, i, n) {
                      return n && (n.S && l(n, d), t.state = function() {
                        return l(d, {})
                      }), i ? (e.random = t, r) : t
                    })(m, o, "global" in f ? f.global : this == e, f.state)
                  }, p(e.random(), t)
                }([], BMMath), function() {
                  var t = {
                      getBezierEasing: function(t, r, i, n, s) {
                        return s = s || ("bez_" + t + "_" + r + "_" + i + "_" + n).replace(/\./g, "p"), e[s] || (t = new o([t, r, i, n]), e[s] = t)
                      }
                    },
                    e = {},
                    r = "function" == typeof Float32Array;

                  function i(t, e) {
                    return 1 - 3 * e + 3 * t
                  }

                  function n(t, e) {
                    return 3 * e - 6 * t
                  }

                  function s(t, e, r) {
                    return ((i(e, r) * t + n(e, r)) * t + 3 * e) * t
                  }

                  function a(t, e, r) {
                    return 3 * i(e, r) * t * t + 2 * n(e, r) * t + 3 * e
                  }

                  function o(t) {
                    this._p = t, this._mSampleValues = new(r ? Float32Array : Array)(11), this._precomputed = !1, this.get = this.get.bind(this)
                  }
                  return o.prototype = {
                    get: function(t) {
                      var e = this._p[0],
                        r = this._p[1],
                        i = this._p[2],
                        n = this._p[3];
                      return this._precomputed || this._precompute(), e === r && i === n ? t : 0 === t ? 0 : 1 === t ? 1 : s(this._getTForX(t), r, n)
                    },
                    _precompute: function() {
                      var t = this._p[0],
                        e = this._p[1],
                        r = this._p[2],
                        i = this._p[3];
                      this._precomputed = !0, t === e && r === i || this._calcSampleValues()
                    },
                    _calcSampleValues: function() {
                      for (var t = this._p[0], e = this._p[2], r = 0; r < 11; ++r) this._mSampleValues[r] = s(.1 * r, t, e)
                    },
                    _getTForX: function(t) {
                      for (var e = this._p[0], r = this._p[2], i = this._mSampleValues, n = 0, o = 1; 10 !== o && i[o] <= t; ++o) n += .1;
                      var h = n + (t - i[--o]) / (i[o + 1] - i[o]) * .1,
                        l = a(h, e, r);
                      if (.001 <= l) {
                        for (var p = t, c = h, f = e, u = r, m = 0; m < 4; ++m) {
                          var d = a(c, f, u);
                          if (0 === d) return c;
                          c -= (s(c, f, u) - p) / d
                        }
                        return c
                      }
                      if (0 === l) return h;
                      for (var y, g, v = t, b = n, P = n + .1, x = e, _ = r, T = 0; 0 < (y = s(g = b + (P - b) / 2, x, _) - v) ? P = g : b = g, 1e-7 < Math.abs(y) && ++T < 10;);
                      return g
                    }
                  }, t
                }());

              function extendPrototype(t, e) {
                for (var r, i = t.length, n = 0; n < i; n += 1)
                  for (var s in r = t[n].prototype) r.hasOwnProperty(s) && (e.prototype[s] = r[s])
              }

              function getDescriptor(t, e) {
                return Object.getOwnPropertyDescriptor(t, e)
              }

              function createProxyFunction(t) {
                function e() {}
                return e.prototype = t, e
              }

              function bezFunction() {
                function t(t, e, r, i, n, s) {
                  return -.001 < (n = t * i + e * n + r * s - n * i - s * t - r * e) && n < .001
                }
                Math;
                var e, r = function(t, e, r, i) {
                  for (var n, s, a, o, h = defaultCurveSegments, l = 0, p = [], c = [], f = bezier_length_pool.newElement(), u = r.length, m = 0; m < h; m += 1) {
                    for (a = m / (h - 1), n = o = 0; n < u; n += 1) s = bm_pow(1 - a, 3) * t[n] + 3 * bm_pow(1 - a, 2) * a * r[n] + 3 * (1 - a) * bm_pow(a, 2) * i[n] + bm_pow(a, 3) * e[n], p[n] = s, null !== c[n] && (o += bm_pow(p[n] - c[n], 2)), c[n] = p[n];
                    o && (l += o = bm_sqrt(o)), f.percents[m] = a, f.lengths[m] = l
                  }
                  return f.addedLength = l, f
                };

                function i(t) {
                  this.segmentLength = 0, this.points = new Array(t)
                }

                function n(t, e) {
                  this.partialLength = t, this.point = e
                }

                function s(t, e) {
                  var r = e.percents,
                    i = e.lengths,
                    n = r.length,
                    s = bm_floor((n - 1) * t),
                    a = t * e.addedLength,
                    o = 0;
                  if (s === n - 1 || 0 === s || a === i[s]) return r[s];
                  for (var h = i[s] > a ? -1 : 1, l = !0; l;)
                    if (i[s] <= a && i[s + 1] > a ? (o = (a - i[s]) / (i[s + 1] - i[s]), l = !1) : s += h, s < 0 || n - 1 <= s) {
                      if (s === n - 1) return r[s];
                      l = !1
                    } return r[s] + (r[s + 1] - r[s]) * o
                }
                e = {};
                var a = createTypedArray("float32", 8);
                return {
                  getSegmentsLength: function(t) {
                    for (var e = segments_length_pool.newElement(), i = t.c, n = t.v, s = t.o, a = t.i, o = t._length, h = e.lengths, l = 0, p = 0; p < o - 1; p += 1) h[p] = r(n[p], n[p + 1], s[p], a[p + 1]), l += h[p].addedLength;
                    return i && o && (h[p] = r(n[p], n[0], s[p], a[0]), l += h[p].addedLength), e.totalLength = l, e
                  },
                  getNewSegment: function(t, e, r, i, n, o, h) {
                    n = s(n = n < 0 ? 0 : 1 < n ? 1 : n, h), o = s(o = 1 < o ? 1 : o, h);
                    for (var l = t.length, p = 1 - o, c = (h = 1 - n) * h * h, f = n * h * h * 3, u = n * n * h * 3, m = n * n * n, d = h * h * p, y = n * h * p + h * n * p + h * h * o, g = n * n * p + h * n * o + n * h * o, v = n * n * o, b = h * p * p, P = n * p * p + h * o * p + h * p * o, x = n * o * p + h * o * o + n * p * o, _ = n * o * o, T = p * p * p, S = o * p * p + p * o * p + p * p * o, E = o * o * p + p * o * o + o * p * o, w = o * o * o, A = 0; A < l; A += 1) a[4 * A] = Math.round(1e3 * (c * t[A] + f * r[A] + u * i[A] + m * e[A])) / 1e3, a[4 * A + 1] = Math.round(1e3 * (d * t[A] + y * r[A] + g * i[A] + v * e[A])) / 1e3, a[4 * A + 2] = Math.round(1e3 * (b * t[A] + P * r[A] + x * i[A] + _ * e[A])) / 1e3, a[4 * A + 3] = Math.round(1e3 * (T * t[A] + S * r[A] + E * i[A] + w * e[A])) / 1e3;
                    return a
                  },
                  getPointInSegment: function(t, e, r, i, n, a) {
                    return a = 1 - (n = s(n, a)), [Math.round(1e3 * (a * a * a * t[0] + (n * a * a + a * n * a + a * a * n) * r[0] + (n * n * a + a * n * n + n * a * n) * i[0] + n * n * n * e[0])) / 1e3, Math.round(1e3 * (a * a * a * t[1] + (n * a * a + a * n * a + a * a * n) * r[1] + (n * n * a + a * n * n + n * a * n) * i[1] + n * n * n * e[1])) / 1e3]
                  },
                  buildBezierData: function(r, s, a, o) {
                    var h = (r[0] + "_" + r[1] + "_" + s[0] + "_" + s[1] + "_" + a[0] + "_" + a[1] + "_" + o[0] + "_" + o[1]).replace(/\./g, "p");
                    if (!e[h]) {
                      for (var l, p, c, f, u, m = defaultCurveSegments, d = 0, y = null, g = new i(m = 2 === r.length && (r[0] != s[0] || r[1] != s[1]) && t(r[0], r[1], s[0], s[1], r[0] + a[0], r[1] + a[1]) && t(r[0], r[1], s[0], s[1], s[0] + o[0], s[1] + o[1]) ? 2 : m), v = a.length, b = 0; b < m; b += 1) {
                        for (u = createSizedArray(v), c = b / (m - 1), l = f = 0; l < v; l += 1) p = bm_pow(1 - c, 3) * r[l] + 3 * bm_pow(1 - c, 2) * c * (r[l] + a[l]) + 3 * (1 - c) * bm_pow(c, 2) * (s[l] + o[l]) + bm_pow(c, 3) * s[l], u[l] = p, null !== y && (f += bm_pow(u[l] - y[l], 2));
                        d += f = bm_sqrt(f), g.points[b] = new n(f, u), y = u
                      }
                      g.segmentLength = d, e[h] = g
                    }
                    return e[h]
                  },
                  pointOnLine2D: t,
                  pointOnLine3D: function(e, r, i, n, s, a, o, h, l) {
                    var p;
                    return 0 === i && 0 === a && 0 === l ? t(e, r, n, s, o, h) : (p = Math.sqrt(Math.pow(n - e, 2) + Math.pow(s - r, 2) + Math.pow(a - i, 2)), e = Math.sqrt(Math.pow(o - e, 2) + Math.pow(h - r, 2) + Math.pow(l - i, 2)), r = Math.sqrt(Math.pow(o - n, 2) + Math.pow(h - s, 2) + Math.pow(l - a, 2)), -1e-4 < (i = e < p ? r < p ? p - e - r : r - e - p : e < r ? r - e - p : e - p - r) && i < 1e-4)
                  }
                }
              }! function() {
                for (var t = 0, e = ["ms", "moz", "webkit", "o"], r = 0; r < e.length && !window.requestAnimationFrame; ++r) window.requestAnimationFrame = window[e[r] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[r] + "CancelAnimationFrame"] || window[e[r] + "CancelRequestAnimationFrame"];
                window.requestAnimationFrame || (window.requestAnimationFrame = function(e, r) {
                  var i = (new Date).getTime(),
                    n = Math.max(0, 16 - (i - t)),
                    s = setTimeout((function() {
                      e(i + n)
                    }), n);
                  return t = i + n, s
                }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
                  clearTimeout(t)
                })
              }();
              var bez = bezFunction();

              function dataFunctionManager() {
                function t(t) {
                  for (var e = t.i.length, r = 0; r < e; r += 1) t.i[r][0] += t.v[r][0], t.i[r][1] += t.v[r][1], t.o[r][0] += t.v[r][0], t.o[r][1] += t.v[r][1]
                }

                function e(t, e) {
                  return e = e ? e.split(".") : [100, 100, 100], t[0] > e[0] || !(e[0] > t[0]) && (t[1] > e[1] || !(e[1] > t[1]) && t[2] > e[2])
                }
                var r, i = function() {
                    var t = [4, 4, 14];

                    function r(t) {
                      for (var e, r, i = t.length, n = 0; n < i; n += 1) 5 === t[n].ty && (r = (e = t[n]).t.d, e.t.d = {
                        k: [{
                          s: r,
                          t: 0
                        }]
                      })
                    }
                    return function(i) {
                      if (e(t, i.v) && (r(i.layers), i.assets))
                        for (var n = i.assets.length, s = 0; s < n; s += 1) i.assets[s].layers && r(i.assets[s].layers)
                    }
                  }(),
                  n = (r = [4, 7, 99], function() {
                    var t = [4, 1, 9];

                    function r(t) {
                      for (var e = t.length, r = 0; r < e; r += 1) 4 === t[r].ty && function t(e) {
                        for (var r, i, n = e.length, s = 0; s < n; s += 1)
                          if ("gr" === e[s].ty) t(e[s].it);
                          else if ("fl" === e[s].ty || "st" === e[s].ty)
                          if (e[s].c.k && e[s].c.k[0].i)
                            for (i = e[s].c.k.length, r = 0; r < i; r += 1) e[s].c.k[r].s && (e[s].c.k[r].s[0] /= 255, e[s].c.k[r].s[1] /= 255, e[s].c.k[r].s[2] /= 255, e[s].c.k[r].s[3] /= 255), e[s].c.k[r].e && (e[s].c.k[r].e[0] /= 255, e[s].c.k[r].e[1] /= 255, e[s].c.k[r].e[2] /= 255, e[s].c.k[r].e[3] /= 255);
                          else e[s].c.k[0] /= 255, e[s].c.k[1] /= 255, e[s].c.k[2] /= 255, e[s].c.k[3] /= 255
                      }(t[r].shapes)
                    }
                    return function(i) {
                      if (e(t, i.v) && (r(i.layers), i.assets))
                        for (var n = i.assets.length, s = 0; s < n; s += 1) i.assets[s].layers && r(i.assets[s].layers)
                    }
                  }()),
                  s = function() {
                    var t = [4, 4, 18];

                    function r(t) {
                      for (var e, r, i, n = t.length, s = 0; s < n; s += 1) {
                        if ((e = t[s]).hasMask)
                          for (var a = e.masksProperties, o = a.length, h = 0; h < o; h += 1)
                            if (a[h].pt.k.i) a[h].pt.k.c = a[h].cl;
                            else
                              for (i = a[h].pt.k.length, r = 0; r < i; r += 1) a[h].pt.k[r].s && (a[h].pt.k[r].s[0].c = a[h].cl), a[h].pt.k[r].e && (a[h].pt.k[r].e[0].c = a[h].cl);
                        4 === e.ty && function t(e) {
                          for (var r, i, n = e.length - 1; 0 <= n; --n)
                            if ("sh" == e[n].ty)
                              if (e[n].ks.k.i) e[n].ks.k.c = e[n].closed;
                              else
                                for (i = e[n].ks.k.length, r = 0; r < i; r += 1) e[n].ks.k[r].s && (e[n].ks.k[r].s[0].c = e[n].closed), e[n].ks.k[r].e && (e[n].ks.k[r].e[0].c = e[n].closed);
                          else "gr" == e[n].ty && t(e[n].it)
                        }(e.shapes)
                      }
                    }
                    return function(i) {
                      if (e(t, i.v) && (r(i.layers), i.assets))
                        for (var n = i.assets.length, s = 0; s < n; s += 1) i.assets[s].layers && r(i.assets[s].layers)
                    }
                  }(),
                  a = {
                    completeData: function(a, o) {
                      if (!a.__complete) {
                        n(a), i(a);
                        var h = a;
                        if (h.chars && !e(r, h.v))
                          for (var l, p, c, f, u = h.chars.length, m = 0; m < u; m += 1)
                            if (h.chars[m].data && h.chars[m].data.shapes)
                              for (p = (f = h.chars[m].data.shapes[0].it).length, l = 0; l < p; l += 1)(c = f[l].ks.k).__converted || (t(f[l].ks.k), c.__converted = !0);
                        s(a),
                          function e(r, i, n) {
                            for (var s, a, o, h = r.length, l = 0; l < h; l += 1)
                              if ("ks" in (s = r[l]) && !s.completed) {
                                if (s.completed = !0, s.tt && (r[l - 1].td = s.tt), s.hasMask)
                                  for (var p = s.masksProperties, c = p.length, f = 0; f < c; f += 1)
                                    if (p[f].pt.k.i) t(p[f].pt.k);
                                    else
                                      for (o = p[f].pt.k.length, a = 0; a < o; a += 1) p[f].pt.k[a].s && t(p[f].pt.k[a].s[0]), p[f].pt.k[a].e && t(p[f].pt.k[a].e[0]);
                                0 === s.ty ? (s.layers = function(t, e) {
                                  for (var r = 0, i = e.length; r < i;) {
                                    if (e[r].id === t) return e[r].layers.__used ? JSON.parse(JSON.stringify(e[r].layers)) : (e[r].layers.__used = !0, e[r].layers);
                                    r += 1
                                  }
                                }(s.refId, i), e(s.layers, i, n)) : 4 === s.ty ? function e(r) {
                                  for (var i, n, s = r.length - 1; 0 <= s; --s)
                                    if ("sh" == r[s].ty)
                                      if (r[s].ks.k.i) t(r[s].ks.k);
                                      else
                                        for (n = r[s].ks.k.length, i = 0; i < n; i += 1) r[s].ks.k[i].s && t(r[s].ks.k[i].s[0]), r[s].ks.k[i].e && t(r[s].ks.k[i].e[0]);
                                  else "gr" == r[s].ty && e(r[s].it)
                                }(s.shapes) : 5 == s.ty && function(t) {
                                  0 !== t.t.a.length || "m" in t.t.p || (t.singleShape = !0)
                                }(s)
                              }
                          }(a.layers, a.assets, o), a.__complete = !0
                      }
                    }
                  };
                return a
              }
              var dataManager = dataFunctionManager(),
                FontManager = function() {
                  var t = {
                    w: 0,
                    size: 0,
                    shapes: []
                  };

                  function e(t, e) {
                    var r = createTag("span"),
                      i = (r.style.fontFamily = e, createTag("span")),
                      n = (i.innerHTML = "giItT1WQy@!-/#", r.style.position = "absolute", r.style.left = "-10000px", r.style.top = "-10000px", r.style.fontSize = "300px", r.style.fontVariant = "normal", r.style.fontStyle = "normal", r.style.fontWeight = "normal", r.style.letterSpacing = "0", r.appendChild(i), document.body.appendChild(r), i.offsetWidth);
                    return i.style.fontFamily = t + ", " + e, {
                      node: i,
                      w: n,
                      parent: r
                    }
                  }
                  var r = (r = []).concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]),
                    i = function() {
                      this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = !1, this.initTime = Date.now()
                    };
                  return i.getCombinedCharacterCodes = function() {
                    return r
                  }, i.prototype.addChars = function(t) {
                    if (t) {
                      this.chars || (this.chars = []);
                      for (var e, r, i = t.length, n = this.chars.length, s = 0; s < i; s += 1) {
                        for (e = 0, r = !1; e < n;) this.chars[e].style === t[s].style && this.chars[e].fFamily === t[s].fFamily && this.chars[e].ch === t[s].ch && (r = !0), e += 1;
                        r || (this.chars.push(t[s]), n += 1)
                      }
                    }
                  }, i.prototype.addFonts = function(t, r) {
                    if (t)
                      if (this.chars) this.isLoaded = !0;
                      else {
                        for (var i = t.list, n = i.length, s = n, a = 0; a < n; a += 1) {
                          var o, h, l, p, c = !0;
                          if (i[a].loaded = !1, i[a].monoCase = e(i[a].fFamily, "monospace"), i[a].sansCase = e(i[a].fFamily, "sans-serif"), i[a].fPath) {
                            if ("p" === i[a].fOrigin || 3 === i[a].origin)(c = !(0 < (o = document.querySelectorAll('style[f-forigin="p"][f-family="' + i[a].fFamily + '"], style[f-origin="3"][f-family="' + i[a].fFamily + '"]')).length) && c) && ((l = createTag("style")).setAttribute("f-forigin", i[a].fOrigin), l.setAttribute("f-origin", i[a].origin), l.setAttribute("f-family", i[a].fFamily), l.type = "text/css", l.innerHTML = "@font-face {font-family: " + i[a].fFamily + "; font-style: normal; src: url('" + i[a].fPath + "');}", r.appendChild(l));
                            else if ("g" === i[a].fOrigin || 1 === i[a].origin) {
                              for (o = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), h = 0; h < o.length; h++) - 1 !== o[h].href.indexOf(i[a].fPath) && (c = !1);
                              c && ((l = createTag("link")).setAttribute("f-forigin", i[a].fOrigin), l.setAttribute("f-origin", i[a].origin), l.type = "text/css", l.rel = "stylesheet", l.href = i[a].fPath, document.body.appendChild(l))
                            } else if ("t" === i[a].fOrigin || 2 === i[a].origin) {
                              for (o = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), h = 0; h < o.length; h++) i[a].fPath === o[h].src && (c = !1);
                              c && ((p = createTag("link")).setAttribute("f-forigin", i[a].fOrigin), p.setAttribute("f-origin", i[a].origin), p.setAttribute("rel", "stylesheet"), p.setAttribute("href", i[a].fPath), r.appendChild(p))
                            }
                          } else i[a].loaded = !0, --s;
                          i[a].helper = function(t, e) {
                            var r = createNS("text");
                            return r.style.fontSize = "100px", r.setAttribute("font-family", e.fFamily), r.setAttribute("font-style", e.fStyle), r.setAttribute("font-weight", e.fWeight), r.textContent = "1", e.fClass ? (r.style.fontFamily = "inherit", r.setAttribute("class", e.fClass)) : r.style.fontFamily = e.fFamily, t.appendChild(r), createTag("canvas").getContext("2d").font = e.fWeight + " " + e.fStyle + " 100px " + e.fFamily, r
                          }(r, i[a]), i[a].cache = {}, this.fonts.push(i[a])
                        }
                        0 === s ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100)
                      }
                    else this.isLoaded = !0
                  }, i.prototype.getCharData = function(e, r, i) {
                    for (var n = 0, s = this.chars.length; n < s;) {
                      if (this.chars[n].ch === e && this.chars[n].style === r && this.chars[n].fFamily === i) return this.chars[n];
                      n += 1
                    }
                    return ("string" == typeof e && 13 !== e.charCodeAt(0) || !e) && console && console.warn, t
                  }, i.prototype.getFontByName = function(t) {
                    for (var e = 0, r = this.fonts.length; e < r;) {
                      if (this.fonts[e].fName === t) return this.fonts[e];
                      e += 1
                    }
                    return this.fonts[0]
                  }, i.prototype.measureText = function(t, e, r) {
                    e = this.getFontByName(e);
                    var i, n, s, a = t.charCodeAt(0);
                    return e.cache[a + 1] || (i = e.helper, " " === t ? (i.textContent = "|" + t + "|", n = i.getComputedTextLength(), i.textContent = "||", s = i.getComputedTextLength(), e.cache[a + 1] = (n - s) / 100) : (i.textContent = t, e.cache[a + 1] = i.getComputedTextLength() / 100)), e.cache[a + 1] * r
                  }, i.prototype.checkLoadedFonts = function() {
                    for (var t, e, r = this.fonts.length, i = r, n = 0; n < r; n += 1) this.fonts[n].loaded ? --i : "n" === this.fonts[n].fOrigin || 0 === this.fonts[n].origin ? this.fonts[n].loaded = !0 : (t = this.fonts[n].monoCase.node, e = this.fonts[n].monoCase.w, t.offsetWidth === e && (t = this.fonts[n].sansCase.node, e = this.fonts[n].sansCase.w, t.offsetWidth === e) || (--i, this.fonts[n].loaded = !0), this.fonts[n].loaded && (this.fonts[n].sansCase.parent.parentNode.removeChild(this.fonts[n].sansCase.parent), this.fonts[n].monoCase.parent.parentNode.removeChild(this.fonts[n].monoCase.parent)));
                    0 !== i && Date.now() - this.initTime < 5e3 ? setTimeout(this.checkLoadedFonts.bind(this), 20) : setTimeout(function() {
                      this.isLoaded = !0
                    }.bind(this), 0)
                  }, i.prototype.loaded = function() {
                    return this.isLoaded
                  }, i
                }(),
                PropertyFactory = function() {
                  var t = initialDefaultFrame,
                    e = Math.abs;

                  function r(t, e) {
                    var r, n = this.offsetTime;
                    "multidimensional" === this.propType && (r = createTypedArray("float32", this.pv.length));
                    for (var s, a, o, h = e.lastIndex, l = h, p = this.keyframes.length - 1, c = !0; c;) {
                      if (s = this.keyframes[l], a = this.keyframes[l + 1], l === p - 1 && t >= a.t - n) {
                        s.h && (s = a), h = 0;
                        break
                      }
                      if (a.t - n > t) {
                        h = l;
                        break
                      }
                      l < p - 1 ? l += 1 : (h = 0, c = !1)
                    }
                    var f, u, m, d, y, g, v, b, P, x, _, T, S, E, w = a.t - n,
                      A = s.t - n;
                    if (s.to) {
                      s.bezierData || (s.bezierData = bez.buildBezierData(s.s, a.s || s.e, s.to, s.ti));
                      var C = s.bezierData;
                      if (w <= t || t < A)
                        for (var D = w <= t ? C.points.length - 1 : 0, k = C.points[D].point.length, I = 0; I < k; I += 1) r[I] = C.points[D].point[I];
                      else {
                        s.__fnct ? o = s.__fnct : (o = BezierFactory.getBezierEasing(s.o.x, s.o.y, s.i.x, s.i.y, s.n).get, s.__fnct = o);
                        for (var F, M = o((t - A) / (w - A)), R = C.segmentLength * M, O = e.lastFrame < t && e._lastKeyframeIndex === l ? e._lastAddedLength : 0, L = e.lastFrame < t && e._lastKeyframeIndex === l ? e._lastPoint : 0, V = (c = !0, C.points.length); c;) {
                          if (O += C.points[L].partialLength, 0 == R || 0 === M || L === C.points.length - 1) {
                            for (k = C.points[L].point.length, I = 0; I < k; I += 1) r[I] = C.points[L].point[I];
                            break
                          }
                          if (O <= R && R < O + C.points[L + 1].partialLength) {
                            for (F = (R - O) / C.points[L + 1].partialLength, k = C.points[L].point.length, I = 0; I < k; I += 1) r[I] = C.points[L].point[I] + (C.points[L + 1].point[I] - C.points[L].point[I]) * F;
                            break
                          }
                          L < V - 1 ? L += 1 : c = !1
                        }
                        e._lastPoint = L, e._lastAddedLength = O - C.points[L].partialLength, e._lastKeyframeIndex = l
                      }
                    } else {
                      p = s.s.length;
                      var B, j, N, z, G, q = a.s || s.e;
                      if (this.sh && 1 !== s.h) w <= t ? (r[0] = q[0], r[1] = q[1], r[2] = q[2]) : t <= A ? (r[0] = s.s[0], r[1] = s.s[1], r[2] = s.s[2]) : (f = r, u = i(s.s), m = i(q), d = (t - A) / (w - A), b = [], P = u[0], x = u[1], _ = u[2], u = u[3], (v = P * (T = m[0]) + x * (S = m[1]) + _ * (E = m[2]) + u * (m = m[3])) < 0 && (v = -v, T = -T, S = -S, E = -E, m = -m), v = 1e-6 < 1 - v ? (v = Math.acos(v), y = Math.sin(v), g = Math.sin((1 - d) * v) / y, Math.sin(d * v) / y) : (g = 1 - d, d), b[0] = g * P + v * T, b[1] = g * x + v * S, b[2] = g * _ + v * E, b[3] = g * u + v * m, d = (y = b)[0], P = y[1], T = y[2], y = y[3], x = Math.atan2(2 * P * y - 2 * d * T, 1 - 2 * P * P - 2 * T * T), S = Math.asin(2 * d * P + 2 * T * y), y = Math.atan2(2 * d * y - 2 * P * T, 1 - 2 * d * d - 2 * T * T), f[0] = x / degToRads, f[1] = S / degToRads, f[2] = y / degToRads);
                      else
                        for (l = 0; l < p; l += 1) 1 !== s.h && (M = w <= t ? 1 : t < A ? 0 : (s.o.x.constructor === Array ? (s.__fnct || (s.__fnct = []), s.__fnct[l] ? o = s.__fnct[l] : (B = void 0 === s.o.x[l] ? s.o.x[0] : s.o.x[l], j = void 0 === s.o.y[l] ? s.o.y[0] : s.o.y[l], N = void 0 === s.i.x[l] ? s.i.x[0] : s.i.x[l], z = void 0 === s.i.y[l] ? s.i.y[0] : s.i.y[l], o = BezierFactory.getBezierEasing(B, j, N, z).get, s.__fnct[l] = o)) : s.__fnct ? o = s.__fnct : (B = s.o.x, j = s.o.y, N = s.i.x, z = s.i.y, o = BezierFactory.getBezierEasing(B, j, N, z).get, s.__fnct = o), o((t - A) / (w - A)))), q = a.s || s.e, G = 1 === s.h ? s.s[l] : s.s[l] + (q[l] - s.s[l]) * M, 1 === p ? r = G : r[l] = G
                    }
                    return e.lastIndex = h, r
                  }

                  function i(t) {
                    var e = t[0] * degToRads,
                      r = t[1] * degToRads,
                      i = (t = t[2] * degToRads, Math.cos(e / 2)),
                      n = Math.cos(r / 2),
                      s = Math.cos(t / 2);
                    return [(e = Math.sin(e / 2)) * (r = Math.sin(r / 2)) * s + i * n * (t = Math.sin(t / 2)), e * n * s + i * r * t, i * r * s - e * n * t, i * n * s - e * r * t]
                  }

                  function n() {
                    var e = this.comp.renderedFrame - this.offsetTime,
                      r = this.keyframes[0].t - this.offsetTime,
                      i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
                    return e === this._caching.lastFrame || this._caching.lastFrame !== t && (this._caching.lastFrame >= i && i <= e || this._caching.lastFrame < r && e < r) || (this._caching.lastFrame >= e && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0), i = this.interpolateValue(e, this._caching), this.pv = i), this._caching.lastFrame = e, this.pv
                  }

                  function s(t) {
                    var r;
                    if ("unidimensional" === this.propType) r = t * this.mult, 1e-5 < e(this.v - r) && (this.v = r, this._mdf = !0);
                    else
                      for (var i = 0, n = this.v.length; i < n;) r = t[i] * this.mult, 1e-5 < e(this.v[i] - r) && (this.v[i] = r, this._mdf = !0), i += 1
                  }

                  function a() {
                    if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length)
                      if (this.lock) this.setVValue(this.pv);
                      else {
                        this.lock = !0, this._mdf = this._isFirstFrame;
                        for (var t = this.effectsSequence.length, e = this.kf ? this.pv : this.data.k, r = 0; r < t; r += 1) e = this.effectsSequence[r](e);
                        this.setVValue(e), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId
                      }
                  }

                  function o(t) {
                    this.effectsSequence.push(t), this.container.addDynamicProperty(this)
                  }

                  function h(t, e, r, i) {
                    this.propType = "unidimensional", this.mult = r || 1, this.data = e, this.v = r ? e.k * r : e.k, this.pv = e.k, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = a, this.setVValue = s, this.addEffect = o
                  }

                  function l(t, e, r, i) {
                    this.propType = "multidimensional", this.mult = r || 1, this.data = e, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;
                    var n, h = e.k.length;
                    for (this.v = createTypedArray("float32", h), this.pv = createTypedArray("float32", h), createTypedArray("float32", h), this.vel = createTypedArray("float32", h), n = 0; n < h; n += 1) this.v[n] = e.k[n] * this.mult, this.pv[n] = e.k[n];
                    this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = a, this.setVValue = s, this.addEffect = o
                  }

                  function p(e, i, h, l) {
                    this.propType = "unidimensional", this.keyframes = i.k, this.offsetTime = e.data.st, this.frameId = -1, this._caching = {
                      lastFrame: t,
                      lastIndex: 0,
                      value: 0,
                      _lastKeyframeIndex: -1
                    }, this.k = !0, this.kf = !0, this.data = i, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.v = t, this.pv = t, this._isFirstFrame = !0, this.getValue = a, this.setVValue = s, this.interpolateValue = r, this.effectsSequence = [n.bind(this)], this.addEffect = o
                  }

                  function c(e, i, h, l) {
                    this.propType = "multidimensional";
                    for (var p, c, f, u, m = i.k.length, d = 0; d < m - 1; d += 1) i.k[d].to && i.k[d].s && i.k[d].e && (p = i.k[d].s, c = i.k[d].e, f = i.k[d].to, u = i.k[d].ti, (2 === p.length && (p[0] !== c[0] || p[1] !== c[1]) && bez.pointOnLine2D(p[0], p[1], c[0], c[1], p[0] + f[0], p[1] + f[1]) && bez.pointOnLine2D(p[0], p[1], c[0], c[1], c[0] + u[0], c[1] + u[1]) || 3 === p.length && (p[0] !== c[0] || p[1] !== c[1] || p[2] !== c[2]) && bez.pointOnLine3D(p[0], p[1], p[2], c[0], c[1], c[2], p[0] + f[0], p[1] + f[1], p[2] + f[2]) && bez.pointOnLine3D(p[0], p[1], p[2], c[0], c[1], c[2], c[0] + u[0], c[1] + u[1], c[2] + u[2])) && (i.k[d].to = null, i.k[d].ti = null), p[0] === c[0]) && p[1] === c[1] && 0 === f[0] && 0 === f[1] && 0 === u[0] && 0 === u[1] && (2 === p.length || p[2] === c[2] && 0 === f[2] && 0 === u[2]) && (i.k[d].to = null, i.k[d].ti = null);
                    this.effectsSequence = [n.bind(this)], this.keyframes = i.k, this.offsetTime = e.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.getValue = a, this.setVValue = s, this.interpolateValue = r, this.frameId = -1;
                    var y = i.k[0].s.length;
                    for (this.v = createTypedArray("float32", y), this.pv = createTypedArray("float32", y), d = 0; d < y; d += 1) this.v[d] = t, this.pv[d] = t;
                    this._caching = {
                      lastFrame: t,
                      lastIndex: 0,
                      value: createTypedArray("float32", y)
                    }, this.addEffect = o
                  }
                  return {
                    getProp: function(t, e, r, i, n) {
                      var s;
                      if (e.k.length)
                        if ("number" == typeof e.k[0]) s = new l(t, e, i, n);
                        else switch (r) {
                          case 0:
                            s = new p(t, e, i, n);
                            break;
                          case 1:
                            s = new c(t, e, i, n)
                        } else s = new h(t, e, i, n);
                      return s.effectsSequence.length && n.addDynamicProperty(s), s
                    }
                  }
                }(),
                TransformPropertyFactory = function() {
                  function t(t, e, r) {
                    if (this.elem = t, this.frameId = -1, this.propType = "transform", this.data = e, this.v = new Matrix, this.pre = new Matrix, this.appliedTransformations = 0, this.initDynamicPropertyContainer(r || t), e.p && e.p.s ? (this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this), this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this), e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(t, e.p || {
                        k: [0, 0, 0]
                      }, 1, 0, this), e.rx) {
                      if (this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this), this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this), this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this), e.or.k[0].ti)
                        for (var i = e.or.k.length, n = 0; n < i; n += 1) e.or.k[n].to = e.or.k[n].ti = null;
                      this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this), this.or.sh = !0
                    } else this.r = PropertyFactory.getProp(t, e.r || {
                      k: 0
                    }, 0, degToRads, this);
                    e.sk && (this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this), this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this)), this.a = PropertyFactory.getProp(t, e.a || {
                      k: [0, 0, 0]
                    }, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s || {
                      k: [100, 100, 100]
                    }, 1, .01, this), e.o ? this.o = PropertyFactory.getProp(t, e.o, 0, .01, t) : this.o = {
                      _mdf: !1,
                      v: 1
                    }, this._isDirty = !0, this.dynamicProperties.length || this.getValue(!0)
                  }
                  return t.prototype = {
                    applyToMatrix: function(t) {
                      var e = this._mdf;
                      this.iterateDynamicProperties(), this._mdf = this._mdf || e, this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && t.skewFromAxis(-this.sk.v, this.sa.v), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                    },
                    getValue: function(t) {
                      var e, r, i, n;
                      this.elem.globalData.frameId !== this.frameId && (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), (this._mdf || t) && (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented && (t = this.elem.globalData.frameRate, this.p && this.p.keyframes && this.p.getValueAtTime ? r = this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (e = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / t, 0), this.p.getValueAtTime(this.p.keyframes[0].t / t, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (e = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / t, 0), this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .01) / t, 0)) : (e = this.p.pv, this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / t, this.p.offsetTime)) : this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime && (e = [], r = [], i = this.px, n = this.py, i._caching.lastFrame + i.offsetTime <= i.keyframes[0].t ? (e[0] = i.getValueAtTime((i.keyframes[0].t + .01) / t, 0), e[1] = n.getValueAtTime((n.keyframes[0].t + .01) / t, 0), r[0] = i.getValueAtTime(i.keyframes[0].t / t, 0), r[1] = n.getValueAtTime(n.keyframes[0].t / t, 0)) : i._caching.lastFrame + i.offsetTime >= i.keyframes[i.keyframes.length - 1].t ? (e[0] = i.getValueAtTime(i.keyframes[i.keyframes.length - 1].t / t, 0), e[1] = n.getValueAtTime(n.keyframes[n.keyframes.length - 1].t / t, 0), r[0] = i.getValueAtTime((i.keyframes[i.keyframes.length - 1].t - .01) / t, 0), r[1] = n.getValueAtTime((n.keyframes[n.keyframes.length - 1].t - .01) / t, 0)) : (e = [i.pv, n.pv], r[0] = i.getValueAtTime((i._caching.lastFrame + i.offsetTime - .01) / t, i.offsetTime), r[1] = n.getValueAtTime((n._caching.lastFrame + n.offsetTime - .01) / t, n.offsetTime))), this.v.rotate(-Math.atan2(e[1] - r[1], e[0] - r[0]))), this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])), this.frameId = this.elem.globalData.frameId)
                    },
                    precalculateMatrix: function() {
                      if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1, !this.s.effectsSequence.length)) {
                        if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2, this.sk) {
                          if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
                          this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3
                        }
                        this.r ? this.r.effectsSequence.length || (this.pre.rotate(-this.r.v), this.appliedTransformations = 4) : this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4)
                      }
                    },
                    autoOrient: function() {}
                  }, extendPrototype([DynamicPropertyContainer], t), t.prototype.addDynamicProperty = function(t) {
                    this._addDynamicProperty(t), this.elem.addDynamicProperty(t), this._isDirty = !0
                  }, t.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty, {
                    getTransformProperty: function(e, r, i) {
                      return new t(e, r, i)
                    }
                  }
                }();

              function ShapePath() {
                this.c = !1, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength)
              }
              ShapePath.prototype.setPathData = function(t, e) {
                this.c = t, this.setLength(e);
                for (var r = 0; r < e;) this.v[r] = point_pool.newElement(), this.o[r] = point_pool.newElement(), this.i[r] = point_pool.newElement(), r += 1
              }, ShapePath.prototype.setLength = function(t) {
                for (; this._maxLength < t;) this.doubleArrayLength();
                this._length = t
              }, ShapePath.prototype.doubleArrayLength = function() {
                this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2
              }, ShapePath.prototype.setXYAt = function(t, e, r, i, n) {
                var s;
                switch (this._length = Math.max(this._length, i + 1), this._length >= this._maxLength && this.doubleArrayLength(), r) {
                  case "v":
                    s = this.v;
                    break;
                  case "i":
                    s = this.i;
                    break;
                  case "o":
                    s = this.o
                }
                s[i] && (!s[i] || n) || (s[i] = point_pool.newElement()), s[i][0] = t, s[i][1] = e
              }, ShapePath.prototype.setTripleAt = function(t, e, r, i, n, s, a, o) {
                this.setXYAt(t, e, "v", a, o), this.setXYAt(r, i, "o", a, o), this.setXYAt(n, s, "i", a, o)
              }, ShapePath.prototype.reverse = function() {
                var t = new ShapePath,
                  e = (t.setPathData(this.c, this._length), this.v),
                  r = this.o,
                  i = this.i,
                  n = 0;
                this.c && (t.setTripleAt(e[0][0], e[0][1], i[0][0], i[0][1], r[0][0], r[0][1], 0, !1), n = 1);
                for (var s = this._length - 1, a = this._length, o = n; o < a; o += 1) t.setTripleAt(e[s][0], e[s][1], i[s][0], i[s][1], r[s][0], r[s][1], o, !1), --s;
                return t
              };
              var ShapePropertyFactory = function() {
                  var t = -999999;

                  function e(t, e, r) {
                    var i, n, s, a, o, h, l, p = r.lastIndex,
                      c = this.keyframes;
                    if (t < c[0].t - this.offsetTime) i = c[0].s[0], n = !0, p = 0;
                    else if (t >= c[c.length - 1].t - this.offsetTime) i = (c[c.length - 1].s ? c[c.length - 1].s : c[c.length - 2].e)[0], n = !0;
                    else {
                      for (var f, u, m = p, d = c.length - 1, y = !0; y && (f = c[m], !((u = c[m + 1]).t - this.offsetTime > t));) m < d - 1 ? m += 1 : y = !1;
                      var g, v, b;
                      p = m;
                      (n = 1 === f.h) || (v = t >= u.t - this.offsetTime ? 1 : t < f.t - this.offsetTime ? 0 : (f.__fnct ? g = f.__fnct : (g = BezierFactory.getBezierEasing(f.o.x, f.o.y, f.i.x, f.i.y).get, f.__fnct = g), g((t - (f.t - this.offsetTime)) / (u.t - this.offsetTime - (f.t - this.offsetTime)))), b = (u.s || f.e)[0]), i = f.s[0]
                    }
                    for (o = e._length, h = i.i[0].length, r.lastIndex = p, s = 0; s < o; s += 1)
                      for (a = 0; a < h; a += 1) l = n ? i.i[s][a] : i.i[s][a] + (b.i[s][a] - i.i[s][a]) * v, e.i[s][a] = l, l = n ? i.o[s][a] : i.o[s][a] + (b.o[s][a] - i.o[s][a]) * v, e.o[s][a] = l, l = n ? i.v[s][a] : i.v[s][a] + (b.v[s][a] - i.v[s][a]) * v, e.v[s][a] = l
                  }

                  function r() {
                    this.paths = this.localShapeCollection
                  }

                  function i(t) {
                    ! function(t, e) {
                      if (t._length === e._length && t.c === e.c) {
                        for (var r = t._length, i = 0; i < r; i += 1)
                          if (t.v[i][0] !== e.v[i][0] || t.v[i][1] !== e.v[i][1] || t.o[i][0] !== e.o[i][0] || t.o[i][1] !== e.o[i][1] || t.i[i][0] !== e.i[i][0] || t.i[i][1] !== e.i[i][1]) return;
                        return 1
                      }
                    }(this.v, t) && (this.v = shape_pool.clone(t), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection)
                  }

                  function n() {
                    if (this.elem.globalData.frameId !== this.frameId)
                      if (this.effectsSequence.length)
                        if (this.lock) this.setVValue(this.pv);
                        else {
                          this.lock = !0, this._mdf = !1;
                          for (var t = this.kf ? this.pv : (this.data.ks || this.data.pt).k, e = this.effectsSequence.length, r = 0; r < e; r += 1) t = this.effectsSequence[r](t);
                          this.setVValue(t), this.lock = !1, this.frameId = this.elem.globalData.frameId
                        }
                    else this._mdf = !1
                  }

                  function s(t, e, i) {
                    this.propType = "shape", this.comp = t.comp, this.container = t, this.elem = t, this.data = e, this.k = !1, this.kf = !1, this._mdf = !1, t = (3 === i ? e.pt : e.ks).k, this.v = shape_pool.clone(t), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = r, this.effectsSequence = []
                  }

                  function a(t) {
                    this.effectsSequence.push(t), this.container.addDynamicProperty(this)
                  }

                  function o(e, i, n) {
                    this.propType = "shape", this.comp = e.comp, this.elem = e, this.container = e, this.offsetTime = e.data.st, this.keyframes = (3 === n ? i.pt : i.ks).k, this.k = !0, this.kf = !0, e = this.keyframes[0].s[0].i.length, this.keyframes[0].s[0].i[0].length, this.v = shape_pool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, e), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = t, this.reset = r, this._caching = {
                      lastFrame: t,
                      lastIndex: 0
                    }, this.effectsSequence = [function() {
                      var e = this.comp.renderedFrame - this.offsetTime,
                        r = this.keyframes[0].t - this.offsetTime,
                        i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
                        n = this._caching.lastFrame;
                      return n !== t && (n < r && e < r || i < n && i < e) || (this._caching.lastIndex = n < e ? this._caching.lastIndex : 0, this.interpolateShape(e, this.pv, this._caching)), this._caching.lastFrame = e, this.pv
                    }.bind(this)]
                  }
                  s.prototype.interpolateShape = e, s.prototype.getValue = n, s.prototype.setVValue = i, s.prototype.addEffect = a, o.prototype.getValue = n, o.prototype.interpolateShape = e, o.prototype.setVValue = i, o.prototype.addEffect = a;
                  var h = function() {
                      var t = roundCorner;

                      function e(t, e) {
                        this.v = shape_pool.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = e.d, this.elem = t, this.comp = t.comp, this.frameId = -1, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath())
                      }
                      return e.prototype = {
                        reset: r,
                        getValue: function() {
                          this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf) && this.convertEllToPath()
                        },
                        convertEllToPath: function() {
                          var e = this.p.v[0],
                            r = this.p.v[1],
                            i = this.s.v[0] / 2,
                            n = this.s.v[1] / 2,
                            s = 3 !== this.d,
                            a = this.v;
                          a.v[0][0] = e, a.v[0][1] = r - n, a.v[1][0] = s ? e + i : e - i, a.v[1][1] = r, a.v[2][0] = e, a.v[2][1] = r + n, a.v[3][0] = s ? e - i : e + i, a.v[3][1] = r, a.i[0][0] = s ? e - i * t : e + i * t, a.i[0][1] = r - n, a.i[1][0] = s ? e + i : e - i, a.i[1][1] = r - n * t, a.i[2][0] = s ? e + i * t : e - i * t, a.i[2][1] = r + n, a.i[3][0] = s ? e - i : e + i, a.i[3][1] = r + n * t, a.o[0][0] = s ? e + i * t : e - i * t, a.o[0][1] = r - n, a.o[1][0] = s ? e + i : e - i, a.o[1][1] = r + n * t, a.o[2][0] = s ? e - i * t : e + i * t, a.o[2][1] = r + n, a.o[3][0] = s ? e - i : e + i, a.o[3][1] = r - n * t
                        }
                      }, extendPrototype([DynamicPropertyContainer], e), e
                    }(),
                    l = (c.prototype = {
                      reset: r,
                      getValue: function() {
                        this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf) && this.convertToPath()
                      },
                      convertStarToPath: function() {
                        for (var t = 2 * Math.floor(this.pt.v), e = 2 * Math.PI / t, r = !0, i = this.or.v, n = this.ir.v, s = this.os.v, a = this.is.v, o = 2 * Math.PI * i / (2 * t), h = 2 * Math.PI * n / (2 * t), l = -Math.PI / 2, p = (l += this.r.v, 3 === this.data.d ? -1 : 1), c = this.v._length = 0; c < t; c += 1) {
                          var f = r ? s : a,
                            u = r ? o : h,
                            m = (d = r ? i : n) * Math.cos(l),
                            d = d * Math.sin(l),
                            y = 0 == m && 0 == d ? 0 : d / Math.sqrt(m * m + d * d),
                            g = 0 == m && 0 == d ? 0 : -m / Math.sqrt(m * m + d * d);
                          m += +this.p.v[0], d += +this.p.v[1], this.v.setTripleAt(m, d, m - y * u * f * p, d - g * u * f * p, m + y * u * f * p, d + g * u * f * p, c, !0), r = !r, l += e * p
                        }
                      },
                      convertPolygonToPath: function() {
                        var t, e = Math.floor(this.pt.v),
                          r = 2 * Math.PI / e,
                          i = this.or.v,
                          n = this.os.v,
                          s = 2 * Math.PI * i / (4 * e),
                          a = -Math.PI / 2,
                          o = 3 === this.data.d ? -1 : 1;
                        for (a += this.r.v, t = this.v._length = 0; t < e; t += 1) {
                          var h = i * Math.cos(a),
                            l = i * Math.sin(a),
                            p = 0 == h && 0 == l ? 0 : l / Math.sqrt(h * h + l * l),
                            c = 0 == h && 0 == l ? 0 : -h / Math.sqrt(h * h + l * l);
                          h += +this.p.v[0], l += +this.p.v[1], this.v.setTripleAt(h, l, h - p * s * n * o, l - c * s * n * o, h + p * s * n * o, l + c * s * n * o, t, !0), a += r * o
                        }
                        this.paths.length = 0, this.paths[0] = this.v
                      }
                    }, extendPrototype([DynamicPropertyContainer], c), c),
                    p = function() {
                      function t(t, e) {
                        this.v = shape_pool.newElement(), this.v.c = !0, this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = t, this.comp = t.comp, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath())
                      }
                      return t.prototype = {
                        convertRectToPath: function() {
                          var t = this.p.v[0],
                            e = this.p.v[1],
                            r = this.s.v[0] / 2,
                            i = this.s.v[1] / 2,
                            n = bm_min(r, i, this.r.v),
                            s = .44810000000000005 * n;
                          this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + r, e - i + n, t + r, e - i + n, t + r, e - i + s, 0, !0), this.v.setTripleAt(t + r, e + i - n, t + r, e + i - s, t + r, e + i - n, 1, !0), 0 !== n ? (this.v.setTripleAt(t + r - n, e + i, t + r - n, e + i, t + r - s, e + i, 2, !0), this.v.setTripleAt(t - r + n, e + i, t - r + s, e + i, t - r + n, e + i, 3, !0), this.v.setTripleAt(t - r, e + i - n, t - r, e + i - n, t - r, e + i - s, 4, !0), this.v.setTripleAt(t - r, e - i + n, t - r, e - i + s, t - r, e - i + n, 5, !0), this.v.setTripleAt(t - r + n, e - i, t - r + n, e - i, t - r + s, e - i, 6, !0), this.v.setTripleAt(t + r - n, e - i, t + r - s, e - i, t + r - n, e - i, 7, !0)) : (this.v.setTripleAt(t - r, e + i, t - r + s, e + i, t - r, e + i, 2), this.v.setTripleAt(t - r, e - i, t - r, e - i + s, t - r, e - i, 3))) : (this.v.setTripleAt(t + r, e - i + n, t + r, e - i + s, t + r, e - i + n, 0, !0), 0 !== n ? (this.v.setTripleAt(t + r - n, e - i, t + r - n, e - i, t + r - s, e - i, 1, !0), this.v.setTripleAt(t - r + n, e - i, t - r + s, e - i, t - r + n, e - i, 2, !0), this.v.setTripleAt(t - r, e - i + n, t - r, e - i + n, t - r, e - i + s, 3, !0), this.v.setTripleAt(t - r, e + i - n, t - r, e + i - s, t - r, e + i - n, 4, !0), this.v.setTripleAt(t - r + n, e + i, t - r + n, e + i, t - r + s, e + i, 5, !0), this.v.setTripleAt(t + r - n, e + i, t + r - s, e + i, t + r - n, e + i, 6, !0), this.v.setTripleAt(t + r, e + i - n, t + r, e + i - n, t + r, e + i - s, 7, !0)) : (this.v.setTripleAt(t - r, e - i, t - r + s, e - i, t - r, e - i, 1, !0), this.v.setTripleAt(t - r, e + i, t - r, e + i - s, t - r, e + i, 2, !0), this.v.setTripleAt(t + r, e + i, t + r - s, e + i, t + r, e + i, 3, !0)))
                        },
                        getValue: function(t) {
                          this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf) && this.convertRectToPath()
                        },
                        reset: r
                      }, extendPrototype([DynamicPropertyContainer], t), t
                    }();

                  function c(t, e) {
                    this.v = shape_pool.newElement(), this.v.setPathData(!0, 0), this.elem = t, this.comp = t.comp, this.data = e, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), 1 === e.sy ? (this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this), this.is = PropertyFactory.getProp(t, e.is, 0, .01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this), this.or = PropertyFactory.getProp(t, e.or, 0, 0, this), this.os = PropertyFactory.getProp(t, e.os, 0, .01, this), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath())
                  }
                  return {
                    getShapeProp: function(t, e, r) {
                      var i;
                      return 3 === r || 4 === r ? i = new((3 === r ? e.pt : e.ks).k.length ? o : s)(t, e, r) : 5 === r ? i = new p(t, e) : 6 === r ? i = new h(t, e) : 7 === r && (i = new l(t, e)), i.k && t.addDynamicProperty(i), i
                    },
                    getConstructorFunction: function() {
                      return s
                    },
                    getKeyframedConstructorFunction: function() {
                      return o
                    }
                  }
                }(),
                ShapeModifiers = (t = {}, i = {}, t.registerModifier = function(t, e) {
                  i[t] || (i[t] = e)
                }, t.getModifier = function(t, e, r) {
                  return new i[t](e, r)
                }, t),
                t, i;

              function ShapeModifier() {}

              function TrimModifier() {}

              function RoundCornersModifier() {}

              function RepeaterModifier() {}

              function ShapeCollection() {
                this._length = 0, this._maxLength = 4, this.shapes = createSizedArray(this._maxLength)
              }

              function DashProperty(t, e, r, i) {
                this.elem = t, this.frameId = -1, this.dataProps = createSizedArray(e.length), this.renderer = r, this.k = !1, this.dashStr = "", this.dashArray = createTypedArray("float32", e.length ? e.length - 1 : 0), this.dashoffset = createTypedArray("float32", 1), this.initDynamicPropertyContainer(i);
                for (var n, s = e.length || 0, a = 0; a < s; a += 1) n = PropertyFactory.getProp(t, e[a].v, 0, 0, this), this.k = n.k || this.k, this.dataProps[a] = {
                  n: e[a].n,
                  p: n
                };
                this.k || this.getValue(!0), this._isAnimated = this.k
              }

              function GradientProperty(t, e, r) {
                this.data = e, this.c = createTypedArray("uint8c", 4 * e.p);
                var i = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
                this.o = createTypedArray("float32", i), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = i, this.initDynamicPropertyContainer(r), this.prop = PropertyFactory.getProp(t, e.k, 1, null, this), this.k = this.prop.k, this.getValue(!0)
              }
              ShapeModifier.prototype.initModifierProperties = function() {}, ShapeModifier.prototype.addShapeToModifier = function() {}, ShapeModifier.prototype.addShape = function(t) {
                var e;
                this.closed || (t.sh.container.addDynamicProperty(t.sh), e = {
                  shape: t.sh,
                  data: t,
                  localShapeCollection: shapeCollection_pool.newShapeCollection()
                }, this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated())
              }, ShapeModifier.prototype.init = function(t, e) {
                this.shapes = [], this.elem = t, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), this.frameId = initialDefaultFrame, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
              }, ShapeModifier.prototype.processKeys = function() {
                this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties())
              }, extendPrototype([DynamicPropertyContainer], ShapeModifier), extendPrototype([ShapeModifier], TrimModifier), TrimModifier.prototype.initModifierProperties = function(t, e) {
                this.s = PropertyFactory.getProp(t, e.s, 0, .01, this), this.e = PropertyFactory.getProp(t, e.e, 0, .01, this), this.o = PropertyFactory.getProp(t, e.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length
              }, TrimModifier.prototype.addShapeToModifier = function(t) {
                t.pathsData = []
              }, TrimModifier.prototype.calculateShapeEdges = function(t, e, r, i, n) {
                var s = [];
                e <= 1 ? s.push({
                  s: t,
                  e: e
                }) : 1 <= t ? s.push({
                  s: t - 1,
                  e: e - 1
                }) : (s.push({
                  s: t,
                  e: 1
                }), s.push({
                  s: 0,
                  e: e - 1
                }));
                for (var a, o, h = [], l = s.length, p = 0; p < l; p += 1)(o = s[p]).e * n < i || o.s * n > i + r || (a = o.s * n <= i ? 0 : (o.s * n - i) / r, o = o.e * n >= i + r ? 1 : (o.e * n - i) / r, h.push([a, o]));
                return h.length || h.push([0, 0]), h
              }, TrimModifier.prototype.releasePathsData = function(t) {
                for (var e = t.length, r = 0; r < e; r += 1) segments_length_pool.release(t[r]);
                return t.length = 0, t
              }, TrimModifier.prototype.processShapes = function(t) {
                var e, r, i, n;
                this._mdf || t ? ((r = this.o.v % 360 / 360) < 0 && (r += 1), (i = (1 < this.s.v ? 1 : this.s.v < 0 ? 0 : this.s.v) + r) > (n = (1 < this.e.v ? 1 : this.e.v < 0 ? 0 : this.e.v) + r) && (r = i, i = n, n = r), i = 1e-4 * Math.round(1e4 * i), n = 1e-4 * Math.round(1e4 * n), this.sValue = i, this.eValue = n) : (i = this.sValue, n = this.eValue);
                var s, a, o, h, l, p = this.shapes.length,
                  c = 0;
                if (n === i)
                  for (d = 0; d < p; d += 1) this.shapes[d].localShapeCollection.releaseShapes(), this.shapes[d].shape._mdf = !0, this.shapes[d].shape.paths = this.shapes[d].localShapeCollection;
                else if (1 === n && 0 === i || 0 === n && 1 === i) {
                  if (this._mdf)
                    for (d = 0; d < p; d += 1) this.shapes[d].pathsData.length = 0, this.shapes[d].shape._mdf = !0
                } else {
                  for (var f, u, m = [], d = 0; d < p; d += 1)
                    if ((f = this.shapes[d]).shape._mdf || this._mdf || t || 2 === this.m) {
                      if (a = (e = f.shape.paths)._length, l = 0, !f.shape._mdf && f.pathsData.length) l = f.totalShapeLength;
                      else {
                        for (o = this.releasePathsData(f.pathsData), s = 0; s < a; s += 1) h = bez.getSegmentsLength(e.shapes[s]), o.push(h), l += h.totalLength;
                        f.totalShapeLength = l, f.pathsData = o
                      }
                      c += l, f.shape._mdf = !0
                    } else f.shape.paths = f.localShapeCollection;
                  var y, g = i,
                    v = n,
                    b = 0;
                  for (d = p - 1; 0 <= d; --d)
                    if ((f = this.shapes[d]).shape._mdf) {
                      for ((u = f.localShapeCollection).releaseShapes(), 2 === this.m && 1 < p ? (y = this.calculateShapeEdges(i, n, f.totalShapeLength, b, c), b += f.totalShapeLength) : y = [
                          [g, v]
                        ], a = y.length, s = 0; s < a; s += 1) {
                        g = y[s][0], v = y[s][1], m.length = 0, v <= 1 ? m.push({
                          s: f.totalShapeLength * g,
                          e: f.totalShapeLength * v
                        }) : 1 <= g ? m.push({
                          s: f.totalShapeLength * (g - 1),
                          e: f.totalShapeLength * (v - 1)
                        }) : (m.push({
                          s: f.totalShapeLength * g,
                          e: f.totalShapeLength
                        }), m.push({
                          s: 0,
                          e: f.totalShapeLength * (v - 1)
                        }));
                        var P, x = this.addShapes(f, m[0]);
                        m[0].s !== m[0].e && (1 < m.length && (x = f.shape.paths.shapes[f.shape.paths._length - 1].c ? (P = x.pop(), this.addPaths(x, u), this.addShapes(f, m[1], P)) : (this.addPaths(x, u), this.addShapes(f, m[1]))), this.addPaths(x, u))
                      }
                      f.shape.paths = u
                    }
                }
              }, TrimModifier.prototype.addPaths = function(t, e) {
                for (var r = t.length, i = 0; i < r; i += 1) e.addShape(t[i])
              }, TrimModifier.prototype.addSegment = function(t, e, r, i, n, s, a) {
                n.setXYAt(e[0], e[1], "o", s), n.setXYAt(r[0], r[1], "i", s + 1), a && n.setXYAt(t[0], t[1], "v", s), n.setXYAt(i[0], i[1], "v", s + 1)
              }, TrimModifier.prototype.addSegmentFromArray = function(t, e, r, i) {
                e.setXYAt(t[1], t[5], "o", r), e.setXYAt(t[2], t[6], "i", r + 1), i && e.setXYAt(t[0], t[4], "v", r), e.setXYAt(t[3], t[7], "v", r + 1)
              }, TrimModifier.prototype.addShapes = function(t, e, r) {
                var i, n, s, a, o, h, l, p, c = t.pathsData,
                  f = t.shape.paths.shapes,
                  u = t.shape.paths._length,
                  m = 0,
                  d = [],
                  y = !0,
                  g = r ? (a = r._length, r._length) : (r = shape_pool.newElement(), a = 0);
                for (d.push(r), i = 0; i < u; i += 1) {
                  for (o = c[i].lengths, r.c = f[i].c, s = f[i].c ? o.length : o.length + 1, n = 1; n < s; n += 1)
                    if (m + (p = o[n - 1]).addedLength < e.s) m += p.addedLength, r.c = !1;
                    else {
                      if (m > e.e) {
                        r.c = !1;
                        break
                      }
                      e.s <= m && e.e >= m + p.addedLength ? (this.addSegment(f[i].v[n - 1], f[i].o[n - 1], f[i].i[n], f[i].v[n], r, a, y), y = !1) : (h = bez.getNewSegment(f[i].v[n - 1], f[i].v[n], f[i].o[n - 1], f[i].i[n], (e.s - m) / p.addedLength, (e.e - m) / p.addedLength, o[n - 1]), this.addSegmentFromArray(h, r, a, y), r.c = y = !1), m += p.addedLength, a += 1
                    } if (f[i].c && o.length && (p = o[n - 1], m <= e.e ? (l = o[n - 1].addedLength, e.s <= m && e.e >= m + l ? (this.addSegment(f[i].v[n - 1], f[i].o[n - 1], f[i].i[0], f[i].v[0], r, a, y), y = !1) : (h = bez.getNewSegment(f[i].v[n - 1], f[i].v[0], f[i].o[n - 1], f[i].i[0], (e.s - m) / l, (e.e - m) / l, o[n - 1]), this.addSegmentFromArray(h, r, a, y), r.c = y = !1)) : r.c = !1, m += p.addedLength, a += 1), r._length && (r.setXYAt(r.v[g][0], r.v[g][1], "i", g), r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], "o", r._length - 1)), m > e.e) break;
                  i < u - 1 && (r = shape_pool.newElement(), y = !0, d.push(r), a = 0)
                }
                return d
              }, ShapeModifiers.registerModifier("tm", TrimModifier), extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function(t, e) {
                this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t, e.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length
              }, RoundCornersModifier.prototype.processPath = function(t, e) {
                var r = shape_pool.newElement();
                r.c = t.c;
                for (var i, n, s, a, o, h, l, p, c, f, u = t._length, m = 0, d = 0; d < u; d += 1) i = t.v[d], s = t.o[d], n = t.i[d], i[0] === s[0] && i[1] === s[1] && i[0] === n[0] && i[1] === n[1] ? 0 !== d && d !== u - 1 || t.c ? (a = 0 === d ? t.v[u - 1] : t.v[d - 1], h = (o = Math.sqrt(Math.pow(i[0] - a[0], 2) + Math.pow(i[1] - a[1], 2))) ? Math.min(o / 2, e) / o : 0, c = i[0] + (a[0] - i[0]) * h, f = i[1] - (i[1] - a[1]) * h, l = c - (c - i[0]) * roundCorner, p = f - (f - i[1]) * roundCorner, r.setTripleAt(c, f, l, p, c, f, m), m += 1, a = d === u - 1 ? t.v[0] : t.v[d + 1], h = (o = Math.sqrt(Math.pow(i[0] - a[0], 2) + Math.pow(i[1] - a[1], 2))) ? Math.min(o / 2, e) / o : 0, l = i[0] + (a[0] - i[0]) * h, p = i[1] + (a[1] - i[1]) * h, c = l - (l - i[0]) * roundCorner, f = p - (p - i[1]) * roundCorner, r.setTripleAt(l, p, l, p, c, f, m)) : r.setTripleAt(i[0], i[1], s[0], s[1], n[0], n[1], m) : r.setTripleAt(t.v[d][0], t.v[d][1], t.o[d][0], t.o[d][1], t.i[d][0], t.i[d][1], m), m += 1;
                return r
              }, RoundCornersModifier.prototype.processShapes = function(t) {
                var e, r, i, n, s, a, o = this.shapes.length,
                  h = this.rd.v;
                if (0 !== h)
                  for (r = 0; r < o; r += 1) {
                    if ((s = this.shapes[r]).shape.paths, a = s.localShapeCollection, s.shape._mdf || this._mdf || t)
                      for (a.releaseShapes(), s.shape._mdf = !0, e = s.shape.paths.shapes, n = s.shape.paths._length, i = 0; i < n; i += 1) a.addShape(this.processPath(e[i], h));
                    s.shape.paths = s.localShapeCollection
                  }
                this.dynamicProperties.length || (this._mdf = !1)
              }, ShapeModifiers.registerModifier("rd", RoundCornersModifier), extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function(t, e) {
                this.getValue = this.processKeys, this.c = PropertyFactory.getProp(t, e.c, 0, null, this), this.o = PropertyFactory.getProp(t, e.o, 0, null, this), this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this), this.so = PropertyFactory.getProp(t, e.tr.so, 0, .01, this), this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, .01, this), this.data = e, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Matrix, this.rMatrix = new Matrix, this.sMatrix = new Matrix, this.tMatrix = new Matrix, this.matrix = new Matrix
              }, RepeaterModifier.prototype.applyTransforms = function(t, e, r, i, n, s) {
                var a = s ? -1 : 1,
                  o = i.s.v[0] + (1 - i.s.v[0]) * (1 - n),
                  h = i.s.v[1] + (1 - i.s.v[1]) * (1 - n);
                t.translate(i.p.v[0] * a * n, i.p.v[1] * a * n, i.p.v[2]), e.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), e.rotate(-i.r.v * a * n), e.translate(i.a.v[0], i.a.v[1], i.a.v[2]), r.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), r.scale(s ? 1 / o : o, s ? 1 / h : h), r.translate(i.a.v[0], i.a.v[1], i.a.v[2])
              }, RepeaterModifier.prototype.init = function(t, e, r, i) {
                for (this.elem = t, this.arr = e, this.pos = r, this.elemsData = i, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[r]); 0 < r;) this._elements.unshift(e[--r]);
                this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
              }, RepeaterModifier.prototype.resetElements = function(t) {
                for (var e = t.length, r = 0; r < e; r += 1) t[r]._processed = !1, "gr" === t[r].ty && this.resetElements(t[r].it)
              }, RepeaterModifier.prototype.cloneElements = function(t) {
                return t.length, t = JSON.parse(JSON.stringify(t)), this.resetElements(t), t
              }, RepeaterModifier.prototype.changeGroupRender = function(t, e) {
                for (var r = t.length, i = 0; i < r; i += 1) t[i]._render = e, "gr" === t[i].ty && this.changeGroupRender(t[i].it, e)
              }, RepeaterModifier.prototype.processShapes = function(t) {
                var e, r, i, n, s;
                if (this._mdf || t) {
                  var a, o = Math.ceil(this.c.v);
                  if (this._groups.length < o) {
                    for (; this._groups.length < o;) {
                      var h = {
                        it: this.cloneElements(this._elements),
                        ty: "gr"
                      };
                      h.it.push({
                        a: {
                          a: 0,
                          ix: 1,
                          k: [0, 0]
                        },
                        nm: "Transform",
                        o: {
                          a: 0,
                          ix: 7,
                          k: 100
                        },
                        p: {
                          a: 0,
                          ix: 2,
                          k: [0, 0]
                        },
                        r: {
                          a: 1,
                          ix: 6,
                          k: [{
                            s: 0,
                            e: 0,
                            t: 0
                          }, {
                            s: 0,
                            e: 0,
                            t: 1
                          }]
                        },
                        s: {
                          a: 0,
                          ix: 3,
                          k: [100, 100]
                        },
                        sa: {
                          a: 0,
                          ix: 5,
                          k: 0
                        },
                        sk: {
                          a: 0,
                          ix: 4,
                          k: 0
                        },
                        ty: "tr"
                      }), this.arr.splice(0, 0, h), this._groups.splice(0, 0, h), this._currentCopies += 1
                    }
                    this.elem.reloadShapes()
                  }
                  for (i = s = 0; i <= this._groups.length - 1; i += 1) this._groups[i]._render = a = s < o, this.changeGroupRender(this._groups[i].it, a), s += 1;
                  this._currentCopies = o;
                  var l = (t = this.o.v) % 1,
                    p = 0 < t ? Math.floor(t) : Math.ceil(t),
                    c = (this.tr.v.props, this.pMatrix.props),
                    f = this.rMatrix.props,
                    u = this.sMatrix.props;
                  this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
                  var m, d, y = 0;
                  if (0 < t) {
                    for (; y < p;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), y += 1;
                    l && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, l, !1), y += l)
                  } else if (t < 0) {
                    for (; p < y;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), --y;
                    l && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -l, !0), y -= l)
                  }
                  for (i = 1 === this.data.m ? 0 : this._currentCopies - 1, n = 1 === this.data.m ? 1 : -1, s = this._currentCopies; s;) {
                    if (d = (r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props).length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, e[e.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1)), 0 !== y) {
                      for ((0 !== i && 1 === n || i !== this._currentCopies - 1 && -1 === n) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]), this.matrix.transform(u[0], u[1], u[2], u[3], u[4], u[5], u[6], u[7], u[8], u[9], u[10], u[11], u[12], u[13], u[14], u[15]), this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), m = 0; m < d; m += 1) r[m] = this.matrix.props[m];
                      this.matrix.reset()
                    } else
                      for (this.matrix.reset(), m = 0; m < d; m += 1) r[m] = this.matrix.props[m];
                    y += 1, --s, i += n
                  }
                } else
                  for (s = this._currentCopies, i = 0, n = 1; s;) r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, --s, i += n
              }, RepeaterModifier.prototype.addShape = function() {}, ShapeModifiers.registerModifier("rp", RepeaterModifier), ShapeCollection.prototype.addShape = function(t) {
                this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1
              }, ShapeCollection.prototype.releaseShapes = function() {
                for (var t = 0; t < this._length; t += 1) shape_pool.release(this.shapes[t]);
                this._length = 0
              }, DashProperty.prototype.getValue = function(t) {
                if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t, this._mdf)) {
                  var e = 0,
                    r = this.dataProps.length;
                  for ("svg" === this.renderer && (this.dashStr = ""), e = 0; e < r; e += 1) "o" != this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v
                }
              }, extendPrototype([DynamicPropertyContainer], DashProperty), GradientProperty.prototype.comparePoints = function(t, e) {
                for (var r = 0, i = this.o.length / 2; r < i;) {
                  if (.01 < Math.abs(t[4 * r] - t[4 * e + 2 * r])) return !1;
                  r += 1
                }
                return !0
              }, GradientProperty.prototype.checkCollapsable = function() {
                if (this.o.length / 2 != this.c.length / 4) return !1;
                if (this.data.k.k[0].s)
                  for (var t = 0, e = this.data.k.k.length; t < e;) {
                    if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
                    t += 1
                  } else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
                return !0
              }, GradientProperty.prototype.getValue = function(t) {
                if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
                  for (var e, r, i = 4 * this.data.p, n = 0; n < i; n += 1) e = n % 4 == 0 ? 100 : 255, r = Math.round(this.prop.v[n] * e), this.c[n] !== r && (this.c[n] = r, this._cmdf = !t);
                  if (this.o.length)
                    for (i = this.prop.v.length, n = 4 * this.data.p; n < i; n += 1) e = n % 2 == 0 ? 100 : 1, r = n % 2 == 0 ? Math.round(100 * this.prop.v[n]) : this.prop.v[n], this.o[n - 4 * this.data.p] !== r && (this.o[n - 4 * this.data.p] = r, this._omdf = !t);
                  this._mdf = !t
                }
              }, extendPrototype([DynamicPropertyContainer], GradientProperty);
              var buildShapeString = function(t, e, r, i) {
                  if (0 === e) return "";
                  for (var n = t.o, s = t.i, a = t.v, o = " M" + i.applyToPointStringified(a[0][0], a[0][1]), h = 1; h < e; h += 1) o += " C" + i.applyToPointStringified(n[h - 1][0], n[h - 1][1]) + " " + i.applyToPointStringified(s[h][0], s[h][1]) + " " + i.applyToPointStringified(a[h][0], a[h][1]);
                  return r && e ? o + " C" + i.applyToPointStringified(n[h - 1][0], n[h - 1][1]) + " " + i.applyToPointStringified(s[0][0], s[0][1]) + " " + i.applyToPointStringified(a[0][0], a[0][1]) + "z" : o
                },
                ImagePreloader = function() {
                  (t = createTag("canvas")).width = 1, t.height = 1, (e = t.getContext("2d")).fillStyle = "rgba(0,0,0,0)", e.fillRect(0, 0, 1, 1);
                  var t, e, r = t;

                  function i() {
                    this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null)
                  }

                  function n(t) {
                    e = t, n = this.assetsPath, s = this.path, i = "";
                    var e, i, n = i = e.e ? e.p : n ? n + (n = -1 !== (n = e.p).indexOf("images/") ? n.split("/")[1] : n) : (i = s, (i += e.u || "") + e.p),
                      s = createTag("img"),
                      a = (s.crossOrigin = "anonymous", s.addEventListener("load", this._imageLoaded.bind(this), !1), s.addEventListener("error", function() {
                        a.img = r, this._imageLoaded()
                      }.bind(this), !1), s.src = n, {
                        img: s,
                        assetData: t
                      });
                    return a
                  }

                  function s(t, e) {
                    this.imagesLoadedCb = e;
                    for (var r = t.length, i = 0; i < r; i += 1) t[i].layers || (this.totalImages += 1, this.images.push(this._createImageData(t[i])))
                  }

                  function a(t) {
                    this.path = t || ""
                  }

                  function o(t) {
                    this.assetsPath = t || ""
                  }

                  function h(t) {
                    for (var e = 0, r = this.images.length; e < r;) {
                      if (this.images[e].assetData === t) return this.images[e].img;
                      e += 1
                    }
                  }

                  function l() {
                    this.imagesLoadedCb = null, this.images.length = 0
                  }

                  function p() {
                    return this.totalImages === this.loadedAssets
                  }
                  return function() {
                    this.loadAssets = s, this.setAssetsPath = o, this.setPath = a, this.loaded = p, this.destroy = l, this.getImage = h, this._createImageData = n, this._imageLoaded = i, this.assetsPath = "", this.path = "", this.totalImages = 0, this.loadedAssets = 0, this.imagesLoadedCb = null, this.images = []
                  }
                }(),
                featureSupport = function() {
                  var t = {
                    maskType: !0
                  };
                  return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (t.maskType = !1), t
                }(),
                filtersFactory = {
                  createFilter: function(t) {
                    var e = createNS("filter");
                    return e.setAttribute("id", t), e.setAttribute("filterUnits", "objectBoundingBox"), e.setAttribute("x", "0%"), e.setAttribute("y", "0%"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e
                  },
                  createAlphaToLuminanceFilter: function() {
                    var t = createNS("feColorMatrix");
                    return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t
                  }
                },
                assetLoader = function() {
                  function t(t) {
                    return t.response && "object" === _typeof(t.response) ? t.response : t.response && "string" == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : void 0
                  }
                  return {
                    load: function(e, r, i) {
                      var n, s = new XMLHttpRequest;
                      s.open("GET", e, !0);
                      try {
                        s.responseType = "json"
                      } catch (t) {}
                      s.send(), s.onreadystatechange = function() {
                        if (4 == s.readyState)
                          if (200 == s.status) n = t(s), r(n);
                          else try {
                            n = t(s), r(n)
                          } catch (t) {
                            i && i(t)
                          }
                      }
                    }
                  }
                }();

              function TextAnimatorProperty(t, e, r) {
                this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._textData = t, this._renderType = e, this._elem = r, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = {
                  alignment: {}
                }, this.renderedLetters = [], this.lettersChangedFlag = !1, this.initDynamicPropertyContainer(r)
              }

              function TextAnimatorDataProperty(t, e, r) {
                var i = {
                    propType: !1
                  },
                  n = PropertyFactory.getProp,
                  s = e.a;
                this.a = {
                  r: s.r ? n(t, s.r, 0, degToRads, r) : i,
                  rx: s.rx ? n(t, s.rx, 0, degToRads, r) : i,
                  ry: s.ry ? n(t, s.ry, 0, degToRads, r) : i,
                  sk: s.sk ? n(t, s.sk, 0, degToRads, r) : i,
                  sa: s.sa ? n(t, s.sa, 0, degToRads, r) : i,
                  s: s.s ? n(t, s.s, 1, .01, r) : i,
                  a: s.a ? n(t, s.a, 1, 0, r) : i,
                  o: s.o ? n(t, s.o, 0, .01, r) : i,
                  p: s.p ? n(t, s.p, 1, 0, r) : i,
                  sw: s.sw ? n(t, s.sw, 0, 0, r) : i,
                  sc: s.sc ? n(t, s.sc, 1, 0, r) : i,
                  fc: s.fc ? n(t, s.fc, 1, 0, r) : i,
                  fh: s.fh ? n(t, s.fh, 0, 0, r) : i,
                  fs: s.fs ? n(t, s.fs, 0, .01, r) : i,
                  fb: s.fb ? n(t, s.fb, 0, .01, r) : i,
                  t: s.t ? n(t, s.t, 0, 0, r) : i
                }, this.s = TextSelectorProp.getTextSelectorProp(t, e.s, r), this.s.t = e.s.t
              }

              function LetterProps(t, e, r, i, n, s) {
                this.o = t, this.sw = e, this.sc = r, this.fc = i, this.m = n, this.p = s, this._mdf = {
                  o: !0,
                  sw: !!e,
                  sc: !!r,
                  fc: !!i,
                  m: !0,
                  p: !0
                }
              }

              function TextProperty(t, e) {
                this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !1, this.data = e, this.elem = t, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = !1, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = {
                  ascent: 0,
                  boxWidth: this.defaultBoxWidth,
                  f: "",
                  fStyle: "",
                  fWeight: "",
                  fc: "",
                  j: "",
                  justifyOffset: "",
                  l: [],
                  lh: 0,
                  lineWidths: [],
                  ls: "",
                  of: "",
                  s: "",
                  sc: "",
                  sw: 0,
                  t: 0,
                  tr: 0,
                  sz: 0,
                  ps: null,
                  fillColorAnim: !1,
                  strokeColorAnim: !1,
                  strokeWidthAnim: !1,
                  yOffset: 0,
                  finalSize: 0,
                  finalText: [],
                  finalLineHeight: 0,
                  __complete: !1
                }, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData)
              }
              TextAnimatorProperty.prototype.searchProperties = function() {
                for (var t, e = this._textData.a.length, r = PropertyFactory.getProp, i = 0; i < e; i += 1) t = this._textData.a[i], this._animatorsData[i] = new TextAnimatorDataProperty(this._elem, t, this);
                this._textData.p && "m" in this._textData.p ? (this._pathData = {
                  f: r(this._elem, this._textData.p.f, 0, 0, this),
                  l: r(this._elem, this._textData.p.l, 0, 0, this),
                  r: this._textData.p.r,
                  m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
                }, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = r(this._elem, this._textData.m.a, 1, 0, this)
              }, TextAnimatorProperty.prototype.getMeasures = function(t, e) {
                if (this.lettersChangedFlag = e, this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
                  this._isFirstFrame = !1;
                  var r, i, n, s, a, o, h, l, p, c, f, u, m, d = this._moreOptions.alignment.v,
                    y = this._animatorsData,
                    g = this._textData,
                    v = this.mHelper,
                    b = this._renderType,
                    P = this.renderedLetters.length,
                    x = (this.data, t.l);
                  if (this._hasMaskedPath) {
                    if (m = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
                      for (var _, T = m.v, S = {
                          tLength: 0,
                          segments: []
                        }, E = (T = this._pathData.r ? T.reverse() : T)._length - 1, w = f = 0; w < E; w += 1) _ = bez.buildBezierData(T.v[w], T.v[w + 1], [T.o[w][0] - T.v[w][0], T.o[w][1] - T.v[w][1]], [T.i[w + 1][0] - T.v[w + 1][0], T.i[w + 1][1] - T.v[w + 1][1]]), S.tLength += _.segmentLength, S.segments.push(_), f += _.segmentLength;
                      w = E, m.v.c && (_ = bez.buildBezierData(T.v[w], T.v[0], [T.o[w][0] - T.v[w][0], T.o[w][1] - T.v[w][1]], [T.i[0][0] - T.v[0][0], T.i[0][1] - T.v[0][1]]), S.tLength += _.segmentLength, S.segments.push(_), f += _.segmentLength), this._pathData.pi = S
                    }
                    if (S = this._pathData.pi, r = this._pathData.f.v, a = 1, s = !(n = o = 0), p = S.segments, r < 0 && m.v.c)
                      for (S.tLength < Math.abs(r) && (r = -Math.abs(r) % S.tLength), a = (l = p[o = p.length - 1].points).length - 1; r < 0;) r += l[a].partialLength, --a < 0 && (a = (l = p[--o].points).length - 1);
                    h = (l = p[o].points)[a - 1], c = (i = l[a]).partialLength
                  }
                  E = x.length;
                  var A, C, D, k, I, F, M, R, O, L, V, B, j, N, z, G, q = 0,
                    H = 0,
                    W = 1.2 * t.finalSize * .714,
                    U = !0,
                    Y = y.length,
                    K = -1,
                    X = r,
                    $ = o,
                    Z = a,
                    J = -1,
                    Q = "",
                    tt = this.defaultPropsArray;
                  if (2 === t.j || 1 === t.j) {
                    var et = 0,
                      rt = 0,
                      it = 2 === t.j ? -.5 : -1,
                      nt = 0,
                      st = !0;
                    for (w = 0; w < E; w += 1)
                      if (x[w].n) {
                        for (et && (et += rt); nt < w;) x[nt].animatorJustifyOffset = et, nt += 1;
                        st = !(et = 0)
                      } else {
                        for (ot = 0; ot < Y; ot += 1)(A = y[ot].a).t.propType && (st && 2 === t.j && (rt += A.t.v * it), (D = y[ot].s.getMult(x[w].anIndexes[ot], g.a[ot].s.totalChars)).length ? et += A.t.v * D[0] * it : et += A.t.v * D * it);
                        st = !1
                      } for (et && (et += rt); nt < w;) x[nt].animatorJustifyOffset = et, nt += 1
                  }
                  for (w = 0; w < E; w += 1) {
                    if (v.reset(), M = 1, x[w].n) q = 0, H = H + t.yOffset + (U ? 1 : 0), r = X, U = !1, this._hasMaskedPath && (h = (l = p[o = $].points)[(a = Z) - 1], c = (i = l[a]).partialLength, n = 0), z = B = N = Q = "", tt = this.defaultPropsArray;
                    else {
                      if (this._hasMaskedPath) {
                        if (J !== x[w].line) {
                          switch (t.j) {
                            case 1:
                              r += f - t.lineWidths[x[w].line];
                              break;
                            case 2:
                              r += (f - t.lineWidths[x[w].line]) / 2
                          }
                          J = x[w].line
                        }
                        K !== x[w].ind && (x[K] && (r += x[K].extra), r += x[w].an / 2, K = x[w].ind), r += d[0] * x[w].an / 200;
                        for (var at = 0, ot = 0; ot < Y; ot += 1)(A = y[ot].a).p.propType && ((D = y[ot].s.getMult(x[w].anIndexes[ot], g.a[ot].s.totalChars)).length ? at += A.p.v[0] * D[0] : at += A.p.v[0] * D), A.a.propType && ((D = y[ot].s.getMult(x[w].anIndexes[ot], g.a[ot].s.totalChars)).length ? at += A.a.v[0] * D[0] : at += A.a.v[0] * D);
                        for (s = !0; s;) r + at <= n + c || !l ? (u = (r + at - n) / i.partialLength, I = h.point[0] + (i.point[0] - h.point[0]) * u, F = h.point[1] + (i.point[1] - h.point[1]) * u, v.translate(-d[0] * x[w].an / 200, -d[1] * W / 100), s = !1) : l && (n += i.partialLength, (a += 1) >= l.length && (a = 0, l = p[o += 1] ? p[o].points : m.v.c ? p[o = a = 0].points : (n -= i.partialLength, null)), l) && (h = i, c = (i = l[a]).partialLength);
                        k = x[w].an / 2 - x[w].add, v.translate(-k, 0, 0)
                      } else k = x[w].an / 2 - x[w].add, v.translate(-k, 0, 0), v.translate(-d[0] * x[w].an / 200, -d[1] * W / 100, 0);
                      for (x[w].l, ot = 0; ot < Y; ot += 1)(A = y[ot].a).t.propType && (D = y[ot].s.getMult(x[w].anIndexes[ot], g.a[ot].s.totalChars), 0 === q && 0 === t.j || (this._hasMaskedPath ? D.length ? r += A.t.v * D[0] : r += A.t.v * D : D.length ? q += A.t.v * D[0] : q += A.t.v * D));
                      for (x[w].l, t.strokeWidthAnim && (O = t.sw || 0), t.strokeColorAnim && (R = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (L = [t.fc[0], t.fc[1], t.fc[2]]), ot = 0; ot < Y; ot += 1)(A = y[ot].a).a.propType && ((D = y[ot].s.getMult(x[w].anIndexes[ot], g.a[ot].s.totalChars)).length ? v.translate(-A.a.v[0] * D[0], -A.a.v[1] * D[1], A.a.v[2] * D[2]) : v.translate(-A.a.v[0] * D, -A.a.v[1] * D, A.a.v[2] * D));
                      for (ot = 0; ot < Y; ot += 1)(A = y[ot].a).s.propType && ((D = y[ot].s.getMult(x[w].anIndexes[ot], g.a[ot].s.totalChars)).length ? v.scale(1 + (A.s.v[0] - 1) * D[0], 1 + (A.s.v[1] - 1) * D[1], 1) : v.scale(1 + (A.s.v[0] - 1) * D, 1 + (A.s.v[1] - 1) * D, 1));
                      for (ot = 0; ot < Y; ot += 1) {
                        if (A = y[ot].a, D = y[ot].s.getMult(x[w].anIndexes[ot], g.a[ot].s.totalChars), A.sk.propType && (D.length ? v.skewFromAxis(-A.sk.v * D[0], A.sa.v * D[1]) : v.skewFromAxis(-A.sk.v * D, A.sa.v * D)), A.r.propType && (D.length ? v.rotateZ(-A.r.v * D[2]) : v.rotateZ(-A.r.v * D)), A.ry.propType && (D.length ? v.rotateY(A.ry.v * D[1]) : v.rotateY(A.ry.v * D)), A.rx.propType && (D.length ? v.rotateX(A.rx.v * D[0]) : v.rotateX(A.rx.v * D)), A.o.propType && (D.length ? M += (A.o.v * D[0] - M) * D[0] : M += (A.o.v * D - M) * D), t.strokeWidthAnim && A.sw.propType && (D.length ? O += A.sw.v * D[0] : O += A.sw.v * D), t.strokeColorAnim && A.sc.propType)
                          for (V = 0; V < 3; V += 1) D.length ? R[V] = R[V] + (A.sc.v[V] - R[V]) * D[0] : R[V] = R[V] + (A.sc.v[V] - R[V]) * D;
                        if (t.fillColorAnim && t.fc) {
                          if (A.fc.propType)
                            for (V = 0; V < 3; V += 1) D.length ? L[V] = L[V] + (A.fc.v[V] - L[V]) * D[0] : L[V] = L[V] + (A.fc.v[V] - L[V]) * D;
                          A.fh.propType && (L = D.length ? addHueToRGB(L, A.fh.v * D[0]) : addHueToRGB(L, A.fh.v * D)), A.fs.propType && (L = D.length ? addSaturationToRGB(L, A.fs.v * D[0]) : addSaturationToRGB(L, A.fs.v * D)), A.fb.propType && (L = D.length ? addBrightnessToRGB(L, A.fb.v * D[0]) : addBrightnessToRGB(L, A.fb.v * D))
                        }
                      }
                      for (ot = 0; ot < Y; ot += 1)(A = y[ot].a).p.propType && (D = y[ot].s.getMult(x[w].anIndexes[ot], g.a[ot].s.totalChars), this._hasMaskedPath ? D.length ? v.translate(0, A.p.v[1] * D[0], -A.p.v[2] * D[1]) : v.translate(0, A.p.v[1] * D, -A.p.v[2] * D) : D.length ? v.translate(A.p.v[0] * D[0], A.p.v[1] * D[1], -A.p.v[2] * D[2]) : v.translate(A.p.v[0] * D, A.p.v[1] * D, -A.p.v[2] * D));
                      if (t.strokeWidthAnim && (B = O < 0 ? 0 : O), t.strokeColorAnim && (j = "rgb(" + Math.round(255 * R[0]) + "," + Math.round(255 * R[1]) + "," + Math.round(255 * R[2]) + ")"), t.fillColorAnim && t.fc && (N = "rgb(" + Math.round(255 * L[0]) + "," + Math.round(255 * L[1]) + "," + Math.round(255 * L[2]) + ")"), this._hasMaskedPath) v.translate(0, -t.ls), v.translate(0, d[1] * W / 100 + H, 0), g.p.p && (G = (i.point[1] - h.point[1]) / (i.point[0] - h.point[0]), G = 180 * Math.atan(G) / Math.PI, i.point[0] < h.point[0] && (G += 180), v.rotate(-G * Math.PI / 180)), v.translate(I, F, 0), r -= d[0] * x[w].an / 200, x[w + 1] && K !== x[w + 1].ind && (r = (r += x[w].an / 2) + t.tr / 1e3 * t.finalSize);
                      else {
                        switch (v.translate(q, H, 0), t.ps && v.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
                          case 1:
                            v.translate(x[w].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[x[w].line]), 0, 0);
                            break;
                          case 2:
                            v.translate(x[w].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[x[w].line]) / 2, 0, 0)
                        }
                        v.translate(0, -t.ls), v.translate(k, 0, 0), v.translate(d[0] * x[w].an / 200, d[1] * W / 100, 0), q += x[w].l + t.tr / 1e3 * t.finalSize
                      }
                      "html" === b ? Q = v.toCSS() : "svg" === b ? Q = v.to2dCSS() : tt = [v.props[0], v.props[1], v.props[2], v.props[3], v.props[4], v.props[5], v.props[6], v.props[7], v.props[8], v.props[9], v.props[10], v.props[11], v.props[12], v.props[13], v.props[14], v.props[15]], z = M
                    }
                    P <= w ? (C = new LetterProps(z, B, j, N, Q, tt), this.renderedLetters.push(C), P += 1, this.lettersChangedFlag = !0) : (C = this.renderedLetters[w], this.lettersChangedFlag = C.update(z, B, j, N, Q, tt) || this.lettersChangedFlag)
                  }
                }
              }, TextAnimatorProperty.prototype.getValue = function() {
                this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties())
              }, TextAnimatorProperty.prototype.mHelper = new Matrix, TextAnimatorProperty.prototype.defaultPropsArray = [], extendPrototype([DynamicPropertyContainer], TextAnimatorProperty), LetterProps.prototype.update = function(t, e, r, i, n, s) {
                this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1;
                var a = this._mdf.p = !1;
                return this.o !== t && (this.o = t, a = this._mdf.o = !0), this.sw !== e && (this.sw = e, a = this._mdf.sw = !0), this.sc !== r && (this.sc = r, a = this._mdf.sc = !0), this.fc !== i && (this.fc = i, a = this._mdf.fc = !0), this.m !== n && (this.m = n, a = this._mdf.m = !0), !s.length || this.p[0] === s[0] && this.p[1] === s[1] && this.p[4] === s[4] && this.p[5] === s[5] && this.p[12] === s[12] && this.p[13] === s[13] || (this.p = s, a = this._mdf.p = !0), a
              }, TextProperty.prototype.defaultBoxWidth = [0, 0], TextProperty.prototype.copyData = function(t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
                return t
              }, TextProperty.prototype.setCurrentData = function(t) {
                t.__complete || this.completeTextData(t), this.currentData = t, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = !0
              }, TextProperty.prototype.searchProperty = function() {
                return this.searchKeyframes()
              }, TextProperty.prototype.searchKeyframes = function() {
                return this.kf = 1 < this.data.d.k.length, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf
              }, TextProperty.prototype.addEffect = function(t) {
                this.effectsSequence.push(t), this.elem.addDynamicProperty(this)
              }, TextProperty.prototype.getValue = function(t) {
                if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
                  this.currentData.t = this.data.d.k[this.keysIndex].s.t;
                  var e = this.currentData,
                    r = this.keysIndex;
                  if (this.lock) this.setCurrentData(this.currentData);
                  else {
                    this.lock = !0, this._mdf = !1;
                    for (var i = this.effectsSequence.length, n = t || this.data.d.k[this.keysIndex].s, s = 0; s < i; s += 1) n = r !== this.keysIndex ? this.effectsSequence[s](n, n.t) : this.effectsSequence[s](this.currentData, n.t);
                    e !== n && this.setCurrentData(n), this.pv = this.v = this.currentData, this.lock = !1, this.frameId = this.elem.globalData.frameId
                  }
                }
              }, TextProperty.prototype.getKeyframeValue = function() {
                for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, r = 0, i = t.length; r <= i - 1 && (t[r].s, !(r === i - 1 || t[r + 1].t > e));) r += 1;
                return this.keysIndex !== r && (this.keysIndex = r), this.data.d.k[this.keysIndex].s
              }, TextProperty.prototype.buildFinalText = function(t) {
                for (var e, r = FontManager.getCombinedCharacterCodes(), i = [], n = 0, s = t.length; n < s;) e = t.charCodeAt(n), -1 !== r.indexOf(e) ? i[i.length - 1] += t.charAt(n) : 55296 <= e && e <= 56319 && 56320 <= (e = t.charCodeAt(n + 1)) && e <= 57343 ? (i.push(t.substr(n, 2)), ++n) : i.push(t.charAt(n)), n += 1;
                return i
              }, TextProperty.prototype.completeTextData = function(t) {
                t.__complete = !0;
                var e, r, i, n = this.elem.globalData.fontManager,
                  s = this.data,
                  a = [],
                  o = 0,
                  h = s.m.g,
                  l = 0,
                  p = 0,
                  c = 0,
                  f = [],
                  u = 0,
                  m = 0,
                  d = n.getFontByName(t.f),
                  y = 0,
                  g = d.fStyle ? d.fStyle.split(" ") : [],
                  v = "normal",
                  b = "normal";
                for (A = g.length, D = 0; D < A; D += 1) switch (g[D].toLowerCase()) {
                  case "italic":
                    b = "italic";
                    break;
                  case "bold":
                    v = "700";
                    break;
                  case "black":
                    v = "900";
                    break;
                  case "medium":
                    v = "500";
                    break;
                  case "regular":
                  case "normal":
                    v = "400";
                    break;
                  case "light":
                  case "thin":
                    v = "200"
                }
                t.fWeight = d.fWeight || v, t.fStyle = b, t.finalSize = t.s, t.finalText = this.buildFinalText(t.t), A = t.finalText.length, t.finalLineHeight = t.lh;
                var P, x = t.tr / 1e3 * t.finalSize;
                if (t.sz)
                  for (var _, T = !0, S = t.sz[0], E = t.sz[1]; T;) {
                    for (var w = 0, A = (u = 0, (_ = this.buildFinalText(t.t)).length), C = (x = t.tr / 1e3 * t.finalSize, -1), D = 0; D < A; D += 1) P = _[D].charCodeAt(0), e = !1, " " === _[D] ? C = D : 13 !== P && 3 !== P || (e = !(u = 0), w += t.finalLineHeight || 1.2 * t.finalSize), S < u + (y = n.chars ? (i = n.getCharData(_[D], d.fStyle, d.fFamily), e ? 0 : i.w * t.finalSize / 100) : n.measureText(_[D], t.f, t.finalSize)) && " " !== _[D] ? (-1 === C ? A += 1 : D = C, w += t.finalLineHeight || 1.2 * t.finalSize, _.splice(D, C === D ? 1 : 0, "\r"), C = -1, u = 0) : u = u + y + x;
                    w += d.ascent * t.finalSize / 100, this.canResize && t.finalSize > this.minimumFontSize && E < w ? (--t.finalSize, t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = _, A = t.finalText.length, T = !1)
                  }
                u = -x;
                y = 0;
                var k, I = 0;
                for (D = 0; D < A; D += 1)
                  if (e = !1, P = (k = t.finalText[D]).charCodeAt(0), " " === k ? r = " " : 13 === P || 3 === P ? (I = 0, f.push(u), m = m < u ? u : m, u = -2 * x, e = !(r = ""), c += 1) : r = t.finalText[D], y = n.chars ? (i = n.getCharData(k, d.fStyle, n.getFontByName(t.f).fFamily), e ? 0 : i.w * t.finalSize / 100) : n.measureText(r, t.f, t.finalSize), " " === k ? I += y + x : (u += y + x + I, I = 0), a.push({
                      l: y,
                      an: y,
                      add: l,
                      n: e,
                      anIndexes: [],
                      val: r,
                      line: c,
                      animatorJustifyOffset: 0
                    }), 2 == h) {
                    if (l += y, "" === r || " " === r || D === A - 1) {
                      for ("" !== r && " " !== r || (l -= y); p <= D;) a[p].an = l, a[p].ind = o, a[p].extra = y, p += 1;
                      o += 1, l = 0
                    }
                  } else if (3 == h) {
                  if (l += y, "" === r || D === A - 1) {
                    for ("" === r && (l -= y); p <= D;) a[p].an = l, a[p].ind = o, a[p].extra = y, p += 1;
                    l = 0, o += 1
                  }
                } else a[o].ind = o, a[o].extra = 0, o += 1;
                if (t.l = a, m = m < u ? u : m, f.push(u), t.sz) t.boxWidth = t.sz[0], t.justifyOffset = 0;
                else switch (t.boxWidth = m, t.j) {
                  case 1:
                    t.justifyOffset = -t.boxWidth;
                    break;
                  case 2:
                    t.justifyOffset = -t.boxWidth / 2;
                    break;
                  default:
                    t.justifyOffset = 0
                }
                t.lineWidths = f;
                for (var F, M, R, O, L = s.a, V = L.length, B = [], j = 0; j < V; j += 1) {
                  for ((F = L[j]).a.sc && (t.strokeColorAnim = !0), F.a.sw && (t.strokeWidthAnim = !0), (F.a.fc || F.a.fh || F.a.fs || F.a.fb) && (t.fillColorAnim = !0), R = F.s.b, D = O = 0; D < A; D += 1)(M = a[D]).anIndexes[j] = O, (1 == R && "" !== M.val || 2 == R && "" !== M.val && " " !== M.val || 3 == R && (M.n || " " == M.val || D == A - 1) || 4 == R && (M.n || D == A - 1)) && (1 === F.s.rn && B.push(O), O += 1);
                  s.a[j].s.totalChars = O;
                  var N, z = -1;
                  if (1 === F.s.rn)
                    for (D = 0; D < A; D += 1) z != (M = a[D]).anIndexes[j] && (z = M.anIndexes[j], N = B.splice(Math.floor(Math.random() * B.length), 1)[0]), M.anIndexes[j] = N
                }
                t.yOffset = t.finalLineHeight || 1.2 * t.finalSize, t.ls = t.ls || 0, t.ascent = d.ascent * t.finalSize / 100
              }, TextProperty.prototype.updateDocumentData = function(t, e) {
                e = void 0 === e ? this.keysIndex : e;
                var r = this.copyData({}, this.data.d.k[e].s);
                r = this.copyData(r, t);
                this.data.d.k[e].s = r, this.recalculate(e), this.elem.addDynamicProperty(this)
              }, TextProperty.prototype.recalculate = function(t) {
                (t = this.data.d.k[t].s).__complete = !1, this.keysIndex = 0, this._isFirstFrame = !0, this.getValue(t)
              }, TextProperty.prototype.canResizeFont = function(t) {
                this.canResize = t, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
              }, TextProperty.prototype.setMinimumFontSize = function(t) {
                this.minimumFontSize = Math.floor(t) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
              };
              var TextSelectorProp = function() {
                  var t = Math.max,
                    e = Math.min,
                    r = Math.floor;

                  function i(t, e) {
                    this._currentTextLength = -1, this.k = !1, this.data = e, this.elem = t, this.comp = t.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(t), this.s = PropertyFactory.getProp(t, e.s || {
                      k: 0
                    }, 0, 0, this), this.e = "e" in e ? PropertyFactory.getProp(t, e.e, 0, 0, this) : {
                      v: 100
                    }, this.o = PropertyFactory.getProp(t, e.o || {
                      k: 0
                    }, 0, 0, this), this.xe = PropertyFactory.getProp(t, e.xe || {
                      k: 0
                    }, 0, 0, this), this.ne = PropertyFactory.getProp(t, e.ne || {
                      k: 0
                    }, 0, 0, this), this.a = PropertyFactory.getProp(t, e.a, 0, .01, this), this.dynamicProperties.length || this.getValue()
                  }
                  return i.prototype = {
                    getMult: function(i) {
                      this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
                      var n, s, a = BezierFactory.getBezierEasing(this.ne.v / 100, 0, 1 - this.xe.v / 100, 1).get,
                        o = 0,
                        h = this.finalS,
                        l = this.finalE,
                        p = this.data.sh;
                      return (o = 2 == p ? a(o = l === h ? l <= i ? 1 : 0 : t(0, e(.5 / (l - h) + (i - h) / (l - h), 1))) : 3 == p ? a(o = l === h ? l <= i ? 0 : 1 : 1 - t(0, e(.5 / (l - h) + (i - h) / (l - h), 1))) : 4 == p ? (l === h ? o = 0 : (o = t(0, e(.5 / (l - h) + (i - h) / (l - h), 1))) < .5 ? o *= 2 : o = 1 - 2 * (o - .5), a(o)) : 5 == p ? a(o = l === h ? 0 : (n = -(s = l - h) / 2 + (i = e(t(0, i + .5 - h), l - h)), s /= 2, Math.sqrt(1 - n * n / (s * s)))) : (6 == p ? o = l === h ? 0 : (i = e(t(0, i + .5 - h), l - h), (1 + Math.cos(Math.PI + 2 * Math.PI * i / (l - h))) / 2) : i >= r(h) && (o = i - h < 0 ? 1 - (h - i) : t(0, e(l - i, 1))), a(o))) * this.a.v
                    },
                    getValue: function(t) {
                      this.iterateDynamicProperties(), this._mdf = t || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, t && 2 === this.data.r && (this.e.v = this._currentTextLength);
                      t = 2 === this.data.r ? 1 : 100 / this.data.totalChars;
                      var e = this.o.v / t,
                        r = this.s.v / t + e;
                      (t = this.e.v / t + e) < r && (e = r, r = t, t = e), this.finalS = r, this.finalE = t
                    }
                  }, extendPrototype([DynamicPropertyContainer], i), {
                    getTextSelectorProp: function(t, e, r) {
                      return new i(t, e)
                    }
                  }
                }(),
                pool_factory = function(t, e, r, i) {
                  var n = 0,
                    s = t,
                    a = createSizedArray(s);
                  return {
                    newElement: function() {
                      return n ? a[--n] : e()
                    },
                    release: function(t) {
                      n === s && (a = pooling.double(a), s *= 2), r && r(t), a[n] = t, n += 1
                    }
                  }
                },
                pooling = {
                  double: function(t) {
                    return t.concat(createSizedArray(t.length))
                  }
                },
                point_pool = pool_factory(8, (function() {
                  return createTypedArray("float32", 2)
                })),
                shape_pool = (factory = pool_factory(4, (function() {
                  return new ShapePath
                }), (function(t) {
                  for (var e = t._length, r = 0; r < e; r += 1) point_pool.release(t.v[r]), point_pool.release(t.i[r]), point_pool.release(t.o[r]), t.v[r] = null, t.i[r] = null, t.o[r] = null;
                  t._length = 0, t.c = !1
                })), factory.clone = function(t) {
                  var e, r = factory.newElement(),
                    i = void 0 === t._length ? t.v.length : t._length;
                  for (r.setLength(i), r.c = t.c, e = 0; e < i; e += 1) r.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
                  return r
                }, factory),
                factory, shapeCollection_pool = function() {
                  var t = {
                      newShapeCollection: function() {
                        return e ? i[--e] : new ShapeCollection
                      },
                      release: function(t) {
                        for (var n = t._length, s = 0; s < n; s += 1) shape_pool.release(t.shapes[s]);
                        t._length = 0, e === r && (i = pooling.double(i), r *= 2), i[e] = t, e += 1
                      }
                    },
                    e = 0,
                    r = 4,
                    i = createSizedArray(r);
                  return t
                }(),
                segments_length_pool = pool_factory(8, (function() {
                  return {
                    lengths: [],
                    totalLength: 0
                  }
                }), (function(t) {
                  for (var e = t.lengths.length, r = 0; r < e; r += 1) bezier_length_pool.release(t.lengths[r]);
                  t.lengths.length = 0
                })),
                bezier_length_pool = pool_factory(8, (function() {
                  return {
                    addedLength: 0,
                    percents: createTypedArray("float32", defaultCurveSegments),
                    lengths: createTypedArray("float32", defaultCurveSegments)
                  }
                }));

              function BaseRenderer() {}

              function SVGRenderer(t, e) {
                this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");
                t = "";
                var r = (e && e.title && (r = createNS("title"), i = createElementID(), r.setAttribute("id", i), r.textContent = e.title, this.svgElement.appendChild(r), t += i), e && e.description && (r = createNS("desc"), i = createElementID(), r.setAttribute("id", i), r.textContent = e.description, this.svgElement.appendChild(r), t += " " + i), t && this.svgElement.setAttribute("aria-labelledby", t), createNS("defs")),
                  i = (this.svgElement.appendChild(r), createNS("g"));
                this.svgElement.appendChild(i), this.layerElement = i, this.renderConfig = {
                  preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
                  imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
                  progressiveLoad: e && e.progressiveLoad || !1,
                  hideOnTransparent: !e || !1 !== e.hideOnTransparent,
                  viewBoxOnly: e && e.viewBoxOnly || !1,
                  viewBoxSize: e && e.viewBoxSize || !1,
                  className: e && e.className || ""
                }, this.globalData = {
                  _mdf: !1,
                  frameNum: -1,
                  defs: r,
                  renderConfig: this.renderConfig
                }, this.elements = [], this.pendingElements = [], this.destroyed = !1, this.rendererType = "svg"
              }

              function CanvasRenderer(t, e) {
                this.animationItem = t, this.renderConfig = {
                  clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
                  context: e && e.context || null,
                  progressiveLoad: e && e.progressiveLoad || !1,
                  preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
                  imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
                  className: e && e.className || ""
                }, this.renderConfig.dpr = e && e.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
                  frameNum: -1,
                  _mdf: !1,
                  renderConfig: this.renderConfig,
                  currentGlobalAlpha: -1
                }, this.contextData = new CVContextData, this.elements = [], this.pendingElements = [], this.transformMat = new Matrix, this.completeLayers = !1, this.rendererType = "canvas"
              }

              function MaskElement(t, e, r) {
                this.data = t, this.element = e, this.globalData = r, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
                var i = this.globalData.defs,
                  n = this.masksProperties ? this.masksProperties.length : 0;
                this.viewData = createSizedArray(n), this.solidPath = "";
                for (var s, a, o, h, l, p = this.masksProperties, c = 0, f = [], u = createElementID(), m = "clipPath", d = "clip-path", y = 0; y < n; y++)
                  if (("a" !== p[y].mode && "n" !== p[y].mode || p[y].inv || 100 !== p[y].o.k || p[y].o.x) && (d = m = "mask"), "s" != p[y].mode && "i" != p[y].mode || 0 !== c ? a = null : ((a = createNS("rect")).setAttribute("fill", "#ffffff"), a.setAttribute("width", this.element.comp.data.w || 0), a.setAttribute("height", this.element.comp.data.h || 0), f.push(a)), s = createNS("path"), "n" != p[y].mode) {
                    if (c += 1, s.setAttribute("fill", "s" === p[y].mode ? "#000000" : "#ffffff"), s.setAttribute("clip-rule", "nonzero"), 0 !== p[y].x.k ? (d = m = "mask", h = PropertyFactory.getProp(this.element, p[y].x, 0, null, this.element), l = createElementID(), (P = createNS("filter")).setAttribute("id", l), (o = createNS("feMorphology")).setAttribute("operator", "erode"), o.setAttribute("in", "SourceGraphic"), o.setAttribute("radius", "0"), P.appendChild(o), i.appendChild(P), s.setAttribute("stroke", "s" === p[y].mode ? "#000000" : "#ffffff")) : h = o = null, this.storedData[y] = {
                        elem: s,
                        x: h,
                        expan: o,
                        lastPath: "",
                        lastOperator: "",
                        filterId: l,
                        lastRadius: 0
                      }, "i" == p[y].mode) {
                      for (var g = f.length, v = createNS("g"), b = 0; b < g; b += 1) v.appendChild(f[b]);
                      var P = createNS("mask");
                      P.setAttribute("mask-type", "alpha"), P.setAttribute("id", u + "_" + c), P.appendChild(s), i.appendChild(P), v.setAttribute("mask", "url(" + locationHref + "#" + u + "_" + c + ")"), f.length = 0, f.push(v)
                    } else f.push(s);
                    p[y].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[y] = {
                      elem: s,
                      lastPath: "",
                      op: PropertyFactory.getProp(this.element, p[y].o, 0, .01, this.element),
                      prop: ShapePropertyFactory.getShapeProp(this.element, p[y], 3),
                      invRect: a
                    }, this.viewData[y].prop.k || this.drawPath(p[y], this.viewData[y].prop.v, this.viewData[y])
                  } else this.viewData[y] = {
                    op: PropertyFactory.getProp(this.element, p[y].o, 0, .01, this.element),
                    prop: ShapePropertyFactory.getShapeProp(this.element, p[y], 3),
                    elem: s,
                    lastPath: ""
                  }, i.appendChild(s);
                for (this.maskElement = createNS(m), n = f.length, y = 0; y < n; y += 1) this.maskElement.appendChild(f[y]);
                0 < c && (this.maskElement.setAttribute("id", u), this.element.maskedElement.setAttribute(d, "url(" + locationHref + "#" + u + ")"), i.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this)
              }

              function HierarchyElement() {}

              function FrameElement() {}

              function TransformElement() {}

              function RenderableElement() {}

              function RenderableDOMElement() {}

              function ProcessedElement(t, e) {
                this.elem = t, this.pos = e
              }

              function SVGShapeData(t, e, r) {
                this.caches = [], this.styles = [], this.transformers = t, this.lStr = "", this.sh = r, this.lvl = e, this._isAnimated = !!r.k;
                for (var i = 0, n = t.length; i < n;) {
                  if (t[i].mProps.dynamicProperties.length) {
                    this._isAnimated = !0;
                    break
                  }
                  i += 1
                }
              }

              function ShapeGroupData() {
                this.it = [], this.prevViewData = [], this.gr = createNS("g")
              }

              function ShapeTransformManager() {
                this.sequences = {}, this.sequenceList = [], this.transform_key_count = 0
              }

              function CVShapeData(t, e, r, i) {
                this.styledShapes = [], this.tr = [0, 0, 0, 0, 0, 0];
                var n = 4;
                "rc" == e.ty ? n = 5 : "el" == e.ty ? n = 6 : "sr" == e.ty && (n = 7), this.sh = ShapePropertyFactory.getShapeProp(t, e, n, t);
                for (var s, a = r.length, o = 0; o < a; o += 1) r[o].closed || (s = {
                  transforms: i.addTransformSequence(r[o].transforms),
                  trNodes: []
                }, this.styledShapes.push(s), r[o].elements.push(s))
              }

              function BaseElement() {}

              function NullElement(t, e, r) {
                this.initFrame(), this.initBaseData(t, e, r), this.initFrame(), this.initTransform(t, e, r), this.initHierarchy()
              }

              function SVGBaseElement() {}

              function IShapeElement() {}

              function ITextElement() {}

              function ICompElement() {}

              function IImageElement(t, e, r) {
                this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r), this.sourceRect = {
                  top: 0,
                  left: 0,
                  width: this.assetData.w,
                  height: this.assetData.h
                }
              }

              function ISolidElement(t, e, r) {
                this.initElement(t, e, r)
              }

              function SVGShapeElement(t, e, r) {
                this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t, e, r), this.prevViewData = []
              }

              function CVContextData() {
                var t;
                for (this.saved = [], this.cArrPos = 0, this.cTr = new Matrix, this.cO = 1, this.savedOp = createTypedArray("float32", 15), t = 0; t < 15; t += 1) this.saved[t] = createTypedArray("float32", 16);
                this._length = 15
              }

              function CVBaseElement() {}

              function CVImageElement(t, e, r) {
                this.assetData = e.getAssetData(t.refId), this.img = e.imageLoader.getImage(this.assetData), this.initElement(t, e, r)
              }

              function CVCompElement(t, e, r) {
                this.completeLayers = !1, this.layers = t.layers, this.pendingElements = [], this.elements = createSizedArray(this.layers.length), this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
                  _placeholder: !0
                }
              }

              function CVMaskElement(t, e) {
                this.data = t, this.element = e, this.masksProperties = this.data.masksProperties || [], this.viewData = createSizedArray(this.masksProperties.length);
                for (var r = this.masksProperties.length, i = !1, n = 0; n < r; n++) "n" !== this.masksProperties[n].mode && (i = !0), this.viewData[n] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[n], 3);
                (this.hasMasks = i) && this.element.addRenderableComponent(this)
              }

              function CVShapeElement(t, e, r) {
                this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.transformsManager = new ShapeTransformManager, this.initElement(t, e, r)
              }

              function CVSolidElement(t, e, r) {
                this.initElement(t, e, r)
              }

              function CVTextElement(t, e, r) {
                this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
                  fill: "rgba(0,0,0,0)",
                  stroke: "rgba(0,0,0,0)",
                  sWidth: 0,
                  fValue: ""
                }, this.initElement(t, e, r)
              }

              function CVEffects() {}
              BaseRenderer.prototype.checkLayers = function(t) {
                var e, r, i = this.layers.length;
                for (this.completeLayers = !0, e = i - 1; 0 <= e; e--) this.elements[e] || (r = this.layers[e]).ip - r.st <= t - this.layers[e].st && r.op - r.st > t - this.layers[e].st && this.buildItem(e), this.completeLayers = !!this.elements[e] && this.completeLayers;
                this.checkPendingElements()
              }, BaseRenderer.prototype.createItem = function(t) {
                switch (t.ty) {
                  case 2:
                    return this.createImage(t);
                  case 0:
                    return this.createComp(t);
                  case 1:
                    return this.createSolid(t);
                  case 3:
                    return this.createNull(t);
                  case 4:
                    return this.createShape(t);
                  case 5:
                    return this.createText(t);
                  case 13:
                    return this.createCamera(t)
                }
                return this.createNull(t)
              }, BaseRenderer.prototype.createCamera = function() {
                throw new Error("You're using a 3d camera. Try the html renderer.")
              }, BaseRenderer.prototype.buildAllItems = function() {
                for (var t = this.layers.length, e = 0; e < t; e += 1) this.buildItem(e);
                this.checkPendingElements()
              }, BaseRenderer.prototype.includeLayers = function(t) {
                this.completeLayers = !1;
                for (var e, r = t.length, i = this.layers.length, n = 0; n < r; n += 1)
                  for (e = 0; e < i;) {
                    if (this.layers[e].id == t[n].id) {
                      this.layers[e] = t[n];
                      break
                    }
                    e += 1
                  }
              }, BaseRenderer.prototype.setProjectInterface = function(t) {
                this.globalData.projectInterface = t
              }, BaseRenderer.prototype.initItems = function() {
                this.globalData.progressiveLoad || this.buildAllItems()
              }, BaseRenderer.prototype.buildElementParenting = function(t, e, r) {
                for (var i = this.elements, n = this.layers, s = 0, a = n.length; s < a;) n[s].ind == e && (i[s] && !0 !== i[s] ? (r.push(i[s]), i[s].setAsParent(), void 0 !== n[s].parent ? this.buildElementParenting(t, n[s].parent, r) : t.setHierarchy(r)) : (this.buildItem(s), this.addPendingElement(t))), s += 1
              }, BaseRenderer.prototype.addPendingElement = function(t) {
                this.pendingElements.push(t)
              }, BaseRenderer.prototype.searchExtraCompositions = function(t) {
                for (var e, r = t.length, i = 0; i < r; i += 1) t[i].xt && ((e = this.createComp(t[i])).initExpressions(), this.globalData.projectInterface.registerComposition(e))
              }, BaseRenderer.prototype.setupGlobalData = function(t, e) {
                this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.frameId = 0, this.globalData.frameRate = t.fr, this.globalData.nm = t.nm, this.globalData.compSize = {
                  w: t.w,
                  h: t.h
                }
              }, extendPrototype([BaseRenderer], SVGRenderer), SVGRenderer.prototype.createNull = function(t) {
                return new NullElement(t, this.globalData, this)
              }, SVGRenderer.prototype.createShape = function(t) {
                return new SVGShapeElement(t, this.globalData, this)
              }, SVGRenderer.prototype.createText = function(t) {
                return new SVGTextElement(t, this.globalData, this)
              }, SVGRenderer.prototype.createImage = function(t) {
                return new IImageElement(t, this.globalData, this)
              }, SVGRenderer.prototype.createComp = function(t) {
                return new SVGCompElement(t, this.globalData, this)
              }, SVGRenderer.prototype.createSolid = function(t) {
                return new ISolidElement(t, this.globalData, this)
              }, SVGRenderer.prototype.configAnimation = function(t) {
                this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w), this.svgElement.setAttribute("height", t.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)"), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
                var e = this.globalData.defs,
                  r = (this.setupGlobalData(t, e), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = t, createNS("clipPath")),
                  i = createNS("rect"),
                  n = (i.setAttribute("width", t.w), i.setAttribute("height", t.h), i.setAttribute("x", 0), i.setAttribute("y", 0), createElementID());
                r.setAttribute("id", n), r.appendChild(i), this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + n + ")"), e.appendChild(r), this.layers = t.layers, this.elements = createSizedArray(t.layers.length)
              }, SVGRenderer.prototype.destroy = function() {
                this.animationItem.wrapper.innerHTML = "", this.layerElement = null, this.globalData.defs = null;
                for (var t = this.layers ? this.layers.length : 0, e = 0; e < t; e++) this.elements[e] && this.elements[e].destroy();
                this.elements.length = 0, this.destroyed = !0, this.animationItem = null
              }, SVGRenderer.prototype.updateContainerSize = function() {}, SVGRenderer.prototype.buildItem = function(t) {
                var e, r = this.elements;
                r[t] || 99 == this.layers[t].ty || (r[t] = !0, e = this.createItem(this.layers[t]), r[t] = e, expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(e), e.initExpressions()), this.appendElementInPos(e, t), this.layers[t].tt && (this.elements[t - 1] && !0 !== this.elements[t - 1] ? e.setMatte(r[t - 1].layerId) : (this.buildItem(t - 1), this.addPendingElement(e))))
              }, SVGRenderer.prototype.checkPendingElements = function() {
                for (; this.pendingElements.length;) {
                  var t = this.pendingElements.pop();
                  if (t.checkParenting(), t.data.tt)
                    for (var e = 0, r = this.elements.length; e < r;) {
                      if (this.elements[e] === t) {
                        t.setMatte(this.elements[e - 1].layerId);
                        break
                      }
                      e += 1
                    }
                }
              }, SVGRenderer.prototype.renderFrame = function(t) {
                if (this.renderedFrame !== t && !this.destroyed) {
                  null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.globalData._mdf = !1;
                  var e, r = this.layers.length;
                  for (this.completeLayers || this.checkLayers(t), e = r - 1; 0 <= e; e--)(this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
                  if (this.globalData._mdf)
                    for (e = 0; e < r; e += 1)(this.completeLayers || this.elements[e]) && this.elements[e].renderFrame()
                }
              }, SVGRenderer.prototype.appendElementInPos = function(t, e) {
                if (t = t.getBaseElement()) {
                  for (var r, i = 0; i < e;) this.elements[i] && !0 !== this.elements[i] && this.elements[i].getBaseElement() && (r = this.elements[i].getBaseElement()), i += 1;
                  r ? this.layerElement.insertBefore(t, r) : this.layerElement.appendChild(t)
                }
              }, SVGRenderer.prototype.hide = function() {
                this.layerElement.style.display = "none"
              }, SVGRenderer.prototype.show = function() {
                this.layerElement.style.display = "block"
              }, extendPrototype([BaseRenderer], CanvasRenderer), CanvasRenderer.prototype.createShape = function(t) {
                return new CVShapeElement(t, this.globalData, this)
              }, CanvasRenderer.prototype.createText = function(t) {
                return new CVTextElement(t, this.globalData, this)
              }, CanvasRenderer.prototype.createImage = function(t) {
                return new CVImageElement(t, this.globalData, this)
              }, CanvasRenderer.prototype.createComp = function(t) {
                return new CVCompElement(t, this.globalData, this)
              }, CanvasRenderer.prototype.createSolid = function(t) {
                return new CVSolidElement(t, this.globalData, this)
              }, CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull, CanvasRenderer.prototype.ctxTransform = function(t) {
                var e;
                1 === t[0] && 0 === t[1] && 0 === t[4] && 1 === t[5] && 0 === t[12] && 0 === t[13] || (this.renderConfig.clearCanvas ? (this.transformMat.cloneFromProps(t), e = this.contextData.cTr.props, this.transformMat.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props), e = this.contextData.cTr.props, this.canvasContext.setTransform(e[0], e[1], e[4], e[5], e[12], e[13])) : this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13]))
              }, CanvasRenderer.prototype.ctxOpacity = function(t) {
                this.renderConfig.clearCanvas ? (this.contextData.cO *= t < 0 ? 0 : t, this.globalData.currentGlobalAlpha !== this.contextData.cO && (this.canvasContext.globalAlpha = this.contextData.cO, this.globalData.currentGlobalAlpha = this.contextData.cO)) : this.canvasContext.globalAlpha *= t < 0 ? 0 : t
              }, CanvasRenderer.prototype.reset = function() {
                this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore()
              }, CanvasRenderer.prototype.save = function(t) {
                if (this.renderConfig.clearCanvas) {
                  t && this.canvasContext.save();
                  var e = this.contextData.cTr.props;
                  this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate();
                  for (var r = this.contextData.saved[this.contextData.cArrPos], i = 0; i < 16; i += 1) r[i] = e[i];
                  this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1
                } else this.canvasContext.save()
              }, CanvasRenderer.prototype.restore = function(t) {
                if (this.renderConfig.clearCanvas) {
                  t && (this.canvasContext.restore(), this.globalData.blendMode = "source-over"), --this.contextData.cArrPos;
                  for (var e = this.contextData.saved[this.contextData.cArrPos], r = this.contextData.cTr.props, i = 0; i < 16; i += 1) r[i] = e[i];
                  this.canvasContext.setTransform(e[0], e[1], e[4], e[5], e[12], e[13]), e = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = e, this.globalData.currentGlobalAlpha !== e && (this.canvasContext.globalAlpha = e, this.globalData.currentGlobalAlpha = e)
                } else this.canvasContext.restore()
              }, CanvasRenderer.prototype.configAnimation = function(t) {
                this.animationItem.wrapper ? (this.animationItem.container = createTag("canvas"), this.animationItem.container.style.width = "100%", this.animationItem.container.style.height = "100%", this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px", this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className)) : this.canvasContext = this.renderConfig.context, this.data = t, this.layers = t.layers, this.transformCanvas = {
                  w: t.w,
                  h: t.h,
                  sx: 0,
                  sy: 0,
                  tx: 0,
                  ty: 0
                }, this.setupGlobalData(t, document.body), this.globalData.canvasContext = this.canvasContext, (this.globalData.renderer = this).globalData.isDashed = !1, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.transformCanvas = this.transformCanvas, this.elements = createSizedArray(t.layers.length), this.updateContainerSize()
              }, CanvasRenderer.prototype.updateContainerSize = function() {
                var t, e, r, i, n, s, a;
                this.reset(), this.animationItem.wrapper && this.animationItem.container ? (t = this.animationItem.wrapper.offsetWidth, e = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", t * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", e * this.renderConfig.dpr)) : (t = this.canvasContext.canvas.width * this.renderConfig.dpr, e = this.canvasContext.canvas.height * this.renderConfig.dpr), -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice") ? (i = (s = this.renderConfig.preserveAspectRatio.split(" "))[1] || "meet", n = (s = s[0] || "xMidYMid").substr(0, 4), s = s.substr(4), (r = this.transformCanvas.w / this.transformCanvas.h) > (a = t / e) && "meet" === i || r < a && "slice" === i ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = t / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr)), this.transformCanvas.tx = "xMid" === n && (r < a && "meet" === i || a < r && "slice" === i) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === n && (r < a && "meet" === i || a < r && "slice" === i) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) * this.renderConfig.dpr : 0, this.transformCanvas.ty = "YMid" === s && (a < r && "meet" === i || r < a && "slice" === i) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === s && (a < r && "meet" === i || r < a && "slice" === i) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) * this.renderConfig.dpr : 0) : ("none" == this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr)) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0), this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip(), this.renderFrame(this.renderedFrame, !0)
              }, CanvasRenderer.prototype.destroy = function() {
                var t;
                for (this.renderConfig.clearCanvas && (this.animationItem.wrapper.innerHTML = ""), t = (this.layers ? this.layers.length : 0) - 1; 0 <= t; --t) this.elements[t] && this.elements[t].destroy();
                this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0
              }, CanvasRenderer.prototype.renderFrame = function(t, e) {
                if ((this.renderedFrame !== t || !0 !== this.renderConfig.clearCanvas || e) && !this.destroyed && -1 !== t) {
                  this.renderedFrame = t, this.globalData.frameNum = t - this.animationItem._isFirstFrame, this.globalData.frameId += 1, this.globalData._mdf = !this.renderConfig.clearCanvas || e, this.globalData.projectInterface.currentFrame = t;
                  var r, i = this.layers.length;
                  for (this.completeLayers || this.checkLayers(t), r = 0; r < i; r++)(this.completeLayers || this.elements[r]) && this.elements[r].prepareFrame(t - this.layers[r].st);
                  if (this.globalData._mdf) {
                    for (!0 === this.renderConfig.clearCanvas ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), r = i - 1; 0 <= r; --r)(this.completeLayers || this.elements[r]) && this.elements[r].renderFrame();
                    !0 !== this.renderConfig.clearCanvas && this.restore()
                  }
                }
              }, CanvasRenderer.prototype.buildItem = function(t) {
                var e, r = this.elements;
                r[t] || 99 == this.layers[t].ty || (e = this.createItem(this.layers[t], this, this.globalData), (r[t] = e).initExpressions())
              }, CanvasRenderer.prototype.checkPendingElements = function() {
                for (; this.pendingElements.length;) this.pendingElements.pop().checkParenting()
              }, CanvasRenderer.prototype.hide = function() {
                this.animationItem.container.style.display = "none"
              }, CanvasRenderer.prototype.show = function() {
                this.animationItem.container.style.display = "block"
              }, MaskElement.prototype.getMaskProperty = function(t) {
                return this.viewData[t].prop
              }, MaskElement.prototype.renderFrame = function(t) {
                for (var e, r = this.element.finalTransform.mat, i = this.masksProperties.length, n = 0; n < i; n++)(this.viewData[n].prop._mdf || t) && this.drawPath(this.masksProperties[n], this.viewData[n].prop.v, this.viewData[n]), (this.viewData[n].op._mdf || t) && this.viewData[n].elem.setAttribute("fill-opacity", this.viewData[n].op.v), "n" !== this.masksProperties[n].mode && (this.viewData[n].invRect && (this.element.finalTransform.mProp._mdf || t) && (this.viewData[n].invRect.setAttribute("x", -r.props[12]), this.viewData[n].invRect.setAttribute("y", -r.props[13])), this.storedData[n].x) && (this.storedData[n].x._mdf || t) && (e = this.storedData[n].expan, this.storedData[n].x.v < 0 ? ("erode" !== this.storedData[n].lastOperator && (this.storedData[n].lastOperator = "erode", this.storedData[n].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[n].filterId + ")")), e.setAttribute("radius", -this.storedData[n].x.v)) : ("dilate" !== this.storedData[n].lastOperator && (this.storedData[n].lastOperator = "dilate", this.storedData[n].elem.setAttribute("filter", null)), this.storedData[n].elem.setAttribute("stroke-width", 2 * this.storedData[n].x.v)))
              }, MaskElement.prototype.getMaskelement = function() {
                return this.maskElement
              }, MaskElement.prototype.createLayerSolidPath = function() {
                var t = "M0,0 ";
                return (t = (t = (t += " h" + this.globalData.compSize.w) + " v" + this.globalData.compSize.h) + " h-" + this.globalData.compSize.w) + " v-" + this.globalData.compSize.h + " "
              }, MaskElement.prototype.drawPath = function(t, e, r) {
                for (var i, n = " M" + e.v[0][0] + "," + e.v[0][1], s = e._length, a = 1; a < s; a += 1) n += " C" + e.o[a - 1][0] + "," + e.o[a - 1][1] + " " + e.i[a][0] + "," + e.i[a][1] + " " + e.v[a][0] + "," + e.v[a][1];
                e.c && 1 < s && (n += " C" + e.o[a - 1][0] + "," + e.o[a - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), r.lastPath !== n && (i = "", r.elem && (e.c && (i = t.inv ? this.solidPath + n : n), r.elem.setAttribute("d", i)), r.lastPath = n)
              }, MaskElement.prototype.destroy = function() {
                this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null
              }, HierarchyElement.prototype = {
                initHierarchy: function() {
                  this.hierarchy = [], this._isParent = !1, this.checkParenting()
                },
                setHierarchy: function(t) {
                  this.hierarchy = t
                },
                setAsParent: function() {
                  this._isParent = !0
                },
                checkParenting: function() {
                  void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, [])
                }
              }, FrameElement.prototype = {
                initFrame: function() {
                  this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1
                },
                prepareProperties: function(t, e) {
                  for (var r = this.dynamicProperties.length, i = 0; i < r; i += 1)(e || this._isParent && "transform" === this.dynamicProperties[i].propType) && (this.dynamicProperties[i].getValue(), this.dynamicProperties[i]._mdf) && (this.globalData._mdf = !0, this._mdf = !0)
                },
                addDynamicProperty: function(t) {
                  -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t)
                }
              }, TransformElement.prototype = {
                initTransform: function() {
                  this.finalTransform = {
                    mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : {
                      o: 0
                    },
                    _matMdf: !1,
                    _opMdf: !1,
                    mat: new Matrix
                  }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty
                },
                renderTransform: function() {
                  if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
                    var t, e = this.finalTransform.mat,
                      r = 0,
                      i = this.hierarchy.length;
                    if (!this.finalTransform._matMdf)
                      for (; r < i;) {
                        if (this.hierarchy[r].finalTransform.mProp._mdf) {
                          this.finalTransform._matMdf = !0;
                          break
                        }
                        r += 1
                      }
                    if (this.finalTransform._matMdf)
                      for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), r = 0; r < i; r += 1) t = this.hierarchy[r].finalTransform.mProp.v.props, e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15])
                  }
                },
                globalToLocal: function(t) {
                  var e = [];
                  e.push(this.finalTransform);
                  for (var r = !0, i = this.comp; r;) i.finalTransform ? (i.data.hasMask && e.splice(0, 0, i.finalTransform), i = i.comp) : r = !1;
                  for (var n, s = e.length, a = 0; a < s; a += 1) n = e[a].mat.applyToPointArray(0, 0, 0), t = [t[0] - n[0], t[1] - n[1], 0];
                  return t
                },
                mHelper: new Matrix
              }, RenderableElement.prototype = {
                initRenderable: function() {
                  this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = []
                },
                addRenderableComponent: function(t) {
                  -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t)
                },
                removeRenderableComponent: function(t) {
                  -1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1)
                },
                prepareRenderableFrame: function(t) {
                  this.checkLayerLimits(t)
                },
                checkTransparency: function() {
                  this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show())
                },
                checkLayerLimits: function(t) {
                  this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0, this.isInRange = !1, this.hide())
                },
                renderRenderable: function() {
                  for (var t = this.renderableComponents.length, e = 0; e < t; e += 1) this.renderableComponents[e].renderFrame(this._isFirstFrame)
                },
                sourceRectAtTime: function() {
                  return {
                    top: 0,
                    left: 0,
                    width: 100,
                    height: 100
                  }
                },
                getLayerSize: function() {
                  return 5 === this.data.ty ? {
                    w: this.data.textData.width,
                    h: this.data.textData.height
                  } : {
                    w: this.data.width,
                    h: this.data.height
                  }
                }
              }, extendPrototype([RenderableElement, createProxyFunction({
                initElement: function(t, e, r) {
                  this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide()
                },
                hide: function() {
                  this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none", this.hidden = !0)
                },
                show: function() {
                  this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"), this.hidden = !1, this._isFirstFrame = !0)
                },
                renderFrame: function() {
                  this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1))
                },
                renderInnerContent: function() {},
                prepareFrame: function(t) {
                  this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency()
                },
                destroy: function() {
                  this.innerElem = null, this.destroyBaseElement()
                }
              })], RenderableDOMElement), SVGShapeData.prototype.setAsAnimated = function() {
                this._isAnimated = !0
              }, ShapeTransformManager.prototype = {
                addTransformSequence: function(t) {
                  for (var e = t.length, r = "_", i = 0; i < e; i += 1) r += t[i].transform.key + "_";
                  var n = this.sequences[r];
                  return n || (n = {
                    transforms: [].concat(t),
                    finalTransform: new Matrix,
                    _mdf: !1
                  }, this.sequences[r] = n, this.sequenceList.push(n)), n
                },
                processSequence: function(t, e) {
                  for (var r, i = 0, n = t.transforms.length, s = e; i < n && !e;) {
                    if (t.transforms[i].transform.mProps._mdf) {
                      s = !0;
                      break
                    }
                    i += 1
                  }
                  if (s)
                    for (t.finalTransform.reset(), i = n - 1; 0 <= i; --i) r = t.transforms[i].transform.mProps.v.props, t.finalTransform.transform(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15]);
                  t._mdf = s
                },
                processSequences: function(t) {
                  for (var e = this.sequenceList.length, r = 0; r < e; r += 1) this.processSequence(this.sequenceList[r], t)
                },
                getNewKey: function() {
                  return "_" + this.transform_key_count++
                }
              }, CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated, BaseElement.prototype = {
                checkMasks: function() {
                  if (this.data.hasMask)
                    for (var t = 0, e = this.data.masksProperties.length; t < e;) {
                      if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl) return !0;
                      t += 1
                    }
                  return !1
                },
                initExpressions: function() {
                  this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
                  var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
                  this.layerInterface.registerEffectsInterface(t), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this), this.layerInterface.text = this.layerInterface.textInterface)
                },
                setBlendMode: function() {
                  var t = getBlendMode(this.data.bm);
                  (this.baseElement || this.layerElement).style["mix-blend-mode"] = t
                },
                initBaseData: function(t, e, r) {
                  this.globalData = e, this.comp = r, this.data = t, this.layerId = createElementID(), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties)
                },
                getType: function() {
                  return this.type
                },
                sourceRectAtTime: function() {}
              }, NullElement.prototype.prepareFrame = function(t) {
                this.prepareProperties(t, !0)
              }, NullElement.prototype.renderFrame = function() {}, NullElement.prototype.getBaseElement = function() {
                return null
              }, NullElement.prototype.destroy = function() {}, NullElement.prototype.sourceRectAtTime = function() {}, NullElement.prototype.hide = function() {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement), SVGBaseElement.prototype = {
                initRendererElement: function() {
                  this.layerElement = createNS("g")
                },
                createContainerElements: function() {
                  this.matteElement = createNS("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = !1;
                  var t, e, r, i, n, s, a, o = null;
                  this.data.td ? 3 == this.data.td || 1 == this.data.td ? ((e = createNS("mask")).setAttribute("id", this.layerId), e.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), e.appendChild(this.layerElement), this.globalData.defs.appendChild(o = e), featureSupport.maskType || 1 != this.data.td || (e.setAttribute("mask-type", "luminance"), n = createElementID(), s = filtersFactory.createFilter(n), this.globalData.defs.appendChild(s), s.appendChild(filtersFactory.createAlphaToLuminanceFilter()), (t = createNS("g")).appendChild(this.layerElement), o = t, e.appendChild(t), t.setAttribute("filter", "url(" + locationHref + "#" + n + ")"))) : 2 == this.data.td && ((e = createNS("mask")).setAttribute("id", this.layerId), e.setAttribute("mask-type", "alpha"), r = createNS("g"), e.appendChild(r), n = createElementID(), s = filtersFactory.createFilter(n), (a = createNS("feComponentTransfer")).setAttribute("in", "SourceGraphic"), s.appendChild(a), (i = createNS("feFuncA")).setAttribute("type", "table"), i.setAttribute("tableValues", "1.0 0.0"), a.appendChild(i), this.globalData.defs.appendChild(s), (a = createNS("rect")).setAttribute("width", this.comp.data.w), a.setAttribute("height", this.comp.data.h), a.setAttribute("x", "0"), a.setAttribute("y", "0"), a.setAttribute("fill", "#ffffff"), a.setAttribute("opacity", "0"), r.setAttribute("filter", "url(" + locationHref + "#" + n + ")"), r.appendChild(a), r.appendChild(this.layerElement), o = r, featureSupport.maskType || (e.setAttribute("mask-type", "luminance"), s.appendChild(filtersFactory.createAlphaToLuminanceFilter()), t = createNS("g"), r.appendChild(a), t.appendChild(this.layerElement), o = t, r.appendChild(t)), this.globalData.defs.appendChild(e)) : this.data.tt ? (this.matteElement.appendChild(this.layerElement), o = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement, this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 !== this.data.ty || this.data.hd || (i = createNS("clipPath"), (n = createNS("path")).setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z"), s = createElementID(), i.setAttribute("id", s), i.appendChild(n), this.globalData.defs.appendChild(i), this.checkMasks() ? ((a = createNS("g")).setAttribute("clip-path", "url(" + locationHref + "#" + s + ")"), a.appendChild(this.layerElement), this.transformedElement = a, o ? o.appendChild(this.transformedElement) : this.baseElement = this.transformedElement) : this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + s + ")")), 0 !== this.data.bm && this.setBlendMode()
                },
                renderElement: function() {
                  this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v)
                },
                destroyBaseElement: function() {
                  this.layerElement = null, this.matteElement = null, this.maskManager.destroy()
                },
                getBaseElement: function() {
                  return this.data.hd ? null : this.baseElement
                },
                createRenderableComponents: function() {
                  this.maskManager = new MaskElement(this.data, this, this.globalData), this.renderableEffectsManager = new SVGEffects(this)
                },
                setMatte: function(t) {
                  this.matteElement && this.matteElement.setAttribute("mask", "url(" + locationHref + "#" + t + ")")
                }
              }, IShapeElement.prototype = {
                addShapeToModifiers: function(t) {
                  for (var e = this.shapeModifiers.length, r = 0; r < e; r += 1) this.shapeModifiers[r].addShape(t)
                },
                isShapeInAnimatedModifiers: function(t) {
                  for (var e = this.shapeModifiers.length; 0 < e;)
                    if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
                  return !1
                },
                renderModifiers: function() {
                  if (this.shapeModifiers.length) {
                    for (var t = this.shapes.length, e = 0; e < t; e += 1) this.shapes[e].sh.reset();
                    for (e = (t = this.shapeModifiers.length) - 1; 0 <= e; --e) this.shapeModifiers[e].processShapes(this._isFirstFrame)
                  }
                },
                lcEnum: {
                  1: "butt",
                  2: "round",
                  3: "square"
                },
                ljEnum: {
                  1: "miter",
                  2: "round",
                  3: "bevel"
                },
                searchProcessedElement: function(t) {
                  for (var e = this.processedElements, r = 0, i = e.length; r < i;) {
                    if (e[r].elem === t) return e[r].pos;
                    r += 1
                  }
                  return 0
                },
                addProcessedElement: function(t, e) {
                  for (var r = this.processedElements, i = r.length; i;)
                    if (r[--i].elem === t) return;
                  r.push(new ProcessedElement(t, e))
                },
                prepareFrame: function(t) {
                  this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange)
                }
              }, ITextElement.prototype.initElement = function(t, e, r) {
                this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(t, e, r), this.textProperty = new TextProperty(this, t.t, this.dynamicProperties), this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties)
              }, ITextElement.prototype.prepareFrame = function(t) {
                this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1, this.textProperty._mdf = !1)
              }, ITextElement.prototype.createPathShape = function(t, e) {
                for (var r, i = e.length, n = "", s = 0; s < i; s += 1) r = e[s].ks.k, n += buildShapeString(r, r.i.length, !0, t);
                return n
              }, ITextElement.prototype.updateDocumentData = function(t, e) {
                this.textProperty.updateDocumentData(t, e)
              }, ITextElement.prototype.canResizeFont = function(t) {
                this.textProperty.canResizeFont(t)
              }, ITextElement.prototype.setMinimumFontSize = function(t) {
                this.textProperty.setMinimumFontSize(t)
              }, ITextElement.prototype.applyTextPropertiesToMatrix = function(t, e, r, i, n) {
                switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j) {
                  case 1:
                    e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]), 0, 0);
                    break;
                  case 2:
                    e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]) / 2, 0, 0)
                }
                e.translate(i, n, 0)
              }, ITextElement.prototype.buildColor = function(t) {
                return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")"
              }, ITextElement.prototype.emptyProp = new LetterProps, ITextElement.prototype.destroy = function() {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function(t, e, r) {
                this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), !this.data.xt && e.progressiveLoad || this.buildAllItems(), this.hide()
              }, ICompElement.prototype.prepareFrame = function(t) {
                if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt) {
                  this.tm._placeholder ? this.renderedFrame = t / this.data.sr : ((t = this.tm.v) === this.data.op && (t = this.data.op - 1), this.renderedFrame = t);
                  var e;
                  t = this.elements.length;
                  for (this.completeLayers || this.checkLayers(this.renderedFrame), e = t - 1; 0 <= e; --e)(this.completeLayers || this.elements[e]) && (this.elements[e].prepareFrame(this.renderedFrame - this.layers[e].st), this.elements[e]._mdf) && (this._mdf = !0)
                }
              }, ICompElement.prototype.renderInnerContent = function() {
                for (var t = this.layers.length, e = 0; e < t; e += 1)(this.completeLayers || this.elements[e]) && this.elements[e].renderFrame()
              }, ICompElement.prototype.setElements = function(t) {
                this.elements = t
              }, ICompElement.prototype.getElements = function() {
                return this.elements
              }, ICompElement.prototype.destroyElements = function() {
                for (var t = this.layers.length, e = 0; e < t; e += 1) this.elements[e] && this.elements[e].destroy()
              }, ICompElement.prototype.destroy = function() {
                this.destroyElements(), this.destroyBaseElement()
              }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement), IImageElement.prototype.createContent = function() {
                var t = this.globalData.getAssetsPath(this.assetData);
                this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.innerElem)
              }, IImageElement.prototype.sourceRectAtTime = function() {
                return this.sourceRect
              }, extendPrototype([IImageElement], ISolidElement), ISolidElement.prototype.createContent = function() {
                var t = createNS("rect");
                t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t)
              }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement), SVGShapeElement.prototype.initSecondaryElement = function() {}, SVGShapeElement.prototype.identityMatrix = new Matrix, SVGShapeElement.prototype.buildExpressionInterface = function() {}, SVGShapeElement.prototype.createContent = function() {
                this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes()
              }, SVGShapeElement.prototype.filterUniqueShapes = function() {
                for (var t, e, r, i = this.shapes.length, n = this.stylesList.length, s = [], a = !1, o = 0; o < n; o += 1) {
                  for (r = this.stylesList[o], a = !1, t = s.length = 0; t < i; t += 1) - 1 !== (e = this.shapes[t]).styles.indexOf(r) && (s.push(e), a = e._isAnimated || a);
                  1 < s.length && a && this.setShapesAsAnimated(s)
                }
              }, SVGShapeElement.prototype.setShapesAsAnimated = function(t) {
                for (var e = t.length, r = 0; r < e; r += 1) t[r].setAsAnimated()
              }, SVGShapeElement.prototype.createStyleElement = function(t, e) {
                var r, i = (e = new SVGStyleData(t, e)).pElem;
                return "st" === t.ty ? r = new SVGStrokeStyleData(this, t, e) : "fl" === t.ty ? r = new SVGFillStyleData(this, t, e) : "gf" !== t.ty && "gs" !== t.ty || (r = new("gf" === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, t, e), this.globalData.defs.appendChild(r.gf), r.maskId && (this.globalData.defs.appendChild(r.ms), this.globalData.defs.appendChild(r.of), i.setAttribute("mask", "url(" + locationHref + "#" + r.maskId + ")"))), "st" !== t.ty && "gs" !== t.ty || (i.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"), i.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"), i.setAttribute("fill-opacity", "0"), 1 === t.lj && i.setAttribute("stroke-miterlimit", t.ml)), 2 === t.r && i.setAttribute("fill-rule", "evenodd"), t.ln && i.setAttribute("id", t.ln), t.cl && i.setAttribute("class", t.cl), t.bm && (i.style["mix-blend-mode"] = getBlendMode(t.bm)), this.stylesList.push(e), this.addToAnimatedContents(t, r), r
              }, SVGShapeElement.prototype.createGroupElement = function(t) {
                var e = new ShapeGroupData;
                return t.ln && e.gr.setAttribute("id", t.ln), t.cl && e.gr.setAttribute("class", t.cl), t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)), e
              }, SVGShapeElement.prototype.createTransformElement = function(t, e) {
                var r = TransformPropertyFactory.getTransformProperty(this, t, this);
                r = new SVGTransformData(r, r.o, e);
                return this.addToAnimatedContents(t, r), r
              }, SVGShapeElement.prototype.createShapeElement = function(t, e, r) {
                var i = 4;
                "rc" === t.ty ? i = 5 : "el" === t.ty ? i = 6 : "sr" === t.ty && (i = 7), e = new SVGShapeData(e, r, ShapePropertyFactory.getShapeProp(this, t, i, this));
                return this.shapes.push(e), this.addShapeToModifiers(e), this.addToAnimatedContents(t, e), e
              }, SVGShapeElement.prototype.addToAnimatedContents = function(t, e) {
                for (var r = 0, i = this.animatedContents.length; r < i;) {
                  if (this.animatedContents[r].element === e) return;
                  r += 1
                }
                this.animatedContents.push({
                  fn: SVGElementsRenderer.createRenderFunction(t),
                  element: e,
                  data: t
                })
              }, SVGShapeElement.prototype.setElementStyles = function(t) {
                for (var e = t.styles, r = this.stylesList.length, i = 0; i < r; i += 1) this.stylesList[i].closed || e.push(this.stylesList[i])
              }, SVGShapeElement.prototype.reloadShapes = function() {
                this._isFirstFrame = !0;
                for (var t = this.itemsData.length, e = 0; e < t; e += 1) this.prevViewData[e] = this.itemsData[e];
                for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), t = this.dynamicProperties.length, e = 0; e < t; e += 1) this.dynamicProperties[e].getValue();
                this.renderModifiers()
              }, SVGShapeElement.prototype.searchShapes = function(t, e, r, i, n, s, a) {
                for (var o, h, l, p, c, f = [].concat(s), u = t.length - 1, m = [], d = [], y = u; 0 <= y; --y) {
                  if ((c = this.searchProcessedElement(t[y])) ? e[y] = r[c - 1] : t[y]._render = a, "fl" == t[y].ty || "st" == t[y].ty || "gf" == t[y].ty || "gs" == t[y].ty) c ? e[y].style.closed = !1 : e[y] = this.createStyleElement(t[y], n), t[y]._render && i.appendChild(e[y].style.pElem), m.push(e[y].style);
                  else if ("gr" == t[y].ty) {
                    if (c)
                      for (h = e[y].it.length, o = 0; o < h; o += 1) e[y].prevViewData[o] = e[y].it[o];
                    else e[y] = this.createGroupElement(t[y]);
                    this.searchShapes(t[y].it, e[y].it, e[y].prevViewData, e[y].gr, n + 1, f, a), t[y]._render && i.appendChild(e[y].gr)
                  } else "tr" == t[y].ty ? (c || (e[y] = this.createTransformElement(t[y], i)), l = e[y].transform, f.push(l)) : "sh" == t[y].ty || "rc" == t[y].ty || "el" == t[y].ty || "sr" == t[y].ty ? (c || (e[y] = this.createShapeElement(t[y], f, n)), this.setElementStyles(e[y])) : "tm" == t[y].ty || "rd" == t[y].ty || "ms" == t[y].ty ? (c ? (p = e[y]).closed = !1 : ((p = ShapeModifiers.getModifier(t[y].ty)).init(this, t[y]), e[y] = p, this.shapeModifiers.push(p)), d.push(p)) : "rp" == t[y].ty && (c ? (p = e[y]).closed = !0 : (p = ShapeModifiers.getModifier(t[y].ty), (e[y] = p).init(this, t, y, e), this.shapeModifiers.push(p), a = !1), d.push(p));
                  this.addProcessedElement(t[y], y + 1)
                }
                for (u = m.length, y = 0; y < u; y += 1) m[y].closed = !0;
                for (u = d.length, y = 0; y < u; y += 1) d[y].closed = !0
              }, SVGShapeElement.prototype.renderInnerContent = function() {
                this.renderModifiers();
                for (var t = this.stylesList.length, e = 0; e < t; e += 1) this.stylesList[e].reset();
                for (this.renderShape(), e = 0; e < t; e += 1)(this.stylesList[e]._mdf || this._isFirstFrame) && (this.stylesList[e].msElem && (this.stylesList[e].msElem.setAttribute("d", this.stylesList[e].d), this.stylesList[e].d = "M0 0" + this.stylesList[e].d), this.stylesList[e].pElem.setAttribute("d", this.stylesList[e].d || "M0 0"))
              }, SVGShapeElement.prototype.renderShape = function() {
                for (var t, e = this.animatedContents.length, r = 0; r < e; r += 1) t = this.animatedContents[r], (this._isFirstFrame || t.element._isAnimated) && !0 !== t.data && t.fn(t.data, t.element, this._isFirstFrame)
              }, SVGShapeElement.prototype.destroy = function() {
                this.destroyBaseElement(), this.shapesData = null, this.itemsData = null
              }, CVContextData.prototype.duplicate = function() {
                var t = 2 * this._length,
                  e = this.savedOp,
                  r = (this.savedOp = createTypedArray("float32", t), this.savedOp.set(e), 0);
                for (r = this._length; r < t; r += 1) this.saved[r] = createTypedArray("float32", 16);
                this._length = t
              }, CVContextData.prototype.reset = function() {
                this.cArrPos = 0, this.cTr.reset(), this.cO = 1
              }, CVBaseElement.prototype = {
                createElements: function() {},
                initRendererElement: function() {},
                createContainerElements: function() {
                  this.canvasContext = this.globalData.canvasContext, this.renderableEffectsManager = new CVEffects(this)
                },
                createContent: function() {},
                setBlendMode: function() {
                  var t, e = this.globalData;
                  e.blendMode !== this.data.bm && (e.blendMode = this.data.bm, t = getBlendMode(this.data.bm), e.canvasContext.globalCompositeOperation = t)
                },
                createRenderableComponents: function() {
                  this.maskManager = new CVMaskElement(this.data, this)
                },
                hideElement: function() {
                  this.hidden || this.isInRange && !this.isTransparent || (this.hidden = !0)
                },
                showElement: function() {
                  this.isInRange && !this.isTransparent && (this.hidden = !1, this._isFirstFrame = !0, this.maskManager._isFirstFrame = !0)
                },
                renderFrame: function() {
                  this.hidden || this.data.hd || (this.renderTransform(), this.renderRenderable(), this.setBlendMode(), this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(this.finalTransform.mat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v), this.renderInnerContent(), this.globalData.renderer.restore(), this.maskManager.hasMasks && this.globalData.renderer.restore(!0), this._isFirstFrame && (this._isFirstFrame = !1))
                },
                destroy: function() {
                  this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager.destroy()
                },
                mHelper: new Matrix
              }, CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement, CVBaseElement.prototype.show = CVBaseElement.prototype.showElement, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement), CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVImageElement.prototype.createContent = function() {
                var t, e, r, i, n, s, a, o, h;
                !this.img.width || this.assetData.w === this.img.width && this.assetData.h === this.img.height || ((t = createTag("canvas")).width = this.assetData.w, t.height = this.assetData.h, i = t.getContext("2d"), n = this.img.width, s = this.img.height, o = this.assetData.w / this.assetData.h, h = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio, o < (a = n / s) && "xMidYMid slice" === h || a < o && "xMidYMid slice" !== h ? e = (r = s) * o : r = (e = n) / o, i.drawImage(this.img, (n - e) / 2, (s - r) / 2, e, r, 0, 0, this.assetData.w, this.assetData.h), this.img = t)
              }, CVImageElement.prototype.renderInnerContent = function(t) {
                this.canvasContext.drawImage(this.img, 0, 0)
              }, CVImageElement.prototype.destroy = function() {
                this.img = null
              }, extendPrototype([CanvasRenderer, ICompElement, CVBaseElement], CVCompElement), CVCompElement.prototype.renderInnerContent = function() {
                for (var t = this.layers.length - 1; 0 <= t; --t)(this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
              }, CVCompElement.prototype.destroy = function() {
                for (var t = this.layers.length - 1; 0 <= t; --t) this.elements[t] && this.elements[t].destroy();
                this.layers = null, this.elements = null
              }, CVMaskElement.prototype.renderFrame = function() {
                if (this.hasMasks) {
                  var t, e, r, i, n = this.element.finalTransform.mat,
                    s = this.element.canvasContext,
                    a = this.masksProperties.length;
                  for (s.beginPath(), t = 0; t < a; t++)
                    if ("n" !== this.masksProperties[t].mode) {
                      this.masksProperties[t].inv && (s.moveTo(0, 0), s.lineTo(this.element.globalData.compSize.w, 0), s.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), s.lineTo(0, this.element.globalData.compSize.h), s.lineTo(0, 0)), i = this.viewData[t].v, e = n.applyToPointArray(i.v[0][0], i.v[0][1], 0), s.moveTo(e[0], e[1]);
                      for (var o = i._length, h = 1; h < o; h++) r = n.applyToTriplePoints(i.o[h - 1], i.i[h], i.v[h]), s.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
                      r = n.applyToTriplePoints(i.o[h - 1], i.i[0], i.v[0]), s.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5])
                    } this.element.globalData.renderer.save(!0), s.clip()
                }
              }, CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty, CVMaskElement.prototype.destroy = function() {
                this.element = null
              }, extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement), CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement, CVShapeElement.prototype.transformHelper = {
                opacity: 1,
                _opMdf: !1
              }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createContent = function() {
                this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, [])
              }, CVShapeElement.prototype.createStyleElement = function(t, e) {
                e = {
                  data: t,
                  type: t.ty,
                  preTransforms: this.transformsManager.addTransformSequence(e),
                  transforms: [],
                  elements: [],
                  closed: !0 === t.hd
                };
                var r, i = {};
                return "fl" == t.ty || "st" == t.ty ? (i.c = PropertyFactory.getProp(this, t.c, 1, 255, this), i.c.k || (e.co = "rgb(" + bm_floor(i.c.v[0]) + "," + bm_floor(i.c.v[1]) + "," + bm_floor(i.c.v[2]) + ")")) : "gf" !== t.ty && "gs" !== t.ty || (i.s = PropertyFactory.getProp(this, t.s, 1, null, this), i.e = PropertyFactory.getProp(this, t.e, 1, null, this), i.h = PropertyFactory.getProp(this, t.h || {
                  k: 0
                }, 0, .01, this), i.a = PropertyFactory.getProp(this, t.a || {
                  k: 0
                }, 0, degToRads, this), i.g = new GradientProperty(this, t.g, this)), i.o = PropertyFactory.getProp(this, t.o, 0, .01, this), "st" == t.ty || "gs" == t.ty ? (e.lc = this.lcEnum[t.lc] || "round", e.lj = this.ljEnum[t.lj] || "round", 1 == t.lj && (e.ml = t.ml), i.w = PropertyFactory.getProp(this, t.w, 0, null, this), i.w.k || (e.wi = i.w.v), t.d && (r = new DashProperty(this, t.d, "canvas", this), i.d = r, i.d.k || (e.da = i.d.dashArray, e.do = i.d.dashoffset[0]))) : e.r = 2 === t.r ? "evenodd" : "nonzero", this.stylesList.push(e), i.style = e, i
              }, CVShapeElement.prototype.createGroupElement = function(t) {
                return {
                  it: [],
                  prevViewData: []
                }
              }, CVShapeElement.prototype.createTransformElement = function(t) {
                return {
                  transform: {
                    opacity: 1,
                    _opMdf: !1,
                    key: this.transformsManager.getNewKey(),
                    op: PropertyFactory.getProp(this, t.o, 0, .01, this),
                    mProps: TransformPropertyFactory.getTransformProperty(this, t, this)
                  }
                }
              }, CVShapeElement.prototype.createShapeElement = function(t) {
                return t = new CVShapeData(this, t, this.stylesList, this.transformsManager), this.shapes.push(t), this.addShapeToModifiers(t), t
              }, CVShapeElement.prototype.reloadShapes = function() {
                this._isFirstFrame = !0;
                for (var t = this.itemsData.length, e = 0; e < t; e += 1) this.prevViewData[e] = this.itemsData[e];
                for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []), t = this.dynamicProperties.length, e = 0; e < t; e += 1) this.dynamicProperties[e].getValue();
                this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame)
              }, CVShapeElement.prototype.addTransformToStyleList = function(t) {
                for (var e = this.stylesList.length, r = 0; r < e; r += 1) this.stylesList[r].closed || this.stylesList[r].transforms.push(t)
              }, CVShapeElement.prototype.removeTransformFromStyleList = function() {
                for (var t = this.stylesList.length, e = 0; e < t; e += 1) this.stylesList[e].closed || this.stylesList[e].transforms.pop()
              }, CVShapeElement.prototype.closeStyles = function(t) {
                for (var e = t.length, r = 0; r < e; r += 1) t[r].closed = !0
              }, CVShapeElement.prototype.searchShapes = function(t, e, r, i, n) {
                for (var s, a, o, h, l, p = t.length - 1, c = [], f = [], u = [].concat(n), m = p; 0 <= m; --m) {
                  if ((o = this.searchProcessedElement(t[m])) ? e[m] = r[o - 1] : t[m]._shouldRender = i, "fl" == t[m].ty || "st" == t[m].ty || "gf" == t[m].ty || "gs" == t[m].ty) o ? e[m].style.closed = !1 : e[m] = this.createStyleElement(t[m], u), c.push(e[m].style);
                  else if ("gr" == t[m].ty) {
                    if (o)
                      for (a = e[m].it.length, s = 0; s < a; s += 1) e[m].prevViewData[s] = e[m].it[s];
                    else e[m] = this.createGroupElement(t[m]);
                    this.searchShapes(t[m].it, e[m].it, e[m].prevViewData, i, u)
                  } else "tr" == t[m].ty ? (o || (l = this.createTransformElement(t[m]), e[m] = l), u.push(e[m]), this.addTransformToStyleList(e[m])) : "sh" == t[m].ty || "rc" == t[m].ty || "el" == t[m].ty || "sr" == t[m].ty ? o || (e[m] = this.createShapeElement(t[m])) : "tm" == t[m].ty || "rd" == t[m].ty ? (o ? (h = e[m]).closed = !1 : ((h = ShapeModifiers.getModifier(t[m].ty)).init(this, t[m]), e[m] = h, this.shapeModifiers.push(h)), f.push(h)) : "rp" == t[m].ty && (o ? (h = e[m]).closed = !0 : (h = ShapeModifiers.getModifier(t[m].ty), (e[m] = h).init(this, t, m, e), this.shapeModifiers.push(h), i = !1), f.push(h));
                  this.addProcessedElement(t[m], m + 1)
                }
                for (this.removeTransformFromStyleList(), this.closeStyles(c), p = f.length, m = 0; m < p; m += 1) f[m].closed = !0
              }, CVShapeElement.prototype.renderInnerContent = function() {
                this.transformHelper.opacity = 1, this.transformHelper._opMdf = !1, this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0)
              }, CVShapeElement.prototype.renderShapeTransform = function(t, e) {
                (t._opMdf || e.op._mdf || this._isFirstFrame) && (e.opacity = t.opacity, e.opacity *= e.op.v, e._opMdf = !0)
              }, CVShapeElement.prototype.drawLayer = function() {
                for (var t, e, r, i, n, s, a, o, h = this.stylesList.length, l = this.globalData.renderer, p = this.globalData.canvasContext, c = 0; c < h; c += 1)
                  if (("st" !== (a = (o = this.stylesList[c]).type) && "gs" !== a || 0 !== o.wi) && o.data._shouldRender && 0 !== o.coOp && 0 !== this.globalData.currentGlobalAlpha) {
                    for (l.save(), n = o.elements, "st" === a || "gs" === a ? (p.strokeStyle = "st" === a ? o.co : o.grd, p.lineWidth = o.wi, p.lineCap = o.lc, p.lineJoin = o.lj, p.miterLimit = o.ml || 0) : p.fillStyle = "fl" === a ? o.co : o.grd, l.ctxOpacity(o.coOp), "st" !== a && "gs" !== a && p.beginPath(), l.ctxTransform(o.preTransforms.finalTransform.props), e = n.length, t = 0; t < e; t += 1) {
                      for ("st" !== a && "gs" !== a || (p.beginPath(), o.da && (p.setLineDash(o.da), p.lineDashOffset = o.do)), i = (s = n[t].trNodes).length, r = 0; r < i; r += 1) "m" == s[r].t ? p.moveTo(s[r].p[0], s[r].p[1]) : "c" == s[r].t ? p.bezierCurveTo(s[r].pts[0], s[r].pts[1], s[r].pts[2], s[r].pts[3], s[r].pts[4], s[r].pts[5]) : p.closePath();
                      "st" !== a && "gs" !== a || (p.stroke(), o.da && p.setLineDash(this.dashResetter))
                    }
                    "st" !== a && "gs" !== a && p.fill(o.r), l.restore()
                  }
              }, CVShapeElement.prototype.renderShape = function(t, e, r, i) {
                for (var n = t, s = e.length - 1; 0 <= s; --s) "tr" == e[s].ty ? (n = r[s].transform, this.renderShapeTransform(t, n)) : "sh" == e[s].ty || "el" == e[s].ty || "rc" == e[s].ty || "sr" == e[s].ty ? this.renderPath(e[s], r[s]) : "fl" == e[s].ty ? this.renderFill(e[s], r[s], n) : "st" == e[s].ty ? this.renderStroke(e[s], r[s], n) : "gf" == e[s].ty || "gs" == e[s].ty ? this.renderGradientFill(e[s], r[s], n) : "gr" == e[s].ty ? this.renderShape(n, e[s].it, r[s].it) : e[s].ty;
                i && this.drawLayer()
              }, CVShapeElement.prototype.renderStyledShape = function(t, e) {
                if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
                  for (var r, i, n = t.trNodes, s = e.paths, a = s._length, o = (n.length = 0, t.transforms.finalTransform), h = 0; h < a; h += 1) {
                    var l = s.shapes[h];
                    if (l && l.v) {
                      for (i = l._length, r = 1; r < i; r += 1) 1 === r && n.push({
                        t: "m",
                        p: o.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                      }), n.push({
                        t: "c",
                        pts: o.applyToTriplePoints(l.o[r - 1], l.i[r], l.v[r])
                      });
                      1 === i && n.push({
                        t: "m",
                        p: o.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                      }), l.c && i && (n.push({
                        t: "c",
                        pts: o.applyToTriplePoints(l.o[r - 1], l.i[0], l.v[0])
                      }), n.push({
                        t: "z"
                      }))
                    }
                  }
                  t.trNodes = n
                }
              }, CVShapeElement.prototype.renderPath = function(t, e) {
                if (!0 !== t.hd && t._shouldRender)
                  for (var r = e.styledShapes.length, i = 0; i < r; i += 1) this.renderStyledShape(e.styledShapes[i], e.sh)
              }, CVShapeElement.prototype.renderFill = function(t, e, r) {
                var i = e.style;
                (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity)
              }, CVShapeElement.prototype.renderGradientFill = function(t, e, r) {
                var i = e.style;
                if (!i.grd || e.g._mdf || e.s._mdf || e.e._mdf || 1 !== t.t && (e.h._mdf || e.a._mdf)) {
                  for (var n, s, a, o = this.globalData.canvasContext, h = e.s.v, l = e.e.v, p = 1 === t.t ? o.createLinearGradient(h[0], h[1], l[0], l[1]) : (n = Math.sqrt(Math.pow(h[0] - l[0], 2) + Math.pow(h[1] - l[1], 2)), l = Math.atan2(l[1] - h[1], l[0] - h[0]), s = n * (1 <= e.h.v ? .99 : e.h.v <= -1 ? -.99 : e.h.v), a = Math.cos(l + e.a.v) * s + h[0], l = Math.sin(l + e.a.v) * s + h[1], o.createRadialGradient(a, l, 0, h[0], h[1], n)), c = t.g.p, f = e.g.c, u = 1, m = 0; m < c; m += 1) e.g._hasOpacity && e.g._collapsable && (u = e.g.o[2 * m + 1]), p.addColorStop(f[4 * m] / 100, "rgba(" + f[4 * m + 1] + "," + f[4 * m + 2] + "," + f[4 * m + 3] + "," + u + ")");
                  i.grd = p
                }
                i.coOp = e.o.v * r.opacity
              }, CVShapeElement.prototype.renderStroke = function(t, e, r) {
                var i = e.style,
                  n = e.d;
                n && (n._mdf || this._isFirstFrame) && (i.da = n.dashArray, i.do = n.dashoffset[0]), (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity), (e.w._mdf || this._isFirstFrame) && (i.wi = e.w.v)
              }, CVShapeElement.prototype.destroy = function() {
                this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.itemsData.length = 0
              }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement), CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVSolidElement.prototype.renderInnerContent = function() {
                var t = this.canvasContext;
                t.fillStyle = this.data.sc, t.fillRect(0, 0, this.data.sw, this.data.sh)
              }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement), CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"), CVTextElement.prototype.buildNewText = function() {
                var t = this.textProperty.currentData,
                  e = (this.renderedLetters = createSizedArray(t.l ? t.l.length : 0), !1);
                t.fc ? (e = !0, this.values.fill = this.buildColor(t.fc)) : this.values.fill = "rgba(0,0,0,0)", this.fill = e, e = !1;
                t.sc && (e = !0, this.values.stroke = this.buildColor(t.sc), this.values.sWidth = t.sw);
                for (var r, i, n, s, a, o, h, l, p, c = this.globalData.fontManager.getFontByName(t.f), f = t.l, u = this.mHelper, m = (this.stroke = e, this.values.fValue = t.finalSize + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily, t.finalText.length), d = this.data.singleShape, y = t.tr / 1e3 * t.finalSize, g = 0, v = 0, b = !0, P = 0, x = 0; x < m; x += 1) {
                  for (r = (r = this.globalData.fontManager.getCharData(t.finalText[x], c.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily)) && r.data || {}, u.reset(), d && f[x].n && (g = -y, v = v + t.yOffset + (b ? 1 : 0), b = !1), o = (s = r.shapes ? r.shapes[0].it : []).length, u.scale(t.finalSize / 100, t.finalSize / 100), d && this.applyTextPropertiesToMatrix(t, u, f[x].line, g, v), l = createSizedArray(o), a = 0; a < o; a += 1) {
                    for (n = s[a].ks.k.i.length, h = s[a].ks.k, p = [], i = 1; i < n; i += 1) 1 == i && p.push(u.applyToX(h.v[0][0], h.v[0][1], 0), u.applyToY(h.v[0][0], h.v[0][1], 0)), p.push(u.applyToX(h.o[i - 1][0], h.o[i - 1][1], 0), u.applyToY(h.o[i - 1][0], h.o[i - 1][1], 0), u.applyToX(h.i[i][0], h.i[i][1], 0), u.applyToY(h.i[i][0], h.i[i][1], 0), u.applyToX(h.v[i][0], h.v[i][1], 0), u.applyToY(h.v[i][0], h.v[i][1], 0));
                    p.push(u.applyToX(h.o[i - 1][0], h.o[i - 1][1], 0), u.applyToY(h.o[i - 1][0], h.o[i - 1][1], 0), u.applyToX(h.i[0][0], h.i[0][1], 0), u.applyToY(h.i[0][0], h.i[0][1], 0), u.applyToX(h.v[0][0], h.v[0][1], 0), u.applyToY(h.v[0][0], h.v[0][1], 0)), l[a] = p
                  }
                  d && (g = g + f[x].l + y), this.textSpans[P] ? this.textSpans[P].elem = l : this.textSpans[P] = {
                    elem: l
                  }, P += 1
                }
              }, CVTextElement.prototype.renderInnerContent = function() {
                var t, e, r, i, n = this.canvasContext;
                this.finalTransform.mat.props, n.font = this.values.fValue, n.lineCap = "butt", n.lineJoin = "miter", n.miterLimit = 4, this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
                for (var s, a, o, h = this.textAnimator.renderedLetters, l = this.textProperty.currentData.l, p = l.length, c = null, f = null, u = null, m = 0; m < p; m += 1)
                  if (!l[m].n) {
                    if ((s = h[m]) && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(s.p), this.globalData.renderer.ctxOpacity(s.o)), this.fill) {
                      for (s && s.fc ? c !== s.fc && (c = s.fc, n.fillStyle = s.fc) : c !== this.values.fill && (c = this.values.fill, n.fillStyle = this.values.fill), e = (a = this.textSpans[m].elem).length, this.globalData.canvasContext.beginPath(), t = 0; t < e; t += 1)
                        for (i = (o = a[t]).length, this.globalData.canvasContext.moveTo(o[0], o[1]), r = 2; r < i; r += 6) this.globalData.canvasContext.bezierCurveTo(o[r], o[r + 1], o[r + 2], o[r + 3], o[r + 4], o[r + 5]);
                      this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill()
                    }
                    if (this.stroke) {
                      for (s && s.sw ? u !== s.sw && (u = s.sw, n.lineWidth = s.sw) : u !== this.values.sWidth && (u = this.values.sWidth, n.lineWidth = this.values.sWidth), s && s.sc ? f !== s.sc && (f = s.sc, n.strokeStyle = s.sc) : f !== this.values.stroke && (f = this.values.stroke, n.strokeStyle = this.values.stroke), e = (a = this.textSpans[m].elem).length, this.globalData.canvasContext.beginPath(), t = 0; t < e; t += 1)
                        for (i = (o = a[t]).length, this.globalData.canvasContext.moveTo(o[0], o[1]), r = 2; r < i; r += 6) this.globalData.canvasContext.bezierCurveTo(o[r], o[r + 1], o[r + 2], o[r + 3], o[r + 4], o[r + 5]);
                      this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke()
                    }
                    s && this.globalData.renderer.restore()
                  }
              }, CVEffects.prototype.renderFrame = function() {};
              var animationManager = function() {
                  var t = {},
                    e = [],
                    r = 0,
                    i = 0,
                    n = 0,
                    s = !0,
                    a = !1;

                  function o(t) {
                    for (var r = 0, n = t.target; r < i;) e[r].animation === n && (e.splice(r, 1), --r, --i, n.isPaused || p()), r += 1
                  }

                  function h(t, r) {
                    if (!t) return null;
                    for (var n = 0; n < i;) {
                      if (e[n].elem == t && null !== e[n].elem) return e[n].animation;
                      n += 1
                    }
                    var s = new AnimationItem;
                    return c(s, t), s.setData(t, r), s
                  }

                  function l() {
                    n += 1, m()
                  }

                  function p() {
                    --n
                  }

                  function c(t, r) {
                    t.addEventListener("destroy", o), t.addEventListener("_active", l), t.addEventListener("_idle", p), e.push({
                      elem: r,
                      animation: t
                    }), i += 1
                  }

                  function f(t) {
                    for (var o = t - r, h = 0; h < i; h += 1) e[h].animation.advanceTime(o);
                    r = t, n && !a ? window.requestAnimationFrame(f) : s = !0
                  }

                  function u(t) {
                    r = t, window.requestAnimationFrame(f)
                  }

                  function m() {
                    !a && n && s && (window.requestAnimationFrame(u), s = !1)
                  }
                  return t.registerAnimation = h, t.loadAnimation = function(t) {
                    var e = new AnimationItem;
                    return c(e, null), e.setParams(t), e
                  }, t.setSpeed = function(t, r) {
                    for (var n = 0; n < i; n += 1) e[n].animation.setSpeed(t, r)
                  }, t.setDirection = function(t, r) {
                    for (var n = 0; n < i; n += 1) e[n].animation.setDirection(t, r)
                  }, t.play = function(t) {
                    for (var r = 0; r < i; r += 1) e[r].animation.play(t)
                  }, t.pause = function(t) {
                    for (var r = 0; r < i; r += 1) e[r].animation.pause(t)
                  }, t.stop = function(t) {
                    for (var r = 0; r < i; r += 1) e[r].animation.stop(t)
                  }, t.togglePause = function(t) {
                    for (var r = 0; r < i; r += 1) e[r].animation.togglePause(t)
                  }, t.searchAnimations = function(t, e, r) {
                    for (var i, n = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))), s = n.length, a = 0; a < s; a += 1) r && n[a].setAttribute("data-bm-type", r), h(n[a], t);
                    e && 0 === s && (r = r || "svg", (e = document.getElementsByTagName("body")[0]).innerHTML = "", (i = createTag("div")).style.width = "100%", i.style.height = "100%", i.setAttribute("data-bm-type", r), e.appendChild(i), h(i, t))
                  }, t.resize = function() {
                    for (var t = 0; t < i; t += 1) e[t].animation.resize()
                  }, t.goToAndStop = function(t, r, n) {
                    for (var s = 0; s < i; s += 1) e[s].animation.goToAndStop(t, r, n)
                  }, t.destroy = function(t) {
                    for (var r = i - 1; 0 <= r; --r) e[r].animation.destroy(t)
                  }, t.freeze = function() {
                    a = !0
                  }, t.unfreeze = function() {
                    a = !1, m()
                  }, t.getRegisteredAnimations = function() {
                    for (var t = e.length, r = [], i = 0; i < t; i += 1) r.push(e[i].animation);
                    return r
                  }, t
                }(),
                AnimationItem = function() {
                  this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = createElementID(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.subframeEnabled = subframeEnabled, this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = ProjectInterface(), this.imagePreloader = new ImagePreloader
                },
                Expressions = (extendPrototype([BaseEvent], AnimationItem), AnimationItem.prototype.setParams = function(t) {
                  t.context && (this.context = t.context), (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
                  var e = t.animType || t.renderer || "svg";
                  switch (e) {
                    case "canvas":
                      this.renderer = new CanvasRenderer(this, t.rendererSettings);
                      break;
                    case "svg":
                      this.renderer = new SVGRenderer(this, t.rendererSettings);
                      break;
                    default:
                      this.renderer = new HybridRenderer(this, t.rendererSettings)
                  }
                  this.renderer.setProjectInterface(this.projectInterface), this.animType = e, "" !== t.loop && null !== t.loop && (!1 === t.loop ? this.loop = !1 : !0 === t.loop ? this.loop = !0 : this.loop = parseInt(t.loop)), this.autoplay = !("autoplay" in t) || t.autoplay, this.name = t.name || "", this.autoloadSegments = !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments, this.assetsPath = t.assetsPath, t.animationData ? this.configAnimation(t.animationData) : t.path && ("json" != t.path.substr(-4) && ("/" != t.path.substr(-1, 1) && (t.path += "/"), t.path += "data.json"), -1 != t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), assetLoader.load(t.path, this.configAnimation.bind(this), function() {
                    this.trigger("data_failed")
                  }.bind(this)))
                }, AnimationItem.prototype.setData = function(t, e) {
                  e = {
                    wrapper: t,
                    animationData: e ? "object" === _typeof(e) ? e : JSON.parse(e) : null
                  }, t = t.attributes;
                  var r = ("" !== (r = (e.path = t.getNamedItem("data-animation-path") ? t.getNamedItem("data-animation-path").value : t.getNamedItem("data-bm-path") ? t.getNamedItem("data-bm-path").value : t.getNamedItem("bm-path") ? t.getNamedItem("bm-path").value : "", e.animType = t.getNamedItem("data-anim-type") ? t.getNamedItem("data-anim-type").value : t.getNamedItem("data-bm-type") ? t.getNamedItem("data-bm-type").value : t.getNamedItem("bm-type") ? t.getNamedItem("bm-type").value : t.getNamedItem("data-bm-renderer") ? t.getNamedItem("data-bm-renderer").value : t.getNamedItem("bm-renderer") ? t.getNamedItem("bm-renderer").value : "canvas", t.getNamedItem("data-anim-loop") ? t.getNamedItem("data-anim-loop").value : t.getNamedItem("data-bm-loop") ? t.getNamedItem("data-bm-loop").value : t.getNamedItem("bm-loop") ? t.getNamedItem("bm-loop").value : "")) && (e.loop = "false" !== r && ("true" === r || parseInt(r))), t.getNamedItem("data-anim-autoplay") ? t.getNamedItem("data-anim-autoplay").value : t.getNamedItem("data-bm-autoplay") ? t.getNamedItem("data-bm-autoplay").value : !t.getNamedItem("bm-autoplay") || t.getNamedItem("bm-autoplay").value);
                  e.autoplay = "false" !== r, e.name = t.getNamedItem("data-name") ? t.getNamedItem("data-name").value : t.getNamedItem("data-bm-name") ? t.getNamedItem("data-bm-name").value : t.getNamedItem("bm-name") ? t.getNamedItem("bm-name").value : "", "false" === (t.getNamedItem("data-anim-prerender") ? t.getNamedItem("data-anim-prerender").value : t.getNamedItem("data-bm-prerender") ? t.getNamedItem("data-bm-prerender").value : t.getNamedItem("bm-prerender") ? t.getNamedItem("bm-prerender").value : "") && (e.prerender = !1), this.setParams(e)
                }, AnimationItem.prototype.includeLayers = function(t) {
                  t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip));
                  for (var e, r = this.animationData.layers, i = r.length, n = t.layers, s = n.length, a = 0; a < s; a += 1)
                    for (e = 0; e < i;) {
                      if (r[e].id == n[a].id) {
                        r[e] = n[a];
                        break
                      }
                      e += 1
                    }
                  if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets)
                    for (i = t.assets.length, e = 0; e < i; e += 1) this.animationData.assets.push(t.assets[e]);
                  this.animationData.__complete = !1, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t.layers), expressionsPlugin && expressionsPlugin.initExpressions(this), this.loadNextSegment()
                }, AnimationItem.prototype.loadNextSegment = function() {
                  var t = this.animationData.segments;
                  t && 0 !== t.length && this.autoloadSegments ? (t = t.shift(), this.timeCompleted = t.time * this.frameRate, t = this.path + this.fileName + "_" + this.segmentPos + ".json", this.segmentPos += 1, assetLoader.load(t, this.includeLayers.bind(this), function() {
                    this.trigger("data_failed")
                  }.bind(this))) : this.trigger("data_ready")
                }, AnimationItem.prototype.loadSegments = function() {
                  this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment()
                }, AnimationItem.prototype.imagesLoaded = function() {
                  this.trigger("loaded_images"), this.checkLoaded()
                }, AnimationItem.prototype.preloadImages = function() {
                  this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this))
                }, AnimationItem.prototype.configAnimation = function(t) {
                  this.renderer && (this.animationData = t, this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.renderer.configAnimation(t), t.assets || (t.assets = []), this.renderer.searchExtraCompositions(t.assets), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.firstFrame = Math.round(this.animationData.ip), this.frameMult = this.animationData.fr / 1e3, this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded())
                }, AnimationItem.prototype.waitForFontsLoaded = function() {
                  this.renderer && (this.renderer.globalData.fontManager.loaded() ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20))
                }, AnimationItem.prototype.checkLoaded = function() {
                  this.isLoaded || !this.renderer.globalData.fontManager.loaded() || !this.imagePreloader.loaded() && "canvas" === this.renderer.rendererType || (this.isLoaded = !0, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.initItems(), setTimeout(function() {
                    this.trigger("DOMLoaded")
                  }.bind(this), 0), this.gotoFrame(), this.autoplay && this.play())
                }, AnimationItem.prototype.resize = function() {
                  this.renderer.updateContainerSize()
                }, AnimationItem.prototype.setSubframe = function(t) {
                  this.subframeEnabled = !!t
                }, AnimationItem.prototype.gotoFrame = function() {
                  this.currentFrame = this.subframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame()
                }, AnimationItem.prototype.renderFrame = function() {
                  !1 !== this.isLoaded && this.renderer.renderFrame(this.currentFrame + this.firstFrame)
                }, AnimationItem.prototype.play = function(t) {
                  t && this.name != t || !0 === this.isPaused && (this.isPaused = !1, this._idle) && (this._idle = !1, this.trigger("_active"))
                }, AnimationItem.prototype.pause = function(t) {
                  t && this.name != t || !1 === this.isPaused && (this.isPaused = !0, this._idle = !0, this.trigger("_idle"))
                }, AnimationItem.prototype.togglePause = function(t) {
                  t && this.name != t || (!0 === this.isPaused ? this.play() : this.pause())
                }, AnimationItem.prototype.stop = function(t) {
                  t && this.name != t || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0))
                }, AnimationItem.prototype.goToAndStop = function(t, e, r) {
                  r && this.name != r || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier), this.pause())
                }, AnimationItem.prototype.goToAndPlay = function(t, e, r) {
                  this.goToAndStop(t, e, r), this.play()
                }, AnimationItem.prototype.advanceTime = function(t) {
                  var e;
                  !0 !== this.isPaused && !1 !== this.isLoaded && (e = !1, (t = this.currentRawFrame + t * this.frameModifier) >= this.totalFrames - 1 && 0 < this.frameModifier ? this.loop && this.playCount !== this.loop ? t >= this.totalFrames ? (this.playCount += 1, this.checkSegments(t % this.totalFrames) || (this.setCurrentRawFrameValue(t % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(t) : this.checkSegments(t > this.totalFrames ? t % this.totalFrames : 0) || (e = !0, t = this.totalFrames - 1) : t < 0 ? this.checkSegments(t % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (e = !0, t = 0) : (this.setCurrentRawFrameValue(this.totalFrames + t % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0)) : this.setCurrentRawFrameValue(t), e) && (this.setCurrentRawFrameValue(t), this.pause(), this.trigger("complete"))
                }, AnimationItem.prototype.adjustSegment = function(t, e) {
                  this.playCount = 0, t[1] < t[0] ? (0 < this.frameModifier && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.timeCompleted = this.totalFrames = t[0] - t[1], this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.timeCompleted = this.totalFrames = t[1] - t[0], this.firstFrame = t[0], this.setCurrentRawFrameValue(.001 + e)), this.trigger("segmentStart")
                }, AnimationItem.prototype.setSegment = function(t, e) {
                  var r = -1;
                  this.isPaused && (this.currentRawFrame + this.firstFrame < t ? r = t : this.currentRawFrame + this.firstFrame > e && (r = e - t)), this.firstFrame = t, this.timeCompleted = this.totalFrames = e - t, -1 !== r && this.goToAndStop(r, !0)
                }, AnimationItem.prototype.playSegments = function(t, e) {
                  if (e && (this.segments.length = 0), "object" === _typeof(t[0]))
                    for (var r = t.length, i = 0; i < r; i += 1) this.segments.push(t[i]);
                  else this.segments.push(t);
                  this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play()
                }, AnimationItem.prototype.resetSegments = function(t) {
                  this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0)
                }, AnimationItem.prototype.checkSegments = function(t) {
                  return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0)
                }, AnimationItem.prototype.destroy = function(t) {
                  t && this.name != t || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null, this.renderer = null)
                }, AnimationItem.prototype.setCurrentRawFrameValue = function(t) {
                  this.currentRawFrame = t, this.gotoFrame()
                }, AnimationItem.prototype.setSpeed = function(t) {
                  this.playSpeed = t, this.updaFrameModifier()
                }, AnimationItem.prototype.setDirection = function(t) {
                  this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier()
                }, AnimationItem.prototype.updaFrameModifier = function() {
                  this.frameModifier = this.frameMult * this.playSpeed * this.playDirection
                }, AnimationItem.prototype.getPath = function() {
                  return this.path
                }, AnimationItem.prototype.getAssetsPath = function(t) {
                  var e, r = "";
                  return t.e ? t.p : this.assetsPath ? (-1 !== (e = t.p).indexOf("images/") && (e = e.split("/")[1]), this.assetsPath + e) : (r = this.path, (r += t.u || "") + t.p)
                }, AnimationItem.prototype.getAssetData = function(t) {
                  for (var e = 0, r = this.assets.length; e < r;) {
                    if (t == this.assets[e].id) return this.assets[e];
                    e += 1
                  }
                }, AnimationItem.prototype.hide = function() {
                  this.renderer.hide()
                }, AnimationItem.prototype.show = function() {
                  this.renderer.show()
                }, AnimationItem.prototype.getDuration = function(t) {
                  return t ? this.totalFrames : this.totalFrames / this.frameRate
                }, AnimationItem.prototype.trigger = function(t) {
                  if (this._cbs && this._cbs[t]) switch (t) {
                    case "enterFrame":
                      this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameModifier));
                      break;
                    case "loopComplete":
                      this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
                      break;
                    case "complete":
                      this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
                      break;
                    case "segmentStart":
                      this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
                      break;
                    case "destroy":
                      this.triggerEvent(t, new BMDestroyEvent(t, this));
                      break;
                    default:
                      this.triggerEvent(t)
                  }
                  "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this))
                }, function() {
                  var t = {
                    initExpressions: function(t) {
                      var e = 0,
                        r = [];
                      t.renderer.compInterface = CompExpressionInterface(t.renderer), t.renderer.globalData.projectInterface.registerComposition(t.renderer), t.renderer.globalData.pushExpression = function() {
                        e += 1
                      }, t.renderer.globalData.popExpression = function() {
                        if (0 == --e) {
                          for (var t = r.length, i = 0; i < t; i += 1) r[i].release();
                          r.length = 0
                        }
                      }, t.renderer.globalData.registerExpressionProperty = function(t) {
                        -1 === r.indexOf(t) && r.push(t)
                      }
                    }
                  };
                  return t
                }()),
                expressionsPlugin = Expressions,
                ExpressionManager = function() {
                  var ob = {},
                    Math = BMMath,
                    window = null,
                    document = null;

                  function $bm_isInstanceOfArray(t) {
                    return t.constructor === Array || t.constructor === Float32Array
                  }

                  function isNumerable(t, e) {
                    return "number" === t || "boolean" === t || "string" === t || e instanceof Number
                  }

                  function $bm_neg(t) {
                    var e = _typeof(t);
                    if (!("number" === e || "boolean" === e || t instanceof Number))
                      if ($bm_isInstanceOfArray(t))
                        for (var r = t.length, i = 0; i < r; i += 1) t[i];
                      else t.propType && t.v
                  }
                  var easeInBez = BezierFactory.getBezierEasing(.333, 0, .833, .833, "easeIn").get,
                    easeOutBez = BezierFactory.getBezierEasing(.167, .167, .667, 1, "easeOut").get,
                    easeInOutBez = BezierFactory.getBezierEasing(.33, 0, .667, 1, "easeInOut").get;

                  function sum(t, e) {
                    var r = _typeof(t),
                      i = _typeof(e);
                    if ("string" === r || "string" === i) return t + e;
                    if (isNumerable(r, t) && isNumerable(i, e)) return t + e;
                    if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] = t[0] + e, t;
                    if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t + e[0], e;
                    if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                      for (var n = 0, s = t.length, a = e.length, o = []; n < s || n < a;)("number" == typeof t[n] || t[n] instanceof Number) && ("number" == typeof e[n] || e[n] instanceof Number) ? o[n] = t[n] + e[n] : o[n] = void 0 === e[n] ? t[n] : t[n] || e[n], n += 1;
                      return o
                    }
                    return 0
                  }
                  var add = sum;

                  function sub(t, e) {
                    var r = _typeof(t),
                      i = _typeof(e);
                    if (isNumerable(r, t) && isNumerable(i, e)) return (t = "string" === r ? parseInt(t) : t) - ("string" === i ? parseInt(e) : e);
                    if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] = t[0] - e, t;
                    if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t - e[0], e;
                    if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                      for (var n = 0, s = t.length, a = e.length, o = []; n < s || n < a;)("number" == typeof t[n] || t[n] instanceof Number) && ("number" == typeof e[n] || e[n] instanceof Number) ? o[n] = t[n] - e[n] : o[n] = void 0 === e[n] ? t[n] : t[n] || e[n], n += 1;
                      return o
                    }
                    return 0
                  }

                  function mul(t, e) {
                    var r, i, n, s = _typeof(t),
                      a = _typeof(e);
                    if (isNumerable(s, t) && isNumerable(a, e)) return t * e;
                    if ($bm_isInstanceOfArray(t) && isNumerable(a, e)) {
                      for (n = t.length, r = createTypedArray("float32", n), i = 0; i < n; i += 1) r[i] = t[i] * e;
                      return r
                    }
                    if (isNumerable(s, t) && $bm_isInstanceOfArray(e)) {
                      for (n = e.length, r = createTypedArray("float32", n), i = 0; i < n; i += 1) r[i] = t * e[i];
                      return r
                    }
                    return 0
                  }

                  function div(t, e) {
                    var r, i, n, s = _typeof(t),
                      a = _typeof(e);
                    if (isNumerable(s, t) && isNumerable(a, e)) return t / e;
                    if ($bm_isInstanceOfArray(t) && isNumerable(a, e)) {
                      for (n = t.length, r = createTypedArray("float32", n), i = 0; i < n; i += 1) r[i] = t[i] / e;
                      return r
                    }
                    if (isNumerable(s, t) && $bm_isInstanceOfArray(e)) {
                      for (n = e.length, r = createTypedArray("float32", n), i = 0; i < n; i += 1) r[i] = t / e[i];
                      return r
                    }
                    return 0
                  }

                  function mod(t, e) {
                    return (t = "string" == typeof t ? parseInt(t) : t) % ("string" == typeof e ? parseInt(e) : e)
                  }
                  var $bm_sum = sum,
                    $bm_sub = sub,
                    $bm_mul = mul,
                    $bm_div = div,
                    $bm_mod = mod;

                  function clamp(t, e, r) {
                    var i;
                    r < e && (i = r, r = e, e = i), Math.min(Math.max(t, e), r)
                  }

                  function radiansToDegrees(t) {
                    return t / degToRads
                  }
                  var radians_to_degrees = radiansToDegrees;

                  function degreesToRadians(t) {}
                  var degrees_to_radians = radiansToDegrees,
                    helperLengthArray = [0, 0, 0, 0, 0, 0];

                  function length(t, e) {
                    if ("number" == typeof t || t instanceof Number) return Math.abs(t - (e = e || 0));
                    for (var r = Math.min(t.length, (e = e || helperLengthArray).length), i = 0, n = 0; n < r; n += 1) i += Math.pow(e[n] - t[n], 2);
                    return Math.sqrt(i)
                  }

                  function normalize(t) {
                    div(t, length(t))
                  }

                  function rgbToHsl(t) {
                    var e = t[0],
                      r = t[1],
                      i = t[2];
                    Math.max(e, r, i), Math.min(e, r, i);
                    t[3]
                  }

                  function hue2rgb(t, e, r) {
                    return r < 0 && (r += 1), 1 < r && --r, r < .16666666666666666 ? t + 6 * (e - t) * r : r < .5 ? e : r < .6666666666666666 ? t + (e - t) * (.6666666666666666 - r) * 6 : t
                  }

                  function hslToRgb(t) {
                    var e = t[0],
                      r = t[1],
                      i = t[2];
                    0 !== r && (hue2rgb(r = 2 * i - (i = i < .5 ? i * (1 + r) : i + r - i * r), i, e + .3333333333333333), hue2rgb(r, i, e), hue2rgb(r, i, e - .3333333333333333)), t[3]
                  }

                  function linear(t, e, r, i, n) {
                    var s;
                    if (void 0 !== i && void 0 !== n || (i = e, n = r, e = 0, r = 1), r < e && (s = r, r = e, e = s), !(t <= e || r <= t)) {
                      var a = r === e ? 0 : (t - e) / (r - e);
                      if (i.length)
                        for (var o = i.length, h = createTypedArray("float32", o), l = 0; l < o; l += 1) h[l] = i[l] + (n[l] - i[l]) * a
                    }
                  }

                  function random(t, e) {
                    if (void 0 === e && (void 0 === t ? (t = 0, e = 1) : (e = t, t = void 0)), e.length)
                      for (var r = e.length, i = (t = t || createTypedArray("float32", r), createTypedArray("float32", r)), n = BMMath.random(), s = 0; s < r; s += 1) i[s] = t[s] + n * (e[s] - t[s]);
                    else void 0 === t && (t = 0), BMMath.random()
                  }

                  function createPath(t, e, r, i) {
                    var n = t.length,
                      s = shape_pool.newElement();
                    s.setPathData(!!i, n);
                    for (var a, o, h = [0, 0], l = 0; l < n; l += 1) a = e && e[l] ? e[l] : h, o = r && r[l] ? r[l] : h, s.setTripleAt(t[l][0], t[l][1], o[0] + t[l][0], o[1] + t[l][1], a[0] + t[l][0], a[1] + t[l][1], l, !0)
                  }

                  function initiateExpression(elem, data, property) {
                    var val = data.x,
                      needsVelocity = /velocity(?![\w\d])/.test(val),
                      _needsRandom = -1 !== val.indexOf("random"),
                      elemType = elem.data.ty,
                      transform, $bm_transform, content, effect, thisProperty = property,
                      inPoint = (thisProperty.valueAtTime = thisProperty.getValueAtTime, Object.defineProperty(thisProperty, "value", {
                        get: function() {
                          return thisProperty.v
                        }
                      }), elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate, elem.comp.displayStartTime = 0, elem.data.ip / elem.comp.globalData.frameRate),
                      outPoint = elem.data.op / elem.comp.globalData.frameRate,
                      width = elem.data.sw || 0,
                      height = elem.data.sh || 0,
                      name = elem.data.nm,
                      loopIn, loop_in, loopOut, loop_out, smooth, toWorld, fromWorld, fromComp, toComp, fromCompToSurface, position, rotation, anchorPoint, scale, thisLayer, thisComp, mask, valueAtTime, velocityAtTime, __expression_functions = [],
                      scoped_bm_rt;
                    if (data.xf)
                      for (var i, len = data.xf.length, i = 0; i < len; i += 1) __expression_functions[i] = eval("(function(){ return " + data.xf[i] + "}())");
                    var expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0],
                      numKeys = property.kf ? data.k.length : 0,
                      active = !this.data || !0 !== this.data.hd,
                      wiggle = function(t, e) {
                        for (var r = this.pv.length || 1, i = createTypedArray("float32", r), n = Math.floor(5 * time), s = 0, a = 0; s < n;) {
                          for (a = 0; a < r; a += 1) i[a] += -e + 2 * e * BMMath.random();
                          s += 1
                        }
                        var o = 5 * time,
                          h = o - Math.floor(o),
                          l = createTypedArray("float32", r);
                        if (1 < r) {
                          for (a = 0; a < r; a += 1) l[a] = this.pv[a] + i[a] + (-e + 2 * e * BMMath.random()) * h;
                          return l
                        }
                        return this.pv + i[0] + (-e + 2 * e * BMMath.random()) * h
                      }.bind(this);

                    function loopInDuration(t, e) {
                      loopIn(t, e, !0)
                    }

                    function loopOutDuration(t, e) {
                      loopOut(t, e, !0)
                    }
                    thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty), loop_in = loopIn), thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty), loop_out = loopOut), thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty)), this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)), this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
                    var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface),
                      time, velocity, value, text, textIndex, textTotal, selectorValue;

                    function lookAt(t, e) {
                      e = [e[0] - t[0], e[1] - t[1], e[2] - t[2]], Math.atan2(e[0], Math.sqrt(e[1] * e[1] + e[2] * e[2])), Math.atan2(e[1], e[2])
                    }

                    function easeOut(t, e, r, i, n) {
                      applyEase(easeOutBez, t, e, r, i, n)
                    }

                    function easeIn(t, e, r, i, n) {
                      applyEase(easeInBez, t, e, r, i, n)
                    }

                    function ease(t, e, r, i, n) {
                      applyEase(easeInOutBez, t, e, r, i, n)
                    }

                    function applyEase(t, e, r, i, n, s) {
                      void 0 === n ? (n = r, s = i) : e = (e - r) / (i - r);
                      var a = t(e = 1 < e ? 1 : e < 0 ? 0 : e);
                      if ($bm_isInstanceOfArray(n)) {
                        for (var o = n.length, h = createTypedArray("float32", o), l = 0; l < o; l += 1) h[l] = (s[l] - n[l]) * a + n[l];
                        return h
                      }
                      return (s - n) * a + n
                    }

                    function nearestKey(t) {
                      var e, r, i = data.k.length;
                      if (data.k.length && "number" != typeof data.k[0])
                        if (r = -1, (t *= elem.comp.globalData.frameRate) < data.k[0].t) r = 1, data.k[0].t;
                        else {
                          for (e = 0; e < i - 1; e += 1) {
                            if (t === data.k[e].t) {
                              r = e + 1, data.k[e].t;
                              break
                            }
                            if (t > data.k[e].t && t < data.k[e + 1].t) {
                              (t - data.k[e].t > data.k[e + 1].t - t ? (r = e + 2, data.k[e + 1]) : (r = e + 1, data.k[e])).t;
                              break
                            }
                          } - 1 === r && (r = e + 1, data.k[e].t)
                        }
                      else r = 0;
                      elem.comp.globalData.frameRate
                    }

                    function key(t) {
                      if (!data.k.length || "number" == typeof data.k[0]) throw new Error("The property has no keyframe at index " + t);
                      for (var e = {
                          time: data.k[--t].t / elem.comp.globalData.frameRate,
                          value: []
                        }, r = data.k[t].hasOwnProperty("s") ? data.k[t].s : data.k[t - 1].e, i = r.length, n = 0; n < i; n += 1) e[n] = r[n], e.value[n] = r[n]
                    }

                    function framesToTime(t, e) {
                      e || elem.comp.globalData.frameRate
                    }

                    function timeToFrames(t, e) {
                      t || 0 === t || (t = time), e || elem.comp.globalData.frameRate
                    }

                    function seedRandom(t) {
                      BMMath.seedrandom(randSeed + t)
                    }

                    function sourceRectAtTime() {
                      elem.sourceRectAtTime()
                    }

                    function substring(t, e) {
                      "string" == typeof value && (void 0 === e ? value.substring(t) : value.substring(t, e))
                    }

                    function substr(t, e) {
                      "string" == typeof value && (void 0 === e ? value.substr(t) : value.substr(t, e))
                    }
                    var index = elem.data.ind,
                      hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
                      parent, randSeed = Math.floor(1e6 * Math.random()),
                      globalData = elem.globalData;

                    function executeExpression(t) {
                      return value = t, _needsRandom && seedRandom(randSeed), this.frameExpressionId === elem.globalData.frameId && "textSelector" !== this.propType ? value : ("textSelector" === this.propType && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), thisLayer || (text = elem.layerInterface.text, thisLayer = elem.layerInterface, thisComp = elem.comp.compInterface, toWorld = thisLayer.toWorld.bind(thisLayer), fromWorld = thisLayer.fromWorld.bind(thisLayer), fromComp = thisLayer.fromComp.bind(thisLayer), toComp = thisLayer.toComp.bind(thisLayer), mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null, fromCompToSurface = fromComp), transform || (transform = elem.layerInterface("ADBE Transform Group"), ($bm_transform = transform) && (anchorPoint = transform.anchorPoint)), 4 === elemType && (content = content || thisLayer("ADBE Root Vectors Group")), effect = effect || thisLayer(4), (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) && !parent && (parent = elem.hierarchy[0].layerInterface), time = this.comp.renderedFrame / this.comp.globalData.frameRate, needsVelocity && (velocity = velocityAtTime(time)), expression_function(), this.frameExpressionId = elem.globalData.frameId, scoped_bm_rt = "shape" === scoped_bm_rt.propType ? scoped_bm_rt.v : scoped_bm_rt)
                    }
                    return executeExpression
                  }
                  return ob.initiateExpression = initiateExpression, ob
                }(),
                expressionHelpers = {
                  searchExpressions: function(t, e, r) {
                    e.x && (r.k = !0, r.x = !0, r.initiateExpression = ExpressionManager.initiateExpression, r.effectsSequence.push(r.initiateExpression(t, e, r).bind(r)))
                  },
                  getSpeedAtTime: function(t) {
                    var e = this.getValueAtTime(t),
                      r = this.getValueAtTime(t + -.01),
                      i = 0;
                    if (e.length) {
                      for (var n = 0; n < e.length; n += 1) i += Math.pow(r[n] - e[n], 2);
                      i = 100 * Math.sqrt(i)
                    } else i = 0;
                    return i
                  },
                  getVelocityAtTime: function(t) {
                    if (void 0 !== this.vel) return this.vel;
                    var e, r, i = this.getValueAtTime(t),
                      n = this.getValueAtTime(t + -.001);
                    if (i.length)
                      for (e = createTypedArray("float32", i.length), r = 0; r < i.length; r += 1) e[r] = (n[r] - i[r]) / -.001;
                    else e = (n - i) / -.001;
                    return e
                  },
                  getValueAtTime: function(t) {
                    return (t = (t *= this.elem.globalData.frameRate) - this.offsetTime) !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime), this._cachingAtTime.lastFrame = t), this._cachingAtTime.value
                  },
                  getStaticValueAtTime: function() {
                    return this.pv
                  },
                  setGroupProperty: function(t) {
                    this.propertyGroup = t
                  }
                },
                ShapeExpressionInterface = (function() {
                  function t(t, e, r) {
                    if (!this.k || !this.keyframes) return this.pv;
                    t = t ? t.toLowerCase() : "";
                    var i, n, s, a, o, h = this.comp.renderedFrame,
                      l = this.keyframes,
                      p = l[l.length - 1].t;
                    if (h <= p) return this.pv;
                    if (r ? n = p - (i = e ? Math.abs(p - elem.comp.globalData.frameRate * e) : Math.max(0, p - this.elem.data.ip)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = p - (n = l[l.length - 1 - e].t)), "pingpong" === t) {
                      if (Math.floor((h - n) / i) % 2 != 0) return this.getValueAtTime((i - (h - n) % i + n) / this.comp.globalData.frameRate, 0)
                    } else {
                      if ("offset" === t) {
                        var c = this.getValueAtTime(n / this.comp.globalData.frameRate, 0),
                          f = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                          u = this.getValueAtTime(((h - n) % i + n) / this.comp.globalData.frameRate, 0),
                          m = Math.floor((h - n) / i);
                        if (this.pv.length) {
                          for (a = (o = new Array(c.length)).length, s = 0; s < a; s += 1) o[s] = (f[s] - c[s]) * m + u[s];
                          return o
                        }
                        return (f - c) * m + u
                      }
                      if ("continue" === t) {
                        var d = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                          y = this.getValueAtTime((p - .001) / this.comp.globalData.frameRate, 0);
                        if (this.pv.length) {
                          for (a = (o = new Array(d.length)).length, s = 0; s < a; s += 1) o[s] = d[s] + (d[s] - y[s]) * ((h - p) / this.comp.globalData.frameRate) / 5e-4;
                          return o
                        }
                        return d + (h - p) / .001 * (d - y)
                      }
                    }
                    return this.getValueAtTime(((h - n) % i + n) / this.comp.globalData.frameRate, 0)
                  }

                  function e(t, e, r) {
                    if (!this.k) return this.pv;
                    t = t ? t.toLowerCase() : "";
                    var i, n, s, a, o, h = this.comp.renderedFrame,
                      l = this.keyframes,
                      p = l[0].t;
                    if (p <= h) return this.pv;
                    if (r ? n = p + (i = e ? Math.abs(elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - p)) : i = (n = l[e = !e || e > l.length - 1 ? l.length - 1 : e].t) - p, "pingpong" === t) {
                      if (Math.floor((p - h) / i) % 2 == 0) return this.getValueAtTime(((p - h) % i + p) / this.comp.globalData.frameRate, 0)
                    } else {
                      if ("offset" === t) {
                        var c = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                          f = this.getValueAtTime(n / this.comp.globalData.frameRate, 0),
                          u = this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0),
                          m = Math.floor((p - h) / i) + 1;
                        if (this.pv.length) {
                          for (a = (o = new Array(c.length)).length, s = 0; s < a; s += 1) o[s] = u[s] - (f[s] - c[s]) * m;
                          return o
                        }
                        return u - (f - c) * m
                      }
                      if ("continue" === t) {
                        var d = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                          y = this.getValueAtTime((p + .001) / this.comp.globalData.frameRate, 0);
                        if (this.pv.length) {
                          for (a = (o = new Array(d.length)).length, s = 0; s < a; s += 1) o[s] = d[s] + (d[s] - y[s]) * (p - h) / .001;
                          return o
                        }
                        return d + (d - y) * (p - h) / .001
                      }
                    }
                    return this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0)
                  }

                  function r(t, e) {
                    if (!this.k) return this.pv;
                    if (t = .5 * (t || .4), (e = Math.floor(e || 5)) <= 1) return this.pv;
                    for (var r, i = this.comp.renderedFrame / this.comp.globalData.frameRate, n = i - t, s = 1 < e ? (i + t - n) / (e - 1) : 1, a = 0, o = 0, h = this.pv.length ? createTypedArray("float32", this.pv.length) : 0; a < e;) {
                      if (r = this.getValueAtTime(n + a * s), this.pv.length)
                        for (o = 0; o < this.pv.length; o += 1) h[o] += r[o];
                      else h += r;
                      a += 1
                    }
                    if (this.pv.length)
                      for (o = 0; o < this.pv.length; o += 1) h[o] /= e;
                    else h /= e;
                    return h
                  }
                  var i = TransformPropertyFactory.getTransformProperty,
                    n = (TransformPropertyFactory.getTransformProperty = function(t, e, r) {
                      return (t = i(t, e, r)).dynamicProperties.length, t.getValueAtTime = function(t) {}.bind(t), t.setGroupProperty = expressionHelpers.setGroupProperty, t
                    }, PropertyFactory.getProp),
                    s = (PropertyFactory.getProp = function(i, s, a, o, h) {
                      var l = ((o = n(i, s, a, o, h)).kf ? o.getValueAtTime = expressionHelpers.getValueAtTime.bind(o) : o.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(o), o.setGroupProperty = expressionHelpers.setGroupProperty, o.loopOut = t, o.loopIn = e, o.smooth = r, o.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(o), o.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(o), o.numKeys = 1 === s.a ? s.k.length : 0, o.propertyIndex = s.ix, 0);
                      return 0 !== a && (l = createTypedArray("float32", (1 === s.a ? s.k[0].s : s.k).length)), o._cachingAtTime = {
                        lastFrame: initialDefaultFrame,
                        lastIndex: 0,
                        value: l
                      }, expressionHelpers.searchExpressions(i, s, o), o.k && h.addDynamicProperty(o), o
                    }, ShapePropertyFactory.getConstructorFunction()),
                    a = ShapePropertyFactory.getKeyframedConstructorFunction();

                  function o() {}
                  o.prototype = {
                    vertices: function(t, e) {
                      this.k && this.getValue();
                      for (var r = this.v, i = (r = void 0 !== e ? this.getValueAtTime(e, 0) : r)._length, n = r[t], s = r.v, a = createSizedArray(i), o = 0; o < i; o += 1) a[o] = "i" === t || "o" === t ? [n[o][0] - s[o][0], n[o][1] - s[o][1]] : [n[o][0], n[o][1]];
                      return a
                    },
                    points: function(t) {
                      return this.vertices("v", t)
                    },
                    inTangents: function(t) {
                      return this.vertices("i", t)
                    },
                    outTangents: function(t) {
                      return this.vertices("o", t)
                    },
                    isClosed: function() {
                      return this.v.c
                    },
                    pointOnPath: function(t, e) {
                      var r = this.v;
                      void 0 !== e && (r = this.getValueAtTime(e, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(r));
                      for (var i = (e = this._segmentsLength).lengths, n = e.totalLength * t, s = 0, a = i.length, o = 0; s < a;) {
                        if (o + i[s].addedLength > n) {
                          var h = s,
                            l = r.c && s === a - 1 ? 0 : s + 1,
                            p = (n - o) / i[s].addedLength,
                            c = bez.getPointInSegment(r.v[h], r.v[l], r.o[h], r.i[l], p, i[s]);
                          break
                        }
                        o += i[s].addedLength, s += 1
                      }
                      return c || (r.c ? [r.v[0][0], r.v[0][1]] : [r.v[r._length - 1][0], r.v[r._length - 1][1]])
                    },
                    vectorOnPath: function(t, e, r) {
                      t = 1 == t ? this.v.c ? 0 : .999 : t;
                      var i = this.pointOnPath(t, e);
                      e = (t = this.pointOnPath(t + .001, e))[0] - i[0], t = t[1] - i[1];
                      return 0 === (i = Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2))) ? [0, 0] : "tangent" === r ? [e / i, t / i] : [-t / i, e / i]
                    },
                    tangentOnPath: function(t, e) {
                      return this.vectorOnPath(t, e, "tangent")
                    },
                    normalOnPath: function(t, e) {
                      return this.vectorOnPath(t, e, "normal")
                    },
                    setGroupProperty: expressionHelpers.setGroupProperty,
                    getValueAtTime: expressionHelpers.getStaticValueAtTime
                  }, extendPrototype([o], s), extendPrototype([o], a), a.prototype.getValueAtTime = function(t) {
                    return this._cachingAtTime || (this._cachingAtTime = {
                      shapeValue: shape_pool.clone(this.pv),
                      lastIndex: 0,
                      lastTime: initialDefaultFrame
                    }), (t = (t *= this.elem.globalData.frameRate) - this.offsetTime) !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = t, this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue
                  }, a.prototype.initiateExpression = ExpressionManager.initiateExpression;
                  var h = ShapePropertyFactory.getShapeProp;
                  ShapePropertyFactory.getShapeProp = function(t, e, r, i, n) {
                    return (i = h(t, e, r, i, n)).propertyIndex = e.ix, i.lock = !1, 3 === r ? expressionHelpers.searchExpressions(t, e.pt, i) : 4 === r && expressionHelpers.searchExpressions(t, e.ks, i), i.k && t.addDynamicProperty(i), i
                  }
                }(), TextProperty.prototype.getExpressionValue = function(t, e) {
                  var r;
                  e = this.calculateExpression(e);
                  return t.t !== e ? (this.copyData(r = {}, t), r.t = e.toString(), r.__complete = !1, r) : t
                }, TextProperty.prototype.searchProperty = function() {
                  var t = this.searchKeyframes(),
                    e = this.searchExpressions();
                  return this.kf = t || e, this.kf
                }, TextProperty.prototype.searchExpressions = function() {
                  if (this.data.d.x) return this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this), this.addEffect(this.getExpressionValue.bind(this)), !0
                }, function(t, e, r) {
                  var i;

                  function n(t) {
                    if ("number" == typeof t) return i[t - 1];
                    for (var e = 0, r = i.length; e < r;) {
                      if (i[e]._name === t) return i[e];
                      e += 1
                    }
                  }
                  return n.propertyGroup = r, i = function t(e, r, i) {
                    for (var n = [], s = e ? e.length : 0, a = 0; a < s; a += 1) "gr" == e[a].ty ? n.push(function(e, r, i) {
                      var n = function t(e) {
                          switch (e) {
                            case "ADBE Vectors Group":
                            case "Contents":
                            case 2:
                              return t.content;
                            default:
                              return t.transform
                          }
                        },
                        s = function(e, r, i) {
                          var n = function(t) {
                              for (var e = 0, r = s.length; e < r;) {
                                if (s[e]._name === t || s[e].mn === t || s[e].propertyIndex === t || s[e].ix === t || s[e].ind === t) return s[e];
                                e += 1
                              }
                              if ("number" == typeof t) return s[t - 1]
                            },
                            s = t(e.it, r.it, n.propertyGroup = function(t) {
                              return 1 === t ? n : i(t - 1)
                            });
                          return n.numProperties = s.length, n.propertyIndex = e.cix, n._name = e.nm, n
                        }(e, r, n.propertyGroup = function(t) {
                          return 1 === t ? n : i(t - 1)
                        });
                      return r = function(t, e, r) {
                        function i(t) {
                          return 1 == t ? n : r(--t)
                        }

                        function n(e) {
                          return t.a.ix === e || "Anchor Point" === e ? n.anchorPoint : t.o.ix === e || "Opacity" === e ? n.opacity : t.p.ix === e || "Position" === e ? n.position : t.r.ix === e || "Rotation" === e || "ADBE Vector Rotation" === e ? n.rotation : t.s.ix === e || "Scale" === e ? n.scale : t.sk && t.sk.ix === e || "Skew" === e ? n.skew : t.sa && t.sa.ix === e || "Skew Axis" === e ? n.skewAxis : void 0
                        }
                        return e.transform.mProps.o.setGroupProperty(i), e.transform.mProps.p.setGroupProperty(i), e.transform.mProps.a.setGroupProperty(i), e.transform.mProps.s.setGroupProperty(i), e.transform.mProps.r.setGroupProperty(i), e.transform.mProps.sk && (e.transform.mProps.sk.setGroupProperty(i), e.transform.mProps.sa.setGroupProperty(i)), e.transform.op.setGroupProperty(i), Object.defineProperties(n, {
                          opacity: {
                            get: ExpressionPropertyInterface(e.transform.mProps.o)
                          },
                          position: {
                            get: ExpressionPropertyInterface(e.transform.mProps.p)
                          },
                          anchorPoint: {
                            get: ExpressionPropertyInterface(e.transform.mProps.a)
                          },
                          scale: {
                            get: ExpressionPropertyInterface(e.transform.mProps.s)
                          },
                          rotation: {
                            get: ExpressionPropertyInterface(e.transform.mProps.r)
                          },
                          skew: {
                            get: ExpressionPropertyInterface(e.transform.mProps.sk)
                          },
                          skewAxis: {
                            get: ExpressionPropertyInterface(e.transform.mProps.sa)
                          },
                          _name: {
                            value: t.nm
                          }
                        }), n.ty = "tr", n.mn = t.mn, n.propertyGroup = r, n
                      }(e.it[e.it.length - 1], r.it[r.it.length - 1], n.propertyGroup), n.content = s, n.transform = r, Object.defineProperty(n, "_name", {
                        get: function() {
                          return e.nm
                        }
                      }), n.numProperties = e.np, n.propertyIndex = e.ix, n.nm = e.nm, n.mn = e.mn, n
                    }(e[a], r[a], i)) : "fl" == e[a].ty ? n.push(function(t, e, r) {
                      function i(t) {
                        return "Color" === t || "color" === t ? i.color : "Opacity" === t || "opacity" === t ? i.opacity : void 0
                      }
                      return Object.defineProperties(i, {
                        color: {
                          get: ExpressionPropertyInterface(e.c)
                        },
                        opacity: {
                          get: ExpressionPropertyInterface(e.o)
                        },
                        _name: {
                          value: t.nm
                        },
                        mn: {
                          value: t.mn
                        }
                      }), e.c.setGroupProperty(r), e.o.setGroupProperty(r), i
                    }(e[a], r[a], i)) : "st" == e[a].ty ? n.push(function(t, e, r) {
                      function i(t) {
                        return 1 === t ? ob : r(t - 1)
                      }

                      function n(t) {
                        return 1 === t ? o : i(t - 1)
                      }
                      var s, a = t.d ? t.d.length : 0,
                        o = {};
                      for (s = 0; s < a; s += 1)(function(r) {
                        Object.defineProperty(o, t.d[r].nm, {
                          get: ExpressionPropertyInterface(e.d.dataProps[r].p)
                        })
                      })(s), e.d.dataProps[s].p.setGroupProperty(n);

                      function h(t) {
                        return "Color" === t || "color" === t ? h.color : "Opacity" === t || "opacity" === t ? h.opacity : "Stroke Width" === t || "stroke width" === t ? h.strokeWidth : void 0
                      }
                      return Object.defineProperties(h, {
                        color: {
                          get: ExpressionPropertyInterface(e.c)
                        },
                        opacity: {
                          get: ExpressionPropertyInterface(e.o)
                        },
                        strokeWidth: {
                          get: ExpressionPropertyInterface(e.w)
                        },
                        dash: {
                          get: function() {
                            return o
                          }
                        },
                        _name: {
                          value: t.nm
                        },
                        mn: {
                          value: t.mn
                        }
                      }), e.c.setGroupProperty(i), e.o.setGroupProperty(i), e.w.setGroupProperty(i), h
                    }(e[a], r[a], i)) : "tm" == e[a].ty ? n.push(function(t, e, r) {
                      function i(t) {
                        return 1 == t ? n : r(--t)
                      }

                      function n(e) {
                        return e === t.e.ix || "End" === e || "end" === e ? n.end : e === t.s.ix ? n.start : e === t.o.ix ? n.offset : void 0
                      }
                      return n.propertyIndex = t.ix, e.s.setGroupProperty(i), e.e.setGroupProperty(i), e.o.setGroupProperty(i), n.propertyIndex = t.ix, n.propertyGroup = r, Object.defineProperties(n, {
                        start: {
                          get: ExpressionPropertyInterface(e.s)
                        },
                        end: {
                          get: ExpressionPropertyInterface(e.e)
                        },
                        offset: {
                          get: ExpressionPropertyInterface(e.o)
                        },
                        _name: {
                          value: t.nm
                        }
                      }), n.mn = t.mn, n
                    }(e[a], r[a], i)) : "tr" != e[a].ty && ("el" == e[a].ty ? n.push(function(t, e, r) {
                      function i(t) {
                        return 1 == t ? n : r(--t)
                      }

                      function n(e) {
                        return t.p.ix === e ? n.position : t.s.ix === e ? n.size : void 0
                      }
                      return n.propertyIndex = t.ix, (e = "tm" === e.sh.ty ? e.sh.prop : e.sh).s.setGroupProperty(i), e.p.setGroupProperty(i), Object.defineProperties(n, {
                        size: {
                          get: ExpressionPropertyInterface(e.s)
                        },
                        position: {
                          get: ExpressionPropertyInterface(e.p)
                        },
                        _name: {
                          value: t.nm
                        }
                      }), n.mn = t.mn, n
                    }(e[a], r[a], i)) : "sr" == e[a].ty ? n.push(function(t, e, r) {
                      function i(t) {
                        return 1 == t ? n : r(--t)
                      }

                      function n(e) {
                        return t.p.ix === e ? n.position : t.r.ix === e ? n.rotation : t.pt.ix === e ? n.points : t.or.ix === e || "ADBE Vector Star Outer Radius" === e ? n.outerRadius : t.os.ix === e ? n.outerRoundness : !t.ir || t.ir.ix !== e && "ADBE Vector Star Inner Radius" !== e ? t.is && t.is.ix === e ? n.innerRoundness : void 0 : n.innerRadius
                      }
                      return e = "tm" === e.sh.ty ? e.sh.prop : e.sh, n.propertyIndex = t.ix, e.or.setGroupProperty(i), e.os.setGroupProperty(i), e.pt.setGroupProperty(i), e.p.setGroupProperty(i), e.r.setGroupProperty(i), t.ir && (e.ir.setGroupProperty(i), e.is.setGroupProperty(i)), Object.defineProperties(n, {
                        position: {
                          get: ExpressionPropertyInterface(e.p)
                        },
                        rotation: {
                          get: ExpressionPropertyInterface(e.r)
                        },
                        points: {
                          get: ExpressionPropertyInterface(e.pt)
                        },
                        outerRadius: {
                          get: ExpressionPropertyInterface(e.or)
                        },
                        outerRoundness: {
                          get: ExpressionPropertyInterface(e.os)
                        },
                        innerRadius: {
                          get: ExpressionPropertyInterface(e.ir)
                        },
                        innerRoundness: {
                          get: ExpressionPropertyInterface(e.is)
                        },
                        _name: {
                          value: t.nm
                        }
                      }), n.mn = t.mn, n
                    }(e[a], r[a], i)) : "sh" == e[a].ty ? n.push(function(t, e, r) {
                      var i = e.sh;

                      function n(t) {
                        if ("Shape" === t || "shape" === t || "Path" === t || "path" === t || "ADBE Vector Shape" === t || 2 === t) return n.path
                      }
                      return i.setGroupProperty((function(t) {
                        return 1 == t ? n : r(--t)
                      })), Object.defineProperties(n, {
                        path: {
                          get: function() {
                            return i.k && i.getValue(), i
                          }
                        },
                        shape: {
                          get: function() {
                            return i.k && i.getValue(), i
                          }
                        },
                        _name: {
                          value: t.nm
                        },
                        ix: {
                          value: t.ix
                        },
                        propertyIndex: {
                          value: t.ix
                        },
                        mn: {
                          value: t.mn
                        }
                      }), n
                    }(e[a], r[a], i)) : "rc" == e[a].ty ? n.push(function(t, e, r) {
                      function i(t) {
                        return 1 == t ? n : r(--t)
                      }

                      function n(e) {
                        return t.p.ix === e ? n.position : t.r.ix === e ? n.roundness : t.s.ix === e || "Size" === e || "ADBE Vector Rect Size" === e ? n.size : void 0
                      }
                      return e = "tm" === e.sh.ty ? e.sh.prop : e.sh, n.propertyIndex = t.ix, e.p.setGroupProperty(i), e.s.setGroupProperty(i), e.r.setGroupProperty(i), Object.defineProperties(n, {
                        position: {
                          get: ExpressionPropertyInterface(e.p)
                        },
                        roundness: {
                          get: ExpressionPropertyInterface(e.r)
                        },
                        size: {
                          get: ExpressionPropertyInterface(e.s)
                        },
                        _name: {
                          value: t.nm
                        }
                      }), n.mn = t.mn, n
                    }(e[a], r[a], i)) : "rd" == e[a].ty ? n.push(function(t, e, r) {
                      function i(e) {
                        if (t.r.ix === e || "Round Corners 1" === e) return i.radius
                      }
                      return i.propertyIndex = t.ix, e.rd.setGroupProperty((function(t) {
                        return 1 == t ? i : r(--t)
                      })), Object.defineProperties(i, {
                        radius: {
                          get: ExpressionPropertyInterface(e.rd)
                        },
                        _name: {
                          value: t.nm
                        }
                      }), i.mn = t.mn, i
                    }(e[a], r[a], i)) : "rp" == e[a].ty && n.push(function(t, e, r) {
                      function i(t) {
                        return 1 == t ? n : r(--t)
                      }

                      function n(e) {
                        return t.c.ix === e || "Copies" === e ? n.copies : t.o.ix === e || "Offset" === e ? n.offset : void 0
                      }
                      return n.propertyIndex = t.ix, e.c.setGroupProperty(i), e.o.setGroupProperty(i), Object.defineProperties(n, {
                        copies: {
                          get: ExpressionPropertyInterface(e.c)
                        },
                        offset: {
                          get: ExpressionPropertyInterface(e.o)
                        },
                        _name: {
                          value: t.nm
                        }
                      }), n.mn = t.mn, n
                    }(e[a], r[a], i)));
                    return n
                  }(t, e, n), n.numProperties = i.length, n
                }),
                TextExpressionInterface = function(t) {
                  var e;

                  function r() {}
                  return Object.defineProperty(r, "sourceText", {
                    get: function() {
                      t.textProperty.getValue();
                      var r = t.textProperty.currentData.t;
                      return void 0 !== r && (t.textProperty.currentData.t = void 0, (e = new String(r)).value = r || new String(r)), e
                    }
                  }), r
                },
                LayerExpressionInterface = function() {
                  function t(t, e) {
                    var r = new Matrix;
                    if (r.reset(), this._elem.finalTransform.mProp.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length)
                      for (var i = this._elem.hierarchy.length, n = 0; n < i; n += 1) this._elem.hierarchy[n].finalTransform.mProp.applyToMatrix(r);
                    return r.applyToPointArray(t[0], t[1], t[2] || 0)
                  }

                  function e(t, e) {
                    var r = new Matrix;
                    if (r.reset(), this._elem.finalTransform.mProp.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length)
                      for (var i = this._elem.hierarchy.length, n = 0; n < i; n += 1) this._elem.hierarchy[n].finalTransform.mProp.applyToMatrix(r);
                    return r.inversePoint(t)
                  }

                  function r(t) {
                    var e = new Matrix;
                    if (e.reset(), this._elem.finalTransform.mProp.applyToMatrix(e), this._elem.hierarchy && this._elem.hierarchy.length)
                      for (var r = this._elem.hierarchy.length, i = 0; i < r; i += 1) this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(e);
                    return e.inversePoint(t)
                  }

                  function i() {
                    return [1, 1, 1, 1]
                  }
                  return function(n) {
                    var s;

                    function a(t) {
                      switch (t) {
                        case "ADBE Root Vectors Group":
                        case "Contents":
                        case 2:
                          return a.shapeInterface;
                        case 1:
                        case 6:
                        case "Transform":
                        case "transform":
                        case "ADBE Transform Group":
                          return s;
                        case 4:
                        case "ADBE Effect Parade":
                        case "effects":
                        case "Effects":
                          return a.effect
                      }
                    }
                    a.toWorld = t, a.fromWorld = e, a.toComp = t, a.fromComp = r, a.sampleImage = i, a.sourceRectAtTime = n.sourceRectAtTime.bind(n);
                    var o = getDescriptor(s = TransformExpressionInterface((a._elem = n).finalTransform.mProp), "anchorPoint");
                    return Object.defineProperties(a, {
                      hasParent: {
                        get: function() {
                          return n.hierarchy.length
                        }
                      },
                      parent: {
                        get: function() {
                          return n.hierarchy[0].layerInterface
                        }
                      },
                      rotation: getDescriptor(s, "rotation"),
                      scale: getDescriptor(s, "scale"),
                      position: getDescriptor(s, "position"),
                      opacity: getDescriptor(s, "opacity"),
                      anchorPoint: o,
                      anchor_point: o,
                      transform: {
                        get: function() {
                          return s
                        }
                      },
                      active: {
                        get: function() {
                          return n.isInRange
                        }
                      }
                    }), a.startTime = n.data.st, a.index = n.data.ind, a.source = n.data.refId, a.height = 0 === n.data.ty ? n.data.h : 100, a.width = 0 === n.data.ty ? n.data.w : 100, a.inPoint = n.data.ip / n.comp.globalData.frameRate, a.outPoint = n.data.op / n.comp.globalData.frameRate, a._name = n.data.nm, a.registerMaskInterface = function(t) {
                      a.mask = new MaskManagerInterface(t, n)
                    }, a.registerEffectsInterface = function(t) {
                      a.effect = t
                    }, a
                  }
                }(),
                CompExpressionInterface = function(t) {
                  function e(e) {
                    for (var r = 0, i = t.layers.length; r < i;) {
                      if (t.layers[r].nm === e || t.layers[r].ind === e) return t.elements[r].layerInterface;
                      r += 1
                    }
                    return null
                  }
                  return Object.defineProperty(e, "_name", {
                    value: t.data.nm
                  }), (e.layer = e).pixelAspect = 1, e.height = t.data.h || t.globalData.compSize.h, e.width = t.data.w || t.globalData.compSize.w, e.pixelAspect = 1, e.frameDuration = 1 / t.globalData.frameRate, e.displayStartTime = 0, e.numLayers = t.layers.length, e
                },
                TransformExpressionInterface = function(t) {
                  function e(t) {
                    switch (t) {
                      case "scale":
                      case "Scale":
                      case "ADBE Scale":
                      case 6:
                        return e.scale;
                      case "rotation":
                      case "Rotation":
                      case "ADBE Rotation":
                      case "ADBE Rotate Z":
                      case 10:
                        return e.rotation;
                      case "ADBE Rotate X":
                        return e.xRotation;
                      case "ADBE Rotate Y":
                        return e.yRotation;
                      case "position":
                      case "Position":
                      case "ADBE Position":
                      case 2:
                        return e.position;
                      case "ADBE Position_0":
                        return e.xPosition;
                      case "ADBE Position_1":
                        return e.yPosition;
                      case "ADBE Position_2":
                        return e.zPosition;
                      case "anchorPoint":
                      case "AnchorPoint":
                      case "Anchor Point":
                      case "ADBE AnchorPoint":
                      case 1:
                        return e.anchorPoint;
                      case "opacity":
                      case "Opacity":
                      case 11:
                        return e.opacity
                    }
                  }
                  var r;
                  return Object.defineProperty(e, "rotation", {
                    get: ExpressionPropertyInterface(t.r || t.rz)
                  }), Object.defineProperty(e, "zRotation", {
                    get: ExpressionPropertyInterface(t.rz || t.r)
                  }), Object.defineProperty(e, "xRotation", {
                    get: ExpressionPropertyInterface(t.rx)
                  }), Object.defineProperty(e, "yRotation", {
                    get: ExpressionPropertyInterface(t.ry)
                  }), Object.defineProperty(e, "scale", {
                    get: ExpressionPropertyInterface(t.s)
                  }), t.p && (r = ExpressionPropertyInterface(t.p)), Object.defineProperty(e, "position", {
                    get: function() {
                      return t.p ? r() : [t.px.v, t.py.v, t.pz ? t.pz.v : 0]
                    }
                  }), Object.defineProperty(e, "xPosition", {
                    get: ExpressionPropertyInterface(t.px)
                  }), Object.defineProperty(e, "yPosition", {
                    get: ExpressionPropertyInterface(t.py)
                  }), Object.defineProperty(e, "zPosition", {
                    get: ExpressionPropertyInterface(t.pz)
                  }), Object.defineProperty(e, "anchorPoint", {
                    get: ExpressionPropertyInterface(t.a)
                  }), Object.defineProperty(e, "opacity", {
                    get: ExpressionPropertyInterface(t.o)
                  }), Object.defineProperty(e, "skew", {
                    get: ExpressionPropertyInterface(t.sk)
                  }), Object.defineProperty(e, "skewAxis", {
                    get: ExpressionPropertyInterface(t.sa)
                  }), Object.defineProperty(e, "orientation", {
                    get: ExpressionPropertyInterface(t.or)
                  }), e
                },
                ProjectInterface = function() {
                  function t(t) {
                    this.compositions.push(t)
                  }
                  return function() {
                    function e(t) {
                      for (var e = 0, r = this.compositions.length; e < r;) {
                        if (this.compositions[e].data && this.compositions[e].data.nm === t) return this.compositions[e].prepareFrame && this.compositions[e].data.xt && this.compositions[e].prepareFrame(this.currentFrame), this.compositions[e].compInterface;
                        e += 1
                      }
                    }
                    return e.compositions = [], e.currentFrame = 0, e.registerComposition = t, e
                  }
                }(),
                EffectsExpressionInterface = function() {
                  function t(e, r, i, n) {
                    for (var s = [], a = e.ef.length, o = 0; o < a; o += 1) 5 === e.ef[o].ty ? s.push(t(e.ef[o], r.effectElements[o], r.effectElements[o].propertyGroup, n)) : s.push(function(t, e, r, i) {
                      var n = ExpressionPropertyInterface(t.p);
                      return t.p.setGroupProperty && t.p.setGroupProperty(i),
                        function() {
                          return 10 === e ? r.comp.compInterface(t.p.v) : n()
                        }
                    }(r.effectElements[o], e.ef[o].ty, n, h));

                    function h(t) {
                      return 1 === t ? l : i(t - 1)
                    }
                    var l = function(t) {
                      for (var r = e.ef, i = 0, n = r.length; i < n;) {
                        if (t === r[i].nm || t === r[i].mn || t === r[i].ix) return 5 === r[i].ty ? s[i] : s[i]();
                        i += 1
                      }
                      return s[0]()
                    };
                    return l.propertyGroup = h, "ADBE Color Control" === e.mn && Object.defineProperty(l, "color", {
                      get: function() {
                        return s[0]()
                      }
                    }), Object.defineProperty(l, "numProperties", {
                      get: function() {
                        return e.np
                      }
                    }), l.active = l.enabled = 0 !== e.en, l
                  }
                  return {
                    createEffectsInterface: function(e, r) {
                      if (e.effectsManager) {
                        for (var i = [], n = e.data.ef, s = e.effectsManager.effectElements.length, a = 0; a < s; a += 1) i.push(t(n[a], e.effectsManager.effectElements[a], r, e));
                        return function(t) {
                          for (var r = e.data.ef || [], n = 0, s = r.length; n < s;) {
                            if (t === r[n].nm || t === r[n].mn || t === r[n].ix) return i[n];
                            n += 1
                          }
                        }
                      }
                    }
                  }
                }(),
                MaskManagerInterface = function() {
                  function t(t, e) {
                    this._mask = t, this._data = e
                  }
                  return Object.defineProperty(t.prototype, "maskPath", {
                      get: function() {
                        return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop
                      }
                    }), Object.defineProperty(t.prototype, "maskOpacity", {
                      get: function() {
                        return this._mask.op.k && this._mask.op.getValue(), 100 * this._mask.op.v
                      }
                    }),
                    function(e, r) {
                      for (var i = createSizedArray(e.viewData.length), n = e.viewData.length, s = 0; s < n; s += 1) i[s] = new t(e.viewData[s], e.masksProperties[s]);
                      return function(t) {
                        for (s = 0; s < n;) {
                          if (e.masksProperties[s].nm === t) return i[s];
                          s += 1
                        }
                      }
                    }
                }(),
                ExpressionPropertyInterface = function() {
                  var t = {
                      pv: 0,
                      v: 0,
                      mult: 1
                    },
                    e = {
                      pv: [0, 0, 0],
                      v: [0, 0, 0],
                      mult: 1
                    };

                  function r(t, e, r) {
                    Object.defineProperty(t, "velocity", {
                      get: function() {
                        return e.getVelocityAtTime(e.comp.currentFrame)
                      }
                    }), t.numKeys = e.keyframes ? e.keyframes.length : 0, t.key = function(i) {
                      var n;
                      return t.numKeys ? (n = "", n = "s" in e.keyframes[i - 1] ? e.keyframes[i - 1].s : "e" in e.keyframes[i - 2] ? e.keyframes[i - 2].e : e.keyframes[i - 2].s, (n = "unidimensional" === r ? new Number(n) : Object.assign({}, n)).time = e.keyframes[i - 1].t / e.elem.comp.globalData.frameRate, n) : 0
                    }, t.valueAtTime = e.getValueAtTime, t.speedAtTime = e.getSpeedAtTime, t.velocityAtTime = e.getVelocityAtTime, t.propertyGroup = e.propertyGroup
                  }

                  function i() {
                    return t
                  }
                  return function(n) {
                    return n ? "unidimensional" === n.propType ? (c = 1 / (p = (p = n) && "pv" in p ? p : t).mult, f = p.pv * c, (u = new Number(f)).value = f, r(u, p, "unidimensional"), function() {
                      return p.k && p.getValue(), f = p.v * c, u.value !== f && ((u = new Number(f)).value = f, r(u, p, "unidimensional")), u
                    }) : (a = 1 / (s = (s = n) && "pv" in s ? s : e).mult, o = s.pv.length, h = createTypedArray("float32", o), l = createTypedArray("float32", o), h.value = l, r(h, s, "multidimensional"), function() {
                      s.k && s.getValue();
                      for (var t = 0; t < o; t += 1) h[t] = l[t] = s.v[t] * a;
                      return h
                    }) : i;
                    var s, a, o, h, l, p, c, f, u
                  }
                }(),
                TextExpressionSelectorProp, propertyGetTextProp;

              function SliderEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
              }

              function AngleEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
              }

              function ColorEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 1, 0, r)
              }

              function PointEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 1, 0, r)
              }

              function LayerIndexEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
              }

              function MaskIndexEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
              }

              function CheckboxEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
              }

              function NoValueEffect() {
                this.p = {}
              }

              function EffectsManager() {}

              function EffectsManager(t, e) {
                var r = t.ef || [];
                this.effectElements = [];
                for (var i, n = r.length, s = 0; s < n; s++) i = new GroupEffect(r[s], e), this.effectElements.push(i)
              }

              function GroupEffect(t, e) {
                this.init(t, e)
              }
              TextExpressionSelectorProp = function() {
                function t(t, e) {
                  return this.textIndex = t + 1, this.textTotal = e, this.v = this.getValue() * this.mult, this.v
                }
                return function(e, r) {
                  this.pv = 1, this.comp = e.comp, this.elem = e, this.mult = .01, this.propType = "textSelector", this.textTotal = r.totalChars, this.selectorValue = 100, this.lastValue = [1, 1, 1], this.k = !0, this.x = !0, this.getValue = ExpressionManager.initiateExpression.bind(this)(e, r, this), this.getMult = t, this.getVelocityAtTime = expressionHelpers.getVelocityAtTime, this.kf ? this.getValueAtTime = expressionHelpers.getValueAtTime.bind(this) : this.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(this), this.setGroupProperty = expressionHelpers.setGroupProperty
                }
              }(), propertyGetTextProp = TextSelectorProp.getTextSelectorProp, TextSelectorProp.getTextSelectorProp = function(t, e, r) {
                return 1 === e.t ? new TextExpressionSelectorProp(t, e, r) : propertyGetTextProp(t, e, r)
              }, extendPrototype([DynamicPropertyContainer], GroupEffect), GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties, GroupEffect.prototype.init = function(t, e) {
                this.data = t, this.effectElements = [], this.initDynamicPropertyContainer(e);
                for (var r, i = this.data.ef.length, n = this.data.ef, s = 0; s < i; s += 1) {
                  switch (r = null, n[s].ty) {
                    case 0:
                      r = new SliderEffect(n[s], e, this);
                      break;
                    case 1:
                      r = new AngleEffect(n[s], e, this);
                      break;
                    case 2:
                      r = new ColorEffect(n[s], e, this);
                      break;
                    case 3:
                      r = new PointEffect(n[s], e, this);
                      break;
                    case 4:
                    case 7:
                      r = new CheckboxEffect(n[s], e, this);
                      break;
                    case 10:
                      r = new LayerIndexEffect(n[s], e, this);
                      break;
                    case 11:
                      r = new MaskIndexEffect(n[s], e, this);
                      break;
                    case 5:
                      r = new EffectsManager(n[s], e, this);
                      break;
                    default:
                      r = new NoValueEffect(n[s], e, this)
                  }
                  r && this.effectElements.push(r)
                }
              };
              var lottiejs = {},
                _isFrozen = !1;

              function setLocationHref(t) {
                locationHref = t
              }

              function searchAnimations() {
                !0 === standalone ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations()
              }

              function setSubframeRendering(t) {
                subframeEnabled = t
              }

              function loadAnimation(t) {
                return !0 === standalone && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t)
              }

              function setQuality(t) {
                if ("string" == typeof t) switch (t) {
                  case "high":
                    defaultCurveSegments = 200;
                    break;
                  case "medium":
                    defaultCurveSegments = 50;
                    break;
                  case "low":
                    defaultCurveSegments = 10
                } else !isNaN(t) && 1 < t && (defaultCurveSegments = t);
                roundValues(!(50 <= defaultCurveSegments))
              }

              function inBrowser() {
                return void 0 !== navigator
              }

              function installPlugin(t, e) {
                "expressions" === t && (expressionsPlugin = e)
              }

              function getFactory(t) {
                switch (t) {
                  case "propertyFactory":
                    return PropertyFactory;
                  case "shapePropertyFactory":
                    return ShapePropertyFactory;
                  case "matrix":
                    return Matrix
                }
              }

              function checkReady() {
                "complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations())
              }

              function getQueryVariable(t) {
                for (var e = queryString.split("&"), r = 0; r < e.length; r++) {
                  var i = e[r].split("=");
                  if (decodeURIComponent(i[0]) == t) return decodeURIComponent(i[1])
                }
              }
              lottiejs.play = animationManager.play, lottiejs.pause = animationManager.pause, lottiejs.setLocationHref = setLocationHref, lottiejs.togglePause = animationManager.togglePause, lottiejs.setSpeed = animationManager.setSpeed, lottiejs.setDirection = animationManager.setDirection, lottiejs.stop = animationManager.stop, lottiejs.searchAnimations = searchAnimations, lottiejs.registerAnimation = animationManager.registerAnimation, lottiejs.loadAnimation = loadAnimation, lottiejs.setSubframeRendering = setSubframeRendering, lottiejs.resize = animationManager.resize, lottiejs.goToAndStop = animationManager.goToAndStop, lottiejs.destroy = animationManager.destroy, lottiejs.setQuality = setQuality, lottiejs.inBrowser = inBrowser, lottiejs.installPlugin = installPlugin, lottiejs.freeze = animationManager.freeze, lottiejs.unfreeze = animationManager.unfreeze, lottiejs.getRegisteredAnimations = animationManager.getRegisteredAnimations, lottiejs.__getFactory = getFactory, lottiejs.version = "5.5.7";
              var standalone = "",
                animationData = "__[ANIMATIONDATA]__",
                renderer = "",
                readyStateCheckInterval = setInterval(checkReady, 100);
              return lottiejs
            }));
            var _window$lottie = window.lottie,
              freeze = _window$lottie.freeze,
              unfreeze = _window$lottie.unfreeze
          }.call(this, __webpack_require__(2)(module))
      }, function(t, e) {
        t.exports = function(t) {
          var e;
          return t.webpackPolyfill || ((e = Object.create(t)).children || (e.children = []), Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function() {
              return e.l
            }
          }), Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function() {
              return e.i
            }
          }), Object.defineProperty(e, "exports", {
            enumerable: !0
          }), e.webpackPolyfill = 1), e
        }
      }]))
    },
    3: function(t, e, r) {
      t.exports = r(1012)
    },
    4: function(t, e, r) {
      t.exports = r(1011).default, t.exports.default = t.exports
    },
    45: function(t, e, r) {
      function i() {
        var t, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 8,
          r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 16,
          i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
          n = [],
          s = 0;
        r = r || i.length;
        if (e)
          for (s = 0; s < e; s++) n[s] = i[0 | Math.random() * r];
        else
          for (n[8] = n[13] = n[18] = n[23] = "-", n[14] = "4", s = 0; s < 36; s++) n[s] || (t = 0 | 16 * Math.random(), n[s] = i[19 === s ? 3 & t | 8 : t]);
        return n.join("")
      }

      function n() {}

      function s() {
        return !1
      }
      r.d(e, "c", (function() {
        return i
      })), r.d(e, "a", (function() {
        return n
      })), r.d(e, "b", (function() {
        return s
      })), e = r(0), (r = r.n(e)).a.getEnv()
    },
    5: function(t, e, r) {
      var i, n = "function" == typeof Symbol && "symbol" == _typeof4(Symbol.iterator) ? function(t) {
        return _typeof4(t)
      } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof4(t)
      };
      ! function() {
        var s = {}.hasOwnProperty;

        function a() {
          for (var t = [], e = 0; e < arguments.length; e++) {
            var r = arguments[e];
            if (r) {
              var i = void 0 === r ? "undefined" : n(r);
              if ("string" === i || "number" === i) t.push(r);
              else if (Array.isArray(r) && r.length) {
                var o = a.apply(null, r);
                o && t.push(o)
              } else if ("object" === i)
                for (var h in r) s.call(r, h) && r[h] && t.push(h)
            }
          }
          return t.join(" ")
        }
        t.exports ? t.exports = a.default = a : "object" === n(r(88)) && r(88) ? void 0 !== (i = function() {
          return a
        }.apply(e, [])) && (t.exports = i) : window.classNames = a
      }()
    },
    52: function(t, e) {
      var r = "function" == typeof Symbol && "symbol" == _typeof4(Symbol.iterator) ? function(t) {
          return _typeof4(t)
        } : function(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof4(t)
        },
        i = function() {
          return this
        }();
      try {
        i = i || new Function("return this")()
      } catch (t) {
        "object" === ("undefined" == typeof window ? "undefined" : r(window)) && (i = window)
      }
      t.exports = i
    },
    6: function(t, e, r) {
      t.exports = r(1019).default, t.exports.default = t.exports
    },
    69: function(t, e, r) {
      (function() {
        function e(t, e, r) {
          null != t && ("number" == typeof t ? this.fromNumber(t, e, r) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
        }

        function r() {
          return new e(null)
        }
        for (var i = (i = "undefined" != typeof navigator) && "Microsoft Internet Explorer" == navigator.appName ? (e.prototype.am = function(t, e, r, i, n, s) {
            for (var a = 32767 & e, o = e >> 15; 0 <= --s;) {
              var h = 32767 & this[t],
                l = this[t++] >> 15,
                p = o * h + l * a;
              n = ((h = a * h + ((32767 & p) << 15) + r[i] + (1073741823 & n)) >>> 30) + (p >>> 15) + o * l + (n >>> 30), r[i++] = 1073741823 & h
            }
            return n
          }, 30) : i && "Netscape" != navigator.appName ? (e.prototype.am = function(t, e, r, i, n, s) {
            for (; 0 <= --s;) {
              var a = e * this[t++] + r[i] + n;
              n = Math.floor(a / 67108864), r[i++] = 67108863 & a
            }
            return n
          }, 26) : (e.prototype.am = function(t, e, r, i, n, s) {
            for (var a = 16383 & e, o = e >> 14; 0 <= --s;) {
              var h = 16383 & this[t],
                l = this[t++] >> 14,
                p = o * h + l * a;
              n = ((h = a * h + ((16383 & p) << 14) + r[i] + n) >> 28) + (p >> 14) + o * l, r[i++] = 268435455 & h
            }
            return n
          }, 28), n = (e.prototype.DB = i, e.prototype.DM = (1 << i) - 1, e.prototype.DV = 1 << i, e.prototype.FV = Math.pow(2, 52), e.prototype.F1 = 52 - i, e.prototype.F2 = 2 * i - 52, "0123456789abcdefghijklmnopqrstuvwxyz"), s = new Array, a = "0".charCodeAt(0), o = 0; o <= 9; ++o) s[a++] = o;
        for (a = "a".charCodeAt(0), o = 10; o < 36; ++o) s[a++] = o;
        for (a = "A".charCodeAt(0), o = 10; o < 36; ++o) s[a++] = o;

        function h(t) {
          return n.charAt(t)
        }

        function l(t, e) {
          return null == (t = s[t.charCodeAt(e)]) ? -1 : t
        }

        function p(t) {
          var e = r();
          return e.fromInt(t), e
        }

        function c(t) {
          var e, r = 1;
          return 0 != (e = t >>> 16) && (t = e, r += 16), 0 != (e = t >> 8) && (t = e, r += 8), 0 != (e = t >> 4) && (t = e, r += 4), 0 != (e = t >> 2) && (t = e, r += 2), 0 != (e = t >> 1) && (t = e, r += 1), r
        }

        function f(t) {
          this.m = t
        }

        function u(t) {
          this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
        }

        function m(t, e) {
          return t & e
        }

        function d(t, e) {
          return t | e
        }

        function y(t, e) {
          return t ^ e
        }

        function g(t, e) {
          return t & ~e
        }

        function v() {}

        function b(t) {
          return t
        }

        function P(t) {
          this.r2 = r(), this.q3 = r(), e.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t), this.m = t
        }
        f.prototype.convert = function(t) {
          return t.s < 0 || 0 <= t.compareTo(this.m) ? t.mod(this.m) : t
        }, f.prototype.revert = function(t) {
          return t
        }, f.prototype.reduce = function(t) {
          t.divRemTo(this.m, null, t)
        }, f.prototype.mulTo = function(t, e, r) {
          t.multiplyTo(e, r), this.reduce(r)
        }, f.prototype.sqrTo = function(t, e) {
          t.squareTo(e), this.reduce(e)
        }, u.prototype.convert = function(t) {
          var i = r();
          return t.abs().dlShiftTo(this.m.t, i), i.divRemTo(this.m, null, i), t.s < 0 && 0 < i.compareTo(e.ZERO) && this.m.subTo(i, i), i
        }, u.prototype.revert = function(t) {
          var e = r();
          return t.copyTo(e), this.reduce(e), e
        }, u.prototype.reduce = function(t) {
          for (; t.t <= this.mt2;) t[t.t++] = 0;
          for (var e = 0; e < this.m.t; ++e) {
            var r = 32767 & t[e],
              i = r * this.mpl + ((r * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
            for (t[r = e + this.m.t] += this.m.am(0, i, t, e, 0, this.m.t); t[r] >= t.DV;) t[r] -= t.DV, t[++r]++
          }
          t.clamp(), t.drShiftTo(this.m.t, t), 0 <= t.compareTo(this.m) && t.subTo(this.m, t)
        }, u.prototype.mulTo = function(t, e, r) {
          t.multiplyTo(e, r), this.reduce(r)
        }, u.prototype.sqrTo = function(t, e) {
          t.squareTo(e), this.reduce(e)
        }, e.prototype.copyTo = function(t) {
          for (var e = this.t - 1; 0 <= e; --e) t[e] = this[e];
          t.t = this.t, t.s = this.s
        }, e.prototype.fromInt = function(t) {
          this.t = 1, this.s = t < 0 ? -1 : 0, 0 < t ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
        }, e.prototype.fromString = function(t, r) {
          var i;
          if (16 == r) i = 4;
          else if (8 == r) i = 3;
          else if (256 == r) i = 8;
          else if (2 == r) i = 1;
          else if (32 == r) i = 5;
          else {
            if (4 != r) return void this.fromRadix(t, r);
            i = 2
          }
          this.t = 0, this.s = 0;
          for (var n = t.length, s = !1, a = 0; 0 <= --n;) {
            var o = 8 == i ? 255 & t[n] : l(t, n);
            o < 0 ? "-" == t.charAt(n) && (s = !0) : (s = !1, 0 == a ? this[this.t++] = o : a + i > this.DB ? (this[this.t - 1] |= (o & (1 << this.DB - a) - 1) << a, this[this.t++] = o >> this.DB - a) : this[this.t - 1] |= o << a, (a += i) >= this.DB && (a -= this.DB))
          }
          8 == i && 0 != (128 & t[0]) && (this.s = -1, 0 < a) && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a), this.clamp(), s && e.ZERO.subTo(this, this)
        }, e.prototype.clamp = function() {
          for (var t = this.s & this.DM; 0 < this.t && this[this.t - 1] == t;) --this.t
        }, e.prototype.dlShiftTo = function(t, e) {
          for (var r = this.t - 1; 0 <= r; --r) e[r + t] = this[r];
          for (r = t - 1; 0 <= r; --r) e[r] = 0;
          e.t = this.t + t, e.s = this.s
        }, e.prototype.drShiftTo = function(t, e) {
          for (var r = t; r < this.t; ++r) e[r - t] = this[r];
          e.t = Math.max(this.t - t, 0), e.s = this.s
        }, e.prototype.lShiftTo = function(t, e) {
          for (var r = t % this.DB, i = this.DB - r, n = (1 << i) - 1, s = Math.floor(t / this.DB), a = this.s << r & this.DM, o = this.t - 1; 0 <= o; --o) e[o + s + 1] = this[o] >> i | a, a = (this[o] & n) << r;
          for (o = s - 1; 0 <= o; --o) e[o] = 0;
          e[s] = a, e.t = this.t + s + 1, e.s = this.s, e.clamp()
        }, e.prototype.rShiftTo = function(t, e) {
          e.s = this.s;
          var r = Math.floor(t / this.DB);
          if (r >= this.t) e.t = 0;
          else {
            var i = t % this.DB,
              n = this.DB - i,
              s = (1 << i) - 1;
            e[0] = this[r] >> i;
            for (var a = r + 1; a < this.t; ++a) e[a - r - 1] |= (this[a] & s) << n, e[a - r] = this[a] >> i;
            0 < i && (e[this.t - r - 1] |= (this.s & s) << n), e.t = this.t - r, e.clamp()
          }
        }, e.prototype.subTo = function(t, e) {
          for (var r = 0, i = 0, n = Math.min(t.t, this.t); r < n;) i += this[r] - t[r], e[r++] = i & this.DM, i >>= this.DB;
          if (t.t < this.t) {
            for (i -= t.s; r < this.t;) i += this[r], e[r++] = i & this.DM, i >>= this.DB;
            i += this.s
          } else {
            for (i += this.s; r < t.t;) i -= t[r], e[r++] = i & this.DM, i >>= this.DB;
            i -= t.s
          }
          e.s = i < 0 ? -1 : 0, i < -1 ? e[r++] = this.DV + i : 0 < i && (e[r++] = i), e.t = r, e.clamp()
        }, e.prototype.multiplyTo = function(t, r) {
          var i = this.abs(),
            n = t.abs(),
            s = i.t;
          for (r.t = s + n.t; 0 <= --s;) r[s] = 0;
          for (s = 0; s < n.t; ++s) r[s + i.t] = i.am(0, n[s], r, s, 0, i.t);
          r.s = 0, r.clamp(), this.s != t.s && e.ZERO.subTo(r, r)
        }, e.prototype.squareTo = function(t) {
          for (var e = this.abs(), r = t.t = 2 * e.t; 0 <= --r;) t[r] = 0;
          for (r = 0; r < e.t - 1; ++r) {
            var i = e.am(r, e[r], t, 2 * r, 0, 1);
            (t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, i, e.t - r - 1)) >= e.DV && (t[r + e.t] -= e.DV, t[r + e.t + 1] = 1)
          }
          0 < t.t && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)), t.s = 0, t.clamp()
        }, e.prototype.divRemTo = function(t, i, n) {
          if (!((f = t.abs()).t <= 0)) {
            var s = this.abs();
            if (s.t < f.t) null != i && i.fromInt(0), null != n && this.copyTo(n);
            else {
              null == n && (n = r());
              var a = r(),
                o = this.s,
                h = (t = t.s, this.DB - c(f[f.t - 1])),
                l = (0 < h ? (f.lShiftTo(h, a), s.lShiftTo(h, n)) : (f.copyTo(a), s.copyTo(n)), a.t),
                p = a[l - 1];
              if (0 != p) {
                var f = p * (1 << this.F1) + (1 < l ? a[l - 2] >> this.F2 : 0),
                  u = this.FV / f,
                  m = (1 << this.F1) / f,
                  d = 1 << this.F2,
                  y = n.t,
                  g = y - l,
                  v = null == i ? r() : i;
                for (a.dlShiftTo(g, v), 0 <= n.compareTo(v) && (n[n.t++] = 1, n.subTo(v, n)), e.ONE.dlShiftTo(l, v), v.subTo(a, a); a.t < l;) a[a.t++] = 0;
                for (; 0 <= --g;) {
                  var b = n[--y] == p ? this.DM : Math.floor(n[y] * u + (n[y - 1] + d) * m);
                  if ((n[y] += a.am(0, b, n, g, 0, l)) < b)
                    for (a.dlShiftTo(g, v), n.subTo(v, n); n[y] < --b;) n.subTo(v, n)
                }
                null != i && (n.drShiftTo(l, i), o != t) && e.ZERO.subTo(i, i), n.t = l, n.clamp(), 0 < h && n.rShiftTo(h, n), o < 0 && e.ZERO.subTo(n, n)
              }
            }
          }
        }, e.prototype.invDigit = function() {
          var t, e;
          return this.t < 1 || 0 == (1 & (t = this[0])) ? 0 : 0 < (e = (e = (e = (e = (e = 3 & t) * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) ? this.DV - e : -e
        }, e.prototype.isEven = function() {
          return 0 == (0 < this.t ? 1 & this[0] : this.s)
        }, e.prototype.exp = function(t, i) {
          if (4294967295 < t || t < 1) return e.ONE;
          var n, s = r(),
            a = r(),
            o = i.convert(this),
            h = c(t) - 1;
          for (o.copyTo(s); 0 <= --h;) i.sqrTo(s, a), 0 < (t & 1 << h) ? i.mulTo(a, o, s) : (n = s, s = a, a = n);
          return i.revert(s)
        }, e.prototype.toString = function(t) {
          if (this.s < 0) return "-" + this.negate().toString(t);
          var e;
          if (16 == t) e = 4;
          else if (8 == t) e = 3;
          else if (2 == t) e = 1;
          else if (32 == t) e = 5;
          else {
            if (4 != t) return this.toRadix(t);
            e = 2
          }
          var r, i = (1 << e) - 1,
            n = !1,
            s = "",
            a = this.t,
            o = this.DB - a * this.DB % e;
          if (0 < a--)
            for (o < this.DB && 0 < (r = this[a] >> o) && (n = !0, s = h(r)); 0 <= a;) o < e ? (r = (this[a] & (1 << o) - 1) << e - o, r |= this[--a] >> (o += this.DB - e)) : (r = this[a] >> (o -= e) & i, o <= 0 && (o += this.DB, --a)), (n = 0 < r || n) && (s += h(r));
          return n ? s : "0"
        }, e.prototype.negate = function() {
          var t = r();
          return e.ZERO.subTo(this, t), t
        }, e.prototype.abs = function() {
          return this.s < 0 ? this.negate() : this
        }, e.prototype.compareTo = function(t) {
          var e = this.s - t.s;
          if (0 != e) return e;
          var r = this.t;
          if (0 != (e = r - t.t)) return this.s < 0 ? -e : e;
          for (; 0 <= --r;)
            if (0 != (e = this[r] - t[r])) return e;
          return 0
        }, e.prototype.bitLength = function() {
          return this.t <= 0 ? 0 : this.DB * (this.t - 1) + c(this[this.t - 1] ^ this.s & this.DM)
        }, e.prototype.mod = function(t) {
          var i = r();
          return this.abs().divRemTo(t, null, i), this.s < 0 && 0 < i.compareTo(e.ZERO) && t.subTo(i, i), i
        }, e.prototype.modPowInt = function(t, e) {
          return e = new(t < 256 || e.isEven() ? f : u)(e), this.exp(t, e)
        }, e.ZERO = p(0), e.ONE = p(1), v.prototype.convert = b, v.prototype.revert = b, v.prototype.mulTo = function(t, e, r) {
          t.multiplyTo(e, r)
        }, v.prototype.sqrTo = function(t, e) {
          t.squareTo(e)
        }, P.prototype.convert = function(t) {
          var e;
          return t.s < 0 || t.t > 2 * this.m.t ? t.mod(this.m) : t.compareTo(this.m) < 0 ? t : (e = r(), t.copyTo(e), this.reduce(e), e)
        }, P.prototype.revert = function(t) {
          return t
        }, P.prototype.reduce = function(t) {
          for (t.drShiftTo(this.m.t - 1, this.r2), t.t > this.m.t + 1 && (t.t = this.m.t + 1, t.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;) t.dAddOffset(1, this.m.t + 1);
          for (t.subTo(this.r2, t); 0 <= t.compareTo(this.m);) t.subTo(this.m, t)
        }, P.prototype.mulTo = function(t, e, r) {
          t.multiplyTo(e, r), this.reduce(r)
        }, P.prototype.sqrTo = function(t, e) {
          t.squareTo(e), this.reduce(e)
        };
        var x, _ = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
          T = 67108864 / _[_.length - 1];

        function S() {
          ! function(t) {
            E[w++] ^= 255 & t, E[w++] ^= t >> 8 & 255, E[w++] ^= t >> 16 & 255, E[w++] ^= t >> 24 & 255, M <= w && (w -= M)
          }((new Date).getTime())
        }
        if (e.prototype.chunkSize = function(t) {
            return Math.floor(Math.LN2 * this.DB / Math.log(t))
          }, e.prototype.toRadix = function(t) {
            if (null == t && (t = 10), 0 == this.signum() || t < 2 || 36 < t) return "0";
            var e = this.chunkSize(t),
              i = Math.pow(t, e),
              n = p(i),
              s = r(),
              a = r(),
              o = "";
            for (this.divRemTo(n, s, a); 0 < s.signum();) o = (i + a.intValue()).toString(t).substr(1) + o, s.divRemTo(n, s, a);
            return a.intValue().toString(t) + o
          }, e.prototype.fromRadix = function(t, r) {
            this.fromInt(0);
            for (var i = this.chunkSize(r = null == r ? 10 : r), n = Math.pow(r, i), s = !1, a = 0, o = 0, h = 0; h < t.length; ++h) {
              var p = l(t, h);
              p < 0 ? "-" == t.charAt(h) && 0 == this.signum() && (s = !0) : (o = r * o + p, ++a >= i && (this.dMultiply(n), this.dAddOffset(o, 0), o = a = 0))
            }
            0 < a && (this.dMultiply(Math.pow(r, a)), this.dAddOffset(o, 0)), s && e.ZERO.subTo(this, this)
          }, e.prototype.fromNumber = function(t, r, i) {
            if ("number" == typeof r)
              if (t < 2) this.fromInt(1);
              else
                for (this.fromNumber(t, i), this.testBit(t - 1) || this.bitwiseTo(e.ONE.shiftLeft(t - 1), d, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(r);) this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(e.ONE.shiftLeft(t - 1), this);
            else {
              var n = 7 & t;
              (i = new Array).length = 1 + (t >> 3), r.nextBytes(i), 0 < n ? i[0] &= (1 << n) - 1 : i[0] = 0, this.fromString(i, 256)
            }
          }, e.prototype.bitwiseTo = function(t, e, r) {
            for (var i, n = Math.min(t.t, this.t), s = 0; s < n; ++s) r[s] = e(this[s], t[s]);
            if (t.t < this.t) {
              for (i = t.s & this.DM, s = n; s < this.t; ++s) r[s] = e(this[s], i);
              r.t = this.t
            } else {
              for (i = this.s & this.DM, s = n; s < t.t; ++s) r[s] = e(i, t[s]);
              r.t = t.t
            }
            r.s = e(this.s, t.s), r.clamp()
          }, e.prototype.changeBit = function(t, r) {
            return t = e.ONE.shiftLeft(t), this.bitwiseTo(t, r, t), t
          }, e.prototype.addTo = function(t, e) {
            for (var r = 0, i = 0, n = Math.min(t.t, this.t); r < n;) i += this[r] + t[r], e[r++] = i & this.DM, i >>= this.DB;
            if (t.t < this.t) {
              for (i += t.s; r < this.t;) i += this[r], e[r++] = i & this.DM, i >>= this.DB;
              i += this.s
            } else {
              for (i += this.s; r < t.t;) i += t[r], e[r++] = i & this.DM, i >>= this.DB;
              i += t.s
            }
            e.s = i < 0 ? -1 : 0, 0 < i ? e[r++] = i : i < -1 && (e[r++] = this.DV + i), e.t = r, e.clamp()
          }, e.prototype.dMultiply = function(t) {
            this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp()
          }, e.prototype.dAddOffset = function(t, e) {
            if (0 != t) {
              for (; this.t <= e;) this[this.t++] = 0;
              for (this[e] += t; this[e] >= this.DV;) this[e] -= this.DV, ++e >= this.t && (this[this.t++] = 0), ++this[e]
            }
          }, e.prototype.multiplyLowerTo = function(t, e, r) {
            var i, n = Math.min(this.t + t.t, e);
            for (r.s = 0, r.t = n; 0 < n;) r[--n] = 0;
            for (i = r.t - this.t; n < i; ++n) r[n + this.t] = this.am(0, t[n], r, n, 0, this.t);
            for (i = Math.min(t.t, e); n < i; ++n) this.am(0, t[n], r, n, 0, e - n);
            r.clamp()
          }, e.prototype.multiplyUpperTo = function(t, e, r) {
            var i = r.t = this.t + t.t - --e;
            for (r.s = 0; 0 <= --i;) r[i] = 0;
            for (i = Math.max(e - this.t, 0); i < t.t; ++i) r[this.t + i - e] = this.am(e - i, t[i], r, 0, 0, this.t + i - e);
            r.clamp(), r.drShiftTo(1, r)
          }, e.prototype.modInt = function(t) {
            if (t <= 0) return 0;
            var e = this.DV % t,
              r = this.s < 0 ? t - 1 : 0;
            if (0 < this.t)
              if (0 == e) r = this[0] % t;
              else
                for (var i = this.t - 1; 0 <= i; --i) r = (e * r + this[i]) % t;
            return r
          }, e.prototype.millerRabin = function(t) {
            var i = this.subtract(e.ONE),
              n = i.getLowestSetBit();
            if (n <= 0) return !1;
            for (var s = i.shiftRight(n), a = (_.length < (t = t + 1 >> 1) && (t = _.length), r()), o = 0; o < t; ++o) {
              a.fromInt(_[Math.floor(Math.random() * _.length)]);
              var h = a.modPow(s, this);
              if (0 != h.compareTo(e.ONE) && 0 != h.compareTo(i)) {
                for (var l = 1; l++ < n && 0 != h.compareTo(i);)
                  if (0 == (h = h.modPowInt(2, this)).compareTo(e.ONE)) return !1;
                if (0 != h.compareTo(i)) return !1
              }
            }
            return !0
          }, e.prototype.clone = function() {
            var t = r();
            return this.copyTo(t), t
          }, e.prototype.intValue = function() {
            if (this.s < 0) {
              if (1 == this.t) return this[0] - this.DV;
              if (0 == this.t) return -1
            } else {
              if (1 == this.t) return this[0];
              if (0 == this.t) return 0
            }
            return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
          }, e.prototype.byteValue = function() {
            return 0 == this.t ? this.s : this[0] << 24 >> 24
          }, e.prototype.shortValue = function() {
            return 0 == this.t ? this.s : this[0] << 16 >> 16
          }, e.prototype.signum = function() {
            return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
          }, e.prototype.toByteArray = function() {
            var t, e = this.t,
              r = new Array,
              i = (r[0] = this.s, this.DB - e * this.DB % 8),
              n = 0;
            if (0 < e--)
              for (i < this.DB && (t = this[e] >> i) != (this.s & this.DM) >> i && (r[n++] = t | this.s << this.DB - i); 0 <= e;) i < 8 ? (t = (this[e] & (1 << i) - 1) << 8 - i, t |= this[--e] >> (i += this.DB - 8)) : (t = this[e] >> (i -= 8) & 255, i <= 0 && (i += this.DB, --e)), 0 != (128 & t) && (t |= -256), 0 == n && (128 & this.s) != (128 & t) && ++n, (0 < n || t != this.s) && (r[n++] = t);
            return r
          }, e.prototype.equals = function(t) {
            return 0 == this.compareTo(t)
          }, e.prototype.min = function(t) {
            return this.compareTo(t) < 0 ? this : t
          }, e.prototype.max = function(t) {
            return 0 < this.compareTo(t) ? this : t
          }, e.prototype.and = function(t) {
            var e = r();
            return this.bitwiseTo(t, m, e), e
          }, e.prototype.or = function(t) {
            var e = r();
            return this.bitwiseTo(t, d, e), e
          }, e.prototype.xor = function(t) {
            var e = r();
            return this.bitwiseTo(t, y, e), e
          }, e.prototype.andNot = function(t) {
            var e = r();
            return this.bitwiseTo(t, g, e), e
          }, e.prototype.not = function() {
            for (var t = r(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];
            return t.t = this.t, t.s = ~this.s, t
          }, e.prototype.shiftLeft = function(t) {
            var e = r();
            return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e
          }, e.prototype.shiftRight = function(t) {
            var e = r();
            return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e
          }, e.prototype.getLowestSetBit = function() {
            for (var t = 0; t < this.t; ++t)
              if (0 != this[t]) return t * this.DB + function(t) {
                var e;
                return 0 == t ? -1 : ((e = 0) == (65535 & t) && (t >>= 16, e += 16), 0 == (255 & t) && (t >>= 8, e += 8), 0 == (15 & t) && (t >>= 4, e += 4), 0 == (3 & t) && (t >>= 2, e += 2), 0 == (1 & t) && ++e, e)
              }(this[t]);
            return this.s < 0 ? this.t * this.DB : -1
          }, e.prototype.bitCount = function() {
            for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r) t += function(t) {
              for (var e = 0; 0 != t;) t &= t - 1, ++e;
              return e
            }(this[r] ^ e);
            return t
          }, e.prototype.testBit = function(t) {
            var e = Math.floor(t / this.DB);
            return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
          }, e.prototype.setBit = function(t) {
            return this.changeBit(t, d)
          }, e.prototype.clearBit = function(t) {
            return this.changeBit(t, g)
          }, e.prototype.flipBit = function(t) {
            return this.changeBit(t, y)
          }, e.prototype.add = function(t) {
            var e = r();
            return this.addTo(t, e), e
          }, e.prototype.subtract = function(t) {
            var e = r();
            return this.subTo(t, e), e
          }, e.prototype.multiply = function(t) {
            var e = r();
            return this.multiplyTo(t, e), e
          }, e.prototype.divide = function(t) {
            var e = r();
            return this.divRemTo(t, e, null), e
          }, e.prototype.remainder = function(t) {
            var e = r();
            return this.divRemTo(t, null, e), e
          }, e.prototype.divideAndRemainder = function(t) {
            var e = r(),
              i = r();
            return this.divRemTo(t, e, i), new Array(e, i)
          }, e.prototype.modPow = function(t, e) {
            var i = t.bitLength(),
              n = p(1);
            if (i <= 0) return n;
            var s = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6,
              a = new(i < 8 ? f : e.isEven() ? P : u)(e),
              o = new Array,
              h = 3,
              l = s - 1,
              m = (1 << s) - 1;
            if (o[1] = a.convert(this), 1 < s) {
              var d = r();
              for (a.sqrTo(o[1], d); h <= m;) o[h] = r(), a.mulTo(d, o[h - 2], o[h]), h += 2
            }
            var y, g, v = t.t - 1,
              b = !0,
              x = r();
            for (i = c(t[v]) - 1; 0 <= v;) {
              for (l <= i ? y = t[v] >> i - l & m : (y = (t[v] & (1 << i + 1) - 1) << l - i, 0 < v && (y |= t[v - 1] >> this.DB + i - l)), h = s; 0 == (1 & y);) y >>= 1, --h;
              if ((i -= h) < 0 && (i += this.DB, --v), b) o[y].copyTo(n), b = !1;
              else {
                for (; 1 < h;) a.sqrTo(n, x), a.sqrTo(x, n), h -= 2;
                0 < h ? a.sqrTo(n, x) : (g = n, n = x, x = g), a.mulTo(x, o[y], n)
              }
              for (; 0 <= v && 0 == (t[v] & 1 << i);) a.sqrTo(n, x), g = n, n = x, x = g, --i < 0 && (i = this.DB - 1, --v)
            }
            return a.revert(n)
          }, e.prototype.modInverse = function(t) {
            var r = t.isEven();
            if (this.isEven() && r || 0 == t.signum()) return e.ZERO;
            for (var i = t.clone(), n = this.clone(), s = p(1), a = p(0), o = p(0), h = p(1); 0 != i.signum();) {
              for (; i.isEven();) i.rShiftTo(1, i), r ? (s.isEven() && a.isEven() || (s.addTo(this, s), a.subTo(t, a)), s.rShiftTo(1, s)) : a.isEven() || a.subTo(t, a), a.rShiftTo(1, a);
              for (; n.isEven();) n.rShiftTo(1, n), r ? (o.isEven() && h.isEven() || (o.addTo(this, o), h.subTo(t, h)), o.rShiftTo(1, o)) : h.isEven() || h.subTo(t, h), h.rShiftTo(1, h);
              0 <= i.compareTo(n) ? (i.subTo(n, i), r && s.subTo(o, s), a.subTo(h, a)) : (n.subTo(i, n), r && o.subTo(s, o), h.subTo(a, h))
            }
            return 0 != n.compareTo(e.ONE) ? e.ZERO : 0 <= h.compareTo(t) ? h.subtract(t) : h.signum() < 0 && (h.addTo(t, h), h.signum() < 0) ? h.add(t) : h
          }, e.prototype.pow = function(t) {
            return this.exp(t, new v)
          }, e.prototype.gcd = function(t) {
            var e = this.s < 0 ? this.negate() : this.clone(),
              r = t.s < 0 ? t.negate() : t.clone(),
              i = (e.compareTo(r) < 0 && (t = e, e = r, r = t), e.getLowestSetBit());
            if ((t = r.getLowestSetBit()) < 0) return e;
            for (0 < (t = i < t ? i : t) && (e.rShiftTo(t, e), r.rShiftTo(t, r)); 0 < e.signum();) 0 < (i = e.getLowestSetBit()) && e.rShiftTo(i, e), 0 < (i = r.getLowestSetBit()) && r.rShiftTo(i, r), 0 <= e.compareTo(r) ? (e.subTo(r, e), e.rShiftTo(1, e)) : (r.subTo(e, r), r.rShiftTo(1, r));
            return 0 < t && r.lShiftTo(t, r), r
          }, e.prototype.isProbablePrime = function(t) {
            var e, r = this.abs();
            if (1 == r.t && r[0] <= _[_.length - 1]) {
              for (e = 0; e < _.length; ++e)
                if (r[0] == _[e]) return !0;
              return !1
            }
            if (r.isEven()) return !1;
            for (e = 1; e < _.length;) {
              for (var i = _[e], n = e + 1; n < _.length && i < T;) i *= _[n++];
              for (i = r.modInt(i); e < n;)
                if (i % _[e++] == 0) return !1
            }
            return r.millerRabin(t)
          }, e.prototype.square = function() {
            var t = r();
            return this.squareTo(t), t
          }, e.prototype.Barrett = P, null == E) {
          var E = new Array,
            w = 0;
          if ("undefined" != typeof window && window.crypto)
            if (window.crypto.getRandomValues) {
              var A = new Uint8Array(32);
              for (window.crypto.getRandomValues(A), D = 0; D < 32; ++D) E[w++] = A[D]
            } else if ("Netscape" == navigator.appName && navigator.appVersion < "5")
            for (var C = window.crypto.random(32), D = 0; D < C.length; ++D) E[w++] = 255 & C.charCodeAt(D);
          for (; w < M;) D = Math.floor(65536 * Math.random()), E[w++] = D >>> 8, E[w++] = 255 & D;
          w = 0, S()
        }

        function k() {
          if (null == x) {
            for (S(), (x = new F).init(E), w = 0; w < E.length; ++w) E[w] = 0;
            w = 0
          }
          return x.next()
        }

        function I() {}

        function F() {
          this.i = 0, this.j = 0, this.S = new Array
        }
        I.prototype.nextBytes = function(t) {
          for (var e = 0; e < t.length; ++e) t[e] = k()
        }, F.prototype.init = function(t) {
          for (var e, r, i = 0; i < 256; ++i) this.S[i] = i;
          for (i = e = 0; i < 256; ++i) e = e + this.S[i] + t[i % t.length] & 255, r = this.S[i], this.S[i] = this.S[e], this.S[e] = r;
          this.i = 0, this.j = 0
        }, F.prototype.next = function() {
          var t;
          return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255]
        };
        var M = 256;
        e.SecureRandom = I, t.exports = e.BigInteger = e
      }).call(this)
    },
    7: function(t, e, r) {
      t.exports = r(1887)()
    },
    88: function(t, e) {
      (function(e) {
        t.exports = e
      }).call(this, {})
    },
    93: function(t, e) {
      var r, i;
      t = t.exports = {};

      function n() {
        throw new Error("setTimeout has not been defined")
      }

      function s() {
        throw new Error("clearTimeout has not been defined")
      }
      try {
        r = "function" == typeof setTimeout ? setTimeout : n
      } catch (t) {
        r = n
      }
      try {
        i = "function" == typeof clearTimeout ? clearTimeout : s
      } catch (t) {
        i = s
      }

      function a(t) {
        if (r === setTimeout) return setTimeout(t, 0);
        if ((r === n || !r) && setTimeout) return (r = setTimeout)(t, 0);
        try {
          return r(t, 0)
        } catch (e) {
          try {
            return r.call(null, t, 0)
          } catch (e) {
            return r.call(this, t, 0)
          }
        }
      }
      var o, h = [],
        l = !1,
        p = -1;

      function c() {
        l && o && (l = !1, o.length ? h = o.concat(h) : p = -1, h.length) && f()
      }

      function f() {
        if (!l) {
          for (var t = a(c), e = (l = !0, h.length); e;) {
            for (o = h, h = []; ++p < e;) o && o[p].run();
            p = -1, e = h.length
          }
          o = null, l = !1,
            function(t) {
              if (i === clearTimeout) return clearTimeout(t);
              if ((i === s || !i) && clearTimeout) return (i = clearTimeout)(t);
              try {
                i(t)
              } catch (e) {
                try {
                  return i.call(null, t)
                } catch (e) {
                  return i.call(this, t)
                }
              }
            }(t)
        }
      }

      function u(t, e) {
        this.fun = t, this.array = e
      }

      function m() {}
      t.nextTick = function(t) {
        var e = new Array(arguments.length - 1);
        if (1 < arguments.length)
          for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
        h.push(new u(t, e)), 1 !== h.length || l || a(f)
      }, u.prototype.run = function() {
        this.fun.apply(null, this.array)
      }, t.title = "browser", t.browser = !0, t.env = {}, t.argv = [], t.version = "", t.versions = {}, t.on = m, t.addListener = m, t.once = m, t.off = m, t.removeListener = m, t.removeAllListeners = m, t.emit = m, t.prependListener = m, t.prependOnceListener = m, t.listeners = function(t) {
        return []
      }, t.binding = function(t) {
        throw new Error("process.binding is not supported")
      }, t.cwd = function() {
        return "/"
      }, t.chdir = function(t) {
        throw new Error("process.chdir is not supported")
      }, t.umask = function() {
        return 0
      }
    },
    95: function(t, e) {
      t.exports = function(t) {
        return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
          enumerable: !0,
          get: function() {
            return t.l
          }
        }), Object.defineProperty(t, "id", {
          enumerable: !0,
          get: function() {
            return t.i
          }
        }), t.webpackPolyfill = 1), t
      }
    }
  }
]);