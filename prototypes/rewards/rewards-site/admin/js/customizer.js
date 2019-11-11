$(document).ready(function() {
    function t(t, e, s, a) {
        t.on("addedfile", function() {
            setTimeout(function() {
                var t = $(e + " .dz-image img").attr("src"),
                    o = $(e);
                "image" == a ? $(s).attr("src", t) : $(s).css("background-image", "url(" + t + ")"), o.css("background-image", "url(" + t + ")")
            }, 500)
        })
    }

    function e(t, e) {
        t = String(t).replace(/[^0-9a-f]/gi, ""), t.length < 6 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), e = e || 0;
        var s, a, o = "#";
        for (a = 0; 3 > a; a++) s = parseInt(t.substr(2 * a, 2), 16), s = Math.round(Math.min(Math.max(0, s + s * e), 255)).toString(16), o += ("00" + s).substr(s.length);
        return o
    }

    function s(t) {
        var e = 105,
            s = a(t),
            o = .299 * s.R + .587 * s.G + .114 * s.B;
        return e > 255 - o ? "#000000" : "#ffffff"
    }

    function a(t) {
        var e = t.substring(1, 3),
            s = t.substring(3, 5),
            a = t.substring(5, 7);
        return {
            R: parseInt(e, 16),
            G: parseInt(s, 16),
            B: parseInt(a, 16)
        }
    }

    function o(t, a, o) {
        $(t).change(function() {
            var t = $(this).val(),
                n = e(t, -.35),
                r = e(t, -.45);
            switch (o) {
                case "bg":
                    $(a).css({
                        "background-color": t
                    });
                    break;
                case "lightBg":
                    $(a).css({
                        "background-color": r,
                        color: s(r)
                    });
                    break;
                case "darkBg":
                    $(a).css({
                        "background-color": n,
                        color: s(n)
                    });
                    break;
                case "text":
                    $(a).css({
                        color: s(t)
                    });
                    break;
                default:
                    console.log("Nothing Exists")
            }
        })
    }

    function n(t, e) {
        $(t).parent().find("." + e).removeClass(e), $(t).addClass(e)
    }
    var r = new Dropzone("#dropZoneBg", {
        url: "/files/post",
        thumbnailWidth: 1200,
        thumbnailHeight: null,
        autoDiscover: !1
    });
    t(r, "#dropZoneBg", ".site-logo", "image"), $(".upload__remove-icon").on("click", function() {
        var t = $(this).parents(".js-dropZone"),
            e = $(this).data("target"),
            s = $('[data-target="' + e + '"]');
        switch (e) {
            case "logo":
                s.attr("src", "");
                break;
            case "background":
                s.css("background-image", "none");
                break;
            default:
                console.log("This Target Does Not Exist")
        }
        t.css("background-image", "none"), t.removeClass("dz-started"), t.find(".dz-preview").remove()
    }), $(".js-miniColors").minicolors({
        position: "bottom left",
        theme: ""
    }), o("#primaryColor", "html, .see-widget-onairui .tdas-widget-listening-appts .tdas-widget-listening-appts-titlebar", "bg"), o("#primaryColor", ".js-navLinkText, .nav__link-icn", "text"), o("#primaryColor", ".js-rewardBar", "darkBg"), $(".font-style").on("click", function() {
        var t = $(this).data("style"),
            e = $(".js-navLinkText, .td-rewards-widget"),
            s = $("body.layout-constrained .nav__link");
        switch (n(this, "is-selected"), t) {
            case "Arvo":
                e.css({
                    "font-family": "'Arvo'"
                }), s.css({
                    "font-size": "16px",
                    "font-weight": "bold"
                });
                break;
            case "Montserrat":
                e.css({
                    "font-family": "'Montserrat'"
                }), s.css({
                    "font-size": "16px",
                    "font-weight": "bold"
                });
                break;
            case "Oswald":
                e.css({
                    "font-family": "'Oswald'"
                }), s.css({
                    "font-size": "",
                    "font-weight": ""
                });
                break;
            default:
                console.log("Nothing Exists")
        }
    });
    for (var i = ["blue", "gray", "green", "orange", "purple", "red"], l = ["none", "geometric", "bamboo", "pattern-1", "pattern-3", "carbon", "pattern-6"], c = 0, d = 0, u = "", g = ""; i[c];) u += '<div class="theme theme__color theme__color--' + i[c] + '"data-label="' + i[c] + '"></div>', c++;
    for (; l[d];) g += '<div style="background: url(img/' + l[d] + '.png)" class="theme theme__texture theme__texture--' + l[d] + '"data-label="' + l[d] + '"></div>', d++;
    document.getElementById("themePatterns").innerHTML = g, $(document).ready(function() {
        $(".theme:first-child").addClass("is-selected"), $(".theme").on("click", function() {
            if ($(this).hasClass("theme__color")) {
                var t = $(this).data("label"),
                    e = $(".td-trivia");
                e.removeClass(function(t, e) {
                    return (e.match(/\btd-trivia--\S+/g) || []).join(" ")
                }), e.addClass("td-trivia--" + t)
            } else {
                var s = $(this).data("label");
                "none" == s ? $("body").css("background-image", "") : $("body").css("background-image", "url(img/" + s + ".png)")
            }
            $(this).parent().find(".is-selected").removeClass("is-selected"), $(this).addClass("is-selected")
        })
    }), $(".customizer__close").on("click", function() {
        $(this).parent().toggleClass("is-closed")
    }), $(window).resize(function() {
        $(".customizer").addClass("is-closed")
    }), $(".layout").on("click", function() {
        $("body").removeAttr("class"), n(this, "is-selected"), $(this).hasClass("layout--constrained") ? $("body").addClass("layout-constrained") : $(this).hasClass("layout--sidebar") ? $("body").addClass("layout-sidebar") : $("body").addClass("layout-full")
    })
});