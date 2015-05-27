# Deconstructing wonderfulmachine.com's Priority+ Navigation

Here's the original: [wonderfulmachine.com](https://wonderfulmachine.com/)

Here's my refactored version: [tannerhodges.github.io/deconstruct-wonderfulmachine-nav](http://tannerhodges.github.io/deconstruct-wonderfulmachine-nav/)

## Goals

- [x] Figure out how they done it.
- [ ] Make a version that works for me.

## Process

1. Save a copy of the homepage via Chrome's "Save Page As"
2. Unminify JS and CSS via [unminify.com](http://unminify.com/)
3. Strip down to navigation-specific modules
4. Laymanize the things
    - Named functions (and no more AMD — sorry)
    - My personal flavor of BEM (at the moment)
    - Comments
5. Refactor
