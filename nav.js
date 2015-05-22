(function() {
    'use strict';

    function isNavSmall() {
        return 0 === $(".nav-list_inline .nav--item").length;
    }

    function navigationResizeHandler() {
        var b, c, d, e;
        e = $(".nav-list_inline").width();
        c = 0;

        $(".nav-list_inline .nav--item").each(function(a, b) {
            return c += $(b).width();
        });

        $(".nav-list .nav--item").each(function(a, b) {
            return $(b).hasClass("nav--item_about") ? !1 : (
                $(b).appendTo(".nav-list_inline"),
                $(b).width() + c > e ? (
                    $(b).prependTo(".nav-list"),
                    !1
                ) : c = $(b).width() + c
            )
        });

        b = $(".nav-list_inline .nav--item:last-child");

        b.width() + c > e && b.prependTo(".nav-list");

        "inline" === $(".nav-list .nav--item:last-child").css("display") && $(".nav-list_inline .nav--item").each(function(a, b) {
            return $(b).insertBefore(".nav--item_about")
        });

        d = isNavSmall() ? "Menu" : $(".nav-list").hasClass("nav_closed") ? "More" : "Less";

        $(".nav-toggle .nav-toggle--text").text(d);
    }

    function navigation() {
        var b;

        navigationResizeHandler();

        b = $(".nav-list");

        b.addClass("nav_closed");

        $(".member-tab").addClass("member-tab_hidden");

        isNavSmall() || $(".nav-toggle .nav-toggle--text").text("More");

        $(".nav-toggle").on("click", function(a) {
            var c;

            a.preventDefault();

            if (b.hasClass("nav_closed")) {
                c = "Less";
                $(this).addClass("nav-toggle_open")
                    .children(".icon-arrow")
                    .addClass("icon-arrow-gold")
                    .removeClass("icon-arrow-down-white");
                $(".nav").removeClass("closed");
                b.removeClass("nav_closed");
                $(".member-tab").removeClass("member-tab_hidden");
            } else {
                c = "More";
                $(this).removeClass("nav-toggle_open")
                    .children(".icon-arrow")
                    .addClass("icon-arrow-down-white")
                    .removeClass("icon-arrow-gold");

                $(".nav").addClass("closed");
                b.addClass("nav_closed");
                $(".member-tab").addClass("member-tab_hidden");
            }
        });
    }

    function homeNavCheck() {
        $(".home .header").addClass("transparent");
        $(".home .nav").addClass("transparent");
    }

    function initHandlers() {
        $(window).resize(_.throttle(navigationResizeHandler, 50));
        $(window).trigger('resize');
    }

    function init() {
        navigation();
        homeNavCheck();
        initHandlers();
    }

    init();
})();