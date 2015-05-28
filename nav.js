(function() {
    'use strict';

    var $nav_container = $('.nav-container'),
        $nav = $('.nav'),
        $nav_list = $nav.children('.nav-list'),
        $nav_dropdown = $nav.children('.nav-dropdown'),
        $nav_toggle = $nav.children('.nav-toggle'),
        $nav_toggle_copy = $nav_toggle.children('.nav-toggle-copy'),
        $siteTitle = $('.site-title');

    /**
     * Is nav small?
     * @return {Boolean}
     */
    function isNavSmall() {
        return 0 === $nav_list.children('.nav-item').length;
    }

    /**
     * Is nav large?
     * @return {Boolean}
     */
    function isNavLarge() {
        return 'inline' === $nav_dropdown.children('.nav-item:last-child').css('display');
    }

    /**
     * Get the max width the nav list can be
     * @return {Number}
     */
    function getNavMaxWidth() {
        // TODO: Should we get this value from CSS?
        var navWidthPercentage = 0.8;

        var container_width = Math.floor($nav_container.width() * navWidthPercentage),
            toggle_width = Math.ceil($nav_toggle.width()),
            siteTitle_width = Math.ceil($siteTitle.width());

        return container_width - toggle_width - siteTitle_width;
    }

    /**
     * Get total width of items in the nav list
     * @return {Number}
     */
    function getNavItemsWidth() {
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
            // Move everything in front of the secondary nav
            return $(b).insertBefore('.nav-item--secondary');
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
        $nav_toggle_copy.text(copy);
    }

    /**
     * Navigation resize handler
     * Note: Secondary nav items stay in the dropdown until they can *all* fit in the list
     * @return {void}
     */
    function navResizeHandler() {
        var $lastNavItem,
            nav_items_width = 0,
            nav_max_width = getNavMaxWidth();

        // Move everything to the dropdown
        if ($nav_list.children('.nav-item').length > 0) {
            $nav_list.children('.nav-item').prependTo($nav_dropdown);
        }

        // Move as many items as you can back to the list
        $nav_dropdown.children('.nav-item').each(function(a, b) {
            // Make visible so we can get the element's width
            $(b).appendTo($nav_list);
            nav_items_width += $(b).width();

            // Check thresholds
            var isNavTooBig = nav_items_width > nav_max_width,
                hasReachedSecondaryNav = $(b).hasClass('nav-item--secondary');
            // If we hit them, revert and exit loop
            if (isNavTooBig || hasReachedSecondaryNav) {
                $(b).prependTo($nav_dropdown);
                return false;
            }
        });

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
        $nav.removeClass('closed');
        $nav_dropdown.removeClass('nav--closed');
    }

    /**
     * Close nav dropdown
     * @return {void}
     */
    function closeNavDropdown() {
        $nav_toggle.removeClass('nav-toggle--open');
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
        navResizeHandler();
        $(window).resize(navResizeHandler); // TODO: Should we throttle this?
        $('.nav-toggle').on('click', navToggleHandler);
    }

    init();
})();