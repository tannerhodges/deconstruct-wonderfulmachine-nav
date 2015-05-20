(function() {
    var a;
    a = {
        isNavSmall: function() {
            return 0 === $(".nav-list_inline .nav--item").length
        },
        lockupRolloverImage: function() {
            return $(".information_lockup-container--image").on("mouseenter", function() {
                return $(this).data("rollover") ? ($(this).data("oldsrc", $(this).attr("src")), $(this).attr("src", $(this).data("rollover"))) : void 0
            }), $(".information_lockup-container--image").on("mouseleave", function() {
                return $(this).data("oldsrc") ? $(this).attr("src", $(this).data("oldsrc")) : void 0
            })
        },
        navigationResizeHandler: function() {
            var b, c, d, e;
            return a.footerPosition(), e = $(".nav-list_inline").width(), c = 0, $(".nav-list_inline .nav--item").each(function(a, b) {
                return c += $(b).width()
            }), $(".nav-list .nav--item").each(function(a, b) {
                return $(b).hasClass("nav--item_about") ? !1 : ($(b).appendTo(".nav-list_inline"), $(b).width() + c > e ? ($(b).prependTo(".nav-list"), !1) : c = $(b).width() + c)
            }), b = $(".nav-list_inline .nav--item:last-child"), b.width() + c > e && b.prependTo(".nav-list"), "inline" === $(".nav-list .nav--item:last-child").css("display") && $(".nav-list_inline .nav--item").each(function(a, b) {
                return $(b).insertBefore(".nav--item_about")
            }), d = a.isNavSmall() ? "Menu" : $(".nav-list").hasClass("nav_closed") ? "More" : "Less", $(".nav-toggle .nav-toggle--text").text(d)
        },
        navigation: function() {
            var b;
            return this.navigationResizeHandler(), b = $(".nav-list"), b.addClass("nav_closed"), $(".member-tab").addClass("member-tab_hidden"), a.isNavSmall() || $(".nav-toggle .nav-toggle--text").text("More"), $(".nav-toggle").on("click", function(a) {
                var c;
                return a.preventDefault(), b.hasClass("nav_closed") ? (c = "Less", $(this).addClass("nav-toggle_open").children(".icon-arrow").addClass("icon-arrow-gold").removeClass("icon-arrow-down-white"), $(".nav").removeClass("closed"), b.removeClass("nav_closed"), $(".member-tab").removeClass("member-tab_hidden")) : (c = "More", $(this).removeClass("nav-toggle_open").children(".icon-arrow").addClass("icon-arrow-down-white").removeClass("icon-arrow-gold"), $(".nav").addClass("closed"), b.addClass("nav_closed"), $(".member-tab").addClass("member-tab_hidden")), !1
            })
        },
        homeNavCheck: function() {
            return $(".home .header").addClass("transparent"), $(".home .nav").addClass("transparent")
        },
        pageScrollHandler: function() {
            var b, c, d, e;
            return d = 50, c = .39, b = $(window), e = b.scrollTop() / b.height(), e > c ? $(".hero-wrapper").addClass("scrolled") : $(".hero-wrapper").removeClass("scrolled"), b.scrollTop() > d ? ($(".header-content, .page-wrapper").addClass("scrolled"), $(".home .header").removeClass("transparent")) : ($(".header-content, .page-wrapper").removeClass("scrolled"), $(".home .header").addClass("transparent")), a.footerPosition()
        },
        pageScrollSearch: function() {
            return $(window).scrollTop() >= $(document).height() - $(window).height() - 400 ? a.infinity() : void 0
        },
        geoCodeComplete: !1,
        geoCodeInit: function() {
            return a.geoCodeComplete = !1, $(".search-bar-form").on("submit", function() {
                var b;
                return $("#location").val() ? a.geoCodeComplete ? !0 : (b = $("#location").val(), ga("send", "event", "search-raw-input", "search", b), a.geoCodeAddress(), !1) : (a.geoCodeComplete = !0, !0)
            })
        },
        geoCodeAddress: function() {
            var b;
            return b = new google.maps.Geocoder, b.geocode({
                address: $("#location").val()
            }, function(b, c) {
                var d, e, f, g, h, i, j, k, l, m, n, o, p, q;
                if (c === google.maps.GeocoderStatus.OK) {
                    for (l = b[0].geometry.location, d = b[0].address_components, i = b[0].formatted_address, f = m = g = {}, j = n = 0, p = d.length - 1; p >= n; j = n += 1) {
                        for (k = o = 0, q = d[j].types.length - 1; q >= o; k = o += 1) "locality" === d[j].types[k] && (f = d[j]);
                        "administrative_area_level_1" === d[j].types[0] && (m = d[j]), "country" === d[j].types[0] && (g = d[j])
                    }
                    h = function(a) {
                        return a || "" === a ? ", " + a : ""
                    }, e = "", "US" === g.short_name ? e = null != f.long_name ? f.long_name + h(m.long_name) : m.long_name + h(g.long_name) : (null != f.long_name && (e = f.long_name), null != g.long_name && "" !== e && (e += h(g.long_name))), "" === e && (e = i), $("#location").val(e), $("#lon").val(l.lng()), $("#lat").val(l.lat()), a.geoCodeComplete = !0, a.gaSearchAnalytics(), $(".search-bar-form").submit()
                } else $(".search--location").addClass("failed"), $(".search--error").css("display", "block")
            })
        },
        initHandlers: function() {
            return $(window).resize(_.throttle(this.navigationResizeHandler, 50)), $(window).resize(_.throttle(this.heroInit, 100)), $(window).scroll(_.throttle(this.pageScrollHandler, 100)), $(window).scroll(_.throttle(this.pageScrollSearch, 150))
        },
        footerPosition: function() {
            var b, c, d, e, f, g, h;
            return g = $(".page-wrapper").height(), h = $(window).height(), e = $(".header").outerHeight(), d = $(".footer").outerHeight(), h > g && (f = h - d - e), 640 > f && (f = 640), a.changeHeight(f, e, d, h), b = $("body").height(), c = h - b, c > 0 ? (f += c, a.changeHeight(f, e, d, h)) : void 0
        },
        changeHeight: function(a) {
            var b, c;
            return $(".page-wrapper, .member-page").css("min-height", a).data("height", a), $(".photographer-wrapper") && (c = $(".search-bar").outerHeight(), b = a - c, 640 > b && (b = 640), $(".photographer-wrapper").css("min-height", b).data("height", b)), $(".footer").removeClass("footer-push")
        },
        hiddenForm: function() {
            return $(".hidden-data").each(function(a, b) {
                var c;
                return "" !== $(b).val() ? $(b).next().val($(b).val()) : $(b).is("ul") ? (c = $(b).find("input"), c.each(function(a, c) {
                    return "checked" === $(c).attr("checked") ? "Yes" === $(c).val() ? $(b).next(".positive").attr("checked", "checked").trigger("change") : $(b).next(".negative").attr("checked", "checked").trigger("change") : void 0
                })) : void 0
            })
        },
        datepicker: function() {
            return $(".datepicker").datepicker()
        },
        eventFormListenerPositive: function() {
            var a;
            return a = $(".form--select_multi"), $(this).is(":checked") ? (a.addClass("form--disabled"), a.each(function(a, b) {
                return $(b).append($('<option selected="selected"></option>').val("multiple days").html($(b).children().first().text()))
            }), a.val("multiple days"), a.attr("disabled", "disabled"), a.on("click", function(a) {
                return a.preventDefault(), !1
            }), a.on("focus", function(a) {
                return a.preventDefault(), !1
            }), $("#page-form--timeline_description").val(""), $(".form_alt--input_multi").show()) : void 0
        },
        eventFormListenerNegative: function() {
            var a;
            return a = $(".form--select_multi"), $(this).is(":checked") ? (a.removeClass("form--disabled"), a.each(function(a, b) {
                return $(b).children().last().remove()
            }), a.val(""), a.removeAttr("disabled"), a.off("click"), $("#page-form--timeline_description").val("Not multiple days."), $(".form_alt--input_multi").hide()) : void 0
        },
        eventForm: function() {
            return $("#page-form--timeline_multiple_days--yes").on("change", this.eventFormListenerPositive), $("#page-form--timeline_multiple_days--no").on("change", this.eventFormListenerNegative), $(".form_delta").on("submit", this.removeFormAttr)
        },
        removeFormAttr: function() {
            return $(".form--select_multi").removeAttr("disabled"), !0
        },
        initSearch: function() {
            return this.$results = $(".photographer-results"), this.searchPage = this.$results.data("page"), this.searchPage < 1 && (this.searchPage = 1), this.searchLocation = this.$results.data("location"), this.searchSpecialty = this.$results.data("specialty"), this.searchLat = this.$results.data("lat"), this.searchSID = this.$results.data("sid"), this.searchLon = this.$results.data("lon"), this.hasLocation = !(null === this.searchLocation || "" === this.searchLocation), this.searchTotal = this.$results.data("maxpage"), this.searchURL = "/find-photographers?specialty=" + this.searchSpecialty + "&location=" + this.searchLocation + "&lat=" + this.searchLat + "&lon=" + this.searchLon + "&sid=" + this.searchSID, $(".results_infinity .pagination").hide(), a.infinity()
        },
        infinity: function() {
            return 0 === $(".results_infinity").length || this.searchPage >= this.searchTotal ? void 0 : (this.searchPage++, $.ajax({
                type: "GET",
                url: "/scroll",
                data: {
                    specialty: a.searchSpecialty,
                    location: a.searchLocation,
                    page: a.searchPage,
                    lat: a.searchLat,
                    lon: a.searchLon,
                    sid: a.searchSID
                },
                success: this.infinitySuccess
            }))
        },
        infinitySuccess: function(b) {
            var c, d, e, f, g, h, i, j, k, l;
            if (null === b || "undefined" == typeof b) return !1;
            if (!(null != b && b.length > 0)) return !1;
            if (null != b[0].error) return "undefined" != typeof console && console.error(b[0].error), !1;
            if (c = b[0].extra, d = b[0].page, f = b[0].results, f.length < 1) return !1;
            for (g = 100, i = 1, j = "", k = 0, l = f.length; l > k; k++) e = f[k], a.hasLocation && (j = '<span class="photographer--distance">within ' + e.distance + " mi</span>"), h = '  <li id="result--' + e.slug + '" class="photographer-result--item photographer-result--item_scrolled">\n    <a href="/photographer/' + e.slug + e.extra_artist + '" class="photographer-result--link">\n    <span class="photographer-result--image-container">\n      <img class="photographer-result_placeholder" src="/static/dist/css/grunticon/png/default_specialty.png" alt="' + e.name + '">\n      <img class="photographer-result--image" src="' + e.image + '" alt="' + e.name + '">\n    </span>\n    <div class="photographer-result--detail">\n      <span class="photographer--headshot">\n        <img src="' + e.headshot + '" alt="Kirk Irwin">\n      </span>\n      <span class="photographer--name">' + e.name + '</span>\n      <span class="photographer--meta">\n      <span class="photographer--location">' + e.loc + "</span>\n      " + j + "\n      </span>\n    </div>\n  </a>\n</li>", $(".photographer-results").append(h), window.setTimeout("APP.addFadeIn('#result--" + e.slug + "')", i), i += g
        },
        addFadeIn: function(a) {
            return $(a).addClass("photographer-fadein"), window.setTimeout("APP.checkFadeIn('" + a + "')", 450)
        },
        checkFadeIn: function(a) {
            var b;
            return b = $(a).css("opacity"), 1 > b ? $(a).removeClass("photographer-fadein photographer-result--item_scrolled") : void 0
        },
        gaAnalytics: function() {
            return $(".photographer--website").on("click", function() {
                var a;
                return a = $(this).attr("href"), ga("send", "event", "photographer-external-link", "click", a)
            }), $(".photographer-ext").on("click", function() {
                var a;
                return a = $(this).attr("href"), ga("send", "event", "photographer-external-link", "click-other", a)
            })
        },
        gaSearchAnalytics: function() {
            var a, b;
            return b = $(".search--specialty").val(), a = $(".search--location").val(), ga("send", "event", "search-specialty", "search", b), ga("send", "event", "search-location", "search", a)
        },
        heroInit: function() {
            var a, b, c, d, e;
            return a = "79em", d = "90.0625em", e = window.matchMedia("(min-width: " + d + ")"), e.matches ? (c = $(".hero_xl").data("style"), void $(".hero_xl").attr("style", c).show()) : (b = window.matchMedia("(min-width: " + a + ")"), b.matches ? (c = $(".hero_lg").data("style"), void $(".hero_lg").attr("style", c).show()) : (c = $(".hero_md").data("style"), void $(".hero_md").attr("style", c).show()))
        },
        memberBlog: function() {
            var a;
            return a = window.location.pathname, $(".member-category option").each(function() {
                return $(this).val() === a ? $(this).attr("selected", "selected") : void 0
            }), $(".member-category").on("change", function() {
                return window.location.href = $(".member-category option:selected").val()
            }), $(".member-author option").each(function() {
                return $(this).val() === a ? $(this).attr("selected", "selected") : void 0
            }), $(".member-author").on("change", function() {
                return window.location.href = $(".member-author option:selected").val()
            })
        },
        crewHeight: function() {
            var a;
            return a = 0, $(".crew-list--item").each(function() {
                return $(this).height() > a ? a = $(this).height() : void 0
            }), $(".crew-list--item").each(function() {
                return $(this).height(a)
            })
        },
        searchFormFocus: function() {
            return $(".search--location").on("click", function(b) {
                return b.preventDefault(), a.setSelect(this)
            })
        },
        setSelect: function(a) {
            return a.setSelectionRange(0, a.value.length), a.select()
        },
        fitVids: function() {
            return $(".js-video").fitVids()
        },
        photographer: function() {
            return $(".js-spec--toggle").on("click", this.photographerShowImage)
        },
        photographerShowImage: function(a) {
            var b, c, d, e;
            return a.preventDefault(), c = $(this), $(".js-spec--toggle").removeClass("current"), $(".js-spec--image").removeClass("current").addClass("hidden"), c.addClass("current"), e = c.data("type"), b = $("#spec-photo--" + e), d = b.data("src"), b.addClass("current").attr("src", d).removeClass("hidden"), History.replaceState(null, null, c.attr("href")), !1
        },
        blogReferrer: function() {
            var a;
            return a = new RegExp(location.host), $(".blog--content a").each(function() {
                var b, c;
                return b = $(this), c = b.attr("href"), a.test(c) || "/" === c.slice(0, 1) && "//" !== c.slice(0, 2) || "#" === c.slice(0, 1) || "mailto" === c.slice(0, 6) ? void 0 : (b.addClass("external"), b.attr("href", "/ref?u=" + c))
            })
        },
        init: function() {
            return this.navigation(), this.homeNavCheck(), this.geoCodeInit(), this.initHandlers(), this.lockupRolloverImage(), this.footerPosition(), this.eventForm(), this.hiddenForm(), this.datepicker(), this.initSearch(), this.gaAnalytics(), window.matchMedia && this.heroInit(), this.memberBlog(), this.searchFormFocus(), this.fitVids(), this.photographer(), this.blogReferrer()
        }
    }, window.APP = a, a.init()
}).call(this);