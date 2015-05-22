(function() {
    'use strict';

    /**
     * Is nav small?
     * @return {Boolean}
     */
    function isNavSmall() {
        return 0 === $('.nav-list_inline .nav--item').length;
    }

    /**
     * Navigation resize handler
     * @return {void}
     */
    function navigationResizeHandler() {
        var $lastNavItem,
            sumOfNavItemWidths,
            navToggleText,
            navListInlineWidth;

        navListInlineWidth = $('.nav-list_inline').width();
        sumOfNavItemWidths = 0;

        $('.nav-list_inline .nav--item').each(function(a, b) {
            return sumOfNavItemWidths += $(b).width();
        });

        $('.nav-list .nav--item').each(function(a, b) {
            if ($(b).hasClass('nav--item_about')) {
                return false;
            }

            $(b).appendTo('.nav-list_inline');

            if ($(b).width() + sumOfNavItemWidths > navListInlineWidth) {
                $(b).prependTo('.nav-list');
                return false;
            }

            sumOfNavItemWidths = $(b).width() + sumOfNavItemWidths;
        });

        $lastNavItem = $('.nav-list_inline .nav--item:last-child');

        if ($lastNavItem.width() + sumOfNavItemWidths > navListInlineWidth) {
            $lastNavItem.prependTo('.nav-list');
        }

        if ('inline' === $('.nav-list .nav--item:last-child').css('display')) {
            $('.nav-list_inline .nav--item').each(function(a, b) {
                return $(b).insertBefore('.nav--item_about');
            });
        }

        if (isNavSmall()) {
            navToggleText = 'Menu';
        } else if ($('.nav-list').hasClass('nav_closed')) {
            navToggleText = 'More';
        } else {
            navToggleText = 'Less';
        }

        $('.nav-toggle .nav-toggle--text').text(navToggleText);
    }


    /**
     * Navigation
     * @return {void}
     */
    function navigation() {
        var $navList;

        navigationResizeHandler();

        $navList = $('.nav-list');
        $navList.addClass('nav_closed');

        $('.member-tab').addClass('member-tab_hidden');

        if (!isNavSmall()) {
            $('.nav-toggle .nav-toggle--text').text('More');
        }

        $('.nav-toggle').on('click', function(event) {
            var navToggleText;

            event.preventDefault();

            if ($navList.hasClass('nav_closed')) {
                navToggleText = 'Less';
                $(this).addClass('nav-toggle_open')
                    .children('.icon-arrow')
                    .addClass('icon-arrow-gold')
                    .removeClass('icon-arrow-down-white');
                $('.nav').removeClass('closed');
                $navList.removeClass('nav_closed');
                $('.member-tab').removeClass('member-tab_hidden');
            } else {
                navToggleText = 'More';
                $(this).removeClass('nav-toggle_open')
                    .children('.icon-arrow')
                    .addClass('icon-arrow-down-white')
                    .removeClass('icon-arrow-gold');

                $('.nav').addClass('closed');
                $navList.addClass('nav_closed');
                $('.member-tab').addClass('member-tab_hidden');
            }
        });
    }

    /**
     * Home nav check
     * @return {void}
     */
    function homeNavCheck() {
        $('.home .header').addClass('transparent');
        $('.home .nav').addClass('transparent');
    }

    /**
     * Home nav check
     * @return {void}
     */
    function initHandlers() {
        $(window).resize(_.throttle(navigationResizeHandler, 50));
        $(window).trigger('resize');
    }

    /**
     * Home nav check
     * @return {void}
     */
    function init() {
        navigation();
        homeNavCheck();
        initHandlers();
    }

    init();
})();