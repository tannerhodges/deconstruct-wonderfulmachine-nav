(function() {
    'use strict';

    var $nav = $('.nav'),
        $nav_list = $nav.children('.nav-list'),
        $nav_dropdown = $nav.children('.nav-dropdown'),
        $nav_toggle = $nav.children('.nav-toggle'),
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
        return 'inline' === $nav_dropdown.children('.nav-item:last-child').css('display');
    }

    /**
     * Get total width of items in the nav list
     * @return {Number}
     */
    function getWidthOfNavItems() {
        var sum = 0;
        $nav_list.children('.nav-item').each(function(a, b) {
            return sum += $(b).width();
        });
        return sum;
    }

    /**
     * Move all nav items from dropdown to list
     * @return {void}
     */
    function moveItemsToList() {
        $nav_list.children('.nav-item').each(function(a, b) {
            // Move everything in front of the "utility" nav
            return $(b).insertBefore('.nav-item--about');
        });
    }

    /**
     * Update toggle text based on nav status
     * @return {void}
     */
    function updateToggleCopy() {
        var copy;
        if (isNavSmall()) {
            copy = 'Menu';
        } else if ($nav_dropdown.hasClass('nav--closed')) {
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
    function navResizeHandler() {
        var $lastNavItem,
            sumOfNavItemWidths = getWidthOfNavItems(),
            nav_list_width = $nav_list.width();

        // Move as many items as you can from the dropdown to the list (before the list gets too big)
        $nav_dropdown.children('.nav-item').each(function(a, b) {
            // Stop once you reach the first element in the "utility" nav
            // These items stay in the dropdown until they can *all* fit in the list
            if ($(b).hasClass('nav-item--about')) {
                return false;
            }

            // Start moving items from the dropdown to the list
            $(b).appendTo('.nav-list');

            // Fit as many items as you can into the list
            if ($(b).width() + sumOfNavItemWidths > nav_list_width) {
                // Once you break the threshold, revert and stop
                $(b).prependTo($nav_dropdown);
                return false;
            }

            // Keep running total of the list width
            sumOfNavItemWidths = $(b).width() + sumOfNavItemWidths;
        });

        // In case the list is still too big, move the last item to the dropdown
        $lastNavItem = $nav_list.children('.nav-item:last-child');
        if ($lastNavItem.width() + sumOfNavItemWidths > nav_list_width) {
            $lastNavItem.prependTo($nav_dropdown);
        }

        if (isNavLarge()) {
            moveItemsToList();
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