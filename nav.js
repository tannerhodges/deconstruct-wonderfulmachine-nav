(function() {
    'use strict';

    var $lastNavItem,
        sumOfNavItemWidths,
        nav_list_width;

    /**
     * Is nav small?
     * @return {Boolean}
     */
    function isNavSmall() {
        return 0 === $('.nav-list .nav-item').length;
    }


    /**
     * Update toggle text based on nav status
     * @return {void}
     */
    function updateToggleCopy() {
        var copy;
        if (isNavSmall()) {
            copy = 'Menu';
        } else if ($('.nav-dropdown').hasClass('nav--closed')) {
            copy = 'More';
        } else {
            copy = 'Less';
        }
        $('.nav-toggle .nav-toggle--text').text(copy);
    }

    /**
     * Navigation resize handler
     * @return {void}
     */
    function navigationResizeHandler() {
        nav_list_width = $('.nav-list').width();
        sumOfNavItemWidths = 0;

        $('.nav-list .nav-item').each(function(a, b) {
            return sumOfNavItemWidths += $(b).width();
        });

        $('.nav-dropdown .nav-item').each(function(a, b) {
            if ($(b).hasClass('nav-item--about')) {
                return false;
            }

            $(b).appendTo('.nav-list');

            if ($(b).width() + sumOfNavItemWidths > nav_list_width) {
                $(b).prependTo('.nav-dropdown');
                return false;
            }

            sumOfNavItemWidths = $(b).width() + sumOfNavItemWidths;
        });

        $lastNavItem = $('.nav-list .nav-item:last-child');

        if ($lastNavItem.width() + sumOfNavItemWidths > nav_list_width) {
            $lastNavItem.prependTo('.nav-dropdown');
        }

        if ('inline' === $('.nav-dropdown .nav-item:last-child').css('display')) {
            $('.nav-list .nav-item').each(function(a, b) {
                return $(b).insertBefore('.nav-item--about');
            });
        }

        updateToggleCopy();
    }


    /**
     * Navigation
     * @return {void}
     */
    function navigation() {
        var $nav_dropdown;

        navigationResizeHandler();

        $nav_dropdown = $('.nav-dropdown');
        $nav_dropdown.addClass('nav--closed');

        updateToggleCopy();

        $('.nav-toggle').on('click', function(event) {
            event.preventDefault();

            if ($nav_dropdown.hasClass('nav--closed')) {
                $(this).addClass('nav-toggle--open')
                    .children('.icon-arrow')
                    .addClass('icon-arrow-gold')
                    .removeClass('icon-arrow-down-white');
                $('.nav').removeClass('closed');
                $nav_dropdown.removeClass('nav--closed');
            } else {
                $(this).removeClass('nav-toggle--open')
                    .children('.icon-arrow')
                    .addClass('icon-arrow-down-white')
                    .removeClass('icon-arrow-gold');
                $('.nav').addClass('closed');
                $nav_dropdown.addClass('nav--closed');
            }

            updateToggleCopy();
        });
    }

    /**
     * Init handlers
     * @return {void}
     */
    function initHandlers() {
        // TODO: Do we need to throttle this?
        $(window).resize(navigationResizeHandler);
        // TODO: Should we really need this extra call?
        // $(window).trigger('resize');
        navigationResizeHandler();
    }

    /**
     * Init
     * @return {void}
     */
    function init() {
        navigation();
        initHandlers();
    }

    init();
})();