(function() {
    'use strict';

    var $nav = $('.nav'),
        $nav_dropdown = $('.nav-dropdown'),
        $nav_toggle = $('.nav-toggle'),
        $nav_toggle_arrow = $nav_toggle.children('.icon-arrow');

    /**
     * Is nav small?
     * @return {Boolean}
     */
    function isNavSmall() {
        return 0 === $('.nav-list .nav-item').length;
    }

    /**
     * Is nav large?
     * @return {Boolean}
     */
    function isNavLarge() {
        return 'inline' === $('.nav-dropdown .nav-item:last-child').css('display');
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
     * Move all nav items from dropdown to list
     * @return {void}
     */
    function moveAllNavItemsToList() {
        $('.nav-list .nav-item').each(function(a, b) {
            return $(b).insertBefore('.nav-item--about');
        });
    }

    /**
     * Navigation resize handler
     * @return {void}
     */
    function navResizeHandler() {
        var $lastNavItem,
            sumOfNavItemWidths = 0,
            nav_list_width = $('.nav-list').width();

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

        if (isNavLarge()) {
            moveAllNavItemsToList();
        }

        updateToggleCopy();
    }

    /**
     * Open nav dropdown
     * @return {void}
     */
    function openNavDropdown() {
        $nav_toggle.addClass('nav-toggle--open');
        $nav_toggle_arrow
            .addClass('icon-arrow-gold')
            .removeClass('icon-arrow-down-white');
        $nav.removeClass('closed');
        $nav_dropdown.removeClass('nav--closed');
    }

    /**
     * Close nav dropdown
     * @return {void}
     */
    function closeNavDropdown() {
        $nav_toggle.removeClass('nav-toggle--open')
        $nav_toggle_arrow
            .addClass('icon-arrow-down-white')
            .removeClass('icon-arrow-gold');
        $nav.addClass('closed');
        $nav_dropdown.addClass('nav--closed');
    }

    /**
     * Nav toggle handler
     * @param  {Event}  e
     * @return {void}
     */
    function navToggleHandler(e) {
        e.preventDefault();

        if ($nav_dropdown.hasClass('nav--closed')) {
            openNavDropdown();
        } else {
            closeNavDropdown();
        }

        updateToggleCopy();
    }

    /**
     * Init
     * @return {void}
     */
    function init() {
        // TODO: Why does navResizeHandler shortcircuit around 350px unless you call it twice?
        navResizeHandler();
        navResizeHandler();
        $(window).resize(navResizeHandler); // TODO: Should we throttle this?
        $('.nav-toggle').on('click', navToggleHandler);
    }

    init();
})();