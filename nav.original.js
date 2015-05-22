(function() {
    var a;
    a = {
        isNavSmall: function() {
            return 0 === $(".nav-list_inline .nav--item").length
        },
        navigationResizeHandler: function() {
            var b, c, d, e;
            return e = $(".nav-list_inline").width(),
                c = 0,
                $(".nav-list_inline .nav--item")
                    .each(function(a, b) {
                        return c += $(b).width()
                    }),
                $(".nav-list .nav--item").each(function(a, b) {
                    return $(b).hasClass("nav--item_about") ? !1 : (
                        $(b).appendTo(".nav-list_inline"),
                        $(b).width() + c > e ? (
                            $(b).prependTo(".nav-list"),
                            !1
                        ) : c = $(b).width() + c
                    )
                }),
                b = $(".nav-list_inline .nav--item:last-child"),
                    b.width() + c > e && b.prependTo(".nav-list"),
                    "inline" === $(".nav-list .nav--item:last-child")
                        .css("display") && $(".nav-list_inline .nav--item")
                        .each(function(a, b) {
                            return $(b).insertBefore(".nav--item_about")
                        }),
                    d = a.isNavSmall() ? "Menu" : $(".nav-list")
                        .hasClass("nav_closed") ? "More" : "Less",
                        $(".nav-toggle .nav-toggle--text").text(d)
        },
        navigation: function() {
            var b;
            return this.navigationResizeHandler(),
                b = $(".nav-list"),
                b.addClass("nav_closed"),
                $(".member-tab").addClass("member-tab_hidden"),
                a.isNavSmall() || $(".nav-toggle .nav-toggle--text").text("More"),
                $(".nav-toggle").on("click", function(a) {
                    var c;
                    return a.preventDefault(),
                        b.hasClass("nav_closed") ? (
                            c = "Less",
                            $(this).addClass("nav-toggle_open")
                                .children(".icon-arrow")
                                .addClass("icon-arrow-gold")
                                .removeClass("icon-arrow-down-white"),
                            $(".nav").removeClass("closed"),
                            b.removeClass("nav_closed"),
                            $(".member-tab").removeClass("member-tab_hidden")
                        ) : (c = "More",
                            $(this).removeClass("nav-toggle_open")
                                .children(".icon-arrow")
                                .addClass("icon-arrow-down-white")
                                .removeClass("icon-arrow-gold"),
                            $(".nav").addClass("closed"),
                            b.addClass("nav_closed"),
                            $(".member-tab").addClass("member-tab_hidden")
                        ),
                        !1
                })
        },
        homeNavCheck: function() {
            return $(".home .header").addClass("transparent"),
                $(".home .nav").addClass("transparent")
        },
        initHandlers: function() {
            return $(window).resize(_.throttle(this.navigationResizeHandler, 50)).trigger('resize')
        },
        init: function() {
            return this.navigation(),
                this.homeNavCheck(),
                this.initHandlers()
        }
    }, window.APP = a, a.init();
}).call(this);