!(function (n, e) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = e()
    else if ("function" == typeof define && define.amd) define([], e)
    else {
        var t = e()
        for (var r in t) ("object" == typeof exports ? exports : n)[r] = t[r]
    }
})(this, () =>
    (() => {
        "use strict"
        var n = {
                614: (n, e, t) => {
                    var r = t(27)
                    onmessage = async ({ data: { module: n, memory: e, receiver: t } }) => {
                        await (0, r.Ay)(n, e), postMessage(!0), (0, r.$U)(t)
                    }
                },
                27: (n, e, t) => {
                    let r, _
                    t.d(e, { Ay: () => q, $U: () => M }), (n = t.hmd(n))
                    const o = new Array(128).fill(void 0)
                    function c(n) {
                        return o[n]
                    }
                    o.push(void 0, null, !0, !1)
                    let i = o.length
                    function b(n) {
                        const e = c(n)
                        return (
                            (function (n) {
                                n < 132 || ((o[n] = i), (i = n))
                            })(n),
                            e
                        )
                    }
                    const u =
                        "undefined" != typeof TextDecoder
                            ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 })
                            : {
                                  decode: () => {
                                      throw Error("TextDecoder not available")
                                  }
                              }
                    "undefined" != typeof TextDecoder && u.decode()
                    let f = null
                    function a() {
                        return (null !== f && f.buffer === _.memory.buffer) || (f = new Uint8Array(_.memory.buffer)), f
                    }
                    function w(n, e) {
                        return (n >>>= 0), u.decode(a().slice(n, n + e))
                    }
                    function g(n) {
                        i === o.length && o.push(o.length + 1)
                        const e = i
                        return (i = o[e]), (o[e] = n), e
                    }
                    let s = 0
                    const d =
                            "undefined" != typeof TextEncoder
                                ? new TextEncoder("utf-8")
                                : {
                                      encode: () => {
                                          throw Error("TextEncoder not available")
                                      }
                                  },
                        l = function (n, e) {
                            const t = d.encode(n)
                            return e.set(t), { read: n.length, written: t.length }
                        }
                    function y(n, e, t) {
                        if (void 0 === t) {
                            const t = d.encode(n),
                                r = e(t.length, 1) >>> 0
                            return (
                                a()
                                    .subarray(r, r + t.length)
                                    .set(t),
                                (s = t.length),
                                r
                            )
                        }
                        let r = n.length,
                            _ = e(r, 1) >>> 0
                        const o = a()
                        let c = 0
                        for (; c < r; c++) {
                            const e = n.charCodeAt(c)
                            if (e > 127) break
                            o[_ + c] = e
                        }
                        if (c !== r) {
                            0 !== c && (n = n.slice(c)), (_ = t(_, r, (r = c + 3 * n.length), 1) >>> 0)
                            const e = a().subarray(_ + c, _ + r)
                            ;(c += l(n, e).written), (_ = t(_, r, c, 1) >>> 0)
                        }
                        return (s = c), _
                    }
                    function m(n) {
                        return null == n
                    }
                    let p = null
                    function h() {
                        return (null !== p && p.buffer === _.memory.buffer) || (p = new Int32Array(_.memory.buffer)), p
                    }
                    let v = null,
                        A = null
                    function x(n) {
                        const e = typeof n
                        if ("number" == e || "boolean" == e || null == n) return `${n}`
                        if ("string" == e) return `"${n}"`
                        if ("symbol" == e) {
                            const e = n.description
                            return null == e ? "Symbol" : `Symbol(${e})`
                        }
                        if ("function" == e) {
                            const e = n.name
                            return "string" == typeof e && e.length > 0 ? `Function(${e})` : "Function"
                        }
                        if (Array.isArray(n)) {
                            const e = n.length
                            let t = "["
                            e > 0 && (t += x(n[0]))
                            for (let r = 1; r < e; r++) t += ", " + x(n[r])
                            return (t += "]"), t
                        }
                        const t = /\[object ([^\]]+)\]/.exec(toString.call(n))
                        let r
                        if (!(t.length > 1)) return toString.call(n)
                        if (((r = t[1]), "Object" == r))
                            try {
                                return "Object(" + JSON.stringify(n) + ")"
                            } catch (n) {
                                return "Object"
                            }
                        return n instanceof Error ? `${n.name}: ${n.message}\n${n.stack}` : r
                    }
                    const j =
                        "undefined" == typeof FinalizationRegistry
                            ? { register: () => {}, unregister: () => {} }
                            : new FinalizationRegistry((n) => {
                                  _.__wbindgen_export_3.get(n.dtor)(n.a, n.b)
                              })
                    function k(n, e, t, r) {
                        const o = { a: n, b: e, cnt: 1, dtor: t },
                            c = (...n) => {
                                o.cnt++
                                const e = o.a
                                o.a = 0
                                try {
                                    return r(e, o.b, ...n)
                                } finally {
                                    0 == --o.cnt
                                        ? (_.__wbindgen_export_3.get(o.dtor)(e, o.b), j.unregister(o))
                                        : (o.a = e)
                                }
                            }
                        return (c.original = o), j.register(c, o, o), c
                    }
                    function T(n, e) {
                        _.wasm_bindgen__convert__closures__invoke0_mut__h64248e01eb7fd659(n, e)
                    }
                    function R(n, e, t) {
                        _.wasm_bindgen__convert__closures__invoke1_mut__h14209d945b4d6c8d(n, e, g(t))
                    }
                    function S(n, e, t) {
                        _._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd9680683721ff29c(
                            n,
                            e,
                            g(t)
                        )
                    }
                    function O(n, e) {
                        try {
                            return n.apply(this, e)
                        } catch (n) {
                            _.__wbindgen_exn_store(g(n))
                        }
                    }
                    function M(n) {
                        _.wbg_rayon_start_worker(n)
                    }
                    const W =
                        "undefined" == typeof FinalizationRegistry
                            ? { register: () => {}, unregister: () => {} }
                            : new FinalizationRegistry((n) => _.__wbg_wbg_rayon_poolbuilder_free(n >>> 0))
                    class E {
                        static __wrap(n) {
                            n >>>= 0
                            const e = Object.create(E.prototype)
                            return (e.__wbg_ptr = n), W.register(e, e.__wbg_ptr, e), e
                        }
                        __destroy_into_raw() {
                            const n = this.__wbg_ptr
                            return (this.__wbg_ptr = 0), W.unregister(this), n
                        }
                        free() {
                            const n = this.__destroy_into_raw()
                            _.__wbg_wbg_rayon_poolbuilder_free(n)
                        }
                        numThreads() {
                            return _.wbg_rayon_poolbuilder_numThreads(this.__wbg_ptr) >>> 0
                        }
                        receiver() {
                            return _.wbg_rayon_poolbuilder_receiver(this.__wbg_ptr) >>> 0
                        }
                        build() {
                            _.wbg_rayon_poolbuilder_build(this.__wbg_ptr)
                        }
                    }
                    function U() {
                        const e = { wbg: {} }
                        return (
                            (e.wbg.__wbindgen_cb_drop = function (n) {
                                const e = b(n).original
                                return 1 == e.cnt-- && ((e.a = 0), !0)
                            }),
                            (e.wbg.__wbindgen_string_new = function (n, e) {
                                return g(w(n, e))
                            }),
                            (e.wbg.__wbindgen_string_get = function (n, e) {
                                const t = c(e),
                                    r = "string" == typeof t ? t : void 0
                                var o = m(r) ? 0 : y(r, _.__wbindgen_malloc, _.__wbindgen_realloc),
                                    i = s
                                ;(h()[n / 4 + 1] = i), (h()[n / 4 + 0] = o)
                            }),
                            (e.wbg.__wbindgen_object_drop_ref = function (n) {
                                b(n)
                            }),
                            (e.wbg.__wbindgen_is_undefined = function (n) {
                                return void 0 === c(n)
                            }),
                            (e.wbg.__wbindgen_in = function (n, e) {
                                return c(n) in c(e)
                            }),
                            (e.wbg.__wbindgen_is_bigint = function (n) {
                                return "bigint" == typeof c(n)
                            }),
                            (e.wbg.__wbindgen_bigint_from_u64 = function (n) {
                                return g(BigInt.asUintN(64, n))
                            }),
                            (e.wbg.__wbindgen_jsval_eq = function (n, e) {
                                return c(n) === c(e)
                            }),
                            (e.wbg.__wbindgen_is_object = function (n) {
                                const e = c(n)
                                return "object" == typeof e && null !== e
                            }),
                            (e.wbg.__wbindgen_error_new = function (n, e) {
                                return g(new Error(w(n, e)))
                            }),
                            (e.wbg.__wbindgen_number_new = function (n) {
                                return g(n)
                            }),
                            (e.wbg.__wbindgen_object_clone_ref = function (n) {
                                return g(c(n))
                            }),
                            (e.wbg.__wbindgen_jsval_loose_eq = function (n, e) {
                                return c(n) == c(e)
                            }),
                            (e.wbg.__wbindgen_boolean_get = function (n) {
                                const e = c(n)
                                return "boolean" == typeof e ? (e ? 1 : 0) : 2
                            }),
                            (e.wbg.__wbindgen_number_get = function (n, e) {
                                const t = c(e),
                                    r = "number" == typeof t ? t : void 0
                                ;(((null !== v && v.buffer === _.memory.buffer) ||
                                    (v = new Float64Array(_.memory.buffer)),
                                v)[n / 8 + 1] = m(r) ? 0 : r),
                                    (h()[n / 4 + 0] = !m(r))
                            }),
                            (e.wbg.__wbindgen_as_number = function (n) {
                                return +c(n)
                            }),
                            (e.wbg.__wbg_getwithrefkey_edc2c8960f0f1191 = function (n, e) {
                                return g(c(n)[c(e)])
                            }),
                            (e.wbg.__wbg_mark_6045ef1772587264 = function () {
                                return O(function (n, e, t) {
                                    c(n).mark(w(e, t))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_mark_bad820680b8580c2 = function () {
                                return O(function (n, e, t, r) {
                                    c(n).mark(w(e, t), c(r))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_measure_1d846b814d43d7e1 = function () {
                                return O(function (n, e, t, r, _, o, i) {
                                    c(n).measure(w(e, t), w(r, _), w(o, i))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_measure_7ca0e5cfef892340 = function () {
                                return O(function (n, e, t, r) {
                                    c(n).measure(w(e, t), c(r))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_performance_72f95fe5952939b5 = function () {
                                return g(globalThis.performance)
                            }),
                            (e.wbg.__wbindgen_is_string = function (n) {
                                return "string" == typeof c(n)
                            }),
                            (e.wbg.__wbg_performance_a1b8bde2ee512264 = function (n) {
                                return g(c(n).performance)
                            }),
                            (e.wbg.__wbg_timeOrigin_5c8b9e35719de799 = function (n) {
                                return c(n).timeOrigin
                            }),
                            (e.wbg.__wbg_now_abd80e969af37148 = function (n) {
                                return c(n).now()
                            }),
                            (e.wbg.__wbg_waitAsync_5d743fc9058ba01a = function () {
                                return g(Atomics.waitAsync)
                            }),
                            (e.wbg.__wbg_waitAsync_46d5c36955b71a79 = function (n, e, t) {
                                return g(Atomics.waitAsync(c(n), e, t))
                            }),
                            (e.wbg.__wbg_async_19c0400d97cc72fe = function (n) {
                                return c(n).async
                            }),
                            (e.wbg.__wbg_value_571d60108110e917 = function (n) {
                                return g(c(n).value)
                            }),
                            (e.wbg.__wbindgen_link_fc1eedd35dc7e0a6 = function (n) {
                                const e = y(
                                        "data:application/javascript," +
                                            encodeURIComponent(
                                                "onmessage = function (ev) {\n            let [ia, index, value] = ev.data;\n            ia = new Int32Array(ia.buffer);\n            let result = Atomics.wait(ia, index, value);\n            postMessage(result);\n        };\n        "
                                            ),
                                        _.__wbindgen_malloc,
                                        _.__wbindgen_realloc
                                    ),
                                    t = s
                                ;(h()[n / 4 + 1] = t), (h()[n / 4 + 0] = e)
                            }),
                            (e.wbg.__wbg_queueMicrotask_481971b0d87f3dd4 = function (n) {
                                queueMicrotask(c(n))
                            }),
                            (e.wbg.__wbg_queueMicrotask_3cbae2ec6b6cd3d6 = function (n) {
                                return g(c(n).queueMicrotask)
                            }),
                            (e.wbg.__wbindgen_is_function = function (n) {
                                return "function" == typeof c(n)
                            }),
                            (e.wbg.__wbg_crypto_1d1f22824a6a080c = function (n) {
                                return g(c(n).crypto)
                            }),
                            (e.wbg.__wbg_process_4a72847cc503995b = function (n) {
                                return g(c(n).process)
                            }),
                            (e.wbg.__wbg_versions_f686565e586dd935 = function (n) {
                                return g(c(n).versions)
                            }),
                            (e.wbg.__wbg_node_104a2ff8d6ea03a2 = function (n) {
                                return g(c(n).node)
                            }),
                            (e.wbg.__wbg_require_cca90b1a94a0255b = function () {
                                return O(function () {
                                    return g(n.require)
                                }, arguments)
                            }),
                            (e.wbg.__wbg_msCrypto_eb05e62b530a1508 = function (n) {
                                return g(c(n).msCrypto)
                            }),
                            (e.wbg.__wbg_randomFillSync_5c9c955aa56b6049 = function () {
                                return O(function (n, e) {
                                    c(n).randomFillSync(b(e))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_getRandomValues_3aa56aa6edec874c = function () {
                                return O(function (n, e) {
                                    c(n).getRandomValues(c(e))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_instanceof_Window_f401953a2cf86220 = function (n) {
                                let e
                                try {
                                    e = c(n) instanceof Window
                                } catch (n) {
                                    e = !1
                                }
                                return e
                            }),
                            (e.wbg.__wbg_fetch_c4b6afebdb1f918e = function (n, e) {
                                return g(c(n).fetch(c(e)))
                            }),
                            (e.wbg.__wbg_debug_5fb96680aecf5dc8 = function (n) {
                                console.debug(c(n))
                            }),
                            (e.wbg.__wbg_debug_7d879afce6cf56cb = function (n, e, t, r) {
                                console.debug(c(n), c(e), c(t), c(r))
                            }),
                            (e.wbg.__wbg_error_8e3928cfb8a43e2b = function (n) {
                                console.error(c(n))
                            }),
                            (e.wbg.__wbg_error_696630710900ec44 = function (n, e, t, r) {
                                console.error(c(n), c(e), c(t), c(r))
                            }),
                            (e.wbg.__wbg_info_530a29cb2e4e3304 = function (n) {
                                console.info(c(n))
                            }),
                            (e.wbg.__wbg_info_80803d9a3f0aad16 = function (n, e, t, r) {
                                console.info(c(n), c(e), c(t), c(r))
                            }),
                            (e.wbg.__wbg_warn_63bbae1730aead09 = function (n) {
                                console.warn(c(n))
                            }),
                            (e.wbg.__wbg_warn_5d3f783b0bae8943 = function (n, e, t, r) {
                                console.warn(c(n), c(e), c(t), c(r))
                            }),
                            (e.wbg.__wbg_instanceof_Blob_83ad3dd4c9c406f0 = function (n) {
                                let e
                                try {
                                    e = c(n) instanceof Blob
                                } catch (n) {
                                    e = !1
                                }
                                return e
                            }),
                            (e.wbg.__wbg_data_3ce7c145ca4fbcdc = function (n) {
                                return g(c(n).data)
                            }),
                            (e.wbg.__wbg_newwithstrandinit_3fd6fba4083ff2d0 = function () {
                                return O(function (n, e, t) {
                                    return g(new Request(w(n, e), c(t)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_instanceof_Response_849eb93e75734b6e = function (n) {
                                let e
                                try {
                                    e = c(n) instanceof Response
                                } catch (n) {
                                    e = !1
                                }
                                return e
                            }),
                            (e.wbg.__wbg_json_1d5f113e916d8675 = function () {
                                return O(function (n) {
                                    return g(c(n).json())
                                }, arguments)
                            }),
                            (e.wbg.__wbg_wasClean_8222e9acf5c5ad07 = function (n) {
                                return c(n).wasClean
                            }),
                            (e.wbg.__wbg_code_5ee5dcc2842228cd = function (n) {
                                return c(n).code
                            }),
                            (e.wbg.__wbg_reason_5ed6709323849cb1 = function (n, e) {
                                const t = y(c(e).reason, _.__wbindgen_malloc, _.__wbindgen_realloc),
                                    r = s
                                ;(h()[n / 4 + 1] = r), (h()[n / 4 + 0] = t)
                            }),
                            (e.wbg.__wbg_code_bddcff79610894cf = function (n) {
                                return c(n).code
                            }),
                            (e.wbg.__wbg_new_ab6fd82b10560829 = function () {
                                return O(function () {
                                    return g(new Headers())
                                }, arguments)
                            }),
                            (e.wbg.__wbg_append_7bfcb4937d1d5e29 = function () {
                                return O(function (n, e, t, r, _) {
                                    c(n).append(w(e, t), w(r, _))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_setonmessage_503809e5bb51bd33 = function (n, e) {
                                c(n).onmessage = c(e)
                            }),
                            (e.wbg.__wbg_new_d1187ae36d662ef9 = function () {
                                return O(function (n, e) {
                                    return g(new Worker(w(n, e)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_postMessage_7380d10e8b8269df = function () {
                                return O(function (n, e) {
                                    c(n).postMessage(c(e))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_url_1ac02c9add50c527 = function (n, e) {
                                const t = y(c(e).url, _.__wbindgen_malloc, _.__wbindgen_realloc),
                                    r = s
                                ;(h()[n / 4 + 1] = r), (h()[n / 4 + 0] = t)
                            }),
                            (e.wbg.__wbg_readyState_1c157e4ea17c134a = function (n) {
                                return c(n).readyState
                            }),
                            (e.wbg.__wbg_setonopen_ce7a4c51e5cf5788 = function (n, e) {
                                c(n).onopen = c(e)
                            }),
                            (e.wbg.__wbg_setonerror_39a785302b0cd2e9 = function (n, e) {
                                c(n).onerror = c(e)
                            }),
                            (e.wbg.__wbg_setonclose_b9929b1c1624dff3 = function (n, e) {
                                c(n).onclose = c(e)
                            }),
                            (e.wbg.__wbg_setonmessage_2af154ce83a3dc94 = function (n, e) {
                                c(n).onmessage = c(e)
                            }),
                            (e.wbg.__wbg_setbinaryType_b0cf5103cd561959 = function (n, e) {
                                c(n).binaryType = b(e)
                            }),
                            (e.wbg.__wbg_new_6c74223c77cfabad = function () {
                                return O(function (n, e) {
                                    return g(new WebSocket(w(n, e)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_newwithstrsequence_9bc178264d955680 = function () {
                                return O(function (n, e, t) {
                                    return g(new WebSocket(w(n, e), c(t)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_close_acd9532ff5c093ea = function () {
                                return O(function (n) {
                                    c(n).close()
                                }, arguments)
                            }),
                            (e.wbg.__wbg_send_70603dff16b81b66 = function () {
                                return O(function (n, e, t) {
                                    c(n).send(w(e, t))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_send_d095a7ab85cfc836 = function () {
                                return O(function (n, e) {
                                    c(n).send(c(e))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_length_cd7af8117672b8b8 = function (n) {
                                return c(n).length
                            }),
                            (e.wbg.__wbg_new_16b304a2cfa7ff4a = function () {
                                return g(new Array())
                            }),
                            (e.wbg.__wbg_newnoargs_e258087cd0daa0ea = function (n, e) {
                                return g(new Function(w(n, e)))
                            }),
                            (e.wbg.__wbg_next_40fc327bfc8770e6 = function (n) {
                                return g(c(n).next)
                            }),
                            (e.wbg.__wbg_value_d93c65011f51a456 = function (n) {
                                return g(c(n).value)
                            }),
                            (e.wbg.__wbg_iterator_2cee6dadfd956dfa = function () {
                                return g(Symbol.iterator)
                            }),
                            (e.wbg.__wbg_new_72fb9a18b5ae2624 = function () {
                                return g(new Object())
                            }),
                            (e.wbg.__wbg_self_ce0dbfc45cf2f5be = function () {
                                return O(function () {
                                    return g(self.self)
                                }, arguments)
                            }),
                            (e.wbg.__wbg_window_c6fb939a7f436783 = function () {
                                return O(function () {
                                    return g(window.window)
                                }, arguments)
                            }),
                            (e.wbg.__wbg_globalThis_d1e6af4856ba331b = function () {
                                return O(function () {
                                    return g(globalThis.globalThis)
                                }, arguments)
                            }),
                            (e.wbg.__wbg_global_207b558942527489 = function () {
                                return O(function () {
                                    return g(t.g.global)
                                }, arguments)
                            }),
                            (e.wbg.__wbg_get_bd8e338fbd5f5cc8 = function (n, e) {
                                return g(c(n)[e >>> 0])
                            }),
                            (e.wbg.__wbg_from_89e3fc3ba5e6fb48 = function (n) {
                                return g(Array.from(c(n)))
                            }),
                            (e.wbg.__wbg_of_6a70eed8d41f469c = function (n, e, t) {
                                return g(Array.of(c(n), c(e), c(t)))
                            }),
                            (e.wbg.__wbg_push_a5b05aedc7234f9f = function (n, e) {
                                return c(n).push(c(e))
                            }),
                            (e.wbg.__wbg_instanceof_ArrayBuffer_836825be07d4c9d2 = function (n) {
                                let e
                                try {
                                    e = c(n) instanceof ArrayBuffer
                                } catch (n) {
                                    e = !1
                                }
                                return e
                            }),
                            (e.wbg.__wbg_new_132e2fd5dfe036c3 = function (n) {
                                return g(new ArrayBuffer(n >>> 0))
                            }),
                            (e.wbg.__wbg_call_27c0f87801dedf93 = function () {
                                return O(function (n, e) {
                                    return g(c(n).call(c(e)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_call_b3ca7c6051f9bec1 = function () {
                                return O(function (n, e, t) {
                                    return g(c(n).call(c(e), c(t)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_next_196c84450b364254 = function () {
                                return O(function (n) {
                                    return g(c(n).next())
                                }, arguments)
                            }),
                            (e.wbg.__wbg_done_298b57d23c0fc80c = function (n) {
                                return c(n).done
                            }),
                            (e.wbg.__wbg_isSafeInteger_f7b04ef02296c4d2 = function (n) {
                                return Number.isSafeInteger(c(n))
                            }),
                            (e.wbg.__wbg_getTime_2bc4375165f02d15 = function (n) {
                                return c(n).getTime()
                            }),
                            (e.wbg.__wbg_new0_7d84e5b2cd9fdc73 = function () {
                                return g(new Date())
                            }),
                            (e.wbg.__wbg_now_3014639a94423537 = function () {
                                return Date.now()
                            }),
                            (e.wbg.__wbg_create_a4affbe2b1332881 = function (n) {
                                return g(Object.create(c(n)))
                            }),
                            (e.wbg.__wbg_entries_95cc2c823b285a09 = function (n) {
                                return g(Object.entries(c(n)))
                            }),
                            (e.wbg.__wbg_new_81740750da40724f = function (n, e) {
                                try {
                                    var t = { a: n, b: e }
                                    const r = new Promise((n, e) => {
                                        const r = t.a
                                        t.a = 0
                                        try {
                                            return (function (n, e, t, r) {
                                                _.wasm_bindgen__convert__closures__invoke2_mut__h07ddf46b15c83536(
                                                    n,
                                                    e,
                                                    g(t),
                                                    g(r)
                                                )
                                            })(r, t.b, n, e)
                                        } finally {
                                            t.a = r
                                        }
                                    })
                                    return g(r)
                                } finally {
                                    t.a = t.b = 0
                                }
                            }),
                            (e.wbg.__wbg_resolve_b0083a7967828ec8 = function (n) {
                                return g(Promise.resolve(c(n)))
                            }),
                            (e.wbg.__wbg_then_0c86a60e8fcfe9f6 = function (n, e) {
                                return g(c(n).then(c(e)))
                            }),
                            (e.wbg.__wbg_then_a73caa9a87991566 = function (n, e, t) {
                                return g(c(n).then(c(e), c(t)))
                            }),
                            (e.wbg.__wbg_buffer_12d079cc21e14bdb = function (n) {
                                return g(c(n).buffer)
                            }),
                            (e.wbg.__wbg_new_8cccba86b0f574cb = function (n) {
                                return g(new Int32Array(c(n)))
                            }),
                            (e.wbg.__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb = function (n, e, t) {
                                return g(new Uint8Array(c(n), e >>> 0, t >>> 0))
                            }),
                            (e.wbg.__wbg_new_63b92bc8671ed464 = function (n) {
                                return g(new Uint8Array(c(n)))
                            }),
                            (e.wbg.__wbg_instanceof_Uint8Array_2b3bbecd033d19f6 = function (n) {
                                let e
                                try {
                                    e = c(n) instanceof Uint8Array
                                } catch (n) {
                                    e = !1
                                }
                                return e
                            }),
                            (e.wbg.__wbg_newwithlength_e9b4878cebadb3d3 = function (n) {
                                return g(new Uint8Array(n >>> 0))
                            }),
                            (e.wbg.__wbg_subarray_a1f73cd4b5b42fe1 = function (n, e, t) {
                                return g(c(n).subarray(e >>> 0, t >>> 0))
                            }),
                            (e.wbg.__wbg_length_c20a40f15020d68a = function (n) {
                                return c(n).length
                            }),
                            (e.wbg.__wbg_set_a47bac70306a19a7 = function (n, e, t) {
                                c(n).set(c(e), t >>> 0)
                            }),
                            (e.wbg.__wbg_stringify_8887fe74e1c50d81 = function () {
                                return O(function (n) {
                                    return g(JSON.stringify(c(n)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_get_e3c254076557e348 = function () {
                                return O(function (n, e) {
                                    return g(Reflect.get(c(n), c(e)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_set_1f9b04f170055d33 = function () {
                                return O(function (n, e, t) {
                                    return Reflect.set(c(n), c(e), c(t))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_new_abda76e883ba8a5f = function () {
                                return g(new Error())
                            }),
                            (e.wbg.__wbg_stack_658279fe44541cf6 = function (n, e) {
                                const t = y(c(e).stack, _.__wbindgen_malloc, _.__wbindgen_realloc),
                                    r = s
                                ;(h()[n / 4 + 1] = r), (h()[n / 4 + 0] = t)
                            }),
                            (e.wbg.__wbg_error_f851667af71bcfc6 = function (n, e) {
                                let t, r
                                try {
                                    ;(t = n), (r = e), console.error(w(n, e))
                                } finally {
                                    _.__wbindgen_free(t, r, 1)
                                }
                            }),
                            (e.wbg.__wbindgen_bigint_get_as_i64 = function (n, e) {
                                const t = c(e),
                                    r = "bigint" == typeof t ? t : void 0
                                ;(((null !== A && A.buffer === _.memory.buffer) ||
                                    (A = new BigInt64Array(_.memory.buffer)),
                                A)[n / 8 + 1] = m(r) ? BigInt(0) : r),
                                    (h()[n / 4 + 0] = !m(r))
                            }),
                            (e.wbg.__wbindgen_debug_string = function (n, e) {
                                const t = y(x(c(e)), _.__wbindgen_malloc, _.__wbindgen_realloc),
                                    r = s
                                ;(h()[n / 4 + 1] = r), (h()[n / 4 + 0] = t)
                            }),
                            (e.wbg.__wbindgen_throw = function (n, e) {
                                throw new Error(w(n, e))
                            }),
                            (e.wbg.__wbindgen_rethrow = function (n) {
                                throw b(n)
                            }),
                            (e.wbg.__wbindgen_module = function () {
                                return g(F.__wbindgen_wasm_module)
                            }),
                            (e.wbg.__wbindgen_memory = function () {
                                return g(_.memory)
                            }),
                            (e.wbg.__wbg_startWorkers_2ee336a9694dda13 = function (n, e, _) {
                                const o = (async function (n, e, _) {
                                    if (0 === _.numThreads()) throw new Error("num_threads must be > 0.")
                                    const o = { module: n, memory: e, receiver: _.receiver() }
                                    ;(r = await Promise.all(
                                        Array.from({ length: _.numThreads() }, async () => {
                                            const n = new Worker(new URL(t.p + t.u(27), t.b), { type: void 0 })
                                            return (
                                                n.postMessage(o),
                                                await new Promise((e) =>
                                                    n.addEventListener("message", e, { once: !0 })
                                                ),
                                                n
                                            )
                                        })
                                    )),
                                        _.build()
                                })(b(n), b(e), E.__wrap(_))
                                return g(o)
                            }),
                            (e.wbg.__wbindgen_closure_wrapper1037 = function (n, e, t) {
                                return g(k(n, e, 884, T))
                            }),
                            (e.wbg.__wbindgen_closure_wrapper1039 = function (n, e, t) {
                                return g(k(n, e, 884, R))
                            }),
                            (e.wbg.__wbindgen_closure_wrapper13769 = function (n, e, t) {
                                return g(k(n, e, 2675, S))
                            }),
                            (e.wbg.__wbindgen_closure_wrapper13771 = function (n, e, t) {
                                return g(k(n, e, 2675, S))
                            }),
                            e
                        )
                    }
                    async function F(n, e) {
                        if (void 0 !== _) return _
                        void 0 === n && (n = new URL(t(439), t.b))
                        const r = U()
                        ;("string" == typeof n ||
                            ("function" == typeof Request && n instanceof Request) ||
                            ("function" == typeof URL && n instanceof URL)) &&
                            (n = fetch(n)),
                            (function (n, e) {
                                n.wbg.memory = e || new WebAssembly.Memory({ initial: 113, maximum: 16384, shared: !0 })
                            })(r, e)
                        const { instance: o, module: c } = await (async function (n, e) {
                            if ("function" == typeof Response && n instanceof Response) {
                                if ("function" == typeof WebAssembly.instantiateStreaming)
                                    try {
                                        return await WebAssembly.instantiateStreaming(n, e)
                                    } catch (e) {
                                        if ("application/wasm" == n.headers.get("Content-Type")) throw e
                                        console.warn(
                                            "`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
                                            e
                                        )
                                    }
                                const t = await n.arrayBuffer()
                                return await WebAssembly.instantiate(t, e)
                            }
                            {
                                const t = await WebAssembly.instantiate(n, e)
                                return t instanceof WebAssembly.Instance ? { instance: t, module: n } : t
                            }
                        })(await n, r)
                        return (function (n, e) {
                            return (
                                (_ = n.exports),
                                (F.__wbindgen_wasm_module = e),
                                (A = null),
                                (v = null),
                                (p = null),
                                (f = null),
                                _.__wbindgen_start(),
                                _
                            )
                        })(o, c)
                    }
                    const q = F
                },
                439: (n, e, t) => {
                    n.exports = t.p + "fc11293cc7662b1170f9.wasm"
                }
            },
            e = {}
        function t(r) {
            var _ = e[r]
            if (void 0 !== _) return _.exports
            var o = (e[r] = { id: r, loaded: !1, exports: {} })
            return n[r](o, o.exports, t), (o.loaded = !0), o.exports
        }
        return (
            (t.m = n),
            (t.d = (n, e) => {
                for (var r in e) t.o(e, r) && !t.o(n, r) && Object.defineProperty(n, r, { enumerable: !0, get: e[r] })
            }),
            (t.u = (n) => n + ".js"),
            (t.g = (function () {
                if ("object" == typeof globalThis) return globalThis
                try {
                    return this || new Function("return this")()
                } catch (n) {
                    if ("object" == typeof window) return window
                }
            })()),
            (t.hmd = (n) => (
                (n = Object.create(n)).children || (n.children = []),
                Object.defineProperty(n, "exports", {
                    enumerable: !0,
                    set: () => {
                        throw new Error(
                            "ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " +
                                n.id
                        )
                    }
                }),
                n
            )),
            (t.o = (n, e) => Object.prototype.hasOwnProperty.call(n, e)),
            (t.p = ""),
            (t.b = self.location + ""),
            t(614)
        )
    })()
)
//# sourceMappingURL=27.js.map
