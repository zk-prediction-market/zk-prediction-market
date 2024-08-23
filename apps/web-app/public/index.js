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
                27: (n, e, t) => {
                    let r, o
                    t.d(e, { Ay: () => B, Fs: () => E, t2: () => R, ep: () => P, MX: () => U }), (n = t.hmd(n))
                    const i = new Array(128).fill(void 0)
                    function _(n) {
                        return i[n]
                    }
                    i.push(void 0, null, !0, !1)
                    let c = i.length
                    function u(n) {
                        const e = _(n)
                        return (
                            (function (n) {
                                n < 132 || ((i[n] = c), (c = n))
                            })(n),
                            e
                        )
                    }
                    const a =
                        "undefined" != typeof TextDecoder
                            ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 })
                            : {
                                  decode: () => {
                                      throw Error("TextDecoder not available")
                                  }
                              }
                    "undefined" != typeof TextDecoder && a.decode()
                    let b = null
                    function f() {
                        return (null !== b && b.buffer === o.memory.buffer) || (b = new Uint8Array(o.memory.buffer)), b
                    }
                    function s(n, e) {
                        return (n >>>= 0), a.decode(f().slice(n, n + e))
                    }
                    function w(n) {
                        c === i.length && i.push(i.length + 1)
                        const e = c
                        return (c = i[e]), (i[e] = n), e
                    }
                    let g = 0
                    const l =
                            "undefined" != typeof TextEncoder
                                ? new TextEncoder("utf-8")
                                : {
                                      encode: () => {
                                          throw Error("TextEncoder not available")
                                      }
                                  },
                        d = function (n, e) {
                            const t = l.encode(n)
                            return e.set(t), { read: n.length, written: t.length }
                        }
                    function y(n, e, t) {
                        if (void 0 === t) {
                            const t = l.encode(n),
                                r = e(t.length, 1) >>> 0
                            return (
                                f()
                                    .subarray(r, r + t.length)
                                    .set(t),
                                (g = t.length),
                                r
                            )
                        }
                        let r = n.length,
                            o = e(r, 1) >>> 0
                        const i = f()
                        let _ = 0
                        for (; _ < r; _++) {
                            const e = n.charCodeAt(_)
                            if (e > 127) break
                            i[o + _] = e
                        }
                        if (_ !== r) {
                            0 !== _ && (n = n.slice(_)), (o = t(o, r, (r = _ + 3 * n.length), 1) >>> 0)
                            const e = f().subarray(o + _, o + r)
                            ;(_ += d(n, e).written), (o = t(o, r, _, 1) >>> 0)
                        }
                        return (g = _), o
                    }
                    function p(n) {
                        return null == n
                    }
                    let h = null
                    function m() {
                        return (null !== h && h.buffer === o.memory.buffer) || (h = new Int32Array(o.memory.buffer)), h
                    }
                    let v = null,
                        x = null
                    function S(n) {
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
                            e > 0 && (t += S(n[0]))
                            for (let r = 1; r < e; r++) t += ", " + S(n[r])
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
                    const A =
                        "undefined" == typeof FinalizationRegistry
                            ? { register: () => {}, unregister: () => {} }
                            : new FinalizationRegistry((n) => {
                                  o.__wbindgen_export_3.get(n.dtor)(n.a, n.b)
                              })
                    function k(n, e, t, r) {
                        const i = { a: n, b: e, cnt: 1, dtor: t },
                            _ = (...n) => {
                                i.cnt++
                                const e = i.a
                                i.a = 0
                                try {
                                    return r(e, i.b, ...n)
                                } finally {
                                    0 == --i.cnt
                                        ? (o.__wbindgen_export_3.get(i.dtor)(e, i.b), A.unregister(i))
                                        : (i.a = e)
                                }
                            }
                        return (_.original = i), A.register(_, i, i), _
                    }
                    function j(n, e) {
                        o.wasm_bindgen__convert__closures__invoke0_mut__h64248e01eb7fd659(n, e)
                    }
                    function O(n, e, t) {
                        o.wasm_bindgen__convert__closures__invoke1_mut__h14209d945b4d6c8d(n, e, w(t))
                    }
                    function T(n, e, t) {
                        o._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd9680683721ff29c(
                            n,
                            e,
                            w(t)
                        )
                    }
                    function R(n, e, t, r) {
                        const i = y(n, o.__wbindgen_malloc, o.__wbindgen_realloc),
                            _ = g
                        return u(o.prover(i, _, w(e), w(t), w(r)))
                    }
                    function U(n, e) {
                        const t = y(n, o.__wbindgen_malloc, o.__wbindgen_realloc),
                            r = g,
                            i = y(e, o.__wbindgen_malloc, o.__wbindgen_realloc),
                            _ = g
                        return u(o.verify(t, r, i, _))
                    }
                    function P(n) {
                        const e = y(n, o.__wbindgen_malloc, o.__wbindgen_realloc),
                            t = g
                        o.setup_tracing_web(e, t)
                    }
                    function M(n, e) {
                        try {
                            return n.apply(this, e)
                        } catch (n) {
                            o.__wbindgen_exn_store(w(n))
                        }
                    }
                    function E(n) {
                        return u(o.initThreadPool(n))
                    }
                    const F =
                        "undefined" == typeof FinalizationRegistry
                            ? { register: () => {}, unregister: () => {} }
                            : new FinalizationRegistry((n) => o.__wbg_wbg_rayon_poolbuilder_free(n >>> 0))
                    class W {
                        static __wrap(n) {
                            n >>>= 0
                            const e = Object.create(W.prototype)
                            return (e.__wbg_ptr = n), F.register(e, e.__wbg_ptr, e), e
                        }
                        __destroy_into_raw() {
                            const n = this.__wbg_ptr
                            return (this.__wbg_ptr = 0), F.unregister(this), n
                        }
                        free() {
                            const n = this.__destroy_into_raw()
                            o.__wbg_wbg_rayon_poolbuilder_free(n)
                        }
                        numThreads() {
                            return o.wbg_rayon_poolbuilder_numThreads(this.__wbg_ptr) >>> 0
                        }
                        receiver() {
                            return o.wbg_rayon_poolbuilder_receiver(this.__wbg_ptr) >>> 0
                        }
                        build() {
                            o.wbg_rayon_poolbuilder_build(this.__wbg_ptr)
                        }
                    }
                    function q() {
                        const e = { wbg: {} }
                        return (
                            (e.wbg.__wbindgen_cb_drop = function (n) {
                                const e = u(n).original
                                return 1 == e.cnt-- && ((e.a = 0), !0)
                            }),
                            (e.wbg.__wbindgen_string_new = function (n, e) {
                                return w(s(n, e))
                            }),
                            (e.wbg.__wbindgen_string_get = function (n, e) {
                                const t = _(e),
                                    r = "string" == typeof t ? t : void 0
                                var i = p(r) ? 0 : y(r, o.__wbindgen_malloc, o.__wbindgen_realloc),
                                    c = g
                                ;(m()[n / 4 + 1] = c), (m()[n / 4 + 0] = i)
                            }),
                            (e.wbg.__wbindgen_object_drop_ref = function (n) {
                                u(n)
                            }),
                            (e.wbg.__wbindgen_is_undefined = function (n) {
                                return void 0 === _(n)
                            }),
                            (e.wbg.__wbindgen_in = function (n, e) {
                                return _(n) in _(e)
                            }),
                            (e.wbg.__wbindgen_is_bigint = function (n) {
                                return "bigint" == typeof _(n)
                            }),
                            (e.wbg.__wbindgen_bigint_from_u64 = function (n) {
                                return w(BigInt.asUintN(64, n))
                            }),
                            (e.wbg.__wbindgen_jsval_eq = function (n, e) {
                                return _(n) === _(e)
                            }),
                            (e.wbg.__wbindgen_is_object = function (n) {
                                const e = _(n)
                                return "object" == typeof e && null !== e
                            }),
                            (e.wbg.__wbindgen_error_new = function (n, e) {
                                return w(new Error(s(n, e)))
                            }),
                            (e.wbg.__wbindgen_number_new = function (n) {
                                return w(n)
                            }),
                            (e.wbg.__wbindgen_object_clone_ref = function (n) {
                                return w(_(n))
                            }),
                            (e.wbg.__wbindgen_jsval_loose_eq = function (n, e) {
                                return _(n) == _(e)
                            }),
                            (e.wbg.__wbindgen_boolean_get = function (n) {
                                const e = _(n)
                                return "boolean" == typeof e ? (e ? 1 : 0) : 2
                            }),
                            (e.wbg.__wbindgen_number_get = function (n, e) {
                                const t = _(e),
                                    r = "number" == typeof t ? t : void 0
                                ;(((null !== v && v.buffer === o.memory.buffer) ||
                                    (v = new Float64Array(o.memory.buffer)),
                                v)[n / 8 + 1] = p(r) ? 0 : r),
                                    (m()[n / 4 + 0] = !p(r))
                            }),
                            (e.wbg.__wbindgen_as_number = function (n) {
                                return +_(n)
                            }),
                            (e.wbg.__wbg_getwithrefkey_edc2c8960f0f1191 = function (n, e) {
                                return w(_(n)[_(e)])
                            }),
                            (e.wbg.__wbg_mark_6045ef1772587264 = function () {
                                return M(function (n, e, t) {
                                    _(n).mark(s(e, t))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_mark_bad820680b8580c2 = function () {
                                return M(function (n, e, t, r) {
                                    _(n).mark(s(e, t), _(r))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_measure_1d846b814d43d7e1 = function () {
                                return M(function (n, e, t, r, o, i, c) {
                                    _(n).measure(s(e, t), s(r, o), s(i, c))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_measure_7ca0e5cfef892340 = function () {
                                return M(function (n, e, t, r) {
                                    _(n).measure(s(e, t), _(r))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_performance_72f95fe5952939b5 = function () {
                                return w(globalThis.performance)
                            }),
                            (e.wbg.__wbindgen_is_string = function (n) {
                                return "string" == typeof _(n)
                            }),
                            (e.wbg.__wbg_performance_a1b8bde2ee512264 = function (n) {
                                return w(_(n).performance)
                            }),
                            (e.wbg.__wbg_timeOrigin_5c8b9e35719de799 = function (n) {
                                return _(n).timeOrigin
                            }),
                            (e.wbg.__wbg_now_abd80e969af37148 = function (n) {
                                return _(n).now()
                            }),
                            (e.wbg.__wbg_waitAsync_5d743fc9058ba01a = function () {
                                return w(Atomics.waitAsync)
                            }),
                            (e.wbg.__wbg_waitAsync_46d5c36955b71a79 = function (n, e, t) {
                                return w(Atomics.waitAsync(_(n), e, t))
                            }),
                            (e.wbg.__wbg_async_19c0400d97cc72fe = function (n) {
                                return _(n).async
                            }),
                            (e.wbg.__wbg_value_571d60108110e917 = function (n) {
                                return w(_(n).value)
                            }),
                            (e.wbg.__wbindgen_link_fc1eedd35dc7e0a6 = function (n) {
                                const e = y(
                                        "data:application/javascript," +
                                            encodeURIComponent(
                                                "onmessage = function (ev) {\n            let [ia, index, value] = ev.data;\n            ia = new Int32Array(ia.buffer);\n            let result = Atomics.wait(ia, index, value);\n            postMessage(result);\n        };\n        "
                                            ),
                                        o.__wbindgen_malloc,
                                        o.__wbindgen_realloc
                                    ),
                                    t = g
                                ;(m()[n / 4 + 1] = t), (m()[n / 4 + 0] = e)
                            }),
                            (e.wbg.__wbg_queueMicrotask_481971b0d87f3dd4 = function (n) {
                                queueMicrotask(_(n))
                            }),
                            (e.wbg.__wbg_queueMicrotask_3cbae2ec6b6cd3d6 = function (n) {
                                return w(_(n).queueMicrotask)
                            }),
                            (e.wbg.__wbindgen_is_function = function (n) {
                                return "function" == typeof _(n)
                            }),
                            (e.wbg.__wbg_crypto_1d1f22824a6a080c = function (n) {
                                return w(_(n).crypto)
                            }),
                            (e.wbg.__wbg_process_4a72847cc503995b = function (n) {
                                return w(_(n).process)
                            }),
                            (e.wbg.__wbg_versions_f686565e586dd935 = function (n) {
                                return w(_(n).versions)
                            }),
                            (e.wbg.__wbg_node_104a2ff8d6ea03a2 = function (n) {
                                return w(_(n).node)
                            }),
                            (e.wbg.__wbg_require_cca90b1a94a0255b = function () {
                                return M(function () {
                                    return w(n.require)
                                }, arguments)
                            }),
                            (e.wbg.__wbg_msCrypto_eb05e62b530a1508 = function (n) {
                                return w(_(n).msCrypto)
                            }),
                            (e.wbg.__wbg_randomFillSync_5c9c955aa56b6049 = function () {
                                return M(function (n, e) {
                                    _(n).randomFillSync(u(e))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_getRandomValues_3aa56aa6edec874c = function () {
                                return M(function (n, e) {
                                    _(n).getRandomValues(_(e))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_instanceof_Window_f401953a2cf86220 = function (n) {
                                let e
                                try {
                                    e = _(n) instanceof Window
                                } catch (n) {
                                    e = !1
                                }
                                return e
                            }),
                            (e.wbg.__wbg_fetch_c4b6afebdb1f918e = function (n, e) {
                                return w(_(n).fetch(_(e)))
                            }),
                            (e.wbg.__wbg_debug_5fb96680aecf5dc8 = function (n) {
                                console.debug(_(n))
                            }),
                            (e.wbg.__wbg_debug_7d879afce6cf56cb = function (n, e, t, r) {
                                console.debug(_(n), _(e), _(t), _(r))
                            }),
                            (e.wbg.__wbg_error_8e3928cfb8a43e2b = function (n) {
                                console.error(_(n))
                            }),
                            (e.wbg.__wbg_error_696630710900ec44 = function (n, e, t, r) {
                                console.error(_(n), _(e), _(t), _(r))
                            }),
                            (e.wbg.__wbg_info_530a29cb2e4e3304 = function (n) {
                                console.info(_(n))
                            }),
                            (e.wbg.__wbg_info_80803d9a3f0aad16 = function (n, e, t, r) {
                                console.info(_(n), _(e), _(t), _(r))
                            }),
                            (e.wbg.__wbg_warn_63bbae1730aead09 = function (n) {
                                console.warn(_(n))
                            }),
                            (e.wbg.__wbg_warn_5d3f783b0bae8943 = function (n, e, t, r) {
                                console.warn(_(n), _(e), _(t), _(r))
                            }),
                            (e.wbg.__wbg_instanceof_Blob_83ad3dd4c9c406f0 = function (n) {
                                let e
                                try {
                                    e = _(n) instanceof Blob
                                } catch (n) {
                                    e = !1
                                }
                                return e
                            }),
                            (e.wbg.__wbg_data_3ce7c145ca4fbcdc = function (n) {
                                return w(_(n).data)
                            }),
                            (e.wbg.__wbg_newwithstrandinit_3fd6fba4083ff2d0 = function () {
                                return M(function (n, e, t) {
                                    return w(new Request(s(n, e), _(t)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_instanceof_Response_849eb93e75734b6e = function (n) {
                                let e
                                try {
                                    e = _(n) instanceof Response
                                } catch (n) {
                                    e = !1
                                }
                                return e
                            }),
                            (e.wbg.__wbg_json_1d5f113e916d8675 = function () {
                                return M(function (n) {
                                    return w(_(n).json())
                                }, arguments)
                            }),
                            (e.wbg.__wbg_wasClean_8222e9acf5c5ad07 = function (n) {
                                return _(n).wasClean
                            }),
                            (e.wbg.__wbg_code_5ee5dcc2842228cd = function (n) {
                                return _(n).code
                            }),
                            (e.wbg.__wbg_reason_5ed6709323849cb1 = function (n, e) {
                                const t = y(_(e).reason, o.__wbindgen_malloc, o.__wbindgen_realloc),
                                    r = g
                                ;(m()[n / 4 + 1] = r), (m()[n / 4 + 0] = t)
                            }),
                            (e.wbg.__wbg_code_bddcff79610894cf = function (n) {
                                return _(n).code
                            }),
                            (e.wbg.__wbg_new_ab6fd82b10560829 = function () {
                                return M(function () {
                                    return w(new Headers())
                                }, arguments)
                            }),
                            (e.wbg.__wbg_append_7bfcb4937d1d5e29 = function () {
                                return M(function (n, e, t, r, o) {
                                    _(n).append(s(e, t), s(r, o))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_setonmessage_503809e5bb51bd33 = function (n, e) {
                                _(n).onmessage = _(e)
                            }),
                            (e.wbg.__wbg_new_d1187ae36d662ef9 = function () {
                                return M(function (n, e) {
                                    return w(new Worker(s(n, e)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_postMessage_7380d10e8b8269df = function () {
                                return M(function (n, e) {
                                    _(n).postMessage(_(e))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_url_1ac02c9add50c527 = function (n, e) {
                                const t = y(_(e).url, o.__wbindgen_malloc, o.__wbindgen_realloc),
                                    r = g
                                ;(m()[n / 4 + 1] = r), (m()[n / 4 + 0] = t)
                            }),
                            (e.wbg.__wbg_readyState_1c157e4ea17c134a = function (n) {
                                return _(n).readyState
                            }),
                            (e.wbg.__wbg_setonopen_ce7a4c51e5cf5788 = function (n, e) {
                                _(n).onopen = _(e)
                            }),
                            (e.wbg.__wbg_setonerror_39a785302b0cd2e9 = function (n, e) {
                                _(n).onerror = _(e)
                            }),
                            (e.wbg.__wbg_setonclose_b9929b1c1624dff3 = function (n, e) {
                                _(n).onclose = _(e)
                            }),
                            (e.wbg.__wbg_setonmessage_2af154ce83a3dc94 = function (n, e) {
                                _(n).onmessage = _(e)
                            }),
                            (e.wbg.__wbg_setbinaryType_b0cf5103cd561959 = function (n, e) {
                                _(n).binaryType = u(e)
                            }),
                            (e.wbg.__wbg_new_6c74223c77cfabad = function () {
                                return M(function (n, e) {
                                    return w(new WebSocket(s(n, e)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_newwithstrsequence_9bc178264d955680 = function () {
                                return M(function (n, e, t) {
                                    return w(new WebSocket(s(n, e), _(t)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_close_acd9532ff5c093ea = function () {
                                return M(function (n) {
                                    _(n).close()
                                }, arguments)
                            }),
                            (e.wbg.__wbg_send_70603dff16b81b66 = function () {
                                return M(function (n, e, t) {
                                    _(n).send(s(e, t))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_send_d095a7ab85cfc836 = function () {
                                return M(function (n, e) {
                                    _(n).send(_(e))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_length_cd7af8117672b8b8 = function (n) {
                                return _(n).length
                            }),
                            (e.wbg.__wbg_new_16b304a2cfa7ff4a = function () {
                                return w(new Array())
                            }),
                            (e.wbg.__wbg_newnoargs_e258087cd0daa0ea = function (n, e) {
                                return w(new Function(s(n, e)))
                            }),
                            (e.wbg.__wbg_next_40fc327bfc8770e6 = function (n) {
                                return w(_(n).next)
                            }),
                            (e.wbg.__wbg_value_d93c65011f51a456 = function (n) {
                                return w(_(n).value)
                            }),
                            (e.wbg.__wbg_iterator_2cee6dadfd956dfa = function () {
                                return w(Symbol.iterator)
                            }),
                            (e.wbg.__wbg_new_72fb9a18b5ae2624 = function () {
                                return w(new Object())
                            }),
                            (e.wbg.__wbg_self_ce0dbfc45cf2f5be = function () {
                                return M(function () {
                                    return w(self.self)
                                }, arguments)
                            }),
                            (e.wbg.__wbg_window_c6fb939a7f436783 = function () {
                                return M(function () {
                                    return w(window.window)
                                }, arguments)
                            }),
                            (e.wbg.__wbg_globalThis_d1e6af4856ba331b = function () {
                                return M(function () {
                                    return w(globalThis.globalThis)
                                }, arguments)
                            }),
                            (e.wbg.__wbg_global_207b558942527489 = function () {
                                return M(function () {
                                    return w(t.g.global)
                                }, arguments)
                            }),
                            (e.wbg.__wbg_get_bd8e338fbd5f5cc8 = function (n, e) {
                                return w(_(n)[e >>> 0])
                            }),
                            (e.wbg.__wbg_from_89e3fc3ba5e6fb48 = function (n) {
                                return w(Array.from(_(n)))
                            }),
                            (e.wbg.__wbg_of_6a70eed8d41f469c = function (n, e, t) {
                                return w(Array.of(_(n), _(e), _(t)))
                            }),
                            (e.wbg.__wbg_push_a5b05aedc7234f9f = function (n, e) {
                                return _(n).push(_(e))
                            }),
                            (e.wbg.__wbg_instanceof_ArrayBuffer_836825be07d4c9d2 = function (n) {
                                let e
                                try {
                                    e = _(n) instanceof ArrayBuffer
                                } catch (n) {
                                    e = !1
                                }
                                return e
                            }),
                            (e.wbg.__wbg_new_132e2fd5dfe036c3 = function (n) {
                                return w(new ArrayBuffer(n >>> 0))
                            }),
                            (e.wbg.__wbg_call_27c0f87801dedf93 = function () {
                                return M(function (n, e) {
                                    return w(_(n).call(_(e)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_call_b3ca7c6051f9bec1 = function () {
                                return M(function (n, e, t) {
                                    return w(_(n).call(_(e), _(t)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_next_196c84450b364254 = function () {
                                return M(function (n) {
                                    return w(_(n).next())
                                }, arguments)
                            }),
                            (e.wbg.__wbg_done_298b57d23c0fc80c = function (n) {
                                return _(n).done
                            }),
                            (e.wbg.__wbg_isSafeInteger_f7b04ef02296c4d2 = function (n) {
                                return Number.isSafeInteger(_(n))
                            }),
                            (e.wbg.__wbg_getTime_2bc4375165f02d15 = function (n) {
                                return _(n).getTime()
                            }),
                            (e.wbg.__wbg_new0_7d84e5b2cd9fdc73 = function () {
                                return w(new Date())
                            }),
                            (e.wbg.__wbg_now_3014639a94423537 = function () {
                                return Date.now()
                            }),
                            (e.wbg.__wbg_create_a4affbe2b1332881 = function (n) {
                                return w(Object.create(_(n)))
                            }),
                            (e.wbg.__wbg_entries_95cc2c823b285a09 = function (n) {
                                return w(Object.entries(_(n)))
                            }),
                            (e.wbg.__wbg_new_81740750da40724f = function (n, e) {
                                try {
                                    var t = { a: n, b: e }
                                    const r = new Promise((n, e) => {
                                        const r = t.a
                                        t.a = 0
                                        try {
                                            return (function (n, e, t, r) {
                                                o.wasm_bindgen__convert__closures__invoke2_mut__h07ddf46b15c83536(
                                                    n,
                                                    e,
                                                    w(t),
                                                    w(r)
                                                )
                                            })(r, t.b, n, e)
                                        } finally {
                                            t.a = r
                                        }
                                    })
                                    return w(r)
                                } finally {
                                    t.a = t.b = 0
                                }
                            }),
                            (e.wbg.__wbg_resolve_b0083a7967828ec8 = function (n) {
                                return w(Promise.resolve(_(n)))
                            }),
                            (e.wbg.__wbg_then_0c86a60e8fcfe9f6 = function (n, e) {
                                return w(_(n).then(_(e)))
                            }),
                            (e.wbg.__wbg_then_a73caa9a87991566 = function (n, e, t) {
                                return w(_(n).then(_(e), _(t)))
                            }),
                            (e.wbg.__wbg_buffer_12d079cc21e14bdb = function (n) {
                                return w(_(n).buffer)
                            }),
                            (e.wbg.__wbg_new_8cccba86b0f574cb = function (n) {
                                return w(new Int32Array(_(n)))
                            }),
                            (e.wbg.__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb = function (n, e, t) {
                                return w(new Uint8Array(_(n), e >>> 0, t >>> 0))
                            }),
                            (e.wbg.__wbg_new_63b92bc8671ed464 = function (n) {
                                return w(new Uint8Array(_(n)))
                            }),
                            (e.wbg.__wbg_instanceof_Uint8Array_2b3bbecd033d19f6 = function (n) {
                                let e
                                try {
                                    e = _(n) instanceof Uint8Array
                                } catch (n) {
                                    e = !1
                                }
                                return e
                            }),
                            (e.wbg.__wbg_newwithlength_e9b4878cebadb3d3 = function (n) {
                                return w(new Uint8Array(n >>> 0))
                            }),
                            (e.wbg.__wbg_subarray_a1f73cd4b5b42fe1 = function (n, e, t) {
                                return w(_(n).subarray(e >>> 0, t >>> 0))
                            }),
                            (e.wbg.__wbg_length_c20a40f15020d68a = function (n) {
                                return _(n).length
                            }),
                            (e.wbg.__wbg_set_a47bac70306a19a7 = function (n, e, t) {
                                _(n).set(_(e), t >>> 0)
                            }),
                            (e.wbg.__wbg_stringify_8887fe74e1c50d81 = function () {
                                return M(function (n) {
                                    return w(JSON.stringify(_(n)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_get_e3c254076557e348 = function () {
                                return M(function (n, e) {
                                    return w(Reflect.get(_(n), _(e)))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_set_1f9b04f170055d33 = function () {
                                return M(function (n, e, t) {
                                    return Reflect.set(_(n), _(e), _(t))
                                }, arguments)
                            }),
                            (e.wbg.__wbg_new_abda76e883ba8a5f = function () {
                                return w(new Error())
                            }),
                            (e.wbg.__wbg_stack_658279fe44541cf6 = function (n, e) {
                                const t = y(_(e).stack, o.__wbindgen_malloc, o.__wbindgen_realloc),
                                    r = g
                                ;(m()[n / 4 + 1] = r), (m()[n / 4 + 0] = t)
                            }),
                            (e.wbg.__wbg_error_f851667af71bcfc6 = function (n, e) {
                                let t, r
                                try {
                                    ;(t = n), (r = e), console.error(s(n, e))
                                } finally {
                                    o.__wbindgen_free(t, r, 1)
                                }
                            }),
                            (e.wbg.__wbindgen_bigint_get_as_i64 = function (n, e) {
                                const t = _(e),
                                    r = "bigint" == typeof t ? t : void 0
                                ;(((null !== x && x.buffer === o.memory.buffer) ||
                                    (x = new BigInt64Array(o.memory.buffer)),
                                x)[n / 8 + 1] = p(r) ? BigInt(0) : r),
                                    (m()[n / 4 + 0] = !p(r))
                            }),
                            (e.wbg.__wbindgen_debug_string = function (n, e) {
                                const t = y(S(_(e)), o.__wbindgen_malloc, o.__wbindgen_realloc),
                                    r = g
                                ;(m()[n / 4 + 1] = r), (m()[n / 4 + 0] = t)
                            }),
                            (e.wbg.__wbindgen_throw = function (n, e) {
                                throw new Error(s(n, e))
                            }),
                            (e.wbg.__wbindgen_rethrow = function (n) {
                                throw u(n)
                            }),
                            (e.wbg.__wbindgen_module = function () {
                                return w(I.__wbindgen_wasm_module)
                            }),
                            (e.wbg.__wbindgen_memory = function () {
                                return w(o.memory)
                            }),
                            (e.wbg.__wbg_startWorkers_2ee336a9694dda13 = function (n, e, o) {
                                const i = (async function (n, e, o) {
                                    if (0 === o.numThreads()) throw new Error("num_threads must be > 0.")
                                    const i = { module: n, memory: e, receiver: o.receiver() }
                                    ;(r = await Promise.all(
                                        Array.from({ length: o.numThreads() }, async () => {
                                            const n = new Worker(new URL(t.p + t.u(27), t.b), { type: void 0 })
                                            return (
                                                n.postMessage(i),
                                                await new Promise((e) =>
                                                    n.addEventListener("message", e, { once: !0 })
                                                ),
                                                n
                                            )
                                        })
                                    )),
                                        o.build()
                                })(u(n), u(e), W.__wrap(o))
                                return w(i)
                            }),
                            (e.wbg.__wbindgen_closure_wrapper1037 = function (n, e, t) {
                                return w(k(n, e, 884, j))
                            }),
                            (e.wbg.__wbindgen_closure_wrapper1039 = function (n, e, t) {
                                return w(k(n, e, 884, O))
                            }),
                            (e.wbg.__wbindgen_closure_wrapper13769 = function (n, e, t) {
                                return w(k(n, e, 2675, T))
                            }),
                            (e.wbg.__wbindgen_closure_wrapper13771 = function (n, e, t) {
                                return w(k(n, e, 2675, T))
                            }),
                            e
                        )
                    }
                    async function I(n, e) {
                        if (void 0 !== o) return o
                        void 0 === n && (n = new URL(t(439), t.b))
                        const r = q()
                        ;("string" == typeof n ||
                            ("function" == typeof Request && n instanceof Request) ||
                            ("function" == typeof URL && n instanceof URL)) &&
                            (n = fetch(n)),
                            (function (n, e) {
                                n.wbg.memory = e || new WebAssembly.Memory({ initial: 113, maximum: 16384, shared: !0 })
                            })(r, e)
                        const { instance: i, module: _ } = await (async function (n, e) {
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
                                (o = n.exports),
                                (I.__wbindgen_wasm_module = e),
                                (x = null),
                                (v = null),
                                (h = null),
                                (b = null),
                                o.__wbindgen_start(),
                                o
                            )
                        })(i, _)
                    }
                    const B = I
                },
                439: (n, e, t) => {
                    n.exports = t.p + "fc11293cc7662b1170f9.wasm"
                }
            },
            e = {}
        function t(r) {
            var o = e[r]
            if (void 0 !== o) return o.exports
            var i = (e[r] = { id: r, loaded: !1, exports: {} })
            return n[r](i, i.exports, t), (i.loaded = !0), i.exports
        }
        ;(t.m = n),
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
            (t.r = (n) => {
                "undefined" != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }),
                    Object.defineProperty(n, "__esModule", { value: !0 })
            }),
            (t.p = ""),
            (t.b = document.baseURI || self.location.href)
        var r = {}
        return (
            (() => {
                t.r(r), t.d(r, { prove: () => l, set_logging_filter: () => g, verify: () => d })
                var n = t(27),
                    e = function () {
                        return (
                            (e =
                                Object.assign ||
                                function (n) {
                                    for (var e, t = 1, r = arguments.length; t < r; t++)
                                        for (var o in (e = arguments[t]))
                                            Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o])
                                    return n
                                }),
                            e.apply(this, arguments)
                        )
                    },
                    o = function (n, e, t, r) {
                        return new (t || (t = Promise))(function (o, i) {
                            function _(n) {
                                try {
                                    u(r.next(n))
                                } catch (n) {
                                    i(n)
                                }
                            }
                            function c(n) {
                                try {
                                    u(r.throw(n))
                                } catch (n) {
                                    i(n)
                                }
                            }
                            function u(n) {
                                var e
                                n.done
                                    ? o(n.value)
                                    : ((e = n.value),
                                      e instanceof t
                                          ? e
                                          : new t(function (n) {
                                                n(e)
                                            })).then(_, c)
                            }
                            u((r = r.apply(n, e || [])).next())
                        })
                    },
                    i = function (n, e) {
                        var t,
                            r,
                            o,
                            i,
                            _ = {
                                label: 0,
                                sent: function () {
                                    if (1 & o[0]) throw o[1]
                                    return o[1]
                                },
                                trys: [],
                                ops: []
                            }
                        return (
                            (i = { next: c(0), throw: c(1), return: c(2) }),
                            "function" == typeof Symbol &&
                                (i[Symbol.iterator] = function () {
                                    return this
                                }),
                            i
                        )
                        function c(c) {
                            return function (u) {
                                return (function (c) {
                                    if (t) throw new TypeError("Generator is already executing.")
                                    for (; i && ((i = 0), c[0] && (_ = 0)), _; )
                                        try {
                                            if (
                                                ((t = 1),
                                                r &&
                                                    (o =
                                                        2 & c[0]
                                                            ? r.return
                                                            : c[0]
                                                            ? r.throw || ((o = r.return) && o.call(r), 0)
                                                            : r.next) &&
                                                    !(o = o.call(r, c[1])).done)
                                            )
                                                return o
                                            switch (((r = 0), o && (c = [2 & c[0], o.value]), c[0])) {
                                                case 0:
                                                case 1:
                                                    o = c
                                                    break
                                                case 4:
                                                    return _.label++, { value: c[1], done: !1 }
                                                case 5:
                                                    _.label++, (r = c[1]), (c = [0])
                                                    continue
                                                case 7:
                                                    ;(c = _.ops.pop()), _.trys.pop()
                                                    continue
                                                default:
                                                    if (
                                                        !(
                                                            (o = (o = _.trys).length > 0 && o[o.length - 1]) ||
                                                            (6 !== c[0] && 2 !== c[0])
                                                        )
                                                    ) {
                                                        _ = 0
                                                        continue
                                                    }
                                                    if (3 === c[0] && (!o || (c[1] > o[0] && c[1] < o[3]))) {
                                                        _.label = c[1]
                                                        break
                                                    }
                                                    if (6 === c[0] && _.label < o[1]) {
                                                        ;(_.label = o[1]), (o = c)
                                                        break
                                                    }
                                                    if (o && _.label < o[2]) {
                                                        ;(_.label = o[2]), _.ops.push(c)
                                                        break
                                                    }
                                                    o[2] && _.ops.pop(), _.trys.pop()
                                                    continue
                                            }
                                            c = e.call(n, _)
                                        } catch (n) {
                                            ;(c = [6, n]), (r = 0)
                                        } finally {
                                            t = o = 0
                                        }
                                    if (5 & c[0]) throw c[1]
                                    return { value: c[0] ? c[1] : void 0, done: !0 }
                                })([c, u])
                            }
                        }
                    },
                    _ = "info,tlsn_extension_rs=debug"
                const c = (function () {
                    function t(n) {
                        void 0 === n && (n = _)
                        var e = this
                        ;(this.logging_filter = n),
                            (this.startPromise = new Promise(function (n) {
                                e.resolveStart = n
                            })),
                            this.start()
                    }
                    return (
                        (t.prototype.start = function () {
                            return o(this, void 0, void 0, function () {
                                var e
                                return i(this, function (t) {
                                    switch (t.label) {
                                        case 0:
                                            return (e = navigator.hardwareConcurrency), [4, (0, n.Ay)()]
                                        case 1:
                                            return t.sent(), (0, n.ep)(this.logging_filter), [4, (0, n.Fs)(e)]
                                        case 2:
                                            return t.sent(), this.resolveStart(), [2]
                                    }
                                })
                            })
                        }),
                        (t.prototype.waitForStart = function () {
                            return o(this, void 0, void 0, function () {
                                return i(this, function (n) {
                                    return [2, this.startPromise]
                                })
                            })
                        }),
                        (t.prototype.prove = function (t, r) {
                            return o(this, void 0, void 0, function () {
                                var o
                                return i(this, function (i) {
                                    switch (i.label) {
                                        case 0:
                                            return [4, this.waitForStart()]
                                        case 1:
                                            return (
                                                i.sent(),
                                                [
                                                    4,
                                                    (0, n.t2)(
                                                        t,
                                                        e(e({}, r), {
                                                            notaryUrl: null == r ? void 0 : r.notaryUrl,
                                                            websocketProxyUrl: null == r ? void 0 : r.websocketProxyUrl
                                                        }),
                                                        (null == r ? void 0 : r.secretHeaders) || [],
                                                        (null == r ? void 0 : r.secretResps) || []
                                                    )
                                                ]
                                            )
                                        case 2:
                                            return (o = i.sent()), [2, JSON.parse(o)]
                                    }
                                })
                            })
                        }),
                        (t.prototype.verify = function (e, t) {
                            return o(this, void 0, void 0, function () {
                                var r
                                return i(this, function (o) {
                                    switch (o.label) {
                                        case 0:
                                            return [4, this.waitForStart()]
                                        case 1:
                                            return o.sent(), [4, (0, n.MX)(JSON.stringify(e), t)]
                                        case 2:
                                            return (r = o.sent()), [2, JSON.parse(r)]
                                    }
                                })
                            })
                        }),
                        t
                    )
                })()
                var u,
                    a = function () {
                        return (
                            (a =
                                Object.assign ||
                                function (n) {
                                    for (var e, t = 1, r = arguments.length; t < r; t++)
                                        for (var o in (e = arguments[t]))
                                            Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o])
                                    return n
                                }),
                            a.apply(this, arguments)
                        )
                    },
                    b = function (n, e, t, r) {
                        return new (t || (t = Promise))(function (o, i) {
                            function _(n) {
                                try {
                                    u(r.next(n))
                                } catch (n) {
                                    i(n)
                                }
                            }
                            function c(n) {
                                try {
                                    u(r.throw(n))
                                } catch (n) {
                                    i(n)
                                }
                            }
                            function u(n) {
                                var e
                                n.done
                                    ? o(n.value)
                                    : ((e = n.value),
                                      e instanceof t
                                          ? e
                                          : new t(function (n) {
                                                n(e)
                                            })).then(_, c)
                            }
                            u((r = r.apply(n, e || [])).next())
                        })
                    },
                    f = function (n, e) {
                        var t,
                            r,
                            o,
                            i,
                            _ = {
                                label: 0,
                                sent: function () {
                                    if (1 & o[0]) throw o[1]
                                    return o[1]
                                },
                                trys: [],
                                ops: []
                            }
                        return (
                            (i = { next: c(0), throw: c(1), return: c(2) }),
                            "function" == typeof Symbol &&
                                (i[Symbol.iterator] = function () {
                                    return this
                                }),
                            i
                        )
                        function c(c) {
                            return function (u) {
                                return (function (c) {
                                    if (t) throw new TypeError("Generator is already executing.")
                                    for (; i && ((i = 0), c[0] && (_ = 0)), _; )
                                        try {
                                            if (
                                                ((t = 1),
                                                r &&
                                                    (o =
                                                        2 & c[0]
                                                            ? r.return
                                                            : c[0]
                                                            ? r.throw || ((o = r.return) && o.call(r), 0)
                                                            : r.next) &&
                                                    !(o = o.call(r, c[1])).done)
                                            )
                                                return o
                                            switch (((r = 0), o && (c = [2 & c[0], o.value]), c[0])) {
                                                case 0:
                                                case 1:
                                                    o = c
                                                    break
                                                case 4:
                                                    return _.label++, { value: c[1], done: !1 }
                                                case 5:
                                                    _.label++, (r = c[1]), (c = [0])
                                                    continue
                                                case 7:
                                                    ;(c = _.ops.pop()), _.trys.pop()
                                                    continue
                                                default:
                                                    if (
                                                        !(
                                                            (o = (o = _.trys).length > 0 && o[o.length - 1]) ||
                                                            (6 !== c[0] && 2 !== c[0])
                                                        )
                                                    ) {
                                                        _ = 0
                                                        continue
                                                    }
                                                    if (3 === c[0] && (!o || (c[1] > o[0] && c[1] < o[3]))) {
                                                        _.label = c[1]
                                                        break
                                                    }
                                                    if (6 === c[0] && _.label < o[1]) {
                                                        ;(_.label = o[1]), (o = c)
                                                        break
                                                    }
                                                    if (o && _.label < o[2]) {
                                                        ;(_.label = o[2]), _.ops.push(c)
                                                        break
                                                    }
                                                    o[2] && _.ops.pop(), _.trys.pop()
                                                    continue
                                            }
                                            c = e.call(n, _)
                                        } catch (n) {
                                            ;(c = [6, n]), (r = 0)
                                        } finally {
                                            t = o = 0
                                        }
                                    if (5 & c[0]) throw c[1]
                                    return { value: c[0] ? c[1] : void 0, done: !0 }
                                })([c, u])
                            }
                        }
                    },
                    s = _
                function w(n) {
                    return b(this, void 0, Promise, function () {
                        return f(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    return (n && n == s) || !u ? (n ? [4, new c(n)] : [3, 2]) : [2, u]
                                case 1:
                                    return (u = e.sent()), [3, 4]
                                case 2:
                                    return [4, new c()]
                                case 3:
                                    ;(u = e.sent()), (e.label = 4)
                                case 4:
                                    return [2, u]
                            }
                        })
                    })
                }
                var g = function (n) {
                        return b(void 0, void 0, void 0, function () {
                            return f(this, function (e) {
                                return w(n), [2]
                            })
                        })
                    },
                    l = function (n, e) {
                        return b(void 0, void 0, Promise, function () {
                            var t, r, o, i, _, c, u, b, s, g, l, d, y, p, h
                            return f(this, function (f) {
                                switch (f.label) {
                                    case 0:
                                        return (
                                            (t = e.method),
                                            (r = e.headers),
                                            (o = void 0 === r ? {} : r),
                                            (i = e.body),
                                            (_ = void 0 === i ? "" : i),
                                            (c = e.maxSentData),
                                            (u = e.maxRecvData),
                                            (b = e.maxTranscriptSize),
                                            (s = void 0 === b ? 16384 : b),
                                            (g = e.notaryUrl),
                                            (l = e.websocketProxyUrl),
                                            (d = e.secretHeaders),
                                            (y = e.secretResps),
                                            [4, w()]
                                        )
                                    case 1:
                                        return (
                                            (p = f.sent()),
                                            (o.Host = new URL(n).host),
                                            (o.Connection = "close"),
                                            [
                                                4,
                                                p.prove(n, {
                                                    method: t,
                                                    headers: o,
                                                    body: _,
                                                    maxSentData: c,
                                                    maxRecvData: u,
                                                    maxTranscriptSize: s,
                                                    notaryUrl: g,
                                                    websocketProxyUrl: l,
                                                    secretHeaders: d,
                                                    secretResps: y
                                                })
                                            ]
                                        )
                                    case 2:
                                        return (h = f.sent()), [2, a(a({}, h), { notaryUrl: g })]
                                }
                            })
                        })
                    },
                    d = function (n, e) {
                        return b(void 0, void 0, Promise, function () {
                            var t, r, o
                            return f(this, function (i) {
                                switch (i.label) {
                                    case 0:
                                        return (r = e) ? [3, 2] : [4, y(n.notaryUrl)]
                                    case 1:
                                        ;(r = i.sent()), (i.label = 2)
                                    case 2:
                                        return (t = r), [4, w()]
                                    case 3:
                                        return [4, i.sent().verify(n, t)]
                                    case 4:
                                        return (o = i.sent()), [2, a(a({}, o), { notaryUrl: n.notaryUrl })]
                                }
                            })
                        })
                    }
                function y(n) {
                    return b(this, void 0, void 0, function () {
                        var e
                        return f(this, function (t) {
                            switch (t.label) {
                                case 0:
                                    return [4, fetch(n + "/info")]
                                case 1:
                                    return [4, t.sent().json()]
                                case 2:
                                    if (!(e = t.sent()).publicKey) throw new Error("invalid response")
                                    return [2, e.publicKey]
                            }
                        })
                    })
                }
            })(),
            r
        )
    })()
)
//# sourceMappingURL=index.js.map
