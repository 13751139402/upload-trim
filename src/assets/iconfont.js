! function (t) {
    var e, n, o, a, i, l, c, d = '<svg><symbol id="icon-bianji" viewBox="0 0 1024 1024"><path d="M326.1184 569.0624c-0.6912 0.896-1.3312 1.7664-1.6384 2.8672l-50.9952 193.024c-2.9696 11.2384 0.0512 23.3472 8.1408 31.872 5.9904 6.0672 13.9776 9.4208 22.4256 9.4208 2.7648 0 5.6064-0.3328 8.32-1.0752l185.6768-52.3008c0.2816 0 0.4352 0.2304 0.6912 0.2304 2.1248 0 4.224-0.7936 5.7856-2.4576L1001.088 238.2592c14.7712-15.2576 22.8352-36.0192 22.8352-58.5984 0-25.6-10.496-51.2-28.9536-70.1696l-46.8992-48.512c-18.4064-18.9952-43.2384-29.8752-68.0192-29.8752-21.888 0-41.984 8.32-56.8064 23.552L326.8608 567.296C326.3232 567.7824 326.5024 568.4992 326.1184 569.0624M952.5504 188.1088l-49.3056 50.8672-79.9744-83.8144 48.6144-50.2016c7.68-7.9616 22.5792-6.8096 31.3856 2.3808l46.9248 48.4608c4.864 5.0432 7.68 11.8016 7.68 18.4064C957.9008 179.6608 956.0064 184.5504 952.5504 188.1088M414.4128 577.1008 772.736 207.3088l79.9744 83.8912L495.0784 660.2752 414.4128 577.1008zM349.1072 727.04l25.9328-98.0992 69.0688 71.296L349.1072 727.04zM956.7744 391.168c-18.7904 0-35.3536 15.7696-35.4304 35.4304l0 479.4624c0 25.088-19.712 44.4672-44.032 44.4672L113.5872 950.528c-24.32 0-42.3936-19.4304-42.3936-44.4672L71.1936 116.9664c0-25.088 18.0736-43.9552 42.3936-43.9552l524.1344 0c18.8672 0 34.2528-17.3568 34.2528-36.8384s-15.3856-36.224-34.2528-36.224L108.3648-0.0512c-59.1616 0-108.3904 50.56-108.3904 111.6672l0 799.8208c0 61.1072 49.1776 112.512 108.3904 112.512l774.144 0c59.264 0 109.6448-51.4048 109.6448-112.512L992.1536 426.368C992.0768 406.912 975.5648 391.168 956.7744 391.168"  ></path></symbol><symbol id="icon-fangdajing" viewBox="0 0 1024 1024"><path d="M780.544 790.528a422.464 422.464 0 1 0-586.944-607.744 422.464 422.464 0 0 0 586.88 607.744z m44.416 46.08A486.464 486.464 0 1 1 149.12 136.704a486.464 486.464 0 0 1 675.84 699.904z" fill="#333333" ></path><path d="M800.64 844.544a32 32 0 1 1 46.08-44.48l161.92 167.68a32 32 0 0 1-46.08 44.48l-161.92-167.68z" fill="#333333" ></path><path d="M673.024 456.576a32 32 0 1 1 0 64H323.328a32 32 0 0 1 0-64h349.696z" fill="#333333" ></path><path d="M530.176 663.424a32 32 0 1 1-64 0V313.728a32 32 0 1 1 64 0v349.696z" fill="#333333" ></path></symbol><symbol id="icon-21" viewBox="0 0 1024 1024"><path d="M128 554.666667h768a42.666667 42.666667 0 0 0 0-85.333334H128a42.666667 42.666667 0 0 0 0 85.333334z"  ></path><path d="M469.333333 128v768a42.666667 42.666667 0 0 0 85.333334 0V128a42.666667 42.666667 0 0 0-85.333334 0z"  ></path></symbol></svg>',
        s = (e = document.getElementsByTagName("script"))[e.length - 1].getAttribute("data-injectcss");
    if (s && !t.__iconfont__svg__cssinject__) {
        t.__iconfont__svg__cssinject__ = !0;
        try {
            document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
        } catch (t) {
            console && console.log(t)
        }
    }

    function r() {
        l || (l = !0, a())
    }
    n = function () {
        var t, e, n, o, a, i = document.createElement("div");
        i.innerHTML = d, d = null, (t = i.getElementsByTagName("svg")[0]) && (t.setAttribute("aria-hidden", "true"), t.style.position = "absolute", t.style.width = 0, t.style.height = 0, t.style.overflow = "hidden", e = t, (n = document.body).firstChild ? (o = e, (a = n.firstChild).parentNode.insertBefore(o, a)) : n.appendChild(e))
    }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(n, 0) : (o = function () {
        document.removeEventListener("DOMContentLoaded", o, !1), n()
    }, document.addEventListener("DOMContentLoaded", o, !1)) : document.attachEvent && (a = n, i = t.document, l = !1, (c = function () {
        try {
            i.documentElement.doScroll("left")
        } catch (t) {
            return void setTimeout(c, 50)
        }
        r()
    })(), i.onreadystatechange = function () {
        "complete" == i.readyState && (i.onreadystatechange = null, r())
    })
}(window);