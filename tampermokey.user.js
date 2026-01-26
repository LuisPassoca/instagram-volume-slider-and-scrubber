// ==UserScript==
// @name         Instagram Reels Volume Slider & Scrubber
// @namespace    https://github.com/LuisPassoca/reels-volume-slider-and-scrubber
// @version      1.0
// @description  Adds volume changing and video scrubber functionality to Instagram Reels
// @author       LuisPassoca
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @resource     extensionCSS https://cdn.jsdelivr.net/gh/LuisPassoca/reels-volume-slider-and-scrubber@50abbee3b643c69389b2b1010f43a4e9397e1b2b/style.css
// @require      https://cdn.jsdelivr.net/gh/LuisPassoca/reels-volume-slider-and-scrubber@50abbee3b643c69389b2b1010f43a4e9397e1b2b/extension.js
// ==/UserScript==

(function() {
    'use strict';

    const css = GM_getResourceText("extensionCSS");
    GM_addStyle(css);

})();